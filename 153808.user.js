// ==UserScript==
// @name           RelatedNews - Ibai Vitoria y Ugaitz Elias
// @namespace      http://webaugmentation.org/examples/RelatedNews
// @description    Augment news from elpais.com with more related news. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://elpais.com/
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet(" - Related news").
  WhenOnWall("*elpais.com*").
   SelectBrick("//h2/a").
   ExtractContent("(.*)").As("$title").// text in link
  InlayLever("link").At("after","$title").
  OnTriggeringLeverBy("click").
  LoadNote("https://www.google.es/search?q=$title").
   SelectBrick("//li[@class='g']//h3[@class='r']").
   ExtractContent("(.*)").As("$google_links").// text in link
  StickNote("<u><b> More related news </b></u><br><p>$google_links</p>")]);