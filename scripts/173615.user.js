// ==UserScript==
// @name        Hurriyet.com.tr w/o Ads in Comments
// @namespace   Hurriyet-Without-Ads
// @include     http://www.hurriyet.com.tr/*
// @include     http://hurriyet.com.tr/*
// @exclude     http://www.hurriyet.com.tr/_includes/*
// @version     1.7
// @run-at      document-end
// ==/UserScript==

if (window.top != window.self)  //don't run on frames or iframes
    return;

function contentEval(source, remove) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  if (!(remove==false)){
	setTimeout(function(){document.body.removeChild(script);},1000);
  }
}

reklam_raid_runtime=0;
reklam_raid=setInterval(function() {
	//alert('pre loop test '+reklam_raid_runtime); // for debugging
	contentEval( function() { 
		if (!(typeof jQuery == 'undefined')) {
			$(".HaberYorumContentHold, #flickr, .allComments").unbind('click');
			$('[class*="HaberDetayYorumBoxHoldNew"], [class*="allComments"]').css('background-image','none');
			$("#flickr,.HaberYorumContentHold").css('cursor','auto');
		}
	});
	reklam_raid_runtime++;
	//alert('post loop test '+reklam_raid_runtime); // for debugging
	if (reklam_raid_runtime>=3) {
		clearInterval(reklam_raid);
	}
}, 1000);
