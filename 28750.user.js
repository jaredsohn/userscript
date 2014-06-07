// ==UserScript==
// @name        Dakota County Public Library - LibraryLookup
// @description Search the Dakota County (Minnesota) Library catalogs from Amazon book listings.
// @include     http://www.amazon.*
// @exclude     http://www.amazon.com/*/images/*
// @exclude     http://www.amazon.com/*/reader/*
// @grant       GM_log
// @grant       GM_xmlhttpRequest
//
// @version	1.6
// ==/UserScript==

// Version History:
// v1.0 - 06/19/2008 - Initial working script.  A rewrite of processLookup 
//                     and changes to the functions that called it were 
//                     necessary to make it work with DCL.
// v1.1 - 06/24/2008 - Fix minor issues with cover photo popups and 
//                     "Search Inside!" windows.
// v1.2 - 09/17/2008 - Do a better job of detecting and ignoring non-books.
//                     Get rid of obsolete amazon.com ISBN format check.
//                     Fix alternative ISBN searching URL.
// v1.3 - 01/24/2011 - DCL dropped the ipac library interface, and switched 
//                     to aquabrowser. This change nominally supports the 
//                     aqua interface.
// v1.4 - 01/26/2011 - Switching to use a elibrary.dakota.lib.mn.us link
//                     instead of an aqua.dakota.lib.mn.us link. Aquabrowser 
//                     is just the front-end. Going directly to elibrary 
//                     saves a lot of hassle when requesting the book.
// v1.5 - 09/11/2012 - DCL has replaced their broken aqua/elibrary catalog.
//                     Switching to use the new search.dakota.lib.mn.us.
//                     Added required @grant lines.
// v1.6 - 02/27/2014 - Updated to work with new Amazon changes.
//                     Also, DCL has changed their catalog again.
//                     Switched to use search.dakota.lib.mn.us. I prefer to use
//                     elibrary.dakota.lib.mn.us, but it doesn't seem to handle
//                     ISBN-10 searches correctly. I've left in the elibrary 
//                     code anyway, in case I find a way to fix it later. It 
//                     can be turned back on by changing the code marked CONFIG.


// Adapted by Tony Ernst from Rudi Pittman's Columbus Ga Public Library script
// (http://userscripts.org/scripts/show/14720).
// Original source written by Nick Baker, Reference and Web Services Librarian


(
   function()
   {
      var xisbnQuery = 'http://xisbn.worldcat.org/webservices/xid/isbn/';
      
      var isbnREplain = /(\d{7,9}[\dXx])/g;
	  
      var isbnAlt = /ISBN[^\d](\d{7,9}[\dXx])[^\dXx]/;
      var isbnTen = /ISBN\-10:[^\d](\d{7,9}[\dXx])[^\dXx]/;

      var extraIsbns = [];

      var bookLink = '';
	  
      // Libraries -----------------------------------------------------------

      var colpub =
      {
            name: 'Dakota County Public Library',
			image: '',

            createSearchUrl: function(isbn)
            {
               // CONFIG: Use these three lines to use search.dakota.lib.mn.us
               var prefix = 'http://search.dakota.lib.mn.us/client/default/search/results?qu=';
               var suffix = '&te=&rt=ISBN|||ISBN|||false';
               return prefix + isbn + suffix;
               // CONFIG: Use these two lines to use elibrary.dakota.lib.mn.us
               // var prefix = 'http://elibrary.dakota.lib.mn.us/uhtbin/cgisirsi.exe/x/0/0/5?searchdata1=';
               // return prefix + isbn;
            },

            createLinkUrl: function(isbn)
            {
               if(bookLink.indexOf(isbn) > 0) 
               {
                  return bookLink;
               } 
               else 
               {
                  GM_log('couldn\'t find specific URL for ' + isbn + ' - using general URL.');
                  return this.createSearchUrl(isbn);
               }
            },
            
            // Get the results of a lookup - mark up the page and return true
            // if there's a hit, otherwise return false.
            processLookup: function(isbn, results)
            {
               page = results.responseText;
               // CONFIG: This is the message for search.dakota.lib.mn.us
               if(page.indexOf('No results found in Search Results') > 0) {
               // CONFIG: This is the message for elibrary.dakota.lib.mn.us
               // if(page.indexOf('found no matches') > 0) {
                  GM_log('couldn\'t find ' + isbn + ' at the ' + this.name);
                  return false;
               }
               else
               {
                  return true;
               }
            },

      } // end colpub

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
		  try {
		  	return document.body.textContent.match(isbnTen)[1];
		  } catch ( e ) {
               		return null;
		  }
		  return null;
               },

               getOriginalTitle: function()
               {
				   
				   // Try to figure out how Amazon has the title defined

					if(document.getElementById("productTitle"))
						return document.getElementById("productTitle");
						
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
						libraryLinkDiv.innerHTML = '<div style="float:right">' + 'Amazon has changed its layout.  Please <a href="http://userscripts.org/scripts/show/28750">check for script updates</a>. &nbsp; &nbsp; ' + '<a href="javascript:void(0)" onclick="document.getElementById(\'libraryLinkDiv\').' + 'style.display=\'none\';" style="border:0px solid #000; ' + 'text-decoration:none; padding:0 3px; background-color:#fff">X</a></div>';
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
		  try {
		  	return document.body.textContent.match(isbnAlt)[1];
		  } catch ( e ) {
               		return null;
		  }
		  return null;
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
               var isbn;
               if ( ! isbns )
               {
                  isbns = [];
               }

               isbn = isbns.shift();
               
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
				  
				  this.infoSpan.style.display = 'block';
				  this.infoSpan.style.fontSize = '12px';
				  this.infoSpan.style.marginTop = '6px';
				  this.infoSpan.style.backgroundColor = '#ffff99';
				  
//				  if(this.originalTitle.id != 'libraryLinkDiv') {
//                  	var sp = document.createElement('br');
//                  	this.originalTitle.appendChild(sp);
//				  }
                  this.originalTitle.appendChild(this.infoSpan);
               }
			   
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
				   var sfx = '<B><U>NO</U></B>: the Dakota County library does <B><I>not</I></B> own this.';

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
                                           library.createLinkUrl(isbn) + '">' +
										   '<B><U>YES</U></B>: the <B>Dakota County</B> library <B><I>does</I></B> own this.  Click here to access the book on the library website.');
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
               this.insertContent('Please give me a moment while I check the library catalog ...');
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
                                           library.createLinkUrl(isbn) + '">' +
										   '<B><U>YES</U></B>: the <B>Dakota County</B> library <B><I>does</I></B> own this.  Click here to access the book on the library website.');
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
	GM_log('ISBN not found on source page');
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
      libraryLookup.libraries = [colpub];
	  
	 // libraryLookup.insertContent('Hello World');
      libraryLookup.lookupBook(originalIsbn);
   }
)();

