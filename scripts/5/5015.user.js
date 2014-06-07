// Easynews Navigation Toolbar 
// version 0.1 BETA!
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Easynews Navigation Toolbar v0.1
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Makes surfing the web interface of easynews.com easier
// @include       http://*.easynews.com/*
// @include       https://*.easynews.com/*
// @include       http://easynews.com/*
// @include   	  https://secure.members.easynews.com*
// @include       http://140.99.99.90*
// ==/UserScript==

var logo = document.createElement("div");
logo.innerHTML = '<div style="text-align: center;"> '+ 
'<a href="http://members.easynews.com/">[Main]</a>&nbsp;&nbsp; '+
'<a href="https://www.easynews.com/edit/">[Account]</a>&nbsp;&nbsp; '+
'<a href="http://members.easynews.com/index.html?favorite=1&amp;alpha=1">[Favorites '+
'(Alpha)]</a>&nbsp;&nbsp; '+ 
'<a href="http://members.easynews.com/global4/search.html">[Global Search]</a>&nbsp;&nbsp;&nbsp; '+
'<a href="http://members.easynews.com/zipmanager.html">[Zip Manager]</a>&nbsp;&nbsp;&nbsp; '+
'<a href="http://www.easynews.com/survey/">[Survey]</a>&nbsp;&nbsp;&nbsp; '+
'<a href="http://www.easynews.com/support/?nocache=1126818496">[Support]</a>&nbsp;&nbsp;&nbsp; '+
'<a href="http://forum.easynews.com">[Forum]</a><br><br> '+
'<a name="nzbimport"></a> '+
'<form enctype="multipart/form-data" action="/zipmanager.html" '+
'method="post"><input name="MAX_FILE_SIZE" '+
'value="52428800" type="hidden">Import NZB file: <input '+
'name="nbzfile" accept="text/nzb" type="file"> '+
'<input value="Send File" type="submit">  <hr></form> '+
'</div>';
document.body.insertBefore(logo, document.body.firstChild);