// ==UserScript==
// @name           Link Rewriter
// @namespace      timmeh.tim.org
// @description    Rewrites FB news links to prevent tracking
// @include        facebook.com/*
// ==/UserScript==



function iterlinks(regex, f)
{
	for(var c = 0, link; link = document.links[c]; c++)
		if(regex.test(link.href))
			f(link);
}

function rewriteLinks(){
	iterlinks(
		/\?fb_source=/,
		function(link){
			var re = /((http|www)[^?]+)\?fb_source/i;
			var matches = re.exec(link.href);
			if(matches[1])
				link.href = matches[1];
		}
	);

	setTimeout(rewriteLinks, 5000);
}

rewriteLinks();
