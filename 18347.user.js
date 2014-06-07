// ==UserScript==
// @name           Import 8bitpeoples.com Releases into MusicBrainz
// @namespace      MBVA
// @include        http://8bitpeoples.com/*
// @include        http://www.8bitpeoples.com/*
// ==/UserScript==

var arName = document.getElementsByTagName('table')[1].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].getElementsByTagName('span')[0].getElementsByTagName('b')[0].innerHTML.split("<br>");
var aName = arName[0].replace(/^\s*(.*?)\s*$/,"$1");
var rName = arName[1].replace(/^\s*(.*?)\s*$/,"$1");


allDDs = document.getElementsByTagName('table')[1].getElementsByTagName('tr')[0].getElementsByTagName('td')[7].getElementsByTagName("a").length-2;
var bigLongString = "http://musicbrainz.org/cdi/enter.html?hasmultipletrackartists=0&artistid=2&artistedit=1&artistname="+aName+"&releasename="+rName+"&tracks="+(allDDs+1);
var i=0;
for(i=0;i<=allDDs;i++) {
	var barlist = document.getElementsByTagName('table')[1].getElementsByTagName('tr')[0].getElementsByTagName('td')[7].getElementsByTagName('a')[i].innerHTML;
	if(i<10) barlist = barlist.substr(3,(barlist.length-3)).replace(/^\s*(.*?)\s*$/,"$1");
	else barlist = barlist.substr(4,(barlist.length-4)).replace(/^\s*(.*?)\s*$/,"$1");
	var bigLongString = bigLongString+"&track"+i+"="+barlist;
}

document.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('a')[0].innerHTML = "Import to MusicBrainz";
document.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('a')[0].href = bigLongString;
document.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('a')[0].target = "_blank";