/*
   colorfix.user.js

   Greasemonkey user script.

   Author:   William Donnelly. Copyright (c) 2004,2005. All right reserved. Etc...
   Contact:  donnelly@snowcrest.net
   See:      http://www.snowcrest.net/donnelly/gmscripts/

   Color Fix - Webpage Colors Corrector.    (2004/2005)
   Fix colors for websites that are not implemented correctly.

   For this script to operate properly, you must set your
   default Firefox browser colors as follows:

      Text        = "#fffffd"    white (effectively)
      Background  = "#000002"    black (effectively)

         These colors were chosen because the chances of a website using them is slim. (?)

               // OLD  Text        = "#fedcba"    light orange beige
               // OLD  Background  = "#123456"    dark teal blue

         (the above color requirements would be better if the user could specify
         any default colors and those could be referenced in the code ---
         at this time, I don't know how to access the user's default browser color specifications)

      To change the color preferences to the above values, enter 'about:config' in the browser
      address URL text box and press ENTER. When the preferences configuration window is loaded,
      enter 'color' in the Filter text box and press ENTER. The two preferences you want to modify
      are 'browser.display.background_color' and 'browser.display.foreground_color'. Double-click
      on each item to enter the new values. Close the window/tab.

   Originally C:\WINDOWS\Application Data\Mozilla\Firefox\Profiles\default.fic\chrome\userScript.js

   This script is executed for each "window" loaded at onLoad time. (including frames and iframes)

   The following bookmarklet changes colors via CSS.
   This code was added-modified to this script's overall functionality.
   Sometimes the current system does not "fix" some websites, whereas this bookmarklet will.

      javascript:(function(){var newSS, styles='* { backgroundColor: white ! important;
         color: black !important } :link, :link * { color: #0000EE !important }
         :visited, :visited * { color: #551A8B !important }';
         document.bgColor=%22#ffffff%22; if(document.createStyleSheet)
         { document.createStyleSheet(%22javascript:'%22+styles+%22'%22); }
         else { newSS=document.createElement('link'); newSS.rel='stylesheet';
         newSS.href='data:text/css,'+escape(styles);
         document.documentElement.childNodes[0].appendChild(newSS); } })();

   This nofix bookmarklet stops color correction from executing on a specific page by
   prepending "nofix=nofix" to the currently viewed URL search text:
      javascript:
         if(location.search=="")
            {location.search=%22nofix=nofix%22}
         else
            {location.search=%22nofix=nofix&%22+location.search.substr(1)};
         void 0
   Remember that bookmarklets must not have any line breaks.
   For permanent website non-execution, use the Gm @exclude parameter. (see below)

   Ver 1.1.0  Added default HTML CSS style for background-color for 'transparency' problems. (6/2005)
   Ver 1.0.9  Calling checkColors() immediately for sites that don't execute the onLoad event. (6/2005)
   Ver 1.0.8  Changed default browser colors to #fefefe and #121212. (6/2005)
   Ver 1.0.7  Now supports user's default browser colors if eventually added to Gm (5/2005)
   Ver 1.0.6  Added a new exclude metadata item and modified RegEx's. (4/2005)
   Ver 1.0.5  Minor mod to nofix check, added versioning, and more documentation. (4/2005)
   Ver 1.0.4  Removed (i)frame loop code and corrected references due to Gm being loaded so early now.
               Plus some variable/constant name formatting and better nofix bookmarklet.  (4/2005)
   Ver 1.0.3  Better CSS Style specification and code formatting/cleaning/betterment.  (3/2005)
   Ver 1.0.2  Now corrects missing/null foreground and background color properties pages.  (2/2005)
   Ver 1.0.1  Now corrects "bad color" specifiers, like when they forget to prepend a "#".  (1/2005)
*/

// userscript metadata follows...

// ==UserScript==
// @name          Color Fix - Webpage Colors Corrector
// @namespace     http://www.snowcrest.net/donnelly/gmscripts/
// @description   Fix colors for websites that are not implemented correctly
// @include       *
// @exclude       http*.dailygrail.com*
// @exclude       http*.matthawkins.co.uk*
// @exclude       http*.channel101.com*
// @Version       1.1.0
// @GmVersion     0.3.4
// @Author        William Donnelly
// @Email         snowcrest.net | donnelly
// ==/UserScript==

(function() {

   fixColors = function (poDoc) {

      try {

         if (poDoc.body == undefined)   // special case to avoid errors
            return;

         var cFG_TO_COLOR = "#000001";    // resultant text foreground color = black (effectively)
         var cBG_TO_COLOR = "#fffffe";    // resultant background color = white (effectively)

         var cFG_COLOR = "#fffffd";       // browser default text color to check for (almost white)
         var cBG_COLOR = "#000002";       // browser default background color to check for (almost black)

         var bdF_color = "";  // GM_getValue ("browser.display.foreground_color", "");
         var bdB_color = "";  // GM_getValue ("browser.display.background_color", "");

         if (bdF_color != ""  &&  bdB_color != "") {
            var cFG_COLOR = bdF_color;
            var cBG_COLOR = bdB_color;
         }

         var sText = poDoc.body.text;
         var sBgColor = poDoc.body.bgColor;

         var sDefaultStyle = "";

         if (sText == undefined) {      // when there is no 'text' property in the 'body' tag
            poDoc.body.text = cFG_COLOR;
            sText = poDoc.body.text;
         }

         if (sBgColor == undefined) {   // when there is no 'bgColor' property in the 'body' tag
            poDoc.body.bgColor = cBG_COLOR;
            sBgColor = poDoc.body.bgColor;
         }

         if (sText.length == 6  &&  sText.search (/^[0-9a-f]{6}/i) != -1) {   // forgotten prepended #
            poDoc.body.text = cFG_COLOR;
            sText = poDoc.body.text;
         }

         if (sBgColor.length == 6  &&  sBgColor.search (/^[0-9a-f]{6}/i) != -1) {   // forgotten prepended #
            poDoc.body.bgColor = cBG_COLOR;
            sBgColor = poDoc.body.bgColor;
         }

         if (sText == cFG_COLOR  &&  sBgColor == cBG_COLOR) {
            poDoc.body.text = cFG_TO_COLOR;
            poDoc.body.bgColor = cBG_TO_COLOR;
            sDefaultStyle = "html { background-color: " + poDoc.body.bgColor + " }" +
               " body { background-color: " + cBG_TO_COLOR +
               " !important; color: " + cFG_TO_COLOR + " !important }";

         } else {
            if (sText == cFG_COLOR) {
               poDoc.body.text = cFG_TO_COLOR;
               sDefaultStyle = "html { background-color: " + poDoc.body.bgColor + " }" +
                  " body { color: " + cFG_TO_COLOR + " !important }";

            } else {
               if (sBgColor == cBG_COLOR) {
                  poDoc.body.bgColor = cBG_TO_COLOR;
                  sDefaultStyle = "html { background-color: " + poDoc.body.bgColor + " }" +
                     " body { background-color: " + cBG_TO_COLOR + " !important }";

               } else {    // default in case style background: transparent for HTML or BODY is used
                  sDefaultStyle = "html { background-color: " + poDoc.body.bgColor + " }";
               }
            }
         }

         //if (sText == cFG_COLOR  ||  sBgColor == cBG_COLOR  ||  sDefaultStyle != "") {
            if (poDoc.createStyleSheet) {
               poDoc.createStyleSheet ("javascript:'" + sDefaultStyle + "'");

            } else {
               var oNewSS = poDoc.createElement ('link');
               oNewSS.rel = 'stylesheet';
               oNewSS.href = 'data:text/css,' + escape (sDefaultStyle);
               poDoc.documentElement.childNodes[0].appendChild (oNewSS);
            }
         //}   // always true now

      }  // try

      catch (eErr) {
         window.status = "1) color fixer Error " + eErr + " | " + location;    // do nothing; skip errors
      }

      return;
   }  // fixColors


   checkColors = function () {

      try {

         if (location.search.search (/nofix=nofix/) < 0) {   // note: only works on top document

            fixColors (document);

         }

      }  // try

      catch (eErr) {
         window.status = "2) color fixer Error " + eErr + " | " + location;    // do nothing; skip errors
      }

      return;
   }  // checkColors

   this.addEventListener ("load", checkColors, false);    // perform color mods at onLoad for each window object

   checkColors();    // do it now for sites that don't execute the onLoad event

})();
