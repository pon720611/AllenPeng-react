document.addEventListener("DOMContentLoaded", init);

function init() {
    ReactDOM.render(React.createElement(
        "div",
        { className: "page-header" },
        React.createElement(
            "h1",
            null,
            "Aaron\u7684\u6EF4\u6EF4\u5495\u5495"
        ),
        React.createElement(
            "blockquote",
            null,
            "\u751F\u6D3B\u4E2D\u7684\u4E0D\u6EFF\uFF0C\u9700\u8981\u767C\u6D29"
        )
    ), document.getElementById('header'));

    class InputArea extends React.Component {
        render() {
            return React.createElement("textarea", { id: "input-data", className: "form-control", rows: "3" });
        }
    }

    ReactDOM.render(React.createElement(InputArea, null), document.getElementById('input'));

    class AddButton extends React.Component {
        render() {
            return React.createElement(
                "div",
                null,
                React.createElement("br", null),
                React.createElement(
                    "button",
                    { onClick: this.onAdd, type: "button", className: "btn btn-primary btn-lg" },
                    "\u65B0\u589E\u6EF4\u6EF4\u5495\u5495"
                )
            );
        }

        onAdd() {
            var content = document.getElementById("input-data").value;

            if (content.length == 0) {
                $('#myModal').modal('show');
            } else {
                var timeNow = new Date();
                var yyyy = timeNow.getFullYear();
                var MM = (timeNow.getMonth() + 1 < 10 ? '0' : '') + (timeNow.getMonth() + 1);
                var dd = (timeNow.getDate() < 10 ? '0' : '') + timeNow.getDate();
                var h = (timeNow.getHours() < 10 ? '0' : '') + timeNow.getHours();
                var m = (timeNow.getMinutes() < 10 ? '0' : '') + timeNow.getMinutes();
                var s = (timeNow.getSeconds() < 10 ? '0' : '') + timeNow.getSeconds();

                var ok = yyyy + "年" + MM + "月" + dd + "日 " + h + ":" + m + ":" + s;

                // 將資料插入陣列
                messageItems.splice(0, 0, { datenow: ok, text: content });

                ReactDOM.render(React.createElement(MessagePanel, null), document.getElementById('panel'));
            }
        }
    }

    ReactDOM.render(React.createElement(AddButton, null), document.getElementById('button'));

    class MessageHead extends React.Component {
        render() {
            return React.createElement(
                "div",
                { className: "panel-heading" },
                this.props.datenow,
                React.createElement(
                    "button",
                    { type: "button", onClick: () => this.onDel(this.props.datenow), className: "pull-right btn btn-default btn-xs" },
                    React.createElement("span", { className: "glyphicon glyphicon glyphicon-remove", "aria-hidden": "true" })
                )
            );
        }

        onDel(datenow) {
            $('#myModalYesNo').modal('show');

            document.getElementById("yes").onclick = function () {
                for (var i = 0; i < messageItems.length; i++) {
                    if (datenow === messageItems[i].datenow) {
                        messageItems.splice(i, 1); // 從陣列的某一筆資料開始刪除, 第二個參數表示要刪除幾筆
                        break;
                    }
                }

                // 更新網頁(重新輸出MessagePanel)
                ReactDOM.render(React.createElement(MessagePanel, null), document.getElementById('panel'));
            };

            document.getElementById("no").onclick = function () {
                // 否不用做事
            };
        }
    }

    class MessageBody extends React.Component {
        render() {
            return React.createElement(
                "div",
                { className: "panel-body" },
                this.props.text
            );
        }
    }

    class MessageItem extends React.Component {
        render() {
            return React.createElement(
                "div",
                { className: "panel panel-primary" },
                React.createElement(MessageHead, { datenow: this.props.datenow }),
                React.createElement(MessageBody, { text: this.props.text })
            );
        }
    }

    // 一個存放所有留言的陣列
    var messageItems = [{ datenow: "2018年8月19日 00:00:00", text: "留言內容一" }];

    class MessagePanel extends React.Component {
        render() {
            return React.createElement(
                "div",
                null,
                messageItems.map(item => React.createElement(MessageItem, { datenow: item.datenow, text: item.text }))
            );
        }
    }

    ReactDOM.render(React.createElement(MessagePanel, null), document.getElementById('panel'));
}
