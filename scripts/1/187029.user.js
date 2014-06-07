// ==UserScript==
// @name        last.fm/douban/xiami search each other
// @namespace   http://userscripts.org/users/533654
// @author		http://www.douban.com/people/rek/
// @include     http://music.douban.com/subject/*
// @include		http://www.last.fm/music/*
// @include 		http://www.xiami.com/artist/*
// @version     0.1
// @grant       none
// ==/UserScript==

var XIAMI = "xiami";
var DOUBAN = "douban";
var LASTFM = "last.fm";
var xiamiHead = "http://www.xiami.com/search?key=";
var lastfmHead = "http://www.last.fm/search?q=";
var doubanHead = "http://music.douban.com/subject_search?search_text=";
var xiamiColor = "#F08401";
var lastfmColor = "#F3462C";
var doubanColor = "#007711";

function trim(string){
  return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function createItem(site, artist, album){
	var head = "";
	var color = "";
	
	switch(site){
	case XIAMI:
		head = xiamiHead;
		color = xiamiColor;
		break;
	case LASTFM:
		head = lastfmHead;
		color = lastfmColor;
		break;
	case DOUBAN:
		head = doubanHead;
		color = doubanColor;
		break;
	}

	var item = document.createElement("div");
	artist = artist.replace(/ /g, "+");
	if( album != null){
		album = album.replace(/ /g, "+");
		var link = head + artist + "+" + album;
	}else{
		var link = head + artist;
	}
	
	item.innerHTML = "<a href=" + link + " style=\"color: " 
		+ color + "\">* Search on " + site +"</a>";
	
	return item;
}

function doDouban(){
	var album = document.getElementById("wrapper").getElementsByTagName("span")[0].innerHTML;
	// checkpoint: 1st linked string
	var info = document.getElementById("info");
	var artist = info.getElementsByTagName("a")[0].innerHTML;
	
	var indent = document.getElementsByClassName("aside")[0].getElementsByClassName("indent")[0];
	
	var item = document.createElement("p");
	item.innerHTML = "<!-- just a br -->";
	indent.appendChild(item);
	
	var item = createItem(XIAMI, artist, album);
	indent.appendChild(item);
	
	item = createItem(LASTFM, artist, album);
	indent.appendChild(item);

}

function doLastFM(){
	// checkpoint: 1st h1 in the 2nd header 
	var header = document.getElementsByTagName("header")[1];
	var artist = header.getElementsByTagName("h1")[0].innerHTML;
	artist = trim(artist);
	
	var parent = document.getElementsByClassName("g4 artist-stats-area")[0];
	
	var item = createItem(XIAMI, artist, null);
	parent.appendChild(item);
	
	item = createItem(DOUBAN, artist, null);
	parent.appendChild(item);
	
	item = document.createElement("p");
	item.innerHTML = "<!-- just a br -->";
	parent.appendChild(item);

}

function doXiami(){
	var title = document.getElementById("title").getElementsByTagName("h1")[0].innerHTML;
	// checkpoint: artist name before the first tag 
	var artist = title.substring(0, title.indexOf("<") ).trim();

	var parent = document.getElementById("sidebar");
	var refChild = document.getElementsByClassName("adm_block mgt20")[0];

	item = document.createElement("p");
	item.innerHTML = "<!-- just a br --><br>";
	parent.insertBefore(item, refChild);

	var item = createItem(DOUBAN, artist, null);
	parent.insertBefore(item, refChild);

	item = createItem(LASTFM, artist, null);
	parent.insertBefore(item, refChild);

}


// main
var url = window.location.href;
if( url.indexOf(XIAMI) > -1 ){
	doXiami();
}else if( url.indexOf(LASTFM) > -1 ){
	doLastFM();
}else if( url.indexOf(DOUBAN) > -1 ){
	doDouban();
}