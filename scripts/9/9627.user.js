// ==UserScript==
// @name           expertsexchange-decoder
// @namespace      http://vasco.flores.googlepages.com/
// @description    Decodes dumbasses answers
// @include        http://www.experts-exchange.com/*/Q_*.html
// ==/UserScript==

function forEachMatch(path, f, root) {
	var el;
	var root = (root == null) ? document : root;
	var matches = root.evaluate(path, root, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < matches.snapshotLength; i++) {
		f(matches.snapshotItem(i));
	}
}

function rot13(e) {
	var dst = ""
        var src = e.textContent
        len = src.length
	for(var ctr=0; ctr<len ; ctr++) {
		b=src.charCodeAt(ctr)
		if( ( (b>64) && (b<78) ) || ( (b>96) && (b<110) ) )
			b=b+13
    		else if( ( (b>77) && (b<91) ) || ( (b>109) && (b<123) ) )
			b=b-13
		t=String.fromCharCode(b) ;
		dst=dst.concat(t) ;
	}
	e.textContent=dst ;
}

forEachMatch('//div[@class="blur"] | //div[@class="signUpSpace"]',
function(l){ l.parentNode.removeChild(l);}
);

forEachMatch('//div[@class="answerBody quoted"]//text()', rot13);

