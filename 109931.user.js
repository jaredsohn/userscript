// ==UserScript==

// @name           Anti-Video-Like

// @namespace      Kingdread

// @description    Removes the like from many pages

// @version 2.1b1

// @run-at document-end

// @include http://sportfail.org/*

// @include http://www.lachkick-videos.com/*

// @include http://clipfire.net/video/*

// @include http://fb-tube.net/?p=*

// @include http://vids.fun-pille.de/video/*

// @include http://vids.fun-pille.net/video/*

// @include http://www.lustig-online.com/*

// @exclude http://www.lustig-online.com/

// @include http://fb-fail.com/*

// @include http://i-like-videos.de.vu/video/*

// @include http://lustige-videos.50spenden.de/index.php?v=*

// @include http://www.thug-clips.com/video/*

// @include http://thug-clips.com/video/*

// @include http://dailyvideo.tk/watchvid/*

// @include http://www.vidzeo.de/*

// @include http://ibunvido.net/video.php?id=*

// @include http://www.ibunvido.net/video.php?id=*
// @include http://www.clip-vibez.com/video/*

// ==/UserScript==

function display_all(liste, display)

{

	for (i in liste)

	{

		var item = liste[i];

		var h = document.getElementById(item);

		if (h != null)

		{

			h.style.display = display;

		}

	}

}

function hide(id)

{

	var h = document.getElementById(id);

	if (h != null)

	{

		h.style.display = "none";

	}

}

function show(id)

{

	var h = document.getElementById(id);

	if (h != null)

	{

		h.style.display = "block";

	}

}

function run()

{

	var hostname = window.location.hostname;

	var m = hostname.split(".");

	if (m.length < 3)

	{

		hostname = "www." + hostname;

	}

	switch (hostname)

	{

		case "www.dailyvideo.tk":

			document.getElementById("vali").value = "1";

			unsafeWindow.load_vid(); // Bad, but works :)

			break;

		case "www.clipfire.net":

		case "vids.fun-pille.de":

		case "vids.fun-pille.net":

		case "www.lustig-online.com":

		case "i-like-videos.de.vu":

		case "www.thug-clips.com":
		case "www.clip-vibez.com":

			hide("video_container");

			show("real_container");

			break;

		case "www.fb-tube.net":

			hide("videonu1");

			show("videonu2");

			break;

		case "www.lachkick-videos.com":

			hide("video-overlay");

			show("real-video");

			break;

		case "www.sportfail.org":

		case "www.fb-fail.com":

			hide("play_block");

			break;

		case "lustige-videos.50spenden.de":

			hide("over");

			show("vid_real");

			break;

		case "www.ibunvido.net":

			hide("videostart");

			show("videoplay");

			break;

		default:

			var hidelist = ["play_block", "video-overlay", "video_container", "videonu1", "over", "videonu12", "overlay-"];

			display_all(hidelist, "none");

			var showlist = ["real-video", "real_container", "videonu2", "vid_real"];

			display_all(showlist, "block");

	}

	// Every site known to me works, except of fbvids.de, for this, see the other Script

}

run();