// ==UserScript==
// @name           Last.fm Linker
// @namespace      Last.fm
// @description    Adds links to the left sidebar on Last.fm artist/song/album pages. By default, links to Grooveshark and The Pirate Bay searches. Source file can be (somewhat) easily edited to add more searches.
// @include        http://www.lastfm.fr/music/*
// @exclude        http://www.lastfm.fr/music/*/+*
// ==/UserScript==
var title=document.title.split(String.fromCharCode(8211));
var artist=title[0].substr(0,title[0].length-1);
var song="";
if (title.length > 2) song=title[1].substr(1,title[1].length-2);
var both = artist;
if (song.length > 0) both +=" "+song;
var links = new Array(

//You can add more links manually to the array below.
// %s will insert the full artist + song, while %a and %b insert artist and song respectively.


	"Wikipedia|http://fr.wikipedia.org/wiki/Special:Recherche?search=%s",
	"MySpace|http://www.myspace.com/search/people?q=%s",
	"Grooveshark|http://listen.grooveshark.com/#/search/songs/?query=%s",
	"Spirit of Metal|http://www.spirit-of-metal.com/groupe-groupe-%s-l-fr.html",
	"Torrent|http://www.google.com/cse?cx=001592417160892712815:o2h4iglap80&ie=UTF-8&q=%s&sa=Search&siteurl=customized.sourceforge.net/%23!1"
	"Direct|http://www.google.com/cse?cx=001592417160892712815%3A1nyomivpsl8&ie=UTF-8&q=%s&sa=Search&siteurl=customized.sourceforge.net%2F%23%211"


);
//If everything goes right, this puts the links where they need to go.
for (i in links) document.getElementById('secondaryNavigation').innerHTML+="<li><a target='_blank' href='"+links[i].split("|")[1].replace("%s",both).replace("%a",artist).replace("%b",song)+"'>"+links[i].split("|")[0]+"</a></li>";
