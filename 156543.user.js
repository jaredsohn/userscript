/*
Geocaching - Street View
http://www.lildevil.org/greasemonkey/street-view

--------------------------------------------------------------------------------

This is a Greasemonkey user script.

Follow the instructions on http://www.lildevil.org/greasemonkey/
to install Greasemonkey and this user script.

--------------------------------------------------------------------------------
*/

// ==UserScript==
// @name          GC Street View
// @description   Show Google Street View on cache pages
// @namespace     http://www.lildevil.org/greasemonkey/
// @version       1.0
// @copyright     2013, Lil Devil
// @license       Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @icon          http://www.lildevil.org/greasemonkey/images/SV-icon.png
// @downloadURL   https://userscripts.org/scripts/source/156543.user.js
// @updateURL     http://userscripts.org.nyud.net/scripts/source/156543.meta.js
// @grant         GM_xmlhttpRequest
// @include       http://www.lildevil.org/greasemonkey/versions*
// @include       http*.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==

/*jshint strict:false */
/*global unsafeWindow console PRO_openInTab GM_xmlhttpRequest */

(function(){

var SCRIPT_NAME			= 'GC Street View',
	SCRIPT_VERSION		= '1.0',
	SCRIPT_ABBREV		= SCRIPT_NAME.replace(/[^A-Z]/g, ''),
	RUNNING_AS_EXTENSION= false,
	CURRENT_LANGUAGE	= Determine_Website_Language();

Check_for_Update();
Add_Prototypes();

var Login_Name = Get_Logged_In_Username(),
	DEBUG = (Login_Name === 'zLil Devil' || Login_Name === 'zHemlock');

var User_Options = {
		mapType			: 2,	// 0 = Road Map, 1 = Satellite, 2 = Hybrid, 3 = Terrain
		mapZoomSingle	: 17,	// 1-20
		mapZoomMany		: 0,	// 1-20, 0 = auto-zoom to show all waypoints
		SVtarget		: 1,	// rev:  0 = posted coords, 1 = final coords (or posted if no final)
								// user: 0 = original posted coords, 1 = corrected coords (or posted)
		units			: 0		// 0=meters, 1=feet
	},
	Global_Options = {
		hideNativeMap		: 1,
		mapDisplayMode		: 2,
		correctedCoordsLabel: 'corrected'
	},
	WaypointArray = [];

 // a few global vars for drag and drop support
var dragTarget = null;	// The target object
var dragXoffset = 0;	// How much we've moved the element on the horizontal
var dragYoffset = 0;	// How much we've moved the element on the vertical

GetUserOptions();
ProcessCachePage();

function GetUserOptions() {
	var str = LD_getValue('Options', '{}', Login_Name),
		obj = JSON.parse(str);
	for (var opt in User_Options) {
		if (User_Options.hasOwnProperty(opt) && obj.hasOwnProperty(opt)) {
			User_Options[opt] = obj[opt];
		}
	}
}

function ProcessCachePage() {
	var cacheNameElement = $('ctl00_ContentBody_CacheName'),
		postedCoordsElement = $('uxLatLon'),
		navLinks = document.querySelector('ul.CacheDetailsNavLinks'),
		mapHeader = $('ctl00_ContentBody_uxViewLargerMap'),
		optionsButton = $('SVoptions');
	if (!cacheNameElement || !postedCoordsElement || !navLinks || !mapHeader || optionsButton) { return; }

	// add options button
	LD_addStyle('#SVoptions { float:right; width:14px; cursor:pointer; margin:0.2em 0.4em 0 0; }');
	optionsButton = newElement('img', { src :		'http://www.geocaching.com/images/silk/cog.png',
										id :		'SVoptions',
										onclick :	LD_Open_Options_Window
									});
	mapHeader.parentNode.insertBefore(optionsButton, mapHeader);

	var postedCoords = Compute_Decimal_Coords(postedCoordsElement.textContent),
		correctedCoords = {},
		bookmarkLink = navLinks.querySelector('a[href*="/bookmarks/mark.aspx"]'),
		waypointType = Get_URL_Parameter('WptTypeID', bookmarkLink.href);

	if (typeof unsafeWindow.userDefinedCoords !== 'undefined') {
		var userDefinedCoords = cloneObject(unsafeWindow.userDefinedCoords);	// create a local copy
//		Debug_Log('userDefinedCoords=' + JSON.stringify(userDefinedCoords));
		if (userDefinedCoords.status === 'success' && userDefinedCoords.data.isUserDefined === true) {
			postedCoords.lat = userDefinedCoords.data.oldLatLng[0];
			postedCoords.lon = userDefinedCoords.data.oldLatLng[1];
			correctedCoords.lat = userDefinedCoords.data.newLatLng[0];
			correctedCoords.lon = userDefinedCoords.data.newLatLng[1];
		}
	}

	WaypointArray.push({'name'	: cacheNameElement.textContent,
						'lat'	: postedCoords.lat,
						'lon'	: postedCoords.lon,
						'icon'	: 'http://www.geocaching.com/images/wpttypes/pins/' + waypointType + '.png'
					});
//	Debug_Log(JSON.stringify(WaypointArray));

	if (correctedCoords.lat || correctedCoords.lon) {
		var waypoint = {'name'	: cacheNameElement.textContent + ' corrected',
						'lat'	: correctedCoords.lat,
						'lon'	: correctedCoords.lon,
						'icon'	: 'http://www.geocaching.com/images/wpttypes/pins/220.png'
						};
		if (User_Options.SVtarget === 1) {
			// add to beginning of array
			WaypointArray.unshift(waypoint);
		} else {
			// add to end of array
			WaypointArray.push(waypoint);
		}
	}
//	Debug_Log(JSON.stringify(WaypointArray));

	var waypointTypeLookup = {
							'flag'		: 220,	// final
							'pkg'		: 217,	// parking
							'puzzle'	: 218,	// question
							'waypoint'	: 452,	// ref point
							'stage'		: 219,	// stage
							'trailhead'	: 221	// trailhead
						};

	var waypointTable = $('ctl00_ContentBody_Waypoints');
	if (waypointTable && (waypointTable.nodeName === 'TABLE')) {
		for (var r=1; r < waypointTable.rows.length; r+=2) {
			var wRow = waypointTable.rows[r],
				coordString = wRow.cells[6].firstChild.textContent.trim(),
				coords = Compute_Decimal_Coords(coordString),
				waypointIcon = wRow.cells[2].firstElementChild.src.match(/\/(\w+)\.jpg$/i);
			if (coords && waypointIcon) {
				waypointType = waypointTypeLookup[waypointIcon[1]];
				waypoint = {'name'	: wRow.cells[5].firstElementChild.textContent,
							'lat'	: coords.lat,
							'lon'	: coords.lon,
							'icon'	: 'http://www.geocaching.com/images/wpttypes/pins/' + waypointType + '.png'
							};
				if (User_Options.SVtarget === 1 && waypointType == 220) {
					// if "final" add to beginning of array
					WaypointArray.unshift(waypoint);
				} else {
					// otherwise add to end of array
					WaypointArray.push(waypoint);
				}
			}
		}
	}
//	Debug_Log(JSON.stringify(WaypointArray));

	var mapContainer = $('map_canvas');
	if (Global_Options.hideNativeMap) {
		mapContainer.style.display = 'none';
//		mapContainer.nextElementSibling.style.display = 'none';
	}
	var iframe = document.createElement('iframe');
	mapContainer.parentNode.insertBefore(iframe, mapContainer.nextSibling);
	iframe.style.width = '600px';
	iframe.style.height = '325px';
	iframe.style.padding = '0';
	iframe.style.border = 'none';
	iframe.id = 'SViframe';
	iframe.src = Build_iFrame_URL();
}

function Build_iFrame_URL() {
	var iframeURL = 'http://www.lildevil.org/maps/twinmap.htm' +
					'?tc=2' +	// map type control: drop-down menu
					'&dm=' + Global_Options.mapDisplayMode +
					'&mt=' + User_Options.mapType +
					'&mz=' + (WaypointArray.length <= 1 ? User_Options.mapZoomSingle : User_Options.mapZoomMany) +
					'&ft=' + User_Options.units;
	for (var i=0; i<WaypointArray.length; i++) {
		iframeURL +='&mx'+i+'=' + WaypointArray[i].lon +
					'&my'+i+'=' + WaypointArray[i].lat +
					'&mu'+i+'=' + URL_Encode(WaypointArray[i].icon) +
					'&ti'+i+'=' + URL_Encode(WaypointArray[i].name);
	}

	Debug_Log(iframeURL);
	return iframeURL;
}

function moveHandler(e){
	if (!e) { e = window.event; }
	dragTarget.parentNode.style.left = e.clientX - dragXoffset + 'px';
	dragTarget.parentNode.style.top  = e.clientY - dragYoffset + 'px';
	e.preventDefault();
}

function dragEnd(e) {
	document.removeEventListener('mousemove', moveHandler, false);
	document.removeEventListener('mouseup', dragEnd, false);
	dragTarget.style.cursor = '';
	var position = {
				x : parseInt(dragTarget.parentNode.style.left, 10),
				y : parseInt(dragTarget.parentNode.style.top,  10)
			};
	LD_setValue('Options_Position', JSON.stringify(position), Login_Name);
}

function dragStart(e){
	if (!e) { e = window.event; }
	if (e.button > 0) { return; }
	dragTarget = e.target || e.srcElement;
	if (dragTarget.className.match(/(^|\s)dragable(\s|$)/)) {
		dragTarget.style.cursor = 'move';
		dragXoffset = e.clientX - parseInt(dragTarget.parentNode.style.left, 10);
		dragYoffset = e.clientY - parseInt(dragTarget.parentNode.style.top,  10);

		document.addEventListener('mousemove', moveHandler, false);
		document.addEventListener('mouseup', dragEnd, false);
		e.preventDefault();
	}
}

function LD_Open_Options_Window() {
	var optionsWindow = $('SV_Options');
	if (!optionsWindow) {
		optionsWindow = Create_Options_Window();
	}

	var positionStr = LD_getValue('Options_Position', '{"x":-99,"y":-99}', Login_Name);
	var windowPosition = JSON.parse(positionStr);

	// open window first so subsequent window measurements will work
	optionsWindow.style.display = '';

	// set position to center if any edge is off the the screen
	if ((windowPosition.x < 0) ||
		(windowPosition.y < 0) ||
		(windowPosition.x + optionsWindow.offsetWidth  > window.innerWidth) ||
		(windowPosition.y + optionsWindow.offsetHeight > window.innerHeight) ) {
			windowPosition.x = (window.innerWidth  - optionsWindow.offsetWidth)  / 2;
			windowPosition.y = (window.innerHeight - optionsWindow.offsetHeight) / 2;
	}
	optionsWindow.style.left = windowPosition.x + 'px';
	optionsWindow.style.top  = windowPosition.y + 'px';

	var blackoutDiv = $('SV_Blackout');
	blackoutDiv.style.opacity = 0;
	blackoutDiv.style.display = '';
	var op = 0;
	var si = window.setInterval(function() {
		op += 0.04;
		blackoutDiv.style.opacity = op;
		if (op >= 0.55) {
			window.clearInterval(si);
		}
	}, 40);
}

function LD_Close_Options_Window() {
	LD_removeNode('SV_Options');
	LD_removeNode('SV_Blackout');
}

function SaveUserOptions() {
	User_Options.mapType		= parseInt($('SV_mapTypeSelect').value, 10);
	User_Options.mapZoomSingle	= parseInt($('SV_zoomSingle').value, 10);
	User_Options.mapZoomMany	= parseInt($('SV_zoomMany').value, 10);
	User_Options.SVtarget		= document.querySelector('input[name="SV_target"]').checked ? 0 : 1;
	User_Options.units			= document.querySelector('input[name="SV_units"]').checked ? 0 : 1;

	LD_setValue('Options', JSON.stringify(User_Options), Login_Name);
	LD_Close_Options_Window();

	var iframe = $('SViframe');
	iframe.src = Build_iFrame_URL();
}

function Create_Options_Window() {
	LD_addStyle('#SV_Options {   position:fixed; background-color:#F5F5F5; z-index:1000;' +
								'border:5px ridge #448E35;' +
								'box-shadow:20px 20px 10px rgba(0,0,0,0.5); }' +
				'#SV_Options .title { font-weight:bold; padding:0.5em 1em; border-bottom:1px solid #448E35;' +
									'background-color:#C6E3C0; color:black; white-space:nowrap; text-align:center; }' +
				'#SV_Options label { font-weight:normal; white-space:nowrap; }' +
				'#SV_Options td { padding:0.4em 0.5em !important; white-space:nowrap; text-align:left; }' +
				'#SV_Blackout {   position:fixed; background-color:black; z-index:998;' +
								' left:0; top:0; width:100%; height:100%; opacity:0; }',
				'SV_Options_css');

	GetUserOptions();
	var optionsWindow = newElement('div', { id : 'SV_Options' });

	optionsWindow.appendChild(newElement('div', {	'class'		: 'title dragable',
													onmousedown : dragStart },
									newElement('Street View Options')));
	var optionsTable = newElement('table', { style	: 'margin:1em;',
											cellspacing : 0 } );

	// map type row
	var newRow = optionsTable.insertRow(-1);
	newRow.appendChild(newElement('td', { style : 'text-align:right;' },
							newElement('Default map type:')
						) );
	newRow.appendChild(newElement('td', {},
							newElement('select', { id : 'SV_mapTypeSelect' },
								newElement('option', { value : 0, text : 'Road Map',  selected : (User_Options.mapType === 0) } ),
								newElement('option', { value : 1, text : 'Satellite', selected : (User_Options.mapType === 1) } ),
								newElement('option', { value : 2, text : 'Hybrid',    selected : (User_Options.mapType === 2) } ),
								newElement('option', { value : 3, text : 'Terrain',   selected : (User_Options.mapType === 3) } )
							)
						) );

	// only posted header row
	newRow = optionsTable.insertRow(-1);
	newRow.appendChild(newElement('td', { style : 'border-top:1px solid #448E35; border-left:1px solid #448E35; border-right:1px solid #448E35;' +
													'border-radius:7px 7px 0 0; font-style:italic;',
										colSpan : 2 },
							newElement('Cache has only posted coordinates')
						) );

	// default zoom row
	var zoomSingleSelect = newElement('select', { id : 'SV_zoomSingle' } );
	for (var i=20; i>0; i--) {
		zoomSingleSelect.add(newElement('option', { value : i, text : i, selected : (User_Options.mapZoomSingle === i) } ) );
	}

	newRow = optionsTable.insertRow(-1);
	newRow.appendChild(newElement('td', { style : 'border-left:1px solid #448E35; border-bottom:1px solid #448E35; border-bottom-left-radius:7px; text-align:right;' },
							newElement('Default zoom:')
						) );
	newRow.appendChild(newElement('td', { style : 'border-right:1px solid #448E35; border-bottom:1px solid #448E35; border-bottom-right-radius:7px;' }, zoomSingleSelect) );

	// blank row
	newRow = optionsTable.insertRow(-1).insertCell(-1).appendChild(newElement(' '));

	// multi waypoints header row
	newRow = optionsTable.insertRow(-1);
	newRow.appendChild(newElement('td', { style : 'border-top:1px solid #448E35; border-left:1px solid #448E35; border-right:1px solid #448E35;' +
													'border-radius:7px 7px 0 0; font-style:italic;',
										colSpan : 2 },
							newElement('Cache has multiple waypoints')
						) );

	// default zoom row
	var zoomMultiSelect = newElement('select', { id : 'SV_zoomMany' } );
	zoomMultiSelect.add(newElement(    'option', { value : 0, text : 'Show All', selected : (User_Options.mapZoomMany === 0) } ) );
	for (i=20; i>0; i--) {
		zoomMultiSelect.add(newElement('option', { value : i, text : i,          selected : (User_Options.mapZoomMany === i) } ) );
	}

	newRow = optionsTable.insertRow(-1);
	newRow.appendChild(newElement('td', { style : 'border-left:1px solid #448E35; text-align:right;' },
							newElement('Default zoom:')
						) );
	newRow.appendChild(newElement('td', { style : 'border-right:1px solid #448E35;' }, zoomMultiSelect) );

	// SV pref row
	newRow = optionsTable.insertRow(-1);
	newRow.appendChild(newElement('td', { style : 'border-left:1px solid #448E35; border-bottom:1px solid #448E35; border-bottom-left-radius:7px; text-align:right;' },
							newElement('Street View preference:')
						) );
	newRow.appendChild(newElement('td', { style : 'border-bottom:1px solid #448E35; border-right:1px solid #448E35; border-bottom-right-radius:7px;' },
							newElement('label', {},
								newElement('input', { type : 'radio', name : 'SV_target', checked : (User_Options.SVtarget === 0) } ),
								newElement('posted, ' + Global_Options.correctedCoordsLabel + ', others...')
							),
							newElement('br', {} ),
							newElement('label', {},
								newElement('input', { type : 'radio', name : 'SV_target', checked : (User_Options.SVtarget === 1) } ),
								newElement(Global_Options.correctedCoordsLabel + ', posted, others...')
							)
						) );

	// blank row
	newRow = optionsTable.insertRow(-1).insertCell(-1).appendChild(newElement(' '));

	// units row
	newRow = optionsTable.insertRow(-1);
	newRow.appendChild(newElement('td', { style : 'text-align:right;' },
							newElement('Units:')
						) );
	newRow.appendChild(newElement('td', { style : '' },
							newElement('label', {},
								newElement('input', { type : 'radio', name : 'SV_units', checked : (User_Options.units === 0) } ),
								newElement('meters')
							),
							newElement('br', {} ),
							newElement('label', {},
								newElement('input', { type : 'radio', name : 'SV_units', checked : (User_Options.units === 1) } ),
								newElement('feet')
							)
						) );

	optionsWindow.appendChild(optionsTable);
	optionsWindow.appendChild(newElement('p', { style : 'text-align:center; margin:1em;' },
									newElement('button', { onclick	: SaveUserOptions }, newElement('Save')),
									newElement('button', { onclick	: LD_Close_Options_Window,
															style	: 'margin-left:5em;' }, newElement('Cancel')) ));
	document.body.appendChild(optionsWindow);

	var blackoutDiv = newElement('div', { id : 'SV_Blackout' });
	document.body.appendChild(blackoutDiv);

	return optionsWindow;
}

function Add_Prototypes() {
	String.prototype.parseHTMLentities = function() {
		var d = document.createElement('div');
		d.innerHTML = this;
		return d.textContent;
	};

	String.prototype.quotemeta = function() {
		return (this+'').replace(/([\$\(\)\*\+\-\.\/\?\[\\\]\^\{\|\}])/g, '\\$1');
	};

	String.prototype.repeat = function(len) {
		return Array(len + 1).join(this);
	};

	String.prototype.trim = function() {
		if (!this.length) { return ''; }

		// remove leading and trailing spaces
		var s = this.replace(/^(\s|\&nbsp;|\xA0)+/i, '');			// remove leading spaces
		return     s.replace(/(\s|\&nbsp;|\xA0)+$/i, '');			// remove trailing spaces
	};

	String.prototype.trimEx = function() {
		if (!this.length) { return ''; }

		// remove leading and trailing spaces
		var s = this.replace(/^(\s|\&nbsp;|\xA0)+/i, '');			// remove leading spaces
			s =    s.replace(/(\s|\&nbsp;|\xA0)+$/i, '');			// remove trailing spaces

			s =    s.replace(/^(<br\/?>\s*)+/i, '');				// remove leading <br> and <br/>
			s =    s.replace(/(\s*<br\/?>)+$/i, '');				// remove trailing <br> and <br/>

			s =    s.replace(/(\s*<p>(<br\/?>)?<\/p>)+$/i, '');		// remove trailing <p></p> and <p><br></p>
			s =    s.replace(/(\s*<br\/?>)+$/i, '');				// remove trailing <br> and <br/> again
		return s;
	};

	String.prototype.zeroPad = function(len) {
		return '0'.repeat(len - this.length) + this;
	};

	Number.prototype.zeroPad = function(len) {
		return this.toString().zeroPad(len);
	};
}

function cloneObject(source) {
	return JSON.parse(JSON.stringify(source));
}

function Compute_Decimal_Coords(str) {
	var m = str.match(/([NS])\s*(\d+)\D+([\d\.]+)\s*([EW])\s*(\d+)\D+([\d\.]+)/);
	if (!m) { return null; }

	var latHem = m[1] === 'N' ? 1 : -1,
		lonHem = m[4] === 'E' ? 1 : -1;
		return {	lat : latHem * ((m[2] - 0) + (m[3] / 60)),
					lon : lonHem * ((m[5] - 0) + (m[6] / 60))
				};
}

function Debug_Log(str) {
	if (DEBUG) {
		var now = new Date();
		console.debug(now.toLocaleTimeString().slice(0, -3) + '.' + now.getMilliseconds().zeroPad(3) + ': ' + str);
	}
}

function Get_Logged_In_Username() {
	// check for new style login block
	var loginNameLink = document.querySelector('a.SignedInProfileLink, a.CommonUsername');
	if (loginNameLink) {
		return loginNameLink.textContent.trim();
	}

	// check for old style login block
	var loginLogoutLink =  document.querySelector('#ctl00_LoginUrl, #ctl00_ContentLogin_uxLoginStatus_uxLoginURL');
	if (loginLogoutLink) {
		loginNameLink = loginLogoutLink.parentNode.getElementsByTagName('a')[0];

		// if logged in, loginNameLink will be the link to the username
		// if not logged in, loginNameLink will be the same as loginLogoutLink
		if (loginLogoutLink != loginNameLink) {
			return loginNameLink.textContent.trim();
		}
	}
	return '';
}

function Get_URL_Parameter(fieldName, theUrl) {
	var parts = (theUrl || document.location).toString().split(/[?#]/);
	var queryString = parts[1];

	var re = new RegExp('(^|&)' + fieldName + '=(.*?)(&|$)', 'i');
	if (queryString.match(re)) {
		return RegExp.$2;
	}
	return '';
}

function LD_addStyle(css, theID) {
	var styleSheet = document.createElement('style');
	styleSheet.type = 'text/css';
	styleSheet.appendChild(document.createTextNode(css));
	if (theID) {
		LD_removeNode(theID);	// no duplicate IDs
		styleSheet.id = theID;
	}
	document.getElementsByTagName('head')[0].appendChild(styleSheet);
}

function LD_removeNode(node) {
	if (typeof node === 'string') {
		node = document.getElementById(node);
	}
	if (node) {
		node.parentNode.removeChild(node);
	}
}

function newElement() {
	if (arguments.length === 1) {
		return document.createTextNode(arguments[0]);
	} else {
		var newNode = document.createElement(arguments[0]),
			newProperties = arguments[1],
			prop, i;
		for (prop in newProperties) {
			if ((prop.indexOf('on') === 0) && (typeof newProperties[prop] === 'function')) {
				newNode.addEventListener(prop.substring(2), newProperties[prop], false);
			} else if (',innerHTML,outerHTML,textContent'.indexOf(','+prop) !== -1) {
				newNode[prop] = newProperties[prop];
			} else if ((',checked,disabled,selected'.indexOf(','+prop) !== -1) && !newProperties[prop]) {
				// value is false, which most browsers do not support, so don't set the property at all
			} else if (/\&/.test(newProperties[prop])) {
				newNode.setAttribute(prop, newProperties[prop].parseHTMLentities());
			} else {
				newNode.setAttribute(prop, newProperties[prop]);
			}
		}
		for (i=2; i<arguments.length; i++) {
			newNode.appendChild(arguments[i]);
		}
		return newNode;
	}
}

function $() {
	return document.getElementById(arguments[0]);
}

function Determine_Website_Language() {
	var selectedLanguage = document.querySelector('.selected-language');
	if (!selectedLanguage) { return 'en'; }

	switch (selectedLanguage.textContent.trim().slice(0, -1)) {
		case 'English'			: return 'en';	// English
		case 'Deutsch'			: return 'de';	// German
		case 'Français'			: return 'fr';	// French
		case 'Português'		: return 'pt';	// Portuguese
		case 'Ceština'			: return 'cs';	// Czech
		case 'Svenska'			: return 'sv';	// Swedish
		case 'Español'			: return 'es';	// Spanish
		case 'Italiano'			: return 'it';	// Italian
		case 'Nederlands'		: return 'nl';	// Dutch
		case 'Català'			: return 'ca';	// Catalan
		case 'Polski'			: return 'pl';	// Polish
		case 'Eesti'			: return 'et';	// Estonian
		case 'Norsk, Bokmål'	: return 'nb';	// Norwegian
		case '한국어'			: return 'ko';	// Korean
		case 'Magyar'			: return 'hu';	// Hungarian
		case 'Română'			: return 'ro';	// Romanian
		default					: return 'en';	// unknown
	}
}

function isNullOrUndefined(value) {
	return (value === null || typeof value === 'undefined');
	// this check is convenient because GM_getValue returns undefined if val doesn't exist, whereas localStorage.getItem returns null
}

function LD_addScript(source) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');

	if ((typeof source === 'string') && (source.substring(0,4) === 'http')) {
		script.src = source;
	} else {
		script.appendChild(document.createTextNode(source.toString()));
	}
	document.getElementsByTagName('head')[0].appendChild(script);
}

function LD_getValue(key, defaultVal, username) {
	if (!isNullOrUndefined(username)) {
		if (URL_Encode(username) !== '') {	// if username is supplied, it must not be blank (i.e. not logged in)
			key += '_' + URL_Encode(username);
		} else {
			return defaultVal;
		}
	}
	var val = localStorage.getItem(SCRIPT_ABBREV + '_' + key);
	return isNullOrUndefined(val) ? defaultVal : val;
}

function LD_setValue(key, val, username) {
	if (!isNullOrUndefined(username)) {
		if (URL_Encode(username) !== '') {	// if username is supplied, it must not be blank (i.e. not logged in)
			key += '_' + URL_Encode(username);
		} else {
			return;
		}
	}
	localStorage.setItem(SCRIPT_ABBREV + '_' + key, val);
}

function URL_Decode(str) {
	str += '';
	return decodeURIComponent(str.replace(/\+/g, ' '));
}

function URL_Encode(str) {
	str = str.replace(/^\s+/,'');		// remove leading spaces
	str = str.replace(/\s+$/,'');		// remove trailing spaces
	str = str.replace(/\s+/g,' ');		// replace interior spaces with single space
	return encodeURIComponent(str).replace(/%20/g, '+');
}

function Check_for_Update() {
	// show current version number on http://www.lildevil.org/greasemonkey/versions
	var versObj = document.getElementById(SCRIPT_ABBREV + '_installed');
	if (versObj) {
		versObj.innerHTML = SCRIPT_VERSION;
		return;
	}

	var referer = document.location.toString().replace(/\?.*$/, ''), // strip query string
		checkURL = 'http://www.lildevil.org/greasemonkey/version-check.php?script=' +
					URL_Encode(SCRIPT_NAME) + '&version=' + SCRIPT_VERSION +
					'&lang=' + CURRENT_LANGUAGE +
					'&referer=' + encodeURIComponent(referer);

	var Check_Update_Response = function(JSONstring) {
		if (RUNNING_AS_EXTENSION) { return; }
			// The extension mechanism does the update checking for us, so don't report
			// anything here. This abort is after the query is sent so I can track
			// feature usage and browser popularity.

		if (!JSONstring) {
			console.log(SCRIPT_NAME, 'Updater: No response');
			return;
		}
		var scriptData = {};
		try {
			scriptData = JSON.parse(JSONstring);
		} catch (err) {
			// compatibility with older browsers (FF3.0, IE7)
			// this is very specialized to work with this known well-formatted JSON string
			// comprised of one non-nested object containing strings only
			var m, re = new RegExp('[{,]"(\\w+)":"(.*?)"', 'g');
			while ((m = re.exec(JSONstring))) {
				scriptData[m[1]] = m[2];
			}
		}
		if (scriptData.days) {
			LD_setValue('Update_Days', scriptData.days);
		} else {
			console.log(SCRIPT_NAME, 'Updater: Unable to parse response');
		}
		if (scriptData.message && scriptData.link) {
			if (window.confirm(URL_Decode(scriptData.message))) {
				scriptData.link = URL_Decode(scriptData.link);
				if (typeof PRO_openInTab !== 'undefined') {
					PRO_openInTab(scriptData.link, 1);
				} else {
					var newWin = window.open(scriptData.link, '_blank');
					if (!newWin || !newWin.top) {
						// popup blocked - open in same window instead
						window.location.href = scriptData.link;
					}
				}
			}
		}
	};
	var Request_PostMessage = function() {
		// If we got an error trying to send xmlhttpRequest,
		// it is probably because this browser doesn't support cross-domain requests
		// so we'll do it another way
		window.addEventListener('message', Check_PostMessage_Response, false);
		LD_addScript(checkURL + '&wrapper=pm');
	};
	var Check_PostMessage_Response = function(message) {
		window.removeEventListener('message', Check_PostMessage_Response, false);
		Check_Update_Response(message.data);
	};

	// avoid a flood of dialogs such as when opening a browser with multiple tabs open
	var now = new Date().getTime();
	var DOSpreventionTime = 2 * 60 * 1000;	// two minutes
	var lastStart = LD_getValue('Update_Start', 0);
	LD_setValue('Update_Start', now.toString());
	if (lastStart && (now - lastStart) < DOSpreventionTime) { return; }

	// time to check yet?
	var oneDay = 24 * 60 * 60 * 1000;
	var lastChecked = LD_getValue('Update_Last', 0);
	var checkDays = parseFloat(LD_getValue('Update_Days', 1));
	if (lastChecked && (now - lastChecked) < (oneDay * (checkDays || 1)) ) { return; }

	try {
		GM_xmlhttpRequest({
			method : 'GET',
			url : checkURL,
			headers : {
				'Referer' : referer,
				'User-Agent' : navigator.userAgent
			},
			onload: function(result) {
				Check_Update_Response(result.responseText);
			},
			onerror: Request_PostMessage
		});
	} catch (err) {
		Request_PostMessage();
	}
	LD_setValue('Update_Last', now.toString());
}
})();
