// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install the script, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "OKC Name Posts", and click Uninstall.
//
// --------------------------------------------------------------------
// 
// Author's contact info:
//
// zzyzx.xyzzy@gmail.com
// zzyzx_xyzzy (OKCupid)
// zzyzx_xyzzy@userscripts.org
// http://zzyzx.xyzzy.googlepages.com/okcupidhacks
// 
// Copyright (c) 2008, the author.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the author nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//

// ==UserScript==
// @name           OKCupid Name Posts
// @namespace      http://zzyzx.xyzzy.googlepages.com/okcupidnameposts
// @description    Attempts to provide the favorites' comments page with author names and titles for the journal entries each comment is made on.
// @include        http://*.okcupid.com/*
// ==/UserScript==

var handlePidToTitle; 

//If looking at a comments page, interpolate titles. If somewhere else,
//scrape information about what titles go with what post IDs.

if (window.location.pathname.match('/relevant')) {
    if (window.location.search.match('comm')) {
        handlePidToTitle = toDict(GM_getValue('handlePidToTitle', ''));
        substituteNames(document);
    } else {
        handlePidToTitle = toDict(GM_getValue('handlePidToTitle', ''));
	    learnRelevant(document);
        GM_setValue('handlePidToTitle', toString(handlePidToTitle));
    }
} else if (window.location.pathname.match('/journal')) {
    learnJournal(document);
} else if (window.location.pathname.match('/activity_review')) {
    learnActivity(document);
} else if (window.location.pathname.match('/home')) {
    learnHomepage(document);
}

// ------ SUBSTITUTING ------
function substituteNames(document) {
    var postlinks = document.evaluate(
        "descendant::a[@class='jcomHomeTitleLink']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < postlinks.snapshotLength; i++) {
		substituteName(postlinks.snapshotItem(i));
	}
}

function substituteName(postlink) {
    var permalink = postlink.getAttribute('href');

    var handle, pid;
    [handle, pid] = permalink2handlePid(permalink);
    
    var title = handlePidToTitle[handle + '/' + pid] || "";

    if (handle) {
        if (title) {
            postlink.childNodes[0].data = handle + "'s post \"" + title + '"'
        } else {
            postlink.childNodes[0].data = handle + "'s post";
        }
    }

}


// ------ SCRAPING ------

function learnRelevant(document) {
    //learn post titles from posts.
	var relevantPosts = document.evaluate(
		"//div[contains(concat(' ', @class, ' '), ' journalRelevant ')]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < relevantPosts.snapshotLength; i++) {
		learnRelevantPost(relevantPosts.snapshotItem(i));
	}
}

function learnJournal(node) {
    handlePidToTitle = toDict(GM_getValue('handlePidToTitle', ''));

    var entries = document.evaluate(
        "//div[@class='journalEntry']",
        node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < entries.snapshotLength; i++) {
        learnEntry(entries.snapshotItem(i));
    }

    GM_setValue('handlePidToTitle', toString(handlePidToTitle));
}

function learnActivity(node) {
    handlePidToTitle = toDict(GM_getValue('handlePidToTitle', ''));

    //learn post names from here. 
    var permalinks = document.evaluate(
        "//span[contains(concat(' ', @class, ' '), ' descrip ')]/a[contains(@href, '/journal/')][contains(string(), '\"')]"
        , document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < permalinks.snapshotLength; i++) {
        learnQuotedTitledLink(permalinks.snapshotItem(i));
    }

    GM_setValue('handlePidToTitle', toString(handlePidToTitle));
}


function learnHomepage(node) {
    handlePidToTitle = toDict(GM_getValue('handlePidToTitle', ''));
    
    //learn from recent activity
    var permalinks = document.evaluate(
        "//p[contains(concat(' ', @class, ' '), ' activity-item ')]//span[contains(concat(' ', @class, ' '), ' descrip ')]/a[contains(@href, '/journal/')][contains(string(), '\"')]"
        , document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < permalinks.snapshotLength; i++) {
        learnQuotedTitledLink(permalinks.snapshotItem(i));
    }

    //learn from journals box
    permalinks = document.evaluate(
        "//div[contains(concat(' ', @class, ' '), ' homeJInfo ')]//h1[1]//a",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for (var i = 0; i < permalinks.snapshotLength; i++) {
        learnTitledLink(permalinks.snapshotItem(i));
    }

    GM_setValue('handlePidToTitle', toString(handlePidToTitle));
}


// ------- SCRAPING MORE ------


function learnQuotedTitledLink(node) {
    var permalink = node.href;
    var quotedtitle = node.textContent;
    title = quotedtitle.match(/"(.*)"/);
    if (title) {
        title = title[1];
    } else {
        title = quotedtitle;
    }

    var handle, pid;
    [handle, pid] = permalink2handlePid(permalink);

	if (handle && pid && title) {
        //GM_log(handle + '/' + pid + ' = ' + title);
		handlePidToTitle[handle + '/' + pid] = title;
	}
}

function learnTitledLink(node) {
    var permalink = node.href;
    var title = node.textContent;

    var handle, pid;
    [handle, pid] = permalink2handlePid(permalink);

	if (handle && pid && title) {
        //GM_log(handle + '/' + pid + ' = ' + title);
		handlePidToTitle[handle + '/' + pid] = title;
	}
}

function learnRelevantPost(post) {
	var permalink = document.evaluate(
		"descendant::a[@class='viewPost']/@href",
		post, null, XPathResult.STRING_TYPE, null).stringValue;

    var handle, pid;
    [handle, pid] = permalink2handlePid(permalink);

	var title = document.evaluate(
		"descendant::h3/a/text()",
		post, null, XPathResult.STRING_TYPE, null).stringValue;

	if (handle && pid && title) {
        //GM_log(handle + '/' + pid + ' = ' + title);
		handlePidToTitle[handle + '/' + pid] = title;
	}
}

function permalink2handlePid(permalink) {
   	var handlePid = permalink.match(/\/profile\/([a-zA-Z_0-9-]+)\/journal\/(\d+)/);
    if (handlePid) {
        return [handlePid[1], handlePid[2]]
    } else {
        return [null, null];
    }
}

function learnEntry(entry) {
    var permalink = document.evaluate(
        "descendant::a[contains(concat(' ', @class, ' '), ' journalFooterLink ')]/@href",
        entry, null, XPathResult.STRING_TYPE, null).stringValue;

    var handle, pid;
    [handle, pid] = permalink2handlePid(permalink);

    var title = document.evaluate(
        "substring-before(descendant::text()[contains(string(), ' | ')], ' | ')",
        entry, null, XPathResult.STRING_TYPE, null).stringValue;

    if (handle && pid && title) {
        //GM_log(handle + '/' + pid + ' = ' + title);
		handlePidToTitle[handle + '/' + pid] = title;
    } else {
        //GM_log('no? ' + handle + ' ' + pid + ' ' + title);
    }
}

//------ AJAX JOURNALS HACK ------
// is no longer useful for this script.

/*
function watchObject(obj, prop, func) {
    //cascading watch...
    var old = obj['_watch_' + prop];
    if (old) {
        obj['_watch_' + prop] = function(prop, oldVal, newVal) {
            //how to communicate old and new values is a puzzle
            newVal = old(prop, oldVal, newVal);
            newVal = func(prop, oldVal, newVal);
            return newVal;
        }
    } else {
        obj['_watch_' + prop] = func;
    }
    obj.watch(prop, obj['_watch_' + prop]);
}
*/

//----- PERSISTENCE -----

function toDict(string) {
    var out = {};
    string.replace(/([^=&]*)=([^=&]*)/g, function(str, a, b) {
        //GM_log('+++' + a + '=' + b);
        out[decodeURIComponent(a)] = decodeURIComponent(b);
        //GM_log(decodeURIComponent(a) + ' = ' + decodeURIComponent(b));
        return str;
    });
    //GM_log('got string, made dict\n' + string + '\n' + toString(out));
    return out;	
}

function toString(dict) {
    var out = [];
    for (var i in dict) {
        ///GM_log('---' + i + '=' + dict[i]);
        out.push(encodeURIComponent(i) + '=' + encodeURIComponent(dict[i]));
    }
    
    out = out.join('&');
    //GM_log('Returning string: ' + out);
    return out;
}
