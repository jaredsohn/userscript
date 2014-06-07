/**
*	This program is free software: you can redistribute it and/or modify
*	it under the terms of the GNU General Public License as published by
*	the Free Software Foundation, either version 3 of the License, or
*	any later version.

*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
*	GNU General Public License for more details.

*	You should have received a copy of the GNU General Public License
*	along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

/**
*	@package:	Facebook Farmville Auto Add Neighbors
*	@authors:	Asad
*	@created:	June 1st, 2010
*	@update:	June 17th, 2010
*	@credits:	Facebook Mafia Wars AutoPlayer
*/

/**
*	VERSION HISTORY
*	BUILD	|	DATE		|	NOTES

*	BETA RELEASE (work in progress)
*	v1.2.x	|	6/19/2010	|	Added Pause/Resume option, testing auto-update and stats feature
*	v1.2.x	|	5/17/2010	|	Optimized requests to higher players first

*	PUBLIC RELEASE
*	v1.2.5	|	6/17/2010	|	Fixed a minor typo that would pause the process, better detect and not click multi-select
*	v1.2.4	|	6/17/2010	|	Added Logging feature, cleaned up useless code, bug fix for no friends found and max 30 requests
*	V1.2.3	|	6/15/2010	|	Quick update to skip over new popup for additional requests 
*	v1.2.2	|	6/11/2010	|	Added additional script details, Added Update button thru GM control
*	v1.2.1	|	6/10/2010	|	Bug fixes for auto-post, Script made public on USO
*	v1.2.0	|	6/5/2010	|	Added Auto Click function for FACEBOOK post
*	v1.1.0	|	6/3/2010	|	Added Auto Click function for add neighbor link
*	v1.0.0	|	6/1/2010	|	Created GM code, basic script to edit CSS to cleanup excess junk html
*/


///////////////////////////////////////////////////////////////////////////////
//                        GreaseMonkey Required Code                         //
///////////////////////////////////////////////////////////////////////////////

// ==UserScript==
// @name		Facebook FV Add Neighbors
// @namespace		FbFvAddNeighbors
// @description		Adds neighbors to your farmville list
// @include		http://apps.facebook.com/onthefarm/neighbors.php*
// @version		1.2.5
// @build		125
// ==/UserScript==


// Script info to compare for updates
var SCRIPT = {
	version: '1.2.5',
	build: '125',
 	url: 'http://userscripts.org/scripts/source/79424.user.js',
 	metadata: 'http://userscripts.org/scripts/source/78739.meta.js',
	name: 'FbFvAddNeighbors'
 };


// Register controls with Greasemonkey
GM_registerMenuCommand('FB FV Auto Add Neighbors - Check For Updates', function() { UpdateScript(); });

///////////////////////////////////////////////////////////////////////////////
//                  CSS cleanup to remove excess top stuff                   //
///////////////////////////////////////////////////////////////////////////////

// Function to add any css style in on the fly
function addCss(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

// Hides the bottom link, middle clear area, and both iframes (some of this is repeatative)
addCss("div.emailTextAd, iframe { display: none !important; }");
//removed div.clear to display new details temporarily

// Hides the top suggestion if there is one
addCss("div.fv_main_body_cont { display: none !important; }");


// Create CSS for the Log Box
addCss('#FbFvLogWindow div.mouseunderline:hover{text-decoration:underline}' +
	'#FbFvLogItems .logEvent{border-bottom:1px solid #333; padding:4px 0px}' +
	'#FbFvLogItems .eventTime{color:#888; font-size: 10px; width:75px;  float:left}' +
	'#FbFvLogItems .eventBody{width:330px; float:right}' +
	'#FbFvLogItems .eventTime,#FbFvLogItems .eventIcon,#FbFvLogItems .eventBody{}' +
	'#FbFvLogItems .eventBody .good {color:#52E259;font-weight:bold;}' +
	'#FbFvLogItems .eventBody .bad {color:#EC2D2D;font-weight:bold;}' +
	'#FbFvLogItems .eventBody .warn {color:#EC2D2D;}' +
	'#FbFvLogItems .clear{clear:both}' +
	'#FbFvLogItems .logEvent.Icon{background-repeat: no-repeat; background-position: 75px}' +
	'#FbFvLogItems .logEvent.info.Icon{background-image:url(' + ')}' +
	'#FbFvLogWindow .logEvent.pause.Icon{background-image:url(' + ')}' +
	'#FbFvLogWindow .logEvent.play.Icon{background-image:url(' + ')}'
);

// Load our custom stuff
showFbFvLogBox();

function showFbFvLogBox() {
	if (!document.getElementById('FbFvLogWindow')) {
		createFbFvLogBox();
	}
	else {
		var FbFvLogBoxDiv = document.getElementById('FbFvLogWindow');
		FbFvLogBoxDiv.style.display = 'block';
	}
	GM_setValue('LogWindow', 'Open');
}


///////////////////////////////////////////////////////////////////////////////
//                            Required Functions                             //
///////////////////////////////////////////////////////////////////////////////

// Check for updates to the script (modified from FB MW AutoPlayer)
function UpdateScript() {
 	try {
		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT.metadata + '?' + Math.random(),
			onload: function(resp) {
				if (resp.status != 200) return;

				if (!resp.responseText.match(/@build\s+(\d+)/)) return;

				var theOtherBuild = parseInt(RegExp.$1);
				var runningBuild = parseInt(SCRIPT.build);
				var theOtherVersion = resp.responseText.match(/@version\s+([\d.]+)/)? RegExp.$1 : '';

				if (theOtherBuild > runningBuild || theOtherVersion != SCRIPT.version) {
					if (window.confirm('Version ' + theOtherVersion + ' is available!\n\n' + 'Do you want to upgrade?' + '\n')) {
						window.location.href = SCRIPT.url;
					}
				}
				else {
					alert('You already have the latest version.');
					return;
				}
			}
		});
	}
	catch (ex) {
		addToLog('info Icon', 'An error occurred.  Please info the script author with the following:\n\n' + ex);
	}
}

// Used to simulate auto click
function clickElement(elt) {
	if (!elt) {
		addToLog('info Icon', 'BUG DETECTED: Null element passed.');
		return;
	}

	// Simulate a mouse click on the element.
	var evt = document.createEvent('MouseEvents');
	if (!evt) { addToLog('info Icon', 'Mouse Events not found'); return; }

	//type , canBubble, cancelable, view, detail, screen x, screen y, client x, client y, crtlkey, altkey, shiftkey, metakey,button, related target
	evt.initMouseEvent("click", true, false, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	elt.dispatchEvent(evt);
}

// Used to find the FIRST element of any xpath
function xpathFirst(p, c) {
	return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

// Create log box if it doesnt exist
function createFbFvLogBox() {
	var title;

	var FbFvLogWindow = makeElement('div', document.body, {'id':'FbFvLogWindow', 'style':'position: fixed; right: 5px; top: 5px; bottom: 5px; width: 450px; background: black; text-align: left; padding: 5px; border: 1px solid; border-color: #FFFFFF; z-index: 98; font-size: 12px;'});

	var logClrButton = makeElement('div', FbFvLogWindow, {'class':'mouseunderline', 'style':'position: absolute; left: 5px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
	logClrButton.appendChild(document.createTextNode('clear log'));
	logClrButton.addEventListener('click', clearLog, false);

	var closeLogButton = makeElement('div', FbFvLogWindow, {'class':'mouseunderline', 'style':'position: absolute; right: 5px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
	closeLogButton.appendChild(document.createTextNode('close'));
	closeLogButton.addEventListener('click', hideFbFvLogBox, false);

	var FbFvLogItems = makeElement('div', FbFvLogWindow, {'id':'FbFvLogItems', 'style':'position: absolute; overflow: auto; right: 0px; top: 20px; bottom: 68px; width: 448px; background-color: #111111; font-size:11px; color: #BCD2EA; text-align: left; padding: 5px; border: 1px solid;'});
	FbFvLogItems.innerHTML = GM_getValue('LogEntry', '');

}

// This helps refresh the logbox when it refreshes
var FbFvLogItems = document.getElementById('FbFvLogItems');
	if (FbFvLogItems) {
		FbFvLogItems.innerHTML = GM_getValue('LogEntry', '');
	}

// CREATE LOG
function addToLog(icon, line) {
	// Create a datestamp, formatted for the log.
	var currentTime = new Date();
	var m_names = new Array('Jan', 'Feb', 'Mar',
		'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
		'Oct', 'Nov', 'Dec');
	var timestampdate = m_names[currentTime.getMonth()] + ' ' + currentTime.getDate();

	// Create a timestamp, formatted for the log.
	var ampm, hours = currentTime.getHours();
	if (hours >= 12) {
		hours = hours - 12;
		ampm = ' PM';
	}
	else {
		ampm = ' AM';
	}
	if (hours == 0) {
		hours = 12;
	}
	var timestamptime = hours + ':' +
	(currentTime.getMinutes() < 10 ? 0 : '') +
	currentTime.getMinutes() + ':' +
	(currentTime.getSeconds() < 10 ? 0 : '') +
	currentTime.getSeconds() +
	ampm;

	// Get a log box to work with.
	var FbFvLogItems = document.getElementById('FbFvLogItems');
	if (!FbFvLogItems) {
		if (!addToLog.FbFvLogItems) {
			// There's no log box, so create one.
			addToLog.FbFvLogItems = document.createElement('div');
			addToLog.FbFvLogItems.innerHTML = GM_getValue('LogEntry', '');
		}
		FbFvLogItems = addToLog.FbFvLogItems;
	}
	var logLen = FbFvLogItems.childNodes.length;

	// Determine whether the new line repeats the most recent one.
	var repeatCount;
	if (logLen) {
		var elt = FbFvLogItems.firstChild.childNodes[1];
		if (elt && elt.innerHTML.untag().indexOf(String(line).untag()) == 0) {
			if (elt.innerHTML.match(/\((\d+) times\)$/)) {
				repeatCount = parseInt(RegExp.$1) + 1;
			}
			else {
				repeatCount = 2;
			}
			line += ' (' + repeatCount + ' times)';
		}
	}

	// Create the new log entry.
	var lineToAdd = document.createElement('div');
	lineToAdd.className = 'logEvent ' + icon;
	lineToAdd.innerHTML = '<div class="eventTime">' + timestampdate + '<br/>' +
		timestamptime + '</div><div class="eventBody">' +
		line + '</div><div class="clear"></div>';

	// Put it in the log box.
	if (repeatCount) {
		FbFvLogItems.replaceChild(lineToAdd, FbFvLogItems.firstChild);
	}
	else {
		FbFvLogItems.insertBefore(lineToAdd, FbFvLogItems.firstChild);

		// If the log is too large, trim it down.
		var logMax = parseInt(GM_getValue('autoLogLength', 100));
		if (logMax > 0) {
			while (logLen-- > logMax) {
				FbFvLogItems.removeChild(FbFvLogItems.lastChild);
			}
		}
	}

	// Save the log.
	GM_setValue('LogEntry', FbFvLogItems.innerHTML);
}

// Use prototype to clean up un-necessary info
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/, '');
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/, '');
}
String.prototype.untag = function() {
	return this.replace(/<[^>]*>/g, '');
}
String.prototype.clean = function() {
	return this.replace(/<\/?[^>]+(>|$)/g, '');
}

// Required function to make any element
function makeElement(type, appendto, attributes, checked, chkdefault) {
	var element = document.createElement(type);
	if (attributes != null) {
		for (var i in attributes) {
			element.setAttribute(i, attributes[i]);
		}
	}
	if (checked != null) {
		if (GM_getValue(checked, chkdefault) == 'checked') {
			element.setAttribute('checked', 'checked');
		}
	}
	if (appendto) {
		appendto.appendChild(element);
	}
	return element;
}

function clearLog() {
	GM_setValue('LogEntry', '');
	//reset the log box
	var FbFvLogItems = document.getElementById('FbFvLogItems');
	FbFvLogItems.innerHTML = '';
}

function hideFbFvLogBox() {
	var FbFvLogBoxDiv = document.getElementById('FbFvLogWindow');
	FbFvLogBoxDiv.style.display = 'none';
	GM_setValue('Logwindow', 'Closed');
}






///////////////////////////////////////////////////////////////////////////////
//                              START CLICKING                               //
///////////////////////////////////////////////////////////////////////////////

function handleAddFriends() {
	// Find first add neighbor if it exists
	//FIXME
	var elt = xpathFirst('//input[contains(@class,"inputbutton request_form_submit") and contains(@value,"Add")]');
		if (!elt) {
			addToLog('info Icon', 'Cant find any friends, going to the game');
			window.location = "http://apps.facebook.com/onthefarm/index.php?ref=tab"
		}
		else {
			clickElement(elt);
			window.setTimeout(handleErrors, 5000);

		}
}

function handleErrors() {
			//No more friends on the list, clicking the multi list
			//FIXME...need to make different code so this doesnt happen
			var errorElt = xpathFirst('//input[contains(@value,"Okay")]');
				if (errorElt) {
					addToLog('info Icon', 'No More Requests Found!');
					clickElement(errorElt);
					GM_setValue('Status', 'RedLight');
					window.setTimeout(LetsGetReadyToRumble, 5000);
				}
				else {
					addToLog('info Icon', 'Request to add a neighbor processed.');
					window.setTimeout(handlePublishing, 5000);
				}

}

function handlePublishing() {
	try {
		//Try to find Send button in popup
		var sendElt = xpathFirst('//input[contains(@name,"sendit")]');
		if (sendElt) {
			clickElement(sendElt);
			//alert('clicked' + sendElt.name);
			window.setTimeout(handleSkipMsg, 5000);
		}
		else {
			//If popup hasnt happen yet, set to refresh and try again
			window.setTimeout(handlePublishing, 5000);
			return true;
		}
	}
	catch (ex) {
		//Once the TRY is done...catch anything else, which is nothing :)
	}
}

// Try to skip over the send additional requests popup
function handleSkipMsg() {
	try {
		//Try to find Skip button in popup
		var skipElt = xpathFirst('//input[contains(@name,"skip_ci_btn")]');
		if (skipElt) {
			clickElement(skipElt);
		}
		else {
			//If popup hasnt happen yet, set to refresh and try again
			window.setTimeout(handleSkipMsg, 5000);
			return true;
		}
	}
	catch (ex) {
		//Once the TRY is done...catch anything else, which is nothing :)
	}
}
GM_setValue('Status', 'GreenLight');

LetsGetReadyToRumble();

function LetsGetReadyToRumble(){

//See if we can start adding
if (GM_getValue('Status', '') == 'RedLight') {
	//Dont do anything
	addToLog('info Icon', 'Add Friends is PAUSED!');
	return true;

}
else if(GM_getValue('Status', '') == 'GreenLight') {
	//Lets start adding
	window.setTimeout(handleAddFriends, 5000);
}


}