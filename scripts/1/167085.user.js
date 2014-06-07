// ==UserScript==
// @name           InfoSobreTemasMoodle
// @namespace      http://webaugmentation.org/examples/InfoSobreTemasMoodle
// @description    Buscar informacion sobre los temas que se presentan en la plataforma Moodle
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview  http://moodle4.ehu.es/course/view.php?id=4132
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("").
  WhenOnWall("*moodle4.ehu.es/course/*").
   SelectBrick("//font[1]/span/span").
   ExtractContent("^(.*)$").As("$search").// text
  InlayLever("link").At("after","$search").
  OnTriggeringLeverBy("click").
  LoadNote("http://es.wikipedia.org/wiki/$search").
   SelectBrick("//p[1]").
   ExtractContent("(.*)").As("$info").// text
   SelectBrick("//div[@class='plainlinks' and @id='noarticletext']/ul[2]/li[1]").
   ExtractContent("(.*)").As("$Dinfo").// text in list element
  StickNote("<h2>Wikipedia:</h2><br> $info <br/> $Dinfo"),

 Sticklet("").
  WhenOnWall("*moodle4.ehu.es/course/*").
   SelectBrick("//font[1]/span/span").
   ExtractContent("^(.*)$").As("$search").// text
  InlayLever("link").At("after","$search").
  OnTriggeringLeverBy("click").
  LoadNote("https://www.google.es/search?q=$search").
   SelectBrick("//li[@class='g' and position()=1]//h3[@class='r']").
   ExtractContent("(.*)").As("$info").// text
  StickNote("<h2 style='text-align=center;'>Google:</h2><br/>$info"),
  
   Sticklet("¿Que es esto?").
  WhenOnWall("*moodle4.ehu.es/course/*").
   SelectBrick("//font[1]/span/span").
   ExtractContent("^(.*)$").As("$search").// text
  InlayLever("link").At("after","$search").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.w3schools.com/$search/").
   SelectBrick("//div[@class='tutintro' and position()=2]").
   ExtractContent("(.*)").As("$info").// text
  StickNote("<h2 style='text-align=center;'>W3schools:</h2><br/>$info")]);