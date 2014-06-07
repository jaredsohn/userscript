// ==UserScript==
// @name           Youtube - Edit video link on channel
// @namespace      System
// @description    When you put the mouse over a link in your channel a edit link is created. Edit the include to your channel!
// @include        http://www.youtube.com/user/YOUCHANNELHERE*
// ==/UserScript==

window.addEventListener("mouseover",
	function (e)
	{
		if (e.target.tagName.match(/(img|div|span)/i))
		{
			var d = e.target;
			if (d.parentNode.parentNode.className.toLowerCase() != "playnav-video-info") return;
			d = d.parentNode.parentNode;
			var e = document.createElement("a");
			e.innerHTML = "edit";
			e.href = "/my_videos_edit?video_id=" + d.getElementsByTagName("a")[0].href.match(/v=(.+)/)[1];
			d.insertBefore(e, d.firstChild.nextSibling);
		}
	}, false);
