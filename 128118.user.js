// ==UserScript==
// @name         My Custom Kaskus Live Beta Themes
// @namespace    http://hendra27.blogspot.com/
// @version      0.1.2
// @description  My Custom Kaskus Live Beta Themes
// @include        http://livebeta.kaskus.co.id/*
// @copyright  2012+, You
// include: 
//  - Calm Themes
//  - No Advertising
//  - Little header forum
//  - add "myforum" button
//  
//
// Changelog:
// v 0.1.2
// change domain livebeta.kaskus.co.id
// V 0.1.1
// unread subscribed title color
// advertise bug
// V 0.1
//
// ==/UserScript==


var target = document.getElementById('profile-nav');
var hotcat = document.createElement("div");
var address = document.URL;
var forum = "http://livebeta.kaskus.co.id/forum/";
if ( address == forum){
	target="";
}

hotcat.innerHTML = '<div id="myforumlink" align="right"> '+
                    "<b><a href='http://livebeta.kaskus.co.id/myforum'>MyForum</a></b>"+
    '</div>';

target.parentNode.insertBefore(hotcat, target);
GM_addStyle("body.forum { color: black; background-color:#999; } #Advertisement{display:none  !important} embed{display:none  !important} #myforumlink{position:relative; margin-right:-87px} .col grid-12{display:none} .banner-top-ads{display:none} .ad300{display:none}  #content-body .header{margin:0px;padding:0px;} a:visited {color:none !important} #breadcrumb-wrap{color:black;} #breadcrumb-wrap a:visited{color:rgb(33, 100, 183);} .main-column{background-color: #F5F5FF;} .post-entry{background: #F5F5FF;} .post-header{background-color:#457BB7 !important; background-image:none !important;} .link_thread_title {color:black !important; } .rate span {color:black !important; text-shadow:none !important;} .post-title a, .post-content a{color:black !important} .post-title a:visited{color:#6598D6  !important} .reputation-table a:visited{color:rgb(33, 100, 183) !important;} ::selection{background:#3396fe; color:white}::-moz-selection{background:#3396fe; color:white} .fjb .post-header{background-color:#E0710F !important; background-image:none !important; text-shadow:1px 1px rgb(147,74,10) !important;}");