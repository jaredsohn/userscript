// ==UserScript==
// @name           TV Shows downloader on Trakt.tv
// @description    TV Shows Trakt.tv Links to Newsgroups, direct download and subtitles
// @namespace      NSV
// @version        0.7.1
// @include        http://www.trakt.tv/show/*/season/*/episode/*
// @include        http://trakt.tv/show/*/season/*/episode/*
// ==/UserScript==

var title = document.getElementById("meta-title").getAttribute("value").replace(/\'/g, '');
var season = document.getElementById("meta-season").getAttribute("value");
var episode = document.getElementById("meta-episode").getAttribute("value");

var eps = " S";

if (season < 10) {
    eps += "0";
}

eps += season + "E";

if (episode < 10) {
    eps += "0";
}

eps += episode;

var searchString = title + eps;

var elemID = document.evaluate("//p[@class='last']",document,null,9,null).singleNodeValue;
var newElement = document.createElement("p");
newElement.setAttribute("id","download");
elemID.parentNode.insertBefore(newElement, elemID);

var savedHTML = "";
savedHTML += "<span>DDL</span>";
savedHTML += " <a title=\"Rlslog.net\" href=\"http://rlslog.net/" + title + eps + "\" target=\"_blank\"><img src=\"http://rlslog.net/wp-content/favicon.ico\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"FilesTube.com\" href=\"http://filestube.com/search.html?q=" + searchString.replace(/ /g, '+') + "\" target=\"_blank\"><img src=\"http://static.filestube.com/files/images/favicon.ico\" width=\"16\" height=\"16\" /></a>";
savedHTML += "<br><span>NZB</span>";
savedHTML += " <a title=\"NZBs.org\" href=\"https://nzbs.org/index.php?action=search&catid=t1&q=" + searchString + "\" target=\"_blank\"><img src=\"https://nzbs.org/favicon.ico\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"NZB.su\" href=\"http://nzb.su/search/" + searchString + "?t=5000\" target=\"_blank\"><img src=\"http://nzb.su/favicon.ico\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"Binsearch.net\" href=\"http://binsearch.info/?q=" + searchString + "\" target=\"_blank\"><img src=\"http://binsearch.info/favicon.ico\" width=\"16\" height=\"16\" /></a>";
savedHTML += "<br><span>Torrents</span>";
savedHTML += " <a title=\"ThePirateBay.org\" href=\"http://thepiratebay.org/search/" + searchString.replace(/-/g, ' ') + "/0/99/200" + "\" target=\"_blank\"><img src=\"http://thepiratebay.org/favicon.ico\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"Torrentz.eu\" href=\"http://torrentz.eu/search?f=" + searchString.replace(/ /g, '+') + "\" target=\"_blank\"><img src=\"http://torrentz.eu/favicon.ico\" width=\"16\" height=\"16\" /></a>";
savedHTML += "<br><span>Subtitles</span>";
savedHTML += " <a title=\"Addict7ed.com\" href=\"http://addic7ed.com/serie/" + title.replace(/ /g, '_') + "/" + season + "/" + episode + "/1" + "\" target=\"_blank\"><img src=\"http://addic7ed.com/favicon.ico\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"TVsubtitles.net\" href=\"http://tvsubtitles.net/search.php?q=" + title.replace(/ /g, '+') + "\" target=\"_blank\"><img src=\"http://tvsubtitles.net/favicon.ico\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"Sous-titres.eu\" href=\"http://sous-titres.eu/series/" + title.replace(/ /g, '_') + ".html#saison-" + season + "\" target=\"_blank\"><img src=\"http://sous-titres.eu/favicon.ico\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"SeriesSub.com\" href=\"http://seriessub.com/sous-titres/" + title.replace(/ /g, '_') + "/saison_" + season.replace(/0/g, '') + "\" target=\"_blank\"><img src=\"http://seriessub.com/favicon.ico\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"podnapisi.net\" href=\"http://podnapisi.net/fr/ppodnapisi/search?sT=1&sK=" + title.replace(/ /g, '+') + "&sTS=" + season + "&sTE=" + episode + "\" target=\"_blank\"><img src=\"http://podnapisi.net/favicon.ico\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"bierdopje.com\" href=\"http://www.bierdopje.com/search/shows/" + title.replace(/ /g, '+') + "\" target=\"_blank\"><img src=\"http://cdn.bierdopje.eu/g/layout/bierdopje.png\" width=\"16\" height=\"16\" /></a>";

newElement.innerHTML = savedHTML;