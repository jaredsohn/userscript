// ==UserScript==
// @name           Torrentbulter Enchancer
// @namespace      Anil Kumar
// @description    Adds Thepiratebay, IMDB, Torrentz and Podnapisi search on the movie you are viewing on TorrentButler.com
// @version		   0.1
// @match          http://torrentbutler.com/*
// @match          http://torrentbutler.eu/*
// ==/UserScript==


var xx = document.getElementById("movie_page");
if (xx.innerHTML != ""){
	var start;
	var extitle;
	var subsearch;
var title = document.getElementById("title").innerHTML;

if (title.indexOf("HD alert") != -1) 
{
	start = title.indexOf("<span>", 51);
	extitle = title.slice(55, start - 1);
	subsearch = title.slice(55,start - 8);
}
else 
{
	start = title.indexOf("<span>", 24);
	extitle = title.slice(24, start - 1);
	subsearch = title.slice(24,start - 8);
}

var imdb_query="http://www.imdb.com/find?s=all;q=" + extitle;
var ptp_query="http://thepiratebay.org/search/" + extitle;
var torrentz_query ="http://torrentz.eu/search?q="+extitle;
var subtitle_query ="http://www.podnapisi.net/en/ppodnapisi/search?tbsl=1&asdp=0&sK="+subsearch+"&sM=&sJ=2&sY=&sAKA=1";

var heading = document.getElementById("trailing_header")
heading.innerHTML = heading.innerHTML + '<a href= "'+imdb_query+' " target= "_blank" <a>'+ '<img src="http://imdb.com/favicon.ico" width=32 height=32 style="padding:5px;" alt="Search IMDB"></a>'
	+ '<a href= "'+ptp_query+' " target= "_blank" <a>'+ '<img src="http://static.thepiratebay.org/downloads/preview-tpb-logo.gif" width=32 height=32 style="padding:5px;" alt="Search Thepiratebay"></a>'         
	+ '<a href= "'+torrentz_query+' " target= "_blank" <a>'+ '<img src="http://torrentz.com/favicon.ico" width=32 height=32 style="padding:5px;" alt="Search Torrentz"></a>'
	+ '<a href= "'+subtitle_query+' " target= "_blank" <a>'+ '<img src="http://www.podnapisi.net/favicon.ico" width=32 height=32 style="padding:5px;" alt="Search for subtitles"></a>';           
 }

	
