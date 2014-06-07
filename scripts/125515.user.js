// ==UserScript==
// @name		IGM Auto Training
// @namespace		IGM
// @icon		http://dy5oyikz6c23y.cloudfront.net/V005/1/templates/igmaraudersglobal/favicon.ico
// @description		Autotraining idle heroes (2 hours, -2100 gold, +440 XP), check every 2 minutes
// @author		Kleho
// @version		0.0.6
// @date		2012-02-12
// @include		http://igmarauders.isotx.com/*
// ==/UserScript==

if (/http:\/\/igmarauders.isotx.com\//.test(window.location.href)) {

	var hasJQ = typeof($) != 'undefined';	// don't access to $ in chrome&firefox :(
	var price = 2100;
	//alert("jQuery? " + (hasJQ?"ok":"no"));

	function recolor() {

		var period_white	= 1000 * 60 * 70;
		var period_yellow	= 1000 * 60 * 35;
		var period_red		= 1000 * 60 * 5;

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

	function autotraining() {

		var gold = document.getElementById('gold').innerHTML.replace(/\D/g, '');
		var gold_old = gold;

		var as = document.getElementById('content_hero').getElementsByTagName('a');

		for (i in as) {

			var a = as[i];

			if (!a.id) continue;

			var id = a.id.substr(5);

			var div = a.getElementsByTagName('div')[1];

			if (div.className == 'hero_info collect') {
				var args = a.href.match(/agent=(\d+)&mission=(\d+)/);
				var agent   = args[1];
				var mission = args[2];

				if (hasJQ) {

					$.ajax({
						'type': 	"POST",
						'url':		'http://igmarauders.isotx.com/ajax.php?/militia/collectReward/',
						'data':		'militia='+mission+'&dataType=json',
						'success':	function(data) {
							if (!data.error) {}	// ok
						}
					});

				} else {

					var img = document.createElement('img');
					img.src = 'http://igmarauders.isotx.com/ajax.php?/militia/collectReward/&militia='+mission+'&dataType=json';

				}
				div.className = 'hero_info idle';

			}

			if (div.className == 'hero_info idle') {

				if (gold < price) continue;

				if (hasJQ) {

					$.ajax({
						'type': 	"POST",
						'url':		'http://igmarauders.isotx.com/ajax.php?/hero/startProcess/',
						'data':		'type=upgrade&processID=1&heroID='+id+'&dataType=json',
						'success':	function(data) {
							if (data.reload && !data.error) {gold -= price;}	// ok
						}
					});

				} else {

					var img = document.createElement('img');
					img.src = 'http://igmarauders.isotx.com/ajax.php?/hero/startProcess/&type=upgrade&processID=1&heroID='+id+'&dataType=json';
					gold -= price;

				}

				div.className = 'hero_info training';

			}

		}

		if (gold != gold_old) {

			var sep = ',';
			document.getElementById('gold').innerHTML = gold.replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1"+sep);
		}

	};

	autotraining();
	recolor();

	setInterval( recolor, 1000 * 10 );		// check every 10 seconds
	setInterval( autotraining, 1000 * 60 );		// check every 1 minute

}
