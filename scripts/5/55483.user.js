// ==UserScript==
// @name           Take away non at war.
// @description    Removes the names of people you are not at war with.
// @include        http://torn.com/*
// @include        http://www.torn.com/*
// @include        http://www.torncity.com/*
// @include        http://torncity.com/*
// @copyright      Big thanks to both Avindra Goolcharan & JoeSimmons
// @version        1.0.0
// ==/UserScript==
var array=document.evaluate(".//td[3]/..",document.body.firstChild,null,6,null);
for(var i=array.snapshotLength-1,item;(item=array.snapshotItem(i));i--) if(!item.getElementsByTagName("td")[2].firstChild.tagName) item.parentNode.removeChild(item);