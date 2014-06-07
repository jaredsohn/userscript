// ==UserScript==
// @name           Augmented Xbox VideoGames
// @namespace      http://webaugmentation.org/examples/XboxVideoGames
// @description    Augments xbox 360 games in play.com, showing prices in other websites (zavvi.com, thehut.com and thegamecollection) and the score of the game in 3Djuegos.com
// @author		   David Anton Saez
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview  http://www.play.com/Games/Xbox360/4-/10287960/Halo-Reach/Product.html
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Precios alternativos").
  WhenOnWall("*play.com/Games/Xbox360*").
   SelectBrick("//h1").ExtractContent("^(.*)$").As("$game").// text
  InlayLever("button").At("after","$game").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.google.com/search?sourceid=navclient&btnI=1&q=site:zavvi.com+$game+xbox+360").
   SelectBrick("//li[@class='g' and position()=1]//a[@class='l']//@href").ExtractContent("(.*)").As("$Zavvi").// text
   LoadNote("$Zavvi").
   SelectBrick("//span[@class='price']").ExtractContent("(.*)").As("$priceZavvi").
  LoadNote("http://www.google.com/search?sourceid=navclient&btnI=1&q=site:thegamecollection.net+$game+xbox+360").
   SelectBrick("//li[@class='g' and position()=1]//a[@class='l']//@href").ExtractContent("(.*)$").As("$Game").// text  
   LoadNote("$Game"). 
   SelectBrick("//span[@class='regular-price' and @id='product-price-4826']/span[@class='price']").ExtractContent("(.*)").As("$priceGame").// text 
  LoadNote("http://www.google.com/search?sourceid=navclient&btnI=1&q=site:thehut.com+$game+xbox+360").
   SelectBrick("//li[@class='g' and position()=1]//a[@class='l']//@href").ExtractContent("(.*)").As("$theHut").// text
  LoadNote("$theHut"). 
   SelectBrick("//span[@class='price']").ExtractContent("(.*)").As("$pricetheHut").
  StickNote("<div><h2>$game<br><p>Precio en zavvi.com: $priceZavvi</p><br><p>Precio en theHut.com: $pricetheHut</p><br><p>Precio en thegamecollection.net: $priceGame </p></h2></div>"),

 Sticklet("Valoracion en 3Djuegos.com").
  WhenOnWall("*play.com/Games/Xbox360*").
   SelectBrick("//h1").ExtractContent("(.*)").As("$game").// text
  InlayLever("button").At("after","$game").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.google.com/search?sourceid=navclient&btnI=1&q=site:3djuegos.com+analisis+Valoracion+de+$game").
   SelectBrick("//div[@class='caja_curva borCF mar_der br3' and position()=3]/div[@class='v6']").ExtractContent("(.*)").As("$analisis").// text
  StickNote("$analisis")]);