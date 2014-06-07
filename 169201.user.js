// ==UserScript==
// @name          My Script
// @description   Scripting is fun
// @include       *
// @exclude       
// @version       1.0
// ==/UserScript==
var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'FireFox.css';
cssNode.media = 'screen';
headID.appendChild(cssNode);

var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://www.somedomain.com/somescript.js';
headID.appendChild(newScript);