// ==UserScript==
// @name          Netflix Customization: Adding Rotten Tomatoes, Pirate Bay and Apple Trailers Links
// @description	  Adds custom features to Netflix
// @include       http://www.netflix.com/Movie/*
// @include       http://www.netflix.com/WiMovie/*
// @include       http://movies.netflix.com/*
// @include       https://www.netflix.com/Movie/*
// @include       https://www.netflix.com/WiMovie/*
// @include       https://movies.netflix.com/*
// @version       1.2

// ==/UserScript==
$ = unsafeWindow.jQuery;

var ratingsdiv = document.getElementById('mdp-boxshot');

if (ratingsdiv != null) {
  var htmlcode = ratingsdiv.innerHTML;
  var rottenTomatoesName = document.title.substring(9,document.title.length).toLowerCase().replace(/( |\.|-)/g, "_").replace(/&/g, "and").replace(/('|,|\?|\/|:|\[|\])/g, "").replace(/^(the|a)_/, "");
  var rottenTomatoesNameNoUnderscore = document.title.substring(9,document.title.length).toLowerCase().replace(/&/g, "and").replace(/('|,|\?|\/|:|\[|\])/g, "").replace(/^(the|a)_/, "");
 
  htmlcode = htmlcode + "<a href=\"http://www.rottentomatoes.com/search/?search="+rottenTomatoesNameNoUnderscore+"&sitesearch=rt\" target=\"_blank\"><img alt=\"RotTom\" style=\"height: 16px;\" title=\"Rotten Tomatoes\" src=\"http://images.rottentomatoes.com/images/tomatoes/fresh.gif\"></a> | ";
  ratingsdiv.innerHTML = htmlcode;

var appleName = document.title.substring(9,document.title.length).toLowerCase().replace(/:/g,'').replace(/&/g, "and");
  var prefix = appleName.substr(0,4);
  if ('the_' == prefix) {
    appleName = appleName.substr(4, rottenTomatoesName.length-4);
  }

htmlcode = htmlcode + "<a href=\"http://www.thepiratebay.se/search/"+appleName+"/0/7/200"+"/\" target=\"_blank\"><img alt=\"The Pirate Bay\" style=\"height: 16px;\" title=\"The Pirate Bay\" src=\"http://thepiratebay.se/favicon.ico\"></a> | ";
  ratingsdiv.innerHTML = htmlcode;

htmlcode = htmlcode + "<a href=\"http://www.apple.com/search/?q="+appleName+"\" target=\"_blank\"><img alt=\"Apple\" style=\"height: 16px;\" title=\"Apple Trailers\" src=\"http://cdn1.iconfinder.com/data/icons/vector_social_media_icons/16px/apple.png\"></a><br>";
  ratingsdiv.innerHTML = htmlcode;

}

addRottenText();
getRottenRating(rottenTomatoesName);

function addRottenText() {
	var findPattern = "//div[contains(@class, 'ratingsInfo')]";
	var results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var link = results.snapshotItem(0);
	var addedDivRotten = document.createElement('div');
	var addedDivRotten_text;
	addedDivRotten.innerHTML = '\nchecking';
	addedDivRotten.setAttribute('id','greaseTextRotten');
	addedDivRotten.setAttribute('style','color:#627d11;text-align:center;font-size:28px;font-weight:bold');
	link.parentNode.insertBefore(addedDivRotten, link.nextSibling);
}


function getRottenRating(rottenTomatoesName) {
	var rottenTomatoesURL = "http://www.rottentomatoes.com/m/" + rottenTomatoesName;
	GM_xmlhttpRequest({
			method: 'GET',
			url: rottenTomatoesURL,
			onload: function(responseDetails) {
      			var search_string_start = "all-critics-meter";
			var match = responseDetails.responseText.search(search_string_start);
			var responseHTML = responseDetails.responseText;
      			var rotten_rating = $('#all-critics-meter', responseHTML).html();
var testRating = rotten_rating;
			var number_rotten_rating = parseInt(rotten_rating);

				if (rotten_rating == "N/A")
				{
					rotten_rating = "n/a";
				} else
				{
					rotten_rating = number_rotten_rating + "%";
				}

				if (match != -1) {
					// found a rotten_rating
					if ( number_rotten_rating == -1)
					{
						addedDivRotten.innerHTML = '\nNot enough reviews for a rating\n';
						addedDivRotten.style.color='#627d11';
					}
					else { // best default case
						var rotten_rating_image_url, rotten_rating_text;
						var addedDivRotten = document.getElementById('greaseTextRotten');
						if (number_rotten_rating >= 60) { // it's fresh
							rotten_rating_image_url = 'http://images.rottentomatoes.com/images/tomatoes/fresh.gif';
							rotten_rating_text = "Fresh";
						}
						else { // it's rotten
							rotten_rating_image_url = 'http://images.rottentomatoes.com/images/tomatoes/rotten.gif';
							rotten_rating_text = "Rotten";
						}
						addedDivRotten.innerHTML = '\n' + rotten_rating + ' \n <a href=\"'+rottenTomatoesURL+'\"><img src="' + rotten_rating_image_url + '" alt="' + rotten_rating_text + '" title="' + rotten_rating_text + '" vertical-align="middle"><\/a>\n';
						
					}
				} else {
					// did not find rotten_rating
					var addedDivRotten = document.getElementById('greaseTextRotten');
					htmlcode = "<a href=\"http://www.rottentomatoes.com/search/?search="+rottenTomatoesNameNoUnderscore+"&sitesearch=rt\" target=\"_blank\">Unable to find</a>";
					addedDivRotten.innerHTML = htmlcode;
					addedDivRotten.style.color='red';
				}
			}
	});
} // end function getRottenRating