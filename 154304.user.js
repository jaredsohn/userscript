// ==UserScript==
// @name        Remove Reddit NoParticipation
// @namespace   redditnp
// @include     http://np.reddit.com/r/*
// @version     1
// ==/UserScript==

var npLink = document.location.href;
var newLink = npLink.replace('://np.', '://www.');
document.location.replace(newLink);