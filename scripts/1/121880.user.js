// ==UserScript==
// @name           Hoycinema+
// @namespace      http://webaugmentation.org/
// @description    Complements film titles from hoycinema.com with their calification at IMDB.es
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @author         Eneko Mateo
// @example        http://www.hoycinema.com/cartelera/peliculas/guipuzcoa/errenteria.html
// @onekin:sticklet
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Valoración en IMDB.es").
  WhenOnWall("*hoycinema.com/*").
   SelectBrick("//h2[@class='title']").
   ExtractContent("^(.*)$").As("$title").// text
  InlayLever("link").At("after","$title").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.google.es/search?q=imdb+$title").
   SelectBrick("//li[@class='g' and position()=1]//cite").
   ExtractContent(".es/title/(.*)/").As("$url").// text after ".es/title/" before "/"
  LoadNote("http://www.imdb.es/title/$url").
   SelectBrick("//div[@class='titlePageSprite star-box-giga-star' and position()=1]").
   ExtractContent("^(.*)$").As("$rating").// text
  StickNote("<div>Valoración de <i><u>$title</u></i>: <br/> <b>$rating</b></div>")]);