// ==UserScript==
// @name           MP4 Upload File Downloader
// @namespace      com.vertebrate.gobadgers.userscript.idfk
// @description    
// @include        http://*mp4upload.com/embed*
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function go()
{
	$(function() {
		var flashvars = $('#player_code param[name=flashvars]').val();
		var downloadUrl = /&file=(.*?\.mp4)&/g.exec(flashvars)[1];
		var player = $('#player_code');
		var link = $('<div style="background:#000;"><a style="color:#f00;text-decoration:none;font-weight:bold;font:Verdana, sans-serif;padding:3px 3px;" href="' + decodeURIComponent(downloadUrl) + '">Download This</a></div>');
		player.after(link);
		player.height(player.height() - link.height());
	});
}

addJQuery(go);
