// ==UserScript==
// @name			Enhanced UI
// @description		Enhancements for the user interface of Ikariam.
// @namespace		Tobbe
// @author			Tobbe
// @version			7.00
//
// @include			http://s*.*.ikariam.*/*
// @include			http://m*.*.ikariam.*/*
// 
// @exclude			http://support.*.ikariam.*/*
// 
// @resource		languageGerman	http://resources.ika-scripts.co.cc/74221/v7.00/languageGerman.json
// @resource		languageEnglish	http://resources.ika-scripts.co.cc/74221/v7.00/languageEnglish.json
// @resource		languageLatvian	http://resources.ika-scripts.co.cc/74221/v7.00/languageLatvian.json
// 
// @bug				Opera	Zooming with the mouse is only possible with "Alt" or without any key. No fix possible as I know.
// @bug				Chrome	No good solution for zooming with mouse. Default Ikariam scroll zoom function can not be changed.
// @bug				Chrome	Some smaller graphical bugs caused by a second execution of Ikariam functions by the script.
// @bug				Chrome	Latvian special chars are not shown correct.
// @bug				All		The selected island is not centered in world view.
// @bug				All		If you are zooming to more than 100%, the view is not centered correctly after a page reload.
// 
// @history			7.00	Feature: Cross-browser compatibility. (Firefox, Chrome, Opera)
// @history			7.00	Feature: Latvian translation - thanks to Draxo. (mobile & desktop)
// @history			7.00	Feature: Possibility to hide the update hint for a new script version. (mobile & desktop)
// @history			7.00	Bugfix: Resizing the owner state in world view was broken. (desktop)
// @history			7.00	Some changes in the code for easier copying of functions which should be used by more than one script.
// 
// @history			6.00	Feature: Resizing banners when zooming is possible in city view, too. (desktop)
// @history			6.00	Feature: The zoom buttons are available in world view, too. (desktop)
// @history			6.00	Feature: Zooming with the mouse scroll is possible again (now with key, standard is ctrl). (desktop)
// @history			6.00	Feature: Changes in the option panel due to the new zooming function features. (desktop)
// @history			6.00	Bugfix: If resizing is enabled, zooming with the buttons will resize the banners, too. (desktop)
// @history			6.00	Bugfix: The chat will not cause to much executions of script functions. (desktop)
// @history			6.00	The language texts are integrated as resources, so that there is shorter code.
// @history			6.00	Replace the GM_* functions by myGM.* to expand them easy and add new.
// 
// @history			5.00	Feature: Possibility to hide only the bird swarm animation. (desktop)
// @history			5.00	Feature: Easier upkeep reduction table. (mobile & desktop)
// @history			5.00	Feature: Enhanced zoom function using the Ikariam zoom function. (desktop)
// @history			5.00	Due to the use of Ikariam functions the code could be reduced.
// @history			5.00	Code enhancements for shorter code.
// 
// @history			4.02	Bugfix: Not all occurrences of hidden were changed.
// 
// @history			4.01	Bugfix: Name of a class (hidden) is used by GF.
// 
// @history			4.00	Feature: Options panel to enable/disable funtions and set settings. (mobile & desktop)
// @history			4.00	Feature: Update interval can be set. (mobile & desktop)
// @history			4.00	Feature: Manually check for updates. (mobile & desktop)
// @history			4.00	Feature: Zoom funtion without resizing the whole view. (desktop)
// @history			4.00	Feature: Move loading circle to another position. (desktop)
// @history			4.00	Feature: Show tooltip in Alliance / Military view on mouseover. (desktop)
// @history			4.00	Feature: Code better commented. More comments, so that it is easier to understand.
// @history			4.00	Bugfix: Changed *.gif to *.png.
// @history			4.00	Version numbers adjusted.
//
// @history			3.01	Feature: Support for mobile interface.
// @history			3.01	Bugfix: Fixed bug with scrollbar in finances view. (desktop)
// 
// @history			3.00	Feature: Ready for 0.5.0, but also supports 0.4.5 furthermore.
// @history			3.00	Feature: Implemented support for different languages.
// @history			3.00	Feature: Enhanced script updater.
// @history			3.00	Feature: Cleaned up code.
// @history			3.00	Feature: Rename the script to "Enhanced UI".
// @history			3.00	Feature: Change the namespace to "Tobbe".
// @history			3.00	Because of the change of namespace and name you have to delete the old script manually!
//
// @history			2.05	Bugfix: Problem with negative numbers and 0.4.2.4 fixed.
//
// @history			2.04	Feature: Own script updater.
// @history			2.04	Bugfix: Remove everything what refered to other scripts.
//
// @history			2.03	Feature: New script updater.
//
// @history			2.02	Remove the script updater (Because of the problem with Greasemonkey scripts).
//
// @history			2.01	Feature: New style of update panel.
// @history			2.01	Bugfix: Bug with ',' as seperator fixed.
//
// @history			2.00	Feature: Income in 24h added.
// @history			2.00	Feature: Cleaned up code.
//
// @history			1.01	Feature: Update check implemented.
//
// @history			1.00	Initial release.
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
const scriptInfo = {
	version:	'7.00',
	id:			138876,
	name:		'Ikariam Enhanced UI',
	author:		'Tobbe',
	debug:		false,
};

/**
 * Information about the language.
 */
const languageInfo = {
	implemented:	new Array('English', 'German', 'Latvian'),
	defaultText:	{"default":{"update":{"notPossible":{"header":"No Update possible","text1":"It is not possible to check for updates for ","text2":". Please check manually for Updates for the script. The actual installed version is ","text3":". This message will appear again in four weeks."},"possible":{"header":"Update available","text1":"There is an update for ","text2":" available.","text3":"At the moment there is version ","text4":" installed. The newest version is ","history":"Version History","type":{"feature":"Feature(s)","bugfix":"Bugfix(es)","other":""},"button":{"install":"Install","hide":"Hide"}},"noNewExists":{"header":"No Update available","text1":"There is no new version for ","text2":" available. The newest version ","text3":" is installed."}},"notification":{"header":"Script notification","button":{"confirm":"OK","abort":"Abort"}}},"settings":{"kiloSep":",","decSep":".","left2right":true},"general":{"successful":"Your order has been carried out.","error":"There was an error in your request.","ctrl":"Ctrl","alt":"Alt","shift":"Shift"},"balance":{"income":{"perHour":"Income per hour","perDay":"Income per day","start":"Income without reduction"},"upkeep":{"reason":{"0":"Troops","1":"Ships","2":"Troops &amp; Ships"},"basic":"Basic Costs","supply":"Supply Costs","result":"Total Costs"}},"optionPanel":{"scripts":"Scripts","update":"Update","module":"Modules","zoom":"Zoom function","save":"Save settings!","label":{"updateActive":"Search for updates automatically","incomeOnTopActive":"Show income on top in Balance view","upkeepReductionActive":"Show a short version of the upkeep reduction","zoomActive":"Activate zoom in world view, island view, town view","lcMoveActive":"Move loading circle to position bar","tooltipsAutoActive":"Show tooltips in alliance mebers view and military advisor automatically","hideBirdsActive":"Hide the bird swarm.","updateInterval":"Interval to search for updates:","manualUpdate1":"Search for updates for \"","manualUpdate2":"\"!","world":{"zoomFactor":"Zoom worldmap:","scaleChildren":"Worldmap"},"island":{"zoomFactor":"Zoom island view:","scaleChildren":"Island view"},"town":{"zoomFactor":"Zoom town view:","scaleChildren":"Town view"},"description":{"scaleChildren":"Let banners and symbols in normal size when zooming when zooming in this view:","accessKeys":"This keys must be pressed to zoom with the mouse:"}},"updateIntervals":{"hour":"1 hour","hour12":"12 hours","day":"1 day","day3":"3 days","week":"1 week","week2":"2 weeks","week4":"4 weeks"}}},
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
const con = conTmp;

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
String.prototype.trim = function (toRemove) {
	// Return the trimmed string.
	return this.ltrim(toRemove).rtrim(toRemove);
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
		
		// Set the possibility to use the GM_ressource.
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
				 ." + this.prefix + "notificationPanelBodyMContent		{ max-height: 270px; padding: 10px; background-color: #FFF; border: 1px dotted #4D4D4D; font: 14px Arial,Helvetica,sans-serif; color: #333; border-collapse: separate; overflow-y:auto; } \
				 ." + this.prefix + "notificationPanelBodyMBottom		{ max-height: 170px; padding: 10px; background-color: #FFF; border: 1px dotted #4D4D4D; font: 14px Arial,Helvetica,sans-serif; color: #333; border-collapse: separate; overflow-y:auto; } \
				 ." + this.prefix + "notificationPanelBodyPlaceholder	{ height: 20px; } \
				 ." + this.prefix + "notificationPanelFooter			{ height: 20px; background: none repeat scroll 0 0 transparent; } \
				 ." + this.prefix + "notificationPanelFooterL			{  } \
				 ." + this.prefix + "notificationPanelFooterR			{  } \
				 ." + this.prefix + "notificationPanelFooterM			{ background-color: #F5F5F5; border-bottom: 3px solid #000; border-left: 3px solid #000; border-right: 3px solid #000; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; padding: 3px 0 2px 3px; font-size: 77%; } \
				 ." + this.prefix + "notificationPanelClose				{ cursor: pointer; position: absolute; top: 10px; right: 10px; width: 16px; height: 16px; background-image: url('" + closeImage + "'); } \
				 ." + this.prefix + "notificationPanelButton			{ background-color: #DADEDE; bottom: -4px; position: absolute; border-color: #C0C0C0 #4D4D4D #4D4D4D #C0C0C0; border-style: double; border-width: 3px; border-radius: 5px; cursor: pointer; display: inline; font-weight: bold; margin: 10px auto; padding: 2px 10px; text-align: center; font-size: 12px; left: 50%; width: 100px; } \
				 ." + this.prefix + "notificationPanelButton:hover		{ color: #444; } \
				 ." + this.prefix + "notificationPanelButton:active		{ border-color: #4D4D4D #C0C0C0 #C0C0C0 #4D4D4D; border-style: double; border-width: 3px; padding: 3px 10px 1px; } \
				 ." + this.prefix + "notificationPanelButtonConfirm		{ margin-left: -105px; } \
				 ." + this.prefix + "notificationPanelButtonAbort		{ margin-left: 5px; }",
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
		// If the use of the default GM_setValue ist possible, use it.
		if(this.canUseGmStorage) {
			// Store the value.
			GM_setValue(key, value);
		
		// Otherwise use the local storage if possible.
		} else if(this.canUseLocalStorage) {
			// Store the value.
			win.localStorage.setItem(this.prefix + key, value);
		
		// Otherwise use cookies.
		} else {
			// Prepare the cookie name and value.
			var data	= escape(this.prefix + key) + '=' + escape(win.JSON.stringify(value));
			
			// Set the expire date to January 1st, 2020.
			var expire	= 'expires=' + (new Date(2020, 0, 1, 0, 0, 0, 0)).toGMTString();
			
			// Set the path to root.
			var path	= 'path=/';
			
			// Made the cookie accessible from all servers.
			var domain	= 'domain=ikariam.com';
			
			// Set the cookie.
			document.cookie = data + ';' + expire + ';' + path + ';' + domain;
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
		// Storage for the value.
		var value = defaultValue;
		
		// If the use of the default GM_getValue ist possible, use it.
		if(this.canUseGmStorage) {
			// Get the value.
			value = GM_getValue(key, defaultValue);
		
		// Otherwise use the local storage if possible.
		} else if(this.canUseLocalStorage) {
			// Get the value.
			valueTmp = win.localStorage.getItem(this.prefix + key);
			
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
			document.cookie = data + ';' + expire + ';' + path + ';' + domain;
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
		storedWithId = false;
		
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
	 *   The name of the ressource to parse.
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
				url: 'http://resources.ika-scripts.co.cc/' + scriptInfo.id + '/v' + scriptInfo.version + '/' + name + '.json',
				headers: { 'User-agent': navigator.userAgent, 'Accept': 'text/html' },
				synchronous: true,
				onload: function(response) { return false; },
			});
		}
		
		// Return the parsed resource text.
		return win.JSON.parse(responseText, safeParse);
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
					body:	Language.$('default_update_notPossible_text1') + '<a href="http://userscripts.org/scripts/show/' + scriptInfo.id + '" target="_blank" >' + scriptInfo.name + '</a>' + Language.$('default_update_notPossible_text2') + scriptInfo.version + Language.$('default_update_notPossible_text3'),
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
	 */
	notification: function(text, callback) {
		// Get the notification id.
		this.notificationId += 1;
		var notificationId = this.notificationId;
		
		// Create the background and the container.
		var notificationBackground			= myGM.addElement('div', document.body, 'notificationBackground' + notificationId, 'notificationBackground', null, true);
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
		var notificationPanelBodyPlaceholder	= myGM.addElement('div', notificationPanelBodyM, 'notificationPanelBodyPlaceholder' + notificationId, 'notificationPanelBodyPlaceholder', null, true);
		
		// Create the notification panel footer.
		var notificationPanelFooter			= myGM.addElement('div', notificationPanel, 'notificationPanelFooter' + notificationId, 'notificationPanelFooter', null, true);
		var notificationPanelFooterL		= myGM.addElement('div', notificationPanelFooter, 'notificationPanelFooterL' + notificationId, 'notificationPanelFooterL', null, true);
		var notificationPanelFooterR		= myGM.addElement('div', notificationPanelFooterL, 'notificationPanelFooterR' + notificationId, 'notificationPanelFooterR', null, true);
		var notificationPanelFooterM		= myGM.addElement('div', notificationPanelFooterR, 'notificationPanelFooterM' + notificationId, 'notificationPanelFooterM', null, true);
		
		// Create the confirm button.
		var notificationPanelConfirm		= myGM.addElement('input', notificationPanel, 'notificationPanelConfirm' + notificationId, new Array('notificationPanelButton', 'notificationPanelButtonConfirm'), null, true);
		notificationPanelConfirm.type		= 'button';
		notificationPanelConfirm.value		= text.confirm ? text.confirm : Language.$('default_notification_button_confirm');
		
		// Create the abort button.
		var notificationPanelAbort			= myGM.addElement('input', notificationPanel, 'notificationPanelAbort' + notificationId, new Array('notificationPanelButton', 'notificationPanelButtonAbort'), null, true);
		notificationPanelAbort.type			= 'button';
		notificationPanelAbort.value		= text.abort ? text.abort : Language.$('default_notification_button_abort');
		
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
		} else {
			notificationPanelAbort.addEventListener('click', closeNotificationPanel, false);
		}
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
		return parent.querySelectorAll(query);
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
			var idPrefix = (hasPrefix && (hasPrefix == false || (hasPrefix.id && hasPrefix.id == false))) ? '' : this.prefix;
			
			// Set the id.
			newElement.id = idPrefix + id;
		}
		
		// Add all classes.
		if(classes && classes != '') {
			// Get the class prefix.
			var classPrefix = (hasPrefix && (hasPrefix == true || (hasPrefix.classes && hasPrefix.classes == true))) ? this.prefix : '';
			
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
	},
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
					if(scriptInfo.version < metadata.version && (myGM.getValue('updater_hideUpdate', scriptInfo.version) < metadata.version || Updater.manualUpdate)) {
						// Show update dialogue.
						Updater.showUpdateInfo(metadata);

					// If there is no new update and it was a manual update show hint.
					} else if(Updater.manualUpdate)	{
						// Set the notification text.
						var notificationText = {
							header:	Language.$('default_update_noNewExists_header'),
							body:	Language.$('default_update_noNewExists_text1') + '<a href="http://userscripts.org/scripts/show/' + scriptInfo.id + '" target="_blank" >' + scriptInfo.name + '</a>' + Language.$('default_update_noNewExists_text2') + scriptInfo.version + Language.$('default_update_noNewExists_text3'),
						};
								
						// Show a notification.
						myGM.notification(notificationText);
					}
				},
			});
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
			abort:		Language.$('default_update_possible_button_hide'),
		};
		
		// Set the notification callback.
		var notificationCallback = {
			confirm:	function() { top.location.href = 'http://userscripts.org/scripts/source/' + scriptInfo.id + '.user.js'; },
			abort:		function() { myGM.setValue('updater_hideUpdate', metadata.version + ''); },
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
			other:		Language.$('default_update_possible_type_other'),
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
	},
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
		
		// Set the language name.
		this.setLangName(lang ? lang[1] : 'en');
		
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
		// Get the ressource.
		var text = myGM.getResourceParsed('language' + this.name);
		
		// Get the ressource an store it to Language.text.
		this.text = (text && !text.is_error) ? text : languageInfo.defaultText;
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
	},
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
	},
		
	/**
	 * Set the general script styles.
	 */
	setStyles: function() {
		// Add the general used styles.
		myGM.addStyle(
				".bottomLine					{ border-bottom: 1px dotted #CCA569; } \
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
				 ." + myGM.prefix + "notificationPanelButton			{ background: url('skin/input/button.png') repeat-x scroll 0 0 #ECCF8E; bottom: -4px; position: absolute; border-color: #C9A584 #5D4C2F #5D4C2F #C9A584; border-style: double; border-width: 3px; cursor: pointer; display: inline; font-weight: bold; margin: 10px auto; padding: 2px 10px; text-align: center; font-size: 12px; left: 50%; width: 100px; } \
				 ." + myGM.prefix + "notificationPanelButton:hover		{ color: #B3713F; } \
				 ." + myGM.prefix + "notificationPanelButton:active		{ border-color: #5D4C2F #C9A584 #C9A584 #5D4C2F; border-style: double; border-width: 3px; padding: 3px 10px 1px; } \
				 ." + myGM.prefix + "notificationPanelButtonConfirm		{ margin-left: -105px; } \
				 ." + myGM.prefix + "notificationPanelButtonAbort		{ margin-left: 5px; }",
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
		return parseInt(txt.replace(Language.$('settings_kiloSep'), ''));
	},
	
	/**
	 * Returns the value of the selected option of a select field.
	 * 
	 * @param	String	id
	 *   The last part of the id of the element.
	 * 
	 * @return	String
	 *   The value.
	 */
	getSelectValue: function(id) {
		// Get the select field.
		var select = myGM.$('#' + myGM.prefix + id);
		
		// Return the value.
		return select.options[select.selectedIndex].value;
	},
	
	/**
	 * Formats a number to that format that is used in Ikariam.
	 *
	 * @param	int		num
	 *   The number to format.
	 * 
	 * @return	String
	 *   The formated number.
	 */
	formatToIkaNumber: function(num) {
		var txt = num + '';
		
		// Set a seperator every 3 digits from the end.
		txt = txt.replace(/(\d)(?=(\d{3})+\b)/g, '$1' + Language.$('settings_kiloSep'));
		
		// If the number is negative write it in red.
		if(num < 0) {
			txt = '<span class="red bold negative">' + txt + '</span>';
		}
		
		// Return the formated number.
		return txt;
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
	},
		
	/**
	 * Creates a new checkbox and adds it to a parent.
	 * 
	 * @param	element	parent
	 *   The parent of the new checkbox.
	 * @param	String	id
	 *   The middle part of the id of the checkbox.
	 * @param	boolean	checked
	 *   If the checkbox is checked or not.
	 * @param	String	labelText
	 *   The text of the label.
	 */
	addCheckbox: function(parent, id, checked, labelText) {
		// Create the wrapper for the checkbox and the label.
		var cbWrapper	= myGM.addElement('div', parent, null, 'cbWrapper');

		// Create the checkbox and set the attributes.
		var cb		= myGM.addElement('input', cbWrapper, id + 'Cb', 'checkbox');
		cb.type		= 'checkbox';
		cb.title	= labelText;
		cb.checked	= checked ? 'checked' : '';
		
		// Replace the checkbox for better appearance.
		ika.controller.replaceCheckboxes();
	},

	/**
	 * Creates a new select field and adds it to a parent.
	 * 
	 * @param	element	parent
	 *   The parent of the new select field.
	 * @param	String	id
	 *   The last part of the id of the select field.
	 * @param	boolean	selected
	 *   The value of the selected option.
	 * @param	mixed[]	opts
	 *   An array with the names an values of the options.
	 */	
	addSelect: function(parent, id, selected, opts) {
		// Create the wrapper for the select.
		var wrapper				= myGM.addElement('div', parent, null, new Array('select_container', 'size175'), new Array(['position', 'relative']));
		
		// Create the select field.
		var select	= myGM.addElement('select', wrapper, id + 'Select', 'dropdown');
		
		// Add the Options.
		for(var i = 0; i < opts['name'].length; i++) {
			// Create an option.
			var option			= myGM.addElement('option', select);

			// Set the value and the name.
			option.value		= opts['value'][i];
			option.innerHTML	= opts['name'][i];

			// If the option is selected, set selected to true.
			if(option.value == selected) {
				option.selected = 'selected';
			}
		}
		
		// Replace the dropdown for better appearance.
		ika.controller.replaceDropdownMenus();
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
			
			default:
				msgLocation = -1;
			  break;
		}
		
		// Get the message type.
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
			
			default:
				msgType = -1;
			  break;
		}
		
		// Show the tooltip.
		ika.controller.tooltipController.bindBubbleTip(msgLocation, msgType, msgText, null, msgBindTo, msgIsMinSize);
	},
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
			// Get the element from the event.
			e = e || win.event;
			var target = e.target || e.srcElement;
			
			// If mobile version, switch the inner html.
			if(General.isMobileVersion()) {
				if(this.innerHTML == '+') {
					this.innerHTML = '-';
				} else {
					this.innerHTML = '+';
				}
			}
			
			// Switch the button picture.
			this.classList.toggle('minimizeImg');
			this.classList.toggle('maximizeImg');
			
			// Get the table rows.
			var tr = myGM.$$('tr', this.parentNode.parentNode.parentNode);
			
			// Toggle the visibility of all table rows except the first.
			for(var i = 1; i < tr.length; i++) {
				tr[i].classList.toggle('invisible');
			}

			// Adjust the size of the Scrollbar.
			ika.controller.adjustSizes();
		},
	},
	
	/**
	 * Events for the zoom function.
	 */
	zoomFunction: {
		/**
		 * Zoom in when clicking on the zoom in button.
		 */
		zoomIn: function(e) {
			// Get the element from the event.
			e = e || win.event;
			var target = e.target || e.srcElement;
			
			// Get the zoom factor.
			factor = myGM.getValue('zoom_' + View.name + 'Factor', 100) + ZoomFunction.zoomStep;
			
			// If the factor is too big set it to the max allowed and hide the zoom in button.
			if(factor >= ZoomFunction.maxZoom) {
				this.classList.add('invisible');
			}

			// Show the zoom out button if it is invisible.
			myGM.$('#' + myGM.prefix + 'zoomOut').classList.remove('invisible');

			// Zoom.
			ZoomFunction.zoom(factor);
		},
		
		/**
		 * Zoom out when clicking on the zoom out button.
		 */
		zoomOut: function(e) {
			// Get the element from the event.
			e = e || win.event;
			var target = e.target || e.srcElement;
			
			// Get the zoom factor.
			factor = myGM.getValue('zoom_' + View.name + 'Factor', 100) - ZoomFunction.zoomStep;
			
			// If the factor is too small set it to the min allowed and hide the zoom out button.
			if(factor <= ZoomFunction.minZoom) {
				this.classList.add('invisible');
			}

			// Show the zoom in button if it is invisible.
			myGM.$('#' + myGM.prefix + 'zoomIn').classList.remove('invisible');

			// Zoom.
			ZoomFunction.zoom(factor);
		},
		
		/**
		 * Zoom if the mouse is scrolled.
		 */
		mouseScroll: function(e) {
			// Get the element from the event.
			e = e || win.event;
			var target = e.target || e.srcElement;
			
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
				
				// Zoom the view.
				ZoomFunction.zoom(myGM.getValue('zoom_' + View.name + 'Factor', 100) + ZoomFunction.zoomStep * stepNumber);
				
				// Stop the default event.
				if(e.preventDefault) {
					e.preventDefault();
				} else {
					return false;
				}
			}
		},
	},
	
	/**
	 * Events for the option panel.
	 */
	optionPanel: {
		/**
		 * Save the settings in the option panel.
		 */
		saveSettings: function() {
			if(General.isMobileVersion()) {
				OptionPanel.saveSettingsMobile();
			} else {
				OptionPanel.saveSettings();
			}
		},
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
			// Get the element from the event.
			e = e || win.event;
			var target = e.target || e.srcElement;

			// If the attribute was changed.
			if(e.attrChange == MutationEvent.MODIFICATION) {
				// If the style.display is set to none.
				if(e.attrName.trim() == 'style' && e.newValue.search(/display: none/i) != -1) {
					// Timeout to have access to GM_ funtions.
					setTimeout(EnhancedView.getPopup, 0);
				}
			}
		},
	},
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
		
		// Move loading circle.
		if(myGM.getValue('module_lcMoveActive', true))	View.moveLoadingCircle();
		
		// Hide the Bird animation.
		if(myGM.getValue('module_hideBirdsActive', true))	View.hideBirds();
		
		// Zoom function.
		if(myGM.getValue('module_zoomActive', true))		ZoomFunction.init();
	},
	
	/**
	 * Inits the mobile version.
	 */
	initMobile: function() {
		// Get the param string.
		var params = top.location.search;

		// If the view is finances.
		if(params.search(/view=finances/) > -1) {
			if(myGM.getValue('module_incomeActive', true))	Balance.incomeOnTopMobile();
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
		// If the script was already executet on this popup.
		if(myGM.$('#' + myGM.prefix + 'alreadyExecuted'))	return;
		
		// Get the popup.
		popup = myGM.$('.templateView');
		
		// Get the popup id.
		popupId = popup ? popup.id : '';
		
		// If a popup exists, add the hint, that the popup script was executed.
		if(popup) {
			alreadyExecuted			= myGM.addElement('input', myGM.$('.mainContent', popup), 'alreadyExecuted');
			alreadyExecuted.type	= 'hidden';
		}
		
		// Options popup.
		if(popupId == 'options_c')		OptionPanel.desktop();
		
		// Finance popup.
		if(popupId == 'finances_c') {
			if(myGM.getValue('module_incomeActive', true))									Balance.incomeOnTop();
			if(myGM.getValue('module_urtShortActive', true))								Balance.shortUpkeepReductionTable();
		}

		// Military view popup.
		if(popupId == 'militaryAdvisor_c' && myGM.getValue('module_ttAutoActive', true))	Tooltips.autoshowInMilitaryView();
		
		// Diplomacy ally view popup.
		if(popupId == 'diplomacyAlly_c' && myGM.getValue('module_ttAutoActive', true))		Tooltips.autoshowInAllianceView();
		
		// Diplomacy ally view popup.
		if(popupId == 'embassy_c' && myGM.getValue('module_ttAutoActive', true))			Tooltips.autoshowInAllianceView();
	},
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
				 #loadingPreview	{ -moz-transform: scale(0.5); msTransform: scale(0.5); -o-transform: scale(0.5); -webkit-transform: scale(0.5); transform: scale(0.5); left: 35px !important; top: 141px !important; }"
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
		this.autoshowGeneral('spyMilitary');
	},
	
	/**
	 * Show tooltips with class name magnifierClass automatically.
	 * 
	 * @param	String	magnifierClass
	 *   The class of the tooltips to enable toggling.
	 */
	autoshowGeneral: function(magnifierClass) {
		// Get all magnifiers.
		var magnifier = myGM.$$('.' + magnifierClass);

		// Set the mousover and mouseout for all magnifiers.
		for(var i = 0; i < magnifier.length; i++) {
			var magOnClick = magnifier[i].onclick;
			magnifier[i].onclick = 'return false;';
			magnifier[i].addEventListener('mouseover', magOnClick, false);
			magnifier[i].addEventListener('mouseout', magOnClick, false);
		}
	},
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
		incomeRow		= myGM.addElement('tr', summaryTable, null, new Array('result', 'alt'));
		incomeRow24h	= myGM.addElement('tr', summaryTable, null, 'result');
		
		// Create the content of the table rows.
		General.createTableRow(new Array(Language.$('balance_income_perHour'), '', '', General.formatToIkaNumber(income)), new Array('sigma', ['value', 'res'], ['value', 'res'], ['value', 'res']), incomeRow, false);
		General.createTableRow(new Array(Language.$('balance_income_perDay'), '', '', General.formatToIkaNumber(income * 24)), new Array('sigma', ['value', 'res'], ['value', 'res'], ['value', 'res']), incomeRow24h, false);
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
		var row	= new Array();
				row.reason			= new Array();
				row.basicUpkeep		= new Array();
				row.supplyUpkeep	= new Array();
				row.result			= new Array();
		
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
		General.createTableRow(new Array('', Language.$('balance_upkeep_basic'), Language.$('balance_upkeep_supply'), Language.$('balance_upkeep_result')), new Array('city', ['value', 'res'], ['value', 'res'], ['value', 'res']), myGM.addElement('tr', shortTable), true);
		
		// Create the start income row.
		var startRow = myGM.addElement('tr', shortTable, null, new Array('alt', 'bottomLine'));
		General.createTableRow(new Array(Language.$('balance_income_start'), '', '', General.formatToIkaNumber(beforeReduction)), new Array('city', ['value', 'res'], ['value', 'res'], ['value', 'res']), startRow, false);
		
		// Create the troops / ships redution rows.
		for(var i = 0; i < 3; i++) {
			var newRow = myGM.addElement('tr', shortTable, null, (i % 2 == 1) ? new Array('alt', 'bottomLine') : '');
			General.createTableRow(new Array(row.reason[i], General.formatToIkaNumber(-row.basicUpkeep[i]), General.formatToIkaNumber(-row.supplyUpkeep[i]), General.formatToIkaNumber(-row.result[i])), new Array('city', ['value', 'res'], ['value', 'res'], 'hidden'), newRow, false);
		}
		
		// Create the result row.
		var resultRow = myGM.addElement('tr', shortTable, null, 'result');
		General.createTableRow(new Array('<img alt="Summe" src="skin/layout/sigma.png">', '', '', General.formatToIkaNumber(income)), new Array('sigma', ['value', 'res'], ['value', 'res'], 'hidden'), resultRow, false);
		
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
};
	
/**
 * Functions for option panel.
 */
OptionPanel = {
	/**
	 * Adds the tab for the script options in the desktop version.
	 */
	desktop: function() {
		// If the tab already exists return.
		if(myGM.$('#tabScriptOptions')) {
			return;
		}

		// Set the styles.
		this.setStylesDesktop();

		// Add the GM tab link to the tab menu.
		var tabmenu					= myGM.$('.tabmenu');
		jsTabGMOptions				= myGM.addElement('li', tabmenu, null, 'tab');
		jsTabGMOptions.id			= 'js_tabScriptOptions';
		jsTabGMOptions.setAttribute('onclick', "switchTab('tabScriptOptions');");
		jsTabGMOptions.innerHTML	= '<b class="tabScriptOptions"> ' + Language.$('optionPanel_scripts') + ' </b>';
		
		// Add the content wrapper for the GM tab to the tab menu.
		var mainContent				= myGM.$('#tabGameOptions').parentNode;
		tabGMOptions				= myGM.addElement('div', mainContent, null, null, new Array(['display', 'none']));
		tabGMOptions.id				= 'tabScriptOptions';
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
				 .cbWrapper			{ margin: 0 0 0 10px; }"
			);
	},
	
	/**
	 * Creates the content of the tab.
	 * 
	 * @param	element	tab
	 *   The tab where the content should be added.
	 */
	createTabContent: function(tab) {
		// Create the wrapper for the enabling / disabling of modules.
		var moduleContentWrapper	= this.createOptionsWrapper(tab, Language.$('optionPanel_module'));
		this.createModuleContent(moduleContentWrapper);
		
		// Create the wrapper for the update settings.
		var updateContentWrapper	= this.createOptionsWrapper(tab, Language.$('optionPanel_update'));
		this.createUpdateContent(updateContentWrapper);
		
		// Create the wrapper for the zoom settings.
		var zoomContentWrapper		= this.createOptionsWrapper(tab, Language.$('optionPanel_zoom'));
		this.createZoomContent(zoomContentWrapper);
	},
	
	/**
	 * Create a wrapper for a section on the option panel.
	 * 
	 * @param	element	tab
	 *   The tab where the wrapper should be added.
	 * @param	String	headerText
	 *   The text of the header.
	 * 
	 * @return	element
	 *   The wrapper for the content of the options.
	 */
	createOptionsWrapper: function(tab, headerText) {
		// Create the wrapper.
		var optionsWrapper	= myGM.addElement('div', tab, null, 'contentBox01h');
		
		// Create the header.
		var optionsHeader		= myGM.addElement('h3', optionsWrapper, null, 'header');
		optionsHeader.innerHTML	= headerText;
		
		// Create the content wrapper.
		var optionsWrapperContent	= myGM.addElement('div', optionsWrapper, null, 'content');
		
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
		
		// Get the ids.
		var id		= new Array(
				'update',
				'incomeOnTop',
				'upkeepReduction',
				'zoom',
				'loadingCircleMove',
				'tooltipsAuto',
				'hideBirds'
			);
		
		// Get the values.
		var value	= new Array(
				myGM.getValue('module_updateActive', true),
				myGM.getValue('module_incomeActive', true),
				myGM.getValue('module_urtShortActive', true),
				myGM.getValue('module_zoomActive', true),
				myGM.getValue('module_lcMoveActive', true),
				myGM.getValue('module_ttAutoActive', true),
				myGM.getValue('module_hideBirdsActive', true)
			);
		
		// Get the labels.
		var label	= new Array(
				Language.$('optionPanel_label_updateActive'),
				Language.$('optionPanel_label_incomeOnTopActive'),
				Language.$('optionPanel_label_upkeepReductionActive'),
				Language.$('optionPanel_label_zoomActive'),
				Language.$('optionPanel_label_lcMoveActive'),
				Language.$('optionPanel_label_tooltipsAutoActive'),
				Language.$('optionPanel_label_hideBirdsActive')
			);
		
		for(var i = 0; i < id.length; i++) {
			// Create table row.
			var tr	= this.addOptionsTableRow(updateTable, true);

			// Create checkbox.
			General.addCheckbox(tr.firstChild, id[i], value[i], label[i]);
			
			// Add class for checkbox.
			tr.firstChild.classList.add('left');
		}

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
		moduleHeader.innerHTML	= Language.$('optionPanel_module');
		
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
				'&nbsp;&nbsp;' + Language.$('optionPanel_label_updateActive'),
				'&nbsp;&nbsp;' + Language.$('optionPanel_label_incomeOnTopActive'),
				'&nbsp;&nbsp;' + Language.$('optionPanel_label_upkeepReductionActive')
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
		var updateTable	= this.addOptionsTable(contentWrapper);
		var tr1			= this.addOptionsTableRow(updateTable, false);
		var tr2			= this.addOptionsTableRow(updateTable, true);

		// Create label.
		var updateIntervalLabel			= myGM.addElement('span', tr1.firstChild);
		updateIntervalLabel.innerHTML	= Language.$('optionPanel_label_updateInterval');

		// Array for update interval values and names.
		var opts = new Array();
		opts['value']	= new Array(
				3600,
				43200,
				86400,
				259200,
				604800,
				1209600,
				2419200
			);
		opts['name']	= new Array(
				Language.$('optionPanel_updateIntervals_hour'),
				Language.$('optionPanel_updateIntervals_hour12'),
				Language.$('optionPanel_updateIntervals_day'),
				Language.$('optionPanel_updateIntervals_day3'),
				Language.$('optionPanel_updateIntervals_week'),
				Language.$('optionPanel_updateIntervals_week2'),
				Language.$('optionPanel_updateIntervals_week4')
			);

		// Create the update interval select.
		General.addSelect(tr1.lastChild, 'updateInterval', myGM.getValue('updater_updateInterval', 3600), opts);
		
		// Prepare the table row.
		tr2.firstChild.classList.add('center');
		
		// Add the link for manual updates.
		var updateLink			= myGM.addElement('a', tr2.firstChild);
		updateLink.href			= '#';
		updateLink.innerHTML	= Language.$('optionPanel_label_manualUpdate1') + scriptInfo.name + Language.$('optionPanel_label_manualUpdate2');
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
		updateHeader.innerHTML = Language.$('optionPanel_update');
		
		// Create the select wrapper.
		var p1	= myGM.addElement('p', contentWrapper, null, null, new Array(['textAlign', 'center']));

		// Create the select label.
		var selectLabel			= myGM.addElement('label', p1, 'updateIntervalLabel');
		selectLabel.innerHTML	= Language.$('optionPanel_label_updateInterval');
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
				Language.$('optionPanel_updateIntervals_hour'),
				Language.$('optionPanel_updateIntervals_hour12'),
				Language.$('optionPanel_updateIntervals_day'),
				Language.$('optionPanel_updateIntervals_day3'),
				Language.$('optionPanel_updateIntervals_week'),
				Language.$('optionPanel_updateIntervals_week2'),
				Language.$('optionPanel_updateIntervals_week4')
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
		updateLink.innerHTML	= Language.$('optionPanel_label_manualUpdate1') + scriptInfo.name + Language.$('optionPanel_label_manualUpdate2');
		updateLink.addEventListener('click', Updater.doManualUpdate, false);
	},
	
	/**
	 * Create the content of the zoom part.
	 * 
	 * @param	element	contentWrapper
	 *   The wrapper where the content should be added.
	 */
	createZoomContent: function(contentWrapper) {
		// Create the options tables.
		var zoomTableFactor			= this.addOptionsTable(contentWrapper);
		var zoomTableScaleChildren	= this.addOptionsTable(contentWrapper);
		var zoomTableAccessKeys		= this.addOptionsTable(contentWrapper);
		
		// Add the description to the scale children table row.
		var scDescriptionTr			= this.addOptionsTableRow(zoomTableScaleChildren, true);
		scDescriptionTr.classList.add('content');
		scDescriptionTr.firstChild.classList.add('left');
		var scDescriptionP			= myGM.addElement('p', scDescriptionTr.firstChild, null, null, new Array(['margin', '0']));
		scDescriptionP.innerHTML	= Language.$('optionPanel_label_description_scaleChildren');
		
		// Add the description to the access key table.
		var akDescriptionTr			= this.addOptionsTableRow(zoomTableAccessKeys, true);
		akDescriptionTr.classList.add('content');
		akDescriptionTr.firstChild.classList.add('left');
		var akDescriptionP			= myGM.addElement('p', akDescriptionTr.firstChild, null, null, new Array(['margin', '0']));
		akDescriptionP.innerHTML	= Language.$('optionPanel_label_description_accessKeys');
		
		// Arrays for zoom factor values and names.
		var opts = new Array();
			opts['value']	= new Array();
			opts['name']	= new Array();
		
		// Load the arrays.
		for(var i = ZoomFunction.minZoom; i <= ZoomFunction.maxZoom; i = i + ZoomFunction.zoomStep) {
			opts.value.push(i);
			opts.name.push(i + '%');
		}
		
		// The view names.
		var viewName	= new Array(
				['world', 'island', 'town'],
				['World', 'Island', 'Town']
			);
		
		// The view names with first letter capital.
		var accessKey	= new Array(
				['ctrl', 'alt', 'shift'],
				['Ctrl', 'Alt', 'Shift']
			);
		
		// Loop over all views.
		for(var i = 0; i < viewName[0].length; i++) {
			// Create the table row for the zoom factor.
			var zoomFactorTr = this.addOptionsTableRow(zoomTableFactor, false);
			
			// Create the zoom factor label.
			var zoomFactorLabel			= myGM.addElement('span', zoomFactorTr.firstChild);
			zoomFactorLabel.innerHTML	= Language.$('optionPanel_label_' + viewName[0][i] + '_zoomFactor');

			// Create the zoom factor select.
			General.addSelect(zoomFactorTr.lastChild, 'zoom' + viewName[1][i], myGM.getValue('zoom_' + viewName[0][i] + 'Factor', 100), opts);
			
			// Create the table row for the zoom factor.
			var scaleChildrenTr = this.addOptionsTableRow(zoomTableScaleChildren, true);
			
			// Add class for checkbox.
			scaleChildrenTr.firstChild.classList.add('left');
			
			// Create checkbox.
			General.addCheckbox(scaleChildrenTr.firstChild, 'zoomScaleChildren' + viewName[1][i], myGM.getValue('zoom_'  + viewName[0][i] + 'ScaleChildren', true), Language.$('optionPanel_label_' + viewName[0][i] + '_scaleChildren'));
			
			// Create the table row for the zoom factor.
			var accessKeyTr = this.addOptionsTableRow(zoomTableAccessKeys, true);
			
			// Add class for checkbox.
			accessKeyTr.firstChild.classList.add('left');
			
			// Create checkbox.
			General.addCheckbox(accessKeyTr.firstChild, 'zoom' + accessKey[1][i] + 'Pressed', myGM.getValue('zoom_'  + accessKey[0][i] + 'Pressed', accessKey[0][i] == 'ctrl'), Language.$('general_' + accessKey[0][i]));
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
			
		// Otherwise.
		} else {
			// Create second cell.
			myGM.addElement('td', tr, null, 'left');
		}

		// Return the table row.
		return tr;
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
		myGM.setValue('module_updateActive', myGM.$('#' + myGM.prefix + 'updateCb').checked);
		myGM.setValue('module_incomeActive', myGM.$('#' + myGM.prefix + 'incomeOnTopCb').checked);
		myGM.setValue('module_urtShortActive', myGM.$('#' + myGM.prefix + 'upkeepReductionCb').checked);
		myGM.setValue('module_zoomActive', myGM.$('#' + myGM.prefix + 'zoomCb').checked);
		myGM.setValue('module_lcMoveActive', myGM.$('#' + myGM.prefix + 'loadingCircleMoveCb').checked);
		myGM.setValue('module_ttAutoActive', myGM.$('#' + myGM.prefix + 'tooltipsAutoCb').checked);
		myGM.setValue('module_hideBirdsActive', myGM.$('#' + myGM.prefix + 'hideBirdsCb').checked);
		
		// Save the update settings.
		myGM.setValue('updater_updateInterval', General.getInt(General.getSelectValue('updateIntervalSelect')));
		
		// Save the zoom function settings.
		myGM.setValue('zoom_worldFactor', General.getInt(General.getSelectValue('zoomWorldSelect')));
		myGM.setValue('zoom_islandFactor', General.getInt(General.getSelectValue('zoomIslandSelect')));
		myGM.setValue('zoom_townFactor', General.getInt(General.getSelectValue('zoomTownSelect')));
		myGM.setValue('zoom_worldScaleChildren', myGM.$('#' + myGM.prefix + 'zoomScaleChildrenWorldCb').checked);
		myGM.setValue('zoom_islandScaleChildren', myGM.$('#' + myGM.prefix + 'zoomScaleChildrenIslandCb').checked);
		myGM.setValue('zoom_townScaleChildren', myGM.$('#' + myGM.prefix + 'zoomScaleChildrenTownCb').checked);
		myGM.setValue('zoom_ctrlPressed', myGM.$('#' + myGM.prefix + 'zoomCtrlPressedCb').checked);
		myGM.setValue('zoom_altPressed', myGM.$('#' + myGM.prefix + 'zoomAltPressedCb').checked);
		myGM.setValue('zoom_shiftPressed', myGM.$('#' + myGM.prefix + 'zoomShiftPressedCb').checked);
		
		// Show success hint.
		General.showTooltip('cityAdvisor', 'confirm', Language.$('general_successful'));
	},
	
	/**
	 * Save the settings (mobile).
	 */
	saveSettingsMobile: function() {
		// Save the module settings.
		myGM.setValue('module_updateActive', myGM.$('#' + myGM.prefix + 'updateCb').checked);
		myGM.setValue('module_incomeActive', myGM.$('#' + myGM.prefix + 'incomeOnTopCb').checked);
		myGM.setValue('module_urtShortActive', myGM.$('#' + myGM.prefix + 'upkeepReductionCb').checked);
		
		// Save the update settings.
		myGM.setValue('updater_updateInterval', General.getInt(General.getSelectValue('updateIntervalSelect')));
		
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
	},
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

		// Zoom.
		factor = this.zoom(factor);
		
		// Add the zoom Buttons.
		this.addZoomButtons(factor);
	},
	
	/**
	 * Add the Buttons for zooming to the view.
	 */
	addZoomButtons: function(factor) {
		// Get the help element in the GF toolbar
		gfToolbar	= myGM.$('#GF_toolbar');
		
		// Create the zoom buttons.
		var zoomWrapper	= myGM.addElement('div', gfToolbar, 'zoomWrapper');
		var zoomIn		= myGM.addElement('div', zoomWrapper, 'zoomIn', 'maximizeImg');
		var zoomFactor	= myGM.addElement('div', zoomWrapper, 'zoomFactor');
		var zoomOut		= myGM.addElement('div', zoomWrapper, 'zoomOut', 'minimizeImg');
		
		// Show the zoom factor.
		zoomFactor.innerHTML = factor + '%';
		
		// Add the event listener.
		zoomIn.addEventListener('click', EventHandling.zoomFunction.zoomIn, false);
		zoomOut.addEventListener('click', EventHandling.zoomFunction.zoomOut, false);
		
		// Hide the zoom in button if the max zoom is reached.
		if(factor >= this.maxZoom) {
			zoomIn.classList.add('invisible');
		}
		
		// Hide the zoom out button if the min zoom is reached.
		if(factor <= this.minZoom) {
			zoomOut.classList.add('invisible');
		}

		// Add the styles.
		myGM.addStyle(
				"#" + myGM.prefix + "zoomWrapper	{ position: absolute; top: 2px; right: 0px; width: 72px; -moz-transform: scale(0.75); msTransform: scale(0.75); -o-transform: scale(0.75); -webkit-transform: scale(0.75); transform: scale(0.75); } \
				 #" + myGM.prefix + "zoomIn			{ position: absolute; } \
				 #" + myGM.prefix + "zoomFactor		{ position: absolute; left: 20px; width: 35px; text-align: center; } \
				 #" + myGM.prefix + "zoomOut		{ position: absolute; left: 58px; }"
			);
	},
	
	/**
	 * Changes the mouse wheel listener so that it could be used with access keys.
	 */
	changeMouseWheelListener: function() {
		// Get the scrollDiv depending on the view.
		if(View.name == 'world') {
			scrollDiv = myGM.$('#map1');
		} else {
			scrollDiv = myGM.$('#worldmap');
		}

		// Remove the old mouse wheel listener.
		win.Event.removeListener(scrollDiv, 'DOMMouseScroll');
		win.Event.removeListener(scrollDiv, 'mousewheel');
		
		// Add the new mouse wheel listener.
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
		
		// Update the zoom factor which is shown to the user.
		var zoomFactorDiv = myGM.$('#' + myGM.prefix + 'zoomFactor');
		
		if(zoomFactorDiv) {
			zoomFactorDiv.innerHTML = factor + '%';
		}

		// Get the factor as normal number, not as percentage.
		factorNew = factor / 100.0;
		
		// Get the game scaling factor depending on the view.
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
				"#scrollcover { -moz-transform: scale(" + factor + ") translate(" + translateXY + "%, " + translateXY + "%); msTransform: scale(" + factor + ") translate(" + translateXY + "%, " + translateXY + "%); -o-transform: scale(" + factor + ") translate(" + translateXY + "%, " + translateXY + "%); -webkit-transform: scale(" + factor + ") translate(" + translateXY + "%, " + translateXY + "%); transform: scale(" + factor + ") translate(" + translateXY + "%, " + translateXY + "%); height: " + heightWidth + "% !important; width: " + heightWidth + "% !important; }",
				'zoomWorld', true
			);
		
		// Get the map.
		map = myGM.$('#map1');
		
		// Set the new offset.
		newWmTop		= 0;
		newWmLeft		= 0;
		
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
						".wonder, .tradegood, .cities" + factor < 1 ? ", .ownerState" : "" + "	{ -moz-transform: scale(" + 1 / factor + "); msTransform: scale(" + 1 / factor + "); -o-transform: scale(" + 1 / factor + "); -webkit-transform: scale(" + 1 / factor + "); transform: scale(" + 1 / factor + "); } \
						 .cities																{ bottom: 10px !important; }",
						'scaleChildren', true
					);
			  break;
			
			// Island view.
			case 'island':
				myGM.addStyle(
						".scroll_img	{ -moz-transform: scale(" + 1 / factor + "); msTransform: scale(" + 1 / factor + "); -o-transform: scale(" + 1 / factor + "); -webkit-transform: scale(" + 1 / factor + "); transform: scale(" + 1 / factor + "); }",
						'scaleChildren', true
					);
			  break;
			
			// Town view.
			case 'town':
				myGM.addStyle(
						".timetofinish	{ -moz-transform: scale(" + 1 / factor + "); msTransform: scale(" + 1 / factor + "); -o-transform: scale(" + 1 / factor + "); -webkit-transform: scale(" + 1 / factor + "); transform: scale(" + 1 / factor + "); }",
						'scaleChildren', true
					);
			  break;
			
			// Default: do nothing.
			default:
				return;
			  break;
		}
	},
};

/**
 * The main function of the script.
 */
function main() {
	// Init the myGM functions.
	myGM.init();
	
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