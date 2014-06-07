Metadata(<><![CDATA[
// ==UserScript==
// @name           Price Currency Converter!
// @namespace      http://webaugmentation.org/examples/PriceCurrencyConverter
// @description    Converts the price in Amazon to the local currency
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
 Sticklet("Convert").
  WhenOnWall("www.amazon.com/gp/aw/d/*").
  GeoLocation("continent", "europe").
   SelectBrick("$wall//span[@class=\'dpOurPrice\']").ExtractContent("([0-9.]+)").As("$price").
  InlayLever("link").At("after","$price").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.google.com/finance/converter?a=$price&from=USD&to=EUR").
   SelectBrick("$note//div[@id=\'currency_converter_result\']/span[@class=\'bld\']").ExtractContent("(.*)").As("$euros").
  StickNote("<font size='3'><b>Price in Euros:</b> $euros</font>"),

  Sticklet("Convert").
  WhenOnWall("www.amazon.com/gp/aw/d/*").
  GeoLocation("country", "canada").
   SelectBrick("$wall//span[@class=\'dpOurPrice\']").ExtractContent("([0-9.]+)").As("$price").
  InlayLever("link").At("after","$price").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.google.com/finance/converter?a=$price&from=USD&to=CAD").
   SelectBrick("$note//div[@id=\'currency_converter_result\']/span[@class=\'bld\']").ExtractContent("(.*)").As("$canadadollars").
  StickNote("<font size='3'><b>Price in Canada Dollars:</b> $canadadollars</font>")
  ]);