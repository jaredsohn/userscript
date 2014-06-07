// ==UserScript==
// @name           Amazon.com en Euros (Igor)
// @namespace      http://webaugmentation.org/examples/AmazonEuros
// @description    Augment Amazon.com prices with their equivalent in euros. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://www.amazon.com/JavaScript-Definitive-Guide-Activate-Guides/dp/0596805527/
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Precio en Euros").
  WhenOnWall("*.amazon.com/*").
   SelectBrick("//*[@id=\"actualPriceValue\"]/b").
   ExtractContent("\\$(.*)").As("$dolares").// text after "\$"
  InlayLever("link").At("after","$dolares").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.xe.com/ucc/convert/?language=es&Amount=$dolares&From=USD&To=EUR").
   SelectBrick("//*[@id=\"contentL\"]/div[1]/div[1]/div[2]/div/table/tbody/tr[1]/td[3]").
   ExtractContent("(.*)").As("$price").// text
  StickNote("<u><b> Precio en Euros:</b></u>$price")]);
