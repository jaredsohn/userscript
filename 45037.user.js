// ==UserScript==
// @name Time Title
// @author Ben Williams
// @date 23-03-2009
// @version 1.0
// @namespace Time & Date
// @description Displays Time and Date in the Title
// @include *
// ==/UserScript==
var now= new Date();
var hh=now.getHours();
var mn=now.getMinutes();
var ss=now.getSeconds();
var yy=now.getFullYear();
var mm=now.getMonth();
var dd=now.getDate();
var dy=now.getDay();

var days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
if (mn < 10) { mn="0"+mn;}
mm=months[mm];
dy=days[dy];

now = hh+":"+mn+", "+dy+" "+dd+" "+mm+" "+yy;

document.title=now;