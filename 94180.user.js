// ==UserScript==
// @name           RottenFlix Canada
// @namespace      http://www.bulman.ca
// @description    Integrates Rotten Tomatoes ratings with Netflix.ca, this is a mod of Matt Blodgett's netflix.ca script
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
  return "<img height='12px' width='12px' src='data:image/gif;base64,R0lGODlhEAAQAPIGAMLCwkJCQpKSkoKCgmJiYgAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUAE/ACH5BAkKAAYALAAAAAAQABAAAANLaLogAitK52QEUIzxBoEMJnZBMFxiRJSEhLkeCJSgNQdzUQSWEuglYM/w291qLpoCQPi4kIaVCfVaDEqDxkOEZGYpkGpPwxmiHpYEACH5BAkKAAYALAAAAAAQABAAAANGaLogAitK5yQDWIzxBoEXlgFDEAyRCCqESaRi6oEA8VkKYNYmigeFwsmFMwCFtcFKogvQHMsiRVCMaDgGTHWkqoaiRa0lAQAh+QQJCgAGACwAAAAAEAAOAAADO2i6IAIrSuckA1iM8QaBF5YBQxAMkQgqhEmkYuqBzWMpgFlXd1AUAQ3nZvABR8RcYIUhSlTO0CrajCYAACH5BAkKAAYALAAAAAAQAAoAAAMvaLogAitK5yQDWIzxBoEXlgFDEAyRCCqESaRi6q2YxZjqKgVFEag2A89nqAUBuAQAIfkECQoABgAsAgAAAA4ACgAAAytoaiACKy7npAJQjPEGgQwmdkEwXGJElMSCSYAHWhFQznRQFAG96Dzf5ZYAACH5BAkKAAYALAIAAAAOAA4AAAM0aGrQsHC5F9mbQAiK59DKBAmfIFGShlbSQKzVEAQDuxAzYYcuLM0+SKBQCOwMw+IRAFQkAAAh+QQJCgAGACwCAAAADgAQAAADPWhqIAIrLuekAlCM8TBkHtZ5F7mE55diltU87ckJsaJxNQi3ADGoLUIgQHANAYPhwBIoFAK9H9MZyAGOlgQAIfkEBQoABgAsAgAAAA4AEAAAA0VoaiACKy7npAJQjPEGgQwmdkEwXGJElMSCSYAHWpE40zbtpnoolrfGQxEoFAIRCqh4BBAGjY3gAlwFWo6bYsDqMZ5aQwIAOw==' />";
}


function createTomatoImage() {
  return "<img title='Click for Rotten Tomatoes rating' style='cursor: pointer;' src='data:image/gif;base64,R0lGODlhDAAMAKIHAPHk4O0eJeyccFeXQexXOaEhIqBuTf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozOTdBQjkwMTBERUYxMUUwODg0QUJDQUI0NEJFMEJFMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozOTdBQjkwMjBERUYxMUUwODg0QUJDQUI0NEJFMEJFMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM5N0FCOEZGMERFRjExRTA4ODRBQkNBQjQ0QkUwQkUxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM5N0FCOTAwMERFRjExRTA4ODRBQkNBQjQ0QkUwQkUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAABwAsAAAAAAwADAAAAzt4ejCysI0yBoim1mwuEEWgGUHRCQGRBSIbCEQswKVLpDPt2sQc74VbSugyAXbFQsEDVBYeig/B2VEkAAA7' />";
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