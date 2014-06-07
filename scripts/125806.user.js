// ==UserScript==
// @name           Newgrounds Start Collapsed
// @namespace      ngstartcollapsed@snakehole.net
// @description    Start movie, game and audio submissions collapsed.
// @include        http://www.newgrounds.com/portal/view/*
// @include        http://www.newgrounds.com/audio/listen/*
// ==/UserScript==



// this function allows us to use the jquery on Newgrounds and to skip unsafeWindow calls
function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
	$(document).ready(function(){
		$('a.min').eq(0).click();
	});
});