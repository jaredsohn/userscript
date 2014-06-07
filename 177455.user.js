// ==UserScript==
// @name        Roman numerals for Facebook
// @namespace   http://userscripts.org
// @description Convert numbers on Facebook to Roman numerals (for Latin language setting)
// @include     http*://*facebook.com/*
// @grant       none
// @version     3
// ==/UserScript==

// Tweaked from http://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
function toRoman(num) {
    if (num > 3999999) { return num; }
    var result = '',
        ref = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'],
        xis = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

    if (num <= 3999999 && num >= 4000) {
        result = '<span style="text-decoration: overline;">'+toRoman(num.substr(0, num.length - 3))+'</span>';
        num = num.substr(num.length - 3);
    }

    for (var x = 0; x < ref.length; x++) {
        while (num >= xis[x]) { result = result + ref[x]; num = num - xis[x]; }
    }
    return result;
}

function fixRoman(num) {
    num = num.replace('.', '');
    return toRoman(num);
}

var numberRE = new RegExp('\\b\\d+\\.?\\d*\\b', 'g');

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    node.data = node.data.replace(numberRE, fixRoman);
}