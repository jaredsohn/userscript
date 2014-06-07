// ==UserScript==
// @name        ReplaceSpecialCharacter
// @namespace   http://userscripts.org/users/67612
// @description Replace Special Characters
// @grant       none
// @include     *
// @exclude     *userscripts.org/*
// @exclude	*quora.*
// @version     1.0.0.1
// ==/UserScript==

document.body.innerHTML= document.body.innerHTML.replace(/[’‘]/g,"'");
document.body.innerHTML= document.body.innerHTML.replace(/[“”]/g,"\"");
document.body.innerHTML= document.body.innerHTML.replace(/[—]/g,"--");