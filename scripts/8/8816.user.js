// ==UserScript==
// @name        OSU XISBN Library Lookup
// @namespace   
// @description Check book availability the Ohio State University Library
// @include     http://*.amazon.*
// @include     http://*.chapters.indigo.ca/*
// @include     http://*.powells.com/*
// @include     http://*allconsuming.net/item/view/*
// @include     http://books.google.*
// ==/UserScript==
//
// The basic function of this script is this: 
// when you open up a book related webpage,
// it inserts links to available versions of the book in the Ohio State
// University Library.
//
// This script is a heavily hacked up version of XISBN LibraryLookup:
//      http://userscripts.org/scripts/show/3393
// which is, in turn, an adaptation of a script by John Udell. 
// 
// It replaces my earlier "OSU Library Lookup" which was a hacked up
// version of of an earlier script by John Udell.
//
// It aims to combine the advantages of each.
//
// The main improvements of this script over "OSU Library Lookup" are
// all inherited from XISBN LibraryLookup:
//
//  (a) searching for versions of the book with other ISBNs, using OCLC's xISBN //      api
//  (b) providing results from sites other than amazon.com
//      (for the moment, I've only verified that Amazon and Powells are
//      working.)
// 
// Aside from localization to OSU, the main improvements on or differences
// between this script and "XISBN Library Lookup" are:
//
//  (a) The script inserts the current status of the book into the webpage 
//      (available, due, on order, etc.) rather than simply reporting
//      that the library has a copy. If the book is checked out, it
//      inserts the due date.
//  (b) The script finds up to 5 available versions of the book and their 
//      status.
//  (c) Further information associated with the particular version found
//      (title, year, edition, language) is provided for each found copy
//      via the "title" attribute--displayed by Firefox as a tooltip.
//
//  The script should be relatively easy to adapt to other library websites,
//  but I haven't tried. Also, the ability to look the book up in
//  multiple libraries (found in the original XISBN LibraryLookup) should 
//  remain intact, but I haven't tried.
//
(
   function()
   {
      var xisbnQuery = 'http://xisbn.worldcat.org/webservices/xid/isbn/';
      var xisbnQuerySuffix = '?method=getEditions&format=xml&fl=*';
      
      var isbnREplain = /(\d{7,9}[\dXx])/g;
      var isbnREdelimited = /[^\d](\d{7,9}[\dXx])[^\dXx]/;

      var extraIsbns = [];
      var fullIsbnData = [];
      var foundOne = 0;

      // Libraries -----------------------------------------------------------

      var OSU =
      {
            name: 'OSU',

            createSearchUrl: function(isbn)
            {
               var prefix = "http://library.ohio-state.edu/search/?searchtype=i&searcharg=";
               return prefix + isbn
            },
            
            // Get the results of a lookup - mark up the page and return true
            // if there's a hit, otherwise return false.
            processLookup: function(isbn, results)
            {
               var notFound = /No matches found/;
               var libraryAvailability = /AVAILABLE/;
               var libraryOnOrder = /ON ORDER/;
               var libraryInProcess = /IN PROCESS/;
               var libraryDueBack = /DUE (\d{2}-\d{2}-\d{2})/;
               var libraryRecentlyReturned = /Recently Returned/;
               
               page = results.responseText;
               
               if ( libraryAvailability.test(page) )
                    {
                    GM_log(isbn + ' is available ' + this.name);
                    message = "Available";
                    return message;                    
                    }
              else if ( libraryOnOrder.test(page) )
                    {
                    GM_log(isbn + ' is on order ' + this.name);
                    message = "On Order";
                    return message;
                    }
              else if (libraryInProcess.test(page))
                    {
                    GM_log(isbn + ' in process ' + this.name);
                    message = "In Process";
                    return message;
                    }
              else if ( libraryDueBack.test(page) )
                    {
                    var due = page.match(libraryDueBack)[1];
                    GM_log(isbn + ' is ' + due + ' at ' + this.name);
                    message = "Due " + due;
                    return message;
                    }
              else if ( libraryRecentlyReturned.test(page) )
                    {
                    GM_log(isbn + ' has recently been returned to ' + this.name);
                    message = "Recently returned";
                    return message;
                    }
               else if ( notFound.test(page) )
                    { 
                    GM_log('couldn\'t find ' + isbn + ' at the ' + this.name);
                    return false;
                    }
                else 
                    {
                    return "Error!";
                    }   

               
            },
            
      } // 

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
      
                     return window.location.href.match(isbnREplain)[0];
                  }
                  catch ( e ) 
                  {  GM_log("failed");
                     return null;
                  }
               },

               getOriginalTitle: function()
               {
                  var origTitle = document.evaluate
                     (
                        "//div[@style='margin: 0px 0px 5px; font-size: 18px;']", 
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
                     return window.location.href.match(isbnREdelimited)[1];
                  }
                  catch ( e ) 
                  {
                   GM_log("failed");
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
                content = '<span style="font:x-small normal;">' + content + "</span>";
               this.infoSpan.innerHTML = this.infoSpan.innerHTML + content;
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
                                url:     xisbnQuery + isbn + xisbnQuerySuffix,
                                onload:  function(results)
                                {
                                   var foundIsbns = []; 
                                   var parser=new DOMParser();                                   var doc=parser.parseFromString(results.responseText,"application/xml");
                                   allIsbns = doc.getElementsByTagName("isbn");
                                   for (var i = 0; i < allIsbns.length; i++) {
                                        foundIsbns[i] = allIsbns[i].textContent;
                                        thisIsbn = foundIsbns[i];
                                        fullIsbnData[thisIsbn] = allIsbns[i];                                     
                                    }
                                   //var foundIsbns = results.responseText.match(isbnREplain);
                                   
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
               if ( 0 == extraIsbns.length && 1 == this.libraries.length && 0 == foundOne)
               {
                  this.insertContent("No copies");

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
                                     foundOne = ++foundOne;
                                      var library = libraryLookup.getLibrary();
                                      var title = fullIsbnData[isbn].getAttribute('title');
                                      var edition = fullIsbnData[isbn].getAttribute('ed');
                                      var year = fullIsbnData[isbn].getAttribute('year');
                                      var language = fullIsbnData[isbn].getAttribute('lang');
                                      var linkTitle = title + " " + edition + " " + year + " " + language;
                                      libraryLookup.insertContent('<a title="' + linkTitle + '" href="' +
                                                                  library.createSearchUrl(isbn) +
                                                                  '">' + found + '</a> ');
                                      //GM_log('found ' + isbn + ' - no more looking');
                                      GM_log('hits: ' + foundOne);
                                      if ( foundOne < 5) {
                                        libraryLookup.keepLooking();
                                      }
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
               this.insertContent(this.getLibrary().name + ':');
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
                                      foundOne = ++foundOne;
                                      var library = libraryLookup.getLibrary();
                                      libraryLookup.insertContent('<a title="the same isbn as the book on this page" href="' +
                                                                  library.createSearchUrl(isbn) +
                                                                  '">' + found + '</a> ');
                                    //  GM_log('found ' + isbn + ' - no more looking');
                                    libraryLookup.lookUpAlternates(isbn);
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
      libraryLookup.libraries = [OSU];
      libraryLookup.lookupBook(originalIsbn);
   }
)();

