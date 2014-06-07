// ==UserScript==
// @name           Tatoeba default languages
// @description    Moves selected languages to the top of language droptowns on tatoeba.org.
// @author         FlamingTofu
// @include        http://tatoeba.org/*
// @version        0.1
// ==/UserScript==
(function () {
    var myLangs, queries;
    // *** Change the line below to set the default languages. ***
    myLangs = [["eng", "English"], ["jbo", "Lojban"]];
    queries = ["#randomLangChoice", "#randomLangChoiceInBrowse", "#SentenceFrom", "#SentenceTo", ".translationLang"];
    queries.forEach(function (q) {
        var el, first, opt;
        el = document.querySelector(q);
        if (el) {
            first = el.firstChild;
            myLangs.forEach(function (lang) {
                opt = document.createElement("option"); 
                opt.value = lang[0];
                opt.innerHTML = lang[1];
                opt.className = "defaultLang";
                el.insertBefore(opt, first);
            });
        }
    });
}());