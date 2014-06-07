
// ==UserScript==
// @name           Marca Augmented
// @namespace      http://userscripts.org/scripts/source/96602.user.js
// @description    Shows biographic information from Wikipedia for each goal-scorer in a match summary, from the referee and from the teams.
// @author		   Lukasz Gradzki 
// @author		   Ivan Sein Santiago
// @author		   David Anton Saez
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview  http://www.marca.com/marcador/futbol/2011_12/europa_league/1a_fase/jornada_6/grupo_i/atm_ren/
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet(" Ver biografia").
  WhenOnWall("*.marca.com/*marcador/*futbol*").
   SelectBrick("//div[@class='goleador']/text()").
   ExtractContent("(.*)([^(),s<>])*").As("$player_name").// text before "([^(),s<>])*"
  InlayLever("link").At("after","$player_name").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.google.com/search?sourceid=navclient&btnI=1&q=futbolista+site:wikipedia.org+$player_name").
   SelectBrick("//table[@class='infobox vcard' or @class='infobox_v2' and position()=1]").
   ExtractContent("(.*)").As("$biography").// text in table
  StickNote("<div style=\"margin: 20px 10px;\">$biography</div>"),

 Sticklet("$equipo").
  WhenOnWall("*.marca.com/*marcador/*futbol*").
   SelectBrick("//div[@class='equipo' and (position()=2 or position()=5)]").
   ExtractContent("(.*)").As("$equipo").// text
  InlayLever("link").At("upon","$equipo").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.google.es/search?sourceid=navclient&btnI=1&q=site:wikipedia.org+futbol+$equipo").
   SelectBrick("//div[@class='mw-content-ltr' and position()=4]/p[1]").
   ExtractContent("(.*)").As("$info").// text
  StickNote("<div style=\"margin: 20px 10px;\">$info</div>"),

 Sticklet("Ver biografia").
  WhenOnWall("*.marca.com/*marcador/*futbol*").
   SelectBrick("//div[@class='texto' and position()=2]/h5").
   ExtractContent("^(.*)$").As("$arbitro").// text
  InlayLever("link").At("after","$arbitro").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.google.es/search?sourceid=navclient&btnI=1&q=site:worldreferee.com+$arbitro").
   SelectBrick("//div[@class='page']").
   ExtractContent("(.*)").As("$arbbio").// text
  StickNote("<div style=\"margin: 20px 10px;\">$arbbio</div>")]);