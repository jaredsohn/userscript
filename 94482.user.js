// ==UserScript==
// @name            Language pack - Slovak
// @version         1.05
// @exclude         *
// ==/UserScript==

twpro_lp_custom = {
info: ['pato95', 'mailto:slarka.p@gmail.com', 49546, '.sk1.sk2.sk4.sk5.w1.public.beta.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
AUTHOR: 'Autori',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
TRANSLATOR: 'Prekladateľ',     /*Displayed in footer. Prepended the translator of the current game locale*/
TWPRO_DISABLED: 'Script vypnutý: potrebná aktualizácia scriptu z dôvodov zmien v zdrojovom kóde The West',     /*The script can be disabled due to source code changes by The-West devs. If disabled, this text is displayed in the footer*/
SORTBYNAME: 'Zoradiť podľa <b>mena</b>',     /*"Order activity list by name" button at the Inventory*/
SORTBYXP: 'Zoradiť podľa <b>skúseností</b>',     /*"Order activity list by experience" button at the Inventory*/
SORTBYWAGES: 'Zoradiť podľa <b>zárobkov</b>',     /*"Order activity list by wages" button at the Inventory*/
SORTBYLUCK: 'Zoradiť podľa <b>šťastia</b>',     /*"Order activity list by luck" button at the Inventory*/
SORTBYCOMB: 'Zoradiť podľa <b>pracovného skóre</b>',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
SORTBYDANGER: 'Zoradiť podľa <b>nebezpečenstva</b>',     /*"Order activity list by danger" button at the Inventory*/
SORTBYLABORP: 'Zoradiť podľa <b>pracovných bodov</b>',     /*"Order activity list by labor points" button at the Inventory*/
FILTERJOBS: "Skryť práce, ktoré nemôžem robiť",     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
FILTERCLOTHING: 'Len zobraziť najlepšie pracovné veci pre zvolenú prácu',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
CHOOSEJOB: 'Zvoľ si činnosť...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
CALCJOB: 'Počítam hodnoty, prosím, počkaj...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
INVENTSTATS: 'Štatistiky inventára',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
SELLVALUE: 'Predajná cena',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
OBJECTS: 'Predmety',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
PRODUCTS: 'Produkty',     /*Visible in the Inventory statistics tooltip. */
TOTAL: 'Spolu',     /*Visible in the Inventory statistics tooltip. */
QUANTITIES: 'Množstvá',     /*Visible in the Inventory statistics tooltip. */
LABORP: 'PB',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
CONSTRUCTION: ' \u25B7 Výstavba',     /*A special activity, constructing buildings in your town*/
HPTOTAL: 'Maximálne body zdravia',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
STARTCALC: 'Vypočítať hodnoty...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
CONVERT: 'Prerobiť',     /*A button in a duel report, used for exporting a duel to BBcodes*/
MULTISEL: 'Predať viacero vecí...',     /*A button in a town trader, enabling players to sell multiple items at once*/
SELL: 'Predať vybrané',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
CONFIRMSELL: 'Naozaj chceš predať %1 vecí?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
SELLING: 'Predávam...',     /*The value of the button "Sell selection" during a multi-sale*/
SALEDONE: 'Vybrané predmety boli predané.',     /*This text is displayed after a multi-sale*/
NONESELECTED: 'Musíš zvoliť aspoň jednu vec!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
JOBRANKSETTINGS: 'Nastavenia pracovného skóre',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
SEARCHINVENTORY: 'Prehľadávať inventár',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
NOSEARCHRESULT: 'Tvoje vyhľadávanie %1 nenašlo žiadne veci.%2Zobraziť všetky veci%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
DISABLEBESTFORJOB: 'Vypnúť skrývanie vecí, ktoré nie sú pre vybranú činnosť potrebné.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
SEARCHHELP: 'Prehľadávať inventár. Môžeš použiť zástupcov (* pre 0 alebo viac znakov, ? pre 1 znak)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
DUELSHOOTINGATT: ' \u25B7 Duelant - strelec (útočník)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
DUELSHOOTINGDEF: ' \u25B7 Duelant - strelec (obranca)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
DUELVIGOR: ' \u25B7 Ručný duelant',     /*A special activity for duel clothing used by resistance duellers*/
FORTATTACK: ' \u25B7 Boj o pevnosť (útočník)',     /*A special activity for attackers in fort battles*/
FORTDEFEND: ' \u25B7 Boj o pevnosť (obranca)',     /*A special activity for defenders in fort battles*/
FORTMESSAGE: 'Napísať správu účastníkom',     /*Displayed on Fortbattle page, to send a PM to all participants*/
FORTMESSAGERCP: 'Počet príjemcov',     /*Information displayed when you click on "Message to participants"*/
HIDEJOBS: 'Správa činností a súprav',     /*This text is shown as a tab in the TW Pro settings window*/
CONFIRM: 'Potvrdiť',     /*The button for confirming/ saving changes in the "Activities & Itemsets Management" tab*/
HIDEJOBDESC: 'Tu môžeš voliť, ktoré činnosti budú počítané. Zvoľ všetky činnosti, ktoré nemajú byť počítané a klikni na tlačidlo "Potvrdiť".',     /*The description for the "Activities & Itemsets Management" tab*/
SHOWN: 'Počítané',     /*Displayed ahead the selection field for activities that are currently shown*/
HIDDEN: 'Nepočítané',     /*Displayed ahead the selection field for activities that are currently hidden*/
SETTINGSSAVED: 'Nastavenia pre TWPro boli použité!',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab, this message is displayed*/
SETTINGSSAVEDSESSION: 'Nastavenia pre TWPro boli použité! (len pre túto reláciu)',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
PERSISTSETTINGS: 'Uložiť tieto nastavenia pre každú reláciu.',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Activities & Itemsets Management" tab. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
CANNOTWEAR: 'Túto súpravu buď nemôžeš nosiť alebo nie je podstatná pri výpočtoch činností.',     /*This text is displayed when hovering over an item set at the "Activities & Itemsets Management" tab for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
SETSETTINGS: 'Vypnúť počítanie so súpravami vecí pre rýchlejší výpočet. Súpravy so špeciálnymi požiadavkami sú vypnuté automaticky.',     /*The description displayed ahead the settings for itemsets at the "Activities & Itemsets Management" tab*/
CUSTOMNAME: 'Zadaj svoje meno pre zvolenú činnosť',     /*Visible in the "Activities & Itemsets Management" tab.This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity.*/
CUSTOMCALCULATION: 'Sem zadaj valídnu TWPro kalkuláciu.',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Activities & Itemsets Management" tab*/
CUSTOMENABLED: 'Zaškrtni toto políčko pre zobrazenie tejto činnosti',     /*This button is visible in the "Activities & Itemsets Management" tab. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
NEW: 'Nová činnosť',     /*Visible in the "Activities & Itemsets Management" tab.This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
SPEED: ' \u25B7 Rýchlosť',     /*A special activity, useful for travelling great distances and saving time*/
REGENERATION: ' \u25B7 Najrýchlejšie získanie bodov zdravia',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
SETSINFO: "Súpravy",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
WITHSETITEMS: 'Bonusy s %1 vecami',     /*Displayed in Setinfo window*/
LABORPOINTS: 'Pracovné body',     /*Labor points, displayed for sets. Example: +20 Labor points*/
USEFULITEM: 'Toto číslo ukazuje počet vecí, ktoré sú použité pri výpočtoch',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
PERCREGENERATION: 'Dopĺňanie bodov zdravia',     /*__ % Regeneration with Sleepyhead items*/
LUCK: 'šťastie',     /*__ % luck with Holiday set items*/
PRAYING: 'modlitba',     /*6 Sleepyhead items gives +1 Praying*/
NOITEMSETS: "Z tejto súpravy nevlastníš ani jednu vec. ",     /*Displayed in the vertical Set filters*/
AVERAGEDAMAGE: "Priemerné poškodenie",     /*Displayed on every weapons*/
PREFERENCES: "Nastavenia",     /*This text is shown as a tab in the TW Pro settings window*/
DEFAULTSORTING: " \u25B7 Predvolené zoraďovanie",     /*Visible in the "Preferences" tab.*/
FBHEALTHPRIORITY: "Priorita bodov zdravia",     /*Visible in the "Preferences" tab.*/
FBHEALTHPRIORITYZERO: "Žiadna",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
FBHEALTHPRIORITYLOW: "Malá",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
FBHEALTHPRIORITYMEDIUM: "Stredná",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
FBHEALTHPRIORITYHIGH: "Vysoká",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
FBHEALTHPRIORITYAUTO: "Automaticky",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
FBBATTLEUNIT: "Typ bojovníka",     /*Visible in the "Preferences" tab.*/
FBBATTLEUNITSKIRMISHER: "Pevnostný tank (uhýbanie) | Predná línia",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
FBBATTLEUNITLINEINFANTRYMAN: "Pešiak (stredný) | Stredná línia",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
FBBATTLEUNITMARKSMAN: "Ostreľovač (presnosť) | Zadná línia",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
DMGMIN: "Min",     /*Abbreviation for Minimum. Reters to the minimum damage of a weapon. Visible on weapon popups.*/
DMGMAX: "Max",     /*Abbreviation for Maximum. Reters to the maximum damage of a weapon. Visible on weapon popups.*/
DMGAVG: "Priemer",     /*Abbreviation for Average. Reters to the average damage of a weapon. Visible on weapon popups.*/
CHATWHISPER: "* Šepkať *\n\nZadaj meno hráča",     /*Visible when clicking the corresponding button in the Chat box.*/
CHATCOLOR: "* Vlastná farba (000-999) *\n\nZadaj kód farby",     /*Visible when clicking the corresponding button in the Chat box.*/
USEFULITEMS : "Zvýrazniť všetky veci, ktoré sú užitočné pre moje počítané činnosti", /*Visible near the backpack. Displayed when calculations has been run and none activity is selected.*/
USEFULITEMSPOPUP : " \u25B7 Box | Zvýrazňovanie s detailami",     /*Visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
};