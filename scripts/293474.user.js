// ==UserScript==
// @name        HS Paywall Remover
// @namespace   HS.paywall.remover
// @description Removes HS paywall
// @author      Martti Natunen
// @include     http://www.hs.fi
// @include     http://www.hs.fi/*
// @include     https://www.hs.fi/*
// @version     1.0
// @grant       none
// ==/UserScript==

while (localStorage.length) localStorage.removeItem(localStorage.key(0));