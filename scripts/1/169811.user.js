// ==UserScript==
// @name       remedy76 float right
// @namespace  wp.ballhog.net
// @version    0.1
// @description  tested on remedy version 7.6
// @match      http://*/arsys*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright  2012+, You
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

addGlobalStyle('[arid="303611300"] { float: right ! important; }');

