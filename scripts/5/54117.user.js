// ==UserScript==
// @name           Fixed Forum Tools
// @namespace      Fixed Forum Tools
// @description    What dogs fear the most.
// @include        http://*www.bungie.net/Forums/posts.aspx?postID=*
// @include        http://*www.bungie.net/fanclub/*/Forums/*posts.aspx?postID=*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#ctl00_forumSidebarPanel {position: fixed;}');

// so i herd u liek cupcakes