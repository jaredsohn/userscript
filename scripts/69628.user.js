// ==UserScript==
// @name          ComicBookDB Covers
// @namespace     http://localhost
// @description   Makes cover images a little larger.
// @include       http://*comicbookdb.com/*
// @version       0.1
// ==/UserScript==

  src = document.body.innerHTML;

  src = src.replace(/_thumb/g,"_large");
  src = src.replace(/width=\"100\"/g,"width=\"200\"");

  document.body.innerHTML = src;