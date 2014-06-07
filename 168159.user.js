// ==UserScript==
// @name        TheOldReaderFix
// @description Make The Old Reader to look a little more like google reader
// @namespace   sreit99.blogspot.com
// @include     http://theoldreader.com/*
// @grant       GM_log
// @grant       GM_addStyle
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @version     0.4
// ==/UserScript==

GM_log("TheOldReaderFix starting...");

var navList = document.getElementsByClassName("nav nav-list").wrappedJSObject[0];

// Remove "Trending" category.
if (navList.childNodes.length > 8)
{
	navList.removeChild(navList.childNodes[9]);
	GM_log('Removed Trending category.');
}
else
{
	GM_log('WARNING: no Trending category found to delete.');
}
// Remove "Shared" category.
if (navList.childNodes.length > 6)
{
	navList.removeChild(navList.childNodes[7]);
	GM_log('Removed Shared category.');
}
else
{
	GM_log('WARNING: no Shared category found to delete.');
}

// Make the list more compact.
GM_log('Applying styles ...');

GM_addStyle('.well {background-color:white}' + ' !important'); // set bg color of post to white
GM_addStyle('.list-post {max-width:700px}' + ' !important');  // set max width of post to 700 px for easier reading
GM_addStyle('.post.listview .header {background-color:#EEEEEE}' + ' !important'); // set bg color of header to grey
GM_addStyle('.post.listview.unread .header strong {font-weight:bold}' + ' !important'); // make header bold on unread and normal on read
GM_addStyle('.post.listview .header strong {font-weight:inherit}'); 
GM_addStyle('.post.listview .header span {color: #777777}'); // make header text gray

$(".navbar").hide();
$("body").append("<button id='fixToggleNavBar' style='position:fixed;right:5px;top:px;z-index:2000'>Togggle NavBar</button>");
var oldNavBarHeight = $(".reader .container-fluid").css("top");
$(".reader .container-fluid").css("top","1px");
$("#fixToggleNavBar").click(function()
{
	$(".navbar").toggle();
	var temp = $(".reader .container-fluid").css("top");
	$(".reader .container-fluid").css("top",oldNavBarHeight);
	oldNavBarHeight = temp;
});

GM_log('TheOldReaderFix complete.');
