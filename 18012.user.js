// SchuelerVZ Extensions
// - Zeigt in der Navi an, wie viele neue Mails in deinem Postfach sind
// - Ermöglicht das Abspeichern von Galleriebildern auf Knopfdruck
// 2007-02-13
// Copyright (c) 2007, Andreas Kalsch, Malte Wittkugel
// Edited for sVZ - Oezguen Goecer
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to 'Install User Script'.
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select 'SchuelerVZ Extensions', and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SchuelerVZ Extensions 0.2
// @namespace     
// @description   Nützliche Erweiterungen fürs SchuelerVZ
// @include       http://schuelervz.net/*
// @include       http://*.schuelervz.net/*
// ==/UserScript==


SchuelerVZ = {
	version: '0.2',
	
	init: function() {
		this.indi = document.createElement('span');
		this.indi.innerHTML = '...';
		this.indi.style.fontWeight = 'bold';
		this.indi.style.marginLeft = '5px';
		this.link = null;
		for (var i = 0; i < document.links.length; i++) {
			if (document.links[i].href.match(/mailbox.php$/)) {
				this.link = document.links[i];
				break;
			}
		}
		if (this.link) {
			this.link.appendChild(this.indi);
			window.setInterval(this.nachrichten, 20000);
			window.setTimeout(this.nachrichten, 1000);
		}
		
		if (location.pathname == '/showalbum.php')
			this.enableSaveImage();
		
		/*if (location.pathname == '/home.php')
			setTimeout (this.checkForUpdate, 500);*/
	},
	
	nachrichten: function() {
		var R = new XMLHttpRequest();
		R.onreadystatechange = function() {
			if (R.readyState == 4) {
				var nachrichten = 0;
				var d = document.createElement('div');
				d.innerHTML = R.responseText;
				var spans = d.getElementsByTagName('span');
				for (var i = 0; i < spans.length; i++) {
					var span = spans[i];
					if (span.id.match(/^msg_[0-9]+_title$/) && span.style.fontWeight == 'bold')
						nachrichten++;
				}
				SchuelerVZ.indi.innerHTML = nachrichten > 0 ? '('+nachrichten+')' : '(0)';
				with(SchuelerVZ.link.style) {
					backgroundColor = nachrichten > 0 ? 'red' : '';
					color = nachrichten > 0 ? 'white' : '';
				}
			}	
		};
		R.open('get', 'mailbox.php', true);
		R.send(null);
	},
	
	getFriends: function() {
		
	},
	
	enableSaveImage: function () {
		if (document.getElementById('sisu')) {
			par = document.getElementById('sisu').parentNode;
			button = document.createElement('input');
			button.type = 'button';
			button.className = 'inputsubmit';
			button.value = 'Bild speichern';
			button.style.width = '130px';
			button.style.marginLeft = '5px';
			button.addEventListener ('click', function (e) {
				pic = document.getElementById('pic');
				window.location.href = pic.src;
			}, true);
			par.appendChild(button);
		}
	}
};

SchuelerVZ.init();