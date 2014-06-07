// ==UserScript==
// @name          Avans
// @description   Klika automatycznie w linki
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @include       http://www.avans.pl/*
// @include       https://www.avans.pl/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require       http://rafalwolak.pl/js/jquery.cookie.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var stop = $.cookie('stop');

console.log(stop);

if (stop == undefined) {
	var counter = GM_getValue('counter', 0);
	console.log('This script has been run ' + counter + ' times.');
	GM_setValue('counter', ++counter);

	var linkArray = [
		[
			'http://www.avans.pl/mastercook-pralka-mastercook-ptde-126-bio-,id-126501', // Pralki ładowane od góry - 1300
			'https://www.avans.pl/koszyk.html?d=126501' // Pralki ładowane od góry - 1300
		],
		[
			'http://www.avans.pl/siemens-pralko-suszarka-siemens-wd-14h421eu-,id-138675', // Pralko-suszarki  - 2900
			'https://www.avans.pl/koszyk.html?d=138675' // Pralko-suszarki  - 2900
		],
		[
			'http://www.avans.pl/lg-pralka-lg-f-1443kds7-,id-126682', // Pralki ładowane od frontu - 3200
			'https://www.avans.pl/koszyk.html?d=126682' // Pralki ładowane od frontu - 3200
		],
		[
			'http://www.avans.pl/sharp-lodowka-sharp-sj-gc680v-sl-,id-131269', // Lodówki z zamrażalnikiem u góry - 3400
			'https://www.avans.pl/koszyk.html?d=131269' // Lodówki z zamrażalnikiem u góry - 3400
		],
		[
			'http://www.avans.pl/siemens-lodowka-siemens-ks-36vvi30-,id-137883', // Lodówki jednodrzwiowe  - 2700
			'https://www.avans.pl/koszyk.html?d=137883' // Lodówki jednodrzwiowe  - 2700
		],
		[
			'http://www.avans.pl/lg-lodowka-lg-gs-9167aejz-,id-127849', // Lodówki Side by Side - 5700
			'https://www.avans.pl/koszyk.html?d=127849' // Lodówki Side by Side - 5700
		],
		[
			'http://www.avans.pl/liebherr-witryna-liebherr-fks-3602-,id-124130', // Witryny chłodnicze - 3200
			'https://www.avans.pl/koszyk.html?d=124130' // Witryny chłodnicze - 3200
		],
		[
			'http://www.avans.pl/bosch-zmywarka-bosch-smv-69n20eu-,id-137091',
			'https://www.avans.pl/koszyk.html?d=137091' // Zmywarki do zabudowy - 2500
		]
	];

	var baseLink = 'http://www.avans.pl/';

	var location = window.location.href;

	var isCart = location.indexOf("koszyk");

	if (isCart > -1) {
		window.location.href = baseLink;
	}

	if (location == baseLink) {
		$.removeCookie('start');
	}

	var start = $.cookie('start');
	var current = GM_getValue("current", 0);

	setTimeout(function() {
		console.log('linkArray: ' + linkArray);
		console.log('location: ' + location);
		console.log('start: ' + start);
		console.log('current: ' + current);

		if (start == undefined || GM_getValue("produkt", false)) {
			$.cookie('start', true);

			if (linkArray[current] != undefined) {
				if (GM_getValue("produkt", false)) {
					// sprawdzenie czy produkt można dodać do koszyka
					var addCart = $('.add_to_cart');

					// zmiana na kolejny produkt
					var next = current + 1;
					GM_setValue("current", next);
					GM_deleteValue("produkt");

					if (addCart.size() > 0) {
						// przekierowanie do koszyka
						window.location.href = linkArray[current][1];
					} else {
						// przekierowanie na stronę głowną
						window.location.href = baseLink;
					}
				} else {
					// przekierowanie na stronę produktu
					GM_setValue("produkt", true);
					window.location.href = linkArray[current][0];
				}
			} else {
				GM_deleteValue("current");
				GM_deleteValue("counter");
				$.cookie('stop', true);

				window.location.href = 'http://www.avans.pl/';
			}
		}
	}, 100);
}


