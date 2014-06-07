// ==UserScript==
// @name           TheSun.uk Disable Right-Click Alert
// @description    Disables alert messages that pop up by right-clicking on certain images on TheSun.uk
// @include        http://www.thesun.co.uk/*
// ==/UserScript==
var varReset = document.createElement("script");
varReset.innerHTML = 'var bDisableRightClick=false;' ;
var styleTag = document.getElementsByTagName('style')[0];
styleTag.parentNode.insertBefore(varReset, styleTag.nextSibling);
