// ==UserScript==
// @name        Collins Pronounce Links
// @namespace   http://rswarbrick.dnsalias.org/gm-scripts
// @description Replace 'pronounce' flash links with links to the actual MP3
// @include     http://www.collinsdictionary.com/dictionary/*
// @version     1.0
// ==/UserScript==

function convert_links () {
    var nodes = document.evaluate ('//img[@class="sound" and @onclick]', document, null,
                                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for (var i=0; i < nodes.snapshotLength; i++) {
        var img = nodes.snapshotItem (i);
        var parent_span = img.parentNode;

        // Onclick looks like
        // playSoundFromFlash('/', '/sounds/d/de_/de_he/de_herbei.mp3', this)
        var onclick_url = img.getAttribute ("onclick").split (",")[1].trim ();

        if ( !(onclick_url.substr (onclick_url.length - 5, 5) == ".mp3'" &&
               onclick_url.substr (0, 2) == "'/") ) {
            console.warn ("Unexpected onclick format - not replacing. [" +
                          onclick_url + "]");

            console.warn (onclick_url.substr (onclick_url.length - 5, 5));
            console.warn (onclick_url.substr (0, 2));
            
            continue;
        }

        var target_url = onclick_url.substring (1, onclick_url.length - 1);
        var link = document.createElement ("a");
        link.setAttribute ("href", target_url);
        parent_span.appendChild (link);
        link.appendChild (img);
        img.removeAttribute ("onclick");
    }
}

convert_links ();
