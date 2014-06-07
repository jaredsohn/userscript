// ==UserScript==
// @name           Facebook autoLatest
// @namespace      //
// @include        *facebook.com/?sk=h_nor
// @include	   *facebook.com/
// ==/UserScript==



if(window.location.href.toString().indexOf("/?sk=h_chr") < 0 && window.location.href.toString().indexOf("l.php") < 0 && window.location.href.toString().indexOf("post") < 0 && window.location.href.toString().indexOf("profile") < 0 && window.location.href.toString().indexOf("permalink") < 0)
{
	document.location = document.location.toString().split("com")[0] + "com/?sk=h_chr";
}

GM_addStyle(".storyHighlightIndicatorWrapper{display:none!important;}");
