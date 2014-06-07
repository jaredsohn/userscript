// ABC iView Link 
// Version 2.0
// 11 July 2006, updated 6 November 2009
//
// Copyright (c) B Ford 2006-2009
// Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 2.5 License
// http://creativecommons.org/licenses/by-nc-sa/2.5/
// You are free to use this script non-commercially in any way provided you attribute the script to me (the author) and license any
// derivative work under the same conditions. Commercial use will still require the author's permission.
//
// I am not the author, owner or licensor of any of the material on the Australian Broadcasting Corporation site. Copyright of all material on that
// site remains with the Australian Broadcasting Corporation.
//
// You use this script under your own risk. The likelihood of something as basic as this in some way damaging your computer or so on 
// is frankly quite low, but I nonetheless don't provide any guarantee that it won't happen. Installing the script indicates your acceptance
// of this disclaimer.
//
// ==UserScript==
// @name           ABC Video on Demand Link
// @description    Creates a link to 'iView' on the top bar of the Australian Broadcasting Corporation site.
// @include        http://*.abc.net.au/*
// @include        http://abc.net.au/*
// ==/UserScript==
    
var gN_news, newElement;
gN_news = document.getElementById('gN_news');
if (gN_news) {
    newElement = document.createElement('a');
    newElement.innerHTML = '<a id="gN_vod" class="pipe" href="http://www.abc.net.au/iview/" target="_top">iView</a>';
    gN_news.parentNode.insertBefore(newElement, gN_news.nextSibling);
}

var gN_more, newElement;
gN_more = document.getElementById('gN_more');
if (gN_more) {
    newElement = document.createElement('span');
    newElement.innerHTML = '<span> | </span>';
    gN_more.parentNode.insertBefore(newElement, gN_more);
}
