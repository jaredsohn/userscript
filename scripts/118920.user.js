// ==UserScript==
// @name           Marca Biography
// @author	   Lukasz Gradzki
// @namespace      http://userscripts.org/scripts/source/96602.user.js
// @description    Shows biographic information from Wikipedia for each goal-scorer in a match summary.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://www.marca.com/eventos/marcador/futbol/2012_13/primera/jornada_24/rma_ray/
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
Sticklet(" Ver biografía").
WhenOnWall("*.marca.com/*").
SelectBrick("//div[@class='goleador']/text()").
ExtractContent("(.*)([^\(\),\s\<\>])*").As("$player_name").
InlayLever("link").At("after","$player_name").
OnTriggeringLeverBy("click").
LoadNote("http://www.google.com/search?sourceid=navclient&btnI=1&q=futbolista+site:wikipedia.org+$player_name").
SelectBrick("//table[@class='infobox vcard' or @class='infobox_v2' and position()=1]").
ExtractContent("(.*)").As("$biography").
StickNote("<div style=\"margin: 20px 10px;\">$biography</div>")
]);
