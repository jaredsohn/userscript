// ==UserScript==
// @name           Jake prank script
// @author         Prankster Prankson

// @version        1.0
// @namespace      
// @description    Just a prank script for a friend, move on.
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


var today = new Date();
var baselinedate = new Date(2012,07,13);
var oneday = 24*60*60*1000;

var dayssincestart = Math.abs((baselinedate.getTime() - today.getTime())/(oneday));
var degreesrotation = (dayssincestart/10);

$('body').css({'-webkit-transform': 'rotate('+ degreesrotation +'deg)'});