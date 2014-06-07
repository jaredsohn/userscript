// ==UserScript==
// @name           boxopus Auto Downloader Rev 2014
// @description    Automatically download From boxopus
// @author         Andri Laras 
// @version        1.0.1
// @date           04-05-2014
//@include        http://boxopus.com/*
// @match          http://*boxopus.com/*
// ==/UserScript==


function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

$(document).ready(function(){
console.log(userId);
});