

// ==UserScript==
// @name        LibraryLookup for Williams College
// @description Check book availability in Williams College Libraries and consortia.  When you look at a book on Amazon.com, this script will check the catalogs of Williams, NExpress, and Williams WorldCat, and then show you the best link to get the book.
// @include     http://www.amazon.*
// @include     http://books.google.*
// ==/UserScript==
 
// Williams script originally written by Nick Baker, Reference/Web Services Librarian(http://userscripts.org/scripts/show/18998)
// Inspired by Hippopottoman's (http://userscripts.org/users/4764) mashup of
// Jon Udell's original script:

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
// Updates:
//

// 2013.4.10 Fixed GoogleBooks, added option GoogleBooks Preview, since it displays the ISBN in a different place.  Still not 100% successful for preview, but works the majority of the time.

// 2012.12.3 Changed the FRANCIS search URL.  GoogleBooks still not working correctly.

// 2011.2.25 Added search into Williams WorldCat. The GoogleBooks portion does not work correctly because it is choosing the wrong ISBN; need to investigate how to fix.
// 2009.11.12 updated url from 'http://labs.oclc.org/xisbn/' to 'http://xisbn.worldcat.org/webservices/xid/isbn/'

// 2008.04.29
// - updated to keep up with constant changes by Amazon, and to insert
//   our own layer if none of theirs work
//
// 2008.04.02
// - updated to match change in amazon
//
// 2008.01.22
// - added means to find ISBN-10: in amazon
// - added "new version" warning
//
// 2008.01.04
// - updated xpath for new amazon structure
// - added images to the book links and some styles
// - added search of last resort link into ILLiad
// - replaced other libraries with WCL and NExpress
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
      var xisbnQuery = 'http://xisbn.worldcat.org/webservices/xid/isbn/';
      var isbnREplain = /(\d{7,9}[\dXx])/g;
      var isbnREdelimited = /[^\d](\d{7,9}[\dXx])[^\dXx]/;
   
      var isbnAlt = /ISBN[^\d](\d{7,9}[\dXx])[^\dXx]/;
      var isbnTen = /ISBN\-10:[^\d](\d{7,9}[\dXx])[^\dXx]/;

      var extraIsbns = [];
   
      var scriptNumber = '18998';
      var scriptVersion = '0.9'; // Use to show link if their script is out of date

      // Libraries -----------------------------------------------------------

      var wcl =
      {
            name: 'Williams College Libraries',
            image: 'http://library.williams.edu/assets/images/sfx.gif',

            createSearchUrl: function(isbn)
            {
               var prefix = 'http://francis.williams.edu/search/i?SEARCH=';
               return prefix + isbn
            },
            // Get the results of a lookup - mark up the page and return true
            // if there's a hit, otherwise return false.
            processLookup: function(isbn, results)
            {
               var notFound = /No matches found/;

               page = results.responseText;
               if ( notFound.test(page) )
               {
                  console.log('couldn\'t find ' + isbn + ' at the ' + this.name);
                  return false;
               }
               else
               {
                  console.log('looked for ' + isbn + ' at the ' + this.name);
                  return true;
               }
            },
                  } // end wcl

      var nexpress =
         {
            name: 'NExpress',
            image: 'http://francis.williams.edu/screens/nex.gif',
          
            createSearchUrl: function(isbn)
            {
               var prefix = 'http://nexpress.iii.com/search/i';
               return prefix + isbn;
            },
            // Get the results of a lookup - mark up the page and return true
            // if there's a hit, otherwise return false.
            processLookup: wcl.processLookup,
                     } // end nexpress
      
      
    var worldcat =
         {
            name: ' Williams WorldCat',
            image: 'http://francis.williams.edu/screens/wwc.gif',
          
            createSearchUrl: function(isbn)
            {
               var prefix = 'http://williams.worldcat.org/search?q=bn:';
               return prefix + isbn;
            },
            // Get the results of a lookup - mark up the page and return true
            // if there's a hit, otherwise return false.
            processLookup: wcl.processLookup,
                     } // end worldcat


      // End of Libraries ----------------------------------------------------

      // Figure out which site the source page comes from to add a new one,
      // make a new block like the "chapters" and "amazon" variables below,
      // and extend the "if...else..." block at the bottom of this function.
      function whichSiteIsThis()
      {
         var amazon =
            {
               getIsbn: function()
               {
                  try
                  {
                     return location.href.match(isbnREdelimited)[1];
                     console.log('getting ISBN for ' + location.href.match(isbnREdelimited)[1] + '.');
                  }
                  catch ( e )
                  {

                      try {
                          return document.body.textContent.match(isbnTen)[1];
                        console.log('getting ISBN for ' + document.body.textContent.match(isbnTen)[1] + '.');
                      } catch ( e ) {
                             return null;
                      }
                  
                    return null;
                  }
               },

               getOriginalTitle: function()
               {
              
                   // Try to figure out how Amazon has the title defined

                    if(document.getElementById("btAsinTitle"))
                        return document.getElementById("btAsinTitle");
                        console.log('btASinTitle = ' + document.getElementById("btAsinTitle") + '.');
                      
                     var origTitle = document.evaluate
                     ("//div[@class='buying']//b[@class='asinTitle']",
                        document,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                      if(origTitle != null) return origTitle;
                    console.log('origTitle = ' + origTitle + '.');


                     var origTitle = document.evaluate
                     ("//div[@class='buying']//b[@class='sans']",
                        document,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                      if(origTitle != null) return origTitle;
                    console.log('origTitle = ' + origTitle + '.');

                    // fallback positions if we can't find the title
                    if(document.getElementById("jumpbar"))
                        return document.getElementById("jumpbar");
                        console.log('jumpbar = ' + document.getElementById("jumpbar") + '.');
                    if(document.getElementById("priceBlock"))
                        return document.getElementById("priceBlock");
                        console.log('priceBlock = ' + document.getElementById("priceBlock") + '.');
                                      
                    // Create a layer to hold note controls
                    try {
                        var libraryLinkDiv=document.createElement('div');
                        libraryLinkDiv.id="libraryLinkDiv";
                        libraryLinkDiv.style.display = 'block';
                        libraryLinkDiv.style.backgroundColor = '#fcf7d8';
                        libraryLinkDiv.style.marginTop = '6px';
                        libraryLinkDiv.style.padding = '6px 10px';
                        libraryLinkDiv.innerHTML = '<div style="float:right">' +
                            '<a href="http://library.williams.edu/widgets/find-text-in-amazon-help.php" ' +
                            'target="_blank" style="text-decoration:none">' +
                            'Why is the library link up here?</a> &nbsp; &nbsp; ' +
                            '<a href="javascript:void(0)" onclick="document.getElementById(\'libraryLinkDiv\').' +
                            'style.display=\'none\';" style="border:0px solid #000; ' +
                            'text-decoration:none; padding:0 3px; background-color:#fff">X</a></div>';
                        document.getElementsByTagName("div")[0].appendChild(libraryLinkDiv);
                        return libraryLinkDiv;
                    } catch ( e ) {
                        return null;  
                    }
                  
                    // nowhere to put our link!
                    return null;
                    console.log('Nowhere to put link!');

               }
            }
                     
        var googleBooks =
            {
               getIsbn: function()
               {
                 
                /*
                var findIsbnLocation = document.getElementById("buy_v");
                var findIsbnRows = findIsbnLocation.getElementsByTagName("tr");
                var findIsbnLinks = findIsbnRows[0].getElementsByTagName("a");  
                var googleISBN = findIsbnLinks[0];
                */
                var googleISBN = document.getElementById("metadata_content_table");
          
                    if (googleISBN != null)
                    {  
                        console.log('Found metadata content table');
                    }
                    else
                    {
                        console.log('no metadata found');
                    }
                  
                  try
                  {
                    /*
                     console.log('First time looking for ISBN');
                     console.log('googleISBN: ' + googleISBN);
                     console.log('Type: ' + typeof(googleISBN));
                     console.log('HREF: ' + googleISBN.href);
                     console.log('Type of HREF: ' + typeof(googleISBN.href));
                     return googleISBN.href.match(isbnREdelimited);
                     */
                     return googleISBN.innerHTML.match(/[^\d](\d{7,9}[\dXx])[^\dXx]/)[1];
                     //return location.href.match(isbnREdelimited)[1];
                  }
                  catch ( e )
                  {
                      try
                      {
                        /*(
                        console.log('Second time looking for ISBN');
                        console.log('googleISBN: ' + googleISBN);
                        console.log('Type: ' + typeof(googleISBN));
                        console.log('HREF: ' + googleISBN.href);
                        console.log('Type of HREF: ' + typeof(googleISBN.href));
                        return googleISBN.href.match(isbnAlt);
                        */
                        return googleISBN.innerHTML.match(isbnAlt)[1];
                        //return document.body.textContent.match(isbnAlt)[1];  
                      } catch ( e ) {
                         console.log('Did not match ISBN');
                            return null;
                      }
                  }
               },

               
			   getOriginalTitle: function()
               {
                   /*
                   //alert('finding title');
                  var origTitle = document.evaluate
                     (
                        "//div[@class='titlewrap']",
                        document,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                     //alert(origTitle);
                    origTitle.style.overflow = 'visible';
                    */
                    var bookInfo = document.getElementById("bookinfo");
                    var gbTitle = bookInfo.getElementsByTagName("div");
                    var origTitle = gbTitle[0];
					
                    //var origTitle = document.getElementById("gb-get-book-not-available");
                    //var origTitle = document.getElementById("synopsistext");
                    //console.log('origTitle = ' + document.getElementById("synopsistext") + '.');

                  return origTitle;
               }
			   
            }
			
		var googlePreview =
            {
               getIsbn: function()
               {
                                             			
                //var googleISBN = document.getElementById("metadata_content_table");           
				  
                  try
                  {
                     var findIsbnLocation = document.getElementById("buy_v");
					 var findIsbnRows = findIsbnLocation.getElementsByTagName("tr");
					 var findIsbnLinks = findIsbnRows[0].getElementsByTagName("a");  
					 var googleISBN = findIsbnLinks[0];
                     console.log('First time looking for ISBN');
                     console.log('googleISBN: ' + googleISBN);
                     console.log('Type: ' + typeof(googleISBN));
                     console.log('HREF: ' + googleISBN.href);
                     console.log('Type of HREF: ' + typeof(googleISBN.href));
					 console.log('Match result: ' + googleISBN.href.match(/(\d{7,13}[\dXx])/)[1]);
                     return googleISBN.href.match(/(\d{7,13}[\dXx])/)[1];
                     
                     //return googleISBN.innerHTML.match(isbnREdelimited)[1];
                     //return location.href.match(isbnREdelimited)[1];
                  }
                  catch ( e )
                  {
                     console.log('Did not match ISBN');
                            return null;
                  }
               },

               getOriginalTitle: function()
               {
                   /*
                   //alert('finding title');
                  var origTitle = document.evaluate
                     (
                        "//div[@class='titlewrap']",
                        document,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                     //alert(origTitle);
                    origTitle.style.overflow = 'visible';
                    */
                    
					/*
					var bookBar = document.getElementById("search_bar");
                    var barContent = bookBar.getElementsByTagName("div");
                    var barDiv = barContent[0];
					origTitle = barDiv.innerHTML.match("View all");
					console.log(origTitle);
					*/					
                   
                    var origTitle = document.getElementById("toolbar_container");
                    //var origTitle = document.getElementById("synopsistext");
                    //console.log('origTitle = ' + document.getElementById("synopsistext") + '.');

                  return origTitle;
               }
            }	
          
         // figure out what site we're looking at
         if ( location.href.match(/google\.com/) )
		 {
			if ( location.href.match(/frontcover/) )
			{
				//console.log(location.href)
				//alert('preview');
				return googlePreview;
				console.log('Google Books Preview');
			}
			else
			{
				//console.log(location.href);
				//alert('google books');
				return googleBooks;
				console.log('Google Books');
			}
		 } 
		 		 
         else
         {
            // Amazon's pretty popular - make it the default
            return amazon;
            console.log('Amazon.com');
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
                  console.log('NULL found');
               }
               else
               {
                  return this.cache[isbn].copy()
                  console.log('ISBN found');
              }
            },

            set: function(isbns)
            {
               var isbn = isbns.shift();
          
               if ( ! isbns )
               {
                  isbns = [];
               }

               console.log('caching ' + isbns.length + ' items: [' + isbns + '] for ' + isbn);
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
               //console.log(this.libraries[0]);
               return this.libraries[0];
            },

   
            insertContent: function(content)
            {
                if ( ! this.infoSpan )
                {
                    this.infoSpan = document.createElement("span");
                      
                    //this.infoSpan.style.display = 'block';
                    this.infoSpan.style.fontSize = '12px';
                    //this.infoSpan.style.fontSize = '8px';
                      
                    if(this.originalTitle.id != 'libraryLinkDiv')
                        {
                            var sp = document.createElement('br');
                            this.originalTitle.appendChild(sp);
                        }
                    this.originalTitle.appendChild(this.infoSpan);
                }
                  
                var updateLink = '<a href="http://library.williams.edu/widgets/find-text-in-amazon.php' +
                               '" title="Click to install the latest version of this plugin.">' +
                               '<img src="http://library.williams.edu/assets/images/script-updates/' +
                               scriptNumber + '-' + scriptVersion + '.png" border="0" hspace="5" vspace="5" ' +
                            'align="absmiddle" /></a>';
                          
                content += updateLink;
                  
                       //alert(this.originalTitle);

                this.infoSpan.innerHTML = content;   
            },

            // Look up the alternate isbns for this one.  Store the results in
            // extraIsbns and start looking them up.
            lookUpAlternates: function(isbn)
            {
               alts = xisbnCache.get(isbn);
               if ( alts )
               {
                  console.log('Looking up alternate ISBNs.');
                  extraIsbns = alts;
                  libraryLookup.keepLooking();
                  return;
               }
                                 console.log('loading extra ISBNs for ' + isbn);
               GM_xmlhttpRequest
                  (
                  {
                    method:  'GET',
                                url:     xisbnQuery + isbn,
                                onload:  function(results)
                                {
                                   var foundIsbns = results.responseText.match(isbnREplain);
                                                                      extraIsbns = xisbnCache.set(foundIsbns);
                                                                      console.log('extra ISBNs = ' + extraIsbns);
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
                   var sfxTitle = document.title.substr(12); // Knock off "Amazon.com: "
                   if(sfxTitle.indexOf(':') > 0) {
                       sfxTitle = sfxTitle.substr(0, sfxTitle.indexOf(':'));
                   }
                   var sfx = '<a target="_blank" style="text-decoration:none" ' +
                           'href="http://williams.illiad.oclc.org/illiad/' +
                       'illiad.dll?Action=10&Form=30&genre=book&title=' +
                       escape(sfxTitle) + '&isbn=' + originalIsbn + '">' +
                       '<img src="http://library.williams.edu/assets/images/will-logo-small.gif" '+
                       'align="absmiddle" vspace="10" border="0" /> ' +
                       'Request through Williams InterLibrary Loan</a>';
              
              
                  this.insertContent(sfx);

                  return;
               }
               else if ( 0 == extraIsbns.length )
               {
                  console.log('time to try a new library');
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
                                      libraryLookup.insertContent('<a target="_blank" style="text-decoration:none" href="' +
                                           library.createSearchUrl(isbn) + '">' +
                                           '<img src="' + library.image + '" ' +
                                           'border="0" vspace="10" align="absmiddle" /> ' +
                                           'Hey! ' + library.name + ' has this title!');
                                      console.log('found ' + isbn + ' - no more looking');
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
               console.log('looking up ' + isbn + ' in ' + this.getLibrary().name + '...');
               this.insertContent('looking in ' + this.getLibrary().name + '...');
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
                                      libraryLookup.insertContent('<a target="_blank" style="text-decoration:none" href="' +
                                           library.createSearchUrl(isbn) + '">' +
                                           '<img src="' + library.image + '" ' +
                                           'border="0" vspace="20" align="absmiddle" /> ' +
                                           'Hey! ' + library.name + ' has this title!');
                                      console.log('found ' + isbn + ' - no more looking');
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
         console.log('found isbn = "' + originalIsbn + '" on source page');
         //alert(originalIsbn);
      }
      else
      {
         // alert('isbn not found');
         return;
      }

      libraryLookup.originalTitle = theSite.getOriginalTitle();
      if ( ! libraryLookup.originalTitle )
      {
          //alert('title not found');
         console.log("couldn't find the original title");
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
      libraryLookup.libraries = [wcl, nexpress, worldcat];
   
     // libraryLookup.insertContent('Hello World');
      libraryLookup.lookupBook(originalIsbn);
   }
)();
