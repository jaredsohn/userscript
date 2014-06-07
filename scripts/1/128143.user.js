// ==UserScript==
// @name           kaskusBetamyCategories
// @namespace      com.orangdalam.blogsome
// @version	       1.2.1
// @description    my categories for quicker access
// @include        http://livebeta.kaskus.co.id/*
// Lounge, Berita & Politik, Computer, Jokes, Movies, 
// Supranatural, Sports, Games, Otomotif, Music, Regional
// What it does:
// Add dot categories link
//
// ----Change Log---
// V 1.2.1
// Also visible in user cp
//
// V 1.2
// my categories in home
//
// V 1.1
// All categories added
//
// ==/UserScript==

var target = document.getElementById('content-wrapper');
var hotcat = document.createElement("div");
var address = document.URL;
var forum = "http://livebeta.kaskus.co.id/forum/";
if ( address == forum){
	target="";
}

hotcat.innerHTML = '<div id="hotCat" align="center"> '+
    '<strong>Hot Categories: <a href="http://livebeta.kaskus.co.id/forum/21/">Lounge</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/49/">b log collections</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/479/">cinta indonesiaku</a>' +
	' | <a href="http://livebeta.kaskus.co.id/forum/9/">Jokes</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/537/">sport games</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/31/">KSPSK</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/104/">Soccer room</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/44/">Games</a> '+
        ' | <a href="http://livebeta.kaskus.co.id/forum/151/">Gratisan</a> '+
    '</div></strong>';

target.parentNode.insertBefore(hotcat, target);
//alert(address);
GM_addStyle(".view-first{top:47px !important;} #hotCat{margin: 0pt; padding:10px 20px;  font-size:80%;}#hotCat a{color:rgb(33,100,183);} #hotCat a:visited{color:rgb(33,100,183)!important;} #hotCat a:hover, #hotCat a:focus, #hotCat a:active{text-decoration:underline} ");