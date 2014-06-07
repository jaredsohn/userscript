// ==UserScript==
// @name          Shocker Sites
// @description    Blocks Shock Sites
// @include       http://*nimp.org*
// @include       http://*on.nimp.org*
// @include       http://*lemonparty.org*
// @include       http://*meatspin.com*
// @include       http://encyclopediadramatica.com/Offended
// @include       http://*mudfall.com*
// @include       http://*youaresogay.com*
// @include       http://*bagslap.com*
// @include       http://*hai2u.com*
// @include       http://*cyberscat.com*
// @include       http://*detroithardcore.com*
// @include       http://*goatse.ca*
// @include       http://*thewillpower.org*
// @include       http://*supermodelsfart.com*
// @include       http://*blacksnake.com*
// @include       http://*tubgirl.com*
// @include       http://*fuck.org*
// @include       http://*cherryCake.org*
// @include       http://*jiztini.com*
// @include       http://*tubboy.net*
// @include       http://*2girls1cup.com*
// @include       http://*Goatse.cx*
// @include       http://*mongface.com*
// @include       http://*ProlapseMan.com*
// @include       http://*pimpmygoogle.com*
// @include       http://*wowong.com*
// @include       http://*kids-in-sandbox.com*
// @include       http://*rotten.com*
// @include       http://*goatse.fr*
// @include       http://*zoy.org* 
// @include       http://*theync.com*
// @include       http://*snuffx.com*
// @include       http://*bluewaffle.net*
// @include       http://*specialfriedrice.net*





// ==/UserScript==

 var regex = "/nimp/igm";
 var haystack = window.location.href;
  
 var matches = haystack.match(regex);
  
 //alert(haystack);
 if(matches == null)
 {
 var b = (document.getElementsByTagName("body")[0]);
 b.setAttribute('style', 'display:none!important');
 alert("Shock Site, be careful.");
 }
 else{
var b = (document.getElementsByTagName("body")[0]);
 b.setAttribute('style', 'display:none!important');
 alert("Shock Site, be careful.");
}