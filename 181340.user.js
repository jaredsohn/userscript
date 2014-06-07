// Yahoo! Old Favicon ['09-'13]
// 2013
// from FalkeXY 2013
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Yahoo! Old Favicon ['09-'13]
// @description   Replaces Yahoos Favicon with the one from 2009 to 2013 - by FalkeXY
// @include       htt*://*.yahoo.*/*
// @include       htt*://yahoo.*/*
// @version       1.0
// ==/UserScript==

var pitas = document.createElement('link');
pitas.setAttribute('rel', 'shortcut icon');
pitas.setAttribute('href', "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbgJqAIoCdgCaAnoAnhKCAKYijgCuLpIAskKeALpSpgC+Yq4AzHy8ANqezgDmvt4A7tLqAPz5+wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKlRFIoABWAKERERE6ADcKMzzu2hOgAAhERK8REWCWBERE36ERMHMEREvo6iEgY6hEn6Pu0mAzqkz/xjMzoDNwpERERDoAMzAKlERIoAAzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AADAOQAAgBkAAAAPAAAACQAAAAkAAAAIAAAACAAAAAgAAIAYAADAOAAA//8AAP//AAD//wAA");

var head = document.getElementsByTagName('head')[0];
head.appendChild(pitas);

// 1.0	Initial release.