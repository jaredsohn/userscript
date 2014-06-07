// ==UserScript==
// @name           Scrapbook, Album And Video Fast Link Viewer
// @namespace      http://daniel.scapin.googlepages.com
// @description    Adds one link to fast scrapbook writing, album and video viewing in orkut.com website (based on Scrapbook and Album Viewer by http://kioshi.org/gm/)
// @include        http://www.orkut.com*
// ==/UserScript==

(function() {
var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) {
    var linkdata =  i[j].getAttribute("href");
    var linkparts = linkdata.split("?");
    if (linkdata.match("Profile.") == "Profile." ) {
        var scrapviewlink = document.createElement("a");
        scrapviewlink.href="http://www.orkut.com/Scrapbook.aspx"+"?"+linkparts[1];
        scrapviewlink.appendChild(document.createTextNode("[S]"));

        var albumlink = document.createElement("a");
        albumlink.href="http://www.orkut.com/AlbumList.aspx"+"?"+linkparts[1];
        albumlink.appendChild(document.createTextNode("[A]"));
        
        var videolink = document.createElement("a");
        videolink.href="http://www.orkut.com/FavoriteVideos.aspx"+"?"+linkparts[1];
        videolink.appendChild(document.createTextNode("[V]"));
        
        
        i[j].parentNode.insertBefore( albumlink ,i[j].nextSibling);
        i[j].parentNode.insertBefore( videolink ,i[j].nextSibling);
        i[j].parentNode.insertBefore( scrapviewlink ,i[j].nextSibling);
        }
    }

})();