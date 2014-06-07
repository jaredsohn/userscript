// ==UserScript==
// @name           juegox
// @namespace      juegox
// @description    Para comparar videojuegos.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://www.amazon.es/Call-Duty-Modern-Warfare-3/dp/B005I48VR2
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("comparalo en otros....").
  WhenOnWall("*.amazon.es/*").
   SelectBrick("//span[@id='btAsinTitle']").
   ExtractContent("(.*)").As("$title").// text
  InlayLever("link").At("after","$title").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.zavvi.es/elysium.search?search=$title").
   SelectBrick("//div[@class='item item-games-platforms-ps3 unit size-1of3 grid thg-track' and position()=1]//div[@class='price' and position()=1]/span").
   ExtractContent("(.*)").As("$price").// text
  StickNote("<u><b> Precio sobre este producto </b></u>$price")]);