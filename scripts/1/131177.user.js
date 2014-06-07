var fileMETA = new Array();
// ==UserScript==
// @name                   CSFD Rating&Genres
fileMETA["name"] = 'CSFD Rating&Genres';
// @namespace              http://www.warforum.cz/scripts/
// @include 			   http://*
// @version                1.1.1
fileMETA["version"] = '1.1.1'
// ==/UserScript==

function linkifyCSFD()
{ // code based on http://userscripts.org/scripts/review/2254  Linkify ting
	
	var forbiddenParents = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea'];
	
	var csfdMovieRegex = new RegExp("http:\/\/www\\.csfd\\.cz\/film\/\\d+[\\w-\\/]*", "g");
	var altText, tekst, muligtLink;
	
	var path = "//text()[not(parent::" + forbiddenParents.join(" or parent::") + ")]";
	altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var i = altText.snapshotLength;
	while (i--)
	{
		tekst = altText.snapshotItem(i);

		muligtLink = tekst.nodeValue; //all links on page
		
		if (csfdMovieRegex.test(muligtLink))
		{
			var span = document.createElement('span');
			var lastLastIndex = 0;
			csfdMovieRegex.lastIndex = 0;
			var myArray = null;
			
			while (myArray = csfdMovieRegex.exec(muligtLink))
			{
				var link = myArray[0];
				span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));
								
				var a = document.createElement('a');
				a.appendChild(document.createTextNode(link));
				
				a.setAttribute('href', link);		
				span.appendChild(a);								
				lastLastIndex = csfdMovieRegex.lastIndex;
			}

			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
			tekst.parentNode.replaceChild(span, tekst);
		}
	}
}

GM_addStyle("#csfd_rating_black {color: #000000; font-weight:bold;}");
GM_addStyle("#csfd_rating_grey {color: #a3a3a3; font-weight:bold;}");
GM_addStyle("#csfd_rating_blue {color: #658db4; font-weight:bold;}");
GM_addStyle("#csfd_rating_red  {color: Salmon; font-weight:bold;}");
GM_addStyle("#csfd_rating_unava  {font-weight:bold;}");
		
linkifyCSFD();

var uniqueLinks = new Array();
var ratings = new Array();
var genres = new Array();

const CSFD_XPATH = "//a[contains(@href,'csfd.cz/film')]"
var csfdSnapshot = document.evaluate(CSFD_XPATH, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var csfdTotal = csfdSnapshot.snapshotLength;
var csfdCurrent = 0;

processLink(csfdSnapshot.snapshotItem(csfdCurrent));
	
function processLink(csfdLink)
{
	var i = uniqueLinks.indexOf(csfdLink.href)
	var j = uniqueLinks.indexOf(csfdLink.href)
	
	if ((i >= 0) && (j.length < 4)) //we already know the rating and genre
	{
		var spanNode = document.createElement("span");
		
		if (ratings[i] == null)
		{
			spanNode.id = 'csfd_rating_unava';
			spanNode.appendChild(document.createTextNode(" [\xA0N/A\xA0] "));
		}
		else
		{
			buildRatingNode(spanNode, ratings[i]);			
		}
		
		if (genres[j] == null)
		{
			spanNode.id = 'csfd_genre_unava';
			spanNode.appendChild(document.createTextNode(" [\xA0N/A\xA0] "));
		}
		else
		{
			buildGenreNode(spanNode, genres[j]);			
		}
		
		csfdLink.parentNode.insertBefore(spanNode, csfdLink);
				
		csfdCurrent++;
		
		if (csfdCurrent < csfdTotal)
		{
			processLink(csfdSnapshot.snapshotItem(csfdCurrent));
		}
	}
	else //we don't know the rating -> lets look on csfd (and remember what we've found)
	{	
		GM_xmlhttpRequest({
			method: 'GET',
			url: csfdLink.href,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/xml'
			},
			onload: function(result) {
				
				var spanNode = document.createElement("span");
				
				var percRating = result.responseText.match(/average">(\d+)\%<\/h2>/);
				var percGenre = result.responseText.match(/genre">(.*)<\/p>/);
				
				uniqueLinks.push(csfdLink.href);
							
				if (percRating == null)
				{
					ratings.push(null);
					spanNode.id = 'csfd_rating_unava';
					spanNode.appendChild(document.createTextNode(" [\xA0N/A\xA0] "));
				}
				else
				{				
					ratings.push(percRating[1]);									
					buildRatingNode(spanNode, percRating[1]);
				}
				if (percGenre == null)
				{
					genres.push(null);
					spanNode.id = 'csfd_genre_unava';
					spanNode.appendChild(document.createTextNode(" [\xA0N/A\xA0] "));
				}
				else
				{				
					genres.push(percGenre[1]);									
					buildGenreNode(spanNode, percGenre[1]);
				}
				
				csfdLink.parentNode.insertBefore(spanNode, csfdLink);
				
				csfdCurrent++;
				
				if (csfdCurrent < csfdTotal)
				{
					// setTimeout(function(){processLink(csfdSnapshot.snapshotItem(csfdCurrent));}, 500);
					processLink(csfdSnapshot.snapshotItem(csfdCurrent));
				}
			}
		});
	}
	
	function buildRatingNode(parentNode, rating)
	{
		var ratingNode = document.createTextNode(" [\xA0" + rating + "%\xA0] ");
					
		if (rating >= 70)
			parentNode.id = 'csfd_rating_red';
			
		if ((rating < 70) && (rating > 50))
			parentNode.id = 'csfd_rating_blue';
			
		if ((rating <= 50) && (rating > 30))
			parentNode.id = 'csfd_rating_grey';
			
		if (rating <= 30)
			parentNode.id = 'csfd_rating_black';
		
		parentNode.appendChild(ratingNode);
	}
	function buildGenreNode(parentNode, genre)
	{
		var genreNode = document.createTextNode(" [\xA0" + genre + "\xA0] ");
		
		parentNode.appendChild(genreNode);
	}
	
}

