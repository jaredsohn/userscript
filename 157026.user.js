// ==UserScript==
// @name        Scroll To Video Button for YouTube
// @namespace   http://userscripts.org/users/SystemDisc
// @description Adds a button to the top left of YouTube to scroll the video you're watching into view
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include     https://*.youtube.com/watch*
// @include     http://*.youtube.com/watch*
// @grant       none
// @downloadURL	https://userscripts.org/scripts/source/157026.user.js
// @updateURL	https://userscripts.org/scripts/source/157026.meta.js
// @version     1.03
// ==/UserScript==

$ = jQuery.noConflict(true); //stop jQuery from breaking the page if it already uses a $ var

if(unsafeWindow.top.window.scrolltoloaded == 1)
{
    return;
}

var scrollButton = unsafeWindow.document.createElement("button");
var scrollButtonImg = unsafeWindow.document.createElement("img");
$(scrollButtonImg).attr("class","yt-uix-button-arrow");
$(scrollButtonImg).attr("style","border-bottom-color: #555555;border-color: #555555 !important;border-width: 4px !important;border-radius: 4px;-moz-border-radius: 4px;");
$(scrollButtonImg).attr("src","//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif");
$(scrollButton).append(scrollButtonImg);
$(scrollButton).attr("title","Scroll to Video");
$(scrollButton).attr("class"," yt-uix-button yt-uix-button-default yt-uix-button-empty");
$(scrollButton).attr("role","button");
$(scrollButton).attr("type","button");
$(scrollButton).attr("id","testb");
$(scrollButton).css("position","fixed");
$(scrollButton).css("top","2px");
$(scrollButton).css("left","2px");

if(unsafeWindow.prettyplaylistloaded == 1)
{
	$(scrollButton).css("left","47px"); // fix scroll-to-vid button if using Prettier Playlist script
}

$(scrollButton).css("z-index","100");
$(scrollButton).click(function() {
	offset = $("#player").offset(); // Contains .top and .left
    offset.top -= Math.ceil($('#watch7-playlist-bar').height());
	$('html, body').animate({
        scrollTop: offset.top
    }, 250);
});
$('body').append(scrollButton);

setTimeout(function(){
	offset = $("#player").offset(); // Contains .top and .left
    offset.top -= Math.ceil($('#watch7-playlist-bar').height());
	$('html, body').animate({
        scrollTop: offset.top
    }, 250);
},500);

function setButton() {
	page = 'html, body';
	offset = $("#player").offset(); // Contains .top and .left
    offset.top -= Math.ceil($('#watch7-playlist-bar').height());
	if($('body').scrollTop() > $('html').scrollTop())
	{
		page = 'body';
	}
	else if($('html').scrollTop() > $('body').scrollTop())
	{
		page = 'html';
	}
	if($(page).scrollTop() < offset.top)
	{
		if($(scrollButtonImg).css("style") != "border-bottom-color: transparent;border-top-color: #555555 !important;border-width: 4px 4px 0 !important;")
		{
			$(scrollButtonImg).attr("style","border-bottom-color: transparent;border-top-color: #555555 !important;border-width: 4px 4px 0 !important;");
		}
	}
	else if($(page).scrollTop() == offset.top)
	{
		if($(scrollButtonImg).css("style") != "border-bottom-color: #555555;border-color: #555555 !important;border-width: 4px !important;border-radius: 4px;-moz-border-radius: 4px;")
		{
			$(scrollButtonImg).attr("style","border-bottom-color: #555555;border-color: #555555 !important;border-width: 4px !important;border-radius: 4px;-moz-border-radius: 4px;");
		}
	}
	else
	{
		if($(scrollButtonImg).css("style") != "border-bottom-color: #555555;border-top-color: transparent !important;border-width: 0px 4px 4px 4px !important;")
		{
			$(scrollButtonImg).attr("style","border-bottom-color: #555555;border-top-color: transparent !important;border-width: 0px 4px 4px 4px !important;");
		}
	}
}
setButton();

$(unsafeWindow.top.window).scroll(setButton);

unsafeWindow.top.window.scrolltoloaded = 1; // let similar scripts know this script is loaded
