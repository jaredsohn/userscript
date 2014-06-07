// ==UserScript==
// @name Replace Audio Tag
// @namespace 
// @description Script just looks on the page <audio> tag and assigns the value.
// @author Freem
// ==/UserScript==


var audio = document.getElementsByTagName("audio");
for (var i=0;i<audio.length;i++)
{
  audio[i].src="http://imgt.zz.mu/alert.mp3";
}
