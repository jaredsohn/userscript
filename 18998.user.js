// ==UserScript==
// @name        XISBN LibraryLookup for Williams College
// @description Check book availability in Williams College libraries and consortia.  When you look at a book on Amazon.com, this script will check the catalogs of Williams and NExpress, then show you in the best link to get the book.  Written by Nick Baker, Reference and Web Services Librarian.
// @include     http://www.amazon.*
// @include     http://books.google.*
// ==/UserScript==
 

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
// The latest version of this script is always available at 
// http://userscripts.org/scripts/show/18998
//
// Updates:
//
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
      var xisbnQuery = 'http://labs.oclc.org/xisbn/';
      
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
            name: 'Williams College Library',
			image: 'http://library.williams.edu/assets/images/sfx.gif',

            createSearchUrl: function(isbn)
            {
               var prefix = 'http://francis.williams.edu/search/i';
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
                  GM_log('couldn\'t find ' + isbn + ' at the ' + this.name);
                  return false;
               }
               else
               {
                  return true;
               }
            },
            
      } // end wcl

      var nexpress = 
         {
            name: 'NExpress Consortium',
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
                  }
                  catch ( e ) 
                  {

					  try {
					  	return document.body.textContent.match(isbnTen)[1];
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
						
 					var origTitle = document.evaluate
                     ("//div[@class='buying']//b[@class='asinTitle']", 
                        document,
                        null, 
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                  	if(origTitle != null) return origTitle;


 					var origTitle = document.evaluate
                     ("//div[@class='buying']//b[@class='sans']", 
                        document,
                        null, 
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                  	if(origTitle != null) return origTitle;

					// fallback positions if we can't find the title
					if(document.getElementById("jumpbar"))
						return document.getElementById("jumpbar");
					if(document.getElementById("priceBlock"))
						return document.getElementById("priceBlock");
										
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
					  try {
					  	return document.body.textContent.match(isbnAlt)[1];
					  } catch ( e ) {
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
					var origTitle = document.getElementById("synopsistext");

                  return origTitle;
               }
            }
			   
         // figure out what site we're looking at
         if ( location.href.match(/google\.com/) )
         {
			// alert('google books');
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
				  
				  //this.infoSpan.style.display = 'block';
				  this.infoSpan.style.fontSize = '12px';
				  
				  if(this.originalTitle.id != 'libraryLinkDiv') {
                  	var sp = document.createElement('br');
                  	this.originalTitle.appendChild(sp);
				  }
                  this.originalTitle.appendChild(this.infoSpan);
               }
			   
			   var updateLink = '<a href="http://userscripts.org/scripts/source/' + scriptNumber + 
			   		'.user.js" title="Click to install the latest version of this script.">' +
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
                                      libraryLookup.insertContent('<a target="_blank" style="text-decoration:none" href="' +
                                           library.createSearchUrl(isbn) + '">' +
										   '<img src="' + library.image + '" ' +
										   'border="0" vspace="10" align="absmiddle" /> ' +
										   'Hey! The ' + library.name + ' has this title!');
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
               GM_log('looking up ' + isbn + ' in the ' + this.getLibrary().name + '...');
               this.insertContent('looking in the ' + this.getLibrary().name + '...');
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
										   'Hey! The ' + library.name + ' has this title!');
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
      libraryLookup.libraries = [wcl, nexpress];
	  
	 // libraryLookup.insertContent('Hello World');
      libraryLookup.lookupBook(originalIsbn);
   }
)();

