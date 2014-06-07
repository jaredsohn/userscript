// ==UserScript==
// @name       iMDB Ratings
// @author     rp
// @description  Adds movie ratings to any iMDB link
// @include    http*://filelist.ro/*
// @include    http*://flro.org/*
// @date       2012-feb-02
// @version    1.0
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

function linkifyIMDB()
{ 
	var forbiddenParents = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea'];
	
	var imdbMovieRegex = new RegExp("http:\/\/(?:www\\.|)imdb\\.com\/title\/tt\\d+\/?", "g");
	var altText, tekst, muligtLink;
	
	var path = "//text()[not(parent::" + forbiddenParents.join(" or parent::") + ")]";
	altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var i = altText.snapshotLength;
	while (i--)
	{
		tekst = altText.snapshotItem(i);

		muligtLink = tekst.nodeValue;
		
		if (imdbMovieRegex.test(muligtLink))
		{
			var span = document.createElement('span');
			var lastLastIndex = 0;
			imdbMovieRegex.lastIndex = 0;
			var myArray = null;
			
			while (myArray = imdbMovieRegex.exec(muligtLink))
			{
				var link = myArray[0];
				span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));
				var a = document.createElement('a');
				a.appendChild(document.createTextNode(link));
				
				a.setAttribute('href', link);
				span.appendChild(a);
				lastLastIndex = imdbMovieRegex.lastIndex;
			}

			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
			tekst.parentNode.replaceChild(span, tekst);
		}
	}
}
	
function processLink(imdbLink)
{
	var imdbId = imdbLink.href.match(/tt\d+/)[0];
	
	var i = uniqueLinks.indexOf(imdbId)
	
	if (i >= 0)
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
	else
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
		var ratingNode = document.createTextNode(" [" + rating + "/10] ");
		
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