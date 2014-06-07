
// Del.icio.us Direc.tor User Script
// version 0.2
// 2006-04-09
// Copyright (c) 2005-2006, Joe Grossberg
// under Creative Commons License: http://creativecommons.org/licenses/by-nc-sa/2.0/
// Based on John Vey's Del.icio.us Direc.tor: http://johnvey.com/features/deliciousdirector/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Access Bar", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Del.icio.us Direc.tor User Script
// @namespace     http://www.joegrossberg.com/deliciousdirector.user.js
// @description   automatically run the direc.tor bookmarklet
// @include       http://del.icio.us/*
// ==/UserScript==

var element=document.createElement('script'); 
element.src= 'http://johnvey.com/features/deliciousdirector/dboot.js'; 
document.body.appendChild(element);

//
// ChangeLog
// 2006-04-09 - 0.2 - new 0.6+ style of GM
// 2005-09-30 - 0.1 - first edition
//
