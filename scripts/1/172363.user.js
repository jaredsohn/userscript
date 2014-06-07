// ==UserScript==
// @name        Endomondo no ads
// @description Remove the ads on the endomondo web site when you are a free user.
// @namespace   martindamien
// @include     http://*.endomondo.com/*
// @version     1.0
// @grant       none
// ==/UserScript==

var header = document.getElementsByClassName("topAdContainer");
header[0].style.display = "none";

var left = document.getElementsByClassName("leftAdContainer");
if ( left.length > 0 )
    left[0].style.display = "none";

var right = document.getElementsByClassName("rightAdContainer");
if ( right.length > 0 )
    right[0].style.display = "none";

var contacts = document.getElementsByClassName("importContacts");
if ( contacts.length > 0 )
    contacts[0].style.display = "none";

var pubs = document.getElementsByClassName("mainAdContainer");
if ( pubs.length > 0 )
{
    pubs[0].style.display = "none";
    pubs[1].style.display = "none";
}

var pubs = document.getElementsByClassName("premium-promo");
if ( pubs.length > 0 )
    pubs[0].style.display = "none";

var promo = document.getElementsByClassName("promo");
if ( promo.length > 0 )
    promo[0].style.display = "none";