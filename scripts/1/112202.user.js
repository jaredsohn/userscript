// Jn Blocking script
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// ==UserScript==
// @name Slowbrowser 0.01
// @namespace nikinNS
// @slow down browsing
// @include *.hu*
// @include *blog*
// @include *video*
// @include *youtube*
// @exclude http://diveintogreasemonkey.org/*
// @exclude http://www.diveintogreasemonkey.org/*
// ==/UserScript==
//
//
cLockMessageString = "Mennyi ";

function redisplay() {
  var num01=Math.floor(Math.random()*39)+10;
  var num02=Math.floor(Math.random()*39)+10;
  var lockKey=num01+num02;
  if (prompt(cLockMessageString+num01+'+'+num02+' ?',"") == lockKey) {
    dress = document.getElementsByTagName('body');
    dress[0].style.display="block";
  } 
}

//////////////////////////////////////////

dress = document.getElementsByTagName('body');
dress[0].style.display="none";
redisplay();