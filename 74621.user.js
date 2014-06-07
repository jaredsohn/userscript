// ==UserScript==
// @name          Facebook Simplifier
// @fullname      Facebook Simplifier
// @author        Yukiseaside
// @version       2010-04-17
// @license       MIT License
// @namespace     http://userscripts.org/scripts/show/74621
// @description   Simplify your Facebook regluar homepage
// @include       http://www.facebook.com/*
// @unwrap
// ==/UserScript==

function fbsim(){
  document.getElementById('contentCol').removeChild('rightCol');
  setTimeout(A,1000);
}
fbsim();