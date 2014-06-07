// ==UserScript==
// @name          Facebook All Images
// @description   Shows all photos in an album on one page so you don't have to keep clicking through
// @author        Paul Giannaros
// @version       2.2
// @include       http://*.facebook.com/photo_search.php*
// @include       http://*.facebook.com/album.php*
// ==/UserScript==

var photosPerPage = 20;

var pageLinks = document.getElementById("pag_nav_links");
if(pageLinks) {
    var j = 0;
    // Remove the links to the multiple pages
    while(document.getElementById("pag_nav_links")) {
        var l = document.getElementById("pag_nav_links");
        l.style.display = "none";
        l.id = "hidden_pag_nav_links" + i++;
    }
    // and change the "Photos 1 - 20 out of N" to "N photos"
    var photosHeader = document.getElementsByTagName("h4")[0];
    var t = photosHeader.childNodes[0].nodeValue.split(/ /);
    var numberOfPhotos = parseInt(t[t.length - 1]);
    photosHeader.childNodes[0].nodeValue = numberOfPhotos + " photos";
    
    // Find where we are so that we know which page's photo to not show
    var startingPage = 1;
    var templateUrl = window.location.toString() + '&page=X';
    var matches = /page=(\d+)/.exec(window.location.toString());
    if(matches && matches.length > 2) {
        startingPage = parseInt(matches[1]);
        templateUrl = window.location.toString().replace(/page=\d+/, 'page=X');
    }
    
    for(var i = 1, j = Math.ceil(numberOfPhotos / photosPerPage); i <= j; ++i) {
        if(i == startingPage)
            continue;
        var nextPageUrl = templateUrl.replace(/page=X/, 'page=' + i);
        GM_xmlhttpRequest({
            method: "GET",
            url: nextPageUrl,
            onload: function(response) {
                var s = response.responseText;
                var albumStart = s.indexOf('id="album"');
                if(albumStart == -1)
                    return;
                var stuffWeWantStart = s.indexOf('<tr>', albumStart);
                var stuffWeWantEnd = s.indexOf('</table>', stuffWeWantStart);
                var imagesMarkup = s.substring(stuffWeWantStart, stuffWeWantEnd);
                var album = document.getElementById("album");
                album.getElementsByTagName("table")[0].innerHTML += imagesMarkup;
            }
        });
    }
}


// kate: indent-mode normal; space-indent on; mixed-indent off; indent-width 4;
