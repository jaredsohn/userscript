// ==UserScript==
// @name           WoW Forum Signature Remover
// @namespace      WoW
// @description    Removes signatures from World of Warcraft forums
// @include        http://forums.wow-europe.com/*
// @include        http://forums.worldofwarcraft.com/*
// ==/UserScript==

 
var sigs = document.getElementsByTagName('ins');

if (sigs.length) {
  for ( var i = 0; i < sigs.length; i ++ ) {
    var sig = sigs[i];
    sig.innerHTML = '';
    while (sig = sig.nextSibling)  { 
      sig.data = '';
      if (sig.style) sig.style.display = 'none';
    }
  }
 }

