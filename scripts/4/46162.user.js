// ==UserScript==
// @name             Lifehacker Header Remover
// @namespace        None
// @homepage         http://userscripts.org/scripts/show/46162
// @author           RaiGal
// @description      Removes Lifehacker Header
// @include          http://lifehacker.com/*
// @include          https://*.lifehacker.com/*
// @include          http://*.lifehacker.com/*
// @include          https://lifehacker.com/*

// ==/UserScript==


if(tag = document.getElementById("header_container"))
{
	tag.parentNode.removeChild(tag);
}