// ==UserScript==
// @name           TVP.PL Download Button
// @description	   Adds download button for videos on TVP.PL website
// @author         musk
// @grant          none
// @version        1.0
// @include        http://tvp.pl/*
// @include        http://*.tvp.pl/*
// ==/UserScript==


window.addEventListener("DOMContentLoaded", function () {

	try {

		var requestUrl = '/pub/stat/videofileinfo?video_id=' + window.playVideo.object_id;

	} catch(e) {
		return false;
	}

	var req = new window.XMLHttpRequest();

	req.onreadystatechange = function() {

		if (req.readyState == 4) {

			if (req.status == 200) {

				var respond = eval('(' + req.responseText + ')');

				var element = document.getElementById('contentNews');

				if (!element) {

					element = document.getElementById('mainContent');

					if (!element)
						element = document.getElementById('videoBox');

				}

				if (element) {

					element.innerHTML = '<a style="display: block; width: 100px; margin-top: 5px; margin-bottom: 5px; text-align: center; text-decoration: none; font-size: 14px; border-radius: 5px; padding: 3px; background: #c00; color: #fff;" target="_blank" href="' + respond.video_url + '">Download</a>' + element.innerHTML;

				}

			}
		}

	};

	req.open("GET", requestUrl, true);
	req.send("");

}, false);
