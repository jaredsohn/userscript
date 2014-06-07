// ==UserScript==
// @name           iGoogle Minimalist
// @namespace      http://userscripts.org/users/65373
// @include        http://www.google.*/ig
// @include       http://google.*/ig*
// @include       http://*.google.*/ig*
// @include       http://*.google.*/ig*
// @include       http://*.google.*/*


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


document.getElementById("col1").style.display = "none";
document.getElementById("footerwrap").style.display = "none";
document.getElementById("modules").style.display = "none";
document.getElementById("col2").style.display = "none";
document.getElementById("doc3").style.position = "relative";
document.getElementById("doc3").style.top = 60 + "pt";
document.body.style.background = "#fff";
GM_addStyle("#addstuff, #footer_promos, #themeinfo, #promo  {display:none !important;}");