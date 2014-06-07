// ==UserScript==
// @name            The West - TW Pro+ [SOM]
// @namespace       http://userscripts.org/scripts/show/92414
// @description     Script for The-West: TW Pro+ [SOM - Scripts-O-Maniacs] [Multilingual] (v3.1.0.7)
// @author          Nexton/Lekensteyn/Sandevil/Pedro Ramirez/Puli/aka Y./Danosaure/Zyphir Randrott
// @release         Zyphir Randrott
// @website         http://scripts-o-maniacs.leforum.eu
// @include         http://*.the-west.*/game.php*
// @include         http://*.the-west.*/forum.php*
// @include         http://userscripts.org/scripts/source/92414.meta.js*
// @include         http://userscripts.org/scripts/review/92414*
// @version         3.1.0.7
//
// @history         3.1.0.7|23/10/2011 Workaround regarding script loading too fast (Beta world issue).
// @history         3.1.0.6|22/10/2011 Collector Set fix (Bluep again).
// @history         3.1.0.5|20/10/2011 Quick fix for TW v1.33.1 (thx to Bluep again ;)).
// @history         3.1.0.4|11/10/2011 Quick fix on clickable reports in chat for TW v1.33.
// @history         3.1.0.3|10/10/2011 Forum smiley links improved.
// @history         3.1.0.2|08/10/2011 Collector Set hot fix (thx to Bluep for the code!).
// @history         3.1.0.1|25/09/2011 Forum smiley fix.
// @history         3.1.0.0|23/08/2011 Probably the final step regarding calculation process improvements. From now, updating the cache or changing settings (in Live mode & Cache mode) will only request to compute the affected activities.<br><b>Note:</b> Please <b>regenerate your cache</b> once after upgrading to this version.
// @history         3.1.0.0|23/08/2011 Improved error handling when a new job is added in the game (new jobs will be added in the red cache button).
// @history         3.1.0.0|23/08/2011 Health points for each job are now displayed in red when they are lower than your current HP (thx to Bluep for the idea).
// @history         3.1.0.0|23/08/2011 Bug fix regarding the cache button that was disappearing in special cases (Thx to Mariache320, Ren33 & Bluep for the numerous tests that helped me find this repeated bug).
// @history         3.1.0.0|23/08/2011 Bug fix when overwriting or updating IndexedDB cache in Chrome (was a Chrome bug actually).
// @history         3.1.0.0|23/08/2011 Storage space required when caching Fortbattle combinations has been reduced.
// @history         3.1.0.0|23/08/2011 Other various bug fixes & code improvements.
// @history         3.1.0.0|23/08/2011 Note for translators : language file updated. See the changes <a href="http://userscripts.org/scripts/versions/94133" target="_blank">here</a>
// @history         3.0.0.8|04/08/2011 Bug fix when the market is empty.
// @history         3.0.0.7|03/08/2011 Dancer's Set updated.
// @history         3.0.0.6|28/07/2011 Dancer & Indian's Sets updated for Beta worlds.
// @history         3.0.0.6|28/07/2011 Dancer's Set unlocked in the Itemsets manager since male characters can wear 2 items from this Set (don't forget to disable/enable this Set manually from now!)
// @history         3.0.0.5|20/07/2011 Improved error handling when a new job is added in the game.
// @history         3.0.0.4|19/07/2011 Added new job "Palisade bauen" for Amchitka server (beta2) (thx to Bluep & Darius II for the data).
// @history         3.0.0.4|19/07/2011 Error handling when a new job is added in the game.
// @history         3.0.0.4|19/07/2011 Cookies storage improved for users with a large number of accounts on the same server.
// @history         3.0.0.4|19/07/2011 Note for translators : language file updated. See the changes <a href="http://userscripts.org/scripts/versions/94133" target="_blank">here</a>
// @history         3.0.0.3|17/07/2011 Safe mode improved. Process will still run even if another browser tab is focused (with FF, it should even run faster in this case).
// @history         3.0.0.3|17/07/2011 Browser tab will now blink when Safe mode process is completed.
// @history         3.0.0.3|17/07/2011 Advanced item popup and item highlighting are working now in reports too.
// @history         3.0.0.3|17/07/2011 Activities which are not unlocked by the item are now shown in red in the merchant popups.
// @history         3.0.0.3|17/07/2011 Bug fix on Recipe highlighting in Collector mode.
// @history         3.0.0.3|17/07/2011 Live mode in/out inventory analysis improved (By "Live mode", I mean cache disabled).
// @history         3.0.0.3|17/07/2011 Minor fix on Fortbattle combinations (tags were not displayed correctly in the inventory popups on job selection).
// @history         3.0.0.3|17/07/2011 Some fixes for Firefox 3.6 users (Cache & Chat links).<br>However, I really recommend to upgrade to FF5, because 3.6 is really really slow. Moreover, TW Pro Cache & Safe mode won't run as smoothly as it should. To get a good experience on these new features, I really encourage you to use a recent browser (Firefox, Chrome, Opera, or even Safari).
// @history         3.0.0.3|17/07/2011 Note for translators : language file updated. See the changes <a href="http://userscripts.org/scripts/versions/94133" target="_blank">here</a>
// @history         3.0.0.2|09/07/2011 <b>New "Safe mode" feature.</b> Slower calculation process, but hang, freeze and crash proof for your browser!
// @history         3.0.0.2|09/07/2011 Added calculation stats in the inventory window.
// @history         3.0.0.2|09/07/2011 Added "Attributes" in custom job settings.
// @history         3.0.0.2|09/07/2011 New Set Items added for Beta worlds (thx to Bluep for the data).
// @history         3.0.0.2|09/07/2011 Chat colors and whisper compatibility improved (thanks to Danosaure for his work on the code).
// @history         3.0.0.2|09/07/2011 Cache status button improved (Inventory items you can wear after a level up will be now considered as new items. Therefore, these items will also switch the cache button to red).
// @history         3.0.0.2|09/07/2011 Added option to discard changes & force cache status to OK (green button).
// @history         3.0.0.2|09/07/2011 Pilgrims Sets unlocked in the Itemsets manager since we can wear 3 items from the Set of the opposite sex (don't forget to disable/enable these Sets manually from now!)
// @history         3.0.0.2|09/07/2011 Improved tags for the Fortbattle combinations.
// @history         3.0.0.2|09/07/2011 Some fixes on item highlighting at merchants.
// @history         3.0.0.2|09/07/2011 Bug fix on item popups at merchants when using cache (attributes on items were ignored in the bonus calculation).
// @history         3.0.0.2|09/07/2011 Job values updated on inventory window refresh when skills changes are detected by the cache.
// @history         3.0.0.2|09/07/2011 Fix on speed value accuracy for the Dueller class.
// @history         3.0.0.2|09/07/2011 Other various bug fixes & code improvements.
// @history         3.0.0.2|09/07/2011 <b>NOTE:</b> If you encounter problems with your TW Pro cache after upgrading to this version, try:<br>- to disable/enable the cache<br>- to empty the cache.
// @history         3.0.0.2|09/07/2011 Note for translators : language file updated. See the changes <a href="http://userscripts.org/scripts/versions/94133" target="_blank">here</a>
// @history         3.0.0.1|26/06/2011 Minor bug fix on cache status button (color not refreshing in a special case).
// @history         3.0.0.0|26/06/2011 <b>TW Pro+ version 3.0 introducing a new caching system.</b><br>Do not fear anymore to refresh your page, now you can! ;)
// @history         3.0.0.0|26/06/2011 But also:
// @history         3.0.0.0|26/06/2011 New "split fortbattle combinations" feature.
// @history         3.0.0.0|26/06/2011 Added "Collector mode".
// @history         3.0.0.0|26/06/2011 Added "Show all jobs on map" feature.
// @history         3.0.0.0|26/06/2011 Added cell coordinates in the minimap.
// @history         3.0.0.0|26/06/2011 Added health points information for every activities in the dropdown menu.
// @history         3.0.0.0|26/06/2011 Added highlighting and popup info in the activities management menus.<br>When calculations are done, the "Enabled" list is now sorted as your dropdown menu.
// @history         3.0.0.0|26/06/2011 Updated layout for the TW Pro settings windows.
// @history         3.0.0.0|26/06/2011 Items in the inventory are not higlighted anymore if you already wear them
// @history         3.0.0.0|26/06/2011 Fixed Sets filters for Opera
// @history         3.0.0.0|26/06/2011 Fix on fortbattle settings with zero-priority on health
// @history         3.0.0.0|26/06/2011 Tequila boom boom fix on regen HP ;)
// @history         3.0.0.0|26/06/2011 Second issue fixed when opening crafting page, using equipment manager & eating usable items.
// @history         3.0.0.0|26/06/2011 Bug fix on bag statistics popup
// @history         3.0.0.0|26/06/2011 Updater improved when userscript.org is down.
// @history         3.0.0.0|26/06/2011 Note for translators : language file updated. See the changes <a href="http://userscripts.org/scripts/versions/94133" target="_blank">here</a>
// @history         2.0.1.7 Updater updated for the next update :D
// @history         2.0.1.7 TW Pro+ 3.0 is coming soon (probably this weekend), so stay tuned...
// @history         2.0.1.6 Clickable reports conversion in the Chat
// @history         2.0.1.6 Forum BBCode bar updated + added smileys :)
// @history         2.0.1.6 PM BBCode bar removed (enabled natively in TW1.31)
// @history         2.0.1.6 Bug fix when opening crafting page, using equipment manager & eating usable items.
// @history         2.0.1.5 Quick fix for beta & german worlds (not really well tested, but I hope it works ^^).
// @history         2.0.1.4 Language pack fix for Firefox 4.
// @history         2.0.1.3 "Recept" items are now filtered (beta worlds only).
// @history         2.0.1.3 Added TW Times itemset.
// @history         2.0.1.2 New set items added. Sorry again for the late, I have some personal worries at the moment but it will get better soon. Many thanks to Bluep who provides me the new items code for an easy & quick copy/paste. I'm really not aware of the game's novelties for the moment, so it helps a lot ! ;)
// @history         2.0.1.1 Temporary fix for TW v1.31. It seems there is a new job available called "Pick Indigo", but not yet fully implemented in game. (Btw, sorry for the late, I was not available last week and I will be not available this week neither. I hope everything will still work fine so far ;))
// @history         2.0.1.0 Multisales feature is now available through the Trader too
// @history         2.0.1.0 Added "Total sales value" when using multisales
// @history         2.0.1.0 Support of Gender & Level requirements in merchants highlighting + new highlighting colors
// @history         2.0.1.0 Bug fix when using fortbattle settings
// @history         2.0.0.9 Highlighting with popup details is now possible with the new box (see the TW Pro settings)
// @history         2.0.0.9 Note for translators : language file updated. See the changes <a href="http://userscripts.org/scripts/versions/94133" target="_blank">here</a>
// @history         2.0.0.8 New feature: highlighting of useful items for every activities
// @history         2.0.0.8 Bugfix on merchants highlighting when 2 items have the same name in their inventories (However, be aware that a wrong item may be highlighted in the market instead of his twin, because I can't get around this issue easily at this location. Imo 2 items with the same name should never happen and should be fixed by Inno.)
// @history         2.0.0.8 Note for translators : language file updated. See the changes <a href="http://userscripts.org/scripts/versions/94133" target="_blank">here</a>
// @history         2.0.0.7 Exclusive Chat features especially made for TW Pro+ by aka Y. [SOM]
// @history         2.0.0.7 Note for translators : language file updated. See the changes <a href="http://userscripts.org/scripts/versions/94133" target="_blank">here</a>
// @history         2.0.0.6 Scrolling to Player or Town will keep now the mini-map opened if you pin it on.
// @history         2.0.0.5 Market highlighting fix for Chrome (Chrome doesn't like bold style in select menu ^^).
// @history         2.0.0.4 Highlighting of useful items in the merchants/market (depends on the selected activitiy OR runs on all activities if none is selected).<br>Tip: doublons are not highlighted in the trader/merchants, so the order in which you open the windows is important (I would recommend: Trader - Own Stores - Allied Stores - Foreign Stores).
// @history         2.0.0.4 Automatic refresh of all the opened merchant/market windows when you select another activity in TW Pro.
// @history         2.0.0.4 Bug fix & code optimization when changing weared items (will go faster)
// @history         2.0.0.3 Inventory & Merchants popup improvements (on items affected by a Set in calculations).
// @history         2.0.0.3 Weapons popup improvements (on fort battle & duel activities).
// @history         2.0.0.3 Hotel feature fixed for .ru servers (and maybe others) // Thx to Phago for reporting and town invitation
// @history         2.0.0.3 Note for translators : language file updated. See the changes <a href="http://userscripts.org/scripts/versions/94133" target="_blank">here</a>
// @history         2.0.0.2 Announcement:<br>This is not an update but just a message to tell you about a new script available: The <a href="http://userscripts.org/scripts/show/94811" target="_blank">Wardrobe script</a> revised and coded by Dun [SOM].<br>Works with Firefox & from now Chrome, specially made to be compatible with TW Pro+ and a really nice "Buffalo Bill" feature (surprise!).<br>(Note: Wardrobe script may be banned on some servers, enquire before using it).
// @history         2.0.0.1 Advanced item popup (with job bonuses) works now in the market too
// @history         2.0.0.0 A nice update ;)
// @history         2.0.0.0 Fortbattle calculations improved // Thx to Y. for the original idea and basic formulas & Tanes and others SOM members for beta tests and adjustments.
// @history         2.0.0.0 New tab with preferences in the TW Pro Settings window
// @history         2.0.0.0 Added HP priority settings in Fortbattle calculations
// @history         2.0.0.0 Added Battle unit type settings in Fortbattle calculations
// @history         2.0.0.0 Default sorting option
// @history         2.0.0.0 Added average damages on weapons
// @history         2.0.0.0 Automatic mini-map job selection improvements: unavailable jobs will be displayed now on both map & mini-map if you select them in TW Pro // Thx to Bluep for the idea & Puli for his nice script "Show All Jobs" ;)
// @history         2.0.0.0 Set filters buttons improved
// @history         2.0.0.0 Bugfix on Duel & Fort weapons suggestions
// @history         2.0.0.0 Corrections on Speed, Regen, Construction & Worker class xp values
// @history         2.0.0.0 Jobranking settings adjustment (gives less importance to LP's affected values, like Wage & Luck)
// @history         2.0.0.0 Some bug fixes & code improvements
// @history         2.0.0.0 New script version number structure (Chrome compatible)
// @history         2.0.0.0 Note for translators : language file updated. See the changes <a href="http://userscripts.org/scripts/versions/94133" target="_blank">here</a>
// @history         1.004n Compatibility with the new popup comparator system
// @history         1.004n Auto-updater corrections
// @history         1.004m The selected job is now always displayed first in the merchants pop-up list, even if he receives less bonus than other jobs.
// @history         1.004l Added temporary bug fix on telegrams for fr. worlds (until Inno fix this ^^)
// @history         1.004l Added automatic room selection in hotels (checks the best free room or the cheapest one)
// @history         1.004l Improved highlighting & compatibility between Set filters, Search box & Jobs list
// @history         1.004l New features & speed improvements, thanks to the Lekensteyn script.<br><span style="font-size: 10px;">Since Lekensteyn has done a really great job on optimization and calculation speed and because of the many new features he added, I really hesitated to pursue my TW Pro version.<br>However, as some people from the French community asked me to continue and as long as I get pleasure to do it, I will keep this version updated.<br>For these reasons I decided to import the major improvements from the Lekensteyn script in this release but I also decided to no longer provide included translations for languages other than English and French. (However, in case you want to continue using my version, I added a feature that lets you easily plug an external language pack. I will do a help page soon for custom language pack creation).<br>Finally, thanks again to Lekensteyn and I really invite you to visit his work at the following address: <a href="http://twpro.lekensteyn.nl/" target="_blank">Lekensteyn page</a></span>
// @history         1.004k Added Set filters
// @history         1.004k Inventory statistics improvements
// @history         1.004k Automatic updater is now Chrome compatible
// @history         1.004j Added Christmas Sled
// @history         1.004i Merry Christmas !
// @history         1.004i <img src="http://img703.imageshack.us/img703/8439/starontreeoutside065344.jpg">
// @history         1.004h Added Italian & Romanian language
// @history         1.004g TW version checker included in the script himself (From now, TW Pro FR 1.29 & Pro+ 1.30 can be both installed at the same time on all servers, so you don't need to tamper with script permissions during transition period)
// @history         1.004f Fixed level check on belts & pants
// @history         1.004f All values are now displayed and sorted in the job list, even if you can't do the job (use "hide jobs" for filtering)
// @history         1.004f Filter "Hide jobs I can't do" runs now instantly (calculation is not rerun anymore)
// @history         1.004f Added danger values and jobrank % in the job list
// @history         1.004f New color coding for the LP box
// @history         1.004e Some code improvements
// @history         1.004e Minor layout changes
// @history         1.004e Forum BBCode bar is back
// @history         1.004e Added Hungarian language
// @history         1.004d Added all job values (xp, wages, luck, danger) // I hope I didn't make any mistake
// @history         1.004d Sets work duration to maximum by default // Lekensteyn code, thx ;)
// @history         1.004c Chrome small fix (LP display box)
// @history         1.004b Greenhorn set added
// @history         1.004b Updated design for TW 1.30
// @history         1.004a Emergency release for TW 1.30 // It looks bad but it works ;)
// @history         1.003 Ajout d'une variable de traduction oubliée
// @history         1.002 Ajout du 6ème élément du Kit spécial Fêtes
// @history         1.002 Correction de l'affichage des apostrophes dans le menu déroulant
// @history         1.001 Correction de bugs sur les stats duels dans les profils
// @history         1.001 Repositionnement des "Niveaux d'importance" pour être compatible avec les scripts "Wardrobe" et "SortInvent"
// @history         1.001 Filtre du set Grincheux activable et désactibale à souhait
// @history         1.001 Ajout du Script Updater "PhasmaExMachina" (Firefox+GM uniquement)
// @history         1.000 Ajout traduction FR
// ==/UserScript==

var twpro_version = "3.1.0.7";

var url = window.location.href;
if (url.indexOf(".the-west.") != -1) {

  var myScript = document.createElement("script");
  myScript.type = "text/javascript";
  myScript.innerHTML = "var twpro_version = '"+twpro_version+"';";
  document.body.appendChild(myScript);

  if (localStorage.getItem("TWPro_LanguagePack") && decodeURIComponent(localStorage.getItem("TWPro_LanguagePack")) != "fr" && decodeURIComponent(localStorage.getItem("TWPro_LanguagePack")) != "http://fr"){
	  var myScript = document.createElement("script");
	  myScript.type = "text/javascript";
	  myScript.innerHTML = "var twpro_lp_custom_on = 'yes';";
	  document.body.appendChild(myScript);
	  try{
	  var myScript = document.createElement("script");
	  myScript.type = "text/javascript";
	  myScript.src = decodeURIComponent(localStorage.getItem("TWPro_LanguagePack"));
	  document.body.appendChild(myScript);
	  }catch(e){}
  }

(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){

	/////////////////////////////////////////////////////////
	// DÉCLARATION DES CONSTANTES
	/////////////////////////////////////////////////////////
	//MISE À JOUR
	var VERSION_SCRIPT 			= twpro_version ;
	var NUMERO_SCRIPT		= "92414" ;
	var NB_HISTORY			= 5 ;
	var MENU_maj			= "ZYPH_" + NUMERO_SCRIPT + "_MAJ" ;
	var DELTA_maj 			= 24 * 3600 ; // 24 h en s

window.addEvent ('domready', function(){if(typeof twpro_lp_custom_on != "undefined"){var i=0;function wait_twpro_lp_custom(){if(typeof twpro_lp_custom != "undefined"){check_TW_version()}else if(i<20){setTimeout(wait_twpro_lp_custom, 500);i++}else{check_TW_version()}};wait_twpro_lp_custom();}else{check_TW_version()}});
function check_TW_version() {
var url = window.location.href;
if (url.indexOf(".the-west.") != -1 && url.indexOf("game.php") != -1) {
//	if (parseFloat(TheWestApi.version.substr(0,4)) >= 1.30){

var twpro_lang = {
	info: ['Zyphir Randrott', 'mailto:zyphir.randrott@gmail.com', 4343, '.w1.'],
		AUTHOR: 'Authors',
		TRANSLATOR: 'Translator',
		TWPRO_DISABLED: 'Script disabled: script update needed due to source code changes in The-West',
		SORTBYNAME: 'Order by <b>name</b>',
		SORTBYXP: 'Order by <b>experience</b>',
		SORTBYWAGES: 'Order by <b>wages</b>',
		SORTBYLUCK: 'Order by <b>luck</b>',
		SORTBYCOMB: 'Order by <b>job rank</b>',
		SORTBYDANGER: 'Order by <b>danger</b>',
		SORTBYLABORP: 'Order by <b>labor points</b>',
		FILTERJOBS: "Hide activities I cannot do",
		FILTERCLOTHING: 'Just display the best clothing available for the selected activity',
		CHOOSEJOB: 'Choose activity...',
		CALCJOB: 'Calculating values, please wait...',
		INVENTSTATS: 'Inventory statistics',
		SELLVALUE: 'Sales value',
		OBJECTS: 'Objects',
		PRODUCTS: 'Products',
		TOTAL: 'Total',
		QUANTITIES: 'Quantities',
		LABORP: 'LP',
		CONSTRUCTION: ' \u25B7 Construction',
		HPTOTAL: 'Total health points',
		STARTCALC: 'Calculate data...',
		CONVERT: 'Convert',
		MULTISEL: 'Sell multiple items...',
		SELL: 'Sell selection',
		CONFIRMSELL: 'Do you really want to sell %1 stacks of items?',
		SELLING: 'Selling...',
		SALEDONE: 'The selected items have been sold.',
		NONESELECTED: 'You have to select at least one item!',
		JOBRANKSETTINGS: 'Job ranking settings',
		SEARCHINVENTORY: 'Search inventory',
		NOSEARCHRESULT: 'Your search for %1 returned no results.%2Display all items%3',
		DISABLEBESTFORJOB: 'Disable hiding items which are inferior for a selected activity.',
		SEARCHHELP: 'Search the inventory. You can use wildcards (* for zero or more characters, ? for one character)',
		DUELSHOOTINGATT: ' \u25B7 Range dueler (attacker)',
		DUELSHOOTINGDEF: ' \u25B7 Range dueler (defender)',
		DUELVIGOR: ' \u25B7 Melee dueler',
		FORTATTACK: ' \u25B7 Fortbattle (attacker)',
		FORTDEFEND: ' \u25B7 Fortbattle (defender)',
		FORTMESSAGE: 'Message to participants',
		FORTMESSAGERCP: 'Number of recipients',
		HIDEJOBS: 'Activities & Itemsets Management',
		CONFIRM: 'Confirm',
		HIDEJOBDESC: 'Jobs can be disabled here. Mark all activities which should not be calculated automatically, and click Confirm.',
		SHOWN: 'Enabled',
		HIDDEN: 'Disabled',
		NOEQUIP: "With no equipment",
		BESTEQUIP: "With your best equipment",
		SETTINGSSAVED: 'The settings for TW Pro have been applied!',
		SETTINGSSAVEDSESSION: 'The settings for TW Pro have been applied! (for this session only)',
		PERSISTSETTINGS: 'Save these settings for every session.',
		CANNOTWEAR: 'You cannot wear this set, or this set has no influence on the Activity calculations.',
		SETSETTINGS: 'Disable itemsets for faster calculations. Sets with special, unmet requirements are disabled by default.',
		CUSTOMNAME: 'Enter the desired name for an activity',
		CUSTOMCALCULATION: 'Enter a valid TW Pro calculation here.',
		CUSTOMENABLED: 'Check this box to enable this activity',
		NEW: 'New',
		SPEED: ' \u25B7 Speed',
		REGENERATION: ' \u25B7 Fastest lifepoints',
		SETSINFO: "Itemsets",
		WITHSETITEMS: 'Bonuses with %1 items',
		LABORPOINTS: 'Labor points',
		USEFULITEM: 'This number indicates the amount of items which are used in calculations',
		PERCREGENERATION: 'Regeneration',
		LUCK: 'luck',
		PRAYING: 'praying',
		NOITEMSETS: "You don\'t have any item of this Set",
		AVERAGEDAMAGE: "Average damage",
		PREFERENCES: "Preferences",
		DEFAULTSORTING: " \u25B7 Default sorting",
		FBHEALTHPRIORITY: "Health points priority",
		FBHEALTHPRIORITYZERO: "None",
		FBHEALTHPRIORITYLOW: "Low",
		FBHEALTHPRIORITYMEDIUM: "Medium",
		FBHEALTHPRIORITYHIGH: "High",
		FBHEALTHPRIORITYAUTO: "Auto",
		FBBATTLEUNIT: "Battle unit type",
		FBBATTLEUNITSKIRMISHER: "Skirmisher (dodging) | Front line",
		FBBATTLEUNITLINEINFANTRYMAN: "Line infantryman (polyvalent) | Middle line",
		FBBATTLEUNITMARKSMAN: "Marksman (aiming) | Rear line",
		FBTAGS : [["0", "1", "2", "3", "@"], ["D", "P", "A"]],
		DMGMIN: "Min",
		DMGMAX: "Max",
		DMGAVG: "Avg",
		CHATWHISPER: "* Whisper *\n\nEnter a player name",
		CHATCOLOR: "* Custom color (000-999) *\n\nEnter a color code",
		USEFULITEMS : "Highlight every items that are useful for my enabled activities",
		USEFULITEMSPOPUP : " \u25B7 Box | Highlighting with details",
		USEFULITEMSPOPUPDESC : "Bonuses by activities will be displayed on each useful item (process is a little longer).",
		SHOWALLJOBS : " \u25B7 Show all jobs on the map",
		SHOWALLJOBSDESC : "Will be active after refresh (F5)",
		COLLECTORMODE : " \u25B7 Collector mode",
		COLLECTORMODEDESC : "Items at merchants will be highlighted in blue if you don't own them yet.",
		HELP : "HELP",
		WEBSTORAGEQUOTAEXCEEDED : "WebStorage Quota exceeded!\n\n- Your current data will be incomplete.\n- Cache feature has been disabled automatically.\n- Please empty the cache of some accounts on this server, or increase your LocalStorage quota limits (only possible with Firefox and Opera).",
		CACHEGENERATE : "Generate cache...",
		CACHEUPDATE : "Cache update",
		CACHEFORCEOK : "Discard the changes detected.",
		CACHEFORCEOKDESC : "Force cache status to OK, without doing the calculations.",
		CACHEGENERATENOW : "Do you want to generate a new cache now?",
		CACHEUPDATENOW : "Do you want to update the cache now?",
		CACHEINVENTORYCHANGES : "Inventory changes detected.",
		CACHEUPDATECLICK : "Click to update the cache.",
		CACHENEWITEMS : "New items",
		CACHEDELETEDITEMS : "Deleted items",
		CACHESKILLSCHANGES : "Skills changes detected.",
		CACHEJOBSAFFECTED : "Activities affected",
		CACHEISEMPTY : "Cache is empty.",
		CACHEINITIALIZE : "Click here to initialize.",
		CACHEOK : "Cache OK.",
		CACHEREWRITE : "If needed, you can still rewrite data by clicking here.",
		CACHEEMPTYING : "Cache is emptying...",
		CACHENORMALMODE : "TW Pro is in normal mode during the process.",
		CACHEDISABLED : "Cache disabled.",
		CACHEOPENSETTINGS : "Open the TW Pro Settings to enable.",
		CACHENEWJOBSDETECTED : "New jobs detected.",
		CACHENEWJOBDETECTED : "New job detected: %1<br>Please update your cache.",
		CACHEENABLE : " \u25B7 Enable TW Pro cache",
		CACHEINDEXEDDBNOT : "IndexedDB is not supported by your browser.",
		CACHEINDEXEDDBDESC : "Ultra fast processing. Recommended for Firefox 4+ and Chrome 11+.",
		CACHECOMPATIBILITY : "Compatibility infos",
		CACHEQUOTAS : "Quotas infos",
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
				  +"It is not possible to adjust quotas.",
		CACHEEMPTY : "Empty TW Pro cache.",
		CACHEEMPTYDESC : "Rescue tool. To be used mainly in case of data inconsistency.",
		CACHEWEBSTORAGEDESC : "Fast processing. Supported by most current browsers but may be subject to storage quota limits.",
		CACHEEMPTYNOW : "Do you want to empty this cache now?",
		CACHERECORDS : "records",
		CACHEEMPTIED : "Cache emptied!",
		CACHERECORDSDELETED : "records deleted.",
		CACHEEMPTYSLOWDESC : "You can still play during the process.",
		CACHEEMPTYFASTDESC : "Faster but browser may hang during the process.",
		CACHEFASTMODE : "Fast mode",
		NORMALMODE : "Normal mode",
		FBCOMBOFAVORITE : "Favorite",
		FBCOMBOGENERATE : "Generate all Fortbattle combinations",
		FBCOMBODESC : "This will add 30 activities to your dropdown menu, but you will then be able to manage them in the tab",
		FBCOMBONORMALDESC : "Displays the combinations as normal activities in the dropdown menu.",
		FBCOMBOSUBMENUS : "Submenus mode",
		FBCOMBOSUBMENUSDESC : "Displays the combinations as submenus of the main Fortbattle activities.",
		FBCOMBOHELPDESC : "<b>When your dropdown menu is selected:</b><br>- Hit [1] to expand the Attacking combinations submenu.<br>- Hit [2] to expand the Defending combinations submenu.<br>- Hit [Space] to expand both submenus.",
		FBCOMBOMOZTIP : "Firefox users may also right-click the main Fortbattle activities<br>in the dropdown menu to expand the corresponding submenus.",
		SAFEMODE : " \u25B7 Enable Safe mode",
		SAFEMODEDESC : "Slower calculation process, but hang, freeze and crash proof for your browser.",
		SAFEMODEFBEXCL : "Do not run in Safe mode when using the manual Fortbattle settings above.",
		SAFEMODERUNNING : "Safe mode is running...",
		SAFEMODERUNNINGDESC : ["During the process:", "- Do not close or refresh your inventory.", "- Do not buy or sell any item.", "- Do not dress or undress any item.", "- Do not make changes in your skills.", "OK, I will take care. Let me see my inventory now..."],
		SAFEMODECOMPLETED : "Safe mode completed!",
		ACTIVITIES : "Activities",
		ITEMS : "Items",
		ITEMSETSCOMBI : "Itemsets combinations",
		TESTSRUN : "Number of tests performed.",
		CALCTIME : "Calculation time",
		NOJOBSAFFECTED : "Changes didn't affect any current activities.",
		AREYOUSURE : "Are you sure you want to do that?",
};
	var twpro_langs = {};
	twpro_langs.fr = {
		info: ["Zyphir Randrott", "mailto:zyphir.randrott@gmail.com", 4145, ".fr1."],
		AUTHOR: "Auteurs",
		TRANSLATOR: "Traducteur",
		TWPRO_DISABLED: "Script d\xE9sactiv\xE9: mise à jour du script nécessaire suite à des changements dans le code source de The-West",
		SORTBYNAME: "Trier par <b>Nom</b>",
		SORTBYXP: "Trier par <b>Exp\xE9rience</b>",
		SORTBYWAGES: "Trier par <b>Salaire</b>",
		SORTBYLUCK: "Trier par <b>Chance</b>",
		SORTBYCOMB: "Trier par <b>Importance</b>",
		SORTBYDANGER: "Trier par <b>Danger</b>",
		SORTBYLABORP: "Trier par <b>Points de Travail</b>",
		FILTERJOBS: "Cacher les travaux que je ne peux pas faire",
		FILTERCLOTHING: "Afficher uniquement le meilleur \xE9quipement disponible pour l\'activit\xE9 s\xE9lectionn\xE9e",
		CHOOSEJOB: "Choisir une Activit\xE9...",
		CALCJOB: "Calcul en cours, veuillez patienter...",
		INVENTSTATS: "Statistiques Inventaire",
		SELLVALUE: "Valeurs de vente",
		OBJECTS: "Objets",
		PRODUCTS: "Produits",
		TOTAL: "Total",
		QUANTITIES: "Quantit\xE9s",
		LABORP: "PT",
		CONSTRUCTION: " \u25B7 Construction",
		HPTOTAL: "Total des coups r\xE9ussis",
		STARTCALC: "Lancer le calcul...",
		CONVERT: "Convertir",
		MULTISEL: "Vendre plusieurs articles...",
		SELL: "Vendre la s\xE9lection",
		CONFIRMSELL: "Souhaitez-vous vraiment vendre ces %1 types d\'articles?",
		SELLING: "Vente en cours...",
		SALEDONE: "Les articles s\xE9lectionn\xE9s ont \xE9t\xE9 vendus.",
		NONESELECTED: "Vous devez s\xE9lectionner au moins un article!",
		JOBRANKSETTINGS: "Niveaux d\'Importance",
		SEARCHINVENTORY: "Chercher dans l\'inventaire",
		NOSEARCHRESULT: "Votre recherche pour %1 n\'a pas donn\xE9 de r\xE9sultat.%2Afficher tous les articles%3",
		DISABLEBESTFORJOB: "D\xE9sactivez la fonction qui cache les articles inf\xE9rieurs pour un job s\xE9lectionn\xE9.",
		SEARCHHELP: "Recherche dans l\'inventaire. Vous pouvez utiliser des caract\xE8res joker (* pour plusieurs caract\xE8res, ? pour un seul caract\xE8re)",
		DUELSHOOTINGATT: " \u25B7 Duel/Arme \xE0 feu (attaquant)",
		DUELSHOOTINGDEF: " \u25B7 Duel/Arme \xE0 feu (d\xE9fenseur)",
		DUELVIGOR: " \u25B7 Duel/Arme de contact",
		FORTATTACK: " \u25B7 Bataille/Fort (attaquant)",
		FORTDEFEND: " \u25B7 Bataille/Fort (d\xE9fenseur)",
		FORTMESSAGE: 'Message aux participants',
		FORTMESSAGERCP: 'Nombre de destinataires',
		HIDEJOBS: "Gestion des Activit\xE9s & Objets de Sets",
		CONFIRM: "Confirmer",
		HIDEJOBDESC: "Les travaux peuvent \xEAtre d\xE9sactiv\xE9s ici. S\xE9lectionnez toutes les Activit\xE9s qui ne doivent pas \xEAtre calcul\xE9es automatiquement et cliquez sur Confirmer.",
		SHOWN: "Activ\xE9es",
		HIDDEN: "D\xE9sactiv\xE9es",
		NOEQUIP: "Sans équipement",
		BESTEQUIP: "Avec votre meilleur équipement",
		SETTINGSSAVED: "Les param\xE8tres TW Pro ont \xE9t\xE9 appliqu\xE9s!",
		SETTINGSSAVEDSESSION: 'Les param\xE8tres TW Pro ont \xE9t\xE9 appliqu\xE9s! (pour cette session uniquement)',
		PERSISTSETTINGS: "Sauver ces param\xE8tres pour toutes les sessions.",
		CANNOTWEAR: "Vous ne pouvez pas porter ce Set, ou ce Set n\'a aucune influence sur les calculs d\'Activit\xE9s.",
		SETSETTINGS: "D\xE9sactivez les objets de Sets pour am\xE9liorer la vitesse de calcul. Les Sets avec des conditions sp\xE9ciales requises non remplies sont d\xE9sactiv\xE9s par d\xE9faut.",
		CUSTOMNAME: "Entrez le nom d\xE9sir\xE9 pour l\'Activit\xE9.",
		CUSTOMCALCULATION: "Cliquez ici et entrez une formule TW Pro valide.",
		CUSTOMENABLED: "Cochez cette case pour activer cette Activit\xE9",
		NEW: "Nouveau",
		SPEED: " \u25B7 Vitesse",
		REGENERATION: " \u25B7 R\xE9g\xE9n\xE9ration PV",
		SETSINFO: "Objets de Sets",
		WITHSETITEMS: "Bonus avec %1 objets",
		LABORPOINTS: "Points de Travail",
		USEFULITEM: "Ce nombre indique le nombre d\'objets qui sont utilis\xE9s dans les calculs.",
		PERCREGENERATION: "R\xE9g\xE9n\xE9ration",
		LUCK: "Chance",
		PRAYING: "Prier",
		NOITEMSETS: "Vous ne possédez aucun objet de ce Set",
		AVERAGEDAMAGE: "Endommagement moyen",
		PREFERENCES: "Préférences",
		DEFAULTSORTING: " \u25B7 Tri par défaut",
		FBHEALTHPRIORITY: "Priorité aux points de vie",
		FBHEALTHPRIORITYZERO: "Aucune",
		FBHEALTHPRIORITYLOW: "Faible",
		FBHEALTHPRIORITYMEDIUM: "Moyenne",
		FBHEALTHPRIORITYHIGH: "Elevée",
		FBHEALTHPRIORITYAUTO: "Automatique",
		FBBATTLEUNIT: "Type d\'unité",
		FBBATTLEUNITSKIRMISHER: "Tirailleur (éviter) | Pemière ligne",
		FBBATTLEUNITLINEINFANTRYMAN: "Fantassin de ligne (polyvalent) | Soutien central",
		FBBATTLEUNITMARKSMAN: "Tireur d\'élite (viser) | Position arrière",
		FBTAGS : [["0", "1", "2", "3", "@"], ["E", "P", "V"]],
		DMGMIN: "Min",
		DMGMAX: "Max",
		DMGAVG: "Moy",
		CHATWHISPER: "* Chuchoter *\n\nEntrez le nom du joueur",
		CHATCOLOR: "* Couleur personnalisée (000-999) *\n\nEntrez un code couleur",
		USEFULITEMS : "Mettre en évidence tous les objets qui sont utiles pour mes activités activées",
		USEFULITEMSPOPUP : " \u25B7 Coffre | Mise en évidence avec détails",
		USEFULITEMSPOPUPDESC : "Les bonus par activités seront affichés sur chaque objet utile (le processus est un peu plus long).",
		SHOWALLJOBS : " \u25B7 Afficher tous les jobs sur la carte",
		SHOWALLJOBSDESC : "Sera actif après actualisation (F5)",
		COLLECTORMODE : " \u25B7 Mode collectionneur",
		COLLECTORMODEDESC : "Les objets chez les marchands seront surlignés en bleu si vous ne les possédez pas encore.",
		HELP : "AIDE",
		WEBSTORAGEQUOTAEXCEEDED : "Quota WebStorage dépassé!\n\n- Vos données actuelles seront incomplètes.\n- La fonction Cache a été désactivée automatiquement.\n- Veuillez vider le cache de certains comptes sur ce serveur, ou augmentez le quota maximum de votre LocalStorage (possible uniquement avec Firefox ou Opera).",
		CACHEGENERATE : "Générer le cache...",
		CACHEUPDATE : "Mise à jour du cache",
		CACHEFORCEOK : "Ignorer les changements détectés.",
		CACHEFORCEOKDESC : "Force le status du cache sur OK, sans effectuer les calculs.",
		CACHEGENERATENOW : "Souhaitez-vous générer le cache maintenant?",
		CACHEUPDATENOW : "Souhaitez-vous mettre à jour le cache maintenant?",
		CACHEINVENTORYCHANGES : "Changements détectés dans l'inventaire.",
		CACHEUPDATECLICK : "Cliquez pour mettre à jour le cache.",
		CACHENEWITEMS : "Nouveaux objets",
		CACHEDELETEDITEMS : "Objets supprimés",
		CACHESKILLSCHANGES : "Changements détectés dans les aptitudes.",
		CACHEJOBSAFFECTED : "Activités affectées",
		CACHEISEMPTY : "Le cache est vide.",
		CACHEINITIALIZE : "Cliquez ici pour l'initialiser.",
		CACHEOK : "Cache OK.",
		CACHEREWRITE : "Si nécessaire, vous pouvez toujours réécrire les données en cliquant ici.",
		CACHEEMPTYING : "Vidage de cache en cours...",
		CACHENORMALMODE : "TW Pro est en mode normal pendant la durée du processus.",
		CACHEDISABLED : "Cache désactivé.",
		CACHEOPENSETTINGS : "Ouvrez les réglages de TW Pro pour l'activer.",
		CACHENEWJOBSDETECTED : "Nouveaux travaux détectés.",
		CACHENEWJOBDETECTED : "Nouveau travail détecté: %1<br>Veuillez mettre à jour votre cache.",
		CACHEENABLE : " \u25B7 Activer le cache de TW Pro",
		CACHEINDEXEDDBNOT : "IndexedDB n'est pas supporté par votre navigateur.",
		CACHEINDEXEDDBDESC : "Processus ultra rapide. Recommandé pour Firefox 4+ et Chrome 11+.",
		CACHECOMPATIBILITY : "Infos compatibilité",
		CACHEQUOTAS : "Infos quotas",
		CACHEQUOTASDESC : "<b>Cliquez sur 'Infos quotas' pour connaître les limites du WebStorage (LocalStorage) de votre navigateur.<br>"
				  +"<br>Comment augmenter les limites du LocalStorage?</b><br>"
				  +"<b>- Firefox:</b><br>"
				  +"Tapez 'about:config' dans votre barre d'adresse et cherchez l'option 'dom.storage.default_quota'.<br>"
				  +"Cette valeur est en kilooctets, vous pouvez la changer. L'espace de stockage est partagé par serveur de même<br>"
				  +"langue, vous aurez besoin d'environ 1500 ko par compte sur un même serveur.<br>"
				  +"<b>- Chrome:</b><br>"
				  +"Il n'est pas possible d'ajuster les quotas.<br>"
				  +"<b>- Opera:</b><br>"
				  +"Par défaut, votre navigateur vous invitera à augmenter les limites si nécessaire. Toutefois vous pouvez<br>"
				  +"taper 'opera:webstorage' dans votre barre d'adresse et changer les paramètres manuellement pour chaque domaine.<br>"
				  +"La valeur est en kilooctects. L'espace de stockage est partagé par monde (sous-domaine), vous aurez besoin<br>"
				  +"d'environ 3000 ko par compte sur un même monde.<br>"
				  +"<b>- Safari:</b><br>"
				  +"Il n'est pas possible d'ajuster les quotas.",
		CACHEEMPTY : "Vider le cache de TW Pro.",
		CACHEEMPTYDESC : "Outil de secours. A utiliser principalement en cas d'incohérence des données.",
		CACHEWEBSTORAGEDESC : "Processus rapide. Supporté par la majorité des navigateurs récents mais peut être sujet à des quotas de stockage limités.",
		CACHEEMPTYNOW : "Souhaitez-vous vider le cache maintenant?",
		CACHERECORDS : "enregistrements",
		CACHEEMPTIED : "Cache vidé!",
		CACHERECORDSDELETED : "enregistrements supprimés.",
		CACHEEMPTYSLOWDESC : "Vous pouvez continuer à jouer pendant le processus.",
		CACHEEMPTYFASTDESC : "Plus rapide mais peut bloquer le navigateur pendant le processus.",
		CACHEFASTMODE : "Mode rapide",
		NORMALMODE : "Mode normal",
		FBCOMBOFAVORITE : "Favori",
		FBCOMBOGENERATE : "Générer toutes les combinaisons de Batailles de Fort",
		FBCOMBODESC : "Ceci ajoutera 30 activités à votre menu déroulant, mais vous pourrez ensuite les gérer dans l'onglet",
		FBCOMBONORMALDESC : "Affiche les combinaisons comme des activités normales dans le menu déroulant.",
		FBCOMBOSUBMENUS : "Mode sous-menus",
		FBCOMBOSUBMENUSDESC : "Affiche les combinaisons en tant que sous-menus des activités principales de Batailles de Fort.",
		FBCOMBOHELPDESC : "<b>Quand votre menu déroulant est sélectionné:</b><br>- Appuyez sur [1] pour déployer le sous-menu des combinaisons d'Attaque.<br>- Appuyez sur [2] pour déployer le sous-menu des combinaisons de Défense.<br>- Appuyez sur [Espace] pour déployer les 2 sous-menus.",
		FBCOMBOMOZTIP : "Les utilisateurs de Firefox peuvent aussi faire un clic-droit dans le menu déroulant, sur les<br>activités principales de Batailles de Fort, afin de déployer les sous-menus correspondants.",
		SAFEMODE : " \u25B7 Activer le Mode Sans Echec",
		SAFEMODEDESC : "Processus de calcul plus lent, mais évite de bloquer, geler ou crasher votre navigateur.",
		SAFEMODEFBEXCL : "Ne pas exécuter le Mode Sans Echec lorsque j'utilise les réglages manuels de Batailles de Fort ci-dessus.",
		SAFEMODERUNNING : "Mode Sans Echec en cours...",
		SAFEMODERUNNINGDESC : ["Durant le processus:", "- Ne pas fermer ou rafraîchir votre inventaire.", "- Ne pas acheter ou vendre un objet.", "- Ne pas équiper ou déséquiper un objet.", "- Ne pas effectuer de changements dans vos aptitudes.", "OK, je ferai attention. Montrez-moi mon inventaire maintenant..."],
		SAFEMODECOMPLETED : "Mode Sans Echec terminé !",
		ACTIVITIES : "Activités",
		ITEMS : "Objets",
		ITEMSETSCOMBI : "Combinaisons d'Objets de Sets",
		TESTSRUN : "Nombre de tests effectués.",
		CALCTIME : "Durée du calcul",
		NOJOBSAFFECTED : "Les changements n'ont affecté aucune activité courante.",
		AREYOUSURE : "Etes-vous certain de vouloir faire ça ?",
	};

var twpro_langname = location.host.match(/(\D+)\d+\./);
if(twpro_langname && twpro_langs[twpro_langname[1]]) twpro_lang = twpro_langs[twpro_langname[1]];

if (decodeURIComponent(localStorage.getItem("TWPro_LanguagePack")) == "fr" || decodeURIComponent(localStorage.getItem("TWPro_LanguagePack")) == "http://fr") twpro_lang = twpro_langs['fr'];

if (typeof twpro_lp_custom != "undefined"){
  for (var twpro_lang_translations in twpro_lang) {
	  if (typeof twpro_lp_custom[twpro_lang_translations] != "undefined") twpro_lang[twpro_lang_translations] = twpro_lp_custom[twpro_lang_translations];
  }
}
	function twpro_initLanguage(lang) {
	  localStorage.setItem("TWPro_LanguagePack", encodeURIComponent(lang));
	}

//Sprites für Sortierbuttons
var twpro_sortButtonImg = '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'
var twpro_searchButtonImg = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHNJREFUOMvNkbENwCAMBM/p6BiNcRiTEVKwh9O4QAEiQ1LkJUvokc/yG/6mAGRAgWrvsNJ8AgVIVsU8FyRbQ2y8aF72AKpNvSvZ31DHlwHOVlDvCqMQtantMz5CxAnWWY8sZDSEyGLQHUQ2rqWbG0wh73QBwKsfIwV17B4AAAAASUVORK5CYII%3D'
var twpro_loadingSearchImg = 'data:image/gif;base64,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'
var twpro_css_bagRed = 'data:image/png;base64,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'
var twpro_css_bagGreen = 'data:image/png;base64,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'
var twpro_css_bagBlue = 'data:image/png;base64,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'
var twpro_cache_button = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQUlEQVR42p2SSXaDMBBEMVhPaMAxmEmSZzCTl9wkJ+GMHILrVBY2JHGcPJPFX35Vt7qsQrmoFEdjJBojUSqOImUoUvGDUknUZoVKeyiVgFUqjloLNEai1gLniA2+WHYusdsRX5DuGLKhVBKV9j7l+i5ViuMYst6xF+F7pK1HHHsR7gLWV9pDbVY3+br10BiJ/cbtn0mPHELeT8nXrUQWs+G3xGcTnCI+VFrCum4FAkm6V8QRX5BuSnaJ3c6RXWK3RcphNeafspawai1my5TY7UXL2519sZy181qQLh9Lcpr52/uIDZNcaYFDyF66swncPlcC+diwSgvURmIX0D8bpgPaZynHiFWkDKXiGB85bOiw5k5Hid3Se7ffuNPtQjp8FbOUw8pjiiJlk5zHFHlMcUlcXBIXRcqQxRTnhOKcsG98AI/BsqoFKyNiAAAAAElFTkSuQmCC'
var twpro_minimap_coord = 'data:image/png;base64,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'


	var specialMessages = {
		'[del]construct': function(twpro_job){
			return "";
			//Zou de ingebrachte constructiepunten voor een bepaalde level moeten weergeven
		},
		'[del]speed': function(){
			return "";
		},
		'job_hp': function(twpro_hp){
			var healthPoints = ((9+Character.level)+(Character.skills.health+twpro_hp)*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?2:1.5):1))*10;
			if(healthPoints < Character.get_health()) healthPoints = '<div style="display:inline;color:red">'+healthPoints+'</div>';
			return Character.skill_titles.health+": "+healthPoints;
		},
		'regeneration': function(twpro_job){
			var healthPoints = (twpro_job.maxlifes+(TWPro.settings_prefs['useCache']=='true'?(((Character.skills.health-twpro_job.twpro_regeneration_skillhealth)*(Character.characterClass=='soldier'?(PremiumBoni.hasBonus('character')?20:15):10))+((Character.level-twpro_job.twpro_regeneration_level)*10)):0));
			if(healthPoints < Character.get_health()) healthPoints = '<div style="display:inline;color:red">'+healthPoints+'</div>';
			return "<div style='position: relative; float: right; top: -1px;'>"+Character.skill_titles.health+": " + healthPoints + " @ " + Math.round(TWPro.twpro_sleeperBonus(twpro_job.sleepCount)*10000)/100 + "%<\/div>";

			/*
			Regen_speed:
			Job:  .02
			Idle: .05
			
			Fort: 1-80%, 2-85%, 3-90%, 4-95%, 5-100%, 6-100% - 6 uur
			Hotel: 1-64%, 2-72%, 3-80%, 4-88%, 5-100% - 8 uur
			
			LP = level + LP_level * (soldier?15:10) + 90
			var regens = {
				fort: [000, .80, .85, .90, .95, 1.0, 1.0],
				hotl: [000, .64, .72, .80, .88, 1.0]
			}
			FortSpeed: 1/6 * regens.fort[stars] * (1+REGENMOD_SLEEPERSET) * LP = CONSTANT * (1+%REGEN) * LP
			HotelSped: 1/8 * regens.hotl[stars] * (1+REGENMOD_SLEEPERSET) * LP = CONSTANT * (1+%REGEN) * LP
			---> = CONSTANT * (1+REGENMOD_SLEEPERSET) * LP
			
			Sleeper:
			#	REGEN	diff
			6	.25	---
			5	.18	.07
			4	.12	.06
			3	.08	.04
			2	.06	.02
			1/0	.00	.06
			
			Calculaton procedure:
			START:
				VARS cache, equip, lifes, dlife, newlifes
				VAR regen []
				EQUIP all sleeper items > equip[]
				soldier ? 1.5 : 1 > dlife
				90 + level *10 + lifepoints_skill * dlife > lifes
				ORDER equipment_slots BY lifepoints_bonus (highest at top) > cache
				LOOP THROUGH cache
					# sleeper_count = sleeper count
					# sleeper_count_minus_one = new sleeper count
					TEST_EQUIP clothing
						lifes + xtra_life_bonus * dlife > newlifes
						IF lifes * (1+regen[sleeper_count]) < newlifes * (1+regen[sleeper_count_minus_one])
							clothing > equip[]
							lifes = newlifes
							CONTINUE
						ELSE
							BREAK
						/
					/
				/
				# equip[] = best Life regeneration
			
			
			1 item: d(%REGEN)/dt * LP > (1+%REGEN) * d(LP)/dt
			n items: 
			*/
		},
		'twpro_fortatt': function(){
			new Ajax('game.php?window=character', {
			  method:'post',
			  data:{},
			  onComplete:function(data) {
				bonus = new RegExp("bonus_icon_fb[^>]+><[^>]+><[^>]+>([^<]+)");
				bonus = data.match(bonus);
				if($('fort_bonus_popup')){
				  if(TWPro.twpro_jobs[twpro_selectedJob].shortName == 'twpro_fortatt'){
					  var fb_settings_healthPriority = TWPro.battle_prefs['healthPriority_att'];
					  var fb_settings_battleUnit = TWPro.battle_prefs['battleUnit_att'];
				  }
				  else{
					  var fb_settings_array = TWPro.twpro_jobs[twpro_selectedJob].shortName.split('_');
					  var fb_settings_healthPriority = fb_settings_array[2];
					  var fb_settings_battleUnit = fb_settings_array[3];
				  }
				  $('fort_bonus_popup').title = '<b>'+TWPro.lang.FORTATTACK+' - '+AjaxWindow.possibleValues['settings']+'</b>:<br><span style="font-size: 11px;">'+TWPro.lang.FBHEALTHPRIORITY+': <b>'+TWPro.lang['FBHEALTHPRIORITY'+fb_settings_healthPriority.toUpperCase()]+'</b><br>'+TWPro.lang.FBBATTLEUNIT+': <b>'+TWPro.lang['FBBATTLEUNIT'+fb_settings_battleUnit.toUpperCase()]+'</b><br></span>'
				  if(bonus) $('fort_bonus_popup').title += '<br><div style="vertical-align:top;display:inline-block;"><b>'+unescape((ClassChoose.nameTranslations.mainclass[Character.characterClass]+'</b>:&nbsp;</div><div style="font-size:11px;width:300px;display:inline-block;">'+bonus[1]+'</div>').replace(/\\/g, "%"));
				}
			  }
			}).request();
			var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
			fort_bonus_xhtml = "<div id='fort_bonus_popup' style='position: relative; left:0px; float: right; top: -2px;'><div style='position: absolute; background-image:url(/images/bgdark.png); opacity:0.3; width:100%; height:100%; z-index:1;'><\/div><div style='position: relative; z-index:2; padding:1px;'><img src='images/fort/battle/attacker_secondary.png'> "+Math.floor((25+Math.pow((Character.skills.leadership*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk2"]), 0.4)+Math.pow(Character.skills.endurance+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk3"], 0.4)+Math.pow(Character.skills.aim+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk0"], 0.4))*100)/100 + " <img src='images\/fort\/battle\/defender_secondary.png'> " + Math.floor((10+Math.pow((Character.skills.leadership*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk2"]), 0.4)+Math.pow(Character.skills.endurance+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk3"], 0.4)+Math.pow(Character.skills.dodge+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk1"], 0.4))*100)/100;
			 if(Character.characterClass == "soldier"){
				 fort_bonus_xhtml += " <img src='images\/fort\/battle\/leadsupport.png'> " + Math.floor(Math.pow((Character.skills.leadership+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk2"]/(PremiumBoni.hasBonus('character')?1.5:1.25))*(PremiumBoni.hasBonus('character')?0.5:0.25), 0.4)*100)/100;
			 }
			var healthPoints = ((9+Character.level)+(Character.skills.health+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk4"])*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?2:1.5):1))*10;
			if(healthPoints < Character.get_health()) healthPoints = '<div style="display:inline;color:red">'+healthPoints+'</div>';
			fort_bonus_xhtml += " <img width='13' height='12' style='background: url(\/images\/charstats.png) no-repeat -76px -22px;' src='images\/transparent.png'> "+healthPoints+"<\/div><\/div>";
			 specialMessageDiv_fb = document.getElementById("twpro_specialMessage_fb");
			 if(!specialMessageDiv_fb){
				specialMessageDiv_fb = document.createElement("div");
				specialMessageDiv_fb.id = "twpro_specialMessage_fb";
				specialMessageDiv_fb.style.cssText = "position: absolute; font-size: 10px; color:#000000; top: 55px; left: 3px; width: 100px; z-index: 1; font-weight:normal; text-align:center;";
				document.getElementById("window_inventory_content").appendChild(specialMessageDiv_fb);
			 }
			 specialMessageDiv_fb.innerHTML = "<div id='fort_bonus_popup_act' style='position: relative; left:0px; top:7px'><img src='images/fort/battle/attacker_secondary.png'> "+Math.floor((25+Math.pow((Character.skills.leadership+Character.bonus.skills_total.leadership)*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1), 0.4)+Math.pow(Character.skills.endurance+Character.bonus.skills_total.endurance, 0.4)+Math.pow(Character.skills.aim+Character.bonus.skills_total.aim, 0.4))*100)/100 + " <img src='images\/fort\/battle\/defender_secondary.png'> " + Math.floor((10+Math.pow((Character.skills.leadership+Character.bonus.skills_total.leadership)*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1), 0.4)+Math.pow(Character.skills.endurance+Character.bonus.skills_total.endurance, 0.4)+Math.pow(Character.skills.dodge+Character.bonus.skills_total.dodge, 0.4))*100)/100;
			 if(Character.characterClass == "soldier"){
				 document.getElementById("fort_bonus_popup_act").style.top = "1px"
				 specialMessageDiv_fb.innerHTML += " <img src='images\/fort\/battle\/leadsupport.png'> " + Math.floor(Math.pow((Character.skills.leadership+Character.bonus.skills_total.leadership)*(PremiumBoni.hasBonus('character')?0.5:0.25), 0.4)*100)/100;
			 }
			 specialMessageDiv_fb.innerHTML += "&nbsp;<\/div>";
			return fort_bonus_xhtml;
		},
		'twpro_fortdef': function(){
			new Ajax('game.php?window=character', {
			  method:'post',
			  data:{},
			  onComplete:function(data) {
				bonus = new RegExp("bonus_icon_fb[^>]+><[^>]+><[^>]+>([^<]+)");
				bonus = data.match(bonus);
				if($('fort_bonus_popup')){
				  if(TWPro.twpro_jobs[twpro_selectedJob].shortName == 'twpro_fortdef'){
					  var fb_settings_healthPriority = TWPro.battle_prefs['healthPriority_def'];
					  var fb_settings_battleUnit = TWPro.battle_prefs['battleUnit_def'];
				  }
				  else{
					  var fb_settings_array = TWPro.twpro_jobs[twpro_selectedJob].shortName.split('_');
					  var fb_settings_healthPriority = fb_settings_array[2];
					  var fb_settings_battleUnit = fb_settings_array[3];
				  }
				  $('fort_bonus_popup').title = '<b>'+TWPro.lang.FORTDEFEND+' - '+AjaxWindow.possibleValues['settings']+'</b>:<br><span style="font-size: 11px;">'+TWPro.lang.FBHEALTHPRIORITY+': <b>'+TWPro.lang['FBHEALTHPRIORITY'+fb_settings_healthPriority.toUpperCase()]+'</b><br>'+TWPro.lang.FBBATTLEUNIT+': <b>'+TWPro.lang['FBBATTLEUNIT'+fb_settings_battleUnit.toUpperCase()]+'</b><br></span>'
				  if(bonus) $('fort_bonus_popup').title += '<br><div style="vertical-align:top;display:inline-block;"><b>'+unescape((ClassChoose.nameTranslations.mainclass[Character.characterClass]+'</b>:&nbsp;</div><div style="font-size:11px;width:300px;display:inline-block;">'+bonus[1]+'</div>').replace(/\\/g, "%"));
				}
			  }
			}).request();
			var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
			fort_bonus_xhtml = "<div id='fort_bonus_popup' style='position: relative; left:0px; float: right; top: -2px;'><div style='position: absolute; background-image:url(/images/bgdark.png); opacity:0.3; width:100%; height:100%; z-index:1;'><\/div><div style='position: relative; z-index:2; padding:1px;'><img src='images/fort/battle/attacker_secondary.png'> "+Math.floor((25+Math.pow((Character.skills.leadership*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk2"]), 0.4)+Math.pow(Character.skills.hide+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk3"], 0.4)+Math.pow(Character.skills.aim+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk0"], 0.4))*100)/100 + " <img src='images\/fort\/battle\/defender_secondary.png'> " + Math.floor((10+Math.pow((Character.skills.leadership*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk2"]), 0.4)+Math.pow(Character.skills.hide+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk3"], 0.4)+Math.pow(Character.skills.dodge+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk1"], 0.4))*100)/100;
			 if(Character.characterClass == "soldier"){
				 fort_bonus_xhtml += " <img src='images\/fort\/battle\/leadsupport.png'> " + Math.floor(Math.pow((Character.skills.leadership+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk2"]/(PremiumBoni.hasBonus('character')?1.5:1.25))*(PremiumBoni.hasBonus('character')?0.5:0.25), 0.4)*100)/100;
			 }
			var healthPoints = ((9+Character.level)+(Character.skills.health+TWPro.twpro_jobs[twpro_selectedJob].twpro_aps_fb["sk4"])*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?2:1.5):1))*10;
			if(healthPoints < Character.get_health()) healthPoints = '<div style="display:inline;color:red">'+healthPoints+'</div>';
			 fort_bonus_xhtml += " <img width='13' height='12' style='background: url(\/images\/charstats.png) no-repeat -76px -22px;' src='images\/transparent.png'> "+healthPoints+"<\/div><\/div>";
			 specialMessageDiv_fb = document.getElementById("twpro_specialMessage_fb");
			 if(!specialMessageDiv_fb){
				specialMessageDiv_fb = document.createElement("div");
				specialMessageDiv_fb.id = "twpro_specialMessage_fb";
				specialMessageDiv_fb.style.cssText = "position: absolute; font-size: 10px; color:#000000; top: 55px; left: 3px; width: 100px; z-index: 1; font-weight:normal; text-align:center;";
				document.getElementById("window_inventory_content").appendChild(specialMessageDiv_fb);
			 }
			 specialMessageDiv_fb.innerHTML = "<div id='fort_bonus_popup_act' style='position: relative; left:0px; top:7px'><img src='images/fort/battle/attacker_secondary.png'> "+Math.floor((25+Math.pow((Character.skills.leadership+Character.bonus.skills_total.leadership)*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1), 0.4)+Math.pow(Character.skills.hide+Character.bonus.skills_total.hide, 0.4)+Math.pow(Character.skills.aim+Character.bonus.skills_total.aim, 0.4))*100)/100 + " <img src='images\/fort\/battle\/defender_secondary.png'> " + Math.floor((10+Math.pow((Character.skills.leadership+Character.bonus.skills_total.leadership)*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1), 0.4)+Math.pow(Character.skills.hide+Character.bonus.skills_total.hide, 0.4)+Math.pow(Character.skills.dodge+Character.bonus.skills_total.dodge, 0.4))*100)/100;
			 if(Character.characterClass == "soldier"){
				 document.getElementById("fort_bonus_popup_act").style.top = "1px"
				 specialMessageDiv_fb.innerHTML += " <img src='images\/fort\/battle\/leadsupport.png'> " + Math.floor(Math.pow((Character.skills.leadership+Character.bonus.skills_total.leadership)*(PremiumBoni.hasBonus('character')?0.5:0.25), 0.4)*100)/100;
			 }
			 specialMessageDiv_fb.innerHTML += "&nbsp;<\/div>";
			return fort_bonus_xhtml;
		}
	};

{ // Duelconverter and Fort Message
	
function makefortmessage(twpro_fort_elementin){
var twpro_fort_elementid=twpro_fort_elementin.id;
var twpro_fort_instructions=twpro_fort_elementid.replace('window_fort_battlepage','fortbattle_placement_map')+"_instructions";
var tmparray3=document.getElementById(twpro_fort_instructions).getElementsByTagName('a');
var tmparray3=tmparray3[0].parentNode;
var twpro_fort_divplayerid=twpro_fort_elementid.replace('window_fort_battlepage','fortbattle_placement_map')+"_playerlistdiv";
n = new Element('a', {'href': "javascript:makefortlist('"+twpro_fort_divplayerid+"');", 'style':'cursor: pointer;'});
n.innerHTML="<br/><br/>"+TWPro.lang.FORTMESSAGE;
tmparray3.appendChild(n);
}

function makefortlist(twpro_fort_divplayerid){
var tmparray2=document.getElementById(twpro_fort_divplayerid).childNodes;
alert(TWPro.lang.FORTMESSAGERCP+':\n'+tmparray2.length);
var fortplayerlist=tmparray2[0].innerHTML;
for (var j = 1 ; j < tmparray2.length ; j++){
	if (tmparray2[j].innerHTML == Character.name){
} else {
	fortplayerlist +=";"+tmparray2[j].innerHTML;
}
}
AjaxWindow.show('messages',{addressee:fortplayerlist});
}


function makeadvicemessage(twpro_advice_elementin, data){
var twpro_advice_elementid=twpro_advice_elementin.id;
data = data.replace(/Saloon<\/h2>/, '$&<a onclick="makeadvicelist(\''+twpro_advice_elementid+'\');" href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">Mensaje</span><span class="button_right"></span><span style="clear:both"></span></a><br>');
return data;
}

function makeadvicelist(twpro_advice_elementid){
 var tbl=document.getElementById(twpro_advice_elementid).getElementsByTagName('table');
 tbl = tbl[2].getElementsByTagName('a');
 var adviceplayerlist = tbl[0].innerHTML; 
 for (var i=1;i<tbl.length;i++){
 if (tbl[i].href.search(/profile/) != -1) {
 adviceplayerlist += ';'+tbl[i].innerHTML;
 }
}
AjaxWindow.show('messages',{addressee:adviceplayerlist});
}

	{ // Duelconverter by Lekensteyn
		function convertduelreport(winname, data){
			if(data && data.indexOf("Reports.switchDuel") > 0){
				data = data.replace(/"ReportPublish\.selectPublish.+?\n\s+.+?\n\s+.+?\n\s+<\/th>/, '$&<th style="width:20px"><a onclick="convertduelreportfunc(\''+winname+'\');" href="javascript:void(0);"><img src="/images/forum/icon/spanner.png" alt="'+TWPro.lang.CONVERT+'" title="'+TWPro.lang.CONVERT+'"></a></th>');
			}
			return data;
		}
		function convertduelreportfunc(dc) {
			var dce = document.getElementById(dc);
			if(document.getElementById(dc+'_cnv')) return;
			if (dce.innerHTML.indexOf('images/report/attacker.png') != -1) {
				var duel = duellers = avatars = place = '';
				var tbl = dce.getElementsByTagName('table');
				var k = 0;
				var si = tbl[2].rows[0].cells;
				var s1 = si[0].getElementsByTagName('strong');
				var s2 = si[5].getElementsByTagName('strong');
				var ex = '[player]'+s1[0].firstChild.innerHTML+'[/player]';
				if(s1.length > 1) ex += ' ('+s1[1].innerHTML+')';
				ex += " \u2015 ";
				if(s2[0].getElementsByTagName('a').length){
					ex += '[player]'+s2[0].getElementsByTagName('a')[0].innerHTML.replace(/^\s+|\s+$/g, '')+'[/player]';
				}
				else{
					ex += '[b]'+s2[0].innerHTML.replace(/^\s+|\s+$/g, '')+'[/b]';
				}
				if(s2.length > 1) ex += ' ('+s2[1].innerHTML+')';
				ex += "\n";
				ex += '[img]'+si[1].getElementsByTagName('img')[0].src+'[/img]';
				ex += '[img]'+si[2].getElementsByTagName('img')[0].src+'[/img]';
				ex += '[img]/images/jobs/duell.png[/img]';
				ex += '[img]'+si[3].getElementsByTagName('img')[0].src+'[/img]';
				ex += '[img]'+si[4].getElementsByTagName('img')[0].src+'[/img]';
				ex += '\n__________________________________________________\n';
				var dh = tbl[3].rows;
				var bpa = {
					'0px 0px': 'http://img43.imageshack.us/img43/3745/nohitatt.png',
					'0px -78px': 'http://img196.imageshack.us/img196/6343/haedatt.png',
					'0px -156px': 'http://img269.imageshack.us/img269/382/rightscatt.png',
					'0px -234px': 'http://img195.imageshack.us/img195/8398/leftscatt.png',
					'0px -312px': 'http://img39.imageshack.us/img39/1285/righthaatt.png',
					'0px -390px': 'http://img35.imageshack.us/img35/3261/lefthaatt.png',
					'0px -468px': 'http://img32.imageshack.us/img32/1503/winatt.png',
					'0px -546px': 'http://img193.imageshack.us/img193/1825/loseatt.png',
					'0px -624px': 'http://img9.imageshack.us/img9/5177/leftdie.png'
				};
				var bpd = {
					'0px 0px': 'http://img196.imageshack.us/img196/5995/nohitdeff.png',
					'0px -78px': 'http://img39.imageshack.us/img39/6522/haeddeff.png',
					'0px -156px': 'http://img195.imageshack.us/img195/8905/rightscdeff.png',
					'0px -234px': 'http://img32.imageshack.us/img32/9089/leftscdeff.png',
					'0px -312px': 'http://img35.imageshack.us/img35/3111/righthadeff.png',
					'0px -390px': 'http://img269.imageshack.us/img269/7476/lefthadeff.png',
					'0px -468px': 'http://img193.imageshack.us/img193/7641/windeff.png',
					'0px -546px': 'http://img194.imageshack.us/img194/8311/losedeff.png',
					'0px -624px': 'http://img30.imageshack.us/img30/8627/rightdie.png'
				};
				for(var i=0; i<dh.length; i++){
					if(i == dh.length-1){
						ex += '[b]_______________'+TWPro.lang.HPTOTAL+':_______________[/b]\n';
					}
					var d1 = dh[i].cells[0].getElementsByTagName('span');
					if(d1.length > 1){
						d1 = d1[1].innerHTML;
						if(d1.length < 9){
							d1 = '[color=#D3C6AF]'+(new Array(10-d1.length)).join('0')+'[/color][color=red]'+d1;
						}
						else{
							d1 = '[color=red]'+d1;
						}
						ex += '[b][size=17]'+d1+' [/color][/size][/b]';
					}
					else{
						ex += '[size=17][color=#D3C6AF]0000000[/color]0 [/size]';
					}
					var dud = dh[i].cells[1].getElementsByTagName('div');
					ex += '[img]'+bpa[dud[1].style.backgroundPosition]+'[/img][img]'+bpd[dud[2].style.backgroundPosition]+'[/img]';
					var d2 = dh[i].cells[2].getElementsByTagName('span');
					if(d2.length > 1){
						ex += '[b][size=17][color=blue]'+d2[1].innerHTML+'[/color][/size][/b]';
					}
					else{
						ex += '[size=17][color=#D3C6AF]0000[/color]0 [/size]';
					}
					ex += '\n';
				}
				ex += '[b][size=16]'+dce.getElementsByTagName('h4')[0].innerHTML+'[/size][/b]';
				var dd = document.createElement('div');
				dd.style.cssText = 'overflow: auto; position: relative; height: 340px; padding: 5px;';
				dd.id = dc+'_cnv';
				dd.innerHTML = '<img src="/img.php?type=button&subtype=normal&value=back" alt="Back" style="float:right;cursor:pointer" onclick="this.parentNode.previousSibling.style.display=\'\';this.parentNode.parentNode.removeChild(this.parentNode);">BB Code: <br><textarea rows="10" cols="40"  style="width:85%;height:80%;background-image: url(images/muster.jpg);margin-left:auto;margin-right:auto;" onfocus="this.select();" readonly="readonly">' + ex + "</textarea>";
				var bf = tbl[2].parentNode.nextSibling;
				bf.previousSibling.style.display = 'none';
				bf.parentNode.insertBefore(dd, bf);
			}
	
		}
	}
}
//if ((window.location.href.indexOf('.the-west.') != -1 || window.location.href.indexOf('tw.innogames.net') != -1) && window.location.href.indexOf('game') != -1) {
	/*
Diese Script wird von http://www.tw-pro.de/ bereitgestellt.
Es gelten die im Impressum http://www.tw-pro.de/?site=impressum hinterlegten rechtlichen Hinweise.
Insbesondere bedarf eine Veraenderung, Weitergabe oder eine eigene Veroeffentlichung dieses Scripts
oder Teilen davon einer schriftlichen Genehmigung des Autors. Das Copyright liegt beim Autor.
*/
	
	// manipuliert interne Funktionen und fuegt eigene Aufrufe ein
	function twpro_injectScript() {
		var style = document.createElement('style'),
			css = '.twpro_search_hide{display:none;}.twpro_setinfo_entry{margin:5px;border:1px solid #32201A;padding:2px;}.twpro_setinfo_name_clicker{cursor:pointer;color:#523E30;}.twpro_setinfo_set{background:url(../images/messages/post-bgr.jpg) repeat scroll 0 0 transparent;margin-left:10px;}.twpro_setinfo_xitems{margin-left:-5px;padding:0;}.wear_yield_highlight_red{background-image:url('+twpro_css_bagRed+');}.wear_yield_highlight_green{background-image:url('+twpro_css_bagGreen+');}.wear_yield_highlight_blue{background-image:url('+twpro_css_bagBlue+');}#minimap_micro{background-image:url('+twpro_minimap_coord+');}';
		style.setAttribute('type', 'text/css');
		if(style.styleSheet){ // IE
			style.styleSheet.cssText = css;
		}
		else{
			style.appendChild(document.createTextNode(css));
		}
			document.getElementsByTagName('head')[0].appendChild(style);

			TWPro.debug_log = function(msg) {
				if (console && console.log) {
					console.log(msg);
				}
			};
			TWPro.debug = {
				unknown_jobs: {},
				unknown_jobs_count: 0
			};
		/*	TWPro.locationSharp = location.href.replace(/^([^#]+)#?/, '$1')+"#";
			TWPro.hrefSharpToJSVoid = window.setInterval(function(){for(var a=document.getElementsByTagName("a"),i=a.length-1;i>=0;i--)if(a[i].href==TWPro.locationSharp) a[i].href="javascript:void(0);";}, 200);
			try{
				WMap.recalcMarker = eval('('+WMap.recalcMarker.toString().replace(/"#"/g, '"javascript:void(0);"')+')');
			}catch(e){} */
			
		// BEGIN implementation of setZeroTimeout // Copyright (c) 2010, The Mozilla Foundation
		// Only add setZeroTimeout to the window object, and hide everything
		// else in a closure.
		(function() {
			var timeouts = [];
			var messageName = "zero-timeout-message";

			// Like setTimeout, but only takes a function argument.  There's
			// no time argument (always zero) and no arguments (you have to
			// use a closure).
			function setZeroTimeout(fn) {
				timeouts.push(fn);
				window.postMessage(messageName, "*");
			}

			function handleMessage(event) {
				if (event.source == window && event.data == messageName) {
					event.stopPropagation();
					if (timeouts.length > 0) {
						var fn = timeouts.shift();
						fn();
					}
				}
			}

			window.addEventListener("message", handleMessage, true);

			// Add the one thing we want added to the window object.
			window.setZeroTimeout = setZeroTimeout;
		})();

		// END implementation of setZeroTimeout	

		// Blinks tab when Safe mode is completed.
		twpro_blinkTab={
			oldTitle:null,
			timer:null,
			bit:0,
			title:null,
			blink:function(title){
				if(twpro_blinkTab.oldTitle!=null)return;
				if(title){twpro_blinkTab.oldTitle=document.title;twpro_blinkTab.title=title;}
				if(title){twpro_blinkTab.timer=setInterval(twpro_blinkTab.blinkTitle,1000);}
				window.addEvent('focus',twpro_blinkTab.stop);
				document.body.addEvent('click',twpro_blinkTab.stop);
			},
			stop:function(){
				if(twpro_blinkTab.timer){
					clearInterval(twpro_blinkTab.timer);
					if(TitleTicker.lasttitle == twpro_blinkTab.oldTitle){document.title=TitleTicker.lasttitle;}else{TitleTicker.tick();}
				}
				twpro_blinkTab.oldTitle=null;
				window.removeEvent('focus',twpro_blinkTab.stop);
				document.body.removeEvent('click',twpro_blinkTab.stop);
			},
			blinkTitle:function(){
				if(++twpro_blinkTab.bit%2){
					document.title=twpro_blinkTab.title;
				}
				else{
					if(TitleTicker.lasttitle == twpro_blinkTab.oldTitle){document.title=TitleTicker.lasttitle;}else{TitleTicker.tick();}
				}
			}
		};
		
		TWPro.enablebbcodes = true;
		TWPro.twpro_calculated = false;
		TWPro.twpro_emptying_cache=false;
		TWPro.twpro_failure = false;
		TWPro.twpro_failureInject = false;
		TWPro.twpro_failureRollback = [];
		TWPro.twpro_active = true;
		TWPro.twpro_bestAnimal = 0;
		TWPro.damage_min = {left_arm:0, right_arm_shot:0, right_arm_hand: 0};
		TWPro.damage_max = {left_arm:0, right_arm_shot:0, right_arm_hand: 0};
		TWPro.damage_average = {left_arm:0, right_arm_shot:0, right_arm_hand: 0};
		TWPro.twpro_sorts = ['name', 'xp', 'wages', 'luck', 'comb', 'danger', 'laborp'];
		TWPro.twpro_health_priority = ['zero', 'low', 'medium', 'high', 'auto'];
		TWPro.twpro_battle_unit = ['skirmisher', 'lineinfantryman', 'marksman'];
		function getPCookie(n){var c='; '+document.cookie+';',s='; twpro_'+Character.playerId+'_'+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return'';b=b+s.length;e=c.indexOf(';',b);return decodeURIComponent(c.substring(b,e))}
		TWPro.prefs = {
			'Hide_unjobs': 1,
			'dispJobClothingOnly': 2,
			'multipliers': getPCookie('multipliers'),
				'hidejobs': getPCookie('hidejobs'),
				'disabledSets': getPCookie('disabledSets'),
				'customJobs': getPCookie('customJobs'),
				'battle_prefs': getPCookie('battle_prefs'),

				// remove later - start
				'defaultSorting': getPCookie('defaultSorting'),
				'chatColor': getPCookie('chatColor'),
				'usefulItemsPopup': getPCookie('usefulItemsPopup'),
				'useCache': getPCookie('useCache'),
				'cacheMethod': getPCookie('cacheMethod'),
				'splitFortbattle': getPCookie('splitFortbattle'),
				'splitFortbattle_subMenu': getPCookie('splitFortbattle_subMenu'),
				'showAllJobs': getPCookie('showAllJobs'),
				'collectorMode': getPCookie('collectorMode'),
				'safeMode': getPCookie('safeMode'),
				'safeMode_FBexcl': getPCookie('safeMode_FBexcl'),
				// remove later - end

				'settings_prefs': getPCookie('settings_prefs'),
		};
		TWPro.prefNumber = parseInt(getPCookie('prefs'), 10) || 0;
		TWPro.multipliers = {xp:1, wages:1, luck:1, danger:1};
		TWPro.battle_prefs = {healthPriority_att:'auto', battleUnit_att:'lineinfantryman', healthPriority_def:'auto', battleUnit_def:'lineinfantryman'};

		// remove later - start
		TWPro.settings_prefs = {defaultSorting:TWPro.prefs.defaultSorting||'name', chatColor:TWPro.prefs.chatColor||'', usefulItemsPopup:TWPro.prefs.usefulItemsPopup||'false', useCache:TWPro.prefs.useCache||'false', cacheMethod:TWPro.prefs.cacheMethod||'IndexedDB', splitFortbattle:TWPro.prefs.splitFortbattle||'false', splitFortbattle_subMenu:TWPro.prefs.splitFortbattle_subMenu||'false', showAllJobs:TWPro.prefs.showAllJobs||'false', collectorMode:TWPro.prefs.collectorMode||'false', safeMode:TWPro.prefs.safeMode||'false', safeMode_FBexcl:TWPro.prefs.safeMode_FBexcl||'false'};

		
		document.cookie = 'twpro_'+Character.playerId+'_defaultSorting=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		document.cookie = 'twpro_'+Character.playerId+'_chatColor=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		document.cookie = 'twpro_'+Character.playerId+'_usefulItemsPopup=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		document.cookie = 'twpro_'+Character.playerId+'_useCache=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		document.cookie = 'twpro_'+Character.playerId+'_cacheMethod=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		document.cookie = 'twpro_'+Character.playerId+'_splitFortbattle=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		document.cookie = 'twpro_'+Character.playerId+'_splitFortbattle_subMenu=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		document.cookie = 'twpro_'+Character.playerId+'_showAllJobs=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		document.cookie = 'twpro_'+Character.playerId+'_collectorMode=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		document.cookie = 'twpro_'+Character.playerId+'_safeMode=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		document.cookie = 'twpro_'+Character.playerId+'_safeMode_FBexcl=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
		// remove later - end

// uncomment later		
//		TWPro.settings_prefs = {defaultSorting:'name', chatColor:'', usefulItemsPopup:'false', useCache:'false', cacheMethod:'IndexedDB', splitFortbattle:'false', splitFortbattle_subMenu:'false', showAllJobs:'false', collectorMode:'false', safeMode:'false', safeMode_FBexcl:'false'};
		
		var multiplier,
			savedMultipliers = TWPro.twpro_preference('multipliers').split(':'),
				j=0,
				disabled = TWPro.twpro_preference('hidejobs').split('|'),
					battle_pref,
						savedBattle_prefs = TWPro.twpro_preference('battle_prefs').split(':'),
							savedSettings_prefs = TWPro.twpro_preference('settings_prefs').split('|');
		for(var i in TWPro.multipliers){
			multiplier = parseInt(savedMultipliers[j++], 10);
			if(!isNaN(multiplier)){
				TWPro.multipliers[i] = multiplier;
			}
		}
		j=0;
		for(var i in TWPro.battle_prefs){
			battle_pref = savedBattle_prefs[j++];
			if((battle_pref)){
				TWPro.battle_prefs[i] = battle_pref;
			}
		}
		if(savedSettings_prefs!=''){
			for(var i=0; i<savedSettings_prefs.length; i++){
				var settings_pref = [];
				settings_pref = savedSettings_prefs[i].split(':');
				TWPro.settings_prefs[settings_pref[0]] = settings_pref[1];
			}
		}
		// remove later - start
		else{
		TWPro.twpro_handleSettings_prefs('defaultSorting', TWPro.settings_prefs.defaultSorting);
		}
		// remove later - end

			try {
				TWPro.item_type_title = eval("(" + ItemPopup.prototype.getXHTML.toString().match(/var item_type_title\s*=\s*(\{[^}]+\})/)[1] + ")"),
				TWPro.item_sub_title = eval("(" + ItemPopup.prototype.getXHTML.toString().match(/var item_sub_title\s*=\s*(\{[^}]+\})/)[1] + ")");
			} catch (e) {
				TWPro.item_type_title = {};
				TWPro.item_sub_title = {};
			}


			TWPro.twpro_maps_jobs = ';';
			for (var i = 1; i < document.getElementById("minimap_job_id").options.length; i++) {
			  TWPro.twpro_maps_jobs += document.getElementById("minimap_job_id").options[i].value + ";";
			}

			TWPro.disabledJobs = {};
			for(var i=0;i<disabled.length; i++){
				TWPro.disabledJobs[disabled[i]] = true;
			}

		TWPro.cacheMethod = TWPro.settings_prefs['cacheMethod'];

		function twpro_WebStorage(namespace) {
			var object = this;
		
			object.storage = localStorage;
	  
			object.namespace = [namespace, "."].join("");
		
			object.setItem = function(key, value) {
				try {
					object.storage.setItem(escape([object.namespace, key].join("")), JSON.stringify(value));
				}
				catch(e) {
					if(typeof twpro_storage_error == 'undefined'){
					  //TWPro.twpro_preference('useCache',false);
					  TWPro.twpro_handleSettings_prefs('useCache','false');
					  //TWPro.prefs['useCache']=false;
					  twpro_storage_error = true;
					  TWPro.twpro_cache_status();
					  twproCache.setValue("TWPro.twpro_invHash", '');
					  if(!$("empty_cache_progress_webstorage")) TWPro.twpro_disableJobs();
					  TWPro.twpro_empty_cache_webstorage();
					  if (String(e).indexOf("QUOTA")!=-1) {
						  alert("TWPro: "+TWPro.lang.WEBSTORAGEQUOTAEXCEEDED);
					  }
					  else{
						  alert("TWPro WebStorage Cache, Unexpected Error: "+e);
					  }
					}
				}
			}
			object.getItem = function(key, defaultValue) {
				try {
					var value = object.storage.getItem(escape([object.namespace, key].join("")));
					if(value)
						return JSON.parse(value);
					else
						return defaultValue;
				}
				catch(e) {
					return defaultValue;
				}
			}
			object.removeItem = function(key) {
				try {
					object.storage.removeItem(escape([object.namespace, key].join("")));
				}
				catch(e) {
				}
			}
		}
  
		twproCache = {twproStorage:null,
		
			initialize: function(uid) {
				if(twproCache.twproStorage == null) {
					twproCache.twproStorage = new twpro_WebStorage("twproCache." + uid);
				}
			},
			setValue: function(key, value) {
				if(twproCache.twproStorage != null) {
					twproCache.twproStorage.setItem(key, value);
				}
			},
			getValue: function(key, defaultValue) {
				if(twproCache.twproStorage != null) {
					return twproCache.twproStorage.getItem(key, defaultValue);
				}
				else {
					return defaultValue;
				}
			},
			delValue: function(key) {
				if(twproCache.twproStorage != null) {
					twproCache.twproStorage.removeItem(key);
				}
			},
		};

		if(TWPro.settings_prefs['useCache']=='true'){
			twproCache.initialize(Character.playerId);
			TWPro.twpro_skillsHash = '';
		}

		function twpro_indexedDBStorage(namespace, func) {
			var object = this;
	  
			var twproDB = {};
			var indexedDB = window.indexedDB || window.webkitIndexedDB ||
							window.mozIndexedDB;
		
			if ('webkitIndexedDB' in window) {
			  window.IDBTransaction = window.webkitIDBTransaction;
			  window.IDBKeyRange = window.webkitIDBKeyRange;
			}
		
			if(indexedDB){
				twproDB.indexedDB = {};
				twproDB.indexedDB.db = null;
			
				twproDB.indexedDB.onerror = function(e) {
				  //console.log(e);
				  alert("TWPro Database error: "+JSON.stringify(e));
				  if($('twpro_jobList')){
					  $('twpro_jobList').disabled=false;
					  $("twpro_cache_button").parentNode.href="javascript:/*Click here to generate cache*/TWPro.twpro_generate_cache();";
				  }
				};
			  
				twproDB.indexedDB.open = function() {
					if($('twpro_jobList')){
						$('twpro_jobList').disabled=true;
						$("twpro_cache_button").parentNode.href="javascript:/*Preparing database*/void(0);";
					}
					var request = indexedDB.open("twprodb_som");
		  
					request.onsuccess = function(e) {
						var v = "1.00";
						twproDB.indexedDB.db = e.target.result;
						var db = twproDB.indexedDB.db;
						// We can only create Object stores in a setVersion transaction;
						//alert(twproDB.indexedDB.db.version);
						if(v!= twproDB.indexedDB.db.version) {
						  var setVrequest = db.setVersion(v);
						  // onsuccess is the only place we can create Object Stores
						  setVrequest.onfailure = twproDB.indexedDB.onerror;
						  setVrequest.onsuccess = function(e) {
							if(db.objectStoreNames.contains("twpro_som")) {
							  db.deleteObjectStore("twpro_som");
							}
							var store = db.createObjectStore("twpro_som", {keyPath: "char_id"});
							var emptyTransaction = db.transaction([], IDBTransaction.READ_ONLY);
							var store = emptyTransaction.objectStore("twpro_som");
						  };
						}
						if($('twpro_jobList')){
							$('twpro_jobList').disabled=false;
							$("twpro_cache_button").parentNode.href="javascript:/*Click here to generate cache*/TWPro.twpro_generate_cache();";
						}
						if(func) return func(true);
					};
					request.onfailure = twproDB.indexedDB.onerror;
					request.onerror = function(e) {
						twproDB.indexedDB.onerror(e);
						TWPro.twpro_handleSettings_prefs('useCache','false');
					}
				}
		  
				twproDB.indexedDB.open();
			
				object.namespace = [namespace, "."].join("");
		   
				object.setItem =  function (key, value){
				   var datas = {
					  "big_cache": value,
					  "char_id": escape([object.namespace, key].join(""))
				   };
				   var putTransaction = twproDB.indexedDB.db.transaction(["twpro_som"], IDBTransaction.READ_WRITE);
				   var putRequest = putTransaction.objectStore("twpro_som").put(datas);
				   putRequest.onsuccess = function(event){
					  //alert((event.target.result));
					  //event.target.result contains the value of the keyPath of the data written (the "key")
				   };
				   putRequest.onerror = function(e) {
						alert("TWPro Database writing error: "+JSON.stringify(e));
				   }
				}
		   
				object.getItem = function (key, func){
					if($('twpro_jobList')){
						$('twpro_jobList').disabled=true;
						$("twpro_cache_button").parentNode.href="javascript:/*Loading database*/void(0);";
					}
					var getTransaction =  twproDB.indexedDB.db.transaction(["twpro_som"], IDBTransaction.READ_ONLY);
					var getRequest = getTransaction.objectStore("twpro_som").get(escape([object.namespace, key].join("")));
					getRequest.onsuccess = function(event){
						//event.target.result contains the data object
						if(event.target.result){
							data=event.target.result.big_cache;
							//alert(func);
							//alert(JSON.stringify(data));
							if($('twpro_jobList')){
								$('twpro_jobList').disabled=false;
								$("twpro_cache_button").parentNode.href="javascript:/*Click here to generate cache*/TWPro.twpro_generate_cache();";
							}
							return func(data);
						}
						else{
							//alert("error loading data");
							TWPro.updateCache=true;
							if($('twpro_jobList')){
								$('twpro_jobList').disabled=false;
								$('twpro_jobList').style.backgroundColor = 'rgb(207, 195, 166)';
								$('twpro_jobList').innerHTML = '<option style="background-color: rgb(207, 195, 166);" id="twpro_wait" value="-1">'+TWPro.lang.CACHEGENERATE+'</option>';
								$('twpro_jobList').click="TWPro.twpro_clickList();";
								$("twpro_cache_button").parentNode.href="javascript:/*Click here to generate cache*/TWPro.twpro_generate_cache();";
							}
							twproCache.setValue("TWPro.twpro_invHash", '');
							TWPro.twpro_cache_status();
							return func(null);
						}
					};
				}
				
				object.removeItem = function(key, func) {
					var deleteTransaction =  twproDB.indexedDB.db.transaction(["twpro_som"], IDBTransaction.READ_WRITE);
	//				var deleteRequest = deleteTransaction.objectStore("twpro_som").delete(escape([object.namespace, key].join("")));
					eval("var deleteRequest = deleteTransaction.objectStore(\"twpro_som\").delete(escape([object.namespace, key].join(\"\")))"); //hack for Safari rejecting the delete command
					deleteRequest.onsuccess = function(event){
						return func();
					};
					// hack for Chrome that returns error instead of success when deleting a non-existing object (Chromium issue 90549)
					deleteRequest.onerror = function(event){
						return func();
					};
				}
			}
			else{
			  if(func) return func(false);
			}
		}
  
		twproCache_idb = {twproStorage:null,
		
			initialize: function(uid, func) {
				if(twproCache_idb.twproStorage == null) {
					twproCache_idb.twproStorage = new twpro_indexedDBStorage("twproCache_idb." + uid, func);
				}
			},
			setValue: function(key, value) {
				if(twproCache_idb.twproStorage != null) {
					twproCache_idb.twproStorage.setItem(key, value);
				}
			},
			getValue: function(key, func) {
				if(twproCache_idb.twproStorage != null) {
					return twproCache_idb.twproStorage.getItem(key, func);
				}
			},
			delValue: function(key, func) {
				if(twproCache_idb.twproStorage != null) {
					twproCache_idb.twproStorage.removeItem(key, func);
				}
			},
		};
  
		if(TWPro.settings_prefs['useCache']=='true' && TWPro.cacheMethod=="IndexedDB") twproCache_idb.initialize(Character.playerId);

//JobList[126] = new JobInfo('Palisade bauen', 'build_palisade', 300, '1 * skills.build + 1 * skills.punch + 1 * skills.endurance + 1 * skills.repair + 1 * skills.leadership + 0', 'Kräftige Stämme müssen in den Boden gerammt werden, um Schutz vor angreifern zu gewähren.', [null], [{'name': 'Random product', 'icon': 'images/items/unknown.png', 'short': ''},null]);

		TWPro.searchInventory = {timer:null};
		TWPro.searchTrader = {};
		TWPro.twpro_jobs = [];
		// Jobs
		{
			TWPro.twpro_jobValues = {};
			TWPro.twpro_jobValues.swine = {};
			TWPro.twpro_jobValues.swine.erfahrung = 1;
			TWPro.twpro_jobValues.swine.lohn = 3;
			TWPro.twpro_jobValues.swine.glueck = 0;
			TWPro.twpro_jobValues.swine.gefahr = 1;
			TWPro.twpro_jobValues.scarecrow = {};
			TWPro.twpro_jobValues.scarecrow.erfahrung = 3;
			TWPro.twpro_jobValues.scarecrow.lohn = 1;
			TWPro.twpro_jobValues.scarecrow.glueck = 2;
			TWPro.twpro_jobValues.scarecrow.gefahr = 20;
			TWPro.twpro_jobValues.wanted = {};
			TWPro.twpro_jobValues.wanted.erfahrung = 3;
			TWPro.twpro_jobValues.wanted.lohn = 2;
			TWPro.twpro_jobValues.wanted.glueck = 0;
			TWPro.twpro_jobValues.wanted.gefahr = 10;
			TWPro.twpro_jobValues.tabacco = {};
			TWPro.twpro_jobValues.tabacco.erfahrung = 1;
			TWPro.twpro_jobValues.tabacco.lohn = 6;
			TWPro.twpro_jobValues.tabacco.glueck = 2;
			TWPro.twpro_jobValues.tabacco.gefahr = 2;
			TWPro.twpro_jobValues.cotton = {};
			TWPro.twpro_jobValues.cotton.erfahrung = 4;
			TWPro.twpro_jobValues.cotton.lohn = 1;
			TWPro.twpro_jobValues.cotton.glueck = 0;
			TWPro.twpro_jobValues.cotton.gefahr = 3;
			TWPro.twpro_jobValues.sugar = {};
			TWPro.twpro_jobValues.sugar.erfahrung = 2;
			TWPro.twpro_jobValues.sugar.lohn = 5;
			TWPro.twpro_jobValues.sugar.glueck = 4;
			TWPro.twpro_jobValues.sugar.gefahr = 1;
			TWPro.twpro_jobValues.angle = {};
			TWPro.twpro_jobValues.angle.erfahrung = 0;
			TWPro.twpro_jobValues.angle.lohn = 1;
			TWPro.twpro_jobValues.angle.glueck = 6;
			TWPro.twpro_jobValues.angle.gefahr = 2;
			TWPro.twpro_jobValues.cereal = {};
			TWPro.twpro_jobValues.cereal.erfahrung = 6;
			TWPro.twpro_jobValues.cereal.lohn = 2;
			TWPro.twpro_jobValues.cereal.glueck = 2;
			TWPro.twpro_jobValues.cereal.gefahr = 4;
			TWPro.twpro_jobValues.berry = {};
			TWPro.twpro_jobValues.berry.erfahrung = 6;
			TWPro.twpro_jobValues.berry.lohn = 2;
			TWPro.twpro_jobValues.berry.glueck = 5;
			TWPro.twpro_jobValues.berry.gefahr = 6;
			TWPro.twpro_jobValues.sheeps = {};
			TWPro.twpro_jobValues.sheeps.erfahrung = 5;
			TWPro.twpro_jobValues.sheeps.lohn = 3;
			TWPro.twpro_jobValues.sheeps.glueck = 0;
			TWPro.twpro_jobValues.sheeps.gefahr = 2;
			TWPro.twpro_jobValues.newspaper = {};
			TWPro.twpro_jobValues.newspaper.erfahrung = 1;
			TWPro.twpro_jobValues.newspaper.lohn = 6;
			TWPro.twpro_jobValues.newspaper.glueck = 2;
			TWPro.twpro_jobValues.newspaper.gefahr = 1;
			TWPro.twpro_jobValues.cut = {};
			TWPro.twpro_jobValues.cut.erfahrung = 7;
			TWPro.twpro_jobValues.cut.lohn = 5;
			TWPro.twpro_jobValues.cut.glueck = 3;
			TWPro.twpro_jobValues.cut.gefahr = 3;
			TWPro.twpro_jobValues.grinding = {};
			TWPro.twpro_jobValues.grinding.erfahrung = 7;
			TWPro.twpro_jobValues.grinding.lohn = 11;
			TWPro.twpro_jobValues.grinding.glueck = 0;
			TWPro.twpro_jobValues.grinding.gefahr = 5;
			TWPro.twpro_jobValues.corn = {};
			TWPro.twpro_jobValues.corn.erfahrung = 7;
			TWPro.twpro_jobValues.corn.lohn = 4;
			TWPro.twpro_jobValues.corn.glueck = 8;
			TWPro.twpro_jobValues.corn.gefahr = 5;
			TWPro.twpro_jobValues.beans = {};
			TWPro.twpro_jobValues.beans.erfahrung = 7;
			TWPro.twpro_jobValues.beans.lohn = 9;
			TWPro.twpro_jobValues.beans.glueck = 4;
			TWPro.twpro_jobValues.beans.gefahr = 5;
			TWPro.twpro_jobValues.fort_guard = {};
			TWPro.twpro_jobValues.fort_guard.erfahrung = 9;
			TWPro.twpro_jobValues.fort_guard.lohn = 3;
			TWPro.twpro_jobValues.fort_guard.glueck = 2;
			TWPro.twpro_jobValues.fort_guard.gefahr = 7;
			TWPro.twpro_jobValues.tanning = {};
			TWPro.twpro_jobValues.tanning.erfahrung = 15;
			TWPro.twpro_jobValues.tanning.lohn = 12;
			TWPro.twpro_jobValues.tanning.glueck = 5;
			TWPro.twpro_jobValues.tanning.gefahr = 18;
			TWPro.twpro_jobValues.digging = {};
			TWPro.twpro_jobValues.digging.erfahrung = 3;
			TWPro.twpro_jobValues.digging.lohn = 11;
			TWPro.twpro_jobValues.digging.glueck = 5;
			TWPro.twpro_jobValues.digging.gefahr = 7;
			TWPro.twpro_jobValues.grave = {};
			TWPro.twpro_jobValues.grave.erfahrung = 12;
			TWPro.twpro_jobValues.grave.lohn = 16;
			TWPro.twpro_jobValues.grave.glueck = 22;
			TWPro.twpro_jobValues.grave.gefahr = 9;
			TWPro.twpro_jobValues.turkey = {};
			TWPro.twpro_jobValues.turkey.erfahrung = 14;
			TWPro.twpro_jobValues.turkey.lohn = 3;
			TWPro.twpro_jobValues.turkey.glueck = 7;
			TWPro.twpro_jobValues.turkey.gefahr = 21;
			TWPro.twpro_jobValues.rail = {};
			TWPro.twpro_jobValues.rail.erfahrung = 18;
			TWPro.twpro_jobValues.rail.lohn = 10;
			TWPro.twpro_jobValues.rail.glueck = 5;
			TWPro.twpro_jobValues.rail.gefahr = 10;
			TWPro.twpro_jobValues.cow = {};
			TWPro.twpro_jobValues.cow.erfahrung = 17;
			TWPro.twpro_jobValues.cow.lohn = 5;
			TWPro.twpro_jobValues.cow.glueck = 0;
			TWPro.twpro_jobValues.cow.gefahr = 11;
			TWPro.twpro_jobValues.fence = {};
			TWPro.twpro_jobValues.fence.erfahrung = 11;
			TWPro.twpro_jobValues.fence.lohn = 7;
			TWPro.twpro_jobValues.fence.glueck = 5;
			TWPro.twpro_jobValues.fence.gefahr = 6;
			TWPro.twpro_jobValues.saw = {};
			TWPro.twpro_jobValues.saw.erfahrung = 12;
			TWPro.twpro_jobValues.saw.lohn = 23;
			TWPro.twpro_jobValues.saw.glueck = 6;
			TWPro.twpro_jobValues.saw.gefahr = 32;
			TWPro.twpro_jobValues.stone = {};
			TWPro.twpro_jobValues.stone.erfahrung = 8;
			TWPro.twpro_jobValues.stone.lohn = 17;
			TWPro.twpro_jobValues.stone.glueck = 9;
			TWPro.twpro_jobValues.stone.gefahr = 33;
			TWPro.twpro_jobValues.straighten = {};
			TWPro.twpro_jobValues.straighten.erfahrung = 22;
			TWPro.twpro_jobValues.straighten.lohn = 8;
			TWPro.twpro_jobValues.straighten.glueck = 15;
			TWPro.twpro_jobValues.straighten.gefahr = 12;
			TWPro.twpro_jobValues.wood = {};
			TWPro.twpro_jobValues.wood.erfahrung = 5;
			TWPro.twpro_jobValues.wood.lohn = 18;
			TWPro.twpro_jobValues.wood.glueck = 2;
			TWPro.twpro_jobValues.wood.gefahr = 21;
			TWPro.twpro_jobValues.irrigation = {};
			TWPro.twpro_jobValues.irrigation.erfahrung = 13;
			TWPro.twpro_jobValues.irrigation.lohn = 7;
			TWPro.twpro_jobValues.irrigation.glueck = 15;
			TWPro.twpro_jobValues.irrigation.gefahr = 6;
			TWPro.twpro_jobValues.brand = {};
			TWPro.twpro_jobValues.brand.erfahrung = 25;
			TWPro.twpro_jobValues.brand.lohn = 8;
			TWPro.twpro_jobValues.brand.glueck = 0;
			TWPro.twpro_jobValues.brand.gefahr = 35;
			TWPro.twpro_jobValues.wire = {};
			TWPro.twpro_jobValues.wire.erfahrung = 13;
			TWPro.twpro_jobValues.wire.lohn = 17;
			TWPro.twpro_jobValues.wire.glueck = 6;
			TWPro.twpro_jobValues.wire.gefahr = 0;
			TWPro.twpro_jobValues.dam = {};
			TWPro.twpro_jobValues.dam.erfahrung = 18;
			TWPro.twpro_jobValues.dam.lohn = 4;
			TWPro.twpro_jobValues.dam.glueck = 9;
			TWPro.twpro_jobValues.dam.gefahr = 41;
			TWPro.twpro_jobValues.gems = {};
			TWPro.twpro_jobValues.gems.erfahrung = 7;
			TWPro.twpro_jobValues.gems.lohn = 25;
			TWPro.twpro_jobValues.gems.glueck = 8;
			TWPro.twpro_jobValues.gems.gefahr = 4;
			TWPro.twpro_jobValues.claim = {};
			TWPro.twpro_jobValues.claim.erfahrung = 4;
			TWPro.twpro_jobValues.claim.lohn = 31;
			TWPro.twpro_jobValues.claim.glueck = 4;
			TWPro.twpro_jobValues.claim.gefahr = 29;
			TWPro.twpro_jobValues.chuck_wagon = {};
			TWPro.twpro_jobValues.chuck_wagon.erfahrung = 23;
			TWPro.twpro_jobValues.chuck_wagon.lohn = 5;
			TWPro.twpro_jobValues.chuck_wagon.glueck = 42;
			TWPro.twpro_jobValues.chuck_wagon.gefahr = 11;
			TWPro.twpro_jobValues.break_in = {};
			TWPro.twpro_jobValues.break_in.erfahrung = 32;
			TWPro.twpro_jobValues.break_in.lohn = 13;
			TWPro.twpro_jobValues.break_in.glueck = 10;
			TWPro.twpro_jobValues.break_in.gefahr = 52;
			TWPro.twpro_jobValues.trade = {};
			TWPro.twpro_jobValues.trade.erfahrung = 3;
			TWPro.twpro_jobValues.trade.lohn = 15;
			TWPro.twpro_jobValues.trade.glueck = 25;
			TWPro.twpro_jobValues.trade.gefahr = 12;
			TWPro.twpro_jobValues.mast = {};
			TWPro.twpro_jobValues.mast.erfahrung = 25;
			TWPro.twpro_jobValues.mast.lohn = 21;
			TWPro.twpro_jobValues.mast.glueck = 3;
			TWPro.twpro_jobValues.mast.gefahr = 14;
			TWPro.twpro_jobValues.spring = {};
			TWPro.twpro_jobValues.spring.erfahrung = 33;
			TWPro.twpro_jobValues.spring.lohn = 9;
			TWPro.twpro_jobValues.spring.glueck = 23;
			TWPro.twpro_jobValues.spring.gefahr = 19;
			TWPro.twpro_jobValues.beaver = {};
			TWPro.twpro_jobValues.beaver.erfahrung = 17;
			TWPro.twpro_jobValues.beaver.lohn = 32;
			TWPro.twpro_jobValues.beaver.glueck = 6;
			TWPro.twpro_jobValues.beaver.gefahr = 21;
			TWPro.twpro_jobValues.coal = {};
			TWPro.twpro_jobValues.coal.erfahrung = 14;
			TWPro.twpro_jobValues.coal.lohn = 30;
			TWPro.twpro_jobValues.coal.glueck = 0;
			TWPro.twpro_jobValues.coal.gefahr = 13;
			TWPro.twpro_jobValues["print"] = {};
			TWPro.twpro_jobValues["print"].erfahrung = 20;
			TWPro.twpro_jobValues["print"].lohn = 30;
			TWPro.twpro_jobValues["print"].glueck = 5;
			TWPro.twpro_jobValues["print"].gefahr = 7;
			TWPro.twpro_jobValues.fishing = {};
			TWPro.twpro_jobValues.fishing.erfahrung = 23;
			TWPro.twpro_jobValues.fishing.lohn = 6;
			TWPro.twpro_jobValues.fishing.glueck = 23;
			TWPro.twpro_jobValues.fishing.gefahr = 38;
			TWPro.twpro_jobValues.trainstation = {};
			TWPro.twpro_jobValues.trainstation.erfahrung = 47;
			TWPro.twpro_jobValues.trainstation.lohn = 12;
			TWPro.twpro_jobValues.trainstation.glueck = 7;
			TWPro.twpro_jobValues.trainstation.gefahr = 15;
			TWPro.twpro_jobValues.windmeel = {};
			TWPro.twpro_jobValues.windmeel.erfahrung = 43;
			TWPro.twpro_jobValues.windmeel.lohn = 42;
			TWPro.twpro_jobValues.windmeel.glueck = 6;
			TWPro.twpro_jobValues.windmeel.gefahr = 18;
			TWPro.twpro_jobValues.explore = {};
			TWPro.twpro_jobValues.explore.erfahrung = 45;
			TWPro.twpro_jobValues.explore.lohn = 1;
			TWPro.twpro_jobValues.explore.glueck = 22;
			TWPro.twpro_jobValues.explore.gefahr = 37;
			TWPro.twpro_jobValues["float"] = {};
			TWPro.twpro_jobValues["float"].erfahrung = 45;
			TWPro.twpro_jobValues["float"].lohn = 23;
			TWPro.twpro_jobValues["float"].glueck = 0;
			TWPro.twpro_jobValues["float"].gefahr = 52;
			TWPro.twpro_jobValues.bridge = {};
			TWPro.twpro_jobValues.bridge.erfahrung = 33;
			TWPro.twpro_jobValues.bridge.lohn = 17;
			TWPro.twpro_jobValues.bridge.glueck = 18;
			TWPro.twpro_jobValues.bridge.gefahr = 53;
			TWPro.twpro_jobValues.springe = {};
			TWPro.twpro_jobValues.springe.erfahrung = 45;
			TWPro.twpro_jobValues.springe.lohn = 29;
			TWPro.twpro_jobValues.springe.glueck = 0;
			TWPro.twpro_jobValues.springe.gefahr = 42;
			TWPro.twpro_jobValues.coffin = {};
			TWPro.twpro_jobValues.coffin.erfahrung = 8;
			TWPro.twpro_jobValues.coffin.lohn = 42;
			TWPro.twpro_jobValues.coffin.glueck = 15;
			TWPro.twpro_jobValues.coffin.gefahr = 20;
			TWPro.twpro_jobValues.dynamite = {};
			TWPro.twpro_jobValues.dynamite.erfahrung = 12;
			TWPro.twpro_jobValues.dynamite.lohn = 23;
			TWPro.twpro_jobValues.dynamite.glueck = 64;
			TWPro.twpro_jobValues.dynamite.gefahr = 93;
			TWPro.twpro_jobValues.coyote = {};
			TWPro.twpro_jobValues.coyote.erfahrung = 43;
			TWPro.twpro_jobValues.coyote.lohn = 15;
			TWPro.twpro_jobValues.coyote.glueck = 26;
			TWPro.twpro_jobValues.coyote.gefahr = 45;
			TWPro.twpro_jobValues.buffalo = {};
			TWPro.twpro_jobValues.buffalo.erfahrung = 62;
			TWPro.twpro_jobValues.buffalo.lohn = 24;
			TWPro.twpro_jobValues.buffalo.glueck = 0;
			TWPro.twpro_jobValues.buffalo.gefahr = 72;
			TWPro.twpro_jobValues.fort = {};
			TWPro.twpro_jobValues.fort.erfahrung = 71;
			TWPro.twpro_jobValues.fort.lohn = 33;
			TWPro.twpro_jobValues.fort.glueck = 17;
			TWPro.twpro_jobValues.fort.gefahr = 35;
			TWPro.twpro_jobValues.indians = {};
			TWPro.twpro_jobValues.indians.erfahrung = 14;
			TWPro.twpro_jobValues.indians.lohn = 11;
			TWPro.twpro_jobValues.indians.glueck = 63;
			TWPro.twpro_jobValues.indians.gefahr = 34;
			TWPro.twpro_jobValues.clearing = {};
			TWPro.twpro_jobValues.clearing.erfahrung = 8;
			TWPro.twpro_jobValues.clearing.lohn = 62;
			TWPro.twpro_jobValues.clearing.glueck = 9;
			TWPro.twpro_jobValues.clearing.gefahr = 16;
			TWPro.twpro_jobValues.silver = {};
			TWPro.twpro_jobValues.silver.erfahrung = 8;
			TWPro.twpro_jobValues.silver.lohn = 76;
			TWPro.twpro_jobValues.silver.glueck = 0;
			TWPro.twpro_jobValues.silver.gefahr = 32;
			TWPro.twpro_jobValues.diligence_guard = {};
			TWPro.twpro_jobValues.diligence_guard.erfahrung = 77;
			TWPro.twpro_jobValues.diligence_guard.lohn = 34;
			TWPro.twpro_jobValues.diligence_guard.glueck = 45;
			TWPro.twpro_jobValues.diligence_guard.gefahr = 43;
			TWPro.twpro_jobValues.wolf = {};
			TWPro.twpro_jobValues.wolf.erfahrung = 63;
			TWPro.twpro_jobValues.wolf.lohn = 21;
			TWPro.twpro_jobValues.wolf.glueck = 15;
			TWPro.twpro_jobValues.wolf.gefahr = 67;
			TWPro.twpro_jobValues.track = {};
			TWPro.twpro_jobValues.track.erfahrung = 60;
			TWPro.twpro_jobValues.track.lohn = 10;
			TWPro.twpro_jobValues.track.glueck = 30;
			TWPro.twpro_jobValues.track.gefahr = 33;
			TWPro.twpro_jobValues.ox = {};
			TWPro.twpro_jobValues.ox.erfahrung = 34;
			TWPro.twpro_jobValues.ox.lohn = 64;
			TWPro.twpro_jobValues.ox.glueck = 18;
			TWPro.twpro_jobValues.ox.gefahr = 43;
			TWPro.twpro_jobValues.guard = {};
			TWPro.twpro_jobValues.guard.erfahrung = 35;
			TWPro.twpro_jobValues.guard.lohn = 25;
			TWPro.twpro_jobValues.guard.glueck = 38;
			TWPro.twpro_jobValues.guard.gefahr = 4;
			TWPro.twpro_jobValues.bible = {};
			TWPro.twpro_jobValues.bible.erfahrung = 61;
			TWPro.twpro_jobValues.bible.lohn = 5;
			TWPro.twpro_jobValues.bible.glueck = 52;
			TWPro.twpro_jobValues.bible.gefahr = 77;
			TWPro.twpro_jobValues.ponyexpress = {};
			TWPro.twpro_jobValues.ponyexpress.erfahrung = 48;
			TWPro.twpro_jobValues.ponyexpress.lohn = 15;
			TWPro.twpro_jobValues.ponyexpress.glueck = 51;
			TWPro.twpro_jobValues.ponyexpress.gefahr = 44;
			TWPro.twpro_jobValues.weapons = {};
			TWPro.twpro_jobValues.weapons.erfahrung = 35;
			TWPro.twpro_jobValues.weapons.lohn = 15;
			TWPro.twpro_jobValues.weapons.glueck = 72;
			TWPro.twpro_jobValues.weapons.gefahr = 82;
			TWPro.twpro_jobValues.dead = {};
			TWPro.twpro_jobValues.dead.erfahrung = 14;
			TWPro.twpro_jobValues.dead.lohn = 14;
			TWPro.twpro_jobValues.dead.glueck = 90;
			TWPro.twpro_jobValues.dead.gefahr = 34;
			TWPro.twpro_jobValues.grizzly = {};
			TWPro.twpro_jobValues.grizzly.erfahrung = 78;
			TWPro.twpro_jobValues.grizzly.lohn = 25;
			TWPro.twpro_jobValues.grizzly.glueck = 35;
			TWPro.twpro_jobValues.grizzly.gefahr = 71;
			TWPro.twpro_jobValues.oil = {};
			TWPro.twpro_jobValues.oil.erfahrung = 25;
			TWPro.twpro_jobValues.oil.lohn = 83;
			TWPro.twpro_jobValues.oil.glueck = 20;
			TWPro.twpro_jobValues.oil.gefahr = 7;
			TWPro.twpro_jobValues.treasure_hunting = {};
			TWPro.twpro_jobValues.treasure_hunting.erfahrung = 20;
			TWPro.twpro_jobValues.treasure_hunting.lohn = 20;
			TWPro.twpro_jobValues.treasure_hunting.glueck = 83;
			TWPro.twpro_jobValues.treasure_hunting.gefahr = 24;
			TWPro.twpro_jobValues.army = {};
			TWPro.twpro_jobValues.army.erfahrung = 76;
			TWPro.twpro_jobValues.army.lohn = 55;
			TWPro.twpro_jobValues.army.glueck = 17;
			TWPro.twpro_jobValues.army.gefahr = 35;
			TWPro.twpro_jobValues.steal = {};
			TWPro.twpro_jobValues.steal.erfahrung = 50;
			TWPro.twpro_jobValues.steal.lohn = 48;
			TWPro.twpro_jobValues.steal.glueck = 74;
			TWPro.twpro_jobValues.steal.gefahr = 66;
			TWPro.twpro_jobValues.mercenary = {};
			TWPro.twpro_jobValues.mercenary.erfahrung = 52;
			TWPro.twpro_jobValues.mercenary.lohn = 92;
			TWPro.twpro_jobValues.mercenary.glueck = 23;
			TWPro.twpro_jobValues.mercenary.gefahr = 65;
			TWPro.twpro_jobValues.bandits = {};
			TWPro.twpro_jobValues.bandits.erfahrung = 75;
			TWPro.twpro_jobValues.bandits.lohn = 28;
			TWPro.twpro_jobValues.bandits.glueck = 85;
			TWPro.twpro_jobValues.bandits.gefahr = 83;
			TWPro.twpro_jobValues.aggression = {};
			TWPro.twpro_jobValues.aggression.erfahrung = 27;
			TWPro.twpro_jobValues.aggression.lohn = 78;
			TWPro.twpro_jobValues.aggression.glueck = 78;
			TWPro.twpro_jobValues.aggression.gefahr = 86;
			TWPro.twpro_jobValues.diligence_aggression = {};
			TWPro.twpro_jobValues.diligence_aggression.erfahrung = 73;
			TWPro.twpro_jobValues.diligence_aggression.lohn = 43;
			TWPro.twpro_jobValues.diligence_aggression.glueck = 95;
			TWPro.twpro_jobValues.diligence_aggression.gefahr = 67;
			TWPro.twpro_jobValues.bounty = {};
			TWPro.twpro_jobValues.bounty.erfahrung = 32;
			TWPro.twpro_jobValues.bounty.lohn = 92;
			TWPro.twpro_jobValues.bounty.glueck = 79;
			TWPro.twpro_jobValues.bounty.gefahr = 72;
			TWPro.twpro_jobValues.captured = {};
			TWPro.twpro_jobValues.captured.erfahrung = 69;
			TWPro.twpro_jobValues.captured.lohn = 23;
			TWPro.twpro_jobValues.captured.glueck = 85;
			TWPro.twpro_jobValues.captured.gefahr = 44;
			TWPro.twpro_jobValues.train = {};
			TWPro.twpro_jobValues.train.erfahrung = 87;
			TWPro.twpro_jobValues.train.lohn = 67;
			TWPro.twpro_jobValues.train.glueck = 92;
			TWPro.twpro_jobValues.train.gefahr = 96;
			TWPro.twpro_jobValues.burglary = {};
			TWPro.twpro_jobValues.burglary.erfahrung = 34;
			TWPro.twpro_jobValues.burglary.lohn = 80;
			TWPro.twpro_jobValues.burglary.glueck = 81;
			TWPro.twpro_jobValues.burglary.gefahr = 26;
			TWPro.twpro_jobValues.quackery = {};
			TWPro.twpro_jobValues.quackery.erfahrung = 50;
			TWPro.twpro_jobValues.quackery.lohn = 65;
			TWPro.twpro_jobValues.quackery.glueck = 52;
			TWPro.twpro_jobValues.quackery.gefahr = 67;
			TWPro.twpro_jobValues.peace = {};
			TWPro.twpro_jobValues.peace.erfahrung = 68;
			TWPro.twpro_jobValues.peace.lohn = 33;
			TWPro.twpro_jobValues.peace.glueck = 76;
			TWPro.twpro_jobValues.peace.gefahr = 44;
			TWPro.twpro_jobValues.ship = {};
			TWPro.twpro_jobValues.ship.erfahrung = 35;
			TWPro.twpro_jobValues.ship.lohn = 82;
			TWPro.twpro_jobValues.ship.glueck = 15;
			TWPro.twpro_jobValues.ship.gefahr = 14;
			TWPro.twpro_jobValues.smuggle = {};
			TWPro.twpro_jobValues.smuggle.erfahrung = 45;
			TWPro.twpro_jobValues.smuggle.lohn = 62;
			TWPro.twpro_jobValues.smuggle.glueck = 83;
			TWPro.twpro_jobValues.smuggle.gefahr = 56;
			TWPro.twpro_jobValues.ranch = {};
			TWPro.twpro_jobValues.ranch.erfahrung = 61;
			TWPro.twpro_jobValues.ranch.lohn = 28;
			TWPro.twpro_jobValues.ranch.glueck = 17;
			TWPro.twpro_jobValues.ranch.gefahr = 24;
			TWPro.twpro_jobValues.iron = {};
			TWPro.twpro_jobValues.iron.erfahrung = 32;
			TWPro.twpro_jobValues.iron.lohn = 52;
			TWPro.twpro_jobValues.iron.glueck = 15;
			TWPro.twpro_jobValues.iron.gefahr = 29;
			TWPro.twpro_jobValues.agave = {};
			TWPro.twpro_jobValues.agave.erfahrung = 42;
			TWPro.twpro_jobValues.agave.lohn = 25;
			TWPro.twpro_jobValues.agave.glueck = 12;
			TWPro.twpro_jobValues.agave.gefahr = 27;
			TWPro.twpro_jobValues.tomato = {};
			TWPro.twpro_jobValues.tomato.erfahrung = 12;
			TWPro.twpro_jobValues.tomato.lohn = 13;
			TWPro.twpro_jobValues.tomato.glueck = 7;
			TWPro.twpro_jobValues.tomato.gefahr = 11;
			TWPro.twpro_jobValues.horseshoe = {};
			TWPro.twpro_jobValues.horseshoe.erfahrung = 28;
			TWPro.twpro_jobValues.horseshoe.lohn = 14;
			TWPro.twpro_jobValues.horseshoe.glueck = 9;
			TWPro.twpro_jobValues.horseshoe.gefahr = 23;
			TWPro.twpro_jobValues.fire = {};
			TWPro.twpro_jobValues.fire.erfahrung = 41;
			TWPro.twpro_jobValues.fire.lohn = 15;
			TWPro.twpro_jobValues.fire.glueck = 65;
			TWPro.twpro_jobValues.fire.gefahr = 45;
			TWPro.twpro_jobValues.orange = {};
			TWPro.twpro_jobValues.orange.erfahrung = 25;
			TWPro.twpro_jobValues.orange.lohn = 14;
			TWPro.twpro_jobValues.orange.glueck = 10;
			TWPro.twpro_jobValues.orange.gefahr = 21;
			TWPro.twpro_jobValues.muck_out = {};
			TWPro.twpro_jobValues.muck_out.erfahrung = 5;
			TWPro.twpro_jobValues.muck_out.lohn = 4;
			TWPro.twpro_jobValues.muck_out.glueck = 2;
			TWPro.twpro_jobValues.muck_out.gefahr = 6;
			TWPro.twpro_jobValues.shoes = {};
			TWPro.twpro_jobValues.shoes.erfahrung = 2;
			TWPro.twpro_jobValues.shoes.lohn = 3;
			TWPro.twpro_jobValues.shoes.glueck = 3;
			TWPro.twpro_jobValues.shoes.gefahr = 2;
			TWPro.twpro_jobValues.socks_darn = {};
			TWPro.twpro_jobValues.socks_darn.erfahrung = 4;
			TWPro.twpro_jobValues.socks_darn.lohn = 1;
			TWPro.twpro_jobValues.socks_darn.glueck = 0;
			TWPro.twpro_jobValues.socks_darn.gefahr = 0;
			TWPro.twpro_jobValues.potatoe = {};
			TWPro.twpro_jobValues.potatoe.erfahrung = 53;
			TWPro.twpro_jobValues.potatoe.lohn = 8;
			TWPro.twpro_jobValues.potatoe.glueck = 5;
			TWPro.twpro_jobValues.potatoe.gefahr = 5;
			TWPro.twpro_jobValues.feed_animal = {};
			TWPro.twpro_jobValues.feed_animal.erfahrung = 60;
			TWPro.twpro_jobValues.feed_animal.lohn = 17;
			TWPro.twpro_jobValues.feed_animal.glueck = 10;
			TWPro.twpro_jobValues.feed_animal.gefahr = 20;
			TWPro.twpro_jobValues.pumpkin = {};
			TWPro.twpro_jobValues.pumpkin.erfahrung = 45;
			TWPro.twpro_jobValues.pumpkin.lohn = 45;
			TWPro.twpro_jobValues.pumpkin.glueck = 10;
			TWPro.twpro_jobValues.pumpkin.gefahr = 10;
			TWPro.twpro_jobValues.blueberries = {};
			TWPro.twpro_jobValues.blueberries.erfahrung = 35;
			TWPro.twpro_jobValues.blueberries.lohn = 52;
			TWPro.twpro_jobValues.blueberries.glueck = 35;
			TWPro.twpro_jobValues.blueberries.gefahr = 15;
			TWPro.twpro_jobValues.plant_trees = {};
			TWPro.twpro_jobValues.plant_trees.erfahrung = 25;
			TWPro.twpro_jobValues.plant_trees.lohn = 34;
			TWPro.twpro_jobValues.plant_trees.glueck = 54;
			TWPro.twpro_jobValues.plant_trees.gefahr = 25;
			TWPro.twpro_jobValues.gather_feathers = {};
			TWPro.twpro_jobValues.gather_feathers.erfahrung = 23;
			TWPro.twpro_jobValues.gather_feathers.lohn = 47;
			TWPro.twpro_jobValues.gather_feathers.glueck = 60;
			TWPro.twpro_jobValues.gather_feathers.gefahr = 15;
			TWPro.twpro_jobValues.lotus_gathering = {};
			TWPro.twpro_jobValues.lotus_gathering.erfahrung = 45;
			TWPro.twpro_jobValues.lotus_gathering.lohn = 54;
			TWPro.twpro_jobValues.lotus_gathering.glueck = 35;
			TWPro.twpro_jobValues.lotus_gathering.gefahr = 20;
			TWPro.twpro_jobValues.crab_hunting = {};
			TWPro.twpro_jobValues.crab_hunting.erfahrung = 56;
			TWPro.twpro_jobValues.crab_hunting.lohn = 67;
			TWPro.twpro_jobValues.crab_hunting.glueck = 35;
			TWPro.twpro_jobValues.crab_hunting.gefahr = 12;
			TWPro.twpro_jobValues.teaching = {};
			TWPro.twpro_jobValues.teaching.erfahrung = 79;
			TWPro.twpro_jobValues.teaching.lohn = 54;
			TWPro.twpro_jobValues.teaching.glueck = 5;
			TWPro.twpro_jobValues.teaching.gefahr = 23;
			TWPro.twpro_jobValues.sheriff_work = {};
			TWPro.twpro_jobValues.sheriff_work.erfahrung = 76;
			TWPro.twpro_jobValues.sheriff_work.lohn = 67;
			TWPro.twpro_jobValues.sheriff_work.glueck = 56;
			TWPro.twpro_jobValues.sheriff_work.gefahr = 45;
			TWPro.twpro_jobValues.sulfur_gathering = {};
			TWPro.twpro_jobValues.sulfur_gathering.erfahrung = 34;
			TWPro.twpro_jobValues.sulfur_gathering.lohn = 76;
			TWPro.twpro_jobValues.sulfur_gathering.glueck = 78;
			TWPro.twpro_jobValues.sulfur_gathering.gefahr = 32;
			TWPro.twpro_jobValues.wildwater = {};
			TWPro.twpro_jobValues.wildwater.erfahrung = 74;
			TWPro.twpro_jobValues.wildwater.lohn = 84;
			TWPro.twpro_jobValues.wildwater.glueck = 30;
			TWPro.twpro_jobValues.wildwater.gefahr = 57;
			TWPro.twpro_jobValues.gambler = {};
			TWPro.twpro_jobValues.gambler.erfahrung = 57;
			TWPro.twpro_jobValues.gambler.lohn = 67;
			TWPro.twpro_jobValues.gambler.glueck = 69;
			TWPro.twpro_jobValues.gambler.gefahr = 63;
			TWPro.twpro_jobValues.rattlesnake = {};
			TWPro.twpro_jobValues.rattlesnake.erfahrung = 46;
			TWPro.twpro_jobValues.rattlesnake.lohn = 72;
			TWPro.twpro_jobValues.rattlesnake.glueck = 71;
			TWPro.twpro_jobValues.rattlesnake.gefahr = 73;
			TWPro.twpro_jobValues.salpeter_gathering = {};
			TWPro.twpro_jobValues.salpeter_gathering.erfahrung = 53;
			TWPro.twpro_jobValues.salpeter_gathering.lohn = 62;
			TWPro.twpro_jobValues.salpeter_gathering.glueck = 58;
			TWPro.twpro_jobValues.salpeter_gathering.gefahr = 27;
			TWPro.twpro_jobValues.horse_transport = {};
			TWPro.twpro_jobValues.horse_transport.erfahrung = 82;
			TWPro.twpro_jobValues.horse_transport.lohn = 66;
			TWPro.twpro_jobValues.horse_transport.glueck = 69;
			TWPro.twpro_jobValues.horse_transport.gefahr = 48;
			TWPro.twpro_jobValues.rodeo = {};
			TWPro.twpro_jobValues.rodeo.erfahrung = 56;
			TWPro.twpro_jobValues.rodeo.lohn = 76;
			TWPro.twpro_jobValues.rodeo.glueck = 69;
			TWPro.twpro_jobValues.rodeo.gefahr = 78;
			TWPro.twpro_jobValues.travelling_salesman = {};
			TWPro.twpro_jobValues.travelling_salesman.erfahrung = 46;
			TWPro.twpro_jobValues.travelling_salesman.lohn = 59;
			TWPro.twpro_jobValues.travelling_salesman.glueck = 97;
			TWPro.twpro_jobValues.travelling_salesman.gefahr = 67;
			TWPro.twpro_jobValues.con_artist = {};
			TWPro.twpro_jobValues.con_artist.erfahrung = 89;
			TWPro.twpro_jobValues.con_artist.lohn = 78;
			TWPro.twpro_jobValues.con_artist.glueck = 35;
			TWPro.twpro_jobValues.con_artist.gefahr = 83;
			TWPro.twpro_jobValues.cougar = {};
			TWPro.twpro_jobValues.cougar.erfahrung = 89;
			TWPro.twpro_jobValues.cougar.lohn = 46;
			TWPro.twpro_jobValues.cougar.glueck = 39;
			TWPro.twpro_jobValues.cougar.gefahr = 93;
			TWPro.twpro_jobValues.indigo_gathering = {};
			TWPro.twpro_jobValues.indigo_gathering.erfahrung = 73;
			TWPro.twpro_jobValues.indigo_gathering.lohn = 87;
			TWPro.twpro_jobValues.indigo_gathering.glueck = 29;
			TWPro.twpro_jobValues.indigo_gathering.gefahr = 69;
			TWPro.twpro_jobValues.alcohol = {};
			TWPro.twpro_jobValues.alcohol.erfahrung = 91;
			TWPro.twpro_jobValues.alcohol.lohn = 74;
			TWPro.twpro_jobValues.alcohol.glueck = 34;
			TWPro.twpro_jobValues.alcohol.gefahr = 56;
			TWPro.twpro_jobValues.lead_gathering = {};
			TWPro.twpro_jobValues.lead_gathering.erfahrung = 72;
			TWPro.twpro_jobValues.lead_gathering.lohn = 89;
			TWPro.twpro_jobValues.lead_gathering.glueck = 22;
			TWPro.twpro_jobValues.lead_gathering.gefahr = 72;
			TWPro.twpro_jobValues.gem_gathering = {};
			TWPro.twpro_jobValues.gem_gathering.erfahrung = 78;
			TWPro.twpro_jobValues.gem_gathering.lohn = 91;
			TWPro.twpro_jobValues.gem_gathering.glueck = 23;
			TWPro.twpro_jobValues.gem_gathering.gefahr = 77;
			TWPro.twpro_jobValues.mission = {};
			TWPro.twpro_jobValues.mission.erfahrung = 82;
			TWPro.twpro_jobValues.mission.lohn = 92;
			TWPro.twpro_jobValues.mission.glueck = 54;
			TWPro.twpro_jobValues.mission.gefahr = 38;
			TWPro.twpro_jobValues.casino = {};
			TWPro.twpro_jobValues.casino.erfahrung = 92;
			TWPro.twpro_jobValues.casino.lohn = 78;
			TWPro.twpro_jobValues.casino.glueck = 23;
			TWPro.twpro_jobValues.casino.gefahr = 47;
			TWPro.twpro_jobValues.marshall = {};
			TWPro.twpro_jobValues.marshall.erfahrung = 90;
			TWPro.twpro_jobValues.marshall.lohn = 87;
			TWPro.twpro_jobValues.marshall.glueck = 60;
			TWPro.twpro_jobValues.marshall.gefahr = 94;
			TWPro.twpro_jobValues.shatter_gang = {};
			TWPro.twpro_jobValues.shatter_gang.erfahrung = 70;
			TWPro.twpro_jobValues.shatter_gang.lohn = 84;
			TWPro.twpro_jobValues.shatter_gang.glueck = 89;
			TWPro.twpro_jobValues.shatter_gang.gefahr = 99;
			TWPro.twpro_jobValues.bankrobbery = {};
			TWPro.twpro_jobValues.bankrobbery.erfahrung = 84;
			TWPro.twpro_jobValues.bankrobbery.lohn = 93;
			TWPro.twpro_jobValues.bankrobbery.glueck = 30;
			TWPro.twpro_jobValues.bankrobbery.gefahr = 89;
			TWPro.twpro_jobValues.free_slaves = {};
			TWPro.twpro_jobValues.free_slaves.erfahrung = 93;
			TWPro.twpro_jobValues.free_slaves.lohn = 84;
			TWPro.twpro_jobValues.free_slaves.glueck = 28;
			TWPro.twpro_jobValues.free_slaves.gefahr = 92;
			TWPro.twpro_jobValues.buffelo_bill = {};
			TWPro.twpro_jobValues.buffelo_bill.erfahrung = 94;
			TWPro.twpro_jobValues.buffelo_bill.lohn = 92;
			TWPro.twpro_jobValues.buffelo_bill.glueck = 65;
			TWPro.twpro_jobValues.buffelo_bill.gefahr = 70;
			TWPro.twpro_jobValues.build_palisade = {};
			TWPro.twpro_jobValues.build_palisade.erfahrung = 65;
			TWPro.twpro_jobValues.build_palisade.lohn = 33;
			TWPro.twpro_jobValues.build_palisade.glueck = 20;
			TWPro.twpro_jobValues.build_palisade.gefahr = 30; 

			extra_jobs = ['construct', 'duelshootingatt', 'duelshootingdef', 'duelvigor', 'twpro_fortatt', 'twpro_fortdef', 'speed', 'regeneration'];
			for(var i=0; i<extra_jobs.length; i++){
				TWPro.twpro_jobValues[extra_jobs[i]] = {'erfahrung':-1, 'lohn':-6, 'glueck':-6, 'gefahr':-1};
			}
			TWPro.twpro_split_fortbattle();

		}
		TWPro.twpro_setBonusParsed = false;
		// Setitems
		{
			TWPro.twpro_setBonus = {};
			TWPro.twpro_setBonus.set_sleeper = [];
			TWPro.twpro_setBonus.set_sleeper[1] = {image:"images/items/head/mini/sleep_cap.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[2] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[3] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[4] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[5] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[6] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set = [];
			TWPro.twpro_setBonus.season_set[1] = {image:"images/items/yield/mini/dfgrocket1a.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set[2] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:2};
			TWPro.twpro_setBonus.season_set[3] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:6};
			TWPro.twpro_setBonus.season_set[4] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:15};
			TWPro.twpro_setBonus.season_set[5] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:25};
			TWPro.twpro_setBonus.season_set[6] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:37};
			TWPro.twpro_setBonus.season_set[7] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:52};
			TWPro.twpro_setBonus.season_set[8] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:0};
			TWPro.twpro_setBonus.season_set[9] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:0};
			TWPro.twpro_setBonus.season_set[10] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:0};
			TWPro.twpro_setBonus.set_indian = [];
			TWPro.twpro_setBonus.set_indian[1] = {image:"images/items/head/mini/indian_hat.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_indian[2] = {};
			TWPro.twpro_setBonus.set_indian[2].bonus = {};
			TWPro.twpro_setBonus.set_indian[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[2].bonus.attributes.flexibility = 2;
			TWPro.twpro_setBonus.set_indian[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[2].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[2].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[2].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[2].speedBonus = 15;
			TWPro.twpro_setBonus.set_indian[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[3] = {};
			TWPro.twpro_setBonus.set_indian[3].bonus = {};
			TWPro.twpro_setBonus.set_indian[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[3].bonus.attributes.flexibility = 5;
			TWPro.twpro_setBonus.set_indian[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[3].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[3].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[3].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[3].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[3].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[3].speedBonus = 30;
			TWPro.twpro_setBonus.set_indian[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[4] = {};
			TWPro.twpro_setBonus.set_indian[4].bonus = {};
			TWPro.twpro_setBonus.set_indian[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[4].bonus.attributes.flexibility = 8;
			TWPro.twpro_setBonus.set_indian[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[4].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[4].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[4].bonus.skills.pitfall = 8;
			TWPro.twpro_setBonus.set_indian[4].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[4].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[4].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[4].jobBonus.wolf = 50;
			TWPro.twpro_setBonus.set_indian[4].speedBonus = 45;/////////////////// The West shows 44%, but in reality, the speed is 45%!!!
			TWPro.twpro_setBonus.set_indian[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[5] = {};
			TWPro.twpro_setBonus.set_indian[5].bonus = {};
			TWPro.twpro_setBonus.set_indian[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[5].bonus.attributes.flexibility = 12;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.pitfall = 8;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.animal = 8;
			TWPro.twpro_setBonus.set_indian[5].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.wolf = 50;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.grizzly = 60;
			TWPro.twpro_setBonus.set_indian[5].speedBonus = 60;
			TWPro.twpro_setBonus.set_indian[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[6] = {};
			TWPro.twpro_setBonus.set_indian[6].bonus = {};
			TWPro.twpro_setBonus.set_indian[6].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[6].bonus.attributes.flexibility = 16;
			TWPro.twpro_setBonus.set_indian[6].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[6].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[6].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[6].bonus.skills.pitfall = 8;
			TWPro.twpro_setBonus.set_indian[6].bonus.skills.animal = 8;
			TWPro.twpro_setBonus.set_indian[6].bonus.skills.shot = 8;
			TWPro.twpro_setBonus.set_indian[6].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[6].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[6].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[6].jobBonus.wolf = 50;
			TWPro.twpro_setBonus.set_indian[6].jobBonus.grizzly = 60;
			TWPro.twpro_setBonus.set_indian[6].jobBonus.cougar = 70;
			TWPro.twpro_setBonus.set_indian[6].speedBonus = 75;
			TWPro.twpro_setBonus.set_indian[6].parsedBonus = {};
	TWPro.twpro_setBonus.set_indian[7] = {};
	TWPro.twpro_setBonus.set_indian[7].bonus = {};
	TWPro.twpro_setBonus.set_indian[7].bonus.attributes = {};
	TWPro.twpro_setBonus.set_indian[7].bonus.attributes.flexibility = 21;
	TWPro.twpro_setBonus.set_indian[7].bonus.skills = {};
	TWPro.twpro_setBonus.set_indian[7].bonus.skills.hide = 8;
	TWPro.twpro_setBonus.set_indian[7].bonus.skills.swim = 8;
	TWPro.twpro_setBonus.set_indian[7].bonus.skills.pitfall = 8;
	TWPro.twpro_setBonus.set_indian[7].bonus.skills.animal = 8;
	TWPro.twpro_setBonus.set_indian[7].bonus.skills.shot = 8;
	TWPro.twpro_setBonus.set_indian[7].bonus.skills.tough = 8;
	TWPro.twpro_setBonus.set_indian[7].jobBonus = {};
	TWPro.twpro_setBonus.set_indian[7].jobBonus.all = 25;
	TWPro.twpro_setBonus.set_indian[7].jobBonus.coyote = 30;
	TWPro.twpro_setBonus.set_indian[7].jobBonus.buffalo = 40;
	TWPro.twpro_setBonus.set_indian[7].jobBonus.wolf = 50;
	TWPro.twpro_setBonus.set_indian[7].jobBonus.grizzly = 60;
	TWPro.twpro_setBonus.set_indian[7].jobBonus.cougar = 70;
	TWPro.twpro_setBonus.set_indian[7].speedBonus = 90;
	TWPro.twpro_setBonus.set_indian[7].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman = [];
			TWPro.twpro_setBonus.set_gentleman[1] = {image:"images/items/yield/mini/cane.png",gender:"male",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_gentleman[2] = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes.charisma = 1;
			TWPro.twpro_setBonus.set_gentleman[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus.skills.appearance = 8;
			TWPro.twpro_setBonus.set_gentleman[2].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[2].jobBonus.all = 5;
			TWPro.twpro_setBonus.set_gentleman[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman[3] = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes.charisma = 3;
			TWPro.twpro_setBonus.set_gentleman[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.leadership = 8;
			TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.appearance = 8;
			TWPro.twpro_setBonus.set_gentleman[3].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[3].jobBonus.all = 15;
			TWPro.twpro_setBonus.set_gentleman[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman[4] = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes.charisma = 6;
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.leadership = 8;
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.trade = 8;
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.appearance = 8;
			TWPro.twpro_setBonus.set_gentleman[4].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[4].jobBonus.all = 30;
			TWPro.twpro_setBonus.set_gentleman[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman[5] = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes.charisma = 10;
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.leadership = 8;
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.trade = 8;
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.appearance = 16;
			TWPro.twpro_setBonus.set_gentleman[5].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[5].jobBonus.all = 50;
			TWPro.twpro_setBonus.set_gentleman[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[5].parsedBonus = {};
	TWPro.twpro_setBonus.set_gentleman[6] = {};
	TWPro.twpro_setBonus.set_gentleman[6].bonus = {};
	TWPro.twpro_setBonus.set_gentleman[6].bonus.attributes = {};
	TWPro.twpro_setBonus.set_gentleman[6].bonus.attributes.charisma = 15;
	TWPro.twpro_setBonus.set_gentleman[6].bonus.skills = {};
	TWPro.twpro_setBonus.set_gentleman[6].bonus.skills.leadership = 8;
	TWPro.twpro_setBonus.set_gentleman[6].bonus.skills.trade = 8;
	TWPro.twpro_setBonus.set_gentleman[6].bonus.skills.appearance = 25;
	TWPro.twpro_setBonus.set_gentleman[6].jobBonus = {};
	TWPro.twpro_setBonus.set_gentleman[6].jobBonus.all = 75;
	TWPro.twpro_setBonus.set_gentleman[6].speedBonus = 0;
	TWPro.twpro_setBonus.set_gentleman[6].parsedBonus = {};
	TWPro.twpro_setBonus.set_gentleman[7] = {};
	TWPro.twpro_setBonus.set_gentleman[7].bonus = {};
	TWPro.twpro_setBonus.set_gentleman[7].bonus.attributes = {};
	TWPro.twpro_setBonus.set_gentleman[7].bonus.attributes.charisma = 20;
	TWPro.twpro_setBonus.set_gentleman[7].bonus.skills = {};
	TWPro.twpro_setBonus.set_gentleman[7].bonus.skills.leadership = 8;
	TWPro.twpro_setBonus.set_gentleman[7].bonus.skills.trade = 20;
	TWPro.twpro_setBonus.set_gentleman[7].bonus.skills.appearance = 25;
	TWPro.twpro_setBonus.set_gentleman[7].jobBonus = {};
	TWPro.twpro_setBonus.set_gentleman[7].jobBonus.all = 100;
	TWPro.twpro_setBonus.set_gentleman[7].speedBonus = 0;
	TWPro.twpro_setBonus.set_gentleman[7].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer = [];
			TWPro.twpro_setBonus.set_dancer[1] = {image:"images/items/yield/mini/umbrella.png",gender:"female",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_dancer[2] = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus.attributes.charisma = 2;
			TWPro.twpro_setBonus.set_dancer[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus.skills.appearance = 10;
			TWPro.twpro_setBonus.set_dancer[2].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[2].jobBonus.all = 5;
			TWPro.twpro_setBonus.set_dancer[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer[3] = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus.attributes.charisma = 5;
			TWPro.twpro_setBonus.set_dancer[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus.skills.animal = 10;
			TWPro.twpro_setBonus.set_dancer[3].bonus.skills.appearance = 10;
			TWPro.twpro_setBonus.set_dancer[3].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[3].jobBonus.all = 15;
			TWPro.twpro_setBonus.set_dancer[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer[4] = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus.attributes.charisma = 9;
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills.finger_dexterity = 12;
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills.animal = 10;
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills.appearance = 10;
			TWPro.twpro_setBonus.set_dancer[4].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[4].jobBonus.all = 30;
			TWPro.twpro_setBonus.set_dancer[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer[5] = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus.attributes.charisma = 11;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.finger_dexterity = 12;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.endurance = 6;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.animal = 10;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.appearance = 16;
			TWPro.twpro_setBonus.set_dancer[5].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[5].jobBonus.all = 50;
			TWPro.twpro_setBonus.set_dancer[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[5].parsedBonus = {};
	TWPro.twpro_setBonus.set_dancer[6] = {};
	TWPro.twpro_setBonus.set_dancer[6].bonus = {};
	TWPro.twpro_setBonus.set_dancer[6].bonus.attributes = {};
	TWPro.twpro_setBonus.set_dancer[6].bonus.attributes.charisma = 15;
	TWPro.twpro_setBonus.set_dancer[6].bonus.skills = {};
	TWPro.twpro_setBonus.set_dancer[6].bonus.skills.finger_dexterity = 12;
	TWPro.twpro_setBonus.set_dancer[6].bonus.skills.endurance = 6;
	TWPro.twpro_setBonus.set_dancer[6].bonus.skills.animal = 10;
	TWPro.twpro_setBonus.set_dancer[6].bonus.skills.appearance = 25;
	TWPro.twpro_setBonus.set_dancer[6].jobBonus = {};
	TWPro.twpro_setBonus.set_dancer[6].jobBonus.all = 75;
	TWPro.twpro_setBonus.set_dancer[6].speedBonus = 0;
	TWPro.twpro_setBonus.set_dancer[6].parsedBonus = {};
	TWPro.twpro_setBonus.set_dancer[7] = {};
	TWPro.twpro_setBonus.set_dancer[7].bonus = {};
	TWPro.twpro_setBonus.set_dancer[7].bonus.attributes = {};
	TWPro.twpro_setBonus.set_dancer[7].bonus.attributes.charisma = 20;
	TWPro.twpro_setBonus.set_dancer[7].bonus.skills = {};
	TWPro.twpro_setBonus.set_dancer[7].bonus.skills.finger_dexterity = 12;
	TWPro.twpro_setBonus.set_dancer[7].bonus.skills.endurance = 18;
	TWPro.twpro_setBonus.set_dancer[7].bonus.skills.animal = 10;
	TWPro.twpro_setBonus.set_dancer[7].bonus.skills.appearance = 25;
	TWPro.twpro_setBonus.set_dancer[7].jobBonus = {};
	TWPro.twpro_setBonus.set_dancer[7].jobBonus.all = 100;
	TWPro.twpro_setBonus.set_dancer[7].speedBonus = 0;
	TWPro.twpro_setBonus.set_dancer[7].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery = [];
			TWPro.twpro_setBonus.set_quackery[1] = {image:"images/items/yield/mini/potion.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_quackery[2] = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus.attributes.dexterity = 1;
			TWPro.twpro_setBonus.set_quackery[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus.skills.endurance = 5;
			TWPro.twpro_setBonus.set_quackery[2].bonus.skills.trade = 5;
			TWPro.twpro_setBonus.set_quackery[2].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[2].jobBonus.quackery = 30;
			TWPro.twpro_setBonus.set_quackery[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[3] = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus.attributes.dexterity = 2;
			TWPro.twpro_setBonus.set_quackery[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus.skills.endurance = 10;
			TWPro.twpro_setBonus.set_quackery[3].bonus.skills.trade = 10;
			TWPro.twpro_setBonus.set_quackery[3].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[3].jobBonus.quackery = 60;
			TWPro.twpro_setBonus.set_quackery[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[4] = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus.attributes.dexterity = 4;
			TWPro.twpro_setBonus.set_quackery[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus.skills.endurance = 15;
			TWPro.twpro_setBonus.set_quackery[4].bonus.skills.trade = 15;
			TWPro.twpro_setBonus.set_quackery[4].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[4].jobBonus.quackery = 90;
			TWPro.twpro_setBonus.set_quackery[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[5] = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus.attributes.dexterity = 6;
			TWPro.twpro_setBonus.set_quackery[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus.skills.endurance = 20;
			TWPro.twpro_setBonus.set_quackery[5].bonus.skills.trade = 20;
			TWPro.twpro_setBonus.set_quackery[5].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[5].jobBonus.quackery = 120;
			TWPro.twpro_setBonus.set_quackery[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[6] = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus.attributes.dexterity = 9;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.tough = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.endurance = 20;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.reflex = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.aim = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.shot = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.trade = 20;
			TWPro.twpro_setBonus.set_quackery[6].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[6].jobBonus.quackery = 120;
			TWPro.twpro_setBonus.set_quackery[6].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[6].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[7] = {};
			TWPro.twpro_setBonus.set_quackery[7].bonus = {};
			TWPro.twpro_setBonus.set_quackery[7].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[7].bonus.attributes.dexterity = 12;
			TWPro.twpro_setBonus.set_quackery[7].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[7].bonus.skills.tough = 18;
			TWPro.twpro_setBonus.set_quackery[7].bonus.skills.endurance = 20;
			TWPro.twpro_setBonus.set_quackery[7].bonus.skills.reflex = 18;
			TWPro.twpro_setBonus.set_quackery[7].bonus.skills.aim = 18;
			TWPro.twpro_setBonus.set_quackery[7].bonus.skills.shot = 18;
			TWPro.twpro_setBonus.set_quackery[7].bonus.skills.trade = 20;
			TWPro.twpro_setBonus.set_quackery[7].bonus.skills.appearance = 18;
			TWPro.twpro_setBonus.set_quackery[7].bonus.skills.tactic = 18;
			TWPro.twpro_setBonus.set_quackery[7].bonus.skills.dodge = 18;
			TWPro.twpro_setBonus.set_quackery[7].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[7].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[7].jobBonus.con_artist = 50;
			TWPro.twpro_setBonus.set_quackery[7].jobBonus.quackery = 120;
			TWPro.twpro_setBonus.set_quackery[7].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[7].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[8] = {};
			TWPro.twpro_setBonus.set_quackery[8].bonus = {};
			TWPro.twpro_setBonus.set_quackery[8].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[8].bonus.attributes.dexterity = 12;
			TWPro.twpro_setBonus.set_quackery[8].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[8].bonus.skills.tough = 18;
			TWPro.twpro_setBonus.set_quackery[8].bonus.skills.endurance = 20;
			TWPro.twpro_setBonus.set_quackery[8].bonus.skills.reflex = 18;
			TWPro.twpro_setBonus.set_quackery[8].bonus.skills.aim = 18;
			TWPro.twpro_setBonus.set_quackery[8].bonus.skills.shot = 18;
			TWPro.twpro_setBonus.set_quackery[8].bonus.skills.trade = 20;
			TWPro.twpro_setBonus.set_quackery[8].bonus.skills.appearance = 18;
			TWPro.twpro_setBonus.set_quackery[8].bonus.skills.tactic = 18;
			TWPro.twpro_setBonus.set_quackery[8].bonus.skills.dodge = 18;
			TWPro.twpro_setBonus.set_quackery[8].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[8].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[8].jobBonus.con_artist = 100;
			TWPro.twpro_setBonus.set_quackery[8].jobBonus.quackery = 120;
			TWPro.twpro_setBonus.set_quackery[8].speedBonus = 50;
			TWPro.twpro_setBonus.set_quackery[8].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican = [];
			TWPro.twpro_setBonus.set_mexican[1] = {image:"images/items/head/mini/mexican_sombrero.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_mexican[2] = {};
			TWPro.twpro_setBonus.set_mexican[2].bonus = {};
			TWPro.twpro_setBonus.set_mexican[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[2].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.set_mexican[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[2].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[2].speedBonus = 12;
			TWPro.twpro_setBonus.set_mexican[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[3] = {};
			TWPro.twpro_setBonus.set_mexican[3].bonus = {};
			TWPro.twpro_setBonus.set_mexican[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[3].bonus.attributes.strength = 2;
			TWPro.twpro_setBonus.set_mexican[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[3].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[3].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[3].speedBonus = 24;
			TWPro.twpro_setBonus.set_mexican[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[4] = {};
			TWPro.twpro_setBonus.set_mexican[4].bonus = {};
			TWPro.twpro_setBonus.set_mexican[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[4].bonus.attributes.strength = 4;
			TWPro.twpro_setBonus.set_mexican[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[4].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[4].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[4].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[4].speedBonus = 36;
			TWPro.twpro_setBonus.set_mexican[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[5] = {};
			TWPro.twpro_setBonus.set_mexican[5].bonus = {};
			TWPro.twpro_setBonus.set_mexican[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[5].bonus.attributes.strength = 6;
			TWPro.twpro_setBonus.set_mexican[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[5].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.smuggle = 80;
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[5].speedBonus = 48;
			TWPro.twpro_setBonus.set_mexican[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[6] = {};
			TWPro.twpro_setBonus.set_mexican[6].bonus = {};
			TWPro.twpro_setBonus.set_mexican[6].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[6].bonus.attributes.strength = 9;
			TWPro.twpro_setBonus.set_mexican[6].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[6].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.dynamite = 90;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.smuggle = 80;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[6].speedBonus = 60;
			TWPro.twpro_setBonus.set_mexican[6].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[7] = {};
			TWPro.twpro_setBonus.set_mexican[7].bonus = {};
			TWPro.twpro_setBonus.set_mexican[7].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[7].bonus.attributes.strength = 12;
			TWPro.twpro_setBonus.set_mexican[7].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[7].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[7].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[7].jobBonus.dynamite = 90;
			TWPro.twpro_setBonus.set_mexican[7].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[7].jobBonus.smuggle = 80;
			TWPro.twpro_setBonus.set_mexican[7].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[7].jobBonus.alcohol = 100;
			TWPro.twpro_setBonus.set_mexican[7].speedBonus = 72;
			TWPro.twpro_setBonus.set_mexican[7].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male = [];
			TWPro.twpro_setBonus.set_pilgrim_male[1] = {image:"images/items/head/mini/pilger_hat.png",gender:"male",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_pilgrim_male[2] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.construct = 5;
			TWPro.twpro_setBonus.set_pilgrim_male[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.construct = 15;
			TWPro.twpro_setBonus.set_pilgrim_male[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.construct = 30;
			TWPro.twpro_setBonus.set_pilgrim_male[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.bible = 150;
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.construct = 50;
			TWPro.twpro_setBonus.set_pilgrim_male[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[6] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[6].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[6].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[6].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[6].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[6].jobBonus.bible = 150;
			TWPro.twpro_setBonus.set_pilgrim_male[6].jobBonus.construct = 50;
			TWPro.twpro_setBonus.set_pilgrim_male[6].jobBonus.mission = 175;
			TWPro.twpro_setBonus.set_pilgrim_male[6].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[6].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female = [];
			TWPro.twpro_setBonus.set_pilgrim_female[1] = {image:"images/items/head/mini/pilger_cap.png",gender:"female",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_pilgrim_female[2] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.construct = 5;
			TWPro.twpro_setBonus.set_pilgrim_female[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.construct = 15;
			TWPro.twpro_setBonus.set_pilgrim_female[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.construct = 30;
			TWPro.twpro_setBonus.set_pilgrim_female[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.bible = 150;
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.construct = 50;
			TWPro.twpro_setBonus.set_pilgrim_female[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[6] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[6].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[6].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[6].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[6].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[6].jobBonus.bible = 150;
			TWPro.twpro_setBonus.set_pilgrim_female[6].jobBonus.construct = 50;
			TWPro.twpro_setBonus.set_pilgrim_female[6].jobBonus.mission = 175;
			TWPro.twpro_setBonus.set_pilgrim_female[6].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[6].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set = [];
			TWPro.twpro_setBonus.greenhorn_set[1] = {image:"images/items/neck/mini/greenhorn_neck.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.greenhorn_set[2] = {};
			TWPro.twpro_setBonus.greenhorn_set[2].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[2].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[2].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[2].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[2].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[2].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[2].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[3] = {};
			TWPro.twpro_setBonus.greenhorn_set[3].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[3].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[3].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[3].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[3].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[3].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[3].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[3].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[4] = {};
			TWPro.twpro_setBonus.greenhorn_set[4].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[4].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[4].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[4].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[4].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[5] = {};
			TWPro.twpro_setBonus.greenhorn_set[5].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[5].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[5].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.turkey = 20;
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[5].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[5].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[6] = {};
			TWPro.twpro_setBonus.greenhorn_set[6].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[6].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[6].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.cow = 20;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.turkey = 20;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[6].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[6].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[7] = {};
			TWPro.twpro_setBonus.greenhorn_set[7].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[7].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[7].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.all = 5;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.cow = 20;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.turkey = 20;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[7].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[7].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[8] = {};
			TWPro.twpro_setBonus.greenhorn_set[8].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[8].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[8].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.greenhorn_set[8].bonus.attributes.charisma = 1;
			TWPro.twpro_setBonus.greenhorn_set[8].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.all = 15;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.cow = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.turkey = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[8].speedBonus = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer = [];
			TWPro.twpro_setBonus.set_farmer[1] = {image:"images/items/yield/mini/pitchfork.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_farmer[2] = {};
			TWPro.twpro_setBonus.set_farmer[2].bonus = {};
			TWPro.twpro_setBonus.set_farmer[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.flexibility = 1;
			TWPro.twpro_setBonus.set_farmer[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[2].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer[3] = {};
			TWPro.twpro_setBonus.set_farmer[3].bonus = {};
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.flexibility = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.dexterity = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.charisma = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[3].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.cow = 20;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.wire = 20;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.horseshoe = 20;
			TWPro.twpro_setBonus.set_farmer[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer[4] = {};
			TWPro.twpro_setBonus.set_farmer[4].bonus = {};
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.strength = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.flexibility = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.dexterity = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.charisma = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[4].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.cow = 20;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.wire = 20;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.windmeel = 40;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.springe = 40;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.ranch = 40;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.horseshoe = 20;
			TWPro.twpro_setBonus.set_farmer[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer[5] = {};
			TWPro.twpro_setBonus.set_farmer[5].bonus = {};
			TWPro.twpro_setBonus.set_farmer[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[5].bonus.attributes.strength = 2;
			TWPro.twpro_setBonus.set_farmer[5].bonus.attributes.flexibility = 2;
			TWPro.twpro_setBonus.set_farmer[5].bonus.attributes.dexterity = 2;
			TWPro.twpro_setBonus.set_farmer[5].bonus.attributes.charisma = 2;
			TWPro.twpro_setBonus.set_farmer[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[5].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[5].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[5].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[5].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[5].jobBonus.cow = 20;
			TWPro.twpro_setBonus.set_farmer[5].jobBonus.wire = 20;
			TWPro.twpro_setBonus.set_farmer[5].jobBonus.horseshoe = 20;
			TWPro.twpro_setBonus.set_farmer[5].jobBonus.windmeel = 40;
			TWPro.twpro_setBonus.set_farmer[5].jobBonus.springe = 40;
			TWPro.twpro_setBonus.set_farmer[5].jobBonus.ranch = 40;
			TWPro.twpro_setBonus.set_farmer[5].jobBonus.potatoe = 40;
			TWPro.twpro_setBonus.set_farmer[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer[6] = {};
			TWPro.twpro_setBonus.set_farmer[6].bonus = {};
			TWPro.twpro_setBonus.set_farmer[6].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[6].bonus.attributes.strength = 2;
			TWPro.twpro_setBonus.set_farmer[6].bonus.attributes.flexibility = 2;
			TWPro.twpro_setBonus.set_farmer[6].bonus.attributes.dexterity = 2;
			TWPro.twpro_setBonus.set_farmer[6].bonus.attributes.charisma = 2;
			TWPro.twpro_setBonus.set_farmer[6].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[6].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[6].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[6].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[6].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[6].jobBonus.cow = 20;
			TWPro.twpro_setBonus.set_farmer[6].jobBonus.wire = 20;
			TWPro.twpro_setBonus.set_farmer[6].jobBonus.horseshoe = 20;
			TWPro.twpro_setBonus.set_farmer[6].jobBonus.windmeel = 40;
			TWPro.twpro_setBonus.set_farmer[6].jobBonus.springe = 40;
			TWPro.twpro_setBonus.set_farmer[6].jobBonus.ranch = 40;
			TWPro.twpro_setBonus.set_farmer[6].jobBonus.potatoe = 40;
			TWPro.twpro_setBonus.set_farmer[6].jobBonus.feed_animal = 40;
			TWPro.twpro_setBonus.set_farmer[6].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[6].parsedBonus = {};
			TWPro.twpro_setBonus.gold_set = [];
			TWPro.twpro_setBonus.gold_set[1] = {image:"images/items/left_arm/mini/golden_rifle.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.gold_set[2] = {};
			TWPro.twpro_setBonus.gold_set[2].bonus = {};
			TWPro.twpro_setBonus.gold_set[2].bonus.attributes = {};
			TWPro.twpro_setBonus.gold_set[2].bonus.skills = {};
			TWPro.twpro_setBonus.gold_set[2].bonus.skills.health = 10;
			TWPro.twpro_setBonus.gold_set[2].jobBonus = {};
			TWPro.twpro_setBonus.gold_set[2].jobBonus.all = 25;
			TWPro.twpro_setBonus.gold_set[2].speedBonus = 20;
			TWPro.twpro_setBonus.gold_set[2].parsedBonus = {};
			TWPro.twpro_setBonus.fireworker_set = [];
			TWPro.twpro_setBonus.fireworker_set[1] = {};
			TWPro.twpro_setBonus.fireworker_set[1].image = "images/items/yield/mini/bucket_fire.png";
			TWPro.twpro_setBonus.fireworker_set[1].gender = "mixed";
			TWPro.twpro_setBonus.fireworker_set[1].bonus = {};
			TWPro.twpro_setBonus.fireworker_set[1].bonus.attributes = {};
			TWPro.twpro_setBonus.fireworker_set[1].bonus.skills = {};
			TWPro.twpro_setBonus.fireworker_set[1].jobBonus = {};
			TWPro.twpro_setBonus.fireworker_set[1].jobBonus.all = 0;
			TWPro.twpro_setBonus.fireworker_set[1].jobBonus.fire = 15;
			TWPro.twpro_setBonus.fireworker_set[1].speedBonus = 0;
			TWPro.twpro_setBonus.fireworker_set[1].parsedBonus = {};
			TWPro.twpro_setBonus.tw_times_set = [];
			TWPro.twpro_setBonus.tw_times_set[1] = {};
			TWPro.twpro_setBonus.tw_times_set[1].image = "images/items/yield/mini/tw_times.png";
			TWPro.twpro_setBonus.tw_times_set[1].gender = "mixed";
			TWPro.twpro_setBonus.tw_times_set[1].bonus = {};
			TWPro.twpro_setBonus.tw_times_set[1].bonus.attributes = {};
			TWPro.twpro_setBonus.tw_times_set[1].bonus.skills = {};
			TWPro.twpro_setBonus.tw_times_set[1].jobBonus = {};
			TWPro.twpro_setBonus.tw_times_set[1].jobBonus.all = 0;
			TWPro.twpro_setBonus.tw_times_set[1].jobBonus["print"] = 25;
			TWPro.twpro_setBonus.tw_times_set[1].jobBonus.newspaper = 25;
			TWPro.twpro_setBonus.tw_times_set[1].speedBonus = 0;
			TWPro.twpro_setBonus.tw_times_set[1].parsedBonus = {};
		TWPro.twpro_setBonus.collector_set = [];
		TWPro.twpro_setBonus.collector_set[1] = {image:"images/items/neck/mini/collector_neck.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}}; 
		TWPro.twpro_setBonus.collector_set[2] = {};
		TWPro.twpro_setBonus.collector_set[2].bonus = {};
		TWPro.twpro_setBonus.collector_set[2].bonus.attributes = {};
		TWPro.twpro_setBonus.collector_set[2].bonus.skills = {};
		TWPro.twpro_setBonus.collector_set[2].jobBonus = {};
		TWPro.twpro_setBonus.collector_set[2].jobBonus.all = 0;
		TWPro.twpro_setBonus.collector_set[2].parsedBonus = {};
		TWPro.twpro_setBonus.collector_set[3] = {};
		TWPro.twpro_setBonus.collector_set[3].bonus = {};
		TWPro.twpro_setBonus.collector_set[3].bonus.attributes = {};
		TWPro.twpro_setBonus.collector_set[3].bonus.skills = {};
		TWPro.twpro_setBonus.collector_set[3].jobBonus = {};
		TWPro.twpro_setBonus.collector_set[3].jobBonus.all = 0;
		TWPro.twpro_setBonus.collector_set[3].parsedBonus = {};
		TWPro.twpro_setBonus.collector_set[4] = {};
		TWPro.twpro_setBonus.collector_set[4].bonus = {};
		TWPro.twpro_setBonus.collector_set[4].bonus.attributes = {};
		TWPro.twpro_setBonus.collector_set[4].bonus.skills = {};
		TWPro.twpro_setBonus.collector_set[4].jobBonus = {};
		TWPro.twpro_setBonus.collector_set[4].jobBonus.all = 0;
		TWPro.twpro_setBonus.collector_set[4].parsedBonus = {};
		TWPro.twpro_setBonus.collector_set[5] = {};
		TWPro.twpro_setBonus.collector_set[5].bonus = {};
		TWPro.twpro_setBonus.collector_set[5].bonus.attributes = {};
		TWPro.twpro_setBonus.collector_set[5].bonus.skills = {};
		TWPro.twpro_setBonus.collector_set[5].jobBonus = {};
		TWPro.twpro_setBonus.collector_set[5].jobBonus.all = 0;
		TWPro.twpro_setBonus.collector_set[5].parsedBonus = {};
		TWPro.twpro_setBonus.collector_set[6] = {};
		TWPro.twpro_setBonus.collector_set[6].bonus = {};
		TWPro.twpro_setBonus.collector_set[6].bonus.attributes = {};
		TWPro.twpro_setBonus.collector_set[6].bonus.skills = {};
		TWPro.twpro_setBonus.collector_set[6].jobBonus = {};
		TWPro.twpro_setBonus.collector_set[6].jobBonus.all = 0;
		TWPro.twpro_setBonus.collector_set[6].parsedBonus = {};
		TWPro.twpro_setBonus.collector_set[7] = {};
		TWPro.twpro_setBonus.collector_set[7].bonus = {};
		TWPro.twpro_setBonus.collector_set[7].bonus.attributes = {};
		TWPro.twpro_setBonus.collector_set[7].bonus.skills = {};
		TWPro.twpro_setBonus.collector_set[7].jobBonus = {};
		TWPro.twpro_setBonus.collector_set[7].jobBonus.all = 0;
		TWPro.twpro_setBonus.collector_set[7].parsedBonus = {};
		TWPro.twpro_setBonus.collector_set[8] = {};
		TWPro.twpro_setBonus.collector_set[8].bonus = {};
		TWPro.twpro_setBonus.collector_set[8].bonus.attributes = {};
		TWPro.twpro_setBonus.collector_set[8].bonus.skills = {};
		TWPro.twpro_setBonus.collector_set[8].jobBonus = {};
		TWPro.twpro_setBonus.collector_set[8].jobBonus.all = 0;
		TWPro.twpro_setBonus.collector_set[8].parsedBonus = {};
		TWPro.twpro_setBonus.collector_set[9] = {};
		TWPro.twpro_setBonus.collector_set[9].bonus = {};
		TWPro.twpro_setBonus.collector_set[9].bonus.attributes = {};
		TWPro.twpro_setBonus.collector_set[9].bonus.skills = {};
		TWPro.twpro_setBonus.collector_set[9].jobBonus = {};
		TWPro.twpro_setBonus.collector_set[9].jobBonus.all = 0;
		TWPro.twpro_setBonus.collector_set[9].parsedBonus = {};

		};
			for(var set in TWPro.twpro_setBonus){
				for(var i=0; i<TWPro.twpro_setBonus[set].length; i++){
					if (TWPro.twpro_setBonus[set][i] && TWPro.twpro_setBonus[set][i].bonus) {
						TWPro.twpro_setBonus[set][i].jobBonus.speed = ((TWPro.twpro_setBonus[set][i].bonus.attributes && TWPro.twpro_setBonus[set][i].bonus.attributes.flexibility || 0)
						+ (TWPro.twpro_setBonus[set][i].bonus.skills && TWPro.twpro_setBonus[set][i].bonus.skills.ride || 0));
					}
				}
			}
			TWPro.set_names = {};
			for(var internal_name in TWPro.twpro_setBonus){
				TWPro.set_names[internal_name] = '<em>'+internal_name+'</em>';
			}
		
		TWPro.twpro_invHash = '';
		TWPro.twpro_itemStorage = {};
		
		while (TWPro.twpro_active) {
			//alert('// Original AjaxWindow.show:\n'+AjaxWindow.show.toString());
			//alert('// Original Bag.getInstance().add:\n'+Bag.getInstance().add.toString());
			//for(var twpro_i = 0; twpro_i < ItemPopup.prototype.getXHTML.toString().length; twpro_i += 2000)
			//{
			//  alert(((twpro_i == 0)?('// Original ItemPopup.prototype.getXHTML:\n'):(''))+ItemPopup.prototype.getXHTML.toString().substr(twpro_i,2000));
			//}
			var twpro_matchtest;
			if (AjaxWindow.show.toString().search(/evalJS/) == -1) {

				if ((AjaxWindow.show.toString().search(/if *\(data\.page *!= *undefined\) *{/) == -1) || (AjaxWindow.show.toString().search(/eval\(data\.js\);/) == -1)) {
					TWPro.twpro_failureInject = true;
					break;
				}
				TWPro.twpro_failureRollback.unshift('AjaxWindow.show = ' + AjaxWindow.show.toString());
					eval('AjaxWindow.show = ' + AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/, 'if(data.page!=undefined){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,null,params);').replace(/eval\(data\.js\);/, 'TWPro.twpro_injectionSwitch(extendeName,\'js\',data,\'js\',params);try{eval(data.js);}catch(e){new HumanMessage("TW Pro detected an error in AjaxWindow.show: "+e)/*add debug code here*/}TWPro.twpro_injectionSwitch(extendeName,\'after\',data,null,params);'));
				//alert('// TW Pro AjaxWindow.show:\n'+AjaxWindow.show.toString());
			}
			else { if ((AjaxWindow.show.toString().search(/if *\(data\.page *!= *undefined\) *{/) == -1) || (AjaxWindow.show.toString().search(/this\.evalJS\(\);/) == -1)) {
					TWPro.twpro_failureInject = true;
					break;
				}
				TWPro.twpro_failureRollback.unshift('AjaxWindow.show = ' + AjaxWindow.show.toString());
					var newAjaxWindowShow = 'AjaxWindow.show = ' + AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/, 'if(data.page!=undefined){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,null,params);').replace(/this\.evalJS\(\);/, 'this.twpro_extendeName=extendeName;this.twpro_params=params;if(data.js)this.jsContent=data.js;this.evalJS();'),
					newAjax_index = newAjaxWindowShow.lastIndexOf('new Ajax(');
					newAjaxWindowShow = newAjaxWindowShow.substring(0,newAjax_index)+newAjaxWindowShow.substring(newAjax_index).replace(/([^A-Za-z0-9_$])extendeName([^A-Za-z0-9_$])/g, '$1(data.newExtendeName||extendeName)$2');
					eval(newAjaxWindowShow);
				//alert('// TW Pro AjaxWindow.show:\n'+AjaxWindow.show.toString());
				//alert('// Original Ajax.prototype.evalJS:\n'+Ajax.prototype.evalJS.toString());
				if (Ajax.prototype.evalJS.toString().search(/eval\(this\.jsContent\);/) == -1) {
					TWPro.twpro_failureInject = true;
					break;
				}
				TWPro.twpro_failureRollback.unshift('Ajax.prototype.evalJS = ' + Ajax.prototype.evalJS.toString());
				eval('Ajax.prototype.evalJS = ' + Ajax.prototype.evalJS.toString().replace(/eval\(this\.jsContent\);/, 'TWPro.twpro_injectionSwitch(this.twpro_extendeName,\'js\',this,\'jsContent\',this.twpro_params);try{eval(this.jsContent.replace("C\'est un petit","C\\\\\'est un petit"));}catch(e){new HumanMessage("TW Pro detected an error in Ajax.evalJS: "+e)/*add debug code here*/;}TWPro.twpro_injectionSwitch(this.twpro_extendeName,\'after\',this,null,this.twpro_params);')); // Zyphir : temporary bugfix for fr worlds
				//alert('// TW Pro Ajax.prototype.evalJS:\n'+Ajax.prototype.evalJS.toString());
			}
			WEvent.register('inventory_add', {
				exec: function(data){data=typeof data=='string'?Json.evaluate(data[0]):data[0];/*alert("add: "+data.item_id);*/setTimeout(TWPro.twpro_changeItem, 0, {inv_id:data.inv_id,id:data.item_id})}
			});
			WEvent.register('inventory_remove', {
				exec: function(data){setTimeout(TWPro.twpro_changeItem, 0, {inv_id:data.inv_id,deleted:1})}
			});
			if (Bag.getInstance().add.toString().search(/}, *('*)over/) == -1) {
				TWPro.twpro_failureInject = true;
				break;
			}
			twpro_matchtest = Bag.getInstance().add.toString().match(/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g);
			if (twpro_matchtest == null || twpro_matchtest.length != 3) {
				TWPro.twpro_failureInject = true;
				break;
			}
			TWPro.twpro_failureRollback.unshift('Bag.getInstance().add = ' + Bag.getInstance().add.toString());
			eval('Bag.getInstance().add = ' + Bag.getInstance().add.toString().replace(/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g, '(TWPro.twpro_activeJob())?($1$1):($1wear_$1+item.get_type()+$1_highlight$1)'));

			if (ItemPopup.prototype.getXHTML.toString().search(/xhtml[\s\+=]*(['"])<div class=(\\*)"item_popup_damage\\*">['"] *\+ *item.damage.damage_min *\+ *['"]-['"] *\+ *item.damage.damage_max *\+ *['"] ['"] *\+ *['"]([^"']+)([\s\S]+)item.price *!= *null\) *{(\s*)/) == -1) {
				TWPro.twpro_failureInject = true;
				break;
			}
		//alert(ItemPopup.prototype.getXHTML.toString())
			TWPro.twpro_failureRollback.unshift('ItemPopup.prototype.getXHTML = ' + ItemPopup.prototype.getXHTML.toString());
			eval('ItemPopup.prototype.getXHTML = ' + ItemPopup.prototype.getXHTML.toString().replace(/xhtml[\s\+=]*(['"])<div class=(\\*)"item_popup_damage\\*">['"] *\+ *item.damage.damage_min *\+ *['"]-['"] *\+ *item.damage.damage_max *\+ *['"] ['"] *\+ *['"]([^"']+)([\s\S]+)item.price *!= *null\) *{(\s*)/, 'xhtml+=$1<div class=$2"item_popup_damage$2">$1+item.damage.damage_min+$1-$1+item.damage.damage_max+$1 $1+$1$3<br \/><span style=$2"font-size:11px;font-weight:normal;font-style:italic$2">&nbsp;&nbsp;$1+(item.damage.damage_min+item.damage.damage_max)/2 +$1 $1+TWPro.lang.AVERAGEDAMAGE+$1<\/span>$4item.price != null\) {$5xhtml+=TWPro.twpro_popup(item);$5'));

			// fix for beta server only (probably a temporary bug)
			eval('ItemPopup.prototype.getXHTML = ' + ItemPopup.prototype.getXHTML.toString().replace(/alt=(\\*)"\\*" style=\\*"position:absolute\\*"/, 'alt=$1"$1" style=$1"position:relative$1"'));

			//for(var twpro_i = 0; twpro_i < ItemPopup.prototype.getXHTML.toString().length; twpro_i += 2000)
			//{
			//  alert(((twpro_i == 0)?('// TW Pro ItemPopup.prototype.getXHTML:\n'):(''))+ItemPopup.prototype.getXHTML.toString().substr(twpro_i,2000));
			//}

			// modify big map
			if (WMap.updateAllTiles.toString().search(/this.recalcMarker/) == -1) {
				TWPro.twpro_failureInject = true;
				break;
			}
			TWPro.twpro_failureRollback.unshift('WMap.updateAllTiles = ' + WMap.updateAllTiles.toString());
			var showAll = 

			"  try {"+
			"  for (var x in this.marker)"+
			"    for (var y in this.marker[x]) {"+
			"      if (this.marker[x][y]['job']) {"+
			"        var marker = this.marker[x][y]['job'];"+
			"        if (!marker.data.visible && TWPro.twpro_maps_jobs.indexOf(';'+marker.data.job_id+';') != -1)"+
			"          marker.data.visible=2;"+
			"      }"+
			"    }"+
			"  } catch(e) {}";
			eval('WMap.updateAllTiles = ' + WMap.updateAllTiles.toString().replace(/this.recalcMarker/, showAll+'this.recalcMarker'));

			// modify minimap
			if (WMinimap.updateJobs.toString().search(/WMap.mapData.check_job_points/) == -1) {
				TWPro.twpro_failureInject = true;
				break;
			}
			TWPro.twpro_failureRollback.unshift('WMinimap.updateJobs = ' + WMinimap.updateJobs.toString());
			eval('WMinimap.updateJobs = ' + WMinimap.updateJobs.toString().replace(/WMap.mapData.check_job_points/, 'TWPro.twpro_maps_jobs.indexOf(\';\'+key+\';\') != -1 || WMap.mapData.check_job_points'));

			break;
		}

		if (TWPro.twpro_failureInject) {
			TWPro.twpro_throwFailure();
		}

		TWPro.job_titles = {};
		for (var i in JobList) {
			TWPro.job_titles[JobList[i].shortName] = JobList[i].name;
			if (TWPro.settings_prefs["showAllJobs"] == 'true') {
				if(TWPro.twpro_maps_jobs.indexOf(';'+i+';') == -1){
					TWPro.twpro_maps_jobs += i+";";
					WMap.updateAllTiles();
					WMinimap.updateJobs();
					WMap.updateAllTiles();
				}
			}
		}
		//TWPro.job_titles.construct = TWPro.lang.CONSTRUCTION;

		TWPro.twpro_world = location.hostname.match(/^[^.]+/)[0];
		var twpro_support = document.createElement('div');
		twpro_support.id = 'twpro_support';
		twpro_support.style.cssText = 'position:absolute; color:#656565; font-size:10px; margin-left:2px; z-index:2';
		var twpro_supportLink = document.createElement('a');
		twpro_supportLink.id = 'twpro_supportLink';
		twpro_supportLink.href = 'http://userscripts.org/scripts/show/92414';
		twpro_supportLink.target = '_blank';
		twpro_supportLink.appendChild(document.createTextNode('v'+twpro_version));
		var twpro_supportAuthor = document.createElement('a');
		twpro_supportAuthor.id = 'twpro_supportAuthor';
		twpro_supportAuthor.style.cursor = 'help';
		twpro_supportAuthor.appendChild(document.createTextNode("[+++]"));
		twpro_support.appendChild(document.createTextNode("TW Pro+: "));
		twpro_support.appendChild(twpro_supportLink);
		twpro_support.appendChild(document.createTextNode(' '+TWPro.lang.AUTHOR+': '));
		twpro_support.appendChild(twpro_supportAuthor);
		var translator = TWPro.lang.info;
		if(translator && translator.length){
			var twpro_translatorLink = document.createElement('a');
			twpro_translatorLink.appendChild(document.createTextNode(translator[0]));
			if(translator.length > 1){
				if(translator.length > 3 && translator[3].indexOf('.'+location.host.match(/\w+\./)) != -1){
					twpro_translatorLink.href = 'javascript:AjaxWindow.show("profile",{char_id:'+translator[2]+'},"'+translator[2]+'");';
				}
				else{
					twpro_translatorLink.href = translator[1];
					twpro_translatorLink.target = '_blank';
				}
			}
			twpro_support.appendChild(document.createTextNode(" "+TWPro.lang.TRANSLATOR+": "));
			twpro_support.appendChild(twpro_translatorLink);
		}
			twpro_support.appendChild(document.createTextNode(" ["));
			var langChanger = document.createElement("a");
			langChanger.appendChild(document.createTextNode("Change language"));
			langChanger.href = "javascript://Change language";
			langChanger.onclick = function() {
			  var newlang = prompt("LANGUAGE PACK\n\n Visit your community forum to know if there is one for your language or learn how to make your own at this page: http://userscripts.org/scripts/show/94133\n\n For French language, you can just type \"fr\" in this box.\n\nPlease enter a valid language pack url:\n", (localStorage.getItem("TWPro_LanguagePack") ? decodeURIComponent(localStorage.getItem("TWPro_LanguagePack")) : "http://"));
			  if (newlang != null) {
				if (newlang.length > 7 || newlang == "fr") {
				  if (decodeURIComponent(localStorage.getItem("TWPro_LanguagePack")) != newlang) new HumanMessage("Language pack applied.<br><br>Please refresh your page (press F5).", {type:'success'});
				  window.twpro_initLanguage(newlang);
				}
				else {
				  localStorage.removeItem("TWPro_LanguagePack")
				}
			  }
			};
			twpro_support.appendChild(langChanger);
			twpro_support.appendChild(document.createTextNode("]"));
		if (!TWPro.twpro_active || TWPro.twpro_failure) {
			twpro_support.appendChild(document.createElement("br"));
			twpro_support.appendChild(document.createTextNode(" ("+TWPro.lang.TWPRO_DISABLED+")"));
		}
		if (twpro_version.search(/[a-z]/i) != -1) {
			var twpro_beta = document.createElement('span');
			twpro_beta.innerHTML = '<br><span style="color:red;">/!\\ This is a BETA-DEV version.</span> Please do not share this script on public forums as it is not always up-to-date and I can\'t guarantee the follow-up. I always recommend to use the final release available <a href="http://userscripts.org/scripts/show/92'+'414" target="_blank">HERE</a>';
			twpro_support.appendChild(twpro_beta);
		}
		var flags = 'data:image/gif;base64,R0lGODlhawAKAOYLAAAAACwHCq4cKLMYJsYLHqUJGScfAP7LAPy0CO0pOe9EUv///+ns9gAjlRIznf7z9OMpPQAklQYpmBU2nsbO57vE4xc4nwQnllRsuIGTywEllQImloqbz0ljs7ksI+JnD7xWDP/+//vIyvvMzvzY2UNesWyAwnOHxTtXrpMAAKgtLuSzt+q3kf/EAPa8A9CRDuCeCtSjANs1SlyJwXmbye8nMPiipvRrceJQXFWAveYrPkBbr0BbsENdsdTa7czT6t0AAOZBQf/zydieEZxUHsSXR+SyD9AuRgtOojtsr/A9RficoPV+g95JVwpKoe4yQfzAAMBxL31LM7+DXNSSLChhq+EvPLlPackpPsdOZOhFANtkN7XB2MXCq8SgLrN2H8x8EdCtLNosQVc9eHhpmA1OohtXpYBciE87e//OAMesIyFGi0pNce0nNu4cJe4fKLpUbdRFVtodLjBNqV91vGl/wSZEpUQ6dGd8wI+f0AIllpWk0xM1nRY3ngQnlwAAACwAAAAAawAKAAAH/4AAgoOEhQABAomKi4sDBI+QkZEFhAYHlwcICZsJCiGfoKGhDHqleg6hD5wJEBt6En2uFCEVrn0SpYa6g4iMvomOksKPlIOWmJqcnqLMn6QNpaigqpwQpRgZpbMVehscHdC7u72/jB4f6Onq6iCVmJmryyEiIyIkzc8NDdKf1JvWDUrU0dNgW7cTKPSlWMiwocMUKlZInEiRIosWGF28gIGxY8cY7pCtkjFjBo0aNm7gKMmyZA590PiF8JdAx46bJW76CPED580dQIIKHUoUSJBmzYR0HEKkiBGPH0NeSrbpCBIkSZQsYdLkqterTgjqk0nzCdJmRdMKPXo2lFKMUdekTKECFSNIY++oJrCKpIoVOFiyfPXqBOapVKvMtg2lpbHjx5C1bOFCubJly106evkCJkzdFncFHZu6SsyY02TKmDlzuvVpNGL3IeZkM2eJnDt77rC9I43v38CDp1Gzprjx48fZrFuerh1ekZzavHHz5g2cONSzT38jxzDZVa0azKHTYMO2DRvq2CkvvP1v4sjjF78zbFgx0XlXtXHDv79//93B9F01BOGRxwYF0YLeHnQg6J578MmHHH31SXIfAKPBE91/HPYXYEyz/VOeBHyUt015sZQXCAA7'
		var ib = document.getElementById('main_footnotes');
		ib.insertBefore(twpro_support, ib.firstChild);
		$(twpro_supportAuthor.id).addMousePopup(new MousePopup('<table cellspacing="0" cellpadding="0"><tr><td>Author:</td><td><img src="images/forum/icon/gold.png" height="13" width="13" style="margin-top:-3px">&nbsp;</td><td>Nexton<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')0px;width:17px;height: 10px;"></div></td></tr><tr><td>Contributor:</td><td><img src="images/forum/icon/gold.png" height="13" width="13" style="margin-top:-3px">&nbsp;</td><td>Lekensteyn<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')-17px;width:15px;height: 10px;"></div></td></tr><tr><td>Contributor:</td><td><img src="images/forum/icon/bronze.png" height="13" width="13" style="margin-top:-3px">&nbsp;</td><td>Sandevil<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')-32px;width:15px;height: 10px;"></div></td></tr><tr><td>Contributor:</td><td><img src="images/forum/icon/bronze.png" height="13" width="13" style="margin-top:-3px">&nbsp;</td><td>Pedro Ramirez<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')0px;width:17px;height: 10px;"></div></td></tr><tr><td>Contributor:</td><td><img src="images/forum/icon/silver.png" height="13" width="13" style="margin-top:-3px">&nbsp;</td><td>Puli<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')-62px;width:15px;height: 10px;"></div></td></tr><tr><td>Contributor:</td><td><img src="images/forum/icon/silver.png" height="13" width="13" style="margin-top:-3px">&nbsp;</td><td>aka Y.<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')-77px;width:15px;height: 10px;"></div></td></tr><tr><td>Contributor:</td><td><img src="images/forum/icon/bronze.png" height="13" width="13" style="margin-top:-3px">&nbsp;</td><td>Danosaure<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')-92px;width:15px;height: 10px;"></div></td></tr><tr><td>This release:</td><td><img src="images/forum/icon/gold.png" height="13" width="13" style="margin-top:-3px">&nbsp;</td><td>Zyphir Randrott<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')-47px;width:15px;height: 10px;"></div></td></tr></table>'));
/*		if (TWPro.twpro_failureInject) {
			TWPro.twpro_throwFailure();
		}*/
	}

	function twpro_split_fortbattle(){
		if(TWPro.settings_prefs['splitFortbattle']=='true'){
			for(var i=0; i<TWPro.twpro_health_priority.length; i++){
			  for(var j=0; j<TWPro.twpro_battle_unit.length; j++){
				TWPro.twpro_jobValues["twpro_fortatt_"+TWPro.twpro_health_priority[i]+"_"+TWPro.twpro_battle_unit[j]] = {'erfahrung':-1, 'lohn':-6, 'glueck':-6, 'gefahr':-1};
				extra_jobs.push("twpro_fortatt_"+TWPro.twpro_health_priority[i]+"_"+TWPro.twpro_battle_unit[j]); 
				TWPro.twpro_jobValues["twpro_fortdef_"+TWPro.twpro_health_priority[i]+"_"+TWPro.twpro_battle_unit[j]] = {'erfahrung':-1, 'lohn':-6, 'glueck':-6, 'gefahr':-1};
				extra_jobs.push("twpro_fortdef_"+TWPro.twpro_health_priority[i]+"_"+TWPro.twpro_battle_unit[j]); 
			  }
			}
		}
	}

	function twpro_preference(pref, enabledValue){
		if(!(pref in TWPro.prefs)) return false;
		var prefVal = TWPro.prefs[pref];
		if(typeof enabledValue == 'undefined'){
			if(typeof prefVal != 'number') return prefVal;
			return TWPro.prefNumber & prefVal;
		}
		if(typeof prefVal != 'number'){
			document.cookie = 'twpro_'+Character.playerId+'_'+pref+'='+enabledValue+'; max-age=31536000';
			return enabledValue;
		}
		if(enabledValue) TWPro.prefNumber |= prefVal;
		else TWPro.prefNumber = (TWPro.prefNumber | prefVal) - prefVal;
		document.cookie = 'twpro_'+Character.playerId+'_prefs='+TWPro.prefNumber+'; max-age=31536000';
		return enabledValue;
	}
	function twpro_handleSettings_prefs(type, val){
		TWPro.settings_prefs[type] = val;
		var settings_prefs = [];
		for(var i in TWPro.settings_prefs){
			settings_prefs.push(i+":"+TWPro.settings_prefs[i]);
		}
		TWPro.twpro_preference('settings_prefs', settings_prefs.join('|'));
	}	
	
	function twpro_throwFailure() {
		if (TWPro.twpro_failure) return;
		TWPro.twpro_failure = true;
		for (var twpro_i = 0; twpro_i < TWPro.twpro_failureRollback.length; twpro_i++) {
			eval(TWPro.twpro_failureRollback[twpro_i]);
		}
	}

	function twpro_injectionSwitch(twpro_extendeName, twpro_injectionType, twpro_data, twpro_jsversion, twpro_params) {
		if (TWPro.twpro_failure) return;
		if (!twpro_extendeName) {
			return;
		} else
//		alert(twpro_extendeName+"\n\n"+twpro_injectionType+"\n\n"+twpro_data[twpro_jsversion]);
		switch (twpro_injectionType) {
		case 'page':

			{
			//alert("page");
			if (twpro_extendeName == 'inventory') {
						TWPro.twpro_internalWindowToTop("window_inventory");
						TWPro.twpro_insertList(twpro_data);
					}
					else if(twpro_extendeName == 'item_trader'){
						TWPro.twpro_getPlace(twpro_data, twpro_extendeName, twpro_jsversion);
					}
					else if(twpro_extendeName.substr(0, 16) == 'building_market_'){
						TWPro.twpro_market_list = [];
						TWPro.twpro_getPlace(twpro_data, twpro_extendeName, twpro_jsversion);
						var town_id = twpro_extendeName.match(/\d+/),
						market_id = twpro_data.page.match(/InventoryTownTraderControl\(AjaxWindow\.getWindowDivId\('market',\d+\)\), 'market', '(\d+)'\);/);
						if(!town_id || !market_id) return;
						market_id = market_id[1];
						TWPro.searchTrader[town_id] = {timer:null};
						(new Image()).src = twpro_loadingSearchImg;
						twpro_data.page = twpro_data.page.replace(/top:18px' id="market_\d+_inv_div"><\/div>/, 'height:350px;$&<div style="margin-top:19px;position:relative;"><label style="position:absolute;top:4px;left:21px;font-style:italic;color:#636;cursor:pointer" for="twpro_market_'+town_id+'_search" class="twpro_lang_SEARCHINVENTORY">'+TWPro.lang.SEARCHINVENTORY+'</label><input type="text" style="width:150px;background:#F0CD8B url(data:image/png;base64,'+twpro_searchButtonImg+') no-repeat scroll 0 0;padding:0 2px 0 19px" id="twpro_market_'+town_id+'_search" onfocus="previousSibling.style.display=\'none\'" onblur="if(this.value==\'\')previousSibling.style.display=\'block\'" onkeyup="TWPro.twpro_searchTrader(event.keyCode==13,null,'+town_id+', '+market_id+')" /><span id="twpro_search_help" style="font-weight:bold;color:#191970;cursor:help;background:#D4C7B0;width:20px;height:17px" title="'+TWPro.lang.SEARCHHELP+'">?</span></div>');
				}
				else if(twpro_extendeName.substr(0, 4) == 'job_' || twpro_extendeName.substr(0, 15) == 'cityhall_build_'){
						var workSpeed = (twpro_data.js ? twpro_data.js.match(/JobCalculation\.workSpeed\s*=\s*([^;]+);/) : JobCalculation.workSpeed)||[,1];
						var hours = workSpeed[1] * 2,
							seconds = hours * 3600;
						twpro_data.page = twpro_data.page.replace(new RegExp('(value="'+seconds+'")( label="'+hours+' .+?")?>'+hours+' '), '$1$2 selected="selected">'+hours+' ');
					}
				else if(twpro_extendeName.substr(0, 13) == 'reports_show_'){
						if(twpro_data.page.match(/<object /)){
							twpro_data.page = twpro_data.page.replace('width: 460px; height: 270px;', 'width: 414px; height: 243px;').replace(/height="270"/g, 'height="243"').replace(/width="460"/g, 'width="414"').replace('</object>', '</object><br />');
						}
					twpro_data.page = convertduelreport('window_'+twpro_extendeName, twpro_data.page);
				}
					else if(twpro_extendeName.substr(0, 7) == 'profile' && twpro_params){
					/* hack to have one profile window */
						if(typeof twpro_params.player_name == "string"){
							var char_id = twpro_data.page.match(/WMap\.scroll_map_to_player\((\d+)\);/),
							profile_name = 'profile_'+decodeURIComponent(twpro_params.player_name);
							if(!char_id) break;
							twpro_params.char_id = char_id[1]; 
							char_id = 'profile_'+char_id[1];
							var oldWindow = document.getElementById("window_"+char_id);
							if(oldWindow){
								document.getElementById("window_"+profile_name).style.cssText = oldWindow.style.cssText;
								document.getElementById("window_"+profile_name).style.zIndex = lastIndex;
								AjaxWindow.close(char_id);
							}
							document.getElementById("window_"+profile_name).id = "window_"+char_id;
							document.getElementById("window_"+profile_name+"_title").id = "window_"+char_id+"_title";
							document.getElementById("window_"+char_id+"_title").firstChild.innerHTML = "window_"+char_id+"_title";
							document.getElementById("window_"+profile_name+"_content").id = "window_"+char_id+"_content";
							twpro_profile = document.getElementById("window_"+char_id).getElementsByTagName("a");
							twpro_profile[0].href = "javascript:AjaxWindow.show('profile',{char_id:'"+char_id.substr(8)+"'}, '"+char_id.substr(8)+"');";
							twpro_profile[2].href = decodeURIComponent(twpro_profile[2].href).replace(profile_name, char_id);
							twpro_profile[3].href = decodeURIComponent(twpro_profile[3].href).replace(profile_name, char_id);
							twpro_data.page = twpro_data.page.replace(new RegExp(profile_name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "gi"), char_id);
							twpro_data.js = twpro_data.js.replace(new RegExp(profile_name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "gi"), char_id);
							AjaxWindow.windows[char_id] = AjaxWindow.windows[profile_name];
							AjaxWindow.windows[profile_name] = null;
							delete twpro_params.player_name;
							delete AjaxWindow.windows[profile_name];
							twpro_data.newExtendeName = char_id;
							
						}
					}
				else if(twpro_extendeName.substr(0,15) == 'building_saloon' ){
	 			 var twpro_advice_elementid="window_"+twpro_extendeName;
				  var twpro_advice_elementin=$(twpro_advice_elementid);
					if (Character.name == 'William Manney' || Character.name == 'Sandevil' || Character.name == 'Belgo' || Character.name == 'Manolkin' || Character.name == 'Coprofagia'  || Character.name == 'cliff hamett' || Character.name == 'walkerutebo' || Character.name == 'igmu' || Character.name == 'henryque' || Character.name == 'Ambrosio II' || Character.name == 'Zebx') {
	 				 twpro_data.page = makeadvicemessage(twpro_advice_elementin, twpro_data.page);
					}
					}
					else if(twpro_extendeName.substr(0, 14) == 'building_quest' && twpro_params && twpro_params.town_id) {
						var town_id = twpro_params.town_id,
							i_name = "building_quest",
							i_old = i_name+"_"+town_id,
							win_name = "window_building_quest",
							win_old = win_name+"_"+town_id;
						var oldWindow = document.getElementById(win_name);
							if(oldWindow){
								document.getElementById(win_old).style.cssText = oldWindow.style.cssText;
								document.getElementById(win_old).style.zIndex = lastIndex;
								AjaxWindow.close(i_name);
							}
							document.getElementById(win_old).id = win_name;
							document.getElementById(win_old+"_title").id = win_name+"_title";
							document.getElementById(win_name+"_title").firstChild.innerHTML = win_name+"_title";
							document.getElementById(win_old+"_content").id = win_name+"_content";
							twpro_profile = document.getElementById(win_name).getElementsByTagName("a");
							twpro_profile[0].href = "javascript:AjaxWindow.show('building_quest');";
							twpro_profile[2].href = decodeURIComponent(twpro_profile[2].href).replace("_"+town_id, "");
							twpro_profile[3].href = decodeURIComponent(twpro_profile[3].href).replace("_"+town_id, "");
							twpro_data.page = twpro_data.page.replace("building_quest_"+town_id, "building_quest");
							twpro_data.js = twpro_data.js.replace("building_quest_"+town_id, "building_quest");
							AjaxWindow.windows[i_name] = AjaxWindow.windows[i_old];
							AjaxWindow.windows[i_old] = null;
							delete twpro_params.town_id;
							delete AjaxWindow.windows[i_old];
							twpro_data.newExtendeName = i_name;
    			       }
				break;
			}
		case 'js':
			{
			//alert("js");
				if ((twpro_extendeName == 'inventory') || (twpro_extendeName.substr(0, 15) == 'building_tailor') || (twpro_extendeName.substr(0, 17) == 'building_gunsmith') || (twpro_extendeName.substr(0, 16) == 'building_general')) {
					TWPro.twpro_getPlace(twpro_data, twpro_extendeName, twpro_jsversion);
				}
				else if(twpro_extendeName.substr(0, 13) == 'reports_show_'){
					if(typeof twpro_data.jsContent != 'undefined' && twpro_data.jsContent.match(/replaceWith\(new Item/)){
						TWPro.twpro_getPlace(twpro_data, twpro_extendeName, twpro_jsversion);
					}
					else if(typeof twpro_data.js != 'undefined' && twpro_data.js.match(/replaceWith\(new Item/)){
						TWPro.twpro_getPlace(twpro_data, twpro_extendeName, "js");
					}
				}
				else if(twpro_extendeName.substr(0, 7) == 'profile'){
					if(typeof twpro_params.player_name == "string"){
						var char_id = twpro_data.page.match(/WMap\.scroll_map_to_player\((\d+)\);/),
						profile_name = 'profile_'+decodeURIComponent(twpro_params.player_name);
						if(!char_id) break;
						twpro_data.js = twpro_data.js.replace(new RegExp(profile_name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "gi"), char_id);
						twpro_data.js = "alert(1)";
						AjaxWindow.windows[char_id] = AjaxWindow.windows[profile_name];
						AjaxWindow.windows[profile_name] = null;
						delete twpro_params.player_name;
						delete AjaxWindow.windows[profile_name];
						twpro_data.newExtendeName = char_id;
						
					}
					try{
						var who = twpro_data.response.text.match(/messages', {addressee:'([^']+)'}/);
						if(who){
							try{
								who = Json.evaluate('"'+who[1]+'"');
							}
							catch(e){
								who = null;
							}
						}
						if(!who){
							who = $('window_'+twpro_extendeName).getElement('.char_name');
							who = (who.textContent ? who.textContent : who.innerText).replace(/^\s+/, '').replace(/ \([^)]+\)$/, '');
						}

						if(who) (new Ajax('/game.php?window=ranking&mode=ajax_duels',
						{
							data: {
								type: 'duels',
								page: 0,
								skill: 0,
								search: who,
								rank: 0,
								action: 'search'
							},
							method: 'post',
							onComplete: function(resp){
								if(resp){
									var re=new RegExp("'"+twpro_extendeName.substr(8)+"'\\);\\\\\">[^<]+<\\\\\\/a><\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>\\d+<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(\\d+)<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(\\d+)<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(-?\\d+)<"), d = resp.match(re);
									if(d){
											var tr = document.createElement('tr'),
												td = document.createElement('td');
											td.colSpan = '2';
											td.style.cssText = "max-width:212px;font-size:8pt;";
											var trans = resp.match(/("gew|"ver|diff)\\">[^.<]+/g);
											td.appendChild(document.createTextNode(eval('"' + trans[0].substr(7) + ": " + d[1] + " | " + trans[1].substr(7) + ": " + d[2] + " | " + trans[2].substr(7) + ": " + d[3] + '"')));
											tr.appendChild(td);
											var rp = $('window_'+twpro_extendeName).getElement('.rank').parentNode;
											rp.nextSibling.nextSibling.cells[0].style.padding = '0';
											rp.parentNode.insertBefore(tr, rp.nextSibling);
											rp.parentNode.parentNode.style.borderCollapse = 'collapse';
									}
								}
							}
						})).request();
					}
					catch(e){}
				}
				break;
			}
		case 'after':
			{
			//alert("after");
				if (twpro_extendeName == 'inventory') {
					var bagretry=0;
					function twpro_loader() {
						if (!AjaxWindow.windows['inventory'].isReady) {
							setTimeout( function() {twpro_loader();}, 200);
							return;
						} else {
							if (jQuery.isEmptyObject(Bag.items) && bagretry<=10) {
								bagretry++;
								setTimeout( function() {twpro_loader();}, 200);
								return;
							} else {
								TWPro.twpro_initializeItems('bag',null);
								document.getElementById("window_inventory_title").innerHTML = "<div style='position:relative;float:right;right:355px'>"+document.getElementById("window_inventory_title").innerHTML+"</div>";
								var specialMessageDiv = document.getElementById("twpro_specialMessage");
								if(specialMessageDiv) specialMessageDiv.innerHTML = "";
								else{
									specialMessageDiv = document.createElement("div");
									specialMessageDiv.id = "twpro_specialMessage";
									specialMessageDiv.style.cssText = "position: absolute; font-size: 10px; color:#ffffff; top: 0px; padding-top: 2px; height: 2em; left: 355px; overflow: hidden; width: 200px; z-index: 1; font-weight:normal;";
									document.getElementById("window_inventory_title").appendChild(specialMessageDiv);
								}
								var specialMessageDiv2 = document.getElementById("twpro_specialMessage2");
								if(specialMessageDiv2) specialMessageDiv2.innerHTML = "";
								else{
									specialMessageDiv2 = document.createElement("div");
									specialMessageDiv2.id = "twpro_specialMessage2";
									specialMessageDiv2.style.cssText = "position: absolute; font-size: 10px; color:#ffffff; top: 0px; padding-top: 3px; height: 2em; left: 5px; overflow: hidden; width: 280px; z-index: 1; font-weight:normal;";
									document.getElementById("window_inventory_title").appendChild(specialMessageDiv2);
								}
								var twpro_aktuelleapvalueDiv = document.getElementById("twpro_aktuelleapvalue");
								if(twpro_aktuelleapvalueDiv) twpro_aktuelleapvalueDiv.innerHTML = "";
								else{
									twpro_aktuelleapvalueDiv = document.createElement("div");
									twpro_aktuelleapvalueDiv.id = "twpro_aktuelleapvalue";
									twpro_aktuelleapvalueDiv.style.cssText = "position:absolute;right:80px;top:-4px;border-style:solid;border-width:1px;padding:2px;font-size:13px;color:#000000;visibility:hidden;";
									document.getElementById("window_inventory_title").appendChild(twpro_aktuelleapvalueDiv);
								}
								TWPro.twpro_showList();
							}	
						}
					}
					twpro_loader();
					
				} else if(twpro_extendeName.substr(0,15) == 'fort_battlepage' ){
				     var twpro_fort_elementid="window_"+twpro_extendeName;
				     var twpro_fort_elementin=$(twpro_fort_elementid);
	 				 makefortmessage(twpro_fort_elementin);
			    }
/*				else if (twpro_extendeName == 'messages') {
				  document.getElementById('tab_write').firstChild.style.width = '610px';
				  var messagebox = document.getElementById('write_table');
				  messagebox.parentNode.style.cssText = 'overflow: auto; height: 397px; width: 595px;';
				  messagebox.style.width = '575px';
				  messagebox = messagebox.getElementById('text');
				  insertbbcodesfunc(messagebox, false);
			    }
*/
				else if(twpro_extendeName.substr(0, 15) == 'building_hotel_'){
				  var twpro_table_rooms = document.querySelector('table.rooms');
				  if (twpro_table_rooms) {
					for (var i=twpro_table_rooms.getElementsByTagName('input').length-1;i>=0;i--)	{
					  if (!twpro_table_rooms.getElementsByTagName('input')[i].disabled && (twpro_table_rooms.getElementsByClassName('costs')[i].innerHTML.indexOf('$') == -1 || twpro_table_rooms.getElementsByClassName('costs')[i].innerHTML.indexOf('$ 0') != -1 ||  i == 0)){
						  twpro_table_rooms.getElementsByTagName('input')[i].checked = "checked";
						  break;
					  }
					}
				  }
				}
				else if(twpro_extendeName.substr(0, 15) == 'building_tailor' || twpro_extendeName.substr(0, 17) == 'building_gunsmith' || twpro_extendeName.substr(0, 16) == 'building_general'){
					TWPro.twpro_multisell(twpro_extendeName);
				}
				break;
			}
		}
	}


		var skill_to_AttNum = {
			build: ["strength", 0],
			punch: ["strength", 1],
			tough: ["strength", 2],
			endurance: ["strength", 3],
			health: ["strength", 4],
	
			ride: ["flexibility", 0],
			reflex: ["flexibility", 1],
			dodge: ["flexibility", 2],
			hide: ["flexibility", 3],
			swim: ["flexibility", 4],
	
			aim: ["dexterity", 0],
			shot: ["dexterity", 1],
			pitfall: ["dexterity", 2],
			finger_dexterity: ["dexterity", 3],
			repair: ["dexterity", 4],
	
			leadership: ["charisma", 0],
			tactic: ["charisma", 1],
			trade: ["charisma", 2],
			animal: ["charisma", 3],
			appearance: ["charisma", 4]
		};
		function twpro_bestLifeRestore(){
			var bag_items = Bag.getInstance().items, wear={}, iid, type, item, order=[], i, setcount=0,
			dlife = Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?20:15):10,
			lifes = 90 + 10 * Character.level + dlife * Character.skills.health, newlifes,
			sleeper_bonuses =
				[	[.00,  00]/*0*/,
					[.00, .06]/*1*/,
					[.06, .02]/*2*/,
					[.08, .04]/*3*/,
					[.12, .06]/*4*/,
					[.18, .07]/*5*/,
					[.25,  00]/*6*/
				],
			twpro_job = {
				twpro_calculation: "(90 + 10 * Character.level + (Character.characterClass=='soldier'?(PremiumBoni.hasBonus('character')?20:15):10) * ((Character.bonus.attributes.health||0) + (Character.skills.health||0))) * TWPro.twpro_sleeperBonus()",
				malus: -1,
				name: TWPro.lang.REGENERATION,
				shortName: "regeneration",
				twpro_jobid: 0,//////////// TWPro.twpro_jobs.length
				twpro_skill: Character.skills.health,////// min level
				twpro_skills: "0",
				twpro_attributes: "0",
				twpro_bestStats: {},
				twpro_aps: 0,
				twpro_parsedItemBonus: {},// Set items...
				twpro_bestCombi: {},// Set items...
				twpro_noSetAps: 0,
//				luckItemValue: 0,
//				money: 0,

				maxlifes: 0,
				sleepCount: 0
			},
			bestStats, items,
			mexican=1,
			donkey=[];
			
			for(type=0; type<TWPro.twpro_bag.twpro_types.length; type++){
				wear[TWPro.twpro_bag.twpro_types[type]] = [[]/*sleeper item & best item*/, [{twpro_jobbonus:{regeneration:0}}]/*lifepoints bonus item*/, []/*Mexican set?*/];
			}
			for(type in Wear.wear){
				if((item=Wear.wear[type].obj) && item.set && item.set.key == "set_sleeper" && TWPro.twpro_wearItem(item)){
					if(!wear[item.type][0][0]) setcount++;
					wear[item.type][0].push(item);
				}
				else if(item.bonus && (newlifes=(item.bonus.skills && item.bonus.skills.health || 0)+(item.bonus.attributes && item.bonus.attributes.strength || 0)) && TWPro.twpro_wearItem(item)){
					if(!item.twpro_jobbonus) item.twpro_jobbonus = {};
					if(!TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus = {};
					TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus.regeneration = item.twpro_jobbonus.regeneration = dlife * newlifes;
					if(dlife*newlifes == wear[item.type][1][0].twpro_jobbonus.regeneration){
						wear[item.type][1].push(item);
					}
					else if(dlife*newlifes > wear[item.type][1][0].twpro_jobbonus.regeneration){
						wear[item.type][1] = [item];
					}
				}
				if(item.set && item.set.key == "set_mexican" && TWPro.twpro_wearItem(item)){
					if(item["short"] == "donkey"){
						donkey.push(item);
					}
					else wear[item.type][2].push(item);
				}
			}
			for(iid in bag_items){
				if((item=bag_items[iid].obj) && item.set && item.set.key == "set_sleeper" && TWPro.twpro_wearItem(item)){
					if(!wear[item.type][0][0]) setcount++;
					wear[item.type][0].push(item);
				}
				else if(item.bonus && (newlifes=(item.bonus.skills && item.bonus.skills.health || 0)+(item.bonus.attributes && item.bonus.attributes.strength || 0)) && TWPro.twpro_wearItem(item)){
					if(!item.twpro_jobbonus) item.twpro_jobbonus = {};
					if(!TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus = {};
					TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus.regeneration = item.twpro_jobbonus.regeneration = dlife * newlifes;
					if(dlife*newlifes == wear[item.type][1][0].twpro_jobbonus.regeneration){
						wear[item.type][1].push(item);
					}
					else if(dlife*newlifes > wear[item.type][1][0].twpro_jobbonus.regeneration){
						wear[item.type][1] = [item];
					}
				}
				if(item.set && item.set.key == "set_mexican" && TWPro.twpro_wearItem(item)){
					if(item["short"] == "donkey"){
						donkey.push(item);
					}
					else wear[item.type][2].push(item);

				}

			}
			
			for(type in wear){
				if(wear[type][1][0].twpro_jobbonus.regeneration){
					order.push(wear[type][1]);
				}
			}
			order.sort(function(x,y){return y[0].twpro_jobbonus.regeneration-x[0].twpro_jobbonus.regeneration;});
			
			for(i=order.length-1; i>=0; i--){
				type = order[i][0].type;
				if(!wear[type][0][0]){
					wear[type][0] = order[i];
					lifes += order[i][0].twpro_jobbonus.regeneration;
					order.splice(i, 1);
				}
			}
			for(i=0; i<order.length; i++){
				type = order[i][0].type;
				newlifes = lifes + order[i][0].twpro_jobbonus.regeneration;
				if(lifes * (1+sleeper_bonuses[setcount--][0]) < newlifes * (1+sleeper_bonuses[setcount][0])){
					wear[type][0] = order[i];
					lifes = newlifes;
					continue;
				} else{
					// All other sleeper set items will > the other Lifepoints clothing
					setcount++;
					break;
				}
			}
			if(donkey.length){//if a donkey exists, mexican=1 counts for donkey
				nextWearType:for(type in wear){
					if(!wear[type][0][0] && wear[type][2][0]){
						mexican++;
					}
					else{
						for(i=0; i<wear[type][0].length; i++){
							if(wear[type][0][i].set && wear[type][0][i].set.key == "set_mexican"){
								mexican++;
								continue nextWearType;
							}
						}
						wear[type][2] = [];
					}
				}
				if(mexican > 1){
					for(type in wear){
						if(wear[type][2][0]){

							for(i=0; i<wear[type][2].length; i++){
								if(!wear[type][2][i].twpro_jobbonus || !wear[type][2][i].twpro_jobbonus.regeneration) {wear[type][2][i].twpro_jobbonus = {regeneration:0};
								}
								wear[type][2][i].twpro_jobbonus.regeneration++;
							}
							wear[type][0] = wear[type][2];
						}
					}
					var mexicanLifes = [0, 0, 1, 2, 4, 6, 9, 12][mexican]*dlife;
					for(i=0; i<donkey.length; i++){
						if(!donkey[i].twpro_jobbonus) donkey[i].twpro_jobbonus = {};
						donkey[i].twpro_jobbonus.regeneration = mexicanLifes;
					}
					wear["animal"][0] = donkey;
					lifes += mexicanLifes;
					twpro_job.twpro_bestAnimal = mexicanLifes;
				}
			}
			for(type in wear){
				items = wear[type][0];
				item = items[0];
				if(!items[0]) bestStats = 0;
				else if(item.set && item.set.key == "set_sleeper"){
					bestStats = Math.round(sleeper_bonuses[setcount][0] * lifes);
				}
				else{
					bestStats = item.twpro_jobbonus.regeneration;
				}
				twpro_job.twpro_bestStats[type] = bestStats;
				for(i=0; i<items.length; i++){
					if(!items[i].twpro_jobbonus) items[i].twpro_jobbonus = {};
					if(!TWPro.twpro_itemStorage[items[i].item_id].twpro_jobbonus) TWPro.twpro_itemStorage[items[i].item_id].twpro_jobbonus = {};
					TWPro.twpro_itemStorage[items[i].item_id].twpro_jobbonus.regeneration = items[i].twpro_jobbonus.regeneration = bestStats;
					TWPro.twpro_itemStorage[items[i].item_id].twpro_bonus = items[i].twpro_bonus = true;
				}
			}
			twpro_job.maxlifes = lifes;
			twpro_job.sleepCount = setcount;
			TWPro.twpro_jobValues.regeneration.laborp = twpro_job.twpro_skill = twpro_job.twpro_aps = twpro_job.twpro_noSetAps = Math.round(lifes * (1+sleeper_bonuses[setcount][0]));
			return twpro_job;
		}
		function twpro_sleeperBonus(sleepCount){
			var type,
			sleeper_bonuses =
				[	[.00,  00]/*0*/,
					[.00, .06]/*1*/,
					[.06, .02]/*2*/,
					[.08, .04]/*3*/,
					[.12, .06]/*4*/,
					[.18, .07]/*5*/,
					[.25,  00]/*6*/
				];
			if(!(1*sleepCount) || isNaN(sleepCount)){
				sleepCount = 0;
				for(type in Wear.wear){
					if(Wear.wear[type].obj.set && Wear.wear[type].obj.set.key == "set_sleeper") sleepCount++;
				}
			}
			return 1+sleeper_bonuses[sleepCount][0];
		}


	function twpro_activeJob() {
		if (TWPro.twpro_failure) return false;
		return TWPro.twpro_calculated && document.getElementById("twpro_jobList") && document.getElementById("twpro_jobList").selectedIndex != 0;
	}


	function twpro_multisell(twpro_extendeName){
						try{
							var ins = $('window_'+twpro_extendeName+'_content').getElement('#own_inv_div h2'),
								stu = $('window_'+twpro_extendeName+'_content').getElements('.own_inv .bag_item'),
								but = document.createElement('button'),
								bas = document.createElement('input'),
								amount = document.createElement('span');
							if($('multisell')) {
							  if($('multisell').parentNode.parentNode.childNodes[3].id == "own_inv_div"){
								$('multisell').parentNode.parentNode.childNodes[3].removeChild($('multisell'));
							  }
							  else if($('multisell').parentNode.parentNode.childNodes[4].id == "own_inv_div"){
								$('multisell').parentNode.parentNode.childNodes[4].removeChild($('multisell'));
								  }
							}
							newDiv = document.createElement('div');
							newDiv.id= "multisell";
							$('window_'+twpro_extendeName+'_content').getElement('#own_inv_div h2').style.paddingLeft = "30px";
							newDiv.style.cssText = 'position:absolute;right:15px';
							amount.style.cssText = 'padding-right:10px;font-weight:bold;';
							but.style.cssText = 'font-size:small;';
							bas.style.cssText = 'bottom:25px;float:right;font-size:small;font-weight:bold;right:3px;opacity:.7;overflow:hidden;position:relative;z-index:2;text-align:center;width:25px;height:16px;';
							bas.type = 'text';
							bas.className = 'lkn_shopsell';
							but.innerHTML = TWPro.lang.MULTISEL;
							but.onclick = function(){
								var twpro_playerInventory = PlayerInventory.getInstance(), total_amount=0;
								but.disabled = true;

								for(var i=0, wat, count; i<stu.length; i++){
									wat = bas.cloneNode(false);
									if(!stu[i].getElementsByTagName('p').length){
										wat.readonly = 'readonly';
										wat.onclick = function(){
											save_value = this.value;
											this.value = this.value == 1 ? '' : 1;
											diff_value = this.value - save_value;
											amount.innerHTML = total_amount = total_amount + (diff_value * twpro_playerInventory.data[this.parentNode.id.substr(5)].sell_price);
											amount.innerHTML += ' $';
											save_value = this.value;
										};
										wat.onkeyup = function(){
											diff_value = this.value - save_value;
											amount.innerHTML = total_amount = total_amount + (diff_value * twpro_playerInventory.data[this.parentNode.id.substr(5)].sell_price);
											amount.innerHTML += ' $';
											save_value = this.value;
										};
									}
									else{
										wat.onclick = function(){
											save_value = this.value;
											var all = this.parentNode.getElementsByTagName('p')[0].innerHTML;
											this.value = this.value == all ? '' : all;
											diff_value = this.value - save_value;
											amount.innerHTML = total_amount = total_amount + (diff_value * twpro_playerInventory.data[this.parentNode.id.substr(5)].sell_price);
											amount.innerHTML += ' $';
											save_value = this.value;
											this.select();
										};
										wat.maxLength = 3;
										wat.onkeyup = function(){
											diff_value = this.value - save_value;
											amount.innerHTML = total_amount = total_amount + (diff_value * twpro_playerInventory.data[this.parentNode.id.substr(5)].sell_price);
											amount.innerHTML += ' $';
											save_value = this.value;
										};
										wat.onblur = function(){
											var n = Math.max(parseInt(this.value, 10) || 0, 0);
											n = Math.min(n, this.parentNode.getElementsByTagName('p')[0].innerHTML);
											this.value = n == '0' ? '' : n;
										};
									}
									stu[i].appendChild(wat);
								}
								but.innerHTML = TWPro.lang.SELL;
								but.onclick = function(){
									but.disabled = true;
									var sellList = [], building = twpro_extendeName == "item_trader" ? "item_trader" : twpro_extendeName.match(/building_[^_]+/)+'',
									baseUrl='game.php?window='+building+'&action=sell&h='+h, town_id=twpro_extendeName.match(/\d+/);
									for(var i=0, n; i<stu.length; i++){
										if((n=1*stu[i].getElement('.lkn_shopsell').value)){
											sellList.push([stu[i].id.substr(5), n]);
										}
									}
									if(!sellList.length){
										alert(TWPro.lang.NONESELECTED);
										but.disabled = false;
									}
									else if(confirm(TWPro.lang.CONFIRMSELL.replace(/%1/g, sellList.length)+"\n  -> "+TWPro.lang.TOTAL+": "+total_amount+" $")){
										var that = this;
										this.innerHTML = TWPro.lang.SELLING + ' (0/'+sellList.length+')';
										var sold = 0, errors = [];
										function sellStuff(inv_id, count){
											(new Ajax(baseUrl, {
												method: 'post',
												data: {
													inv_id: inv_id,
													town_id: town_id,
													count: count
												},
												onComplete: function(data){
													sold++;
													that.innerHTML = TWPro.lang.SELLING + ' ('+sold+'/'+sellList.length+')';
													data = Json.evaluate(data);
													if(data.error[0]){
														errors.push(data.error[1]);
													}
													else{
														Character.set_money(data.money);
														WEvent.trigger('inventory_remove', [inv_id]);
													}
													if(sold == sellList.length){
														that.innerHTML = TWPro.lang.SELL;
														that.disabled = false;
														new HumanMessage(TWPro.lang.SALEDONE, {type:'success'});
														if(errors.length){
															alert('Sale errors:\n'+errors.join('\n'));
														}
														twpro_extendeName == "item_trader" ? AjaxWindow.show('item_trader', {action: 'index', h:h}) : AjaxWindow.show(building, {town_id:town_id}, town_id);
													}
												}.bind(this)
											})).request();
										}
										for(var i=0; i<sellList.length; i++){
											sellStuff(sellList[i][0], sellList[i][1]);
										}
									}
									else{
										but.disabled = false;
									}
								};
								but.disabled = false;
							};
							ins.parentNode.insertBefore(newDiv, ins);
							newDiv.appendChild(amount);
							newDiv.appendChild(but);
						}
						catch(e){}
	}

	function twpro_getPlace(twpro_data, twpro_extendeName, twpro_jsversion) {
		//alert('2: '+twpro_extendeName);
		if (TWPro.twpro_failure) return;
		if (twpro_extendeName == 'inventory') {
			if (twpro_data[twpro_jsversion].search(/wear_content\[i\]\);(\s*)\}/) == -1) {
				//alert('1');
				TWPro.twpro_throwFailure();
				return;
			}
			if (twpro_data[twpro_jsversion].search(/bag_content\[i\]\);(\s*)\}/) == -1 && twpro_data[twpro_jsversion].search(/Bag.loadItems/) == -1) {
				//alert('2');
				TWPro.twpro_throwFailure();
				return;
			}
			twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace(/wear_content\[i\]\);(\s*)\}/, 'wear_content[i]);$1};TWPro.twpro_initializeItems(\'wear\',null);').replace(/\}\);(\s*)window.remclinv/, '/*TWPro.twpro_initializeItems(\'bag\',null);*/});$1window.remclinv');
			// fix for Crafting page reload #2
			eval('Bag.loadItems = ' + Bag.loadItems.toString().replace(/TWPro\.twpro_changeItem\(-1\)/,""));
			//for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
			//{
			//  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
			//}
		}
		else if(twpro_extendeName == 'item_trader'){
			twpro_data.page = twpro_data.page.replace(/var trader_inv/, 'TWPro.twpro_initializeItems(\'own\',playerInventory);TWPro.twpro_multisell(\'item_trader\');var trader_inv').replace(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/, 'trader_inv[i],$1$2$1);$3};TWPro.twpro_initializeItems(\'trader\',traderInventory);');
		}
		else if(twpro_extendeName.substr(0, 16) == 'building_market_'){
			twpro_data.page = twpro_data.page.replace(/Market.getInstance/, 'if(Market.tradeables != ""){for(var i in Market.tradeables){for(var j=0; j<Market.tradeables[i].length; j++){var item = new Item(Market.tradeables[i][j], "trader", "mini");traderInventory.items[item.get_id()] = item;}};TWPro.twpro_initializeItems(\'trader\',traderInventory)};Market.getInstance');
		}
		else if(twpro_extendeName.substr(0, 13) == 'reports_show_'){
			var reportitems = twpro_data[twpro_jsversion].match(/item_id(.+)get_bag_el/g);
			reportInventory = {"items":[]};
			for(var i=0; i<reportitems.length; i++){
				var item = eval("new Item({\""+reportitems[i].substr(0,reportitems[i].length-12)+")");
				reportInventory.items[item.get_id()] = item;
				twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace(new RegExp("item"+item.get_id()+".+;"),"item"+item.get_id()+"').replaceWith(reportInventory.items["+item.get_id()+"].get_bag_el());");
			}
			twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion]+"TWPro.twpro_initializeItems(\'report\',reportInventory);";
		}
		else { if (twpro_data[twpro_jsversion].search(/var trader_inv/) == -1) {
				//alert('3');
				TWPro.twpro_throwFailure();
				return;
			}
			if (twpro_data[twpro_jsversion].search(/trader_inv\[i\]\);(\s*)\}/) == -1 && twpro_data[twpro_jsversion].search(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/) == -1) {
				//alert('4');
				TWPro.twpro_throwFailure();
				return;
			}
			//for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
			//{
			//  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
			//}
			twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace('var trader_inv', 'TWPro.twpro_initializeItems(\'own\',playerInventory);var trader_inv').replace(/trader_inv\[i\]\);(\s*)\}/, 'trader_inv[i]);$1};TWPro.twpro_initializeItems(\'trader\',traderInventory);').replace(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/, 'trader_inv[i],$1$2$1);$3};TWPro.twpro_initializeItems(\'trader\',traderInventory);');
			//for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
			//{
			//  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
			//}
		}
	}

	// wird beim Erstellen eines Popups ausgefuehrt, stellt Code fuer diesen zusammen
	function twpro_popup(twpro_item, from) {
		if (TWPro.twpro_failure) return '';
		var twpro_xhtml = '', twpro_aktplusSet = 0;
		if (TWPro.twpro_calculated && twpro_item.twpro_place) {

			if ((twpro_item.twpro_place == 'wear') || (twpro_item.twpro_place == 'bag')) {
				if (TWPro.twpro_useful_flag == true) {
				  if(twpro_item.useful_html){
					  twpro_xhtml = twpro_item.useful_html;
				  }
				  else{
					  twpro_xhtml='<span class="item_popup_bonus"><table><tr><td><table cellpadding="0" cellspacing="0">';
					  twpro_item.useful_count = 0;
				  }
				  if(TWPro.twpro_useful_itemJob && TWPro.twpro_useful_itemJob != 'none'){
					var twpro_job = TWPro.twpro_useful_itemJob;
					if(TWPro.twpro_refresh_item_popup == false){
						if (twpro_item.twpro_bonus == undefined || twpro_item.twpro_weapon == undefined) {
							TWPro.twpro_prepareItem(twpro_item);
							if (twpro_item.twpro_bonus || twpro_item.twpro_weapon) {
//									if(!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
									twpro_item.twpro_jobbonus[twpro_job.shortName] = TWPro.twpro_testItem(twpro_job, twpro_item);
							}
						}
					}
					else{
						if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
						  if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
							twpro_aktplusSet = TWPro.twpro_setBonus[twpro_item.set.key][twpro_job.twpro_setCounter[twpro_item.set.key]].parsedBonus[twpro_job.shortName];
						  }
						}
						if (twpro_item.twpro_bonus || twpro_item.twpro_weapon || twpro_aktplusSet > 0) {
							if((twpro_item.type == "right_arm" && ((twpro_item.sub_type == "hand" && twpro_job.shortName == "duelvigor") || (twpro_item.sub_type == "shot" && (twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef")))) || (twpro_item.type == "left_arm" && (twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)))){
							  twpro_aktplus = '&nbsp;';
							  var damage_type = twpro_item.type;
							  if(twpro_item.sub_type) damage_type += '_' + twpro_item.sub_type;
							  if (twpro_item.damage.damage_min == TWPro.damage_min[damage_type]) twpro_aktplus = '+<span style="font-size:11px;">'+TWPro.lang.DMGMIN+'<\/span> ';
							  if (twpro_item.damage.damage_max == TWPro.damage_max[damage_type]) twpro_aktplus = '+<span style="font-size:11px;">'+TWPro.lang.DMGMAX+'<\/span> ';
							  if ((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 == TWPro.damage_average[damage_type]) twpro_aktplus = '+<span style="color:rgb(139, 34, 9);font-size:11px;">'+TWPro.lang.DMGAVG+'<\/span> ';
							}
							else if(twpro_item.type == "right_arm" && (twpro_job.shortName == "duelvigor" || twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef")){
							  twpro_aktplus = 0;
							}
							else{
							  if(!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
							  twpro_aktplus = twpro_item.twpro_jobbonus[twpro_job.shortName];;
							  if(isNaN(twpro_aktplus)) twpro_aktplus = 0;
							}
							if (twpro_aktplus > 0 || isNaN(twpro_aktplus) || twpro_aktplusSet > 0) {
								twpro_item.useful_count ++;
								if (twpro_item.useful_count == 16) twpro_xhtml += '</table></td><td><table cellpadding="0" cellspacing="0">';
								if (twpro_item.useful_count == 30) twpro_xhtml += '<td colspan="2" style="white-space: nowrap; font-size: 11px;"><span style="white-space:nowrap;">...<br /></span></td>';
								if (twpro_item.useful_count < 30){
								  twpro_xhtml += ((twpro_aktplusSet > 0)?'<tr style="color:#7E6530;">':'<tr>')+'<td style="white-space:nowrap;font-size:11px;">';
								  var twpro_strreplace = twpro_job.name.replace(/&#039;/g,"\'");
								  var twpro_strreplace_end = '';
								  if(TWPro.settings_prefs['splitFortbattle']=='true' && (twpro_job.shortName.match(/twpro_fortatt_/) || twpro_job.shortName.match(/twpro_fortdef_/))){
//									twpro_strreplace_end = twpro_strreplace.slice(twpro_strreplace.length-3);
									twpro_strreplace_end = TWPro.lang.FBTAGS[0][twpro_strreplace.charAt(twpro_strreplace.length-3)]+"|"+TWPro.lang.FBTAGS[1][twpro_strreplace.charAt(twpro_strreplace.length-1)];
									twpro_strreplace = ' \u25B7'+twpro_strreplace.slice(0,twpro_strreplace.length-3);
								  }
								  if (twpro_aktplusSet > 0){
								  twpro_xhtml += '+'+(isNaN(twpro_aktplus)?Math.round(twpro_aktplusSet*100)/100:Math.round((twpro_aktplusSet+twpro_aktplus)*100)/100)+'&nbsp;<\/td><td style="white-space:nowrap;font-size:11px;">' + ((twpro_strreplace.length > 25)?unescape(twpro_strreplace.substr(0, 23))+'<span style="font-size:10px;">...<\/span>':unescape(twpro_strreplace))+twpro_strreplace_end+'<\/td>';
								  }
								  else{
								  twpro_xhtml += (isNaN(twpro_aktplus) ? twpro_aktplus : '+'+Math.round(twpro_aktplus*100)/100) + '&nbsp;<\/td><td style="white-space:nowrap;font-size:11px;">' + ((twpro_strreplace.length > 25)?unescape(twpro_strreplace.substr(0, 23))+'<span style="font-size:10px;">...<\/span>':unescape(twpro_strreplace))+twpro_strreplace_end+'<\/td>';
								  }
								  twpro_xhtml += '</tr>';
								}
								twpro_item.useful_html = twpro_xhtml;
							}
						}
					}
				  }
				  twpro_xhtml += '</table></td></tr></table></span><br />';
				}
				else{
				  if (document.getElementById("twpro_jobList") && document.getElementById("twpro_jobList").selectedIndex != 0 || from =='force_twpro_useful') {
					  var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
					  if (twpro_selectedJob >= 0 || from =='force_twpro_useful') {
						  var twpro_job = TWPro.twpro_jobs[twpro_selectedJob];
  
						  if(TWPro.twpro_refresh_item_popup == false){
							  if (twpro_item.twpro_bonus == undefined || twpro_item.twpro_weapon == undefined) {
								  TWPro.twpro_prepareItem(twpro_item);
								  if (twpro_item.twpro_bonus || twpro_item.twpro_weapon) {
									  for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
										  twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i], twpro_item);
									  }
								  }
							  }
						  }
						  else{
							  if (TWPro.twpro_setItemsEffect && (TWPro.twpro_jobs[twpro_selectedJob].twpro_bestCombi[twpro_item.type] > 0)) {
								if (TWPro.twpro_setItemsCalc[twpro_item.type][TWPro.twpro_jobs[twpro_selectedJob].twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
								  twpro_aktplusSet = TWPro.twpro_setBonus[twpro_item.set.key][TWPro.twpro_jobs[twpro_selectedJob].twpro_setCounter[twpro_item.set.key]].parsedBonus[TWPro.twpro_jobs[twpro_selectedJob].shortName];
								}
							  }
							  if (twpro_item.twpro_bonus || twpro_item.twpro_weapon) {
								  if((twpro_item.type == "right_arm" && ((twpro_item.sub_type == "hand" && TWPro.twpro_jobs[twpro_selectedJob].shortName == "duelvigor") || (twpro_item.sub_type == "shot" && (TWPro.twpro_jobs[twpro_selectedJob].shortName == "duelshootingatt" || TWPro.twpro_jobs[twpro_selectedJob].shortName == "duelshootingdef")))) || (twpro_item.type == "left_arm" && (TWPro.twpro_jobs[twpro_selectedJob].shortName.match(/twpro_fortatt/) || TWPro.twpro_jobs[twpro_selectedJob].shortName.match(/twpro_fortdef/)))){
									twpro_aktplus = '&nbsp;';
									var damage_type = twpro_item.type;

									if(twpro_item.sub_type) damage_type += '_' + twpro_item.sub_type;
									if (twpro_item.damage.damage_min == TWPro.damage_min[damage_type]) twpro_aktplus = '+<span style="font-size:11px;">'+TWPro.lang.DMGMIN+'<\/span> ';
									if (twpro_item.damage.damage_max == TWPro.damage_max[damage_type]) twpro_aktplus = '+<span style="font-size:11px;">'+TWPro.lang.DMGMAX+'<\/span> ';
									if ((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 == TWPro.damage_average[damage_type]) twpro_aktplus = '+<span style="color:rgb(139, 34, 9);font-size:11px;">'+TWPro.lang.DMGAVG+'<\/span> ';
								  }
								  else if(twpro_item.type == "right_arm" && (TWPro.twpro_jobs[twpro_selectedJob].shortName == "duelvigor" || TWPro.twpro_jobs[twpro_selectedJob].shortName == "duelshootingatt" || TWPro.twpro_jobs[twpro_selectedJob].shortName == "duelshootingdef")){
									twpro_aktplus = 0;
								  }
								  else{
									twpro_aktplus = twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName];
									if(isNaN(twpro_aktplus)) twpro_aktplus = 0;
								  }
								  if (twpro_aktplus > 0 || isNaN(twpro_aktplus)) {
									  twpro_xhtml += '<span class="item_popup_bonus">'
									  var twpro_strreplace = twpro_job.name.replace(/&#039;/g,"\'");
									  var twpro_strreplace_end = '';
									  if(TWPro.settings_prefs['splitFortbattle']=='true' && (twpro_job.shortName.match(/twpro_fortatt_/) || twpro_job.shortName.match(/twpro_fortdef_/))){
										twpro_strreplace_end = TWPro.lang.FBTAGS[0][twpro_strreplace.charAt(twpro_strreplace.length-3)]+"|"+TWPro.lang.FBTAGS[1][twpro_strreplace.charAt(twpro_strreplace.length-1)];
										twpro_strreplace = ' \u25B7'+twpro_strreplace.slice(0,twpro_strreplace.length-3);
									  }
									  twpro_xhtml += (isNaN(twpro_aktplus) ? twpro_aktplus : '+'+Math.round(twpro_aktplus*100)/100 + ' ') + unescape(twpro_strreplace)+twpro_strreplace_end;
									  if(twpro_item.twpro_bonus && (TWPro.twpro_jobs[twpro_selectedJob].shortName.match(/twpro_fortatt/) || TWPro.twpro_jobs[twpro_selectedJob].shortName.match(/twpro_fortdef/))){
										var twpro_test_bonuses = 0;
										for(var i=0; i<5; i++){
											twpro_test_bonuses += TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_fb'][0][i];
										}
										if(twpro_test_bonuses > 0){
											twpro_xhtml += '<br /><span style="font-size:10px;">&nbsp;&nbsp;<img width="18" height="13" style="background: url(\/images\/fort\/battle\/attacker_secondary.png) no-repeat;" src="images\/transparent.png"> +' + Math.round((TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_fb'][0][0]+TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_fb'][0][2]/2+TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_fb'][0][3]/2)*100)/100;
											twpro_xhtml += '<br />&nbsp;&nbsp;<img width="18" height="13" style="background: url(\/images\/fort\/battle\/defender_secondary.png) no-repeat;" src="images\/transparent.png"> +' + Math.round((TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_fb'][0][1]+TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_fb'][0][2]/2+TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_fb'][0][3]/2)*100)/100;
											twpro_xhtml += '<br />&nbsp;&nbsp;<img width="13" height="12" style="background: url(\/images\/charstats.png) no-repeat -76px -22px;" src="images\/transparent.png"><img width="5" height="13" src="images\/transparent.png"> +' + Math.round(TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_fb'][0][4]*100)/100 + '<\/span><br \/>';
										}
									  }
									  twpro_xhtml += '<br /></span>';
								  }
							  }
							  if(twpro_aktplusSet > 0){
								  twpro_xhtml += '<span class="item_popup_bonus" style="color:#7E6530;">[+'+Math.round(twpro_aktplusSet*100)/100+' '+twpro_item.set.name+' |&nbsp;'+TWPro.twpro_jobs[twpro_selectedJob].twpro_setCounter[twpro_item.set.key]+']<br \/><\/span><br \/>';
							  }
							  else{
								  twpro_xhtml += '<br />';
							  }
						  }
					  }
				  }
				}
			}
			
			if (twpro_item.twpro_place == 'trader') {
				if (twpro_item.twpro_bonus == undefined || twpro_item.twpro_weapon == undefined) {
					TWPro.twpro_prepareItem(twpro_item, twpro_item.twpro_place);
					if (twpro_item.twpro_bonus || twpro_item.twpro_weapon) {
						for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
							twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i], twpro_item);
						}
					}
				}
				if (twpro_item.twpro_bonus || twpro_item.twpro_weapon) {
					var twpro_j = 0;
					var twpro_plus = [];
					var twpro_better, twpro_style;
					var twpro_xhtml_activejob = '';
					for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
					if ((TWPro.twpro_jobs[twpro_i].shortName == "speed" && Character.characterClass == "greenhorn") || !TWPro.twpro_jobs[twpro_i].twpro_bestStats) continue;
					twpro_style = ';';
						if((twpro_item.type == "right_arm" && ((twpro_item.sub_type == "hand" && TWPro.twpro_jobs[twpro_i].shortName == "duelvigor") || (twpro_item.sub_type == "shot" && (TWPro.twpro_jobs[twpro_i].shortName == "duelshootingatt" || TWPro.twpro_jobs[twpro_i].shortName == "duelshootingdef")))) || (twpro_item.type == "left_arm" && (TWPro.twpro_jobs[twpro_i].shortName.match(/twpro_fortatt/) || TWPro.twpro_jobs[twpro_i].shortName.match(/twpro_fortdef/)))){
						  twpro_better = 0;
						  var damage_type = twpro_item.type;
						  if(twpro_item.sub_type) damage_type += '_' + twpro_item.sub_type;
						  if (twpro_item.damage.damage_min > TWPro.damage_min[damage_type]) twpro_better = twpro_item.damage.damage_min-TWPro.damage_min[damage_type]+'<span style="font-size:11px;">'+TWPro.lang.DMGMIN+'<\/span>';
						  if (twpro_item.damage.damage_max > TWPro.damage_max[damage_type]) twpro_better = twpro_item.damage.damage_max-TWPro.damage_max[damage_type]+'<span style="font-size:11px;">'+TWPro.lang.DMGMAX+'<\/span>';
						  if ((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 > TWPro.damage_average[damage_type]) twpro_better = ((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2)-TWPro.damage_average[damage_type]+'<span style="font-size:11px;">'+TWPro.lang.DMGAVG+'<\/span>';
						}
						else if(twpro_item.type == "right_arm" && (TWPro.twpro_jobs[twpro_i].shortName == "duelvigor" || TWPro.twpro_jobs[twpro_i].shortName == "duelshootingatt" || TWPro.twpro_jobs[twpro_i].shortName == "duelshootingdef")){
						  twpro_better = 0;
						}
						else{
						  twpro_better = Math.round((twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] - TWPro.twpro_jobs[twpro_i].twpro_bestStats[twpro_item.type])*100)/100;
						  if(isNaN(twpro_better)) twpro_better = 0;

						  if(TWPro.twpro_jobs[twpro_i].malus >= 0){
							var twpro_aktlp = TWPro.twpro_jobValues[TWPro.twpro_jobs[twpro_i].shortName].laborp -1;
							if(twpro_aktlp < 0){
							  if((twpro_better+twpro_aktlp) >= 0){
								twpro_style += 'color:rgb(17,96,21);';
							  }
							  else{
  								twpro_style += 'color:rgb(139,34,9);';
							  }
							}
						  }
						  if(twpro_item.set){
							twpro_style += 'font-style:italic;';
						  }
						  if (TWPro.twpro_setItemsEffect && (TWPro.twpro_jobs[twpro_i].twpro_bestCombi[twpro_item.type] > 0)) {
							twpro_style += 'font-weight:normal;';
						  }
						}
						if (twpro_better > 0 || isNaN(twpro_better)) {
						  if(document.getElementById("twpro_jobList")) var re_jobname = TWPro.twpro_jobs[parseInt(document.getElementById('twpro_jobList')[document.getElementById('twpro_jobList').selectedIndex].value)] || '';
						  if(re_jobname) re_jobname = re_jobname.name;
						  var twpro_strreplace = TWPro.twpro_jobs[twpro_i].name.replace(/&#039;/g,"\'");
						  var twpro_strreplace_end = '';
						  if(TWPro.settings_prefs['splitFortbattle']=='true' && (TWPro.twpro_jobs[twpro_i].shortName.match(/twpro_fortatt_/) || TWPro.twpro_jobs[twpro_i].shortName.match(/twpro_fortdef_/))){
							twpro_strreplace_end = TWPro.lang.FBTAGS[0][twpro_strreplace.charAt(twpro_strreplace.length-3)]+"|"+TWPro.lang.FBTAGS[1][twpro_strreplace.charAt(twpro_strreplace.length-1)];
							twpro_strreplace = ' \u25B7'+twpro_strreplace.slice(0,twpro_strreplace.length-3);
						  }
						  if (TWPro.twpro_activeJob() && (TWPro.twpro_jobs[twpro_i].name == re_jobname)){
							twpro_xhtml_activejob = '<span style="white-space:nowrap;color:rgb(34, 34, 136)' + twpro_style + '">+' + twpro_better + ' ' + ((twpro_strreplace.length > 25)?unescape(twpro_strreplace.substr(0, 23))+'<span style="font-size:10px;">...<\/span>':unescape(twpro_strreplace))+twpro_strreplace_end+ '</span><br />';
							if(document.querySelector('#trader_inv_div img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]') && (Character.characterClass == "greenhorn" || twpro_item.characterSex == null || (twpro_item.characterSex != null && twpro_item.characterSex == Character.characterSex)) && typeof TWPro.twpro_invHashTest[twpro_item.item_id] == 'undefined'){
							  if (((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease[twpro_item.type] - Character.itemLevelRequirementDecrease['all']) > Character.level)) || (Character.characterClass == "greenhorn" && twpro_item.characterSex != null)) {
								document.querySelector('#trader_inv_div img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]').className = "wear_yield_highlight_red";
							  }
							  else{
								document.querySelector('#trader_inv_div img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]').className = "wear_yield_highlight_green";
							  }
							}
							if(document.querySelector('select[id*="_item_product"]') && (Character.characterClass == "greenhorn" || twpro_item.characterSex == null || (twpro_item.characterSex != null && twpro_item.characterSex == Character.characterSex)) && typeof TWPro.twpro_invHashTest[twpro_item.item_id] == 'undefined'){
								if (((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease[twpro_item.type] - Character.itemLevelRequirementDecrease['all']) > Character.level)) || (Character.characterClass == "greenhorn" && twpro_item.characterSex != null)) {
								  TWPro.twpro_market_list.push("red|"+twpro_item.name);
								}
								else{
								  TWPro.twpro_market_list.push("green|"+twpro_item.name);
								}
								document.querySelector('select[id*="_item_product"]').onclick=function(){TWPro.twpro_highlight_market_options();};
							}
						  }
						  else{
							twpro_plus.push(twpro_style + '">+' + twpro_better + ' ' + ((twpro_strreplace.length > 25)?unescape(twpro_strreplace.substr(0, 23))+'<span style="font-size:10px;">...<\/span>':unescape(twpro_strreplace))+twpro_strreplace_end);
						  }
						  twpro_j++;
						}
					}
					if (twpro_j > 0) {
						twpro_plus.sort(TWPro.twpro_sortPlus);
						twpro_xhtml += '<span class="item_popup_bonus"><table><tr><td style="font-size:12px;">';
						if (twpro_xhtml_activejob) twpro_xhtml += twpro_xhtml_activejob;
						var bool_j = twpro_j > 30 && twpro_j <= 33;
						for (var twpro_i = 0; (twpro_i < twpro_plus.length) && (twpro_i < 33); twpro_i++) {
							twpro_xhtml += '<span style="white-space:nowrap;';
							twpro_xhtml += twpro_plus[twpro_i] + '</span><br />';
							if ((twpro_j <= 30 && twpro_i == 14) || (bool_j && (twpro_i == (Math.round(twpro_j / 2) - 1))) || (twpro_j > 33 && twpro_i == 16)) {
								twpro_xhtml += '</td><td style="font-size:12px;">';
							}
						}
						if (twpro_i < twpro_plus.length) {
							twpro_xhtml += '...';
						}
						twpro_xhtml += '</td></tr></table></span><br />';
					}
				}
				if(TWPro.settings_prefs['collectorMode']=='true'){
					if (document.getElementById("twpro_jobList") && document.getElementById("twpro_jobList").selectedIndex == 0 && (twpro_xhtml == '' || (Character.characterClass != "greenhorn" && twpro_item.characterSex != null && twpro_item.characterSex != Character.characterSex)) && document.querySelector('#trader_inv_div img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]') && typeof TWPro.twpro_invHashTest[twpro_item.item_id] == 'undefined') {
						document.querySelector('#trader_inv_div img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]').className = "wear_yield_highlight_blue";
					}
					if (document.getElementById("twpro_jobList") && document.getElementById("twpro_jobList").selectedIndex == 0 && (twpro_xhtml == '' || (Character.characterClass != "greenhorn" && twpro_item.characterSex != null && twpro_item.characterSex != Character.characterSex)) && document.querySelector('select[id*="_item_product"]') && typeof TWPro.twpro_invHashTest[twpro_item.item_id] == 'undefined') {
						TWPro.twpro_market_list.push("blue|"+twpro_item.name);
					  document.querySelector('select[id*="_item_product"]').onclick=function(){TWPro.twpro_highlight_market_options();};
					}
					if ((twpro_xhtml == '' || (Character.characterClass != "greenhorn" && twpro_item.characterSex != null && twpro_item.characterSex != Character.characterSex)) && document.querySelector('.css_reports img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]') && ((TWPro.settings_prefs['useCache']=='true' && TWPro.twpro_invHashCached.split(',')[twpro_item.item_id] == '') || (TWPro.settings_prefs['useCache']!='true' && typeof TWPro.twpro_invHashTest[twpro_item.item_id] == 'undefined'))) {
						document.querySelector('.css_reports img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]').className = "wear_yield_highlight_blue";
					}
				}
				if (document.getElementById("twpro_jobList") && document.getElementById("twpro_jobList").selectedIndex == 0 && (twpro_xhtml != '' || twpro_item.set) && document.querySelector('#trader_inv_div img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]') && (Character.characterClass == "greenhorn" || twpro_item.characterSex == null || (twpro_item.characterSex != null && twpro_item.characterSex == Character.characterSex)) && typeof TWPro.twpro_invHashTest[twpro_item.item_id] == 'undefined') {
				  if (((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease[twpro_item.type] - Character.itemLevelRequirementDecrease['all']) > Character.level)) || (Character.characterClass == "greenhorn" && twpro_item.characterSex != null)) {
   					document.querySelector('#trader_inv_div img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]').className = "wear_yield_highlight_red";
				  }
				  else{
   					document.querySelector('#trader_inv_div img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]').className = "wear_yield_highlight_green";
				  }
				}
				if (document.getElementById("twpro_jobList") && document.getElementById("twpro_jobList").selectedIndex == 0 && (twpro_xhtml != '' || twpro_item.set) && document.querySelector('select[id*="_item_product"]') && (Character.characterClass == "greenhorn" || twpro_item.characterSex == null || (twpro_item.characterSex != null && twpro_item.characterSex == Character.characterSex)) && typeof TWPro.twpro_invHashTest[twpro_item.item_id] == 'undefined') {
				  if (((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease[twpro_item.type] - Character.itemLevelRequirementDecrease['all']) > Character.level)) || (Character.characterClass == "greenhorn" && twpro_item.characterSex != null)) {
					TWPro.twpro_market_list.push("red|"+twpro_item.name);
				  }
				  else{
					TWPro.twpro_market_list.push("green|"+twpro_item.name);
				  }
				  document.querySelector('select[id*="_item_product"]').onclick=function(){TWPro.twpro_highlight_market_options();};
				}
				if ((twpro_xhtml != '' || twpro_item.set) && document.querySelector('.css_reports img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]') && (Character.characterClass == "greenhorn" || twpro_item.characterSex == null || (twpro_item.characterSex != null && twpro_item.characterSex == Character.characterSex)) && ((TWPro.settings_prefs['useCache']=='true' && TWPro.twpro_invHashCached.split(',')[twpro_item.item_id] == '') || (TWPro.settings_prefs['useCache']!='true' && typeof TWPro.twpro_invHashTest[twpro_item.item_id] == 'undefined'))) {
				  if (((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease[twpro_item.type] - Character.itemLevelRequirementDecrease['all']) > Character.level)) || (Character.characterClass == "greenhorn" && twpro_item.characterSex != null)) {
   					document.querySelector('.css_reports img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]').className = "wear_yield_highlight_red";
				  }
				  else{
   					document.querySelector('.css_reports img[src*="/'+twpro_item.image.replace(/\/.+\//g, "\/").match("\/([^\/^.]+)")[1]+'."][alt="'+twpro_item.name+'"]').className = "wear_yield_highlight_green";
				  }
				}
			}
		}
		return twpro_xhtml;
	}

	function twpro_highlight_market_options(){
		var twpro_market_list_string = ";"+TWPro.twpro_market_list.join(";")+";";
		for(var i=0;i<document.querySelector('select[id*="_item_product"]').options.length; i++){
		  if(twpro_market_list_string.indexOf(";red|"+document.querySelector('select[id*="_item_product"]').options[i].innerHTML+";") != -1){
			document.querySelector('select[id*="_item_product"]').options[i].innerHTML = " \u25C8 "+document.querySelector('select[id*="_item_product"]').options[i].innerHTML;
			document.querySelector('select[id*="_item_product"]').options[i].setAttribute("style","color:rgb(139, 34, 9);font-weight:bold");
		  }
		  else if(twpro_market_list_string.indexOf(";green|"+document.querySelector('select[id*="_item_product"]').options[i].innerHTML+";") != -1){
			document.querySelector('select[id*="_item_product"]').options[i].innerHTML = " \u25C8 "+document.querySelector('select[id*="_item_product"]').options[i].innerHTML;

			document.querySelector('select[id*="_item_product"]').options[i].setAttribute("style","color:rgb(17, 96, 21);font-weight:bold");
		  }
		  else if(twpro_market_list_string.indexOf(";blue|"+document.querySelector('select[id*="_item_product"]').options[i].innerHTML+";") != -1){
			document.querySelector('select[id*="_item_product"]').options[i].innerHTML = " \u25C8 "+document.querySelector('select[id*="_item_product"]').options[i].innerHTML;

			document.querySelector('select[id*="_item_product"]').options[i].setAttribute("style","color:rgb(34, 34, 136);font-weight:bold");
		  }
		}
	}


	// fuegt Auswahlliste in das Inventar ein
	function twpro_insertList(twpro_data) {
		if (TWPro.twpro_failure) return;
		if (!TWPro.twpro_jobsort) {
			TWPro.twpro_jobsort = TWPro.settings_prefs['defaultSorting']||'name';
		}
		TWPro.twpro_bag = {};
		TWPro.twpro_bag.twpro_priceWear = 0;
		TWPro.twpro_bag.twpro_priceBag = 0;
		TWPro.twpro_bag.twpro_priceItems = 0;
		TWPro.twpro_bag.twpro_priceYields = 0;
		TWPro.twpro_wear_items_list = '';
		TWPro.twpro_bag.twpro_countType = {};
		TWPro.twpro_bag.twpro_countType_diff = {};
		TWPro.twpro_bag.twpro_types = [];
		TWPro.twpro_setItems = {};
		TWPro.twpro_setItemsCount = {};
		for (var twpro_set in TWPro.twpro_setBonus) {
			TWPro.twpro_setItemsCount[twpro_set] = 0;
		}
		TWPro.twpro_invHashTest = [];
		if(TWPro.settings_prefs['useCache']=='true'){
			TWPro.twpro_skillsHashTest = '';
			for(twpro_skill in Character.skills){
				TWPro.twpro_skillsHashTest += Character.skills[twpro_skill] + ";";
			}
			var twpro_invHashCached_reduced = twproCache.getValue("TWPro.twpro_invHash")||'';
			var reduced_match = twpro_invHashCached_reduced.match(/\[\d+\]/g)||'';
			for(var i=0;i<reduced_match.length;i++){
				var reduced_patt=new RegExp(reduced_match[i].replace("[","\\[").replace("]","\\]"),'g');
				var comma_string ='';
				for(var j=0;j<(reduced_match[i].match(/\d+/));j++){
					comma_string += ",";
				}
				twpro_invHashCached_reduced=twpro_invHashCached_reduced.replace(reduced_patt, comma_string);
			}				
			TWPro.twpro_invHashCached = twpro_invHashCached_reduced || '';
		}

		if(TWPro.cacheMethod == "IndexedDB"){
			TWPro.bigCache={};
			twproCache_idb.getValue("TWPro.bigCache", function (data) {
				if(data){
				  TWPro.bigCache = data;
				  //alert(JSON.stringify(TWPro.bigCache));
				  if(TWPro.bigCache == undefined) TWPro.bigCache={};
				}
			});
		}
		for (var twpro_type in Character.itemLevelRequirementDecrease) {
			if ((twpro_type != 'all') && (!isNaN(Character.itemLevelRequirementDecrease[twpro_type]))) {
				TWPro.twpro_bag.twpro_types.push(twpro_type);
				TWPro.twpro_bag.twpro_countType[twpro_type] = 0;
				TWPro.twpro_bag.twpro_countType_diff[twpro_type] = 0;
			}
		}
		if(typeof Character.itemLevelRequirementDecrease.belt == "undefined" || typeof Character.itemLevelRequirementDecrease.pants == "undefined"){
				TWPro.twpro_bag.twpro_types.push("belt", "pants");
				TWPro.twpro_bag.twpro_countType["belt"] = 0;
				TWPro.twpro_bag.twpro_countType_diff["belt"] = 0;
				TWPro.twpro_bag.twpro_countType["pants"] = 0;
				TWPro.twpro_bag.twpro_countType_diff["pants"] = 0;
				Character.itemLevelRequirementDecrease.belt = 0;
				Character.itemLevelRequirementDecrease.pants = 0;
		}

		$('window_inventory').style.height = "502px";
		var new_inventory ="data:image/jpg;base64,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"; // wood background

		var twpro_xhtml = '<div style="background:url(images/inventory/west_inventar_2.jpg); margin-top:-33px; margin-left:-15px; width:770px; height:100%;"></div><div style="position: absolute; background:url('+new_inventory+'); top:0px; margin-top:2px; margin-left:-9px; width:100%; height:49px;"></div>';
		twpro_data.page += twpro_xhtml;

		$('window_inventory_content').style.height = "460px";
		twpro_xhtml = '<div style="text-align:right;width:100%;position:relative;margin-top:-6px;height:50px;"><table width="200px" id="twpro_jobDisplay" style="display: inline;position: absolute; visibility:hidden; right:-24px; z-index:2;text-align:right;"><tr><td>';
		for(var i=0; i<TWPro.twpro_sorts.length; i++){
			var name = TWPro.twpro_sorts[i];
			twpro_xhtml += '<a href="javascript:" onmouseup="TWPro.twpro_sortList(\''+name+'\')"><img id="twpro_jobsort_link_'+name+'" alt="" src="images/transparent.png" width="20" height="17" style="background-image:url(data:image/png;base64,'+twpro_sortButtonImg+');background-position:-'+(i*20)+'px '+(TWPro.twpro_jobsort==name?0:-17)+'px" onmouseover="this.style.backgroundPosition=\'-'+(i*20)+'px 0\'" onmouseout="if(TWPro.twpro_jobsort!=\''+name+'\')this.style.backgroundPosition=\'-'+(i*20)+'px -17px\'"/></a>';
		}
		twpro_xhtml += '<a href="javascript:/*Click here to configure TW Pro*/TWPro.twpro_disableJobs();"><img id="twpro_config_button" title="TW Pro: ' + AjaxWindow.possibleValues['settings'] + '" width="25" height="15" style="border: 1px solid rgb(62, 44, 35); background: url(/img.php?type=menu) repeat scroll -128px -180px transparent;" src="images/transparent.png"></a><a href="javascript:void(0);"><img id="twpro_cache_button" width="15" height="15" src="'+twpro_cache_button+'"></a>';
		twpro_xhtml += '</td></tr><tr><td>';
		twpro_xhtml += '<input id="twpro_jobsort_filter" type="checkbox"' + (TWPro.twpro_preference('Hide_unjobs')?' checked="checked"':'') + '  onclick="TWPro.twpro_preference(\'Hide_unjobs\',this.checked);TWPro.twpro_clickfilterList()"/> ';
		
		if((TWPro.settings_prefs['useCache']=='true') && (TWPro.twpro_emptying_cache!=true) && (TWPro.twpro_invHashCached=='')){		
		  twpro_xhtml += '<select id="twpro_jobList" size="1" onchange="TWPro.twpro_changeJob()" onclick="TWPro.updateCache=true;TWPro.twpro_clickList()" style="background-color: rgb(207, 195, 166); font-size: 10px; width:130px;"><option value="-1" id="twpro_wait" style="background-color: rgb(207, 195, 166);">'+TWPro.lang.CACHEGENERATE+'</option></select>';
		}
		else{
		  twpro_xhtml += '<select id="twpro_jobList" size="1" onchange="TWPro.twpro_changeJob()" onclick="TWPro.twpro_clickList()" style="background-color: rgb(207, 195, 166); font-size: 10px; width:130px;"><option value="-1" id="twpro_wait" style="background-color: rgb(207, 195, 166);">'+TWPro.lang.STARTCALC+'</option></select>';
		}
		twpro_xhtml += ' <input id="twpro_clothingfilter" type="checkbox"' + (TWPro.twpro_preference('dispJobClothingOnly')?' checked="checked"':'') + '  onclick="TWPro.twpro_preference(\'dispJobClothingOnly\',this.checked);TWPro.twpro_bagVis()" />';
		twpro_xhtml += '</td></tr></table></div>';

		twpro_xhtml += '<div style="position:absolute;top: 52px; left: 102px; overflow-y:auto;height:34px;width:189px;opacity:0.9;z-index:2;" id="twpro_currentJobSkills"><div style="margin:0;float:left;"></div><div style="margin:0;float:left;"></div><div style="margin:0;float:left;"></div><div style="margin:0;float:left;"></div><div style="margin:0;float:left;"></div></div>';
		twpro_data.page = twpro_data.page.replace(/<div(.*)top: 13px; left: 5px;"><h2>/, '<div id="div_equipment"$1top: 58px; left: 5px;"><h2>');
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
		  var rep_filter = new RegExp("<div id=\"filter_"+TWPro.twpro_bag.twpro_types[twpro_i]+"\"","g");
		  twpro_data.page = twpro_data.page.replace(rep_filter, '<div id="filter_'+TWPro.twpro_bag.twpro_types[twpro_i]+'" style="top:98px;"');
		}
		twpro_data.page = twpro_data.page.replace(/<div id="item_trader_button"/, '<div id="item_trader_button" style="position: absolute; margin-top:43px;"');
		twpro_data.page = twpro_data.page.replace(/<div id="equip_manager_button"/, '<div id="equip_manager_button" style="position: absolute; margin-top:43px;"');
		twpro_data.page = twpro_xhtml+twpro_data.page;

		// settings for job rankings
		twpro_xhtml = '<div style="left:320px;position:absolute; top:0px; margin-top:3px;color:#C77341;text-align:center;line-height:160%"><img src="images/transparent.png" alt="" style="background-image:url(data:image/png;base64,'+twpro_sortButtonImg+');background-position:-80px 0;margin-bottom:3px" width="20" height="17" />'+TWPro.lang.JOBRANKSETTINGS+'<br>';
		var imgorder = [20, 40, 60, 100], j=0;
		for(var i in TWPro.multipliers){
			twpro_xhtml += '<img src="images/transparent.png" alt="" style="background-image:url(data:image/png;base64,'+twpro_sortButtonImg+');background-position:-'+imgorder[j++]+'px 0;margin-left:5px" width="20" height="17" /><input type="text" style="background-color: rgb(207, 195, 166);width:23px" value="'+TWPro.multipliers[i]+'" onchange="TWPro.twpro_handleJobrank(this, \''+i+'\')" />';
		}
		twpro_xhtml += '</div>';
twpro_data.page += twpro_xhtml;
		// search inventory

		TWPro.searchInventory = {timer:null};
		(new Image()).src = twpro_loadingSearchImg;
		twpro_xhtml = '<label style="z-index:2;position:absolute;top:8px;right:26px;font-size:13px;font-weight:normal;font-style:italic;color:#636;cursor:pointer" for="twpro_searchinventory">'+TWPro.lang.SEARCHINVENTORY+'</label><input type="text" style="z-index:2;width:150px;background:#F0CD8B url(data:image/png;base64,'+twpro_searchButtonImg+') no-repeat scroll 0 0;padding:0 2px 0 19px" id="twpro_searchinventory" onfocus="previousSibling.style.display=\'none\'" onblur="if(this.value==\'\')previousSibling.style.display=\'block\'" onkeyup="TWPro.twpro_searchInventory(event.keyCode==13)" /><span id="twpro_search_help" style="z-index:2;font-size:13px;font-weight:bold;color:#191970;cursor:help;background:#D4C7B0;width:20px;height:17px">?</span>&nbsp;&nbsp;';
		
		twpro_data.page = twpro_data.page.replace(/<div(.*)text-align: center; top: 13px; left: 316px;"><h2>(.+)<\/h2>/, '<div id="twpro_bag" style="position:absolute; z-index:2;left: 318px; margin-top:6px;"><img src="/images/items/yield/bagpack.png" width="25" height="25"></div><div id="twpro_useful" style="position:absolute; z-index:2;left: 344px; margin-top:6px; cursor:pointer; display:none;" onclick="TWPro.twpro_useful(this.style.outlineStyle);"><img src="/images/items/yield/fb_chest_iron.png" width="25" height="25" title="'+TWPro.lang.USEFULITEMS+'"></div><div$1top: 58px; left: 316px;text-align: right;z-index:1;"><h2>$2 '+twpro_xhtml+'</h2>');

		twpro_xhtml = '<div id ="display_sets" style="z-index:2;position:absolute;right:3px;top:105px;"></div>';
		twpro_data.page += twpro_xhtml;
	}

	function twpro_generate_cache(force){
		showMessage('<center>'+(force=='update'?TWPro.lang.CACHEUPDATENOW+'<br><table style="margin-top:6px"><tr><td><input type="checkbox" id="force_cacheOK" title="'+TWPro.lang.CACHEFORCEOKDESC+'"></td><td style="font-size:10.5px;vertical-align:middle">'+TWPro.lang.CACHEFORCEOK+'</td></tr></table>':TWPro.lang.CACHEGENERATENOW)+'</center>', (force=='update'?TWPro.lang.CACHEUPDATE:TWPro.lang.CACHEGENERATE), 350, 100, [["ok", function () {
			if(document.getElementById('force_cacheOK') && document.getElementById('force_cacheOK').checked == true){
				TWPro.twpro_setItems = {};
				for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
					TWPro.twpro_bag.twpro_countType[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
					TWPro.twpro_bag.twpro_countType_diff[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
				}
				TWPro.twpro_wear_items_list = '';
				TWPro.twpro_setItemsCount = {};
				for (var twpro_set in TWPro.twpro_setBonus) {
					TWPro.twpro_setItemsCount[twpro_set] = 0;
				}
				TWPro.twpro_invHashTest = [];
				TWPro.twpro_initializeItems('wear', null);
				TWPro.twpro_initializeItems('bag', null);
				TWPro.twpro_invHash = TWPro.twpro_invHashTest.join(',');
				var twpro_invHashCached_reduced = TWPro.twpro_invHashCached = TWPro.twpro_invHash;
				var reduced_match = twpro_invHashCached_reduced.match(/\,{4,}1/g)||'';
				for(var i=1;i<reduced_match.length;i++){
					var reduced_patt=new RegExp("1"+reduced_match[i],'g');
					twpro_invHashCached_reduced=twpro_invHashCached_reduced.replace(reduced_patt, "1["+String(reduced_match[i].length-1)+"]1");
				}
				twpro_invHashCached_reduced=twpro_invHashCached_reduced.replace(reduced_match[0], "["+String(reduced_match[0].length-1)+"]1");
				twproCache.setValue("TWPro.twpro_invHash", twpro_invHashCached_reduced);
				twproCache.setValue("twpro_specialJobs_skills", {'level':Character.level,'health':Character.skills.health,'ride':Character.skills.ride,'leadership':Character.skills.leadership,'aim':Character.skills.aim,'dodge':Character.skills.dodge,'endurance':Character.skills.endurance,'hide':Character.skills.hide});
				TWPro.twpro_cache_status();
			}
			else{
				if((TWPro.twpro_calculated!=true || document.getElementById('twpro_wait').text == TWPro.lang.STARTCALC) && TWPro.twpro_invHashCached != ''){
					document.getElementById('twpro_wait').text = TWPro.lang.CALCJOB;
					TWPro.twpro_updateList();
				}
				TWPro.twpro_setItems = {};
				for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
					TWPro.twpro_bag.twpro_countType[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
					TWPro.twpro_bag.twpro_countType_diff[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
				}
				TWPro.twpro_wear_items_list = '';
				TWPro.twpro_setItemsCount = {};
				for (var twpro_set in TWPro.twpro_setBonus) {
					TWPro.twpro_setItemsCount[twpro_set] = 0;
				}
				TWPro.twpro_invHashTest = [];
				TWPro.twpro_initializeItems('wear', null);
				TWPro.twpro_initializeItems('bag', null);
				TWPro.twpro_calculated = false;
				if(force != 'update'){
					TWPro.twpro_jobsCalculated = {};
					TWPro.twpro_itemStorage = {};
				}
				TWPro.twpro_invHash = '';
				TWPro.twpro_setBonusParsed = false;
				TWPro.updateCache=true;
				if (document.getElementById('twpro_wait').text == TWPro.lang.CHOOSEJOB) {
					document.getElementById('twpro_jobList').style.backgroundColor = 'rgb(207, 195, 166)';
					document.getElementById('twpro_jobList').innerHTML = '<option style="background-color: rgb(207, 195, 166);" id="twpro_wait" value="-1">'+TWPro.lang.STARTCALC+'</option>';
				}
				TWPro.twpro_clickList();
			}
		}], ["cancel"]], true);
	}

	function twpro_handleJobrank(field, type){
		var val = parseFloat(field.value);
		if(isNaN(val)) val = 1;
		field.value = val;
		TWPro.multipliers[type] = 1*val;
		var multipliers = [];
		for(var i in TWPro.multipliers){
			multipliers.push(TWPro.multipliers[i]);
		}
		TWPro.twpro_preference('multipliers', multipliers.join(':'));
		if(TWPro.twpro_jobsort == 'comb'){
			TWPro.twpro_sortList('comb');
		}
	}
	
	twpro_toggle_set = 0;
	function twpro_show_set(set_searched){
	  var anyresult = null;
	  if (twpro_toggle_set != set_searched && set_searched != 0){
	  if(document.getElementById('twpro_searchinventory').value != ''){
		document.getElementById('twpro_searchinventory').value = '';
		TWPro.twpro_searchInventory(true);
		document.getElementById('twpro_searchinventory').previousSibling.style.display = '';
	  }
		remove_highlight();
		twpro_toggle_set = set_searched;
		var bag_items = document.getElementById('bag').getElementsByTagName('div'),
		i, inv_id;
		
		for(i=0; i<bag_items.length; i++){
		  if (bag_items[i].firstChild.getAttribute('src') !=null){
			bag_items[i].style.display = 'none';
			inv_id = (bag_items[i].id).replace("item_", "");
			if (Bag.getInstance().items[inv_id].obj.set != null){
			  if (Bag.getInstance().items[inv_id].obj.set.key == set_searched){
			  bag_items[i].style.display = '';
			  anyresult = 1;
			  }
			}
		  }
		}
		
		for (var twpro_wear in Wear.wear) {
			if (Wear.wear[twpro_wear].obj.set != null && Wear.wear[twpro_wear].obj.set.key == set_searched){
				$('char_'+twpro_wear).className = $('char_'+twpro_wear).className + ' wear_'+twpro_wear+'_highlight';
			}
			else{
				$('char_'+twpro_wear).className = $('char_'+twpro_wear).className.replace(' wear_'+twpro_wear+'_highlight',' wear_'+twpro_wear+'_highlight2');
			}
		}
	  }
	  else{
		remove_highlight();
		twpro_toggle_set = 0;
		TWPro.twpro_bagVis();
	  }
	  
	  function remove_highlight(){
		if (twpro_toggle_set != 0) {
		  $('twpro_set_filters_'+twpro_toggle_set).setStyles({'outline-style':'none'});
		  $('twpro_set_filters_'+twpro_toggle_set).parentNode.setStyles({'outline-style':'none'});
		  for (var twpro_wear in Wear.wear) {
			  if (Wear.wear[twpro_wear].obj.set != null && Wear.wear[twpro_wear].obj.set.key == twpro_toggle_set){
				  $('char_'+twpro_wear).className = $('char_'+twpro_wear).className.replace(' wear_'+twpro_wear+'_highlight', '');
			  }
			  else{
				  $('char_'+twpro_wear).className = $('char_'+twpro_wear).className.replace(' wear_'+twpro_wear+'_highlight2',' wear_'+twpro_wear+'_highlight');
			  }
		  }
		}
	  }
	}
	
	function twpro_searchInventory(searchNow, updateItemId){
		if(twpro_toggle_set != 0) TWPro.twpro_show_set(0);
		if(!TWPro.searchInventory.cache && updateItemId) return;
		if(!searchNow){
			clearTimeout(TWPro.searchInventory.timer);
			TWPro.searchInventory.timer = setTimeout(TWPro.twpro_searchInventory, 500, true, updateItemId);
			return;
		}
		clearTimeout(TWPro.searchInventory.timer);
		TWPro.searchInventory.timer = null;
		var search = document.getElementById('twpro_searchinventory');
		if(!search) return;
		TWPro.twpro_internalWindowToTop("window_inventory");
		var cache, i, item,
			invent = document.getElementById('bag'),
			reJunk = /<[^>]+>|\n+/g, reSplit = /\t+/g,
			rePopupType = /"item_popup_type">([^<]+)<\/span>/,
			rePopupBonusAttr = /"item_popup_bonus_attr">((?:[+\-]\d{1,2}\s[^<]+(?:<br \/>)?)+)<\/span>/,
			rePopupBonusSkill = /"item_popup_bonus_skill">((?:[+\-]\d{1,2}\s[^<]+(?:<br \/>)?)+)<\/span>/,
			unjunk = function(subject, replace){return subject.replace(reJunk, replace||'').replace(reSplit, ' ').toLowerCase()},
			searchTerms = unjunk(search.value), isRegExp = false;
//			anyresult;
		if(/[*?]/.test(searchTerms)){
			searchTerms = new RegExp(searchTerms.replace(/[.+\[\]()\\{}]/g, '\\$&').replace(/\?+/g, '[^\t]?').replace(/\*+/g, '[^\t]*?'));
			isRegExp = true;
		}
		search.style.backgroundImage = 'url('+twpro_loadingSearchImg+')';
		var processbagItem = function(iid, bag_item){
				if(bag_item){
					bag_obj = bag_item.obj;
					cache[iid] = unjunk(bag_obj.name);
					if((wat = bag_obj.description)){
						cache[iid] += '\t' + unjunk(wat);
					}
					if((wat = bag_item.popup.popup.xhtml.match(rePopupType))){
						cache[iid] += '\t' + unjunk(wat[1]);
					}
					if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusAttr))){
						cache[iid] += '\t' + unjunk(wat[1], '\t');
					}
					if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusSkill))){
						cache[iid] += '\t' + unjunk(wat[1], '\t');
					}
					if((wat = bag_obj.set)){
						cache[iid] += '\t' + unjunk(wat.name);
					}
				}
				if((item=invent.getElementById('item_'+iid))){
					disp = isRegExp ? searchTerms.test(cache[iid]) : cache[iid].indexOf(searchTerms) != -1;
					// don't add them together, FF 3.6 has an annoying bug: disp = false instead of '' or 'twpro_search_hide'
					disp = disp ? '' : 'twpro_search_hide';
					item.className = item.className.replace(/\s*twpro_search_hide|$/, " " + disp);

				}
			},
			bag_items = Bag.getInstance().items, i, disp
		if(!(cache = TWPro.searchInventory.cache)){
			cache = TWPro.searchInventory.cache = {};
			for(i in bag_items){
				processbagItem(i, bag_items[i]);
			}
		}
		else{
			for(i in cache){
				processbagItem(i);
			}
			if(bag_items[updateItemId]){
				processbagItem(updateItemId, bag_items[updateItemId]);
			}
		}
		if(search.value == '') TWPro.searchInventory.cache = null; // avoid full bag reload when using set filters
		TWPro.twpro_bagVis();
		search.style.backgroundImage = 'url(data:image/png;base64,'+twpro_searchButtonImg+')';
	}

		function twpro_searchTrader(searchNow, updateItemId, town_id, market_id){
			var searchIn = TWPro.searchTrader[town_id];
			if(!searchIn.cache && updateItemId) return;
			if(!searchNow){
				clearTimeout(searchIn.timer);
				searchIn.timer = setTimeout(TWPro.twpro_searchTrader, 500, true, updateItemId, town_id, market_id);
				return;
			}
			clearTimeout(searchIn.timer);
			searchIn.timer = null;
			var search = document.getElementById('twpro_market_'+town_id+'_search');
			if(!search) return;
			TWPro.twpro_internalWindowToTop("window_building_market_"+town_id);
			var cache, item,
				invent = document.getElementById('market_'+town_id+'_inv_div'),
				reJunk = /<[^>]+>|\n+/g, reSplit = /\t+/g,
				rePopupType = /"item_popup_type">([^<]+)<\/span>/,
				rePopupBonusAttr = /"item_popup_bonus_attr">((?:[+\-]\d{1,2}\s[^<]+(?:<br \/>)?)+)<\/span>/,
				rePopupBonusSkill = /"item_popup_bonus_skill">((?:[+\-]\d{1,2}\s[^<]+(?:<br \/>)?)+)<\/span>/,
				unjunk = function(subject, replace){return subject.replace(reJunk, replace||'').replace(reSplit, ' ').toLowerCase()},
				searchTerms = unjunk(search.value), isRegExp = false,
				anyresult=0;
			if(/[*?]/.test(searchTerms)){
				searchTerms = new RegExp(searchTerms.replace(/[.+\[\]()\\{}]/g, '\\$&').replace(/\?+/g, '[^\t]?').replace(/\*+/g, '[^\t]*?'));
				isRegExp = true;
			}
			search.style.backgroundImage = 'url('+twpro_loadingSearchImg+')';
			var processbagItem = function(iid, bag_item){
					if(bag_item){
						bag_obj = bag_item.obj;
						cache[iid] = unjunk(bag_obj.name);
						if((wat = bag_obj.description)){
							cache[iid] += '\t' + unjunk(wat);
						}
						if((wat = bag_item.popup.popup.xhtml.match(rePopupType))){
							cache[iid] += '\t' + unjunk(wat[1]);
						}
						if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusAttr))){
							cache[iid] += '\t' + unjunk(wat[1], '\t');
						}
						if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusSkill))){
							cache[iid] += '\t' + unjunk(wat[1], '\t');
						}
						if((wat = bag_obj.set)){
							cache[iid] += '\t' + unjunk(wat.name);
						}
					}
					if((item=invent.getElementById('item_'+iid))){
						disp = isRegExp ? searchTerms.test(cache[iid]) : cache[iid].indexOf(searchTerms) != -1;
						// don't add them together, FF 3.6 has an annoying bug: disp = false instead of '' or 'twpro_search_hide'
						disp = disp ? '' : 'twpro_search_hide';
						item.className = item.className.replace(/\s*twpro_search_hide|$/, " " + disp);
					}
				},
				bii_bag_items = PlayerInventory.getInstance().bags["market_"+market_id].items, i, disp,
				bag_items = invent.getElementsByTagName('div'),
				nores = document.getElementById('twpro_nosearchresult'+town_id);
			if(!(cache = searchIn.cache)){
				cache = searchIn.cache = {};
				for(i in bii_bag_items){
					processbagItem(i, bii_bag_items[i]);
				}
			}
			else{
				for(i in cache){
					processbagItem(i);
				}
				if(bii_bag_items[updateItemId]){
					processbagItem(updateItemId, bii_bag_items[updateItemId]);
				}
			}
			
			for(i=0; i<bag_items.length; i++){
				if(bag_items[i].id.substr(0, 5) != 'item_') continue;
				if(bag_items[i].className.indexOf("twpro_search_hide") != -1 || bag_items[i].className.indexOf("nonauctionable") != -1){
					continue;
				}
				anyresult = 1;
			}
			if(!anyresult){
				if(!nores){
					nores = document.createElement('div');
					nores.id = 'twpro_nosearchresult'+town_id;
					nores.style.cssText = 'height: 290px;';
					invent.appendChild(nores);
				}
				nores.innerHTML = TWPro.lang.NOSEARCHRESULT.replace('%2', '<br><a href="javascript:" onclick="document.getElementById(\'twpro_market_'+town_id+'_search\').value=\'\';TWPro.twpro_searchTrader(true, null, '+town_id+', '+market_id+')">').replace('%3', '</a>').replace('%1', '<em>'+document.getElementById('twpro_market_'+town_id+'_search').value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;')+'</em>');
			}
			else if(nores){
				nores.parentNode.removeChild(nores);
			}
			search.style.backgroundImage = 'url(data:image/png;base64,'+twpro_searchButtonImg+')';
		}


	function twpro_bagVis(){
		var bag_items = document.getElementById('bag').getElementsByTagName('div'),
			i, hide = TWPro.twpro_preference('dispJobClothingOnly') && document.getElementById('twpro_jobList').selectedIndex != 0,
			anyresult,
			nores = document.getElementById('twpro_nosearchresult');
		for(i=0; i<bag_items.length; i++){
			if(bag_items[i].id.substr(0, 5) != 'item_') continue;
			if(bag_items[i].className.indexOf('twpro_search_hide') != -1){
				continue;
			}
			if(hide && bag_items[i].firstChild.className == ''){
				bag_items[i].style.display = 'none';
			}
			else{
				bag_items[i].style.display = '';
				anyresult = 1;
			}
		}
		if(!anyresult){
			var extra = hide?'<br /><br /><a href="javascript:TWPro.twpro_preference(\'dispJobClothingOnly\',document.getElementById(\'twpro_clothingfilter\').checked=false);TWPro.twpro_bagVis()">'+TWPro.lang.DISABLEBESTFORJOB+'</a>':'';
			if(!nores){
				nores = document.createElement('div');
				nores.id = 'twpro_nosearchresult';
//				nores.style.color = "#C77341";
				nores.style.cssText = 'padding: 5px; background-image: url("/images/bgdark.png");border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;';
				document.getElementById('bag').appendChild(nores);
			}
			nores.innerHTML = TWPro.lang.NOSEARCHRESULT
				.replace('%2', '<br /><a href="javascript:" onclick="document.getElementById(\'twpro_searchinventory\').value=\'\';TWPro.twpro_searchInventory(true)">')
				.replace('%3', '</a>'+extra)
				.replace('%1', '<em>'+document.getElementById('twpro_searchinventory').value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;')+'</em>');
		}
		else if(nores){
			nores.parentNode.removeChild(nores);
		}
	}

		function internalWindowToTop(windowId){
			var windows = document.getElementById("windows"),
			inv = document.getElementById(windowId);
			if(inv && inv.parentNode == windows && inv != windows.firstChild){
				windows.insertBefore(inv, windows.firstChild);
			}
		}


	function twpro_sortList(twpro_jobSortItem) {
		if (TWPro.twpro_failure) return;
		TWPro.twpro_jobsort = twpro_jobSortItem;
		for(var i=0; i<TWPro.twpro_sorts.length; i++){
			TWPro.twpro_jobSortMark(TWPro.twpro_sorts[i], false);
		}
		TWPro.twpro_jobSortMark(twpro_jobSortItem, true);
		if (TWPro.twpro_calculated && document.getElementById("twpro_jobList")) {
			if (document.getElementById('twpro_wait').text == TWPro.lang.CHOOSEJOB) {
				document.getElementById('twpro_wait').text = TWPro.lang.CALCJOB;
				var twpro_selectedJobName = 'none';
				if (document.getElementById("twpro_jobList").selectedIndex != 0) {
					var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
					if (twpro_selectedJob >= 0) {
						twpro_selectedJobName = TWPro.twpro_jobs[twpro_selectedJob].shortName;
					}
				}
				document.getElementById("twpro_jobList").selectedIndex = 0;
				while (document.getElementById("twpro_jobList").lastChild.id != 'twpro_wait') {
					document.getElementById("twpro_jobList").removeChild(document.getElementById("twpro_jobList").lastChild);
				}
				TWPro.twpro_sortJobs();
				TWPro.twpro_insertListItems();
				for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
					TWPro.twpro_jobs[twpro_i].twpro_jobid = twpro_i;
				}
				for (var twpro_i = 0; twpro_i < document.getElementById("twpro_jobList").options.length; twpro_i++) {
					var twpro_jobTest = parseInt(document.getElementById("twpro_jobList").options[twpro_i].value);
					if (twpro_jobTest >= 0) {
						if (twpro_selectedJobName == TWPro.twpro_jobs[twpro_jobTest].shortName) {
							document.getElementById("twpro_jobList").selectedIndex = twpro_i;
						}
					}
				}
				document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
			}
			else {
				TWPro.twpro_sortJobs();
			}
		}
		document.getElementById('twpro_jobsort_link_' + twpro_jobSortItem).blur();
	}

	function twpro_jobSortMark(twpro_jobSortItem, twpro_jobSortValue) {
		if (TWPro.twpro_failure) return;
		var twpro_bgposition = '';
		for(var i=0; i<TWPro.twpro_sorts.length; i++){
			if(TWPro.twpro_sorts[i] == twpro_jobSortItem){
				twpro_bgposition = (20*-i)+'px ';
				break;
			}
		}
		twpro_bgposition += twpro_jobSortValue ? '0px' : '-17px';
		document.getElementById('twpro_jobsort_link_' + twpro_jobSortItem).style.backgroundPosition = twpro_bgposition;
	}

	// macht die Liste sichtbar
	function twpro_showList() {
		if (TWPro.twpro_failure) return;
		// fix for Crafting page reload #1
		eval('Bag.loadItems = ' + Bag.loadItems.toString().replace(/this\.add\(bag_content\[i\]\);\s*}/,"this.add(bag_content[i]);}if ($(\'window_inventory_content\')){TWPro.twpro_changeItem(-1);}"));

		$('twpro_jobsort_link_name').addMousePopup(new MousePopup(TWPro.lang.SORTBYNAME, 100, {opacity:0.95}));
		$('twpro_jobsort_link_xp').addMousePopup(new MousePopup(TWPro.lang.SORTBYXP, 100, {opacity:0.95}));
		$('twpro_jobsort_link_wages').addMousePopup(new MousePopup(TWPro.lang.SORTBYWAGES, 100, {opacity:0.95}));
		$('twpro_jobsort_link_luck').addMousePopup(new MousePopup(TWPro.lang.SORTBYLUCK, 100, {opacity:0.95}));
		$('twpro_jobsort_link_comb').addMousePopup(new MousePopup(TWPro.lang.SORTBYCOMB, 100, {opacity:0.95}));
		$('twpro_jobsort_link_danger').addMousePopup(new MousePopup(TWPro.lang.SORTBYDANGER, 100, {opacity:0.95}));
		$('twpro_jobsort_link_laborp').addMousePopup(new MousePopup(TWPro.lang.SORTBYLABORP, 100, {opacity:0.95}));
		$('twpro_jobsort_filter').addMousePopup(new MousePopup(TWPro.lang.FILTERJOBS, 100, {opacity:0.95}));
		$('twpro_clothingfilter').addMousePopup(new MousePopup(TWPro.lang.FILTERCLOTHING, 100, {opacity:0.95}));
		$('twpro_search_help').addMousePopup(new MousePopup(TWPro.lang.SEARCHHELP, 100, {opacity:0.95}));

		for (var twpro_wear in Wear.wear) {
		  if (Wear.wear[twpro_wear].obj.set != null){
		  TWPro.twpro_setBonus[Wear.wear[twpro_wear].obj.set.key][1].name = Wear.wear[twpro_wear].obj.set.name;
		  }
		}
		var bagitems = Bag.getInstance().items;
		for (var twpro_bag in bagitems) {
		  if (bagitems[twpro_bag].obj.set != null){
			TWPro.twpro_setBonus[bagitems[twpro_bag].obj.set.key][1].name = bagitems[twpro_bag].obj.set.name;
		  }
		}	
		twpro_xhtml = twpro_xhtml_2 = '';
		for (var twpro_set in TWPro.twpro_setBonus) {
			if ((twpro_set == "tw_times_set" || twpro_set == "collector_set") && !TWPro.twpro_setBonus[twpro_set][1].name) continue;
			if (TWPro.twpro_setBonus[twpro_set][1].gender == Character.characterSex || TWPro.twpro_setBonus[twpro_set][1].gender == "mixed"){
			  twpro_xhtml += '<a href="javascript:void(0)"><img id="twpro_set_filters_'+twpro_set+'_bg" src="images/inventory/bag.png" style="z-index:1;width:21px;height:21px;"/><img id="twpro_set_filters_'+twpro_set+'" alt="" src="'+TWPro.twpro_setBonus[twpro_set][1].image+'" style="z-index:2;width:19px;height:19px;margin-left:-20px;" onmouseover="if(this.style.outlineWidth == \'thin\'){this.setStyles({\'outline-style\':\'inset\'})};this.setOpacity(parseFloat(this.style.opacity)+0.4);" onmouseout="this.setStyles({\'outline-style\':\'inherit\'});this.setOpacity(parseFloat(this.style.opacity)-0.4);" onclick="this.parentNode.setStyles({\'outline-style\':\'inset\'});this.setStyles({outline:\'#000000 inset thin\'});TWPro.twpro_show_set(\''+twpro_set+'\')"/></a><br>';
			}
			else{
			  twpro_xhtml_2 += '<a href="javascript:void(0)"><img id="twpro_set_filters_'+twpro_set+'_bg" src="images/inventory/bag.png" style="z-index:1;width:21px;height:21px;"/><img id="twpro_set_filters_'+twpro_set+'" alt="" src="'+TWPro.twpro_setBonus[twpro_set][1].image+'" style="z-index:2;width:19px;height:19px;margin-left:-20px;" onmouseover="if(this.style.outlineWidth == \'thin\'){this.setStyles({\'outline-style\':\'inset\'})};this.setOpacity(parseFloat(this.style.opacity)+0.4);" onmouseout="this.setStyles({\'outline-style\':\'inherit\'});this.setOpacity(parseFloat(this.style.opacity)-0.4);" onclick="this.parentNode.setStyles({\'outline-style\':\'inset\'});this.setStyles({outline:\'#000000 inset thin\'});TWPro.twpro_show_set(\''+twpro_set+'\')"/></a><br>';
			}
		}
		$('display_sets').innerHTML = twpro_xhtml+twpro_xhtml_2;
		for (var twpro_set in TWPro.twpro_setBonus) {
			if(!$('twpro_set_filters_'+twpro_set)) continue;
			if (TWPro.twpro_setBonus[twpro_set][1].name){
			  $('twpro_set_filters_'+twpro_set).addMousePopup(new MousePopup('<b>'+TWPro.twpro_setBonus[twpro_set][1].name+'</b>', 100, {opacity:0.95})); 
			  $('twpro_set_filters_'+twpro_set).setStyles({'outline-width':'thin','outline-color':'#000000'});
			}
			else{
			  $('twpro_set_filters_'+twpro_set).addMousePopup(new MousePopup(TWPro.lang.NOITEMSETS+' (<i>'+twpro_set+'</i>)', 100, {opacity:0.95})); 
			  $('twpro_set_filters_'+twpro_set).setOpacity(0.05);
			  $('twpro_set_filters_'+twpro_set).style.cursor="default";
			  $('twpro_set_filters_'+twpro_set).onclick="void(0)";
			}
		}

		TWPro.twpro_bag.twpro_bagPopup = new MousePopup('', 100, {opacity:0.95});
		TWPro.twpro_bag.twpro_bagPopup.twpro_refresh = function () {
			this.setXHTML(TWPro.twpro_getBagPopup());
		};
		TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
		$('twpro_bag').addMousePopup(TWPro.twpro_bag.twpro_bagPopup);
		
		var live_mode_recalc = true;
		if(TWPro.twpro_calculated==true){
			for (var twpro_wear in Wear.wear) {
				TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
				if (Wear.wear[twpro_wear].obj.twpro_bonus || Wear.wear[twpro_wear].obj.twpro_weapon) {
					Wear.wear[twpro_wear].obj.twpro_jobbonus = TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus;
				}
			}
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				TWPro.twpro_prepareItem(bagitems[twpro_bag].obj);
				if (bagitems[twpro_bag].obj.twpro_bonus || bagitems[twpro_bag].obj.twpro_weapon) {
					bagitems[twpro_bag].obj.twpro_jobbonus = TWPro.twpro_itemStorage[bagitems[twpro_bag].obj.item_id].twpro_jobbonus;
				}
			}

			live_mode_recalc = false;

			if(TWPro.twpro_invHash != TWPro.twpro_invHashTest.join(',') && TWPro.settings_prefs['useCache']!='true'){
				twpro_actual_inv = TWPro.twpro_invHashTest.join(',').split(',');
				twpro_calculated_inv = TWPro.twpro_invHash.split(',');
				for(var i=0;i<Math.max(twpro_actual_inv.length,twpro_calculated_inv.length);i++){
					if(twpro_actual_inv[i]!=twpro_calculated_inv[i]){
						if((TWPro.twpro_itemStorage[i].twpro_bonus==true || TWPro.twpro_itemStorage[i].twpro_weapon==true || TWPro.twpro_itemStorage[i].twpro_set==true) && TWPro.twpro_itemStorage[i].twpro_wearable==true){
							live_mode_recalc = true;
							break;
						}
					}
				}
			}
			if ((live_mode_recalc == false && TWPro.settings_prefs['useCache']!='true') || (TWPro.settings_prefs['useCache']=='true' && TWPro.twpro_skillsHash == TWPro.twpro_skillsHashTest)) {
				TWPro.twpro_invHash = TWPro.twpro_invHashTest.join(',');
				TWPro.twpro_insertListItems();
				document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
				$("twpro_useful").style.display = "block";	
			}
			else{
				if(TWPro.twpro_NewjobsDetected) TWPro.twpro_NewjobsDetected = [];
				TWPro.twpro_jobsCalculated = {};
			}
		}
		document.getElementById('twpro_jobDisplay').style.visibility = 'visible';
		
		TWPro.twpro_cache_status();
	}
	
	function twpro_cache_status(rerun_status){
	  if($("twpro_cache_button")){
		//alert(JSON.stringify(TWPro.bigCache));
		$("twpro_cache_button").parentNode.href="javascript:/*Click here to generate cache*/TWPro.twpro_generate_cache();";
		if(TWPro.settings_prefs['useCache']=='true'){
			if(TWPro.twpro_emptying_cache!=true){
				var twpro_invHashTest_actual = TWPro.twpro_invHashTest.join(',');
				var twpro_invHashCached_reduced = twproCache.getValue("TWPro.twpro_invHash")||'';
				var reduced_match = twpro_invHashCached_reduced.match(/\[\d+\]/g)||'';
				for(var i=0;i<reduced_match.length;i++){
					var reduced_patt=new RegExp(reduced_match[i].replace("[","\\[").replace("]","\\]"),'g');
					var comma_string ='';
					for(var j=0;j<(reduced_match[i].match(/\d+/));j++){
						comma_string += ",";
					}
					twpro_invHashCached_reduced=twpro_invHashCached_reduced.replace(reduced_patt, comma_string);
				}				
				TWPro.twpro_invHashCached = twpro_invHashCached_reduced || '';
				var twpro_skills_actual = {'level':Character.level,'health':Character.skills.health,'ride':Character.skills.ride,'leadership':Character.skills.leadership,'aim':Character.skills.aim,'dodge':Character.skills.dodge,'endurance':Character.skills.endurance,'hide':Character.skills.hide};
				var twpro_skills_cached = twproCache.getValue("twpro_specialJobs_skills");
				if((twpro_invHashTest_actual != TWPro.twpro_invHashCached || JSON.stringify(twpro_skills_actual) != JSON.stringify(twpro_skills_cached) || (TWPro.twpro_NewjobsDetected && TWPro.twpro_NewjobsDetected.length>0)) && rerun_status != 1){
					if(TWPro.twpro_invHashCached!=''){
						function run_cache_diff(){
							var twpro_cache_diff ='';
							// items changes
							if(twpro_invHashTest_actual != TWPro.twpro_invHashCached || twpro_skills_cached.level != Character.level){
								TWPro.twpro_cache_new = [];
								TWPro.twpro_cache_deleted = [];
								for (var twpro_wear in Wear.wear) {
								  twpro_item = Wear.wear[twpro_wear].obj;
								  if(TWPro.twpro_calculated!=true) TWPro.twpro_prepareItem(twpro_item);
								  if(twpro_skills_cached.level != Character.level && ((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease[twpro_item.type] - Character.itemLevelRequirementDecrease['all']) > twpro_skills_cached.level)) && ((TWPro.twpro_itemStorage[twpro_item.item_id].twpro_bonus==true || TWPro.twpro_itemStorage[twpro_item.item_id].twpro_weapon==true || TWPro.twpro_itemStorage[twpro_item.item_id].twpro_set==true) && TWPro.twpro_itemStorage[twpro_item.item_id].twpro_wearable==true)){
									TWPro.twpro_cache_new.push(twpro_item.item_id);
								  }
								}
								var bagitems = Bag.getInstance().items;
								for (var twpro_bag in bagitems) {
								  twpro_item = bagitems[twpro_bag].obj;
								  if(TWPro.twpro_calculated!=true) TWPro.twpro_prepareItem(twpro_item);
								  if(twpro_skills_cached.level != Character.level && ((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease[twpro_item.type] - Character.itemLevelRequirementDecrease['all']) > twpro_skills_cached.level)) && ((TWPro.twpro_itemStorage[twpro_item.item_id].twpro_bonus==true || TWPro.twpro_itemStorage[twpro_item.item_id].twpro_weapon==true || TWPro.twpro_itemStorage[twpro_item.item_id].twpro_set==true) && TWPro.twpro_itemStorage[twpro_item.item_id].twpro_wearable==true)){
									TWPro.twpro_cache_new.push(twpro_item.item_id);
								  }
								}
								if(twpro_invHashTest_actual != TWPro.twpro_invHashCached){
									twpro_actual_inv = twpro_invHashTest_actual.split(',');
									twpro_cached_inv = TWPro.twpro_invHashCached.split(',');
									for(var i=0;i<Math.max(twpro_actual_inv.length,twpro_cached_inv.length);i++){
										if(twpro_actual_inv[i]!=twpro_cached_inv[i]){
											if(twpro_actual_inv[i]==1 && ((TWPro.twpro_itemStorage[i].twpro_bonus==true || TWPro.twpro_itemStorage[i].twpro_weapon==true || TWPro.twpro_itemStorage[i].twpro_set==true) && TWPro.twpro_itemStorage[i].twpro_wearable==true)){
											//alert(JSON.stringify(TWPro.twpro_itemStorage[i]))
												TWPro.twpro_cache_new.push(i);
											}
											else if(twpro_cached_inv[i]==1){
												if(TWPro.cacheMethod == "WebStorage"){
												  var item_cache_test = twproCache.getValue("twpro_inv."+i);
												}
												else{
												  var item_cache_test = TWPro.bigCache["twpro_inv."+i];
												}
//												alert(JSON.stringify(item_cache_test));
												if(item_cache_test && (item_cache_test.twpro_bonus==true || item_cache_test.twpro_weapon==true || item_cache_test.twpro_set==true) && item_cache_test.twpro_wearable==true){
													TWPro.twpro_cache_deleted.push([i, item_cache_test.name]);
												}
											}
										}
									}
								}
								if(TWPro.twpro_cache_new.length>0 || TWPro.twpro_cache_deleted.length>0){
								  twpro_cache_diff = '<hr><center><span style="color:darkred"><b>'+TWPro.lang.CACHEINVENTORYCHANGES+'</b></span><br>'+TWPro.lang.CACHEUPDATECLICK+'</center><hr width="75%">';
								}
								if(TWPro.twpro_cache_new.length>0){
								  twpro_cache_diff +="<div style='margin-top:5px'><b><i>"+TWPro.lang.CACHENEWITEMS+":</i></b></div><table style='font-size:12px'><tr><td><table>";
								  for(var i=0;i<TWPro.twpro_cache_new.length;i++){
									  if(i>0&&i%10==0)twpro_cache_diff+="</table></td><td><table>";
									  twpro_cache_diff += "<tr><td>&nbsp;"+TWPro.twpro_itemStorage[TWPro.twpro_cache_new[i]].name+"</td></tr>";
								  }
								  twpro_cache_diff +="</table></td></tr></table>";
								}
								if(TWPro.twpro_cache_deleted.length>0){
								  twpro_cache_diff +="<div style='margin-top:5px'><b><i>"+TWPro.lang.CACHEDELETEDITEMS+":</i></b></div><table style='font-size:12px'><tr><td><table>";
								  for(var i=0;i<TWPro.twpro_cache_deleted.length;i++){
									  if(i>0&&i%10==0)twpro_cache_diff+="</table></td><td><table>";
									  twpro_cache_diff += "<tr><td>&nbsp;"+TWPro.twpro_cache_deleted[i][1]+"</td></tr>";
								  }
								  twpro_cache_diff +="</table></td></tr></table><hr>";
								}
							}



/*
				//	alert(JSON.stringify(TWPro.twpro_jobsCalculated));				
					if(TWPro.twpro_cache_new){
						TWPro.twpro_jobsUpdateCalc = true;
						for(var twpro_it = 0; twpro_it<TWPro.twpro_cache_new.length; twpro_it++){
							//var twpro_xhtml = '';
							var twpro_item = TWPro.twpro_itemStorage[TWPro.twpro_cache_new[twpro_it]];
							if (twpro_item.twpro_bonus == undefined || twpro_item.twpro_weapon == undefined) {
								//alert("prepare"+TWPro.twpro_cache_new[twpro_it]);
								TWPro.twpro_prepareItem(twpro_item);
							}
							if(twpro_item.twpro_set == true && twpro_item.twpro_setKey == 'set_sleeper' && TWPro.twpro_setItemsCount["set_sleeper"] >= 2){
								TWPro.twpro_jobsCalculated["regeneration"]=false;
							}
							else if(twpro_item.twpro_set == true && TWPro.twpro_validSet(twpro_item.twpro_setKey) && (TWPro.prefs["disabledSets"]+'').indexOf('|'+twpro_item.twpro_setKey+'|') == -1){
								if(!twpro_setItemsUpd) var twpro_setItemsUpd = {};
								if(!twpro_setItemsUpd[twpro_item.twpro_setKey]){
									twpro_setItemsUpd[twpro_item.twpro_setKey] = {};
									twpro_setItemsUpd[twpro_item.twpro_setKey].itemsList = [];
								}
								twpro_setItemsUpd[twpro_item.twpro_setKey].itemsList.push(TWPro.twpro_cache_new[twpro_it]);
								twpro_setItemsUpd[twpro_item.twpro_setKey].newCount = (twpro_setItemsUpd[twpro_item.twpro_setKey].newCount || 0) +1;

								if(!twpro_setItemsCalcUpdate){
									var twpro_setItemsUpdate = {};
									var twpro_setItemsCalcUpdate = {};
									for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
										twpro_setItemsCalcUpdate[TWPro.twpro_bag.twpro_types[twpro_i]] = [null];
									}
									if(TWPro.cacheMethod == "WebStorage"){
										twpro_setItemsUpdate = twproCache.getValue("TWPro.twpro_setItems");
									}
									else{
										twpro_setItemsUpdate = TWPro.bigCache["TWPro.twpro_setItems"];
									}
									for (var twpro_setItemId in twpro_setItemsUpdate) {
										var twpro_setItem = twpro_setItemsUpdate[twpro_setItemId];
										if (twpro_setItem.twpro_wearable) {
											twpro_setItemsCalcUpdate[twpro_setItem.type].push(twpro_setItem.set.key+",");
										}
									}	
								}					
						
								twpro_setItemsUpd[twpro_item.twpro_setKey].actCount = 0;
								for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
									if((String(twpro_setItemsCalcUpdate[TWPro.twpro_bag.twpro_types[twpro_j]])).indexOf(","+twpro_item.twpro_setKey+",") != -1){
										twpro_setItemsUpd[twpro_item.twpro_setKey].actCount++;
										if(TWPro.twpro_bag.twpro_types[twpro_j] == twpro_item.type) twpro_setItemsUpd[twpro_item.twpro_setKey].newCount--;
									}
								}			
							}
							
							if (twpro_item.twpro_bonus || twpro_item.twpro_weapon) {
								//var twpro_plus = [];
								//alert("test"+TWPro.twpro_cache_new[twpro_it]);
								var twpro_better;
								//var twpro_style;
								for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
									twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i], twpro_item);
									if ((TWPro.twpro_jobs[twpro_i].shortName == "speed" && Character.characterClass == "greenhorn") || !TWPro.twpro_jobs[twpro_i].twpro_bestStats) continue;
									//twpro_style = ';';
									if((twpro_item.type == "right_arm" && ((twpro_item.sub_type == "hand" && TWPro.twpro_jobs[twpro_i].shortName == "duelvigor") || (twpro_item.sub_type == "shot" && (TWPro.twpro_jobs[twpro_i].shortName == "duelshootingatt" || TWPro.twpro_jobs[twpro_i].shortName == "duelshootingdef")))) || (twpro_item.type == "left_arm" && (TWPro.twpro_jobs[twpro_i].shortName.match(/twpro_fortatt/) || TWPro.twpro_jobs[twpro_i].shortName.match(/twpro_fortdef/)))){
									  twpro_better = -1;
									  var damage_type = twpro_item.type;
									  if(twpro_item.sub_type) damage_type += '_' + twpro_item.sub_type;
									  if (twpro_item.damage.damage_min >= TWPro.damage_min[damage_type]) twpro_better = twpro_item.damage.damage_min-TWPro.damage_min[damage_type]+'<span style="font-size:11px;">'+TWPro.lang.DMGMIN+'<\/span>';
									  if (twpro_item.damage.damage_max >= TWPro.damage_max[damage_type]) twpro_better = twpro_item.damage.damage_max-TWPro.damage_max[damage_type]+'<span style="font-size:11px;">'+TWPro.lang.DMGMAX+'<\/span>';
									  if ((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 >= TWPro.damage_average[damage_type]) twpro_better = ((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2)-TWPro.damage_average[damage_type]+'<span style="font-size:11px;">'+TWPro.lang.DMGAVG+'<\/span>';
									}
									else if(twpro_item.type == "right_arm" && (TWPro.twpro_jobs[twpro_i].shortName == "duelvigor" || TWPro.twpro_jobs[twpro_i].shortName == "duelshootingatt" || TWPro.twpro_jobs[twpro_i].shortName == "duelshootingdef")){
									  twpro_better = -1;
									}
									else{
									  twpro_better = Math.round((twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] - TWPro.twpro_jobs[twpro_i].twpro_bestStats[twpro_item.type])*100)/100;
									  if(isNaN(twpro_better)) twpro_better = -1;
									}
									if (twpro_better >= 0 || isNaN(twpro_better)) {
										TWPro.twpro_jobsCalculated[TWPro.twpro_jobs[twpro_i].shortName]=false;
									}
								}
							}
							//alert(twpro_plus.toString());
							//alert(twpro_xhtml);
						}
						if(twpro_setItemsUpd){
							var setItemsEffect = false;
							if(TWPro.cacheMethod == "WebStorage"){
							  if(twproCache.getValue("TWPro.twpro_setItemsEffect") == true) setItemsEffect = true;
							}
							else{
							  if(TWPro.bigCache["TWPro.twpro_setItemsEffect"] == true) setItemsEffect = true;
							}
							if(setItemsEffect == true){
								TWPro.twpro_jobsCalculated["regeneration"]=false;
								for (var twpro_set in twpro_setItemsUpd) {
									var twpro_setBonus_cached = {};
									if(TWPro.cacheMethod == "WebStorage"){
									  twpro_setBonus_cached = twproCache.getValue("TWPro.twpro_setBonus."+twpro_set);
									}
									else{
									  twpro_setBonus_cached = TWPro.bigCache["TWPro.twpro_setBonus."+twpro_set];
									}
									if(twpro_setItemsUpd[twpro_set].actCount >= 2 && twpro_setItemsUpd[twpro_set].newCount != 0){
										alert("act>=2 & new!=0 "+twpro_setItemsUpd[twpro_set].actCount+"+"+twpro_setItemsUpd[twpro_set].newCount);
										for (var twpro_job in twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus){
											if(twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus[twpro_job] > 0 || twpro_job == "speed"){	
												for(var twpro_j=0; twpro_j < twpro_setItemsUpd[twpro_set].itemsList.length; twpro_j++){
													twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus[twpro_job] = twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus[twpro_job] + (TWPro.twpro_itemStorage[twpro_setItemsUpd[twpro_set].itemsList[twpro_j]].twpro_jobbonus?(TWPro.twpro_itemStorage[twpro_setItemsUpd[twpro_set].itemsList[twpro_j]].twpro_jobbonus[twpro_job]||0):0);
													//TWPro.twpro_itemStorage[twpro_setItemsUpd[twpro_set].itemsList[twpro_j]].twpro_jobbonus?alert(TWPro.twpro_itemStorage[twpro_setItemsUpd[twpro_set].itemsList[twpro_j]].twpro_jobbonus[twpro_job]||0):alert(twpro_setItemsUpd[twpro_set].itemsList[twpro_j]);
												}
											}
											if(twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus[twpro_job] > twpro_setBonus_cached[twpro_setItemsUpd[twpro_set].actCount].parsedBonus[twpro_job]){
												TWPro.twpro_jobsCalculated[twpro_job]=false;
											}
										}
										if(TWPro.twpro_setBonus[twpro_set][(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].speedBonus > TWPro.twpro_setBonus[twpro_set][twpro_setItemsUpd[twpro_set].actCount].speedBonus) TWPro.twpro_jobsCalculated["speed"]=false;
									}
									else if((twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount) >= 2){
										alert("act+new>=2 "+twpro_setItemsUpd[twpro_set].actCount+"+"+twpro_setItemsUpd[twpro_set].newCount);
										for (var twpro_job in twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus){
											if(twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus[twpro_job] > 0){
												TWPro.twpro_jobsCalculated[twpro_job]=false;
											}
										}
										if(TWPro.twpro_setBonus[twpro_set][(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].speedBonus > 0) TWPro.twpro_jobsCalculated["speed"]=false;
									}
									else{
										alert("gold set case "+twpro_setItemsUpd[twpro_set].actCount+"+"+twpro_setItemsUpd[twpro_set].newCount);
									}
								}
							}
							else{
								for (var twpro_set in twpro_setItemsUpd) {
									if((twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount) >= 2){
										TWPro.twpro_jobsUpdateCalc = false;
										TWPro.twpro_jobsCalculated = {};
									}
								}
							}
							twpro_setItemsUpdate = {};
							twpro_setItemsCalcUpdate = {};
							twpro_setItemsUpd = {};
						}
						TWPro.twpro_cache_new = null;
					}
					//alert(JSON.stringify(TWPro.twpro_jobsCalculated));				
*/








							if(JSON.stringify(twpro_skills_actual) != JSON.stringify(twpro_skills_cached)){
								//skill changes
								var jobs_changes = '';
								TWPro.twpro_cache_jobsChanges = [];
								if(!TWPro.disabledJobs['regeneration'] && (twpro_skills_actual.level!=twpro_skills_cached.level || twpro_skills_actual.health!=twpro_skills_cached.health)){
									jobs_changes += TWPro.lang.REGENERATION+"<br>";
									TWPro.twpro_cache_jobsChanges.push('regeneration');
								}
								if(!TWPro.disabledJobs['speed'] && twpro_skills_actual.ride!=twpro_skills_cached.ride){
									jobs_changes += TWPro.lang.SPEED+"<br>";
									TWPro.twpro_cache_jobsChanges.push('speed');
								}
								if(twpro_skills_actual.health!=twpro_skills_cached.health || twpro_skills_actual.leadership!=twpro_skills_cached.leadership || twpro_skills_actual.aim!=twpro_skills_cached.aim || twpro_skills_actual.dodge!=twpro_skills_cached.dodge || twpro_skills_actual.endurance!=twpro_skills_cached.endurance){
									if(!TWPro.disabledJobs['twpro_fortatt']){
									  jobs_changes += TWPro.lang.FORTATTACK+"<br>";
									  TWPro.twpro_cache_jobsChanges.push('twpro_fortatt');
									}
									else if(TWPro.settings_prefs['splitFortbattle']=='true'){
									  for(var i=0; i<extra_jobs.length; i++){
										if(extra_jobs[i].match(/twpro_fortatt_/) && !TWPro.disabledJobs[extra_jobs[i]]){
											jobs_changes += TWPro.lang.FORTATTACK+"<br>";
											TWPro.twpro_cache_jobsChanges.push('twpro_fortatt');
											break;											  
										}
									  }
									}
								}
								if(twpro_skills_actual.health!=twpro_skills_cached.health || twpro_skills_actual.leadership!=twpro_skills_cached.leadership || twpro_skills_actual.aim!=twpro_skills_cached.aim || twpro_skills_actual.dodge!=twpro_skills_cached.dodge || twpro_skills_actual.hide!=twpro_skills_cached.hide){
									if(!TWPro.disabledJobs['twpro_fortdef']){
									  jobs_changes += TWPro.lang.FORTDEFEND+"<br>";
									  TWPro.twpro_cache_jobsChanges.push('twpro_fortdef');
									}
									else if(TWPro.settings_prefs['splitFortbattle']=='true'){
									  for(var i=0; i<extra_jobs.length; i++){
										if(extra_jobs[i].match(/twpro_fortdef_/) && !TWPro.disabledJobs[extra_jobs[i]]){
											jobs_changes += TWPro.lang.FORTDEFEND+"<br>";
											TWPro.twpro_cache_jobsChanges.push('twpro_fortdef');
											break;											  
										}
									  }
									}
								}
								if(jobs_changes != ''){
								  twpro_cache_diff += '<hr><center><span style="color:darkred"><b>'+TWPro.lang.CACHESKILLSCHANGES+'</b></span><br>'+TWPro.lang.CACHEUPDATECLICK+'</center><hr width="75%"><b><i>'+TWPro.lang.CACHEJOBSAFFECTED+':</i></b><br>';
								  twpro_cache_diff += jobs_changes+"<hr>";
								}
							}
							if(TWPro.twpro_NewjobsDetected && TWPro.twpro_NewjobsDetected.length>0)
							{
								var new_jobs = '';
								for(var twpro_j=0; twpro_j<TWPro.twpro_NewjobsDetected.length; twpro_j++){
									new_jobs += TWPro.twpro_NewjobsDetected[twpro_j]+"<br>";
								}
								twpro_cache_diff += '<hr><center><span style="color:darkred"><b>'+TWPro.lang.CACHENEWJOBSDETECTED+'</b></span><br>'+TWPro.lang.CACHEUPDATECLICK+'</center><hr width="75%">';
								twpro_cache_diff += new_jobs+"<hr>";
							}
							if(twpro_cache_diff != ''){
							  $("twpro_cache_button").style.backgroundColor = "red";
							  $("twpro_cache_button").addMousePopup(new MousePopup(twpro_cache_diff.slice(4)));
							  $("twpro_cache_button").parentNode.href="javascript:/*Click here to generate cache*/TWPro.twpro_generate_cache('update');";
							}
							else{
								// Rerun because all special jobs are disabled
								TWPro.twpro_cache_status(1);
							}
						}
						if(TWPro.cacheMethod == "IndexedDB"){
							TWPro.bigCache={};
							twproCache_idb.getValue("TWPro.bigCache", function (data) {
								if(data){
								  TWPro.bigCache = data;
								  if(TWPro.bigCache == undefined) TWPro.bigCache={};
								  run_cache_diff();
								}
							});
						}
						else{
							run_cache_diff();
						}
					}
					else{
					  // empty
					  $("twpro_cache_button").style.backgroundColor = "red";
					  $("twpro_cache_button").addMousePopup(new MousePopup("<b>"+TWPro.lang.CACHEISEMPTY+"</b><br>"+TWPro.lang.CACHEINITIALIZE));
					}
				}
				else{
				  // OK
				  $("twpro_cache_button").style.backgroundColor = "green";
				  $("twpro_cache_button").addMousePopup(new MousePopup("<b>"+TWPro.lang.CACHEOK+"</b><br>"+TWPro.lang.CACHEREWRITE));
				}
			}
			else{
			  // emptying
			  $("twpro_cache_button").style.backgroundColor = "darkred"; //dark red
			  $("twpro_cache_button").addMousePopup(new MousePopup("<b>"+TWPro.lang.CACHEEMPTYING+"</b><br>"+TWPro.lang.CACHENORMALMODE));
			}
		}
		else{
		  // disabled
		  $("twpro_cache_button").style.backgroundColor = "darkred"; //dark red
		  $("twpro_cache_button").parentNode.href="javascript:/*Click here to configure TW Pro*/TWPro.twpro_disableJobs();";
		  $("twpro_cache_button").addMousePopup(new MousePopup("<b>"+TWPro.lang.CACHEDISABLED+"</b><br>"+TWPro.lang.CACHEOPENSETTINGS));
		}
	  }
	}

	function twpro_getBagPopup() {
		if (TWPro.twpro_failure) return '';
		eval(String(ItemPopup.prototype.getXHTML.toString().match(/var item_type_title.+"};/)));
		var twpro_xhtml = '';
		twpro_xhtml += '<div class="item_popup">';
		twpro_xhtml += '<span class="item_popup_title">'+TWPro.lang.INVENTSTATS+'</span>';
		twpro_xhtml += '<span class="item_popup_requirement_text"><hr>'+TWPro.lang.SELLVALUE+'<hr></span>';
		twpro_xhtml += '<table>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+document.getElementById('window_inventory_content').getElementsByTagName('h2')[1].innerHTML+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_priceWear + ' $</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+document.getElementById('window_inventory_content').getElementsByTagName('h2')[0].innerHTML.substring(0,document.getElementById('window_inventory_content').getElementsByTagName('h2')[0].innerHTML.indexOf(" <label"))+':&nbsp;&nbsp;<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_priceBag + ' $<hr></td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.OBJECTS+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_priceItems + ' $</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.PRODUCTS+':&nbsp;&nbsp;<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_priceYields + ' $<hr></td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.TOTAL+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + parseInt(TWPro.twpro_bag.twpro_priceWear + TWPro.twpro_bag.twpro_priceBag) + ' $</td></tr>';
		twpro_xhtml += '</table>';
		twpro_xhtml += '<hr><span style="text-align:right;font-weight:normal;float:right;">[&ne;]&nbsp;</span><span class="item_popup_requirement_text">'+TWPro.lang.QUANTITIES+'</span><hr>';
		twpro_xhtml += '<table width="100%">';
		var twpro_all = 0;
		var twpro_all_diff = 0;
		for (var twpro_type in item_type_title){
		  if (twpro_type != "yield"){
			twpro_xhtml += '<tr><td class="item_popup_trader_price">'+item_type_title[twpro_type]+':&nbsp;&nbsp;</td>';
			twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_countType[twpro_type] + '</td>';
			twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-weight:normal;">[' + TWPro.twpro_bag.twpro_countType_diff[twpro_type] + ']</td></tr>';
			twpro_all += TWPro.twpro_bag.twpro_countType[twpro_type];
			twpro_all_diff += TWPro.twpro_bag.twpro_countType_diff[twpro_type];
		  }
		}
		twpro_xhtml += '<tr><td></td><td><hr></td><td><hr></td></tr><tr><td class="item_popup_trader_price">'+TWPro.lang.OBJECTS+':&nbsp;&nbsp;<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + twpro_all + '<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-weight:normal;">[' + twpro_all_diff + ']<hr></td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.PRODUCTS+':&nbsp;&nbsp;<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_countType['yield'] + '<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-weight:normal;">[' + TWPro.twpro_bag.twpro_countType_diff['yield'] + ']<hr></td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.TOTAL+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + parseInt(twpro_all + TWPro.twpro_bag.twpro_countType['yield']) + '</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-weight:normal;">[' + parseInt(twpro_all_diff + TWPro.twpro_bag.twpro_countType_diff['yield']) + ']</td></tr>';
		twpro_xhtml += '</table>';
		twpro_xhtml += '</div>';
		return twpro_xhtml;
	}

	// wird beim draufklicken auf die Liste ausgefuehrt, stoesst Berechnungen an
	function twpro_clickList() {
		if (TWPro.twpro_failure) return;
		if (document.getElementById('twpro_wait').text != TWPro.lang.CALCJOB && document.getElementById('twpro_wait').text != TWPro.lang.CHOOSEJOB) {
			document.getElementById('twpro_wait').text = TWPro.lang.CALCJOB;
			window.setTimeout(TWPro.twpro_updateList, 0);
		}
	}
	function twpro_clickfilterList() {
		if (TWPro.twpro_failure) return;
		if (document.getElementById('twpro_wait').text == TWPro.lang.CHOOSEJOB) {
  //		document.getElementById('twpro_wait').text = TWPro.lang.LOADING;
		  var twpro_wait = document.getElementById('twpro_wait');
		  document.getElementById('twpro_jobList').style.backgroundColor = 'rgb(207, 195, 166)';
		  document.getElementById('twpro_jobList').innerHTML = '<option style="background-color: rgb(207, 195, 166);" id="twpro_wait" value="-1">'+twpro_wait.text+'</option>';
		  //twpro_clickList();
		  TWPro.twpro_insertListItems();
		}
	}

		function twpro_setInfo(centerWindowId) {
			var html = '<table class="shadow_table" style="width:100%;height:100%;">';
			html += '<tbody><tr>';
			html += '<td class="edge_shadow_top_left"></td>';
			html += '<td class="border_shadow_top"></td>';
			html += '<td class="edge_shadow_top_left"></td>';
			html += '</tr>';
			html += '<tr>';
			html += '<td class="border_shadow_left"></td>';
			html += '<td class="shadow_content">';
			html += '<div style="overflow:auto;height:400px;width:250px;">';
			for (var setName in TWPro.twpro_setBonus) {
				//if (setName == "fireworker_set") continue;
				var friendlyName = TWPro.set_names[setName];
				html += '<div class="item_popup twpro_setinfo_entry">';
				if (friendlyName.charAt(0) != "<") {
					html += '<a style="float:right;" href="javascript://Search inventory for items from this set" onclick="(function(){TWPro.twpro_show_set(\''+setName+'\')})()"><img title="' + TWPro.lang.SEARCHINVENTORY + ': ' + friendlyName + '" alt="Q" src="data:image/png;base64,'+twpro_searchButtonImg+'" width="16" height="16" style="border:1px solid black;"></a>';
				}
				html += '<span class="item_popup_title twpro_setinfo_name_clicker"';
				html += ' onclick="nextSibling.style.display=nextSibling.style.display?\'\':\'none\'">' + friendlyName + "</span>";
				html += '<div class="twpro_setinfo_set" style="display:none">';
				var items = TWPro.twpro_setBonus[setName], html2, html3;
				for (var i=0; i<items.length; i++) {
					if (!items[i]) continue;
					if (setName == "set_sleeper" && i==1) continue;
					html3 = '<span class="item_popup_requirement_text twpro_setinfo_xitems">' + TWPro.lang.WITHSETITEMS.replace('%1', i) + '</span>';
					var setInfo = items[i], anyinfo=0;
					if (setInfo.bonus) {
						if (setInfo.bonus.attributes) {
							html2 = '';
							for (var attr_name in setInfo.bonus.attributes) {
								if (setInfo.bonus.attributes[attr_name]) {
									if (setInfo.bonus.attributes[attr_name] > 0) {
										html2 += '+';
									}
									html2 += setInfo.bonus.attributes[attr_name] + ' ' + Character.attribute_titles[attr_name] + '<br>';
								}
							}
							if (html2) {
								html3 += '<span class="item_popup_bonus_attr">' + html2 + '</span>';
								anyinfo++;
							}
						}
						if (setInfo.bonus.skills) {
							html2 = '';
							for (var skill_name in setInfo.bonus.skills) {
								if (setInfo.bonus.skills[skill_name]) {
									if (setInfo.bonus.skills[skill_name] > 0) {
										html2 += '+';
									}
									html2 += setInfo.bonus.skills[skill_name] + ' ' + Character.skill_titles[skill_name] + '<br>';
								}
							}
							if (html2) {
								html3 += '<span class="item_popup_bonus_skill">' + html2 + '</span>';
								anyinfo++;
							}
						}
					}
					if (setInfo.jobBonus) {
						html2 = '';
						for (var job_name in setInfo.jobBonus) {
							if (setInfo.jobBonus[job_name]) {
								var job_title = job_name == 'all' ? TWPro.lang.LABORPOINTS : TWPro.job_titles[job_name];
								
								if (!job_title) {
									job_title = job_name;
								}
								if (setInfo.jobBonus[job_name] > 0) {
									html2 += '+';
								}
								html2 += setInfo.jobBonus[job_name] + ' ' + job_title + '<br>';
							}
						}
						if (html2) {
							html3 += '<span class="item_popup_bonus">' + html2 + '</span>';
							anyinfo++;
						}
					}
					if (setInfo.speedBonus) {
						html3 += '<span class="item_popup_bonus">+' + setInfo.speedBonus + '% ' + TWPro.lang.SPEED + '</span>';
						anyinfo++;
					}
					if (setName == "set_sleeper") {
						html3 += '<span class="item_popup_bonus">+' + Math.abs(Math.round(100-100*TWPro.twpro_sleeperBonus(i))) + '% '+TWPro.lang.PERCREGENERATION;
						if (i == 6) {
							html3 += '<br>+1 ' + TWPro.lang.PRAYING;
						}
						html3 += '</span>';
						anyinfo++;
					}
					if (setInfo.luckBonus) {
						html3 += '<span class="item_popup_bonus">+' + setInfo.luckBonus + '% '+TWPro.lang.LUCK+'</span>';
						anyinfo++;
					}
					if (anyinfo) {
						html += html3;
					}
				}
				html += '</div></div>';
			}
			html += '</div></td>';
			html += '<td class="border_shadow_left"></td>';
			html += '</tr>';
			html += '<tr>';
			html += '<td class="edge_shadow_bottom_left"></td>';
			html += '<td class="border_shadow_bottom"></td>';
			html += '<td class="edge_shadow_top_left"><img src="images/transparent.png" width="16px"></td>';
			html += '</tr>';
			html += '</tbody></table>';
			var wasPreviouslyOpened = document.getElementById("window_TWPro_setsInfo_Sets") ? true : false;
			AjaxWindow.show("TWPro_setsInfo", undefined, "Sets", html, {title:TWPro.lang.SETSINFO}, true);
			$E("#window_TWPro_setsInfo_Sets .window_refresh").href = "javascript:TWPro.twpro_setInfo('" + (centerWindowId||"") + "');";
			var window_TWPro_setsInfo_Sets = document.getElementById("window_TWPro_setsInfo_Sets");
			window_TWPro_setsInfo_Sets.style.width = "296px";
			if (window_TWPro_setsInfo_Sets.firstChild.className != "twpro_left_border") {
				window_TWPro_setsInfo_Sets.firstChild.style.backgroundPosition = "right center";
				var leftBorder = document.createElement("div");
				leftBorder.style.cssText = "background: url(../images/main/borders_window.png) repeat scroll 0 0 transparent;height:100%";
				leftBorder.className = "twpro_left_border";
				window_TWPro_setsInfo_Sets.insertBefore(leftBorder, window_TWPro_setsInfo_Sets.firstChild);
			}
			window_TWPro_setsInfo_Sets.getElementsByTagName("h2")[0].style.cssText = "width:285px;text-align:center; font-size:14px";
			document.getElementById("window_TWPro_setsInfo_Sets").firstChild.style.backgroundColor = "#C4B075";
			document.getElementById("window_TWPro_setsInfo_Sets_content").style.cssText = "width:272px;height:409px;";
			var centerWindow;
			if (centerWindowId && (centerWindow=document.getElementById(centerWindowId))) {
				window_TWPro_setsInfo_Sets.style.top = centerWindow.offsetTop + "px";
				var totalWidthRequired = centerWindow.offsetWidth + window_TWPro_setsInfo_Sets.offsetWidth,
					availWidth = document.body.offsetWidth;
				if (totalWidthRequired < availWidth * 1.1) {// ten percent treshold
					if (centerWindow.offsetLeft + totalWidthRequired > availWidth) {
						centerWindow.style.left = Math.max(0, availWidth - totalWidthRequired) / 2 + "px";
					}
					window_TWPro_setsInfo_Sets.style.left = centerWindow.offsetLeft + centerWindow.offsetWidth + "px";
				}
			}
		}
		function twpro_disableJobs(){
			var CustomJobList = {
				'construct': TWPro.lang.CONSTRUCTION,
				'duelshootingatt': TWPro.lang.DUELSHOOTINGATT,
				'duelshootingdef': TWPro.lang.DUELSHOOTINGDEF,
				'duelvigor': TWPro.lang.DUELVIGOR,
				'twpro_fortatt': TWPro.lang.FORTATTACK,
				'twpro_fortdef': TWPro.lang.FORTDEFEND,
				'speed': TWPro.lang.SPEED,
				'regeneration': TWPro.lang.REGENERATION
			};
			if(TWPro.settings_prefs['splitFortbattle']=='true'){
			  for(var i=0; i<TWPro.twpro_health_priority.length; i++){
				for(var j=0; j<TWPro.twpro_battle_unit.length; j++){
				   CustomJobList["twpro_fortatt_"+TWPro.twpro_health_priority[i]+"_"+TWPro.twpro_battle_unit[j]] = TWPro.lang.FORTATTACK+" "+i+"|"+j; 
				   CustomJobList["twpro_fortdef_"+TWPro.twpro_health_priority[i]+"_"+TWPro.twpro_battle_unit[j]] = TWPro.lang.FORTDEFEND+" "+i+"|"+j; 
				}
			  }
			}
			if(!TWPro.disabledJobs) TWPro.disabledJobs = {};
			var xhtmlShowHide = ['', ''],
			ShowHide = ['show_to_hide', 'hide_to_show'],
			jobs = [],
			xhtml = "    <div class=\"tab_container\" style=\"margin-left:7px;margin-top:6px; width:100%; height:400px\">"
			xhtml += "<ul class=\"tabs\"><li class=\"active\" id=\"twpro_settings.tab.1\" onclick=\"TWPro.showTab(this);\">" + TWPro.lang.PREFERENCES + "</li><li id=\"twpro_settings.tab.2\" onclick=\"TWPro.showTab(this);\">" + TWPro.lang.HIDEJOBS + "</li></ul>";
			TWPro.showTab = function showTab(obj) {
			  var showTab1 = obj.id == "twpro_settings.tab.1";
			  $("twpro_settings.tab.1.div").setStyle("display", showTab1 ? "block" : "none");
			  $("twpro_settings.tab.2.div").setStyle("display", showTab1 ? "none" : "block");
			  if (showTab1) {
				  $("twpro_settings.tab.1").addClass("active");
				  $("twpro_settings.tab.2").removeClass("active");
				  $E("#window_TWPro_settings_Jobs .window_refresh").href = "javascript:TWPro.twpro_disableJobs();TWPro.showTab($(\'twpro_settings.tab.1\'));"
			  } else {
				  $("twpro_settings.tab.1").removeClass("active");
				  $("twpro_settings.tab.2").addClass("active");
				  $E("#window_TWPro_settings_Jobs .window_refresh").href = "javascript:TWPro.twpro_disableJobs();TWPro.showTab($(\'twpro_settings.tab.2\'));"
			  }
			}
			xhtml += '<table class="shadow_table" style="width:100%;height:50%;">';
			xhtml += '<tbody><tr>';
			xhtml += '<td class="edge_shadow_top_left"></td>';
			xhtml += '<td class="border_shadow_top" width="85%"></td>';
			xhtml += '<td></td>';
			xhtml += '</tr>';
			xhtml += '<tr>';
			xhtml += '<td></td>';
//			xhtml += '<td class="shadow_content">';
			xhtml += '<td>';
			xhtml += '<div style="overflow:auto;height:355px;width:679px;">';
			xhtml += '<div id="twpro_settings.tab.2.div" style="display:none;">';
			xhtml += '<table id="twpro_settings_hidejob_table"><tbody>';
			xhtml += '<tr><td colSpan="4">' + TWPro.lang.HIDEJOBDESC + '</td></tr>';
			
			xhtml += '<tr><td colSpan="2">'+TWPro.lang.SHOWN;
			xhtml += '</td><td>'+TWPro.lang.HIDDEN+'</td>';
			xhtml += '<td><a href="javascript:/*Click here to open the Set info window*/TWPro.twpro_setInfo(\'window_TWPro_settings_Jobs\');">' + TWPro.lang.SETSINFO + '</a></td></tr>\n';

			if(TWPro.twpro_calculated != true){
				for(var jobi in JobList){
					job = JobList[jobi];
					jobs.push([job.shortName, job.name, 'west', jobi]);
				}
				for(var job in CustomJobList){
					jobs.push([job, CustomJobList[job], 'cust']);
				}
				jobs.sort(function(x,y){return x[1].localeCompare(y[1])});
			}
			else{
				for(var jobi in JobList){
					job = JobList[jobi];
					if(TWPro.disabledJobs[job.shortName]) jobs.push([job.shortName, job.name, 'west', jobi]);
				}
				for(var job in CustomJobList){
					if(TWPro.disabledJobs[job]) jobs.push([job, CustomJobList[job], 'cust']);
				}
				jobs.sort(function(x,y){return x[1].localeCompare(y[1])});

				for(var i=0; i<TWPro.twpro_jobs.length; i++){
					if(typeof TWPro.twpro_jobs[i].west_id != 'undefined'){
						jobs.push([TWPro.twpro_jobs[i].shortName, TWPro.twpro_jobs[i].name, 'west', TWPro.twpro_jobs[i].west_id]);
					}
					else if(TWPro.twpro_jobs[i].shortName.substr(0,3) != 'cj_'){
						jobs.push([TWPro.twpro_jobs[i].shortName, TWPro.twpro_jobs[i].name, 'cust']);
					}
				}
			}
			
			for(var i=0;i<jobs.length;i++){
				job = jobs[i];
				var diff=-1;
				xhtmlShowHide[!!TWPro.disabledJobs[job[0]]*1] += '<option ondblclick="javascript:void TWPro.twpro_moveJobSetting(\''+ShowHide[!!TWPro.disabledJobs[job[0]]*1]+'\');" value="'+job[0]+'"'+(job[2]=='west' && ((diff=(eval(JobList[job[3]].formular.replace(/skills\./g, 'Character.skills.'))-JobList[job[3]].malus-1))>=0)?' style="background-color: '+(diff>=100?'rgb(139, 218, 87)':'rgb(178, 217, 152)')+'" title="<b>'+TWPro.lang.NOEQUIP+':</b> <span style=\'color:rgb(17, 96, 21);font-weight:bold\'>'+diff+' '+TWPro.lang.LABORP+'</span>"':(job[2]=='west' && TWPro.twpro_calculated == true && JobList[job[3]].twpro_aps<=0?' style="background-color: '+(JobList[job[3]].twpro_aps<=-99?'rgb(232, 125, 86)':'rgb(232, 176, 156)')+'" title="<b>'+TWPro.lang.BESTEQUIP+':</b> <span style=\'color:rgb(139, 34, 9);font-weight:bold\'>'+(JobList[job[3]].twpro_aps-1)+' '+TWPro.lang.LABORP+'</span>"':(job[2]=='west'?' title="<b>'+TWPro.lang.NOEQUIP+':</b> '+diff+' '+TWPro.lang.LABORP+(TWPro.twpro_calculated == true?'<br><b>'+TWPro.lang.BESTEQUIP+':</b> '+(isNaN(JobList[job[3]].twpro_aps-1)?'?':(JobList[job[3]].twpro_aps-1))+' '+TWPro.lang.LABORP:'')+'"':'')))+'>'+(job[0].match(/twpro_fortatt_/) || job[0].match(/twpro_fortdef_/)?((unescape(job[1]).length > 25) ? ' \u25B7'+(unescape(job[1].substr(0, 21)) + '...'+TWPro.lang.FBTAGS[0][job[1].charAt(job[1].length-3)]+"|"+TWPro.lang.FBTAGS[1][job[1].charAt(job[1].length-1)]) : ' \u25B7'+unescape(job[1].substr(0, job[1].length-3)+TWPro.lang.FBTAGS[0][job[1].charAt(job[1].length-3)]+"|"+TWPro.lang.FBTAGS[1][job[1].charAt(job[1].length-1)])):job[1])+'</option>\n';
			}
			xhtml += '<tr id="twpro_settings_jobs_main"><td><select id="twpro_settings_jobs_shown" multiple="multiple" size="13" style="width:200px;background-color: rgb(219, 209, 186);">';
			xhtml += xhtmlShowHide[0];
			xhtml += '</select></td><td><div style="width:46px">';
			xhtml += '<a href="javascript:void TWPro.twpro_moveJobSetting(\'show_to_hide\');" class="button_wrap button"><span class="button_left"></span><span class="button_middle">&gt;&gt;</span><span class="button_right"></span><span style="clear: both;"></span></a>';
			xhtml += '<br /><a href="javascript:void TWPro.twpro_moveJobSetting(\'hide_to_show\');" class="button_wrap button"><span class="button_left"></span><span class="button_middle">&lt;&lt;</span><span class="button_right"></span><span style="clear: both;"></span></a>';
//			xhtml += '<br /><input id="twpro_jobsort_filter" type="checkbox"' + (TWPro.twpro_preference('Hide_unjobs')?' checked="checked"':'') + ' title="'+TWPro.lang.FILTERJOBS+'" />';
			xhtml += '</div></td><td><select id="twpro_settings_jobs_hidden" multiple="multiple" size="13" style="width:200px;background-color: rgb(219, 209, 186);">';
			xhtml += xhtmlShowHide[1];
			xhtml += '</select></td>';
			xhtml += '<td><div style="height:220px;overflow-y:auto;width:200px;"><p style="font-size:10.5px;">';
			xhtml += TWPro.lang.SETSETTINGS + '</p>';
			for (var internal_name in TWPro.set_names) {
				if(internal_name == "fireworker_set" || internal_name == "tw_times_set") continue;
				var isValidSet = TWPro.twpro_validSet(internal_name);
				xhtml += '<label id="twpro_settings_setlabel_' + internal_name + '" title="';
				if (!isValidSet) {
					xhtml += TWPro.lang.CANNOTWEAR;
					xhtml += '" style="text-decoration:line-through'
				}
				xhtml += '"><input type="checkbox" id="twpro_settings_enabled_'+internal_name+'"'+(isValidSet&&TWPro.prefs['disabledSets'].indexOf('|'+internal_name+'|')==-1?' checked="checked"':'')+'"'+(isValidSet?'':' disabled="disabled"')+' />' + TWPro.set_names[internal_name]+'</label> <span title="'+TWPro.lang.USEFULITEM+'">('+TWPro.twpro_setItemsCount[internal_name]+')</span><br />';
			}
			xhtml += '</div></td><td></td></tr>';
			xhtml += '<tr><td colSpan="5">';
			xhtml += '<div id="twpro_settings_customJob">';
			xhtml += '<span style="position:relative"><div style="position:absolute;bottom:20px;left:330px;width:330px;display:none;background-image:url(\'../images/border/table/bright.png\');" id="twpro_settings_calc_helper">';
			var lines = 0;
			for(var skill_name in TWPro.skill_to_AttNum){
				if(lines && lines%5==0) xhtml += '<br style="clear:both;" />';
				if(lines++%5==0) xhtml += '<a href="javascript:void TWPro.twpro_customJobs(\'editCalculation\',\''+TWPro.skill_to_AttNum[skill_name][0]+'\');"><div class="skill_box skill_circle_'+TWPro.skill_to_AttNum[skill_name][0]+'" title="'+Character.attribute_titles[TWPro.skill_to_AttNum[skill_name][0]]+'" style="margin:0px;cursor:pointer;"></div></a>';
				xhtml += '<a href="javascript:void TWPro.twpro_customJobs(\'editCalculation\',\''+skill_name+'\');"><div class="skill_box skill_'+TWPro.skill_to_AttNum[skill_name][0]+' img'+TWPro.skill_to_AttNum[skill_name][1]+'" title="'+Character.skill_titles[skill_name]+'" style="margin:0px;cursor:pointer;"></div></a>';
			}
			xhtml += '</div></span>';
			xhtml += '<button onfocus="TWPro.twpro_customJobs(\'calcBlurNow\');" onclick="TWPro.twpro_customJobs(\'new\')" title="'+TWPro.lang.NEW+'">+</button>&nbsp;'
			xhtml += '<select onfocus="TWPro.twpro_customJobs(\'calcBlurNow\');TWPro.twpro_customJobs(\'switchFocus\')" style="width: 190px;background-color: rgb(207, 195, 166);" onchange="TWPro.twpro_customJobs(\'switch\')"><option>...</option></select>';
			xhtml += '<input type="hidden" title="{shortname}" maxlength="20" />';
			xhtml += '<input onfocus="TWPro.twpro_customJobs(\'calcBlurNow\');" type="text" title="'+TWPro.lang.CUSTOMNAME+'" style="width: 100px;" onblur="TWPro.twpro_customJobs(\'blur\', [3, this.value, this])" />';
			xhtml += '<input type="text" title="'+TWPro.lang.CUSTOMCALCULATION+'" style="width: 300px;" onblur="TWPro.twpro_customJobs(\'calcBlur\')" onfocus="TWPro.twpro_customJobs(\'calcFocus\')" />';
			xhtml += '<input onfocus="TWPro.twpro_customJobs(\'calcBlurNow\');" type="checkbox" title="'+TWPro.lang.CUSTOMENABLED+'" checked="checked" onblur="TWPro.twpro_customJobs(\'blur\', [1, this.checked*1, this])" />';
			xhtml += '</div><div style="margin-top:5px;">';
			//xhtml += '<input type="checkbox" id="twpro_settings_persist" checked="checked" title="'+TWPro.lang.PERSISTSETTINGS+'" />';
			xhtml += '<a href="javascript:void TWPro.twpro_confirmHideJobs();" class="button_wrap button"><span class="button_left"></span><span class="button_middle">'+TWPro.lang.CONFIRM+'</span><span class="button_right"></span><span style="clear: both;"></span></a></div><span style="position:absolute;bottom:11px;right:13px;font-size:10.5px;">Powered by <a href="http://twpro.lekensteyn.nl/" target="_blank">Lekensteyn</a></span></td></tr>';
			xhtml += '</tbody></table></div>';
			
			xhtml += '<div id="twpro_settings.tab.1.div" style="display:block;">';
			xhtml += '<table width="100%" id="twpro_settings_prefs"><tbody>';
			xhtml += '<tr><td colspan="2" width="40%"><b>' + TWPro.lang.FORTATTACK + ': </b></td><td>|</td>';
			xhtml += '<td colspan="2" rowspan="6" width="60%">';
			xhtml += '<table width="100%" border="0" cellpadding="0" cellspacing="0">';
			xhtml += '<tr><td><input id="splitFortbattle" type="checkbox"' + (TWPro.settings_prefs['splitFortbattle']=='true'?' checked="checked"':'') + '/></td><td colspan="2"><b>'+TWPro.lang.FBCOMBOGENERATE+'</b><div style="margin-left:10px;font-size:10.5px;">'+TWPro.lang.FBCOMBODESC+' "<a href="javascript:TWPro.showTab($(\'twpro_settings.tab.2\'));">' + TWPro.lang.HIDEJOBS + '</a>".</div></td></tr>';
			xhtml += '<tr><td>&nbsp;</td><td><input type="radio" name="splitFortbattle_subMenu_radio" id="splitFortbattle_subMenu_normal"' + ((TWPro.settings_prefs['splitFortbattle_subMenu']=='false' || !TWPro.settings_prefs['splitFortbattle_subMenu'])?' checked':'') + '></td><td width="100%"><b>'+TWPro.lang.NORMALMODE+':</b>&nbsp;<span style="font-size:10.5px;">'+TWPro.lang.FBCOMBONORMALDESC+'</span></td></tr>';
			xhtml += '<tr><td>&nbsp;</td><td><input type="radio" name="splitFortbattle_subMenu_radio"' + (TWPro.settings_prefs['splitFortbattle_subMenu']=='true'?' checked':'') + '></td><td width="100%"><b>'+TWPro.lang.FBCOMBOSUBMENUS+':</b>&nbsp;<span style="font-size:10.5px;">'+TWPro.lang.FBCOMBOSUBMENUSDESC+'<span style="cursor:help;" title="'+TWPro.lang.FBCOMBOHELPDESC+'<br><span style=\'font-size:10.5px;\'>'+TWPro.lang.FBCOMBOMOZTIP+'</span>">&nbsp;<b>['+TWPro.lang.HELP+']</b></span></span></td></tr>';
			xhtml += '<tr><td colspan="3" align="center"><a style="margin-top:8px;" href="javascript:TWPro.twpro_splitFortbattle_prefs();" class="button_wrap button"><span class="button_left"></span><span class="button_middle">'+TWPro.lang.CONFIRM+'</span><span class="button_right"></span><span style="clear: both;"></span></a></td></tr>';
			xhtml += '</table></td></tr>';
			xhtml += '<tr><td style="font-size: 11px;vertical-align:middle;">' + TWPro.lang.FBHEALTHPRIORITY + ': </td><td><select size="1" onchange="TWPro.twpro_handleBattle_prefs(this,\'healthPriority_att\');TWPro.twpro_confirmHideJobs(\'twpro_fortatt\');" style="background-color: rgb(207, 195, 166); font-size: 10px; width:130px;">';
			for(var i=0;i<TWPro.twpro_health_priority.length;i++){
			  xhtml += '<option value="'+TWPro.twpro_health_priority[i]+'" style="background-color: rgb(207, 195, 166);"';
			  if(TWPro.twpro_health_priority[i] == TWPro.battle_prefs['healthPriority_att']){
				xhtml += ' selected';
			  }

			  xhtml += '>'+TWPro.lang.FBTAGS[0][i]+"| "+TWPro.lang['FBHEALTHPRIORITY'+TWPro.twpro_health_priority[i].toUpperCase()]+'</option>';
			}
  			xhtml += '</select></td><td>|</td></tr>';
			xhtml += '<tr><td style="font-size: 11px;vertical-align:middle;">' + TWPro.lang.FBBATTLEUNIT + ': </td><td><select size="1" onchange="TWPro.twpro_handleBattle_prefs(this,\'battleUnit_att\');TWPro.twpro_confirmHideJobs(\'twpro_fortatt\');" style="background-color: rgb(207, 195, 166); font-size: 10px; width:130px;">';
			for(var i=0;i<TWPro.twpro_battle_unit.length;i++){
			  xhtml += '<option value="'+TWPro.twpro_battle_unit[i]+'" style="background-color: rgb(207, 195, 166);"';
			  if(TWPro.twpro_battle_unit[i] == TWPro.battle_prefs['battleUnit_att']){
				xhtml += ' selected';
			  }
			  xhtml += '>'+TWPro.lang.FBTAGS[1][i]+"| "+TWPro.lang['FBBATTLEUNIT'+TWPro.twpro_battle_unit[i].toUpperCase()]+'</option>';
			}
  			xhtml += '</select></td><td>|</td></tr>';
			xhtml += '<tr><td colspan="2"><b>' + TWPro.lang.FORTDEFEND + ': </b></td><td>|</td></tr>';
			xhtml += '<tr><td style="font-size: 11px;vertical-align:middle;">' + TWPro.lang.FBHEALTHPRIORITY + ': </td><td><select size="1" onchange="TWPro.twpro_handleBattle_prefs(this,\'healthPriority_def\');TWPro.twpro_confirmHideJobs(\'twpro_fortdef\');" style="background-color: rgb(207, 195, 166); font-size: 10px; width:130px;">';
			for(var i=0;i<TWPro.twpro_health_priority.length;i++){
			  xhtml += '<option value="'+TWPro.twpro_health_priority[i]+'" style="background-color: rgb(207, 195, 166);"';
			  if(TWPro.twpro_health_priority[i] == TWPro.battle_prefs['healthPriority_def']){
				xhtml += ' selected';
			  }
			  xhtml += '>'+TWPro.lang.FBTAGS[0][i]+"| "+TWPro.lang['FBHEALTHPRIORITY'+TWPro.twpro_health_priority[i].toUpperCase()]+'</option>';
			}
  			xhtml += '</select></td><td>|</td></tr>';
			xhtml += '<tr><td style="font-size: 11px;vertical-align:middle;">' + TWPro.lang.FBBATTLEUNIT + ': </td><td><select size="1" onchange="TWPro.twpro_handleBattle_prefs(this,\'battleUnit_def\');TWPro.twpro_confirmHideJobs(\'twpro_fortdef\');" style="background-color: rgb(207, 195, 166); font-size: 10px; width:130px;">';
			for(var i=0;i<TWPro.twpro_battle_unit.length;i++){
			  xhtml += '<option value="'+TWPro.twpro_battle_unit[i]+'" style="background-color: rgb(207, 195, 166);"';
			  if(TWPro.twpro_battle_unit[i] == TWPro.battle_prefs['battleUnit_def']){
				xhtml += ' selected';
			  }
			  xhtml += '>'+TWPro.lang.FBTAGS[1][i]+"| "+TWPro.lang['FBBATTLEUNIT'+TWPro.twpro_battle_unit[i].toUpperCase()]+'</option>';
			}
  			xhtml += '</select></td><td>|</td></tr>';
			xhtml += '<tr><td colspan="5"><hr></td></tr><tr><td colspan="5">';
 			xhtml += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
 			xhtml += '<tr><td width="50%"><b>' + TWPro.lang.DEFAULTSORTING + ': </b>&nbsp;<select size="1" onchange="TWPro.twpro_handleSettings_prefs(\'defaultSorting\',this.options[this.selectedIndex].value);" style="background-color: rgb(207, 195, 166); font-size: 10px; width:130px;">';
			for(var i=0;i<TWPro.twpro_sorts.length;i++){
			  xhtml += '<option value="'+TWPro.twpro_sorts[i]+'" style="background-color: rgb(207, 195, 166);"';
			  if(TWPro.twpro_sorts[i] == TWPro.settings_prefs['defaultSorting']){
				xhtml += ' selected';
			  }
			  xhtml += '>'+TWPro.lang['SORTBY'+TWPro.twpro_sorts[i].toUpperCase()]+'</option>';
			}
 			xhtml += '</select></td><td rowspan="5"><img src="images/transparent.png" width="5px"><td rowspan="5" class="border_shadow_left"><img src="images/transparent.png" width="1px"></td><td rowspan="5"><img src="images/transparent.png" width="5px"></td><td>&nbsp;&nbsp;&nbsp;</td><td width="50%"><b>' + TWPro.lang.SHOWALLJOBS + ': </b>&nbsp;<input type="checkbox" style="vertical-align:bottom"' + (TWPro.settings_prefs['showAllJobs']=='true'?' checked="checked"':'') + ' onclick="TWPro.twpro_handleSettings_prefs(\'showAllJobs\',String(this.checked));" title="'+TWPro.lang.SHOWALLJOBSDESC+'"/></td></tr>';
  			xhtml += '<tr><td><hr></td><td colspan="2"><hr></td></tr>';
			xhtml += '<tr><td width="50%"><b>' + TWPro.lang.USEFULITEMSPOPUP + ':</b>&nbsp;<input type="checkbox" style="vertical-align:bottom"' + (TWPro.settings_prefs['usefulItemsPopup']=='true'?' checked="checked"':'') + ' onclick="TWPro.twpro_handleSettings_prefs(\'usefulItemsPopup\',String(this.checked));" title="'+TWPro.lang.USEFULITEMSPOPUPDESC+'"/></td><td>&nbsp;&nbsp;&nbsp;</td><td width="50%"><b>' + TWPro.lang.COLLECTORMODE + ': </b>&nbsp;<input type="checkbox" style="vertical-align:bottom"' + (TWPro.settings_prefs['collectorMode']=='true'?' checked="checked"':'') + ' onclick="TWPro.twpro_handleSettings_prefs(\'collectorMode\',String(this.checked));" title="'+TWPro.lang.COLLECTORMODEDESC+'"/></td></tr>';
  			xhtml += '<tr><td><hr></td><td colspan="2"><hr></td></tr>';
			xhtml += '<tr><td width="50%"><b>' + TWPro.lang.SAFEMODE + ':</b>&nbsp;<input type="checkbox" style="vertical-align:bottom"' + (TWPro.settings_prefs['safeMode']=='true'?' checked="checked"':'') + ' onclick="TWPro.twpro_handleSettings_prefs(\'safeMode\',String(this.checked));" title="'+TWPro.lang.SAFEMODEDESC+'<br>'+TWPro.lang.CACHEEMPTYSLOWDESC+'"/>&nbsp;&nbsp;&nbsp;(<input type="checkbox" style="vertical-align:bottom"' + (TWPro.settings_prefs['safeMode_FBexcl']=='true'?' checked="checked"':'') + ' onclick="TWPro.twpro_handleSettings_prefs(\'safeMode_FBexcl\',String(this.checked));" title="'+TWPro.lang.SAFEMODEFBEXCL+'"/>)</td><td>&nbsp;&nbsp;&nbsp;</td><td width="50%">&nbsp;</td></tr>';
 			xhtml += '</table></td></tr>';
 			xhtml += '<tr><td colspan="5"><hr></td></tr>';
			xhtml += '<tr><td colspan="5"><table width="100%" border="0" cellspacing="0" cellpadding="0">';
			xhtml += '<tr><td rowspan="2"><b>'+TWPro.lang.CACHEENABLE+':</b></td><td><input id="change_cache_mode" type="checkbox"' + (TWPro.settings_prefs['useCache']=='true'?' checked="checked"':'') + ' onclick="TWPro.twpro_handleSettings_prefs(\'useCache\',String(this.checked));TWPro.twpro_change_cache_mode(this.checked);"/></td><td><input type="radio" name="cacheMethod_radio" id="cacheMethod_indexedDB"' + ((TWPro.settings_prefs['cacheMethod']=='IndexedDB' || !TWPro.settings_prefs['cacheMethod'])?' checked':'') + ' onclick="TWPro.twpro_change_cache_method();"'+(TWPro.settings_prefs['useCache']=='false' || !TWPro.settings_prefs['useCache'] || TWPro.indexedDB_notsupported==true?' disabled':'')+'></td><td>IndexedDB</td><td style="font-size:10.5px;">'+TWPro.lang.CACHEINDEXEDDBDESC+' [<a href="http://caniuse.com/#search=indexeddb" target="_blank">'+TWPro.lang.CACHECOMPATIBILITY+'</a>]</td><td><div style="font-size:11px;"><span id="empty_cache_indexeddb"><a href="javascript:TWPro.twpro_empty_cache_indexeddb();" title="<b>'+TWPro.lang.CACHEEMPTY+'</b><br>'+TWPro.lang.CACHEEMPTYDESC+'"><img style="background:url(\/images\/quest\/overview\/highlights\/mini.png) no-repeat 0 -40px;" src="images\/transparent.png" width="20" height="20"></a></span><span id="empty_cache_progress_indexeddb"></span><span id="empty_cache_target_indexeddb"></span></div></td></tr>';
			xhtml += '<tr><td>&nbsp;</td><td><input type="radio" name="cacheMethod_radio" id="cacheMethod_WebStorage"' + ((TWPro.settings_prefs['cacheMethod']=='WebStorage')?' checked':'') + ' onclick="TWPro.twpro_change_cache_method();"'+(TWPro.settings_prefs['useCache']=='false' || !TWPro.settings_prefs['useCache']?' disabled':'')+'></td><td>WebStorage&nbsp;</td><td style="font-size:10.5px;">'+TWPro.lang.CACHEWEBSTORAGEDESC+' [<a href="http://caniuse.com/#search=webstorage" target="_blank">'+TWPro.lang.CACHECOMPATIBILITY+'</a>] [<a href="http://dev-test.nemikor.com/web-storage/support-test/" target="_blank" title="'+TWPro.lang.CACHEQUOTASDESC+'">'+TWPro.lang.CACHEQUOTAS+'</a>]</td><td><div style="font-size:11px;"><span id="empty_cache_webstorage"><a href="javascript:TWPro.twpro_empty_cache_webstorage();" title="<b>'+TWPro.lang.CACHEEMPTY+'</b><br>'+TWPro.lang.CACHEEMPTYDESC+'"><img style="background:url(\/images\/quest\/overview\/highlights\/mini.png) no-repeat 0 -40px;" src="images\/transparent.png" width="20" height="20"></a></span><span id="empty_cache_progress_webstorage"></span><span id="empty_cache_target_webstorage"></span></div></td></tr>';
			xhtml += '</table></tr>';
			xhtml += '<tr><td colspan="5"><hr></td></tr>';

			TWPro.twpro_handleBattle_prefs = function twpro_handleBattle_prefs(field, type){
				var val = field.options[field.selectedIndex].value;
				TWPro.battle_prefs[type] = val;
				var battle_prefs = [];
				for(var i in TWPro.battle_prefs){
					battle_prefs.push(TWPro.battle_prefs[i]);
				}
				TWPro.twpro_preference('battle_prefs', battle_prefs.join(':'));
			}		

			TWPro.twpro_splitFortbattle_prefs = function twpro_splitFortbattle_prefs(){
				if($("splitFortbattle_subMenu_normal").checked==true){
					TWPro.twpro_handleSettings_prefs('splitFortbattle_subMenu','false');
				}
				else{
					TWPro.twpro_handleSettings_prefs('splitFortbattle_subMenu','true');
				}
				if($("splitFortbattle").checked==true && TWPro.settings_prefs['splitFortbattle']!='true'){
					//alert("generate");
					TWPro.twpro_confirmHideJobs(null, 'splitFortbattle');
					TWPro.twpro_disableJobs();
				}	
				else if($("splitFortbattle").checked==false && TWPro.settings_prefs['splitFortbattle']=='true'){
					//alert("remove");
					TWPro.twpro_confirmHideJobs(null, 'splitFortbattle');
					TWPro.twpro_disableJobs();
				}
				else{
					TWPro.twpro_sortList(TWPro.twpro_jobsort);
					new HumanMessage(TWPro.lang.SETTINGSSAVED, {type:'success'});
				}
			}

			function force_normal_mode() {
				TWPro.twpro_calculated = false;
				TWPro.twpro_jobsCalculated = {};
				TWPro.twpro_jobs = [];
				TWPro.twpro_invHash = '';
				twproCache.setValue("TWPro.twpro_invHash", '');
				TWPro.twpro_itemStorage = {};
				TWPro.twpro_setBonusParsed = false;
				TWPro.twpro_setItems = {};
				for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
					TWPro.twpro_bag.twpro_countType[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
					TWPro.twpro_bag.twpro_countType_diff[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
				}
				TWPro.twpro_wear_items_list = '';
				TWPro.twpro_setItemsCount = {};
				for (var twpro_set in TWPro.twpro_setBonus) {
					TWPro.twpro_setItemsCount[twpro_set] = 0;
				}
				TWPro.twpro_invHashTest = [];
				TWPro.twpro_initializeItems('wear', null);
				TWPro.twpro_initializeItems('bag', null);
				TWPro.updateCache=false;
				if(document.getElementById('twpro_jobList')){
				  document.getElementById('twpro_jobList').style.backgroundColor = 'rgb(207, 195, 166)';
				  document.getElementById('twpro_jobList').innerHTML = '<option style="background-color: rgb(207, 195, 166);" id="twpro_wait" value="-1">'+TWPro.lang.NORMALMODE+'...</option>';
				  document.getElementById('twpro_jobList').click="TWPro.twpro_clickList();";
				  TWPro.twpro_cache_status();
				}
			}

			function force_cache_mode(){
				TWPro.cacheMethod = TWPro.settings_prefs['cacheMethod'];
				TWPro.twpro_calculated = false;
				TWPro.twpro_jobsCalculated = {};
				TWPro.twpro_jobs = [];
				TWPro.twpro_invHash = '';
				TWPro.twpro_itemStorage = {};
				TWPro.twpro_setBonusParsed = false;
				TWPro.twpro_setItems = {};
				for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
					TWPro.twpro_bag.twpro_countType[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
					TWPro.twpro_bag.twpro_countType_diff[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
				}
				TWPro.twpro_wear_items_list = '';
				TWPro.twpro_setItemsCount = {};
				for (var twpro_set in TWPro.twpro_setBonus) {
					TWPro.twpro_setItemsCount[twpro_set] = 0;
				}
				TWPro.twpro_invHashTest = [];
				TWPro.twpro_initializeItems('wear', null);
				TWPro.twpro_initializeItems('bag', null);
				TWPro.updateCache=true;
				if(document.getElementById('twpro_jobList')){
				  document.getElementById('twpro_jobList').style.backgroundColor = 'rgb(207, 195, 166)';
				  document.getElementById('twpro_jobList').innerHTML = '<option style="background-color: rgb(207, 195, 166);" id="twpro_wait" value="-1">'+TWPro.lang.CACHEGENERATE+'</option>';
				  document.getElementById('twpro_jobList').click="TWPro.twpro_clickList();";
				  TWPro.twpro_cache_status();
				}
			}

			TWPro.twpro_change_cache_mode = function twpro_change_cache_mode(checked){
				if(!TWPro.settings_prefs['cacheMethod']){
					TWPro.twpro_change_cache_method();	
					return;
				}
				if(checked==true){
					twproCache.initialize(Character.playerId);
					if(!TWPro.indexedDB_notsupported) $("cacheMethod_indexedDB").disabled=false;
					$("cacheMethod_WebStorage").disabled=false;
					if($("cacheMethod_indexedDB").checked==true){
						twproCache_idb.initialize(Character.playerId, function (data) {
							if(data!=true){
							  TWPro.twpro_handleSettings_prefs('cacheMethod','WebStorage');
							  $("cacheMethod_WebStorage").checked=true;
							  $("cacheMethod_indexedDB").disabled=true;
							  TWPro.indexedDB_notsupported = true;
							  alert(TWPro.lang.CACHEINDEXEDDBNOT);
							}
						});
					}
					force_cache_mode();
				}	
				else{
					$("cacheMethod_indexedDB").disabled=true;
					$("cacheMethod_WebStorage").disabled=true;
					force_normal_mode();
				}
			}

			TWPro.twpro_change_cache_method = function twpro_change_cache_method(checked){
				twproCache.setValue("TWPro.twpro_invHash", '');
				if($("cacheMethod_indexedDB").checked==true){
					TWPro.twpro_handleSettings_prefs('cacheMethod','IndexedDB');
				}
				else{
					TWPro.twpro_handleSettings_prefs('cacheMethod','WebStorage');
				}
				TWPro.twpro_change_cache_mode($("change_cache_mode").checked);
			}

			TWPro.twpro_empty_cache_indexeddb = function twpro_empty_cache_indexeddb() {
				var i=0;
				if(!twproCache_idb.twproStorage){
					twproCache_idb.initialize(Character.playerId, function (data) {
						if(data==true){
						  twpro_empty_cache_indexeddb_get();
						}
					});
				}
				else{
					twpro_empty_cache_indexeddb_get();
				}
				function twpro_empty_cache_indexeddb_get(){
					twproCache_idb.getValue("TWPro.bigCache", function (data) {
						if(data){
						  i++;	
						  twpro_empty_cache_indexeddb_next();
						}
						else{
						  twpro_empty_cache_indexeddb_next();
						}
					});
				}
				function twpro_empty_cache_indexeddb_next(){
					if($("cacheMethod_indexedDB").checked==true && twproCache.getValue("TWPro.twpro_invHash")){
					  i++;	
					}
					if($("cacheMethod_indexedDB").checked==true && twproCache.getValue("twpro_specialJobs_skills")){
					  i++;	
					}
					showMessage("<center>"+TWPro.lang.CACHEEMPTYNOW+"<br>("+i+" "+TWPro.lang.CACHERECORDS+")</center>", "IndexedDB", 300, 100, [["ok", function () {if(TWPro.settings_prefs['cacheMethod']=='IndexedDB'){TWPro.twpro_emptying_cache=true;force_normal_mode();}$("empty_cache_indexeddb").style.display='none';empty_cache();}], ["cancel"]], true);
		
					function empty_cache() {
						$("empty_cache_progress_indexeddb").innerHTML = " 0";
						$("empty_cache_target_indexeddb").innerHTML = "/100%";
						if($("cacheMethod_indexedDB").checked==true){
						  twproCache.delValue("TWPro.twpro_invHash");
						  twproCache.delValue("twpro_specialJobs_skills");
						}
						twproCache_idb.delValue("TWPro.bigCache", function () {
						  //alert("deleted");
						});
						if($("empty_cache_progress_indexeddb")) $("empty_cache_progress_indexeddb").innerHTML = " 100";
						if(TWPro.settings_prefs['cacheMethod']=='IndexedDB'){
							TWPro.twpro_emptying_cache=false;
							force_cache_mode();
						}
						new HumanMessage(TWPro.lang.CACHEEMPTIED+"<br>"+i+" "+TWPro.lang.CACHERECORDSDELETED, {type:'success'});
					}
				}
			}
			
			TWPro.twpro_empty_cache_webstorage = function twpro_empty_cache_webstorage() {
				var records_to_delete = [];
				for (i=0; i < localStorage.length; i++) {
					var itemKey = localStorage.key(i);
					if(itemKey.indexOf("twproCache."+Character.playerId+".")!=-1 && !(TWPro.prefs['cacheMethod']=='IndexedDB' && (itemKey.indexOf("twproCache."+Character.playerId+".TWPro.twpro_invHash")!=-1 || itemKey.indexOf("twproCache."+Character.playerId+".twpro_specialJobs_skills")!=-1))){
						records_to_delete.push(itemKey);
					}
				}
				showMessage("<center>"+TWPro.lang.CACHEEMPTYNOW+"<br>("+records_to_delete.length+" "+TWPro.lang.CACHERECORDS+")<br><br><input type='radio' name='empty_mode' id='slow_mode' title='"+TWPro.lang.CACHEEMPTYSLOWDESC+"' checked>"+TWPro.lang.NORMALMODE+"<input type='radio' name='empty_mode' id='fast_mode' title='"+TWPro.lang.CACHEEMPTYFASTDESC+"'>"+TWPro.lang.CACHEFASTMODE+"</center>", "WebStorage", 300, 100, [["ok", function () {if(typeof twpro_storage_error != 'undefined')twpro_storage_error=undefined;if(TWPro.settings_prefs['cacheMethod']=='WebStorage'){TWPro.twpro_emptying_cache=true;force_normal_mode();}$("empty_cache_webstorage").style.display='none';if($('fast_mode').checked){empty_cache_fast();}else{empty_cache_slow();};}], ["cancel", function(){if(typeof twpro_storage_error != 'undefined')twpro_storage_error=undefined;}]], false);
				
				function empty_cache_fast() {
					$("empty_cache_progress_webstorage").innerHTML = " 0";
					$("empty_cache_target_webstorage").innerHTML = "/100%";
					for (i=0; i < records_to_delete.length; i++) {
						localStorage.removeItem(records_to_delete[i]);
					}
					if($("empty_cache_progress_webstorage")) $("empty_cache_progress_webstorage").innerHTML = " 100";
					if(TWPro.settings_prefs['cacheMethod']=='WebStorage'){
						TWPro.twpro_emptying_cache=false;
						force_cache_mode();
					}
					new HumanMessage(TWPro.lang.CACHEEMPTIED+"<br>"+i+" "+TWPro.lang.CACHERECORDSDELETED, {type:'success'});
				}

				function empty_cache_slow() {
					$("empty_cache_progress_webstorage").innerHTML = " 0";
					$("empty_cache_target_webstorage").innerHTML = "/100%";
					var i=0;
					dodelete(i);
					function dodelete(i) {
						if(records_to_delete.length>0){
							localStorage.removeItem(records_to_delete[i]);
							i++;
						}
						if($("empty_cache_progress_webstorage")) $("empty_cache_progress_webstorage").innerHTML = ' '+Math.round((records_to_delete.length>0?i:1)*100/(records_to_delete.length>0?records_to_delete.length:1));
						if (i<records_to_delete.length) {
							//setTimeout(function(){dodelete(i)}, 0);
							setZeroTimeout(function(){dodelete(i)});
						}
						else{
							if(TWPro.settings_prefs['cacheMethod']=='WebStorage'){
								TWPro.twpro_emptying_cache=false;
								force_cache_mode();
							}
							new HumanMessage(TWPro.lang.CACHEEMPTIED+"<br>"+i+" "+TWPro.lang.CACHERECORDSDELETED, {type:'success'});
						}
					}
				}
			}

			xhtml += '<span style="position:absolute;bottom:11px;right:13px;font-size:10.5px;">Powered by <a href="http://userscripts.org/scripts/show/92'+'414" target="_blank">Zyphir Randrott</a></span></tbody></table>';
			xhtml += '</div></div></div></td>';
			xhtml += '<td></td>';
			xhtml += '</tr>';
			xhtml += '<tr>';
			xhtml += '<td></td>';
			xhtml += '<td></td>';
			xhtml += '<td></td>';
			xhtml += '</tr>';
			xhtml += '</tbody></table></div>';
			AjaxWindow.show("TWPro_settings", undefined, "Jobs", xhtml, {title:'TW Pro: ' + AjaxWindow.possibleValues['settings']}, true);
			$E("#window_TWPro_settings_Jobs .window_refresh").href = "javascript:TWPro.twpro_disableJobs();"+($("twpro_settings.tab.1.div").style.display=="block"?"TWPro.showTab($(\'twpro_settings.tab.1\'));":"TWPro.showTab($(\'twpro_settings.tab.2\'));");
			document.getElementById("window_TWPro_settings_Jobs").getElementsByTagName("h2")[0].style.cssText = "text-align:center";
			changeWindowTitle("window_TWPro_settings_Jobs",'TW Pro: ' + AjaxWindow.possibleValues['settings']);
			changeWindowBackground("window_TWPro_settings_Jobs",'TW Pro: ' + AjaxWindow.possibleValues['settings']);
			TWPro.moveJobAdjusted = false;
			TWPro.disableSetsAdjusted = false;
			TWPro.twpro_customJobs("load");
		}

		function twpro_confirmHideJobs(twpro_fortbattle, splitFortbattle){
			var disabledSets = '|';
			for(var internal_name in TWPro.twpro_setItemsCount){
				if(document.getElementById("twpro_settings_enabled_"+internal_name) && !document.getElementById("twpro_settings_enabled_"+internal_name).checked){
						disabledSets += internal_name+'|';
				}
			}
			TWPro.disableSetsAdjusted = TWPro.prefs["disabledSets"] != disabledSets;
			if(TWPro.twpro_calculated!=true && !TWPro.disableSetsAdjusted && ((/*!TWPro.twpro_customJobs("save") && */!TWPro.moveJobAdjusted && splitFortbattle!='splitFortbattle') || TWPro.settings_prefs['useCache']=='true')){
				if(TWPro.settings_prefs['useCache']=='true' && TWPro.twpro_invHashCached=='') TWPro.updateCache=true;
				if(TWPro.settings_prefs['useCache']=='true' || (TWPro.settings_prefs['useCache']!='true' && !TWPro.twpro_customJobs("save"))){
					document.getElementById('twpro_wait').text = TWPro.lang.CALCJOB;
					TWPro.twpro_updateList(function (){confirm_next();});
				}
				else{
					confirm_next();
				}
			}
			else{
				confirm_next();
			}
			function confirm_next(){
				var lastSelected = document.getElementById('twpro_jobList').options[document.getElementById('twpro_jobList').selectedIndex].value*1;
				if(lastSelected >= 0 && !twpro_fortbattle){
					lastSelected = TWPro.twpro_jobs[lastSelected].shortName;}
				else if (twpro_fortbattle){
					lastSelected = twpro_fortbattle;
				}
				if(splitFortbattle=='splitFortbattle'){
//					TWPro.twpro_jobsUpdateCalc = true;
					if($("splitFortbattle").checked==true && TWPro.settings_prefs['splitFortbattle']!='true'){
						TWPro.twpro_handleSettings_prefs('splitFortbattle','true');
						TWPro.twpro_split_fortbattle();
						TWPro.twpro_updateInternalJobInfo('splitFortbattle');
					}
					else if($("splitFortbattle").checked==false && TWPro.settings_prefs['splitFortbattle']=='true'){
						TWPro.twpro_handleSettings_prefs('splitFortbattle','false');
						for(var i=TWPro.twpro_jobs.length-1; i>=0; i--){
							if(TWPro.twpro_jobs[i].shortName.match(/twpro_fortatt_/) || TWPro.twpro_jobs[i].shortName.match(/twpro_fortdef_/)){
								TWPro.twpro_jobsCalculated[TWPro.twpro_jobs[i].shortName] = false;
								TWPro.twpro_jobValues[TWPro.twpro_jobs[i].shortName] = null;
								delete TWPro.twpro_jobValues[TWPro.twpro_jobs[i].shortName];
								TWPro.twpro_jobs.splice(i, 1);
							}
						}
					}
				}
				if(TWPro.disableSetsAdjusted){
					TWPro.twpro_jobsCalculated = {};
					TWPro.twpro_jobsUpdateCalc = false;
					TWPro.twpro_invHash = '';
					TWPro.prefs["disabledSets"] = disabledSets;
					//if(document.getElementById("twpro_settings_persist").checked)
					document.cookie = "twpro_"+Character.playerId+"_disabledSets=" +disabledSets + "; max-age=31536000";
					TWPro.twpro_setItems = {};
					TWPro.twpro_setItemsCount = {};
					for (var twpro_set in TWPro.twpro_setBonus) {
						TWPro.twpro_setItemsCount[twpro_set] = 0;
					}
					for (var twpro_wear in Wear.wear) {
						if ((Wear.wear[twpro_wear].obj.set != null) && !TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] && TWPro.twpro_validSet(Wear.wear[twpro_wear].obj)) {
							TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] = Wear.wear[twpro_wear].obj;
							TWPro.twpro_setItemsCount[Wear.wear[twpro_wear].obj.set.key]++;
						}
					}
					var bagitems = Bag.getInstance().items;
					for (var twpro_bag in bagitems) {
						if ((bagitems[twpro_bag].obj.set != null) && !TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] && TWPro.twpro_validSet(bagitems[twpro_bag].obj)) {
							TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] = bagitems[twpro_bag].obj;
							TWPro.twpro_setItemsCount[bagitems[twpro_bag].obj.set.key]++;
						}
					}
				}
				if(TWPro.moveJobAdjusted){
					var hidden = document.getElementById("twpro_settings_jobs_hidden"), inputs, disable={},persist=[], count=0;
					if(!hidden) return;
					hidden = hidden.options;
					for(; count<hidden.length; count++){
						persist.push(hidden[count].value);
						disable[hidden[count].value] = true;
					}
					TWPro.disabledJobs = disable;
//					TWPro.twpro_invHash = '';
					TWPro.twpro_calculated = false;
//					TWPro.twpro_jobsUpdateCalc = true;
					inputs = document.getElementById("twpro_settings_jobs_shown").options.length*1;
					inputs += count;
					persist = persist.join("|");
					TWPro.prefs["hidejobs"] = persist;
					//if(document.getElementById("twpro_settings_persist").checked) 
					document.cookie = "twpro_"+Character.playerId+"_hidejobs=" +persist + "; max-age=31536000";

				}
				if((TWPro.twpro_customJobs("save") && !(TWPro.twpro_calculated=false)) || document.getElementById("twpro_jobsort_filter") && TWPro.twpro_preference("Hide_unjobs") != TWPro.twpro_preference("Hide_unjobs", document.getElementById("twpro_jobsort_filter").checked) || ((TWPro.moveJobAdjusted || splitFortbattle=='splitFortbattle') && document.getElementById('twpro_jobList') && document.getElementById('twpro_jobList').options.length > 1) || TWPro.disableSetsAdjusted || twpro_fortbattle == 'twpro_fortatt' || twpro_fortbattle == 'twpro_fortdef' || TWPro.settings_prefs['useCache']=='true'){
					TWPro.twpro_setBonusParsed = false;
					if(TWPro.twpro_invHash != ''){
						TWPro.twpro_jobsUpdateCalc = true;
						if(TWPro.settings_prefs['useCache']!='true') TWPro.twpro_setItems_upd = {};
					}
					if (TWPro.twpro_calculated!=false && twpro_fortbattle) TWPro.twpro_jobsCalculated[twpro_fortbattle] = false;
					if(TWPro.settings_prefs['useCache']=='true'){				
	//					if(TWPro.twpro_calculated_by_cache != true){
						TWPro.twpro_setItems = {};
						for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
							TWPro.twpro_bag.twpro_countType[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
							TWPro.twpro_bag.twpro_countType_diff[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
						}
						TWPro.twpro_wear_items_list = '';
						TWPro.twpro_setItemsCount = {};
						for (var twpro_set in TWPro.twpro_setBonus) {
							TWPro.twpro_setItemsCount[twpro_set] = 0;
						}
						TWPro.twpro_invHashTest = [];
						TWPro.twpro_initializeItems('wear', null);
						TWPro.twpro_initializeItems('bag', null);
	//					}
						TWPro.updateCache=true;
	//					TWPro.twpro_cache_status();
					}
					if (TWPro.twpro_calculated!=false) TWPro.twpro_fortbattle = twpro_fortbattle;
					TWPro.twpro_customJobs("clear_item_cache", TWPro.twpro_fortbattle);
					document.getElementById('twpro_jobList').options.length = 1;
					document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
					$("twpro_useful").style.display = "block";	
					TWPro.twpro_updateList(
						function (){
							if(lastSelected && TWPro.prefs["hidejobs"].indexOf('|'+lastSelected+'|') == -1){
								for(var i=1; i<document.getElementById('twpro_jobList').options.length; i++){
									if(TWPro.twpro_jobs[document.getElementById('twpro_jobList').options[i].value].shortName == lastSelected && (lastSelected=i))break;
								}
							}
							if(typeof lastSelected != "number" || lastSelected < 0)lastSelected = 0;
							document.getElementById('twpro_jobList').selectedIndex = lastSelected;
							TWPro.twpro_changeJob();
							confirm_finish();
					});
				}
				else{
					confirm_finish();
				}
				function confirm_finish(){
					//new HumanMessage(document.getElementById("twpro_settings_persist").checked?TWPro.lang.SETTINGSSAVED:TWPro.lang.SETTINGSSAVEDSESSION, {type:'success'});
					new HumanMessage(TWPro.lang.SETTINGSSAVED, {type:'success'});
					TWPro.twpro_fortbattle = false;
					TWPro.twpro_jobsUpdateCalc = false;
					TWPro.moveJobAdjusted = false;
					TWPro.disableSetsAdjusted = false;
				}
			}
		}

		function twpro_moveJobSetting(from_to_dest){
			var from,dest,dest_to_from,temp=document.createDocumentFragment();
			if(from_to_dest == "show_to_hide"){
				from = document.getElementById("twpro_settings_jobs_shown").options;
				dest = document.getElementById("twpro_settings_jobs_hidden");
				dest_to_from = "hide_to_show";
			}
			else if(from_to_dest == "hide_to_show"){
				from = document.getElementById("twpro_settings_jobs_hidden").options;
				dest = document.getElementById("twpro_settings_jobs_shown");
				dest_to_from = "show_to_hide";
			}
			else {
				new HumanMessage("TWPro.moveJobSetting(): Unexpected error.");
				return;
			}
			for(var i=from.length-1; i>=0; i--){
				if(from[i].selected) {
				  from[i].setAttribute('ondblclick', "javascript:void TWPro.twpro_moveJobSetting(\'"+dest_to_from+"\');"); 
				  temp.insertBefore(from[i], temp.firstChild);
				}
			}
			dest.appendChild(temp);
			TWPro.moveJobAdjusted = true;
		}

		function twpro_updateInternalJobInfo(from){
			var twpro_jobCount = 0, twpro_calculation_health, twpro_calculation_unit, twpro_native_adjust;
			if(!TWPro.disabledJobs) TWPro.disabledJobs = {};
			if (!TWPro.twpro_fortbattle && !TWPro.twpro_jobsCalculated){
				if(from!='splitFortbattle')TWPro.twpro_customJobs("clear_cache");
				TWPro.twpro_jobs = [];
			}

			twpro_native_adjust = 2;
			twpro_calculation_health = function(fortbattle_type, healthPriority){
			  switch(healthPriority){
				  case 'auto':
				  return '(1 * Math.pow((Character.skills.health+Character.skills["health"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - Math.pow(Character.skills["health"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4))';
				  break;
				  case 'zero':
				  return '(1/(1000) * Character.skills.health - 0*Character.skills["health"])';
				  break;
				  case 'low':
				  return '(1 * Character.skills.health/('+Character.level+'/1.5) - 0*Character.skills["health"])';
				  break;
				  case 'medium':
				  return '(1 * Character.skills.health/('+Character.level+'/4) - 0*Character.skills["health"])';
				  break;
				  case 'high':
				  return '(1 * Character.skills.health/('+Character.level+'/6.5) - 0*Character.skills["health"])';
				  break;
				  default:
				  return '(1 * Math.pow((Character.skills.health+Character.skills["health"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - Math.pow(Character.skills["health"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4))';
			  }
			}
			twpro_calculation_units = function(fortbattle_type, battleUnit){
			  switch(battleUnit){
				  case 'lineinfantryman':
				  return [1, 1, 2];
				  break;

				  case 'skirmisher':
				  return ['1/(1000)', 2, 2];
				  //twpro_calculation_health += '/(6/7)';
				  break;
				  case 'marksman':
				  return [2, '1/(1000)', 2];
				  //twpro_calculation_health += '/(6/7)';
				  break;
				  default:
				  return [1, 1, 2];
			  }
			}
			if (!TWPro.twpro_fortbattle && !TWPro.twpro_jobsCalculated) {
			  for (var twpro_job in JobList) {
				  if(TWPro.disabledJobs[JobList[twpro_job].shortName]) continue;
				  TWPro.twpro_jobs[twpro_job*1] = JobList[twpro_job];
				  TWPro.twpro_jobs[twpro_job*1].west_id = twpro_job;
				  TWPro.twpro_jobs[twpro_job*1].twpro_calculation = TWPro.twpro_jobs[parseInt(twpro_job)].formular.replace(/skills\./g, 'Character.skills.');
				  twpro_jobCount++;
			  }
			}
			else{
			  for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
				 if(TWPro.twpro_jobs[twpro_i].shortName && !TWPro.disabledJobs[TWPro.twpro_jobs[twpro_i].shortName]){
					twpro_jobCount++;
					if(TWPro.twpro_jobs[twpro_i].shortName == TWPro.twpro_fortbattle || TWPro.twpro_jobsCalculated[TWPro.twpro_jobs[twpro_i].shortName] != true){
					//alert(TWPro.twpro_jobs[twpro_i].shortName);
					   delete TWPro.twpro_jobs[twpro_i];
   						//TWPro.twpro_jobs.splice(twpro_i, 1);
					   twpro_jobCount--;
					}
				 }
				 else if(TWPro.twpro_jobs[twpro_i].shortName && TWPro.disabledJobs[TWPro.twpro_jobs[twpro_i].shortName]){
					//alert(TWPro.twpro_jobs[twpro_i].shortName);
					   TWPro.twpro_jobsCalculated[TWPro.twpro_jobs[twpro_i].shortName] = false;
					   delete TWPro.twpro_jobs[twpro_i];
   						//TWPro.twpro_jobs.splice(twpro_i, 1);
					   //twpro_jobCount--;
				 }
			  }
			  for (var twpro_job in JobList) {
				  if(TWPro.disabledJobs[JobList[twpro_job].shortName] || TWPro.twpro_jobsCalculated[JobList[twpro_job].shortName] == true) continue;
				  TWPro.twpro_jobs[TWPro.twpro_jobs.length] = JobList[twpro_job];
				  TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].west_id = twpro_job;
				  TWPro.twpro_jobs[TWPro.twpro_jobs.length-1].twpro_calculation = JobList[parseInt(twpro_job)].formular.replace(/skills\./g, 'Character.skills.');
				  twpro_jobCount++;
			  }
			}
			
			if(!TWPro.disabledJobs['construct'] && !TWPro.twpro_fortbattle && (!TWPro.twpro_jobsCalculated || (TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated['construct'] != true))) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '3 * Character.skills.build + 1 * Character.skills.repair + 1 * Character.skills.leadership',
				'malus': -1,
				'name': TWPro.lang.CONSTRUCTION,
				'shortName': 'construct'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['duelshootingatt'] && !TWPro.twpro_fortbattle && (!TWPro.twpro_jobsCalculated || (TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated['duelshootingatt'] != true))) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 1 * Character.skills.appearance + 1 * Character.skills.shot',
				'malus': -1,
				'name': TWPro.lang.DUELSHOOTINGATT,
				'shortName': 'duelshootingatt'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['duelshootingdef'] && !TWPro.twpro_fortbattle && (!TWPro.twpro_jobsCalculated || (TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated['duelshootingdef'] != true))) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 1 * Character.skills.tactic + 1 * Character.skills.shot',
				'malus': -1,
				'name': TWPro.lang.DUELSHOOTINGDEF,
				'shortName': 'duelshootingdef'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['duelvigor'] && !TWPro.twpro_fortbattle && (!TWPro.twpro_jobsCalculated || (TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated['duelvigor'] != true))) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.reflex + 1 * Character.skills.tough + 1 * Character.skills.punch',
				'malus': -1,
				'name': TWPro.lang.DUELVIGOR,
				'shortName': 'duelvigor'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['speed'] && !TWPro.twpro_fortbattle && (!TWPro.twpro_jobsCalculated || (TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated['speed'] != true))) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.ride + 100',//=100 * Character.default_speed/Character.speed
				'malus': -1,
				'name': TWPro.lang.SPEED,
				'shortName': 'speed'
			}) && twpro_jobCount++;

			if(TWPro.settings_prefs['splitFortbattle']=='true'){
				for(var i=0; i<TWPro.twpro_health_priority.length; i++){
				  for(var j=0; j<TWPro.twpro_battle_unit.length; j++){
					if(!TWPro.disabledJobs['twpro_fortatt_'+TWPro.twpro_health_priority[i]+"_"+TWPro.twpro_battle_unit[j]] && !TWPro.twpro_fortbattle && (!TWPro.twpro_jobsCalculated || (TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated['twpro_fortatt_'+TWPro.twpro_health_priority[i]+"_"+TWPro.twpro_battle_unit[j]] != true))){healthPriority=TWPro.twpro_health_priority[i];battleUnit=TWPro.twpro_battle_unit[j];twpro_calculation_unit=twpro_calculation_units('att', battleUnit); (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
						'twpro_calculation': twpro_calculation_unit[0]+' * Math.pow((Character.skills.aim+Character.skills["aim"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - '+twpro_calculation_unit[0]+'*Math.pow(Character.skills["aim"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4) + '+twpro_calculation_unit[1]+' * Math.pow((Character.skills.dodge+Character.skills["dodge"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - '+twpro_calculation_unit[1]+'*Math.pow(Character.skills["dodge"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4) + '+twpro_calculation_unit[2]+' * Math.pow((Character.skills.leadership+Character.skills["leadership"]+('+Character.level+'/'+twpro_native_adjust+'))*('+(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+'), 0.4) - '+twpro_calculation_unit[2]+'*Math.pow((Character.skills["leadership"]+('+Character.level+'/'+twpro_native_adjust+'))*('+(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+'), 0.4) + '+twpro_calculation_unit[2]+' * Math.pow((Character.skills.endurance+Character.skills["endurance"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - '+twpro_calculation_unit[2]+'*Math.pow(Character.skills["endurance"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4) + '+twpro_calculation_health('att', healthPriority),
						'malus': -1,
						'name': TWPro.lang.FORTATTACK+" "+i+"|"+j,
						'shortName': 'twpro_fortatt_'+TWPro.twpro_health_priority[i]+"_"+TWPro.twpro_battle_unit[j]
					}) && twpro_jobCount++;}
					if(!TWPro.disabledJobs['twpro_fortdef_'+TWPro.twpro_health_priority[i]+"_"+TWPro.twpro_battle_unit[j]] && !TWPro.twpro_fortbattle && (!TWPro.twpro_jobsCalculated || (TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated['twpro_fortdef_'+TWPro.twpro_health_priority[i]+"_"+TWPro.twpro_battle_unit[j]] != true))){healthPriority=TWPro.twpro_health_priority[i];battleUnit=TWPro.twpro_battle_unit[j];twpro_calculation_unit=twpro_calculation_units('def', battleUnit); (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
						'twpro_calculation': twpro_calculation_unit[0]+' * Math.pow((Character.skills.aim+Character.skills["aim"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - '+twpro_calculation_unit[0]+'*Math.pow(Character.skills["aim"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4) + '+twpro_calculation_unit[1]+' * Math.pow((Character.skills.dodge+Character.skills["dodge"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - '+twpro_calculation_unit[1]+'*Math.pow(Character.skills["dodge"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4) + '+twpro_calculation_unit[2]+' * Math.pow((Character.skills.leadership+Character.skills["leadership"]+('+Character.level+'/'+twpro_native_adjust+'))*('+(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+'), 0.4) - '+twpro_calculation_unit[2]+'*Math.pow((Character.skills["leadership"]+('+Character.level+'/'+twpro_native_adjust+'))*('+(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+'), 0.4) + '+twpro_calculation_unit[2]+' * Math.pow((Character.skills.hide+Character.skills["hide"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - '+twpro_calculation_unit[2]+'*Math.pow(Character.skills["hide"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4) + '+twpro_calculation_health('def', healthPriority),
						'malus': -1,
						'name': TWPro.lang.FORTDEFEND+" "+i+"|"+j,
						'shortName': 'twpro_fortdef_'+TWPro.twpro_health_priority[i]+"_"+TWPro.twpro_battle_unit[j]
					}) && twpro_jobCount++;}
				  }
				}
			}

			twpro_jobCount += TWPro.twpro_customJobs("get")*1||0;
			
			if(!TWPro.disabledJobs['twpro_fortatt'] && (!TWPro.twpro_fortbattle || TWPro.twpro_fortbattle == 'twpro_fortatt') && (!TWPro.twpro_jobsCalculated || (TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated['twpro_fortatt'] != true))){healthPriority=TWPro.battle_prefs['healthPriority_att'];battleUnit=TWPro.battle_prefs['battleUnit_att'];twpro_calculation_unit=twpro_calculation_units('att',battleUnit); (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': twpro_calculation_unit[0]+' * Math.pow((Character.skills.aim+Character.skills["aim"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - '+twpro_calculation_unit[0]+'*Math.pow(Character.skills["aim"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4) + '+twpro_calculation_unit[1]+' * Math.pow((Character.skills.dodge+Character.skills["dodge"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - '+twpro_calculation_unit[1]+'*Math.pow(Character.skills["dodge"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4) + '+twpro_calculation_unit[2]+' * Math.pow((Character.skills.leadership+Character.skills["leadership"]+('+Character.level+'/'+twpro_native_adjust+'))*('+(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+'), 0.4) - '+twpro_calculation_unit[2]+'*Math.pow((Character.skills["leadership"]+('+Character.level+'/'+twpro_native_adjust+'))*('+(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+'), 0.4) + '+twpro_calculation_unit[2]+' * Math.pow((Character.skills.endurance+Character.skills["endurance"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - '+twpro_calculation_unit[2]+'*Math.pow(Character.skills["endurance"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4) + '+twpro_calculation_health('att', healthPriority),
				'malus': -1,
				'name': TWPro.lang.FORTATTACK,
				'shortName': 'twpro_fortatt'
			}) && twpro_jobCount++;}
			
			if(!TWPro.disabledJobs['twpro_fortdef'] && (!TWPro.twpro_fortbattle || TWPro.twpro_fortbattle == 'twpro_fortdef') && (!TWPro.twpro_jobsCalculated || (TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated['twpro_fortdef'] != true))){healthPriority=TWPro.battle_prefs['healthPriority_def'];battleUnit=TWPro.battle_prefs['battleUnit_def'];twpro_calculation_unit=twpro_calculation_units('def',battleUnit); (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': twpro_calculation_unit[0]+' * Math.pow((Character.skills.aim+Character.skills["aim"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - '+twpro_calculation_unit[0]+'*Math.pow(Character.skills["aim"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4) + '+twpro_calculation_unit[1]+' * Math.pow((Character.skills.dodge+Character.skills["dodge"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - '+twpro_calculation_unit[1]+'*Math.pow(Character.skills["dodge"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4) + '+twpro_calculation_unit[2]+' * Math.pow((Character.skills.leadership+Character.skills["leadership"]+('+Character.level+'/'+twpro_native_adjust+'))*('+(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+'), 0.4) - '+twpro_calculation_unit[2]+'*Math.pow((Character.skills["leadership"]+('+Character.level+'/'+twpro_native_adjust+'))*('+(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+'), 0.4) + '+twpro_calculation_unit[2]+' * Math.pow((Character.skills.hide+Character.skills["hide"]+('+Character.level+'/'+twpro_native_adjust+')), 0.4) - '+twpro_calculation_unit[2]+'*Math.pow(Character.skills["hide"]+('+Character.level+'/'+twpro_native_adjust+'), 0.4) + '+twpro_calculation_health('def', healthPriority),
				'malus': -1,
				'name': TWPro.lang.FORTDEFEND,
				'shortName': 'twpro_fortdef'
			}) && twpro_jobCount++;}

			for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
				if(!(twpro_job=TWPro.twpro_jobs[twpro_i])) continue;
			}
			TWPro.twpro_sortJobs();
			while (TWPro.twpro_jobs.length > twpro_jobCount) {
				TWPro.twpro_jobs.pop();
			}

			if(!TWPro.twpro_jobsCalculated)	TWPro.twpro_jobsCalculated = {};

		}
		function twpro_customJobs(action, args){try{
			var custom = TWPro.prefs["customJobs"],//(?:\d\s*\*\s*[A-Za-z_.\[\]"']+(?:\s*\+\s*)?)+
			REcustom = /^(cj_\d+)#([01])#(.+?)#(.+?)$/,
			screen_settings = document.getElementById("twpro_settings_customJob");
			if(action == "get"){
				if(!custom) return 0;
				var customs = custom.split('|'), twpro_jobCount=0;
				for(var i=0; i<customs.length; i++){
					var custom_i = customs[i].match(REcustom);
					if(!custom_i) continue;
					var shortName = custom_i[1],
					enabledJob = custom_i[2],
					twpro_calculation = custom_i[3];
					name = custom_i[4];
					if((function(){try{var i=0, customs=0, custom=0;if(isNaN(eval(twpro_calculation)))throw NaN}catch(e){return true}return false})()) continue;
					TWPro.twpro_jobValues[shortName] = {'erfahrung':-1, 'lohn':-6, 'glueck':-6, 'gefahr':-1};
					if(enabledJob == "1" && (!TWPro.twpro_jobsCalculated || (TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated[shortName] != true))){
						TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
							'twpro_calculation': twpro_calculation,
							'malus': -1,
							'name': name,
							'shortName': shortName
						};
						twpro_jobCount++;
					}
					else if(enabledJob == "0" && TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated[shortName] == true){
					  for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
						if(TWPro.twpro_jobs[twpro_i].shortName == shortName){
							TWPro.twpro_jobsCalculated[TWPro.twpro_jobs[twpro_i].shortName] = false;
							TWPro.twpro_jobValues[TWPro.twpro_jobs[twpro_i].shortName] = null;
							delete TWPro.twpro_jobValues[TWPro.twpro_jobs[twpro_i].shortName];
							TWPro.twpro_jobs.splice(twpro_i, 1);
							twpro_jobCount--;
							break;
						}
					  }

					}
				}
				return twpro_jobCount;
			}
			else if(action == "clear_cache"){
				for(var i=TWPro.twpro_jobs.length-1, cleared=0; i>=0; i--){
					if(TWPro.twpro_jobs[i].shortName.match(/^cj_\d+$/)){
						TWPro.twpro_jobValues[TWPro.twpro_jobs[i].shortName] = null;
						delete TWPro.twpro_jobValues[TWPro.twpro_jobs[i].shortName];
						TWPro.twpro_jobs.splice(i, 1);
						cleared++;
					}
				}
				return cleared;
			}
			else if(action == "clear_item_cache"){
				var items = Bag.getInstance().items, i, item, j, k, deleted=0;
				for(i in items){
					item = items[i].obj;
					if(item.twpro_jobbonus){
						k=0;
						for(j in item.twpro_jobbonus){
							k++;
							//alert(j);
							//if(!args && j.match(/^cj_\d+$/) || ((args == 'twpro_fortatt' && j == 'twpro_fortatt') || (args == 'twpro_fortdef' && j == 'twpro_fortdef'))){
							if((!args && TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated[j] == false) || ((args == 'twpro_fortatt' && j == 'twpro_fortatt') || (args == 'twpro_fortdef' && j == 'twpro_fortdef'))){
//alert(j);
								delete item.twpro_jobbonus[j];
								if(TWPro.twpro_itemStorage[item.item_id] && TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus){
									delete TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus[j];
								}
								k--;
								if(j.match(/twpro_fortatt/) || j.match(/twpro_fortdef/)) {
									delete item.twpro_jobbonus[j+"_fb"];
									if(TWPro.twpro_itemStorage[item.item_id] && TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus){
										delete TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus[j+"_fb"];
									}
									k--;
								}
								deleted++;
							}
						}
						if(!k) delete item.twpro_jobbonus;
					}
				}
				for(i in Wear.wear){
					item = Wear.wear[i].obj;
					if(item.twpro_jobbonus){
						k=0;
						for(j in item.twpro_jobbonus){
							k++;
							//if(!args && j.match(/^cj_\d+$/) || ((args == 'twpro_fortatt' && j == 'twpro_fortatt') || (args == 'twpro_fortdef' && j == 'twpro_fortdef'))){
							if((!args && TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated[j] == false) || ((args == 'twpro_fortatt' && j == 'twpro_fortatt') || (args == 'twpro_fortdef' && j == 'twpro_fortdef'))){
//							if((!args && j.match(/^cj_\d+$/) && (!TWPro.twpro_jobsCalculated || (TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated[j.match(/^cj_\d+$/)] != true))) || (TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated[j] != true) || ((args == 'twpro_fortatt' && j == 'twpro_fortatt') || (args == 'twpro_fortdef' && j == 'twpro_fortdef'))){
								delete item.twpro_jobbonus[j];
								if(TWPro.twpro_itemStorage[item.item_id] && TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus){
									delete TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus[j];
								}
								k--;
								if(j.match(/twpro_fortatt/) || j.match(/twpro_fortdef/)) {
									delete item.twpro_jobbonus[j+"_fb"];
									if(TWPro.twpro_itemStorage[item.item_id] && TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus){
										delete TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus[j+"_fb"];
									}
									k--;
								}
								deleted++;
							}
						}
						if(!k) delete item.twpro_jobbonus;
					}
				}
				return deleted;
			}
			else if(screen_settings){
				var select = screen_settings.getElementsByTagName("select")[0],
				shortName = screen_settings.getElementsByTagName("input")[0],
				name = screen_settings.getElementsByTagName("input")[1],
				calculation = screen_settings.getElementsByTagName("input")[2],
				enabledJob = screen_settings.getElementsByTagName("input")[3],
				wannabejob = shortName.value+"#"+enabledJob.checked*1+"#"+calculation.value+"#"+name.value;
				if(action == "load"){
					select.options.length = 0;
					if(custom){
						var customs = custom.split('|');
						for(var i=0; i<customs.length; i++){
							var custom_i = customs[i].match(REcustom), valid = true;
							if(!custom_i && (invalid = false)) custom_i = select.options[select.selectedIndex].value.match(/^(.+?)#(.+?)#(.+?)#(.+?)$/);
							if(!custom_i) continue;
							var shortName = custom_i[1],
							enabledJob = custom_i[2],
							calculation = custom_i[3],
							name = custom_i[4];
							select.add(new Option(name, shortName+"#"+enabledJob+"#"+calculation+"#"+name), null);
							select.options[select.options.length-1].style.backgroundColor = valid?enabledJob=="1"?"#A0DA78":"#FFA500":"#E89678";
						}
					}

					if(!custom || !customs.length) return TWPro.twpro_customJobs("new");
					return TWPro.twpro_customJobs("switch");
				}
				else if(select.selectedIndex >= 0){
					if(action == "switch"){
						custom = select.options[select.selectedIndex].value.match(REcustom);
						if(!custom) custom = select.options[select.selectedIndex].value.match(/^(.+?)#(.+?)#(.+?)#(.+?)$/);
						if(!custom){
							shortName.value = "cj_"+((new Date()).getTime()+"").substring(3);
							enabledJob.checked = true;
							calculation.value = "";
							name.value = TWPro.lang.NEW;
							name.style.backgroundColor = "#AODA78";
							calculation.style.backgroundColor = "#E89678";
							return 0;
						}
						window.clearTimeout(TWPro.twpro_calc_blurred);
						shortName.value = custom[1];
						enabledJob.checked = custom[2] == "1";
						calculation.value = custom[3];
						name.value = custom[4];
						TWPro.twpro_customJobs("check");
					}
					else if(action == "blur" || action == "save" || action == "new"){
						select.options[select.selectedIndex].value = wannabejob;
						select.options[select.selectedIndex].style.backgroundColor = wannabejob.match(REcustom) ? enabledJob.checked ? "#A0DA78" : "#FFA500" : "#E89678";
						select.options[select.selectedIndex].innerHTML = name.value.replace(/&/g,'&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
					}
				}
				
				if(action == "new" || action == "cleared&new"){
					if(action == "new" && (name.value == "" || name.value == TWPro.lang.NEW) && calculation.value == "" && select.options.length){
						if(select.selectedIndex < 0) select.selectedIndex = 0;
					}
					else {
						for(var i=0; i<select.options.length; i++){
							if(select.options[i].value == "" || select.options[i].value.replace(/^cj_\d+/,'') == "###" || select.options[i].value.replace(/^cj_\d+/,'') == "###"+TWPro.lang.NEW){
								select.selectedIndex = i;
								TWPro.twpro_customJobs("switch");
								return 0;
							}
						}
						document.getElementById("twpro_settings_calc_helper").style.display = "none";
						select.add(new Option(TWPro.lang.NEW, ""), null);
						select.options[select.options.length-1].style.backgroundColor = "#E89678";
						select.selectedIndex = select.options.length-1;
						select.options[select.options.length-1].value = shortName.value+"###"+TWPro.lang.NEW;
						shortName.value = "cj_"+((new Date()).getTime()+"").substring(3);
						enabledJob.checked = true;
						calculation.value = "";
						name.value = TWPro.lang.NEW;
						calculation.style.backgroundColor = "#E89678";
					}
				}
				else if(action == "check" || action == "blur"){
					name.style.backgroundColor =  ["cj_0123456789", "1", "1 * Character.skills.ride", name.value].join("#").match(REcustom) ? "#A0DA78" : "#E89678";
					var code = calculation.value,
						check = ["cj_0123456789", "1", code, "Valid name"];
					try{(function(){var res=0,i=0,select=0,args=0,check=0,calculation=0,name=0,shortName=0,wannabejob=0,enabledJob=0;if(isNaN(eval(code)))throw NaN})();}catch(e){/*new HumanMessage("Invalid TW Pro Calculation!");*/check = [];}
					if(args && args[1] == 2) shortName.value = "cj_"+((new Date()).getTime()+"").substring(3);

					wannabejob = wannabejob.replace(/^.*?#/, shortName.value+"#");
					select.options[select.selectedIndex].value = wannabejob;
					calculation.style.backgroundColor = check.join("#").match(REcustom) ? "#A0DA78" : "#E89678";
				}
				else if(action == "switchFocus"){
					if((name.value == "" || name.value == TWPro.lang.NEW) && calculation.value == ""){
						select.remove(select.selectedIndex);
						TWPro.twpro_customJobs("cleared&new");
						return 0;
					}
				}
				else if(action == "calcFocus"){
					window.clearTimeout(TWPro.twpro_calc_blurred);
					TWPro.twpro_calc_blurred = null;
					document.getElementById("twpro_settings_calc_helper").style.display = "block";
				}
				else if(action == "calcBlur"){
					TWPro.twpro_customJobs("blur", [2, calculation.value, calculation]);
					if((typeof TWPro.twpro_calc_blurred != "undefined" && TWPro.twpro_calc_blurred != null) || action == "calcBlur"){
						window.clearTimeout(TWPro.twpro_calc_blurred);
						TWPro.twpro_calc_blurred = window.setTimeout(function(){
							TWPro.twpro_customJobs("calcBlurNow");
						}, 500);
					}
				}
				else if(action == "calcBlurNow"){
					window.clearTimeout(TWPro.twpro_calc_blurred);
					TWPro.twpro_calc_blurred = null;
					document.getElementById("twpro_settings_calc_helper").style.display = "none";
				}
				else if(action == "editCalculation" && typeof args == "string" && (args in TWPro.skill_to_AttNum)){
					var calc = calculation.value,
					REcalc = new RegExp("(\\d)\\s*\\*\\s*Character\\.skills\\."+args, ""),
					match;
					if((match=calc.match(REcalc))){
						var count = match[1]*1;
						if(++count <= 9) calc = calc.replace(REcalc, count + " * Character.skills."+args);
					}
					else {
						calc += (calc==""?"":" + ")+"1 * Character.skills."+args;
					}
					calculation.value = calc;
					TWPro.twpro_customJobs("blur", [2, calc, calculation]);
					calculation.focus();
				}
				else if(action == "editCalculation" && typeof args == "string" && (args in Character.attribute_titles)){
					var calc = calculation.value,
					REcalc = new RegExp("(\\d)\\s*\\*\\s*Character\\.attributes\\."+args, ""),
					match;
					if((match=calc.match(REcalc))){
						var count = match[1]*1;
						if(++count <= 9) calc = calc.replace(REcalc, count + " * Character.attributes."+args);
					}
					else {
						calc += (calc==""?"":" + ")+"1 * Character.attributes."+args;
					}
					calculation.value = calc;
					TWPro.twpro_customJobs("blur", [2, calc, calculation]);
					calculation.focus();
				}
				else if(action == "save"){
					var res = [], res;
					for(var i=0; i<select.options.length; i++){
						if((match=select.options[i].value.match(REcustom))){
							var code = match[2];
							//alert(match[3]);
							if(TWPro.twpro_jobsCalculated && TWPro.twpro_jobsCalculated[match[1]] == true){
								for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
									if(TWPro.twpro_jobs[twpro_i].shortName == match[1] && TWPro.twpro_jobs[twpro_i].twpro_calculation != match[3]){
										TWPro.twpro_jobsCalculated[TWPro.twpro_jobs[twpro_i].shortName] = false;
										break;
									}
								}
							}
							(function(){var res=0,i=0,select=0,custom=0;if(isNaN(eval(code)))throw NaN})();
							res.push(encodeURIComponent(select.options[i].value));
						}
					}
					res = res.join('|');
					custom = TWPro.prefs["customJobs"] != decodeURIComponent(res);
					TWPro.prefs["customJobs"] = decodeURIComponent(res);
					//if(document.getElementById("twpro_settings_persist").checked) 
					document.cookie = "twpro_"+Character.playerId+"_customJobs="+res+"; max-age=31536000";

					return custom;
				}
			}
		}catch(e){new HumanMessage("TWPro error, customJobs: "+e)}return 0}

		function twpro_updateList(conf_func) {
			if (TWPro.twpro_failure) return;
			if (!TWPro.twpro_calculated || TWPro.twpro_fortbattle || !TWPro.twpro_jobsCalculated) {
				document.getElementById('twpro_jobList').blur();
				TWPro.twpro_updateInternalJobInfo();
				document.getElementById('twpro_jobList').focus();
			}
			if(TWPro.settings_prefs['useCache']=='true' && TWPro.twpro_emptying_cache!=true){
				twpro_usecache=true;
			}
			else{
				twpro_usecache=false;
			}
			if(twpro_usecache!=true || TWPro.updateCache==true){
				if(TWPro.updateCache==true && !TWPro.twpro_fortbattle){
					twproCache.setValue("twpro_specialJobs_skills", {'level':Character.level,'health':Character.skills.health,'ride':Character.skills.ride,'leadership':Character.skills.leadership,'aim':Character.skills.aim,'dodge':Character.skills.dodge,'endurance':Character.skills.endurance,'hide':Character.skills.hide});

					if(TWPro.twpro_NewjobsDetected) TWPro.twpro_NewjobsDetected = [];

					if(TWPro.twpro_cache_jobsChanges){
						for(var twpro_it = 0; twpro_it<TWPro.twpro_cache_jobsChanges.length; twpro_it++){
							//alert(TWPro.twpro_cache_jobsChanges[twpro_it]);
							TWPro.twpro_jobsCalculated[TWPro.twpro_cache_jobsChanges[twpro_it]]=false;
							if(TWPro.twpro_cache_jobsChanges[twpro_it] == "twpro_fortatt" && TWPro.settings_prefs['splitFortbattle']=='true'){
							  for(var i=0; i<extra_jobs.length; i++){
								if(extra_jobs[i].match(/twpro_fortatt_/) && !TWPro.disabledJobs[extra_jobs[i]]){
									//alert(extra_jobs[i]);
									TWPro.twpro_jobsCalculated[extra_jobs[i]]=false;
								}
							  }
							}
							if(TWPro.twpro_cache_jobsChanges[twpro_it] == "twpro_fortdef" && TWPro.settings_prefs['splitFortbattle']=='true'){
							  for(var i=0; i<extra_jobs.length; i++){
								if(extra_jobs[i].match(/twpro_fortdef_/) && !TWPro.disabledJobs[extra_jobs[i]]){
									//alert(extra_jobs[i]);
									TWPro.twpro_jobsCalculated[extra_jobs[i]]=false;
								}
							  }
							}
						}
						TWPro.twpro_cache_jobsChanges = null;
						TWPro.twpro_jobsUpdateCalc = true;
					}

				//	alert(JSON.stringify(TWPro.twpro_jobsCalculated));				
					if(TWPro.twpro_cache_new){
						TWPro.twpro_jobsUpdateCalc = true;
						for(var twpro_it = 0; twpro_it<TWPro.twpro_cache_new.length; twpro_it++){
							//var twpro_xhtml = '';
							var twpro_item = TWPro.twpro_itemStorage[TWPro.twpro_cache_new[twpro_it]];
							if (twpro_item.twpro_bonus == undefined || twpro_item.twpro_weapon == undefined) {
								TWPro.twpro_prepareItem(twpro_item);
							}
							if(twpro_item.twpro_set == true && twpro_item.twpro_setKey == 'set_sleeper' && TWPro.twpro_setItemsCount["set_sleeper"] >= 2){
								TWPro.twpro_jobsCalculated["regeneration"]=false;
							}
							else if(twpro_item.twpro_set == true && TWPro.twpro_validSet(twpro_item.twpro_setKey) && (TWPro.prefs["disabledSets"]+'').indexOf('|'+twpro_item.twpro_setKey+'|') == -1){
								if(!twpro_setItemsUpd) var twpro_setItemsUpd = {};
								if(!twpro_setItemsUpd[twpro_item.twpro_setKey]){
									twpro_setItemsUpd[twpro_item.twpro_setKey] = {};
									twpro_setItemsUpd[twpro_item.twpro_setKey].itemsList = [];
								}
								twpro_setItemsUpd[twpro_item.twpro_setKey].itemsList.push(TWPro.twpro_cache_new[twpro_it]);
								twpro_setItemsUpd[twpro_item.twpro_setKey].newCount = (twpro_setItemsUpd[twpro_item.twpro_setKey].newCount || 0) +1;

								if(!twpro_setItemsCalcUpdate){
									var twpro_setItemsUpdate = {};
									var twpro_setItemsCalcUpdate = {};
									for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
										twpro_setItemsCalcUpdate[TWPro.twpro_bag.twpro_types[twpro_i]] = [null];
									}
									if(TWPro.cacheMethod == "WebStorage"){
										twpro_setItemsUpdate = twproCache.getValue("TWPro.twpro_setItems");
									}
									else{
										twpro_setItemsUpdate = TWPro.bigCache["TWPro.twpro_setItems"];
									}
									for (var twpro_setItemId in twpro_setItemsUpdate) {
										var twpro_setItem = twpro_setItemsUpdate[twpro_setItemId];
										if (twpro_setItem.twpro_wearable) {
											twpro_setItemsCalcUpdate[twpro_setItem.type].push(twpro_setItem.set.key+",");
										}
									}	
								}					
						
								twpro_setItemsUpd[twpro_item.twpro_setKey].actCount = 0;
								for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
									if((String(twpro_setItemsCalcUpdate[TWPro.twpro_bag.twpro_types[twpro_j]])).indexOf(","+twpro_item.twpro_setKey+",") != -1){
										twpro_setItemsUpd[twpro_item.twpro_setKey].actCount++;
										if(TWPro.twpro_bag.twpro_types[twpro_j] == twpro_item.type) twpro_setItemsUpd[twpro_item.twpro_setKey].newCount--;
									}
								}			
							}
							
							if (twpro_item.twpro_bonus || twpro_item.twpro_weapon) {
								//var twpro_plus = [];
								var twpro_better;
								//var twpro_style;
								for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
									twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i], twpro_item);
									if ((TWPro.twpro_jobs[twpro_i].shortName == "speed" && Character.characterClass == "greenhorn") || !TWPro.twpro_jobs[twpro_i].twpro_bestStats) continue;
									//twpro_style = ';';
									if((twpro_item.type == "right_arm" && ((twpro_item.sub_type == "hand" && TWPro.twpro_jobs[twpro_i].shortName == "duelvigor") || (twpro_item.sub_type == "shot" && (TWPro.twpro_jobs[twpro_i].shortName == "duelshootingatt" || TWPro.twpro_jobs[twpro_i].shortName == "duelshootingdef")))) || (twpro_item.type == "left_arm" && (TWPro.twpro_jobs[twpro_i].shortName.match(/twpro_fortatt/) || TWPro.twpro_jobs[twpro_i].shortName.match(/twpro_fortdef/)))){
									  twpro_better = -1;
									  var damage_type = twpro_item.type;
									  if(twpro_item.sub_type) damage_type += '_' + twpro_item.sub_type;
									  if (twpro_item.damage.damage_min >= TWPro.damage_min[damage_type]) twpro_better = twpro_item.damage.damage_min-TWPro.damage_min[damage_type]+'<span style="font-size:11px;">'+TWPro.lang.DMGMIN+'<\/span>';
									  if (twpro_item.damage.damage_max >= TWPro.damage_max[damage_type]) twpro_better = twpro_item.damage.damage_max-TWPro.damage_max[damage_type]+'<span style="font-size:11px;">'+TWPro.lang.DMGMAX+'<\/span>';
									  if ((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 >= TWPro.damage_average[damage_type]) twpro_better = ((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2)-TWPro.damage_average[damage_type]+'<span style="font-size:11px;">'+TWPro.lang.DMGAVG+'<\/span>';
									}
									else if(twpro_item.type == "right_arm" && (TWPro.twpro_jobs[twpro_i].shortName == "duelvigor" || TWPro.twpro_jobs[twpro_i].shortName == "duelshootingatt" || TWPro.twpro_jobs[twpro_i].shortName == "duelshootingdef")){
									  twpro_better = -1;
									}
									else{
									  twpro_better = Math.round((twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] - TWPro.twpro_jobs[twpro_i].twpro_bestStats[twpro_item.type])*100)/100;
									  if(isNaN(twpro_better)) twpro_better = -1;
									  /*if(TWPro.twpro_jobs[twpro_i].malus >= 0){
										var twpro_aktlp = TWPro.twpro_jobValues[TWPro.twpro_jobs[twpro_i].shortName].laborp -1;
										if(twpro_aktlp < 0){
										  if((twpro_better+twpro_aktlp) >= 0){
											twpro_style += 'color:rgb(17,96,21);';
										  }
										  else{
											twpro_style += 'color:rgb(139,34,9);';
										  }
										}
									  }
									  if(twpro_item.twpro_set){
										twpro_style += 'font-style:italic;';
									  }
									  if (TWPro.twpro_setItemsEffect && (TWPro.twpro_jobs[twpro_i].twpro_bestCombi[twpro_item.type] > 0)) {
										twpro_style += 'font-weight:normal;';
									  }*/
									}
									if (twpro_better >= 0 || isNaN(twpro_better)) {
										TWPro.twpro_jobsCalculated[TWPro.twpro_jobs[twpro_i].shortName]=false;
/*									  var twpro_strreplace = TWPro.twpro_jobs[twpro_i].name.replace(/&#039;/g,"\'");
									  var twpro_strreplace_end = '';
									  if(TWPro.settings_prefs['splitFortbattle']=='true' && (TWPro.twpro_jobs[twpro_i].shortName.match(/twpro_fortatt_/) || TWPro.twpro_jobs[twpro_i].shortName.match(/twpro_fortdef_/))){
										twpro_strreplace_end = TWPro.lang.FBTAGS[0][twpro_strreplace.charAt(twpro_strreplace.length-3)]+"|"+TWPro.lang.FBTAGS[1][twpro_strreplace.charAt(twpro_strreplace.length-1)];
										twpro_strreplace = ' \u25B7'+twpro_strreplace.slice(0,twpro_strreplace.length-3);
									  }
									  twpro_plus.push(twpro_style + '">+' + twpro_better + ' ' + ((twpro_strreplace.length > 25)?unescape(twpro_strreplace.substr(0, 23))+'<span style="font-size:10px;">...<\/span>':unescape(twpro_strreplace))+twpro_strreplace_end);
									  twpro_j++;
									  twpro_plus.push(TWPro.twpro_jobs[twpro_i].name.replace(/&#039;/g,"\'"));
*/
									}
								}
/*								if (twpro_j > 0) {
									twpro_plus.sort(TWPro.twpro_sortPlus);
									twpro_xhtml += '<span class="item_popup_bonus"><table><tr><td style="font-size:12px;">';
									var bool_j = twpro_j > 30 && twpro_j <= 33;
									for (var twpro_i = 0; (twpro_i < twpro_plus.length) && (twpro_i < 33); twpro_i++) {
										twpro_xhtml += '<span style="white-space:nowrap;';
										twpro_xhtml += twpro_plus[twpro_i] + '</span><br />';
										if ((twpro_j <= 30 && twpro_i == 14) || (bool_j && (twpro_i == (Math.round(twpro_j / 2) - 1))) || (twpro_j > 33 && twpro_i == 16)) {
											twpro_xhtml += '</td><td style="font-size:12px;">';
										}
									}
									if (twpro_i < twpro_plus.length) {
										twpro_xhtml += '...';
									}
									twpro_xhtml += '</td></tr></table></span><br />';
								}
*/								
							}
							//alert(twpro_plus.toString());
							//alert(twpro_xhtml);
						}
						if(twpro_setItemsUpd){
							var setItemsEffect = false;
							if(TWPro.cacheMethod == "WebStorage"){
							  if(twproCache.getValue("TWPro.twpro_setItemsEffect") == true) setItemsEffect = true;
							}
							else{
							  if(TWPro.bigCache["TWPro.twpro_setItemsEffect"] == true) setItemsEffect = true;
							}
							if(setItemsEffect == true){
								TWPro.twpro_jobsCalculated["regeneration"]=false;
								for (var twpro_set in twpro_setItemsUpd) {
									var twpro_setBonus_cached = {};
									if(TWPro.cacheMethod == "WebStorage"){
									  twpro_setBonus_cached = twproCache.getValue("TWPro.twpro_setBonus."+twpro_set);
									}
									else{
									  twpro_setBonus_cached = TWPro.bigCache["TWPro.twpro_setBonus."+twpro_set];
									}
									if(twpro_setItemsUpd[twpro_set].actCount >= 2 && twpro_setItemsUpd[twpro_set].newCount != 0){
										//alert("act>=2 & new!=0 "+twpro_setItemsUpd[twpro_set].actCount+"+"+twpro_setItemsUpd[twpro_set].newCount);
										for (var twpro_job in twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus){
											if(twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus[twpro_job] > 0 || twpro_job == "speed"){	
												for(var twpro_j=0; twpro_j < twpro_setItemsUpd[twpro_set].itemsList.length; twpro_j++){
													twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus[twpro_job] = twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus[twpro_job] + (TWPro.twpro_itemStorage[twpro_setItemsUpd[twpro_set].itemsList[twpro_j]].twpro_jobbonus?(TWPro.twpro_itemStorage[twpro_setItemsUpd[twpro_set].itemsList[twpro_j]].twpro_jobbonus[twpro_job]||0):0);
												}
											}	
											if(twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus[twpro_job] > twpro_setBonus_cached[twpro_setItemsUpd[twpro_set].actCount].parsedBonus[twpro_job]){
												TWPro.twpro_jobsCalculated[twpro_job]=false;
											}
										}
										if(TWPro.twpro_setBonus[twpro_set][(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].speedBonus > TWPro.twpro_setBonus[twpro_set][twpro_setItemsUpd[twpro_set].actCount].speedBonus) TWPro.twpro_jobsCalculated["speed"]=false;
									}
									else if((twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount) >= 2){
										//alert("act+new>=2 "+twpro_setItemsUpd[twpro_set].actCount+"+"+twpro_setItemsUpd[twpro_set].newCount);
										for (var twpro_job in twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus){
											if(twpro_setBonus_cached[(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].parsedBonus[twpro_job] > 0){
												TWPro.twpro_jobsCalculated[twpro_job]=false;
											}
										}
										if(TWPro.twpro_setBonus[twpro_set][(twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount)].speedBonus > 0) TWPro.twpro_jobsCalculated["speed"]=false;
									}
									else{
										//alert("gold set case "+twpro_setItemsUpd[twpro_set].actCount+"+"+twpro_setItemsUpd[twpro_set].newCount);
									}
								}
							}
							else{
								for (var twpro_set in twpro_setItemsUpd) {
									if((twpro_setItemsUpd[twpro_set].actCount+twpro_setItemsUpd[twpro_set].newCount) >= 2){
										TWPro.twpro_jobsUpdateCalc = false;
										TWPro.twpro_jobsCalculated = {};
									}
								}
							}
							twpro_setItemsUpdate = {};
							twpro_setItemsCalcUpdate = {};
							twpro_setItemsUpd = {};
						}
						TWPro.twpro_cache_new = null;
					}
				//	alert(JSON.stringify(TWPro.twpro_jobsCalculated));				

					if(TWPro.twpro_cache_deleted){
						TWPro.twpro_jobsUpdateCalc = true;
						for(var twpro_it = 0; twpro_it<TWPro.twpro_cache_deleted.length; twpro_it++){
							if(TWPro.cacheMethod == "WebStorage"){
							  var item_cache_test = twproCache.getValue("twpro_inv."+TWPro.twpro_cache_deleted[twpro_it][0]);
							}
							else{
							  var item_cache_test = TWPro.bigCache["twpro_inv."+TWPro.twpro_cache_deleted[twpro_it][0]];
							}
							if(item_cache_test.twpro_set == true){
								var setDisabled = false;
								if(TWPro.cacheMethod == "WebStorage"){
								  if(!twproCache.getValue("TWPro.twpro_setItems")[TWPro.twpro_cache_deleted[twpro_it][0]]) setDisabled = true;
								}
								else{
								  if(!TWPro.bigCache["TWPro.twpro_setItems"][TWPro.twpro_cache_deleted[twpro_it][0]]) setDisabled = true;
								}
								if(setDisabled != true){
									//alert("all");
									TWPro.twpro_jobsUpdateCalc = false;
									TWPro.twpro_jobsCalculated = {};
									break;
								}
							}
							for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
								if(!TWPro.twpro_jobs[twpro_i].twpro_bestStats) continue;
								if(item_cache_test.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] && item_cache_test.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] >= TWPro.twpro_jobs[twpro_i].twpro_bestStats[item_cache_test.type]){
									TWPro.twpro_jobsCalculated[TWPro.twpro_jobs[twpro_i].shortName]=false;
								}
							}
						}
						TWPro.twpro_cache_deleted = null;
					}	
				}
				TWPro.twpro_calculateJobs(conf_func);
			}
			else{
				for (var twpro_wear in Wear.wear) {
					TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
					var twpro_item = Wear.wear[twpro_wear].obj;
					if(TWPro.cacheMethod == "WebStorage"){
					  var twpro_item_cached = (twproCache.getValue("twpro_inv."+Wear.wear[twpro_wear].obj.item_id));
					}
					else{
					  var twpro_item_cached = (TWPro.bigCache["twpro_inv."+Wear.wear[twpro_wear].obj.item_id]);
					}
					if (!twpro_item_cached){
						//alert("item not cached "+twpro_item.item_id+":"+twpro_item.name);
					}
					else{
						if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
						if(TWPro.cacheMethod == "WebStorage"){
						  TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = twproCache.getValue("twpro_inv."+twpro_item.item_id).twpro_jobbonus;
						}
						else{
						  TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = TWPro.bigCache["twpro_inv."+twpro_item.item_id].twpro_jobbonus;
						}
						twpro_item.twpro_wearable = twpro_item_cached.twpro_wearable;
						twpro_item.type = twpro_item_cached.type;
						if(twpro_item_cached.damage) twpro_item.damage.damage_min = twpro_item_cached.damage.damage_min;
						if(twpro_item_cached.damage) twpro_item.damage.damage_max = twpro_item_cached.damage.damage_max;
						twpro_item.twpro_bonus = TWPro.twpro_itemStorage[twpro_item.item_id].twpro_bonus = twpro_item_cached.twpro_bonus;
//						twpro_item.twpro_bonus = twpro_item_cached.twpro_bonus;
						if(twpro_item_cached.twpro_jobbonus) twpro_item.twpro_jobbonus = twpro_item_cached.twpro_jobbonus;
						if(twpro_item_cached.twpro_jobbonus) twpro_item.twpro_jobbonus.regeneration = twpro_item_cached.twpro_jobbonus.regeneration;
						twpro_item.speed = twpro_item_cached.speed;
						twpro_item.twpro_weapon = twpro_item_cached.twpro_weapon;
					}
				}
				var bagitems = Bag.getInstance().items;
				for (var twpro_bag in bagitems) {
					TWPro.twpro_prepareItem(bagitems[twpro_bag].obj);
					var twpro_item = bagitems[twpro_bag].obj;
					if(TWPro.cacheMethod == "WebStorage"){
					  var twpro_item_cached = (twproCache.getValue("twpro_inv."+twpro_item.item_id));
					}
					else{
					  var twpro_item_cached = (TWPro.bigCache["twpro_inv."+twpro_item.item_id]);
					}
					if (!twpro_item_cached){
						//alert("item not cached "+twpro_item.item_id+":"+twpro_item.name);
					}
					else{
						if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
						if(TWPro.cacheMethod == "WebStorage"){
						  TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = twproCache.getValue("twpro_inv."+twpro_item.item_id).twpro_jobbonus;
						}
						else{
						  TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = TWPro.bigCache["twpro_inv."+twpro_item.item_id].twpro_jobbonus;
						}
						twpro_item.twpro_wearable = twpro_item_cached.twpro_wearable;
						twpro_item.type = twpro_item_cached.type;
						if(twpro_item_cached.damage) twpro_item.damage.damage_min = twpro_item_cached.damage.damage_min;
						if(twpro_item_cached.damage) twpro_item.damage.damage_max = twpro_item_cached.damage.damage_max;
						twpro_item.twpro_bonus = TWPro.twpro_itemStorage[twpro_item.item_id].twpro_bonus = twpro_item_cached.twpro_bonus;
//						twpro_item.twpro_bonus = twpro_item_cached.twpro_bonus;
						if(twpro_item_cached.twpro_jobbonus) twpro_item.twpro_jobbonus = twpro_item_cached.twpro_jobbonus;
						if(twpro_item_cached.twpro_jobbonus) twpro_item.twpro_jobbonus.regeneration = twpro_item_cached.twpro_jobbonus.regeneration;
						twpro_item.speed = twpro_item_cached.speed;
						twpro_item.twpro_weapon = twpro_item_cached.twpro_weapon;
					}
				}
				if(!TWPro.twpro_re_att){
				  TWPro.twpro_re_att = {};
				  TWPro.twpro_re_skill = {};
				  TWPro.twpro_re_skills = {};
				  for(var twpro_attname in Character.skill_names){
					var skill_names = Character.skill_names[twpro_attname];
					TWPro.twpro_re_skills[twpro_attname] = new RegExp(skill_names.join('|'), 'g');
					TWPro.twpro_re_att[twpro_attname] = new RegExp(twpro_attname, 'g');
					for(var i=0; i<skill_names.length; i++){
						TWPro.twpro_re_skill[skill_names[i]] = new RegExp(skill_names[i], 'g');
					}
				  }
				}
				var re_char_skills = /Character\.skills\./g,
				re_char_attributes = /Character\.attributes\./g,
				regen_exist = -1;
				for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
				  var twpro_job = TWPro.twpro_jobs[twpro_i];
				  if(TWPro.disabledJobs[twpro_job.shortName] || (twpro_job.shortName == "regeneration" && (regen_exist=twpro_i)) || (TWPro.twpro_fortbattle && TWPro.twpro_fortbattle != twpro_job.shortName) || TWPro.twpro_jobsCalculated[twpro_job.shortName] == true) continue;
						TWPro.twpro_jobsCalculated[twpro_job.shortName] = true;
				  twpro_job.twpro_skill = eval(twpro_job.twpro_calculation);
				  if(!isFinite(twpro_job.twpro_skill) || isNaN(twpro_job.twpro_skill)) twpro_job.twpro_skill = 0;
				  twpro_job.twpro_skills = twpro_job.twpro_calculation.replace(/\s*\+\s*\d+$/, '').replace(re_char_skills, '').replace(re_char_attributes, '');
				  twpro_job.twpro_attributes = twpro_job.twpro_skills.replace(re_char_skills, '');
				  for (var twpro_attname in Character.skill_names) {
					twpro_job.twpro_attributes = twpro_job.twpro_attributes.replace(TWPro.twpro_re_skills[twpro_attname], twpro_attname);
				  }
				  if(TWPro.cacheMethod == "WebStorage" && twproCache.getValue("TWPro.twpro_jobs."+twpro_job.shortName)){
					TWPro.twpro_jobs[twpro_i].twpro_aps = (twproCache.getValue("TWPro.twpro_jobs."+twpro_job.shortName)["twpro_aps"]+twpro_job.twpro_skill);
				  }
				  else if(TWPro.cacheMethod == "IndexedDB" && TWPro.bigCache["TWPro.twpro_jobs."+twpro_job.shortName]){
					TWPro.twpro_jobs[twpro_i].twpro_aps = (TWPro.bigCache["TWPro.twpro_jobs."+twpro_job.shortName]["twpro_aps"]+twpro_job.twpro_skill);
				  }
				  else{
						TWPro.twpro_jobsCalculated[twpro_job.shortName] = false;
						if(!TWPro.twpro_NewjobsDetected) TWPro.twpro_NewjobsDetected = [];
						TWPro.twpro_NewjobsDetected.push(twpro_job.name);
					new HumanMessage(TWPro.lang.CACHENEWJOBDETECTED.replace('%1', twpro_job.name));
				    continue;
				  }
				  if(twpro_job.shortName == "speed") {
					if(TWPro.cacheMethod == "WebStorage"){
					  TWPro.twpro_jobs[twpro_i].twpro_aps = ((twproCache.getValue("TWPro.twpro_jobs."+twpro_job.shortName)["twpro_aps"]+((twpro_job.twpro_skill-twproCache.getValue("TWPro.twpro_jobs."+twpro_job.shortName)["twpro_speed_skillride"])*twproCache.getValue("TWPro.twpro_jobs."+twpro_job.shortName)["twpro_speedfactor"]))+100);
					}
					else{
					  TWPro.twpro_jobs[twpro_i].twpro_aps = ((TWPro.bigCache["TWPro.twpro_jobs."+twpro_job.shortName]["twpro_aps"]+((twpro_job.twpro_skill-TWPro.bigCache["TWPro.twpro_jobs."+twpro_job.shortName]["twpro_speed_skillride"])*TWPro.bigCache["TWPro.twpro_jobs."+twpro_job.shortName]["twpro_speedfactor"]))+100);
					}
				  }
				  if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
					if(TWPro.cacheMethod == "WebStorage"){
					  TWPro.twpro_jobs[twpro_i].twpro_aps_fb = twproCache.getValue("TWPro.twpro_jobs."+twpro_job.shortName)["twpro_aps_fb"];
					}
					else{
					  TWPro.twpro_jobs[twpro_i].twpro_aps_fb = TWPro.bigCache["TWPro.twpro_jobs."+twpro_job.shortName]["twpro_aps_fb"];
					}
				  }
				  if(!TWPro.twpro_jobs[twpro_i].twpro_bestCombi) TWPro.twpro_jobs[twpro_i].twpro_bestCombi={};
				  if(!TWPro.twpro_jobs[twpro_i].twpro_bestStats) TWPro.twpro_jobs[twpro_i].twpro_bestStats={};
				  if(TWPro.cacheMethod == "WebStorage"){
					TWPro.twpro_jobs[twpro_i].twpro_bestCombi = twproCache.getValue("TWPro.twpro_jobs."+TWPro.twpro_jobs[twpro_i].shortName)["twpro_bestCombi"];
				  }
				  else{
					TWPro.twpro_jobs[twpro_i].twpro_bestCombi = TWPro.bigCache["TWPro.twpro_jobs."+TWPro.twpro_jobs[twpro_i].shortName]["twpro_bestCombi"];
				  }
				  for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
					if(TWPro.cacheMethod == "WebStorage"){
					  var tmp_beststats=twproCache.getValue("TWPro.twpro_jobs."+TWPro.twpro_jobs[twpro_i].shortName)["twpro_bestStats"];
					}
					else{
					  var tmp_beststats=TWPro.bigCache["TWPro.twpro_jobs."+TWPro.twpro_jobs[twpro_i].shortName]["twpro_bestStats"];
					}
					TWPro.twpro_jobs[twpro_i].twpro_bestStats[TWPro.twpro_bag.twpro_types[twpro_j]] = tmp_beststats[TWPro.twpro_bag.twpro_types[twpro_j]];
					if(!TWPro.twpro_setItemsCalc)TWPro.twpro_setItemsCalc={};
					if(TWPro.cacheMethod == "WebStorage"){
					  TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_j]] = twproCache.getValue("TWPro.twpro_setItemsCalc."+TWPro.twpro_bag.twpro_types[twpro_j]);
					}
					else{
					  TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_j]] = TWPro.bigCache["TWPro.twpro_setItemsCalc."+TWPro.twpro_bag.twpro_types[twpro_j]];
					}
				  }
				}
				if(!TWPro.disabledJobs['regeneration'] && !TWPro.twpro_fortbattle && TWPro.twpro_jobsCalculated['regeneration'] != true){
							TWPro.twpro_jobsCalculated['regeneration'] = true;
				  if(TWPro.cacheMethod == "WebStorage"){
					var tmp_cached_regeneration = twproCache.getValue("TWPro.twpro_jobs.regeneration");
				  }
				  else{
					var tmp_cached_regeneration = TWPro.bigCache["TWPro.twpro_jobs.regeneration"];
				  }
				  tmp_cached_regeneration.name = TWPro.lang.REGENERATION;
				  if(regen_exist == -1){
					TWPro.twpro_jobs.push(tmp_cached_regeneration);
					var twpro_update_job = TWPro.twpro_jobs[TWPro.twpro_jobs.length-1];
				  }
				  else {
					TWPro.twpro_jobs[regen_exist] = tmp_cached_regeneration;
					var twpro_update_job = TWPro.twpro_jobs[regen_exist];
				  }
				  twpro_update_job.twpro_aps = Math.round((twpro_update_job.maxlifes+(((Character.skills.health-twpro_update_job.twpro_regeneration_skillhealth)*(Character.characterClass=='soldier'?(PremiumBoni.hasBonus('character')?20:15):10))+((Character.level-twpro_update_job.twpro_regeneration_level)*10)))*TWPro.twpro_sleeperBonus(twpro_update_job.sleepCount));
				}
				if(TWPro.cacheMethod == "WebStorage"){
				  TWPro.twpro_setItemsEffect = twproCache.getValue("TWPro.twpro_setItemsEffect");
				}
				else{
				  TWPro.twpro_setItemsEffect = TWPro.bigCache["TWPro.twpro_setItemsEffect"];
				}
				if (TWPro.twpro_setItemsEffect && !TWPro.twpro_setBonusParsed) {
				  for (var twpro_itemSet in TWPro.twpro_setBonus) {
					var twpro_itemSetBouns = TWPro.twpro_setBonus[twpro_itemSet];
					for (var twpro_j = 2; twpro_j < twpro_itemSetBouns.length; twpro_j++) {
					  twpro_setitembonus = twpro_itemSetBouns[twpro_j];
					  if(TWPro.cacheMethod == "WebStorage"){
						if(twproCache.getValue("TWPro.twpro_setBonus."+twpro_itemSet)[twpro_j]) twpro_setitembonus.parsedBonus = twproCache.getValue("TWPro.twpro_setBonus."+twpro_itemSet)[twpro_j]["parsedBonus"];
					  }
					  else{
						if(TWPro.bigCache["TWPro.twpro_setBonus."+twpro_itemSet][twpro_j]) twpro_setitembonus.parsedBonus = TWPro.bigCache["TWPro.twpro_setBonus."+twpro_itemSet][twpro_j]["parsedBonus"];
					  }
					}
				  }
				}
				TWPro.twpro_invHash = TWPro.twpro_invHashTest.join(',');
				TWPro.twpro_skillsHash = TWPro.twpro_skillsHashTest;
				TWPro.twpro_calculated = true;
//				TWPro.twpro_calculated_by_cache = true;

				if(TWPro.twpro_NewjobsDetected && TWPro.twpro_NewjobsDetected.length>0){
						TWPro.twpro_cache_status();
				}

				TWPro.twpro_sortJobs();
				TWPro.twpro_insertListItems();
				document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
				$("twpro_useful").style.display = "block";	
				if(typeof conf_func == "function") conf_func();

			}
		}


	function twpro_insertListItems() {
		if (TWPro.twpro_failure) return;
		
		var twpro_jobList = document.getElementById('twpro_jobList'),
			jobsort = TWPro.twpro_jobsort,
			twpro_jobElement, twpro_apstmp, extra;
			if(TWPro.settings_prefs['splitFortbattle']=='true' && TWPro.settings_prefs['splitFortbattle_subMenu']=='true'){
			   storeoptions_att={};
			   storeoptions_def={};
			}
			
		for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
			var twpro_job = TWPro.twpro_jobs[twpro_i];
			var twpro_aktuelleap = twpro_job.twpro_skill - twpro_job.malus;
			var twpro_setCounter = new Object();
			for(var twpro_wear in Wear.wear){
				if((Wear.wear[twpro_wear].obj.twpro_bonus || Wear.wear[twpro_wear].obj.twpro_weapon) && Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName]){
				  twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName];
				}
				if(Wear.wear[twpro_wear].obj.set != null){
				  if(twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]==undefined){
					twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] = 1;
				  }
				  else {
					twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]++;
				  }
				}
			}
			for(var twpro_set in twpro_setCounter){
				if(twpro_setCounter[twpro_set]>=2 && TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName]){
					twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
				}
			}
			twpro_jobElement = document.createElement('option');
			
				var n = 1;
					
				if(Character.characterClass == 'worker' && twpro_job.shortName == 'construct'){
					n = PremiumBoni.hasBonus('character') ? 1.10 : 1.05;
				}
				twpro_aktuelleap = Math.floor(n*twpro_aktuelleap);

			if ( jobsort == 'xp' ) {
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].experience + ' xp';
			}
			else if ( jobsort ==  'wages' ) { 
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].wages + ' $';
			}
			else if ( jobsort ==  'luck' ) { 
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemin + ' - ' + TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemax + ' $';
			}
			else if ( jobsort ==  'danger' ) { 
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].danger + ' /!\\';
			}
			else if ( jobsort ==  'comb' ) {
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].jobrank + '%';
			}
			else {
				extra = '';
			}
//			twpro_apstmp = eval(twpro_job.twpro_aps - (twpro_job.malus<0?twpro_job.malus:0));
			twpro_apstmp = eval(TWPro.twpro_jobValues[twpro_job.shortName].laborp - (twpro_job.malus<0?twpro_job.malus:0));
//			twpro_apstmp = TWPro.twpro_jobValues[twpro_job.shortName].laborp;

			twpro_jobElement.value = twpro_i;
			twpro_jobElement.id = "twpro_jobOption_"+twpro_job.shortName;
			var twpro_strreplace = twpro_job.name.replace(/&#039;/g,"\'");
			var twpro_strreplace_end = '';
			if(TWPro.settings_prefs['splitFortbattle']=='true' && (twpro_job.shortName.match(/twpro_fortatt_/) || twpro_job.shortName.match(/twpro_fortdef_/))){
			  twpro_strreplace_end = TWPro.lang.FBTAGS[0][twpro_strreplace.charAt(twpro_strreplace.length-3)]+"|"+TWPro.lang.FBTAGS[1][twpro_strreplace.charAt(twpro_strreplace.length-1)];
			  twpro_strreplace = ' \u25B7'+twpro_strreplace.slice(0,twpro_strreplace.length-3);
			}
			if(twpro_job.shortName != "speed" && twpro_job.shortName != "regeneration" && !twpro_job.shortName.match(/twpro_fortatt/) && !twpro_job.shortName.match(/twpro_fortdef/)){
				if (TWPro.twpro_jobValues[twpro_job.shortName].experience < 0) {
					extra = '';
				}
				twpro_jobElement.appendChild(document.createTextNode(((twpro_strreplace.length > 25) ? (unescape(twpro_strreplace.substr(0, 23)) + '...') : unescape(twpro_strreplace)) + ' (' + eval(twpro_apstmp - 1) + ' / '+ eval(twpro_aktuelleap - 1) +' '+TWPro.lang.LABORP +')'+extra));
			}
			else if(twpro_job.shortName == "speed" || twpro_job.shortName == "regeneration"){
				if(twpro_job.shortName == "speed"){
					twpro_aktuelleap = Math.round(100*Character.default_speed/Character.speed);
					if(!isFinite(twpro_aktuelleap)) twpro_aktuelleap = 100;
					twpro_aktuelleap = twpro_aktuelleap + "%"
				}
				else if(twpro_job.shortName == "regeneration") twpro_aktuelleap = Math.round(eval(twpro_job.twpro_calculation));
				twpro_jobElement.appendChild(document.createTextNode(((twpro_strreplace.length > 25) ? (unescape(twpro_strreplace.substr(0, 23)) + '...') : unescape(twpro_strreplace)) + ' (' + eval(twpro_apstmp - 1) + ' / '+ twpro_aktuelleap + ')'));
			}
			else{
				twpro_jobElement.appendChild(document.createTextNode(((twpro_strreplace.length > 25) ? (unescape(twpro_strreplace.substr(0, 23)) + '...') : unescape(twpro_strreplace))+ twpro_strreplace_end + ' (' + Math.floor((25+Math.pow((Character.skills.leadership*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+twpro_job.twpro_aps_fb["sk2"]), 0.4)+Math.pow((twpro_job.shortName.match(/twpro_fortatt/)?Character.skills.endurance:Character.skills.hide)+twpro_job.twpro_aps_fb["sk3"], 0.4)+Math.pow(Character.skills.aim+twpro_job.twpro_aps_fb["sk0"], 0.4))*100)/100 + ' | ' + Math.floor((10+Math.pow((Character.skills.leadership*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+twpro_job.twpro_aps_fb["sk2"]), 0.4)+Math.pow((twpro_job.shortName.match(/twpro_fortatt/)?Character.skills.endurance:Character.skills.hide)+twpro_job.twpro_aps_fb["sk3"], 0.4)+Math.pow(Character.skills.dodge+twpro_job.twpro_aps_fb["sk1"], 0.4))*100)/100 + ' | ' + ((9+Character.level)+(Character.skills.health+twpro_job.twpro_aps_fb["sk4"])*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?2:1.5):1))*10 +')'));
			}
			twpro_jobElement.name=twpro_strreplace+twpro_strreplace_end;
			twpro_jobElement.onmouseover = function(){twpro_specialMessage_save=$("twpro_specialMessage").innerHTML;$("twpro_specialMessage").innerHTML = this.name;};
			twpro_jobElement.onmouseout = function(){if($("twpro_specialMessage").textContent==this.name)$("twpro_specialMessage").innerHTML = twpro_specialMessage_save;};
			twpro_jobElement.oncontextmenu=function(){return false;}
			if(TWPro.settings_prefs['splitFortbattle']=='true' && TWPro.settings_prefs['splitFortbattle_subMenu']=='true' && twpro_jobElement.id=="twpro_jobOption_twpro_fortatt"){
				twpro_jobElement.innerHTML+=" <b>["+TWPro.lang.FBCOMBOFAVORITE+"]</b>";
				twpro_jobElement.oncontextmenu=function(){
					switch_fortatt();
					return false;
				}
			}
			if(TWPro.settings_prefs['splitFortbattle']=='true' && TWPro.settings_prefs['splitFortbattle_subMenu']=='true' && twpro_jobElement.id=="twpro_jobOption_twpro_fortdef"){
				twpro_jobElement.innerHTML+=" <b>["+TWPro.lang.FBCOMBOFAVORITE+"]</b>";
				twpro_jobElement.oncontextmenu=function(){
					switch_fortdef();
					return false;
				}
			}

			if (twpro_apstmp > 0) {
				if (twpro_aktuelleap <= 0) {
					twpro_jobElement.style.backgroundColor='rgb(230, 235, 108)'; // yellow
				}
				else {
					twpro_jobElement.style.backgroundColor = 'rgb(160, 218, 120)'; // green
				}
				twpro_jobList.appendChild(twpro_jobElement);
			}
			else if (!TWPro.twpro_preference('Hide_unjobs')) {
				twpro_jobElement.style.backgroundColor = 'rgb(232, 150, 120)'; // red
				twpro_jobList.appendChild(twpro_jobElement);
			}
			if(TWPro.settings_prefs['splitFortbattle']=='true' && TWPro.settings_prefs['splitFortbattle_subMenu']=='true' && document.getElementById('twpro_jobOption_twpro_fortatt') && twpro_jobElement.id.match(/twpro_jobOption_twpro_fortatt_/)){
				storeoptions_att[twpro_jobElement.id]=twpro_jobElement;
				twpro_jobList.removeChild(twpro_jobElement);
			}
			if(TWPro.settings_prefs['splitFortbattle']=='true' && TWPro.settings_prefs['splitFortbattle_subMenu']=='true' && document.getElementById('twpro_jobOption_twpro_fortdef') && twpro_jobElement.id.match(/twpro_jobOption_twpro_fortdef_/)){
				storeoptions_def[twpro_jobElement.id]=twpro_jobElement;
				twpro_jobList.removeChild(twpro_jobElement);
			}
		}
		function switch_fortatt(){
			if(document.getElementById('twpro_jobOption_twpro_fortatt')){
				if(document.getElementById('twpro_jobOption_twpro_fortatt').nextSibling && document.getElementById('twpro_jobOption_twpro_fortatt').nextSibling.id.match(/twpro_jobOption_twpro_fortatt_/)){
					for(att_option in storeoptions_att){
					  document.getElementById('twpro_jobList').removeChild(storeoptions_att[att_option]);
					}
				}
				else{
//					if(document.getElementById('twpro_jobOption_twpro_fortatt').nextSibling){
					insertbefore_element=document.getElementById('twpro_jobOption_twpro_fortatt').nextSibling;
					for(att_option in storeoptions_att){
					  document.getElementById('twpro_jobList').insertBefore(storeoptions_att[att_option],insertbefore_element);
					}
/*					}
					else{
					for(att_option in storeoptions_att){
						//alert(storeoptions_att[att_option]);
						document.getElementById('twpro_jobList').appendChild(storeoptions_att[att_option]);
					}
					}
*/				}
			}
		}
		function switch_fortdef(){
			if(document.getElementById('twpro_jobOption_twpro_fortdef')){
				if(document.getElementById('twpro_jobOption_twpro_fortdef').nextSibling && document.getElementById('twpro_jobOption_twpro_fortdef').nextSibling.id.match(/twpro_jobOption_twpro_fortdef_/)){
					for(def_option in storeoptions_def){
					  document.getElementById('twpro_jobList').removeChild(storeoptions_def[def_option]);
					}
				}
				else{
//					if(document.getElementById('twpro_jobOption_twpro_fortdef').nextSibling){
					insertbefore_element=document.getElementById('twpro_jobOption_twpro_fortdef').nextSibling;
					for(def_option in storeoptions_def){
					  document.getElementById('twpro_jobList').insertBefore(storeoptions_def[def_option],insertbefore_element);
					}
/*					}
					else{
					for(def_option in storeoptions_def){
						//alert(storeoptions_def[def_option]);
						document.getElementById('twpro_jobList').appendChild(storeoptions_def[def_option]);
					}
					}
*/				}
			}
		}
		if(TWPro.settings_prefs['splitFortbattle']=='true' && TWPro.settings_prefs['splitFortbattle_subMenu']=='true'){
			document.getElementById('twpro_jobList').onkeypress=function(event){
				if(event.charCode==32 || event.charCode==49){
					switch_fortatt();
				}
				if(event.charCode==32 || event.charCode==50){
					switch_fortdef();
				}
			}
		}
	}

	// bestimmt Sortierreihenfolge der Jobs in der Liste
	function twpro_sortJobs(){
		if (TWPro.twpro_failure) return;
		var sortby = TWPro.twpro_jobsort, twpro_jobValues = TWPro.twpro_jobValues;

		twpro_jobValues.regeneration.jobrank = twpro_jobValues.regeneration.experience = twpro_jobValues.regeneration.wages = twpro_jobValues.regeneration.luckvaluemax = twpro_jobValues.regeneration.danger = -2;

		var moneyFactor = 1 + (PremiumBoni.hasBonus('money')?.50:0), multiplier, twpro_apstmp;
		TWPro.debug.unknown_jobs = {};
		TWPro.debug.unknown_jobs_count = 0;
		for(var i=0; i<TWPro.twpro_jobs.length; i++){
				if(!(twpro_job=TWPro.twpro_jobs[i])) continue;

				var n = 1;

				if (!TWPro.twpro_jobValues[twpro_job.shortName]) {
					TWPro.twpro_jobValues[twpro_job.shortName] = {
						"erfahrung": 0,
						"lohn": 0,
						"glueck": 0,
						"gefahr": 0
					};
					TWPro.debug.unknown_jobs[i] = twpro_job.shortName;
					TWPro.debug.unknown_jobs_count++;
				}

				
				if(Character.characterClass == 'worker' && twpro_job.shortName == 'construct'){
					n = PremiumBoni.hasBonus('character') ? 1.10 : 1.05;
				}
				else if(Character.characterClass == 'duelist' && twpro_job.shortName == 'speed'){
					n = PremiumBoni.hasBonus('character') ? 1.20 : 1.10;
				}
//				TWPro.twpro_jobValues[twpro_job.shortName].laborp = twpro_job.twpro_aps = Math[twpro_job.shortName == 'speed' ? "round" : "floor"](n*twpro_job.twpro_aps);
//				TWPro.twpro_jobValues[twpro_job.shortName].laborp = Math[twpro_job.shortName == 'speed' ? "round" : "floor"](n*twpro_job.twpro_aps);
//				TWPro.twpro_jobValues[twpro_job.shortName].laborp = Math[n != 1 ? "floor" : "round"](n*Math[twpro_job.shortName == 'speed' ? "round" : "floor"](twpro_job.twpro_aps));
//				TWPro.twpro_jobValues[twpro_job.shortName].laborp = Math[n != 1 ? "round" : "round"](n*Math[twpro_job.shortName == 'speed' ? "round" : "floor"](twpro_job.twpro_aps));
//				TWPro.twpro_jobValues[twpro_job.shortName].laborp = Math[(twpro_job.shortName == 'speed' && (n==1 || n!=1 && parseInt(twpro_job.twpro_aps) != twpro_job.twpro_aps)) ? "round" : "floor"](n*twpro_job.twpro_aps);
				TWPro.twpro_jobValues[twpro_job.shortName].laborp = Math[(twpro_job.shortName == 'speed' && parseInt(twpro_job.twpro_aps) != twpro_job.twpro_aps) ? "round" : "floor"](n*twpro_job.twpro_aps);
				twpro_apstmp = TWPro.twpro_jobs[i].twpro_aps - (twpro_job.malus<0?twpro_job.malus:0);
				multiplier = Math.pow(Math.max(1,twpro_apstmp),.2) * moneyFactor;
				TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemin = Math.floor(5 * (.9 * TWPro.twpro_jobValues[twpro_job.shortName].glueck + 5) * multiplier);
				TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemax = Math.floor(15 * (.9 * TWPro.twpro_jobValues[twpro_job.shortName].glueck + 5) * multiplier);
				TWPro.twpro_jobValues[twpro_job.shortName].wages = Math.round((.9 * TWPro.twpro_jobValues[twpro_job.shortName].lohn + 5) * multiplier  * 2);
				if(TWPro.twpro_jobValues[twpro_job.shortName].gefahr < 0) {
				  TWPro.twpro_jobValues[twpro_job.shortName].danger = -1;
				  TWPro.twpro_jobValues[twpro_job.shortName].jobrank = -1;
				 }
				else{
				  TWPro.twpro_jobValues[twpro_job.shortName].danger = Math.round((8*Math.pow(TWPro.twpro_jobValues[twpro_job.shortName].gefahr,1.35)) / (Math.max(1,twpro_apstmp)+3));
				
				// no max % per value
//				TWPro.twpro_jobValues[twpro_job.shortName].jobrank = Math.round((TWPro.multipliers.xp * TWPro.twpro_jobValues[twpro_job.shortName].erfahrung + (TWPro.multipliers.wages * TWPro.twpro_jobValues[twpro_job.shortName].lohn + TWPro.multipliers.luck * TWPro.twpro_jobValues[twpro_job.shortName].glueck ) * pow(Math.max(1,twpro_apstmp),0.2) + TWPro.multipliers.danger * (100 - (TWPro.twpro_jobValues[twpro_job.shortName].gefahr/((Math.max(1,twpro_apstmp)+3)/8))))/Math.max(1,(TWPro.multipliers.xp+TWPro.multipliers.wages+TWPro.multipliers.luck+TWPro.multipliers.danger)));
				// max 100% per value
//				TWPro.twpro_jobValues[twpro_job.shortName].jobrank = Math.round((TWPro.multipliers.xp * TWPro.twpro_jobValues[twpro_job.shortName].erfahrung + TWPro.multipliers.wages * Math.min(100, TWPro.twpro_jobValues[twpro_job.shortName].lohn * pow(Math.max(1,twpro_apstmp),0.2)) + TWPro.multipliers.luck * Math.min(100, TWPro.twpro_jobValues[twpro_job.shortName].glueck * pow(Math.max(1,twpro_apstmp),0.2)) + TWPro.multipliers.danger * (100 - Math.min(100, TWPro.twpro_jobValues[twpro_job.shortName].gefahr/((Math.max(1,twpro_apstmp)+3)/8))))/Math.max(1,(TWPro.multipliers.xp+TWPro.multipliers.wages+TWPro.multipliers.luck+TWPro.multipliers.danger)));
				// max 100% + 1/10 per value
				TWPro.twpro_jobValues[twpro_job.shortName].jobrank = Math.round((TWPro.multipliers.xp * TWPro.twpro_jobValues[twpro_job.shortName].erfahrung + TWPro.multipliers.wages * (TWPro.twpro_jobValues[twpro_job.shortName].lohn * pow(Math.max(1,twpro_apstmp),0.2) > 100 ? 100 + (TWPro.twpro_jobValues[twpro_job.shortName].lohn * pow(Math.max(1,twpro_apstmp),0.2)-100)/10 : TWPro.twpro_jobValues[twpro_job.shortName].lohn * pow(Math.max(1,twpro_apstmp),0.2)) + TWPro.multipliers.luck * (TWPro.twpro_jobValues[twpro_job.shortName].glueck * pow(Math.max(1,twpro_apstmp),0.2) > 100 ? 100 + (TWPro.twpro_jobValues[twpro_job.shortName].glueck * pow(Math.max(1,twpro_apstmp),0.2)-100)/10 : TWPro.twpro_jobValues[twpro_job.shortName].glueck * pow(Math.max(1,twpro_apstmp),0.2)) + TWPro.multipliers.danger * (100 - Math.min(100, TWPro.twpro_jobValues[twpro_job.shortName].gefahr/((Math.max(1,twpro_apstmp)+3)/8))))/Math.max(1,(TWPro.multipliers.xp+TWPro.multipliers.wages+TWPro.multipliers.luck+TWPro.multipliers.danger)));
				}
				if(Character.characterClass == 'worker'){
					n = PremiumBoni.hasBonus('character') ? 1.10 : 1.05;
				}
				TWPro.twpro_jobValues[twpro_job.shortName].experience = Math.round(TWPro.twpro_jobValues[twpro_job.shortName].erfahrung*2*n);

				//	TWPro.twpro_jobValues[twpro_job.shortName].twpro_apstmp = twpro_apstmp;
				if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)){
					TWPro.twpro_jobValues[twpro_job.shortName] = {
						"experience": -2, "laborp": 0, "wages":-2, "luckvaluemin":-2, "luckvaluemax":-2, "jobrank":-2, "danger":-2
					};
				}

		}

			if (TWPro.debug.unknown_jobs_count) {
				var jobIds = [];
				for(var job_id in TWPro.debug.unknown_jobs) {
					jobIds.push(TWPro.debug.unknown_jobs[job_id]);
				}
				new HumanMessage("TW Pro did not recognise " + TWPro.debug.unknown_jobs_count + " jobs, please report this error.<br>Unknown jobs:" + jobIds.join(", "));
				TWPro.debug_log(TWPro.debug.unknown_jobs);
			}


		var sortfunc = function(twpro_a, twpro_b){
			var twpro_a_str = twpro_a.name,
				twpro_b_str = twpro_b.name;
			if(sortby == 'name'){
				return twpro_a_str.localeCompare(twpro_b_str);
			}
			if(sortby == 'comb'){
				return (twpro_jobValues[twpro_a.shortName].jobrank == twpro_jobValues[twpro_b.shortName].jobrank) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].jobrank - twpro_jobValues[twpro_a.shortName].jobrank);
			}
			if(sortby == 'xp'){
				return (twpro_jobValues[twpro_a.shortName].experience == twpro_jobValues[twpro_b.shortName].experience) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].experience - twpro_jobValues[twpro_a.shortName].experience);
			} if(sortby == 'wages'){
				return (twpro_jobValues[twpro_a.shortName].wages == twpro_jobValues[twpro_b.shortName].wages) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].wages - twpro_jobValues[twpro_a.shortName].wages);
			} if(sortby == 'luck'){
				return (twpro_jobValues[twpro_a.shortName].luckvaluemax == twpro_jobValues[twpro_b.shortName].luckvaluemax) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].luckvaluemax - twpro_jobValues[twpro_a.shortName].luckvaluemax);
			} if(sortby == 'danger'){
				return (twpro_jobValues[twpro_a.shortName].danger == twpro_jobValues[twpro_b.shortName].danger) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_a.shortName].danger - twpro_jobValues[twpro_b.shortName].danger);
			}  else {
				return (twpro_jobValues[twpro_a.shortName][sortby] == twpro_jobValues[twpro_b.shortName][sortby]) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName][sortby] - twpro_jobValues[twpro_a.shortName][sortby]);
			}
		}
		TWPro.twpro_jobs.sort(sortfunc);
		//if(sortby == 'danger') TWPro.twpro_jobs.reverse();
	}

	function twpro_sortPlus(twpro_a, twpro_b) {
		if (TWPro.twpro_failure) return 0;
		var twpro_a_num = parseInt(twpro_a.substring(twpro_a.search(/;"/)+4, twpro_a.search(/ /)));
		var twpro_b_num = parseInt(twpro_b.substring(twpro_b.search(/;"/)+4, twpro_b.search(/ /)));
		return twpro_b_num - twpro_a_num;
	}

		function twpro_validSet(obj_set_obj){
			var valid = true,
				obj_set=obj_set_obj,
				disabledSets = TWPro.prefs["disabledSets"],
				wearable = true;
			if(!(obj_set_obj = typeof obj_set_obj == "string")){
				wearable = TWPro.twpro_wearItem(obj_set);
				obj_set = obj_set.set;
				TWPro.set_names[obj_set.key] = obj_set.name;
				obj_set = obj_set.key;
			}
			if(obj_set == 'season_set' || obj_set == 'set_sleeper' || obj_set == 'collector_set'){
				valid = false;//No bonuses, don't calculate
			}
			else if(obj_set == 'set_dancer'){
				//valid = Character.characterSex == 'female';
			}
			else if(obj_set == 'set_farmer'){
				
			}
			else if(obj_set == 'set_gentleman'){
				//valid = Character.characterSex == characterSex;
			}
			else if(obj_set == 'set_indian'){
				
			}
			else if(obj_set == 'set_mexican'){
				
			}
			else if(obj_set == 'set_pilgrim_female'){
				//valid = Character.characterSex == 'female'; // valid for both sex since belt addition
			}
			else if(obj_set == 'set_pilgrim_male'){
				//valid = Character.characterSex == 'male'; // valid for both sex since belt addition
			}
			else if(obj_set == 'set_quackery'){
				
			}
			else if(obj_set == 'fireworker_set'){
				valid = false;//Handled by TWPro.twpro_prepareItem
			}
			else if(obj_set == 'gold_set'){
				
			}
			else if(obj_set == 'greenhorn_set'){
				
			}
			else if (obj_set == "tw_times_set") {
				valid = false;// Only 1 item, should be handeld by TWPro.twpro_prepareItem (todo)	
			}
			else {
				if(!top.twpro_unknown_sets) top.twpro_unknown_sets = [];
				top.twpro_unknown_sets.push(obj_set);
				valid = false;//unknown set
			}
			return valid && (obj_set_obj || (disabledSets+'').indexOf('|'+obj_set+'|') == -1) && wearable;
		}


	function twpro_initializeItems(twpro_place, twpro_itemlist) {
		if (TWPro.twpro_failure) return;
		var twpro_i = 0;
		if (twpro_place == 'wear') {
			for (var twpro_wear in Wear.wear) {
				Wear.wear[twpro_wear].obj.twpro_place = twpro_place;
				Wear.wear[twpro_wear].obj.twpro_html = document.getElementById('char_' + Wear.wear[twpro_wear].obj.type);
				TWPro.twpro_bag.twpro_priceWear += Wear.wear[twpro_wear].obj.sell_price;
				TWPro.twpro_bag.twpro_countType[Wear.wear[twpro_wear].obj.type]++;
				TWPro.twpro_bag.twpro_countType_diff[Wear.wear[twpro_wear].obj.type]++;
				TWPro.twpro_wear_items_list += ';'+Wear.wear[twpro_wear].obj.item_id+';';
				if (Wear.wear[twpro_wear].obj.type == 'yield') {
					TWPro.twpro_bag.twpro_priceYields += Wear.wear[twpro_wear].obj.sell_price;
				}
				else {
					TWPro.twpro_bag.twpro_priceItems += Wear.wear[twpro_wear].obj.sell_price;
				}
				if(TWPro.twpro_jobsUpdateCalc && TWPro.settings_prefs['useCache']!='true'){
					if ((Wear.wear[twpro_wear].obj.set != null) && !TWPro.twpro_setItems_upd[Wear.wear[twpro_wear].obj.item_id] && TWPro.twpro_validSet(Wear.wear[twpro_wear].obj)) {
						TWPro.twpro_setItems_upd[Wear.wear[twpro_wear].obj.item_id] = Wear.wear[twpro_wear].obj;
						TWPro.twpro_setItemsCount[Wear.wear[twpro_wear].obj.set.key]++;
					}
				}
				else{
					if ((Wear.wear[twpro_wear].obj.set != null) && !TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] && TWPro.twpro_validSet(Wear.wear[twpro_wear].obj)) {
						TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] = Wear.wear[twpro_wear].obj;
						TWPro.twpro_setItemsCount[Wear.wear[twpro_wear].obj.set.key]++;
					}
				}
				if (!TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id]) {
					TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id] = 1;
				}
			}
		}
		if (twpro_place == 'bag') {
			var twpro_itemcount;
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				bagitems[twpro_bag].obj.twpro_place = twpro_place;
				bagitems[twpro_bag].obj.twpro_html = bagitems[twpro_bag].bag_item;
				if (bagitems[twpro_bag].count_text) {
					twpro_itemcount = parseInt(bagitems[twpro_bag].count_text.firstChild.data);
				}
				else {
					twpro_itemcount = 1;
				}
				TWPro.twpro_bag.twpro_priceBag += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
				TWPro.twpro_bag.twpro_countType[bagitems[twpro_bag].obj.type] += twpro_itemcount;
				if (TWPro.twpro_wear_items_list.indexOf(';'+bagitems[twpro_bag].obj.item_id+';') == -1) {
				  TWPro.twpro_bag.twpro_countType_diff[bagitems[twpro_bag].obj.type]++;
				}
				if (bagitems[twpro_bag].obj.type == 'yield') {
					TWPro.twpro_bag.twpro_priceYields += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
				}
				else {
					TWPro.twpro_bag.twpro_priceItems += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
				}
				if(TWPro.twpro_jobsUpdateCalc && TWPro.settings_prefs['useCache']!='true'){
					if ((bagitems[twpro_bag].obj.set != null) && !TWPro.twpro_setItems_upd[bagitems[twpro_bag].obj.item_id] && TWPro.twpro_validSet(bagitems[twpro_bag].obj)) {
						TWPro.twpro_setItems_upd[bagitems[twpro_bag].obj.item_id] = bagitems[twpro_bag].obj;
						TWPro.twpro_setItemsCount[bagitems[twpro_bag].obj.set.key]++;
					}
				}
				else{
					if ((bagitems[twpro_bag].obj.set != null) && !TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] && TWPro.twpro_validSet(bagitems[twpro_bag].obj)) {
						TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] = bagitems[twpro_bag].obj;
						TWPro.twpro_setItemsCount[bagitems[twpro_bag].obj.set.key]++;
					}
				}
				if (!TWPro.twpro_invHashTest[bagitems[twpro_bag].obj.item_id]) {
					TWPro.twpro_invHashTest[bagitems[twpro_bag].obj.item_id] = 1;
				}
			}
		}
		else if (twpro_place == 'trader') {
			for (var twpro_obj in twpro_itemlist.items) {
				twpro_itemlist.items[twpro_obj].obj.twpro_place = twpro_place;
				twpro_itemlist.items[twpro_obj].obj.twpro_html = twpro_itemlist.items[twpro_obj].bag_item;
				twpro_itemlist.items[twpro_obj].popup.refresh();
				twpro_i++;
			}
		}
		else if (twpro_place == 'report') {
			for (var twpro_obj in twpro_itemlist.items) {
				if(twpro_itemlist.items[twpro_obj].popup){
					twpro_itemlist.items[twpro_obj].obj.twpro_place = 'trader';
					twpro_itemlist.items[twpro_obj].obj.twpro_html = twpro_itemlist.items[twpro_obj].bag_item;
					twpro_itemlist.items[twpro_obj].popup.refresh();
				}
				twpro_i++;
			}
		}
		else if (twpro_place == 'own') {
			for (var twpro_obj in twpro_itemlist.data) {
				twpro_itemlist.data[twpro_obj].twpro_place = twpro_place;
				twpro_i++;
			}
			for (var twpro_bag in twpro_itemlist.bags) {
				for (var twpro_obj in twpro_itemlist.bags[twpro_bag].items) {
					twpro_itemlist.bags[twpro_bag].items[twpro_obj].obj.twpro_html = twpro_itemlist.bags[twpro_bag].items[twpro_obj].bag_item;
				}
			}
		}
	}

	// ermittelt die optimalen Kleidungsstuecke und errechnet die resultierenden Arbeitspunkte
	function twpro_calculateJobs(conf_func) {
		if (TWPro.twpro_failure) return;
		var twpro_startCalc = new Date().getTime() / 1000;
		var twpro_setitembonus;
		var twpro_setitemjobname;
		for (var twpro_wear in Wear.wear) {
			TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
		}
		var bagitems = Bag.getInstance().items;
		for (var twpro_bag in bagitems) {
			TWPro.twpro_prepareItem(bagitems[twpro_bag].obj);
		}
		TWPro.twpro_calculated = false;

		if(!TWPro.twpro_fortbattle){
			if(TWPro.twpro_jobsUpdateCalc){

				if(TWPro.updateCache==true){
					TWPro.twpro_setItemsCalc = {};
					TWPro.twpro_setItems_upd={};
					TWPro.twpro_setItems_upd = TWPro.twpro_setItems;
					if(TWPro.cacheMethod == "WebStorage"){
					  TWPro.twpro_setItems = twproCache.getValue("TWPro.twpro_setItems");
					}
					else{
					  TWPro.twpro_setItems = TWPro.bigCache["TWPro.twpro_setItems"];
					}

					  TWPro.twpro_setItemsCalc_upd={};
					for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
					TWPro.twpro_setItemsCalc_upd[TWPro.twpro_bag.twpro_types[twpro_j]] = {};
					  if(TWPro.cacheMethod == "WebStorage"){
						TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_j]] = twproCache.getValue("TWPro.twpro_setItemsCalc."+TWPro.twpro_bag.twpro_types[twpro_j]);
					  }
					  else{
						TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_j]] = TWPro.bigCache["TWPro.twpro_setItemsCalc."+TWPro.twpro_bag.twpro_types[twpro_j]];
					  }
					  for (var twpro_id=1;  twpro_id < TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_j]].length; twpro_id++)
					  {
						TWPro.twpro_setItemsCalc_upd[TWPro.twpro_bag.twpro_types[twpro_j]][TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_j]][twpro_id].item_id] = {};
						TWPro.twpro_setItemsCalc_upd[TWPro.twpro_bag.twpro_types[twpro_j]][TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_j]][twpro_id].item_id] = TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_j]][twpro_id];
					  }
					}
				}
				for (var twpro_setItemId in TWPro.twpro_setItems_upd) {
					TWPro.twpro_setItems[twpro_setItemId] = TWPro.twpro_setItems_upd[twpro_setItemId];
				}
			}

		// alle Setberechnungen löschen
			TWPro.twpro_setItemsCalc = {};
			TWPro.twpro_setItemsEffect = false;
//			if(TWPro.twpro_force_setItemsEffect_forCache==true)TWPro.twpro_setItemsEffect = true;
			if(TWPro.updateCache==true){
				TWPro.twpro_invHashCached = '';
				twproCache.setValue("TWPro.twpro_invHash", '');
				TWPro.twpro_setItems_cache = {};
				TWPro.twpro_setItemsCalc_cache = {};
				if(TWPro.cacheMethod == "WebStorage"){
				  twproCache.setValue("TWPro.twpro_setItemsEffect", false);
				}
				else{
				  if(TWPro.bigCache == undefined) TWPro.bigCache={};
				  TWPro.bigCache["TWPro.twpro_setItemsEffect"] = TWPro.twpro_setItemsEffect;				
				}
			}
			for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
				TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_i]] = [null];
				if(TWPro.updateCache==true){
					TWPro.twpro_setItemsCalc_cache[TWPro.twpro_bag.twpro_types[twpro_i]] = [null];
					if(TWPro.cacheMethod == "WebStorage"){
					  twproCache.setValue("TWPro.twpro_setItemsCalc."+TWPro.twpro_bag.twpro_types[twpro_i], [null]);
					}
					else{
					  TWPro.bigCache["TWPro.twpro_setItemsCalc."+TWPro.twpro_bag.twpro_types[twpro_i]] = TWPro.twpro_setItemsCalc_cache[TWPro.twpro_bag.twpro_types[twpro_i]];
					}
				}
			}

			// Check ob Berechnung nötig und Flags setzen --> für 1er Sets müsste hier von >=2 auf >=1 geändert werden

			TWPro.twpro_setCount = {};
			for (var twpro_setItemId in TWPro.twpro_setItems) {
				var twpro_setItem = TWPro.twpro_setItems[twpro_setItemId];
				if(TWPro.updateCache==true) {
				TWPro.twpro_setItems_cache[twpro_setItemId] = {};
				TWPro.twpro_setItems_cache[twpro_setItemId].twpro_wearable = twpro_setItem.twpro_wearable;
				TWPro.twpro_setItems_cache[twpro_setItemId].type = twpro_setItem.type;
				TWPro.twpro_setItems_cache[twpro_setItemId].set = {};
				TWPro.twpro_setItems_cache[twpro_setItemId].set.key = twpro_setItem.set.key;
				}
				if (twpro_setItem.twpro_wearable && TWPro.twpro_setItemsCount[twpro_setItem.set.key] >= 2) {
					TWPro.twpro_setItemsCalc[twpro_setItem.type].push(twpro_setItem);
					TWPro.twpro_setCount[twpro_setItem.set.key] = 0;
					TWPro.twpro_setItemsEffect = true;
					if(TWPro.updateCache==true){
						if(TWPro.twpro_jobsUpdateCalc && TWPro.twpro_setItemsCalc_upd[twpro_setItem.type] && TWPro.twpro_setItemsCalc_upd[twpro_setItem.type][twpro_setItem.item_id]){
							TWPro.twpro_setItemsCalc_cache[twpro_setItem.type].push(TWPro.twpro_setItemsCalc_upd[twpro_setItem.type][twpro_setItem.item_id]);
						}
						else{
							TWPro.twpro_setItemsCalc_cache[twpro_setItem.type].push({"item_id":twpro_setItem.item_id,"type":twpro_setItem.type,"bonus":twpro_setItem.bonus,"twpro_weapon":twpro_setItem.twpro_weapon,"twpro_bonus":twpro_setItem.twpro_bonus,"set":{"key":twpro_setItem.set.key},"sub_type":twpro_setItem.sub_type});
						}			
						if(TWPro.cacheMethod == "WebStorage"){
						  twproCache.setValue("TWPro.twpro_setItemsCalc."+twpro_setItem.type, TWPro.twpro_setItemsCalc_cache[twpro_setItem.type]);
						  twproCache.setValue("TWPro.twpro_setItemsEffect", true);
						}
						else{
						  TWPro.bigCache["TWPro.twpro_setItemsCalc."+twpro_setItem.type] = TWPro.twpro_setItemsCalc_cache[twpro_setItem.type];
						  TWPro.bigCache["TWPro.twpro_setItemsEffect"] = TWPro.twpro_setItemsEffect;
						}
					}
				}
			}
			if(TWPro.updateCache==true){
				if(TWPro.cacheMethod == "WebStorage"){
				  twproCache.setValue("TWPro.twpro_setItems", TWPro.twpro_setItems_cache);
				}
				else{
				  TWPro.bigCache["TWPro.twpro_setItems"] = TWPro.twpro_setItems_cache;
				}
			}
		}
		else if(TWPro.updateCache==true){
			//alert("twpro_setItems from cache");
			if(TWPro.cacheMethod == "WebStorage"){
			  TWPro.twpro_setItems = twproCache.getValue("TWPro.twpro_setItems");
			}
			else{
			  TWPro.twpro_setItems = TWPro.bigCache["TWPro.twpro_setItems"];
			}
			for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
			  if(!TWPro.twpro_setItemsCalc)TWPro.twpro_setItemsCalc={};
			  if(TWPro.cacheMethod == "WebStorage"){
				TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_j]] = twproCache.getValue("TWPro.twpro_setItemsCalc."+TWPro.twpro_bag.twpro_types[twpro_j]);
			  }
			  else{
				TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_j]] = TWPro.bigCache["TWPro.twpro_setItemsCalc."+TWPro.twpro_bag.twpro_types[twpro_j]];
			  }
			}
		}

		if(!TWPro.twpro_re_att){
			TWPro.twpro_re_att = {};
			TWPro.twpro_re_skill = {};
			TWPro.twpro_re_skills = {};
			for(var twpro_attname in Character.skill_names){
				var skill_names = Character.skill_names[twpro_attname];
				TWPro.twpro_re_skills[twpro_attname] = new RegExp(skill_names.join('|'), 'g');
				TWPro.twpro_re_att[twpro_attname] = new RegExp(twpro_attname, 'g');
				for(var i=0; i<skill_names.length; i++){
					TWPro.twpro_re_skill[skill_names[i]] = new RegExp(skill_names[i], 'g');
				}
			}
		}
		var re_char_skills = /Character\.skills\./g,
			re_char_attributes = /Character\.attributes\./g,
			regen_exist = -1;

		if(TWPro.updateCache==true) TWPro.tmp_twpro_jobs_cached = {};

		$("twpro_specialMessage2").innerHTML="";
		var newDiv = document.createElement("div");
		newDiv.style.cssText = "position: relative; font-size: 10px; color:#000000;float:left; color:#ffffff; top: -2px; left: 0px; z-index: 9999; font-weight:normal; text-align:center;height:20px";
		$("twpro_specialMessage2").appendChild(newDiv);
		$("twpro_specialMessage2").lastChild.title = TWPro.lang.ACTIVITIES + " * " + TWPro.lang.ITEMS;

		twpro_loop_nb = 0;
		
		if(TWPro.settings_prefs['safeMode'] == "true" && (!TWPro.twpro_fortbattle || TWPro.settings_prefs['safeMode_FBexcl'] != "true")){
			var maskingDiv = document.getElementById("twpro_maskingDiv");
			if(maskingDiv){
				maskingDiv.style.display = "block";
			}
			else{
				maskingDiv = document.createElement("div");
				maskingDiv.id = "twpro_maskingDiv";
				maskingDiv.style.cssText = "position: absolute; display:block; font-size: 12px; color:#ffffff; top: 1px; left:1px; height: 469px; overflow: hidden; width: 719px; z-index: 999; font-weight:normal;background-color:#000000; opacity:.7; text-align:center;vertical-align:middle;";
				maskingDiv.innerHTML='<div style="position:relative; margin-left:auto; margin-right:auto; top:50%;margin-top:-100px; font-size: 12px; height:200px; width:75%; color:#ffffff; font-weight:bold"><table align="center" border="0" cellpadding="0" cellspacing="0"><tr><td style="font-size: 20px; height:30px; vertical-align:middle; color:red;">'+TWPro.lang.SAFEMODERUNNING+'</td></tr><tr><td align="left">'+TWPro.lang.SAFEMODERUNNINGDESC[0]+'</td></tr><tr><td align="left">'+TWPro.lang.SAFEMODERUNNINGDESC[1]+'</td></tr><tr><td align="left">'+TWPro.lang.SAFEMODERUNNINGDESC[2]+'</td></tr><tr><td align="left">'+TWPro.lang.SAFEMODERUNNINGDESC[3]+'</td></tr><tr><td align="left">'+TWPro.lang.SAFEMODERUNNINGDESC[4]+'</td></tr><tr><td align="right" style="font-size: 10.5px; height:30px; vertical-align:middle;"><a style="background-color:white;" href="javascript:/*Unlock inventory*/void(0);" onclick="document.getElementById(\'twpro_maskingDiv\').style.display = \'none\'">&nbsp;'+TWPro.lang.SAFEMODERUNNINGDESC[5]+'&nbsp;</a></td></tr></table></div>';
				document.getElementById("window_inventory_content").appendChild(maskingDiv);
			}

			TWPro.safemode_completed_or_aborted = function safemode_completed_or_aborted(){
				AjaxWindow.closeAll = twpro_save_AjaxWindowCloseAll;
				AjaxWindow.close = twpro_save_AjaxWindowClose;
				AjaxWindow.show = twpro_save_AjaxWindowShow;
			}

			if(AjaxWindow.close.toString().indexOf("safemode_completed_or_aborted") == -1){
				twpro_save_AjaxWindowCloseAll = AjaxWindow.closeAll;
				eval('AjaxWindow.closeAll =' + AjaxWindow.closeAll.toString().replace("this.close\(window\);","if(window != 'inventory') this.close(window);"));
				twpro_save_AjaxWindowClose = AjaxWindow.close;
				eval('AjaxWindow.close =' + AjaxWindow.close.toString().replace("WEvent.release\(","if(name == 'inventory'){showMessage(\"<center>"+TWPro.lang.AREYOUSURE+"</center>\", \""+TWPro.lang.SAFEMODERUNNING+"\", 300, 100, [['yes', function () {TWPro.safemode_completed_or_aborted();AjaxWindow.close(name, appendName)}], ['no']], false);\nreturn;}\nWEvent.release("));
				twpro_save_AjaxWindowShow = AjaxWindow.show;
				eval('AjaxWindow.show =' + AjaxWindow.show.toString().replace("name.escapeHTML\(\);","name.escapeHTML();\nif(name == 'inventory'){showMessage(\"<center>"+TWPro.lang.AREYOUSURE+"</center>\", \""+TWPro.lang.SAFEMODERUNNING+"\", 300, 100, [['yes', function () {TWPro.safemode_completed_or_aborted();AjaxWindow.show(name, params, appendName, data, windowparam, jsControlled)}], ['no']], false);\nreturn;}"));
			}
				
			twpro_loop = 0;
			twpro_loop_jobs(twpro_loop);
		}
		else{
			for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
				twpro_loop_jobs(twpro_i);
			}
			$("twpro_specialMessage2").lastChild.innerHTML = twpro_loop_nb;
			twpro_loop_jobs_next(twpro_loop_nb);
		}
		
		//for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
		function twpro_loop_jobs(twpro_loop){
			var twpro_i = twpro_loop;
			var twpro_job = TWPro.twpro_jobs[twpro_i];
			if(TWPro.settings_prefs['safeMode'] == "true" && (!TWPro.twpro_fortbattle || TWPro.settings_prefs['safeMode_FBexcl'] != "true")){
				if(TWPro.disabledJobs[twpro_job.shortName] || (twpro_job.shortName == "regeneration" && (regen_exist=twpro_i)) || (TWPro.twpro_fortbattle && TWPro.twpro_fortbattle != twpro_job.shortName) || TWPro.twpro_jobsCalculated[twpro_job.shortName] == true) {
					twpro_loop++;
					if (twpro_loop<TWPro.twpro_jobs.length) {
						//setTimeout(function(){twpro_loop_jobs(twpro_loop)}, 0);
						setZeroTimeout(function(){twpro_loop_jobs(twpro_loop)});
					}
					else{
						twpro_loop_jobs_next(twpro_loop_nb);
					}
					return;
				}
				else{
					twpro_loop_nb++;
				}
			}
			else{
				if(TWPro.disabledJobs[twpro_job.shortName] || (twpro_job.shortName == "regeneration" && (regen_exist=twpro_i)) || (TWPro.twpro_fortbattle && TWPro.twpro_fortbattle != twpro_job.shortName) || TWPro.twpro_jobsCalculated[twpro_job.shortName] == true){
					return;
				}
				else{
					twpro_loop_nb++;
				}
			}		
			twpro_job.twpro_jobid = twpro_i;
			twpro_job.twpro_skill = eval(twpro_job.twpro_calculation);
			if(!isFinite(twpro_job.twpro_skill) || isNaN(twpro_job.twpro_skill)) twpro_job.twpro_skill = 0;
			twpro_job.twpro_skills = twpro_job.twpro_calculation.replace(/\s*\+\s*\d+$/, '').replace(re_char_skills, '').replace(re_char_attributes, '');
			twpro_job.twpro_attributes = twpro_job.twpro_skills.replace(re_char_skills, '');
			for (var twpro_attname in Character.skill_names) {
				twpro_job.twpro_attributes = twpro_job.twpro_attributes.replace(TWPro.twpro_re_skills[twpro_attname], twpro_attname);
			}
		
			// Hier folgt Setberechnung, wenn oben Flag gesetzt wurde
			if (TWPro.twpro_setItemsEffect && !TWPro.twpro_setBonusParsed) {
				for (var twpro_itemSet in TWPro.twpro_setBonus) {
					var twpro_itemSetBouns = TWPro.twpro_setBonus[twpro_itemSet];
					// Berechnung ab hier auch für twpro_j=1 (war vorher 2) um auch 1er Sets zu berücksichtigen)
					for (var twpro_j = 2; twpro_j < twpro_itemSetBouns.length; twpro_j++) {
						twpro_setitembonus = twpro_itemSetBouns[twpro_j];
						twpro_setitemjobname = twpro_job.shortName;
						twpro_setitembonus.parsedBonus[twpro_setitemjobname] = (twpro_job.malus == -1  && twpro_job.shortName != "construct" ? 0 : twpro_setitembonus.jobBonus.all) +
// a vérifier si construction reçoit ou non le bonus all d'un set
//						twpro_setitembonus.parsedBonus[twpro_setitemjobname] = (twpro_job.malus == -1 ? 0 : twpro_setitembonus.jobBonus.all) +
						(!twpro_setitembonus.jobBonus[twpro_setitemjobname] ? 0 : twpro_setitembonus.jobBonus[twpro_setitemjobname]) + TWPro.twpro_testItem(twpro_job, twpro_setitembonus);
			if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
			  for(var i=0; i<5; i++){
				  if(!twpro_setitembonus.parsedBonus_fb) twpro_setitembonus.parsedBonus_fb = {};
				  if(!twpro_setitembonus.parsedBonus_fb[twpro_setitemjobname]) twpro_setitembonus.parsedBonus_fb[twpro_setitemjobname] = {};
//			twpro_setitembonus.parsedBonus_fb[twpro_setitemjobname]["sk"+i] = (twpro_job.malus == -1 ? 0 : twpro_setitembonus.jobBonus.all) +	(!twpro_setitembonus.jobBonus[twpro_setitemjobname] ? 0 : twpro_setitembonus.jobBonus[twpro_setitemjobname]) + twpro_setitembonus.twpro_jobbonus[twpro_job.shortName+'_sk'+i];
//			twpro_setitembonus.parsedBonus_fb[twpro_setitemjobname]["sk"+i] = twpro_setitembonus.twpro_jobbonus[twpro_job.shortName+'_sk'+i];
			twpro_setitembonus.parsedBonus_fb[twpro_setitemjobname]["sk"+i] = twpro_setitembonus.twpro_jobbonus[twpro_job.shortName+'_fb'][1][i];
			  }
			}
					}
				}
			}
			twpro_job.twpro_bestStats = {};
			twpro_job.twpro_bestStats_fb = {};
			for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
				twpro_job.twpro_bestStats[TWPro.twpro_bag.twpro_types[twpro_j]] = 0;
				if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
				  twpro_job.twpro_bestStats_fb[TWPro.twpro_bag.twpro_types[twpro_j]] = {};
				  for(var i=0; i<5; i++){
//					  if(!twpro_job.twpro_bestStats_fb[TWPro.twpro_bag.twpro_types[twpro_j]]) twpro_job.twpro_bestStats_fb[TWPro.twpro_bag.twpro_types[twpro_j]] = {};
					  twpro_job.twpro_bestStats_fb[TWPro.twpro_bag.twpro_types[twpro_j]]["sk"+i] = 0;
				  }
				}
			}
			if (twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
				for (var twpro_wear in Wear.wear) {
					var twpro_item = Wear.wear[twpro_wear].obj;
					if (twpro_wear == "left_arm") {
						if(twpro_item.twpro_bonus || Wear.wear[twpro_wear].obj.set){
//						if(twpro_item.twpro_bonus){
							TWPro.twpro_compareItem(twpro_job, twpro_item);
						}
//						twpro_item.twpro_bonus = true;
//						twpro_item.twpro_weapon = true;
						if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
						twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
						if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
						TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
						twpro_job.twpro_bestStats[twpro_item.type] = 1;
					}
					else{
						TWPro.twpro_compareItem(twpro_job, twpro_item);
					}
				}
				for (var twpro_bag in bagitems) {
					var twpro_item = bagitems[twpro_bag].obj;
					if (bagitems[twpro_bag].obj.type == "left_arm") {
						if(twpro_item.twpro_bonus || bagitems[twpro_bag].obj.set){
//						if(twpro_item.twpro_bonus){
							TWPro.twpro_compareItem(twpro_job, twpro_item);
						}
//						twpro_item.twpro_bonus = true;
//						twpro_item.twpro_weapon = true;

						if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
						twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
						if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
						TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
						twpro_job.twpro_bestStats[twpro_item.type] = 1;
					}
					else{
						TWPro.twpro_compareItem(twpro_job, twpro_item);
					}
				}

			} else if (twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef") {
				for (var twpro_wear in Wear.wear) {
					var twpro_item = Wear.wear[twpro_wear].obj;
					if (twpro_item.sub_type == "shot") {
//						twpro_item.twpro_bonus = true;
//						twpro_item.twpro_weapon = true;
						if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
						twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
						if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
						TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
						twpro_job.twpro_bestStats[twpro_item.type] = 1;
					} else if (twpro_item.sub_type != "hand") {
						TWPro.twpro_compareItem(twpro_job, twpro_item);
					}
				}
				for (var twpro_bag in bagitems) {
					var twpro_item = bagitems[twpro_bag].obj;
					if (twpro_item.sub_type == "shot") {
//						twpro_item.twpro_bonus = true;
//						twpro_item.twpro_weapon = true;
						if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
						twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
						if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
						TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
						twpro_job.twpro_bestStats[twpro_item.type] = 1;
					} else if (twpro_item.sub_type != "hand") {
						TWPro.twpro_compareItem(twpro_job, twpro_item);
					}
				}
			}  else if (twpro_job.shortName == "duelvigor") {
				for (var twpro_wear in Wear.wear) {
					var twpro_item = Wear.wear[twpro_wear].obj;
					if (twpro_item.sub_type == "hand") {
//						twpro_item.twpro_bonus = true;
//						twpro_item.twpro_weapon = true;
						if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
						twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
						if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
						TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
						twpro_job.twpro_bestStats[twpro_item.type] = 1;
					} else if (twpro_item.sub_type != "shot") {
						TWPro.twpro_compareItem(twpro_job, twpro_item);
					}
				}
				for (var twpro_bag in bagitems) {
					var twpro_item = bagitems[twpro_bag].obj;
					if (twpro_item.sub_type == "hand") {
//						twpro_item.twpro_bonus = true;
//						twpro_item.twpro_weapon = true;
						if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
						twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
						if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
						TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
						twpro_job.twpro_bestStats[twpro_item.type] = 1;
					} else if (twpro_item.sub_type != "shot") {
						TWPro.twpro_compareItem(twpro_job, twpro_item);
					}
				}
			} else {
				for (var twpro_wear in Wear.wear) {
					TWPro.twpro_compareItem(twpro_job, Wear.wear[twpro_wear].obj);
				}
				for (var twpro_bag in bagitems) {
					TWPro.twpro_compareItem(twpro_job, bagitems[twpro_bag].obj);
				}
			}
			twpro_job.twpro_aps = twpro_job.twpro_skill - Math.max(0, twpro_job.malus);
			twpro_job.twpro_aps_fb = {sk0:0,sk1:0,sk2:0,sk3:0,sk4:0};
//			twpro_job.twpro_aps = twpro_job.twpro_skill - Math.max(0, twpro_job.malus+1);
				if (twpro_job.shortName == "speed") {
					if (!TWPro.twpro_bestAnimal || Character.characterClass == "greenhorn") {
				/*		for(var twpro_bag in bagitems){
							var twpro_item = bagitems[twpro_bag].obj;
							if (twpro_item.twpro_jobbonus && twpro_item.twpro_jobbonus.speed) {
								twpro_item.twpro_jobbonus.speed = 0;
								TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus.speed = 0;
							}
						}*/
						for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
							twpro_job.twpro_bestStats[TWPro.twpro_bag.twpro_types[twpro_j]] = 0;
						}
						twpro_job.twpro_aps = Character.characterClass == "greenhorn" ? 250 : 100;
					}
					else {
						for (var twpro_type in twpro_job.twpro_bestStats) {
							twpro_job.twpro_aps += twpro_job.twpro_bestStats[twpro_type];
						}
					}
				}
				else {
					for (var twpro_type in twpro_job.twpro_bestStats) {
						twpro_job.twpro_aps += twpro_job.twpro_bestStats[twpro_type];
						if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
						  for(var i=0; i<5; i++){
			//				  if(!twpro_job.twpro_noSetAps_fb) twpro_job.twpro_noSetAps_fb = {};
							  twpro_job.twpro_aps_fb["sk"+i] += twpro_job.twpro_bestStats_fb[twpro_type]["sk"+i];
						  }
						}
					}
				}
			if (TWPro.twpro_setItemsEffect) {
				var twpro_setItem;
				twpro_job.twpro_parsedItemBonus = {};
				twpro_job.twpro_parsedItemBonus_fb = {};
				twpro_job.twpro_bestCombi = {};
				for (var twpro_type in twpro_job.twpro_bestStats) {
					twpro_job.twpro_bestCombi[twpro_type] = 0;
					for (var twpro_j = 1; twpro_j < TWPro.twpro_setItemsCalc[twpro_type].length; twpro_j++) {
						twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_j];
						twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id] = TWPro.twpro_testItem(twpro_job, twpro_setItem);
						if(TWPro.updateCache==true){
							if(!TWPro.twpro_setItemsCalc_cache) TWPro.twpro_setItemsCalc_cache={};
							if(TWPro.cacheMethod == "WebStorage"){
							  TWPro.twpro_setItemsCalc_cache[twpro_type] = twproCache.getValue("TWPro.twpro_setItemsCalc."+twpro_type);
							}
							else{
							  TWPro.twpro_setItemsCalc_cache[twpro_type] = TWPro.bigCache["TWPro.twpro_setItemsCalc."+twpro_type];
							}
						    if(!TWPro.twpro_setItemsCalc_cache[twpro_type][twpro_j]) TWPro.twpro_setItemsCalc_cache[twpro_type][twpro_j] = {};
							TWPro.twpro_setItemsCalc_cache[twpro_type][twpro_j].twpro_jobbonus = twpro_setItem.twpro_jobbonus;
							if(TWPro.cacheMethod == "WebStorage"){
							  twproCache.setValue("TWPro.twpro_setItemsCalc."+twpro_setItem.type, TWPro.twpro_setItemsCalc_cache[twpro_setItem.type]);						
							}
							else{
							  TWPro.bigCache["TWPro.twpro_setItemsCalc."+twpro_setItem.type] = TWPro.twpro_setItemsCalc_cache[twpro_setItem.type];
							}
						}
						if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
						  twpro_job.twpro_parsedItemBonus_fb[twpro_setItem.item_id] = {};
						  for(var i=0; i<5; i++){
//							  if(!twpro_job.twpro_parsedItemBonus_fb[twpro_setItem.item_id]) twpro_job.twpro_parsedItemBonus_fb[twpro_setItem.item_id] = {};
						twpro_job.twpro_parsedItemBonus_fb[twpro_setItem.item_id]["sk"+i] = twpro_setItem.twpro_jobbonus[twpro_job.shortName+'_fb'][1][i];
						  }
						}
					}
				}
				twpro_job.twpro_noSetAps = twpro_job.twpro_aps;
				if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
				  twpro_job.twpro_noSetAps_fb = {};
				  for(var i=0; i<5; i++){
//					  if(!twpro_job.twpro_noSetAps_fb) twpro_job.twpro_noSetAps_fb = {};
					  twpro_job.twpro_noSetAps_fb["sk"+i] = twpro_job.twpro_aps_fb["sk"+i];
				  }
				}
			}
		
			if(TWPro.updateCache==true){
				TWPro.tmp_twpro_jobs_cached[twpro_job.shortName] = {};
				TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_aps"] = (twpro_job.twpro_aps-twpro_job.twpro_skill);
				if(twpro_job.shortName == "speed") {
					TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_speed_skillride"] = twpro_job.twpro_skill;
				}
				if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
					TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_aps_fb"] = twpro_job.twpro_aps_fb;
				}
				TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_bestStats"] = {};
				TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_bestStats"] = twpro_job.twpro_bestStats;
				if (TWPro.twpro_setItemsEffect) {
					TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_bestCombi"] = {};
					TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_bestCombi"] = twpro_job.twpro_bestCombi;
				}
				if(TWPro.cacheMethod == "WebStorage"){
				  twproCache.setValue("TWPro.twpro_jobs."+twpro_job.shortName, TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]);
				}
				else{
				  TWPro.bigCache["TWPro.twpro_jobs."+twpro_job.shortName] = TWPro.tmp_twpro_jobs_cached[twpro_job.shortName];
				}
				if (TWPro.twpro_setItemsEffect && !TWPro.twpro_setBonusParsed) {
					for (var twpro_itemSet in TWPro.twpro_setBonus) {
						var tmp_cached_parsedBonus ={};
						var twpro_itemSetBouns = TWPro.twpro_setBonus[twpro_itemSet];
						for (var twpro_j = 2; twpro_j < twpro_itemSetBouns.length; twpro_j++) {
							twpro_setitembonus = twpro_itemSetBouns[twpro_j];
							tmp_cached_parsedBonus[twpro_j] ={};
							tmp_cached_parsedBonus[twpro_j]["parsedBonus"] ={};
							tmp_cached_parsedBonus[twpro_j]["parsedBonus"]= twpro_setitembonus.parsedBonus;
						}
						if(TWPro.cacheMethod == "WebStorage"){
						  twproCache.setValue("TWPro.twpro_setBonus."+twpro_itemSet, tmp_cached_parsedBonus);
						}
						else{
						  TWPro.bigCache["TWPro.twpro_setBonus."+twpro_itemSet] = tmp_cached_parsedBonus;
						}
					   tmp_cached_parsedBonus = null;
					}
				}
			}

			if(TWPro.settings_prefs['safeMode'] == "true" && (!TWPro.twpro_fortbattle || TWPro.settings_prefs['safeMode_FBexcl'] != "true")){
				twpro_loop++;
				$("twpro_specialMessage2").lastChild.innerHTML = twpro_loop_nb;
				if (twpro_loop<TWPro.twpro_jobs.length) {
					//setTimeout(function(){twpro_loop_jobs(twpro_loop)}, 0);
					setZeroTimeout(function(){twpro_loop_jobs(twpro_loop)});
				}
				else{
					twpro_loop_jobs_next(twpro_loop_nb);
				}
			}
		}

		function twpro_loop_jobs_next(twpro_loop_nb){
			if(!TWPro.disabledJobs['regeneration'] && !TWPro.twpro_fortbattle && TWPro.twpro_jobsCalculated['regeneration'] != true){
				twpro_loop_nb++;
				if(regen_exist == -1){
					twpro_job = TWPro.twpro_bestLifeRestore();
					twpro_job.twpro_jobid = TWPro.twpro_jobs.length;
					twpro_job.twpro_regeneration_skillhealth = (Character.skills.health||0);
					twpro_job.twpro_regeneration_level = Character.level;
					TWPro.twpro_jobs.push(twpro_job);
					if(TWPro.updateCache==true){
						if(TWPro.cacheMethod == "WebStorage"){
						  twproCache.setValue("TWPro.twpro_jobs.regeneration", twpro_job);
						}
						else{
						  TWPro.bigCache["TWPro.twpro_jobs.regeneration"] = twpro_job;
						}
					}
				}
				else {
					TWPro.twpro_jobs[regen_exist] = TWPro.twpro_bestLifeRestore();
					TWPro.twpro_jobs[regen_exist].twpro_regeneration_skillhealth = (Character.skills.health||0);
					TWPro.twpro_jobs[regen_exist].twpro_regeneration_level = Character.level;
					if(TWPro.updateCache==true){
						if(TWPro.cacheMethod == "WebStorage"){
						  twproCache.setValue("TWPro.twpro_jobs.regeneration", TWPro.twpro_jobs[regen_exist]);
						}
						else{
						  TWPro.bigCache["TWPro.twpro_jobs.regeneration"] = TWPro.twpro_jobs[regen_exist];
						}
					}
				}
				$("twpro_specialMessage2").lastChild.innerHTML = twpro_loop_nb;
			}
			$("twpro_specialMessage2").lastChild.innerHTML = twpro_loop_nb;
			var newDiv = document.createElement("div");
			newDiv.style.cssText = "position: relative; font-size: 10px; color:#000000;float:left; color:#ffffff; top: -2px; left: 0px; z-index: 9999; font-weight:normal; text-align:center;height:20px";
			$("twpro_specialMessage2").appendChild(newDiv);
			var total_items = 0;
			for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
				total_items +=TWPro.twpro_bag.twpro_countType_diff[TWPro.twpro_bag.twpro_types[twpro_j]];
				$("twpro_specialMessage2").lastChild.innerHTML = "*" + total_items;
			}
			$("twpro_specialMessage2").lastChild.innerHTML += "=";
			$("twpro_specialMessage2").lastChild.title = TWPro.lang.ACTIVITIES + " * " + TWPro.lang.ITEMS;
			$("twpro_specialMessage2").innerHTML += '<div style="position: relative; font-size: 10px; color:#000000;float:left; color:#ffffff; top: -2px; left: 0px; z-index: 9999; font-weight:normal; text-align:center;height:20px; margin-left:1px">'+($("twpro_specialMessage2").firstChild.innerHTML*total_items)+'</div>';
			$("twpro_specialMessage2").lastChild.title = TWPro.lang.ACTIVITIES + " * " + TWPro.lang.ITEMS;
			$("twpro_specialMessage2").innerHTML += '<div style="position: relative; font-size: 10px; color:#000000;float:left; color:#ffffff; top: -2px; left: 0px; z-index: 9999; font-weight:normal; text-align:center;height:20px; margin-left:2px; margin-right:2px">|</div>';

			if (TWPro.twpro_setItemsEffect && twpro_loop_nb>0) {
				twpro_calcSets();
			}
			else{
				twpro_calculate_finish();
			}

			function twpro_calculate_finish(){

				TWPro.twpro_setBonusParsed = true;
				TWPro.twpro_invHash = TWPro.twpro_invHashTest.join(',');
				TWPro.twpro_calculated = true;

				if(TWPro.updateCache==true){
					TWPro.updateCache=false;
					TWPro.twpro_skillsHash = TWPro.twpro_skillsHashTest;
					if(!TWPro.twpro_fortbattle){
					  var twpro_invHashCached_reduced = TWPro.twpro_invHashCached = TWPro.twpro_invHash;
					  var reduced_match = twpro_invHashCached_reduced.match(/\,{4,}1/g)||'';
					  for(var i=1;i<reduced_match.length;i++){
						var reduced_patt=new RegExp("1"+reduced_match[i],'g');
						twpro_invHashCached_reduced=twpro_invHashCached_reduced.replace(reduced_patt, "1["+String(reduced_match[i].length-1)+"]1");
					  }
					  twpro_invHashCached_reduced=twpro_invHashCached_reduced.replace(reduced_match[0], "["+String(reduced_match[0].length-1)+"]1");
					  twproCache.setValue("TWPro.twpro_invHash", twpro_invHashCached_reduced);
					  TWPro.twpro_cache_status();
					}

					for (var twpro_wear in Wear.wear) {
						var tmp_cache = {};
						tmp_cache.name = Wear.wear[twpro_wear].obj.name;
						tmp_cache.twpro_wearable = Wear.wear[twpro_wear].obj.twpro_wearable;
						tmp_cache.type = Wear.wear[twpro_wear].obj.type;
						if(Wear.wear[twpro_wear].obj.damage) tmp_cache.damage = Wear.wear[twpro_wear].obj.damage;
						tmp_cache.twpro_bonus = Wear.wear[twpro_wear].obj.twpro_bonus;
						if(TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus) tmp_cache.twpro_jobbonus = TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus;
						tmp_cache.speed = Wear.wear[twpro_wear].obj.speed;
						tmp_cache.twpro_weapon = Wear.wear[twpro_wear].obj.twpro_weapon;
						if(Wear.wear[twpro_wear].obj.set) tmp_cache.twpro_set = true;
													else tmp_cache.twpro_set = false;
						if(TWPro.cacheMethod == "WebStorage"){
						  twproCache.setValue("twpro_inv."+Wear.wear[twpro_wear].obj.item_id, tmp_cache);
						}
						else{
						  TWPro.bigCache["twpro_inv."+Wear.wear[twpro_wear].obj.item_id] = tmp_cache;
						}
					}

					var bagitems = Bag.getInstance().items;
					for (var twpro_bag in bagitems) {
						tmp_cache = {}
						tmp_cache.name = bagitems[twpro_bag].obj.name;
						tmp_cache.twpro_wearable = bagitems[twpro_bag].obj.twpro_wearable;
						tmp_cache.type = bagitems[twpro_bag].obj.type;
						if(bagitems[twpro_bag].obj.damage) tmp_cache.damage = bagitems[twpro_bag].obj.damage;
						tmp_cache.twpro_bonus = bagitems[twpro_bag].obj.twpro_bonus;
						if(TWPro.twpro_itemStorage[bagitems[twpro_bag].obj.item_id].twpro_jobbonus) tmp_cache.twpro_jobbonus = TWPro.twpro_itemStorage[bagitems[twpro_bag].obj.item_id].twpro_jobbonus;
						tmp_cache.speed = bagitems[twpro_bag].obj.speed;
						tmp_cache.twpro_weapon = bagitems[twpro_bag].obj.twpro_weapon;
						if(bagitems[twpro_bag].obj.set) tmp_cache.twpro_set = true;
												  else tmp_cache.twpro_set = false;
						if(TWPro.cacheMethod == "WebStorage"){
						  twproCache.setValue("twpro_inv."+bagitems[twpro_bag].obj.item_id, tmp_cache);
						}
						else{
						  TWPro.bigCache["twpro_inv."+bagitems[twpro_bag].obj.item_id] = tmp_cache;
						}
					}

					//if(TWPro.cacheMethod == "IndexedDB") twproCache_idb.setValue("TWPro.bigCache", TWPro.bigCache);
					if(TWPro.cacheMethod == "IndexedDB"){
						//twproCache_idb.setValue("TWPro.bigCache", {});
	 					twproCache_idb.delValue("TWPro.bigCache", function () {
						//alert("deleted");
						twproCache_idb.setValue("TWPro.bigCache", TWPro.bigCache);
						});
					}
				}
				
				var newDiv = document.createElement("div");
				newDiv.style.cssText = "position: relative; font-size: 10px; color:#000000;float:left; color:#ffffff; top: -2px; left: 0px; z-index: 9999; font-weight:normal; text-align:center;height:20px; margin-left:2px; margin-right:2px";
				$("twpro_specialMessage2").appendChild(newDiv);
				$("twpro_specialMessage2").lastChild.innerHTML = "|=>";
				$("twpro_specialMessage2").innerHTML += '<div style="position: relative; font-size: 10px; color:#000000;float:left; color:#ffffff; top: -2px; left: 0px; z-index: 9999; font-weight:normal; text-align:center;height:20px">'+parseInt(parseInt($("twpro_specialMessage2").childNodes[2].innerHTML)+($("twpro_specialMessage2").childNodes[6]?parseInt($("twpro_specialMessage2").childNodes[6].innerHTML):0))+'</div>';
				function secondstotime(secs){
					var t = new Date(1970,0,1);
					t.setSeconds(secs);
					var s = t.toTimeString().substr(0,8);
					if(secs > 86399) s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
					return s;
				}
				$("twpro_specialMessage2").lastChild.title = TWPro.lang.TESTSRUN + "<br>"+TWPro.lang.CALCTIME+": <b>" + secondstotime(Math.round((new Date().getTime() / 1000)-twpro_startCalc)) + "</b>"+($("twpro_specialMessage2").lastChild.innerHTML=="0"?"<br><b>"+TWPro.lang.NOJOBSAFFECTED+"</b>":"");

				if(TWPro.settings_prefs['safeMode'] == "true" && (!TWPro.twpro_fortbattle || TWPro.settings_prefs['safeMode_FBexcl'] != "true")){
					TWPro.safemode_completed_or_aborted();
					if($("twpro_maskingDiv")) $("twpro_maskingDiv").style.display = "none";
					try{twpro_blinkTab.blink("TW Pro: "+TWPro.lang.SAFEMODECOMPLETED);}catch(e){};
					new HumanMessage(TWPro.lang.SAFEMODECOMPLETED, {type:'success'});
				}	

				for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
					if(!TWPro.disabledJobs[TWPro.twpro_jobs[twpro_i].shortName]){
						TWPro.twpro_jobsCalculated[TWPro.twpro_jobs[twpro_i].shortName] = true;
					}
				}
				
				TWPro.twpro_sortJobs();
				TWPro.twpro_insertListItems();
				document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
				$("twpro_useful").style.display = "block";
				TWPro.twpro_jobsUpdateCalc = false;
				if(typeof conf_func == "function") conf_func();
			}
	

			function twpro_calcSets() {
				var twpro_testAps_fb = {};
				var twpro_testCombi = {};
				for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
					twpro_testCombi[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
				}

				if(TWPro.twpro_fortbattle && TWPro.updateCache==true){
					TWPro.twpro_setCount = {};
					for (var twpro_setItemId in TWPro.twpro_setItems) {
						var twpro_setItem = TWPro.twpro_setItems[twpro_setItemId];
						if (twpro_setItem.twpro_wearable && TWPro.twpro_setItemsCount[twpro_setItem.set.key] >= 2) {
							TWPro.twpro_setCount[twpro_setItem.set.key] = 0;
						}
					}
				}

				var twpro_setCounter = TWPro.twpro_setCount;
				TWPro.twpro_testnextvalid = [];
				var twpro_testnextvalid = TWPro.twpro_testnextvalid;
				TWPro.twpro_testnextnamen = {};
				var twpro_testnextnamen = TWPro.twpro_testnextnamen;
				for (var twpro_set in twpro_setCounter) {
					twpro_testnextnamen[twpro_set] = twpro_testnextvalid.push(0) - 1;
				}
				var twpro_next = false;
				var twpro_set;

				var newDiv = document.createElement("div");
				newDiv.style.cssText = "position: relative; font-size: 10px; color:#000000;float:left; color:#ffffff; top: -2px; left: 0px; z-index: 9999; font-weight:normal; text-align:center;height:20px";
				$("twpro_specialMessage2").appendChild(newDiv);
				$("twpro_specialMessage2").lastChild.title = TWPro.lang.ITEMSETSCOMBI + " * " + TWPro.lang.ACTIVITIES;

				twpro_combi_nb = 0;
				
				if(TWPro.settings_prefs['safeMode'] == "true" && (!TWPro.twpro_fortbattle || TWPro.settings_prefs['safeMode_FBexcl'] != "true")){
					twpro_loop_sets();
				}
				else{
					do {
						twpro_loop_sets();
					}
					while (twpro_next);
					$("twpro_specialMessage2").lastChild.innerHTML = twpro_combi_nb-1;
					twpro_loop_sets_next();
				}

				function twpro_loop_sets(){
					for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
		//todo			if(twpro_testCombi.body) continue;
						var twpro_job = TWPro.twpro_jobs[twpro_i];
						if((TWPro.twpro_fortbattle && TWPro.twpro_fortbattle != twpro_job.shortName) || TWPro.twpro_jobsCalculated[twpro_job.shortName] == true) continue;
						var twpro_testAps = twpro_job.twpro_noSetAps;
						if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
						  for(var i=0; i<5; i++){
			//				  if(!twpro_testAps_fb) twpro_testAps_fb = {};
							  twpro_testAps_fb["sk"+i] = twpro_job.twpro_noSetAps_fb["sk"+i];
						  }
						}
						var speedfactor = 1;
						if ((twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef" || twpro_job.shortName == "duelvigor") && twpro_testCombi.right_arm) continue;
						if ((twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) && twpro_testCombi.left_arm) continue;
						for (var twpro_type in twpro_testCombi) {
							if (twpro_testCombi[twpro_type]) {
								twpro_testAps -= twpro_job.twpro_bestStats[twpro_type];
								var twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_testCombi[twpro_type]];
								twpro_testAps += twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id];
								if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
								  for(var i=0; i<5; i++){
					//				  if(!twpro_testAps_fb) twpro_testAps_fb = {};
									  twpro_testAps_fb["sk"+i] -= twpro_job.twpro_bestStats_fb[twpro_type]["sk"+i];
									  twpro_testAps_fb["sk"+i] += twpro_job.twpro_parsedItemBonus_fb[twpro_setItem.item_id]["sk"+i];
								  }
								}
								var speedfactor = 1;
							}
						}
						for (var twpro_set in twpro_setCounter) {
							if (twpro_setCounter[twpro_set] > 0) {
								twpro_testAps += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
								if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
								  for(var i=0; i<5; i++){
					//				  if(!twpro_testAps_fb) twpro_testAps_fb = {};
									  twpro_testAps_fb["sk"+i] += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus_fb[twpro_job.shortName]["sk"+i];
								  }
								}
								speedfactor += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].speedBonus/100 || 0;
							}
						}
						if (twpro_job.shortName == "speed") {
							if (Character.characterClass == "greenhorn") {
								twpro_testAps = 250;
								speedfactor = 1;
								} else if (!TWPro.twpro_bestAnimal) twpro_testAps = 100;
							twpro_testAps *= speedfactor;
						}
						if (twpro_testAps > twpro_job.twpro_aps) {
							twpro_job.twpro_aps = twpro_testAps;
							if(TWPro.updateCache==true && twpro_job.shortName == "speed"){
							  twpro_job.twpro_speedfactor = speedfactor;
							}
							if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
							  for(var i=0; i<5; i++){
				//				  if(!twpro_job.twpro_noSetAps_fb) twpro_job.twpro_noSetAps_fb = {};
								  twpro_job.twpro_aps_fb["sk"+i] = twpro_testAps_fb["sk"+i];
							  }
							}
							for (var twpro_type in twpro_testCombi) {
								twpro_job.twpro_bestCombi[twpro_type] = twpro_testCombi[twpro_type];
							}
						}
					}
					do {
						//TWPro.anzahl3++;
						twpro_next = false;
						for (var twpro_type in twpro_testCombi) {
							var twpro_setItemsCalcType = TWPro.twpro_setItemsCalc[twpro_type];
							var twpro_testCombiType = twpro_testCombi[twpro_type];
							if (twpro_testCombiType) {
								twpro_set = twpro_setItemsCalcType[twpro_testCombiType].set.key;
								if ((--twpro_setCounter[twpro_set]) == 1) {
									twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
								}
								else {
									twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
								}
							}
							if ((twpro_testCombiType + 1) < twpro_setItemsCalcType.length) {
								twpro_set = twpro_setItemsCalcType[++twpro_testCombi[twpro_type]].set.key;
								if ((++twpro_setCounter[twpro_set]) == 1) {
									twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
								}
								else {
									twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
								}
								twpro_next = true;
								break;
							}
							else {
								twpro_testCombi[twpro_type] = 0;
							}
						}
					}
					while (twpro_next && twpro_testnextvalid.join('') > 0);
				
					if(TWPro.settings_prefs['safeMode'] == "true" && (!TWPro.twpro_fortbattle || TWPro.settings_prefs['safeMode_FBexcl'] != "true")){
						twpro_combi_nb++;
						if (twpro_next) {
							//console.log(twpro_combi_nb+"+"+JSON.stringify(twpro_testCombi)+"+"+twpro_next);
							$("twpro_specialMessage2").lastChild.innerHTML = twpro_combi_nb;
							//setTimeout(function(){twpro_loop_sets()}, 0);
							setZeroTimeout(function(){twpro_loop_sets()});
						}
						else{
							twpro_loop_sets_next();
							//console.log(twpro_combi_nb);
						}
					}
					else{
						twpro_combi_nb++;
						//console.log(twpro_combi_nb+"+"+JSON.stringify(twpro_testCombi)+"+"+twpro_next);
					}
				}
				
				function twpro_loop_sets_next(){
					var newDiv = document.createElement("div");
					newDiv.style.cssText = "position: relative; font-size: 10px; color:#000000;float:left; color:#ffffff; top: -2px; left: 0px; z-index: 9999; font-weight:normal; text-align:center;height:20px";
					$("twpro_specialMessage2").appendChild(newDiv);
					$("twpro_specialMessage2").lastChild.innerHTML = "*" + $("twpro_specialMessage2").firstChild.innerHTML + "=";
					$("twpro_specialMessage2").lastChild.title = TWPro.lang.ITEMSETSCOMBI + " * " + TWPro.lang.ACTIVITIES;
					$("twpro_specialMessage2").innerHTML += '<div style="position: relative; font-size: 10px; color:#000000;float:left; color:#ffffff; top: -2px; left: 0px; z-index: 9999; font-weight:normal; text-align:center;height:20px; margin-left:1px">'+($("twpro_specialMessage2").lastChild.previousSibling.innerHTML*$("twpro_specialMessage2").firstChild.innerHTML)+'</div>';
					$("twpro_specialMessage2").lastChild.title = TWPro.lang.ITEMSETSCOMBI + " * " + TWPro.lang.ACTIVITIES;

					if(TWPro.updateCache==true){
						for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
							var twpro_job = TWPro.twpro_jobs[twpro_i];
							if(TWPro.disabledJobs[twpro_job.shortName] || twpro_job.shortName == "regeneration" || (TWPro.twpro_fortbattle && TWPro.twpro_fortbattle != twpro_job.shortName) || TWPro.twpro_jobsCalculated[twpro_job.shortName] == true) continue;
							TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_aps"] = (twpro_job.twpro_aps-twpro_job.twpro_noSetAps+TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_aps"]);
							if(twpro_job.shortName == "speed") {
							  TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_aps"] = (twpro_job.twpro_aps-100);
							  TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_speedfactor"] = (twpro_job.twpro_speedfactor||(Character.characterClass == "greenhorn"?0:1));
							}
							if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
							  TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_aps_fb"] = twpro_job.twpro_aps_fb;
							}
							TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]["twpro_bestCombi"] = twpro_job.twpro_bestCombi;
							if(TWPro.cacheMethod == "WebStorage"){
							  twproCache.setValue("TWPro.twpro_jobs."+twpro_job.shortName, TWPro.tmp_twpro_jobs_cached[twpro_job.shortName]);
							}
							else{
							  TWPro.bigCache["TWPro.twpro_jobs."+twpro_job.shortName] = TWPro.tmp_twpro_jobs_cached[twpro_job.shortName];
							}
						}
					}
				
					twpro_calculate_finish();
				}
			}
		}
	}
	
	function twpro_prepareItem(twpro_item, twpro_from) {
		try {
			if (TWPro.twpro_failure) return;
			var twpro_storedItem;
			if (!(twpro_storedItem=TWPro.twpro_itemStorage[twpro_item.item_id])) {
				TWPro.twpro_itemStorage[twpro_item.item_id] = {};
				twpro_storedItem = TWPro.twpro_itemStorage[twpro_item.item_id];
			}
			else {
				if ((twpro_item.twpro_bonus = twpro_storedItem.twpro_bonus) || (twpro_item.twpro_weapon = twpro_storedItem.twpro_weapon)) {
					if(twpro_storedItem.twpro_jobbonus) twpro_item.twpro_jobbonus = twpro_storedItem.twpro_jobbonus;
					else twpro_item.twpro_jobbonus = {};
				}
				twpro_item.twpro_wearable = twpro_storedItem.twpro_wearable;
				twpro_item.twpro_set = twpro_storedItem.twpro_set;
				return;
			}
			twpro_item.twpro_wearable = TWPro.twpro_wearItem(twpro_item);
			/*if (twpro_item.set && twpro_item.set.key == "set_sleeper") {
				twpro_item.twpro_bonus = true;
				twpro_item.twpro_jobbonus = {};
				twpro_storedItem.twpro_jobbonus = {};
			}
			else */if (twpro_item["short"] == "bucket_fire") {
				twpro_item.twpro_bonus = true;
				twpro_item.twpro_weapon = false;
				twpro_item.twpro_jobbonus = {"fire": 15};
				twpro_storedItem.twpro_jobbonus = {"fire": 15};
				TWPro.set_names.fireworker_set = twpro_item.set.name;
			} else {
				var speed=Math.round(100/twpro_item.speed-100);
				if(!isFinite(speed) || isNaN(speed)) speed = 0;
				var twpro_i = 0;
				if (twpro_item.bonus.skills.length == undefined) {
					for (var twpro_skillname in twpro_item.bonus.skills) {
						twpro_i++;
					}
					speed += twpro_item.bonus.skills.ride*1||0;
				}
				if (twpro_item.bonus.attributes.length == undefined) {
					for (var twpro_attname in twpro_item.bonus.attributes) {
						twpro_i++;
					}
					speed += twpro_item.bonus.attributes.flexibility*1||0;
				}

				if (twpro_item.type == "right_arm" || twpro_item.type == "left_arm"){
					twpro_item.twpro_weapon = true;
					if(!twpro_item.twpro_jobbonus)twpro_item.twpro_jobbonus = {};
					if(!twpro_storedItem.twpro_jobbonus)twpro_storedItem.twpro_jobbonus = {};
				}
				else{
					twpro_item.twpro_weapon = false;
					}
				if (twpro_i > 0) {
					twpro_item.twpro_bonus = true;
					twpro_item.twpro_jobbonus = {};
					twpro_storedItem.twpro_jobbonus = {};
				}
				else {
					twpro_item.twpro_bonus = false;
				}
				if(speed > 0){
					twpro_item.twpro_jobbonus = {"speed": speed};
					twpro_storedItem.twpro_jobbonus = {"speed": speed};
					twpro_item.twpro_bonus = true;
					if (twpro_item.type == "animal") {
						if(speed > TWPro.twpro_bestAnimal) TWPro.twpro_bestAnimal = speed;
					}
				}
				if (twpro_item.damage && twpro_item.twpro_wearable && twpro_from != 'trader') {
					var damage_type = twpro_item.type;
					if (twpro_item.sub_type) {
						damage_type += '_' + twpro_item.sub_type;
					}
					if (twpro_item.damage.damage_min > TWPro.damage_min[damage_type]) TWPro.damage_min[damage_type] = twpro_item.damage.damage_min;
					if (twpro_item.damage.damage_max > TWPro.damage_max[damage_type]) TWPro.damage_max[damage_type] = twpro_item.damage.damage_max;
					if ((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 > TWPro.damage_average[damage_type]) TWPro.damage_average[damage_type] = (twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2;
				}
			}
			twpro_storedItem.twpro_bonus = twpro_item.twpro_bonus;
			twpro_storedItem.twpro_weapon = twpro_item.twpro_weapon;
			twpro_storedItem.twpro_wearable = twpro_item.twpro_wearable;
			twpro_storedItem.name = twpro_item.name;
			twpro_storedItem.bonus = twpro_item.bonus;
			twpro_storedItem.item_id = twpro_item.item_id;
			twpro_storedItem.type = twpro_item.type;
			twpro_storedItem.sub_type = twpro_item.sub_type;
				if (twpro_item.damage) {
			twpro_storedItem.damage = twpro_item.damage;
			}
			if(twpro_item.set){
			    twpro_storedItem.twpro_set = true;
			    twpro_storedItem.twpro_setKey = twpro_item.set.key;
			}
			else{
			    twpro_storedItem.twpro_set = false;
			}
		} catch (e) {
			new HumanMessage("TW Pro error, twpro_prepareItem: "+e+"<br />"+(twpro_item&&twpro_item.name));
		}
	}

	function twpro_wearItem(twpro_item) {
		if (TWPro.twpro_failure) return false;
		if ((twpro_item.characterClass != null) && (twpro_item.characterClass != Character.characterClass)) {
			return false;
		}
		if ((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease[twpro_item.type] - Character.itemLevelRequirementDecrease['all']) > Character.level)) {
			return false;
		}
		if ((twpro_item.characterSex != null) && ((twpro_item.characterSex != Character.characterSex) || (Character.characterClass == 'greenhorn'))) {
			return false;
		}
		if (twpro_item.type == "recipe") {
			return false;
		}
		return true;
	}

	function twpro_compareItem(twpro_job, twpro_item) {
		if (TWPro.twpro_failure) return;
		var twpro_aktplus = TWPro.twpro_testItem(twpro_job, twpro_item);
		if (twpro_item.twpro_bonus || twpro_item.twpro_weapon) {
			twpro_item.twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
			//if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
			TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
			if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
			  if(!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName+'_fb']) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName+'_fb'] = [[0,0,0,0,0], [0,0,0,0,0]];
			  for(var i=0; i<5; i++){
				TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName+'_fb'][0][i] = twpro_item.twpro_jobbonus[twpro_job.shortName+'_fb'][0][i];
				TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName+'_fb'][1][i] = twpro_item.twpro_jobbonus[twpro_job.shortName+'_fb'][1][i];
			  }
			}
		}
		if (twpro_aktplus >= twpro_job.twpro_bestStats[twpro_item.type] && twpro_item.twpro_wearable) {
//todo		if (twpro_aktplus >= twpro_job.twpro_bestStats[twpro_item.type] && twpro_item.twpro_wearable && twpro_item.type !="body") {
			twpro_job.twpro_bestStats[twpro_item.type] = twpro_aktplus;
			if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
			  for(var i=0; i<5; i++){
//				  if(!twpro_job.twpro_noSetAps_fb) twpro_job.twpro_noSetAps_fb = {};
				  twpro_job.twpro_bestStats_fb[twpro_item.type]["sk"+i] = twpro_item.twpro_jobbonus[twpro_job.shortName+'_fb'][1][i];
			  }
			}
		}
	}

	function twpro_testItem(twpro_job, twpro_item) {
		if (TWPro.twpro_failure) return 0;
		if (twpro_job.shortName == "speed") {
			if (twpro_item.twpro_jobbonus && twpro_item.twpro_jobbonus.speed) {
				return twpro_item.twpro_jobbonus.speed;
			} else {
				return 0;
			}
		}
		if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
		  if (!twpro_item.twpro_bonus && !twpro_item.jobBonus && !twpro_item.twpro_weapon) {
			  twpro_item.twpro_jobbonus = {};
			  //for(var i=0; i<5; i++){
//			  twpro_item.twpro_jobbonus[twpro_job.shortName+'_sk'+i] = 0;
			  //twpro_item.twpro_jobbonus[twpro_job.shortName+'_fb'][1][i] = 0;
			  if(!twpro_item.twpro_jobbonus[twpro_job.shortName+'_fb']) twpro_item.twpro_jobbonus[twpro_job.shortName+'_fb'] = [[0,0,0,0,0], [0,0,0,0,0]];
			  //}
		  }
		}
		if (!twpro_item.twpro_bonus && !twpro_item.jobBonus && !twpro_item.twpro_weapon) {
			return 0;
		}
		
		if(twpro_item.type == "right_arm" && ((twpro_job.shortName == "duelvigor" && twpro_item.sub_type != "hand") || ((twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef") && twpro_item.sub_type != "shot"))) return 0;
	
		if (TWPro.twpro_itemStorage[twpro_item.item_id]) {
			if (TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] != undefined) {
				return TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName];
			}
		}

		var twpro_aktskills = twpro_job.twpro_skills;
		var twpro_aktattributes = twpro_job.twpro_attributes;
		if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)) {
			var twpro_split_aktscores = twpro_aktskills.split(' + ');
			twpro_aktskills = twpro_aktskills.replace(/\d+ \* /gi, '1 * ').replace(/Math.pow/gi, '').replace(/Character.skills\["\w+"\]/g, 0).replace(/[\+\/]\([\d\/\.]+\)/g, '*1').replace(/, 0.4/g, '*1');
			var twpro_split_aktskills = twpro_aktskills.split(' + ');
			var twpro_aktscore = 0;
			for(var i=0; i<twpro_split_aktscores.length; i++){
			  twpro_aktskill_to_Att = twpro_split_aktscores[i].match(/"(\w+)"/);
			  if(twpro_item.bonus.skills.length !== 0){
				  for (var twpro_skillname in twpro_item.bonus.skills) {
					  var native_skill=new RegExp('Character.skills\\["'+twpro_skillname+'"\\]','g');
					  twpro_split_aktscores[i] = twpro_split_aktscores[i].replace(native_skill, Character.skills[twpro_skillname]).replace(TWPro.twpro_re_skill[twpro_skillname], (twpro_item.bonus.skills[twpro_skillname]+(twpro_item.bonus.attributes[TWPro.skill_to_AttNum[twpro_skillname][0]]||0)));
					  twpro_split_aktskills[i] = twpro_split_aktskills[i].replace(TWPro.twpro_re_skill[twpro_skillname], (twpro_item.bonus.skills[twpro_skillname]+(twpro_item.bonus.attributes[TWPro.skill_to_AttNum[twpro_skillname][0]]||0)));
				  }
			  }
			  if(twpro_aktskill_to_Att){
				var native_skill=new RegExp('Character.skills\\["'+twpro_aktskill_to_Att[1]+'"\\]','g');
				twpro_split_aktscores[i] = twpro_split_aktscores[i].replace(native_skill, Character.skills[twpro_aktskill_to_Att[1]]).replace(TWPro.twpro_re_skill[twpro_aktskill_to_Att[1]], (twpro_item.bonus.attributes[TWPro.skill_to_AttNum[twpro_aktskill_to_Att[1]][0]]||0));
				twpro_split_aktskills[i] = twpro_split_aktskills[i].replace(TWPro.twpro_re_skill[twpro_aktskill_to_Att[1]], (twpro_item.bonus.attributes[TWPro.skill_to_AttNum[twpro_aktskill_to_Att[1]][0]]||0));
			  }
			  if(!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
			  if(!twpro_item.twpro_jobbonus[twpro_job.shortName+'_fb']) twpro_item.twpro_jobbonus[twpro_job.shortName+'_fb'] = [[0,0,0,0,0], [0,0,0,0,0]];
			  twpro_item.twpro_jobbonus[twpro_job.shortName+'_fb'][0][i] = eval((twpro_split_aktscores[i]||0).replace(/Math.pow/gi, '^').replace(/[a-z_]+/gi, '0').replace(/\^/gi, 'Math.pow'));
			  twpro_item.twpro_jobbonus[twpro_job.shortName+'_fb'][1][i] = eval((twpro_split_aktskills[i]||0).replace(/[a-z_]+/gi, '0'));
			  twpro_aktscore = twpro_aktscore + twpro_item.twpro_jobbonus[twpro_job.shortName+'_fb'][0][i];
			}
			var returnValue = twpro_aktscore;
		}
		else if(twpro_job.shortName.indexOf("cj_") != -1 && (twpro_aktskills.indexOf("Math.pow") != -1 || twpro_aktskills.indexOf("Character.skills") != -1 || twpro_aktskills.indexOf("Character.attributes") != -1)) {
		  if(twpro_item.bonus.attributes.length !== 0){
			  for (var twpro_attributename in twpro_item.bonus.attributes) {
				  var native_attribute=new RegExp('Character.attributes\\["'+twpro_attributename+'"\\]','g');
				  twpro_aktskills = twpro_aktskills.replace(native_attribute, Character.attributes[twpro_attributename]).replace(TWPro.twpro_re_att[twpro_attributename], twpro_item.bonus.attributes[twpro_attributename]);
			  }
		  }
		  if(twpro_item.bonus.skills.length !== 0){
			  for (var twpro_skillname in twpro_item.bonus.skills) {
				  var native_skill=new RegExp('Character.skills\\["'+twpro_skillname+'"\\]','g');
				  twpro_aktskills = twpro_aktskills.replace(native_skill, Character.skills[twpro_skillname]).replace(TWPro.twpro_re_skill[twpro_skillname], (twpro_item.bonus.skills[twpro_skillname]+(twpro_item.bonus.attributes[TWPro.skill_to_AttNum[twpro_skillname][0]]||0)));
			  }
		  }
		  for(var twpro_skillname in TWPro.skill_to_AttNum){
			  var native_skill=new RegExp('Character.skills\\["'+twpro_skillname+'"\\]','g');
			  twpro_aktskills = twpro_aktskills.replace(native_skill, Character.skills[twpro_skillname]).replace(TWPro.twpro_re_skill[twpro_skillname], (twpro_item.bonus.attributes[TWPro.skill_to_AttNum[twpro_skillname][0]]||0));
		  }
		  var returnValue = eval((twpro_aktskills||0).replace(/Math.pow/gi, '^').replace(/[a-z_]+/gi, '0').replace(/\^/gi, 'Math.pow'));
		}
		else {
		if(twpro_job.shortName == "regeneration") {
		twpro_aktskills = (Character.characterClass=='soldier'?(PremiumBoni.hasBonus('character')?20:15):10) + " * health";
		twpro_aktattributes = (Character.characterClass=='soldier'?(PremiumBoni.hasBonus('character')?20:15):10) + " * strength";
		}
		  if(twpro_item.bonus.skills.length !== 0){
			  for (var twpro_skillname in twpro_item.bonus.skills) {
				  twpro_aktskills = twpro_aktskills.replace(TWPro.twpro_re_skill[twpro_skillname], twpro_item.bonus.skills[twpro_skillname]);
			  }
		  }
		  for (var twpro_attname in twpro_item.bonus.attributes) {
			  if(!TWPro.twpro_re_att[twpro_attname]) continue;
			  twpro_aktattributes = twpro_aktattributes.replace(TWPro.twpro_re_att[twpro_attname], twpro_item.bonus.attributes[twpro_attname]);
		  }
		  var returnValue = eval(((twpro_aktskills||0)+'+'+(twpro_aktattributes||0)).replace(/[a-z_]+/gi, '0'));
		}
		return isNaN(returnValue) || !isFinite(returnValue) ? 0 : returnValue;
	}

	function twpro_changeItem(change) {

		if (TWPro.twpro_failure) return;
		TWPro.twpro_bag.twpro_priceWear = 0;
		TWPro.twpro_bag.twpro_priceBag = 0;
		TWPro.twpro_bag.twpro_priceItems = 0;
		TWPro.twpro_bag.twpro_priceYields = 0;
		TWPro.twpro_setItems = {};
		for (var twpro_set in TWPro.twpro_setBonus) {
			TWPro.twpro_setItemsCount[twpro_set] = 0;
		}
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
			TWPro.twpro_bag.twpro_countType[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
			TWPro.twpro_bag.twpro_countType_diff[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
		}
		TWPro.twpro_wear_items_list = '';
		TWPro.twpro_invHashTest = [];
		TWPro.twpro_initializeItems('wear', null);
		TWPro.twpro_initializeItems('bag', null);
		//if(change!=-1)TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
		if(document.getElementById('window_inventory_content')) TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
		if(change && change.inv_id && TWPro.searchInventory.cache){
			if(change.deleted) delete TWPro.searchInventory.cache[change.inv_id];
			else TWPro.twpro_searchInventory(true, change.inv_id);
		}
//		if (document.getElementById('twpro_jobList').selectedIndex != 0) { // avoid full bag reload when using set filters
		  TWPro.twpro_changeJob(true);
//		}
		}

	function twpro_changeJob(from_changeItem) {
		if (TWPro.twpro_failure) return;
		if (TWPro.twpro_calculated) {
			//refresh the merchants window
			if(!from_changeItem && document.querySelector('div[class="window css_building_market"], div[class="window css_item_trader"], div[class="window css_building_tailor"], div[class="window css_building_general"], div[class="window css_building_gunsmith"]')){
				var refresh_traders = document.querySelectorAll('div[class="window css_building_market"], div[class="window css_item_trader"], div[class="window css_building_tailor"], div[class="window css_building_general"], div[class="window css_building_gunsmith"]');
				for (var i = 0; i < refresh_traders.length; i++) {
					var refresh_trader = refresh_traders[i];
				eval(unescape(refresh_trader.getElementsByTagName("a")[0].href)); 
				}
			}
			var twpro_jobList = document.getElementById('twpro_jobList');
			var twpro_selected = twpro_jobList.selectedIndex;
			if(twpro_toggle_set != 0 && twpro_selected != 0) TWPro.twpro_show_set(0);
			twpro_jobList.style.backgroundColor = twpro_jobList[twpro_selected].style.backgroundColor;
			var twpro_selectedJob = parseInt(twpro_jobList[twpro_selected].value);
			//alert(twpro_selectedJob);
			var currentJobSkillsDivs = document.getElementById("twpro_currentJobSkills").getElementsByTagName("div");
			for(var i=0;i<currentJobSkillsDivs.length;i++){
				currentJobSkillsDivs[i].innerHTML = "";
				currentJobSkillsDivs[i].title = "";
			}
			if(document.getElementById("twpro_specialMessage")) document.getElementById("twpro_specialMessage").innerHTML = "";
			if(document.getElementById("twpro_specialMessage_fb")) document.getElementById("twpro_specialMessage_fb").innerHTML = "";
			for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
				if (document.getElementById('char_' + TWPro.twpro_bag.twpro_types[twpro_i])) {

					document.getElementById('char_' + TWPro.twpro_bag.twpro_types[twpro_i]).className = 'wear_' + TWPro.twpro_bag.twpro_types[twpro_i];
				}
			}

			TWPro.twpro_refresh_item_popup = false;
			TWPro.twpro_useful_flag = false;

///////////////

			if (twpro_selectedJob >= 0) {
				$("div_equipment").style.display = "none";
				$("twpro_useful").style.display = "none";
				$("twpro_useful").style.outline = "none";
				var twpro_job = TWPro.twpro_jobs[twpro_selectedJob], skill, setCounter_types = ';';

				twpro_job.twpro_setCounter = {};

				for (var twpro_wear in Wear.wear) {
//					Wear.wear[twpro_wear].popup.refresh();
					var twpro_item = Wear.wear[twpro_wear].obj;
					TWPro.twpro_popup(twpro_item);
					if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
						if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
							if(twpro_job.twpro_setCounter[twpro_item.set.key]){
								twpro_job.twpro_setCounter[twpro_item.set.key] ++;
							}
							else{
								twpro_job.twpro_setCounter[twpro_item.set.key] = 1;
							}
							setCounter_types += setCounter_types + twpro_item.type +';';
						}
					}
				}

				var bagitems = Bag.getInstance().items;
				for (var twpro_bag in bagitems) {
//					bagitems[twpro_bag].popup.refresh();
					bagitems[twpro_bag].obj.twpro_html.firstChild.className = '';
					var twpro_item = bagitems[twpro_bag].obj;
					TWPro.twpro_popup(twpro_item);
					if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
						if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
		
							if(setCounter_types.indexOf(";"+twpro_item.type+";") == -1){
							  if(twpro_job.twpro_setCounter[twpro_item.set.key]){
								  twpro_job.twpro_setCounter[twpro_item.set.key] ++;
							  }
							  else{
								  twpro_job.twpro_setCounter[twpro_item.set.key] = 1;
							  }
							}
						}
					}
				}

				for(var allSkills=twpro_job.twpro_skills.replace(/Math.pow\(*/g,'').split(/\s*\+\s*/), i=0, j=0; i<allSkills.length; i++){
					if((skill=allSkills[i].match(/(\d) \* ([a-z_]+)/))){
						var skill_name = skill[2];
						
						for(var k=1; k<=skill[1]*1; k++){
							if(j>=currentJobSkillsDivs.length){
								var div_currentSkills = document.createElement("div");
								div_currentSkills.style.margin = "0";
								div_currentSkills.style.cssFloat = "left";
								document.getElementById("twpro_currentJobSkills").appendChild(div_currentSkills);
							}
							if(TWPro.skill_to_AttNum[skill_name]){
								currentJobSkillsDivs[j++].innerHTML = '<img src="../images/skill/skills_'+TWPro.skill_to_AttNum[skill_name][0]+'.png" width="138" height="55" style="margin-left:-'+(28*TWPro.skill_to_AttNum[skill_name][1])+'px">';
								currentJobSkillsDivs[j-1].title = Character.skill_titles[skill_name];
							}
							else{
								currentJobSkillsDivs[j++].innerHTML = '<img src="../images/attribute_circle/'+skill_name+'.png" width="27" height="27">';
								currentJobSkillsDivs[j-1].title = Character.attribute_titles[skill_name];
							}
							currentJobSkillsDivs[j-1].style.height = "27px";
							currentJobSkillsDivs[j-1].style.width = "27px";
							currentJobSkillsDivs[j-1].style.overflow = "hidden";
						}
					}
				}
				if(j-1<=6){
					$("twpro_currentJobSkills").style.top = "57px";
					$("twpro_currentJobSkills").style.overflow = "visible";
				} else{
					$("twpro_currentJobSkills").style.top = "52px";
					$("twpro_currentJobSkills").style.overflow = "auto";
				}
				if (twpro_job.shortName.match(/twpro_fortatt/)){
					specialMessage_job = 'twpro_fortatt'}
				else if (twpro_job.shortName.match(/twpro_fortdef/)){
					specialMessage_job = 'twpro_fortdef'}
				else{
					specialMessage_job=twpro_job.shortName;
				}
				var specialMessage = TWPro.specialMessages && TWPro.specialMessages[specialMessage_job];
				if(typeof specialMessage != "undefined"){
					if(typeof specialMessage == "function"){
						document.getElementById("twpro_specialMessage").innerHTML = specialMessage(twpro_job);
					}
					else if(typeof specialMessage == "string" || typeof specialMessage == "number"){
						document.getElementById("twpro_specialMessage").innerHTML = specialMessage;
					}
					else{// Should not happen.
						document.getElementById("twpro_specialMessage").innerHTML = specialMessage;
					}
				}
				TWPro.twpro_refresh_item_popup = true;
				TWPro.twpro_highlight(twpro_job);
//				var twpro_aktuelleap = twpro_job.twpro_skill - Math.max(0, twpro_job.malus) - (twpro_job.malus<0?twpro_job.malus:0);
				var twpro_aktuelleap = twpro_job.twpro_skill - Math.max(0, twpro_job.malus) - (twpro_job.malus<0?twpro_job.malus:0)-1;
//				twpro_apstmp = eval(twpro_job.twpro_aps -1 - (twpro_job.malus<0?twpro_job.malus:0));
				twpro_apstmp = eval(TWPro.twpro_jobValues[twpro_job.shortName].laborp -1 - (twpro_job.malus<0?twpro_job.malus:0));
//				twpro_apstmp = TWPro.twpro_jobValues[twpro_job.shortName].laborp;

				if(twpro_job.shortName != "speed" && twpro_job.shortName != "regeneration"){
					var twpro_setCounter = {};
					for (var twpro_wear in Wear.wear) {
						if (Wear.wear[twpro_wear].obj.twpro_bonus || Wear.wear[twpro_wear].obj.twpro_weapon) {
						twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName]||0;
//						twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName];
						}
						if (Wear.wear[twpro_wear].obj.set != null) {
							if (twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] == undefined) {
								twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] = 1;
							}
							else {
								twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]++;
							}
						}
					}
					for (var twpro_set in twpro_setCounter) {
						if (twpro_setCounter[twpro_set] >= 2) {
						twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName] || 0;
//						twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
						}
					}
									var n = 1;
				if(Character.characterClass == 'worker' && twpro_job.shortName == 'construct'){
					n = PremiumBoni.hasBonus('character') ? 1.10 : 1.05;
				}
					if(twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/)){
				twpro_apstmp = Math.round(eval(twpro_job.twpro_aps -1 - (twpro_job.malus<0?twpro_job.malus:0))*1000000);
				twpro_aktuelleap = Math.round(twpro_aktuelleap*1000000);
					document.getElementById('twpro_aktuelleapvalue').innerHTML = Math.round(twpro_apstmp/10000)/100 + ' / '+ eval(Math.round(twpro_aktuelleap/10000)/100);
					}
					else{
				twpro_aktuelleap = Math.floor(n*twpro_aktuelleap);
					document.getElementById('twpro_aktuelleapvalue').innerHTML = twpro_apstmp + ' / '+ eval(twpro_aktuelleap) + ' ' +TWPro.lang.LABORP;
					}
				} else {
					if(twpro_job.shortName == "speed"){
						twpro_aktuelleap = Math.round(100*Character.default_speed/Character.speed);
						if(!isFinite(twpro_aktuelleap)) twpro_aktuelleap = 100;
						twpro_aktuelleap = twpro_aktuelleap + "%"
					}
					else if(twpro_job.shortName == "regeneration") twpro_aktuelleap = Math.round(eval(twpro_job.twpro_calculation));
					document.getElementById('twpro_aktuelleapvalue').innerHTML = twpro_apstmp + ' / '+ twpro_aktuelleap;
					twpro_aktuelleap = parseFloat(twpro_aktuelleap);
				}
				if (twpro_aktuelleap >= 0) {
					if (twpro_aktuelleap >= twpro_apstmp) {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(118, 195, 237)'; // blue
					}
					else {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(160, 218, 120)'; // green
					}
				}
				else {
//					if (twpro_apstmp >= 0) {
					if (twpro_job.twpro_aps > 0) {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(230, 235, 108)'; // yellow
					}
					else {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(232, 150, 120)'; // red
					}
				}
				document.getElementById('twpro_aktuelleapvalue').style.visibility = 'visible';
					if(!from_changeItem){
					  if (typeof twpro_job.west_id != "undefined") {
						  if(TWPro.twpro_maps_jobs.indexOf(';'+twpro_job.west_id+';') == -1){
							  TWPro.twpro_maps_jobs += twpro_job.west_id+";";
							  WMap.updateAllTiles();
							  WMinimap.updateJobs();
							  WMap.updateAllTiles();
						  }
						  document.getElementById("minimap_job_id").value = twpro_job.west_id;
					  }
					  else{
						  document.getElementById("minimap_job_id").value = 0;
					  }
					  if (WMinimap.visible) {
						  WMinimap.update();
					  }
					}
			}
			else {
				$("div_equipment").style.display = "block";
				$("twpro_useful").style.display = "block";
				if(document.getElementById("twpro_aktuelleapvalue")) document.getElementById('twpro_aktuelleapvalue').style.visibility = 'hidden';
				if($("twpro_useful").style.outlineStyle == "inset"){
					for (var twpro_wear in Wear.wear) {
	//					Wear.wear[twpro_wear].popup.refresh();
						var twpro_item = Wear.wear[twpro_wear].obj;
						twpro_item.useful_html = '';
						twpro_item.useful_count = 0;
						TWPro.twpro_popup(twpro_item, 'force_twpro_useful');
					}
					var bagitems = Bag.getInstance().items;
					for (var twpro_bag in bagitems) {
	//					bagitems[twpro_bag].popup.refresh();
						var twpro_item = bagitems[twpro_bag].obj;
						twpro_item.useful_html = '';
						twpro_item.useful_count = 0;

						TWPro.twpro_popup(twpro_item, 'force_twpro_useful');
						bagitems[twpro_bag].obj.twpro_html.firstChild.className = '';
					}
 					TWPro.twpro_useful('force')
				}
				else{
					for (var twpro_wear in Wear.wear) {
						Wear.wear[twpro_wear].obj.useful_html = '';
						Wear.wear[twpro_wear].obj.useful_count = 0;
						Wear.wear[twpro_wear].popup.refresh();
					}
					var bagitems = Bag.getInstance().items;
					for (var twpro_bag in bagitems) {
						bagitems[twpro_bag].obj.useful_html = '';
						bagitems[twpro_bag].obj.useful_count = 0;
						bagitems[twpro_bag].popup.refresh();
						bagitems[twpro_bag].obj.twpro_html.firstChild.className = '';
					}
				}
			}

			TWPro.twpro_bagVis();
			if(twpro_toggle_set != 0){
				var twpro_toggle_set_copy = twpro_toggle_set;
				twpro_toggle_set = 0;
				TWPro.twpro_show_set(twpro_toggle_set_copy)};
			}
	}

	function twpro_highlight(twpro_job, from) {
		if (TWPro.twpro_failure) return;
		var	job_is_fort = twpro_job.shortName.match(/twpro_fortatt/) || twpro_job.shortName.match(/twpro_fortdef/),
			job_is_duel_shot = twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef",
			job_is_duel_hand = twpro_job.shortName == "duelvigor",
			job_is_duel = job_is_duel_shot || job_is_duel_hand;
		if(!twpro_job.twpro_hp){
			var twpro_bestHP = {};	
			for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
				twpro_bestHP[TWPro.twpro_bag.twpro_types[twpro_i]] = {};
				twpro_bestHP[TWPro.twpro_bag.twpro_types[twpro_i]]["health_points"] = -1000;
			}
		}
		for (var twpro_wear in Wear.wear) {
			var twpro_item = Wear.wear[twpro_wear].obj;
			if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
				if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
//					twpro_item.twpro_html.className = twpro_item.twpro_html.className + ' wear_' + twpro_item.type + '_highlight';
					if(twpro_item.twpro_html.className.search(' wear_'+twpro_item.type+'_highlight') == -1) twpro_item.twpro_html.className = twpro_item.twpro_html.className + ' wear_' + twpro_item.type + '_highlight';
					if(!twpro_job.twpro_hp && ((twpro_item.bonus.attributes.strength||0)+(twpro_item.bonus.skills.health||0))>twpro_bestHP[twpro_item.type]["health_points"]){
						twpro_bestHP[twpro_item.type]["health_points"] = ((twpro_item.bonus.attributes.strength||0)+(twpro_item.bonus.skills.health||0));
						if(twpro_item.set){
							twpro_bestHP[twpro_item.type]["setKey"]=twpro_item.set.key;
						}
						else{
							twpro_bestHP[twpro_item.type]["setKey"]=null;
						}
					}
					TWPro.twpro_useful_itemJob = twpro_job;
				}
				else{
					TWPro.twpro_useful_itemJob = 'none';
				}
			}
			else {
				if ((twpro_item.twpro_wearable) &&
					(twpro_item.type != "left_arm" || (job_is_fort && !(twpro_item.damage.damage_min < TWPro.damage_min.left_arm && twpro_item.damage.damage_max < TWPro.damage_max.left_arm)) || (job_is_fort && !((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 < TWPro.damage_average.left_arm)) ||
						(!job_is_fort && twpro_item.twpro_bonus)) &&
//						(!job_is_fort && ((twpro_item.twpro_bonus == true || twpro_item.twpro_weapon == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] > 0)))) &&
					
					(twpro_item.type != "right_arm" || (

						(job_is_duel_shot && !(twpro_item.damage.damage_min < TWPro.damage_min.right_arm_shot && twpro_item.damage.damage_max < TWPro.damage_max.right_arm_shot)) || (job_is_duel_shot && !((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 < TWPro.damage_average.right_arm_shot)) ||
						(job_is_duel_hand && !(twpro_item.damage.damage_min < TWPro.damage_min.right_arm_hand && twpro_item.damage.damage_max < TWPro.damage_max.right_arm_hand)) || (job_is_duel_hand && !((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 < TWPro.damage_average.right_arm_hand))
						) || (!job_is_duel && twpro_item.twpro_bonus)) &&
//						) || (!job_is_duel && ((twpro_item.twpro_bonus == true || twpro_item.twpro_weapon == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] > 0)))) &&
					((twpro_item.type == 'animal' && ((twpro_job.shortName == "regeneration" && twpro_item.twpro_jobbonus && twpro_item.twpro_jobbonus.regeneration >= twpro_job.twpro_bestAnimal) || (twpro_job.shortName != "regeneration" && Math.round(100/twpro_item.speed-100) >= TWPro.twpro_bestAnimal))) || twpro_item.type != 'animal' && (((twpro_item.twpro_bonus == false) && (twpro_job.twpro_bestStats[twpro_item.type] == 0)) || ((twpro_item.twpro_bonus == true || twpro_item.twpro_weapon == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type]))))) {
//					twpro_item.twpro_html.className = twpro_item.twpro_html.className + ' wear_' + twpro_item.type + '_highlight';
					if(twpro_item.twpro_html.className.search(' wear_'+twpro_item.type+'_highlight') == -1) twpro_item.twpro_html.className = twpro_item.twpro_html.className + ' wear_' + twpro_item.type + '_highlight';

				//		alert((twpro_item.bonus.attributes.strength||0)+"+"+(twpro_item.bonus.skills.health||0));
					if(!twpro_job.twpro_hp && ((twpro_item.bonus.attributes.strength||0)+(twpro_item.bonus.skills.health||0))>twpro_bestHP[twpro_item.type]["health_points"]){
						twpro_bestHP[twpro_item.type]["health_points"] = ((twpro_item.bonus.attributes.strength||0)+(twpro_item.bonus.skills.health||0));
						if(twpro_item.set){
							twpro_bestHP[twpro_item.type]["setKey"]=twpro_item.set.key;
						}
						else{
							twpro_bestHP[twpro_item.type]["setKey"]=null;
						}
					}

					TWPro.twpro_useful_itemJob = twpro_job;
				}
				else{
					TWPro.twpro_useful_itemJob = 'none';
				}
			}
			
			if(from != 'twpro_useful' || (from == 'twpro_useful' && TWPro.twpro_useful_flag == true)) Wear.wear[twpro_wear].popup.refresh();
		}

		var bagitems = Bag.getInstance().items;
		for (var twpro_bag in bagitems) {
			var twpro_item = bagitems[twpro_bag].obj;

			if(from != 'twpro_useful' && typeof Wear.wear[twpro_item.type] != 'undefined' && Wear.wear[twpro_item.type].obj.item_id==twpro_item.item_id) continue;

			if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
				if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
					twpro_item.twpro_html.firstChild.className = 'wear_yield_highlight';
					if(!twpro_job.twpro_hp && ((twpro_item.bonus.attributes.strength||0)+(twpro_item.bonus.skills.health||0))>twpro_bestHP[twpro_item.type]["health_points"]){
						twpro_bestHP[twpro_item.type]["health_points"] = ((twpro_item.bonus.attributes.strength||0)+(twpro_item.bonus.skills.health||0));
						if(twpro_item.set){
							twpro_bestHP[twpro_item.type]["setKey"]=twpro_item.set.key;
						}
						else{
							twpro_bestHP[twpro_item.type]["setKey"]=null;
						}
					}
					TWPro.twpro_useful_itemJob = twpro_job;
				}
				else{
					TWPro.twpro_useful_itemJob = 'none';
				}
			}
			else {
				if ((twpro_item.twpro_wearable) &&
					(twpro_item.type != "left_arm" || (job_is_fort && !(twpro_item.damage.damage_min < TWPro.damage_min.left_arm && twpro_item.damage.damage_max < TWPro.damage_max.left_arm)) || (job_is_fort && !((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 < TWPro.damage_average.left_arm)) ||
						(!job_is_fort && twpro_item.twpro_bonus)) &&
//						(!job_is_fort && ((twpro_item.twpro_bonus == true || twpro_item.twpro_weapon == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] > 0)))) &&
					
					(twpro_item.type != "right_arm" || (
						(job_is_duel_shot && !(twpro_item.damage.damage_min < TWPro.damage_min.right_arm_shot && twpro_item.damage.damage_max < TWPro.damage_max.right_arm_shot)) || (job_is_duel_shot && !((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 < TWPro.damage_average.right_arm_shot)) ||
						(job_is_duel_hand && !(twpro_item.damage.damage_min < TWPro.damage_min.right_arm_hand && twpro_item.damage.damage_max < TWPro.damage_max.right_arm_hand)) || (job_is_duel_hand && !((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 < TWPro.damage_average.right_arm_hand))
						) || (!job_is_duel && twpro_item.twpro_bonus)) &&
//						) || (!job_is_duel && ((twpro_item.twpro_bonus == true || twpro_item.twpro_weapon == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] > 0)))) &&
					((twpro_item.type != 'animal' || (twpro_job.shortName == "regeneration" && twpro_item.twpro_jobbonus && twpro_item.twpro_jobbonus.regeneration >= twpro_job.twpro_bestAnimal) || (twpro_job.shortName != "regeneration" && Math.round(100/twpro_item.speed-100) >= TWPro.twpro_bestAnimal)) && ((((twpro_item.type == 'yield') || (twpro_item.type == 'right_arm')) && (twpro_item.twpro_bonus == true || twpro_item.twpro_weapon == true) && (twpro_job.twpro_bestStats[twpro_item.type] > 0) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type])) || ((twpro_item.type != 'yield') && (twpro_item.type != 'right_arm') && (((twpro_item.twpro_bonus == false) && (twpro_job.twpro_bestStats[twpro_item.type] == 0)) || ((twpro_item.twpro_bonus == true || twpro_item.twpro_weapon == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type]))))))) {
					twpro_item.twpro_html.firstChild.className = 'wear_yield_highlight';
					if(!twpro_job.twpro_hp && ((twpro_item.bonus.attributes.strength||0)+(twpro_item.bonus.skills.health||0))>twpro_bestHP[twpro_item.type]["health_points"]){
						twpro_bestHP[twpro_item.type]["health_points"] = ((twpro_item.bonus.attributes.strength||0)+(twpro_item.bonus.skills.health||0));
						if(twpro_item.set){
							twpro_bestHP[twpro_item.type]["setKey"]=twpro_item.set.key;
						}
						else{
							twpro_bestHP[twpro_item.type]["setKey"]=null;
						}
					}
					TWPro.twpro_useful_itemJob = twpro_job;
				}
				else{
					TWPro.twpro_useful_itemJob = 'none';
				}
			}

			if(from != 'twpro_useful' || (from == 'twpro_useful' && TWPro.twpro_useful_flag == true)) bagitems[twpro_bag].popup.refresh();
		}

		if(from != 'twpro_useful'){
			if(!twpro_job.twpro_hp){
				var twpro_hp = 0, arr_sets = [], str_sets = '';
				for (var twpro_type in twpro_bestHP){
					if(twpro_bestHP[twpro_type]["health_points"]>-1000) twpro_hp += twpro_bestHP[twpro_type]["health_points"];
					if(twpro_bestHP[twpro_type]["setKey"]){
						if(str_sets.indexOf(";"+twpro_bestHP[twpro_type]["setKey"]+";") == -1){
							str_sets += ";"+twpro_bestHP[twpro_type]["setKey"]+";";
							arr_sets.push([twpro_bestHP[twpro_type]["setKey"], 1]);
						}
						else{
							str_sets += ";"+twpro_bestHP[twpro_type]["setKey"]+";";
						}
					}
				}
				for(var i=0;i<arr_sets.length;i++){
					arr_sets[i][1] = str_sets.match(";"+arr_sets[i][0]+";", "g").length;
					twpro_hp += (TWPro.twpro_setBonus[arr_sets[i][0]][arr_sets[i][1]].bonus.attributes.strength||0+TWPro.twpro_setBonus[arr_sets[i][0]][arr_sets[i][1]].bonus.skills.health||0);
				}
				twpro_job.twpro_hp = twpro_hp;
			}
			if(twpro_job.shortName != "regeneration" && !twpro_job.shortName.match(/twpro_fortatt/) && !twpro_job.shortName.match(/twpro_fortdef/)) document.getElementById("twpro_specialMessage").innerHTML = TWPro.specialMessages["job_hp"](twpro_job.twpro_hp);
		}
	}

	function twpro_useful(div_style) {
		if(!div_style || div_style == 'none' || div_style == 'force'){
			$('twpro_useful').setStyles({'outline':'#F0CD8B inset thin'});
			if(TWPro.settings_prefs['usefulItemsPopup']=='true') TWPro.twpro_useful_flag = true; //cookie

			for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
				var twpro_job = TWPro.twpro_jobs[twpro_i];
				
				if(TWPro.settings_prefs['usefulItemsPopup']=='true'){
				  var setCounter_types = ';';
				  TWPro.twpro_refresh_item_popup = false;
				  twpro_job.twpro_setCounter = {};
  
				  for (var twpro_wear in Wear.wear) {
  //					Wear.wear[twpro_wear].popup.refresh();
					  var twpro_item = Wear.wear[twpro_wear].obj;
					  TWPro.twpro_popup(twpro_item);
					  if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
						  if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
							  if(twpro_job.twpro_setCounter[twpro_item.set.key]){
								  twpro_job.twpro_setCounter[twpro_item.set.key] ++;
							  }
							  else{
								  twpro_job.twpro_setCounter[twpro_item.set.key] = 1;
							  }
							  setCounter_types += setCounter_types + twpro_item.type +';';
						  }
					  }
				  }
  
				  var bagitems = Bag.getInstance().items;
				  for (var twpro_bag in bagitems) {
  //					bagitems[twpro_bag].popup.refresh();
  //					bagitems[twpro_bag].obj.twpro_html.firstChild.className = '';
					  var twpro_item = bagitems[twpro_bag].obj;
					  TWPro.twpro_popup(twpro_item);
					  if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
						  if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
		  
							  if(setCounter_types.indexOf(";"+twpro_item.type+";") == -1){
								if(twpro_job.twpro_setCounter[twpro_item.set.key]){
									twpro_job.twpro_setCounter[twpro_item.set.key] ++;
								}
								else{
									twpro_job.twpro_setCounter[twpro_item.set.key] = 1;
								}
							  }
						  }
					  }
				  }
  
				  TWPro.twpro_refresh_item_popup = true;
				}
				TWPro.twpro_highlight(twpro_job, 'twpro_useful');
			}
		}
		else{
			$("twpro_useful").style.outline = "none";
			TWPro.twpro_useful_flag = false;
			for (var twpro_wear in Wear.wear) {
				$('char_'+twpro_wear).className = $('char_'+twpro_wear).className.replace(' wear_'+twpro_wear+'_highlight', '');							
				Wear.wear[twpro_wear].obj.useful_html = '';
				Wear.wear[twpro_wear].obj.useful_count = 0;
//				if(TWPro.settings_prefs['usefulItemsPopup']) Wear.wear[twpro_wear].popup.refresh(); //cookie
				Wear.wear[twpro_wear].popup.refresh();
			}
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				bagitems[twpro_bag].obj.twpro_html.firstChild.className = '';
				bagitems[twpro_bag].obj.useful_html = '';
				bagitems[twpro_bag].obj.useful_count = 0;
//				if(TWPro.settings_prefs['usefulItemsPopup']) bagitems[twpro_bag].popup.refresh(); //cookie
				bagitems[twpro_bag].popup.refresh();
			}
		}
	}

	if(typeof window.TWPro == 'undefined'){try{
		window.twpro_initLanguage = twpro_initLanguage;

		window.TWPro = {};
		TWPro.lang = twpro_lang;
		TWPro.skill_to_AttNum = skill_to_AttNum;
		TWPro.specialMessages = specialMessages;
		TWPro.twpro_injectScript = twpro_injectScript;
		TWPro.twpro_preference = twpro_preference;
		TWPro.twpro_handleSettings_prefs = twpro_handleSettings_prefs;
		TWPro.twpro_throwFailure = twpro_throwFailure;
		TWPro.twpro_injectionSwitch = twpro_injectionSwitch;
		TWPro.twpro_activeJob = twpro_activeJob;
		TWPro.twpro_multisell = twpro_multisell;
		TWPro.twpro_getPlace = twpro_getPlace;
		TWPro.twpro_popup = twpro_popup;
		TWPro.twpro_highlight_market_options = twpro_highlight_market_options;
		TWPro.twpro_insertList = twpro_insertList;
		TWPro.twpro_handleJobrank = twpro_handleJobrank;
		TWPro.twpro_searchInventory = twpro_searchInventory;
		TWPro.twpro_internalWindowToTop = internalWindowToTop;
		TWPro.twpro_bagVis = twpro_bagVis;
		TWPro.twpro_sortList = twpro_sortList;
		TWPro.twpro_show_set = twpro_show_set;
		TWPro.twpro_jobSortMark = twpro_jobSortMark;
		TWPro.twpro_showList = twpro_showList;
		TWPro.twpro_generate_cache = twpro_generate_cache;
		TWPro.twpro_cache_status = twpro_cache_status;
		TWPro.twpro_getBagPopup = twpro_getBagPopup;
		TWPro.twpro_clickList = twpro_clickList;
		TWPro.twpro_clickfilterList = twpro_clickfilterList;
		TWPro.twpro_updateList = twpro_updateList;
		TWPro.twpro_insertListItems = twpro_insertListItems;
		TWPro.twpro_sortJobs = twpro_sortJobs;
		TWPro.twpro_sortPlus = twpro_sortPlus;
		TWPro.twpro_initializeItems = twpro_initializeItems;
		TWPro.twpro_calculateJobs = twpro_calculateJobs;
		TWPro.twpro_prepareItem = twpro_prepareItem;
		TWPro.twpro_wearItem = twpro_wearItem;
		TWPro.twpro_compareItem = twpro_compareItem;
		TWPro.twpro_testItem = twpro_testItem;
		TWPro.twpro_changeItem = twpro_changeItem;
		TWPro.twpro_changeJob = twpro_changeJob;
		TWPro.twpro_highlight = twpro_highlight;
		TWPro.twpro_useful = twpro_useful;
		TWPro.twpro_split_fortbattle = twpro_split_fortbattle;
		TWPro.twpro_updateInternalJobInfo = twpro_updateInternalJobInfo;
		TWPro.twpro_validSet = twpro_validSet;
		TWPro.twpro_disableJobs = twpro_disableJobs;
		TWPro.twpro_moveJobSetting = twpro_moveJobSetting;
		TWPro.twpro_confirmHideJobs = twpro_confirmHideJobs;
		TWPro.twpro_customJobs = twpro_customJobs;
		TWPro.twpro_searchTrader = twpro_searchTrader;
		TWPro.twpro_bestLifeRestore = twpro_bestLifeRestore;
		TWPro.twpro_sleeperBonus = twpro_sleeperBonus;
		TWPro.twpro_setInfo = twpro_setInfo;
		// clean up to avoid possible memory leaks
		twpro_initLanguage = twpro_lang = skill_to_AttNum = specialMessages = twpro_injectScript = twpro_preference = twpro_handleSettings_prefs = twpro_throwFailure = twpro_injectionSwitch = twpro_activeJob = twpro_multisell = twpro_getPlace = twpro_popup = twpro_highlight_market_options = twpro_insertList = twpro_handleJobrank = twpro_searchInventory = internalWindowToTop = twpro_bagVis = twpro_sortList = twpro_show_set = twpro_jobSortMark = twpro_showList = twpro_generate_cache = twpro_cache_status = twpro_getBagPopup = twpro_clickList = twpro_clickfilterList = twpro_updateList = twpro_insertListItems = twpro_sortJobs = twpro_sortPlus = twpro_initializeItems = twpro_calculateJobs = twpro_prepareItem = twpro_wearItem = twpro_compareItem = twpro_testItem = twpro_changeItem = twpro_changeJob = twpro_highlight = twpro_useful = twpro_split_fortbattle = twpro_updateInternalJobInfo = twpro_validSet = twpro_disableJobs = twpro_moveJobSetting = twpro_confirmHideJobs = twpro_customJobs = twpro_searchTrader = twpro_bestLifeRestore = twpro_sleeperBonus = twpro_setInfo = null;
		//TWPro.twpro_injectScript();
		window.addEvent('domready', TWPro.twpro_injectScript);
		// WMap binds too early to AjaxWindow, causing any twpro_injectionSwitch to fail
		// if (typeof WMap != "undefined")	WMap.recalcMarker();
		}catch(e){alert(e)}
	}
	// export other stuff, not related to TW Pro item stuff

  // fix TogglePin on minimmap when scrolling to town or player
	eval('WMap.scroll_map_to_town = ' + WMap.scroll_map_to_town.toString().replace("WMinimap.hide\(\);","if(!Config.values[\'gui.map.keepopen\'] || Config.values[\'gui.map.keepopen\'] != true){WMinimap.hide();}"));
	eval('WMap.scroll_map_to_player = ' + WMap.scroll_map_to_player.toString().replace("WMinimap.hide\(\);","if(!Config.values[\'gui.map.keepopen\'] || Config.values[\'gui.map.keepopen\'] != true){WMinimap.hide();}"));
	// fix for Equipment Manager & Usable items
	eval('Bag.setContent = ' + Bag.setContent.toString().replace(/this\.add\(bag_content\[j\]\);\s*}/,"this.add(bag_content[j]);}if ($(\'window_inventory_content\')){TWPro.twpro_changeItem(-1);}"));
	// Clickable reports for Chat
//	eval('chatcontrol.formatTextMessage = ' + chatcontrol.formatTextMessage.toString().replace(/m\.escapeHTML\(\)\./,"m.escapeHTML().replace(/\\[report=(\\d+)(\\w{10})\\](.+)\\[\\/report\\]/,'<a href=\\'javascript:Reports.show($1, \"$2\")\\'>$3<\\/a>')."));
	if (parseFloat(TheWestApi.version.substr(0,4)) >= 1.33){
		eval('chatcontrol.formatTextMessage = ' + chatcontrol.formatTextMessage.toString().replace(/keep.length - 1/g,"String(keep.length - 1)").replace(/m\.escapeHTML\(\)\./,"m.escapeHTML().replace(/\\[report=(\\d+)(\\w{10})\\]([^\\]]+)\\[\\/report\\]/g, function (a,b,c,d) {keep.push('<a href=\\'javascript:ReportWindow.open(\'+b+\', \"\'+c+\'\")\\'>\'+d+\'<\\/a>');return \"&&\" + String(keep.length - 1) + \"&&\";})."));
	}
	else{
		eval('chatcontrol.formatTextMessage = ' + chatcontrol.formatTextMessage.toString().replace(/keep.length - 1/g,"String(keep.length - 1)").replace(/m\.escapeHTML\(\)\./,"m.escapeHTML().replace(/\\[report=(\\d+)(\\w{10})\\]([^\\]]+)\\[\\/report\\]/g, function (a,b,c,d) {keep.push('<a href=\\'javascript:Reports.show(\'+b+\', \"\'+c+\'\")\\'>\'+d+\'<\\/a>');return \"&&\" + String(keep.length - 1) + \"&&\";})."));
	}

	(function(){
		try{
			
			window.convertduelreport = convertduelreport;
			window.convertduelreportfunc = convertduelreportfunc;
			window.makefortmessage = makefortmessage;
			window.makefortlist = makefortlist;
			window.makeadvicemessage = makeadvicemessage;
			window.makeadvicelist = makeadvicelist;
			convertduelreportfunc = makefortlist = makeadvicelist = null;
			
			(Reports.show = eval('('+Reports.show.toString()
								 .replace('{', '{data=convertduelreport("window_reports_show_"+report_id, data);')
								 +')')).bind(Reports);
								 
			Reports.get_next_report = eval('('+Reports.get_next_report.toString()
								 .replace('returnVal);', 'returnVal);TWPro.twpro_injectionSwitch(\'reports_show_\' + id,\'js\',returnVal,\'js\');')
								 +')');
			Reports.get_previous_report = eval('('+Reports.get_previous_report.toString()
								 .replace('returnVal);', 'returnVal);TWPro.twpro_injectionSwitch(\'reports_show_\' + id,\'js\',returnVal,\'js\');')
								 +')');
								 
				 
		}catch(e){}
	})();
/*	if(!('_expand_answer' in Messages)){
		Messages._expand_answer = Messages.expand_answer;
		Messages.expand_answer = function(){
			Messages._expand_answer();
			window.insertbbcodesfunc(document.getElementById('answer_field_row').getElementsByTagName('textarea')[0], false);
		};
	}
*/
			// BBCode at reports
			try {
				if (ReportPublish.selectPublish.toString().indexOf("textarea_height") == -1) {
					var hook = 'try{var textarea_height=0;(' + (function(){
						for(var i=0, report_links=[]; i<reportIds.length; i++){
							var hash = document.getElementById("window_reports_show_"+reportIds[i]+"_content");
							hash = hash && hash.innerHTML.match(/showLink\(\d+,\s*'([^']+)'\)/);
							var hash_title;
							if(hash){
								hash = hash[1];
							}
							else{
								hash = document.getElementById("reportList_title_" + reportIds[i]);
								if(hash){
									hash_title = hash.textContent || hash.innerText;
									hash = hash.href.match(/'([^']+)'/);
									if(hash) hash = hash[1];
								}
							}
							if(!hash_title){
								hash_title = document.getElementById('report_title_'+reportIds[i]);
								hash_title = hash_title && hash_title.hashtitle || null;
							}
							if(hash && hash_title){
								report_links.push('[report='+
									reportIds[i] + hash
								+']'+
									hash_title
								+'[/report]');
							}
						}
						if(1){
							textarea_height = 15 * (1 + Math.min(5, report_links.length));
							xhtml += '<textarea rows="3" cols="50" style="width:365px;height:'+textarea_height+'px" class="input_layout" onclick="this.select()" readonly="readonly">'+report_links.join("\n")+"</textarea>";
						}
					}).toString() + ')()}catch(e){}';
					ReportPublish.selectPublish = eval('('+ReportPublish.selectPublish.toString().replace(
						/(showMessage\(xhtml,\s*header,)[^,]+,[^,]+/,
						hook+';$1 400, 300+textarea_height'
					)+')');
				}
			}
			catch (e) {alert(e)}
//}	


	// colorMe by aka Y. [SOM]

	  function init() {
	  
		  /*Check for Opera*/
	  //	if (!window.location.href.match(/http:\/\/.+\.the-west\..*\/game\.php.*/i)) {
	  //		return;
	  //	} /*  Language Settings */
	  //	var lang = window.location.href.substring(window.location.href.indexOf("//") + 2, window.location.href.indexOf("//") + 4);
	  //	colorTxt.resourceBundle = colorTxt.getLanguage(lang);
	  
		  
		  this.colorTag = 1;
		  this.custColor='';
		  this.tellName='';
		  this.BFred=0;
		  /*color panel img*/
		  this.CPButtonImg = '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'
		  /*contextual imgs*/
		  this.ctxImgElse = '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'
		  /*Red Battle Fort icon*/
		  this.ctxImgRBF = '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'
		  
		  this.addColorButton();
		  this.addColorPanel();
		  colorTxt.c(TWPro.settings_prefs['chatColor'], 'init');
		  var funcKeyColor = function (ev) {
			  ev = new Event(ev);
			  if (ev.code == 13) {
				  colorTxt.a();
				  document.focusing = undefined;
			  }
		  }

		  $('chatwindow_say').addEvent('keydown', funcKeyColor);
		  $('chatwindow_channelselect').setAttribute("onChange", "colorTxt.b();" );
		  
	  }
	  
	  
	  function addColorButton() { /*test color btn*/
		  var btnColorText =new Element('a',{'id':'btnColorText','title':'', 'class':'button_wrap button', styles:{'float':'left'}, href:'javascript:colorTxt.toggle();'});
		  btnColorText.innerHTML = 	'<img id="colorChangeImg" src="images/transparent.png"  width="12" height="12"'+
									  'style="background-image:url(data:image/png;base64,'+this.ctxImgElse+'); background-position:0px 0px">';
		  btnColorText.addEvent('click', function () {
		  $('chatwindow_say').focus();
		  });
		  var parentDiv = $('chatwindow_say').parentNode;
		  var pparentDiv = parentDiv.parentNode;
		  pparentDiv.insertBefore(btnColorText, parentDiv);
	  }
	  function addColorPanel(){
		  var CPButton = ['', 'red', 'brown', 'blue2', 'tellName', 'blue', 'green', 'pink', 'purple', 'custColor'];
		  var colorPanelDIV= new Element('div',{ 'id': 'colorPanelDIV', 'styles':{'display': 'none', 'width':'108px', 'height':'54px', 'position':'absolute', 'top': '-50px', 'left': '100px','z-index': '5'}});
		  var w = 0;
		  var posx = 0;
		  var posy = 0;
		  colorPanelDIV.innerHTML='';
		  for(var i=0; i< CPButton.length; i++){
			  var opt = CPButton[i];
			  if ((i==0)||(i==5)){w=25;}
			  else if ((i==1)||(i==2)||(i==6)||(i==7)){w=19;}
			  else if ((i==3)||(i==8)){w=20;}
			  else if ((i==4)||(i==9)){w=24;}	
			  if (i==5){posy=-27;posx=0;}
			  colorPanelDIV.innerHTML+='<a href="javascript:colorTxt.c(\''+opt+'\');"'+
							  ' onclick="TWPro.twpro_handleSettings_prefs(\'chatColor\',\''+((opt!='tellName' && opt!='custColor')?opt:'')+'\');">'+
							  '<img id="idCPBoutton_'+opt+'" alt="" src="images/transparent.png" width="'+ w +'" '+
							  ' height="27" style="background-image:url(data:image/png;base64,'+this.CPButtonImg+');'+
							  'background-position:-'+posx+'px '+posy+'px"></a>';
			  posx=posx+w;
		  }
		  var pDiv = $('chatwindow_say').parentNode;
		  var ppDiv = pDiv.parentNode;
		  ppDiv.insertBefore(colorPanelDIV,pDiv);
		   
	  }
/*	  function a(){
		  var txt ='';
		  
		  var cmdTw = ['/tell', '/topic', '/clear', '/logout', '/hide', '/show', '/ignorelist', '/ignore', '/unignore', '/rights', '/color', '/help', '/?'];
		  var changeRedBold = 0;
		  if (this.BFred == 1)
			  changeRedBold =1;
		  var currentTag = $('chatwindow_say').value;
		  
	  
		  var skipTag = 0;
		  if (currentTag.charAt(0) == '/') {
			  for (var k = 0; k < cmdTw.length; k++) {
				  if (currentTag.substring(0, cmdTw[k].length) == cmdTw[k].substring(0, cmdTw[k].length)) {
					  skipTag = 1;
				  }
			  }
		  }
		  switch (this.colorTag) {
							  case 1:
								  tx = $('chatwindow_say').value;
								  if (skipTag == 0) {
									  $('chatwindow_say').value = tx;
								  }
								  break;
							  case 2:
								  tx = '/007';
								  tx += $('chatwindow_say').value;
								  if (skipTag == 0) {
									  $('chatwindow_say').value = tx;
								  }
								  break;
							  case 3:
								  if (changeRedBold == 1) {
									  tx = '/900*';
									  tx += $('chatwindow_say').value.toUpperCase();
									  tx += '*';
								  } else {	
									  tx = '/700';
									  tx += $('chatwindow_say').value;
								  }
								  if (skipTag == 0) {
									  $('chatwindow_say').value = tx;
								  }
								  break;
							  case 4:
								  tx = '/031';
								  tx += $('chatwindow_say').value;
								  if (skipTag == 0) {
									  $('chatwindow_say').value = tx;
								  }
								  break;
							  case 5:
								  tx = '/321';
								  tx += $('chatwindow_say').value;
								  if (skipTag == 0) {
									  $('chatwindow_say').value = tx;
								  }
								  break;
							  case 6:
								  tx = '/704';
								  tx += $('chatwindow_say').value;
								  if (skipTag == 0) {
									  $('chatwindow_say').value = tx;
								  }
								  break;
							  case 7:
								  tx = '/409';
								  tx += $('chatwindow_say').value;	
								  if (skipTag == 0) {
									  $('chatwindow_say').value = tx;
								  }
								  break;
							  case 8:
								  tx = '/608';
								  tx += $('chatwindow_say').value;
								  if (skipTag == 0) {
									  $('chatwindow_say').value = tx;
								  }
	  
								  break;
							  case 9:
								  tx = '/tell '+this.tellName+':';
								  tx += $('chatwindow_say').value;
								  $('chatwindow_say').value = tx;
								  break;
							  case 10:
								  tx = '/'+this.custColor;
								  tx += $('chatwindow_say').value;
								  if (skipTag == 0) {
									  $('chatwindow_say').value = tx;
								  }
								  break;
		  }
	  }
	  */
   function appliquer_couleur(texte) {
     var couleurs = { 2: '007', 3: '700', 4: '031', 5: '321', 6: '704', 7: '409', 8: '608', 10: colorTxt.custColor };
     var couleur = '';
	 if(this.colorTagTell == true && $('chatwindow_say').value.substring(0, 6) != '/tell '){
		// Spécial chuchoter.
		this.colorTagTell = false;
		texte = appliquer_couleur(texte);
		this.colorTagTell = true;
		return '/tell ' + this.tellName + ': ' + texte;
	 }
	 else{
		 switch (colorTxt.colorTag) {
		   case 1:
			 // Texte normal, rien à faire.
			 return texte;
		   //case 9:
		     // Spécial chuchoter.
		   //return '/tell ' + this.tellName + ': ' + texte;
		   case 3:
			 // Cas spécial du rouge.
			 if (this.BFred == 1) {
			   // On veut en gras et majuscule.
			   texte = '*' + texte.toUpperCase() + '*';
			   couleurs[3] = '900';
			 }
		   default:
			 couleur = couleurs[colorTxt.colorTag];
			 break;
		 }
		 if (couleur) {
		   // Une couleur est définie
		   return '/' + couleur + texte;
		 } else {
		   return texte;
		 }
	 }	 
   }
   
   function a() {
     // danosaure: Simplification du code et permettre la couleur dans les "chuchoter".
     var currentTag = $('chatwindow_say').value;
     if (currentTag.charAt(0) == '/') {
       // Probablement une commande ou une couleur.
       if (currentTag.substring(0, 6) == '/tell ') {
         // Chuchoter
         var semicolon = currentTag.indexOf(':');
         if (-1 != semicolon) {
           // On dirait un format de chuchoter valide.
           $('chatwindow_say').value = currentTag.substring(0, semicolon + 1)
               + this.appliquer_couleur(currentTag.substring(semicolon + 1));
           return;
         }
       } else {
         // C'est peut-être une commande connue?
         var cmdTw = ['/topic', '/clear', '/logout', '/hide', '/show', '/ignorelist', '/ignore', '/unignore', '/leave', '/enter', '/rights', '/color', '/me', '/help', '/?'];
         for (var k = 0; k < cmdTw.length; k++) {
           if (currentTag.substring(0, cmdTw[k].length) == cmdTw[k]) {
             // Oui, la commande existe, alors on ne modifie rien au contenu.
             return;
           }
         }
       }
     }
     // Tous les autres cas, appliquer la couleur.
     $('chatwindow_say').value = this.appliquer_couleur(currentTag);
   }
	  
	  function b(){
		  var selectedTwRoom = $('chatwindow_channelselect').options[$('chatwindow_channelselect').selectedIndex].value;
		  var roomTwException = ['room_maneuver', 'room_fortbattle'];	
		  if ((selectedTwRoom.indexOf(roomTwException[0]) != '-1') || (selectedTwRoom.indexOf(roomTwException[1]) != '-1')) {
			  this.BFred = 1;
			  if (this.colorTag==3){
				  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgRBF+")");
				  $('colorChangeImg').setAttribute("width", "18px");
				  $('colorChangeImg').setAttribute("height", "11px");	
			  }
		  } else {
			  this.BFred = 0;
			  $('colorChangeImg').setAttribute("width", "12px");
			  $('colorChangeImg').setAttribute("height", "12px");
			  if (this.colorTag==3)
				  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:-12px 0px");		
		  }	
	  
	  }
	  function c(tag, from){
		  this.colorTagTell = false;
		  $('colorChangeImg').setAttribute("width", "12px");
		  $('colorChangeImg').setAttribute("height", "12px");
		  switch (tag) {
			  case 'blue':
				  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:-60px 0px");	
				  this.colorTag = 2;
				  break;
			  case 'red':
				  if (this.BFred==0){
					  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:-12px 0px");	
				  }else{
					  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgRBF+")");
					  $('colorChangeImg').setAttribute("width", "18px");
					  $('colorChangeImg').setAttribute("height", "11px");	
				  }	
				  this.colorTag = 3;
				  break;
			  case 'green':
				  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:-72px 0px");	
				  this.colorTag = 4;	
				  break;
			  case 'brown':
				  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:-24px 0px");	
				  this.colorTag = 5;
				  break;
			  case 'pink':
				  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:-82px 0px");	
				  this.colorTag = 6;
				  break;
			  case 'blue2':
				  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:-36px 0px");	
				  this.colorTag = 7;
				  break;
			  case 'purple':
				  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:-96px 0px");	
				  this.colorTag = 8;
				  break;
			  case'tellName':
					  this.tellName= prompt(TWPro.lang.CHATWHISPER+":");
					  if ((this.tellName == null)||(this.tellName == '')){
						  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:0px 0px");	
						  this.colorTag = 1;
					  }else{
						  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:-48px 0px");	
						  //this.colorTag = 9;
						  this.colorTagTell = true;
					  }
				  break;
			  case'custColor':
				  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:0px 0px");	
					  this.custColor= prompt(TWPro.lang.CHATCOLOR+":");
					  if ((this.custColor == null)||(this.custColor == '')){
						  this.colorTag = 1;
					  }else{
						  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:-108px 0px");	
						  this.colorTag = 10;
					  }
					  
				  break;
			  default:
				  $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64,"+this.ctxImgElse+");background-position:0px 0px");	
				  this.colorTag = 1;
			  }
			  if(!from || from != 'init'){
				  colorTxt.toggle();
				  $('chatwindow_say').focus();
			  }
	  }
	  function toggle() {
		  var ele = document.getElementById("colorPanelDIV");
		  if(ele.style.display == "block") {
				  ele.style.display = "none";
		  }
		  else {
			  ele.style.display = "block";
			  this.bold=0;
			  this.cmdTW='';
	  
		  }
	  } 
		  function getString(key, param) {
			  var str = $defined(chatY.resourceBundle[key]) ? chatY.resourceBundle[key] : key;
	  
			  if ($defined(param)) {
				  if (!(param instanceof Array)) {
					  param = new Array(param);
				  }
				  for (var i = 0; i < param.length; i++) {
					  str = str.replace('%' + (i + 1), param[i]);
				  }
			  }
			  return str;
		  };
	  
	  /*
		  function getLanguage(lang) {
			  res = new Array();
			  res['en'] = {
				  'text.about': 'set your message about',
	  
				  'author': 'Author:'
			  };
	  
	  
			  return (res[lang] != null ? res[lang] : res['en']);
		  }
	  */
	  //	var colorTxtFuncs = ['init','c','a','b','toggle', 'getLanguage', 'getString', 'addColorButton','addColorPanel'];
//		  var colorTxtFuncs = ['init','c','a','b','toggle', 'getString', 'addColorButton','addColorPanel'];
		  var colorTxtFuncs = ['init','c','a','b','toggle', 'getString', 'addColorButton','addColorPanel','appliquer_couleur'];	  
		  var colorTxt_script = document.createElement('script');
		  colorTxt_script.type = 'text/javascript';
		  colorTxt_script.text = 'if(window.colorTxt == undefined) {\n';
		  colorTxt_script.text += '  window.colorTxt = new Object();\n';
	  
		  for (var i = 0; i < colorTxtFuncs.length; i++) {
			  var colorTxtFunc = colorTxtFuncs[i];
			  colorTxt_script.text += '  colorTxt.' + colorTxtFunc + ' = ' + eval(colorTxtFunc.toString()) + '\n';
		  };
		  colorTxt_script.text += '  colorTxt.init();\n';
		  colorTxt_script.text += '}';
		  document.body.appendChild(colorTxt_script);
	// aka Y.


//}
}} // check_TW_version ends here

  { // BBcodes
	  function insertBBcode(startTag, endTag, elementid) {
		  var input = document.getElementById(elementid);
		  input.focus();
		  /* für Internet Explorer */
		  if (typeof document.selection != 'undefined') {
			  /* Einfügen */
			  var range = document.selection.createRange();
			  var insText = range.text;
			  range.text = startTag + insText + endTag;
  
			  /* Cursorposition anpassen */
			  range = document.selection.createRange();
			  if (insText.length == 0) {
				  range.move('character', -endTag.length);
			  } else {
				  range.moveStart('character', startTag.length + insText.length + endTag.length);
			  }
			  range.select();
		  }
		  /* für neuere auf Gecko basierende Browser */
		  else if (typeof input.selectionStart != 'undefined') {
			  /* BB code bugfix: scrolling by Lekensteyn <lekensteyn@gmail.com> */
			  input.focus();
			  var start = input.selectionStart;
			  var end = input.selectionEnd;
			  var sts = input.scrollTop;
			  var ste = input.scrollHeight;
			  var insText = input.value.substring(start, end);
			  input.value = input.value.substr(0, start) + startTag + insText + endTag + input.value.substr(end);
			  var pos;
			  if(insText.length == 0){
				  pos = start + startTag.length;
			  }
			  else{
				  pos = start + startTag.length + insText.length + endTag.length;
			  }
			  input.selectionStart = pos;
			  input.selectionEnd = pos;
			  input.scrollTop = sts + input.scrollHeight - ste;
		  }
	  }
  
	  window.insertBBcode = insertBBcode;
  
	  function insertbbcodesfunc(messagebox, extended) {
		  if(window.TWPro && !window.TWPro.enablebbcodes) return;
		  var bbcodeplace = messagebox.parentNode;
		  var elementidmessagebox;
		  var sm = ['http://tiny.cc/twpro1','http://tiny.cc/twpro2','http://tiny.cc/twpro3','http://tiny.cc/twpro4','http://tiny.cc/twpro5','http://tiny.cc/twpro6','http://tiny.cc/twpro7','http://tiny.cc/twpro8','http://tiny.cc/twpro9','http://tiny.cc/twpro10','http://tiny.cc/twpro11','http://tiny.cc/twpro12','http://tiny.cc/twpro13','http://tiny.cc/twpro14','http://tiny.cc/twpro15','http://tiny.cc/twpro16','http://tiny.cc/twpro17','http://tiny.cc/twpro18','http://tiny.cc/twpro19','http://tiny.cc/twpro20','http://tiny.cc/twpro21','http://tiny.cc/twpro22','http://tiny.cc/twpro23','http://tiny.cc/twpro24','http://tiny.cc/twpro25','http://tiny.cc/twpro26'];
		  if(!(elementidmessagebox=messagebox.id)) elementidmessagebox = messagebox.id = 'twpro_bbbar'+Math.random();
		  var bbs = ['b', 'i', 'u', 'del', 'player', 'town', 'fort', 'quote=Author', 'url'];
		  if(extended) bbs.push('img', 'color=red', 'size=10');
		  var bbtemplate = ' <img src="images/transparent.png" onclick="insertBBcode(\'[%1]\', \'[/%2]\', \''+elementidmessagebox+'\');" alt="%1" style="background-image:url(../images/bbcodes.png);background-position: -%3px;height:20px;width:20px;margin:6px -1px;" />';
		  var bbtemplate2 = ' <img src="%3" onclick="insertBBcode(\'[img]%1[/img]\', \'\', \''+elementidmessagebox+'\');" style="margin:-3px -1px;" />';
		  var bbhtml = '';
		  for(var i=7; i<bbs.length; i++){
			  if(i==8)i++;
			  bbhtml += bbtemplate.replace(/%1/g, bbs[i]).replace(/%2/g, bbs[i].replace(/=.+/, '')).replace(/%3/g, i*20);
		  }
		  for(var i=0; i<sm.length; i++){
			  bbhtml += bbtemplate2.replace(/%1/g, sm[i]).replace(/%3/g, sm[i]);
		  }
		  var bbbar = document.createElement('span');
		  bbbar.id = 'new_bbbar';
		  bbbar.innerHTML = bbhtml;
		  bbcodeplace.firstChild.nextSibling.appendChild(bbbar, messagebox)
  
	  }
  }

  var url = window.location.href;
  if (url.indexOf("forum.php?page=") != -1) {
	  if (url.indexOf("page=forum&mode=new_thread") != -1 || ((url.indexOf("&answer") != -1 || url.indexOf("&edit_post")) && url.indexOf("page=thread") != -1)) {
		  window.insertBBcode = insertBBcode;
		  window.insertbbcodesfunc = insertbbcodesfunc;
		  insertBBcode = insertbbcodesfunc = null;
		  var ta = document.getElementsByTagName('textarea');
		  if(ta.length){
			if(!ta[0].parentNode.getElementById('new_bbbar')) window.insertbbcodesfunc(ta[0], true);
		  }
	  }
  }


if (url.indexOf("game.php") != -1) {

///////////* SOM Manager by Zyphir */////////////
/*
	if(!document.getElementById("som_manager_script_src")){
		var myScript = document.createElement("script");
		myScript.type = "text/javascript";
		myScript.id = "som_manager_script_src";
		myScript.src = "";
		document.body.appendChild(myScript);
	}
	var i=0;
	function wait_som_manager(){
		if(typeof som_manager != "undefined"){som_manager(NUMERO_SCRIPT, twpro_version);}
		else if(i<20){setTimeout(wait_som_manager, 500);i++;}
	};
	wait_som_manager();
*/	  
///////////* end SOM Manager */////////////

	function maj_a_verifier()
	{
		//
		// Gestion de la màj toute les 24 h
		//

		var heure_dernier_maj = 0 ;
		//Lit le contenu de la variable
		var donnee = localStorage.getItem(MENU_maj) ;
		if (donnee != null)
		{
			heure_dernier_maj = donnee ;
		}

		//Récupération de l'heure actuelle (en s depuis 1970)
		var heure_actuelle = new Date().getTime() / 1000 ;
				
		//Calcul le delta entre la dernière vérif et maintenant
		var delta = heure_actuelle - heure_dernier_maj ;
		if (delta < DELTA_maj) 
		{
			return false ; //Pas de màj à vérifier
//			return true ; //Force la màj
		}
		else
		{
			return true ;
		}
	}

	//Fonction de traitement du retour du source de l'iframe
	function trait_ret_iframe(contenu_iframe)
	{
	  if (contenu_iframe.origin != "http://userscripts.org") return; //Sort si le retour n'est pas le contenu d'un script
	  var version_recuperee = unescape(contenu_iframe.data);
	  try{
		if (version_recuperee.match(/^\d+/) == NUMERO_SCRIPT) //vérifie si le message commence par le bon numéro de script 
		{
			var script_version = version_recuperee.match(/\/\/ @version+\s*(.*)/)[1]; //Récupération du contenu après @version
			if (script_version != VERSION_SCRIPT) //Ne fais rien si la version est identique
			{
				var script_nom = version_recuperee.match(/\/\/ @name+\s*(.*)/)[1]; //Récupération du contenu après @name
				var script_auteur = version_recuperee.match(/\/\/ @release+\s*(.*)/)[1]; //Récupération du contenu après @release 
				//
				//Travaille sur les variables @history
				//
				var tab_history = version_recuperee.match(/\/\/ @history+\s*(.*)/g); //Récupération du tableau des lignes

				//Initialisation des variables
				var version_history_precedente	= "" ;
				var nb_version_history_trouvee	= 0 ;
				var contenu_fenetre_history		= "<DIV STYLE='text-align:center;font-weight:bold'>"+script_nom+"<span style='font-size:9px'> "+VERSION_SCRIPT+"</span><span style='font-size:11px'>";
				contenu_fenetre_history	+= eval(TheWestApi.displayOutdated.toString().match(/(currentVersionMsg *= *)([^;]+)/)[2].replace("this.version", "\"<span style='color:rgb(34,34,136)'>"+script_version+"</span></span>\""));
				contenu_fenetre_history	+= "</DIV><DIV ID='script_history' STYLE='border:1px #DABF83 inset;overflow:auto;height: 250px;margin-top:3px;'><TABLE>";

				function make_script_history(his){
				  //Boucle qui parcourt les @history
				  for (var i=his; i<tab_history.length ; i++)
				  {
					  ligne	= tab_history[i].match(/\/\/ @history+\s*(.*)/)[1];
					  version_history_avec_espace	= ligne.match(/^[a-zA-Z0-9\.\-\|\/]*\s/)[0] ; //contient les n° de version
					  version_history_full = version_history_avec_espace.replace(/(^\s*)|(\s*$)/g,""); //suppression des espaces
					  version_history = version_history_full.split("|")[0];
					  version_history_date = version_history_full.split("|")[1] || "";
  
					  //Sort si le nb maximum d'historique est atteint
					  if (nb_version_history_trouvee >= NB_HISTORY && version_history != version_history_precedente) return i ;
					  if (i==(tab_history.length-1) && $("script_history_next")) $("script_history_next").style.display="none";
  
					  //Teste si la version a changé
					  if (version_history != version_history_precedente)
					  {
					  if (i>0) contenu_fenetre_history += "</UL></TD></TR>";
						  contenu_fenetre_history += "<TR><TD width='500px' style='border: solid 1px #666666;background: url(../images/profile/settings_profile_input_bg.png);font-size:12px;vertical-align:top;'><B>" + version_history + "</B> <span style='float:right;font-size:10px;font-style:italic'>"+version_history_date+"</span><BR><UL style='margin-bottom:4px;'>" ;
						  nb_version_history_trouvee++ ;
						  version_history_precedente = version_history ;
					  }
					  version_history_full=version_history_full.replace("|","\\|");
					  var reg = new RegExp(version_history_full + "+\s*(.*)");
					  texte_history = ligne.match(reg)[1];
					  contenu_fenetre_history += "<LI>" + texte_history + "</LI>" ;
					  
					  if (i==tab_history.length-1) contenu_fenetre_history += "</UL></TD></TR>";
				  }
				}
				var script_history_next = make_script_history(0)||0;
			  
				function make_script_history_next(){
					contenu_fenetre_history='';
					nb_version_history_trouvee = 0;
					script_history_next=make_script_history(script_history_next);
					$("script_history").firstChild.firstChild.innerHTML += contenu_fenetre_history;
				}
				window.make_script_history_next = make_script_history_next;

				contenu_fenetre_history += "</TABLE>";
				
				if(script_history_next>0 && script_history_next<tab_history.length)contenu_fenetre_history += "<div id='script_history_next' style='text-align:center;font-size:10px;margin-top:-3px'><a href='javascript:window.make_script_history_next();'>[+"+NB_HISTORY+"]</a></div>";

				contenu_fenetre_history += "</DIV>";
				
				contenu_fenetre_history	+= "<DIV style='float:left;font-size:10px;margin-top:2px;margin-left:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.website *\?.+(?=['"]['"]\)*,'*\)* *"*\)*<\/div)/)[0].replace(" | ", "").replace(/api.website/g, "\"http://userscripts.org/scripts/show/"+NUMERO_SCRIPT+"\\\"\"+\"\\\" target='_blank'\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<DIV style='float:right;font-size:10px;margin-top:2px;margin-right:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.author *\?.+(?=['"]['"]\)*,\(* *api.website *\?)/)[0].replace(" | ", "").replace(/api.author/g, "\""+script_auteur+"\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<BR><DIV STYLE='margin-bottom:-10px;text-align:center;font-weight:bold'>Install ?</DIV>";

				showMessage(contenu_fenetre_history, "Script Updater by [<a href='http://scripts-o-maniacs.leforum.eu' target='_blank'>SOM</a>]", 400, undefined, [["ok", function () {try{(typeof(safari) != "undefined" && safari)?window.open("http://userscripts.org/scripts/show/" + NUMERO_SCRIPT):location.href = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".user.js";}catch(e){}}], ["cancel"]]);			
			}
			//Stocke l'heure de la dernière vérif
			var heure_actuelle = new Date().getTime() / 1000 ;
			localStorage.setItem(MENU_maj,heure_actuelle) ;
		}
	  }catch(e){
				//Réessaye 2h plus tard en cas d'erreur (timeout uso)
				var heure_actuelle = ((new Date().getTime() / 1000)-79200) ;
				localStorage.setItem(MENU_maj,heure_actuelle) ;
				}
	}

	if (maj_a_verifier())
	{
		//Test safari
		var navigateur = navigator.userAgent.toLowerCase();
		//Initialisation de la variable
		var scr_script = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".meta.js";

		//Vu que pour chrome, il y a "safari", je teste avant la présence de chrome
		var chrome = navigateur.indexOf("chrome") + 1 ;
		if (!chrome)
		{
			safari = navigateur.indexOf("safari") + 1 ;
			if (safari)
			{
				var scr_script = "http://userscripts.org/scripts/review/" + NUMERO_SCRIPT;
			}
		}

		//
		//IFRAME
		//

		//Écriture dans une iframe le contenu de la source de l'en-tête du script
		var source_script=document.createElement('iframe');

		source_script.setAttribute('id', 'maj_' + NUMERO_SCRIPT);
		source_script.setAttribute('style', 'display:none;');
		//source_script.setAttribute('style', 'display:inline; position:absolute; width:500px; height:600px;');
		source_script.src = scr_script ;

		document.body.appendChild(source_script);
		// Fin de la génération de l'iframe

		// fix for iframe bad content loading
		var f=document.getElementsByTagName("iframe");
		for(var i=0;i<f.length;i++){
			if(f[i].src.substring(0,31)=="http://www.jeux-alternatifs.com") continue;
			if(f[i].src.substr(f[i].src.length-1)=="#") f[i].src=f[i].src.substr(0,f[i].src.length-1);
			else f[i].src=f[i].src+"#";
		} 

		//Ajout d'un évènement pour récupérer le contenu de l'iframe
		window.addEventListener('message', trait_ret_iframe, true);
	}
}

})
} // end if (url.indexOf(".the-west.") != -1)
else	//Cas du script exécuté dans l'iframe pour la mise à jour
{
	//Création d'une fonction globale pour tout le script
	(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){

	/////////////////////////////////////////////////////////
	// DÉCLARATION DES CONSTANTES
	/////////////////////////////////////////////////////////
	var NUMERO_SCRIPT	= "92414" ;

	//Envoi des informations à la fenêtre principale
	function envoi_info(){
		var destination = window.parent;
		message = String(escape(document.body.textContent));

		//Indiquer le n° du script pour identifier la communication
		if(destination.postMessage) {
			destination.postMessage(NUMERO_SCRIPT + message, '*');
		}
	}
	envoi_info();
	})
}