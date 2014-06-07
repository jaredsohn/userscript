// ==UserScript==
// @name          Newzbin V3 IMDB Ratings
// @description   Shows IMDB rating next to movie titles
// @include       http://v3.newzbin.com/browse/category/p/movies/*
// ==/UserScript==


// customization begins (these options allow to remove some entries from the listing)
var minRating = '0.0';
var removeUnrated = 0;
var removeImdbPageLoadFails = 0;
var removeNoImdbLink = 0;
// customization ends



var movies = document.evaluate(
   "//tbody[@class='odd']|//tbody[@class='odd-new']|//tbody[@class='even']|//tbody[@class='even-new']",
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);


for (var i = 0; i < movies.snapshotLength; i++)
{
   movieBody = movies.snapshotItem(i);
   var reLink = new RegExp("[^\"]*(http:\/\/[^\"]*imdb\.com\/title\/[^\"]*).*");
   var linkMatch = movieBody.innerHTML.match(reLink);
   if (linkMatch != null) {
      var imdbLink = linkMatch[1];
      getRating(movieBody, imdbLink);
   }
   else
   {
      if (removeNoImdbLink)
      {
         // no imdb link => remove it from the list
         movieBody.parentNode.removeChild(movieBody);
      }
   }
}

function getRating(movieBody, imdbLink)
{
   GM_xmlhttpRequest({
      method: 'GET',
      url: imdbLink,
      onload: function (responseDetails)
      {
         if (responseDetails.status == 200)
         {
            var reImbd = new RegExp("<b>([0-9]\.[0-9]/10)</b>");
            var noteMatch = responseDetails.responseText.match(reImbd);
            if (noteMatch != null)
            {
               note = noteMatch[1];
               if (note >= minRating)
               {
                  // we got our IMDB rating => insert it in the original page using an other regular expression
                  var reTitle = new RegExp("^http:\/\/v3\.newzbin\.com\/browse\/post\/[0-9]+\/$");
                  var allLinks = movieBody.getElementsByTagName("a");
                  for (var i = 0; i < allLinks.length; i++)
                  {
                     var curLink = allLinks[i];
                     if (reTitle.exec(curLink) != null)
                     {
                        curLink.textContent += " - " + note;
                        break;
                     }
                  }
                }
                else
                {
                  // the movie is too bad => remove it from the list
                  movieBody.parentNode.removeChild(movieBody);
                }
            }
            else
            {
               if (removeUnrated)
               {
                  // no imdb rating => remove it from the list
                  movieBody.parentNode.removeChild(movieBody);
               }
            }
         }
         else
         {
            if (removeImdbPageLoadFails)
            {
               // imdb link did not work ...
               movieBody.parentNode.removeChild(movieBody);
            }
         }
      }
   });
}
