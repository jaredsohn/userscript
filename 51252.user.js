// ==UserScript==
// @name	phpBB Signature Hider
// @namespace	happinessiseasy
// @include	http://www.phpbb.com/community/*
// @description	Hides users' signatures on phpBB3 forums
// @version	1.2
// ==/UserScript==

//Don't forget to include the URLs of the forums you want to use it on!

(function()
{
 var allSigs = document.getElementsByTagName('div');
 for (var i = 0 ; i < allSigs.length ; i++)
 {
  if(allSigs[i].className == "signature")
  {
   allSigs[i].parentNode.removeChild(allSigs[i]);
  }
 }
})();