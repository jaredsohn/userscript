// ==UserScript==
// @name           Reddit - Remove non-self submissions
// @namespace      http://userscripts.org/users/115800
// @description    Removes non-self submissions in specified subreddits
// @include        http://*reddit.com/*
// @exclude        *comscore*
// ==/UserScript==

GM_registerMenuCommand("Subreddits to remove non-self submissions in...", function() {
    var subreddits = window.prompt("Subreddits are case-insensitive and must be delimited by commas. Spaces are optional.\n\nSubreddits:", GM_getValue("subreddits", "example1,example2"));
    GM_setValue("subreddits", subreddits);
    GM_setValue("subredditsRegExp", "/r/(" + subreddits.replace(/\s/g, "").replace(/,/g, "|") + ")/");
});

if (RegExp(GM_getValue("subredditsRegExp", ""), "i").test(document.URL)) {
    var sitetable = document.getElementsByClassName("sitetable");
    var elements = sitetable[sitetable.length - 1].getElementsByClassName("domain");
    var n = elements.length;
    for (var i = 0; i < n; i++) {
        var element = elements[i];
        if (element.childNodes[1].innerHTML.indexOf("self.") != 0) {
            element.parentNode.parentNode.parentNode.style.display = "none";
        }
    }
}
