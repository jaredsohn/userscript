// ==UserScript==
// @name           Facebook 'Fuck Off!'
// @namespace      http://procrastibot.com
// @description    Turns Facebook 'Ignore' buttons into 'Fuck Off!' buttons
// @include        http://www.facebook.com/*
// ==/UserScript==
function $(element) { return document.getElementById(element); }

function process() {
  $('content').removeEventListener('DOMNodeInserted', process, false);
  var buttons = document.evaluate('//div//*[@value="Ignore"]', document, null, 6, null), button, i=0;
  while(button=buttons.snapshotItem(i++)) button.value = "Fuck Off!";
  $('content').addEventListener("DOMNodeInserted", process, false);
}

var checker=setInterval(function(){
    if($('content')) {
      clearInterval(checker);
      process();
    }
  }, 100);