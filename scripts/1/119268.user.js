// ==UserScript==
// @name                   IMDB Rating
// @description            Linkifies IMDB links and displays movie ratings.
// @namespace              http://www.warforum.cz/scripts/
// @include 			   http://*
// @exclude			   	   http://www.imdb.com*
// @version                0.9.0
// @license                GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @author		           dkitty <a href="http://userscripts.org/users/302353">http://userscripts.org/users/302353</a>
// @usoscript      		119268
// ==/UserScript==


Array.prototype.indexOf = function(obj) {
	var i = this.length;
	while (i--) 
	{
		if (this[i] === obj)
			return i;
	}
	return -1;
}

GM_addStyle("#imdb_rating_grey {color: #a3a3a3; font-weight:bold;}");
GM_addStyle("#imdb_rating_blue {color: #658db4; font-weight:bold;}");
GM_addStyle("#imdb_rating_red  {color: Salmon; font-weight:bold;}");
GM_addStyle("#imdb_rating_unava  {font-weight:bold;}");
		
linkifyIMDB();

var uniqueLinks = new Array();
var ratings = new Array();

var imdbSnapshot = document.evaluate("//a[contains(@href,'imdb.com/title/tt')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var imdbTotal = imdbSnapshot.snapshotLength;
var imdbCurrent = 0;

if (imdbTotal > 0)
{
	processLink(imdbSnapshot.snapshotItem(imdbCurrent));
}


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


function linkifyIMDB()
{ // code based on http://userscripts.org/scripts/review/2254  Linkify ting
	
	var forbiddenParents = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea'];
	
	var imdbMovieRegex = new RegExp("http:\/\/(?:www\\.|)imdb\\.com\/title\/tt\\d+\/?", "g");
	var altText, tekst, muligtLink;
	
	var path = "//text()[not(parent::" + forbiddenParents.join(" or parent::") + ")]";
	altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var i = altText.snapshotLength;
	while (i--)
	{
		tekst = altText.snapshotItem(i);

		muligtLink = tekst.nodeValue; //all links on page
		
		if (imdbMovieRegex.test(muligtLink))
		{
			//til at holde det nye link, og teksten omkring det
			var span = document.createElement('span');
			var lastLastIndex = 0;
			imdbMovieRegex.lastIndex = 0;
			var myArray = null;
			
			while (myArray = imdbMovieRegex.exec(muligtLink))
			{
				var link = myArray[0];
				span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index))); //inds?t det der kommer for dette hit						
								
				//skab vores link:
				var a = document.createElement('a');
				a.appendChild(document.createTextNode(link)); //linkteksten
				
				a.setAttribute('href', link); //giv det en href			
				span.appendChild(a); //s?tter ind i span								
				lastLastIndex = imdbMovieRegex.lastIndex;
			}

			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex))); //ins?t det der kommer efter sidste hit
			tekst.parentNode.replaceChild(span, tekst);
		}
	}
}
	
function processLink(imdbLink)
{
	var imdbId = imdbLink.href.match(/tt\d+/)[0];
	
	var i = uniqueLinks.indexOf(imdbId)
	
	if (i >= 0) //we already know the rating
	{
		var spanNode = document.createElement("span");
		
		buildRatingNode(spanNode, ratings[i]);	
		
		imdbLink.parentNode.insertBefore(spanNode, imdbLink);
				
		imdbCurrent++;
		
		if (imdbCurrent < imdbTotal)
		{
			processLink(imdbSnapshot.snapshotItem(imdbCurrent));
		}
	}
	else //we don't know the rating -> lets look on imdb (and remember what we've found)
	{	
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.imdbapi.com/?i=' + imdbId + '&r=JSON',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/json'
			},
			onload: function(result) {
				
				var spanNode = document.createElement("span");
				
				var percRating = result.responseText.match(/"Rating":"(.+?)"/);
				uniqueLinks.push(imdbId);
				
				if (percRating == null)
				{
					ratings.push(null);
					spanNode.id = 'imdb_rating_unava';
					spanNode.appendChild(document.createTextNode(" [N/A] "));
				}
				else
				{				
					ratings.push(percRating[1]);									
					buildRatingNode(spanNode, percRating[1]);
				}
				
				imdbLink.parentNode.insertBefore(spanNode, imdbLink);
				
				imdbCurrent++;
				
				if (imdbCurrent < imdbTotal)
				{
					processLink(imdbSnapshot.snapshotItem(imdbCurrent));
				}
			}
		});
	}
	
	function buildRatingNode(parentNode, rating)
	{
		var ratingNode = document.createTextNode(" [" + rating + "] ");
		
		if (rating == 'N/A')
		{
			parentNode.id = 'imdb_rating_unava';
		}
		else		
		{
			if (rating >= 7.0)
				parentNode.id = 'imdb_rating_red';
				
			if ((rating < 7.0) && (rating > 3.0))
				parentNode.id = 'imdb_rating_blue';
				
			if (rating <= 3.0)
				parentNode.id = 'imdb_rating_grey';
		}
		
		parentNode.appendChild(ratingNode);
	}
	
	
}

