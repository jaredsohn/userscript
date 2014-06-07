// ==UserScript==
// @name		IGM HeroExp
// @namespace		IGM
// @icon		http://dy5oyikz6c23y.cloudfront.net/V005/1/templates/igmaraudersglobal/favicon.ico
// @description		Show amount of experience needed to hero's level up
// @author		Kleho
// @version		0.0.2
// @date		2012-05-21
// @include		http://igmarauders.isotx.com/*
// ==/UserScript==

if (/http:\/\/igmarauders.isotx.com\//.test(window.location.href)){

	function r(o,c) {
		for (i in o.childNodes) {

			if (!o.childNodes[i]) continue;

			if (o.childNodes[i].className == c) {
				return o.childNodes[i];
			} else if (o.childNodes[i].childNodes) {
				var f = r(o.childNodes[i], c);
				if (f && f.className == c) return f;
			}

		}
	}

	setInterval(function() {

		if (window.location.href.indexOf('/hero/')+1) {

		        var progressText = r(document.getElementById('heroExperience'), 'progressText');

		        if (progressText.innerHTML == 'MAX' || progressText.innerHTML.indexOf('xp')+1) return;

			var values = progressText.innerHTML.replace(/,/g,'').match(/(\d+)\/(\d+)/i);
			var needXp = values[2]-values[1];
			progressText.innerHTML += ' [' + needXp.toString().replace(/(\d{1,3})(\d{3})/, '$1,$2') + ' xp]';

		}

		},
		1000
	);

}
