// ==UserScript==
// @name        Google Bookmarks Commands on Top
// @description Move all the command links in Google Bookmarks to the top
// @namespace   tag:danielepaolella@email.it
// @version     2013.03.26.2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include     https://www.google.com/bookmarks/*
// ==/UserScript==

var $lis, $cmds;
$.noConflict();
$lis = jQuery("#sidenav li");
$cmds = $lis.slice(-4);
$cmds.push($lis.get(-5)); // spacer
$cmds.insertBefore($lis[0]);
