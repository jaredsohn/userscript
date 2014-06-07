// ==UserScript==
// @name        The Escapist Download
// @namespace   somini
// @description Includes a direct link for videos on The Escapist site
// @icon		http://cdn.themis-media.com/media/sites/escapistmagazine/favicon.ico?v=1
// @downloadURL	http://userscripts.org/scripts/source/181143.user.js
// @updateURL	http://userscripts.org/scripts/source/181143.meta.js
// @include     http://www.escapistmagazine.com/videos/*
// @version     1.1
// @grant       none
// ==/UserScript==

var playerO = document.getElementById("player_api");
var menuDiv = document.getElementById("video_player_menu");
var url = window.location;

//setup the link
var linkA = document.createElement("a");
linkA.appendChild(document.createTextNode("Direct Link"));
linkA.setAttribute("class","video_menu_link");
menuDiv.insertBefore(linkA,menuDiv.firstChild);

//get the url
var fvars = document.getElementsByName('flashvars');
var urlConfig = decodeURIComponent(fvars[0].value).match("http.*\.js");
var data = jQuery.ajax({
            url: urlConfig, 
            async: false,
            dataType: 'json'
        }).responseText;
var regex = /http[:/\w.?&-]*\.mp4/.exec(data);
var url = regex[0];

//add the URL to the link and replace the flash object
linkA.setAttribute("href",url);

var divUp = playerO.parentNode;
divUp.innerHTML = "";
var v = document.createElement("video");
v.src = url;
v.setAttribute("height","100%");
v.setAttribute("width","100%");
v.setAttribute("controls","");
divUp.appendChild(v);

//Fixes up the location
document.getElementById("video_player_object").style="";