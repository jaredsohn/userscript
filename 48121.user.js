// ==UserScript==
// @name           BlackDiamond
// @namespace      Script BlackDiamond
// @include        http://www.nettby.no*
// @exclude        http://www.nettby.no/user/index.php?*
// @description    Script for nettby til å forandre utsende.
// @version 	   v0.2
// ==/UserScript==

var d=document;
var images=d.getElementsByTagName('img');
var welcome=d.getElementsByTagName("span");
var nick1=d.getElementsByTagName("tr");
var nick2=d.getElementsByTagName("span");
var member="";
var city1=d.getElementsByTagName("tr");
var city2=d.getElementsByTagName("strong");
var count=0;
var fonts=d.getElementsByTagName('font');
var links=d.getElementsByTagName('a');
var mm=d.getElementsByTagName('link');
var r=d.getElementsByTagName('div');mm[0].href='CSS URL';

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_evening.gif")
{images[i].src="URL";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_night.gif")
{images[i].src="URL";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_day.gif")
{images[i].src="URL";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_morning.gif")
{images[i].src="URL";}}
