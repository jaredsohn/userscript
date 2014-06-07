// ==UserScript==
// @name              Czysty Wykop
// @namespace         http://kamdz.pl
// @description       Skrypt usuwa znaleziska sponsorowane, polecane, reklamy allegro w powiązanych, wykop market i to co mamy na czarnych listach.
// @author            Kamil "kamdz" Dzwonkowski
// @version           1.7
// @include           http://*.wykop.pl*
// @exclude           http://*.wykop.pl/link*
// @exclude           http://*.wykop.pl/ramka*
// ==/UserScript==

var main = function () {
	$(document).ready(function ($) {
		// Na jakis czas brak ustawien, przepraszam
		/*var cw_s = localStorage.getItem('cw_s') || 'on';
		var cw_p = localStorage.getItem('cw_p') || 'on';
		var cw_m = localStorage.getItem('cw_m') || 'on';
		var cw_b = localStorage.getItem('cw_b') || 'off';
		
		if (document.location.pathname.match('/ludzie/ustawienia/')) {
			$('.scale fieldset').prepend('<div class="fblock margin10_0 marginbott20"><h3 class="large fbold">Czysty Wykop</h3><p><input id="cw_s" name="cw_s" class="chk-box" type="checkbox" value="on" ' + (cw_s == 'on' ? 'checked="checked"' : '') + '><label for="cw_s">ukrywaj wykopy sponsorowane</label></p><p><input id="cw_p" name="cw_p" class="chk-box" type="checkbox" value="on" ' + (cw_p == 'on' ? 'checked="checked"' : '') + '><label for="cw_p">ukrywaj wykopy polecane</label></p><p><input id="cw_m" name="cw_m" class="chk-box" type="checkbox" value="on" ' + (cw_m == 'on' ? 'checked="checked"' : '') + '><label for="cw_m">ukrywaj wykop market</label></p><p><input id="cw_b" name="cw_b" class="chk-box" type="checkbox" value="on" ' + (cw_b == 'on' ? 'checked="checked"' : '') + '><label for="cw_b">ukrywaj wszystko z czarnych list</label></p></div>');
			
			$(document).delegate('form', 'submit', function () {
				$('input[name*="cw_"]').each(function (index, option) {
					if ($(option).is(':checked'))
						localStorage.setItem(option.name, option.value);
					else
						localStorage.removeItem(option.name);
				});
			});
		}*/
		//if (cw_s == 'on')
			$('article .sponsoredby').remove();
		//if (cw_p == 'on')
			$('.scale a[href*="http://www.wykop.pl/reklama"]').closest('article').remove();
		//if (cw_m == 'on') {
			$('article a').filter('[href*="http://www.wykop.pl/paylink/"],[href*="http://www.wykop.pl/market/"]').closest('article').next('article').removeClass('dnone');
			$('article a').filter('[href*="http://www.wykop.pl/paylink/"],[href*="http://www.wykop.pl/market/"]').closest('article').remove();
			if ($('.newmarket').length == 1)
				$('.prev-link, .next-link').remove();
		//}
		//if (cw_b == 'on') {
			$("a:contains('przejdź do wpisu')").closest('.entry').remove();
			$('article .slim').remove();
		//}
		$('.commercial').remove();
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);