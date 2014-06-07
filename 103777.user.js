// ==UserScript==
// @name          gc4all
// @namespace     http://gc4all.local
// @description   Greasemonkey script that unlocks Premium Member only functionalities on Geocaching.com maps
// @include       http://www.geocaching.com/map/beta/*
// @version       0.0.1
// ==/UserScript==

unsafeWindow.userSession['subscriberType_'] = 2;
unsafeWindow.userSession['enablePersonalization_'] = 'true';
