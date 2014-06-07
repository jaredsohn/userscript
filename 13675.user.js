// ==UserScript==
// @name           ort main right menu
// @namespace      education
// @description    fix clickless right menu on main page
// @include        http://www.ort.org.il/
// ==/UserScript==

var HideRightMenu = document.getElementById('nbRoot');
HideRightMenu.style.display = 'none';

//var ShowRightMenu = document.getElementById('fo549928063');
//ShowRightMenu.style.display = 'block';
//ShowRightMenu.style.font-size = 10px;
//RightMenu.style.color = 'red';

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.nFO { display: block ! important; font-size: 10px ! important; position: relative ! important;}');
//

