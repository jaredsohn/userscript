// ==UserScript==
// @name           TiempoBilbao
// @namespace      http://webaugmentation.org/examples/BookBurroFirst
// @description    . Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://www.eltiempo.es/bilbao.html
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Tiempo en accuweather").
  WhenOnWall("*.eltiempo.es/bilbao.html").
   SelectBrick("//td[@class='town' and position()=2]/a").
   ExtractContent("(.*)").As("$tiempo").// text in link
  InlayLever("link").At("after","$tiempo").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.accuweather.com/es/es/$tiempo/309382/weather-forecast/309382").
   SelectBrick("//div[@class='strong panel' and @id='panel-main']/div[@class='panel-body-lt' and position()=2]").
   ExtractContent("(.*)").As("$price").// text
  StickNote("<u><b> Precio en Powells </b></u>$price")]);