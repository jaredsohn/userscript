// kanjikoohii_sanitize.user.js! user script for Firefox's GreaseMonkey extension
// version 0.1 BETA! Copyright (c) 2008-2009, Mario Huys
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 0.4 2009.11.02  woelpad  Adapted to the new site look
// 0.3 2008.08.22  woelpad  Added 'Hide report buttons' option
// 0.2 2008.08.21  woelpad  Added Script Update Checker
// 0.1 2008.08.06  woelpad  First release
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
// select "Kanji.Koohii: Sanitize", and click Uninstall.
//
// To make the selections you made kind of permanent, you can remove
//     http://kanji.koohii.com/showprofile.php*
// from the right side upper panel in the above said manage dialog.
// Doing so will prevent the settings from showing on the "My Profile" page.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Kanji.Koohii: Sanitize
// @namespace      http://userscripts.org/scripts/show/31267
// @description    Make an adequate selection
// @include        http://kanji.koohii.com/study/kanji/*
// @include        http://kanji.koohii.com/profile*
// ==/UserScript==

var onTestSite = false;

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 31267; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1257206494684; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]

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
				if (body == null) body = front;
			}
		} else {
			body = matchUrlHead(window.location.href, 'http://kanji.koohii.com');
			if (body == null) return null;
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

function addCheckBox(parent, id, caption, checked, after) {
	var checkbox = addChild(parent, 'input', {
		type: 'checkbox', 
		checked: checked,
		id: id
	});
	addText(addChild(parent, 'label', {
		'for': id
	}, null, after ? checkbox : null), ' ' + caption);
	return checkbox;
}

function fireEvent(el, eventType, afterLoading) {
	var e = document.createEvent('HTMLEvents');
	e.initEvent(eventType, true, true);
	if (afterLoading) {
		setTimeout(function () {
			el.dispatchEvent(e);
		}, 600);
	} else {
		el.dispatchEvent(e);
	}
}

var mustHideReported = retrieveValue('HideReported', false);
var mustHideNew = retrieveValue('HideNew', false);
var mustHideNewInitially = false; //retrieveValue('HideNewInitially', false);
var mustHideFavorite = retrieveValue('HideFavorite', false);
var mustHideReportButton = retrieveValue('HideReportButton', false);
var maxReports = retrieveValue('MaxReports', 0);

// Profile page
if (matchSitePage('/profile') != null) {
	// Check if it's the current user's profile.
	if (!matchProfileName()) return;
	
	var div = createGreaseMonkeyDivision('Option|Hide Stories');
	
	addCheckBox(div, 'hidenew', 'Hide new stories', mustHideNew).addEventListener('change', function (e) {
		storeValue('HideNew', e.target.checked);
	}, true);
//	addCheckBox(div, 'hidenewinit', 'initially', mustHideNewInitially, true).addEventListener('change', function (e) {
//		storeValue('HideNewInitially', e.target.checked);
//	}, true);
	addChild(div, 'br');
	addCheckBox(div, 'hidefavorite', 'Hide favorite stories', mustHideFavorite).addEventListener('change', function (e) {
		storeValue('HideFavorite', e.target.checked);
	}, true);
	addChild(div, 'br');
	addCheckBox(div, 'hidereported', 'Hide stories', mustHideReported).addEventListener('change', function (e) {
		storeValue('HideReported', e.target.checked);
	}, true);
	addText(div, ' with more than ');
	var maxReportsEl = addChild(div, 'input', {
		type: 'text',
		className: 'textfield', 
		value: maxReports
	});
	var reportsEl = addText(div, (maxReports == 1) ? ' report' : ' reports');
	maxReportsEl.setAttribute('style', 'width:28px; text-align: right');
	maxReportsEl.addEventListener('change', function (e) {
		var newMaxReports = parseInt(e.target.value);
		if (!isNaN(newMaxReports) && (newMaxReports >= 0)) {
			maxReports = newMaxReports;
			storeValue('MaxReports', maxReports);
			reportsEl.data = (maxReports == 1) ? ' report' : ' reports';
		}
		e.target.value = maxReports;
	}, true);
	addChild(div, 'br');
	addCheckBox(div, 'hidereportbutton', 'Hide report buttons', mustHideReportButton).addEventListener('change', function (e) {
		storeValue('HideReportButton', e.target.checked);
	}, true);


	return;
}

// Study page
if (matchSitePage('/study/kanji') != null) {

	var voteStoryReport = {};
	var voteNrStoriesEl = {};

	function hideStory(storyReport, nrStoriesEl) {
		var story;
		for (story = storyReport.parentNode; story.className != 'sharedstory'; story = story.parentNode);
		story.setAttribute('style', 'display:none');
		if (nrStoriesEl) {
			var nrStories = parseInt(nrStoriesEl.firstChild.data);
			if (!isNaN(nrStories) && nrStories) {
				nrStoriesEl.firstChild.data = --nrStories;
			}
		}
	}
	
	function hideStories(mustHideGroup, mustHideGroupInitially, groupId, titleSubclass) {
		if (mustHideGroup && !mustHideGroupInitially) {
			var group = document.getElementById(groupId);
			if (group) group.setAttribute('style', 'display:none');
			return;
		}

		var titleClass = 'title';
		if (titleSubclass) titleClass += ' ' + titleSubclass;
		var titleBar = xpathi('//div[@id="' + groupId + '"]//div[@class="' + titleClass + '"]');
		if (titleBar && mustHideGroup && mustHideGroupInitially) {
			fireEvent(titleBar, 'click', true);
		}

		if (!mustHideReported && !mustHideReportButton) return;
		
		var storyReports = xpath('//div[@id="' + groupId + '"]//div[@class="sharedstory"]//a[@class="report"]');
		if (!storyReports) return;
		if (!mustHideReported) {
			// Hide report buttons
			for (var idx = 0; idx < storyReports.snapshotLength; idx++) {
				var storyReport = storyReports.snapshotItem(idx);
				storyReport.setAttribute('style', 'display:none');
			}
			return;
		}

		var nrStoriesEl;
		if (titleBar) {
			var titleSpans = titleBar.getElementsByTagName('span');
			if (titleSpans) nrStoriesEl = titleSpans[0];
		}

		for (var idx = 0; idx < storyReports.snapshotLength; idx++) {
			var storyReport = storyReports.snapshotItem(idx);
			var reports = parseInt(storyReport.firstChild.data);
			if (!isNaN(reports) && reports > maxReports) {
				hideStory(storyReport, nrStoriesEl);
			} else if (mustHideReportButton) {
				storyReport.setAttribute('style', 'display:none');
			} else {
				storyReport.addEventListener('click', function (e) {
					voteStoryReport = e.target;
					voteNrStoriesEl = nrStoriesEl;
				}, true);
			}
		}
	}

	if (mustHideNew && !mustHideNewInitially && mustHideFavorite) {
		var group = document.getElementById('SharedStoriesComponent');
		if (group) group.setAttribute('style', 'display:none');
		return;
	} else {
		hideStories(mustHideNew, mustHideNewInitially, 'sharedstories-new', 'JsNewest');
		hideStories(mustHideFavorite, false, 'sharedstories-fav');

		if (!mustHideReportButton && unsafeWindow.StudyPage) {
			setTimeout(function () {
				var that = unsafeWindow.StudyPage.sharedStoriesComponent;
				if (!that || !that.handleResponse) return;
				var originalHandleResponse = that.handleResponse;
				that.handleResponse = function(response) {
					originalHandleResponse.call(that, response);
					if (voteStoryReport) {
						var reports = parseInt(voteStoryReport.firstChild.data);
						if (!isNaN(reports) && reports > maxReports) {
							hideStory(voteStoryReport, voteNrStoriesEl);
						}
						voteStoryReport = {};
						voteNrStoriesEl = {};
					}
				}
			}, 500);
		}
	}


	return;
}