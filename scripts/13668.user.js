// ==UserScript==
// @name           Winterscape on theme list
// @namespace      menjatallarins.com
// @description    Adds Winterscape back to the list of available themes
// @include        http*://www.google.*/ig
// ==/UserScript==

var n = getNode("skinbox_b_scroller");
if (n) {
    var a = newNode('div');

    a.setAttribute('onclick', "_dlsetp('preview_skin=skins/winterscape.xml');");
    a.setAttribute('class', "skinth");
    a.innerHTML = '<img width="80" height="25" alt="Winter Scape" src="http://img2.gmodules.com/ig/images/skins/winterscape.png"/><b>Winter Scape</b>';

    n.appendChild(a);
}

// Shorthand
function newNode(type) {return unsafeWindow.document.createElement(type);}
function newText(text) {return unsafeWindow.document.createTextNode(text);}
function getNode(id) {return unsafeWindow.document.getElementById(id);}

