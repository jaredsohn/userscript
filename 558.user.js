/*

A small Greasemonkey script to claim the Amazon links on websites.

More and more people are taking control of the Amazon links on your
site without your permission so why not play dirty and do the same
on their sites?

Thanks to Edward Ackroyd and Carlo Zottman for the idea.

Chris Harper - 21 March 2005 - greasemonkey AT cmharper dot com

Looking for something else?  Try http://3o0.net/mozilla

*/

// ==UserScript==
// @name          AmazonAffiliate
// @namespace     http://3o0.net/mozilla
// @description   Exchanges Amazon affiliate ID's with your own
// @include       http://*
// @include       https://*
// @exclude       http://*.amazon.*
// @exclude       https://*.amazon.*
// ==/UserScript==

(function() {
/*
add your tags here - no further editing required.  If you do
not have a US or UK tag please leave the default in place
and it will help me out a bit for writing this for you ;-)
*/
var UStag = "wwwpalitoycom0a";
var UKtag = "wwwpalitoycom";

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


