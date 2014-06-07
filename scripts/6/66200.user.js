// ==UserScript==
// @name           reddit_inline_image
// @namespace      sphericalcow
// @description    display images inline
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

// You don't actually need any of these comments. The stuff above are here because userscripts.org requires them to be here...

//Hey MacReddit, I updated my inline image display script. Now it works with the new personal imgur url's too. Note: It only works with GlimmerBlocker (and not GreaseMonkey); contains code that I plagiarize from other people; I have only tested on Safari; and it slows down page loading. I hope at least one person will like it though :)

// display pictures inline

var x = $(".content").find("a").each(function() {
	var href = $(this).attr("href");
	if ((!$(this).hasClass("drowsapMorphed")) && ($(this).next(".drowsapMorphed").length==0)
	 && (!$(this).hasClass("reddit-link-title")) && (!$(this).hasClass("thumbnail"))
	 && href)
		{
			if ((href.indexOf('http://imgur.com/')==0 || href.indexOf('http://i.imgur.com/')==0 || href.indexOf('jpeg')>=0 || href.indexOf('jpg')>=0 || href.indexOf('png')>=0))
			{
				var ext = (href.indexOf('imgur')>=0 && href.indexOf('jpg')<0 && href.indexOf('png')<0) ? '.jpg' : '';
				var img = $("<a class='drowsapMorphed' href='" + href + "' target='blank' style='display:block'><img style='display:block;max-width:780px;' src='" + href + ext + "' /></a>");
				$(this).after(img);
			}
			else if ((href.indexOf('.imgur.com/')>=0))
			{
				var ext = (href.indexOf('jpg')<0 && href.indexOf('png')<0) ? '.jpg' : '';
				var lastIndex = href.lastIndexOf("/");
				var filename = href.substring(lastIndex);
				var img = $("<a class='drowsapMorphed' href='" + href + "' target='blank' style='display:block'><img style='display:block;max-width:780px;' src='http://imgur.com" + filename + ext + "' /></a>");
				$(this).after(img);
			}
		}	
});