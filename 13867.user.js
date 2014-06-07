// ==UserScript==
// @name           Biip.no ads remover
// @namespace      Terw
// @description    Removes most of the ads at biip.no
// @include        http://biip.no/*
// @include        http://www.biip.no/*
// ==/UserScript==

var ad = document.getElementById('adsTop');
if (ad) {
   ad.parentNode.removeChild(ad);
}

var ad = document.getElementById('Profile_bnrNet_ifrBanner');
if (ad) {
   ad.parentNode.removeChild(ad);
}

var ad = document.getElementById('bnrAbc1_ifrBanner');
if (ad) {
   ad.parentNode.removeChild(ad);
}

var ad = document.getElementById('karmaWrapper');
if (ad) {
   ad.parentNode.removeChild(ad);
}

var ad = document.getElementById('headerUserstat');
if (ad) {
   ad.parentNode.removeChild(ad);
}

var ad2 = document.getElementById('_ctl0_bnrNet_ifrBanner');
if (ad2) {
   ad2.parentNode.removeChild(ad2);
}

var ad = document.getElementById('adsSide');
if (ad) {
   ad.parentNode.removeChild(ad);
}

var ad = document.getElementById('dropdown');
if (ad) {
   ad.parentNode.removeChild(ad);
}

var ad = document.getElementById('wrapperFooter');
if (ad) {
   ad.parentNode.removeChild(ad);
}

var ad = document.getElementById('new_plususers');
if (ad) {
   ad.parentNode.removeChild(ad);
}

var ad = document.getElementById('tagCloud');
if (ad) {
   ad.parentNode.removeChild(ad);
}

var ad = document.getElementById('phoneinfo');
if (ad) {
   ad.parentNode.style.display = 'none';
}