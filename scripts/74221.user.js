// ==UserScript==
// @name			Enhanced UI
// @description		Enhancements for the user interface of Ikariam.
// @namespace		Tobbe
// @author			Tobbe
// @version			11.00
// @version2		2.4
//
// @include			http://s*.*.ikariam.*/*
// @include			http://s*.ikariam.gameforge.com/*
//
// @exclude			http://support.*.ikariam.gameforge.com/*
//
// @resource		languageGerman	http://resources.ikascripts.de/74221/v2.3/languageGerman.json
// @resource		languageEnglish	http://resources.ikascripts.de/74221/v2.3/languageEnglish.json
// @resource		languageLatvian	http://resources.ikascripts.de/74221/v2.3/languageLatvian.json
// 
// @grant			unsafeWindow
// @grant			GM_setValue
// @grant			GM_getValue
// @grant			GM_deleteValue
// @grant			GM_listValues
// @grant			GM_getResourceText
// @grant			GM_xmlhttpRequest
// 
// @bug				Opera & Chrome	Zooming with the mouse is only possible with "Alt" or without any key. No fix possible as I know.
// @bug				Opera			No updating of the missing resources is possible due to a missing modification listener.
// @bug				Chrome			Some smaller graphical bugs caused by a second execution of Ikariam functions by the script.
// @bug				All				The selected island is not centered in world view.
// @bug				All				If you are zooming to more than 100%, the view is not centered correctly after a page reload.
// 
// @history			2.4		New Ikariam domain -> script can now be used with this domain
// 
// @history			2.3		Feature: Formatting troop lists for posting in forums / personal messages. (desktop).
// @history			2.3		Feature: Filling level of warehouse as bar in town view. (desktop).
// @history			2.3		Feature: Link to mines / town hall when clicking on resources / citizens. (desktop).
// @history			2.3		Feature: New versioning system.
// @history			2.3		Bugfix: Some characters in links were not decoded correctly. (desktop)
// @history			2.3		Bugfix: Watching a foreign city causes a abortion of the script. (desktop)
// @history			2.3		Bugfix: The city dropdown sometimes was zoomed in world view. (desktop)
// @history			2.3		Bugfix: Removed obsolete CSS styles for Firefox.
// @history			2.3		Adjustments in the language files.
// @history			2.3		Violent Monkey brings Greasemonkey functions to Opera.
// 
// @history			2.2.1	Feature: Smaller icons in direct military tooltip. (desktop)
// @history			2.2.1	Bugfix: Problems with update check and version numbers >= 10. (mobile & desktop)
// @history			2.2.1	Bugfix: Problems with another script. (desktop)
// @history			2.2.1	Bugfix: Problems with a wrong style in island view. (desktop)
//
// @history			2.2		Feature: Message signature can be set. (desktop)
// @history			2.2		Feature: Button for faster sending of circular messages. (desktop)
// @history			2.2		Feature: Make links in messages clickable. (desktop)
// @history			2.2		Feature: Show town infos of colonizing cities. (desktop)
// @history			2.2		Feature: Information about cargo / fleets is displayed directly in military view. (desktop)
// @history			2.2		Feature: Script options: Sections on the script tab can be folded. (desktop)
// @history			2.2		Bugfix: Tooltips with mouseover were not clickable anymore. (desktop)
// @history			2.2		Changes in code for better overview.
//
// @history			2.1.1	Feature: Different styles for income in town view. (desktop)
// @history			2.1.1	Feature: Remaining resources after upgrade. (desktop)
// @history			2.1.1	Feature: Improved style for external alliance pages. (desktop)
// @history			2.1.1	Feature: Refresh the missing / remaining resources in ruction view automatically. (desktop)
//
// @history			2.1		Feature: Show the missing resources in ruction view. (desktop)
// @history			2.1		Feature: Show the hourly income directly in town view and add the daily production as popup. (desktop)
// @history			2.1		Feature: Don't center town information in the town advisor. (desktop)
// @history			2.1		Feature: Save the highscore data of alliance members and compare it with the actual value. (desktop)
// @history			2.1		Bugfix: There was an error with a missing language package and seperators. (mobile & desktop)
// @history			2.1		Bugfix: Some things in worldview were not resized correctly. (desktop)
// @history			2.1		Prevent more than one script execution.
// @history			2.1		Prevent more than one script option panel (the script option panel now is usable for other scripts, too).
//
// @history			2.0.1	Bugfix: Zooming was broken.
// @history			2.0.1	Bugfix: Dropdown menus created by the script were broken.
// @history			2.0.1	Bugfix: Tooltips in in Alliance / Military view were not shown correctly.
//
// @history			2.0		Feature: Cross-browser compatibility. (Firefox, Chrome, Opera)
// @history			2.0		Feature: Latvian translation - thanks to Draxo. (mobile & desktop)
// @history			2.0		Feature: Possibility to hide the update hint for a new script version. (mobile & desktop)
// @history			2.0		Bugfix: Resizing the owner state in world view was broken. (desktop)
// @history			2.0		Some changes in the code for easier copying of functions which should be used by more than one script.
//
// @history			1.7		Feature: Resizing banners when zooming is possible in city view, too. (desktop)
// @history			1.7		Feature: The zoom buttons are available in world view, too. (desktop)
// @history			1.7		Feature: Zooming with the mouse scroll is possible again (now with key, standard is ctrl). (desktop)
// @history			1.7		Feature: Changes in the option panel due to the new zooming function features. (desktop)
// @history			1.7		Bugfix: If resizing is enabled, zooming with the buttons will resize the banners, too. (desktop)
// @history			1.7		Bugfix: The chat will not cause to much executions of script functions. (desktop)
// @history			1.7		The language texts are integrated as resources, so that there is shorter code.
// @history			1.7		Replace the GM_* functions by myGM.* to expand them easy and add new.
//
// @history			1.6		Feature: Possibility to hide only the bird swarm animation. (desktop)
// @history			1.6		Feature: Easier upkeep reduction table. (mobile & desktop)
// @history			1.6		Feature: Enhanced zoom function using the Ikariam zoom function. (desktop)
// @history			1.6		Due to the use of Ikariam functions the code could be reduced.
// @history			1.6		Code enhancements for shorter code.
//
// @history			1.5.1.1	Bugfix: Not all occurrences of hidden were changed.
//
// @history			1.5.1	Bugfix: Name of a class (hidden) is used by GF.
//
// @history			1.5		Feature: Options panel to enable/disable funtions and set settings. (mobile & desktop)
// @history			1.5		Feature: Update interval can be set. (mobile & desktop)
// @history			1.5		Feature: Manually check for updates. (mobile & desktop)
// @history			1.5		Feature: Zoom funtion without resizing the whole view. (desktop)
// @history			1.5		Feature: Move loading circle to another position. (desktop)
// @history			1.5		Feature: Show tooltip in Alliance / Military view on mouseover. (desktop)
// @history			1.5		Feature: Code better commented. More comments, so that it is easier to understand.
// @history			1.5		Bugfix: Changed *.gif to *.png.
// @history			1.5		Version numbers adjusted.
//
// @history			1.4.1	Feature: Support for mobile interface.
// @history			1.4.1	Bugfix: Fixed bug with scrollbar in finances view. (desktop)
//
// @history			1.4		Feature: Ready for 0.5.0, but also supports 0.4.5 furthermore.
// @history			1.4		Feature: Implemented support for different languages.
// @history			1.4		Feature: Enhanced script updater.
// @history			1.4		Feature: Cleaned up code.
// @history			1.4		Feature: Rename the script to "Enhanced UI".
// @history			1.4		Feature: Change the namespace to "Tobbe".
// @history			1.4		Because of the change of namespace and name you have to delete the old script manually!
//
// @history			1.3.3	Bugfix: Problem with negative numbers and 0.4.2.4 fixed.
//
// @history			1.3.2	Feature: Own script updater.
// @history			1.3.2	Bugfix: Remove everything what refered to other scripts.
//
// @history			1.3.1	Feature: New script updater.
//
// @history			1.3		Remove the script updater (Because of the problem with Greasemonkey scripts).
//
// @history			1.2.1	Feature: New style of update panel.
// @history			1.2.1	Bugfix: Bug with ',' as seperator fixed.
//
// @history			1.2		Feature: Income in 24h added.
// @history			1.2		Feature: Cleaned up code.
//
// @history			1.1		Feature: Update check implemented.
//
// @history			1.0		Initial release.
// ==/UserScript==

/******************************************************************************************************************
*******************************************************************************************************************
***                                                                                                             ***
*** The update function which is used in the script was developed by PhasmaExMachina and adapted by me (Tobbe). ***
***                                                                                                             ***
*******************************************************************************************************************
******************************************************************************************************************/

/**
 * Information about the Script.
 */
var scriptInfo = {
	version:	'2.4',
	id:			74221,
	name:		'Ikariam Enhanced UI',
	author:		'Tobbe',
	debug:		false
};

/**
 * Information about the language.
 */
var languageInfo = {
	implemented:	new Array('English', 'German', 'Latvian'),
	useResource:	true,
	defaultText:	{"default":{"update":{"notPossible":{"header":"No Update possible","text1":"It is not possible to check for updates for ","text2":". Please check manually for Updates for the script. The actual installed version is ","text3":". This message will appear again in four weeks."},"possible":{"header":"Update available","text1":"There is an update for ","text2":" available.","text3":"At the moment there is version ","text4":" installed. The newest version is ","history":"Version History","type":{"feature":"Feature(s)","bugfix":"Bugfix(es)","other":""},"button":{"install":"Install","hide":"Hide"}},"noNewExists":{"header":"No Update available","text1":"There is no new version for ","text2":" available. The newest version ","text3":" is installed."}},"notification":{"header":"Script notification","button":{"confirm":"OK","abort":"Abort"}}},"settings":{"kiloSep":",","decSep":".","left2right":true},"general":{"successful":"Your order has been carried out.","error":"There was an error in your request.","ctrl":"Ctrl","alt":"Alt","shift":"Shift","yes":"Yes","no":"No","show":"Show","hide":"Hide"},"balance":{"income":{"perHour":"Income per hour","perDay":"Income per day","start":"Income without reduction"},"upkeep":{"reason":{"0":"Troops","1":"Ships","2":"Troops & Ships"},"basic":"Basic Costs","supply":"Supply Costs","result":"Total Costs"}},"optionPanel":{"scripts":"Scripts","save":"Save settings!","section":{"module":{"title":"Modules","label":{"updateActive":"Search for updates automatically","incomeOnTopActive":"Show income on top in Balance view","upkeepReductionActive":"Show a short version of the upkeep reduction","missingResActive":"Show missing resources in construction view","resourceInfoActive":"Show the hourly income directly in town view","capacityInfoActive":"Show info bar for warehouse capacity","easyAccessActive":"Link resource number to town hall / mines","zoomActive":"Activate zoom in world view, island view, town view","messageSignatureActive":"Enable message signatures","easyCircularMsgActive":"Show button for faster sending of circular messages","replaceUrlsActive":"Make links in messages clickable","colonizingLinksActive":"Show information about colonizing cities","lcMoveActive":"Move loading circle to position bar","tooltipsAutoActive":"Show tooltips in alliance mebers view and military advisor automatically","directMilitaryTtActive":"Show information about cargo / fleets in military view without tooltips","unitInfoActive":"Show troop info","hideBirdsActive":"Hide the bird swarm.","nctAdvisorActive":"Don't center town information in the town advisor","niceAllyPageActive":"Show the external allypages better formatted","memberInfoActive":"Enable the possibility to save highscore data of alliance members"}},"update":{"title":"Update","label":{"interval":{"description":"Interval to search for updates:","option":{"hour":"1 hour","hour12":"12 hours","day":"1 day","day3":"3 days","week":"1 week","week2":"2 weeks","week4":"4 weeks"}},"manual":{"text1":"Search for updates for ","text2":"!"}}},"resInfoMissingRes":{"title":"Resource Information / Missing Resources","label":{"hourlyIncomeStyle":"Style of the hourly income in town view:","align":{"right":"Right align","left":"Left align","rightWithSeparation":"Right align with separation"},"capacityOrientationStyle":"Orientation of the bar","orientation":{"vertical":"Vertical","horizontal":"Horizontal","horizontalFull":"Horizontal, full length"},"hasBorder":"Has border","showBranchRes":"Show resources in trading post","showPositive":"Show also the remaining resources after an upgrade","showColoured":"Show the remaining resources coloured"}},"zoom":{"title":"Zoom function","label":{"zoomFactor":{"world":"Zoom worldmap:","island":"Zoom island view:","town":"Zoom town view:"},"scaleChildren":{"description":"Let banners and symbols in normal size when zooming when zooming in this view:","world":"Worldmap","island":"Island view","town":"Town view"},"accessKeys":"This keys must be pressed to zoom with the mouse:"}},"messageSignature":{"title":"Message signature","label":{"useServerSignature":"Use local signature","placementTop":"Insert signature above cited messages","signatureText":{"global":"Global signature, which could be used on every world:","server":"Local signature, which only could be used on this world:"}}}}},"memberInfo":{"show":"Alliance info","reset":"Reset","lastReset":"Time since the last reset:","noReset":"No reset so far."},"unitInfo":{"button":"Troop information","header":"Troops in ","units":{"label":"Units in ","own":"Own units","friends":"Allied units","enemies":"Enemy units"},"ships":{"label":"Ships in ","own":"Own ships","friends":"Allied ships","enemies":"Enemy ships"}},"resourceInfo":{"dailyIncome":{"wood":"Daily production building material:","wine":"Daily production wine:","marble":"Daily production marble:","glass":"Daily production crystal glass:","sulfur":"Daily production sulphur:"}},"easyCircularMsg":{"getLink":"Save link for circular message","send":"Send circular message"},"replacedUrl":{"notification":{"header":"Attention!","text1":"You're going to open the link ","text2":". This happens on your own risk. Proceed?"}},"zoomFunction":{"zoomIn":"Zoom in","zoomFactor":"Zoom factor","zoomOut":"Zoom out"},"name":{"resource":{"gold":"Gold","wood":"Building Material","wine":"Wine","marble":"Marble","glass":"Crystal Glass","sulfur":"Sulphur"},"unit":{"swordsman":"Swordsman","phalanx":"Hoplite","archer":"Archer","marksman":"Sulphur Carabineer","mortar":"Mortar","slinger":"Slinger","catapult":"Catapult","ram":"Battering Ram","steamgiant":"Steam Giant","bombardier":"Balloon-Bombardier","cook":"Cook","medic":"Doctor","girocopter":"Gyrocopter","spearman":"Spearman"},"ship":{"ballista":"Ballista Ship","catapult":"Catapult Ship","flamethrower":"Fire Ship","mortar":"Mortar Ship","ram":"Ram Ship","steamboat":"Steam Ram","rocketship":"Rocket Ship","submarine":"Diving Boat","paddlespeedship":"Paddle Speedboat","ballooncarrier":"Balloon Carrier","tender":"Tender","transport":"Merchant Ship"}}}
};

/**********************************************************
***********************************************************
*****                                                 *****
***** Start of functions / variables for all Scripts. *****
*****                                                 *****
***********************************************************
**********************************************************/

/**
 * Sets unsafeWindow / window to win for easier access.
 */
var win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

/**************************
*** Debugging settings. ***
**************************/

// For more information about commands that are available for the Firebug console see http://getfirebug.com/wiki/index.php/Console_API.
if(scriptInfo.debug && win.console) {
	var conTmp = win.console;
} else {
	var conTmp = {
		// Non static functions are set to 'null'.
		log:			function () { return false; },
		info:			function () { return false; },
		warn:			function () { return false; },
		error:			function () { return false; },
		debug:			function () { return false; },
		assert:			function () { return false; },
		clear:			function () { return false; },
		dir:			function () { return false; },
		dirxml:			function () { return false; },
		trace:			function () { return false; },
		group:			function () { return false; },
		groupCollapsed: function () { return false; },
		groupEnd:		function () { return false; },
		time:			function () { return false; },
		timeEnd:		function () { return false; },
		profile:		function () { return false; },
		profileEnd:		function () { return false; },
		count:			function () { return false; },
		exception:		function () { return false; },
		table:			function () { return false; }
	};
}

/**
 * Debugging console.
 */
var con = conTmp;

/********************************
*** Functions for all Strings ***
********************************/

/**
 * Replaces characters or whitespaces at the beginning of a string.
 *
 * @param	String	toRemove
 *   A string containing the characters to remove (optional, if not set: trim whitespaces).
 *
 * @return String
 *   The trimmed string.
 */
String.prototype.ltrim = function(toRemove) {
	// Is there a string with the characters to remove?
	var special = !!toRemove;

	// Return the trimmed string.
	return special ? this.replace(new RegExp('^[' + toRemove + ']+'), '') : this.replace(/^\s+/, '');
};

/**
 * Replaces characters or whitespaces at the end of a string.
 *
 * @param	String	toRemove
 *   A string containing the characters to remove (optional, if not set: trim whitespaces).
 *
 * @return String
 *   The trimmed string.
 */
String.prototype.rtrim = function(toRemove) {
	// Is there a string with the characters to remove?
	var special = !!toRemove;

	// Return the trimmed string.
	return special ? this.replace(new RegExp('[' + toRemove + ']+$'), '') : this.replace(/\s+$/, '');
};

/**
 * Replaces characters or whitespaces at the beginning and end of a string.
 *
 * @param	String	toRemove
 *   A string containing the characters to remove (optional, if not set: trim whitespaces).
 *
 * @return String
 *   The trimmed string.
 */
String.prototype.trim = function(toRemove) {
	// Return the trimmed string.
	return this.ltrim(toRemove).rtrim(toRemove);
};

/**
 * Encodes HTML-special characters in a string.
 *
 * @return String
 *   The encoded string.
 */
String.prototype.encodeHTML = function() {
	// Set the characters to encode.
	var characters = {
		'&':	'&amp;',
		'"':	'&quot;',
		'\'':	'&apos;',
		'<':	'&lt;',
		'>':	'&gt;'
	};
	
	// Return the encoded string.
	return this.replace(/([\&"'<>])/g, function(string, symbol) { return characters[symbol]; });
};

/**
 * Decodes HTML-special characters in a string.
 *
 * @return String
 *   The decoded string.
 */
String.prototype.decodeHTML = function() {
	// Set the characters to decode.
	var characters = {
		'&amp;':	'&',
		'&quot;':	'"',
		'&apos;':	'\'',
		'&lt;':		'<',
		'&gt;':		'>'
	};
	
	// Return the decoded string.
	return this.replace(/(&quot;|&apos;|&lt;|&gt;|&amp;)/g, function(string, symbol) { return characters[symbol]; });
};

/**
 * Repeats a string a specified number of times.
 * 
 * @param	int		nr
 *   The number of times to repeat the string.
 * 
 * @return	String
 *   The repeated string.
 */
String.prototype.repeat = function(nr) {
	// Storage for the result.
	var ret = this;
	
	// Repeat the string.
	for(var i = 1; i < nr; i++) {
		ret += this;
	}
	
	// Return the string.
	return ret;
};

/********************************
*** myGM / Updater / Language ***
********************************/

/**
 * myGM for cross-browser compatibility of the GM_* functions. (use myGM.* instead of GM_*)
 * Also there are general used functions stored.
 */
myGM = {
	/**
	 * If it is possible to use the default GM_*Value functions, true, otherwise false.
	 */
	canUseGmStorage: false,

	/**
	 * If it is possible to use the default GM_getResourceText function, true, otherwise false.
	 */
	canUseGmRessource: false,

	/**
	 * If it is possible to use the default GM_xmlhttpRequest function, true, otherwise false.
	 */
	canUseGmXhr: false,

	/**
	 * If it is possible to use the localStorage, true, otherwise false.
	 */
	canUseLocalStorage: false,

	/**
	 * The prefix which schuld be added to the values stored in localStorage / cookies.
	 */
	prefix: '',

	/**
	 * Storage for the style sheets which will be added by the script.
	 */
	styleSheets: new Array(),

	/**
	 * Storage for the notification id.
	 */
	notificationId: 0,

	/**
	 * Init myGM.
	 */
	init: function() {
		// Set the prefix for the script.
		this.prefix				= 'script' + scriptInfo.id;

		// Set the possibility to use the different storages.
		this.canUseLocalStorage	= !!win.localStorage;
		this.canUseGmStorage	= !(typeof GM_getValue == 'undefined' || (typeof GM_getValue.toString == 'function' && GM_getValue.toString().indexOf('not supported') > -1))
									&& !(typeof GM_setValue == 'undefined' || (typeof GM_setValue.toString == 'function' && GM_setValue.toString().indexOf('not supported') > -1))
									&& !(typeof GM_deleteValue == 'undefined' || (typeof GM_deleteValue.toString == 'function' && GM_deleteValue.toString().indexOf('not supported') > -1))
									&& !(typeof GM_listValues == 'undefined' || (typeof GM_listValues.toString == 'function' && GM_listValues.toString().indexOf('not supported') > -1));

		// Set the possibility to use the GM_resource.
		this.canUseGmRessource	= !(typeof GM_getResourceText == 'undefined' || (typeof GM_getResourceText.toString == 'function' && GM_getResourceText.toString().indexOf('not supported') > -1));

		// Set the possibillity to use the GM_xhr.
		this.canUseGmXhr		= !(typeof GM_xmlhttpRequest == 'undefined' || (typeof GM_xmlhttpRequest.toString == 'function' && GM_xmlhttpRequest.toString().indexOf('not supported') > -1));

		// Set the close image. It is stored as a data URI. If you copy it to your browser, a red cross (16px * 16px) will be shown.
		var closeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D';

		// Set the notification style.
		this.addStyle(
				"." + this.prefix + "notificationBackground				{ z-index: 1000000000000; position: fixed; visibility: visible; top: 0px; left: 0px; width: 100%; height: 100%; padding: 0; background-color: #000; opacity: .7; } \
				 ." + this.prefix + "notificationPanelContainer			{ z-index: 1000000000001; position: fixed; visibility: visible; top: 100px; left: 50%; width: 500px; height: 370px; margin-left: -250px; padding: 0; text-align: left; color: #333; font: 12px Arial,Helvetica,sans-serif; } \
				 ." + this.prefix + "notificationPanel					{ position: relative; top: 0px; left: 0px; background-color: transparent; border: 0 none; overflow: hidden; } \
				 ." + this.prefix + "notificationPanelHeader			{ height: 39px; background: none repeat scroll 0 0 transparent; font-weight: bold; line-height: 2; white-space: nowrap; } \
				 ." + this.prefix + "notificationPanelHeaderL			{  } \
				 ." + this.prefix + "notificationPanelHeaderR			{  } \
				 ." + this.prefix + "notificationPanelHeaderM			{ height: 24px; background-color: #999; padding: 5px; border: 3px solid #000; border-radius: 5px; color: #811709; line-height: 1.34em; font-size: 15pt; } \
				 ." + this.prefix + "notificationPanelBody				{ max-height: 311px; height: 100%; background: none repeat scroll 0 0 transparent; } \
				 ." + this.prefix + "notificationPanelBodyL				{  } \
				 ." + this.prefix + "notificationPanelBodyR				{  } \
				 ." + this.prefix + "notificationPanelBodyM				{ height: 100%; background-color: #F5F5F5; border-left: 3px solid #000; border-right: 3px solid #000; border-top-left-radius: 5px; border-top-right-radius: 5px; padding: 0 10px; font-size: 14px; } \
				 ." + this.prefix + "notificationPanelBodyMTop			{ max-height: 100px; line-height: 2; } \
				 ." + this.prefix + "notificationPanelBodyMTop b		{ line-height: 3.5; font-size: 110%; } \
				 ." + this.prefix + "notificationPanelBodyM a			{ color: #811709; font-weight: bold; } \
				 ." + this.prefix + "notificationPanelBodyM h2			{ font-weight: bold; } \
				 ." + this.prefix + "notificationPanelBodyMContent		{ max-height: 265px; padding: 10px; background-color: #FFF; border: 1px dotted #4D4D4D; font: 14px Arial,Helvetica,sans-serif; color: #333; border-collapse: separate; overflow-y:auto; margin-top: 5px; } \
				 ." + this.prefix + "notificationPanelBodyMBottom		{ max-height: 170px; padding: 10px; background-color: #FFF; border: 1px dotted #4D4D4D; font: 14px Arial,Helvetica,sans-serif; color: #333; border-collapse: separate; overflow-y:auto; } \
				 ." + this.prefix + "notificationPanelBodyPlaceholder	{ height: 20px; } \
				 ." + this.prefix + "notificationPanelFooter			{ height: 20px; background: none repeat scroll 0 0 transparent; } \
				 ." + this.prefix + "notificationPanelFooterL			{  } \
				 ." + this.prefix + "notificationPanelFooterR			{  } \
				 ." + this.prefix + "notificationPanelFooterM			{ background-color: #F5F5F5; border-bottom: 3px solid #000; border-left: 3px solid #000; border-right: 3px solid #000; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; padding: 3px 0 2px 3px; font-size: 77%; } \
				 ." + this.prefix + "notificationPanelClose				{ cursor: pointer; position: absolute; top: 10px; right: 10px; width: 16px; height: 16px; background-image: url('" + closeImage + "'); } \
				 ." + this.prefix + "notificationPanelButtonWrapper		{ bottom: -4px; position: absolute; margin: 10px auto; width: 100%; text-align: center; } \
				 ." + this.prefix + "notificationPanelButton			{ background-color: #DADEDE; border-color: #C0C0C0 #4D4D4D #4D4D4D #C0C0C0; border-style: double; border-width: 3px; border-radius: 5px; cursor: pointer; display: inline; font-weight: bold; margin: 0px 5px; padding: 2px 10px; text-align: center; font-size: 12px; width: 100px; } \
				 ." + this.prefix + "notificationPanelButton:hover		{ color: #444; } \
				 ." + this.prefix + "notificationPanelButton:active		{ border-color: #4D4D4D #C0C0C0 #C0C0C0 #4D4D4D; border-style: double; border-width: 3px; padding: 3px 10px 1px; } \
				 ." + this.prefix + "notificationPanelButtonConfirm		{  } \
				 ." + this.prefix + "notificationPanelButtonAbort		{  }",
				'notification'
			);

		// Set the updater style.
		this.addStyle(
				"." + this.prefix + "updateTable			{ border-collapse: separate; border-spacing: 2px; } \
				 ." + this.prefix + "updateDataType			{ width: 100px; padding: 5px 0px 5px 5px; border: 1px solid #999; } \
				 ." + this.prefix + "updateDataInfo			{ width: 300px; padding: 5px 5px 5px 20px; border: 1px solid #999; } \
				 ." + this.prefix + "updateDataInfo ul li	{ list-style: disc outside none; }",
				'updater'
			);
	},

	/**
	 * Store a value specified by a key.
	 *
	 * @param	String	key
	 *   The key of the value.
	 * @param	mixed	value
	 *   The value to store.
	 */
	setValue: function(key, value) {
		// Stringify the value to store also arrays.
		var toStore = win.JSON.stringify(value);

		// If the use of the default GM_setValue ist possible, use it.
		if(this.canUseGmStorage) {
			// Store the value.
			GM_setValue(key, toStore);

		// Otherwise use the local storage if possible.
		} else if(this.canUseLocalStorage) {
			// Store the value.
			win.localStorage.setItem(this.prefix + key, toStore);

		// Otherwise use cookies.
		} else {
			// Prepare the cookie name and value.
			var data	= escape(this.prefix + key) + '=' + escape(toStore);

			// Set the expire date to January 1st, 2020.
			var expire	= 'expires=' + (new Date(2020, 0, 1, 0, 0, 0, 0)).toGMTString();

			// Set the path to root.
			var path	= 'path=/';

			// Made the cookie accessible from all servers.
			var domain	= 'domain=ikariam.com';

			// Set the cookie.
			win.document.cookie = data + ';' + expire + ';' + path + ';' + domain;
		}
	},

	/**
	 * Get a value and return it.
	 *
	 * @param	String	key
	 *   The key of the value.
	 * @param	mixed	defaultValue
	 *   The value which is set if the value is not set.
	 *
	 * @return	mixed
	 *   The stored value.
	 */
	getValue: function(key, defaultValue) {
		// Put the default value to JSON.
		defaultValue = win.JSON.stringify(defaultValue);
		
		// Storage for the value.
		var value = defaultValue;

		// If the use of the default GM_getValue ist possible, use it.
		if(this.canUseGmStorage) {
			// Get the value.
			value = GM_getValue(key, defaultValue);

		// Otherwise use the local storage if possible.
		} else if(this.canUseLocalStorage) {
			// Get the value.
			var valueTmp = win.localStorage.getItem(this.prefix + key);

			// If the value is not set, let the default value set.
			if(valueTmp) {
				value = valueTmp;
			}

		// Otherwise use cookies.
		} else {
			// Get all cookies.
			var allCookies = document.cookie.split("; ");

			// Loop over all cookies.
			for(var i = 0; i < allCookies.length; i++) {
				// Get the key and value of a cookie.
				var oneCookie = allCookies[i].split("=");

				// If the key is the correct key, get the value.
				if(oneCookie[0] == escape(this.prefix + key)) {
					// Get the value and abort the loop.
					value = unescape(oneCookie[1]);
					break;
				}
			}
		}

		// Return the value (parsed for the correct return type).
		return win.JSON.parse(value);
	},

	/**
	 * Delete a value specified by a key.
	 *
	 * @param	String	key
	 *   The key of the value.
	 */
	deleteValue: function(key) {
		// If the use of the default GM_deleteValue ist possible, use it.
		if(this.canUseGmStorage) {
			// Delete the value.
			GM_deleteValue(key);

		// Otherwise use the local storage if possible.
		} else if(this.canUseLocalStorage) {
			// Remove the value.
			win.localStorage.removeItem(this.prefix + key);

		// Otherwise use cookies.
		} else {
			// Prepare the cookie name.
			var data	= escape(this.prefix + key) + '=';

			// Set the expire date to January 1st, 2000 (this will delete the cookie).
			var expire	= 'expires=' + (new Date(2000, 0, 1, 0, 0, 0, 0)).toGMTString();

			// Set the path to root.
			var path	= 'path=/';

			// Made the cookie accessible from all servers.
			var domain	= 'domain=ikariam.com';

			// Set the cookie.
			win.document.cookie = data + ';' + expire + ';' + path + ';' + domain;
		}
	},

	/**
	 * Returns an array with the keys of all values stored by the script.
	 *
	 * @return	mixed[]
	 *   The array with all keys.
	 */
	listValues: function() {
		// Create an array for the storage of the values keys.
		var key = new Array();

		// If the use of the default GM_listValues ist possible, use it.
		if(this.canUseGmStorage) {
			// Store the key(s) to the array.
			key = GM_listValues();

		// Otherwise use the local storage if possible.
		} else if(this.canUseLocalStorage) {
			// Loop over all stored values.
			for(var i = 0; i < win.localStorage.length; i++) {
				// Get the key name of the key with the number i.
				var keyName = win.localStorage.key(i);

				// If the value is set by the script, push the key name to the array.
				if(keyName.indexOf(this.prefix) != -1) {
					key.push(keyName.replace(this.prefix, ''));
				}
			}

		// Otherwise use cookies.
		} else {
			// Get all cookies.
			var allCookies = document.cookie.split("; ");

			// Loop over all cookies.
			for(var i = 0; i < allCookies.length; i++) {
				// Get the key name of a cookie.
				var keyName = unescape(allCookies[i].split("=")[0]);

				// If the key value is set by the script, push the key name to the array.
				if(keyName.indexOf(this.prefix) != -1) {
					key.push(keyName.replace(this.prefix, ''));
				}
			}
		}

		// Return all keys.
		return key;
	},

	/**
	 * Adds a style element to the head of the page and return it.
	 *
	 * @param	String	styleRules
	 *   The style rules to be set.
	 * @param	String	id
	 *   An id for the style set, to have the possibility to delete it. (optional, if none is set, the stylesheet is not stored)
	 * @param	boolean	overwrite
	 *   If a style with id should overwrite an existing style.
	 *
	 * @return	boolean
	 *    If the stylesheet was stored with the id.
	 */
	addStyle: function(styleRules, id, overwrite) {
		// If the element was stored is saved here.
		var storedWithId = false;

		// If overwrite, remove the old style sheet.
		if(overwrite && overwrite == true) {
			this.removeStyle(id);
		}

		// If the stylesheet doesn't exists.
		if(!id || (id && !this.styleSheets[id])) {
			// Create a new style element and set the style rules.
			var style = this.addElement('style', document.head);
			style.type	= 'text/css';
			style.innerHTML	= styleRules;

			// If an id is set, store it.
			if(id) {
				this.styleSheets[id] = style;
				storedWithId = true;
			}
		}

		// Return if the stylesheet was stored with an id.
		return storedWithId;
	},

	/**
	 * Removes a style element set by the script.
	 *
	 * @param	String	id
	 *   The id of the stylesheet to delete.
	 *
	 * @return	boolean
	 *    If the stylesheet could be deleted.
	 */
	removeStyle: function(id) {
		// Stores if the stylesheet could be removed.
		var removed = false;

		// If there is an id set and a stylesheet with the id exists.
		if(id && this.styleSheets[id]) {
			// Remove the stylesheet from the page.
			document.head.removeChild(this.styleSheets[id]);

			// Remove the stylesheet from the array.
			delete	this.styleSheets[id];

			// Set removed to true.
			removed = true;
		}

		// Return if the stylesheet could be removed.
		return removed;
	},

	/**
	 * Returns the content of a resource parsed with JSON.parse.
	 *
	 * @param	String	name
	 *   The name of the resource to parse.
	 */
	getResourceParsed: function(name) {
		// Storage for the response text.
		var responseText = '';

		// Function for safer parsing.
		var safeParse = function(key, value) {
							// If the value is a function, return just the string, so it is not executable.
							if(typeof value === 'function' || Object.prototype.toString.apply(value) === '[object function]') {
								return value.toString();
							}

							// Return the value.
							return value;
						};

		// If the use of the default GM_getRessourceText ist possible, use it.
		if(this.canUseGmRessource) {
			// Set the parsed text.
			responseText = GM_getResourceText(name);

		// Otherwise perform a xmlHttpRequest.
		} else {
			// Perform the xmlHttpRequest.
			responseText = this.xhr({
				method: 'GET',
				url: 'http://resources.ikascripts.de/' + scriptInfo.id + '/v' + scriptInfo.version + '/' + name + '.json',
				headers: { 'User-agent': navigator.userAgent, 'Accept': 'text/html' },
				synchronous: true,
				onload: function(response) { return false; }
			});
		}

		// Return the parsed resource text.
		return win.JSON.parse(responseText.trim(), safeParse);
	},

	/**
	 * Makes a cross-site XMLHttpRequest.
	 *
	 * @param	mixed[]	args
	 *   The arguments the request needs. (specified here: http://wiki.greasespot.net/GM_xmlhttpRequest)
	 */
	xhr: function(args) {
		// Storage for the result of the request.
		var responseText;

		// Check if all required data is given.
		if(!args.method || !args.url || !args.onload) {
			return false;
		}

		// If the use of the default GM_xmlhttpRequest ist possible, use it.
		if(this.canUseGmXhr) {
			// Sent the request.
			var response = GM_xmlhttpRequest(args);

			// Get the response text.
			responseText = response.responseText;

		// Otherwise show a hint for the missing possibility to fetch the data.
		} else {
			// Storage if the link fetches metadata from userscripts.org
			var usoUpdate	= (args.url.search(/^http:\/\/userscripts.org\/scripts\/source\/[0-9]+\.meta\.js$/i) != -1);
			var isJSON		= (args.url.search(/\.json$/i) != -1);

			// If it is a metadata request.
			if(usoUpdate) {
				// Set the update interval to max.
				this.setValue('updater_updateInterval', 28 * 24 * 60 * 60);

				// Set the notification text.
				var notificationText = {
					header:	Language.$('default_update_notPossible_header'),
					body:	Language.$('default_update_notPossible_text1') + '<a href="http://userscripts.org/scripts/show/' + scriptInfo.id + '" target="_blank" >' + scriptInfo.name + '</a>' + Language.$('default_update_notPossible_text2') + scriptInfo.version + Language.$('default_update_notPossible_text3')
				};

				// Show a notification.
				this.notification(notificationText);

				responseText = true;

			// Otherwise if it is JSON.
			} else if(isJSON) {
				// Do the request with a string indicating the error.
				args.onload('{ "is_error": true }');

				// Return a string indicating the error.
				responseText = '{ "is_error": true }';

			// Otherwise.
			} else {
				responseText = false;
			}
		}

		// Return the responseText.
		return responseText;
	},

	/**
	 * Shows a notification to the user.
	 *
	 * Possible notification texts:
	 *   text.header (optional)
	 *   text.body or text.bodyTop & text.bodyBottom
	 *   text.confirm (optional)
	 *   text.abort (optional)
	 *
	 * @param	String[]	text
	 *   The notification texts.
	 * @param	function[]	callback
	 *   The callbacks for confirm and abort. (optional, default: close panel)
	 * 
	 * @return	int
	 *   The notification id.
	 */
	notification: function(text, callback) {
		// Get the notification id.
		this.notificationId += 1;
		var notificationId = this.notificationId;

		// Create the background and the container.
		myGM.addElement('div', document.body, 'notificationBackground' + notificationId, 'notificationBackground', null, true);
		var notificationPanelContainer		= myGM.addElement('div', document.body, 'notificationPanelContainer' + notificationId, 'notificationPanelContainer', null, true);
		var notificationPanel				= myGM.addElement('div', notificationPanelContainer, 'notificationPanel' + notificationId, 'notificationPanel', null, true);

		// Create the notification panel header.
		var notificationPanelHeader			= myGM.addElement('div', notificationPanel, 'notificationPanelHeader' + notificationId, 'notificationPanelHeader', null, true);
		var notificationPanelHeaderL		= myGM.addElement('div', notificationPanelHeader, 'notificationPanelHeaderL' + notificationId, 'notificationPanelHeaderL', null, true);
		var notificationPanelHeaderR		= myGM.addElement('div', notificationPanelHeaderL, 'notificationPanelHeaderR' + notificationId, 'notificationPanelHeaderR', null, true);
		var notificationPanelHeaderM		= myGM.addElement('div', notificationPanelHeaderR, 'notificationPanelHeaderM' + notificationId, 'notificationPanelHeaderM', null, true);

		// Create the notification panel body.
		var notificationPanelBody			= myGM.addElement('div', notificationPanel, 'notificationPanelBody' + notificationId, 'notificationPanelBody', null, true);
		var notificationPanelBodyL			= myGM.addElement('div', notificationPanelBody, 'notificationPanelBodyL' + notificationId, 'notificationPanelBodyL', null, true);
		var notificationPanelBodyR			= myGM.addElement('div', notificationPanelBodyL, 'notificationPanelBodyR' + notificationId, 'notificationPanelBodyR', null, true);
		var notificationPanelBodyM			= myGM.addElement('div', notificationPanelBodyR, 'notificationPanelBodyM' + notificationId, 'notificationPanelBodyM', null, true);
		if(text.body) {
			var notificationPanelBodyMContent	= myGM.addElement('div', notificationPanelBodyM, 'notificationPanelBodyMContent' + notificationId, 'notificationPanelBodyMContent', null, true);
		} else {
			var notificationPanelBodyMTop		= myGM.addElement('div', notificationPanelBodyM, 'notificationPanelBodyMTop' + notificationId, 'notificationPanelBodyMTop', null, true);
			var notificationPanelBodyMBottom	= myGM.addElement('div', notificationPanelBodyM, 'notificationPanelBodyMBottom' + notificationId, 'notificationPanelBodyMBottom', null, true);
		}
		myGM.addElement('div', notificationPanelBodyM, 'notificationPanelBodyPlaceholder' + notificationId, 'notificationPanelBodyPlaceholder', null, true);

		// Create the notification panel footer.
		var notificationPanelFooter			= myGM.addElement('div', notificationPanel, 'notificationPanelFooter' + notificationId, 'notificationPanelFooter', null, true);
		var notificationPanelFooterL		= myGM.addElement('div', notificationPanelFooter, 'notificationPanelFooterL' + notificationId, 'notificationPanelFooterL', null, true);
		var notificationPanelFooterR		= myGM.addElement('div', notificationPanelFooterL, 'notificationPanelFooterR' + notificationId, 'notificationPanelFooterR', null, true);
		var notificationPanelFooterM		= myGM.addElement('div', notificationPanelFooterR, 'notificationPanelFooterM' + notificationId, 'notificationPanelFooterM', null, true);

		// Create the button wrapper.
		var notificationPanelButtonWrapper	= myGM.addElement('div', notificationPanel, 'notificationPanelButtonWrapper' + notificationId, 'notificationPanelButtonWrapper', null, true);
		
		// Create the confirm button.
		var notificationPanelConfirm		= myGM.addElement('input', notificationPanelButtonWrapper, 'notificationPanelConfirm' + notificationId, new Array('notificationPanelButton', 'notificationPanelButtonConfirm'), null, true);
		notificationPanelConfirm.type		= 'button';
		notificationPanelConfirm.value		= text.confirm ? text.confirm : Language.$('default_notification_button_confirm');

		// Create the abort button if needed.
		if(callback && callback.abort) {
			var notificationPanelAbort			= myGM.addElement('input', notificationPanelButtonWrapper, 'notificationPanelAbort' + notificationId, new Array('notificationPanelButton', 'notificationPanelButtonAbort'), null, true);
			notificationPanelAbort.type			= 'button';
			notificationPanelAbort.value		= text.abort ? text.abort : Language.$('default_notification_button_abort');
		}
		
		// Insert the texts into header, body and footer.
		notificationPanelHeaderM.innerHTML			= (text.header ? text.header : Language.$('default_notification_header')) + '<div id="' + this.prefix + 'notificationPanelClose' + notificationId + '" class="' + this.prefix + 'notificationPanelClose"></div>';
		notificationPanelFooterM.innerHTML			= scriptInfo.name + ' v' + scriptInfo.version;
		if(text.body) {
			notificationPanelBodyMContent.innerHTML	= text.body;
		} else {
			notificationPanelBodyMTop.innerHTML		= text.bodyTop ? text.bodyTop : '';
			notificationPanelBodyMBottom.innerHTML	= text.bodyBottom ? text.bodyBottom : '';
		}

		// Function to close the notification panel.
		var closeNotificationPanel = function() {
			// Remove the notification background.
			document.body.removeChild(myGM.$('#' + myGM.prefix + 'notificationBackground' + notificationId));

			// Remove the notification panel.
			document.body.removeChild(myGM.$('#' + myGM.prefix + 'notificationPanelContainer' + notificationId));
		};

		// Add event listener to the buttons to close / install.
		this.$('#' + this.prefix + 'notificationPanelClose' + notificationId).addEventListener('click', closeNotificationPanel, false);

		if(callback && callback.confirm) {
			notificationPanelConfirm.addEventListener('click', function() { closeNotificationPanel(); callback.confirm(); }, false);
		} else {
			notificationPanelConfirm.addEventListener('click', closeNotificationPanel, false);
		}

		if(callback && callback.abort) {
			notificationPanelAbort.addEventListener('click', function() { closeNotificationPanel(); callback.abort(); }, false);
		}
		
		return notificationId;
	},

	/**
	 * Gets the first matching child element by a query and returns it.
	 *
	 * @param	String	query
	 *   The query for the element.
	 * @param	element	parent
	 *   The parent element. (optional, default document)
	 *
	 * @return	element
	 *   The element.
	 */
	$: function(query, parent) {
		return this.$$(query, parent)[0];
	},

	/**
	 * Gets all matching child elements by a query and returns them.
	 *
	 * @param	String	query
	 *   The query for the elements.
	 * @param	element	parent
	 *   The parent element. (optional, default document)
	 *
	 * @return	element[]
	 *   The elements.
	 */
	$$: function(query, parent) {
		// If there is no parent set, set it to document.
		if(!parent)	parent = document;

		// Return the elements.
		return Array.prototype.slice.call(parent.querySelectorAll(query));
	},

	/**
	 * Creates a new element and adds it to a parent.
	 *
	 * @param	String					type
	 *   The type of the new element.
	 * @param	element					parent
	 *   The parent of the new element.
	 * @param	int						id
	 *   The last part of the id of the element. (optional, if not set, no id will be set)
	 * @param	String || String[]		classes
	 *   The class(es) of the element. (optional, if not set, no class will be set)
	 * @param	mixed[]					style
	 *   The styles of the element. (optional, if not set, no style will be set)
	 * @param	boolean || boolean[]	hasPrefix
	 *   If no prefix should be used. (optional, if not set, a prefix will be used for id and no prefix will be used for classes)
	 * @param	element					nextSib
	 *   The next sibling of the element. (optional, if not set, the element will be added at the end)
	 *
	 * @return	element
	 *   The new element.
	 */
	addElement: function(type, parent, id, classes, style, hasPrefix, nextSib) {
		// Create the new Element.
		var newElement = document.createElement(type);

		// If there is a id, set it.
		if(id) {
			// Get the id prefix.
			var idPrefix = !(hasPrefix == false || (hasPrefix && hasPrefix.id == false)) ? this.prefix : '';

			// Set the id.
			newElement.id = idPrefix + id;
		}

		// Add all classes.
		if(classes && classes != '') {
			// Get the class prefix.
			var classPrefix = !!(hasPrefix == true || (hasPrefix && hasPrefix.classes == true)) ? this.prefix : '';

			// Set the class(es).
			if(typeof classes == 'string') {
				newElement.classList.add(classPrefix + classes);
			} else {
				for(var i = 0; i < classes.length; i++) {
					newElement.classList.add(classPrefix + classes[i]);
				}
			}
		}

		if(style) {
			for(var i = 0; i < style.length; i++) {
				newElement.style[style[i][0]] = style[i][1];
			}
		}

		// If there is the next sibling defined, insert it before it.
		if(nextSib) {
			parent.insertBefore(newElement, nextSib);

		// Otherwise insert it at the end.
		} else {
			parent.appendChild(newElement);
		}

		// Return the new element.
		return newElement;
	}
};

/**
 * Functions for updater.
 */
Updater = {
	/**
	 * Stores if the update was instructed by the user.
	 */
	manualUpdate: false,

	/**
	 * Init the Updater.
	 */
	init: function() {
		// Get the difference between now and the last check.
		var lastCheck	= myGM.getValue('updater_lastUpdateCheck', 0);
		var millis		= (new Date()).getTime();
		var diff		= millis - lastCheck;

		// If the module is active and the last update is enough time before, check for updates.
		if(myGM.getValue('module_updateActive', true) && diff > myGM.getValue('updater_updateInterval', 3600) * 1000) {
			// No manual Update.
			this.manualUpdate = false;

			// Check for Updates.
			this.checkForUpdates();

			// Set the time for the last update check to now.
			myGM.setValue('updater_lastUpdateCheck', millis + '');
		}
	},

	/**
	 * Search manually for updates.
	 */
	doManualUpdate: function() {
		// Manual Update.
		Updater.manualUpdate = true;

		// Check for Updates.
		Updater.checkForUpdates();

		// Set the time for the last update check to now.
		myGM.setValue('updater_lastUpdateCheck', (new Date()).getTime() + '');
	},

	/**
	 * Check for updates for the Script.
	 *
	 * @return	boolean
	 *   If there is a newer version.
	 */
	checkForUpdates: function() {
		// Send a request to the userscripts.org server to get the metadata of the script to check if there is a new Update.
		myGM.xhr({
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/' + scriptInfo.id + '.meta.js',
				headers: {'User-agent': 'Mozilla/5.0', 'Accept': 'text/html'},
				onload: function(response) {
					// Extract the metadata from the response.
					var metadata = Updater.formatMetadata(response.responseText);
					
					// If a new Update is available and the update hint should be shown.
					if(Updater.newerVersion(scriptInfo.version, metadata.version2) && (myGM.getValue('updater_hideUpdate', scriptInfo.version) != metadata.version2 || Updater.manualUpdate)) {
						// Show update dialogue.
						Updater.showUpdateInfo(metadata);

					// If there is no new update and it was a manual update show hint.
					} else if(Updater.manualUpdate)	{
						// Set the notification text.
						var notificationText = {
							header:	Language.$('default_update_noNewExists_header'),
							body:	Language.$('default_update_noNewExists_text1') + '<a href="http://userscripts.org/scripts/show/' + scriptInfo.id + '" target="_blank" >' + scriptInfo.name + '</a>' + Language.$('default_update_noNewExists_text2') + scriptInfo.version + Language.$('default_update_noNewExists_text3')
						};

						// Show a notification.
						myGM.notification(notificationText);
					}
				}
			});
	},

	/**
	 * Show the update information panel.
	 *
	 * @param	String	versionOld
	 *   The old version number.
	 * @param	String	versionNew
	 *   The new version number.
	 * @param	int		maxPartsToCompare
	 *   The number of parts to compare at most. (optional, default "compare all parts")
	 *
	 * @return	boolean
	 *   If a new version is available.
	 */
	newerVersion: function(versionOld, versionNew, maxPartsToCompare) {
		// Stores if a new version is available.
		var newVersion = false;

		// Force both versions to be a string.
		versionOld += '';
		versionNew += '';

		// The parts of the versions.
		var versionOldParts = versionOld.split('.');
		var versionNewParts = versionNew.split('.');

		// The bigger number of parts of the versions.
		var biggerNumberOfParts = versionOldParts.length > versionNewParts.length ? versionOldParts.length : versionNewParts.length;

		// If all parts should be compared, set maxPartsToCompare to all parts.
		if(!maxPartsToCompare || maxPartsToCompare < 1) {
			maxPartsToCompare = biggerNumberOfParts + 1;
		}

		// Loop over all parts of the version with less parts.
		for(var i = 0; i < biggerNumberOfParts; i++) {
			// Get the value of the parts.
			var versionPartOld = parseInt(versionOldParts[i] || 0);
			var versionPartNew = parseInt(versionNewParts[i] || 0);

			// If the old part is smaller than the new, return true.
			if(versionPartOld < versionPartNew) {
				newVersion = true;
				break;

			// Else if the old part is bigger than the new it is now new version; return false.
			} else if(versionPartOld > versionPartNew || i == maxPartsToCompare - 1) {
				newVersion = false;
				break;
			}
		}

		// No new version, return false.
		return newVersion;
	},

	/**
	 * Show the update information panel.
	 *
	 * @param	mixed[]	metadata
	 *   Array with formated metadata
	 */
	showUpdateInfo: function(metadata) {
		// Get the update history.
		var updateHistory = this.extractUpdateHistory(metadata);

		// Set the notification text.
		var notificationText = {
			header:		Language.$('default_update_possible_header'),
			bodyTop:	Language.$('default_update_possible_text1') + '<a href="http://userscripts.org/scripts/show/' + scriptInfo.id + '" target="_blank" >' + scriptInfo.name + '</a>' + Language.$('default_update_possible_text2') + '.<br>' + Language.$('default_update_possible_text3') + scriptInfo.version + Language.$('default_update_possible_text4') + metadata.version + '.<br>&nbsp;&nbsp;<b><u>' + Language.$('default_update_possible_history') + '</u></b>',
			bodyBottom:	this.formatUpdateHistory(updateHistory),
			confirm:	Language.$('default_update_possible_button_install'),
			abort:		Language.$('default_update_possible_button_hide')
		};

		// Set the notification callback.
		var notificationCallback = {
			confirm:	function() { win.top.location.href = 'http://userscripts.org/scripts/source/' + scriptInfo.id + '.user.js'; },
			abort:		function() { myGM.setValue('updater_hideUpdate', metadata.version + ''); }
		};

		// Show a notification.
		myGM.notification(notificationText, notificationCallback);
	},

	/**
	 * Format the given metadata.
	 *
	 * @param	String	metadata
	 *   The metadata to format.
	 *
	 * @return	String[]
	 *   The formated metadata as array.
	 */
	formatMetadata: function(metadataIn) {
		// Create an array for the formated metadata.
		var metadataOut = new Array();

		// Extract the tags from the metadata.
		var innerMeta = metadataIn.match(/\/\/ ==UserScript==((.|\n|\r)*?)\/\/ ==\/UserScript==/)[0];

		// If there are some tags.
		if(innerMeta) {
			// Extract all tags.
			var tags = innerMeta.match(/\/\/ @(.*?)(\n|\r)/g);

			// Loop over all tags.
			for(var i = 0; i < tags.length; i++) {
				// Extract the data from the tag.
				var tmp = tags[i].match(/\/\/ @(.*?)\s+(.*)/);

				// If there is no data with this tag create a new array to store all data with this tag.
				if(!metadataOut[tmp[1]]) {
					metadataOut[tmp[1]] = new Array(tmp[2]);

				// Otherwise add the data to the existing array.
				} else {
					metadataOut[tmp[1]].push(tmp[2]);
				}
			}
		}

		// Return the formated metadata.
		return metadataOut;
	},

	/**
	 * Extract the update history from the metadata.
	 *
	 * @param	String[]	metadata
	 *   Array with the formated metadata.
	 *
	 * @return	mixed[]
	 *   The extracted update history.
	 */
	extractUpdateHistory: function(metadata) {
		// Create variable to store the update history.
		var updateHistory = new Array();

		// Loop over all update history data.
		for(var i = 0; i < metadata['history'].length; i++) {
			// Get the information from the update history data.
			var tmp = metadata['history'][i].match(/^(\S+)\s+(\S+)\s+(.*)$/);

			// If there is no array for this version create one.
			if(!updateHistory[tmp[1]]) {
				updateHistory[tmp[1]] = new Array();
			}

			// If it is a feature store it to feature in this version.
			if(tmp[2] == 'Feature:') {
				if(!updateHistory[tmp[1]]['feature']) {
					updateHistory[tmp[1]]['feature'] = new Array(tmp[3]);
				} else {
					updateHistory[tmp[1]]['feature'].push(tmp[3]);
				}

			// If it is a bugfix store it to bugfix in this version.
			} else if(tmp[2] == 'Bugfix:') {
				if(!updateHistory[tmp[1]]['bugfix']) {
					updateHistory[tmp[1]]['bugfix'] = new Array(tmp[3]);
				} else {
					updateHistory[tmp[1]]['bugfix'].push(tmp[3]);
				}

			// Otherwise store it to other in this version.
			} else {
				if(!updateHistory[tmp[1]]['other']) {
					updateHistory[tmp[1]]['other'] = new Array(tmp[2] + " " + tmp[3]);
				} else {
					updateHistory[tmp[1]]['other'].push(tmp[2] + " " + tmp[3]);
				}
			}
		}

		// Return the update history.
		return updateHistory;
	},

	/**
	 * Format the update history.
	 *
	 * @param	mixed[]	updateHistory
	 *   The update history.
	 *
	 * @return	String
	 *   The formated update history.
	 */
	formatUpdateHistory: function(updateHistory) {
		// Get the labels for the types.
		var types = {
			feature:	Language.$('default_update_possible_type_feature'),
			bugfix:		Language.$('default_update_possible_type_bugfix'),
			other:		Language.$('default_update_possible_type_other')
		};

		// Create a var for the formated update history.
		var formatedUpdateHistory = '';

		// Loop over all versions.
		for(var version in updateHistory) {
			// Create a headline for each version and start a table.
			formatedUpdateHistory += '<h2>v ' + version + '</h2><br><table class="' + myGM.prefix + 'updateTable"><tbody>';

			// Loop over all types.
			for(var type in updateHistory[version]) {
				// Create a table row for each type and start a list for the elements.
				formatedUpdateHistory += '<tr><td class="' + myGM.prefix + 'updateDataType">' + types[type] + '</td><td class="' + myGM.prefix + 'updateDataInfo"><ul>';

				// Loop over the elements and add them to the list.
				for(var i = 0 ; i < updateHistory[version][type].length; i++) {
					formatedUpdateHistory += '<li>' + updateHistory[version][type][i] + '</li>';
				}

				// End the list.
				formatedUpdateHistory += '</ul></td></tr>';
			}

			// End the table.
			formatedUpdateHistory += '</tbody></table><br>';
		}

		// Return the formated update history.
		return formatedUpdateHistory;
	}
};

/**
 * Functions for language.
 */
Language = {
	/**
	 * The name of the language which is actually set.
	 */
	name: 'English',

	/**
	 * The text of the used language.
	 */
	text: null,

	/**
	 * Init the language and set the used language code.
	 */
	init: function() {
		// Split the host string.
		var lang = top.location.host.split('.');

		// Set the default language code.
		var langCode = 'en';

		// Change the language code, if lang exists.
		if(lang) {
			for(var i = 0; i < lang.length; i++) {
				if(lang[i] == 'ikariam') {
					langCode = lang[i - 1];
					break;
				}
			}
		}

		// Set the language name.
		this.setLangName(langCode);

		// Set the text in the used language.
		this.setText();
	},

	/**
	 * Set the name of the used language.
	 *
	 * @param	String	code
	 *   The laguage code.
	 */
	setLangName: function(code) {
		// All languages.
		var languageName = {
			ae: 'Arabic',		ar: 'Spanish',		ba: 'Bosnian',		bg: 'Bulgarian',	br: 'Portuguese',	by: 'Russian',
			cl: 'Spanish',		cn: 'Chinese',		co: 'Spanish',		cz: 'Czech',		de: 'German',		dk: 'Danish',
			ee: 'Estonian',		en: 'English',		es: 'Spanish',		fi: 'Finish',		fr: 'French',		gr: 'Greek',
			hk: 'Chinese',		hr: 'Bosnian',		hu: 'Hungarian',	id: 'Indonesian',	il: 'Hebrew',		it: 'Italian',
			kr: 'Korean',		lt: 'Lithuanian',	lv: 'Latvian',		mx: 'Spanish',		nl: 'Dutch',		no: 'Norwegian',
			pe: 'Spanish',		ph: 'Filipino',		pk: 'Urdu',			pl: 'Polish',		pt: 'Portuguese',	ro: 'Romanian',
			rs: 'Serbian',		ru: 'Russian',		se: 'Swedish',		si: 'Slovene',		sk: 'Slovak',		tr: 'Turkish',
			tw: 'Chinese',		ua: 'Ukranian',		us: 'English',		ve: 'Spanish',		vn: 'Vietnamese',	yu: 'Bosnian'
		}[code];

		// Look up if implemented contains the language.
		for(var i = 0; i < languageInfo.implemented.length; i++) {
			// If the language is implemented set the name to it and return.
			if(languageInfo.implemented[i] == languageName) {
				this.name = languageName;
				return;
			}
		}

		// If the language is not implemented, set the language to english.
		this.name = 'English';
	},

	/*
	 * Set the text for the script.
	 */
	setText: function() {
		// If a resource is used for the language text, use it.
		if(languageInfo.useResource) {
			// Get the ressource.
			var text = myGM.getResourceParsed('language' + this.name);

			// Store it to Language.text.
			this.text = (text && !text.is_error) ? text : languageInfo.defaultText;

		// Otherwise: Use the text in languageInfo.
		} else {
			// Get the text.
			var text = languageInfo['text'][this.name];

			// Store it to Language.text.
			this.text = (text && !text.is_error) ? text : languageInfo.text.English;
		}
	},

	/**
	 * Return the name of the actually used language.
	 *
	 * @return	String
	 *   The country code.
	 */
	getLangName: function() {
		return this.name;
	},

	/**
	 * Synonymous function for Language.getText().
	 *
	 * @param	String	name
	 *   The name of the placeholder.
	 *
	 * @return	mixed
	 *   The text.
	 */
	$: function(name) {
		return this.getText(name);
	},

	/**
	 * Return the name of the actually used language.
	 *
	 * @param	String	name
	 *   The name of the placeholder.
	 *
	 * @return	mixed
	 *   The text.
	 */
	getText: function(name) {
		// Set the text to the placeholder.
		var erg = name;

		// Split the placeholder.
		var parts = name.split('_');

		// If the splitting was successful.
		if(parts) {
			// Set txt to the "next level".
			var txt = this.text ? this.text[parts[0]] : null;

			// Loop over all parts.
			for(var i = 1; i < parts.length; i++) {
				// If the "next level" exists, set txt to it.
				if(txt && typeof txt[parts[i]] != 'undefined') {
					txt = txt[parts[i]];
				} else {
					txt = erg;
					break;
				}
			}

			// If the text type is not an object, a function or undefined.
			if(typeof txt != 'object' && typeof txt != 'function' && typeof txt != 'undefined') {
				erg = txt;
			}
		}

		// Return the text.
		return erg;
	}
};

/********************************************************
*********************************************************
*****                                               *****
***** End of functions / variables for all Scripts. *****
*****                                               *****
*********************************************************
********************************************************/



/**********************
*** Ikariam Script. ***
**********************/

/**
 * Storage for the unsafeWindow.ikariam funtion.
 */
var ika;

/**
 * General functions.
 */
General = {
	/**
	 * Init the script.
	 */
	init: function() {
		// Set the general used Script styles.
		this.setStyles();

		// Set unsafeWindow.ikariam to ika for easier access.
		ika = win.ikariam;

		// Get the id of the body.
		var viewId = document.body.id;

		// Get the name of the view depending on the body id.
		switch(viewId) {
			case 'worldmap_iso':
				View.name = 'world';
			  break;

			case 'island':
				View.name = 'island';
			  break;

			case 'city':
				View.name = 'town';
			  break;

			default:
			  break;
		}

		// Add the script toolbar.
		myGM.addElement('div', myGM.$('#GF_toolbar'), 'toolbar');
	},

	/**
	 * Set the general script styles.
	 */
	setStyles: function() {
		// Add the general used styles.
		myGM.addStyle(
				"#" + myGM.prefix + "toolbar	{ position: absolute; top: 0px; right: 0px; } \
				 .bottomLine					{ border-bottom: 1px dotted #CCA569; } \
				 .minimizeImg, .maximizeImg		{ background: url('skin/interface/window_control_sprite.png') no-repeat scroll 0 0 transparent; cursor: pointer; display: block; height: 18px; width: 18px; } \
				 .minimizeImg					{ background-position: -144px 0; } \
				 .minimizeImg:hover				{ background-position: -144px -19px; } \
				 .maximizeImg					{ background-position: -126px 0; } \
				 .maximizeImg:hover				{ background-position: -126px -19px; }"
			);

		// Set the notification style.
		myGM.addStyle(
				"." + myGM.prefix + "notificationBackground				{ z-index: 1000000000000; position: fixed; visibility: visible; top: 0px; left: 0px; width: 100%; height: 100%; padding: 0; background-color: #000; opacity: .7; } \
				 ." + myGM.prefix + "notificationPanelContainer			{ z-index: 1000000000001; position: fixed; visibility: visible; top: 100px; left: 50%; width: 500px; height: 370px; margin-left: -250px; padding: 0; text-align: left; color: #542C0F; font: 12px Arial,Helvetica,sans-serif; } \
				 ." + myGM.prefix + "notificationPanel					{ position: relative; top: 0px; left: 0px; background-color: transparent; border: 0 none; overflow: hidden; } \
				 ." + myGM.prefix + "notificationPanelHeader			{ height: 39px; background: none repeat scroll 0 0 transparent; font-weight: bold; line-height: 2; white-space: nowrap; } \
				 ." + myGM.prefix + "notificationPanelHeaderL			{ height: 39px; background-image: url('skin/layout/notes_top_left.png'); background-position: left top; background-repeat: no-repeat; } \
				 ." + myGM.prefix + "notificationPanelHeaderR			{ height: 39px; background-image: url('skin/layout/notes_top_right.png'); background-position: right top; background-repeat: no-repeat; } \
				 ." + myGM.prefix + "notificationPanelHeaderM			{ height: 39px; margin: 0 14px 0 38px; padding: 12px 0 0; background-image: url('skin/layout/notes_top.png'); background-position: left top; background-repeat: repeat-x; color: #811709; line-height: 1.34em; } \
				 ." + myGM.prefix + "notificationPanelBody				{ max-height: 311px; height: 100%; background: none repeat scroll 0 0 transparent; } \
				 ." + myGM.prefix + "notificationPanelBodyL				{ height: 100%; background-image: url('skin/layout/notes_left.png'); background-position: left top; background-repeat: repeat-y; } \
				 ." + myGM.prefix + "notificationPanelBodyR				{ height: 100%; background-image: url('skin/layout/notes_right.png'); background-position: right top; background-repeat: repeat-y; } \
				 ." + myGM.prefix + "notificationPanelBodyM				{ height: 100%; background-color: #F7E7C5; background-image: none;  margin: 0 6px; padding: 0 10px; font-size: 14px; } \
				 ." + myGM.prefix + "notificationPanelBodyMTop			{ max-height: 100px; line-height: 2; } \
				 ." + myGM.prefix + "notificationPanelBodyMTop b		{ line-height: 3.5; font-size:110%; } \
				 ." + myGM.prefix + "notificationPanelBodyM a			{ color: #811709; font-weight: bold; } \
				 ." + myGM.prefix + "notificationPanelBodyM h2			{ font-weight: bold; } \
				 ." + myGM.prefix + "notificationPanelBodyMContent		{ max-height: 270px; padding: 10px; background: url('skin/input/textfield.png') repeat-x scroll 0 0 #FFF7E1; border: 1px dotted #C0C0C0; font: 14px Arial,Helvetica,sans-serif; color: #000000; border-collapse: separate; overflow-y:auto; } \
				 ." + myGM.prefix + "notificationPanelBodyMBottom		{ max-height: 170px; padding: 10px; background: url('skin/input/textfield.png') repeat-x scroll 0 0 #FFF7E1; border: 1px dotted #C0C0C0; font: 14px Arial,Helvetica,sans-serif; color: #000000; border-collapse: separate; overflow-y:auto; } \
				 ." + myGM.prefix + "notificationPanelBodyPlaceholder	{ height: 20px; } \
				 ." + myGM.prefix + "notificationPanelFooter			{ height: 20px; background: none repeat scroll 0 0 transparent; } \
				 ." + myGM.prefix + "notificationPanelFooterL			{ height: 100%; background-image: url('skin/layout/notes_left.png'); background-position: left top; background-repeat: repeat-y; border: 0 none; } \
				 ." + myGM.prefix + "notificationPanelFooterR			{ height: 21px; background-image: url('skin/layout/notes_br.png'); background-position: right bottom; background-repeat: no-repeat; } \
				 ." + myGM.prefix + "notificationPanelFooterM			{ background-color: #F7E7C5; border-bottom: 3px solid #D2A860; border-left: 2px solid #D2A860; margin: 0 23px 0 3px; padding: 3px 0 2px 3px; font-size: 77%; } \
				 ." + myGM.prefix + "notificationPanelClose				{ cursor: pointer; position: absolute; top: 12px; right: 8px; width: 17px; height: 17px; background-image: url('skin/layout/notes_close.png'); } \
				 ." + myGM.prefix + "notificationPanelButtonWrapper		{ bottom: -4px; position: absolute; margin: 10px auto; width: 100%; text-align: center; } \
				 ." + myGM.prefix + "notificationPanelButton			{ background: url('skin/input/button.png') repeat-x scroll 0 0 #ECCF8E; border-color: #C9A584 #5D4C2F #5D4C2F #C9A584; border-style: double; border-width: 3px; cursor: pointer; display: inline; font-weight: bold; margin: 0px 5px; padding: 2px 10px; text-align: center; font-size: 12px; width: 100px; } \
				 ." + myGM.prefix + "notificationPanelButton:hover		{ color: #B3713F; } \
				 ." + myGM.prefix + "notificationPanelButton:active		{ border-color: #5D4C2F #C9A584 #C9A584 #5D4C2F; border-style: double; border-width: 3px; padding: 3px 10px 1px; } \
				 ." + myGM.prefix + "notificationPanelButtonConfirm		{  } \
				 ." + myGM.prefix + "notificationPanelButtonAbort		{  }",
				'notification', true
			);

		// Set the updater style.
		myGM.addStyle(
				"." + myGM.prefix + "updateTable			{ border-collapse: separate; border-spacing: 2px; } \
				 ." + myGM.prefix + "updateDataType			{ width: 100px; padding: 5px 0px 5px 5px; border: 1px solid #D2A860; } \
				 ." + myGM.prefix + "updateDataInfo			{ width: 300px; padding: 5px 5px 5px 20px; border: 1px solid #D2A860; } \
				 ." + myGM.prefix + "updateDataInfo ul li	{ list-style: disc outside none; }",
				'updater', true
			);
	},

	/**
	 * Parses a string number to an int value.
	 *
	 * @param	String	txt
	 *   The number to format.
	 *
	 * @return	int
	 *   The formated value.
	 */
	getInt: function(txt) {
		// Return the formated number.
		return parseInt(txt.replace(/(\.|,)/g, ''));
	},

	/**
	 * Returns the value of the selected option of a select field.
	 *
	 * @param	String	id
	 *   The last part of the id of the element.
	 * @param	boolean	hasNoPrefix
	 *   Says if the id has no prefix.
	 *
	 * @return	String
	 *   The value.
	 */
	getSelectValue: function(id, hasNoPrefix) {
		// Get the select field.
		var select = myGM.$('#' + (hasNoPrefix ? '' : myGM.prefix) + id);

		// Return the value.
		return select.options[select.selectedIndex].value;
	},

	/**
	 * Returns a code consisting of the server name and the country code.
	 *
	 * @return	string
	 *   The code.
	 */
	getServerCode: function() {
		// Split the host string.
		var lang = top.location.host.split('.');

		// Set the language name.
		return (lang ? lang[1] + '_' + lang[0] : 'undefined');
	},

	/**
	 * Formats a number to that format that is used in Ikariam.
	 *
	 * @param	int		num
	 *   The number to format.
	 * @param	boolean || boolean[]	addColor
	 *   If the number should be coloured. (optional, if not set, a color will be used for negative and no color will be used for positive numbers)
	 *
	 * @return	String
	 *   The formated number.
	 */
	formatToIkaNumber: function(num, addColor, usePlusSign) {
		var txt = num + '';

		// Set a seperator every 3 digits from the end.
		txt = txt.replace(/(\d)(?=(\d{3})+\b)/g, '$1' + Language.$('settings_kiloSep'));

		// If the number is negative and it is enabled, write it in red.
		if(num < 0 && !(addColor == false || (addColor && addColor.negative == false))) {
			txt = '<span class="red bold negative">' + txt + '</span>';
		}

		// If the number is positive.
		if(num > 0) {
			// Add the plus sign if wanted.
			txt = (usePlusSign ? '+' : '') + txt;

			// Color the text green if wanted.
			if(!!(addColor == true || (addColor && addColor.positive == true))) {
				txt = '<span class="green bold">' + txt + '</span>';
			}
		}

		// Return the formated number.
		return txt;
	},

	/**
	 * Returns if the user is logged in to the mobile version.
	 *
	 * @return	boolean
	 *   The login-status to mobile.
	 */
	isMobileVersion: function() {
		return (top.location.href.search(/http:\/\/m/) > -1);
	},

	/**
	 * Shows a hint to the user (desktop).
	 *
	 * @param	String	located
	 *   The location of the hint. Possible are all advisors, a clicked element or a committed element.
	 * @param	String	type
	 *   The type of the hint. Possible is confirm, error, neutral or follow the mouse.
	 * @param	String	msgText
	 *   The hint text.
	 * @param	String	msgBindTo
	 *   An element the tooltip is binded (only used if located = committedElement).
	 * @param	String	msgIsMinSize
	 *   If the message is minimized (only used if type = followMouse).
	 */
	showTooltip: function(located, type, msgText, msgBindTo, msgIsMinSize) {
		// Get the message location.
		var msgLocation = -1;
		switch(located) {
			case 'cityAdvisor':
				msgLocation = 1;
			  break;

			case 'militaryAdvisor':
				msgLocation = 2;
			  break;

			case 'researchAdvisor':
				msgLocation = 3;
			  break;

			case 'diplomacyAdvisor':
				msgLocation = 4;
			  break;

			case 'clickedElement':
				msgLocation = 5;
			  break;

			case 'committedElement':
				msgLocation = 6;
			  break;
		}

		// Get the message type.
		var msgType = -1;
		switch(type) {
			case 'confirm':
				msgType = 10;
			  break;

			case 'error':
				msgType = 11;
			  break;

			case 'neutral':
				msgType = 12;
			  break;

			case 'followMouse':
				msgType = 13;
			  break;
		}

		// Show the tooltip.
		ika.controller.tooltipController.bindBubbleTip(msgLocation, msgType, msgText, null, msgBindTo, msgIsMinSize);
	},
	
	/**
	 * Toogle the show / hide Button image and title.
	 * 
	 * @param  Element	button
	 *   The button to toggle.
	 */
	toggleShowHideButton: function(button) {
		// Switch the button picture.
		button.classList.toggle('minimizeImg');
		button.classList.toggle('maximizeImg');
		
		// Switch the button title.
		if(button.title == Language.$('general_hide')) {
			button.title	= Language.$('general_show');
			
			// If mobile version, switch also the inner html.
			if(General.isMobileVersion())	button.innerHTML	= '+';
		} else {
			button.title	= Language.$('general_hide');
			
			// If mobile version, switch also the inner html.
			if(General.isMobileVersion())	button.innerHTML	= '-';
		}
	}
};

/**
 * Functions for event handling.
 */
EventHandling = {
	/**
	 * Events for the upkeep reduction tables.
	 */
	upkeepReductionTable: {
		/**
		 * Toggles the visibility of the reduction information rows.
		 */
		toggle: function(e) {
			// Toggle the button.
			General.toggleShowHideButton(this);
			
			// Get the table rows.
			var tr = myGM.$$('tr', this.parentNode.parentNode.parentNode);
			
			// Toggle the visibility of all table rows except the first.
			for(var i = 1; i < tr.length; i++) {
				tr[i].classList.toggle('invisible');
			}
			
			// Adjust the size of the Scrollbar.
			ika.controller.adjustSizes();
		}
	},

	/**
	 * Events for the zoom function.
	 */
	zoomFunction: {
		/**
		 * Zoom in when clicking on the zoom in button.
		 */
		zoomIn: function() {
			// Get the zoom factor.
			var factor = myGM.getValue('zoom_' + View.name + 'Factor', 100) + ZoomFunction.zoomStep;

			// Zoom.
			ZoomFunction.zoom(factor);
		},

		/**
		 * Zoom out when clicking on the zoom out button.
		 */
		zoomOut: function() {
			// Get the zoom factor.
			var factor = myGM.getValue('zoom_' + View.name + 'Factor', 100) - ZoomFunction.zoomStep;

			// Zoom.
			ZoomFunction.zoom(factor);
		},

		/**
		 * Zoom if the mouse is scrolled.
		 */
		mouseScroll: function(e) {
			// Check if the required keys are pressed.
			var keysPressed = myGM.getValue('zoom_ctrlPressed', true) ? !!e.ctrlKey : true
								&& myGM.getValue('zoom_altPressed', false) ? !!e.altKey : true
								&& myGM.getValue('zoom_shiftPressed', false) ? !!e.shiftKey : true;

			// If the required keys are pressed.
			if(keysPressed) {
				// If the scrolling is horizontally return.
				if (e.axis !== undefined && e.axis === e.HORIZONTAL_AXIS) {
					return;
				}

				// Strorage for the number of steps to scroll.
				var stepNumber = 0;

				// Get the number of steps to scroll.
				if (e.wheelDelta) {
					stepNumber = e.wheelDelta / 120;
				}

				if (e.detail) {
					stepNumber = -e.detail / 3;
				}

				if (e.wheelDeltaY !== undefined) {
					stepNumber = e.wheelDeltaY / 120;
				}
				
				// If the number is between -1 and 0, set it to -1.
				if(stepNumber < 0) {
					stepNumber = stepNumber > -1 ? -1 : Math.round(stepNumber);

				// If the number is between 0 and 1, set it to 1.
				} else {
					stepNumber = stepNumber < 1 ? 1 : Math.round(stepNumber);
				}
				
				// Get the zoom factor.
				var factor = myGM.getValue('zoom_' + View.name + 'Factor', 100) + ZoomFunction.zoomStep * stepNumber;
				
				// Zoom the view.
				ZoomFunction.zoom(factor);

				// Stop the default event.
				if(e.preventDefault) {
					e.preventDefault();
				} else {
					return false;
				}
			}
		}
	},

	/**
	 * Events for the option panel.
	 */
	optionPanel: {
		/**
		 * Toggles the visibility of the option wrapper contents.
		 */
		toggle: function(e) {
			// Toggle the button.
			General.toggleShowHideButton(this);
			
			// Toggle the visibility of the content.
			myGM.$('.content', this.parentNode.parentNode).classList.toggle('invisible');
			
			// Store the visibility.
			var optionId = this.parentNode.parentNode.id.replace(myGM.prefix, '');
			OptionPanel.optionVisibility[optionId] = !OptionPanel.optionVisibility[optionId];
			myGM.setValue('optionPanel_optionVisibility', OptionPanel.optionVisibility);

			// Adjust the size of the Scrollbar.
			ika.controller.adjustSizes();
		},

		/**
		 * Save the settings in the option panel.
		 */
		saveSettings: function() {
			if(General.isMobileVersion()) {
				OptionPanel.saveSettingsMobile();
			} else {
				OptionPanel.saveSettings();
			}
		}
	},

	/**
	 * Events for the info link.
	 */
	memberInfo: {
		/**
		 * Is called after the info link is clicked.
		 */
		clickShow: function() {
			// Set the flag showing the link was klicked.
			myGM.setValue('memberInfo_infoLinkClicked', true);

			// Set the search settings so that the needed view is shown.
			myGM.$('#tab_highscore input[name="searchUser"]').value = '';
			myGM.$('#searchOnlyFriends').checked = false;
			myGM.$('#searchOnlyAllies').checked = true;

			// Start the search.
			myGM.$('#tab_highscore input[type="submit"]').click();
		},

		/**
		 * Is called after the reset button is clicked.
		 */
		clickReset: function() {
			// Store the member information and the actual time.
			myGM.setValue(General.getServerCode() + '_memberInfo_data_' + MemberInfo.type, MemberInfo.data);
			myGM.setValue(General.getServerCode() + '_memberInfo_time_' + MemberInfo.type, (new Date).getTime());

			// Update the view.
			EventHandling.memberInfo.clickShow();
		}
	},

	/**
	 * Events for missing resources.
	 */
	missingResources: {
		/**
		 * If the resources are updated.
		 */
		resourcesUpdated: function(e) {
			// If the popup is closed, remove the action listener.
			if(!myGM.$('#buildingUpgrade')) {
				myGM.$('#cityResources').removeEventListener('DOMSubtreeModified', EventHandling.missingResources.resourcesUpdated, false);

			// Otherwise: update the resources if necessary.
			} else {
				// Timeout to have access to GM_ funtions.
				setTimeout(function() { MissingResources.show(true, true); }, 0);
			}
		}
	},
	
	/**
	 * Functions for replaced urls.
	 */
	replacedUrl: {
		/**
		 * Is called after a replaced url is clicked.
		 */
		click: function(e) {
			// The link which should be opened.
			var linkToOpen = this.innerHTML.decodeHTML();
			
			// Set the notification text.
			var notificationText = {
				header:		Language.$('replacedUrl_notification_header'),
				body:		Language.$('replacedUrl_notification_text1') + '<span class="bold red">"' + linkToOpen + '"</span>' + Language.$('replacedUrl_notification_text2'),
				confirm:	Language.$('general_yes'),
				abort:		Language.$('general_no')
			};

			// Set the notification callback.
			var notificationCallback = {
				confirm:	function() { win.open(linkToOpen); }
			};

			// Show the notification.
			myGM.notification(notificationText, notificationCallback);
		}
	},
	
	/**
	 * Functions for unit info.
	 */
	unitInfo: {
		/**
		 * Is called after the "show info" button is clicked.
		 */
		click: function() {
			UnitInfo.showPopup();
		}
	},
	
	/**
	 * Events for loading preview.
	 */
	loadingPreview: {
		/**
		 * Is called after an attribute of loadingPreview was modified.
		 *
		 * @param	event	e
		 *   The calling event.
		 */
		attrModified: function(e) {
			// If the attribute was changed.
			if(e.attrChange == MutationEvent.MODIFICATION) {
				// If the style.display is set to none.
				if(e.attrName.trim() == 'style' && e.newValue.search(/display: none/i) != -1) {
					// Timeout to have access to GM_ funtions.
					setTimeout(EnhancedView.getPopup, 0);
				}
			}
		}
	}
};

/**
 * Functions for enhanced view.
 */
EnhancedView = {
	/**
	 * Inits the enhanced view.
	 * Decides if the version of ikariam is mobile or desktop.
	 */
	init: function() {
		// If the version is mobile.
		if(General.isMobileVersion()) {
			this.initMobile();

		// Otherwise; the version is desktop.
		} else {
			this.initDesktop();
		}
	},

	/**
	 * Inits the desktop version.
	 * Adds the event listener to the loadingPreview.
	 */
	initDesktop: function() {
		// Wait for a popup.
		myGM.$('#loadingPreview').addEventListener('DOMAttrModified', EventHandling.loadingPreview.attrModified, false);

		// Init parts which are not shown in popups.
		this.initDesktopStatic();
	},

	/**
	 * Inits the modifications on the website which are not shown in popups.
	 */
	initDesktopStatic: function() {
		// Hide the Bird animation.
		if(myGM.getValue('module_hideBirdsActive', true))			View.hideBirds();

		// Init the Zoom function.
		if(myGM.getValue('module_zoomActive', true))				ZoomFunction.init();

		// Init the circular message link.
		if(myGM.getValue('module_easyCircularMsgActive', true))		Message.easyCircularMessage();

		// Init the function for showing the resource information.
		if(myGM.getValue('module_resourceInfoActive', true)
			|| myGM.getValue('module_capacityInfoActive', true))	ResourceInfo.init();
		
		// Move loading circle.
		if(myGM.getValue('module_lcMoveActive', true))				View.moveLoadingCircle();

		// Init the function for showing the missing resources.
		if(myGM.getValue('module_missingResActive', true))			MissingResources.init();
		
		// Init the function for easy access of some popups.
		if(myGM.getValue('module_easyAccessActive', true))			ResourceInfo.addRessourceLinks();

		// Don't center town advisor.
		if(myGM.getValue('module_nctAdvisorActive', true))			View.noCenterTownAdvisor();

		// Init the function for showing the missing resources.
		if(myGM.getValue('module_niceAllyPageActive', true))		View.niceAllyPage();

		// If the military tooltip should be shown without mouseover or click, add the styles.
		if(myGM.getValue('module_directMilitaryTtActive', true))	Tooltips.initDirectMilitaryTooltip();

		// Set the colonizing links.
		if(myGM.getValue('module_colonizingLinksActive', true)
			&& View.name == 'island')								City.setColonizingLinks();

		// Set the styles for the
		if(myGM.getValue('module_replaceUrlsActive', true))			Message.setStyleForReplaceUrl();

		// Init the function for showing the missing resources.
		if(myGM.getValue('module_memberInfoActive', false))			MemberInfo.init();
	},

	/**
	 * Inits the mobile version.
	 */
	initMobile: function() {
		// Get the param string.
		var params = top.location.search;

		// If the view is finances.
		if(params.search(/view=finances/) > -1) {
			if(myGM.getValue('module_incomeActive', true))		Balance.incomeOnTopMobile();
			if(myGM.getValue('module_urtShortActive', true))	Balance.shortUpkeepReductionTable();
		}

		// If the view is game options.
		if(params.search(/view=options&page=game/) > -1) {
			OptionPanel.mobile();
		}
	},

	/**
	 * Calls the script module depending on the popup.
	 */
	getPopup: function() {
		// Update resource information.
		if(myGM.getValue('module_resourceInfoActive', true))								ResourceInfo.updateHourlyResourceInfo();

		// Set the colonizing links.
		if(myGM.getValue('module_colonizingLinksActive', true) && View.name == 'island')	City.setColonizingLinks();

		// If the script was already executed on this popup.
		if(myGM.$('#' + myGM.prefix + 'alreadyExecutedPopup'))	return;

		// Get the popup.
		var popup = myGM.$('.templateView');

		// Get the popup id.
		var popupId = popup ? popup.id.replace('_c', '') : '';

		// If a popup exists, add the hint, that the popup script was executed.
		if(popup) {
			var alreadyExecuted		= myGM.addElement('input', myGM.$('.mainContent', popup), 'alreadyExecutedPopup');
			alreadyExecuted.type	= 'hidden';
		}

		/******************************************************
		*** Functions that should only run once on a popup. ***
		******************************************************/

		// Select the modules of the script which should be executed.
		switch(popupId) {
			// Options popup.
			case 'options':
				OptionPanel.desktop();
			  break;

			// Finance popup.
			case 'finances':
				if(myGM.getValue('module_incomeActive', true))		Balance.incomeOnTop();
				if(myGM.getValue('module_urtShortActive', true))	Balance.shortUpkeepReductionTable();
			  break;

			// Military view popup.
			case 'militaryAdvisor':
				if(myGM.getValue('module_directMilitaryTtActive', true))	Tooltips.directMilitaryTooltip();
				if(myGM.getValue('module_ttAutoActive', true))				Tooltips.autoshowInMilitaryView();
			  break;

			// Diplomacy ally view popup.
			case 'diplomacyAlly':
				if(myGM.getValue('module_ttAutoActive', true))			Tooltips.autoshowInAllianceView();
			  break;

			// Show messages.
			case 'diplomacyAdvisor':
			case 'diplomacyAdvisorOutBox':
			case 'diplomacyAdvisorArchive':
			case 'diplomacyAdvisorArchiveOutBox':
				if(myGM.getValue('module_replaceUrlsActive', true))	Message.replaceUrl();
			  break;

			// Diplomacy ally view popup in embassy.
			case 'embassy':
				if(myGM.getValue('module_ttAutoActive', true))		Tooltips.autoshowInAllianceView();
			  break;

			// Building ground popup.
			case 'buildingGround':
				if(myGM.getValue('module_missingResActive', true))	MissingResources.showInBuildingGround();
			  break;

			// Write message popup.
			case 'sendIKMessage':
				if(myGM.getValue('module_messageSigActive', true))	Message.addSignature();
			  break;
			
			// Troops in town popup.
			case 'cityMilitary':
				if(myGM.getValue('module_unitInfoActive', true))	UnitInfo.addPopupLink();
			  break;

			// Highscore popup.
			case 'highscore':
				if(myGM.getValue('module_memberInfoActive', false))	MemberInfo.show();
			  break;
		}

		// Building view.
		if(myGM.$('#buildingUpgrade') && myGM.getValue('module_missingResActive', true))	MissingResources.showInSidebar();
	}
};

/**
 * Functions for the general view.
 */
View = {
	/**
	 * Storage for the name of the view.
	 */
	name: '',

	/**
	 * Move loading circle to breadcrumb.
	 */
	moveLoadingCircle: function() {
		// Add the styles.
		myGM.addStyle(
				"#js_worldBread		{ margin-left: 16px !important; } \
				 #loadingPreview	{ transform: scale(0.5); -o-transform: scale(0.5); -webkit-transform: scale(0.5); left: 35px !important; top: 141px !important; }"
			);
	},

	/**
	 * Hide the bird animation but no other animation.
	 */
	hideBirds: function() {
		// Add the style.
		myGM.addStyle(
				 ".bird_swarm	{ visibility: hidden !important; }"
			);
	},

	/**
	 * Don't center the city and date in town advisor vertically.
	 */
	noCenterTownAdvisor: function() {
		// Add the style.
		myGM.addStyle(
				"#inboxCity td	{ vertical-align: top !important; }"
			);
	},

	/**
	 * Format the allypage better.
	 */
	niceAllyPage: function() {
		// Add the style.
		myGM.addStyle(
				"#allyPage_c .allypage	{ padding: 4px 12px; text-align: left; }"
			);
	}
};

/**
 * Functions for tooltips.
 */
Tooltips = {
	/**
	 * Show tooltips in alliance view automatically.
	 */
	autoshowInAllianceView: function() {
		// Enable toggling on mouseover / mouseout.
		this.autoshowGeneral('cityInfo');
	},

	/**
	 * Show tooltips in military advisor view automatically.
	 */
	autoshowInMilitaryView: function() {
		// Enable toggling on mouseover / mouseout.
		this.autoshowGeneral('spyMilitary', myGM.getValue('module_directMilitaryTtActive', true));
	},

	/**
	 * Show tooltips with class name magnifierClass automatically.
	 *
	 * @param	String	magnifierClass
	 *   The class of the tooltips to enable toggling.
	 * @param	boolean	deleteOnClick
	 *   If the onClick event should be deleted or just moved to mouseover.
	 */
	autoshowGeneral: function(magnifierClass, deleteOnClick) {
		// Get all magnifiers.
		var magnifier = myGM.$$('.' + magnifierClass);

		// Set the mousover and mouseout for all magnifiers.
		for(var i = 0; i < magnifier.length; i++) {
			// Get the onclick event and "delete" the old one.
			var magOnClick = magnifier[i].onclick;
			magnifier[i].onclick = 'return false;';

			// If the on click event should be moved.
			if(!deleteOnClick) {
				// Add the show event.
				var magIcon = myGM.$('.magnify_icon', magnifier[i]);
				if(!magIcon) magIcon = magnifier[i];
				magIcon.addEventListener('mouseover', function(e) { ika.controller.captureMousePosition(e); this(e); }.bind(magOnClick), true);
			}
		}

		// If the on click event should be moved.
		if(!deleteOnClick) {
			// Trigger the close event with jQuery on a click on the popup.
			myGM.$('.templateView .mainContent').addEventListener('click', function() { win.$(document).trigger("closeExclusiveInfo"); }, true);
		}
	},

	/**
	 * Shows the military tooltip without mouseover.
	 */
	initDirectMilitaryTooltip: function() {
		// Add the styles.
		myGM.addStyle(
				"#js_MilitaryMovementsFleetMovementsTable .military_event_table .magnify_icon				{ background-image: none; cursor: default; width: 240px; } \
				 #js_MilitaryMovementsFleetMovementsTable .military_event_table .magnify_icon .infoTip		{ display: inline; position: relative; padding: 0px; border: none; } \
				 #js_MilitaryMovementsFleetMovementsTable .military_event_table .magnify_icon .infoTip h5	{ display: none; } \
				 #js_MilitaryMovementsFleetMovementsTable .military_event_table .icon40						{ background-size: 25px 25px; background-color: transparent; padding: 26px 3px 0px 3px; width: 30px; } \
				 #js_MilitaryMovementsFleetMovementsTable .military_event_table .icon40.resource_icon		{ background-size: 20px 16px; }"
			);
	},

	/**
	 * Hide the ship number of own transports and add titles to the loaded troops / ships / resources.
	 */
	directMilitaryTooltip: function() {
		// Get the table rows.
		var militaryEventTableTr = myGM.$$('#js_MilitaryMovementsFleetMovementsTable .military_event_table tr');
		
		// Loop at the table rows.
		for(var i = 1; i < militaryEventTableTr.length; i++) {
			// Get the mission div.
			var missionDiv = myGM.$('td:nth-child(1) div.mission_icon', militaryEventTableTr[i]);

			// If it is your own table row and the mission is transport or trade.
			if(militaryEventTableTr[i].classList.contains('own') && (missionDiv.classList.contains('transport') || missionDiv.classList.contains('trade'))) {
				// Hide the table cell.
				myGM.$('td:nth-child(4) div', militaryEventTableTr[i]).classList.add('invisible');
			}
		}
		
		// Storage for the unit / ships / resources classes and names.
		var idTranslation = new Array(
				{ classId: 'swordsman',				langId: 'name_unit_swordsman'		},	{ classId: 'phalanx',				langId: 'name_unit_phalanx'			},	{ classId: 'archer',		langId: 'name_unit_archer'		},	{ classId: 'marksman',			langId: 'name_unit_marksman'	},	{ classId: 'mortar',					langId: 'name_unit_mortar'		},	{ classId: 'slinger',			langId: 'name_unit_slinger'			},	{ classId: 'catapult',		langId: 'name_unit_catapult'	},	{ classId: 'ram',		langId: 'name_unit_ram'			},	{ classId: 'steamgiant',		langId: 'name_unit_steamgiant'	},	{ classId: 'bombardier',		langId: 'name_unit_bombardier'	},	{ classId: 'cook',				langId: 'name_unit_cook'		},
				{ classId: 'medic',					langId: 'name_unit_medic'			},	{ classId: 'gyrocopter',			langId: 'name_unit_gyrocopter'		},	{ classId: 'spearman',		langId: 'name_unit_spearman'	},	{ classId: 'ship_balliasta',	langId: 'name_ship_balliasta'	},	{ classId: 'ship_catapult',				langId: 'name_ship_catapult'	},	{ classId: 'ship_flamethrower',	langId: 'name_ship_flamethrower'	},	{ classId: 'ship_mortar',	langId: 'name_ship_mortar'		},	{ classId: 'ship_ram',	langId: 'name_ship_ram'			},	{ classId: 'ship_steamboat',	langId: 'name_ship_steamboat'	},	{ classId: 'ship_rocketship',	langId: 'name_ship_rocketship'	},	{ classId: 'ship_submarine',	langId: 'name_ship_submarine'	},
				{ classId: 'ship_paddlespeedship',	langId: 'name_ship_paddlespeedship'	},	{ classId: 'ship_balloncarrier',	langId: 'name_ship_balloncarrier'	},	{ classId: 'ship_tender',	langId: 'name_ship_tender'		},	{ classId: 'ship_transport',	langId: 'name_ship_transport'	},	{ classId: 'ship_premium_transport',	langId: 'name_ship_transport'	},	{ classId: 'gold',				langId: 'name_resource_gold'		},	{ classId: 'wood',			langId: 'name_resource_wood'	},	{ classId: 'wine',		langId: 'name_resource_wine'	},	{ classId: 'marble',			langId: 'name_resource_marble'	},	{ classId: 'glass',				langId: 'name_resource_glass'	},	{ classId: 'sulfur',			langId: 'name_resource_sulfur'	}
			);
		
		// Get the event table.
		var movementsTable = myGM.$('#js_MilitaryMovementsFleetMovementsTable');
		
		// Add the unit names.
		for(var i = 0; i < idTranslation.length; i++) {
			var detailIcon = myGM.$$('.icon40.' + idTranslation[i].classId, movementsTable);
			
			for(var k = 0; k < detailIcon.length; k++) {
				detailIcon[k].title = Language.$(idTranslation[i].langId);
			}
		}
	}
};

/**
 * Functions for balance view.
 */
Balance = {
	/**
	 * Shows the actual income also on top of the site. (desktop)
	 */
	incomeOnTop: function() {
		// Get the table for the summary.
		var summaryTable = myGM.$('.table01');

		// Show the income on top.
		this.showIncomeOnTop(summaryTable);

		// Adjust the size of the Scrollbar.
		ika.controller.adjustSizes();
	},

	/**
	 * Shows the actual income also on top of the site. (mobile)
	 */
	incomeOnTopMobile: function() {
		// Get the table for the summary.
		var summaryTable = myGM.$('#balance');

		// Show the income on top.
		this.showIncomeOnTop(summaryTable);
	},

	/**
	 * Show the actual income on top of the site.
	 *
	 * @param	element	summaryTable
	 *   The table for the summary.
	 */
	showIncomeOnTop: function(summaryTable) {
		// Get the actual income.
		var income = this.getIncome();

		// Create the rows for the income per day and the income per day.
		var incomeRow		= myGM.addElement('tr', summaryTable, null, new Array('result', 'alt'));
		var incomeRow24h	= myGM.addElement('tr', summaryTable, null, 'result');

		// Create the content of the table rows.
		this.createTableRow(new Array(Language.$('balance_income_perHour'), '', '', General.formatToIkaNumber(income)), new Array('sigma', ['value', 'res'], ['value', 'res'], ['value', 'res']), incomeRow, false);
		this.createTableRow(new Array(Language.$('balance_income_perDay'), '', '', General.formatToIkaNumber(income * 24)), new Array('sigma', ['value', 'res'], ['value', 'res'], ['value', 'res']), incomeRow24h, false);
	},

	/**
	 * Gets the actual income from the Ikariam page and returns it.
	 *
	 * @return	int
	 *   The actual income
	 */
	getIncome: function() {
		// Get the table cell with the actual income.
		var incomeCell = myGM.$$('.hidden')[myGM.$$('.hidden').length - 1];

		// If the content of the cell is not just the income move one element inwards.
		while(incomeCell.firstChild.firstChild) {
			incomeCell = incomeCell.firstChild;
		}

		// Get the actual income.
		var txt = incomeCell.innerHTML;

		// Remove the thousand seperators.
		return General.getInt(txt);
	},

	/**
	 * Shows a short upkeep reduction table.
	 */
	shortUpkeepReductionTable: function() {
		// Get the upkeep redutcion tables.
		var uRT = myGM.$$('.upkeepReductionTable');

		if(uRT.length == 0) {
			uRT = myGM.$$('#upkeepReductionTable');
		}

		// Create an array for data storage.
		var row	= {
			reason:			new Array(),
			basicUpkeep:	new Array(),
			supplyUpkeep:	new Array(),
			result:			new Array()
		};
		
		// Get the data for the troops and ships redution rows.
		for(var i = 0; i < 3; i++) {
			row.reason.push(Language.$('balance_upkeep_reason_' + i));
			row.basicUpkeep.push(General.getInt(myGM.$$('.altbottomLine td.hidden, .result td.hidden, .alt.bottomLine td.hidden, .result td.hidden', uRT[0])[i].innerHTML));
			row.supplyUpkeep.push(General.getInt(myGM.$$('.altbottomLine td.hidden, .result td.hidden, .alt.bottomLine td.hidden, .result td.hidden', uRT[1])[i].innerHTML));
			row.result.push(row.basicUpkeep[i] + row.supplyUpkeep[i]);
		}

		// Get the start income.
		var beforeReduction = General.getInt(myGM.$('td.hidden', uRT[2]).innerHTML);

		// Get the result income.
		var income = this.getIncome();

		// Create the table to show the
		var shortTable = myGM.addElement('table', uRT[0].parentNode, null, new Array('table01', 'border', 'left'), null, null, uRT[0]);
		shortTable.id = 'balance';

		// Create the table head.
		this.createTableRow(new Array('', Language.$('balance_upkeep_basic'), Language.$('balance_upkeep_supply'), Language.$('balance_upkeep_result')), new Array('city', ['value', 'res'], ['value', 'res'], ['value', 'res']), myGM.addElement('tr', shortTable), true);

		// Create the start income row.
		var startRow = myGM.addElement('tr', shortTable, null, new Array('alt', 'bottomLine'));
		this.createTableRow(new Array(Language.$('balance_income_start'), '', '', General.formatToIkaNumber(beforeReduction)), new Array('city', ['value', 'res'], ['value', 'res'], ['value', 'res']), startRow, false);

		// Create the troops / ships redution rows.
		for(var i = 0; i < 3; i++) {
			var newRow = myGM.addElement('tr', shortTable, null, (i % 2 == 1) ? new Array('alt', 'bottomLine') : '');
			this.createTableRow(new Array(row.reason[i], General.formatToIkaNumber(-row.basicUpkeep[i]), General.formatToIkaNumber(-row.supplyUpkeep[i]), General.formatToIkaNumber(-row.result[i])), new Array('city', ['value', 'res'], ['value', 'res'], 'hidden'), newRow, false);
		}

		// Create the result row.
		var resultRow = myGM.addElement('tr', shortTable, null, 'result');
		this.createTableRow(new Array('<img alt="Summe" src="skin/layout/sigma.png">', '', '', General.formatToIkaNumber(income)), new Array('sigma', ['value', 'res'], ['value', 'res'], 'hidden'), resultRow, false);

		// Create the spacing between the tables.
		myGM.addElement('hr', uRT[0].parentNode, null, null, null, null, uRT[0]);

		// Hide the data rows of the tables and add the show button.
		for(var i = 0; i < uRT.length; i++) {
			// Get all rows.
			var tr = myGM.$$('tr', uRT[i]);

			// Hide all rows except the first.
			for(var k = 1; k < tr.length; k++) {
				tr[k].classList.add('invisible');
			}

			// Add the show button to the first row.
			var th = myGM.$('th', tr[0]);
			var btn = myGM.addElement('div', th, null, 'maximizeImg', new Array(['cssFloat', 'left']), th.firstChild);
			btn.title = Language.$('general_show');
			
			// If mobile version.
			if(General.isMobileVersion()){
				btn.innerHTML = '+';
			}

			// Add the event listener.
			btn.addEventListener('click', EventHandling.upkeepReductionTable.toggle, false);
		}

		// Adjust the size of the Scrollbar.
		ika.controller.adjustSizes();
	},

	/**
	 * Adds cells to a table row.
	 *
	 * @param	String[]	cellText
	 *   Array with the text of the cells.
	 * @param	String[]	cellClassName
	 *   Array with the classes of the cells.
	 * @param	element		row
	 *   Table row where the cells should be added.
	 * @param	boolean		head
	 *   If the row is a table head row.
	 */
	createTableRow: function(cellText, cellClassName, row, head) {
		// Do this for every cell.
		for(var i = 0; i < cellText.length; i++) {
			// Add the cell.
			var cell = myGM.addElement(head ? 'th' : 'td', row, null, cellClassName[i]);

			// Set the content of the cell.
			cell.innerHTML = cellText[i];
		}
	}
};

/**
 * Functions for option panel.
 */
OptionPanel = {
	/**
	 * Storage for option visibility.
	 */
	optionVisibility: {
		moduleOption:	true
	},

	/**
	 * Adds the tab for the script options in the desktop version.
	 */
	desktop: function() {
		// Get the script options tab.
		var tabGMOptions = myGM.$('#tabScriptOptions');
		
		// If the script options tab doesn't exists, create it.
		if(!tabGMOptions) {
			// Set the styles.
			this.setStylesDesktop();

			// Add the GM tab link to the tab menu.
			var tabmenu					= myGM.$('.tabmenu');
			var jsTabGMOptions			= myGM.addElement('li', tabmenu, 'js_tabScriptOptions', 'tab', null, false);
			jsTabGMOptions.innerHTML	= '<b class="tabScriptOptions"> ' + Language.$('optionPanel_scripts') + ' </b>';
			jsTabGMOptions.setAttribute('onclick', "switchTab('tabScriptOptions');");

			// Add the content wrapper for the GM tab to the tab menu.
			var mainContent				= myGM.$('#tabGameOptions').parentNode;
			tabGMOptions			= myGM.addElement('div', mainContent, 'tabScriptOptions', null, new Array(['display', 'none']), false);
		}

		// Fill the tab with content.
		this.createTabContent(tabGMOptions);
	},

	/**
	 * Shows the options for the script in the mobile version.
	 */
	mobile: function() {
		// Get the mainview.
		var mainview = myGM.$('#mainview');

		// Create the options wrapper.
		var wrapper = this.createOptionsWrapper(mainview, scriptInfo.name);

		// Add the checkboxes for the enabling / disabling of modules.
		this.createModuleContentMobile(wrapper);

		// Add the options for updates.
		this.createUpdateContentMobile(wrapper);

		// Horizontal row.
		myGM.addElement('hr', wrapper);

		// Prepare placeholder for save hint.
		myGM.addElement('p', wrapper, 'saveHint');

		// Add the button to save the settings.
		this.addSaveButton(wrapper);
	},

	/**
	 * Sets the styles that are used for the update-panel.
	 */
	setStylesDesktop: function() {
		// Add all styles to the ikariam page.
		myGM.addStyle(
				"#js_tabGameOptions, #js_tabAccountOptions, #js_tabFacebookOptions, #js_tabOpenIDOptions, #js_tabScriptOptions	{ width: 130px !important; margin-left: 5px !important; border-radius: 5px 5px 0px 0px } \
				 ." + myGM.prefix + "SignatureInput	{ resize: none; width: 99%; height: 75px; } \
				 #tabScriptOptions hr				{ margin: 0; } \
				 .cbWrapper							{ margin: 0 0 0 10px; }"
			);
	},

	/**
	 * Creates the content of the tab.
	 *
	 * @param	element	tab
	 *   The tab where the content should be added.
	 */
	createTabContent: function(tab) {
		// Get the option visibility.
		this.optionVisibility = myGM.getValue('optionPanel_optionVisibility', this.optionVisibility);

		// Create the wrapper for the enabling / disabling of modules.
		var moduleContentWrapper	= this.createOptionsWrapper(tab, Language.$('optionPanel_section_module_title'), 'moduleOption');
		this.createModuleContent(moduleContentWrapper);

		// Create the wrapper for the update settings.
		var updateContentWrapper	= this.createOptionsWrapper(tab, Language.$('optionPanel_section_update_title'), 'updateOption');
		this.createUpdateContent(updateContentWrapper);

		// Create the wrapper for the resource information / missing resources.
		var rimrContentWrapper		= this.createOptionsWrapper(tab, Language.$('optionPanel_section_resInfoMissingRes_title'), 'resInfoMissingResOption');
		this.createResInfoMissingResContent(rimrContentWrapper);

		// Create the wrapper for the zoom settings.
		var zoomContentWrapper		= this.createOptionsWrapper(tab, Language.$('optionPanel_section_zoom_title'), 'zoomOption');
		this.createZoomContent(zoomContentWrapper);

		// Create the wrapper for the zoom settings.
		var sigContentWrapper		= this.createOptionsWrapper(tab, Language.$('optionPanel_section_messageSignature_title'), 'messageSignatureOption');
		this.createMessageSigContent(sigContentWrapper);
	},

	/**
	 * Create a wrapper for a section on the option panel.
	 *
	 * @param	element	tab
	 *   The tab where the wrapper should be added.
	 * @param	String	headerText
	 *   The text of the header.
	 * @param	String	id
	 *   The id of the option wrapper.
	 *
	 * @return	element
	 *   The wrapper for the content of the options.
	 */
	createOptionsWrapper: function(tab, headerText, id) {
		// Get the content show status.
		var showContent = !!this.optionVisibility[id];

		// Create the wrapper.
		var optionsWrapper	= myGM.addElement('div', tab, id, 'contentBox01h');

		// Create the header.
		var optionsHeader		= myGM.addElement('h3', optionsWrapper, null, 'header');
		optionsHeader.innerHTML	= headerText;

		// Add the show / hide button.
		var btn = myGM.addElement('div', optionsHeader, null, showContent ? 'minimizeImg' : 'maximizeImg', new Array(['cssFloat', 'left']));
		btn.addEventListener('click', EventHandling.optionPanel.toggle, false);
		btn.title = showContent ? Language.$('general_hide') : Language.$('general_show');

		// Create the content wrapper.
		var optionsWrapperContent	= myGM.addElement('div', optionsWrapper, null, showContent ? 'content' : new Array('content', 'invisible'));

		// Create the footer.
		myGM.addElement('div', optionsWrapper, null, 'footer');

		// Return the content wrapper.
		return optionsWrapperContent;
	},

	/**
	 * Creates the content of the module part.
	 *
	 * @param	element	contentWrapper
	 *   The wrapper where the content should be added.
	 */
	createModuleContent: function(contentWrapper) {
		// Create options table.
		var updateTable	= this.addOptionsTable(contentWrapper);

		// Set the checkbox data.
		var cbData	= new Array(
				{ id: 'update',					checked: myGM.getValue('module_updateActive', true),			label: Language.$('optionPanel_section_module_label_updateActive'),				hrAfter: true	},
				{ id: 'incomeOnTop',			checked: myGM.getValue('module_incomeActive', true),			label: Language.$('optionPanel_section_module_label_incomeOnTopActive'),		hrAfter: false	},
				{ id: 'upkeepReduction',		checked: myGM.getValue('module_urtShortActive', true),			label: Language.$('optionPanel_section_module_label_upkeepReductionActive'),	hrAfter: false	},
				{ id: 'missingResources',		checked: myGM.getValue('module_missingResActive', true),		label: Language.$('optionPanel_section_module_label_missingResActive'),			hrAfter: false	},
				{ id: 'resourceInformation',	checked: myGM.getValue('module_resourceInfoActive', true),		label: Language.$('optionPanel_section_module_label_resourceInfoActive'),		hrAfter: false	},
				{ id: 'capacityInformation',	checked: myGM.getValue('module_capacityInfoActive', true),		label: Language.$('optionPanel_section_module_label_capacityInfoActive'),		hrAfter: false	},
				{ id: 'easyAccess',				checked: myGM.getValue('module_easyAccessActive', true),		label: Language.$('optionPanel_section_module_label_easyAccessActive'),			hrAfter: false	},
				{ id: 'zoom',					checked: myGM.getValue('module_zoomActive', true),				label: Language.$('optionPanel_section_module_label_zoomActive'),				hrAfter: true	},
				{ id: 'messageSignature',		checked: myGM.getValue('module_messageSigActive', true),		label: Language.$('optionPanel_section_module_label_messageSignatureActive'),	hrAfter: false	},
				{ id: 'easyCircularMessage',	checked: myGM.getValue('module_easyCircularMsgActive', true),	label: Language.$('optionPanel_section_module_label_easyCircularMsgActive'),	hrAfter: false	},
				{ id: 'replaceUrls',			checked: myGM.getValue('module_replaceUrlsActive', true),		label: Language.$('optionPanel_section_module_label_replaceUrlsActive'),		hrAfter: false	},
				{ id: 'colonizingLinks',		checked: myGM.getValue('module_colonizingLinksActive', true),	label: Language.$('optionPanel_section_module_label_colonizingLinksActive'),	hrAfter: true	},
				{ id: 'loadingCircleMove',		checked: myGM.getValue('module_lcMoveActive', true),			label: Language.$('optionPanel_section_module_label_lcMoveActive'),				hrAfter: false	},
				{ id: 'tooltipsAuto',			checked: myGM.getValue('module_ttAutoActive', true),			label: Language.$('optionPanel_section_module_label_tooltipsAutoActive'),		hrAfter: false	},
				{ id: 'directMilitaryTooltip',	checked: myGM.getValue('module_directMilitaryTtActive', true),	label: Language.$('optionPanel_section_module_label_directMilitaryTtActive'),	hrAfter: false	},
				{ id: 'unitInfo', 				checked: myGM.getValue('module_unitInfoActive', true),			label: Language.$('optionPanel_section_module_label_unitInfoActive'),			hrAfter: true	},
				{ id: 'hideBirds',				checked: myGM.getValue('module_hideBirdsActive', true),			label: Language.$('optionPanel_section_module_label_hideBirdsActive'),			hrAfter: false	},
				{ id: 'noCenterTownAdvisor',	checked: myGM.getValue('module_nctAdvisorActive', true),		label: Language.$('optionPanel_section_module_label_nctAdvisorActive'),			hrAfter: false	},
				{ id: 'niceAllyPage',			checked: myGM.getValue('module_niceAllyPageActive', true),		label: Language.$('optionPanel_section_module_label_niceAllyPageActive'),		hrAfter: true	},
				{ id: 'memberInformation',		checked: myGM.getValue('module_memberInfoActive', false),		label: Language.$('optionPanel_section_module_label_memberInfoActive'),			hrAfter: false	}
			);

		// Create the checkboxes.
		this.addCheckboxes(updateTable, cbData);

		// Add the button to save the settings.
		this.addSaveButton(contentWrapper);
	},

	/**
	 * Creates the content of the module part of the mobile version.
	 *
	 * @param	element	contentWrapper
	 *   The wrapper where the content should be added.
	 */
	createModuleContentMobile: function(contentWrapper) {
		// Create the header.
		var moduleHeader		= myGM.addElement('h3', contentWrapper);
		moduleHeader.innerHTML	= Language.$('optionPanel_section_module_title');

		// Get the ids.
		var id		= new Array(
				'update',
				'incomeOnTop',
				'upkeepReduction'
			);

		// Get the values.
		var value	= new Array(
				myGM.getValue('module_updateActive', true),
				myGM.getValue('module_incomeActive', true),
				myGM.getValue('module_urtShortActive', true)
			);

		// Get the labels.
		var label	= new Array(
				'&nbsp;&nbsp;' + Language.$('optionPanel_section_module_label_updateActive'),
				'&nbsp;&nbsp;' + Language.$('optionPanel_section_module_label_incomeOnTopActive'),
				'&nbsp;&nbsp;' + Language.$('optionPanel_section_module_label_upkeepReductionActive')
			);

		// Create the checkboxes and labels.
		for(var i = 0; i < id.length; i++) {
			// Create the checkbox wrapper.
			var p	= myGM.addElement('p', contentWrapper, null, null, new Array(['textAlign', 'left']));

			// Create the checkbox.
			var cb		= myGM.addElement('input', p, id[i] + 'Cb');
			cb.type		= 'checkbox';
			cb.checked	= value[i];

			// Create the checkbox label.
			var cbLabel			= myGM.addElement('label', p, id[i] + 'Label');
			cbLabel.innerHTML	= label[i];
			cbLabel.htmlFor		= myGM.prefix + id[i] + 'Cb';
		}
	},

	/**
	 * Creates the content of the update part.
	 *
	 * @param	element	contentWrapper
	 *   The wrapper where the content should be added.
	 */
	createUpdateContent: function(contentWrapper) {
		// Create options table.
		var updateTable		= this.addOptionsTable(contentWrapper);

		// Array for update interval values and names.
		var opts = new Array(
				{ value: 3600,		name: Language.$('optionPanel_section_update_label_interval_option_hour')	},
				{ value: 43200,		name: Language.$('optionPanel_section_update_label_interval_option_hour12')	},
				{ value: 86400,		name: Language.$('optionPanel_section_update_label_interval_option_day')		},
				{ value: 259200,	name: Language.$('optionPanel_section_update_label_interval_option_day3')	},
				{ value: 604800,	name: Language.$('optionPanel_section_update_label_interval_option_week')	},
				{ value: 1209600,	name: Language.$('optionPanel_section_update_label_interval_option_week2')	},
				{ value: 2419200,	name: Language.$('optionPanel_section_update_label_interval_option_week4')	}
			);

		// Create the update interval select.
		this.addSelect(updateTable, 'updateInterval', myGM.getValue('updater_updateInterval', 3600), opts, Language.$('optionPanel_section_update_label_interval_description'));

		// Prepare the update link table row.
		var updateLinkTr	= this.addOptionsTableRow(updateTable, true);
		updateLinkTr.firstChild.classList.add('center');
		updateLinkTr.firstChild.classList.remove('left');

		// Add the link for manual updates.
		var updateLink			= myGM.addElement('a', updateLinkTr.firstChild);
		updateLink.href			= '#';
		updateLink.innerHTML	= Language.$('optionPanel_section_update_label_manual_text1') + '"' + scriptInfo.name + '"' + Language.$('optionPanel_section_update_label_manual_text2');
		updateLink.addEventListener('click', Updater.doManualUpdate, false);

		// Add the button to save the settings.
		this.addSaveButton(contentWrapper);
	},

	/**
	 * Creates the content of the update part for the mobile version.
	 *
	 * @param	element	contentWrapper
	 *   The wrapper where the content should be added.
	 */
	createUpdateContentMobile: function(contentWrapper) {
		// Create the header.
		var updateHeader = myGM.addElement('h3', contentWrapper);
		updateHeader.innerHTML = Language.$('optionPanel_section_update_title');

		// Create the select wrapper.
		var p1	= myGM.addElement('p', contentWrapper, null, null, new Array(['textAlign', 'center']));

		// Create the select label.
		var selectLabel			= myGM.addElement('label', p1, 'updateIntervalLabel');
		selectLabel.innerHTML	= Language.$('optionPanel_section_update_label_interval_description');
		selectLabel.htmlFor		= myGM.prefix + 'updateIntervalSelect';

		// Create the select field.
		var select	= myGM.addElement('select', p1, 'updateIntervalSelect');

		// Array for update interval values and names.
		var opts = new Array();
		opts.value	= new Array(
				3600,
				43200,
				86400,
				259200,
				604800,
				1209600,
				2419200
			);
		opts.name	= new Array(
				Language.$('optionPanel_section_update_label_interval_option_hour'),
				Language.$('optionPanel_section_update_label_interval_option_hour12'),
				Language.$('optionPanel_section_update_label_interval_option_day'),
				Language.$('optionPanel_section_update_label_interval_option_day3'),
				Language.$('optionPanel_section_update_label_interval_option_week'),
				Language.$('optionPanel_section_update_label_interval_option_week2'),
				Language.$('optionPanel_section_update_label_interval_option_week4')
			);

		// Create the select options.
		for(var i = 0; i < opts['name'].length; i++) {
			// Create new option.
			var option			= myGM.addElement('option', select);
			option.value		= opts['value'][i];
			option.innerHTML	= opts['name'][i];

			// If the option is the actual option, select it.
			if(opts['value'][i] == myGM.getValue('updater_updateInterval', 3600)) {
				option.selected	= true;
			}
		}

		// Create the update link wrapper.
		var p2	= myGM.addElement('p', contentWrapper, null, null, new Array(['textAlign', 'center']));

		// Add the link for manual updates.
		var updateLink			= myGM.addElement('a', p2);
		updateLink.href			= '#';
		updateLink.innerHTML	= Language.$('optionPanel_section_update_label_manual_text1') + scriptInfo.name + Language.$('optionPanel_section_update_label_manual_text2');
		updateLink.addEventListener('click', Updater.doManualUpdate, false);
	},

	/**
	 * Create the content of the resource information / missing resources part.
	 *
	 * @param	element	contentWrapper
	 *   The wrapper where the content should be added.
	 */
	createResInfoMissingResContent: function(contentWrapper) {
		// Create options table.
		var selectionTable	= this.addOptionsTable(contentWrapper);
		var checkboxTable	= this.addOptionsTable(contentWrapper);

		// Array for update interval values and names.
		var optsAlign = new Array(
				{ value: 'alignRight',		name: Language.$('optionPanel_section_resInfoMissingRes_label_align_right')					},
				{ value: 'alignLeft',		name: Language.$('optionPanel_section_resInfoMissingRes_label_align_left')					},
				{ value: 'withSeparation',	name: Language.$('optionPanel_section_resInfoMissingRes_label_align_rightWithSeparation')	}
			);

		// Create the hourly income style select.
		this.addSelect(selectionTable, 'hourlyIncomeStyle', myGM.getValue('resourceInfo_hourlyIncomeStyle', 'alignRight'), optsAlign, Language.$('optionPanel_section_resInfoMissingRes_label_hourlyIncomeStyle'));
		
		// Array for update interval values and names.
		var optsOrientation = new Array(
				{ value: 'vertical',		name: Language.$('optionPanel_section_resInfoMissingRes_label_orientation_vertical')		},
				{ value: 'horizontal',		name: Language.$('optionPanel_section_resInfoMissingRes_label_orientation_horizontal')		},
				{ value: 'horizontalFull',	name: Language.$('optionPanel_section_resInfoMissingRes_label_orientation_horizontalFull')	}
			);

		// Create the hourly income style select.
		this.addSelect(selectionTable, 'capacityInfoStyle', myGM.getValue('resourceInfo_capacityStyle_orientation', 'vertical'), optsOrientation, Language.$('optionPanel_section_resInfoMissingRes_label_capacityOrientationStyle'));
		
		// Get the checkbox data.
		var cbData	= new Array(
				{ id: 'hasBorder',		checked: myGM.getValue('resourceInfo_capacityStyle_hasBorder', true),	label: Language.$('optionPanel_section_resInfoMissingRes_label_hasBorder'),		hrAfter: false	},
				{ id: 'showBranchRes',	checked: myGM.getValue('resourceInfo_showBranchRes', true),				label: Language.$('optionPanel_section_resInfoMissingRes_label_showBranchRes'),	hrAfter: true	},
				{ id: 'showPositive',	checked: myGM.getValue('missingRes_showPositive', true),				label: Language.$('optionPanel_section_resInfoMissingRes_label_showPositive'),	hrAfter: false	},
				{ id: 'showColoured',	checked: myGM.getValue('missingRes_showColoured', true),				label: Language.$('optionPanel_section_resInfoMissingRes_label_showColoured'),	hrAfter: false	}
			);

		// Create the checkboxes.
		this.addCheckboxes(checkboxTable, cbData);

		// Add the button to save the settings.
		this.addSaveButton(contentWrapper);
	},

	/**
	 * Create the content of the zoom part.
	 *
	 * @param	element	contentWrapper
	 *   The wrapper where the content should be added.
	 */
	createZoomContent: function(contentWrapper) {
		// Create the options tables.
		var factorTable			= this.addOptionsTable(contentWrapper);
		var scaleChildrenTable	= this.addOptionsTable(contentWrapper);
		var accessKeysTable		= this.addOptionsTable(contentWrapper);

		// Set the description data.
		var descriptionRowData = new Array(
				{ parent: scaleChildrenTable,	text: Language.$('optionPanel_section_zoom_label_scaleChildren_description')	},
				{ parent: accessKeysTable,		text: Language.$('optionPanel_section_zoom_label_accessKeys')					}
			);

		// Add the descriptions.
		for(var i = 0; i < descriptionRowData.length; i++) {
			// Add the table row.
			var descriptionTr	= this.addOptionsTableRow(descriptionRowData[i]['parent'], true);

			// Add the description.
			var description			= myGM.addElement('p', descriptionTr.firstChild);
			description.innerHTML	= descriptionRowData[i]['text'];
		}

		// Set the data for the factor select fields.
		var factorSelects = new Array(
				{ id: 'zoomWorld',	selected: myGM.getValue('zoom_worldFactor', 100),	labelText: Language.$('optionPanel_section_zoom_label_zoomFactor_world')	},
				{ id: 'zoomIsland',	selected: myGM.getValue('zoom_islandFactor', 100),	labelText: Language.$('optionPanel_section_zoom_label_zoomFactor_island')	},
				{ id: 'zoomTown',	selected: myGM.getValue('zoom_townFactor', 100),	labelText: Language.$('optionPanel_section_zoom_label_zoomFactor_town')		}
			);

		// Set the zoom factor values and names.
		var opts = new Array();
		for(var i = ZoomFunction.minZoom; i <= ZoomFunction.maxZoom; i = i + ZoomFunction.zoomStep) {
			opts.push({ value: i, name: i + '%' });
		}

		// Add all factor select fields.
		for(var i = 0; i < factorSelects.length; i++) {
			this.addSelect(factorTable, factorSelects[i]['id'], factorSelects[i]['selected'], opts, factorSelects[i]['labelText']);
		}

		// Set the scale children checkbox data.
		var scaleChildrenCbData	= new Array(
				{ id: 'zoomScaleChildrenWorld',		checked: myGM.getValue('zoom_worldScaleChildren', true),	label: Language.$('optionPanel_section_zoom_label_scaleChildren_world')		},
				{ id: 'zoomScaleChildrenIsland',	checked: myGM.getValue('zoom_islandScaleChildren', true),	label: Language.$('optionPanel_section_zoom_label_scaleChildren_island')	},
				{ id: 'zoomScaleChildrenTown',		checked: myGM.getValue('zoom_townScaleChildren', true),		label: Language.$('optionPanel_section_zoom_label_scaleChildren_town')		}
			);

		// Add the scale children checkboxes
		this.addCheckboxes(scaleChildrenTable, scaleChildrenCbData);

		// Set the scale children checkbox data.
		var accessKeysCbData	= new Array(
				{ id: 'zoomCtrlPressed',	checked: myGM.getValue('zoom_ctrlPressed', true),	label: Language.$('general_ctrl')	},
				{ id: 'zoomAltPressed',		checked: myGM.getValue('zoom_altPressed', false),	label: Language.$('general_alt')	},
				{ id: 'zoomShiftPressed',	checked: myGM.getValue('zoom_shiftPressed', false),	label: Language.$('general_shift')	}
			);

		// Add the scale children checkboxes
		this.addCheckboxes(accessKeysTable, accessKeysCbData);

		// Add the button to save the settings.
		this.addSaveButton(contentWrapper);
	},

	/**
	 * Create the content of the message signature part.
	 *
	 * @param	element	contentWrapper
	 *   The wrapper where the content should be added.
	 */
	createMessageSigContent: function(contentWrapper) {
		// Create the options tables.
		var settingsTable	= this.addOptionsTable(contentWrapper);
		var globalSigTable	= this.addOptionsTable(contentWrapper);
		var serverSigTable	= this.addOptionsTable(contentWrapper);

		// Get the checkbox data.
		var cbData	= new Array(
				{ id: 'useServerSignature',	checked: myGM.getValue('messageSignature_useServerSignature_' + General.getServerCode(), false),	label: Language.$('optionPanel_section_messageSignature_label_useServerSignature')	},
				{ id: 'placementTop',		checked: myGM.getValue('messageSignature_placementTop', true),										label: Language.$('optionPanel_section_messageSignature_label_placementTop')		}
			);

		// Create the checkboxes.
		this.addCheckboxes(settingsTable, cbData);

		// Set the text area data.
		var textAreaData = new Array(
				{ id: 'globalSignatureText',	parent: globalSigTable,	text: Language.$('optionPanel_section_messageSignature_label_signatureText_global'),	value: myGM.getValue('messageSignature_globalSignature', '')							},
				{ id: 'serverSignatureText',	parent: serverSigTable,	text: Language.$('optionPanel_section_messageSignature_label_signatureText_server'),	value: myGM.getValue('messageSignature_serverSignature_' + General.getServerCode(), '')	}
			);

		// Add the text areas.
		for(var i = 0; i < textAreaData.length; i++) {
			// Add the label table row.
			var labelTr		= this.addOptionsTableRow(textAreaData[i]['parent'], true);

			// Add the label.
			var label		= myGM.addElement('p', labelTr.firstChild);
			label.innerHTML	= textAreaData[i]['text'];

			// Add the text field table row.
			var textAreaTr	= this.addOptionsTableRow(textAreaData[i]['parent'], true);

			// Add the text area.
			var textArea	= myGM.addElement('textarea', textAreaTr.firstChild, textAreaData[i]['id'], new Array('textfield', myGM.prefix + 'SignatureInput'));
			textArea.value	= textAreaData[i]['value'];
		}

		// Add the button to save the settings.
		this.addSaveButton(contentWrapper);
	},

	/**
	 * Add a new options table.
	 *
	 * @param	element	wrapper
	 *   The wrapper where the table should be added.
	 *
	 * @return	element
	 *   The body of the new table.
	 */
	addOptionsTable: function(wrapper) {
		// Create table and tablebody.
		var table		= myGM.addElement('table', wrapper, null, new Array('moduleContent', 'table01'));
		var tableBody	= myGM.addElement('tbody', table);

		// Return the table body.
		return tableBody;
	},

	/**
	 * Adds a new table row to a options table.
	 *
	 * @param	element	optionsTableBody
	 *   The table body where the table should be added.
	 * @param	boolean	oneCell
	 *   Decides if there is one cell or there are two cells.
	 *
	 * @return	element
	 *   The new table row.
	 */
	addOptionsTableRow: function(optionsTableBody, oneCell) {
		// Create the new table row.
		var tr	= myGM.addElement('tr', optionsTableBody);

		// Create first cell.
		var td1	= myGM.addElement('td', tr);

		// If just ond cell.
		if(oneCell) {
			// Set width of cell to width of two cells.
			td1.colSpan = 2;
			td1.classList.add('left');

		// Otherwise.
		} else {
			// Create second cell.
			myGM.addElement('td', tr, null, 'left');
		}

		// Return the table row.
		return tr;
	},

	/**
	 * Creates new checkboxes and adds it to a option table, specified as parentTable.
	 *
	 * @param	element	parentTable
	 *   The parent of the new checkboxes.
	 * @param	mixed[]	cbData
	 *   A array containing the data of the checkboxes.
	 */
	addCheckboxes: function(parentTable, cbData) {
		// Create the checkboxes.
		for(var i = 0; i < cbData.length; i++) {
			// Create table row.
			var tr	= this.addOptionsTableRow(parentTable, true);

			// Create the wrapper for the checkbox and the label.
			var wrapper	= myGM.addElement('div', tr.firstChild, null, 'cbWrapper');

			// Create the checkbox and set the attributes.
			var cb		= myGM.addElement('input', wrapper, cbData[i]['id'] + 'Cb', 'checkbox');
			cb.type		= 'checkbox';
			cb.title	= cbData[i]['label'];
			cb.checked	= cbData[i]['checked'] ? 'checked' : '';

			if(cbData[i]['hrAfter'] == true) {
				var spacer = this.addOptionsTableRow(parentTable, true);
				myGM.addElement('hr', spacer.firstChild);
			}
		}

		// Replace the checkboxes for better appearance.
		ika.controller.replaceCheckboxes();
	},

	/**
	 * Creates a new select field and adds it to a option table, specified as parentTable.
	 *
	 * @param	element	parentTable
	 *   The parent table of the new select field.
	 * @param	String	id
	 *   The last part of the id of the select field.
	 * @param	boolean	selected
	 *   The value of the selected option.
	 * @param	mixed[]	opts
	 *   An array with the names an values of the options.
	 * @param	String	labelText
	 *   The text of the select label.
	 */
	addSelect: function(parentTable, id, selected, opts, labelText) {
		 // Create table row.
		var tr					= this.addOptionsTableRow(parentTable, false);

		// Create label.
		var selectLabel			= myGM.addElement('span', tr.firstChild);
		selectLabel.innerHTML	= labelText;

		// Create the wrapper for the select.
		var wrapper	= myGM.addElement('div', tr.lastChild, id + 'SelectContainer', new Array('select_container', 'size175'), new Array(['position', 'relative']));

		// Create the select field.
		var select	= myGM.addElement('select', wrapper, id + 'Select', 'dropdown');

		// Add the Options.
		for(var i = 0; i < opts.length; i++) {
			// Create an option.
			var option			= myGM.addElement('option', select);

			// Set the value and the name.
			option.value		= opts[i]['value'];
			option.innerHTML	= opts[i]['name'];

			// If the option is selected, set selected to true.
			if(option.value == selected) {
				option.selected = 'selected';
			}
		}

		// Replace the dropdown for better appearance.
		ika.controller.replaceDropdownMenus();
	},

	/**
	 * Creates a commit Button and adds it to a parent.
	 *
	 * @param	element	parent
	 *   The parent element.
	 *
	 * @return	element
	 *   The save button.
	 */
	addSaveButton: function(parent) {
		// Create the button wrapper.
		var buttonWrapper		= myGM.addElement('div', parent, null, 'centerButton');

		// Create the button.
		var saveButton			= myGM.addElement('input', buttonWrapper, null, 'button');
		saveButton.type			= 'submit';
		saveButton.value		= Language.$('optionPanel_save');

		// Add a click action to the button.
		saveButton.addEventListener('click', EventHandling.optionPanel.saveSettings, false);

		return saveButton;
	},

	/**
	 * Save the settings.
	 */
	saveSettings: function() {
		// Save the module settings.
		myGM.setValue('module_updateActive',			myGM.$('#' + myGM.prefix + 'updateCb').checked);
		myGM.setValue('module_incomeActive',			myGM.$('#' + myGM.prefix + 'incomeOnTopCb').checked);
		myGM.setValue('module_urtShortActive',			myGM.$('#' + myGM.prefix + 'upkeepReductionCb').checked);
		myGM.setValue('module_missingResActive',		myGM.$('#' + myGM.prefix + 'missingResourcesCb').checked);
		myGM.setValue('module_resourceInfoActive',		myGM.$('#' + myGM.prefix + 'resourceInformationCb').checked);
		myGM.setValue('module_capacityInfoActive',		myGM.$('#' + myGM.prefix + 'capacityInformationCb').checked);
		myGM.setValue('module_easyAccessActive',		myGM.$('#' + myGM.prefix + 'easyAccessCb').checked);
		myGM.setValue('module_zoomActive',				myGM.$('#' + myGM.prefix + 'zoomCb').checked);
		myGM.setValue('module_messageSigActive',		myGM.$('#' + myGM.prefix + 'messageSignatureCb').checked);
		myGM.setValue('module_easyCircularMsgActive',	myGM.$('#' + myGM.prefix + 'easyCircularMessageCb').checked);
		myGM.setValue('module_replaceUrlsActive',		myGM.$('#' + myGM.prefix + 'replaceUrlsCb').checked);
		myGM.setValue('module_colonizingLinksActive',	myGM.$('#' + myGM.prefix + 'colonizingLinksCb').checked);
		myGM.setValue('module_lcMoveActive',			myGM.$('#' + myGM.prefix + 'loadingCircleMoveCb').checked);
		myGM.setValue('module_ttAutoActive',			myGM.$('#' + myGM.prefix + 'tooltipsAutoCb').checked);
		myGM.setValue('module_directMilitaryTtActive',	myGM.$('#' + myGM.prefix + 'directMilitaryTooltipCb').checked);
		myGM.setValue('module_unitInfoActive',			myGM.$('#' + myGM.prefix + 'unitInfoCb').checked);
		myGM.setValue('module_hideBirdsActive',			myGM.$('#' + myGM.prefix + 'hideBirdsCb').checked);
		myGM.setValue('module_nctAdvisorActive',		myGM.$('#' + myGM.prefix + 'noCenterTownAdvisorCb').checked);
		myGM.setValue('module_niceAllyPageActive',		myGM.$('#' + myGM.prefix + 'niceAllyPageCb').checked);
		myGM.setValue('module_memberInfoActive',		myGM.$('#' + myGM.prefix + 'memberInformationCb').checked);

		// Save the update settings.
		myGM.setValue('updater_updateInterval',		General.getInt(General.getSelectValue('updateIntervalSelect')));

		// Save the resource information / missing resources settings.
		myGM.setValue('resourceInfo_hourlyIncomeStyle',			General.getSelectValue('hourlyIncomeStyleSelect'));
		myGM.setValue('resourceInfo_capacityStyle_orientation',	General.getSelectValue('capacityInfoStyleSelect'));
		myGM.setValue('resourceInfo_capacityStyle_hasBorder',	myGM.$('#' + myGM.prefix + 'hasBorderCb').checked);
		myGM.setValue('resourceInfo_showBranchRes',				myGM.$('#' + myGM.prefix + 'showBranchResCb').checked);
		myGM.setValue('missingRes_showPositive',				myGM.$('#' + myGM.prefix + 'showPositiveCb').checked);
		myGM.setValue('missingRes_showColoured',				myGM.$('#' + myGM.prefix + 'showColouredCb').checked);

		// Save the zoom function settings.
		myGM.setValue('zoom_worldFactor',			General.getInt(General.getSelectValue('zoomWorldSelect')));
		myGM.setValue('zoom_islandFactor',			General.getInt(General.getSelectValue('zoomIslandSelect')));
		myGM.setValue('zoom_townFactor',			General.getInt(General.getSelectValue('zoomTownSelect')));
		myGM.setValue('zoom_worldScaleChildren',	myGM.$('#' + myGM.prefix + 'zoomScaleChildrenWorldCb').checked);
		myGM.setValue('zoom_islandScaleChildren',	myGM.$('#' + myGM.prefix + 'zoomScaleChildrenIslandCb').checked);
		myGM.setValue('zoom_townScaleChildren',		myGM.$('#' + myGM.prefix + 'zoomScaleChildrenTownCb').checked);
		myGM.setValue('zoom_ctrlPressed',			myGM.$('#' + myGM.prefix + 'zoomCtrlPressedCb').checked);
		myGM.setValue('zoom_altPressed',			myGM.$('#' + myGM.prefix + 'zoomAltPressedCb').checked);
		myGM.setValue('zoom_shiftPressed',			myGM.$('#' + myGM.prefix + 'zoomShiftPressedCb').checked);

		// Save the message signature function settings.
		myGM.setValue('messageSignature_useServerSignature_' + General.getServerCode(),	myGM.$('#' + myGM.prefix + 'useServerSignatureCb').checked);
		myGM.setValue('messageSignature_placementTop',									myGM.$('#' + myGM.prefix + 'placementTopCb').checked);
		myGM.setValue('messageSignature_globalSignature',								myGM.$('#' + myGM.prefix + 'globalSignatureText').value);
		myGM.setValue('messageSignature_serverSignature_' + General.getServerCode(),	myGM.$('#' + myGM.prefix + 'serverSignatureText').value);

		// Show success hint.
		General.showTooltip('cityAdvisor', 'confirm', Language.$('general_successful'));
	},

	/**
	 * Save the settings (mobile).
	 */
	saveSettingsMobile: function() {
		// Save the module settings.
		myGM.setValue('module_updateActive',	myGM.$('#' + myGM.prefix + 'updateCb').checked);
		myGM.setValue('module_incomeActive',	myGM.$('#' + myGM.prefix + 'incomeOnTopCb').checked);
		myGM.setValue('module_urtShortActive',	myGM.$('#' + myGM.prefix + 'upkeepReductionCb').checked);

		// Save the update settings.
		myGM.setValue('updater_updateInterval',	General.getInt(General.getSelectValue('updateIntervalSelect')));

		// Show success hint.
		myGM.$('#' + myGM.prefix + 'saveHint').innerHTML	= Language.$('general_successful');

		// Delete the hint after 3 seconds.
		setTimeout(OptionPanel.deleteSaveHintMobile, 3000);
	},

	/**
	 * Delete the save hint.
	 */
	deleteSaveHintMobile: function() {
		myGM.$('#' + myGM.prefix + 'saveHint').innerHTML	= '';
	}
};

/**
 * Functions for zooming mobile, desktop and town view.
 */
ZoomFunction = {
	/**
	 * The minimal zoom factor in percent.
	 */
	minZoom: 55,

	/**
	 * The maximal zoom factor in percent.
	 */
	maxZoom: 150,

	/**
	 * The step between two zoom factors in percent.
	 */
	zoomStep: 5,

	/**
	 * Init the zooming.
	 */
	init: function() {
		// Get the min zoom.
		var minZoom = Math.round(ika.worldview_scale_min * 100);
		minZoom = minZoom + ((minZoom % 5 == 0) ? 0 : (5 - minZoom % 5));

		// Set the max and min zoom.
		this.minZoom = minZoom;
		ika.worldview_scale_min = minZoom / 100;
		ika.worldview_scale_max = this.maxZoom / 100;

		// Change the mousewheel listener, so that it is possible to cheack if there are also keys pressed.
		this.changeMouseWheelListener();

		// Get the zooming factor.
		var factor = myGM.getValue('zoom_' + View.name + 'Factor', 100);

		// Add the zoom Buttons.
		this.addZoomButtons();

		// Zoom.
		this.zoom(factor);
	},

	/**
	 * Add the Buttons for zooming to the view.
	 */
	addZoomButtons: function() {
		// Get the the script toolbar
		var scriptToolbar = myGM.$('#' + myGM.prefix + 'toolbar');

		// Create the zoom buttons.
		var zoomWrapper	= myGM.addElement('div', scriptToolbar, 'zoomWrapper');
		var zoomIn		= myGM.addElement('div', zoomWrapper, 'zoomIn', 'maximizeImg');
		var zoomFactor	= myGM.addElement('div', zoomWrapper, 'zoomFactor');
		var zoomOut		= myGM.addElement('div', zoomWrapper, 'zoomOut', 'minimizeImg');
		
		// Set the button title.
		zoomIn.title		= Language.$('zoomFunction_zoomIn');
		zoomFactor.title	= Language.$('zoomFunction_zoomFactor');
		zoomOut.title		= Language.$('zoomFunction_zoomOut');
		
		// Add the event listener.
		zoomIn.addEventListener('click', EventHandling.zoomFunction.zoomIn, false);
		zoomOut.addEventListener('click', EventHandling.zoomFunction.zoomOut, false);

		// Add the styles.
		myGM.addStyle(
				"#" + myGM.prefix + "zoomWrapper	{ position: absolute; top: 2px; right: 0px; width: 72px; transform: scale(0.75); scale(0.75); -o-transform: scale(0.75); -webkit-transform: scale(0.75); } \
				 #" + myGM.prefix + "zoomIn			{ position: absolute; } \
				 #" + myGM.prefix + "zoomFactor		{ position: absolute; left: 20px; width: 35px; text-align: center; } \
				 #" + myGM.prefix + "zoomOut		{ position: absolute; left: 58px; }"
			);
	},

	/**
	 * Changes the mouse wheel listener so that it could be used with access keys.
	 */
	changeMouseWheelListener: function() {
		// Set the defaut scrollDiv id.
		var scrollDivId = '#worldmap';
		
		// If wolrd view, change the scroll div id.
		if(View.name == 'world') {
			scrollDivId	= '#map1';
		}

		// Remove the old mouse wheel listener. (with the use of Ikariam-jQuery)
		win.$(scrollDivId).unbind('mousewheel');

		// Add the new mouse wheel listener.
		var scrollDiv = myGM.$(scrollDivId);
		scrollDiv.addEventListener('DOMMouseScroll', EventHandling.zoomFunction.mouseScroll, false);
		scrollDiv.addEventListener('mousewheel', EventHandling.zoomFunction.mouseScroll, false);
	},

	/**
	 * Zooms the view.
	 *
	 * @param	int		factor
	 *   The factor which is used.
	 */
	zoom: function(factor) {
		// If the factor is bigger / smaller than allowed, set it to the max / min allowed.
		factor = factor > this.maxZoom ? this.maxZoom : (factor < this.minZoom ? this.minZoom : factor);

		// Store the zoom factor.
		myGM.setValue('zoom_' + View.name + 'Factor', factor);

		// Update the zoom factor which is shown to the user and the zoom buttons.
		var zoomFactorDiv	= myGM.$('#' + myGM.prefix + 'zoomFactor');
		var zoomIn			= myGM.$('#' + myGM.prefix + 'zoomIn');
		var zoomOut			= myGM.$('#' + myGM.prefix + 'zoomOut');

		// Zoom factor.
		if(zoomFactorDiv) {
			zoomFactorDiv.innerHTML = factor + '%';
		}
		
		// Zoom in.
		if(zoomIn) {
			// If it is not allowed to zoom in, hide the zoom in button.
			if(factor >= this.maxZoom) {
				zoomIn.classList.add('invisible');

			// Otherwise: Show the zoom in button.
			} else {
				zoomIn.classList.remove('invisible');
			}
		}

		// Zoom out.
		if(zoomOut) {
			// If it is not allowed to zoom out, hide the zoom out button.
			if(factor <= this.minZoom) {
				zoomOut.classList.add('invisible');

			// Otherwise: Show the zoom out button.
			} else {
				zoomOut.classList.remove('invisible');
			}
		}

		// Get the factor as normal number, not as percentage.
		var factorNew = factor / 100.0;

		// Get the game scaling factor depending on the view.
		var scale = 0;
		
		switch(View.name) {
			case 'world':
			  break;

			case 'island':
				scale = ika.worldview_scale_island;
			  break;

			case 'town':
				scale = ika.worldview_scale_city;
			  break;

			default:
				return;
			  break;
		}

		// It is the world view, zoom it.
		if(View.name == 'world') {
			this.zoomWorld(factorNew);

		// Otherwise call the ikariam zoom function.
		} else {
			// Get the number of steps to zoom.
			var stepNumber = Math.round((factorNew - scale) / .05);

			// Get the center position of the worldmap.
			var worldview	= myGM.$('#worldview');
			var posX		= worldview.offsetLeft + worldview.offsetWidth / 2;
			var posY		= worldview.offsetTop + worldview.offsetHeight / 2;

			// Zoom.
			ika.controller.scaleWorldMap(stepNumber, posX, posY);
		}

		// Scale child elements if enabled.
		if(myGM.getValue('zoom_' + View.name + 'ScaleChildren', true))	ZoomFunction.scaleChildren(factorNew);

		// Return the factor in percent.
		return factor;
	},

	/**
	 * Zoom the world view.
	 *
	 * @param	float	factor
	 *   The factor which is used.
	 */
	zoomWorld: function(factor) {
		// Get the factor the scrollcover must be moved.
		var translateXY	= (100 - 100 / factor) / 2;

		// Get the new height and width of the scrollcover.
		var heightWidth	= 100 / factor;

		// Overwrite the old style.
		myGM.addStyle(
				"#scrollcover	{ transform: scale(" + factor + ") translate(" + translateXY + "%, " + translateXY + "%); -o-transform: scale(" + factor + ") translate(" + translateXY + "%, " + translateXY + "%); -webkit-transform: scale(" + factor + ") translate(" + translateXY + "%, " + translateXY + "%); height: " + heightWidth + "% !important; width: " + heightWidth + "% !important; }",
				'zoomWorld', true
			);

		// Get the map.
		var map = myGM.$('#map1');
		
		// Set the new offset.
		var newWmTop	= 0;
		var newWmLeft	= 0;
		
		// Apply the new offset to the map.
		map.style.top	= newWmTop + 'px';
		map.style.left	= newWmLeft + 'px';
	},

	/**
	 * Scales the children of the worldmap / island view.
	 *
	 * @param	float	factor
	 *   The factor which is used.
	 * @param	String	view
	 *   The name of the view.
	 */
	scaleChildren: function(factor) {
		// Which view is used?
		switch(View.name) {
			// Worldview.
			case 'world':
				myGM.addStyle(
						".islandTile .wonder, .islandTile .tradegood, .islandTile .cities" + (factor < 1 ? ", .ownerState" : "") + "	{ transform: scale(" + 1 / factor + ");  -o-transform: scale(" + 1 / factor + "); -webkit-transform: scale(" + 1 / factor + "); } \
						 .islandTile .cities																							{ bottom: 10px !important; }",
						'scaleChildren', true
					);
			  break;

			// Island view.
			case 'island':
				myGM.addStyle(
						".cityLocation .scroll_img	{ transform: scale(" + 1 / factor + "); -o-transform: scale(" + 1 / factor + "); -webkit-transform: scale(" + 1 / factor + "); }",
						'scaleChildren', true
					);
			  break;

			// Town view.
			case 'town':
				myGM.addStyle(
						".building .timetofinish	{ transform: scale(" + 1 / factor + "); -o-transform: scale(" + 1 / factor + "); -webkit-transform: scale(" + 1 / factor + "); }",
						'scaleChildren', true
					);
			  break;

			// Default: do nothing.
			default:
				return;
			  break;
		}
	}
};

/**
 * Function for showing the missing resources directly in the ruction / update view.
 */
MissingResources = {
	/**
	 * Init the missing ressources.
	 */
	init: function() {
		// Set the required styles.
		myGM.addStyle(
				"#sidebar #buildingUpgrade ul.resources li			{ width: 120px; } \
				 #sidebar #buildingUpgrade ul.resources li.time		{ width: 60px !important; } \
				 #sidebar ." + myGM.prefix + "missingResources		{ float: right; }"
			);
	},

	/**
	 * Shows the missing resources in the building ground popup.
	 */
	showInBuildingGround: function() {
		// Show the resources.
		this.show(false);
	},

	/**
	 * Shows the missing resources in the sidebar.
	 */
	showInSidebar: function() {
		// Show the resources.
		this.show(true);

		// Add an event listener to update the shown resources.
		myGM.$('#cityResources').addEventListener('DOMSubtreeModified', EventHandling.missingResources.resourcesUpdated, false);
	},

	/**
	 * Shows the missing resources in the place which is given.
	 *
	 * @param	boolean	isSidebar
	 *   If the place where to show is the sidebar.
	 */
	show: function(isSidebar, update) {
		// Store the current resources.
		var current = Array();
		current.push(ika.model.currentResources.resource);	// Wood.
		current.push(ika.model.currentResources[1]);		// Wine.
		current.push(ika.model.currentResources[2]);		// Marble.
		current.push(ika.model.currentResources[3]);		// Crystal.
		current.push(ika.model.currentResources[4]);		// Sulfur.

		// Store the resource names.
		var resourceName = new Array('wood', 'wine', 'marble', 'glass', 'sulfur');

		// Get all possible wrappers.
		var wrapper = myGM.$$('#' + (isSidebar ? 'sidebar' : 'buildingGround') + ' .resources');

		// Loop over all wrappers.
		for(var i = 0; i < wrapper.length; i++) {
			// Loop over all resources.
			for(var k = 0; k < resourceName.length; k++) {
				// Get the resource node.
				var node = myGM.$('.' + resourceName[k], wrapper[i]);

				// If the node exist, show the missing resources.
				if(node) {
					// Get the missing resource number.
					var missing = current[k] - (update ? General.getInt(node.lastChild.previousSibling.nodeValue) : General.getInt(node.lastChild.nodeValue));

					// If there are resources missing.
					if(missing < 0 || (myGM.getValue('missingRes_showPositive', true) && isSidebar)) {
						// Show the missing resource info.
						var show = update ? myGM.$('#' + myGM.prefix + 'missingResources' + resourceName[k]) : myGM.addElement('span', node, 'missingResources' + resourceName[k], 'missingResources', null, true);
						show.innerHTML = (isSidebar ? '' : ' (') + General.formatToIkaNumber(missing, myGM.getValue('missingRes_showColoured', true), true) + (isSidebar ? '' : ')');
					}
				}
			}
		}
	}
};

/**
 * Functions for showing the hourly production directly in the town view.
 * Also adds the daily Production to the resource tooltip.
 */
ResourceInfo = {
	/**
	 * Storage for the last tradegood.
	 */
	lastTradegood: null,

	/**
	 * Inits the resource info.
	 */
	init: function() {
		// If the city is owned by the player.
		if(ika.model.isOwnCity == true) {
			// Set the styles.
			this.setStyles();
			
			// Add the resource info.
			if(myGM.getValue('module_resourceInfoActive', true))	this.addHourlyResourceInfo();
			
			// Add the capacity info.
			if(myGM.getValue('module_capacityInfoActive', true))	this.addCapacityInfo();
		}
	},

	/**
	 * Sets the styles that are required for the resource info.
	 */
	setStyles: function() {
		// Probleme: resourceInfo deaktiviert + alle.
		var resourceInfoActive			= myGM.getValue('module_resourceInfoActive', true);
		var capacityInfoActive			= myGM.getValue('module_capacityInfoActive', true);
		var hourlyIncomeStyle			= myGM.getValue('resourceInfo_hourlyIncomeStyle', 'alignRight');
		var capacityStyleOrientation	= myGM.getValue('resourceInfo_capacityStyle_orientation', 'vertical');
		
		// If the resource info is active.
		if(resourceInfoActive) {
			// Define the style for the resources wrapper.
			var resourcesStyle = {
				lineHeight:		(capacityInfoActive && capacityStyleOrientation == 'horizontal') ? 'line-height: 9px !important;' : 'line-height: 11px !important;',
				align:			(hourlyIncomeStyle != 'alignLeft') ? ' text-align: right;' : '',
				fontSize:		(capacityInfoActive && capacityStyleOrientation != 'horizontalFull') ? ' font-size: 11px;' : '',
				height:			(capacityInfoActive && capacityStyleOrientation == 'horizontalFull') ? ' height: 32px !important;' : '',
				top:			(capacityInfoActive && capacityStyleOrientation == 'horizontalFull') ? ' top: -2px !important;' : '',
				paddingLeft:	(capacityInfoActive && capacityStyleOrientation == 'vertical' && hourlyIncomeStyle == 'alignLeft') ? ' padding-left: 38px !important;' : ''
			};
			var resStyle = '#resources_wood, #resources_wine, #resources_marble, #resources_glass, #resources_sulfur { '
									+ resourcesStyle.lineHeight
									+ resourcesStyle.align
									+ resourcesStyle.fontSize
									+ resourcesStyle.height
									+ resourcesStyle.top
									+ resourcesStyle.paddingLeft
								+ ' } ';
			
			// Define the style for the global menu resources.
			var globalMenuStyle = {
				padding:	(hourlyIncomeStyle != 'alignLeft') ? 'padding-right: 4px;' : ''
			};
			var globMenuStyle = '#js_GlobalMenu_wood, #js_GlobalMenu_wine, #js_GlobalMenu_marble, #js_GlobalMenu_crystal, #js_GlobalMenu_sulfur { '
										+ globalMenuStyle.padding
									+ ' } ';
			
			// Define the style for the hourly income.
			var incomeStyle = {
				fontSize:		(capacityInfoActive && capacityStyleOrientation != 'horizontalFull') ? 'font-size: 9px;' : 'font-size: 11px;',
				paddingRight:	(hourlyIncomeStyle != 'alignLeft') ? ' padding-right: 4px;' : ''
			};
			var hirStyle = '.' + myGM.prefix + 'hourlyIncomeResource { '
									+ incomeStyle.fontSize
									+ incomeStyle.paddingRight
								+ ' } ';
			
			// Define the style for the resources wrapper with border as separation.
			var separationStyle = {
				border:		(hourlyIncomeStyle == 'withSeparation') ? 'border-right: 1px dotted #542C0F;' : ''
			};
			var sepStyle		= '#resources_wood, #resources_wine, #resources_marble, #resources_glass { '
										+ separationStyle.border
									+ ' } ';
			
			// Add all styles to the ikariam page.
			var resInfoStyle = resStyle + globMenuStyle + hirStyle + sepStyle;
			myGM.addStyle(resInfoStyle, 'hourlyIncomeStyle', true);
			
		// Otherwise: If the capacity info is active.
		} else if(capacityInfoActive) {
			// Define the style for the resources wrapper.
			var resourcesStyle = {
				lineHeight:		(capacityStyleOrientation == 'horizontal') ? 'line-height: 12px !important;' : ((capacityStyleOrientation == 'vertical') ? ' line-height: 24px !important;' : ''),
				align:			(hourlyIncomeStyle != 'alignLeft') ? ' text-align: right;' : '',
				fontSize:		(capacityStyleOrientation == 'vertical') ? ' font-size: 11px;' : '',
				height:			(capacityStyleOrientation == 'horizontalFull') ? ' height: 32px !important;' : '',
				top:			(capacityStyleOrientation == 'horizontalFull') ? ' top: -2px !important;' : '',
				paddingLeft:	(capacityStyleOrientation == 'vertical' && hourlyIncomeStyle == 'alignLeft') ? ' padding-left: 38px !important;' : ''
			};
			var resStyle = '#resources_wood, #resources_wine, #resources_marble, #resources_glass, #resources_sulfur { '
									+ resourcesStyle.lineHeight
									+ resourcesStyle.align
									+ resourcesStyle.fontSize
									+ resourcesStyle.height
									+ resourcesStyle.top
									+ resourcesStyle.paddingLeft
								+ ' } ';
			
			// Define the style for the global menu resources.
			var globalMenuStyle = {
				padding:	(hourlyIncomeStyle != 'alignLeft') ? 'padding-right: 4px;' : ''
			};
			var globMenuStyle = '#js_GlobalMenu_wood, #js_GlobalMenu_wine, #js_GlobalMenu_marble, #js_GlobalMenu_crystal, #js_GlobalMenu_sulfur { '
										+ globalMenuStyle.padding
									+ ' } ';
			
			// Define the style for the resources wrapper with border as separation.
			var separationStyle = {
				border:		(hourlyIncomeStyle == 'withSeparation') ? 'border-right: 1px dotted #542C0F;' : ''
			};
			var sepStyle		= '#resources_wood, #resources_wine, #resources_marble, #resources_glass { '
										+ separationStyle.border
									+ ' } ';
			
			// Add all styles to the ikariam page.
			var resInfoStyle = resStyle + globMenuStyle + sepStyle;
			myGM.addStyle(resInfoStyle, 'hourlyIncomeStyle', true);
		}
		
		// If the capacity info is active.
		if(capacityInfoActive) {
			// Define the style for the bar.
			var barStyle		= '.' + myGM.prefix + 'bar								{ height: 100%; width: 100%; bottom: 0px; position: absolute; } ';
			
			// Define the style for the red bar.
			var redBarStyle		= '.' + myGM.prefix + 'bar.' + myGM.prefix + 'red		{ background-color: #AA0000; } ';
			
			// Define the style for the red bar.
			var yellowBarStyle	= '.' + myGM.prefix + 'bar.' + myGM.prefix + 'yellow	{ background-color: #FFD700; } ';
			
			// Define the style for the green bar.
			var greenBarStyle	= '.' + myGM.prefix + 'bar.' + myGM.prefix + 'green		{ background-color: #669900; } ';
			
			// Define the style for the capacity information.
			var capacityInfoStyle = {
				position:	'position: absolute;',
				height:		(capacityStyleOrientation == 'vertical') ? ' height: 21px;' : ' height: 4px;',
				width:		(capacityStyleOrientation != 'vertical') ? ((capacityStyleOrientation == 'horizontal') ? ' width: 50px;' : ' width: 79px;') : ' width: 4px;',
				bottom:		' bottom: 4px;',
				right:		(capacityStyleOrientation != 'vertical') ? ' right: 4px;' : '',
				marginLeft:	(capacityStyleOrientation == 'vertical' && hourlyIncomeStyle == 'alignLeft') ? ' margin-left: -7px;' : ''
			};
			var capInfoStyle = '.' + myGM.prefix + 'capacityInfo { '
										+ capacityInfoStyle.position
										+ capacityInfoStyle.height
										+ capacityInfoStyle.width
										+ capacityInfoStyle.bottom
										+ capacityInfoStyle.right
										+ capacityInfoStyle.marginLeft
									+ ' } ';
			
			// Define the style for the capacity information with border.
			var capacityInfoBorderStyle = {
				border:		'border: 1px inset #906646;',
				height:		(capacityStyleOrientation == 'vertical') ? ' height: 20px;' : ' height: 3px;',
				width:		(capacityStyleOrientation != 'vertical') ? ((capacityStyleOrientation == 'horizontal') ? ' width: 50px;' : ' width: 78px;') : ' width: 3px;',
				bottom:		' bottom: 3px;',
				right:		(capacityStyleOrientation != 'vertical') ? ' right: 3px;' : ''
			};
			var capInfoBorderStyle = '.' + myGM.prefix + 'capacityInfo.' + myGM.prefix + 'border { '
											+ capacityInfoBorderStyle.border
											+ capacityInfoBorderStyle.height
											+ capacityInfoBorderStyle.width
											+ capacityInfoBorderStyle.bottom
											+ capacityInfoBorderStyle.right
										+ ' } ';
			
			// Add all styles to the ikariam page.
			var capacityInformationStyle = barStyle + redBarStyle + yellowBarStyle + greenBarStyle + capInfoStyle + capInfoBorderStyle;
			myGM.addStyle(capacityInformationStyle, 'capacityInfoStyle', true);
		}
	},

	/**
	 * Show the hourly resource info.
	 */
	addHourlyResourceInfo: function() {
		// If the info containers are already set, do nothing.
		if(myGM.$('#' + myGM.prefix + 'wood')) {
			return;
		}
		
		// Set all resource types.
		var types = new Array('wood', 'wine', 'marble', 'glass', 'sulfur');

		// Loop over all resource types.
		for(var i = 0; i < types.length; i++) {
			// Add the hourly info.
			myGM.addElement('span', myGM.$('#resources_' + types[i]), 'hourlyIncomeResource' + types[i], 'hourlyIncomeResource', null, true);

			// Add the daily info.
			var parent			= myGM.$('#resources_' + types[i] + ' .tooltip');
			var classes			= (i < 2) ? 'smallFont' : new Array('smallFont', 'invisible');
			var wrapper			= myGM.addElement('p', parent, 'dailyIncomeResourceWrapper' + types[i], classes, null, null, myGM.$('p:nth-child(2)', parent));
			wrapper.innerHTML	= Language.$('resourceInfo_dailyIncome_' + types[i]) + ' ';
			myGM.addElement('span', wrapper, 'dailyIncomeResource' + types[i]);
		}

		// Update the resource information.
		this.updateHourlyResourceInfo(true);
	},

	/**
	 * Update the shown hourly resource information.
	 */
	updateHourlyResourceInfo: function(firstRun) {
		// If the city is not owned by the player, stop the update.
		if(ika.model.isOwnCity != true) {
			return;
		}
		
		// Prefix for selection.
		var hourlyPrefix	= '#' + myGM.prefix + 'hourlyIncomeResource';
		var dailyPrefix		= '#' + myGM.prefix + 'dailyIncomeResource';
		
		// If the info containers are not set, set them.
		if(!myGM.$(hourlyPrefix + 'wood')) {
			this.init();
		}
		
		// Set all resource types.
		var types = new Array('wood', 'wine', 'marble', 'glass', 'sulfur');

		// Get some needed data.
		var producedTradegood	= ika.model.producedTradegood;
		var tradegood			= ika.model.tradegoodProduction * 3600 + 0.001;
		var resource			= ika.model.resourceProduction * 3600 + 0.001;
		var wineSpending		= ika.model.wineSpendings;
		var producesWine		= ika.model.cityProducesWine;

		// Bugfix for the first running of the script on the page: wineSpending is not reduced by vineyard.
		if(firstRun) {
			// Get the vineyard.
			var vineyard = myGM.$('#locations .vineyard');

			// If a vineyard exists, reduce the wine spending.
			if(vineyard) {
				// Get the vineyard level.
				var level = vineyard.className.match(/level([0-9]*)/i)[1];

				// Reduce the wine spending.
				wineSpending = (wineSpending * (100 - level)) / 100;
			}
		}

		// Update the wood data.
		myGM.$(hourlyPrefix + types[0]).innerHTML	= '<br>' + General.formatToIkaNumber(Math.floor(resource), true, true);
		myGM.$(dailyPrefix + types[0]).innerHTML		= General.formatToIkaNumber(Math.floor(resource * 24), false);

		// Delete the last tradegood info.
		if(this.lastTradegood) {
			// Hourly.
			myGM.$(hourlyPrefix + types[this.lastTradegood]).innerHTML	= '';

			// Daily.
			myGM.$(dailyPrefix + types[this.lastTradegood]).innerHTML	= '';

			// Hide the daily tradegood info if it is not wine.
			if(this.lastTradegood != 1)	myGM.$(dailyPrefix + 'Wrapper' + types[this.lastTradegood]).classList.add('invisible');
		}

		// Add the info if the city produces wine.
		if(producesWine) {
			// Hourly.
			myGM.$(hourlyPrefix + types[producedTradegood]).innerHTML	= '<br>' + General.formatToIkaNumber(Math.floor(tradegood - wineSpending), true, true);

			// Daily.
			myGM.$(dailyPrefix + types[producedTradegood]).innerHTML		= General.formatToIkaNumber(Math.floor((tradegood - wineSpending) * 24), false);

		// Add the info if the city doesn't produces wine.
		} else {
			// Hourly.
			myGM.$(hourlyPrefix + types[producedTradegood]).innerHTML	= '<br>' + General.formatToIkaNumber(Math.floor(tradegood), true, true);
			myGM.$(hourlyPrefix + types[1]).innerHTML					= '<br>' + General.formatToIkaNumber(Math.floor(-1 * wineSpending), true, true);

			// Daily.
			myGM.$(dailyPrefix + types[producedTradegood]).innerHTML		= General.formatToIkaNumber(Math.floor(tradegood * 24), false);
			myGM.$(dailyPrefix + types[1]).innerHTML						= General.formatToIkaNumber(Math.floor(-1 * wineSpending * 24), false);
		}

		// Show the daily tradegood info.
		myGM.$(dailyPrefix + 'Wrapper' + types[producedTradegood]).classList.remove('invisible');

		// Store the actual tradegood as last produced tradegood.
		this.lastTradegood = producedTradegood;
	},
	
	/**
	 * Add a bar showing the status of the filling of the warehouse.
	 */
	addCapacityInfo: function() {
		// If the info containers are already set, do nothing.
		if(myGM.$('#' + myGM.prefix + 'capacityInfowood')) {
			return;
		}
		
		// Set all resource types.
		var types = new Array('wood', 'wine', 'marble', 'glass', 'sulfur');
		
		// Has the capacity information a border?
		var hasBorder = myGM.getValue('resourceInfo_capacityStyle_hasBorder', true);
		
		// Loop over all resource types.
		for(var i = 0; i < types.length; i++) {
			// Add the hourly info.
			var wrapper = myGM.addElement('div', myGM.$('#resources_' + types[i]), 'capacityInfo' + types[i], hasBorder ? new Array('capacityInfo', 'border') : 'capacityInfo', null, true);
			myGM.addElement('div', wrapper, 'maxCapacity' + types[i], new Array('bar', 'yellow'), null, true);
			myGM.addElement('div', wrapper, 'warehouseCapacity' + types[i], new Array('bar', 'green'), null, true);
			myGM.addElement('div', wrapper, 'currentResource' + types[i], new Array('bar', 'red'), null, true);
		}
		
		// Update the resource information.
		this.updateCapacityInfo();
		
		// Add an event listener to update the shown resources.
		myGM.$('#cityResources').addEventListener('DOMSubtreeModified', ResourceInfo.updateCapacityInfo, false);
	},
	
	/**
	 * Update the bar showing the status of the filling of the warehouse.
	 */
	updateCapacityInfo: function() {
		// If the city is not owned by the player, stop the update.
		if(ika.model.isOwnCity != true) {
			return;
		}
		
		// Prefix for selection and user deifned settings.
		var prefix					= '#' + myGM.prefix;
		var orientation				= myGM.getValue('resourceInfo_capacityStyle_orientation', 'vertical');
		var showBranchOfficeRes		= myGM.getValue('resourceInfo_showBranchRes', true);
		
		// If the info containers are not set, set them.
		if(!myGM.$(prefix + 'capacityInfowood')) {
			this.init();
		}
		
		// Set all resource types.
		var types = new Array('wood', 'wine', 'marble', 'glass', 'sulfur');
		
		// Get some needed data.
		var warehouseCapacity		= new Array();
		var branchOfficeResources	= new Array();
		var currentResources		= new Array();
		
		warehouseCapacity.push(ika.model.maxResources.resource);
		branchOfficeResources.push(ika.model.branchOfficeResources.resource);
		currentResources.push(ika.model.currentResources.resource);
		
		for(var i = 1; i < types.length; i++) {
			warehouseCapacity.push(ika.model.maxResources[i]);
			branchOfficeResources.push(ika.model.branchOfficeResources[i]);
			currentResources.push(ika.model.currentResources[i]);
		}
		
		// Set the styles for all resources.
		for(var i = 0; i < types.length; i++) {
			var maxCapacity		= myGM.$(prefix + 'maxCapacity' + types[i]);
			var curWarehouse	= myGM.$(prefix + 'warehouseCapacity' + types[i]);
			var curResource		= myGM.$(prefix + 'currentResource' + types[i]);
			
			var curTmp = (typeof(currentResources[i]) == 'string') ? General.getInt(currentResources[i]) : currentResources[i];
			var capTmp = (typeof(warehouseCapacity[i]) == 'string') ? General.getInt(warehouseCapacity[i]) : warehouseCapacity[i];
			var offTmp = (typeof(branchOfficeResources[i]) == 'string') ? General.getInt(branchOfficeResources[i]) : branchOfficeResources[i];
			var maxTmp = capTmp + offTmp;
			
			var curWarehousePercentage	= showBranchOfficeRes ? (capTmp / maxTmp * 100) : 100;
			var curResourcePercentage	= showBranchOfficeRes ? (curTmp / maxTmp * 100) : (curTmp / capTmp * 100);
			
			if(orientation == 'vertical') {
				maxCapacity.style.height	= '100%';
				curWarehouse.style.height	= curWarehousePercentage + '%';
				curResource.style.height	= curResourcePercentage + '%';
			} else {
				maxCapacity.style.width		= '100%';
				curWarehouse.style.width	= curWarehousePercentage + '%';
				curResource.style.width		= curResourcePercentage + '%';
			}
		}
	},
	
	/**
	 * Adds links to access town hall, tradegood and sawmill to the resources menu.
	 */
	addRessourceLinks: function() {
		// Set all tradegood types.
		var types = new Array('wine', 'marble', 'glass', 'sulfur');
		
		// Get the population and wood link.
		var population	= myGM.$('#resources_population');
		var wood		= myGM.$('#resources_wood');
		
		// Add the event listener.
		population.addEventListener('click', function() { win.ajaxHandlerCall('?view=city&dialog=townHall&cityId=' + ika.getModel().relatedCityData[ika.getModel().relatedCityData.selectedCity].id + '&position=0'); }, true);
		wood.addEventListener('click', function() { win.ajaxHandlerCall('?view=island&dialog=resource'); }, true);
		
		// Add the event listener to the tradegood links.
		for(var i = 0; i < types.length; i++) {
			var tradegood = myGM.$('#resources_' + types[i]);
			tradegood.addEventListener('click', function() { win.ajaxHandlerCall('?view=island&dialog=tradegood'); }, true);
		}
		
		// Add the styles.
		myGM.addStyle(
				"#resources_population:hover, #resources_wood:hover, #resources_wine:hover, #resources_marble:hover, #resources_glass:hover, #resources_sulfur:hover	{ text-shadow: 2px 2px 2px #666; cursor: pointer; color: #333; }",
			'resourceLinks', true);
	}
};

/**
 * Functions for the member info.
 */
MemberInfo = {
	/**
	 * Storage for the highscore type.
	 */
	type: '',

	/**
	 * Storage for all actual member information.
	 */
	data: null,

	/**
	 * Init the member info.
	 */
	init: function() {
		// Add the styles.
		myGM.addStyle(
				"#" + myGM.prefix + "resetInfo	{ float: right; margin-top: -6px; margin-right: 6px; } \
				 .highscore .score span			{ float: right; text-align: right; width: 70px; } \
				 .highscore .place span			{ float: right; text-align: right; width: 30px; } \
				 .highscore th:nth-child(4)		{ width: 30% !important; } \
				 .highscore th:nth-child(5)		{ width: 10% !important; } \
				 #tab_highscore	.centerButton	{ margin: 10px 0px; }",
				'memberInfo', true
			);
	},

	/**
	 * Starts the script.
	 */
	show: function() {
		// Show the link for the info.
		this.addShowButton();

		// Show the info if the flag is set.
		if(myGM.getValue('memberInfo_infoLinkClicked', false)) {
			// Delete the flag.
			myGM.setValue('memberInfo_infoLinkClicked', false);

			// Show the information.
			this.showInfo();
		}
	},

	/**
	 * Add a button for showing the inforation to the highscore.
	 */
	addShowButton: function() {
		// Get the parent of the show button.
		var parent	= myGM.$('#tab_highscore .centerButton');

		// Add the button to show the information.
		var btn		= myGM.addElement('input', parent, 'showInfo', 'button');
		btn.type	= 'button';
		btn.value	= Language.$('memberInfo_show');

		// Add the event listener to the button.
		btn.addEventListener('click', EventHandling.memberInfo.clickShow, false);
	},

	/**
	 * Add a button for resetting the inforation to the highscore.
	 */
	addResetButton: function() {
		// Get the parent of the reset button.
		var parent	= myGM.$('#tab_highscore .content p');

		// Add the reset button.
		var btn		= myGM.addElement('input', parent, 'resetInfo', 'button');
		btn.type	= 'button';
		btn.value	= Language.$('memberInfo_reset');

		// Add the event listener to the button.
		btn.addEventListener('click', EventHandling.memberInfo.clickReset, false);
	},

	/**
	 * Adds the time since the last reset to the highscore view.
	 */
	addLastResetTime: function() {
		// Get the time since the last reset.
		var lastResetTime = myGM.getValue(General.getServerCode() + '_memberInfo_time_' + MemberInfo.type, 0);
		var diff = new Date() - lastResetTime;

		// Get the hours, days and minutes since the last reset.
		var d = Math.floor(diff / 86400000);
		diff = diff % 86400000;
		var h = Math.floor(diff / 3600000);
		diff = diff % 3600000;
		var m = Math.floor(diff / 60000);

		// Get the string of the last reset.
		var lastReset = lastResetTime ? (d + 'd ' + h + 'h ' + m + 'min') : Language.$('memberInfo_noReset');

		// Get the parent of the reset button.
		var parent	= myGM.$('#tab_highscore .content p');

		// Add the reset button.
		var span		= myGM.addElement('span', parent);
		span.innerHTML	= '<br><span class="bold brown">' + Language.$('memberInfo_lastReset') + ' ' + lastReset + '</span>';
	},

	/**
	 * Shows the information about the members in the highscore view.
	 */
	showInfo: function() {
		// Set the highscore type.
		this.type = General.getSelectValue('js_highscoreType', true);

		// Storage for member information.
		var memberInfoData = {};

		// Storage for old member information.
		var memberInfoDataOld = myGM.getValue(General.getServerCode() + '_memberInfo_data_' + this.type, null);

		// Get the table rows of the ally members.
		var allyRows = myGM.$$('table.highscore tr.ownally');

		// Loop over all ally rows.
		for(var i = 0; i < allyRows.length; i++) {
			// Get the id of the ally member.
			var actionLink	= myGM.$('.action a', allyRows[i]).href;
			var id			= actionLink.match(/receiverId=([0-9]*)/i)[1];

			// Get score and place of the member and store it.
			memberInfoData[id]			= {};
			memberInfoData[id]['place']	= General.getInt(myGM.$('.place', allyRows[i]).innerHTML);
			memberInfoData[id]['score']	= General.getInt(myGM.$('.score', allyRows[i]).innerHTML);

			// Get the difference in place and score.
			var placeDiff = myGM.addElement('span', myGM.$('.place', allyRows[i]));
			var scoreDiff = myGM.addElement('span', myGM.$('.score', allyRows[i]));

			// Show the difference in place and score.
			placeDiff.innerHTML += (memberInfoDataOld && memberInfoDataOld[id]) ? General.formatToIkaNumber(memberInfoDataOld[id]['place'] - memberInfoData[id]['place'], true, true) : '-';
			scoreDiff.innerHTML += (memberInfoDataOld && memberInfoDataOld[id]) ? General.formatToIkaNumber(memberInfoData[id]['score'] - memberInfoDataOld[id]['score'], true, true) : '-';
		}

		// Get the own table row.
		var ownRow = myGM.$('table.highscore tr.own');

		// Get the own score and place.
		memberInfoData['own']			= {};
		memberInfoData['own']['place']	= General.getInt(myGM.$('.place', ownRow).innerHTML);
		memberInfoData['own']['score']	= General.getInt(myGM.$('.score', ownRow).innerHTML);

		// Get the difference in place and score.
		var placeDiff = myGM.addElement('span', myGM.$('.place', ownRow));
		var scoreDiff = myGM.addElement('span', myGM.$('.score', ownRow));

		// Show the difference in place and score.
		placeDiff.innerHTML += (memberInfoDataOld && memberInfoDataOld['own']) ? General.formatToIkaNumber(memberInfoDataOld['own']['place'] - memberInfoData['own']['place'], true, true) : '-';
		scoreDiff.innerHTML += (memberInfoDataOld && memberInfoDataOld['own']) ? General.formatToIkaNumber(memberInfoData['own']['score'] - memberInfoDataOld['own']['score'], true, true) : '-';

		// Store the new member information for later use.
		this.data = memberInfoData;

		// Add the reset button.
		this.addResetButton();

		// Show the time of the last reset.
		this.addLastResetTime();
	}
};

/**
 * Functions for messages.
 */
Message = {
	/**
	 * Add a signature to each message.
	 */
	addSignature: function() {
		// Storage for the signature text.
		var signature = '';
		
		// If the server signature should be used, get the server signature text.
		if(myGM.getValue('messageSignature_useServerSignature_' + General.getServerCode(), false)) {
			signature = myGM.getValue('messageSignature_serverSignature_' + General.getServerCode(), '');

		// Otherwise: get the global signature text.
		} else {
			signature = myGM.getValue('messageSignature_globalSignature', '');
		}

		// If a signature text is set, add it to the message.
		if(signature != '') {
			// Get the message area.
			var messageArea = myGM.$('#js_msgTextConfirm');

			// Get the message text and add the signature on the right placement.
			var text = messageArea.value;
			text = myGM.getValue('messageSignature_placementTop', true) ? ('\n\n' + signature + text) : (text + '\n\n' + signature);
			messageArea.value = text;

			// Focus the message area on top.
			messageArea.setSelectionRange(0,0);
			messageArea.focus();
		}
	},

	/**
	 * Add a link for circular messages to the toolbar.
	 */
	easyCircularMessage: function() {
		// Get the script toolbar.
		var scriptToolbar = myGM.$('#' + myGM.prefix + 'toolbar');

		// Add the message link wrapper.
		var circularMessageLinkWrapper	= myGM.addElement('div', scriptToolbar, 'circularMessageLinkWrapper');
		
		// Prepare the message id, link, class and title.
		var id		= myGM.prefix + 'circularMessageLink';
		var href	= '?view=sendIKMessage&msgType=51&allyId=' + ika.getModel().avatarAllyId;
		var cl		= href.match(/diplomacyAlly/) ? 'notSet' : '';
		var title	= href.match(/diplomacyAlly/) ? Language.$('easyCircularMsg_getLink') : Language.$('easyCircularMsg_send');

		// Add the message link (workaround for ajaxHandlerCall).
		circularMessageLinkWrapper.innerHTML = '<a id="' + id + '" class="' + cl + '" href="' + href + '" title="' + title + '" onclick="ajaxHandlerCall(this.href); return false;"></a>';

		// Set the styles.
		myGM.addStyle(
				"#" + myGM.prefix + "circularMessageLinkWrapper			{ position: absolute; top: 5px; right: 70px; } \
				 #" + myGM.prefix + "circularMessageLink				{ height: 9px; width: 13px; display: block; margin: 0px !important; background: url('skin/interface/icon_send_message.png') repeat scroll 0 0 transparent; } \
				 #" + myGM.prefix + "circularMessageLink:hover			{ background-position: 0px -9px; } \
				 #" + myGM.prefix + "circularMessageLink.notSet:hover	{ background-position: 0px -18px; }",
			'easyCircularMessage', true);
	},

	/**
	 * Set the style for the replaced urls.
	 */
	setStyleForReplaceUrl: function() {
		// Add the style.
		myGM.addStyle(
				"." + myGM.prefix + "replacedUrl			{ font-weight: bold; font-style: italic; } \
				 ." + myGM.prefix + "replacedUrl:hover		{ text-decoration: underline; cursor: pointer; }"
			);
	},

	/**
	 * Make all URLs in messsages clickable. But with a security check.
	 */
	replaceUrl: function() {
		// Get all message texts.
		var msgTexts = myGM.$$('.msgText');

		// Loop over all message texts.
		for(var i = 0; i < msgTexts.length; i++) {
			// Replace the URLs.
			var text = msgTexts[i].innerHTML;
			msgTexts[i].innerHTML = text.replace(/(?:^|\s)(http(s?)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/[^<\s]*)?)/g,  ' <span class="' + myGM.prefix + 'replacedUrl" title="$1">$1</span> ');
		}

		// Get all replaced URLs.
		var replacedUrls = myGM.$$('.' + myGM.prefix + 'replacedUrl');

		// Loop over all replaced URLs.
		for(var i = 0; i < replacedUrls.length; i++) {
			// Add a click event to each replaced URL.
			replacedUrls[i].addEventListener('click', EventHandling.replacedUrl.click, true);
		}
	}
};

/**
 * Functions for cities.
 */
City = {
	/**
	 * Set the links for cities that are colonizing.
	 */
	setColonizingLinks: function() {
		// Get all cities with level 0 (colonizing cities).
		var colonizingCities = myGM.$$('.level0');

		// Loop over the colonizing cities.
		for(var i = 0; i < colonizingCities.length; i++) {
			// Get the location id.
			var locationId = colonizingCities[i].id.replace(/\D/g, '');

			// Get the city id.
			var cityId = ika.getScreen().data.cities[locationId].id;

			// Set the city link.
			myGM.$('#js_cityLocation' + locationId + 'Link').href = '?view=cityDetails&destinationCityId=' + cityId;
		}
	}
};

/**
 * Functions for nice formatting of units.
 */
UnitInfo = {
	/**
	 * Add a link to the troops in town view to get a list for sharing.
	 */
	addPopupLink: function() {
		var infoButton		= myGM.addElement('input', myGM.$('#cityMilitary_c .buildingDescription'), null, 'button', new Array(['position', 'absolute'], ['top', '5px'], ['right', '20px']));
		infoButton.type		= 'button';
		infoButton.value	= Language.$('unitInfo_button');
		infoButton.addEventListener('click', EventHandling.unitInfo.click, true);
	},
	
	/**
	 * Shows a popup with the unit information.
	 */
	showPopup: function() {
		// Get information about the town.
		var selected = ika.getModel().relatedCityData[ika.getModel().relatedCityData.selectedCity];
		var townInfo = selected.name + ' ' + selected.coords;
		
		// Storage for output.
		var output	= '<textarea readonly="readonly">';
		
		// Get the troops and ships.
		var troopList	= this.getOutput('Units');
		var shipList	= this.getOutput('Ships');
		
		// Add the troop list to the output, if filled.
		if(troopList.length > 0) {
			output += '===== ' + Language.$('unitInfo_units_label') + townInfo + ' =====' + troopList;
			
			// If there is also a shiplist, add a seperator.
			output += (shipList.length > 0) ? '\n\n' + '-'.repeat(85) + '\n\n' : '';
		}
		
		// Add the ship list to the output, if filled. {
		output += (shipList.length > 0) ? '===== ' + Language.$('unitInfo_ships_label') + townInfo + ' =====' + shipList : '';
		
		// Output should be in a textarea.
		output += '</textarea>';
		
		// Prepare the output.
		var text = {
			header:	Language.$('unitInfo_header') + townInfo,
			body:	output
		};
		
		// Show the output.
		var notificationId = myGM.notification(text);
		
		// Set the style for the textarea.
		myGM.addStyle(
				"#" + myGM.prefix + "notificationPanelBodyMContent" + notificationId + " textarea	{ width: 100%; height: 260px; resize: none;",
				'unitInfoTextarea', true
			);
		
		// Add a the listener to select the information on focus.
		myGM.$('#' + myGM.prefix + 'notificationPanelBodyMContent' + notificationId + ' textarea').addEventListener('focus', function() { this.select(); }, false);
	},
	
	/**
	 * Gets the units in a wrapper and returns them as a list.
	 * 
	 * @param	String	id
	 *   The id of the tab.
	 * 
	 * @return	String
	 *   The value for this tab.
	 */
	getOutput: function(id) {
		// Get the own units and store them.
		var ret = this.getOwnUnits(id);
		
		// Status of foreign troops.
		var foreignStatus = new Array('friends', 'enemies');
		
		// Get all wrapper for troops.
		var wrapper = myGM.$$('#tab' + id + ' .contentBox01h');
		
		// Loop over all wrappers.
		for(var i = 0; i < foreignStatus.length; i++) {
			// Get the foreign units for this status and store them.
			var foreignUnits = this.getForeignUnits(wrapper[i + 1], id, foreignStatus[i]);
			ret += (foreignUnits.length > 0) ? (((ret.length > 0) ? '\n' : '') + foreignUnits) : '';
		}
		
		// Return the output.
		return ret;
	},
	
	/**
	 * Get the own units in the town.
	 * 
	 * @param	String	id
	 *   The id of the tab.
	 * 
	 * @return	String
	 *   The list of own units.
	 */
	getOwnUnits: function(id) {
		// Get the wrapper.
		var wrapper = myGM.$('#tab' + id + ' .contentBox01h');
		
		// Get the name and number cells.
		var nameCells	= myGM.$$('.table01 .title_img_row th', wrapper);
		var numberCells	= myGM.$$('.table01 .count td', wrapper);
		
		// Storage for the list.
		var list = '';
		
		// Add the units if their numer is not zero.
		for(var i = 0; i < nameCells.length; i++) {
			var name	= nameCells[i].title;
			var number	= General.getInt(numberCells[i].innerHTML);
			
			list += (number > 0) ? '\n' + name + ': ' + number : '';
		}
		
		// Get the headline.
		var headline = '\n--- ' + Language.$('unitInfo_' + id.toLowerCase() + '_own') + ' ---';
		
		// Return the list with headline if some units were found. Otherwise return an empty string.
		return (list.length > 0) ? (headline + list) : '';
	},
	
	/**
	 * Get the foreign units in the town with the status.
	 * 
	 * @param	String	wrapper
	 *   The wrapper which contains the foreign units.
	 * @param	String	id
	 *   The id of the tab.
	 * @param	String	status
	 *   The status of the units.
	 * 
	 * @return	String
	 *   The list of foreign units.
	 */
	getForeignUnits: function(wrapper, id, status) {
		// Get the name cells and number rows.
		var nameCells	= myGM.$$('.table01 .title_img_row th:not(:first-child)', wrapper);
		var numberRows	= myGM.$$('.table01 tr:not(.title_img_row)', wrapper);
		
		// Distance between two belonging rows and storage for return value.
		var distance = numberRows.length / 2;
		var ret = '';
		
		// Iterate over all number rows.
		for(var i = 0; i < distance; i++) {
			// Get the number cells and the player name.
			var numberCells	= myGM.$$('td:not(:first-child)', numberRows[i]).concat(myGM.$$('td:not(:first-child)', numberRows[i + distance]));
			var playerName	= myGM.$('td a', numberRows[i]).innerHTML;
			
			// Storage for the list.
			var list = '';
			
			// Add the units if their numer is not zero.
			for(var k = 0; k < numberCells.length; k++) {
				var name	= nameCells[k].title;
				var number	= General.getInt(numberCells[k].innerHTML);
				
				list += (number > 0) ? '\n' + name + ': ' + number : '';
			}
			
			// Add the units with the player name to the list, if some units were found.
			list = ((list.length > 0) ? '\n* ' + playerName + ' *' : '') + list;
			ret += ((list.length > 0 && ret.length > 0) ? '\n' : '') + list;
		}
		
		// Get the headline.
		var headline = '\n--- ' + Language.$('unitInfo_' + id.toLowerCase() + '_' + status) + ' ---';
		
		// Return the list with headline if some units were found. Otherwise return an empty string.
		return (ret.length > 0) ? (headline + ret) : '';
	}
};

/**
 * The main function of the script.
 */
function main() {
	// Init the myGM functions.
	myGM.init();

	// If the script was already executed, do nothing.
	if(myGM.$('#' + myGM.prefix + 'alreadyExecutedScript'))	return;

	// Add the hint, that the script was already executed.
	var alreadyExecuted		= myGM.addElement('input', myGM.$('#container'), 'alreadyExecutedScript');
	alreadyExecuted.type	= 'hidden';

	// Init the language.
	Language.init();

	// Init the script.
	General.init();

	// Call the function to check for updates.
	Updater.init();

	// Call the function to enhance the view.
	EnhancedView.init();
}

// Call the main function of the script.
setTimeout(main, 0);