// ==UserScript==
// @name RedHotPawn - Skip ad
// @author davidbest 
// @namespace http://userjs.org/ 
// @version 1.0
// @description  Skips the redhotpawn.com advertisement pages that
//			appear periodically between moves for
//			non-subscribers, and forwards straight to the
//			game.
// @ujs:category site: enhancements
// @ujs:published 2006-01-08 11:58
// @ujs:modified 2006-01-08 12:04
// @ujs:documentation http://userjs.org/scripts/site/enhancements/redhotpawn-skip-ad 
// @ujs:download http://userjs.org/scripts/download/site/enhancements/redhotpawn-skip-ad.js 
// @include http://www.redhotpawn.com/*
// @include http://www.chessatwork.com/*
// @include http://www.redhotchess.com/*
// @include http://www.timeforchess.com/*
// ==/UserScript==


/* 
 * This script is granted to the Public Domain.
 */

if(location.href.search("subsnag")!= -1) {
  if(location.href.search("newgame")== -1) {
    window.location.href="http://www.redhotpawn.com/core/playchess.php?nonag=true&"+location.search.substr(1);
  }
}