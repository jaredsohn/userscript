// ==UserScript==
// @name           Busca Conciertos y Video
// @namespace      http://webaugmentation.org/examples/BuscaConciertosYVideo
// @description    Search Concerts and Video for the new albums in
                 //www.newalbumreleases.net, for the groups in last.fm. Gives us
                 //information about future concerts, like old ones.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @author Ana Apostol, Unai Burgos y Mikel Zorrilla 
// @onekin:sticklet
// @sticklet:preview http://newalbumreleases.net/category/pop/
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
   Sticklet("Encuentra los conciertos").
  WhenOnWall("*newalbumreleases.net/*").
   SelectBrick("//div[@class='entry']//b[1]").
   ExtractContent("([a-zA-Z .][a-zA-Z .][a-zA-Z .]*)").As("$band").
  InlayLever("button").At("after","$band").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.lastfm.es/music/$band/+events").
   SelectBrick("//div[@class='skyWrap' and position()=2]").
   ExtractContent("(.*)").As("$concert").
  StickNote("$concert")]);