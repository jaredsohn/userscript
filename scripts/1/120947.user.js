// ==UserScript==
// @name              Powiadamiaczek
// @namespace         http://kamdz.pl
// @description       Skrypt dodaje dźwięk dla nowo przybyłych powiadomień.
// @author            Kamil "kamdz" Dzwonkowski 
// @version           1.0
// @include           http://*.wykop.pl*
// ==/UserScript==

var main = function () {	
	$(document).ready(function($) {	
		var getCounter = function() {
			if ($('#notificationsBtn .count:not(.dnone)"').text() == '')
				return 0;
			else 	
				return $('#notificationsBtn .count:not(.dnone)"').text();
		};

		var address = location.href;
		address = address.split('/');
		if (address[3] == 'dzwiek') {
			var src = prompt('Podaj adres pliku .wav .mp3 lub .ogg:', localStorage.getItem('src'));
			if (src.match(/.ogg$/) || src.match(/.mp3$/) || src.match(/.wav$/))
				localStorage.setItem('src', src); 
		}
		if (localStorage.getItem('src') == null) 
			localStorage.setItem('src', 'http://mirror.wykop.co.uk/audio/notify.wav'); 
		
		$('<audio>').attr('src', localStorage.getItem('src')).appendTo('body');
		
		localStorage.setItem('counter', getCounter());
		localStorage.setItem('fresh', 'true');
		setTimeout(function(){localStorage.setItem('fresh', 'false');}, 10000);
		
		$("#notificationsBtn").click(function () {
			localStorage.setItem('fresh', 'true');
			setTimeout(function(){localStorage.setItem('fresh', 'false');}, 10000);
		});
		
		setInterval(function(){	
			if (localStorage.getItem('fresh') == 'true'){
				checkNotifications();
			} else {
				var counter = getCounter();
				if (counter > localStorage.getItem('counter')){
					$('audio').get(0).play();
					localStorage.setItem('counter', counter);
				}	
			}
		}, 5000);
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)