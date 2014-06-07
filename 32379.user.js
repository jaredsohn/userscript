/*
Geocaching Friends List Enhancements
http://www.lildevil.org/greasemonkey/friends-list-enhancements

--------------------------------------------------------------------------------

This is a Greasemonkey user script.

Follow the instructions on http://www.lildevil.org/greasemonkey/
to install Greasemonkey and this user script.

--------------------------------------------------------------------------------
*/

// ==UserScript==
// @name          GC Friends List Enhancements
// @namespace     http://www.lildevil.org/greasemonkey/
// @description   Sort your Friends List. Changes the "Found:" and "Hidden:" numbers on into links.
// @version       3.1
// @copyright     2010+, Lil Devil http://www.lildevil.org/greasemonkey/
// @license       Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @attribution   Olssonivallda http://geocaching.olssonivallda.com/gmscript/gc_friend_found_cache.user.js
// @include       http*.geocaching.com/my/myfriends.aspx*
// @include       http*.geocaching.com/account/ManageFriends.aspx
// @include       http*.geocaching.com/profile/*
// ==/UserScript==

(function(){

// The following is for validating this code with http://www.jslint.com/
/*jslint browser: true, forin: true, undef: true, nomen: true, bitwise: true, immed: true */
/*global $, GM_addStyle, GM_log, GM_getValue, GM_openInTab, GM_registerMenuCommand, GM_setValue, GM_xmlhttpRequest, xPath, XPathResult, window, nextElementSibling, Add_Sort_Control, Ask_Target_Pref, Check_for_Update, Debug_Log, Format_Recent, Get_Logged_In_User, Get_Parent, Get_URL_Parameter, LD_getValue, LD_setValue, Open_Forum_Posts, Open_Gallery, Process_Friends, Read_Friend_IDs, Read_History, Set_Targets, Sort_Friends, Write_Friend_IDs, Write_History */

Check_for_Update('GC Friends List Enhancements', '3.1');

var Friends_Panel =	$('ctl00_ContentBody_pnlMyFriends')	||				// my friends page
					$('ctl00_ContentBody_pnlPending')	||				// pending friends page
					$('displayfriends')					||				// manage friends page
					$('ctl00_ContentBody_ProfilePanel1_pnlProfile');	// profile page
if (!Friends_Panel) { return; }

var Which_Friends_Page;
switch (Friends_Panel.id) {
	case 'ctl00_ContentBody_pnlMyFriends'				: Which_Friends_Page = 'myfriends';			break;
	case 'ctl00_ContentBody_pnlPending'					: Which_Friends_Page = 'pendingfriends';	break;
	case 'displayfriends'								: Which_Friends_Page = 'managefriends';		break;
	case 'ctl00_ContentBody_ProfilePanel1_pnlProfile'	: Open_Gallery();	return;
}

String.prototype.trim = function() {
	if (!this.length) { return ''; }

	// remove leading and trailing spaces
	var s = this.replace(/^(\s|\&nbsp;|\xA0)+/i, '');
	    s =    s.replace(/(\s|\&nbsp;|\xA0)+$/i, '');
	return s;
};

String.prototype.addCommas = function() {
	var x = this.split('.');
	var rgx = /(\d+)(\d{3})/g;
	x[0] = x[0].replace(rgx, '$1' + ',' + '$2');
	return x.join('.');
};

Number.prototype.addCommas = function() {
	return this.toString().addCommas();
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

var diacritics = {	'\u00DF':'ss',	// Eszett
					'\u00E0':'a',	// A grave accent
					'\u00E1':'a',	// A acute accent
					'\u00E2':'a',	// A circumflex
					'\u00E3':'a',	// A tilde
					'\u00E4':'ae',	// A umlaut
					'\u00E5':'aa',	// A ring
					'\u00E6':'ae',	// Ash
					'\u00E7':'c',	// C cedilla)
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

String.prototype.convertDiacritics = function() {
	var str = this.toLowerCase().replace(diacriticsRegEx, function(match) {
															return diacritics[match] || match;
														});
	return str.replace(/[^ 0-9a-z]/g, '');
};

Array.prototype.searchFriend = function(f) {
	for (var i=0, len=this.length; i<len; i++) {
		if (i in this && this[i][0] === f) {
			return this[i];
		}
	}
	return false;
};

var Open_In_New = false;

 //  Get logged-in username
var Login_Name = Get_Logged_In_User();
if (Login_Name) {
	Open_In_New = LD_getValue('open_in_new', false);
	GM_registerMenuCommand('Open Friends Links in a New Window or Tab?', Ask_Target_Pref);
}
var DEBUG = (Login_Name == 'Lil Devil');

var maxHeight = 0,
	friendHistory = [],		// [[friendName, findCount, hideCount]]
	friendHistoryTime,
	friendIDarray = {},		// {friendName : friendID}
	friendCurrent = [],		// [[friendName, findCount, hideCount]]
	recentFinds = [],		// [[findDelta, friendName]]
	recentHides = [],		// [[hideDelta, friendName]]
	hasFindCount = false,
	hasHideCount = false;
Read_History();
Read_Friend_IDs();
var Num_Friends = Process_Friends();
if (hasFindCount) {
	Write_History();
}
Write_Friend_IDs();
Debug_Log('maxHeight = ' + maxHeight);

if (Num_Friends > 1) {
	Add_Sort_Control();
	Sort_Friends();
}

 // if user desires, make all the links open in a new tab
if (Open_In_New) {
	Set_Targets();
}

 // ---------------------------------- Functions ---------------------------------- //

function Get_Logged_In_User() {
	var loginLogoutLink = $('ctl00_LoginUrl') || $('ctl00_ContentLogin_uxLoginStatus_uxLoginURL');
	var userLink = loginLogoutLink.parentNode.getElementsByTagName('a')[0];
	if (userLink != loginLogoutLink) {
		return userLink.textContent.trim();
	}
	return '';
}

function encodeName(str) {
	return encodeURIComponent(str).replace(/%20/g, '+');
}

function decodeName(str) {
	str += '';
	return decodeURIComponent(str.replace(/\+/g, ' '));
}

function Process_Friends() {
	var xPathSearch, xPathSearch2;
	switch (Which_Friends_Page) {
		case 'myfriends' :		xPathSearch  = './/h4/a[contains(@href, ".geocaching.com/profile/?guid=")]';
								xPathSearch2 = './/dt[contains(text(), "Found:")]';
								break;

		case 'managefriends' :	xPathSearch  = './/h4/a[contains(@href, "/profile/default.aspx?guid=")]';
								xPathSearch2 = './/li/strong[contains(text(), "Found:")]';
								break;

		default :				return;
	}

	GM_addStyle('body #bd .FE-plus         { color:green !important; }');
	GM_addStyle('body #bd a.FE-plus        { text-decoration:none; }');
	GM_addStyle('body #bd a.FE-plus:hover  { text-decoration:underline; }');
	GM_addStyle('body #bd .FE-minus        { color:red !important; }');
	GM_addStyle('body #bd a.FE-minus       { text-decoration:none; }');
	GM_addStyle('body #bd a.FE-minus:hover { text-decoration:underline; }');

	GM_addStyle('span.spanlink       { cursor:pointer; text-decoration:underline;' +
									 ' color:#003399; white-space:nowrap; }');
	GM_addStyle('span.spanlink:hover { color:#FF6600; }');

	// get a list of all the friends
	var friends = xPath(xPathSearch, Friends_Panel, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	Debug_Log('Process_Friends: ' + friends.snapshotLength + ' friends found.');

	// step through them and make the "Found" and "Hidden" numbers into links
	for (var f=0, len=friends.snapshotLength; f<len; f++ ) {
		var friendLink = friends.snapshotItem(f);
		var friendID;
		if (Which_Friends_Page == 'myfriends') {
			friendID = friendLink.id.match(/ctl00_ContentBody_rptFriendsList_(\w+)_lnkName/)[1];

		} else {	// managefriends
			// When I wrote this, friendLink didn't have an ID.
			// Make sure it still doesn't have one, and give it one to match the other page.
			// This makes it easier for the Sort routine to find it.
			friendID = friendLink.parentNode.firstChild.id.match(/uxFriendsList_(\w+)_uxMemberStatus/)[1];
			if (!friendLink.id) {
				friendLink.id = 'ctl00_ContentBody_rptFriendsList_' + friendID + '_lnkName';
			}
		}

		var friendName  = encodeName(friendLink.textContent.trim());
		var friendText  = Get_Parent(friendLink, 'div');
		var friendBlock = Get_Parent(friendText, 'div');

		var findObj, hideObj, findLink, hideLink, findChange, hideChange, newLI, lastLI, arr;
		var findCount = 0,
			hideCount = 0,
			findDelta = 0,
			hideDelta = 0;
		var foundLabel = xPath(xPathSearch2, friendText, XPathResult.FIRST_ORDERED_NODE_TYPE);

		if (foundLabel) {
			hasFindCount = true;
			if (Which_Friends_Page == 'myfriends') {
				findObj = nextElementSibling(foundLabel);
				var hideLabel = nextElementSibling(findObj);
				if (hideLabel) {
					hideObj = nextElementSibling(hideLabel);
				}
			} else {
				findObj = foundLabel.nextSibling;
				hideObj = nextElementSibling(findObj);
			}

			// get hide and find counts, and calculate change from previous
			findCount = parseInt(findObj.textContent, 10);

			if (hideObj) {
				hasHideCount = true;
				hideCount = parseInt(hideObj.textContent, 10);
			}

			if ((arr = friendHistory.searchFriend(friendName))) {
				findDelta = findCount - arr[1];
				hideDelta = hideCount - arr[2];
			}

			// create new object to hold find count
			if (findCount > 0) {
				findLink      = document.createElement('a');
				findLink.href = '../seek/nearest.aspx?ul=' + friendName;
			} else {
				findLink      = document.createElement('span');
			}
			findLink.id = 'ctl00_ContentBody_rptFriendsList_' + friendID + '_found';
			findLink.innerHTML = findCount;

			// create object to hold find delta
			findChange = document.createElement('span');
			findChange.id = 'ctl00_ContentBody_rptFriendsList_' + friendID + '_findDelta';
			if (findDelta !== 0) {
				findChange.className = findDelta > 0 ? 'FE-plus' : 'FE-minus';
				findChange.innerHTML = '\xA0(<b>' + (findDelta > 0 ? '+' : '') + findDelta + '</b>)';
				recentFinds.push([findDelta, friendName]);
			}

			// create new object to hold hidden count
			if (hasHideCount) {
				if (hideCount > 0) {
					hideLink      = document.createElement('a');
					hideLink.href = '../seek/nearest.aspx?u=' + friendName;
				} else {
					hideLink      = document.createElement('span');
				}
				hideLink.id = 'ctl00_ContentBody_rptFriendsList_' + friendID + '_hidden';
				hideLink.innerHTML = hideCount;

				// create object to hold hidden delta
				hideChange = document.createElement('span');
				hideChange.id = 'ctl00_ContentBody_rptFriendsList_' + friendID + '_hideDelta';
				if (hideDelta !== 0) {
					hideChange.className = hideDelta > 0 ? 'FE-plus' : 'FE-minus';
					hideChange.innerHTML = '\xA0(<b>' + (hideDelta > 0 ? '+' : '') + hideDelta + '</b>)';
					recentHides.push([hideDelta, friendName]);
				}
			}

			// replace found/hidden numbers with links
			if (Which_Friends_Page == 'myfriends') {
				findObj.replaceChild(findLink, findObj.firstChild);
				if (hasHideCount) {
					hideObj.replaceChild(hideLink, hideObj.firstChild);
				}

			} else {
				findObj.parentNode.insertBefore(document.createTextNode(' '), findObj);
				findObj.parentNode.insertBefore(findLink, findObj);
				findObj.textContent  = ' | ';
				if (hasHideCount) {
					hideObj.textContent = '\xA0';
					hideObj.parentNode.insertBefore(hideLink, hideObj.nextSibling);
				}
			}

			// add changes if applicable
			if (findChange) {
				findLink.parentNode.insertBefore(findChange, findLink.nextSibling);
			}
			if (hasHideCount && hideChange) {
				hideLink.parentNode.insertBefore(hideChange, hideLink.nextSibling);
			}

			// save info to history object
			friendCurrent.push([friendName, findCount, hideCount]);
		}

		// add link to gallery page
		var galleryLink = document.createElement('a');
		galleryLink.href = friendLink.href + '&gallery=1';
		galleryLink.appendChild(document.createTextNode('Gallery'));

		if (Which_Friends_Page == 'myfriends') {
			var emailLine = $('ctl00_ContentBody_rptFriendsList_' + friendID + '_lnkRemoveFriend').parentNode;
			emailLine.insertBefore(document.createElement('br'), emailLine.firstChild);
			emailLine.insertBefore(galleryLink, emailLine.firstChild);
		} else {
			newLI = document.createElement('li');
			newLI.appendChild(galleryLink);

			var allLI = friendText.getElementsByTagName('ul')[0].getElementsByTagName('li');
			lastLI = allLI[allLI.length-1];
			lastLI.parentNode.insertBefore(newLI, lastLI);
		}

		// add forum posts link (ID number is only available on managefriends page)
		var forumLink;
		if ((Which_Friends_Page == 'managefriends') && friendBlock.id.match(/^friend_(\d+)$/)) {
			friendIDarray[friendName] = RegExp.$1;
		}

		if (friendIDarray[friendName]) {
			forumLink = document.createElement('a');
			forumLink.href = 'http://forums.groundspeak.com/gc/index.php?act=Search&CODE=getalluser&mid=' +
							friendIDarray[friendName];
		} else {
			forumLink = document.createElement('span');
			forumLink.className = 'spanlink';
			forumLink.setAttribute('username', friendName);
			forumLink.addEventListener('click', Open_Forum_Posts, false);
		}
		forumLink.appendChild(document.createTextNode('Forum Posts'));
		galleryLink.parentNode.insertBefore(forumLink, galleryLink.nextSibling);
		galleryLink.parentNode.insertBefore(document.createTextNode(' | '), galleryLink.nextSibling);

		// find the tallest block
		maxHeight = Math.max(maxHeight, friendText.offsetHeight);
	}
	return friends.snapshotLength;
}

function Open_Gallery() {
	// there is no direct link to the gallery page, so open the profile page
	// then manipulate some form fields and submit the form automatically
	if (!Get_URL_Parameter('gallery') ||
		$('ctl00_ContentBody_ProfilePanel1_pnlGallery')) { return; }

	// if we got here with the 'gallery' URL, then this is probably a friend.
	// save the userID for later use
	var profileHeader = $('ctl00_ContentBody_lblUserProfile');
	if (profileHeader) {
		var fields = profileHeader.textContent.split(':');
		if (fields.length == 2) {
			var username = fields[1].trim();
			Read_Friend_IDs();
			if (!friendIDarray[username]) {
				var forumLink = $('ctl00_ContentBody_ProfilePanel1_lnkSeePosts');
				if (forumLink) {
					friendIDarray[username] = Get_URL_Parameter('mid', forumLink.href);
					Write_Friend_IDs();
				}
			}
		}
	}

	// switch to the Gallery tab
	$('__EVENTTARGET').value = 'ctl00$ContentBody$ProfilePanel1$lnkGallery';
	var mainForm = document.getElementsByTagName('form')[0];

	// remove special parameter so we don't get stuck in a loop
	mainForm.action = mainForm.action.replace('&gallery=1', '');

	mainForm.submit();
}

function Open_Forum_Posts() {
	// the myfriends page does not have the user IDs of our friends available
	// so we have to do a search in the forum based on the username
	var params = {	'namesearch'	: this.getAttribute('username'),
					'exactname'		: '1',
					'forums[]'		: 'all',
					'searchsubs'	: '1',
					'prune'			: '0',
					'prune_type'	: 'newer',
					'sort_key'		: 'last_post',
					'sort_order'	: 'desc',
					'search_in'		: 'posts',
					'result_type'	: 'posts'
				};

	// a username search only works via a POST so create a hidden form and submit it
	var myForm = document.createElement('form');
	myForm.action = 'http://forums.groundspeak.com/GC/index.php?act=Search&CODE=01';
	myForm.method = 'post';
	myForm.target = Open_In_New ? '_blank' : '';
	for (var i in params) {
		var inp = document.createElement('input');
		inp.type = 'hidden';
		inp.name = i;
		inp.value = params[i];
		myForm.appendChild(inp);
	}
	document.body.appendChild(myForm);
	myForm.submit();
}

function Read_History() {
	var str = LD_getValue('friend_history', '');
	friendHistoryTime = LD_getValue('friend_history_time', '0');
	friendHistory = [];
	if (str) {
		friendHistory = str.split(';').map(function(x) { return x.split(','); });
	}
	Debug_Log('Read friendHistory=' + friendHistory.length);
}

function Write_History() {
	Debug_Log('Write friendHistory=' + friendCurrent.length);
	LD_setValue('friend_history', friendCurrent.sort().map(function(x) { return x.join(','); }).join(';'));
	LD_setValue('friend_history_time', new Date().getTime().toString());
}

function Read_Friend_IDs() {
	friendIDarray = {};
	var n = 0, str = GM_getValue('friend_IDs', '');
	if (str) {
		str.split(';').forEach(function(x) { var arr = x.split(','); friendIDarray[arr[0]] = arr[1]; n++; });
	}
	Debug_Log('Read friendIDarray=' + n);
}

function Write_Friend_IDs() {
	var f, arr=[];
	for (f in friendIDarray) {
		if (friendIDarray.hasOwnProperty(f)) {
			arr.push(f + ',' + friendIDarray[f]);
		}
	}
	GM_setValue('friend_IDs', arr.sort().join(';'));
	Debug_Log('Write friendIDarray=' + arr.length);
}

 // Returns the "pluralized" form of singularWord if it's necessary to express a timesNumber quantity
function adjustPlural(singularWord, timesNumber) {
	return singularWord + ((Math.abs(timesNumber) != 1) ? "s" : "");
}

 // Calculates the difference between two dates and returns it as a "humanized" string
 // borrowed from http://userscripts.org/scripts/show/36353
function getDateDiffString(dateNew, dateOld) {
	var dateDiff = new Date(dateNew - dateOld);
	dateDiff.setUTCFullYear(dateDiff.getUTCFullYear() - 1970); // Substracts 1970 years to compensate Date.getTime's (Unix) epoch (1 Jan 1970 00:00:00 UTC)

	var strDateDiff = "", timeunitValue = 0;
	var timeunitsHash = {year: "getUTCFullYear", month: "getUTCMonth", day: "getUTCDate",
						 hour: "getUTCHours", minute: "getUTCMinutes", second: "getUTCSeconds", millisecond: "getUTCMilliseconds"};

	for (var timeunitName in timeunitsHash) {
		timeunitValue = dateDiff[timeunitsHash[timeunitName]]() - ((timeunitName == "day") ? 1 : 0);

		if (timeunitValue !== 0) {
			if ((timeunitName == "millisecond") && (strDateDiff.length !== 0)) { continue; } // Milliseconds won't be added unless the difference is less than 1 second
			strDateDiff += ((strDateDiff.length === 0) ? "" : ", ") + // Adds a comma as separator if another time unit has already been added
							timeunitValue + " " + adjustPlural(timeunitName, timeunitValue);
		}
	}

	// Replaces the last comma with an "and" to humanize the string
	strDateDiff = strDateDiff.replace(/,([^,]*)$/, " and$1");

	return strDateDiff;
}

function Add_Sort_Control() {
	var xPathSearch, sortOrders, preferredSortType;
	switch (Which_Friends_Page) {
		case 'myfriends' :		xPathSearch =	'.//h3[contains(text(), "My Friends")]' +
												'|.//h3[contains(text(), "Your Friends")]';
								sortOrders = [	'Friend Name',		'Friend Name (reverse)',
												'Joined Date',		'Joined Date (reverse)',
												'Last Online Date',	'Last Online Date (reverse)'
											];
								preferredSortType = LD_getValue('my_sort_by', 'Friend Name');
								break;

		case 'managefriends' :	xPathSearch =	'./../..//h3[contains(text(), "My Friends")]' +
												'|./../..//h3[contains(text(), "Your Friends")]';
								sortOrders = [	'Friend Name',		'Friend Name (reverse)',
												'Last Login Date',	'Last Login Date (reverse)'
											];
								preferredSortType = LD_getValue('manage_sort_by', 'Friend Name');
								break;

		default :				return;
	}

	if (hasFindCount) {
		sortOrders = sortOrders.concat([	'Caches Found',		'Caches Found (reverse)',
											'New Finds',		'New Finds (reverse)'
										]);
	}
	if (hasHideCount) {
		sortOrders = sortOrders.concat([	'Caches Hidden',	'Caches Hidden (reverse)',
											'New Hides',		'New Hides (reverse)'
										]);
	}
	if (sortOrders.indexOf(preferredSortType) < 0) {
		preferredSortType = 'Friend Name';
	}

	// find a place to add the sort control
	var friendsHeader = xPath(xPathSearch, Friends_Panel, XPathResult.FIRST_ORDERED_NODE_TYPE);
	if (!friendsHeader) { return; }

	// we found a place to put it, so create the control
	var newSelect = document.createElement('select');
	newSelect.id = 'friendsSortSelector';
	newSelect.addEventListener('change', Sort_Friends, false);
	for (var i=0; i<sortOrders.length; i++) {
		var option = document.createElement('option');
		option.innerHTML = sortOrders[i];
		if (sortOrders[i] == preferredSortType) {
			option.selected = 'selected';
		}
		newSelect.appendChild(option);
	}
	var b = document.createElement('b');
	b.appendChild(document.createTextNode('Sort By: '));
	var newSpan = document.createElement('span');
	newSpan.appendChild(b);
	newSpan.appendChild(newSelect);

	// find (or create) the proper place to add the select
//	var h3 = friendsHeader;
	friendsHeader.style.paddingLeft = 0;
	var parentObj = friendsHeader.parentNode;				// h3.div
	var newTD;
	if (parentObj.nodeName == 'DIV') {			// this script is running first
		var newTable = document.createElement('table');
		newTable.id = 'friendsHeaderTable';
		newTable.style.width = '100%';
		newTable.className = friendsHeader.className;
		friendsHeader.style.borderBottomStyle = 'none';

		var dest = friendsHeader.nextSibling;				// save the insert location
		var newTR = newTable.insertRow(-1);
		newTR.insertCell(-1).appendChild(friendsHeader);	// move the h3 element into the new table
		newTD = newTR.insertCell(1);
		newTD.style.textAlign = 'center';
		newTD.appendChild(newSpan);
		parentObj.insertBefore(newTable, dest);
	} else if (parentObj.nodeName == 'TD') {				// VIP List script ran first
		newTD = Get_Parent(friendsHeader, 'tr').insertCell(1);
		newTD.style.textAlign = 'center';
		newTD.appendChild(newSpan);
	}

	// add hide and find summary
	if (recentFinds.length || recentHides.length || DEBUG) {
		var newLogsIcon = 'data:image/png;base64,' +
			'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';

		newTD = $('friendsHeaderTable').insertRow(-1).insertCell(-1);
		newTD.colSpan = 3;

		var newFinds = Format_Recent(recentFinds, 'ul'),
			newHides = Format_Recent(recentHides, 'u'),
			html =  '<table cellspacing=0 cellpadding=0><tr><td valign="middle">';

		if (newFinds || newHides) {
			html += '<img src="' + newLogsIcon + '"></td><td valign="middle">';
		}
		if (newFinds) {
			html += '<b>New finds by:</b> ' + newFinds + '<br/>';
		}
		if (newFinds && newHides) {
			html += '<br/>';
		}
		if (newHides) {
			html += '<b>New hides by:</b> ' + newHides + '<br/>';
		}
		html += '<span style="color:gray; font-size:smaller;"><br/>Last check was ' +
				getDateDiffString(new Date().getTime(), friendHistoryTime) + ' ago (' +
				new Date(parseInt(friendHistoryTime, 10)).toLocaleString() + ')</span>' +
				'</td></tr></table>';
		newTD.innerHTML = html;
	}
}

function customSort(a,b) {
	// sort by the main item
	if        (a[0] < b[0]) {
		return -1;
	} else if (a[0] > b[0]) {
		return 1;
	} else if (a[1] < b[1]) {		// if main item is the same, sort by name in reverse
		return 1;
	} else if (a[1] > b[1]) {
		return -1;
	}
	return 0;
}

function Format_Recent(arr, param) {
	param = param || 'ul';
	var ret = [];
	for (var i=0, len=arr.sort(customSort).reverse().length; i<len; i++) {
		var clas = 'FE-minus',
			plus = '';
		if (arr[i][0]>0) {
			clas = 'FE-plus';
			plus = '+';
		}

		ret.push('<span class="' + clas + '">' + decodeName(arr[i][1]) +
				'&nbsp;(<a href="../seek/nearest.aspx?' + param + '=' + arr[i][1] + '" class="' + clas + '">' +
				plus + arr[i][0] + '</a>)</span>');
	}
	return ret.join(', ');
}

function Sort_Friends() {
	var selector = $('friendsSortSelector');
	var selectorValue = selector.value;
	var pos = selectorValue.indexOf(' (reverse)');
	var order = (pos<0) ? selectorValue : selectorValue.substring(0, pos);
	var rev = (pos>0);
	Debug_Log(order + ' - ' + rev);

	switch (Which_Friends_Page) {
		case 'myfriends' :		LD_setValue('my_sort_by', selectorValue);
								break;

		case 'managefriends' :	LD_setValue('manage_sort_by', selectorValue);
								break;

		default :				return;
	}

	var xpaths = {
		'Friend Name' : './/a[contains(@id, "_lnkName")]',
		// <a target="_blank" href="http://staging.geocaching.com/profile/?guid=8e84ab6...fe" id="ctl00_ContentBody_rptFriendsList_ctl01_lnkName">kimbest</a>
		// <a title="View Profile" target="_blank" href="/profile/default.aspx?guid=c64...c2" id="ctl00_ContentBody_rptFriendsList_ctl01_lnkName">47Dad47</a>

		'Joined Date' :	'.//span[contains(@id, "_lblMemberSince")]',
		// <span id="ctl00_ContentBody_rptFriendsList_ctl01_lblMemberSince">7/28/2001</span>
		// n/a

		'Last Online Date' : './/span[contains(@id, "_lblLastOnline")]',
		// <span id="ctl00_ContentBody_rptFriendsList_ctl01_lblLastOnline">12/15/2009</span>
		// n/a

		'Last Login Date' : './/acronym[contains(@id, "_uxLastOn")]',
		// n/a
		// <acronym title="10/27/2009" id="ctl00_ContentBody_uxFriendsList_ctl01_uxLastOn">10/27/2009</acronym>

		'Caches Found' : './/a[contains(@id, "_found")]|.//span[contains(@id, "_found")]',
		// <a href="../seek/nearest.aspx?ul=kimbest" id="ctl00_ContentBody_rptFriendsList_ctl01_found" target="_blank">4565</a>
		// <a href="../seek/nearest.aspx?ul=47Dad47" id="ctl00_ContentBody_rptFriendsList_ctl01_found" target="_blank">1421</a>

		'New Finds' : './/span[contains(@id, "_findDelta")]',
		// <span id="ctl00_ContentBody_rptFriendsList_ctl00_findDelta" class="FE-plus">10</span>

		'Caches Hidden': './/a[contains(@id, "_hidden")]|.//span[contains(@id, "_hidden")]',
		// <a href="../seek/nearest.aspx?u=kimbest" id="ctl00_ContentBody_rptFriendsList_ctl01_hidden" target="_blank">19</a>
		// <a href="../seek/nearest.aspx?u=47Dad47" id="ctl00_ContentBody_rptFriendsList_ctl01_hidden" target="_blank">72</a>
		// <span                                    id="ctl00_ContentBody_rptFriendsList_ctl10_hidden">0</span>

		'New Hides' : './/span[contains(@id, "_hideDelta")]'
		// <span id="ctl00_ContentBody_rptFriendsList_ctl00_hideDelta" class="FE-plus">10</span>

		};

	var friends = xPath(xpaths[order], Friends_Panel, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	if (!friends) { return; }

	var results = [], thisNode, thisID;
	var last = friends.snapshotLength;
	for (var i = 0; i < last; i++ ) {
		thisNode = friends.snapshotItem(i);			// <a> <span> or <acronym>
		thisID = thisNode.id.match(/FriendsList_(\w+?)_/)[1];	// ctl00 to ctl99
		var thisName = $('ctl00_ContentBody_rptFriendsList_' + thisID + '_lnkName').textContent;
		thisName = thisName.convertDiacritics();
		var thisSort = thisName;
		switch (order) {
			case 'Joined Date'		:
			case 'Last Online Date'	:
			case 'Last Login Date'	:	thisSort = Date.parse(thisNode.textContent);
										break;

			case 'Caches Found'		:
			case 'Caches Hidden'	:	thisSort = parseInt(thisNode.textContent, 10);
										break;

			case 'New Finds'		:
			case 'New Hides'		:	thisSort = parseInt(thisNode.textContent.substring(2), 10);
										if (isNaN(thisSort)) {
											thisSort = rev ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
										}
		}
		results[i] = [thisSort, thisName, thisID];
	}

	if (order === 'Friend Name') {
		results.sort();
		if (!rev) {
			results.reverse();
		}
	} else {
		results.sort(customSort);
		if (rev != (order === 'Joined Date')) {		// != is equivalent to an XOR
			results.reverse();
		}
	}

	var friendsHeaderTable = $('friendsHeaderTable');
	for (i = 0; i < last; i++ ) {
		thisID = results[i][2];
		thisNode = Get_Parent($('ctl00_ContentBody_rptFriendsList_' + thisID + '_lnkName'), 'div', 'div');
		if (Which_Friends_Page == 'myfriends') {
			thisNode.style.height = maxHeight + 'px';
			Friends_Panel.insertBefore(thisNode, friendsHeaderTable.nextSibling);
		} else {
			Friends_Panel.insertBefore(thisNode, Friends_Panel.firstChild);
		}
	}
}

function Ask_Target_Pref() {
	Open_In_New = window.confirm(
			'Click OK to open all links in a new window or tab\n' +
			'Click CANCEL to open all links in this window.\n' +
			'\n' +
			'Your choice here only applies to links on the Friends List page.\n' +
			'\n' +
			'Links will currently open in ' + (Open_In_New ? 'a new' : 'the same') + ' tab.');
	LD_setValue('open_in_new', Open_In_New);
	Set_Targets();
}

function Set_Targets() {
	var urls = xPath('.//a', Friends_Panel, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	for (var u = urls.snapshotLength-1 ; u >= 0; u--) {
		if (urls.snapshotItem(u).href.match(/^(javascript|#$)/i)) { continue; }

		if (Open_In_New) {
			urls.snapshotItem(u).target = '_blank';
		} else {
			urls.snapshotItem(u).removeAttribute('target');
		}
	}
}

 // return a node's parent of a certain type. if not found, return null
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

function nextElementSibling(p) {
	if (p && typeof(p.nextElementSibling) != 'undefined') {
		return p.nextElementSibling;
	} else {
		var sibling = p.nextSibling;
		while (sibling && sibling.nodeType !== 1) {
			sibling = sibling.nextSibling;
		}
		return sibling;
	}
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

function Get_URL_Parameter(field_name, the_url) {
	if (!the_url) {
		the_url = document.location + '';
	}
	var query_string = the_url.substring(the_url.indexOf('?') + 1);
	var re = new RegExp('(^|&)' + field_name + '=(.*?)(&|#|$)', 'i');
	if (query_string.match(re)) {
		return RegExp.$2;
	}
	return '';
}

function LD_getValue(key, defVal) {
	if (Login_Name) {
		return GM_getValue(key + '_' + encodeName(Login_Name), defVal);
	}
	return defVal;
}

function LD_setValue(key, val) {
	if (Login_Name) {
		GM_setValue(key + '_' + encodeName(Login_Name), val);
	}
}

function Debug_Log(str) {
	if (DEBUG) {
		var now = new Date();
		GM_log(now.toLocaleTimeString().slice(0, -3) + '.' + now.getMilliseconds().zeroPad(3) + ': ' + str);
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
