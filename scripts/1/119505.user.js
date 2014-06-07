Metadata(<><![CDATA[
// ==UserScript==
// @name           Casa del libro
// @namespace      http://webaugmentation.org/examples/CasaDelLibro
// @description    Busca en Casa del Libro por ISBN
// @include        *
// @include        about:blank?Sticklet
// @require        http://dl.dropbox.com/u/20318901/96604.user.js
// @onekin:sticklet
// @sticklet:preview   http://www.amazon.com/gp/aw/d/0061977969/ref=mp_s_a_1?qid=1321103587&sr=8-1
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
]]></>);
StickletBox([
 Sticklet("Casa del Libro").
  WhenOnWall("*20318901/*").
   SelectBrick("$wall//span").ExtractContent("([0-9a-zA-Z.]+)").As("$isbn").
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.casadellibro.com/busqueda-libros?busqueda=$isbn").
   SelectBrick("$note//div[@class='list-pag']//p[@class='price']").ExtractContent("(.*)").As("$book").
  StickNote("<font size='3'><b>Casa del libro:</b> $book</font><br/>")
  ]);