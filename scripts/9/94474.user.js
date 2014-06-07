// ==UserScript==
// @name            Greek Language pack for TW Pro+
// @version         2
// ==/UserScript==


twpro_lp_custom = {

info: ['TEObest1', 'mailto:teo_best1@hotmail.com', 94562, '.gr1.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Δημιουργός:',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Μεταφραστής:',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'Το Scriptάκι είναι απενεργοποιημένο',     /*TW Pro can be disabled in the script. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Κατέταξε με βάση το <b>όνομα</b>',     /*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Κατέταξε με βάση την <b>εμπειρία</b>',     /*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Κατέταξε με βάση τα <b>χρήματα</b>',     /*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Κατέταξε με βάση την <b>τύχη</b>',     /*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Κατέταξε με βάση την <b>κατάταξη εργασίας</b>',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Κατέταξε με βάση τον <b>κύνδινο</b>',     /*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Κατέταξε με βάση τους <b>πόντους εργασίας</b>',     /*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: "Κρύψε δουλειές που δεν μπορώ να κάνω",     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Απλώς κράτα τον καλύτερο οπλισμό για την επιλεγμένη εργασία',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Επέλεξε εργασία...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Υπολογίζει δεδομένα, περιμένετε...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Στατιστικά αποθεμάτων',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'ΑΞΙΕΣ ΠΩΛΗΣΗΣ',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Αντικείμενα',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Προϊόντα',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'ΣΥΝΟΛΟ',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'ΠΟΣΟΤΗΤΕΣ',     /*Visible in the Inventory statistics tooltip. */
		NONYIELDS: 'Δεν αποδίδει',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'Πόντοι Εργ.',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: 'Κατασκευή',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Συνολικοί Πόντοι Υγείας',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Υπολογίζει δεδομένα...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Μετέτρεψε',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Πούλησε πολλαπλά αντικείμενα...',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Πούλησε επιλογή',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Είσαι σίγουρος πως θέλεις να πουλήσεις %1 αντικείμενα?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Πώληση...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'Τα επιλεγμένα αντικείμενα έχουν πωληθεί.',     /*This text is displayed after a multi-sale*/
		NONESELECTED: 'Πρέπει να επιλέξεις το λιγότερο ένα αντικείμενο!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Ρυθμίσεις κατάταξης εργασίας',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Αναζήτησε στα αποθέματα',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Αναζήτησες για %1 δεν βρέθηκαν αποτελέσματα.%2Δείξε όλα τα αντικείμενα%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Απενεργοποίησε κρυμμένα αντικείμενα, τα οποία είναι λίγα για την επιλιλεγμένη εργασία.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Αναζήτηση στα αποθέμετα. Μπορείς να χρησιμοποιήσεις σύμβολα (όπως * για κανένα ή περισσότερους χαρακτήρες ή ? για ένα χαρακτήρα)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: 'Εύρος μαχητή (επιτιθόμενος)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: 'Εύρος μαχητή (αμυνόμενος)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: 'Μαχητής με Melee',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: 'Μάχη οχυρού (επίθεση)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: 'Μάχη οχυρού (άμυνα)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Μύνημα προς τους συμμετέχοντες',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Αριθμός παραληπτών',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: 'Κρύψε εργασίες και σετ αντικειμένωνω',     /*This text is shown in the title bar of the TW Pro settings window, displayed after clicking "Config"*/
		CONFIRM: 'Confirm',     /*The button for confirming/ saving changes in the "Hide activities and itemsets" window*/
		HIDEJOBDESC: 'Jobs can be hidden here. Mark all activities which should not be calculated automatically, and click Confirm.',     /*The description for the "Hide activities and itemsets" window*/
		SHOWN: 'Εμφανιζόμενα',     /*Displayed ahead the selection field for activities that are currently shown*/
		HIDDEN: 'Κρυμμένα',     /*Displayed ahead the selection field for activities that are currently hidden*/
		SETTINGSSAVED: 'The settings for TW Pro have been applied!',     /*After clicking "Confirm" in the "Hide activities and itemsets" window, this message is displayed*/
		SETTINGSSAVEDSESSION: 'The settings for TW Pro have been applied! (for this session only)',     /*After clicking "Confirm" in the "Hide activities and itemsets" window while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Save these settings for every session.',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Hide activities and itemsets" window. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'You cannot wear this set, or this set has no influence on the Activity calculations.',     /*This text is displayed when hovering over an item set at the "Hide activities and itemsets" window for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Disable itemsets for faster calculations. Sets with special, unmet requirements are disabled by default.',     /*The description displayed ahead the settings for itemsets at the "Hide activities and itemsets" window*/
		CUSTOMNAME: 'Enter the desired name for an activity',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity*/
		CUSTOMCALCULATION: 'Enter a valid TW Pro calculation here.',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Hide activities and itemsets" window*/
		CUSTOMENABLED: 'Check this box to enable this activity',     /*This button is visible at the "Hide activities and itemsets" window. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: 'Νέα',     /*This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: 'Ταχύτητα',     /*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: 'Γρηφορότεροι πόντοι υγείας',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Σετ με αντικείμενα",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Bonuses with %1 items',     /*Displayed in Setinfo window*/
		LABORPOINTS: 'Πόντοι Εμπειρίας',     /*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'This number indicates the amount of items which are used in calculations',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Αναγέννηση',     /*__ % Regeneration with Sleepyhead items*/
		LUCK: 'τύχη',     /*__ % luck with Holiday set items*/
		PRAYING: 'προσευχή',     /*6 Sleepyhead items gives +1 Praying*/




	info: ['Zebx', 'mailto:zyphir.randrott@gmail.com', 4343, '.w1.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Authors',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Translator',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'Script disabled: script update needed due to source code changes in The-West',     /*The script can be disabled due to source code changes by The-West devs. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Order by <b>name</b>',     /*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Order by <b>experience</b>',     /*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Order by <b>wages</b>',     /*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Order by <b>luck</b>',     /*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Order by <b>job rank</b>',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Order by <b>danger</b>',     /*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Order by <b>labor points</b>',     /*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: "Hide activities I cannot do",     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Just display the best clothing available for the selected activity',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Choose activity...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Calculating values, please wait...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Inventory statistics',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Sales value',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Objects',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Products',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Total',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Quantities',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'LP',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: ' \u25B7 Construction',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Total health points',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Calculate data...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Convert',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Sell multiple items...',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Sell selection',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Do you really want to sell %1 stacks of items?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Selling...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'The selected items have been sold.',     /*This text is displayed after a multi-sale*/
		NONESELECTED: 'You have to select at least one item!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Job ranking settings',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Search inventory',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Your search for %1 returned no results.%2Display all items%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Disable hiding items which are inferior for a selected activity.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Search the inventory. You can use wildcards (* for zero or more characters, ? for one character)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: ' \u25B7 Range dueler (attacker)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: ' \u25B7 Range dueler (defender)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: ' \u25B7 Melee dueler',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: ' \u25B7 Fortbattle (attacker)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: ' \u25B7 Fortbattle (defender)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Message to participants',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Number of recipients',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: 'Activities & Itemsets Management',     /*This text is shown as a tab in the TW Pro settings window*/
		CONFIRM: 'Confirm',     /*The button for confirming/ saving changes in the "Activities & Itemsets Management" tab*/
		HIDEJOBDESC: 'Jobs can be hidden here. Mark all activities which should not be calculated automatically, and click Confirm.',     /*The description for the "Activities & Itemsets Management" tab*/
		SHOWN: 'Shown',     /*Displayed ahead the selection field for activities that are currently shown*/
		HIDDEN: 'Hidden',     /*Displayed ahead the selection field for activities that are currently hidden*/
		SETTINGSSAVED: 'The settings for TW Pro have been applied!',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab, this message is displayed*/
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

};