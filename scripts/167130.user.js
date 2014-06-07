// ==UserScript==
// @name           Neopets - Sticky REs
// @description    Puts REs at the top of the page for a few seconds.
// @include        http://www.neopets.com/*
// @match          http://www.neopets.com/*
// ==/UserScript==

setTimeout(function () {

	if ( window.pageYOffset > 199 ) {
		// If the normal event is already visible, don't make a copy.
		e = document.createElement('script');
		e.type = 'text/javascript';
		e.textContent = "var normalSHH = {'position': 'fixed', 'top': '10px', 'left': '50%', 'margin-left': '-200px', 'z-index': '10001', 'border-radius': '5px', 'background-color': '#fff'};"+
						"var premSHH = {'position': 'fixed', 'top': '10px', 'left': '50%', 'margin-left': '-420px', 'z-index': '10001'};"+
						"$('table[align=center][width=400]').clone().appendTo('body').css(normalSHH).fadeOut(4000, function () { $(this).remove(); } );"+
						"$('div#shh_prem_bg').clone().appendTo('body').css(premSHH).fadeOut(4000, function () { $(this).remove(); } );";
		// $('table[align=center][width=400] td[width=80] + td[width=320]').closest('table') // More specific if needed.
		document.body.appendChild(e);
	}

}, 100);