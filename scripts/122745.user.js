Metadata(<><![CDATA[
// ==UserScript==
// @name           BookBurro Plus Mobile
// @namespace      http://webaugmentation.org/examples/BookBurro Plus Mobile
// @description    Augment Amazon with book's price at Walmart, comments at Goodreads and reservation facilities at University of Manchester. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://dl.dropbox.com/u/20318901/96604.user.js
// @onekin:sticklet
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
]]></>)
StickletBox([
 Sticklet("Walmart").
  WhenOnWall("www.amazon.com/gp/aw/d/*/ref=aw_d_detail*").
   SelectBrick("//div[@class='dpProductTitle']").ExtractContent("([^(]*)").As("$title").// text
   SelectBrick("//div[@class='dpDynamicSectionBody' and contains(.,'ISBN-10')]").ExtractContent("ISBN-10: (\\d{10})").As("$isbn"). 
  InlayLever("link").At("after","$isbn"). 
  OnTriggeringLeverBy("click"). 
  LoadNote("osearch://www.walmart.com/?$title").
   SelectBrick("//div[@class='PricingInfo clearfix']/div[1]").ExtractContent("(.*)").As("$price").// text
  StickNote("$price"),
 
Sticklet("Comments on $title").
  WhenOnWall("www.amazon.com/gp/aw/d/*/ref=aw_d_detail*").
   SelectBrick("//div[@class='dpProductTitle']").ExtractContent("([^(]*)").As("$title").// text
   SelectBrick("//div[@class='dpDynamicSectionBody' and contains(.,'ISBN-10')]").ExtractContent("ISBN-10: (\\d{10})").As("$isbn"). // number in list element after "ISBN-10: "
  InlayLever("link").At("after","$isbn").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.goodreads.com/search?q=$isbn").
   SelectBrick("//div[@class='review']").ExtractContent("(.*)").As("$GoodreadsReview").// text
  StickNote("<h2 style='text-align:center;'>Comments for the book $title</h2><br><br><h2>Reviews</h2><ul><li>$GoodreadsReview</li></ul>"),

 Sticklet("LibraryReservation for $isbn4reservation").
  WhenOnWall("www.amazon.com/gp/aw/d/*/ref=aw_d_detail*").
   SelectBrick("//div[@class='dpDynamicSectionBody' and contains(.,'ISBN-10')]").ExtractContent("ISBN-10: (\\d{10})").As("$isbn4reservation").// number in list element after "ISBN-10: "
   SelectBrick("//div[@class='dpProductTitle']").ExtractContent("([^(]*)").As("$title").// text
  InlayLever("button").At("after","$isbn4reservation").
  OnTriggeringLeverBy("click").
  LoadNote("osearch://catalogue.library.manchester.ac.uk/?$isbn4reservation").
   SelectBrick("//li[@class='reserveAction mobile-inline']").ExtractContent("(.*)").As("$reserveButton").// text
  StickNote("LibraryReservation for $title <br><br> $reserveButton") ] 
  );