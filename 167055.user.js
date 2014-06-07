// ==UserScript==
// @name           Moodle Ehu
// @namespace      http://webaugmentation.org/examples/Moodle
// @description    Obtiene el plan de estudios de EHU de la asignatura seleccionada
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @grant none
// @onekin:sticklet
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Plan de estudios").
  WhenOnWall("http://moodle4.ehu.es/*").
   SelectBrick("//div[@class='coursebox clearfix']/div[@class='info' and position()=1]/div[@class='name']/a").
   ExtractContent("^(.*)$").As("$asignatura").// text in link
  InlayLever("link").At("after","$asignatura").
  OnTriggeringLeverBy("click").
  LoadNote("https://www.google.es/search?safe=off&biw=1366&bih=667&output=search&sclient=psy-ab&q=$asignatura+site:www.ehu.es").
   SelectBrick("//li[@class='g' and position()=1]//a/@href").
   ExtractContent("(.*)").As("$url").// text in cell
  LoadNote("$url").
   SelectBrick("//div[@id='menupestaina']/ul").
   ExtractContent("(.*)").As("$guia").// text in cell
  StickNote("$guia")]);
