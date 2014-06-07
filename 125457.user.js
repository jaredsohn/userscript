// ==UserScript==
// @name		IGM Training recolor
// @namespace		IGM
// @icon		http://dy5oyikz6c23y.cloudfront.net/V005/1/templates/igmaraudersglobal/favicon.ico
// @description		Recolor time for heroes training
// @author		Kleho
// @version		0.0.4
// @date		2012-02-12
// @include		http://igmarauders.isotx.com/*
// ==/UserScript==

if (/http:\/\/igmarauders.isotx.com\//.test(window.location.href)) {

	var recolor = function() {

		var period_white	= 1000 * 60 * 70;
		var period_yellow	= 1000 * 60 * 35;
		var period_red		= 1000 * 60 * 10;

		var heroes_spans = document.getElementById('content_hero').getElementsByTagName('span');

		for (i in heroes_spans) {

			var span = heroes_spans[i];

			if (span.className != 'timer hasCountdown') continue;

			var rel  = span.getAttribute('rel');
			var time = new Date(rel);
			if (isNaN(time)) time = new Date(rel.replace(/(\d+)-(\d+)-(\d+)T(.*?)Z/, "$2/$3/$1 $4") + ' GMT');	// damn IE
			time = time.getTime() - new Date().getTime();

			if (time < 0 || time > period_white) continue;

			if (time > period_yellow) {

				var color = Math.round(255 * (time - period_yellow)/(period_white - period_yellow));
				span.style.color = 'rgb(255, 255, '+color+')';

			} else if (time > period_red) {

				var color = Math.round(255 * (time - period_red)/(period_yellow - period_red));
				span.style.color = 'rgb(255, '+color+', 0)';

			} else {

				span.style.color = '#ff0000';

			}

		}

	}

	recolor();
	setInterval(recolor, 1000*10);

}
