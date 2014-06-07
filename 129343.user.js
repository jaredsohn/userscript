// ==UserScript==
// @name           Baskonia clasificacion
// @author	   	   Lara Regidor
// @namespace      http://userscripts.org/scripts/source/96602.user.js
// @description    Conjunto de Stikclets que aÒaden informacion disponible en El Correo sobre el Baskonia en su pagina oficial.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://www.baskonia.com/es/
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
Sticklet("<center>Clasificaci&oacute;n de la ACB</center>").
WhenOnWall("*.baskonia.com/*").
//SelectBrick("//img[@class='flota_izq']").
SelectBrick("//img[@class='flota_izq']").ExtractContent("(.*)").As("$posicion").
//SelectBrick("//ul[@class='noir']/li | //div[@class='noir' and position()=2]/div").
//ExtractContent("(.*)").As("$locator").
InlayLever("button").At("after","$posicion").
OnTriggeringLeverBy("click").
LoadNote("http://baskonia.elcorreo.com/competiciones/baloncesto-acb/clasificacion-acb.html").
SelectBrick("//div[@class='clasificacion']").
ExtractContent("(.*)").As("$clasificacion").
StickNote("<div style=\"margin: 20px 10px -25px 10px; padding-top: 20px; float:clear\">$clasificacion</div>"),

Sticklet("<center>Lo mas leido sobre el BKN en El Correo</center>").
WhenOnWall("*.baskonia.com/*").
//SelectBrick("//img[@class='flota_izq']").
SelectBrick("//img[@class='flota_izq']").ExtractContent("(.*)").As("$posicion").
//SelectBrick("//ul[@class='noir']/li | //div[@class='noir' and position()=2]/div").
//ExtractContent("(.*)").As("$locator").
InlayLever("button").At("before","$posicion").
OnTriggeringLeverBy("click").
LoadNote("http://baskonia.elcorreo.com/").
SelectBrick("//div[@class='HScontent']/div[@class='vocesB']").
ExtractContent("(.*)").As("$nube").
StickNote("$nube")
]);