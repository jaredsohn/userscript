//  Copyright (c) 2010 Zahary Karadjov


// ==UserScript==
// @name          Private Delicious
// @namespace     http://delicious
// @description   Checks "Make Private" by default on new delicious
// @include       http://www.delicious.com/*
// ==/UserScript==

document.getElementById("savePrivate").checked=true;