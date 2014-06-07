// ==UserScript==
// @name		IGM user GMT zone
// @namespace		IGM
// @icon		http://dy5oyikz6c23y.cloudfront.net/V005/1/templates/igmaraudersglobal/favicon.ico
// @description		Show user GMT zone in profile
// @author		Kleho
// @version		0.0.1
// @date		2012-03-31
// @include		http://igmarauders.isotx.com/*
// ==/UserScript==

if (/http:\/\/igmarauders.isotx.com\//.test(window.location.href)){

	setInterval(function() {
		
		if (!document.getElementById('show_gmt_zone')) {

			var timezone_select = document.getElementById('timezone');

			if (timezone_select) {
	
				var gmt_select = document.getElementById('timezone');
				var gmt_text = gmt_select.options[gmt_select.selectedIndex].innerHTML;
				gmt_text = gmt_text.substr(0, gmt_text.indexOf(')')+2)+ gmt_select.value; 
	
				var div = document.getElementById('profileTextContainer');
				var zone = document.createElement('div');
				zone.style.textAlign = 'right';
				zone.style.textSize = '0.9em';
				zone.style.color = '#777777';
				zone.innerHTML = gmt_text;
				zone.id = 'show_gmt_zone';
	
				div.appendChild(zone);
			}

		}

		},
		1000
	);

}
