// ==UserScript==
// @name           Kanji.Koohii: Review Failed
// @namespace      tag:http://forum.koohii.com/profile.php?id=2546,2007-05-29:ReviewFailed
// @description    Clicking on the failed cards stack will go into review mode instead of study mode
// @include        http://kanji.koohii.com/main.php
// ==/UserScript==

function changeElementLink(id, url) {
  var elem_div = document.getElementById(id)
  
  if (elem_div) {
    var links = elem_div.getElementsByTagName('a')
  
    if (links.length > 0) {
      links[0].href = url
    }
  }
}

changeElementLink('gbarv01_a', 'http://kanji.koohii.com/review/review.php?expired=1&box=1')
changeElementLink('gbarv11_a', 'http://kanji.koohii.com/review/review.php?expired=1&box=1&filt=rtk1')
changeElementLink('gbarv21_a', 'http://kanji.koohii.com/review/review.php?expired=1&box=1&filt=rtk3')