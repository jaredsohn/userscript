// LJ Thread Unfolder
// version 0.2
// 2005-08-23
// Copyright (c) 2005, Tim Babych
// Homepage: http://clear.com.ua/projects/firefox/unfolder
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// Branched 2006-09-09 by Henrik Nyh <http://henrik.nyh.se>
// Added "Unfold all".

// ==UserScript==
// @name			LJ Thread Unfolder with "Unfold all" 
// @namespace		http://clear.com.ua/projects/firefox/unfolder+http://henrik.nyh.se
// @description		Expands nested discussion threads in place.
// @include			http://*.livejournal.com/*
// ==/UserScript==


var unfoldNodes = [];

function unfold_all() {
	unfoldNodes.forEach(unfold_thread);
}

var threadIdRE = /thread=(\d+)/;
var allReplies = $x("//td/a[contains(@href, '?thread')]");

allReplies.forEach(function(thisReplyLink) {
	t = document.createTextNode(' - ');
	thisReplyLink.parentNode.insertBefore(t, thisReplyLink.nextSibling);

	var threadId = thisReplyLink.href.match(threadIdRE)[1];

	a = document.createElement('A');
	with (a) {
		innerHTML = "Unfold";
		href = 'javascript:void(0)';
		addEventListener("click", unfold_click, false)
		setAttribute('thread_id', threadId);
		setAttribute('thread_href', thisReplyLink.href);
	}
	t.parentNode.insertBefore(a, t.nextSibling);
	unfoldNodes.push(a);

	d = document.createElement('div');
	d.style.display = 'none';
	d.id = 'thread_unfolder_temp_div_' + threadId;
	document.body.appendChild(d);
});
	

GM_addStyle(
	"a.unfold_thread {color:black; text-decoration:none; cursor:default; } " +
	"a.unfold_thread:hover {color:black; text-decoration:none; }" +
	"a.unfold_thread img { border:none; }"
);

// Inject "Unfold all" links

if (!unfoldNodes.length)
	return;
	
$x("//a[contains(@href, '?mode=reply')]/ancestor::b").forEach(function(b) {
	
	var comma = document.createTextNode(', ');
	b.appendChild(comma);
	
	var newA = document.createElement("A");
	with (newA) {
		innerHTML = "Unfold all";
		href = "javascript:void(0)";
		addEventListener("click", unfold_all, false);
	}
	
	b.appendChild(newA);
	b.insertBefore(newA, newA.previousSibling.previousSibling);
	b.insertBefore(comma, comma.previousSibling.previousSibling);
	
});


//	Workhorses

function unfold_click() {
	unfold_thread(this);
}

function unfold_thread(link) {	
	
	with (link) {
		className = 'unfold_thread';
		innerHTML = loader;
		blur();		
	}
	elem = link;
	
	// Closure yo!
	(function(elem) {

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: link.getAttribute('thread_href'),
	    onload: function(responseDetails) {
		
			dummy = document.getElementById('thread_unfolder_temp_div_'+elem.getAttribute('thread_id'));
			dummy.innerHTML = responseDetails.responseText;
			reply = document.getElementById('ljcmt'+elem.getAttribute('thread_id'));
			
			try {  // If we fail, fail silently
			
				// get cell
				td = elem;
				while (td.nodeName != 'TD')
					td = td.parentNode;

				//cleanse cell
				while(td.firstChild)
					td.removeChild(td.firstChild);
										
				// remove nesting comments			
				tbody = td.parentNode.parentNode;
				my_padding = tbody.firstChild.firstChild.firstChild.width;
			

				next_comment = tbody.parentNode.nextSibling.nextSibling.nextSibling;
				while(next_comment && 
						next_comment.firstChild &&
						next_comment.firstChild.firstChild &&
						next_comment.firstChild.firstChild.firstChild &&
						next_comment.firstChild.firstChild.firstChild.firstChild &&
						(next_comment.firstChild.firstChild.firstChild.firstChild.width > my_padding)) {
					to_del = next_comment;
					next_comment = next_comment.nextSibling.nextSibling.nextSibling;
					to_del.parentNode.removeChild(to_del);
				}

				// add comments there
				while(reply && reply.nodeName != 'HR') {
					next_one = reply.nextSibling;
					td.appendChild(reply);
					reply = next_one;			
				}
			} catch(e) {}
						
			dummy.innerHTML = '';
			
		}
	});
	
	})(elem);
}

//========================================
//	ROUTINES
//========================================

loader = '<img src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYi'+
'IiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR'+
'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'+
'fySDhGYQdDWGQyUhADs="> Loading...'


/* Staple functions */

function $(id) { return document.getElementById(id); }
function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
