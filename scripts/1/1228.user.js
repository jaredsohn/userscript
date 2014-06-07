// NowPlaying for Iceberg Radio (www.icebergradio.com)
// version 0.1
// 2005-06-25
// Copyright (c) 2005, Chris Bellini (www.chrisbellini.com)
// Released under the GNU Lesser General Public License
// http://www.fsf.org/licensing/licenses/lgpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF NOWPLAYING FOR
// ICEBERG RADIO, go to Tools/Manage User Scripts and manually uninstall
// the previous version before installing this one.  Sorry, this is a
// limitation of Greasemonkey.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "NowPlaying for Iceberg Radio", and click Uninstall.
//
// --------------------------------------------------------------------
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Now Playing for Iceberg Radio
// @namespace     http://www.chrisbellini.com/projects.php?idx=12
// @description	  Displays info about the currently playing track
// @include       http://www.icebergradio.com/musicbox/*
// ==/UserScript==

(function() {
  window.addEventListener("load", function(e) {

   // Purpose: Retreive info about the currently playing track
   //       I: (none)
   //       O: (none)
   function IcebergNowPlaying()
   {
       var strCurrURL;
       var strInfoHTML;
       var strStationID;


       // Get the URL currently in the (hidden) address bar.
       strCurrURL = document.location.href;

       // Make sure that this is the Media Player page.  We can do this by
       // looking for "muze_player.new.asp" in the URL.  If this is
       // the Media Player page, we'll need to determine the ID of the station
       // being streamed.
       if (strCurrURL.indexOf("muze_player.new.asp") != -1)
       {
           // Extract the station ID
           strStationID = GetStationIDFromURL(strCurrURL);

           // Let the user know if the station ID we got is bad.
           if (strStationID == null)
           {
               document.title('Bad station ID.');
               return;
           }

           // Assemble the URL of the station's info page.  We'll use it
           // to navigate to the station's info page.  In the case
           // of 2Kool4Radio, its info page is:
           //
           //     http://www.icebergradio.com/station.asp?station=41318
           strStationInfoURL = "http://www.icebergradio.com/station.asp?station=" +
                               strStationID;

           // Does the user have a recent version of the Greasemonkey extension installed?
           // I hope so, or else we won't be able to use GM_xmlhttpRequest().
           if (!GM_xmlhttpRequest)
           {
               document.title('Please upgrade to the latest version of Greasemonkey (http://greasemonkey.mozdev.org).');
               return;
           }

           // Retreive all of the HTML from the station's info page.
           GM_xmlhttpRequest({
             method:"GET",
             url:strStationInfoURL,
             headers:{
               'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
               'Accept':'application/xml,text/xml,text/html,application/xhtml+xml',
               },
             onload:function(details) {
               UpdateWindowTitle(details);
             }
           });

           // We will repeat this entire process every minute.  This shouldn't be a big hit on Iceberg's
           // web servers since it's just a simple HTTP request.
           setTimeout(function() { IcebergNowPlaying(); }, 60000);
       }
   }

   // Purpose: Update the "player" window's title with the
   //          currently song title and artist.
   //       I: HTTP details returned by GM_xmlhttpRequest()
   //       O: (none)
   function UpdateWindowTitle(result)
   {
       var strNewTitle;
       var reSongTitle;
       var matchSongTitle;
       var strSongTitle = "";
       var strArtist;
       var strHTML;
       var strTemp;
       var iStartPos, iEndPos;


       // If there was a problem sending our HTTP request, let user know
       // about it.
       if (result.status != '200')
       {
           document.title = '[INFO UNAVAILABLE]';
           return;
       }

       // Retrieve the HTML sent back to us.
       strHTML = result.responseText;

       // Parse the retrieved HTML looking for info about the currently
       // playing track.  Info will appear similar to the following:
       //
       // <div id="nowplaying"><br /><br /><a href="/track.asp?track=311776" style="color: #000000; font-weight: normal;">&quot;&nbsp;Nowhere To Go But Home&nbsp;&quot;</a><br /><a href="/artist.asp?track=311776" style="color: #000000; font-weight: normal;">Six By Seven</a></div>
       iStartPos = strHTML.indexOf('<div id="nowplaying">');
       strTemp = strHTML.substring(iStartPos, strHTML.length)
       iEndPos = strTemp.indexOf('</div>');
       strTemp = strTemp.substring(0, iEndPos);

       // Find the song title
       reSongTitle = new RegExp(/&quot;&nbsp;.*&nbsp;&quot;/);
       matchSongTitle = reSongTitle.exec(strTemp);

       if (matchSongTitle == null)
       {
           strSongTitle = '[INFO UNAVAILABLE]';
           return;
       }
       else
       {
           for (i = 0; i < matchSongTitle.length; i++)
           {
             strSongTitle = strSongTitle + matchSongTitle[i];
           }
       }

       strSongTitle = strSongTitle.replace(/&quot;&nbsp;/, "");
       strSongTitle = strSongTitle.replace(/&nbsp;&quot;/, "");

       // Find the artist
       iStartPos = strTemp.indexOf('<a href="/artist.asp');
       strTemp = strTemp.substring(iStartPos, strTemp.length);
       iStartPos = strTemp.indexOf('>');
       iEndPos = strTemp.indexOf('</a>');
       strArtist = strTemp.substring(iStartPos + 1, iEndPos);
       strNewTitle = strArtist + ' - "' + strSongTitle + '"';

       // Set the title of the window to 'ARTIST - "Song Title"'
       document.title = strNewTitle;
   }


   // Purpose: Retrieve the station ID from an Iceberg Player URL
   //       I: player URL
   //       O: station ID number or null if we can't find it
   function GetStationIDFromURL(strURL)
   {
       var strID = "";
       var reStationID;
       var matchStationID;
       var arrTokID;


       reStationID = new RegExp(/.asp\?station=\d*/);
       matchStationID = reStationID.exec(strURL);

       // Now we need to determine the ID of the station being streamed.  For example, if
       // we're listening to 2Kool4Radio, the URL is:
       //
       //    http://www.icebergradio.com/musicbox/muze_player.new.asp?station=41318&group=24
       //
       // The station variable is the ID.  In this case, 2Kool4Radio's ID
       // is 41318.  Extract that from the URL.

       // If we can't match the pattern, return null.  Otherwise, retrieve
       // the matching expression.  The URL will look like this:
       //
       //   http://www.icebergradio.com/musicbox/muze_player.new.asp?station=41318&group=24
       //
       // We'll then tokenize the match on the equal sign '='.  The right
       // side of the token will be our station ID.
       if (matchStationID == null)
       {
           return null;
       }
       else
       {
           for (i = 0; i < matchStationID.length; i++)
           {
             strID = strID + matchStationID[i];
           }

           // Make sure we have an equal sign '=' in the string
           if (strID.indexOf('=') != -1)
           {
               // tokenize
               arrTokID = strID.split('=');

               if (!(IsNumeric(arrTokID[1])))
               {
                   return null;
               }
           }
           else
           {
               return null;
           }

           return arrTokID[1];
       }
   }


   // Purpose: Utility function to determine if a string contains only
   //          numeric characters (apparently JavaScript doesn't have
   //          a feature like this built-in).  AFAIK, IcebergRadio station
   //          IDs are always numeric.
   //       I: string
   //       O: true=numeric, false=not numeric
   function IsNumeric(strText)
   {
       var strValidChars = "0123456789";
       var bIsNumber = true;
       var chChar;


       for (i = 0; i < strText.length && bIsNumber == true; i++)
       {
           chChar = strText.charAt(i);

           if (strValidChars.indexOf(chChar) == -1)
           {
               bIsNumber = false;
           }
       }
       return bIsNumber;
   }


   // Kick off the script
   IcebergNowPlaying();
  }, false);
})();
