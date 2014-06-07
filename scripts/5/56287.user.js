// ==UserScript==
// @name           Abe
// @namespace      http://www.abebooks.co.uk/servlet/SearchResults/
// @include        http://www.abebooks.co.uk/servlet/SearchResults*
// ==/UserScript==

function getPrice(text) {
    var match = /£ (\S+)/(text);
    return match == null ? 0 : parseFloat(match[1]);
}

function getTotal(result) {
    var actualPText = result.getElementsByClassName("price")[0].textContent;
    var shippingPText = result.getElementsByClassName("shipping")[0].textContent;
    return getPrice(actualPText) + getPrice(shippingPText);
}

function sortFunction (a, b) {
    return getTotal(a) - getTotal(b);
}

function makeArray (els) {
    var newArr = new Array(els.length);

    for (var i = 0; i < els.length; i++) {
	newArr[i] = els[i];
    }

    return newArr;
}

function reArrange () {
    var results = makeArray(document.getElementsByClassName("result"));
    var cur;
    var parent;

    for (var i = 0; i < results.length; i++) {
	cur = results[i];
	if (i == 0) {
	    parent = cur.parentNode;
	    parent.style.display = "none";
	}

	parent.removeChild(cur);
    }
    
    results.sort(sortFunction);
    
    for (var i = 0; i < results.length; i++) {
	parent.appendChild(results[i]);
    }
    parent.style.display = "";
}

reArrange();
