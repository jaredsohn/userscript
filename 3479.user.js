// ==UserScript==
// @name          more family friendly craigslist
// @namespace     http://spig.net/
// @description   remove content that I don't like to see when I visit a public site like craigslist - and I don't need to see personals - ever
// @include       http://*.craigslist.org/*
// @include       http://craigslist.org/*
// @date          2006-03-10
// @version       0.1
// @GM_version    0.6.4
// ==/UserScript==

(function() {
    // find all tables on the page - look for a summary of "personals"
    tables = document.getElementsByTagName("table");
    for (i=0; i<tables.length; i++)
    {
      // remove personals section
      if (tables[i].summary.match(/personals/i)) tables[i].style.display = "none";
      // remove city list as well
      if (tables[i].summary.match(/city list/i)) tables[i].style.display = "none";
    }

    anchors = document.getElementsByTagName("a");
    for (i=0; i<anchors.length; i++)
    {
      if (anchors[i].innerHTML.match(/^erotic|kink|adult|m4m|w4w|queer$/i)) anchors[i].style.display = "none";
    }
})();
