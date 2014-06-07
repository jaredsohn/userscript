// Reddit quickreply 1.1

// ==UserScript==
// @name          	Reddit quickreply
// @namespace     	http://determinist.org/greasemonkey/
// @description   	Replies to comment without reloading page. Version 1.1
// @include       	http://reddit.com/info/*/comments*
// @include       	http://*.reddit.com/info/*/comments*

// ==/UserScript==

/*

Changelog:

2006-08-14	1.1
* Now fake inserts the new comment
* Added support for quickediting

2006-08-11	1.0
* First release

*/

/*
BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/

function xpath(query, context, doc) {
	context = context ? context : document;
	doc = doc ? doc : document;
	
	return doc.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function foreachxp(xp, fc, context) {
	var els = xpath(xp, context);
	if (els) {
		for (var i = 0; el = els.snapshotItem(i); i++) {
			fc(el);
		}
	}
}

function xpathOne(query, context, doc) {
	context = context ? context : document;
	doc = doc ? doc : document;
	
	return doc.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

function $(id) {
	return document.getElementById(id);
}

/*
const sorting = {hot:0, 'new':1, top:2};
const style = {nested:0, flat:1};

var options = getOptions();
*/

foreachxp("//tr[starts-with(@id, 'reply')]//div[2] | //form[@id='commentform']/div[2]", function (el) {
	addCommentButton(el.firstChild, 'quickreply');
});

foreachxp("//tr[starts-with(@id, 'edit')]//div[2]", function (el) {
	addCommentButton(el.firstChild, 'quicksave');
});

function addCommentButton(before, text) {
	var btn = document.createElement('button');
	btn.setAttribute('class', 'btn');
	btn.innerHTML = text;
	btn.addEventListener('click', replyQuick, true);
	
	before.parentNode.insertBefore(btn, before);
}

/*function getOptions() {
	var options = new Object();
	var setOptions = xpath("//div[@class='sortbox']/ul/li/strong");
	options['sorting'] = sorting[setOptions.snapshotItem(0).textContent];
	options['style'] = style[setOptions.snapshotItem(1).textContent];
	return options;
}*/

function replyQuick(event) {
	event.stopPropagation();
    event.preventDefault();
	
	var trg = event.target;
	var frm = xpathOne("./ancestor::form[1]", trg);
	var id = xpathOne("./ancestor::div[1]/preceding-sibling::textarea/@id", trg).value;
	id = id.match(/comment(reply[0-9]+|edit[0-9]+|root)/)[1];
	
	if (!chkcomment(id)) 
		return;
	
	var params = serializeForm(frm);
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://' + location.host +'/comment',
		data: params,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Content-type' : 'application/x-www-form-urlencoded'
		},
		onload: function(responseDetails) {
			GM_log(responseDetails);
			
			if (responseDetails.status == 200) {
				$('err' + id).innerHTML = 'saved.';
				
				//get new id
				var newId, rt, renderedMessage;
				rt = responseDetails.responseText;
				
				//hide comment form if id isnt root
				if (id != 'root') {
					$(id).style.display = 'none';
				}
				
				insertFakeComment(id, rt);
			}
			else {
				$('err' + id).innerHTML = 'Something went wrong, error code: ' +  reponseDetails.status;
			}
			
		},
		onerror: function(responseDetials) {
			$('err' + id).innerHTML = 'Some thing went wrong, error code: ' +  reponseDetails.status;
		},
		onreadystatechange: function(rd) { 
			//animate
			$('err' + id).innerHTML += '.';
		}
	});
	
	$('err' + id).innerHTML = 'saving...';
    
}

function serializeForm(frm) {
	var paramArr = new Array();
	
	for (var i = 0; inp = frm.elements[i]; i++) {
		var name, val;
		if ((name = inp.getAttribute('name')) && (val = inp.value))
			paramArr.push(inp.getAttribute('name') + "=" + inp.value);
	}
	
	var str = paramArr.join('&');
	return str;
}


//borrowed from reddit source with permission
function chkcomment(id) {
    ta = $("comment" + id);
    err = $("err" + id);
    if (err.innerHTML != "") err.innerHTML = ""
    if (ta == null) {return false;}
    if (ta.style.color == "gray" || ta.value == "") {
        err.innerHTML = "enter a comment";
        ta.focus();
        return false;
    }
    else if (ta.value.length > 10000) {
        err.innerHTML = "comment is too long";
        ta.focus();
        return false;
    }
    else {
        if (err.innerHTML != "") err.innerHTML = ""
    }
    return true;
}


function insertFakeComment(replyToId, responseText) {
	//create hidden iframe to steal the new comment from
	var hiddenIFrame = document.createElement('iframe');
	hiddenIFrame.setAttribute('src', "about:blank");
	hiddenIFrame.style.display = 'none';
	document.body.appendChild(hiddenIFrame);
	
	responseText = responseText.replace(/<[\s]*\/?[\s]*html[\s]*>/g, ''); 
	hiddenIFrame.contentDocument.documentElement.innerHTML = responseText;
	
	
	//add quickbuttons
	var theReply = xpathOne("//div[starts-with(@id, 'table') and table[@class='commenttable border']]",
		hiddenIFrame.contentDocument, 
		hiddenIFrame.contentDocument);
	
	var buttonbar = xpathOne(".//tr[starts-with(@id, 'reply')]//div[2]",
		theReply, 
		hiddenIFrame.contentDocument);
	addCommentButton(buttonbar.firstChild, 'quickreply');
	
	buttonbar = xpathOne(".//tr[starts-with(@id, 'edit')]//div[2]",
		theReply, 
		hiddenIFrame.contentDocument);
	addCommentButton(buttonbar.firstChild, 'quicksave');
	
	
	//insert or replace
	if (replyToId.match(/^edit/)) {
		var replaceMe = $('table' + replyToId.replace('edit', ''));
		replaceMe.parentNode.replaceChild(theReply, replaceMe);
	}
	else {
		var insertBeforeMe;
		if (replyToId != 'root')
			insertBeforeMe = $('table' + replyToId.replace('reply', '')).nextSibling;
		else 
			insertBeforeMe = xpathOne("//div[starts-with(@id, 'table')]");
			
		insertBeforeMe.parentNode.insertBefore(theReply, insertBeforeMe);
	}
		
	document.body.removeChild(hiddenIFrame);
}
