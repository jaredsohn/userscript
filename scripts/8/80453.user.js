// ==UserScript==
// @name           s5620 Monte
// @namespace      grizscript
// @include        http://s5620.pl/*
// ==/UserScript==

var plusPic = "http://dealspl.us/images/plus/plus.gif";
var minusPic = "http://localschools.com/images/silk/minus.png";

function changeRepIcon() {
    for (i = 0; i < document.images.length; i++) {
        if (document.images[i].getAttribute("src").toLowerCase() == "./images/icons/thumbsup.gif") {
            document.images[i].setAttribute("src",plusPic);
        }
        if (document.images[i].getAttribute("src").toLowerCase() == "./images/icons/thumbsdown.gif") {
            document.images[i].setAttribute("src",minusPic);
        }
    }
}

changeRepIcon();