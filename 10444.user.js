// ==UserScript==
// @name		Something Awful Banner Ad Position Flipper
// @namespace	Zorilla (with credit to SA user W.T. Snacks for code cleanup)
// @description	Swaps positions of user-purchased ads and Javascript ads back to their original places on the page
// @include	http://forums.somethingawful.com/*
// ==/UserScript==

// identify key HTML elements; stop script if no banners are found
adBannerOma = document.getElementById('container').childNodes[5];
adBannerUser = document.getElementById('ad_banner_user');
if (!adBannerOma || !adBannerUser) return;
placeholder = adBannerOma.nextSibling;

// remove Javascript ad from top and put it where the user-purchased ad is located
adBannerOma.parentNode.removeChild(adBannerOma);
adBannerUser.parentNode.insertBefore(adBannerOma, adBannerUser);

// remove user-purchased ad from bottom and put it where the Javascript ad is located
adBannerUser.parentNode.removeChild(adBannerUser);
placeholder.parentNode.insertBefore(adBannerUser, placeholder);