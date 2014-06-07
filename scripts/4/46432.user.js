// ==UserScript==
// @name		Cut 'n paste on every 'copy-protected' website
// @description		Makes it possible to workaround htmlblock.co.uk (<!--hppage status="protected"-->) and the like
// ==/UserScript==
setTimeout("document.oncontextmenu=null;document.ondragstart=null;document.onkeydown=null;document.onmousedown=null;document.onmousemove=null;document.onmouseup=null;document.onselectstart=null;document.body.oncontextmenu=null;document.body.ondragstart=null;document.body.onkeydown=null;document.body.onmousedown=null;document.body.onmousemove=null;document.body.onmouseup=null;document.body.onselectstart=null;window.oncontextmenu=null;window.ondragstart=null;window.onkeydown=null;window.onmousedown=null;window.onmousemove=null;window.onmouseup=null;window.onselectstart=null;window.onbeforeprint=null;",500);
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle("body {display:block;}");
