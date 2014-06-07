// kanjikoohiichangekanjifont.user.js! user script for Firefox's GreaseMonkey extension
// version 0.1 BETA! Copyright (c) 2006-2009, Mario Huys
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 1.2 2012.12.24  woelpad  Adapted to cj-k spans.
// 1.1 2009.11.02  woelpad  Adapted to the new site look
// 1.0 2008.08.21  woelpad  Added Script Update Checker
// 0.9 2008.03.17  woelpad  Small change in the sightreading section
// 0.8 2008.03.07  woelpad  Changed the font in the sightreading section
// 0.7 2008.02.13  woelpad  Changed the fonts for the stories pages in the study area
// 0.6 2008.01.12  woelpad  Moved the font picker page to the RevTK site
// 0.5 2007.12.26  woelpad  Changed the fonts in the overview lists
// 0.4 2007.06.21  woelpad  Added a font picker page
// 0.3 2007.05.29  woelpad  Adapted to cope with the new grid feature in the review section
// 0.2 2007.01.05  woelpad  Specify font in the "my profile" page
// 0.1 2006.12.28  woelpad  First release
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
// select "Kanji.Koohii: Add upto flashcard number", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Kanji.Koohii: Change kanji font
// @namespace      http://userscripts.org/scripts/show/6896
// @description    Change the font of the kanji on the flashcards.
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @include        http://kanji.koohii.com/extern/fontpicker*
// @include        http://kanji.koohii.com/manage/removelist*
// @include        http://kanji.koohii.com/profile*
// @include        http://kanji.koohii.com/review*
// @include        http://kanji.koohii.com/review/summary*
// @include        http://kanji.koohii.com/review/flashcardlist*
// @include        http://kanji.koohii.com/sightreading*
// @include        http://kanji.koohii.com/study/kanji/*
// @include        http://kanji.koohii.com/study/mystories*
// ==/UserScript==

var onTestSite = false;

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 6896; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1356305820766; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]

// Fill in your prefered font. E.g. "MS Mincho", "MS Gothic", 
// "HG\u6b63\u6977\u66f8\u4f53-PRO" (a kaisho, i.e. cursive, font, in romaji: HGseikaishotai-PRO),
// "HGS\u5275\u82f1\u89d2\u30dd\u30c3\u30d7\u4f53" (a thick line font, in romaji: HGSsoueitaipopputai),
// ...
// Better still, fill it in in your member profile page (the "my profile" tab). The one here is just a default font.
var fontFamily = "HG\u6b63\u6977\u66f8\u4f53-PRO";
var fontSample = "\u7acb\u3061\u5165\u308a\u7981\u6b62";

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

function changeFont(el) {
	if (el) el.setAttribute('style', 'font-family: ' + fontFamily + ';');
}

fontFamily = retrieveValue('FontFamily', fontFamily);
var originalFontSample = fontSample;
fontSample = retrieveValue('FontSample', fontSample);

// Font picker page
if (matchSitePage('/extern/fontpicker') != null) {
	var fontSelector = document.getElementById('fontSelector');
	if (fontFamily) {
		var lastIndex = 0;
		var timer = setInterval(function(e) {
			for (var i = lastIndex; i < fontSelector.length; i++) {
				if (fontSelector.options[i].value == fontFamily) {
					clearInterval(timer);
					fontSelector.selectedIndex = i;
					break;
				}
			}
			lastIndex = fontSelector.length;
		}, 250);
	}
	fontSelector.addEventListener('change', function(e) {
		var fontFamily = fontSelector.options[fontSelector.selectedIndex].value;
		if (fontFamily) {
			storeValue('FontFamily', fontFamily);
			sampleText.style.fontFamily = fontFamily;
		}
	}, true);

	var sampleText = document.getElementById('fontSample');
	with (sampleText) {
		type = 'text';
		value = fontSample;
		if (fontFamily) style.fontFamily = fontFamily;
		addEventListener('change', function(e) {
			var fontSample = e.target.value;
			if (!fontSample) {
				e.target.value = originalFontSample;
				fontSample = originalFontSample;
			}
			storeValue('FontSample', fontSample);
		}, true);
	}

	return;
}

// Profile page
if (matchSitePage('/profile') != null) {
	// Check if it's the current user's profile.
	if (!matchProfileName()) return;
	
	var div = createGreaseMonkeyDivision('Option|Kanji Font');

	var fontTextBox = document.createElement('input');
	div.appendChild(fontTextBox);
	with (fontTextBox) {
		type = 'text';
		className = 'textfield';
		name = 'kanjifont';
		id = 'kanjifont';
		value = fontFamily;
		addEventListener('change', function(e) {
			storeValue('FontFamily', e.target.value);
		}, true);
	}

	var fontLabel = document.createElement('label');
	div.insertBefore(fontLabel, fontTextBox);
	fontLabel.for = fontTextBox.id;
	fontLabel.appendChild(document.createTextNode('Kanji Font : '));

	div.appendChild(document.createTextNode(' or switch to the '));
	var link = document.createElement('a');
	div.appendChild(link);
	link.href = linkSitePage('/extern/fontpicker');
	link.appendChild(document.createTextNode('font picker page'));

	return;
}

// Review summary page
if ((matchSitePage('/review/summary') != null) || 
	(matchSitePage('/review/flashcardlist') != null) || 
	(matchSitePage('/manage/removelist') != null)) {
	var kanjis = xpath('//td[@class="kanji"]/span');
	for (var idx = 0; idx < kanjis.snapshotLength; idx++) {
		changeFont(kanjis.snapshotItem(idx));
	}
	return;
}

// Review page
if (matchSitePage('/review') != null) {
	changeFont(xpathi('//div[@id="kanjibig"]/p/span'));
	setInterval(function () {
		changeFont(xpathi('//div[@class="kanji"]'));
	}, 500);
	return;
}

// Sight reading page
if (matchSitePage('/sightreading') != null) {
	changeFont(xpathi('//div[@id="results"]/p[@class="j"]/span'));
	return;
}

// Study page: Public stories
if (matchSitePage('/study/mystories') != null) {
	var kanjis = xpath('//span[@class="kanji"]/span');
	for (var idx = 0; idx < kanjis.snapshotLength; idx++) {
		changeFont(kanjis.snapshotItem(idx));
	}
	return;
}

// Study page
if (matchSitePage('/study/kanji') != null) {
	changeFont(xpathi('//div[@class="kanji"]/span'));
	return;
}