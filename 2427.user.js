// ==UserScript==
// @name           orkut one click scrap
// @namespace      http://www.mat.puc-rio.br/~alexlaier/greasemonkey/orkutoneclickscrap.user.js
// @description    just one click to view your friends scrapbook.
// @include        http://www.orkut.com*
// ==/UserScript==

(function() {
var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) {
    var linkdata =  i[j].getAttribute("href");
    var linkparts = linkdata.split("?");
    if (linkdata.match("Profile.") == "Profile." ) {
        var scrapviewlink = document.createElement("a");
        scrapviewlink.href="http://www.orkut.com/ScrapBook.aspx"+"?"+linkparts[1];
        scrapviewlink.appendChild(document.createTextNode("[S]"));

        var albumlink = document.createElement("a");
        albumlink.href="http://www.orkut.com/AlbumView.aspx"+"?"+linkparts[1];
        albumlink.appendChild(document.createTextNode("[A]"));

        i[j].parentNode.insertBefore( albumlink ,i[j].nextSibling);
        i[j].parentNode.insertBefore( scrapviewlink ,i[j].nextSibling);
        }
    }

var foot=document.getElementById("myFooter_linkContactUs");
foot.href="http://www.orkut.com/ScrapView.aspx?uid=7971467171394877835"

})();
