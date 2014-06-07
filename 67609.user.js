// ==UserScript==
// @name CS manager Tags replacer
// @namespace eeexception.org/
// @version 0.2
// @source cs-manager.com/
// @description Script which replaces tags with java applet include to be supported in chrome
// @include http://applet.cs-manager.com/*
// @include http://www.cs-manager.com/applet/*
// @run-at document-start
// ==/UserScript==

var javaAppletObject = document.getElementsByTagName('object')[0];
var parentDiv = javaAppletObject.parentNode;
var javaObjectContent=parentDiv.innerHTML;

parentDiv.removeChild(javaAppletObject);

parentDiv.innerHTML=javaObjectContent.replace('<object codetype="application/x-java-applet"','<object type="application/x-java-applet" codetype="application/java"');
