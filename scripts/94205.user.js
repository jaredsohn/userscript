// ==UserScript==
// @name           Netflix.ca - adds Rottentomatoes to Netflix.ca Movie description pages
// @namespace      http://www.bulman.ca
// @include        http://*.netflix.com/*Movie/*
// ==/UserScript==

// ==User-Defined Variables==


//showAverageRating = false;
showAverageRating = true;

//showReviewCount = false;
showReviewCount = true;

//showFreshReviewCount = false;
showFreshReviewCount = true;

//showRottenReviewCount = false;
showRottenReviewCount = true;

//showConsensus = false;
showConsensus = true;

useRottenTomatoesColors = false;
//useRottenTomatoesColors = true;

// ==/User-Defined Variables==

// grab the movie title that this tomato goes along with
var movieTitle = getMovieTitle;

findPattern = "//p[@class='synopsis']";
results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

labelHtml = '<h5 style="font-size:90%;">Rotten Tomatoes:</h5>';
insertedDivClass = 'info';
resultsPrefix = '<div class="info-content">';
resultsSuffix = '</div>';

insertRTBase();
rottenTomatoesURL = "http://www.rottentomatoes.com/m/" + movieTitle();
getRTinfo(rottenTomatoesURL,0);

function insertRTBase() {

	findPattern = "//p[@class='synopsis']";	
	results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	console.log('results.snapshotItem(0) : '); //debug!
	console.log(results.snapshotItem(0)); //debug!
	addedDivRotten = document.createElement('div');
	addedDivRotten.setAttribute('id','greaseTextRotten');
	addedDivRotten.setAttribute('class',insertedDivClass);
	
	var RTStyle = "";
	if (useRottenTomatoesColors == true) {
		RTStyle = " style=\"-moz-border-radius: 4px !important; border: 2px solid #5E7D0E !important\"";
	}
	
	addedDivRotten.innerHTML = '<div id="greaseTextRottenResults"'+RTStyle+'>'+labelHtml+resultsPrefix+' checking <img src="'+'data:image/gif;base64,R0lGODlhEAAQAPIGAMLCwkJCQpKSkoKCgmJiYgAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUAE/ACH5BAkKAAYALAAAAAAQABAAAANLaLogAitK52QEUIzxBoEMJnZBMFxiRJSEhLkeCJSgNQdzUQSWEuglYM/w291qLpoCQPi4kIaVCfVaDEqDxkOEZGYpkGpPwxmiHpYEACH5BAkKAAYALAAAAAAQABAAAANGaLogAitK5yQDWIzxBoEXlgFDEAyRCCqESaRi6oEA8VkKYNYmigeFwsmFMwCFtcFKogvQHMsiRVCMaDgGTHWkqoaiRa0lAQAh+QQJCgAGACwAAAAAEAAOAAADO2i6IAIrSuckA1iM8QaBF5YBQxAMkQgqhEmkYuqBzWMpgFlXd1AUAQ3nZvABR8RcYIUhSlTO0CrajCYAACH5BAkKAAYALAAAAAAQAAoAAAMvaLogAitK5yQDWIzxBoEXlgFDEAyRCCqESaRi6q2YxZjqKgVFEag2A89nqAUBuAQAIfkECQoABgAsAgAAAA4ACgAAAytoaiACKy7npAJQjPEGgQwmdkEwXGJElMSCSYAHWhFQznRQFAG96Dzf5ZYAACH5BAkKAAYALAIAAAAOAA4AAAM0aGrQsHC5F9mbQAiK59DKBAmfIFGShlbSQKzVEAQDuxAzYYcuLM0+SKBQCOwMw+IRAFQkAAAh+QQJCgAGACwCAAAADgAQAAADPWhqIAIrLuekAlCM8TBkHtZ5F7mE55diltU87ckJsaJxNQi3ADGoLUIgQHANAYPhwBIoFAK9H9MZyAGOlgQAIfkEBQoABgAsAgAAAA4AEAAAA0VoaiACKy7npAJQjPEGgQwmdkEwXGJElMSCSYAHWpE40zbtpnoolrfGQxEoFAIRCqh4BBAGjY3gAlwFWo6bYsDqMZ5aQwIAOw=='+'" alt ="checking">'+resultsSuffix+'</div>';

	addedDivRotten.style.marginTop='10px';

	results.snapshotItem(0).parentNode.insertBefore(addedDivRotten, results.snapshotItem(0));

	if(useRottenTomatoesColors == true) {
		var addedDivRottenResults = document.getElementById('greaseTextRottenResults');
		addedDivRottenResults.style.color='#5E7D0E';
		addedDivRottenResults.style.backgroundColor='#d6e5a5';
		addedDivRottenResults.style.padding='3px';
	} // end if useRottenTomatoesColors
	

} // end function insertRTBase

function addRatings() {
  // get all the movie title links on the page
  var titleLinks = $("h2.title .mdpLink:not(.rottenFlixWasHere)");
  
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


function getMovieTitle() {
	const $xpath = '//h2/text()';
	var $nodes = document.evaluate($xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	return escape($nodes.singleNodeValue.data.replace(/(: Collector's Series|: Collector's Edition|: Director's Cut|: Special Edition|: Vol. 1|: Vol. 2|: Vol. 3|: Vol. 4|: Vol. 5|: Vol. 6|: Vol. 7|: Vol. 8)/g, '').replace(/&/g, "and").replace(/('|,|\.|!|\?|\/|:|\[|\]|\(|\))/g, "").replace(/^(the|a|an)_/, "").replace(/(é|è)/g, "e").replace(/src/g, "foo"));
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


function getRTinfo(rottenTomatoesURL, alreadyTryingGoogle) {

	GM_xmlhttpRequest({
		url: rottenTomatoesURL,
		method: 'GET',
		onload: function(response) {
			var addedDivRotten = document.getElementById('greaseTextRottenResults');
			fresh_icon_uri = 'data:image/gif;base64,R0lGODlhDAAMAKIHAPHk4O0eJeyccFeXQexXOaEhIqBuTf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozOTdBQjkwMTBERUYxMUUwODg0QUJDQUI0NEJFMEJFMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozOTdBQjkwMjBERUYxMUUwODg0QUJDQUI0NEJFMEJFMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM5N0FCOEZGMERFRjExRTA4ODRBQkNBQjQ0QkUwQkUxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM5N0FCOTAwMERFRjExRTA4ODRBQkNBQjQ0QkUwQkUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAABwAsAAAAAAwADAAAAzt4ejCysI0yBoim1mwuEEWgGUHRCQGRBSIbCEQswKVLpDPt2sQc74VbSugyAXbFQsEDVBYeig/B2VEkAAA7';
			rotten_icon_uri = 'data:image/gif;base64,R0lGODlhEAAQANUAAECdJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///yH5BAEAAD8ALAAAAAAQABAAAAY2wJ/wBygOj0hiEZBMLpnN43O4pBqrSqwW+uQas1PptRvtQstm59e83jLJ2Kz1K6bT6+eoPBkEADs=';
			comment_bubble_uri = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdC'+
				'AK7OHOkAAAAHdElNRQfZBwsVChqBpMw9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+
				'EwEAmpwYAAABa0lEQVQoz2NgQAKxreuYY1vXBsS1rlsJxA+B+D8Qfwbik0DcDMRSDNgAUEI6qmnN'+
				'0f6Vx/6fuPbk/5sPX/+DwPefv//fffru/4bD1//nTtz2C6iuCF2jHBC/vXT3xX984OuPX/+X7Lr4'+
				'P6R2ZSdQPSPQqWtZg2pWrD9z4+l/YkHPiqO/w+pXaTEEVC2TnbX57Of/JIB7z979z5+0bSJDeMMq'+
				'g4MX7pOi9/83oPNLpu28yAAMJLNDFx+QpPkrRPM5oLOXy0xbf+oDKZrvPH37P2/itn5w3IbUrliw'+
				'9fgtojW3Lzn0LrRupQIsqtiA+N7pG0/+//v3D6em95+//5+75SwoqsrR41oI6P8drYsO/dtz5u7/'+
				'O0/e/v/5+w9Y020ge8bG0/9TuzZ+BKpLZsAFgJL2QDwN6J0TQPrbRWDCAQbOMSA/FsjnZiAWABUb'+
				'18ze+7946o6JDOQAoAHxQPwdiJnJNGCtJVCzF7o4AIvXFqgzJp23AAAAAElFTkSuQmCC';

			doc = document.createElement('div');
			doc.innerHTML = response.responseText;
			var fresh_reviews_html;
			var rotten_reviews_html;

			// get canonical RT url
			var findPattern = "//link[@rel='canonical']";
			var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			
			if (results.snapshotItem(0) != null)
			{
				URL_split = results.snapshotItem(0).href.split(".com")
				rottenTomatoesURL = "http://www.rottentomatoes.com"+URL_split[1];
			} // end if 	

			findPattern = "//p[@class='critic_stats']";
			results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

			average_html = "";
			reviews_html = "";
			reviews_count_html = "";
			fresh_reviews_html = "";
			rotten_reviews_html = "";
			consensus_html = "";

			if (results.snapshotItem(0) != null) {
				
				var has_br = results.snapshotItem(0).innerHTML.match(/<br>/);
			
				if (has_br != null) {
					line_split = results.snapshotItem(0).innerHTML.split("<br>");
					
					// get average
					if (showAverageRating == true) {
						average_count = line_split[0].split("<span>");
						average_count = parseFloat(average_count[1]);
						average_html = " <span id='gm_rotten_average_html' style='font-size:smaller;'>(Average "+average_count+")</span>";
					} 

					// get total reviews
					if (showReviewCount == true && line_split[1] != null) {
						review_count = line_split[1].split("<span property=\"v:count\">");
						review_count = parseInt(review_count[1]);
						reviews_count_html = " <span title='"+review_count+" Total Reviews'><img style='width:12px;' src='"+comment_bubble_uri+"' alt='Reviews'> <a href='"+rottenTomatoesURL+"?critic=columns&sortby=name&name_order=asc&view=#contentReviews'>"+review_count+"</a></span>";
					}

					// get fresh reviews
					if (showFreshReviewCount == true && line_split[2] != null) {
						fresh_count = line_split[2].split(": ");
						fresh_count = parseInt(fresh_count[1]);
						fresh_reviews_html = " <span title='"+fresh_count+" Fresh Reviews'><img style='width:12px;' src='"+fresh_icon_uri+"' alt='Fresh'> <a href='"+rottenTomatoesURL+"?critic=columns&sortby=fresh&name_order=asc&view=#contentReviews'>"+fresh_count+"</a></span>";
					} 

					// get rotten reviews
					if (showRottenReviewCount == true && line_split[2] != null) {
						rotten_count = line_split[2].split(": ");
						rotten_count = parseInt(rotten_count[2]);
						rotten_reviews_html = " <span title='"+rotten_count+" Rotten Reviews'><img style='width:12px;' src='"+rotten_icon_uri+"' alt='Rotten'> <a href='"+rottenTomatoesURL+"?critic=columns&sortby=rotten&name_order=asc&view=#contentReviews'>"+rotten_count+"</a></span>";
					}

					
					if(showReviewCount == true || showFreshReviewCount == true || showRottenReviewCount == true) {
						reviews_html = "<span class=\"ghost\"> | </span>" + reviews_count_html+fresh_reviews_html+rotten_reviews_html;
					}
				
				}
			}

			// get consensus
			if(showConsensus == true) {
				var findPattern = "//p[@class='critic_consensus']";
				var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
				if (results.snapshotItem(0) != null) {
					consensus_html = "<span class=\"ghost\"> | </span>Consensus: "+results.snapshotItem(0).innerHTML;
				}
			}
			
			// get tomato-meter rating
			var findPattern = "//span[@id='all-critics-meter']";
			var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			if (results.snapshotItem(0) != null)
			{
				var score_html = results.snapshotItem(0).innerHTML;
				if (score_html == "No Reviews Yet...") {
					score_html = "n/a";
					rotten_rating_image_uri = '';
					rotten_rating_text = '';
				}
				else {
					if (parseInt(score_html) >= 60) { // it's fresh
						rotten_rating_image_uri = fresh_icon_uri;
						rotten_rating_text = "Fresh";
					}
					else { // it's rotten
						rotten_rating_image_uri = rotten_icon_uri;
						rotten_rating_text = "Rotten";
					}
					score_html = score_html + "%";
				}
				
				// found a rotten_rating
				if ( score_html == "n/a")
				{
					addedDivRotten.innerHTML = '<a title="Rotten Tomatoes link" href="' + rottenTomatoesURL + '">'+labelHtml+'</a> Not enough reviews for a rating';
				}
				else { // best default case
					var rotten_rating_image_url, rotten_rating_text;
					addedDivRotten.innerHTML = '<a title="Rotten Tomatoes link" href="' + rottenTomatoesURL + '">'+labelHtml+'</a> ' + resultsPrefix + score_html + ' \n<img src="' + rotten_rating_image_uri + '" alt="' + rotten_rating_text + '" title="' + rotten_rating_text + '">\n'+average_html+reviews_html+consensus_html + resultsSuffix;

				} // end else 
			} // end if tomatometer_score not null
			else {
				// did not find rotten_rating
				
				if(alreadyTryingGoogle == 0) {
					GoogleAJAXURL = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=site%3Arottentomatoes.com%3A%20" + getMovieTitle()+"%20";
					
					GM_xmlhttpRequest({
						method: 'GET',
						url: GoogleAJAXURL,
						onload: function(responseDetails) {
							var json = eval("(" +responseDetails.responseText+")");
							getRTinfo(json.responseData.results[0].url, 1);
						}
					});
					
				
				} // end if alreadyTryingGoogle == 0
				else {
					googleRottenTomatoesFallbackURL = "http://www.google.com/search?q=" + "intitle%3A%22" + getMovieTitle() + "%22+" + "site%3Arottentomatoes.com";
					addedDivRotten.innerHTML = '<a title="Google search Rotten Tomatoes link" href="' + googleRottenTomatoesFallbackURL + '">'+labelHtml+'</a>\nUnable to find';
					addedDivRotten.style.color='red';
				} // end else (alreadyTryingGoogle != 0)
			}
		}
	});

} // end function getRTinfo