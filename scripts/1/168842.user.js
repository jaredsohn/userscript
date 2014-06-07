// ==UserScript==
// @name        JVCTrollface
// @description Remplace :trollface: par une trollface
// @include     http://www.jeuxvideo.com/*
// @include     http://*.forumjv.com/*
// @version     1.0.0
// ==/UserScript==

// J'ai honte de ce script une ligne, mais il fallait bien que quelqu'un le fasse...
document.documentElement.innerHTML = document.documentElement.innerHTML.replace(':trollface:', '<img src="http://image.noelshack.com/fichiers/2013/22/1369758923-trollface.png" alt="Problem ?">');