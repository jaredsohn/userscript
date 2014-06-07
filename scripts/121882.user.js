// ==UserScript==
// @name           Fnac music
// @namespace      http://webaugmentation.org/
// @description    Shows artist discography of fnac music from wikipedia. 
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @author         Eneko Mateo
// @onekin:sticklet
// @sticklet:preview http://musica.fnac.es/l13400/Discos-en-stock-24-h
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Discografia").
  WhenOnWall("musica.fnac.es/*").
   SelectBrick("//span[@class='participants dispeblock']/a").
   ExtractContent("^(.*)$").As("$name").// text in link
  InlayLever("link").At("after","$name").
  OnTriggeringLeverBy("click").
  LoadNote("http://es.wikipedia.org/wiki/$name").
   SelectBrick("//div[@class='mw-content-ltr' and position()=4]/ul[1]").
   ExtractContent("(.*)").As("$table").// text in list
  StickNote("Discografia de <i><u>$name</u></i>:<br/> <div><table id=\"team\" style=\"width: 22em;\" cellspacing=\"5\"> <tbody>$table</table></div>")]);