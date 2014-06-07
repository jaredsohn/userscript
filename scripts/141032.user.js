// ==UserScript==
// @name              Automatyczny Tryb Nocny na Wykopie
// @namespace         http://kamdz.pl
// @description       Dodatek umożliwia ustawienie godzin w którym wykop będzie mieć nocny wygląd.
// @author            Kamil "kamdz" Dzwonkowski
// @version           1.0
// @include           http://*.wykop.pl*
// ==/UserScript==

var main = function () {
	$(function ($) {
		var autonightmode = (localStorage.getItem('anm_state') || 'off') == 'on' ? true : false;
		var auto1 = parseInt(localStorage.getItem('anm_1')) || 20;
		var auto2 = parseInt(localStorage.getItem('anm_2')) || 7;
		var hour = new Date().getHours();
		var settings = localStorage.getItem('anm_settings') ? localStorage.getItem('anm_settings') + '&__token=' + token : '__token=' + token;
		var nick = $('.avatar a').attr('title');
		var style = localStorage.getItem('anm_style');
		
		if (document.location.pathname.match('/ludzie/ustawienia/')) {
			$('.scale fieldset > div h3:contains("Wygląd")').parent().append('<p><input id="autonightmode" name="autonightmode" class="chk-box" type="checkbox" value="on" ' + (autonightmode ? 'checked="checked"' : '') + '><label for="autonightmode">włącz automatycznie tryb nocny w godzinach: </label><input type="number" value="' + auto1 + '" id="auto1" name="auto1" min="0" max="23" /> - <input type="number" value="' + auto2 + '" id="auto2" name="auto2" min="0" max="23" /></p>');
			
			if ($('#autonightmode').is(':checked'))
				$('#night_mode').attr('disabled', true);
			if (style == 'dark')
				$('#night_mode').attr('checked', true);
			
			$('#autonightmode').click(function () {
				if (this.checked) {
					$('#night_mode').attr('disabled', true);
				} else {
					$('#night_mode').removeAttr('disabled');
					$('#night_mode').attr('checked', false);
				}
			});
			
			$(document).delegate('form', 'submit', function () {
				localStorage.setItem('anm_settings', $('input[name*="user"][name!="user[night_mode]"]').serialize());
				localStorage.removeItem('anm_style');
				if ($('#autonightmode').is(':checked')) {
					localStorage.setItem('anm_state', $('#autonightmode').val());
					localStorage.setItem('anm_1', $('#auto1').val());
					localStorage.setItem('anm_2', $('#auto2').val());
				} else {
					localStorage.setItem('anm_state', 'off');
				}
			});
		}
		
		var magic = function (style) {
			if (style == 'dark')
				settings += '&user%5Bnight_mode%5D=on';
			$.post('/ludzie/ustawienia/' + nick, settings, function () {
				localStorage.setItem('anm_style', style);
			});
		}
		
		if (autonightmode) {
			var css = $('link[rel="stylesheet"]:first').attr('href').replace('interface', 'interface-night');
			if ((auto2 < auto1) && (hour < 24 && hour >= auto1 || hour >= 0 && hour < auto2) || auto2 > auto1 && hour >= auto1 && hour < auto2) {
				if (style != 'dark') {
					$('head').append('<link rel="stylesheet" href="' + css + '" type="text/css" />');
					magic('dark');
				}
			} else {
				if (style != 'light') {
					$('link[rel="stylesheet"][href="' + css + '"]').remove();
					magic('light');
				}
			}
		}
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)
