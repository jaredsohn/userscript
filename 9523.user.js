// ==UserScript==
// @name          Flickr On Black
// @description   Adds "On Black" links to a Flickr photo page
// @namespace     http://netcetera.org/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// Based upon the original by Fabricio Zuardi (http://www.mamata.com.br/greasemonkey/)
// By Simon Whitaker (simon AT netcetera DOT org)
// ==/UserScript==

//if a photo page

(
    function(){

        if (document.getElementById("button_bar")) {

            pid = location.pathname.split('/')[3];

            var containerA = document.createElement("li");
            containerA.setAttribute("class","Stats");
            var linkA = 'View on black: ';
            linkA    += '<a href="http://bighugelabs.com/flickr/onblack.php?id=' + pid + '" style="text-decoration: none;">Regular</a>, ';
            linkA    += '<a href="http://bighugelabs.com/flickr/onblack.php?id=' + pid + '&size=large" style="text-decoration: none;">Large</a>';
            containerA.innerHTML = linkA;

            addlInfo = document.evaluate("//li[contains(@class,'Stats')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).parentNode;  // This broke before, let's see
            addlInfo.appendChild(containerA);

        }//close if a photo page
    }
)();