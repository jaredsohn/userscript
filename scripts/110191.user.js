// ==UserScript==
// @name		TWPro+ Language Pack - German - Deutsch
// @namespace           http://userscripts.org/scripts/show/110191
// @description		Language Pack Deutsch für TW Pro+ for The West v1.33 [SOM release] [Multilingual]
// @translator(s)   	DasJoergi auf Grundlage der Version von Ali1610 und Sir_Ethan
// Translators notice : If you are continuing the work of someone else, please keep the name of all the previous contributors in the line above!
// @version		für 3.1.0.8
// @exclude		*
// ==/UserScript==

twpro_lp_custom = {
	info: ['DasJoergi', 'mailto:', 683051, '.de7.de8.de9.de10.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Autoren',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Übersetzer',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'Skript deaktiviert: Skript-Aktualisierung aufgrund von Änderungen am The West Quellcode benötigt',     /*TW Pro can be disabled in the script. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Sortieren nach <b>Name</b>',     /*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Sortieren nach <b>Erfahrung</b>',     /*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Sortieren nach <b>Lohn</b>',     /*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Sortieren nach <b>Glück</b>',     /*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Sortieren nach <b>Arbeitsrang</b>',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Sortieren nach <b>Gefahr</b>',     /*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Sortieren nach <b>Arbeitspunkte</b>',     /*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: "Verstecke Arbeiten, die nicht ausführbar sind",    /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Zeige nur die beste Kleidung, die für die ausgewählte Arbeit verfügbar ist',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Arbeit auswählen...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Berechne Werte, bitte warten...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Inventarstatistik',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Verkaufswert',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Kleidung',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Produkte',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Gesamt',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Anzahl',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'AP',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: '\u25B7 Stadtausbau',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Lebenspunkte gesamt',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Berechne Daten...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Konvertieren',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Mehrere Gegegnstände verkaufen...',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Verkaufsauswahl',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Möchtest Du wirklich %1 Stapel dieser Gegenstände verkaufen?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Verkaufe...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'Die ausgewählten Gegenstände wurden verkauft.',     /*This text is displayed after a multi-sale*/
		NONESELECTED: 'Du musst mindestens einen Gegenstand auswählen!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Arbeitsrang-Einstellungen',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Durchsuche Inventar',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Die Suche nach %1 führte zu keinem Ergebnis.%2Zeige alle Gegenstände%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Deaktiviere das Verstecken von Gegenständen, die für die ausgewählte Arbeit schlechter sind.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Durchsuche das Inventar. Du kannst Platzhalter benutzen (* für kein oder mehrere Zeichen, ? für ein Zeichen)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: '\u25B7 Fernkampfduellant (Angreifer)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: '\u25B7 Fernkampfduellant (Verteidiger)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: '\u25B7 Nahkampfduellant',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: '\u25B7 Fortkampf (Angreifer)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: '\u25B7 Fortkampf (Verteidiger)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Nachricht an alle Teilnehmer',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Anzahl der Empfänger',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: 'Arbeiten- und Set-Verwaltung',     /*This text is shown in the title bar of the TW Pro settings window, displayed after clicking "Config"*/
		CONFIRM: 'Bestätigen',     /*The button for confirming/ saving changes in the "Hide activities and itemsets" window*/
		HIDEJOBDESC: 'Arbeiten können hier versteckt werden. Markiere alle Arbeiten, die nicht automatisch berechnet werden sollen, und klicke auf Bestätigen.',     /*The description for the "Hide activities and itemsets" window*/
		SHOWN: 'Angezeigt',     /*Displayed ahead the selection field for activities that are currently shown*/
		HIDDEN: 'Versteckt',     /*Displayed ahead the selection field for activities that are currently hidden*/
		NOEQUIP: "Keine Ausrüstung",     /*Visible in the "Activities & Itemsets Management" tab. Popup displayed in the activities list.*/
		BESTEQUIP: "Beste Ausrüstung",     /*Visible in the "Activities & Itemsets Management" tab. Popup displayed in the activities list.*/
		SETTINGSSAVED: 'Die Einstellungen für TW Pro wurden übernommen!',     /*After clicking "Confirm" in the "Hide activities and itemsets" window, this message is displayed*/
		SETTINGSSAVEDSESSION: 'Die Einstellungen für TW Pro wurden übernommen! (nur für diese Sitzung)',     /*After clicking "Confirm" in the "Hide activities and itemsets" window while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Speichere diese Einstellungen für jede Sitzung.',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Hide activities and itemsets" window. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'Du kannst dieses Set nicht tragen oder dieses Set hat keinen Einfluss auf die Arbeitsberechnung.',     /*This text is displayed when hovering over an item set at the "Hide activities and itemsets" window for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Sets für schnellere Berechnungen deaktivieren. Sets mit speziellen, unerfüllten Voraussetzungen sind standardmäßig deaktiviert.',     /*The description displayed ahead the settings for itemsets at the "Hide activities and itemsets" window*/
		CUSTOMNAME: 'Gib den gewünschten Namen für die Arbeit ein',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity*/
		CUSTOMCALCULATION: 'Gib eine gültige TW Pro Berechnung ein.',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Hide activities and itemsets" window*/
		CUSTOMENABLED: 'Markiere diese Box, um die Arbeit zu aktivieren',     /*This button is visible at the "Hide activities and itemsets" window. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: 'Neu',     /*This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: '\u25B7 Geschwindigkeit',     /*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: '\u25B7 Höchste Lebenspunkte',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Sets",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Bonus mit %1 Gegenständen',     /*Displayed in Setinfo window*/
		LABORPOINTS: 'Arbeitspunkte',     /*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'Diese Zahl gibt die Anzahl von Gegenständen an, die in Berechnungen verwendet werden',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Erholung',     /*__ % Regeneration with Sleepyhead items*/
		LUCK: 'Glück',     /*__ % luck with Holiday set items*/
		PRAYING: 'Beten',     /*6 Sleepyhead items gives +1 Praying*/
        	NOITEMSETS: "Du besitzt keinen Gegenstand dieses Sets",     /*Displayed in the vertical Set filters*/
		AVERAGEDAMAGE: "Durchschnittsschaden",     /*Displayed on every weapons*/
		PREFERENCES: "Einstellungen",     /*This text is shown as a tab in the TW Pro settings window*/
		DEFAULTSORTING: " \u25B7 Standardsortierung",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITY: "Priorität auf Lebenspunkte",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITYZERO: "Nichts",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYLOW: "Niedrig",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYMEDIUM: "Mittel",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYHIGH: "Hoch",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYAUTO: "Auto",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBBATTLEUNIT: "Einheitentyp",     /*Visible in the "Preferences" tab.*/
		FBBATTLEUNITSKIRMISHER: "Nahkämpfer (ausweichend) | Vordere Linie",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITLINEINFANTRYMAN: "Linien-Infanterist (polyvalent) | Mittlere Linie",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITMARKSMAN: "Scharfschütze (zielend) | Hintere Linie",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBTAGS : [["0", "1", "2", "3", "@"], ["D", "P", "A"]],     /*Visible in the dropdown menu, the item popups at merchants and the "Activities & Itemsets Management" tab. Tags representing the different combinations possible for "Health points priority" & "Battle unit type". Only 1 character allowed for each parameter. Order must be respected as listed above.*/
		DMGMIN: "Min",     /*Abbreviation for Minimum. Reters to the minimum damage of a weapon. Visible on weapon popups.*/
		DMGMAX: "Max",     /*Abbreviation for Maximum. Reters to the maximum damage of a weapon. Visible on weapon popups.*/
		DMGAVG: "Avg",     /*Abbreviation for Average. Reters to the average damage of a weapon. Visible on weapon popups.*/
        	CHATWHISPER: "* Flüstern *\n\nSpielername eingeben",     /*Visible when clicking the corresponding button in the Chat box.*/
		CHATCOLOR: "* Beliebige Farbe (000-999) *\n\nFarbcode eingeben",     /*Visible when clicking the corresponding button in the Chat box.*/
        	USEFULITEMS : "Jeden Gegenstand hervorheben, der für irgendeine Arbeit nützlich ist",     /*Visible near the backpack. Displayed when calculations has been run and none activity is selected.*/
		USEFULITEMSPOPUP : " \u25B7 Box | Hervorheben mit Details",     /*Visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
		USEFULITEMSPOPUPDESC : "Boni für die Aktivitäten werden für jeden nützlichen Gegenstand angezeigt (Prozess dauert etwas länger).",     /*Popup visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
		SHOWALLJOBS : " \u25B7 Zeige alle Arbeiten auf der Karte",     /*Visible in the "Preferences" tab.*/
		SHOWALLJOBSDESC : "Aktiviert nach Aktualisierung (F5)",     /*Popup visible in the "Preferences" tab.*/
		COLLECTORMODE : " \u25B7 Sammlermodus",     /*Visible in the "Preferences" tab.*/
		COLLECTORMODEDESC : "Gegenstände bei den Händlern werden blau angezeigt wenn man diese noch nicht hat",     /*Popup visible in the "Preferences" tab.*/
		HELP : "Hilfe",     /*Visible in the "Preferences" tab.*/
		WEBSTORAGEQUOTAEXCEEDED : "WebStorage Quote überschritten!\n\n- Aktuelle Daten sind nicht komplett.\n- Cache feature wurde automatisch deaktiviert.\n- Cache leeren oder LocalStorage Quote erhöhen (nur möglich bei Firefox und Opera).",     /*Alert box displayed when WebStorage is full.*/
		CACHEGENERATE : "Cache generieren...",     /*Visible in the inventory dropdown menu and in the prompt box for generating cache.*/
		CACHEUPDATE : "Cache aktualisieren",     /*Visible in the prompt box for updating cache.*/
		CACHEFORCEOK : "Änderungen verwerfen.",    /*Visible in the prompt box for generating cache when items changes are detected.*/
		CACHEFORCEOKDESC : "Cache Status auf OK setzen, ohne Neuberechnung.",    /*Popup visible in the prompt box for generating cache when items changes are detected.*/
		CACHEGENERATENOW : "Cache anlegen?",     /*Visible in the prompt box for generating cache.*/
		CACHEUPDATENOW : "Willst Du den Cache nun aktualisieren?",     /*Visible in the prompt box for updating cache.*/
		CACHEINVENTORYCHANGES : "Inventaränderungen erkannt.",     /*Popup visible on the inventory cache button.*/
		CACHEUPDATECLICK : "Klicke um den Cache zu aktualisieren.",     /*Popup visible on the inventory cache button when items or skills changes are detected or when a new job is added in the game.*/
		CACHENEWITEMS : "Neue Gegenstände",     /*Popup visible on the inventory cache button when items changes are detected.*/
		CACHEDELETEDITEMS : "Gelöschte Gegenstände",     /*Popup visible on the inventory cache button when items changes are detected.*/
		CACHESKILLSCHANGES : "Skilländerungen erkannt.",     /*Popup visible on the inventory cache button when skills changes are detected.*/
		CACHEJOBSAFFECTED : "betroffene Aktivitäten",     /*Popup visible on the inventory cache button when skills changes are detected.*/
		CACHEISEMPTY : "Cache ist leer.",     /*Popup visible on the inventory cache button.*/
		CACHEINITIALIZE : "Hier klicken zum initialisieren.",     /*Popup visible on the inventory cache button when cache is empty.*/
		CACHEOK : "Cache OK.",     /*Popup visible on the inventory cache button.*/
		CACHEREWRITE : "Wenn notwendig, können die Daten neu geschrieben werden wenn Du hier klickst.",     /*Popup visible on the inventory cache button when cache is ok.*/
		CACHEEMPTYING : "Cache wird geleert...",     /*Popup visible on the inventory cache button.*/
		CACHENORMALMODE : "TW Pro is im normalen Modus während des Prozesses.",     /*Popup visible on the inventory cache button when cache is emptying.*/
		CACHEDISABLED : "Cache ist deaktiviert.",     /*Popup visible on the inventory cache button.*/
		CACHEOPENSETTINGS : "Öffene die TW Pro Einstellungen zum einschalten.",     /*Popup visible on the inventory cache button when cache is disabled.*/
		CACHENEWJOBSDETECTED : "Neue Arbeiten erkannt.",     /*Popup visible on the inventory cache button when a new job is added in the game.*/
		CACHENEWJOBDETECTED : "Neue Arbeit erkannt: %1<br>Bitte Cache aktualisieren.",     /*Red box message displayed when a new job is added in the game.*/
		CACHEENABLE : " \u25B7 Aktiviere TW Pro cache",     /*Visible in the "Preferences" tab.*/
		CACHEINDEXEDDBNOT : "IndexedDB ist nicht unterstützt mit Deinem Browser.",     /*Alert box displayed when IndexedDB is selected but not supported.*/
		CACHEINDEXEDDBDESC : "Ultra schnelle Berechnung. Empfohlen für Firefox 4+ und Chrome 11+.",     /*Visible in the "Preferences" tab.*/
		CACHECOMPATIBILITY : "Kompatibilitäts-Infos",     /*Visible in the "Preferences" tab.*/
		CACHEQUOTAS : "Quotas Infos",     /*Visible in the "Preferences" tab.*/
		CACHEQUOTASDESC : "<b>Klicke auf 'Quotas Infos' um Deine Browser WebStorage (LocalStorage) Limits zu kennen.<br>"
				  +"<br>Wie erhöht man die LocalStorage Limits?</b><br>"
				  +"<b>- Firefox:</b><br>"
				  +"Schreibe 'about:config' in die Adresszeile und suche nach der 'dom.storage.default_quota' Option.<br>"
				  +"Diese Angabe ist in Kilobytes, Du kannst sie ändern. Der Speicherplatz ist geteilt durch den Sprachen Server,<br>"
				  +"Du brauchst ca. 1500 kB pro Account auf dem gleichen Server.<br>"
				  +"<b>- Chrome:</b><br>"
				  +"Es ist nicht möglich die Quoten anzupassen.<br>"
				  +"<b>- Opera:</b><br>"
				  +"Standardmäßig wird der Browser Dich auffordern die Grenzen zu erhöhen wenn nötig. Du kannst jedoch<br>"
				  +"'opera:webstorage' in die Adresszeile schreiben und die EInstellung für jede Domain manuell einstellen.<br>"
				  +"Die Angabe ist in Kilobytes.Der Speicherplatz ist geteilt duch jede Welt (Subdomain), Du brauchst ca. 3000 kB<br>"
				  +"pro Account auf der gleichen Welt.<br>"
				  +"<b>- Safari:</b><br>"
				  +"Es ist nicht möglich die Quoten anzupassen.",     /*Popup visible in the "Preferences" tab when hovering the "quotas info" link.*/
		CACHEEMPTY : "Leerer TW Pro cache.",     /*Popup visible in the "Preferences" tab.*/
		CACHEEMPTYDESC : "Rettungstool. Nutzbar bei Dateninkonsistenz.",     /*Popup visible in the "Preferences" tab.*/
		CACHEWEBSTORAGEDESC : "Schnelle Berechnungen. Unterstützt bei den meisten Browsern aber bleibt der Speichergrenze vorbehalten.",     /*Visible in the "Preferences" tab.*/
		CACHEEMPTYNOW : "Willst Du den Cache wirklich leeren?",     /*Visible in the prompt box displayed when user wants to delete the cache.*/
		CACHERECORDS : "Aufzeichnungen",     /*Visible in the prompt box displayed when user wants to delete the cache.*/
		CACHEEMPTIED : "Cache geleert!",     /*Message displayed when user has deleted the cache.*/
		CACHERECORDSDELETED : "Aufzeichnungen gelöscht.",     /*Message displayed when user has deleted the cache.*/
		CACHEEMPTYSLOWDESC : "Du kannst während des Prozesses weiterspielen.",     /*Popup visible in the prompt box displayed when user wants to delete the Webstorage cache. Also visible as popup on the Safemode checkbox, in the "Preferences" tab.*/
		CACHEEMPTYFASTDESC : "Schneller aber der Browser kann sich aufhängen.",     /*Popup visible in the prompt box displayed when user wants to delete the Webstorage cache.*/
		CACHEFASTMODE : "Schneller Modus",     /*Visible in the prompt box displayed when user wants to delete the Webstorage cache.*/
		NORMALMODE : "Normaler Modus",     /*Visible in the prompt box displayed when user wants to delete the Webstorage cache. Also visible in the "Preferences" tab for the "Split fortbattle combinations" feature*/
		FBCOMBOFAVORITE : "Favoriten",     /*Displayed in the inventory dropdown menu when the "Split fortbattle combinations" feature is enabled AND in Submenu mode.*/
		FBCOMBOGENERATE : "Generiere alle Fortkampfkombinationen",     /*Visible in the "Preferences" tab.*/
		FBCOMBODESC : "Das fügt 30 Aktivitäten dem DropDown-Menu hinzu, aber Du kannst Sie dann im Register verwalten",     /*Visible in the "Preferences" tab.*/
		FBCOMBONORMALDESC : "Zeigt die Kombinationen als normale AKtivitäten im DropDownmenu.",     /*Visible in the "Preferences" tab.*/
		FBCOMBOSUBMENUS : "Submenus Modus",     /*Visible in the "Preferences" tab.*/
		FBCOMBOSUBMENUSDESC : "Zeigt die Kombinationen als Subemnus der Haupt-Fortkampf-Aktivitäten.",     /*Visible in the "Preferences" tab.*/
		FBCOMBOHELPDESC : "<b>Wenn das Dropdownmenu geöffnet ist:</b><br>- Drücke [1] um das Attacking Submenu zu expandieren.<br>- Drücke [2] um das DefendingSubmenu zu expandieren.<br>- Drücke [Space] um beide Menus zu expandieren.",     /*Popup visible in the "Preferences" tab when hovering the "HELP" link.*/
		FBCOMBOMOZTIP : "Firefox Benutzer können auch mit der rechten Maustaste auf die Haupt-Fortkamp-Aktivitäten klicken<br>um die Submenus zu expandieren.",     /*Popup visible in the "Preferences" tab when hovering the "HELP" link.*/
		SAFEMODE : " \u25B7 Sicherheitsmodus aktivieren",     /*Visible in the "Preferences" tab.*/
		SAFEMODEDESC : "Langsamere Berechnungen, aber ein kein EInfrieren und Abstürzen des Browsers.",     /*Popup visible in the "Preferences" tab.*/
		SAFEMODEFBEXCL : "Nicht im Sicherheitsmodus ausführen, wenn die manuellen Fortkampfeinstellungen oben genutzt werden.",     /*Popup visible in the "Preferences" tab.*/
		SAFEMODERUNNING : "Sicherheitsmodus läuft...",     /*Displayed during the calculation in safe mode. Also visible in a prompt box when Safemode calculation is running and when user try to refresh/open/close the inventory.*/
		SAFEMODERUNNINGDESC : ["Während des Prozesses:", "- Inventar nicht schließen oder aktualisieren.", "- Keine Gegenstände kaufen oder verkaufen.", "- Keine Kleidung oder Gegenstände anlegen oder ablegen.", "- Keine Skill-Änderungen vornehmen.", "OK, ich bin vorsichtig. Zeig mir nun mein Inventar..."],     /*Displayed during the calculation in safe mode.*/
		SAFEMODECOMPLETED : "Sicherheitsmodus komplett!",     /*Green box message displayed at the end of the Safe mode process. Also visible in the blinking browser tab.*/
		ACTIVITIES : "Aktivitäten",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		ITEMS : "Gegenstände",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		ITEMSETSCOMBI : "Anzahl Itemsetskombinationen",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		TESTSRUN : "Anzahl Berechnungen ausgeführt.",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		CALCTIME : "Berechnungszeit",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		NOJOBSAFFECTED : "Änderungen hatten keine Auswirkungen auf irgendwelche Aktivitäten.",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done with 0 job modified.*/
		AREYOUSURE : "Willst Du das wirklich tun?",     /*Visible in a prompt box when Safemode calculation is running and when user try to refresh/open/close the inventory.*/
};
