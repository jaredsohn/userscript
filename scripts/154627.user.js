// ==UserScript==
// @name        Remove Reddit NoParticipation (includes www.np links)
// @namespace   redditnp
// @include     http://www.np.reddit.com/r/*
// @include     http://np.reddit.com/r/*
// @version     1.2
// @run-at      document-start
// ==/UserScript==

document.location.replace(document.location.href.replace('://www.np.', '://www.').replace('://np.', '://www.'));