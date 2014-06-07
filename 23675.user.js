// ==UserScript==
// @name          Newzbin V3 IMDB Ratings with stars + descriptions
// @description   Shows IMDB rating and stars next to movie titles
// @include       http://v3.newzbin.com/*
// ==/UserScript==


var movies = document.evaluate(
   "//tbody[@class='odd' or @class='odd-new' or @class='even' or @class='even-new']",
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);


var imdbLinkRegex = new RegExp("http://[a-z.]+\.imdb\.com/[a-zA-Z0-9/+_-]+");
var ratingRegex = new RegExp("[0-9]\.[0-9]+(?=/10)");
var descRegex = new RegExp("<h5>Plot[^<>]*</h5>([^]*?)(?=</div>)");
var newzBinTitleRegex = new RegExp("^http:\/\/v3\.newzbin\.com\/browse\/post\/[0-9]+\/$");

for (var i = 0; i < movies.snapshotLength; i++)
{
	movieBody = movies.snapshotItem(i);
	var imdbLink = movieBody.innerHTML.match(imdbLinkRegex);
	
	if (imdbLink) 
		getRating(movieBody, imdbLink.toString());
}

function getRating(movieBody, imdbLink)
{
   GM_xmlhttpRequest({
      method: 'GET',
      url: imdbLink,
	  headers: {'Referer': imdbLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
      onload: function (responseDetails)
      {
         if (responseDetails.status == 200)
         {
            var ratingMatch = responseDetails.responseText.match(ratingRegex);
			var descMatch = responseDetails.responseText.match(descRegex);
			var curLink;
			if (descMatch)
				description = descMatch[1].replace("href=\"/", "href=\"http://www.imdb.com/");
			var star = "";
            if (ratingMatch)
            {
            	rating = parseFloat(ratingMatch);
                // we got our IMDB rating => insert it in the original page using an other regular expression
                var allLinks = movieBody.getElementsByTagName("a");
                for (var i = 0; i < allLinks.length; i++)
                {
                	curLink = allLinks[i];
                    if (newzBinTitleRegex.exec(curLink) != null)
                    {
						for (var x = 0; x < Math.round(rating/2); x++)
							star += "<img src='http://v3.newzbin.com/m/i/i/star.png'/>";
						curLink.innerHTML += " " + star;
						curLink.title += "" + rating + "/10.0";
						
                        break;
					}
            	}
            }
            
            if (descMatch)
            {
                //add description for different layout
                //ugly but does the job
                var description = descMatch[1].replace("href=\"/", "href=\"http://www.imdb.com/");
                if (curLink)
                    curLink.title = curLink.title + " - " + description;
                
                if (movieBody.rows.length > 2)
                {
                    var tr = movieBody.rows[movieBody.rows.length - 1]
                    if (tr.cells.length > 3)
                        // cypher tables
                        movieBody.innerHTML += "<tr><td colspan='2'/><td colspan='2'>" + description + "</td></tr>";
                    else
                        // V3
                        tr.cells[tr.cells.length - 1].innerHTML += "<p/>" + description;
                }
                else if (movieBody.rows.length > 1)
                {
                    // cypher
                    movieBody.innerHTML += "<tr><td colspan='3'/><td colspan='3'>" + description + "</td></tr>";
                }
                else
                {
                    //lite
                    movieBody.innerHTML += "<tr><td colspan='4'/><td>" + description + "</td></tr>";
                }
            }
         }
      }
   });
}

