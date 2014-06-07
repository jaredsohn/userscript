// ==UserScript==
// @name           Gonintendo Uncensored!
// @namespace      http://www.gonintendo.com
// @description	   Uncensors censored words
// @include        http:*gonintendo.com/*
// ==/UserScript==


var profanity = new Array();
profanity[0] = /c\*ck/ig;
profanity[1] = /c\*\*\*/ig;
profanity[2] = /a\*\*\*\*\*\*/ig;
profanity[3] = /n\*\*\*\*\*/ig;
profanity[4] = /b\*\*\*\*/ig;
profanity[5] = /f\*\*\*/ig;
profanity[6] = /f\*cking/ig; 
profanity[7] = s*** 

var body = document.getElementsByTagName("body")[0].innerHTML;

document.body.innerHTML = document.body.innerHTML.replace(profanity[0], "cock");

document.body.innerHTML = document.body.innerHTML.replace(profanity[1], "crap");

document.body.innerHTML = document.body.innerHTML.replace(profanity[2], "asshole");

document.body.innerHTML = document.body.innerHTML.replace(profanity[3], "nigger");

document.body.innerHTML = document.body.innerHTML.replace(profanity[4], "bitch");

document.body.innerHTML = document.body.innerHTML.replace(profanity[5], "fuck");

document.body.innerHTML = document.body.innerHTML.replace(profanity[6], "fucking");