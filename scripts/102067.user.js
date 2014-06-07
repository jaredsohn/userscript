// ==UserScript==
// @name           [DS] Link auf das Stammesforum entfernen
// @namespace      die-staemme.de
// @version        0.1.1
// @description    Stellt den direkten Link zum Stammesforum im Hauptmenü ab, wenn kein neues Posting vorhanden ist [Die Stämme]
// @icon           http://img545.imageshack.us/img545/291/logostammesforum.png
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @include        http://*.die-staemme.de/game.php*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==

// written by Stämme-User "atlanticIsle" --> http://de71.die-staemme.de/guest.php?screen=info_player&id=9106959

const url = document.location.href;
const world = (url.match(/de(\d{1,}).die-staemme.de/)[0]).match(/\d{1,}/)[0];

var sun_setting = GM_getValue('sun' + world, 1);

// Generieren einer Einstellungs-Seite
if( location.href.match(/screen=settings&mode=settings/) ) {
	
	var table_setting = '<form name="sun_settings" action=""><table class="vis settings"> <tr><th colspan="2">Erweiterte Einstellungen</th></tr> <tr><td>Link auf das Stammesforum:</td><td><label><input type="radio" name="sun" value="0">Nie anzeigen</label> <label><input type="radio" name="sun" value="1">Nur bei neuen Beiträgen anzeigen</td></tr> <tr><td colspan="2"><input value="OK" type="button" id="settingsbutton"></td></tr></table></form>';
	var hinweis = '<p id="setting_successfull" style="display:none;">Einstellung erfolgreich gesetzt</p>';
	$('table.vis').eq(1).after(table_setting);
	$('table.vis').eq(2).after(hinweis);
	$('input:radio[name=sun]').val([sun_setting]);
	
	$("input#settingsbutton").click(function() {		
		var sun_setting = $('input:radio[name=sun]:checked').val();
		GM_setValue('sun' + world, sun_setting);
		$("p#setting_successfull").fadeToggle(1500, "linear");
	});

}


// Ausgabe des Skripts
if (sun_setting == 1) {
	var theclass = $('div.buttonicon a span').attr('class');

	if (theclass != "icon header new_post") {
		$('div.buttonicon').remove();
		$('tr#menu_row td.menu-item').eq(3).find('a').eq(0).text('Stamm');
	}
}
else {
	$('div.buttonicon').remove();
	$('tr#menu_row td.menu-item').eq(3).find('a').eq(0).text('Stamm');
}