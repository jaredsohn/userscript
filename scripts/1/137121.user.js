// ==UserScript==
// @name           Terra cines con comentarios de IMDB
// @namespace      http://webaugmentation.org/TERRA_IMDB
// @description    En la cartelera de cine.terra.es se muestra la valoracion de esta pelicula extraida del portal IMDB.es
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @sticklet:preview http://kedin.es/peliculas/argo
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Valoracion en IMDB.es").
  WhenOnWall("kedin.es/peliculas/*").
   SelectBrick("//h1[@class='big_title inlineb']").
   ExtractContent("(.+)").As("$titulo").// text
  LoadNote("http://www.google.es/search?q=imdb.es+$titulo").
   SelectBrick("//li[@class='g']//cite").
   ExtractContent(".es/title/(.*)/").As("$codigo").// text after ".es/title/" before "/"
  LoadNote("http://www.imdb.es/title/$codigo/ratings").
   SelectBrick("//div[@id='tn15content']").
   ExtractContent("^(.*)").As("$valoracion").// text
  StickNote("<b><div>Valoracion de <i><u>$titulo</u></i></div></b> $valoracion")]);