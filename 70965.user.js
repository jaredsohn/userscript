// ==UserScript==
// @name           twit.tv: Side Chat
// @namespace      http://www.rusmar-solutions.com/ralig/twit.tv-sidechat
// @include        http://live.twit.tv/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$('#wrapper').css("margin","0");
$('#wrapper').css("padding","10px 10px 0");
$('#wrapper').before('<div id="chat" style="left:935px; position:absolute; z-index:1; margin-top:57px; -moz-border-radius:10px; -moz-box-shadow:0 3px #666; border:5px solid white;"><iframe src="http://live.twit.tv/chat.html" style="height: 553px; width: 300px; border:none; "/></div>');