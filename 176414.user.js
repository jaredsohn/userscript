// ==UserScript==
// @name       My Fancy New Hello World Userscript
// @namespace  http://www.w5nra.com/
// @version    0.0.1a
// @description  Just testing my first script for Tampermonkey
// @match      http://www.w5nra.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require    http://cdnjs.cloudflare.com/ajax/libs/sugar/1.3/sugar.min.js

// @copyright  2013+, Terry Pendergrass
// ==/UserScript==
alert('Hello, I got jQuery included and sugarJs too');
alert('Well, somehow this stupid thing changes the fonts on my menu too');
 
var runEverySecond = function(){
  $('p').find('img').attr('width', '0px');
  $('a').css('padding', '0px');
 
  console.debug('Hello Word has ' + $('p').length + ' paragraphs');
};
 
$(document).ready(function() {
    setInterval(runEverySecond,1000);
});