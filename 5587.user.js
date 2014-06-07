// ==UserScript==
// @name           HTTPS UTFPR Gamby
// @namespace      4AK33D
// @description    Burla o proxy atraves do protocolo https.
// @include        http://www.orkut.com*
// @include        https://www.orkut.com*
// ==/UserScript==

(function() {

var arrayUrl = window.location.href.toString().split(":");
if (arrayUrl[0] && arrayUrl[1] && arrayUrl[0] == "http") {
	window.location.href = "https:" + arrayUrl[1];
}

var arrayImg = document.getElementsByTagName('img');
for (var i = 0; i < arrayImg.length; i++) {
	arrayImg[i].src = 'https:' + arrayImg[i].src.split(':')[1];
}

var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) {
    var linkdata =  i[j].getAttribute("href");
    var linkparts = linkdata.split("?");
    if (linkdata.match("Profile.") == "Profile." ) {
        var scrapviewlink = document.createElement("a");
        scrapviewlink.href="http://www.orkut.com/Scrapbook.aspx"+"?"+linkparts[1];
        scrapviewlink.appendChild(document.createTextNode("[S]"));

        var albumlink = document.createElement("a");
        albumlink.href="http://www.orkut.com/AlbumView.aspx"+"?"+linkparts[1];
        albumlink.appendChild(document.createTextNode("[A]"));

        i[j].parentNode.insertBefore( albumlink ,i[j].nextSibling);
        i[j].parentNode.insertBefore( scrapviewlink ,i[j].nextSibling);
        }
    }

})();