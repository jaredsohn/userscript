// ==UserScript==
// @name         Index Forum User Blocker
// @namspace     http://web.beltav.hu/fgerlits/scripts/
// @description  Egyes forumhozzaszolasokat kiszuro Greasemonkey script
// @include      http://forum.index.hu/*
// ==/UserScript==

// version 1.0

// ---------------------------------------------------------------------
// Ide kell beirni a nemkivanatos kifejezeseket.  Azok a hozzaszolasok,
// amelyekben ezek kozul valamelyik szerepel, nem fognak latszani.
// Az ekezetes betuket kodolni kell, pl. 'turo' -> unescape('t%FAr%F3').
// A % utan a betu hexadecimalis kodja all az ISO 8859-2 karakterkeszlet
// szerint; lasd http://en.wikipedia.org/wiki/ISO_8859-2.

var blockedUsers = new Array ('Loci', unescape('L%F3ci'));

// ---------------------------------------------------------------------

var allArticles = document.evaluate(
    "//table[@class='art']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i=0; i < allArticles.snapshotLength; ++i) {
    var article = allArticles.snapshotItem(i);
    for (var j=0; j < blockedUsers.length; ++j) {
        var user = blockedUsers[j];
        if (article.innerHTML.match(user)) {
            article.parentNode.removeChild(article);
            break;
        }
    }
}
