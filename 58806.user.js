// ==UserScript==
// @name           RT Themesaver
// @namespace      rtts@kwierso.com
// @description    Redirects you to your preferred theme.
// @include        http://roosterteeth.com/*
// @include        http://redvsblue.com/*
// @include        http://achievementhunter.com/*
// @include        http://grifball.com/*
// @include        http://roosterteethcomics.com/*
// @include        http://captaindynamic.com/*
// ==/UserScript==

(function() {
    var domain = "";

    // Uncomment your preferred domain:

    // domain = "roosterteeth.com";
    // domain = "redvsblue.com";
    // domain = "achievementhunter.com";
    // domain = "grifball.com";
    // domain = "roosterteethcomics.com";
    // domain = "captaindynamic.com";

    if(domain != "") {
        if(document.domain != domain) {
            document.location = document.URL.replace(document.domain, domain);
        }
    }
})();