// ==UserScript==
// @name             AmebaVision easy page switcher
// @namespace        http://www.moaikids.net/
// @include          http://vision.ameba.jp/search/*
// @include          http://vision.ameba.jp/ucs/upload/userlist.do*
// @include          http://vision.ameba.jp/ucs/favorite/list.do*
// @include          http://vision.ameba.jp/ucs/comment/list.do*
// @version          1.00
// ==/UserScript==

function main() {
	var back = $X("//img[@alt='BACK']/parent::a")[0];
	var next = $X("//img[@alt='NEXT']/parent::a")[0];

	if(back){
		document.addEventListener(
			"keydown", 
			function(e){
				//ctrl + <- key or ctrl + z key
				//before page
				if(e.ctrlKey && (e.keyCode == 37 || e.keyCode == 90)){
					location.href = back;
				}
			}, 
			true);
	}

	if(next){
		document.addEventListener(
			"keydown", 
			function(e){
				//ctrl + -> key or ctrl + x key
				//next page
				if(e.ctrlKey && (e.keyCode == 39 || e.keyCode == 88)){
					location.href = next;
				}
			}, 
			true);
	}
}

/**
 * XPath utility logic
 * special thanks this site -> http://lowreal.net/
 * @Reference URI http://lowreal.net/logs/2006/03/16/1
 * @Tags xpath js
 */
$X = function (exp, context) {
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


main();


