// ==UserScript==
// @name        Sort Reverse
// @namespace   http://userscripts.org/users/518700
// @include     https://www.wowace.com/store/
// @include     https://www.wowace.com/store/orders/*
// @grant       none
// @description Change the item codes link in the wowace.com store so that it is sorted in reverse by default.
// @version     2
// ==/UserScript==
$('"[href="/home/item-codes/"]').attr("href", "/home/item-codes/?sort=-order")