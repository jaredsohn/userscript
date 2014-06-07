// ==UserScript==
// @name           pime taradox
// @namespace      http://wakachan.org/unyl/
// @description    sorts posts in reply order
// @include        http://wakachan.org/*
// @include        http://*.wakachan.org/*
// @include        http://iichan.ru/*
// @include        http://*.iichan.ru/*
// @include        http://iichan.net/*
// @include        http://*.iichan.net/*
// @include        http://fgs221.appspot.com/*
// @include        http://fgs223.appspot.com/*
// @author         unylnonymous
// ==/UserScript==

var paddingUnit = 'em';
var nestingPadding = 1;
var maxPadding = 10;
var tailLength = 3; // number of "last replies"

var replyRegex = new RegExp('^\\s*&gt;&gt;(\\d+)$');

function insertAfter(referenceNode, newNode)
{
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function findReply(replyNumber) {
	var reply = document.getElementById('reply' + replyNumber);
	
	if (reply && reply.parentNode && reply.parentNode.parentNode && reply.parentNode.parentNode.parentNode) {
		return reply.parentNode.parentNode.parentNode;
	}
}

function replyPadding(replyNode) {
	var style = replyNode.getAttribute('style');
	if (!style) {
		return null;
	}

	var styles = style.split(';');

	for (var i = 0; i < styles.length; ++i) {
		var value = styles[i].split(':');
		if (value[0].replace(/^\s|\s$/g, '') == 'padding-left') {
			var groups = value[1].match(/^(\d+)/);
			if (groups) {
				return parseInt(groups[0]);
			}
		}
	}

	return null;
}

function addPadding(replyNode, parentPadding) {
	var desiredPadding = (parentPadding || 0) + nestingPadding;
	var padding = Math.min(desiredPadding, maxPadding);

	replyNode.setAttribute('style', 'padding-left:' + padding + paddingUnit + ';');
	return padding;
}

function nextElement(node) {
	var element = node;
	while (element) {
		element = element.nextSibling;
		if (element && element.nodeName != node.nodeName) {
			continue;
		}
		return element;
	}
}

function previousElement(node) {
	var element = node;
	while (element) {
		element = element.previousSibling;
		if (element && element.nodeName != node.nodeName) {
			continue;
		}
		return element;
	}
}

function findLastSibling(replyNode, requiredPadding) {
	var node = replyNode;
	while (node) {
		node = nextElement(node);
		if (node) {
			var padding = replyPadding(node);
			if (padding == null || padding < requiredPadding) {
				break;
			}
		}
	}

	if (node) {
		return previousElement(node);
	}
}

function replyNumber(reply) {
	var td = reply.getElementsByClassName('reply');
	if (td.length > 0) {
		var id = td[0].getAttribute('id');
		if (id) {
			var number = id.match(/.*?(\d+)$/i);
			if (number) {
				return number[1];
			}
		}
	}
}

function attachBackref(reply) {
	var span = reply.getElementsByClassName('reflink');

	if (span) {
		var number = replyNumber(reply);

		if (number) {
			var ref = document.createElement('a');
			ref.innerHTML = '[^]';
			ref.setAttribute('href', document.location.pathname + '#' + number);

			span[0].parentNode.insertBefore(ref, span[0].nextSibling);
		}
	}
}

function lastReplies(number) {
	var in_thread = window.location.pathname.match(/\/res\/\d+.html/i);
	var last_replies = [];

	if (in_thread) {
		var form = document.getElementById('delform');
		if (form) {
			var replies = form.getElementsByTagName('td');
			
			for (var i = replies.length - 1; i >= 0; --i) {
				if (replies[i].className != 'reply' && replies[i].className != 'highlight') {
					continue;
				}

				var td = replies[i];
				last_replies.unshift(td.parentNode.parentNode.parentNode);

				if (last_replies.length >= number) {
					break;
				}
			}

			return last_replies;
		}
	}
}

function removeVisibleReplies(replies) {
	if (!replies) {
		return;
	}

	var reordered = lastReplies(replies.length);
	for (var i = 0; i < reordered.length; ++i) {
		reordered[i] = replyNumber(reordered[i]);
	}

	for (var i = 0; i < replies.length; ++i) {
		if (reordered.indexOf(replyNumber(replies[i])) != -1) {
			replies.splice(i, 1);
			--i;
		}
	}

	return replies;
}

function copylast(replies) {
	replies = removeVisibleReplies(replies);

	if (!replies || replies.length < 1) {
		return;
	}

	var last_reply = lastReplies(1);
	last_reply = last_reply[0];

	var span = document.createElement('span');
	span.setAttribute('class', 'omittedposts');
	span.innerHTML = 'Last replies. Click [^] to view in thread.';
	
	var br = document.createElement('br');
	insertAfter(last_reply, br);
	insertAfter(br, span);

	for (var i = replies.length - 1; i >=0 ; --i) {
		var clone = replies[i].cloneNode(true);
		attachBackref(clone);
	
		clone.removeAttribute('style');
		insertAfter(span, clone);
	}
}

function firstLink(link) {
	return (!previousElement(link) 
	&& !previousElement(link.parentNode)); // <a> is usually nested in <p>, but <blockquote> might have more than one <p>
}

function loose() {
	var hrefs = document.getElementsByTagName('a');
	for (var i = 0; i < hrefs.length; ++i) {
		if (!firstLink(hrefs[i])) { // skip link which aren't in the very beginning of the reply
			continue;
		}

		var groups = hrefs[i].innerHTML.match(replyRegex);
		
		if (groups) {
			var replyTo = groups[1]; // reply(to) number
			var parent = findReply(replyTo); // reply's <table>

			if (parent) {		
				var comment = hrefs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; // parent's <table>
				var parentPadding = replyPadding(parent);

				var commentPadding = addPadding(comment, parentPadding);
				var lastSibling = findLastSibling(parent, commentPadding) || parent;

				insertAfter(lastSibling, comment);
			}
		}
	}
}

(function() { 
	
	var replies = lastReplies(tailLength);
	
	loose();
	copylast(replies);

})();

