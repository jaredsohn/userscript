// ==UserScript==
// @name        Wykopowa lista hańby
// @description Zamienia avaty ludzi z listy hańby
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.03
// @run-at	document-end
// ==/UserScript==

//var zhanbieni =;
if (typeof $ == 'undefined') {
	if (unsafeWindow.jQuery) {
		var $ = unsafeWindow.jQuery;
		$(document).ready(maine_functione);
	} else {
		addJQuery(maine_functione);
	}
} else {
	$(document).ready(maine_functione);
}
function maine_functione()
{
	var new_color = "darkviolet";
	var zhanbieni = {
'borntobewild': true, 'micky1': true, 'Phillippus': true, 'ledniowski99': true, 'oooMaXooo': true, 'retardo': true, 'aniolziom': true, 'michuck': true, 'terminator2': true, 'Tigran': true, 'pietrass': true, 'Thou': true, 'shadow_no': true, 'betonkomorkowy': true, 'IF22I': true, 'Agreas': true, 'Zakakaikane': true, 'qski': true, 'pietrek3121': true, 'Maciek5000': true, 'shownomercy': true, 'JoLemon': true
                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  zhanbieni)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.66';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(zha&nacute;biony) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};