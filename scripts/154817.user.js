// ==UserScript==
// @name           EuroFotbal DiscussCleaner
// @namespace      http://www.eurofotbal.cz
// @description    Skryje příspěvky vybraných uživatelů na Eurofotbal.cz
// @include        http://www.eurofotbal.cz/*
// @author         Whites (Potty)
// @version        1.2.0
// @date           17.4.2013
// ==/UserScript==

// Function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	'use strict';

	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}



// Main function
function main() {
	'use strict';
	
	var panel = '.settings-panel';
	var settingsIcon = '<img alt="Settings" title="DiscussCleaner - nastavení" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDkvMjUvMTIxTlGMAAAClElEQVQ4jaVT30tTcRT/fO/dz8SbJjTn5tKKq6O4IM0ZOYaY9tBmPfUQvgZSvtt/0ntP0lvQQzBng9w1p3OiG6ZZOsOhhmk57nV3++6eHnQSoRF03g7ncz6cH58PIyL8T1jOKzwbHb02Mzv7UNc0yWa3H/o7O9+8Gh9f+2eCmVTKs5TNSiepBOAKgL8TBILBG5FIpKCq6tVCoXCbiCAIAsg08XVzsysUDv8YHBj4NJlItL1PJLIAiNVuoHR1hdfW1vrtdjuVSiVmGMZxMxEYYyAi2O12OBwOOjo6Yh2ynFxcWIgzIsL9aLR9Kpl8rOu6rQYWRRGSJB1clKR9TdcvHRwcNHLOT6etr683HwwNvbYAQLFYHOCc2xhjYIxBFEUoijKdTqVie7u7YIyhf3BwUFXVXs45GABd14X19fW7AgA8Hxt76fP5phmAKudocbu/zc3MxGrrEREmY7EJl8u1ZZomiAgdsjw/PDz8QgCAaCRSrqurWxVEEYIoAsDGWZ9pbGjYEgQBFqsVHo/ny9OREUM4qdnKhnHdrFZBRNB03XMWwff9fTcRgXOO7e3ttnw+b2VEhHBf35O5dNpbqVSOfyuKCIVCajwWm6g1d/f03FleXr5nlMvHGIsFiqLsWQDA19qqZnO5R4ZhCIwxVDhHUlV7vT6f/6hUKlhE8fLPw0NXpVwGGAMAWK1W093cPHWqg+6enoGlbDbkdDhglMswDAMATrVARLDZbHA6ndA0DX6/P7WYybxlv5mJRaLRoLul5XMmk2nfyOf7i8XihZounA6HdisQ+BAMBFbS8/Nt7+LxBQBVdp4bbypKeGV1tZ8xBtM0Icty8mMuF/8Td66ZZFku8Gq1tLOz4/B6vdWmpqbNs3C/AOj1O7mA8S70AAAAAElFTkSuQmCC" />';
	
	initUI();
	
	if (localStorage.ignoredUsers !== undefined) {
		
		var ignoredUsers = JSON.parse(localStorage.ignoredUsers);
		var optionInvert = toBool(localStorage.optionInvert);
		var optionMode = toBool(localStorage.optionMode);

		if (localStorage.optionInvert === undefined) {
			localStorage.optionInvert = false;
		}
		
		if (localStorage.optionMode === undefined) {
			localStorage.optionMode = false;
		}

		$('textarea.settings-text').val(ignoredUsers.join(','));
		$('#settings-invert').prop('checked', optionInvert);
		$('#settings-mode').prop('checked', optionMode);

		$('.post').each(function(){
	
			var nick = $(this).find('.name').text();
			
			if (!optionInvert) {
				
				// Hides users in array
				if ($.inArray(nick, ignoredUsers) !== -1) {

					if (!optionMode) {
						$(this).css('display', 'none');
					} else {
						hideMsg($(this).find('.text'));
					}

					console.log('Found ignored user.');
				}
			
			} else {
				
				// Displays users in array
				if ($.inArray(nick, ignoredUsers) === -1) {

					if (!optionMode) {
						$(this).css('display', 'none');
					} else {
						hideMsg($(this).find('.text'));
					}

					console.log('Found ignored user.');
				}
			
			}

			// url replace
			//var text = $(this).find('.text');
			//console.log(text);
			//text.html(searchLink(text.html()));

		});
	}



	function initUI() {

		// Settings button
		$('<button/>', {
			class: 'settings-toggle',
			css: {
				position: 'absolute',
				top: 25,
				left: 212
			},
			click: function(){
				$(panel).slideToggle('normal');
			}
		}).appendTo('.login');
	
		$('.settings-toggle').append(settingsIcon);
		
		$('.middle').prepend('<div class="settings-panel"><h3>DiscussCleaner - nastavení</h3></div>');
		$(panel).css('padding', '10px').hide();



		// Textarea
		$('<textarea/>', {
			class: 'settings-text',
			rows: 4,
			cols: 100,
			css: {
				display: 'block'
			}
		}).appendTo(panel);



		// Checkboxes container
		$(panel).append('<div><ul class="chks-container"></ul></div>');
		var $chkcContainer = $('.chks-container');
		$chkcContainer.css('listStyleType', 'none');



		// Checkbox invert
		$chkcContainer.append('<li class="chk1"></li>');
		$('<input/>', {
			id: 'settings-invert',
			type: 'checkbox',
			name: 'chk-invert',
			css: {
				verticalAlign: 'middle'
			}
		}).appendTo('.chk1');
	
		$('.chk1').append('<label for="settings-invert">Obrátit filtrování (zobrazí jen uvedené uživatele)</label>');



		// Checkbox display mode
		$chkcContainer.append('<li class="chk2"></li>');
		$('<input/>', {
			id: 'settings-mode',
			type: 'checkbox',
			name: 'chk-mode',
			css: {
				verticalAlign: 'middle'
			}
		}).appendTo('.chk2');

		$('.chk2').append('<label for="settings-mode">Skrýt jen text příspěvku (struktura diskuze zůstane zachována)</label>');



		// Button save
		$('<button/>', {
			class: 'settings-save',
			text: 'Uložit',
			css: {
				display: 'block'
			},
			click: function() {
				var data = {};
				data.names = $('textarea.settings-text').val();
				data.invert = $('#settings-invert').is(':checked');
				data.mode = $('#settings-mode').is(':checked');
				saveData(data);
				showMsg('Nastavení uloženo.');
			}
		}).appendTo(panel);
	}



	function showMsg(text) {
		$('<div/>', {
			class: 'settings-message',
			text: text
		}).hide()
			.prependTo(panel)
			.show('normal')
			.delay(1000)
			.hide('normal');            
	}



	function saveData(data) {
		console.log(data.names);
		console.log(data.invert);
		console.log(data.mode);
		var names = data.names.split(',');
		localStorage.ignoredUsers = JSON.stringify(names);
		localStorage.optionInvert = data.invert;
		localStorage.optionMode = data.mode;
	}



	function toBool(str) {
		return (str.toLowerCase().charAt(0) === "t");
	}



	function hideMsg(el) {
		var elText = el.html();

		el.html('<i>Tento uživatel je v ignore listu.</i> ');
		$('<a/>', {
			css: {
				'color': '#9d0c15',
				'text-decoration': 'underline',
				'font-style': 'italic',
				'cursor': 'pointer'
			},

			class: 'show-text',
			text: 'Zobrazit',
			click: function() {
				el.html(elText);
			}
		}).appendTo(el);

	}



	function searchLink(text) {

		//console.log(text);

		function createLink(match, optionalWhitespace, uri, scheme, p4, protocol, fqdn, p7, port, path, query, queryVal, fragment, fragId) {

			console.log('creating link...');
			console.log(uri);

			// remove brackets
			// if ( url.charAt(0) === '(' && url.charAt( url.length-1 ) === ')' ) {
			//	url = url.slice(1,-1);
			//}

			var displayUri = uri;

			console.log(uri);

			if (uri.length > 40) {
				displayUri = uri.slice(0, 40) + '...';
			}

			return ' ' + '<a href="' + uri + '" target="_blank" title="' + uri + '">' + displayUri + '<\/a>';

		}

		var urlRegex = /(^|\s)((https?:\/\/)[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
		return text.replace(urlRegex, createLink);
	} 

}

// Executes main function
addJQuery(main);