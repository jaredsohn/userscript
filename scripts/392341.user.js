// ==UserScript==
// @name       PROTF Chat Notification
// @namespace  http://jsdoodle.com
// @version    0.1
// @description  Receieve an alert when a new message arrives on protf chat
// @match      https://www.pantheonrotf.com/*
// @copyright  2014 JSDoodle
// ==/UserScript==

function addJQuery(e){var t=document.createElement("script");t.setAttribute("src","https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");t.addEventListener("load",function(){var t=document.createElement("script");t.textContent="("+e.toString()+")();";document.body.appendChild(t)},false);document.body.appendChild(t)}addJQuery(function(){function n(e){console.log("attempting to play sound...");if(t[e]){t[e][0].play();console.log("...sound should have played")}else{console.log("...can not find sound.")}}var e=jQuery.noConflict();var t={chat1:e('<audio src="https://jsdoodle.com/cloud9/preview/protf/EC/chat1.mp3" />').appendTo("body"),join1:e('<audio src="https://jsdoodle.com/cloud9/preview/protf/EC/join1.mp3" />').appendTo("body")};e("#chat_messages_wrapper_1").bind("DOMNodeInserted DOMNodeRemoved",function(t){if(t.type=="DOMNodeInserted"){if(t.srcElement.className=="chat_message_info"){var r=e(t.srcElement),i=r.find(".chat_message_info_body").text();if(i.match(/ ?has joined the room./gi)){n("join1");return}n("chat1")}}})})