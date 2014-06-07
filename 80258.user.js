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
// @name          MOOvie loader
// @namespace     http://chipdesign.tarhely.biz/
// @description   MOOvie no wait script
// @include       http://moovie.hu/gofilm/*
// @include       http://moovie.hu/film/*
// @include       http://www.moovie.hu/gofilm/*
// @include       http://www.moovie.hu/film/*
// ==/UserScript==

/*
function IncludeJavaScript(jsFile)
{
  document.head.write('<script type="text/javascript" src="'
    + jsFile + '"></scr' + 'ipt>'); 
}


IncludeJavaScript('http://code.jquery.com/jquery-1.4.2.min.js');
*/


//alert('Loading');
var li = location.href;

li = li.replace('www.','');
li = li.replace('http://','');

//alert(li.substring(0,22));
//var b = li.substring(0,22)
var b = new Array();
b = li.split('/');
//alert(b[1]);

if ( b[1] == 'gofilm' ){

var a = document.getElementById('timed');
location.href = a.href;

}else if ( b[1] == 'film' ){

}