// ==UserScript==
// @name           Orkut Scrapbook and Album Viewer
// @namespace      http://www.imranzahid.com/
// @description    Adds a link for viewing Scrapbook and Album of the users in orkut.com website
// @include        http://www.orkut.com*
// ==/UserScript==

(function() {
var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) {
    var linkdata =  i[j].getAttribute("href");
    var linkparts = linkdata.split("?");
    if (linkdata.match("Profile.") == "Profile." ) {
        if (i[j].childNodes[0].tagName != "IMG" &&
            i[j].parentNode.className != "thumb" &&
            i[j].parentNode.className != "boxmid" &&
            i[j].parentNode.className != "username" &&
            i[j].parentNode.className != "listitemchk"
        ) {
            var scrapviewlink = document.createElement("a");
            scrapviewlink.href="http://www.orkut.com/Scrapbook.aspx"+"?"+linkparts[1];
            scrapviewlink.appendChild(document.createTextNode("[S]"));

            var albumlink = document.createElement("a");
            albumlink.href="http://www.orkut.com/AlbumView.aspx"+"?"+linkparts[1];
            albumlink.appendChild(document.createTextNode("[A]"));

            i[j].parentNode.insertBefore(albumlink, i[j].nextSibling);
            i[j].parentNode.insertBefore(scrapviewlink, i[j].nextSibling);
            i[j].parentNode.insertBefore(document.createTextNode(" "), i[j].nextSibling);
        } else {
            
        }
    }
}

var foot = document.getElementById("footer").childNodes[3].childNodes[5];
var sviewlink = document.createElement("a");
sviewlink.href="http://www.orkut.com/Profile.aspx?uid=17685044386506429372";
sviewlink.appendChild(document.createTextNode("OSA"));
foot.appendChild(document.createTextNode(" | "));
foot.appendChild(sviewlink);
})();