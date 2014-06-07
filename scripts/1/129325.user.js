// ==UserScript==
 // @Autor		   Carlos eta Jagoba 
// @name           NoticiasRelacionadas
// @namespace      http://webaugmentation.org/examples/NoticiasRelacionadas
// @description    Devuelve noticias que contengan datos relacionados con el tema.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview    http://www.meneame.net
// ==/UserScript==
StickletBox([
 Sticklet("Search similar news").
  WhenOnWall("*meneame.net*").
   SelectBrick("//span[@class='tool' and position()=2]").ExtractContent("(.*)").As("$name").
  InlayLever("link").At("after","$name").
  OnTriggeringLeverBy("click").
  LoadNote("osearch://www.meneame.net/?$name").
SelectBrick("//div[@class='news-summary'][1]//h2").ExtractContent("(.*)").As("$info1").
SelectBrick("//div[@class='news-summary'][2]//h2").ExtractContent("(.*)").As("$info2").
SelectBrick("//div[@class='news-summary'][3]//h2").ExtractContent("(.*)").As("$info3").
SelectBrick("//div[@class='news-summary'][4]//h2").ExtractContent("(.*)").As("$info4").
SelectBrick("//div[@class='news-summary'][5]//h2").ExtractContent("(.*)").As("$info5").
  StickNote("<h2>Resultados de busqueda de $name</h2><br/><li><ol>$info1</ol><ol>$info2</ol><ol>$info3</ol><ol>$info4</ol><ol>$info5</ol></li>") ] );
