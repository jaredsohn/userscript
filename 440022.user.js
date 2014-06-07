// ==UserScript==
// @name            Imgur - Autohide and downvote Viralizer
// @description     The joke's on Imgur!
// @version         1.0
// @author          zeda
// @homepageURL     userscripts.org/scripts/show/440022
// @updateURL       https://userscripts.org/scripts/source/440022.meta.js
// @include         http://*.imgur.com/*
// ==/UserScript==


javascript:(function(){var a=document.getElementsByClassName("caption");for(var i=0;i<a.length;i++)if(a[i].getElementsByClassName("generated-comment").length==1)a[i].getElementsByClassName("arrow down")[0].click();var i,tags=$(document.getElementsByClassName("generated-comment")).parent("div").parent("div").parent("div").parent("div"),total=tags.length;for(i=0;i<total;i++){tags[i].style.display="none"}})();