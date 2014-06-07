// ==UserScript==
// @name           YCReply
// @namespace      http://www.redokapi.com
// @description    enables comment replies in-thread instead of on a separate page
// @include        http://news.ycombinator.com/item*
// @include        http://news.ycombinator.com/threads*
// ==/UserScript==

if (!GM_xmlhttpRequest) {
    alert('YCArrows requires version Greasemonkey 0.2.6 or later.');
    return;
}

function map(fn, seq) {
	var a = new Array(seq.length);
	for(var i = 0; i < seq.length; i++) {
		a[i] = fn(seq[i]);
	}
	return a;
}

function filter(fn, seq) {
	var a = new Array();
	for(var i = 0; i < seq.length; i++) {
		if(fn(seq[i])) {
			a.push(seq[i]);
		}
	}
	return a;
}

function parentOf(e, depth) {
	if(depth <= 1)
		return e.parentNode;
	else
		return parentOf(e.parentNode, depth-1);
}

function constructReplyRow(formtext) {
	var tr = document.createElement('tr');
	tr.appendChild(document.createElement('td'));
	tr.appendChild(document.createElement('td'));
	var td = document.createElement('td');
	td.innerHTML = formtext;
	tr.appendChild(td);
	return tr;
}

var cancelHandler = function(event) {
	var repltr = parentOf(event.target, 6);
	repltr.parentNode.removeChild(repltr);
	event.preventDefault();
}

var clickHandler = function(event) { 
	GM_xmlhttpRequest({
		method: 'GET',
		url: event.target.href,
		onload: function(responseDetails) {
			var formHTML = responseDetails.responseText.match(/<form.*<\/form>/)[0];
			formHTML = formHTML.replace(/<\/form>/, '&nbsp;&nbsp;<font size=1><u><a href="">Cancel</a></form></u></font>');
			var tbody = parentOf(event.target, 6);
			var repltr = constructReplyRow(formHTML);
			var cancela = repltr.getElementsByTagName('a')[0];
			cancela.addEventListener('click', cancelHandler, true);
			tbody.appendChild(repltr);
			cancela.scrollIntoView(false);
		}
	});
	event.preventDefault();
};

var reply_anchors = 
filter(function(a) {
	return (a.textContent && a.textContent == "reply"); 
}, document.getElementsByTagName('a'));

map(function(a) {
	a.addEventListener('click', clickHandler, true);
    }, reply_anchors);