// ==UserScript==
// @name           HTDP Keyboard Navigation
// @description    Add keyboard navigation to htdp.org
// @version        1.0
// @author         FerretWithASpork
// @license        Public Domain
// @include        http://htdp.org/*
// ==/UserScript==

function nextPage() {
    var navLinks = document.getElementsByTagName("a");
    for (var i = 0; i < navLinks.length; i++) {;
        if (navLinks[i].innerHTML == "next") {
            window.location.href = navLinks[i].href;
        }
    }
}

document.onkeyup = function(e) {
    if (e.which = 78) {
        nextPage();
    }
}

//document.onload(alert('keynav loaded'));