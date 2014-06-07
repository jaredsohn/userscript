// ==UserScript==
// @name           Bandcamp download links
// @namespace      nand
// @description    Get Bandcamp downloads for free!
// @include        *.bandcamp.com/*
// ==/UserScript==

window.addEventListener('load', function () 
{


var i;
var filelocation;
var table;
var index;
var link;

table = document.getElementById("track_table");

for(i = 0; unsafeWindow.TralbumData.trackinfo[i]; i++)
{
	filelocation = unsafeWindow.TralbumData.trackinfo[i].file;
	index = table.rows[i].cells.length;
	link = table.rows[i].cells[index-1];
	link.innerHTML = "<div class='dl_link'><a href=" + filelocation + ">Download <b>(right click and save as)</b></a></div>";	
}


},true);