// ==UserScript==
// @name           Sirius
// @namespace      sirius.com
// @include        http://www.sirius.com/player/listen/play.action?channelKey=octane&genreKey=rockSIR&categoryKey=music&stopped=no
// ==/UserScript==


IAmListening();

function IAmListening()
{
	unsafeWindow.userIsListening();
	window.setTimeout(IAmListening, unsafeWindow.stillListeningTimeout + 5000);
}

var script = document.createElement("script");
script.setAttribute('type','text/javascript');
script.text="function processCaptionChange(param){writeTitleAndArtist(0,param);} ";
document.body.appendChild(script); 




var artist = document.createElement("div");
artist.setAttribute('style','position:absolute;top:100px;left:20px;font-weight:900;font-weight:900;font-size:12px;font-family:arial;');
artist.setAttribute('id','artist');
document.body.appendChild(artist);

var title = document.createElement("div");
title.setAttribute('id','title');

title.setAttribute('style','position:absolute;top:120px;left:20px;font-weight:900;font-weight:900;font-size:12px;font-family:arial;');
document.body.appendChild(title);

var songs = document.createElement("div");
songs.setAttribute('id','last5Songs');
songs.setAttribute('style','position:absolute;top:120px;left:600px;font-weight:900;font-weight:900;color:#fff;font-size:12px;font-family:arial;');
document.body.appendChild(songs);
var z = 0;



var scripttwo = document.createElement("script");
scripttwo.setAttribute('type','text/javascript');
scripttwo.text="function update_title(){document.title = document.getElementById('artist').innerHTML + ' - ' + document.getElementById('title').innerHTML;setTimeout('update_title()','1000');}update_title();";
document.body.appendChild(scripttwo); 

var scriptthree = document.createElement("script");
scriptthree.setAttribute('type','text/javascript');
scriptthree.text="function watch_back(){if(document.getElementById('artist').innerHTML.match(/(Nickel|My Chemical Romance)/i)){if(window.location.href == 'http://www.sirius.com/player/listen/play.action?channelKey=altnation&genreKey=rockSIR&categoryKey=music&stopped=no'){window.location.href = 'http://www.sirius.com/player/listen/play.action?channelKey=octane&genreKey=rockSIR&categoryKey=music&stopped=no';}else{window.location.href = 'http://www.sirius.com/player/listen/play.action?channelKey=altnation&genreKey=rockSIR&categoryKey=music&stopped=no';}}setTimeout('watch_back()','1000');}watch_back();";
document.body.appendChild(scriptthree); 





