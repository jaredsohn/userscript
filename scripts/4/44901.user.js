// ==UserScript==
// @name           What.cd? Sexy Smileys
// @namespace      http://death2y.uuuq.com/
// @description    Replaces smileys with sexy blurred oned
// @include        http*://*what.cd*
// ==/UserScript==

var images = document.getElementsByTagName("img");
for (i in images) {
    if (images[i].src.search(/smileys\/smile.gif$/) != -1)
        images[i].src = "http://i2.photobucket.com/albums/y29/jeffayle/1237697008.png";
    else if (images[i].src.search(/smileys\/sad.gif$/) != -1)
        images[i].src = "http://i2.photobucket.com/albums/y29/jeffayle/1237697670.png";
    else if (images[i].src.search(/smileys\/ohshit.gif$/) != -1)
        images[i].src = "http://i2.photobucket.com/albums/y29/jeffayle/1237697957.png";
    else if (images[i].src.search(/smileys\/biggrin.gif$/) != -1)
        images[i].src = "http://i2.photobucket.com/albums/y29/jeffayle/1237698069.png";
    else if (images[i].src.search(/smileys\/tongue.gif$/) != -1)
        images[i].src = "http://i2.photobucket.com/albums/y29/jeffayle/1237698231.png";
    else if (images[i].src.search(/smileys\/heart.gif$/) != -1)
        images[i].src = "http://i2.photobucket.com/albums/y29/jeffayle/1237698362.png";
}