// ==UserScript==
// @name            Language pack - Swedish
// @description     Swedish language pack for TW Pro, translated by Höken.
// @description Språkpaket för The-West - TW Pro+ [SOM] (http://userscripts.org/scripts/show/92414)
// @version 2.0.0.9 
// @exclude         *
// ==/UserScript==

twpro_lp_custom = {
	info: ['Höken', 'mailto:ga_axelson@hotmail.com', 511, '.se2.se4.se5.se6.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Upphovsmän',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Översättare',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'Script avaktiverat: script uppdatering behövs på grund utav källkods ändringar i The-West',     /*The script can be disabled due to source code changes by The-West devs. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Sortera efter <b>namn</b>',     /*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Sortera efter <b>erfarenhet</b>',     /*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Sortera efter <b>lön</b>',     /*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Sortera efter <b>lycka</b>',     /*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Sortera efter <b>jobb rang</b>',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Sortera efter <b>fara</b>',     /*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Sortera efter <b>arbetspoäng</b>',     /*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: "Göm arbeten jag inte kan utföra",     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Visa endast de bästa kälderna för den valda aktiviteten',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Välj aktivitet...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Beräknar värden, vänligen vänta...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Paknings statestik',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Säljvärde',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Föremål',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Produkter',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Totalt',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Antal',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'LP',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: ' \u25B7 Konstruktion',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Totala hälsopoäng',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Beräknar data...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Konvertera',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Sälj flera föremål...',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Sälj valda föremål',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Vill du verkligen sälja %1 staplar med föremål?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Säljer...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'De valda föremålen har sålts.',     /*This text is displayed after a multi-sale*/
		NONESELECTED: 'Du måste välja minst ett föremål!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Jobb rang inställningar',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Sök i packningen',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Din sökning efter %1 genererade inga resultat.%2Visa alla föremål%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Visa dålda förmål som är sämmre för den valda aktiviteten.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Sök i pakningen. Du kan använda jokertecken (* för inga eller fler tecken, ? för ett eller fler tecken)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: ' \u25B7 Skytte duellant (anfallare)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: ' \u25B7 Skytte duellant (försvarare)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: ' \u25B7 Vigör duellant',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: ' \u25B7 Fortslag (anfallare)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: ' \u25B7 Fortslag (försvarare)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Meddelande till deltagare',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Antal mottagare',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: 'Aktiviteter & Föremålssets Inställningar',     /*This text is shown as a tab in the TW Pro settings window*/
		CONFIRM: 'Godkänn',     /*The button for confirming/ saving changes in the "Activities & Itemsets Management" tab*/
		HIDEJOBDESC: 'Arbeten kan döljas här. Markera alla aktiviteter som inte ska bli beräknade automatiskt, och tryck Godkänn.',     /*The description for the "Activities & Itemsets Management" tab*/
		SHOWN: 'Aktiverade',     /*Displayed ahead the selection field for activities that are currently shown*/
		HIDDEN: 'Avaktiverade',     /*Displayed ahead the selection field for activities that are currently hidden*/
		SETTINGSSAVED: 'Inställningarna för TW Pro har tillämpats!',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab, this message is displayed*/
		SETTINGSSAVEDSESSION: 'Inställningarna för TW pro har tillämpats! (endast för denna session)',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Spara inställningarna för varje session.',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Activities & Itemsets Management" tab. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'Du kan inte använda detta set, eller så har detta set ingen inverkan på Aktivitets beräkningar.',     /*This text is displayed when hovering over an item set at the "Activities & Itemsets Management" tab for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Avaktivera föremålsset för snabbare beräkningar. Set med speciella, olämpliga krav är avaktiverade som standrad.',     /*The description displayed ahead the settings for itemsets at the "Activities & Itemsets Management" tab*/
		CUSTOMNAME: 'Fyll i det önskade namnet för aktiviteten.',     /*Visible in the "Activities & Itemsets Management" tab.This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity.*/
		CUSTOMCALCULATION: 'Fyll i en godkänd TW Pro uträkning här..',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Activities & Itemsets Management" tab*/
		CUSTOMENABLED: 'Markera denna ruta för att aktivera denna aktivitet.',     /*This button is visible in the "Activities & Itemsets Management" tab. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: 'Ny',     /*Visible in the "Activities & Itemsets Management" tab.This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: ' \u25B7 Hastighet',     /*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: ' \u25B7 Snabbaste hälsopoäng',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Föremål",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Bonus med %1 föremål',     /*Displayed in Setinfo window*/
		LABORPOINTS: 'Arbetspoäng',     /*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'Detta nummer visa mängden föremål som används i beräkningar.',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Regeneration',     /*__ % Regeneration with Sleepyhead items*/
		LUCK: 'lycka',     /*__ % luck with Holiday set items*/
		PRAYING: 'praying',     /*6 Sleepyhead items gives +1 Praying*/
		NOITEMSETS: "Du har inga föremål tillhörande detta set.",     /*Displayed in the vertical Set filters*/
		AVERAGEDAMAGE: "Genomsnittlig skada",     /*Displayed on every weapons*/
		PREFERENCES: "Inställningar",     /*This text is shown as a tab in the TW Pro settings window*/
		DEFAULTSORTING: " \u25B7 Standard sortering",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITY: "Prioritera hälsopoäng",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITYZERO: "Inte alls",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYLOW: "Låg",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYMEDIUM: "Mellan",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYHIGH: "Hög",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYAUTO: "Auto",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBBATTLEUNIT: "Stridsenhets typ",     /*Visible in the "Preferences" tab.*/
		FBBATTLEUNITSKIRMISHER: "Skirmisher (undvik) | Främre linjen",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITLINEINFANTRYMAN: "Line infantryman (polyvalent) | Mellersta linjen",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITMARKSMAN: "Marksman (sikte) | Bakre linjen",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		DMGMIN: "Min", /*Abbreviation for Minimum. Reters to the minimum damage of a weapon. Visible on weapon popups.*/
		DMGMAX: "Max", /*Abbreviation for Maximum. Reters to the maximum damage of a weapon. Visible on weapon popups.*/
		DMGAVG: "Medel", /*Abbreviation for Average. Reters to the average damage of a weapon. Visible on weapon popups.*/ 
		CHATWHISPER: "* Viska *\n\nAnge ett spelarnamn", /*Visible when clicking the corresponding button in the Chat box.*/
		CHATCOLOR: "* Valfri färg (000-999) *\n\nAnge en färgkod", /*Visible when clicking the corresponding button in the Chat box.*/
		USEFULITEMS : "Framhäv varje föremål som är användbart för mina aktiverade aktiviteter.",     /*Visible near the backpack. Displayed when calculations has been run and none activity is selected.*/
		USEFULITEMSPOPUP : " \u25B7 Box | Framhäver med detaljer", /*Visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
 };