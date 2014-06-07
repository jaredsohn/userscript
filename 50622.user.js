// ==UserScript==
// @name           Password fields are text with a green border
// @namespace      http://userscripts.org/users/23652
// @description    Turns password fields into text and adds around them a green border
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// addGlobalStyle
function addGlobalStyle(css) {
	if(typeof GM_addStyle=='function') GM_addStyle(css);
    else if((head=document.getElementsByTagName('head')[0])) {
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
	style.innerHTML=css;
    head.appendChild(style);
	}
}

addGlobalStyle('.greenpass {border:2px solid #69E90C !important; -moz-border-radius:5px !important;}');

var fields = window.document.evaluate("//input[@type='password']",document,null,6,null);

for(var i=fields.snapshotLength-1; (item=fields.snapshotItem(i)); i--) {
item.setAttribute('type', 'text');
item.className += " greenpass";
if(item.className.indexOf(' ')==0) item.className = item.className.substring(1);
}