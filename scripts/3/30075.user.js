// ==UserScript==
// @name		Lootrank for Character
// @namespace	www.lootrank.com
// @description	Merge Character information from Armory with Lootrank
// @include	http://www.lootrank.com/wow/rank.asp*
// @include	http://maxdps.com/*
// @include	http://www.maxdps.com/*
// @include	http://www.emmerald.net/*
// @include	http://emmerald.net/*
// @require	http://yui.yahooapis.com/2.5.2/build/utilities/utilities.js
// @require	http://yui.yahooapis.com/2.5.2/build/container/container-min.js
// @require	http://yui.yahooapis.com/2.5.2/build/json/json-min.js
// @require	http://yui.yahooapis.com/2.5.2/build/tabview/tabview-min.js
// @resource	skinCss	http://yui.yahooapis.com/2.5.2/build/assets/skins/sam/skin.css
// ==/UserScript==

// Do not run the script if it is being loaded in a iframe.  Mostly this is to stop it loading on ad iframes in these pages.
if (top != window) {
	GM_log('Detected that the script is being loaded in an iframe, exiting');
	return;
}

// CSS Resources
var CSSResources = ['skinCss'];

// Current URL
var currentURL = document.location.href;

// Localisation
var LOC = {
	newCharacterName: 'New Character',
	manageCharacters: 'Manage Armory Characters',
	mainPanelTitle: 'Character Information',
	addCharacter: 'Add Character',
	linkURLToCharacter: 'Link URL to Character',
	deleteCharacter: 'Delete Character',
	deleteCharacterConfirm: 'Delete this character?',
	formFieldMessages: { 'required' : 'This field is required', 'invalid' : 'This field is invalid', 'valid' : 'This field is valid' },
	region: {
		options : [ 'Europe', 'US & Oceanic', 'Korea', 'China', 'Taiwan' ],
		values : [ 'eu.wowarmory.com', 'www.wowarmory.com', 'kr.wowarmory.com', 'cn.wowarmory.com', 'tw.wowarmory.com' ],
	},
	
};

// Store the names of all the GM variables we use so that we can change easily if needed
var GMVARS = {
	realmList: 'RealmList',
	realmListLastUpdate: 'RealmListLastUpdate',
	characterData: 'CharacterData',
	characterDataLastUpdate: 'CharacterDataLastUpdate',
};

/**
 * Main LRFC object for layout and style.
 */
var LRFC = {	
	// Character Details Overlay Panel
	// zIndex must be so ridiculously high due to the zIndex of the menus on maxdps
	oUIPanel: new YAHOO.widget.Panel('LRFCUI', { visible: false, close: true, width: '600px', xy: [4, 4], zIndex: 2000 }), 
	
	// Realm list data that is cached
	oRealms: {
		data: [ 'Terenas' ],
		current: false,
		lastUpdateVar: GMVARS.realmListLastUpdate,
		dataVar: GMVARS.realmList,
		lengthToCache: (1000*60*60*24*7), // 7 days
		expiredFunction: function() {
			// Retrieve the realm list
			var url = 'http://www.worldofwarcraft.com/realmstatus/status.xml';
			GM_log('Async query for realms: ' + url);
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: function(response) {
					GM_log('Async query for realms: complete');
					//GM_log("responseText: " + response.responseText);

					GM_log('Realm parsing');
					var dom;
					try {
						var parser = new DOMParser();
						dom = parser.parseFromString(response.responseText, "text/xml");
					} catch(e) {GM_log('Realm parsing error: ' + e.message)}

					if (dom) {
						GM_log('Realm parsing: complete');
						var items = dom.getElementsByTagName("r");
						if (items.length > 0) {
							LRFC.oRealms.data = [];
						}
						for (var i = 0; i < items.length; i++) {
							LRFC.oRealms.data.push(items[i].getAttribute('n'));
						}
						GM_log('Realm cache');
						// Cache the realms
						CACHE.set(LRFC.oRealms);
						GM_log('Realm cache: complete with ' + LRFC.oRealms.data.length + ' realms');
					}
					
					// Create the UI now that the required information is available
					LRFC.buildUIComponents();
				},
			});
		},
		notExpiredFunction: function() {
			// Create the UI
			LRFC.buildUIComponents();
		},
	},
	   
	/**
	* Init the LRFC by retrieving data from stored variables, activating for a character if already saved for this url, and building the UI
	*/
	init: function() {
		GM_log('Initialisation');

		// Retrieve and cache character data
		// The UI needs the synchronous data right away
		GM_log('CACHE.get: characters');
		CACHE.get(C.oCharacters);
		
		// Retrieve and cache realm data
		GM_log('CACHE.get: realms');
		CACHE.get(LRFC.oRealms);
		
		// Attempt to apply Character data
		C.applyCharacter();
	},
	
	/**
	* Create the sub-components of the UI
	*/
	buildUIComponents: function() {
		GM_log('About to build the UI');
		this.buildUI();
		this.modifyHTML();
	},

	/**
	* Create the UI workspace as an overlay
	*/
	buildUI: function() {
		GM_log('buildUI');
		GM_addStyle(inputexCss);
		for (var i = 0; i < CSSResources.length; i++) {
			GM_addStyle(GM_getResourceText(CSSResources[i]));
		}
		
		// Create a parent container for all of the overlay
		LRFC.appendToBody(inputEx.cn('div',{id:'LRFCUI_main'}));
		YAHOO.util.Event.onAvailable('LRFCUI_main', function() {
			YAHOO.util.Dom.addClass('LRFCUI_main','yui-skin-sam');
			// Build overlay panel
			LRFC.oUIPanel.setHeader('<div>' + LOC.mainPanelTitle + '</div>');
			LRFC.oUIPanel.setBody(inputEx.cn('div',{id:'CD'}));
			LRFC.oUIPanel.setFooter(inputEx.cn('div',{id:'CDActions'}));
			LRFC.oUIPanel.render('LRFCUI_main');
			YAHOO.util.Event.onAvailable('CD', function() {
				C.initCharacterTabs();
			});
		});
		
		// for the overlay
		LRFC.buildUICss();

		GM_log('buildUI: complete');
	},
	
	/**
	* Put all the document.body manipulation in one place
	*/
	appendToBody: function(element) {
		document.body.appendChild(element);
	},
	
	/**
	* Different css in order to match the site we're on
	*/
	buildUICss: function() {
		GM_addStyle('.yui-skin-sam .yui-panel .hd{font-family:arial,helvetica,clean,sans-serif;background-color:#F2F2F2;}');
		GM_addStyle('.yui-skin-sam .yui-panel .ft{font-family:arial,helvetica,clean,sans-serif;}');
		GM_addStyle('.yui-skin-sam .yui-panel .ft a{margin: 5px;}');
		GM_addStyle('.inputEx-Group-label{color:#000000;}');
		// FIXME: This currently breaks any cellspacing or cellpadding in the tables and is a result of changing the table border in order to get the row border highlight
		GM_addStyle('.LRFC-notableborder{border-collapse: collapse; border: 0px}');
		GM_addStyle('.LRFC-highlight{border-width: 3px;border-style: solid;border-color: #243356;}');
		GM_addStyle('.LRFC-hide{display: none;}');
	},


	/**
	* Add all required elements to the original HTML
	*/
	modifyHTML: function() {
		GM_log('modifyHTML');
		// Create a small overlay panel with the main UI link
		LRFC.appendToBody(inputEx.cn('div',{id:'LRFCUI_launch'}));
		YAHOO.util.Event.onAvailable('LRFCUI_launch', function() {
			YAHOO.util.Dom.addClass('LRFCUI_launch','yui-skin-sam');
			// Build overlay panel
			var launchPanel = new YAHOO.widget.Panel('LRFCUILaunch', { visible: true, close: false, xy: [2, 2] });
			var newElement = inputEx.cn('a', {href:'javascript:;'},{},LOC.manageCharacters);
			launchPanel.setHeader(newElement);
			launchPanel.render('LRFCUI_launch');
			// Attach the function to the click event on the link
			YAHOO.util.Event.addListener(newElement, 'click', LRFC.onShowLRFCUI);
		});
		
		// maxdps loads the item lists via ajax, so attach to the event for the element so that we update character caches and highlight items
		YAHOO.util.Event.onAvailable('ajaxcontentarea', function() {
			// FIXME: Not sure why this does not work as expected, but with the YAHOO...addListener the event only fires on the first page load
			//YAHOO.util.Event.addListener('ajaxcontentarea', 'DOMSubtreeModified', alert('Hello'));
			//document.addEventListener("DOMSubtreeModified", function(){C.applyCharacter()}, false);
			document.addEventListener("DOMNodeInserted", function(){C.applyCharacter()}, false);
		});
		
		GM_log('modifyHTML: complete');
	},

	/**
	* Show Character Details UI
	*/
	onShowLRFCUI: function() {
		LRFC.oUIPanel.show();
	},
	
};


/**
*  Object for character data, display elements, etc.
*/
var C = {
	// Character Data  array:
	// [{
	//	id: <timestamp when created>,
	//	label: <charname>, 
	//	form: <form object>,
	//	_formValues: <form values hash>,
	//	urls: array of urls,
	//	_armoryCache: <cache of the armory data>
	// }]
	
	// Character data that is cached
	oCharacters: {
		data: [],
		current: false,
		lastUpdateVar: GMVARS.characterDataLastUpdate,
		dataVar: GMVARS.characterData,
		lengthToCache: (1000*60*120), // 120 minutes
		expiredFunction: function() {
			// Request the character data for each character
			for (var i = 0; i < C.oCharacters.data.length; i++) {
				var formValues = C.oCharacters.data[i]._formValues;
				var url = 'http://' + formValues.region + '/character-sheet.xml?r=' + formValues.realm + '&n=' + formValues.character
				GM_log("Async query for character: " + url);
				GM_xmlhttpRequest({
				    method: 'GET',
				    url: url,
				    onload: C.cacheExpiredCallback.bind({},C.oCharacters.data[i]),
				});
			}
		},
		notExpiredFunction: function(){C.applyCharacter();},
	},
	
	cacheExpiredCallback: function(oCharacter,response) {
		GM_log('Async query for character: complete');
		//GM_log('responseText: ' + response.responseText);

		GM_log('Character parsing');
		var dom;
		try {
			var parser = new DOMParser();
			dom = parser.parseFromString(response.responseText, "text/xml");
		} catch(e) {GM_log('Character parsing error: ' + e.message)}

		if (dom) {
			GM_log('Character parsing: complete');
			// Handle errors from the armory
			var ci = dom.getElementsByTagName('characterInfo');
			if(ci[0] && ci[0].getAttribute('errCode')) {
				GM_log('Error from armory: ' + ci.getAttribute('errCode'));
				return;
			}
			
			// Get all the item ids from the wow armory page
			var items = dom.getElementsByTagName("item");
			GM_log('Character items found: ' + items.length);
			// store the item ids from character sheet
			oCharacter._armoryCache = [];
			for (var i = 0; i < items.length; i++) {
				oCharacter._armoryCache.push(items[i].getAttribute("id"));
			}
			
			GM_log('Character cache');
			// Cache the characters
			CACHE.set(C.oCharacters);
			GM_log('Character cache: complete for ' + oCharacter.label);
		}
		C.applyCharacter();
	},
	
	/**
	* Highlight items for the character, or the character for the currentURL if no character was provided
	*/
	applyCharacter: function() {
		GM_log("applyCharacter");
		var YDom = YAHOO.util.Dom;
		var lpattern = new RegExp(/(?:http:\/\/)?(?:www\.)?wowhead\.com\/\?(item|quest|spell)=(\d+)/); // match for wowhead links 1=type 2=id
		var oCharacter = C.getCharacterByURL(currentURL);
		
		if(oCharacter.label == undefined) {
			GM_log('No character data for this url');
		} else if(oCharacter._armoryCache == undefined) {
			GM_log('No cached data for ' + oCharacter.label + ': cannot apply yet');
		} else {
			if (oCharacter.urls && oCharacter.urls.length > 0) {
				GM_log('Found character: ' + oCharacter.label + ' for this url: ' + currentURL);
				// Clean up any display that we may have done before on tables and rows
				YDom.getElementsBy(function(el) {
					YDom.removeClass(el,'LRFC-notableborder');
				},'table');
				YDom.getElementsBy(function(el) {
					YDom.removeClass(el,'LRFC-hide');
					YDom.removeClass(el,'LRFC-highlight');
				},'tr');
				
				// Apply highlight for the item rows
				// Keep track of the last row in each table (this is a bit messy)
				var lastRows = [];
				var previousRow = null;
				var previousTable = null;
				YDom.getElementsBy(function(el) {
					var match = lpattern.exec(el.href);
					if(match && oCharacter._armoryCache.contains(match[2])) {
						GM_log('Found item: ' + match[2]);
						if(match[1] == 'item') {
							var table = YDom.getAncestorByTagName(el,'table');
							// We cannot set a border on the table row if the table has borders of 0 or none
							// Remove the border=0 from the table
							table.removeAttribute('border');
							// Set the table border to be a CSS class with no border
							YDom.addClass(table,'LRFC-notableborder');
							var row = YDom.getAncestorByTagName(el,'tr')
							// Set the row border to be a CSS class to highlight it
							YDom.addClass(row,'LRFC-highlight');

							if (table != previousTable) {
								if(previousRow != null) {
									lastRows.push(previousRow);
								}
							}
							previousRow = row;
							previousTable = table;
						}
					} else {
						//GM_log('Did not find any items');
					}
				},'a');
				
				// For each item element that was found hide extra rows in the table
				// loop through each table, then starting at the last row count for a few then start hiding
				var hideAfter = 3; // will show 3 additional items
				for(var i = 0 ; i < lastRows.length ; i++) {
					var rowCount = 0;
					var row = YDom.getNextSibling(lastRows[i]);
					while (row != null) {
						if (rowCount >= hideAfter) {
							// hide row
							YDom.addClass(row,'LRFC-hide');
						}
						rowCount++;
						row = YDom.getNextSibling(row);
					}
				}
				
				// Hide the UI
				LRFC.oUIPanel.hide();
			}
			GM_log("applyCharacter: complete");
		}
	},
	
	// Character Tab View
	oCharacterTabView: null,

	/**
	* Get a character by id
	*/
	getCharacterByID: function(id) {
		GM_log('getCharacterByID');
		var oCharacter = {};
		if(!oCharacter.urls) {
			oCharacter.urls = [];
		}
		if (C.oCharacters.data) {
			for(var i = 0 ; i < C.oCharacters.data.length ; i++) {
				oCharacter = C.oCharacters.data[i];
				if(oCharacter.id && oCharacter.id == id) {
					if(!oCharacter.urls) {
						oCharacter.urls = [];
					}
					GM_log('Found character: ' + oCharacter.label + ' for id: ' + id);
					GM_log('getCharacterByID: complete');
					return oCharacter;
				}
			}
		}
		GM_log('getCharacterByID: complete');
		return {};
	},
	
	/**
	* Get a character by linked url
	*/
	getCharacterByURL: function(url) {
		GM_log('getCharacterByURL');
		var oCharacter = {};
		for(var i = 0 ; i < C.oCharacters.data.length ; i++) {
			oCharacter = C.oCharacters.data[i];
			if(oCharacter.urls) {
				for(var j = 0 ; j < oCharacter.urls.length ; j++) {
					if(oCharacter.urls[j] == currentURL) {
						GM_log('Found character: ' + oCharacter.label + ' for url: ' + url);
						GM_log('getCharacterByURL: complete');
						return oCharacter;
					}
				}
			}
		}
		GM_log('getCharacterByURL: complete');
		return {};
	},
	
	/**
	* Get a tab by id
	*/
	getTabByID: function(id) {
		var tabs = C.oCharacterTabView.get('tabs');
		if (tabs) {
			for(var i = 0 ; i < tabs.length ; i++) {
				if(tabs[i].get('id') == id) {
					GM_log('Looked up tab: ' + id);
					return tabs[i];
				}
			}
		}
	},
	
	/**
	* Add a Character Tab
	*/
	addCharacterTab: function(oCharacter) {
		GM_log('addCharacterTab');
		if (oCharacter == null) {
			return;
		}
		GM_log('Adding tab for character: ' + oCharacter.label + ' id: ' + oCharacter.id);
		// If we are on a URL that is linked to a character then that character's tab should be active
		// If it is a new character, then the tab should be active
		var activeTab = false;
		if (oCharacter == C.getCharacterByURL(currentURL)) {
			activeTab = true;
		} else if (oCharacter.label == LOC.newCharacterName) {
			activeTab = true;
		}
		var tab = new YAHOO.widget.Tab({
			label: oCharacter.label,
			content: '<div id="DetailsForm-' + oCharacter.id + '"></div><div id="URLList-' + oCharacter.id + '"></div>',
			active: activeTab,
		});
		tab.set('id',oCharacter.id); // Save the character id into a tab attribute
		C.oCharacterTabView.addTab(tab);
		
		YAHOO.util.Event.onAvailable('DetailsForm-' + oCharacter.id, function() {
			// Add the Character Details form to the tab
			var form = new inputEx.Form({parentEl: 'DetailsForm-' + oCharacter.id, formName: 'DetailsFormName-' + oCharacter.id, 
				buttons: [],
				fields: [
					{ label: 'Region', type : 'select', inputParams : { name : 'region', required : true, messages : LOC.formFieldMessages, selectValues : LOC.region.values, selectOptions : LOC.region.options } },
					{ label: 'Realm', type : 'select', inputParams : { name : 'realm', required : true, messages : LOC.formFieldMessages, selectValues : LRFC.oRealms.data, selectOptions : LRFC.oRealms.data } },
					{ label: 'Character', type : 'string', inputParams : { name : 'character', required : true, messages : LOC.formFieldMessages, size : 20 } },
					{ label: '', type : 'hidden', inputParams : { name : 'id', value: oCharacter.id } },
				]
			});
			
			// Set character data into the form
			form.setValue(oCharacter._formValues);
			
			// Updated event sent by the character form
			form.updatedEvt.subscribe(C.onCharacterDetailsUpdated.bind({},oCharacter,tab), this, true);
		});
		GM_log('addCharacterTab: complete');
	},
	
	/**
	* Called when the button to link the URL to the character is clicked
	*/
	onLinkURLToCharacter: function(e) {
		var id = C.oCharacterTabView.get('activeTab').get('id');
		GM_log('Linking character: ' + id + ' to URL: ' + currentURL);
		
		// Loop through all characters and urls and remove this URL if it exists
		if (C.oCharacters && C.oCharacters.data) {
			for(var i = 0 ; i < C.oCharacters.data.length ; i++) {
				var oCharacter = C.oCharacters.data[i];
				if (oCharacter.urls == undefined) {
					oCharacter.urls = [];
					GM_log('Character has no urls');
				}
				for(var j = 0 ; j < oCharacter.urls.length ; j++) {
					if (oCharacter.urls[j] == currentURL) {
						// remove the url
						GM_log('removing ' + j);
						oCharacter.urls.remove(j);
					}
				}
				// Add the url to the new Character
				if(oCharacter.id == id) {
					oCharacter.urls.push(currentURL);
					GM_log('Character is linked to ' + oCharacter.urls.length + ' urls');
				}
			}
		} else {
			GM_log('No character data found: how odd');
		}
		GM_log('Linking character: complete');

		// Cache the characters
		CACHE.set(C.oCharacters);

		// If the user just linked the character to the current URL, we may as well apply the character data	
		// If the Link to URL link is activated before the form is exited and the form updated event has fired, we will get 'old' data for the character
		// This is most annoying when the name has not been saved yet because the character lookup will not work.
		// Insert a short delay to let the other events propagate before  applying the character data
		GM_log('CACHE.get: characters');
		setTimeout(function() { CACHE.get(C.oCharacters); }, 200);
	},
	
	/**
	* When the character information is changed in the form, save it.
	*/
	onCharacterDetailsUpdated: function(oCharacter,tab,e,params) {
		GM_log('onCharacterDetailsUpdated');
		var oCharacterDetails = params[0]; // this is the form data
		
		if (oCharacterDetails && oCharacterDetails.character && oCharacterDetails.character.length > 0) {
			oCharacter.label = oCharacterDetails.character;
			oCharacter._formValues = oCharacterDetails;

			// Change the tab label
			tab.set('label',oCharacterDetails.character);

			// Cache the characters
			CACHE.set(C.oCharacters);
			
			// force cache to update
			C.oCharacters.current = false;
		}
		GM_Log('onCharacterDetailsUpdated: complete');
	},
	
	/**
	* Create character tabs from character data
	*/
	initCharacterTabs: function() {
		GM_log('initCharacterTabs');
		C.oCharacterTabView = new YAHOO.widget.TabView();
		if (C.oCharacters.data) {
			for(var i = 0 ; i < C.oCharacters.data.length ; i++) {
				C.addCharacterTab(C.oCharacters.data[i]);
			}
		}
		C.oCharacterTabView.appendTo('CD');
		
		YAHOO.util.Event.onAvailable('CDActions', function() {
			var ele = inputEx.cn('a', {href:'javascript:;'},{},LOC.addCharacter);
			YAHOO.util.Event.addListener(ele, 'click', C.onAddCharacter);
			YAHOO.util.Dom.get('CDActions').appendChild(ele);
			
			ele = inputEx.cn('a', {href:'javascript:;'},{},LOC.linkURLToCharacter);
			YAHOO.util.Event.addListener(ele, 'mouseup', C.onLinkURLToCharacter);
			YAHOO.util.Dom.get('CDActions').appendChild(ele);

			ele = inputEx.cn('a', {href:'javascript:;'},{},LOC.deleteCharacter);
			YAHOO.util.Event.addListener(ele, 'click', C.onDeleteCharacter);
			YAHOO.util.Dom.get('CDActions').appendChild(ele);
		});

		GM_log('initCharacterTabs: complete');
	},
	
	/**
	* Add a character
	*/
	onAddCharacter: function(e, obj) {
		var oCharacter = obj;
		var oPreviousCharacter = {}
		if(C.oCharacterTabView.get('activeTab')) {
			oPreviousCharacter = C.getCharacterByID(C.oCharacterTabView.get('activeTab').get('id'))
		}
		if(oCharacter == null || oCharacter.label == null || oCharacter.label.length == 0) {
			oCharacter = {};
			oCharacter.id = Date.now(); // only works in Firefox
			oCharacter.label = LOC.newCharacterName;
			oCharacter._formValues = {};
			oCharacter._formValues.character = oCharacter.label;
			if (oPreviousCharacter._formValues && oPreviousCharacter._formValues.region) {
				oCharacter._formValues.region = oPreviousCharacter._formValues.region;
			}
			if (oPreviousCharacter._formValues && oPreviousCharacter._formValues.realm) {
				oCharacter._formValues.realm = oPreviousCharacter._formValues.realm;
			}
			C.oCharacters.data.push(oCharacter);
		}
		C.addCharacterTab(oCharacter);
	},
	
	/**
	* Delete a character and all related data
	*/
	onDeleteCharacter: function(e, obj) {
		if(confirm(LOC.deleteCharacterConfirm)) {
			var id = C.oCharacterTabView.get('activeTab').get('id');
			GM_log('Deleting character: ' + id);
			var oCharacter = C.getCharacterByID(id);
			// Delete the character from the character array
			for(var j = 0 ; j < C.oCharacters.data.length ; j++) {
				if (C.oCharacters.data[j].id == oCharacter.id) {
					GM_log('Removing character object at array position: ' + j);
					// remove the character
					C.oCharacters.data.remove(j);
				}
			}
			// Remove the tab
			GM_log('Removing tab with id: ' + id);
			C.oCharacterTabView.removeTab(C.getTabByID(id));
			
			// Cache the characters
			CACHE.set(C.oCharacters);
		}
	},
};

/**
* Caching implementation
* Send in an object that will reference the needed variables and have containers for the return values
* oCached = {
*   lengthToCache = <number of seconds to cache>,
*   lastUpdateVar = <GMVariableName for last update>,
*   lastUpdate = Date object of last update,
*   dataVar = <GMVariableName for data>,
*   data = <object>,
*   expiredFunction = <function>,
*   notExpiredFunction = <function>,
* }
*/
var CACHE = {
	get: function(oCached) {
		GM_log('CACHE: get');
		oCached.lastUpdate = new Date();
		if(oCached.expiredFunction == undefined) {
			oCached.expiredFunction = function() {};
		}
		if(oCached.notExpiredFunction == undefined) {
			oCached.notExpiredFunction = function() {};
		}
		// Get the timestamp of the last save of this cached data
		var lastUpdate = GM_getValue(oCached.lastUpdateVar);
		if(isNaN(Date.parse(lastUpdate))) {
			GM_log('Last update invalid, resetting.');
			CACHE.resetLastUpdate(oCached);
		} else if (!Date.parse(lastUpdate)) {
			GM_log('Last update invalid, resetting.');
			CACHE.resetLastUpdate(oCached);
		} else {
			oCached.lastUpdate.setTime(Date.parse(lastUpdate));
		}

		try {
			var data = YAHOO.lang.JSON.parse(GM_getValue(oCached.dataVar));
			oCached.data = data;
			//GM_log('Retrieved cached data: ' + oCached.data.length + ' items');
		} catch(e) {
			GM_log('Did not get cached data. Error message: ' + e.message);
			CACHE.resetLastUpdate(oCached);
		}
		
		GM_log('Cached data last update: ' + oCached.lastUpdate.toUTCString());
		//GM_log('Cached data last update timestamp: ' + oCached.lastUpdate.getTime());
		// Note: Date.now() only works in Firefox
		var cacheExpires = new Date();
		cacheExpires.setTime(oCached.lastUpdate.getTime() + oCached.lengthToCache);
		GM_log('Cache expires: ' + cacheExpires.toUTCString());
		//GM_log('Cache expires timestamp: ' + cacheExpires.getTime());
		if(cacheExpires.getTime() <= Date.now()) {
			GM_log('Cached data expired');
			oCached.expiredFunction();
		} else if (!oCached.current) {
			GM_log('Cache not current');
			oCached.expiredFunction();
		} else {
			oCached.current = true;
			GM_log('Using cached data');
			oCached.notExpiredFunction();
		}
		GM_log('CACHE: get : complete');
		return oCached;
	},

	set: function(oCached) {
		GM_log('CACHE: set');
		oCached.lastUpdate = new Date();
		GM_log('Cache updated: ' + oCached.lastUpdate.toUTCString());
		GM_setValue(oCached.lastUpdateVar, oCached.lastUpdate.toUTCString());
		GM_setValue(oCached.dataVar, YAHOO.lang.JSON.stringify(oCached.data));
		GM_log('CACHE: set : complete');
	},
	
	resetLastUpdate: function(oCached) {
		// reset to 30 days before now
		// Date.now() only works in Firefox
		oCached.lastUpdate.setTime(Date.now() - (1000*60*60*24*30));
	},
};

/**
* Modify the array implementation so that we have a usable splice-type operation
* Array Remove - By John Resig (MIT Licensed)
*/
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};
/**
* Modify the array implementation so that we can see if something exists in the array
* Returns true if the object exists, false otherwise
*/
Array.prototype.contains = function(val) {
	for (var i in this) { if (this[i] === val) return true; }
	return false;
};

/**
* Modify the function implementation so that we have a way to pass arguments into the xmlhttprequest callbacks
*/
Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

/**
* For now the inputex version I am using is coded here, because there is not a downloadable one that is a stable version. :(
* The right thing to do is download this during greasemonkey script install.
* This is for version 0.1.0
*/
// @require	http://code.google.com/p/inputex/source/browse/trunk/build/inputex-min.js
// @resource	inputexCss	http://code.google.com/p/inputex/source/browse/trunk/build/inputex-min.css
var inputexCss = "div.inputEx-Field input,select,textarea{border:1px solid #B5B8C8;}div.inputEx-invalid input,div.inputEx-invalid select,div.inputEx-invalid textarea{border:1px solid #DD7870;}div.inputEx-required input,div.inputEx-required select,div.inputEx-required textarea{border:1px solid #DD7870;}div.inputEx-empty input,div.inputEx-empty select,div.inputEx-empty textarea{border:1px solid #B5B8C8;}div.inputEx-focused input,div.inputEx-focused select,div.inputEx-focused textarea{border:1px solid #6E9DC9;}img.inputEx-Field-stateIcon{width:16px;height:16px;background:transparent url('') no-repeat scroll 0 0;visibility:hidden;cursor:default;margin:2px 0 0 4px;vertical-align:top;}div.inputEx-valid img.inputEx-Field-stateIcon{background-image:url('../images/tick.gif');visibility:visible;}div.inputEx-invalid img.inputEx-Field-stateIcon{background-image:url('../images/exclamation.gif');visibility:visible;}div.inputEx-required img.inputEx-Field-stateIcon{background-image:url('../images/cancel.gif');visibility:visible;}div.inputEx-tooltip-exclamation{background-image:url('../images/exclamation.gif');width:16px;height:16px;margin-right:4px;float:left;}div.inputEx-tooltip-required{background-image:url('../images/cancel.gif');width:16px;height:16px;margin-right:4px;float:left;}div.inputEx-tooltip-validated{background-image:url('../images/tick.gif');width:16px;height:16px;margin-right:4px;float:left;}div.inputEx-ColorField{height:16px;width:150px;border:1px solid #B5B8C8;margin-left:0;cursor:pointer;}.inputEx-ColorField-popup{z-index:999;position:absolute;border:1px solid #B5B8C8;padding:5px;margin:10px;background:#fff;}.inputEx-ColorField-popup .hd{padding:5px;}.inputEx-ColorField-popup .bd{padding:5px;}.inputEx-ColorField-popup .ft{padding:5px;}div.inputEx-UrlField img{vertical-align:middle;visibility:hidden;width:16px;height:16px;margin:0 2px 3px 0;}img.inputEx-ListField-addButton{background:transparent url(../images/add.png) no-repeat scroll 0;width:16px;height:16px;cursor:pointer;}img.inputEx-ListField-delButton{background:transparent url(../images/delete.png) no-repeat scroll 0;width:16px;height:16px;float:left;cursor:pointer;}div.inputEx-ListField-Arrow{width:16px;height:16px;float:left;cursor:pointer;}div.inputEx-ListField-ArrowUp{background:transparent url(../images/bullet_arrow_up.png) no-repeat scroll 0;}div.inputEx-ListField-ArrowDown{background:transparent url(../images/bullet_arrow_down.png) no-repeat scroll 0;}td.inputEx-Group-label{padding:3px;vertical-align:top;}table.inputEx-Group-Options{margin-left:20px;}div.inputEx-Group-Options-Label{cursor:pointer;}div.inputEx-Group-Options-Label img{width:14px;height:14px;background-image:url(../images/sprite-menu.gif);background-color:transparent;background-repeat:no-repeat;background-attachment:scroll;}div.inputEx-Group-Options-Label-Collapsed img{background-position:-8px -315px;}div.inputEx-Group-Options-Label-Collapsed:hover img{background-position:-8px -395px;}div.inputEx-Group-Options-Label-Expanded img{background-position:-8px 4px;}div.inputEx-Group-Options-Label-Expanded:hover img{background-position:-8px -76px;}label.inputExForm-checkbox-rightLabel{margin-left:4px;}div.inputEx-Form-Mask{height:275px;left:0;position:absolute;top:0;width:180px;}div.inputEx-Form-Mask div{background-color:#FFF;height:100%;left:0;opacity:.8;position:absolute;top:0;width:100%;}div.inputEx-Form-Mask span{color:#666;}div.inputEx-InPlaceEdit-formattedContainer{cursor:text;}div.inputEx-InPlaceEdit-formattedContainer:hover{background-color:#ff9;}div.inputEx-AutoComplete div.inputEx-AutoComplete-List{width:300px;position:absolute;background-color:#ccc;opacity:.7;cursor:pointer;}div.inputEx-AutoComplete div.inputEx-AutoComplete-List div.inputEx-AutoComplete-Item{padding:5px;border:1px solid #CCC;}div.inputEx-AutoComplete div.inputEx-AutoComplete-List div.inputEx-AutoComplete-ItemHovered{background-color:#4173CC;}";
var inputEx={spacerUrl:"images/space.gif",stateEmpty:"empty",stateRequired:"required",stateValid:"valid",stateInvalid:"invalid",messages:{required:"This field is required",invalid:"This field is invalid",valid:"This field is valid"},regexps:{email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,ipv4:/^(?:1\d?\d?|2(?:[0-4]\d?|[6789]|5[0-5]?)?|[3-9]\d?|0)(?:\.(?:1\d?\d?|2(?:[0-4]\d?|[6789]|5[0-5]?)?|[3-9]\d?|0)){3}$/,url:/^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/i,password:/^[0-9a-zA-Z\x20-\x7E]*$/},typeClasses:{},registerType:function(A,B){if(typeof A!="string"){throw new Error("inputEx.registerType: first argument must be a string")}if(typeof B!="function"){throw new Error("inputEx.registerType: second argument must be a function")}this.typeClasses[A]=B},getFieldClass:function(A){if(typeof this.typeClasses[A]=="function"){return this.typeClasses[A]}return null},getType:function(A){for(var B in this.typeClasses){if(this.typeClasses.hasOwnProperty(B)){if(this.typeClasses[B]==A){return B}}}return null},buildField:function(A){var B=null;if(A.type){B=this.getFieldClass(A.type);if(B===null){B=inputEx.StringField}}else{B=A.fieldClass?A.fieldClass:inputEx.StringField}var C=new B(A.inputParams);return C},sn:function(D,C,A){if(!D){return }if(C){for(var B in C){var F=C[B];if(typeof (F)=="function"){continue}if(B=="className"){B="class";D.className=F}if(F!==D.getAttribute(B)){try{if(F===false){D.removeAttribute(B)}else{D.setAttribute(B,F)}}catch(E){}}}}if(A){for(var B in A){if(typeof (A[B])=="function"){continue}if(D.style[B]!=A[B]){D.style[B]=A[B]}}}},cn:function(A,C,B,E){var D=document.createElement(A);this.sn(D,C,B);if(E){D.innerHTML=E}return D}};if(!Array.prototype.indexOf){Array.prototype.indexOf=function(B){for(var A=0;A<this.length;A++){if(this[A]==B){return A}}return -1}}if(!Array.prototype.compact){Array.prototype.compact=function(){var B=[];for(var A=0;A<this.length;A++){if(this[A]){B.push(this[A])}}return B}}inputEx.Field=function(A){this.options=A||{};this.setOptions();this.render();if(!YAHOO.lang.isUndefined(this.options.value)){this.setValue(this.options.value)}this.updatedEvt=new YAHOO.util.CustomEvent("updated",this);this.initEvents();this.setClassFromState();if(this.options.parentEl){if(typeof this.options.parentEl=="string"){YAHOO.util.Dom.get(this.options.parentEl).appendChild(this.getEl())}else{this.options.parentEl.appendChild(this.getEl())}}};inputEx.Field.prototype={setOptions:function(){this.options.messages=this.options.messages||{};this.options.messages.required=this.options.messages.required||inputEx.messages.required;this.options.messages.invalid=this.options.messages.invalid||inputEx.messages.invalid;this.options.messages.valid=this.options.messages.valid||inputEx.messages.valid;this.options.className=this.options.className||"inputEx-Field";this.options.required=this.options.required?true:false;this.options.tooltipIcon=this.options.tooltipIcon?true:false},render:function(){this.divEl=inputEx.cn("div",{className:this.options.className});this.renderComponent();if(this.options.tooltipIcon){this.tooltipIcon=inputEx.cn("img",{src:inputEx.spacerUrl,className:"inputEx-Field-stateIcon"});if(!inputEx.tooltipCount){inputEx.tooltipCount=0}this.tooltip=new YAHOO.widget.Tooltip("inputEx-tooltip-"+(inputEx.tooltipCount++),{context:this.tooltipIcon,text:""});this.divEl.appendChild(this.tooltipIcon)}},fireUpdatedEvt:function(){if(this.validate()){var A=this;setTimeout(function(){A.updatedEvt.fire(A.getValue())},50)}},renderComponent:function(){},getEl:function(){return this.divEl},initEvents:function(){},getValue:function(){},setValue:function(A){},setClassFromState:function(){if(this.previousState){YAHOO.util.Dom.removeClass(this.getEl(),"inputEx-"+this.previousState)}this.previousState=this.getState();YAHOO.util.Dom.addClass(this.getEl(),"inputEx-"+this.previousState);this.setToolTipMessage()},getStateString:function(A){if(A=="required"){return this.options.messages.required}else{if(A=="invalid"){return this.options.messages.invalid}else{return this.options.messages.valid}}},setToolTipMessage:function(){if(this.tooltip){var A="";if(this.previousState=="required"){A='<div class="inputEx-tooltip-required"></div> <span>'+this.options.messages.required+"</span>"}else{if(this.previousState=="invalid"){A='<div class="inputEx-tooltip-exclamation"></div> <span>'+this.options.messages.invalid+"</span>"}else{A='<div class="inputEx-tooltip-validated"></div> <span>'+this.options.messages.valid+"</span>"}}this.tooltip.setBody(A)}},getState:function(){if(this.getValue()===""){return this.options.required?inputEx.stateRequired:inputEx.stateEmpty}return this.validate()?inputEx.stateValid:inputEx.stateInvalid},validate:function(){return true},onFocus:function(A){YAHOO.util.Dom.addClass(this.getEl(),"inputEx-focused")},onBlur:function(A){YAHOO.util.Dom.removeClass(this.getEl(),"inputEx-focused")},onChange:function(A){this.setClassFromState();this.fireUpdatedEvt()},close:function(){},disable:function(){},enable:function(){}};inputEx.Group=function(A){inputEx.Group.superclass.constructor.call(this,A)};YAHOO.extend(inputEx.Group,inputEx.Field);inputEx.Group.prototype.setOptions=function(){this.options.optionsLabel=this.options.optionsLabel||"Options";this.inputConfigs=this.options.fields;this.inputs=[];this.inputsNames={}};inputEx.Group.prototype.render=function(){this.divEl=inputEx.cn("div",{className:"inputEx-Group"});this.renderFields(this.divEl)};inputEx.Group.prototype.renderFields=function(E){var H=inputEx.cn("table");var F=inputEx.cn("tbody");H.appendChild(F);this.tableOptional=inputEx.cn("table",{className:"inputEx-Group-Options"},{display:"none"});var A=inputEx.cn("tbody");this.tableOptional.appendChild(A);for(var D=0;D<this.inputConfigs.length;D++){var J=this.inputConfigs[D];var G=inputEx.cn("tr");if(J.type=="hidden"){YAHOO.util.Dom.setStyle(G,"display","none")}G.appendChild(inputEx.cn("td",{className:"inputEx-Group-label"},null,J.label||""));var I=this.renderField(J);var B=inputEx.cn("td");B.appendChild(I.getEl());G.appendChild(B);var C=J.optional?A:F;C.appendChild(G)}this.tableNonOptional=H;E.appendChild(H);if(A.childNodes.length>0){this.optionsLabel=inputEx.cn("div",{className:"inputEx-Group-Options-Label inputEx-Group-Options-Label-Collapsed"});this.optionsLabel.appendChild(inputEx.cn("img",{src:inputEx.spacerUrl}));this.optionsLabel.appendChild(inputEx.cn("span",null,null,this.options.optionsLabel));E.appendChild(this.optionsLabel);E.appendChild(this.tableOptional)}};inputEx.Group.prototype.renderField=function(B){var A=inputEx.buildField(B);this.inputs.push(A);if(!!A.el&&!!A.el.name){this.inputsNames[A.el.name]=A}A.updatedEvt.subscribe(this.onChange,this,true);return A};inputEx.Group.prototype.initEvents=function(){YAHOO.util.Event.addListener(this.optionsLabel,"click",this.onClickOptionsLabel,this,true)};inputEx.Group.prototype.onClickOptionsLabel=function(){if(this.tableOptional.style.display=="none"){this.tableOptional.style.display="";YAHOO.util.Dom.replaceClass(this.optionsLabel,"inputEx-Group-Options-Label-Collapsed","inputEx-Group-Options-Label-Expanded")}else{this.tableOptional.style.display="none";YAHOO.util.Dom.replaceClass(this.optionsLabel,"inputEx-Group-Options-Label-Expanded","inputEx-Group-Options-Label-Collapsed")}};inputEx.Group.prototype.getEl=function(){return this.divEl};inputEx.Group.prototype.validate=function(){for(var B=0;B<this.inputs.length;B++){var A=this.inputs[B];var C=A.getState();if(C==inputEx.stateRequired||C==inputEx.stateInvalid){return false}}return true};inputEx.Group.prototype.enable=function(){for(var A=0;A<this.inputs.length;A++){this.inputs[A].enable()}};inputEx.Group.prototype.disable=function(){for(var A=0;A<this.inputs.length;A++){this.inputs[A].disable()}};inputEx.Group.prototype.setValue=function(B){if(!B){return }for(var A=0;A<this.inputs.length;A++){if(this.inputs[A].options.name&&!YAHOO.lang.isUndefined(B[this.inputs[A].options.name])){this.inputs[A].setValue(B[this.inputs[A].options.name]||"");this.inputs[A].setClassFromState()}}};inputEx.Group.prototype.getValue=function(){var B={};for(var A=0;A<this.inputs.length;A++){if(this.inputs[A].options.name){B[this.inputs[A].options.name]=this.inputs[A].getValue()}}return B};inputEx.Group.prototype.close=function(){for(var A=0;A<this.inputs.length;A++){this.inputs[A].close()}};inputEx.registerType("group",inputEx.Group);inputEx.Form=function(A){inputEx.Form.superclass.constructor.call(this,A)};YAHOO.extend(inputEx.Form,inputEx.Group);inputEx.Form.prototype.setOptions=function(){inputEx.Form.superclass.setOptions.call(this);this.buttons=this.options.buttons;if(this.options.ajax){this.options.ajax.method=this.options.ajax.method||"POST";this.options.ajax.uri=this.options.ajax.uri||"default.php";this.options.ajax.callback=this.options.ajax.callback||{};this.options.ajax.callback.scope=this.options.ajax.callback.scope||this}};inputEx.Form.prototype.render=function(){this.divEl=inputEx.cn("div",{className:"inputEx-Group"});this.form=inputEx.cn("form",{method:this.options.method||"POST",action:this.options.action||"",className:this.options.className||"inputEx-Form"});this.divEl.appendChild(this.form);this.form.setAttribute("autocomplete","off");if(this.options.formName){this.form.name=this.options.formName}this.renderFields(this.form);this.renderButtons()};inputEx.Form.prototype.renderButtons=function(){var C,A;for(var B=0;B<this.buttons.length;B++){C=this.buttons[B];A=inputEx.cn("input",{type:C.type,value:C.value});if(C.onClick){A.onclick=C.onClick}this.form.appendChild(A)}};inputEx.Form.prototype.initEvents=function(){inputEx.Form.superclass.initEvents.call(this);YAHOO.util.Event.addListener(this.form,"submit",this.options.onSubmit||this.onSubmit,this,true)};inputEx.Form.prototype.onSubmit=function(A){if(!this.validate()){YAHOO.util.Event.stopEvent(A)}if(this.options.ajax){YAHOO.util.Event.stopEvent(A);this.asyncRequest()}};inputEx.Form.prototype.asyncRequest=function(){var A="value="+YAHOO.lang.JSON.stringify(this.getValue());YAHOO.util.Connect.asyncRequest(this.options.ajax.method,this.options.ajax.uri,{success:function(B){if(typeof this.options.ajax.callback.success=="function"){this.options.ajax.callback.success.call(this.options.ajax.callback.scope,B)}},failure:function(B){if(typeof this.options.ajax.callback.failure=="function"){this.options.ajax.callback.failure.call(this.options.ajax.callback.scope,B)}},scope:this},A)};inputEx.registerType("form",inputEx.Form);inputEx.StringField=function(A){inputEx.StringField.superclass.constructor.call(this,A)};YAHOO.extend(inputEx.StringField,inputEx.Field);inputEx.StringField.prototype.setOptions=function(){inputEx.StringField.superclass.setOptions.call(this);this.options.size=this.options.size||20};inputEx.StringField.prototype.renderComponent=function(){var A={};A.type="text";A.size=this.options.size;if(this.options.name){A.name=this.options.name}this.el=inputEx.cn("input",A);this.divEl.appendChild(this.el)};inputEx.StringField.prototype.getEl=function(){return this.divEl};inputEx.StringField.prototype.initEvents=function(){var A=this;YAHOO.util.Event.addListener(this.el,"keypress",function(B){setTimeout(function(){A.onInput(B)},50)});YAHOO.util.Event.addListener(this.el,"change",this.onChange,this,true);YAHOO.util.Event.addListener(this.el,"focus",this.onFocus,this,true);YAHOO.util.Event.addListener(this.el,"blur",this.onBlur,this,true)};inputEx.StringField.prototype.getValue=function(){return this.el.value};inputEx.StringField.prototype.setValue=function(A){this.el.value=A};inputEx.StringField.prototype.onInput=function(A){if(this.options.numbersOnly){this.setValue(this.getValue().replace(/[^0-9]/g,""))}this.setClassFromState()};inputEx.StringField.prototype.validate=function(){if(this.options.regexp){return this.getValue().match(this.options.regexp)}return true};inputEx.StringField.prototype.disable=function(){this.el.disabled=true};inputEx.StringField.prototype.enable=function(){this.el.disabled=false};inputEx.registerType("string",inputEx.StringField);inputEx.AutoComplete=function(A){inputEx.AutoComplete.superclass.constructor.call(this,A)};YAHOO.extend(inputEx.AutoComplete,inputEx.StringField);inputEx.AutoComplete.prototype.setOptions=function(){this.options.className=this.options.className||"inputEx-Field inputEx-AutoComplete";inputEx.AutoComplete.superclass.setOptions.call(this);this.options.highlightClass="inputEx-AutoComplete-ItemHovered";this.options.timerDelay=this.options.timerDelay||300;this.options.query=this.options.query||null;this.options.queryMinLength=this.options.queryMinLength||2;this.options.displayEl=this.options.displayEl||function(A){return inputEx.cn("div",null,null,A)}};inputEx.AutoComplete.prototype.renderComponent=function(){inputEx.AutoComplete.superclass.renderComponent.call(this);this.listEl=inputEx.cn("div",{className:"inputEx-AutoComplete-List"},{display:"none"});this.divEl.appendChild(this.listEl)};inputEx.AutoComplete.prototype.initEvents=function(){inputEx.AutoComplete.superclass.initEvents.call(this);YAHOO.util.Event.addListener(this.listEl,"click",this.validateItem,this,true);YAHOO.util.Event.addListener(this.listEl,"mouseover",this.onListMouseOver,this,true);YAHOO.util.Event.addListener(this.el,"keydown",this.onKeyDown,this,true)};inputEx.AutoComplete.prototype.onKeyDown=function(D){if(D.keyCode==40||D.keyCode==38){var F=-1;for(var A=0;A<this.listEl.childNodes.length;A++){if(this.listEl.childNodes[A]==this.highlightedItem){F=A;break}}var C=this.listEl.childNodes.length-1;var B=(D.keyCode==40)?(F<C?F+1:0):(F!=0?F-1:C);var E=this.listEl.childNodes[B];if(E){this.highlightItem(E);YAHOO.util.Event.stopEvent(D)}}};inputEx.AutoComplete.prototype.onInput=function(B){inputEx.AutoComplete.superclass.onInput.call(this,B);if(B.keyCode==13){YAHOO.util.Event.stopEvent(B);this.validateItem();return }if(B.keyCode==40||B.keyCode==38){return }var A=this.getValue().replace(/^\s+/g,"").replace(/\s+$/g,"");if(A.length>=this.options.queryMinLength){this.resetTimer()}else{this.stopTimer();this.hideList()}};inputEx.AutoComplete.prototype.validateItem=function(){var B=-1;for(var A=0;A<this.listEl.childNodes.length;A++){if(this.listEl.childNodes[A]==this.highlightedItem){B=A;break}}if(B==-1){return }this.setValue(this.options.displayAutocompleted.call(this,this.listValues[B]));this.hideList()};inputEx.AutoComplete.prototype.hideList=function(){this.listEl.style.display="none"};inputEx.AutoComplete.prototype.showList=function(){this.listEl.style.display=""};inputEx.AutoComplete.prototype.queryList=function(A){this.options.query.call(this,A)};inputEx.AutoComplete.prototype.updateList=function(C){this.listValues=C;this.listEl.innerHTML="";for(var A=0;A<C.length;A++){var B=inputEx.cn("div",{className:"inputEx-AutoComplete-Item"});B.appendChild(this.options.displayEl.call(this,C[A]));this.listEl.appendChild(B)}this.showList()};inputEx.AutoComplete.prototype.resetTimer=function(){if(this.timer){clearTimeout(this.timer)}var A=this;this.timer=setTimeout(function(){A.timerEnd()},this.options.timerDelay)};inputEx.AutoComplete.prototype.stopTimer=function(){if(this.timer){clearTimeout(this.timer)}};inputEx.AutoComplete.prototype.timerEnd=function(){var A=this.getValue().replace(/^\s+/g,"").replace(/\s+$/g,"");this.queryList(A)};inputEx.AutoComplete.prototype.onBlur=function(A){inputEx.AutoComplete.superclass.onBlur.call(this,A)};inputEx.AutoComplete.prototype.highlightItem=function(A){this.toggleHighlightItem(this.highlightedItem,false);this.toggleHighlightItem(A,true);this.highlightedItem=A};inputEx.AutoComplete.prototype.toggleHighlightItem=function(B,A){if(A){YAHOO.util.Dom.addClass(B,this.options.highlightClass)}else{YAHOO.util.Dom.removeClass(B,this.options.highlightClass)}};inputEx.AutoComplete.prototype.onListMouseOver=function(B){var A=YAHOO.util.Event.getTarget(B);if(YAHOO.util.Dom.hasClass(A,"inputEx-AutoComplete-Item")){this.highlightItem(A)}};inputEx.CheckBox=function(A){inputEx.CheckBox.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.CheckBox,inputEx.Field);inputEx.CheckBox.prototype.setOptions=function(){inputEx.CheckBox.superclass.setOptions.call(this);this.sentValues=this.options.sentValues||[true,false];this.checkedValue=this.sentValues[0];this.uncheckedValue=this.sentValues[1]};inputEx.CheckBox.prototype.renderComponent=function(){this.el=inputEx.cn("input",{type:"checkbox",checked:(this.options.checked===false)?false:true});this.divEl.appendChild(this.el);this.label=inputEx.cn("label",{className:"inputExForm-checkbox-rightLabel"},null,this.options.label||"");this.divEl.appendChild(this.label);this.hiddenEl=inputEx.cn("input",{type:"hidden",name:this.options.name||"",value:this.el.checked?this.checkedValue:this.uncheckedValue});this.divEl.appendChild(this.hiddenEl)};inputEx.CheckBox.prototype.initEvents=function(){YAHOO.util.Event.addListener(this.el,"change",this.onChange,this,true)};inputEx.CheckBox.prototype.onChange=function(A){this.hiddenEl.value=this.el.checked?this.checkedValue:this.uncheckedValue;inputEx.CheckBox.superclass.onChange.call(this,A)};inputEx.CheckBox.prototype.getValue=function(){return this.el.checked?this.checkedValue:this.uncheckedValue};inputEx.CheckBox.prototype.setValue=function(A){if(A===this.checkedValue){this.hiddenEl.value=A;this.el.checked=true}else{if(A===this.uncheckedValue){this.hiddenEl.value=A;this.el.checked=false}}};inputEx.registerType("boolean",inputEx.CheckBox);inputEx.ColorField=function(A){inputEx.ColorField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.ColorField,inputEx.Field);inputEx.ColorField.prototype.renderComponent=function(){this.el=inputEx.cn("input",{type:"hidden",name:this.options.name||"",value:this.options.value||"#DD7870"});this.colorEl=inputEx.cn("div",{className:"inputEx-ColorField"},{backgroundColor:this.el.value});this.renderPopUp();this.divEl.appendChild(this.el);this.divEl.appendChild(this.colorEl)};inputEx.ColorField.prototype.initEvents=function(){YAHOO.util.Event.addListener(this.colorEl,"click",this.toggleColorPopUp,this,true);YAHOO.util.Event.addListener(this.colorEl,"blur",this.closeColorPopUp,this,true)};inputEx.ColorField.prototype.toggleColorPopUp=function(){if(this.visible){this.colorPopUp.style.display="none"}else{this.colorPopUp.style.display="block"}this.visible=!this.visible};inputEx.ColorField.prototype.close=function(){this.closeColorPopUp()};inputEx.ColorField.prototype.closeColorPopUp=function(){this.colorPopUp.style.display="none";this.visible=false};inputEx.ColorField.prototype.renderPopUp=function(){this.displayTitle=this.options.displayTitle||false;var C=this.options.auto||1;this.colors=this.options.colors||this.setDefaultColors(C);this.length=this.colors.length;this.ratio=this.options.ratio||[16,9];this.squaresPerLine=Math.ceil(Math.sqrt(this.length*this.ratio[0]/this.ratio[1]));this.squaresPerColumn=Math.ceil(this.length/this.squaresPerLine);this.squaresOnLastLine=this.squaresPerLine-(this.squaresPerLine*this.squaresPerColumn-this.length);var B=30*this.squaresPerLine+10;this.visible=false;this.colorPopUp=inputEx.cn("div",{className:"inputEx-ColorField-popup"},{width:B+"px",display:"none"});if(this.displayTitle){var D=inputEx.cn("div",null,null,inputEx.messages.selectColor);this.colorPopUp.appendChild(D)}var A=inputEx.cn("div");A.appendChild(this.renderColorGrid());this.colorPopUp.appendChild(A);this.divEl.appendChild(this.colorPopUp)};inputEx.ColorField.prototype.setValue=function(A){this.el.value=A;YAHOO.util.Dom.setStyle(this.colorEl,"background-color",this.el.value)};inputEx.ColorField.prototype.setDefaultColors=function(A){return inputEx.ColorField.palettes[A-1]};inputEx.ColorField.prototype.renderColorGrid=function(){var E=inputEx.cn("table");var C=inputEx.cn("tbody");for(var D=0;D<this.squaresPerColumn;D++){var A=inputEx.cn("tr");for(var B=0;B<this.squaresPerLine;B++){A.appendChild(inputEx.cn("td",null,{backgroundColor:"#fff",lineHeight:"10px",cursor:"default"},"&nbsp;"));var F=inputEx.cn("td",null,{backgroundColor:"#fff",lineHeight:"10px",cursor:"default"},"&nbsp;&nbsp;&nbsp;");if(D===(this.squaresPerColumn-1)&&B>=this.squaresOnLastLine){inputEx.sn(F,null,{backgroundColor:"#fff",cursor:"default"})}else{inputEx.sn(F,null,{backgroundColor:"#"+this.colors[D*this.squaresPerLine+B],cursor:"pointer"});YAHOO.util.Event.addListener(F,"mousedown",this.onColorClick,this,true)}A.appendChild(F)}C.appendChild(A);C.appendChild(inputEx.cn("tr",null,{height:"8px"}))}E.appendChild(C);return E};inputEx.ColorField.prototype.onColorClick=function(C){var B=YAHOO.util.Event.getTarget(C);var A=YAHOO.util.Dom.getStyle(B,"background-color");YAHOO.util.Dom.setStyle(this.colorEl,"background-color",A);var D=function(E){var G=function(M){var J=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");var I=16;var L=parseInt(M,10);var K;var H="";if(!isNaN(L)){if(L==""){return"00"}while(L>0){K=0;while(L/Math.pow(I,K++)>=I){}H+=J[Math.floor(L/Math.pow(I,K-1))];if(L%I==0){H+="0"}L=(L%Math.pow(I,K-1))}if(H.length==1){return"0"+H}return H}else{return 0}};var F=E.split(/([(,)])/);return"#"+G(F[2])+G(F[4])+G(F[6])};this.el.value=D(A);this.visible=!this.visible;this.colorPopUp.style.display="none";this.fireUpdatedEvt()};inputEx.messages.selectColor="Select a color :";inputEx.ColorField.palettes=[["FFEA99","FFFF66","FFCC99","FFCAB2","FF99AD","FFD6FF","FF6666","E8EEF7","ADC2FF","ADADFF","CCFFFF","D6EAAD","B5EDBC","CCFF99"],["55AAFF","FFAAFF","FF7FAA","FF0202","FFD42A","F9F93B","DF8181","FEE3E2","D47FFF","2AD4FF","2AFFFF","AAFFD4"],["000000","993300","333300","003300","003366","000080","333399","333333","800000","FF6600","808000","008000","008080","0000FF","666699","808080","FF0000","FF9900","99CC00","339966","33CCCC","3366FF","800080","969696","FF00FF","FFCC00","FFFF00","00FF00","00FFFF","00CCFF","993366","C0C0C0","FF99CC","FFCC99","FFFF99","CCFFCC","CCFFFF","99CCFF","CC99FF","F0F0F0"]];inputEx.registerType("color",inputEx.ColorField);inputEx.DateField=function(A){if(!A){var A={}}if(!A.messages){A.messages={}}if(!A.dateFormat){A.dateFormat="m/d/Y"}A.messages.invalid=inputEx.messages.invalidDate;inputEx.DateField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.DateField,inputEx.StringField);inputEx.DateField.prototype.validate=function(){var E=this.el.value;var D=E.split("/");if(D.length!=3){return false}if(isNaN(parseInt(D[0]))||isNaN(parseInt(D[1]))||isNaN(parseInt(D[2]))){return false}var F=this.options.dateFormat.split("/");if(D[F.indexOf("Y")].length!=4){return false}var H=parseInt(D[F.indexOf("d")],10);var G=parseInt(D[F.indexOf("Y")],10);var B=parseInt(D[F.indexOf("m")],10)-1;var C=new Date(G,B,H);var A=C.getFullYear();return((C.getDate()==H)&&(C.getMonth()==B)&&(A==G))};inputEx.DateField.prototype.setValue=function(D){if(D===""){this.el.value="";return }var C="";if(D instanceof Date){C=this.options.dateFormat.replace("Y",D.getFullYear());var A=D.getMonth()+1;C=C.replace("m",((A<10)?"0":"")+A);var B=D.getDate();C=C.replace("d",((B<10)?"0":"")+B)}else{C=D}this.el.value=C};inputEx.DateField.prototype.getValue=function(){if(this.el.value===""){return""}var B=this.el.value.split("/");var C=this.options.dateFormat.split("/");var E=parseInt(B[C.indexOf("d")],10);var D=parseInt(B[C.indexOf("Y")],10);var A=parseInt(B[C.indexOf("m")],10)-1;return(new Date(D,A,E))};inputEx.messages.invalidDate="Invalid date, ex: 03/27/2008";inputEx.registerType("date",inputEx.DateField);inputEx.EmailField=function(A){inputEx.EmailField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.EmailField,inputEx.StringField);inputEx.EmailField.prototype.setOptions=function(){inputEx.EmailField.superclass.setOptions.call(this);this.options.messages.invalid=inputEx.messages.invalidEmail;this.options.regexp=inputEx.regexps.email};inputEx.EmailField.prototype.getValue=function(){return this.el.value.toLowerCase()};inputEx.messages.invalidEmail="Invalid email, ex: sample@test.com";inputEx.registerType("email",inputEx.EmailField);inputEx.HiddenField=function(A){inputEx.HiddenField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.HiddenField,inputEx.Field);inputEx.HiddenField.prototype.render=function(){this.type=inputEx.HiddenField;this.divEl=inputEx.cn("div")};inputEx.HiddenField.prototype.setValue=function(A){this.value=A};inputEx.HiddenField.prototype.getValue=function(){return this.value};inputEx.registerType("hidden",inputEx.HiddenField);inputEx.InPlaceEdit=function(A){inputEx.InPlaceEdit.superclass.constructor.call(this,A)};YAHOO.extend(inputEx.InPlaceEdit,inputEx.Field);inputEx.InPlaceEdit.prototype.render=function(){this.divEl=inputEx.cn("div",{className:this.options.className});this.renderVisuDiv();this.renderEditor()};inputEx.InPlaceEdit.prototype.renderEditor=function(){this.editorContainer=inputEx.cn("div",null,{display:"none"});this.editorField=inputEx.buildField(this.options.editorField);this.editorContainer.appendChild(this.editorField.getEl());YAHOO.util.Dom.setStyle(this.editorField.getEl(),"float","left");this.okButton=inputEx.cn("input",{type:"button",value:"Ok"});YAHOO.util.Dom.setStyle(this.okButton,"float","left");this.editorContainer.appendChild(this.okButton);this.cancelLink=inputEx.cn("a",null,null,"cancel");this.cancelLink.href="";YAHOO.util.Dom.setStyle(this.cancelLink,"float","left");this.editorContainer.appendChild(this.cancelLink);this.editorContainer.appendChild(inputEx.cn("div",null,{clear:"both"}));this.divEl.appendChild(this.editorContainer)};inputEx.InPlaceEdit.prototype.onVisuMouseOver=function(){if(this.colorAnim){this.colorAnim.stop(true)}inputEx.sn(this.formattedContainer,null,{backgroundColor:"#eeee33"})};inputEx.InPlaceEdit.prototype.onVisuMouseOut=function(){if(this.colorAnim){this.colorAnim.stop(true)}this.colorAnim=new YAHOO.util.ColorAnim(this.formattedContainer,{backgroundColor:{from:"#eeee33",to:"#eeeeee"}},1);this.colorAnim.onComplete.subscribe(function(){YAHOO.util.Dom.setStyle(this.formattedContainer,"background-color","")},this,true);this.colorAnim.animate()};inputEx.InPlaceEdit.prototype.renderVisuDiv=function(){this.formattedContainer=inputEx.cn("div",{className:"inputEx-InPlaceEdit-formattedContainer"});if(typeof this.options.formatDom=="function"){this.formattedContainer.appendChild(this.options.formatDom(this.options.value))}else{if(typeof this.options.formatValue=="function"){this.formattedContainer.innerHTML=this.options.formatValue(this.options.value)}else{this.formattedContainer.innerHTML=YAHOO.lang.isUndefined(this.options.value)?inputEx.messages.emptyInPlaceEdit:this.options.value}}this.divEl.appendChild(this.formattedContainer)};inputEx.InPlaceEdit.prototype.initEvents=function(){YAHOO.util.Event.addListener(this.formattedContainer,"click",this.openEditor,this,true);YAHOO.util.Event.addListener(this.formattedContainer,"mouseover",this.onVisuMouseOver,this,true);YAHOO.util.Event.addListener(this.formattedContainer,"mouseout",this.onVisuMouseOut,this,true);YAHOO.util.Event.addListener(this.okButton,"click",this.onOkEditor,this,true);YAHOO.util.Event.addListener(this.cancelLink,"click",this.onCancelEditor,this,true);if(this.editorField.el){YAHOO.util.Event.addListener(this.editorField.el,"keyup",this.onKeyUp,this,true);YAHOO.util.Event.addListener(this.editorField.el,"keydown",this.onKeyDown,this,true);YAHOO.util.Event.addListener(this.editorField.el,"blur",this.onCancelEditor,this,true)}};inputEx.InPlaceEdit.prototype.onKeyUp=function(A){if(A.keyCode==13){this.onOkEditor()}if(A.keyCode==27){this.onCancelEditor(A)}};inputEx.InPlaceEdit.prototype.onKeyDown=function(A){if(A.keyCode==9){this.onOkEditor()}};inputEx.InPlaceEdit.prototype.onOkEditor=function(){var B=this.editorField.getValue();this.setValue(B);this.editorContainer.style.display="none";this.formattedContainer.style.display="";var A=this;setTimeout(function(){A.updatedEvt.fire(B)},50)};inputEx.InPlaceEdit.prototype.onCancelEditor=function(A){YAHOO.util.Event.stopEvent(A);this.editorContainer.style.display="none";this.formattedContainer.style.display=""};inputEx.InPlaceEdit.prototype.openEditor=function(){var A=this.getValue();this.editorContainer.style.display="";this.formattedContainer.style.display="none";if(!YAHOO.lang.isUndefined(A)){this.editorField.setValue(A)}if(this.editorField.el&&typeof this.editorField.el.focus=="function"){this.editorField.el.focus()}if(this.editorField.el&&typeof this.editorField.el.setSelectionRange=="function"&&(!!A&&!!A.length)){this.editorField.el.setSelectionRange(0,A.length)}};inputEx.InPlaceEdit.prototype.getValue=function(){return this.value};inputEx.InPlaceEdit.prototype.setValue=function(A){this.value=A;if(typeof A=="undefined"||A==""){this.value="(Edit me)"}if(typeof this.options.formatDom=="function"){this.formattedContainer.innerHTML="";this.formattedContainer.appendChild(this.options.formatDom(this.value))}else{if(typeof this.options.formatValue=="function"){this.formattedContainer.innerHTML=this.options.formatValue(this.value)}else{this.formattedContainer.innerHTML=this.value}}};inputEx.messages.emptyInPlaceEdit="(click to edit)";inputEx.registerType("inplaceedit",inputEx.InPlaceEdit);inputEx.IPv4Field=function(A){inputEx.IPv4Field.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.IPv4Field,inputEx.StringField);inputEx.IPv4Field.prototype.setOptions=function(){inputEx.IPv4Field.superclass.setOptions.call(this);this.options.messages.invalid=inputEx.messages.invalidIPv4;this.options.regexp=inputEx.regexps.ipv4};inputEx.messages.invalidIPv4="Invalid IPv4 address, ex: 192.168.0.1";inputEx.registerType("IPv4",inputEx.IPv4Field);inputEx.ListField=function(A){this.subFields=[];inputEx.ListField.superclass.constructor.call(this,A)};YAHOO.extend(inputEx.ListField,inputEx.Field);inputEx.ListField.prototype.setOptions=function(){inputEx.ListField.superclass.setOptions.call(this);this.options.className="inputEx-Field inputEx-ListField";this.options.sortable=(typeof this.options.sortable=="undefined")?false:this.options.sortable;this.options.elementType=this.options.elementType||{type:"string"}};inputEx.ListField.prototype.renderComponent=function(){this.addButton=inputEx.cn("img",{src:inputEx.spacerUrl,className:"inputEx-ListField-addButton"});this.divEl.appendChild(this.addButton);this.divEl.appendChild(inputEx.cn("span",null,{marginLeft:"4px"},this.options.listLabel));this.childContainer=inputEx.cn("div",{className:"inputEx-ListField-childContainer"});this.divEl.appendChild(this.childContainer)};inputEx.ListField.prototype.initEvents=function(){YAHOO.util.Event.addListener(this.addButton,"click",this.onAddButton,this,true)};inputEx.ListField.prototype.setValue=function(C){if(!YAHOO.lang.isArray(C)){return }for(var B=0;B<C.length;B++){if(B==this.subFields.length){this.addElement(C[B])}else{this.subFields[B].setValue(C[B])}}var A=this.subFields.length-C.length;if(A>0){for(var B=0;B<A;B++){this.removeElement(C.length)}}};inputEx.ListField.prototype.getValue=function(){var A=[];for(var B=0;B<this.subFields.length;B++){A[B]=this.subFields[B].getValue()}return A};inputEx.ListField.prototype.addElement=function(B){var A=this.renderSubField(B);this.subFields.push(A)};inputEx.ListField.prototype.onAddButton=function(A){YAHOO.util.Event.stopEvent(A);this.addElement();this.fireUpdatedEvt()};inputEx.ListField.prototype.renderSubField=function(H){var D=inputEx.cn("div");var B=inputEx.cn("img",{src:inputEx.spacerUrl,className:"inputEx-ListField-delButton"});YAHOO.util.Event.addListener(B,"click",this.onDelete,this,true);D.appendChild(B);var G=YAHOO.lang.merge({},this.options.elementType);if(!G.inputParams){G.inputParams={}}if(H){G.inputParams.value=H}var E=inputEx.buildField(G);var C=E.getEl();YAHOO.util.Dom.setStyle(C,"margin-left","4px");YAHOO.util.Dom.setStyle(C,"float","left");D.appendChild(C);E.updatedEvt.subscribe(this.onChange,this,true);if(this.options.sortable){var F=inputEx.cn("div",{className:"inputEx-ListField-Arrow inputEx-ListField-ArrowUp"});YAHOO.util.Event.addListener(F,"click",this.onArrowUp,this,true);var A=inputEx.cn("div",{className:"inputEx-ListField-Arrow inputEx-ListField-ArrowDown"});YAHOO.util.Event.addListener(A,"click",this.onArrowDown,this,true);D.appendChild(F);D.appendChild(A)}D.appendChild(inputEx.cn("div",null,{clear:"both"}));this.childContainer.appendChild(D);return E};inputEx.ListField.prototype.onArrowUp=function(G){var D=YAHOO.util.Event.getTarget(G).parentNode;var B=null;var C=-1;for(var E=1;E<D.parentNode.childNodes.length;E++){var A=D.parentNode.childNodes[E];if(A==D){B=D.parentNode.childNodes[E-1];C=E;break}}if(B){var H=this.childContainer.removeChild(D);var F=this.childContainer.insertBefore(H,B);var I=this.subFields[C];this.subFields[C]=this.subFields[C-1];this.subFields[C-1]=I;if(this.arrowAnim){this.arrowAnim.stop(true)}this.arrowAnim=new YAHOO.util.ColorAnim(F,{backgroundColor:{from:"#eeee33",to:"#eeeeee"}},0.4);this.arrowAnim.onComplete.subscribe(function(){YAHOO.util.Dom.setStyle(F,"background-color","")});this.arrowAnim.animate();this.fireUpdatedEvt()}};inputEx.ListField.prototype.onArrowDown=function(G){var C=YAHOO.util.Event.getTarget(G).parentNode;var B=-1;var F=null;for(var D=0;D<C.parentNode.childNodes.length;D++){var A=C.parentNode.childNodes[D];if(A==C){F=C.parentNode.childNodes[D+1];B=D;break}}if(F){var H=this.childContainer.removeChild(C);var E=YAHOO.util.Dom.insertAfter(H,F);var I=this.subFields[B];this.subFields[B]=this.subFields[B+1];this.subFields[B+1]=I;if(this.arrowAnim){this.arrowAnim.stop(true)}this.arrowAnim=new YAHOO.util.ColorAnim(E,{backgroundColor:{from:"#eeee33",to:"#eeeeee"}},1);this.arrowAnim.onComplete.subscribe(function(){YAHOO.util.Dom.setStyle(E,"background-color","")});this.arrowAnim.animate();this.fireUpdatedEvt()}};inputEx.ListField.prototype.onDelete=function(E,F){YAHOO.util.Event.stopEvent(E);var B=YAHOO.util.Event.getTarget(E).parentNode;var A=-1;var D=B.childNodes[1];for(var C=0;C<this.subFields.length;C++){if(this.subFields[C].getEl()==D){A=C;break}}if(A!=-1){this.removeElement(A)}this.updatedEvt.fire(this.getValue())};inputEx.ListField.prototype.removeElement=function(B){var A=this.subFields[B].getEl().parentNode;this.subFields[B]=undefined;this.subFields=this.subFields.compact();A.parentNode.removeChild(A)};inputEx.registerType("list",inputEx.ListField);inputEx.PairField=function(A){A.leftFieldOptions=A.leftFieldOptions||{};A.rightFieldOptions=A.rightFieldOptions||{};inputEx.PairField.superclass.constructor.call(this,A)};YAHOO.extend(inputEx.PairField,inputEx.Field);inputEx.PairField.prototype.render=function(){inputEx.PairField.superclass.render.call(this);this.divEl.appendChild(inputEx.cn("div",null,{clear:"both"}))};inputEx.PairField.prototype.renderComponent=function(){var D="string";if(this.options.leftFieldOptions.type){D=this.options.leftFieldOptions.type}var E=inputEx.getFieldClass(D);var A="string";if(this.options.rightFieldOptions.type){A=this.options.rightFieldOptions.type}var C=inputEx.getFieldClass(A);this.elLeft=new E(this.options.leftFieldOptions.inputParams||{});this.elRight=new C(this.options.rightFieldOptions.inputParams||{});YAHOO.util.Dom.setStyle(this.elLeft.getEl(),"float","left");this.divEl.appendChild(this.elLeft.getEl());var B=inputEx.cn("span",null,null," : ");YAHOO.util.Dom.setStyle(B,"float","left");this.divEl.appendChild(B);this.divEl.appendChild(this.elRight.getEl());YAHOO.util.Dom.setStyle(this.elRight.getEl(),"float","left")};inputEx.PairField.prototype.validate=function(){return(this.elLeft.validate()&&this.elRight.validate())};inputEx.PairField.prototype.setValue=function(A){this.elLeft.setValue(A[0]);this.elRight.setValue(A[1])};inputEx.PairField.prototype.getValue=function(){return[this.elLeft.getValue(),this.elRight.getValue()]};inputEx.registerType("pair",inputEx.PairField);inputEx.PasswordField=function(A){inputEx.PasswordField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.PasswordField,inputEx.StringField);inputEx.PasswordField.prototype.setOptions=function(){inputEx.PasswordField.superclass.setOptions.call(this);this.options.regexp=inputEx.regexps.password;this.options.minLength=(this.options.minLength==undefined)?5:this.options.minLength;this.options.messages.invalid=inputEx.messages.invalidPassword[0]+this.options.minLength+inputEx.messages.invalidPassword[1]};inputEx.PasswordField.prototype.renderComponent=function(){var A={};A.type="password";A.size=this.options.size;if(this.options.name){A.name=this.options.name}this.el=inputEx.cn("input",A);this.divEl.appendChild(this.el)};inputEx.PasswordField.prototype.setConfirmationField=function(A){this.options.confirmPasswordField=A;this.options.messages.invalid=inputEx.messages.invalidPasswordConfirmation;this.options.confirmPasswordField.options.confirmationPasswordField=this};inputEx.PasswordField.prototype.validate=function(){if(this.options.confirmPasswordField){return(this.options.confirmPasswordField.getValue()==this.getValue())}else{var B=inputEx.PasswordField.superclass.validate.call(this);var A=this.getValue().length>=this.options.minLength;return B&&A}};inputEx.PasswordField.prototype.onInput=function(A){inputEx.PasswordField.superclass.onInput.call(this,A);if(this.options.confirmationPasswordField){this.options.confirmationPasswordField.setClassFromState()}};inputEx.messages.invalidPassword=["The password schould contain at least "," numbers or caracters"];inputEx.messages.invalidPasswordConfirmation="Passwords are different !";inputEx.registerType("password",inputEx.PasswordField);inputEx.RTEField=function(A){inputEx.RTEField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.RTEField,inputEx.Field);inputEx.RTEField.prototype.render=function(){this.divEl=inputEx.cn("div",{className:this.options.className});if(!inputEx.RTEfieldsNumber){inputEx.RTEfieldsNumber=0}var A="inputEx-RTEField-"+inputEx.RTEfieldsNumber;this.el=inputEx.cn("textarea",{id:A});inputEx.RTEfieldsNumber+=1;this.divEl.appendChild(this.el);this.editor=new YAHOO.widget.Editor(A,{height:"300px",width:"522px",dompath:true});this.editor.render()};inputEx.RTEField.prototype.setValue=function(A){if(this.editor){this.editor.setEditorHTML(A)}};inputEx.RTEField.prototype.getValue=function(){try{return this.editor.getEditorHTML()}catch(A){}};inputEx.registerType("html",inputEx.RTEField);inputEx.SelectField=function(A){inputEx.SelectField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.SelectField,inputEx.Field);inputEx.SelectField.prototype.renderComponent=function(){this.el=inputEx.cn("select",{name:this.options.name||""});if(this.options.multiple){this.el.multiple=true;this.el.size=this.options.selectValues.length}this.optionEls=[];for(var A=0;A<this.options.selectValues.length;A++){this.optionEls[A]=inputEx.cn("option",{value:this.options.selectValues[A]},null,(this.options.selectOptions)?this.options.selectOptions[A]:this.options.selectValues[A]);this.el.appendChild(this.optionEls[A])}this.divEl.appendChild(this.el)};inputEx.SelectField.prototype.initEvents=function(){YAHOO.util.Event.addListener(this.el,"change",this.onChange,this,true)};inputEx.SelectField.prototype.setValue=function(D){var A=0;var C;for(var B=0;B<this.options.selectValues.length;B++){if(D===this.options.selectValues[B]){C=this.el.childNodes[B];C.selected="selected"}}};inputEx.SelectField.prototype.getValue=function(){return this.options.selectValues[this.el.selectedIndex]};inputEx.registerType("select",inputEx.SelectField);inputEx.Textarea=function(A){inputEx.Textarea.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.Textarea,inputEx.Field);inputEx.Textarea.prototype.initEvents=function(){YAHOO.util.Event.addListener(this.el,"change",this.onChange,this,true)};inputEx.Textarea.prototype.setOptions=function(){inputEx.Textarea.superclass.setOptions.call(this);this.options.rows=this.options.rows||6;this.options.cols=this.options.cols||23};inputEx.Textarea.prototype.renderComponent=function(){this.el=inputEx.cn("textarea",{rows:this.options.rows,cols:this.options.cols},null,this.options.value);this.divEl.appendChild(this.el)};inputEx.Textarea.prototype.setValue=function(A){this.el.value=A};inputEx.Textarea.prototype.getValue=function(){return this.el.value};inputEx.registerType("text",inputEx.Textarea);inputEx.UneditableField=function(A){inputEx.UneditableField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.UneditableField,inputEx.Field);inputEx.UneditableField.prototype.render=function(){this.divEl=inputEx.cn("div")};inputEx.UneditableField.prototype.setValue=function(B){this.value=B;if(this.options.formatValue){this.divEl.innerHTML=this.options.formatValue(B)}else{if(this.options.formatDom){var A=this.options.formatDom(B);this.divEl.innerHTML="";if(A){this.divEl.appendChild(A)}}else{this.divEl.innerHTML=B}}};inputEx.UneditableField.prototype.getValue=function(){return this.value};inputEx.registerType("uneditable",inputEx.UneditableField);inputEx.UpperCaseField=function(A){inputEx.UpperCaseField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.UpperCaseField,inputEx.StringField);inputEx.UpperCaseField.prototype.setValue=function(A){this.el.value=A.toUpperCase()};inputEx.UpperCaseField.prototype.onInput=function(A){this.setValue((this.getValue()));this.setClassFromState()};inputEx.UrlField=function(A){inputEx.UrlField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.UrlField,inputEx.StringField);inputEx.UrlField.prototype.setOptions=function(){inputEx.UrlField.superclass.setOptions.call(this);this.options.className="inputEx-Field inputEx-UrlField";this.options.messages.invalid=inputEx.messages.invalidUrl};inputEx.UrlField.prototype.getValue=function(){return this.el.value.toLowerCase()};inputEx.UrlField.prototype.setValue=function(A){this.el.value=A;this.validate()};inputEx.UrlField.prototype.render=function(){inputEx.UrlField.superclass.render.call(this);this.el.size=27;this.favicon=inputEx.cn("img");this.divEl.insertBefore(this.favicon,this.el)};inputEx.UrlField.prototype.validate=function(){var B=this.getValue().match(inputEx.regexps.url);var A=B?(B[0]+"/favicon.ico"):inputEx.spacerUrl;if(A!=this.favicon.src){inputEx.sn(this.favicon,null,{visibility:"hidden"});this.favicon.src=A;if(this.timer){clearTimeout(this.timer)}var C=this;this.timer=setTimeout(function(){C.displayFavicon()},1000)}return !!B};inputEx.UrlField.prototype.displayFavicon=function(){inputEx.sn(this.favicon,null,{visibility:(this.favicon.naturalWidth!=0)?"visible":"hidden"})};inputEx.messages.invalidUrl="Invalid URL, ex: http://www.test.com";inputEx.registerType("url",inputEx.UrlField);


// Init
LRFC.init();
