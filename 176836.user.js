// ==UserScript==
// @name        Firefox Instagram Fix
// @description Bandaids Instagram to not break on newer versions of Firefox
// @namespace   Mithorium
// @include     htt*://instagram.com/*
// @exclude     htt*://instagram.com/p/*
// @version     1.2
// @grant       none
// ==/UserScript==


var payload = function(){
$("body").on("click","a",function(e){ if (this.href === "javascript:;" || this.href == "") return; window.open(this.href); e.stopPropagation(); return false; });
};

setTimeout(payload, 0);