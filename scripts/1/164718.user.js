// ==UserScript==
// @name	Naprawiacz pasków
// @namespace	http://userscripts.org/scripts/show/164718
// @author	kasper93
// @description	Zmienia kolor paska pod awatarem osobom, które mają źle ustawiona pleć w profilu. 
// @include	http://*wykop.pl/*
// @include	https://*wykop.pl/*
// @downloadURL	https://userscripts.org/scripts/source/164718.user.js
// @updateURL	https://userscripts.org/scripts/source/164718.meta.js
// @version	1.0.21
// @grant	none
// @run-at	document-end
// ==/UserScript==

function main() {
	var roz = ['ppj', 'dziadekwie', 'kasiknocheinmal', 'Faf', 'imyodda', 'fir3fly', 'Aerials', 'spojrz', 'xyz23', 'mozaika', 'evesia'];
	var nieb = ['PanBulka', 'MasterSoundBlaster', 'kokaina', 'Kozzi', 'Baron_Al_von_PuciPusia', 'plusbear', 'nie_daje_rady', 'jaras2', 'keram244', 'lecho', 'Grzesiu_Lato', 'grimes997', 'sarge', 'EtaCarinae', '-PPP-', 'zakowskijan72', 'Misieq84', 'Yossarian82', 'MarZam', 'funk', 'CzekoladowyRambo', 'Nrb', 'konfafal', 'tomasz_B', 'Drzwi'];
	
	$(function() {
		napraw();
		naprawProfil();
	});
	
	$(document).ajaxComplete(function() {
		napraw();
	});
	
	$('div.recentPlaceHolder').on("click", function () {
		napraw();
	});
	
	function napraw() {
		$('cite.abs > a').each(function () {
			if (nieb.indexOf($(this).attr("title").substring(7)) != -1) {
				$(this).removeClass('female').addClass('male');
			} else if (roz.indexOf($(this).attr("title").substring(7)) != -1) {
				$(this).removeClass('male').addClass('female');
			}
		});
	}
	
	function naprawProfil() {
		var url_arr = document.location.pathname.split('/');
		if (url_arr[1] == "ludzie") {
			if (nieb.indexOf(url_arr[2]) != -1) {
				$('.usercard > .photo').removeClass('female').addClass('male');
			} else if (roz.indexOf(url_arr[2]) != -1) {
				$('.usercard > .photo').removeClass('male').addClass('female');
			}
		}
	}
}

if (typeof $ == 'undefined') {
	if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
		// Firefox
		var $ = unsafeWindow.jQuery;
		main();
	} else {
		// Chrome
		addJQuery(main);
	}
} else {
	// Opera
	main();
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}