// ==UserScript==
// @name        Piperka Open All
// @namespace   https://github.com/NAR8789
// @description Adds an open all button to piperka updates page
// @version     1.0
// @grant       none
// @match       http://piperka.net/updates.html
// ==/UserScript==

// this script relies on jquery, but does not @require it...
// potentially it ought to, but piperka already includes jquery on the page

$(function() {
    var piperkaList = $('#piperka_list');
    var links = piperkaList.find('a[target="_blank"]');

    var openAll = $(document.createElement("input")).attr({
        type: "button",
        value: "Open All"
    }).click(function() {
        links.each(function(i,link) {
            window.open(link.href, link.target);
        });
    });

    openAll.insertBefore(piperkaList);
});
