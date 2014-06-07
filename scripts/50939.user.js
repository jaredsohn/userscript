// ==UserScript==
// @name           Facebook App Move Up!
// @namespace      taocode
// @description    Shifts the app space up to reduce scrolling.
// @include        http://apps.facebook.com/*
// ==/UserScript==

/*
 
History
-------
   08/27/09 - Updated to match facebook app css changes.
   06/11/09 - Added Vampire Wars fix...
   06/06/09 - Created as a more flexible replacement to Mafia Wars Move Up!
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

var appDiv, sfcDiv, allDivs = document.getElementsByTagName('div');
for (var i in allDivs) {
    div = allDivs[i];
    if (div.className) {
        if (div.className.match(/\bUIStandardFrame_Container\b/)) sfcDiv = div;
        if (div.className.match(/\bapp\b/)) appDiv = div;
    }
    if (appDiv && sfcDiv) break;
}

addGlobalStyle('div.app { margin-top: -'+ appDiv.offsetTop +'px ! important; z-index: 10; position: relative; }'
             + ' .gameList_cont { display: none; }'
             + ' .zbar_rightside_cont { display: none; }'
             + ' .UIStandardFrame_Container { padding-top: 0px; }');
