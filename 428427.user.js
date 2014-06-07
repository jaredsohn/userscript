// ==UserScript==
// @name           Memrise Turbo
// @namespace      https://github.com/infofarmer
// @description    Makes Memrise faster
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/water/*
// @version        0.1.1
// @updateURL      https://userscripts.org/scripts/source/428427.meta.js
// @downloadURL    https://userscripts.org/scripts/source/428427.user.js
// @grant          none
// ==/UserScript==

var onLoad = function($) {

	var oldstart = MEMRISE.garden.feedback.start;
	MEMRISE.garden.feedback.start = function (){
		if (MEMRISE.garden.box.state === 'choosing-mem') {
			oldstart(1);
		}else{
			MEMRISE.garden.box.next_press();
		}
	};

	$('body').on('keyup', function(e) {
		try {
			if ($(e.target).is('input')) {
				var g = MEMRISE.garden;
				var b = g.box;
				var s = g.scoring.score_response(
					b.$input.val(),b.thing,b.column_a,b.column_b);
				if (s === 1) {
					MEMRISE.garden.box.check();
				}
			}
		} catch (err) {
			console.log('error - falling back to default behavior', err);
		}
	});
};

var injectWithJQ = function(f) {
	var script = document.createElement('script');
	script.textContent = '$(' + f.toString() + '($));';
	document.body.appendChild(script);
};

injectWithJQ(onLoad);
