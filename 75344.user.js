// ==UserScript==
// @name           togetter plainStyle
// @namespace      http://efcl.info/
// @description    デコレーションを解除する
// @include        http://togetter.com/li/*
// @run-at         document-end
// ==/UserScript==
GM_addStyle(String(<>
    <![CDATA[
.favorite_box{
    display:none;
}
]]></>));
var ss = (function(ss) {
    var dss = document.styleSheets;
    var getRule = function(stylesheet) {
        return stylesheet.cssRules ? stylesheet.cssRules : stylesheet.rules;
    }
    // 全てのcssRuleに対して、iteratorを処理する
    var forEachRule = function(iterator) {
        var some = Array.some;

        return some(document.styleSheets, function (styleSheet) {
            var Rules = getRule(styleSheet);
            for (var i = Rules.length - 1; 0 <= i; i--) {
                var cssRule = Rules[i];
                iterator.call(styleSheet, cssRule, i, Rules);
            }
        });
    }
    var deleteRule = function(matchSelector) {
        var skipMatchTest = false;
        // 引数なし or * の場合、全てのruleを削除する
        if (!matchSelector || matchSelector === "*") {
            skipMatchTest = true;
        } else if (typeof matchSelector === "string") {
            matchSelector = new RegExp("^" + matchSelector + "$", "i");
        }
        // iteratorを作りcssRuleごとに処理させる
        var iterator = function(cssRule, idx, sheet) {
            var selectorText = cssRule.selectorText;
            if (!selectorText) { // @importなどは無視
                return;
            }
            var stylesheet = this;
            if (skipMatchTest || matchSelector.test(selectorText)) {
                //console.log(stylesheet, selectorText, cssRule, idx);
                stylesheet.deleteRule(idx);
            }
        }
        forEachRule(iterator);
    }
    return {
        deleteRule : deleteRule
    }
})(ss || {});
// 文字装飾のCSSスタイルルールを削除する
ss.deleteRule(/\.[fc]\d{2}/i);
