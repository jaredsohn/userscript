// ==UserScript==
// @name        Youtube old slogan restore
// @namespace   http://userscripts.org/users/428476
// @description this script adds youtube's old slogan 'broadcast yourself' back both next to the logo and in the title and also restores the old logo.
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_registerMenuCommand
// @grant          GM_listValues
// @grant          GM_addStyle
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1.2
// ==/UserScript==



$(document.createElement("button"))
	.attr("id", "slogan")
	.attr("class", "master-sprite")
	.insertAfter("#logo-container");





if (document.title == "YouTube") {
document.title = "YouTube - Broadcast Yourself."
}










var cssToInsert = ".master-sprite {background: url(http://web.archive.org/old-web/20090629011634/http://s.ytimg.com/yt/img/master-vfl102488.png) repeat-x scroll 0px 0px transparent !important; border:0px none !important;padding:0px !important; cursor:pointer !important;}   #yt-masthead #slogan {width:125px !important; height:11px !important; background-position: 0px -33px !important; margin: 2px 2px 3px !important; cursor:default !important; display:block !important; float:left !important;}                                    #logo-container {margin-left:0px !important; margin-top:-2px !important; margin-right:0px !important;}  #logo-container:not(.doodle) #logo:not(.doodle) {background:url(https://s.ytimg.com/yt/imgbin/www-master.png) -79px -20px !important; width:110px !important; height:40px !important;}  #logo-container .content-region {display:none !important;}    ";






var head=document.getElementsByTagName('head')[0];
if(!head)
	return;
var style=document.createElement('style');
style.setAttribute('type','text/css');
style.appendChild(document.createTextNode(cssToInsert));
head.appendChild(style);


