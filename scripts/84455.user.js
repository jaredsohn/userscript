// ==UserScript==
// @name Languagerus!
// @namespace mrshahid23434/
// @version 0.01
// @description languagepack by mrshahid
// @include http://barbars.ru/
// @exclude http://www.polock.tu2.ru/
// ==/UserScript==

function repl(a) {
    var b = {

"PВеликий Варвар": "Маааааааленький варварок",


    };
    for (var c in b) {
        var d = RegExp(c, "gim");
        a = a.replace(d, b[c])
    }
    return a
};
 
window.onload = function () {
    all_elements = document.getElementsByTagName("*");
    i = 0;
    for (s = all_elements.length; i < s; i++) if (all_elements[i].tagName != "SCRIPT") {
        j = 0;
        for (s_ = all_elements[i].childNodes.length; j < s_; j++)
        if (all_elements[i].childNodes[j].nodeType == 3)
        all_elements[i].childNodes[j].data = repl(all_elements[i].childNodes[j].data)
    }
};
