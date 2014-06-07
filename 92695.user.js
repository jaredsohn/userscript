// ==UserScript==
// @name         	Live Post Preview
// @description		Automatically renders your post as you type it
// @version	 		2.1
// @include			http*://*.bungie.net*createpost.aspx*
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @author	  		dazarobbo
// @copyright		2012, dazarobbo
// @license 		(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==
"use strict";

String.prototype.HTMLEncode = function(){
	return this.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;");
}

function _RegexLoop(s, regex, repl){
	while(regex.test(s)) s = s.replace(regex, repl);
	return s;
}

function Convert(text){
	text = text.HTMLEncode();
	text = _RegexLoop(text, /\[b\]((\s|\S)*?)\[\/b\]/i, '<b>$1</b>');
	text = _RegexLoop(text, /\[i\]((\s|\S)*?)\[\/i\]/i, '<i>$1</i>');
	text = _RegexLoop(text, /\[u\]((\s|\S)*?)\[\/u\]/i, '<u>$1</u>');
	text = _RegexLoop(text, /\[quote\]((\s|\S)*?)\[\/quote\]/i, '<span style="background-color:#161617; border:1px inset #414547; display:block; margin-bottom:5px; margin-top:5px; padding:2px 2px 2px 4px;">$1</span>');
	text = _RegexLoop(text, /\[url\]((?:http:\/\/|\/)(\s|\S)*?)\[\/url\]/i, '<a href="$1">$1</a>');
	text = _RegexLoop(text, /\[url=(http:\/\/(?:\s|\S)*?|\/(?:\s|\S)*?)\]((?:\s|\S)*?)\[\/url\]/i, '<a href="$1">$2</a>');
	text = _RegexLoop(text, /\[img\]((\s|\S)*?)\[\/img\]/i, '<img src="$1"/>');
	text = text.replace(/\r?\n/g, "<br/>");
	return text;
}

var previewBox = $("<div><p><strong>Preview:</strong></p><span/></div>")
	.attr("class", "formgroup1")
	.css("wordWrap", "break-word")
	.insertBefore("#ctl00_mainContent_postForm_skin_bodyPanel")
	.find("span");
	
$("#ctl00_mainContent_postForm_skin_bodyPanel").keyup(function(){
	var text = $(this).find("textarea:first").val();
	text = Convert(text);
	previewBox.html(text);
});
