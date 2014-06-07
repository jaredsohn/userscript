// ==UserScript==
// @name        Gail Borden Public Library in Elgin, IL - LibraryLookup
// @description Search the GBPL catalogs from Amazon book listings.
// @include     http://www.amazon.*
// @include     http://books.google.*
// @exclude     http://www.amazon.com/*/images/*
// @exclude     http://www.amazon.com/*/reader/*
//
// @version	0.2
// ==/UserScript==

// Version History:
// v0.1 - 05/11/2010 - First try, but all I did was change someone elses script a little bit 


// Adapted by LeRoy Herrmann from a script originally adapted by Tony Ernst 
// (http://userscripts.org/scripts/show/28751
// from Rudi Pittman's Columbus Ga Public Library script
// (http://userscripts.org/scripts/show/14720).
// Original source written by Nick Baker, Reference and Web Services Librarian
// Many thanks to those above who did all of the hard work

(
   function()
   {
      var xisbnQuery = 'http://xisbn.worldcat.org/webservices/xid/isbn/';
      
      var isbnREplain = /(\d{7,9}[\dXx])/g;
	  
      var isbnAlt = /ISBN[^\d](\d{7,9}[\dXx])[^\dXx]/;
      var isbnTen = /ISBN\-10:[^\d](\d{7,9}[\dXx])[^\dXx]/;

      var extraIsbns = [];

      // Libraries -----------------------------------------------------------

      var colpub =
      {
            name: 'GBPL',
			image: '',

            createSearchUrl: function(isbn)
            {
               var prefix = 'http://innovative.gailborden.info/search/i?SEARCH=';
               return prefix + isbn;
            },

            // Get the results of a lookup - mark up the page and return true
            // if there's a hit, otherwise return false.
            processLookup: function(isbn, results)
            {
               var notFound = /No matches found;/;

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
						libraryLinkDiv.innerHTML = '<div style="float:right">' + 'Amazon has changed its layout.  Please <a href="http://userscripts.org/scripts/show/28751">check for script updates</a>. &nbsp; &nbsp; ' + '<a href="javascript:void(0)" onclick="document.getElementById(\'libraryLinkDiv\').' + 'style.display=\'none\';" style="border:0px solid #000; ' + 'text-decoration:none; padding:0 3px; background-color:#fff">X</a></div>';
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
				  
				  //this.infoSpan.style.display = 'block';
				  this.infoSpan.style.fontSize = '12px';
				  
				  if(this.originalTitle.id != 'libraryLinkDiv') {
                  	var sp = document.createElement('br');
                  	this.originalTitle.appendChild(sp);
				  }
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
				   var sfx = '<B><U>NO</U></B>: the <B>GBPL</B> public library does <B><I>not</I></B> own this.';

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
										   '<B><U>YES</U></B>: the <B>GBPL</B> public library <B><I>does</I></B> own this.  Click here to access the book on the library website.');
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
                                           library.createSearchUrl(isbn) + '">' +
										   '<B><U>YES</U></B>: the <B>GBPL</B> public library <B><I>does</I></B> own this.  Click here to access the book on the library website.');
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