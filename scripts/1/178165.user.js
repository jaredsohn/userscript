// ==UserScript==
// @name       Monstro links
// @description Convierte texto plano en links
// @include     *monstrochan.org*
// ==/UserScript==

//////////////////////////////////////////////////////////////////////....

var notInTags = [
	  'a', 'code', 'head', 'noscript', 'option', 'script', 'style',
	  'title', 'textarea'];
var textNodeXpath =
  	".//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]";
var urlRE = new RegExp(
    '('
    + '\\b([a-z][-a-z0-9+.]+://|www\\.)'
    + '[^\\s\'"<>()]+'
    + '|'
    + '\\b[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}\\b'
    + ')', 'gi');
var queue = [];

/******************************************************************************/

linkifyContainer(document.body);
document.body.addEventListener('DOMNodeInserted', function(event) {
    linkifyContainer(event.target);
}, false);

/******************************************************************************/

function linkifyContainer(container) {
	if (container.className && container.className.match(/\blinkifyplus\b/)) {
	  return;
	}

	var xpathResult = document.evaluate(
		  textNodeXpath, container, null,
		  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var i = 0;
	function continuation() {
		var node = null, counter = 0;
		while (node = xpathResult.snapshotItem(i++)) {
		  var parent = node.parentNode;
		  if (!parent) continue;

		  if ('PRE' == parent.tagName && parent.className) continue;
		  
			linkifyTextNode(node);

			if (++counter > 50) {
				return setTimeout(continuation, 0);
			}
		}
	}
	setTimeout(continuation, 0);
}

function linkifyTextNode(node) {
    var toRemove = [];
    var addtxt = '';
    var next;
    var current = node;
    while (true) {
        next = current.nextSibling;
        if (next == null) {
            break;
        }
        if (next.tagName != 'WBR') {
            break;
        }
        toRemove.push(next);
        next = next.nextSibling;
        if (next == null || next.nodeType != Node.TEXT_NODE) {
            toRemove.pop();
            break;
        }
        toRemove.push(next);
        addtxt += next.textContent;
        current = next;
    }
	var i, l, m;
	var txt = node.textContent + addtxt;
	var span = null;
	var p = 0;
	while (m = urlRE.exec(txt)) {
		if (null == span) {
			span = document.createElement('span');
			span.className = 'linkifyplus';
		}

		l = m[0].replace(/\.*$/, '');
		var lLen = l.length;

		span.appendChild(document.createTextNode(txt.substring(p, m.index)));

		a = document.createElement('a');
		a.className = 'linkifyplus';
		a.appendChild(document.createTextNode(l));
		if (l.indexOf(":/") < 0) {
			if (l.indexOf("@") > 0) {
				l = "mailto:" + l;
			} else {
				l = "http://" + l;
		  }
		}
		a.setAttribute('href', l);
		span.appendChild(a);

		p = m.index+lLen;
	}
	if (span) {

		span.appendChild(document.createTextNode(txt.substring(p, txt.length)));

		try {
            toRemove.forEach(function (n) { node.parentNode.removeChild(n); });
			node.parentNode.replaceChild(span, node);
		} catch (e) {
			console.error(e);
			console.log(node);
		}
	}
}