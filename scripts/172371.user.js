// ==UserScript==
// @name           DS-Alarm
// @description    Signalisiert Angriffe per Sound
// @namespace      Harpstennah
// @icon		   http://icons-search.com/img/marvilla-us/aquarela.zip/aquarela-aquarela_icons-sound.ico-32x32.png
// @include		   http://de*.die-staemme.de/*game.php*
// @include        http://zz2.beta.tribalwars.net/*game.php*
// @include        http://ae*.tribalwars.ae/*game.php*
// @include        http://ch*.staemme.ch/*game.php*
// @include        http://des*.ds.ignames.net/*game.php*
// ==/UserScript==

var win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
api.register( 'DS-Alarm', [8.13, 8.14, 8.15], 'Harpstennah', 'support-nur-im-forum@arcor.de' );

/* 
Version 0.2 
 */

function main() {

	// KompatibilitÃ¤t zu Opera 
	if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
		GM_deleteValue = function(name) {
			localStorage.removeItem(name);
		}
		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
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
			localStorage.setItem(name, value);
		}

	}
	var oGD = typeof unsafeWindow != 'undefined' ? unsafeWindow.game_data : window.game_data;

	var aIncs = oGD.player.incomings ; 
	var aPlayer_ID =oGD.player.id;

	var a$ = win.jQuery;
	var astr = document.createElement('audio');
	var a$str = a$(astr);

	// Zuweisung Angriffsound
	if (oGD.player.sitter_id == 0){
		a$str.attr('src', aSettings.Sound1);
		astr.volume = aSettings.Volumen1;
		}
		else
		{
		a$str.attr('src', aSettings.SoundUV);
		astr.volume = aSettings.VolumenUV;
		}
	// Lade letzte Anzahl Angriffe
	var aZaehler;
	aZaehler =  GM_getValue("alarmIncs"+aPlayer_ID, '0');

	// Sound bei VerÃ¤nderungen
	var aDiff = aIncs - aZaehler;
	if (aDiff  > 0){
		if (aSettings.AnzeigeDauer != 0 ){
			win.UI.InfoMessage( aDiff + ' Ø¹Ù„ÙŠÙƒ Ù‡Ø¬ÙˆÙˆÙˆÙˆÙ… Ø¬Ø¯ÙŠØ¯', aSettings.AnzeigeDauer, true); // true = rot ; false = grÃ¼n
			}
		astr.load();
		astr.play(0);
		}
	if (aDiff < 0){
		a$str.attr('src', aSettings.SoundAnkunft);
		astr.volume = aSettings.VolumenAnkunft;
		astr.load();
		astr.play(0);
		}
		
	// aktuelle Anzahl der Angriffe speichern
	GM_setValue("alarmIncs"+aPlayer_ID, aIncs); 
}

main();