// ==UserScript==
// @name        Columbus, Georgia Public LibraryLookup
// @namespace   http://www.letterneversent.com
// @description Check book availability in one or more libraries
// @include     http://*.amazon.*
// @include     http://*.powells.com/*
// @include     http://*allconsuming.net/item/view/*
// @include     http://books.google.*
// ==/UserScript==
 
// Based on Hippopottoman's script @ http://userscripts.org/scripts/show/3393
// This script was inspired by Jon Udell's userscript of similar functionality
// that he posted in his 'Further adventures in lightweight service
// composition' post of 30 January, 2006
// (http://weblog.infoworld.com/udell/2006/01/30.html).
// 
// I modified it to work with these Public Libraries


(
   function()
   {
      var xisbnQuery = 'http://labs.oclc.org/xisbn/';
      
      var isbnREplain = /(\d{7,9}[\dXx])/g;
      var isbnREdelimited = /[^\d](\d{7,9}[\dXx])[^\dXx]/;

      var extraIsbns = [];

      // Libraries -----------------------------------------------------------

      var columbusPublicLibrary =
      {
            name: 'Columbus Public Library',

            createSearchUrl: function(isbn)
            {
               // var prefix = 'http://library.cityoflewisville.com/uhtbin/cgisirsi/x/0/0/5/?searchdata1=';
		var prefix = 'http://168.12.62.248:8000/ipac20/ipac.jsp?menu=search&aspect=basic_search&npp=10&ipp=20&spp=20&profile=main&ri=&index=ISBNEX&term=';
               return prefix + isbn + '&x=21&y=9&aspect=basic_search'
            },
            
            // Get the results of a lookup - mark up the page and return true
            // if there's a hit, otherwise return false.
            processLookup: function(isbn, results)
            {
               var notFound = /Sorry\, could not find anything matching/;

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
            
      } // end columbusPublicLibrary
	  
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
      libraryLookup.libraries = [columbusPublicLibrary];
      libraryLookup.lookupBook(originalIsbn);
   }
)();