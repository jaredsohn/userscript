// ==UserScript==
// @name           AnimeRatio Sapo File Snatcher (Dose not work on FFBeta)
// @description    This will let you download Sapo Video from AnimeRatio.com
// @include        http://*animeratio.com/files/embed/sapo2.php?id=*
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js");
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
		var player = $('#video_player');
		var link = $('<div style="background:#000;"><a style="color:#4caeb0;text-decoration:none;font-weight:bold;font:Verdana, sans-serif;padding:3px 3px;" href="' + decodeURIComponent(downloadUrl) + '">Snatch This Video</a></div>');
		player.after(link);
		player.height(player.height() - link.height());
	});
}

addJQuery(go);