// LJ Thread Unfolder
// version 0.5
// 2008-03-03
// Copyright (c) 2005-2008, Tim Babych
// Homepage: http://clear.com.ua/projects/firefox/unfolder
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "LJ Thread Unfolder", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          	LJ Thread Unfolder
// @description	Expands nested discussion threads in place
// @include      	http://*.livejournal.com/*
// ==/UserScript==

//================================
//	INIT
//================================

GM_compat()
add_unfolders(document)

GM_addStyle(
"a.unfold_thread {color: black; text-decoration:none} "+
"a.unfold_thread:hover {color: black; text-decoration:none} "+
"a.unfold_thread img { border:none; position: relative; top: 3px;}"
)


//================================
//	WORKHORSES
//================================

function add_unfolders(elem) {
	get_itemid_regexp = /thread=(\d+)/
	var allReplies
	allReplies = document.evaluate(
	    "//a[contains(@href, '?thread')]",
	    elem,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
		
	for (var i = 0; i < allReplies.snapshotLength; i++) {
		thisOne = allReplies.snapshotItem(i);
		
		if (thisOne.innerHTML == 'Parent')
			continue
		
		if (thisOne.nextSibling && thisOne.nextSibling.nextSibling && thisOne.nextSibling.nextSibling.innerHTML == 'Unfold')
			continue
		
		// the first child in td
		if (thisOne.parentNode.firstChild == thisOne || // just Unfold
			( thisOne.previousSibling && thisOne.previousSibling.previousSibling 
			&& thisOne.previousSibling.previousSibling.href ) ) { // Unfold all
						
			t = document.createTextNode(' - ')
			thisOne.parentNode.insertBefore(t, thisOne.nextSibling);

			params =  get_itemid_regexp.exec(thisOne.href)

			a = document.createElement('a')
			linktxt = document.createTextNode('Unfold')
			a.href = 'javascript:void(0)'
			if (thisOne.previousSibling) // 'All' mode
				a.setAttribute('all', true)
			a.setAttribute('thread_id', params[1])
			a.setAttribute('thread_href', thisOne.href)
			a.addEventListener("click", unfold_thread, false)
			a.appendChild(linktxt)
			t.parentNode.insertBefore(a, t.nextSibling)
		}
	}
}	

function unfold_thread() {
	this.className = 'unfold_thread'
	this.style.cursor = 'default'
	this.innerHTML = loader
	this.blur()
	elem = this

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: this.getAttribute('thread_href'),
	    onload: function(responseDetails) { parse_result(responseDetails.responseText) }
	    })
	    
	function parse_result(result){
		var dummy = document.createElement('DIV')
		dummy.style.display = 'none'
		document.body.appendChild(dummy)
		// the same one lives in new doc
		document.getElementById('ljcmt'+elem.getAttribute('thread_id')).id += '_old'
		dummy.innerHTML = result
		reply = document.getElementById('ljcmt'+elem.getAttribute('thread_id')) // ajaxed content including spans

/* 
//      expected DOM tree:

span
    table
        tbody
            tr (header) - optional
            tr
                td
                    img
                td
                    content
a
span
...
*/
		add_unfolders(dummy)

		// get cell
		td = elem

		while (td.nodeName != 'TD')
			td = td.parentNode
		tbody = td.parentNode.parentNode
		span = tbody.parentNode.parentNode

		my_padding = tbody.firstChild.firstChild.firstChild.width
		
		// add comments there
		while(reply && reply.nodeName != 'HR'){
			next_one = reply.nextSibling
			span.parentNode.insertBefore(reply, span)
			if (reply.nodeName == 'SPAN')
				reply.firstChild.firstChild.firstChild.firstChild.firstChild.width += my_padding
			reply = next_one
		}

		// remove nesting comments			
		next_comment = span.nextSibling.nextSibling.nextSibling
		while(next_comment && 
				next_comment.firstChild &&
				next_comment.firstChild.firstChild &&
				next_comment.firstChild.firstChild.firstChild &&
				next_comment.firstChild.firstChild.firstChild.firstChild &&
				next_comment.firstChild.firstChild.firstChild.firstChild.firstChild &&				
               (next_comment.firstChild.firstChild.firstChild.firstChild.firstChild.width > my_padding)) {
			to_del = next_comment
			next_comment = next_comment.nextSibling.nextSibling.nextSibling
			to_del.parentNode.removeChild(to_del)
		}
		document.body.removeChild(dummy)
		span.parentNode.removeChild(span)
	}	
	
}


//========================================
//	ROUTINES
//========================================
function GM_compat() {
	if ( typeof GM_xmlhttpRequest == 'undefined' ) 
		GM_xmlhttpRequest = function(params) {
			var req = new XMLHttpRequest()
			req.onreadystatechange =  function() {
					if (req.readyState != 4) return // while not Complete
					params.onload(req)
				}
			req.open(params.method, params.url, true)
			req.send("")
		}
		
	if ( typeof GM_addStyle == 'undefined' ) 
		GM_addStyle = function(css) {
			style = document.createElement('STYLE');
			style.type = 'text/css';
			style.innerHTML = css;
			document.body.appendChild(style);	
		}
}

loader = '<img src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYi'+
'IiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR'+
'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'+
'fySDhGYQdDWGQyUhADs="> Loading&hellip;'
