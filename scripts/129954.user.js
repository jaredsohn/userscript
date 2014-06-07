// ==UserScript==
// @name           FB remove Add
// @namespace      http://userscripts.org/scripts/show/129954
// @version        0.2
// @description    remove ads
// @include        http://*.facebook.*/*
// @include        https://*.facebook.*/*
// @include        https://*.zinga.*/*
// @copyright      2012+, Peta
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
addGlobalStyle('.hasRightCol #rightCol {display:none ! important}');
addGlobalStyle('#pagelet_canvas_footer_content {display:none ! important}');

addGlobalStyle('.ego_section {display:none;}');
addGlobalStyle('.ego_column {display:none;}');
addGlobalStyle('#zbar {display:none;}');  

//addGlobalStyle('#zbar, #zbar_takeoverContainer {display:none ! important}');  
//addGlobalStyle('#zbar #zbar_takeoverClickArea {display:none ! important}');
//addGlobalStyle('#zbar_gameHeader img {display:none ! important}');
//addGlobalStyle('#zbar_gameHeader {display:none ! important}');    
//addGlobalStyle('#zbar, #zbar_takeoverContainer  {display:none ! important}');   

//addGlobalStyle(' {display:none ! important}');
