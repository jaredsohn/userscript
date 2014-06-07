// ==UserScript==

// @name           What.cd? Show ONLY unread posts

// @namespace      http://death2y.uuuq.com/

// @description    Makes the link to your posts go directly to showing only unread posts

// @include        http*://*what.cd*

// ==/UserScript==



//Search for the posts link

var links = document.getElementsByTagName("a");

var found = false;

var i = 0;



while (!found) {

    if (links[i].innerHTML == "Posts") {

        found = true; //Hey look, we found it :)

        links[i].href += "&showunread=1";

    }

    i++;

}