// ==UserScript==
// @name           betty
// @namespace      betty
// @description    betty
// @include        http://livebeta.kaskus.us/*
// ==/UserScript==

//HIDE 
GM_addStyle(".banner-top-ads {display:none;} .ad300 {display:none;} 
body a[href="http://kkcdn-static.kaskus.us/css_v0.1/img/logo-beta.png"] {display: none;}");


//TOP NAVIGATION
var target = document.getElementById("content-wrapper");
var hotcat = document.createElement("div");
var address = document.URL;
var forum = "http://livebeta.kaskus.us/forum/";
if ( address == forum){
	target="";
}

hotcat.innerHTML = '<div id="wrap"><div id="hotCat" align="center"> '+
    '<strong>Hot Categories: <a href="http://livebeta.kaskus.us/forum/21/">Lounge</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/49/">B-Log</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/19/">Computer</a>' +
	' | <a href="http://livebeta.kaskus.us/forum/9/">Jokes</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/11/">Movies</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/23/">Supranatural</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/35/">Sports</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/44/">Games</a> '+
	' | <a href="http://livebeta.kaskus.us/forum/28/">Otomotif</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/33/">Music</a> '+
	' | <a href="http://livebeta.kaskus.us/forum/78/">Reg. Jakarta</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/31/">KSP</a>'+
	' | <a href="http://livebeta.kaskus.us/forum/">All Categories</a></strong>'+
    '</div></div>';

target.parentNode.insertBefore(hotcat, target);

GM_addStyle(" "+
"#hotCat{margin: 0pt; padding:10px 20px; font-size:80%; background-color:#f2f2f2;} "+
"#hotCat a:visited{color:rgb(33,100,183)!important;} "+
"#hotCat a:hover, #hotCat a:focus, #hotCat a:active{text-decoration:underline}"+
"#wrap{background: none repeat scroll 0 0 rgba(255, 255, 255, 0.624); border: 1px solid #CCCCCC; border-radius: 5px 5px 5px 5px; bottom: -5px; box-shadow: 0 0 1px #CCCCCC; width:940px; margin:5px auto 14px; padding:4px 4px} ");