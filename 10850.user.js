// Copyright (c) 2007-2010 Thomas W. Most
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// ==UserScript==
// @name           KoL Item Description Bubble
// @namespace      http://freecog.net/2007/
// @description    Creates a little bubble in-page with the description of the item, instead of a popup window. A double-click pops up the window.
// @include        http://kingdomofloathing.com/*
// @include        http://*.kingdomofloathing.com/*
// @exclude        http://*kingdomofloathing.com/desc_item.php*
// @version        3
// ==/UserScript==

/*

Version 1, 21 July 2007
  * Initial release

Version 2, 3 Aug 2007
  * BUGFIX: Fixed typo that prevented the cache from clearing.
  * Changed the cache to store strings URL-encoded--hopefully solving the
          certain encoding problems.  The data in cache will be automatically
          upgraded.  (Encoding problems seem rather strange, considering that
          Firefox prefs seem to support Unicode fully, like "network.IDN.
          blacklist_chars".)

Version 3, 8 Aug 2007
  * BUGFIX: Clearing the cache is now properly encoding things.  Formerly, I
          was encoding the cache key instead of the data.  The cache will be
          cleared when this script is first run in order to remove any
          incorrectly-encoded entries.
  * BUGFIX: I have removed the the "Purge Item Cache" menu item, as GM does not
          support deleting prefs at this time.  I have submitted ticket #38 to
          get this fixed.

Version 4, 28 Jan 2010
  * Added license.

Future versions
  * TODO: Don't show the bubble on double-click.
  * TODO: Switch to a better datastore for cached items once Greasemonkey adds
          support for one.
  * TODO: Make the bubble look like a speech bubble, and place it near
          the item image that was clicked on. (I'll wait for @require
          to implement this.)

*/

GM_log = alert; // Logging from frames gets lost.

var bubble = document.createElement('div');
with (bubble.style) {
	border = '2px solid black';
	background = 'white';
	MozBorderRadius = '10px';
	padding = '10px';
	position = 'fixed';
	top = '10px';
	left = right = '20%';
	opacity = '.9';
}

var bubble_shown = false;

function remove_bubble() {
	if (bubble_shown)
		bubble.parentNode.removeChild(bubble);
	bubble_shown = false;
}

// Place the bubble next to `node`
function show_bubble(node) {
	node.parentNode.appendChild(bubble);
	bubble_shown = true;
};

// Bubble closes on click
bubble.addEventListener('click', remove_bubble, false);

Array.slice(document.getElementsByTagName("img")).filter(function(img){
	return (/descitem\(/).test(img.getAttribute("onclick")||"");
}).forEach(function(img){
	var onclick = img.getAttribute("onclick");
	var id = onclick.replace(/\D+/g, '');
	var url = ("http://" + document.domain + "/desc_item.php?whichitem=" + id);
	img.setAttribute('ondblclick', onclick);
	img.setAttribute('onclick', '');
	img.addEventListener('click', function() {
		var data = cache_lookup(id);
		if (data) {
			bubble.innerHTML = data;
			show_bubble(img);
		} else {
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: function(details) {
					var m = (/\<div[\s\S]+\<\/div\>/i).exec(details.responseText);
					if (m) {
						var data = m[0];
						bubble.innerHTML = data;
						show_bubble(img);
						cache_save(id, data);
					} else {
						GM_log("Failure to extract.");
						GM_log(details.responseText);
					}
				},
				onerror: function(details) {
					var errortext = details.status + "\n" + details.statusText;
					GM_log("Item description request failed: " + errortext);
					GM_log("URL was " + url);
					bubble.innerHTML = '<pre><span style="color:red">Error:' + 
						errortext + '</span></pre>';
				}
			});
		}
	}, false);
});

function cache_save(key, data) {
	if (data !== null) data = encodeURIComponent(data);
	GM_setValue("cache:" + key, data);
	// Record the key so that the cache can be purged later.
	var keys = GM_getValue("cache_keys", "");
	GM_setValue("cache_keys", keys + (keys.length && ':') + key);
}

function cache_lookup(key) {
	var val = GM_getValue("cache:" + key, null);
	if (val !== null) val = decodeURIComponent(val);
	return val;
}

// Get an array of cache keys
function get_cache_keys() {
	return GM_getValue('cache_keys', '').split(/:/g);
}

// Remove duplicate cache keys
function clean_cache_keys() {
	var keys = get_cache_keys();
	var hash = {};
	for (var i = 0; i < keys.length; i++) {
		hash[keys[i]] = 1;
	}
	var unique_keys = [];
	for (var key in hash) {
		unique_keys.push(key);
	}
	GM_setValue('cache_keys', keys.join(':'));
}

function cache_purge() {
	get_cache_keys().forEach(function(key){
		// This doesn't properly remove the pref.  However, it is a bit
		// more compact than just leaving the pref there!
		cache_save(key, '');
	});
};

/*
  Doesn't work -- GM doesn't support deleting prefs.
  I have submitted ticket #38 to fix this.

GM_registerMenuCommand("Purge Item Cache", function(){
	cache_purge();
	alert("The cache has been cleared.");
});
*/

// I think that this messes with fast back/forward, but
// it probably doesn't matter for KoL, since most pages are
// unchacheable.
document.addEventListener('unload', clean_cache_keys, false);


// Upgrades the datastore to the latest version, as
// indicated by the datastore_revision pref.
function upgrade_datastore() {
	// There wasn't a datastore_revision pref for rev 1
	var rev = GM_getValue('datastore_revision', 1);
	/* This upgrade is no longer necessary, because v3 just clears the cache.
	if (rev < 2) { // Upgrade to rev 2
		// Cache data was changed to be URL-encoded in rev 2.
		clean_cache_keys(); // Remove duplicates
		var keys = get_cache_keys();
		keys.forEach(function(key){
			key = "cache:" + key;
			var val = GM_getValue(key, '');
			if (val) {
					GM_setValue(key, encodeURIComponent(val));
			}
		});
		rev = 2;
	} */
	if (rev < 3) {
		// A mistake in data storage resulted in a messed up cache, with some
		// values encoded an others not.  We'll just clear the cache to fix it.I
		// It's just cache, after all!
		var err = false;
		try {
			cache_purge();
		} catch (e) {
			err = true;
			alert(e);
		}
		if (!err)
			rev = 3;
	}
	if (rev < 4) {
		// Move to SQLite?
	}
	GM_setValue('datastore_revision', rev);
}

// Called when the script is run for the first time.
function init_datastore() {
	GM_setValue('datastore_revision', 3);
}

if (!GM_getValue("installed", false) &&
		// Old versions didn't have 'installed' pref, but did have 'cache_keys'.
		GM_getValue('cache_keys', null) !== null) {
	init_datastore();
	GM_setValue("installed", true);
} else {
	upgrade_datastore();
}