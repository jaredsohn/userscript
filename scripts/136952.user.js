// ==UserScript==
// @name           DS_Alarm
// @description    Signalisiert Angriffe per Sound
// @namespace      Harpstennah
// @icon		   http://icons-search.com/img/marvilla-us/aquarela.zip/aquarela-aquarela_icons-sound.ico-32x32.png
// @include		   http://ae*.tribalwars.ae/*game.php*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
// ## EINSTELLUNGEN ## //
// soll das Script nur auf den Rekrutierungsseiten laufen - oben die include anpassen - z.B. http://de*.die-staemme.de/*game.php*screen=train*
// bei SoundX vollst?ndiger Pfad zur Onlinedatei - nur mit wav getestet
// bei VolumenX Wert für die Lautst?rke von 0 bis 1; 1 = 100%;  Punkt als Dezimalzeichen; Beispiel 0.75 = 75%
// bei Anzeigedauer wird die Zeit für die optische Anzeige neuer Angriffe in Millisekunden festgelegt; Wert 0 = aus
// Menue -> (noch) ohne Funktion

win.aSettings = {
		Sound1 : "http://www.mediacollege.com/downloads/sound-effects/vehicle/siren/firetruck-01.wav",
		Volumen1 : 1, 
		SoundUV : "http://www.mediacollege.com/downloads/sound-effects/star-trek/tos/tos-redalert.wav",
		VolumenUV : 0.7,
		SoundAnkunft : "http://www.mediacollege.com/downloads/sound-effects/weapons/colt45.wav",
		VolumenAnkunft : 0.3,
		AnzeigeDauer : 4000, 
		Menue : 1
};
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://userscripts.org/scripts/source/136951.user.js');