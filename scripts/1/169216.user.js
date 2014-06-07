// ==UserScript==
// @name       G+ friend suggestion remover
// @namespace  
// @version    0.1
// @description  Removes the friend suggestions polluting the top of the G+ stream
// @match      https://plus.google.com/*
// ==/UserScript==

var uselessFriendSuggestions = document.querySelector('div[guidedhelpid="friendsuggestions"]');
uselessFriendSuggestions.style.display = 'none';