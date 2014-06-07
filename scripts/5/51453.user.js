// ==UserScript==
// @name           Custom Error Images
// @namespace      Custom Error Images
// @description    Bless This Mess!
// @include        http://*bungie.net/*
// ==/UserScript==

var imgs=document.evaluate(".//img",document.body,null,4,null);
for(var img=imgs.iterateNext();img;img=imgs.iterateNext())
{
  if (img.src.indexOf("/images/errors/blessthismess.jpg")!=-1) img.src="http://soffish.com/Soffish_files/water_stuff.gif";
  else if (img.src.indexOf("/images/errors/gonefishing.jpg")!=-1) img.src="http://soffish.com/Soffish_files/soffish.gif";
  else if (img.src.indexOf("images/errors/hegemony.jpg")!=-1) img.src="http://i376.photobucket.com/albums/oo205/robby118bnet/lingling-1.jpg";
}

// <3 u guise
// but gtfo!
// no im just kiddin u can stay
// or am i?