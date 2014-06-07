// ==UserScript==
// @name            Language pack - Sample - English
// ==/UserScript==

twpro_lp_custom = {
	info: ['WesternBen', 'meulaccount@yahoo.de', 4343, '.w1.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Autoren',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Uebersetzer',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'Script deaktiviert',     /*TW Pro can be disabled in the script. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Nach <b>Name</b> sortieren',     /*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Nach <b>Erfahrung</b> sortieren',     /*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Nach <b>Gehalt</b> sortieren',     /*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Nach <b>Glueck</b> sortieren',     /*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Nach <b>Jobliste</b> sortieren',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Nach <b>Gefahr</b> sortieren',     /*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Nach <b>Arbeitspunkten</b> sortieren',     /*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: "Arbeiten ausblenden, die nicht getaetigt werden koennen",     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Nur die beste Arbeitskleidung anzeigen',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Arbeit auswaehlen...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Berechne Werte, bitte warten...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Inventar Statistik',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Verkauswert',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Objekte',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Produkte',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Gesamt',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Kategorien',     /*Visible in the Inventory statistics tooltip. */
		NONYIELDS: 'Items mit wenig Gewinn',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'AP',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: 'Stadtaudbau',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Verlorene Lebenspunkte',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Berechne Werte...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Konvertiere',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Verkaufe doppelte Gegenstaende...',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Auswahl verkaufen',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Willst du diese Anzahl %1 wirklich verkaufen?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Verkaufe...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'Die markierten Gegenstaende wurden verkauft.',     /*This text is displayed after a multi-sale*/
		NONESELECTED: 'Du musst mindestens einen Gegenstand auswaehlen!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Jobliste bearbeiten',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Inventar durchsuchen',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Deine Suche nach %1 war erfolglos. %2Alle Gegenstände anzeigen%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Hebt die Auswahl "Nur die beste Arbeitskleidung anzeigen" auf.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Durchsucht das Inventar. Du kannst wildcards benutzen (* fuer einen oder mehrer Charaktere, ? fuer einen Charakter)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: 'Duell (Angriff)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: 'Duell (Verteidigung)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: 'Duell (Nahkampf)',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: 'Fortkampf (Angriff)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: 'Fortkampf (Verteidung)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Nachricht an die Teilnehmer',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Anzahl der Teilnehmer',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: 'Verstecke Arbeiten und Itemsets',     /*This text is shown in the title bar of the TW Pro settings window, displayed after clicking "Config"*/
		CONFIRM: 'Bestaetigen',     /*The button for confirming/ saving changes in the "Hide activities and itemsets" window*/
		HIDEJOBDESC: 'Hier koennen Arbeiten ausgeblendet werden. Markiere die Arbeiten, die nicht automatisch berechnet werden sollen, verschiebe sie mit dem Pfeil in die andere Liste und klicke auf "Bestaetigen".',     /*The description for the "Hide activities and itemsets" window*/
		SHOWN: 'Angezeigte Arbeiten',     /*Displayed ahead the selection field for activities that are currently shown*/
		HIDDEN: 'Ausgeblendete Arbeiten',     /*Displayed ahead the selection field for activities that are currently hidden*/
		SETTINGSSAVED: 'Die Einstellung wurden übernommen',     /*After clicking "Confirm" in the "Hide activities and itemsets" window, this message is displayed*/
		SETTINGSSAVEDSESSION: 'Die Einstellung wurden übernommen (Nur dieses Mal)',     /*After clicking "Confirm" in the "Hide activities and itemsets" window while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Diese Einstellungen sollen immer gelten',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Hide activities and itemsets" window. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'Du kannst dieses Set nicht tragen oder es hat keinen Einfluss auf die Berechnung.',     /*This text is displayed when hovering over an item set at the "Hide activities and itemsets" window for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Itemsets zur schnelleren Berechnung deaktivieren. Sets mit nicht erfuellbaren Bedingungen werden automatisch deaktiviert.',     /*The description displayed ahead the settings for itemsets at the "Hide activities and itemsets" window*/
		CUSTOMNAME: 'Gib einen Namen fuer diese Taetigkeit ein',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity*/
		CUSTOMCALCULATION: 'Gib die Fertigkeiten ein, die beruecksichtig werden sollen.',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Hide activities and itemsets" window*/
		CUSTOMENABLED: 'Klicke hier um deine Taetigkeit zu aktivieren',     /*This button is visible at the "Hide activities and itemsets" window. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: 'Neu',     /*This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: 'Geschwindigkeit',     /*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: 'Schnellstmoeglich mehr Lebenspunkte',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Itemsets",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Vorteile dieser %1 Gegenstaende',     /*Displayed in Setinfo window*/
		LABORPOINTS: 'Arbeitspunkte',     /*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'Diese Zahl gibt die Anzahl der Gegenstaende wieder, die zur Berechnung verwendet wurden',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Regeneration',     /*__ % Regeneration with Sleepyhead items*/
		LUCK: 'Glueck',     /*__ % luck with Holiday set items*/
		PRAYING: 'Beten',     /*6 Sleepyhead items gives +1 Praying*/
};