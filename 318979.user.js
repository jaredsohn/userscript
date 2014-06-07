// ==UserScript==
// @name        brb.to fix series URL
// @description Start with last watched episode
// @namespace   denisix
// @version     1.0
// @grant       none
// @include     http://brb.to/*
// @match       http://brb.to/*
// ==/UserScript==

/* https://gist.github.com/raw/2625891/waitForKeyElements.js */
function waitForKeyElements(b,a,h,g){var d,f;if(typeof g=="undefined"){d=$(b)}else{d=$(g).contents().find(b)}if(d&&d.length>0){f=true;d.each(function(){var k=$(this);var l=k.data("alreadyFound")||false;if(!l){var j=a(k);if(j){f=false}else{k.data("alreadyFound",true)}}})}else{f=false}var c=waitForKeyElements.controlObj||{};var i=b.replace(/[^\w]/g,"_");var e=c[i];if(f&&h&&e){clearInterval(e);delete c[i]}else{if(!e){e=setInterval(function(){waitForKeyElements(b,a,h,g)},300);c[i]=e}}waitForKeyElements.controlObj=c};

function fixHistory() {
  $f().onStart(function (clip) {
    var clipUrl = 'http://brb.to/video/serials/view/i' + clip.fsData.item_id + '?play&file=' + clip.fsData.file_id + '&a=1'
    history.replaceState(null, document.title, clipUrl)
  })
}

waitForKeyElements ("#player", fixHistory)
