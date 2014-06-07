// kanjikoohiikanjilinks! user script for Firefox's GreaseMonkey extension
// version 1.0 BETA! Copyright (c) 2006,2007 Ricardo Mendonca Ferreira
// Portions of the code Copyright (c) 2006, Michael Spertus
// Portions of the code Copyright (c) 2008-2009, Mario Huys
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// Kanji stroke order animations originated at 
// http://commons.wikimedia.org/w/index.php?title=Category:Chinese_stroke_order_in_animated_GIF
// and are in the public domain.
//
// --------------------------------------------------------------------
//
// 1.5  2009.11.02  woelpad  Adapted to the new site look
// 1.4  2009.05.19  woelpad  Embedded the domLib.js and domTT.js libraries inside
//                    the script to avoid contamination by koohii scripts,
//                    specifically tampering with the Hash class.
// 1.3  2008.10.03  woelpad  Added link for Yamasa Online Kanji Dictionary 
// 1.2  2008.08.28  woelpad  Open links in a different tab or window
// 1.1  2008.08.21  woelpad  Added Script Update Checker
// 1.0  2008.07.04  woelpad  Makeover
// 0.9  2008.06.25  Fix for Firefox 3 (Mario Huys)
// 0.8  2007.05.29  Fix after Fabrice's update on review area (Ricardo M. Ferreira)
// 0.7  2007.01.29  Added link for Wiktionary (Ricardo M. Ferreira)
// 0.6b 2006.11.24  Fixed some memory leaks (Ricardo M. Ferreira)
// 0.6  2006.11.18  Added link for Taka Stroke Order Diagrams (Ricardo M. Ferreira)
// 0.5  2006.07.30  Changed polling interval to reduce overhead (Michael Spertus)
// 0.4  2006.07.15  Works on review pane as well as study pane (Michael Spertus)
// 0.3  2006.07.14  Add Kanji Stroke Order animations (Michael Spertus)
// 0.2  2006.07.08  Added Google & Google Images links (Ricardo M. Ferreira)
// 0.1  2006.07.07  First release (Ricardo M. Ferreira)
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Kanji.Koohii: Kanji Links
// @namespace     http://userscripts.org/scripts/show/29550
// @description   Show links for kanji information in a tooltip menu for the site "Reviewing the Kanji"
// @include       http://kanji.koohii.com/review*
// @include       http://kanji.koohii.com/study/kanji/*
// @exclude       
// ==/UserScript==

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 29550; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1257206814263; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]


// Including the open source libraries domLib.js and domTT.js, adapted to 
// work in a Greasemonkey "bubble". Specifically event handlers for objects 
// have been reshaped to use the functions addEvent and hasEvent listed here 
// first.

function addEvent(el, eventType, func) {
	// Can't use 'on', therefore prepending something less reserved.
	el['under' + eventType] = func;
	el.addEventListener(eventType, func, true);
}

function hasEvent(el, eventType) {
	return typeof el['under' + eventType] == 'function';
}

// [DOM Library core] written by Dan Allen, Mojavelinux.com (dan.allen@mojavelinux.com)
/** $Id: domLib.js 2321 2006-06-12 06:45:41Z dallen $ */
// {{{ license

/*
 * Copyright 2002-2005 Dan Allen, Mojavelinux.com (dan.allen@mojavelinux.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// }}}
// {{{ intro

/**
 * Title: DOM Library Core
 * Version: 0.70
 *
 * Summary:
 * A set of commonly used functions that make it easier to create javascript
 * applications that rely on the DOM.
 *
 * Updated: 2005/05/17
 *
 * Maintainer: Dan Allen <dan.allen@mojavelinux.com>
 * Maintainer: Jason Rust <jrust@rustyparts.com>
 *
 * License: Apache 2.0
 */

// }}}
// {{{ global constants (DO NOT EDIT)

// -- Browser Detection --
var domLib_userAgent = navigator.userAgent.toLowerCase();
var domLib_isMac = navigator.appVersion.indexOf('Mac') != -1;
var domLib_isWin = domLib_userAgent.indexOf('windows') != -1;
// NOTE: could use window.opera for detecting Opera
var domLib_isOpera = domLib_userAgent.indexOf('opera') != -1;
var domLib_isOpera7up = domLib_userAgent.match(/opera.(7|8)/i);
var domLib_isSafari = domLib_userAgent.indexOf('safari') != -1;
var domLib_isKonq = domLib_userAgent.indexOf('konqueror') != -1;
// Both konqueror and safari use the khtml rendering engine
var domLib_isKHTML = (domLib_isKonq || domLib_isSafari || domLib_userAgent.indexOf('khtml') != -1);
var domLib_isIE = (!domLib_isKHTML && !domLib_isOpera && (domLib_userAgent.indexOf('msie 5') != -1 || domLib_userAgent.indexOf('msie 6') != -1 || domLib_userAgent.indexOf('msie 7') != -1));
var domLib_isIE5up = domLib_isIE;
var domLib_isIE50 = (domLib_isIE && domLib_userAgent.indexOf('msie 5.0') != -1);
var domLib_isIE55 = (domLib_isIE && domLib_userAgent.indexOf('msie 5.5') != -1);
var domLib_isIE5 = (domLib_isIE50 || domLib_isIE55);
// safari and konq may use string "khtml, like gecko", so check for destinctive /
var domLib_isGecko = domLib_userAgent.indexOf('gecko/') != -1;
var domLib_isMacIE = (domLib_isIE && domLib_isMac);
var domLib_isIE55up = domLib_isIE5up && !domLib_isIE50 && !domLib_isMacIE;
var domLib_isIE6up = domLib_isIE55up && !domLib_isIE55;

// -- Browser Abilities --
var domLib_standardsMode = (document.compatMode && document.compatMode == 'CSS1Compat');
var domLib_useLibrary = (domLib_isOpera7up || domLib_isKHTML || domLib_isIE5up || domLib_isGecko || domLib_isMacIE || document.defaultView);
// fixed in Konq3.2
var domLib_hasBrokenTimeout = (domLib_isMacIE || (domLib_isKonq && domLib_userAgent.match(/konqueror\/3.([2-9])/) == null));
var domLib_canFade = (domLib_isGecko || domLib_isIE || domLib_isSafari || domLib_isOpera);
var domLib_canDrawOverSelect = (domLib_isMac || domLib_isOpera || domLib_isGecko);
var domLib_canDrawOverFlash = (domLib_isMac || domLib_isWin);

// -- Event Variables --
var domLib_eventTarget = domLib_isIE ? 'srcElement' : 'currentTarget';
var domLib_eventButton = domLib_isIE ? 'button' : 'which';
var domLib_eventTo = domLib_isIE ? 'toElement' : 'relatedTarget';
var domLib_stylePointer = domLib_isIE ? 'hand' : 'pointer';
// NOTE: a bug exists in Opera that prevents maxWidth from being set to 'none', so we make it huge
var domLib_styleNoMaxWidth = domLib_isOpera ? '10000px' : 'none';
var domLib_hidePosition = '-1000px';
var domLib_scrollbarWidth = 14;
var domLib_autoId = 1;
var domLib_zIndex = 100;

// -- Detection --
var domLib_collisionElements;
var domLib_collisionsCached = false;

var domLib_timeoutStateId = 0;
var domLib_timeoutStates = new Hash();

// }}}
// {{{ DOM enhancements

if (!document.ELEMENT_NODE)
{
	document.ELEMENT_NODE = 1;
	document.ATTRIBUTE_NODE = 2;
	document.TEXT_NODE = 3;
	document.DOCUMENT_NODE = 9;
	document.DOCUMENT_FRAGMENT_NODE = 11;
}

function domLib_clone(obj)
{
	var copy = {};
	for (var i in obj)
	{
		var value = obj[i];
		try
		{
			if (value != null && typeof(value) == 'object' && value != window && !value.nodeType)
			{
				copy[i] = domLib_clone(value);
			}
			else
			{
				copy[i] = value;
			}
		}
		catch(e)
		{
			copy[i] = value;
		}
	}

	return copy;
}

// }}}
// {{{ class Hash()

function Hash()
{
	this.length = 0;
	this.numericLength = 0; 
	this.elementData = [];
	for (var i = 0; i < arguments.length; i += 2)
	{
		if (typeof(arguments[i + 1]) != 'undefined')
		{
			this.elementData[arguments[i]] = arguments[i + 1];
			this.length++;
			if (arguments[i] == parseInt(arguments[i])) 
			{
				this.numericLength++;
			}
		}
	}
}

// using prototype as opposed to inner functions saves on memory 
Hash.prototype.get = function(in_key)
{
	if (typeof(this.elementData[in_key]) != 'undefined') {
		return this.elementData[in_key];
	}

	return null;
}

Hash.prototype.set = function(in_key, in_value)
{
	if (typeof(in_value) != 'undefined')
	{
		if (typeof(this.elementData[in_key]) == 'undefined')
		{
			this.length++;
			if (in_key == parseInt(in_key)) 
			{
				this.numericLength++;
			}
		}

		return this.elementData[in_key] = in_value;
	}

	return false;
}

Hash.prototype.remove = function(in_key)
{
	var tmp_value;
	if (typeof(this.elementData[in_key]) != 'undefined')
	{
		this.length--;
		if (in_key == parseInt(in_key)) 
		{
			this.numericLength--;
		}

		tmp_value = this.elementData[in_key];
		delete this.elementData[in_key];
	}

	return tmp_value;
}

Hash.prototype.size = function()
{
	return this.length;
}

Hash.prototype.has = function(in_key)
{
	return typeof(this.elementData[in_key]) != 'undefined';
}

Hash.prototype.find = function(in_obj)
{
	for (var tmp_key in this.elementData) 
	{
		if (this.elementData[tmp_key] == in_obj) 
		{
			return tmp_key;
		}
	}

	return null;
}

Hash.prototype.merge = function(in_hash)
{
	for (var tmp_key in in_hash.elementData) 
	{
		if (typeof(this.elementData[tmp_key]) == 'undefined') 
		{
			this.length++;
			if (tmp_key == parseInt(tmp_key)) 
			{
				this.numericLength++;
			}
		}

		this.elementData[tmp_key] = in_hash.elementData[tmp_key];
	}
}

Hash.prototype.compare = function(in_hash)
{
	if (this.length != in_hash.length) 
	{
		return false;
	}

	for (var tmp_key in this.elementData) 
	{
		if (this.elementData[tmp_key] != in_hash.elementData[tmp_key]) 
		{
			return false;
		}
	}
	
	return true;
}

// }}}
// {{{ domLib_isDescendantOf()

function domLib_isDescendantOf(in_object, in_ancestor, in_bannedTags)
{
	if (in_object == null)
	{
		return false;
	}

	if (in_object == in_ancestor)
	{
		return true;
	}

	if (typeof(in_bannedTags) != 'undefined' &&
		(',' + in_bannedTags.join(',') + ',').indexOf(',' + in_object.tagName + ',') != -1)
	{
		return false;
	}

	while (in_object != document.documentElement)
	{
		try
		{
			if ((tmp_object = in_object.offsetParent) && tmp_object == in_ancestor)
			{
				return true;
			}
			else if ((tmp_object = in_object.parentNode) == in_ancestor)
			{
				return true;
			}
			else
			{
				in_object = tmp_object;
			}
		}
		// in case we get some wierd error, assume we left the building
		catch(e)
		{
			return false;
		}
	}

	return false;
}

// }}}
// {{{ domLib_detectCollisions()

/**
 * For any given target element, determine if elements on the page
 * are colliding with it that do not obey the rules of z-index.
 */
function domLib_detectCollisions(in_object, in_recover, in_useCache)
{
	// the reason for the cache is that if the root menu is built before
	// the page is done loading, then it might not find all the elements.
	// so really the only time you don't use cache is when building the
	// menu as part of the page load
	if (!domLib_collisionsCached)
	{
		var tags = [];

		if (!domLib_canDrawOverFlash)
		{
			tags[tags.length] = 'object';
		}

		if (!domLib_canDrawOverSelect)
		{
			tags[tags.length] = 'select';
		}

		domLib_collisionElements = domLib_getElementsByTagNames(tags, true);
		domLib_collisionsCached = in_useCache;
	}

	// if we don't have a tip, then unhide selects
	if (in_recover)
	{
		for (var cnt = 0; cnt < domLib_collisionElements.length; cnt++)
		{
			var thisElement = domLib_collisionElements[cnt];

			if (!thisElement.hideList)
			{
				thisElement.hideList = new Hash();
			}

			thisElement.hideList.remove(in_object.id);
			if (!thisElement.hideList.length)
			{
				domLib_collisionElements[cnt].style.visibility = 'visible';
				if (domLib_isKonq)
				{
					domLib_collisionElements[cnt].style.display = '';
				}
			}
		}

		return;
	}
	else if (domLib_collisionElements.length == 0)
	{
		return;
	}

	// okay, we have a tip, so hunt and destroy
	var objectOffsets = domLib_getOffsets(in_object);

	for (var cnt = 0; cnt < domLib_collisionElements.length; cnt++)
	{
		var thisElement = domLib_collisionElements[cnt];

		// if collision element is in active element, move on
		// WARNING: is this too costly?
		if (domLib_isDescendantOf(thisElement, in_object))
		{
			continue;
		}

		// konqueror only has trouble with multirow selects
		if (domLib_isKonq &&
			thisElement.tagName == 'SELECT' &&
			(thisElement.size <= 1 && !thisElement.multiple))
		{
			continue;
		}

		if (!thisElement.hideList)
		{
			thisElement.hideList = new Hash();
		}

		var selectOffsets = domLib_getOffsets(thisElement); 
		var center2centerDistance = Math.sqrt(Math.pow(selectOffsets.get('leftCenter') - objectOffsets.get('leftCenter'), 2) + Math.pow(selectOffsets.get('topCenter') - objectOffsets.get('topCenter'), 2));
		var radiusSum = selectOffsets.get('radius') + objectOffsets.get('radius');
		// the encompassing circles are overlapping, get in for a closer look
		if (center2centerDistance < radiusSum)
		{
			// tip is left of select
			if ((objectOffsets.get('leftCenter') <= selectOffsets.get('leftCenter') && objectOffsets.get('right') < selectOffsets.get('left')) ||
			// tip is right of select
				(objectOffsets.get('leftCenter') > selectOffsets.get('leftCenter') && objectOffsets.get('left') > selectOffsets.get('right')) ||
			// tip is above select
				(objectOffsets.get('topCenter') <= selectOffsets.get('topCenter') && objectOffsets.get('bottom') < selectOffsets.get('top')) ||
			// tip is below select
				(objectOffsets.get('topCenter') > selectOffsets.get('topCenter') && objectOffsets.get('top') > selectOffsets.get('bottom')))
			{
				thisElement.hideList.remove(in_object.id);
				if (!thisElement.hideList.length)
				{
					thisElement.style.visibility = 'visible';
					if (domLib_isKonq)
					{
						thisElement.style.display = '';
					}
				}
			}
			else
			{
				thisElement.hideList.set(in_object.id, true);
				thisElement.style.visibility = 'hidden';
				if (domLib_isKonq)
				{
					thisElement.style.display = 'none';
				}
			}
		}
	}
}

// }}}
// {{{ domLib_getOffsets()

function domLib_getOffsets(in_object, in_preserveScroll)
{
	if (typeof(in_preserveScroll) == 'undefined') {
		in_preserveScroll = false;
	}

	var originalObject = in_object;
	var originalWidth = in_object.offsetWidth;
	var originalHeight = in_object.offsetHeight;
	var offsetLeft = 0;
	var offsetTop = 0;

	while (in_object)
	{
		offsetLeft += in_object.offsetLeft;
		offsetTop += in_object.offsetTop;
		in_object = in_object.offsetParent;
		// consider scroll offset of parent elements
		if (in_object && !in_preserveScroll)
		{
			offsetLeft -= in_object.scrollLeft;
			offsetTop -= in_object.scrollTop;
		}
	}

	// MacIE misreports the offsets (even with margin: 0 in body{}), still not perfect
	if (domLib_isMacIE) {
		offsetLeft += 10;
		offsetTop += 10;
	}

	return new Hash(
		'left',		offsetLeft,
		'top',		offsetTop,
		'right',	offsetLeft + originalWidth,
		'bottom',	offsetTop + originalHeight,
		'leftCenter',	offsetLeft + originalWidth/2,
		'topCenter',	offsetTop + originalHeight/2,
		'radius',	Math.max(originalWidth, originalHeight) 
	);
}

// }}}
// {{{ domLib_setTimeout()

function domLib_setTimeout(in_function, in_timeout, in_args)
{
	if (typeof(in_args) == 'undefined')
	{
		in_args = [];
	}

	if (in_timeout == -1)
	{
		// timeout event is disabled
		return 0;
	}
	else if (in_timeout == 0)
	{
		in_function(in_args);
		return 0;
	}

	// must make a copy of the arguments so that we release the reference
	var args = domLib_clone(in_args);

	if (!domLib_hasBrokenTimeout)
	{
		return setTimeout(function() { in_function(args); }, in_timeout);
	}
	else
	{
		var id = domLib_timeoutStateId++;
		var data = new Hash();
		data.set('function', in_function);
		data.set('args', args);
		domLib_timeoutStates.set(id, data);

		data.set('timeoutId', setTimeout('domLib_timeoutStates.get(' + id + ').get(\'function\')(domLib_timeoutStates.get(' + id + ').get(\'args\')); domLib_timeoutStates.remove(' + id + ');', in_timeout));
		return id;
	}
}

// }}}
// {{{ domLib_clearTimeout()

function domLib_clearTimeout(in_id)
{
	if (!domLib_hasBrokenTimeout)
	{
		if (in_id > 0) {
			clearTimeout(in_id);
		}
	}
	else
	{
		if (domLib_timeoutStates.has(in_id))
		{
			clearTimeout(domLib_timeoutStates.get(in_id).get('timeoutId'))
			domLib_timeoutStates.remove(in_id);
		}
	}
}

// }}}
// {{{ domLib_getEventPosition()

function domLib_getEventPosition(in_eventObj)
{
	var eventPosition = new Hash('x', 0, 'y', 0, 'scrollX', 0, 'scrollY', 0);

	// IE varies depending on standard compliance mode
	if (domLib_isIE)
	{
		var doc = (domLib_standardsMode ? document.documentElement : document.body);
		// NOTE: events may fire before the body has been loaded
		if (doc)
		{
			eventPosition.set('x', in_eventObj.clientX + doc.scrollLeft);
			eventPosition.set('y', in_eventObj.clientY + doc.scrollTop);
			eventPosition.set('scrollX', doc.scrollLeft);
			eventPosition.set('scrollY', doc.scrollTop);
		}
	}
	else
	{
		eventPosition.set('x', in_eventObj.pageX);
		eventPosition.set('y', in_eventObj.pageY);
		eventPosition.set('scrollX', in_eventObj.pageX - in_eventObj.clientX);
		eventPosition.set('scrollY', in_eventObj.pageY - in_eventObj.clientY);
	}

	return eventPosition;
}

// }}}
// {{{ domLib_cancelBubble()

function domLib_cancelBubble(in_event)
{
	var eventObj = in_event ? in_event : window.event;
	eventObj.cancelBubble = true;
}

// }}}
// {{{ domLib_getIFrameReference()

function domLib_getIFrameReference(in_frame)
{
	if (domLib_isGecko || domLib_isIE)
	{
		return in_frame.frameElement;
	}
	else
	{
		// we could either do it this way or require an id on the frame
		// equivalent to the name
		var name = in_frame.name;
		if (!name || !in_frame.parent)
		{
			return null;
		}

		var candidates = in_frame.parent.document.getElementsByTagName('iframe');
		for (var i = 0; i < candidates.length; i++)
		{
			if (candidates[i].name == name)
			{
				return candidates[i];
			}
		}

		return null;
	}
}

// }}}
// {{{ domLib_getElementsByClass()

function domLib_getElementsByClass(in_class)
{
	var elements = domLib_isIE5 ? document.all : document.getElementsByTagName('*');	
	var matches = [];	
	var cnt = 0;
	for (var i = 0; i < elements.length; i++)
	{
		if ((" " + elements[i].className + " ").indexOf(" " + in_class + " ") != -1)
		{
			matches[cnt++] = elements[i];
		}
	}

	return matches;
}

// }}}
// {{{ domLib_getElementsByTagNames()

function domLib_getElementsByTagNames(in_list, in_excludeHidden)
{
	var elements = [];
	for (var i = 0; i < in_list.length; i++)
	{
		var matches = document.getElementsByTagName(in_list[i]);
		for (var j = 0; j < matches.length; j++)
		{
			// skip objects that have nested embeds, or else we get "flashing"
			if (matches[j].tagName == 'OBJECT' && domLib_isGecko)
			{
				var kids = matches[j].childNodes;
				var skip = false;
				for (var k = 0; k < kids.length; k++)
				{
					if (kids[k].tagName == 'EMBED')
					{
						skip = true;
						break;
					}
				}
				if (skip) continue;
			}

			if (in_excludeHidden && domLib_getComputedStyle(matches[j], 'visibility') == 'hidden')
			{
				continue;
			}

			elements[elements.length] = matches[j];	
		}
	}

	return elements;
}

// }}}
// {{{ domLib_getComputedStyle()

function domLib_getComputedStyle(in_obj, in_property)
{
	if (domLib_isIE)
	{
		var humpBackProp = in_property.replace(/-(.)/, function (a, b) { return b.toUpperCase(); });
		return eval('in_obj.currentStyle.' + humpBackProp);
	}
	// getComputedStyle() is broken in konqueror, so let's go for the style object
	else if (domLib_isKonq)
	{
		//var humpBackProp = in_property.replace(/-(.)/, function (a, b) { return b.toUpperCase(); });
		return eval('in_obj.style.' + in_property);
	}
	else
	{
		return document.defaultView.getComputedStyle(in_obj, null).getPropertyValue(in_property);
	}
}

// }}}
// {{{ makeTrue()

function makeTrue()
{
	return true;
}

// }}}
// {{{ makeFalse()

function makeFalse()
{
	return false;
}

// }}}

// [/DOM Library core]

// [DOM Tooltip Library] written by Dan Allen, Mojavelinux.com (dan.allen@mojavelinux.com)

/** $Id: domTT.js 2324 2006-06-12 07:06:39Z dallen $ */
// {{{ license

/*
 * Copyright 2002-2005 Dan Allen, Mojavelinux.com (dan.allen@mojavelinux.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// }}}
// {{{ intro

/**
 * Title: DOM Tooltip Library
 * Version: 0.7.3
 *
 * Summary:
 * Allows developers to add custom tooltips to the webpages.  Tooltips are
 * generated using the domTT_activate() function and customized by setting
 * a handful of options.
 *
 * Maintainer: Dan Allen <dan.allen@mojavelinux.com>
 * Contributors:
 * 		Josh Gross <josh@jportalhome.com>
 *		Jason Rust <jason@rustyparts.com>
 *
 * License: Apache 2.0
 * However, if you use this library, you earn the position of official bug
 * reporter :) Please post questions or problem reports to the newsgroup:
 *
 *   http://groups-beta.google.com/group/dom-tooltip
 *
 * If you are doing this for commercial work, perhaps you could send me a few
 * Starbucks Coffee gift dollars or PayPal bucks to encourage future
 * developement (NOT REQUIRED).  E-mail me for my snail mail address.

 *
 * Homepage: http://www.mojavelinux.com/projects/domtooltip/
 *
 * Newsgroup: http://groups-beta.google.com/group/dom-tooltip
 *
 * Freshmeat Project: http://freshmeat.net/projects/domtt/?topic_id=92
 *
 * Updated: 2005/07/16
 *
 * Supported Browsers:
 * Mozilla (Gecko), IE 5.5+, IE on Mac, Safari, Konqueror, Opera 7
 *
 * Usage:
 * Please see the HOWTO documentation.
**/

// }}}
// {{{ settings (editable)

// IE mouse events seem to be off by 2 pixels
var domTT_offsetX = (domLib_isIE ? -2 : 0);
var domTT_offsetY = (domLib_isIE ? 4 : 2);
var domTT_direction = 'southeast';
var domTT_mouseHeight = domLib_isIE ? 13 : 19;
var domTT_closeLink = 'X';
var domTT_closeAction = 'hide';
var domTT_activateDelay = 500;
var domTT_maxWidth = false;
var domTT_styleClass = 'domTT';
var domTT_fade = 'neither';
var domTT_lifetime = 0;
var domTT_grid = 0;
var domTT_trailDelay = 200;
var domTT_useGlobalMousePosition = true;
var domTT_postponeActivation = false;
var domTT_tooltipIdPrefix = '[domTT]';
var domTT_screenEdgeDetection = true;
var domTT_screenEdgePadding = 4;
var domTT_oneOnly = false;
var domTT_cloneNodes = false;
var domTT_detectCollisions = true;
var domTT_bannedTags = ['OPTION'];
var domTT_draggable = false;
if (typeof(domTT_dragEnabled) == 'undefined')
{
	domTT_dragEnabled = false;
}

// }}}
// {{{ globals (DO NOT EDIT)

var domTT_predefined = new Hash();
// tooltips are keyed on both the tip id and the owner id,
// since events can originate on either object
var domTT_tooltips = new Hash();
var domTT_lastOpened = 0;
var domTT_documentLoaded = false;
var domTT_mousePosition = null;

// }}}
// {{{ document.onmousemove

if (domLib_useLibrary && domTT_useGlobalMousePosition)
{
	addEvent(document, 'mousemove', function(in_event)
	{
		if (typeof(in_event) == 'undefined') { in_event = window.event; }

		domTT_mousePosition = domLib_getEventPosition(in_event);
		if (domTT_dragEnabled && domTT_dragMouseDown)
		{
			domTT_dragUpdate(in_event);
		}
	});
}

// }}}
// {{{ domTT_activate()

function domTT_activate(in_this, in_event)
{
	if (!domLib_useLibrary || (domTT_postponeActivation && !domTT_documentLoaded)) { return false; }

	// make sure in_event is set (for IE, some cases we have to use window.event)
	if (typeof(in_event) == 'undefined') { in_event = window.event;	}

	// don't allow tooltips on banned tags (such as OPTION)
	if (in_event != null) {
		var target = in_event.srcElement ? in_event.srcElement : in_event.target;
		if (target != null && (',' + domTT_bannedTags.join(',') + ',').indexOf(',' + target.tagName + ',') != -1)
		{
			return false;
		}
	}

	var owner = document.body;
	// we have an active event so get the owner
	if (in_event != null && in_event.type.match(/key|mouse|click|contextmenu/i))
	{
		// make sure we have nothing higher than the body element
		if (in_this.nodeType && in_this.nodeType != document.DOCUMENT_NODE)
		{
			owner = in_this;
		}
	}
	// non active event (make sure we were passed a string id)
	else
	{
		if (typeof(in_this) != 'object' && !(owner = domTT_tooltips.get(in_this)))
		{
			// NOTE: two steps to avoid "flashing" in gecko
			var embryo = document.createElement('div');
			owner = document.body.appendChild(embryo);
			owner.style.display = 'none';
			owner.id = in_this;
		}
	}

	// make sure the owner has a unique id
	if (!owner.id)
	{
		owner.id = '__autoId' + domLib_autoId++;
	}

	// see if we should only be opening one tip at a time
	// NOTE: this is not "perfect" yet since it really steps on any other
	// tip working on fade out or delayed close, but it get's the job done
	if (domTT_oneOnly && domTT_lastOpened)
	{
		domTT_deactivate(domTT_lastOpened);
	}

	domTT_lastOpened = owner.id;

	var tooltip = domTT_tooltips.get(owner.id);
	if (tooltip)
	{
		if (tooltip.get('eventType') != in_event.type)
		{
			if (tooltip.get('type') == 'greasy')
			{
				tooltip.set('closeAction', 'destroy');
				domTT_deactivate(owner.id);
			}
			else if (tooltip.get('status') != 'inactive')
			{
				return owner.id;
			}
		}
		else
		{
			if (tooltip.get('status') == 'inactive')
			{
				tooltip.set('status', 'pending');
				tooltip.set('activateTimeout', domLib_setTimeout(domTT_runShow, tooltip.get('delay'), [owner.id, in_event]));

				return owner.id;
			}
			// either pending or active, let it be
			else
			{
				return owner.id;
			}
		}
	}

	// setup the default options hash
	var options = new Hash(
		'caption',		'',
		'content',		'',
		'clearMouse',	true,
		'closeAction',	domTT_closeAction,
		'closeLink',	domTT_closeLink,
		'delay',		domTT_activateDelay,
		'direction',	domTT_direction,
		'draggable',	domTT_draggable,
		'fade',			domTT_fade,
		'fadeMax',		100,
		'grid',			domTT_grid,
		'id',			domTT_tooltipIdPrefix + owner.id,
		'inframe',		false,
		'lifetime',		domTT_lifetime,
		'offsetX',		domTT_offsetX,
		'offsetY',		domTT_offsetY,
		'parent',		document.body,
		'position',		'absolute',
		'styleClass',	domTT_styleClass,
		'type',			'greasy',
		'trail',		false,
		'lazy',			false
	);

	// load in the options from the function call
	for (var i = 2; i < arguments.length; i += 2)
	{
		// load in predefined
		if (arguments[i] == 'predefined')
		{
			var predefinedOptions = domTT_predefined.get(arguments[i + 1]);
			for (var j in predefinedOptions.elementData)
			{
				options.set(j, predefinedOptions.get(j));
			}
		}
		// set option
		else
		{
			options.set(arguments[i], arguments[i + 1]);
		}
	}

	options.set('eventType', in_event != null ? in_event.type : null);

	// immediately set the status text if provided
	if (options.has('statusText'))
	{
		try { window.status = options.get('statusText'); } catch(e) {}
	}

	// if we didn't give content...assume we just wanted to change the status and return
	if (!options.has('content') || options.get('content') == '' || options.get('content') == null)
	{
		if (!hasEvent(owner, 'mouseout'))
		{
			addEvent(owner, 'mouseout', function(in_event) { domTT_mouseout(this, in_event); });
		}

		return owner.id;
	}

	options.set('owner', owner);

	domTT_create(options);

	// determine the show delay
	options.set('delay', (in_event != null && in_event.type.match(/click|mousedown|contextmenu/i)) ? 0 : parseInt(options.get('delay')));
	domTT_tooltips.set(owner.id, options);
	domTT_tooltips.set(options.get('id'), options);
	options.set('status', 'pending');
	options.set('activateTimeout', domLib_setTimeout(domTT_runShow, options.get('delay'), [owner.id, in_event]));

	return owner.id;
}

// }}}
// {{{ domTT_create()

function domTT_create(in_options)
{
	var tipOwner = in_options.get('owner');
	var parentObj = in_options.get('parent');
	var parentDoc = parentObj.ownerDocument || parentObj.document;

	// create the tooltip and hide it
	// NOTE: two steps to avoid "flashing" in gecko
	var embryo = parentDoc.createElement('div');
	var tipObj = parentObj.appendChild(embryo);
	tipObj.style.position = 'absolute';
	tipObj.style.left = '0px';
	tipObj.style.top = '0px';
	tipObj.style.visibility = 'hidden';
	tipObj.id = in_options.get('id');
	tipObj.className = in_options.get('styleClass');

	var contentBlock;
	var tableLayout = false;

	if (in_options.get('caption') || (in_options.get('type') == 'sticky' && in_options.get('caption') !== false))
	{
		tableLayout = true;
		// layout the tip with a hidden formatting table
		var tipLayoutTable = tipObj.appendChild(parentDoc.createElement('table'));
		tipLayoutTable.style.borderCollapse = 'collapse';
		if (domLib_isKHTML)
		{
			tipLayoutTable.cellSpacing = 0;
		}

		var tipLayoutTbody = tipLayoutTable.appendChild(parentDoc.createElement('tbody'));

		var numCaptionCells = 0;
		var captionRow = tipLayoutTbody.appendChild(parentDoc.createElement('tr'));
		var captionCell = captionRow.appendChild(parentDoc.createElement('td'));
		captionCell.style.padding = '0px';
		var caption = captionCell.appendChild(parentDoc.createElement('div'));
		caption.className = 'caption';
		if (domLib_isIE50)
		{
			caption.style.height = '100%';
		}

		if (in_options.get('caption').nodeType)
		{
			caption.appendChild(domTT_cloneNodes ? in_options.get('caption').cloneNode(1) : in_options.get('caption'));
		}
		else
		{
			caption.innerHTML = in_options.get('caption');
		}

		if (in_options.get('type') == 'sticky')
		{
			var numCaptionCells = 2;
			var closeLinkCell = captionRow.appendChild(parentDoc.createElement('td'));
			closeLinkCell.style.padding = '0px';
			var closeLink = closeLinkCell.appendChild(parentDoc.createElement('div'));
			closeLink.className = 'caption';
			if (domLib_isIE50)
			{
				closeLink.style.height = '100%';
			}

			closeLink.style.textAlign = 'right';
			closeLink.style.cursor = domLib_stylePointer;
			// merge the styles of the two cells
			closeLink.style.borderLeftWidth = caption.style.borderRightWidth = '0px';
			closeLink.style.paddingLeft = caption.style.paddingRight = '0px';
			closeLink.style.marginLeft = caption.style.marginRight = '0px';
			if (in_options.get('closeLink').nodeType)
			{
				closeLink.appendChild(in_options.get('closeLink').cloneNode(1));
			}
			else
			{
				closeLink.innerHTML = in_options.get('closeLink');
			}

			addEvent(closeLink, 'click', function()
			{
				domTT_deactivate(tipOwner.id);
			});
			addEvent(closeLink, 'mousedown', function(in_event)
			{
				if (typeof(in_event) == 'undefined') { in_event = window.event; }
				in_event.cancelBubble = true;
			});
			// MacIE has to have a newline at the end and must be made with createTextNode()
			if (domLib_isMacIE)
			{
				closeLinkCell.appendChild(parentDoc.createTextNode("\n"));
			}
		}

		// MacIE has to have a newline at the end and must be made with createTextNode()
		if (domLib_isMacIE)
		{
			captionCell.appendChild(parentDoc.createTextNode("\n"));
		}

		var contentRow = tipLayoutTbody.appendChild(parentDoc.createElement('tr'));
		var contentCell = contentRow.appendChild(parentDoc.createElement('td'));
		contentCell.style.padding = '0px';
		if (numCaptionCells)
		{
			if (domLib_isIE || domLib_isOpera)
			{
				contentCell.colSpan = numCaptionCells;
			}
			else
			{
				contentCell.setAttribute('colspan', numCaptionCells);
			}
		}

		contentBlock = contentCell.appendChild(parentDoc.createElement('div'));
		if (domLib_isIE50)
		{
			contentBlock.style.height = '100%';
		}
	}
	else
	{
		contentBlock = tipObj.appendChild(parentDoc.createElement('div'));
	}

	contentBlock.className = 'contents';

	var content = in_options.get('content');
	// allow content has a function to return the actual content
	if (typeof(content) == 'function') {
		content = content(in_options.get('id'));
	}

	if (content != null && content.nodeType)
	{
		contentBlock.appendChild(domTT_cloneNodes ? content.cloneNode(1) : content);
	}
	else
	{
		contentBlock.innerHTML = content;
	}

	// adjust the width if specified
	if (in_options.has('width'))
	{
		tipObj.style.width = parseInt(in_options.get('width')) + 'px';
	}

	// check if we are overridding the maxWidth
	// if the browser supports maxWidth, the global setting will be ignored (assume stylesheet)
	var maxWidth = domTT_maxWidth;
	if (in_options.has('maxWidth'))
	{
		if ((maxWidth = in_options.get('maxWidth')) === false)
		{
			tipObj.style.maxWidth = domLib_styleNoMaxWidth;
		}
		else
		{
			maxWidth = parseInt(in_options.get('maxWidth'));
			tipObj.style.maxWidth = maxWidth + 'px';
		}
	}

	// HACK: fix lack of maxWidth in CSS for KHTML and IE
	if (maxWidth !== false && (domLib_isIE || domLib_isKHTML) && tipObj.offsetWidth > maxWidth)
	{
		tipObj.style.width = maxWidth + 'px';
	}

	in_options.set('offsetWidth', tipObj.offsetWidth);
	in_options.set('offsetHeight', tipObj.offsetHeight);

	// konqueror miscalcuates the width of the containing div when using the layout table based on the
	// border size of the containing div
	if (domLib_isKonq && tableLayout && !tipObj.style.width)
	{
		var left = document.defaultView.getComputedStyle(tipObj, '').getPropertyValue('border-left-width');
		var right = document.defaultView.getComputedStyle(tipObj, '').getPropertyValue('border-right-width');
		
		left = left.substring(left.indexOf(':') + 2, left.indexOf(';'));
		right = right.substring(right.indexOf(':') + 2, right.indexOf(';'));
		var correction = 2 * ((left ? parseInt(left) : 0) + (right ? parseInt(right) : 0));
		tipObj.style.width = (tipObj.offsetWidth - correction) + 'px';
	}

	// if a width is not set on an absolutely positioned object, both IE and Opera
	// will attempt to wrap when it spills outside of body...we cannot have that
	if (domLib_isIE || domLib_isOpera)
	{
		if (!tipObj.style.width)
		{
			// HACK: the correction here is for a border
			tipObj.style.width = (tipObj.offsetWidth - 2) + 'px';
		}

		// HACK: the correction here is for a border
		tipObj.style.height = (tipObj.offsetHeight - 2) + 'px';
	}

	// store placement offsets from event position
	var offsetX, offsetY;

	// tooltip floats
	if (in_options.get('position') == 'absolute' && !(in_options.has('x') && in_options.has('y')))
	{
		// determine the offset relative to the pointer
		switch (in_options.get('direction'))
		{
			case 'northeast':
				offsetX = in_options.get('offsetX');
				offsetY = 0 - tipObj.offsetHeight - in_options.get('offsetY');
			break;
			case 'northwest':
				offsetX = 0 - tipObj.offsetWidth - in_options.get('offsetX');
				offsetY = 0 - tipObj.offsetHeight - in_options.get('offsetY');
			break;
			case 'north':
				offsetX = 0 - parseInt(tipObj.offsetWidth/2);
				offsetY = 0 - tipObj.offsetHeight - in_options.get('offsetY');
			break;
			case 'southwest':
				offsetX = 0 - tipObj.offsetWidth - in_options.get('offsetX');
				offsetY = in_options.get('offsetY');
			break;
			case 'southeast':
				offsetX = in_options.get('offsetX');
				offsetY = in_options.get('offsetY');
			break;
			case 'south':
				offsetX = 0 - parseInt(tipObj.offsetWidth/2);
				offsetY = in_options.get('offsetY');
			break;
		}

		// if we are in an iframe, get the offsets of the iframe in the parent document
		if (in_options.get('inframe'))
		{
			var iframeObj = domLib_getIFrameReference(window);
			if (iframeObj)
			{
				var frameOffsets = domLib_getOffsets(iframeObj);
				offsetX += frameOffsets.get('left');
				offsetY += frameOffsets.get('top');
			}
		}
	}
	// tooltip is fixed
	else
	{
		offsetX = 0;
		offsetY = 0;
		in_options.set('trail', false);
	}

	// set the direction-specific offsetX/Y
	in_options.set('offsetX', offsetX);
	in_options.set('offsetY', offsetY);
	if (in_options.get('clearMouse') && in_options.get('direction').indexOf('south') != -1)
	{
		in_options.set('mouseOffset', domTT_mouseHeight);
	}
	else
	{
		in_options.set('mouseOffset', 0);
	}

	if (domLib_canFade && typeof(Fadomatic) == 'function')
	{
		if (in_options.get('fade') != 'neither')
		{
			var fadeHandler = new Fadomatic(tipObj, 10, 0, 0, in_options.get('fadeMax'));
			in_options.set('fadeHandler', fadeHandler);
		}
	}
	else
	{
		in_options.set('fade', 'neither');
	}

	// setup mouse events
	if (in_options.get('trail') && !hasEvent(tipOwner,'mousemove'))
	{
		addEvent(tipOwner, 'mousemove', function(in_event) { domTT_mousemove(this, in_event); });
	}

	if (!hasEvent(tipOwner, 'mouseout'))
	{
		addEvent(tipOwner, 'mouseout', function(in_event) { domTT_mouseout(this, in_event); });
	}

	if (in_options.get('type') == 'sticky')
	{
		if (in_options.get('position') == 'absolute' && domTT_dragEnabled && in_options.get('draggable'))
		{
			if (domLib_isIE)
			{
				captionRow.onselectstart = function() { return false; };
			}

			// setup drag
			addEvent(captionRow, 'mousedown', function(in_event) { domTT_dragStart(tipObj, in_event);  });
			addEvent(captionRow, 'mousemove', function(in_event) { domTT_dragUpdate(in_event); });
			addEvent(captionRow, 'mouseup', function() { domTT_dragStop(); });
		}
	}
	else if (in_options.get('type') == 'velcro')
	{
		/* can use once we have deactivateDelay
		addEvent(tipObj, 'mouseover', function(in_event)
		{
			if (typeof(in_event) == 'undefined') { in_event = window.event; }
			var tooltip = domTT_tooltips.get(tipObj.id);
			if (in_options.get('lifetime')) {
				domLib_clearTimeout(in_options.get('lifetimeTimeout');
			}
		});
		*/
		addEvent(tipObj, 'mouseout', function(in_event)
		{
			if (typeof(in_event) == 'undefined') { in_event = window.event; }
			if (!domLib_isDescendantOf(in_event[domLib_eventTo], tipObj, domTT_bannedTags)) {
				domTT_deactivate(tipOwner.id);
			}
		});
		// NOTE: this might interfere with links in the tip
		addEvent(tipObj, 'click', function(in_event)
		{
			domTT_deactivate(tipOwner.id);
		});
	}

	if (in_options.get('position') == 'relative')
	{
		tipObj.style.position = 'relative';
	}

	in_options.set('node', tipObj);
	in_options.set('status', 'inactive');
}

// }}}
// {{{ domTT_show()

// in_id is either tip id or the owner id
function domTT_show(in_id, in_event)
{

	// should always find one since this call would be cancelled if tip was killed
	var tooltip = domTT_tooltips.get(in_id);
	var status = tooltip.get('status');
	var tipObj = tooltip.get('node');

	if (tooltip.get('position') == 'absolute')
	{
		var mouseX, mouseY;

		if (tooltip.has('x') && tooltip.has('y'))
		{
			mouseX = tooltip.get('x');
			mouseY = tooltip.get('y');
		}
		else if (!domTT_useGlobalMousePosition || domTT_mousePosition == null || status == 'active' || tooltip.get('delay') == 0)
		{
			var eventPosition = domLib_getEventPosition(in_event);
			var eventX = eventPosition.get('x');
			var eventY = eventPosition.get('y');
			if (tooltip.get('inframe'))
			{
				eventX -= eventPosition.get('scrollX');
				eventY -= eventPosition.get('scrollY');
			}

			// only move tip along requested trail axis when updating position
			if (status == 'active' && tooltip.get('trail') !== true)
			{
				var trail = tooltip.get('trail');
				if (trail == 'x')
				{
					mouseX = eventX;
					mouseY = tooltip.get('mouseY');
				}
				else if (trail == 'y')
				{
					mouseX = tooltip.get('mouseX');
					mouseY = eventY;
				}
			}
			else
			{
				mouseX = eventX;
				mouseY = eventY;
			}
		}
		else
		{
			mouseX = domTT_mousePosition.get('x');
			mouseY = domTT_mousePosition.get('y');
			if (tooltip.get('inframe'))
			{
				mouseX -= domTT_mousePosition.get('scrollX');
				mouseY -= domTT_mousePosition.get('scrollY');
			}
		}

		// we are using a grid for updates
		if (tooltip.get('grid'))
		{
			// if this is not a mousemove event or it is a mousemove event on an active tip and
			// the movement is bigger than the grid
			if (in_event.type != 'mousemove' || (status == 'active' && (Math.abs(tooltip.get('lastX') - mouseX) > tooltip.get('grid') || Math.abs(tooltip.get('lastY') - mouseY) > tooltip.get('grid'))))
			{
				tooltip.set('lastX', mouseX);
				tooltip.set('lastY', mouseY);
			}
			// did not satisfy the grid movement requirement
			else
			{
				return false;
			}
		}

		// mouseX and mouseY store the last acknowleged mouse position,
		// good for trailing on one axis
		tooltip.set('mouseX', mouseX);
		tooltip.set('mouseY', mouseY);

		var coordinates;
		if (domTT_screenEdgeDetection)
		{
			coordinates = domTT_correctEdgeBleed(
				tooltip.get('offsetWidth'),
				tooltip.get('offsetHeight'),
				mouseX,
				mouseY,
				tooltip.get('offsetX'),
				tooltip.get('offsetY'),
				tooltip.get('mouseOffset'),
				tooltip.get('inframe') ? window.parent : window
			);
		}
		else
		{
			coordinates = {
				'x' : mouseX + tooltip.get('offsetX'),
				'y' : mouseY + tooltip.get('offsetY') + tooltip.get('mouseOffset')
			};
		}

		// update the position
		tipObj.style.left = coordinates.x + 'px';
		tipObj.style.top = coordinates.y + 'px';

		// increase the tip zIndex so it goes over previously shown tips
		tipObj.style.zIndex = domLib_zIndex++;
	}

	// if tip is not active, active it now and check for a fade in
	if (status == 'pending')
	{
		// unhide the tooltip
		tooltip.set('status', 'active');
		tipObj.style.display = '';
		tipObj.style.visibility = 'visible';

		var fade = tooltip.get('fade');
		if (fade != 'neither')
		{
			var fadeHandler = tooltip.get('fadeHandler');
			if (fade == 'out' || fade == 'both')
			{
				fadeHandler.haltFade();
				if (fade == 'out')
				{
					fadeHandler.halt();
				}
			}

			if (fade == 'in' || fade == 'both')
			{
				fadeHandler.fadeIn();
			}
		}

		if (tooltip.get('type') == 'greasy' && tooltip.get('lifetime') != 0)
		{
			tooltip.set('lifetimeTimeout', domLib_setTimeout(domTT_runDeactivate, tooltip.get('lifetime'), [tipObj.id]));
		}
	}

	if (tooltip.get('position') == 'absolute' && domTT_detectCollisions)
	{
		// utilize original collision element cache
		domLib_detectCollisions(tipObj, false, true);
	}
}

// }}}
// {{{ domTT_close()

// in_handle can either be an child object of the tip, the tip id or the owner id
function domTT_close(in_handle)
{
	var id;
	if (typeof(in_handle) == 'object' && in_handle.nodeType)
	{
		var obj = in_handle;
		while (!obj.id || !domTT_tooltips.get(obj.id))
		{
			obj = obj.parentNode;
	
			if (obj.nodeType != document.ELEMENT_NODE) { return; }
		}

		id = obj.id;
	}
	else
	{
		id = in_handle;
	}

	domTT_deactivate(id);
}

// }}}
// {{{ domTT_closeAll()

// run through the tooltips and close them all
function domTT_closeAll()
{
	// NOTE: this will iterate 2x # of tooltips
	for (var id in domTT_tooltips.elementData) {
		domTT_close(id);
	}
}

// }}}
// {{{ domTT_deactivate()

// in_id is either the tip id or the owner id
function domTT_deactivate(in_id)
{
	var tooltip = domTT_tooltips.get(in_id);
	if (tooltip)
	{
		var status = tooltip.get('status');
		if (status == 'pending')
		{
			// cancel the creation of this tip if it is still pending
			domLib_clearTimeout(tooltip.get('activateTimeout'));
			tooltip.set('status', 'inactive');
		}
		else if (status == 'active')
		{
			if (tooltip.get('lifetime'))
			{
				domLib_clearTimeout(tooltip.get('lifetimeTimeout'));
			}

			var tipObj = tooltip.get('node');
			if (tooltip.get('closeAction') == 'hide')
			{
				var fade = tooltip.get('fade');
				if (fade != 'neither')
				{
					var fadeHandler = tooltip.get('fadeHandler');
					if (fade == 'out' || fade == 'both')
					{
						fadeHandler.fadeOut();
					}
					else
					{
						fadeHandler.hide();
					}
				}
				else
				{
					tipObj.style.display = 'none';
				}
			}
			else
			{
				tooltip.get('parent').removeChild(tipObj);
				domTT_tooltips.remove(tooltip.get('owner').id);
				domTT_tooltips.remove(tooltip.get('id'));
			}

			tooltip.set('status', 'inactive');
			if (domTT_detectCollisions) {
				// unhide all of the selects that are owned by this object
				// utilize original collision element cache
				domLib_detectCollisions(tipObj, true, true); 
			}
		}
	}
}

// }}}
// {{{ domTT_mouseout()

function domTT_mouseout(in_owner, in_event)
{
	if (!domLib_useLibrary) { return false; }

	if (typeof(in_event) == 'undefined') { in_event = window.event;	}

	var toChild = domLib_isDescendantOf(in_event[domLib_eventTo], in_owner, domTT_bannedTags);
	var tooltip = domTT_tooltips.get(in_owner.id);
	if (tooltip && (tooltip.get('type') == 'greasy' || tooltip.get('status') != 'active'))
	{
		// deactivate tip if exists and we moved away from the owner
		if (!toChild)
		{
			domTT_deactivate(in_owner.id);
			try { window.status = window.defaultStatus; } catch(e) {}
		}
	}
	else if (!toChild)
	{
		try { window.status = window.defaultStatus; } catch(e) {}
	}
}

// }}}
// {{{ domTT_mousemove()

function domTT_mousemove(in_owner, in_event)
{
	if (!domLib_useLibrary) { return false; }

	if (typeof(in_event) == 'undefined') { in_event = window.event;	}

	var tooltip = domTT_tooltips.get(in_owner.id);
	if (tooltip && tooltip.get('trail') && tooltip.get('status') == 'active')
	{
		// see if we are trailing lazy
		if (tooltip.get('lazy'))
		{
			domLib_setTimeout(domTT_runShow, domTT_trailDelay, [in_owner.id, in_event]);
		}
		else
		{
			domTT_show(in_owner.id, in_event);
		}
	}
}

// }}}
// {{{ domTT_addPredefined()

function domTT_addPredefined(in_id)
{
	var options = new Hash();
	for (var i = 1; i < arguments.length; i += 2)
	{
		options.set(arguments[i], arguments[i + 1]);
	}

	domTT_predefined.set(in_id, options);
}

// }}}
// {{{ domTT_correctEdgeBleed()

function domTT_correctEdgeBleed(in_width, in_height, in_x, in_y, in_offsetX, in_offsetY, in_mouseOffset, in_window)
{
	var win, doc;
	var bleedRight, bleedBottom;
	var pageHeight, pageWidth, pageYOffset, pageXOffset;

	var x = in_x + in_offsetX;
	var y = in_y + in_offsetY + in_mouseOffset;

	win = (typeof(in_window) == 'undefined' ? window : in_window);

	// Gecko and IE swaps values of clientHeight, clientWidth properties when
	// in standards compliance mode from documentElement to document.body
	doc = ((domLib_standardsMode && (domLib_isIE || domLib_isGecko)) ? win.document.documentElement : win.document.body);

	// for IE in compliance mode
	if (domLib_isIE)
	{
		pageHeight = doc.clientHeight;
		pageWidth = doc.clientWidth;
		pageYOffset = doc.scrollTop;
		pageXOffset = doc.scrollLeft;
	}
	else
	{
		pageHeight = doc.clientHeight;
		pageWidth = doc.clientWidth;

		if (domLib_isKHTML)
		{
			pageHeight = win.innerHeight;
		}

		pageYOffset = win.pageYOffset;
		pageXOffset = win.pageXOffset;
	}

	// we are bleeding off the right, move tip over to stay on page
	// logic: take x position, add width and subtract from effective page width
	if ((bleedRight = (x - pageXOffset) + in_width - (pageWidth - domTT_screenEdgePadding)) > 0)
	{
		x -= bleedRight;
	}

	// we are bleeding to the left, move tip over to stay on page
	// if tip doesn't fit, we will go back to bleeding off the right
	// logic: take x position and check if less than edge padding
	if ((x - pageXOffset) < domTT_screenEdgePadding)
	{
		x = domTT_screenEdgePadding + pageXOffset;
	}

	// if we are bleeding off the bottom, flip to north
	// logic: take y position, add height and subtract from effective page height
	if ((bleedBottom = (y - pageYOffset) + in_height - (pageHeight - domTT_screenEdgePadding)) > 0)
	{
		y = in_y - in_height - in_offsetY;
	}

	// if we are bleeding off the top, flip to south
	// if tip doesn't fit, we will go back to bleeding off the bottom
	// logic: take y position and check if less than edge padding
	if ((y - pageYOffset) < domTT_screenEdgePadding)
	{
		y = in_y + domTT_mouseHeight + in_offsetY;
	}

	return {'x' : x, 'y' : y};
}

// }}}
// {{{ domTT_isActive()

// in_id is either the tip id or the owner id
function domTT_isActive(in_id)
{
	var tooltip = domTT_tooltips.get(in_id);
	if (!tooltip || tooltip.get('status') != 'active')
	{
		return false;
	}
	else
	{
		return true;
	}
}

// }}}
// {{{ domTT_runXXX()

// All of these domMenu_runXXX() methods are used by the event handling sections to
// avoid the circular memory leaks caused by inner functions
function domTT_runDeactivate(args) { domTT_deactivate(args[0]); }
function domTT_runShow(args) { domTT_show(args[0], args[1]); }

// }}}
// {{{ domTT_replaceTitles()

function domTT_replaceTitles(in_decorator)
{
	var elements = domLib_getElementsByClass('tooltip');
	for (var i = 0; i < elements.length; i++)
	{
		if (elements[i].title)
		{
			var content;
			if (typeof(in_decorator) == 'function')
			{
				content = in_decorator(elements[i]);
			}
			else
			{
				content = elements[i].title;
			}

			content = content.replace(new RegExp('\'', 'g'), '\\\'');
			addEvent(elements[i], 'mouseover', new Function('in_event', "domTT_activate(this, in_event, 'content', '" + content + "')"));
			elements[i].title = '';
		}
	}
}

// }}}
// {{{ domTT_update()

// Allow authors to update the contents of existing tips using the DOM
// Unfortunately, the tip must already exist, or else no work is done.
// TODO: make getting at content or caption cleaner
function domTT_update(handle, content, type)
{
	// type defaults to 'content', can also be 'caption'
	if (typeof(type) == 'undefined')
	{
		type = 'content';
	}

	var tip = domTT_tooltips.get(handle);
	if (!tip)
	{
		return;
	}

	var tipObj = tip.get('node');
	var updateNode;
	if (type == 'content')
	{
		// <div class="contents">...
		updateNode = tipObj.firstChild;
		if (updateNode.className != 'contents')
		{
			// <table><tbody><tr>...</tr><tr><td><div class="contents">...
			updateNode = updateNode.firstChild.firstChild.nextSibling.firstChild.firstChild;
		}
	}
	else
	{
		updateNode = tipObj.firstChild;
		if (updateNode.className == 'contents')
		{
			// missing caption
			return;
		}

		// <table><tbody><tr><td><div class="caption">...
		updateNode = updateNode.firstChild.firstChild.firstChild.firstChild;
	}

	// TODO: allow for a DOM node as content
	updateNode.innerHTML = content;
}

// }}}

// [/DOM Tooltip Library]

// End of included libraries.

var utf8_jis = { "4E00":"306C","4E8C":"4673","4E09":"3B30","56DB":"3B4D","4E94":"385E","516D":"4F3B","4E03":"3C37","516B":"482C","4E5D":"3665","5341":"3D3D","53E3":"387D","65E5":"467C","6708":"376E","7530":"4544","76EE":"4C5C","53E4":"3845","543E":"3863","5192":"4B41","670B":"4A7E","660E":"4C40","5531":"3E27","6676":"3E3D","54C1":"494A","5442":"4F24","660C":"3E3B","65E9":"4161","65ED":"3030","4E16":"4024","80C3":"305F","65E6":"4336","80C6":"4340","4E98":"4F4B","51F9":"317A","51F8":"464C","65E7":"356C","81EA":"3C2B","767D":"4772","767E":"4934","4E2D":"4366","5343":"4069","820C":"4065","5347":"3E23","6607":"3E3A","4E38":"345D","5BF8":"4023","5C02":"406C","535A":"476E","5360":"406A","4E0A":"3E65","4E0B":"323C","5353":"426E","671D":"442B","53EA":"427E","8C9D":"332D","8C9E":"4467","54E1":"3077","898B":"382B","5150":"3B79","5143":"3835","9801":"4A47","9811":"3468","51E1":"4B5E","8CA0":"4969","4E07":"4B7C","53E5":"3667","808C":"4829","65EC":"3D5C","52FA":"3C5B","7684":"452A","9996":"3C73","4E59":"3235","4E71":"4D70","76F4":"443E","5177":"3671","771F":"3F3F","5DE5":"3929","5DE6":"3A38","53F3":"3126","6709":"4D2D","8CC4":"4F45","8CA2":"3957","9805":"3960","5200":"4561","5203":"3F4F","5207":"405A","53EC":"3E24","662D":"3E3C","5247":"4227","526F":"497B","5225":"4A4C","4E01":"437A","753A":"442E","53EF":"3244","9802":"443A","5B50":"3B52","5B54":"3926","4E86":"4E3B","5973":"3D77","597D":"3925","5982":"4721","6BCD":"4A6C","8CAB":"3453","5144":"373B","514B":"396E","5C0F":"3E2E","5C11":"3E2F","5927":"4267","591A":"423F","5915":"4D3C","6C50":"3C2E","5916":"3330","540D":"4C3E","77F3":"4050","8096":"3E53","785D":"3E4B","7815":"3A55","7802":"3A3D","524A":"3A6F","5149":"3877","592A":"4240","5668":"346F","81ED":"3D2D","5999":"4C2F","7701":"3E4A","539A":"387C","5947":"3471","5DDD":"406E","5DDE":"3D23","9806":"3D67","6C34":"3F65","6C37":"4939","6C38":"314A","6CC9":"4074","539F":"3836","9858":"346A","6CF3":"314B","6CBC":"3E42","6C96":"322D","6C5F":"393E","6C41":"3D41","6F6E":"442C","6E90":"383B","6D3B":"3368","6D88":"3E43","6CC1":"3637","6CB3":"324F","6CCA":"4771","6E56":"3850","6E2C":"422C","571F":"455A","5410":"4547","5727":"3035","57FC":"3A6B","57A3":"3340","572D":"373D","5C01":"4975","6DAF":"3336","5BFA":"3B7B","6642":"3B7E","5747":"3651","706B":"3250","708E":"316A","7169":"4851","6DE1":"4338","706F":"4574","7551":"482A","707D":"3A52","7070":"3325","70B9":"4540","7167":"3E48","9B5A":"357B","6F01":"3579","91CC":"4E24","9ED2":"3975","58A8":"4B4F","9BC9":"3871","91CF":"4E4C","5398":"4E52","57CB":"4B64","540C":"4631","6D1E":"4636","80F4":"4639","5411":"387E","5C1A":"3E30","5B57":"3B7A","5B88":"3C69","5B8C":"3430","5BA3":"406B","5BB5":"3E2C","5B89":"3042","5BB4":"3163","5BC4":"3473","5BCC":"4959","8CAF":"4379","6728":"4C5A","6797":"4E53","68EE":"3F39","6842":"374B","67CF":"4770","67A0":"4F48","68A2":"3E3F","68DA":"432A","674F":"3049","6850":"364D","690D":"3F22","67AF":"384F","6734":"4B51","6751":"423C","76F8":"416A","673A":"3479","672C":"4B5C","672D":"3B25","66A6":"4E71","6848":"3046","71E5":"4167","672A":"4C24","672B":"4B76","6CAB":"4B77","5473":"4C23","59B9":"4B65","6731":"3C6B","682A":"3374","82E5":"3C63","8349":"4170","82E6":"366C","5BDB":"3432","8584":"4776","8449":"4D55","6A21":"4C4F","6F20":"4779","5893":"4A68","66AE":"4A6B","819C":"4B6C","82D7":"4944","5146":"437B","6843":"456D","773A":"442F","72AC":"3824","72B6":"3E75","9ED9":"4C5B","7136":"4133","837B":"322E","72E9":"3C6D","732B":"472D","725B":"356D","7279":"4643","544A":"3970","5148":"4068","6D17":"4076","4ECB":"3270","754C":"3326","8336":"4363","5408":"3967","5854":"4563","738B":"3226","7389":"364C","5B9D":"4A75","73E0":"3C6E","73FE":"383D","72C2":"3638","7687":"3944","5448":"4468","5168":"4134","6813":"4072","7406":"4D7D","4E3B":"3C67","6CE8":"436D","67F1":"436C","91D1":"3662","9291":"412D","9262":"482D","9285":"463C","91E3":"4460","91DD":"3F4B","9298":"4C43","93AE":"4443","9053":"463B","5C0E":"4633","8FBB":"4454","8FC5":"3F57","9020":"4224","8FEB":"4777","9003":"4628","8FBA":"4A55","5DE1":"3D64","8ECA":"3C56","9023":"4F22","8ECC":"3530","8F38":"4D22","524D":"4130","5404":"3346","683C":"334A","7565":"4E2C","5BA2":"3552","984D":"335B","590F":"3246","51E6":"3D68","6761":"3E72","843D":"4D6E","5197":"3E69","8ECD":"3733","8F1D":"3531","904B":"313F","51A0":"3427","5922":"4C34","5751":"3923","9AD8":"3962","4EAB":"357D","587E":"3D4E","719F":"3D4F","4EAD":"4462","4EAC":"357E","6DBC":"4E43","666F":"374A","9BE8":"375F","820E":"3C4B","5468":"3C7E","9031":"3D35","58EB":"3B4E","5409":"3548","58EE":"4154","8358":"4171","58F2":"4764","5B66":"3358","899A":"3350","6804":"3149","66F8":"3D71","6D25":"4445","7267":"4B52","653B":"3936","6557":"4754","679A":"4B67","6545":"384E","656C":"3749","8A00":"3840","8B66":"3759","8A08":"3757","7344":"3976","8A02":"447B","8A0E":"4624","8A13":"3731","8A54":"3E5B","8A70":"354D","8A71":"4F43","8A60":"3153","8A69":"3B6D","8A9E":"386C","8AAD":"4649","8ABF":"4434","8AC7":"434C","8AFE":"427A","8AED":"4D21","5F0F":"3C30","8A66":"3B6E","5F10":"4675","57DF":"3068","8CCA":"4231","683D":"3A4F","8F09":"3A5C","8302":"4C50","6210":"402E","57CE":"3E6B","8AA0":"403F","5A01":"3052","6EC5":"4C47","6E1B":"383A","685F":"3B37","92AD":"412C","6D45":"4075","6B62":"3B5F","6B69":"4A62","6E09":"3E44","983B":"4951","80AF":"394E","4F01":"346B","6B74":"4E72","6B66":"4970","8CE6":"496A","6B63":"4035","8A3C":"3E5A","653F":"402F","5B9A":"446A","9320":"3E7B","8D70":"4176","8D85":"4436","8D74":"496B","8D8A":"315B","662F":"4027","984C":"426A","5824":"4469","5EFA":"377A","5EF6":"3164","8A95":"4342","790E":"4143","5A7F":"4C3B","8863":"3061","88C1":"3A5B","88C5":"4175","88CF":"4E22","58CA":"3275","54C0":"3025","9060":"3173","733F":"316E","521D":"3D69","5E03":"495B","5E06":"4841","5E45":"497D","5E3D":"4B39","5E55":"4B6B","5E4C":"4B5A","9326":"3653","5E02":"3B54","59C9":"3B50","80BA":"4759","5E2F":"4253","6EDE":"425A","523A":"3B49","5236":"4029","88FD":"403D","8EE2":"453E","82B8":"375D","96E8":"312B","96F2":"3140","66C7":"465E","96F7":"4D6B","971C":"417A","51AC":"455F","5929":"4537","6A4B":"3636","5B0C":"5548","7ACB":"4E29","6CE3":"3563","7AE0":"3E4F","7AF6":"3625","5E1D":"446B","7AE5":"4638","77B3":"4637","9418":"3E62","5546":"3E26","5AE1":"4364","9069":"452C","6EF4":"4529","6575":"4528","5315":"5238","5317":"4B4C","80CC":"4758","6BD4":"4866","6606":"3A2B","7686":"3327","6DF7":"3A2E","6E07":"3369","8B01":"315A","8910":"336C","559D":"3365","65E8":"3B5D","8102":"3B69","58F1":"306D","6BCE":"4B68","654F":"4952","6885":"475F","6D77":"3324","4E5E":"3870","4E7E":"3425","8179":"4A22","8907":"4A23","6B20":"3767","5439":"3F61","708A":"3F66","6B4C":"324E","8EDF":"4670","6B21":"3C21","8328":"3071","8CC7":"3B71","59FF":"3B51","8AEE":"3B70","8CE0":"4765","57F9":"475D","5256":"4B36","97F3":"323B","6697":"3045","97FB":"3124","8B58":"3C31","93E1":"3640","5883":"362D","4EA1":"4B34","76F2":"4C55","5984":"4C51","8352":"3953","671B":"4B3E","65B9":"4A7D","59A8":"4B38","574A":"4B37","82B3":"4B27","80AA":"4B43","8A2A":"4B2C","653E":"4A7C","6FC0":"3763","8131":"4326","8AAC":"4062","92ED":"3154","66FD":"413E","5897":"417D","8D08":"4223","6771":"456C","68DF":"456F","51CD":"4560","598A":"4725","5EF7":"446E","67D3":"4077","71C3":"4733","8CD3":"4950","6B73":"3A50","770C":"3829","6803":"464A","5730":"434F","6C60":"4353","866B":"436E","86CD":"3756","86C7":"3C58","8679":"467A","8776":"4433","72EC":"4648","8695":"3B3D","98A8":"4977","5DF1":"384A","8D77":"352F","5983":"485E","6539":"327E","8A18":"352D","5305":"4A71","80DE":"4B26","7832":"4B24","6CE1":"4B22","4E80":"3535","96FB":"4545","7ADC":"4E35","6EDD":"426C","8C5A":"465A","9010":"4360","9042":"3F6B","5BB6":"3248","5AC1":"3247","8C6A":"396B","8178":"4432","5834":"3E6C","6E6F":"4572","7F8A":"4D53","7F8E":"487E","6D0B":"4D4E","8A73":"3E5C","9BAE":"412F","9054":"4323","7FA8":"4122","5DEE":"3A39","7740":"4365","552F":"4D23","7126":"3E47","7901":"3E4C","96C6":"3D38","51C6":"3D5A","9032":"3F4A","96D1":"3B28","96CC":"3B73","6E96":"3D60","596E":"4A33","596A":"4325","78BA":"334E","5348":"3861","8A31":"3576","6B53":"343F","6A29":"3822","89B3":"3451","7FBD":"3129","7FD2":"3D2C","7FCC":"4D62","66DC":"4D4B","6FEF":"4275","66F0":"5B29","56F0":"3A24","56FA":"3847","56FD":"3971","56E3":"4344","56E0":"3078","59FB":"3079","5712":"3160","56DE":"3273","58C7":"4345","5E97":"4539","5EAB":"384B","5EAD":"446D","5E81":"4423","5E8A":"3E32","9EBB":"4B63","78E8":"4B61","5FC3":"3F34","5FD8":"4B3A","5FCD":"4726","8A8D":"4727","5FCC":"3477","5FD7":"3B56","8A8C":"3B6F","5FE0":"4369","4E32":"367A","60A3":"3435","601D":"3B57","6069":"3238","5FDC":"317E","610F":"3055","60F3":"415B","606F":"4229","61A9":"3746","6075":"3743","6050":"3632","60D1":"4F47","611F":"3436","6182":"4D2B","5BE1":"3249","5FD9":"4B3B","60A6":"3159","6052":"3931","60BC":"4569","609F":"3867","6016":"495D","614C":"3932","6094":"3279","618E":"417E","6163":"3437","6109":"4C7B","60F0":"4246","614E":"3F35","61BE":"3438","61B6":"3231","6155":"4A69","6DFB":"453A","5FC5":"492C","6CCC":"4867","624B":"3C6A","770B":"3447","6469":"4B60","6211":"3266","7FA9":"3541","8B70":"3544","72A0":"353E","62B9":"4B75","62B1":"4A7A","642D":"456B","6284":"3E36","6297":"3933","6279":"4863","62DB":"3E37","62D3":"4273","62CD":"476F","6253":"4247","62D8":"3934","6368":"3C4E","62D0":"327D","6458":"4526","6311":"4429","6307":"3B58","6301":"3B7D","62EC":"3367","63EE":"3478","63A8":"3F64","63DA":"4D48","63D0":"4473","640D":"423B","62FE":"3D26","62C5":"4334","62E0":"3572","63CF":"4941","64CD":"4160","63A5":"405C","63B2":"3747","639B":"335D","7814":"3826","6212":"327C","68B0":"3323","9F3B":"4921","5211":"373A","578B":"373F","624D":"3A4D","8CA1":"3A62","6750":"3A60","5B58":"4238","5728":"3A5F","4E43":"4735","643A":"3748","53CA":"355A","5438":"355B","6271":"3037","4E08":"3E66","53F2":"3B4B","540F":"4D79","66F4":"3939","786C":"3945","53C8":"4B74","53CC":"4150","6851":"372C","96BB":"4049","8B77":"386E","7372":"334D","5974":"455B","6012":"455C","53CB":"4D27","629C":"4834","6295":"456A","6CA1":"4B57","8A2D":"405F","6483":"3762","6BBB":"334C","652F":"3B59","6280":"353B","679D":"3B5E","80A2":"3B68","830E":"3754","602A":"3278","8EFD":"375A","53D4":"3D47","7763":"4644","5BC2":"3C64","6DD1":"3D4A","53CD":"483F","5742":"3A64","677F":"4844","8FD4":"4A56","8CA9":"484E","722A":"445E","59A5":"4245","4E73":"467D","6D6E":"4962","5C06":"3E2D","5968":"3E29","63A1":"3A4E","83DC":"3A5A","53D7":"3C75","6388":"3C78","611B":"3026","6255":"4A27","5E83":"392D","62E1":"3348","9271":"395B","5F01":"4A5B","96C4":"4D3A","53F0":"4266","6020":"4255","6CBB":"3C23","59CB":"3B4F","80CE":"425B","7A93":"416B","53BB":"356E","6CD5":"4B21","4F1A":"3271","81F3":"3B6A","5BA4":"3C3C","5230":"457E","81F4":"4357","4E92":"385F","68C4":"347E","80B2":"3069","64A4":"4531","5145":"3D3C","9283":"3D46","786B":"4E32","6D41":"4E2E","5141":"3074","5506":"3A36","51FA":"3D50","5C71":"3B33","62D9":"405B","5CA9":"3464","70AD":"433A","5C90":"3474","5CE0":"463D","5D29":"4A78","5BC6":"4C29","871C":"4C2A","5D50":"4D72","5D0E":"3A6A","5165":"467E","8FBC":"397E","5206":"4A2C","8CA7":"494F","9812":"4852","516C":"3878","677E":"3E3E","7FC1":"3227","8A1F":"3E59","8C37":"432B","6D74":"4D61","5BB9":"4D46","6EB6":"4D4F","6B32":"4D5F","88D5":"4D35","925B":"3174","6CBF":"3168","8CDE":"3E5E","515A":"455E","5802":"4632","5E38":"3E6F","88F3":"3E58","638C":"3E38","76AE":"4869","6CE2":"4748","5A46":"474C","62AB":"4864","7834":"474B","88AB":"486F","6B8B":"3B44","6B89":"3D5E","6B8A":"3C6C","6B96":"3F23","5217":"4E73","88C2":"4E76","70C8":"4E75","6B7B":"3B60","846C":"4172","77AC":"3D56","8033":"3C2A","53D6":"3C68","8DA3":"3C71","6700":"3A47","64AE":"3B23","6065":"4351","8077":"3F26","8056":"403B","6562":"343A","8074":"4430","61D0":"327B","6162":"4B7D","6F2B":"4C21","8CB7":"4763","7F6E":"4356","7F70":"4833","5BE7":"472B","6FC1":"4279","74B0":"3444","9084":"3454","592B":"4957","6276":"495E","6E13":"374C","898F":"352C","66FF":"4258","8CDB":"3B3F","6F5C":"4078","5931":"3C3A","9244":"4534","8FED":"4533","81E3":"3F43","59EB":"4931","8535":"4222","81D3":"4221","8CE2":"382D","5805":"3778","81E8":"4E57","89A7":"4D77","5DE8":"3570","62D2":"3571","529B":"4E4F","7537":"434B","52B4":"4F2B","52DF":"4A67","52A3":"4E74","529F":"3879","52E7":"342B","52AA":"4558","52B1":"4E65","52A0":"3243","8CC0":"326C","67B6":"324D","8107":"4F46","8105":"363C","5354":"3628","884C":"3954","5F8B":"4E27","5FA9":"497C","5F97":"4640","5F93":"3D3E","5F92":"454C","5F85":"4254","5F80":"317D","5F81":"402C","5F84":"3742","5F7C":"4860","5F79":"4C72","5FB3":"4641","5FB9":"4530","5FB4":"4427","61F2":"4428","5FAE":"4879","8857":"3339","8861":"3955","7A3F":"3946","7A3C":"3254","7A0B":"4478","7A0E":"4047","7A1A":"4355","548C":"4F42","79FB":"305C","79D2":"4943","79CB":"3D29","6101":"3D25","79C1":"3B64","79E9":"4361","79D8":"486B","79F0":"3E4E","5229":"4D78","68A8":"4D7C","7A6B":"334F","7A42":"4A66","7A32":"3070","9999":"3961","5B63":"3528","59D4":"3051","79C0":"3D28","900F":"4629","8A98":"4D36","7A40":"3972","83CC":"365D","7C73":"4A46","7C89":"4A34","7C98":"4734","7C92":"4E33","7CA7":"3E51","8FF7":"4C42","7C8B":"3F68","7CE7":"4E48","83CA":"3546","5965":"317C","6570":"3F74","697C":"4F30","985E":"4E60","6F06":"3C3F","69D8":"4D4D","6C42":"3561","7403":"3565","6551":"355F","7AF9":"435D","7B11":"3E50","7B20":"335E","7B39":"3A7B","7B4B":"365A","7BB1":"4822","7B46":"492E","7B52":"457B","7B49":"4579","7B97":"3B3B","7B54":"457A","7B56":"3A76","7C3F":"4A6D","7BC9":"435B","4EBA":"3F4D","4F50":"3A34","4F46":"4322","4F4F":"3D3B","4F4D":"304C","4EF2":"4367","4F53":"424E","60A0":"4D2A","4EF6":"376F","4ED5":"3B45","4ED6":"423E","4F0F":"497A","4F1D":"4541","4ECF":"4A29","4F11":"3559","4EEE":"323E","4F2F":"476C","4FD7":"422F","4FE1":"3F2E","4F73":"3242","4F9D":"304D","4F8B":"4E63","500B":"3844","5065":"3772","5074":"4226","4F8D":"3B78","505C":"4464","5024":"434D","5023":"4A6F","5012":"455D","5075":"4465","50E7":"414E","5104":"322F","5100":"3537","511F":"3D7E","4ED9":"4067","50AC":"3A45","4EC1":"3F4E","4FAE":"496E","4F7F":"3B48","4FBF":"4A58","500D":"475C","512A":"4D25","4F10":"4832","5BBF":"3D49","50B7":"3D7D","4FDD":"4A5D","8912":"4B2B","5091":"3766","4ED8":"4955","7B26":"4964","5E9C":"495C","4EFB":"4724","8CC3":"4442","4EE3":"4265","888B":"425E","8CB8":"425F","5316":"323D","82B1":"3256","8CA8":"325F","50BE":"3739","4F55":"323F","8377":"3259","4FCA":"3D53","508D":"4B35","4E45":"3557","755D":"4026","56DA":"3C7C","5185":"4662","4E19":"4A3A","67C4":"4A41","8089":"4679","8150":"4965","5EA7":"3A42","5352":"4234","5098":"3B31","5301":"4C68","4EE5":"304A","4F3C":"3B77","4F75":"4A3B","74E6":"3424","74F6":"4953","5BAE":"355C","55B6":"3144","5584":"4131","5E74":"472F","591C":"4C6B","6DB2":"3155","585A":"444D","5E63":"4A3E","5F0A":"4A40","559A":"342D","63DB":"3439","878D":"4D3B","65BD":"3B5C","65CB":"407B","904A":"4D37","65C5":"4E39","52FF":"4C5E","7269":"4A2A","6613":"3057","8CDC":"3B72","5C3F":"4722","5C3C":"4674","6CE5":"4525","5840":"4A3D","5C65":"4D7A","5C4B":"3230","63E1":"302E","5C48":"367E","6398":"3721","5800":"4B59","5C45":"356F","636E":"3F78","5C64":"4158","5C40":"3649","9045":"4359","6F0F":"4F33","5237":"3A7E","5C3A":"3C5C","5C3D":"3F54","6CA2":"4274","8A33":"4C75","629E":"4272","663C":"436B","6238":"384D","80A9":"382A","623F":"4B3C","6247":"4070","7089":"4F27","623B":"4C61","6D99":"4E5E","96C7":"385B","9867":"385C","5553":"373C","793A":"3C28","793C":"4E69","7965":"3E4D","795D":"3D4B","798F":"4A21","7949":"3B63","793E":"3C52","8996":"3B6B","5948":"4660","5C09":"3053","6170":"3056","6B3E":"343E","7981":"3658","895F":"365F","5B97":"3D21","5D07":"3F72","796D":"3A57","5BDF":"3B21","64E6":"3B24","7531":"4D33","62BD":"436A","6CB9":"4C7D","8896":"4235","5B99":"4368","5C4A":"464F","7B1B":"452B","8EF8":"3C34","7532":"3943","62BC":"3221","5CAC":"4C28","633F":"415E","7533":"3F3D","4F38":"3F2D","795E":"3F40","635C":"415C","679C":"324C","83D3":"325B","8AB2":"325D","88F8":"4D67","65A4":"3654","6790":"404F","6240":"3D6A","7948":"3527","8FD1":"3661","6298":"405E","54F2":"452F","901D":"4042","8A93":"4040","66AB":"3B43","6F38":"4132","65AD":"4347","8CEA":"3C41","65A5":"404D","8A34":"414A","6628":"3A72","8A50":"3A3E","4F5C":"3A6E","96EA":"4063","9332":"4F3F","5C0B":"3F52","6025":"355E","7A4F":"323A","4FB5":"3F2F","6D78":"3F3B","5BDD":"3F32","5A66":"4958","6383":"415D","5F53":"4576","4E89":"4168","6D44":"3E74","4E8B":"3B76","5510":"4562","7CD6":"457C","5EB7":"392F","902E":"4261","4F0A":"304B","541B":"372F","7FA4":"3732","8010":"4251","9700":"3C7B","5112":"3C74","7AEF":"433C","4E21":"4E3E","6E80":"4B7E","753B":"3268","6B6F":"3B75","66F2":"364A","66F9":"4162","906D":"4178","6F15":"4166","69FD":"4165","6597":"454D","6599":"4E41","79D1":"324A","56F3":"3F5E","7528":"4D51","5EB8":"4D47","5099":"4877","6614":"404E","932F":"3A78","501F":"3C5A","60DC":"404B","63AA":"413C","6563":"3B36","5EFF":"467B","5EB6":"3D6E","906E":"3C57","5E2D":"404A","5EA6":"4559","6E21":"454F","5954":"4B5B","5674":"4A2E","58B3":"4A2F","61A4":"4A30","713C":"3E46","6681":"3647","534A":"483E","4F34":"483C","7554":"484A","5224":"483D","5238":"3774","5DFB":"342C","570F":"3777","52DD":"3E21","85E4":"4623","8B04":"4625","7247":"4A52","7248":"4847","4E4B":"4737","4E4F":"4B33","829D":"3C47","4E0D":"4954","5426":"485D","676F":"4755","77E2":"4C70","77EF":"363A","65CF":"4232","77E5":"434E","667A":"4352","77DB":"4C37","67D4":"3D40","52D9":"4C33","9727":"4C38","73ED":"4849","5E30":"3522","5F13":"355D","5F15":"307A","5F14":"4424","5F18":"3930","5F37":"362F","5F31":"3C65","6CB8":"4A28","8CBB":"4871","7B2C":"4268","5F1F":"446F","5DE7":"392A","53F7":"3966","673D":"3560","8A87":"3858","6C5A":"3178","4E0E":"4D3F","5199":"3C4C","8EAB":"3F48","5C04":"3C4D","8B1D":"3C55","8001":"4F37","8003":"394D","5B5D":"3927","6559":"3635","62F7":"3969","8005":"3C54","716E":"3C51","8457":"4378","7F72":"3D70","6691":"3D6B","8AF8":"3D74","732A":"4376","6E1A":"3D6D","8CED":"4552","5CE1":"362E","72ED":"3639","631F":"3634","8FFD":"4449","5E2B":"3B55","5E25":"3F63","5B98":"3431","68FA":"343D","7BA1":"3449","7236":"4963","4EA4":"3872","52B9":"387A","8F03":"3353","6821":"393B","8DB3":"422D","4FC3":"4225","8DDD":"3577","8DEF":"4F29","9732":"4F2A","8DF3":"4437","8E8D":"4C76","8DF5":"4129","8E0F":"4627","9AA8":"397C","6ED1":"336A","9AC4":"3F71","798D":"3252","6E26":"3132","904E":"3261","962A":"3A65","963F":"3024","969B":"3A5D","969C":"3E63","968F":"3F6F","966A":"4766","967D":"4D5B","9673":"4444","9632":"4B49","9644":"496D","9662":"3121","9663":"3F58","968A":"4262","589C":"4446","964D":"395F","968E":"332C","965B":"4A45","96A3":"4E59","9694":"3356","96A0":"3123","5815":"4244","9665":"3459","7A74":"376A","7A7A":"3675","63A7":"3935","7A81":"464D","7A76":"3566","7A92":"4362","7A83":"4060","7AAA":"3726","643E":"3A71","7AAF":"4D52","7AAE":"3567","63A2":"4335","6DF1":"3F3C","4E18":"3556","5CB3":"3359","5175":"4A3C","6D5C":"494D","7CF8":"3B65","7E54":"3F25","7E55":"4136","7E2E":"3D4C","7E41":"484B","7E26":"3D44","7DDA":"407E","7DE0":"4479","7DAD":"305D","7F85":"4D65","7DF4":"4E7D","7DD2":"3D6F","7D9A":"4233","7D75":"3328","7D71":"457D","7D5E":"394A","7D66":"356B","7D61":"4D6D","7D50":"376B","7D42":"3D2A","7D1A":"3569","7D00":"352A","7D05":"3948","7D0D":"473C","7D21":"4B42","7D1B":"4A36","7D39":"3E52","7D4C":"3750","7D33":"3F42","7D04":"4C73","7D30":"3A59","7D2F":"4E5F","7D22":"3A77","7DCF":"416D","7DBF":"4C4A","7D79":"3828","7E70":"372B","7D99":"3751","7DD1":"4E50","7E01":"316F","7DB2":"4C56","7DCA":"365B","7D2B":"3B67","7E1B":"477B","7E04":"466C","5E7C":"4D44","5F8C":"3865","5E7D":"4D29","5E7E":"3476","6A5F":"3521","7384":"383C","755C":"435C","84C4":"435F","5F26":"3839","64C1":"4D4A","6ECB":"3C22","6148":"3B7C","78C1":"3C27","7CFB":"374F","4FC2":"3738","5B6B":"4239","61F8":"377C","5374":"3551","811A":"3553","5378":"3237","5FA1":"3866","670D":"497E","547D":"4C3F","4EE4":"4E61","96F6":"4E6D","9F62":"4E70","51B7":"4E64","9818":"4E4E","9234":"4E6B","52C7":"4D26","901A":"444C","8E0A":"4D59","7591":"353F","64EC":"353C","51DD":"3645","7BC4":"484F","72AF":"4848","5384":"4C71","5371":"346D","5B9B":"3038","8155":"4F53","82D1":"3171","6028":"3165","67F3":"4C78","5375":"4D71","7559":"4E31","8CBF":"4B47","5370":"3075","8208":"363D","9149":"4653","9152":"3C72","914C":"3C60","9175":"395A","9177":"3973","916C":"3D37","916A":"4D6F","9162":"3F5D","9154":"3F6C","914D":"475B","9178":"3B40","7336":"4D31","5C0A":"423A","8C46":"4626","982D":"462C","77ED":"433B","8C4A":"4B2D","9F13":"385D","559C":"346E","6A39":"3C79","76BF":"3B2E","8840":"376C","76C6":"4B5F","76DF":"4C41","76D7":"4570","6E29":"3239","76E3":"3446","6FEB":"4D74","9451":"3455","731B":"4C54","76DB":"4039","5869":"3176","9280":"3664","6068":"3A28","6839":"3A2C","5373":"4228","7235":"3C5F","7BC0":"4061","9000":"4260","9650":"3842","773C":"3463","826F":"4E49","6717":"4F2F","6D6A":"4F32","5A18":"4C3C","98DF":"3F29","98EF":"4853","98F2":"307B","98E2":"3532","9913":"326E","98FE":"3E7E","9928":"345B","990A":"4D5C","98FD":"4B30","65E2":"347B","6982":"3335","6168":"3334","5E73":"4A3F","547C":"3846","576A":"445A","8A55":"493E","5208":"3422","5E0C":"3475","51F6":"3627","80F8":"363B","96E2":"4E25","6BBA":"3B26","7D14":"3D63","920D":"465F","8F9B":"3F49","8F9E":"3C2D","6893":"3034","5BB0":"3A4B","58C1":"4A49","907F":"4872","65B0":"3F37","85AA":"3F45","89AA":"3F46","5E78":"392C","57F7":"3C39","5831":"4A73","53EB":"362B","7CFE":"356A","53CE":"3C7D","5351":"485C","7891":"486A","9678":"4E26","7766":"4B53","52E2":"402A","71B1":"472E","83F1":"4929","9675":"4E4D","4EA5":"3067","6838":"334B","523B":"396F","8A72":"333A","52BE":"332F","8FF0":"3D52","8853":"3D51","5BD2":"3428","91B8":"3E7A","8B72":"3E79","58CC":"3E6D","5B22":"3E6E","6BD2":"4647","7D20":"4147","9EA6":"477E","9752":"4044","7CBE":"403A","8ACB":"4041","60C5":"3E70","6674":"4032","6E05":"4036","9759":"4045","8CAC":"4055","7E3E":"4053","7A4D":"4051","50B5":"3A44","6F2C":"4452","8868":"493D","4FF5":"4936","6F54":"3769","5951":"3740","55AB":"354A","5BB3":"3332","8F44":"336D","5272":"3364","61B2":"377B","751F":"4038","661F":"4031","59D3":"402B","6027":"402D","7272":"4037","7523":"3B3A","9686":"4E34","5CF0":"4A76","7E2B":"4B25","62DD":"4752","5BFF":"3C77","92F3":"4372","7C4D":"4052","6625":"3D55","693F":"4458","6CF0":"4259","594F":"4155","5B9F":"3C42","5949":"4A74","4FF8":"4A70","68D2":"4B40","8B39":"3660","52E4":"3650","6F22":"3441","5606":"4332","96E3":"4671","83EF":"325A","5782":"3F62","7761":"3F67","9318":"3F6E","4E57":"3E68","5270":"3E6A","4ECA":"3A23","542B":"345E","541F":"3663","5FF5":"4730","7434":"3657","9670":"3122","4E88":"4D3D","5E8F":"3D78","9810":"4D42","91CE":"4C6E","517C":"3773","5ACC":"3779","938C":"3379","8B19":"382C","5EC9":"4E77","897F":"403E","4FA1":"3241","8981":"4D57","8170":"3978","7968":"493C","6F02":"493A","6A19":"4938","6817":"372A","9077":"412B","8986":"4A24","7159":"316C","5357":"466E","6960":"466F","732E":"3825","9580":"4C67","554F":"4C64","95B2":"315C","95A5":"4836","9593":"3456","7C21":"344A","958B":"332B","9589":"4A44","95A3":"3355","9591":"3457","805E":"4A39","6F64":"3D61","6B04":"4D73","95D8":"462E","5009":"4152","5275":"414F","975E":"4873","4FF3":"4750","6392":"4753","60B2":"4861","7F6A":"3A61","8F29":"475A","6249":"4862","4FAF":"3874","5019":"3875","6C7A":"3768","5FEB":"3277","5049":"304E","9055":"3063","7DEF":"305E","885B":"3152","97D3":"345A","5E72":"3433","809D":"344E","520A":"3429","6C57":"3440","8ED2":"382E","5CB8":"345F","5E79":"3434","828B":"3072","5B87":"3127","4F59":"4D3E","9664":"3D7C","5F90":"3D79","53D9":"3D76","9014":"4553","659C":"3C50","5857":"4549","675F":"422B","983C":"4D6A","702C":"4025","52C5":"443C","758E":"4142","901F":"422E","6574":"4030","5263":"3775","967A":"3831","691C":"3821","5039":"3770","91CD":"3D45","52D5":"4630","52F2":"372E","50CD":"462F","7A2E":"3C6F","885D":"3E57","85AB":"3730","75C5":"4942","75F4":"4354","75D8":"4577","75C7":"3E49","75BE":"3C40","75E2":"4E21","75B2":"4868","75AB":"3156","75DB":"444B","7656":"4A4A","533F":"463F","5320":"3E22","533B":"3065","5339":"4924","533A":"3668","67A2":"3F75","6BB4":"3225","6B27":"3224","6291":"4D5E","4EF0":"3644","8FCE":"375E","767B":"4550","6F84":"4021","767A":"482F","5EC3":"4751","50DA":"4E3D","5BEE":"4E40","7642":"4E45","5F6B":"4426","5F62":"3741","5F71":"3146","6749":"3F79","5F69":"3A4C","5F70":"3E34","5F66":"4927","9854":"3469","9808":"3F5C","81A8":"4B44","53C2":"3B32","60E8":"3B34","4FEE":"3D24","73CD":"4441","8A3A":"3F47","6587":"4A38","5BFE":"4250","7D0B":"4C66","868A":"3263","6589":"4046","5264":"3A5E","6E08":"3A51","658E":"3A58","7C9B":"3D4D","5841":"4E5D","697D":"335A","85AC":"4C74","7387":"4E28","6E0B":"3D42","6442":"405D","592E":"317B","82F1":"3151","6620":"3147","8D64":"4056","8D66":"3C4F","5909":"4A51","8DE1":"4057","86EE":"485A","604B":"4E78","6E7E":"4F51","9EC4":"322B","6A2A":"3223","628A":"4744","8272":"3F27","7D76":"4064","8276":"3170","80A5":"486E","7518":"3445","7D3A":"3A30","67D0":"4B3F","8B00":"4B45","5A92":"475E","6B3A":"353D","68CB":"347D","65D7":"347A","671F":"347C","7881":"386B","57FA":"3470","751A":"3F53","52D8":"342A","582A":"342E","8CB4":"352E","907A":"3064","9063":"382F","821E":"4971","7121":"4C35","7D44":"4148","7C97":"4146","79DF":"4145","7956":"4144","963B":"414B","67FB":"3A3A","52A9":"3D75","5B9C":"3539","7573":"3E76","4E26":"4A42","666E":"4961","8B5C":"4968","6E7F":"3C3E","9855":"3832","7E4A":"4121","970A":"4E6E","696D":"3648","64B2":"4B50","50D5":"4B4D","5171":"3626","4F9B":"3621","7570":"305B","7FFC":"4D63","6D2A":"393F","6E2F":"3941","66B4":"4B3D","7206":"477A","606D":"3633","9078":"412A","6BBF":"4542","4E95":"3066","56F2":"304F","8015":"394C","4E9C":"3021","60AA":"302D","5186":"315F","89D2":"3351","89E6":"3F28","89E3":"3272","518D":"3A46","8B1B":"3956","8CFC":"3958","69CB":"393D","6E9D":"3942","8AD6":"4F40","502B":"4E51","8F2A":"4E58","504F":"4A50","904D":"4A57","7DE8":"4A54","518A":"3A7D","5178":"4535","6C0F":"3B61","7D19":"3B66","5A5A":"3A27","4F4E":"4463","62B5":"4471","5E95":"446C","6C11":"4C31","7720":"4C32","6355":"4A61","6D66":"313A","84B2":"3377","8217":"4A5E","88DC":"4A64","90B8":"4521","90ED":"3354","90E1":"3734","90CA":"3959","90E8":"4974","90FD":"4554","90F5":"4D39","90A6":"4B2E","90F7":"363F","97FF":"3641","90CE":"4F3A","5ECA":"4F2D","76FE":"3D62","5FAA":"3D5B","6D3E":"4749","8108":"4C2E","8846":"3D30","9013":"447E","6BB5":"434A","935B":"4343","540E":"3921","5E7B":"3838","53F8":"3B4A","4F3A":"3B47","8A5E":"3B6C","98FC":"3B74","55E3":"3B4C","821F":"3D2E","8236":"4775","822A":"3952","822C":"484C","76E4":"4857","642C":"4842","8239":"4125","8266":"344F","8247":"447A","74DC":"313B","5F27":"384C","5B64":"3849","7E6D":"4B7A","76CA":"3157","6687":"324B","6577":"495F","6765":"4D68","6C17":"3524","6C7D":"3525","98DB":"4874","6C88":"4440","59BB":"3A4A","8870":"3F6A","8877":"436F","9762":"4C4C","9769":"3357","9774":"3724","8987":"4746","58F0":"403C","5449":"3862","5A2F":"3864","8AA4":"386D","84B8":"3E78","627F":"3E35","51FD":"4821","6975":"364B","7259":"3267","82BD":"326A","90AA":"3C59","96C5":"326D","91C8":"3C61","756A":"4856","5BE9":"3F33","7FFB":"4B5D","85E9":"484D","6BDB":"4C53","8017":"4C57","5C3E":"4878","5B85":"4270","8A17":"4277","70BA":"3059","507D":"3536","9577":"4439","5F35":"4425","5E33":"4422","8139":"4431","9AEA":"4831","5C55":"4538","55AA":"4153","5DE3":"4163","5358":"4331","6226":"406F","7985":"4135","5F3E":"4346","685C":"3A79","7363":"3D43","8133":"473E","60A9":"473A","53B3":"3837","9396":"3A3F","6319":"3573","8A89":"4D40","731F":"4E44","9CE5":"443B","9CF4":"4C44","9DB4":"4461","70CF":"3128","8526":"4455","9CE9":"4837","9D8F":"375C","5CF6":"4567","6696":"4348","5A9B":"4932","63F4":"3167","7DE9":"344B","5C5E":"4230","5631":"3E7C","5076":"3676","9047":"3678","611A":"3672","9685":"3679","9006":"3555","5851":"413A","5CA1":"322C","92FC":"395D","7DB1":"394B","525B":"3964","7F36":"344C","9676":"462B","63FA":"4D49","8B21":"4D58","5C31":"3D22","61C7":"3A29","58BE":"3A26","514D":"4C48","9038":"306F","6669":"4855","52C9":"4A59","8C61":"3E5D","50CF":"417C","99AC":"474F","99D2":"3670","9A13":"3833","9A0E":"3533","99D0":"4373","99C6":"366E","99C5":"3158","9A12":"417B","99C4":"424C","9A5A":"3643","7BE4":"4646","9A30":"462D","864E":"3857","865C":"4E3A","819A":"4966","865A":"3575","622F":"353A","865E":"3673","616E":"4E38","5287":"3760","8650":"3554","9E7F":"3C2F","85A6":"4126","6176":"3744","9E97":"4E6F","718A":"3727","80FD":"473D","614B":"4256","5BC5":"4652","6F14":"3169","8FB0":"4324","8FB1":"3F2B","9707":"3F4C","632F":"3F36","5A20":"3F31","5507":"3F30","8FB2":"4740","6FC3":"473B","9001":"4177","95A2":"3458","54B2":"3A69","9B3C":"3534","919C":"3D39","9B42":"3A32","9B54":"4B62","9B45":"4C25","584A":"3274","8972":"3D31","5687":"3345","6715":"443F","96F0":"4A37","7B87":"3255","932C":"4F23","9075":"3D65","7F77":"486D","5C6F":"4656","4E14":"336E","85FB":"4174","96B7":"4E6C","7652":"4C7E","4E39":"4330","6F5F":"3363","4E11":"312F","536F":"312C","5DF3":"4C26","6B64":"3A21","67F4":"3C46","7826":"3A56","4E9B":"3A33","9AED":"4926","7483":"4D7E","79BD":"3659","6A8E":"3869","6190":"4E79","71D0":"4E55","9E9F":"4E5B","9C57":"4E5A","5944":"3162","5EB5":"3043","63A9":"3166","4FFA":"3236","609B":"5822","99FF":"3D59","5CFB":"3D54","7AE3":"3D57","81FC":"3131","8205":"674F","9F20":"414D","947F":"6F58","6BC0":"544C","8258":"675B","7280":"3A54","7690":"3B29","810A":"4054","7577":"466D","7DB4":"4456","723E":"3C24","74BD":"3C25","93A7":"333B","51F1":"332E","5996":"4D45","6C83":"4D60","5451":"465D","97EE":"4723","7C64":"645E","61FA":"5872","82BB":"676D","96DB":"3F77","8DA8":"3F76","5C24":"4C60","7A3D":"374E","5396":"524D","91C7":"3A53","6216":"303F","65AC":"3B42","514E":"4546","4E5F":"4C69","5C2D":"3646","5DF4":"4743","752B":"4A63","758B":"4925","83EB":"6841","66FC":"5258","5DFE":"3652","4E91":"313E","535C":"4B4E","55AC":"362C","83AB":"477C","502D":"4F41","4FA0":"3622","5026":"3771","4F7C":"3873","4FC4":"3264","4F43":"4451","4F36":"4E62","4ED4":"3B46","4EC7":"3558","4F3D":"3240","50C5":"364F","50FB":"4A48","5132":"4C59","5016":"3876","50D1":"3623","4FB6":"4E37","4F0E":"346C","4F83":"3426","5036":"3666","4FAD":"4B79","4F51":"4D24","4FE3":"4B73","50AD":"4D43","5072":"3C45","8129":"667B","5005":"5066","505A":"5076","51C4":"4028","51B4":"3A63","51CB":"437C","51CC":"4E3F","51B6":"4C6A","51DB":"515B","51E7":"427C","51EA":"4664","5919":"3D48","9CF3":"4B31","5289":"4E2D","5239":"516B","5265":"476D","5243":"4466","5302":"4677","52FE":"387B","53AD":"315E","96C1":"3467","8D0B":"3466","53A8":"3F5F","4EC4":"503C","54E8":"3E25","5632":"535E","548E":"526B","56C1":"5371","558B":"437D","54BD":"3076","5629":"325E","5642":"313D","54B3":"3331","55A7":"3776","5589":"3922","553E":"4243","53E9":"4321","5618":"3133","5544":"426F","546A":"3C76","5420":"4B4A","540A":"445F","565B":"337A","53F6":"3370","543B":"4A2D","5403":"3549","567A":"4838","564C":"4139","5504":"3134","53F1":"3C38","9091":"4D38","5446":"4A72","55B0":"3674","57F4":"3E7D","5764":"3A25","5806":"424F","58D5":"3968","57A2":"3924","5766":"4333","57E0":"4956","586B":"4536","5830":"3161","5835":"4548","5B30":"3145","59E6":"342F","59AC":"454A","5A62":"5539","5A49":"5536","5A3C":"3E2B","5993":"3538","5A03":"3023","59EA":"4C45","5AC9":"3C3B","5B2C":"445C","59E5":"3138","59D1":"3848","59D0":"3039","5B09":"3472","5B55":"5554","5B5C":"3B5A","5BA5":"4D28","5BD3":"3677","5B8F":"3928","7262":"4F34","585E":"3A49","5B8B":"4157","5B8D":"3C35","5C60":"454B","5C41":"557B","5C51":"367D","5C3B":"3F2C","5C61":"3C48","5C4D":"3B53","5C4F":"5622","5D69":"3F73","5D1A":"5645","5CE8":"3265","5D16":"3333","5DBA":"4E66","5D4C":"5648","5D6F":"3A37","5E16":"4421","5E61":"4828","5E5F":"5670","5E96":"4A79","5ED3":"3347","5E87":"485F","9DF9":"426B","5E84":"3E31","5EDF":"4940","5F4A":"3630","5F25":"4C6F","5F1B":"4350","7CA5":"3421","633D":"4854","649E":"4635","626E":"4A31","63A0":"4E2B","6328":"3027","63B4":"444F","637A":"4668","637B":"4731","63BB":"415F","64B0":"4071","62ED":"3F21","63C3":"4237","634C":"3B2B","64B9":"3349","647A":"4022","6309":"3044","6349":"422A","62F6":"3B22","64AD":"4745","63D6":"4D2C","6258":"4271","6367":"4A7B","649A":"4732","633A":"4472","64FE":"3E71","6357":"443D","64AB":"496F","6492":"3B35","64E2":"4527","6377":"3E39","6289":"5931","602F":"3631","60DF":"3054","60DA":"397B","601C":"4E67","60C7":"4657","61A7":"4634","6070":"3366","6062":"327A","608C":"4470","6E67":"4D2F","6FAA":"5F3A","6D38":"5E2B","6EC9":"5E66","6F31":"5E7B","6D32":"3D27","6D35":"5E2D","6EF2":"5E7A","6D12":"5E2F","6C90":"5D74","6CEA":"5E25","6E3E":"5E55","6C99":"3A3B","6D9C":"4642","6DEB":"307C","6881":"4E42","6FB1":"4543","6C3E":"4845","6D1B":"4D6C","6C5D":"4672","6F09":"3977","7015":"494E","6FE0":"396A","6E8C":"482E","6EBA":"452E","6E4A":"4C2B","6DCB":"4E54","6D69":"3940","6C40":"4475","9D3B":"3963","6F45":"3443","6EA2":"306E","6C70":"4241","6E5B":"4339","6DF3":"3D5F","6F70":"4459","6E25":"302F","7058":"4667","6C72":"3562","701E":"4654","6E9C":"4E2F","6E15":"5E3C","6C8C":"4659","6C4E":"4846","6FFE":"5F49","6FE1":"4728","6DC0":"4D64","6D85":"5E3A","91DC":"3378","65A7":"4960","723A":"4C6C","733E":"6051","7325":"6050","72E1":"6044","72F8":"432C","72FC":"4F35","72FD":"4762","72D7":"3669","72D0":"3851","72DB":"397D","72D9":"4140","7345":"3B62","72D2":"6041","83A8":"683E","8309":"677D","8389":"683D","82FA":"6775","8429":"476B","85DD":"693A","8599":"4665","84D1":"4C2C","840E":"3060","82D4":"425D","8569":"4622","853D":"4A43","8513":"4C22","84EE":"4F21","8299":"4967","84C9":"4D56","862D":"4D76","82A6":"3032","85AF":"3D72","83D6":"3E54","8549":"3E56","82AF":"3F44","854E":"363E","8557":"4979","85CD":"4D75","8304":"3258","82DB":"3257","852D":"307E","84EC":"4B29","82A5":"3329","840C":"4B28","8461":"4972","8404":"463A","8607":"4149","8543":"4859","82D3":"4E6A","83F0":"3856","8499":"4C58","8305":"337D","82AD":"474E","82C5":"3423","84CB":"3338","8471":"472C","8511":"4A4E","8475":"302A","847A":"4978","854A":"3C49","8338":"427B","8494":"3C2C","82B9":"365C","82EB":"4651","845B":"336B","84BC":"4173","85C1":"4F4E","856A":"4973","85F7":"3D73","85AE":"4C79","849C":"4947","8568":"4F4F","851A":"3136","831C":"302B","839E":"3450","8490":"3D2F","83C5":"3F7B","8466":"3031","8FEA":"6D6C","8FBF":"4329","9019":"4767","8FC2":"312A","9041":"465B","9022":"3029","9065":"4D5A","907C":"4E4B","903C":"492F","8FC4":"4B78","905C":"423D","9017":"3F60","90C1":"306A","912D":"4522","9699":"3764","9688":"3728","6191":"5861","60F9":"3C66","6089":"3C3D","5FFD":"397A","60E3":"415A","6108":"4C7C","6055":"3D7A","6634":"5A65","664B":"3F38","66D6":"5B23","665F":"5A70","6688":"5A74","6689":"5A76","65F1":"5A5D","664F":"5A67","6668":"5A6F","6652":"3B2F","6627":"4B66","6643":"3938","66DD":"4778","66D9":"3D6C","6602":"3937","65FA":"3222","660F":"3A2A","6666":"3322","814E":"3F55","80A1":"3854","81BF":"473F","8151":"6725","80F1":"6679","80DA":"6675","809B":"666A","81C6":"3232","819D":"4928","8106":"4048","808B":"4F3E","8098":"492A","8154":"3950","817A":"4123","816B":"3C70","81B3":"4137","80B1":"394F","80E1":"3855","6953":"4976","6795":"4B6D","694A":"4D4C","690B":"4C3A","699B":"3F3A","6ADB":"367B","69CC":"4448","6A35":"3E41","68AF":"4474","6905":"3058","67FF":"3341","67D1":"343B","6841":"3765","676D":"393A","67CA":"4922","67DA":"4D2E","6900":"4F50","6802":"444E","67FE":"4B6F","698A":"3A67","6A2B":"335F","69D9":"4B6A","6962":"466A","6A58":"354C","6867":"4930","68F2":"4033","6816":"4034","6897":"393C","6854":"354B","675C":"454E","6777":"4747","68B6":"3361","6775":"354F","6756":"3E73","690E":"4447","6A3D":"432E","67F5":"3A74","6AD3":"4F26","6A7F":"3360","6753":"3C5D","674E":"4D7B","68C9":"4C49","696F":"3D5D","698E":"315D","6A3A":"3372","69CD":"4164","67D8":"4453","68B1":"3A2D","6787":"487A","6A0B":"4875","6A47":"5C72","69C3":"5C51","681E":"5B59","6930":"5C3F","6A80":"4349","6A17":"4374","69FB":"4450","6919":"3F7A","5F6C":"494B","6876":"3233","6955":"424A","6A12":"5C69","6BEC":"5D5C","71FF":"6022","71CE":"5F79","70AC":"5F59","711A":"4A32","7078":"3564","71ED":"3F24","717D":"407A","7164":"4761","7149":"4E7B","71E6":"3B38","707C":"3C5E","70D9":"5F60","7114":"316B","7194":"4D50","714E":"4079","70F9":"4B23","727D":"3823","725D":"4C46","7261":"3234","7476":"6076","7433":"4E56","7460":"4E5C","6591":"4843","7409":"4E30","5F04":"4F2E","7473":"3A3C","7422":"4276","73CA":"3B39","745A":"386A","745E":"3F70","73EA":"373E","7396":"366A","745B":"314D","73A9":"3461","73B2":"4E68","754F":"305A","7562":"492D","7566":"374D","75D2":"615A","75F0":"6162","75B9":"3F3E","75D4":"3C26","764C":"3462","75E9":"4169","75D5":"3A2F","75FA":"6163","7738":"6248","7729":"6241","77AD":"4E46","7709":"487D","96C9":"7035","77E9":"366B","78D0":"4858","7887":"4476","78A7":"4A4B","786F":"3827","7825":"4556","7897":"4F52","788D":"3337","78A9":"4059","78EF":"306B","783A":"4557","7893":"3130","79A6":"357A","7977":"4578","7950":"4D34","7947":"3540","7962":"472A","7984":"4F3D","798E":"4477","79E4":"4769","9ECD":"3550","79BF":"4645","7A14":"4C2D","7A17":"4923","7A63":"3E77","7A1C":"4E47","7A00":"3529","7A46":"4B54","7ABA":"312E","7A84":"3A75","7A9F":"3722","7A7F":"407C","7AC3":"3376","7AEA":"4328","98AF":"7125","7AD9":"636B","9756":"4C77","59BE":"3E2A","887F":"365E","88FE":"3F7E","88B7":"3041","88B4":"3853","8956":"3228","7B19":"6379","7B4F":"4835","7C3E":"4E7C","7BAA":"433D","7AFF":"3448","7B86":"4A4F","7B94":"4773","7B25":"3F5A","7BAD":"407D","7B51":"435E","7BED":"4F36","7BE0":"3C44","7BB8":"4824","7E82":"3B3C","7AFA":"3C33","7B95":"4C27","7B08":"3568","7BC7":"4A53","7B48":"4826","7C38":"4876","7C95":"4774","7CDF":"416C","7CCA":"3852","7C7E":"4C62","7CE0":"3947","7CDE":"4A35","7C9F":"3040","7E4B":"3752","7DB8":"6545","7D68":"6530","7D46":"652B","7DCB":"486C","7D9C":"416E","7D10":"4933","7D18":"3949","7E8F":"453B","7D62":"303C","7E4D":"3D2B","7D2C":"445D","7DBA":"653A","7DBE":"303D","7D43":"383E","7DBB":"433E","7E1E":"3C4A","7DAC":"3C7A","7D17":"3C53","8235":"4249","8237":"383F","806F":"4E7E","8061":"416F","8058":"665B","803D":"433F","8036":"4C6D","86A4":"4742","87F9":"332A","86CB":"4341","87C4":"6A2F","877F":"4768","87FB":"3542","8702":"4B2A","874B":"4F39","8766":"325C","86F8":"427D","87BA":"4D66","8749":"4066","86D9":"333F","86FE":"326B","86E4":"483A","86ED":"4948","86CE":"3342","7F6B":"3753","7F75":"474D","8888":"3736","88DF":"3A40","6234":"4257","622A":"5923","54C9":"3A48","8A62":"6B4E","8AC4":"6B59","8B90":"3D32","8ACC":"3452","8B0E":"4666","8AD2":"4E4A","8B83":"3B3E","8AB0":"432F","8A0A":"3F56","8A23":"376D","8A63":"3758","8AE6":"447C","8A6E":"4127","8A51":"4242","8ABC":"3543","8B2C":"4935","8A6B":"4F4D","8ACF":"3F5B","8AFA":"3841","8AB9":"4870","8B02":"3062","8ADC":"4435","8A3B":"4370","8B6C":"6C22","8F5F":"396C","8F14":"4A65","8F3B":"6D55","8F2F":"3D34","8C8C":"4B46","8C79":"493F","8CCE":"4128","8CBC":"453D","8CB0":"4C63","8CC2":"4F28","8CD1":"4678","8E93":"6D35","8E44":"447D","8E74":"3D33","8E5F":"4058","8DE8":"3859","8DEA":"6C6E","91A4":"3E5F","918D":"4269","914E":"4371","9190":"386F","9192":"4043","9187":"3D66","9EBA":"4C4D","9EB9":"396D","91E6":"4B55","929A":"4438","92E4":"3D7B","934B":"4669","93D1":"452D","92F8":"3578","9310":"3F6D","9375":"3830","936C":"372D","92F2":"4946","932B":"3C62","9328":"4945","91D8":"4523","9453":"4C7A","92D2":"4B2F","939A":"444A","9266":"3E60","9306":"3B2C","937E":"3E61","92CF":"6E77","9583":"412E","60B6":"4C65","95A4":"395E","95C7":"3047","96EB":"3C36","971E":"3262","7FF0":"344D","65A1":"3036","978D":"3048","97AD":"4A5C","9798":"3E64","9784":"3373","976D":"3F59","97A0":"3547","9813":"465C","985B":"453F","7A4E":"314F","9803":"3A22","982C":"4B4B","9817":"3F7C","980C":"7073","984E":"335C","981A":"375B","990C":"3142","9910":"3B41","9957":"3642","8755":"3F2A","98F4":"303B","9905":"4C5F","99D5":"326F","9A28":"424D","99B3":"435A","9A19":"7159","99B4":"466B","99C1":"477D","99C8":"366F","9A62":"7166","9C3B":"3137","9BDB":"4264","9C2F":"3073","9C52":"4B70","9BAD":"3A7A","9BAA":"4B6E","9B8E":"303E","9BF5":"3033","9C48":"432D","9BD6":"3B2A","9BAB":"3B2D","9C39":"336F","9C0D":"3362","9C10":"4F4C","9B92":"4A2B","9BA8":"723F","9C2D":"4949","9D0E":"322A","9D6C":"4B32","9E1A":"7340","9D61":"4C39","9D5C":"312D","9DFA":"3A6D","9DF2":"4F49","9D28":"337B","9CF6":"4650","689F":"5B66","5875":"3F50","9E93":"4F3C","9E92":"734A","51A5":"4C3D","7791":"6254","669D":"5A79","5750":"3A41","632B":"3A43","6714":"3A73","9061":"414C","66F3":"3148","6D29":"314C","5F57":"5742","6167":"3745","5609":"3245","5147":"3624","515C":"3375","723D":"4156","6B1D":"3135","52AB":"3965","52C3":"4B56","6B4E":"4337","8F3F":"4D41","5DFD":"4327","6B6A":"4F44","7FE0":"3F69","9EDB":"4263","9F0E":"4524","9E75":"7343","9E78":"3834","8654":"694A","71D5":"316D","5617":"3E28","6B86":"4B58","5B5F":"4C52","724C":"4757","9AB8":"333C","8997":"4741","5F6A":"4937","79E6":"3F41","96C0":"3F7D","96BC":"483B","8000":"4D54","5937":"3050","621A":"404C","56A2":"4739","4E3C":"5027","66A2":"442A","5EFB":"3276","757F":"3526","6B23":"3655","6BC5":"3523","65AF":"3B5B","5319":"3A7C","5321":"3629","8087":"4825","9EBF":"4B7B","53E2":"4151","80B4":"3A68","6590":"4865","537F":"362A","7FEB":"3465","65BC":"3177","5957":"4565","53DB":"4840","5C16":"406D","58F7":"445B","53E1":"3143","914B":"3D36","9D2C":"3229","8D6B":"3352","81E5":"3269","7525":"3179","74E2":"493B","7435":"487C","7436":"474A","53C9":"3A35","821C":"3D58","7560":"482B","62F3":"377D","5703":"4A60","4E1E":"3E67","4EAE":"4E3C","80E4":"307D","758F":"4141","818F":"3951","9B41":"3321","99A8":"333E","7252":"442D","77A5":"4A4D","961C":"496C","777E":"6250","5DEB":"5660","6566":"4658","594E":"5477","7FD4":"6646","7693":"622B","9ECE":"7355","8D73":"6C62","5DF2":"5661","68D8":"5B79","805A":"665C","7526":"6134","526A":"5172","8EBE":"6D3F","5925":"546E","9F3E":"736D","795F":"632E","7C81":"364E","7CCE":"4138","7C8D":"4C30","5678":"4655","54E9":"4B69","6D6C":"333D","540B":"3125","544E":"5268","68B5":"5B70","9640":"424B","85A9":"3B27","83E9":"4A6E","5516":"3022","8FE6":"3260","90A3":"4661","725F":"4C36","73C8":"605D","7432":"606A","6A9C":"5B58","8F61":"3725","6DF5":"4A25","4F0D":"3860","4EC0":"3D3A","842C":"685F","9081":"6E32","901E":"6D77","71C8":"4575","88E1":"4E23","8597":"3172","92EA":"4A5F","5D8B":"4568","5CEF":"4A77","5DCC":"3460","57DC":"4738","8218":"345C","9F8D":"4E36","5BF5":"437E","807E":"4F38","617E":"4D5D","4E99":"4F4A","8EAF":"366D","5DBD":"5656","570B":"5422","811B":"667A","52C1":"5226","7B8B":"6435","7940":"632B","7953":"6331","8E87":"6D30","58FD":"5468","8E8A":"6D34","5F59":"5743","9945":"713D","5614":"5352","9F08":"7368","4EA8":"357C","4F91":"5052","68A7":"3868","6B3D":"3656","7155":"5F66","800C":"3C29","639F":"595D"};

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpathi(query) {
	return xpath(query).snapshotItem(0);
}

function addChild(parent, type, settings, sibling) {
	var child = document.createElement(type);
	for (var key in settings) {
		child[key] = settings[key];
	}
	if (sibling) parent.insertBefore(child, sibling);
	else parent.appendChild(child);
	return child;
}

function addText(parent, text) {
	return parent.appendChild(document.createTextNode(text));
}

function addScript(parent, url) {
	return addChild(parent, 'script', {
		type: 'text/javascript',
		language: 'javascript',
		src: url || ''
	});
}

function addLinkToList(list, url, text) {
	addText(addChild(addChild(list, 'li'), 'a', {
		href: url,
		target: '_blank'
	}), text);
}

var thisdiv = xpathi('//div[@class="kanji"]//span') || xpathi('//div[@id="kanjibig"]//span')
if (!thisdiv) return;

var container = addChild(document.body, 'div', {
	id: 'container'
});
container.setAttribute("style", "display: none;");

var content1 = addChild(container, 'div', {
	id: 'content1',
	className: 'actionconfirmationmessage'
});

var domTT_styleClass = 'domTTClassic';

thisdiv.addEventListener('mouseover', function (event) {domTT_activate(event.target, event, 'content', document.getElementById('content1'), 'type', 'velcro');}, true);
thisdiv.addEventListener('click', function (event) {domTT_deactivate(domTT_lastOpened)}, true);

function updateContent(el, g) {
	var s = escape(g).substring(2,6);
	var jis = utf8_jis[s];

	el.innerHTML = '';

	addText(addChild(el, 'p'), "Links for this kanji:");
	var linkList = addChild(el, 'ul');
	addLinkToList(linkList, "http://www.csse.monash.edu.au/cgi-bin/cgiwrap/jwb/wwwjdic?1MKU" + s, "Jim Breen's WWWJDIC Kanji Display");
	addLinkToList(linkList, "http://zhongwen.com/cgi-bin/zi3.cgi?uni=" + s, "Rick Harbaugh's Chinese Character Links");
	addLinkToList(linkList, "http://en.wiktionary.org/wiki/" + g, "Wiktionary");
	addLinkToList(linkList, "http://www.yamasa.cc/members/ocjs/kanjidic.nsf/SortedByKanji2THEnglish/" + g + "?OpenDocument", "Yamasa Online Kanji Dictionary");
	addLinkToList(linkList, "http://taka.sourceforge.net/current/kanji/J" + jis, "Taka Stroke Order Diagram");
	addLinkToList(linkList, "http://www.google.com/search?q=" + g, "Google");
	addLinkToList(linkList, "http://images.google.com/images?q=" + g, "Google Images");

	addText(addChild(el, 'p'), "Stroke order for this kanji:");
	addChild(el, 'img', {
		alt: "      Stroke order animation for this kanji not yet available",
		src: "http://www.michael.spertus.name/kanjistrokeorder/" + s.toLowerCase() + "-order.gif"
	});
}

var curKanji;

function checkContent() {
	// get the kanji
	var kanji = thisdiv.innerHTML.substring(0,1);
	if (kanji != curKanji) {
		curKanji = kanji;
		updateContent(content1, kanji);
	}
	
	setTimeout(checkContent, 500);
}

checkContent();
