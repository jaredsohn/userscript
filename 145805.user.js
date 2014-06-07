// ==UserScript==
// @name       GCC Number Replacer
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://gcc.sp.mbga.jp/*
// @copyright  2012+, You
// ==/UserScript==
(function () {
    function replaceNumber(txt){
        return txt.replace(/([0-9]+)/g,function(s0){
            num = s0;
            while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
            return num;
        });
    };
    var replacer = function(node){
        var candidates = document.evaluate('.//text()[not(parent::style) and not(parent::textarea) and not(parent::script)]', node, null, 6, null);
        var i = 0;
        for (i=0; i<candidates.snapshotLength; i++) {
            var txt = candidates.snapshotItem(i).nodeValue;
            candidates.snapshotItem(i).nodeValue = replaceNumber(txt);
        }
        candidates = document.evaluate('.//input[not(@type="text") and not(@type="hidden")]/@value | .//img/@alt | .//*/@title', node, null, 6, null);
        for (i=0; i<candidates.snapshotLength; i++) {
            var txt = candidates.snapshotItem(i).value;
            candidates.snapshotItem(i).nodeValue = replaceNumber(txt);
        }
    };
    
    var nodeText = document.evaluate('//text()', document, null, 6, null);
    var nodePre = document.evaluate('//pre', document, null, 6, null);
    if (nodeText.snapshotLength===1 && nodePre.snapshotLength===1){
        var del = nodeText.snapshotItem(0);
        var lines = del.nodeValue.split(/\r?\n/);
        var ins = document.createElement('pre');
        ins.style.whiteSpace = 'pre-wrap';
        del.parentNode.replaceChild(ins, del);
        for(var i=0; i<lines.length; i++){
            ins.appendChild(document.createTextNode(lines[i]));
            ins.appendChild(document.createElement('br'));
        }
    }
    
    replacer(document);
    document.addEventListener('DOMNodeInserted', function(e){ replacer(e.target); }, false);
    document.addEventListener('DOMCharacterDataModified', function(e){ replacer(e.target); }, false);
    document.addEventListener('DOMAttrModified', function(e){ replacer(e.target); }, false);
})();