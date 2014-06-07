// ==UserScript==
// @name        Google - Revert height to pre-3/1/2011 change.
// @namespace   polymath.mit.edu
// @description Revert height of emails in inbox to 2.83ex.
// @include     *.google.*
// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @version     0.3
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML = "body table td.xY { height: 2.83ex !important; }";
headID.appendChild(cssNode);
