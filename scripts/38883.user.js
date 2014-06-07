// Hello World! example user script
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FasterFavtape 
// @namespace     http://favtape.com 
// @description   disable downloads of album art to speed up things 
// @include       http://favtape.com/*
// ==/UserScript==

var v = document.getElementsByClassName('video');
var v_len = v.length;
for(var i=0; i< v_len; i++)
{
  v[i].childNodes[0].src="http://favtape.com/img/black.gif";
}
var a = document.getElementsByClassName('albumart');
var a_len = a.length;
for(var i=0; i< a_len; i++)
{
  a[i].childNodes[0].src="http://favtape.com/img/black.gif";
}

