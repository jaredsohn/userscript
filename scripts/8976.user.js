// kanjikoohiikanjitokeyword.user.js! user script for Firefox's GreaseMonkey extension
// version 0.1 BETA! Copyright (c) 2007-2009, Mario Huys
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 0.9 2009.11.02  woelpad  Adapted to the new site look
// 0.8 2008.08.21  woelpad  Added Script Update Checker
// 0.7 2008.05.07  woelpad  Adapted to Firefox 3beta5
// 0.6 2008.01.10  woelpad  Better way to overwrite methods
// 0.5 2007.12.26  woelpad  Use <p> instead of <div> to create a section 
//                   on the profile page
// 0.4 2007.10.04  woelpad  Changed the flip card button picture, courtesy 
//                   of Fabrice
// 0.3 2007.06.21  woelpad  Bug fix on detecting the k2k option setting
// 0.2 2007.05.31  woelpad  Added a checkbox to the greasemonkey settings
// 0.1 2007.05.02  woelpad  First release
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5 (?) or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Kanji.Koohii: Kanji to keyword", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Kanji.Koohii: Kanji to keyword
// @namespace      http://userscripts.org/scripts/show/8976
// @description    Queries kanji-to-keyword instead of keyword-to-kanji.
// @include        http://kanji.koohii.com/profile*
// @include        http://kanji.koohii.com/review*
// ==/UserScript==

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 8976; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1257206297864; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]

var onTestSite = false;
var kanjiToKeyword = true;

// Taken from http://kanji.koohii.com/js/toolbox.js
Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  }
}
var $A = Array.from = function(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0, length = iterable.length; i < length; i++)
      results.push(iterable[i]);
    return results;
  }
}

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpathi(query) {
	return xpath(query).snapshotItem(0);
}

function matchUrlHead(url, urlHead) {
	if (url.substr(0, urlHead.length).toLowerCase() != urlHead.toLowerCase()) return null;
	url = url.substr(urlHead.length);
	if (url.length == 0) return '';
	if (!/^[?/#]/.test(url)) return null;
	return url;
}

function matchSitePage(urlBody, siteType) {
	var body;
	switch (siteType) {
	case 'f':
		body = matchUrlHead(window.location.href, 'http://forum.koohii.com');
		if (body == null) return null;
		break;
	default:
		if (onTestSite) {
			var front = matchUrlHead(window.location.href, 'http://test.koohii.com');
			if (front == null) return null;
			body = matchUrlHead(front, '/index_staging_nodebug.php');
			if (body == null) {
				body = matchUrlHead(front, '/index_staging.php');
				if (body == null) return null;
			}
		} else {
			body = matchUrlHead(window.location.href, 'http://kanji.koohii.com');
			if (body == null) body = front;
		}
		break;
	}
	return matchUrlHead(body, urlBody);
}

function linkSitePage(urlBody, siteType) {
	switch (siteType) {
	case 'f':
		return 'http://forum.koohii.com' + urlBody;
	default:
		if (onTestSite) return 'http://test.koohii.com' + urlBody;
		return 'http://kanji.koohii.com' + urlBody;
	}
}

function getUserName() {
	// In kanji.koohii.com
	var userNameEl = xpathi('//div[@class="signin"]/div[@class="m"]/strong');
	if (userNameEl) return userNameEl.textContent;

	// In forum.koohii.com
	var quickpostUser = xpathi('//input[@name="form_user"]');
	if (quickpostUser) return quickpostUser.value;
	var topNavLogin = xpathi('//div[@class="profile_info_left"]/strong');
	if (topNavLogin) return topNavLogin.textContent;

	return '';
}

function getTableParameterValue(table, key) {
	key += ' :';
	var rows = table.getElementsByTagName('tr');	
	for (var rowIdx = 0; rowIdx < rows.length; rowIdx++) {
		var row = rows[rowIdx];
		var columns = row.getElementsByTagName('td');
		if (!columns || (columns.length < 2)) continue;
		if (columns[0].textContent == key) {
			return columns[1].textContent;
		} 
	}
	return '';
}

function matchProfileName() {
	var userName = getUserName();
	if (!userName) return false;
	var profileDiv = xpathi('//div[@class="col-box col-box-top block"]/table');
	if (!profileDiv) return false;
	return (getTableParameterValue(profileDiv, 'Username') == userName);
}

function storeValue(key, value) {
	var userName = getUserName();
	if (!userName) return;
	switch (typeof value) {
	case 'boolean':
		value = value ? 1 : 0;
		break;
	case 'number':
		break;
	default:
		value = escape(value);
		break;
	}
	GM_setValue(userName + '|' + key, value);
}

function retrieveValue(key, def) {
	var userName = getUserName();
	if (!userName) return def;
	var value = GM_getValue(userName + '|' + key);
	if (typeof value == 'undefined') return def;
	value = unescape(value);
	switch (typeof def) {
	case 'boolean':
		value = parseInt(value) ? true : false;
		break;
	case 'number':
		value = parseInt(value);
		break;
	}
	return value;
}

function addChild(parent, type, settings, style, sibling) {
	var child = document.createElement(type);
	for (var key in settings) {
		child[key] = settings[key];
	}
	if (sibling) parent.insertBefore(child, sibling);
	else parent.appendChild(child);
	if (style) {
		child.setAttribute('style', style);
	}
	return child;
}

function addText(parent, text) {
	return parent.appendChild(document.createTextNode(text));
}

function getGreaseMonkeySection() {
	var section = document.getElementById('GreaseMonkey');
	if (section) return section;

	var topSection = xpathi('//div[@class="col-box col-box-top block"]');
	if (!topSection) return null;

	section = addChild(topSection.parentNode, 'div', {
		id: 'GreaseMonkey',
		className: 'col-box block'
	}, null, topSection.nextSibling);
	addText(addChild(section, 'h2'), 'GreaseMonkey settings');
	
	return section;
}

function createGreaseMonkeyDivision(divName) {
	var div = document.createElement('p');
	div.name = divName;
	var section = getGreaseMonkeySection();
	var divs = section.getElementsByTagName('p');
	for (var idx = 0; idx < divs.length; idx++) {
		if (divName < divs[idx].name) {
			section.insertBefore(div, divs[idx]);
			return div;
		}
	}
	section.insertBefore(div, null);
	return div;
}

kanjiToKeyword = retrieveValue('KanjiToKeyword', kanjiToKeyword);

// Profile page
if (matchSitePage('/profile') != null) {
	// Check if it's the current user's profile.
	if (!matchProfileName()) return;
	
	var kanjiToKeywordCheckBox = document.createElement('input');
	with (kanjiToKeywordCheckBox) {
		type = 'checkbox';
		name = 'kanji2keyword';
		checked = kanjiToKeyword;
		addEventListener('change', function(e) {
			storeValue('KanjiToKeyword', e.target.checked);
		}, true);
	}

	var div = createGreaseMonkeyDivision('Option|Kanji To Keyword');
	div.insertBefore(kanjiToKeywordCheckBox, null);
	div.insertBefore(document.createTextNode('Kanji To Keyword : '), kanjiToKeywordCheckBox);

	return;
}

// Review page
if (matchSitePage('/review') != null) {
	if (!kanjiToKeyword) return;
	
	var that = unsafeWindow.rkKanjiReview;
	if (!that || !that.onFlashcardState) return;
	
	var originalOnFlashcardState = that.onFlashcardState;
	that.onFlashcardState = function(faceup) {
		originalOnFlashcardState.call(that, faceup);
		if (faceup) {
			document.getElementById('keyword').style.visibility = 'visible';
		} else {
			document.getElementById('keyword').style.visibility = 'hidden';
			with (document.getElementById('kanjibig').style) {
				visibility = 'visible';
				color = '#000';
			}
		}
	}
	
	return;
}