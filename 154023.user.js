// ==UserScript==
// @name           WatchShopToEuros
// @namespace      http://webaugmentation.org/examples/WatchShopToEuros
// @description    Translates WatchShop's GBP prices to euros. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://www.watches2u.com/mens-seiko-watches.html
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Calculate euros").
  WhenOnWall("*.watches2u.com/*").
   SelectBrick("//div[@class='shared_products_medium_price']/span[@class='price']").
   ExtractContent("[^\£]([0-9]+\.[0-9]+)[^\<]").As("$price").// text
  InlayLever("link").At("after","$price").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.x-rates.com/calculator/?from=GBP&to=EUR&amount=$price").
   SelectBrick("//span[@class='ccOutputRslt']").
   ExtractContent("([0-9]+\.[0-9]+)").As("$gbp_to_euro").// text
  StickNote("<u><b>The price in euros</b></u>$gbp_to_euro")]); 