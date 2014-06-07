// ==UserScript==
// @name           body background dark theme correction
// @namespace      http://userscripts.org/users/eternalsword
// @description    If no background is set for the body, default it to white and set text to black to cover case where neither is set.
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js?ver=1.6
// ==/UserScript==

var imUndefined;
var bodyBackground = $('body').css('background');
var bodyBackgroundColor = $('body').css('background-color');
if((bodyBackground === imUndefined || bodyBackground === "") 
&& (bodyBackgroundColor === imUndefined || bodyBackgroundColor === "" || bodyBackgroundColor === "transparent"))
{
	$('body').css('background-color', 'white');
	$('body').css('color', 'black');
}
