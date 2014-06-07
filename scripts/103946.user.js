// ==UserScript==
// @name           Goolicious
// @namespace      http://webaugmentation.org/examples/Goolicious
// @description    Augment Google search result urls with information about the same url in Delicious. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @author         Iñigo Illan
// @onekin:sticklet
// @sticklet:preview   http://www.google.com/search?q=mashup  
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Tagged as ...").
  WhenOnWall("www.google.*/search*").
   SelectBrick("//a[@class='l']/@href").ExtractContent("(.*)").As("$link").
  InlayLever("link").At("after","$link").
  OnTriggeringLeverBy("click").
  LoadNote("https://previous.delicious.com/url?url=$link").
   SelectBrick("//ul[@class='sidebar section' and position()=3]").ExtractContent("(.*)").As("$tagcloud"). 
  StickNote("$tagcloud")]);