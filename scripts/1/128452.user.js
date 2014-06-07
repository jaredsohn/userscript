// ==UserScript==
// @name           Jemzz KB Scrips
// @namespace      https://twitter.com/#!/JemzzHS
// @version	       1.1.2
// @description    My Favourite KB Categories
// @include        http://livebeta.kaskus.us/*
// Lounge, Free Stuff, KSPsk, Jokes, Private Room, 
// Latihan Posting, Kaskus Radio, My Groupee, My Threads, My Posts, My FJB Thread
// What it does:
// Add dot categories link
//
// ----Change Log---
// V 1.0.0
// Hii!!
//
// ==/UserScript==

var target = document.getElementById('content-wrapper');
var hotcat = document.createElement("div");
var address = document.URL;
var forum = "http://livebeta.kaskus.us/forum/";
if ( address == forum){
	target="";
}

hotcat.innerHTML = '<div id="hotCat" align="center"> '+
    '<strong>Hot Categories: <a href="http://livebeta.kaskus.us/forum/21/">Lounge</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/151/">Free Stuff</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/31/">KSPsK</a>' +
	' | <a href="http://livebeta.kaskus.us/forum/9/">Jokes</a>'+
	' | <a href="http://livebeta.kaskus.us/thread/000000000000000011332776">Private Room</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/22/">Latihan Posting</a>'+
	' | <a href="http://livebeta.kaskus.us/pm">PM</a>'+
	' | <a href="http://livebeta.kaskus.us/profile/viewallgroups/">My Groupee</a> '+
	' | <a href="http://livebeta.kaskus.us/profile/viewallthreads">My Threads</a>'+
	' | <a href="http://livebeta.kaskus.us/profile/viewallposts/">My Posts</a> '+
	' | <a href="http://livebeta.kaskus.us/profile/viewallclassified/">My FJB Thread</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/">All Categories</a>'+
    '</div></strong>';

target.parentNode.insertBefore(hotcat, target);
//alert(address);
GM_addStyle(".view-first{top:47px !important;} #hotCat{margin: 0pt; padding:10px 20px;  font-size:80%;}#hotCat a{color:rgb(33,100,183);} #hotCat a:visited{color:rgb(33,100,183)!important;} #hotCat a:hover, #hotCat a:focus, #hotCat a:active{text-decoration:underline} ");