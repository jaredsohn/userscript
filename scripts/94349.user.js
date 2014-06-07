// ==UserScript==
// @name            Language pack - German
// @description		German Language Pack for TW PRO+ (for v1.30) [SOM]
// @exclude *
// ==/UserScript==

twpro_lp_custom = {
	info: ['SirEthan', 'mailto:sir_ethan@gmx.net', 859645, '.de1.de8.de9.de10.de11.de12.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
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
		FILTERJOBS: "Verstecke Arbeiten, die ich nicht machen kann",     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Zeige nur die beste Kleidung, die für die ausgewählte Arbeit verfügbar ist',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Arbeit auswählen...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Berechne Werte, bitte warten...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Inventarstatistiken',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Verkaufswert',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Objekte',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Produkte',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Gesamt',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Mengen',     /*Visible in the Inventory statistics tooltip. */
		NONYIELDS: 'Ausgeblendet',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'AP',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: '\u25B7 Konstruktion',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Lebenspunkte gesamt',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Berechne Daten...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Konvertieren',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Verkaufe mehrere Gegegnstände...',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Verkaufsauswahl',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Möchten Sie wirklich %1 Stapel von Gegenständen verkaufen?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Verkaufe...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'Die ausgewählten Gegenstände wurden verkauft.',     /*This text is displayed after a multi-sale*/
		NONESELECTED: 'Sie müssen mindestens einen Gegenstand auswählen!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Arbeitsrang Einstellungen',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Durchsuche Inventar',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Ihre Suche nach %1 führte zu keinem Ergebnis.%2Zeige alle Gegenstände%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Deaktiviere das Verstecken von Gegenständen, die für die ausgewählte Arbeit schlechter sind.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Durchsuche das Inventar. Sie können Platzhalter benutzen (* für kein oder mehrere Zeichen, ? für ein Zeichen)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: '\u25B7 Fernkampfduellant (Angreifer)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: '\u25B7 Fernkampfduellant (Verteidiger)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: '\u25B7 Nahkampfduellant',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: '\u25B7 Fortkampf (Angreifer)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: '\u25B7 Fortkampf (Verteidiger)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Nachricht an alle Teilnehmer',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Anzahl der Empfänger',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: 'Arbeiten und Set Verwaltung',     /*This text is shown in the title bar of the TW Pro settings window, displayed after clicking "Config"*/
		CONFIRM: 'Bestätigen',     /*The button for confirming/ saving changes in the "Hide activities and itemsets" window*/
		HIDEJOBDESC: 'Arbeiten können hier versteckt werden. Markieren Sie alle Arbeiten, die nicht automatisch berechnet werden sollen und klicken Sie auf Bestätigen.',     /*The description for the "Hide activities and itemsets" window*/
		SHOWN: 'Angezeigt',     /*Displayed ahead the selection field for activities that are currently shown*/
		HIDDEN: 'Versteckt',     /*Displayed ahead the selection field for activities that are currently hidden*/
		SETTINGSSAVED: 'Die Einstellungen für TW Pro wurden übernommen!',     /*After clicking "Confirm" in the "Hide activities and itemsets" window, this message is displayed*/
		SETTINGSSAVEDSESSION: 'Die Einstellungen für TW Pro wurden übernommen! (nur für diese Sitzung)',     /*After clicking "Confirm" in the "Hide activities and itemsets" window while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Speichere diese Einstellungen für jede Sitzung.',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Hide activities and itemsets" window. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'Sie können dieses Set nicht tragen oder dieses Set hat keinen Einfluss auf die Arbeitsberechnung.',     /*This text is displayed when hovering over an item set at the "Hide activities and itemsets" window for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Deaktiviere Sets für schnellere Berechnungen. Sets mit speziellen, unerfüllten Voraussetzungen sind standardmäßig deaktiviert.',     /*The description displayed ahead the settings for itemsets at the "Hide activities and itemsets" window*/
		CUSTOMNAME: 'Geben Sie den gewünschten Namen für die Arbeit ein',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity*/
		CUSTOMCALCULATION: 'Geben Sie eine gültige TW Pro Berechnung ein.',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Hide activities and itemsets" window*/
		CUSTOMENABLED: 'Markieren Sie diese Box, um die Arbeit zu aktivieren',     /*This button is visible at the "Hide activities and itemsets" window. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: 'Neu',     /*This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: '\u25B7 Geschwindigkeit',     /*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: 'Schnellste Lebenspunkte',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Sets",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Bonus mit %1 Gegenständen',     /*Displayed in Setinfo window*/
		LABORPOINTS: 'Arbeitspunkte',     /*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'Diese Zahl gibt die Anzahl von Gegenständen an, die in Berechnungen verwendet werden',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Regeneration',     /*__ % Regeneration with Sleepyhead items*/
		LUCK: 'Glück',     /*__ % luck with Holiday set items*/
		PRAYING: 'betend',     /*6 Sleepyhead items gives +1 Praying*/
                NOITEMSETS: "Sie haben keinen Gegenstand diese Sets",     /*Displayed in the vertical Set filters*/
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
		DMGMIN: "Min",     /*Abbreviation for Minimum. Reters to the minimum damage of a weapon. Visible on weapon popups.*/
		DMGMAX: "Max",     /*Abbreviation for Maximum. Reters to the maximum damage of a weapon. Visible on weapon popups.*/
		DMGAVG: "Ø",     /*Abbreviation for Average. Reters to the average damage of a weapon. Visible on weapon popups.*/
                CHATWHISPER: "* Flüstern *\n\nSpielername eingeben",     /*Visible when clicking the corresponding button in the Chat box.*/
		CHATCOLOR: "* Beliebige Farbe (000-999) *\n\nFarbcode eingeben",     /*Visible when clicking the corresponding button in the Chat box.*/

};