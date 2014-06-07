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
// @sticklet:preview    http://www.powells.com/biblio?isbn=0596805527
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
  StickNote("<u><b> Price at Bookbyte </b></u>$price"),  
 
 Sticklet("Price At Powell from Amazon for $isbn").
  WhenOnWall("*.amazon.com/*"). 
   SelectBrick("//li[contains(b/text(),'ISBN-10')]").ExtractContent("ISBN-10:</b> (\\d{10})").As("$isbn").
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.powells.com/cgi-bin/biblio?isbn=$isbn").
   SelectBrick("//div[@class='price']").ExtractContent("(.*)").As("$price").
  StickNote("<u><b> Price at Powells </b></u>$price"),  

 Sticklet("Price At BookByte from Powells for $isbn").
  WhenOnWall("*.powells.com/*").
   SelectBrick("//p[contains(strong[2]/text(),'ISBN10')]").ExtractContent("ISBN10:</strong> (\\d{10}) ").As("$isbn").
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.bookbyte.com/product.aspx?isbn=$isbn").
   SelectBrick("//span[@id='ctl00_ContentPlaceHolder1_lblBestNew']").ExtractContent("(.*)").As("$price").
  StickNote("<u><b> Price at Bookbyte </b></u>$price"),  
 
 Sticklet("Price At Amazon from Powells for $isbn").
  WhenOnWall("*.powells.com/*"). 
   SelectBrick("//p[contains(strong[2]/text(),'ISBN10')]").ExtractContent("ISBN10:</strong> (\\d{10})").As("$isbn").
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.amazon.com/gp/product/$isbn").
   SelectBrick("//b[@class='priceLarge']").ExtractContent("(.*)").As("$price").
  StickNote("<u><b> Price at Amazon </b></u>$price"),  
  
 Sticklet("Price At Powell from Bookbyte for $isbn").
  WhenOnWall("*.bookbyte.com/*"). 
   SelectBrick("//span[@id='ctl00_ContentPlaceHolder1_lblISBN10b']").ExtractContent("(.*)").As("$isbn").
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.powells.com/cgi-bin/biblio?isbn=$isbn").
   SelectBrick("//div[@class='price']").ExtractContent("(.*)").As("$price").
  StickNote("<u><b> Price at Powells </b></u>$price"),  
  
 Sticklet("Price At Amazon from Bookbyte for $isbn").
  WhenOnWall("*.bookbyte.com/*"). 
   SelectBrick("//span[@id='ctl00_ContentPlaceHolder1_lblISBN10b']").ExtractContent("(.*)").As("$isbn").
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.amazon.com/gp/product/$isbn").
   SelectBrick("//b[@class='priceLarge']").ExtractContent("(.*)").As("$price").
  StickNote("<u><b> Price at Amazon </b></u>$price") ] 
  );