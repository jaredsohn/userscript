// ==UserScript==
// @name           YouTube to Grooveshark 
// @namespace      YoutubeToGrooveshark
// @description    Send any song of Youtube to Grooveshark
// @include        http://*.youtube.com/*
// @version        0.11.11.25
// @notify         true
// ==/UserScript==




var boton = '';

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	function strip_tags (input, allowed) {
    // Strips HTML and PHP tags from a string . thanks to: http://phpjs.org/functions/strip_tags:535
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); 
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

$("#watch-rating").css("width","120");
var tercerMetadata = $(".metadata-info")[2];
if ($(tercerMetadata).length)
{
	artista = $(".link-like").text().toLowerCase();
	tituloTodo = $(".metadata-info")[1];
	titulo = $(tituloTodo).html().split('"')[1].toLowerCase();
	var nombreCancion = artista + " " + titulo;
} else 
{
	songcode = document.getElementById("eow-title").title;
	songname = strip_tags (songcode);
	songname = songname.toLowerCase();
	var deleted = new Array();
	deleted[0]="(us Version)";
	deleted[1]=" -";
	deleted[2]="(english version)";
	deleted[3]="(spanish version)";
	deleted[4]="(ES Version)";
	deleted[5]="(UK Version)";
	deleted[6]="(Live video)";
	deleted[7]="(Official video)";
	deleted[8]="(Official Music Video)";
	deleted[9]="|"
	deleted[10]="(single)";
	deleted[11]="- ";
	deleted[3] = deleted[3].toLowerCase();
	for (i=0; i<deleted.length; i++){
		var songname = songname.replace(deleted[i],"");
	}
	var nombreCancion = songname;
}

var boton = $('<button onclick="window.open(\'http://grooveshark.com/#/search?q='+nombreCancion+'\') " title="Envía esto a Grooveshark" type="button" id="watch-share" class=" yt-uix-button yt-uix-tooltip"  role="button" data-tooltip-text="Envía esta canci&oacute;n a Grooveshark"><span class="yt-uix-button-content"><span class="yt-uix-button-content">GS</span></button>');

boton.appendTo("#watch-actions");

}


// load jQuery and execute the main function
addJQuery(main);
