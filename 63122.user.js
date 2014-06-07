// ==UserScript==
// @name           Neopets Auto-Adopter (dont use)
// @version        0.1
// @namespace      http://userscripts.org/users/63122
// @description    At the Neopian Pound,  This script will auto-adopt pets.
// @include        *
// @note           Making a Neopets Pound Auto-Adopter, all help is appreciated!
// @credit         Thank you neoscript for code
// ==/UserScript==


var user = {
		language: GM_getValue('language', 'en'),
		interval: GM_getValue('interval', '500-600').split('-').array_map(parseInt, array_fill(0, 2, 10)),

		names: GM_getValue('names', '').toLowerCase().split(';'),
		colors: GM_getValue('colors', 'Msp;Snow;Plushie;Darigan;Magma;Baby').toLowerCase().split(';'),
		species: GM_getValue('species', 'Krawk;Draik;').toLowerCase().split(';'),
		both: GM_getValue('both', 'Halloween:Ruki,Lupe;Coconut:Jubjub;Fire:Blumaroo;Island:Quiggle;Orange:Grundo').toLowerCase().split(';'),

		adopt: eval(GM_getValue('adopt', 'Pound.Names|Pound.Colors|Pound.Species|Pound.Both')),
		// = Pound.All&~Pound.Colors
		search: eval(GM_getValue('search', 'Pound.All')) // = Pound.Names|Pound.Colors|Pound.Species|Pound.Both
	};

var found = false;
			var pet_arr = unsafeWindow.pet_arr;
			if (typeof pet_arr == 'object') {
				var not_in = ['yellow', 'blue', 'white', 'green', 'brown', 'red', 'purple'];

				for (var i = 0, t = pet_arr.length; i < t && pet_arr[i] && pet_arr[i].species; ++i) {

					var name = pet_arr[i].name.toLowerCase();
					var color = pet_arr[i].color.toLowerCase();
					var species = pet_arr[i].species.toLowerCase();

					var search = [
					in_array(name, user.names), in_array(color, user.colors), in_array(species, user.species), color in both && in_array(species, both[color]) || species in both && in_array(color, both[species])];

					if (!in_array(color, not_in) || search[2]) GM_log([color, species, name]);

					if (user.search & Pound.Both && search[3] || user.search & Pound.Species && search[2] || user.search & Pound.Colors && search[1] || user.search & Pound.Names && search[0] || ~user.search & Pound.Both && !search[3] || ~user.search & Pound.Species && !search[2] || ~user.search & Pound.Colors && !search[1] || ~user.search & Pound.Names && !search[0]) {
						location.replace('javascript:select_pet(' + i + ');');
						found = true;

						if (user.adopt & Pound.Both && search[3] || user.adopt & Pound.Species && search[2] || user.adopt & Pound.Colors && search[1] || user.adopt & Pound.Names && search[0] || ~user.adopt & Pound.Both && !search[3] || ~user.adopt & Pound.Species && !search[2] || ~user.adopt & Pound.Colors && !search[1] || ~user.adopt & Pound.Names && !search[0]) {
							GM_openInTab('http://www.neopets.com/pound/adopt.phtml');

							unsafeWindow.ajaxRequest({
								url: '/pound/process_adopt.phtml',
								method: 'POST',
								args: 'pet_name=' + name,
								onSuccess: function(e) {
									if (e == 'success') {
										location.href = '/quickref.phtml';
										return;
									} else {
										alert(e);
									}
								},
								onFailure: function() {
									alert(unsafeWindow.translated_data(6, name));
								}
							});
						}
						else {
							location.replace('javascript:process_adopt();');
						}
					}
				}
			}

			if (!found) {
				location.replace('javascript:get_adopt();');
				setTimeout(recursive, randomValue(user.interval));
			}
		});
	}
	else {
		alert('You already have four pets.');
	}
})();