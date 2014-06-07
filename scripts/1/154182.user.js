// ==UserScript==
// @name          ShareTheFiles Enhancer
// @namespace     http://sharethefiles.com/enhancer
// @description   Shows IMDB Rating and Genre/Link to IMDB
// @include       http://sharethefiles.com/forum/viewforum.php?f=*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

// Use GM_log() or log() for console()
if(unsafeWindow.console){
	var GM_log = unsafeWindow.console;
	var log    = GM_log;
}


/** jQuery.uniq
* Author: Florent Vaucelle (florentvaucelle@gmail.com)
* 
* Get uniq values from an Array
* Data type is respected
* Usage: jQuery.uniq(anArray)
* 
* Requirement: jQuery >= 1.3
*/
// http://plugins.jquery.com/files/jquery.uniq.js_0.txt
;(function($) {
	$.uniq = function(notUniqArray) {
		// Check that we were given an array
		// If not, return the object
		if (!$.isArray(notUniqArray)) return notUniqArray;
		
		// Add each array value as a key in a map
		var map = {};
		for (var index in notUniqArray) {
			value = notUniqArray[index];
			// Store type_value as a map key,
			// unless 5 and '5' would be the same as a map key
			map[typeof value + '_' + value] = value;
		}
		
		// Build a new array with each map keys
		var uniqValues = [];
		for (var key in map) {
			uniqValues.push(map[key]);
		}
		
		return uniqValues;
	};
})(jQuery);


/**
 * jQuery.fn.sortElements
 * --------------
 * @source http://james.padolsey.com/javascript/sorting-elements-with-jquery/
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *   
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *   
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode; 
 *   })
 *   
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function(){
 	var sort = [].sort;
 
	return function(comparator, getSortable) {
 
		getSortable = getSortable || function(){return this;};
 
		var placements = this.map(function() {
 
			var sortElement = getSortable.call(this),
				parentNode = sortElement.parentNode,
 
				// Since the element itself will change position, we have
				// to have some way of storing its original position in
				// the DOM. The easiest way is to have a 'flag' node:
				nextSibling = parentNode.insertBefore(
					document.createTextNode(''),
					sortElement.nextSibling
				);
 
			return function() {
 
				if (parentNode === this) {
					throw new Error(
						"You can't sort elements if any one is a descendant of another."
					);
				}
 
				// Insert before flag:
				parentNode.insertBefore(this, nextSibling);
				// Remove flag:
				parentNode.removeChild(nextSibling);
 			};
 		});
 
		return sort.call(this, comparator).each(function(i){
			placements[i].call(getSortable.call(this));
		});
	};
})();




/**
	Forum Overview:
	- 67: Retail Rips
	- 150, 68, 135, 67, 86, 78, 98, 106, 66, 94, 87, 151, 136, 83, 88, 100, 104
*/

(function() {
	var self;
	STF              = {};
	self             = STF;

	self.forums      = [150, 68, 135, 67, 86, 78, 98, 106, 66, 94, 87, 151, 136, 83, 88, 100, 104];
	self.topicHeader = null;
	self.topics      = {};


	/**
	 * Run the script
	 */
	self.run = function() {
		var forumId;

		// Check on which subforum we are
		forumId = parseInt(window.location.href.match(/f=(\d+)/i)[1]);
		if (jQuery.inArray(forumId, self.forums) < 0) {
			return false;
		}

		self.getThreads();
		
		jQuery.each(self.topics, function(k, entry) {
			self.openThread(entry);
		});


		// Observe the title header for clicks
		self.sortTopics();
	};



	/**
	 * Get all thread links and elements
	 */
	self.getThreads = function() {
		var topicHeaderCont = $("#page-body").find(".cat").filter(function(k, ele) {
			return ($(ele).find("dt").text() == "Topics");
		});

		self.topicHeader = topicHeaderCont.find("dt");
		self.topics = jQuery.map(topicHeaderCont.siblings(".forum-content").find(".topictitle"), function(ele, k) {
			ele = $(ele);
					
			return {
				id    : k,
				title : ele.text(),
				link  : ele.attr("href"),
				ele   : ele,
				imdb  : null
			};
		});
	};



	/**
	 * Open a thread via XHR
	 * @param objevt ele The element contained in self.topics
	 */
	self.openThread = function(ele) {
		log.log("Getting information for ", ele);
		var imdbId, imdbLink;
		// Open the link
		$.get(ele.link, function(topic) {
			log.group("Information for ", ele);
			// Search for imdb
			// e.g. http://www.imdb.com/title/tt1711456/
			imdbId   = topic.match(/imdb\.com\/title\/tt(\d+)/i)[1];
			imdbLink = "http://www.imdb.com/title/tt"+imdbId+"/";
			log.log("IMDB: ", imdbId, imdbLink);
			
			self.topics[ele.id].imdbId = imdbId;
			self.topics[ele.id].imdb   = imdbLink;

			// Get IMDB infos from an external API
			self.getIMDBInfos_external(self.topics[ele.id]);
			
			log.groupEnd();
		});
	};



	/**
	 * Get IMDB infos for an entry
	 * $.get doesn't work for cross-domain, so fall back to GM_xmlhttpRequest
	 */
	self.getIMDBInfos = function(ele) {
		log.info("Opening IMDB for ", ele.title);
		log.log("Link: ", ele.imdb);
		
		GM_xmlhttpRequest({
			method : "GET",
			url    : ele.imdb,
			onload : $.proxy(self.extractInfos, self, ele)	// Only ele doesn't work here...
		});
	};



	/**
	 * Extract infos from an IMDB page
	 * @param object ele The topic element
	 * @param object transport The object returned by the GM_xmlhttpRequest call
	 */
	self.extractInfos = function(ele, transport) {
		log.warn("Trying to scrape IMDB directly", ele);
		var content, rating, genres, entry;
		content = transport.responseText;
		entry   = self.topics[ele.id];	// In JavaScript this variables are like var2 = &var1 in PHP

		try {
			content = $(content);			// Cheating, not sure if too memory expensive
			rating  = content.find("#overview-top").find(".star-box-details").find("span[itemprop='ratingValue']").text();
			genres  = jQuery.map(content.find("#maindetails_center_bottom").find("a[itemprop='genre']"), function(genre) {
				return genre.innerHTML;
			});
		}
		catch (err) {

		}

		if (!rating) {
			rating = "0.0";
		}
		if (!genres) {
			genres = ["Unknown"];
		}

		entry.rating = rating;
		entry.genres = genres;


		// Alter the DOM elements
		self.alterDOM(entry);
	};



	/**
	 * Get IMDB infos for an entry
	 * Uses the API available at:
	 * - http://imdbapi.org/
	 * - http://www.omdbapi.com/
	 * $.get doesn't work for cross-domain, so fall back to GM_xmlhttpRequest
	 */
	self.getIMDBInfos_external = function(ele, type) {
		//http://www.omdbapi.com/?i=tt0120689
		var link;
		log.info("Opening external IMDB API for ", ele.title);
		log.log("ID:   ", ele.imdbId);
		
		// Check from where we want the data
		switch (type) {
			case "default":
			case "imdbapi":
			default:
				link = "http://www.imdbapi.org/imdb/?id=tt"+ele.imdbId;
			break;


			case "alternative-1":
			case "omdbapi":
				link = "http://www.omdbapi.com/?i=tt"+ele.imdbId;
			break;
		}
		
		log.log("Type: ", type);
		log.log("Link: ", link);

		GM_xmlhttpRequest({
			method : "GET",
			url    : link,
			onload : $.proxy(self.extractInfos_external, self, {ele: ele, type: type})	// Only ele doesn't work here...
		});
	};



	/**
	 * Extract infos from the external IMDB API
	 * @param object data      Containing ele and type
	 * @param object transport The object returned by the GM_xmlhttpRequest call
	 */
	self.extractInfos_external = function(data, transport) {
		var json, entry, rating, genres, alternative;
		log.log(data, transport);
		json  = jQuery.parseJSON(transport.responseText);
		entry = self.topics[data.ele.id];	// In JavaScript this variables are like var2 = &var1 in PHP (i.e. the very same)
		
		// Rating
		if (json.rating) {
			rating = json.rating;
		}
		else if (json.imdbRating) {
			rating = json.imdbRating;
		}
		else {
			rating = "?";
		}

		// Genres
		if (json.genres) {
			genres = (typeof(json.genres) === "string") ? json.genres.split(",") : json.genres;
		}
		else if (json.Genre) {
			genres = json.Genre.split(",");
		}
		else {
			genres = ["Unknown"];
		}


		// Check for N/A or NaN
		if ( rating == "?" || rating == "N/A" || isNaN(parseInt(rating, 10)) ) {
			
			switch (data.type) {
				// Try to scrape IMDB directly
				case "alternative-1":
					self.getIMDBInfos(data.ele);
				break;

				// Try to get new infos with another API
				default:
					self.getIMDBInfos_external(data.ele, "alternative-1");
				break;
			}
		}

		// Insert the infos into the DOM
		else {
			entry.rating = rating.toFixed(1);
			entry.genres = genres;

			// Alter the DOM elements
			self.alterDOM(entry);
		}
	};



	/**
	 * Alter the DOM entries
	 */
	self.alterDOM = function(ele) {
		var span, em, rating, genres;
		span   = $("<span />");
		em     = $("<em />");
		a      = $("<a />");

		rating = span.clone().text(ele.rating).css("font-size", "1.2em").addClass("rating");
		genres = span.clone().append(" - ").append(a.attr("href", ele.imdb).text(ele.genres.join(", ")));
		span   = span.addClass("friend-online").append(rating).append(genres);
		span.insertAfter(ele.ele.next());
	};



	/**
	 * Sort the topics
	 */
	self.sortTopics = function() {
		var topics;
		
		self.topicHeader.click(function(evnt) {
			topics = $(this).closest(".cat").siblings(".forum-content").find("li");

			log.log("Sorting topics");
			log.log("topics: ", topics);
			
			topics.sortElements(function(a, b) {
				return (Number($(a).find(".rating").text()) < Number($(b).find(".rating").text())) ? 1 : -1;
			});
		});
	};



	/**
	 * Run it
	 */
	self.run();
})();