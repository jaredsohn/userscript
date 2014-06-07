Metadata(<><![CDATA[
// ==UserScript==
// @name           BookBurro Mobile
// @namespace      http://webaugmentation.org/examples/BookBurroMobile
// @description    Augment Amazon, Powells and Bookbyte books with prices from the other two websites. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://dl.dropbox.com/u/20318901/96604.user.js
// @onekin:sticklet
// @sticklet:preview    http://www.amazon.com/gp/aw/d/0061977969/ref=aw_d_detail?pd=1&qid=1326187647&sr=8-1
// @sticklet:preview    http://m.bookbyte.com/product.aspx?isbn=9780061977961
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
]]></>)
StickletBox([
 Sticklet("Price At BookByte from Amazon for $isbn").
  WhenOnWall("www.amazon.com/gp/aw/d/*/ref=aw_d_detail*").
   SelectBrick("//div[@class='dpDynamicSectionBody' and contains(.,'ISBN-10')]").ExtractContent("ISBN-10: (\\d{10})").As("$isbn").
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.bookbyte.com/product.aspx?isbn=$isbn").
   SelectBrick("//span[@id='ctl00_ContentPlaceHolder1_lblBestNew']").ExtractContent("(.*)").As("$price").
  StickNote("<u><b> Price at Bookbyte </b></u>$price"),  
 
 Sticklet("Price At Powell from Amazon for $isbn").
  WhenOnWall("www.amazon.com/gp/aw/d/*/ref=aw_d_detail*").
   SelectBrick("//div[@class='dpDynamicSectionBody' and contains(.,'ISBN-10')]").ExtractContent("ISBN-10: (\\d{10})").As("$isbn").
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
  WhenOnWall("m.bookbyte.com/*"). 
   SelectBrick("//span[@id='ContentPlaceHolder1_lblISBN10']").ExtractContent("(.*)").As("$isbn").
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.powells.com/cgi-bin/biblio?isbn=$isbn").
   SelectBrick("//div[@class='price']").ExtractContent("(.*)").As("$price").
  StickNote("<u><b> Price at Powells </b></u>$price"),  
  
 Sticklet("Price At Amazon from Bookbyte for $isbn").
  WhenOnWall("m.bookbyte.com/*"). 
   SelectBrick("//span[@id='ContentPlaceHolder1_lblISBN10']").ExtractContent("(.*)").As("$isbn").
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.amazon.com/gp/product/$isbn").
   SelectBrick("//b[@class='priceLarge']").ExtractContent("(.*)").As("$price").
  StickNote("<u><b> Price at Amazon </b></u>$price") ] 
  );