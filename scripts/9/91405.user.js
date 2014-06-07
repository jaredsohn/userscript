// ==UserScript==
// @name           goodbye japanese
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://*
// @include        https://*
// @version        0.0.3
// @date           201011292336
// ==/UserScript==

// 需要
// http://q.hatena.ne.jp/1290824114
// 参考
// http://d.hatena.ne.jp/amachang/20090113/1231818890
// 漢字判定
// http://tama-san.com/?p=196
/*
正規表現メモ
/[ー、。]|[ぁ-ヶ]|[々〇\u303B\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]/
上のを16進にしたもの
/[\u30FC\u3001\u3002]|[\u3041-\u30F6]|[\u3005\u3007\u303B\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]/
その他、全角のひらがなカタカナ、漢字 で構成されている。

ー: \u30FC
、: \u3001
。: \u3002
ぁ: \u3041
ヶ: \u30F6
々: \u3005
〇: \u3007
漢字の踊り字: \u303B
*/


(function() {
    translateChildren(document.body);
    document.addEventListener('DOMNodeInserted', listener, false);
    document.addEventListener('DOMCharacterDataModified', listener, false);
    document.addEventListener('DOMAttrModified', function(e) {
        var node = e.target;
        if (node.tagName === 'INPUT' || node.tagName === 'OPTION') translate(node);
    }, false);

    function listener(e) {
        translate(e.target);
    }

    function translate(node) {
        var type = node.nodeType;
        if (type === 1) {
            if (node.tagName === 'INPUT' || node.tagName === 'OPTION')
                translateProperty(node, 'value');
            else
                translateChildren(node);
        } else if(type === 3) {
            translateProperty(node, 'nodeValue');
        }
    }

    function translateChildren(node) {
        var xpath = './/text() | .//input | .//option';
        var r = document.evaluate(xpath, node, null, 7, null);
        for (var i = 0, n = r.snapshotLength; i < n; i ++) translate(r.snapshotItem(i));
    }

    function translateProperty(node, prop) {
        var value = node[prop];
        if (!value || /^\s*$/.test(value)) return;
        node[prop] = gbj(value);
    }

    function gbj(str) {
        var result = "";
        var re = /[\u30FC\u3001\u3002]|[\u3041-\u30F6]|[\u3005\u3007\u303B\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]/;
        for(var i = 0, n = str.length; i < n; i++) {
            if(re.test(str[i])) {
                result += ".";
            } else {
                result += str[i];
            }
        }
        return result;
    }
})();