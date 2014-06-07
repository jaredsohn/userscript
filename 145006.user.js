// ==UserScript==
// @name        Pet Train
// @include     http://www.tang-mo.com/pet.php
// @grant       none
// @require     https://gist.github.com/raw/3123124/grant-none-shim.user.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// ==/UserScript==

var counter = GM_getValue('counter', 0);
console.log('This script has been run ' + counter + ' times.');
GM_setValue('counter', ++counter);

//And of course your code!!
$(function(){
   setInterval(getTrainPet(),10000);
});