// ==UserScript==
// @name           Instructables - large images
// @namespace      b0at.tx0.org
// @include        http://www.instructables.com/id/*
// @version        1
// ==/UserScript==

Array.forEach(
  document.getElementsByTagName("img"),
  function ($el)
  {
    $el.src = $el.src
      .replace(/[.](?:TINY|SMALL|THUMB|MEDIUM)[.]/, ".LARGE.") // usually see "thumb" and "medium" on a page, "original" not always available for some reason
//      .replace(/\binstructables\.com\//, "instructables.com.nyud.net/") // to pull through Coral Cache
    ;
  }
);



/*

copied from some image's page:

Available Sizes
ORIGINAL(683x512) -- definitely not always available, medium (zoomed-in default) and large seem to be
TINY(48x48)
SQUARE(75x75)
SQUARE2(130x130)
THUMB(100x75)
SMALL(240x180)
MEDIUM(560x420)
LARGE(683x512) 

*/