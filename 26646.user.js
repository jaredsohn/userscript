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
// select "OKC Threaded Favorites' Comments", and click Uninstall.
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

//
// ==UserScript==
// @name           OKC Threaded Favorites' comments
// @namespace      http://zzyzx.xyzzy.googlepages.com/okccommentsthreading
// @description    Organizes the favorites' comments screen by thread and allows you to expand and collapse threads.
// @include        http://*.okcupid.com/relevant*comm*
// ==/UserScript==

//find all the comments

var comments = document.evaluate(
	"//a[@class='jcomHomeTitleLink']"
+	"/ancestor::div[contains(concat(' ', @class, ' '), ' journalRelevantComment ')][1]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (comments.snapshotLength <= 0) return;

var commentlist = [];
for (var i = 0; i < comments.snapshotLength; i++) {
	commentlist.push(comments.snapshotItem(i));
}

//I want to sort them into threads, then sort the threads by the date of the most recent
//comment therein.
var threads = {};

for (var i = 0; i < commentlist.length; i++) {
	var next = commentlist[i];
	var threadid = thread(next);
    GM_log(threadid);
	if (typeof(threads[threadid]) == 'undefined') {
		threads[threadid] = [];
	}
	threads[threadid].push(next);
}

var sortedthreads = [];
for (var i in threads) {
	sortedthreads.push(threads[i]);
}

/*
var dates = map(function(t) {return parseInt(date(t[0]));}, sortedthreads);
GM_log(dates); // the dates to be sorted...

//this sorting doesn't work!!! Luckily it already appears to be sorted. I don't
//know if that will hold in the future... But seriously, wtf?
sortedthreads.sort(function(a, b) {strcmp(parseInt(date(b[0])), parseInt(date(a[0])))});

//Watch how sort doesn't work!
dates.sort(function(a, b) {strcmp(parseInt(b), parseInt(a))});
c = map(function(t) {return date(t[0]);}, sortedthreads);
GM_log(c); //LOOK HOW IT DOESN'T SORT THE ENTRIES
GM_log(dates); //AND ALSO LOOK HOW IT DOESN'T SORT STRINGS
*/

//now they should be sorted into threads, the threads sorted reverse
//chronologically by latest comment in thread, assuming they were reverse
//chronological to begin with.

//insert a silly little marker before, to insert by.
var marker = commentlist[0].parentNode.insertBefore(e('span', {id:'threadingMarker'}, []), commentlist[0]);

for (var threadix = 0; threadix < sortedthreads.length; threadix++) {
	var thread = sortedthreads[threadix];
	//push in a new thread heading
	marker.parentNode.insertBefore(makePostWrapper(thread), marker);
}

function makePostWrapper(thread) {
	//hee hee, needed a function to separate scopes of collapseLink and expandLink

	//are ALL the comments collapsed already?
	//Show up in collapsed mode if so.

	var allCollapsed = true;
	for (var i = 0; i < thread.length; i++) {
		if (!(thread[i].getAttribute('class').match('collapsed'))) {
			allCollapsed = false;
		}
	}

	var collapseLink = e('a', {href:'javascript:void(0)'}, [t('hide')]);
	collapseLink.addEventListener('click', function(evt) {
		postDiv.style.display='none';
		collapseLink.parentNode.replaceChild(expandLink, collapseLink);
	}, false);

	var expandLink = e('a', {href:'javascript:void(0)'}, [t('show')]);
	expandLink.addEventListener('click', function(evt) {
		postDiv.style.display='';
		expandLink.parentNode.replaceChild(collapseLink, expandLink);
	}, false);	

	var postDiv = e('div', {style:(allCollapsed ? 'display:none;' : '')}, thread);			
	var postWrapper = e('div', {class:'text', style:''}, [
		e('h3', {style:"font-size: 10pt;"}, [
			t('' + thread.length + ' comment' + (thread.length == 1 ? '' : 's') + ' on '),
			postlink(thread[0]),
			t(' ('),
			(allCollapsed ? expandLink : collapseLink),
			t(')'),
		]),
		postDiv,
	]);
	return postWrapper;
}


//---- scrapers -----

function thread(post) {
	//scrape a thread identifier from a comment.
	var result =  document.evaluate(
		"descendant::a[@class='jcomHomeTitleLink']/@href",
		post, null, XPathResult.STRING_TYPE, null).stringValue;
    result = result.match(/\/journal\/(\d+)/) || result.match(/pid=(\d+)/);
    if (result) {
        result = result[1];
    }
    GM_log('_' + result);
	return result;
}

function date(post) {
	//scrape a date number from a comment. If no date found, then return 0.
	var value = document.evaluate("number(substring-before(substring-after(substring-after(descendant::script[1],'Date' ), '('),' '))",
		post, null, XPathResult.NUMBER_TYPE, null).numberValue;
	if (isNaN(value)) {
		value = 0;
	}
	return value;
}

function postlink(post) {
	//clone the post link from a post.
	return document.evaluate(
		"descendant::a[@class='jcomHomeTitleLink']",
		post, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
	).singleNodeValue.cloneNode(true);
}

//------ helpers ------

function uniq(list, cmp) {
	//Takes an optional ordering which is used for comparison and equality
	cmp = (typeof(cmp) != 'undefined') ? cmp : strcmp;
	sorted = list.sort(cmp);
	var b = [];
	if (sorted.length) {
		b.push(sorted.shift())
	}
	while (sorted.length) {
		var next = sorted.shift()
		if (cmp(next, b[b.length - 1])) {
			b.push(next);
		}
	}
	return b;

}

function strcmp(a, b) {
	if (a > b) {
		//GM_log(a + ' > ' + b);
		return 1;
	}
	if (a < b) {
		//GM_log(a + ' < ' + b);
		return -1;
	}
	//GM_log(a + ' = ' + b);
	return 0;
}


function map(fn, a) {
	var b = [];
	for (i = 0; i < a.length; i++) {
		b.push(fn(a[i]));
	}
	return b;
}

function e(name, attribs, children) {
	//make an element with some attributes and children.
	var r = document.createElement(name);
	for (var i in attribs) {
		r.setAttribute(i, attribs[i]);
	}
	for (var i = 0; i < children.length; i++) {
		r.appendChild(children[i]);
	} 
	return r;
}

function t(text) {
	//make a text node.
	return document.createTextNode(text);
}
