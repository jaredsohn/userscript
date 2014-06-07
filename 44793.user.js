// ==UserScript==
// @name         Pestiside User Blocker
// @namespace    http://w3.enternet.hu/gerlits/scripts/
// @description  Greasemonkey script to remove unwanted comments
// @include      http://www.pestiside.hu/*
// @include      http://www.politics.hu/*
// ==/UserScript==

// version 0.1

// ---------------------------------------------------------------------
// Enter the list of unwanted expressions here.  Comments which contain
// any of these strings will be removed from the page automatically.
// Tip: /x/ matches all occurrences of 'x';
// /\bx\b/ matches 'x' as a whole word (matches '@x:', but not 'taxi').
// The strings should be in UTF-8 encoding (this only matters if there
// are accented characters in it.)

var blockedUsers = new Array (
        /\bStan\b/
        );

// ---------------------------------------------------------------------

var allArticles = document.getElementsByTagName("div");

for (var i = allArticles.length - 1; i >= 0; --i) {
    var article = allArticles[i];
    if (article.className == "comment") {
        for (var j = 0; j < blockedUsers.length; ++j) {
            var user = blockedUsers[j];
            if (article.innerHTML.match(user)) {
                article.parentNode.removeChild(article);
                break;
            }
        }
    }
}

