// ==UserScript==
// @name           Nozbe - Bright Icons
// @namespace      http://www.davidfichtmueller.de
// @description    sets to icons for the tasks to full opacity in the new Nozbe design
// @version        0.1
// @license        MIT License; http://www.opensource.org/licenses/mit-license.php
// @include        https://secure.nozbe.com/nozbe/account/new
// ==/UserScript==

var style = "#task .action_right img {    opacity: 1; }";
//add functions to header
var header = document.getElementsByTagName('head')[0];
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = style;
header.appendChild(styleElement);