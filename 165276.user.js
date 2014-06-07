// ==UserScript==
// @name        Userchanger
// @description Daje niemal nieograniczone możliwości edycji uzytkownikow.
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.0
// @grant       none
// @run-at	document-end
// ==/UserScript==

if (typeof $ == 'undefined') {
	if (unsafeWindow.jQuery) {
		var $ = unsafeWindow.jQuery;
		$(document).ready(user_changer);
	} else {
		addJQuery(user_changer);
	}
} else {
	$(document).ready(user_changer);
}
function user_changer()
{
	"use strict";
	var lista = {
		// tutaj dopisuj swoje elementy - listę informacji masz w opisie skryptu
		'Elfik32': {'nick': 'Elfik64', 'color': 'black'},
		'stekelenburg2': {'color': ' #339933'},
		'Ginden': {'class': 'lewak'},
		'cheft': {'nick': 'dobrychuj'}
	};
	var temp1 = {};
	var m = function(a, b){
		if (b['nick']) {
			temp1[a] = b['nick'];
		}
	};
	$.each(lista, m);
	m = undefined; // wyrzucamy, niepotrzebne
	$(document.body).append(
		$('<style />').text(
			'.lewak {'+
				'	background: url("http://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red_star.svg/14px-Red_star.svg.png")'+
				'no-repeat scroll 0% 0% transparent;'+
				'	padding-left: 15px;}'
			/* przykladowy kod CSS */
			)
		);
	var EditUsers = function(obiekt, opcje){
		$('a[title^="profil"] img').each(function (i,el) {
		if (lista[el.alt]) {
				var dane = lista[el.alt];
				var $el = $(el);
				var li = $el.closest('li');
				var nick = $('strong', li).first();
				if (dane['class']) {
					nick.addClass(dane['class']);
				}
				if (dane['color']) {
					nick.css('color', dane['color']);
				}
				if (dane['function']) {
					funkcja = dane['function'];
					funkcja = function(){};
					if (nick.data('cu_function_applied') === true) {
						//smile
						$();
					}
					else {
						nick.data('cu_function_applied', funkcja.apply(nick));
					}
				}
				if (dane['nick']) {
					$(nick).text(dane['nick']);
				}
			}
		});
		if (obiekt) { // before send?
			if (opcje['data']) {
				var z = opcje['data'];
				var t = function(key, element) {
				    var q = encodeURIComponent("@"+element);
				    z = z.replace(new RegExp(q, "g"), "%40"+key);
				};
				$.each(temp1, t);
				opcje['data'] = z;
			}
		}
		
	};
	EditUsers();
	$.ajaxSetup({
		global: true,
		beforeSend: EditUsers,
		complete: EditUsers
	});

}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};