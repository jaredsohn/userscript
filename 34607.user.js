// This is a script for the IMDB site. Please see the description below.
//
// Copyright (c) 2008, Ricardo Mendonca Ferreira (ric@mpcnet.com.br)
// Released under the GPL license - http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          IMDB - Sort by Rating
// @description   On any filmography and character page, display ratings for movies and enable sorting by rating.
// @namespace     http://www.flickr.com/photos/ricardo_ferreira/2892465821/
// @include       http://*imdb.com/name/*
// @include       http://*imdb.com/character/*
// @exclude       http://*imdb.com/name/*/board/*
// @exclude       http://*imdb.com/*/filmorate*
// @version       2008.12.30
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Install Greasemonkey, then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select this script and click Uninstall.
//
// --------------------------------------------------------------------
//
// History:
// --------
// 2008.12.30  Faster version - now read the ratings from the
//             "Filmography by rating" page (even though it is incomplete)
// 2008.10.01  Fixed a couple of bugs; now also works with character pages
// 2008.09.27  Updated to work with Firefox 2.x (previously worked only with 3.x)
// 2008.09.22  First version
//


(function() {

   var downloading = 0;
   var movies_ratings = new Array; // This is a movie code -> rating hash
   
   
   function sort_ratings(movies) {
      // Strange... but we need to remove childs without innerHTML
      for (var i = 0; i < movies.childNodes.length; i++) {
         if (!movies.childNodes[i].innerHTML)
              movies.removeChild(movies.childNodes[i]);
      }

      var sorted = new Array();
      for (var i = 0; i < movies.childNodes.length; i++)
         { sorted[i] = movies.childNodes[i].innerHTML; }
      sorted.sort();
      sorted.reverse();
      for (var i = 0; i < movies.childNodes.length; i++)
         { movies.childNodes[i].innerHTML = sorted[i]; }
   }
   

   function receive_movie_rating(index, movie, movies, rating, sort) {
      var b = document.createElement("b");
      b.innerHTML=rating + '&nbsp;&nbsp;';
      b.setAttribute("style", "color: blue;");
      b.className="got_rating"+index;
      movie.insertBefore(b, movie.childNodes[0]);
      // Do we sort or not?
      downloading--;
      if (downloading == 0 && sort)
         sort_ratings(movies);
   }


   function request(index, tt, movies, movie, sort) {
      downloading++;
      GM_xmlhttpRequest({
         method: 'get',
         url   : "http://www.imdb.com/title/tt"+tt,
         onload: function (responseDetails) {
            html   = responseDetails.responseText;
            rating = html.match(/<b>([\d\.]+)\/10<\/b>\s*(?:&nbsp;)*<a href="ratings"/);
            if (rating)
                 receive_movie_rating(index, movie, movies, rating[1], sort);
            else receive_movie_rating(index, movie, movies, '?.?',     sort);
         }
      });
   }

/*
   function old_get_ratings(index, link_get, link_sort, movies, sort) {
      // hide link for get and/or sort
      link_get.setAttribute("style","display: none;");
      if (sort) {
         link_sort.setAttribute("style","display: none;");
         // verify if we already got the ratings
         var test = document.evaluate("//b[@class='got_rating"+index+"']", document, null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
         var got_rating = test.snapshotLength > 0;
         if (got_rating) {
            sort_ratings(movies);
            return;
         }
      }

      for (var i = 0; i < movies.childNodes.length; i++) {
         var movie = movies.childNodes[i];
         var tt    = movie.innerHTML.match(/\/tt(\d+)/);
         if (tt && tt[1])
            request(index, tt[1], movies, movie, sort, link_sort);
      }
   }
*/

   function process_ratings(index, link_get, link_sort, movies, sort) {
      for (var i = 0; i < movies.childNodes.length; i++) {
         var movie = movies.childNodes[i];
         if (movie && movie.innerHTML) {
            var tt    = movie.innerHTML.match(/\/tt(\d+)/);
            if (tt && tt[1]) {
               // The rating of this movie might be on the filmography page we
               // already processed - but if it isn't, get the rating from the
               // specific page.
               var rating = movies_ratings[tt[1]];
               if (rating) {
                    downloading++; // a bit of a hack...
                    receive_movie_rating(index, movie, movies, rating, sort);
               } else {
                  request(index, tt[1], movies, movie, sort);
               }
            }
         }
      }
   }


   function get_ratings(index, link_get, link_sort, movies, sort) {
      // hide link for get and/or sort
      link_get.setAttribute("style","display: none;");
      if (sort) {
         link_sort.setAttribute("style","display: none;");
         // verify if we already got the ratings
         var test = document.evaluate("//b[@class='got_rating"+index+"']", document, null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
         var got_rating = test.snapshotLength > 0;
         if (got_rating) {
            sort_ratings(movies);
            return;
         }
      }

      // Download the "Filmography by Rating" page and extract the information
      var url = document.location.href.match(/.+nm\d+/);
      GM_xmlhttpRequest({
         method: 'get',
         url   : url + '/filmorate',
         onload: function (responseDetails) {
            var html = responseDetails.responseText;
            var items = html.match(/\(.+?\).+?\/tt\d+/g);
            if (items) {
               for (var i = 0; i < items.length; i++) {
                  var rating = items[i].match(/\((.+?)\).+?\/tt(\d+)/);
                  if (rating)
                     movies_ratings[rating[2]] = rating[1];
               }
               process_ratings(index, link_get, link_sort, movies, sort);
            } else {
               GM_log('Hmm... there was some problem processing the ratings page. :-(');
            }
         }
      });

   }


   function create_sort_link(index, filmo) {
      // Find correct childnode to process (it's an "Ordered List")
      var ol_node;
      for (var i = 0; i < filmo.childNodes.length; i++) {
         if (filmo.childNodes[i].tagName == "OL") {
            ol_node = filmo.childNodes[i];
            break;
         }
      }
      
      var div = document.createElement("div");
      div.setAttribute("style", "margin-left: 110px;");
      
      var get   = document.createElement("a");
      var space = document.createElement("small");
      var sort  = document.createElement("a");
      
      get.innerHTML   = "<small>[Get Ratings]</small>";
      space.innerHTML = "<small>&nbsp;</small>";
      sort.innerHTML  = "<small>[Sort by Rating]</small>";
      
      get.href = "javascript:;";
      get.addEventListener("click", function () { get_ratings(index, get, sort, ol_node, 0) }, false);
      div.appendChild(get);

      div.appendChild(space);

      sort.href = "javascript:;";
      sort.addEventListener("click", function () { get_ratings(index, get, sort, ol_node, 1) }, false);
      div.appendChild(sort);

      filmo.insertBefore(div, ol_node);
   }

   //-------- "main" --------

   // Scan all filmography <div>s and add our new links
   var div = document.evaluate("//div[@class='filmo']", document, null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   if (div) {
      for (var i = 0; i < div.snapshotLength; i++) {
         create_sort_link(i, div.snapshotItem(i));
      }
   }

})()

// Good links for testing:
//    http://www.imdb.com/name/nm0285989/
//    http://www.imdb.com/name/nm1343656/
//    http://www.imdb.com/name/nm0934798/ (Archive Footage)