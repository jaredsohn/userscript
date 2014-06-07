// ==UserScript==
// @name           check*pad Add Task Bookmarklet
// @description    check*padにタスク追加のブックマークレットを生成します。 Make link as bookmarklet for check*pad require to add a task.
// @version        1.01.00
// @author         Jetta <tied.fish@gmail.com>
// @namespace      http://userscripts.org/users/64319
// @include        http://www.checkpad.jp/projects/view/*
// @require        http://sizzlemctwizzle.com/updater.php?id=32582
// @history        1.01.00 - ブックマークレット単体でも追加ウィンドウを削除するようにした。
// @history        1.00.00 - 2010-09-12にリニューアルしたcheck*padに対応した。
// ==/UserScript==

/* NOTE: check*pad has already required jQuery. */
var $ = unsafeWindow.jQuery;
$(function () {

    if (window.location.href.match(/\d+$/)) {
        var project_id = RegExp.lastMatch;
    } else {
        return;
    }
    var url = "http://www.checkpad.jp/_ajax_tasks_add.php";
    var windowName = "checkpad_addtask";
    var aElem = 
        $("<a>このリストのブックマークレット</a>")
            .attr("href",
                  "javascript:(function(){"
                + "var%20d=document,w=window;"
                + "var%20z='" + project_id + "';"
                + "var%20s=w.getSelection();"
                + "if(s==''){s=d.title+'%20'+w.location;}"
                + "var%20o=window.open('','" + windowName + "');"
                + "var%20f=d.createElement('form');"
                + "f.action='" + url + "';"
                + "f.acceptCharset='utf-8';"
                + "f.method='post';"
                + "f.target='" + windowName + "';"
                + "d.body.appendChild(f);"
                + "var%20t=d.createElement('input');"
                + "t.name='data';"
                + "t.value=s;"
                + "f.appendChild(t);"
                + "var%20p=d.createElement('input');"
                + "p.name='project_id';"
                + "p.value=z;"
                + "f.appendChild(p);"
                + "f.submit();"
                + "d.body.removeChild(f);"
                + "o.close();"
                + "})();"
            );
    var spanElem =
        $("<span id='makeBookmarkletLink' class='blueLink linkLike'></span>")
            .append(aElem);
    $("<li class='command'></li>")
        .append(spanElem)
        .appendTo("div#rightside div.menu_box_inner > ul.menuList");

});
