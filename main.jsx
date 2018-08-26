document.addEventListener("DOMContentLoaded", init);

function init()
{
    ReactDOM.render(
        <div className="page-header">
        <h1>Aaron的滴滴咕咕</h1>
        <blockquote>
            生活中的不滿，需要發洩
        </blockquote>
        </div>,
        document.getElementById('header')
    );

    class InputArea extends React.Component
    {
        render()
        {
            return(<textarea id="input-data" className="form-control" rows="3"></textarea>);
        }
    }

    ReactDOM.render(<InputArea />, document.getElementById('input'));

    class AddButton extends React.Component
    {
        render()
        {
            return(<div><br/><button onClick={this.onAdd} type="button" className="btn btn-primary btn-lg">新增滴滴咕咕</button></div>);
        }

        onAdd()
        {
            var content = document.getElementById("input-data").value;

            if(content.length == 0)
            {
                $('#myModal').modal('show');
            }
            else
            {
                var timeNow = new Date();
                var yyyy = timeNow.getFullYear();
                var MM = (timeNow.getMonth() + 1 < 10 ? '0' : '') + (timeNow.getMonth() + 1);
                var dd = (timeNow.getDate() < 10 ? '0' : '') + timeNow.getDate();
                var h = (timeNow.getHours() < 10 ? '0' : '') + timeNow.getHours();
                var m = (timeNow.getMinutes() < 10 ? '0' : '') + timeNow.getMinutes();
                var s = (timeNow.getSeconds() < 10 ? '0' : '') + timeNow.getSeconds();

                var ok = yyyy + "年" + MM + "月" + dd + "日 " + h + ":" + m + ":" + s;

                // 將資料插入陣列
                messageItems.splice(0, 0, {datenow: ok, text: content});

                ReactDOM.render(<MessagePanel />, document.getElementById('panel'));
            }
        }
    }

    ReactDOM.render(<AddButton />, document.getElementById('button'));

    class MessageHead extends React.Component
    {
        render()
        {
            return(
            <div className="panel-heading">{this.props.datenow}
            <button type="button" onClick={() => this.onDel(this.props.datenow)} className="pull-right btn btn-default btn-xs">
            <span className="glyphicon glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
            </div>);
        }

        onDel(datenow)
        {
            $('#myModalYesNo').modal('show');

            document.getElementById("yes").onclick = function()
            {
                for(var i = 0 ; i < messageItems.length ; i++)
                {
                    if(datenow === messageItems[i].datenow)
                    {
                        messageItems.splice(i, 1); // 從陣列的某一筆資料開始刪除, 第二個參數表示要刪除幾筆
                        break;
                    }
                }

                // 更新網頁(重新輸出MessagePanel)
                ReactDOM.render(<MessagePanel />, document.getElementById('panel'));
            }

            document.getElementById("no").onclick = function()
            {
                // 否不用做事
            }
        }
    }

    class MessageBody extends React.Component
    {
        render()
        {
            return(<div className="panel-body">{this.props.text}</div>);
        }
    }

    class MessageItem extends React.Component
    {
        render()
        {
            return(<div className="panel panel-primary">
            <MessageHead datenow={this.props.datenow} />
            <MessageBody text={this.props.text} />
            </div>);
        }
    }

    // 一個存放所有留言的陣列
    var messageItems =
    [
        {datenow: "2018年8月19日 00:00:00", text:"留言內容一"}
    ];

    class MessagePanel extends React.Component
    {
        render()
        {
            return(
            <div>
            {
                messageItems.map((item) => (<MessageItem datenow={item.datenow} text={item.text}/>))
            }
            </div>
            );
        }
    }

    ReactDOM.render(<MessagePanel />, document.getElementById('panel'));
}