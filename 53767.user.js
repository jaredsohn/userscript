// ==UserScript==
// @name           Force Correct RT Domain
// @namespace      rtdom@kwierso.com
// @description    Force your browser to stay on a specified Roosterteeth domain
// @include        http://roosterteeth.com/*
// @include        http://rvb.roosterteeth.com/*
// @include        http://achievementhunter.com/*
// @include        http://strangerhood.com/*
// @include        http://panics.roosterteeth.com/*
// @include        http://magic.roosterteeth.com/*
// @include        http://m.roosterteeth.com/*
// ==/UserScript==

(function() {
    // This is where you specify which domain you want to stay on.
    var domain = "";
    
// DON'T GO BELOW THIS LINE!!!
//------------------------------------------------------------------------
    // Array of valid domain options.
    var domains = ["roosterteeth.com", "rvb.roosterteeth.com", 
                   "panics.roosterteeth.com", "magic.roosterteeth.com",
                   "m.roosterteeth.com", "strangerhood.com",
                   "achievementhunter.com"];
    var domainmatch = false;

    // See if user's choice is valid.
    for(i in domains) {
        if(domains[i] == domain)
            domainmatch = true;
    }

    // If choice is valid, see if user is already on that domain.
    // If not, switch.
    if(domainmatch) {
        if(document.domain != domain) {
            document.location.href = document.URL.replace(document.domain, domain);
        }
    }
})();