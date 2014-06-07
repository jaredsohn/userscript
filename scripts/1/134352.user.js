// ==UserScript==
// @name			IMDbFlix (fixed)
// @namespace		Locosux (updated by ruiz107)
// @description		Adds IMDb ratings to the Netflix ui
// @include			http://*.netflix.com/*
// @include			http://*.netflix.com/WiMovie/*
// @include			http://*.netflix.com/Movie/*
// @exclude			http://movies.netflix.com/WiPlayer*
// ==/UserScript==

// Netflix already loads jQuery (1.3.2 currently).
// Just set up a $ function for convenience within this script.
$ = unsafeWindow.jQuery;

// check for new movie titles every two seconds
setInterval(addRatings, 1000);

function addRatings() {

	// get all the movie title links on the page
	// that'll get all the popup titles
	if ($(".title").length > 0)	{
		var titleLinks = $(".title:not(.imdbflix)");
	}

	// if not found, then try to search for the title on the show page
	//if (titleLinks.length == 0) {
		//titleLinks = $(".title-wrapper .title:not(.imdbflix)");
	//}


  var yearLinks = $(".year");
  

  for (i in titleLinks) {
    var titleLink = titleLinks[i];
	var yearLink = yearLinks[i];
	var year = yearLink.innerHTML;
    var title = titleLink.innerHTML;
	
    if (title) {
		
        // adds class so it won't be parsed again
        $(titleLink).addClass("imdbflix");

        // create a container element to hold our custom stuff
		var container = $('<div>');
		//container.attr('style', 'margin-top: -7px;');

		// create a spinner image element
		var spinnerImage = $(createSpinnerImage());
		  
		// put the spinner image inside our container
		container.append(spinnerImage);
		  
		// insert the container after this movie title link
		$(titleLink).parent().after(container);
		
		// fetch the rating at this url
		fetchRating(spinnerImage, title, year);
    }
  }
}


function createSpinnerImage() {
  return '<img width="16" height="16" title="loading" alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />';
}


function createRatingElement(rawRating, movieTitle, foundTitle, year, imdbid, response) {
	var icon = '<img width="16" height="15" title="IMDb" alt="IMDb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAIAAABiEdh4AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABQklEQVR42pWSu0oDURRF1zyiCWicSQoxKEqmsEkjaXx0Yuk/qB9gYSHaih9gE/wBbdJbCRGbNEJsDESIEi1UEMEQApnXzVjcZJxEJLqLw73n7LPPvg/l8nyO/0AHVtfG5EYIAOEB+D6A7/V4Tgeg3nD1n9Tf2BJKu2GNFO6JyuThrgkUCxnASKrvd5YsF46n5SKfi9dKWeDh2qqVsmr0QM1W977uRTPFQqZStU/PPgFPBIAuPUgYSXVn781Iqs1Wty+fCKtHJx/1J3dgQtrUHp+9tKkNXaV0n5rSKlV7oGF5KRFG4RPakNhYmQBUEfGcMrQwStzc2kPTBiZsrk9a87FoZmv/NZ+LS+3tgxdAaZSt0KU0IByl/5oB4Lvf/U4HbXYmtrgwPsQWIggComyng/Ap19r6SOHoY/c+38VV+++/9Qswi5SSSNxmuwAAAABJRU5ErkJggg==" />';
	$.trim(movieTitle);

	if(response == 'True'){
		href = "http://www.imdb.com/title/" + imdbid + "/";
		html = icon + '&nbsp;<a href="'+ href +'" title="View the page for this movie on IMDb" target="_blank">' + rawRating + ' <span style="font-size: small;">(' + foundTitle + ')</span></a>';
	}
	else{
		href = "http://www.imdb.com/find?q=" + encodeURIComponent(movieTitle) + "&s=all";
		html =  icon + '&nbsp;<a href="'+ href +'" title="View the page for this movie on IMDb" target="_blank"><span style="font-size: small;">(not found)</span></a>';
	}
	return html;
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
  title = encodeURIComponent($.trim(title));
  rtUrl += title + "&y=";
  rtUrl += year.substring(0,4) + "";
  return rtUrl;
}


function fetchRating(elementToReplaceWithRating, title, year, callback) {
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
		var ratingElement = createRatingElement(imdbJSON.imdbRating, title, imdbJSON.Title, year, imdbJSON.imdbID, imdbJSON.Response);
		elementToReplaceWithRating.replaceWith(ratingElement);
    },
    onerror: function(responseDetails) {
      console.log("failure");
    }
  });
}
