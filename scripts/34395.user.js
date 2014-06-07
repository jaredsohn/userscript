// ==UserScript==
// @name        Consortium Pre-Searcher for Williams College
// @description Checks book availability in other libraries while you are searching the FRANCIS catalog, and highlights the relevant button if the book is found.  Written by Nick Baker, Reference and Web Services Librarian.
// @include     http://francis.williams.edu/*
// ==/UserScript==
 

// Inspired by Hippopottoman's (http://userscripts.org/users/4764) mashup of
// Jon Udell's original script:

// This script was inspired by Jon Udell's userscript of similar functionality
// that he posted in his 'Further adventures in lightweight service
// composition' post of 30 January, 2006
// (http://weblog.infoworld.com/udell/2006/01/30.html).
//
// Updates:
//
// 2008.09.24
// - set up searches for NExpress and the Clark
//

(
   function()
   {
	   
	  var debugWindows = false;
	  
      var xisbnQuery = 'http://labs.oclc.org/xisbn/';
      
      var isbnREplain = /(\d{9,12}[\dXx])/g;
      var isbnREdelimited = /[^\d](\d{9,12}[\dXx])[^\dXx]/;

      var extraIsbns = [];

      // Libraries -----------------------------------------------------------

      var nexpress = 
         {
            name: 'NExpress Consortium',
			image: 'http://francis.williams.edu/screens/nex.gif',
			
			
            getConsortiumButton: function()
            {
               var src = '/webbridge/image/nex.gif';
			   	if(document.getElementsByTagName("img")) {
						for(var i=0; i<document.getElementsByTagName("img").length; i++) {
							var img = document.getElementsByTagName("img")[i];
							if(img.src.match(src)) { return img; }
						}
					}
               return null;
            },
			
            createSearchUrl: function(isbn)
            {
               var prefix = 'http://nexpress.iii.com/search/i';
               return prefix + isbn;
            },
            
            // Get the results of a lookup - mark up the page and return true
            // if there's a hit, otherwise return false.
            processLookup: function(isbn, results)
            {
				// since our own holdings are in NExpress, look for items with more than one library
               var notFound = /(No matches found|1 NExpress library has this item)/;

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
            
         } // end nexpress


      var clark = 
         {
            name: 'Clark Art Institute',
			image: 'http://francis.williams.edu/webbridge/image/clarkicon.gif',
			
			
            getConsortiumButton: function()
            {
               var src = '/webbridge/image/clarkicon.gif';
			   	if(document.getElementsByTagName("img")) {
						for(var i=0; i<document.getElementsByTagName("img").length; i++) {
							var img = document.getElementsByTagName("img")[i];
							if(img.src.match(src)) { return img; }
						}
					}
               return null;
            },
			
            createSearchUrl: function(isbn)
            {
               var prefix = 'http://137.165.18.25/search/i';
               return prefix + isbn;
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
            
         } // end clark


      // End of Libraries ----------------------------------------------------

      // Figure out which site the source page comes from to add a new one,
      // make a new block like the "chapters" and "amazon" variables below,
      // and extend the "if...else..." block at the bottom of this function.
      function whichCatalogIsThis()
      {
         var francis =
            {
               getIsbn: function()
               {

					if(document.getElementsByTagName("tr")) {
					
						for(var i=0; i<document.getElementsByTagName("tr").length; i++) {
							
							var cell = document.getElementsByTagName("tr")[i];
					
							// Convert all spaces and trim
							var text = cell.textContent.replace(/(\n|\s|\&nbsp\;)/g, " ");
							text = text.replace(/^\s*(.+\S)\s*$/, "$1");
							
							//if(text.match(/ISBN/)) { alert(text); }
							
							try { 
								return text.match(/^ISBN\s+(\d{9,12}[\dXx])(|\D.*)$/)[1]; 
							} catch ( e )  {}
						
						}
					}
					
					return null;
					
               }
            }		  
		  
		  return francis;
		  
		  
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


			// Alter the consortium button when we find a match.
            flashButton: function()
            {
               var img = libraryLookup.getLibrary().getConsortiumButton();
				
				if(img != null) {
					//alert(img.src);
					img.style.border = '4px solid #0f0';
				}
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
			   
			   if(debugWindows) { window.open(xisbnQuery + isbn); }
                  
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
			
			
			nextLibrary: function() 
			{
				this.libraries.shift();
                extraIsbns = null;
				if(this.libraries.length > 0) {
	                this.lookupBook(originalIsbn);
				} else {
					return;
				}
				
			},

            // Lookup ISBNs from the libraryLookup.extraIsbns list. If there
            // aren't any extra ISBNs left, give up in disgust. Otherwise, try
            // the first ISBN. If it doesn't work out, call keepLooking again.
            keepLooking: function()
            {
               if (extraIsbns.length == 0)
               {
				   // We're at the last alternate ISBN - next library.
                  this.nextLibrary();
                  return;
               }

               var isbn = extraIsbns.shift();
			   
			   if(debugWindows) { window.open(libraryLookup.getLibrary().createSearchUrl(isbn)); }

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
                                      libraryLookup.flashButton();
                                      GM_log('found ' + isbn + ' at the ' + libraryLookup.getLibrary().name);
									  
									  libraryLookup.nextLibrary();
									  
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
               //GM_log('looking up ' + isbn + ' in the ' + this.getLibrary().name + '...');
               //this.insertContent('looking in the ' + this.getLibrary().name + '...');
			   if(debugWindows) { window.open(libraryLookup.getLibrary().createSearchUrl(isbn)); }
				
				
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
									  GM_log('found ' + isbn + ' at the ' + libraryLookup.getLibrary().name);
									  libraryLookup.flashButton();
                                      libraryLookup.nextLibrary();
									  		
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




      var theCatalog = whichCatalogIsThis();

      originalIsbn = theCatalog.getIsbn();
      if ( originalIsbn )
      {
         GM_log('found isbn = "' + originalIsbn + '" on source page');
      }
      else
      {
         GM_log('isbn not found');
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

      // Change this to add, delete, or change order in which libraries are checked
      libraryLookup.libraries = [nexpress,clark];
	  
      libraryLookup.lookupBook(originalIsbn);

}
)();

