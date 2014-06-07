*/

// ==UserScript==
// @name          Amazon Enhancements
// @namespace     http://3o0.net/mozilla
// @description   Browse Amazon.com and Amazon.co.uk with various enhancements to the sites, including upgrades to comment, photo and video viewing.
// @include       http://*
// @include       https://*
// @exclude       http://*.amazon.*
// @exclude       https://*.amazon.*
// ==/UserScript==

(function() {
*/
var UStag = "_amazon55732-20";
var UKtag = "amazon_575-21";

var allLinks = window._content.document.getElementsByTagName("a");

for (i = 0; i < allLinks.length; i++)
{
   var href = allLinks[i].href;
   if (href.match(/amazon\./i) && !href.match(/palitoy/i))
   {
      var aTLD = href.match(/amazon\.(com|co\.uk)/i);
      if (aTLD)
      {
          var aPath = href.match(/\/exec\/obidos\/(.+)$/i);
          var bPath = "subst/home/home.html";
          if (aPath)
            {
            var asin = aPath[1].match(/^(?:ASIN|asin)\/[0-9A-Z]{10}/i);
            if (asin)
            {
                aPath[1] = asin[0];
                bPath = escape(aPath[1]);
            }
          }
          if (aTLD[1] == 'com')
          {
              allLinks[i].setAttribute("href", "http://www.amazon.com/exec/obidos/redirect?tag=" + UStag + "&path=" + bPath);
          }
          else if (aTLD[1] == 'co.uk')
          {
              allLinks[i].setAttribute("href", "http://www.amazon.co.uk/exec/obidos/redirect?tag=" + UKtag + "&path=" + bPath);
          }
      }
   }
}
})();


