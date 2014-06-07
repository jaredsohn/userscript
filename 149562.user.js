// ==UserScript==
// @name        AN old items
// @namespace   http://forum.audionews.org
// @include     http://forum.audionews.org/tracker.php*
// @description	Disables re-registered and old items from being shown in the list
// @version     1.2
// @run-at	document-start
// @updateURL	https://userscripts.org/scripts/source/149562.meta.js
// @downloadURL	https://userscripts.org/scripts/source/149562.user.js
// ==/UserScript==

var spanElements, spanElement;
var isLoaded;
var traverses = 0;

var getElementsByClassName = document.getElementsByClassName ?
        function (className, tag, elm) {
                var nodeElm = elm && elm.getElementsByClassName ? elm : document,
                        elements = nodeElm.getElementsByClassName(className),
                        nodeName = tag ? new RegExp("\\b" + tag + "\\b", "i") : null,
                        rElements = [],
                        i = 0, l = elements.length,
                        current;
                for (; i < l; i++) {
                        current = elements[i];
                        if (!nodeName || nodeName.test(current.nodeName)) {
                                rElements.push(current);
                        }
                }
                return rElements;
        } : document.querySelectorAll ?
        function (className, tag, elm) {
                var elements = (elm || document).querySelectorAll((tag || "") + "." + className.split(" ").join(".")),
                        rElements = [], 
                        i = 0, l = elements.length;
                for (; i < l; i++) {
                        rElements.push(elements[i]);
                }
                return rElements;
        } : document.evaluate ?
        function (className, tag, elm) {
                var classes = className.split(" "),
                        classesToCheck = "",
                        rElements = [],
                        i = 0, l = classes.length, 
                        elements, node;
                for(; i < l; i++){
                        classesToCheck += "[contains(concat(' ', normalize-space(@class), ' '), ' " + classes[i] + " ')]";
                }
                elements = document.evaluate(".//" + (tag || "*") + classesToCheck, (elm || document), null, 0, null);
                while (node = elements.iterateNext()) {
                        rElements.push(node);
                }
                return rElements;
        } :
        function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                        classesToCheck = [],
                        elements = tag == "*" && elm.all ? elm.all : elm.getElementsByTagName(tag),
                        rElements = [],
                        i = j = 0, 
                        il = classes.length, 
                        jl = elements.length,
                        current, match, k, kl;
                for (; i < il; i++) {
                        classesToCheck.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
                }
                kl = classesToCheck.length;
                for (; j < jl; j++) {
                        current = elements[j];
                        match = false;
                        for (k = 0; k < kl; k++) {
                                match = classesToCheck[k].test(current.className);
                                if (!match) {
                                        break;
                                }
                        }
                        if (match) {
                                rElements.push(current);
                        }
                }
                return rElements;
        };


contentLoaded((typeof(unsafeWindow) == 'undefined' ? window : unsafeWindow), function (e) {
	isLoaded = true;
});

(function traverse() {
	try {
		if (tableElement = getElementsByClassName('tabl', 'table', document)[0]) {
			if (
				(headerElements = getElementsByClassName('menu', 'td', tableElement)) &&
				(headerYear = headerElements[headerElements.length - 1].innerHTML.match(/\d+-[a-z]+-(\d{2})/i)) != null
			)
				headerYear[1];

			searchText = (document.getElementsByName('nm')[0]) ? document.getElementsByName('nm')[0].value : null;

			if (
				searchText &&
				(pageSpanElement = getElementsByClassName('nav', 'span', tableElement)[1]) &&
				(pageLinkElements = pageSpanElement.getElementsByTagName('a'))
			) {

				for (var i = 0; i < pageLinkElements.length; i++) {
					pageLinkElement = pageLinkElements[i];
					pageLinkElement.href = pageLinkElement.href.replace(/\?search_id/, "\?nm=" + encodeURIComponent(searchText.replace(/&amp;/g, "&")) + "&search_id");
				}
			}

			spanElements = tableElement.getElementsByTagName('span');

			for (var i = 0; i < spanElements.length; i++) {
				spanElement = spanElements[i];

				if (
					searchText === "" && // tracker browse
					spanElement.title == 'Torrent Type' &&
					spanElement.firstChild &&
					spanElement.firstChild.alt == 'ReRegistered'
				) {
					spanElement.parentNode.parentNode.parentNode.parentNode.removeChild(spanElement.parentNode.parentNode.parentNode);
					i--;
				} else if (
					searchText === "" && // tracker browse
					!isNaN(headerYear[1]) &&
					((year = spanElement.innerHTML.match(/\[\d+\.\d+\.\d{2}(\d{2})\]/)) != null) &&
					(year[1] < headerYear[1] - 1)
				) {
//					spanElementWrapper.style.display = "none";
					spanElement.parentNode.parentNode.parentNode.removeChild(spanElement.parentNode.parentNode);
					i--;
				}
			}
		}
	} catch(e) { };

        traverses++;
	if (traverses < 200 && !isLoaded)
		setTimeout(traverse, 100);
})();





function contentLoaded(win, fn) {

	var done = false, top = true,

	doc = win.document, root = doc.documentElement,

	add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
	rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
	pre = doc.addEventListener ? '' : 'on',

	init = function(e) {
		if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
		(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
		if (!done && (done = true)) fn.call(win, e.type || e);
	},

	poll = function() {
		try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
		init('poll');
	};

	if (doc.readyState == 'complete') fn.call(win, 'lazy');
	else {
		if (doc.createEventObject && root.doScroll) {
			try { top = !win.frameElement; } catch(e) { }
			if (top) poll();
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		win[add](pre + 'load', init, false);
	}
}


