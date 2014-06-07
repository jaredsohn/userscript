// ==UserScript==
// @name           FilmaffinityLinks
// @namespace      http://webaugmentation.org/examples/  FilmaffinityLinks
// @description    Añade links para ver las peliculas online
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview  http://www.filmaffinity.com/es/film266403.html
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
   Sticklet("Ver online").
  WhenOnWall("*filmaffinity.com/es/*.html").
   SelectBrick("//h1[@id='main-title']/a").
   ExtractContent("(.*)").As("$search").// text in link
  InlayLever("link").At("after","$search").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.veocine.es/buscador.php?tag=$search&enviar=Busca").
   SelectBrick("//tr[1]/td[@class='celdalibre' and position()=2]/a[@class='enlaces_pelis']//@href").
   ExtractContent("(.*)$").As("$dire").// text in link
  LoadNote("http://www.veocine.es/$dire").
   SelectBrick("//tr[3]//tr[2]/td").
   ExtractContent("(.*)").As("$enlaces").// text in cell
  StickNote("<h2><font face='Arial' color='red'>Veocine:</font></h2><br/>$enlaces")]);
  
  
  
  
  