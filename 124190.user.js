// ManyWikiTrip: Greasemonkey Adder Links to Manypedia and WikiTrip to Wikipedia Articles
// version 0.2.0
// 2012-01-26
// Copyright (c) 2011, Paolo Massa
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name ManyWikiTrip
// @namespace wikipedia
// @description Insert into a Wikipedia page two links to (1) the comparison on Manypedia http://www.manypedia.com of this page with the equivalent page on another language Wikipedia and (2) the evolution of the history of edits to this page on WikiTrip http://sonetlab.fbk.eu/wikitrip/
// @include http://*.wikipedia.org/wiki/*
// @include https://*.wikipedia.org/wiki/*
// ==/UserScript==

function enrichTitle(link) {
    var head = document.getElementsByTagName('h1');

    var documentUrl = window.location.href
      , re = /http:\/\/(\w{2,3}).wikipedia.org\/wiki\/([^#]+)/
      , matches = documentUrl.match(re)
      , lang1 = "en"
      , pageTitle = "";
    if (matches.length > 2) {
        lang1 = matches[1];
        pageTitle = matches[2].replace(/_/g, " ");
    }

    head[0].innerHTML += '<small>(<a href="http://www.manypedia.com/#|' +
                         lang1+'|'+pageTitle+'">compare ' + pageTitle +
                         ' on Manypedia</a>) (<a href="http://sonetlab.fbk.eu/wikitrip/#|'+
                         lang1+'|'+pageTitle+'">see '+pageTitle+' on WikiTrip</a>)</small>';
}

enrichTitle();