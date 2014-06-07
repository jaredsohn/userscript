// ==UserScript==
// @name           PortableApp
// @namespace      http://webaugmentation.org/examples/PortableApp
// @description    Find your SW as a portable App
// @include        *
// @include        about:blank?Sticklet
// @author         Mikel Zorrilla 
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview  http://sourceforge.net/directory/os:windows/freshness:recently-updated/?q=c%2B%2B
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("PortableApp").
  WhenOnWall("http://sourceforge.net/*").
   SelectBrick("//div[@class='project_info' and position()=1]//span").
   ExtractContent("^(.*)$").As("$sw").// text
  InlayLever("button").At("after","$sw").
  OnTriggeringLeverBy("click").
  LoadNote("http://portableapps.com/search/node/$sw").
   SelectBrick("//dl[@class='search-results node-results']").
   ExtractContent("(.*)").As("$portablesw").// text
  StickNote("$portablesw")]);