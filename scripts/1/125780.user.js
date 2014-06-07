// ==UserScript==
// @name           Movies downloader on Trakt.tv
// @description    Movies Trakt.tv Links to Newsgroups, direct download and subtitles
// @namespace      NSV
// @version        0.3.3
// @include        http://www.trakt.tv/movie/*
// @include        http://trakt.tv/movie/*
// ==/UserScript==

var title = document.getElementById("meta-title").getAttribute("value").replace(/\'/g, '');
var year = document.getElementById("meta-year").getAttribute("value");
var imdb = document.getElementById("meta-imdb-id").getAttribute("value").replace(/tt/g, '');

var searchString = title + " " + year;

var elemID = document.evaluate("//p[@class='above-people']",document,null,9,null).singleNodeValue;

var savedHTML = "<span>DDL</span>";
savedHTML += " <a title=\"Rlslog.net\" href=\"http://rlslog.net/?sbutt=Go&s=" + title.replace(/ /g, '+') + "\" target=\"_blank\"><img src=\"http://rlslog.net/wp-content/favicon.ico\" alt=\"Rlslog\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"FilesTube.com\" href=\"http://filestube.com/search.html?q=" + searchString.replace(/ /g, '+') + "\" target=\"_blank\"><img src=\"http://static.filestube.com/files/images/favicon.ico\" alt=\"FT\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"Extreme-Down.com\" href=\"http://extreme-down.com/index.php?do=search&subaction=search&search_start=1&full_search=0&result_from=1&result_num=20&story=" + searchString.replace(/ /g, '+') + "\" target=\"_blank\"><img src=\"http://extreme-down.com/favicon.ico\" alt=\"ED\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"downparadise.ws\" href=\"http://forum.downparadise.ws/search.php?keywords="+searchString.replace(/ /g, '+')+"&terms=all&author=&fid[]=13&sc=1&sf=titleonly&sk=t&sd=d&sr=topics&st=0&ch=300&t=0&submit=Rechercher\" target=\"_blank\" /><img src=\"http://downparadise.ws/favicon.ico\" alt=\"DP\" width=\"16\" height=\"16\" /></a>";
savedHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>NZB</span>";
savedHTML += " <a title=\"NZBs.org\" href=\"https://nzbs.org/search/" + searchString + "?t=2000\" target=\"_blank\"><img src=\"https://nzbs.org/favicon.ico\" alt=\"NZBs\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"NZB.su\" href=\"http://nzb.su/search/" + searchString + "?t=2000\" target=\"_blank\"><img src=\"http://nzb.su/favicon.ico\" alt=\"NZB\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"Binsearch.net\" href=\"http://binsearch.info/?q=" + searchString + "\" target=\"_blank\"><img src=\"http://binsearch.info/favicon.ico\" alt=\"BS\" width=\"16\" height=\"16\" /></a>";
savedHTML += "<br><span>Torrents</span>";
savedHTML += " <a title=\"ThePirateBay.org\" href=\"http://thepiratebay.org/search/" + searchString.replace(/-/g, ' ') + "/0/99/201" + "\" target=\"_blank\"><img src=\"http://thepiratebay.org/favicon.ico\" alt=\"TPB\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"Torrentz.eu\" href=\"http://torrentz.eu/search?f=" + searchString.replace(/ /g, '+') + "\" target=\"_blank\"><img src=\"http://torrentz.eu/favicon.ico\" alt=\"TorrentZ\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"isoHunt.com\" href=\"http://isohunt.com/torrents/?iht=1&ihq=" + searchString.replace(/ /g, '+') + "\" target=\"_blank\"><img src=\"http://static.isohunt.com/favicon.ico\" alt=\"isoHunt\" width=\"16\" height=\"16\" /></a>";
savedHTML += "&nbsp;&nbsp;&nbsp;&nbsp;<span>Subtitles</span>";
savedHTML += " <a title=\"opensubtitles.org\" href=\"http://www.opensubtitles.org/search/imdbid-" + imdb + "\" target=\"_blank\"><img src=\"http://static.opensubtitles.org/favicon.ico\" alt=\"OpenSubtitles\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"podnapisi.net\" href=\"http://podnapisi.net/fr/ppodnapisi/search?sT=0&sK=" + title.replace(/ /g, '+') + "\" target=\"_blank\"><img src=\"http://podnapisi.net/favicon.ico\" alt=\"Podnapisi\" width=\"16\" height=\"16\" /></a>";
savedHTML += " <a title=\"subsynchro.com\" href=\"http://subsynchro.com/?q=" + title.replace(/ /g, '+') + "\" target=\"_blank\"><img src=\"http://subsynchro.com/favicon.gif\" alt=\"SubSynchro\" width=\"16\" height=\"16\" /></a>";

elemID.innerHTML=savedHTML;

var elemID = document.evaluate("//div[@class='show-overview']",document,null,9,null).singleNodeValue;
elemID.setAttribute("style","background-color:gray;");
