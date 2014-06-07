// kanji_copy_story! user script for Firefox's GreaseMonkey extension
// version 0.1 BETA! Copyright (c) 2006-2009, Mario Huys
// Original implementation by Ricardo Mendonga Ferreira
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 1.4 2010.09.12  woelpad  Framenum <span> changed to <div>
// 1.3 2009.11.02  woelpad  Adapted to the new site look
// 1.2 2009.04.09  woelpad  Copy picture stories from the 'Kanji.Koohii: 
//                   Insert Story Links and Pictures' script adequately
// 1.1 2008.08.21  woelpad  Added Script Update Checker
// 1.0 2008.04.24  woelpad  Automatically star stories copied into the text area
//                   and unstar those that were removed.
//                   Copy stars and reports for own story to the top
// 0.9 2008.03.31  woelpad  Adapted to copy with the introduction of the
//                   Study class
// 0.8 2007.08.30  woelpad  Adapted to cope with the partition into
//                   new and favourite stories
// 0.7 2007.06.13  woelpad  Tag names for bold and italic were changed to 
//                   <em> and <strong>
// 0.6 2007.02.20  woelpad  Added support for reversing italic and bold tags
// 0.5 2007.01.31  woelpad  Bug fix for frame links, introduced in 0.4
// 0.4 2007.01.25  woelpad  Correct handling of troublesome HTML code
// 0.3 2006.12.27  woelpad  Made it more robust
// 0.2 2006.12.13  woelpad  Added support for lowercasing keywords
// 0.1 2006.07.27  Ricardo  First release
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
// select "Kanji.Koohii: Copy Story", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Kanji.Koohii: Copy Story
// @namespace     http://userscripts.org/scripts/show/6736
// @description   Offers a few different ways to copy another user's story to your edit box. Automatically stars newly copied stories and unstars deleted ones. 
// @include       http://kanji.koohii.com/study/kanji/*
// @include       http://kanji.koohii.com/profile*
// @exclude       
// ==/UserScript==
//
// Original site:
// @namespace     http://sites.mpc.com.br/ric/nihongo

// References: http://developer.mozilla.org/en/docs/DOM:element
//             http://www.regular-expressions.info/javascript.html

var onTestSite = false;

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 6736; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1284299822113; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
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

String.prototype.addSlashes = function(){
	return this.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g, '\\$1');
}
String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
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

function applyStyle(base, target) {
	var searchRe = new RegExp(base.addSlashes() + '\\W');
	var replaceRe = new RegExp(base.addSlashes(), 'g');
	for (var idx = 0; idx < document.styleSheets.length; idx++) {
		var styleSheet = document.styleSheets[idx];
		var rulesLength = styleSheet.cssRules.length;
		for (var idx2 = 0; idx2 < rulesLength; idx2++) {
			var cssRule = styleSheet.cssRules[idx2];
			if (searchRe.test(cssRule.selectorText)) {
				styleSheet.insertRule(cssRule.cssText.replace(replaceRe, target), styleSheet.cssRules.length);
			}
		}
	}
}

function replaceStyle(head, body) {
	for (var idx = 0; idx < document.styleSheets.length; idx++) {
		var styleSheet = document.styleSheets[idx];
		var rulesLength = styleSheet.cssRules.length;
		for (var idx2 = 0; idx2 < rulesLength; idx2++) {
			var cssRule = styleSheet.cssRules[idx2];
			if (cssRule.selectorText == head) {
				styleSheet.deleteRule(idx2);
				styleSheet.insertRule(head + ' {' + body + '}', idx2);
				return;
			}
		}
	}
}

function increaseSectionCount(section, inc) {
	var titleDiv = section.getElementsByTagName('div')[0];
	if (!titleDiv || (titleDiv.className != 'title')) return;
	var countSpan = titleDiv.getElementsByTagName('span')[0];
	if (!countSpan) return;
	countSpan.firstChild.data = Number(countSpan.textContent) + inc;
}

var preferredAuthors = retrieveValue('PreferredAuthors', '').split(',');

// Profile page
if (matchSitePage('/profile') != null) {
	var profileDiv = xpathi('//div[@class="col-box col-box-top block"]');
	if (!profileDiv) return;

	var authorName = getTableParameterValue(profileDiv, 'Username');
	if (!authorName) return;
	
	var idx;
	for (idx = 0; idx < preferredAuthors.length; idx++) {
		if (preferredAuthors[idx] == authorName) break;
	}
	
	addCheckBox(profileDiv, 'favorite', 'One of my preferred authors', (idx < preferredAuthors.length)).addEventListener('change', function (e) {
		if (e.target.checked) {
			preferredAuthors.push(authorName);
		} else {
			preferredAuthors.splice(idx, 1);
			idx = preferredAuthors.length;
		}
		storeValue('PreferredAuthors', preferredAuthors.join(','));
	}, true);
	
	return;
}

// Study page: Kanji
if (matchSitePage('/study/kanji') != null) {

	var sharedStories = xpath('//div[@class="sharedstory"]');
	if (sharedStories.snapshotLength == 0) return;

	var preferredAuthorsSection;
	var hidePreferredAuthorsSection = false;
	function addPreferredAuthorStory(sharedStory) {
		if (!preferredAuthorsSection) {
			var sharedStoriesDiv = document.getElementById('SharedStoriesComponent');
			if (!sharedStoriesDiv) return;
			preferredAuthorsSection = addChild(sharedStoriesDiv, 'div', {
				id: 'sharedstories-aut',
				className: hidePreferredAuthorsSection ? 'JsHide' : ''
			}, null, sharedStoriesDiv.firstChild);
			replaceStyle('#sharedstories-new.JsHide .title', 'margin-bottom: 0');
			applyStyle('#sharedstories-new', '#sharedstories-aut');

			var titleDiv = addChild(preferredAuthorsSection, 'div', {
				className: 'title',
			});
			titleDiv.addEventListener('mouseover', function (e) {
				titleDiv.style.backgroundPosition = '0 -33px';
			}, true);
			titleDiv.addEventListener('mouseout', function (e) {
				titleDiv.style.backgroundPosition = '0 0';
			}, true);
			titleDiv.addEventListener('click', function (e) {
				titleDiv.style.backgroundPosition = '0 0';
				hidePreferredAuthorsSection = !hidePreferredAuthorsSection;
				preferredAuthorsSection.className = hidePreferredAuthorsSection ? 'JsHide' : '';
			}, true);
			addText(titleDiv, 'Preferred authors (');
			addText(addChild(titleDiv, 'span'), '0');
			addText(titleDiv, ')');
		}
		increaseSectionCount(sharedStory.parentNode, -1);
		preferredAuthorsSection.appendChild(sharedStory);
		increaseSectionCount(preferredAuthorsSection, 1);
	}

	var txtStory = xpathi('//textarea[@name="txtStory"]');
	var storyView = document.getElementById("storyview");
	var keyword;
	// Given the possibility of the Substitute Keywords tampering with the keyword, look up the original definition in kwlist.
	var framenum = xpathi('//div[@class="framenum"]').firstChild.data;
	if (framenum) {
		keyword = unsafeWindow.kwlist[framenum - 1];
	}
	if (!keyword) {
		keyword = xpathi('//div[@class="keyword"]').firstChild.data;
	}
	var keywords = keyword.split('/');
	for (var idx in keywords) {
		keywords[idx] = keywords[idx].replace(/(\(.*\)|-)$/, '').trim();
		keywords[idx] = keywords[idx].substr(0, (keywords[idx].length + 1) * 2 / 3).addSlashes();
	}
	var reMatchKeyword = new RegExp(keywords.join('|'), 'i');
	var stories = [];
	var lastMods = [];
	var storyIds = [];

	function copyStory(author, lastMod, story) {
		if (txtStory.value) txtStory.value += '\n\n';
		txtStory.value += story + ' (' + author + ',' + lastMod + ')';
		unsafeWindow.StudyPage.editStoryComponent.editStory(txtStory.value);
	}

	unsafeWindow.addSharedStory = function(author) {
		copyStory(author, lastMods[author], stories[author]);
	}

	unsafeWindow.reverseSharedStory = function(author) {
		var substory = '';
		var tail = stories[author];
		var ar;
		while (ar = /(\*)([^*]*)\*|#([^#]*)#/.exec(tail)) {
			substory += tail.substr(0, ar.index);
			if (ar[1]) {
				substory += '#' + ar[2] + '#';
			} else {
				substory += '*' + ar[3] + '*';
			}
			tail = tail.substr(ar.index + ar[0].length);
		}
		substory += tail;
		copyStory(author, lastMods[author], substory);
	}

	unsafeWindow.lowerSharedStory = function(author) {
		var substory = '';
		var tail = stories[author];
		var ar;
		while (ar = /([A-Z]*)#([A-Z]{2,}-?)#([A-Z]*)/.exec(tail)) {
			substory += tail.substr(0, ar.index) + ar[1].toLowerCase() + '#' + ar[2].toLowerCase() + '#' + ar[3].toLowerCase();
			tail = tail.substr(ar.index + ar[0].length);
		}
		substory += tail;
		tail = substory;
		substory = '';
		while (ar = /[A-Z]{2,}-?/.exec(tail)) {
			substory += tail.substr(0, ar.index) + '*' + ar[0].toLowerCase() + '*';
			tail = tail.substr(ar.index + ar[0].length);
		}
		substory += tail;
		substory = substory.replace(/\*\*([^*#]+)\*\*/g, "*$1*").replace(/\*(\W)\*|#(\W)#/g, "$1$2").replace(/#\*([^*#]*)\*#/g, "#$1#");

		copyStory(author, lastMods[author], substory);
	}

	function extractText(el) {
		var text = '';
		for (var node = el.firstChild; node; node = node.nextSibling) {
			switch (node.nodeType) {
			case 3:
				text += node.data;
				break;
			case 1:
				text += extractText(node);
				break;
			}
		}
		return text;
	}

	function insertStoryLinkAfter(el, author, character, caption, description) {
		var link = document.createElement('a');
		with (link) {
			title = description + ' ' + (author + "'").replace(/([^xs]')$/i, '$1s') + ' story';
			href = 'javascript:' + caption + 'SharedStory("' + author + '")';
			innerHTML = '<span style="font-size: 75%; color: #808080;">['+character+']</span>';
		}
		el.parentNode.insertBefore(link, el.nextSibling);
		el.parentNode.insertBefore(document.createTextNode('\u00a0'), el.nextSibling);
		return link;
	}

	var userName = getUserName();
	for (var idx = 0; idx < sharedStories.snapshotLength; idx++) {
		var sharedStory = sharedStories.snapshotItem(idx);
		var sharedStoryDivs = sharedStory.getElementsByTagName('div');
		var metaSpans = sharedStoryDivs[0].getElementsByTagName('span');
		var authorDiv = metaSpans[0];
		var authorLink = authorDiv.firstChild;
		var author = authorLink.innerHTML;
		lastMods[author] = metaSpans[1].innerHTML.substr(13,10);

		var rtkFrameDivs = sharedStoryDivs[1].getElementsByTagName('div');
		storyIds[author] = rtkFrameDivs[0].id;
		if (author == userName) {
			var actions = rtkFrameDivs[0].getElementsByTagName('a');
			var stars = parseInt(actions[0].firstChild.data);
			var reports = parseInt(actions[1].firstChild.data);

			var keywordDiv = xpathi('//div[@class="keyword"]');
			var votesSpan = addChild(keywordDiv.parentNode, 'span', {
				className: 'votes'
			}, 'float:left; margin:2px 0 6px; font-size:10px; line-height:1em;', keywordDiv);

			var starSpan = addChild(votesSpan, 'a', {
				className: 'star',
				href: '#' + rtkFrameDivs[0].id
			}, 'float:left; padding:0 0 0 23px; text-decoration:none; width:20px; line-height:18px; color:#84826E; background:url(/img/ico/study-story-actions.gif) no-repeat 0 -32px; outline:none;');
			if (isNaN(stars)) starSpan.innerHTML = '&nbsp;';
			else addText(starSpan, stars);

			if (!isNaN(reports)) {
				var reportSpan = addChild(votesSpan, 'a', {
					className: 'report',
					href: '#' + rtkFrameDivs[0].id
				}, 'float:left; padding:0 0 0 23px; text-decoration:none; width:20px; line-height:18px; color:#84826E; background:url(/img/ico/study-story-actions.gif) no-repeat -128px -32px; color:#CE4242; outline:none;');
				addText(reportSpan, reports);
			}
		}
		
		var story = '';
		var offerReverse = false;
		for (var node = rtkFrameDivs[1].firstChild; node; node = node.nextSibling) {
			switch (node.nodeType) {
			case 3:
				story += node.data;
				break;
			case 1:
				// Only the outer tag is preserved to prevent mingling up the *'s and #'s.
				var text = extractText(node);
				switch (node.tagName.toLowerCase()) {
				case 'em':
					story += text.replace(/^(\s*)/, '$1*').replace(/(\s*)$/, '*$1');
					offerReverse = offerReverse || reMatchKeyword.test(text);
					break;
				case 'strong':
					story += text.replace(/^(\s*)/, '$1#').replace(/(\s*)$/, '#$1');
					offerReverse = offerReverse || !reMatchKeyword.test(text);
					break;
				case 'br':
					story += '\n';
					break;
				case 'a':
					if (text) {
						story += text;
					} else {
						var imgNode = node.firstChild;
						while (imgNode && (imgNode.nodeType != 1)) imgNode = imgNode.nextSibling;
						if (imgNode && (imgNode.tagName.toLowerCase() == 'img')) {
							story += '{' + imgNode.src + '}';
						}
					}
					break;
				default:
					story += text;
				}
				break;
			}
		}
		story = story.replace(/\n{2,}/g, '\n').replace(/^\s+/,'').replace(/[^\S\n]*(\n?)\s*$/,'$1');

		// Detect frames, countering for the possible mutilation by the Story Links script. 
		var tail = story;
		story = '';
		var ar;
		while (ar = /(\*([^\*]+)\*\s+)?\(FRAME\s+(\d+)\)/i.exec(tail)) {
			story += tail.substr(0, ar.index);
			if (!ar[1]) {
				story += '({' + ar[3] + '})';
			} else if (unsafeWindow.kwlist[ar[3] - 1] == ar[2]) {
				story += '{' + ar[3] + '}';
			} else {
				story += ar[1] + '({' + ar[3] + '})';
			}
			tail = tail.substr(ar.index + ar[0].length);
		}
		story += tail;
		
		stories[author] = story;
		
		var copyLink = insertStoryLinkAfter(authorLink, author, '+', 'add', 'Copy');
		if (offerReverse) {
			copyLink = insertStoryLinkAfter(copyLink, author, '-', 'reverse', 'Reverse and copy');
		}
		if (/[A-Z]{2,}-?/.test(story)) {
			copyLink = insertStoryLinkAfter(copyLink, author, 'o', 'lower', 'Lowercase and copy');
		}
		
		// Check for preferred author.
		var authorIdx;
		for (authorIdx = 0; authorIdx < preferredAuthors.length; authorIdx++) {
			if (preferredAuthors[authorIdx] == author) {
				addPreferredAuthorStory(sharedStory);
				break;
			}
		}

	}

	// Adding/removing stars

	function request(url, data, analyze, asXML, postProcess) {
		var asynch = (typeof postProcess != 'undefined');
		var req = new XMLHttpRequest();
		if (asynch) {
			req.onreadystatechange = function () {
				if ((req.readyState == 4) && (req.status == 200)) {
					if (analyze) {
						if (asXML) {
							analyze(req.responseXML, url, data);
						} else {
							analyze(req.responseText, url, data);
						}
					}
					postProcess();
				}
			}
		}
		if (!data) {
			data = null;
			req.open('GET', url, asynch);
		} else {
			url += (/\?/.test(url) ? '&' : '?') + unsafeWindow.Object.toQueryString(data);
			req.open('POST', url, asynch);
			req.setRequestHeader('Method', 'POST ' + url + ' HTTP/1.1');
		}
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		req.send(data);
		if (!asynch && analyze) {
			if (asXML) {
				analyze(req.responseXML, url, data);
			} else {
				analyze(req.responseText, url, data);
			}
		}
	}

	function tailRecurse(tail, re, act) {
		var ar;
		while (ar = re.exec(tail)) {
			act(ar);
			tail = tail.substr(ar.index + ar[0].length);
		}
	}

	function readVote(res) {
		var ar = /"vote"\s*:\s*(\d+)/.exec(res);
		if (!ar) return -1;
		return ar[1];
	}

	function forceStarResponse(res, url, data) {
		if (readVote(res) == 0) {
			request(url, data);
		}
	}

	function forceUnstarResponse(res, url, data) {
		if (readVote(res) == 1) {
			request(url, data);
		}
	}

	function voteAuthor(author, handleResponse) {
		var id = storyIds[author];
		if (!id) return;
		var ids = id.split('-');
		data = { request:'star', uid:ids[1], sid:ids[2] };
		request(unsafeWindow.StudyPage.options.URL_SHAREDSTORIES, data, handleResponse);
	}

	function recurseAuthor(act) {
		tailRecurse(txtStory.value, /\(([a-zA-Z0-9_]+),\s*\d?\d\-\d?\d\-\d{4}\)/, function (ar) {
			act(ar[1]);
		});
	}

	var firstAuthors = {};
	recurseAuthor(function (author) {
		firstAuthors[author] = true;
	});

	txtStory.form.addEventListener('submit', function (e) {
		// Since it's a submit command which will reload the page, we have little choice but to make all requests synchronous.
		// Star any new authors.
		recurseAuthor(function (author) {
			if (typeof firstAuthors[author] != 'undefined') {
				// Mark as unchanged.
				firstAuthors[author] = false;
			} else {
				voteAuthor(author, forceStarResponse);
			}
		});
		// Unstar any removed authors.
		for (var author in firstAuthors) {
			if (firstAuthors[author]) {
				voteAuthor(author, forceUnstarResponse);
			}
		}
	}, true);

	return;
}
