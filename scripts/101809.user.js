// ==UserScript==
// @name            Language pack - Sample - English
// @description     Library for The-West - TW Pro+ [SOM] (http://userscripts.org/scripts/show/92414)
// @version         2.0.0.9
// @exclude         *
// ==/UserScript==

twpro_lp_custom = {
	info: ['Web', 'Mail:zyphir.randrott@gmail.com', 4343, '.w1.'],     /*['AlexxanderX', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Autor',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Translator',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'Script dezactivat: script update needed due to source code changes in The-West',     /*The script can be disabled due to source code changes by The-West devs. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Sorteaza dupa <b>nume</b>',     /*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Sorteaza dupa <b>experienta</b>',     /*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Sorteaza dupa <b>salariu</b>',     /*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Sorteaza dupa <b>noroc</b>',     /*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Sorteaza dupa <b>rangul muncii</b>',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Sorteaza dupa <b>primejdie</b>',     /*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Sorteaza dupa <b>punce de munca</b>',     /*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: "Ascunde activitatile pe care nu le pot face",     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Doar aratami cele mai bune haine pentru activitatea aleasa',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Alege activitatea...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Calculez valorile, te rog asteapta...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Statistici inventoriu',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Valoare de vanzare',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Obiecte',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Produse',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Total',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Cantitati',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'LP',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: ' \u25B7 Construction',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Totalul punctelor de viata',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Calculez data...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Convert',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Vinde mai multe produse...',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Vinde ce ai selectat',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Chiar vrei sa vinzi %1 iteme?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Vand...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'Produsele selectate au fost vandute.',     /*This text is displayed after a multi-sale*/
		NONESELECTED: 'Trebuie sa selectezi cel putin 1 produs',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Setarile rangului muncii',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Cauta inventoriu',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Cautarea ta pentru %1 nu a gasit nimic.%2Arata toate produsele%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Dezactiveaza ascunderea hainelor superioare activitatii.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Cauta inventoriu. Poti folosi wildcards (* for zero or more characters, ? for one character)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: ' \u25B7 Range dueler (atacator)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: ' \u25B7 Range dueler (aparator)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: ' \u25B7 Melee dueler',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: ' \u25B7 Fortbattle (atacator)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: ' \u25B7 Fortbattle (aparator)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Mesaj pentru participanti',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Numar de recipiente',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: 'Activitati & Itemsets Management',     /*This text is shown as a tab in the TW Pro settings window*/
		CONFIRM: 'Confirm',     /*The button for confirming/ saving changes in the "Activities & Itemsets Management" tab*/
		HIDEJOBDESC: 'Jobs can be disabled here. Mark all activities which should not be calculated automatically, and click Confirm.',     /*The description for the "Activities & Itemsets Management" tab*/
		SHOWN: 'Activat',     /*Displayed ahead the selection field for activities that are currently enabled*/
		HIDDEN: 'Dezactivat',     /*Displayed ahead the selection field for activities that are currently disabled*/
		SETTINGSSAVED: 'Setarile pentru TW Pro au fost aplicate!',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab, this message is displayed*/
		SETTINGSSAVEDSESSION: 'The settings for TW Pro have been applied! (for this session only)',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Save these settings for every session.',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Activities & Itemsets Management" tab. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'You cannot wear this set, or this set has no influence on the Activity calculations.',     /*This text is displayed when hovering over an item set at the "Activities & Itemsets Management" tab for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Disable itemsets for faster calculations. Sets with special, unmet requirements are disabled by default.',     /*The description displayed ahead the settings for itemsets at the "Activities & Itemsets Management" tab*/
		CUSTOMNAME: 'Enter the desired name for an activity',     /*Visible in the "Activities & Itemsets Management" tab.This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity.*/
		CUSTOMCALCULATION: 'Enter a valid TW Pro calculation here.',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Activities & Itemsets Management" tab*/
		CUSTOMENABLED: 'Check this box to enable this activity',     /*This button is visible in the "Activities & Itemsets Management" tab. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: 'New',     /*Visible in the "Activities & Itemsets Management" tab.This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: ' \u25B7 Speed',     /*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: ' \u25B7 Fastest lifepoints',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Itemsets",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Bonuses with %1 items',     /*Displayed in Setinfo window*/
		LABORPOINTS: 'Labor points',     /*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'This number indicates the amount of items which are used in calculations',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Regeneration',     /*__ % Regeneration with Sleepyhead items*/
		LUCK: 'luck',     /*__ % luck with Holiday set items*/
		PRAYING: 'praying',     /*6 Sleepyhead items gives +1 Praying*/
		NOITEMSETS: "You don\'t have any item of this Set",     /*Displayed in the vertical Set filters*/
		AVERAGEDAMAGE: "Average damage",     /*Displayed on every weapons*/
		PREFERENCES: "Preferences",     /*This text is shown as a tab in the TW Pro settings window*/
		DEFAULTSORTING: " \u25B7 Default sorting",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITY: "Health points priority",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITYZERO: "None",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYLOW: "Low",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYMEDIUM: "Medium",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYHIGH: "High",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYAUTO: "Auto",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBBATTLEUNIT: "Battle unit type",     /*Visible in the "Preferences" tab.*/
		FBBATTLEUNITSKIRMISHER: "Skirmisher (dodging) | Front line",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITLINEINFANTRYMAN: "Line infantryman (polyvalent) | Middle line",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITMARKSMAN: "Marksman (aiming) | Rear line",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		DMGMIN: "Min",     /*Abbreviation for Minimum. Refers to the minimum damage of a weapon. Visible on weapon popups.*/
		DMGMAX: "Max",     /*Abbreviation for Maximum. Refers to the maximum damage of a weapon. Visible on weapon popups.*/
		DMGAVG: "Avg",     /*Abbreviation for Average. Refers to the average damage of a weapon. Visible on weapon popups.*/
		CHATWHISPER: "* Whisper *\n\nEnter a player name",     /*Visible when clicking the corresponding button in the Chat box.*/
		CHATCOLOR: "* Custom color (000-999) *\n\nEnter a color code",     /*Visible when clicking the corresponding button in the Chat box.*/
		USEFULITEMS : "Highlight every items that are useful for my enabled activities",     /*Visible near the backpack. Displayed when calculations has been run and none activity is selected.*/
		USEFULITEMSPOPUP : " \u25B7 Box | Highlighting with details",     /*Visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
};