// ==UserScript==
// @name           Format #exibitions Oo.
// @namespace      saviski
// @description    Format the video views count.
// @include        https://www.youtube.com/watch*
// ==/UserScript==

var exibitions;
if (exibitions = unsafeWindow.document.getElementsByClassName('watch-view-count'))
  exibitions[0].innerHTML = new String(Number(exibitions[0].textContent))
  .split(/(?=(?:\d{3})*$)/)
  .join('<span style="font-size: 85%">');