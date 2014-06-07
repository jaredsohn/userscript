// ==UserScript==
// @name            Language pack - Sample - Greek
// @description     Library for The-West - TW Pro+ [SOM] (http://userscripts.org/scripts/show/92414)
// @version         2.0.0.9
// @exclude         *
// ==/UserScript==

twpro_lp_custom = {
	info: ['G.Papadopoulos', 'mailto:papadopoulosgeor@hotmail.com', 4343, '.w1.'],     /*['Your name', 'http://your_url OR mailto:papadopoulosgeor@hotmail.com', immortal222 (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Συγγραφείς',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Μεταφραστής',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'Το σενάριο απενεργοποιήθηκε: το σενάριο χρειάζεται ενημέρωση, λόγω αλλαγών στον πηγαίο κώδικα στο The-West',     /*The script can be disabled due to source code changes by The-West devs. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Διάταξη βάση <b>ονόματος</b>',     /*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Διάταξη βάση <b>εμπειρίας</b>',     /*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Διάταξη βάση <b>μισθοδοσία</b>',     /*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Διάταξη βάση <b>τύχη</b>',     /*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Διάταξη βάση <b>κατάταξη εργασίας</b>',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Διάταξη βάση <b>κίνδυνο</b>',     /*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Διάταξη βάση <b>πόντους εργασίας</b>',     /*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: "Απόκρυψη δραστηριοτήτων που δεν μπορώ να κάνω",     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Απλα εμφάνισε την καλύτερη διαθέσιμη ενδυμασία για την επιλεγμένη δραστηριότητα',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Επιλέξτε δραστηριότητα...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Υπολογισμός των τιμών, παρακαλώ περιμένετε...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Στατιστικές Αποθεμάτων',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Αξία πωλήσεων',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Αντικείμενα',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Προϊόντα',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Σύνολο',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Ποσότητες',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'Π.Ε.',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: ' \u25B7 Κατασκευή',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Συνολικοί πόντοι υγείας',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Υπολογισμός δεδομένων...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Μετατροπή',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Πουλήστε πολλαπλά αντικείμενα...',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Επιλογες πώλησης',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Θέλετε πραγματικά να πουληθούν %1 στοίβες των αντικειμένων?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Πώληση...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'Τα επιλεγμένα αντικείμενα έχουν πουληθεί.',     /*This text is displayed after a multi-sale*/
		NONESELECTED: 'Πρέπει να επιλέξετε τουλάχιστον ένα αντικείμενο!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Ρυθμίσεις κατάταξης εργασίας',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Αναζήτηση αποθεμάτων',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Η αναζήτηση για %1 δεν επέστρεψε αποτελέσματα.%2Εμφάνιση όλων των αντικειμένων%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Απενεργοποίησε τα κριμένα αντικείμενα που είναι κατώτερα για μια επιλεγμένη δραστηριότητα.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Ψάξε στα αποθέματα. Μπορείς να χρησιμοποιήσεις μπαλαντέρ (* για 0 ή περισσότερους χαρακτήρες, ? για ένα χαρακτήρα)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: ' \u25B7 Εύρος dueler (επιτιθέμενος)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: ' \u25B7 Εύρος dueler (αμυνόμενος)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: ' \u25B7 Melee dueler',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: ' \u25B7 Μάχη οχυρού (επιτιθέμενος)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: ' \u25B7 Μάχη οχυρού (αμυνόμενος)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Μήνυμα στους συμμετέχοντες',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Νούμερο συμμετεχόντων',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: 'Διαχείριση δραστηριοτήτων & sets  ',     /*This text is shown as a tab in the TW Pro settings window*/
		CONFIRM: 'Επιβεβαίωση',     /*The button for confirming/ saving changes in the "Activities & Itemsets Management" tab*/
		HIDEJOBDESC: 'Οι δουλειές μπορούν να απενεργοποιηθούν εδώ. Σημειώστε όλες τις δραστηριότητες οι οποίες δεν θα πρέπει να υπολογίζονται αυτόματα, και κάντε κλικ στο κουμπί Επιβεβαίωση.',     /*The description for the "Activities & Itemsets Management" tab*/
		SHOWN: 'Ενεργοποιήθηκε',     /*Displayed ahead the selection field for activities that are currently enabled*/
		HIDDEN: 'Απενεργοποιήθηκε',     /*Displayed ahead the selection field for activities that are currently disabled*/
		SETTINGSSAVED: 'Οι ρυθμίσεις για το TW Pro έχουν εφαρμοστεί!',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab, this message is displayed*/
		SETTINGSSAVEDSESSION: 'Οι ρυθμίσεις για το TW Pro έχουν εφαρμοστεί! (για αυτήν την συνεδρία μόνο)',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Αποθηκεύσετε αυτές τις ρυθμίσεις για κάθε συνεδρία.',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Activities & Itemsets Management" tab. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'Δεν μπορείτε να φοράτε αυτό το set, ή αυτό το set δεν έχει καμία επίδραση στους υπολογισμούς της δραστηριότητας.',     /*This text is displayed when hovering over an item set at the "Activities & Itemsets Management" tab for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Απενεργοποίηση itemsets για ταχύτερους υπολογισμούς.  Τα sets με ειδικές, ανικανοποίητες απαιτήσεις είναι απενεργοποιημένα από προεπιλογή.',     /*The description displayed ahead the settings for itemsets at the "Activities & Itemsets Management" tab*/
		CUSTOMNAME: 'Πληκτρολογήστε το επιθυμητό όνομα για μια δραστηριότητα',     /*Visible in the "Activities & Itemsets Management" tab.This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity.*/
		CUSTOMCALCULATION: 'Εισάγετε ένα έγκυρο TW Pro υπολογισμό εδώ.',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Activities & Itemsets Management" tab*/
		CUSTOMENABLED: 'Επιλέξτε αυτό το κουτί για να ενεργοποιήσετε αυτή τη δραστηριότητα',     /*This button is visible in the "Activities & Itemsets Management" tab. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: 'Νέο',     /*Visible in the "Activities & Itemsets Management" tab.This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: ' \u25B7 Ταχύτητα',     /*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: ' \u25B7 Ταχύτερα πόντοι υγείας',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Αντικείμενα sets",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Μπόνους με %1 αντικείμενα',     /*Displayed in Setinfo window*/
		LABORPOINTS: 'Πόντοι εργασίας',     /*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'Ο αριθμός αυτός δείχνει το ποσό των αντικειμένων που χρησιμοποιούνται στους υπολογισμούς',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Αναγέννηση',     /*__ % Regeneration with Sleepyhead items*/
		LUCK: 'Τύχη',     /*__ % luck with Holiday set items*/
		PRAYING: 'Προσευχή',     /*6 Sleepyhead items gives +1 Praying*/
		NOITEMSETS: "Δεν έχετε κανένα αντικείμενο από αυτό το set",     /*Displayed in the vertical Set filters*/
		AVERAGEDAMAGE: "Μέσος όρος ζημιάς",     /*Displayed on every weapons*/
		PREFERENCES: "Προτιμήσεις",     /*This text is shown as a tab in the TW Pro settings window*/
		DEFAULTSORTING: " \u25B7 Προεπιλεγμένη ταξινόμηση",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITY: "Προτεραιότητα πόντων υγείας",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITYZERO: "Καθόλου",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYLOW: "Χαμηλό",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYMEDIUM: "Μεσαίό",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYHIGH: "Υψηλό",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYAUTO: "Αυτόματο",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBBATTLEUNIT: "Τύπος μονάδας μάχης",     /*Visible in the "Preferences" tab.*/
		FBBATTLEUNITSKIRMISHER: "Ακροβολιστής (αποφεύγοντας) | πρώτη γραμμή",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITLINEINFANTRYMAN: "Φαντάρος γραμμής  (πολυδύναμα) | Μέση γραμμή",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITMARKSMAN: "Σκοπευτής (με στόχο) | πίσω γραμμή",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		DMGMIN: "Ελάχιστο",     /*Abbreviation for Minimum. Refers to the minimum damage of a weapon. Visible on weapon popups.*/
		DMGMAX: "Μέγιστο",     /*Abbreviation for Maximum. Refers to the maximum damage of a weapon. Visible on weapon popups.*/
		DMGAVG: "Μέσος όρος",     /*Abbreviation for Average. Refers to the average damage of a weapon. Visible on weapon popups.*/
		CHATWHISPER: "* Ψιθύρισε * \ n \ nΕισαγάγετε ένα όνομα παίκτη",     /*Visible when clicking the corresponding button in the Chat box.*/
		CHATCOLOR: "* Προσαρμογή χρώματος (000-999) *\n\nΕισάγετε έναν κωδικό χρώματος",     /*Visible when clicking the corresponding button in the Chat box.*/
		USEFULITEMS : "Επισημάνετε κάθε αντικείμενο που είναι χρήσιμο για τις ενεργοποιημένες δραστηριότητες μου.",     /*Visible near the backpack. Displayed when calculations has been run and none activity is selected.*/
		USEFULITEMSPOPUP : " \u25B7 Πλαίσιο | Επισήμανση με λεπτομέρειες",     /*Visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
};
