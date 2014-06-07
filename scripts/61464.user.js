// ==UserScript==
// @name Inverter
// @description This script changes backgrounds to black and forgrounds to white.
// @include *
// @author Electroduck
// ==/UserScript==


var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://www.electroduck.com/css/inverter.css';
cssNode.media = 'screen';
headID.appendChild(cssNode);