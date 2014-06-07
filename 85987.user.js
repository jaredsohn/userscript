// ==UserScript==
// @name           Chefkoch Shopping Ad Remover
// @version        0.2
// @date           2010-8-14
// @include        http://*chefkoch.de/*
// ==/UserScript==

// shopping banner on the right side
sitenote=document.getElementById('skyscraper_shopping');

// sponsor commercial if not logged in, below "rezept der woche"
anzeige = document.getElementById('banner-hpa-mr');

// sponsor links at the bottom
//partnerlogos = document.getElementById('partnerlogos');

// google ads on recipe search page 
textads = document.getElementById('text-ads-oben');

if( sitenote )
    sitenote.parentNode.removeChild( sitenote );
if( anzeige )
    anzeige.parentNode.removeChild( anzeige );
//if( partnerlogos )
//    partnerlogos.parentNode.removeChild( partnerlogos );
if( textads )
    textads.parentNode.removeChild( textads );
    
    