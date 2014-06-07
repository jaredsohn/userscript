// ==UserScript==

// @name CoreOnline
// @run-at document-start
// ==/UserScript==
var fake_navigator = {};

for (var i in navigator) {
  fake_navigator[i] =  navigator[i];
}

fake_navigator.platform = 'Windows';

navigator = fake_navigator;