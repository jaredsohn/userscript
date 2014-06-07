/*
Geocaching Better Driving Directions
http://www.lildevil.org/greasemonkey/better-driving-directions

--------------------------------------------------------------------------------

This is a Greasemonkey user script.

Follow the instructions on http://www.lildevil.org/greasemonkey/
to install Greasemonkey and this user script.

--------------------------------------------------------------------------------
*/

// ==UserScript==
// @name           GC Better Driving Directions
// @description    Gives driving directions to parking area instead of cache coordinates.
// @namespace      http://www.lildevil.org/greasemonkey/
// @version        1.2
// @copyright      2010+, Lil Devil http://www.lildevil.org/greasemonkey/
// @license        Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include        http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==

// the following is for http://www.jslint.com/
/*jslint bitwise: true, browser: true, nomen: true, undef: true */
/*global $ GM_getValue GM_log GM_openInTab GM_setValue GM_xmlhttpRequest console escape firstElementChild localStorage unescape XPathResult window Check_for_Update Compute_Decimal_Coords decodeName encodeName Get_Driving_Directions_URL Get_URL_Parameter */

(function(){

Check_for_Update('GC Better Driving Directions', '1.2');

String.prototype.trim = function() {
	if (!this.length) { return ''; }

	// remove leading and trailing spaces
	var s = this.replace(/^(\s|\&nbsp;|\xA0)+/i, '');
	    s =    s.replace(/(\s|\&nbsp;|\xA0)+$/i, '');
	return s;
};

var waypointsTable = document.getElementById('ctl00_ContentBody_Waypoints');
if (!waypointsTable) { return; }

var parkingIcons = document.evaluate(
	'.//td/img[contains(@src, "/sm/pkg.jpg")]',
	waypointsTable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (parkingIcons.snapshotLength < 1) { return; }

var cacheName = document.getElementById('ctl00_ContentBody_CacheName').textContent;
var drivingDirectionsLink = document.getElementById('ctl00_ContentBody_lnkPrintDirectionsSimple');

for (var i=0, len=parkingIcons.snapshotLength; i<len; i++) {
	if (parkingIcons.snapshotItem(i).parentNode.cellIndex > 3) { continue; }

	var thisRow = parkingIcons.snapshotItem(i).parentNode.parentNode,
		thisName = firstElementChild(thisRow.cells[5]).textContent.trim(),
		thisCoord = thisRow.cells[6].textContent || thisRow.cells[6].innerText;

	var newLink = drivingDirectionsLink.cloneNode(true);
	newLink.id += (i+1);
	newLink.style.fontSize = 'smaller';
	newLink.style.whiteSpace = 'nowrap';
	newLink.href = Get_Driving_Directions_URL(drivingDirectionsLink.href, thisCoord, thisName);
	thisRow.cells[6].appendChild(document.createTextNode(' '));
	thisRow.cells[6].appendChild(newLink);

	if (i === 0) {
		drivingDirectionsLink.href = newLink.href;
	}
}

function Compute_Decimal_Coords(str) {
	var m = str.match(/([NS])\s*(\d+)\D+([\d\.]+)\s*([EW])\s*(\d+)\D+([\d\.]+)/);
	if (!m) { return null; }

	var latHem = m[1] == 'N' ? 1 : -1,
		lonHem = m[4] == 'E' ? 1 : -1;
		return {	lat : latHem * ((m[2] - 0) + (m[3] / 60)),
					lon : lonHem * ((m[5] - 0) + (m[6] / 60))
				};
}

function Get_Driving_Directions_URL(oldURL, waypointCoords, waypointName) {
	var decCoords = Compute_Decimal_Coords(waypointCoords),
		base	= oldURL.substring(0, oldURL.indexOf('?')),
		f		= Get_URL_Parameter('f', oldURL),
		hl		= Get_URL_Parameter('hl', oldURL),
		saddr	= Get_URL_Parameter('saddr', oldURL),
		daddr	= decCoords.lat.toFixed(5) + ',' + decCoords.lon.toFixed(5) + '(' +
					encodeName(cacheName) + '+-+' +
					encodeName(waypointName) + ')';
	return base + '?f=' + f + '&hl=' + hl + '&saddr=' + saddr + '&daddr=' + daddr;
}

function Get_URL_Parameter(fieldName, theUrl) {
	if (!theUrl) {
		theUrl = document.location + '';
	}
	var queryString = theUrl.substring(theUrl.indexOf('?') + 1);
	var re = new RegExp('(^|&)' + fieldName + '=(.*?)(&|#|$)', 'i');
	if (queryString.match(re)) {
		return RegExp.$2;
	}
	return '';
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
