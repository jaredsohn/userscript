// ==UserScript==
// @name        Honey, I Shrunk The Images
// @namespace   http://jchadwick.net/
// @version     0.94
// @description An oddly phallic script for resizing anime pictures.
// @include     http://board.byuu.org/*
// @copyright   2014 NSA
// @run-at      document-end
// @grant       none
// ==/UserScript==

var SETTINGS = {
    MAX_WIDTH: "500px",
    MAX_HEIGHT: "500px"
};

function shrink(img) {
    // create a link for full-size
    var a = document.createElement("a");
    a.href = img.src;
    
    // setup image for resize
    img.style.display = "block";
    img.style.maxWidth = SETTINGS.MAX_WIDTH;
    img.style.maxHeight = SETTINGS.MAX_HEIGHT;
    img.style.width = "auto";
    img.style.height = "auto";
    
    // reparent the image as a child of our link
    img.parentElement.replaceChild(a, img);
    a.appendChild(img);
}

function drill(alaska) {
    for (var node = alaska.firstElementChild;
         node != null;
         node = node.nextElementSibling) {
        if (node.tagName.toLowerCase() == "img")
            shrink(node);
        if (node.firstElementChild)
            drill(node);
    }
}

(function (d,i,c,k,s) {
    i = s.call(d.querySelectorAll('.postbody'));
    i.forEach(drill);
})(document, [], 420, "Bitcoins", Array.prototype.slice);

if ( 0 ) alert("If you read the source code before blindly using this, congrats.",
               "I apologize ahead of time for shitty humor and crufty code, but ",
               "I haven't been keeping up with today's modern Javascript idioms.",
               "But hey, I didn't add any external dependencies!                ");
