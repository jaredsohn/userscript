// ==UserScript==
// @name           Customsportspools.com Colorize Results
// @namespace      http://userscripts.org/users/31721
// @include        http://www.customsportspools.com/cgi-bin/ncaavieweresults.pl
// @include        http://www.customsportspools.com/cgi-bin/ncaaviewplayers.pl*
// ==/UserScript==


function Pick() {
   this.teamname = null;
   this.getTeamInt = function() {
      return stripNumber(this.teamname);
   }

   this.gamename = null;
   this.getGameInt = function() {
      return stripNumber(this.gamename);
   }

   this.domElement = null;

   this.setDomElement = function(domElement) {
      this.teamname = getFilenameFromPath(domElement.src);
      this.gamename = domElement.name;
      this.domElement = domElement;
   }
}

function getFilenameFromPath( wholeurl )
{
   return wholeurl.substring(wholeurl.lastIndexOf('/')+1) 
}

function stripNumber(str) {
   /* strip any continuous set of numbers out of a given string, 
    * and return it as a number */
   if (str == null) {
      return null;
   }
   str = String(str);
   str = str.replace(/,/g, ""); //goodbye comma
   str = str.match(/[\d,\.]+/); //grab any continuous number, comma, or decimal
   if (str)
      return Number(str[0]);
   else
      return null;
}

function getBracketArray(returntype) {

   /* returntype can be the following:
    * 'assoc' = return associative array
    * 'array' = return a more conventional array (numerically indexed)
    * 'DOM'   = return an array with references to each cell in the bracket 
    */

   var search_img = '//img[contains(@name, "game")]';
   var bracketdict = {};
   var bracketarr = [];

   /* Search through all tags with name = gameXX and get the image filename */
   allResults = document.evaluate(
      search_img,
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
   );

   for (var i = 0; i < allResults.snapshotLength; i++) {
      var thisResult = allResults.snapshotItem(i);
      var thisTeamFilename = getFilenameFromPath(thisResult.src);
      var thisGameText = thisResult.name;
      var thisGameInt = stripNumber(thisGameText);
      if (returntype == 'assoc') {
         bracketdict[thisGameText] = thisTeamFilename;  /* store an associative array -- but we probably won't use it */
      }
      else if (returntype == 'array') {
         bracketarr[thisGameInt] = thisTeamFilename;    /* store a more conventional array */
         bracketarr[0] = "blankteam.gif";               /* there is no game zero, so write one */
      }
      else if (returntype == 'DOM') {
         bracketarr[thisGameInt] = thisResult; 
         bracketarr[0] = null;
      }
   }

   if (returntype == 'assoc') {
      return bracketdict;
   }
   if ( (returntype == 'DOM') || (returntype == 'array') ) {
      return bracketarr;
   }
}

function storeResults(bracket) {
   GM_setValue('ncaa_results', uneval(bracket));
   GM_setValue('ncaa_results_date', uneval(new Date()) );
   console.log(bracket);       /* debugging */
   window.alert("Greasemonkey message: Results saved!");
}

function getStoredResults() {
   bracket = eval(GM_getValue('ncaa_results', '[]'));
   return bracket;
}

function getStoredResultsDate() {
   resultsdate = eval(GM_getValue('ncaa_results_date', 0));
   return resultsdate;
}

function checkStoredResultsDate(resultsdate) {
   var alertstr = '';
   var now = new Date();
   if (resultsdate == 0) {
      alertstr = "Greasemonkey message:\n\n"
      alertstr = "Your browser doesn't have any game results stored yet.\n\n";
      alertstr += "Please go to the 'View Results Entered' page, and I will automatically store the game results.\n";
      alertstr += "Then, when you view any user's picks, I will colorize them against the actual game results.";
      window.alert(alertstr);
   }
   else if ( (now-resultsdate) > 86400000 ) {
      alertstr =  "Greasemonkey message:\n\n";
      alertstr += "Your browser's stored game results are more than one day old.\n\n";
      alertstr += "Please visit the 'View Results Entered' page and I will update\n";
      alertstr += "your browser's internally stored game results.";
      window.alert(alertstr);
   }

}

function colorizeBracket(arrResultsBrkt, arrUserDomBrkt) {
   var badpicks = {};

   for (i in arrUserDomBrkt) {

       domUserPick = arrUserDomBrkt[i];

       if (domUserPick == null) {
          continue;
       }

       thisUserPick = new Pick();
       thisResult = new Pick();

       thisUserPick.setDomElement(domUserPick);

       /* get the result for this game number */
       thisResult.teamname = arrResultsBrkt[thisUserPick.getGameInt()];

       if (thisResult.teamname != 'blankteam.gif') {
          if (thisUserPick.teamname == thisResult.teamname) {
             thisUserPick.domElement.style.borderColor="green";
             thisUserPick.domElement.border = '2';
          }
          else {
             thisUserPick.domElement.style.borderColor="red";
             thisUserPick.domElement.border = '2';
             /* store the user's failed picks as:    */
             /* badpicks['team33.gif'] = 'game22'    */
             /* don't overwrite a lower game number so we can easily see how early this pick was wrong */
             if (    (badpicks[thisUserPick.teamname] == undefined)
                  || (thisUserPick.getGameInt() < stripNumber(badpicks[thisUserPick.teamname]))
                )
             {
                badpicks[thisUserPick.teamname] = thisUserPick.gamename;
             }
          }
       }
   }

   /* now mark our early bad picks yellow for the world to see */
   for (i in arrUserDomBrkt) {
       domUserPick = arrUserDomBrkt[i];

       if (domUserPick == null) {
          continue;
       }

       thisUserPick = new Pick();
       thisResult = new Pick();

       thisUserPick.setDomElement(domUserPick);

       /* get the result for this game number */
       thisResult.teamname = arrResultsBrkt[thisUserPick.getGameInt()];

       if (badpicks[thisUserPick.teamname] != undefined) {
          lostgamenumber = stripNumber(badpicks[thisUserPick.teamname]);
          if ( (lostgamenumber != null) && (thisUserPick.getGameInt() > lostgamenumber) ) {
             thisUserPick.domElement.style.borderColor = 'yellow';
             thisUserPick.domElement.border = '2';
          }
       }

   }
}

function findImpossibleWins() {
   var badpicks = {};
   clearYellowBoxes();
   arrColorDomBrkt = getBracketArray('DOM');  /* get the colorized bracket */
   for (i in arrColorDomBrkt) {
      domUserElement = arrColorDomBrkt[i];
      if (domUserElement == null) {
         continue;
      }
      thisUserPick = new Pick();
      thisUserPick.setDomElement(domUserElement);
      /* store the user's failed picks as:    */
      /* badpicks['team33.gif'] = 'game22'    */
      /* don't overwrite a lower game number so we can easily see how early this pick was wrong */
      if ((thisUserPick.domElement.border == '3') && (thisUserPick.domElement.style.borderColor == 'red')) {
         if (    (badpicks[thisUserPick.teamname] == undefined)
              || (thisUserPick.getGameInt() < stripNumber(badpicks[thisUserPick.teamname]))
            )
         {
            badpicks[thisUserPick.teamname] = thisUserPick.gamename;
         }
      }
   }
   for (i in arrColorDomBrkt) {
      domUserElement = arrColorDomBrkt[i];
      if (domUserElement == null) {
         continue;
      }
      thisUserPick = new Pick();
      thisUserPick.setDomElement(domUserElement);
      if (badpicks[thisUserPick.teamname] != undefined) {
         lostgamenumber = stripNumber(badpicks[thisUserPick.teamname]);
         if ( (lostgamenumber != null) && (thisUserPick.getGameInt() > lostgamenumber) ) {
            thisUserPick.domElement.style.borderColor = 'yellow';
            thisUserPick.domElement.border = '3';
         }
      }
   }
}

function clearYellowBoxes() {
   arrColorDomBrkt = getBracketArray('DOM');
   for (i in arrColorDomBrkt) {
      domUserElement = arrColorDomBrkt[i];
      if (domUserElement == null) {
         continue;
      }
      if ((domUserElement.style.borderColor == 'yellow') && (domUserElement.border == '3')) {
         domUserElement.style.borderColor = 'black';
         domUserElement.border = '1';
      }
   }
}

function getRoundFromGameNumber(gamenum) {
   var round = 0;

   if ((gamenum >= 1) && (gamenum <= 32))
      round = 1;
   else if ((gamenum >= 33) && (gamenum <= 48))
      round = 2;
   else if ((gamenum >= 49) && (gamenum <= 56))
      round = 3;
   else if ((gamenum >= 57) && (gamenum <= 60))
      round = 4;
   else if ((gamenum >= 61) && (gamenum <= 62))
      round = 5;
   else if (gamenum == 63)
      round = 6;

   return round;
}

function getSeedFromTeamNumber(teamnum) {
   /* The teams seem to be in numerical order.  Hopefully this does not change. */
   var gametoseed =     [0, 1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15,
                            1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15,
                            1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15,
                            1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15];

   return gametoseed[teamnum];
}

function getScoreFromRoundAndSeed(roundnum, seednum) {
   var score = 0;

   if ((roundnum == 1) || (roundnum == 2))
      score = seed;
   if (roundnum == 3)
      score = 8;
   if (roundnum == 4)
      score = 12;
   if (roundnum == 5)
      score = 16;
   if (roundnum == 6)
      score = 25;

   return score
}

function cycleColorsOnClick(domElement) {
   if ( (domElement.style.borderColor == 'black') || (domElement.style.borderColor == "") ) {
      domElement.style.borderColor = 'green';
      domElement.border = '3';
   }
   else if (domElement.style.borderColor == 'green') {
      domElement.style.borderColor = 'red';
      domElement.border = '3';
   }
   else if (domElement.style.borderColor == 'red') {
      domElement.style.borderColor = 'black';
      domElement.border = '1';
   }
   else {
      domElement.style.borderColor = 'green';
      domElement.border = '3';
   }
}


function addClickHandlers(arrDomBrkt) {
   for (var i = 0; i < arrDomBrkt.length; i++) {
      domElement = arrDomBrkt[i];
      if (domElement == null) {
         continue;
      }
      if (domElement.border != '2') {
         domElement.addEventListener('click', 
            function() {
               cycleColorsOnClick(this);
               findImpossibleWins();
               updateScorePanel(getUserBracketScore()[0], getUserBracketScore()[0]+getUserBracketScore()[1]);
            }, 
            true);
      }
   }
}

function updateScorePanel(currentscore, whatifscore) {
   var scorepanel = document.getElementById("scorepanel");
   var scorepaneltext = document.getElementById("scorepaneltext");
   var scorepanelbg = document.getElementById("scorepanelbg");

   var myhtml = "<center>This Bracket:<br>" +
                "Current Score: " + String(currentscore) + "<br>" +
                "\"What If\" Score: " + String (whatifscore) + "</center>";

   scorepaneltext.innerHTML = myhtml;

   /* the following is a hack in order to get opaque text on a translucent background */
   /* https://developer.mozilla.org/en/Useful_CSS_tips/Color_and_Background */
   var rect = scorepanel.getBoundingClientRect();
   scorepanelbg.style.width = rect.width;
   scorepanelbg.style.height = rect.height;
}

function getUserBracketScore(arrColorDomBrkt) {
   var round = 0;
   var score = 0;
   var whatifscore = 0;
   var tempscore = 0;

   for (i in arrUserDomBrkt) {
      domUserPick = arrUserDomBrkt[i];

      if (domUserPick == null) {
         continue;
      }

      thisUserPick = new Pick();
      thisUserPick.setDomElement(domUserPick);

      thisColor = thisUserPick.domElement.style.borderColor;
      thisBorder = thisUserPick.domElement.border;  /* use the border size to determine type of score */

      if (thisColor == 'green') {
         round = getRoundFromGameNumber(thisUserPick.getGameInt());
         seed = getSeedFromTeamNumber(thisUserPick.getTeamInt());
         tempscore = getScoreFromRoundAndSeed(round, seed);
         if (thisBorder == '2') {
            score += tempscore;
         }
         else if (thisBorder == '3') {
            whatifscore += tempscore;
         }
      }
   }

   return [score, whatifscore];
}

function updateCSS() {
   /* I need all of these styles to get opaque text on a translucent background */
   var scorepanelCSS = '#scorepanel {' +
                       'position: fixed; border:1px solid #6374AB; ' +
                       'left:5px; top:5px; padding:1em; z-index:0; '+
                       '}';

   var scorepanelbgCSS = '#scorepanelbg {' +
                         'position: fixed; border: 1px; ' +
                         'left:5px; top:5px; z-index: -1; ' +
                         'background-color: yellow; ' +
                         'opacity:0.5; ' +
                         '}';

   var scorepaneltextCSS = '#scorepaneltext {' +
                           'background-color: transparent; ' +
                           'z-index: 5;' +
                           '}';

   GM_addStyle(scorepanelCSS);
   GM_addStyle(scorepanelbgCSS);
   GM_addStyle(scorepaneltextCSS);
}

function createScorePanel() {
   /* I need three divs in order to get opaque text on a translucent background */
   /* https://developer.mozilla.org/en/Useful_CSS_tips/Color_and_Background */

   var scorepaneldiv = document.createElement('div');
   var scoretextdiv = document.createElement('div');
   var scorepanelbgdiv = document.createElement('div');

   scoretextdiv.id = 'scorepaneltext';
   scorepaneldiv.id = 'scorepanel';
   scorepanelbgdiv.id = 'scorepanelbg';

   scorepaneldiv.appendChild(scorepanelbgdiv);
   scorepaneldiv.appendChild(scoretextdiv);

   document.firstChild.appendChild(scorepaneldiv);
}

function main() {
   var arrResultsBrkt;

   if (document.URL == "http://www.customsportspools.com/cgi-bin/ncaavieweresults.pl") {
      arrResultsBrkt = getBracketArray('array');
      if (arrResultsBrkt) {
         storeResults(arrResultsBrkt);
      }
   }
   else {
      updateCSS();

      arrResultsBrkt = getStoredResults();
      resultsdate = getStoredResultsDate();
      checkStoredResultsDate(resultsdate);

      arrUserDomBrkt = getBracketArray('DOM');
      colorizeBracket(arrResultsBrkt, arrUserDomBrkt);

      arrColorDomBrkt = getBracketArray('DOM');  /* get the colorized bracket */

      addClickHandlers(arrColorDomBrkt);  /* add the click handlers */

      createScorePanel();                 /* create the score panel */
      updateScorePanel(getUserBracketScore()[0], getUserBracketScore()[0]+getUserBracketScore()[1]);

      //console.log('retrieved results: ', arrResultsBrkt);
      //console.log('user results: ', arrUserDomBrkt);
   }
}

main();
