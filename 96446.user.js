// ==UserScript==
// @name            Language pack - Sample - English
// @description     Library for The-West - TW Pro+ [SOM] (http://userscripts.org/scripts/show/92414)
// @version         3.0.0.4
// @exclude         *
// ==/UserScript==

twpro_lp_custom = {
	info: ['perusul', 'mailto:alx.ionescu@yahoo.com', 4343, '.ro2.ro9.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Autori',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Translator',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'Script dezactivat: un update al scriptului este necesar datorita schimbarilor din The-West',     /*The script can be disabled due to source code changes by The-West devs. If disabled, this text is displayed in the footer*/
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
		HIDEJOBDESC: 'Jobs can be disabled here. Mark all activities which should not be calculated automatically, and click Confirm.',     /*The description for the "Activities & Itemsets Management" tab*/
		SHOWN: 'Enabled',     /*Displayed ahead the selection field for activities that are currently enabled*/
		HIDDEN: 'Disabled',     /*Displayed ahead the selection field for activities that are currently disabled*/
		NOEQUIP: "With no equipment",     /*Visible in the "Activities & Itemsets Management" tab. Popup displayed in the activities list.*/
		BESTEQUIP: "With your best equipment",     /*Visible in the "Activities & Itemsets Management" tab. Popup displayed in the activities list.*/
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
		FBTAGS : [["0", "1", "2", "3", "@"], ["D", "P", "A"]],     /*Visible in the dropdown menu, the item popups at merchants and the "Activities & Itemsets Management" tab. Tags representing the different combinations possible for "Health points priority" & "Battle unit type". Only 1 character allowed for each parameter. Order must be respected as listed above.*/
		DMGMIN: "Min",     /*Abbreviation for Minimum. Refers to the minimum damage of a weapon. Visible on weapon popups.*/
		DMGMAX: "Max",     /*Abbreviation for Maximum. Refers to the maximum damage of a weapon. Visible on weapon popups.*/
		DMGAVG: "Avg",     /*Abbreviation for Average. Refers to the average damage of a weapon. Visible on weapon popups.*/
		CHATWHISPER: "* Whisper *\n\nEnter a player name",     /*Visible when clicking the corresponding button in the Chat box.*/
		CHATCOLOR: "* Custom color (000-999) *\n\nEnter a color code",     /*Visible when clicking the corresponding button in the Chat box.*/
		USEFULITEMS : "Highlight every items that are useful for my enabled activities",     /*Visible near the backpack. Displayed when calculations has been run and none activity is selected.*/
		USEFULITEMSPOPUP : " \u25B7 Box | Highlighting with details",     /*Visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
		USEFULITEMSPOPUPDESC : "Bonuses by activities will be displayed on each useful item (process is a little longer).",     /*Popup visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
		SHOWALLJOBS : " \u25B7 Show all jobs on the map",     /*Visible in the "Preferences" tab.*/
		SHOWALLJOBSDESC : "Will be active after refresh (F5)",     /*Popup visible in the "Preferences" tab.*/
		COLLECTORMODE : " \u25B7 Collector mode",     /*Visible in the "Preferences" tab.*/
		COLLECTORMODEDESC : "Items at merchants will be highlighted in blue if you don't own them yet.",     /*Popup visible in the "Preferences" tab.*/
		HELP : "HELP",     /*Visible in the "Preferences" tab.*/
		WEBSTORAGEQUOTAEXCEEDED : "WebStorage Quota exceeded!\n\n- Your current data will be incomplete.\n- Cache feature has been disabled automatically.\n- Please empty the cache of some accounts on this server, or increase your LocalStorage quota limits (only possible with Firefox and Opera).",     /*Alert box displayed when WebStorage is full.*/
		CACHEGENERATE : "Generate cache...",     /*Visible in the inventory dropdown menu and in the prompt box for generating cache.*/
		CACHEFORCEOK : "Discard the changes detected.",    /*Visible in the prompt box for generating cache when items changes are detected.*/
		CACHEFORCEOKDESC : "Force cache status to OK, without doing the calculations.",    /*Popup visible in the prompt box for generating cache when items changes are detected.*/
		CACHEGENERATENOW : "Do you want to generate a new cache now?",     /*Visible in the prompt box for generating cache.*/
		CACHEINVENTORYCHANGES : "Inventory changes detected.",     /*Popup visible on the inventory cache button.*/
		CACHEGENERATECLICK : "Click to generate a new cache.",     /*Popup visible on the inventory cache button when items or skills changes are detected.*/
		CACHENEWITEMS : "New items",     /*Popup visible on the inventory cache button when items changes are detected.*/
		CACHEDELETEDITEMS : "Deleted items",     /*Popup visible on the inventory cache button when items changes are detected.*/
		CACHESKILLSCHANGES : "Skills changes detected.",     /*Popup visible on the inventory cache button when skills changes are detected.*/
		CACHEJOBSAFFECTED : "Activities affected",     /*Popup visible on the inventory cache button when skills changes are detected.*/
		CACHEISEMPTY : "Cache is empty.",     /*Popup visible on the inventory cache button.*/
		CACHEINITIALIZE : "Click here to initialize.",     /*Popup visible on the inventory cache button when cache is empty.*/
		CACHEOK : "Cache OK.",     /*Popup visible on the inventory cache button.*/
		CACHEREWRITE : "If needed, you can still rewrite data by clicking here.",     /*Popup visible on the inventory cache button when cache is ok.*/
		CACHEEMPTYING : "Cache is emptying...",     /*Popup visible on the inventory cache button.*/
		CACHENORMALMODE : "TW Pro is in normal mode during the process.",     /*Popup visible on the inventory cache button when cache is emptying.*/
		CACHEDISABLED : "Cache disabled.",     /*Popup visible on the inventory cache button.*/
		CACHEOPENSETTINGS : "Open the TW Pro Settings to enable.",     /*Popup visible on the inventory cache button when cache is disabled.*/
		CACHENEWJOBDETECTED : "New job detected: %1<br>Regenerate the cache to update your database.",     /*Red box message displayed when a new job is added in the game.*/
		CACHEENABLE : " \u25B7 Enable TW Pro cache",     /*Visible in the "Preferences" tab.*/
		CACHEINDEXEDDBNOT : "IndexedDB is not supported by your browser.",     /*Alert box displayed when IndexedDB is selected but not supported.*/
		CACHEINDEXEDDBDESC : "Ultra fast processing. Recommended for Firefox 4+ and Chrome 11+.",     /*Visible in the "Preferences" tab.*/
		CACHECOMPATIBILITY : "Compatibility infos",     /*Visible in the "Preferences" tab.*/
		CACHEQUOTAS : "Quotas infos",     /*Visible in the "Preferences" tab.*/
		CACHEQUOTASDESC : "<b>Click on 'Quotas infos' to know your browser WebStorage (LocalStorage) limits.<br>"
				  +"<br>How to increase your LocalStorage limits?</b><br>"
				  +"<b>- Firefox:</b><br>"
				  +"Type 'about:config' in your address bar and search for the 'dom.storage.default_quota' option.<br>"
				  +"This value is in kilobytes, you can change it. Storage space is shared by language server,<br>"
				  +"you will need around 1500 kB per account on a same server.<br>"
				  +"<b>- Chrome:</b><br>"
				  +"It is not possible to adjust quotas.<br>"
				  +"<b>- Opera:</b><br>"
				  +"By default, your browser will prompt you to increase the limits when necessary. However you can<br>"
				  +"type 'opera:webstorage' in your address bar and change the settings manually for each domain.<br>"
				  +"Value is in kilobytes.Storage is shared by world (subdomain), you will need around 3000 kB<br>"
				  +"per account on a same world.<br>"
				  +"<b>- Safari:</b><br>"
				  +"It is not possible to adjust quotas.",     /*Popup visible in the "Preferences" tab when hovering the "quotas info" link.*/
		CACHEEMPTY : "Empty TW Pro cache.",     /*Popup visible in the "Preferences" tab.*/
		CACHEEMPTYDESC : "Rescue tool. To be used mainly in case of data inconsistency.",     /*Popup visible in the "Preferences" tab.*/
		CACHEWEBSTORAGEDESC : "Fast processing. Supported by most current browsers but may be subject to storage quota limits.",     /*Visible in the "Preferences" tab.*/
		CACHEEMPTYNOW : "Do you want to empty this cache now?",     /*Visible in the prompt box displayed when user wants to delete the cache.*/
		CACHERECORDS : "records",     /*Visible in the prompt box displayed when user wants to delete the cache.*/
		CACHEEMPTIED : "Cache emptied!",     /*Message displayed when user has deleted the cache.*/
		CACHERECORDSDELETED : "records deleted.",     /*Message displayed when user has deleted the cache.*/
		CACHEEMPTYSLOWDESC : "You can still play during the process.",     /*Popup visible in the prompt box displayed when user wants to delete the Webstorage cache. Also visible as popup on the Safemode checkbox, in the "Preferences" tab.*/
		CACHEEMPTYFASTDESC : "Faster but browser may hang during the process.",     /*Popup visible in the prompt box displayed when user wants to delete the Webstorage cache.*/
		CACHEFASTMODE : "Fast mode",     /*Visible in the prompt box displayed when user wants to delete the Webstorage cache.*/
		NORMALMODE : "Normal mode",     /*Visible in the prompt box displayed when user wants to delete the Webstorage cache. Also visible in the "Preferences" tab for the "Split fortbattle combinations" feature*/
		FBCOMBOFAVORITE : "Favorite",     /*Displayed in the inventory dropdown menu when the "Split fortbattle combinations" feature is enabled AND in Submenu mode.*/
		FBCOMBOGENERATE : "Generate all Fortbattle combinations",     /*Visible in the "Preferences" tab.*/
		FBCOMBODESC : "This will add 30 activities to your dropdown menu, but you will then be able to manage them in the tab",     /*Visible in the "Preferences" tab.*/
		FBCOMBONORMALDESC : "Displays the combinations as normal activities in the dropdown menu.",     /*Visible in the "Preferences" tab.*/
		FBCOMBOSUBMENUS : "Submenus mode",     /*Visible in the "Preferences" tab.*/
		FBCOMBOSUBMENUSDESC : "Displays the combinations as submenus of the main Fortbattle activities.",     /*Visible in the "Preferences" tab.*/
		FBCOMBOHELPDESC : "<b>When your dropdown menu is open:</b><br>- Hit [1] to expand the Attacking combinations submenu.<br>- Hit [2] to expand the Defending combinations submenu.<br>- Hit [Space] to expand both submenus.",     /*Popup visible in the "Preferences" tab when hovering the "HELP" link.*/
		FBCOMBOMOZTIP : "Firefox users may also right-click the main Fortbattle activities<br>in the dropdown menu to expand the corresponding submenus.",     /*Popup visible in the "Preferences" tab when hovering the "HELP" link.*/
		SAFEMODE : " \u25B7 Enable Safe mode",     /*Visible in the "Preferences" tab.*/
		SAFEMODEDESC : "Slower calculation process, but hang, freeze and crash proof for your browser.",     /*Popup visible in the "Preferences" tab.*/
		SAFEMODEFBEXCL : "Do not run in Safe mode when using the manual Fortbattle settings above.",     /*Popup visible in the "Preferences" tab.*/
		SAFEMODERUNNING : "Safe mode is running...",     /*Displayed during the calculation in safe mode. Also visible in a prompt box when Safemode calculation is running and when user try to refresh/open/close the inventory.*/
		SAFEMODERUNNINGDESC : ["During the process:", "- Do not close or refresh your inventory.", "- Do not buy or sell any item.", "- Do not dress or undress any item.", "- Do not make changes in your skills.", "OK, I will take care. Let me see my inventory now..."],     /*Displayed during the calculation in safe mode.*/
		SAFEMODECOMPLETED : "Safe mode completed!",     /*Green box message displayed at the end of the Safe mode process. Also visible in the blinking browser tab.*/
		ACTIVITIES : "Activities",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		ITEMS : "Items",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		ITEMSETSCOMBI : "Itemsets combinations",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		TESTSRUN : "Number of tests performed.",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		CALCTIME : "Calculation time",     /*Popup visible in the stats, at the top-left of the Inventory window, when calculations are done.*/
		AREYOUSURE : "Are you sure you want to do that?",     /*Visible in a prompt box when Safemode calculation is running and when user try to refresh/open/close the inventory.*/
};