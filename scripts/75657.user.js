/*  bk1_to_amazon
 *  
 *                                                Copyright Seaoak, 2009-2011
 *                                           http://seaoak.cocolog-nifty.com/
 *  
 ***************************************************************************/

// ==UserScript==
// @name bk1_to_amazon
// @version 1.2.0.0
// @description insert a link for Amazon into bk1
// @type SleipnirScript
// @namespace http://seaoak.cocolog-nifty.com/
// @include http://www.bk1.jp/product/*
// ==/UserScript==

(function() {

/*==========================================================================*/
/* Utilities                                                                */
/*==========================================================================*/

function arrayEach(func, list) {
	if (! func) throw 'arrayEach(): invalid argument';
	if (! list) return;
	if (list.length === undefined) throw 'arrayEach(): invalid argument';

	var targets = toArray(list);

	for (var i=0; i<targets.length; i++) {
		func(targets[i]);
	}
}

function arrayFilter(func, list) {
	if (! func) throw 'arrayFilter(): invalid argument';
	if (! list) return;
	if (list.length === undefined) throw 'arrayFilter(): invalid argument';

	var length = list.length;	// cache
	var result = [];
	for (var i=0; i<length; i++) {
		if (func(list[i])) result.push(list[i]);
	}
	return result;
}

function toArray(list) {
	if (! list) return [];
	if (list.length === undefined) throw 'toArray(): invalid argument';

	var length = list.length;
	var result = [];
	for (var i=0; i<length; i++) {
		result.push(list[i]);
	}
	return result;
}

function removeGarbage(target) {
	if (! target) return;

	if (! target.nodeType) {
		if (target.length === undefined) throw 'removeGarbage(): invalid argument';
		arrayEach(removeGarbage, toArray(target));
	} else if (target.nodeType == 1) {
		var tag = target.nodeName.toLowerCase();
		if ((tag == 'table') ||
			(tag == 'colgroup') ||
			(tag == 'thead') ||
			(tag == 'tfoot') ||
			(tag == 'tbody') ||
			(tag == 'tr') ||
			(tag == 'ul') ||
			(tag == 'ol') ||
			(tag == 'dl') ||
			(tag == 'head') ||
			(tag == 'select') ||
			(tag == 'optgroup') ||
			(tag == 'hgroup') ||
			false) {
			removeGarbage(target.childNodes);
		}
	} else {
		target.parentNode.removeChild(target);
	}
}

function getElementsByClassName(dom, className) {
	if (! dom) throw 'getElementsByClassName(): invalid argument';
	if (! className) throw 'getElementsByClassName(): invalid argument';

	if (dom.nodeType) {
		var xpathQuery = "//*[contains(@class, '" + className + "')]";
		if (dom.getElementsByClassName) {
			return dom.getElementsByClassName(className);
		} else if (dom.selectNodes) {
			return dom.selectNodes(xpathQuery);
		} else if (dom.evalute && XPathResult) {
			var result = dom.evaluate(xpathQuery);
			if (! result) {
				throw 'getElementsByClassName(): evaluate() failed';
			} else if ((result.resultType == XPathResult.UNORDERED_NODE_ITERATOR_TYPE) || (result.resultType == XPathResult.ORDERED_NODE_ITERATOR_TYPE)) {
				var list = [];
				while (true) {
					var elem = result.iterateNext();
					if (! elem) break;
					list.push(elem);
				}
				return list;
			} else if ((result.resultType == XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE) || (result.resultType == XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)) {
				var list = [];
				for (var i=0; i<result.snapshotLength; i++) {
					list.push(result.snapshotItem(i));
				}
				return list;
			} else if ((result.resultType == XPathResult.ANY_UNORDERED_NODE_TYPE) || (result.resultType == XPathResult.FIRST_ORDERED_NODE_TYPE)) {
				if (result.singleNodeValue) {
					return [result.singleNodeValue];
				} else {
					return [];
				}
			} else {
				throw 'getElementsByClassName(): unexpected XPath result';
			}
		} else {
			throw 'getElementsByClassName(): not supported';
		}
	} else if (dom.length !== undefined) {
		var regexp = new RegExp('(^|\\s)' + className + '(\\s|$)');
		return arrayFilter(function(elem) {
			return elem && elem.className && regexp.test(elem.className);
		}, dom);
	} else {
		throw 'getElementsByClassName(): invalid argument';
	}
}

/*==========================================================================*/
/* Prologue                                                                 */
/*==========================================================================*/

var _win;
var _doc;

if (typeof(sleipnir) == 'object') {
	_win = _window;
	_doc = _document;
} else {
	_win = window;
	_doc = document;
}

/*==========================================================================*/
/* calculate ISBN check-digit                                               */
/*==========================================================================*/

// see http://ja.wikipedia.org/wiki/ISBN

function calcCheckDigit(code) {
	if (! code) throw 'calcCheckDigit(): invalid argument';
	if (code.length != 9) throw 'calcCheckDigit(): invalid code length';
	var list = code.split('').concat('\0', '\0');
	list.reverse();
	var sum = 0;
	for (var i=10; i>=2; i--) {
		sum += i * list[i];
	}
	var value = (11 - (sum % 11)) % 11;
	var checkDigit = (value == 10) ? 'X' : value;
	return '' + checkDigit;
}

/*==========================================================================*/
/* Main routine                                                             */
/*==========================================================================*/

(function() {
	if (! _win.location.href.match(/^http:\/\/www\.bk1\.jp\/product\/\d+(\?\S*)?$/)) return;

	var isBookPage = (function() {
		var genreElem = getElementsByClassName(_doc.getElementsByTagName('ul'), 'uList06')[0];
		if (! genreElem) return false;
		var anchorElem = genreElem.getElementsByTagName('a')[0];
		if (! anchorElem) return false;
		return anchorElem.href == 'http://www.bk1.jp/books/';
	})();
	if (! isBookPage) return;

	var tableElem = getElementsByClassName(_doc.getElementsByTagName('table'), 'tbl03')[0];
	if (! tableElem) return;

	removeGarbage(tableElem);

	if (tableElem.childNodes[0].nodeName.toLowerCase() != 'thead') return;
	if (tableElem.childNodes[0].childNodes[0].nodeName.toLowerCase() != 'tr') return;
	if (tableElem.childNodes[0].childNodes[0].childNodes[1].nodeName.toLowerCase() != 'th') return;
	if (tableElem.childNodes[0].childNodes[0].childNodes[1].innerHTML != 'ISBN') return;

	if (tableElem.childNodes[1].nodeName.toLowerCase() != 'tbody') return;
	if (tableElem.childNodes[1].childNodes[0].nodeName.toLowerCase() != 'tr') return;
	if (tableElem.childNodes[1].childNodes[0].childNodes[1].nodeName.toLowerCase() != 'td') return;

	var matching = tableElem.childNodes[1].childNodes[0].childNodes[1].innerHTML.match(/^(\s|\u3000)*([-0-9X]+)(\s|\u3000)*$/);
	if (! matching) return;

	var isbn = matching[2].replace(/-/g, '');

	var code10 = (function() {
		if (isbn.match(/^[0-9]{9}[0-9X]$/)) {
			return isbn;
		} else if (isbn.match(/^[0-9]{12}[0-9X]$/)) {
			var code9 = isbn.substring(3, 12);
			return code9 + calcCheckDigit(code9);
		} else {
			throw 'unexpected ISBN code';
		}
	})();

	var url = 'http://www.amazon.co.jp/dp/' + code10 + '/';
	
	var newElem = (function() {
		var elem = _doc.createElement('p');
		elem.innerHTML = '<a href="' + url + '" target="_blank">=&gt; Amazon</a>';
		return elem;
	})();

	tableElem.parentNode.insertBefore(newElem, tableElem);
})();

/*==========================================================================*/
})();
