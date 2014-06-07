// ==UserScript==
// @name        Google - Simplify style of top links
// @namespace   polymath.mit.edu
// @description Makes the blue border on the top of Google pages white.
// @include     *.google.*
// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @version     0.3
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML = "#gbx1, #gbx2," +
                    "#gb_70, #gbg4," +
                    ".gbz0, .gbz0l," +
                    "#gbz .gbzt, #gbz .gbgt," +
                    ".gbzt, .gbgt, .gbgtd," +
                    ".gbz0 .gbtb2, .gbz0l .gbtb2 { border-top-color: white; }" +
                    "#gbx3, #gbx4 { background: #fff !important; }" +
                    "body .gbz0 .gbtb2, body .gbz0l .gbtb2 { border-top-color: #DCE8F5 !important; }" +
                    "body .gbzt-hvr, body .gbzt:focus, body .gbgt-hvr, body .gbgt:focus, body .gbgtd-hvr, body .gbgtd:focus { border-top: 2px solid #DCE8F5 !important; }";
headID.appendChild(cssNode);