// ==UserScript==
// @name           kaskusBetaHotCategories
// @namespace      com.orangdalam.blogsome
// @version	       1.3.1
// @description    Hot categories for quicker access
// @include        http://livebeta.kaskus.co.id/*
//
// What it does:
// Add dot categories link
//
// ----Change Log---
// V 1.3.1
// Domain fix
//
// V 1.3
// KSP added
// Kasbet style
//
// V 1.2.1
// Also visible in user cp
//
// V 1.2
// Hot categories in home
//
// V 1.1
// All categories added
//
// ==/UserScript==

var target = document.getElementById("content-wrapper");
var hotcat = document.createElement("div");
var address = document.URL;
var forum = "http://livebeta.kaskus.co.id/forum/";
if ( address == forum){
	target="";
}

hotcat.innerHTML = '<div id="wrap"><div id="hotCat" align="center"> '+
    '<strong>Hot Categories: <a href="http://livebeta.kaskus.co.id/forum/21/">Lounge</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/10/">Berita & Politik</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/19/">Computer</a>' +
	' | <a href="http://livebeta.kaskus.co.id/forum/9/">Jokes</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/11/">Movies</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/23/">Supranatural</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/35/">Sports</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/44/">Games</a> '+
	' | <a href="http://livebeta.kaskus.co.id/forum/28/">Otomotif</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/33/">Music</a> '+
	' | <a href="http://livebeta.kaskus.co.id/forum/72/">Regional</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/31/">KSP</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/">All Categories</a></strong>'+
    '</div></div>';

target.parentNode.insertBefore(hotcat, target);

GM_addStyle(" "+
"#hotCat{margin: 0pt; padding:10px 20px; font-size:80%; background-color:#f2f2f2;} "+
"#hotCat a:visited{color:rgb(33,100,183)!important;} "+
"#hotCat a:hover, #hotCat a:focus, #hotCat a:active{text-decoration:underline}"+
"#wrap{background: none repeat scroll 0 0 rgba(255, 255, 255, 0.624); border: 1px solid #CCCCCC; border-radius: 5px 5px 5px 5px; bottom: -5px; box-shadow: 0 0 1px #CCCCCC; width:940px; margin:5px auto 14px; padding:4px 4px} ");