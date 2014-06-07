// ==UserScript==
// @name           Daily Telegraph remove Olympics live banner
// @namespace      http://userscripts.org/users/lorriman
// @description    Removes the Olympics banner from the Telegraph home page
// @include        http://www.telegraph.co.uk/*
// @match http://www.telegraph.co.uk/*
// @version .1
// ==/UserScript==


if(item=document.getElementById('tmgTracker')){
	item.style.display='none';
}

if(item=document.getElementById('trackerInfo')){
	item.style.display='none';
}

items=document.getElementsByClassName('trackerHolder trackerHolderBottom');
if(items.length==1){ items[0].style.display='none'};

