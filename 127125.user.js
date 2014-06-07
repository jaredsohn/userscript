// ==UserScript==
// @name TV-Links.eu faster sorting
// @namespace http://userscripts.org/users/409923
// @description TV-Links.eu faster sorting 
// @include        http://www.tv-links.eu/myaccount.html*
// @match		   http://www.tv-links.eu/myaccount.html*
// @Author
// @version 1.1
// ==/UserScript==

var win = unsafeWindow,
	doc = win.document;

function decompileFn(fn) {
	var fn = fn.toString(),
		m = fn.match(/function\s+([a-z0-9\_]+)\((.*)\)\s*{([\r\n\s\S]*)}/i),
		name = m[1],
		args = m[2].split(/\s*,\s*/),
		body = m[3];
	
	return {
		'name': name,
		'args': args,
		'body': body
	};
}
function compileFn(data) {
	var fn = null;
	eval('fn = (function ' + data.name + '(' + data.args.join(', ') + '){' + data.body + '});');
	return fn;
}

(function () {
	
	var sendActionParts = decompileFn(win.sendAction);
	sendActionParts.args.push('stateChanged');
	
	win._sendAction = compileFn(sendActionParts);
	
	win.sendAction = function (action, loadInDiv, disableItems, formName, formParams, otherParams) {
		
		if (action == 'u11' && otherParams && otherParams[0] == 'sub') {
			if (moveItem(otherParams[1], otherParams[2])) {
				win._sendAction(action, loadInDiv, disableItems, formName, formParams, otherParams, function () {});
				return false;
			}
		}
		
		return win._sendAction(action, loadInDiv, disableItems, formName, formParams, otherParams, stateChanged);
	};
	
})();


function nextSibling (node) {
	node = node.nextSibling;
	while(node && node.nodeType != 1) node = node.nextSibling;
	return node;
}
function prevSibling (node) {
	node = node.previousSibling;
	while(node && node.nodeType != 1) node = node.previousSibling;
	return node;
}
function insert(node, reference, place) {
	if (place == 'before') {
		reference.parentNode.insertBefore(node, reference);
	} else if (place == 'after') {
		var next = nextSibling(reference);
		if (next) {
			reference.parentNode.insertBefore(node, next);
		} else {
			reference.parentNode.append(node);
		}
	}
}

function moveItem(id, dir) {
	var node = doc.getElementById('subs_' + id).parentNode,
		sibling = null;
	
	if (!node) return;
	
	if (dir == 2) {
		//Down
		sibling = nextSibling(node);
		if (sibling) {
			insert(node, sibling, 'after');
			return true;
		}
	} else {
		//Up
		sibling = prevSibling(node);
		if (sibling) {
			insert(node, sibling, 'before');
			return true;
		}
	}
	
	return false;
}