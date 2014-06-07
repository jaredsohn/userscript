// ==UserScript==
// @name           Lights Out for Everyone
// @namespace      download
// @description    Adds a theater mode for any website with a video player.
// @include        *
// ==/UserScript==

var bg=document.createElement("div");
bg.style.backgroundColor="black";
bg.style.position="absolute";
bg.style.left="0px";
bg.style.top="0px";
bg.style.width=(innerWidth+scrollMaxX)+"px";
bg.style.height=(innerHeight+scrollMaxY)+"px";
bg.style.zIndex="500";
bg.style.display="none";
document.body.appendChild(bg);

function lightsOff()
{
	var videos=document.getElementsByTagName("video");
	var embeds=document.getElementsByTagName("embed");
	for(i=0;i<videos.length;i++)
	{
		videos[i].style.position="relative";
		videos[i].style.zIndex="501";
	}
	for(i=0;i<embeds.length;i++)
	{
		embeds[i].style.position="relative";
		embeds[i].style.zIndex="501";
	}
	bg.style.display="block";
}

function lightsOn()
{
	bg.style.display="none";
}

GM_registerMenuCommand("Lights Out",lightsOff);
GM_registerMenuCommand("Lights Up",lightsOn);