// ==UserScript==
// @name           PtP :: Change Torrent Page Title Order
// @namespace      http://seaofquiddity.com
// @description    Swap the Movie and Director on the torrent page title.
// @include        http://passthepopcorn.org/torrents.php?id=*
// ==/UserScript==

var title = document.title;
var titlesplit = title.split("::", 2);
var directortitle = titlesplit[0];
var ptptitle = titlesplit[1];
var directortitle = directortitle.split(" - ", 2);
var director = directortitle[0];
var movie = directortitle[1];

document.title = (movie.concat(" - ", director.concat(" :: ", ptptitle)));