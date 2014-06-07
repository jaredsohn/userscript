// ==UserScript==
// @name           Prisjakt, select all products
// @namespace      http://userscripts.org/users/88601
// @include        http://www.prisjakt.nu/kategori.php?k=*
// ==/UserScript==

var BOX_IMAGES_PREFIX = '/g/i/';
var BOX_IMAGES = {
	 'on': BOX_IMAGES_PREFIX + 'checkboxs_on.gif',
	'off': BOX_IMAGES_PREFIX + 'checkboxs_off.gif'
};

function select_all_products() {
	var images = document.getElementsByTagName('img');

	for (var e in images) {
		var img = images[e];

		var re = /^prod_sel_(\d+)/;
		if (img.id && img.id.match(re))
			unsafeWindow.toggle_sel('prod', img.id.replace(re, '$1'));
	}

	var elem = this;

	if (elem.src.indexOf(BOX_IMAGES['off']) > -1)
		elem.src = BOX_IMAGES['on'];
	else
		elem.src = BOX_IMAGES['off'];
}

window.addEventListener('load', function() {
	var prod_list = document.getElementById('div_produktlista');
	var th = prod_list.getElementsByTagName('th')[0];

	var checkbox           = document.createElement('img');
	checkbox.className     = 'ikon';
	checkbox.alt           = 'Markera alla produkter.';
	checkbox.title         = checkbox.alt;
	checkbox.src           = BOX_IMAGES['off'];
	checkbox.style.width   = '11px';
	checkbox.style.height  = '11px';
	checkbox.style.border  = 0;
	checkbox.style.cursor  = 'pointer';

	checkbox.addEventListener('click', select_all_products, true);

	th.appendChild(checkbox);
}, true);
