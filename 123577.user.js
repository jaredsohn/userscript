// ==UserScript==
// @name           IMDbFlix
// @namespace      Locosux
// @description    Adds IMDb ratings to the Netflix ui
// @include        http://*.netflix.com/*
// ==/UserScript==

// Netflix already loads jQuery (1.3.2 currently).
// Just set up a $ function for convenience within this script.
$ = unsafeWindow.jQuery;

// check for new movie titles every two seconds
setInterval(addRatings, 1000);



function addRatings() {
  // get all the movie title links on the page
  var titleLinks = $(".title .mdpLink:not(.imdbflix)");
  var yearLinks = $(".year");
  
  for (i in titleLinks) {
    var titleLink = titleLinks[i];
	var yearLink = yearLinks[i];
	var year = yearLink.innerHTML;
    var title = titleLink.innerHTML;
	
    if (title) {
		$(titleLink).addClass("imdbflix");
		$(titleLink).closest(".title").css("width", "300px").css("height", "inherit");
		$(titleLink).css("position", "static");
		
		  // create a container element to hold our custom stuff
		var container = $("<span>");
		if ($(titleLink).is(".agMovieGrid a")) {
			container.css("margin-left", "4px");
		} else {
			container.css("margin-left", "1px");
		}
		  
		// create a spinner image element
		var spinnerImage = $(createSpinnerImage());
		  
		// put the spinner image inside our container
		container.append(spinnerImage);
		  
		// insert the container after this movie title link
		$(titleLink).after(container);
		
		// fetch the rating at this url
		fetchRating(spinnerImage, title, year);
    }
  }
}


function createSpinnerImage() {
  return "<img height='12px' width='12px' src='http://gefopa.blu.livefilestore.com/y1pU30PwxAqpVdhluEE-RZiYA0XYeg3qp0X9sRZwaaPRT8QigtlLHNMR3tX6CD9heBzbZSfKTHarPxXdbic0qRa4lPDdyGTItXg/ajax-loader.gif' />";
}


function createRatingElement(rawRating, movieTitle, year, imdbid, response) {
  var ratingElement = $("<a>");
  var html = "";
  var tooltip = "";
  var href = "";

if(response == 'True'){
      html = rawRating;
      tooltip = "View the page for this movie on IMDb";
      href = "http://www.imdb.com/title/" + imdbid + "/"
}
else{
      html = "?";
      tooltip = "View the page for this movie on IMDb";
	  href = "http://www.imdb.com/find?q=" + movieTitle + "&s=all";
}
  ratingElement.css("color", getColorFromRating(rawRating)).css("position", "static");
  ratingElement.html(html);
  ratingElement.attr("href", href);
  ratingElement.attr("target", "_blank");
  ratingElement.attr("title", tooltip);
  
  return ratingElement;
}


function getColorFromRating(rawRating) {
  var color = "";
  
  var parsedRating = parseInt(rawRating);
  
  if (!isNaN(parsedRating)) {
    if (parsedRating >= 6.0) {
      color = "DarkBlue";
    } else {
      color = "DarkRed";
    }
  } else {
    color = "black";
  }
  
  return color;
}


function getMovieTitle(customElement) {
  var movieTitleAnchor = customElement.parents(".title").children("a");
  var movieTitle = movieTitleAnchor.text().trim();
  return movieTitle;
}


function convertTitleToUrl(title,year) {
  var rtUrl = "http://www.imdbapi.com/?t=";
  title = title.substring(1,title.length-1);
  rtUrl += title + "&y=";
  rtUrl += year.substring(0,4) + "";
  return rtUrl;
}


function fetchRating(elementToReplaceWithRating, title,year,callback) {
  var Rurl = convertTitleToUrl(title,year);
  
  GM_xmlhttpRequest({
    method: 'GET',
	url: Rurl,
	headers:{
		"User-Agent":"monkeyagent",
		"Accept":"text/monkey,text/xml",
	},
    onload: function(details) {
      //Get info from imdbapi
		var imdbJSON = eval("(" + details.responseText + ")");
		var ratingElement = createRatingElement(imdbJSON.Rating, title,year, imdbJSON.ID, imdbJSON.Response);
		elementToReplaceWithRating.replaceWith(ratingElement);
    },
    onerror: function(responseDetails) {
      console.log("failure");
    }
  });
}
