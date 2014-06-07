// ==UserScript==
// @name           Aura Voteblock Remover
// @namespace      http://userscripts.org/users/201444
// @description    Removes the aura vote code block from under user's posts
// @include        *forums.whirlpool.net.au*
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

//The code that makes it happen
addGlobalStyle('.voteblock { display:none!important; }');