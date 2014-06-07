/*
Geocaching Travel Bug List Order
http://www.lildevil.org/greasemonkey/travel-bug-list-order

--------------------------------------------------------------------------------

This is a Greasemonkey user script.

Follow the instructions on http://www.lildevil.org/greasemonkey/
to install Greasemonkey and this user script.

--------------------------------------------------------------------------------
*/

// ==UserScript==
// @name          GC Travel Bug List Order
// @description   Reorders the list of Travel Bugs on the Log page, optionally by name or tracking number.
// @namespace     http://www.lildevil.org/greasemonkey/
// @version       1.4
// @copyright     2010+, Lil Devil http://www.lildevil.org/greasemonkey/
// @license       Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include       http://*.geocaching.com/seek/log.aspx?*
// @include       https://*.geocaching.com/seek/log.aspx?*
// @include       http://www.lildevil.org/greasemonkey/versions
// ==/UserScript==

(function(){

// The following is for validating this code with http://www.jslint.com/
/*jslint browser: true, forin: true, undef: true, nomen: true, bitwise: true, immed: true */
/*global $, GM_addStyle, GM_log, GM_getValue, GM_openInTab, GM_setValue, GM_xmlhttpRequest, LD_addStyle, LD_getValue, LD_setValue, escape, localStorage, unescape, window, Add_Prototypes, Add_Sort_Buttons, Get_Logged_In_User, Set_Button_Images, Sort_Button_Clicked, TB_Sort, nameSort, trackingNumberSort, Check_for_Update */

Check_for_Update('GC Travel Bug List Order', '1.4');

var TB_table = $('tblTravelBugs');
if (!TB_table) { return; }

var diacritics = {	'\u00DF':'ss',	// Eszett
					'\u00E0':'a',	// A grave accent
					'\u00E1':'a',	// A acute accent
					'\u00E2':'a',	// A circumflex
					'\u00E3':'a',	// A tilde
					'\u00E4':'ae',	// A umlaut
					'\u00E5':'aa',	// A ring
					'\u00E6':'ae',	// Ash
					'\u00E7':'c',	// C cedilla
					'\u00E8':'e',	// E grave accent
					'\u00E9':'e',	// E acute accent
					'\u00EA':'e',	// E circumflex
					'\u00EB':'e',	// E umlaut
					'\u00EC':'i',	// I grave accent
					'\u00ED':'i',	// I acute accent
					'\u00EE':'i',	// I circumflex
					'\u00EF':'i',	// I umlaut
					'\u00F0':'th',	// Eth
					'\u00F1':'nn',	// N tilde
					'\u00F2':'o',	// O grave accent
					'\u00F3':'o',	// O acute accent
					'\u00F4':'o',	// O circumflex
					'\u00F5':'o',	// O tilde
					'\u00F6':'oe',	// O umlaut
					'\u00F8':'oe',	// O stroke
					'\u00F9':'u',	// U grave accent
					'\u00FA':'u',	// U acute accent
					'\u00FB':'u',	// U circumflex
					'\u00FC':'ue',	// U umlaut
					'\u00FD':'y',	// Y acute accent
					'\u00FE':'th',	// Thorn
					'\u00FF':'y'	// Y umlaut
				};

var diacriticsRegEx = '[';
for (var d in diacritics) {
	diacriticsRegEx += d;
}
diacriticsRegEx = new RegExp(diacriticsRegEx + ']', 'g');

Add_Prototypes();
var Login_Name = Get_Logged_In_User();
var TB_order = LD_getValue('Order', 2, Login_Name) - 0;
if (!TB_order) { TB_order = 2; }	// backward compatibility: 0 = 2

var noArrow =	'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAOCAYAAAD5YeaVAAAAAXNSR0IArs4c6QAAAAZiS0dEAMAAwADA' +
				'Gp0HVAAAAE5JREFUKM+lkEsKwEAMQlXm/mfKzdLNbFryEZqdQeUhIwLuqfmna84uoKUxO3NuSFqMr8C5' +
				'gn/WKO+YGABAmRj8YnAyVsyctIYmumuUSA/gaAxh58xxHQAAAABJRU5ErkJggg==',
	upArrow =	'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAOCAYAAAD5YeaVAAAAAXNSR0IArs4c6QAAAAZiS0dEAMAAwADA' +
				'Gp0HVAAAAFFJREFUKM+lkFEKACAIQ9vo5J7Mm9VPQYgtIX/E8ZxDuHurFjPRzEYJ3mC2QOUYZ75OnzoV' +
				'GBfw/Y1b9dVHgcV2xguMMaDALDPUTOGE6jfSSBPOHhxTPauthAAAAABJRU5ErkJggg==',
	downArrow =	'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAOCAYAAAD5YeaVAAAAAXNSR0IArs4c6QAAAAZiS0dEAMAAwADA' +
				'Gp0HVAAAAFdJREFUKM+lUkkKwEAIi2He7cGX+TN7aaEDBqfUk0sSg2iZidOg6NcpuBSBg2IpcE2WOAA3' +
				'wroL+3ONNhYARMRkA+5ufJIJuNlQhHefatDVVErdJvvySBdk7B1vX7s5swAAAABJRU5ErkJggg==';

Add_Sort_Buttons();
Set_Button_Images();
TB_Sort();

function Add_Sort_Buttons() {
	var newImage = document.createElement('img');
	newImage.id = 'TBsortByNumber';
	newImage.setAttribute('basevalue', 1);
	newImage.addEventListener('click', Sort_Button_Clicked, false);
	TB_table.rows[0].cells[0].appendChild(document.createTextNode(' '));
	TB_table.rows[0].cells[0].appendChild(newImage);

	newImage = document.createElement('img');
	newImage.id = 'TBsortByName';
	newImage.setAttribute('basevalue', 2);
	newImage.addEventListener('click', Sort_Button_Clicked, false);
	TB_table.rows[0].cells[1].appendChild(document.createTextNode(' '));
	TB_table.rows[0].cells[1].appendChild(newImage);

	LD_addStyle('#TBsortByName, #TBsortByNumber { vertical-align:top; cursor:pointer; }');
}

function Set_Button_Images() {
	$('TBsortByNumber').src = TB_order == 1 ? downArrow : (TB_order == -1 ? upArrow : noArrow);
	$('TBsortByName').src   = TB_order == 2 ? downArrow : (TB_order == -2 ? upArrow : noArrow);
}

function Sort_Button_Clicked() {
	var baseValue = this.getAttribute('basevalue');

	if (Math.abs(TB_order) == baseValue) {
		TB_order = -TB_order;
	} else {
		TB_order = baseValue;
	}

	Set_Button_Images();
	LD_setValue('Order', TB_order, Login_Name);
	TB_Sort();
}

function TB_Sort() {
	var TB_rows	= [],
		tbody	= TB_table.getElementsByTagName('tbody')[0],
		len		= tbody.rows.length - 1,
		tfooter	= tbody.rows[len];

	// build an array of pointers to each travel bug row
	for (var i=0; i < len; i++) {
		TB_rows.push(tbody.rows[i]);
	}

	// sort the array
	if (Math.abs(TB_order) == 1) {
		TB_rows.sort(trackingNumberSort);
	} else {
		TB_rows.sort(nameSort);
	}
	if (TB_order < 0) {
		TB_rows.reverse();
	}

	// move each sorted row to the end (right before the footer)
	for (i=0; i < len; i++) {
		TB_rows[i].className = (i % 2) ? 'AlternatingRow' : '';
		tbody.insertBefore(TB_rows[i], tfooter);
	}
}

function nameSort(a, b) {
	var aa = a.cells[1].textContent.convertDiacritics() + a.cells[0].textContent,
		bb = b.cells[1].textContent.convertDiacritics() + b.cells[0].textContent;
	if (aa < bb) { return -1; }
	if (aa > bb) { return 1; }
	return 0;
}

function trackingNumberSort(a, b) {
	var aa = a.cells[0].textContent,
		bb = b.cells[0].textContent;
	if (aa < bb) { return -1; }
	if (aa > bb) { return 1; }
	return 0;
}

function Add_Prototypes() {
	String.prototype.trim = function() {
		if (!this.length) { return ''; }

		// remove leading and trailing spaces and non-breaking spaces
		var s = this.replace(/^[\s\xA0]*/i, '');
		return     s.replace(/[\s\xA0]*$/i, '');
	};

	String.prototype.convertDiacritics = function() {
		var str = this.toLowerCase().replace(diacriticsRegEx, function(match) {
																return diacritics[match] || match;
															});
		return str.replace(/[^ 0-9a-z]/g, '').replace(/^[\s\xA0]*/i, '');
	};
}

function Get_Logged_In_User() {
	var loginLogoutLink = $('ctl00_LoginUrl') || $('ctl00_ContentLogin_uxLoginStatus_uxLoginURL');
	if (!loginLogoutLink) { return; }	// print-friendly page?
	var loginNameLink = loginLogoutLink.parentNode.getElementsByTagName('a')[0];

	// if logged in, loginNameLink will be the link to the username
	// if not logged in, loginNameLink will be the same as loginLogoutLink
	if (loginLogoutLink != loginNameLink) {
		return loginNameLink.textContent.trim();
	}
	return '';
}

function $() {
	if (arguments.length==1) {
		return document.getElementById(arguments[0]);
	}
	var elements = [];
	for (var i = 0; i < arguments.length; i++) {
		var e = arguments[i];
		if (typeof e == 'string') {
			e = document.getElementById(e);
		}
		elements.push(e);
	}
	return elements;
}

function encodeName(str) {
	str = str.replace(/^\s+/,'');		// remove leading spaces
	str = str.replace(/\s+$/,'');		// remove trailing spaces
	str = str.replace(/\s+/g,' ');		// replace interior spaces with single space
	return encodeURIComponent(str).replace(/%20/g, '+');
}

function decodeName(str) {
	str += '';
	return decodeURIComponent(str.replace(/\+/g, ' '));
}

function LD_setCookie(key, val, life) {
	if (!key) { return; }
	if (!life) { life = 31536000; }
	var expires = new Date().getTime() + (1000 * life);
	document.cookie = escape(key) + '=' + escape(val) +
		';expires=' + new Date(expires).toGMTString() + ';path=/';
}

function LD_getCookie(key) {
	var cookieJar = document.cookie.split('; ');
	for (var i=0, len=cookieJar.length; i<len; i++ ) {
		var oneCookie = cookieJar[i].split('=');
		if (oneCookie[0] == escape(key)) {
			return unescape(oneCookie[1]);
		}
	}
	return null;
}

function LD_setValue(key, val, username) {
	if (username !== undefined) {
		if (username) {		// if username is supplied, it must not be blank (i.e. not logged in)
			key += '_' + encodeName(username);
		} else {
			return;
		}
	}
	if ((typeof(GM_setValue) != 'undefined') &&
		(GM_setValue.toString().indexOf('not supported') < 0) &&
		!window.opera) {	// don't use Opera compatibility script because it probably uses cookies
			GM_setValue(key, val);
			return;
	}
	val = (typeof(val)).toString().substring(0,1) + val;
	try {
		localStorage.setItem(key, val);
	} catch (err) {
		// if we get here, either localStorage doesn't exist, or we got a Security Error using it
		LD_setCookie(key, val);
	}
}

function LD_getValue(key, defVal, username) {
	if (username !== undefined) {
		if (username) {		// if username is supplied, it must not be blank (i.e. not logged in)
			key += '_' + encodeName(username);
		} else {
			return;
		}
	}
	if ((typeof(GM_setValue) != 'undefined') &&
		(GM_setValue.toString().indexOf('not supported') < 0) &&
		!window.opera) {	// don't use Opera compatibility script because it probably uses cookies
			return GM_getValue(key, defVal);
	}
	var val;
	try {
		val = localStorage.getItem(key);
	} catch (err) {
		val = LD_getCookie(key);
	}
	if (typeof(val) != 'string' || val.length === 0) {
		return defVal;
	}
	var type = val.substr(0,1);
		 val = val.substr(1);
	switch (type) {
		case 'b':
			return (val == 'true');
		case 'n':
			return Number(val);
		default:
			return val;
	}
}

function LD_removeStyle(theID) {
	var styleSheet = document.getElementById(theID);
	if (styleSheet) {
		styleSheet.parentNode.removeChild(styleSheet);
	}
}

function LD_addStyle(css, theID) {
	var head = document.getElementsByTagName('head');
	if (!head) { return; }
	var styleSheet = document.createElement('style');
	styleSheet.type = 'text/css';
	try {
		styleSheet.innerHTML = css;
	} catch(err) {
		styleSheet.innerText = css;
	}
	if (theID) {
		LD_removeStyle(theID);	// no duplicate IDs
		styleSheet.id = theID;
	}
	head[0].appendChild(styleSheet);
}

function LD_xmlhttpRequest(request) {
	if ((typeof(GM_xmlhttpRequest) != 'undefined') && !window.opera) {
		GM_xmlhttpRequest(request);
	} else {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			var responseState = {	responseXML		: '',
									responseText	: '',
									readyState		: xmlhttp.readyState,
									responseHeaders	: '',
									status			: 0,
									statusText		: ''
								};
			if (xmlhttp.readyState == 4) {
				responseState = {	responseXML		: xmlhttp.responseXML,
									responseText	: xmlhttp.responseText,
									readyState		: xmlhttp.readyState,
									responseHeaders	: xmlhttp.getAllResponseHeaders(),
									status			: xmlhttp.status,
									statusText		: xmlhttp.statusText
								};
			}

			if (request['onreadystatechange']) {
				request['onreadystatechange'](responseState);
			}
			if (xmlhttp.readyState == 4) {
				if (request['onload'] && xmlhttp.status >= 200 && xmlhttp.status < 300) {
					request['onload'](responseState);
				}
				if (request['onerror'] && (xmlhttp.status < 200 || xmlhttp.status >= 300)) {
					request['onerror'](responseState);
				}
			}
		};
		try {
			//cannot do cross domain
			xmlhttp.open(request.method, request.url);
		} catch(e) {
			if(request['onerror']) {
				//simulate a real error
				request['onerror']({responseXML		: '',
									responseText	: '',
									readyState		: 4,
									responseHeaders	: '',
									status			: 403,
									statusText		: 'Forbidden'
									});
			}
			return;
		}
		if (request.headers) {
			for (var prop in request.headers) {
				xmlhttp.setRequestHeader(prop, request.headers[prop]);
			}
		}
		xmlhttp.send((typeof(request.data) != 'undefined') ? request.data : null);
	}
}

function LD_log(str) {
	if ((typeof(GM_log) != 'undefined') && !window.opera) {
		GM_log(str);
		return;
	}
	try {
		console.log(str);
	} catch (err) {}
}

function Check_for_Update(scriptName, scriptVersion) {
	try {
		var checkURL = 'http://www.lildevil.org/greasemonkey/current-versions.txt';
		if (window.opera) {
			// Opera doesn't support cross-domain xmlhttpRequests so use a URL on geocaching.com
			checkURL = 'http://www.geocaching.com/seek/log.aspx?LUID=606117a5-b2d0-4450-8fa1-f7faae43e4be';
		}

		// show version number on http://www.lildevil.org/greasemonkey/versions
		var versObj = document.getElementById(scriptName);
		if (versObj) {
			versObj.innerHTML = scriptVersion;
		}

		// avoid a flood of dialogs e.g. when opening a browser with multiple tabs open
		var now = new Date().getTime();
		var DOSpreventionTime = 2 * 60 * 1000;	// two minutes
		var abbrev = scriptName.replace(/[^A-Z]/g, '');
		var lastStart = LD_getValue(abbrev + '_Update_Start', null);
		LD_setValue(abbrev + '_Update_Start', now.toString());
		if (lastStart && (now - lastStart) < DOSpreventionTime) { return; }

		// time to check yet?
		var oneDay = 24 * 60 * 60 * 1000;
		var lastChecked = LD_getValue(abbrev + '_Update_Last', null);
		var checkDays = LD_getValue(abbrev + '_Update_Days', 1);
		if (lastChecked && (now - lastChecked) < (oneDay * checkDays)) { return; }

		LD_xmlhttpRequest({
			method: 'GET',
			url: checkURL,
			headers: { 'User-Agent' : scriptName + ' v' + scriptVersion + ' auto updater' },
			onload: function(result) {
				var matches,
					regex = new RegExp('[\\s\\>]' + scriptName +
										'\\s+v([\\d\\.]+)\\s+(\\d+)\\s+(.+?)[\\<\\s]', 'i');
				if (!(matches = regex.exec(result.responseText))) {
					LD_log(scriptName + ': Updater: response unrecognized');
					return;
				}

				var theOtherVersion = matches[1];
				LD_setValue(abbrev + '_Update_Days', +matches[2]);
				var theOtherURL = matches[3];

				if (theOtherVersion.replace(/\./g, '') <= scriptVersion.replace(/\./g, '')) { return; } // no updates or older version
				if (theOtherURL.indexOf('http') !== 0) { theOtherURL = 'http://' + theOtherURL; }

				if (window.confirm(	'The Greasemonkey script "' + scriptName +
									'" has been updated.\n\n' +
									'The new version is ' + theOtherVersion +
									'\nYou are currently using version ' + scriptVersion +
									'\n\nClick OK for instructions on how to upgrade.')) {
					document.location = theOtherURL;	// open in same window to avoid popup blockers
				}
			}
		});
		LD_setValue(abbrev + '_Update_Last', new Date().getTime().toString());
	}
	catch (err) { }
}
})();
