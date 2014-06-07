// ==UserScript==
// @name	        GrooveShark Pirated Edition
// @namespace	        https://bitbucket.org/manishchiniwalar/grooveshark-pirated-edition
// @description	        GreaseMonkey script and Chrome Extension to Enable VIP Features and more for free.
// @include		http://grooveshark.com/*
// @include		http://retro.grooveshark.com/*
// @include		https://grooveshark.com/*
// @include		https://retro.grooveshark.com/*
// ==/UserScript==


var plus = function(){
   a="plus";
   return a;
}

var yes = function(){
   return true;
}

unsafeWindow.onload=function(){
   unsafeWindow.GS.user.IsPremium = true;
   unsafeWindow.GS.user.getVipPackage = plus;
   unsafeWindow.GS.user.subscription.canListenUninterrupted = yes;
   unsafeWindow.GS.user.subscription.canHideAds = yes;
   unsafeWindow.GS.user.updateAccountType("plus");
}
