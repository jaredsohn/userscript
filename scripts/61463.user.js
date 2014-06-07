// ==UserScript==
// @name Buttonizer
// @description This script converts links into buttons so that they are easier to spot.
// @include *
// @author Electroduck
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://www.electroduck.com/css/buttonizer.css';
cssNode.media = 'screen';
headID.appendChild(cssNode);