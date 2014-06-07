// ==UserScript==
// @name        Auto-refresh Page
// @namespace   http://leftbraintinkering.blogspot.com/
// @include     http://football.fantasysports.yahoo.com/
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

var REFRESH_TIME_MIN = 5;
var MIN2MS = (60*1000);
var REFRESH_TIME_MS = REFRESH_TIME_MIN * MIN2MS;
var TIMER = 0;


function updateCSS() {
      /* I need all of these styles to get opaque text on a translucent background */
   var summarypanelCSS = '#summarypanel { ' +
                       'position: fixed; ' +
                       'left:5px; top:5px; padding:1em; z-index: 0; '+
                       '-moz-box-shadow: 0 0 8px yellow; ' +
                       '-webkit-box-shadow: 0 0 8px yellow; ' +
                       'box-shadow: 0px 0px 8px yellow; ' +
                       '}';

   var summarypanelbgCSS = '#summarypanelbg { ' +
                         'position: fixed; ' +
                         'left:5px; top:5px; z-index: -1; ' +
                         'background-color: yellow; ' +
                         'opacity:0.7; ' +
                         '}';

   var summarypaneltextCSS = '#summarypaneltext { ' +
                           'background-color: transparent; ' +
                           'font-color: black !important; ' +
                           'z-index: 5; ' +
                           '}';

   GM_addStyle(summarypanelCSS);
   GM_addStyle(summarypanelbgCSS);
   GM_addStyle(summarypaneltextCSS);
}

function insertSummaryPanel() {
   /* I need three divs in order to get opaque text on a translucent background */
   /* https://developer.mozilla.org/en/Useful_CSS_tips/Color_and_Background */

   var summarypaneldiv = document.createElement('div');
   var summarytextdiv = document.createElement('div');
   var summarypanelbgdiv = document.createElement('div');

   summarytextdiv.id = 'summarypaneltext';
   summarypaneldiv.id = 'summarypanel';
   summarypanelbgdiv.id = 'summarypanelbg';

   summarypaneldiv.appendChild(summarypanelbgdiv);
   summarypaneldiv.appendChild(summarytextdiv);

   document.body.appendChild(summarypaneldiv);
}

function updateSummaryPanel(timeonly) {
   var summarypanel = document.getElementById("summarypanel");
   var summarypaneltext = document.getElementById("summarypaneltext");
   var summarypanelbg = document.getElementById("summarypanelbg");

   var myhtml = "<center>Reload in:<br>" +
                String(TIMER/1000) + " sec</center>";

   summarypaneltext.innerHTML = myhtml;

   /* the following is a hack in order to get 
    * opaque text on a translucent background */
   /* https://developer.mozilla.org/en/Useful_CSS_tips/Color_and_Background */
   var rect = summarypanel.getBoundingClientRect();
   console.log(summarypanelbg);
//   summarypanelbg.style.setAttribute('width', rect.width);
//   summarypanelbg.style.setAttribute('height', rect.height);
   summarypanelbg.style.width = String(rect.width) + 'px';
   summarypanelbg.style.height = String(rect.height) + 'px';
}

function updateThis() {
   TIMER -= 1000;

   if (TIMER <= 0) {
      TIMER = REFRESH_TIME_MS;
      location.reload(true);
   }

   updateSummaryPanel();
}

function main() {
   /* update document CSS */
   updateCSS();

   /* insert summary panel */
   insertSummaryPanel();
   updateSummaryPanel();

   /* kick off the timer */
   TIMER = REFRESH_TIME_MS;
   setInterval(updateThis, 1000); 
}

main();
