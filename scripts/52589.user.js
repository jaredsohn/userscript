// ==UserScript==
// @name           RottenFlix
// @namespace      http://www.mattblodgett.com/
// @description    Integrates Rotten Tomatoes ratings with Netflix.com
// @include        http://*.netflix.com/*
// ==/UserScript==

// Netflix already loads jQuery (1.3.2 currently).
// Just set up a $ function for convenience within this script.
$ = unsafeWindow.jQuery;

// check for new movie titles every two seconds
setInterval(addRatings, 2000);


function addRatings() {
  // get all the movie title links on the page
  var titleLinks = $(".title .mdpLink:not(.rottenFlixWasHere)");
  
  for (i in titleLinks) {
    var titleLink = titleLinks[i];
    var title = titleLink.innerHTML;
    
    // do we actually have a movie title to work with here?
    if (title) {
      $(titleLink).addClass("rottenFlixWasHere");
      $(titleLink).closest(".title").css("width", "180px").css("height", "inherit");
      $(titleLink).css("position", "static");
    
      // create a container element to hold our custom stuff
      var container = $("<span>");
      if ($(titleLink).is(".agMovieGrid a")) {
        container.css("margin-left", "4px");
      } else {
        container.css("margin-left", "1px");
      }
      
      // create a tomato image element
      var tomatoImage = $(createTomatoImage());
      
      // put the tomato image inside our container
      container.append(tomatoImage);
      
      // insert the container after this movie title link
      $(titleLink).after(container);
      
      // wire up the click event handler for this tomato image
      tomatoImage.get(0).addEventListener('click', tomatoClickHandler, true);
    }
  }
}


function tomatoClickHandler(event) {
  // get the tomato image element that triggered the click event
  var tomatoImage = $(event.target);
  
  // create a spinner image
  var spinnerImage = $(createSpinnerImage());
  
  // replace the tomato image with the spinner image
  tomatoImage.replaceWith(spinnerImage);
  
  // grab the movie title that this tomato goes along with
  var movieTitle = getMovieTitle(spinnerImage);
  
  // get the url for this movie on rottentomatoes.com
  var url = convertTitleToUrl(movieTitle);
  
  // fetch the rating at this url
  fetchRating(spinnerImage, url);
}


function createSpinnerImage() {
  return "<img height='12px' width='12px' src='http://gefopa.blu.livefilestore.com/y1pU30PwxAqpVdhluEE-RZiYA0XYeg3qp0X9sRZwaaPRT8QigtlLHNMR3tX6CD9heBzbZSfKTHarPxXdbic0qRa4lPDdyGTItXg/ajax-loader.gif' />";
}


function createTomatoImage() {
  return "<img title='Click for Rotten Tomatoes rating' style='cursor: pointer;' src='http://gefopa.blu.livefilestore.com/y1pkgFD68K9h2AvfiHarOzLvbr7conYQcC8iX61NlC-P7CyzdgytGg6winKXjQfogvQ1PXPRsa9VDIwbimbLfZQGFHNByx6BaSn/tomato_small.png' />";
}


function getReviewStatusFromRating(rawRating) {
  var reviewStatus = "";
  
  if (rawRating === null) {
    reviewStatus = "reviewNotFound";
  } else if (rawRating.indexOf("No") >= 0) {
    reviewStatus = "reviewNA";
  } else {
    reviewStatus = "reviewNumber";
  }
  
  return reviewStatus;
}


function createRatingElement(rawRating, movieTitle) {
  var ratingElement = $("<a>");
  var html = "";
  var tooltip = "";
  var href = "";

  var reviewStatus = getReviewStatusFromRating(rawRating);
  switch (reviewStatus) {
    case "reviewNotFound":
      html = "?";
      tooltip = "Search for this movie on Rotten Tomatoes";
      href = "http://www.rottentomatoes.com/search/full_search.php?search=" + movieTitle;
      break;
    case "reviewNA":
      html = "N/A";
      tooltip = "View the page for this movie on Rotten Tomatoes";
      href = convertTitleToUrl(movieTitle)
      break;
    case "reviewNumber":
      html = rawRating + "%";
      tooltip = "View the page for this movie on Rotten Tomatoes";
      href = convertTitleToUrl(movieTitle);
      break;
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
    if (parsedRating >= 60) {
      color = "red";
    } else {
      color = "green";
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


function convertTitleToUrl(title) {
  var rtUrl = "http://www.rottentomatoes.com/m/";
  title = removeSubtitles(title);
  title = title.toLowerCase();
  title = replaceWordSeparators(title);
  title = replaceAmpersands(title);
  title = removeExtraneousCharacters(title);
  title = removeLeadingArticle(title);
  title = replaceAccentedLetters(title);
  rtUrl += title + "/";
  return rtUrl;
}


function removeSubtitles(title) {
  return title.replace(/(: Collector's Series|: Collector's Edition|: Director's Cut|: Special Edition)/, "");
}


function replaceWordSeparators(title) {
  return title.replace(/( |-)/g, "_");
}


function replaceAmpersands(title) {
  return title.replace(/&/g, "and");
}


function removeExtraneousCharacters(title) {
  return title.replace(/('|,|\.|!|\?|\/|:|\[|\]|\(|\))/g, "");
}


function removeLeadingArticle(title) {
  return title.replace(/^(the|a|an)_/, "");
}


function replaceAccentedLetters(title) {
  return title.replace(/(é|è)/g, "e");
}


function deSrcHTML(html) {
  return html.replace(/src/g, "foo");
}


function fetchRating(elementToReplaceWithRating, rtUrl) {
  // make a cross-domain request for this url
  GM_xmlhttpRequest({
    method: 'GET',
    url: rtUrl,
    onload: function(responseDetails) {
      // get the HTML document that we received
      var responseHTML = responseDetails.responseText;
      
      // don't fetch images and scripts and such embedded in the HTML
      responseHTML = deSrcHTML(responseHTML);
      
      // parse out the rating text from the HTML
      var rating = $('#all-critics-meter', responseHTML).html();
      
      var movieTitle = getMovieTitle(elementToReplaceWithRating);
      
      // create an element in which to display this rating
      var ratingElement = createRatingElement(rating, movieTitle);
      
      // swap in the rating element
      elementToReplaceWithRating.replaceWith(ratingElement);
    },
    onerror: function(responseDetails) {
      console.log("failure");
    }
  });
}
