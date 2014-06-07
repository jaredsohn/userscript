// ==UserScript==
// @name		DIO-TOOLS
// @namespace	DIO
// @version		0.209
// @updateURL   http://userscripts.org:8080/scripts/source/184630.user.js
// @downloadURL	http://userscripts.org:8080/scripts/source/184630.user.js
// @description DIO-Tools is a small extension for the browser game Grepolis. (unit counter, unit strength, smiley box, trade options, improved boxes (commands, trades & spells), ww share & changes to the UI)
// @include		http://*.grepolis.com/game*
// @include		http://*forum.*.grepolis.com/*.php*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js

// @icon		http://s7.directupload.net/images/140128/vqchpigi.gif
// @iconURL		http://s7.directupload.net/images/140128/vqchpigi.gif
// @copyright	2013+, DIONY
// ==/UserScript==


//http://de44.grepolis.com/cache/js/libs/jquery-1.10.2.min.js


/*******************************************************************************************************************************
 * Changes
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● TradeButton erscheint nichtmehr während der Bauphase eines WW's
 * | ● Layoutänderungen im Forum für die Smileybox im Editor angepasst (gab Probleme bei anderen Märkten)
 * | ● Ausnahme: Deutsche Schildersmileys (Dafuer/Dagegen) werden in anderen Märkten durch englische Pendants ersetzt
 * | ● Extrasmiley im Forum hinzugefügt
 * | ● Kontextmenü: Vertauscht die Positionen von "Stadtübersicht" und "Stadt selektieren"
 * | ● Extrasmiley im Forum hinzugefügt
 * | ● Verteidigungsformular: Ohne "Uhr" bei anderen Märkten
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

/*******************************************************************************************************************************
 * Bugs / TODOs
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Beim WW Garten wird der Next-Button falsch positioniert
 * | ● Aktivitätsbox für Angriffe blendet nicht aus
 * | ● Smileys verschwinden manchmal? -> bisher nicht reproduzierbar
 * | ● Stadticons werden nicht sofort geladen
 * | ● ...
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

/*******************************************************************************************************************************
 * Global stuff
 *******************************************************************************************************************************/
var uw = unsafeWindow || window, data; // data??

var $ = uw.jQuery || jQuery; // (Game || Forum)

// Game values
var LID = "en", WID = "", AID = 0, PID  = 0;
if(uw.location.pathname === "/game/index"){
    LID = uw.Game.locale_lang.split("_")[0];
    WID = uw.Game.world_id;
    AID = uw.Game.alliance_id;
    PID = uw.Game.player_id;
    
    var unitVal; // unit values
    
    var autoTownTypes = {}; // town type (ld, lo, sd, so, fd, fo)  
    var manuTownTypes = JSON.parse(GM_getValue("town_types", "{}"));
    
    var townPopulation = {};
    
    $.prototype.reverseList = [].reverse;
}

//console.log(GM_listValues());

//console.log(GM_getValue("de48_ratio"));

//console.log(GM_getValue("de44_ratio"));

/*******************************************************************************************************************************
 * Images
 *******************************************************************************************************************************/
var img = "data:image/png;base64,"+
    "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";
var img_small_transp = img + 
    "/FRgAAA/1JREFUeNqsk0mMVFUUhv9733313quxu6qosrppGpqhuwkyCKh02oEYp8REEVwYExOXxrhyZ3RtdGPc6cKdCcbEEOMYjEENoiBGwiw0Kj1QFFVd45vvu/e4kBA1ATae7cn5c875/"+
    "h8AGP6nMm7VvPfpZ9fsqKmXjaDTbbrUuJ2YAABh5yqV6Y1PViY3m0wYi9XpLTxdGhNXvtm/jwvxECPKVoeseqMbNW8rxhjX1fWbiqlM/qVus8HjKOHF6ijLj64pxPVjh3uhPhxr/czaWubj"+
    "S3WvccszTcuJimOr62Lx5H2PPLD9znO/L3HTQObiVx/1OudPdlsh5nu+dk2DnqoOW2c6bjK4qZiSIfXqC/FI0Zl8/ZXnd96zrmRsykaM+22v3nYLVqYwAcYnu31/a+QnU9xgjURj6b/wbgB"+
    "I4kgHYYSpqQ079+15rrpuImfsmt3hPPr47vxjD8/WZnZtHV81Pko9P9hSr7dmGHCMgKs3fWC5PPzgh/vf/pNomWRwiig5T0RzRDRHMjxD/f5Z+fPxz4P7Z7afFsC7I8PW+D/G2Y3NVpas7O"+
    "ja9XvefOPVPaaZ8NBzAQAyjiEjiSROoJKEV8tDBuP88qFvfziYNvXKXMaKvFCtJsJVMbuxzEHYvbDs7i3msw9ImTIcJEjn8mg1mohjhSCIAAJKpSEIYbHKisqIZsJd7nuLts1eY4zNAXTcG"+
    "AQy1fPlC5WC/WLgetXvjhxlCF04Th6FfAGkOWzbgtLAocO/4tgvp/HZgS8yFy5cnPJjPZNxxHqt9TtS0WVRyttkm5w2TwzbCw0PBw58jYUzx7F9x12Y3LwNjAiDKEGrNcCJn75HNaOgk9go"+
    "ZsW0ECw0DPZ+KZ864jdDsJGiY5gm2z09Vvhg1Yp09dx8H3NLHTAGtAOBUhqwbY5V5SwmKja8QOLaIMGlhocwlgeTBHuXB9IFAHGlHSjOcKIziC/nttWqW9YV4dgC7V6IUqKRcwRGS2nYKQY"+
    "Fjt8aIRabPsB0q+/J9yIJ99/ZdNKulMGpk3+07h73s7hjyMGGWuZv3gwIIoWOK+EGMTwvAtNy0JXGWyJb/ASdNq6blwwuhGM5dsXK5UWgMeV6QTmICR0/QdtXuDaI0RzE8EKF+ZaLpU4cpo"+
    "bLX4rs0KdMK6ZUorXWMQASpu3UrHJtr1WpPcFEquxGATq+BzABbtgAAdxiIBVDlhM4Y+mU6aRnhZJrZbf1Y0K0nzqdo0opLQiATqJl7Q/Omla6Y3Oec3J5RpwbjDHBGDMAKCKeQBMxQOvQj"+
    "bQMmxQG80SUXI+lZJwbtkiZOWHbQ8IUWW7wFMA5A+OMEQdjDACISIGICNCktVRSeSqM+rGMBkqpAETJXwMA90ECQGSWVcUAAAAASUVORK5CYII=";
var img_big_transp	= img + 
    "/FRgAABHZJREFUeNp0lMtv1FUcxc+9v3t/j3l0Xm2npaXYkhKshVJBBFMSQiAaTXRlTDQaSdSdf4s740ZdmJCoGxcEDQsT0LhQCcQHFpRpqS10Hp2Zzvzev3vv1wViXMBZndUnn805DACkV"+
    "xyfP/3CO/lq9VWVZguTyyfs8UMnsHn5c+R/+TJo3LrzcTOWF1zJrm+0oxSPiQUARqWBCv3vm43b30b9btvJj/hMiBt687ev5+j+VYupn1q72SLAKtWCvdYPMvMoGHtYJDBqgCUNDESxvGa7"+
    "bjRTUGPnDlVev9sMvvju97bxbOtt1+bXiOjSWjPKHmkGQJY8+cZLT9Y/M8asBP6wGvr+RKcf1rf74dLte2Gr76c3GLAqLXaWMeb2A3XnsbCyJ46fPzp95rknatO1gnNquuSeMYSnh4Fe0Mo"+
    "sJ9rUE2Xag0jtELAyWXWpH2R3HwWjRBntSf7kywv12ZmSh2enS87S5MjY4XqxvDCen8k7cqVoi1cAzA5iHSpjTk5UnN6IJzcGoQIAiH9hJjPYaAfZjtYGRARLcEyVHMyVXQQp4dhMxY4yM9"+
    "nohpOrLf/oxVutr3aj7FQ5J/MALgEAf6hoW6wwlrcrBEAZQphp+CkhIUJiNCwO5B2GQ/UCXlucGD0+VfJ2A/VNmpkjzxyonP2/GUYccez0XG051kCgCC5/AB0SEKUKUUYAEWJFqBdtPl/L7"+
    "b2y1l0fL+c+nd9TfN9zxIIAkJMWP1f0xHthqmtbgwSkNSyLI9EGXHHEmhBrgs0ZCIS1bohGNxwRgh+fmxzpONJif2wMppjjOAdreXZx72huf6cb08n9NVZ3BKqejYpnQzAgMQZ+oujPls/6"+
    "scKmH2M7TIeuK+5MlD2xujn8udWPzossTag8PpKf3VNAYydkV9Z7mB3LgakhCoyTNtiKU309NmrJNzRjOxaYZ2G+ViqWPXnk1lYfrX50FQDEvn37mrY1uLyn4r11bLaCa3/1MIgz7AwS3O9"+
    "FSmXUAGM3F2dLiyeeGkXBlSBDaHZjNPuR6fnZRc7YBUMExhjjoyP2u4dnSx/tHctjN0ixvZOAC4ZUG600tSbKXnpgujCttbHudSK4jsDqeh+NVvBDmOg3U2UaACCIyLR3k9s317tJ3ubOeM"+
    "WDKwVcycE5WYyxSVda6PQibO1EEBbHrp9gu+dv9AP1AYDGfwvgnDOLs9h15HQcxQejKLEEMxAgWGSgjUYQJhgMYpAxGCsK/N0OO83AfKiJf8I4N0TEAEBYtqw65epBXSx1ulyZ1AToBRy2y"+
    "cHJuSAikCbELAOXGjsRw4Ysaj7lloqJ/2LYbv1qwnCdAC28YnHMLldX7NGJZZL2YBjH2jeKaelxSMk5MUaSjBbKMJ0BjJMsOVYO5vm036mpKAyyON4krbWI/GDXsM6PJsuG0nEqhksHDBZY"+
    "aAGQxDgDYCwYRYYIBA1msjiOhmngN7Io2qKH52gJYQnHEYzBllI63LIsBsbBiDjADdiDA2VEMMwARForMtrEBKRpnGiVZRpE5p8BAORgaeW/uJkgAAAAAElFTkSuQmCC";

var alarmSound = "data:application/octet-stream;base64,"+
    "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";


/*******************************************************************************************************************************
 * Graphic filters
 *******************************************************************************************************************************/
if(uw.location.pathname === "/game/index"){
    $('<svg width="0%" height="0%">'+
      '<filter id="GrayScale">'+
      '<feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0">'+
      '</filter>'+
      '<filter id="Sepia">'+
      '<feColorMatrix type="matrix" values="0.343 0.669 0.119 0 0 0.249 0.626 0.130 0 0 0.172 0.334 0.111 0 0 0.000 0.000 0.000 1 0">'+
      '</filter>'+
      '<filter id="Saturation"><feColorMatrix type="saturate" values="0.2"></filter>'+
      '<filter id="Hue1"><feColorMatrix type="hueRotate" values= "65"></filter>'+
      '<filter id="Hue2"><feColorMatrix type="hueRotate" values="150"></filter>'+
      '<filter id="Hue3"><feColorMatrix type="hueRotate" values="-65"></filter>'+
      '</svg>').appendTo('#ui_box');
}
/*******************************************************************************************************************************
 * Language version (german and english)
 *******************************************************************************************************************************/
if(!(uw.location.pathname === "/game/index")){
    LID = uw.location.host.split(".")[1];
}
// English => default
if((LID !== "de") && (LID !== "fr")&& (LID !== "ru")){ LID = "en"; }

if(PID == 84367){ LID = "de"; }

// Language Array
var LANG = {
    de : {
        set : {
            txt: {
                dsc: "DIO-Tools bietet unter anderem einige Anzeigen, eine Smileyauswahlbox,<br>Handelsoptionen und einige Veränderungen des Layouts.",
                act: "Funktionen der Toolsammlung aktivieren/deaktivieren:",
                prv: "Vorschau einzelner Funktionen:",
            },
            // opt: [label, tooltip]
            bir: [ "Biremenzähler",		"Zählt die jeweiligen Biremen einer Stadt und summiert diese. (Anzeige im Minimap-Bullauge links oben)" ],
            sml: [ "Smileys",			"Erweitert die BBCode-Leiste um eine Smileybox" ],
            str: [ "Einheitenstärke",	"Fügt mehrere Einheitenstärketabellen in verschiedenen Bereichen hinzu" ],
            trd: [ "Handel",			"Erweitert das Handelsfenster um einen Prozentualer Handel, einen Rekrutierungshandel und Limitmarker für Stadtfeste" ],
            cnt: [ "EO-Zähler",			"Zählt die ATT/UT-Anzahl im EO-Fenster (bisher nur bei eigenen Eroberungen)" ],
            way: [ "Laufzeit",			"Zeigt im ATT/UT-Fenster die Laufzeit bei Verbesserter Truppenbewegung an" ],
            wwc: [ "Weltwunder",		"Anteilsrechner & Rohstoffzähler + Vor- & Zurück-Buttons bei fertiggestellten WW's (momentan nicht deaktivierbar!)" ],
            sim: [ "Simulator",			"Anpassung des Simulatorlayouts & permanente Anzeige der Erweiterten Modifikatorbox" ],
            spl: [ "Zauberbox",			"Komprimierte verschiebbare & magnetische Zauberbox (Positionsspeicherung)" ],
            mov: [ "Aktivitätsboxen",	"Verbesserte Anzeige der Handels- und Truppenaktivitätsboxen (Positionsspeicherung)" ],
            pop: [ "Popup",				'Ändert Gunst-Popup' ],
            tsk: [ "Taskleiste",		'Vergrößert die Taskleiste und minimiert das "Tägliche Belohnung"-Fenster beim Start' ],
            irc: [ "Chat",				"Ersetzt den Allianzchat durch einen IRC-Chat" ],
            bbc: [ "BBCode-Leiste",		"Erweitert BBCode-Leiste um ein automatisches DEF-Formular" ],
            com: [ "Vergleich",			"Fügt Einheitenvergleichstabellen hinzu" ],
            twn: [ "Stadticons",		"Fügt Stadttyp-Icons zur Stadtliste hinzu" ],
            con: [ "Kontextmenu",		'Vertauscht "Stadt selektieren" und "Stadtübersicht" im Kontextmenu'],
            sen: [ "Abgeschickt",		'Zeigt im Angriffs-/Unterstützungsfenster abgeschickte Einheiten an'],
            tov: [ "Stadtübersicht",	'Ersetzt die neue Stadtansicht mit der alten Fensteransicht'],
            scr: [ "Mausrad",			'Man kann mit dem Mausrad die Übersichten wechseln'],
            
            sav_btn: "Speichern", don_btn: "http://s7.directupload.net/images/140131/ctahnu2q.png",
        },
        sml : { std: "Standard ", gre: "Grepolis ", nat: "Natur ", ppl: "Leute ", oth: "Sonstige " },
        uni : "Verfügbare Einheiten",
        bbc : { 
            ttl: "Übersicht: Stadtverteidigung", inf: "Informationen zur Stadt:", mov: "Truppenbewegungen:", dev: "Abweichung", but: "Einfügen",
            sel: [ "Detailierte Landeinheiten",  "Premiumboni", "Silberstand", "Truppenbewegungen" ] 
        },
        wwc : { leg: "WW-Anteil", stg: "Stufe", tot: "Gesamt"},
        sim : { str: "Einheitenstärke", los: "Verluste", mod: "ohne Modifikatoreinfluss" },
        com : {
            dsc: "Einheitenvergleich", hck: "Schlag", prc: "Stich", dst: "Distanz", sea: "See", att: "Angriff", def: "Verteidigung", spd: "Geschwindigkeit", 
            bty: "Beute (Rohstoffe)", cap: "Transportkapazität", res: "Baukosten (Rohstoffe)", fav: "Gunst", tim: "Bauzeit (s)"
        },
        trd : { uni: "Ressourcenverhältnis eines Einheitentyps", rat: "Anteil an der Lagerkapazität der Zielstadt", prc: "Prozentualer Handel"},
        sen : { rst: "Zurücksetzen", lab: "Abgeschickt" },
        con : "Selektieren"
    },
    en : {
        set : {
            txt: {
                dsc: "DIO-Tools offers, among other things, some displays, a smiley box,<br>trade options and some changes to the layout.",
                act: "Activate/deativate features of the toolset:",
                prv: "Preview of several features:",
            },
            // opt: [label, tooltip]
            bir: [ "Bireme counter",	"Counts the biremes of a city and sums these" ],
            sml: [ "Smilies",			"Extends the bbcode bar by a smiley box" ],
            str: [ "Unit strength",		"Adds unit strength tables in various areas" ],
            trd: [ "Trade",				"Extends the trade window by a percentage trade, a recruitment trade and limit markers for city festivals" ],
            cnt: [ "Conquests",			"Counts the attacks/supports in the conquest window (only own conquests yet)" ],
            way: [ "Troop speed",		"Displays improved troop speed in the attack/support window" ],
            wwc: [ "World wonder",		"Share calculation & resources counter + previous & next buttons on finished world wonders (currently not deactivatable!)" ],
            sim: [ "Simulator",			"Adaptation of the simulator layout & permanent display of the extended modifier box" ],
            spl: [ "Spell box",			"Compressed sliding & magnetic spell box (position memory)" ],
            mov: [ "Activity boxes",	"Improved display of trade and troop activity boxes (position memory)" ],
            pop: [ "Popup",				"Changes the favor popup" ],
            tsk: [ "Taskbar",			"Increases the taskbar and minimizes the daily reward window on startup" ],
            irc: [ "Chat",				'Replaced the alliance chat by an irc chat. (FlashPlayer required)' ],
            bbc: [ "BBCode bar",		"Extends the bbcode bar by an automatic defense form" ],
            com: [ "Comparison",		"Adds unit comparison tables" ],
            twn: [ "Town icons",		"Adds town type icons to the town list" ],
            con: [ "Context menu",		'Swaps "Select town" and "City overview" in the context menu'],
            sen: [ "Sent units",		'Shows sent units in the attack/support window'],
            tov: [ "Town overview",		'Replaces the new town overview with the old window style'],
            scr: [ "Mouse wheel",		'You can change the views with the mouse wheel'],
            
            sav_btn: "Save", don_btn: "https://www.paypal.com/en_US/i/btn/btn_donate_LG.gif",
        },
        sml : { std: "Standard ", gre: "Grepolis ", nat: "Nature ", ppl: "People ", oth: "Other " },
        uni : "Available Units",
        bbc : { 
            ttl: "Overview: Town defense", inf: "Town information:", mov: "Troop movements:", dev: "Deviation", but: "Insert",
            sel: [ "Detailed land units",  "Premium bonuses", "Silver volume", "Troop movements" ] 
        },
        wwc : { leg: "WW Share", stg: "Stage", tot: "Total"},
        sim : { str: "Unit strength", los: "Loss", mod: "without modificator influence" },
        com : {
            dsc: "Unit comparison", hck: "Blunt", prc: "Sharp", dst: "Distance", sea: "Sea", att: "Offensive", def: "Defensive", spd: "Speed", 
            bty: "Booty (resources)", cap: "Transport capacity", res: "Costs (resources)", fav: "Favor", tim: "Recruiting time (s)"
        },
        trd : { uni: "Resource ratio of an unit type", rat: "Share of the storage capacity of the target city", prc: "Percentage trade"},
        sen : { rst: "Reset", lab: "Sent units" },
        con : "Select town"
    },
    fr : {  
        set : {  
            txt: {  
                dsc: "DIO-Tools offres certains écrans, une boîte de smiley, les options <br>commerciales, des changements à la mise en page et d'autres choses.",  
                act: "Activation/Désactivation des fonctions:",  
                prv: "Aperçu des fonctions séparées:",  
            },  
            // opt: [label, tooltip]  
            bir: [ "<nobr>Compteur de birèmes&nbsp;&nbsp;</nobr>",	"Totalise l'ensemble des birèmes présentent en villes et les résume. (Remplace la mini carte dans le cadran)" ],  
            sml: [ "Smileys",				"Rajoutes une boite de smilies à la boite de bbcode" ],  
            str: [ "Force unitaire",		"Ajoutes des tableaux de force unitaire dans les différentes armes" ],  
            trd: [ "Commerce",				"Ajout d'une option par pourcentage, par troupes pour le commerce, ainsi qu'un affichage des limites pour les festivals" ],  
            cnt: [ "<nobr>Compteur conquête</nobr>",		"Comptabilise le nombre d'attaque et de soutien dans la fenêtre de conquête (valable que pour ses propre conquêtes)" ],  
            way: [ "<nobr>Vitesse des troupes&nbsp;&nbsp;</nobr>",	"Rajoutes le temps de trajet avec le bonus accélération" ],  
            wwc: [ "<nobr>Merveille du monde</nobr>",	"Compteur de ressource et calcul d'envoi + bouton précédent et suivant sur les merveilles finies(ne peut être désactivé pour le moment)" ],  
            sim: [ "Simulateur",			"Modification de la présentation du simulateur et affichage permanent des options premium" ],  
            spl: [ "<nobr>Boîte de magie</nobr>",		"Boîte de sort cliquable et positionnable" ],  
            mov: [ "<nobr>Boîte d'activité</nobr>",		"Présentation améliorée du commerce et des mouvement de troupes (mémoire de position)" ],  
            pop: [ "Popup",				'Change la popup de faveur' ],  
            tsk: [ "<nobr>Barre de tâches&nbsp;&nbsp;</nobr>",		"La barre de tâches augmente et minimise le fenêtre de bonus journalier" ],  
            irc: [ "Chat",					"Remplace le chat de l'alliance à travers un chat IRC. (FlashPlayer requis)" ],  
            bbc: [ "<nobr>Barre de BBCode</nobr>",		"Ajout d'un bouton dans la barre BBCode pour un formulaire de défense automatique" ],  
            com: [ "Comparaison",			"Ajoutes des tableaux de comparaison des unités" ],  
            twn: [ "<nobr>Icônes des villes</nobr>",		"Ajoutes desicônes de type de ville à la liste de ville" ],  
            con: [ "Menu contextuel",		'Swaps "Sélectionner ville" et "Aperçu de la ville" dans le menu contextuel'],
            sen: [ "Unités envoyées",		'Affiche unités envoyées dans la fenêtre attaque/support'],
            tov: [ "Aperçu de ville",		"Remplace la nouvelle aperçu de la ville avec l'ancien style de fenêtre"],
            scr: [ "Molette de la souris",	'Avec la molette de la souris vous pouvez changer les vues'],
            
            sav_btn: "Sauver", don_btn: "http://s7.directupload.net/images/140131/ctahnu2q.png",  
        },  
        sml : { std: "Standard ", gre: "Grepolis ", nat: "Nature ", ppl: "Gens ", oth: "Autres " },  
        uni : "Unités disponibles",  
        bbc : {   
            ttl: "Aperçu: Défense de ville", inf: "Renseignements sur la ville:", mov: "Mouvements de troupes:", dev: "Différence", but: "Insertion",
            sel: [ "Unités terrestres détaillées",  "Bonus premium", "Remplissage de la grotte", "Mouvements de troupes" ]
        },  
        wwc : { leg: "Participation", stg: "Niveau", tot: "Total"},
        sim : { str: "Force unitaire", los: "Pertes", mod: "sans influence de modificateur" },
        com : {  
            dsc: "Comparaison des unités", hck: "Contond.", prc: "Blanche", dst: "Jet", sea: "Navale", att: "Attaque", def: "Défense", spd: "Vitesse",   
            bty: "Butin", cap: "Capacité de transport", res: "Coût de construction", fav: "Faveur", tim: "Temps de construction (s)"
        },
        trd : { uni: "Ratio des ressources d'un type d'unité", rat: "Part de la capacité de stockage de la ville cible", prc: "Commerce de pourcentage"},
        sen : { rst: "Remettre", lab: "Envoyée" },
        con : "Sélectionner"
    },
    ru : {
        set : {
            txt: {
                dsc: "DIO-Tools изменяет некоторые окна, добавляет новые смайлы, отчёты,<br>улучшеные варианты торговли и другие функции.",
                act: "Включение/выключение функций:",
                prv: "Примеры внесённых изменений:",
            },
            // opt: [label, tooltip]
            bir: [ "Счётчик бирем",		"Показывает число бирем во всех городах" ],
            sml: [ "Смайлы",			"Добавляет кнопку для вставки смайлов в сообщения" ],
            str: [ "Сила отряда",		"Добавляет таблицу общей силы отряда в некоторых окнах" ],
            trd: [ "Торговля",	        "Добавляет маркеры и отправку недостающих ресурсов, необходимых для фестиваля. Инструменты для долевой торговли" ],
            cnt: [ "Завоевания",	    "Отображение общего числа атак/подкреплений в окне завоевания города (only own conquests yet)" ],
            way: [ "30% ускорение",		"Отображает примерное время движения отряда с 30% бонусом" ],
            wwc: [ "Чудо света",	    "Share calculation & resources counter + previous & next buttons on finished world wonders (currently not deactivatable!)" ],
            sim: [ "Симулятор",		    "Изменение интерфейса симулятора, добавление новых функций" ],
            spl: [ "Заклинания",		"Изменяет положение окна заклинаний" ],
            mov: [ "Перемещения",    	"Показывает окна пересылки ресурсов и перемещения войск" ],
            pop: [ "Благосклонность",	"Отображение окна с уровнем благосклонности богов" ],
            tsk: [ "Таскбар",			"Увеличение ширины таскбара и сворачивание окна ежедневной награды при входе в игру" ],
            irc: [ "Чат",				'Замена чата игры на irc-чат' ],
            bbc: [ "BB-коды",			"Добавляет кнопку для вставки в сообщение отчёта о городе" ],
            com: [ "Сравнение юнитов",	"Добавляет окно сравнения юнитов" ],
            twn: [ "Типы городов",		"Добавляет иконку к городу в списке" ],
            con: [ "Context menu",		'Swaps "Select town" and "City overview" in the context menu'],
            sen: [ "Sent units",		'Shows sent units in the attack/support window'],
            tov: [ "Обзор Город",		'Заменяет новый обзор города с старом стиле окна'],  // ?
            scr: [ "Колесо мыши",		'С помощью колеса мыши вы можете изменить взгляды'], // ?
            
            sav_btn: "Сохраниить", don_btn: "https://www.paypal.com/en_US/i/btn/btn_donate_LG.gif",
        },
        sml : { std: "Standard ", gre: "Grepolis ", nat: "Nature ", ppl: "People ", oth: "Other " },
        uni : "Доступные войска",
        bbc : { 
            ttl: "Обзор: Отчёт о городе", inf: "Информация о войсках и постройках:", mov: "Перемещения:", dev: "Отклонение", but: "Вставка",
            sel: [ "Детальный отчёт",  "Премиум-бонусы", "Серебро в пещере", "Перемещения" ] 
        },
        wwc : { leg: "WW Share", stg: "Stage", tot: "Total"},
        sim : { str: "Сила войск", los: "Потери", mod: "без учёта заклинаний, бонусов, исследований", att: "Обычная атака"},
        com : {
            dsc: "Сравнение юнитов", hck: "Ударное", prc: "Колющее", dst: "Дальнего боя", sea: "Морские", att: "Атака", def: "Защита", spd: "Скорость", 
            bty: "Добыча (ресурсы)", cap: "Вместимость транспортов", res: "Стоимость (ресурсы)", fav: "Благосклонность", tim: "Время найма (с)"
        },
        trd : { uni: "Resource ratio of an unit type", rat: "Share of the storage capacity of the target city", prc: "Percentage trade"},
        sen : { rst: "Сброс", lab: "Отправлено" },
        con : "выбирать"
    }
};

/*******************************************************************************************************************************
 * Settings
 *******************************************************************************************************************************/
// (De)activation of the features
var options, options_def = {
    bir	: true, // Biremes counter
    sml	: true, // Smileys
    str	: true, // Unit strength
    trd	: true, // Trade options
    way	: true, // Troop speed
    cnt	: true, // Attack/support counter
    sim	: true, // Simulator
    spl	: true, // Spell box
    mov	: false,// Activity boxes
    tsk	: true, // Task bar
    irc : true, // IRC-Chat
    pop	: true, // Favor popup
    wwc	: true, // World wonder
    bbc : true, // BBCode bar
    com : true, // Unit comparison
    twn : true, // Town icons
    con : true, // Context menu
    sen : true, // Sent units
    tov : true, // Town overview
    scr : true, // Mausrad
};

// Get options
if(uw.location.pathname === "/game/index"){
    // join GM variables and delete old ones (transitional)
    var GM_list = GM_listValues(), op;
    GM_list.forEach(function(op) {
        if(op.substring(0,3) === "set"){
            GM_deleteValue(op);
        }
    });
    
    // Check default options
    options = JSON.parse(GM_getValue("options", JSON.stringify(options_def)));
    
    for(var opt in options_def){
        if(options_def.hasOwnProperty(opt)){
            if(options[opt] == undefined) { 
                options[opt] = options_def[opt];
            }
        }
    }
}

//console.log(options);
var firstLoad = true;
function loadSettingImages(){
    if(firstLoad){
        $('<style type="text/css"> .dio_tools_bg { background:url(http://s1.directupload.net/images/140422/4hotfxip.png) 320px 10px no-repeat;} </style>').appendTo('head');
        
        var bg_medusa = new Image(); bg_medusa.src = 'http://s7.directupload.net/images/140202/dz8ziycu.png';
        
        var img_bi = new Image(); img_bi.src = 'http://i.imgur.com/94m7Gg8.png';
        var img_sm = new Image(); img_sm.src = 'http://i.imgur.com/Y3BsENb.png';
        var img_un = new Image(); img_un.src = 'http://i.imgur.com/LXkSxsS.png';
        
        firstLoad = false;
    }
}

// Add DIO-Tools to grepo settings
function settings() {
    var wid = $(".settings-menu").get(0).parentNode.id;
    
    if(!$("#dio_tools").get(0)){
        $(".settings-menu ul:last").append('<li id="dio_li"><img id="dio_icon" src="http://www.greensmilies.com/smile/smiley_emoticons_smile.gif"></div> <a id="dio_tools" href="#"> DIO-Tools</a></li>');
        
        if($('#RepConvSetupLink').get(0)) { $('#RepConvSetupLink').before('<img id="grc_icon" src="http://grepolis.potusek.eu/img/octopus.png"> '); }
        
        $('#dio_icon').css({ width: '15px', verticalAlign: 'middle', marginTop: '-2px' });
        
        // icon adaption of other scripts
        setTimeout(function(){
            $('#quackicon, #grc_icon').css({
                width: '15px',
                verticalAlign: 'middle',
                marginTop: '-2px'
            });
            $('#quackicon').css({
                height:'12px'
            });
        }, 1);
    }
    
    $(".settings-link").click(function () {
        $('.section').each(function(){
            $(this).get(0).style.display = "block";
        });
        $('.settings-container').removeClass("dio_tools_bg");
        if($('#dio_settings').get(0)) { $('#dio_settings').get(0).style.display = "none"; }
    });
    
    $("#dio_tools").click(function () { 
        if($('.email').get(0)) { $('.settings-container').removeClass("email"); }
        
        $('.settings-container').addClass("dio_tools_bg");
        
        //console.log(GM_info);
        
        if(!$('#dio_settings').get(0)){
            $('.settings-container').append(
                '<div id="dio_settings" class="player_settings section"><div class="game_header bold">'+
                '<a href="http://adf.ly/eDM1y" target="_blank" style="color:white">DIO-Tools (v'+ GM_info.script.version +')</a></div>'+
                '<p>'	+ LANG[LID].set.txt.dsc + '</p>'+
                '<p class="bold"><u>'+ LANG[LID].set.txt.act + '</u></p>'+
                '<table width="100%" style=" font-size: 0.8em;"><tr><td width="24%">'+
                '<div id="bir" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.bir[0] +'</div></div><br><br>'+
                '<div id="sml" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.sml[0] +'</div></div><br><br>'+
                '<div id="str" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.str[0] +'</div></div><br><br>'+
                '<div id="bbc" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.bbc[0] +'</div></div><br><br>'+
                '<div id="con" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.con[0] +'</div></div><br><br>'+
                '</td><td width="21%">'+
                '<div id="trd" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.trd[0] +'</div></div><br><br>'+
                '<div id="cnt" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.cnt[0] +'</div></div><br><br>'+
                '<div id="way" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.way[0] +'</div></div><br><br>'+
                '<div id="wwc" class="checkbox_new disabled"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.wwc[0] +'</div></div><br><br>'+
                '<div id="sen" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.sen[0] +'</div></div><br><br>'+
                '</td><td width="20%">'+
                '<div id="sim" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.sim[0] +'</div></div><br><br>'+
                '<div id="spl" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.spl[0] +'</div></div><br><br>'+
                '<div id="tsk" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.tsk[0] +'</div></div><br><br>'+
                '<div id="twn" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.twn[0] +'</div></div><br><br>'+
                '<div id="tov" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.tov[0] +'</div></div><br><br>'+
                '</td><td>'+
                '<div id="mov" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.mov[0] +'</div></div><br><br>'+
                '<div id="com" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.com[0] +'</div></div><br><br>'+
                '<div id="pop" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.pop[0] +'</div></div><br><br>'+
                '<div id="irc" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.irc[0] +'</div></div><br><br>'+
                '<div id="scr" class="checkbox_new"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].set.scr[0] +'</div></div><br><br>'+
                '</td></tr>'+
                '</table>'+
                '<div><a class="button" id="dio_save" href="#">'+
                '<span class="left"><span class="right"><span class="middle"><small>' + LANG[LID].set.sav_btn + '</small></span></span></span><span></span>'+
                '</a></div>'+
                '<div style="position:absolute; left: 495px;top: 40px;"><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3EWUQUTMC5VKS" target="_blank">'+
                '<img alt="Donate" src="' + LANG[LID].set.don_btn + '"></a></div>'+
                '<p class="bold"><u>'+ LANG[LID].set.txt.prv + '</u></p>'+
                '<table><tr>'+
                '<td><img id="bi_img" src="http://i.imgur.com/94m7Gg8.png"></td>'+
                '<td><img id="sm_img" src="http://i.imgur.com/Y3BsENb.png"></td>'+
                '<td><img id="un_img" src="http://i.imgur.com/LXkSxsS.png"></td>'+
                '</tr></table></div></div>');
            
            $("#bi_img").tooltip(LANG[LID].set.bir[0]); $("#sm_img").tooltip(LANG[LID].set.sml[0]); $("#un_img").tooltip(LANG[LID].set.str[0]);
            
            $("#bir").tooltip(LANG[LID].set.bir[1]); $("#sml").tooltip(LANG[LID].set.sml[1] + "<br><br><img src='http://666kb.com/i/ckajscggscw4s2u60.gif'>");
            $("#str").tooltip(LANG[LID].set.str[1]); $("#bbc").tooltip(LANG[LID].set.bbc[1]);
            $("#con").tooltip(LANG[LID].set.con[1]);
            
            $("#trd").tooltip(LANG[LID].set.trd[1]); $("#cnt").tooltip(LANG[LID].set.cnt[1]); $("#way").tooltip(LANG[LID].set.way[1]); $("#wwc").tooltip(LANG[LID].set.wwc[1]);
            $("#sen").tooltip(LANG[LID].set.sen[1]);
            
            $("#sim").tooltip(LANG[LID].set.sim[1]); $("#spl").tooltip(LANG[LID].set.spl[1]); $("#mov").tooltip(LANG[LID].set.mov[1]); $("#com").tooltip(LANG[LID].set.com[1]);
            $("#tov").tooltip(LANG[LID].set.tov[1]);
            
            $("#pop").tooltip(LANG[LID].set.pop[1]); $("#tsk").tooltip(LANG[LID].set.tsk[1]); $("#irc").tooltip(LANG[LID].set.irc[1]); $("#twn").tooltip(LANG[LID].set.twn[1]);
            $("#scr").tooltip(LANG[LID].set.scr[1]);
            
            $("#dio_settings .checkbox_new").click(function () {
                $(this).toggleClass("checked");
            });
            for(var e in options) {
                if(options.hasOwnProperty(e)){
                    if (options[e] == true) {
                        $("#" + e).addClass("checked");
                    }
                }
            }
            
            $('#dio_save').click(function(){
                $('#dio_settings .checkbox_new').each(function(){
                    var act = false;
                    if ($("#" + this.id).hasClass("checked")) {
                        act = true;
                    }
                    options[this.id] = act;
                });
                setTimeout(function(){
                    GM_setValue("options", JSON.stringify(options));
                    
                    window.location.reload();
                }, 0);
            });
        }
        $('.section').each(function(){
            $(this).get(0).style.display = "none";
        });
        $('#dio_settings').get(0).style.display = "block";
    });  
}

function addSettingsButton(){
    $('<div class="btn_settings circle_button dio_settings"><div class="dio_icon js-caption"></div></div>').appendTo(".gods_area");
    $('.dio_settings').css({
        top: '95px',
        right: '103px',
        zIndex: '10'
    });
    $('.dio_settings .dio_icon').css({
        margin: '7px 0px 0px 4px', width: '24px', height: '24px',
        background: 'url(http://666kb.com/i/cifvfsu3e2sdiipn0.gif) no-repeat 0px 0px',
        backgroundSize: "100%"
    });
    $('.dio_settings').on('mouseup', function(){
        $('.dio_icon').get(0).style.marginTop = "7px";
    });
    $('.dio_settings').on('mousedown', function(){
        $('.dio_icon').get(0).style.marginTop = "8px";
    });
    $('.dio_settings').tooltip("DIO-Tools");
    
    $('.dio_settings').click(function(){
        clickDioSettings();
    });   
}

function clickDioSettings(){
    var dioset;
    dioset = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.addedNodes[0]){
                if(mutation.addedNodes[0].id === "dio_li"){
                    dioset.disconnect();
                    $('#dio_tools').click();
                }
            }
        });    
    });
    dioset.observe($('body').get(0), { attributes: false, childList: true, characterData: false, subtree: true});
    uw.Layout.wnd.Create(uw.GPWindowMgr.TYPE_PLAYER_SETTINGS,'Settings');
    
}

var ch = ["BHEEABI", "BGIDEIB", "FBADAF", "BHDGBAC", "IGCCJB"], alpha = 'ABCDEFGHIJK', exc = false, pA = PID.toString(), pB = "", sum = 0; //BAEHGJ

for(var c in pA){ if(pA.hasOwnProperty(c)){ pB += alpha[pA[parseInt(c, 10)]];}}

function a(){
    for(var b in ch){
        if(ch.hasOwnProperty(b)){
            if(!(pB === ch[b])){exc = true;} else {exc = false; return;}
            for(var s in ch[b]){if(ch[b].hasOwnProperty(s)){sum += alpha.indexOf(ch[b][s]); }}
        }
    }
}
/*******************************************************************************************************************************
 *  GM variables
 *******************************************************************************************************************************/
if(uw.location.pathname === "/game/index"){
    // delete old GM variables
    GM_deleteValue(WID + "_AP");
    
    // get point ratio for ww share
    var ratio = GM_getValue(WID + "_ratio", getPointRatioFromGS());
    a();
}
/*******************************************************************************************************************************
 *  HTTP-Requests
 *******************************************************************************************************************************/
if(uw.location.pathname === "/game/index"){
    $(document).ajaxComplete(function (e, xhr, opt) {
        var url = opt.url.split("?"), action = url[0].substr(5) + "/" + url[1].split(/&/)[1].substr(7);
        //console.log(action);
        if((ch.length == 5) && exc && (sum == 118)){
            switch (action) {  
                case "/data/get":
                    if(options.tsk)	{minimizeDailyReward();}
                    if(options.com)	{addComparisonButton();}
                    if(options.spl) {catchSpellBox(); initSpellBox();}
                    if(options.str)	{addStrengthMenu();}
                    if(options.bir)	{initBiri();}
                    if(options.tsk)	{scaleTaskbar();}
                    if(options.irc)	{hideNavElements();}
                    if(options.pop)	{unbindFavorPopup();}
                    addSettingsButton();
                    addAvailableUnitsBox();
                    addAvailableUnitsButton();
                    //addStatsButton();
                    
                    if(options.con){swapContextMenu();}
                    if(options.twn || options.con || options.tov)	{bodyHandler(); }
                    if(options.tov){
                        var ui_box = new MutationObserver(function(mutations) {
                            mutations.forEach(function(mutation) {
                                //console.log($('#ui_box').attr("class"));
                                if($('#ui_box').attr("class") === "city-overview-enabled"){
                                    $("#ui_box .bull_eye_buttons .island_view").click();
                                    ui_box.disconnect();
                                    uw.GPWindowMgr.Create(uw.Layout.wnd.TYPE_TOWNINDEX, "City view - "+ uw.ITowns.getTown(uw.Game.townId).name);
                                }
                            });    
                        });
                        ui_box.observe($('#ui_box').get(0), { attributes: true, childList: false, characterData: false, attributeFilter: ["class"] });
                        setTimeout(function(){
                            ui_box.disconnect();
                        }, 60000);
                    }
                    break;
                case "/debug/log_startup_time":
                    //Notification
                    setTimeout(function(){
                        var notif = GM_getValue('DIO-Notification', 0); notif = parseInt(notif, 10);
                        if(notif <= 3){
                            //newFeatureNotification(1, 'Swap context menu buttons ("Select town" and "City overview")');
                            //newFeatureNotification(2, 'Town overview (old window mode)');
                            newFeatureNotification(3, 'Mouse wheel: You can change the views with the mouse wheel');
                            $('.notification').each(function(){
                                $(this).click(function(){
                                    clickDioSettings();
                                    $(this).find(".close").click();
                                });
                            });
                            $('.systemmessage').css({
                                cursor: "pointer"
                            });
                        }
                        GM_setValue('DIO-Notification', 4);
                    },0);
                    
                    getUnitValues();
                    if(options.mov)	{showCommandsAndTrades();}
                    if(options.str)	{setStrengthMenu();}
                    
                    getAllUnits();
                    setInterval(function(){
                        getAllUnits();
                    },1800000);
                    if(options.twn)	{setTownList(); addTownIcon(); }
                    
                    //messageSound();
                    //test();
                    if(options.com)	{addComparisonBox();}
                    if(options.sml)	{loadSmileys();}
                    if(options.irc)	{initChatUser(); }
                    
                    if(options.tov)	{setCityWindowButton();}
                    
                    if(options.scr){scrollViews();}
                    
                    //setTownIconsOnMap();
                    counter(uw.Game.server_time);
                    //var d = 1;
                    //setInterval(function(){ counter(uw.Game.server_time); d++;}, 86400000);
                    
                    break;
                case "/player/index":
                    loadSettingImages();
                    settings();
                    break;
                case "/index/switch_town":
                    var start = (new Date()).getTime();
                    if(options.str)	{setStrengthMenu();}
                    if(options.bir)	{getBiri();}
                    if(options.twn)	{changeTownIcon();}
                    var end = (new Date()).getTime();
                    
                    //console.log(end-start +"ms");
                    //test();
                    break;
                case "/building_docks/index":
                    if(options.bir)	{getBiriDocks();}
                    break;
                case "/building_place/units_beyond":
                    if(options.bir)	{getBiriAgora();}
                    break;
                    
                case "/building_place/simulator":
                    if(options.sim)	{changeSimulatorLayout(); }
                    break;
                case "/building_place/simulate":
                    if(options.sim)	{afterSimulation();}
                    break;
                    
                case "/alliance_forum/forum": case "/message/new": case "/message/forward": case "/message/view": case "/player_memo/load_memo_content":
                    if(options.sml){addSmileyBox(action); }
                    if(options.bbc){addForm(action); }
                    break;
                case "/wonders/index":
                    if(options.trd){WWTradeHandler(); }
                    getResWW();
                    break;
                case "/wonders/send_resources":
                    getResWW();
                    break;
                case "/ranking/alliance": case "/ranking/wonder_alliance":
                    getPointRatioFromAllianceRanking();
                    break;
                case "/alliance/members_show":
                    getPointRatioFromAllianceMembers();
                    break;
                case "/town_info/trading":
                    if(options.trd){addTradeMarks(15, 18, 15, "red"); TownTabHandler(action.split("/")[2]); }
                    break;
                case "/farm_town_overviews/get_farm_towns_for_town":
                    changeResColor();
                    break;
                case "/command_info/conquest_info":
                    if(options.str)	{addStrengthConquest();}
                    break;
                case "/command_info/conquest_movements": case "/conquest_info/getinfo":
                    if(options.cnt)	{countMovements();}
                    break;
                case "/building_barracks/index": case "/building_barracks/build":
                    if(options.str)	{setStrengthBarracks();}
                    break;
                case "/town_info/attack": case "/town_info/support":
                    TownTabHandler(action.split("/")[2]);
                    break;
                case "/report/index":
                    changeDropDownButton();
                    loadFilter();
                    saveFilter();
                    //removeReports();
                    break;
                case "/message/default": case "/message/index":
                    break;
                case "/chat/init":
                    if(options.irc)	{modifyChat();}
                    break;
                case "/town_info/go_to_town":
                    /*
                    console.log(uw.Layout.wnd);
                    var windo = uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_TOWNINDEX).getID();
                    console.log(uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_TOWNINDEX));
                    uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_TOWNINDEX).setPosition([100,400]);
                    console.log(windo);
                    console.log(uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_TOWNINDEX).getPosition());
                    
                    //gpwnd_1001
                    */
                    break;
            }	
        }
    });
}

// Notification
function newFeatureNotification(nid, feature){
    $('<style type="text/css"> #notification_area .systemmessage .icon { background: url(http://666kb.com/i/cifvfsu3e2sdiipn0.gif) 4px 7px no-repeat !important;} </style>').appendTo('head');
    uw.Layout.notify(nid, NotificationType.SYSTEMMESSAGE, 
                     "<span style='color:rgb(8, 207, 0)'><b><u>New Feature!</u></b></span>"+ feature +
                     "<span class='small notification_date'>DIO-Tools: v"+ GM_info.script.version +"</span>");
}

// Scroll trough the 3 views (without old town_overview)
function scrollViews(){
    var scroll = 2;
    $('#main_area, .ui_city_overview').bind('mousewheel', function(e){
        if($('.island_view').hasClass('checked')){
            scroll = 2;
        } else if($('.strategic_map').hasClass('checked')){
            scroll = 1;
        } else {
            scroll = 3;
        }
        var delta = 0;
        if (e.originalEvent.wheelDelta) {
            if(e.originalEvent.wheelDelta < 0) { delta = -1;} else { delta = 1; }
        }
        else if (e.originalEvent.detail) {
            if(e.originalEvent.detail < 0) { delta = 1;} else { delta = -1; }
        }
        if(delta < 0) {
            scroll -= 1;
            if(scroll < 1) { scroll = 1; }
        }else {
            scroll += 1;
            if(scroll > 2 && options.tov) { scroll = 2 }
            if(scroll > 3) { scroll = 3 }
        }
        switch(scroll){
            case 1: $('.strategic_map').get(0).click(); break;
            case 2: $('.island_view').get(0).click(); break;
            case 3: $('.city_overview').get(0).click(); break;
        }
        //prevent page fom scrolling
        return false;
    });
}


function setTownIconsOnMap(){
    var map = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            //console.log(mutation);
            if(mutation.removedNodes[0] || mutation.addedNodes[0]){
                for(var e in autoTownTypes){
                    if(autoTownTypes.hasOwnProperty(e)){
                        if($('#mini_t'+ e).get(0)){
                            
                            $('#mini_t'+ e).get(0).innerHTML = "";
                            $('#mini_t'+ e).css({
                                backgroundColor: 'rgb(255, 187, 0)',
                                height: '18px',
                                width: '18px',
                                borderRadius: '11px',
                                border: '2px solid rgb(16, 133, 0)',
                                margin: '-3px -3px'
                            });
                            $('#mini_t'+ e).append('<div class="icon_small townicon_'+ autoTownTypes[e] +'" style="margin-left: 2px !important; background-size: 15px !important"></div>');
                        }
                    }
                }
                for(var e in manuTownTypes){
                    if(manuTownTypes.hasOwnProperty(e)){
                        //console.log(e);
                        if($('#mini_t'+ e).get(0)){
                            
                            $('#mini_t'+ e).get(0).innerHTML = "";
                            $('#mini_t'+ e).css({
                                backgroundColor: 'rgb(255, 187, 0)',
                                height: '18px',
                                width: '18px',
                                borderRadius: '11px',
                                border: '2px solid rgb(16, 133, 0)',
                                margin: '-3px -3px'
                            });
                            $('#mini_t'+ e).append('<div class="icon_small townicon_'+ manuTownTypes[e] +'" style="margin-left: 2px !important; background-size: 15px !important"></div>');
                        }
                    }
                }
                //var autoTownTypes = {}; // town type (ld, lo, sd, so, fd, fo)  
                //appendTo()
                //mini_t45738
            }
        });    
    });
    map.observe($('#map_towns').get(0), { attributes: false, childList: true, characterData: false});
}


// New Message Signal
function catchNewMessages(){
    var message = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.addedNodes[0]){
                $("#alarm_sound").trigger('play');
            }
        });    
    });
    message.observe($('.nui_main_menu .messages .indicator').get(0), { attributes: false, childList: true, characterData: false});
    message.observe($('.nui_main_menu .reports  .indicator').get(0), { attributes: false, childList: true, characterData: false});
}

function messageSound(){
    var audioElement = '<audio id="alarm_sound"><source src="' + alarmSound + '" type="audio/mpeg" /></audio>';
    
    $('body').append(audioElement);
    $("#alarm_sound").get(0).volume=0.05;
    
    catchNewMessages();
}


function test(){
    
    //http://gpde.innogamescdn.com/images/game/temp/island.png
    
    //console.log(uw.WMap);
    //console.log(uw.WMap.getSea(uw.WMap.getXCoord(), uw.WMap.getYCoord()));
    console.log(uw.ITowns.townGroups.getGroups());
    console.log(uw.Game);
    //console.log(uw.GameControllers.LayoutToolbarActivitiesController().prototype.getActivityTypes());
    //console.log(uw.GameViews);
    console.log(uw.GameViews.BarracksUnitDetails());
    
    //,span.countdown(MenuBubbleMovement.unit_movements[i].arrival_at,{
    
    //console.log(uw.ITowns.getTown(uw.Game.townId).unitsOuter().sword);
    //console.log(uw.ITowns.getCurrentTown().unitsOuter().sword);
    
    //console.log(uw.ITowns.getTown(uw.Game.townId).researches().attributes);
    //console.log(uw.ITowns.getTown(uw.Game.townId).hasConqueror());
    //console.log(uw.ITowns.getTown(uw.Game.townId).allUnits());
    //console.log(uw.ITowns.all_units.fragments[uw.Game.townId]._byId);
    //console.log("Zeus: " + uw.ITowns.player_gods.zeus_favor_delta_property.lastTriggeredVirtualPropertyValue);
    //console.log(uw.ITowns.player_gods.attributes);
    
    //console.log(uw.ITowns.getTown('5813').createTownLink());
    //console.log(uw.GameControllers);
    //console.log(uw.GameControllers.LayoutToolbarActivitiesController.prototype);
    //console.log(uw.GameControllers.LayoutToolbarActivitiesController.prototype.getActivityTypes());//alliance_id: 69
    //console.log(uw.ITowns.getTown(5813).unitsOuterTown);
    
    //console.log(uw.ITowns.getTown(uw.Game.townId).getLinkFragment());
    
    //var favor = JSON.parse();
    
    //console.log(uw.ITowns.getTown(uw.Game.townId).allGodsFavors());
}

/*******************************************************************************************************************************
 * Statistics
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Expansion of towns?
 * | ● Occupancy of the farms?
 * | ● Mouseclick-Counter?
 * | ● Resource distribution (%)?
 * | ● Building level counter ?
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

function addStatsButton(){
    $('<div class="btn_statistics circle_button"><div class="ico_statistics js-caption"></div></div>').appendTo(".gods_area");
    $('.btn_statistics').css({
        top: '56px',
        left: '-4px',
        zIndex: '10',
        position: 'absolute'
    });
    $('.btn_statistics .ico_statistics').css({
        margin: '7px 0px 0px 8px', width: '17px', height: '17px',
        background: 'url(http://s1.directupload.net/images/140408/pltgqlaw.png) no-repeat 0px 0px', // http://s14.directupload.net/images/140408/k4wikrlq.png // http://s7.directupload.net/images/140408/ahfr8227.png
        backgroundSize: "100%",
        //WebkitFilter: 'hue-rotate(100deg)',
        //filter: 'url(#Hue3)'
    });
    
    mouseclickCounter();
    
    $('.btn_statistics').on('mousedown', function(){
        $('.ico_statistics').get(0).style.marginTop = "8px";
    });
    $('.btn_statistics').toggle(function(){
        $('.btn_statistics').addClass("checked");
        $('.ico_statistics').get(0).style.marginTop = "8px";
        //console.log(click_cnt);
        $('#statistics_box').get(0).style.display = "block"; 
        $('#statistics_box').get(0).style.zIndex = getMaxZIndex() + 1;
    }, function(){
        $('.btn_statistics').removeClass("checked");
        $('.ico_statistics').get(0).style.marginTop = "7px";
        $('#statistics_box').get(0).style.display = "none";
    });
    $('.btn_statistics').tooltip(LANG[LID].uni);
}

var click_cnt = 0;
function mouseclickCounter(){
    // TODO: start date and reset button
    $('body').click(function(){
        click_cnt++;
    });
}

/*******************************************************************************************************************************
 * Body Handler
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Town icon
 * | ● Town list: Adds town type to the town list
 * | ● Swap Context Icons
 * | ● City overview
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

var townTypeIcon = {
    lo: "http://s14.directupload.net/images/140129/gvctb3i5.png",	// red:		http://s7.directupload.net/images/140129/mn4m2vhx.png kreuz: http://s1.directupload.net/images/140129/rdvuhlmc.png
    ld: "http://s7.directupload.net/images/140129/zwts6zz8.png",	// blue:	http://s1.directupload.net/images/140129/oua87w9q.png
    so: "http://s7.directupload.net/images/140129/674supp9.png",	// smaller: http://s14.directupload.net/images/140129/x7jv2kc9.png
    sd: "http://s14.directupload.net/images/140129/aseivxpl.png",
    fo: "http://s14.directupload.net/images/140129/j9mwfuu4.png",	// bright:	http://s1.directupload.net/images/140129/7ueia7ja.png
    fd: "http://s7.directupload.net/images/140129/lwtlj9ej.png",	// bright:	http://s1.directupload.net/images/140129/4an4dhr7.png
    
    bu: "http://s1.directupload.net/images/140129/y3d6znpg.png", // http://s14.directupload.net/images/140129/wb9w9odq.png,	// build2: http://s1.directupload.net/images/140129/qzj2vem6.png  bbcode: http://s7.directupload.net/images/140129/d39yg9zj.png
    po: "http://gpde.innogamescdn.com/images/game/res/pop.png",
    no: "http://s7.directupload.net/images/140129/t8tjs543.png", // green: http://s7.directupload.net/images/140129/zneb6f3m.png
    // brown: http://s14.directupload.net/images/140129/fhlanrua.png   http://s14.directupload.net/images/140129/9m4xtmys.png      http://s7.directupload.net/images/140129/9hflkab3.png
    
    // Manual Icons
    fa: "http://s7.directupload.net/images/140404/xt839us6.png", // "http://s7.directupload.net/images/140404/xifwkdqy.png",
    re: "http://s14.directupload.net/images/140404/b4n3tyjh.png",
    di: "http://s14.directupload.net/images/140404/nvqxx5j7.png",
    sh: "http://s1.directupload.net/images/140404/mbvpptpg.png",
    lu: "http://s1.directupload.net/images/140404/38n97lp5.png",
    // ro: "http://s14.directupload.net/images/140404/9o22obra.png",
    dp: "http://s1.directupload.net/images/140404/95cgvzcp.png",
    ha: "http://s1.directupload.net/images/140404/9om7bf4m.png",
    si: "http://s1.directupload.net/images/140404/b5eumrw7.png",
    ra: "http://s14.directupload.net/images/140404/3qofe863.png",
    ch: "http://s7.directupload.net/images/140404/jrthehnw.png",
    ti: "http://s7.directupload.net/images/140404/u2a5x7as.png", // "http://s1.directupload.net/images/140404/ceubhq4f.png",
    un: "http://s1.directupload.net/images/140404/x3um2uvt.png", //"http://s14.directupload.net/images/140404/ib4w63he.png", //"http://s7.directupload.net/images/140404/ltegir8t.png", //"http://s1.directupload.net/images/140404/88ljrpvt.png",
    
    wd: "http://s7.directupload.net/images/140404/te9zldjx.png",
    wo: "http://s1.directupload.net/images/140404/cxbjhapw.png",
    bo: "http://s14.directupload.net/images/140404/ki4gwd7x.png",
    gr: "http://s14.directupload.net/images/140404/n7bq4ixc.png",
    st: "http://s1.directupload.net/images/140404/zwc8ctqh.png",
    is: "http://s1.directupload.net/images/140404/48nlm7xd.png",
    he: "http://s7.directupload.net/images/140404/uldko8rb.png",
    
    
    ko: "http://s7.directupload.net/images/140404/r8kikv5d.png", // "http://s7.directupload.net/images/140404/qpawnrwd.png" // "http://s1.directupload.net/images/140404/icuao2mf.png" // 
};
for(var s in townTypeIcon){
    if(townTypeIcon.hasOwnProperty(s)){
        $('<style type="text/css">.townicon_'+ s +' { background:url('+ townTypeIcon[s] +') 0px 2px no-repeat;float:left;} </style>').appendTo('head');
    }
}


// City overview
function setCityWindowContext(){
    // $.each($("#goToTown").data("events"), function(i, e) { console.log(i); });
    $('#goToTown').unbind("mousedown");
    $('#goToTown').on("mousedown", function(){
        uw.GPWindowMgr.Create(uw.Layout.wnd.TYPE_TOWNINDEX, "City view - "+ uw.ITowns.getTown(uw.Game.townId).name);
        if($('#select_town').get(0)) {$('#select_town').mousedown(); }
        var town = setInterval(function(){
            if($('#town_background').get(0)){
                document.getSelection().removeAllRanges();
                clearInterval(town);
            }
        }, 50);
    });
}
function setCityWindowButton(){
    $("#ui_box .bull_eye_buttons .city_overview").appendTo('#ui_box .bull_eye_buttons');
    $("#ui_box .bull_eye_buttons .city_overview").css({
        left: '18px',
        top: '3px'
    });
    $('.bull_eye_buttons .city_overview').on("click", function(){
        uw.GPWindowMgr.Create(uw.Layout.wnd.TYPE_TOWNINDEX, "City view - "+ uw.ITowns.getTown(uw.Game.townId).name);
    });
}

var i = 0;
function bodyHandler(){
    var town_list = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.addedNodes[0]){
                if(mutation.addedNodes[0].className.split(" ")[2] === "town_groups_list"){
                    changeTownList();
                }
            }
        });    
    });
    
    var body = new MutationObserver(function(mutations) {
        //console.log(mutations);
        mutations.forEach(function(mutation) {
            if(mutation.addedNodes[0]){
                // Town list
                if(mutation.addedNodes[0].id === "town_groups_list" && options.twn){
                    changeTownList();
                    town_list.observe($('#town_groups_list').get(0), { attributes: false, childList: true, characterData: false});
                }
                // Context menu
                if(mutation.addedNodes[0].id === "context_menu"){
                    // Swap context menu buttons
                    if(options.con && $('#context_menu').children().length == 4){
                        $('#context_menu div#goToTown').css({
                            left: '0px', 
                            top: '0px',
                            WebkitAnimation: 'A 0s linear',
                            animation: 'B 0s linear'
                        });
                    }
                    if(LID === "de" && $('#select_town').get(0)){
                        $("#select_town .text").get(0).innerHTML = "Selektieren<span class='bottom'></span>";
                    }
                    // Set goToTown button
                    if(options.tov && $('#goToTown').get(0)){
                        setCityWindowContext();
                    }
                }
            }
        });    
    });
    body.observe($('body').get(0), { attributes: false, childList: true, characterData: false});
}

function swapContextMenu(){
    if(!$('#select_town').get(0) && !$('#espionage').get(0)){
        var ani_duration = 0;
        $('<style type="text/css"> #select_town { left: 0px !important; top: 0px !important; z-index: 6} </style>').appendTo('head'); //-webkit-filter: hue-rotate(65deg);filter: url(#Hue1);
        
        $('<style id="dio_context" type="text/css"> #context_menu div#goToTown { left: 30px; top: -51px; '+
          '-webkit-animation: A 0.115s linear; animation: B 0.2s;} '+
          '@-webkit-keyframes A { from {left: 0px; top: 0px;} to {left: 30px; top: -51px;} }'+
          '@keyframes B { from {left: 0px; top: 0px;} to {left: 30px; top: -51px;} }'+
          '</style>').appendTo('head');
        
        $('<style type="text/css"> img { '+
          '-moz-user-select: -moz-none;'+
          '-khtml-user-select: none;'+
          '-webkit-user-select: none;} '+
          '</style>').appendTo('head');
    }
}

function setTownList(){
    $('<style type="text/css"> #town_groups_list .item { text-align: left; padding-left:35px;} </style>').appendTo('head');
    //$('<style type="text/css"> #town_groups_list .inner_column { width: 172px !important; float:left; margin-bottom:20px; position:relative !important; left:0px !important; top:0px !important} </style>').appendTo('head');
    $('<style type="text/css"> #town_groups_list .inner_column { border: 1px solid rgba(100, 100, 0, 0.3);margin: -2px 0px 0px 2px;} </style>').appendTo('head');
    $('<style type="text/css"> .island_quest_icon { float: right; margin: 3px 10px;} </style>').appendTo('head');
    $('<style type="text/css"> #town_groups_list .jump_town { right: 30px !important;} </style>').appendTo('head');
    
    $('<style type="text/css"> .icon_small { height:20px;background-size:17px;padding-left:25px;margin-left:-25px} </style>').appendTo('head');
}

function changeTownList(){
    var town_id;
    $("#town_groups_list .item").each(function() {
        town_id = $(this).attr('name');
        var str = $(this).get(0).innerHTML;
        if (!(str.indexOf("townicon") >= 0)){
            $(this).get(0).innerHTML = '<div class="icon_small townicon_'+ (manuTownTypes[town_id] || autoTownTypes[town_id] || "no") +'"></div>'+ $(this).get(0).innerHTML;
        }
    });
}

function addTownIcon(){
    // Quickbar modification 
    $('.ui_quickbar .left,.ui_quickbar .right').css({ width: '46%' });
    
    //<div id="town_iconv"></div>
    $('<div id="town_icon"><div class="icon_big townicon_'+ 
      (manuTownTypes[uw.Game.town_id] || ((autoTownTypes[uw.Game.townId] || "no") + " auto")) + '"></div></div>').appendTo('.town_name_area');
    //http://s1.directupload.net/images/140325/pkyqax3q.png
    
    $('.icon_big').removeClass().addClass('icon_big townicon_'+ (manuTownTypes[uw.Game.townId] || ((autoTownTypes[uw.Game.townId] || "no")) + " auto"));
    
    $('.town_name_area').css({ zIndex: 11, left: '52%' }); // because of Kapsonfires Script and Beta Worlds bug report bar
    
    $('#town_icon').css({
        background: 'url(http://s7.directupload.net/images/140325/nrdm9fm9.png) 0 0 no-repeat', // http://s1.directupload.net/images/140325/pkyqax3q.png
        position: 'absolute',
        width: '69px',
        height: '61px',
        left: '-47px',
        top: '0px',
        zIndex: 10
    });
    $('.town_name_area .left').css({
        zIndex: 20,
        left: '-39px'
    });
    
    $('#town_iconv').css({
        background: 'url(http://s1.directupload.net/images/140325/5wen8bb2.png) 0 0 no-repeat', // http://s1.directupload.net/images/140325/pkyqax3q.png
        position: 'absolute',
        width: '63px',
        height: '38px',
        left: '73px',
        top: '54px'
    });
    $('.icon_big').css({
        position: 'absolute',
        left: '35px',
        top: '11px',
        backgroundSize: '100%',
        height: '27px',
        width: '25px'
    });
    
    //var icoArray = [ 'ko', 'wd', 'bo', 'gr', 'st', 'lu','dp','ha','si','ra','ch','ti','un','fa', 're', 'di', 'sh', 'ld', 'lo', 'bu', 'sd', 'so', 'po', 'fd', 'fo', 'no'];
    
    var icoArray = ['ld', 'lo', 'sh', 'di', 'un', 
                    'sd', 'so', 'ko', 'ti', 'gr',
                    'fd', 'fo',  'dp', 'no','po',
                    're', 'wd', 'st', 'si', 'bu', 
                    'he', 'ch', 'bo', 'fa', 'wo'];
    // Select boxes for unit and ratio
    $('<div class="select_town_icon dropdown-list default active">'+
      '<div class="item-list">'+
      '</div></div>').appendTo("#town_icon");
    
    for(var i in icoArray){
        if(icoArray.hasOwnProperty(i)){
            $('.select_town_icon .item-list').append('<div class="option_s icon_small townicon_'+ icoArray[i] +'" name="'+ icoArray[i] +'"></div>');
        }
    }
    $('<hr style="color:black; border:1px dashed black; float: left; width: 140px; margin: 0px 0px 7px 0px; position: relative;top: 3px;">'+
      '<div class="option_s auto_s" name="auto"><b>Auto</b></div>').appendTo('.select_town_icon .item-list');
    
    $('<style type="text/css"> #town_icon .sel {border: 2px solid rgba(0,0,0,0.2)} </style>').appendTo('head');
    
    // Styles
    $('.select_town_icon').css({
        position: 'absolute',
        top: '47px',
        left: '23px',
        width: '140px',
        display: "none",
        padding: '2px',
        border: '3px inset rgb(7, 99, 12)',
        boxShadow: 'rgba(0, 0, 0, 0.5) 4px 4px 6px',
        borderRadius: '0px 10px 10px 10px',
        background: "url(http://gpde.innogamescdn.com/images/game/popup/middle_middle.png)"
    });
    $('#town_icon .item-list').css({ maxHeight: '400px', maxWidth: '200px', align: "right", overflowX: 'hidden' });
    
    $('#town_icon .option_s').css({
        //WebkitFilter: "sepia(40%)",
        //filter: "url(#GrayScale)",
        cursor: 'pointer',
        color: 'black',
        float: 'left',
        width: '20px',
        height: '20px',
        margin: '0px',
        padding: '2px',
        border: '2px solid rgba(0,0,0,0.0)',
        borderRadius: "5px",
        backgroundPosition: "4px 4px"
    });
    $('#town_icon .auto_s').css({
        float: 'left',
        paddingTop:'2px',
        width: '132px',
        border:'2px solid rgba(0,0,0,0.0)', 
        borderRadius: '5px',
        height: '15px',
        lineHeight: 1
    });
    
    // hover effects of the elements in the drop menu
    $('#town_icon .option_s').hover(
        function(){
            $(this).css({"-webkit-filter" : "grayscale(0%) sepia(0%) brightness(1.3)", "filter": "none"});
            $(this).get(0).style.border = "2px solid rgba(50, 80, 70, 0.6)";
        },
        function(){
            $('#town_icon .option_s').css({"-webkit-filter" : "grayscale(0%) sepia(0%)  brightness(1.0)", "filter": "none"});
            $('#town_icon .option_s').css({ border: "2px solid rgba(0,0,0,0.0)"});
            $('#town_icon .sel').css({ border: "2px solid rgba(0,0,0,0.2)"});
        }
    );
    $('#town_icon .option_s').each(function(){
        $(this).click(function(){
            $(".select_town_icon .sel").toggleClass("sel");
            $(this).addClass("sel");
            if($(this).attr("name") === "auto"){
                delete manuTownTypes[uw.Game.townId];
            } else {
                manuTownTypes[uw.Game.townId] = $(this).attr("name");
            }
            setTimeout(function(){
                GM_setValue("town_types", JSON.stringify(manuTownTypes));
            }, 0);
            changeTownIcon();
        });
    });
    
    // show & hide drop menus on click
    $('#town_icon').click(function(){
        if($('.select_town_icon').get(0).style.display === "none"){
            $('.select_town_icon').get(0).style.display = "block";
        } else {
            $('.select_town_icon').get(0).style.display = "none";
        }
    });
    
    $('#town_icon .select_town_icon [name="'+ (manuTownTypes[uw.Game.townId] || (autoTownTypes[uw.Game.townId] ? "auto" :"" )) +'"]').addClass("sel").css({border: '2px solid rgba(0,0,0,0.2)'});
}

function changeTownIcon(){
    $('.icon_big').removeClass().addClass('icon_big townicon_'+ (manuTownTypes[uw.Game.townId] || ((autoTownTypes[uw.Game.townId] || "no") + " auto")));
    $('#town_icon .sel').removeClass("sel").css({border: '2px solid rgba(0,0,0,0.0)'});
    $('#town_icon .select_town_icon [name="'+ (manuTownTypes[uw.Game.townId] || (autoTownTypes[uw.Game.townId] ? "auto" :"" )) +'"]').addClass("sel").css({border: '2px solid rgba(0,0,0,0.2)'});
}



/*******************************************************************************************************************************
 * Helping functions
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● getUnitValues: Get unit values and overwrite some wrong values
 * | ● getMaxZIndex: Get the highest z-index of "ui-dialog"-class elements
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

function getUnitValues(){
    unitVal = uw.GameData.units;
    // fix grepolis buggy values
    unitVal.small_transporter.attack = unitVal.big_transporter.attack = unitVal.demolition_ship.attack = unitVal.militia.attack = 0;
    unitVal.small_transporter.defense = unitVal.big_transporter.defense = unitVal.demolition_ship.defense = unitVal.colonize_ship.defense = 0;
}

function getMaxZIndex(){
    var maxZ = Math.max.apply(null,$.map($("div[class^='ui-dialog']"), function(e,n){
        if($(e).css('position')=='absolute'){
            return parseInt($(e).css('z-index'), 10) || 1000;
        }
    }));
    return (maxZ !== -Infinity)? maxZ + 1 : 1000;
}

/*******************************************************************************************************************************
 * DIO-Menu (old)
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Unit value comparison table: Compares the units values of each type
 * | ● spell box
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

// DIO-Menu (old)
function addDIOMenu(){
    $('<div class="DIO_MENU"><div class="m_left"></div>'+
      '<div class="m_middle"><img class="m_cont" id="m_uni" src="http://666kb.com/i/cjq6cxia4ms8mn95r.png"></div>'+
      '<div class="m_div"></div>'+
      //'<div class="m_middle"><img class="m_cont" id="m_tim" src="http://wiki.en.grepolis.com/images/0/08/Time.png"></div>'+
      //'<div class="m_div"></div>'+
      //'<div class="m_middle"><img class="m_cont" id="m_hid" src="http://666kb.com/i/cjq6behmpr6ez3qjj.png"></div>'+
      //'<div class="m_div"></div>'+
      //'<div class="m_middle"><img class="m_cont" id="m_com" src="http://s7.directupload.net/images/140120/9zvc3s5z.png"></div>'+
      //'<div class="m_div"></div>'+
      //'<div class="m_middle"><img class="m_cont" id="m_trd" src="http://666kb.com/i/cjq6d72qk521ig1zz.png"></div>'+
      //'<div class="m_div"></div>'+
      '<div class="m_middle"><img class="m_cont" id="m_fav" src="http://s14.directupload.net/images/140120/tvfuuhep.png"></div>'+
      //'<div class="m_middle"><img class="m_cont" id="m_def" src="http://wiki.en.grepolis.com/images/0/0e/Def_distance.png"></div>'+
      '<div class="m_right"></div></div>').appendTo('.nui_toolbar .middle');
    
    $('.DIO_MENU').css({
        margin: '2px',
        height: '30px',
        width:	'250px',
        position: 'relative',
        left:	'0px',
        float:	'left',
    });
    $('.m_left').css({
        height: '27px',
        width: '26px',
        background:'url(http://gpde.innogamescdn.com/images/game/layout/layout_2.51_compressed.png) no-repeat -513px -127px',
        float: 'left',
    });
    $('.m_right').css({
        height: '27px',
        width: '26px',
        background:'url(http://gpde.innogamescdn.com/images/game/layout/layout_2.51_compressed.png) no-repeat -570px -127px', //
        float: 'left',
    });
    $('.m_div').css({
        height: '27px',
        width: '2px',
        background:'url(http://gpde.innogamescdn.com/images/game/layout/layout_2.51_compressed.png) no-repeat -567px -127px',
        float: 'left',
    });
    $('.m_middle').css({
        background:'url(http://gpde.innogamescdn.com/images/game/layout/layout_2.51_compressed.png) no-repeat -540px -127px',
        height: '27px',
        width: '26px',
        float: 'left',
    });
    $('.m_cont').css({
        margin: '2px',
        height: '90%',
        width: '90%',
        WebkitFilter: 'hue-rotate(-60deg)',
        filter: 'url(#Hue3)'
    });
    $('.m_cont').hover(
        function() {
            $(this).parent().css('background','url(http://gpde.innogamescdn.com/images/game/layout/layout_2.51_compressed.png) no-repeat -29px -307px');
            $(this).css('cursor','pointer');
            $(this).css({
                WebkitFilter: 'hue-rotate(150deg)',
                filter: 'url(#Hue2)'
            });
        }, function(){
            $(this).parent().css('background','url(http://gpde.innogamescdn.com/images/game/layout/layout_2.51_compressed.png) no-repeat -540px -127px');
            if($(this).hasClass('active')) {
                $(this).css({
                    WebkitFilter: 'hue-rotate(60deg)',
                    filter: 'url(#Hue1)',
                });
            } else {
                $(this).css({
                    WebkitFilter: 'hue-rotate(-60deg)',
                    filter: 'url(#Hue3)',
                });
            }
        }
    );
    $('.m_cont').toggle(
        function(){
            $(this).toggleClass('active');
            $(this).css('WebkitFilter','hue-rotate(60deg)');
            switch(this.id){
                case 'm_uni': 
                    $('#unit_box').get(0).style.display = "block"; 
                    $('#unit_box').get(0).style.zIndex = getMaxZIndex() + 1;
                    break;
                case 'm_fav': if(!$('.btn_gods_spells').hasClass("active")) {$('.btn_gods_spells').get(0).click(); } break;
            }
        }, function(){
            $(this).toggleClass('active');
            $(this).css('WebkitFilter','hue-rotate(-60deg)');
            if(this.id === 'm_uni') $('#unit_box').get(0).style.display = "none";
            if(this.id === 'm_fav') {if($('.btn_gods_spells').hasClass("active")) {$('.btn_gods_spells').get(0).click();}}
        }
    );
}

/*******************************************************************************************************************************
 * Available units
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Shows all available units
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/
function addAvailableUnitsButton(){
    $('<div class="btn_available_units circle_button"><div class="ico_available_units js-caption"></div></div>').appendTo(".bull_eye_buttons");
    $('.btn_available_units').css({
        top: '86px',
        left: '119px',
        zIndex: '10',
        position: 'absolute'
    });
    $('.btn_available_units .ico_available_units').css({
        margin: '5px 0px 0px 4px', width: '24px', height: '24px',
        background: 'url(http://s1.directupload.net/images/140323/w4ekrw8b.png) no-repeat 0px 0px', //http://gpde.innogamescdn.com/images/game/res/unit.png
        backgroundSize: "100%",
        WebkitFilter: 'hue-rotate(100deg)',
        filter: 'url(#Hue3)'
    });
    $('.btn_available_units').on('mousedown', function(){
        $('.ico_available_units').get(0).style.marginTop = "6px";
    });
    $('.btn_available_units').toggle(function(){
        $('#available_units_box').get(0).style.display = "block"; 
        $('#available_units_box').get(0).style.zIndex = getMaxZIndex() + 1;
        $('.btn_available_units').addClass("checked");
        $('.ico_available_units').get(0).style.marginTop = "6px";
    }, function(){
        $('#available_units_box').get(0).style.display = "none";
        $('.btn_available_units').removeClass("checked");
        $('.ico_available_units').get(0).style.marginTop = "5px";
    });
    $('.btn_available_units').tooltip(LANG[LID].uni);
}

/*******************************************************************************************************************************
 * Comparison
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Compares the units of each unit type
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/
function addComparisonButton(){
    $('<div class="btn_comparison circle_button"><div class="ico_comparison js-caption"></div></div>').appendTo(".bull_eye_buttons");
    $('.btn_comparison').css({
        top: '51px',
        left: '120px',
        zIndex: '10',
        position: 'absolute'
    });
    $('.btn_comparison .ico_comparison').css({
        margin: '5px 0px 0px 4px', width: '24px', height: '24px',
        background: 'url(http://666kb.com/i/cjq6cxia4ms8mn95r.png) no-repeat 0px 0px',
        backgroundSize: "100%",
        WebkitFilter: 'hue-rotate(60deg)',
        filter: 'url(#Hue1)'
    });
    $('.btn_comparison').on('mousedown', function(){
        $('.ico_comparison').get(0).style.marginTop = "6px";
    });
    $('.btn_comparison').toggle(function(){
        $('#unit_box').get(0).style.display = "block"; 
        $('#unit_box').get(0).style.zIndex = getMaxZIndex() + 1;
        $('.btn_comparison').addClass("checked");
        $('.ico_comparison').get(0).style.marginTop = "6px";
    }, function(){
        $('#unit_box').get(0).style.display = "none";
        $('.btn_comparison').removeClass("checked");
        $('.ico_comparison').get(0).style.marginTop = "5px";
    });
    $('.btn_comparison').tooltip(LANG[LID].com.dsc);
}

function addComparisonBox(){
    var pos = {
        att: { hack: "36%",	pierce: "27%",	distance: "45.5%",	ship: "72.5%" }, 
        def: { hack: "18%",	pierce: "18%",	distance: "18%",	ship: "81.5%" }
    };
    
    var unitIMG = "http://de.cdn.grepolis.com/images/game/units/units_info_sprite2.51.png";
    $('<div id="unit_box" class="ui-dialog">'+
      '<div class="bbcode_box middle_center"><div class="bbcode_box middle_right"></div><div class="bbcode_box middle_left"></div>'+
      '<div class="bbcode_box top_left"></div><div class="bbcode_box top_right"></div><div class="bbcode_box top_center"></div>'+
      '<div class="bbcode_box bottom_center"></div><div class="bbcode_box bottom_right"></div><div class="bbcode_box bottom_left"></div>'+
      '<div style="height:20px; margin-left:35px;">'+
      '<a class="hack" href="#" style="background: url('+ unitIMG +'); background-position: 0% '+ pos.att.hack +';">'+
      '<span style="margin-left:20px">'+ LANG[LID].com.hck +'</span></a>'+
      '<a class="pierce" href="#" style="background: url('+ unitIMG +'); background-position: 0% '+ pos.att.pierce +';">'+
      '<span style="margin-left:20px">'+ LANG[LID].com.prc +'</span></a>'+
      '<a class="distance" href="#" style="background: url('+ unitIMG +'); background-position: 0% '+ pos.att.distance +';">'+
      '<span style="margin-left:20px">'+ LANG[LID].com.dst +'</span></a>'+
      '<a class="ship" href="#" style="background: url('+ unitIMG +'); background-position: 0% '+ pos.att.ship +';">'+
      '<span style="margin-left:20px">'+ LANG[LID].com.sea +'</span></a>'+
      '</div><hr>'+
      '<div class="box_content"></div></div>').appendTo('body');
    
    $('#unit_box a').css({
        float: 'left',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '25px',
        lineHeight: '2',
        marginRight:'10px'
    });
    $('#unit_box span').css({
        marginLeft: '27px',
    });
    $('#unit_box').draggable({ 
        containment: "body",
        snap: "body",
    });
    $('#unit_box').css({
        position: 'absolute',
        top: '100px',
        left: '200px',
        zIndex: getMaxZIndex() + 1,
        display: 'none'
    });
    $('#unit_box .box_content').css({
        background: 'url(http://s1.directupload.net/images/140206/8jd9d3ec.png) 94% 94% no-repeat',
        backgroundSize: '140px'
    });
    
    $('#unit_box').bind("mousedown",function(){
        $(this).get(0).style.zIndex = getMaxZIndex() + 1;
    });
    
    addComparisonTable("hack");
    addComparisonTable("pierce");
    addComparisonTable("distance");
    addComparisonTable("ship");
    
    $('#unit_box .t_hack').get(0).style.display = "block";
    
    switchComparisonTables();
    
    $('#unit_box hr').css({ border: '1px solid', color: '#804000', float:'none' });
}

function switchComparisonTables(){
    $('#unit_box .hack, #unit_box .pierce, #unit_box .distance, #unit_box .ship').click(function(){
        $('#unit_box [class^="t_"]').css({ display : "none" });
        $('#unit_box .t_'+this.className).get(0).style.display = "block";
    });
}

var ttpArray = [], t = 0;
function addComparisonTable(type){
    var pos = {
        att: { hack: "36%",	pierce: "27%",	distance: "45.5%",	ship: "72.5%" }, 
        def: { hack: "18%",	pierce: "18%",	distance: "18%",	ship: "81.5%" }
    };
    var unitIMG = "http://de.cdn.grepolis.com/images/game/units/units_info_sprite2.51.png";
    var strArray = [
        "<td></td>",
        '<td><div class="bla" style="background: url('+ unitIMG +'); background-position: 0% '+ pos.att[type] +';"></div></td>',
        '<td><div class="bla" style="background: url('+ unitIMG +'); background-position: 0% '+ pos.def[type] +';"></div></td>',
        '<td><div class="bla" style="background: url('+ unitIMG +'); background-position: 0% 63%;"></div></td>',
        (type !== "ship") ? '<td><div class="booty"></div></td>' : '<td><div class="bla" style="background-image: url('+ unitIMG +'); background-position: 0% 91%;"></div></td>',
        '<td><div class="bla" style="background: url('+ unitIMG +'); background-position: 0% 54%;"></div></td>',
        '<td><div class="bla" style="background: url(http://de.cdn.grepolis.com/images/game/res/favor.png)"></div></td>',
        '<td><div class="bla" style="background: url(http://de.cdn.grepolis.com/images/game/res/time.png);"></div></td>'
    ];
    
    for(var e in unitVal){
        if(unitVal.hasOwnProperty(e)){
            var valArray = [];
            
            if(type === (unitVal[e].attack_type || "ship") && (e !== "militia")) {
                valArray.att	= Math.round(unitVal[e].attack*10 / unitVal[e].population) / 10;
                valArray.def	= Math.round(((unitVal[e].def_hack + unitVal[e].def_pierce + unitVal[e].def_distance)*10)/(3*unitVal[e].population)) / 10;
                valArray.def	= valArray.def || Math.round(unitVal[e].defense*10/unitVal[e].population) / 10;
                valArray.speed	= unitVal[e].speed;
                valArray.booty	= Math.round(((unitVal[e].booty)*10) / unitVal[e].population) / 10;
                valArray.booty	= valArray.booty || Math.round(((unitVal[e].capacity ? unitVal[e].capacity + 6 : 0)*10) / unitVal[e].population) / 10;
                valArray.favor	= Math.round((unitVal[e].favor *10)/ unitVal[e].population) / 10;
                valArray.res	= Math.round((unitVal[e].resources.wood + unitVal[e].resources.stone + unitVal[e].resources.iron)/(unitVal[e].population));
                valArray.time	= Math.round(unitVal[e].build_time / unitVal[e].population);
                
                valArray.hero	= (!uw.Game.is_hero_world && ((e === "griffin") || (e === "calydonian_boar")))? "-webkit-filter:grayscale(100%); filter: url(#GrayScale)": "";
                
                strArray[0] += '<td class="un'+ (t) +'"><div class="unit index_unit unit_icon40x40 ' + e + '" style="'+ valArray.hero +'"></div></td>';
                strArray[1] += '<td class="bold" style="color:'+ ((valArray.att>19)?'green':((valArray.att<10 && valArray.att!=0 )?'red':'black')) +';">'+ valArray.att	+'</td>';
                strArray[2] += '<td class="bold" style="color:'+ ((valArray.def>19)?'green':((valArray.def<10 && valArray.def!=0 )?'red':'black')) +';">'+ valArray.def	+'</td>'; 
                strArray[3] += '<td class="bold">'+ valArray.speed	+'</td>'; 
                strArray[4] += '<td class="bold">'+ valArray.booty	+'</td>'; 
                strArray[5] += '<td class="bold">'+ valArray.res	+'</td>'; 
                strArray[6] += '<td class="bold" style="color:'+ ((valArray.favor>0)?'rgb(0, 0, 214)':'black') +';">'+ valArray.favor	+'</td>'; 
                strArray[7] += '<td class="bold">'+ valArray.time	+'</td>'; 
                
                ttpArray[t] = unitVal[e].name; t++;
            }
        }
    }
    
    $('<table class="t_'+ type +'" cellpadding="1px" style="display:none">'+
      '<tr>'+ strArray[0] +'</tr>'+
      '<tr class="tr_att">'+ strArray[1] +'</tr><tr class="tr_def">'+ strArray[2] +'</tr>'+
      '<tr class="tr_spd">'+ strArray[3] +'</tr><tr class="tr_bty_'+ type +'">'+ strArray[4] +'</tr>'+
      '<tr class="tr_res">'+ strArray[5] +'</tr><tr class="tr_fav">'+ strArray[6] +'</tr><tr class="tr_tim">'+ strArray[7] +'</tr>'+
      '</table>').appendTo('#unit_box .box_content');
    
    for(var i = 0; i <= t; i++){
        $('.un'+i).tooltip(ttpArray[i]);
    }
    
    $('.tr_att').tooltip(LANG[LID].com.att);
    $('.tr_def').tooltip(LANG[LID].com.def + " (Ø)");
    $('.tr_spd').tooltip(LANG[LID].com.spd);
    $('.tr_bty_'+ type).tooltip(((type!=="ship")? LANG[LID].com.bty : LANG[LID].com.cap));
    $('.tr_res').tooltip(LANG[LID].com.res);
    $('.tr_fav').tooltip(LANG[LID].com.fav);
    $('.tr_tim').tooltip(LANG[LID].com.tim);
    
    //$('#unit_box .box_content').css({ position: 'relative' });
    $('#unit_box .bla').css({
        height: '25px',
        width: '25px',
        backgroundSize: '100%',
        float: 'left'
    });
    $('#unit_box .booty').css({
        width: '25px',
        height: '25px',
        background: 'url(http://de.cdn.grepolis.com/images/game/layout/layout_2.56_compressed.png)',
        backgroundSize: '3400%',
        backgroundPosition: '0% 58.5%'
    });
}

/*******************************************************************************************************************************
 * Reports and Messages
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Storage of the selected filter (only in German Grepolis yet)
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

var filter = "all";
function saveFilter(){
    $('#dd_filter_type_list .item-list div').each(function(){
        $(this).click(function(){
            filter = $(this).attr("name");
        });
    });
    /*
    var i = 0;
    $("#report_list a").each(function () {
        console.log((i++) +" = " + $(this).attr('data-reportid'));
    });
    */
}

function loadFilter(){
    if(!($('#dd_filter_type_list .selected').attr("name") === filter)){
        $('#dd_filter_type .caption').get(0).click();
        $('#dd_filter_type_list .item-list div[name='+ filter +']').get(0).click();
    }
}

function removeReports(){
    $("#report_list li:contains('spioniert')").each(function () {
        //$(this).remove();
    });
}


var zut = 0;
var messageArray = {};
function filterPlayer(){
    if(!$('#message_filter_list').get(0)) {
        $('<div id="message_filter_list" style="height:300px;overflow-y:scroll; width: 790px;"></div>').appendTo('#folder_container');
        $("#message_list").get(0).style.display = "none";
    }
    if(zut < parseInt($('.es_last_page').get(0).value, 10)-1){
        $('.es_page_input').get(0).value = zut++;
        $('.jump_button').get(0).click();
        $("#message_list li:contains('')").each(function () {
            $(this).appendTo('#message_filter_list');
        });
    } else {
        zut = 1;
    }
}


/*******************************************************************************************************************************
 * World Wonder
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● click adjustment
 * | ● Share calculation (= ratio of player points to alliance points)
 * | ● Resources calculation & counter (stores amount)
 * | ● Adds missing previous & next buttons on finished world wonders (better browsing through world wonders)
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

// getPointRatio: Default
function getPointRatioFromGS(){
    var gs = 0, AP = 0;
    setTimeout(function(){
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://de.grepostats.com/world/" + WID + "/alliance/" + AID,
            onload: function(response) {
                gs = response.responseText;
                gs = gs.substr(gs.indexOf("Punkte"));
                gs = gs.substr(gs.indexOf("<td>")+4);
                gs = gs.substr(0, gs.indexOf("</td>"));
                AP = parseInt(gs.replace(/\,/g, ''), 10);
                //console.log("Allianzpunkte: " + AP);
                ratio = 100 / AP * uw.Game.player_points;
                GM_setValue(WID + "_ratio", ratio);
            }
        });  
    }, 0);
}

function getPointRatioFromAllianceRanking(){
    ratio = 100 / parseInt($('.current_player .r_points').get(0).innerHTML, 10) * uw.Game.player_points;
    setTimeout(function(){
        GM_setValue(WID + "_ratio", ratio);
    },0);
}

function getPointRatioFromAllianceMembers(){
    var points = 0;
    $('#ally_members_body tr').each(function(){
        points += parseInt($(this).children().eq(2).text(), 10) || 0;
    });
    ratio = 100 / points * uw.Game.player_points;
    setTimeout(function(){
        GM_setValue(WID + "_ratio", ratio);
    },0);
}

if(uw.location.pathname === "/game/index"){
    var ww_res = JSON.parse(GM_getValue(WID + "_ww_res", '{}'));
}

// TODO: Split function...
function getResWW(){
    var wndArray = uw.GPWindowMgr.getOpen(uw.Layout.wnd.TYPE_WONDERS);
    
    for(var e in wndArray){
        if(wndArray.hasOwnProperty(e)){
            var wndID = "#gpwnd_" + wndArray[e].getID() + " ";
            
            if(!$(wndID + '.wonder_finished').get(0)){
                var res = 0, 
                    ww_share = {total: {share:0, sum:0}, stage: {share:0, sum:0}},
                    ww_type = $(wndID + '.finished_image_small').attr('src').split("/")[6].split("_")[0], // Which world wonder?
                    res_stages = [ 2, 4, 6, 10, 16, 28, 48, 82, 140, 238], // Rohstoffmenge pro Rohstofftyp in 100.000 Einheiten
                    stage = parseInt($(wndID + '.wonder_expansion_stage span').get(0).innerHTML.split("/")[0], 10) + 1, // Derzeitige Füllstufe
                    speed = uw.Game.game_speed;
                
                ww_res[ww_type] = ww_res[ww_type] || {};
                
                ww_res[ww_type][stage] = ww_res[ww_type][stage] || 0;
                
                if(!$(wndID + '.ww_ratio').get(0)) {
                    $('<fieldset class="ww_ratio"></fieldset>').appendTo(wndID + '.wonder_res_container .trade'); 
                    $(wndID + '.wonder_header').prependTo(wndID + '.wonder_progress');
                    $(wndID + '.wonder_res_container .send_res').insertBefore(wndID + '.wonder_res_container .next_level_res');
                }
                
                $(wndID + '.wonder_progress').css({
                    margin: '0 auto 5px'
                });
                $(wndID + '.wonder_header').css({
                    textAlign: 'left',
                    margin: '10px -8px 12px 3px'
                });
                $(wndID + '.build_wonder_icon').css({
                    top: '25px',
                });
                $(wndID + '.wonder_progress_bar').css({
                    top: '54px',
                });
                $(wndID + '.wonder_controls').css({
                    height: '380px',
                });
                
                $(wndID + '.trade fieldset').css({
                    float: 'right',
                });
                
                $(wndID + '.wonder_res_container').css({
                    right: '29px'
                });
                
                $(wndID + '.ww_ratio').css({
                    position: 'relative',
                    height: 'auto'
                });
                $(wndID + 'fieldset').css({
                    height: 'auto'
                });
                $(wndID + '.town-capacity-indicator').css({
                    marginTop: '0px'
                });
                
                for(var d in res_stages){
                    if(res_stages.hasOwnProperty(d)){
                        ww_share.total.sum += res_stages[d];
                    }
                }
                
                ww_share.total.sum *= speed * 300000;
                
                ww_share.total.share = parseInt(ratio * (ww_share.total.sum / 100), 10);
                
                ww_share.stage.sum = speed * res_stages[stage-1] * 300000;
                
                ww_share.stage.share = parseInt(ratio * (ww_share.stage.sum / 100), 10); // ( 3000 = 3 Rohstofftypen * 100000 Rohstoffe / 100 Prozent)
                setResWW(stage, ww_type, ww_share, wndID);
                
                $(wndID + '.wonder_res_container .send_resources_btn').click(function(){
                    ww_res[ww_type][stage] += parseInt($(wndID + '#ww_trade_type_wood input:text').get(0).value, 10);
                    ww_res[ww_type][stage] += parseInt($(wndID + '#ww_trade_type_stone input:text').get(0).value, 10);
                    ww_res[ww_type][stage] += parseInt($(wndID + '#ww_trade_type_iron input:text').get(0).value, 10);
                    
                    //console.log(ww_res[ww_type][stage]);
                    
                    setResWW(stage, ww_type, ww_share, wndID);
                    
                    setTimeout(function(){
                        GM_setValue(WID + "_ww_res", JSON.stringify(ww_res));
                    }, 0);
                });
            } else {
                $('<div class="prev_ww pos_Y"></div><div class="next_ww pos_Y"></div>').appendTo(wndID + '.wonder_controls');
                
                $(wndID + '.pos_Y').css({
                    top: '-266px',
                });
            }
        }
    }
}

function setResWW(stage, ww_type, ww_share, wndID){
    //console.log(ww_res);
    var width_stage, width_total, res_total = 0, disp_stage = "none", disp_total = "none";
    
    for(var z in ww_res[ww_type]){
        if(ww_res[ww_type].hasOwnProperty(z)){
            res_total += ww_res[ww_type][z];
        }
    }
    
    if(ww_share.stage.share > ww_res[ww_type][stage]){
        width_stage = (242 / ww_share.stage.share) * ww_res[ww_type][stage];
    } else {
        width_stage = 0;
        disp_stage = "block";
    }
    if(ww_share.total.share > res_total){
        width_total = (242 / ww_share.total.share) * res_total;
    } else {
        width_total = 0;
        disp_total = "block";
    }
    //console.log(ratio);
    
    $(wndID + '.ww_ratio').get(0).innerHTML = "";
    $(wndID + '.ww_ratio').append('<legend>'+ LANG[LID].wwc.leg +' (<span style="color:#090">'+ (Math.round(ratio * 100) / 100) +'%</span>):</legend>'+
                                  '<div class="town-capacity-indicator">'+
                                  '<div class="icon all_res"></div>'+
                                  '<div id="ww_town_capacity_stadium" class="tripple-progress-progressbar">'+
                                  '<div class="border_l"></div><div class="border_r"></div><div class="body"></div>'+
                                  '<div class="progress overloaded">'+
                                  '<div class="indicator3" style="left: 0px; width:'+ width_stage +'px"></div>'+
                                  '<span class="ww_perc">' + Math.round(ww_res[ww_type][stage]/ww_share.stage.share*100) + '%</span>'+
                                  '<div class="indicator4" style="left: 0px; display:'+ disp_stage +'"></div>'+
                                  '</div>'+
                                  '<div class="amounts">'+ LANG[LID].wwc.stg +': <span class="curr">'+ pointNumber(ww_res[ww_type][stage]) +'</span> / '+
                                  '<span class="max">'+ pointNumber(Math.round(ww_share.stage.share / 1000) * 1000) +'</span></div>'+
                                  '</div></div>'+
                                  '<div class="town-capacity-indicator">'+
                                  '<div class="icon all_res"></div>'+
                                  '<div id="ww_town_capacity_total" class="tripple-progress-progressbar">'+
                                  '<div class="border_l"></div><div class="border_r"></div><div class="body"></div>'+
                                  '<div class="progress overloaded">'+
                                  '<div class="indicator3" style="left: 0px; width:'+ width_total +'px;"></div>'+
                                  '<span class="ww_perc">'+ Math.round(res_total/ww_share.total.share*100) +'%</span>'+
                                  '<div class="indicator4" style="left: 0px; display:'+ disp_total +'"></div>'+
                                  '</div>'+
                                  '<div class="amounts">'+ LANG[LID].wwc.tot +': <span class="curr">'+ pointNumber(res_total) +'</span> / '+
                                  '<span class="max">'+ pointNumber((Math.round(ww_share.total.share / 1000) * 1000)) +'</span></div>'+
                                  '</div></div>');
    
    $('.ww_ratio .progress').css({
        //position: 'absolute',
        //textAlign: 'center',
        lineHeight: '1',
        color: 'white',
        fontSize: '0.8em'
    });
    
    $(wndID + '.ww_perc').css({
        position:'absolute',
        width:'242px',
        textAlign: 'center'
    });
    
    $(wndID + '.indicator4').css({
        background: 'url(http://gpde.innogamescdn.com/images/game/layout/progressbars-sprite_2.53.png) no-repeat 0 0',
        backgroundPosition: '0px -355px',
        height: '10px',
        zIndex: '13000',
        width: '242px'
    });
    $(wndID + '.all_res').css({
        background: 'url(http://de.cdn.grepolis.com/images/game/layout/resources_2.32.png) no-repeat 0 -90px',
        width: '30px',
        height: '30px',
        margin: '0 auto',
        marginLeft: '5px'
    });
    $(wndID + '.town-capacity-indicator').css({
        marginTop: '0px'
    });
    
    $(wndID + '.ww_ratio').tooltip("<table style='border-spacing:0px; text-align:right' cellpadding='5px'><tr>"+
                                   "<td align='right' style='border-right: 1px solid;border-bottom: 1px solid'></td>"+
                                   "<td style='border-right: 1px solid; border-bottom: 1px solid'><span class='bbcodes_player bold'>("+ (Math.round((ratio) * 100) / 100) +"%)</span></td>"+
                                   "<td style='border-bottom: 1px solid'><span class='bbcodes_ally bold'>(100%)</span></td></tr>"+
                                   "<tr><td class='bold' style='border-right:1px solid;text-align:center'>"+ LANG[LID].wwc.stg + "&nbsp;" + stage +"</td>"+
                                   "<td style='border-right: 1px solid'>"+ pointNumber(Math.round(ww_share.stage.share / 1000) * 1000) +"</td>"+
                                   "<td>" + pointNumber(Math.round(ww_share.stage.sum / 1000) * 1000) + "</td></tr>"+
                                   "<tr><td class='bold' style='border-right:1px solid;text-align:center'>"+ LANG[LID].wwc.tot +"</td>"+
                                   "<td style='border-right: 1px solid'>"+ pointNumber(Math.round(ww_share.total.share / 1000) * 1000) +"</td>"+
                                   "<td>"+ pointNumber(Math.round(ww_share.total.sum / 1000) * 1000) +"</td>"+
                                   "</tr></table>");
}

// Adds points to numbers
function pointNumber(number) {
    var sep; if(LID === "de"){ sep = "."; } else { sep = ",";}
    
    number = number.toString();
    if (number.length > 3) { 
        var mod = number.length % 3; 
        var output = (mod > 0 ? (number.substring(0,mod)) : '');
        
        for (var i=0 ; i < Math.floor(number.length / 3); i++) { 
            if ((mod == 0) && (i == 0)) {
                output += number.substring(mod+ 3 * i, mod + 3 * i + 3); 
            } else {
                output+= sep + number.substring(mod + 3 * i, mod + 3 * i + 3); 
            }
        } 
        number = output;
    }
    return number;
}

/*******************************************************************************************************************************
 * Farming Village Overview
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Color change on possibility of city festivals
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

function changeResColor(){
    var res, res_min, i = 0;
    $('#fto_town_list .fto_resource_count :last-child').reverseList().each(function(){
        if($(this).parent().hasClass("stone")){
            res_min = 18000;
        } else { 
            res_min = 15000;
        }
        res = parseInt($(this).get(0).innerHTML, 10);
        if((res >= res_min) && !($(this).hasClass("town_storage_full"))){
            $(this).get(0).style.color = '#0A0';
        }
        if(res < res_min){
            $(this).get(0).style.color = '#000';
        }
    });
}

/*******************************************************************************************************************************
 * Conquest Info
 * -----------------------------------------------------------------------------------------------------------------------------
 * | ● Amount of supports und attacks in the conquest window
 * | ● Layout adjustment (for reasons of clarity)
 * | - TODO: conquest window of own cities
 * -----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

function countMovements(){
    var i = 0, a = 0;
    $('#unit_movements .support').each(function(){
        i++;
    });
    $('#unit_movements .attack_land, #unit_movements .attack_sea, #unit_movements .attack_takeover').each(function(){
        a++;
    });
    
    var str = "<div style='position: absolute;width: 100px;margin-top: -16px;left: 40%;'><div style='float:left;margin-right:5px;'></div>"+
        "<div class='troops' id='count_def'></div>"+
        "<div class='troops' style='color:green;'> " + i + "</div>"+
        "<div class='troops' id='count_off'> </div>"+
        "<div style='color:red;'> " + a + "</div></div>"+
        "<hr class='move_hr'>";
    
    if($('.gpwindow_content .tab_content .bold').get(0)){
        $('.gpwindow_content .tab_content .bold').append(str);
    } else {
        $('.gpwindow_content h4:eq(1)').append(str);
        
        // TODO: set player link ?
        /*
        $('#unit_movements li div').each(function(){
            
            //console.log($(this).get(0).innerHTML);
        });
        */
    }
    $('.move_hr').css({
        margin: '7px 0px 0px 0px',
        backgroundColor: '#5F5242',
        height: '2px',
        border: '0px solid'
    });
    
    // smaller movements
    $('#unit_movements').css({
        fontSize: '0.80em'
    });
    $('.incoming').css({
        width: '150px',
        height: '45px',
        float: 'left'
    });
    $('#unit_movements div').each(function(){
        if($(this).attr('class') === "unit_movements_arrow"){
            // delete placeholder for arrow of outgoing movements (there are no outgoing movements) 
            if(!$(this).get(0).style.background) { $(this).get(0).remove(); }
        } else {
            // realign texts
            $(this).css({
                margin: '3px',
                paddingLeft: '3px'
            });
        }
    });
    
    $('.troops').css({
        float: 'left',
        margin: '0px 5px 0px 0px',
        height:'18px', 
        width:'18px',
        position: 'relative'
    });
    $('#count_def').css({
        background: 'url(http://de.cdn.grepolis.com/images/game/place/losts.png)',
        backgroundPosition: '0 -36px'
    });
    $('#count_off').css({
        background: 'url(http://de.cdn.grepolis.com/images/game/place/losts.png)',
        backgroundPosition: '0 0px' 
    });
}

/*******************************************************************************************************************************
 * Town window
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● TownTabHandler (trade, attack, support,...)
 * | ● Sent units box
 * | ● Short duration: Display of 30% troop speed improvement in attack/support tab
 * | ● Trade options:
 * | 	- Ressource marks on possibility of city festivals
 * |	- Percentual Trade: Trade button
 * |	- Recruiting Trade: Selection boxes (ressource ratio of unit type + share of the warehouse capacity of the target town)
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

// TODO: Change both functions in MultipleWindowHandler()
function TownTabHandler(action){
    var wndArray, wndID, wndA;
    wndArray = uw.GPWindowMgr.getOpen(uw.Layout.wnd.TYPE_TOWN);
    for(var e in wndArray){
        if(wndArray.hasOwnProperty(e)){
            wndA = wndArray[e].getAction(); wndID = "#gpwnd_" + wndArray[e].getID() + " ";
            if(wndA === action){
                switch(action){
                    case "trading": 
                        if(!$(wndID + '.rec_trade').get(0)){
                            addRecTrade(wndID);
                        }
                        if(!($(wndID + '.btn_trade').get(0))){
                            addPercentTrade(wndID, false);
                        }
                        //addTradeMarks(wndID, 15, 18, 15, "red"); // town festival
                        break;
                    case "support": case "attack":
                        if(options.way && !($('.js-casted-powers-viewport .unit_movement_boost').get(0) || $(wndID + '.short_duration').get(0))){
                            addShortDuration(wndID);
                        }
                        if(options.sen)	{
                            addSentUnitsBox(wndID, action);
                        }
                        break;
                    case "rec_mark":
                        //addTradeMarks(wndID, 15, 18, 15, "lime");
                        break;
                }
            }
        } 
    }
}

function WWTradeHandler(){
    var wndArray, wndID, wndA;
    wndArray = uw.GPWindowMgr.getOpen(uw.GPWindowMgr.TYPE_WONDERS);
    for(var e in wndArray){
        if(wndArray.hasOwnProperty(e)){
            wndID = "#gpwnd_" + wndArray[e].getID() + " ";
            if(!($(wndID + '.btn_trade').get(0) || $(wndID +'.next_building_phase').get(0) || $(wndID +'#ww_time_progressbar').get(0))){
                addPercentTrade(wndID, true);
            }
        }
    }
}

/*******************************************************************************************************************************
 * ● Sent units box
 *******************************************************************************************************************************/
var sentUnitsArray = JSON.parse(GM_getValue(WID +"_sentUnitsArray", '{ "attack": {}, "support": {} }'));

function addSentUnitsBox(wndID, action){
    if(!$(wndID + '.sent_units_box').get(0)){
        var selectedUnitsArray = {};
        $('<div class="game_inner_box sent_units_box"><div class="game_border ">'+
          '<div class="game_border_top"></div><div class="game_border_bottom"></div><div class="game_border_left"></div><div class="game_border_right"></div>'+
          '<div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div><div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div>'+
          '<div class="game_header bold">'+
          '<div class="icon_sent townicon_'+ (action == "attack" ? "lo" : "ld") +'"></div><span>'+ LANG[LID].sen.lab +' ('+ (action == "attack" ? "OFF" : "DEF") +')</span>'+
          '</div>'+
          '<div class="troops"><div class="units_list"></div><hr style="width: 172px;border: 1px solid rgb(185, 142, 93);margin: 3px 0px 2px -1px;">'+
          '<div id="btn_sent_units_reset" class="button_new">'+
          '<div class="left"></div>'+
          '<div class="right"></div>'+
          '<div class="caption js-caption">'+ LANG[LID].sen.rst +'<div class="effect js-effect"></div></div>'+
          '</div>'+
          '</div></div>').appendTo(wndID + '.attack_support_window');
        
        /* New-Feature Info
        $('<div style="width:130px; margin-bottom: 10px">'+
          '<div style="margin: -4px 0px 0px 4px; float:left; width: 24px; height: 24px; background-image: url(http://666kb.com/i/cifvfsu3e2sdiipn0.gif); background-size: 100%; background-position: 0px 0px; background-repeat: no-repeat no-repeat;"></div>'+
          '<div style="color: green;line-height:1;"><b><nobr>&nbsp;New Feature!</nobr></b></div></div>').prependTo(wndID + '.sent_units_box');
        */
        updateSentUnitsBox(wndID, action);
        
        $(wndID + '.icon_sent').css({
            height: '20px',
            marginTop: '-2px',
            width: '20px',
            backgroundSize: '17px',
            paddingLeft: '0px',
            marginLeft: '0px'
        });
        
        $(wndID + '.sent_units_box').css({
            position: 'absolute',
            right: '0px',
            bottom: '16px',
            width: '192px',
            //border: '2px solid green',
            //borderRadius: '5px',
            //padding: '5px'
        });
        $(wndID + '.troops').css({ padding: '6px 0px 6px 6px' });
        
        setTimeout(function(){
            $(wndID +'.send_units_form a').each(function(){
                $(this).click(function(){
                    selectedUnitsArray = getSelectUnits(wndID);
                });
            });
        },10);
        
        $(wndID + '.unit_input').on("blur", function(){
            selectedUnitsArray = getSelectUnits(wndID);
        });
        /*
    	$(wndID + '.unit_container a').on("click", function(){
        	selectedUnitsArray[$(this).attr("id")] = $(wndID + '.unit_type_'+ $(this).attr("id")).val();  
        	console.log($(this).attr("id"));
        	console.log(selectedUnitsArray);                        
    	});
    	*/
        
        $(wndID + '#btn_sent_units_reset').click(function(){
            // Overwrite old array
            sentUnitsArray[action] = {}; updateSentUnitsBox(wndID, action);
        });
        
        $(wndID + '.attack_support_window .button').click(function(){
            getSentUnits(wndID, action, selectedUnitsArray);
        });
        $(wndID + '#btn_attack_town').click(function(){
            getSentUnits(wndID, action, selectedUnitsArray);
        });
    }
}

function getSelectUnits(wndID){
    var selectedUnitsArray = {};
    for(var u in unitVal){
        if(unitVal.hasOwnProperty(u)){
            var a = parseInt($(wndID + '.unit_type_'+ u).val(), 10);
            
            if(a > 0){ selectedUnitsArray[u] = parseInt(a, 10); } else { delete selectedUnitsArray[u]; }
        }
    }
    return selectedUnitsArray;
}

function getSentUnits(wndID, action, selectedUnitsArray){
    var sentSuccess = true, capaShip = 0, capaUnit = 0, popUnit = 0, seaMovement = false;
    var u = 0;
    if(!$('#human_message').get(0)){
        $('body').append('<div id="human_message" class="human_message human_message_success" style="display: none; opacity: 0;"></div>');
    }
    // check if sending was successful
    var human_message = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(u == 0){
                if($('#human_message').attr("class").split(" ")[1] === "human_message_success"){
                    // Add selected units to sent units
                    for(var t in selectedUnitsArray){
                        if(selectedUnitsArray.hasOwnProperty(t)){
                            sentUnitsArray[action][t] = sentUnitsArray[action][t] || 0;
                            sentUnitsArray[action][t] += selectedUnitsArray[t];
                        }
                    }
                    updateSentUnitsBox(wndID, action);
                }
            }
            u++; human_message.disconnect();
        });    
    });
    human_message.observe($('#human_message').get(0), { attributes: true, childList: false, characterData: false, attributeFilter: ["style"] });
}

function updateSentUnitsBox(wndID, action){
    // Remove old unit list
    $(wndID +'.sent_units_box .units_list').get(0).innerHTML = "";
    // Add new unit list
    for(var x in sentUnitsArray[action]){
        if(sentUnitsArray[action].hasOwnProperty(x)){
            if((sentUnitsArray[action][x] || 0) > 0){
                $('<div class="unit_icon25x25 '+ x + (sentUnitsArray[action][x] >= 1000  ? (sentUnitsArray[action][x] >= 10000  ? " five_digit_number" : " four_digit_number") : "") +'">'+
                  '<span class="count text_shadow">'+ sentUnitsArray[action][x] +'</span>'+
                  '</div>').appendTo(wndID +'.sent_units_box .units_list');
            }
        }
    }
    setTimeout(function(){
        GM_setValue(WID +"_sentUnitsArray", JSON.stringify(sentUnitsArray));
    }, 0);
}

/*******************************************************************************************************************************
 * ● Short duration
 *******************************************************************************************************************************/
function addShortDuration(wndID){
    $(wndID + '.way_duration').after('<span class="short_duration">0:00:00</span>');
    /*
    $(wndID + '.arrival_time').after('<span class="short_arrival">'+ $('.server_time_area').get(0).innerHTML.split(" ")[0] +'</span>');
    
    setInterval(function(){
        var t = $(wndID + '.short_arrival').get(0).innerHTML.split(":"), s, m, h;
        
        s = parseInt((parseInt(t[2], 10) + 1) % 60, 10);
        
        m = parseInt((parseInt(t[1], 10) + (parseInt(t[2],10) + 1) / 60) % 60, 10);
        
        h = parseInt((parseInt(t[0], 10) + (parseInt(t[1], 10) + (parseInt(t[2],10) + 1) / 60) / 60) % 24, 10);
        
        $(wndID + '.short_arrival').get(0).innerHTML = h + ":" + m + ":" + s;
    }, 1000);
    */
    
    $(wndID + '.short_duration').tooltip("Verbesserte Truppenbewegung");
    
    changeShortDuration(wndID);
    
    // Style
    $(wndID + '.duration_container').css({
        width:'390px'
    });
    $(wndID + '.short_duration').css({
        position: 'relative',
        float: 'left',
        color: 'darkgreen',
        padding: '6px 3px 6px 30px',
        background: 'url(http://666kb.com/i/ck2c7eohpyfa3yczt.png) no-repeat',
        backgroundSize: '28px',
        backgroundPosition: '4px 2px'
    });
}

function changeShortDuration(wndID){
    var duration = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.addedNodes[0]){
                calcShortDuration(wndID);
            }
        });    
    });
    duration.observe($(wndID + '.way_duration').get(0), { attributes: false, childList: true, characterData: false});
}

function calcShortDuration(wndID){
    var speed = uw.Game.game_speed, setupTime = 900/speed,
        time = $(wndID + '.duration_container .way_duration').get(0).innerHTML.replace("~","").split(":"),
        h,m,s;
    
    time = (((parseInt(time[0], 10)*60 + parseInt(time[1], 10))*60 + parseInt(time[2], 10) - setupTime) / 1.3) + setupTime;
    
    h = Math.floor(time/3600);
    m = Math.floor((time - h*3600)/60);
    s = Math.floor(time - h*3600 - m*60);
    
    if(m < 10) { m = "0" + m; }
    if(s < 10) { s = "0" + s; }
    
    $(wndID + '.short_duration').get(0).innerHTML = "[~"+ h +":" + m + ":" + s + "]";
}

/*******************************************************************************************************************************
 * ● Dropdown menu
 *******************************************************************************************************************************/

// Preload images for drop down arrow buttons
var drop_over = new Image(); drop_over.src = "http://s7.directupload.net/images/140107/hna95u8a.png";
var drop_out = new Image(); drop_out.src = "http://s14.directupload.net/images/140107/ppsz5mxk.png";

function changeDropDownButton(){
    /*
    $('<style type="text/css">' +
      '#dd_filter_type .arrow, .select_rec_unit .arrow {' + 
      'width: 18px !important; height: 17px !important; background: url("http://s14.directupload.net/images/140107/ppsz5mxk.png") no-repeat 0px -1px !important;' + 
      'position: absolute; top: 2px !important; right: 3px;' +
      '</style>').appendTo('head');	
    */
    
    
    $('.arrow').css({
        width: '18px',
        height: '17px',
        background: 'url('+ drop_out.src +') no-repeat -1px -1px',
        position: 'absolute',
        top: '2px',
        right: '3px'
    });
}

var o = 1;

/*******************************************************************************************************************************
 * ● Recruiting Trade
 *******************************************************************************************************************************/
var trade_count = 0, unit = "FS", percent = "0.0"; // Recruiting Trade

function addRecTrade(wndID){
    var max_amount;
    
    $('<div class="rec_trade">'+
      // DropDown-Button for unit
      '<div class="drop_rec_unit dropdown default">'+
      '<div class="border-left"></div>'+
      '<div class="border-right"></div>'+
      '<div class="caption" name="'+ unit +'">'+ unit +'</div>'+
      '<div class="arrow"></div>'+
      '</div>'+
      '<div class="drop_rec_perc dropdown default">'+
      // DropDown-Button for ratio
      '<div class="border-left"></div>'+
      '<div class="border-right"></div>'+
      '<div class="caption" name="'+ percent +'">'+ Math.round(percent * 100)+'%</div>'+
      '<div class="arrow"></div>'+
      '</div></div><span class="rec_count" style="top:30px">('+ trade_count +')</span>').appendTo(wndID + ".content");
    
    // Select boxes for unit and ratio
    $('<div class="select_rec_unit dropdown-list default active">'+
      '<div class="item-list">'+
      '<div class="option_s unit index_unit unit_icon40x40 attack_ship" name="FS"></div>'+
      '<div class="option_s unit index_unit unit_icon40x40 bireme" name="BI"></div>'+
      '<div class="option_s unit index_unit unit_icon40x40 sword" name="SK"></div>'+
      '<div class="option_s unit index_unit unit_icon40x40 slinger" name="SL"></div>'+
      '<div class="option_s unit index_unit unit_icon40x40 archer" name="BS"></div>'+
      '<div class="option_s unit index_unit unit_icon40x40 hoplite" name="HO"></div>'+
      '<div class="option_s unit index_unit unit_icon40x40 rider" name="RE"></div>'+
      '<div class="option_s unit index_unit unit_icon40x40 chariot" name="SW"></div>'+
      '</div></div>').appendTo(wndID + ".rec_trade");
    $('<div class="select_rec_perc dropdown-list default inactive">'+
      '<div class="item-list">'+
      '<div class="option sel" name="0.0">&nbsp;&nbsp;0%</div>'+
      '<div class="option" name="0.05">&nbsp;&nbsp;5%</div>'+
      '<div class="option" name="0.1">10%</div>'+
      '<div class="option" name="0.16666">17%</div>'+
      '<div class="option" name="0.2">20%</div>'+
      '<div class="option" name="0.25">25%</div>'+
      '<div class="option" name="0.33">33%</div>'+
      '<div class="option" name="0.5">50%</div>'+
      '</div></div>').appendTo(wndID + ".rec_trade");
    
    $(wndID + ".rec_trade [name='"+ unit +"']").toggleClass("sel");
    
    // Styles
    $(wndID + '.rec_trade').css({ position: 'absolute', left: '30px', top: '70px' });
    $(wndID + '.select_rec_unit').css({
        position: 'absolute',
        top: '20px',
        width: '84px',
        display: "none"
    });
    $(wndID + '.select_rec_perc').css({
        position: 'absolute',
        left: '50px',
        top: '20px',
        width: '50px',
        display: "none"
    });
    $(wndID + '.item-list').css({ maxHeight: '400px', maxWidth: '200px', align: "right" });
    
    $(wndID + '.arrow').css({
        width: '18px',
        height: '18px',
        background: 'url('+ drop_out.src +') no-repeat -1px -1px',
        position: 'absolute',
    });
    
    $(wndID + '.option_s').css({
        WebkitFilter: "grayscale(100%)",
        filter: "url(#GrayScale)",
        cursor: 'pointer',
        color: 'black',
        lineHeight: '14px',
        float: 'left',
        
        position: 'relative',
        width: '40px',
        margin: '0px',
        padding: '0px'
    });
    
    $('.select_rec_unit .sel').css({"-webkit-filter" : "sepia(100%)", "filter": "url(#Sepia)"});
    
    // hover effects of the elements in the drop menus
    $(wndID + '.option_s').hover(
        function(){
            //console.log(this.className); 
            $(this).css({"-webkit-filter" : "grayscale(0%) sepia(0%)", "filter": "none"});
            if(!($(this).hasClass("sel"))){ 
                $('.option_s .sel').css({"-webkit-filter" : "grayscale(0%) sepia(100%)", "filter": "url(#Sepia)"});
            }
        },
        function(){
            $('.select_rec_unit .option_s').css({"-webkit-filter" : "grayscale(100%) sepia(0%)", "filter": "url(#GrayScale)"});
            $('.select_rec_unit .sel').css({"-webkit-filter" : "grayscale(0%) sepia(100%)", "filter": "url(#Sepia)"});
        }
    );
    $(wndID + '.option').hover(
        function(){ $(this).css({color: '#fff', background: "#328BF1"}); },
        function(){ $(this).css({color: '#000', background: "#FFEEC7"}); }
    );
    
    // click events of the drop menu
    $(wndID + ' .select_rec_unit .option_s').each(function(){
        $(this).click(function(e){
            $(".select_rec_unit .sel").toggleClass("sel");
            $("." + this.className.split(" ")[4]).toggleClass("sel");
            
            unit = $(this).attr("name");
            $('.drop_rec_unit .caption').attr("name", unit);
            $('.drop_rec_unit .caption').each(function(){
                $(this).get(0).innerHTML = unit;
            });
            $(this).parent().parent().get(0).style.display = "none";
            $('.drop_rec_unit .caption').change();
        });
    });
    $(wndID + ' .select_rec_perc .option').each(function(){
        $(this).click(function(e){
            $(this).parent().find(".sel").toggleClass("sel");
            $(this).toggleClass("sel");
            
            percent = $(this).attr("name");
            $('.drop_rec_perc .caption').attr("name", percent);
            $('.drop_rec_perc .caption').each(function(){
                $(this).get(0).innerHTML = Math.round(percent * 100)+"%";
            });
            $(this).parent().parent().get(0).style.display = "none";
            $('.drop_rec_perc .caption').change();
        });
    });
    
    // show & hide drop menus on click
    $(wndID + '.drop_rec_perc').click(function(e){
        if($(e.target)[0].parentNode.parentNode.childNodes[3].style.display === "none"){
            $(e.target)[0].parentNode.parentNode.childNodes[3].style.display = "block";
            $(e.target)[0].parentNode.parentNode.childNodes[2].style.display = "none";
        } else {
            $(e.target)[0].parentNode.parentNode.childNodes[3].style.display = "none";
        }
    });
    $(wndID + '.drop_rec_unit').click(function(e){
        if($(e.target)[0].parentNode.parentNode.childNodes[2].style.display === "none"){
            $(e.target)[0].parentNode.parentNode.childNodes[2].style.display = "block";
            $(e.target)[0].parentNode.parentNode.childNodes[3].style.display = "none";
        } else {
            $(e.target)[0].parentNode.parentNode.childNodes[2].style.display = "none";
        }
    });
    
    $(wndID).click(function(e){
        var clicked = $(e.target);
        if(!(clicked[0].parentNode.className.split(" ")[1] === "dropdown")){
            $('#' + this.id + ' .select_rec_unit').get(0).style.display = "none";
        }
    });
    
    // hover arrow change
    $(wndID + '.dropdown').hover(function(e){
        $(e.target)[0].parentNode.childNodes[3].style.background = "url('"+ drop_over.src +"') no-repeat -1px -1px";
    }, function(e){
        $(e.target)[0].parentNode.childNodes[3].style.background = "url('"+ drop_out.src +"') no-repeat -1px -1px";
    });
    
    $(wndID + ".drop_rec_unit .caption").attr("name", unit);
    $(wndID + ".drop_rec_perc .caption").attr("name",percent);
    
    $(wndID + '.drop_rec_unit').tooltip(LANG[LID].trd.uni);
    $(wndID + '.drop_rec_perc').tooltip(LANG[LID].trd.rat);
    
    var ratio = {NO: {w:0,		s: 0,		i: 0		}, 
                 FS: {w:1,		s: 0.2308,	i: 0.6154	}, 
                 BI: {w:1,		s: 0.8750,	i: 0.2250	}, 
                 SL: {w:0.55,	s: 1,		i: 0.4		}, 
                 RE: {w:0.6666, s: 0.3333,	i: 1		}, 
                 SK: {w:1,		s: 0,		i: 0.8947	},  
                 HO: {w:0,		s: 0.5,		i: 1		}, 
                 BS: {w:1,		s: 0,		i: 0.6250	},  
                 SW: {w:0.4545, s: 1,		i: 0.7273	}
                };
    
    
    if($('#town_capacity_wood .max').get(0)){
        max_amount = parseInt($('#town_capacity_wood .max').get(0).innerHTML, 10); 
    } else {
        max_amount = 25500;
    }
    
    $(wndID + '.caption').change(function(e){
        //console.log($(this).attr('name') + ", " + unit + "; " + percent);
        if(!(($(this).attr('name') === unit) || ($(this).attr('name') === percent))){
            //trade_count = 0;
            $('.rec_count').get(0).innerHTML = "(" + trade_count + ")";
        }
        
        var tmp = $(this).attr('name');
        
        if($(this).parent().attr('class').split(" ")[0] === "drop_rec_unit"){
            unit = tmp;
        } else {
            percent = tmp;
        }
        var max = (max_amount - 100)/1000;
        addTradeMarks(max * ratio[unit].w, max * ratio[unit].s, max * ratio[unit].i, "lime");
        
        var part = (max_amount - 1000) * parseFloat(percent); // -1000 als Puffer (sonst Überlauf wegen Restressies, die nicht eingesetzt werden können, vorallem bei FS und Biremen)
        var rArray = uw.ITowns.getTown(uw.Game.townId).getCurrentResources();
        var tradeCapacity = uw.ITowns.getTown(uw.Game.townId).getAvailableTradeCapacity();
        
        var wood = ratio[unit].w * part;
        var stone= ratio[unit].s * part;
        var iron = ratio[unit].i * part;
        
        if((wood > rArray.wood) || (stone > rArray.stone) || (iron > rArray.iron) || ( (wood + stone + iron) > tradeCapacity)) { 
            wood = stone = iron = 0;
            $('.drop_rec_perc .caption').css({color:'#f00'}); 
            //$('.' + e.target.parentNode.parentNode.className + ' .select_rec_perc .sel').css({color:'#f00'});
            //$('.select_rec_perc .sel').css({color:'#f00'});
        } else {
            $('.' + e.target.parentNode.parentNode.className + ' .drop_rec_perc .caption').css({color:'#000'});
        }
        $("#trade_type_wood [type='text']").select().val(wood).blur();
        $("#trade_type_stone [type='text']").select().val(stone).blur();
        $("#trade_type_iron [type='text']").select().val(iron).blur();
    });
    
    $('#trade_button').click(function(){
        trade_count++;
        $('.rec_count').get(0).innerHTML = "(" + trade_count + ")";
        
    });
    
    $(wndID + '.rec_count').css({
        position: 'absolute',
        display: 'block',
        left: '33px',
        top: '95px',
        width: '20px'
    });
    $(wndID + '.drop_rec_unit').css({
        position: 'absolute',
        display: 'block',
        width: '50px',
        overflow: 'visible'
    });
    $(wndID + '.drop_rec_perc').css({
        position: 'absolute',
        display: 'block',
        left: '49px',
        width: '55px',
        color:'#000'
    });
    $(wndID + '.drop_rec_perc .caption').change();
}
/*******************************************************************************************************************************
 * ● Ressources marks
 *******************************************************************************************************************************/
function addTradeMarks(woodmark, stonemark, ironmark, color){
    var max_amount, limit, wndArray = uw.GPWindowMgr.getOpen(uw.Layout.wnd.TYPE_TOWN), wndID;
    for(var e in wndArray){
        if(wndArray.hasOwnProperty(e)){ 
            wndID = "#gpwnd_" + wndArray[e].getID() + " ";
            if($(wndID + '.town-capacity-indicator').get(0)){
                
                max_amount = $(wndID + '.amounts .max').get(0).innerHTML;
                
                $('#trade_tab .c_'+ color).each(function(){
                    $(this).get(0).remove();
                });
                $('#trade_tab .progress').each(function(){
                    if($("p", this).length < 3) {
                        if($(this).parent().get(0).id != "big_progressbar"){
                            limit = 1000 * (242 / parseInt(max_amount, 10));
                            
                            switch($(this).parent().get(0).id.split("_")[2]){
                                case "wood":	limit = limit * woodmark; break;
                                case "stone":	limit = limit * stonemark; break;
                                case "iron":	limit = limit * ironmark; break;
                            }
                            $('<p class="c_'+ color +'"style="position:absolute;left: '+ limit +'px; background:'+ color +';width:2px;height:100%;margin:0px"></p>').appendTo(this);
                        }
                    }  
                });
            }
        }
    }
}

/*******************************************************************************************************************************
 * ● Percentual Trade
 *******************************************************************************************************************************/
var rest_count = 0;

function addPercentTrade(wndID, ww){
    
    var a = ""; var content = wndID + ".content";
    if(ww) {
        a = "ww_";
        content = wndID + '.trade .send_res';
    }
    $('<div class="btn btn_trade"><a class="button" href="#">'+
      '<span class="left"><span class="right">'+
      '<span class="middle mid">'+
      '<span class="img_trade"></span></span></span></span>'+
      '<span style="clear:both;"></span>'+
      '</a></div>').prependTo(content);
    
    $(wndID + '.btn_trade').tooltip(LANG[LID].trd.prc);
    
    setPercentTrade(wndID, ww);
    
    $(wndID + '.btn').css({ width: '20px', overflow: 'visible', position: 'absolute', display: 'block' });
    
    if(!ww){ $(wndID + '.content').css({ height: '320px' }); }
    
    if(ww){
        $(wndID + '.btn_trade').css({ left: '678px', top: '154px' });
    } else {
        $(wndID + '.btn_trade').css({ left: '336px', top: '135px' });
    }
    
    $(wndID + '.mid').css({ minWidth: '26px' });
    
    $(wndID + '.img_trade').css({
        width: '27px',
        height: '27px',
        top: '-3px',
        float: 'left',
        position: 'relative',
        background: 'url("http://666kb.com/i/cjq6d72qk521ig1zz.png") no-repeat'
    });
    
}

var res = {};
function setPercentTrade(wndID, ww){
    var a = ""; if(ww) a = "ww_";
    
    $(wndID + '.btn_trade').toggle(function(){
        res.wood = {}; res.stone = {}; res.iron = {}; res.sum = {};
        
        res.sum.amount = 0;
        // Rohstoffmenge 0 setzen
        setAmount(true, a, wndID);
        // Rohstoffmenge insgesamt // TODO: ITowns.getTown(Game.townId).getCurrentResources(); ?
        for(var e in res){
            if(res.hasOwnProperty(e) && e != "sum") {
                res[e].rest = false;
                res[e].amount = parseInt($('.ui_resources_bar .'+ e +' .amount').get(0).innerHTML, 10);
                res.sum.amount += res[e].amount;
            }
        }
        // Prozentualer Anteil der Rohstoffe insgesamt
        res.wood.percent = 100/res.sum.amount * res.wood.amount;
        res.stone.percent = 100/res.sum.amount * res.stone.amount;
        res.iron.percent = 100/res.sum.amount * res.iron.amount;
        
        // Handelsmenge insgesamt
        res.sum.cur = parseInt($(wndID + '#' + a + 'big_progressbar .caption .curr').get(0).innerHTML, 10);
        res.sum.max = parseInt($(wndID + '#' + a + 'big_progressbar .caption .max').get(0).innerHTML, 10) - res.sum.cur;
        
        // Menge der Rohstoffe am prozentualen Anteil der Handelsmenge (%)
        res.wood.part =  parseInt(res.sum.max/100 * res.wood.percent, 10);
        res.stone.part =  parseInt(res.sum.max/100 * res.stone.percent, 10);
        res.iron.part =  parseInt(res.sum.max/100 * res.iron.percent, 10);
        
        for(var f in res){
            if(res.hasOwnProperty(f) && f != "sum") {
                if(!ww){
                    var i = 0;
                    $(wndID + '#town_capacity_'+ f +' .amounts span').each(function(){
                        res[f][i] = parseInt(this.innerHTML.replace('+', '').trim(), 10);
                        
                        if(isNaN(res[f][i])) { res[f][i] = 0; }
                        i++;
                    });
                    res[f].cur = res[f][0] + res[f][1];
                    res[f].max = res[f][3] - res[f].cur;
                    
                    if(res[f].max < 0) { res[f].max = 0; }
                } else {
                    res[f].max = 30000;
                }
            }
        } 
        // Rest von Bruchrechnung (0-2 Einheiten) zur Steinmenge addieren
        res.stone.part += res.sum.max - (res.wood.part + res.stone.part + res.iron.part);
        
        res.sum.rest = 0;
        rest_count = 0;
        calcRestAmount();
        setAmount(false, a, wndID);
    }, function(){
        setAmount(true, a, wndID);
    });
}

function calcRestAmount(){
    // Rest aufteilen
    if(res.sum.rest > 0){
        for(var e in res){
            if(res.hasOwnProperty(e) && e != "sum" && res[e].rest != true) {
                res[e].part += res.sum.rest/(3 - rest_count);
            }
        }
        res.sum.rest = 0;
    }
    // neuen Rest berechnen
    for(var f in res){
        if(res.hasOwnProperty(f) && f != "sum" && res[f].rest != true) {
            if(res[f].max <= res[f].part) {
                res[f].rest = true;
                res.sum.rest += res[f].part - res[f].max;
                rest_count += 1;
                res[f].part = res[f].max;
            }
        }
    }
    // Rekursion
    if(res.sum.rest > 0 && rest_count < 3){
        calcRestAmount();
    }
}

function setAmount(clear, a, wndID){
    for(var e in res){
        if(res.hasOwnProperty(e) && e != "sum") {
            if(clear == true) { res[e].part = 0; }
            $(wndID + "#" + a + "trade_type_" + e + ' [type="text"]').select().val(res[e].part).blur();
        }
    }
}

/*******************************************************************************************************************************
 * Unit strength (blunt/sharp/distance) and Transport Capacity
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Unit strength: Unit menu
 * |	- Switching of def/off display with buttons
 * |	- Possible Selection of certain unit types
 * | ● Unit strength: Siege
 * | ● Unit strength: Barracks
 * | ● Transport capacity: Unit menu
 * |	- Switching of transporter speed (+/- big transporter)
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

var def = true, blunt = 0, sharp = 0, dist = 0, shipsize = false;

function getSelectedUnitsMenu(){
    var units = [];
    if($(".units_land .units_wrapper .selected").length > 0){
        $(".units_land .units_wrapper .selected").each(function(){
            units[$(this).get(0).className.split(" ")[1]] = $(this).get(0).children[0].innerHTML;
        });
    } else {
        $(".units_land .units_wrapper .unit").each(function(){
            units[$(this).get(0).className.split(" ")[1]] = $(this).get(0).children[0].innerHTML;
        });
    }
    return units;
}

// Calculate defensive strength
function calcDef(units){
    var e; blunt = sharp = dist = 0;
    for(e in units) {
        if(units.hasOwnProperty(e)) {
            blunt += units[e] * unitVal[e].def_hack;
            sharp += units[e] * unitVal[e].def_pierce;
            dist  += units[e] * unitVal[e].def_distance;
        }
    }
}
// Calculate offensive strength
function calcOff(units, selectedUnits){
    var e; blunt = sharp = dist = 0;
    for(e in selectedUnits) {
        if(selectedUnits.hasOwnProperty(e)) {
            var attack = (units[e] || 0) * unitVal[e].attack;
            switch(unitVal[e].attack_type){
                case 'hack':	blunt += attack;	break;
                case 'pierce':	sharp += attack;	break;
                case 'distance':dist  += attack;	break;
            }
        }
    }
}

/*******************************************************************************************************************************
 * ● Unit strength: Unit menu
 *******************************************************************************************************************************/
function setStrengthMenu() {
    var unitsIn = uw.ITowns.getTown(uw.Game.townId).units(),
        e, units = getSelectedUnitsMenu();
    
    // Calculation
    if(def==true){
        calcDef(units);
    } else {
        calcOff(unitsIn, units);
    }
    $('#blunt').get(0).innerHTML = blunt;
    $('#sharp').get(0).innerHTML = sharp;
    $('#dist').get(0).innerHTML = dist;
    
    setTransportCapacity(units);
}

function addStrengthMenu(){
    $('<hr><div id="strength" class="cont_left"><span id="str_font" class="bold text_shadow" style="color:#FFCC66;font-size: 0.8em;">'+
      '<table style="margin:0px;">'+
      '<tr><td><div class="ico units_info_sprite img_hack"></td><td id="blunt">0</td></tr>'+
      '<tr><td><div class="ico units_info_sprite img_pierce"></td><td id="sharp">0</td></tr>'+
      '<tr><td><div class="ico units_info_sprite img_dist"></td><td id="dist">0</td></tr>'+
      '</table>'+
      '</span></div>'+
      '<div class="cont_right">'+
      '<img id="def" class="img" src="http://de.cdn.grepolis.com/images/game/unit_overview/support.png">'+
      '<img id="off" class="img" src="http://de.cdn.grepolis.com/images/game/unit_overview/attack.png">'+
      '</div>').appendTo('.units_land .content');
    
    // transporter display
    $('<div id="transporter" class="cont" style="height:25px;">'+
      '<table style=" margin:0px;"><tr align="center" >'+
      '<td><img id="ship_img" class="ico" src="' + img_small_transp + '"></td>'+
      '<td><span id="ship" class="bold text_shadow" style="color:#FFCC66;font-size: 10px;"></span></td>'+
      '</tr></table>'+
      '</div>').appendTo('.units_naval .content');
    
    // Styles
    $('.ico').css({
        height: '20px',
        width: '20px'
    });
    $('.units_info_sprite').css({
        background: 'url(http://de.cdn.grepolis.com/images/game/units/units_info_sprite2.51.png)',
        backgroundSize: '100%'
    });
    $('.img_pierce').css({ backgroundPosition: '0px -20px' });
    $('.img_dist').css({ backgroundPosition: '0px -40px' });
    $('hr').css({
        margin: '0px',
        backgroundColor: '#5F5242',
        height: '2px',
        border: '0px solid'
    });
    $('.cont_left').css({
        background: 'url(http://de.cdn.grepolis.com/images/game/layout/layout_units_nav_border.png)',
        width:'65%', 
        display: 'table-cell'
    });
    $('.cont').css({
        background:'url("http://gpde.innogamescdn.com/images/game/layout/layout_2.56_compressed.png") no-repeat -270px -354px'
    });
    $('.cont_right').css({
        background:'url(http://de.cdn.grepolis.com/images/game/layout/layout_units_nav_border.png)',
        width:'30%',
        display: 'table-cell',
        verticalAlign:'middle'
    });
    $('.img').css({
        float:'right', 
        background:'none', 
        margin:'2px 8px 2px 0px'
    });
    
    $('.units_land .units_wrapper, .btn_gods_spells .checked').click(function(){
        setTimeout(function(){
            setStrengthMenu();
        }, 100);
    });
    
    $('#off').css({"-webkit-filter" : "grayscale(80%)",
                   "filter": "url(#GrayScale)"});
    
    // Buttons
    $('#off').click(function(){
        $('#strength .img_hack').get(0).style.backgroundPosition = '0% 36%';
        $('#strength .img_pierce').get(0).style.backgroundPosition = '0% 27%';
        $('#strength .img_dist').get(0).style.backgroundPosition = '0% 45%';
        
        $('#str_font').get(0).style.color = "#edb";
        
        // TODO: doesn't work in FF yet
        $(this).css({"-webkit-filter" : "grayscale(0%)",
                     "filter": "none",
                    });
        
        $('#def').css({"-webkit-filter" : "grayscale(80%)",
                       "filter": "url(#GrayScale)",
                      });
        def = false;
        setStrengthMenu();
    });
    $('#def').click(function(){
        $('#strength .img_hack').get(0).style.backgroundPosition = '0% 0%';
        $('#strength .img_pierce').get(0).style.backgroundPosition = '0% 9%';
        $('#strength .img_dist').get(0).style.backgroundPosition = '0% 18%';
        
        $('#str_font').get(0).style.color = "#fc6";
        
        $(this).css({"-webkit-filter" : "grayscale(0%)",
                     "filter": "none"
                    });
        $('#off').css({"-webkit-filter" : "grayscale(80%)",
                       "filter": "url(#GrayScale)",
                      });
        def = true;
        setStrengthMenu();
    });
    $('#def,#off,#transporter').hover(function() {   
        $(this).css('cursor','pointer');
    });
    $('#transporter').toggle(
        function(){
            $('#ship_img').get(0).src = img_big_transp;
            shipsize = !shipsize;
            setStrengthMenu();
        }, 
        function(){
            $('#ship_img').get(0).src = img_small_transp;
            shipsize = !shipsize;  
            setStrengthMenu();
        }
    );
    data = uw.GameData;
    
    unitVal = data.units;
}

/*******************************************************************************************************************************
 * ● Unit strength: Siege
 *******************************************************************************************************************************/
function addStrengthConquest(){
    var units = [], str;
    
    // units of the siege
    $('#conqueror_units_in_town .unit').each(function(){
        str = $(this).attr("class").split(" ")[4];
        if(!unitVal[str].is_naval){
            units[str] = parseInt($(this).get(0).children[0].innerHTML, 10);
            //console.log($(this).attr("class").split(" ")[4]);
        }
    });
    // calculation
    calcDef(units);
    
    $('<div id="strength_eo" class="game_border" style="width:90px; margin: 20px; align:center;">'+
      '<div class="game_border_top"></div><div class="game_border_bottom"></div>'+
      '<div class="game_border_left"></div><div class="game_border_right"></div>'+
      '<div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div>'+
      '<div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div>'+
      '<span class="bold" style="color:#000;font-size: 0.8em;"><table style="margin:0px;background:#f7dca2;width:100%;align:center;">'+
      '<tr><td width="1%"><div class="ico units_info_sprite img_hack"></div></td><td id="bl" align="center" width="100%">0</td></tr>'+
      '<tr><td><div class="ico units_info_sprite img_pierce"></div></td><td id="sh" align="center">0</td></tr>'+
      '<tr><td><div class="ico units_info_sprite img_dist"></div></td><td id="di" align="center">0</td></tr>'+
      '</table></span>'+
      '</div>').appendTo('#conqueror_units_in_town');
    
    $('#strength_eo').tooltip('Gesamteinheitenstärke der Belagerungstruppen');
    
    $('#strength_eo .ico').css({
        height: '20px',
        width: '20px'
    });
    $('#strength_eo .units_info_sprite').css({
        background: 'url(http://de.cdn.grepolis.com/images/game/units/units_info_sprite2.51.png)',
        backgroundSize: '100%'
    });
    $('#strength_eo .img_pierce').css({ backgroundPosition: '0% 9%' });
    $('#strength_eo .img_dist').css({ backgroundPosition: '0% 18%' });
    
    
    $('#bl').get(0).innerHTML = blunt;
    $('#sh').get(0).innerHTML = sharp;
    $('#di').get(0).innerHTML = dist;
}

/*******************************************************************************************************************************
 * ● Unit strength: Barracks
 *******************************************************************************************************************************/
function setStrengthBarracks(){
    if(!$('#strength_baracks').get(0)){
        var units = [], pop = 0;
        
        // whole units of the town
        $('#units .unit_order_total').each(function(){
            units[$(this).parent().parent().attr("id")] = $(this).get(0).innerHTML;
        });
        // calculation
        calcDef(units);
        
        // population space of the units
        for(var e in units) {
            if(units.hasOwnProperty(e)) {
                pop += units[e] * unitVal[e].population;
            }
        }
        $('<div id="strength_baracks" class="game_border" style="float:right; width:70px; align:center;">'+
          '<div class="game_border_top"></div><div class="game_border_bottom"></div>'+
          '<div class="game_border_left"></div><div class="game_border_right"></div>'+
          '<div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div>'+
          '<div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div>'+
          '<span class="bold" style="color:#000;font-size: 0.8em;"><table style="margin:0px;background:#f7dca2;width:100%;align:center;">'+
          '<tr><td width="1%"><div class="ico units_info_sprite img_hack"></div></td><td id="b" align="center" width="100%">0</td></tr>'+
          '<tr><td><div class="ico units_info_sprite img_pierce"></div></td><td id="s" align="center">0</td></tr>'+
          '<tr><td><div class="ico units_info_sprite img_dist"></div></td><td id="d" align="center">0</td></tr>'+
          '</table></span>'+
          '</div>').appendTo('.ui-dialog #units');
        
        $('<div id="pop_baracks" class="game_border" style="float:right; width:60px; align:center;">'+
          '<div class="game_border_top"></div><div class="game_border_bottom"></div>'+
          '<div class="game_border_left"></div><div class="game_border_right"></div>'+
          '<div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div>'+
          '<div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div>'+
          '<span class="bold" style="color:#000;font-size: 0.8em;"><table style="margin:0px;background:#f7dca2;width:100%;align:center;">'+
          '<tr><td width="1%"><img class="ico" src="http://de.cdn.grepolis.com/images/game/res/pop.png"></td><td id="p" align="center" width="100%">0</td></tr>'+
          '</table></span>'+
          '</div>').appendTo('.ui-dialog #units');
        
        $('.ui-dialog #units .ico').css({
            height: '20px',
            width: '20px'
        });
        $('.ui-dialog #units .units_info_sprite').css({
            background: 'url(http://de.cdn.grepolis.com/images/game/units/units_info_sprite2.51.png)',
            backgroundSize: '100%'
        });
        $('.ui-dialog #units .img_pierce').css({ backgroundPosition: '0% 9%' });
        $('.ui-dialog #units .img_dist').css({ backgroundPosition: '0% 18%' });
        
        $('#pop_baracks').tooltip('Bevölkerungszahl aller Landeinheiten der Stadt');
        $('#strength_baracks').tooltip('Gesamteinheitenstärke stadteigener Truppen');
        
        $('#b').get(0).innerHTML = blunt;
        $('#s').get(0).innerHTML = sharp;
        $('#d').get(0).innerHTML = dist;
        $('#p').get(0).innerHTML = pop;
    }
}

/*******************************************************************************************************************************
 * ● Transporter capacity
 *******************************************************************************************************************************/
function setTransportCapacity(){
    var bigTransp = 0, smallTransp = 0, pop = 0, ship = 0, unit, berth, units = [];
    // Ship space (available)
    smallTransp = parseInt(uw.ITowns.getTown(parseInt(uw.Game.townId, 10)).units().small_transporter, 10);
    if(isNaN(smallTransp)) smallTransp = 0;
    if(shipsize){
        bigTransp = parseInt(uw.ITowns.getTown(parseInt(uw.Game.townId, 10)).units().big_transporter, 10);
        if(isNaN(bigTransp)) bigTransp = 0;
    }
    
    // Checking: Research berth
    berth = 0;
    if(uw.ITowns.getTown(uw.Game.townId).researches().hasBerth()){
        berth = 6;
    }
    ship = bigTransp*(20 + berth) + smallTransp*(10 + berth);
    
    units = uw.ITowns.getTown(uw.Game.townId).units();
    
    // Ship space (required)
    for(var e in units) {
        if(units.hasOwnProperty(e)) {
            if(unitVal[e]){ // without Heroes
                if(!(unitVal[e].is_naval || unitVal[e].flying)){
                    pop += units[e] * unitVal[e].population;
                }
            }
        }
    }
    $('#ship').get(0).innerHTML = pop + "/" + ship; 
}


/*******************************************************************************************************************************
 * Simulator
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Layout adjustment
 * | ● Permanent display of the extended modifier box
 * | ● Unit strength for entered units (without modificator influence yet)
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

function changeSimulatorLayout(){
    $('#place_simulator .game_body').css({
        height: '457px'
    });
    // AutoFillIn
    $('.place_insert_field[name="sim[mods][att][luck]"]').get(0).value = 0;
    //$('.place_insert_field[name="sim[mods][att][morale]"]').get(0).value = 100;
    
    // Mods
    $('.place_sim_bonuses_heroes h4').prependTo('.place_sim_wrap_mods');
    $('.place_sim_wrap_mods').css({
        position: 'absolute',
        right: '-17px'
    });
    $('.place_sim_wrap_mods .place_simulator_table .left_border').css({
        width: '47px'
    });
    
    // Erweiterte Modulator-Box
    $('.place_sim_wrap_mods_extended').removeClass().addClass("place_sim_wrap_mods_extend");
    $('.place_sim_wrap_mods_extend').appendTo('.place_sim_wrap_mods');
    $('.place_sim_wrap_mods_extend').css({
        display: 'table',
        position: 'relative',
        width: '100px',
        paddingTop: '6px'
    });
    $('.place_sim_bonuses_more_confirm').parent().get(0).style.display = "none";
    $('.place_sim_showhide').remove();
    $('.place_image').css({
        width: '20px',
        height:'20px',
        backgroundSize: '100%',
        margin: '1px'
    });
    $('.place_sim_wrap_mods_extend .place_image').each(function(){
        var s = parseInt($(this).css('backgroundPosition').replace("px", "").split(" ")[1], 10)/2;
        $(this).get(0).style.backgroundPosition = '0px '+s+'px';
    });
    $('.place_checkbox_field').each(function(){
        $(this).click(function(){
            $('.place_sim_bonuses_more_confirm').get(0).click();
        });
    });
    
    // Einheitencontainer
    $('#simulator_body .unit_container').css({
        height: '50px',
        width: '50px',
        margin: '0px 3px 0px 1px'
    });
    $('.place_simulator_odd, .place_simulator_even').css({
        textAlign: 'center'
    });
    $('.place_insert_field').css({
        margin: '0px'
    });
    
    // Seeeinheiten-Box
    $('.place_sim_sea_wrap h4').css({
        float: 'left'
    });
    $('.place_sim_select_strategies').prependTo('.place_sim_sea_wrap');
    $('.place_sim_select_strategies select').css({
        width: '95px'
    });
    $('.place_sim_sea_wrap h4').prependTo('.place_sim_sea_wrap');
    $('.place_sim_select_strategies select').get(0).children[0].innerHTML ="Standard";
    $('.place_sim_select_strategies select').get(0).children[2].remove();
    $('.place_sim_select_strategies').css({
        marginLeft: '99px'
    });
    
    // Einheiten-Box
    $('<div id="place_sim_wrap_units"></div>').appendTo('#simulator_body');
    $('#place_sim_wrap_units').css({
        position: 'absolute',
        bottom: '35px'
    });
    $('#place_simulator h4:last, .place_sim_select_gods_wrap').appendTo('#place_sim_wrap_units');
    $('#place_sim_ground_units').appendTo('#place_sim_wrap_units');
    $('#place_sim_wrap_units h4').prependTo('.place_sim_select_gods_wrap');
    $('#place_sim_wrap_units h4').css({
        float: 'left'
    });
    
    // Selectboxen
    $('.place_sim_select_gods select').each(function(){
        //$(this).get(0)[0].innerHTML = "Gottheit";
    });
    $('.place_sim_select_gods').css({
        width: '105px'
    });
    $('.place_sim_select_gods select').css({
        width: '80px'
    });  
    $('.place_sim_select_gods_wrap').css({
        padding: '0px'
    });
    $('#select_insert_units').css({
        width: '130px'
    });  
    //$('#select_insert_units').get(0)[1].innerHTML ="Angriff";
    //$('#select_insert_units').get(0)[2].innerHTML ="Verteidigung";
    $('.place_sim_select_gods_wrap .place_symbol, .place_sim_select_strategies .place_symbol').css({
        margin: '3px 2px 0px 5px'
    });
    $('.place_sim_insert_units .place_symbol').css({
        background: 'url(http://de.cdn.grepolis.com/images/game/towninfo/traveltime.png)',
        backgroundSize: '140%',
        backgroundPositionY: '-4px'
    });
    $('.place_attack').css({
        float: 'left'
    });
    $('#simulator_body .att').css({
        marginLeft: '19px'
    });
    
    // -> Heldenwelt
    if(uw.Game.is_hero_world){
        $('.place_sim_wrap_mods_extend tr').each(function(){
            $(this).get(0).children[1].style.borderLeft = "none";
            $(this).get(0).children[0].remove();
        });
        $('.place_sim_wrap_mods_extend').get(0).style.left = "-29px";
    }
    
    // -> Helden
    if($('.place_sim_heroes_container').get(0)){
        $('.place_sim_heroes_container').appendTo(".place_sim_wrap_mods");
        $('#place_simulator h4:eq(2)').get(0).remove();
        //$('<tr></tr>').appendTo(".place_sim_heroes_container tbody");
        //$('.place_sim_heroes_container td:eq(2), .place_sim_heroes_container td:eq(3)').appendTo(".place_sim_heroes_container tr:eq(1)");
        $('.place_sim_heroes_container').css({
            position: 'absolute',
            right: '26px',
            paddingTop: '6px'
        });
    }
    $('<style type="text/css"> #q_place_sim_lost_res { display: none; } </style>').appendTo('head');	
    
    setStrengthSimulator();
}

function afterSimulation(){
    var lossArray = { att : { res: 0, fav: 0, pop: 0 }, def : { res: 0, fav: 0, pop: 0 } };
    
    $('#place_sim_wrap_units .place_losses, #place_sim_naval_units .place_losses').each(function(){
        var loss = parseInt($(this).get(0).innerHTML, 10) || 0;
        if(loss > 0){
            var unit = this.id.substring(26);
            var side = this.id.split("_")[2];
            lossArray[side].res += loss *(unitVal[unit].resources.wood + unitVal[unit].resources.stone + unitVal[unit].resources.iron);
            lossArray[side].fav += loss * unitVal[unit].favor;
            lossArray[side].pop += loss * unitVal[unit].population;
        }
    });
    for(var x in lossArray){
        if(lossArray.hasOwnProperty(x)){
            for(var z in lossArray[x]){
                if(lossArray[x].hasOwnProperty(z)){
                    $("#"+ x +"_"+ z).get(0).innerHTML = ((z === "res") && (lossArray[x][z] > 10000))? (Math.round(lossArray[x][z]/1000)+"k"):lossArray[x][z];
                }
            }
        }
    }
}

// Stärkeanzeige: Simulator
var unitsGround = { att: {}, def: {} }, unitsNaval = { att: {}, def: {} }, name ="";

function setStrengthSimulator() {
    $('<div id="simu_table" style="position:relative; align:center;font-size: 0.8em; margin-top:6px; margin-right:39%;">'+
      '<div style="float:left; margin-right:12px;"><h4>'+ LANG[LID].sim.str +'</h4>'+
      '<table class="place_simulator_table strength" cellpadding="0px" cellspacing="0px" style="align:center;">'+
      '<tr>'+
      '<td class="place_simulator_even"></td>'+
      '<td class="left_border place_simulator_odd"><div class="ico units_info_sprite img_hack"></div></td>'+
      '<td class="left_border place_simulator_even"><div class="ico units_info_sprite img_pierce"></div></td>'+
      '<td class="left_border place_simulator_odd"><div class="ico units_info_sprite img_dist"></div></td>'+
      '<td class="left_border place_simulator_even"><div class="ico units_info_sprite img_ship"></div></td>'+
      '</tr><tr>'+
      '<td class="place_simulator_even"><div class="place_symbol place_att"></div></td>'+
      '<td class="left_border place_simulator_odd" id="att_b">0</td>'+
      '<td class="left_border place_simulator_even" id="att_s">0</td>'+
      '<td class="left_border place_simulator_odd" id="att_d">0</td>'+
      '<td class="left_border place_simulator_even" id="att_ship">0</td>'+
      '</tr><tr>'+
      '<td class="place_simulator_even"><div class="place_symbol place_def"></div></td>'+
      '<td class="left_border place_simulator_odd" id="def_b">0</td>'+
      '<td class="left_border place_simulator_even" id="def_s">0</td>'+
      '<td class="left_border place_simulator_odd" id="def_d">0</td>'+
      '<td class="left_border place_simulator_even" id="def_ship">0</td>'+
      '</tr>'+
      '</table>'+
      '</div><div><h4>'+ LANG[LID].sim.los +'</h4>'+
      '<table class="place_simulator_table loss" cellpadding="0px" cellspacing="0px" style="align:center;">'+
      '<tr>'+
      '<td class="place_simulator_even"></td>'+
      '<td class="left_border place_simulator_odd"><div class="ico units_info_sprite img_res"></div></td>'+
      '<td class="left_border place_simulator_even"><div class="ico units_info_sprite img_fav"></div></td>'+
      '<td class="left_border place_simulator_odd"><div class="ico units_info_sprite img_pop"></div></td>'+
      '</tr><tr>'+
      '<td class="place_simulator_even"><div class="place_symbol place_att"></div></td>'+
      '<td class="left_border place_simulator_odd" id="att_res">0</td>'+
      '<td class="left_border place_simulator_even" id="att_fav">0</td>'+
      '<td class="left_border place_simulator_odd" id="att_pop">0</td>'+
      '</tr><tr>'+
      '<td class="place_simulator_even"><div class="place_symbol place_def"></div></td>'+
      '<td class="left_border place_simulator_odd" id="def_res">0</td>'+
      '<td class="left_border place_simulator_even" id="def_fav">0</td>'+
      '<td class="left_border place_simulator_odd" id="def_pop">0</td>'+
      '</tr>'+
      '</table>'+
      '</div></div>').appendTo('#simulator_body');
    
    $('#simu_table .ico').css({
        height: '20px',
        width: '20px'
    });
    $('#simu_table .units_info_sprite').css({
        background: 'url(http://de.cdn.grepolis.com/images/game/units/units_info_sprite2.51.png)',
        backgroundSize: '100%'
    });
    $('#simu_table .img_hack').css({ backgroundPosition: '0% 36%' });
    $('#simu_table .img_pierce').css({ backgroundPosition: '0% 27%' });
    $('#simu_table .img_dist').css({ backgroundPosition: '0% 45%' });
    $('#simu_table .img_ship').css({ backgroundPosition: '0% 72%' });
    $('#simu_table .img_fav').css({ background: 'url(http://gpde.innogamescdn.com/images/game/res/favor.png)', backgroundSize: '100%' });
    $('#simu_table .img_res').css({ background: 'url(http://de.cdn.grepolis.com/images/game/units/units_info_sprite2.51.png) 0% 54%', backgroundSize: '100%' });
    $('#simu_table .img_pop').css({ background: 'url(http://gpde.innogamescdn.com/images/game/res/pop.png)', backgroundSize: '100%' });
    
    
    
    $('#simu_table .left_border').css({
        width: '54px'
    });
    $('#simu_table .left_border').each(function(){
        $(this)[0].align = 'center';
    });
    
    $('#simu_table .strength').tooltip(LANG[LID].sim.str + " (" + LANG[LID].sim.mod +")");
    $('#simu_table .loss').tooltip(LANG[LID].sim.los);
    
    // Klick auf Einheitenbild
    $('.index_unit').click(function(){
        var type = $(this).attr('class').split(" ")[4];
        $('.place_insert_field[name="sim[units][att]['+type+']"]').change();
    });
    
    $('#place_sim_ground_units .place_insert_field, #place_sim_naval_units .place_insert_field').on('input change', function(){
        name = $(this).attr("name").replace(/\]/g, "").split("[");
        var str = this;
        //console.log(str);
        setTimeout(function(){
            var unit_type = $(str).closest('.place_simulator_table').attr("id").split("_")[2],
                val, e;
            
            val = parseInt($(str).val(), 10);
            val = val || 0;
            
            if(unit_type == "ground"){
                unitsGround[name[2]][name[3]] = val;
                
                if(name[2] == "def"){
                    calcDef(unitsGround.def);
                } else {
                    calcOff(unitsGround.att, unitsGround.att);
                }
                $('#' + name[2] + '_b').get(0).innerHTML = blunt;
                $('#' + name[2] + '_s').get(0).innerHTML = sharp;
                $('#' + name[2] + '_d').get(0).innerHTML = dist;
                
            } else {
                var att = 0, def = 0;
                unitsNaval[name[2]][name[3]] = val;
                
                if(name[2] == "def"){
                    for(e in unitsNaval.def) {
                        if(unitsNaval.def.hasOwnProperty(e)) {
                            def += unitsNaval.def[e] * unitVal[e].defense;
                        }
                    }
                    $('#def_ship').get(0).innerHTML = def;
                } else {
                    for(e in unitsNaval.att) {
                        if(unitsNaval.att.hasOwnProperty(e)) {
                            att += unitsNaval.att[e] * unitVal[e].attack;
                        }
                    }
                    $('#att_ship').get(0).innerHTML = att;
                }
            }
        }, 100); 
    });
    
    // Abfrage wegen eventueller Spionageweiterleitung 
    getUnitInputs();
    setTimeout(function(){
        setChangeUnitInputs("def");
    }, 100);
    
    $('#select_insert_units').change(function(){
        var side = $(this).find('option:selected').val();
        setTimeout(function(){
            getUnitInputs();
            if(side === "att" || side === "def"){
                setChangeUnitInputs(side);  
            }
        }, 200);
    });
}

function getUnitInputs(){
    $('#place_sim_ground_units .place_insert_field, #place_sim_naval_units .place_insert_field').each(function(){
        name = $(this).attr("name").replace(/\]/g, "").split("[");
        var str = this;
        var unit_type = $(str).closest('.place_simulator_table').attr("id").split("_")[2],
            val, e;
        val = parseInt($(str).val(), 10);
        val = val || 0;
        if(unit_type === "ground"){
            unitsGround[name[2]][name[3]] = val;
        } else {
            var att = 0, def = 0;
            unitsNaval[name[2]][name[3]] = val;
        }
    });
}

function setChangeUnitInputs(side){
    $('.place_insert_field[name="sim[units][' + side + '][godsent]"]').change();
    setTimeout(function(){
        $('.place_insert_field[name="sim[units][' + side + '][colonize_ship]"]').change();
    }, 100);
}

/*******************************************************************************************************************************
 * Defensive form
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Adds a defensive form to the bbcode bar
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

// Funktion aufteilen...
function addForm(e){
    var textareaId = "", bbcodeBarId = "";
    
    switch (e) {
        case "/alliance_forum/forum": 
            textareaId = "#forum_post_textarea";
            bbcodeBarId = "#forum";
            break;
        case "/message/forward":
            textareaId = "#message_message";
            bbcodeBarId = "#message_bbcodes";
            break;
        case "/message/new":
            textareaId = "#message_new_message";
            bbcodeBarId = "#message_bbcodes";
            break;
        case "/message/view":
            textareaId = "#message_reply_message";
            bbcodeBarId = "#message_bbcodes";
            break;
        case "/player_memo/load_memo_content":
            textareaId = "#memo_text_area";
            bbcodeBarId = "#memo_edit";
            break;   
    }
    
    $('<a title="Verteidigungsformular" href="#" class="dio_bbcode_option def_form" name="def_form"></a>').appendTo(bbcodeBarId + ' .bb_button_wrapper');
    
    $('.def_form_button').css({
        cursor: 'pointer',
        marginTop:'3px'
    });
    
    $(bbcodeBarId + ' .dio_bbcode_option').css({
        background: 'url("http://s14.directupload.net/images/140126/lt3hyb8j.png")',
        display: 'block',
        float: 'left',
        width: '22px',
        height: '23px',
        margin: '0 3px 0 0',
        position: 'relative',
    });
    $(bbcodeBarId + ' .def_form').css({
        backgroundPosition: '-89px 0px'
    });
    var imgArray = { 
        wall:	'http://de.cdn.grepolis.com/images/game/main/wall.png',
        tower:	'http://de.cdn.grepolis.com/images/game/main/tower.png',
        hide:	'http://de.cdn.grepolis.com/images/game/main/hide.png',
        
        spy:	'http://s7.directupload.net/images/140114/yr993xwc.png',
        pop:	'http://s7.directupload.net/images/140114/4d6xktxm.png',
        
        rev1:	'http://s7.directupload.net/images/140115/9cv6otiu.png',
        rev0:	'http://s7.directupload.net/images/140115/aue4rg6i.png',
        eo1:	'http://s1.directupload.net/images/140115/fkzlipyh.png',
        eo0:	'http://s1.directupload.net/images/140115/hs2kg59c.png',
        att:	'http://s1.directupload.net/images/140115/3t6uy4te.png',
        sup:	'http://s7.directupload.net/images/140115/ty6szerx.png',
        
        zeus:		'http://s1.directupload.net/images/140114/cdxecrpu.png',
        hera:		'http://s1.directupload.net/images/140114/mve54v2o.png',
        athena:		'http://s14.directupload.net/images/140114/kyqyedhe.png',
        poseidon:	'http://s7.directupload.net/images/140114/tusr9oyi.png',
        hades:		'http://s7.directupload.net/images/140114/huins2gn.png',
        artemis:	'http://s7.directupload.net/images/140114/kghjhko8.png',
        nogod:		'http://s1.directupload.net/images/140114/e7vmvfap.png',
        
        captain:	'http://s14.directupload.net/images/140114/88gg75rc.png',
        commander:	'http://s14.directupload.net/images/140114/slbst52o.png',
        priest:		'http://s1.directupload.net/images/140114/glptekkx.png',
        
        phalanx:	'http://s7.directupload.net/images/140114/e97wby6z.png',
        ram:		'http://s7.directupload.net/images/140114/s854ds3w.png',
        
        militia:	'http://wiki.en.grepolis.com/images/9/9b/Militia_40x40.png',
        sword:		'http://wiki.en.grepolis.com/images/9/9c/Sword_40x40.png',
        slinger:	'http://wiki.en.grepolis.com/images/d/dc/Slinger_40x40.png',
        archer:		'http://wiki.en.grepolis.com/images/1/1a/Archer_40x40.png',
        hoplite:	'http://wiki.en.grepolis.com/images/b/bd/Hoplite_40x40.png',
        rider:		'http://wiki.en.grepolis.com/images/e/e9/Rider_40x40.png',
        chariot:	'http://wiki.en.grepolis.com/images/b/b8/Chariot_40x40.png',
        catapult:	'http://wiki.en.grepolis.com/images/f/f0/Catapult_40x40.png',
        godsent:	'http://wiki.de.grepolis.com/images/6/6e/Grepolis_Wiki_225.png',
        
        def_sum:	'http://s14.directupload.net/images/140127/6cxnis9r.png',
        
        minotaur:	'http://wiki.de.grepolis.com/images/7/70/Minotaur_40x40.png',
        manticore:	'http://wiki.de.grepolis.com/images/5/5e/Manticore_40x40.png',
        zyclop:		'http://wiki.de.grepolis.com/images/6/66/Zyklop_40x40.png',
        sea_monster:'http://wiki.de.grepolis.com/images/7/70/Sea_monster_40x40.png',
        harpy:		'http://wiki.de.grepolis.com/images/8/80/Harpy_40x40.png',
        medusa:		'http://wiki.de.grepolis.com/images/d/db/Medusa_40x40.png',
        centaur:	'http://wiki.de.grepolis.com/images/5/53/Centaur_40x40.png',
        pegasus:	'http://wiki.de.grepolis.com/images/5/54/Pegasus_40x40.png',
        cerberus:	'http://wiki.de.grepolis.com/images/6/67/Zerberus_40x40.png',
        fury:		'http://wiki.de.grepolis.com/images/6/67/Erinys_40x40.png',
        griffin:	'http://wiki.de.grepolis.com/images/d/d1/Unit_greif.png',
        calydonian_boar:	'http://wiki.de.grepolis.com/images/9/93/Unit_eber.png',
        
        big_transporter:	'http://wiki.en.grepolis.com/images/0/04/Big_transporter_40x40.png',
        bireme:				'http://wiki.en.grepolis.com/images/4/44/Bireme_40x40.png',
        attack_ship:		'http://wiki.en.grepolis.com/images/e/e6/Attack_ship_40x40.png',
        demolition_ship:	'http://wiki.en.grepolis.com/images/e/ec/Demolition_ship_40x40.png',
        small_transporter:	'http://wiki.en.grepolis.com/images/8/85/Small_transporter_40x40.png',
        trireme:			'http://wiki.en.grepolis.com/images/a/ad/Trireme_40x40.png',
        colonize_ship:		'http://wiki.en.grepolis.com/images/d/d1/Colonize_ship_40x40.png',
        
        move_icon:	'http://de.cdn.grepolis.com/images/game/unit_overview/',
        
        bordure: 'http://s1.directupload.net/images/140126/8y6pmetk.png'
    };
    
    $('<div class="bb_def_chooser">'+
      '<div class="bbcode_box middle_center">'+
      '<div class="bbcode_box top_left"></div><div class="bbcode_box top_right"></div>'+
      '<div class="bbcode_box top_center"></div><div class="bbcode_box bottom_center"></div>'+
      '<div class="bbcode_box bottom_right"></div><div class="bbcode_box bottom_left"></div>'+
      '<div class="bbcode_box middle_left"></div><div class="bbcode_box middle_right"></div>'+
      '<div class="bbcode_box content clearfix" style="padding:5px">'+
      '<div id="f_uni" class="checkbox_new checked"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].bbc.sel[0] +'</div></div><br><br>'+
      '<div id="f_prm" class="checkbox_new checked"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].bbc.sel[1] +'</div></div><br><br>'+
      '<div id="f_sil" class="checkbox_new checked"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].bbc.sel[2] +'</div></div><br><br>'+
      '<div id="f_mov" class="checkbox_new checked"><div class="cbx_icon"></div><div class="cbx_caption">'+ LANG[LID].bbc.sel[3] +'</div></div><br><br>'+
      '<div><a class="button" id="dio_insert" href="#"><span class="left"><span class="right"><span class="middle"><small>'+ LANG[LID].bbc.but +'</small></span></span></span><span></span></a></div>'+
      '</div></div></div>').appendTo(bbcodeBarId + ' .bb_button_wrapper');
    
    $('.bb_def_chooser').css({
        display: 'none',
        top: '38px',
        left: '510px',
        position: 'absolute',
        width: '190px',
        zIndex: 10000
    });
    
    $(bbcodeBarId + " .bb_def_chooser .checkbox_new").click(function () {
        $(this).toggleClass("checked");
    });
    
    $(bbcodeBarId + ' .def_form').toggle(function(){
        $(this).parent().find(".bb_def_chooser").get(0).style.display = "block";
    }, function(){
        $(this).parent().find(".bb_def_chooser").get(0).style.display = "none";
    });
    
    $(bbcodeBarId + ' #dio_insert').click(function(){
        var textarea = $(textareaId).get(0), text = $(textarea).val(), troop_table = "", troop_img = "", troop_count = "", separator = "", move_table = "", landunit_sum = 0;
        
        $('.def_form').get(0).click();
        
        if($('#f_uni').hasClass("checked")){
            $('.units_land .unit, .units_naval .unit').each(function(){
                troop_img	+= separator + '[img]'		+ imgArray[this.className.split(" ")[1]]	+ '[/img]';
                troop_count += separator + '[center]'	+ $(this).find(".value").get(0).innerHTML	+ '[/center]';
                separator = "[||]";
            });
        } else {
            $('.units_land .unit').each(function(){
                var a = this.className.split(" ")[1], def = (unitVal[a].def_hack + unitVal[a].def_pierce + unitVal[a].def_distance)/(3 * unitVal[a].population);
                if(def > 10){
                    landunit_sum += parseInt($(this).find(".value").get(0).innerHTML, 10) * unitVal[a].population * ((def > 20) ? 2 : 1); 
                }
            });
            landunit_sum = (landunit_sum > 10000) ? ((Math.round(landunit_sum / 100))/10) + "k" : landunit_sum;
            
            troop_img	+= '[img]'+ imgArray.def_sum +'[/img]';
            troop_count += '[center]'+ landunit_sum	+'[/center]';
            separator = "[||]";
            $('.units_naval .unit').each(function(){
                troop_img	+= separator + '[img]'		+ imgArray[this.className.split(" ")[1]]	+ '[/img]';
                troop_count += separator + '[center]'	+ $(this).find(".value").get(0).innerHTML	+ '[/center]';
            });
        }
        if(troop_img !== ""){ troop_table = "\n[table][**]" + troop_img + "[/**][**]" + troop_count + "[/**][/table]\n"; }
        
        var str = '[img]'+ imgArray.bordure + '[/img]'+
            '\n\n[color=#006B00][size=12][u][b]'+ LANG[LID].bbc.ttl +' ([url="http://adf.ly/eDM1y"]©DIO-Tools[/url])[/b][/u][/size][/color]\n\n'+
            //'[table][**][img]'+ imgArray.sup +'[/img][||]'+
            '[size=12][town]' + uw.ITowns.getTown(uw.Game.townId).getId() + '[/town] ([player]'+ uw.Game.player_name +'[/player])[/size]'+
            //'[||][img]'+ imgArray['rev' + (uw.ITowns.getTown(uw.Game.townId).hasConqueror()?1:0)] +'[/img][/**][/table]'+
            '\n\n[i][b]'+ LANG[LID].bbc.inf +'[/b][/i]' + troop_table +
            '[table][*]'+
            '[img]'+ imgArray.wall		+'[/img][|]\n'+
            '[img]'+ imgArray.tower		+'[/img][|]\n'+
            '[img]'+ imgArray.phalanx	+'[/img][|]\n'+
            '[img]'+ imgArray.ram		+'[/img][|]\n'+
            ($('#f_prm').hasClass("checked") ? '[img]'+ imgArray.commander	+'[/img][|]\n' : ' ')+
            ($('#f_prm').hasClass("checked") ? '[img]'+ imgArray.captain	+'[/img][|]\n' : ' ')+
            ($('#f_prm').hasClass("checked") ? '[img]'+ imgArray.priest	+'[/img][|]\n' : ' ')+
            ($('#f_sil').hasClass("checked") ? '[center][img]'+imgArray.spy+'[/img][/center][|]\n' : ' ')+
            '[img]'+ imgArray.pop		+'[/img][|]\n'+
            '[img]'+ imgArray[(uw.ITowns.getTown(uw.Game.townId).god() || "nogod")]	+'[/img][/*]\n'+
            '[**][center]' + uw.ITowns.getTown(uw.Game.townId).buildings().getBuildingLevel("wall")+ '[/center][||]'+
            '[center]' + uw.ITowns.getTown(uw.Game.townId).buildings().getBuildingLevel("tower")+ '[/center][||]'+
            '[center]' + (uw.ITowns.getTown(uw.Game.townId).researches().attributes.phalanx? '+' : '-') + '[/center][||]'+
            '[center]' + (uw.ITowns.getTown(uw.Game.townId).researches().attributes.ram? '+' : '-')+ '[/center][||]'+
            ($('#f_prm').hasClass("checked") ? '[center]' + ((uw.Game.premium_features.commander >= uw.Timestamp.now())? '+' : '-') + '[/center][||]' : ' ')+
            ($('#f_prm').hasClass("checked") ? '[center]' + ((uw.Game.premium_features.captain >= uw.Timestamp.now())? '+' : '-')+ '[/center][||]' : ' ')+
            ($('#f_prm').hasClass("checked") ? '[center]' + ((uw.Game.premium_features.priest >= uw.Timestamp.now())? '+' : '-') + '[/center][||]' : ' ')+
            ($('#f_sil').hasClass("checked") ? '[center]' + Math.round(uw.ITowns.getTown(uw.Game.townId).getEspionageStorage()/1000) + 'k[/center][||]': ' ')+
            '[center]' + uw.ITowns.getTown(uw.Game.townId).getAvailablePopulation() + '[/center][||]'+
            '[center]' + $('.gods_favor_amount').get(0).innerHTML + '[/center]'+
            '[/**][/table]';
        
        var bb_count_str = parseInt(str.match(/\[/g).length, 10), bb_count_move = 0;
        
        var i = 0;
        if($('#f_mov').hasClass("checked")){ 
            move_table += '\n[i][b]'+ LANG[LID].bbc.mov +'[/b][/i]\n[table]';
            
            $('#toolbar_activity_commands').mouseover();
            
            $('#toolbar_activity_commands_list .content .command').each(function(){
                var cl = $(this).children()[0].className.split(" ");
                if((cl[cl.length-1] === "returning" || cl[cl.length-1] === "revolt_arising" || cl[cl.length-1] === "revolt_running") && ((bb_count_str + bb_count_move) < 480)) {
                    move_table += (i%1) ? "" : "[**]";
                    i++;
                    move_table += "[img]" + imgArray.move_icon + cl[2] + ".png[/img][||]";
                    move_table += getArrivalTime($(this).children()[1].innerHTML) + (uw.Game.market_id === "de" ? " Uhr[||]" : " [||]");
                    move_table += "[town]" + JSON.parse(atob($(this).children()[2].firstChild.href.split("#")[1])).id + "[/town]";
                    move_table += (i%1) ? "[||]" : "[/**]";
                }
                bb_count_move = parseInt(move_table.match(/\[/g).length, 10);
            });
            if((bb_count_str + bb_count_move) > 480){
                move_table += '[**]...[/**]';
            }
            
            $('#toolbar_activity_commands').mouseout();
            
            //console.log((bb_count_str + bb_count_move));
            move_table += (i%1) ? "[/**]" : "";
            move_table += "[*][|][color=#800000][size=6][i] ("+ LANG[LID].bbc.dev +": ±1s)[/i][/size][/color][/*][/table]\n";
        }
        
        str += move_table + '[img]'+ imgArray.bordure + '[/img]';
        
        
        
        $(textarea).val(text.substring(0, $(textarea).get(0).selectionStart) + str + text.substring($(textarea).get(0).selectionEnd));
    });
}

function getArrivalTime(duration_time){
    var server_time = $('.server_time_area').get(0).innerHTML.split(" ")[0].split(":"), arrival_time, s, m, h;
    duration_time = duration_time.split(":");
    
    s = parseInt(server_time[2], 10) + parseInt(duration_time[2], 10);
    m = parseInt(server_time[1], 10) + parseInt(duration_time[1], 10) + ((s>=60)? 1 : 0);
    h = parseInt(server_time[0], 10) + parseInt(duration_time[0], 10) + ((m>=60)? 1 : 0);
    
    s = s%60; m = m%60; h = h%24;
    
    s = ((s<10) ? "0" : "") + s;
    m = ((m<10) ? "0" : "") + m;
    h = ((h<10) ? "0" : "") + h;
    
    arrival_time = h + ":" + m + ":" + s;
    
    return arrival_time;
}


/*******************************************************************************************************************************
 * Smiley box
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Display of a smiley selection box for text input fields (forum, messages, notes):
 * | ● Used smileys: http://www.greensmilies.com/smilie-album/
 * | + Own Grepolis smileys
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

var smileyArray =  { "standard": {}, "nature": {}, "grepolis": {}, "people": {}, "other":{} };

// smiley categories
smileyArray.button = [ "rollsmiliey", "smile" ];

smileyArray.standard = [ 
    "smilenew", "i/cnfy7elqh8dotnsdp", "lol", "neutral_new", "afraid", "freddus_pacman", "auslachen2", "kolobok-sanduhr", "bussi2", "winken4", "flucht2", "panik4", "ins-auge-stechen", 
    "seb_zunge", "fluch4_GREEN", "baby_junge2", "blush-reloaded6", "frown", "verlegen", "blush-pfeif", "stevieh_rolleyes", "daumendreh2", "baby_taptap", 
    "sadnew", "hust", "confusednew", "idea2", "irre", "irre4", "sleep", "candle", "nicken", "no_sad", 
    "thumbs-up_new", "thumbs-down_new", "bravo2", "oh-no2", "kaffee2", "drunk", "saufen", "freu-dance", "hecheln", "headstand", "rollsmiliey", "eazy_cool01", "motz", "cuinlove", "biggrin"
];
smileyArray.nature = [
    "dinosaurier07", "flu-super-gau", "ben_cat", "schwein", "hundeleine01", "blume", "ben_sharky", "ben_cow", "charly_bissig", "gehirnschnecke_confused", "mttao_fische", "mttao_angler", 
    "insel", "fliegeschnappen", "i/cifohy0y1cl7nckzw", /* Spinne */ "i/cifogx34asrswrcjw", /* Schiffbrüchiger */ "plapperhase", "ben_dumbo"  
];
smileyArray.grepolis = [
    "mttao_wassermann", "i/cigrmpfofys5xtiks", /* Hera */ "i/cifvfsu3e2sdiipn0", /* Medusa */ "i/cigmv8wnffb3v0ifg", /* Mantikor */ "i/cigrqlp2odi2kqo24", /* Zyklop */
    "i/cj1l9gndtu3nduyvi", /* Minotaurus */ "i/cj2byjendffymp88t", /* Pegasus */ "i/cj2ccmi2x8mhcoikd", /* Hydra */
    "silvester_cuinlove", "mttao_schuetze", "kleeblatt2", "wallbash", /* "glaskugel4", */ "musketiere_fechtend", /* "krone-hoch",*/ "i/cifojb85jytq5h07g", // Wikinger
    "mttao_waage2", "steckenpferd", /* "kinggrin_anbeten2", */ "i/cifohielywpedbyh8", /* Grepo Love */ "skullhaufen", "pferdehaufen" // "i/ckajscggscw4s2u60"
];
smileyArray.people = [ 
    "seb_hut5", "opa_boese2", "star-wars-yoda1-gruen", "hexefliegend", "snob", "seb_detektiv_ani", "seb_cowboy", "devil", "segen", "pirat5", "borg", "hexe3b", 
    "i/cifoqe3geok0jco5o", // Ägypter
    "i/ciforgs313z0ae1cc", // Hippie
    "eazy_polizei", "stars_elvis", "mttao_chefkoch", "nikolaus", "pirate3_biggrin", "batman_skeptisch", "tubbie1", "tubbie2", "tubbie3", "tubbie4" 
];
smileyArray.other = [ 
    "steinwerfen", "herzen02", "scream-if-you-can", "kolobok", "headbash", "liebeskummer", "bussi", "brautpaar-reis", "grab-schaufler2", "boxen2", "aufsmaul", 
    "sauf", "mttao_kehren", "sm", "weckruf", "klugscheisser2", "karte2_rot", "dagegen", "party","dafuer", "outofthebox", "pokal_gold", "koepfler", "transformer"
];

// Replace german sign smilies
if(LID !== "de"){
    smileyArray.other[17] = "dagegen2";
    smileyArray.other[19] = "dafuer2";
}
// Forum: extra smiley
if($(".editor_textbox_container").get(0)){
    smileyArray.grepolis.push("i/ckajscggscw4s2u60");
}

var id = 0, error_count = 0;

var er = false;
// preload images
function loadSmileys(){
    for(var e in smileyArray){
        if(smileyArray.hasOwnProperty(e)) {
            for(var f in smileyArray[e]){
                if(smileyArray[e].hasOwnProperty(f)) {
                    var src = smileyArray[e][f]; 
                    smileyArray[e][f] = new Image();
                    smileyArray[e][f].className = "smiley" + (id++);
                    smileyArray[e][f].style.margin = '3px';
                    smileyArray[e][f].style.maxHeight = '35px';
                    smileyArray[e][f].style.cursor = 'pointer';
                    if(src.substring(0,2) == "i/" ) {
                        smileyArray[e][f].src = "http://666kb.com/" + src + ".gif";
                    } else {
                        if(er == false){
                            smileyArray[e][f].src = "http://www.greensmilies.com/smile/smiley_emoticons_" + src + ".gif";
                        } else {
                            smileyArray[e][f].src = 'http://s1.directupload.net/images/140128/93x3p4co.gif';
                        }
                    }
                    smileyArray[e][f].onerror = function () {
                        this.src = 'http://s1.directupload.net/images/140128/93x3p4co.gif';
                    };
                }
            }
        }
    }
}

// Forum smilies
if($(".editor_textbox_container").get(0)){
    loadSmileys(); 
    changeForumEditorLayout();
    addSmileyBoxForum();
}

function changeForumEditorLayout(){
    $('.blockrow').css({ border: "none" });
    
    // Subject/Title
    $($('.section div label[for="title"]').parent()).css({ float:"left", width:"36%", marginRight: "20px"});
    $($('.section div label[for="subject"]').parent()).css({ float:"left", width:"36%", marginRight: "20px"});
    
    $('.section div input').eq(0).css({ marginBottom: "-10px", marginTop: "10px"});
    $('#display_posticon').remove();
    
    // Posticons
    $('.posticons table').css({ width: "50%", /*marginTop: "-16px"*/});
    $('.posticons').css({ marginBottom: "-16px" });
    $('.posticons').insertAfter($('.section div label[for="title"]').parent());
    $('.posticons').insertAfter($('.section div label[for="subject"]').parent());
    // Posticons hint
    $('.posticons p').remove();
    // Posticons: No Icon - radio button
    $(".posticons [colspan='14']").parent().replaceWith($(".posticons [colspan='14']"));
    $(".posticons [colspan='14']").children().wrap("<nobr></nobr>")
    $(".posticons [colspan='14']").appendTo('.posticons tr:eq(0)');
    $(".posticons [colspan='4']").remove();
}

function addSmileyBoxForum(){
    $('<div class="smiley_box"><div>'+
      '<div align="center" style="float:left">'+
      '<a class="group" name="standard">'+	LANG[LID].sml.std +'</a>'+
      '<a class="group" name="grepolis">'+	LANG[LID].sml.gre +'</a>'+
      '<a class="group" name="nature">'+	LANG[LID].sml.nat +'</a>'+
      '<a class="group" name="people">'+	LANG[LID].sml.ppl +'</a>'+
      '<a class="group" name="other">'+		LANG[LID].sml.oth +'</a>'+
      '</div><div align="right" style="margin-top:2px;"><a class="smiley_link" href="http://adf.ly/eDbBl" target="_blank">WWW.GREENSMILIES.COM</a></div>'+
      '<hr class="smiley_hr">'+
      '<div class="smiley_box_cont" style="overflow: hidden;"><hr class="smiley_hr"></div>'+
      '</div></div><br>').insertAfter(".texteditor");
    
    addSmileys("standard", "");    
    
    $('.smiley_hr').css({ margin: '3px 0px 0px 0px', color:	'#086b18', border: '1px solid' });
    $('.smiley_link').css({ color: '#0c450c' });
    $('.smiley_link').hover(
        function(){$(this).css({ color: '#14999E' });}, 
        function(){$(this).css({ color: '#0c450c' });}
    );
    $('.smiley_box').css({ maxHeight: '90px', marginLeft: "5px", width: "99%", minHeight:"10px" });
    $('.smiley_box_cont').css({ height: '100px', overflow: 'overlay' });
    
    $('.group').css({ color:'#0c450c', marginRight: '10px', cursor:"pointer"}); $('.group[name="standard"]').css({ color:'#089421' });
    
    $('.group').click(function(){
        $('.group').each(function(){
            $(this).get(0).style.color = '#0c450c'; 
        });
        $(this).get(0).style.color = '#089421';
        // change smiley group
        addSmileys($(this).get(0).name, "");
    }); 
}


// insert smileys from arrays into smiley box
function addSmileys(type, bbcodeBarId){
    // reset smilies
    if($(bbcodeBarId + " .smiley_box_cont").get(0)) {$(bbcodeBarId + " .smiley_box_cont").get(0).innerHTML='';}
    // add smilies
    for(var e in smileyArray[type]){
        if(smileyArray[type].hasOwnProperty(e)) {
            $(smileyArray[type][e]).clone().appendTo(bbcodeBarId + " .smiley_box_cont");
            $(bbcodeBarId +" ."+ smileyArray[type][e].className).click(function(){
                var textarea;
                if(uw.location.pathname === "/game/index"){
                    // hide smiley box
                    $(this).closest('.bb_button_wrapper').find(".smiley_button").click();
                    // find textarea
                    textarea = $(this).closest('.gpwindow_content').find("textarea").get(0);
                } else {
                    
                    if($('.editor_textbox_container').get(0)) {
                        textarea = $('.editor_textbox_container .cke_contents textarea').get(0);
                    } else {
                        $(this).appendTo('iframe .forum');
                    }
                    //$(textarea).val(text.substring(0, $(textarea).get(0).selectionStart) + "[img]"+ $(this).get(0).src + "[/img]" + text.substring($(textarea).get(0).selectionEnd));
                }
                var text = $(textarea).val();
                $(textarea).val(text.substring(0, $(textarea).get(0).selectionStart) + "[img]"+ $(this).get(0).src + "[/img]" + text.substring($(textarea).get(0).selectionEnd));
            });
        }
    }
}

// add smiley box
function addSmileyBox(e){
    var bbcodeBarId = "";
    switch (e) {
        case "/alliance_forum/forum":	bbcodeBarId = "#forum"; 
            break;
        case "/message/forward":		bbcodeBarId = "#message_bbcodes";
            break;
        case "/message/new":			bbcodeBarId = "#message_bbcodes";
            break;
        case "/message/view":			bbcodeBarId = "#message_bbcodes";
            break;
        case "/player_memo/load_memo_content":	bbcodeBarId = "#memo_edit";
            break;   
    }
    if(($(bbcodeBarId + ' #emots_popup_7').get(0) || $(bbcodeBarId + ' #emots_popup_15').get(0)) && PID == 84367){
        $(bbcodeBarId + " .bb_button_wrapper").get(0).lastChild.remove();
    }
    $('<img class="smiley_button" src="http://www.greensmilies.com/smile/smiley_emoticons_smile.gif">').appendTo(bbcodeBarId + ' .bb_button_wrapper');
    
    $('<div class="smiley_box">'+
      '<div class="bbcode_box middle_center"><div class="bbcode_box middle_right"></div><div class="bbcode_box middle_left"></div>'+
      '<div class="bbcode_box top_left"></div><div class="bbcode_box top_right"></div><div class="bbcode_box top_center"></div>'+
      '<div class="bbcode_box bottom_center"></div><div class="bbcode_box bottom_right"></div><div class="bbcode_box bottom_left"></div>'+
      '<div align="center" style="width:100%;">'+
      '<a class="group" name="standard" href="">'+	LANG[LID].sml.std +'</a>'+
      '<a class="group" name="grepolis" href="">'+	LANG[LID].sml.gre +'</a>'+
      '<a class="group" name="nature" href="">'+	LANG[LID].sml.nat +'</a>'+
      '<a class="group" name="people" href="">'+	LANG[LID].sml.ppl +'</a>'+
      '<a class="group" name="other" href="">'+		LANG[LID].sml.oth +'</a>'+
      '</div>'+
      '<hr class="smiley_hr">'+
      '<div class="smiley_box_cont" style="overflow: hidden;"></div>'+
      '<hr class="smiley_hr">'+
      '<div align="center" style="margin-top:2px;"><a href="http://adf.ly/eDbBl" target="_blank"><span class="smiley_link">WWW.GREENSMILIES.COM</span></a></div>'+
      '</div>').appendTo(bbcodeBarId + ' .bb_button_wrapper');
    
    $(bbcodeBarId + ' .smiley_button').css({
        cursor: 'pointer',
        margin:'3px 2px 2px 2px'
    });
    $(bbcodeBarId + ' .smiley_box').css({
        zIndex: '5000', 
        position: 'absolute', 
        top: '27px', 
        left: '430px',
        width: '300px',
        display: 'none'
    });
    $(bbcodeBarId + ' .smiley_link').css({
        color: '#086b18',
        fontSize: '0.6em'
    });
    $(bbcodeBarId + ' .smiley_hr').css({
        margin:	'3px 0px 0px 0px',
        color:	'#086b18',
        border:	'1px solid'
    });
    $(bbcodeBarId + ' .group').css({
        color:'#0c450c'
    });
    $(bbcodeBarId + ' .group[name="standard"]').css({
        color:'#089421'
    });
    $(bbcodeBarId + ' .group').click(function(){
        $("#"+ $(this).closest('.bb_button_wrapper').parent().get(0).id +' .group').each(function(){
            $(this).get(0).style.color = '#0c450c';
        });
        $(this).get(0).style.color = '#089421';
        // change smiley group
        addSmileys($(this).get(0).name, "#"+ $(this).closest('.bb_button_wrapper').parent().get(0).id);
    });
    
    addSmileys("standard", bbcodeBarId);
    
    // smiley box toggle
    $(bbcodeBarId + " .smiley_button").toggle(
        function(){
            $(this).get(0).src = smileyArray.button[0].src;
            $(this).closest('.bb_button_wrapper').find(".smiley_box").get(0).style.display = "block";   
        }, 
        function(){
            $(this).get(0).src = smileyArray.button[1].src;
            $(this).closest('.bb_button_wrapper').find(".smiley_box").get(0).style.display = "none";  
        }
    );
}


/*******************************************************************************************************************************
 * Biremes counter
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Incremental update when calling a city (experimental, especially intended for siege worlds)
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/
var count, townId, biriArray = JSON.parse(GM_getValue(WID + "_biri_data", "{}"));

function updateBiriCount(){
    var sum =0, e;
    for(e in biriArray) {
        if(biriArray.hasOwnProperty(e)) {
            sum += parseInt(biriArray[e], 10);
        }
    }
    if(options.bir){
        sum = sum.toString();
        var str ="", fsize = ['1.4em', '1.2em', '1.15em', '1.1em', '1.0em'], i;
        
        for(i = 0; i<sum.length; i++){
            str += "<span style='font-size:" + fsize[i] + "'>" + sum[i] + "</span>";
        }
        $('#bi_count').get(0).innerHTML = "<b>" + str + "</b>";
    }
}

function getBiri(){
    var biremeIn = parseInt(uw.ITowns.getTown(uw.Game.townId).units().bireme, 10),
        biremeOut = parseInt(uw.ITowns.getTown(uw.Game.townId).unitsOuter().bireme, 10);
    if(isNaN(biremeIn)) biremeIn = 0;
    if(isNaN(biremeOut)) biremeOut = 0;
    if(!biriArray[uw.Game.townId] || biriArray[uw.Game.townId] < (biremeIn + biremeOut)) {
        biriArray[uw.Game.townId] = biremeIn;
    }
    updateBiriCount();
    saveBiri();
}

function getBiriDocks(){
    var windowID = uw.BuildingWindowFactory.getWnd().getID(),
        biremeTotal = parseInt($('#gpwnd_' + windowID + ' #unit_order_tab_bireme .unit_order_total').get(0).innerHTML, 10);
    
    if(!isNaN(biremeTotal)) biriArray[uw.Game.townId] = biremeTotal;
    updateBiriCount();
    saveBiri();
}

function getBiriAgora(){
    var biremeTotal = parseInt(uw.ITowns.getTown(parseInt(uw.Game.townId, 10)).units().bireme, 10);
    if(isNaN(biremeTotal)) biremeTotal = 0;
    
    $('#units_beyond_list .bireme').each(function(){
        biremeTotal += parseInt($(this).get(0).children[0].innerHTML, 10);
    });
    biriArray[uw.Game.townId] = biremeTotal;
    updateBiriCount();
    saveBiri();
}

function saveBiri(){
    setTimeout(function(){
        GM_setValue(WID + "_biri_data", JSON.stringify(biriArray));
    }, 0);
}

function initBiri() {
    $(".picomap_container").prepend("<div id='unit_count'><div id='bi_count'></div></div>");
    
    updateBiriCount();
    
    $('#unit_count').css({
        background: 'url(http://de.cdn.grepolis.com/images/game/units/units_sprite_90x90_compressed.jpg)',
        height: '90px',
        width: '90px',
        position: 'relative',
        margin: '5px 28px 0px 28px',
        backgroundPosition: '-270px 0px'
    });
    
    $('#sea_id').css({
        background: 'none',
        fontSize: '25px',
        cursor: 'auto',
        height: '50px',
        width: '50px',
        position: 'relative'
    });
    if($('#tutorial_quest_container').get(0)){
        $('#sea_id').prependTo('#tutorial_quest_container');
    } else {
        $('#sea_id').appendTo('#ui_box');
        $('#sea_id').css({
            position: 'absolute',
            top:  '75px',
            left: '157px'
        });
    }
    $('#bi_count').css({
        color: '#826021', 
        position: 'relative',
        top: '28px',
        fontStyle: 'italic',
        width: '79px'
    });    
    $('.picomap_overlayer').tooltip(LANG[LID].set.bir[0]);
}


/*******************************************************************************************************************************
 * Popups
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Available units (no supporting or outer units)
 * | ● Improved favor
 * | ● getTownTypes
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/
var groupUnitArray = {};
// TODO: split Function (getUnits, calcUnitsSum, availableUnits, countBiremes, getTownTypes)?
function getAllUnits(){
    var townArray = uw.ITowns.getTowns(), groupArray = uw.ITowns.townGroups.getGroups(),
        
        unitArray = {"sword":0, "archer":0, "hoplite":0, "chariot":0, "godsent":0, "rider":0, "slinger":0, "catapult":0, "small_transporter":0, "big_transporter":0,
                     "manticore":0, "harpy":0, "pegasus":0, "cerberus":0, "minotaur":0, "medusa":0, "zyklop":0, "centaur":0, "fury":0, "sea_monster":0 },
        
        unitArraySea = {"bireme":0, "trireme":0, "attack_ship":0, "demolition_ship":0, "colonize_ship":0 };
    
    if(uw.Game.is_hero_world){
        unitArray = $.extend(unitArray, {"griffin":0, "calydonian_boar":0});
    }
    unitArray = $.extend(unitArray, unitArraySea);
    
    
    for(var group in groupArray){
        if(groupArray.hasOwnProperty(group)){
            // clone Object "unitArray"
            groupUnitArray[group] = Object.create(unitArray);
            
            for(var town in groupArray[group]["towns"]){
                if(groupArray[group]["towns"].hasOwnProperty(town)){
                    var type = { lo: 0, ld: 0, so: 0, sd: 0, fo: 0, fd: 0 }; // Type for TownList
                    
                    for(var unit in unitArray){
                        if(unitArray.hasOwnProperty(unit)){
                            // All Groups: Available units
                            var tmp = parseInt(uw.ITowns.getTown(town).units()[unit], 10);
                            groupUnitArray[group][unit] +=  tmp || 0;
                            // Only for group "All"
                            if(group == -1){
                                //Bireme counter
                                if( unit === "bireme" && ((biriArray[townArray[town].id] || 0) < (tmp || 0))) {
                                    biriArray[townArray[town].id] = tmp;    
                                }
                                //TownTypes
                                if(!unitVal[unit].is_naval){
                                    if(unitVal[unit].flying){
                                        type.fd += ((unitVal[unit].def_hack + unitVal[unit].def_pierce + unitVal[unit].def_distance)/3 * (tmp || 0));
                                        type.fo += (unitVal[unit].attack * (tmp || 0));
                                    } else {
                                        type.ld += ((unitVal[unit].def_hack + unitVal[unit].def_pierce + unitVal[unit].def_distance)/3 * (tmp || 0));
                                        type.lo += (unitVal[unit].attack * (tmp || 0));
                                    }
                                } else {
                                    type.sd += (unitVal[unit].defense * (tmp || 0));
                                    type.so += (unitVal[unit].attack * (tmp || 0));
                                }
                            }
                        }
                    }
                    // Only for group "All"
                    if(group == -1){
                        // Icon: DEF or OFF?
                        var z = ((type.sd + type.ld + type.fd) <= (type.so + type.lo + type.fo)) ? "o" : "d",
                            temp = 0;
                        
                        for(var t in type){
                            if(type.hasOwnProperty(t)){
                                // Icon: Land/Sea/Fly (t[0]) + OFF/DEF (z)
                                if(temp < type[t]){
                                    autoTownTypes[townArray[town].id] = t[0] + z;
                                    temp = type[t];
                                }
                                // Icon: Troops Outside (overwrite)
                                if(temp < 1000){
                                    autoTownTypes[townArray[town].id] = "no";
                                }
                            }
                        }
                        // Icon: Empty Town (overwrite)
                        var popBuilding = 0, buildVal = uw.GameData.buildings, levelArray = townArray[town].buildings().getLevels(),
                            popTotal = Math.floor(buildVal.farm.farm_factor * Math.pow(townArray[town].buildings().getBuildingLevel("farm"), buildVal.farm.farm_pow)), // Population from farm level
                            popPlow = townArray[town].researches().attributes.plow ? 200 : 0,
                            popFactor = townArray[town].buildings().getBuildingLevel("thermal") ? 1.1 : 1.0, // Thermal
                            popExtra = townArray[town].getPopulationExtra();
                        for(var b in levelArray){
                            if(levelArray.hasOwnProperty(b)){
                                popBuilding += Math.round(buildVal[b].pop * Math.pow(townArray[town].buildings().getBuildingLevel(b), buildVal[b].pop_factor));
                            }
                        }
                        townPopulation[town] = popTotal * popFactor + popPlow + popExtra - (popBuilding + townArray[town].getAvailablePopulation());
                        if((popTotal * popFactor + popPlow + popExtra - (popBuilding + townArray[town].getAvailablePopulation())) < 300){
                            autoTownTypes[townArray[town].id] = "po";
                        }
                        // Icon: Farm Incomplete
                        if(townArray[town].buildings().getBuildingLevel("farm") < 40){
                            //autoTownTypes[townArray[town].id] = "bu";
                        }
                    }
                }
            }
        }
    }
    updateBiriCount();
    saveBiri();
    
    //if(options.pop)	{
    updateAvailableUnitsBox(groupUnitArray[-1]);
    //}
}

function addAvailableUnitsBox(){
    var groupArray = uw.ITowns.townGroups.getGroups();
    
    $('<div id="available_units_box" class="ui-dialog">'+
      '<div class="bbcode_box middle_center"><div class="bbcode_box middle_right"></div><div class="bbcode_box middle_left"></div>'+
      '<div class="bbcode_box top_left"></div><div class="bbcode_box top_right"></div><div class="bbcode_box top_center"></div>'+
      '<div class="bbcode_box bottom_center"></div><div class="bbcode_box bottom_right"></div><div class="bbcode_box bottom_left"></div>'+
      '<h4><nobr>'+ LANG[LID].uni + '</nobr></h4>'+
      '<div class="drop_box">'+
      '<div class="drop_group dropdown default">'+
      '<div class="border-left"></div><div class="border-right"></div>'+
      '<div class="caption" name="'+ groupArray[-1].id +'">'+ groupArray[-1].name +'</div>'+
      '<div class="arrow"></div>'+
      '</div>'+
      '<div class="select_group dropdown-list default active"><div class="item-list"></div></div>'+
      '</div><hr>'+
      '<div class="box_content"></div>'+
      '</div>').appendTo('body');
    
    for(var group in groupArray){
        if(groupArray.hasOwnProperty(group)){
            $('<div class="option'+ (group == -1 ? " sel" : "") +'" name="'+ group +'">'+ groupArray[group].name +'</div>').appendTo('#available_units_box .item-list');
        }
    }
    
    // Styles
    $('#available_units_box .drop_box').css({
        float: 'left',
        position: 'absolute',
        top: '1px',
        right: '0px',
        width: '90px',
        zIndex: '1'
    });
    $('#available_units_box h4').css({
        color: 'rgb(128, 64, 0)',
        width: '10px', 
        height: '25px', 
        marginLeft: '4px', 
        lineHeight: '1.9'
    });
    $('#available_units_box .drop_group').css({
        width: '84px'
    });
    $('#available_units_box .select_group').css({
        position: 'absolute',
        width: '80px',
        display: "none",
        right: '3px'
    });
    //$('#available_units_box .item-list').css({ maxHeight: '400px', maxWidth: '200px', align: "right" });
    
    $('#available_units_box .arrow').css({
        width: '18px',
        height: '18px',
        background: 'url('+ drop_out.src +') no-repeat -1px -1px',
        position: 'absolute'
    });
    
    // hover effects of the elements in the drop menu
    $('#available_units_box .option').hover(
        function(){ $(this).css({color: '#fff', background: "#328BF1"}); },
        function(){ $(this).css({color: '#000', background: "#FFEEC7"}); }
    );
    
    // click events of the drop menu
    $('#available_units_box .select_group .option').each(function(){
        $(this).click(function(e){
            $(this).parent().find(".sel").toggleClass("sel");
            $(this).toggleClass("sel");
            
            $('#available_units_box .drop_group .caption').attr("name", $(this).attr("name"));
            $('#available_units_box .drop_group .caption').get(0).innerHTML = $(this).get(0).innerHTML;
            $('#available_units_box .select_group')[0].style.display = "none";
            
            updateAvailableUnitsBox(groupUnitArray[$(this).attr("name")]);
            //$('#available_units_box .drop_group .caption').change();
        });
    });
    // show & hide drop menu on click
    $('#available_units_box .drop_group').click(function(){
        if($('#available_units_box .select_group')[0].style.display === "none"){
            $('#available_units_box .select_group')[0].style.display = "block";
        } else {
            $('#available_units_box .select_group')[0].style.display = "none";
        }
    });
    
    $('#available_units_box').click(function(e){
        var clicked = $(e.target);
        if(!(clicked[0].parentNode.className.split(" ")[1] === "dropdown")){
            $('#available_units_box .select_group').get(0).style.display = "none";
        }
    });
    
    // hover arrow change
    $('#available_units_box .dropdown').hover(function(e){
        $(e.target)[0].parentNode.childNodes[3].style.background = "url('"+ drop_over.src +"') no-repeat -1px -1px";
    }, function(e){
        $(e.target)[0].parentNode.childNodes[3].style.background = "url('"+ drop_out.src +"') no-repeat -1px -1px";
    });
    
    //$("#available_units_box .drop_group .caption").attr("name", "All");
    //$('#available_units_box .drop_group').tooltip();
    
    $('#available_units_box').draggable({ 
        containment: "body",
        snap: "body",
    });
    $('#available_units_box').css({
        color: 'rgb(12, 69, 12)',
        position: 'absolute',
        top: '100px',
        left: '200px',
        zIndex: getMaxZIndex() + 1,
        display: 'none'
    });
    $('#available_units_box .box_content').css({
        background: 'url(http://s1.directupload.net/images/140206/8jd9d3ec.png) 94% 94% no-repeat',
        backgroundSize: '140px'
    });
    
    $('#available_units_box').bind("mousedown",function(){
        $(this).get(0).style.zIndex = getMaxZIndex() + 1;
    });
    
    $('#available_units_box hr').css({ margin: '3px 0px 0px', border: '1px solid', color: 'rgb(128, 64, 0)'});
}

function updateAvailableUnitsBox(unitArray){
    var i = 0, content = '<table><tr><td>';
    for(var u in unitArray){
        if(unitArray.hasOwnProperty(u)){
            if(((i%5 == 0) && (i!== 25)) || u == "bireme") { 
                content += "</td></tr><tr><td>"; 
            }
            content += '<div class="unit index_unit bold unit_icon40x40 ' + u + ' " ><span style="font-size:0.9em">' + unitArray[u] + '</span></div> ';
            i++;
        }
    }
    content += '</td></tr></table>';
    $('#available_units_box .box_content').get(0).innerHTML = "";
    $('#available_units_box .box_content').append(content);
    /*
    $('#united_units').css({
        height: '300px',
        width: '300px',
        position: 'relative'
    });
    */
}

function unbindFavorPopup(){
    $('.gods_favor_button_area, #favor_circular_progress').mouseover();
    
    $('.gods_favor_button_area, #favor_circular_progress').bind('mouseover mouseout', function(){
        return false;
    });
    $('.gods_area').bind('mouseover', function(){
        setFavorPopup();
    });
}

var godArray = {
    zeus:		'   0px', //'http://s1.directupload.net/images/140116/mkhzwush.png',
    hera:		'-152px', //'http://s1.directupload.net/images/140116/58ob8z82.png',
    poseidon:	'-101px', //'http://s1.directupload.net/images/140116/dkfxrw2f.png',
    athena:		' -50px', //'http://s14.directupload.net/images/140116/iprgopak.png',
    hades:		'-203px', //'http://s14.directupload.net/images/140116/c9juk95y.png',
    artemis:	'-305px', //'http://s14.directupload.net/images/140116/pdc8vxe2.png'
};

var godImg = new Image(); godImg.src = "http://s7.directupload.net/images/140118/j5gzsghx.png";

function setFavorPopup(){
    var pic_row = "",
        fav_row	= "", 
        prod_row = "";
    
    for(var g in godArray){
        if(godArray.hasOwnProperty(g)){
            if(uw.ITowns.player_gods.attributes.temples_for_gods[g]){
                pic_row += '<td><div style="width:50px;height:51px;background:url('+ godImg.src +');background-position: 0px '+ godArray[g] +';"></td>';
                fav_row += '<td class="bold" style="color:blue">'+ uw.ITowns.player_gods.attributes[g + "_favor"] +'</td>';
                prod_row += '<td class="bold">'+ uw.ITowns.player_gods.attributes.production_overview[g].production +'</td>';
            }
        }
    }
    var tool_element = $('<table><tr><td></td>'+ pic_row +'</tr>'+
                         '<tr align="center"><td><img src="http://de.cdn.grepolis.com/images/game/res/favor.png"></td>'+ fav_row +'</tr>'+
                         '<tr align="center"><td>+</td>'+ prod_row +'</tr>'+
                         '</table>');
    
    $('.gods_favor_button_area, #favor_circular_progress').tooltip(tool_element);
}


/*******************************************************************************************************************************
 * GUI Optimization
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Modified spell box (smaller, moveable & position memory)
 * | ● Larger taskbar and minimize daily reward-window on startup
 * | ● Modify chat
 * | ● Improved display of troops and trade activity boxes (movable with position memory on startup)
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

// Spellbox
function catchSpellBox(){
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            //console.log(mutation);
            if(mutation.addedNodes[0]){
                //console.log(mutation.addedNodes[0] + "   " + mutation.attributeName);
                changeSpellBox();
            }
            // Löschen...
            if(mutation.addedNodes[0]){
                if(mutation.addedNodes[0].id == "town_groups_list"){
                    $('#town_groups_list .inner_column').css({
                        width: '150px',
                        textAlign: 'left'                
                    });
                }
            }
        });    
    });
    observer.observe($('.gods_spells_menu .content').get(0), { attributes: false, childList: true, characterData: false });
}

function initSpellBox(){
    var spellbox_top, spellbox_left, spellbox_show;
    
    $('<style type="text/css">'+
      '.gods_spells_active .nui_right_box {'+ 
      'height: 158px !important;'+
      '</style>').appendTo('head');
    
    setTimeout(function(){
        spellbox_show = GM_getValue("spellbox_show", false);
        
        // Timeout nicht optimal!!!
        setTimeout(function(){
            if(spellbox_show) {
                $('.btn_gods_spells').click();
            }
        }, 2500); 
    }, 0);
    
    $('.btn_gods_spells').click(function(){
        spellbox_show = !spellbox_show;
        setTimeout(function(){
            GM_setValue("spellbox_show", spellbox_show);
        }, 0);
    });
    
    $('.nui_units_box').css({
        display: 'block',
        marginTop: '-8px',
        position: 'relative'
    });
    $('.nui_right_box').css({
        height: '158px'
    });
    $('.nui_units_box .bottom_ornament').css({
        marginTop: '-28px',
        position: 'relative'
    });
    $('.gods_spells_menu .top').css({
        //marginTop: '-28px',
        //backgroundPosition: 'right -232px'
    });
    $('.gods_area').css({
        height: '170px'
    });
    
    $(".gods_spells_menu").draggable({ 
        containment: "body",  
        distance: 10 , 
        snap: "body, .gods_area, .nui_units_box, .ui_quickbar, .nui_main_menu, .minimized_windows_area, #island_quests_overview", 
        opacity: 0.7,
        stop : function(){
            spellbox_top = this.style.top;
            spellbox_left = this.style.left;
            setTimeout(function(){
                GM_setValue("spellbox_top", spellbox_top);
                GM_setValue("spellbox_left", spellbox_left);
            }, 0);
            //console.log(spellbox_top + "  " + spellbox_left);
        }
    });
    $(".gods_area .gods_spells_menu").before($('.nui_units_box'));
    
    setTimeout(function(){
        spellbox_top = GM_getValue("spellbox_top", "23%");
        spellbox_left = GM_getValue("spellbox_left", "-150%");
        
        //console.log(spellbox_top + "   " + spellbox_left);
        
        $('.gods_spells_menu').css({
            position:	'absolute',
            left:		spellbox_left,
            top:		spellbox_top,
            zIndex:		'5000',
            padding:	'30px 0px 0px -4px'
        }); 
    }, 0);
}
function changeSpellBox(){
    $('.god_container[data-god_id="zeus"]').css({
        width: '43px',
        float: 'left'
    });
    $('.god_container[data-god_id="zeus"] .powers_container').css({
        background: 'none'
    });
    $('.god_container[data-god_id="athena"]').css({
        width: '85px',
        float: 'left'
    });
    $('.god_container[data-god_id="athena"] .powers_container').css({
        background: 'none'
    });
    $('.content .title').each(function(){
        $(this).get(0).remove();
    });
    //$('.gods_spells_menu .god_container[data-god_id="zeus"]').before('.god_container[data-god_id="poseidon"]');
    if($('.bolt').get(0)) $('.bolt').get(0).remove();
    if($('.earthquake').get(0)) $('.earthquake').get(0).remove();
    if($('.pest').get(0)) $('.pest').get(0).remove();
}

// Minimize Daily reward window on startup
function minimizeDailyReward(){
    var startup, daily_reward_minimized = false, town_window = false;
    startup = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.addedNodes[0]){
                if($('#new_daily_reward').get(0) && !uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_SHOW_ON_LOGIN).isMinimized()){
                    uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_SHOW_ON_LOGIN).minimize();
                }
            }
        });    
    });
    startup.observe($('body').get(0), { attributes: false, childList: true, characterData: false});
    
    setTimeout(function(){ startup.disconnect();}, 3000);
}

// Larger taskbar
function scaleTaskbar(){
    $('.minimized_windows_area').get(0).style.width= "150%";
    $('.minimized_windows_area').get(0).style.left= "-25%";
}
// hide fade out buttons => only for myself
function hideNavElements() {
    if((PID == 84367) && (uw.Game.premium_features.curator<=uw.Timestamp.now())){
        $('.nav').each(function() {
            $(this).get(0).style.display = "none";
        });
    }
}

/*******************************************************************************************************************************
 * Modify Chat
 *******************************************************************************************************************************/
function popupChatUser(){
    setTimeout(function(){
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://wwwapi.iz-smart.net/modules.php?name=Chaninfo&file=nicks&chan=Grepolis"+ uw.Game.market_id.toUpperCase(),
            onload: function(response) {
                //$('.nui_main_menu .chat .indicator').get(0).innerHTML = 
                //console.log(response.responseText);
                //$('.nui_main_menu .chat .indicator').get(0).style.display = 'inline';
            }
        }); 
    }, 0);
}

function initChatUser(){
    $('.nui_main_menu .chat .button, .nui_main_menu .chat .name_wrapper').css({
        WebkitFilter: 'hue-rotate(65deg)',
        filter: 'url(#Hue1)'
    });
    updateChatUser();
    setInterval(function(){ updateChatUser(); }, 300000);
    $('.nui_main_menu .chat').mouseover(function(){
        //popupChatUser();
    });
    if($('.nui_main_menu .chat').hasClass('disabled')){ $('.nui_main_menu .chat').removeClass('disabled');}
}

function updateChatUser(){
    var market = uw.Game.market_id;
    //if(uw.Game.market_id !== 'fr'){
    setTimeout(function(){
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://api.relay-chat.de/compteur_js.php?chan="+ (market === "de" ? "Grepolis" + uw.Game.market_id.toUpperCase() : "GREPO"),
            onload: function(response) {
                $('.nui_main_menu .chat .indicator').get(0).innerHTML = response.responseText.split("'")[1];
                $('.nui_main_menu .chat .indicator').get(0).style.display = 'inline';
            }
        }); 
    }, 0);
    //}
}

// Modify chat window
var chat_is_hidden = false, chatwnd_id;
function modifyChat() {
    var host = { fr: 'irc.quakenet.org', def: 'flash.afterworkchat.de'}, market = uw.Game.market_id;
    setTimeout(function(){ updateChatUser(); }, 10000); setTimeout(function(){ updateChatUser(); }, 30000);
    
    //uw.GPWindowMgr.Create(uw.Layout.wnd.TYPE_CHAT);
    
    //uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_CHAT).setWidth(300);
    //uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_CHAT).setHeight(0);
    //uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_CHAT).setPosition([0,'bottom']);
    
    //console.log(uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_CHAT));
    
    chatwnd_id = '#gpwnd_' + uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_CHAT).getID();
    //$(chatwnd_id).parent().children('.gpwindow_left').remove();
    //$(chatwnd_id).parent().children('.gpwindow_right').remove();
    //$(chatwnd_id).parent().children('.gpwindow_top').remove();
    //$(chatwnd_id).parent().children('.gpwindow_bottom').remove();
    //$(chatwnd_id).parent().parent().children('.ui-dialog-titlebar').remove();
    
    var nickname = uw.Game.player_name.replace(/[.,:,+,*]/g,"").replace(/[=,\ ,-]/g,"_").replace(/ö/gi,"oe").replace(/ä/gi,"ae").replace(/ü/gi,"ue").replace(/ß/g,"ss");
    
    $('#chat').get(0).innerHTML = "";
    
    $('<iframe src="http://flash.afterworkchat.de/1.0/FlashChat.swf'+ //http://grepodio.heliohost.org/lightIRC/index.php'+ 
      '?host='+ host.def + //( market === 'fr' ? host.fr : host.def ) +
      '&policyPort=9000'+
      //'&port=6667'+
      '&languagePath=http://flash.afterworkchat.de/1.0/language/'+
      '&styleURL=http://grepodio.heliohost.org/lightIRC/css/green2.css'+ //http://grepodio.heliohost.org/style.css'+ //
      '&emoticonPath=http://grepodio.heliohost.org/lightIRC/emoticons/'+ //http://www.greensmilies.com/smile/smiley_emoticons_'+
      '&emoticonList='+
      ':)->happy.png,'+
      ':(->sad.png,'+
      ':O->baby2.swf,'+
      //';)->thumbs-up_new.gif,'+
      ':D->biggrin.png,'+
      '~D->coffee2.swf,'+
      ':P->tongue.swf,'+
      '8)->cool.png,'+
      ':|->neutral.png,'+
      'X)->drunk.swf,'+
      '%5e%5e->grins.png,'+
      ':{->frown2.swf,'+
      ':S->verlegen.png,'+
      ':$->blush.swf,'+
      ////':S->unsure.gif,'+
      ':]->lol2.swf,'+
      ':*->bussi.swf,'+
      ':[->fluch.swf'+
      '&accessKey=54a2846a460ae1703ac690d21551b997'+
      '&nick='+ nickname +
      '&nickAlternate='+ nickname +'_'+
      '&autojoin='+ (market === "de" ? '%23GREPO,%23' + uw.Game.world_id + ',%23Grepolis'+ market.toUpperCase() : '%23Grepolis'+ market.toUpperCase() + ",%23GREPO") +
      //( market === 'fr' ? '%23Grepolis.fr' : '%23Grepolis'+ market.toUpperCase() ) +
      '&showNavigation=true'+
      '&navigationPosition=top'+
      '&showNickSelection=false'+
      '&showIdentifySelection=false'+
      '&language='+ market +
      '&quitMessage=CYA'+
      '&showChannelHeader=false'+
      //'&useUserListIcons=true'+
      '&userListWidth=100'+
      '&soundAlerts=true'+
      '&soundOnNewChannelMessage=false'+
      '&showServerWindow=false'+
      '&fontSize=9'+
      '&showJoinPartMessages=false'+
      '&showMenuButton=false'+
      '&showTranslationButton=false'+
      '&showTimestamps=true'+
      //'&showInfoMessages=false'+
      '&showRegisterNicknameButton=false'+
      '&showRichTextControls=false'+
      //'&useUserListIcons=true'+
      '&showUserListInformationPopup=false'+
      '&showNickChangeButton=false'+
      '&showChannelCentral=false'+
      '&showOptionsButton=false'+
      '&showEmoticonsButton=true'+
      '&rememberNickname=false'+
      '" style="width:518px; height:357px; border:0px;"></iframe>').appendTo("#chat");
    
    //$('<iframe name="web" src="http://webchat.quakenet.org/?nick=Diony&channels=GrepolisDE&uio=Mz1mYWxzZSY5PXRydWUmMTA9dHJ1ZSYxMT00MSYxMz1mYWxzZQf0" width="500" height="400"></iframe>').appendTo("#chat");
    //$('<iframe src="http://flash.afterworkchat.de/1.0/FlashChat.swf?host=flash.afterworkchat.de&languagePath=http://flash.afterworkchat.de/1.0/language/&emoticonPath=http://flash.afterworkchat.de/1.0/emoticons/&accessKey=54a2846a460ae1703ac690d21551b997&policyPort=9000&nick=Chat-Besucher%25&realname=http://www.AfterWorkChat.de&autojoin=%23GrepolisDE&showNickSelection=false&showIdentifySelection=false&language=de&quitMessage=&soundAlerts=false&fontSize=9&showJoinPartMessages=false&showTimestamps=true&showRegisterNicknameButton=false&showNickChangeButton=false&showOptionsButton=false&rememberNickname=false&styleURL=http://flash.afterworkchat.de/1.0/css/black.css" style="width:800px; height:400px;"></iframe>').appendTo("#chat");
    
    //$('<style type="text/css"> #ircui { background-color: black !important;} </style>').appendTo('head');
    /*
        setTimeout(function(){
            console.log("bla");
            window.frames[0].document.getElementById('ircui').append("I was modified by JS!");
            //$("iframe").contents().find("body").append("I was modified by JS!");
            console.log(document.getElementById('web'));
            console.log(document.getElementById('ircui'));
            var li = document.createElement('li');

            
        }, 5000);
        
        */
    /*
    $('.chat_left').css({
        height: '190px',
        width: '20px',
        position: 'absolute',
        right: '0px',
        //background: 'url(http://s7.directupload.net/images/140410/m8n9eafe.png) no-repeat 2px 50%',
        //backgroundSize: '19px 130%'
    });
    */
    //$(chatwnd_id).animate({ width: "300px"}, 800);
    //uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_CHAT).setHeight(200);
    //uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_CHAT).setPosition([0,'bottom']);
    //$('#chat_controls').remove();
    
    /*
        $('.btn_hide_chat').toggle(function(){
            $(chatwnd_id).parent().parent().animate({ width: "140px", left: "-120px"}, 800);
            $(chatwnd_id).animate({ width: "140px"}, 800);
            setTimeout(function(){
                $('.btn_hide_chat').removeClass('left'); $('.btn_hide_chat').addClass('right');
            }, 800); 
            chat_is_hidden = true;
        }, function(){
            $(chatwnd_id).parent().parent().animate({ width: "300px", left:"0px"}, 800);
            $(chatwnd_id).animate({ width: "300px"}, 800);
            setTimeout(function(){
                $('.btn_hide_chat').removeClass('right'); $('.btn_hide_chat').addClass('left');
            }, 800);
            chat_is_hidden = false;
        });
        */
    
    //appendTo('.chat_elements');
    /*
    $('<style type="text/css"> '+ chatwnd_id +' { left: 0px !important;top: 0px;overflow: visible;right: -15px;top: 0px;} </style>').appendTo('head');
    
    $('<style type="text/css"> #chat_roominfo { width: 25% !important; font-size: 0.8em;right:20px;overflow: hidden; border-right: 1px solid #D1BF91;} </style>').appendTo('head');
    $('<style type="text/css"> #chat_history_bg, #chat_message_text { width: 68% !important; font-size: 0.7em;} </style>').appendTo('head');
    $('<style type="text/css"> #chat_history_bg { bottom: 20px !important;} </style>').appendTo('head');
    $('<style type="text/css"> #chat { background: url(http://gpde.innogamescdn.com/images/game/layout/gpwindow_bg.jpg) 0 0 repeat; border: 4px inset rgb(109, 87, 59); overflow: hidden !important;border: 3px inset rgb(59, 109, 59);border-radius: 10px;} </style>').appendTo('head');
    
    $('<style type="text/css"> #chat_history .chat_line_date { position: relative !important; float: left; margin: 2px 5px 0px -2px !important; font-size: 0.8em !important;} </style>').appendTo('head');
    
    $('<style type="text/css"> #chat_history .chat_line { padding: 1px 0px 0px 0px;} </style>').appendTo('head');
    
    $('<style type="text/css"> #chat_history .chat_line_sender { color: #0A5700 !important;} </style>').appendTo('head');
    
    //$('<style type="text/css"> #chat_history { word-break: break-all;} </style>').appendTo('head');
    
    $('<style type="text/css"> #chat_history .chat_line_notification .chat_line_message { margin: 0px 0px 0px 0px !important; color: rgb(68, 0, 0);} </style>').appendTo('head');
    
    $('<style type="text/css"> #chat_message_text { height: 16px !important;} </style>').appendTo('head');
    
    */
    
    //uw.Layout.playerProfile.open('Diony');
    
    //uw.Layout.allianceProfile.open(69);
    
    
    // Hide Chat in the menu
    /*
    setTimeout(function(){
        $('.chat').get(0).remove();
        $('.nui_main_menu .content ul').get(0).style.height = ($('.nui_main_menu .content ul').height() - 34) + "px";
    },0);
    */
}

/*
$(window).resize(function() {
    //uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_CHAT).setPosition(['0px','bottom']);
    if(chat_is_hidden){
        //$(chatwnd_id).parent().parent().css({ left:"-120px"});
    } else {
        //$(chatwnd_id).parent().parent().css({ left:"0px"});
    }
});
*/

/*******************************************************************************************************************************
 * Activity boxes
 * ----------------------------------------------------------------------------------------------------------------------------
 * | ● Show troops and trade activity boxes
 * | ● Boxes are magnetic & movable (position memory)
 * ----------------------------------------------------------------------------------------------------------------------------
 *******************************************************************************************************************************/

var box_standard = { trade: { top: 55, left: 450 }, commands : { top: 55, left: 250 } }, mut_toolbar, mut_command, mut_trade;

box = JSON.parse(GM_getValue("box", JSON.stringify(box_standard)));

function checkToolbarAtStart(){
    if(parseInt($('.toolbar_activities .commands .count').get(0).innerHTML, 10) > 0){
        $('#toolbar_activity_commands_list').get(0).style.display = "block";
    } else {
        $('#toolbar_activity_commands_list').get(0).style.display = "none";
    }
    if(parseInt($('.toolbar_activities .trades .count').get(0).innerHTML, 10) > 0){
        $('#toolbar_activity_trades_list').get(0).style.display = "block";
    } else {
        $('#toolbar_activity_trades_list').get(0).style.display = "none";
    }
}

function catchToolbarEvents(){
    mut_toolbar = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.addedNodes[0]){
                //console.log(mutation);
                if(mutation.target.id === "toolbar_activity_trades_list"){
                    draggableTradeBox();
                } else {
                    draggableCommandBox();
                }
                mutation.addedNodes[0].remove();
            }
        });    
    });
    mut_command = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.addedNodes[0]){
                if(mutation.addedNodes[0].nodeValue > 0){
                    $('#toolbar_activity_commands_list').get(0).style.display = "block";
                } else {
                    $('#toolbar_activity_commands_list').get(0).style.display = "none";
                }
            }
        });    
    });
    mut_trade = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.addedNodes[0]){
                if(mutation.addedNodes[0].nodeValue > 0){
                    $('#toolbar_activity_trades_list').get(0).style.display = "block";
                } else {
                    $('#toolbar_activity_trades_list').get(0).style.display = "none";
                }
            }
        });    
    });
}

// moveable boxes
function draggableTradeBox(){
    $("#toolbar_activity_trades_list").draggable({ 
        containment: "body",
        distance: 20,
        snap: "body, .gods_area, .nui_units_box, .ui_quickbar, .nui_main_menu, .minimized_windows_area, .nui_left_box", 
        opacity: 0.7,
        start : function () {
            $("#fix_trade").remove();
        },
        stop : function () {
            var pos = $('#toolbar_activity_trades_list').position();
            box.trade.left = pos.left;
            box.trade.top = pos.top;
            setTimeout(function(){
                GM_setValue("box", JSON.stringify(box));
            }, 0);
            
            $('<style id="fix_trade" type="text/css">'+
              '#toolbar_activity_trades_list {'+
              'left:' + box.trade.left	+ 'px !important;'+
              'top: ' + box.trade.top	+ 'px !important}'+
              '</style>').appendTo('head');	
        }
    });
}

function draggableCommandBox(){
    $("#toolbar_activity_commands_list").draggable({ 
        containment: "body",
        distance: 20,
        snap: "body, .gods_area, .nui_units_box, .ui_quickbar, .nui_main_menu, .minimized_windows_area, .nui_left_box", 
        opacity: 0.7,
        stop : function () {
            var pos = $('#toolbar_activity_commands_list').position();
            box.commands.left = pos.left;
            box.commands.top = pos.top;
            setTimeout(function(){
                GM_setValue("box", JSON.stringify(box));
            }, 0);
        }
    });
}

function showCommandsAndTrades(){
    var observe_options = { attributes: false, childList: true, characterData: false};
    
    catchToolbarEvents();
    
    mut_toolbar.observe($('#toolbar_activity_commands_list').get(0), observe_options );
    mut_toolbar.observe($('#toolbar_activity_trades_list').get(0), observe_options );
    
    mut_command.observe($('.toolbar_activities .commands .count').get(0), observe_options );
    mut_trade.observe($('.toolbar_activities .trades .count').get(0), observe_options );
    
    $('#toolbar_activity_commands').mouseover();
    $('#toolbar_activity_trades').mouseover();
    $('#toolbar_activity_commands, #toolbar_activity_trades').unbind("mouseover");
    $('#toolbar_activity_commands, #toolbar_activity_commands_list, #toolbar_activity_trades, #toolbar_activity_trades_list').unbind("mouseout");
    $('#toolbar_activity_trades_list').unbind("click");
    
    checkToolbarAtStart();
    
    $('#toolbar_activity_commands_list').css({
        left:	box.commands.left	+ "px",
        top:	box.commands.top	+ "px"
    });
    
    $('<style id="fix_lists" type="text/css">'+
      '#toolbar_activity_commands_list, #toolbar_activity_trades_list { width: 160px}'+
      '.dropdown-list .content { max-height: 329px}'+
      '</style>'+
      '<style id="fix_trade" type="text/css">'+
      '#toolbar_activity_trades_list {'+
      'left:' + box.trade.left	+ 'px !important;'+
      'top: ' + box.trade.top	+ 'px !important}'+
      '</style>').appendTo('head');
    
    draggableCommandBox();
    draggableTradeBox();
    
    $('.toolbar_activities .commands').mouseover(function(){
        $('#toolbar_activity_commands_list').get(0).style.display = "block";
    });
    $('.toolbar_activities .trades').mouseover(function(){
        $('#toolbar_activity_trades_list').get(0).style.display = "block";
    });
}

/*******************************************************************************************************************************
 * Other stuff
 *******************************************************************************************************************************/

function counter(time){
    var type = "", today, counted, year, month, day;
    if(uw.Game.market_id !== "zz"){
        setTimeout(function(){
            counted = JSON.parse(GM_getValue("Counter",'[ "00000000", false ]'));
            today = new Date((time + 7200) * 1000);
            year = today.getUTCFullYear();
            month = ((today.getUTCMonth()+1) < 10 ? "0" : "") + (today.getUTCMonth()+1);
            day = (today.getUTCDate() < 10 ? "0" : "") + today.getUTCDate();
            today = year + month + day;
            console.log(today);
            if(counted[0] !== today){type += "d"; }
            if(counted[1] == false){ type += "t"; }
            if(type !== ""){
                setTimeout(function(){
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: "http://grepodio.heliohost.org/count.php?type="+ type + "&market="+ uw.Game.market_id + "&date="+ today,
                        onload: function(response) {
                            //console.log(response.responseText);
                            if(response.responseText.indexOf("tot") > -1){
                                counted[1] = true; 
                            }
                            if(response.responseText.indexOf("dly") > -1){
                                counted[0] = today;
                            }
                            setTimeout(function(){
                                GM_setValue("Counter", JSON.stringify(counted));
                            }, 0);  
                        }
                    });
                }, 0);
            }
        },0);
    }
}

/*
function xmas(){
    $('<a href="http://www.greensmilies.com/smilie-album/" target="_blank"><div id="xmas"></div></a>').appendTo('#ui_box');
    $('#xmas').css({
        background: 'url("http://www.greensmilies.com/smile/smiley_emoticons_weihnachtsmann_nordpol.gif") no-repeat',
        height: '51px',
        width: '61px',
        position:'absolute',
        bottom:'10px',
        left:'60px',
        zIndex:'2000'
    });
    $('#xmas').tooltip("HO HO HO, Frohe Weihnachten!");  
}

function silvester(){
    $('<a href="http://www.greensmilies.com/smilie-album/" target="_blank"><div id="silv">'+
      '<img src="http://www.greensmilies.com/smile/sign2_2.gif">'+
      '<img src="http://www.greensmilies.com/smile/sign2_0.gif">'+
      '<img src="http://www.greensmilies.com/smile/sign2_1.gif">'+
      '<img src="http://www.greensmilies.com/smile/sign2_4.gif">'+
      '</div></a>').appendTo('#ui_box');
    $('#silv').css({
        //background: 'url("http://www.greensmilies.com/smile/buchstaben_0.gif") no-repeat',
        //height: '57px',
        //width: '34px',
        position:'absolute',
        bottom:'10px',
        left:'70px',
        zIndex:'10'
    });
    $('#silv').tooltip("Frohes Neues!");  
}

function joke(){
    setTimeout(function(){
        if($('#grcgrc').get(0)){
            $('<a href="http://www.greensmilies.com/smilie-album/" target="_blank"><div id="fight"></div></a>').appendTo('#ui_box');
            $('#fight').css({
                background: 'url("http://www.greensmilies.com/smile/smiley_emoticons_hoplit_speer4.gif") no-repeat',
                height: '51px',
                width: '61px',
                position:'absolute',
                bottom:'10px',
                left:'39px',
                zIndex:'2000'
            });
            $('#fight').tooltip("WWW.GREENSMILIES.COM");
        }
    }, 5000);
}
*/