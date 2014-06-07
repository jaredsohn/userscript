// ==UserScript==
// @name           imdbrating
// @namespace      none
// @description    imdbrating
// @include        http://www.csfd.cz/film/*
// ==/UserScript==

var ratingRegex = new RegExp("<b>([0-9]\.[0-9]+)(?=/10)");
var votesRegex = new RegExp("[0-9|,]+ votes</a>");
var tomatoRegex = new RegExp('<a title=".*%" href=".*"><span>T-Meter Critics</span></a>');
var flixsterRegex = new RegExp('<span class=\"percentage\">..%');
var tomatoProcentoRegex = new RegExp('[0-9]*%');

function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function getRottenRating(rottenLink)
{
     GM_xmlhttpRequest({
      method: 'GET',
      url: rottenLink,
	  headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
      onload: function (responseDetails)
      {
        var ratingMatch = responseDetails.responseText.match(tomatoRegex);
        
        //var rating = ratingMatch.match(tomatoProcentoRegex);
        
        var rating = parseInt(ratingMatch[0].replace('<a title="', ''));
        
        var ratingRow = document.evaluate("//td[@width='125']/descendant::td[contains(@style, 'padding')][1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	      ratingCell = ratingRow.snapshotItem(0);
	      tomatoRatingBox = " <div style=\"font-size: 40%; background-color: white; width: 100%; margin-bottom: 2px; color: red;\">";
	      if (parseInt(rating) >= 60)
          tomatoRatingBox += "<img src=\"http://images.rottentomatoes.com/images/tomato/fresh.gif\" >";
        else
          tomatoRatingBox += "<img src=\"http://images.rottentomatoes.com/images/tomatoes/rotten.gif\" style=\"position: relative; top: 2px;\" >";
        tomatoRatingBox += "<a href=\""+rottenLink+"\" target=\"_blank\" style=\"position: relative; top: -7px; left: 2px; color: #BA0305;\">T-Meter: " + rating + "%</a></div>";  
	      ratingCell.innerHTML = ratingCell.innerHTML + tomatoRatingBox;
	      
	    }
   });
}

function getImdbRating(imdbLink)
{
     GM_xmlhttpRequest({
      method: 'GET',
      url: imdbLink,
	  headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
      onload: function (responseDetails)
      {
        
        var ratingMatch = responseDetails.responseText.match(ratingRegex);
        var rating = parseFloat(ratingMatch[1]);
        
        var votes = responseDetails.responseText.match(votesRegex);
        var votesString = votes[0].replace(' votes</a>' , '');
        
        var ratingRow = document.evaluate("//td[@width='125']/descendant::td[contains(@style, 'padding')][1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	      ratingCell = ratingRow.snapshotItem(0);
	      ratingCell.innerHTML = ratingCell.innerHTML + "<div style=\"font-size: 40%; background-color: white; width: 100%; height: 55px; margin-bottom: 2px; color: #BA0305;\"><img src=\"http://tbn0.google.com/images?q=tbn:8i0ETXRvgWECbM:http://upload.wikimedia.org/wikipedia/en/thumb/3/35/IMDb_logo.svg/180px-IMDb_logo.svg.png\" style=\"width: 50px; margin-top: 5px; position: relative; left: -5px;\" > <span style=\"position: relative; top: -7px;\">" + rating + "/10</span><br> ("+votesString+")</div>";
	    }
   });
}

function getFlixterRating(flixterLink)
{
  
     GM_xmlhttpRequest({
      method: 'GET',
      url: flixterLink,
	  headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
      onload: function (responseDetails)
      {
        
        var ratingMatch = responseDetails.responseText.match(flixsterRegex);
        var rating = ratingMatch[0].replace('<span class=\"percentage\">', '').replace('%', '');
        
        var ratingRow = document.evaluate("//td[@width='125']/descendant::td[contains(@style, 'padding')][1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	      ratingCell = ratingRow.snapshotItem(0);
	      ratingCell.innerHTML = ratingCell.innerHTML + "<div style=\"font-size: 30%; background-color: white; width: 100%; height: 35px; margin-bottom: 2px; color: #BA0305;\"><img src=\"http://static6.flixster.com/static/images/icons/popcorn_27x31.png\" style=\"margin-top: 2px; position: relative; left: 0px;\" > <span style=\"position: relative; top: -12px;\"><a href=\""+flixterLink+"\" target=\"_blank\">Flixster:&nbsp;" + rating + "%</a></span></div>";
	     
	    }
   });
}

var imdbLinkRegex = new RegExp("http://(www\.|us\.){0,1}imdb\.com/(Title.){0,1}[a-zA-Z0-9/+_-]+");
allOdkazy = document.getElementsByTagName('a');
nadpis = document.getElementsByTagName('title');
nadpis = ltrim(nadpis[0].innerHTML).replace("CSFD.cz - ", "");
konec = nadpis.search(/\) - /);
nadpis = nadpis.substring(0, konec+1);
var rottenLink = "http://www.google.com/search?btnI=ok&q="+nadpis+" site:www.rottentomatoes.com";
var flixterLink = "http://www.google.com/search?btnI=ok&q="+nadpis+" site:flixster.com/movie";
getRottenRating(rottenLink);
getFlixterRating(flixterLink);
var imdbLink = "";
var imdbOdkaz = "";
for (var i = 0; i < allOdkazy.length; i++) 
{
    thisOdkaz = allOdkazy[i];
    imdbLink = thisOdkaz.href.match(imdbLinkRegex);
    if (imdbLink)
    {
      break;
    }
}

if (imdbLink)
{
  //alert(imdbLink);
  getImdbRating(imdbLink[0]);
}