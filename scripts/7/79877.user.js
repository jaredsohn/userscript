// ==UserScript==
// @name          750words Fixes
// @namespace     http://ironfroggy.net/userscripts
// @description	  A few fixes I like in 750words.com
// @include       http://750words.com/*
// ==/UserScript==

$(document).ready(function(){
  $("#entry_body").css("border-bottom", "1px dashed grey");
  $("#entry_body_counter").css({position: "relative", top: "-170px"});
});