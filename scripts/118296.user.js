// ==UserScript==
// @name           BookBurro Plus
// @namespace      http://webaugmentation.org/examples/BookBurro Plus
// @description    Augment Amazon with book's price at Walmart, comments at Goodreads and reservation facilities at University of Manchester. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview    http://www.amazon.com/JavaScript-Definitive-Guide-David-Flanagan/dp/0596000480
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Walmart").
  WhenOnWall("*.amazon.com/*").
   SelectBrick("//div[@id='divsinglecolumnminwidth']").ExtractContent("(.*)").As("$book").// text  
   SelectBrick("$book//span[@id='btAsinTitle']/text()").ExtractContent("([^:]*:?[^:]*)").As("$title").// text
   SelectBrick("$book//td[@class='bucket']//li[4]").ExtractContent("<b>ISBN-10:</b> (\\d{10})").As("$isbn").// number   
  InlayLever("link").At("after","$isbn"). 
  OnTriggeringLeverBy("click"). 
  LoadNote("osearch://www.walmart.com/?$title").
   SelectBrick("//div[@class='PricingInfo clearfix']/div[1]").ExtractContent("(.*)").As("$price").// text
  StickNote("$price"),
 
Sticklet("Comments on $title").
  WhenOnWall("*.amazon.com/*").
   SelectBrick("//span[@id='btAsinTitle']/text()").ExtractContent("(.*)").As("$title").// text
   SelectBrick("//div[@id='revH']").ExtractContent("(.*)").As("$AmazonAverageReview").// text
   SelectBrick("//li[contains(b/text(),'ISBN-10')]").ExtractContent("ISBN-10:</b> (\\d{10})").As("$isbn").// number in list element after "ISBN-10: "
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.goodreads.com/search?q=$isbn").
   SelectBrick("//div[@class='review']").ExtractContent("(.*)").As("$GoodreadsReview").// text
  StickNote("<h2 style='text-align:center;'>Comments for the book $title</h2><br><br><h2>Average Customer Reviews</h2><div style='overflow:hidden;'>$AmazonAverageReview</div><br><br><h2>Reviews</h2><ul><li>$GoodreadsReview</li></ul>"),

 Sticklet("LibraryReservation for $isbn4reservation").
  WhenOnWall("*.amazon.com/*").
   SelectBrick("//td[@class='bucket']//li[4]").ExtractContent("<b>ISBN-10:</b> (\\d{10})").As("$isbn4reservation").// number in list element after "ISBN-10: "
   SelectBrick("//span[@id='btAsinTitle']/text()").ExtractContent("(.*)").As("$title").// text   
  InlayLever("button").At("after","$isbn4reservation").
  OnTriggeringLeverBy("click").
  LoadNote("osearch://catalogue.library.manchester.ac.uk/?$isbn4reservation").
   SelectBrick("//li[@class='reserveAction mobile-inline']").ExtractContent("(.*)").As("$reserveButton").// text
  StickNote("LibraryReservation for $title <br><br> $reserveButton") ] 
  );