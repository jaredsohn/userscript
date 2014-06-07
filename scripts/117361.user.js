// ==UserScript==
// @name TW Pro script
// @description The West enhancer (multilingual)
// @author NEXTON, Lekensteyn
// @namespace http://twpro.lekensteyn.nl/
// @version 1.4.21.22
// @include http://*.the-west.*/game.php*
// @include http://*.the-west.*/forum.php*
// @include http://*.thewest.*/game.php*
// @include http://*.thewest.*/forum.php*
// ==/UserScript==
/**
 * RC 28112009
 * See ChangeLog file for changes or visit twpro.lekensteyn.nl
 * $Date: 2011-09-15 10:48:40 +0200 (do, 15 sep 2011) $
 * $Revision: 22 $
 */

// handle non-GreaseMonkey browsers
var insertWindow = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
var sie = insertWindow.document.createElement('script');
sie.type = 'text/javascript';
if(typeof uneval == 'undefined') function uneval(o){return o.toString()};
sie.text = "(" + uneval(function(){
	var twpro_currentVersion = "1.4.21.22";
/**
 * If you have contributed to TW Pro, add your name below. Please respect others
 * work, do not remove names.
 * Translators can add their name and contact details to "info: ['name', 'url_or_email']"
 * Please submit translations to lekensteyn@gmail.com or
 * http://twpro.lekensteyn.nl/translate.php
 */
	var twpro_authors = "NEXTON, Lekensteyn";
	var twpro_langs = {};
	// begin translations
	twpro_langs.en = {
		info: ['Lekensteyn', 'mailto:lekensteyn@gmail.com'],
		WEBSITE: 'Website',/*Displayed in footer, below game chat. This text is a link to the TW Pro website (http://twpro.lekensteyn.nl/)*/
		AUTHOR: 'Author',/*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Translator',/*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'script disabled',/*TW Pro can be disabled in the script. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Order by <b>name</b>',/*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Order by <b>experience</b>',/*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Order by <b>wages</b>',/*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Order by <b>luck</b>',/*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Order by <b>job rank</b>',/*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Order by <b>danger</b>',/*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Order by <b>labor points</b>',/*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: "Hide activities I cannot do",/*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Just display the best clothing available for the selected activity',/*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Choose activity...',/*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Calculating values, please wait...',/*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Inventory statistics',/*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Sales value',/*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Objects',/*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Products',/*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Total',/*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Quantities',/*Visible in the Inventory statistics tooltip. */
		NONYIELDS: 'Non-yields',/*Visible in the Inventory statistics tooltip. */
		LABORP: 'LP',/*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity list and other places*/
		CONSTRUCTION: 'Construction',/*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Total health points',/*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Calculate data...',/*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Convert',/*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Sell multiple items...',/*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Sell selection',/*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Do you really want to sell %1 stacks of items?',/*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Selling...',/*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'The selected items have been sold.',/*This text is displayed after a multi-sale*/
		NONESELECTED: 'You have to select at least one item!',/*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Job ranking settings',/*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Search inventory',/*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Your search for %1 returned no results.%2Display all items%3',/*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Disable hiding items which are inferior for a selected activity.',/*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Search the inventory. You can use wildcards (* for zero or more characters, ? for one character)',/*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: 'Range dueler (attacker)',/*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: 'Range dueler (defender)',/*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: 'Melee dueler',/*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: 'Fortbattle (attacker)',/*A special activity for attackers in fort battles*/
		FORTDEFEND: 'Fortbattle (defender)',/*A special activity for defenders in fort battles*/
		HIDEJOBS: 'Hide activities and itemsets',/*This text is shown in the title bar of the TW Pro settings window, displayed after clicking "Config"*/
		CONFIRM: 'Confirm',/*The button for confirming/ saving changes in the "Hide activities and itemsets" window*/
		HIDEJOBDESC: 'Jobs can be hidden here. Mark all activities which should not be calculated automatically, and click Confirm.',/*The description for the "Hide activities and itemsets" window*/
		SHOWN: 'Shown',/*Displayed ahead the selection field for activities that are currently shown*/
		HIDDEN: 'Hidden',/*Displayed ahead the selection field for activities that are currently hidden*/
		SETTINGSSAVED: 'The settings for TW Pro have been applied!',/*After clicking "Confirm" in the "Hide activities and itemsets" window, this message is displayed*/
		SETTINGSSAVEDSESSION: 'The settings for TW Pro have been applied! (for this session only)',/*After clicking "Confirm" in the "Hide activities and itemsets" window while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Save these settings for every session.',/*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Hide activities and itemsets" window. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'You cannot wear this set, or this set has no influence on the Activity calculations.',/*This text is displayed when hovering over an item set at the "Hide activities and itemsets" window for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Disable itemsets for faster calculations. Sets with special, unmet requirements are disabled by default.',/*The description displayed ahead the settings for itemsets at the "Hide activities and itemsets" window*/
		CUSTOMNAME: 'Enter the desired name for an activity',/*This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity*/
		CUSTOMCALCULATION: 'Enter a valid TW Pro calculation here.',/*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Hide activities and itemsets" window*/
		CUSTOMENABLED: 'Check this box to enable this activity',/*This button is visible at the "Hide activities and itemsets" window. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: 'New',/*This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: 'Speed',/*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: 'Fastest lifepoints',/*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Itemsets",/*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Bonuses with %1 items',/*Displayed in Setinfo window*/
		LABORPOINTS: 'Labor points',/*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'This number indicates the amount of items which are used in calculations',/*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Regeneration',/*__ % Regeneration with Sleepyhead items*/
		LUCK: 'luck',/*__ % luck with Holiday set items*/
		PRAYING: 'praying',/*6 Sleepyhead items gives +1 Praying*/
		NOEXTENDEDJOBLIST: 'Do not show the current Labourpoints of activities in the Activity list'/*A configuration option; Selecting the checkbox results in disabling the extension (marking and showing the current labourpoints of activities) to the Activity list*/
	};
	twpro_langs.de = {
		info: ['Lekensteyn', "mailto:lekensteyn@gmail.com"],
		WEBSITE: "Webseite",
		AUTHOR: "Autor",
		TRANSLATOR: "\xDCbersetzer",
		TWPRO_DISABLED: "global deaktiviert",
		SORTBYNAME: "Nach <b>Namen</b> sortieren",
		SORTBYXP: "Nach <b>Erfahrung</b> sortieren",
		SORTBYWAGES: "Nach <b>Lohn</b> sortieren",
		SORTBYLUCK: "Nach <b>Gl\xFCck</b> sortieren",
		SORTBYCOMB: "Nach <b>Vorz\xFCgen</b> sortieren",
		SORTBYDANGER: "Nach <b>Gefahr</b> sortieren",
		SORTBYLABORP: "Nach <b>Arbeitspunkten</b> sortieren",
		FILTERJOBS: "Blende die Arbeiten, die du nicht machen kannst, aus",
		FILTERCLOTHING: "Zeige nur die beste Kleidung f\xFCr die ausgew\xE4hlte Arbeit",
		CHOOSEJOB: "Arbeit ausw\xE4hlen...",
		CALCJOB: "Bitte warten, berechne Werte...",
		INVENTSTATS: "Inventar-Statistik",
		SELLVALUE: "Verkaufswerte",
		OBJECTS: "Gegenst\xE4nde",
		PRODUCTS: "Produkte",
		TOTAL: "Gesamtwert",
		QUANTITIES: "St\xFCckzahlen",
		NONYIELDS: "Nicht-Produkte",
		LABORP: "AP",
		CONSTRUCTION: "Stadtausbau",
		HPTOTAL: "Trefferpunkte gesamt",
		STARTCALC: "Daten berechnen...",
		CONVERT: "Konvertieren",
		MULTISEL: "Mehrere Sachen verkaufen",
		SELL: "Ausgew\xE4hlte verkaufen",
		CONFIRMSELL: "Sollen wirklich die %1 ausgew\xE4hlten Sachen verkauft werden?",
		SELLING: "Verkauft...",
		SALEDONE: "Ausgew\xE4hlte Gegenst\xE4nde sind verkauft worden.",
		NONESELECTED: "Es muss mindestens ein Gegenstand ausgew\xE4hlt werden!",
		JOBRANKSETTINGS: "Bevorzugte Job-Gewichtung",
		SEARCHINVENTORY: "Durchsuche Inventar",
		NOSEARCHRESULT: "Suche nach %1 war erfolglos.%2Alle Gegenst\xE4nde anzeigen%3",
		DISABLEBESTFORJOB: "Deaktiviere das Ausblenden von minderwertigen Gegenst\xE4nden f\xFCr die ausgew\xE4hlte Arbeit.",
		SEARCHHELP: "Inventar durchsuchen. Es k\xF6nnen Wildcards verwendet werden (* f\xFCr 0 oder mehrere Zeichen, ? f\xFCr ein beliebiges Zeichen)",
		DUELSHOOTINGATT: "Schie\xDFduellant (Angreifer)",
		DUELSHOOTINGDEF: "Schie\xDFduellant (Verteidiger)",
		DUELVIGOR: "Schlagkraftduellant",
		FORTATTACK: "Fortkampf (Angreifer)",
		FORTDEFEND: "Fortkampf (Verteidiger)",
		HIDEJOBS: "Arbeiten-Einstellungen",
		CONFIRM: "Best\xE4tigen",
		HIDEJOBDESC: "Hier k\xF6nnen Arbeiten ausgeblendet werden. Markiere alle Arbeiten, die nicht automatisch berechnet werden sollen und dr\xFCcke auf \"Best\xE4tigen\".",
		SHOWN: "Aktiv",
		HIDDEN: "Inaktiv",
		SETTINGSSAVED: "Die Einstellungen f\xFCr TW Pro wurden gespeichert.",
		SETTINGSSAVEDSESSION: "Die Einstellungen f\xFCr TW Pro wurden gespeichert (nur f\xFCr diese Sitzung).",
		PERSISTSETTINGS: "Diese Einstellungen auch f\xFCr zuk\xFCnftige Sitzungen speichern.",
		CANNOTWEAR: "Du kannst dieses Itemset nicht tragen oder es bringt keine zus\xE4tzlichen Arbeitspunkte.",
		SETSETTINGS: "Deaktiviere Itemsets f\xFCr schnellere Berechnungen. Itemsets mit speziellen, nicht erf\xFCllten Bedingungen sind standardm\xE4ssig deaktiviert.",
		CUSTOMNAME: "Gib den gew\xFCnschten Namen f\xFCr eine Arbeit ein.",
		CUSTOMCALCULATION: "Gib hier eine g\xFCltige TWPro-Berechnung ein.",
		CUSTOMENABLED: "Setze ein H\xE4kchen, um diese Arbeit zu aktivieren.",
		NEW: "Neu",
		SPEED: "Geschwindigkeit",
		REGENERATION: "Lebenspunktregeneration",
		SETSINFO: "Itemsets",
		WITHSETITEMS: "Bonus mit %1 Items",
		LABORPOINTS: "Arbeitspunkte",
		USEFULITEM: "Gibt die Anzahl der Items an, die f\xFCr die Berechnung benutzt wurden.",
		PERCREGENERATION: "Regeneration",
		LUCK: "Erh\xF6hte Gl\xFCckschance",
		PRAYING: "Beten",
		NOEXTENDEDJOBLIST: "Aktuelle Arbeitspunkte nicht in der Liste der Arbeiten anzeigen."
	};
	twpro_langs.nl = {
		info: ['Lekensteyn', 'mailto:lekensteyn@gmail.com'],
		WEBSITE: 'Website',
		AUTHOR: 'Auteur',
		TRANSLATOR: 'Vertaler',
		TWPRO_DISABLED: 'script uitgeschakeld',
		SORTBYNAME: 'Op <b>naam</b> sorteren',
		SORTBYXP: 'Op <b>ervaring</b> sorteren',
		SORTBYWAGES: 'Op <b>loon</b> sorteren',
		SORTBYLUCK: 'Op <b>geluk</b> sorteren',
		SORTBYCOMB: 'Op <b>voorkeur</b> sorteren',
		SORTBYDANGER: 'Op <b>gevaar</b> sorteren',
		SORTBYLABORP: 'Op <b>arbeidspunten</b> sorteren',
		FILTERJOBS: 'Verberg de werkzaamheden die ik niet kan doen',
		FILTERCLOTHING: 'Toon enkel de beste kleding voor de geselecteerde arbeid',
		CHOOSEJOB: 'Arbeid kiezen...',
		CALCJOB: 'Even geduld, waarden berekenen...',
		INVENTSTATS: 'Inventaris statistieken',
		SELLVALUE: 'Verkoopwaarde',
		OBJECTS: 'Voorwerpen',
		PRODUCTS: 'Producten',
		TOTAL: 'Totaal',
		QUANTITIES: 'Hoeveelheden',
		NONYIELDS: 'Niet-producten',
		LABORP: 'AP',
		CONSTRUCTION: 'Stadsuitbouw',
		HPTOTAL: 'Levenspunten totaal',
		STARTCALC: 'Gegevens berekenen...',
		CONVERT: 'Converteer',
		MULTISEL: 'Verkoop meerdere voorwerpen...',
		SELL: 'Verkoop selectie',
		CONFIRMSELL: 'Wil je echt %1 stapels voorwerpen verkopen?',
		SELLING: 'Verkoopt...',
		SALEDONE: 'De geselecteerde voorwerpen zijn verkocht.',
		NONESELECTED: 'Je moet minstens \xe9\xe9n voorwerp selecteren.',
		JOBRANKSETTINGS: 'Instellingen voorkeurswerken',
		SEARCHINVENTORY: 'Doorzoek inventaris',
		NOSEARCHRESULT: 'De zoekterm %1 heeft geen resultaten opgeleverd.%2Weergeef alle voorwerpen%3',
		DISABLEBESTFORJOB: 'Schakel het verbergen van minderwaardige voorwerpen uit.',
		SEARCHHELP: 'Doorzoek de inventaris. Je kunt wildcards gebruiken (* voor nul of meer tekens, ? voor \xe9\xe9n teken)',
		DUELSHOOTINGATT: 'Schietduellant (aanvaller)',
		DUELSHOOTINGDEF: 'Schietduellant (verdediger)',
		DUELVIGOR: 'Slagkrachtduellant',
		FORTATTACK: 'Fortgevecht (aanvaller)',
		FORTDEFEND: 'Fortgevecht (verdediger)',
		HIDEJOBS: 'Werkzaamheden verbergen',
		CONFIRM: 'Bevestigen',
		HIDEJOBDESC: 'Hier kun je werkzaamheden verbergen. Markeer alle werkzaamheden die je niet automatisch wilt laten berekenen en klik daarna op Bevestigen.',
		SHOWN: 'Weergeven',
		HIDDEN: 'Verborgen',
		SETTINGSSAVED: 'De instellingen voor TW Pro zijn toegepast!',
		SETTINGSSAVEDSESSION: 'De instellingen voor TW Pro zijn toegepast! (alleen voor deze sessie)',
		PERSISTSETTINGS: 'Bewaar deze instellingen voor elke sessie.',
		CANNOTWEAR: 'Je kan deze kledingset niet dragen, of deze set voegt geen arbeidspunten toe aan de werkzaamheden.',
		SETSETTINGS: 'Deactiveer kledingsetjes voor snellere berekeningen. Kledingsetjes met speciale vereisten, waaraan niet voldaan is, worden standaard uitgeschakeld.',
		CUSTOMNAME: 'Vul hier de gewenste naam in voor de werkzaamheid',
		CUSTOMCALCULATION: 'Vul hier een geldige TWPro berekening in.',
		CUSTOMENABLED: 'Vink dit vakje aan om de werkzaamheid te activeren.',
		NEW: 'Nieuw',
		SPEED: 'Snelheid',
		REGENERATION: 'Snelste levenspunten',
		SETSINFO: 'Itemsets',
		WITHSETITEMS: 'Bonussen met %1 voorwerpen',
		LABORPOINTS: 'Arbeidspunten',
		USEFULITEM: 'Dit getal geeft het aantal voorwerpen weer dat wordt gebruikt in de berekeningen',
		PERCREGENERATION: 'regeneratie',
		LUCK: 'verhoogde slagingskans',
		PRAYING: 'Bidden',
		NOEXTENDEDJOBLIST: 'Verberg de huidige arbeidspunten in de lijst van arbeiden'
	};
	twpro_langs.pl = {
		info: ["tofix112", "mailto:tofix112@tlen.pl"],
		WEBSITE: "Strona domowa",
		AUTHOR: "Autor",
		TRANSLATOR: "T\u0142umacz",
		TWPRO_DISABLED: "Skrypt nieaktywny!",
		SORTBYNAME: "Sortuj wg <b>nazwy</b>",
		SORTBYXP: "Sortuj wg <b>do\u015Bwiadczenia</b>",
		SORTBYWAGES: "Sortuj wg <b>wynagrodzenia</b>",
		SORTBYLUCK: "Sortuj wg <b>szcz\u0119\u015Bcia</b>",
		SORTBYCOMB: "Sortuj wg <b>rankingu prac</b>",
		SORTBYDANGER: "Sortuj wg <b>niebezpiecze\u0144stwa</b>",
		SORTBYLABORP: "Sortuj wg <b>punkt\xF3w pracy</b>",
		FILTERJOBS: "Ukryj prace kt\xF3rych nie mog\u0119 wykonywa\u0107",
		FILTERCLOTHING: "Wy\u015Bwietlaj tylko najlepszy ekwipunek dla wybranej pracy",
		CHOOSEJOB: "Wybierz prac\u0119...",
		CALCJOB: "Obliczanie, prosz\u0119 czeka\u0107...",
		INVENTSTATS: "Statystyki ekwipunku",
		SELLVALUE: "Cena sprzeda\u017Cy",
		OBJECTS: "Przedmioty",
		PRODUCTS: "Produkty",
		TOTAL: "Og\xF3\u0142em",
		QUANTITIES: "Liczebno\u015B\u0107",
		NONYIELDS: "Elementy ekwipunku",
		LABORP: "PP",
		CONSTRUCTION: "Rozbudowa",
		HPTOTAL: "Punkty \u017Cycia \u0142\u0105cznie",
		STARTCALC: "Oblicz warto\u015Bci...",
		CONVERT: "Konwertuj",
		MULTISEL: "Sprzedaj wiele naraz...",
		SELL: "Sprzedaj wybrane",
		CONFIRMSELL: "Czy na pewno chcesz sprzeda\u0107 %1 przedmiot\xF3w?",
		SELLING: "Sprzedawanie....",
		SALEDONE: "Wybrane przedmioty zosta\u0142y sprzedane.",
		NONESELECTED: "Musisz wybra\u0107 przynajmniej jeden przedmiot!",
		JOBRANKSETTINGS: "Ustawienia rankingu prac",
		SEARCHINVENTORY: "Przeszukaj ekwipunek",
		NOSEARCHRESULT: "Szukanie %1 nie przynios\u0142o \u017Cadnych rezultat\xF3w.%2Wy\u015Bwietl wszystkie przedmioty%3",
		DISABLEBESTFORJOB: "Wy\u0142\u0105cz wy\u015Bwietlanie tylko najlepszego ekwipunku dla danej pracy.",
		SEARCHHELP: "Przeszukaj ekwipunek. Mo\u017Cesz u\u017Cywa\u0107 wieloznaczno\u015Bci (* dla zera lub wi\u0119cej znak\xF3w, ? dla jednego znaku)",
		DUELSHOOTINGATT: "Strzelec (atak)",
		DUELSHOOTINGDEF: "Strzelec (obrona)",
		DUELVIGOR: "Walka wr\u0119cz (o/r)",
		FORTATTACK: "Bitwa fortowa (atak)",
		FORTDEFEND: "Bitwa fortowa (obrona)",
		HIDEJOBS: "Ukryj prace lub zestawy",
		CONFIRM: "Zapisz",
		HIDEJOBDESC: "Tutaj mo\u017Cesz ukry\u0107 prace z listy. Zaznacz i przenie\u015B wszystkie prace, kt\xF3re maj\u0105 zosta\u0107 pomini\u0119te przy obliczeniach, oraz kliknij Zapisz.",
		SHOWN: "Uwzgl\u0119dniane",
		HIDDEN: "Ukryte",
		SETTINGSSAVED: "Nowe ustawienia TW Pro zosta\u0142y zapisane!",
		SETTINGSSAVEDSESSION: "Nowe ustawienia TW Pro zosta\u0142y zapisane! (for this session only)",/*FIXME*/
		PERSISTSETTINGS: "Zapisz ustawienia r\xF3wnie\u017C dla przysz\u0142ych sesji.",
		CANNOTWEAR: "Nie mo\u017Cesz u\u017Cywa\u0107 tego zestawu, lub nie ma on wp\u0142ywu na obliczenia.",
		SETSETTINGS: "Te zestawy zostan\u0105 uwzgl\u0119dnione w obliczeniach. Zestawy ze specjalnymi wymogami, kt\xF3re nie s\u0105 spe\u0142nione, zosta\u0142y domy\u015Blnie wy\u0142\u0105czone z oblicze\u0144.",
		CUSTOMNAME: "Wprowad\u017A nazw\u0119 dla nowej pracy",
		CUSTOMCALCULATION: "Wprowad\u017A poprawne wymagania nowej pracy.",
		CUSTOMENABLED: "Zaznacz, aby uwzgl\u0119dni\u0107 now\u0105 prac\u0119 na li\u015Bcie prac.",
		NEW: "Nowa praca",
		SPEED: "Podr\xF3\u017Cowanie",
		REGENERATION: "Regeneracja P\u017B",
		SETSINFO: "Zestawy",
		WITHSETITEMS: "Bonus ze %1 przedmiotami",
		LABORPOINTS: "Punkt\xF3w pracy",
		USEFULITEM: "Ta liczba pokazuje ilo\u015B\u0107 cz\u0119\u015Bci zestawu uwzgl\u0119dnianych w obliczeniach",
		PERCREGENERATION: "Regeneracja energii",
		LUCK: "Szcz\u0119\u015Bcie",
		PRAYING: "Modlenie si\u0119",
		NOEXTENDEDJOBLIST: 'Do not show the current Labourpoints of activities in the Activity list'
	};
	twpro_langs.hu = {
		info: ["hepike", "mailto:hepi02@freemail.hu"],
		WEBSITE: "Weboldal",
		AUTHOR: "Szerz\u0151",
		TRANSLATOR: "Ford\xEDt\xF3",
		TWPRO_DISABLED: "szkript kikapcsolva",
		SORTBYNAME: "Rendez\xE9s <b>n\xE9v</b> alapj\xE1n",
		SORTBYXP: "Rendez\xE9s <b>tapasztalat</b> alapj\xE1n",
		SORTBYWAGES: "Rendez\xE9s <b>munkab\xE9r</b> alapj\xE1n",
		SORTBYLUCK: "Rendez\xE9s <b>szerencse</b> alapj\xE1n",
		SORTBYCOMB: "<b>Egy\xE9ni</b> rendez\xE9s alapj\xE1n",
		SORTBYDANGER: "Rendez\xE9s <b>vesz\xE9ly</b> alapj\xE1n",
		SORTBYLABORP: "Rendez\xE9s <b>munkapont</b> alapj\xE1n",
		FILTERJOBS: "A nem v\xE9gezhet\u0151 munk\xE1k elrejt\xE9se",
		FILTERCLOTHING: "Csak a legjobb ruh\xE1kat mutassa a v\xE1laszott munk\xE1hoz",
		CHOOSEJOB: "V\xE1lassz munk\xE1t",
		CALCJOB: "Sz\xE1m\xEDt\xE1sok v\xE9gz\xE9se...",
		INVENTSTATS: "Felszerel\xE9s statisztika",
		SELLVALUE: "Elad\xE1si \xE1rak",
		OBJECTS: "T\xE1rgyak",
		PRODUCTS: "Term\xE9kek",
		TOTAL: "\xD6sszesen",
		QUANTITIES: "Darabsz\xE1mok",
		NONYIELDS: "Nem term\xE9kek",
		LABORP: "MP",
		CONSTRUCTION: "\xC9p\xEDt\xE9s",
		HPTOTAL: "Teljes \xE9leter\u0151",
		STARTCALC: "Kattints ide...",
		CONVERT: "Konvert\xE1l\xE1s",
		MULTISEL: "Kombin\xE1lt term\xE9kelad\xE1s",
		SELL: "Kiv\xE1lasztottak elad\xE1sa",
		CONFIRMSELL: "Val\xF3ban el szeretn\xE9l adni %1 darab term\xE9ket?",
		SELLING: "Elad\xE1s...",
		SALEDONE: "A kiv\xE1laszott term\xE9keket sikeresen eladtad",
		NONESELECTED: "Legal\xE1bb egy dolgot ki kell v\xE1lasztanod!",
		JOBRANKSETTINGS: "Munkarangsor be\xE1ll\xEDt\xE1sa",
		SEARCHINVENTORY: "Keres\xE9s...",
		NOSEARCHRESULT: "A(z) %1 keres\xE9se nem hozott eredm\xE9nyt.%2\xD6sszes felszerel\xE9s mutat\xE1sa%3",
		DISABLEBESTFORJOB: "A \"Csak a legjobb t\xE1rgyak mutat\xE1s\xE1nak\" kikapcsol\xE1sa",
		SEARCHHELP: "Keres\xE9s a felszerel\xE9sek k\xF6z\xF6tt.\\n A behelyettes\xEDt\u0151 karakterek haszn\xE1lata megengedett\\n ( a \"*\" tetsz\u0151leges sz\xE1m\xFA karaktert helyettes\xEDt be,\\n a \"?\" egyetlen karaktert helyettes\xEDt be)",
		DUELSHOOTINGATT: "P\xE1rbaj-l\u0151fegyver (t\xE1mad\xF3)",
		DUELSHOOTINGDEF: "P\xE1rbaj-l\u0151fegyver (v\xE9dekez\u0151)",
		DUELVIGOR: "P\xE1rbaj-\xFCt\u0151fegyver",
		FORTATTACK: "Er\u0151dharc (t\xE1mad\xF3)",
		FORTDEFEND: "Er\u0151dharc (v\xE9dekez\u0151)",
		HIDEJOBS: "Munk\xE1k \xE9s szettek elrejt\xE9se",
		CONFIRM: "Meger\u0151s\xEDt",
		HIDEJOBDESC: "Itt elrejtheted a munk\xE1kat. V\xE1laszd ki azokat a munk\xE1kat, amiket nem szeretn\xE9d, hogy figyelembe vegyen a szkript sz\xE1mol\xE1s k\xF6zben.",
		SHOWN: "Mutat",
		HIDDEN: "Elrejt",
		SETTINGSSAVED: "Az \xFAj be\xE1ll\xEDt\xE1sok elfogadva",
		SETTINGSSAVEDSESSION: "Az \xFAj be\xE1ll\xEDt\xE1sok elfogadva (csak erre az alkalomra)",
		PERSISTSETTINGS: "Be\xE1ll\xEDt\xE1sok ment\xE9se \xF6r\xF6kre.",
		CANNOTWEAR: "Ilyen szettet nem viselhetsz.",
		SETSETTINGS: "Enged\xE9lyezd a szetteket. A speci\xE1lis szettek alapb\xF3l ki vannak kapcsolva.",
		CUSTOMNAME: "Adj meg egy nevet az \xFAj munk\xE1dhoz.",
		CUSTOMCALCULATION: "Val\xF3s sz\xE1m\xEDt\xE1sokat adj meg!",
		CUSTOMENABLED: "Pip\xE1ld be, hogy elfogadd az \xFAj munk\xE1dat.",
		NEW: "\xDAj",
		SPEED: "Sebess\xE9g",
		REGENERATION: "Regener\xE1ci\xF3",
		SETSINFO: "Szettek",
		WITHSETITEMS: "B\xF3nusz %1 szett\xE1rgyal",
		LABORPOINTS: "Munkapont",
		USEFULITEM: "Ez a sz\xE1m mutatja, hogy sz\xE1m\xEDt\xE1s k\xF6zben a szettnek h\xE1ny elem\xE9t veszi figyelembe a szkript (h\xE1ny darabja van meg a szettnek).",
		PERCREGENERATION: "Regener\xE1ci\xF3",
		LUCK: "szerencse",
		PRAYING: "ima",
		NOEXTENDEDJOBLIST: "Az aktu\xE1lis munkapontok kijelz\xE9s\xE9nek kikapcsol\xE1sa"
	};
	twpro_langs.ro = {
		info: ["danutzzul", "mailto:danutzzul@yahoo.com"],
		WEBSITE: "Website",
		AUTHOR: "Autor",
		TRANSLATOR: "Traduc\u0103tor",
		TWPRO_DISABLED: "Script dezactivat",
		SORTBYNAME: "Sorteaz\u0103 dup\u0103 <b>nume</b>",
		SORTBYXP: "Sorteaz\u0103 dup\u0103 <b>experien\u021B\u0103</b>",
		SORTBYWAGES: "Sorteaz\u0103 dup\u0103 <b>salariu</b>",
		SORTBYLUCK: "Sorteaz\u0103 dup\u0103 <b>noroc</b>",
		SORTBYCOMB: "Sorteaz\u0103 dup\u0103 <b>job rank</b>",
		SORTBYDANGER: "Sorteaz\u0103 dup\u0103 <b>pericol</b>",
		SORTBYLABORP: "Sorteaz\u0103 dup\u0103 <b>puncte de munc\u0103</b>",
		FILTERJOBS: "Ascunde muncile pe care nu le pot face",
		FILTERCLOTHING: "Arat\u0103 cele mai bune haine pentru munca aleas\u0103",
		CHOOSEJOB: "Alege munca...",
		CALCJOB: "A\u0219tepta\u021Bi calcularea valorilor...",
		INVENTSTATS: "Statistic\u0103 inventar",
		SELLVALUE: "Valoare de v\xE2nzare",
		OBJECTS: "Obiecte",
		PRODUCTS: "Produse",
		TOTAL: "Total",
		QUANTITIES: "Cantit\u0103\u021Bi",
		NONYIELDS: "Altele",
		LABORP: "PM",
		CONSTRUCTION: "Construire",
		HPTOTAL: "Total puncte de via\u021B\u0103",
		STARTCALC: "Calculeaz\u0103 datele...",
		CONVERT: "Convertire",
		MULTISEL: "Vinde multiple obiecte...",
		SELL: "Vinde obiectele selectate",
		CONFIRMSELL: "Chiar vrei s\u0103 vinzi %1 obiecte?",
		SELLING: "Se vinde...",
		SALEDONE: "Obiectele selectate au fost v\xE2ndute.",
		NONESELECTED: "Trebuie s\u0103 selectezi cel pu\u021Bin un obiect!",
		JOBRANKSETTINGS: "Set\u0103ri munci",
		SEARCHINVENTORY: "Caut\u0103 \xEEn Inventar",
		NOSEARCHRESULT: "C\u0103utarea efectuat\u0103 pentru %1 a returnat nici un rezultat.%2Arat\u0103 toate obiectele%3",
		DISABLEBESTFORJOB: "Dezactiveaz\u0103 selectarea celor mai bune obiecte pentru o munc\u0103.",
		SEARCHHELP: "Caut\u0103 \xEEn Inventar. Po\u0163i folosi stelu\u021Be (* pentru zero sau mai multe litere, ? pentru o singur\u0103 liter\u0103)",
		DUELSHOOTINGATT: "Range dueler (atacator)",
		DUELSHOOTINGDEF: "Range dueler (ap\u0103r\u0103tor)",
		DUELVIGOR: "Melee dueler",
		FORTATTACK: "B\u0103t\u0103lie fort (atacator)",
		FORTDEFEND: "B\u0103t\u0103lie fort (ap\u0103rator)",
		HIDEJOBS: "Ascunde muncile \u0219i seturile de haine",
		CONFIRM: "Confirmare",
		HIDEJOBDESC: "Aici po\u0163i ascunde anumite munci. Selecteaz\u0103 toate muncile pe care vrei s\u0103 le excluzi din c\u0103utarea automat\u0103 \u015Fi apas\u0103 pe Confirmare.",
		SHOWN: "Vizibile",
		HIDDEN: "Ascunse",
		SETTINGSSAVED: "Set\u0103rile pentru TW Pro au fost aplicate!",
		SETTINGSSAVEDSESSION: "Set\u0103rile pentru TW Pro au fost aplicate! (doar pentru aceast\u0103 sesiune)",
		PERSISTSETTINGS: "Salveaz\u0103 aceste set\u0103ri pentru fiecare sesiune.",
		CANNOTWEAR: "Nu po\u021Bi purta acest set sau acest set nu influen\u021Beaz\u0103 calcularea muncilor.",
		SETSETTINGS: "Dezactiveaz\u0103 seturile de haine pentru un calcul mai rapid. Seturile cu cerin\u021Be speciale sunt dezactivate implicit.",
		CUSTOMNAME: "Introdu numele dorit pentru o munc\u0103",
		CUSTOMCALCULATION: "Introduce\u0163i o combina\u0163ie de indem\xE2n\u0103ri corect\u0103",
		CUSTOMENABLED: "Bifeaz\u0103 aceast\u0103 c\u0103su\u0163\u0103 pentru a activa munca",
		NEW: "Munc\u0103 nou\u0103",
		SPEED: "Vitez\u0103",
		REGENERATION: "Regenerare rapid\u0103",
		SETSINFO: "Seturi de haine",
		WITHSETITEMS: "Bonus cu %1 obiecte",
		LABORPOINTS: "Puncte de munc\u0103",
		USEFULITEM: "Cifra din parantez\u0103 indic\u0103 num\u0103rul obiectelor care sunt folosite pentru calcularea punctelor de munc\u0103",
		PERCREGENERATION: "Regenerare",
		LUCK: "Noroc",
		PRAYING: "Rug\u0103ciune",
		NOEXTENDEDJOBLIST: "Nu afi\u015Fa Punctele de Munc\u0103 actuale in lista de munci"
	};
	twpro_langs.cz = {
		info: ["Morgana La Fey", "mailto:ann.g@pobox.sk"],
		WEBSITE: "Web",
		AUTHOR: "Autor",
		TRANSLATOR: "P\u0159eklad",
		TWPRO_DISABLED: "Skript neaktivn\xED",
		SORTBYNAME: "Se\u0159adit podle <b>jm\xE9na</b>",
		SORTBYXP: "Se\u0159adit podle <b>zku\u0161enost\xED</b>",
		SORTBYWAGES: "Se\u0159adit podle <b>zisku</b>",
		SORTBYLUCK: "Se\u0159adit podle <b>\u0160t\u011Bst\xED</b>",
		SORTBYCOMB: "Se\u0159adit podle <b>obt\xED\u017Enosti</b>",
		SORTBYDANGER: "Se\u0159adit podle <b>nebezpe\u010D\xED</b>",
		SORTBYLABORP: "Se\u0159adit podle <b>pracovn\xEDch bod\u016F (PB)</b>",
		FILTERJOBS: "Skryj aktivity kter\xE9 nem\u016F\u017Eu d\u011Blat",
		FILTERCLOTHING: "Zobraz pouze nejlep\u0161\xED vybaven\xED pro vybranou aktivitu",
		CHOOSEJOB: "Vyber aktivitu...",
		CALCJOB: "Po\u010D\xEDt\xE1m hodnoty, \u010Dekej pros\xEDm...",
		INVENTSTATS: "Statistika invent\xE1\u0159e",
		SELLVALUE: "Prodejn\xED hodnota",
		OBJECTS: "Objekt\u016F",
		PRODUCTS: "Produkt\u016F",
		TOTAL: "Celkem",
		QUANTITIES: "Polo\u017Eek",
		NONYIELDS: "Bez hodnoty",
		LABORP: "PB",
		CONSTRUCTION: "V\xFDstavba",
		HPTOTAL: "\u017Divoty",
		STARTCALC: "Po\u010D\xEDtam...",
		CONVERT: "P\u0159eve\u010F",
		MULTISEL: "V\xEDcen\xE1sobn\xFD prodej...",
		SELL: "Prodat zvolen\xFD",
		CONFIRMSELL: "Opravdu chce\u0161 prodat %1 \u0161tos v\u011Bc\xED?",
		SELLING: "Prodej...",
		SALEDONE: "Vybran\xE9 v\u011Bci byly prod\xE1ny.",
		NONESELECTED: "Mus\xED b\xFDt vybr\xE1n alespo\u0148 jeden p\u0159edm\u011Bt!",
		JOBRANKSETTINGS: "Nastaven\xED pozice pr\xE1ce",
		SEARCHINVENTORY: "Prohledat invent\xE1\u0159",
		NOSEARCHRESULT: "Hledals %1 bez v\xFDsledku.%2Zobrazeni v\u0161ech v\u011Bc\xED%3",
		DISABLEBESTFORJOB: "Tento text je zobrazen pokud m\xE1\u0161 za\u0161krtlou volbu zobrazov\xE1n\xED nejlep\u0161\xEDch v\u011Bc\xED pro pr\xE1ci, ale kalkul\xE1tor nic lep\u0161\xEDho ne\u017E co m\xE1\u0161 oble\u010Den\xE9 nena\u0161el.",
		SEARCHHELP: "Prohledat invent\xE1\u0159. M\u016F\u017Ee\u0161 pou\u017E\xEDt z\xE1stupn\xFD znak: * pro \u017E\xE1dn\xFD nebo v\xEDc znak\u016F, ? pro jeden znak.",
		DUELSHOOTINGATT: "Duelant st\u0159elec (\xFAto\u010Dn\xEDk)",
		DUELSHOOTINGDEF: "Duelant st\u0159elec (obr\xE1nce)",
		DUELVIGOR: "Duelant chlad\u0148\xE1k",
		FORTATTACK: "Pevnost (\xFAto\u010Dn\xEDk)",
		FORTDEFEND: "Pevnost (obr\xE1nce)",
		HIDEJOBS: "Skryj aktivity a sady v\u011Bc\xED",
		CONFIRM: "Potvr\u010F",
		HIDEJOBDESC: "Pr\xE1ce zde mohou b\xFDt skryty. Ozna\u010D pr\xE1ce ktere se nemaj\xED po\u010D\xEDtat automaticky a klikni na Potvr\u010F.",
		SHOWN: "Zobrazen\xE1",
		HIDDEN: "Skryt\xE1",
		SETTINGSSAVED: "Nastaven\xED TW Pro bylo aktivov\xE1no!",
		SETTINGSSAVEDSESSION: "Nastaven\xED TW Pro bylo aktivov\xE1no! (jen pro toto p\u0159ihl\xE1\u0161en\xED)",
		PERSISTSETTINGS: "Ulo\u017Eit nastaven\xED natrvalo",
		CANNOTWEAR: "Nem\u016F\u017Ee\u0161 nosit tuto sadu nebo nem\xE1 \u017E\xE1dn\xFD vliv pro danou aktivitu",
		SETSETTINGS: "Zaka\u017E sady pro rychlej\u0161\xED v\xFDpo\u010Det. Speci\xE1ln\xED sady, bez doporu\u010Den\xED jsou standardn\u011B neaktivn\xED.",
		CUSTOMNAME: "Vlo\u017E pojmenov\xE1n\xED pro vlastn\xED aktivitu.",
		CUSTOMCALCULATION: "Vlo\u017E kombinaci schopnost\xED pro vlastn\xED aktivitu.",
		CUSTOMENABLED: "Za\u0161krtni pro povoleni aktivity",
		NEW: "Nov\xE1",
		SPEED: "Rychlost (cestov\xE1n\xED)",
		REGENERATION: "Rychl\xE9 zdrav\xED",
		SETSINFO: "Sada",
		WITHSETITEMS: "Bonus s %1 v\u011Bcmi",
		LABORPOINTS: "Pracovn\xED body",
		USEFULITEM: "Toto \u010D\xEDslo indikuje po\u010Det v\u011Bc\xED pou\u017Eit\xFDch v kalkulaci",
		PERCREGENERATION: "Regenerace",
		LUCK: "\u0160t\u011Bst\xED",
		PRAYING: "Modlen\xED",
		NOEXTENDEDJOBLIST: "Zak\xE1zat roz\u0161\xED\u0159en\xFD list prac\xED"
	};
	twpro_langs.pt = {
		info: ["Badassious", "mailto:lihons@hotmail.com"],
		WEBSITE: "P\xE1gina Web",
		AUTHOR: "Autor",
		TRANSLATOR: "Tradutor",
		TWPRO_DISABLED: "Script Desactivado",
		SORTBYNAME: "Ordenar pelo <b>nome</b>",
		SORTBYXP: "Ordenar pela <b>experi\xEAncia</b>",
		SORTBYWAGES: "Ordenar pelo <b>sal\xE1rio</b>",
		SORTBYLUCK: "Ordenar pela <b>sorte</b>",
		SORTBYCOMB: "Ordenar pelo <b>rank/import\xE2ncia</b>",
		SORTBYDANGER: "Ordenar pelo <b>perigo</b>",
		SORTBYLABORP: "Ordenar pelos <b>pontos de trabalho (LP)</b>",
		FILTERJOBS: "Esconder os trabalhos que eu n\xE3o consigo fazer",
		FILTERCLOTHING: "Se esta caixa estiver seleccionada, mostra apenas as melhores roupas para fazer este trabalho",
		CHOOSEJOB: "Escolhe o trabalho...",
		CALCJOB: "A calcular, aguarda....",
		INVENTSTATS: "Estat\xEDsticas do invent\xE1rio",
		SELLVALUE: "Valor de vendas",
		OBJECTS: "Objectos (Tudo menos produtos!)",
		PRODUCTS: "Produtos",
		TOTAL: "Total",
		QUANTITIES: "Quantias",
		NONYIELDS: "N\xE3o vend\xE1veis",
		LABORP: "LP",
		CONSTRUCTION: "Constru\xE7\xE3o",
		HPTOTAL: "Total de pontos de vida",
		STARTCALC: "A calcular...",
		CONVERT: "Converter",
		MULTISEL: "Vender v\xE1rios itens",
		SELL: "Vender os itens seleccionados",
		CONFIRMSELL: "Tens a certeza de que queres vender %1 estes itens?",
		SELLING: "Vendendo...",
		SALEDONE: "Os itens foram vendidos!",
		NONESELECTED: "Tens de seleccionar pelo menos um item!",
		JOBRANKSETTINGS: "Defeni\xE7\xF5es de Ranking de trabalho",
		SEARCHINVENTORY: "Procura no invent\xE1rio",
		NOSEARCHRESULT: "A tua procura para %1 n\xE3o obteve quaisquer resultados.%2Mostrar todos os itens%3",
		DISABLEBESTFORJOB: "Desactivar a procura de itens melhores para o trabalho.\n(Mostrar as tamb\xE9m as outras roupas)",
		SEARCHHELP: "Procura de Invent\xE1rio. Pode usar wildcards (* para zero ou mais caracteres, ? para um caracter) Exemplo: Benga*a Ou B?ngala",
		DUELSHOOTINGATT: "Duelista de tiro (Atacante)",
		DUELSHOOTINGDEF: "Duelista de Tiro (Defensor)",
		DUELVIGOR: "Duelista de Vigor",
		FORTATTACK: "Fortbattle (atacante)",
		FORTDEFEND: "Fortbattle (defensor)",
		HIDEJOBS: "Desactivar/Esconder Trabalhos e Conjuntos",
		CONFIRM: "Confirmar",
		HIDEJOBDESC: "Os trabalhos podem ser escondidos aqui. Selecciona todos os trabalhos que n\xE3o devam ser calculados automaticamente, e clica em Confirmar.",
		SHOWN: "Vis\xEDvel(eis)",
		HIDDEN: "Escondido(s)",
		SETTINGSSAVED: "As defini\xE7\xF5es para o TW Pro foram correctamente aplicadas!",
		SETTINGSSAVEDSESSION: "As defini\xE7\xF5es para o TW Pro foram aplicadas! (para esta sess\xE3o apenas)",
		PERSISTSETTINGS: "Salvar estas defini\xE7\xF5es para todas as sess\xF5es",
		CANNOTWEAR: "N\xE3o podes usar este conjunto, ou este conjunto n\xE3o influencia nos c\xE1lculos de trabalhos",
		SETSETTINGS: "Desactivar conjuntos para r\xE1pidos c\xE1lculos. Conjuntos especiais, requerimentos n\xE3o apropriados/atingidos est\xE3o desactivados por defeito.",
		CUSTOMNAME: "Introduz o nome desejado para este \"trabalho\"/\"build\"",
		CUSTOMCALCULATION: "Introduz aqui um c\xE1lculo v\xE1lido para o TW Pro Script",
		CUSTOMENABLED: "Marca esta caixa para activar este \"trabalho\"/\"build\"",
		NEW: "Criar!",
		SPEED: "Velocidade M\xE1xima",
		REGENERATION: "M\xE1ximos Pontos de Vida",
		SETSINFO: "Conjuntos",
		WITHSETITEMS: "B\xF3nus com %1 itens",
		LABORPOINTS: "Pontos de trabalho",
		USEFULITEM: "Este n\xFAmero indica a quantidade de itens que s\xE3o usados nos c\xE1lculos.",
		PERCREGENERATION: "Regenera\xE7\xE3o",
		LUCK: "Sorte",
		PRAYING: "Rezar",
		NOEXTENDEDJOBLIST: "N\xE3o mostrar os pontos actuais de trabalho das actividades, na lista de actividades"
	};
	twpro_langs.ru = {
		info: ["Ivanhoe aka Olegoncic", "mailto:dov_barca@mail.ru"],
		WEBSITE: "\u0410\u0434\u0440\u0435\u0441 \u0441\u0430\u0439\u0442\u0430",
		AUTHOR: "\u0410\u0432\u0442\u043E\u0440",
		TRANSLATOR: "\u041F\u0435\u0440\u0435\u0432\u043E\u0434\u0447\u0438\u043A",
		TWPRO_DISABLED: "\u0421\u043A\u0440\u0438\u043F\u0442 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D",
		SORTBYNAME: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E <b>\u0438\u043C\u0435\u043D\u0438</b>",
		SORTBYXP: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E <b>\u043E\u043F\u044B\u0442\u0443</b>",
		SORTBYWAGES: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E <b>\u0437\u0430\u0440\u043F\u043B\u0430\u0442\u0435</b>",
		SORTBYLUCK: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E <b>\u0443\u0434\u0430\u0447\u0435</b>",
		SORTBYCOMB: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E <b>\u0440\u0430\u043D\u0433\u0443</b>",
		SORTBYDANGER: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E <b>\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438</b>",
		SORTBYLABORP: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E <b>\u0422\u041E</b>",
		FILTERJOBS: "\u0421\u043A\u0440\u044B\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u044B \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u044F \u043D\u0435 \u043C\u043E\u0433\u0443 \u0434\u0435\u043B\u0430\u0442\u044C",
		FILTERCLOTHING: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043B\u0443\u0447\u0448\u0443\u044E \u043E\u0434\u0435\u0436\u0434\u0443 \u0434\u043B\u044F \u044D\u0442\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B",
		CHOOSEJOB: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435",
		CALCJOB: "\u0412\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439",
		INVENTSTATS: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u0431\u0430\u0433\u0430\u0436\u0430",
		SELLVALUE: "\u0426\u0435\u043D\u0430 \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0432\u0441\u0435\u0445 \u0432\u0435\u0449\u0435\u0439",
		OBJECTS: "\u041E\u0431\u044A\u0435\u043A\u0442\u044B",
		PRODUCTS: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u044B",
		TOTAL: "\u0412\u0441\u0435\u0433\u043E",
		QUANTITIES: "\u041A\u043E\u043B-\u0432\u043E",
		NONYIELDS: "\u0411\u0435\u0441\u043F\u043E\u043B\u0435\u0437\u043D\u044B\u0435",
		LABORP: "\u0422\u041E",
		CONSTRUCTION: "\u0421\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E",
		HPTOTAL: "\u041E\u0431\u0449\u0435\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u0447\u043A\u043E\u0432 \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u044F",
		STARTCALC: "\u0420\u0430\u0441\u0447\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 ...",
		CONVERT: "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		MULTISEL: "\u041F\u0440\u043E\u0434\u0430\u0436\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 ...",
		SELL: "\u041F\u0440\u043E\u0434\u0430\u0436\u0430 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432",
		CONFIRMSELL: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u0430\u0442\u044C %1  \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432?",
		SELLING: "\u041F\u0440\u043E\u0434\u0430\u0436\u0430...",
		SALEDONE: "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u0431\u044B\u043B\u0438 \u043F\u0440\u043E\u0434\u0430\u043D\u044B.",
		NONESELECTED: "\u0412\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u044D\u043B\u0435\u043C\u0435\u043D\u0442 !",
		JOBRANKSETTINGS: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0430 \u0440\u0430\u0431\u043E\u0442.",
		SEARCHINVENTORY: "\u041F\u043E\u0438\u0441\u043A \u0432 \u0431\u0430\u0433\u0430\u0436\u0435.",
		NOSEARCHRESULT: "\u0412\u0430\u0448 \u043F\u043E\u0438\u0441\u043A \u0434\u043B\u044F%1 \u043D\u0435 \u0434\u0430\u043B \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432.%2 \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B%3",
		DISABLEBESTFORJOB: "\u0421\u043A\u0440\u044B\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u043D\u0435 \u0443\u0432\u0435\u043B\u0438\u0447\u0438\u0432\u0430\u044E\u0449\u0438\u0435 \u043A\u043E\u043B-\u0432\u043E \u0422\u041E \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u0437\u0430\u043D\u044F\u0442\u0438\u044F",
		SEARCHHELP: "\u041F\u043E\u0438\u0441\u043A \u0432 \u0431\u0430\u0433\u0430\u0436\u0435. \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u043E\u0432\u044B\u0435 \u0441\u0438\u043C\u0432\u043E\u043B\u044B (* \u0434\u043B\u044F \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u0438\u043B\u0438 \u0431\u043E\u043B\u0435\u0435 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432,? \u0434\u043B\u044F \u043E\u0434\u043D\u043E\u0433\u043E \u0441\u0438\u043C\u0432\u043E\u043B\u0430)",
		DUELSHOOTINGATT: "\u0421\u0442\u0440\u0435\u043B\u043E\u043A(\u0430\u0442\u0430\u043A\u0430)",
		DUELSHOOTINGDEF: "\u0421\u0442\u0440\u0435\u043B\u043E\u043A(\u0437\u0430\u0449\u0438\u0442\u0430)",
		DUELVIGOR: "\u0423\u0434\u0430\u0440\u043D\u0438\u043A",
		FORTATTACK: "\u0424\u043E\u0440\u0442(\u0430\u0442\u0430\u043A\u0430)",
		FORTDEFEND: "\u0424\u043E\u0440\u0442(\u0437\u0430\u0449\u0438\u0442\u0430)",
		HIDEJOBS: "\u0421\u043A\u0440\u044B\u0442\u044C \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0438 \u043D\u0430\u0431\u043E\u0440\u044B",
		CONFIRM: "\u041F\u043E\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C",
		HIDEJOBDESC: "\u0417\u0430\u0434\u0430\u043D\u0438\u044F \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u0441\u043A\u0440\u044B\u0442\u044B \u0437\u0434\u0435\u0441\u044C. \u041E\u0442\u043C\u0435\u0442\u044C\u0442\u0435 \u0432\u0441\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u043D\u044B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438, \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C\".",
		SHOWN: "\u041F\u043E\u043A\u0430\u0437\u0430\u043D\u043E",
		HIDDEN: "\u0421\u043A\u0440\u044B\u0442\u044B\u0435",
		SETTINGSSAVED: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0434\u043B\u044F TW Pro \u0431\u044B\u043B\u0438 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u044B!",
		SETTINGSSAVEDSESSION: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0434\u043B\u044F TW Pro \u0431\u044B\u043B\u0438 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u044B! (for this session only)",/*FIXME*/
		PERSISTSETTINGS: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u044D\u0442\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0439 \u0441\u0435\u0441\u0441\u0438\u0438.",
		CANNOTWEAR: "\u0412\u044B \u043D\u0435 \u043C\u043E\u0436\u0435\u0442\u0435 \u043D\u043E\u0441\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u043D\u0430\u0431\u043E\u0440, \u044D\u0442\u043E\u0442 \u043D\u0430\u0431\u043E\u0440 \u043D\u0435 \u0438\u043C\u0435\u0435\u0442 \u043D\u0438\u043A\u0430\u043A\u043E\u0433\u043E \u0432\u043B\u0438\u044F\u043D\u0438\u044F \u043D\u0430 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C \u0440\u0430\u0441\u0447\u0435\u0442\u043E\u0432.",
		SETSETTINGS: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043D\u0430\u0431\u043E\u0440\u044B \u0434\u043B\u044F \u0431\u043E\u043B\u0435\u0435 \u0431\u044B\u0441\u0442\u0440\u043E\u0433\u043E \u0440\u0430\u0441\u0447\u0435\u0442\u0430. \u041D\u0430\u0431\u043E\u0440\u044B \u0441\u043E \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u043C\u0438, \u043D\u0435\u0443\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044B\u043C\u0438 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F\u043C\u0438 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u044B.",
		CUSTOMNAME: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0443\u0436\u043D\u043E\u0435 \u0438\u043C\u044F \u0434\u043B\u044F \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438",
		CUSTOMCALCULATION: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439  TW Pro \u0434\u043B\u044F \u0440\u0430\u0441\u0447\u0435\u0442\u0430.",
		CUSTOMENABLED: "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u044D\u0442\u043E\u0442 \u0444\u043B\u0430\u0436\u043E\u043A \u0434\u043B\u044F \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u044D\u0442\u043E\u0439 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438",
		NEW: "\u041D\u043E\u0432\u043E\u0435",
		SPEED: "\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C",
		REGENERATION: "\u0411\u044B\u0441\u0442\u0440\u043E\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0425\u041F",
		SETSINFO: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u044B",
		WITHSETITEMS: "\u0411\u043E\u043D\u0443\u0441\u044B \u0441%1 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u043C\u0438",
		LABORPOINTS: "\u0422\u041E",
		USEFULITEM: "\u042D\u0442\u043E \u0447\u0438\u0441\u043B\u043E \u0443\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u043D\u0430 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043E\u0432, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F \u0432 \u0440\u0430\u0441\u0447\u0435\u0442\u0430\u0445",
		PERCREGENERATION: "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435",
		LUCK: "\u0423\u0434\u0430\u0447\u0430",
		PRAYING: "\u041C\u043E\u043B\u0438\u0442\u0432\u0430",
		NOEXTENDEDJOBLIST: 'Do not show the current Labourpoints of activities in the Activity list'
	};
	twpro_langs.br = {
		info: ["JPezzi", "mailto:pezzioliveira@hotmail.com"],
		WEBSITE: "Website",
		AUTHOR: "Autor",
		TRANSLATOR: "Tradutor",
		TWPRO_DISABLED: "script desativado",
		SORTBYNAME: "Ordenar por <b>nome</b>",
		SORTBYXP: "Ordenar por <b>experi\xEAncia</b>",
		SORTBYWAGES: "Ordenar por <b>sal\xE1rios</b>",
		SORTBYLUCK: "Ordenar por <b>sorte</b>",
		SORTBYCOMB: "Ordenar por <b>rank de trabalho</b>",
		SORTBYDANGER: "Ordenar por <b>perigo</b>",
		SORTBYLABORP: "Ordenar por <b>pontos de trabalho</b>",
		FILTERJOBS: "Esconder atividades que n\xE3o posso fazer",
		FILTERCLOTHING: "Mostrar apenas as melhores roupas dispon\xEDveis para a atividade selecionada",
		CHOOSEJOB: "Escolher atividade...",
		CALCJOB: "Calculando valores, por favor espere...",
		INVENTSTATS: "Estat\xEDsticas do invent\xE1rio",
		SELLVALUE: "Valor de venda",
		OBJECTS: "Objetos",
		PRODUCTS: "Produtos",
		TOTAL: "Total",
		QUANTITIES: "Quantidades",
		NONYIELDS: "N\xE3o-produtos",
		LABORP: "PT",
		CONSTRUCTION: "Constru\xE7\xE3o",
		HPTOTAL: "Total de pontos de sa\xFAde",
		STARTCALC: "Calcular dados...",
		CONVERT: "Converter",
		MULTISEL: "Vender m\xFAltiplos itens...",
		SELL: "Vender selecionados",
		CONFIRMSELL: "Voc\xEA realmente quer vender %1 pilhas de itens?",
		SELLING: "Vendendo...",
		SALEDONE: "Os itens selecionados foram vendidos.",
		NONESELECTED: "Voc\xEA tem que selecionar pelo menos um item!",
		JOBRANKSETTINGS: "Configura\xE7\xF5es do ranking de trabalho",
		SEARCHINVENTORY: "Pesquisar de invent\xE1rio",
		NOSEARCHRESULT: "Sua pesquisa por %1 n\xE3o retornou nenhum resultado.%2Mostrar todos os itens%3",
		DISABLEBESTFORJOB: "Desativar itens escondidos, que s\xE3o inferiores para uma atividade selecionada.",
		SEARCHHELP: "Pesquisa no invent\xE1rio. Voc\xEA pode usar curingas (* para zero ou mais caracteres, ? para um caractere)",
		DUELSHOOTINGATT: "Duelista de tiro (atacante)",
		DUELSHOOTINGDEF: "Duelista de tiro (defensor)",
		DUELVIGOR: "Duelista de vigor",
		FORTATTACK: "Batalha de forte (atacante)",
		FORTDEFEND: "Batalha de forte (defensor)",
		HIDEJOBS: "Esconder atividades e sets de itens",
		CONFIRM: "Confirmar",
		HIDEJOBDESC: "Trabalhos podem ser ocultos aqui. Marque todas as atividades que n\xE3o devem ser calculadas automaticamente, e clique em Confirmar.",
		SHOWN: "Mostrado",
		HIDDEN: "Oculto",
		SETTINGSSAVED: "As configura\xE7\xF5es para TW Pro foram aplicadas!",
		SETTINGSSAVEDSESSION: "As configura\xE7\xF5es para TW Pro foram aplicadas! (for this session only)",/*FIXME*/
		PERSISTSETTINGS: "Salvar essas configura\xE7\xF5es para cada sess\xE3o.",
		CANNOTWEAR: "Voc\xEA n\xE3o pode usar este set, ou este set n\xE3o tem influ\xEAncia sobre os c\xE1lculos de atividade.",
		SETSETTINGS: "Desativar sets de itens para c\xE1lculos mais r\xE1pidos. Em sets especiais, as exig\xEAncias n\xE3o atendidas s\xE3o desativados por padr\xE3o.",
		CUSTOMNAME: "Digite o nome desejado para uma atividade",
		CUSTOMCALCULATION: "Digite um c\xE1lculo TW Pro v\xE1lido aqui.",
		CUSTOMENABLED: "Marque esta caixa para habilitar essa atividade",
		NEW: "Novo",
		SPEED: "Velocidade",
		REGENERATION: "Pontos de sa\xFAde mais r\xE1pido",
		SETSINFO: "Sets de itens",
		WITHSETITEMS: "B\xF4nus com %1 itens",
		LABORPOINTS: "Pontos de trabalho",
		USEFULITEM: "Este n\xFAmero indica a quantidade de itens que s\xE3o utilizados nos c\xE1lculos",
		PERCREGENERATION: "Regenera\xE7\xE3o",
		LUCK: "sorte",
		PRAYING: "rezar",
		NOEXTENDEDJOBLIST: "N\xE3o mostrar os Pontos de Trabalho atuais das atividades na Lista de atividades"
	};
	twpro_langs.fr = {
		info: ["Zyphir Randrott", ""],
		WEBSITE: "Website",
		AUTHOR: "Auteur",
		TRANSLATOR: "Traducteur",
		TWPRO_DISABLED: "script d\xE9sactiv\xE9",
		SORTBYNAME: "Trier par <b>Nom</b>",
		SORTBYXP: "Trier par <b>Exp\xE9rience</b>",
		SORTBYWAGES: "Trier par <b>Salaire</b>",
		SORTBYLUCK: "Trier par <b>Chance</b>",
		SORTBYCOMB: "Trier par <b>Importance</b>",
		SORTBYDANGER: "Trier par <b>Danger</b>",
		SORTBYLABORP: "Trier par <b>Points de Travail</b>",
		FILTERJOBS: "Cacher les travaux que je ne peux pas faire",
		FILTERCLOTHING: "Afficher uniquement le meilleur \xE9quipement disponible pour l\'activit\xE9 s\xE9lectionn\xE9e",
		CHOOSEJOB: "Choisir une Activit\xE9...",
		CALCJOB: "Calcul en cours, veuillez patienter...",
		INVENTSTATS: "Statistiques Inventaire",
		SELLVALUE: "Valeurs de vente",
		OBJECTS: "Objets",
		PRODUCTS: "Produits",
		TOTAL: "Total",
		QUANTITIES: "Quantit\xE9s",
		NONYIELDS: "Produits",
		LABORP: "PT",
		CONSTRUCTION: "Construction",
		HPTOTAL: "Total des coups r\xE9ussis",
		STARTCALC: "Lancer le calcul...",
		CONVERT: "Convertir",
		MULTISEL: "Vendre plusieurs articles...",
		SELL: "Vendre la s\xE9lection",
		CONFIRMSELL: "Souhaitez-vous vraiment vendre ces %1 types d\'articles?",
		SELLING: "Vente en cours...",
		SALEDONE: "Les articles s\xE9lectionn\xE9s ont \xE9t\xE9 vendus.",
		NONESELECTED: "Vous devez s\xE9lectionner au moins un article!",
		JOBRANKSETTINGS: "Niveaux d\'Importance",
		SEARCHINVENTORY: "Chercher dans l\'inventaire",
		NOSEARCHRESULT: "Votre recherche pour %1 n\'a pas donn\xE9 de r\xE9sultat.%2Afficher tous les articles%3",
		DISABLEBESTFORJOB: "D\xE9sactivez la fonction qui cache les articles inf\xE9rieurs pour un job s\xE9lectionn\xE9.",
		SEARCHHELP: "Recherche dans l\'inventaire. Vous pouvez utiliser des caract\xE8res joker (* pour plusieurs caract\xE8res, ? pour un seul caract\xE8re)",
		DUELSHOOTINGATT: "Duel / Arme \xE0 feu (attaquant)",
		DUELSHOOTINGDEF: "Duel / Arme \xE0 feu (d\xE9fenseur)",
		DUELVIGOR: "Duel / Arme de contact",
		FORTATTACK: "Bataille de fort (attaquant)",
		FORTDEFEND: "Bataille de fort (d\xE9fenseur)",
		HIDEJOBS: "Cacher les Activit\xE9s et Objets de Sets.",
		CONFIRM: "Confirmer",
		HIDEJOBDESC: "Les travaux peuvent \xEAtre cach\xE9s ici. S\xE9lectionnez toutes les Activit\xE9s qui ne doivent pas \xEAtre calcul\xE9es automatiquement et cliquez sur Confirmer.",
		SHOWN: "Affich\xE9s",
		HIDDEN: "Cach\xE9s",
		SETTINGSSAVED: "Les param\xE8tres TW Pro ont \xE9t\xE9 appliqu\xE9s!",
		SETTINGSSAVEDSESSION: "Les param\xE8tres TW Pro ont \xE9t\xE9 appliqu\xE9s! (pour cette session uniquement)",
		PERSISTSETTINGS: "Sauver ces param\xE8tres pour toutes les sessions.",
		CANNOTWEAR: "Vous ne pouvez pas porter ce Set, ou ce Set n\'a aucune influence sur les calculs d\'Activit\xE9s.",
		SETSETTINGS: "D\xE9sactivez les objets de Sets pour am\xE9liorer la vitesse de calcul. Les Sets avec des conditions sp\xE9ciales requises non remplies sont d\xE9sactiv\xE9s par d\xE9faut.",
		CUSTOMNAME: "Entrez le nom d\xE9sir\xE9 pour l\'Activit\xE9.",
		CUSTOMCALCULATION: "Entrez ici une formule TW Pro valide.",
		CUSTOMENABLED: "Cochez cette case pour activer cette Activit\xE9",
		NEW: "Nouveau",
		SPEED: "Vitesse",
		REGENERATION: "R\xE9g\xE9n\xE9ration PV",
		SETSINFO: "Objets de Sets",
		WITHSETITEMS: "Bonus avec %1 objets",
		LABORPOINTS: "Points de Travail",
		USEFULITEM: "Ce nombre indique le nombre d\'objets qui sont utilis\xE9s dans les calculs.",
		PERCREGENERATION: "R\xE9g\xE9n\xE9ration",
		LUCK: "Chance",
		PRAYING: "Prier",
		NOEXTENDEDJOBLIST: 'Do not show the current Labourpoints of activities in the Activity list'
	};
	twpro_langs.sk = {
		info: ["Lordofminor", "mailto:overlordeu@gmail.com"],
		WEBSITE: "Web",
		AUTHOR: "Autor",
		TRANSLATOR: "Preklad",
		TWPRO_DISABLED: "Skript vypnut\xFD",
		SORTBYNAME: "Zoradi\u0165 pod\u013Ea <b>mena</b>",
		SORTBYXP: "Zoradi\u0165 pod\u013Ea <b>sk\xFAsenost\xED</b>",
		SORTBYWAGES: "Zoradi\u0165 pod\u013Ea <b>zisku</b>",
		SORTBYLUCK: "Zoradi\u0165 pod\u013Ea <b>\u0161\u0165astia</b>",
		SORTBYCOMB: "Zoradi\u0165 pod\u013Ea <b>obtia\u017Enosti </b>",
		SORTBYDANGER: "Zoradi\u0165 pod\u013Ea <b>nebezpe\u010Dia</b>",
		SORTBYLABORP: "Zoradi\u0165 pod\u013Ea <b>pracovn\xFDch bodov (PB)</b>",
		FILTERJOBS: "Skry pr\xE1ce ktor\xE9 nem\xF4\u017Eem robi\u0165",
		FILTERCLOTHING: "Zobraz najlep\u0161iu v\xFDbavu pre vybran\xFA pr\xE1cu",
		CHOOSEJOB: "Vyber pr\xE1cu...",
		CALCJOB: "Po\u010D\xEDtam hodnoty, \u010Dakaj pros\xEDm...",
		INVENTSTATS: "\u0160tatistika invent\xE1ra",
		SELLVALUE: "Predajn\xE1 hodnota",
		OBJECTS: "Objektov",
		PRODUCTS: "Produktov",
		TOTAL: "Celkom",
		QUANTITIES: "Polo\u017Eiek",
		NONYIELDS: "Bez hodnoty",
		LABORP: "PB",
		CONSTRUCTION: "V\xFDstavba",
		HPTOTAL: "\u017Divoty",
		STARTCALC: "Za\u010Dni v\xFDpo\u010Det",
		CONVERT: "Preve\u010F",
		MULTISEL: "Viacn\xE1sobn\xFD predaj...",
		SELL: "Predaj zvolen\xE9...",
		CONFIRMSELL: "V\xE1\u017Ene chce\u0161 preda\u0165 %1 hrom\xE1d vec\xED?",
		SELLING: "Pred\xE1vam...",
		SALEDONE: "Vybran\xE9 veci boli predan\xE9.",
		NONESELECTED: "Mus\xED by\u0165 vybran\xFD minim\xE1lne jeden predmet!",
		JOBRANKSETTINGS: "Nastavenie poz\xEDcie pr\xE1ce",
		SEARCHINVENTORY: "Preh\u013Eada\u0165 invent\xE1r",
		NOSEARCHRESULT: "H\u013Eadal si %1 bez v\xFDsledku.%2Zobrazenie v\u0161etk\xFDch vec\xED%3",
		DISABLEBESTFORJOB: "Tento text je zobrazen\xFD ak m\xE1\u0161 za\u0161krtnut\xFA vo\u013Ebu zobrazovania najlep\u0161\xEDch vec\xED pre pr\xE1cu, ale kalkul\xE1tor nena\u0161iel ni\u010D lep\u0161ieho ako to \u010Do m\xE1\u0161 na sebe.",
		SEARCHHELP: "Preh\u013Eada\u0165 invent\xE1r. M\xF4\u017Ee\u0161 pou\u017Ei\u0165 z\xE1stupn\xE9 znaky (* pre \u017Eiadny alebo viac znakov, ? pre jeden znak)",
		DUELSHOOTINGATT: "Duelant strelec (\xFAto\u010Dn\xEDk)",
		DUELSHOOTINGDEF: "Duelant strelec (obranca)",
		DUELVIGOR: "Duelant chladn\xE9 zbrane",
		FORTATTACK: "Pevnos\u0165 (\xFAto\u010Dn\xEDk)",
		FORTDEFEND: "Pevnos\u0165 (obranca)",
		HIDEJOBS: "Skry pr\xE1ce a sady vec\xED",
		CONFIRM: "Potvrdi\u0165 ",
		HIDEJOBDESC: "Tu m\xF4\u017Ee\u0161 skry\u0165 pr\xE1ce. Ozna\u010D pr\xE1ce, ktor\xE9 sa nemaj\xFA po\u010D\xEDta\u0165 automaticky a klikni na Potvrdi\u0165.",
		SHOWN: "Zobrazen\xE9",
		HIDDEN: "Skryt\xE9",
		SETTINGSSAVED: "Nastavenie TW Pro bolo aplikovan\xE9!",
		SETTINGSSAVEDSESSION: "Nastavenie TW Pro bolo aplikovan\xE9! (iba pre toto prihl\xE1senie)",
		PERSISTSETTINGS: "Ulo\u017E nastavenie pre natrvalo.",
		CANNOTWEAR: "Tento set nem\xF4\u017Ee\u0161 nosi\u0165 alebo nem\xE1 \u017Eiadny vplyv na dan\xFA pr\xE1cu.",
		SETSETTINGS: "Zak\xE1\u017E sady pre r\xFDchlej\u0161\xED v\xFDpo\u010Det. \u0160peci\xE1lne sady s\xFA bez doporu\u010Denia \u0161tandartne neakt\xEDvne.",
		CUSTOMNAME: "Pomenuj svoju vlastn\xFA pr\xE1cu",
		CUSTOMCALCULATION: "Vlo\u017E kombin\xE1ciu schopnost\xED pre vlastn\xFA aktivitu",
		CUSTOMENABLED: "Za\u0161krtni pre povolenie pr\xE1ce",
		NEW: "Nov\xE1",
		SPEED: "R\xFDchlos\u0165 (cestovanie)",
		REGENERATION: "R\xFDchle \u017Eivoty (zdravie+regener\xE1cia)",
		SETSINFO: "Sada",
		WITHSETITEMS: "Bonus s %1 vecami",
		LABORPOINTS: "Pracovn\xE9 body",
		USEFULITEM: "Toto \u010D\xEDslo ukazuje po\u010Det vec\xED pou\u017Eit\xFDch v kalkul\xE1cii",
		PERCREGENERATION: "Regener\xE1cia",
		LUCK: "\u0160\u0165astie",
		PRAYING: "Modli\u0165 sa",
		NOEXTENDEDJOBLIST: "Nezobrazova\u0165 aktu\xE1lne pr\xE1ce medzi akt\xEDvnymi"
	};
	twpro_langs.it = {
		info: ["karashov", "mailto:karashov@gmail.com"],
		WEBSITE: "Website",
		AUTHOR: "Autore",
		TRANSLATOR: "Traduttore",
		TWPRO_DISABLED: "script disabilitato",
		SORTBYNAME: "Ordina per <b>nome</b>",
		SORTBYXP: "Ordina per <b>esperienza</b>",
		SORTBYWAGES: "Ordina per <b>salario</b>",
		SORTBYLUCK: "Ordina per <b>fortuna</b>",
		SORTBYCOMB: "Ordina per <b>job rank</b>",
		SORTBYDANGER: "Ordina per <b>pericolo</b>",
		SORTBYLABORP: "Ordina per <b>punti lavoro</b>",
		FILTERJOBS: "Nascondi le attivit\xE0 che non posso svolgere",
		FILTERCLOTHING: "Visualizza solo i vestiti migliori disponibili per l\'attivit\xE0 selezionata",
		CHOOSEJOB: "Scegli attivit\xE0...",
		CALCJOB: "Calcolo in corso, attendere prego...",
		INVENTSTATS: "Statistiche inventario",
		SELLVALUE: "Valore di vendita",
		OBJECTS: "Oggetti",
		PRODUCTS: "Prodotti",
		TOTAL: "Totale",
		QUANTITIES: "Quantitit\xE0",
		NONYIELDS: "Non-prodotti",
		LABORP: "PL",
		CONSTRUCTION: "Costruzione",
		HPTOTAL: "Punti vita totali",
		STARTCALC: "Calcolo i dati...",
		CONVERT: "Converti",
		MULTISEL: "Vendi pi\xF9 oggetti...",
		SELL: "Vendi selezionati",
		CONFIRMSELL: "Vuoi veramente vendere %1 questi oggetti?",
		SELLING: "Vendita in corso...",
		SALEDONE: "Gli oggetti selezionati sono stati venduti.",
		NONESELECTED: "E\' necessario selezionare almeno un oggetto!",
		JOBRANKSETTINGS: "Job ranking settings",
		SEARCHINVENTORY: "Cerca nell\'inventario",
		NOSEARCHRESULT: "La ricerca di %1 non ha dato risultati.%2Visualizza tutti gli oggetti%3",
		DISABLEBESTFORJOB: "Disabilita la funzione che nasconde gli oggetti inferiori per un\'attivit\xE0 selezionata.",
		SEARCHHELP: "Cerca nell\'inventario. Sono utilizzabili i caratteri jolly (* per zero o pi\xF9 caratteri, ? per un carattere)",
		DUELSHOOTINGATT: "Duello/Arma da fuoco (attacco)",
		DUELSHOOTINGDEF: "Duello/Arma da fuoco (difesa)",
		DUELVIGOR: "Duello/Arma da contusione",
		FORTATTACK: "Forti: Attacco",
		FORTDEFEND: "Forti: Difesa",
		HIDEJOBS: "Nascondi attivit\xE0 e set di oggetti",
		CONFIRM: "Conferma",
		HIDEJOBDESC: "Le attivit\xE0 possono essere nascoste qui. Selezionare quelle che non dovranno essere calcolate automaticamente, e fare click su Conferma.",
		SHOWN: "Visibili",
		HIDDEN: "Nascoste",
		SETTINGSSAVED: "Le impostazioni di TW Pro sono state applicate!",
		SETTINGSSAVEDSESSION: "Le impostazioni di TW Pro sono state applicate! (solo per questa sessione)",
		PERSISTSETTINGS: "Salva queste impostazioni per tutte le sessioni.",
		CANNOTWEAR: "Non puoi indossare questo set, o non ha influenza sul calcolo per l\'attivit\xE0 da svolgere.",
		SETSETTINGS: "Disabilita i set di oggetti per un calcolo pi\xF9 veloce. I set con condizioni speciali o non raggiunte, sono disabilitati di default.",
		CUSTOMNAME: "Inserire Il nome desiderato per l\'attivit\xE0.",
		CUSTOMCALCULATION: "Inserire un calcolo valido di TW Pro qui.",
		CUSTOMENABLED: "Selezionare questa casella per abilitare questa attivit\xE0.",
		NEW: "Nuova",
		SPEED: "Velocit\xE0 (cavalcata)",
		REGENERATION: "Recupero veloce PV",
		SETSINFO: "Set di oggetti",
		WITHSETITEMS: "Bonus con %1 oggetti",
		LABORPOINTS: "Punti Lavoro",
		USEFULITEM: "Questo numero indica la quantit\xE0 di oggetti usata nei calcoli",
		PERCREGENERATION: "Rigenerazione",
		LUCK: "fortuna",
		PRAYING: "preghiera",
		NOEXTENDEDJOBLIST: "Nascondi gli attuali Punti Lavoro delle attivit\xE0 nella Lista delle Attivit\xE0"
	};
	twpro_langs.gr = {
		info: ["Dimitris S.", "mailto:siak_dim@hotmail.com"],
		WEBSITE: "\u0399\u03C3\u03C4\u03BF\u03C3\u03B5\u03BB\u03AF\u03B4\u03B1",
		AUTHOR: "\u03A3\u03C5\u03B3\u03B3\u03C1\u03B1\u03C6\u03AD\u03B1\u03C2",
		TRANSLATOR: "\u039C\u03B5\u03C4\u03B1\u03C6\u03C1\u03B1\u03C3\u03C4\u03AE\u03C2",
		TWPRO_DISABLED: "\u0391\u03C0\u03B5\u03BD\u03B5\u03C1\u03B3\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7 script",
		SORTBYNAME: "\u03A4\u03B1\u03BE\u03B9\u03BD\u03CC\u03BC\u03B7\u03C3\u03B7 \u03BA\u03B1\u03C4\u03AC <b>\u03CC\u03BD\u03BF\u03BC\u03B1</b>",
		SORTBYXP: "\u03A4\u03B1\u03BE\u03B9\u03BD\u03CC\u03BC\u03B7\u03C3\u03B7 \u03BA\u03B1\u03C4\u03AC <b>\u03B5\u03BC\u03C0\u03B5\u03B9\u03C1\u03AF\u03B1</b>",
		SORTBYWAGES: "\u03A4\u03B1\u03BE\u03B9\u03BD\u03CC\u03BC\u03B7\u03C3\u03B7 \u03BA\u03B1\u03C4\u03AC <b>\u03BC\u03B9\u03C3\u03B8\u03CC</b>",
		SORTBYLUCK: "\u03A4\u03B1\u03BE\u03B9\u03BD\u03CC\u03BC\u03B7\u03C3\u03B7 \u03BA\u03B1\u03C4\u03AC <b>\u03C4\u03CD\u03C7\u03B7</b>",
		SORTBYCOMB: "\u03A4\u03B1\u03BE\u03B9\u03BD\u03CC\u03BC\u03B7\u03C3\u03B7 \u03BA\u03B1\u03C4\u03AC <b>\u03BA\u03B1\u03C4\u03AC\u03C4\u03B1\u03BE\u03B7 \u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1\u03C2</b>",
		SORTBYDANGER: "\u03A4\u03B1\u03BE\u03B9\u03BD\u03CC\u03BC\u03B7\u03C3\u03B7 \u03BA\u03B1\u03C4\u03AC <b>\u03B5\u03C0\u03B9\u03BA\u03B9\u03BD\u03B4\u03C5\u03BD\u03CC\u03C4\u03B7\u03C4\u03B1</b>",
		SORTBYLABORP: "\u03A4\u03B1\u03BE\u03B9\u03BD\u03CC\u03BC\u03B7\u03C3\u03B7 \u03BA\u03B1\u03C4\u03AC <b>\u03C0\u03CC\u03BD\u03C4\u03BF\u03B9 \u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1\u03C2</b>",
		FILTERJOBS: "\u0391\u03C0\u03CC\u03BA\u03C1\u03C5\u03C8\u03B7 \u03B4\u03C1\u03B1\u03C3\u03C4\u03B7\u03C1\u03B9\u03BF\u03C4\u03AE\u03C4\u03C9\u03BD \u03C0\u03BF\u03C5 \u03B4\u03B5\u03BD \u03BC\u03C0\u03BF\u03C1\u03CE \u03BD\u03B1 \u03BA\u03AC\u03BD\u03C9",
		FILTERCLOTHING: "\u0395\u03BC\u03C6\u03AC\u03BD\u03B9\u03C3\u03B5 \u03C4\u03BF\u03BD \u03BA\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03BF \u03B4\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03BF \u03C1\u03BF\u03C5\u03C7\u03B9\u03C3\u03BC\u03CC \u03B3\u03B9\u03B1 \u03C4\u03B7\u03BD \u03B5\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03B7 \u03B4\u03C1\u03B1\u03C3\u03C4\u03B7\u03C1\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1",
		CHOOSEJOB: "\u0395\u03C0\u03AF\u03BB\u03B5\u03BE\u03B5 \u03B4\u03C1\u03B1\u03C3\u03C4\u03B7\u03C1\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1",
		CALCJOB: "\u03A5\u03C0\u03BF\u03BB\u03BF\u03B3\u03B9\u03C3\u03BC\u03CC\u03C2 \u03C4\u03B9\u03BC\u03CE\u03BD, \u03C0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB\u03CE \u03C0\u03B5\u03C1\u03B9\u03BC\u03AD\u03BD\u03B5\u03C4\u03B5...",
		INVENTSTATS: "\u03A3\u03C4\u03B1\u03C4\u03B9\u03C3\u03C4\u03B9\u03BA\u03AC \u0391\u03C0\u03BF\u03B8\u03B5\u03BC\u03AC\u03C4\u03C9\u03BD",
		SELLVALUE: "\u03A4\u03B9\u03BC\u03AE \u03C0\u03CE\u03BB\u03B7\u03C3\u03B7\u03C2",
		OBJECTS: "\u0391\u03BD\u03C4\u03B9\u03BA\u03B5\u03AF\u03BC\u03B5\u03BD\u03B1",
		PRODUCTS: "\u03A0\u03C1\u03BF\u03CA\u03CC\u03BD\u03C4\u03B1",
		TOTAL: "\u03A3\u03CD\u03BD\u03BF\u03BB\u03BF",
		QUANTITIES: "\u03A0\u03BF\u03C3\u03CC\u03C4\u03B7\u03C4\u03B5\u03C2",
		NONYIELDS: "\u03A7\u03C9\u03C1\u03AF\u03C2 \u03BA\u03B1\u03C4\u03B7\u03B3\u03BF\u03C1\u03AF\u03B1",
		LABORP: "\u03A0\u0395",
		CONSTRUCTION: "\u039A\u03B1\u03C4\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE",
		HPTOTAL: "\u03A3\u03CD\u03BD\u03BF\u03BB\u03BF \u03C0\u03CC\u03BD\u03C4\u03C9\u03BD \u03C5\u03B3\u03B5\u03AF\u03B1\u03C2",
		STARTCALC: "\u03A5\u03C0\u03BF\u03BB\u03BF\u03B3\u03B9\u03C3\u03BC\u03CC\u03C2 \u03B4\u03B5\u03B4\u03BF\u03BC\u03AD\u03BD\u03C9\u03BD...",
		CONVERT: "\u039C\u03B5\u03C4\u03B1\u03C4\u03C1\u03BF\u03C0\u03AE",
		MULTISEL: "\u03A0\u03CE\u03BB\u03B7\u03C3\u03B7 \u03C0\u03BF\u03BB\u03BB\u03B1\u03C0\u03BB\u03CE\u03BD \u03B1\u03BD\u03C4\u03B9\u03BA\u03B5\u03B9\u03BC\u03AD\u03BD\u03C9\u03BD...",
		SELL: "\u03A0\u03CE\u03BB\u03B7\u03C3\u03B7 \u03B5\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03C9\u03BD",
		CONFIRMSELL: "\u0398\u03B5\u03C2 \u03C0\u03C1\u03B1\u03B3\u03BC\u03B1\u03C4\u03B9\u03BA\u03AC \u03BD\u03B1 \u03C0\u03BF\u03C5\u03BB\u03AE\u03C3\u03B5\u03B9\u03C2 %1 \u03B1\u03BD\u03C4\u03B9\u03BA\u03B5\u03AF\u03BC\u03B5\u03BD\u03B1 \u03C4\u03C9\u03BD \u03B1\u03C0\u03BF\u03B8\u03B5\u03BC\u03AC\u03C4\u03C9\u03BD;",
		SELLING: "\u03A0\u03CE\u03BB\u03B7\u03C3\u03B7...",
		SALEDONE: "\u03A4\u03B1 \u03B5\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03B1 \u03B1\u03BD\u03C4\u03B9\u03BA\u03B5\u03AF\u03BC\u03B5\u03BD\u03B1 \u03C0\u03BF\u03C5\u03BB\u03AE\u03B8\u03B7\u03BA\u03B1\u03BD.",
		NONESELECTED: "\u03A0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03C0\u03B9\u03BB\u03AD\u03BE\u03B5\u03B9\u03C2 \u03AD\u03BD\u03B1 \u03B1\u03BD\u03C4\u03B9\u03BA\u03B5\u03AF\u03BC\u03B5\u03BD\u03BF \u03C4\u03BF\u03C5\u03BB\u03AC\u03C7\u03B9\u03C3\u03C4\u03BF\u03BD!",
		JOBRANKSETTINGS: "\u03A1\u03C5\u03B8\u03BC\u03AF\u03C3\u03B5\u03B9\u03C2 \u03BA\u03B1\u03C4\u03AC\u03C4\u03B1\u03BE\u03B7\u03C2 \u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1\u03C2",
		SEARCHINVENTORY: "\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7 \u03C3\u03C4\u03B1 \u03B1\u03C0\u03BF\u03B8\u03AD\u03BC\u03B1\u03C4\u03B1",
		NOSEARCHRESULT: "\u0397 \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7 \u03B3\u03B9\u03B1 %1 \u03B4\u03B5\u03BD \u03B5\u03C0\u03AD\u03C3\u03C4\u03C1\u03B5\u03C8\u03B5 \u03B1\u03C0\u03BF\u03C4\u03AD\u03BB\u03B5\u03C3\u03BC\u03B1.%2\u0395\u03BC\u03C6\u03AC\u03BD\u03B9\u03C3\u03B7 \u03CC\u03BB\u03C9\u03BD \u03C4\u03C9\u03BD \u03B1\u03BD\u03C4\u03B9\u03BA\u03B5\u03B9\u03BC\u03AD\u03BD\u03C9\u03BD%3",
		DISABLEBESTFORJOB: "\u0391\u03C0\u03B5\u03BD\u03B5\u03C1\u03B3\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7 \u03B1\u03C0\u03CC\u03BA\u03C1\u03C5\u03C8\u03B7\u03C2 \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03C9\u03BD \u03C0\u03BF\u03C5 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03BA\u03B1\u03C4\u03CE\u03C4\u03B5\u03C1\u03B1 \u03B3\u03B9\u03B1 \u03BC\u03B9\u03B1 \u03B5\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03B7 \u03B4\u03C1\u03B1\u03C3\u03C4\u03B7\u03C1\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1.",
		SEARCHHELP: "\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7 \u03C3\u03C4\u03B1 \u03B1\u03C0\u03BF\u03B8\u03AD\u03BC\u03B1\u03C4\u03B1. \u039C\u03C0\u03BF\u03C1\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03C4\u03B5 \u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03AE\u03C1\u03B5\u03C2 \u03BC\u03C0\u03B1\u03BB\u03B1\u03BD\u03C4\u03AD\u03C1 (* \u03B3\u03B9\u03B1 \u03BC\u03B7\u03B4\u03AD\u03BD \u03AE \u03C0\u03B5\u03C1\u03B9\u03C3\u03C3\u03CC\u03C4\u03B5\u03C1\u03BF\u03C5\u03C2 \u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03AE\u03C1\u03B5\u03C2,? \u03B3\u03B9\u03B1 \u03AD\u03BD\u03B1\u03BD \u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03AE\u03C1\u03B1)",
		DUELSHOOTINGATT: "\u039C\u03BF\u03BD\u03BF\u03BC\u03AC\u03C7\u03BF\u03C2 \u03B5\u03C0\u03AF\u03B8\u03B5\u03C3\u03B7\u03C2",
		DUELSHOOTINGDEF: "\u039C\u03BF\u03BD\u03BF\u03BC\u03AC\u03C7\u03BF\u03C2 \u03AC\u03BC\u03C5\u03BD\u03B1\u03C2",
		DUELVIGOR: "\u039C\u03BF\u03BD\u03BF\u03BC\u03AC\u03C7\u03BF\u03C2 \u03BA\u03BF\u03BD\u03C4\u03B9\u03BD\u03AE\u03C2 \u03B1\u03C0\u03CC\u03C3\u03C4\u03B1\u03C3\u03B7\u03C2",
		FORTATTACK: "\u039C\u03AC\u03C7\u03B7 \u03BF\u03C7\u03C5\u03C1\u03BF\u03CD (\u03B5\u03C0\u03AF\u03B8\u03B5\u03C3\u03B7)",
		FORTDEFEND: "\u039C\u03AC\u03C7\u03B7 \u03BF\u03C7\u03C5\u03C1\u03BF\u03CD (\u03AC\u03BC\u03C5\u03BD\u03B1)",
		HIDEJOBS: "\u0391\u03C0\u03CC\u03BA\u03C1\u03C5\u03C8\u03B5 \u03B4\u03C1\u03B1\u03C3\u03C4\u03B7\u03C1\u03B9\u03CC\u03C4\u03B7\u03C4\u03B5\u03C2 \u03BA\u03B1\u03B9 \u03C3\u03B5\u03C4 \u03B1\u03BD\u03C4\u03B9\u03BA\u03B5\u03B9\u03BC\u03AD\u03BD\u03C9\u03BD",
		CONFIRM: "\u0395\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7",
		HIDEJOBDESC: "\u0391\u03C0\u03CC\u03BA\u03C1\u03C5\u03C8\u03B7 \u03B5\u03C1\u03B3\u03B1\u03C3\u03B9\u03CE\u03BD. \u0395\u03C0\u03AF\u03BB\u03B5\u03BE\u03B5 \u03CC\u03BB\u03B5\u03C2 \u03C4\u03B9\u03C2 \u03B4\u03C1\u03B1\u03C3\u03C4\u03B7\u03C1\u03B9\u03CC\u03C4\u03B7\u03C4\u03B5\u03C2 \u03C0\u03BF\u03C5 \u03B4\u03B5\u03BD \u03B8\u03B1 \u03C5\u03C0\u03BF\u03BB\u03BF\u03B3\u03AF\u03B6\u03BF\u03BD\u03C4\u03B1\u03B9 \u03B1\u03C5\u03C4\u03CC\u03BC\u03B1\u03C4\u03B1 \u03BA\u03B1\u03B9 \u03C0\u03AC\u03C4\u03B1 \u03B5\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7.",
		SHOWN: "\u0395\u03BC\u03C6\u03AC\u03BD\u03B9\u03C3\u03B7",
		HIDDEN: "\u0391\u03C0\u03CC\u03BA\u03C1\u03C5\u03C8\u03B7",
		SETTINGSSAVED: "\u039F\u03B9 \u03C1\u03C5\u03B8\u03BC\u03AF\u03C3\u03B5\u03B9\u03C2 \u03B3\u03B9\u03B1 \u03C4\u03BF TW Pro \u03AD\u03C7\u03BF\u03C5\u03BD \u03B5\u03C6\u03B1\u03C1\u03BC\u03BF\u03C3\u03C4\u03B5\u03AF!",
		SETTINGSSAVEDSESSION: "\u039F\u03B9 \u03C1\u03C5\u03B8\u03BC\u03AF\u03C3\u03B5\u03B9\u03C2 \u03B3\u03B9\u03B1 \u03C4\u03BF TW Pro \u03AD\u03C7\u03BF\u03C5\u03BD \u03B5\u03C6\u03B1\u03C1\u03BC\u03BF\u03C3\u03C4\u03B5\u03AF! (for this session only)",
		PERSISTSETTINGS: "\u0391\u03C0\u03BF\u03B8\u03AE\u03BA\u03B5\u03C5\u03C3\u03B5 \u03B1\u03C5\u03C4\u03AD\u03C2 \u03C4\u03B9\u03C2 \u03C1\u03C5\u03B8\u03BC\u03AF\u03C3\u03B5\u03B9\u03C2 \u03B3\u03B9\u03B1 \u03BA\u03AC\u03B8\u03B5 \u03C3\u03C5\u03BD\u03B5\u03B4\u03C1\u03AF\u03B1.",
		CANNOTWEAR: "\u0394\u03B5\u03BD \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF\u03C2 \u03BD\u03B1 \u03C6\u03BF\u03C1\u03AD\u03C3\u03B5\u03B9\u03C2 \u03B1\u03C5\u03C4\u03CC \u03C4\u03BF \u03C3\u03B5\u03C4, \u03AE \u03B1\u03C5\u03C4\u03CC \u03C4\u03BF \u03C3\u03B5\u03C4 \u03B4\u03B5\u03BD \u03AD\u03C7\u03B5\u03B9 \u03BA\u03B1\u03BC\u03AF\u03B1 \u03B5\u03C0\u03AF\u03B4\u03C1\u03B1\u03C3\u03B7 \u03C3\u03C4\u03BF\u03C5\u03C2 \u03C5\u03C0\u03BF\u03BB\u03BF\u03B3\u03B9\u03C3\u03BC\u03BF\u03CD\u03C2 \u0394\u03C1\u03B1\u03C3\u03C4\u03B7\u03C1\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1\u03C2.",
		SETSETTINGS: "\u0391\u03C0\u03B5\u03BD\u03B5\u03C1\u03B3\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7 \u03C3\u03B5\u03C4 \u03B1\u03BD\u03C4\u03B9\u03BA\u03B5\u03B9\u03BC\u03AD\u03BD\u03C9\u03BD \u03B3\u03B9\u03B1 \u03C4\u03B1\u03C7\u03CD\u03C4\u03B5\u03C1\u03BF\u03C5\u03C2 \u03C5\u03C0\u03BF\u03BB\u03BF\u03B3\u03B9\u03C3\u03BC\u03BF\u03CD\u03C2. \u03A4\u03B1 \u03C3\u03B5\u03C4 \u03BC\u03B5 \u03B5\u03B9\u03B4\u03B9\u03BA\u03AD\u03C2, \u03B1\u03BD\u03B5\u03BA\u03C0\u03BB\u03AE\u03C1\u03C9\u03C4\u03B5\u03C2 \u03B1\u03C0\u03B1\u03B9\u03C4\u03AE\u03C3\u03B5\u03B9\u03C2 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B1\u03C0\u03B5\u03BD\u03B5\u03C1\u03B3\u03BF\u03C0\u03BF\u03B9\u03B7\u03BC\u03AD\u03BD\u03B1 \u03B1\u03C0\u03CC \u03C0\u03C1\u03BF\u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE.",
		CUSTOMNAME: "\u03A0\u03BB\u03B7\u03BA\u03C4\u03C1\u03BF\u03BB\u03BF\u03B3\u03AE\u03C3\u03C4\u03B5 \u03C4\u03BF \u03CC\u03BD\u03BF\u03BC\u03B1 \u03C0\u03BF\u03C5 \u03B8\u03AD\u03BB\u03B5\u03C4\u03B5 \u03B3\u03B9\u03B1 \u03BC\u03B9\u03B1 \u03B4\u03C1\u03B1\u03C3\u03C4\u03B7\u03C1\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1.",
		CUSTOMCALCULATION: "\u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03AD\u03BD\u03B1\u03BD \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF TW Pro \u03C5\u03C0\u03BF\u03BB\u03BF\u03B3\u03B9\u03C3\u03BC\u03CC \u03B5\u03B4\u03CE.",
		CUSTOMENABLED: "\u0395\u03C0\u03B9\u03BB\u03AD\u03BE\u03C4\u03B5 \u03B1\u03C5\u03C4\u03CC \u03C4\u03BF \u03BA\u03BF\u03C5\u03C4\u03AF \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03B5\u03BD\u03B5\u03C1\u03B3\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03C4\u03B5 \u03B1\u03C5\u03C4\u03AE \u03C4\u03B7 \u03B4\u03C1\u03B1\u03C3\u03C4\u03B7\u03C1\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1",
		NEW: "\u039D\u03AD\u03BF",
		SPEED: "\u03A4\u03B1\u03C7\u03CD\u03C4\u03B7\u03C4\u03B1",
		REGENERATION: "\u03A4\u03B1\u03C7\u03CD\u03C4\u03B5\u03C1\u03BF\u03B9 \u03C0\u03CC\u03BD\u03C4\u03BF\u03B9 \u03B6\u03C9\u03AE\u03C2",
		SETSINFO: "\u03A3\u03B5\u03C4 \u03B1\u03BD\u03C4\u03B9\u03BA\u03B5\u03B9\u03BC\u03AD\u03BD\u03C9\u03BD",
		WITHSETITEMS: "Bonus \u03BC\u03B5 %1 \u03B1\u03BD\u03C4\u03B9\u03BA\u03B5\u03AF\u03BC\u03B5\u03BD\u03B1",
		LABORPOINTS: "\u03A0\u03CC\u03BD\u03C4\u03BF\u03B9 \u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1\u03C2",
		USEFULITEM: "\u039F \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 \u03B1\u03C5\u03C4\u03CC\u03C2 \u03B4\u03B5\u03AF\u03C7\u03BD\u03B5\u03B9 \u03C4\u03BF \u03C0\u03BF\u03C3\u03CC \u03C4\u03C9\u03BD \u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03C9\u03BD \u03C0\u03BF\u03C5 \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03BF\u03CD\u03BD\u03C4\u03B1\u03B9 \u03C3\u03C4\u03BF\u03C5\u03C2 \u03C5\u03C0\u03BF\u03BB\u03BF\u03B3\u03B9\u03C3\u03BC\u03BF\u03CD\u03C2",
		PERCREGENERATION: "\u0393\u03C1\u03AE\u03B3\u03BF\u03C1\u03B7 \u03B1\u03BD\u03B1\u03C0\u03BB\u03AE\u03C1\u03C9\u03C3\u03B7 \u03B6\u03C9\u03AE\u03C2",
		LUCK: "\u03A4\u03CD\u03C7\u03B7",
		PRAYING: "\u03A0\u03C1\u03BF\u03C3\u03B5\u03C5\u03C7\u03AE",
		NOEXTENDEDJOBLIST: "\u0391\u03C0\u03CC\u03BA\u03C1\u03C5\u03C8\u03B7 \u03C0\u03CC\u03BD\u03C4\u03C9\u03BD \u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1\u03C2 \u03C3\u03C4\u03B7 \u039B\u03AF\u03C3\u03C4\u03B1 \u0395\u03BD\u03B5\u03C1\u03B3\u03B5\u03B9\u03CE\u03BD."
	};
	twpro_langs.es = {
		info: ["pepe100", "mailto:netfmll@gmail.com"],
		WEBSITE: "Web",
		AUTHOR: "Autor",
		TRANSLATOR: "Traducci\xF3n",
		TWPRO_DISABLED: "script deshabilitado",
		SORTBYNAME: "Ordenar por <b>nombre</b>",
		SORTBYXP: "Ordenar por <b>experiencia</b>",
		SORTBYWAGES: "Ordenar por <b>salario</b>",
		SORTBYLUCK: "Ordenar por <b>suerte</b>",
		SORTBYCOMB: "Ordenar por <b>rango de trabajo</b>",
		SORTBYDANGER: "Ordenar por <b>peligro</b>",
		SORTBYLABORP: "Ordenar por <b>puntos de trabajo</b>",
		FILTERJOBS: "Ocultar trabajos que no puedo hacer",
		FILTERCLOTHING: "Solo mostrar la mejor ropa para el trabajo seleccionado",
		CHOOSEJOB: "Elegir trabajo...",
		CALCJOB: "Calculando valores, por favor espere...",
		INVENTSTATS: "Estad\xEDsticas de Inventario",
		SELLVALUE: "Valor de ventas",
		OBJECTS: "Objetos",
		PRODUCTS: "Productos",
		TOTAL: "Total",
		QUANTITIES: "Cantidades",
		NONYIELDS: "Sin rendimientos",
		LABORP: "PT",
		CONSTRUCTION: "Construcci\xF3n",
		HPTOTAL: "Puntos totales de salud",
		STARTCALC: "Calcular datos...",
		CONVERT: "Convertir",
		MULTISEL: "Vender varios objetos...",
		SELL: "Selecci\xF3n de venta",
		CONFIRMSELL: "\xBFRealmente quieres vender %1 que has seleccionado??",
		SELLING: "Vendiendo...",
		SALEDONE: "Los objetos seleccionados han sido vendidos.",
		NONESELECTED: "\xA1Tienes que seleccionar al menos un objeto!",
		JOBRANKSETTINGS: "Configuraci\xF3n del rango de trabajo",
		SEARCHINVENTORY: "Buscar en el inventario",
		NOSEARCHRESULT: "Tu b\xFAsqueda de %1 no ha tenido ning\xFAn resultado.%2Mostrar todos los items%3",
		DISABLEBESTFORJOB: "Deshabilitar elementos escondidos que son inferiores para una actividad seleccionada.",
		SEARCHHELP: "B\xFAsqueda en el inventario. Puedes usar comodines (* para 0 o mas caracteres, ? para un caracter)",
		DUELSHOOTINGATT: "Duelista de fuego(atacante)",
		DUELSHOOTINGDEF: "Duelista de fuego (defensor)",
		DUELVIGOR: "Duelista contundente",
		FORTATTACK: "Batalla de fuerte (atacante)",
		FORTDEFEND: "Batalla de fuerte (defensor)",
		HIDEJOBS: "Esconder trabajos  y conjuntos",
		CONFIRM: "Confirmar",
		HIDEJOBDESC: "Los trabajos pueden ser escondidos aqu\xED. Marque todos los trabajos que no deben ser calculados de forma autom\xE1tica, y haga clic en Confirmar.",
		SHOWN: "Mostrar",
		HIDDEN: "Esconder",
		SETTINGSSAVED: "\xA1La configuraci\xF3n de TW Pro se ha aplicado!",
		SETTINGSSAVEDSESSION: "\xA1La configuraci\xF3n de TW Pro se ha aplicado! (for this session only)",/*FIXME*/
		PERSISTSETTINGS: "Guardar esta configuraci\xF3n para cada sesi\xF3n.",
		CANNOTWEAR: "Usted no puede usar este sistema, o este conjunto no tiene influencia en los c\xE1lculos de la actividad.",
		SETSETTINGS: "Deshabilitar conjuntos de elementos para acelerar los c\xE1lculos. Los conjuntos con requisitos especiales, no satisfechos est\xE1n desactivados por defecto.",
		CUSTOMNAME: "Introduzca el nombre deseado para una actividad",
		CUSTOMCALCULATION: "Introduzca un c\xE1lculo v\xE1lido TW Pro aqu\xED.",
		CUSTOMENABLED: "Marque esta casilla para habilitar esta actividad",
		NEW: "Nuevo",
		SPEED: "Velocidad",
		REGENERATION: "Puntos de vida m\xE1s r\xE1pido",
		SETSINFO: "Conjuntos especiales",
		WITHSETITEMS: "Bonus con %1 objeto",
		LABORPOINTS: "Puntos de trabajo",
		USEFULITEM: "Este n\xFAmero indica la cantidad de objetos que se utilizan en los c\xE1lculos.",
		PERCREGENERATION: "Regeneraci\xF3n",
		LUCK: "Suerte",
		PRAYING: "Rezar",
		NOEXTENDEDJOBLIST: 'Do not show the current Labourpoints of activities in the Activity list'
	};
	twpro_langs.dk = {
		info: ["Wild Will", "mailto:wildwilldk@gmail.com"],
		WEBSITE: "Website",
		AUTHOR: "Forfatter",
		TRANSLATOR: "Overs\xE6tter",
		TWPRO_DISABLED: "script deaktiveret",
		SORTBYNAME: "Sorter efter <b>navn</b>",
		SORTBYXP: "Sorter efter <b>erfaring</b>",
		SORTBYWAGES: "Sorter efter <b>l\xF8n</b>",
		SORTBYLUCK: "Sorter efter <b>held</b>",
		SORTBYCOMB: "Sorter efter <b>sv\xE6rhedsgrad</b>",
		SORTBYDANGER: "Sorter efter <b>fare</b>",
		SORTBYLABORP: "Sorter efter <b>arbejdspoint</b>",
		FILTERJOBS: "Gem aktiviteter jeg ikke kan udf\xF8re",
		FILTERCLOTHING: "Vis kun det bedste tilg\xE6ngelige t\xF8j for den valgte aktivitet",
		CHOOSEJOB: "V\xE6lg aktivitet...",
		CALCJOB: "Beregner data, vent venligst...",
		INVENTSTATS: "Inventar-statistik",
		SELLVALUE: "Salgsv\xE6rdi",
		OBJECTS: "Genstande",
		PRODUCTS: "Produkter",
		TOTAL: "Total",
		QUANTITIES: "M\xE6ngder",
		NONYIELDS: "Ikke-produkter",
		LABORP: "AP",
		CONSTRUCTION: "Byg",
		HPTOTAL: "Total helbredpoint",
		STARTCALC: "Beregn data...",
		CONVERT: "Konverter",
		MULTISEL: "S\xE6lg flere genstande...",
		SELL: "S\xE6lg valgte",
		CONFIRMSELL: "Er du sikker p\xE5, at du vil s\xE6lge de %1 valgte genstande?",
		SELLING: "S\xE6lg...",
		SALEDONE: "De valgte genstande er blevet solgt.",
		NONESELECTED: "Du skal v\xE6lge mindst \xE9n genstand!",
		JOBRANKSETTINGS: "Pr\xE6ferencer for udregning af sv\xE6rhedsgrad",
		SEARCHINVENTORY: "S\xF8g i inventar",
		NOSEARCHRESULT: "Din s\xF8gning efter %1 returnerede ingen resultater.%2Vis alle genstande%3 ",
		DISABLEBESTFORJOB: "Deaktiver udelukkelsen af genstande, der ikke kvalificerer sig til den valgte aktivitet.",
		SEARCHHELP: "S\xF8g i inventar. Du kan bruge wildcards (* for 0 eller flere tegn, ? for et enkelt tegn)",
		DUELSHOOTINGATT: "Duel med skydev\xE5ben (angreb)",
		DUELSHOOTINGDEF: "Duel med skydev\xE5ben (forsvar)",
		DUELVIGOR: "Duel med slagv\xE5ben",
		FORTATTACK: "Fortkamp (angreb)",
		FORTDEFEND: "Fortkamp (forsvar)",
		HIDEJOBS: "Skjul aktiviteter og genstands-s\xE6t",
		CONFIRM: "Bekr\xE6ft",
		HIDEJOBDESC: "Jobs kan skjules her. Marker alle aktiviteter, der ikke skal beregnes automatisk, og klik Bekr\xE6ft.",
		SHOWN: "Vist",
		HIDDEN: "Skjult",
		SETTINGSSAVED: "Indstillingerne for TW Pro er anvendt!",
		SETTINGSSAVEDSESSION: "Indstillingerne for TW Pro er anvendt! (for this session only)",/*FIXME*/
		PERSISTSETTINGS: "Gem disse indstillinger for hver session.",
		CANNOTWEAR: "Du kan ikke bruge dette s\xE6t, eller dette s\xE6t har ingen indflydelse p\xE5 udregning af aktiviteter.",
		SETSETTINGS: "Frav\xE6lg genstands-s\xE6t for hurtigere udregning. S\xE6t med specielle betingelser, der ikke kan opfyldes, er deaktiveret som standard.",
		CUSTOMNAME: "Indtast det \xF8nskede navn for en aktivitet",
		CUSTOMCALCULATION: "Indtast en gyldig TW Pro kalkulation her.",
		CUSTOMENABLED: "v\xE6lg for at tilf\xF8je denne aktivitet",
		NEW: "Ny",
		SPEED: "Fart",
		REGENERATION: "Hurtigst helbredelse",
		SETSINFO: "Genstands-s\xE6t",
		WITHSETITEMS: "Bonus med %1 genstande",
		LABORPOINTS: "Arbejdspoint",
		USEFULITEM: "Dette tal viser m\xE6ngden af genstande, der bruges i udregningen",
		PERCREGENERATION: "Regeneration",
		LUCK: "held",
		PRAYING: "bede",
		NOEXTENDEDJOBLIST: 'Do not show the current Labourpoints of activities in the Activity list'
	};
	twpro_langs.tr = {
		info: ["Cesur Yurek", ""],
		WEBSITE: "Website",
		AUTHOR: "Yazar",
		TRANSLATOR: "\xC7eviri",
		TWPRO_DISABLED: "script kullan\u0131lmaz",
		SORTBYNAME: "S\u0131ralama <b>\u0130sim</b>",
		SORTBYXP: "S\u0131ralama <b>deneyim</b>",
		SORTBYWAGES: "S\u0131ralama <b>\xDCcret</b>",
		SORTBYLUCK: "S\u0131ralama <b>\u015Eans</b>",
		SORTBYCOMB: "S\u0131ralama <b>\xC7al\u0131\u015Fma R\xFCtbe</b>",
		SORTBYDANGER: "S\u0131ralama <b>Tehlike</b>",
		SORTBYLABORP: "S\u0131ralama <b>\xC7al\u0131\u015Fma puan\u0131</b>",
		FILTERJOBS: "Gizli \xE7al\u0131\u015Fmalar yap\u0131lmad\u0131",
		FILTERCLOTHING: "Sadece se\xE7ilen aktivite i\xE7in kullan\u0131labilir en iyi giysi g\xF6sterme",
		CHOOSEJOB: "\xC7al\u0131\u015Fma se\xE7in...",
		CALCJOB: "Hesaplan\u0131yor L\xFCften bekleyin...",
		INVENTSTATS: "Envanter \u0130statiskleri",
		SELLVALUE: "Sat\u0131\u015F de\u011Feri",
		OBJECTS: "Nesne",
		PRODUCTS: "\xDCretim",
		TOTAL: "Toplam",
		QUANTITIES: "Miktarlar",
		NONYIELDS: "Verimli Olmayan ",
		LABORP: "\xC7P",
		CONSTRUCTION: "\u0130n\u015Faat",
		HPTOTAL: "Toplam Ya\u015Fam Puan\u0131",
		STARTCALC: "Veri Hesaplama...",
		CONVERT: "D\xF6n\xFC\u015Ft\xFCr",
		MULTISEL: "Daha fazla sat\u0131\u015F...",
		SELL: "Se\xE7ili sat\u0131\u015F",
		CONFIRMSELL: "Ger\xE7ekten e\u015Fyan\u0131n  y\u0131\u011F\u0131nlar\u0131n\u0131n %1 \'ini  satmak istiyorum?",
		SELLING: "Sat\u0131\u015F...",
		SALEDONE: "Se\xE7ili e\u015Fyay\u0131 sat.",
		NONESELECTED: "En az bir \xF6\u011Fe se\xE7mek zorunda!",
		JOBRANKSETTINGS: "\xC7al\u0131\u015Fma s\u0131ralama ayarlar\u0131",
		SEARCHINVENTORY: "Envanteri Ara\u015Ft\u0131r",
		NOSEARCHRESULT: "Arama  %1 Arama Sonu\xE7suz %2 B\xFCt\xFCn e\u015Fyalar\u0131 g\xF6ster%3",
		DISABLEBESTFORJOB: "Se\xE7ili \xE7al\u0131\u015Fmadaki Gizli e\u015Fyalar\u0131 sakla.",
		SEARCHHELP: "Envanter aray\u0131n. Joker karakterler kullanabilirsiniz (* s\u0131f\u0131r ya da daha fazla karakter i\xE7in,? bir karakter i\xE7in)",
		DUELSHOOTINGATT: "At\u0131c\u0131 D\xFCello (Sald\u0131ran)",
		DUELSHOOTINGDEF: "At\u0131c\u0131 D\xFCello (Savunan)",
		DUELVIGOR: "Silahs\u0131z D\xFCello",
		FORTATTACK: "Kale Sava\u015F\u0131 (Sald\u0131ran)",
		FORTDEFEND: "Kale Sava\u015F\u0131 (Savunan)",
		HIDEJOBS: "Gizli \xC7al\u0131\u015Fmalar ve e\u015Fya setleri.",
		CONFIRM: "Onay",
		HIDEJOBDESC: "\xC7al\u0131\u015Fmalar burada g\xF6r\xFClmeyebilir. I\u015Faretledi\u011Finiz \xE7al\u0131\u015Fmalar otomatik olarak hesaplan\u0131r istedi\u011Finiz aktiviteleri i\u015Faretleyin ve onaylay\u0131n",
		SHOWN: "G\xF6r\xFCnt\xFCle",
		HIDDEN: "Gizli",
		SETTINGSSAVED: "TWPro i\xE7in ayarlar yap\u0131lm\u0131\u015Ft\u0131r!",
		SETTINGSSAVEDSESSION: "TWPro i\xE7in ayarlar yap\u0131lm\u0131\u015Ft\u0131r! (sadece bu oturum i\xE7in).",
		PERSISTSETTINGS: "Her oturum i\xE7in bu ayarlar\u0131 kaydedin.",
		CANNOTWEAR: "Bu set Faaliyet hesaplar\u0131 \xFCzerinde herhangi bir etkisi bulunmuyor.E\u015Fya seti kullan\u0131lamaz.",
		SETSETTINGS: "E\u015Fya setlerini Devre d\u0131\u015F\u0131 b\u0131rakmak i\xE7in daha h\u0131zl\u0131 hesaplamak . \xD6zel, kar\u015F\u0131lanmam\u0131\u015F ihtiya\xE7lar\u0131 ile ayarlar varsay\u0131lan olarak devre d\u0131\u015F\u0131d\u0131r.",
		CUSTOMNAME: "Bir faaliyet i\xE7in istedi\u011Finiz ismi girin",
		CUSTOMCALCULATION: "Burada ge\xE7erli bir TW Pro hesaplama girin",
		CUSTOMENABLED: "Bu etkinli\u011Fi sa\u011Flamak i\xE7in bu kutuyu i\u015Faretleyin",
		NEW: "Yeni",
		SPEED: "H\u0131z",
		REGENERATION: "H\u0131zl\u0131 ya\u015Fam puan\u0131",
		SETSINFO: "E\u015Fya setleri",
		WITHSETITEMS: "Bonus %1 E\u015Fyalar",
		LABORPOINTS: "\xC7al\u0131\u015Fma Puan\u0131",
		USEFULITEM: "Bu say\u0131 hesaplamalar\u0131nda kullan\u0131lan maddelerin miktar\u0131n\u0131 g\xF6sterir",
		PERCREGENERATION: "Dinlenme",
		LUCK: "\u015Eans",
		PRAYING: "Dua",
		NOEXTENDEDJOBLIST: "Do not show the current Labourpoints of activities in the Activity list"/*FIXME*/
	};
	twpro_langs.no = {
		info: ["ElmurFudd", "mailto:pal.gundersen@gmail.com"],
		WEBSITE: "Webside",
		AUTHOR: "Forfatter",
		TRANSLATOR: "Oversetter",
		TWPRO_DISABLED: "skript satt ut av funksjon",
		SORTBYNAME: "Sortert etter <b>navn</b>",
		SORTBYXP: "Sortert etter <b>erfaring</b>",
		SORTBYWAGES: "Sortert etter <b>inntjening</b>",
		SORTBYLUCK: "Sortert etter <b>hell</b>",
		SORTBYCOMB: "Sorter etter <b>beste jobb</b>",
		SORTBYDANGER: "Sortert etter <b>fare</b>",
		SORTBYLABORP: "Sortert etter <b>erfaring</b>",
		FILTERJOBS: "Gjem aktiviter jeg ikke kan gj\xF8re",
		FILTERCLOTHING: "Vis de beste kl\xE6rne tilgjengelig for valgt aktivitet",
		CHOOSEJOB: "Velg aktivitet...",
		CALCJOB: "Kalkulerer.. vennligst vent...",
		INVENTSTATS: "Inventar statistikk",
		SELLVALUE: "Salgsverdi",
		OBJECTS: "Objekter",
		PRODUCTS: "Produkter",
		TOTAL: "Total",
		QUANTITIES: "Antall",
		NONYIELDS: "Ikke-avkastning",
		LABORP: "LP",
		CONSTRUCTION: "Konstruksjon (bygging)",
		HPTOTAL: "Totalt helse poeng",
		STARTCALC: "Kalkuler...",
		CONVERT: "Konverter",
		MULTISEL: "Selg ting du har flere av...",
		SELL: "Selg valgte artikler",
		CONFIRMSELL: "Vil du virkelig selge %1 av disse artiklene?",
		SELLING: "Selger...",
		SALEDONE: "De valgte artiklene har blitt solgt.",
		NONESELECTED: "Du m\xE5 velge minst en av disse artiklene!",
		JOBRANKSETTINGS: "Setting for jobb rangering",
		SEARCHINVENTORY: "S\xF8k inventar",
		NOSEARCHRESULT: "Ditt s\xF8k for %1 returnerte uten resultat..%2Vis alle artikler%3",
		DISABLEBESTFORJOB: "Hindre skulte artikler som er d\xE5rligere for valgt aktivitet.",
		SEARCHHELP: "S\xF8k inventar. Du kan bruke \'wildcards\' (* for ingen eller flere enn et tegn,, ? for et tegn)",
		DUELSHOOTINGATT: "Avstands (pistol) duellant (angriper)",
		DUELSHOOTINGDEF: "Avstands (pistol) duellant (forsvarer)",
		DUELVIGOR: "N\xE6r (sverd) duellant",
		FORTATTACK: "Krig ved fort (angriper)",
		FORTDEFEND: "Krig ved fort (forsvarer)",
		HIDEJOBS: "Skjl aktiviteter og kles-sett",
		CONFIRM: "Bekreft",
		HIDEJOBDESC: "Jobber kan skjules her. Marker all eaktiviteter som ikke skal kalkuleres automatisk, og trykk p\xE5 Bekreft.",
		SHOWN: "Vist",
		HIDDEN: "Skjult",
		SETTINGSSAVED: "Settingene for TW Pro har blitt lagret!",
		SETTINGSSAVEDSESSION: "Settingene for TW Pro har blitt lagret! (kun for denne sesjonen)",
		PERSISTSETTINGS: "Lagre disse settingene for alle sesjoner.",
		CANNOTWEAR: "Du kan ikke ha p\xE5 deg dette kles-settet. Det har heller ingen inflytelse p\xE5 aktivitetens kalkuleringer.",
		SETSETTINGS: "Fjern kles-sett for \xE5 kalulere raskere.",
		CUSTOMNAME: "Skriv inn \xF8nsket navn for en aktivitet",
		CUSTOMCALCULATION: "Skriv inn gyldige TW Pro kalkuleringsverdier her..",
		CUSTOMENABLED: "Hukk av denne boksen for \xE5 aktivere denne aktiviteten",
		NEW: "Ny",
		SPEED: "Hastighet",
		REGENERATION: "Raskeste helsepoeng",
		SETSINFO: "Kles-sett",
		WITHSETITEMS: "Bonus med %1 artikler",
		LABORPOINTS: "Erfaring",
		USEFULITEM: "Dette nummeret indikerer antall artikler som brukes i kalkuleringer",
		PERCREGENERATION: "Regenerering",
		LUCK: "hell",
		PRAYING: "b\xF8nn",
		NOEXTENDEDJOBLIST: 'Do not show the current Labourpoints of activities in the Activity list'
	};
	twpro_langs.se = {
		info: ["Anders Reutersw\xE4rd", ""],
		WEBSITE: "Webbsida",
		AUTHOR: "Upphovsman",
		TRANSLATOR: "\xD6vers\xE4ttare",
		TWPRO_DISABLED: "TW Pro inaktiverat",
		SORTBYNAME: "Sortera efter <b>namn</b>",
		SORTBYXP: "Sortera efter <b>erfarenhet</b>",
		SORTBYWAGES: "Sortera efter <b>l\xF6n</b>",
		SORTBYLUCK: "Sortera efter <b>tur</b>",
		SORTBYCOMB: "Sortera efter <b>arbetsv\xE4rde</b>",
		SORTBYDANGER: "Sortera efter <b>fara</b>",
		SORTBYLABORP: "Sortera efter <b>arbetspo\xE4ng</b>",
		FILTERJOBS: "D\xF6lj arbeten jag inte kan utf\xF6ra",
		FILTERCLOTHING: "Visa enbart de b\xE4sta kl\xE4derna f\xF6r valt arbete",
		CHOOSEJOB: "V\xE4lj arbete...",
		CALCJOB: "Ber\xE4knar v\xE4rden, var v\xE4nlig v\xE4nta...",
		INVENTSTATS: "Packningsstatistik",
		SELLVALUE: "F\xF6rs\xE4ljningsv\xE4rde",
		OBJECTS: "F\xF6rem\xE5l",
		PRODUCTS: "Produkter",
		TOTAL: "Summa",
		QUANTITIES: "Kvantiteter",
		NONYIELDS: "Utan avkastning",
		LABORP: "AP",
		CONSTRUCTION: "Konstruktion",
		HPTOTAL: "Totala tr\xE4ffpo\xE4ng",
		STARTCALC: "Ber\xE4kna data...",
		CONVERT: "BB-export",
		MULTISEL: "S\xE4lj flera f\xF6rem\xE5l",
		SELL: "S\xE4lj valda",
		CONFIRMSELL: "Vill du verkligen s\xE4lja %1 h\xF6gar med f\xF6rem\xE5l?",
		SELLING: "S\xE4ljer...",
		SALEDONE: "De valda f\xF6rem\xE5len har s\xE5lts.",
		NONESELECTED: "Du m\xE5ste v\xE4lja minst ett f\xF6rem\xE5l!",
		JOBRANKSETTINGS: "Arbetsv\xE4rdesinst\xE4llningar",
		SEARCHINVENTORY: "S\xF6k i packningen",
		NOSEARCHRESULT: "Din s\xF6kning efter %1 gav inga resultat.%2Visa hela packningen%3",
		DISABLEBESTFORJOB: "Inaktivera visning av enbart de b\xE4sta kl\xE4derna f\xF6r ett arbete",
		SEARCHHELP: "S\xF6k i packningen. Du kan anv\xE4nda jokertecken (* f\xF6r ett eller flera tecken, ? f\xF6r ett tecken)",
		DUELSHOOTINGATT: "Duell med skjutvapen (attack)",
		DUELSHOOTINGDEF: "Duell med skjutvapen (f\xF6rsvar)",
		DUELVIGOR: "Duell med n\xE4rstridsvapen",
		FORTATTACK: "Fortstrid (attack)",
		FORTDEFEND: "Fortstrid (f\xF6rsvar)",
		HIDEJOBS: "D\xF6lj aktiviteter och set",
		CONFIRM: "Verkst\xE4ll",
		HIDEJOBDESC: "Arbeten kan d\xF6ljas h\xE4r. Markera alla aktiviteter som inte ska ber\xE4knas automatiskt och klicka p\xE5 Verkst\xE4ll.",
		SHOWN: "Visas",
		HIDDEN: "Dolda",
		SETTINGSSAVED: "Inst\xE4llningarna f\xF6r TW Pro har \xE4ndrats!",
		SETTINGSSAVEDSESSION: "Inst\xE4llningarna f\xF6r TW Pro har \xE4ndrats! (enbart f\xF6r denna visning)",
		PERSISTSETTINGS: "Spara dessa inst\xE4llningar permanent.",
		CANNOTWEAR: "Du kan inte anv\xE4nda detta set, eller setet p\xE5verkar inte aktivitetsber\xE4kningarna.",
		SETSETTINGS: "Inaktivera set f\xF6r snabbare ber\xE4kningar. Set med speciella krav som inte \xE4r uppfyllda inaktiveras automatiskt.",
		CUSTOMNAME: "Ange \xF6nskat namn p\xE5 en aktivitet",
		CUSTOMCALCULATION: "Ange en giltig TW Pro-ber\xE4kning h\xE4r",
		CUSTOMENABLED: "Markera denna ruta f\xF6r att aktivera den h\xE4r aktiviteten",
		NEW: "Ny",
		SPEED: "Hastighet",
		REGENERATION: "H\xE4lsopo\xE4ng snabbast",
		SETSINFO: "F\xF6rem\xE5lsupps\xE4ttningar (set)",
		WITHSETITEMS: "Bonus med %1 f\xF6rem\xE5l",
		LABORPOINTS: "Arbetspo\xE4ng",
		USEFULITEM: "Denna siffra visar det antal f\xF6rem\xE5l som anv\xE4nds vid ber\xE4kning",
		PERCREGENERATION: "regeneration",
		LUCK: "tur",
		PRAYING: "b\xF6n",
		NOEXTENDEDJOBLIST: "Visa inte aktuella arbetspo\xE4ng f\xF6r aktiviteter i aktivitetslistan"
	};
	// end translations
	var twpro_hostlang = location.host.match(/the-?west\.([.a-z]+)$/i);
	if (twpro_hostlang) {
		twpro_hostlang = twpro_hostlang[1].toLowerCase();
	} else {
		twpro_hostlang = "???";
	}
	if (twpro_hostlang == "net") { // English world
		twpro_hostlang = "en";
	} else if (twpro_hostlang == "no.com") { // Norwegian
		twpro_hostlang = "no";
	} else if (twpro_hostlang == "com.br") { // Brasil
		twpro_hostlang = "br";
	} else if (twpro_hostlang == "com.pt") { // Portuguese
		twpro_hostlang = "pt";
	} else if (twpro_hostlang == "org") { // Turkey
		twpro_hostlang = "tr";
	}
	var twpro_langname;
	function twpro_initLanguage(lang) {
		if (lang) {
			if (twpro_langs[lang]) {
				document.cookie = 'twpro_lang=' + lang + '; max-age=5184000';
				if(lang == twpro_langname) {
					return twpro_langs[lang];
				}
			} else {
				lang = '';
			}
		}
		if (!lang) {
			var cookie = document.cookie.match(/twpro_lang=([a-z_]+)/i);
			if (cookie) {
				if(!twpro_langs[lang=cookie[1].toLowerCase()]) {
					lang = '';
				}
			}
		}
		if (!lang) {
			lang = twpro_hostlang;
		}
		if (!twpro_langs[lang]) {
			lang = 'en';
		}
		var twpro_lang = twpro_langs[lang];
		twpro_langname = lang;
		if (typeof TWPro != "undefined") {
			TWPro.lang = twpro_lang;
			TWPro.job_titles.construct = twpro_lang.CONSTRUCTION;
			document.getElementById("twpro_supportLink").innerHTML = '';
			document.getElementById("twpro_supportLink").appendChild(document.createTextNode(twpro_lang.WEBSITE));
			document.getElementById("twpro_supportAuthorText").innerHTML = "";
			document.getElementById("twpro_supportAuthorText").appendChild(document.createTextNode(" " + twpro_lang.AUTHOR + ": "));
			document.getElementById("twpro_supportTranslatorText").innerHTML = "";
			document.getElementById("twpro_supportTranslatorLink").innerHTML = "";
			document.getElementById("twpro_supportTranslatorLink").href = "http://twpro.lekensteyn.nl/";
			if (twpro_lang.info && twpro_lang.info.length) {
				document.getElementById("twpro_supportTranslatorText").appendChild(document.createTextNode(" " + twpro_lang.TRANSLATOR + ": "));
				document.getElementById("twpro_supportTranslatorLink").appendChild(document.createTextNode(twpro_lang.info[0]));
				if (twpro_lang.info[1]) {
					document.getElementById("twpro_supportTranslatorLink").href = twpro_lang.info[1];
				}
			}
			try {
				var jobId, job, job_name, twpro_jobList,
					twpro_jobList = document.getElementById("twpro_jobList");
				for (jobId=0; jobId<TWPro.twpro_jobs.length; jobId++) {
					if (!(job = TWPro.twpro_jobs[jobId])) continue;
					switch (job.shortName){
					case "construct":
						job_name = "CONSTRUCTION";
						break;
					case "duelshootingatt":
						job_name = "DUELSHOOTINGATT";
						break;
					case "duelshootingdef":
						job_name = "DUELSHOOTINGDEF";
						break;
					case "duelvigor":
						job_name = "DUELVIGOR";
						break;
					case "fortatt":
						job_name = "FORTATTACK";
						break;
					case "fortdef":
						job_name = "FORTDEFEND";
						break;
					case "speed":
						job_name = "SPEED";
						break;
					case "regeneration":
						job_name = "REGENERATION";
						break;
					default:
						continue;
					}
					job.name = twpro_lang[job_name];
				}
				if (twpro_jobList) {
					var orig_pos = twpro_jobList.selectedIndex,
						lastLen = twpro_jobList.options.length
					if (lastLen == 1) {
						document.getElementById("twpro_wait").text = twpro_lang.STARTCALC;
					} else {
						document.getElementById("twpro_wait").text = twpro_lang.CHOOSEJOB;
						twpro_jobList.options.length = 1;
						TWPro.twpro_insertListItems();
						twpro_jobList.selectedIndex = orig_pos;
					}
					$('twpro_jobsort_link_name').addMousePopup(new MousePopup(twpro_lang.SORTBYNAME, 100, {opacity:0.95}));
					$('twpro_jobsort_link_erfahrung').addMousePopup(new MousePopup(twpro_lang.SORTBYXP, 100, {opacity:0.95}));
					$('twpro_jobsort_link_money').addMousePopup(new MousePopup(twpro_lang.SORTBYWAGES, 100, {opacity:0.95}));
					$('twpro_jobsort_link_luckItemValue').addMousePopup(new MousePopup(twpro_lang.SORTBYLUCK, 100, {opacity:0.95}));
					$('twpro_jobsort_link_comb').addMousePopup(new MousePopup(twpro_lang.SORTBYCOMB, 100, {opacity:0.95}));
					$('twpro_jobsort_link_gefahr').addMousePopup(new MousePopup(twpro_lang.SORTBYDANGER, 100, {opacity:0.95}));
					$('twpro_jobsort_link_laborp').addMousePopup(new MousePopup(twpro_lang.SORTBYLABORP, 100, {opacity:0.95}));
					$('twpro_clothingfilter').addMousePopup(new MousePopup(twpro_lang.FILTERCLOTHING, 100, {opacity:0.95}));
					$('twpro_search_help').addMousePopup(new MousePopup(twpro_lang.SEARCHHELP, 100, {opacity:0.95}));
					$("twpro_lang_JOBRANKSETTINGS").title = twpro_lang.JOBRANKSETTINGS;
					TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
					$("twpro_lang_SETSINFO").title = twpro_lang.SETSINFO;
				}
				$$(".twpro_lang_SEARCHINVENTORY").each(function(searchInventory){
					searchInventory.innerHTML = twpro_lang.SEARCHINVENTORY;
				});
				$$(".twpro_lang_CONVERT").each(function(convertButton){
					convertButton.innerHTML = twpro_lang.CONVERT;
				});
			} catch (e) {
				// you'll never know what others are doing with this stuff
			}
		}
		return twpro_lang;
	}
	var twpro_lang = twpro_initLanguage();
	var specialMessages = {
		'[del]construct': function(twpro_job){
			return "";
			//Zou de ingebrachte constructiepunten voor een bepaalde level moeten weergeven
		},
		'[del]speed': function(){
			return "";
		},
		'regeneration': function(twpro_job){
			return Character.skill_titles.health+": " + twpro_job.maxlifes + " @ " + Math.round(TWPro.twpro_sleeperBonus(twpro_job.sleepCount)*10000)/100 + "%";
			/*
			Regen_speed:
			Job:  .02
			Idle: .05
			
			Fort: 1-80%, 2-85%, 3-90%, 4-95%, 5-100%, 6-100% - 6 uur
			Hotel: 1-64%, 2-72%, 3-80%, 4-88%, 5-100% - 8 uur
			
			LP = level + LP_level * (soldier?15:10) + 90
			var regens = {
				fort: [000, .80, .85, .90, .95, 1.0, 1.0],
				hotl: [000, .64, .72, .80, .88, 1.0]
			}
			FortSpeed: 1/6 * regens.fort[stars] * (1+REGENMOD_SLEEPERSET) * LP = CONSTANT * (1+%REGEN) * LP
			HotelSped: 1/8 * regens.hotl[stars] * (1+REGENMOD_SLEEPERSET) * LP = CONSTANT * (1+%REGEN) * LP
			---> = CONSTANT * (1+REGENMOD_SLEEPERSET) * LP
			
			Sleeper:
			#	REGEN	diff
			6	.25	---
			5	.18	.07
			4	.12	.06
			3	.08	.04
			2	.06	.02
			1/0	.00	.06
			
			Calculaton procedure:
			START:
				VARS cache, equip, lifes, dlife, newlifes
				VAR regen []
				EQUIP all sleeper items > equip[]
				soldier ? 1.5 : 1 > dlife
				90 + level *10 + lifepoints_skill * dlife > lifes
				ORDER equipment_slots BY lifepoints_bonus (highest at top) > cache
				LOOP THROUGH cache
					# sleeper_count = sleeper count
					# sleeper_count_minus_one = new sleeper count
					TEST_EQUIP clothing
						lifes + xtra_life_bonus * dlife > newlifes
						IF lifes * (1+regen[sleeper_count]) < newlifes * (1+regen[sleeper_count_minus_one])
							clothing > equip[]
							lifes = newlifes
							CONTINUE
						ELSE
							BREAK
						/
					/
				/
				# equip[] = best Life regeneration
			
			
			1 item: d(%REGEN)/dt * LP > (1+%REGEN) * d(LP)/dt
			n items: 
			*/
		}
	};
	{ // BBcodes
		function insertBBcode(startTag, endTag, elementid) {
			var input = document.getElementById(elementid);
			input.focus();
			/* für Internet Explorer */
			if (typeof document.selection != 'undefined') {
				/* Einfügen */
				var range = document.selection.createRange();
				var insText = range.text;
				range.text = startTag + insText + endTag;
	
				/* Cursorposition anpassen */
				range = document.selection.createRange();
				if (insText.length == 0) {
					range.move('character', -endTag.length);
				} else {
					range.moveStart('character', startTag.length + insText.length + endTag.length);
				}
				range.select();
			}
			/* für neuere auf Gecko basierende Browser */
			else if (typeof input.selectionStart != 'undefined') {
				/* BB code bugfix: scrolling by Lekensteyn <lekensteyn@gmail.com> */
				input.focus();
				var start = input.selectionStart;
				var end = input.selectionEnd;
				var sts = input.scrollTop;
				var ste = input.scrollHeight;
				var insText = input.value.substring(start, end);
				input.value = input.value.substr(0, start) + startTag + insText + endTag + input.value.substr(end);
				var pos;
				if(insText.length == 0){
					pos = start + startTag.length;
				}
				else{
					pos = start + startTag.length + insText.length + endTag.length;
				}
				input.selectionStart = pos;
				input.selectionEnd = pos;
				input.scrollTop = sts + input.scrollHeight - ste;
			}
		}
		function insertbbcodesfunc(messagebox, extended) {
			if(window.TWPro && !window.TWPro.enablebbcodes) return;
			var bbcodeplace = messagebox.parentNode;
			var elementidmessagebox;
			if(!(elementidmessagebox=messagebox.id)) elementidmessagebox = messagebox.id = 'twpro_bbbar'+Math.random();
			var bbs = ['b', 'i', 'u', 'del', 'player', 'town', 'fort', 'quote=Author', 'url'];
			if(extended) bbs.push('img', 'color=red', 'size=10');
			var bbtemplate = ' <img src="images/transparent.png" onclick="insertBBcode(\'[%1]\', \'[/%2]\', \''+elementidmessagebox+'\');" alt="%1" style="background-image:url(../images/bbcodes.png);background-position: -%3px;height:20px;width:20px;margin:6px 1px;" />';
			var bbhtml = '';
			for(var i=0; i<bbs.length; i++){
				bbhtml += bbtemplate.replace(/%1/g, bbs[i]).replace(/%2/g, bbs[i].replace(/=.*/, '')).replace(/%3/g, i*20);
			}
			var bbbar = document.createElement('div');
			bbbar.innerHTML = bbhtml;
			bbcodeplace.insertBefore(bbbar, messagebox)
	
		}
	}
	
	{ // Duelconverter by Lekensteyn
		function convertduelreport(winname, data){
			if(data && data.indexOf("Reports.switchDuel") > 0){
				data = data.replace(/"Reports\.view_delete_report.+?\n\s+<\/th>/, '$&<th><a onclick="convertduelreportfunc(\''+winname+'\');" href="javascript:void(0);" class="button_wrap button"><span class="button_left"></span><span class="button_middle twpro_lang_CONVERT">'+TWPro.lang.CONVERT+'</span><span class="button_right"></span><span style="clear:both"></span></a></th>');
			}
			return data;
		}
		function convertduelreportfunc(dc) {
			var dce = document.getElementById(dc);
			if(document.getElementById(dc+'_cnv')) return;
			if (dce.innerHTML.indexOf('images/report/attacker.png') != -1) {
				var duel = duellers = avatars = place = '';
				var tbl = dce.getElementsByTagName('table');
				var k = 0;
				var si = tbl[2].rows[0].cells;
				var s1 = si[0].getElementsByTagName('strong');
				var s2 = si[5].getElementsByTagName('strong');
				var ex = '[player]'+s1[0].firstChild.innerHTML+'[/player]';
				if(s1.length > 1) ex += ' ('+s1[1].innerHTML+')';
				ex += " \u2015 ";
				if(s2[0].getElementsByTagName('a').length){
					ex += '[player]'+s2[0].getElementsByTagName('a')[0].innerHTML.replace(/^\s+|\s+$/g, '')+'[/player]';
				}
				else{
					ex += '[b]'+s2[0].innerHTML.replace(/^\s+|\s+$/g, '')+'[/b]';
				}
				if(s2.length > 1) ex += ' ('+s2[1].innerHTML+')';
				ex += "\n";
				ex += '[img]'+si[1].getElementsByTagName('img')[0].src+'[/img]';
				ex += '[img]'+si[2].getElementsByTagName('img')[0].src+'[/img]';
				ex += '[img]/images/jobs/duell.png[/img]';
				ex += '[img]'+si[3].getElementsByTagName('img')[0].src+'[/img]';
				ex += '[img]'+si[4].getElementsByTagName('img')[0].src+'[/img]';
				ex += '\n__________________________________________________\n';
				var dh = tbl[3].rows;
				var bpa = {
					'0px 0px': 'http://img43.imageshack.us/img43/3745/nohitatt.png',
					'0px -78px': 'http://img196.imageshack.us/img196/6343/haedatt.png',
					'0px -156px': 'http://img269.imageshack.us/img269/382/rightscatt.png',
					'0px -234px': 'http://img195.imageshack.us/img195/8398/leftscatt.png',
					'0px -312px': 'http://img39.imageshack.us/img39/1285/righthaatt.png',
					'0px -390px': 'http://img35.imageshack.us/img35/3261/lefthaatt.png',
					'0px -468px': 'http://img32.imageshack.us/img32/1503/winatt.png',
					'0px -546px': 'http://img193.imageshack.us/img193/1825/loseatt.png',
					'0px -624px': 'http://img9.imageshack.us/img9/5177/leftdie.png'
				};
				var bpd = {
					'0px 0px': 'http://img196.imageshack.us/img196/5995/nohitdeff.png',
					'0px -78px': 'http://img39.imageshack.us/img39/6522/haeddeff.png',
					'0px -156px': 'http://img195.imageshack.us/img195/8905/rightscdeff.png',
					'0px -234px': 'http://img32.imageshack.us/img32/9089/leftscdeff.png',
					'0px -312px': 'http://img35.imageshack.us/img35/3111/righthadeff.png',
					'0px -390px': 'http://img269.imageshack.us/img269/7476/lefthadeff.png',
					'0px -468px': 'http://img193.imageshack.us/img193/7641/windeff.png',
					'0px -546px': 'http://img194.imageshack.us/img194/8311/losedeff.png',
					'0px -624px': 'http://img30.imageshack.us/img30/8627/rightdie.png'
				};
				for(var i=0; i<dh.length; i++){
					if(i == dh.length-1){
						ex += '[b]_______________'+TWPro.lang.HPTOTAL+':_______________[/b]\n';
					}
					var d1 = dh[i].cells[0].getElementsByTagName('span');
					if(d1.length > 1){
						d1 = d1[1].innerHTML;
						if(d1.length < 9){
							d1 = '[color=#D3C6AF]'+(new Array(10-d1.length)).join('0')+'[/color][color=red]'+d1;
						}
						else{
							d1 = '[color=red]'+d1;
						}
						ex += '[b][size=17]'+d1+' [/color][/size][/b]';
					}
					else{
						ex += '[size=17][color=#D3C6AF]0000000[/color]0 [/size]';
					}
					var dud = dh[i].cells[1].getElementsByTagName('div');
					ex += '[img]'+bpa[dud[1].style.backgroundPosition]+'[/img][img]'+bpd[dud[2].style.backgroundPosition]+'[/img]';
					var d2 = dh[i].cells[2].getElementsByTagName('span');
					if(d2.length > 1){
						ex += '[b][size=17][color=blue]'+d2[1].innerHTML+'[/color][/size][/b]';
					}
					else{
						ex += '[size=17][color=#D3C6AF]0000[/color]0 [/size]';
					}
					ex += '\n';
				}
				ex += '[b][size=16]'+dce.getElementsByTagName('h4')[0].innerHTML+'[/size][/b]';
				var dd = document.createElement('div');
				dd.style.cssText = 'overflow: auto; position: relative; height: 340px; padding: 5px;';
				dd.id = dc+'_cnv';
				dd.innerHTML = '<img src="/img.php?type=button&subtype=normal&value=back" alt="Back" style="float:right;cursor:pointer" onclick="this.parentNode.previousSibling.style.display=\'\';this.parentNode.parentNode.removeChild(this.parentNode);">BB Code: <br><textarea rows="10" cols="40"  style="width:85%;height:80%;background-image: url(images/muster.jpg);margin-left:auto;margin-right:auto;" onfocus="this.select();" readonly="readonly">' + ex + "</textarea>";
				var bf = tbl[2].parentNode.nextSibling;
				bf.previousSibling.style.display = 'none';
				bf.parentNode.insertBefore(dd, bf);
			}
	
		}
	}
	{ // debugging aid
		window.twpro_debug = {};
		window.twpro_debug.disabled = false;
		window.twpro_debug.form = null;
		window.twpro_debug.hint = null;
		window.twpro_debug.history = [];
		window.twpro_debug.json_stringify = function (obj) {
			/* native JSON? */
			if (typeof JSON != "undefined" && typeof JSON.stringify == "function") {
				return JSON.stringify(obj);
			}
			/**
			 * Inspired by:
			 * http://mxr.mozilla.org/seamonkey/source/js/src/xpconnect/loader/JSON.jsm?raw=1
			 * https://github.com/douglascrockford/JSON-js/raw/master/json2.js
			 */
			var parts = [];
			(function (subj) {
				var type = typeof subj;
				if (type == "string") {
					parts.push(subj.replace(/[\\"\x00-\x1F\u0080-\uFFFF]/g, function (c) {
						switch (c) {
							case "\b":
								return "\\b";
							case "\t":
								return "\\t";
							case "\n":
								return "\\n";
							case "\f":
								return "\\f";
							case "\r":
								return "\\r";
							case '"':
								return '\\"';
							case "\\":
								return "\\\\"
						}
						return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
					}));
				} else if (type == "boolean") {
					parts.push(subj ? "true" : "false");
				} else if (type == "number" && isFinite(subj)) {
					parts.push(subj.toString());
				} else if (subj instanceof Array) {
					parts.push("[");
					for (var i=0; i<subj.length; i++) {
						if (arguments.callee(subj[i]) !== void 0) {
							parts.push(",");
						}
					}
					if (subj.length) parts.pop();
					parts.push("]");
				} else if (type == "object") {
					if (!type) {
						parts.push("null");
					} else {
						parts.push("{");
						for (var i in subj) {
							arguments.callee(i.toString());
							parts.push(":");
							if (arguments.callee(subj[i]) === void 0) {
								parts.pop();
								parts.pop();
							} else {
								parts.push(",");
							}
						}
						if (parts[parts.length - 1] == ",") parts.pop();
						parts.push("}");
					}
				}
				/* undefined may be overwritten, so use a real undefined */
				return void 0;
			})(obj);
			return parts.join("");
		};
		window.twpro_debug.log = function (msg, source) {
			if (window.twpro_debug.disabled) return;
			if (typeof msg != "string") {
				try {
					msg = window.twpro_debug.json_stringify(msg);
				} catch (e) {
					try {
						msg = "Error while serializing: " + msg;
					} catch (ex) {
						msg = "Error while serializing.";
					}
				}
			}
			msg = (new Date).getTime() + ":" + (source || "") + ":" + msg;
			window.twpro_debug.history.push(msg);
			if (console && console.log) {
				console.log(msg);
			}
			// todo: create form and wait until my exams are done :)
			if (typeof Character == "undefined" || !Character.name || Character.name.toLowerCase() != "lekensteyn") return;
			if (!window.twpro_debug.hint) {
				var hint = document.createElement("button");
				hint.style.cssText = "padding: 5px 10px; font-weight: bold; position: fixed; right: 2px; bottom: 2px; z-index: 100004";
				hint.onclick = window.twpro_debug.show;
				document.body.appendChild(hint);
				window.twpro_debug.hint = hint;
			}
			window.twpro_debug.hint.innerHTML = window.twpro_debug.history.length + " debug messages from TW Pro - click to report";
		};
		window.twpro_debug.show = function () {
			if (window.twpro_debug.form) return;
			window.twpro_debug.disabled = true;
			try {
				var form = window.twpro_debug.form = document.createElement("form"),
					log;
				try {
					log = window.twpro_debug.json_stringify(window.twpro_debug.history);
				} catch (e) {
					try {
						log = "Serialization error (2): " + window.twpro_debug.json_stringify(e);
					} catch (ex) {
						try {
							log = "Serialization error (3): " + e;
						} catch (exc) {
							log = "Serialization error (4).";
						}
					}
				}
				form.style.cssText = "background: white; width: 800px; height: 500px; padding: 6px; z-index: 100005; position: absolute; top: 5px; left; 30px;";
				form.method = "post";
				form.target = "twpro_debug_submit";
				form.onsubmit = function () {
					window.twpro_debug.history = [];
					setTimeout(function () {
						form.parentNode.removeChild(form);
						var hint = window.twpro_debug.hint;
						hint.parentNode.removeChild(hint);
						window.twpro_debug.form = null;
						window.twpro_debug.hint = null;
					}, 10);
				};
				//form.action = "http://twpro.lekensteyn/bug-submit.php";
				var add = function (title, element, attributes) {
					form.appendChild(document.createElement("br"));
					form.appendChild(document.createTextNode(title + ": "));
					element = document.createElement(element);
					for (var att in attributes) {
						element.setAttribute(att, attributes[att]);
					}
					return form.appendChild(element);
				};
				
				form.appendChild(document.createElement("h2")).innerHTML = "Submit TW Pro debug information";
				form.appendChild(document.createTextNode("You are about to submit a debug log. This information will only be used for improving TW Pro. Your contact details will be kept private and is only available to the TW Pro maintainer Lekensteyn (lekensteyn@gmail.com)."));
				add("Browser", "input", {size:50}).value = navigator.userAgent;
				add("Server", "input", {size:50}).value = location.host;
				add("Contact information (emailaddress)", "input", {size:50}).value = Character.name + " (your@email.com)";
				add("Debug log", "textarea", {rows:20,cols:80,spellcheck:"off"}).value = log;
				add("Please check your contact information and press Submit", "input", {type:"submit"}).value = "Submit debugging information";
				add("If you wish to cancel this report, press the next button", "input", {type:"button",value:"Cancel submission"}).onclick = function () {
					form.parentNode.removeChild(form);
					window.twpro_debug.form = null;
				};
				document.body.appendChild(form);
			} catch (e) {
				alert("Oops, the TW Pro crash reporter crashed... :(\n" + (e.message||e.description||e));
			}
			window.twpro_debug.disabled = false;
		};
	}
	/**
	 * Modifies a function by replacing parts of it
	 *
	 * @param obj The object with the method
	 * @param {String} method The method subject to modification
	 * @param [options] An optional object with options for the function modification
	 * @param [options.bind] Specifies the object on which the function should be bound to (optional)
	 * @param {...} An array with search terms, replacements and its options; index 0: the search term within the function; 1: the replacement text; 2: optional options (catch_errors: catches errors and log it, escape: escape dollars in the replacement text, pos: "L" for placing the replacement before the search term, "R" for placing it after)
	 */
	var modify_function = function (obj, method, options) {
		try {
			//if (console && console.log) console.log("TW Pro: Modifying method " + method);
			if (!obj || !obj[method]) return;
			var func = obj[method].toString();
			for (var i=3; i<arguments.length; i++) {
				if (arguments[i] && arguments[i].length > 1) {
					var replacement = arguments[i][1],
						arg_opts = arguments[i][2] || {};
					if (typeof replacement == "function") {
						replacement = "(" + replacement.toString() + ")()";
					}
					if (arg_opts.catch_errors) {
						replacement = ";try{" + replacement + "}catch(twpro_exception){window.twpro_debug.log(twpro_exception,'method " + method + "')}";
					}
					if (arg_opts.escape) {
						replacement = replacement.replace(/\$/g, "$$$$");
					}
					switch (arg_opts.pos) {
						case "L":
							replacement += "$&";
							break;
						case "R":
							replacement = "$&" + replacement;
							break;
					}
					func = func.replace(arguments[i][0], replacement);
				}
			}
			//self.fncs.push('"'+method+'"', func);
			obj[method] = eval("(" + func + ")");
			if (options && options.bind) {
				obj[method] = obj[method].bind(options.bind);
			}
		} catch (e) {
			twpro_debug.log("TW Pro failed to modify function " + method + ": " + e);
		}
	};

	if (typeof TheWestApi != 'undefined') {
		/*
	Diese Script wird von http://www.tw-pro.de/ bereitgestellt.
	Es gelten die im Impressum http://www.tw-pro.de/?site=impressum hinterlegten rechtlichen Hinweise.
	Insbesondere bedarf eine Veraenderung, Weitergabe oder eine eigene Veroeffentlichung dieses Scripts
	oder Teilen davon einer schriftlichen Genehmigung des Autors. Das Copyright liegt beim Autor.
	*/
	
		// manipuliert interne Funktionen und fuegt eigene Aufrufe ein
		function twpro_injectScript() {
			var style = document.createElement('style'),
				css = '.twpro_search_hide{display:none;}.twpro_setinfo_entry{margin:5px;border:1px solid #32201A;padding:2px;}.twpro_setinfo_name_clicker{cursor:pointer;color:#523E30;}.twpro_setinfo_set{background:url(../images/messages/post-bgr.jpg) repeat scroll 0 0 transparent;margin-left:10px;}.twpro_setinfo_xitems{margin-left:-5px;padding:0;}';
			style.setAttribute('type', 'text/css');
			if(style.styleSheet){ // IE
				style.styleSheet.cssText = css;
			}
			else{
				style.appendChild(document.createTextNode(css));
			}
			document.getElementsByTagName('head')[0].appendChild(style);
			
			TWPro.debug_log = function(msg, source) {
				window.twpro_debug.log(msg, source);
			};
			TWPro.debug = {
				unknown_jobs: {},
				unknown_jobs_count: 0
			};
			
			TWPro.locationSharp = location.href.replace(/^([^#]+)#?/, '$1')+"#";
			TWPro.hrefSharpToJSVoid = window.setInterval(function(){for(var a=document.getElementsByTagName("a"),i=a.length-1;i>=0;i--)if(a[i].href==TWPro.locationSharp) a[i].href="javascript:void(0);";}, 200);
			modify_function(WMap, "recalcMarker", 0, [/(["'])#\1/g, '$1javascript:void(0);$1']);
			
			TWPro.enablebbcodes = true;
			TWPro.twpro_calculated = false;
			TWPro.twpro_failure = false;
			TWPro.twpro_active = true;
			TWPro.twpro_bestAnimal = 0;
			TWPro.damage_min = {left_arm:0, right_arm_shot:0, right_arm_hand: 0};
			TWPro.damage_max = {left_arm:0, right_arm_shot:0, right_arm_hand: 0};
			TWPro.twpro_sorts = ['name', 'erfahrung', 'money', 'luckItemValue', 'comb', 'gefahr', 'laborp'];
			function getPCookie(n){var c='; '+document.cookie+';',s='; twpro_'+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return'';b=b+s.length;e=c.indexOf(';',b);return decodeURIComponent(c.substring(b,e))}
			TWPro.prefs = {
				'Hide_unjobs': 1,
				'dispJobClothingOnly': 2,
				'multipliers': getPCookie('multipliers'),
				'reportaccess': getPCookie('reportaccess'),
				'hidejobs': getPCookie('hidejobs'),
				'disabledSets': getPCookie('disabledSets'),
				'customJobs': getPCookie('customJobs'),
				'no_extended': 4
			};
			TWPro.prefNumber = parseInt(getPCookie('prefs'), 10) || 0;
			TWPro.multipliers = {xp:1, wages:1, luck:1, danger:1};
			var multiplier,
				savedMultipliers = TWPro.twpro_preference('multipliers').split(':'),
				j=0,
				disabled = TWPro.twpro_preference('hidejobs').split('|');
			for(var i in TWPro.multipliers){
				multiplier = parseInt(savedMultipliers[j++], 10);
				if(!isNaN(multiplier)){
					TWPro.multipliers[i] = multiplier;
				}
			}
			try {
				TWPro.item_type_title = eval("(" + ItemPopup.prototype.getXHTML.toString().match(/var item_type_title\s*=\s*(\{[^}]+\})/)[1] + ")"),
				TWPro.item_sub_title = eval("(" + ItemPopup.prototype.getXHTML.toString().match(/var item_sub_title\s*=\s*(\{[^}]+\})/)[1] + ")");
			} catch (e) {
				TWPro.item_type_title = {};
				TWPro.item_sub_title = {};
			}
			TWPro.job_titles = {};
			for (var i in JobList) {
				TWPro.job_titles[JobList[i].shortName] = JobList[i].name;
			}
			//TWPro.job_titles.construct = TWPro.lang.CONSTRUCTION;
			TWPro.disabledJobs = {};
			for(var i=0;i<disabled.length; i++){
				TWPro.disabledJobs[disabled[i]] = true;
			}
			TWPro.searchInventory = {timer:null};
			TWPro.searchTrader = {};
			TWPro.twpro_jobs = [];
			// Jobs
			{
				TWPro.twpro_jobValues = {};
				TWPro.twpro_jobValues.swine = {};
				TWPro.twpro_jobValues.swine.erfahrung = 1;
				TWPro.twpro_jobValues.swine.lohn = 3;
				TWPro.twpro_jobValues.swine.glueck = 0;
				TWPro.twpro_jobValues.swine.gefahr = 1;
				TWPro.twpro_jobValues.scarecrow = {};
				TWPro.twpro_jobValues.scarecrow.erfahrung = 3;
				TWPro.twpro_jobValues.scarecrow.lohn = 1;
				TWPro.twpro_jobValues.scarecrow.glueck = 2;
				TWPro.twpro_jobValues.scarecrow.gefahr = 20;
				TWPro.twpro_jobValues.wanted = {};
				TWPro.twpro_jobValues.wanted.erfahrung = 3;
				TWPro.twpro_jobValues.wanted.lohn = 2;
				TWPro.twpro_jobValues.wanted.glueck = 0;
				TWPro.twpro_jobValues.wanted.gefahr = 10;
				TWPro.twpro_jobValues.tabacco = {};
				TWPro.twpro_jobValues.tabacco.erfahrung = 1;
				TWPro.twpro_jobValues.tabacco.lohn = 6;
				TWPro.twpro_jobValues.tabacco.glueck = 2;
				TWPro.twpro_jobValues.tabacco.gefahr = 2;
				TWPro.twpro_jobValues.cotton = {};
				TWPro.twpro_jobValues.cotton.erfahrung = 4;
				TWPro.twpro_jobValues.cotton.lohn = 1;
				TWPro.twpro_jobValues.cotton.glueck = 0;
				TWPro.twpro_jobValues.cotton.gefahr = 3;
				TWPro.twpro_jobValues.sugar = {};
				TWPro.twpro_jobValues.sugar.erfahrung = 2;
				TWPro.twpro_jobValues.sugar.lohn = 5;
				TWPro.twpro_jobValues.sugar.glueck = 4;
				TWPro.twpro_jobValues.sugar.gefahr = 1;
				TWPro.twpro_jobValues.angle = {};
				TWPro.twpro_jobValues.angle.erfahrung = 0;
				TWPro.twpro_jobValues.angle.lohn = 1;
				TWPro.twpro_jobValues.angle.glueck = 6;
				TWPro.twpro_jobValues.angle.gefahr = 2;
				TWPro.twpro_jobValues.cereal = {};
				TWPro.twpro_jobValues.cereal.erfahrung = 6;
				TWPro.twpro_jobValues.cereal.lohn = 2;
				TWPro.twpro_jobValues.cereal.glueck = 2;
				TWPro.twpro_jobValues.cereal.gefahr = 4;
				TWPro.twpro_jobValues.berry = {};
				TWPro.twpro_jobValues.berry.erfahrung = 6;
				TWPro.twpro_jobValues.berry.lohn = 2;
				TWPro.twpro_jobValues.berry.glueck = 5;
				TWPro.twpro_jobValues.berry.gefahr = 6;
				TWPro.twpro_jobValues.sheeps = {};
				TWPro.twpro_jobValues.sheeps.erfahrung = 5;
				TWPro.twpro_jobValues.sheeps.lohn = 3;
				TWPro.twpro_jobValues.sheeps.glueck = 0;
				TWPro.twpro_jobValues.sheeps.gefahr = 2;
				TWPro.twpro_jobValues.newspaper = {};
				TWPro.twpro_jobValues.newspaper.erfahrung = 1;
				TWPro.twpro_jobValues.newspaper.lohn = 6;
				TWPro.twpro_jobValues.newspaper.glueck = 2;
				TWPro.twpro_jobValues.newspaper.gefahr = 1;
				TWPro.twpro_jobValues.cut = {};
				TWPro.twpro_jobValues.cut.erfahrung = 7;
				TWPro.twpro_jobValues.cut.lohn = 5;
				TWPro.twpro_jobValues.cut.glueck = 3;
				TWPro.twpro_jobValues.cut.gefahr = 3;
				TWPro.twpro_jobValues.grinding = {};
				TWPro.twpro_jobValues.grinding.erfahrung = 7;
				TWPro.twpro_jobValues.grinding.lohn = 11;
				TWPro.twpro_jobValues.grinding.glueck = 0;
				TWPro.twpro_jobValues.grinding.gefahr = 5;
				TWPro.twpro_jobValues.corn = {};
				TWPro.twpro_jobValues.corn.erfahrung = 7;
				TWPro.twpro_jobValues.corn.lohn = 4;
				TWPro.twpro_jobValues.corn.glueck = 8;
				TWPro.twpro_jobValues.corn.gefahr = 5;
				TWPro.twpro_jobValues.beans = {};
				TWPro.twpro_jobValues.beans.erfahrung = 7;
				TWPro.twpro_jobValues.beans.lohn = 9;
				TWPro.twpro_jobValues.beans.glueck = 4;
				TWPro.twpro_jobValues.beans.gefahr = 5;
				TWPro.twpro_jobValues.fort_guard = {};
				TWPro.twpro_jobValues.fort_guard.erfahrung = 9;
				TWPro.twpro_jobValues.fort_guard.lohn = 3;
				TWPro.twpro_jobValues.fort_guard.glueck = 2;
				TWPro.twpro_jobValues.fort_guard.gefahr = 7;
				TWPro.twpro_jobValues.tanning = {};
				TWPro.twpro_jobValues.tanning.erfahrung = 15;
				TWPro.twpro_jobValues.tanning.lohn = 12;
				TWPro.twpro_jobValues.tanning.glueck = 5;
				TWPro.twpro_jobValues.tanning.gefahr = 18;
				TWPro.twpro_jobValues.digging = {};
				TWPro.twpro_jobValues.digging.erfahrung = 3;
				TWPro.twpro_jobValues.digging.lohn = 11;
				TWPro.twpro_jobValues.digging.glueck = 5;
				TWPro.twpro_jobValues.digging.gefahr = 7;
				TWPro.twpro_jobValues.grave = {};
				TWPro.twpro_jobValues.grave.erfahrung = 12;
				TWPro.twpro_jobValues.grave.lohn = 16;
				TWPro.twpro_jobValues.grave.glueck = 22;
				TWPro.twpro_jobValues.grave.gefahr = 9;
				TWPro.twpro_jobValues.turkey = {};
				TWPro.twpro_jobValues.turkey.erfahrung = 14;
				TWPro.twpro_jobValues.turkey.lohn = 3;
				TWPro.twpro_jobValues.turkey.glueck = 7;
				TWPro.twpro_jobValues.turkey.gefahr = 21;
				TWPro.twpro_jobValues.rail = {};
				TWPro.twpro_jobValues.rail.erfahrung = 18;
				TWPro.twpro_jobValues.rail.lohn = 10;
				TWPro.twpro_jobValues.rail.glueck = 5;
				TWPro.twpro_jobValues.rail.gefahr = 10;
				TWPro.twpro_jobValues.cow = {};
				TWPro.twpro_jobValues.cow.erfahrung = 17;
				TWPro.twpro_jobValues.cow.lohn = 5;
				TWPro.twpro_jobValues.cow.glueck = 0;
				TWPro.twpro_jobValues.cow.gefahr = 11;
				TWPro.twpro_jobValues.fence = {};
				TWPro.twpro_jobValues.fence.erfahrung = 11;
				TWPro.twpro_jobValues.fence.lohn = 7;
				TWPro.twpro_jobValues.fence.glueck = 5;
				TWPro.twpro_jobValues.fence.gefahr = 6;
				TWPro.twpro_jobValues.saw = {};
				TWPro.twpro_jobValues.saw.erfahrung = 12;
				TWPro.twpro_jobValues.saw.lohn = 23;
				TWPro.twpro_jobValues.saw.glueck = 6;
				TWPro.twpro_jobValues.saw.gefahr = 32;
				TWPro.twpro_jobValues.stone = {};
				TWPro.twpro_jobValues.stone.erfahrung = 8;
				TWPro.twpro_jobValues.stone.lohn = 17;
				TWPro.twpro_jobValues.stone.glueck = 9;
				TWPro.twpro_jobValues.stone.gefahr = 33;
				TWPro.twpro_jobValues.straighten = {};
				TWPro.twpro_jobValues.straighten.erfahrung = 22;
				TWPro.twpro_jobValues.straighten.lohn = 8;
				TWPro.twpro_jobValues.straighten.glueck = 15;
				TWPro.twpro_jobValues.straighten.gefahr = 12;
				TWPro.twpro_jobValues.wood = {};
				TWPro.twpro_jobValues.wood.erfahrung = 5;
				TWPro.twpro_jobValues.wood.lohn = 18;
				TWPro.twpro_jobValues.wood.glueck = 2;
				TWPro.twpro_jobValues.wood.gefahr = 21;
				TWPro.twpro_jobValues.irrigation = {};
				TWPro.twpro_jobValues.irrigation.erfahrung = 13;
				TWPro.twpro_jobValues.irrigation.lohn = 7;
				TWPro.twpro_jobValues.irrigation.glueck = 15;
				TWPro.twpro_jobValues.irrigation.gefahr = 6;
				TWPro.twpro_jobValues.brand = {};
				TWPro.twpro_jobValues.brand.erfahrung = 25;
				TWPro.twpro_jobValues.brand.lohn = 8;
				TWPro.twpro_jobValues.brand.glueck = 0;
				TWPro.twpro_jobValues.brand.gefahr = 35;
				TWPro.twpro_jobValues.wire = {};
				TWPro.twpro_jobValues.wire.erfahrung = 13;
				TWPro.twpro_jobValues.wire.lohn = 17;
				TWPro.twpro_jobValues.wire.glueck = 6;
				TWPro.twpro_jobValues.wire.gefahr = 0;
				TWPro.twpro_jobValues.dam = {};
				TWPro.twpro_jobValues.dam.erfahrung = 18;
				TWPro.twpro_jobValues.dam.lohn = 4;
				TWPro.twpro_jobValues.dam.glueck = 9;
				TWPro.twpro_jobValues.dam.gefahr = 41;
				TWPro.twpro_jobValues.gems = {};
				TWPro.twpro_jobValues.gems.erfahrung = 7;
				TWPro.twpro_jobValues.gems.lohn = 25;
				TWPro.twpro_jobValues.gems.glueck = 8;
				TWPro.twpro_jobValues.gems.gefahr = 4;
				TWPro.twpro_jobValues.claim = {};
				TWPro.twpro_jobValues.claim.erfahrung = 4;
				TWPro.twpro_jobValues.claim.lohn = 31;
				TWPro.twpro_jobValues.claim.glueck = 4;
				TWPro.twpro_jobValues.claim.gefahr = 29;
				TWPro.twpro_jobValues.chuck_wagon = {};
				TWPro.twpro_jobValues.chuck_wagon.erfahrung = 23;
				TWPro.twpro_jobValues.chuck_wagon.lohn = 5;
				TWPro.twpro_jobValues.chuck_wagon.glueck = 42;
				TWPro.twpro_jobValues.chuck_wagon.gefahr = 11;
				TWPro.twpro_jobValues.break_in = {};
				TWPro.twpro_jobValues.break_in.erfahrung = 32;
				TWPro.twpro_jobValues.break_in.lohn = 13;
				TWPro.twpro_jobValues.break_in.glueck = 10;
				TWPro.twpro_jobValues.break_in.gefahr = 52;
				TWPro.twpro_jobValues.trade = {};
				TWPro.twpro_jobValues.trade.erfahrung = 3;
				TWPro.twpro_jobValues.trade.lohn = 15;
				TWPro.twpro_jobValues.trade.glueck = 25;
				TWPro.twpro_jobValues.trade.gefahr = 12;
				TWPro.twpro_jobValues.mast = {};
				TWPro.twpro_jobValues.mast.erfahrung = 25;
				TWPro.twpro_jobValues.mast.lohn = 21;
				TWPro.twpro_jobValues.mast.glueck = 3;
				TWPro.twpro_jobValues.mast.gefahr = 14;
				TWPro.twpro_jobValues.spring = {};
				TWPro.twpro_jobValues.spring.erfahrung = 33;
				TWPro.twpro_jobValues.spring.lohn = 9;
				TWPro.twpro_jobValues.spring.glueck = 23;
				TWPro.twpro_jobValues.spring.gefahr = 19;
				TWPro.twpro_jobValues.beaver = {};
				TWPro.twpro_jobValues.beaver.erfahrung = 17;
				TWPro.twpro_jobValues.beaver.lohn = 32;
				TWPro.twpro_jobValues.beaver.glueck = 6;
				TWPro.twpro_jobValues.beaver.gefahr = 21;
				TWPro.twpro_jobValues.coal = {};
				TWPro.twpro_jobValues.coal.erfahrung = 14;
				TWPro.twpro_jobValues.coal.lohn = 30;
				TWPro.twpro_jobValues.coal.glueck = 0;
				TWPro.twpro_jobValues.coal.gefahr = 13;
				TWPro.twpro_jobValues.print = {};
				TWPro.twpro_jobValues.print.erfahrung = 20;
				TWPro.twpro_jobValues.print.lohn = 30;
				TWPro.twpro_jobValues.print.glueck = 5;
				TWPro.twpro_jobValues.print.gefahr = 7;
				TWPro.twpro_jobValues.fishing = {};
				TWPro.twpro_jobValues.fishing.erfahrung = 23;
				TWPro.twpro_jobValues.fishing.lohn = 6;
				TWPro.twpro_jobValues.fishing.glueck = 23;
				TWPro.twpro_jobValues.fishing.gefahr = 38;
				TWPro.twpro_jobValues.trainstation = {};
				TWPro.twpro_jobValues.trainstation.erfahrung = 47;
				TWPro.twpro_jobValues.trainstation.lohn = 12;
				TWPro.twpro_jobValues.trainstation.glueck = 7;
				TWPro.twpro_jobValues.trainstation.gefahr = 15;
				TWPro.twpro_jobValues.windmeel = {};
				TWPro.twpro_jobValues.windmeel.erfahrung = 43;
				TWPro.twpro_jobValues.windmeel.lohn = 42;
				TWPro.twpro_jobValues.windmeel.glueck = 6;
				TWPro.twpro_jobValues.windmeel.gefahr = 18;
				TWPro.twpro_jobValues.explore = {};
				TWPro.twpro_jobValues.explore.erfahrung = 45;
				TWPro.twpro_jobValues.explore.lohn = 1;
				TWPro.twpro_jobValues.explore.glueck = 22;
				TWPro.twpro_jobValues.explore.gefahr = 37;
				TWPro.twpro_jobValues["float"] = {};
				TWPro.twpro_jobValues["float"].erfahrung = 45;
				TWPro.twpro_jobValues["float"].lohn = 23;
				TWPro.twpro_jobValues["float"].glueck = 0;
				TWPro.twpro_jobValues["float"].gefahr = 52;
				TWPro.twpro_jobValues.bridge = {};
				TWPro.twpro_jobValues.bridge.erfahrung = 33;
				TWPro.twpro_jobValues.bridge.lohn = 17;
				TWPro.twpro_jobValues.bridge.glueck = 18;
				TWPro.twpro_jobValues.bridge.gefahr = 53;
				TWPro.twpro_jobValues.springe = {};
				TWPro.twpro_jobValues.springe.erfahrung = 45;
				TWPro.twpro_jobValues.springe.lohn = 29;
				TWPro.twpro_jobValues.springe.glueck = 0;
				TWPro.twpro_jobValues.springe.gefahr = 42;
				TWPro.twpro_jobValues.coffin = {};
				TWPro.twpro_jobValues.coffin.erfahrung = 8;
				TWPro.twpro_jobValues.coffin.lohn = 42;
				TWPro.twpro_jobValues.coffin.glueck = 15;
				TWPro.twpro_jobValues.coffin.gefahr = 20;
				TWPro.twpro_jobValues.dynamite = {};
				TWPro.twpro_jobValues.dynamite.erfahrung = 12;
				TWPro.twpro_jobValues.dynamite.lohn = 23;
				TWPro.twpro_jobValues.dynamite.glueck = 64;
				TWPro.twpro_jobValues.dynamite.gefahr = 93;
				TWPro.twpro_jobValues.coyote = {};
				TWPro.twpro_jobValues.coyote.erfahrung = 43;
				TWPro.twpro_jobValues.coyote.lohn = 15;
				TWPro.twpro_jobValues.coyote.glueck = 26;
				TWPro.twpro_jobValues.coyote.gefahr = 45;
				TWPro.twpro_jobValues.buffalo = {};
				TWPro.twpro_jobValues.buffalo.erfahrung = 62;
				TWPro.twpro_jobValues.buffalo.lohn = 24;
				TWPro.twpro_jobValues.buffalo.glueck = 0;
				TWPro.twpro_jobValues.buffalo.gefahr = 72;
				TWPro.twpro_jobValues.fort = {};
				TWPro.twpro_jobValues.fort.erfahrung = 71;
				TWPro.twpro_jobValues.fort.lohn = 33;
				TWPro.twpro_jobValues.fort.glueck = 17;
				TWPro.twpro_jobValues.fort.gefahr = 35;
				TWPro.twpro_jobValues.indians = {};
				TWPro.twpro_jobValues.indians.erfahrung = 14;
				TWPro.twpro_jobValues.indians.lohn = 11;
				TWPro.twpro_jobValues.indians.glueck = 63;
				TWPro.twpro_jobValues.indians.gefahr = 34;
				TWPro.twpro_jobValues.clearing = {};
				TWPro.twpro_jobValues.clearing.erfahrung = 8;
				TWPro.twpro_jobValues.clearing.lohn = 62;
				TWPro.twpro_jobValues.clearing.glueck = 9;
				TWPro.twpro_jobValues.clearing.gefahr = 16;
				TWPro.twpro_jobValues.silver = {};
				TWPro.twpro_jobValues.silver.erfahrung = 8;
				TWPro.twpro_jobValues.silver.lohn = 76;
				TWPro.twpro_jobValues.silver.glueck = 0;
				TWPro.twpro_jobValues.silver.gefahr = 32;
				TWPro.twpro_jobValues.diligence_guard = {};
				TWPro.twpro_jobValues.diligence_guard.erfahrung = 77;
				TWPro.twpro_jobValues.diligence_guard.lohn = 34;
				TWPro.twpro_jobValues.diligence_guard.glueck = 45;
				TWPro.twpro_jobValues.diligence_guard.gefahr = 43;
				TWPro.twpro_jobValues.wolf = {};
				TWPro.twpro_jobValues.wolf.erfahrung = 63;
				TWPro.twpro_jobValues.wolf.lohn = 21;
				TWPro.twpro_jobValues.wolf.glueck = 15;
				TWPro.twpro_jobValues.wolf.gefahr = 67;
				TWPro.twpro_jobValues.track = {};
				TWPro.twpro_jobValues.track.erfahrung = 60;
				TWPro.twpro_jobValues.track.lohn = 10;
				TWPro.twpro_jobValues.track.glueck = 30;
				TWPro.twpro_jobValues.track.gefahr = 33;
				TWPro.twpro_jobValues.ox = {};
				TWPro.twpro_jobValues.ox.erfahrung = 34;
				TWPro.twpro_jobValues.ox.lohn = 64;
				TWPro.twpro_jobValues.ox.glueck = 18;
				TWPro.twpro_jobValues.ox.gefahr = 43;
				TWPro.twpro_jobValues.guard = {};
				TWPro.twpro_jobValues.guard.erfahrung = 35;
				TWPro.twpro_jobValues.guard.lohn = 25;
				TWPro.twpro_jobValues.guard.glueck = 38;
				TWPro.twpro_jobValues.guard.gefahr = 4;
				TWPro.twpro_jobValues.bible = {};
				TWPro.twpro_jobValues.bible.erfahrung = 61;
				TWPro.twpro_jobValues.bible.lohn = 5;
				TWPro.twpro_jobValues.bible.glueck = 52;
				TWPro.twpro_jobValues.bible.gefahr = 77;
				TWPro.twpro_jobValues.ponyexpress = {};
				TWPro.twpro_jobValues.ponyexpress.erfahrung = 48;
				TWPro.twpro_jobValues.ponyexpress.lohn = 15;
				TWPro.twpro_jobValues.ponyexpress.glueck = 51;
				TWPro.twpro_jobValues.ponyexpress.gefahr = 44;
				TWPro.twpro_jobValues.weapons = {};
				TWPro.twpro_jobValues.weapons.erfahrung = 35;
				TWPro.twpro_jobValues.weapons.lohn = 15;
				TWPro.twpro_jobValues.weapons.glueck = 72;
				TWPro.twpro_jobValues.weapons.gefahr = 82;
				TWPro.twpro_jobValues.dead = {};
				TWPro.twpro_jobValues.dead.erfahrung = 14;
				TWPro.twpro_jobValues.dead.lohn = 14;
				TWPro.twpro_jobValues.dead.glueck = 90;
				TWPro.twpro_jobValues.dead.gefahr = 34;
				TWPro.twpro_jobValues.grizzly = {};
				TWPro.twpro_jobValues.grizzly.erfahrung = 78;
				TWPro.twpro_jobValues.grizzly.lohn = 25;
				TWPro.twpro_jobValues.grizzly.glueck = 35;
				TWPro.twpro_jobValues.grizzly.gefahr = 71;
				TWPro.twpro_jobValues.oil = {};
				TWPro.twpro_jobValues.oil.erfahrung = 25;
				TWPro.twpro_jobValues.oil.lohn = 83;
				TWPro.twpro_jobValues.oil.glueck = 20;
				TWPro.twpro_jobValues.oil.gefahr = 7;
				TWPro.twpro_jobValues.treasure_hunting = {};
				TWPro.twpro_jobValues.treasure_hunting.erfahrung = 20;
				TWPro.twpro_jobValues.treasure_hunting.lohn = 20;
				TWPro.twpro_jobValues.treasure_hunting.glueck = 83;
				TWPro.twpro_jobValues.treasure_hunting.gefahr = 24;
				TWPro.twpro_jobValues.army = {};
				TWPro.twpro_jobValues.army.erfahrung = 76;
				TWPro.twpro_jobValues.army.lohn = 55;
				TWPro.twpro_jobValues.army.glueck = 17;
				TWPro.twpro_jobValues.army.gefahr = 35;
				TWPro.twpro_jobValues.steal = {};
				TWPro.twpro_jobValues.steal.erfahrung = 50;
				TWPro.twpro_jobValues.steal.lohn = 48;
				TWPro.twpro_jobValues.steal.glueck = 74;
				TWPro.twpro_jobValues.steal.gefahr = 66;
				TWPro.twpro_jobValues.mercenary = {};
				TWPro.twpro_jobValues.mercenary.erfahrung = 52;
				TWPro.twpro_jobValues.mercenary.lohn = 92;
				TWPro.twpro_jobValues.mercenary.glueck = 23;
				TWPro.twpro_jobValues.mercenary.gefahr = 65;
				TWPro.twpro_jobValues.bandits = {};
				TWPro.twpro_jobValues.bandits.erfahrung = 75;
				TWPro.twpro_jobValues.bandits.lohn = 28;
				TWPro.twpro_jobValues.bandits.glueck = 85;
				TWPro.twpro_jobValues.bandits.gefahr = 83;
				TWPro.twpro_jobValues.aggression = {};
				TWPro.twpro_jobValues.aggression.erfahrung = 27;
				TWPro.twpro_jobValues.aggression.lohn = 78;
				TWPro.twpro_jobValues.aggression.glueck = 78;
				TWPro.twpro_jobValues.aggression.gefahr = 86;
				TWPro.twpro_jobValues.diligence_aggression = {};
				TWPro.twpro_jobValues.diligence_aggression.erfahrung = 73;
				TWPro.twpro_jobValues.diligence_aggression.lohn = 43;
				TWPro.twpro_jobValues.diligence_aggression.glueck = 95;
				TWPro.twpro_jobValues.diligence_aggression.gefahr = 67;
				TWPro.twpro_jobValues.bounty = {};
				TWPro.twpro_jobValues.bounty.erfahrung = 32;
				TWPro.twpro_jobValues.bounty.lohn = 92;
				TWPro.twpro_jobValues.bounty.glueck = 79;
				TWPro.twpro_jobValues.bounty.gefahr = 72;
				TWPro.twpro_jobValues.captured = {};
				TWPro.twpro_jobValues.captured.erfahrung = 69;
				TWPro.twpro_jobValues.captured.lohn = 23;
				TWPro.twpro_jobValues.captured.glueck = 85;
				TWPro.twpro_jobValues.captured.gefahr = 44;
				TWPro.twpro_jobValues.train = {};
				TWPro.twpro_jobValues.train.erfahrung = 87;
				TWPro.twpro_jobValues.train.lohn = 67;
				TWPro.twpro_jobValues.train.glueck = 92;
				TWPro.twpro_jobValues.train.gefahr = 96;
				TWPro.twpro_jobValues.burglary = {};
				TWPro.twpro_jobValues.burglary.erfahrung = 34;
				TWPro.twpro_jobValues.burglary.lohn = 80;
				TWPro.twpro_jobValues.burglary.glueck = 81;
				TWPro.twpro_jobValues.burglary.gefahr = 26;
				TWPro.twpro_jobValues.quackery = {};
				TWPro.twpro_jobValues.quackery.erfahrung = 50;
				TWPro.twpro_jobValues.quackery.lohn = 65;
				TWPro.twpro_jobValues.quackery.glueck = 52;
				TWPro.twpro_jobValues.quackery.gefahr = 67;
				TWPro.twpro_jobValues.peace = {};
				TWPro.twpro_jobValues.peace.erfahrung = 68;
				TWPro.twpro_jobValues.peace.lohn = 33;
				TWPro.twpro_jobValues.peace.glueck = 76;
				TWPro.twpro_jobValues.peace.gefahr = 44;
				TWPro.twpro_jobValues.ship = {};
				TWPro.twpro_jobValues.ship.erfahrung = 35;
				TWPro.twpro_jobValues.ship.lohn = 82;
				TWPro.twpro_jobValues.ship.glueck = 15;
				TWPro.twpro_jobValues.ship.gefahr = 14;
				TWPro.twpro_jobValues.smuggle = {};
				TWPro.twpro_jobValues.smuggle.erfahrung = 45;
				TWPro.twpro_jobValues.smuggle.lohn = 62;
				TWPro.twpro_jobValues.smuggle.glueck = 83;
				TWPro.twpro_jobValues.smuggle.gefahr = 56;
				TWPro.twpro_jobValues.ranch = {};
				TWPro.twpro_jobValues.ranch.erfahrung = 61;
				TWPro.twpro_jobValues.ranch.lohn = 28;
				TWPro.twpro_jobValues.ranch.glueck = 17;
				TWPro.twpro_jobValues.ranch.gefahr = 24;
				TWPro.twpro_jobValues.iron = {};
				TWPro.twpro_jobValues.iron.erfahrung = 32;
				TWPro.twpro_jobValues.iron.lohn = 52;
				TWPro.twpro_jobValues.iron.glueck = 15;
				TWPro.twpro_jobValues.iron.gefahr = 29;
				TWPro.twpro_jobValues.agave = {};
				TWPro.twpro_jobValues.agave.erfahrung = 42;
				TWPro.twpro_jobValues.agave.lohn = 25;
				TWPro.twpro_jobValues.agave.glueck = 12;
				TWPro.twpro_jobValues.agave.gefahr = 27;
				TWPro.twpro_jobValues.tomato = {};
				TWPro.twpro_jobValues.tomato.erfahrung = 12;
				TWPro.twpro_jobValues.tomato.lohn = 13;
				TWPro.twpro_jobValues.tomato.glueck = 7;
				TWPro.twpro_jobValues.tomato.gefahr = 11;
				TWPro.twpro_jobValues.horseshoe = {};
				TWPro.twpro_jobValues.horseshoe.erfahrung = 28;
				TWPro.twpro_jobValues.horseshoe.lohn = 14;
				TWPro.twpro_jobValues.horseshoe.glueck = 9;
				TWPro.twpro_jobValues.horseshoe.gefahr = 23;
				TWPro.twpro_jobValues.fire = {};
				TWPro.twpro_jobValues.fire.erfahrung = 41;
				TWPro.twpro_jobValues.fire.lohn = 15;
				TWPro.twpro_jobValues.fire.glueck = 65;
				TWPro.twpro_jobValues.fire.gefahr = 45;
				TWPro.twpro_jobValues.orange = {};
				TWPro.twpro_jobValues.orange.erfahrung = 25;
				TWPro.twpro_jobValues.orange.lohn = 14;
				TWPro.twpro_jobValues.orange.glueck = 10;
				TWPro.twpro_jobValues.orange.gefahr = 21;
				TWPro.twpro_jobValues.muck_out = {};
				TWPro.twpro_jobValues.muck_out.erfahrung = 5;
				TWPro.twpro_jobValues.muck_out.lohn = 4;
				TWPro.twpro_jobValues.muck_out.glueck = 2;
				TWPro.twpro_jobValues.muck_out.gefahr = 6;
				TWPro.twpro_jobValues.shoes = {};
				TWPro.twpro_jobValues.shoes.erfahrung = 2;
				TWPro.twpro_jobValues.shoes.lohn = 3;
				TWPro.twpro_jobValues.shoes.glueck = 3;
				TWPro.twpro_jobValues.shoes.gefahr = 2;

				//Game version 1.30
				TWPro.twpro_jobValues.socks_darn = {};
				TWPro.twpro_jobValues.socks_darn.erfahrung = 4;
				TWPro.twpro_jobValues.socks_darn.lohn = 1;
				TWPro.twpro_jobValues.socks_darn.glueck = 0;
				TWPro.twpro_jobValues.socks_darn.gefahr = 0;
				TWPro.twpro_jobValues.potatoe = {};
				TWPro.twpro_jobValues.potatoe.erfahrung = 53;
				TWPro.twpro_jobValues.potatoe.lohn = 8;
				TWPro.twpro_jobValues.potatoe.glueck = 5;
				TWPro.twpro_jobValues.potatoe.gefahr = 5;
				TWPro.twpro_jobValues.feed_animal = {};
				TWPro.twpro_jobValues.feed_animal.erfahrung = 60;
				TWPro.twpro_jobValues.feed_animal.lohn = 17;
				TWPro.twpro_jobValues.feed_animal.glueck = 10;
				TWPro.twpro_jobValues.feed_animal.gefahr = 20;
				TWPro.twpro_jobValues.pumpkin = {};
				TWPro.twpro_jobValues.pumpkin.erfahrung = 45;
				TWPro.twpro_jobValues.pumpkin.lohn = 45;
				TWPro.twpro_jobValues.pumpkin.glueck = 10;
				TWPro.twpro_jobValues.pumpkin.gefahr = 10;
				TWPro.twpro_jobValues.blueberries = {};
				TWPro.twpro_jobValues.blueberries.erfahrung = 35;
				TWPro.twpro_jobValues.blueberries.lohn = 52;
				TWPro.twpro_jobValues.blueberries.glueck = 35;
				TWPro.twpro_jobValues.blueberries.gefahr = 15;
				TWPro.twpro_jobValues.plant_trees = {};
				TWPro.twpro_jobValues.plant_trees.erfahrung = 25;
				TWPro.twpro_jobValues.plant_trees.lohn = 34;
				TWPro.twpro_jobValues.plant_trees.glueck = 54;
				TWPro.twpro_jobValues.plant_trees.gefahr = 25;
				TWPro.twpro_jobValues.gather_feathers = {};
				TWPro.twpro_jobValues.gather_feathers.erfahrung = 23;
				TWPro.twpro_jobValues.gather_feathers.lohn = 47;
				TWPro.twpro_jobValues.gather_feathers.glueck = 60;
				TWPro.twpro_jobValues.gather_feathers.gefahr = 15;
				TWPro.twpro_jobValues.lotus_gathering = {};
				TWPro.twpro_jobValues.lotus_gathering.erfahrung = 45;
				TWPro.twpro_jobValues.lotus_gathering.lohn = 54;
				TWPro.twpro_jobValues.lotus_gathering.glueck = 35;
				TWPro.twpro_jobValues.lotus_gathering.gefahr = 20;
				TWPro.twpro_jobValues.crab_hunting = {};
				TWPro.twpro_jobValues.crab_hunting.erfahrung = 56;
				TWPro.twpro_jobValues.crab_hunting.lohn = 67;
				TWPro.twpro_jobValues.crab_hunting.glueck = 35;
				TWPro.twpro_jobValues.crab_hunting.gefahr = 12;
				TWPro.twpro_jobValues.teaching = {};
				TWPro.twpro_jobValues.teaching.erfahrung = 79;
				TWPro.twpro_jobValues.teaching.lohn = 54;
				TWPro.twpro_jobValues.teaching.glueck = 5;
				TWPro.twpro_jobValues.teaching.gefahr = 23;
				TWPro.twpro_jobValues.sheriff_work = {};
				TWPro.twpro_jobValues.sheriff_work.erfahrung = 76;
				TWPro.twpro_jobValues.sheriff_work.lohn = 67;
				TWPro.twpro_jobValues.sheriff_work.glueck = 56;
				TWPro.twpro_jobValues.sheriff_work.gefahr = 45;
				TWPro.twpro_jobValues.sulfur_gathering = {};
				TWPro.twpro_jobValues.sulfur_gathering.erfahrung = 34;
				TWPro.twpro_jobValues.sulfur_gathering.lohn = 76;
				TWPro.twpro_jobValues.sulfur_gathering.glueck = 78;
				TWPro.twpro_jobValues.sulfur_gathering.gefahr = 32;
				TWPro.twpro_jobValues.wildwater = {};
				TWPro.twpro_jobValues.wildwater.erfahrung = 74;
				TWPro.twpro_jobValues.wildwater.lohn = 84;
				TWPro.twpro_jobValues.wildwater.glueck = 30;
				TWPro.twpro_jobValues.wildwater.gefahr = 57;
				TWPro.twpro_jobValues.gambler = {};
				TWPro.twpro_jobValues.gambler.erfahrung = 57;
				TWPro.twpro_jobValues.gambler.lohn = 67;
				TWPro.twpro_jobValues.gambler.glueck = 69;
				TWPro.twpro_jobValues.gambler.gefahr = 63;
				TWPro.twpro_jobValues.rattlesnake = {};
				TWPro.twpro_jobValues.rattlesnake.erfahrung = 46;
				TWPro.twpro_jobValues.rattlesnake.lohn = 72;
				TWPro.twpro_jobValues.rattlesnake.glueck = 71;
				TWPro.twpro_jobValues.rattlesnake.gefahr = 73;
				TWPro.twpro_jobValues.salpeter_gathering = {};
				TWPro.twpro_jobValues.salpeter_gathering.erfahrung = 53;
				TWPro.twpro_jobValues.salpeter_gathering.lohn = 62;
				TWPro.twpro_jobValues.salpeter_gathering.glueck = 58;
				TWPro.twpro_jobValues.salpeter_gathering.gefahr = 27;
				TWPro.twpro_jobValues.horse_transport = {};
				TWPro.twpro_jobValues.horse_transport.erfahrung = 82;
				TWPro.twpro_jobValues.horse_transport.lohn = 66;
				TWPro.twpro_jobValues.horse_transport.glueck = 69;
				TWPro.twpro_jobValues.horse_transport.gefahr = 48;
				TWPro.twpro_jobValues.rodeo = {};
				TWPro.twpro_jobValues.rodeo.erfahrung = 56;
				TWPro.twpro_jobValues.rodeo.lohn = 76;
				TWPro.twpro_jobValues.rodeo.glueck = 69;
				TWPro.twpro_jobValues.rodeo.gefahr = 78;
				TWPro.twpro_jobValues.travelling_salesman = {};
				TWPro.twpro_jobValues.travelling_salesman.erfahrung = 46;
				TWPro.twpro_jobValues.travelling_salesman.lohn = 59;
				TWPro.twpro_jobValues.travelling_salesman.glueck = 97;
				TWPro.twpro_jobValues.travelling_salesman.gefahr = 67;
				TWPro.twpro_jobValues.con_artist = {};
				TWPro.twpro_jobValues.con_artist.erfahrung = 89;
				TWPro.twpro_jobValues.con_artist.lohn = 78;
				TWPro.twpro_jobValues.con_artist.glueck = 35;
				TWPro.twpro_jobValues.con_artist.gefahr = 83;
				TWPro.twpro_jobValues.cougar = {};
				TWPro.twpro_jobValues.cougar.erfahrung = 89;
				TWPro.twpro_jobValues.cougar.lohn = 46;
				TWPro.twpro_jobValues.cougar.glueck = 39;
				TWPro.twpro_jobValues.cougar.gefahr = 93;
				TWPro.twpro_jobValues.alcohol = {};
				TWPro.twpro_jobValues.alcohol.erfahrung = 91;
				TWPro.twpro_jobValues.alcohol.lohn = 74;
				TWPro.twpro_jobValues.alcohol.glueck = 34;
				TWPro.twpro_jobValues.alcohol.gefahr = 56;
				TWPro.twpro_jobValues.lead_gathering = {};
				TWPro.twpro_jobValues.lead_gathering.erfahrung = 72;
				TWPro.twpro_jobValues.lead_gathering.lohn = 89;
				TWPro.twpro_jobValues.lead_gathering.glueck = 22;
				TWPro.twpro_jobValues.lead_gathering.gefahr = 72;
				TWPro.twpro_jobValues.gem_gathering = {};
				TWPro.twpro_jobValues.gem_gathering.erfahrung = 78;
				TWPro.twpro_jobValues.gem_gathering.lohn = 91;
				TWPro.twpro_jobValues.gem_gathering.glueck = 23;
				TWPro.twpro_jobValues.gem_gathering.gefahr = 77;
				TWPro.twpro_jobValues.mission = {};
				TWPro.twpro_jobValues.mission.erfahrung = 82;
				TWPro.twpro_jobValues.mission.lohn = 92;
				TWPro.twpro_jobValues.mission.glueck = 54;
				TWPro.twpro_jobValues.mission.gefahr = 38;
				TWPro.twpro_jobValues.casino = {};
				TWPro.twpro_jobValues.casino.erfahrung = 92;
				TWPro.twpro_jobValues.casino.lohn = 78;
				TWPro.twpro_jobValues.casino.glueck = 23;
				TWPro.twpro_jobValues.casino.gefahr = 47;
				TWPro.twpro_jobValues.marshall = {};
				TWPro.twpro_jobValues.marshall.erfahrung = 90;
				TWPro.twpro_jobValues.marshall.lohn = 87;
				TWPro.twpro_jobValues.marshall.glueck = 60;
				TWPro.twpro_jobValues.marshall.gefahr = 94;
				TWPro.twpro_jobValues.shatter_gang = {};
				TWPro.twpro_jobValues.shatter_gang.erfahrung = 70;
				TWPro.twpro_jobValues.shatter_gang.lohn = 84;
				TWPro.twpro_jobValues.shatter_gang.glueck = 89;
				TWPro.twpro_jobValues.shatter_gang.gefahr = 99;
				TWPro.twpro_jobValues.bankrobbery = {};
				TWPro.twpro_jobValues.bankrobbery.erfahrung = 84;
				TWPro.twpro_jobValues.bankrobbery.lohn = 93;
				TWPro.twpro_jobValues.bankrobbery.glueck = 30;
				TWPro.twpro_jobValues.bankrobbery.gefahr = 89;
				TWPro.twpro_jobValues.free_slaves = {};
				TWPro.twpro_jobValues.free_slaves.erfahrung = 93;
				TWPro.twpro_jobValues.free_slaves.lohn = 84;
				TWPro.twpro_jobValues.free_slaves.glueck = 28;
				TWPro.twpro_jobValues.free_slaves.gefahr = 92;
				TWPro.twpro_jobValues.buffelo_bill = {};
				TWPro.twpro_jobValues.buffelo_bill.erfahrung = 94;
				TWPro.twpro_jobValues.buffelo_bill.lohn = 92;
				TWPro.twpro_jobValues.buffelo_bill.glueck = 65;
				TWPro.twpro_jobValues.buffelo_bill.gefahr = 70;
				TWPro.twpro_jobValues.indigo_gathering = {};
				
				// retrieved from beta job_171_144 - firebug, curl and bash ftw
				TWPro.twpro_jobValues.indigo_gathering = {};
				TWPro.twpro_jobValues.indigo_gathering.erfahrung = 73;
				TWPro.twpro_jobValues.indigo_gathering.lohn = 87;
				TWPro.twpro_jobValues.indigo_gathering.glueck = 29;
				TWPro.twpro_jobValues.indigo_gathering.gefahr = 69;
				
				TWPro.twpro_jobValues.build_palisade = {};
				TWPro.twpro_jobValues.build_palisade.erfahrung = 65;
				TWPro.twpro_jobValues.build_palisade.lohn = 33;
				TWPro.twpro_jobValues.build_palisade.glueck = 20;
				TWPro.twpro_jobValues.build_palisade.gefahr = 30;
				var extra_jobs = ['construct', 'lifepoints', 'ride', 'finger_dexterity', 'duelshootingatt', 'duelshootingdef', 'duelvigor', 'fortatt', 'fortdef', 'speed', 'regeneration'];
				for(var i=0; i<extra_jobs.length; i++){
					TWPro.twpro_jobValues[extra_jobs[i]] = {'erfahrung':0, 'lohn':0, 'glueck':0, 'gefahr':0};
				}
			}
			TWPro.twpro_setBonusParsed = false;
			// Setitems
			{
				TWPro.twpro_setBonus = {};
				TWPro.twpro_setBonus.set_farmer = [];
				TWPro.twpro_setBonus.set_farmer[2] = {};
				TWPro.twpro_setBonus.set_farmer[2].bonus = {};
				TWPro.twpro_setBonus.set_farmer[2].bonus.attributes = {};
				TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.strength = 1;
				TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.flexibility = 1;
				TWPro.twpro_setBonus.set_farmer[2].bonus.skills = {};
				TWPro.twpro_setBonus.set_farmer[2].jobBonus = {};
				TWPro.twpro_setBonus.set_farmer[2].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_farmer[2].jobBonus.cereal = 10;
				TWPro.twpro_setBonus.set_farmer[2].jobBonus.cut = 10;
				TWPro.twpro_setBonus.set_farmer[2].jobBonus.grinding = 10;
				TWPro.twpro_setBonus.set_farmer[2].speedBonus = 0;
				TWPro.twpro_setBonus.set_farmer[2].parsedBonus = {};
				TWPro.twpro_setBonus.set_farmer[3] = {};
				TWPro.twpro_setBonus.set_farmer[3].bonus = {};
				TWPro.twpro_setBonus.set_farmer[3].bonus.attributes = {};
				TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.strength = 1;
				TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.flexibility = 1;
				TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.dexterity = 1;
				TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.charisma = 1;
				TWPro.twpro_setBonus.set_farmer[3].bonus.skills = {};
				TWPro.twpro_setBonus.set_farmer[3].jobBonus = {};
				TWPro.twpro_setBonus.set_farmer[3].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_farmer[3].jobBonus.cereal = 10;
				TWPro.twpro_setBonus.set_farmer[3].jobBonus.cut = 10;
				TWPro.twpro_setBonus.set_farmer[3].jobBonus.grinding = 10;
				TWPro.twpro_setBonus.set_farmer[3].jobBonus.cow = 20;
				TWPro.twpro_setBonus.set_farmer[3].jobBonus.wire = 20;
				TWPro.twpro_setBonus.set_farmer[3].jobBonus.horseshoe = 20;
				TWPro.twpro_setBonus.set_farmer[3].speedBonus = 0;
				TWPro.twpro_setBonus.set_farmer[3].parsedBonus = {};
				TWPro.twpro_setBonus.set_farmer[4] = {};
				TWPro.twpro_setBonus.set_farmer[4].bonus = {};
				TWPro.twpro_setBonus.set_farmer[4].bonus.attributes = {};
				TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.strength = 2;
				TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.flexibility = 2;
				TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.dexterity = 2;
				TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.charisma = 2;
				TWPro.twpro_setBonus.set_farmer[4].bonus.skills = {};
				TWPro.twpro_setBonus.set_farmer[4].jobBonus = {};
				TWPro.twpro_setBonus.set_farmer[4].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_farmer[4].jobBonus.cereal = 10;
				TWPro.twpro_setBonus.set_farmer[4].jobBonus.cut = 10;
				TWPro.twpro_setBonus.set_farmer[4].jobBonus.grinding = 10;
				TWPro.twpro_setBonus.set_farmer[4].jobBonus.cow = 20;
				TWPro.twpro_setBonus.set_farmer[4].jobBonus.wire = 20;
				TWPro.twpro_setBonus.set_farmer[4].jobBonus.windmeel = 40;
				TWPro.twpro_setBonus.set_farmer[4].jobBonus.springe = 40;
				TWPro.twpro_setBonus.set_farmer[4].jobBonus.ranch = 40;
				TWPro.twpro_setBonus.set_farmer[4].jobBonus.horseshoe = 20;
				TWPro.twpro_setBonus.set_farmer[4].speedBonus = 0;
				TWPro.twpro_setBonus.set_farmer[4].parsedBonus = {};
				TWPro.twpro_setBonus.set_farmer[5] = {};
				TWPro.twpro_setBonus.set_farmer[5].bonus = {};
				TWPro.twpro_setBonus.set_farmer[5].bonus.attributes = {};
				TWPro.twpro_setBonus.set_farmer[5].bonus.attributes.strength = 2;
				TWPro.twpro_setBonus.set_farmer[5].bonus.attributes.flexibility = 2;
				TWPro.twpro_setBonus.set_farmer[5].bonus.attributes.dexterity = 2;
				TWPro.twpro_setBonus.set_farmer[5].bonus.attributes.charisma = 2;
				TWPro.twpro_setBonus.set_farmer[5].bonus.skills = {};
				TWPro.twpro_setBonus.set_farmer[5].jobBonus = {};
				TWPro.twpro_setBonus.set_farmer[5].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_farmer[5].jobBonus.cereal = 10;
				TWPro.twpro_setBonus.set_farmer[5].jobBonus.cut = 10;
				TWPro.twpro_setBonus.set_farmer[5].jobBonus.grinding = 10;
				TWPro.twpro_setBonus.set_farmer[5].jobBonus.cow = 20;
				TWPro.twpro_setBonus.set_farmer[5].jobBonus.wire = 20;
				TWPro.twpro_setBonus.set_farmer[5].jobBonus.horseshoe = 20;
				TWPro.twpro_setBonus.set_farmer[5].jobBonus.windmeel = 40;
				TWPro.twpro_setBonus.set_farmer[5].jobBonus.springe = 40;
				TWPro.twpro_setBonus.set_farmer[5].jobBonus.ranch = 40;
				TWPro.twpro_setBonus.set_farmer[5].jobBonus.potatoe = 40;
				TWPro.twpro_setBonus.set_farmer[5].speedBonus = 0;
				TWPro.twpro_setBonus.set_farmer[5].parsedBonus = {};
				TWPro.twpro_setBonus.set_farmer[6] = {};
				TWPro.twpro_setBonus.set_farmer[6].bonus = {};
				TWPro.twpro_setBonus.set_farmer[6].bonus.attributes = {};
				TWPro.twpro_setBonus.set_farmer[6].bonus.attributes.strength = 2;
				TWPro.twpro_setBonus.set_farmer[6].bonus.attributes.flexibility = 2;
				TWPro.twpro_setBonus.set_farmer[6].bonus.attributes.dexterity = 2;
				TWPro.twpro_setBonus.set_farmer[6].bonus.attributes.charisma = 2;
				TWPro.twpro_setBonus.set_farmer[6].bonus.skills = {};
				TWPro.twpro_setBonus.set_farmer[6].jobBonus = {};
				TWPro.twpro_setBonus.set_farmer[6].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_farmer[6].jobBonus.cereal = 10;
				TWPro.twpro_setBonus.set_farmer[6].jobBonus.cut = 10;
				TWPro.twpro_setBonus.set_farmer[6].jobBonus.grinding = 10;
				TWPro.twpro_setBonus.set_farmer[6].jobBonus.cow = 20;
				TWPro.twpro_setBonus.set_farmer[6].jobBonus.wire = 20;
				TWPro.twpro_setBonus.set_farmer[6].jobBonus.horseshoe = 20;
				TWPro.twpro_setBonus.set_farmer[6].jobBonus.windmeel = 40;
				TWPro.twpro_setBonus.set_farmer[6].jobBonus.springe = 40;
				TWPro.twpro_setBonus.set_farmer[6].jobBonus.ranch = 40;
				TWPro.twpro_setBonus.set_farmer[6].jobBonus.potatoe = 40;
				TWPro.twpro_setBonus.set_farmer[6].jobBonus.feed_animal = 40;
				TWPro.twpro_setBonus.set_farmer[6].speedBonus = 0;
				TWPro.twpro_setBonus.set_farmer[6].parsedBonus = {};
				TWPro.twpro_setBonus.set_indian = [];
				TWPro.twpro_setBonus.set_indian[2] = {};
				TWPro.twpro_setBonus.set_indian[2].bonus = {};
				TWPro.twpro_setBonus.set_indian[2].bonus.attributes = {};
				TWPro.twpro_setBonus.set_indian[2].bonus.attributes.flexibility = 2;
				TWPro.twpro_setBonus.set_indian[2].bonus.skills = {};
				TWPro.twpro_setBonus.set_indian[2].bonus.skills.hide = 8;
				TWPro.twpro_setBonus.set_indian[2].jobBonus = {};
				TWPro.twpro_setBonus.set_indian[2].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_indian[2].jobBonus.coyote = 30;
				TWPro.twpro_setBonus.set_indian[2].speedBonus = 15;
				TWPro.twpro_setBonus.set_indian[2].parsedBonus = {};
				TWPro.twpro_setBonus.set_indian[3] = {};
				TWPro.twpro_setBonus.set_indian[3].bonus = {};
				TWPro.twpro_setBonus.set_indian[3].bonus.attributes = {};
				TWPro.twpro_setBonus.set_indian[3].bonus.attributes.flexibility = 5;
				TWPro.twpro_setBonus.set_indian[3].bonus.skills = {};
				TWPro.twpro_setBonus.set_indian[3].bonus.skills.hide = 8;
				TWPro.twpro_setBonus.set_indian[3].bonus.skills.swim = 8;
				TWPro.twpro_setBonus.set_indian[3].jobBonus = {};
				TWPro.twpro_setBonus.set_indian[3].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_indian[3].jobBonus.coyote = 30;
				TWPro.twpro_setBonus.set_indian[3].jobBonus.buffalo = 40;
				TWPro.twpro_setBonus.set_indian[3].speedBonus = 30;
				TWPro.twpro_setBonus.set_indian[3].parsedBonus = {};
				TWPro.twpro_setBonus.set_indian[4] = {};
				TWPro.twpro_setBonus.set_indian[4].bonus = {};
				TWPro.twpro_setBonus.set_indian[4].bonus.attributes = {};
				TWPro.twpro_setBonus.set_indian[4].bonus.attributes.flexibility = 8;
				TWPro.twpro_setBonus.set_indian[4].bonus.skills = {};
				TWPro.twpro_setBonus.set_indian[4].bonus.skills.hide = 8;
				TWPro.twpro_setBonus.set_indian[4].bonus.skills.swim = 8;
				TWPro.twpro_setBonus.set_indian[4].bonus.skills.pitfall = 8;
				TWPro.twpro_setBonus.set_indian[4].jobBonus = {};
				TWPro.twpro_setBonus.set_indian[4].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_indian[4].jobBonus.coyote = 30;
				TWPro.twpro_setBonus.set_indian[4].jobBonus.buffalo = 40;
				TWPro.twpro_setBonus.set_indian[4].jobBonus.wolf = 50;
				TWPro.twpro_setBonus.set_indian[4].speedBonus = 45;/////////////////// The West shows 44%, but in reality, the speed is 45%!!!
				TWPro.twpro_setBonus.set_indian[4].parsedBonus = {};
				TWPro.twpro_setBonus.set_indian[5] = {};
				TWPro.twpro_setBonus.set_indian[5].bonus = {};
				TWPro.twpro_setBonus.set_indian[5].bonus.attributes = {};
				TWPro.twpro_setBonus.set_indian[5].bonus.attributes.flexibility = 12;
				TWPro.twpro_setBonus.set_indian[5].bonus.skills = {};
				TWPro.twpro_setBonus.set_indian[5].bonus.skills.hide = 8;
				TWPro.twpro_setBonus.set_indian[5].bonus.skills.swim = 8;
				TWPro.twpro_setBonus.set_indian[5].bonus.skills.pitfall = 8;
				TWPro.twpro_setBonus.set_indian[5].bonus.skills.animal = 8;
				TWPro.twpro_setBonus.set_indian[5].jobBonus = {};
				TWPro.twpro_setBonus.set_indian[5].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_indian[5].jobBonus.coyote = 30;
				TWPro.twpro_setBonus.set_indian[5].jobBonus.buffalo = 40;
				TWPro.twpro_setBonus.set_indian[5].jobBonus.wolf = 50;
				TWPro.twpro_setBonus.set_indian[5].jobBonus.grizzly = 60;
				TWPro.twpro_setBonus.set_indian[5].speedBonus = 60;
				TWPro.twpro_setBonus.set_indian[5].parsedBonus = {};
				TWPro.twpro_setBonus.set_indian[6] = {};
				TWPro.twpro_setBonus.set_indian[6].bonus = {};
				TWPro.twpro_setBonus.set_indian[6].bonus.attributes = {};
				TWPro.twpro_setBonus.set_indian[6].bonus.attributes.flexibility = 16;
				TWPro.twpro_setBonus.set_indian[6].bonus.skills = {};
				TWPro.twpro_setBonus.set_indian[6].bonus.skills.hide = 8;
				TWPro.twpro_setBonus.set_indian[6].bonus.skills.swim = 8;
				TWPro.twpro_setBonus.set_indian[6].bonus.skills.pitfall = 8;
				TWPro.twpro_setBonus.set_indian[6].bonus.skills.animal = 8;
				TWPro.twpro_setBonus.set_indian[6].bonus.skills.shot = 8;
				TWPro.twpro_setBonus.set_indian[6].jobBonus = {};
				TWPro.twpro_setBonus.set_indian[6].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_indian[6].jobBonus.coyote = 30;
				TWPro.twpro_setBonus.set_indian[6].jobBonus.buffalo = 40;
				TWPro.twpro_setBonus.set_indian[6].jobBonus.wolf = 50;
				TWPro.twpro_setBonus.set_indian[6].jobBonus.grizzly = 60;
				TWPro.twpro_setBonus.set_indian[6].jobBonus.cougar = 70;
				TWPro.twpro_setBonus.set_indian[6].speedBonus = 75;
				TWPro.twpro_setBonus.set_indian[6].parsedBonus = {};
				TWPro.twpro_setBonus.set_indian[7] = {};
				TWPro.twpro_setBonus.set_indian[7].bonus = {};
				TWPro.twpro_setBonus.set_indian[7].bonus.attributes = {};
				TWPro.twpro_setBonus.set_indian[7].bonus.attributes.flexibility = 21;
				TWPro.twpro_setBonus.set_indian[7].bonus.skills = {};
				TWPro.twpro_setBonus.set_indian[7].bonus.skills.hide = 8;
				TWPro.twpro_setBonus.set_indian[7].bonus.skills.swim = 8;
				TWPro.twpro_setBonus.set_indian[7].bonus.skills.pitfall = 8;
				TWPro.twpro_setBonus.set_indian[7].bonus.skills.animal = 8;
				TWPro.twpro_setBonus.set_indian[7].bonus.skills.shot = 8;
				TWPro.twpro_setBonus.set_indian[7].bonus.skills.tough = 8;
				TWPro.twpro_setBonus.set_indian[7].jobBonus = {};
				TWPro.twpro_setBonus.set_indian[7].jobBonus.all = 25;
				TWPro.twpro_setBonus.set_indian[7].jobBonus.coyote = 30;
				TWPro.twpro_setBonus.set_indian[7].jobBonus.buffalo = 40;
				TWPro.twpro_setBonus.set_indian[7].jobBonus.wolf = 50;
				TWPro.twpro_setBonus.set_indian[7].jobBonus.grizzly = 60;
				TWPro.twpro_setBonus.set_indian[7].jobBonus.cougar = 70;
				TWPro.twpro_setBonus.set_indian[7].speedBonus = 90;
				TWPro.twpro_setBonus.set_indian[7].parsedBonus = {};
				TWPro.twpro_setBonus.set_mexican = [];
				TWPro.twpro_setBonus.set_mexican[2] = {};
				TWPro.twpro_setBonus.set_mexican[2].bonus = {};
				TWPro.twpro_setBonus.set_mexican[2].bonus.attributes = {};
				TWPro.twpro_setBonus.set_mexican[2].bonus.attributes.strength = 1;
				TWPro.twpro_setBonus.set_mexican[2].bonus.skills = {};
				TWPro.twpro_setBonus.set_mexican[2].jobBonus = {};
				TWPro.twpro_setBonus.set_mexican[2].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_mexican[2].speedBonus = 12;
				TWPro.twpro_setBonus.set_mexican[2].parsedBonus = {};
				TWPro.twpro_setBonus.set_mexican[3] = {};
				TWPro.twpro_setBonus.set_mexican[3].bonus = {};
				TWPro.twpro_setBonus.set_mexican[3].bonus.attributes = {};
				TWPro.twpro_setBonus.set_mexican[3].bonus.attributes.strength = 2;
				TWPro.twpro_setBonus.set_mexican[3].bonus.skills = {};
				TWPro.twpro_setBonus.set_mexican[3].jobBonus = {};
				TWPro.twpro_setBonus.set_mexican[3].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_mexican[3].jobBonus.agave = 60;
				TWPro.twpro_setBonus.set_mexican[3].speedBonus = 24;
				TWPro.twpro_setBonus.set_mexican[3].parsedBonus = {};
				TWPro.twpro_setBonus.set_mexican[4] = {};
				TWPro.twpro_setBonus.set_mexican[4].bonus = {};
				TWPro.twpro_setBonus.set_mexican[4].bonus.attributes = {};
				TWPro.twpro_setBonus.set_mexican[4].bonus.attributes.strength = 4;
				TWPro.twpro_setBonus.set_mexican[4].bonus.skills = {};
				TWPro.twpro_setBonus.set_mexican[4].jobBonus = {};
				TWPro.twpro_setBonus.set_mexican[4].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_mexican[4].jobBonus.oil = 70;
				TWPro.twpro_setBonus.set_mexican[4].jobBonus.agave = 60;
				TWPro.twpro_setBonus.set_mexican[4].speedBonus = 36;
				TWPro.twpro_setBonus.set_mexican[4].parsedBonus = {};
				TWPro.twpro_setBonus.set_mexican[5] = {};
				TWPro.twpro_setBonus.set_mexican[5].bonus = {};
				TWPro.twpro_setBonus.set_mexican[5].bonus.attributes = {};
				TWPro.twpro_setBonus.set_mexican[5].bonus.attributes.strength = 6;
				TWPro.twpro_setBonus.set_mexican[5].bonus.skills = {};
				TWPro.twpro_setBonus.set_mexican[5].jobBonus = {};
				TWPro.twpro_setBonus.set_mexican[5].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_mexican[5].jobBonus.oil = 70;
				TWPro.twpro_setBonus.set_mexican[5].jobBonus.smuggle = 80;
				TWPro.twpro_setBonus.set_mexican[5].jobBonus.agave = 60;
				TWPro.twpro_setBonus.set_mexican[5].speedBonus = 48;
				TWPro.twpro_setBonus.set_mexican[5].parsedBonus = {};
				TWPro.twpro_setBonus.set_mexican[6] = {};
				TWPro.twpro_setBonus.set_mexican[6].bonus = {};
				TWPro.twpro_setBonus.set_mexican[6].bonus.attributes = {};
				TWPro.twpro_setBonus.set_mexican[6].bonus.attributes.strength = 9;
				TWPro.twpro_setBonus.set_mexican[6].bonus.skills = {};
				TWPro.twpro_setBonus.set_mexican[6].jobBonus = {};
				TWPro.twpro_setBonus.set_mexican[6].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_mexican[6].jobBonus.dynamite = 90;
				TWPro.twpro_setBonus.set_mexican[6].jobBonus.oil = 70;
				TWPro.twpro_setBonus.set_mexican[6].jobBonus.smuggle = 80;
				TWPro.twpro_setBonus.set_mexican[6].jobBonus.agave = 60;
				TWPro.twpro_setBonus.set_mexican[6].speedBonus = 60;
				TWPro.twpro_setBonus.set_mexican[6].parsedBonus = {};
				TWPro.twpro_setBonus.set_mexican[7] = {};
				TWPro.twpro_setBonus.set_mexican[7].bonus = {};
				TWPro.twpro_setBonus.set_mexican[7].bonus.attributes = {};
				TWPro.twpro_setBonus.set_mexican[7].bonus.attributes.strength = 12;
				TWPro.twpro_setBonus.set_mexican[7].bonus.skills = {};
				TWPro.twpro_setBonus.set_mexican[7].jobBonus = {};
				TWPro.twpro_setBonus.set_mexican[7].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_mexican[7].jobBonus.dynamite = 90;
				TWPro.twpro_setBonus.set_mexican[7].jobBonus.oil = 70;
				TWPro.twpro_setBonus.set_mexican[7].jobBonus.smuggle = 80;
				TWPro.twpro_setBonus.set_mexican[7].jobBonus.agave = 60;
				TWPro.twpro_setBonus.set_mexican[7].jobBonus.alcohol = 100;
				TWPro.twpro_setBonus.set_mexican[7].speedBonus = 72;
				TWPro.twpro_setBonus.set_mexican[7].parsedBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male = [];
				TWPro.twpro_setBonus.set_pilgrim_male[2] = {};
				TWPro.twpro_setBonus.set_pilgrim_male[2].bonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.attributes = {};
				TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.skills = {};
				TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.construct = 5;
				TWPro.twpro_setBonus.set_pilgrim_male[2].speedBonus = 0;
				TWPro.twpro_setBonus.set_pilgrim_male[2].parsedBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[3] = {};
				TWPro.twpro_setBonus.set_pilgrim_male[3].bonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.attributes = {};
				TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.skills = {};
				TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.construct = 15;
				TWPro.twpro_setBonus.set_pilgrim_male[3].speedBonus = 0;
				TWPro.twpro_setBonus.set_pilgrim_male[3].parsedBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[4] = {};
				TWPro.twpro_setBonus.set_pilgrim_male[4].bonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.attributes = {};
				TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.skills = {};
				TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.construct = 30;
				TWPro.twpro_setBonus.set_pilgrim_male[4].speedBonus = 0;
				TWPro.twpro_setBonus.set_pilgrim_male[4].parsedBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[5] = {};
				TWPro.twpro_setBonus.set_pilgrim_male[5].bonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.attributes = {};
				TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.skills = {};
				TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.bible = 150;
				TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.construct = 50;
				TWPro.twpro_setBonus.set_pilgrim_male[5].speedBonus = 0;
				TWPro.twpro_setBonus.set_pilgrim_male[5].parsedBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[6] = {};
				TWPro.twpro_setBonus.set_pilgrim_male[6].bonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[6].bonus.attributes = {};
				TWPro.twpro_setBonus.set_pilgrim_male[6].bonus.skills = {};
				TWPro.twpro_setBonus.set_pilgrim_male[6].jobBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_male[6].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_pilgrim_male[6].jobBonus.bible = 150;
				TWPro.twpro_setBonus.set_pilgrim_male[6].jobBonus.construct = 50;
				TWPro.twpro_setBonus.set_pilgrim_male[6].jobBonus.mission = 175;
				TWPro.twpro_setBonus.set_pilgrim_male[6].speedBonus = 0;
				TWPro.twpro_setBonus.set_pilgrim_male[6].parsedBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female = [];
				TWPro.twpro_setBonus.set_pilgrim_female[2] = {};
				TWPro.twpro_setBonus.set_pilgrim_female[2].bonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.attributes = {};
				TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.skills = {};
				TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.construct = 5;
				TWPro.twpro_setBonus.set_pilgrim_female[2].speedBonus = 0;
				TWPro.twpro_setBonus.set_pilgrim_female[2].parsedBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[3] = {};
				TWPro.twpro_setBonus.set_pilgrim_female[3].bonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.attributes = {};
				TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.skills = {};
				TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.construct = 15;
				TWPro.twpro_setBonus.set_pilgrim_female[3].speedBonus = 0;
				TWPro.twpro_setBonus.set_pilgrim_female[3].parsedBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[4] = {};
				TWPro.twpro_setBonus.set_pilgrim_female[4].bonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.attributes = {};
				TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.skills = {};
				TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.construct = 30;
				TWPro.twpro_setBonus.set_pilgrim_female[4].speedBonus = 0;
				TWPro.twpro_setBonus.set_pilgrim_female[4].parsedBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[5] = {};
				TWPro.twpro_setBonus.set_pilgrim_female[5].bonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.attributes = {};
				TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.skills = {};
				TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.bible = 150;
				TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.construct = 50;
				TWPro.twpro_setBonus.set_pilgrim_female[5].speedBonus = 0;
				TWPro.twpro_setBonus.set_pilgrim_female[5].parsedBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[6] = {};
				TWPro.twpro_setBonus.set_pilgrim_female[6].bonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[6].bonus.attributes = {};
				TWPro.twpro_setBonus.set_pilgrim_female[6].bonus.skills = {};
				TWPro.twpro_setBonus.set_pilgrim_female[6].jobBonus = {};
				TWPro.twpro_setBonus.set_pilgrim_female[6].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_pilgrim_female[6].jobBonus.bible = 150;
				TWPro.twpro_setBonus.set_pilgrim_female[6].jobBonus.construct = 50;
				TWPro.twpro_setBonus.set_pilgrim_female[6].jobBonus.mission = 175;
				TWPro.twpro_setBonus.set_pilgrim_female[6].speedBonus = 0;
				TWPro.twpro_setBonus.set_pilgrim_female[6].parsedBonus = {};
				TWPro.twpro_setBonus.set_quackery = [];
				TWPro.twpro_setBonus.set_quackery[2] = {};
				TWPro.twpro_setBonus.set_quackery[2].bonus = {};
				TWPro.twpro_setBonus.set_quackery[2].bonus.attributes = {};
				TWPro.twpro_setBonus.set_quackery[2].bonus.attributes.dexterity = 1;
				TWPro.twpro_setBonus.set_quackery[2].bonus.skills = {};
				TWPro.twpro_setBonus.set_quackery[2].bonus.skills.endurance = 5;
				TWPro.twpro_setBonus.set_quackery[2].bonus.skills.trade = 5;
				TWPro.twpro_setBonus.set_quackery[2].jobBonus = {};
				TWPro.twpro_setBonus.set_quackery[2].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_quackery[2].jobBonus.quackery = 30;
				TWPro.twpro_setBonus.set_quackery[2].speedBonus = 0;
				TWPro.twpro_setBonus.set_quackery[2].parsedBonus = {};
				TWPro.twpro_setBonus.set_quackery[3] = {};
				TWPro.twpro_setBonus.set_quackery[3].bonus = {};
				TWPro.twpro_setBonus.set_quackery[3].bonus.attributes = {};
				TWPro.twpro_setBonus.set_quackery[3].bonus.attributes.dexterity = 2;
				TWPro.twpro_setBonus.set_quackery[3].bonus.skills = {};
				TWPro.twpro_setBonus.set_quackery[3].bonus.skills.endurance = 10;
				TWPro.twpro_setBonus.set_quackery[3].bonus.skills.trade = 10;
				TWPro.twpro_setBonus.set_quackery[3].jobBonus = {};
				TWPro.twpro_setBonus.set_quackery[3].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_quackery[3].jobBonus.quackery = 60;
				TWPro.twpro_setBonus.set_quackery[3].speedBonus = 0;
				TWPro.twpro_setBonus.set_quackery[3].parsedBonus = {};
				TWPro.twpro_setBonus.set_quackery[4] = {};
				TWPro.twpro_setBonus.set_quackery[4].bonus = {};
				TWPro.twpro_setBonus.set_quackery[4].bonus.attributes = {};
				TWPro.twpro_setBonus.set_quackery[4].bonus.attributes.dexterity = 4;
				TWPro.twpro_setBonus.set_quackery[4].bonus.skills = {};
				TWPro.twpro_setBonus.set_quackery[4].bonus.skills.endurance = 15;
				TWPro.twpro_setBonus.set_quackery[4].bonus.skills.trade = 15;
				TWPro.twpro_setBonus.set_quackery[4].jobBonus = {};
				TWPro.twpro_setBonus.set_quackery[4].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_quackery[4].jobBonus.quackery = 90;
				TWPro.twpro_setBonus.set_quackery[4].speedBonus = 0;
				TWPro.twpro_setBonus.set_quackery[4].parsedBonus = {};
				TWPro.twpro_setBonus.set_quackery[5] = {};
				TWPro.twpro_setBonus.set_quackery[5].bonus = {};
				TWPro.twpro_setBonus.set_quackery[5].bonus.attributes = {};
				TWPro.twpro_setBonus.set_quackery[5].bonus.attributes.dexterity = 6;
				TWPro.twpro_setBonus.set_quackery[5].bonus.skills = {};
				TWPro.twpro_setBonus.set_quackery[5].bonus.skills.endurance = 20;
				TWPro.twpro_setBonus.set_quackery[5].bonus.skills.trade = 20;
				TWPro.twpro_setBonus.set_quackery[5].jobBonus = {};
				TWPro.twpro_setBonus.set_quackery[5].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_quackery[5].jobBonus.quackery = 120;
				TWPro.twpro_setBonus.set_quackery[5].speedBonus = 0;
				TWPro.twpro_setBonus.set_quackery[5].parsedBonus = {};
				TWPro.twpro_setBonus.set_quackery[6] = {};
				TWPro.twpro_setBonus.set_quackery[6].bonus = {};
				TWPro.twpro_setBonus.set_quackery[6].bonus.attributes = {};
				TWPro.twpro_setBonus.set_quackery[6].bonus.attributes.dexterity = 9;
				TWPro.twpro_setBonus.set_quackery[6].bonus.skills = {};
				TWPro.twpro_setBonus.set_quackery[6].bonus.skills.tough = 18;
				TWPro.twpro_setBonus.set_quackery[6].bonus.skills.endurance = 20;
				TWPro.twpro_setBonus.set_quackery[6].bonus.skills.reflex = 18;
				TWPro.twpro_setBonus.set_quackery[6].bonus.skills.aim = 18;
				TWPro.twpro_setBonus.set_quackery[6].bonus.skills.shot = 18;
				TWPro.twpro_setBonus.set_quackery[6].bonus.skills.trade = 20;
				TWPro.twpro_setBonus.set_quackery[6].jobBonus = {};
				TWPro.twpro_setBonus.set_quackery[6].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_quackery[6].jobBonus.quackery = 120;
				TWPro.twpro_setBonus.set_quackery[6].speedBonus = 0;
				TWPro.twpro_setBonus.set_quackery[6].parsedBonus = {};
				TWPro.twpro_setBonus.set_quackery[7] = {};
				TWPro.twpro_setBonus.set_quackery[7].bonus = {};
				TWPro.twpro_setBonus.set_quackery[7].bonus.attributes = {};
				TWPro.twpro_setBonus.set_quackery[7].bonus.attributes.dexterity = 12;
				TWPro.twpro_setBonus.set_quackery[7].bonus.skills = {};
				TWPro.twpro_setBonus.set_quackery[7].bonus.skills.tough = 18;
				TWPro.twpro_setBonus.set_quackery[7].bonus.skills.endurance = 20;
				TWPro.twpro_setBonus.set_quackery[7].bonus.skills.reflex = 18;
				TWPro.twpro_setBonus.set_quackery[7].bonus.skills.aim = 18;
				TWPro.twpro_setBonus.set_quackery[7].bonus.skills.shot = 18;
				TWPro.twpro_setBonus.set_quackery[7].bonus.skills.trade = 20;
				TWPro.twpro_setBonus.set_quackery[7].bonus.skills.appearance = 18;
				TWPro.twpro_setBonus.set_quackery[7].bonus.skills.tactic = 18;
				TWPro.twpro_setBonus.set_quackery[7].bonus.skills.dodge = 18;
				TWPro.twpro_setBonus.set_quackery[7].jobBonus = {};
				TWPro.twpro_setBonus.set_quackery[7].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_quackery[7].jobBonus.con_artist = 50;
				TWPro.twpro_setBonus.set_quackery[7].jobBonus.quackery = 120;
				TWPro.twpro_setBonus.set_quackery[7].speedBonus = 0;
				TWPro.twpro_setBonus.set_quackery[7].parsedBonus = {};
				TWPro.twpro_setBonus.set_quackery[8] = {};
				TWPro.twpro_setBonus.set_quackery[8].bonus = {};
				TWPro.twpro_setBonus.set_quackery[8].bonus.attributes = {};
				TWPro.twpro_setBonus.set_quackery[8].bonus.attributes.dexterity = 12;
				TWPro.twpro_setBonus.set_quackery[8].bonus.skills = {};
				TWPro.twpro_setBonus.set_quackery[8].bonus.skills.tough = 18;
				TWPro.twpro_setBonus.set_quackery[8].bonus.skills.endurance = 20;
				TWPro.twpro_setBonus.set_quackery[8].bonus.skills.reflex = 18;
				TWPro.twpro_setBonus.set_quackery[8].bonus.skills.aim = 18;
				TWPro.twpro_setBonus.set_quackery[8].bonus.skills.shot = 18;
				TWPro.twpro_setBonus.set_quackery[8].bonus.skills.trade = 20;
				TWPro.twpro_setBonus.set_quackery[8].bonus.skills.appearance = 18;
				TWPro.twpro_setBonus.set_quackery[8].bonus.skills.tactic = 18;
				TWPro.twpro_setBonus.set_quackery[8].bonus.skills.dodge = 18;
				TWPro.twpro_setBonus.set_quackery[8].jobBonus = {};
				TWPro.twpro_setBonus.set_quackery[8].jobBonus.all = 0;
				TWPro.twpro_setBonus.set_quackery[8].jobBonus.con_artist = 100;
				TWPro.twpro_setBonus.set_quackery[8].jobBonus.quackery = 120;
				TWPro.twpro_setBonus.set_quackery[8].speedBonus = 50;
				TWPro.twpro_setBonus.set_quackery[8].parsedBonus = {};
				TWPro.twpro_setBonus.set_dancer = [];
				TWPro.twpro_setBonus.set_dancer[2] = {};
				TWPro.twpro_setBonus.set_dancer[2].bonus = {};
				TWPro.twpro_setBonus.set_dancer[2].bonus.attributes = {};
				TWPro.twpro_setBonus.set_dancer[2].bonus.attributes.charisma = 2;
				TWPro.twpro_setBonus.set_dancer[2].bonus.skills = {};
				TWPro.twpro_setBonus.set_dancer[2].bonus.skills.appearance = 10;
				TWPro.twpro_setBonus.set_dancer[2].jobBonus = {};
				TWPro.twpro_setBonus.set_dancer[2].jobBonus.all = 5;
				TWPro.twpro_setBonus.set_dancer[2].speedBonus = 0;
				TWPro.twpro_setBonus.set_dancer[2].parsedBonus = {};
				TWPro.twpro_setBonus.set_dancer[3] = {};
				TWPro.twpro_setBonus.set_dancer[3].bonus = {};
				TWPro.twpro_setBonus.set_dancer[3].bonus.attributes = {};
				TWPro.twpro_setBonus.set_dancer[3].bonus.attributes.charisma = 5;
				TWPro.twpro_setBonus.set_dancer[3].bonus.skills = {};
				TWPro.twpro_setBonus.set_dancer[3].bonus.skills.animal = 10;
				TWPro.twpro_setBonus.set_dancer[3].bonus.skills.appearance = 10;
				TWPro.twpro_setBonus.set_dancer[3].jobBonus = {};
				TWPro.twpro_setBonus.set_dancer[3].jobBonus.all = 15;
				TWPro.twpro_setBonus.set_dancer[3].speedBonus = 0;
				TWPro.twpro_setBonus.set_dancer[3].parsedBonus = {};
				TWPro.twpro_setBonus.set_dancer[4] = {};
				TWPro.twpro_setBonus.set_dancer[4].bonus = {};
				TWPro.twpro_setBonus.set_dancer[4].bonus.attributes = {};
				TWPro.twpro_setBonus.set_dancer[4].bonus.attributes.charisma = 9;
				TWPro.twpro_setBonus.set_dancer[4].bonus.skills = {};
				TWPro.twpro_setBonus.set_dancer[4].bonus.skills.finger_dexterity = 12;
				TWPro.twpro_setBonus.set_dancer[4].bonus.skills.animal = 10;
				TWPro.twpro_setBonus.set_dancer[4].bonus.skills.appearance = 10;
				TWPro.twpro_setBonus.set_dancer[4].jobBonus = {};
				TWPro.twpro_setBonus.set_dancer[4].jobBonus.all = 30;
				TWPro.twpro_setBonus.set_dancer[4].speedBonus = 0;
				TWPro.twpro_setBonus.set_dancer[4].parsedBonus = {};
				TWPro.twpro_setBonus.set_dancer[5] = {};
				TWPro.twpro_setBonus.set_dancer[5].bonus = {};
				TWPro.twpro_setBonus.set_dancer[5].bonus.attributes = {};
				TWPro.twpro_setBonus.set_dancer[5].bonus.attributes.charisma = 11;
				TWPro.twpro_setBonus.set_dancer[5].bonus.skills = {};
				TWPro.twpro_setBonus.set_dancer[5].bonus.skills.finger_dexterity = 12;
				TWPro.twpro_setBonus.set_dancer[5].bonus.skills.animal = 10;
				TWPro.twpro_setBonus.set_dancer[5].bonus.skills.appearance = 16;
				TWPro.twpro_setBonus.set_dancer[5].bonus.skills.endurance = 6;
				TWPro.twpro_setBonus.set_dancer[5].jobBonus = {};
				TWPro.twpro_setBonus.set_dancer[5].jobBonus.all = 50;
				TWPro.twpro_setBonus.set_dancer[5].speedBonus = 0;
				TWPro.twpro_setBonus.set_dancer[5].parsedBonus = {};
				TWPro.twpro_setBonus.set_dancer[6] = {};
				TWPro.twpro_setBonus.set_dancer[6].bonus = {};
				TWPro.twpro_setBonus.set_dancer[6].bonus.attributes = {};
				TWPro.twpro_setBonus.set_dancer[6].bonus.attributes.charisma = 15;
				TWPro.twpro_setBonus.set_dancer[6].bonus.skills = {};
				TWPro.twpro_setBonus.set_dancer[6].bonus.skills.finger_dexterity = 12;
				TWPro.twpro_setBonus.set_dancer[6].bonus.skills.endurance = 18;
				TWPro.twpro_setBonus.set_dancer[6].bonus.skills.animal = 10;
				TWPro.twpro_setBonus.set_dancer[6].bonus.skills.appearance = 25;
				TWPro.twpro_setBonus.set_dancer[6].jobBonus = {};
				TWPro.twpro_setBonus.set_dancer[6].jobBonus.all = 75;
				TWPro.twpro_setBonus.set_dancer[6].speedBonus = 0;
				TWPro.twpro_setBonus.set_dancer[6].parsedBonus = {};
				TWPro.twpro_setBonus.set_dancer[7] = {};
				TWPro.twpro_setBonus.set_dancer[7].bonus = {};
				TWPro.twpro_setBonus.set_dancer[7].bonus.attributes = {};
				TWPro.twpro_setBonus.set_dancer[7].bonus.attributes.charisma = 20;
				TWPro.twpro_setBonus.set_dancer[7].bonus.skills = {};
				TWPro.twpro_setBonus.set_dancer[7].bonus.skills.finger_dexterity = 12;
				TWPro.twpro_setBonus.set_dancer[7].bonus.skills.endurance = 6;
				TWPro.twpro_setBonus.set_dancer[7].bonus.skills.animal = 10;
				TWPro.twpro_setBonus.set_dancer[7].bonus.skills.appearance = 25;
				TWPro.twpro_setBonus.set_dancer[7].jobBonus = {};
				TWPro.twpro_setBonus.set_dancer[7].jobBonus.all = 100;
				TWPro.twpro_setBonus.set_dancer[7].speedBonus = 0;
				TWPro.twpro_setBonus.set_dancer[7].parsedBonus = {};
				TWPro.twpro_setBonus.set_gentleman = [];
				TWPro.twpro_setBonus.set_gentleman[2] = {};
				TWPro.twpro_setBonus.set_gentleman[2].bonus = {};
				TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes = {};
				TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes.charisma = 1;
				TWPro.twpro_setBonus.set_gentleman[2].bonus.skills = {};
				TWPro.twpro_setBonus.set_gentleman[2].bonus.skills.appearance = 8;
				TWPro.twpro_setBonus.set_gentleman[2].jobBonus = {};
				TWPro.twpro_setBonus.set_gentleman[2].jobBonus.all = 5;
				TWPro.twpro_setBonus.set_gentleman[2].speedBonus = 0;
				TWPro.twpro_setBonus.set_gentleman[2].parsedBonus = {};
				TWPro.twpro_setBonus.set_gentleman[3] = {};
				TWPro.twpro_setBonus.set_gentleman[3].bonus = {};
				TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes = {};
				TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes.charisma = 3;
				TWPro.twpro_setBonus.set_gentleman[3].bonus.skills = {};
				TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.leadership = 8;
				TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.appearance = 8;
				TWPro.twpro_setBonus.set_gentleman[3].jobBonus = {};
				TWPro.twpro_setBonus.set_gentleman[3].jobBonus.all = 15;
				TWPro.twpro_setBonus.set_gentleman[3].speedBonus = 0;
				TWPro.twpro_setBonus.set_gentleman[3].parsedBonus = {};
				TWPro.twpro_setBonus.set_gentleman[4] = {};
				TWPro.twpro_setBonus.set_gentleman[4].bonus = {};
				TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes = {};
				TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes.charisma = 6;
				TWPro.twpro_setBonus.set_gentleman[4].bonus.skills = {};
				TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.leadership = 8;
				TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.trade = 8;
				TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.appearance = 8;
				TWPro.twpro_setBonus.set_gentleman[4].jobBonus = {};
				TWPro.twpro_setBonus.set_gentleman[4].jobBonus.all = 30;
				TWPro.twpro_setBonus.set_gentleman[4].speedBonus = 0;
				TWPro.twpro_setBonus.set_gentleman[4].parsedBonus = {};
				TWPro.twpro_setBonus.set_gentleman[5] = {};
				TWPro.twpro_setBonus.set_gentleman[5].bonus = {};
				TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes = {};
				TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes.charisma = 10;
				TWPro.twpro_setBonus.set_gentleman[5].bonus.skills = {};
				TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.leadership = 8;
				TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.trade = 8;
				TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.appearance = 16;
				TWPro.twpro_setBonus.set_gentleman[5].jobBonus = {};
				TWPro.twpro_setBonus.set_gentleman[5].jobBonus.all = 50;
				TWPro.twpro_setBonus.set_gentleman[5].speedBonus = 0;
				TWPro.twpro_setBonus.set_gentleman[5].parsedBonus = {};
				TWPro.twpro_setBonus.set_gentleman[6] = {};
				TWPro.twpro_setBonus.set_gentleman[6].bonus = {};
				TWPro.twpro_setBonus.set_gentleman[6].bonus.attributes = {};
				TWPro.twpro_setBonus.set_gentleman[6].bonus.attributes.charisma = 15;
				TWPro.twpro_setBonus.set_gentleman[6].bonus.skills = {};
				TWPro.twpro_setBonus.set_gentleman[6].bonus.skills.leadership = 8;
				TWPro.twpro_setBonus.set_gentleman[6].bonus.skills.trade = 8;
				TWPro.twpro_setBonus.set_gentleman[6].bonus.skills.appearance = 25;
				TWPro.twpro_setBonus.set_gentleman[6].jobBonus = {};
				TWPro.twpro_setBonus.set_gentleman[6].jobBonus.all = 75;
				TWPro.twpro_setBonus.set_gentleman[6].speedBonus = 0;
				TWPro.twpro_setBonus.set_gentleman[6].parsedBonus = {};
				TWPro.twpro_setBonus.set_gentleman[7] = {};
				TWPro.twpro_setBonus.set_gentleman[7].bonus = {};
				TWPro.twpro_setBonus.set_gentleman[7].bonus.attributes = {};
				TWPro.twpro_setBonus.set_gentleman[7].bonus.attributes.charisma = 20;
				TWPro.twpro_setBonus.set_gentleman[7].bonus.skills = {};
				TWPro.twpro_setBonus.set_gentleman[7].bonus.skills.leadership = 8;
				TWPro.twpro_setBonus.set_gentleman[7].bonus.skills.trade = 20;
				TWPro.twpro_setBonus.set_gentleman[7].bonus.skills.appearance = 25;
				TWPro.twpro_setBonus.set_gentleman[7].jobBonus = {};
				TWPro.twpro_setBonus.set_gentleman[7].jobBonus.all = 100;
				TWPro.twpro_setBonus.set_gentleman[7].speedBonus = 0;
				TWPro.twpro_setBonus.set_gentleman[7].parsedBonus = {};
				TWPro.twpro_setBonus.set_sleeper = [];
				TWPro.twpro_setBonus.set_sleeper[2] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
				TWPro.twpro_setBonus.set_sleeper[3] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
				TWPro.twpro_setBonus.set_sleeper[4] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
				TWPro.twpro_setBonus.set_sleeper[5] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
				TWPro.twpro_setBonus.set_sleeper[6] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
				TWPro.twpro_setBonus.season_set = [];
				TWPro.twpro_setBonus.season_set[2] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:2};
				TWPro.twpro_setBonus.season_set[3] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:6};
				TWPro.twpro_setBonus.season_set[4] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:15};
				TWPro.twpro_setBonus.season_set[5] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:25};
				TWPro.twpro_setBonus.season_set[6] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:37};
				TWPro.twpro_setBonus.season_set[7] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:52};
				TWPro.twpro_setBonus.season_set[8] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:0};
				TWPro.twpro_setBonus.season_set[9] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:0};
				TWPro.twpro_setBonus.season_set[10] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:0};
				TWPro.twpro_setBonus.fireworker_set = [];
				TWPro.twpro_setBonus.fireworker_set[1] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0,fire:15},speedBonus:0,parsedBonus:{}};
				TWPro.twpro_setBonus.gold_set = [];// source: http://wiki-old.the-west.de/wiki/Goldenes_Set_Bonus
				TWPro.twpro_setBonus.gold_set[2] = {bonus:{attributes:{},skills:{health:10}},jobBonus:{all:25},speedBonus:20,parsedBonus:{}};

				TWPro.twpro_setBonus.greenhorn_set = [];
				TWPro.twpro_setBonus.greenhorn_set[2] = {};
				TWPro.twpro_setBonus.greenhorn_set[2].bonus = {};
				TWPro.twpro_setBonus.greenhorn_set[2].bonus.attributes = {};
				TWPro.twpro_setBonus.greenhorn_set[2].bonus.skills = {};
				TWPro.twpro_setBonus.greenhorn_set[2].jobBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[2].jobBonus.all = 0;
				TWPro.twpro_setBonus.greenhorn_set[2].jobBonus.sugar = 10;
				TWPro.twpro_setBonus.greenhorn_set[2].speedBonus = 0;
				TWPro.twpro_setBonus.greenhorn_set[2].parsedBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[3] = {};
				TWPro.twpro_setBonus.greenhorn_set[3].bonus = {};
				TWPro.twpro_setBonus.greenhorn_set[3].bonus.attributes = {};
				TWPro.twpro_setBonus.greenhorn_set[3].bonus.skills = {};
				TWPro.twpro_setBonus.greenhorn_set[3].jobBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[3].jobBonus.all = 0;
				TWPro.twpro_setBonus.greenhorn_set[3].jobBonus.wood = 20;
				TWPro.twpro_setBonus.greenhorn_set[3].jobBonus.sugar = 10;
				TWPro.twpro_setBonus.greenhorn_set[3].speedBonus = 0;
				TWPro.twpro_setBonus.greenhorn_set[3].parsedBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[4] = {};
				TWPro.twpro_setBonus.greenhorn_set[4].bonus = {};
				TWPro.twpro_setBonus.greenhorn_set[4].bonus.attributes = {};
				TWPro.twpro_setBonus.greenhorn_set[4].bonus.skills = {};
				TWPro.twpro_setBonus.greenhorn_set[4].jobBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.all = 0;
				TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.tanning = 20;
				TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.wood = 20;
				TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.sugar = 10;
				TWPro.twpro_setBonus.greenhorn_set[4].speedBonus = 0;
				TWPro.twpro_setBonus.greenhorn_set[4].parsedBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[5] = {};
				TWPro.twpro_setBonus.greenhorn_set[5].bonus = {};
				TWPro.twpro_setBonus.greenhorn_set[5].bonus.attributes = {};
				TWPro.twpro_setBonus.greenhorn_set[5].bonus.skills = {};
				TWPro.twpro_setBonus.greenhorn_set[5].jobBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.all = 0;
				TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.turkey = 20;
				TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.tanning = 20;
				TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.wood = 20;
				TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.sugar = 10;
				TWPro.twpro_setBonus.greenhorn_set[5].speedBonus = 0;
				TWPro.twpro_setBonus.greenhorn_set[5].parsedBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[6] = {};
				TWPro.twpro_setBonus.greenhorn_set[6].bonus = {};
				TWPro.twpro_setBonus.greenhorn_set[6].bonus.attributes = {};
				TWPro.twpro_setBonus.greenhorn_set[6].bonus.skills = {};
				TWPro.twpro_setBonus.greenhorn_set[6].jobBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.all = 0;
				TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.cow = 20;
				TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.turkey = 20;
				TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.tanning = 20;
				TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.wood = 20;
				TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.sugar = 10;
				TWPro.twpro_setBonus.greenhorn_set[6].speedBonus = 0;
				TWPro.twpro_setBonus.greenhorn_set[6].parsedBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[7] = {};
				TWPro.twpro_setBonus.greenhorn_set[7].bonus = {};
				TWPro.twpro_setBonus.greenhorn_set[7].bonus.attributes = {};
				TWPro.twpro_setBonus.greenhorn_set[7].bonus.skills = {};
				TWPro.twpro_setBonus.greenhorn_set[7].jobBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.all = 5;
				TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.cow = 20;
				TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.turkey = 20;
				TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.tanning = 20;
				TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.wood = 20;
				TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.sugar = 10;
				TWPro.twpro_setBonus.greenhorn_set[7].speedBonus = 0;
				TWPro.twpro_setBonus.greenhorn_set[7].parsedBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[8] = {};
				TWPro.twpro_setBonus.greenhorn_set[8].bonus = {};
				TWPro.twpro_setBonus.greenhorn_set[8].bonus.attributes = {};
				TWPro.twpro_setBonus.greenhorn_set[8].bonus.attributes.strength = 1;
				TWPro.twpro_setBonus.greenhorn_set[8].bonus.attributes.charisma = 1;
				TWPro.twpro_setBonus.greenhorn_set[8].bonus.skills = {};
				TWPro.twpro_setBonus.greenhorn_set[8].jobBonus = {};
				TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.all = 15;
				TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.cow = 20;
				TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.turkey = 20;
				TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.tanning = 20;
				TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.wood = 20;
				TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.sugar = 10;
				TWPro.twpro_setBonus.greenhorn_set[8].speedBonus = 20;
				TWPro.twpro_setBonus.greenhorn_set[8].parsedBonus = {};

				TWPro.twpro_setBonus.tw_times_set = [];
				/* thanks to AnaDoro for the information */
				TWPro.twpro_setBonus.tw_times_set[1] = {};
				TWPro.twpro_setBonus.tw_times_set[1].bonus = {};
				TWPro.twpro_setBonus.tw_times_set[1].bonus.attributes = {};
				TWPro.twpro_setBonus.tw_times_set[1].bonus.skills = {};
				TWPro.twpro_setBonus.tw_times_set[1].jobBonus = {};
				TWPro.twpro_setBonus.tw_times_set[1].jobBonus.all = 0;
				TWPro.twpro_setBonus.tw_times_set[1].jobBonus.print = 25;
				TWPro.twpro_setBonus.tw_times_set[1].jobBonus.newspaper = 25;
				TWPro.twpro_setBonus.tw_times_set[1].speedBonus = 0;
				TWPro.twpro_setBonus.tw_times_set[1].parsedBonus = {};
			};
			for(var set in TWPro.twpro_setBonus){
				for(var i=0; i<TWPro.twpro_setBonus[set].length; i++){
					if (TWPro.twpro_setBonus[set][i] && TWPro.twpro_setBonus[set][i].bonus) {
						TWPro.twpro_setBonus[set][i].jobBonus.speed = ((TWPro.twpro_setBonus[set][i].bonus.attributes && TWPro.twpro_setBonus[set][i].bonus.attributes.flexibility || 0)
						+ (TWPro.twpro_setBonus[set][i].bonus.skills && TWPro.twpro_setBonus[set][i].bonus.skills.ride || 0));
					}
				}
			}
			TWPro.set_names = {};
			for(var internal_name in TWPro.twpro_setBonus){
				TWPro.set_names[internal_name] = '<em>'+internal_name+'</em>';
			}
			TWPro.twpro_invHash = '';
			TWPro.twpro_itemStorage = {};
			if (TWPro.twpro_active) {
/*				var newAjaxWindowShow = AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/, 'if(data.page){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,params);').replace(/this\.evalJS\(\);/, 'this.twpro_extendeName=extendeName;this.twpro_params=params;if(data.js)this.jsContent=data.js;this.evalJS();'),
				newAjax_index = newAjaxWindowShow.lastIndexOf('new Ajax(');
				newAjaxWindowShow = newAjaxWindowShow.substring(0,newAjax_index)+newAjaxWindowShow.substring(newAjax_index).replace(/([^A-Za-z0-9_$])extendeName([^A-Za-z0-9_$])/g, '$1(data.newExtendeName||extendeName)$2');
				AjaxWindow.show = eval("(" + newAjaxWindowShow + ")");
*/
				modify_function(AjaxWindow, "show", 0,
								[/if *\(data\.page *!= *undefined\) *{/, 'if(data.page){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,params);'],
								[/this\.evalJS\(\);/, 'this.twpro_extendeName=data.newExtendeName||extendeName;this.twpro_params=params;if(data.js)this.jsContent=data.js;this.evalJS();'],
								[/(if *\(\$\((['"])window_\2 *\+|that\.windows\[|setJSHTML\(\$\((['"])window_\2 *\+) *extendeName/g, "$1(data.newExtendeName||extendeName)"]
							   );

				modify_function(Ajax.prototype, "evalJS", 0,
								[/eval\(this\.jsContent\);/, "TWPro.twpro_injectionSwitch(this.twpro_extendeName,'js',this,this.twpro_params);try{eval(this.jsContent);}catch(e){new HumanMessage('TW Pro detected an error in Ajax.evalJS: '+e);TWPro.debug_log(e,'Ajax.evalJS');TWPro.debug_log('JS:'+this.jsContent)}TWPro.twpro_injectionSwitch(this.twpro_extendeName,'after',this,this.twpro_params);"]
								);
				
				WEvent.register('inventory_add', {
					exec: function(data){data=typeof data=='string'?Json.evaluate(data[0]):data[0];setTimeout(TWPro.twpro_changeItem, 0, {inv_id:data.inv_id})}
				});
				WEvent.register('inventory_remove', {
					exec: function(inv_id){setTimeout(TWPro.twpro_changeItem, 0, {inv_id:inv_id,deleted:1})}
				});
				// Wear.add() removed, Wear.uncarry() -> WEvent handles it now
				// Wear.uncarry() removed, WEvent handles it now
				// removed TWPro.changeItem() from Bag.getInstance().add() because WEvent handles it now
				modify_function(Bag.getInstance(), "add", 0,
								[/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g, '(TWPro.twpro_activeJob())?($1$1):($1wear_$1+item.get_type()+$1_highlight$1)']
								);
				// Bag.getInstance().carry removed, WEvent handles it now
				modify_function(ItemPopup.prototype, "getXHTML", 0,
								[/if\s*\(item\.price/, "xhtml+=TWPro.twpro_popup(item);", {pos:"L",catch_errors:1}],
								["width:250px", ""]
								);
			}
			TWPro.twpro_world = location.hostname.match(/^[^.]+/)[0];
			var twpro_support = document.createElement('div');
			twpro_support.id = 'twpro_support';
			twpro_support.style.cssText = 'position:absolute; color:#656565; font-size:10px; margin-left:2px; z-index:2';
			var twpro_supportLink = document.createElement('a');
			twpro_supportLink.id = 'twpro_supportLink';
			twpro_supportLink.href = 'http://twpro.lekensteyn.nl/';
			twpro_supportLink.target = '_blank';
			//twpro_supportLink.appendChild(document.createTextNode(TWPro.lang.WEBSITE));
			var twpro_supportAuthor = document.createElement('span');
			twpro_supportAuthor.id = 'twpro_supportAuthor';
			twpro_supportAuthor.appendChild(document.createTextNode(TWPro.authors));
			twpro_support.appendChild(document.createTextNode("TW Pro " + twpro_currentVersion + ": "));
			twpro_support.appendChild(twpro_supportLink);
			var twpro_author_text = document.createElement("span");
			twpro_author_text.id = "twpro_supportAuthorText";
			//twpro_support.appendChild(document.createTextNode(' '+TWPro.lang.AUTHOR+': '));
			twpro_support.appendChild(twpro_author_text);
			twpro_support.appendChild(twpro_supportAuthor);
			
			//var translator = TWPro.lang.info;
			var translator_text = document.createElement("span");
			translator_text.id = "twpro_supportTranslatorText";
			twpro_support.appendChild(translator_text);
			var twpro_translatorLink = document.createElement("a");
			twpro_translatorLink.id = "twpro_supportTranslatorLink";
			twpro_translatorLink.target = '_blank';
			twpro_support.appendChild(twpro_translatorLink);
			
			twpro_support.appendChild(document.createTextNode(" ("));
			var langChanger = document.createElement("a");
			langChanger.appendChild(document.createTextNode("change language"));
			langChanger.href = "javascript://Change language";
			langChanger.onclick = function() {
				var langcodes = [];
				for (var lang in twpro_langs) {
					langcodes.push(lang);
				}
				do {
					var newlang = prompt("Enter the language code, possible values:\n" + langcodes.join(" / "), twpro_langname);
					if (newlang) {
						if(newlang in twpro_langs) {
							window.twpro_initLanguage(newlang);
							break;
						} else {
							alert("\"" + newlang + "\" is not a valid language code, possible values:\n" + langcodes.join(" / "));
						}
					}
				} while (newlang);
			};
			twpro_support.appendChild(langChanger);
			twpro_support.appendChild(document.createTextNode(")"));
			
			if (typeof twpro_langs != "undefined" && typeof twpro_langname != "undefined" && !(twpro_langname in twpro_langs)) {
				var translate_div = document.createElement("div");
				translate_div.style.cssText = "position: absolute; top: 5px; z-index: 999; background-color: #ff9c00;";
				var translate_link = document.createElement("a");
				translate_link.target = "_blank";
				translate_link.href = "http://twpro.lekensteyn.nl/translate.php?lang=" + encodeURIComponent(twpro_langname) + "&player=" + encodeURIComponent(Character.name);
				translate_link.appendChild(document.createTextNode("This world is missing translations. You can improve TW Pro by submitting translations for \"" + twpro_langname + "\""));
				translate_div.appendChild(translate_link);
				var translate_div_close = document.createElement("button");
				translate_div_close.innerHTML = "Hide this message";
				translate_div_close.onclick = function() {
					translate_div.parentNode.removeChild(translate_div);
				}
				translate_div.appendChild(translate_div_close);
				//document.getElementById("screensizer").appendChild(translate_div);
			}
			if (!TWPro.twpro_active) {
				twpro_support.appendChild(document.createTextNode(" ("+TWPro.lang.TWPRO_DISABLED+")"));
			}
			var ib = document.getElementById('main_footnotes');
			ib.insertBefore(twpro_support, ib.firstChild);
			window.twpro_initLanguage();
		}
	
	
		function twpro_preference(pref, enabledValue){
			if(!(pref in TWPro.prefs)) return false;
			var prefVal = TWPro.prefs[pref];
			if(typeof enabledValue == 'undefined'){
				if(typeof prefVal != 'number') return prefVal;
				return TWPro.prefNumber & prefVal;
			}
			if(typeof prefVal != 'number'){
				document.cookie = 'twpro_'+pref+'='+enabledValue+'; max-age=5184000';
				return enabledValue;
			}
			if(enabledValue) TWPro.prefNumber |= prefVal;
			else TWPro.prefNumber = (TWPro.prefNumber | prefVal) - prefVal;
			document.cookie = 'twpro_prefs='+TWPro.prefNumber+'; max-age=5184000';
			return enabledValue;
		}
	
	
		function twpro_injectionSwitch(twpro_extendeName, twpro_injectionType, twpro_data, twpro_params) {
			if (TWPro.twpro_failure) return;
			if (!twpro_extendeName) return;
			try {
				switch (twpro_injectionType) {
				case 'page':
					{
						if (twpro_extendeName == 'inventory') {
							TWPro.twpro_internalWindowToTop("window_inventory");
							TWPro.twpro_insertList(twpro_data);
						}
						else if(twpro_extendeName == 'item_trader'){
							TWPro.twpro_getPlace(twpro_data, twpro_extendeName);
						}
						else if(twpro_extendeName.substr(0, 16) == 'building_market_'){
							var town_id = twpro_extendeName.match(/\d+/),
							market_id = twpro_data.page.match(/InventoryTownTraderControl\(AjaxWindow\.getWindowDivId\('market',\d+\)\), 'market', '(\d+)'\);/);
							if(!town_id || !market_id) return;
							market_id = market_id[1];
							TWPro.searchTrader[town_id] = {timer:null};
							(new Image()).src = 'http://twpro.lekensteyn.nl/loading.gif';
							twpro_data.page = twpro_data.page.replace(/top:18px' id="market_\d+_inv_div"><\/div>/, 'height:350px;$&<div style="margin-top:19px;position:relative;"><label style="position:absolute;top:4px;left:21px;font-style:italic;color:#636;cursor:pointer" for="twpro_market_'+town_id+'_search" class="twpro_lang_SEARCHINVENTORY">'+TWPro.lang.SEARCHINVENTORY+'</label><input type="text" style="width:150px;background:#fff url(http://twpro.lekensteyn.nl/search.png) no-repeat scroll 0 0;padding:0 2px 0 19px" id="twpro_market_'+town_id+'_search" onfocus="previousSibling.style.display=\'none\'" onblur="if(this.value==\'\')previousSibling.style.display=\'block\'" onkeyup="TWPro.twpro_searchTrader(event.keyCode==13,null,'+town_id+', '+market_id+')" /><span id="twpro_search_help" style="font-weight:bold;color:#191970;cursor:help;background:#D4C7B0;width:20px;height:17px" title="'+TWPro.lang.SEARCHHELP+'">?</span></div>');
						}
						else if(twpro_extendeName.substr(0, 4) == 'job_' || twpro_extendeName.substr(0, 15) == 'cityhall_build_'){
							var workSpeed = (twpro_data.js ? twpro_data.js.match(/JobCalculation\.workSpeed\s*=\s*([^;]+);/) : JobCalculation.workSpeed)||[,1];
							var hours = workSpeed[1] * 2,
								seconds = hours * 3600;
							twpro_data.page = twpro_data.page.replace(new RegExp('(value="'+seconds+'")( label="'+hours+' .+?")?>'+hours+' '), '$1$2 selected="selected">'+hours+' ');
						}
						else if(twpro_extendeName.substr(0, 13) == 'reports_show_'){
							if(twpro_data.page.match(/<object /)){
								twpro_data.page = twpro_data.page.replace('width: 460px; height: 270px;', 'width: 414px; height: 243px;').replace(/height="270"/g, 'height="243"').replace(/width="460"/g, 'width="414"').replace('</object>', '</object><br />');
							}
							twpro_data.page = convertduelreport('window_'+twpro_extendeName, twpro_data.page);
						}
						else if(twpro_extendeName.substr(0, 7) == 'profile' && twpro_params && false){
							/*this hack is better suited for AjaxWindow.show, before doing request */
						/* hack to have one profile window */
							if(typeof twpro_params.player_name == "string"){
								var char_id = twpro_data.page.match(/WMap\.scroll_map_to_player\((\d+)\);/),
								profile_name = 'profile_'+decodeURIComponent(twpro_params.player_name);
								if(!char_id) break;
								twpro_params.char_id = char_id[1]; 
								char_id = 'profile_'+char_id[1];
								var oldWindow = document.getElementById("window_"+char_id);
								if(oldWindow){
									document.getElementById("window_"+profile_name).style.cssText = oldWindow.style.cssText;
									document.getElementById("window_"+profile_name).style.zIndex = lastIndex;
									AjaxWindow.close(char_id);
								}
								document.getElementById("window_"+profile_name).id = "window_"+char_id;
								document.getElementById("window_"+profile_name+"_title").id = "window_"+char_id+"_title";
								document.getElementById("window_"+char_id+"_title").firstChild.innerHTML = "window_"+char_id+"_title";
								document.getElementById("window_"+profile_name+"_content").id = "window_"+char_id+"_content";
								twpro_profile = document.getElementById("window_"+char_id).getElementsByTagName("a");
								twpro_profile[0].href = "javascript:AjaxWindow.show('profile',{char_id:'"+char_id.substr(8)+"'}, '"+char_id.substr(8)+"');";
								twpro_profile[2].href = decodeURIComponent(twpro_profile[2].href).replace(profile_name, char_id);
								twpro_profile[3].href = decodeURIComponent(twpro_profile[3].href).replace(profile_name, char_id);
								twpro_data.page = twpro_data.page.replace(new RegExp(profile_name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "gi"), char_id);
								twpro_data.js = twpro_data.js.replace(new RegExp(profile_name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "gi"), char_id);
								AjaxWindow.windows[char_id] = AjaxWindow.windows[profile_name];
								AjaxWindow.windows[profile_name] = null;
								delete twpro_params.player_name;
								delete AjaxWindow.windows[profile_name];
								twpro_data.newExtendeName = char_id;
								
							}
						}
						else if(twpro_extendeName.substr(0, 14) == 'building_quest' && twpro_params && twpro_params.town_id) {
							var town_id = twpro_params.town_id,
								i_name = "building_quest",
								i_old = i_name+"_"+town_id,
								win_name = "window_building_quest",
								win_old = win_name+"_"+town_id;
							var oldWindow = document.getElementById(win_name);
								if(oldWindow){
									document.getElementById(win_old).style.cssText = oldWindow.style.cssText;
									document.getElementById(win_old).style.zIndex = lastIndex;
									AjaxWindow.close(i_name);
								}
								document.getElementById(win_old).id = win_name;
								document.getElementById(win_old+"_title").id = win_name+"_title";
								document.getElementById(win_name+"_title").firstChild.innerHTML = win_name+"_title";
								document.getElementById(win_old+"_content").id = win_name+"_content";
								twpro_profile = document.getElementById(win_name).getElementsByTagName("a");
								twpro_profile[0].href = "javascript:AjaxWindow.show('building_quest');";
								twpro_profile[2].href = decodeURIComponent(twpro_profile[2].href).replace("_"+town_id, "");
								twpro_profile[3].href = decodeURIComponent(twpro_profile[3].href).replace("_"+town_id, "");
								twpro_data.page = twpro_data.page.replace("building_quest_"+town_id, "building_quest");
								twpro_data.js = twpro_data.js.replace("building_quest_"+town_id, "building_quest");
								AjaxWindow.windows[i_name] = AjaxWindow.windows[i_old];
								AjaxWindow.windows[i_old] = null;
								delete twpro_params.town_id;
								delete AjaxWindow.windows[i_old];
								twpro_data.newExtendeName = i_name;
						}
						else if (twpro_extendeName.substr(0, 5) == "town_") {
							var xy = twpro_extendeName.split("_"),
								town_id = twpro_data.page && twpro_data.page.match(/<img src="img\.php\?type=townname&amp;value=(\d+)/);
							town_id = town_id ? 1 * town_id[1] : 0;
							var is_home_town = Character.get_home_town_id() === town_id;
							if (twpro_data.js && (Character.characterClass == "adventurer" || is_home_town)) {
								var hotel_level = twpro_data.js.match(/\$E\('\.imagemap_hotel', '[^']+'[^']+'<b>[^<]+<\/b> \(.+? (\d+)/);
								if (hotel_level) {
									hotel_level = 1 * hotel_level[1];
									// if this is not a home town, choose a
									// lower, free room
									if (!is_home_town) {
										var max_hotel_level = 2;
										// adventurers with a character bonus
										// can sleep in better rooms
										if (Character.characterClass == "adventurer" && PremiumBoni.hasBonus("character")) {
											max_hotel_level *= 2;
										}
										hotel_level = Math.min(hotel_level, max_hotel_level);
									}
									twpro_data.page = twpro_data.page.replace('<img src="images/town/hotel', '<img alt="" src="img.php?type=button&amp;subtype=normal&amp;value=sleep" style="position: absolute; top: 265px; left: 500px; cursor: pointer; z-index: 10;" onclick="TWPro.twpro_sleep_hotel(' + town_id + ', ' + hotel_level + ')"/>$&');
								}
							}
						}
						else if (twpro_extendeName.substr(0, 5) == "fort_") {
							var fort_id = twpro_data.page && twpro_data.page.match(/<img src="img\.php\?type=fortname&amp;value=(\d+)/),
								extra_css = /('|\\")fort_profile_\d+_deposit\1/.test(twpro_data.js) ? "" : "display: none; ";
							if (fort_id) {
								twpro_data.page = twpro_data.page.replace('<img src="images/fort/barracks_', '<img alt="" src="img.php?type=button&amp;subtype=normal&amp;value=sleep" style="' + extra_css + 'position: absolute; top: 110px; left: 345px; cursor: pointer; z-index: 10;" onclick="Hotel.start_barrack_sleep(' + fort_id[1] + ')" id="twpro_fort_sleep_button_' + twpro_extendeName + '" />$&');
							}
						}
						break;
					}
				case 'js':
					{
		
						if ((twpro_extendeName == 'inventory') || (twpro_extendeName.substr(0, 15) == 'building_tailor') || (twpro_extendeName.substr(0, 17) == 'building_gunsmith') || (twpro_extendeName.substr(0, 16) == 'building_general')) {
							TWPro.twpro_getPlace(twpro_data, twpro_extendeName);
						}
						else if(twpro_extendeName.substr(0, 7) == 'profile'){
							if(typeof twpro_params.player_name == "string" && false){
								var char_id = twpro_data.page.match(/WMap\.scroll_map_to_player\((\d+)\);/),
								profile_name = 'profile_'+decodeURIComponent(twpro_params.player_name);
								if(!char_id) break;
								twpro_data.js = twpro_data.js.replace(new RegExp(profile_name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "gi"), char_id);
								twpro_data.js = "alert(1)";
								AjaxWindow.windows[char_id] = AjaxWindow.windows[profile_name];
								AjaxWindow.windows[profile_name] = null;
								delete twpro_params.player_name;
								delete AjaxWindow.windows[profile_name];
								twpro_data.newExtendeName = char_id;
								
							}
							try{
								var who = twpro_data.response.text.match(/messages', {addressee:'([^']+)'}/);
								if(who){
									try{
										who = Json.evaluate('"'+who[1]+'"');
									}
									catch(e){
										who = null;
									}
								}
								if(!who){
									who = $('window_'+twpro_extendeName).getElement('.char_name');
									who = (who.textContent ? who.textContent : who.innerText).replace(/^\s+/, '').replace(/ \([^)]+\)$/, '');
								}
								if(who) (new Ajax('/game.php?window=ranking&mode=ajax_duels',
								{
									data: {
										type: 'duels',
										page: 0,
										skill: 0,
										search: who,
										rank: 0,
										action: 'search'
									},
									method: 'post',
									onComplete: function(resp){
										if(resp){
											var re=new RegExp("'"+twpro_extendeName.substr(8)+"'\\);\\\\\">[^<]+<\\\\\\/a><\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>\\d+<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(\\d+)<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(\\d+)<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(-?\\d+)<"), d = resp.match(re);
											if(d){
													var tr = document.createElement('tr'),
														td = document.createElement('td');
													td.colSpan = '2';
													td.style.cssText = "max-width:212px;font-size:8pt;";
													var trans = resp.match(/("gew|"ver|diff)\\">[^.<]+/g);
													td.appendChild(document.createTextNode(eval('"' + trans[0].substr(7) + ": " + d[1] + "; " + trans[1].substr(7) + ": " + d[2] + "; " + trans[2].substr(7) + ": " + d[3] + '"')));
													tr.appendChild(td);
													var rp = $('window_'+twpro_extendeName).getElement('.rank').parentNode;
													rp.nextSibling.nextSibling.cells[0].style.padding = '0';
													rp.parentNode.insertBefore(tr, rp.nextSibling);
													rp.parentNode.parentNode.style.borderCollapse = 'collapse';
											}
										}
									}
								})).request();
							}
							catch(e){}
						}
						break;
					}
				case 'after':
					{
		
						if (twpro_extendeName == 'inventory') {
							var specialMessageDiv = document.getElementById("twpro_specialMessage");
							if(specialMessageDiv) specialMessageDiv.innerHTML = "";
							else{
								specialMessageDiv = document.createElement("div");
								specialMessageDiv.id = "twpro_specialMessage";
								specialMessageDiv.style.cssText = "position: absolute; font-size: 12px; top: 0px; height: 2em; right: 80px; overflow: hidden; width: 200px; z-index: 10;";
								document.getElementById("window_inventory_title").appendChild(specialMessageDiv);
							}
							TWPro.twpro_showList();
						}
						else if (twpro_extendeName == "messages") {
							//insertbbcodesfunc(messagebox, false);
							/* TODO add extra BB buttons for img, quote, size, color */
						}
						else if(twpro_extendeName.substr(0, 15) == 'building_tailor' || twpro_extendeName.substr(0, 17) == 'building_gunsmith' || twpro_extendeName.substr(0, 16) == 'building_general'){
							TWPro.twpro_multisale(twpro_extendeName);
						}
						else if (twpro_extendeName.substr(0, 5) == "fort_") {
							/* forts shared by allied towns */
							var btnSleep = document.getElementById("twpro_fort_sleep_button_" + twpro_extendeName);
							if (btnSleep && btnSleep.style.display == "none") {
								var fort_id = btnSleep.getAttribute("onclick").match(/\d+/);
								(new Ajax("game.php?window=fort_building_barracks&fort_id=" + fort_id, {
									method: "post",
									data: {},
									onComplete: function (data) {
										if (data.indexOf('<img src=\\"images\\/hotel_stars\\/star') != -1) {
											btnSleep.style.display = "";
										}
									}
								})).request();
							}
						}
						break;
					}
				}
			} catch (e) {
				TWPro.debug_log(e, "twpro_injectionSwitch");
				TWPro.debug_log({wpro_extendeName:twpro_extendeName, twpro_injectionType:twpro_injectionType, twpro_data:twpro_data, twpro_params:twpro_params});
				new HumanMessage("TW Pro: Processing error for type " + twpro_injectionType + " on window " + twpro_extendeName + ": " + e);
			}
		}

		var skill_to_AttNum = {
			build: ["strength", 0],
			punch: ["strength", 1],
			tough: ["strength", 2],
			endurance: ["strength", 3],
			health: ["strength", 4],
	
			ride: ["flexibility", 0],
			reflex: ["flexibility", 1],
			dodge: ["flexibility", 2],
			hide: ["flexibility", 3],
			swim: ["flexibility", 4],
	
			aim: ["dexterity", 0],
			shot: ["dexterity", 1],
			pitfall: ["dexterity", 2],
			finger_dexterity: ["dexterity", 3],
			repair: ["dexterity", 4],
	
			leadership: ["charisma", 0],
			tactic: ["charisma", 1],
			trade: ["charisma", 2],
			animal: ["charisma", 3],
			appearance: ["charisma", 4]
		};
		function twpro_bestLifeRestore(){
			var bag_items = Bag.getInstance().items, wear={}, iid, type, item, order=[], i, setcount=0,
			dlife = Character.characterClass == "soldier"?15:10,
			lifes = 90 + 10 * Character.level + dlife * Character.skills.health, newlifes,
			sleeper_bonuses =
				[	[.00,  00]/*0*/,
					[.00, .06]/*1*/,
					[.06, .02]/*2*/,
					[.08, .04]/*3*/,
					[.12, .06]/*4*/,
					[.18, .07]/*5*/,
					[.25,  00]/*6*/
				],
			twpro_job = {
				twpro_calculation: "(90 + 10 * Character.level + (Character.characterClass=='soldier'?15:10) * ((Character.bonus.attributes.health||0) + (Character.skills.health||0))) * TWPro.twpro_sleeperBonus()",
				malus: -1,
				name: TWPro.lang.REGENERATION,
				shortName: "regeneration",
				twpro_jobid: 0,//////////// TWPro.twpro_jobs.length
				twpro_skill: Character.skills.health,////// min level
				twpro_skills: "0",
				twpro_attributes: "0",
				twpro_bestStats: {},
				twpro_aps: 0,
				twpro_parsedItemBonus: {},// Set items...
				twpro_bestCombi: {},// Set items...
				twpro_noSetAps: 0,
				luckItemValue: 0,
				money: 0,
				maxlifes: 0,
				sleepCount: 0
			},
			bestStats, items,
			mexican=1,
			donkey=[];
			
			for(type=0; type<TWPro.twpro_bag.twpro_types.length; type++){
				wear[TWPro.twpro_bag.twpro_types[type]] = [[]/*sleeper item & best item*/, [{twpro_jobbonus:{regeneration:0}}]/*lifepoints bonus item*/, []/*Mexican set?*/];
			}
			for(type in Wear.wear){
				if((item=Wear.wear[type].obj) && item.set && item.set.key == "set_sleeper" && TWPro.twpro_wearItem(item)){
					if(!wear[item.type][0][0]) setcount++;
					wear[item.type][0].push(item);
				}
				else if(item.bonus && (newlifes=(item.bonus.skills && item.bonus.skills.health || 0)+(item.bonus.attributes && item.bonus.attributes.strength || 0)) && TWPro.twpro_wearItem(item)){
					if(!item.twpro_jobbonus) item.twpro_jobbonus = {};
					if(!TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus = {};
					TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus.regeneration = item.twpro_jobbonus.regeneration = dlife * newlifes;
					if(dlife*newlifes == wear[item.type][1][0].twpro_jobbonus.regeneration){
						wear[item.type][1].push(item);
					}
					else if(dlife*newlifes > wear[item.type][1][0].twpro_jobbonus.regeneration){
						wear[item.type][1] = [item];
					}
				}
				if(item.set && item.set.key == "set_mexican" && TWPro.twpro_wearItem(item)){
					if(item["short"] == "donkey"){
						donkey.push(item);
					}
					else wear[item.type][2].push(item);
				}
			}
			for(iid in bag_items){
				if((item=bag_items[iid].obj) && item.set && item.set.key == "set_sleeper" && TWPro.twpro_wearItem(item)){
					if(!wear[item.type][0][0]) setcount++;
					wear[item.type][0].push(item);
				}
				else if(item.bonus && (newlifes=(item.bonus.skills && item.bonus.skills.health || 0)+(item.bonus.attributes && item.bonus.attributes.strength || 0)) && TWPro.twpro_wearItem(item)){
					if(!item.twpro_jobbonus) item.twpro_jobbonus = {};
					if(!TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus = {};
					TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus.regeneration = item.twpro_jobbonus.regeneration = dlife * newlifes;
					if(dlife*newlifes == wear[item.type][1][0].twpro_jobbonus.regeneration){
						wear[item.type][1].push(item);
					}
					else if(dlife*newlifes > wear[item.type][1][0].twpro_jobbonus.regeneration){
						wear[item.type][1] = [item];
					}
				}
				if(item.set && item.set.key == "set_mexican" && TWPro.twpro_wearItem(item)){
					if(item["short"] == "donkey"){
						donkey.push(item);
					}
					else wear[item.type][2].push(item);
				}
			}
			
			for(type in wear){
				if(wear[type][1][0].twpro_jobbonus.regeneration){
					order.push(wear[type][1]);
				}
			}
			order.sort(function(x,y){return y[0].twpro_jobbonus.regeneration-x[0].twpro_jobbonus.regeneration;});
			
			for(i=order.length-1; i>=0; i--){
				type = order[i][0].type;
				if(!wear[type][0][0]){
					wear[type][0] = order[i];
					lifes += order[i][0].twpro_jobbonus.regeneration;
					order.splice(i, 1);
				}
			}
			for(i=0; i<order.length; i++){
				type = order[i][0].type;
				newlifes = lifes + order[i][0].twpro_jobbonus.regeneration;
				if(lifes * (1+sleeper_bonuses[setcount--][0]) < newlifes * (1+sleeper_bonuses[setcount][0])){
					wear[type][0] = order[i];
					lifes = newlifes;
					continue;
				} else{
					// All other sleeper set items will > the other Lifepoints clothing
					setcount++;
					break;
				}
			}
			if(donkey.length){//if a donkey exists, mexican=1 counts for donkey
				nextWearType:for(type in wear){
					if(!wear[type][0][0] && wear[type][2][0]){
						mexican++;
					}
					else{
						for(i=0; i<wear[type][0].length; i++){
							if(wear[type][0][i].set && wear[type][0][i].set.key == "set_mexican"){
								mexican++;
								continue nextWearType;
							}
						}
						wear[type][2] = [];
					}
				}
				if(mexican > 1){
					for(type in wear){
						if(wear[type][2][0]){
							for(i=0; i<wear[type][2].length; i++){
								if(!wear[type][2][i].twpro_jobbonus) wear[type][2][i].twpro_jobbonus = {regeneration:0};
								wear[type][2][i].twpro_jobbonus.regeneration++;
							}
							wear[type][0] = wear[type][2];
						}
					}
					var mexicanLifes = [0, 0, 1, 2, 4, 5, 9][mexican]*dlife;
					for(i=0; i<donkey.length; i++){
						if(!donkey[i].twpro_jobbonus) donkey[i].twpro_jobbonus = {};
						donkey[i].twpro_jobbonus.regeneration = mexicanLifes;
					}
					wear["animal"][0] = donkey;
					lifes += mexicanLifes;
					twpro_job.twpro_bestAnimal = mexicanLifes;
				}
			}
			for(type in wear){
				items = wear[type][0];
				item = items[0];
				if(!items[0]) bestStats = 0;
				else if(item.set && item.set.key == "set_sleeper"){
					bestStats = Math.round(sleeper_bonuses[setcount][0] * lifes);
				}
				else{
					bestStats = item.twpro_jobbonus.regeneration;
				}
				twpro_job.twpro_bestStats[type] = bestStats;
				for(i=0; i<items.length; i++){
					if(!items[i].twpro_jobbonus) items[i].twpro_jobbonus = {};
					if(!TWPro.twpro_itemStorage[items[i].item_id].twpro_jobbonus) TWPro.twpro_itemStorage[items[i].item_id].twpro_jobbonus = {};
					TWPro.twpro_itemStorage[items[i].item_id].twpro_jobbonus.regeneration = items[i].twpro_jobbonus.regeneration = bestStats;
					TWPro.twpro_itemStorage[items[i].item_id].twpro_bonus = items[i].twpro_bonus = true;
					
				}
			}
			twpro_job.maxlifes = lifes;
			twpro_job.sleepCount = setcount;
			TWPro.twpro_jobValues.regeneration.laborp = twpro_job.twpro_skill = twpro_job.twpro_aps = twpro_job.twpro_noSetAps = Math.round(lifes * (1+sleeper_bonuses[setcount][0]));
			return twpro_job;
		}
		function twpro_sleeperBonus(sleepCount){
			var type,
			sleeper_bonuses =
				[	[.00,  00]/*0*/,
					[.00, .06]/*1*/,
					[.06, .02]/*2*/,
					[.08, .04]/*3*/,
					[.12, .06]/*4*/,
					[.18, .07]/*5*/,
					[.25,  00]/*6*/
				];
			if(!(1*sleepCount) || isNaN(sleepCount)){
				sleepCount = 0;
				for(type in Wear.wear){
					if(Wear.wear[type].obj.set && Wear.wear[type].obj.set.key == "set_sleeper") sleepCount++;
				}
			}
			return 1+sleeper_bonuses[sleepCount][0];
		}

		function twpro_activeJob() {
			if (TWPro.twpro_failure) return false;
			return TWPro.twpro_calculated && document.getElementById("twpro_jobList") && document.getElementById("twpro_jobList").selectedIndex != 0;
		}
	
		function twpro_getPlace(twpro_data, twpro_extendeName) {
			if (TWPro.twpro_failure) return;
			if (twpro_extendeName == 'inventory') {
				if (twpro_data.jsContent.search(/wear_content\[i\]\);(\s*)\}/) == -1) {
					TWPro.debug_log("wear is not found in inventory", "getPlace");
					TWPro.debug_log({twpro_extendeName:twpro_extendeName, twpro_data:twpro_data});
					return;
				}
				if (twpro_data.jsContent.search(/bag_content\[i\]\);(\s*)\}/) == -1) {
					/* temporary fix for 1.31 */
					if (twpro_data.jsContent.search(/^\s*Bag\.loadItems\(.+\);\s*$/m)) {
						twpro_data.jsContent = twpro_data.jsContent.replace(/wear_content\[i\]\);\s*\}/, "$&;TWPro.twpro_initializeItems('wear',null);").replace(/^\s*Bag\.loadItems\(.+\);\s*$/m, "$&;TWPro.twpro_initializeItems('bag',null);");
						return;
					}
					TWPro.debug_log("bag is not found in inventory", "getPlace");
					TWPro.debug_log({twpro_extendeName:twpro_extendeName, twpro_data:twpro_data});
					return;
				}
	
				twpro_data.jsContent = twpro_data.jsContent.replace(/wear_content\[i\]\);\s*\}/, "$&;TWPro.twpro_initializeItems('wear',null);").replace(/bag_content\[i\]\);\s*\}/, "$&;TWPro.twpro_initializeItems('bag',null);");
			}
			else if(twpro_extendeName == 'item_trader'){
				twpro_data.page = twpro_data.page.replace(/var trader_inv/, "TWPro.twpro_initializeItems('own',playerInventory);TWPro.twpro_multisale('item_trader');$&").replace(/trader_inv\[i\], *['"]\w*['"]\);\s*\}/, "$&;TWPro.twpro_initializeItems('trader',traderInventory);");
			}
			else {
				if (twpro_data.jsContent.search(/var trader_inv/) == -1) {
					TWPro.debug_log("inventory is not found at traders", "getPlace");
					TWPro.debug_log({twpro_extendeName:twpro_extendeName, twpro_data:twpro_data});
					return;
				}
				if (twpro_data.jsContent.search(/trader_inv\[i\]\);(\s*)\}/) == -1 && twpro_data.jsContent.search(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/) == -1) {
					TWPro.debug_log("addition of items to the trader inventory not found", "getPlace");
					TWPro.debug_log({twpro_extendeName:twpro_extendeName, twpro_data:twpro_data});
					return;
				}
				twpro_data.jsContent = twpro_data.jsContent.replace('var trader_inv', "TWPro.twpro_initializeItems('own',playerInventory);$&").replace(/trader_inv\[i\]\);\s*\}/, "$&;TWPro.twpro_initializeItems('trader',traderInventory);").replace(/trader_inv\[i\], *['"]\w*['"]\);\s*\}/, "$&;TWPro.twpro_initializeItems('trader',traderInventory);");
			}
		}
	
		// wird beim Erstellen eines Popups ausgefuehrt, stellt Code fuer diesen zusammen
		function twpro_popup(twpro_item) {
			if (TWPro.twpro_failure) return '';
			var twpro_xhtml = '';
			if (TWPro.twpro_calculated && twpro_item.twpro_place && document.getElementById("twpro_jobList")) {
				if ((twpro_item.twpro_place == 'wear') || (twpro_item.twpro_place == 'bag')) {
					if (document.getElementById("twpro_jobList").selectedIndex != 0) {
						var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
						if (twpro_selectedJob >= 0) {
							var twpro_job = TWPro.twpro_jobs[twpro_selectedJob];
							if (twpro_item.twpro_bonus == undefined) {
								TWPro.twpro_prepareItem(twpro_item);
								if (twpro_item.twpro_bonus) {
									for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
										twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i], twpro_item);
									}
								}
							}
							if (twpro_item.twpro_bonus) {
								var twpro_aktplus = twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName];
								if (twpro_aktplus > 0) {
									twpro_xhtml += '<span class="item_popup_bonus">+'+
									twpro_aktplus + ' ' + twpro_job.name+
									'<br /></span><br />';
								}
							}
						}
					}
				}
				if (twpro_item.twpro_place == 'trader') {
					if (twpro_item.twpro_bonus == undefined) {
						TWPro.twpro_prepareItem(twpro_item);
						if (twpro_item.twpro_bonus) {
							for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
								twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i], twpro_item);
							}
						}
					}
					if (twpro_item.twpro_bonus) {
						var twpro_j = 0;
						var twpro_plus = [];
						var twpro_better;
						for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
							twpro_better = twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] - TWPro.twpro_jobs[twpro_i].twpro_bestStats[twpro_item.type];
							if (twpro_better > 0) {
								twpro_plus.push(twpro_better + ' ' + TWPro.twpro_jobs[twpro_i].name);
								twpro_j++;
							}
						}
						if (twpro_j > 0) {
							twpro_plus.sort(TWPro.twpro_sortPlus);
							twpro_xhtml += '<span class="item_popup_bonus"><table><tr><td style="font-size:11px">';
							var re_jobname = TWPro.twpro_jobs[parseInt(document.getElementById('twpro_jobList')[document.getElementById('twpro_jobList').selectedIndex].value)] || '';
							if(re_jobname) re_jobname = re_jobname.name;
							var bool_j = twpro_j > 30 && twpro_j <= 33;
							for (var twpro_i = 0; (twpro_i < twpro_plus.length) && (twpro_i < 33); twpro_i++) {
								twpro_xhtml += '<span style="white-space:nowrap;';
								if (TWPro.twpro_activeJob() && (twpro_plus[twpro_i].indexOf(re_jobname) != -1)) {
									twpro_xhtml += 'color:rgb(78, 55, 7);';
								}
								twpro_xhtml += '">+' + twpro_plus[twpro_i] + '</span><br />';
								if ((twpro_j <= 30 && twpro_i == 14) || (bool_j && (twpro_i == (Math.round(twpro_j / 2) - 1))) || (twpro_j > 33 && twpro_i == 16)) {
									twpro_xhtml += '</td><td style="font-size:11px">';
								}
							}
							if (twpro_i < twpro_plus.length) {
								twpro_xhtml += '...';
							}
							twpro_xhtml += '</td></tr></table></span><br />';
						}
					}
				}
			}
			return twpro_xhtml;
		}
	
		// fuegt Auswahlliste in das Inventar ein
		function twpro_insertList(twpro_data) {
			if (TWPro.twpro_failure) return;
			if (!TWPro.twpro_jobsort) {
				TWPro.twpro_jobsort = 'name';
			}
			TWPro.twpro_bag = {};
			TWPro.twpro_bag.twpro_priceWear = 0;
			TWPro.twpro_bag.twpro_priceBag = 0;
			TWPro.twpro_bag.twpro_priceItems = 0;
			TWPro.twpro_bag.twpro_priceYields = 0;
			TWPro.twpro_bag.twpro_countType = {};
			TWPro.twpro_bag.twpro_types = [];
			TWPro.twpro_setItems = {};
			TWPro.twpro_setItemsCount = {};
			for (var twpro_set in TWPro.twpro_setBonus) {
				TWPro.twpro_setItemsCount[twpro_set] = 0;
			}
			TWPro.twpro_invHashTest = [];
			for (var twpro_type in Character.itemLevelRequirementDecrease) {
				if ((twpro_type != 'all') && (!isNaN(Character.itemLevelRequirementDecrease[twpro_type]))) {
					TWPro.twpro_bag.twpro_types.push(twpro_type);
					TWPro.twpro_bag.twpro_countType[twpro_type] = 0;
				}
			}
			if(twpro_data.page.indexOf('<div id="char_belt"') != -1 && typeof Character.itemLevelRequirementDecrease.belt == "undefined"){
				//Game version 1.30 exists
				TWPro.twpro_bag.twpro_countType["belt"] = 0;
				TWPro.twpro_bag.twpro_countType["pants"] = 0;
				Character.itemLevelRequirementDecrease.belt = 0;
				Character.itemLevelRequirementDecrease.pants = 0;
				TWPro.twpro_bag.twpro_types.push("belt", "pants");
			}
			//alert(twpro_data.page);
			var twpro_xhtml = '<table id="twpro_jobDisplay" style="display: inline;position: absolute; visibility:hidden; top: 10px; right: 36px;border-collapse:collapse;background-color:#CBA979;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;"><tr><td style="padding:0">';
			for(var i=0; i<TWPro.twpro_sorts.length; i++){
				var name = TWPro.twpro_sorts[i];
				twpro_xhtml += '<a href="javascript:" onmouseup="TWPro.twpro_sortList(\''+name+'\')"><img id="twpro_jobsort_link_'+name+'" alt="" src="images/transparent.png" width="20" height="17" style="background-image:url(http://twpro.lekensteyn.nl/sort.png);background-position:-'+(i*20)+'px '+(TWPro.twpro_jobsort==name?0:-17)+'px" onmouseover="this.style.backgroundPosition=\'-'+(i*20)+'px 0\'" onmouseout="if(TWPro.twpro_jobsort!=\''+name+'\')this.style.backgroundPosition=\'-'+(i*20)+'px -17px\'"/></a>';
			}
			twpro_xhtml += '<a href="javascript:/*Click here to configure TWPro*/TWPro.twpro_disableJobs();" style="position:absolute;right:0;"><img id="twpro_config_button" title="TWPro ' + AjaxWindow.possibleValues['settings'] + '" width="25" height="15" style="border: 1px solid rgb(62, 44, 35); background: url(/img.php?type=menu) repeat scroll -128px -180px transparent;" src="images/transparent.png"></a>';
			twpro_xhtml += '</td></tr><tr><td style="padding:0">';
			twpro_xhtml += '<select id="twpro_jobList" size="1" onchange="TWPro.twpro_changeJob()" onclick="TWPro.twpro_clickList()" style="background-color: rgb(207, 195, 166); font-size: 10px; width:190px;"><option value="-1" id="twpro_wait" style="background-color: rgb(207, 195, 166);">'+TWPro.lang.STARTCALC+'</option></select>';
			
			twpro_xhtml += '</td></tr></table>';
			twpro_xhtml += '<a style="position: absolute; right: 0pt;" href="javascript:/*Click here top open the Set info window*/TWPro.twpro_setInfo(\'window_inventory\')"><img width="33" height="32" src="images/transparent.png" style="background: url(../images/reward/icons/rocket-gtzi-small.png) no-repeat scroll 0 0 transparent;" title="' + TWPro.lang.SETSINFO + '" id="twpro_lang_SETSINFO"></a>';
			twpro_xhtml += '<span id="twpro_aktuelleap" style="visibility:hidden;font-size:13px;position: absolute;top:30px;right:-14px;"><span id="twpro_aktuelleapvalue" style="border-style:solid;border-width:1px;padding:2px;"></span> </span>';
			//alert(twpro_xhtml);
			// the following is used by Inventory statistics, do not remove it
			var twpro_h2 = twpro_data.page.match(/<h2>(.+?)<\/h2>/g);
			try {
				TWPro.lang_EQUIPMENT = twpro_h2[1].slice(4, -5);
				TWPro.lang_BAG = twpro_h2[0].slice(4, -5);
			} catch (e) {// prevent crashing if Innogames decides to change h2
				TWPro.lang_EQUIPMENT = "Equipment*";
				TWPro.lang_BAG = "Backpack*";
			}
			twpro_data.page = twpro_data.page.replace(/<div style="width: 390px; position: absolute; height: 20px; text-align: center; top: 13px; left: 316px;"><h2>(.+?)<\/h2>/, '<div style="width:390px; position:absolute; height:33px; top:0px; left:316px;"><h2 style="white-space: nowrap;"><span id="twpro_bag" style="cursor: default;position:absolute; top:13px; right:236px;">$1</span>' + twpro_xhtml + '</h2>');
			// settings for job rankings
			twpro_xhtml = '<div style="left:320px;position:absolute;margin-top:390px;">';
			twpro_xhtml += '<img width="20" height="17" src="images/transparent.png" alt="" style="background-image: url(&quot;http://twpro.lekensteyn.nl/sort.png&quot;); background-position: -80px 0px;" id="twpro_lang_JOBRANKSETTINGS" title="' + TWPro.lang.JOBRANKSETTINGS + '" />';
			var imgdata = {
				"xp": "experience",
				"wages": "money",
				"luck": "luck",
				"danger": "danger"
			};
			for(var i in TWPro.multipliers){
				twpro_xhtml += '<input type="text" style="width:22px;text-align:center;border:1px solid #957516;color:#F1EBE4;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;margin-right:2px;background:url(../images/job/redesign/bar/icon/' + imgdata[i] + '.png) no-repeat scroll -3px -4px #2C1C0F;padding-left:20px" value="'+TWPro.multipliers[i]+'" onchange="TWPro.twpro_handleJobrank(this, \''+i+'\')" />';
			}
			twpro_xhtml += '</div>';
			// search inventory
			TWPro.searchInventory = {timer:null};
			(new Image()).src = 'http://twpro.lekensteyn.nl/loading.gif';
			twpro_xhtml += '<div style="position:absolute;margin-top:390px;left:553px"><label style="position:absolute;top:4px;left:21px;font-style:italic;color:#636;cursor:pointer" for="twpro_searchinventory" class="twpro_lang_SEARCHINVENTORY">'+TWPro.lang.SEARCHINVENTORY+'</label><input type="text" style="width:120px;background: url(http://twpro.lekensteyn.nl/search.png) no-repeat scroll 0 0 #E0DACA;padding:0 2px 0 19px;border-radius:7px;-moz-border-radius:7px;-webkit-border-radius:7px;" id="twpro_searchinventory" onfocus="previousSibling.style.display=\'none\'" onblur="if(this.value==\'\')previousSibling.style.display=\'block\'" onkeyup="TWPro.twpro_searchInventory(event.keyCode==13)" /><span id="twpro_search_help" style="font-weight:bold;color:#00CCCC;cursor:help;background:#7A5634;width:20px;height:17px">?</span></div>';
			
			
			twpro_xhtml += ' <input id="twpro_clothingfilter" type="checkbox"' + (TWPro.twpro_preference('dispJobClothingOnly')?' checked="checked"':'') + '  onclick="TWPro.twpro_preference(\'dispJobClothingOnly\',this.checked);TWPro.twpro_bagVis()" style="position:absolute;margin-top:393px;left:535px" />';
			twpro_data.page = twpro_data.page.replace('id="item_trader_button"', '$& style="position: absolute; background-position: -5px -5px; width: 56px; height: 56px; top: 50px;"');
			twpro_data.page = twpro_data.page.replace(/top: 13px; left: 5px;"><h2>.+?<\/h2>/, 'top: -2px; left: 0px; overflow:auto;height:55px"><div style="position:relative;opacity:0.9;" id="twpro_currentJobSkills"><div style="margin:0"></div><div style="margin:0"></div><div style="margin:0"></div><div style="margin:0"></div><div style="margin:0"></div></div>');
			twpro_data.page = twpro_data.page.replace(/margin-top: 0(px; height:320px">\n\t<div id="bag")/, 'margin-top:90$1 style="height:300px;margin-top:0px;"');
			twpro_data.page += twpro_xhtml;
		}
	
		function twpro_handleJobrank(field, type){
			var val = parseFloat(field.value);
			if(isNaN(val)) val = 1;
			field.value = val;
			TWPro.multipliers[type] = 1*val;
			var multipliers = [];
			for(var i in TWPro.multipliers){
				multipliers.push(TWPro.multipliers[i]);
			}
			TWPro.twpro_preference('multipliers', multipliers.join(':'));
			if(TWPro.twpro_jobsort == 'comb'){
				TWPro.twpro_sortList('comb');
			}
		}

		function twpro_searchInventory(searchNow, updateItemId){
			if(!TWPro.searchInventory.cache && updateItemId) return;
			if(!searchNow){
				clearTimeout(TWPro.searchInventory.timer);
				TWPro.searchInventory.timer = setTimeout(TWPro.twpro_searchInventory, 500, true, updateItemId);
				return;
			}
			clearTimeout(TWPro.searchInventory.timer);
			TWPro.searchInventory.timer = null;
			var search = document.getElementById('twpro_searchinventory');
			if(!search) return;
			TWPro.twpro_internalWindowToTop("window_inventory");
			var cache, i, item,
				invent = document.getElementById('bag'),
				reJunk = /<[^>]+>|\n+/g, reSplit = /\t+/g,
				rePopupType = /"item_popup_type">([^<]+)<\/span>/,
				rePopupBonusAttr = /"item_popup_bonus_attr">((?:[+\-]\d{1,2}\s[^<]+(?:<br \/>)?)+)<\/span>/,
				rePopupBonusSkill = /"item_popup_bonus_skill">((?:[+\-]\d{1,2}\s[^<]+(?:<br \/>)?)+)<\/span>/,
				unjunk = function(subject, replace){return subject.replace(reJunk, replace||'').replace(reSplit, ' ').toLowerCase()},
				searchTerms = unjunk(search.value), isRegExp = false;
			if(/[*?]/.test(searchTerms)){
				searchTerms = new RegExp(searchTerms.replace(/[.+\[\]()\\{}]/g, '\\$&').replace(/\?+/g, '[^\t]?').replace(/\*+/g, '[^\t]*?'));
				isRegExp = true;
			}
			search.style.backgroundImage = 'url(http://twpro.lekensteyn.nl/loading.gif)';
			var processbagItem = function(iid, bag_item){
					if(bag_item){
						bag_obj = bag_item.obj;
						cache[iid] = unjunk(bag_obj.name);
						if((wat = bag_obj.description)){
							cache[iid] += '\t' + unjunk(wat);
						}
						if((wat = bag_item.popup.popup.xhtml.match(rePopupType))){
							cache[iid] += '\t' + unjunk(wat[1]);
						}
						if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusAttr))){
							cache[iid] += '\t' + unjunk(wat[1], '\t');
						}
						if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusSkill))){
							cache[iid] += '\t' + unjunk(wat[1], '\t');
						}
						if((wat = bag_obj.set)){
							cache[iid] += '\t' + unjunk(wat.name);
						}
					}
					if((item=invent.getElementById('item_'+iid))){
						disp = isRegExp ? searchTerms.test(cache[iid]) : cache[iid].indexOf(searchTerms) != -1;
						// don't add them together, FF 3.6 has an annoying bug: disp = false instead of '' or 'twpro_search_hide'
						disp = disp ? '' : 'twpro_search_hide';
						item.className = item.className.replace(/\s*twpro_search_hide|$/, " " + disp);
					}
				},
				bag_items = Bag.getInstance().items, i, disp
			if(!(cache = TWPro.searchInventory.cache)){
				cache = TWPro.searchInventory.cache = {};
				for(i in bag_items){
					processbagItem(i, bag_items[i]);
				}
			}
			else{
				for(i in cache){
					processbagItem(i);
				}
				if(bag_items[updateItemId]){
					processbagItem(updateItemId, bag_items[updateItemId]);
				}
			}
			TWPro.twpro_bagVis();
			search.style.backgroundImage = 'url(http://twpro.lekensteyn.nl/search.png)';
		}

		function twpro_searchTrader(searchNow, updateItemId, town_id, market_id){
			var searchIn = TWPro.searchTrader[town_id];
			if(!searchIn.cache && updateItemId) return;
			if(!searchNow){
				clearTimeout(searchIn.timer);
				searchIn.timer = setTimeout(TWPro.twpro_searchTrader, 500, true, updateItemId, town_id, market_id);
				return;
			}
			clearTimeout(searchIn.timer);
			searchIn.timer = null;
			var search = document.getElementById('twpro_market_'+town_id+'_search');
			if(!search) return;
			TWPro.twpro_internalWindowToTop("window_building_market_"+town_id);
			var cache, item,
				invent = document.getElementById('market_'+town_id+'_inv_div'),
				reJunk = /<[^>]+>|\n+/g, reSplit = /\t+/g,
				rePopupType = /"item_popup_type">([^<]+)<\/span>/,
				rePopupBonusAttr = /"item_popup_bonus_attr">((?:[+\-]\d{1,2}\s[^<]+(?:<br \/>)?)+)<\/span>/,
				rePopupBonusSkill = /"item_popup_bonus_skill">((?:[+\-]\d{1,2}\s[^<]+(?:<br \/>)?)+)<\/span>/,
				unjunk = function(subject, replace){return subject.replace(reJunk, replace||'').replace(reSplit, ' ').toLowerCase()},
				searchTerms = unjunk(search.value), isRegExp = false,
				anyresult=0;
			if(/[*?]/.test(searchTerms)){
				searchTerms = new RegExp(searchTerms.replace(/[.+\[\]()\\{}]/g, '\\$&').replace(/\?+/g, '[^\t]?').replace(/\*+/g, '[^\t]*?'));
				isRegExp = true;
			}
			search.style.backgroundImage = 'url(http://twpro.lekensteyn.nl/loading.gif)';
			var processbagItem = function(iid, bag_item){
					if(bag_item){
						bag_obj = bag_item.obj;
						cache[iid] = unjunk(bag_obj.name);
						if((wat = bag_obj.description)){
							cache[iid] += '\t' + unjunk(wat);
						}
						if((wat = bag_item.popup.popup.xhtml.match(rePopupType))){
							cache[iid] += '\t' + unjunk(wat[1]);
						}
						if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusAttr))){
							cache[iid] += '\t' + unjunk(wat[1], '\t');
						}
						if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusSkill))){
							cache[iid] += '\t' + unjunk(wat[1], '\t');
						}
						if((wat = bag_obj.set)){
							cache[iid] += '\t' + unjunk(wat.name);
						}
					}
					if((item=invent.getElementById('item_'+iid))){
						disp = isRegExp ? searchTerms.test(cache[iid]) : cache[iid].indexOf(searchTerms) != -1;
						// don't add them together, FF 3.6 has an annoying bug: disp = false instead of '' or 'twpro_search_hide'
						disp = disp ? '' : 'twpro_search_hide';
						item.className = item.className.replace(/\s*twpro_search_hide|$/, " " + disp);
					}
				},
				bii_bag_items = PlayerInventory.getInstance().bags["market_"+market_id].items, i, disp,
				bag_items = invent.getElementsByTagName('div'),
				nores = document.getElementById('twpro_nosearchresult'+town_id);
			if(!(cache = searchIn.cache)){
				cache = searchIn.cache = {};
				for(i in bii_bag_items){
					processbagItem(i, bii_bag_items[i]);
				}
			}
			else{
				for(i in cache){
					processbagItem(i);
				}
				if(bii_bag_items[updateItemId]){
					processbagItem(updateItemId, bii_bag_items[updateItemId]);
				}
			}
			
			for(i=0; i<bag_items.length; i++){
				if(bag_items[i].id.substr(0, 5) != 'item_') continue;
				if(bag_items[i].className.indexOf("twpro_search_hide") != -1 || bag_items[i].className.indexOf("nonauctionable") != -1){
					continue;
				}
				anyresult = 1;
			}
			if(!anyresult){
				if(!nores){
					nores = document.createElement('div');
					nores.id = 'twpro_nosearchresult'+town_id;
					nores.style.cssText = 'height: 290px;';
					invent.appendChild(nores);
				}
				nores.innerHTML = TWPro.lang.NOSEARCHRESULT.replace('%2', '<br><a href="javascript:" onclick="document.getElementById(\'twpro_market_'+town_id+'_search\').value=\'\';TWPro.twpro_searchTrader(true, null, '+town_id+', '+market_id+')">').replace('%3', '</a>').replace('%1', '<em>'+document.getElementById('twpro_market_'+town_id+'_search').value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;')+'</em>');
			}
			else if(nores){
				nores.parentNode.removeChild(nores);
			}
			search.style.backgroundImage = 'url(http://twpro.lekensteyn.nl/search.png)';
		}
	
	
		function twpro_bagVis(){
			var bag_items = document.getElementById('bag').getElementsByTagName('div'),
				i, hide = TWPro.twpro_preference('dispJobClothingOnly') && document.getElementById('twpro_jobList').selectedIndex != 0,
				anyresult,
				nores = document.getElementById('twpro_nosearchresult');
			for(i=0; i<bag_items.length; i++){
				if(bag_items[i].id.substr(0, 5) != 'item_') continue;
				if(bag_items[i].className.indexOf('twpro_search_hide') != -1){
					continue;
				}
				if(hide && bag_items[i].firstChild.className == ''){
					bag_items[i].style.display = 'none';
				}
				else{
					bag_items[i].style.display = '';
					anyresult = 1;
				}
			}
			if(!anyresult){
				var extra = hide?'<br /><br /><a href="javascript:TWPro.twpro_preference(\'dispJobClothingOnly\',document.getElementById(\'twpro_clothingfilter\').checked=false);TWPro.twpro_bagVis()">'+TWPro.lang.DISABLEBESTFORJOB+'</a>':'';
				if(!nores){
					nores = document.createElement('div');
					nores.id = 'twpro_nosearchresult';
					nores.style.cssText = 'padding: 5px; background-image: url("/images/bgdark.png");border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;';
					document.getElementById('bag').appendChild(nores);
				}
				nores.innerHTML = TWPro.lang.NOSEARCHRESULT
					.replace('%2', '<br /><a href="javascript:" onclick="document.getElementById(\'twpro_searchinventory\').value=\'\';TWPro.twpro_searchInventory(true)">')
					.replace('%3', '</a>'+extra)
					.replace('%1', '<em>'+document.getElementById('twpro_searchinventory').value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;')+'</em>');
			}
			else if(nores){
				nores.parentNode.removeChild(nores);
			}
		}
		function internalWindowToTop(windowId){
			var windows = document.getElementById("windows"),
			inv = document.getElementById(windowId);
			if(inv && inv.parentNode == windows && inv != windows.firstChild){
				windows.insertBefore(inv, windows.firstChild);
			}
		}
	
		function twpro_sortList(twpro_jobSortItem) {
			if (TWPro.twpro_failure) return;
			TWPro.twpro_jobsort = twpro_jobSortItem;
			for(var i=0; i<TWPro.twpro_sorts.length; i++){
				TWPro.twpro_jobSortMark(TWPro.twpro_sorts[i], false);
			}
			TWPro.twpro_jobSortMark(twpro_jobSortItem, true);
			if (TWPro.twpro_calculated && document.getElementById("twpro_jobList")) {
				if (document.getElementById('twpro_wait').text == TWPro.lang.CHOOSEJOB) {
					document.getElementById('twpro_wait').text = TWPro.lang.CALCJOB;
					var twpro_selectedJobName = 'none';
					if (document.getElementById("twpro_jobList").selectedIndex != 0) {
						var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
						if (twpro_selectedJob >= 0) {
							twpro_selectedJobName = TWPro.twpro_jobs[twpro_selectedJob].shortName;
						}
					}
					document.getElementById("twpro_jobList").selectedIndex = 0;
					while (document.getElementById("twpro_jobList").lastChild.id != 'twpro_wait') {
						document.getElementById("twpro_jobList").removeChild(document.getElementById("twpro_jobList").lastChild);
					}
					TWPro.twpro_sortJobs();
					TWPro.twpro_insertListItems();
					for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
						TWPro.twpro_jobs[twpro_i].twpro_jobid = twpro_i;
					}
					for (var twpro_i = 0; twpro_i < document.getElementById("twpro_jobList").options.length; twpro_i++) {
						var twpro_jobTest = parseInt(document.getElementById("twpro_jobList").options[twpro_i].value);
						if (twpro_jobTest >= 0) {
							if (twpro_selectedJobName == TWPro.twpro_jobs[twpro_jobTest].shortName) {
								document.getElementById("twpro_jobList").selectedIndex = twpro_i;
							}
						}
					}
					document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
				}
				else {
					TWPro.twpro_sortJobs();
				}
			}
			document.getElementById('twpro_jobsort_link_' + twpro_jobSortItem).blur();
		}
	
		function twpro_jobSortMark(twpro_jobSortItem, twpro_jobSortValue) {
			if (TWPro.twpro_failure) return;
			var twpro_bgposition = '';
			for(var i=0; i<TWPro.twpro_sorts.length; i++){
				if(TWPro.twpro_sorts[i] == twpro_jobSortItem){
					twpro_bgposition = (20*-i)+'px ';
					break;
				}
			}
			twpro_bgposition += twpro_jobSortValue ? '0px' : '-17px';
			document.getElementById('twpro_jobsort_link_' + twpro_jobSortItem).style.backgroundPosition = twpro_bgposition;
		}
	
		// macht die Liste sichtbar
		function twpro_showList() {
			if (TWPro.twpro_failure) return;
			$('twpro_jobsort_link_name').addMousePopup(new MousePopup(TWPro.lang.SORTBYNAME, 100, {opacity:0.95}));
			$('twpro_jobsort_link_erfahrung').addMousePopup(new MousePopup(TWPro.lang.SORTBYXP, 100, {opacity:0.95}));
			$('twpro_jobsort_link_money').addMousePopup(new MousePopup(TWPro.lang.SORTBYWAGES, 100, {opacity:0.95}));
			$('twpro_jobsort_link_luckItemValue').addMousePopup(new MousePopup(TWPro.lang.SORTBYLUCK, 100, {opacity:0.95}));
			$('twpro_jobsort_link_comb').addMousePopup(new MousePopup(TWPro.lang.SORTBYCOMB, 100, {opacity:0.95}));
			$('twpro_jobsort_link_gefahr').addMousePopup(new MousePopup(TWPro.lang.SORTBYDANGER, 100, {opacity:0.95}));
			$('twpro_jobsort_link_laborp').addMousePopup(new MousePopup(TWPro.lang.SORTBYLABORP, 100, {opacity:0.95}));
			$('twpro_clothingfilter').addMousePopup(new MousePopup(TWPro.lang.FILTERCLOTHING, 100, {opacity:0.95}));
			$('twpro_search_help').addMousePopup(new MousePopup(TWPro.lang.SEARCHHELP, 100, {opacity:0.95}));
			TWPro.twpro_bag.twpro_bagPopup = new MousePopup('', 100, {opacity:0.95});
			TWPro.twpro_bag.twpro_bagPopup.twpro_refresh = function () {
				this.setXHTML(TWPro.twpro_getBagPopup());
			};
			TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
			$('twpro_bag').addMousePopup(TWPro.twpro_bag.twpro_bagPopup);
	
			//TWPro.twpro_invHash = [];
			if (TWPro.twpro_invHash == TWPro.twpro_invHashTest.join(',')) {
				for (var twpro_wear in Wear.wear) {
					TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
					if (Wear.wear[twpro_wear].obj.twpro_bonus) {
						Wear.wear[twpro_wear].obj.twpro_jobbonus = TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus;
						//        for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
						//        {
						//          Wear.wear[twpro_wear].obj.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName];
						//        }
					}
				}
				var bagitems = Bag.getInstance().items;
				for (var twpro_bag in bagitems) {
					TWPro.twpro_prepareItem(bagitems[twpro_bag].obj);
					if (bagitems[twpro_bag].obj.twpro_bonus) {
						bagitems[twpro_bag].obj.twpro_jobbonus = TWPro.twpro_itemStorage[bagitems[twpro_bag].obj.item_id].twpro_jobbonus;
						//        for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
						//        {
						//          Bag.getInstance().items[twpro_bag].obj.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_itemStorage[Bag.getInstance().items[twpro_bag].obj.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName];
						//        }
					}
				}
				TWPro.twpro_insertListItems();
				document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
			}
			document.getElementById('twpro_jobDisplay').style.visibility = 'visible';
		}
	
		function twpro_getBagPopup() {
			if (TWPro.twpro_failure) return '';
			var twpro_xhtml = '';
			twpro_xhtml += '<div class="item_popup" style="text-align:right;font-family:monospace;">';
			twpro_xhtml += '<span class="item_popup_title">'+TWPro.lang.INVENTSTATS+'</span>';
			twpro_xhtml += '<span class="item_popup_requirement_text">'+TWPro.lang.SELLVALUE+':</span>';
			twpro_xhtml += '<table>';
			twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang_EQUIPMENT+'&nbsp;&nbsp;</td>';
			twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_priceWear + ' $</td></tr>';
			twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang_BAG+'&nbsp;&nbsp;</td>';
			twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_priceBag + ' $</td></tr>';
			twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.OBJECTS+'&nbsp;&nbsp;</td>';
			twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_priceItems + ' $</td></tr>';
			twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.PRODUCTS+'&nbsp;&nbsp;</td>';
			twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_priceYields + ' $</td></tr>';
			twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.TOTAL+'&nbsp;&nbsp;</td>';
			twpro_xhtml += '<td class="item_popup_trader_price">' + parseInt(TWPro.twpro_bag.twpro_priceWear + TWPro.twpro_bag.twpro_priceBag) + ' $</td></tr>';
			twpro_xhtml += '</table>';
			twpro_xhtml += '<DIV class="popup_yield_divider"></DIV><span class="item_popup_requirement_text">'+TWPro.lang.QUANTITIES+':</span>';
			twpro_xhtml += '<table>';
			var twpro_all = 0;
			for (var item_type in TWPro.item_type_title) {
				twpro_xhtml += '<tr><td class="item_popup_trader_price">' + TWPro.item_type_title[item_type] + '</td>';
				twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-family:monospace;">' + TWPro.twpro_bag.twpro_countType[item_type] + '</td></tr>';
				twpro_all += TWPro.twpro_bag.twpro_countType[item_type];
			}
			twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.NONYIELDS+':&nbsp;&nbsp;</td>';
			twpro_xhtml += '<td class="item_popup_trader_price">';
			twpro_xhtml += (twpro_all - TWPro.twpro_bag.twpro_countType['yield']) + '</td></tr>';
			twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.TOTAL+':&nbsp;&nbsp;</td>';
			twpro_xhtml += '<td class="item_popup_trader_price">' + twpro_all + '</td></tr>';
			twpro_xhtml += '</table>';
			twpro_xhtml += '</div>';
			return twpro_xhtml;
		}
	
		// wird beim draufklicken auf die Liste ausgefuehrt, stoesst Berechnungen an
		function twpro_clickList() {
			if (TWPro.twpro_failure) return;
			if (document.getElementById('twpro_wait').text != TWPro.lang.CALCJOB && document.getElementById('twpro_wait').text != TWPro.lang.CHOOSEJOB) {
				document.getElementById('twpro_wait').text = TWPro.lang.CALCJOB;
				window.setTimeout(TWPro.twpro_updateList, 0);
			} else {
				TWPro.twpro_insertListItems(true);
			}
		}
		function twpro_clickfilterList() {
			if (TWPro.twpro_failure) return;
			document.getElementById('twpro_wait').text = "...";
			var twpro_wait = document.getElementById('twpro_wait');
			document.getElementById('twpro_jobList').innerHTML = '<option style="background-color: rgb(207, 195, 166);" id="twpro_wait" value="-1">'+twpro_wait.text+'</option>';
			TWPro.twpro_clickList();
		}
		
		function twpro_setInfo(centerWindowId) {
			var html = '<table class="shadow_table" style="width:100%;height:100%;">';
			html += '<tbody><tr>';
			html += '<td class="edge_shadow_top_left"></td>';
			html += '<td class="border_shadow_top"></td>';
			html += '<td class="edge_shadow_top_right"></td>';
			html += '</tr>';
			html += '<tr>';
			html += '<td class="border_shadow_left"></td>';
			html += '<td class="shadow_content">';
			html += '<div style="overflow:auto;height:400px;width:250px;">';
			for (var setName in TWPro.twpro_setBonus) {
				//if (setName == "fireworker_set") continue;
				var friendlyName = TWPro.set_names[setName];
				html += '<div class="item_popup twpro_setinfo_entry">';
				if (friendlyName.charAt(0) != "<") {
					html += '<a style="float:right;" href="javascript://Search inventory for items from this set" onclick="(function(){var search=decodeURIComponent(\'' + encodeURIComponent(friendlyName).replace(/'/g, "\\'") + '\'),query=document.getElementById(\'twpro_searchinventory\').value==search?\'\':search;document.getElementById(\'twpro_searchinventory\').previousSibling.style.display=query?\'none\':\'\';document.getElementById(\'twpro_searchinventory\').value=query;TWPro.twpro_searchInventory(true);})()"><img title="' + TWPro.lang.SEARCHINVENTORY + ': ' + friendlyName + '" alt="Q" src="http://twpro.lekensteyn.nl/search.png" width="16" height="16" style="border:1px solid black;"></a>';
				}
				html += '<span class="item_popup_title twpro_setinfo_name_clicker"';
				html += ' onclick="nextSibling.style.display=nextSibling.style.display?\'\':\'none\'">' + friendlyName + "</span>";
				html += '<div class="twpro_setinfo_set" style="display:none">';
				var items = TWPro.twpro_setBonus[setName], html2, html3;
				for (var i=0; i<items.length; i++) {
					if (!items[i]) continue;
					html3 = '<span class="item_popup_requirement_text twpro_setinfo_xitems">' + TWPro.lang.WITHSETITEMS.replace('%1', i) + '</span>';
					var setInfo = items[i], anyinfo=0;
					if (setInfo.bonus) {
						if (setInfo.bonus.attributes) {
							html2 = '';
							for (var attr_name in setInfo.bonus.attributes) {
								if (setInfo.bonus.attributes[attr_name]) {
									if (setInfo.bonus.attributes[attr_name] > 0) {
										html2 += '+';
									}
									html2 += setInfo.bonus.attributes[attr_name] + ' ' + Character.attribute_titles[attr_name] + '<br>';
								}
							}
							if (html2) {
								html3 += '<span class="item_popup_bonus_attr">' + html2 + '</span>';
								anyinfo++;
							}
						}
						if (setInfo.bonus.skills) {
							html2 = '';
							for (var skill_name in setInfo.bonus.skills) {
								if (setInfo.bonus.skills[skill_name]) {
									if (setInfo.bonus.skills[skill_name] > 0) {
										html2 += '+';
									}
									html2 += setInfo.bonus.skills[skill_name] + ' ' + Character.skill_titles[skill_name] + '<br>';
								}
							}
							if (html2) {
								html3 += '<span class="item_popup_bonus_skill">' + html2 + '</span>';
								anyinfo++;
							}
						}
					}
					if (setInfo.jobBonus) {
						html2 = '';
						for (var job_name in setInfo.jobBonus) {
							if (setInfo.jobBonus[job_name]) {
								var job_title = job_name == 'all' ? TWPro.lang.LABORPOINTS : TWPro.job_titles[job_name];
								
								if (!job_title) {
									job_title = job_name;
								}
								if (setInfo.jobBonus[job_name] > 0) {
									html2 += '+';
								}
								html2 += setInfo.jobBonus[job_name] + ' ' + job_title + '<br>';
							}
						}
						if (html2) {
							html3 += '<span class="item_popup_bonus">' + html2 + '</span>';
							anyinfo++;
						}
					}
					if (setInfo.speedBonus) {
						html3 += '<span class="item_popup_bonus">+' + setInfo.speedBonus + '% ' + TWPro.lang.SPEED + '</span>';
						anyinfo++;
					}
					if (setName == "set_sleeper") {
						html3 += '<span class="item_popup_bonus">+' + Math.round(100-100*TWPro.twpro_sleeperBonus(i)) + '% '+TWPro.lang.PERCREGENERATION;
						if (i == 6) {
							html3 += '<br>+1 ' + TWPro.lang.PRAYING;
						}
						html3 += '</span>';
						anyinfo++;
					}
					if (setInfo.luckBonus) {
						html3 += '<span class="item_popup_bonus">+' + setInfo.luckBonus + '% '+TWPro.lang.LUCK+'</span>';
						anyinfo++;
					}
					if (anyinfo) {
						html += html3;
					}
				}
				html += '</div></div>';
			}
			html += '</div></td>';
			html += '<td class="border_shadow_right"></td>';
			html += '</tr>';
			html += '<tr>';
			html += '<td class="edge_shadow_bottom_left"></td>';
			html += '<td class="border_shadow_bottom"></td>';
			html += '<td class="edge_shadow_bottom_right"></td>';
			html += '</tr>';
			html += '</tbody></table>';
			var wasPreviouslyOpened = document.getElementById("window_TWPro_setsInfo_Sets") ? true : false;
			AjaxWindow.show("TWPro_setsInfo", undefined, "Sets", html, {title:TWPro.lang.SETSINFO}, true);
			$E("#window_TWPro_setsInfo_Sets .window_refresh").href = "javascript:TWPro.twpro_setInfo('" + (centerWindowId||"") + "');";
			var window_TWPro_setsInfo_Sets = document.getElementById("window_TWPro_setsInfo_Sets");
			window_TWPro_setsInfo_Sets.style.width = "296px";
			if (window_TWPro_setsInfo_Sets.firstChild.className != "twpro_left_border") {
				window_TWPro_setsInfo_Sets.firstChild.style.backgroundPosition = "right center";
				var leftBorder = document.createElement("div");
				leftBorder.style.cssText = "background: url(../images/main/borders_window.png) repeat scroll 0 0 transparent;height:100%";
				leftBorder.className = "twpro_left_border";
				window_TWPro_setsInfo_Sets.insertBefore(leftBorder, window_TWPro_setsInfo_Sets.firstChild);
			}
			window_TWPro_setsInfo_Sets.getElementsByTagName("h2")[0].style.cssText = "width:285px;text-align:center";
			document.getElementById("window_TWPro_setsInfo_Sets_content").style.cssText = "width:272px;height:409px;";
			var centerWindow;
			if (centerWindowId && (centerWindow=document.getElementById(centerWindowId))) {
				window_TWPro_setsInfo_Sets.style.top = centerWindow.offsetTop + "px";
				var totalWidthRequired = centerWindow.offsetWidth + window_TWPro_setsInfo_Sets.offsetWidth,
					availWidth = document.body.offsetWidth;
				if (totalWidthRequired < availWidth * 1.1) {// ten percent treshold
					if (centerWindow.offsetLeft + totalWidthRequired > availWidth) {
						centerWindow.style.left = Math.max(0, availWidth - totalWidthRequired) / 2 + "px";
					}
					window_TWPro_setsInfo_Sets.style.left = centerWindow.offsetLeft + centerWindow.offsetWidth + "px";
				}
			}
		}
		function twpro_disableJobs(){
			var CustomJobList = {
				'construct': TWPro.lang.CONSTRUCTION,
				'duelshootingatt': TWPro.lang.DUELSHOOTINGATT,
				'duelshootingdef': TWPro.lang.DUELSHOOTINGDEF,
				'duelvigor': TWPro.lang.DUELVIGOR,
				'fortatt': TWPro.lang.FORTATTACK,
				'fortdef': TWPro.lang.FORTDEFEND,
				'speed': TWPro.lang.SPEED,
				'regeneration': TWPro.lang.REGENERATION
			};
			if(!TWPro.disabledJobs) TWPro.disabledJobs = {};
			var xhtmlShowHide = ['', ''],
			jobs = [],
			xhtml = '<table class="shadow_table" style="width:100%;height:100%;">';
			xhtml += '<tbody><tr>';
			xhtml += '<td class="edge_shadow_top_left"></td>';
			xhtml += '<td class="border_shadow_top"></td>';
			xhtml += '<td class="edge_shadow_top_right"></td>';
			xhtml += '</tr>';
			xhtml += '<tr>';
			xhtml += '<td class="border_shadow_left"></td>';
			xhtml += '<td class="shadow_content">';
			xhtml += '<div style="overflow:auto;height:400px;width:679px;">';
			xhtml += '<table id="twpro_settings_hidejob_table"><tbody>';
			xhtml += '<tr><td colSpan="4">' + TWPro.lang.HIDEJOBDESC + '</td></tr>';
			
			xhtml += '<tr><td colSpan="2">'+TWPro.lang.SHOWN;
			xhtml += '</td><td>'+TWPro.lang.HIDDEN+'</td>';
			xhtml += '<td><a href="javascript:/*Click here to open the Set info window*/TWPro.twpro_setInfo(\'window_TWPro_settings_Jobs\');">' + TWPro.lang.SETSINFO + '</a></td></tr>\n';
			for(var job in JobList){
				job = JobList[job];
				jobs.push([job.shortName, job.name]);
			}
			for(var job in CustomJobList){
				jobs.push([job, CustomJobList[job]]);
			}
			jobs.sort(function(x,y){return x[1].localeCompare(y[1])});
			for(var i=0;i<jobs.length;i++){
				job = jobs[i];
				xhtmlShowHide[!!TWPro.disabledJobs[job[0]]*1] += '<option value="'+job[0]+'"'+(job[0] in CustomJobList?' style="background-color: rgb(230, 235, 108);"':'')+'>'+job[1]+'</option>\n';
			}
			xhtml += '<tr id="twpro_settings_jobs_main"><td><select id="twpro_settings_jobs_shown" multiple="multiple" size="15" style="width:200px;">';
			xhtml += xhtmlShowHide[0];
			xhtml += '</select></td><td><div style="width:46px">';
			xhtml += '<a href="javascript:void TWPro.twpro_moveJobSetting(\'show_to_hide\');" class="button_wrap button"><span class="button_left"></span><span class="button_middle">&gt;&gt;</span><span class="button_right"></span><span style="clear: both;"></span></a>';
			xhtml += '<br /><a href="javascript:void TWPro.twpro_moveJobSetting(\'hide_to_show\');" class="button_wrap button"><span class="button_left"></span><span class="button_middle">&lt;&lt;</span><span class="button_right"></span><span style="clear: both;"></span></a>';
			xhtml += '</div></td><td><select id="twpro_settings_jobs_hidden" multiple="multiple" size="15" style="width:200px;">';
			xhtml += xhtmlShowHide[1];
			xhtml += '</select></td>';
			xhtml += '<td><div style="height:259px;overflow-y:auto;width:200px;"><p style="font-size:10.5px;">';
			xhtml += TWPro.lang.SETSETTINGS + '</p>';
			for (var internal_name in TWPro.set_names) {
				if(internal_name == "fireworker_set") continue;
				var isValidSet = TWPro.twpro_validSet(internal_name);
				xhtml += '<label id="twpro_settings_setlabel_' + internal_name + '" title="';
				if (!isValidSet) {
					xhtml += TWPro.lang.CANNOTWEAR;
					xhtml += '" style="text-decoration:line-through'
				}
				xhtml += '"><input type="checkbox" id="twpro_settings_enabled_'+internal_name+'"'+(isValidSet&&TWPro.prefs['disabledSets'].indexOf('|'+internal_name+'|')==-1?' checked="checked"':'')+'"'+(isValidSet?'':' disabled="disabled"')+' />' + TWPro.set_names[internal_name]+'</label> <span title="'+TWPro.lang.USEFULITEM+'">('+TWPro.twpro_setItemsCount[internal_name]+')</span><br />';
			}
			
			xhtml += '</div></td><td></td></tr>';
			xhtml += '<tr><td colSpan="5">';
			xhtml += '<div id="twpro_settings_customJob">';
			xhtml += '<span style="position:relative"><div style="position:absolute;bottom:20px;left:290px;width:275px;display:none;background-image:url(\'../images/border/table/bright.png\');" id="twpro_settings_calc_helper">';
			var lines = 0;
			for(var skill_name in TWPro.skill_to_AttNum){
				if(lines && lines++%5==0) xhtml += '<br style="clear:both;" />';
				xhtml += '<a href="javascript:void TWPro.twpro_customJobs(\'editCalculation\',\''+skill_name+'\');"><div class="skill_box skill_'+TWPro.skill_to_AttNum[skill_name][0]+' img'+TWPro.skill_to_AttNum[skill_name][1]+'" title="'+Character.skill_titles[skill_name]+'" style="margin:0px;cursor:pointer;"></div></a>';
			}
			xhtml += '</div></span>';
			xhtml += '<select onfocus="TWPro.twpro_customJobs(\'calcBlurNow\');TWPro.twpro_customJobs(\'switchFocus\')" style="width: 190px;" onchange="TWPro.twpro_customJobs(\'switch\')"><option>...</option></select>';
			xhtml += '<input type="hidden" title="{shortname}" maxlength="20" />';
			xhtml += '<input onfocus="TWPro.twpro_customJobs(\'calcBlurNow\');" type="text" title="'+TWPro.lang.CUSTOMNAME+'" style="width: 100px;" onblur="TWPro.twpro_customJobs(\'blur\', [3, this.value, this])" />';
			xhtml += '<input type="text" title="'+TWPro.lang.CUSTOMCALCULATION+'" style="width: 300px;" onblur="TWPro.twpro_customJobs(\'calcBlur\')" onfocus="TWPro.twpro_customJobs(\'calcFocus\')" />';
			xhtml += '<input onfocus="TWPro.twpro_customJobs(\'calcBlurNow\');" type="checkbox" title="'+TWPro.lang.CUSTOMENABLED+'" checked="checked" onblur="TWPro.twpro_customJobs(\'blur\', [1, this.checked*1, this])" />';
			xhtml += '<button onfocus="TWPro.twpro_customJobs(\'calcBlurNow\');" onclick="TWPro.twpro_customJobs(\'new\')" title="'+TWPro.lang.NEW+'">+</button>'
			xhtml += '</div>';
			xhtml += '<input type="checkbox" id="twpro_settings_persist" checked="checked" title="'+TWPro.lang.PERSISTSETTINGS+'" />';
			xhtml += '<a href="javascript:void TWPro.twpro_confirmHideJobs();" class="button_wrap button"><span class="button_left"></span><span class="button_middle">'+TWPro.lang.CONFIRM+'</span><span class="button_right"></span><span style="clear: both;"></span></a>';
			
			xhtml += '<span style="position:absolute"><label><input id="twpro_jobsort_filter" type="checkbox"' + (TWPro.twpro_preference('Hide_unjobs')?' checked="checked"':'') + '> '+TWPro.lang.FILTERJOBS+'</label><br>';
			xhtml += '<label><input id="twpro_no_extended_joblist" type="checkbox"' + (TWPro.twpro_preference('no_extended')?' checked="checked"':'') + '> '+TWPro.lang.NOEXTENDEDJOBLIST+'</label></span>';
			xhtml += '</td></tr>';
			xhtml += '</tbody></table></div>';
			
			xhtml += '</div></td>';
			xhtml += '<td class="border_shadow_right"></td>';
			xhtml += '</tr>';
			xhtml += '<tr>';
			xhtml += '<td class="edge_shadow_bottom_left"></td>';
			xhtml += '<td class="border_shadow_bottom"></td>';
			xhtml += '<td class="edge_shadow_bottom_right"></td>';
			xhtml += '</tr>';
			xhtml += '</tbody></table>';
			AjaxWindow.show("TWPro_settings", undefined, "Jobs", xhtml, {title:TWPro.lang.HIDEJOBS}, true);
			$E("#window_TWPro_settings_Jobs .window_refresh").href = "javascript:TWPro.twpro_disableJobs();";
			document.getElementById("window_TWPro_settings_Jobs").getElementsByTagName("h2")[0].style.cssText = "text-align:center";
			TWPro.moveJobAdjusted = false;
			TWPro.disableSetsAdjusted = false;
			TWPro.twpro_customJobs("load");
		}
		function twpro_confirmHideJobs(){
			var disabledSets = '|';
			for(var internal_name in TWPro.twpro_setItemsCount){
				if(document.getElementById("twpro_settings_enabled_"+internal_name) && !document.getElementById("twpro_settings_enabled_"+internal_name).checked){
						disabledSets += internal_name+'|';
				}
			}
			TWPro.disableSetsAdjusted = TWPro.prefs["disabledSets"] != disabledSets;
			if(TWPro.disableSetsAdjusted){
				TWPro.prefs["disabledSets"] = disabledSets;
				if(document.getElementById("twpro_settings_persist").checked) document.cookie = "twpro_disabledSets=" +disabledSets + "; max-age=5184000";
				TWPro.twpro_setItems = {};
				TWPro.twpro_setItemsCount = {};
				for (var twpro_set in TWPro.twpro_setBonus) {
					TWPro.twpro_setItemsCount[twpro_set] = 0;
				}
				for (var twpro_wear in Wear.wear) {
					if ((Wear.wear[twpro_wear].obj.set != null) && !TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] && TWPro.twpro_validSet(Wear.wear[twpro_wear].obj)) {
						TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] = Wear.wear[twpro_wear].obj;
						TWPro.twpro_setItemsCount[Wear.wear[twpro_wear].obj.set.key]++;
					}
				}
				var bagitems = Bag.getInstance().items;
				for (var twpro_bag in bagitems) {
					if ((bagitems[twpro_bag].obj.set != null) && !TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] && TWPro.twpro_validSet(bagitems[twpro_bag].obj)) {
						TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] = bagitems[twpro_bag].obj;
						TWPro.twpro_setItemsCount[bagitems[twpro_bag].obj.set.key]++;
					}
				}
			}
			if(TWPro.moveJobAdjusted){
				var hidden = document.getElementById("twpro_settings_jobs_hidden"), inputs, disable={},persist=[], count=0;
				if(!hidden) return;
				hidden = hidden.options;
				for(; count<hidden.length; count++){
					persist.push(hidden[count].value);
					disable[hidden[count].value] = true;
				}
				TWPro.disabledJobs = disable;
				TWPro.twpro_invHash = '';
				TWPro.twpro_calculated = false;
				inputs = document.getElementById("twpro_settings_jobs_shown").options.length*1;
				inputs += count;
				persist = persist.join("|");
				TWPro.prefs["hidejobs"] = persist;
				if(document.getElementById("twpro_settings_persist").checked) document.cookie = "twpro_hidejobs=" +persist + "; max-age=5184000";
			}
			var pref_changed = TWPro.twpro_preference("Hide_unjobs") != TWPro.twpro_preference("Hide_unjobs", document.getElementById("twpro_jobsort_filter").checked);
			pref_changed = TWPro.twpro_preference("no_extended") != TWPro.twpro_preference("no_extended", document.getElementById("twpro_no_extended_joblist").checked) || pref_changed;
			if((TWPro.twpro_customJobs("save") && !(TWPro.twpro_calculated=false)) && pref_changed || (TWPro.moveJobAdjusted && document.getElementById('twpro_jobList') && document.getElementById('twpro_jobList').options.length > 1) || TWPro.disableSetsAdjusted){
				TWPro.twpro_setBonusParsed = false;
				var lastSelected = document.getElementById('twpro_jobList').options[document.getElementById('twpro_jobList').selectedIndex].value*1;
				if(lastSelected >= 0) lastSelected = TWPro.twpro_jobs[lastSelected].shortName;
				TWPro.twpro_customJobs("clear_item_cache");
				document.getElementById('twpro_jobList').options.length = 1;
				document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
				TWPro.twpro_updateList();
				if(lastSelected && TWPro.prefs["hidejobs"].indexOf('|'+lastSelected+'|') == -1){
					for(var i=1; i<document.getElementById('twpro_jobList').options.length; i++){
						if(TWPro.twpro_jobs[document.getElementById('twpro_jobList').options[i].value].shortName == lastSelected && (lastSelected=i))break;
					}
				}
				if(typeof lastSelected != "number" || lastSelected < 0)lastSelected = 0;
				document.getElementById('twpro_jobList').selectedIndex = lastSelected;
				TWPro.twpro_changeJob();
			}
			new HumanMessage(document.getElementById("twpro_settings_persist").checked?TWPro.lang.SETTINGSSAVED:TWPro.lang.SETTINGSSAVEDSESSION, {type:'success'});
			TWPro.moveJobAdjusted = false;
			TWPro.disableSetsAdjusted = false;
		}
		function twpro_moveJobSetting(from_to_dest){
			var from,dest,temp=document.createDocumentFragment();
			if(from_to_dest == "show_to_hide"){
				from = document.getElementById("twpro_settings_jobs_shown").options;
				dest = document.getElementById("twpro_settings_jobs_hidden");
			}
			else if(from_to_dest == "hide_to_show"){
				from = document.getElementById("twpro_settings_jobs_hidden").options;
				dest = document.getElementById("twpro_settings_jobs_shown");
				
			}
			else {
				new HumanMessage("TWPro.moveJobSetting(): invalid argument: " + from_to_dest);
				TWPro.debug_log("Invalid destination: " + from_to_dest, "twpro_moveJobSetting");
				return;
			}
			for(var i=from.length-1; i>=0; i--){
				if(from[i].selected) temp.insertBefore(from[i], temp.firstChild);
			}
			dest.appendChild(temp);
			TWPro.moveJobAdjusted = true;
		}
		// stellt alle Jobs zusammen und fuegt einzelne Listenelemente ein
		function twpro_updateInternalJobInfo(){
			var twpro_jobCount = 0;
			if(!TWPro.disabledJobs) TWPro.disabledJobs = {};
			TWPro.twpro_customJobs("clear_cache");
			TWPro.twpro_jobs = [];
			for (var twpro_job in JobList) {
				if(TWPro.disabledJobs[JobList[twpro_job].shortName]) continue;
				// prevent crash if TW Pro encounters a new job
				TWPro.twpro_jobs[twpro_job*1] = JobList[twpro_job];
				TWPro.twpro_jobs[twpro_job*1].west_id = twpro_job;
				TWPro.twpro_jobs[twpro_job*1].twpro_calculation = TWPro.twpro_jobs[parseInt(twpro_job)].formular.replace(/skills\./g, 'Character.skills.');
				twpro_jobCount++;
			}
			if(!TWPro.disabledJobs['construct']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '3 * Character.skills.build + 1 * Character.skills.repair + 1 * Character.skills.leadership',
				'malus': 0,/*0: gentleman/dancer/golden set DOES add laborpoints, real AP differs by 1 but who cares*/
				'name': TWPro.lang.CONSTRUCTION,
				'shortName': 'construct'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['duelshootingatt']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 1 * Character.skills.appearance + 1 * Character.skills.shot',
				'malus': -1,
				'name': TWPro.lang.DUELSHOOTINGATT,
				'shortName': 'duelshootingatt'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['duelshootingdef']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 1 * Character.skills.tactic + 1 * Character.skills.shot',
				'malus': -1,
				'name': TWPro.lang.DUELSHOOTINGDEF,
				'shortName': 'duelshootingdef'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['duelvigor']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.reflex + 1 * Character.skills.tough + 1 * Character.skills.punch',
				'malus': -1,
				'name': TWPro.lang.DUELVIGOR,
				'shortName': 'duelvigor'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['fortatt']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 2 * Character.skills.leadership + 2 * Character.skills.endurance + 1 * Character.skills.health',
				'malus': -1,
				'name': TWPro.lang.FORTATTACK,
				'shortName': 'fortatt'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['fortdef']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 2 * Character.skills.leadership + 2 * Character.skills.hide + 1 * Character.skills.health',
				'malus': -1,
				'name': TWPro.lang.FORTDEFEND,
				'shortName': 'fortdef'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['speed']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.ride + 100',//=100 * Character.default_speed/Character.speed
				'malus': -1,
				'name': TWPro.lang.SPEED,
				'shortName': 'speed'
			}) && twpro_jobCount++;
			twpro_jobCount += TWPro.twpro_customJobs("get")*1||0;
			TWPro.twpro_sortJobs();
			while (TWPro.twpro_jobs.length > twpro_jobCount) {
				TWPro.twpro_jobs.pop();
			}
		}
		function twpro_customJobs(action, args){
			try{
				var custom = TWPro.prefs["customJobs"],//(?:\d\s*\*\s*[A-Za-z_.\[\]"']+(?:\s*\+\s*)?)+
				REcustom = /^(cj_\d+)#([01])#(.+?)#(.+?)$/,
				screen_settings = document.getElementById("twpro_settings_customJob");
				if(action == "get"){
					if(!custom) return 0;
					var customs = custom.split('|'), twpro_jobCount=0;
					for(var i=0; i<customs.length; i++){
						var custom_i = customs[i].match(REcustom);
						if(!custom_i) continue;
						var shortName = custom_i[1],
						enabledJob = custom_i[2],
						twpro_calculation = custom_i[3];
						name = custom_i[4];
						if((function(){try{var i=0, customs=0, custom=0;if(isNaN(eval(twpro_calculation)))throw NaN}catch(e){return true}return false})()) continue;
						TWPro.twpro_jobValues[shortName] = {'erfahrung':0, 'lohn':0, 'glueck':0, 'gefahr':0};
						if(enabledJob == "1") (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
							'twpro_calculation': twpro_calculation,
							'malus': -1,
							'name': name,
							'shortName': shortName
						}) && twpro_jobCount++;
					}
					return twpro_jobCount;
				}
				else if(action == "clear_cache"){
					for(var i=TWPro.twpro_jobs.length-1, cleared=0; i>=0; i--){
						if(TWPro.twpro_jobs[i].shortName.match(/^cj_\d+$/)){
							TWPro.twpro_jobValues[TWPro.twpro_jobs[i].shortName] = null;
							delete TWPro.twpro_jobValues[TWPro.twpro_jobs[i].shortName];
							TWPro.twpro_jobs.splice(i, 1);
							cleared++;
						}
					}
					return cleared;
				}
				else if(action == "clear_item_cache"){
					var items = Bag.getInstance().items, i, item, j, k, deleted=0;
					for(i in items){
						item = items[i].obj;
						if(item.twpro_jobbonus){
							k=0;
							for(j in item.twpro_jobbonus){
								k++;
								if(j.match(/^cj_\d+$/)){
									delete item.twpro_jobbonus[j];
									if(TWPro.twpro_itemStorage[item.item_id] && TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus){
										delete TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus[j];
									}
									k--;
									deleted++;
								}
							}
							if(!k) delete item.twpro_jobbonus;
						}
					}
					for(i in Wear.wear){
						item = Wear.wear[i].obj;
						if(item.twpro_jobbonus){
							k=0;
							for(j in item.twpro_jobbonus){
								k++;
								if(j.match(/^cj_\d+$/)){
									delete item.twpro_jobbonus[j];
									if(TWPro.twpro_itemStorage[item.item_id] && TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus){
										delete TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus[j];
									}
									k--;
									deleted++;
								}
							}
							if(!k) delete item.twpro_jobbonus;
						}
					}
					return deleted;
				}
				else if(screen_settings){
					var select = screen_settings.getElementsByTagName("select")[0],
					shortName = screen_settings.getElementsByTagName("input")[0],
					name = screen_settings.getElementsByTagName("input")[1],
					calculation = screen_settings.getElementsByTagName("input")[2],
					enabledJob = screen_settings.getElementsByTagName("input")[3],
					wannabejob = shortName.value+"#"+enabledJob.checked*1+"#"+calculation.value+"#"+name.value;
					if(action == "load"){
						select.options.length = 0;
						if(custom){
							var customs = custom.split('|');
							for(var i=0; i<customs.length; i++){
								var custom_i = customs[i].match(REcustom), valid = true;
								if(!custom_i && (invalid = false)) custom_i = select.options[select.selectedIndex].value.match(/^(.+?)#(.+?)#(.+?)#(.+?)$/);
								if(!custom_i) continue;
								var shortName = custom_i[1],
								enabledJob = custom_i[2],
								calculation = custom_i[3],
								name = custom_i[4];
								select.add(new Option(name, shortName+"#"+enabledJob+"#"+calculation+"#"+name), null);
								select.options[select.options.length-1].style.backgroundColor = valid?enabledJob=="1"?"#A0DA78":"#FFA500":"#E89678";
							}
						}
						if(!custom || !customs.length) return TWPro.twpro_customJobs("new");
						return TWPro.twpro_customJobs("switch");
					}
					else if(select.selectedIndex >= 0){
						if(action == "switch"){
							custom = select.options[select.selectedIndex].value.match(REcustom);
							if(!custom) custom = select.options[select.selectedIndex].value.match(/^(.+?)#(.+?)#(.+?)#(.+?)$/);
							if(!custom){
								shortName.value = "cj_"+((new Date()).getTime()+"").substring(3);
								enabledJob.checked = true;
								calculation.value = "";
								name.value = TWPro.lang.NEW;
								name.style.backgroundColor = "#AODA78";
								calculation.style.backgroundColor = "#E89678";
								return 0;
							}
							window.clearTimeout(TWPro.twpro_calc_blurred);
							shortName.value = custom[1];
							enabledJob.checked = custom[2] == "1";
							calculation.value = custom[3];
							name.value = custom[4];
							TWPro.twpro_customJobs("check");
						}
						else if(action == "blur" || action == "save" || action == "new"){
							select.options[select.selectedIndex].value = wannabejob;
							select.options[select.selectedIndex].style.backgroundColor = wannabejob.match(REcustom) ? enabledJob.checked ? "#A0DA78" : "#FFA500" : "#E89678";
							select.options[select.selectedIndex].innerHTML = name.value.replace(/&/g,'&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
						}
					}
					
					if(action == "new" || action == "cleared&new"){
						if(action == "new" && (name.value == "" || name.value == TWPro.lang.NEW) && calculation.value == "" && select.options.length){
							if(select.selectedIndex < 0) select.selectedIndex = 0;
						}
						else {
							for(var i=0; i<select.options.length; i++){
								if(select.options[i].value == "" || select.options[i].value.replace(/^cj_\d+/,'') == "###" || select.options[i].value.replace(/^cj_\d+/,'') == "###"+TWPro.lang.NEW){
									select.selectedIndex = i;
									TWPro.twpro_customJobs("switch");
									return 0;
								}
							}
							document.getElementById("twpro_settings_calc_helper").style.display = "none";
							select.add(new Option(TWPro.lang.NEW, ""), null);
							select.options[select.options.length-1].style.backgroundColor = "#E89678";
							select.selectedIndex = select.options.length-1;
							select.options[select.options.length-1].value = shortName.value+"###"+TWPro.lang.NEW;
							shortName.value = "cj_"+((new Date()).getTime()+"").substring(3);
							enabledJob.checked = true;
							calculation.value = "";
							name.value = TWPro.lang.NEW;
							calculation.style.backgroundColor = "#E89678";
						}
					}
					else if(action == "check" || action == "blur"){
						name.style.backgroundColor =  ["cj_0123456789", "1", "1 * Character.skills.ride", name.value].join("#").match(REcustom) ? "#A0DA78" : "#E89678";
						var code = calculation.value,
							check = ["cj_0123456789", "1", code, "Valid name"];
						try{(function(){var res=0,i=0,select=0,args=0,check=0,calculation=0,name=0,shortName=0,wannabejob=0,enabledJob=0;if(isNaN(eval(code)))throw NaN})();}catch(e){/*new HumanMessage("Invalid TW Pro Calculation!");*/check = [];}
						if(args && args[1] == 2) shortName.value = "cj_"+((new Date()).getTime()+"").substring(3);
						wannabejob = wannabejob.replace(/^.*?#/, shortName.value+"#");
						select.options[select.selectedIndex].value = wannabejob;
						calculation.style.backgroundColor = check.join("#").match(REcustom) ? "#A0DA78" : "#E89678";
					}
					else if(action == "switchFocus"){
						if((name.value == "" || name.value == TWPro.lang.NEW) && calculation.value == ""){
							select.remove(select.selectedIndex);
							TWPro.twpro_customJobs("cleared&new");
							return 0;
						}
					}
					else if(action == "calcFocus"){
						window.clearTimeout(TWPro.twpro_calc_blurred);
						TWPro.twpro_calc_blurred = null;
						document.getElementById("twpro_settings_calc_helper").style.display = "block";
					}
					else if(action == "calcBlur"){
						TWPro.twpro_customJobs("blur", [2, calculation.value, calculation]);
						if((typeof TWPro.twpro_calc_blurred != "undefined" && TWPro.twpro_calc_blurred != null) || action == "calcBlur"){
							window.clearTimeout(TWPro.twpro_calc_blurred);
							TWPro.twpro_calc_blurred = window.setTimeout(function(){
								TWPro.twpro_customJobs("calcBlurNow");
							}, 500);
						}
					}
					else if(action == "calcBlurNow"){
						window.clearTimeout(TWPro.twpro_calc_blurred);
						TWPro.twpro_calc_blurred = null;
						document.getElementById("twpro_settings_calc_helper").style.display = "none";
					}
					else if(action == "editCalculation" && typeof args == "string" && (args in TWPro.skill_to_AttNum)){
						var calc = calculation.value,
						REcalc = new RegExp("(\\d)\\s*\\*\\s*Character\\.skills\\."+args, ""),
						match;
						if((match=calc.match(REcalc))){
							var count = match[1]*1;
							if(++count <= 9) calc = calc.replace(REcalc, count + " * Character.skills."+args);
						}
						else {
							calc += (calc==""?"":" + ")+"1 * Character.skills."+args;
						}
						calculation.value = calc;
						TWPro.twpro_customJobs("blur", [2, calc, calculation]);
						calculation.focus();
					}
					else if(action == "save"){
						var res = [], res;
						for(var i=0; i<select.options.length; i++){
							if((match=select.options[i].value.match(REcustom))){
								var code = match[2];
								(function(){var res=0,i=0,select=0,custom=0;if(isNaN(eval(code)))throw NaN})();
								res.push(encodeURIComponent(select.options[i].value));
							}
						}
						res = res.join('|');
						custom = TWPro.prefs["customJobs"] != decodeURIComponent(res);
						TWPro.prefs["customJobs"] = decodeURIComponent(res);
						if(document.getElementById("twpro_settings_persist").checked) document.cookie = "twpro_customJobs="+res+"; max-age=5184000";
						return custom;
					}
				}
			} catch (e) {
				TWPro.debug_log(e, "twpro_customJobs");
			}
			return 0;
		}
		function twpro_updateList() {
			if (TWPro.twpro_failure) return;
			if (!TWPro.twpro_calculated) {
				document.getElementById('twpro_jobList').blur();
				TWPro.twpro_updateInternalJobInfo();
				document.getElementById('twpro_jobList').focus();
			}
			TWPro.twpro_calculateJobs();
			TWPro.twpro_sortJobs();
			TWPro.twpro_insertListItems();
			document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
		}
	
		function twpro_insertListItems(updateTip, oneItem) {
			if (TWPro.twpro_failure) return;
			var twpro_jobList = document.getElementById('twpro_jobList'),
				twpro_job,
				jobsort = TWPro.twpro_jobsort,
				twpro_jobElement, twpro_apstmp, extra, unit, twpro_type, twpro_currentlp,
				starter=0, ending=TWPro.twpro_jobs.length,
				skippedOptions = -1;
			if (updateTip && oneItem === true) {
				oneItem = twpro_jobList.options[twpro_jobList.selectedIndex].value*1;
			} else oneItem = null;
			if (oneItem instanceof Array && oneItem.length == 2) {
				starter = oneItem[0];
				ending = oneItem[0]+1;
			}
			if (twpro_jobList.length < TWPro.twpro_jobs.length) {
				updateTip = false;
			}
			var twpro_setCounter = TWPro.twpro_setCount;
			for(var twpro_set in twpro_setCounter){
				twpro_setCounter[twpro_set] = 0;
			}
			for (var twpro_i=starter; twpro_i<ending; twpro_i++) {
				if (oneItem !== null && oneItem instanceof Array) {
					twpro_job = TWPro.twpro_jobs[oneItem[0]];
					twpro_jobElement = twpro_jobList.options[oneItem[1]];
				} else {
					twpro_job = TWPro.twpro_jobs[twpro_i];
					twpro_jobElement = updateTip && twpro_jobList.options.length > 1 && twpro_i < twpro_jobList.options.length ? twpro_jobList.options[twpro_i-skippedOptions] : document.createElement('option');
				}
				twpro_apstmp = twpro_job.twpro_aps;
				twpro_jobElement.value = twpro_i;
				extra = TWPro.twpro_jobValues[twpro_job.shortName];
				unit = twpro_job.shortName=="speed"?"%":twpro_job.shortName=="regeneration"?"":" "+TWPro.lang.LABORP;
				try{
					if (twpro_job.shortName=="speed") {
						twpro_currentlp = Math.round(100*Character.default_speed/Character.speed);
					} else if (twpro_job.shortName=="regeneration") {
						twpro_currentlp = eval(twpro_job.twpro_calculation)||0;
					} else {
						twpro_currentlp = twpro_job.twpro_skill - twpro_job.malus - 1;
						for (twpro_type in Wear.wear) {
							if (Wear.wear[twpro_type].obj.twpro_bonus) {
								twpro_currentlp += Wear.wear[twpro_type].obj.twpro_jobbonus[twpro_job.shortName] || 0;
							}
							if (Wear.wear[twpro_type].obj.set) {
								twpro_setCounter[Wear.wear[twpro_type].obj.set.key]++;
							}
						}
						for (var twpro_set in twpro_setCounter) {
							if (twpro_setCounter[twpro_set] > 0) {
								if (TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]]) twpro_currentlp += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
								twpro_setCounter[twpro_set] = 0;
							}
						}

						{/*twpro_currentlp = twpro_job.twpro_calculation+" + "+twpro_job.twpro_calculation.replace(/Character\.skills\./g, "Character.bonus.skills_total.");
						if ((twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef" || twpro_job.shortName == "duelvigor") && Wear.wear.right_arm && Wear.wear.right_arm.obj.bonus) {
							var obj_bonus = Wear.wear.right_arm.obj.bonus.attributes,
								obj_boni = {
								build: obj_bonus.strength,
								punch: obj_bonus.strength,
								tough: obj_bonus.strength,
								endurance: obj_bonus.strength,
								health: obj_bonus.strength,
						
								ride: obj_bonus.flexibility,
								reflex: obj_bonus.flexibility,
								dodge: obj_bonus.flexibility,
								hide: obj_bonus.flexibility,
								swim: obj_bonus.flexibility,
						
								aim: obj_bonus.dexterity,
								shot: obj_bonus.dexterity,
								pitfall: obj_bonus.dexterity,
								finger_dexterity: obj_bonus.dexterity,
								repair: obj_bonus.dexterity,
						
								leadership: obj_bonus.charisma,
								tactic: obj_bonus.charisma,
								trade: obj_bonus.charisma,
								animal: obj_bonus.charisma,
								appearance: obj_bonus.charisma
							};
							twpro_currentlp += " - ("
								+ twpro_job.twpro_calculation.replace(
									/Character\.skills\.([a-z_]+)/g,
									"(Wear.wear.right_arm.obj.bonus.skills.$1 || 0) + (obj_boni.$1 || 0)"
									)
								+ ") + " +
								(twpro_job.shortName=="duelvigor"
									? Wear.wear.right_arm.obj.sub_type=="hand"
										? 1
										: 0
									: Wear.wear.right_arm.obj.sub_type=="shot"
										? 1
										: 0
								);
						} else if ((twpro_job.shortName == "fortatt" || twpro_job.shortName == "fortdef") && Wear.wear.left_arm) {
							var obj_bonus = Wear.wear.left_arm.obj.bonus.attributes,
								obj_boni = {
								build: obj_bonus.strength,
								punch: obj_bonus.strength,
								tough: obj_bonus.strength,
								endurance: obj_bonus.strength,
								health: obj_bonus.strength,
						
								ride: obj_bonus.flexibility,
								reflex: obj_bonus.flexibility,
								dodge: obj_bonus.flexibility,
								hide: obj_bonus.flexibility,
								swim: obj_bonus.flexibility,
						
								aim: obj_bonus.dexterity,
								shot: obj_bonus.dexterity,
								pitfall: obj_bonus.dexterity,
								finger_dexterity: obj_bonus.dexterity,
								repair: obj_bonus.dexterity,
						
								leadership: obj_bonus.charisma,
								tactic: obj_bonus.charisma,
								trade: obj_bonus.charisma,
								animal: obj_bonus.charisma,
								appearance: obj_bonus.charisma
							};
							twpro_currentlp += " - ("
								+ twpro_job.twpro_calculation.replace(
									/Character\.skills\.([a-z_]+)/g,
									"(Wear.wear.left_arm.obj.bonus.skills.$1 || 0) + (obj_boni.$1 || 0)"
									)
								+ ")";
						}
						twpro_currentlp = Math.round(eval(twpro_currentlp) - Math.max(0, twpro_job.malus) - (twpro_job.malus<0?twpro_job.malus:0) - 1);*/};
					}
				} catch (e) {
					twpro_currentlp = 0;
				}
				if (jobsort in extra && jobsort != "laborp" && twpro_job.malus >= 0) {
					extra = extra[jobsort];
					if (jobsort == "erfahrung") extra *= 2;
					extra = " " + extra;
				} else {
					extra = "";
				}
				twpro_jobElement.text = ((twpro_job.name.length > 25) ? (twpro_job.name.substr(0, 23) + '...') : (twpro_job.name)) + ' (' + twpro_apstmp+unit + (TWPro.twpro_preference("no_extended")?'':' / ' + twpro_currentlp+unit) + ')'+extra;
				if (twpro_apstmp >= 0) {
					//if (TWPro.twpro_preference('Hide_unjobs')) {
					//	twpro_jobElement.style.backgroundColor = 'rgb(207, 195, 166)';
					if (twpro_currentlp < 0) {
						twpro_jobElement.style.backgroundColor = 'rgb(230, 235, 108)';
					} else {
						twpro_jobElement.style.backgroundColor = 'rgb(160, 218, 120)';
					}
					if (!twpro_jobElement.parentNode) twpro_jobList.appendChild(twpro_jobElement);
				}
				else if (!TWPro.twpro_preference('Hide_unjobs')) {
					twpro_jobElement.style.backgroundColor = 'rgb(232, 150, 120)';
					if (!twpro_jobElement.parentNode) twpro_jobList.appendChild(twpro_jobElement);
				} else skippedOptions++;
	
				//   norm rgb(207, 195, 166);
				//
				//
			}
		}
	
		// bestimmt Sortierreihenfolge der Jobs in der Liste
		function twpro_sortJobs(){
			if (TWPro.twpro_failure) return;
			var sortby = TWPro.twpro_jobsort, sortfunc, jobRank = {},
				twpro_jobValues = TWPro.twpro_jobValues;
			// optimize for job rank
			if(sortby == 'comb'){
				for(var i=0, twpro_job, twpro_jobv; i<TWPro.twpro_jobs.length; i++){
					if(!(twpro_job=TWPro.twpro_jobs[i])) continue;
					twpro_jobv = twpro_jobValues[twpro_job.shortName];
					jobRank[twpro_job.shortName] = TWPro.multipliers.xp * twpro_jobv.erfahrung + 
													TWPro.multipliers.wages * twpro_jobv.money + 
													TWPro.multipliers.luck * twpro_jobv.luckItemValue + 
													TWPro.multipliers.danger * (100-twpro_jobv.gefahr);
				}
			}
			switch(sortby){
			case 'name':
				sortfunc = function(twpro_a, twpro_b){
					var twpro_a_str = twpro_a.name,
						twpro_b_str = twpro_b.name;
					return twpro_a_str.localeCompare(twpro_b_str);
				};
				break;
			case 'comb':
				sortfunc = function(twpro_a, twpro_b){
					var twpro_a_str = twpro_a.name,
						twpro_b_str = twpro_b.name;
						return (jobRank[twpro_a.shortName] == jobRank[twpro_b.shortName]) ? twpro_a_str.localeCompare(twpro_b_str) : (jobRank[twpro_b.shortName] - jobRank[twpro_a.shortName]);
				};
				break;
			default:
				sortfunc = function(twpro_a, twpro_b){
					var twpro_a_str = twpro_a.name,
						twpro_b_str = twpro_b.name;
						return (twpro_jobValues[twpro_a.shortName][sortby] == twpro_jobValues[twpro_b.shortName][sortby]) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName][sortby] - twpro_jobValues[twpro_a.shortName][sortby]);
				}
				break;
			}
			TWPro.twpro_jobs.sort(sortfunc);
			if(sortby == 'danger') TWPro.twpro_jobs.reverse();
		}
	
		function twpro_sortPlus(twpro_a, twpro_b) {
			if (TWPro.twpro_failure) return 0;
			var twpro_a_num = parseInt(twpro_a.substring(0, twpro_a.search(/ /)));
			var twpro_b_num = parseInt(twpro_b.substring(0, twpro_b.search(/ /)));
			return twpro_b_num - twpro_a_num;
		}
	
		
		function twpro_validSet(obj_set_obj){
			var valid = true,
				obj_set=obj_set_obj,
				disabledSets = TWPro.prefs["disabledSets"],
				wearable = true;
			if(!(obj_set_obj = typeof obj_set_obj == "string")){
				wearable = TWPro.twpro_wearItem(obj_set);
				obj_set = obj_set.set;
				TWPro.set_names[obj_set.key] = obj_set.name;
				obj_set = obj_set.key;
			}
			switch (obj_set) {
				case "season_set":
				case "set_sleeper":
					valid = false;//No bonuses, don't calculate
					break;
				case "set_dancer":
					valid = Character.characterSex == "female";
					break;
				case "set_farmer":
					
					break;
				case "set_gentleman":
					//valid = Character.characterSex == characterSex;
					break;
				case "set_indian":
					
					break;
				case "set_mexican":
					
					break;
				case "set_pilgrim_female":
					valid = Character.characterSex == "female";
					break;
				case "set_pilgrim_male":
					valid = Character.characterSex == "male";
					break;
				case "set_quackery":
					
					break;
				case "fireworker_set":
					valid = false;//Handled by TWPro.twpro_prepareItem
					break;
				case "gold_set":
					
					break;
				case "greenhorn_set":
					
					break;
				case "tw_times_set":
					
					break;
				default:
					if(!top.twpro_unknown_sets) top.twpro_unknown_sets = [];
					top.twpro_unknown_sets.push(obj_set);
					valid = false;//unknown set
					break;
			}
			return valid && (obj_set_obj || (disabledSets+'').indexOf('|'+obj_set+'|') == -1) && wearable;
		}

		// optimized version of twpro_initializeItems
		function twpro_initializeItem (item) {
			var type = item.type,
				item_id = item.item_id;
			if (item.inv_id) {
				/* in bag */
				
			} else {
				/* wearing */
				item.twpro_place = twpro_place;
				item.twpro_html = document.getElementById('char_' + type);
				TWPro.twpro_bag.twpro_priceWear += item.sell_price;
				TWPro.twpro_bag.twpro_countType[type]++;
				if (type == "yield") {
					TWPro.twpro_bag.twpro_priceYields += item.sell_price;
				}
				else {
					TWPro.twpro_bag.twpro_priceItems += item.sell_price;
				}
				if (item.set && !TWPro.twpro_setItems[item_id] && TWPro.twpro_validSet(item)) {
					TWPro.twpro_setItems[item_id] = item;
					TWPro.twpro_setItemsCount[item.set.key]++;
				}
				if (!TWPro.twpro_invHashTest[item_id]) {
					TWPro.twpro_invHashTest[item_id] = 1;
				}
			}
		}

		function twpro_initializeItems(twpro_place, twpro_itemlist) {
			if (TWPro.twpro_failure) return;
			var twpro_i = 0;
			if (twpro_place == 'wear') {
				for (var twpro_wear in Wear.wear) {
					Wear.wear[twpro_wear].obj.twpro_place = twpro_place;
					Wear.wear[twpro_wear].obj.twpro_html = document.getElementById('char_' + Wear.wear[twpro_wear].obj.type);
					TWPro.twpro_bag.twpro_priceWear += Wear.wear[twpro_wear].obj.sell_price;
					TWPro.twpro_bag.twpro_countType[Wear.wear[twpro_wear].obj.type]++;
					if (Wear.wear[twpro_wear].obj.type == 'yield') {
						TWPro.twpro_bag.twpro_priceYields += Wear.wear[twpro_wear].obj.sell_price;
					}
					else {
						TWPro.twpro_bag.twpro_priceItems += Wear.wear[twpro_wear].obj.sell_price;
					}
					if ((Wear.wear[twpro_wear].obj.set != null) && !TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] && TWPro.twpro_validSet(Wear.wear[twpro_wear].obj)) {
						TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] = Wear.wear[twpro_wear].obj;
						TWPro.twpro_setItemsCount[Wear.wear[twpro_wear].obj.set.key]++;
					}
					if (!TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id]) {
						TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id] = 1;
					}
				}
			}
			else if (twpro_place == 'bag') {
				var twpro_itemcount;
				var bagitems = Bag.getInstance().items;
				for (var twpro_bag in bagitems) {
					bagitems[twpro_bag].obj.twpro_place = twpro_place;
					bagitems[twpro_bag].obj.twpro_html = bagitems[twpro_bag].bag_item;
					if (bagitems[twpro_bag].count_text) {
						twpro_itemcount = parseInt(bagitems[twpro_bag].count_text.firstChild.data);
					}
					else {
						twpro_itemcount = 1;
					}
					TWPro.twpro_bag.twpro_priceBag += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
					TWPro.twpro_bag.twpro_countType[bagitems[twpro_bag].obj.type] += twpro_itemcount;
					if (bagitems[twpro_bag].obj.type == 'yield') {
						TWPro.twpro_bag.twpro_priceYields += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
					}
					else {
						TWPro.twpro_bag.twpro_priceItems += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
					}
					if ((bagitems[twpro_bag].obj.set != null) && !TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] && TWPro.twpro_validSet(bagitems[twpro_bag].obj)) {
						TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] = bagitems[twpro_bag].obj;
						TWPro.twpro_setItemsCount[bagitems[twpro_bag].obj.set.key]++;
					}
					if (!TWPro.twpro_invHashTest[bagitems[twpro_bag].obj.item_id]) {
						TWPro.twpro_invHashTest[bagitems[twpro_bag].obj.item_id] = 1;
					}
				}
			}
			else if (twpro_place == 'trader') {
				for (var twpro_obj in twpro_itemlist.items) {
					twpro_itemlist.items[twpro_obj].obj.twpro_place = twpro_place;
					twpro_itemlist.items[twpro_obj].obj.twpro_html = twpro_itemlist.items[twpro_obj].bag_item;
					twpro_itemlist.items[twpro_obj].popup.refresh();
					twpro_i++;
				}
			}
			else if (twpro_place == 'own') {
				for (var twpro_obj in twpro_itemlist.data) {
					twpro_itemlist.data[twpro_obj].twpro_place = twpro_place;
					twpro_i++;
				}
				for (var twpro_bag in twpro_itemlist.bags) {
					for (var twpro_obj in twpro_itemlist.bags[twpro_bag].items) {
						twpro_itemlist.bags[twpro_bag].items[twpro_obj].obj.twpro_html = twpro_itemlist.bags[twpro_bag].items[twpro_obj].bag_item;
					}
				}
			}
		}
	
		// ermittelt die optimalen Kleidungsstuecke und errechnet die resultierenden Arbeitspunkte
		function twpro_calculateJobs() {
			if (TWPro.twpro_failure) return;
			var twpro_setitembonus;
			var twpro_setitemjobname;
			for (var twpro_wear in Wear.wear) {
				TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
			}
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				TWPro.twpro_prepareItem(bagitems[twpro_bag].obj);
			}
			TWPro.twpro_calculated = false;
			TWPro.twpro_setItemsCalc = {};
			TWPro.twpro_setItemsEffect = false;
			for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
				TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_i]] = [null];
			}
			TWPro.twpro_setCount = {};
			for (var twpro_setItemId in TWPro.twpro_setItems) {
				var twpro_setItem = TWPro.twpro_setItems[twpro_setItemId];
				if (twpro_setItem.twpro_wearable && TWPro.twpro_setItemsCount[twpro_setItem.set.key] >= 2) {
					TWPro.twpro_setItemsCalc[twpro_setItem.type].push(twpro_setItem);
					TWPro.twpro_setCount[twpro_setItem.set.key] = 0;
					TWPro.twpro_setItemsEffect = true;
				}
			}
			if(!TWPro.twpro_re_att){
				TWPro.twpro_re_att = {};
				TWPro.twpro_re_skill = {};
				TWPro.twpro_re_skills = {};
				for(var twpro_attname in Character.skill_names){
					var skill_names = Character.skill_names[twpro_attname];
					TWPro.twpro_re_skills[twpro_attname] = new RegExp(skill_names.join('|'), 'g');
					TWPro.twpro_re_att[twpro_attname] = new RegExp(twpro_attname, 'g');
					for(var i=0; i<skill_names.length; i++){
						TWPro.twpro_re_skill[skill_names[i]] = new RegExp(skill_names[i], 'g');
					}
				}
			}
			var re_char_skills = /Character\.skills\./g,
				regen_exist = -1;
			for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
				var twpro_job = TWPro.twpro_jobs[twpro_i];
				if(TWPro.disabledJobs[twpro_job.shortName] || (twpro_job.shortName == "regeneration" && (regen_exist=twpro_i))) continue;
				twpro_job.twpro_jobid = twpro_i;
				twpro_job.twpro_skill = eval(twpro_job.twpro_calculation);
				if(!isFinite(twpro_job.twpro_skill) || isNaN(twpro_job.twpro_skill)) twpro_job.twpro_skill = 0;
				twpro_job.twpro_skills = twpro_job.twpro_calculation.replace(/\s*\+\s*\d+$/, '').replace(re_char_skills, '');
				twpro_job.twpro_attributes = twpro_job.twpro_skills.replace(re_char_skills, '');
				for (var twpro_attname in Character.skill_names) {
					twpro_job.twpro_attributes = twpro_job.twpro_attributes.replace(TWPro.twpro_re_skills[twpro_attname], twpro_attname);
				}
				if (TWPro.twpro_setItemsEffect && !TWPro.twpro_setBonusParsed) {
					for (var twpro_itemSet in TWPro.twpro_setBonus) {
						var twpro_itemSetBouns = TWPro.twpro_setBonus[twpro_itemSet];
						for (var twpro_j = 2; twpro_j < twpro_itemSetBouns.length; twpro_j++) {
							twpro_setitembonus = twpro_itemSetBouns[twpro_j];
							twpro_setitemjobname = twpro_job.shortName;
							twpro_setitembonus.parsedBonus[twpro_setitemjobname] = (twpro_job.malus == -1 ? 0 : twpro_setitembonus.jobBonus.all) +
							(!twpro_setitembonus.jobBonus[twpro_setitemjobname] ? 0 : twpro_setitembonus.jobBonus[twpro_setitemjobname]) + TWPro.twpro_testItem(twpro_job, twpro_setitembonus);
						}
					}
				}
				twpro_job.twpro_bestStats = {};
				for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
					twpro_job.twpro_bestStats[TWPro.twpro_bag.twpro_types[twpro_j]] = 0;
				}
				if (twpro_job.shortName == "fortatt" || twpro_job.shortName == "fortdef") {
					for (var twpro_wear in Wear.wear) {
						if (twpro_wear != "left_arm") {
							TWPro.twpro_compareItem(twpro_job, Wear.wear[twpro_wear].obj);
						}
					}
					for (var twpro_bag in bagitems) {
						if (bagitems[twpro_bag].obj.type != "left_arm") {
							TWPro.twpro_compareItem(twpro_job, bagitems[twpro_bag].obj);
						}
					}
				} else if (twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef") {
					for (var twpro_wear in Wear.wear) {
						var twpro_item = Wear.wear[twpro_wear].obj;
						if (twpro_item.sub_type == "shot") {
							twpro_item.twpro_bonus = true;
							if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
							twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
							if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
							TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
							twpro_job.twpro_bestStats[twpro_item.type] = 1;
						} else if (twpro_item.sub_type != "hand") {
							TWPro.twpro_compareItem(twpro_job, twpro_item);
						}
					}
					for (var twpro_bag in bagitems) {
						var twpro_item = bagitems[twpro_bag].obj;
						if (twpro_item.sub_type == "shot") {
							twpro_item.twpro_bonus = true;
							if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
							twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
							if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
							TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
							twpro_job.twpro_bestStats[twpro_item.type] = 1;
						} else if (twpro_item.sub_type != "hand") {
							TWPro.twpro_compareItem(twpro_job, twpro_item);
						}
					}
				}  else if (twpro_job.shortName == "duelvigor") {
					for (var twpro_wear in Wear.wear) {
						var twpro_item = Wear.wear[twpro_wear].obj;
						if (twpro_item.sub_type == "hand") {
							twpro_item.twpro_bonus = true;
							if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
							twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
							if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
							TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
							twpro_job.twpro_bestStats[twpro_item.type] = 1;
						} else if (twpro_item.sub_type != "shot") {
							TWPro.twpro_compareItem(twpro_job, twpro_item);
						}
					}
					for (var twpro_bag in bagitems) {
						var twpro_item = bagitems[twpro_bag].obj;
						if (twpro_item.sub_type == "hand") {
							twpro_item.twpro_bonus = true;
							if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
							twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
							if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
							TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
							twpro_job.twpro_bestStats[twpro_item.type] = 1;
						} else if (twpro_item.sub_type != "shot") {
							TWPro.twpro_compareItem(twpro_job, twpro_item);
						}
					}
				} else {
					for (var twpro_wear in Wear.wear) {
						TWPro.twpro_compareItem(twpro_job, Wear.wear[twpro_wear].obj);
					}
					for (var twpro_bag in bagitems) {
						TWPro.twpro_compareItem(twpro_job, bagitems[twpro_bag].obj);
					}
				}
				twpro_job.twpro_aps = twpro_job.twpro_skill - Math.max(0, twpro_job.malus+1);
				if (twpro_job.shortName == "speed") {
					if (!TWPro.twpro_bestAnimal || Character.characterClass == "greenhorn") {
						for(var twpro_bag in bagitems){
							var twpro_item = bagitems[twpro_bag].obj;
							if (twpro_item.twpro_jobbonus && twpro_item.twpro_jobbonus.speed) {
								twpro_item.twpro_jobbonus.speed = 0;
								TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus.speed = 0;
							}
						}
						for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
							twpro_job.twpro_bestStats[TWPro.twpro_bag.twpro_types[twpro_j]] = 0;
						}
						twpro_job.twpro_aps = Character.characterClass == "greenhorn" ? 250 : 100;
					}
					else {
						for (var twpro_type in twpro_job.twpro_bestStats) {
							twpro_job.twpro_aps += twpro_job.twpro_bestStats[twpro_type];
						}
					}
				}
				else {
					for (var twpro_type in twpro_job.twpro_bestStats) {
						twpro_job.twpro_aps += twpro_job.twpro_bestStats[twpro_type];
					}
				}
				if (TWPro.twpro_setItemsEffect) {
					var twpro_setItem;
					twpro_job.twpro_parsedItemBonus = {};
					twpro_job.twpro_bestCombi = {};
					for (var twpro_type in twpro_job.twpro_bestStats) {
						twpro_job.twpro_bestCombi[twpro_type] = 0;
						for (var twpro_j = 1; twpro_j < TWPro.twpro_setItemsCalc[twpro_type].length; twpro_j++) {
							twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_j];
							twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id] = TWPro.twpro_testItem(twpro_job, twpro_setItem);
						}
					}
					twpro_job.twpro_noSetAps = twpro_job.twpro_aps;
				}
			}
			if (TWPro.twpro_setItemsEffect) {
				TWPro.twpro_calcSets();
			}
			var moneyFactor = 1 + (PremiumBoni.hasBonus('money')?.50:0), multiplier, moneyMultiplier = 2 * JobCalculation.workSpeed || 2;
			TWPro.debug.unknown_jobs = {};
			TWPro.debug.unknown_jobs_count = 0;
			for(var i=0; i<TWPro.twpro_jobs.length; i++){
				var twpro_job = TWPro.twpro_jobs[i],
					twpro_jv = TWPro.twpro_jobValues[twpro_job.shortName],
					n = 1;
				if (!twpro_jv) {
					twpro_jv = TWPro.twpro_jobValues[twpro_job.shortName] = {
						"erfahrung": 0,
						"lohn": 0,
						"glueck": 0,
						"gefahr": 0
					};
					TWPro.debug.unknown_jobs[i] = twpro_job.shortName;
					TWPro.debug.unknown_jobs_count++;
				}
				twpro_jv.laborp = twpro_job.twpro_aps = Math[twpro_job.shortName == 'speed' ? "round" : "floor"](n*twpro_job.twpro_aps);
				multiplier = Math.pow(Math.max(1,twpro_jv.laborp + 1),.2) * moneyFactor * (twpro_job.malus >= 0);
				twpro_jv.luckItemValue = twpro_job.luckItemValue = Math.floor((13.5 * twpro_jv.glueck + 75) * multiplier);
				twpro_jv.money = twpro_job.money = Math.round((.9 * twpro_jv.lohn + 5) * multiplier  * moneyMultiplier);
			}
			if(!TWPro.disabledJobs['regeneration']){
				if(regen_exist == -1){
					twpro_job = TWPro.twpro_bestLifeRestore();
					twpro_job.twpro_jobid = TWPro.twpro_jobs.length;
					TWPro.twpro_jobs.push(TWPro.twpro_bestLifeRestore());
				}
				else TWPro.twpro_jobs[regen_exist] = TWPro.twpro_bestLifeRestore();
			}
			
			TWPro.twpro_setBonusParsed = true;
			TWPro.twpro_invHash = TWPro.twpro_invHashTest.join(',');
			TWPro.twpro_calculated = true;
			if (TWPro.debug.unknown_jobs_count) {
				var jobIds = [];
				for(var job_id in TWPro.debug.unknown_jobs) {
					jobIds.push(job_id);
				}
				new HumanMessage("TW Pro did not recognise " + TWPro.debug.unknown_jobs_count + " jobs, please report this error (press the button in the bottom right corner).<br>Unknown jobs:" + jobIds.join(", "));
				TWPro.debug_log(TWPro.debug.unknown_jobs, "calculateJobs;unknown_jobs");
			}
		}
	
		function twpro_calcSets() {
			var twpro_testCombi = {};
			for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
				var type = TWPro.twpro_bag.twpro_types[twpro_i];
				// temporary for Golden gun quest, it can be more efficient
				// if (type != "yield") {
					twpro_testCombi[type] = 0;
				//}
			}
			var twpro_setCounter = TWPro.twpro_setCount;
			TWPro.twpro_testnextvalid = [];
			var twpro_testnextvalid = TWPro.twpro_testnextvalid;
			TWPro.twpro_testnextnamen = {};
			var twpro_testnextnamen = TWPro.twpro_testnextnamen;
			for (var twpro_set in twpro_setCounter) {
				twpro_testnextnamen[twpro_set] = twpro_testnextvalid.push(0) - 1;
			}
			var twpro_next = false;
			var twpro_set;
			do {
				for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
					var twpro_job = TWPro.twpro_jobs[twpro_i];
					var twpro_testAps = twpro_job.twpro_noSetAps;
					var speedfactor = 1;
					if ((twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef" || twpro_job.shortName == "vigor") && twpro_testCombi.right_arm) continue;
					for (var twpro_type in twpro_testCombi) {
						if (twpro_testCombi[twpro_type]) {
							twpro_testAps -= twpro_job.twpro_bestStats[twpro_type];
							var twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_testCombi[twpro_type]];
							twpro_testAps += twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id];
						}
					}
					for (var twpro_set in twpro_setCounter) {
						if (twpro_setCounter[twpro_set] > 0) {
							twpro_testAps += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
							speedfactor += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].speedBonus/100 || 0;
						}
					}
					if (twpro_job.shortName == "speed") {
						if (Character.characterClass == "greenhorn") {
							twpro_testAps = 250;
							speedfactor = 1;
						} else if (!TWPro.twpro_bestAnimal) twpro_testAps = 100;
						twpro_testAps *= speedfactor;
					}
					if (twpro_testAps > twpro_job.twpro_aps) {
						twpro_job.twpro_aps = twpro_testAps;
						for (var twpro_type in twpro_testCombi) {
							twpro_job.twpro_bestCombi[twpro_type] = twpro_testCombi[twpro_type];
						}
					}
				}
				do {
					//TWPro.anzahl3++;
					twpro_next = false;
					for (var twpro_type in twpro_testCombi) {
						var twpro_setItemsCalcType = TWPro.twpro_setItemsCalc[twpro_type];
						var twpro_testCombiType = twpro_testCombi[twpro_type];
						if (twpro_testCombiType) {
							twpro_set = twpro_setItemsCalcType[twpro_testCombiType].set.key;
							if ((--twpro_setCounter[twpro_set]) == 1) {
								twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
							}
							else {
								twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
							}
						}
						if ((twpro_testCombiType + 1) < twpro_setItemsCalcType.length) {
							twpro_set = twpro_setItemsCalcType[++twpro_testCombi[twpro_type]].set.key;
							if ((++twpro_setCounter[twpro_set]) == 1) {
								twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
							}
							else {
								twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
							}
							twpro_next = true;
							break;
						}
						else {
							twpro_testCombi[twpro_type] = 0;
						}
					}
				}
				while (twpro_next && twpro_testnextvalid.join('') > 0);
			}
			while (twpro_next);
		}
	
		function twpro_prepareItem(twpro_item) {
			try {
				if (TWPro.twpro_failure) return;
				var twpro_storedItem;
				if (!(twpro_storedItem=TWPro.twpro_itemStorage[twpro_item.item_id])) {
					TWPro.twpro_itemStorage[twpro_item.item_id] = {};
					twpro_storedItem = TWPro.twpro_itemStorage[twpro_item.item_id];
				}
				else {
					if ((twpro_item.twpro_bonus = twpro_storedItem.twpro_bonus)) {
						if(twpro_storedItem.twpro_jobbonus) twpro_item.twpro_jobbonus = twpro_storedItem.twpro_jobbonus;
						else twpro_item.twpro_jobbonus = {};
					}
					twpro_item.twpro_wearable = twpro_storedItem.twpro_wearable;
					return;
				}
				if ((twpro_item.twpro_wearable = TWPro.twpro_wearItem(twpro_item))) {
					if (twpro_item["short"] == "bucket_fire") {
						twpro_item.twpro_bonus = true;
						twpro_item.twpro_jobbonus = {"fire": 15};
						twpro_storedItem.twpro_jobbonus = {"fire": 15};
						TWPro.set_names.fireworker_set = twpro_item.set.name;
					} else {
						var speed=Math.round(100/twpro_item.speed-100);
						if(!isFinite(speed) || isNaN(speed)) speed = 0;
						var twpro_i = 0;
						if (twpro_item.bonus.skills.length == undefined) {
							for (var twpro_skillname in twpro_item.bonus.skills) {
								twpro_i++;
							}
							speed += twpro_item.bonus.skills.ride*1||0;
						}
						if (twpro_item.bonus.attributes.length == undefined) {
							for (var twpro_attname in twpro_item.bonus.attributes) {
								twpro_i++;
							}
							speed += twpro_item.bonus.attributes.flexibility*1||0;
						}
						if (twpro_i > 0) {
							twpro_item.twpro_bonus = true;
							twpro_item.twpro_jobbonus = {};
							twpro_storedItem.twpro_jobbonus = {};
						}
						else {
							twpro_item.twpro_bonus = false;
						}
						if(speed > 0){
							twpro_item.twpro_jobbonus = {"speed": speed};
							twpro_storedItem.twpro_jobbonus = {"speed": speed};
							twpro_item.twpro_bonus = true;
							if (twpro_item.type == "animal") {
								if(speed > TWPro.twpro_bestAnimal) TWPro.twpro_bestAnimal = speed;
							}
						}
						if (twpro_item.damage) {
							var damage_type = twpro_item.type;
							if (twpro_item.sub_type) {
								damage_type += '_' + twpro_item.sub_type;
							}
							if (twpro_item.damage.damage_min > TWPro.damage_min[damage_type]) TWPro.damage_min[damage_type] = twpro_item.damage.damage_min;
							if (twpro_item.damage.damage_max > TWPro.damage_max[damage_type]) TWPro.damage_max[damage_type] = twpro_item.damage.damage_max;
						}
					}
					twpro_storedItem.twpro_bonus = twpro_item.twpro_bonus;
				}
				twpro_storedItem.twpro_wearable = twpro_item.twpro_wearable;
			} catch (e) {
				TWPro.debug_log(e, "twpro_prepareItem");
				TWPro.debug_log({twpro_item:twpro_item});
			}
		}
	
		function twpro_wearItem(twpro_item) {
			if (TWPro.twpro_failure) return false;
			if ((twpro_item.characterClass != null) && (twpro_item.characterClass != Character.characterClass)) {
				return false;
			}
			if ((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease[twpro_item.type] - Character.itemLevelRequirementDecrease['all']) > Character.level)) {
				return false;
			}
			if ((twpro_item.characterSex != null) && ((twpro_item.characterSex != Character.characterSex) || (Character.characterClass == 'greenhorn'))) {
				return false;
			}
			return true;
		}
	
		function twpro_compareItem(twpro_job, twpro_item) {
			if (TWPro.twpro_failure) return;
			var twpro_aktplus = TWPro.twpro_testItem(twpro_job, twpro_item);
			if (twpro_item.twpro_bonus) {
				twpro_item.twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
				TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
			}
			if (twpro_aktplus >= twpro_job.twpro_bestStats[twpro_item.type] && twpro_item.twpro_wearable) {
				twpro_job.twpro_bestStats[twpro_item.type] = twpro_aktplus;
			}
		}
		function twpro_testItem(twpro_job, twpro_item) {
			if (TWPro.twpro_failure) return 0;
			if (twpro_job.shortName == "speed") {
				if (twpro_item.twpro_jobbonus && twpro_item.twpro_jobbonus.speed) {
					return twpro_item.twpro_jobbonus.speed;
				} else {
					return 0;
				}
			}
			if (!twpro_item.twpro_bonus && !twpro_item.jobBonus) {
				return 0;
			}
			// temporary for Golden gun quest, it can be more efficient
			/*if (twpro_item.type == "yield") {
				return 0;
			}*/
			if (TWPro.twpro_itemStorage[twpro_item.item_id]) {
				if (TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] != undefined) {
					return TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName];
				}
			}
			var twpro_aktskills = twpro_job.twpro_skills;
			var twpro_aktattributes = twpro_job.twpro_attributes;
			if(twpro_item.bonus.skills.length !== 0){
				for (var twpro_skillname in twpro_item.bonus.skills) {
					twpro_aktskills = twpro_aktskills.replace(TWPro.twpro_re_skill[twpro_skillname], twpro_item.bonus.skills[twpro_skillname]);
				}
			}
			//if(twpro_item.bonus.attributes instanceof Array){
				for (var twpro_attname in twpro_item.bonus.attributes) {
					if(!TWPro.twpro_re_att[twpro_attname]) continue;
					twpro_aktattributes = twpro_aktattributes.replace(TWPro.twpro_re_att[twpro_attname], twpro_item.bonus.attributes[twpro_attname]);
				}
			//}
			var returnValue = eval(((twpro_aktskills||0)+'+'+(twpro_aktattributes||0)).replace(/[a-z_]+/gi, '0'));
			return isNaN(returnValue) || !isFinite(returnValue) ? 0 : returnValue;
		}

		function twpro_changeItem(change) {
			if (TWPro.twpro_failure) return;
			/* this function could be called if an item is sold */
			if (!TWPro.twpro_bag) return;
			TWPro.twpro_bag.twpro_priceWear = 0;
			TWPro.twpro_bag.twpro_priceBag = 0;
			TWPro.twpro_bag.twpro_priceItems = 0;
			TWPro.twpro_bag.twpro_priceYields = 0;
			TWPro.twpro_setItems = {};
			for (var twpro_set in TWPro.twpro_setBonus) {
				TWPro.twpro_setItemsCount[twpro_set] = 0;
			}
			for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
				TWPro.twpro_bag.twpro_countType[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
			}
			//TWPro.twpro_invHash = [];
			TWPro.twpro_initializeItems('wear', null);
			TWPro.twpro_initializeItems('bag', null);
			TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
			if(change && change.inv_id && TWPro.searchInventory.cache){
				if(change.deleted) delete TWPro.searchInventory.cache[change.inv_id];
				else TWPro.twpro_searchInventory(true, change.inv_id);
			}
			TWPro.twpro_changeJob();
		}
	
		function twpro_changeJob() {
			if (TWPro.twpro_failure) return;
			if (TWPro.twpro_calculated) {
				var twpro_jobList = document.getElementById('twpro_jobList');
				var twpro_selected = twpro_jobList.selectedIndex;
				twpro_jobList.style.backgroundColor = twpro_jobList[twpro_selected].style.backgroundColor;
				var twpro_selectedJob = parseInt(twpro_jobList[twpro_selected].value);
				var currentJobSkillsDivs = document.getElementById("twpro_currentJobSkills").getElementsByTagName("div");
				for(var i=0;i<currentJobSkillsDivs.length;i++){
					currentJobSkillsDivs[i].className = "";
					currentJobSkillsDivs[i].title = "";
				}
				document.getElementById("twpro_specialMessage").innerHTML = "";
				for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
					if (document.getElementById('char_' + TWPro.twpro_bag.twpro_types[twpro_i])) {
						document.getElementById('char_' + TWPro.twpro_bag.twpro_types[twpro_i]).className = 'wear_' + TWPro.twpro_bag.twpro_types[twpro_i];
					}
				}
				for (var twpro_wear in Wear.wear) {
					Wear.wear[twpro_wear].popup.refresh();
				}
				var bagitems = Bag.getInstance().items;
				for (var twpro_bag in bagitems) {
					bagitems[twpro_bag].popup.refresh();
					bagitems[twpro_bag].obj.twpro_html.firstChild.className = '';
				}
				if (twpro_selectedJob >= 0) {
					var twpro_job = TWPro.twpro_jobs[twpro_selectedJob], skill;
					for(var allSkills=twpro_job.twpro_skills.split(/\s*\+\s*/), i=0, j=0; i<allSkills.length; i++){
						if((skill=allSkills[i].match(/(\d+) \* ([a-z_]+)/))){
							var skill_name = skill[2];
							for(var k=1; k<=skill[1]*1; k++){
								if(j>=currentJobSkillsDivs.length){
									var div_currentSkills = document.createElement("div");
									div_currentSkills.style.margin = "0";
									document.getElementById("twpro_currentJobSkills").appendChild(div_currentSkills);
								}
								currentJobSkillsDivs[j++].className = 'skill_box skill_'+TWPro.skill_to_AttNum[skill_name][0]+' img'+TWPro.skill_to_AttNum[skill_name][1];
								currentJobSkillsDivs[j-1].title = Character.skill_titles[skill_name];
							}
						}
					}
					var specialMessage = TWPro.specialMessages && TWPro.specialMessages[twpro_job.shortName];
					if(typeof specialMessage != "undefined"){
						if(typeof specialMessage == "function"){
							document.getElementById("twpro_specialMessage").innerHTML = specialMessage(twpro_job);
						}
						else if(typeof specialMessage == "string" || typeof specialMessage == "number"){
							document.getElementById("twpro_specialMessage").innerHTML = specialMessage;
						}
						else{// Should not happen.
							document.getElementById("twpro_specialMessage").innerHTML = specialMessage;
						}
					}
					TWPro.twpro_highlight(twpro_job);
					var twpro_aktuelleap = twpro_job.twpro_skill - Math.max(0, twpro_job.malus) - (twpro_job.malus<0?twpro_job.malus:0)-1;
					if(twpro_job.shortName != "speed" && twpro_job.shortName != "regeneration"){
						var twpro_setCounter = {};
						for (var twpro_wear in Wear.wear) {
							if (Wear.wear[twpro_wear].obj.twpro_bonus) {
								twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName]||0;
							}
							if (Wear.wear[twpro_wear].obj.set != null) {
								if (twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] == undefined) {
									twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] = 1;
								}
								else {
									twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]++;
								}
							}
						}
						for (var twpro_set in twpro_setCounter) {
							if (twpro_setCounter[twpro_set] >= 2) {
								twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName] || 0;
							}
						}
						document.getElementById('twpro_aktuelleapvalue').innerHTML = twpro_aktuelleap + ' '+TWPro.lang.LABORP;
					} else {
						if(twpro_job.shortName == "speed"){
							twpro_aktuelleap = Math.round(100*Character.default_speed/Character.speed);
							if(!isFinite(twpro_aktuelleap)) twpro_aktuelleap = 100;
							twpro_aktuelleap = twpro_aktuelleap + "%"
						}
						else if(twpro_job.shortName == "regeneration") twpro_aktuelleap = Math.round(eval(twpro_job.twpro_calculation));
						document.getElementById('twpro_aktuelleapvalue').innerHTML = twpro_aktuelleap;
						twpro_aktuelleap = parseFloat(twpro_aktuelleap);
					}
					if (twpro_aktuelleap >= 0) {
						if (twpro_aktuelleap >= twpro_job.twpro_aps) {
							document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(160, 218, 120)';
						}
						else {
							document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(230, 235, 108)';
						}
					}
					else {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(232, 150, 120)';
					}
					document.getElementById('twpro_aktuelleap').style.visibility = 'visible';
					TWPro.twpro_insertListItems(true, [twpro_selectedJob, twpro_selected])
					if (typeof twpro_job.west_id != "undefined") {
						document.getElementById("minimap_job_id").value = twpro_job.west_id;
						if (WMinimap.visible) {
							WMinimap.update();
						}
					}
				}
				else {
					document.getElementById('twpro_aktuelleap').style.visibility = 'hidden';
				}
				TWPro.twpro_bagVis();
			}
		}
	
		function twpro_highlight(twpro_job) {
			if (TWPro.twpro_failure) return;
			var job_is_fort = twpro_job.shortName == "fortatt" || twpro_job.shortName == "fortdef",
				job_is_duel_shot = twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef",
				job_is_duel_hand = twpro_job.shortName == "duelvigor",
				job_is_duel = job_is_duel_shot || job_is_duel_hand;
			for (var twpro_wear in Wear.wear) {
				var twpro_item = Wear.wear[twpro_wear].obj;
				if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
					if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
						twpro_item.twpro_html.className = twpro_item.twpro_html.className + ' wear_' + twpro_item.type + '_highlight';
					}
				}
				else {
					if ((twpro_item.twpro_wearable) &&
						(twpro_item.type != "left_arm" || (job_is_fort && !(twpro_item.damage.damage_min < TWPro.damage_min.left_arm && twpro_item.damage.damage_max < TWPro.damage_max.left_arm)) || (!job_is_fort && twpro_item.twpro_bonus)) &&
						
						(twpro_item.type != "right_arm" || (
							job_is_duel_shot && !(twpro_item.damage.damage_min < TWPro.damage_min.right_arm_shot && twpro_item.damage.damage_max < TWPro.damage_max.right_arm_shot) ||
							job_is_duel_hand && !(twpro_item.damage.damage_min < TWPro.damage_min.right_arm_hand && twpro_item.damage.damage_max < TWPro.damage_max.right_arm_hand)
							) || (!job_is_duel && twpro_item.twpro_bonus)) &&
						
						((twpro_item.type == 'animal' && ((twpro_job.shortName == "regeneration" && twpro_item.twpro_jobbonus && twpro_item.twpro_jobbonus.regeneration >= twpro_job.twpro_bestAnimal) || (twpro_job.shortName != "regeneration" && Math.round(100/twpro_item.speed-100) >= TWPro.twpro_bestAnimal))) || twpro_item.type != 'animal' && (((twpro_item.twpro_bonus == false) && (twpro_job.twpro_bestStats[twpro_item.type] == 0)) || ((twpro_item.twpro_bonus == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type]))))) {
						twpro_item.twpro_html.className = twpro_item.twpro_html.className + ' wear_' + twpro_item.type + '_highlight';
					}
				}
			}
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				var twpro_item = bagitems[twpro_bag].obj;
				if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
					if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
						twpro_item.twpro_html.firstChild.className = 'wear_yield_highlight';
					}
				}
				else {
					if ((twpro_item.twpro_wearable) &&
						(twpro_item.type != "left_arm" || (job_is_fort && !(twpro_item.damage.damage_min < TWPro.damage_min.left_arm && twpro_item.damage.damage_max < TWPro.damage_max.left_arm)) || (!job_is_fort && twpro_item.twpro_bonus)) &&
						
						(twpro_item.type != "right_arm" || (
							job_is_duel_shot && !(twpro_item.damage.damage_min < TWPro.damage_min.right_arm_shot && twpro_item.damage.damage_max < TWPro.damage_max.right_arm_shot) ||
							job_is_duel_hand && !(twpro_item.damage.damage_min < TWPro.damage_min.right_arm_hand && twpro_item.damage.damage_max < TWPro.damage_max.right_arm_hand)
							) || (!job_is_duel && twpro_item.twpro_bonus)) &&
						
						((twpro_item.type != 'animal' || (twpro_job.shortName == "regeneration" && twpro_item.twpro_jobbonus && twpro_item.twpro_jobbonus.regeneration >= twpro_job.twpro_bestAnimal) || (twpro_job.shortName != "regeneration" && Math.round(100/twpro_item.speed-100) >= TWPro.twpro_bestAnimal)) && ((((twpro_item.type == 'yield') || (twpro_item.type == 'right_arm')) && (twpro_item.twpro_bonus == true) && (twpro_job.twpro_bestStats[twpro_item.type] > 0) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type])) || ((twpro_item.type != 'yield') && (twpro_item.type != 'right_arm') && (((twpro_item.twpro_bonus == false) && (twpro_job.twpro_bestStats[twpro_item.type] == 0)) || ((twpro_item.twpro_bonus == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type]))))))) {
						twpro_item.twpro_html.firstChild.className = 'wear_yield_highlight';
					}
				}
			}
		}

		function twpro_multisale (window_name) {
			try {
				/* should not happen, but in case... */
				if (TWPro.lang.MULTISEL == TWPro.lang.SELL) {
					TWPro.lang.MULTISEL += " ";
				}
				var ins = $('window_'+window_name+'_content').getElement('#own_inv_div h2'),
					bas = document.createElement('input'),
					but = document.getElementById("lkn_shopsell_" + window_name);
				if (but && but.innerHTML == TWPro.lang.MULTISEL) return;
				if (but) {
					but.parentNode.removeChild(but);
				}
				but = document.createElement('button');
				but.style.cssText = "font-size:small;position:absolute;right:9px;" + (window_name == "item_trader" ? "top:30px" : "");
				but.className = "lkn_shopsell_button";
				but.id = "lkn_shopsell_" + window_name;
				bas.style.cssText = 'bottom:25px;float:right;font-size:small;font-weight:bold;right:3px;opacity:.7;overflow:hidden;position:relative;z-index:2;text-align:center;width:25px;height:16px;';
				bas.type = 'text';
				bas.className = 'lkn_shopsell';
				but.innerHTML = TWPro.lang.MULTISEL;
				but.onclick = function(){
					var stu = $('window_'+window_name+'_content').getElements('.own_inv .bag_item');
					if (but.innerHTML == TWPro.lang.MULTISEL) {
						var inventory = PlayerInventory.getInstance(),
							worth = 0,
							calculate_sum = function (elm) {
								worth += inventory.data[elm.parentNode.id.substr(5)].sell_price * (elm.value - elm.defaultValue);
								but.innerHTML = TWPro.lang.SELL + (worth ? " (" + worth + " $)" : "");
								elm.defaultValue = elm.value;
							};
						but.disabled = true;
						for(var i=0, wat, count; i<stu.length; i++){
							wat = bas.cloneNode(false);
							wat.defaultValue = "";
							wat.onclick = function () {
								var all = 1,
									p = this.parentNode.getElementsByTagName('p');
								if (p.length) all = p[0].innerHTML;
								this.value = this.value == all ? '' : all;
								if (p.length) this.select();
								calculate_sum(this);
							};
							wat.maxLength = 3;
							wat.onkeypress = wat.onblur = function(){
								var p = this.parentNode.getElementsByTagName('p');
								var n = Math.max(parseInt(this.value, 10) || 0, 0);
								n = Math.min(n, p.length && p[0].innerHTML || 1);
								this.value = n == '0' ? '' : n;
								calculate_sum(this);
							};
							stu[i].appendChild(wat);
						}
						but.innerHTML = TWPro.lang.SELL;
						but.disabled = false;
					} else {
						but.disabled = true;
						var sellList = [],
							win, town_id = 0;
						if (window_name == "item_trader") {
							win = "item_trader";
						} else {
							win = window_name.match(/building_[^_]+/) + "";
							town_id = window_name.match(/\d+/);
						}
						baseUrl = "game.php?window=" + win + "&action=sell&h=" + h;
						for(var i=0, n; i<stu.length; i++){
							if((n=1*stu[i].getElement('.lkn_shopsell').value)){
								sellList.push([stu[i].id.substr(5), n]);
							}
						}
						if(!sellList.length){
							alert(TWPro.lang.NONESELECTED);
							but.disabled = false;
						}
						else if(confirm(TWPro.lang.CONFIRMSELL.replace(/%1/g, sellList.length))){
							var that = this;
							this.innerHTML = TWPro.lang.SELLING + ' (0/'+sellList.length+')';
							var sold = 0, errors = [];
							function sellStuff(inv_id, count){
								(new Ajax(baseUrl, {
									method: 'post',
									data: {
										inv_id: inv_id,
										town_id: town_id,
										count: count
									},
									onComplete: function(data){
										sold++;
										that.innerHTML = TWPro.lang.SELLING + ' ('+sold+'/'+sellList.length+')';
										data = Json.evaluate(data);
										if(data.error[0]){
											errors.push(data.error[1]);
										}
										else{
											Character.set_money(data.money);
											WEvent.trigger("inventory_remove", [inv_id]);
											// in case we sell a single item from a stock
											if (data.updated) {
												data.updated.next = data.next;
												WEvent.trigger("inventory_add", [data.updated]);
											}
										}
										if(sold == sellList.length){
											new HumanMessage(TWPro.lang.SALEDONE, {type:"success"});
											if(errors.length){
												alert('Sale errors:\n'+errors.join('\n'));
											}
											PlayerInventory.getInstance().update_all_bags();
										}
									}.bind(this)
								})).request();
							}
							for(var i=0; i<sellList.length; i++){
								sellStuff(sellList[i][0], sellList[i][1]);
							}
						}
						else{
							but.disabled = false;
						}
					};
				};
				but.disabled = false;
				ins.parentNode.insertBefore(but, ins);
			}
			catch (e) {
				TWPro.debug_log(e, "twpro_multisale");
			}
		}

		function twpro_sleep_hotel (town_id, room) {
			new Ajax("game.php?window=building_hotel&town_id=" + town_id + "&action=sleep&h=" + h,
			{
				data: {
					room: ["cubby", "bedroom", "hotel_room", "apartment", "luxurious_apartment"][room - 1]
				},
				method: "post",
				onComplete: function (data) {
					data = Json.evaluate(data);
					if (data.error) new HumanMessage(data.msg);
					else {
						Tasks.replace_all(data.task_queue);
					}
				}
			}).request();
		}

		var load_twpro_etc = function() {
			load_twpro_etc = Function("");
			if (TheWestApi.version == "1.29") {// backwards compatibility
				var twpro129 = document.createElement("script");
				twpro129.type = "application/javascript";
				twpro129.src = "http://twpro.lekensteyn.nl/twpro129.user.js?" + twpro_currentVersion;
				document.body.appendChild(twpro129);
				return;
			}
			if(typeof window.TWPro == 'undefined'){
				try{
					window.twpro_initLanguage = twpro_initLanguage;
					window.TWPro = {};
					TWPro.lang = twpro_lang;
					TWPro.authors = twpro_authors;
					TWPro.skill_to_AttNum = skill_to_AttNum;
					TWPro.specialMessages = specialMessages;
					TWPro.twpro_injectScript = twpro_injectScript;
					TWPro.twpro_preference = twpro_preference;
					TWPro.twpro_injectionSwitch = twpro_injectionSwitch;
					TWPro.twpro_activeJob = twpro_activeJob;
					TWPro.twpro_getPlace = twpro_getPlace;
					TWPro.twpro_popup = twpro_popup;
					TWPro.twpro_insertList = twpro_insertList;
					TWPro.twpro_handleJobrank = twpro_handleJobrank;
					TWPro.twpro_searchInventory = twpro_searchInventory;
					TWPro.twpro_internalWindowToTop = internalWindowToTop;
					TWPro.twpro_bagVis = twpro_bagVis;
					TWPro.twpro_sortList = twpro_sortList;
					TWPro.twpro_jobSortMark = twpro_jobSortMark;
					TWPro.twpro_showList = twpro_showList;
					TWPro.twpro_getBagPopup = twpro_getBagPopup;
					TWPro.twpro_clickList = twpro_clickList;
					TWPro.twpro_clickfilterList = twpro_clickfilterList;
					TWPro.twpro_updateList = twpro_updateList;
					TWPro.twpro_insertListItems = twpro_insertListItems;
					TWPro.twpro_sortJobs = twpro_sortJobs;
					TWPro.twpro_sortPlus = twpro_sortPlus;
					TWPro.twpro_initializeItem = twpro_initializeItem;
					TWPro.twpro_initializeItems = twpro_initializeItems;
					TWPro.twpro_calculateJobs = twpro_calculateJobs;
					TWPro.twpro_calcSets = twpro_calcSets;
					TWPro.twpro_prepareItem = twpro_prepareItem;
					TWPro.twpro_wearItem = twpro_wearItem;
					TWPro.twpro_compareItem = twpro_compareItem;
					TWPro.twpro_testItem = twpro_testItem;
					TWPro.twpro_changeItem = twpro_changeItem;
					TWPro.twpro_changeJob = twpro_changeJob;
					TWPro.twpro_highlight = twpro_highlight;
					
					TWPro.twpro_updateInternalJobInfo = twpro_updateInternalJobInfo;
					TWPro.twpro_validSet = twpro_validSet;
					TWPro.twpro_disableJobs = twpro_disableJobs;
					TWPro.twpro_moveJobSetting = twpro_moveJobSetting;
					TWPro.twpro_confirmHideJobs = twpro_confirmHideJobs;
					TWPro.twpro_customJobs = twpro_customJobs;
					TWPro.twpro_searchTrader = twpro_searchTrader;
					TWPro.twpro_bestLifeRestore = twpro_bestLifeRestore;
					TWPro.twpro_sleeperBonus = twpro_sleeperBonus;
					TWPro.twpro_setInfo = twpro_setInfo;
					TWPro.twpro_multisale = twpro_multisale;
					TWPro.twpro_sleep_hotel = twpro_sleep_hotel;
					// clean up to avoid possible memory leaks
					twpro_initLanguage = twpro_lang = twpro_authors = skill_to_AttNum = specialMessages = twpro_injectScript = twpro_preference = twpro_injectionSwitch = twpro_activeJob = twpro_getPlace = twpro_popup = twpro_insertList = twpro_handleJobrank = twpro_searchInventory = internalWindowToTop = twpro_bagVis = twpro_sortList = twpro_jobSortMark = twpro_showList = twpro_getBagPopup = twpro_clickList = twpro_clickfilterList = twpro_updateList = twpro_insertListItems = twpro_sortJobs = twpro_sortPlus = twpro_initializeItem = twpro_initializeItems = twpro_calculateJobs = twpro_calcSets = twpro_prepareItem = twpro_wearItem = twpro_compareItem = twpro_testItem = twpro_changeItem = twpro_changeJob = twpro_highlight = twpro_updateInternalJobInfo = twpro_validSet = twpro_disableJobs = twpro_moveJobSetting = twpro_confirmHideJobs = twpro_customJobs = twpro_searchTrader = twpro_bestLifeRestore = twpro_sleeperBonus = twpro_setInfo = twpro_setInfo = twpro_multisale = twpro_sleep_hotel = null;
					TWPro.twpro_injectScript();
					// WMap binds too early to AjaxWindow, causing any twpro_injectionSwitch to fail
					if (typeof WMap != "undefined") {
						WMap.recalcMarker();
					}
				} catch (e) {
					alert("TW Pro failed to load: " + (e.message||e.description||e));
					//if (console && console.log) {
					//	console.log(e);
					//	throw e;
					//}
					return;
				}
			}
			// export other stuff, not related to TW Pro item stuff
			if (typeof Reports != "undefined") {
				window.insertBBcode = insertBBcode;
				insertBBcode = null;
				(function(){
					window.convertduelreport = convertduelreport;
					window.convertduelreportfunc = convertduelreportfunc;
					convertduelreportfunc = convertduelreportfunc = null;
					modify_function(Reports, "show", {bind:Reports},
									['{', 'data=convertduelreport("window_reports_show_"+report_id, data);', {pos:"R",catch_errors:1}]
									);
				})();
			}
			// BBCode at reports
			if (typeof ReportPublish != "undefined" && ReportPublish.selectPublish.toString().indexOf("textarea_height") == -1) {
				var hook = function () {
					for(var i=0, report_links=[]; i<reportIds.length; i++){
						var hash = document.getElementById("window_reports_show_"+reportIds[i]+"_content");
						hash = hash && hash.innerHTML.match(/showLink\(\d+,\s*'([^']+)'\)/);
						var hash_title;
						if(hash){
							hash = hash[1];
						}
						else{
							hash = document.getElementById("reportList_title_" + reportIds[i]);
							if(hash){
								hash_title = hash.textContent || hash.innerText;
								hash = hash.href.match(/'([^']+)'/);
								if(hash) hash = hash[1];
							}
						}
						if(!hash_title){
							hash_title = document.getElementById('report_title_'+reportIds[i]);
							hash_title = hash_title && hash_title.hashtitle || null;
						}
						if(hash && hash_title){
							report_links.push('[report='+
								reportIds[i] + hash
							+']'+
								hash_title
							+'[/report]');
						}
					}
					textarea_height = 15 * (1 + Math.min(5, report_links.length));
					xhtml += '<textarea rows="3" cols="50" style="width:365px;height:'+textarea_height+'px" class="input_layout" onclick="this.select()" readonly="readonly">'+report_links.join("\n")+"</textarea>";
				};
				modify_function(ReportPublish, "selectPublish", 0,
								[/(showMessage\(xhtml,\s*header,)[^,]+,[^,]+/, '$1 400, 300+textarea_height'],
								[/showMessage\(xhtml,\s*header,[^,]+,[^,]+/, "var textarea_height=0;", {pos:"L"}],
								[/showMessage\(xhtml,\s*header,[^,]+,[^,]+/, hook, {pos:"L",catch_errors:1}]
							   );
			}
			// Quicksearch market
			if (typeof Market != "undefined" && Market.prototype.updateUi) {
				modify_function(Market.prototype, "updateUi", 0,
								[/that\.selectedItem *= *obj;/, "clearTimeout(that.twpro_fastsearch_timer);that.twpro_fastsearch_timer=setTimeout(that.search.bind(that),500,0);", {pos:"R",catch_errors:1}]
								);
			}
			// market - own bids highlighter
			// Warning: FF 3.6.13 and up, excluding 4.0.1 contains a freaking
			// bug, causing Function.prototype.toString return a result with
			// misplaced and missing parentheses. See
			// https://bugzilla.mozilla.org/show_bug.cgi?id=559438
			if (typeof Market != "undefined" && Market.prototype.fillItemTable) {
				var has_parentheses_bug = (function(x){return "x" + 1 + (x + 1)}).toString().search(/\+ *\(/) == -1;
				//console && console.log && console.log(has_parentheses_bug ? "Parentheses bug existent" : "No parentheses bug");
				modify_function(Market.prototype, "fillItemTable", 0,
								[
								 /row *= *resulttable\.rows\[i\]/,
								 function () {
									var highlight = false;
									if (datarow) {
										var offer_id = datarow.market_offer_id,
											bid;
										if (Market.twpro_bids && (bid=Market.twpro_bids[offer_id])) {
											if (bid == datarow.current_bid) {
												highlight = true;
											} else {
												delete Market.twpro_bids[offer_id];
											}
										}
									}
									row.cells[6].style.backgroundColor = highlight ? "lime" : "";
								 },
								 {pos:"R",catch_errors:1}
								],
								has_parentheses_bug && [/\(page *\|\| *0\) *\+ *1|page *- *1/g, "($&)"]
								);
				modify_function(Market.prototype, "initialize", 0,
								[
								 /}$/,
								 function () {
									/* only load the bids when opening the market the first time */
									if (!Market.twpro_bids) {
										Market.twpro_bids = {};
										(function fetcher(page) {
											Ajax.remoteCallMode("building_market", "fetch_bids", {
												page: page
											}, function (jsonResp) {
												if (jsonResp.error) {
													new HumanMessage("TW Pro detected an error while loading bids: " + jsonResp.error);
												} else {
													var bids = jsonResp.msg.search_result;
													for (var i=0; i<bids.length; i++) {
														Market.twpro_bids[bids[i].market_offer_id] = bids[i].current_bid;
													}
													if (bids.length > 10) {
														fetcher(++page);
													}
												}
											});
										})(0);
									}
								 },
								 {pos:"L",catch_errors:1}
								]
								);
				modify_function(Market.prototype, "bid", 0,
								[/if *\(resp\.instantBuy\) *{/, "if (Market.twpro_bids) Market.twpro_bids[offerdata.market_offer_id] = bid;", {pos:"L"}],
								has_parentheses_bug && [/Math\.max\(offerdata\.auction_price *- *1, *offerdata\.current_bid *\|\| *0\) *\+ *1/g, "($&)"]
							   );
			}
			// multisale button on updated inventory
			if (typeof PlayerInventory != "undefined") {
				modify_function(PlayerInventory.prototype, "update_all_bags", 0,
								["{", function () {
									if (typeof TWPro != "undefined" && TWPro.twpro_multisale) {
										$$(".lkn_shopsell_button").each(function (button) {
											TWPro.twpro_multisale(button.id.substr(13));
										});
									}
								}, {pos:"R",catch_errors:1,escape:1}]
								);
			}
			if (typeof Market != "undefined") {
				modify_function(Market.prototype.format, "market_till", 0,
								[
								 /row\.auction_end_date\.replace\(\/ \/g,\s*(['"])&nbsp;\1\)/,
								 "(" + (function (orig_str) {
									try {
										var n2 = function (n) {return ("0" + n).substr(-2)};
										var str = orig_str;
										var date = new Date;
										date.setTime(row.auction_end_time * 1000);
										str = str.replace(/\d{2}:\d{2}/, function (hh_mm) {
											var new_hh_mm = n2(date.getHours()) + ":" + n2(date.getMinutes());
											return new_hh_mm == hh_mm ? new_hh_mm + ":" + n2(date.getSeconds()) : hh_mm;
										});
										return str;
									} catch (twpro_exception) {
										TWPro.debug_log(twpro_exception, "method market_till")
										return orig_str;
									}
								 }) + ")($&)"
								]
								);
			}
		}
		if (typeof window.addEvent == "function") {
			window.addEvent("domready", load_twpro_etc);
		} else {
			if (typeof window.addEventListener == "function") {
				window.addEventListener("DOMContentLoaded", load_twpro_etc, false);
				// in case DOMContentLoaded is not supported:
				setTimeout(load_twpro_etc, 1500);
			} else {
				setTimeout(load_twpro_etc, 10);
			}
		}
	}
	var url = window.location.href;
	if (typeof Forum != "undefined") {
		var ta = document.getElementsByName('message');
		if (ta.length) {
			/* TODO add extra BB buttons for img, quote, size, color */
			//window.insertBBcode = insertBBcode;
			//window.insertbbcodesfunc = insertbbcodesfunc;
			//insertBBcode = insertbbcodesfunc = null;
			//window.insertbbcodesfunc(ta[0], true);
		}
	}
}) + ")();";
insertWindow.document.body.appendChild(sie);