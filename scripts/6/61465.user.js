// ==UserScript==
// @name Holidays
// @description This script spices stuff up for the holiday season.
// @include *
// @author Electroduck
// ==/UserScript==


var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://www.electroduck.com/css/holidays.css';
cssNode.media = 'screen';
headID.appendChild(cssNode);