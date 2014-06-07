// ==UserScript==
// @name	解除网页右键菜单和复制限制
// @namespace	http://googlo.me/
// @author	无法诉说的吟荡
// @icon	http://yidu.qiniudn.com/ico.jpg
// @version	1
// @description	右键强力解锁，可以复制一些网站的免费章节或者特殊文字
// @homepage	http://userscripts.org/scripts/show/186239
// @updateURL	https://userscripts.org/scripts/source/186239.meta.js
// @downloadURL	https://userscripts.org/scripts/source/186239.user.js
// @include	*
// ==/UserScript==
    function restore(){
    with (document.wrappedJSObject || document) {
    onmouseup = null;
    onmousedown = null;
    oncontextmenu = null;
    }
    var arAllElements = document.getElementsByTagName('*');
    for (var i = arAllElements.length - 1; i >= 0; i--) {
    var elmOne = arAllElements[i];
    with (elmOne.wrappedJSObject || elmOne) {
    onmouseup = null;
    onmousedown = null;
    }
    }
    }

    window.addEventListener('load',restore,true);

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle("html, * {-moz-user-select:text!important;}");