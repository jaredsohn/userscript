// ==UserScript==
// @name          In-Post-Signatur
// @fullname      In-Post-Signatur für Bronies.de
// @author        Merrx
// @homepage      http://userscripts.org/scripts/show/149864
// @namespace     http://userscripts.org/scripts/show/149864
// @updateURL     http://userscripts.org/scripts/source/149864.meta.js
// @downloadURL   http://userscripts.org/scripts/source/149864.user.js
// @version       2012.11.01
// @include       *bronies.de/newreply.php?*
// @include       *bronies.de/showthread.php?*
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_deleteValue
// ==/UserScript==

// Prüfen ob angemeldet
if(document.getElementById('message') != null  || document.getElementById('message_new') != null) {

	// Bereitstellen der Lade und Speicherfunkionen, falls sie nicht vorhanden sind
	if (typeof GM_deleteValue == 'undefined') {
	// Natives Chrome und Opera abfangen, da Tampermonkey die Funktionen bereitstellt
		if((navigator.userAgent.search('Chrome') != -1) || (navigator.userAgent.search('Opera') != -1) ) {
			GM_deleteValue = function(name) {
				window.localStorage.removeItem(name);
			}

			GM_getValue = function(name, defaultValue) {
				var value = window.localStorage.getItem(name);
				if (!value)
					return defaultValue;
				var type = value[0];
				value = value.substring(1);
				switch (type) {
					case 'b':
						return value == 'true';
					case 'n':
						return Number(value);
					default:
						return value;
				}
			}

			GM_setValue = function(name, value) {
				value = (typeof value)[0] + value;
				window.localStorage.setItem(name, value);
			}
		}
		// Internet Explorer abfangen, hier auf cookies zurückgreifen, um Daten zu speichern
		else if(navigator.userAgent.search('MSIE') != -1) {
			GM_getValue = function(name, defaultValue) {
				var get = document.cookie.split(name+"=")[1];
				if (get != null) { 
					get = get.split(";")[0];
				} else {
					get = defaultValue;
				}
				return get;
			}

			GM_setValue = function(name, value) {
				var date = new Date();
				date.setTime(date.getTime()+(31*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
				document.cookie = name+"="+value+expires+"; path=/";		
				return true;
			}
			
			GM_deleteValue = function(name) {
				document.cookie = name+"=; expires=-1";
			}
		}
	}

	// Laden und Speichern der Variblen
	function load_var() {
		// Ladefunktionen oben bereitgestellt
			sig_trd = JSON.parse(GM_getValue('sig_trd', '[]'));
			sig_txt = JSON.parse(GM_getValue('sig_txt', '[]'));
	}
	function save_var() {
		// Funktionen oben bereitgestellt
		 if (sig_trd.length == 0) {
			GM_deleteValue('sig_trd');
			GM_deleteValue('sig_txt');
		} else {
			GM_setValue('sig_trd', JSON.stringify(sig_trd));
			GM_setValue('sig_txt', JSON.stringify(sig_txt));
		 }
	}
	
	// Einfügen der Signatur
	function insert_sig() {
		if(signatur != '') {

			// Finden des Textfeldes
			if(document.getElementById('message_new') != null) {
				var input = document.getElementById('message_new')
			} else {
				var input = document.getElementById('message');
			}	
		//	var insText = "[img]http://merrx.bestpony.de/smiley/"+datei+"[/img]";
			
		//	input.focus();
			// für Internet Explorer
			if(typeof document.selection != 'undefined') {
				// Einfügen des Formatierungscodes
				var range = document.selection.createRange();

				var text = signatur.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
				// Abfangen von Fehlern beim Neuladen der Seite
				if (input.value.search(text) == -1)
					input.value += "\n\n[hr]" + signatur;
				// Ein Enter zu wenig
				if (input.value.search(text) == 5)
					input.value = "\n" + input.value;
				
				// Anpassen der Cursorposition  		
				range.select();
			}
			// auf Gecko basierende Browser
			else if(typeof input.selectionStart != 'undefined')	{
				// Einfügen des Formatierungscodes 
				var start = input.selectionStart;
				var end = input.selectionEnd;
				
				var text = signatur.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
				// Abfangen von Fehlern beim Neuladen der Seite
				if (input.value.search(text) == -1)
					input.value += "\n\n[hr]" + signatur;
				// Ein Enter zu wenig
				if (input.value.search(text) == 5)
					input.value = "\n" + input.value;
				
				// Anpassen der Cursorposition 
				input.selectionStart = start;
				input.selectionEnd = end;
			}
		}
	}
	
	// Signatur ändern
	function change() {
		var sig_alt = signatur;
		var e = prompt("Bitte neue In-Post-Signatur eingeben\nZum Löschen der Signatur in diesem Thread Feld leeren.\n",signatur);
		if (e == null) {return 0;}

		// Finden des Textfeldes
		if(document.getElementById('message_new') != null) {
			var input = document.getElementById('message_new')
		} else {
			var input = document.getElementById('message');
		}
		
		// Textfeld säubern, Opera abfangen
		if( navigator.userAgent.search('Opera') != -1 ) {
			input.value = input.value.split('\r\n\r\n[hr]' + sig_alt)[0];
		} else {
			input.value = input.value.split('\n\n[hr]' + sig_alt)[0];
		}
		
		// Variblen neuladen, falls eine andere Seite sie verändert hat
		load_var();
		
		if(e == '') {
			// Aktuelle Signatur löschen
			for (var i = 0; i < sig_trd.length; i++){
				if (sig_trd[i] == tid) {
					sig_trd.splice(i,1);
					sig_txt.splice(i,1);
					signatur = '';
				}
			}
		}
		else {
			signatur = '';
			// Aktuelle Signatur ersetzen
			for (var i = 0; i < sig_trd.length; i++){
				if (sig_trd[i] == tid) {
					sig_txt[i] = e;
					signatur = sig_txt[i];
				}
			}
			if(signatur == '') {
				// Neu in die Liste eintragen
				sig_trd.push(tid);
				sig_txt.push(e);
				signatur = e;
			}	
		}

		// Geänderte Signatur einfügen
		insert_sig();
		save_var();
		return 0;
	}

	// Starten des Skripts
	function start() {
		// Laden aus Variblen
		load_var();
		signatur = '';
		
		// Festlegen des Ortes des Buttons
		ort = document.getElementsByName('previewpost')[0].parentNode;
		ort.appendChild(document.createTextNode(" "));

		// Thread-ID herausfinden
		var params=document.URL.split("?")[1];
		tid=0;
		if (params != null ) try {tid=params.split("=")[1].split("&")[0];} catch (e) {alert('tid '+ e.message);}
		
		// Erzeugen eines Objektes, das die Signatur ändert
		elem = document.createElement("input");
		elem.setAttribute("value", "IP-Signatur ändern");
		elem.setAttribute("class", "button");
		elem.setAttribute("type", "button");
		elem.addEventListener("click", change, false);
		ort.appendChild(elem); 
		
		// Signatur herausfinden und einfügen
		for (var i = 0; i < sig_trd.length; i++)
			if (sig_trd[i] == tid) 
				signatur = sig_txt[i];
		
		insert_sig();
	} start();
	
	// Prüfen, ob das Textfeld ersetzt wurde
	window.onload = function() {
		if(document.getElementById('message_new') != null) {
			insert_sig();
		}
	}
}