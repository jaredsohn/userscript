// ==UserScript==
// @name           Nico Comment Viewer
// @namespace      http://efcl.info/
// @description    ニコニコ動画のプレイヤーからコメントを取得して表示
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==
// ext_getComments([]);のサンプル
new function(){
    addButton();
    function addButton(){
        var intPoint = document.getElementById("ichiba_placeholder");
        var bt = document.createElement("button");
        bt.textContent = "コメントビューアー";
        bt.addEventListener("click", function(){
            getTable();
        },false);
        intPoint.parentNode.insertBefore(bt ,intPoint);
    }
    function getTable(){
        var w = unsafeWindow;
        var comments = w.document.getElementById("flvplayer").ext_getComments([]);// :Array
        if(comments && comments.length > 0){
            var table = templete(comments);
            var intPoint = document.getElementById("ichiba_placeholder");
            var fragment = document.createDocumentFragment();
            var div = document.createElement("div");
            div.innerHTML = table.join("\n");
            fragment.appendChild(div);
            intPoint.parentNode.insertBefore(fragment ,intPoint);
        }
    }
    function templete(comments){
        var res = [];
        res.push('<table><tr>'
        +'<th bgcolor="#EE0000"><font color="#FFFFFF">日付</font></th>'
        +'<th bgcolor="#EE0000" width="100"><font color="#FFFFFF">コマンド</font></th>'
        +'<th bgcolor="#EE0000" width="200"><font color="#FFFFFF">メッセージ</font></th>'
        +'<th bgcolor="#EE0000" width="100"><font color="#FFFFFF">コメ番</font></th>'
        +'<th bgcolor="#EE0000" width="100"><font color="#FFFFFF">コメ時間</font></th>'
        +'</tr>');
        for(var i=0,len=comments.length;i<len;i++){
            var comment = comments[i];
            var tmp = <>
                <tr>
                    <td>{JSClock(comment.date)}</td>
                    <td>{comment.command}</td>
                    <td>{comment.message}</td>
                    <td>{comment.resNo}</td>
                    <td>{(comment.vpos / 1000) + "秒"}</td>
                </tr>
            </>;
            res.push(tmp);
        }
        res.push("</table>");
        return res;
    }
    function JSClock(t) {
       var time = new Date(t);
       var year = time.getFullYear();
       var month = time.getMonth();
       var day = time.getDate();
       return year +"年"+month+"月"+day+"日";
    }

}