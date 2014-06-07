// ==UserScript==
// @name           Reddit Desktopify Mobile
// @namespace      http://userscripts.org/users/neko, http://reddit.com/user/neko
// @description    Makes Reddit's .mobile pages nicer for some serious minimal desktop browsing
// @include        http*.reddit.com/*.mobile
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

//makin things smaller
addGlobalStyle('div.link { font-size: small ! important; }');
addGlobalStyle('div.comment { font-size: small ! important; }');
addGlobalStyle('p.subreddit { font-size: small ! important; }');


//let's recolor visited!
addGlobalStyle('a:visited {color:#cccccc;}');