// ==UserScript==
// @name           weather
// @namespace      http://webaugmentation.org/examples/weather
// @description    Augments http://www.eitb.com/es/eltiempo/. Search weather from San Sebastian in www.tutiempo.net, 
//                 www.eltiempo.es, www.eltiempo.elpais.com and show a webcam taked from playawebcams.com
// @author		   Unai Burgos
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview  http://www.eitb.com/es/eltiempo/
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Prediccion tiempo en $donosti de tutiempo.net").
  WhenOnWall("*.eitb.com/*").
   SelectBrick("//div[@class='envoltorio actual' and @id='tiempo_hoy']//li[2]").
   ExtractContent("^(.*):").As("$donosti").// text in list element before ":"
  InlayLever("button").At("before","$donosti").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.tutiempo.net/Tiempo-$donosti-E20001.html").
   SelectBrick("//div[@class='Cw15' and position()=4]").
   ExtractContent("(.*)").As("$tiempo").// text
  StickNote("El tiempo en tutiempo.net $tiempo"),

 Sticklet("Prediccion tiempo en $donostia de eltiempo.es").
  WhenOnWall("*.eitb.com/*").
   SelectBrick("//div[@class='envoltorio actual' and @id='tiempo_hoy']//li[2]").
   ExtractContent("Donostia-(.*):").As("$donostia").// text in list element after "Donostia-" before ":"
  InlayLever("button").At("after","$donostia").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.eltiempo.es/$donostia.html").
   SelectBrick("//td[@class='weather' and position()=1]").
   ExtractContent("(.*)").As("$tiempo1").// text in cell
  StickNote("El tiempo en eltiempo.es $tiempo1"),

 Sticklet("Prediccion tiempo en $donos de eltiempo.elpais.com").
  WhenOnWall("*.eitb.com/*").
   SelectBrick("//div[@class='envoltorio actual' and @id='tiempo_hoy']//li[2]").
   ExtractContent("^(.*):").As("$donos").// text in list element before ":"
  InlayLever("button").At("after","$donos").
  OnTriggeringLeverBy("click").
  LoadNote("http://eltiempo.elpais.com/espana/guipuzcoa/$donos/3250").
   SelectBrick("//div[@class='ficha_dia estirar' and position()=1]").
   ExtractContent("(.*)").As("$tiempo2").// text
  StickNote("El tiempo en eltiempo.elpais.com $tiempo2"),

 Sticklet("Webcam $don").
  WhenOnWall("*.eitb.com/*").
   SelectBrick("//div[@class='envoltorio actual' and @id='tiempo_hoy']//li[2]").
   ExtractContent("Donostia-(.*):").As("$don").// text in list element after "Donostia-" before ":"
  InlayLever("button").At("after","$don").
  OnTriggeringLeverBy("click").
  LoadNote("http://playawebcams.com/webcams/fotos-playas_$don.php?var=129&webcam=donosti&isla=&limit_inf=124").
   SelectBrick("//td[@class='general_14_color_1' and position()=1]/a").
   ExtractContent("(.*)").As("$tiempo3").// text
  StickNote("Webcam $tiempo3")]);