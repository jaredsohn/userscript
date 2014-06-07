// ==UserScript==
// @name           8TracksImage-off
// @namespace      http://sarakladky.com
// @description    Adds the option to turn off/on "album art" to 8Tracks.com
// @include        http://8tracks.com/*
// @exclude        http://8tracks.com/content_policy
// @exclude        http://8tracks.com/about
// @exclude        http://8tracks.com/team
// @exclude        http://8tracks.com/advertising
// @exclude        http://8tracks.com/media
// @exclude        http://8tracks.com/jobs
// @exclude        http://8tracks.com/users/*
// @exclude        http://8tracks.com/apps
// @exclude        http://8tracks.com/plus
// @exclude        http://8tracks.com/developers
// @exclude        http://8tracks.com/faq
// @exclude        http://8tracks.com/troubleshoot
// @exclude        http://8tracks.com/licensing
// @exclude        http://8tracks.com/copyright
// @exclude        http://8tracks.com/terms
// @exclude        http://8tracks.com/privacy
// ==/UserScript==

headerCode = '<div id="container"><div id="instructions_outside"><div id="instructions_inside"> <p class="white_txt">Toggle Album Art <span id="switcher">Off</span></p></div></div></div>';
var header;
header = document.createElement('div');
header.innerHTML = headerCode;

var el=document.getElementById("headerboard");
if(el !== null) {
	document.body.insertBefore(header, document.body.firstChild);
	GM_addStyle("body {	padding-top: 33px !important;}");
}


GM_addStyle("#container {	overflow: hidden;	position:fixed;	top:0;	width:100%;	height:30px;	z-index:999999999;	background-color:#ffffff;	text-align: center;	clear: both;	border-bottom-width:1px;	border-bottom-style:solid;	border-bottom-color:#999999;}#instructions_outside {	width:400px;	height:28px;	background-color:#002A42;	display:inline-block;	margin-left: auto;	margin-right: auto;	text-align: center;	border-radius: 8px; border-style:solid; border-width:1px; border-color:white;}#instructions_inside {	display:inline-block;	margin-left: auto;	margin-right: auto;	text-align: left;}.white_txt {	font:16px helvetica,sans-serif;	color:#ffffff;	font-weight:bold;	display: inline;	line-height:200%;}");

document.onclick=check;
var showImages = true;
function check(e){
	var target = (e && e.target) || (event && event.srcElement);
	
	if(checkParent(target)==true && showImages==true)
	{
		document.styleSheets[2].insertRule(".cover {visibility:hidden !important;}", 0);
		document.styleSheets[2].insertRule('.grid_description a {display:block !important; background-color: #eeeeee !important;}', 0);
		document.getElementById("switcher").innerHTML = "On";
		showImages = false;
	} 
	else if (checkParent(target)==true && showImages==false)
	{
	    document.styleSheets[2].deleteRule(0);
		document.styleSheets[2].deleteRule(0);
		document.getElementById("switcher").innerHTML = "Off";
		showImages = true;
	}
	
}
function checkParent(t){
	while(t.parentNode){
		if(t==document.getElementById('instructions_outside')){
			return true
		}
		t=t.parentNode
	}
	return false
}