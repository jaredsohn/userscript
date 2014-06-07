// ==UserScript==
// @name          deviantArt forum first-post cleanup and ad remover
// @author        GerbilEater
// @description   Make thread's first post have full width and normal height. Removes advertisement box.
// @include       http://forum.deviantart.com/*
// ==/UserScript=
  var abmfs = document.getElementById('ad-blocking-makes-fella-sad');
  if (abmfs) abmfs.style.display = 'none';
  var daf = document.getElementById('forum');
  if (daf) {
    daf.style.minHeight = '0';
    var a = daf.childNodes[1], b = a.nextSibling;
    if (a.firstChild.nodeValue === 'Advertisement') a.style.display = 'none';
    if (b.className === 'comments') {
      b.style.minHeight = '0';
      b.style.paddingRight = '0';
    }
  }