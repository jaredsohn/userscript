// ==UserScript==
// @name           Fnac precios
// @author	   Lukasz Gradzki
// @namespace      http://userscripts.org/scripts/source/96602.user.js
// @description    Comparar los precios en Fnac con los precios en las tiendas online.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://www.fnac.es/Sony-Xperia-Z-Negro-Telefono-movil-Smartphone/a862203#bl=HGACblo5
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
Sticklet("Precios en Tiendas On-Line").
WhenOnWall("*.fnac.es/*").
SelectBrick("//strong[@class='titre dispeblock']").ExtractContent("(.+)").As("$item_name").
//SelectBrick("//ul[@class='noir']/li | //div[@class='noir' and position()=2]/div").ExtractContent("(.*)").As("$locator").
InlayLever("button").At("before","$item_name").
OnTriggeringLeverBy("click").
LoadNote("http://shopping.kelkoo.es/ss-$item_name.html").
SelectBrick("//li[@class='price' and position()=2] | //li[@class='details offer sale' and position()=1]").
ExtractContent("(.*)").As("$precios").
StickNote("<div style=\"margin: 20px 10px -25px 10px; padding-top: 20px; float:clear\">$precios</div>")
]);