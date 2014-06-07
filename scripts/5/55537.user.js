/*
Geocaching Fix Log Page Reload
http://www.lildevil.org/greasemonkey/fix-log-page-reload

--------------------------------------------------------------------------------

This is a Greasemonkey user script.

Follow the instructions on http://www.lildevil.org/greasemonkey/
to install Greasemonkey and this user script.

--------------------------------------------------------------------------------
*/

// ==UserScript==
// @name          GC Fix Log Page Reload
// @description   Don't reload the log page when selecting log type, unless selecting Update Coordinates.
// @namespace     http://www.lildevil.org/greasemonkey/
// @version       2.3
// @copyright     2010+, Lil Devil http://www.lildevil.org/greasemonkey/
// @license       Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include       http://*.geocaching.com/seek/log.aspx?*
// ==/UserScript==

(function(){

// The following is for validating this code with http://www.jslint.com/
/*jslint browser: true, forin: true, undef: true, nomen: true, bitwise: true, immed: true */
/*global GM_log, GM_getValue, GM_openInTab, GM_setValue, GM_xmlhttpRequest, window, logTypeChanged, Check_for_Update */

Check_for_Update('GC Fix Log Page Reload', '2.3');

var typeSelect = document.getElementById('ctl00_ContentBody_LogBookPanel1_ddLogType');

if (typeSelect && !typeSelect.hasAttribute('onchange')) {
	typeSelect.addEventListener('change', logTypeChanged, false);
	logTypeChanged();
}

function logTypeChanged() {
	var waypointCheckbox = document.getElementById('ctl00_ContentBody_LogBookPanel1_WptSelectCheckBox');
	var errorDisplay = document.getElementById('waypointError');
	if ((typeSelect.value == 47) && !waypointCheckbox.checked) {
		// if this is called via an event, click the checkbox
		if (this.nodeName == 'SELECT') {
			waypointCheckbox.click();
			return;
		}

		if (!errorDisplay) {
			errorDisplay = document.createElement('span');
			errorDisplay.id = 'waypointError';
			errorDisplay.appendChild(document.createTextNode(' * You must supply a waypoint when updating coordinates.'));
			errorDisplay.style.color = 'red';
			waypointCheckbox.parentNode.appendChild(errorDisplay);
		}
		errorDisplay.style.display = '';
	} else if (errorDisplay) {
		errorDisplay.style.display = 'none';
	}
}

function Check_for_Update(scriptName, scriptVersion) {
	try {
		var checkURL = 'http://www.lildevil.org/greasemonkey/current-versions.txt';
		if (window.opera) {
			// Opera doesn't support cross-domain xmlhttpRequests so use a URL on geocaching.com
			checkURL = 'http://www.geocaching.com/seek/log.aspx?LUID=606117a5-b2d0-4450-8fa1-f7faae43e4be';
		}
		// avoid a flood of dialogs e.g. when opening a browser with multiple tabs open
		var now = new Date().getTime();
		var DOSpreventionTime = 2 * 60 * 1000;	// two minutes
		var lastStart = GM_getValue('Update_Start', null);
		GM_setValue('Update_Start', now.toString());
		if (lastStart && (now - lastStart) < DOSpreventionTime) { return; }

		// time to check yet?
		var oneDay = 24 * 60 * 60 * 1000;
		var lastChecked = GM_getValue('Update_Last', null);
		var checkDays = GM_getValue('Update_Days', 1);
		if (lastChecked && (now - lastChecked) < (oneDay * checkDays)) { return; }

		GM_xmlhttpRequest({
			method: 'GET',
			url: checkURL,
			headers: { 'User-Agent' : scriptName + ' v' + scriptVersion + ' auto updater' },
			onload: function(result) {
				var re = new RegExp('[\\s\\>]' + scriptName + '\\s+v([\\d\\.]+)\\s+(\\d+)\\s+(.+?)[\\<\\s]', 'i');
				if (!result.responseText.match(re)) {
					GM_log(scriptName + ': Updater: response unrecognized');
					return;
				}

				var theOtherVersion = RegExp.$1;
				GM_setValue('Update_Days', +RegExp.$2);
				var theOtherURL = RegExp.$3;

				if (theOtherVersion.replace(/\./g, '') <= scriptVersion.replace(/\./g, '')) { return; } // no updates or older version
				if (theOtherURL.indexOf('http') !== 0) { theOtherURL = 'http://' + theOtherURL; }

				if (window.confirm(	'Version ' + theOtherVersion +
									' of the "' + scriptName +
									'" greasemonkey script is available.\n' +
									'You are currently using version ' + scriptVersion +
									'.\n\nClick OK for instructions on how to upgrade.\n')) {
					GM_openInTab(theOtherURL);
				}
			}
		});
		GM_setValue('Update_Last', new Date().getTime().toString());
	}
	catch (err) { }
}
})();
