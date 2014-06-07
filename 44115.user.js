// This is a script for the IMDB site. Please see the description below.
//
// Copyright (c) 2009, Ricardo Mendonca Ferreira (ric@mpcnet.com.br)
// Released under the GPL license - http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          IMDB - Hide TV listings
// @description   On any "filmography by rating" page, this script allows you to hide the TV, video and game titles, and the US airing times.
// @namespace     http://userscripts.org/scripts/show/44115
// @include       http://*imdb.com/*/filmorate*
// @version       2010.04.17
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
// 2009.03.07  First version (hide TV and video titles).
// 2009.09.13  Can hide TV movies and TV series separately and can also hide US TV airing times.
// 2010.04.17  Can now hide game titles
//


(function() {


   function hide_ratings(link, type, node_array) {
      // hide link
      link.setAttribute("style","display: none;");

      var regex = '';
      var match;
      var movie;

      switch (type) {
         case 1:  regex = '\\(TV\\)'; break; // TV movies
         case 2:  regex = '>".+?"<';  break; // TV series
         case 3:  regex = '\\(V\\)';  break; // Video
         case 4:  regex = '\\(VG\\)'; break; // Game
         case 5:  regex = '<h6>Next US airings:</h6><table.+?</table>'; break; // Airings
      }

      for (var j = 0; j < node_array.length; j++) {
         var movies = node_array[j];
         for (var i = 0; i < movies.childNodes.length; i++) {
            movie = movies.childNodes[i];
            if (movie && movie.innerHTML) {
               match  = movie.innerHTML.match(regex);
               if (!match)
                  continue;
               
               if (type >= 1 && type <= 4) {
                     movie.setAttribute("style","display: none;");
               } else {
                  movie.innerHTML = movie.innerHTML.replace(/<h6>Next US airings:<\/h6><table.+?<\/table>/,'');
               }

            }
         }
      }
   }


   function create_hide_link(div_filmo) {
      // Find correct childnode to process (it's an "Ordered List")
      var ol_nodes = new Array;
      
      for (var j = 0; j < div_filmo.snapshotLength; j++) {
         var filmo = div_filmo.snapshotItem(j);
         for (var i = 0; i < filmo.childNodes.length; i++) {
            if (filmo.childNodes[i].tagName == "OL") {
               ol_nodes.push(filmo.childNodes[i]);
               break;
            }
         }
      }
      
      var div = document.createElement("div");
      div.setAttribute("style", "margin-left: 110px;");
      
      var space = new Array;
      for (var j = 0; j < 4; j++) {
         space[j] = document.createElement("small");
         space[j].innerHTML = '<small>&nbsp;</small>';
      }

      var tv_movie  = document.createElement("a");
      var tv_series = document.createElement("a");
      var video     = document.createElement("a");
      var game      = document.createElement("a");
      var airings   = document.createElement("a");
      
      tv_movie.innerHTML  = "<small>[- TV movies]</small>";
      tv_series.innerHTML = "<small>[- TV series]</small>";
      video.innerHTML     = "<small>[- video]</small>";
      game.innerHTML      = "<small>[- games]</small>";
      airings.innerHTML   = "<small>[- airings]</small>";
      
      tv_movie.href = "javascript:;";
      tv_movie.addEventListener("click", function () { hide_ratings(tv_movie, 1, ol_nodes) }, false);
      div.appendChild(tv_movie);

      div.appendChild(space[0]);

      tv_series.href = "javascript:;";
      tv_series.addEventListener("click", function () { hide_ratings(tv_series, 2, ol_nodes) }, false);
      div.appendChild(tv_series);

      div.appendChild(space[1]);

      video.href = "javascript:;";
      video.addEventListener("click", function () { hide_ratings(video, 3, ol_nodes) }, false);
      div.appendChild(video);

      div.appendChild(space[2]);

      game.href = "javascript:;";
      game.addEventListener("click", function () { hide_ratings(game, 4, ol_nodes) }, false);
      div.appendChild(game);

      div.appendChild(space[3]);

      airings.href = "javascript:;";
      airings.addEventListener("click", function () { hide_ratings(airings, 5, ol_nodes) }, false);
      div.appendChild(airings);

      div_filmo.snapshotItem(0).insertBefore(div, ol_nodes[0]);
   }

   //-------- "main" --------

   // Scan all filmography <div>s and add our new links to the 1st one
   var div = document.evaluate("//div[@class='filmo']", document, null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   if (div)
      create_hide_link(div);

})()

// Good links for testing:
//    http://www.imdb.com/name/nm0000434/filmorate
//    http://www.imdb.com/name/nm0942367/filmorate
//    http://www.imdb.com/name/nm1343656/filmorate
//    http://www.imdb.com/name/nm0670408/filmorate
//    http://www.imdb.com/name/nm0001449/filmorate
