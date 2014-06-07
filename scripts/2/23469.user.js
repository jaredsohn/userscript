// ==UserScript==
// @name           google deny hatena
// @namespace      http://polog.org/
// @description    vanish google search result matched with regexp list
// @include        http://*google*
// ==/UserScript==

var DENY_LIST = [
    /hatena\.ne\.jp/
];

var $X = function (exp, context) {
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

var googleDeny = function(){
    $X('//div[@class="g"]').some(
        function(obj){
            if(typeof(obj.childNodes[1].firstChild.href) != 'undefined'){
                for(var i = 0; i < DENY_LIST.length ; i++){
                    if(obj.childNodes[1].firstChild.href.match(DENY_LIST[i])){
                        obj.style.display = 'none';
                        return false;
                    }
                }
            }
        }
    );
}
if(window.AutoPagerize)
        window.AutoPagerize.addFilter(googleDeny);
googleDeny();