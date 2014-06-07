// ==UserScript==
// @name           Enlaces internos de la wikipedia aumentados
// @namespace      http://webaugmentation.org/examples/wikiIntro
// @description    Augment English Wikipedia pages loading the first paragraph of each internal link.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://en.wikipedia.org/wiki/Lycoming_County,_Pennsylvania
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("[+]").
  WhenOnWall("*en.wikipedia.org/wiki/*").
   SelectBrick("//*[@id=\"mw-content-text\"]/p/a").
   ExtractContent("^(.*)$").As("$enlace").// text
  InlayLever("link").At("after","$enlace").
  OnTriggeringLeverBy("click").
  LoadNote("$enlace").
   SelectBrick("//div[@class='mw-content-ltr' and @id='mw-content-text']/p[1]").
   ExtractContent("^(.*)").As("$primerParrafo").// text
  StickNote("$primerParrafo")]);