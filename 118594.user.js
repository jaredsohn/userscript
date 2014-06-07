// ==UserScript==
// @author         Cristobal Arellano
// @author         Iñigo Aldalur
// @author         Oscar Díaz
// @name           Sticklet Example
// @namespace      http://webaugmentation.org/examples/StickletExample
// @description    Augments Amazon, Powells and Bookbyte websites with a price comparison panel. 
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://www.amazon.com/gp/product/0596805527/
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Price At BookByte from Amazon for $isbn").
  WhenOnWall("*.amazon.com/*").
   SelectBrick("$wall//li[contains(b/text(),'ISBN-10')]").ExtractContent("ISBN-10:</b> (\\d{10})").As("$isbn").
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.bookbyte.com/product.aspx?isbn=$isbn").
   SelectBrick("$note//span[@id='ctl00_ContentPlaceHolder1_lblBestNew']").ExtractContent("(.*)").As("$price").
  StickNote("<u><b> Price at Bookbyte </b></u>$price")]);