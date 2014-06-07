// ==UserScript==
// @name           eksi sozluk paylas butonu engelleyici
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


function paylaskaldir() {

		var paylassub = xpath(".//div[@class='shd']");
		for(var j=0; j<paylassub.snapshotLength ; j++) 
		{
			var nsub = paylassub.snapshotItem(j); 
			nsub.parentNode.removeChild(nsub);
		}

		var paylas = xpath(".//div[@class='entrymenu']/table/tbody");
		for(var i = 0; i< paylas.snapshotLength; i++) 
		{
			var ntr = paylas.snapshotItem(i).firstChild;
			var ntdlist = ntr.childNodes;
			if(ntdlist[2].innerHTML.match(/payla/)) 
				var ntd = ntdlist[2];
			else 
				var ntd = ntdlist[8];
			ntd.parentNode.removeChild(ntd);
		}

}

if (window.location.href.match(/\/show\.asp/)) {
            paylaskaldir();
        }
