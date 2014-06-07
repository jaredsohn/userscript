// ==UserScript==
// @name            Language pack - Sample - English
// @description     Library for The-West - TW Pro+ [SOM] (http://userscripts.org/scripts/show/92414)
// @version         3.0.0.4
// @exclude         *
// ==/UserScript==

twpro_lp_custom = {
	info: ['Zebx', 'mailto:zyphir.randrott@gmail.com', 4343, '.w1.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Szerzők',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Fordító',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'Szkript deaktiválva: a The-West kódjában történt változás miatt frissíteni kell a szkriptet',     /*The script can be disabled due to source code changes by The-West devs. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Rendezés <b>Név</b> alapján',     /*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Rendezés <b>Tapasztalat</b> alapján',     /*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Rendezés <b>Fizetés</b> alapján',     /*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Rendezés <b>Szerencse</b> alapján',     /*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Rendezés <b>Munka sorrend</b> alapján',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Rendezés <b>Veszély</b> alapján',     /*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Rendezés <b>Munkapont</b> alapján',     /*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: "Nem végezhető munkák elrejtése",     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Csak a Legjobb öltözéket mutassa a kiválasztott tevékenységhez',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Válassz tevékenységet...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'értékek számolása, várj...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Felszerelés statisztika',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Eladási érték',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Tárgyak',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Termékek',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Teljes',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Mennyiség',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'MP',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: ' \u25B7 Építkezés',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Találati pontok összesen',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Adatok számítása...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Átalakítás',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Kombinált termékeladás...',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Kiválasztottak eladása',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Valóban el szeretnél adni %1 darab tárgyat?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Eladás folyamatban...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'A kiválaszott tárgyakat sikeresen eladtad.',     /*This text is displayed after a multi-sale*/
		NONESELECTED: 'Legalább egy tárgyat ki kell választanod!!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Munkarangsor beállítása',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Keresés a felszerelésben',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'A(z) %1 keresése nem hozott eredményt.%2Összes felszerelés mutatása%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Csak a Legjobb öltözékek mutatásának kikapcsolása.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Keress a felszerelésedben. Használhatod ezeket a karaktereket (a "*" tetszőleges számú karaktert helyettesít, ? egy karaktert helyettesít)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: ' \u25B7 Párbaj - Lőfegyver (Támadó)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: ' \u25B7 Párbaj - Lőfegyver (Védekező)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: ' \u25B7 Ütőfegyveres párbajos',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: ' \u25B7 Erődharc (támadó)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: ' \u25B7 Erődharc (védekező)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Üzenet a résztvevőknek',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Címzettek száma',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: '|Tevékenységek & Ruhaszettek|',     /*This text is shown as a tab in the TW Pro settings window*/
		CONFIRM: 'Mentés',     /*The button for confirming/ saving changes in the "Activities & Itemsets Management" tab*/
		HIDEJOBDESC: 'A munkákat itt lehet deaktiválni. Jelöld meg azokat a tevékenységeket amik számodra nem fontosak, küld át jobb oldalra és mentsd, ezután ezekkel nem számol.',     /*The description for the "Activities & Itemsets Management" tab*/
		SHOWN: 'Szükségesek',     /*Displayed ahead the selection field for activities that are currently enabled*/
		HIDDEN: 'Szükségtelenek',     /*Displayed ahead the selection field for activities that are currently disabled*/
		NOEQUIP: "Felszerelés nélkül",     /*Visible in the "Activities & Itemsets Management" tab. Popup displayed in the activities list.*/
		BESTEQUIP: "A Legjobb öltözékeddel",     /*Visible in the "Activities & Itemsets Management" tab. Popup displayed in the activities list.*/
		SETTINGSSAVED: 'A TW PRO beállítások alkalmazása sikeresen megtörtént!',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab, this message is displayed*/
		SETTINGSSAVEDSESSION: 'A TW PRO beállítások alkalmazása sikeresen megtörtént! (csak erre az alkalomra)',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Végleges mentés.',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Activities & Itemsets Management" tab. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'Ezt a szettet nem viselhetedt, vagy ez a szett nincs hatással a tevékenységek számításaira.',     /*This text is displayed when hovering over an item set at the "Activities & Itemsets Management" tab for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Deaktiváld a szetteket a gyorsabb számítások érdekében. A speciális vagy túl magas követelményekkel rendelkező szettek alapból deaktiválva vannak.',     /*The description displayed ahead the settings for itemsets at the "Activities & Itemsets Management" tab*/
		CUSTOMNAME: 'Add meg a kívánt nevet a tevékenységnek',     /*Visible in the "Activities & Itemsets Management" tab.This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity.*/
		CUSTOMCALCULATION: 'Adj meg egy valós TW PRO számítást itt.',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Activities & Itemsets Management" tab*/
		CUSTOMENABLED: 'Pipáld ki ezt a dobozt a tevékenység aktiválásához',     /*This button is visible in the "Activities & Itemsets Management" tab. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: 'Új',     /*Visible in the "Activities & Itemsets Management" tab.This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: ' \u25B7 Sebesség',     /*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: ' \u25B7 Leggyorsabb életerő visszatöltés',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Szettek",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Bónusz %1 szett elemmel',     /*Displayed in Setinfo window*/
		LABORPOINTS: 'Munkapont',     /*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'Ez a szám mutatja, hogy számítás közben a szettnek hány elemét veszi figyelembe a szkript az adott számításnál.',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Regeneráció',     /*__ % Regeneration with Sleepyhead items*/
		LUCK: 'Szerencse %+',     /*__ % luck with Holiday set items*/
		PRAYING: 'Ima',     /*6 Sleepyhead items gives +1 Praying*/
		NOITEMSETS: "Nem rendelkezel egy elemmel sem a szettből",     /*Displayed in the vertical Set filters*/
		AVERAGEDAMAGE: "átlagos sebzés",     /*Displayed on every weapons*/
		PREFERENCES: "Személyes beállítások|",     /*This text is shown as a tab in the TW Pro settings window*/
		DEFAULTSORTING: " \u25B7 Alap rendezés",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITY: "Életerő pontok fontossága",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITYZERO: "Semmi",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYLOW: "Kevés",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYMEDIUM: "Közepes",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYHIGH: "Magas",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYAUTO: "Auto",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBBATTLEUNIT: "Harc egység típusod",     /*Visible in the "Preferences" tab.*/
		FBBATTLEUNITSKIRMISHER: "Előcsatározó (kitérés) | Frontvonal",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITLINEINFANTRYMAN: "Sorgyalogos (kiegyensúlyozott) | Középvonal",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITMARKSMAN: "Mesterlövész (célzás) | Hátsó védvonal",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBTAGS : [["0", "1", "2", "3", "@"], ["D", "P", "A"]],     /*Visible in the dropdown menu, the item popups at merchants and the "Activities & Itemsets Management" tab. Tags representing the different combinations possible for "Health points priority" & "Battle unit type". Only 1 character allowed for each parameter. Order must be respected as listed above.*/
		DMGMIN: "Min",     /*Abbreviation for Minimum. Refers to the minimum damage of a weapon. Visible on weapon popups.*/
		DMGMAX: "Max",     /*Abbreviation for Maximum. Refers to the maximum damage of a weapon. Visible on weapon popups.*/
		DMGAVG: "Átlag",     /*Abbreviation for Average. Refers to the average damage of a weapon. Visible on weapon popups.*/
		CHATWHISPER: "* Privát suttogás *\n\nÍrd be a játékos nevét",     /*Visible when clicking the corresponding button in the Chat box.*/
		CHATCOLOR: "* Más szín (000-999) *\n\nÚrj be egy színkódot",     /*Visible when clicking the corresponding button in the Chat box.*/
		USEFULITEMS : "Keretezzen be minden tárgyat ami hasznos az általam kiválasztott tevékenységekhez",     /*Visible near the backpack. Displayed when calculations has been run and none activity is selected.*/
		USEFULITEMSPOPUP : " \u25B7 Doboz | Kiemelés és részletek",     /*Visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
		USEFULITEMSPOPUPDESC : "Minden hasznos tárgy mutassa a tevékenységekre adott bónuszait (a folyamat kissé tovább tart majd).",     /*Popup visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
		SHOWALLJOBS : " \u25B7 Mutasson minden munkát a térképen",     /*Visible in the "Preferences" tab.*/
		SHOWALLJOBSDESC : "Az ablak frissítése után fog csak megjelenni (F5)",     /*Popup visible in the "Preferences" tab.*/
		COLLECTORMODE : " \u25B7 Gyűjtő mód",     /*Visible in the "Preferences" tab.*/
		COLLECTORMODEDESC : "Items at merchants will be highlighted in blue if you don't own them yet.",     /*Popup visible in the "Preferences" tab.*/
		HELP : "HELP",     /*Visible in the "Preferences" tab.*/
		WEBSTORAGEQUOTAEXCEEDED : "WebTárhely limited túllépve!\n\n- A jelenlegi adataid befejezetlen lesz.\n- A gyorsítótár funkció elérhetetlenné vált automatikusan.\n- Kérlek ürítsd ki a böngésződ gyorsítótárát pár karakterednek ezen a szerveren (.hu), vagy növeld a LocalStorage vagyis helyi tárolás felső limitedet. (csak Firefox vagy Opera).",     /*Alert box displayed when WebStorage is full.*/
		CACHEGENERATE : "Gyorsítótár alkotása...",     /*Visible in the inventory dropdown menu and in the prompt box for generating cache.*/
		CACHEFORCEOK : "Változások elvetése.",    /*Visible in the prompt box for generating cache when items changes are detected.*/
		CACHEFORCEOKDESC : "Gyorsítótár állapotának erőltetett elfogadása (OK), a változások miatt (valószínűleg) kellő számítások elvégzése nélkül.",    /*Popup visible in the prompt box for generating cache when items changes are detected.*/
		CACHEGENERATENOW : "Akarsz egy új gyorsítótárat generálni?",     /*Visible in the prompt box for generating cache.*/
		CACHEINVENTORYCHANGES : "Felszerelés változások észlelve.",     /*Popup visible on the inventory cache button.*/
		CACHEGENERATECLICK : "Kattints az új gyorsítótár létrehozásához.",     /*Popup visible on the inventory cache button when items or skills changes are detected.*/
		CACHENEWITEMS : "Új elemek",     /*Popup visible on the inventory cache button when items changes are detected.*/
		CACHEDELETEDITEMS : "Törölt elemek",     /*Popup visible on the inventory cache button when items changes are detected.*/
		CACHESKILLSCHANGES : "Észlelt változások a pontozásban",     /*Popup visible on the inventory cache button when skills changes are detected.*/
		CACHEJOBSAFFECTED : "Tevékenységeket érintő változások",     /*Popup visible on the inventory cache button when skills changes are detected.*/
		CACHEISEMPTY : "A gyorsítótár üres.",     /*Popup visible on the inventory cache button.*/
		CACHEINITIALIZE : "Kattints ide a kezdéshez.",     /*Popup visible on the inventory cache button when cache is empty.*/
		CACHEOK : "A gyórsítótár OK.",     /*Popup visible on the inventory cache button.*/
		CACHEREWRITE : "Ha szükséges, még mindig átírhatod az adataid ha ide kattintasz.",     /*Popup visible on the inventory cache button when cache is ok.*/
		CACHEEMPTYING : "A gyorsítótár ürítése folyamatban...",     /*Popup visible on the inventory cache button.*/
		CACHENORMALMODE : "A TW Pro normál állapotba kerül a folyamat során.",     /*Popup visible on the inventory cache button when cache is emptying.*/
		CACHEDISABLED : "Gyorsítótár nincs engedélyezve.",     /*Popup visible on the inventory cache button.*/
		CACHEOPENSETTINGS : "Nyisd meg a TW Pro Beállításokat hogy engedélyezd.",     /*Popup visible on the inventory cache button when cache is disabled.*/
		CACHENEWJOBDETECTED : "Új munka észlelve: %1<br>Alkosd újra a gyorsítótárat az adatbázisod frissítéséhez.",     /*Red box message displayed when a new job is added in the game.*/
		CACHEENABLE : " \u25B7 TW Pro gyorsítótár engedélyezése",     /*Visible in the "Preferences" tab.*/
		CACHEINDEXEDDBNOT : "Az IndexedDB megoldást nem támogatja a böngésződ.",     /*Alert box displayed when IndexedDB is selected but not supported.*/
		CACHEINDEXEDDBDESC : "Ultra gyors feldolgozás. Firefox 4+ és Chrome 11+ böngészőkhöz ajánlott",     /*Visible in the "Preferences" tab.*/
		CACHECOMPATIBILITY : "Kompatibilitási infók",     /*Visible in the "Preferences" tab.*/
		CACHEQUOTAS : "Értékhatár infók",     /*Visible in the "Preferences" tab.*/
		CACHEQUOTASDESC : "<b>Kattints az 'értékhatár információkra'(külső linkek angolul) hogy megtudd a böngésződ WebStorage (HelyiTárolás) határait.<br>"
				  +"<br>hogyan növelheted a LocalStorage határkorlátozásaidat??</b><br>"
				  +"<b>- Firefox:</b><br>"
				  +"Írd be 'about:config' a címsorba ékezet nélkül, okézd le majd keress rá a 'dom.storage.default_quota' opcióra.<br>"
				  +"Ez az érték kilobyteban értendő, módosíthatod. A tárolási hely meg van osztva az azonos végződésű szervereknél (.hu),<br>"
				  +"Körülbelül 1500 kB szükséges karakterenként minden szervercsoportra.<br>"
				  +"<b>- Chrome:</b><br>"
				  +"Nem módosítható a határérték.<br>"
				  +"<b>- Opera:</b><br>"
				  +"Alapból megjelenik egy értesítés hogy növeld a határértéket amint szükséges. Habár úgy is tudod<br>"
				  +"ha beírod 'opera:webstorage' ékezetek nélkül a címsorba, enter, majd minden domain számára beállítod manuálisan.<br>"
				  +"Az érték kilobyteban értendő. A tárhely világonként értendő (subdomain vagyis csak ha multizol akkor kell több xD), körülbelül 3000 kB <br>"
				  +"karakterenként azonos világon.<br>"
				  +"<b>- Safari:</b><br>"
				  +"Nem módosítható a határérték.",     /*Popup visible in the "Preferences" tab when hovering the "quotas info" link.*/
		CACHEEMPTY : "TW Pro gyorsítótár ürítése.",     /*Popup visible in the "Preferences" tab.*/
		CACHEEMPTYDESC : "Kimentés segítő eszköz. Főleg inkonszisztens adatoknál szükséges.",     /*Popup visible in the "Preferences" tab.*/
		CACHEWEBSTORAGEDESC : "Gyors feldolgozás. A legtöbb jelenlegi böngésző támogatja de gondjaid lehetnek a határérték limitációkkal.",     /*Visible in the "Preferences" tab.*/
		CACHEEMPTYNOW : "Ki akarod most üríteni ezt a gyorsítótárat?",     /*Visible in the prompt box displayed when user wants to delete the cache.*/
		CACHERECORDS : "Feljegyzések",     /*Visible in the prompt box displayed when user wants to delete the cache.*/
		CACHEEMPTIED : "Gyorsítótár kiürítve!",     /*Message displayed when user has deleted the cache.*/
		CACHERECORDSDELETED : "Feljegyzések törölve.",     /*Message displayed when user has deleted the cache.*/
		CACHEEMPTYSLOWDESC : "A folyamat alatt akár tovább is játszhatsz.",     /*Popup visible in the prompt box displayed when user wants to delete the Webstorage cache. Also visible as popup on the Safemode checkbox, in the "Preferences" tab.*/
		CACHEEMPTYFASTDESC : "Gyorsabb de a böngésző lelassulhat a folyamat során.",     /*Popup visible in the prompt box displayed when user wants to delete the Webstorage cache.*/
		CACHEFASTMODE : "Gyors üzemmód",     /*Visible in the prompt box displayed when user wants to delete the Webstorage cache.*/
		NORMALMODE : "Normál üzemmód",     /*Visible in the prompt box displayed when user wants to delete the Webstorage cache. Also visible in the "Preferences" tab for the "Split fortbattle combinations" feature*/
		FBCOMBOFAVORITE : "Kedvenc",     /*Displayed in the inventory dropdown menu when the "Split fortbattle combinations" feature is enabled AND in Submenu mode.*/
		FBCOMBOGENERATE : "Az összes Erődharc kombináció legenerálása",     /*Visible in the "Preferences" tab.*/
		FBCOMBODESC : "Ez még 30 tevékenységgel bővíti a lenyíló menüdet, de ezáltal innen is kiválasztható lesz: ",     /*Visible in the "Preferences" tab.*/
		FBCOMBONORMALDESC : "A kombinációkat normál tevékenységként mutatja a lenyíló ablakban.",     /*Visible in the "Preferences" tab.*/
		FBCOMBOSUBMENUS : "Almenü-mód",     /*Visible in the "Preferences" tab.*/
		FBCOMBOSUBMENUSDESC : "A kombinációkat az alap Erődharc tevékenységek almenüjeként mutatja.",     /*Visible in the "Preferences" tab.*/
		FBCOMBOHELPDESC : "<b>Ha nyitva a lenyíló menü:</b><br>- Nyomd meg ezt: [1] hogy megjelenjen a Támadási kombinációk almenü.<br>- Nyomd meg ezt: [2] hogy megjelenjen a Védelmi kombinációk almenü.<br>- Nyomd meg ezt: [Space] hogy mindkettő megjelenjen.",     /*Popup visible in the "Preferences" tab when hovering the "HELP" link.*/
		FBCOMBOMOZTIP : "Firefox users may also right-click the main Fortbattle activities<br>in the dropdown menu to expand the corresponding submenus.",     /*Popup visible in the "Preferences" tab when hovering the "HELP" link.*/
		SAFEMODE : " \u25B7 Biztonságos üzemmód",     /*Visible in the "Preferences" tab.*/
		SAFEMODEDESC : "Lassabb számolási eljárás-, fagyás- és összeomlás ellen biztosított.",     /*Popup visible in the "Preferences" tab.*/
		SAFEMODEFBEXCL : "Ne használja a Biztonságos módot amikor a manuálisan beállított Erődharc preferencia használatban van.",     /*Popup visible in the "Preferences" tab.*/
		SAFEMODERUNNING : "Futtatás Biztonsági módban...",     /*Displayed during the calculation in safe mode. Also visible in a prompt box when Safemode calculation is running and when user try to refresh/open/close the inventory.*/
		SAFEMODERUNNINGDESC : ["A folyamat során:", "- Ne zárd be és ne frissítsd a felszerelés ablakot.", "- Ne végy és ne adj el tárgyakat.", "- Ne öltöztesd vagy ne vetkőztesd a karaktert.", "- NE változtasd a pontozásod.", "OK, elolvastam és megértettem. Hadd lássam a felszerelésem most..."],     /*Displayed during the calculation in safe mode.*/
		SAFEMODECOMPLETED : "A Biztonsági üzemmód befejeződött!",     /*Green box message displayed at the end of the Safe mode process. Also visible in the blinking browser tab.*/
		ACTIVITIES : "Tevékenységek",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		ITEMS : "Tárgyak",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		ITEMSETSCOMBI : "Ruhaösszeállítás kombinációk",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		TESTSRUN : "Végrehajtott esetek száma.",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		CALCTIME : "Számítás ideje:",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		AREYOUSURE : "Tényleg ezt akarod tenni a figyelmeztetés ellenére?",     /*Visible in a prompt box when Safemode calculation is running and when user try to refresh/open/close the inventory.*/
};