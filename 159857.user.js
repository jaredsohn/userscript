// ==UserScript==
// @name        Facbook redirect
// @namespace   
// @include     http://*.facebook.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==


$(function()
{

	var url=window.location.href;

	var pattern=/^http:\/\/facebook.com\/g;

	if(url.search(pattern)==0)
	{
		window.location.href=url.replace("facebook","airtel");
	}
}