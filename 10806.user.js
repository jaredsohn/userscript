// ==UserScript==
// @name           TargetBlank
// @namespace	  http://d.hatena.ne.jp/bluerabbit/
// @include        http://www.google.*/search*
// @include        http://search.hatena.ne.jp/search?*
// ==/UserScript==

(function() {

// -- [Main] --------------------------------------------------------------------------------------

var TARGET = {
	google: '//a[@target="nw"]',
	hatena: '//div[@class="hatena-search-result-item"]//h3//a[@href]',
	hatenaindent: '//div[@class="hatena-search-result-item indent"]//h3//a[@href]'
};

function main() {
	for( var index in TARGET ) {
		setTargetBlank($X(TARGET[index]));
	}
}
function setTargetBlank(items){
	log(items);
	for (var i = 0, len = items.length; i < len ; i++) {
		items[i].setAttribute('target','_blank');
	}
}
// -- [function] ----------------------------------------------------------------------

// Firefox log api
function log() {
	unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments));
}

function $X (exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
        var o = document.createNSResolver(context)(prefix);
        return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);

    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
        case XPathResult.STRING_TYPE : return result.stringValue;
        case XPathResult.NUMBER_TYPE : return result.numberValue;
        case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
            result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var ret = [];
            for (var i = 0, len = result.snapshotLength; i < len ; i++) {
                ret.push(result.snapshotItem(i));
            }
            return ret;
        }
    }
    return null;
}

// add event
window.addEventListener('load', function(){main();}, false);

})();