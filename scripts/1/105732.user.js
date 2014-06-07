// ==UserScript==
// @name           Threadless Designs First
// @namespace      overkill_gm
// @description    Show the design image instead of people
// @include        http://www.threadless.com/product/*
// ==/UserScript==

$ = unsafeWindow.$;

function clickFirst(){
  var thumbs = $('#product_container div.galleria-thumbnails > div.galleria-image');
  if (thumbs.length) thumbs.eq(0).click();
  else {
    setTimeout(clickFirst, 200);
  }
}

$(window).load(function(){
  clickFirst();
});