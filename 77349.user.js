// ==UserScript==
// @name           fix screen name
// @namespace      http://efcl.info/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
new function(doc){
    window.addEventListener("load",function(){
        var XPath = {
        cache: null,
        reset: function () {
            this.cache = {__proto__: null};
        },
        get: function (context, expr, type) {
            var x = new XPathEvaluator();
            var cache = this.cache, evaluator;
            if (expr in cache) {
                evaluator = cache[expr];
            } else {
                evaluator = cache[expr] = x.createExpression(expr, null);
            }
            return evaluator.evaluate(context, type, null);
        },
        has: function (context, expr) {
            return this.get(context, expr, XPathResult.BOOLEAN_TYPE).booleanValue;
        },
        first: function (context, expr) {
            return this.get(context, expr, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
        },
        last: function (context, expr) {
            var all = this.get(context, expr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
            return all.snapshotItem(all.snapshotLength - 1) || null;
        },
        all: function (context, expr) {
            var all = this.get(context, expr, XPathResult.ORDERED_NODE_ITERAATE_TYPE);
            var ret = [];
            for (var i; (i = all.iterateNext()) !== null;) {
                ret.push(i);
            }
            return ret;
        }
        };
        XPath.reset();
        var pageScreenName = XPath.first(doc,'//meta[@name="page-user-screen_name"]').content;
        var sessionScreenName = XPath.first(doc,'//meta[@name="session-user-screen_name"]').content;
        var title = XPath.first(doc,'id("page_title")').textContent;
        var reg = /^.*?\(([^\(]*?)\) on Twitter/ 
        var m = reg.exec(title);
        m = m && m[1];
        if(m == sessionScreenName){
            title.replace(reg , function(t ,name){
                document.title = title.replace(name , pageScreenName);
            })
        }
    } ,false);
}(document);