// ==UserScript==
// @name           simple 128 kbit Bandcamp downloader
// @version        0.9
// @description    provides download links to 128 kbit versions of Bandcamp-hosted tracks
// @include        http://music.*.com/*
// ==/UserScript==

window.addEventListener('load', function ()
{

if (document.getElementById("track_table")) {dothis();}
else {dothat();}





},true);


function dothis() {
var i;
var filelocation;
var table;
var index;
var link;

document.getElementById("share-link").innerHTML = ' ';
document.getElementById("share-link").innerHTML = 'hover over the tracks to get dl link';

table = document.getElementById("track_table");

for(i = 0; window.TralbumData.trackinfo[i]; i++)
{
	filelocation = window.TralbumData.trackinfo[i].file;
	index = table.rows[i].cells.length;
	link = table.rows[i].cells[index-1];
	link.innerHTML = "<div class='dl_link'><a href=" + filelocation + ">download?</a></div>";
}
}

function dothat() {


   var mytitle = document.getElementsByClassName("trackTitle")[0].innerHTML;
 var myartist = document.getElementsByClassName("albumTitle")[0].getElementsByTagName("span")[1].innerHTML;
   myartist = myartist.replace("by ", '');
   document.getElementsByClassName("inline_player")[0].innerHTML = myartist+' - '+mytitle+': <a href="#" class="font-size: 18px;" onclick="location.href=TralbumData.trackinfo[0].file">128 kbit mp3 download</a>';
  // document.getElementsByClassName("inline_player")[0].innerHTML = '<a href="#" class="font-size: 18px;" onclick="location.href=TralbumData.trackinfo[0].file">128 kbit mp3 DOWNLOAD</a>';




}

// javascript:alert(document.getElementsByTagName("h4")[0].getElementsByTagName("a")[0].innerHTML);