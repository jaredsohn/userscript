// ==UserScript==
// @name           emp_visited_links_fix
// @author         DODeath
// @namespace      empornium.us
// @include        http://empornium.us/*
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

//(function (){
//})();


addGlobalStyle('a:visited {color:#000066 !important;}');

