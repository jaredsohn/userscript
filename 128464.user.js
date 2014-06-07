// ==UserScript==
// @name           BookBurro
// @namespace      http://webaugmentation.org/examples/BookBurro
// @description    Augment Amazon, Powells and Bookbyte books with prices from the other two websites. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview    http://www.amazon.com/JavaScript-Definitive-Guide-David-Flanagan/dp/0596805527
// @sticklet:preview    http://www.bookbyte.com/product.aspx?isbn=9780596805524
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Price At BookByte from Amazon for $isbn").
  WhenOnWall("*.amazon.com/*").
   SelectBrick("//li[contains(b/text(),'ISBN-10')]").ExtractContent("ISBN-10:</b> (\\d{10})").As("$isbn").
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.bookbyte.com/product.aspx?isbn=$isbn").
   SelectBrick("//span[@id='ctl00_ContentPlaceHolder1_lblBestNew']").ExtractContent("(.*)").As("$price").
  StickNote("<u><b> Price at Bookbyte </b></u>$price") ] );