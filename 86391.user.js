// ==UserScript==
// @name           Geburtstagskalender und Wohnorte exportieren
// @namespace      http://userscripts.org/scripts/show/86391
// @description    Mit diesem Script kann man einen Geburtstagskalender im iCal-Format generieren und sich die Wohnorte sämtlicher Freunde auf Google Maps anzeigen lassen.
// @include        http://www.studivz.net/Home*
// @include        http://www.meinvz.net/Home*
// @include        http://www.schuelervz.net/Home*
// ==/UserScript==
//
// By: Martin Pietschmann 'Schirkan'
// Email: schirkan86@gmx.de
// Modified By: Stefan Wienert 'TheLord'
// Email: stefan@wienert.cc
// Modified By: Kevin Heilmann 'LohoC'
// Email: me@LohoC.com
// Last Update:  23.09.2010

(function() {
	
if (self != top) { return; } // Don't run in frames

// Hilfsfunktion von http://wiki.greasespot.net/Code_snippets#Embed_a_function_in_the_current_page
function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

//------------------------------------------------------------------------------------------
// Variablen definieren

var ical_img = '<img style="margin-bottom:-3px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGBSURBVHjaYvz//z8DJYARRCzYsuk/iAU2CkQwAon/jAyMUBpixX+IYkaIxgRvf0aQ5SxzN679f4bXiWSb525YC7aK5ffP3wzz931gSPEVAFnGMO8GN0OS5leGWVv+4dTM9OsnQ5/+bzCb5c/vXwx//4oyzNwAk/7FMOs6K17b/zGwM/z5+QtqwM8fDN+a2Ej2wqQFPyEG/IaaxAgKRKQI2X38HE7NrpZGDL9+Qgxg+g1k/ANq/AvE/5AwCLhZGTGI79vD4FZVxGCak8bg9vQuxAtAeZDLwS4AmfTnLwPDwdOYNu46do7BdN0qhtPJ6WC+SnsnA8OUWWD1v5Fd8AdqJchGbLSpjhqYFuTjAdMg9b+QAxFkIsxGdFo8KIyBobCYQQXIvwhigwwAuwDiBSZQNP7+j9sFL51cGATPnWE4DXS6dGEJg5G+AVj931+wdABk/MXjAmQapg4Efv+GeeHPb3Co6mgbwJI57gSEFM1//0Bd8A/ooeaKdPJzI6XZGSDAAArcz3WeOBx6AAAAAElFTkSuQmCC" width="16" height="16">';
var map_img = '<img style="margin-bottom:-3px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAL3SURBVDiNlZNLaFRnGIbf/z//OWdm/jlzOZlmMkkwaY2XUpVAA7ZFFLX1QlFolkXB0rhQQRDclEJButVFEZdKdaW0QbQgWF0UL6GK9RKJdWGlSWaSSTIzZy5nzv2cv4viYIou+sK3+96Hl+/jJUIIvE2E7B5CMs1gXnophPDeuPNfABn8qmfH3pGjm9b17hx6b7DAtRQ1Lav6YOrFrQs3Hp+uXDnxbJlBCNEZsv7Lzw5/f7bx6PmMqBpNYVqOsBxPNFptMbtQExeu/S62HP7h0DLPqwSksOuDsSP7Hh/bv5PJiRTmpv9CGPhQFAWyoiDBORIxFdcnnuL0xd9G//zpu8sAwF4lGd666cftmzeyYt1F8Y+7sFoNMEVGIqlhxbsD8G0PpZqJbj2Fob7sWaJ+el24Ny0GAMrK3Rs+3zc2Uqsu4vaN+yAsAVnlUFQV3b1pJByKpXIZju0AAAq5dLZvy/BeABcZAGh65qOpezfhzeVBlTQyuSQSEkckq+hdvQo8HYcVCVSmyyjNlCDLMtYP9XzSAcTiXGcxDSy/BrJEIXgc8XdyUFQF5baPdJzCiyIYToDpShv9KQmDha5s5wZ226xu2LwH748MI6MRtEwTqsogSRTNlo07lToIEXB9AduLkOEcgR0aAED/faV6L/JDGJU6/p6pw/Uk1AwfAIWuc2QyHCIEHDcCCEU2xfFydnGiAzAenp+sLc4+rFWqWKqYKBYNzM030dWVhKbFEY+rIJTCbHsYyGuwHb9+9cz5XzoAAJCJeaBuVKOFRRPFWQNrV+rQuzgkJoFSigRX0JPn6NWTePKifFCIyfYywMS5b5/KcrgtJgdL/Ssy6C6k0GzYsCwXQRghEgQxmXmlqvX11ZNjPy/rwvj4OA2CQBvOufKvM+zDRnLgG8IzHzNVUYQAfNcNA7M5qbQWTn2Rn7825eQiSWKt0dHRiL3WB/KgLGl9MX++v3H/eLnCCzbTdBAQLbTqedIsMa5Zj5rpLKVhjRD65jb+X/0DuIFapancfX4AAAAASUVORK5CYII=" width="16" height="16">';
var list_img = '<img style="margin-bottom:-3px" src="data:image/gif;base64,R0lGODlhEAAQAMQAAAAAAP///2VlwWdnw7K0sYuNiIiKhbO0sfHx4/T05/Pz5vPz5/Ly5vHx5fX16vT06fb27PT06vf37vb27fX17Pn58fj48Pb27vn58vf38Pr69P7+/v///wAAAAAAAAAAACH5BAEAABwALAAAAAAQABAAAAVqIHcYZGmSB8cZQeu+baGyWm3fm7wG2uD/Pk1uxrMYj0ahjnZrDnc2gVSgwVSezKbVguXdtpJLtzaYSieQMUaCdjwSjkgXPJlQIu+uJXMxJxYMXWwQCgwNCIYIXRuMjY4BOgcFk5SVkwQcIQA7" width="16" height="16">';
var download_img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAn3SURBVHja1FprjF1FHf/9Z8597e3udreh3RYaIqGg1g+aSPWb8SuxMfggMcYvfmhiYozGR4xV+sVHNBC+oBJZFVSIEIMIPggI+MVXlWjFpqAFKmVLabu77N7de/fee84Z/3POzDkzc+/efZA06Wn+e86dM2fm/35NSSkFIkJw6QHBIBkicxdm/HJdiiFlSBhic0/NeIloQIBFvMJQZ2gwjDHUDCHiMhKQGsS7DG2GDsMaQ98lxCWADJIa2XGGqe/e/K6T1181hXqz7pNtLyF9sRUyohxcyVJOe7ZXIPFiGZHPYZQgBWHutYv46L1PH+ahRQdahihNnHIJkIbjk7fffNOrH752ByZnZhAlXUaFSuURkYMUeY8kVPagqFJqG/kUUkSenuq/JGW+FKmSWB6Ioyo6C8v460uv4wOzj3+I35xleI1hyUgksQSQ4fzUj245dO5j7zmATqeH3sI8VBxnLCHmSMYh5aio2UhDIUSyhJlx4VCgvycH9ZzqnDBh1hT5mtkKkYQc34nG9C78+R+n8L47f/VxHv4Pw5yRRteyUxidn/rgwavRXumge+F11jRVskrxlCR1mClyu6IcaWU5bBHW4/ysYme+SkvioCWl5/MYQzYvm6MZk89TvQRqcR6dNMF7D16nl7nBcN7aRN8aZaY+D9zy7pPVsR3ozs8zbqrkLovYPudcFQWCGWTPshwnIy0rBSnKeVZqWm0iM478N2QuIc0E/Y3dN15Zztb/+1duPcaTr9aMNuourQT0feztTYF+h4lL4tIGhe94yCGk0O+Q865tCGe+VR1ttYFq5fMMzXZP+w3zsrfWwTUiE+eMIUB7x6XIkUBtes9VUElcilzQOsjD13X9t9djDdGcU8Y8zLfSSkKU2lojs6UxWFEyo3DpZu3sN09JGa+d+/bqN5MMTWOz0rWBKGWkFRwOhMgLo+yuOvG/NE1xqXkN6zRpv2xWJJ8BJHNC2DB39hdRZS+oMhUpBUbCjZVahcyzypkiaxrnzFarNi5FQQDLnTKV8a7giPUgZBa3kmDkU14z+tQ3eNlavtmo6MRbpg98E7jwPCM4Zgjw1axglt1OyiI0h5lBNITV+czMdQqHPeX7AnmzKZODA2+51lGT0ddCtcI+QuU8CfWd4EiOHM9EA4ETg6kB+YQU3A8MlAYDmer3N53g6NijrBTDsFaoL5XPmT0OZ44vAaODZKkukHdES37YB20vvyu9U+5D8jTE8VII9lknj4zW38Hx8VZtELhVG2kVbRF5mzoYxkjy3vmGn6uz2hQByvp+a8UjkLdcTGnrWbYNaK6ahN7PlXAR4ORoArQPJ51QmdSBitzFR94LcDqIQW5dh3TwkmI45+2zIEettItXG0jAUgvXZYZq4yNf5jfbvwrkM9sL3LZx5ZQFPLmRDWgq5aD/d0VcZJ0mIcu+2XydowyHNUJErpsWvhv1IjOt6zB8FSq80BDkZeiv83RAyHjD4DXI8jDGCN9lW7Wx4yPWj9aRqR8SpPCqKhu4MyeRii17IS9/sOmDcAJZmFYU2a3aBAGO+DzPYDYUcR8Ux8WYykqCZEvoy/4aVHs1L8DIxACu1NJq3Xi9QeRVphlyE0ZsidSpRCQH0tr5PW9Dq7kbxNmhytIBQsQb79JeZTPOh+H8voNo0Tgq9bHse53r1JkTu5ZeZISSvBAqksY839qkClFpA2Rydn1XeRNAccpcZe7svfUIahPTPJxkRiY08lG0aQnMHP4Eprm6EybGJLKC1dmj6P/tMSS8LmqTEGMNiOYU33dw1lrNuT8k1xpIJagagSpVLvG6SNd6XPszp9uLSHqrSFfaEMf/gDqnw9NH7xsZyEddk/Wq93v19w8h/vWdXKKwGi2xaolzXK0zYVlniqU0sRuV/VxN1q/fKJDxz7UVxOdeRtJeQtpu8e81JzNkaFRw6dH7IW68CTs/8uk33fxpn/43lma/xHiyLdRrnupr30CqzXXxi4jVecT9c6MJiM/+E73ORfTmFk3aLweCh6gQ6rzZ/N3HIN96COPvOLRt5HsrK3jjrs+CWmdBOycdD0SlQ9KUsIFTVGHpnB6dTqfzLyPtruSS0DCkAZUF63qESncBre98Esnihe213disln94G3DqKYjJcSdl92uP0jNop1LboB5gIxFDXFURxZ2F5cQY4pdOYv6uL0J121tXnd/OovfkPZBTE4V7pKKPZDsb7p4Y1sMdLGgoCBh51eQvBGGJaKD71E+x+Juf5V3YOGGIR4Ke13ruOFo/+Spkg7laiYpWCpy638OsMAhslEqQn1rLYCEvR2Go8IRGFas/+ALq1x2AfOf7kXY668YDqjVAF+fQ/t5ngM48aHKiRB7D1AZl10/QunHFS7WsCCl0u7I0LB187KaC61uRtrFwx+fQPXMaMdtOnzk9AMyQmL3a8j1Hkb7yLCTrPQm39WgbZT7DisrNzZ1G2UBhrCHyRR0Q6CVvIJsN4OwJtGZvQ7+1jH6q0Oca2QPWnZWHv4/4Lz9n5Js+sqG+u80DuBq9EQFCub0qr6Cn0JCodHe6hoimGanjD6H/2CwHoAr77H7WL9KQVBtInn0GySN3cGStAKz3ficPA/mXr1ajU5PBOth+JcnzzRZ5XcOWKbfxHpxKRON19H95O7p/ehwx62DMqYfuA8X/+y+697HRYpkjfbXUhBB520cNEZa0SQIKL0NZ68jW3cIlxF1MmMzRDnGwiRQjef/XQHOnkdbY1a60oB78FioX/wXSquZ1rwPkQ0Mlg7zO7Gx7f7QEBu/uokO9BfmrUZNzl0ungAe/jajNudPv7oU48Sh7nHG/KBLr6LurumFvVq5fkWUHakpbWlU6TWca/DgI957UjKHoyJq88DTw489DPf9HyB0Vk5oPGqvXOBihMpr4uN1DeOAn3AO1tTfSPLA47i3v1fuHFp6euv0jk4prZKMmI/zcI2zfy/mabwZ5nhdxzFlczAonnV32DCGpJUC/6R58cuVwg1NaUZN5QUOBWoXh3LpCokGpaELGmnmdMETfw8rPa2F6jTORFzzsvfbf/coT5nxs1Rz0JZaA2BzbLF681MXYXtbjeuRXaFZPVdgXpaIHVihjSKj7zh3K2ubKnI2ZZloxZpBnaVZ3jaPdzz7WB3znzfmYxje2h3zSHK3uY7jxzJE9D+/mlLnT6rFepU4LPEgpnMMIokAqtj0v5fD+cSSHd+xcAx2rocL1h6pUsOPLJ37BQycZTjC8wKCLg9bAKaU5g9KHaTe8emTm2HQt845OMKTBA5AioDknL46nKokPUgcPYZWfAzjp83JbYPrrp54wnD9jTii9U8qh58QM+ixnvyFmxozVt11Dbu+KjcEuGbWZG3VOPPSk3oGmOdaRl5GAxHib1c2e1F/x/1fiivzfKllz6kq+/i/AAHNz/6Zlqe8aAAAAAElFTkSuQmCC" width="48" height="48">';
var refresh_img = '<img style="margin-bottom:-3px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAACXBIWXMAAAsSAAALEgHS3X78AAAACXRFWHRDb21tZW50AACJKo0GAAABgElEQVR4nJVSWUsCURgVe/Jf+XcqLSVTbKGoKIsWtUUHUwzLdUhybRyXYUjNhQRNUOjB137F6RsJQ0cbffiG4XLuWb57VABU0qgUflqtD3S7nxgdnJ3aOIvZhDHo6EqhkNf2ej2k06k/hMfDsGOkfr8PhnW9MJUjkXhpj3FKn0wmPYjHn4ecXq+n7XTY1TLDbvcdH4mEcHR4gEqlDKNhjZFJmDc3ojLbkweKAPIiyAA8n2v2+31IC+h02qDcX2MAioZYLCL+mhUvL841i3tg2RhsJ8fw+e4RCj1BBggEHrCzbYVpwwjd6rJWBtiyWpbmijk52Wwmmkwmpl6WERSLBW0+zwsc9wp6P0jpS6UiqCMIBh+5fwlyOY5pNhuQ9ikIJUihw+EgyAFSqSQYxsXPHYHURpZdrlvWYb+aLwJtUkNrVpOaeHPtHPWSGibu7+2CFgkq1GAmAal9S9YbjTrq9RpqtXdUqxWUy2/DSFTRpl63olWMQGoCqbVn2V7oGZXmB0n65g75Phe+AAAAAElFTkSuQmCC" width="16" height="16">';

var api_key_studivz = "ABQIAAAA4bShINV7umDlQjxldaWRBxQQGc1ofqfciWaMgymx7r9udcaUdhS4pkyjaFxPHTrpHv5iuT8TVyeZHQ";
var api_key_schuelervz = "ABQIAAAA4bShINV7umDlQjxldaWRBxTh-thynXzshJZnQtHnPWtHIAb_ERRIZQWVb77ffT-GiUzbZbFOrIEYGA";
var api_key_meinvz = "ABQIAAAA4bShINV7umDlQjxldaWRBxSNANJ_BM9LTEsAmeRqXuaasKLfjhTzbF1He_sNIGIlFr6VnjQTod0AbQ";
var api_key = '';

var profil_id = '';

var freunde = null;
var freunde_namen = null;
var freunde_data = null;
var geocode_cache = null;

var dialog = null;
var uw = null;
var options = null;

var busystatus_MS = new Array('FREE', 'TENTATIVE', 'BUSY', 'OOF');
var busystatus_iCal = new Array('TRANSPARENT', 'OPAQUE', 'OPAQUE', 'OPAQUE');
var busystatus_Text = new Array('Frei', 'Mit Vorbehalt', 'Beschäftigt', 'Abwesend');

var alarm_trigger_min = new Array(-1, 0, 720, 1440, 2880, 4320, 5600, 10080, 20160);
var alarm_trigger_Text = new Array('Ohne', '0 Minuten', '1/2 Tag', '1 Tag', '2 Tage', '3 Tage', '4 Tage', '1 Woche', '2 Wochen');

//------------------------------------------------------------------------------------------

var init_status = false;

function init() {
	if (init_status) return;

	uw = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	
	// Google Maps API-Key festlegen
	if(location.host == 'www.studivz.net') {
		api_key = api_key_studivz;
	} else if(location.host == 'www.schuelervz.net') {
		api_key = api_key_schuelervz;
	} else if(location.host == 'www.meinvz.net') {
		api_key = api_key_meinvz;
	} else {
		return;
	}
	
	// Eigene Profil-ID feststellen
	profil_id = document.evaluate('//ul[@id="Grid-Navigation-Main"]/li[2]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).wrappedJSObject;
    profil_id = profil_id.singleNodeValue.href;
    profil_id = profil_id.substring(profil_id.indexOf('Profile/')+8, profil_id.length - 8);

	// Daten laden
	load();
	
	// Funktionen einbinden
	embedFunction(hide_status_loading);
	embedFunction(show_status_loading);
	
	init_status = true;
}

//------------------------------------------------------------------------------------------

function init_options() {
	options = new Object();
	// Array-Index für die Erinnerungszeit
	options['alarm_trigger'] = 3; // 1 Tag
	// Array-Index für den Buchungsstatus
	options['busystatus'] = 0; // Frei
	// Text in der Betreffzeile
	// false = 'Name'; true = 'Geburtstag von Name'
	options['title_prefix'] = false;
	// false = 'Name'; true = 'Name (Geburtsjahr)'
	options['title_suffix'] = true;
}

function init_freunde() {
	init_daten();
	freunde = new Array();
	freunde_namen = new Object();
	setInnerHTML('status_freunde', 'keine Freunde geladen');
}

function init_daten() {
	init_geocodes();
	freunde_data = new Array();
	setInnerHTML('status_daten', 'keine Daten geladen');
}

function init_geocodes() {
	setInnerHTML('status_geocodes', 'keine Daten geladen');
}
/*
function init_geocode_chache() {
	geocode_cache = new Object();
	GM_setValue('geocode_cache', JSON.stringify(geocode_cache));
}
init_geocode_chache();
*/
//------------------------------------------------------------------------------------------

function load() {
	freunde = eval('(' + GM_getValue(profil_id + '_freunde') + ')');
	freunde_namen = eval('(' + GM_getValue(profil_id + '_freunde_namen') + ')');
	if (typeof(freunde) != 'object' || typeof(freunde_namen) != 'object') init_freunde();

	freunde_data = eval('(' + GM_getValue(profil_id + '_freunde_data') + ')');
	if (typeof(freunde_data) != 'object') init_daten();

	geocode_cache = eval('(' + GM_getValue('geocode_cache') + ')');
	if (typeof(geocode_cache) != 'object') geocode_cache = new Object();

	options = eval('(' + GM_getValue(profil_id + '_options') + ')');
	if (typeof(options) != 'object') init_options();
}

function save() {
	GM_setValue(profil_id + '_freunde', JSON.stringify(freunde));
	GM_setValue(profil_id + '_freunde_namen', JSON.stringify(freunde_namen));
	GM_setValue(profil_id + '_freunde_data', JSON.stringify(freunde_data));
	GM_setValue('geocode_cache', JSON.stringify(geocode_cache));
}

function save_options() {
	GM_setValue(profil_id + '_options', JSON.stringify(options));
}

//------------------------------------------------------------------------------------------

function setInnerHTML(id, text) {
	var obj = document.getElementById(id);
	if (obj != undefined) obj.innerHTML = text;
}

function set_statusbar(x, max) {
	if (x > max) x = max;
	var statusbar = document.getElementById('statusbar');
	var percent = x / (max / 100);
	if(statusbar != undefined) statusbar.style.width = percent+'%';
}

function show_status_loading() {
	document.getElementById('status_loading').style.display = 'block';
	document.getElementById('export_area').style.display = 'none';
	document.getElementById('import_area').style.display = 'none';
}

function hide_status_loading() {
	document.getElementById('status_loading').style.display = 'none';
	document.getElementById('export_area').style.display = 'block';
	document.getElementById('import_area').style.display = 'block';
}

function get_map_frame() {
	for (var i = 0; i < window.frames.length; i++) {
		if (window.frames[i].name == 'mapframe') return window.frames[i];
	}
	return null;
}

//------------------------------------------------------------------------------------------

function parseProfilseite(text) {
	var data = new Object();
	var regex = /<dt>([^<]*):<\/dt>[^<]*<dd>(.*?)<\/dd>/g;
	text = text.replace(/\n/g, '');

	var Ergebnis;
	var match;
	
	while (match = regex.exec(text)) {
		var key = match[1];
		var value = match[2].replace(/<.[^<]*>/g, ' ').replace(/\s+/g, ' ').replace (/^\s+/, '').replace (/\s+$/, '');
		data[key] = value;
	}
	return data;
	
	Ergebnis = text.match(regex);
	if (Ergebnis) {
		for (var j = 0; j < Ergebnis.length; j++) {
			match = regex.exec(Ergebnis[j]);
			if (match != null) {
				var key = match[1];
				var value = match[2];
				value = value.replace("\n", '').replace(/\s+/g, ' ').replace (/^\s+/, '').replace (/\s+$/, '').replace(/<+/g, '&lt;').replace(/>+/g, '&gt;');
				data[key] = value;
			} else {
				console.log(Ergebnis[j]);
			}
		}
	}
	return data;
}

function parseMeineFreunde(d) {
	var table = d.getElementsByTagName('tbody');
	if (table.length == 0) return false;
	var friends = table[0].getElementsByTagName('tr');
	for (var i = 0; i < friends.length; i++) {
	if  (typeof friends[i].childNodes[1].childNodes[1] != 'undefined') {
			
			var url = friends[i].childNodes[1].childNodes[1].href;
			
			var id = url.substring(url.length-43, url.length);
			//Geht nur im StudiVZ
			
			var name = friends[i].childNodes[1].childNodes[1].childNodes[1].alt;
		
			freunde_namen[id] = name;
			freunde[freunde.length] = id;
		}
		
	}
	
	return true;
}

function parse_date(str) {
	str = ' ' + str.toLowerCase() + ' ';
	var m;
	var date = new Date();
	if (str.indexOf('morgen')!=-1) { date.setDate( date.getDate()+1 ); }
	else if (str.indexOf('heute')==-1) {
		if (m = str.match(/\s(\d+)\s/)) { date.setDate( date.getDate() + parseInt(m[1]) ); }
		if (m = str.match(/(\d+)\.(\d+)\.(\d+)/)) {
			date.setDate(m[1]);
			date.setMonth(m[2]-1);
			date.setYear(m[3]);
		}else if (m = str.match(/(\d+)\.(\d+)/)) {
			date.setDate(m[1]);
			date.setMonth(m[2]-1);
		}
	}
	return date;
}

//------------------------------------------------------------------------------------------

function generate_ical_date(date) {
	var month = date.getMonth()+1;
	if (month<10) { month = '0' + month; }
	var day = date.getDate();
	if (day<10) { day = '0' + day; }
	return '' + date.getFullYear() + month + day;
}

function generate_ical_alarm(min) {
	if (min < 0) return '';
	var ical = 'BEGIN:VALARM%0D%0A';
	ical += 'TRIGGER:-PT' + min + 'M%0D%0A';
	ical += 'ACTION:DISPLAY%0D%0A';
	ical += 'DESCRIPTION:Reminder%0D%0A';
	ical += 'END:VALARM%0D%0A';
	return ical;
}

function generate_ical_event(date, text) {
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	
	var now = new Date();
	if (month <= now.getMonth()+1 && day < now.getDate()) date.setYear(now.getFullYear() + 1);
	else date.setYear(now.getFullYear());
	
	var datum_start = generate_ical_date(date);
	date.setDate(day+1);
	var datum_end = generate_ical_date(date);
	var datum_now = generate_ical_date(now);
	
	var title = text;
	if (options['title_prefix']) title = 'Geburtstag von ' + title;
	if (year < now.getFullYear() && options['title_suffix']) title += ' ('+year+')';
	
	var ical = 'BEGIN:VEVENT%0D%0A';
	ical += 'SUMMARY:' + title + '%0D%0A';
	ical += 'DESCRIPTION:%0D%0A';
	ical += 'DTSTART;VALUE=DATE:' + datum_start + '%0D%0A';
	ical += 'DTEND;VALUE=DATE:' + datum_end + '%0D%0A';
	ical += 'DTSTAMP:' + datum_now + 'T120000Z%0D%0A';
	ical += 'UID:' + datum_start + text + '%0D%0A';
	
	// Serientermin
	ical += 'RRULE:FREQ=YEARLY;BYMONTHDAY=' + day + ';BYMONTH=' + month + '%0D%0A';
	
	// Buchungsstatus
	ical += 'X-MICROSOFT-CDO-BUSYSTATUS:' + busystatus_MS[options['busystatus']] + '%0D%0A';
	ical += 'TRANSP:' + busystatus_iCal[options['busystatus']] + '%0D%0A';
	
	// Alarm
	ical += generate_ical_alarm(alarm_trigger_min[options['alarm_trigger']]);
	
	ical += 'END:VEVENT%0D%0A';
	return ical;
}

function ical_export(events) {
	var ical = 'BEGIN:VCALENDAR%0D%0A';
	ical += 'PRODID:StudiVZ Geburtstagskalender%0D%0A';
	ical += 'VERSION:2.0%0D%0A';
	ical += 'METHOD:PUBLISH%0D%0A';
	for (var i=0; i<events.length; i++) {
		ical += events[i];
	}
	return ical + 'END:VCALENDAR';
}

function generateCalendar() {
	var events = new Array();
	for (var i = 0; i < freunde.length; i++) {
		var data = freunde_data[i];
		if ( data['Geburtstag'] == undefined ) continue;
		var bday = parse_date( data['Geburtstag'] );
		var id = freunde[i];
		events[events.length] = generate_ical_event(bday, freunde_namen[id]);
	}
	location.href = 'data:text/calendar;charset=US-ASCII,' + ical_export(events);
}

//------------------------------------------------------------------------------------------

function ermittle_freunde(seite, max) {
	if (seite == 1) {
		init_freunde();
		setInnerHTML('status_freunde', 'Freunde werden geladen');
		set_statusbar(0, 1);
		setInnerHTML('statustext', 'Beginne mit dem Parsen der Freundesliste.');
		show_status_loading();
	}
	GM_xmlhttpRequest({
		method:"GET",
		url:'http://'+location.host+"/Friends/Friends/"+profil_id+"/p/"+seite,
		headers:{
			"User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
			"Accept":"text/xml"
		},
		onload:function(response) {
			var input = document.createElement('div');
			input.innerHTML = response.responseText;
			
			if (seite == 1) {
				// maximale Seitenzahl ermitteln
				var links = input.getElementsByTagName('a');
				for (var i = 0; i < links.length; i++) {
					if (links[i].className == 'pager') max = parseInt(links[i].title);
				}
				links = null;
			}
			
			setInnerHTML('statustext', 'Parse Seite ' + seite + ' von ' + max);
			set_statusbar(Math.ceil(freunde.length / 15), max);
			
			parseMeineFreunde(input);
			input = null;
			
			if (seite == 1) {
				for (var i = 2; i <= max; i++) {
					ermittle_freunde(i, max);
				}
			}
			
			if (max == 1 || Math.ceil(freunde.length / 15) == max) {
				set_statusbar(1, 1);
				setInnerHTML('statustext', 'Parsen der Freundesliste ist abgeschlossen!');
				setInnerHTML('status_freunde', freunde.length + ' Freunde geladen');
				
				for (var i = 0; i < freunde.length; i++) {
					ermittle_daten(i, freunde[i]);
				}
				
			}
		}
	});
}

function ermittle_daten(nr, id) {
	if (nr == 1) {
		init_daten();
		setInnerHTML('status_daten', 'Daten werden geladen');
		set_statusbar(0, 1);
		setInnerHTML('statustext', 'Parse die Profilseiten.');
		show_status_loading();
	}
	GM_xmlhttpRequest({
		method:"GET",
		url:'http://'+location.host+"/Profile/"+id,
		headers:{
			"User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
			"Accept":"text/xml"
		},
		onload:function(response) {
			//setInnerHTML('statustext', 'Parse Profilseite von ' + freunde_namen[id]);
			freunde_data[nr] = parseProfilseite(response.responseText);
			set_statusbar(freunde_data.length, freunde.length);
			
			if (freunde_data.length == freunde.length) {
				set_statusbar(1, 1);
				setInnerHTML('statustext', 'Sammeln der Daten ist abgeschlossen!');
				setInnerHTML('status_daten', 'Daten geladen');
				ermittle_geocodes(1);
			}
		}
	});
}

function ermittle_geocodes(nr) {
	if ( nr == 1 ) {
		setInnerHTML('status_geocodes', 'Daten werden geladen');
		set_statusbar(0, 1);
		setInnerHTML('statustext', 'Ermittle die Koordinaten zu den Wohnorten.');
		show_status_loading();
	}
	if ( nr >= freunde.length ) {
		set_statusbar(1, 1);
		setInnerHTML('statustext', 'Vorgang abgeschlossen.');
		setInnerHTML('status_geocodes', 'Daten geladen');
		save();
		window.setTimeout("hide_status_loading()", 1000);
		return;
	}
	set_statusbar(nr, freunde.length);
	
	var data = freunde_data[nr];
	var adresse = '';
	if (data.Anschrift != undefined) adresse += data.Anschrift + ', ';
	if (data.Wohnheim != undefined) adresse += data.Wohnheim + ', ';
	if (data.Ort != undefined) adresse += data.Ort + ', ';
	else if (data.Region != undefined) adresse += data.Region + ', '; // entweder Ort, oder Region
	if (data.Land != undefined) adresse += data.Land;
	adresse = adresse.replace(/\n+/g, '').replace(/\s+/g, ' ').replace (/^\s+/, '').replace (/\s+$/, '').replace (/,$/, '').replace(/\( seit \d{4} \)/g, '');
	
	freunde_data[nr]['adresse'] = adresse;

	if ( adresse == '' ) {
		ermittle_geocodes(nr + 1);
	} else if ( geocode_cache[adresse] != undefined ) {
		// aus dem Cache laden
		freunde_data[nr]['geocode'] = geocode_cache[adresse];
		ermittle_geocodes(nr + 1);
	} else {
		// neu laden
		GM_xmlhttpRequest({
			method:"GET",
			url:'http://maps.google.com/maps/geo?output=csv&key='+api_key+'&q='+escape(adresse),
			headers:{
				"User-Agent":"Mozilla/5.0",
				"Accept":"text/xml"
			},
			onload:function(response) {
				if ( response.status == 200 && response.responseText.substr(0, 3) == '200' ) {
					freunde_data[nr]['geocode'] = response.responseText;
					geocode_cache[adresse] = response.responseText;
				}
				ermittle_geocodes(nr + 1);
			}
		});
	}
}

//------------------------------------------------------------------------------------------

function showMenu() {
	init();
	
	var text = '<b>Daten einlesen:</b><br>';
	text += '<div id="status_loading" style="display:none;">';
	text += 	'Freundesliste<b id="status_freunde" style="float:right;"></b><br>';
	text += 	'Daten zu allen Freunden<b id="status_daten" style="float:right;"></b><br>';
	text += 	'Geocodes zu allen Wohnorten<b id="status_geocodes" style="float:right;"></b><br>';
	text += 	'<hr style="color:#f00">Status: <b id="statustext"></b><br>';
	text += 	'<div align="left" style="width:100%; height:16px; background:#666; padding:1px">';
	text += 		'<div id="statusbar" style="width:0%; height:100%; background:#f00;"></div>';
	text += 	'</div>';
	text += '</div>';
	text += '<div id="import_area">';
	text += 	refresh_img+' <a style="line-height: 2;" id="link_refresh" href="javascript:;">alle Daten neu laden</a><br>';
//	text += 	refresh_img+' <a style="line-height: 2;" id="link_refresh_geo" href="javascript:;">nur die Koordinaten zu den Wohnorten neu laden</a><br>';
	text += '</div>';
	text += '<div id="export_area" style="display:none;">';
	text += '<hr style="color:#f00"><b>Daten exportieren:</b><br>';
	text += ical_img+' <a style="line-height: 2;" id="link_export_ical" href="javascript:;">Geburtstage als iCal-Kalender exportieren</a><br>';
	text += map_img+' <a style="line-height: 2;" id="link_export_map" href="javascript:;">Wohnorte aller Freunde in Google Maps anzeigen</a><br>';
	text += list_img+' <a style="line-height: 2;" id="link_export_table" href="javascript:;">Tabelle mit allen Freunden anzeigen</a>';
	text += '</div>';
	text += '<a id="close_gui" href="javascript:;" style="float:right;font-weight:bold;">[Schließen]</a>';

	dialog = uw.Phx.UI.Dialog.ButtonDialog(
        'Geburtstagskalender und Wohnorte exportieren',
		{
			'message' : text,
			'buttons' : []
		}
	);
	dialog.show();
	
	document.getElementById('link_refresh').addEventListener('click', function(){
		ermittle_freunde(1);
	}, false);
//	document.getElementById('link_refresh_geo').addEventListener('click', function(){
//		ermittle_geocodes(1);
//	}, false);
	
	document.getElementById('link_export_ical').addEventListener('click', function(){
		dialog.close();
		showIcal();
	}, false);
	document.getElementById('link_export_map').addEventListener('click', function(){
		dialog.close();
		showMap();
	}, false);
	document.getElementById('link_export_table').addEventListener('click', function(){
		dialog.close();
		showTable();
	}, false);
	
	document.getElementById('close_gui').addEventListener('click', function(){
		dialog.close();
	}, false);
	
	if (freunde.length > 0) {
		setInnerHTML('status_freunde', freunde.length + ' Freunde geladen');
		setInnerHTML('status_daten', 'Daten geladen');
		setInnerHTML('status_geocodes', 'Daten geladen');
		document.getElementById('export_area').style.display = 'block';
	}
}

//------------------------------------------------------------------------------------------

function showMap() {
	var text = '<iframe name="mapframe" id="mapframe" width="100%" height="350" scrolling="no" frameborder="0"></iframe><br>';
	text += '<a id="googlemaps_close_gui" href="javascript:;" style="float:right;font-weight:bold;">[Schließen]</a>';
	
	dialog = uw.Phx.UI.Dialog.ButtonDialog(
		map_img+' Wohnorte deiner Freunde',
		{
			'message' : text,
			'buttons' : []
		}
	);
	dialog.show();

	document.getElementById('mapframe').addEventListener('unload', function(){
		GUnload();
	}, false);
	document.getElementById('googlemaps_close_gui').addEventListener('click', function(){
		var obj = document.getElementById("mapframe");
		obj.parentNode.removeChild(obj);
		dialog.close();
		showMenu();
	}, false);

	var mapframe = get_map_frame();
	mapframe.document.write('<head>');
	mapframe.document.write('<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key='+api_key+'" type="text/javascript"></script>');
	mapframe.document.write('<script type="text/javascript">'+addMarker.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')+'</script>');
	mapframe.document.write('</head>');
	mapframe.document.write('<body marginwidth="0" marginheight="0" topmargin="0" leftmargin="0">');
	mapframe.document.write('<div id="map" style="width: 100%; height: 100%;"></div>');

	var script = 'var map = new GMap2(document.getElementById("map")); ';
	script += 'map.addControl(new GLargeMapControl()); ';
	script += 'map.addControl(new GMapTypeControl()); ';
	script += 'map.setCenter(new GLatLng(51.1656910,10.4515260), 5); ';

	var marker = new Object();

	for (var i = 0; i < freunde.length; i++) {
		var data = freunde_data[i];

		if ( data['geocode'] == undefined ) continue;

		var id = freunde[i];
		var name = freunde_namen[id].replace(/'+/g, '').replace(/\n+/g, '');
		var adresse = data['adresse'].replace(/'+/g, '');
		var geocode = data['geocode'].split(',');

		var m = new Object();
		m['id'] = id;
		m['name'] = name;
		m['adresse'] = adresse;
		m['zoom'] = geocode[1];
		m['status'] = geocode[0];
		m['lat'] = geocode[2];
		m['lng'] = geocode[3];

		if (m.status == '200') {
			if (marker[m.lat+'||'+m.lng] == undefined) marker[m.lat+'||'+m.lng] = new Array();
			marker[m.lat+'||'+m.lng].push(m);
		}
	}

	// alle Positionen durchlaufen
	for (var pos in marker) {
		var marker_array = marker[pos];
		var adresse = '';
		var name = '';
		var zoom = '';
		var lat = '';
		var lng = '';

		for (var i = 0; i < marker_array.length; i++) {
			if (i == 0) {
				adresse = marker_array[i].adresse;
				zoom = marker_array[i].zoom;
				lat = marker_array[i].lat;
				lng = marker_array[i].lng;
			}
			name += '<a href="http://www.studivz.net/Profile/'+marker_array[i].id+'" target="_blank">'+marker_array[i].name+'</a><br>';
		}

		script += "addMarker('"+name+"', '"+adresse+"', "+zoom+", "+lat+", "+lng+"); ";
	}

	mapframe.document.write('<script type="text/javascript">'+script+'</script>');
	mapframe.document.write('</body>');
}
	var data_fields = new Array('Name', 'Mitglied seit', 'Beziehungsstatus', 
	'Hochschule', 'Status', 'Studiengang', 'Studienrichtung', 'Geschlecht', 'Geburtstag', 
	'Heimatort', 'Heimatland', 'Letzte Schule', 'ICQ', 'Skype', 'AIM', 'Jabber', 'MSN/Windows Live-ID', 
	'Handy', 'Telefon', 'Anschrift', 'Wohnheim', 'Zimmer Nr.', 'Region', 'Wo genau', 'Ort', 'Land', 
	'Webseite', 'Auf der Suche nach', 'Politische Richtung');
	
	// 'Verzeichnis', 'Lieblingszitat', 'Lieblingsfilme', 'Lieblingsbücher', 'Musikgeschmack', 'Interessen', 'Über sich selbst', 'Was er da macht', 'Bisherige Karriere', 'Clubs, Vereine', 'adresse', 'geocode'

function generateTable() {
	var selected_fields = new Array();
	for ( var i in data_fields ) {
		if ( document.getElementById('field_'+i).checked ) selected_fields[selected_fields.length] = data_fields[i];
	}

	var text = '<table width="100%" border="1"><tr>';
	for( var i in selected_fields ) {
		text += '<th>'+selected_fields[i]+'</th>';
	}
	text += '</tr>';

	var hash;
	var data;
	var value;
	for ( var id in freunde ) {
		hash = freunde[id];
		data = freunde_data[id];
		text += '<tr>';
		for( var i in selected_fields ) {
			if ( selected_fields[i] == 'Name' ) {
				text += '<td><a href="/Profile/'+hash+'">'+freunde_namen[hash]+'</a></td>';
			} else {
				value = data[selected_fields[i]];
				if ( value == undefined ) value = '';
				text += '<td>'+value+'</td>';
			}
		}
		text += '</tr>';
	}
	text += '</table><a href="#top">>> nach Oben scrollen</a>';
	
	return text;
}

function showTable() {
	var text = '<a name="top"></a><b>Attribute auswählen:<b><br>';
	
	text += '<table width="100%">';
	for( var i in data_fields ) {
		if ( i % 3 == 0 ) text += '<tr>';
	
		text += '<td><input type="checkbox" id="field_'+i+'"';
		if ( data_fields[i] == 'Name' ) text += ' checked="checked" disabled="disabled"';
		text += '><label for="field_'+i+'">'+data_fields[i]+'</label></td>';
		
		if ( (i+1) % 3 == 0 ) text += '</tr>';
	}
	text += '</table>';
	
	text += '<input type="button" value="Anzeigen" id="button_show_tabe">';
	text += '<a id="table_close_gui" href="javascript:;" style="float:right;font-weight:bold;">[Schließen]</a><br><br>';
	text += '<div id="table_area"></div>';

	dialog = uw.Phx.UI.Dialog.ButtonDialog(
		list_img+' Deine Freunde',
		{
			'message' : text,
			'buttons' : []
		}
	);
	dialog.show();

	document.getElementById('button_show_tabe').addEventListener('click', function(){
		document.getElementById('table_area').innerHTML = generateTable();
	}, false);

	document.getElementById('table_close_gui').addEventListener('click', function(){
		dialog.close();
		showMenu();
	}, false);
}

function showIcal() {
	var text = '<table width="100%"><tr><th>Optionen</th><th>&nbsp;</th><th>Download</th></tr>';
	text +='<tr><td>Buchungsstatus:<br><select id="options_busystatus" style="width:100px;">';
	for(var i in busystatus_Text) {
		text += '<option value="'+i+'"';
		if (options['busystatus'] == i) text += ' selected="selected"';
		text += '>'+busystatus_Text[i]+'</option>';
	}
	text += '</select><br><br>';
	text += 'Erinnerung:<br><select id="options_alarm" style="width:100px;">';
	for(var i in alarm_trigger_Text) {
		text += '<option value="'+i+'"';
		if (options['alarm_trigger'] == i) text += ' selected="selected"';
		text += '>'+alarm_trigger_Text[i]+'</option>';
	}
	text += '</select></td>';
	text += '<td>Beschriftung:<br>';
	text += '<input type="checkbox" '+(options['title_prefix'] ? 'checked="checked"' : '')+' id="options_title_prefix"><label for="options_title_prefix">"Geburtstag von " davorschreiben</label><br><br>';
	text += '<input type="checkbox" '+(options['title_suffix'] ? 'checked="checked"' : '')+' id="options_title_suffix"><label for="options_title_suffix">Geburtsjahr anhängen</label><br><br>';

	text += '</td><td align="center">';
	text += '<a href="javascript:;" id="download_ical">'+download_img+'</a>';
	text += '</td></tr></table>';
	text += 'Hinweis: Nicht alle Kalender-Applikationen unterstützen diese Einstellungen.'
	text += '<a id="ical_close_gui" href="javascript:;" style="float:right;font-weight:bold;">[Schließen]</a>';

	dialog = uw.Phx.UI.Dialog.ButtonDialog(
		ical_img+' Geburtstagskalender exportieren',
		{
			'message' : text,
			'buttons' : []
		}
	);
	dialog.show();

	document.getElementById('options_busystatus').addEventListener('change', function(){
		options['busystatus'] = document.getElementById('options_busystatus').selectedIndex;
		save_options();
	}, false);
	document.getElementById('options_alarm').addEventListener('change', function(){
		options['alarm_trigger'] = document.getElementById('options_alarm').selectedIndex;
		save_options();
	}, false);
	document.getElementById('options_title_prefix').addEventListener('click', function(){
		options['title_prefix'] = document.getElementById('options_title_prefix').checked;
		save_options();
	}, false);
	document.getElementById('options_title_suffix').addEventListener('click', function(){
		options['title_suffix'] = document.getElementById('options_title_suffix').checked;
		save_options();
	}, false);
	document.getElementById('download_ical').addEventListener('click', function(){
		generateCalendar();
	}, false);
	document.getElementById('ical_close_gui').addEventListener('click', function(){
		dialog.close();
		showMenu();
	}, false);
}

//------------------------------------------------------------------------------------------

function addMarker(name, address, zoom, lat, lng) {
	var point = new GLatLng(lat, lng);

	// Erstellt das Markierungssymbol "tiny"
	var tinyIcon = new GIcon();
	tinyIcon.image = "http://labs.google.com/ridefinder/images/mm_20_red.png";
	tinyIcon.shadow = "http://labs.google.com/ridefinder/images/mm_20_shadow.png";
	tinyIcon.iconSize = new GSize(12, 20);
	tinyIcon.shadowSize = new GSize(22, 20);
	tinyIcon.iconAnchor = new GPoint(6, 20);
	tinyIcon.infoWindowAnchor = new GPoint(5, 1);

	// Richtet das GMarkerOptions-Objektliteral ein
	var markerOptions = { icon:tinyIcon };
	var marker = new GMarker(point, markerOptions);
	GEvent.addListener(marker, "click", function() {
		marker.openInfoWindowHtml(name + '<br><b>' + address + '</b><br><a id="zoomlink" href="javascript:;">heranzoomen</a>');
		document.getElementById('zoomlink').addEventListener('click', function(){
			map.setCenter(new GLatLng(lat, lng), zoom * 2);
		}, false);
	});

	map.addOverlay(marker);
}

//------------------------------------------------------------------------------------------

//if (location.href.indexOf("/Start") != -1) { // Startseite
	var li_tag = document.createElement("li");
	var a_tag = document.createElement("a");
	a_tag.href = 'javascript:;';
	a_tag.innerHTML = '>> Daten exportieren';
	a_tag.addEventListener('click', function(){ showMenu(); }, false);
	li_tag.appendChild(a_tag);
	document.getElementById('Grid-Navigation-Main').wrappedJSObject.appendChild(li_tag);
//}

}) ();