// ==UserScript==                                                               
// @name			IMDb for The Q&A Podcast
// @namespace		http://www.jhaines.name/imdb-for-theqandapodcast/
// @author			Jason
// @version			0.1
// @description		Add IMDb links and ratings to the http://www.theqandapodcast.com/ movie review site. Script has been designed for reusability for other sites.
// @include			http://www.theqandapodcast.com/*
// @include			http://*.theqandapodcast.com/*
// ==/UserScript==                                                              

//
// Chrome prefers the @match declarations, but this prevents cross-origin requests (http://code.google.com/chrome/extensions/xhr.html)
// from cineman.ch to imdb.com
//

function QandAHandler () {
    // <summary>
    // Implement a PageHandler for finding movie links on http://www.theqandapodcast.com/.
    //
    // cineman.ch movie links look like:
    //	<h3 class="post-title entry-title">
	//		<a href="http://www.theqandapodcast.com/2011/07/cowboys-aliens-q.html">Cowboys &amp; Aliens Q&amp;A</a>
	//	</h3>
    //
    // The IMDb links are added after the link
    // </summary>

	var loggingOn = true;
    
    this.getMovieElements = function(baseElement) {
        // <summary>
        // Find and return all the DOM Elements that are associated with movie references in the given page
        //
        // This cineman.ch version looks for @class=listingtitle elements
        //
        // @parameter baseElement the DOM Element (document.body) to search in 
        // @returns an array of DOM Elements of each movie reference (e.g. their hyperlink)
        // </summary>

		var elementList = [];
		
		var document = baseElement.ownerDocument;
		var movieElements = document.evaluate("//h3[@class='post-title entry-title']", baseElement.ownerDocument, null, XPathResult.ANY_TYPE, null );
		var movieElement = movieElements.iterateNext();
		while ( movieElement ) {
			elementList.push ( movieElement );
			movieElement = movieElements.iterateNext();
		}

        return elementList;
    };
    
    
    this.addRatingElement = function( ratingElement, movieElement ) {
        // <summary>
        // Adds a given DOM ratingElement relative to the given movieElement.
        // The function decides on the best positioning of the element for the page layout.
        // A simple version might be to insert the ratingElement immediately before the movieElement.
        //
        // This cineman.ch version adds the element to the adjacent TD table cell.
        //
        // @parameter ratingElement the DOM Element to add
        // @parameter movieElement an element from the list from this.getMovieElements()
        // </summary>

		loggingOn?GM_log( "addRatingElement( " + ratingElement + ", " + movieElement + " )" ):void(0); 
		var document = movieElement.ownerDocument;
        movieElement.appendChild( document.createTextNode("(") );
        movieElement.appendChild( ratingElement );
        movieElement.appendChild( document.createTextNode(")") );
    };
    
    
    this.getMovieNameForMovieElement = function(movieElement) {
        // <summary>
        // Returns the movie name for the given movieElement.
        // 
        // This cineman.ch version is able to extract the release year and this is appended.
        //
        // @parameter movieElement an element from the list from this.getMovieElements()
        // @returns The name of the movie, optionally with " (release-year)" appended 
        // </summary>

        var text = movieElement.textContent;
		text = text.replace( /\s+Q&A\s*$/, '' ); // remove trailing " Q&A"
		text = text.replace( /^[^-]+\s*-\s*/, '' ); // remove leading "Interviewee - "
		return text
    };
};


function ImdbInfo () {
    // <summary>
    // A class to encapsulate IMDb reference info.
    // </summary>
    
    this.ID = ""; // IMDb Id. e.g. tt0499549
    this.Title = ""; // the movie title
    this.Year = 0; // release year
    this.Rating = 0; // IMDb rating out of 10
    
    this.getUrl = function() {
        // <summary>
        // The IMDb URL of this movie
        //
        // @returns A URL that will return the link for this movie in IMDb
        // </summary>
        
        return "http://www.imdb.com/title/" + this.ID + "/";       
    }
};


function ImdbComMovieLookup () {
    // <summary>
    // A class that uses http://www.imdb.com/ to lookup movie info
    // </summary>
    
    var loggingOn = true;

	this.imdbSearchUrl = function(movieName) {
        // <summary>
        // Utility function. A URL to do a title search for the given movieName on IMDb.
        // Search is more accurate if release year is appended. e.g. "Avatar (2009)" 
        //
        // @parameter movieName The movie name as on the original page
        // @returns A URL that will return search results from IMDb
        // </summary>
        
        return "http://www.imdb.com/find?s=tt&q=" + movieName;
    };
  

    this.parseImdbSearchPage = function( movieName, imdbPageText, onloadImdbInfo ) {
        // <summary>
        // Parse an IMDb search results page. Parse (via callback) the first results link.
        //
        // @parameter movieName The movie name as on the original page
        // @parameter imdbPageText The text of the search results page
		// @parameter onloadImdbInfo Function(movieName, imdbInfo) that is called on completion
        // <summary>
        var imdbFirstResultRegex = new RegExp('Popular Titles.*?href="(/title/tt[0-9]+/)"');

        var resultMatch = imdbFirstResultRegex.exec(imdbPageText); 
        
        if ( resultMatch == null ) {
            GM_log("parseImdbSearchPage() Couldn't find first search result for " + movieName);
        } else {
                    
            var firstResultUrl = "http://www.imdb.com" + resultMatch[1]; 
            var that = this; // ensure callback to correct object
        
            GM_xmlhttpRequest({
                'method': 'GET',
                'url': firstResultUrl,
                'onload': function (xhr) {
                    that.parseImdbPage( movieName, xhr.responseText, onloadImdbInfo );
                }
            });
        }
    };

	
	this.parseImdbPage = function( movieName, imdbPageText, onloadImdbInfo ) {
        // <summary>
        // Parse a page returned from an IMDb search. May be a movie result or a search page.
        //
        // @parameter movieName The movie name as on the original page
        // @parameter imdbPageText The text of the page. 
		// @parameter onloadImdbInfo Function(movieName, imdbInfo) that is called on completion
        // </summary>

		loggingOn?GM_log("parseImdbPage( " + movieName + ", <imdbPageText> " + onloadImdbInfo + " )"  ):void(0);

       
        // search resolved to a movie page
        var searchPageRegex = new RegExp("<title>.*?Search.*?</title>", "m"); 
        var moviePageRegex = new RegExp("<title>(.*?) \\((\\d{4}).*?</title>(?:.*?\n)*?.*?/title/(tt\\d+)/", "im"); 
        
        if ( searchPageRegex.test( imdbPageText )) { // search returned a results page
            loggingOn?GM_log("multiple matches found"):void(0);

            this.parseImdbSearchPage(movieName, imdbPageText, onloadImdbInfo );
 
        } else if ( moviePageRegex.test( imdbPageText ) ) { // search returned a movie page
            
            var imdbInfo = new ImdbInfo(); // extracted movieInfo
                                          
            imdbInfo.Title = RegExp.$1;
            imdbInfo.Year = RegExp.$2;
            imdbInfo.ID = RegExp.$3;
            
            var ratingRegex = new RegExp('<span class="value" itemprop="ratingValue">([\.0-9]+)</span>');
            var matchRatingRegex = ratingRegex.exec(imdbPageText);
            if ( matchRatingRegex != undefined ) {
                imdbInfo.Rating = matchRatingRegex[1];

				// invoke the callback - we have the data!
				onloadImdbInfo( movieName, imdbInfo );
			}
            
        } else {
            // match failed
            loggingOn?GM_log( "parseImdbPage() couldn't parse IMDb search result page for " + movieName ):void(0);
        }
	};
	
	
    this.loadImdbInfoForMovieName = function( movieName, onloadImdbInfo ) {
		// <summary>
		// Load the ImdbInfo for the given movieName, invoke the onloadImdbInfo callback on completion.
		//
        // @parameter movieName The movie name as on the original page
		// @parameter onloadImdbInfo Function(movieName, imdbInfo) that is called on completion
		// </summary>

		loggingOn?GM_log("loadImdbInfoForMovieName( " + movieName + ", " + onloadImdbInfo + " )"  ):void(0);
		
		var that = this; // route the XHR callback to correct object
        GM_xmlhttpRequest({
            'method': 'GET',
            'url':  this.imdbSearchUrl(movieName),
            'onload': function (xhr) {
                that.parseImdbPage( movieName, xhr.responseText, onloadImdbInfo );
            }
        });
	}
}


function ImdbapiComMovieLookup () {
    // <summary>
    // A class that uses http://www.imdb.apicom/ to lookup movie info
    // </summary>
    
    var loggingOn = true;

	this.imdbSearchUrl = function(movieName) {
        // <summary>
        // A URL that will search for the movieName on imdb.com.
		// We use imdb.com since imdbapi.com doesn't return (particarly) human readable results
        //
        // @parameter movieName The movie name as on the original page
        // @returns A URL that will return search results from IMDb
        // </summary>
        
        return "http://www.imdb.com/find?s=tt&q=" + movieName;
    };
  

	this.imdbapiSearchUrl = function(movieName) {
        // <summary>
        // Utility function. A URL to do a title search for the given movieName on IMDb.
        // Search is more accurate if release year is appended. e.g. "Avatar (2009)" 
        //
        // @parameter movieName The movie name as on the original page
        // @returns A URL that will return search results from IMDb
        // </summary>
        
        return "http://www.imdbapi.com/?i=&t=" + escape(movieName);
    };
  

	this.parseApiPage = function( movieName, apiPageText, onloadImdbInfo ) {
        // <summary>
        // Parse a page returned from an IMDb search. May be a movie result or a search page.
        //
        // @parameter movieName The movie name as on the original page
        // @parameter imdbPageText The text of the page. 
		// @parameter onloadImdbInfo Function(movieName, imdbInfo) that is called on completion
        // </summary>

		loggingOn?GM_log("parseApiPage( " + movieName + ", <imdbPageText> " + onloadImdbInfo + " )"  ):void(0);

		var imdbInfo = JSON.parse( apiPageText );

		// augment with getUrl function
		imdbInfo.getUrl = function() {
			// <summary>
			// The IMDb URL of this movie
			//
			// @returns A URL that will return the link for this movie in IMDb
			// </summary>
			
			return "http://www.imdb.com/title/" + this.ID + "/";       
		}

		onloadImdbInfo( movieName, imdbInfo );
	};
	
	
    this.loadImdbInfoForMovieName = function( movieName, onloadImdbInfo ) {
		// <summary>
		// Load the ImdbInfo for the given movieName, invoke the onloadImdbInfo callback on completion.
		//
        // @parameter movieName The movie name as on the original page
		// @parameter onloadImdbInfo Function(movieName, imdbInfo) that is called on completion
		// </summary>

		loggingOn?GM_log("loadImdbInfoForMovieName( " + movieName + ", " + onloadImdbInfo + " )"  ):void(0);
		
		var searchUrl = this.imdbapiSearchUrl( movieName );
		loggingOn?GM_log("loadImdbInfoForMovieName() searchUrl=" + searchUrl  ):void(0);
		
		var that = this; // route the XHR callback to correct object
        GM_xmlhttpRequest({
            'method':	'GET',
            'url':		searchUrl,
            'onload':	function (xhr) {
                that.parseApiPage( movieName, xhr.responseText, onloadImdbInfo );
            }
        });
	}
}


function ImdbMarkup ( pageHandler, movieLookupHandler ) {
    // <summary>
    // A class to markup a page with IMDb ratings.
    //
    // The public doMarkup() method will markup the specified page.
    //
    // @parameter pageHandler An object that implements the wesite specifice methods that will find the movie elements in the HTML page.
    // @parameter movieLookupHandler An object that implements the methods that will lookup movie details from an external website.
    // <summary>
    this.pageHandler = pageHandler;
	this.movieLookupHandler = movieLookupHandler;
    
    var loggingOn = false;
    
	this.imdbInfoLoaded = function( movieName, imdbInfo ) {
		// <summary>
		// Callback function. Called once the movie information has been loaded
		//
        // @parameter movieName The movie name as on the original page
        // @parameter imdbInfo The movie info from IMDb
		// </summary>

        loggingOn?GM_log("imdbInfoLoaded( " + movieName + ", [" + typeof(imdbInfo) + "]" + imdbInfo + " )"  ):void(0);
        this.setRatingsByMovieName( movieName, imdbInfo );
	}
	
	
    this.setRatingOnElement = function( ratingElement, imdbInfo ) {
        // <summary>
        // Set the rating info on the given DOM element.
        //
        // @paramater ratingElement The DOM element to display the info in.
        // @parameter imdbInfo The movie info from IMDb
        // </summary>
        
        ratingElement.getElementsByTagName("a")[0].setAttribute( "href", imdbInfo.getUrl() );
        ratingElement.getElementsByClassName("imdbRating")[0].innerHTML = imdbInfo.Rating;
    }
    
    this.setRatingsByMovieName = function( movieName, imdbInfo ) {
        // <summary>
        // Set the rating info on all elements that match the movieName (may be multiple).
        //
        // @parameter imdbInfo The movie info from IMDb
        // @parameter movieName The movie name as on the original page
        // </summary>
        
        var ratingElements = movieNameToElementList[movieName];
        for ( var i = 0; i < ratingElements.length; ++i  )
        {
            var ratingElement = movieNameToElementList[movieName][i];
            this.setRatingOnElement( ratingElement, imdbInfo );
        }

    };
    
	
	this.createRatingElement = function( document, movieName ) {
		// <summary>
		// Create and return a DOM element for the given DOM document that contains ratings info
		// </summary>
		
		loggingOn?GM_log( "createRatingElement( " + document + "," + movieName + " )" ):void(0);
		
		var ratingElement = document.createElement( "span" );
		var searchUrl = movieLookupHandler.imdbSearchUrl( movieName )
		ratingElement.setAttribute( "name", movieName );
		ratingElement.innerHTML = '<a href="' + searchUrl + '">' +
			'IMDb: <span class="imdbRating">...</span>/10</a>';
		return ratingElement;
	};
	

    // An associate array that maps the original movie name to an Array (1 or more) of DOM Elements 
    var movieNameToElementList = {};
        
    this.doMarkup = function( baseElement ) {
        // <summary>
        // Search the gives DOM structure and markup any movies found with IMDb ratings elements
		// The constructor parameter
		//
        // @parameter baseElement The DOM Element (document.body) to markup movies in
        // </summary>
        
		loggingOn?GM_log( "doMarkup()" ):void(0);
		
        // scan page, add IMDb elements
        var movieElements = pageHandler.getMovieElements( baseElement );
        for ( var i = 0; i < movieElements.length; ++i ) {
            var movieElement = movieElements[i];
            var movieName = pageHandler.getMovieNameForMovieElement( movieElement );

            // add IMDb ratings element
            var ratingElement =  this.createRatingElement( baseElement.ownerDocument, movieName );
            pageHandler.addRatingElement( ratingElement, movieElement);

            // store ratings element to movieNameToElementList
            if ( movieNameToElementList[movieName] == undefined ) { 
                movieNameToElementList[movieName] = []; // create empty Array
            }
            movieNameToElementList[movieName].push( ratingElement );
        }
        
		var that = this;
        // load and set ratings for each movie name found
        for ( var movieName in movieNameToElementList ) {
            this.movieLookupHandler.loadImdbInfoForMovieName( movieName,
				function(movieName, imdbInfo) { that.imdbInfoLoaded(movieName, imdbInfo) } // callback imdbInfoLoaded
			);
		}
	}
};    


(function () { 
    return { 
        init: function () { 
			var pageHandler = new QandAHandler(); // we are processing QandAHandler.ch pages
			//var movieLookupHandler = new ImdbComMovieLookup(); // use imdb.com to lookup movie info
			var movieLookupHandler = new ImdbapiComMovieLookup(); // use imdbapi.com to lookup movie info
			
			var pageMarkup = new ImdbMarkup( pageHandler, movieLookupHandler );
            pageMarkup.doMarkup( document.body ); 
        }
    }; 
}()).init();
