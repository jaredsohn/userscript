
// CSFD Piratska verzia
// version 1.1
// 7.7.2011
// Copyright (c) 2011, borec
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CSFD Pirated Version
// @description   Prida odkazy na stiahnutie filmov a tituliek pre CSFD.cz
// @include       http://www.csfd.cz/film/*
// @include		  http://csfd.cz/film/*
// ==/UserScript==

//nastavenia
var Reklama = 0 // 0 - reklama vypnuta, 1 - reklama zapnuta 

//odstranit reklamu
var reklama = document.getElementById("ad-wrapper");
if (reklama && Reklama == 0) 
{
reklama.innerHTML="";
}
var reklama2 = document.getElementById("bmone2n-14143.2.11.7");
if (reklama2 && Reklama == 0) 
{
reklama2.innerHTML="";
}
//koniec reklama

var h1= document.getElementsByTagName("h1");

var objekt = document.getElementsByClassName("names");

if (objekt.length > 0) {
var img= objekt[0].getElementsByTagName("img");
var h3= objekt[0].getElementsByTagName("h3");


for (var i=0;i<img.length;i++)
{
if (img[i].alt=="EN název" || img[i].alt=="USA" || img[i].alt=="Velká Británie")
{nazovEN=h3[i].innerHTML; break;} else {continue;}
};
 

if (i==img.length) {nazovEN=h1[0].innerHTML;} } else {nazovEN=h1[0].innerHTML;}

var f =nazovEN.search(/</i); 
if (f != -1) {nazovEN = nazovEN.slice(0,f-1)}

//var nazov = document.getElementsByTagName("h3");
//nazovEN=nazov[1].innerHTML;
nazovEN=nazovEN.replace(/	/g,"");

nazovEN=encodeURI(nazovEN);
nazovEN=nazovEN.replace(/%0A%0A/g,"");
var TPB="http://thepiratebay.org/search/"+nazovEN+"/0/99/200";
var YT="http://www.youtube.com/results?search_query="+nazovEN+" trailer";
var ULTO="http://www.uloz.to/hledej/?q="+nazovEN+"&media=video";	
var CzT="http://tracker.cztorrent.net/torrents/?c1=1&c35=1&c33=1&c11=1&c30=1&c31=1&c25=1&c19=1&c24=1&s="+nazovEN+"&t=3";	
var NT="http://www.newtorrents.info/search/"+nazovEN;	

var TL="http://www.torrentleech.org/torrents/browse/index/query/"+nazovEN.replace(/:/g,"")+"/categories/1,8,9,10,11,12,13,14,15,29,2,26,27,32";
var TIT="http://www.titulky.com/index.php?Fulltext="+nazovEN.replace(/,%20The/g,"");
var KAT="http://www.kat.ph/search/"+nazovEN;
var TRZ="http://tracker.czech-server.com/torrents.php?active=1&category=21111111111&search="+nazovEN;
var TT="http://titulkari.com/index.php?searchword="+nazovEN+"&ordering=newest&searchphrase=all&areas[0]=downloads&option=com_search#content"
var CZs="http://czshare.com/search.php?q="+nazovEN;	
	
function downBar() 
	{
var main, downbar;
main = document.getElementsByTagName("h1");
if (main) {
    downbar = document.createElement('div');
	downbar.innerHTML+="<a href="+ULTO+"><img title='Uloz.to' width='20' src='http://www.uloz.to/favicon.ico'></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp";
	downbar.innerHTML+="<a href="+TIT+"><img title='Titulky' width='20' src='http://www.titulky.com/favicon.ico'></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp";
	downbar.innerHTML+="<td id='ac'><a href="+CZs+"><img title='CzShare' width='20' src='http://czshare.com/favicon.ico'></img></a>&nbsp;&nbsp;&nbsp;</td>";

	downbar.innerHTML+="<a href="+CzT+"><img title='CzTorrent' width='20' src='http://tracker.cztorrent.net/favicon.ico'></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp";
	downbar.innerHTML+="<a href="+TPB+"><img title='The Pirate Bay' width='20' src='http://thepiratebay.org/favicon.ico'></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"; 
	downbar.innerHTML+="<a href="+KAT+"><img title='Kick Ass Torrents' width='20' src='http://www.kat.ph/favicon.ico'></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp";
	downbar.innerHTML+="<a href="+TRZ+"><img title='Trezzor' width='20' src='http://tracker.czech-server.com/favicon.ico'></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"; 
	downbar.innerHTML+="<a href="+TL+"><img title='Torrentleech' width='20' src='http://www.torrentleech.org/favicon.ico'></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"; 
	downbar.innerHTML+="<a href="+TT+"><img title='Titulkari' width='20' src='http://titulkari.com/favicon.ico'></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp";
	downbar.innerHTML+="<a href="+YT+"><img title='Youtube Trailer' width='20' src='http://www.youtube.com/favicon.ico'></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp";
    
	main[0].parentNode.insertBefore(downbar, main[0]);
}	}


downBar();

