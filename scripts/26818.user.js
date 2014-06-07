// File encoding: UTF-8
//{
// This is a script for the IMDb site. It emphasize links to movies in your
// "My Movies" and "Vote History" lists. For instance, on an actor's page,
// you'll easily notice which of his/her movies you've already seen/voted.
//
// Copyright (c) 2008-2011, Ricardo Mendonça Ferreira (ric@mpcnet.com.br)
// Released under the GPL license - http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          IMDb "My Movies" enhancer
// @description   Emphasize the links for movies on your "My Movies" & "Vote History" list
// @namespace     http://www.flickr.com/photos/ricardo_ferreira/2502798105/
// @include       http://*.imdb.com/*
// @match         http://*.imdb.com/*
// @exclude       http://i.imdb.com/*
// @exclude       http://*imdb.com/images/*
// @exclude       http://*imdb.com/list/export*
// @version       1.35
// @grant         
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you either need Google Chrome (www.google.com/chrome)
// or Firefox (www.firefox.com) with Greasemonkey (www.greasespot.net).
// Install Greasemonkey, then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select this script and click Uninstall.
//
// --------------------------------------------------------------------
//
// To-do:
//   - Add support for other types of lists
//
// History:
// --------
// 2013.10.05  [1.35] Fixed bug where script buttons might not show up sometimes
// 2013.09.21  [1.33] Experimental: downloading all lists at once! (http://userscripts.org/topics/131873)
// 2013.09.20  [1.32] Fixed another change in the IMDb site (http://userscripts.org/topics/126010?page=2)
// 2013.05.31  [1.31] Adding some more error checking
// 2013.05.29  [1.30] Fixed bug in the "tabs" sections (trivia, connections, etc.)
// 2013.05.27  [1.29] Working again after changes on IMDb site; fixed tooltip bug
//                    that could affect navigation (thanks, somini!); fixed tooltip bug where
//                    the tooltip would appear behind another element; highlighting works
//                    on the main page of a title
// 2012.12.06  [1.28] Sorry... fixed a bug introduced in the previous bugfix. :P
// 2012.12.06  [1.27] Changed versioning model (since it wasn't working correctly on Chrome),
//                    fixed small bug where search results were not being highlighted.
// 2012.12.06  [1.26] Fix for IMDb site change, correctly shows how many lists it will load,
//                    should also work with dynamic loaded links and images
// 2011.10.06  [1.25] Workaround fixed Opera regex memory leak; Added code to give
//                    "color priority" for a specific list (see movieColor function)
// 2011.10.05  [1.24] Fixed bug where movie data was not captured if there were no votes for it;
//                    Small changes to try to fix possible memory leaks on Opera
// 2011.09.19  [1.23] Fixed & improved code to handle ratings, now should always show the
//                    correct rating for a movie in the tooltips
// 2011.09.17  [1.22] Small bugfixes; made it work again on Google Chrome
// 2011.09.14  [1.21] Works on xx.imdb.com; made it easier to support movies lists in
//                    languages other than English (if/when they are available)
// 2011.09.09  [1.20] To disable color highlighting for a list just remove its customColors
//                    entry, or make the color = ""; Now compatible with N900 again; Shows
//                    both your rating & IMDb rating in the tooltip
// 2011.09.07  [1.19] Fix for IMDb change in the format of the export link
// 2011.09.06  [1.18] Fixed bug where movies were still considered in a list when they were not
// 2011.09.04  [1.17] Using dhtml tooltips; added tooltip to movie titles;
// 2011.09.02  [1.16] Get lists id with new regex to avoid conflict with other scripts;
//                    Show in the link title all lists a movie is in;
//                    Enable custom lists colors by changing the script code (look for customColors)
// 2011.08.27c [1.15] Automatically reload page when changed sort/view
// 2011.08.27b [1.14] Don't stop downloads if can't find movies in a list; ignore lists not about titles
// 2011.08.27  [1.13] Slightly better handling of download errors
// 2011.08.26d [1.12] Fourth updade in a day! Now sorting option is user selectable
// 2011.08.26c [1.11] Guess what? Now IMDb enabled list configuration... it's not working on all lists, though... XP
// 2011.08.26b [1.10] Less than one hour after uploading this script IMDB changed a few features again! :P
// 2011.08.26  [1.9] Changed how lists are displayed by default; allows manual update of information
// 2011.08.13  [1.8] Working with new list design, using localStorage instead of GM_*Value
// 2010.06.17  [1.7] Added functions "missing" from Chrome; thanks, ode!
// 2009.09.23  [1.6] Fix for another site redesign
// 2009.08.12  [1.5] Restored code to deal with links like those on http://www.imdb.com/Sections/Genres/Sci-Fi/average-vote
// 2009.07.28  [1.4] Fix for IMDb site change, added debug information, exclude running on image URLs
// 2008.08.27  [1.3] Explicitly send cookies (FF3 compatibility fix)
// 2008.07.27  [1.2] Fixed bug where removed movies where not actually removed;
//             now also highlight the title of the movies
// 2008.06.11  [1.1] Fixed bug that ketp growing the movie data in Firefox;
//                   now also get the vote history
// 2008.05.18  [1.0] First public release
// 2008.05.12  [0.1] First test version, private use only
//
//}


(function() {

   // Greasemonkey "clone functions" for Chrome (& others?), from http://userscripts.org/topics/41177
   // (thanks to ode: http://userscripts.org/topics/52056?page=1#posts-261313)
   // @copyright 2009, 2010 James Campos
   // @license cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
   //
   // See also: 
   // 
   // https://userscripts.org/scripts/source/145813.user.js
   if (typeof GM_deleteValue == 'undefined') {
      GM_addStyle = function(css) {
         var style = document.createElement('style');
         style.textContent = css;
         document.getElementsByTagName('head')[0].appendChild(style);
      };

      GM_deleteValue = function(name)
         { localStorage.removeItem(name); };

      GM_getValue = function(name, defaultValue) {
         var value = localStorage.getItem(name);
         if (!value)
            return defaultValue;
         var type = value[0];
         value = value.substring(1);
         switch (type) {
            case 'b':
               return value == 'true';
            case 'n':
               return Number(value);
            default:
               return value;
         }
      };

      GM_setValue = function(name, value) {
         value = (typeof value)[0] + value;
         localStorage.setItem(name, value);
      };
   }
   //----------------- End of Greasemonkey clone functions -----------------

   // Modified version of Michael Leigeber's code, from:
   // http://sixrevisions.com/tutorials/javascript_tutorial/create_lightweight_javascript_tooltip/
   // http://userscripts.org/scripts/review/91851 & others
   var injectJs = 'function tooltipClass(msg) {this.msg = msg;this.id = "tt";this.top = 3;this.left = 15;this.maxw = 500;this.speed = 10;this.timer = 20;this.endalpha = 95;this.alpha = 0;this.tt == null;this.c;this.h = 0;this.moveFunc = null;this.fade = function (d) {var a = this.alpha;if (a != this.endalpha && d == 1 || a != 0 && d == -1) {var i = this.speed;if (this.endalpha - a < this.speed && d == 1) {i = this.endalpha - a;} else if (this.alpha < this.speed && d == -1) {i = a;}this.alpha = a + i * d;this.tt.style.opacity = this.alpha * 0.01;} else {clearInterval(this.tt.timer);if (d == -1) {this.tt.style.display="none";document.removeEventListener("mousemove", this.moveFunc, false);this.tt = null;}}};this.pos = function (e, inst) {inst.tt.style.top = e.pageY - inst.h + "px";inst.tt.style.left = e.pageX + inst.left + "px";};this.show = function (msg) {if (this.tt == null) {this.tt = document.createElement("div");this.tt.setAttribute("id", this.id);c = document.createElement("div");c.setAttribute("id", this.id + "cont");this.tt.appendChild(c);document.body.appendChild(this.tt);this.tt.style.opacity = 0; this.tt.style.zIndex=100000; var inst = this;this.moveFunc = function (e) {inst.pos(e, inst);};document.addEventListener("mousemove", this.moveFunc, false);}this.tt.style.display = "block";c.innerHTML = msg || this.msg;this.tt.style.width = "auto";if (this.tt.offsetWidth > this.maxw) {this.tt.style.width = this.maxw + "px";}h = parseInt(this.tt.offsetHeight) + this.top;clearInterval(this.tt.timer);var inst = this;this.tt.timer = setInterval(function () {inst.fade(1);}, this.timer);};this.hide = function () {if (this.tt) {clearInterval(this.tt.timer);var inst = this;this.tt.timer = setInterval(function () {inst.fade(-1);}, this.timer);}};} tooltip = new tooltipClass("default txt");';

   var newJs = document.createElement('script');
   newJs.setAttribute('type', 'text/javascript');
   newJs.innerHTML = injectJs;
   document.getElementsByTagName('head')[0].appendChild(newJs);
   
   var myName = 'IMDb "My Movies" Enhancer'; // Name of this script
   var user   = '';                          // Current user name/alias
   var interval = 1000;  // Interval (in ms, >= 100) to re-scan links in the DOM
                         // Won't re-scan if < 100
                         // (I might consider using MutationObserver in the future, instead)

   function fixLinksForLists() {
      //
      // Make links for lists open in compact view and inverse sort order
      //
      var suffix  = "?start=1&view=compact&sort=listorian:desc";
      var suffixR = "?start=1&view=compact&sort=ratings_date:desc";
      var anchors = document.getElementsByTagName('a');
      for (var i=0; i < anchors.length; i++) {
         var a = anchors[i];
         var m = a.href.match(/\/(watch)?list/);
         if (m) {
            if (a.href.indexOf("?tab=")          >= 0 ||
                a.href.indexOf("?list_id=")      >= 0 ||
                a.href.indexOf("/profile/lists") >= 0 ||
                a.href.indexOf("/mymovies/list") >= 0 ||
                a.href.indexOf("/list/create")   >= 0 ||
                a.href == "/lists"
            )
               continue;
            if (a.href.indexOf("/list/ratings") >= 0)
                 a.href += suffixR;
            else a.href += suffix;
         }
      }      
   }
   
   function getCurrentUser() {
      //
      // Return name of user currently logged on IMDb (log on console if failed)
      //
      var loggedIn = '';
      var account = document.getElementById('consumer_user_nav') ||
                    document.getElementById('nbpersonalize');
      if (account) {
         var                 result = account.getElementsByTagName('strong');
         if (!result.length) result = account.getElementsByClassName("navCategory");
         if (!result.length) result = account.getElementsByClassName("singleLine");
         if (!result.length) result = account.getElementsByTagName("p");
         if (result)
            loggedIn = result[0].textContent.trim();
      }
      if (!loggedIn)
         console.log(document.URL + "\nUser not logged in (or couldn't get user info)"); // responseDetails.responseText
      return loggedIn;
   }

   var WATCHLIST   = "watchlist";
   var RATINGLIST  = "ratings";
   
   var myLists = new Array;
   
   // myLists[0].name  == "Your Watchlist"  -> Name of the list
   // myLists[0].id    == "watchlist"       -> "id" of the list
   // myLists[0].color == "DarkGoldenRod"   -> color used to highlight movies in this list
   // myLists[0].movies["1yjf"].m == "10"   -> my rating
   // myLists[0].movies["1yjf"].i == "6.6"  -> IMDB rating
   // "1yjf" = movie number (e.g., "tt0091419") "encoded in base 36"

               // To see some color names and codes, visit:
               //    http://www.w3schools.com/tags/ref_color_tryit.asp?color=White
               //    http://www.w3schools.com/html/html_colorvalues.asp

   function getMyLists() {
      //
      // Get all lists (name & id) for current user into myLists array
      // and set default colors for them (if not previously defined)
      //
      
      // Here you can add a custom color to one of your lists
      // (but the color choosen for the movie title is defined by movieColor() )
      // To make it work: be sure to save the script, reload the lists page,
      //    clear the highlight data (which will reload the lists page again)
      //    and then refresh the highlight data!
      var customColors = [];
      customColors["Your Watchlist"] = "DarkGoldenRod";
      customColors["Your ratings"]   = "Green";
      customColors["DefaultColor"]   = "DarkCyan";
      customColors["Filmes Netflix Brasil"] = "Red";

      myLists.length = 0; // Clear arrays and insert the two defaults
      myLists.push({"name":"Your Watchlist", "id":WATCHLIST,  "color":customColors["Your Watchlist"] || "", "movies":{}  });
      myLists.push({"name":"Your ratings",   "id":RATINGLIST, "color":customColors["Your ratings"]   || "", "movies":{}  });
      // Get all other lists names in this page (should work only on imdb.com/user/xxx/lists/)
      var lists = document.getElementsByClassName('lists');
      if (!lists || lists.length < 1) {
         console.log("Error getting lists (or no lists exist)!")
         return false
      }
      var names = lists[0].getElementsByClassName('name');
      if (!names || names.length < 1) {
         console.log("Error getting names of lists (or no lists exist)!")
         return false
      }
      for (var i = 1; i < names.length; i++) {
         // Lists can be about Titles, People, Characters & Images
         // Skip lists that are not about Titles
         if (names[i].textContent.indexOf("Titles)") > 0) {
            name  = names[i].children[0].text;
            id    = names[i].children[0].href.match(/\/list\/([^\/\?]+)\/?/)[1];
            color = customColors[name] || customColors["DefaultColor"] || "";
            myLists.push({"name":name, "id":id, "color":color, "movies":{} });
         }
      }
      return true
   }

   function loadMyMovies() {
      //
      // Load data for the current user
      //
      var userData = localStorage.getItem("myMovies-"+user);
      if (userData) {
         try {
            myLists = JSON.parse(userData);
            return true;
         } catch(err) {
            alert("Error loading previous data!\n" + err.message)
         }
      }
      return false;
   }
   
   function saveMyMovies() {
      //
      // Save data for the current user
      //
      var userData = JSON.stringify(myLists);
      localStorage.setItem("myMovies-"+user, userData);
   }
   
   function eraseMyData() {
      //
      // Erase just the movies and lists information for the user
      //
      localStorage.removeItem("myMovies-"+user);
      for (var i = 0; i < myLists.length; i++)
         myLists[i].movies = {};
   }

   var downloadedLists = 0;
   
   function downloadOK(idx, request, link) {
      //
      // Process a downloaded list
      //
      var regex  = /"tt[0]*(\d+)","[^"]*","[^"]*","[^"]*","[^"]*","[^"]*","[^"]*","([^"]*)","([^"]*)"/;
      var regexG = /"tt[0]*(\d+)","[^"]*","[^"]*","[^"]*","[^"]*","[^"]*","[^"]*","([^"]*)","([^"]*)"/g;
      var tt = request.responseText.match(regexG);
      if (!tt) {
         //  Ooops! Users can have empty lists, right? So let's just
         //  put a message in the log when this happens.
         //updateProgressBar(0, "");
         var msg = "No links found in movies list ["+myLists[idx].name+"]:\n"+
               "Status: "  +request.status + " - " + request.statusText +":\n"+
               "Source: "  +link +"\n" +
               "Headers: " +request.getAllResponseHeaders();
         console.log(msg);
         console.log(request.responseText);
         alert('Hmm... could not find any movies in list "'+myLists[idx].name+'".\n\nIf that was not supposed to happen, please open the error console (Ctrl+Shift+J on Firefox), select Messages and see if you can find the problem...');
         //return;
      } else {
         var res, movieCode;
         for (var i=0; i < tt.length; i++) {
            res = regex.exec(tt[i])
            if (!res) continue;
            // I "encode" the movie number with "base 36" to save memory
            movieCode = parseInt(res[1],10).toString(36);
            myLists[idx].movies[movieCode] = {m:res[2], i:res[3]};
         }
         tt = '';
      }

      // Save data into browser
      saveMyMovies();

      // Update progress bar
      downloadedLists += 1;
      var total = myLists.length;
      var p = Math.round(downloadedLists*(100/total));
      updateProgressBar(p, "Loaded "+downloadedLists+"/"+total);
      if (downloadedLists >= total) {
         updateProgressBar(0, "");
         alert("OK, we're done!");
      }
      
      // Try to free some memory
      delete request.responseText;
   };

   var createFunction = function( func, p1, p2, p3 ) {
      return function() {
         func(p1, p2, p3);
      };
   };

   function downloadError(name, request, link) {
      //
      // Alert user about a download error 
      //
      var msg = "Error downloading your list "+name+":\n"+
                "Status: "  +request.status + " - " + request.statusText +":\n"+
                "Source: "  +link +"\n" +
                "Headers: " +request.getAllResponseHeaders();
      alert(msg);
      console.log(msg);
      updateProgressBar(0, "");
   }
   
   function downloadList(idx) {
      //
      // Download a list
      //
      var ur = document.location.pathname.match(/\/(ur\d+)/);
      if (ur && ur[1])
         ur = ur[1];
      else {
         alert("Sorry, but I could not find your user ID (required to download your lists). :(");
         return;
      }

      var name = myLists[idx].name;
      var id   = myLists[idx].id;      
      var exportLink = "http://"+document.location.host+"/list/export?list_id="+id+"&author_id="+ur;
      var request = new XMLHttpRequest();
      request.onload  = createFunction(downloadOK,     idx, request, exportLink);
      request.onerror = createFunction(downloadError, name, request, exportLink);
      request.open("GET", exportLink, true);
    //request.setRequestHeader("Accept-Encoding","gzip"); // Browser does this already? (I get 'Refused to set unsafe header "Accept-Encoding"')...
      request.send();
   }
   
   function downloadLists() {
      //
      // Begin to download all user lists at once (asynchronously)
      //
      downloadedLists = 0;
      for (var idx=0; idx < myLists.length; idx++)
         downloadList(idx);
      // With 10.000 items in 5 lists, the approx. time to download them (on Chrome 29) was:
      //  -  synchronously: 1:50s
      //  - asynchronously:   30s
      // Results might vary - a lot! - depending on number of lists and browser
      // Connections per hostname seems to be around 6: http://www.browserscope.org/?category=network&v=top
   }
   
   // Really simple progress bar...
   var pb;
   var pbBox;
   var pbTxt;

   function createProgressBar(p, msg) {
      var top_  = Math.round(window.innerHeight / 2)  -15;
      var left  = Math.round(window.innerWidth  / 2) -100;
      pbBox = document.createElement('div');
      pbBox.style.cssText  = "background-color: white; border: 2px solid black; "+
         "position: fixed; height: 30px; width: 200px; top: "+top_+"px; left: "+left+"px;";
      document.body.appendChild(pbBox);

      pb = document.createElement('div');
      pb.style.cssText = "background-color: green; border: none; height: 100%; width: "+p+"%;";
      pbBox.appendChild(pb);

      pbTxt = document.createElement('div');
      pbTxt.textContent   = msg;
      pbTxt.style.cssText = "text-align: center; margin-top: -25px; font-family: verdana,sans-serif;";
      pbBox.appendChild(pbTxt);
   }

   function updateProgressBar(p, msg) {
      if (p <= 0) {
         pbBox.style.display = "none";
         return;
      }
      pbTxt.textContent = msg;
      pb.style.width    = p+"%";
   }

   
   function movieColor(num) {
      //
      // Receives an IMDb movie code and return the highlight color (if any).
      // It will return the color for the first list where the file is found.
      // Argument "num": movie number encoded in base 36
      //

      // Uncomment the lines below to check a movie in a specific list first.
      // Change the "MyMovies: Seen" to the name of the list of your choice.
      /*
      for (var i = 0; i < myLists.length; i++)
         if (myLists[i].name == "MyMovies: Seen")
            if (myLists[i].movies[num])
               if (myLists[i].color)
                  return myLists[i].color;
      */

      for (var i = 0; i < myLists.length; i++) {
         if (myLists[i].movies[num])
            if (myLists[i].color)
               return myLists[i].color;
      }
      return "";
   }
   function movieLists(num) {
      //
      // Receives an IMDb movie code and return the names of lists containing it.
      // Argument "num": movie number encoded in base 36
      //
      var num_l = 0;
      var lists = "";
      var pos   = -1;
      var rated = false;
      var imdbRating = "";
      var header     = "";
      var movie, name;
      for (var i = 0; i < myLists.length; i++) {
         movie = myLists[i].movies[num];
         if (movie) {
            if (num_l)
               lists += "<br>";
            name       = myLists[i].name;
            imdbRating = movie.i;
            if (name == "Your ratings") {
               name = "Your ratings: " + movie.m + " (IMDb: " + imdbRating + ")";
               rated = true;
            }
            lists += name;
            num_l += 1;
         }
      }
      if (!rated)
           imdbRating = "IMDb rating: " + imdbRating + "<br>";
      else imdbRating = "";
      if (num_l == 1)
           header = "<b>In your list:</b><br>";
      else header = "<b>In "+num_l+" of your lists:</b><br>";

      return imdbRating + header + '<div style="margin-left: 15px">' + lists + '</div>';
   }

   function addTooltip(obj, txt) {
      txt = txt.replace(/'/g, '"');
      obj.setAttribute("onmouseover", "tooltip.show('"+txt+"');");
		obj.setAttribute("onmouseout",  "tooltip.hide();");
   }

   function addTooltipStyle() {
      // Tooltips stuff
      GM_addStyle("#tt {position:absolute; display:block;} " + 
                  "#ttcont {display:block; padding:2px 12px 3px 7px; margin-left:5px; background:#666; color:#FFF; font:11px/1.5 Verdana, Arial, Helvetica, sans-serif;}");
   }

   function highlightTitle() {
      //
      // Highlight title in the current page
      //
      var m = document.location.href.match(/tt[0]*(\d+)\//);
      if (m) {
         var num = parseInt(m[1]).toString(36);
         var color = movieColor(num);
         var lists = movieLists(num);
         if (color) {
            var h1 = document.getElementsByTagName("h1");
            if (h1) {
               title = h1[0].getElementsByClassName("itemprop");
               if (title && title.length > 0) {
                  title[0].style.color = color;
                  addTooltip(title[0], lists);
               }
            }
         }
      }
   }

   var lastAnchors;
   
   function highlightLinks() {
      //
      // Highlight all links in the current page for an IMDb movie page
      //
      var anchors = document.getElementsByTagName('a');
      //if (anchors.length == lastAnchors) return;
      
      for (var i=0; i < anchors.length; i++) {
         var a = anchors[i];
         if (a.imdbE == undefined) {
            a.imdbE = false;
            if ((a.href.indexOf("/tt") >= 0) || (a.href.indexOf("/Title") >= 0) &&
                 a.href.indexOf("tt_moviemeter_why") == -1) {
               m = a.href.match(/tt[0]*(\d+)\/(.?)/);
               if (!m) {
                  m = a.href.match(/imdb\..{2,3}\/Title\?[0]*(\d+)$/);
                  // http://www.imdb.com/Title?0266543 
                  if (!m) continue;
               }
               if (m.length >= 3 && m[2] != "?" && m[2] != "")
                  continue;
               // I "encode" the movie number with "base 36" to save memory
               num   = parseInt(m[1]).toString(36);
               color = movieColor(num);
               lists = movieLists(num);
               if (color) {
                  a.style.fontWeight = "bold";
                  a.style.color      = color;
                //a.style.fontStyle  = "italic";
                  addTooltip(a, lists);
                  a.imdbE = true;
               }
            }
         }
      }
      lastAnchors = anchors.length;
   }

   function refreshMovieData() {
      alert(myName+"\n\n"+user+", I'll get some info from IMDb to be able to highlight your movies,\nplease click [OK] and wait a bit...");
      eraseMyData();
      createProgressBar(0, "Loading 1/"+myLists.length+"...");
      downloadLists();
   }

   var btn1; // refresh
   var btn2; // clear
   var btn3; // sort
   var btn4; // help

   function btnRefresh() {
      refreshMovieData();
   }
   
   function btnClear() {
      eraseMyData();
      alert(myName+"\n\nDone! Information cleared, so highlighting is now disabled.");
      window.location.reload();
   }

   function btnSort () {
      if (sort && sort == "true")
           sort = "false";
      else sort = "true";
      localStorage.setItem("myMovies-"+user+"-sort", sort);
      this.textContent = "Sort/view: default"; if (sort == "true") btn3.textContent = "Sort/view: old style";
      window.location.reload();
   }
   
   function btnHelp () {
      alert(myName+"\n\nThis is a user script that:\n"+
            "\t - highlights links for movies in your lists\n"+
            "\t - changes the default view of your lists\n"+
            "\t - shows in which of your lists a movie is (in a tooltip)\n"+
            "\nIn order to highlight the movies "+
            "in all IMDb pages as fast as possible, we need to download "+
            "the data from your lists into your browser. Unfortunately " +
            "this can be slow, so it is not done automatically. I suggest "+
            "you to update this information at most once a day.\n\n" +
            "[Refresh highlight data] updates the data in your browser.\n" +
            "[Clear highlight data] disables color highlighting.\n" +
            "[Sort/View] changes how lists are displayed by default (click to toggle; requires page reload).\n\n" +
            "For more information and updates, visit http://userscripts.org/scripts/show/26818"
      );
   }

   function addBtn(div, func, txt, help) {
      var b = document.createElement('button');
      b.className     = "btn";
      b.style.cssText = "margin-right: 10px; font-size: 11px;";
      b.textContent   = txt;
      b.title         = help
      b.addEventListener('click', func, false);
      div.appendChild(b);
      return b;
   }
   
   function addButtons() {
      var h2 = document.getElementsByTagName("h2");
      if (h2) {
         div  = document.createElement('div');
         div.className      = "aux-content-widget-2";
         div.style.cssText  = "margin-top: 10px;";
         btn1 = addBtn(div, btnRefresh, "Refresh highlight data", "Reload movie information from your lists - might take a few seconds");
         btn2 = addBtn(div, btnClear,   "Clear highlight data",   "Disable color highlighting of movie titles");
         btn3 = addBtn(div, btnSort,    "Sort/view: default",     "Enable/disable your lists to open by default in compact mode and inverse order (like in the 'old style')");
         btn4 = addBtn(div, btnHelp,    "What's this?",           "Click for help on these buttons");
         if (sort == "true") btn3.textContent = "Sort/view: old style";
         h2[0].appendChild(div);
      } else console.log('Could not find "main" div to insert buttons!');
   }

   //-------- "main" --------

   var we_are_in_the_lists_page = false;
   if (document.location.href.match(/\.imdb\..{2,3}\/user\/[^\/]+\/lists/)) {
      we_are_in_the_lists_page = true;
      getMyLists();
   }
   
   // Find current logged in user, or quit script
   user = getCurrentUser();
   if (!user) return;  // FIX-ME: to support external sites: set/get LAST user to/from browser storage

   // Fix links for lists
   var sort = localStorage.getItem("myMovies-"+user+"-sort");
   if (sort && sort == "true")
      fixLinksForLists();

   // Allow user to manually update his/her list of movies
   if (we_are_in_the_lists_page) {
      addButtons();
      return; // Nothing else to do on the lists page - goodbye!
   }

   // Load movie data for this user from localStorage
   loadMyMovies();

   // highlight movie links
   if (myLists.length) {
      addTooltipStyle();
      highlightTitle();
      highlightLinks();
      if (interval >= 100)
         setInterval(highlightLinks, interval);
   }

})()

// Test URLs:
//    http://www.imdb.com/mymovies/list
//    http://www.imdb.com/title/tt0110912/trivia?tab=mc
//    http://www.imdb.com/chart/top
//    http://www.imdb.com/genre/sci_fi
//    http://www.imdb.com/search/title?genres=sci_fi&title_type=feature&num_votes=1000,&sort=user_rating,desc
//    http://www.imdb.com/event/ev0000003/2011
//    http://www.imdb.com/year/2004
//    Over the "instantaneous results" below the search box
//       Funny... Shark Tale on the page above points to http://www.imdb.com/title/tt0384531/,
//       but when opened it redirects to ............... http://www.imdb.com/title/tt0307453/