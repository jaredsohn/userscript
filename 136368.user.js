// ==UserScript==
// @name           BookBurroFirst
// @namespace      http://webaugmentation.org/examples/BookBurroFirst
// @description    Augment Bookbyte books with prices from Powells. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://www.bookbyte.com/product.aspx?isbn=9780451228376
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Price At Powell").
  WhenOnWall("*.bookbyte.com/*").
   SelectBrick("//span[@id='ctl00_ContentPlaceHolder1_lblISBN10b']").
   ExtractContent("(.*)").As("$isbn").// text
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.powells.com/cgi-bin/biblio?isbn=$isbn").
   SelectBrick("//div[@class='price']").
   ExtractContent("(.*)").As("$price").// text
  StickNote("<u><b> Precio en Powells </b></u>$price")]);