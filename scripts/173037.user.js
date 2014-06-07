// ==UserScript==
// @name           TPB torrent file loader
// @namespace      http://userscripts.org/scripts/show/129375
// @description    Brings back .torrent file downloads for all torrents on TPB
// @author         YIFY-Torrents
// @include        http://*thepiratebay.*/torrent/*
// @include        https://*thepiratebay.*/torrent/*
// @include        http://*depiraatbaai.be/torrent/*
// @include        http://tpb.piratenpartij.nl/torrent/*
// @include        http://*thepiratebay.*/*
// @include        https://*thepiratebay.*/*
// @include        http://*depiraatbaai.be/*
// @include        http://tpb.piratenpartij.nl/*
// @require 	http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

(function($){
	$('div.detName').each(function(){
		var wrapper = $(this);
		var href = '//torrents.thepiratebay.se/'+ wrapper.find('a').attr('href').replace('/torrent/','')+ '.torrent';
		wrapper.after($('<a>').attr('href', href).append('<img src="http://static.thepiratebay.se/img/dl.gif" alt="downlad torrent"/>'));
	});
})(jQuery);

//Grabs the hash and title html
var Hash = document.getElementById('details').innerHTML.match(/[0-9A-F]{40}/) ;
var title = document.getElementById('title').innerHTML;
var TorrentTitle;
var TorrentName;

var inputs = document.getElementsByTagName("input"); //or document.forms[0].elements;  
for (var i = 0; i < inputs.length; i++) {  
	if (inputs[i].name == "id") {  
		var TPB_ID = inputs[i].value;
	}  
}
var xx = "http://torrents.thepiratebay.se/"+TPB_ID+"/"+title.substring(3, title.length-1).replace(/ /gi, '_')+"."+TPB_ID+".TPB.torrent";



//Checks if the torrent viewed it by its relative uploader to get rid of extra info that is undeed for magnet link
if(title.indexOf("<div") == -1 ){
	TorrentTitle = title.substring(2).replace(/ /gi, '+');
	TorrentName = title.substring(2).replace(/ /gi, '%20');
}
else{
	TorrentTitle = title.substring(75).replace(/ /gi, '+');
	TorrentName = title.substring(75).replace(/ /gi, '%20');
}

var TorrentLink = "";
//Prepears the html with magnet AND torrent file download
var NewDownloadLink = "<a href=\""+xx+"\" title=\"Torrent File\">Get Torrent File</a>&nbsp;&nbsp;&nbsp;(<a title=\"Get this torrent\" href=\"magnet:?xt=urn:btih:"+Hash+"&dn="+TorrentTitle+"&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.ccc.de%3A80\" style=\'background-image: url(\"//static.thepiratebay.se/img/icons/icon-magnet.gif\");\'>&nbsp;magnet link</a>)";

var divs = document.getElementsByClassName('download');

//Inserts the new download links
[].slice.call( divs ).forEach(function ( div ) {
    div.innerHTML = NewDownloadLink;
});
