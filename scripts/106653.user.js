// ==UserScript==
// @name		Enable Copy
// @description		Allow you copy-paste action on "copy-protected" website
// @version			1.2
// ==/UserScript==
setInterval("document.oncontextmenu=null;document.contextmenu=null;document.ondragstart=null;document.onkeydown=null;document.onmousedown=null;document.onmousemove=null;document.onmouseup=null;document.onselectstart=null;document.selectstart=null;window.oncopy=null;document.oncopy=null;document.body.oncopy=null;document.body.onselect=null;document.body.onbeforecopy=null;document.body.contextmenu=null;document.body.oncontextmenu=null;document.body.ondragstart=null;document.body.onkeydown=null;document.body.onmousedown=null;document.body.onmousemove=null;document.body.onmouseup=null;document.body.selectstart=null;document.body.onselectstart=null;window.contextmenu=null;window.oncontextmenu=null;window.ondragstart=null;window.onkeydown=null;window.onmousedown=null;window.onmousemove=null;window.onmouseup=null;window.selectstart=null;window.onselectstart=null;window.onbeforeprint=null;",1000);

var all = document.getElementsByTagName("*");
for (var i=0, max=all.length; i < max; i++) {
    all[i].onmousedown = null;
    all[i].onselectstart = null;
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle("html,body {display:block;-moz-user-select: text !important; -khtml-user-select: text !important;-webkit-user-select:text !important;user-select: text !important;}");