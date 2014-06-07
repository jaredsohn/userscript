// ==UserScript==
// @name           Bj-linkfy (ratings)
// @author         tiilopes
// @description    Adiciona rating em um link imdb.com
// @include        http://www.bj2.me/detalhes.php?id=*
// @exclude        http://www.imdb.com/*
// @exclude        http://*imdb*/title/*
// @exclude        http://filmow.com/*
// @version         20120831
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

GM_addStyle("#imdb_rating_blue {color: #658db4!important; font-weight:bold;background: url('http://imdb.com/images/SF04fab6b41d84e70563ca609c8da9ce61/rating/giga-star.png') no-repeat scroll 0 0 transparent; display: inline-block;/*float: left;*/font-family: tahoma!important;font-size: 15px!important; font-weight: bold!important; height: 66px; line-height: 66px;padding-right: 5px; text-align: center;vertical-align: middle; width: 66px; text-shadow: 1px 1px 1px #fff!important;}");

GM_addStyle("#imdb_rating_grey {color: #a3a3a3!important; font-weight:bold;background: url('http://imdb.com/images/SF04fab6b41d84e70563ca609c8da9ce61/rating/giga-star.png') no-repeat scroll 0 0 transparent; display: inline-block;/*float: left;*/font-family: tahoma !important;font-size: 15px!important; font-weight: bold!important; height: 66px; line-height: 66px;padding-right: 5px; text-align: center;vertical-align: middle; width: 66px; text-shadow: 1px 1px 1px #fff!important;}");

GM_addStyle("#imdb_rating_red  {color: #FF0000!important; font-weight:bold;background: url('http://imdb.com/images/SF04fab6b41d84e70563ca609c8da9ce61/rating/giga-star.png') no-repeat scroll 0 0 transparent; color: black;display: inline-block;/*float: left;*/font-family: verdana!important;font-size: 15px!important; font-weight: bold!important; height: 66px; line-height: 66px;padding-right: 5px; text-align: center;vertical-align: middle; width: 66px; text-shadow: 1px 1px 1px #fff!important;}");

GM_addStyle("#imdb_rating_unava  {font-weight:bold; text-shadow: 1px 1px 1px #fff!important;}");
		
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
//alert('linkfyimdb 1 ok');

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
	//	alert('linkfyimdb regex ok');
		{
			var span = document.createElement('span');
			var lastLastIndex = 0;
			imdbMovieRegex.lastIndex = 0;
			var myArray = null; 
			//alert('linkfyimdb span ok');
			
			while (myArray = imdbMovieRegex.exec(muligtLink))
			{
				var link = myArray[0];
				span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));
				var a = document.createElement('a');
				a.appendChild(document.createTextNode(link));
				
				a.setAttribute('href', link);
				span.appendChild(a);
				lastLastIndex = imdbMovieRegex.lastIndex; 
			//	alert('linkfyimdb criar a ok');
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
	//alert('linkfyimdb process link ok');
	{
		var spanNode = document.createElement("span");
		
		buildRatingNode(spanNode, ratings[i]);	
		if(i >= 1)
		{
		imdbLink.parentNode.insertBefore(spanNode, imdbLink);
		}
				
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
			},  
			onload: function(result) {  
				
				var spanNode = document.createElement("span"); 
				
				var percRating = result.responseText.match(/"imdbRating":"(.+?)"/);
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
		//var ratingNode = document.createTextNode(" [" + rating + "/10] ");
		var ratingNode = document.createTextNode(" "+ rating + " "); 
		//alert('linkfyimdb rating ok');
		
		if (rating ==  ' N/A ')
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