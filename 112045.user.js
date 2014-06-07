// ==UserScript==
// @name        Diigo Ad Remover
// @namespace   http://userscripts.org/users/360423
// @description Remove ads and the "Go Premium" button from Diigo website
// @include     http://www.diigo.com/*
// @version     0.0.1
// @author      kaz_at_33
// ==/UserScript==

(function() {
    // Find "Go Premium" button to see if the user is a premium.
    var goPremium = document.getElementById("goPremiumShortcut");
    if (!goPremium) {
        return;
    }

    // Hide "Go Premium" button and ads on header/footer.
    goPremium.style.display = "none";
    var elements = document.getElementsByTagName("div");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].className == "footerAD") {
            elements[i].style.display = "none";
        }
    }
})();
