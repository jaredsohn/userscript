// ==UserScript==
// @name        linkazza
// @version     0.0.7
// @namespace   http://meh.schizofreni.co
// @description Turn plain text URLs into links.
// @updateURL   https://raw.github.com/meh/userscripts/master/linkazza.user.js
// @include     *
// ==/UserScript==

var exclude = [
	'a', 'head', 'noscript', 'option', 'script', 'style', 'title', 'textarea'
];

var xpath =
	'.//text()[not(ancestor::' + exclude.join(') and not(ancestor::') + ')]';

var regexes = [
	/\b([a-z][\-a-z9-9+.]+:\/\/|www\.)[^\s'"<>()]+/gi,
	/\b[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}\b/gi
];

var observer = new (this.MutationObserver || this.MozMutationObserver || this.WebKitMutationObserver)(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type == "childList") {
			for (let i = 0; i < mutation.addedNodes.length; i++) {
				linkazza(mutation.addedNodes[i]);
			}
		}
		else {
			linkazza(mutation.target);
		}
	});
});

observer.observe(document.body, { childList: true, characterData: true, subtree: true });
defer(linkazza, document.body);

function linkazza (node) {
	if (node.already_touched) {
		return;
	}

	if (node.nodeType == Node.ELEMENT_NODE) {
		if (node.className == 'linkazza') {
			return;
		}

		var i = 0;
		var result = document.evaluate(xpath, node, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		defer(interleave, function () {
			if (i >= result.snapshotLength) {
				return false;
			}

			linkazza(result.snapshotItem(i++));
		});

		return;
	}

	if (!node.textContent || !node.parentNode) {
		return;
	}
	
	var container;
	var text     = node.textContent;
	var position = 0;
	var wbrs     = [];
	
	// remove WBRs and merge text nodes into one, registering where in the text
	// position the WBRs should be repositioned
	while (node.nextSibling && node.nextSibling.nodeName == 'WBR') {
		wbrs.push(text.length);
		node.parentNode.removeChild(node.nextSibling);
		
		if (node.nextSibling && node.nextSibling.nodeType == Node.TEXT_NODE) {
			text += node.nextSibling.textContent;
			node.parentNode.removeChild(node.nextSibling);
		}
	}

	for (let i = 0, match; i < regexes.length; i++) {
		while ((match = regexes[i].exec(text))) {
			container = container || document.createElement('span');

			container.appendChild(touch(document.createTextNode(
				text.substring(position, match.index))));

			position = match.index;

			let link = match[0].replace(/\.*$/, '');
			let a    = document.createElement('a');

			a.className = 'linkazza';

			if (wbrs[0] && position < wbrs[0] && link.length + position > wbrs[0]) {
				let last_position = 0;
				let last_length   = 0;
				let last_wbr;

				while (wbrs[0] && position < wbrs[0] && position + link.length > wbrs[0]) {
					a.appendChild(touch(document.createTextNode(link.substr(
						last_position, wbrs[0] - position - last_length))));
					a.appendChild(document.createElement("WBR"));

					last_length   += link.substr(last_position, wbrs[0] - position - last_length).length;
					last_position  = wbrs[0] - position;
					last_wbr       = wbrs.shift();
				}

				if (last_wbr) {
					a.appendChild(touch(document.createTextNode(link.substr(last_wbr - position))));
				}
			}
			else {
				a.appendChild(touch(document.createTextNode(link)));
			}

			if (link.indexOf(':/') < 0) {
				if (link.indexOf('@') > 0) {
					a.setAttribute('href', 'mailto:' + link);
				}
				else {
					a.setAttribute('href', 'http://' + link);
				}
			}
			else {
				a.setAttribute('href', link);
			}

			position = match.index + link.length;

			container.appendChild(a);
		}
	}

	if (container) {
		if (wbrs[0]) {
			let last_position = position;
			let last_wbr;

			while (wbrs[0] && last_position < wbrs[0]) {
				container.appendChild(touch(document.createTextNode(text.substr(
					last_position, wbrs[0] - last_position))));
				container.appendChild(document.createElement("WBR"));

				last_position = wbrs[0];
				last_wbr      = wbrs.shift();
			}

			if (last_wbr) {
				container.appendChild(touch(document.createTextNode(text.substr(last_wbr))));
			}
		}
		else {
			container.appendChild(document.createTextNode(text.substring(position)));
		}

		while (container.firstChild) {
			node.parentNode.insertBefore(container.firstChild, node);
		}

		node.parentNode.removeChild(node);
	}
}

// this is used to defer the linkification when there's nothing to do
function defer (func) {
	if (arguments.length > 1) {
		var rest = Array.prototype.slice.call(arguments, 1);

		setTimeout(function () {
			func.apply(null, rest);
		}, 100);
	}
	else {
		setTimeout(func, 100);
	}
}

// this is used to interleave the executions, to avoid freezing the page
function interleave (func, times) {
	times = times || 50;

	for (let i = 0; i < times; i++) {
		if (func() === false) {
			return;
		}
	}

	defer(interleave, func, times);
}

function touch (dom) {
	dom.already_touched = true;
	
	return dom;
}

