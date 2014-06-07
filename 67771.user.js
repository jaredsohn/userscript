// ==UserScript==
// @name           usoCheckup - German Translation Theme
// @description    Defines a custom German language translation for usoCheckup
// @version        1
// @license        GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        dummy
// ==/UserScript==

if (typeof usoCheckup != "undefined") {
	switch (usoCheckup.strings("lang")) {
		case "de":
			usoCheckup.strings({
				"updateAvailable": "Ein Update ist verfügbar.",
				"updateUnavailable": "Kein Update verfügbar.",
				"updateMismatched": "WARNUNG: Metadaten stimmen nicht überein!",
				"updateUnlisted": "WARNUNG: Nicht aufgelistetes Skript!",
				"queryWidget": "Auf Updates prüfen.",
				"toggleWidget": "An-/Ausschalten der automatischen Updates.",
				"updaterOff": "Automatische Updates sind ausgeschaltet.",
				"updaterOn": "Automatische Updates sind eingeschaltet.",
				"showConfirm": "Wollen Sie die Homepage des Skripts öffnen?",
				"installConfirm": "Wollen Sie das Skript installieren?",
				"topicConfirm": "Wollen Sie das Diskussionsthema des Skripts anzeigen?",
				"closeMessage": "Diese Nachricht schließen?",
				"closeAllMessages": "Alle Nachrichten schließen?"
			});
			break;
	}	
}