// ==UserScript==
// @name        Stop Facebook Like Video
// @author      Ooi Keng Siang
// @version    	1.2
// @namespace   http://ooiks.com/blog/stop-video-like
// @description Have enough for those website that force you to like the video before you can watch them. Get rip of the Facebook like using this script.
// @include		http://www.vdoprince.com/watch.php*
// @include		http://vdolike.com/watch.php*
// @include		http://vdobuzz.org/*
// @include		http://digdugdog.com/video/*
// @include		http://heatvdo.com/*
// @include		http://vdodigest.com/*
// ==/UserScript==

// start executing script
exeScript();

function exeScript()
{
	// get embed
	var frameElementList = document.getElementsByTagName('iframe');
	if (frameElementList)
	{
		var i;
		for (i = 0; i < frameElementList.length; ++i)
		{
			var frameSource = frameElementList[i].getAttribute('src');
			if (frameSource.indexOf('youtube.com/embed/') != -1)
			{
				var beginIndex = frameSource.indexOf('youtube.com/embed/') + 18;
				var endIndex = frameSource.indexOf('?', beginIndex);
				var id = frameSource.substring(beginIndex, endIndex);
				
				window.location.href = 'http://www.youtube.com/watch?v=' + id;
				return;
			}
		}
	}

	// get image
	var imgElementList = document.getElementsByTagName('img');
	if (imgElementList)
	{
		var i;
		for (i = 0; i < imgElementList.length; ++i)
		{
			var imgSource = imgElementList[i].getAttribute('src');
			if (imgSource.indexOf('img.youtube.com/vi/') != -1)
			{
				// let's extract the youtube id
				var beginIndex = imgSource.indexOf('img.youtube.com/vi/') + 19;
				var endIndex = imgSource.indexOf('/', beginIndex);
				var id = imgSource.substring(beginIndex, endIndex);
				
				window.location.href = 'http://www.youtube.com/watch?v=' + id;
				return;
			}
		}
	}
}
