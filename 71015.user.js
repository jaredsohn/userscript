// ==UserScript==
// @name           Quicksearch From Wikipedia
// @namespace      wiki_quicksearch
// @description    Adds links to other search engines to Wikipedia articles
// @include        http://en.wikipedia.org/wiki/*
// ==/UserScript==

var searches = [
    ["http://www.google.com/favicon.ico", "http://www.google.com/search?hl=en&q=SEARCHQUERY"],
    ["http://s.ytimg.com/yt/img/creators_corner/youtube_32x32.jpg", "http://www.youtube.com/results?search_query=SEARCHQUERY"],
    ["http://www.metacritic.com/favicon.ico", "http://www.metacritic.com/search/all/SEARCHQUERY/results"],
    ["http://www.imdb.com/favicon.ico", "http://www.imdb.com/find?s=all&q=SEARCHQUERY"],
    ["http://www.mobygames.com/favicon.ico", "http://www.mobygames.com/search/quick?q=SEARCHQUERY&x=0&y=0"],
    ["http://www.amazon.com/favicon.ico", "http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=SEARCHQUERY&x=0&y=0"],
    ["http://store.steampowered.com/favicon.ico", "http://store.steampowered.com/search/?term=SEARCHQUERY"],
    ["http://a248.e.akamai.net/www.direct2drive.com/d2d.ico", "http://www.direct2drive.com/Search.aspx?SearchTerm=SEARCHQUERY"],
    ["http://nzbs.org/favicon.ico", "http://nzbs.org/index.php?action=search&q=SEARCHQUERY&catid=0&age="],
    ["http://a3.twimg.com/profile_images/86558167/favicon_bigger.jpg", "http://btjunkie.org/search?q=SEARCHQUERY"],
    ["http://www.homeoftheunderdogs.net/favicon.ico", "http://www.homeoftheunderdogs.net/search.php?search_game=SEARCHQUERY"],
    ["http://www.abandonia.com/favicon.ico", "http://www.abandonia.com/en/search_abandonia/SEARCHQUERY"],
    ["http://www.veryicon.com/icon/preview/Internet%20&%20Web/Aquaticus%20Social/Reddit%20Icon.jpg", "http://www.reddit.com/search?q=SEARCHQUERY"],

];

var hdr = document.getElementById("firstHeading");
var title = hdr.textContent.replace(/ \(.*\)$/, "");
var before = hdr.nextSibling;

for(var i in searches) {
    var ico = document.createElement("img");
    ico.src = searches[i][0];
    ico.width = 32;
    ico.height = 32;
    var lnk = document.createElement("a");
    lnk.appendChild(ico);
    lnk.href = searches[i][1].replace("SEARCHQUERY", title);
    hdr.parentNode.insertBefore(lnk, before);
    var spc = document.createElement("span");
    spc.style.marginLeft = "16px";
    hdr.parentNode.insertBefore(spc, before);
};