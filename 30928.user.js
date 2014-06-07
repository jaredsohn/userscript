//  Copyright (c) 2008 Lucio Riccardi


// ==UserScript==
// @name          Private delicious
// @namespace     http://delicious
// @description   Checks "do not share" by default on new delicious
// @include       http://delicious.com/*
// ==/UserScript==

document.getElementById("share").checked=true;
