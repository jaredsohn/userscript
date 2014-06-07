// ==UserScript==
// @name Nuke Tumblr Asks
// @version 0.4
// @description Hides all answers to /asks on your tumblr dash. Nobody wants to see those silly things.
// @namespace srcdecay
// @copyright 2013 J. Clay J. (http://twitter.com/srcdecay)
// @license MIT
// @include http://tumblr.com/dashboard
// @include http://tumblr.com/dashboard/*
// @include http://www.tumblr.com/dashboard
// @include http://www.tumblr.com/dashboard/*
//
// @history 
// 0.1 04/25/2013 - Works on Tumblr layout as of April 25, 2013 with endless scrolling ENABLED.  Checks 
//					for new asks every 1/5 second.
// 0.2 04/27/2013 - Quick fix to avoid truth tests on <li> elements that will never return true.
// 0.3 04/30/2013 - Noticed that if I scroll too fast with endless scrolling enabled, it'd miss things. 
// 					Changed 333ms interval to 200ms interval.
// 0.4 05/30/2013 - Updated to work with tumblr's new post layout.  Updated to use jQuery.  Needs the 
// 					jQuery load function since Chrome does not support the @require metatag for some odd 
//					reason.  Interval changed to 1/2 second.  New hide features -- see below.
//
// NOTES:
// You can also hide the tumblr radar, recommended users, and pure text posts (because tumblr is not 
// livejournal).
// These are turned off by default.  To enable them change the appropriate variables to 'true' at the top
// of main().
//
// ==/UserScript==

//
// thank you, stackoverflow -- jQuery compatibility in Chrome
//
function addJQuery (callback) {
	var loadJQuery = document.createElement("script");
	loadJQuery.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/2.0.1/jquery.min.js");
	loadJQuery.addEventListener('load', 
		function () {
			var setJQuery = document.createElement("script");
			setJQuery.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
			document.body.appendChild(setJQuery);
		},
  false);
  
  document.body.appendChild(loadJQuery);
}

function main ()
{
	var hideRadar = false;
	var hideRecommended = false;
	var hideTextPosts = false;
	
	if (hideRadar)
		jQ('#tumblr_radar').css('display', 'none');
		
	if (hideRecommended)
		jQ('#recommended_tumblelogs').css('display', 'none');
	
	function nuke_that_junk ()
	{
		jQ('.post.is_note').each(
			function ()
			{
				jQ(this).css('display', 'none');
			}
		);
		
		if (hideTextPosts)
		{
			jQ('.post.is_regular').each(
				function ()
				{
					jQ(this).css('display', 'none');
				}
			);
		}
	}

	setInterval(nuke_that_junk, 500);
}

addJQuery(main);