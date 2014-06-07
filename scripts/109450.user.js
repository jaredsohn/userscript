// ==UserScript==
// @name           google plus engelleyici
// @version        0.5.1.1
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://sozluk.sourtimes.org/*
// @include        http://www.eksisozluk.com/*
// @include        http://eksisozluk.com/*
// ==/UserScript==

function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

function googleeksi() {
	var paylas = xpath(".//div[@class='shd']");
	
	for (var i = 0; i < paylas.snapshotLength; i++) {
		var na = paylas.snapshotItem(i).childNodes;
		var _div = document.createElement('div');
		for(var j = 0; j < na.length; j++) 
		{
			if(na[j].nodeName == "A") {
				var _a = document.createElement('a');
				_a.href = na[j].href;
				_a.class = na[j].class;
				_a.target = na[j].target;
				_a.title = na[j].title;
				_a.innerHTML = na[j].innerHTML;
				_div.appendChild(_a);
			}
		}
		paylas.snapshotItem(i).innerHTML = " ";
		paylas.snapshotItem(i).innerHTML = _div.innerHTML;
	}
}
if (window.location.href.match(/\/show\.asp/)) {
            googleeksi();
        }
