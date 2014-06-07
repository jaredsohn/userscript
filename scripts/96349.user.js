// ==UserScript==
// @name  Gawker Verdana font
// @description Changes the font on lifehacker and io9 to Verdana, and adjusts the font size.
// @match http://lifehacker.com/*
// @match http://io9.com/*
// ==/UserScript==

GM_addStyle("\
.post-body, .permalink .post-body, .ctext { \
    font-size: 12px; \
} \
 \
body, #rightcontainer .post { \
    font-family: Verdana, sans-serif; \
} \
 \
h1 {font-size: 1.933em;} \
h2 {font-size: 1.8em;} \
h3 {font-size: 1.4em;} \
h4 {font-size: 1.267em;} \
h5 {font-size: 0.933em;} \
h6 {font-size: 0.867em;} \
 \
h1, h2, h3, h4, h5, h6 { \
line-height: 1.3; \
} \
.permalink .pm_byline { \
float: left; \
margin: 0 0.33em -1em 0; \
}");
