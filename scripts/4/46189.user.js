// ==UserScript==
// @name              Lifehacker Ads Remover
// @namespace         None
// @homepage          http://userscripts.org/scripts/show/46189
// @author            RaiGal
// @description       Removes some ads found on Lifehacker
// @include           http://lifehacker.com/*
// @include           https://*.lifehacker.com/*
// @include           http://*.lifehacker.com/*
// @include           https://lifehacker.com/*


// ==/UserScript==


if(tag = document.getElementById("ask_ads_part_1"))
{
	tag.parentNode.removeChild(tag);
}

if(tag = document.getElementById("ask_ads_part_2"))
{
	tag.parentNode.removeChild(tag);
}

if(tag = document.getElementById("footer"))
{
	tag.parentNode.removeChild(tag);
}

if(tag = document.getElementById("sidebarposts"))
{
	tag.parentNode.removeChild(tag);
}

if(tag = document.getElementById("post-supplement"))
{
	tag.parentNode.removeChild(tag);
}