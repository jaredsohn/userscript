// ==UserScript==
// @name           Compara Precio Electronicos
// @namespace      http://webaugmentation.org/examples/ComparaPrecioElectronicos
// @description    Comparing prices of electronic products in redcoon.es with fnac.es 
                 //and pixmania.com.
// @include        *
// @include        about:blank?Sticklet
// @author Ana Apostol, Unai Burgos y Mikel Zorrilla 
// @require        http://userscripts.org/scripts/source/96602.user.js
// @sticklet:preview http://www.redcoon.es/B417576-Toshiba-Satellite-L850-1J9_Port%C3%A1tiles
// @onekin:sticklet
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Compara los precios de los dispositivos electr&oacute;nicos").
  WhenOnWall("*redcoon.es/*").
   SelectBrick("//h1[@class='pagetitle']/span[1]").ExtractContent("(.*)").As("$product").// text
  InlayLever("button").At("after","$product").
  OnTriggeringLeverBy("click").
  LoadNote("http://busqueda.fnac.es/search/quick.do?text=$product&category=all&bl=HGACrera&AID=&submitbtn=Ok").
   SelectBrick("//div[@class='oneprd' and position()=1]//div[@class='pdg_t_sm pdg_b_sm']").ExtractContent("(.*)").As("$priceFnac").// text
  StickNote("Precio FNAC: $priceFnac"),
]);