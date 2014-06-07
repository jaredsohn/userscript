/*
Geocaching Bag-o-Tricks
http://www.lildevil.org/greasemonkey/bag-o-tricks

--------------------------------------------------------------------------------

This is a Greasemonkey user script.

Follow the instructions on http://www.lildevil.org/greasemonkey/
to install Greasemonkey and this user script.

--------------------------------------------------------------------------------
*/

// ==UserScript==
// @name          GC Bag-o-Tricks
// @description   Several small but useful improvements to the Geocaching.com website. Written by Lil Devil.
// @namespace     http://www.lildevil.org/greasemonkey/
// @version       3.0.1
// @copyright     2005-2011 Lil Devil
// @license       Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @attribution   Snippets of code adapted from various scripts at http://gmscripts.locusprime.net/
// @icon          http://www.lildevil.org/greasemonkey/images/BoT-icon.png
// @include       http://www.lildevil.org/greasemonkey/versions
// @include       http*.geocaching.com/
// @include       http*.geocaching.com/default.aspx
// @include       http*.geocaching.com/bookmarks/edit.aspx*
// @include       http*.geocaching.com/bookmarks/mark.aspx*
// @include       http*.geocaching.com/email*
// @include       http*.geocaching.com/hide/report.aspx*
// @include       http*.geocaching.com/login*
// @include       http*.geocaching.com/seek/cache_details.aspx*
// @include       http*.geocaching.com/seek/cdpf.aspx*
// @include       http*.geocaching.com/seek/log.aspx*
// @include       http*.geocaching.com/seek/nearest.aspx*
// @include       http*.geocaching.com/track/details.aspx*
// @include       http*.geocaching.com/track/edit.aspx*
// @include       http*.geocaching.com/hide/wptlist.aspx*
// ==/UserScript==

(function(){

 // the following is for http://www.jshint.com/
/*jshint bitwise:true, browser:true, curly:true, evil:false, forin:true, nomen:true, undef:true */
/*global $ GM_getValue GM_log GM_registerMenuCommand GM_setValue GM_xmlhttpRequest Debug_Log LD_addScript LD_addStyle LD_getValue LD_log LD_removeStyle LD_setValue previousElementSibling xPath XPathResult Add_Prototypes Check_for_Update Check_PostMessage_Response Configure_Checkboxes Determine_Website_Language English_Language_Strings Get_Logged_In_Username Get_Parent Get_URL_Parameter Handle_Disclaimer_User_Menu Handle_Map_User_Menu Hide_Disclaimer Localized_Language_Strings Move_Small_Map PRO_openInTab Process_Email_Page Process_Cache_Page Process_Nearest_Cache_List Process_Travel_Bug_Page Save_Default_States Show_Default_Checkboxes Start_Resize TR Update_Textareas URL_Decode URL_Encode */

var SCRIPT_NAME			= 'GC Bag-o-Tricks',
	SCRIPT_VERSION		= '3.0.1',
	SCRIPT_ABBREV		= SCRIPT_NAME.replace(/[^A-Z]/g, ''),
	RUNNING_AS_EXTENSION= false,
	CURRENT_LANGUAGE	= Determine_Website_Language();

Check_for_Update();

var languageStrings = Localized_Language_Strings(),
	Page_URL = document.location.toString(),
	Login_Name = Get_Logged_In_Username(),
	DEBUG = (Login_Name === 'Lil Devil');

				//	checkbox ID										save for each login name?
var Checkboxes = {	'ctl00_SiteContent_cbRememberMe'						: false,	// login page
					'ctl00_cbRememberMe'									: false,	// front page
					'ctl00_ContentBody_SendMessagePanel1_chkSendAddress'	: true,		// email page
					'ctl00_ContentBody_SendMessagePanel1_chkEmailCopy'		: true,		// email page
					'ctl00_ContentBody_SendMessagePanel1_chkFriendRequest'	: true,		// email page
					'ctl00_ContentBody_chkEarthCacheAgreement'				: true,		// edit cache
					'ctl00_ContentBody_chkUnderstand'						: true,		// edit cache
					'ctl00_ContentBody_chkDisclaimer'						: true		// edit cache
				};

Add_Prototypes();
Configure_Checkboxes();

 // some global vars for drag and drop support
var dragTarget = null;	// The target object
var dragYoffset = 0;	// How much we've moved the element vertically
Update_Textareas();

Process_Cache_Page();
Process_Travel_Bug_Page();
Process_Email_Page();
Process_Nearest_Cache_List();

var uname = $('ctl00_ContentBody_myUsername', 'ctl00_MiniProfile_loginUsername');
if (uname) {
	uname.focus();
}


 // ---------------- Functions --------------------------------

function Add_Prototypes() {
	String.prototype.trim = function() {
		if (!this.length) { return ''; }

		// remove leading and trailing spaces
		var s = this.replace(/^(\s|\&nbsp;|\xA0)+/i, '');
		    s =    s.replace(/(\s|\&nbsp;|\xA0)+$/i, '');
		return s;
	};

	String.prototype.repeat = function(len) {
		return Array(len + 1).join(this);
	};

	String.prototype.zeroPad = function(len) {
		return '0'.repeat(len - this.length) + this;
	};

	Number.prototype.zeroPad = function(len) {
		return this.toString().zeroPad(len);
	};
}

function Process_Cache_Page() {
	if (!/\/seek\/cache_details\.aspx|\/seek\/cdpf\.aspx/.test(Page_URL) ) {	// cache or print-friendly page
		return;
	}
	Debug_Log('Cache Page');

	Hide_Disclaimer(LD_getValue('Hide_Disclaimer', false, Login_Name));
	GM_registerMenuCommand(TR('hide_disclaimer_menuitem'), Handle_Disclaimer_User_Menu);

	var GCcodeObj = $('ctl00_ContentBody_uxWaypointName');
	if (!GCcodeObj) { return; }

	var GCcode = GCcodeObj.textContent.trim();

	// fix waypoint dropdown so user can actually select the waypoint
	// but delay to end of execution queue because another script might be messing with it too
	window.setTimeout(function () {
		if (GCcodeObj.parentNode.nodeName === 'A') {
			GCcodeObj.parentNode.parentNode.insertBefore(GCcodeObj, GCcodeObj.parentNode);
			GCcodeObj.style.color = '#717073';
			GCcodeObj.style.fontSize = '150%';
			GCcodeObj.style.textDecoration = 'none';
		}
	}, 100);

	// adjust some elements and widths to reduce wasted space
	LD_addStyle('#ctl00_ContentBody_lnkConversions, #ctl00_ContentBody_LatLon, ' +
				'#ctl00_ContentBody_lnkPrintDirectionsSimple { white-space:nowrap; }');
	var latLon = $('ctl00_ContentBody_LatLon');
	if (latLon) { latLon.nextSibling.textContent = ' '; } // replace non-breaking space with regular space

	var cacheNameElement = $('ctl00_ContentBody_CacheName');
	if (!cacheNameElement) { return; }

	// do some stuff to the Cache Owner link
	var cacheOwnerElement = xPath('.//a[contains(@href, "/profile")]',
									$('Content'), XPathResult.FIRST_ORDERED_NODE_TYPE);
	if (cacheOwnerElement) {
		// make the owner link open in a new window or tab
		cacheOwnerElement.target = "_blank";

		// add a tooltip to show the actual profile name of the cache owner
		var hiddenByThisUserLink = $('ctl00_ContentBody_uxFindLinksHiddenByThisUser');
		if (hiddenByThisUserLink) {
			var profileName = URL_Decode(Get_URL_Parameter('u', hiddenByThisUserLink.href));
			cacheOwnerElement.title = profileName;
		}

		// add an 'email' link next to the owner name
		var ownerGuid = Get_URL_Parameter('guid', cacheOwnerElement.href);
		if (ownerGuid) {
			var waypointParam = '';
			if (GCcode) {
				waypointParam = '&wpt=' + GCcode;
			}
			var cacheNameParam = '&name=' + URL_Encode(cacheNameElement.textContent);

			var newSpan = document.createElement('span');
			newSpan.style.fontWeight = 'normal';
			newSpan.innerHTML =
				' [<a href="http://' + document.domain + '/email/?guid=' + ownerGuid +
				 waypointParam + cacheNameParam + '" target="_blank">' + TR('email') + '</a>]';

			cacheOwnerElement.parentNode.insertBefore(newSpan,
				cacheOwnerElement.nextSibling);
		}
	}

	// remove some more white space
	var pf = $('ctl00_ContentBody_lnkPrintFriendly');
	if (pf) {
		var br = previousElementSibling(pf.parentNode);
		if (br.nodeName === 'BR') {
			br.style.display = 'none';		// hide extra linefeed after "Print:"
		}
	}

	// make the buttons stay under the map
	var gpxButton = $('ctl00_ContentBody_btnGPXDL');
	if (gpxButton) {
		gpxButton.parentNode.style.clear = 'right';
	}

	// On the cache page, move the small map.
	if (Move_Small_Map(LD_getValue('Move_Small_Map', false, Login_Name))) {
		GM_registerMenuCommand(TR('move_small_map_menuitem'), Handle_Map_User_Menu);
	}
}

function Process_Travel_Bug_Page() {
	var bugNameElement = $('ctl00_ContentBody_lbHeading');
	var bugOwnerElement = $('ctl00_ContentBody_BugDetails_BugOwner');
	if (!bugNameElement || !bugOwnerElement) { return; }
	Debug_Log('Travel Bug Page');

	// make the owner link open in a new window or tab
	bugOwnerElement.target = "_blank";

	// Add an 'email' link next to the owner name on travel bug pages
	var ownerGuid = Get_URL_Parameter('guid', bugOwnerElement.href);
	if (ownerGuid) {
		var bugIDparam = '';
		var bugIDline = $('ctl00_ContentBody_BugDetails_BugTBNum');
		if (bugIDline) {
			var bugID = bugIDline.getElementsByTagName('strong');
			if (bugID) {
				bugIDparam = '&wpt=' + URL_Encode(bugID[0].textContent);
			}
		}
		var bugNameParam = '&name=' + URL_Encode(bugNameElement.textContent);

		var newSpan = document.createElement('span');
		newSpan.innerHTML =
			' [<a href="http://' + document.domain + '/email/?guid=' + ownerGuid +
			 bugIDparam + bugNameParam + '" target="_blank">' + TR('email') + '</a>]';

		bugOwnerElement.parentNode.insertBefore(newSpan, bugOwnerElement.nextSibling);
	}
}

function Process_Email_Page() {
	var emailSubject = $('ctl00_ContentBody_SendMessagePanel1_tbSubject',
						'ctl00_ContentBody_SendMessagePanel1_tbMessage');
	var emailMessage = $('ctl00_ContentBody_SendMessagePanel1_tbMessage');
	if (!emailMessage) { return; }
	Debug_Log('Email Page');

	// Fill in some default info in the email box.
	var urlWaypoint = URL_Decode(Get_URL_Parameter('wpt'));
	var urlName = URL_Decode(Get_URL_Parameter('name'));
	if ((urlWaypoint) || (urlName)) {
		emailSubject.value = TR('regarding') + ' ' + urlWaypoint + ' ' + urlName;
		if (emailSubject.isSameNode(emailMessage)) {
			emailMessage.value += '\n\n';
		}
	}

	// default behavior on focus is to clear the box
	// change to match behavior onchange, which is to update the character count.
	emailMessage.setAttribute('onfocus', emailMessage.getAttribute('onchange'));
	emailMessage.focus();
}

function Update_Textareas() {
	var dragIcon = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAABUAAAAGAgMAAABROz0wAAAAA3NCSVQICAjb4U/gAAAADFBMVEWwuL//' +
				'///39/eyub9nsXv9AAAABHRSTlP/AP//07BylAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3Jl' +
				'YXRpb24gVGltZQAwNy8yMS8wN4dieEgAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtz' +
				'IDi1aNJ4AAAAMElEQVQImWNwDBF1DGFgaIwQbYxgYFgaFbo0yoEhlDUglNWBIYw1IQxETc0Mm+oAANc3' +
				'CrOvsJfnAAAAAElFTkSuQmCC';
	var m = window.chrome ? '-4px' : '-2px';
	LD_addStyle('div textarea.Textarea { width:99% !important; }' + // widen all textareas to 99% of window width
				'#ctl00_ContentBody_WaypointEdit_uxViewMethod { width:100%; }' +
				'.LD_resize_handle { background-image:url("' + dragIcon + '");' +
									'cursor:s-resize; height:6px; width:21px;' +
									'margin:' + m + ' auto 0; }');

	var textareas = document.getElementsByTagName('textarea'),
		len=textareas.length;
	for (var i=0; i<len; i++) {
		var newDiv = document.createElement('div');
		newDiv.className = 'LD_resize_handle';
		newDiv.addEventListener('mousedown', Start_Resize, false);
		textareas[i].parentNode.insertBefore(newDiv, textareas[i].nextSibling);
	}
}

 // drag support adapted from http://www.hunlock.com/blogs/Javascript_Drag_and_Drop
function Resize_Handler(e){
	if (!e) { e = window.event; }
	dragTarget.style.height = e.clientY - dragYoffset + 'px';
	e.preventDefault();
}

function End_Resize(e) {
	document.removeEventListener('mousemove', Resize_Handler, false);
	document.removeEventListener('mouseup', End_Resize, false);
	LD_removeStyle('drag-cursor');
}

function Start_Resize(e){
	if (!e) { e = window.event; }
	dragTarget = (e.target || e.srcElement).previousSibling;
	if (e.button === 0 && dragTarget.nodeName == 'TEXTAREA') {
		LD_addStyle('* { cursor:s-resize; }', 'drag-cursor');
		dragYoffset = e.clientY - dragTarget.clientHeight;

		document.addEventListener('mousemove', Resize_Handler, false);
		document.addEventListener('mouseup', End_Resize, false);
		e.preventDefault();
	}
}

function Process_Nearest_Cache_List() {
	var header = $('ctl00_ContentBody_LocationPanel1_OriginLabel'),
		username;
	if (header && $('ctl00_ContentBody_SearchResultText')) {
		Debug_Log('Nearest Cache Page');

		// if this is a search of a user's hides/finds, change the name into a link to the profile
		var m = header.firstChild.textContent.indexOf('User: ');
		// for some reason "User:" is not translated (so far)
		if (m > 0) {
			var usernameObj = header.firstChild.splitText(m + 6);
			username = usernameObj.textContent.trim();
			var userLink = document.createElement('a');
			userLink.href = 'http://www.geocaching.com/profile/?u=' + URL_Encode(username);
			userLink.textContent = username;
			header.replaceChild(userLink, usernameObj);
		}

		// add link to turn filter on/off
		if (document.location.search && !Get_URL_Parameter('pq') && (username !== Login_Name) ) {
			// don't add this if previewing a PQ, or looking at one's own hides or finds.

			var parts = document.location.toString().split(/[?#]/),
				queryString = parts[1];

			// Remove any existing filter params.
			queryString = queryString.replace(/(^|&)f=.*?(?=&|$)/ig, '');
			queryString = queryString.replace(/^&+/, '');

			var filterApplied = (Get_URL_Parameter('f') !== ''), // any non-blank value means filter is applied
				noticeText = 'hides_excluded',
				linkText = 'include_them';
			if (!filterApplied) {
				noticeText = 'hides_included';
				linkText = 'exclude_them';
				queryString += '&f=1';
			}

			// move the UtilityNav to before the header
			header.parentNode.parentNode.insertBefore($('UtilityNav'), header.parentNode);
			header.parentNode.removeAttribute('class');

			// create new filter link
			var filterLink = document.createElement('a');
			filterLink.href = parts[0] + '?' + queryString + (parts[2] ? ('#' + parts[2]) : '');
			filterLink.appendChild(document.createTextNode(TR(linkText)));
			var newFilter = document.createElement('p');
			newFilter.appendChild(document.createTextNode(TR(noticeText) + ' '));
			newFilter.appendChild(filterLink);
			newFilter.className = 'NoBottomSpacing';

			// add the filter link after the header
			header.parentNode.parentNode.insertBefore(newFilter, header.parentNode.nextSibling);
		}
	}
}

function URL_Encode(str) {
	str = str.replace(/^\s+/,'');		// remove leading spaces
	str = str.replace(/\s+$/,'');		// remove trailing spaces
	str = str.replace(/\s+/g,' ');		// replace interior spaces with single space
	return encodeURIComponent(str).replace(/%20/g, '+');
}

function URL_Decode(str) {
	str += '';
	return decodeURIComponent(str.replace(/\+/g, ' '));
}

function Get_Logged_In_Username() {
	var loggedInLink = xPath('//a[contains(@class, "SignedInProfileLink") or contains(@class, "CommonUsername")]',
							document, XPathResult.FIRST_ORDERED_NODE_TYPE);
	if (loggedInLink) {
		return (loggedInLink.textContent || loggedInLink.innerText).trim();
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

function Handle_Disclaimer_User_Menu() {
	var pref = LD_getValue('Hide_Disclaimer', false, Login_Name);
	var str =	TR(pref ? 'disclaimer_hidden' : 'disclaimer_shown') + ' ' +
				TR('disclaimer_applies') + '\n\n' +
				TR(pref ? 'ok_show_disclaimer' : 'ok_hide_disclaimer') + '\n' +
				TR(pref ? 'cancel_hide_disclaimer' : 'cancel_show_disclaimer');
	var change = window.confirm(str);
	if (change) {
		pref = !pref;
		LD_setValue('Hide_Disclaimer', pref, Login_Name);
		Hide_Disclaimer(pref);
	}
}

function Hide_Disclaimer(mode) {
	if (mode) {
		LD_addStyle('.CacheDisclaimerTable, .DisclaimerWidget, .TermsWidget ' +
					'{ display:none; }', 'BoT_hide_disclaimer');
	} else {
		LD_removeStyle('BoT_hide_disclaimer');
	}
}

function Handle_Map_User_Menu() {
	var pref = LD_getValue('Move_Small_Map', false, Login_Name);
	var str =	TR (pref ? 'map_moved' : 'map_normal') + '\n' +
				TR ('map_move_why') + '\n\n' +
				TR (pref ? 'ok_map_right' : 'ok_map_left') + '\n' +
				TR ('cancel_leave_map');
	var change = window.confirm(str);
	if (change) {
		pref = !pref;
		LD_setValue('Move_Small_Map', pref, Login_Name);
		Move_Small_Map(pref);
	}
}

function Move_Small_Map(mode) {
	var smallMap = $('lnkSmallMap');
	if (smallMap) {
		if (mode && smallMap.parentNode.nodeName === 'P') {
			var mapDiv = $('BoTnewMapDiv');
			if (!mapDiv) {
				var CacheInformationTable = xPath('//div[contains(@class, "CacheInformationTable")]',
										document, XPathResult.FIRST_ORDERED_NODE_TYPE);

				// create new div to hold map
				mapDiv = document.createElement('div');
				mapDiv.id = 'BoTnewMapDiv';
				mapDiv.style.cssFloat = 'right';
				CacheInformationTable.insertBefore(mapDiv, CacheInformationTable.firstChild);

				// remember the old location so we can move it back later
				smallMap.parentNode.id = 'BoToriginalMapLocation';
			}

			// move the map into the new cell
			mapDiv.appendChild(smallMap);
		}
		else if (!mode && smallMap.parentNode.nodeName === 'DIV') {
			var originalMapLocation = $('BoToriginalMapLocation');
			originalMapLocation.appendChild(smallMap);
		}
		return true;
	} else {
		return false;
	}
}

function Configure_Checkboxes() {
	var boxName;
	for (boxName in Checkboxes) {
		if (Checkboxes.hasOwnProperty(boxName)) {
			var box = $(boxName);
			if (box) {
				box.addEventListener('click', Show_Default_Checkboxes, false);

				// if we're looking at the friend request checkbox,
				// but we came here from the "add as friend" link, then skip it
				if (boxName.match(/chkFriendRequest/) && (Get_URL_Parameter('addfriend') === 'y') ) {
					continue;
				}

				var boxCheck;
				if (Checkboxes[boxName]) {
					boxCheck = LD_getValue(boxName, undefined, Login_Name);
				} else {
					boxCheck = LD_getValue(boxName, undefined);
				}

				if (boxCheck !== undefined) {
					box.checked = boxCheck;
				}
			}
		}
	}
}

function Save_Default_States() {
	var boxName;
	for (boxName in Checkboxes) {
		if (Checkboxes.hasOwnProperty(boxName)) {
			var defBox = $(boxName + '_default');
			if (defBox && defBox.checked) {
				var box = $(boxName);
				if (Checkboxes[boxName]) {
					LD_setValue(boxName, box.checked, Login_Name);
				} else {
					LD_setValue(boxName, box.checked);
				}
			}
		}
	}
}

function Show_Default_Checkboxes() {
	this.removeEventListener('click', Show_Default_Checkboxes, false);
	var defBox   = document.createElement('input');
	defBox.type  = 'checkbox';
	defBox.id    = this.id + '_default';
	var defLabel = document.createElement('label');
	defLabel.style.paddingLeft = '1.7em';
	defLabel.appendChild(defBox);
	defLabel.appendChild(document.createTextNode(' ' + TR('save_as_default')));

	var dest = this.parentNode;
	dest.appendChild(document.createElement('br'));
	dest.appendChild(defLabel);

	var parentForm = Get_Parent(this, 'form');
	if (!parentForm.hasAttribute('default_checkbox_handler_added')) {
		parentForm.addEventListener('submit', Save_Default_States, false);
		parentForm.setAttribute('default_checkbox_handler_added', 'true');
	}
}

function $() {
	if (arguments.length === 1) {
		return document.getElementById(arguments[0]);
	}
	var element, i, len=arguments.length;
	for (i=0; i<len; i++) {
		element = document.getElementById(arguments[i]);
		if (element) {
			return element;
		}
	}
	return undefined;
}

function xPath(expr, context, typ) {
	var result = document.evaluate(	(expr || '//body'),
									(context || document),
									null,
									(typ || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE),
									null);
	switch (typ) {
		case XPathResult.NUMBER_TYPE: return result.numberValue;
		case XPathResult.STRING_TYPE: return result.stringValue;
		case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
		case XPathResult.ANY_UNORDERED_NODE_TYPE:
		case XPathResult.FIRST_ORDERED_NODE_TYPE: return result.singleNodeValue;
		default: return result;
	}
}

function Get_Parent(thisNode) {
	// return a node's parent of a certain type. if not found, return null
	if (!thisNode || !thisNode.parentNode) { return thisNode; }
	if (arguments.length < 2) { return thisNode.parentNode; }

	for (var i=1; i < arguments.length; i++) {
		var nodeNameToLookFor = arguments[i].toLowerCase();
		do {
			thisNode = thisNode.parentNode;
		} while (thisNode && (thisNode.nodeName.toLowerCase() !== nodeNameToLookFor));
	}
	return thisNode;
}

function firstElementChild(p) {
	if (typeof(p.firstElementChild) != 'undefined') {
		return p.firstElementChild;
	} else {
		var child = p.firstChild;
		while (child && child.nodeType !== 1) {
			child = child.nextSibling;
		}
		return child;
	}
}

function nextElementSibling(p) {
	if (typeof(p.nextElementSibling) != 'undefined') {
		return p.nextElementSibling;
	} else {
		var sibling = p.nextSibling;
		while (sibling && sibling.nodeType !== 1) {
			sibling = sibling.nextSibling;
		}
		return sibling;
	}
}

function previousElementSibling(p) {
	if (typeof(p.previousElementSibling) !== 'undefined') {
		return p.previousElementSibling;
	} else {
		var sibling = p.previousSibling;
		while (sibling && sibling.nodeType !== 1) {
			sibling = sibling.previousSibling;
		}
		return sibling;
	}
}

function LD_setValue(key, val, username) {
	if (typeof username != 'undefined') {
		if (username !== '') {	// if username is supplied, it must not be blank (i.e. not logged in)
			key += '_' + URL_Encode(username);
		} else {
			return;
		}
	}
	try {
		// the emulation code uses a 3rd parameter but Greasemonkey throws an error with it
		GM_setValue(key, val, SCRIPT_ABBREV);
	} catch (err) {
		GM_setValue(key, val);
	}
}

function LD_getValue(key, defaultVal, username) {
	if (typeof username != 'undefined') {
		if (username !== '') {	// if username is supplied, it must not be blank (i.e. not logged in)
			key += '_' + URL_Encode(username);
		} else {
			return defaultVal;
		}
	}
	return GM_getValue(key, defaultVal, SCRIPT_ABBREV);
}

function LD_removeStyle(theID) {
	var styleSheet = document.getElementById(theID);
	if (styleSheet) {
		styleSheet.parentNode.removeChild(styleSheet);
	}
}

function LD_addStyle(css, theID) {
	var styleSheet = document.createElement('style');
	styleSheet.type = 'text/css';
	styleSheet.appendChild(document.createTextNode(css));
	if (theID) {
		LD_removeStyle(theID);	// no duplicate IDs
		styleSheet.id = theID;
		styleSheet.title = theID;
	}
	document.getElementsByTagName('head')[0].appendChild(styleSheet);
}

function LD_addScript(source) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');

	if ((typeof source == 'string') && (source.substring(0,4) === 'http')) {
		script.src = source;
	} else {
		script.appendChild(document.createTextNode(source.toString()));
	}
	document.getElementsByTagName('head')[0].appendChild(script);
}

function LD_log(str) {
	GM_log(str, SCRIPT_NAME);
}

function Debug_Log(str) {
	if (DEBUG) {
		var now = new Date();
		GM_log(now.toLocaleTimeString().slice(0, -3) + '.' + now.getMilliseconds().zeroPad(3) + ': ' + str);
	}
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
					'&lang=' + CURRENT_LANGUAGE + '&referer=' + encodeURIComponent(referer);

	var Check_Update_Response = function(JSONstring) {
		if (RUNNING_AS_EXTENSION) { return; }
			// The extension mechanism does the update checking for us, so don't report
			// anything here. This abort is after the query is sent so I can track
			// feature usage and browser popularity.

		if (!JSONstring) {
			LD_log('Updater: No response');
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
			LD_log('Updater: unable to parse response');
		}
		if (scriptData.message && scriptData.link) {
			if (window.confirm(URL_Decode(scriptData.message))) {
				scriptData.link = URL_Decode(scriptData.link);
				if (typeof PRO_openInTab != 'undefined') {
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

function TR(str) {
	str = str.toLowerCase();
	if (languageStrings[str]) {
		return languageStrings[str];
	}
	var english = English_Language_Strings();
	if (english[str]) {
		return english[str];
	}
	return '!' + str.substr(0, 1).toUpperCase() + str.substr(1);
}


function Determine_Website_Language() {
	var selected_language = $('selected_language');
	if (!selected_language) { return 'en'; }
	switch (selected_language.textContent.trim().slice(0, -1)) {
		case 'English'			: return 'en';	// English
		case 'Català'			: return 'ca';	// Catalan
		case 'Čeština'			: return 'cs';	// Czech
		case 'Deutsch'			: return 'de';	// German
		case 'Español'			: return 'es';	// Spanish
		case 'Eesti'			: return 'et';	// Estonian
		case 'Français'			: return 'fr';	// French
		case '한국어'				: return 'ko';	// Korean
		case 'Norsk, Bokmål'	: return 'nb';	// Norwegian
		case 'Nederlands'		: return 'nl';	// Dutch
		case 'Polski'			: return 'pl';	// Polish
		case 'Português'		: return 'pt';	// Portuguese
		case 'Svenska'			: return 'sv';	// Swedish
		default					: return 'en';	// unknown
	}
}

function English_Language_Strings() {
	return {	// English
		"cancel_hide_disclaimer": "Click Cancel to continue hiding the disclaimer.",
		"cancel_leave_map": "Click Cancel to leave the small map where it is.",
		"cancel_show_disclaimer": "Click Cancel to continue showing the disclaimer.",
		"disclaimer_applies": "Note that even when it is hidden, it still applies, and you still agree to it in order to use the geocaching.com website.",
		"disclaimer_hidden": "The disclaimer that normally appears on this page is currenly hidden.",
		"disclaimer_shown": "You can hide the disclaimer that appears on this page.",
		"email": "email",
		"exclude_them": "Exclude them.",
		"hide_disclaimer_menuitem": "Bag-o-Tricks: Hide Disclaimer?",
		"hides_excluded": "Your hides and finds are currently excluded from the results below.",
		"hides_included": "Your hides and finds are currently included in the results below.",
		"include_them": "Include them.",
		"map_move_why": "If your display is very wide, this is a better use of screen space.",
		"map_moved": "The small map is currently relocated from the right-hand side of the page to within the coordinate box.",
		"map_normal": "You can relocate the small map from the right-hand side of the page to within the coordinate box.",
		"move_small_map_menuitem": "Bag-o-Tricks: Move Small Map?",
		"ok_hide_disclaimer": "Click OK to hide the disclaimer.",
		"ok_map_left": "Click OK to move the small map to within the coordinate box.",
		"ok_map_right": "Click OK to move the small map to the right-hand side of the page.",
		"ok_show_disclaimer": "Click OK to show the disclaimer.",
		"regarding": "Regarding",
		"save_as_default": "Save as default."
	};
}

function Localized_Language_Strings() {
	switch (CURRENT_LANGUAGE) {
		case "ca" : return {	// Català - Catalan
		};
		case "cs" : return {	// Čeština - Czech
			"cancel_hide_disclaimer": "Zvolte STORNO pro ponechání zásad zřeknutí se odpovědnosti skrytých.",
			"cancel_leave_map": "Pro ponechání minimapy v původní lokalitě zvolte STORNO.",
			"cancel_show_disclaimer": "Zvolte STORNO pro ponechání zásad zřeknutí se odpovědnosti zobrazených.",
			"disclaimer_applies": "Pamatujte, že i když budou zásady skryty, stále s nimi při používání webu geocaching.com souhlasíte.",
			"disclaimer_hidden": "Zásady zřeknutí se odpovědnosti jsou v současnosti skryty.",
			"disclaimer_shown": "Na této stránce je možné skrýt zásady zřeknutí se odpovědnosti.",
			"email": "e-mail",
			"exclude_them": "Nezobrazovat je.",
			"hide_disclaimer_menuitem": "Bag-o-Tricks: Skrýt zásady zřeknutí se odpovědnosti?",
			"hides_excluded": "Tvoje založené a nalezené keše jsou vyřazeny z výsledků vyhledávání.",
			"hides_included": "Tvoje založené a nalezené keše jsou ve výsledcích vyhledávání zobrazovány.",
			"include_them": "Zobrazovat je.",
			"map_move_why": "Pokud máš široký displej, je toto nastavení vhodnější pro ušetření místa na obrazovce.",
			"map_moved": "Minimapa je momentálně přesunuta z pravé strany dovnitř rámečku se souřadnicemi.",
			"map_normal": "Je možné přesunout minimapu z pravé strany dovnitř rámečku se souřadnicemi.",
			"move_small_map_menuitem": "Bag-o-Tricks: Přesunout minimapu?",
			"ok_hide_disclaimer": "Pro skrytí zásad zřeknutí se odpovědnosti zvolte OK.",
			"ok_map_left": "Pro přesunutí minimapy do rámečku se souřadnicemi zvolte OK.",
			"ok_map_right": "Pro přesunutí minimapy na pravou stranu stránky zvolte OK.",
			"ok_show_disclaimer": "Pro zobrazení zásad zřeknutí se odpovědnosti zvolte OK.",
			"regarding": "Týkající se",
			"save_as_default": "Nastavit jako výchozí."
		};
		case "de" : return {	// Deutsch - German
			"cancel_hide_disclaimer": "Drücke ABBRECHEN, um den Haftungsausschluss weiterhin zu verstecken.",
			"cancel_leave_map": "Drücke ABBRECHEN, um die Übersichtskarte an ihrem aktuellen Ort zu belassen.",
			"cancel_show_disclaimer": "Drücke ABBRECHEN, um den Haftungsausschluss weiterhin anzuzeigen.",
			"disclaimer_applies": "Beachte, dass selbst wenn er versteckt ist, er dennoch zutrifft und du ihm für die Nutzung von geocaching.com weiterhin zustimmst.",
			"disclaimer_hidden": "Der Haftungsausschluss, welcher normalerweise auf dieser Seite angezeigt wird, ist momentan versteckt.",
			"disclaimer_shown": "Du kannst den Haftungsausschluss, der auf dieser Seite erscheint, verstecken.",
			"email": "E-Mail",
			"exclude_them": "Schließe sie aus.",
			"hide_disclaimer_menuitem": "Bag-o-Tricks: Haftungsausschluss verstecken?",
			"hides_excluded": "Deine versteckten und gefundenen Caches sind momentan von der Suche ausgeschlossen.",
			"hides_included": "Deine versteckten und gefundenen Caches sind momentan in der Suche mit eingeschlossen.",
			"include_them": "Schließe sie mit ein.",
			"map_move_why": "Wenn dein Bildschirm sehr breit ist, wird der Platz so besser ausgenutzt.",
			"map_moved": "Die Übersichtskarte ist momentan von der rechten Seite in die Koordinatenbox verschoben.",
			"map_normal": "Du kannst die Übersichtskarte von der rechten Seite in die Koordinatenbox verschieben.",
			"move_small_map_menuitem": "Bag-o-Tricks: Übersichtskarte verschieben?",
			"ok_hide_disclaimer": "Drücke OK, um den Haftungsausschluss zu verstecken.",
			"ok_map_left": "Drücke OK, um die Übersichtskarte in die Koordinaten-Box zu verschieben.",
			"ok_map_right": "Drücke OK, um die Übersichtskarte rechtsbündig auf der Seite anzuzeigen.",
			"ok_show_disclaimer": "Drücke OK, um den Haftungsausschluss anzuzeigen.",
			"regarding": "Betrifft",
			"save_as_default": "Als Standard speichern."
		};
		case "es" : return {	// Español - Spanish
		};
		case "et" : return {	// Eesti - Estonian
		};
		case "fr" : return {	// Français - French
			"cancel_hide_disclaimer": "Cliquez sur ANNULER pour continuer à masquer l'avertissement.",
			"cancel_leave_map": null,
			"cancel_show_disclaimer": "Cliquez sur ANNULER pour continuer à afficher l'avertissement.",
			"disclaimer_applies": "Notez que même s'il est caché, il s'applique toujours, et vous que vous êtes toujours d'accord avec ce dernier dans le cadre de l'utilisation du site geocaching.com.",
			"disclaimer_hidden": "L'avertissement qui apparaît normalement sur cette page est actuellement masqué.",
			"disclaimer_shown": "Vous pouvez masquer l'avertissement qui apparaît sur cette page.",
			"email": "e-mail",
			"exclude_them": "les exclure.",
			"hide_disclaimer_menuitem": null,
			"hides_excluded": "Vos caches trouvées et cachées sont actuellement exclues des résultats ci-dessous.",
			"hides_included": "Vos caches trouvées et cachées sont  actuellement incluses dans les résultats ci-dessous.",
			"include_them": "Incluez-les.",
			"map_move_why": "Si votre écran est très large, c'est une meilleure utilisation de l'espace de l'écran.",
			"map_moved": "La petite carte est actuellement déplacé du côté droit de la page vers la boîte de coordonnées.",
			"map_normal": "Vous pouvez déplacer la petite carte du côté droit de la page vers la boîte de coordonnées.",
			"move_small_map_menuitem": null,
			"ok_hide_disclaimer": "Cliquez sur OK pour masquer l'avertissement.",
			"ok_map_left": "Cliquez sur OK pour déplacer la petite carte vers la boîte de coordonnées.",
			"ok_map_right": "Cliquez sur OK pour déplacer la petite carte à la droite de la page.",
			"ok_show_disclaimer": "Cliquez sur OK pour afficher l'avertissement.",
			"regarding": "En ce qui concerne",
			"save_as_default": "Enregistrer comme défaut."
		};
		case "ko" : return {	// Korean
		};
		case "nb" : return {	// Norsk, Bokmål - Norwegian
		};
		case "nl" : return {	// Nederlands - Dutch
			"cancel_hide_disclaimer": "Klik op Annuleren om de disclaimer te blijven verbergen.",
			"cancel_leave_map": "Klik op Annuleren om de kleine kaart te laten waar hij is.",
			"cancel_show_disclaimer": "Klik op Annuleren om verder te gaan met de disclaimer.",
			"disclaimer_applies": "Merk op dat ondanks dat hij verborgen is, hij nog steeds van toepassing is en dat je er nog steeds mee instemt om de geocaching.com website te mogen gebruiken.",
			"disclaimer_hidden": "De disclaimer die normaliter op deze pagina getoond wordt, is op het moment verborgen.",
			"disclaimer_shown": "Je kunt de disclaimer die op deze pagina getoond wordt verbergen.",
			"email": "e-mail",
			"exclude_them": "Verberg ze.",
			"hide_disclaimer_menuitem": "Bag-o-Tricks: Verberg Disclaimer?",
			"hides_excluded": "Je verborgen en gevonden caches worden in de resultaten hieronder niet getoond.",
			"hides_included": "Je verborgen en gevonden caches worden in de resultaten hieronder getoond.",
			"include_them": "Toon ze.",
			"map_move_why": "Als je beeldscherm erg breed is, is dit een beter gebruik van schermruimte.",
			"map_moved": "De kleine kaart is op het moment verplaatst van de rechterkant van de pagina naar het coördinaten blok.",
			"map_normal": "Je kunt de kleine kaart van de rechterkant van de pagina naar het coördinaten blok verplaatsen.",
			"move_small_map_menuitem": "Bag-o-Tricks: Verplaats kleine kaart?",
			"ok_hide_disclaimer": "Klik OK om de disclaimer te verbergen.",
			"ok_map_left": "Klik OK om de kleine kaart naar het coördinaten blok te verplaatsen.",
			"ok_map_right": "Klik OK om de kleine kaart naar de rechterkant van de pagina te verplaatsen.",
			"ok_show_disclaimer": "Klik OK om de disclaimer te tonen.",
			"regarding": "Betreft",
			"save_as_default": "Opslaan als standaard."
		};
		case "pl" : return {	// Polski - Polish
			"cancel_hide_disclaimer": "Kliknij ANULUJ by w dalszym ciągu ukrywać zastrzeżenia.",
			"cancel_leave_map": "Kliknij ANULUJ by pozostawić małą mapę tam gdzie jest.",
			"cancel_show_disclaimer": "Kliknij ANULUJ by w dalszym ciągu wyświetlać zastrzeżenia.",
			"disclaimer_applies": "Zwróć uwagę, że nawet gdy zastrzeżenia są ukryte, to nadal one obowiązują i nadal zgadzasz się z nimi korzystając z serwisu Geocaching.com",
			"disclaimer_hidden": "Zastrzeżenia, które normalnie znajdują się na tej stronie, aktualnie są ukryte.",
			"disclaimer_shown": "Możesz ukryć zastrzeżenia, które wyświetlane są na tej stronie.",
			"email": "e-mail",
			"exclude_them": "Wyklucz je.",
			"hide_disclaimer_menuitem": "Bag-o-Tricks: Ukryć zastrzeżenia?",
			"hides_excluded": "Twoje ukrycia i znalezienia są aktualnie pominięte w poniższych wynikach.",
			"hides_included": "Twoje ukrycia i znalezienia są aktualnie zawarte w poniższych wynikach.",
			"include_them": "Zawierz je.",
			"map_move_why": "Jeżeli twój monitor jest bardzo szeroki, to jest lepsze wykorzystanie miejsca na ekranie.",
			"map_moved": "Mała mapa jest aktualnie przeniesiona z prawej strony strony do pola ze współrzędnymi.",
			"map_normal": "Możesz przenieść małą mapę z prawej strony strony do pola ze współrzędnymi.",
			"move_small_map_menuitem": "Bag-o-Tricks: Przenieść małą mapę?",
			"ok_hide_disclaimer": "Kliknij OK, aby ukryć zastrzeżenia.",
			"ok_map_left": "Kliknij OK by przenieść małą mapę to pola ze współrzędnymi.",
			"ok_map_right": "Kliknij OK by przenieść małą mapę na prawą stronę strony.",
			"ok_show_disclaimer": "Kliknij OK, aby wyświetlić zastrzeżenia.",
			"regarding": "Odnośnie do",
			"save_as_default": "Zapisz jako domyślne."
		};
		case "pt" : return {	// Português - Portuguese
			"cancel_hide_disclaimer": "Clique em CANCELAR para continuar a esconder o aviso.",
			"cancel_leave_map": "Clique em CANCELAR para deixar o mapa pequeno onde está.",
			"cancel_show_disclaimer": "Clique em CANCELAR para continuar a exibir o aviso.",
			"disclaimer_applies": "Repare que mesmo escondido, continua a ser aplicado e é necessário que concorde com o mesmo para utilizar o geocaching.com.",
			"disclaimer_hidden": "O aviso que normalmente aparece nesta página está actualmente escondido.",
			"disclaimer_shown": "Pode esconder o aviso que aparece nesta página.",
			"email": "email",
			"exclude_them": "Excluí-los",
			"hide_disclaimer_menuitem": "Bag-o-Tricks: Esconder Aviso?",
			"hides_excluded": "As suas caches encontradas e escondidas estão excluídas dos resultados abaixo.",
			"hides_included": "As suas caches encontradas e escondidas estão incluídas dos resultados abaixo.",
			"include_them": "Incluí-los.",
			"map_move_why": "Se o seu ecrã é demasiado largo, isto garante uma melhor utilização do espaço.",
			"map_moved": "O mapa pequeno foi colocado dentro da caixa das coordenadas, em vez de estar do lado direito da página.",
			"map_normal": "Pode colocar o mapa pequeno na caixa das coordenadas, em vez de estar do lado direito da página.",
			"move_small_map_menuitem": "Bag-o-Tricks: Mover Mapa Pequeno?",
			"ok_hide_disclaimer": "Clique em OK para esconder o aviso.",
			"ok_map_left": "Clique em OK para mover o mapa pequeno para a caixa das coordenadas.",
			"ok_map_right": "Clique em OK para mover o mapa pequeno para o lado direito da página.",
			"ok_show_disclaimer": "Clique em OK para exibir o aviso.",
			"regarding": "Sobre",
			"save_as_default": "Guardar como pré-definido."
		};
		case "sv" : return {	// Svenska - Swedish
			"cancel_hide_disclaimer": "Klicka på Avbryt för att fortsätta dölja ansvarsfriskrivning.",
			"cancel_leave_map": "Klicka på Avbryt för att lämna den lilla kartan där den är.",
			"cancel_show_disclaimer": "Klicka på Avbryt för att fortsätta visa ansvarsfriskrivningen.",
			"disclaimer_applies": "Observera att även om den är dold, gäller den fortfarande och du godkänner den den för att kunna använda sajten geocaching.com",
			"disclaimer_hidden": "Ansvarsfriskrivningen som normalt visas på denna sida är för närvarande dold.",
			"disclaimer_shown": "Du kan dölja ansvarsfriskrivningen på denna sida.",
			"email": "E-post",
			"exclude_them": "Exkludera dem.",
			"hide_disclaimer_menuitem": "Bag-o-Tricks: Dölj ansvarsfriskrivning?",
			"hides_excluded": "Dina hittade och gömda är för närvarande exkluderade från resultatet nedan.",
			"hides_included": "Dina hittade och gömda är för närvarande inkluderade i resultatet nedan.",
			"include_them": "Inkludera dem.",
			"map_move_why": "Om din skärm är väldigt bred är ger detta ett bättre utnyttjande av skärmutrymmet.",
			"map_moved": "Den lilla kartan är för närvarande flyttad från högerkanten in till koordinatrutan.",
			"map_normal": "Du kan flytta den lilla kartan från högerkanten in till koordinatrutan.",
			"move_small_map_menuitem": "Bag-o-Tricks: Flytta den lilla kartan?",
			"ok_hide_disclaimer": "Klicka OK för att gömma ansvarsfriskrivningen.",
			"ok_map_left": "Klicka på OK för att flytta den lilla kartan in till koordinatrutan.",
			"ok_map_right": "Klicka på OK för att flytta den lilla kartan till högerkanten.",
			"ok_show_disclaimer": "Klicka på OK för att visa ansvarsfriskrivningen.",
			"regarding": "Beträffande",
			"save_as_default": "Spara som förval"
		};
		default   : return English_Language_Strings();
	}
}
})();
