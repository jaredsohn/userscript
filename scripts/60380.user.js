// ==UserScript==
// @name          TvGuideGridOnly
// @namespace     http://www.tvguide.com
// @description   Show the grid only
// @include       http://www.tvguide.com/Listings/*
// ==/UserScript==
(function() {
    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; ++i) {
        if (divs[i].className == 'listings-w') {
            var listings = divs[i];
            listings.style.position = 'relative';
            listings.style.width = '760px';
            listings.style.margin = 'auto';
            listings.style.background = '#ffffff';
            listings.style.border = '8px solid #ffffff';
            document.body.style.textAlign = 'center';
            document.body.style.background = '#666655';
            document.body.innerHTML = '';
            document.body.appendChild(listings);
            break;
        }
    }

    // Supprimer la publicite
    GM_addStyle(".gridAdRow { display: none; }");
}) ();
