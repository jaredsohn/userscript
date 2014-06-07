// ==UserScript==
// @name          Tidy Google Bar
// @version       1.0
// @description	  Removes extraneous links in google toolbar
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include       https://*.google.com/*
// @include       http://*.google.com/*
// ==/UserScript==

gbzc = document.getElementById('gbzc');
gSearch= document.getElementById('gb_1').parentNode;
gbzc.removeChild(gSearch);
gImages = document.getElementById('gb_2').parentNode;
gbzc.removeChild(gImages);
gTube = document.getElementById('gb_36').parentNode;
gbzc.removeChild(gTube);
gNews = document.getElementById('gb_5').parentNode;
gbzc.removeChild(gNews);
gPlay = document.getElementById('gb_78').parentNode;
gbzc.removeChild(gPlay);
gMap = document.getElementById('gb_8').parentNode;
gbzc.removeChild(gMap);
