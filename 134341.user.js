// ==UserScript==
// @name           Hot Share for Kaskus Beta Only
// @namespace      com.orangdalam.blogsome
// @version	   1.9
// @updateURL	   https://userscripts.org/scripts/source/127551.meta.js
// @description    Hot Share for quicker access
// @include        http://livebeta.kaskus.co.id/*
//
// What it does:
// Add Share Link on KasBet
//
// ----Change Log---
// V 1.9
// First Released!
// 
// ==/UserScript==

var target = document.getElementById("content-wrapper");
var hotcat = document.createElement("div");
var address = document.URL;
var forum = "http://livebeta.kaskus.coo.id/forum/";
if ( address == forum){
	target="";
}

hotcat.innerHTML = '<div id="wrap"><div id="hotCat" align="center"> '+
    '<strong>Hot Share: <a href="http://livebeta.kaskus.co.id/forum/21/">Lounge</a>'+
	' | <a href="http://www.askvg.com/">AskVG</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/14/">CCPB</a>' +
	' | <a href="http://www.mediafire.com/">Mediafire</a>'+
	' | <a href="http://www.youtube.com/">YouTube</a>'+
	' | <a href="http://www.facebook.com/">Facebook</a>'+
	' | <a href="http://www.filehippo.com/">FileHippo Download</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/44/">Games</a> '+
	' | <a href="http://www.twitter.com/">Twitter</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/33/">Music</a> '+
	' | <a href="http://livebeta.kaskus.co.id/profile/2852815/">Eorxroa</a>'+
	' | <a href="http://livebeta.kaskus.co.id/forum/31/">KSP</a>'+
	' | <a href="http://livebeta.kaskus.co.id/myforum/">My Profile</a></strong>'+
    '</div></div>';

target.parentNode.insertBefore(hotcat, target);

GM_addStyle(" "+
"#hotCat{margin: 0pt; padding:10px 20px; font-size:80%; background-color:#f2f2f2;} "+
"#hotCat a:visited{color:rgb(33,100,183)!important;} "+
"#hotCat a:hover, #hotCat a:focus, #hotCat a:active{text-decoration:underline}"+
"#wrap{background: none repeat scroll 0 0 rgba(255, 255, 255, 0.624); border: 1px solid #CCCCCC; border-radius: 5px 5px 5px 5px; bottom: -5px; box-shadow: 0 0 1px #CCCCCC; width:940px; margin:5px auto 14px; padding:4px 4px} ");