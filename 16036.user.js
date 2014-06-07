// ==UserScript==
// @name	Cine Cartaz IMDB ratings
// @namespace	http://nuno.cordeiro.pt
// @description	Inserts rating values next to all the movies in cinecartaz.
// @include	http://cinecartaz.publico.pt/*
// @exclude        
// ==/UserScript==

/*
This script is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.

Use at your own risk.
Any suggestions can be sent to greasemonkey@nuno.cordeiro.pt with the subject "CineCartaz IMDB Script".

2010-10-14
Version 1.5
Fixed regular expression for new IMDB layout. Minor tweaks.

08-12-07
Version 1.4
Corrected bugs with the animated nodes; improved performance; Added error resistance when searching Google.
Not much more to improve... Suggestions? Could use Google's "I'm feeling lucky" option to cut a few corners...
http://www.google.com/search?hl=en&q=<MOVIE NAME>+site:www.imdb.com&btnI=I'm Feeling Lucky

11-11-07
Version 1.3 (developer: Pedro A. Silva)
Added searching animation, filtering links

6-11-07
Version 1.2 (developer: Nuno Cordeiro)
Added a hit cache. Now each movie is only queried once independently of the number of times it is listed. Memory footprint grew accordingly.

6-11-07
Version 1.1 (developer: Nuno Cordeiro)
Added a link to IMDB on the movie rating.

5-11-07
Version 1.0 (developer: Nuno Cordeiro)
First release
*/

var cache_cinecartazID = new Array();
var cache_links = new Array();

function go()
{
	var links = getLinks(/^http:\/\/cinecartaz.publico.pt\/filme.asp\?id=(\d*)/i);

	//for (var i=0, j=0; i < links.length && j<3; i++)
	for (var i=0, j=0; i < links.length /*&& j<3*/; i++)
	{  //When testing create a limit j or Google will stop answering queries
		if (cinecartazID)
			var fast_cache = cinecartazID;
			
		var link = links[i];
		var cinecartazID = FindMovieID(link.href)

		if(!fast_cache || cinecartazID!=fast_cache) // This is done so that no ratings appear bellow the movie pictures.
		{
			continue;
		}
		fast_cache = cinecartazID;
		insertNode(link);
		cache_cinecartazID[j] = cinecartazID;
		cache_links[j] = link;

		var cache_hit=0;
		for(var k=0; k<j; k++)
		{
			if (cache_cinecartazID[k]==cinecartazID)
			{
				cache_hit=1; //Don't call the code injection again. It's being handled.
				break;
			}
		}
		j++;

		if (cache_hit!=1)
			InjectCode(cinecartazID,link,0);
	}
}

function InjectCode(cinecartazID,link,retry)
{
	FindOriginalTitle(cinecartazID, function(movieInfo)
	{
		if(movieInfo.title)
		{
			Find_IMDB_code_on_google(movieInfo.title, retry, function(imdb)
			{
				if (imdb.id)
				{
					//alert('id: ' + imdb.id);
				    getmovieInfo(imdb.id, function(movieInfo)
				    {
						//alert(movieInfo.rating);
						for(var j=0; cache_cinecartazID[j]; j++)
						{
							if(cinecartazID==cache_cinecartazID[j])
							{
								insert_ratings(cache_links[j], imdb.id, movieInfo.rating);
							}
						}
					});
				}
				else if (retry<2) //imdbID is invalid so it retries with new google queries
					InjectCode(cinecartazID,link,retry+1);
				else
				{
					for(var j=0; cache_cinecartazID[j]; j++)
					{
						if(cinecartazID==cache_cinecartazID[j])
						{
							remove_nodes(cache_links[j], imdb.id, movieInfo.rating);
						}
					}
				}
			} );
		}
		else
		{
			for(var j=0; cache_cinecartazID[j]; j++)
			{
				if(cinecartazID==cache_cinecartazID[j])
				{
					remove_nodes(cache_links[j], imdb.id, movieInfo.rating);
				}
			}
		}
    } );
}

function insertNode(link) {
  var imdbNode = document.createElement('span');
  
	imdbNode.style.paddingLeft = "5px";
	imdbNode.style.paddingRight = "5px";
	imdbNode.style.fontWeight = "900";
	
  var img = document.createElement('img'); //loading pic
  img.src="data:image/gif,GIF89a%10%00%10%00%F2%00%00%FF%FF%FF%AA%01%01%EA%C2%C2%BFBB%AA%01%01%CAbb%D4%82%82%DA%92%92!%FF%0BNETSCAPE2.0%03%01%00%00%00!%FE%1ACreated%20with%20ajaxload.info%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%033%08%BA%DC%FE0%CAIk%13c%08%3A%08%19%9C%07N%98f%09E%B11%C2%BA%14%99%C1%B6.%60%C4%C2q%D0-%5B%189%DD%A6%079%18%0C%07Jk%E7H%00%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%034%08%BA%DC%FEN%8C!%20%1B%84%0C%BB%B0%E6%8ADqBQT%601%19%20%60LE%5B%1A%A8%7C%1C%B5u%DF%EDa%18%07%80%20%D7%18%E2%86C%19%B2%25%24*%12%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%036%08%BA2%23%2B%CAA%C8%90%CC%94V%2F%06%85c%1C%0E%F4%19N%F1IBa%98%ABp%1C%F0%0A%CC%B3%BD%1C%C6%A8%2B%02Y%ED%17%FC%01%83%C3%0F2%A9d%1A%9F%BF%04%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%033%08%BAb%25%2B%CA2%86%91%EC%9CV_%85%8B%A6%09%85!%0C%041D%87a%1C%11%AAF%82%B0%D1%1F%03bR%5D%F3%3D%1F08%2C%1A%8F%C8%A4r9L%00%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%032%08%BAr'%2BJ%E7d%14%F0%18%F3L%81%0C%26v%C3%60%5CbT%94%85%84%B9%1EhYB)%CF%CA%40%10%03%1E%E9%3C%1F%C3%26%2C%1A%8F%C8%A4R%92%00%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%033%08%BA%20%C2%909%17%E3t%E7%BC%DA%9E0%19%C7%1C%E0!.B%B6%9D%CAW%AC%A21%0C%06%0B%14sa%BB%B05%F7%95%01%810%B0%09%89%BB%9Fm)J%00%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%032%08%BA%DC%FE%F0%09%11%D9%9CU%5D%9A%01%EE%DAqp%95%60%88%DDa%9C%DD4%96%85AF%C50%14%90%60%9B%B6%01%0D%04%C2%40%10%9B1%80%C2%D6%CE%91%00%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%10%00%10%00%00%032%08%BA%DC%FE0%CAI%ABeB%D4%9C)%D7%1E%08%08%C3%20%8E%C7q%0E%0410%A9%CA%B0%AEP%18%C2a%18%07V%DA%A5%02%20ub%18%82%9E%5B%11%90%00%00%3B%00%00%00%00%00%00%00%00%00";
	
  imdbNode.appendChild(img);
  link.parentNode.insertBefore(imdbNode, link.nextSibling); 
}

function insert_ratings(link, imdbid, rating)
{
	var imdbNode = link.nextSibling;
	imdbNode.removeChild(imdbNode.firstChild); //remove loading pic
	imdbNode.innerHTML = "<a href=" + makeMovieUrl(imdbid) + ">[" + rating + "/10]</a>";
}

function remove_nodes(link, imdbid, rating)
{
	var imdbNode = link.nextSibling;
	imdbNode.removeChild(imdbNode.firstChild); //remove loading pic
}

function getLinks(regExp) {
   var doc_links = document.links;
   var links = new Array();
   for (var i=0; i < doc_links.length; i++)
   {
    link=doc_links[i];
    url=link.href;
    if(url.match(regExp)){
       links.push(link);
    }
   }
   return links;
}

function FindMovieID(url){
  var m = url.match(/^http:\/\/cinecartaz.publico.pt\/filme.asp\?id=(\d*)/i);

  if (m) return m[1];
  return null;
}

function FindOriginalTitle(cinecartazID, callback){
  var url = make_CineCartaz_URL(cinecartazID);
  GM_xmlhttpRequest(
  {
    method: "GET",
    url: url,
    onload: function(details) {
      callback( extractOriginalMovieTitle(details.responseText) );
    }
  });
}

function make_CineCartaz_URL(cinecartazID) {
  return "http://cinecartaz.publico.pt/filme.asp?id=" + cinecartazID;
}

function extractOriginalMovieTitle(content) {
	// T�tulo original:
	// </span>
	// Le Scaphandre et le Papillon
	// <br> 
  var match = content.match(/original:<\/span> (.+?)</);
  if (match[1])
		return { title: match[1] };
  return { title:0 };
}

function Find_IMDB_code_on_google(original_title, retry, callback){
	url = make_google_movie_URL(original_title, retry);
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: url,
		onload: function(details)
		{
			callback( findImdbID(details.responseText) );
		}
	});
}

function make_google_movie_URL(original_title, retry)
{
	if(retry==0)
		return "http://www.google.de/search?aq=t&oq=&num=1&hl=en&safe=off&q=" + original_title + "+site%3Awww.imdb.com";
	else if(retry==1) 	// Found nothing before? Try again!!
		return "http://www.google.es/search?aq=t&oq=&num=10&hl=en&safe=off&q=" + original_title + "+imdb";
	else				// Still nothing? One more try.... 100 chances this time...
		return "http://www.google.it/search?aq=t&oq=&num=100&hl=en&safe=off&q=" + original_title;
}

function findImdbID(content) {
	var match = content.match(/imdb.com\/title\/(tt\d*)/i);
	if (match)
		return { id: match[1] };
	return { id: 0 }; //in case it doesn't find the IMDB link in google
}

function getmovieInfo(imdbID, callback) {
	var url = makeMovieUrl(imdbID);
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(details) {
			callback(extractMovieInfo(details.responseText));
		}
	});
}

function makeMovieUrl(imdbID) {
  return "http://www.imdb.com/title/" + imdbID;
}

function extractMovieInfo(content) {
  // <b>2.1/10</b> 
	var match = content.match(/(\d.\d)<span>\/10/);
	//alert('match: ' + match);
	if (match[1])
		return { rating: match[1] };
	return { rating: 0 };
}

go();
