// ==UserScript==
// @name           Heise conTroll
// @namespace      http://www.heise.de/newsticker/foren/#heise_controll
// @description    Filtert Troll-Kommentare in den Foren auf heise.de
// @include        http://www.heise.de/*/news/foren/*
// @include        http://www.heise.de/newsticker/foren/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// --------------------------------------------------------------------


/**************************************
 * Heise conTroll v0.7                *
 *------------------------------------*
 * (c) KnoedelDealer 2008/03/26       *
 *     alle Rechte vorbehalten        *
 *      www.knoedeldealer.de          *
 **************************************/


var schwelle = 0;
try {
	schwelle = GM_getValue('schwelle');
}
catch (e) {
	GM_setValue('schwelle', 0);
}
schwelle = parseInt(schwelle);
if ((schwelle < -100) || (schwelle > 100) || isNaN(schwelle)) {
	schwelle = 0;
	GM_setValue('schwelle', 0);
}

var trolle;
try {
	trolle = GM_getValue('trolle').split(',');
} catch (e) {
	GM_setValue('trolle', '');
	trolle = GM_getValue('trolle').split(',');
}

unsafeWindow.schwelleUp = function () {
	schwelle += 10;
	GM_setValue('schwelle', schwelle);
	document.location.reload();
}

unsafeWindow.schwelleDown = function () {
	schwelle -= 10;
	GM_setValue('schwelle', schwelle);
	document.location.reload();
}

unsafeWindow.addTroll = function (name) {
	if (name.length > 0) {
		alert('"' + name + '" wird zur Liste der Trolle hinzugefügt');
		var t = GM_getValue('trolle') + ',' + name;
		window.setTimeout(GM_setValue, 0, 'trolle', t);
		document.location.reload();
	}
}

unsafeWindow.removeTroll = function (name) {
	if (name.length > 0) {
		alert('"' + name + '" wird von Liste der Trolle entfernt');
		var t = '';
		for (var i = 0; i < trolle.length; i++) {
			if (trolle[i] != name) t += ',' + trolle[i];
		}
		t = t.replace(/,,/, ',');
		window.setTimeout(GM_setValue, 0, 'trolle', t);
		document.location.reload();
	}
}

unsafeWindow.nameMouseOver = function (evt) {
	alert(evt);
}


function inarray(array, value) {
	if (value.length == 0) return false;
	for (var i = 0; i < array.length; i++) {
		if (array[i] == value) return true;
	}
	return false;
}

var tli = [];
window.setTimeout(function() {
	if (document.location.search.indexOf('read=') <= 0) {
		var e = document.getElementsByTagName('li');
		for (var i = 0; i < e.length; i++) {
			var el = e[i];
			if ((el.innerHTML.indexOf('<div class="bullet">') > -1) && (el.innerHTML.indexOf('<div class="hover">') > -1)) {
				var troll = false;
				var name = '';
				var e2;
				e2 = el.getElementsByTagName('div');
				for (var j = 0; j < e2.length; j++) {
					var el2 = e2[j];
					if (el2.className == 'thread_user') {
						name = el2.innerHTML.replace(/\n/g, '').replace(/\r/g, '');
						if (inarray(trolle, name)) {
							el.style.display = 'none';
							tli[tli.length] = el;
							troll = true;
						}
						if (name.length == 0) {
						} else if (troll) {
							var a = document.createElement('a');
							a.href = 'javascript:removeTroll(\'' + name + '\')';
							a.innerHTML = '[i]';
							a.title = 'Benutzer aus der Troll-Liste entfernen';
							el2.appendChild(a);
						} else {
							var a = document.createElement('a');
							a.href = 'javascript:addTroll(\'' + name + '\')';
							a.innerHTML = '[i]';
							a.title = 'Benutzer auf die Troll-Liste setzen';
							el2.appendChild(a);
						}
					}
				}
				if (!troll) {
					e2 = el.getElementsByTagName('img');
					for (var j = 0; j < e2.length; j++) {
						var el2 = e2[j];
						if (el2.src.indexOf('wertung') > -1) {
							var w = parseInt(el2.alt.replace(/%/, ''));
							if (w < schwelle) {
								el.style.display = 'none';
								tli[tli.length] = el;
							}
						}
					}
				}
			}
		}

		e = document.getElementsByTagName('ul');
		for (i = 0; i < e.length; i++) {
			var el = e[i];
			if (el.className == 'thread_tree') {
				el.innerHTML += '<div style="height: 15px"></div>';
				if (tli.length > 0) {
					var eintrag = (tli.length == 1) ? 'Eintrag' : 'Eintr&auml;ge';
					el.innerHTML += '<strong onclick="var d = document.getElementById(\'gm_trollcollect_ul\'); if (d.style.display == \'block\') { d.style.display = \'none\'; this.title = \'ausgeblendete Kommentare anzeigen\'; } else { d.style.display = \'block\'; this.title = \'ausgeblendete Kommentare wieder ausblenden\'; }" style="cursor: pointer; margin-left: 10px" title="ausgeblendete Kommentare anzeigen">' + tli.length + ' ' + eintrag + ' ausgeblendet</strong> &nbsp; <em>Schwelle: ' + schwelle + '%</em>';
					if (schwelle < 100) el.innerHTML += ' <a href="javascript:schwelleUp()">[+]</a>';
					if (schwelle > -100) el.innerHTML += ' <a href="javascript:schwelleDown()">[-]</a>';
					var ul = document.createElement('ul');
					ul.id = 'gm_trollcollect_ul';
					ul.style.display = 'none';
					for (var k = 0; k < tli.length; k++) {
						tli[k].style.display = 'block';
						ul.appendChild(tli[k]);
					}
					el.appendChild(ul);
					return;
				} else {
					el.innerHTML += '<em style="margin-left: 10px">Schwelle: ' + schwelle + '%</em>';
					if (schwelle < 100) el.innerHTML += ' <a href="javascript:schwelleUp()">[+]</a>';
					if (schwelle > -100) el.innerHTML += ' <a href="javascript:schwelleDown()">[-]</a>';
				}
			}
		}
	}

}, 1);