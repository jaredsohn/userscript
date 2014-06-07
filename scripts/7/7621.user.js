// kanjikoohiistorylinks.user.js! user script for Firefox's GreaseMonkey extension
// version 0.1 BETA! Copyright (c) 2007-2009, Mario Huys
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 1.5 2010.09.12  woelpad  Framenum <span> changed to <div>
// 1.4 2009.11.02  woelpad  Adapted to the new site look
// 1.3 2009.05.08  woelpad  Display frame number, keyword and kanji when
//          hovering over frame link
// 1.2 2009.04.09  woelpad  Put stoked's picture stories in its own shared 
//          story section on top of 'Newest and updated stories'
// 1.1 2009.04.03  woelpad  Import stoked's picture stories 
//          (http://forum.koohii.com/viewtopic.php?id=2553)
// 1.0 2008.08.21  woelpad  Added Script Update Checker
// 0.9 2008.07.04  woelpad  Turned the story dates into self-referencing links
// 0.8 2008.03.17  woelpad  Adapted to cope with a change in the stories page
// 0.7 2008.02.14  woelpad  Applied to the stories page
// 0.6 2007.12.20  woelpad  <i> changed to <em>
// 0.5 2007.09.08  woelpad  Improved handling of images
// 0.4 2007.08.30  woelpad  Adapted to cope with the partition into
//          new and favourite stories 
//          Added support for including images in the story
// 0.3 2007.06.13  woelpad  Fix to cope with the new position of the 
//          Learned button inside the storyview
// 0.2 2007.02.27  woelpad  Accept colons in web page urles
// 0.1 2007.02.14  woelpad  First release
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
// select "Kanji.Koohii: Insert Story Links and Pictures", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Kanji.Koohii: Insert pictures and story links
// @namespace      http://userscripts.org/scripts/show/7621
// @description    Inserts pictures and links in stories.
// @include        http://forum.koohii.com/viewtopic.php?*
// @include        http://kanji.koohii.com/profile*
// @include        http://kanji.koohii.com/study/kanji/*
// @include        http://kanji.koohii.com/study/mystories*
// ==/UserScript==

var onTestSite = false;
var pictureThreadId = 2553;

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 7621; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1284300063956; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]

// Taken from http://kanji.koohii.com/js/toolbox.js
Function.prototype.bind = function () {
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

String.prototype.addSlashes = function(){
	return this.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g, '\\$1');
}

String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpathi(query) {
	return xpath(query).snapshotItem(0);
}
function xpatho(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function html2text(html) {
	var hiddenNode = document.createElement('div');
	hiddenNode.innerHTML = html;
	var text = hiddenNode.textContent;
	return text;
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

function extractDate(timestamp) {
	var date = new Date();
	var dateTime = timestamp.split(', ');
	if (dateTime.length == 2) {
		if (dateTime[0] == 'Yesterday') {
			date.setTime(date.getTime() - 86400000);
		} else {
			if (!/\d{4}\s/.test(dateTime[0])) {
				dateTime[0] = date.getFullYear() + ' ' + dateTime[0];
			}
			date = new Date(dateTime[0]);
		}
	}
	return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
}

function tailRecurse(tail, re, act) {
	var ar;
	while (ar = re.exec(tail)) {
		tail = tail.substr(ar.index + ar[0].length);
		if (act(ar)) return tail;
	}
	return '';
}

function elRecurse(tail, startRe, endRe, act) {
	var startAr, endAr, body;
	while (1) {
		body = null;
		startAr = null;
		endAr = null;
		if (startRe) {
			startAr = startRe.exec(tail);
			if (!startAr) break;
			tail = tail.substr(startAr.index + startAr[0].length);
		}
		if (endRe) {
			endAr = endRe.exec(tail);
			if (!endAr) break;
			body = tail.substr(0, endAr.index);
			tail = tail.substr(endAr.index + endAr[0].length);
		}
		if (act(body, startAr, endAr)) return tail;
	}
	return '';
}

function tagRecurse(el, tagName, act) {
	var ret;
	for (var node = el.firstChild; node; node = node.nextSibling) {
		if (node.nodeType == 1) {
			if (node.tagName.toLowerCase() == tagName) {
				if (ret = act(node)) break;
			}
			if (ret = tagRecurse(node, tagName, act)) break;
		}
	}
	return ret;
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

function disableDiv(div, disabled) {
	for (var node = div.firstChild; node; node = node.nextSibling) {
		if (node.nodeType == 1) {
			node.disabled = disabled;
		}
	}
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

function request(url, analyze, asXML, postProcess) {
	var asynch = (typeof postProcess != 'undefined');
	var req = new XMLHttpRequest();
	function stateChange() {
		if ((req.readyState == 4) && (req.status == 200)) {
			if (asXML) {
				analyze(req.responseXML);
			} else {
				analyze(req.responseText);
			}
			postProcess();
		}
	}
	if (asynch) req.onreadystatechange = stateChange;
	req.open('GET', url, asynch);
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	req.send(null);
	if (!asynch) {
		if (asXML) {
			analyze(req.responseXML);
		} else {
			analyze(req.responseText);
		}
	}
}

function extractFrameNum(link) {
	var ar = /(^|\/)(\d+)($|\?)/i.exec(link);
	if (ar) return ar[2];
	return null;
}

var authorsRE;

function addLinks(story, linkImage) {
	var ar;
	// Web urls
	for (var node = story.firstChild; node; node = node.nextSibling) {
		if (node.nodeType == 3) {
			while (ar = /(http|ftp|https):\/\/[\]\[\-\w\/?#%@!$&'()*+,;:=._~]*[\w\/?#]/i.exec(node.data)) {
				var url = ar[0];
				var tagStart = ar.index;
				var afterTagEnd = ar.index + url.length;
				var isImage = 0;
				if (!linkImage && (tagStart > 0) && (afterTagEnd < node.data.length)
					&& (node.data.charAt(tagStart - 1) == '{') && (node.data.charAt(afterTagEnd) == '}')) {
					tagStart = tagStart - 1;
					afterTagEnd = afterTagEnd + 1;
					isImage = 1;
				}
				if (tagStart > 0) {
					story.insertBefore(document.createTextNode(node.data.substr(0, tagStart)), node);
				}
				node.data = node.data.substr(afterTagEnd);
				if (isImage) {
					var image = document.createElement('img');
					if (ar = /\?.*((http|ftp|https):\/\/[\]\[\-\w\/?#%@!$&'()*+,;:=._~]*[\w\/?#])/i.exec(url)) {
						var anchor = document.createElement('a');
						story.insertBefore(anchor, node);
						anchor.href = ar[1];
						anchor.appendChild(image);
					} else {
						story.insertBefore(image, node);
					}
					image.src = url;
				} else {
					var anchor = document.createElement('a');
					story.insertBefore(anchor, node);
					anchor.href = url;
					anchor.appendChild(document.createTextNode(url));
				}
			}
		}
	}

	// Signatures referring to forum articles
	for (var node = story.firstChild; node; node = node.nextSibling) {
		if (node.nodeType == 3) {
			while (ar = /\(([a-zA-Z0-9_]+):p(\d+),\d+-\d+-\d+\)/.exec(node.data)) {
				story.insertBefore(document.createTextNode(node.data.substr(0, ar.index + 1)), node);
				node.data = node.data.substr(ar.index + 1 + ar[1].length + 2 + ar[2].length);
				var anchor = document.createElement('a');
				story.insertBefore(anchor, node);
				anchor.href = linkSitePage('/viewtopic.php?pid=' + ar[2] + '#p' + ar[2], 'f');
				anchor.appendChild(document.createTextNode(ar[1]));
			}
		}
	}

	// Authors
	if (authorsRE) {
		for (var node = story.firstChild; node; node = node.nextSibling) {
			if (node.nodeType == 3) {
				while (ar = authorsRE.exec(node.data)) {
					if (ar[1].length > 0) {
						story.insertBefore(document.createTextNode(node.data.substr(0, ar.index + ar[1].length)), node);
					}
					node.data = node.data.substr(ar.index + ar[1].length + ar[2].length);
					var anchor = document.createElement('a');
					story.insertBefore(anchor, node);
					anchor.href = 'javascript:focusOnAuthor("' + ar[2].toLowerCase() + '")';
					anchor.appendChild(document.createTextNode(ar[2]));
				}
			}
		}
	}
	
	// Remove the keyword and extra brackets in frame links surrounded by round brackets, as in '({1234})'.
	story.innerHTML = story.innerHTML.replace(/href="\?/ig, 'href="/study/?')
		.replace(/href="\/study\/\?(search|framenum)=/ig, 'href="/study/kanji/')
		.replace(/href="(\d+)"/g, 'href="/study/kanji/$1"')
		.replace(/\(<em>([^<]*)<\/em>\s+(\(<a\s+href="\/study\/kanji\/\d+")(>FRAME\s+\d+<\/a>\))\)/ig, '$2 title="$1"$3');
		
	// Show frame number, kanji and keyword in the title for anchors.
	tagRecurse(story, 'a', function (node) {
		var ar;
		if (ar = /\/study\/kanji\/(\d+)/.exec(node.href)) {
			var frameNum = ar[1];
			var keyword = unsafeWindow.kwlist[frameNum-1];
			var kanji = unsafeWindow.kklist[frameNum-1];
			if (keyword || kanji) {
				node.title = '#' + frameNum + ' "' + keyword + '"' + ' ' + kanji;
			}
		}
	});
}

function replacePictureStories(firstNr, lastNr, contents) {
	var frameRanges = eval('[' + retrieveValue('pictureStoryRanges', '') + ']');
	var toSkip = 0;
	var toRemove = 0;
	var newFrameRanges = new Array();
	var mergeRange = null;
	if (contents) mergeRange = [ firstNr, lastNr ];
	for (var idx in frameRanges) {
		var frameRange = frameRanges[idx];
		if (frameRange[1] < firstNr) {
			toSkip += frameRange[1] - frameRange[0] + 1;
			if (mergeRange && (frameRange[1] + 1 == firstNr)) {
				mergeRange[0] = frameRange[0];
			} else {
				newFrameRanges.push(frameRange);
			}
		} else if (frameRange[0] > lastNr) {
			if (mergeRange) {
				if (lastNr + 1 == frameRange[0]) {
					mergeRange[1] = frameRange[1];
					newFrameRanges.push(mergeRange);
				} else {
					newFrameRanges.push(mergeRange);
					newFrameRanges.push(frameRange);
				}
				mergeRange = null;
			} else {
				newFrameRanges.push(frameRange);
			}
		} else if (frameRange[0] < firstNr) {
			toSkip += firstNr - frameRange[0];
			if (frameRange[1] > lastNr) {
				toRemove += lastNr - firstNr + 1;
				if (mergeRange) {
					newFrameRanges.push(frameRange);
				} else {
					mergeRange = [ frameRange[0], firstNr - 1 ];
					newFrameRanges.push(mergeRange);
					frameRange[0] = lastNr + 1;
					newFrameRanges.push(frameRange);
				}
				mergeRange = null;
			} else {
				toRemove += frameRange[1] - firstNr + 1;
				if (mergeRange) {
					mergeRange[0] = frameRange[0];
				} else {
					frameRange[1] = firstNr - 1;
					newFrameRanges.push(frameRange);
				}
			}
		} else {
			if (frameRange[1] > lastNr) {
				toRemove += lastNr - frameRange[0] + 1;
				if (mergeRange) {
					mergeRange[1] = frameRange[1];
					newFrameRanges.push(mergeRange);
				} else {
					frameRange[0] = lastNr + 1;
					newFrameRanges.push(frameRange);
				}
				mergeRange = null;
			} else {
				toRemove += frameRange[1] - frameRange[0] + 1;
			}
		}
	}
	if (mergeRange) {
		newFrameRanges.push(mergeRange);
	}
	if (!contents && (toRemove == 0)) return;
	var pictureStories = retrieveValue('pictureStories', '').split('\n\n');
	if (contents) {
		pictureStories.splice(toSkip, toRemove, contents.substr(0, contents.length - 2));
	} else {
		pictureStories.splice(toSkip, toRemove);
	}
	storeValue('pictureStories', pictureStories.join('\n\n'));
	storeValue('pictureStoryRanges', '[' + newFrameRanges.join('],[') + ']');
}

function exportPictures(fromNr, toNr, toServer) {
	if (!fromNr || !toNr || (toNr < fromNr)) return;

	var contents = '';
	var firstNr = 0;
	var lastNr = 0;
	
	function collectPictures(url) {
		var nextIdx;
		var indexes = '';
		var nextPage;
		request(url, function (res) {
			nextPage = null;
			elRecurse(res, /<div class="pages">/, /<\/div>/, function (body) {
				elRecurse(body, /<li class="next">/, /<\/li>/, function (body) {
					elRecurse(body, /<a href="/, /">/, function (url) {
						nextPage = url.replace(/&amp;/g, '&');
						return 1;
					});
					return 1;
				});
				return 1;
			});
			elRecurse(res, /<div class="topic( \w+)*" id="p\d+">/, /<div style="clear:both;"><\/div>\s*<\/div>/, function (topic) {
				var date;
				var reply;
				elRecurse(topic, /<a href="viewtopic\.php\?pid=\d+#(p\d+)">/, /<\/a>/, function (timestamp, urlAr) {
					reply = urlAr[1];
					date = extractDate(timestamp);
					return 1;
				});
				var author;
				elRecurse(topic, /<a href="profile\.php\?id=\d+">/, /<\/a>/, function (userName) {
					author = userName;
					return 1;
				});
				var signature = author && reply && date ? '(' + author + ':' + reply + ',' + date + ')' : '';
				elRecurse(topic, /<div class="message">/, /<\/div>/, function (msg) {
					msg = tailRecurse(msg, /<strong>0*(\d+)<\/strong>(<br \/>)+/, function (ar) {
						nextIdx = parseInt(ar[1]);
						return 1;
					});
					while (msg) {
						lastNr++;
						if (nextIdx != lastNr) indexes += nextIdx + ' (' + lastNr + ') ';
						if (toNr && (lastNr > toNr)) return 1;
						var frame = msg, tail = '';
						msg = tailRecurse(msg, /<strong>0*(\d+)<\/strong>(<br \/>)+/, function (ar) {
							frame = frame.substr(0, ar.index);
							nextIdx = parseInt(ar[1]);
							return 1;
						});
						if (fromNr && (fromNr > lastNr)) continue;
						if (!firstNr) firstNr = lastNr;
						tail = elRecurse(frame, /<strong>/, /<\/strong>(<br \/>)+/, function () { return 1; });
						if (tail) frame = tail; else GM_log('No kanji for ' + lastNr);
						tail = elRecurse(frame, /<strong>/, /<\/strong>(<br \/>)+/, function () { return 1; });
						if (tail) frame = tail; else GM_log('No keyword for ' + lastNr);
						var story = '';
						tail = elRecurse(frame, null, /(<br \/>)+/, function (body) {
							story = html2text(body.trim().replace(/<\/?strong>/g, '#').replace(/<\/?em>/g, '*'));
							return 1;
						});
						if (tail) frame = tail; else GM_log('No story for ' + lastNr);
						var image = '';
						tail = elRecurse(frame, /<img /, / \/>/, function (body) {
							elRecurse(body, /src="/, /"/, function (url) {
								image= url;
								return 1;
							});
							return 1;
						});
						if (tail) frame = tail; else GM_log('No image for ' + lastNr);
						var location = '';
						tail = elRecurse(frame, /<a href="([^"]+)">/, /<\/a>/, function (body, elAr) {
							location = elAr[1];
							return 1;
						});
						if (tail) frame = tail; else GM_log('No location for ' + lastNr);
						contents += (story ? story + '\n' : '') + (image ? '{' + image + '}' + '\n' : '') + (location ? location + '\n' : '') + signature + '\n\n';
						if (toNr && (lastNr == toNr)) return 1;
					}
					return 0;
				});
				return (toNr && (lastNr >= toNr));
			});
		});
		if (indexes) {
			GM_log('Frame number typos: ' + indexes);
		}
		if (nextPage && (!toNr || (lastNr < toNr))) {
			collectPictures(nextPage);
		}
	}
	
	collectPictures(linkSitePage('/viewtopic.php?id=' + pictureThreadId, 'f'));
	if (!firstNr) return;
	var returnUrl = retrieveValue('exportReturn', window.location.href);
	if (toServer) {
		storeValue('exportPictures', contents);
		storeValue('exportFromFrameNr', firstNr);
		storeValue('exportToFrameNr', lastNr);
		storeValue('exportReturn', returnUrl);
		// Move to the kanji site.
		window.location.href = linkSitePage('/study/kanji/' + firstNr);
	} else {
		replacePictureStories(firstNr, lastNr, contents);
		storeValue('exportFromFrameNr', lastNr + 1);
		storeValue('exportToFrameNr', -1);
		storeValue('exportReturn', null);
		if (returnUrl != window.location.href) {
			// Move back.
			window.location.href = returnUrl;
		}
	}
	return [ firstNr, lastNr ];
}

function removePictures(fromNr, toNr, toServer) {
	if (!toServer && (toNr == 0)) {
		storeValue('pictureStoryRanges', '');
		storeValue('pictureStories', '');
		return;
	}
	if (fromNr < 1) fromNr = 1;
	if (toNr < fromNr) return;
	if (toServer) {
		storeValue('exportPictures', '');
		storeValue('exportFromFrameNr', fromNr);
		storeValue('exportToFrameNr', toNr);
		storeValue('exportReturn', window.location.href);
		// Move to the kanji site.
		window.location.href = linkSitePage('/study/kanji/' + toNr);
	} else {
		replacePictureStories(fromNr, toNr);
	}
}

function importPictures(frameNum) {
	var lastNr = retrieveValue('exportToFrameNr', -1);
	if (lastNr < 0) return;
	var firstNr = retrieveValue('exportFromFrameNr', 0);
	if (firstNr > lastNr) {
		storeValue('exportToFrameNr', -1);
		// Return to the forum site.
		var url = retrieveValue('exportReturn');
		if (url) {
			storeValue('exportReturn', null);
			// Return to the forum site.
			window.location.href = url;
		}
		return 0;
	}
	
	// Insert or remove
	var desiredNr = firstNr;
	var contents = retrieveValue('exportPictures');
	var removeIt = !contents;
	if (removeIt) desiredNr = lastNr;

	if (frameNum != desiredNr) {
		// Move to the next frame number.
		window.location.href = linkSitePage('/study/kanji/' + desiredNr);
		return 0;
	}
	
	var ar;
	var story;
	if (!removeIt) {
		ar = /\([a-zA-Z0-9_]+:p\d+,\d+-\d+-\d+\)\n\n/.exec(contents);
		if (!ar) return 0;
		story = contents.substr(0, ar.index + ar[0].length - 2);
		contents = contents.substr(ar.index + ar[0].length);
	}
	
	// Add, replace or remove story.
	var txtStory = xpathi('//textarea[@name="txtStory"]');
	if (!txtStory) return 0;
	if (ar = /(^|\n\n)([^\n]+\n)*\([a-zA-Z0-9_]+:p\d+,\d+-\d+-\d+\)/.exec(txtStory.value)) {
		if (removeIt) {
			txtStory.value = txtStory.value.substr(0, ar.index) + txtStory.value.substr(ar.index + ar[0].length);
		} else {
			txtStory.value = txtStory.value.substr(0, ar.index + ar[1].length) + story + txtStory.value.substr(ar.index + ar[0].length);
		}
	} else {
		if (!removeIt) {
			if (txtStory.value) txtStory.value += '\n\n';
			txtStory.value += story;
		}
	}
	
	// Change frame number.
	if (removeIt) {
		storeValue('exportToFrameNr', lastNr - 1);
	} else {
		storeValue('exportPictures', contents);
		storeValue('exportFromFrameNr', firstNr + 1);
	}

	// Submit
	var updateButton = xpathi('//input[@name="doUpdate"]');
	if (updateButton) updateButton.click();
	
	return 0;
}

function getPictureStory(frameNum) {
	var pictureStoryRanges = eval('[' + retrieveValue('pictureStoryRanges', '') + ']');
	var toSkip = 0;
	for (var rangeIdx in pictureStoryRanges) {
		var range = pictureStoryRanges[rangeIdx];
		if (range[0] > frameNum) return;
		if (range[1] >= frameNum) {
			toSkip += frameNum - range[0] - 1;
			break;
		}
		toSkip += range[1] - range[0] + 1;
	}
	var pictureStories = retrieveValue('pictureStories', '').split('\n\n');
	return pictureStories[toSkip + 1];
}

function includePictureStory(frameNum) {
	var pictureStory = getPictureStory(frameNum);
	if (!pictureStory) return;

	var hidePictureStory = false;
	switch (pictureStory.substr(pictureStory.length - 1, 1)) {
		case '/':
			pictureStory = pictureStory.substr(0, pictureStory.length - 1);
			hidePictureStory = true;
			break;
		case '\\':
			pictureStory = pictureStory.substr(0, pictureStory.length - 1);
			hidePictureStory = false;
			break;
	}

	// Break up in parts.
	var ar = /^(([^{][^\n]*)\n)?(\{([^}]+)\}\n)?(([^(][^\n]*)\n)?\(([^:]+):p(\d+),([\d-]+)\)$/.exec(pictureStory);
	if (!ar) return;
	var story = ar[2];
	var pictureUrl = ar[4];
	var locationUrl = ar[6];
	var author = ar[7];
	var msgId = ar[8];
	var date = ar[9];
	
	var sharedStoriesDiv = document.getElementById('SharedStoriesComponent');
	if (!sharedStoriesDiv) return;
	var pictureStoriesDiv = addChild(sharedStoriesDiv, 'div', {
		id: 'sharedstories-pic',
		className: hidePictureStory ? 'JsHide' : ''
	}, null, sharedStoriesDiv.firstChild);
	replaceStyle('#sharedstories-new.JsHide .title', 'margin-bottom: 0');
	applyStyle('#sharedstories-new', '#sharedstories-pic');

	var titleDiv = addChild(pictureStoriesDiv, 'div', {
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
		hidePictureStory = !hidePictureStory;
		replacePictureStories(frameNum, frameNum, pictureStory + (hidePictureStory ? '/' : '\\') + '\n\n');
		pictureStoriesDiv.className = hidePictureStory ? 'JsHide' : '';
	}, true);
	addText(titleDiv, 'Picture stories (');
	addText(addChild(titleDiv, 'span'), '1');
	addText(titleDiv, ')');

	var storyDiv = addChild(pictureStoriesDiv, 'div', {
		className: 'sharedstory'
	});

	var metaDiv = addChild(storyDiv, 'div', {
		className: 'meta'
	});
	addText(addChild(addChild(metaDiv, 'span', {
		className: 'author'
	}), 'a', {
		title: 'View ' + author + '\'s profile',
		href: linkSitePage('/profile/' + author)
	}), author);
	addText(addChild(metaDiv, 'span', {
		className: 'lastmodified'
	}), 'Last edited: ' + date);
	
	var frameDiv = addChild(storyDiv, 'div', {
		className: 'rtkframe'
	});

	var actionDiv = addChild(frameDiv, 'div', {
		id: 'pic-' + frameNum + '-1',
		className: 'action',
		appv2: '',
		appv1: ''
	});
	var actionSpan = addChild(actionDiv, 'span', {
		className: ''
	});
	addText(addChild(actionDiv, 'a', {
		className: 'copy',
		href: '#'
	}), ' ');

	var bookDiv = addChild(frameDiv, 'div', {
		className: 'bookstyle'
	});
	var toSplit = false;
	if (story) {
		var tail = story;
		var ar;
		while (ar = /\*[^*]*\*|#[^#]*#/.exec(tail)) {
			addText(bookDiv, tail.substr(0, ar.index));
			addText(addChild(bookDiv, ar[0][0] == '*' ? 'em' : 'strong'), ar[0].substr(1, ar[0].length - 2));
			tail = tail.substr(ar.index + ar[0].length);
		}
		addText(bookDiv, tail);
		toSplit = true;
	}
	if (pictureUrl) {
		if (toSplit) {
			addChild(bookDiv, 'br');
			addChild(bookDiv, 'br');
		}
		addChild(addChild(bookDiv, 'a', {
			href: linkSitePage('/viewtopic.php?pid=' + msgId + '#p' + msgId, 'f')
		}), 'img', {
			src: pictureUrl,
			alt: pictureUrl
		});
		toSplit = true;
	}
	if (locationUrl) {
		if (toSplit) {
			addChild(bookDiv, 'br');
			addChild(bookDiv, 'br');
		}
		addText(addChild(bookDiv, 'a', {
			href: locationUrl
		}), locationUrl);
		toSplit = true;
	}
	
	if (unsafeWindow.StudyPage) {
		setTimeout(function () {
			var that = unsafeWindow.StudyPage.sharedStoriesComponent;
			if (!that || !that.evEventHandler) return;
			var originalEvEventHandler = that.evEventHandler;
			that.evEventHandler = function (e) {
				if ((e.target.parentNode != actionDiv) || (e.type != 'click')) {
					return;
				}
				actionSpan.className = '';
				actionSpan.innerHTML = '';
				document.getElementById('chkPublic').checked = false;
				var txtStory = document.getElementById('frmStory');
				if (txtStory.value) txtStory.value += '\n\n';
				txtStory.value += pictureStory;
				unsafeWindow.StudyPage.editStoryComponent.editStory(txtStory.value);
			}
			that.evtCache.addEvents(document.getElementById('SharedStoriesComponent'), ['click'], that.evEventHandler.bind(that));
		}, 500);
	}
}

function addExportButtons(exportDiv, inForum) {
	var exportToServer = retrieveValue('exportToServer', 0);
	var firstNr = 1;
	if (exportToServer) {
		firstNr = retrieveValue('exportFromFrameNr', 0);
	} else {
		firstNr = eval('[[0,0],' + retrieveValue('pictureStoryRanges', '') + ']').pop()[1] + 1;
	}
	var lastNr = 3007;

	var exportButton = addChild(exportDiv, 'input', {
		type: 'button',
		className: 'btn',
		value: 'Import',
	});
	exportButton.addEventListener('click', function(e) {
		if (inForum) {
			disableDiv(exportDiv, true);
			var range = exportPictures(parseInt(exportFromTextBox.value), parseInt(exportToTextBox.value), exportToServerCheckBox.checked);
			if (range) {
				firstNr = range[1] + 1;
				lastNr = 3007;
			}
			disableDiv(exportDiv, false);
			exportFromTextBox.value = firstNr;
			exportToTextBox.value = lastNr;
		} else {
			storeValue('exportPictures', '');
			storeValue('exportFromFrameNr', parseInt(exportFromTextBox.value));
			storeValue('exportToFrameNr', parseInt(exportToTextBox.value));
			storeValue('exportReturn', window.location.href);
			// Move to the forum site.
			window.location.href = linkSitePage('/viewtopic.php?id=' + pictureThreadId, 'f');
		}
	}, true);
	addText(exportDiv, ' or ');
	var removeButton = addChild(exportDiv, 'input', {
		type: 'button',
		className: 'btn',
		value: 'remove',
	});
	removeButton.addEventListener('click', function(e) {
		removePictures(parseInt(exportFromTextBox.value), parseInt(exportToTextBox.value), exportToServerCheckBox.checked);
		firstNr = 1;
		lastNr = parseInt(exportFromTextBox.value) - 1;
		exportFromTextBox.value = firstNr;
		exportToTextBox.value = lastNr;
	}, true);
	if (inForum) {
		addText(exportDiv, ' pictures from #');
	} else {
		addText(exportDiv, ' ');
		addText(addChild(exportDiv, 'a', {
			href: linkSitePage('/viewtopic.php?id=' + pictureThreadId, 'f')
		}), 'stoked\'s pictures');
		addText(exportDiv, ' from #');
	}
	var exportFromTextBox = addChild(exportDiv, 'input', {
		type: 'text',
		className: 'textfield',
		value: firstNr 
	}, 'width:36px; text-align: right');
	exportFromTextBox.addEventListener('change', function (e) {
		var frameNr = e.target.value.trim();
		if (isNaN(frameNr)) {
			frameNr = firstNr;
		}
		e.target.value = frameNr;
	}, true);
	addText(exportDiv, ' to #');
	var exportToTextBox = addChild(exportDiv, 'input', {
		type: 'text',
		className: 'textfield', 
		value: lastNr
	}, 'width:36px; text-align: right');
	exportToTextBox.addEventListener('change', function (e) {
		var frameNr = e.target.value.trim();
		if (isNaN(frameNr)) {
			frameNr = lastNr;
		}
		e.target.value = frameNr;
	}, true);
	addText(exportDiv, ' on server');
	var exportToServerCheckBox = addChild(exportDiv, 'input', {
		type: 'checkbox', 
		checked: exportToServer
	});
	exportToServerCheckBox.addEventListener('click', function(e) {
		storeValue('exportToServer', e.target.checked);
	}, true);
}

// Forum site
if (matchSitePage('/viewtopic.php', 'f') != null) {
	if  (matchSitePage('/viewtopic.php?id=' + pictureThreadId, 'f') == null) {
		var titleEl = xpathi('//div[@id="viewtopic_head"]/h1');
		if (!titleEl || (titleEl.textContent != 'RTK1: One kanji, one picture')) return;
	}

	if (exportPictures(retrieveValue('exportFromFrameNr', 0), retrieveValue('exportToFrameNr', 0), retrieveValue('exportToServer', false))) return;
	
	var div = document.getElementById('viewtopic_head');
	
	var exportDiv = addChild(div, 'div', null, 'float:right;');
	exportDiv.previousSibling.previousSibling.setAttribute('style', 'float:left;');

	addExportButtons(exportDiv, true);

	return;
}

// Kanji site

// Profile page
if (matchSitePage('/profile') != null) {
	// Check if it's the current user's profile.
	if (!matchProfileName()) return;
	
	var div = createGreaseMonkeyDivision('Option|Picture Import');

	addExportButtons(div, false);

	addChild(div, 'br');

	return;
}

// Study page: Stories
if (matchSitePage('/study/mystories') != null) {
	var stories = xpath('//span[@class="bookstyle"]');
	for (var idx = 0; idx < stories.snapshotLength; idx++) {
		var myStory = stories.snapshotItem(idx);
		
		// Reintroduce frame references
		myStory.innerHTML = myStory.innerHTML.replace(/(<em>[^<]*<\/em>\s+)\((FRAME\s+)(\d+)\)/ig, '$1(<a href="' + linkSitePage('/study/kanji/') + '$3">$2$3</a>)');
		
		addLinks(myStory, 0);
		
		// Let all tags open in a different tab
		var storyTags = myStory.getElementsByTagName('a');
		for (var tagIdx = 0; tagIdx < storyTags.length; tagIdx++) {
			storyTags[tagIdx].target = '_blank';
		}
	}
	var keywords = xpath('//a[@class="wrapper"]/span[@class="keywo"]');
	for (var idx = 0; idx < keywords.snapshotLength; idx++) {
		var keyword = keywords.snapshotItem(idx);
		var wrapper = keyword.parentNode;
		addChild(wrapper, 'a', {
			href: wrapper.href,
			target: '_blank'
		}, null, keyword.nextSibling).appendChild(keyword);
		wrapper.id = 'my-story-' + extractFrameNum(wrapper.href);
		wrapper.href = '#' + wrapper.id;
	}
	return;
}

// Study page: Kanji
if (matchSitePage('/study/kanji') != null) {
	// Get frame number of this page.
	var frameNumEl = xpathi('//div[@class="framenum"]');
	if (!frameNumEl) return;
	var frameNum = parseInt(frameNumEl.textContent);

	if (importPictures(frameNum)) return;

	includePictureStory(frameNum);

	var storyAuthors = xpath('//div[@class="sharedstory"]/div[@class="meta"]/span[@class="author"]');
	var authorLinks = [];
	var authors = new Array();
	for (var idx = 0; idx < storyAuthors.snapshotLength; idx++) {
		var authorLink = storyAuthors.snapshotItem(idx);
		var author = authorLink.firstChild.innerHTML.toLowerCase();
		authorLinks[author] = authorLink.wrappedJSObject || authorLink;
		authors.push(author);
	}
	// No need to add slashes to authors, since they all are composed of basic characters.
	authorsRE = new RegExp('(^|[^a-zA-Z0-9_])(' + authors.join('|') + ')($|[^a-zA-Z0-9_])', 'i');

	unsafeWindow.focusOnAuthor = function(author) {
		authorLinks[author].scrollIntoView();
	};

	var storyView = document.getElementById('sv-textarea');
	if (!storyView) return;
	addLinks(storyView, 0);
	// Prevent opening the text box when clicking on an anchor.
	storyView.addEventListener('click', function (e) {
		if (e.target.tagName.toLowerCase() == 'a') {
			e.stopPropagation();
		}
	}, true);

	var sharedStories = xpath('//div[@class="sharedstory"]/div[@class="rtkframe"]/div[@class="bookstyle"]');
	for (var idx = 0; idx < sharedStories.snapshotLength; idx++) {
		addLinks(sharedStories.snapshotItem(idx), 1);
	}

	var storyIds = xpatho('//div[@class="sharedstory"]/div[@class="rtkframe"]/div[@class="action"]');
	var storyDates = xpatho('//div[@class="sharedstory"]/div[@class="meta"]/span[@class="lastmodified"]');
	for (var idx = 0; idx < storyDates.snapshotLength; idx++) {
		var storyDate = storyDates.snapshotItem(idx);
		addChild(storyDate.parentNode, 'a', {
			href: linkSitePage('/study/kanji/' + frameNum + '#' + storyIds.snapshotItem(idx).id)
		}, 'text-decoration: none;').appendChild(storyDate);
	}
	
	return;
}
