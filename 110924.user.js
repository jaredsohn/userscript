// ==UserScript==
// @name            Language pack - Greek
// @description     Library for The-West - TW Pro+ [SOM] (http://userscripts.org/scripts/show/92414)
// @translator(s)   firstroad
// Translators notice : Παιδιά δεν είμαι και εγώ τέλειος, αν βρείτε κάποιο λάθος ή πρόβλημα παρακαλώ να μου το αναφέρετε στο m.makaros@yahoo.gr με θέμα ''TW script'' Ευχαριστώ!
// @version         3.1.0.8
// @exclude         *
// ==/UserScript==

twpro_lp_custom = {
	info: ['firstroad', 'http://userscripts.org/scripts/show/110924', 141145, '.gr5.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Συγγραφείς',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Μεταφραστής',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'To script απενεργοποιήθηκε: χρειάζεται ενημέρωση του script λόγω αλλαγών στον κώδικα του The West',     /*The script can be disabled due to source code changes by The-West devs. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Ταξινόμηση κατά <b>όνομα</b>',     /*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Ταξινόμηση κατά <b>εμπειρία</b>',     /*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Ταξινόμηση κατά <b>μισθό</b>',     /*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Ταξινόμηση κατά <b>τύχη</b>',     /*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Ταξινόμηση κατά <b>κατάταξη εργασίας</b>',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Ταξινόμηση κατά <b>κίνδυνο</b>',     /*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Ταξινόμηση κατά <b>πόντους εργασίας</b>',     /*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: "Απόκρυψη δραστηριοτήτων που δεν μπορώ να κάνω",     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Εμφάνιση μόνο του καλύτερου διαθέσιμου ρουχισμού για την επιλεγμένη δραστηριότητα',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Επιλογή δραστηριότητας...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Παρακαλώ περιμένετε...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Στατιστικά Αποθεμάτων',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Αξία πώλησης',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Αντικείμενα',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Προϊόντα',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Σύνολο',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Ποσότητες',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'ΠΕ',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: ' \u25B7 Κατασκευή',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Σύνολο πόντων ζωής',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Υπολογισμός τιμών...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Μετατροπή',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Πώληση πολλών αντικειμένων...',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Πώληση επιλεγμένων',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Είσαι σίγουρος ότι θες να πουλήσεις %1 αντικείμενο/α?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Πώληση...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'Τα επιλεγμένα αντικείμενα πωλήθηκαν',     /*This text is displayed after a multi-sale*/
		NONESELECTED: 'Πρέπει να επιλέξεις τουλάχιστον ένα αντικείμενο!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Ρυθμίσεις κατάταξης εργασιών',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Αναζήτηση στα αποθέματα',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Η αναζήτηση σου για %1 επέστρεψε κανένα αποτέλεσμα.%2Εμφάνιση όλων των αντικειμένων%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Εμφάνιση των κατώτερων αντικειμένων για την επιλεγμένη δραστηριότητα',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Αναζήτηση στα αποθέματα. Μπορείς να χρησιμοποιήσεις μπαλαντέρ (* για κανένα η πολλούς χαρακτήρες, ? για ένα χαρακτήρα)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: ' \u25B7 Μονομάχος εύρους(επιτιθέμενος)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: ' \u25B7 Μονομάχος εύρους(αμυνόμενος)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: ' \u25B7 Μονομάχος εξ επαφής',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: ' \u25B7 Μάχη οχυρού (επιτιθέμενος)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: ' \u25B7 Μάχη οχυρού (αμυνόμενος)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Στείλε μήνυμα στους συμμετέχοντες',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Αριθμός παραληπτών',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: 'Διαχείριση δραστηριοτήτων & σετ εξοπλισμού',     /*This text is shown as a tab in the TW Pro settings window*/
		CONFIRM: 'Επιβεβαίωση',     /*The button for confirming/ saving changes in the "Activities & Itemsets Management" tab*/
		HIDEJOBDESC: 'Οι εργασίες μπορούν να απενεργοποιηθούν εδώ. Επέλεξε όσες δραστηριότητες δεν θα έπρεπε να υπολογίζονται αυτόματα, και πάτα Επιβεβαίωση.',     /*The description for the "Activities & Itemsets Management" tab*/
		SHOWN: 'Ενεργοποιημένο',     /*Displayed ahead the selection field for activities that are currently enabled*/
		HIDDEN: 'Απενεργοποιημένο',     /*Displayed ahead the selection field for activities that are currently disabled*/
		NOEQUIP: "Χωρίς εξοπλισμό",     /*Visible in the "Activities & Itemsets Management" tab. Popup displayed in the activities list.*/
		BESTEQUIP: "Με τον καλύτερο εξοπλισμό",     /*Visible in the "Activities & Itemsets Management" tab. Popup displayed in the activities list.*/
		SETTINGSSAVED: 'Οι ρυθμίσεις του TW Pro εφαρμόστηκαν!',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab, this message is displayed*/
		SETTINGSSAVEDSESSION: 'Οι ρυθμίσεις του TW Pro εφαρμόστηκαν! (μόνο για αυτό το τμήμα)',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Εφαρμογή αυτών των ρυθμίσεων για κάθε συνεδρία',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Activities & Itemsets Management" tab. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'Δεν μπορείς να φορέσεις αυτό το σετ, ή αυτό το σετ δεν επηρεάζει τους υπολογισμούς των δραστηριοτήτων.',     /*This text is displayed when hovering over an item set at the "Activities & Itemsets Management" tab for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Απενεργοποίησε τα σετ εξοπλισμού για γρηγορότερους υπολογισμούς. Σετ με ξεχωριστές, ανεκπλήρωτες απαιτήσεις είναι απενεργοποιημένα απο την προεπιλογή.',     /*The description displayed ahead the settings for itemsets at the "Activities & Itemsets Management" tab*/
		CUSTOMNAME: 'Εισαγωγή του επιθυμητού ονόματος για μία δραστηριότητα',     /*Visible in the "Activities & Itemsets Management" tab.This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity.*/
		CUSTOMCALCULATION: 'Εισαγωγή ενός έγκυρου TW Pro υπολογισμού εδώ.',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Activities & Itemsets Management" tab*/
		CUSTOMENABLED: 'Μάρκαρε αυτό το κουτί για να ενεργοποιήσεις αυτή την δραστηριότητα',     /*This button is visible in the "Activities & Itemsets Management" tab. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: 'Νέο',     /*Visible in the "Activities & Itemsets Management" tab.This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: ' \u25B7 Ταχύτητα',     /*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: ' \u25B7 Ταχείς πόντοι υγείας',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Σετ εξοπλισμού",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Μπόνους με %1 αντικείμενα',     /*Displayed in Setinfo window*/
		LABORPOINTS: 'Πόντοι εργασίας',     /*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'Αυτός ο αριθμός αντιπροσωπεύει τον αριθμό των αντικειμένων που χρησιμοποιούνται στους υπολογισμούς',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Επαναφορά',     /*__ % Regeneration with Sleepyhead items*/
		LUCK: 'Τύχη',     /*__ % luck with Holiday set items*/
		PRAYING: 'Προσευχή',     /*6 Sleepyhead items gives +1 Praying*/
		NOITEMSETS: "Δεν έχεις κανένα αντικείμενο από αυτό το σετ",     /*Displayed in the vertical Set filters*/
		AVERAGEDAMAGE: "Μέσος όρος ζημιάς",     /*Displayed on every weapons*/
		PREFERENCES: "Προτιμήσεις",     /*This text is shown as a tab in the TW Pro settings window*/
		DEFAULTSORTING: " \u25B7 Προεπιλεγμένη ταξινόμηση",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITY: "Προτεραιότητα πόντων υγείας",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITYZERO: "Καμία",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYLOW: "Χαμηλή",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYMEDIUM: "Μεσαία",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYHIGH: "Υψηλή",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYAUTO: "Αυτόματη",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBBATTLEUNIT: "Τύπος οχυρομάχου",     /*Visible in the "Preferences" tab.*/
		FBBATTLEUNITSKIRMISHER: "Ακροβολιστής (Αποφυγή) | Πρώτη γραμμή",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITLINEINFANTRYMAN: "Φαντάρος γραμμής (Πολυδύναμο) | Μεσαία γραμμή",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITMARKSMAN: "Σκοπευτής (Στόχευση) | Πίσω γραμμή",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBTAGS : [["0", "1", "2", "3", "@"], ["Α", "Π", "Σ"]],     /*Visible in the dropdown menu, the item popups at merchants and the "Activities & Itemsets Management" tab. Tags representing the different combinations possible for "Health points priority" & "Battle unit type". Only 1 character allowed for each parameter. Order must be respected as listed above.*/
		DMGMIN: "Ελάχιστο",     /*Abbreviation for Minimum. Refers to the minimum damage of a weapon. Visible on weapon popups.*/
		DMGMAX: "Μέγιστο",     /*Abbreviation for Maximum. Refers to the maximum damage of a weapon. Visible on weapon popups.*/
		DMGAVG: "Μέσος όρος",     /*Abbreviation for Average. Refers to the average damage of a weapon. Visible on weapon popups.*/
		CHATWHISPER: "* Ψιθύρισμα *\n\nΠληκτρολόγησε το όνομα του παίκτη",     /*Visible when clicking the corresponding button in the Chat box.*/
		CHATCOLOR: "* Προσαρμοσμένο χρώμα (000-999) *\n\nΠληκτρολόγησε τον κωδικό χρώματος",     /*Visible when clicking the corresponding button in the Chat box.*/
		USEFULITEMS : "Επισήμανση όλων των αντικειμένων που είναι χρήσιμα για τις ενεργοποιημένες μου δραστηριότητες",     /*Visible near the backpack. Displayed when calculations has been run and none activity is selected.*/
		USEFULITEMSPOPUP : " \u25B7 Πλαίσιο | Επισημαίνοντας με λεπτομέρειες",     /*Visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
		USEFULITEMSPOPUPDESC : "Τα μπόνους από δραστηριότητες θα εμφανίζετε σε κάθε χρήσιμο αντικείμενο (η πρόοδος είναι λίγο μακρύτερη).",     /*Popup visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
		SHOWALLJOBS : " \u25B7 Εμφάνιση όλων των εργασιών στο χάρτη",     /*Visible in the "Preferences" tab.*/
		SHOWALLJOBSDESC : "Ενεργό μετά την ανανέωση (F5)",     /*Popup visible in the "Preferences" tab.*/
		COLLECTORMODE : " \u25B7 Λειτουργία Συλλέκτη",     /*Visible in the "Preferences" tab.*/
		COLLECTORMODEDESC : "Τα αντικείμενα στους εμπόρους θα επισημαίνονται με μπλε αν δεν τα έχεις ήδη.",     /*Popup visible in the "Preferences" tab.*/
		HELP : "Βοήθεια",     /*Visible in the "Preferences" tab.*/
		WEBSTORAGEQUOTAEXCEEDED : "Το ποσοστό αποθήκευσης ιστού υπέρβηκε!\n\n- Τα τωρινά σου δεδομένα θα είναι ελλιπής.\n- Το χαρακτηριστικό Προσωρινής μνήμης έχει απενεργοποιηθεί αυτόματα.\n- Παρακαλώ αδειάστε την Προσωρινή μνήμη κάποιων λογαριασμών σε αυτό το διακομιστή, ή αυξήστε τα όρια του τοπικού αποθηκευτικού χώρου (μόνο για Opera και Firefox).",     /*Alert box displayed when WebStorage is full.*/
		CACHEGENERATE : "Δημιουργία προσωρινής μνήμης...",     /*Visible in the inventory dropdown menu and in the prompt box for generating cache.*/
		CACHEUPDATE : "Ενημέρωση προσωρινής μνήμης",     /*Visible in the prompt box for updating cache.*/
		CACHEFORCEOK : "Απόρριψη των αλλαγών που βρέθηκαν.",    /*Visible in the prompt box for generating cache when items changes are detected.*/
		CACHEFORCEOKDESC : "Εξανάγκασε την κατάσταση της προσωρινής μνήμης σε Εντάξει, χωρίς τους υπολογισμούς.",    /*Popup visible in the prompt box for generating cache when items changes are detected.*/
		CACHEGENERATENOW : "Θέλεις να δημιουργήσεις μία νέα προσωρινή μνήμη τώρα?",     /*Visible in the prompt box for generating cache.*/
		CACHEUPDATENOW : "Αναβάθμιση την προσωρινής μνήμης τώρα?",     /*Visible in the prompt box for updating cache.*/
		CACHEINVENTORYCHANGES : "Βρέθηκαν αλλαγές στα αποθέματα.",     /*Popup visible on the inventory cache button.*/
		CACHEUPDATECLICK : "Κάνε κλικ για αναβάθμιση της προσωρινής μνήμης.",     /*Popup visible on the inventory cache button when items or skills changes are detected or when a new job is added in the game.*/
		CACHENEWITEMS : "Νέα αντικείμενα",     /*Popup visible on the inventory cache button when items changes are detected.*/
		CACHEDELETEDITEMS : "Διαγραμμένα αντικείμενα",     /*Popup visible on the inventory cache button when items changes are detected.*/
		CACHESKILLSCHANGES : "Βρέθηκαν αλλαγές στις ικανότητες.",     /*Popup visible on the inventory cache button when skills changes are detected.*/
		CACHEJOBSAFFECTED : "Οι δραστηριότητες επηρεάστηκαν",     /*Popup visible on the inventory cache button when skills changes are detected.*/
		CACHEISEMPTY : "Η προσωρινή μνήμη είναι άδεια.",     /*Popup visible on the inventory cache button.*/
		CACHEINITIALIZE : "Κάνε κλικ εδώ για προετοιμασία.",     /*Popup visible on the inventory cache button when cache is empty.*/
		CACHEOK : "Η προσωρινή μνήμη είναι Εντάξει.",     /*Popup visible on the inventory cache button.*/
		CACHEREWRITE : "Αν χρειαστεί μπορείς ακόμα να ξαναγράψεις τα δεδομένα πατώντας εδώ.",     /*Popup visible on the inventory cache button when cache is ok.*/
		CACHEEMPTYING : "Η προσωρινή μνήμη αδειάζει...",     /*Popup visible on the inventory cache button.*/
		CACHENORMALMODE : "Το TW Pro είναι στην κανονική λειτουργία κατά την διάρκεια της διαδικασίας.",     /*Popup visible on the inventory cache button when cache is emptying.*/
		CACHEDISABLED : "Η προσωρινή μνήμη είναι απενεργοποιημένη.",     /*Popup visible on the inventory cache button.*/
		CACHEOPENSETTINGS : "Άνοιγμα των ρυθμίσεων του TW Pro για ενεργοποίηση.",     /*Popup visible on the inventory cache button when cache is disabled.*/
		CACHENEWJOBSDETECTED : "Βρέθηκαν νέες εργασίες.",     /*Popup visible on the inventory cache button when a new job is added in the game.*/
		CACHENEWJOBDETECTED : "Βρέθηκε μία νέα εργασία: %1<br>Παρακαλώ αναβαθμίστε την προσωρινή μνήμη.",     /*Red box message displayed when a new job is added in the game.*/
		CACHEENABLE : " \u25B7 Ενεργοποίηση της προσωρινής μνήμης του TW Pro",     /*Visible in the "Preferences" tab.*/
		CACHEINDEXEDDBNOT : "Το IndexedDB δεν υποστηρίζεται από τον περιηγητή σου.",     /*Alert box displayed when IndexedDB is selected but not supported.*/
		CACHEINDEXEDDBDESC : "Υπερβολικά γρήγορη επεξεργασία. Προτεινόμενο για Firefox 4+ και Chrome 11+.",     /*Visible in the "Preferences" tab.*/
		CACHECOMPATIBILITY : "Πληροφορίες συμβατότητας",     /*Visible in the "Preferences" tab.*/
		CACHEQUOTAS : "Πληροφορίες ποσοστών",     /*Visible in the "Preferences" tab.*/
		CACHEQUOTASDESC : "<b>Κάνε κλικ στις 'Πληροφορίες ποσοστών' για να μάθεις τα όρια του αποθηκευτικού χώρου του περιηγητή σου (Τοπικός χώρος αποθήκευσης).<br>"
				  +"<br>Πώς να αυξήσεις τα όρια του τοπικού αποθηκευτικού χώρου?</b><br>"
				  +"<b>- Firefox:</b><br>"
				  +"Πληκτρολόγησε 'about:config' στην μπάρα διευθύνσεων και ψάξε για την ρύθμιση 'dom.storage.default_quota'.<br>"
				  +"Αυτή η τιμή είναι σε kilobytes, μπορείς να την αλλάξεις. Ο αποθηκευτικός χώρος μοιράζεται από τον διακομιστή γλώσσας,<br>"
				  +"θα χρειαστείς περίπου 1500 kB ανά λογαριασμό στον ίδιο διακομιστή.<br>"
				  +"<b>- Chrome:</b><br>"
				  +"Δεν είναι πιθανό να προσαρμόσεις τα ποσοστά.<br>"
				  +"<b>- Opera:</b><br>"
				  +"Από προεπιλογή, ο περιηγητής σου σε παροτρείνει να αυξήσεις τα όρια όταν είναι αναγκαίο. Ωστόσο μπορείς<br>"
				  +"Πληκτρολόγησε 'opera:webstorage' στην μπάρα διευθύνσεων και άλλαξε τις ρυθμίσεις χειροκίνητα για κάθε διεύθυνση.<br>"
				  +"Η τιμή είναι σε kilobytes.Ο αποθηκευτικός χώρος μοιράζεται από τον κόσμο (υποδιεύθυνση), θα χρειαστείς περίπου 3000 kB<br>"
				  +"ανά λογαριασμό στον ίδιο κόσμο.<br>"
				  +"<b>- Safari:</b><br>"
				  +"Δεν είναι πιθανό να προσαρμόσεις τα ποσοστά.",     /*Popup visible in the "Preferences" tab when hovering the "quotas info" link.*/
		CACHEEMPTY : ";Άδειασμα της προσωρινής μνήμης του TW Pro.",     /*Popup visible in the "Preferences" tab.*/
		CACHEEMPTYDESC : "Εργαλείο διάσωσης. Να χρησιμοποιείται κυρίως σε περίπτωση ανακολουθίας δεδομένων.",     /*Popup visible in the "Preferences" tab.*/
		CACHEWEBSTORAGEDESC : "Γρήγορη επεξεργασία. Υποστηρίζεται από τους περισσότερους περιηγητές, αλλά μπορεί να υπόκειται σε όρια των ποσοστών αποθήκευσης.",     /*Visible in the "Preferences" tab.*/
		CACHEEMPTYNOW : "Άδειασμα αυτής της προσωρινής μνήμης τώρα;",     /*Visible in the prompt box displayed when user wants to delete the cache.*/
		CACHERECORDS : "Αρχεία",     /*Visible in the prompt box displayed when user wants to delete the cache.*/
		CACHEEMPTIED : "Η προσωρινή μνήμη άδειασε!",     /*Message displayed when user has deleted the cache.*/
		CACHERECORDSDELETED : "Τα αρχεία διαγράφηκαν.",     /*Message displayed when user has deleted the cache.*/
		CACHEEMPTYSLOWDESC : "Μπορείς ακόμα να παίξεις κατά την διάρκεια της διαδικασίας.",     /*Popup visible in the prompt box displayed when user wants to delete the Webstorage cache. Also visible as popup on the Safemode checkbox, in the "Preferences" tab.*/
		CACHEEMPTYFASTDESC : "Γρηγορότερο αλλά ο περιηγητής μπορεί να κολλήσει κατά την διάρκεια της διαδικασίας.",     /*Popup visible in the prompt box displayed when user wants to delete the Webstorage cache.*/
		CACHEFASTMODE : "Γρήγορη λειτουργία",     /*Visible in the prompt box displayed when user wants to delete the Webstorage cache.*/
		NORMALMODE : "Κανονική λειτουργία",     /*Visible in the prompt box displayed when user wants to delete the Webstorage cache. Also visible in the "Preferences" tab for the "Split fortbattle combinations" feature*/
		FBCOMBOFAVORITE : "Αγαπημένο",     /*Displayed in the inventory dropdown menu when the "Split fortbattle combinations" feature is enabled AND in Submenu mode.*/
		FBCOMBOGENERATE : "Δημιούργησε όλους τους συνδυασμούς Μάχης οχυρού.",     /*Visible in the "Preferences" tab.*/
		FBCOMBODESC : "Αυτό θα προσθέσει 30 δραστηριότητες στο αναπτυσσόμενο μενού, αλλά θα μπορείς να τις διαχειριστείς στην καρτέλα",     /*Visible in the "Preferences" tab.*/
		FBCOMBONORMALDESC : "Εμφανίζει τους συνδυασμούς ως κανονικές δραστηριότητες στο αναπτυσσόμενο μενού.",     /*Visible in the "Preferences" tab.*/
		FBCOMBOSUBMENUS : "Λειτουργία Υπομενού",     /*Visible in the "Preferences" tab.*/
		FBCOMBOSUBMENUSDESC : "Εμφανίζει τις δραστηριότητες ως υπομενού των βασικών δραστηριοτήτων Μάχης οχυρού.",     /*Visible in the "Preferences" tab.*/
		FBCOMBOHELPDESC : "<b>Όταν το αναπτυσσόμενο μενού είναι επιλεγμένο:</b><br>- Πάτα [1] για να επεκτείνεις το υπομενού με τους επιθετικούς συνδιασμούς.<br>- Πάτα [2] για να επεκτείνεις το υπομενού με τους αμυντικούς συνδιασμούς.<br>- Πάτα [Space] για να επεκτείνεις και τα δύο υπομενού.",     /*Popup visible in the "Preferences" tab when hovering the "HELP" link.*/
		FBCOMBOMOZTIP : "Οι χρήστες Firefox μπορούν επίσης να κάνουν δεξί-κλικ στις βασικές δραστηριότητες Μάχης οχυρού<br>στο αναπτυσσόμενο μενού για επέκταση των αντίστοιχων υπομενού.",     /*Popup visible in the "Preferences" tab when hovering the "HELP" link.*/
		SAFEMODE : " \u25B7 Ενεργοποίηση ασφαλής λειτουργίας",     /*Visible in the "Preferences" tab.*/
		SAFEMODEDESC : "Πιο αργή επεξεργασία υπολογισμού, αλλά χωρίς να κολλάει ή να παγώνει ο περιηγητής.",     /*Popup visible in the "Preferences" tab.*/
		SAFEMODEFBEXCL : "Μην το εκτελείς σε ασφαλή λειτουργία όταν χρησιμοποιείς τις χειροκίνητες ρυθμίσεις Μάχης οχυρού από πάνω.",     /*Popup visible in the "Preferences" tab.*/
		SAFEMODERUNNING : "Η ασφαλή λειτουργία εκτελείται...",     /*Displayed during the calculation in safe mode. Also visible in a prompt box when Safemode calculation is running and when user try to refresh/open/close the inventory.*/
		SAFEMODERUNNINGDESC : ["Κατά την διάρκεια της διαδικασίας:", "- Μην κλείσεις ή ανανεώσεις τα αποθέματα σου.", "- Μην αγοράσεις ή πουλήσεις αντικείμενα.", "- Μην φορέσεις ή βγάλεις ένα αντικείμενο.", "- Μην αλλάξεις τις ικανότητές σου.", "Εντάξει, Θα προσέχω. Άσε με να δω τα αποθέματα μου τώρα..."],     /*Displayed during the calculation in safe mode.*/
		SAFEMODECOMPLETED : "Ασφαλή λειτουργία ολοκληρώθηκε!",     /*Green box message displayed at the end of the Safe mode process. Also visible in the blinking browser tab.*/
		ACTIVITIES : "Δραστηριότητες",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		ITEMS : "Αντικείμενα",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		ITEMSETSCOMBI : "Συνδυασμοί σετ εξοπλισμού",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		TESTSRUN : "Αριθμός δοκιμών που πραγματοποιήθηκαν.",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		CALCTIME : "Χρόνος υπολογισμού",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		NOJOBSAFFECTED : "Οι αλλαγές δεν επηρέασαν καμία τωρινή δραστηριότητα.",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done with 0 job modified.*/
		AREYOUSURE : "Είσαι σίγουρος ότι θες να το κάνεις αυτό;",     /*Visible in a prompt box when Safemode calculation is running and when user try to refresh/open/close the inventory.*/
};