// ==UserScript==
// @name        spoki.lv auto (+) rakstiem
// @namespace   spoki-av
// @include     http://spoki.tvnet.lv/*/*/*
// @version     1
// ==/UserScript==


var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + init.toString() + ")(jQuery)";
document.body.appendChild(script);

function init() {
	$(window).bind("load", function() {			
		var votedd = $('#imgUp0').attr('style');		
		if (typeof votedd == 'undefined'){			
			add_vote(0, 1, '',this);
		}
	});
}