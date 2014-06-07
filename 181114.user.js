// ==UserScript==
// @name       	 remove twitter inline images
// @namespace  	 fixTheTwittersNet
// @version		 0.2
// @include      /^https?://www\.twitter\.com/.*$/
// @include		 /^https?://twitter\.com/.*$/
// @author       John Cline
// @description  This script removes inline images until you click the expand button
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

addGlobalStyle('.stream-item .cards-media-container { display: none !important; }');
addGlobalStyle('.stream-item.open .cards-media-container { display: block !important; }');
addGlobalStyle('.stream-item .expanded-content { display: none !important; }');
addGlobalStyle('.stream-item.open .expanded-content { display: block !important; }');
