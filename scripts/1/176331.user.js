// ==UserScript==
// @name       Bandcamp MP3 downloader
// @version    0.2
// @description  Download Bandcamp songs for free
// @include      *.bandcamp.com/track/*
// @copyright  van Dijk
// ==/UserScript==

var link			= ""
	,downloadLink1	= TralbumData.trackinfo[0].file['mp3-128']
    ,downloadLink2	= document.body.innerHTML.match(/http:\/\/[a-z0-5.bandcamp.com\/download\/track\?enc=mp3\-128&fsig=]+[a-z0-9]+[&id=]+[0-9]+[&stream=]+[0-9]+[&ts=]+[0-9.]+/);

// get download link
if( downloadLink1.length > 0  ) {
    link = downloadLink1;
}
else if( downloadLink2.length > 0 ) {
    link = downloadLink2;
}

var el = document.getElementsByClassName("tralbumCommands")[0];
el.innerHTML = el.innerHTML + "<a href='" + link + "' style='font-size:145%;font-weight:bold;'>Free download</a> <span class='secondaryText'> right click, save as</span>";