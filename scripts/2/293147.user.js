// ==UserScript== 
// @name BwayTv 
// @namespace http://www.bway.it
// @include http://www.youtube.it/* 
// @description . 
// ==/UserScript==

function test()
{
var michael_counter=0;
var old_url='';

window.setInterval(function() {
var attuale_url=window.location.href;
	//window.alert(michael_counter + "  -  " + attuale_url);
	michael_counter=michael_counter+1;
	if (old_url!=attuale_url)
	{
		var width = $("#player-api").width();
		var height = $("#player-api").height();
		var iframe = $("<iframe id='michael_iframe' name='michael_iframe' src='http://192.168.1.73/YoutubePlayer.html?" +
		encodeURIComponent(window.location.href) + "' width='" + width + "' height='" + height +
		"' style='border: 0;'></iframe>");
		$("#player-api").replaceWith(iframe);
		$("#michael_iframe").attr('src', "http://192.168.1.73/YoutubePlayer.html?" + attuale_url)
		 old_url=attuale_url;
	}

	}, 500);

}


// load jQuery; wait unitl document is ready; execute main
var loaderScript= document.createElement("script");
loaderScript.src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js";
loaderScript.addEventListener('load', function () {
	var bodyScript = document.createElement("script");
	bodyScript.textContent = "$(document).ready(" + test + ");";
	document.body.appendChild(bodyScript);
}, false);

document.body.appendChild(loaderScript);

