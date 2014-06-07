// ==UserScript==
// @name        XISBN LibraryLookup
// @namespace   http://userscripts.org/people/4764
// @description Check book availability in one or more libraries
// @include     http://*.amazon.*
// @include     http://*.chapters.indigo.ca/*
// @include     http://*.powells.com/*
// @include     http://*allconsuming.net/item/view/*
// @include     http://books.google.*
// ==/UserScript==
 
// This script was inspired by Jon Udell's userscript of similar functionality
// that he posted in his 'Further adventures in lightweight service
// composition' post of 30 January, 2006
// (http://weblog.infoworld.com/udell/2006/01/30.html).
//
// I've modified the code in the following ways: 
// - it's more understandable to me - your mileage may vary, but I found the
//   background DOM modification and associated event a little confusing
// - it works against the Waterloo Public Library instead of the Keene
//   libraries
// - it only hits XISBN if the original ISBN doesn't appear in the library
// - if no versions of the book are found in the library, that fact is noted
//   on the Amazon page
//
// The latest version of this script is always available at 
// http://userscripts.org/scripts/show/3393
//
// Updates:
//
// 2006.03.30
// - added Region of Waterloo Library as last-checked library
// 
// 2006.03.20
// - Bugfixes, thanks to Kevin Yezbick's sharp eyes
//   - better detection of whether books are at the WPL & KPL
//   - persisting extra ISBN list until all libraries have been checked 
// - updated ISBN & title detection at Chapters
// 
// 2006.03.15
// - added support for fallback libraries - if the book isn't found
//   in the library, look in others. This could still use some work,
//   since we're relooking up the XISBNs
// - added fallback library of Kitchener Public Library
// - added support for Google Books, as requested by Kevin Yezbick
//
// 2006.03.09, later on
// - added All Consuming
//
// 2006.03.09
// - fixed broken ISBN detection on Powells
// 
// 2006.03.08
// - Added builtin support for Powells web pages (a US bookseller)
// - Fixed up some logs. A little.
//
// 2006.03.05
// - split 'source page' (formerly Amazon site) functionality into separate objects
//   and added builtin support for Chapters web pages (a Canadian bookseller)

(
   function()
   {
      var xisbnQuery = 'http://labs.oclc.org/xisbn/';
      
      var isbnREplain = /(\d{7,9}[\dXx])/g;
      var isbnREdelimited = /[^\d](\d{7,9}[\dXx])[^\dXx]/;

      var extraIsbns = [];

      // Libraries -----------------------------------------------------------

      var waterlooRegion =
      {
            name: 'Region of Waterloo Library',

            createSearchUrl: function(isbn)
            {
               // var prefix = 'http://www.regionofwaterloo.canlib.ca/uhtbin/cgisirsi/uOtJAQjVct/HEADQUARTR/262040012/5/0/?searchdata1=';
               var prefix = 'http://www.regionofwaterloo.canlib.ca/uhtbin/cgisirsi/uOtJAQjVct/HEADQUARTR/x/5/0/?searchdata1=';
               return prefix + isbn
            },
            
            // Get the results of a lookup - mark up the page and return true
            // if there's a hit, otherwise return false.
            processLookup: function(isbn, results)
            {
               var notFound = /found no matches in the library you searched/;

               page = results.responseText;
               if ( notFound.test(page) )
               { 
                  GM_log('couldn\'t find ' + isbn + ' at the ' + this.name);
                  return false;
               }
               else
               {
                  return true;
               }
            },
            
      } // end waterlooRegion

      var wpl = 
         {
            name: 'Waterloo Public Library',

            createSearchUrl: function(isbn)
            {
               var prefix = 'http://books.wpl.ca/search/?searchtype=i&searcharg=';
               var suffix = '&searchscope=3&SORT=D&extended=0&SUBMIT=Search&searchlimits=';
               return prefix + isbn + suffix;
            },
            
            // Get the results of a lookup - mark up the page and return true
            // if there's a hit, otherwise return false.
            processLookup: function(isbn, results)
            {
               var notFound = /No matches found; nearby ISBN[/]ISSN/;

               page = results.responseText;
               if ( notFound.test(page) )
               { 
                  GM_log('couldn\'t find ' + isbn + ' at the ' + this.name);
                  return false;
               }
               else
               {
                  return true;
               }
            },
            
         } // end wpl

      var kpl = 
         {
            name: 'Kitchener Public Library',
            createSearchUrl: function(isbn)
            {
               var prefix = 'http://books.wpl.ca/search/?searchtype=i&searcharg=';
               var suffix = '&searchscope=1&SORT=D&extended=0&SUBMIT=Search&searchlimits=';
               return prefix + isbn + suffix;
            },

            // the Kitchener Public Library shares a catalog with the WPL, so
            // just copy their processLookup
            processLookup: wpl.processLookup,
         } // end kpl

      // End of Libraries ----------------------------------------------------

      // Figure out which site the source page comes from to add a new one,
      // make a new block like the "chapters" and "amazon" variables below,
      // and extend the "if...else..." block at the bottom of this function.
      function whichSiteIsThis()
      {
         var chapters =
            {
               getIsbn: function()
               {
                  var isbn = null;
                  isbnLinkNode = document.evaluate
                     (
                        "//div[@class='itemPublishingDetails']/a",
                        document,
                        null, 
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                  if ( isbnLinkNode )
                  {
                     isbn = isbnLinkNode.firstChild.nodeValue;
                  }
                  return isbn;
               },

               getOriginalTitle: function()
               {
                  var origTitle = document.evaluate
                     (
                        "//div[@class='productCoreInfo']/h1/span", 
                        document,
                        null, 
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                  return origTitle;
               }
            }
      
         var allconsuming =
            {
               getIsbn: function()
               {
                  var isbn = null;
                  isbnLinkNode = document.evaluate
                     (
                        "//div[@class='item-header-body']/a[@class='amazon-link']/@href", 
                        document,
                        null, 
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                  if ( isbnLinkNode )
                  {
                     isbn = isbnLinkNode.firstChild.nodeValue.match(isbnREdelimited)[1];
                  }
                  return isbn;
               },

               getOriginalTitle: function()
               {
                  var origTitle = document.evaluate
                     (
                        "//div[@class='item-header-body']/strong", 
                        document,
                        null, 
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                  return origTitle;
               }
            }
      
         var amazon =
            {
               getIsbn: function()
               {
                  try
                  {
                     return location.href.match(isbnREdelimited)[1];
                  }
                  catch ( e ) 
                  {
                     return null;
                  }
               },

               getOriginalTitle: function()
               {
                  var origTitle = document.evaluate
                     (
                        "//b[@class='sans']", 
                        document,
                        null, 
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                  return origTitle;
               }
            }
      
         var powells =
            {
               getIsbn: function()
               {
                  try
                  {
                     return location.href.match(isbnREdelimited)[1];
                  }
                  catch ( e ) 
                  {
                     return null;
                  }
               },

               getOriginalTitle: function()
               {
                  var origTitle = document.evaluate
                     (
                        "//h1[@class='title']", 
                        document,
                        null, 
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                  return origTitle;
               }
            }
      
         var googleBooks =
            {
               getIsbn: function()
               {
                  try
                  {
                     return location.href.match(isbnREdelimited)[1];
                  }
                  catch ( e ) 
                  {
                     return null;
                  }
               },

               getOriginalTitle: function()
               {
                  var origTitle = document.evaluate
                     (
                        "//span[@class='title']", 
                        document,
                        null, 
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                  return origTitle;
               }
            }
      
         // figure out what site we're looking at
         if ( location.href.match(/chapters/) )
         {
            return chapters;
         }
         else if ( location.href.match(/allconsuming/) )
         {
            return allconsuming;
         }
         else if ( location.href.match(/powells/) )
         {
            return powells;
         }
         else if ( location.href.match(/google/) )
         {
            return googleBooks;
         }
         else
         {
            // Amazon's pretty popular - make it the default
            return amazon;
         }
      }

      // ---------------------------------------------------------------------

      var xisbnCache =
         {
            cache: {},
            
            get: function(isbn)
            {
               if ( null == this.cache[isbn] )
               {
                  return null;
               }
               else
               {
                  return this.cache[isbn].copy()
              }
            },

            set: function(isbns)
            {
               var isbn = isbns.shift();
               
               if ( ! isbns )
               {
                  isbns = [];
               }

               GM_log('caching ' + isbns.length + ' items: [' + isbns + '] for ' + isbn);
               this.cache[isbn] = isbns.copy();
               return this.get(isbn);
            }
         }

      // ---------------------------------------------------------------------
      var libraryLookup = 
         {
            originalTitle: null,
            infoSpan: null,

            getLibrary: function()
            {
               return this.libraries[0];
            },

            insertContent: function(content)
            {
               if ( ! this.infoSpan )
               {
                  this.infoSpan = document.createElement("span");
                  var sp = document.createElement('br');
                  this.originalTitle.appendChild(sp);
                  this.originalTitle.appendChild(this.infoSpan);
               }

               this.infoSpan.innerHTML = content;
            },

            // Look up the alternate isbns for this one.  Store the results in
            // extraIsbns and start looking them up.
            lookUpAlternates: function(isbn)
            {
               alts = xisbnCache.get(isbn);
               if ( alts )
               {
                  extraIsbns = alts;
                  libraryLookup.keepLooking();
                  return;
               }
                  
               GM_log('loading extra ISBNs for ' + isbn);
               GM_xmlhttpRequest
                  (
                  {
                    method:  'GET',
                                url:     xisbnQuery + isbn,
                                onload:  function(results)
                                {
                                   var foundIsbns = results.responseText.match(isbnREplain);
                                   
                                   extraIsbns = xisbnCache.set(foundIsbns);
                                   
                                   GM_log('extra ISBNs = ' + extraIsbns);
                                   libraryLookup.keepLooking();
                                }
                  }
                  );
            },

            // Lookup ISBNs from the libraryLookup.extraIsbns list. If there
            // aren't any extra ISBNs left, give up in disgust. Otherwise, try
            // the first ISBN. If it doesn't work out, call keepLooking again.
            keepLooking: function()
            {
               if ( 0 == extraIsbns.length && 1 == this.libraries.length )
               {
                  this.insertContent("isn't in the library");

                  return;
               }
               else if ( 0 == extraIsbns.length )
               {
                  GM_log('time to try a new library');
                  this.libraries.shift();
                  extraIsbns = null;
                  this.lookupBook(originalIsbn);
                  return;
               }

               var isbn = extraIsbns.shift();

               // look up the next book
               GM_xmlhttpRequest
                  (
                  {
                    method:  'GET',
                                url:     libraryLookup.getLibrary().createSearchUrl(isbn),
                                onload:  function(results)
                                {
                                   var found = libraryLookup.getLibrary().processLookup(isbn, results);
                                   if ( found )
                                   {
                                      var library = libraryLookup.getLibrary();
                                      libraryLookup.insertContent('<a href="' +
                                                               library.createSearchUrl(isbn) +
                                                               '">Hey! The ' +
                                                               library.name + 
                                                               ' has this!');
                                      GM_log('found ' + isbn + ' - no more looking');
                                   }
                                   else
                                   {
                                      libraryLookup.keepLooking();
                                   }
                                }
                    }
                     )
            },

            // Look up an original ISBN - if this fails, fall back to the
            // alternate ISBNs provided by xisbn
            lookupBook: function(isbn)
            {
               GM_log('looking up ' + isbn + ' in the ' + this.getLibrary().name);
               this.insertContent('looking in the ' + this.getLibrary().name);
               GM_xmlhttpRequest
                  (
                  {
                    method:  'GET',
                                url:     libraryLookup.getLibrary().createSearchUrl(isbn),
                                onload:  function(results)
                                {
                                   var found = libraryLookup.getLibrary().processLookup(isbn, results);
                                   if ( found )
                                   {
                                      var library = libraryLookup.getLibrary();
                                      libraryLookup.insertContent('<a href="' +
                                                                  library.createSearchUrl(isbn) +
                                                                  '">Hey! The ' +
                                                                  library.name + 
                                                                  ' has this!');
                                      GM_log('found ' + isbn + ' - no more looking');
                                   }
                                   else
                                   {
                                      libraryLookup.lookUpAlternates(isbn);
                                   }
                                }
                    }
                    )
              },
         } // end of libraryLookup


      var theSite = whichSiteIsThis();

      originalIsbn = theSite.getIsbn();
      if ( originalIsbn )
      {
         GM_log('found isbn = "' + originalIsbn + '" on source page');
      }
      else
      {
         return;
      }

      libraryLookup.originalTitle = theSite.getOriginalTitle();
      if ( ! libraryLookup.originalTitle )
      { 
         GM_log("couldn't find the original title");
         return;
      }

      // make sure we can copy arrays
      if ( typeof Array.prototype.copy==='undefined' ) 
      {
         Array.prototype.copy = function() 
         {
            var newArray = [];
            var i = this.length;
            while( i-- ) 
            {
               newArray[i] = typeof this[i].copy !== 'undefined' ? this[i].copy() : this[i];
            }
            return newArray;
         };
      }

      // Change this to add, delete, or change order in which libraries are
      // checked
      libraryLookup.libraries = [wpl, kpl, waterlooRegion];
      libraryLookup.lookupBook(originalIsbn);
   }
)();

