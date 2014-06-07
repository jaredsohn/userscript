// ==UserScript==
// @name           JavaFx Tutorials Aesthetic Reading
// @namespace      http://www.java.sun.com/javafx
// @description    Changes the background & font colors for JavaFX Tutorials
// @include        http://java.sun.com/javafx/1/tutorials/*				   
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

document.body.style.background="#1B2D3D";
document.body.style.color="white";

addGlobalStyle('code,kdb,tt,pre { color: yellow ! important; }');
addGlobalStyle('.grey3 { background: none repeat scroll 0 0 !important} ');
addGlobalStyle('.grey4 { background-color: black ! important; }');