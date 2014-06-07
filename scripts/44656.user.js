// ==UserScript==
// @name           Mafia Wars Move Up!
// @namespace      taocode
// @description    Moves up Mafia Wars game and improves play on laptops and small displays.
// @include        http://apps.facebook.com/inthemafia/*
// ==/UserScript==

/*
 
History
-------
   03/24/09 - Created.
   06/06/09 - Deprecated - see Facebook App Move Up! - http://userscripts.org/scripts/show/50939
*/

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div.app { margin-top: -112px ! important; z-index: 10; position: relative; }'
             + ' .UIStandardFrame_Container { padding-top: 28px; }');
window.scrollTo(0,78);