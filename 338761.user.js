// ==UserScript==
// @name        CJK space FIX
// @namespace   http://userscripts.org/users/sayuan
// @version     1
// @grant       none
// ==/UserScript==

function cjkSpaceFix() {
    "use strict";
    var cjkRegex = [
        '[\u3000-\u303F]', // InCJK_Symbols_and_Punctuation
        '[\u3040-\u309F]', // InHiragana
        '[\u30A0-\u30FF]', // InKatakana
        '[\u3100-\u312F]', // InBopomofo
        '[\u3130-\u318F]', // InHangul_Compatibility_Jamo
        '[\u3190-\u319F]', // InKanbun
        '[\u31A0-\u31BF]', // InBopomofo_Extended
        '[\u31F0-\u31FF]', // InKatakana_Phonetic_Extensions
        '[\u3200-\u32FF]', // InEnclosed_CJK_Letters_and_Months
        '[\u3300-\u33FF]', // InCJK_Compatibility
        '[\u3400-\u4DBF]', // InCJK_Unified_Ideographs_Extension_A
        '[\u4DC0-\u4DFF]', // InYijing_Hexagram_Symbols
        '[\u4E00-\u9FFF]', // InCJK_Unified_Ideographs
        '[\uA000-\uA48F]', // InYi_Syllables
        '[\uA490-\uA4CF]', // InYi_Radicals
        '[\uAC00-\uD7AF]', // InHangul_Syllables
        '[\uF900-\uFAFF]', // InCJK_Compatibility_Ideographs
        '[\uFE30-\uFE4F]', // InCJK_Compatibility_Forms
        '[\uFF00-\uFFEF]', // InHalfwidth_and_Fullwidth_Forms
    ].join('|');

    var regex = new RegExp('('+cjkRegex+')\\s+(?='+cjkRegex+')', 'g');

    function removeSpaces(tag) {
        var elmts = document.getElementsByTagName(tag);
        for (var i=0; i<elmts.length; i++) {
            elmts[i].innerHTML = elmts[i].innerHTML.replace(regex, '$1');
        }
    }

    removeSpaces('p');
    removeSpaces('li');
}
cjkSpaceFix();