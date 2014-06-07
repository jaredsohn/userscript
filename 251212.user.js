// ==UserScript==
// @name        Spreeder Hider
// @namespace   benow.ca
// @include     http://www.spreeder.com/
// @version     1
// @grant       none
// ==/UserScript==
addEventListener('load',function() {
document.getElementById('maincontent2').style.backgroundColor='black';
document.getElementById('nav').style.display='none';
document.getElementById('header').style.display='none';
document.getElementById('container').style.backgroundColor='black';
document.getElementById('main').style.backgroundColor='black';
document.querySelectorAll('.bgwhte')[0].style.backgroundColor='black';
document.getElementsByTagName('body')[0].style.backgroundColor='black';
document.querySelectorAll('.window')[0].style.marginBottom='250px';
});