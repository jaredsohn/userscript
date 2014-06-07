// ==UserScript==
// @name          jpopsuki title script
// @namespace     http://otterish.co.uk
// @description   gives tracker pages more useful titles
// @version       0.2
// @include       http://mullemeck.serveftp.org*/jps_beta/*
// @exclude       http://mullemeck.serveftp.org*/jps_beta/forums/*
// ==/UserScript==

(function(){

var newTitle;
var thisLoc = document.location.search;

// Parse the query string
switch (thisLoc) {
   case '?page=faq':
      newTitle = 'FAQ';
      break;

   case '?page=tv':
      newTitle = 'TV';
      break;

   case '?page=radio':
      newTitle = 'Radio';
      break;

   case '?page=irc':
      newTitle = 'IRC ~ #jpopsuki @ synIRC';
      break;

   case '?page=upload':
      newTitle = 'Upload torrent';
      break;

   case '?page=stats':
      newTitle = 'Stats';
      break;

   case '?page=rss':
      newTitle = 'RSS Feeds';
      break;

   case '?page=usertorrents':
      newTitle = 'Your torrents';
      break;

   // If nothing matched, do the substr() checks
   default:
      // Uses substr() because the 'recheck' flag sometimes on the URL
      if (thisLoc.substr(0, 13) == '?page=profile')
         newTitle = 'Your profile';

      else if (thisLoc.substr(0, 17) == '?page=details&id=') {
         newTitle = document.getElementsByTagName('table')[2].getElementsByTagName('td')[0].innerHTML;
         newTitle = 'Details for ' + newTitle.substring(18, (newTitle.length - 8));
      }

      else if (thisLoc.substr(0, 18) == '?page=userinfo&id=') {
         newTitle = document.getElementsByTagName('table')[2].getElementsByTagName('td')[0].innerHTML;
         newTitle = newTitle.substring(6, (newTitle.length - 15)) + "'s user page";
      }

      else if (thisLoc.substr(0, 22) == '?page=usertorrents&id=')
         newTitle = "User's torrents";

      else if (thisLoc.substr(0, 12) == '?page=browse') {
         newTitle = 'Browse torrents';
         var pageNo = 0;

         if (thisLoc.substr(0, 20) == '?page=browse&search=') {
            searchStart = 20;
            searchEnd = thisLoc.indexOf('&', searchStart);
            if (searchEnd == -1)
               var search = thisLoc.substring(searchStart);
            else
               var search = thisLoc.substring(searchStart, searchEnd);
            search = unescape(search.replace(/\+/g,  " "));
            newTitle = 'Search results for "'+ search +'"';
         }

         else if (thisLoc.substr(0, 18) == '?page=browse&top=1')
            newTitle = 'Browse popular torrents';

         else if (thisLoc.substr(0, 23) == '?page=browse&needseed=1')
            newTitle = 'Browse seedless torrents';

         // Page number parser
         pageNoStart = thisLoc.indexOf('bpage=') + 6;
         if (pageNoStart > 6) { // Is there a page number?
            pageNoEnd = thisLoc.indexOf('&', pageNoStart);
            if (pageNoEnd == -1)
               pageNo = thisLoc.substring(pageNoStart);
            else
               pageNo = thisLoc.substring(pageNoStart, pageNoEnd);
         }

         if (pageNo > 0)
            newTitle += " :: Page " + ((pageNo * 1) + 1);

      }
}


if (newTitle != null)
   document.title = "JPOPSUKI Tracker :: " + newTitle;

})();