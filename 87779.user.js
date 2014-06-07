// ==UserScript==
// @name		Nautilus - more user friendly
// @namespace           SG_ST_SW
// @description         Show instantly mini-news on main page (no typing animation), enable fullscreen for YouTube movies, linkify titles of articles
// @include		http://nautilus.org.pl/*
// @include		http://www.nautilus.org.pl/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        1.0
// @copyright      Orlin
// ==/UserScript==

// ************** FIREFOX COMPATIBLE VERSION **********************

// Disable typing animation and show mini news
unsafeWindow['type'] = function(){};
if(document.getElementById('maszynista') != undefined)
	document.getElementById('maszynista').innerHTML=unsafeWindow.machinistText;

// Titles -> links
newsy=document.getElementsByClassName('news');
for(i=0; i<newsy.length; ++i)
{
  newsy[i].childNodes[1].getElementsByTagName('h1')[0].innerHTML =
      '<a href="' + newsy[i].childNodes[1].getElementsByTagName('a')[0].href + '">' + newsy[i].childNodes[1].getElementsByTagName('h1')[0].innerHTML + '</a>';
}

if((dt = document.getElementById('t')) != undefined)
	dt.childNodes[1].innerHTML=  '<a href="' + dt.childNodes[5].firstChild.href + '">' + dt.childNodes[1].innerHTML + '</a>';

// Allow YT fullscreen
objs = document.getElementsByTagName('object');
for(i=0; i<objs.length; ++i)
{
  if(objs[i].data != undefined && /www\.youtube\.com\/v\/.*?/.test(objs[i].data) )
  {
	  objs[i].data += '?fs=1&hl=pl_PL';
	  objs[i].innerHTML += '<param name="allowFullScreen" value="true"></param>';
  }
}
