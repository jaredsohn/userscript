// ==UserScript==
// @name        bb2
// @namespace   bang
// @include     https://secure.bankofamerica.com/myaccounts/*
// @version     1
// @grant       none
// ==/UserScript==


document.body.innerHTML= document.body.innerHTML.replace(/20,/g,"5,");
document.body.innerHTML= document.body.innerHTML.replace(/19,/g,"4,");
document.body.innerHTML= document.body.innerHTML.replace(/18,/g,"3,");
document.body.innerHTML= document.body.innerHTML.replace(/21,/g,"6,");
document.body.innerHTML= document.body.innerHTML.replace(/22,/g,"7,");
document.body.innerHTML= document.body.innerHTML.replace(/23,/g,"8,");
document.body.innerHTML= document.body.innerHTML.replace(/24,/g,"9,");
document.body.innerHTML= document.body.innerHTML.replace(/25,/g,"10,");
document.body.innerHTML= document.body.innerHTML.replace(/16,/g,"1,");
document.body.innerHTML= document.body.innerHTML.replace(/17,/g,"2,");