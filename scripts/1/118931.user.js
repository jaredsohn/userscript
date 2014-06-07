// ==UserScript==
// @name           Compara traducciones
// @namespace      http://webaugmentation.org/examples/ComparaTraducciones
// @description    Compares - enriches our translations from www.wordreference.com with
                // the ones from www.bab.la and from diccionario.reverso.net.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @author Ana Apostol, Unai Burgos y Mikel Zorrilla 
// @onekin:sticklet
// @sticklet:preview http://www.wordreference.com/es/translation.asp?tranword=router
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==

StickletBox([
 Sticklet("Aumentar traducciones").
  WhenOnWall("*wordreference.com*").
   SelectBrick("//div[@id='articleHead']//strong").ExtractContent("(.*)").As("$word").// text before ":"
  InlayLever("button").At("after","$word").
  OnTriggeringLeverBy("click").
  LoadNote("http://en.bab.la/dictionary/english-spanish/$word").
   SelectBrick("//section[@class='section-block' and position()=1]").ExtractContent("(.*)").As("$BabTrans").// text
  StickNote("<b><u>Bab:</u></b><br> $BabTrans"),

 Sticklet("").
  WhenOnWall("*wordreference.com*").
   SelectBrick("//div[@id='articleHead']//strong").ExtractContent("(.*)").As("$word").// text before ":"
  InlayLever("button").At("after","$word").
  OnTriggeringLeverBy("click").
  LoadNote("http://diccionario.reverso.net/ingles-espanol/$word").
   SelectBrick("//div[@class='translate_box0' and @id='ctl00_cC_translate_box']").ExtractContent("(.*)").As("$InfTrans").// text in cell
  StickNote("<b><u>En el entorno inform&aacute;tico:</u></b><br> $InfTrans")]);