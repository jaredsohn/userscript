// ==UserScript==
// @name           Gawker No Top Stories
// @namespace      http://userscripts.org
// @description    Removes the list of top stories from the top of Gawker Media sites including Lifehacker.
// @include        http://lifehacker.com/*
// @include        http://valleywag.com/*
// @include        http://jalopnik.com/*
// @include        http://consumerist.com/*
// @include        http://gizmodo.com/*
// @include        http://jezebel.com/*
// @include        http://deadspin.com/*
// @include        http://kotaku.com/*
// @include        http://io9.com/*
// @include        http://gawker.com/*
// @include        http://*.gawker.com/*
// @include        http://defamer.com/*
// @include        http://fleshbot.com/*
// ==/UserScript==

document.getElementsByTagName("head")[0].innerHTML += "<style type='text/css'>a.login{color: #fff !important}</style>";

var tag;

if(tag = document.getElementById("userLinks"))
{
	var temp;
	if(temp = document.getElementById("popTags"))
	{
		temp.innerHTML = "";
		tag.style.marginTop = "10px";
		tag.style.marginRight = "10px";
		temp.appendChild(tag);
	}
}

if(tag = document.getElementById("menubar"))
{
	switch(document.location.host)
	{
		case "lifehacker.com":
			tag.style.marginTop = "17px";
			break;
		case "kotaku.com":
			tag.style.marginTop = "22px";
			break;
		case "jezebel.com":
			tag.style.marginTop = "30px";
			break;
		case "io9.com":
			tag.style.marginTop = "60px";
			break;
		default:
			tag.style.marginTop = "8px";
			break;
	}
}

if(tag = document.getElementById("header"))
	tag.parentNode.removeChild(tag);
	
//for consumerist
if(tag = document.getElementById("header_container"))
{
	tag.innerHTML = "";
	tag.style.height = "10px";
}

if(tag = document.getElementById("moreTopStories"))
	tag.parentNode.removeChild(tag);