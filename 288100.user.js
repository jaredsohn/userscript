// --------------------------------------------------------------------
// ==UserScript==
// @name          Facebook: auto poke
// @description  auto poke
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// ==/UserScript==

setInterval(kock1,11111);

function kock1() {
var tags = document.getElementsByTagName('a');
 
for(var i = 0 ; i < tags.length ; i++){
  if(tags[i].getAttribute('class') == '_42ft _4jy0 _4jy3 _4jy1 selected' && tags[i].getAttribute('data-gt') == null){
    tags[i].click();
  }
}
}
