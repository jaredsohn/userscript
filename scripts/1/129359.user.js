// ==UserScript==
// @Autor		   Carlos eta Jagoba
// @name           MiStikletASP
// @namespace      http://webaugmentation.org/examples/MiStikletASP
// @description    Muestra un enlace con la informacion de Google para cada surfista 
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://www.aspworldtour.com/surfers/mens-profiles/adriano-de-souza/
// @sticklet:preview  http://www.aspworldtour.com/surfers/womens-profiles/stephanie-gilmore/
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("+Info").
  WhenOnWall("*.aspworldtour.com/surfers/*").
   SelectBrick("//div[@class='profilesb' and position()=1]//a").
   ExtractContent("^(.*)$").As("$nombre").// text in link
  InlayLever("link").At("after","$nombre").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.google.es/search?q=$nombre").
   SelectBrick("//div[@id='ires']").
   ExtractContent("^(.*)$").As("$info").// text
  StickNote("Resultado de Google : $info")]);