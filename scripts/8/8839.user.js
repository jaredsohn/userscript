// ==UserScript==
// @name      VcdQuality Matrix Style
// @version	0.2
// @description  VcdQuality Entering the Matrix
// @include    http://*.vcdquality.com/*
// @include    http://vcdquality.com/*
// ==/UserScript==



// GLOBAL COLOR DEFINITIONS -------------------
dark1 = "black";
light1 = "green";
Font_Family = "Monospace, Courrier";

/************************************************/

// STYLE DEFINITIONS

GM_addStyle("#content {display:list-item;} ");

GM_addStyle("body {background:black none repeat scroll 0%;font-family:"+Font_Family+";margin:0pt;padding:0pt;text-align:center;} ");

GM_addStyle("#wrapper {background:#000008 url(http://www.websitemaken.be/item_pics/157.jpeg) repeat-y scroll 0%;} ");

GM_addStyle("table tr td, table tr td a, table .odd td, table .odd td a {background:"+dark1+" none repeat scroll 0%;color:"+light1+";font-size:11px;Font-family:"+Font_Family+"; font-weight: normal ;padding-bottom:2px;text-decoration:none;} ");

GM_addStyle("#logo {background:transparent url(http://shell-and-desktop.softlandmark.com/images/thumbnails/1543.jpg) no-repeat scroll 18%;border-bottom:1px solid green;height:89px;width:977px;border-left:18px;} ");

GM_addStyle("#nav ul li a {background:transparent url(http://www.moumn.org/map/1%20green%20dot.gif) no-repeat scroll -2px 5px;color:Linen;font-family:fantasy;font-size:9px;padding-left:8px;text-decoration:none;text-transform:uppercase;}");

GM_addStyle("table th {background:none repeat scroll 1% 50%;border-bottom:1px solid;color:green;font-weight:lighter;padding-left:5px;} ");

GM_addStyle("#content {background:transparent url(http://i.d.com.com/i/dl/media/dlimage/34/40/5/34405_small.jpeg) repeat scroll right top;display:table-cell;margin-left:153px;min-height:4px;padding:9px;width:823px;} ");

GM_addStyle("table th a {background:black none repeat scroll 0%;color:beige;text-decoration:none;}");
GM_addStyle("#nav select {background:transparent none repeat scroll center bottom;margin-bottom:5px;margin-left:10px;margin-top:5px;}");

//GM_addStyle("#nav h4 {color:greenYellow;margin:0pt 0pt 0pt 2px;}");

GM_addStyle("#nav h4 {color:darkgreen;font-family:fantasy;margin:4pt 5pt 5pt 2px;}");
GM_addStyle("#prevnext p, #prevnext p a {background:transparent repeat scroll 0%;color:green;font-family:fantasy;font-size:10px;}");
//GM_addStyle("#prevnext p {background:transparent repeat scroll 0%;border:1px dotted;display:inlinefont-family:fantasy;font-size:10px;margin:9px 12px 0pt 0pt;padding:3px;color:green;}");

GM_addStyle("#search input {background:transparent none repeat scroll 0% 50%;color:green;height:17px;width:174px;}");


var elmDeleted = document.getElementById("textbanner");
elmDeleted.parentNode.removeChild(elmDeleted);
var elmDeleted2 = document.getElementById("eXTReMe");
elmDeleted2.parentNode.removeChild(elmDeleted2);
var elmDeleted3 = document.getElementById("stats");
elmDeleted3.parentNode.removeChild(elmDeleted3);
//var elmDeleted4 = document.getElementById("nav_partners");
//ElmDeleted4.parentNode.removeChild(elmDeleted4);
//http://static.vcdquality.com/styles/classic/jpg.gif
//http://static.vcdquality.com/styles/dark/jpg.gif



