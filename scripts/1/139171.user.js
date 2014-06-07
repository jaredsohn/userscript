// ==UserScript==
// @name        Twitch.TV BackColor Changer
// @namespace   twitchcolor
// @description Change the background color of your channel
// @include     http://*.twitch.tv/settings?section=design
// @version     1.0
// ==/UserScript==

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

loadjscssfile("http://hardreton.webcindario.com/scripts/jscolor/jscolor.js", "js")

var backcolor = document.createElement("div");
backcolor.setAttribute("id", "back_color");

var insert = document.getElementById('user_background_no_repeat');
insert.parentNode.insertBefore(backcolor, insert);

backcolor.innerHTML = "<label>Change Backcolor</label>";
backcolor.innerHTML += "<div><input class=\"color {hash:true}\" name=\"user[channel_background_color]\" value=\"#262626\"></div>";