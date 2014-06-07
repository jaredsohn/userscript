// ==UserScript==

// @name           Google Logo Replace (alpha)

// @namespace      http://localhost/

// @include        http://www.google.com/*

// ==/UserScript==

// ==UserScript==

// @name           Google Logo Replace (alpha)

// @namespace      http://localhost/

// @include        http://www.google.com/*

// ==/UserScript==


var theImage, altText, logo, height, width;

theImage = document.getElementById('hplogo');
height = 126;
width = 364;

altText = "Google: v. To bowl a googly in the game of cricket."

logo = "http://www.google.com/images/logos/ps_logo2.png";



if (theImage) {

    theImage.height = height;

    theImage.width = width;

    theImage.alt = altText

    theImage.title = altText

    theImage.src = logo

    theImage.parentNode.replaceChild(altText, theImage);

}

theImage = document.getElementById('logocont').getElementsByTagName('img')[0];
height = 56;
width = 160;

if(theImage) {

    theImage.height = height;

    theImage.width = width;

    theImage.alt = altText

    theImage.title = altText

    theImage.src = logo

    theImage.parentNode.replaceChild(altText, theImage);

}
