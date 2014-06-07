// ==UserScript==
// @name           Console.fm Music Downloader
// @version			0.1
// @namespace      http://JoshStrange.com/
// @author		   Josh Strange
// @description    Allows you to download your music from Console.fm
// @include        http://console.fm/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function addButton() {

		//alert("test");
		$('.playlist li a').append("<img id='downloadSong' src='http://radicalpi.net/upload/gMusic/download.png'>");
		
		/*$.each($('.playlist li a'), function(item) { 
  				alert(item.attr('href'));
			});*/
		//alert($('.playlist li a').length);
		/*
		document.getElementById('playlist').innerHTML += "\
		<div id='downloadSongHolder' style='position:absolute; bottom:12px; right:254px; display:none;'>\
		<img id='downloadSong' src='http://radicalpi.net/upload/gMusic/download.png'>\
		</div>\
		";
		document.getElementById('downloadSong').addEventListener("click", download, false);*/
}


// load jQuery and execute the main function
addJQuery(addButton);
