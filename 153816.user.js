// ==UserScript==
// @name           TranslateFBStatus
// @namespace      http://webaugmentation.org/examples/GetProfessionalProfile
// @description    go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @author Leticia Montalvillo-Mendizabal
// @onekin:sticklet
// @sticklet:preview https://www.facebook.com/pages/BEAUTIFUL-PLANET-EARTH/198320350202343
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("TranslateFBStatus").
  WhenOnWall("*.facebook.com/*").
  SelectBrick("//span[@class='userContent']").
  ExtractContent("(.*)").As("$status").
  InlayLever("link").At("after","$status").
  OnTriggeringLeverBy("click").
  LoadNote ("http://translate.google.es/?sl=auto&tl=es&q=$status").
  SelectBrick("//span[@class='short_text' and @id='result_box']").
  ExtractContent("(.*)").As("$newStatus").
  StickNote("$newStatus")]);
  