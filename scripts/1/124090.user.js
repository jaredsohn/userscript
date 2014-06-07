// ==UserScript==
// @name           Colordocs
// @description  change document color in google docs
// @match http://*docs.google.com*/*
// @match https://*docs.google.com*/*
// @author Daft Archer
// @version 1.3
// ==/UserScript==

function changeDocumentBackgroundColor() {
    var backcolor=null;

    // Replace the [Sites] Elements
    backcolor=document.getElementById('kix-page ');
    
    backcolor.setAttribute('background-color', 'rgb(100, 100, 100)');
};

try {
        changeDocumentBackgroundColor();
} catch (e) {
        setTimeout(changeDocumentBackgroundColor, 2000);
}