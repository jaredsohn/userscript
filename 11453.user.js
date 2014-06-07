
// Asciimoo
// version 0.1 BETA!
// 2005-04-25
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//        
// --------------------------------------------------------------------
//        
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//        
// --------------------------------------------------------------------
//        
// ==UserScript==
// @name          iwiw multiselect
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   multiselect in wiw - messages
// @include       http://*wiw.*/pages/message/compose.jsp*
// ==/UserScript==

document.getElementsByName('availableUsers')[0].multiple="multiple";
