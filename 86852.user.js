// ==UserScript==
// @name           Enable Text Selection on Bing Lyrics
// @namespace      http://userscripts.org/users/129833
// @description    Re-enables the ability to select text on Bing Lyrics.
// @include        http://www.bing.com/music/lyrics/detail?q=*
// ==/UserScript==
function unicornMagic() {
  var unicorn = unsafeWindow.document.getElementById("lyrics_wrapper");
  unicorn.onselectstart = undefined;
  unicorn.onmousedown = undefined;
  unsafeWindow.document.onselectstart = undefined;
  unsafeWindow.document.onmousedown = undefined;
  unsafeWindow.oncontextmenu = undefined;
  unicorn = unsafeWindow.document.getElementById("lyrics_content");
  unicorn.onclick = undefined;
  unicorn.oncontextmenu = undefined;
  unsafeWindow.preventselect = function(){return false;};
}

unicornMagic();
