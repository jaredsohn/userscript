// ==UserScript==
// @name           LyricWiki Anti-Disabler
// @namespace      http://www.reddit.com/user/absurdlyobfuscated/
// @description    Re-enables the right-click menu, Ctrl+A selection, and lyric selection on LyricWiki pages.
// @include        http://lyrics.wikia.com/*
// ==/UserScript==

function enableHighlighting(element)
{
  element.style.removeProperty("-moz-user-select");
  element.style.removeProperty("cursor");
}

function AntiDisable()
{
  var win = window.wrappedJSObject || window;
  if (win.$)
  {
    win.$(win.document).ready(function(){
      win.$("body").unbind("contextmenu");
      win.$(win).unbind("keypress");
      win.$(".lyricbox").each(function(i){enableHighlighting(this);});
    });
  }
  else
  {
    document.getElementsByClassName("gracenote-header")[0].parentNode.innerHTML = "";
  }
}

AntiDisable();
