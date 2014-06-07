// ==UserScript==
// @name           Ynet Streamed Movies Downloader
// @namespace      Ynet.co.il
// @version        0.1
// @description    Shows the direct link of the movie (flv, mp4, ...), so it is easyer to download it (with external program)
// @include        http://hot.ynet.co.il/home/*
// @include        http://23tv.ynet.co.il/home/*
// ==/UserScript==

var meta = document.getElementsByTagName("meta");
var videoURL = null;

for (var i = 0; i < meta.length; i++)
{
	if (meta[i].getAttribute("property") == "og:video")
	{
		var content = unescape(meta[i].content);
		var start = content.indexOf("rtmp://");
		var end = content.indexOf("\"", start);
		videoURL = content.substring(start, end);
		
		break;
	}
}

var html = "<p style=\"text-align: center; font-size: 12pt; font-weight: bold;\">";
html += "הורדת הסרטון: <br />";
if (videoURL == null)
	html += "הקישור לא נמצא - Movie link not found.";
else
{
	html += "קישור RTMP:";
	html += "<br />";
	html += "<input type=\"text\" value=\"" + videoURL + "\" style=\" width: 100%; text-align: center;\" onfocus=\"this.select();\" readonly=\"readonly\" />";
}

html += "</p><br />" + document.getElementById("vidObj").innerHTML;

document.getElementById("vidObj").innerHTML = html;

document.getElementsByClassName("rndcont")[0].firstChild.style.height = "auto";