// ==UserScript==
// @description Finds RSS and Atom links on a page that are not listed in the documents header and inserts appropriate links. Result is the Firefox 'Subscribe' icon that allows you to subscribe to the feed(s).
// @name RSS+Atim Link tag generator
// @namespace http://highbyte.bounceme.net/greasemonkey/
// @include http://*.google.com/*
// @include http://www.artima.com/*
// ==/UserScript==
/*
 * genrsslinkrel.user.js
 * Isaac Sparrow <isaac.sparrow@gmail.com>
 * Last updated: Fri Mar 25 21:03:52 PST 2005
 */
(function () {
   // array to keep track of 'seen' feed links.
   var seen = new Array(0);

   // Return 'true' if a link tag for an RSS feed already exists. 
   // 'false' otherwise.
   function hasRssTag() {
      // if link rel tag already in head, abort.
      var linkRelElems = document.getElementsByTagName("link");
      var tlink;
      var i = 0;
      while ((tlink = linkRelElems[i++])) {
         var thref = tlink.href;
         if (thref && thref.match(/.*\.rss$/)) {
            return true;
         }


         var type = tlink.type;
         if (type && type.match(/.*\/rss\+xml$/)) {
            return true;
         }

         // So many standards. So little time.
         if (type && type.match(/.*\/atom\+xml$/)) {
            return true;
         }
      }
      return false;
   }

   // Returns the 'head' element for the current document.
   function getHeadElem() {
      var headElements = document.getElementsByTagName("head");
      var headElem = headElements[0];

      return headElem;
   }

   function beenThere(link) {
      if (seen.length <= 0) {
         return false;
      }

      var len = seen.length;
      var i;
      var href = link.href.toLowerCase();
      for (i = 0; i < len; i++) {
         if (seen[i].toLowerCase() == href) {
            return true;
         }
      }

      return false;
   }

   function getTitleHack(link) {
      path = link.pathname;
      if (!path) {
         return link.href;
      }

      href = link.href;
      idx = href.lastIndexOf("/");
      if (idx <= 0) {
         return href;
      }

      href = href.substr(idx + 1);

      var parts = href.split(".");
      href = parts[0];

      return href;
   }

   // Adds a link alt rss tag to the 'head' element for 
   // the given 'link' object.
   function addRssLinkTag(link, type) {
      if (beenThere(link)) {
         // already got this guy.
         return;
      } else {
         seen.push(link.href);
      }

      titleHack = getTitleHack(link);

      var headElem = getHeadElem();

      var linkRel = document.createElement("link");
      linkRel.setAttribute("rel", "alternate");
      linkRel.setAttribute("type", type);
      linkRel.setAttribute("title", titleHack + " - RSS");
      //linkRel.setAttribute("title", link.href + " - RSS");
      linkRel.setAttribute("href", link.href);
      headElem.appendChild(linkRel);
   }

   if (hasRssTag()) {
      // already has a RSS link tag. Let's get 
      // out of here.
      return;
   }

   var atomType = "atom+xml";
   var rssType  = "rss+xml";
   var link;
   var x = 0;
   while ((link = document.links[x++])) {
      href = link.href;

      // inspired by code.google.com
      if (href.match(/.*\/feeds\/.*\.xml/)) {
         addRssLinkTag(link, atomType);
         continue;
      }
      
      if (href.match(/.*\.rss$/)) {
         addRssLinkTag(link, rssType);
         continue;
      }

      // maybe just particular to the google blog...
      if (href.match(/.*\atom.xml$/)) {
         addRssLinkTag(link, atomType);
      }
   }

})();






