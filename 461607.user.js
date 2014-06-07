// ==UserScript==
// @name          SubScene Stats
// @namespace     erosman
// @description   Shows new Comments, Ratings, Downloads
// @updateURL     https://userscripts.org/scripts/source/461607.meta.js
// @downloadURL   https://userscripts.org/scripts/source/461607.user.js
// @include       http://subscene.com/u/*/subtitles*
// @grant         GM_setValue
// @grant         GM_getValue
// @author        erosman
// @version       1.2
// ==/UserScript==


/* --------- Note ---------
  This script shows new Comments, Ratings, Downloads for the user.


  --------- History ---------

  1.2 Added highlight for the entries with changed stats
  1.1 Code & Style Improvement
  1.0 Initial release

*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict'; // ECMAScript-5

if (frameElement) { return; } // end execution if in a frame, object or other embedding points

// check if stats was set previous, otherwise set it
try { var stats = JSON.parse(GM_getValue('stats')); }
catch (e) { // malformed data
  var stats = {};
}


// variables for the totals
var comPlus = 0, comMinus = 0;
var ratPlus = 0, ratMinus = 0;
var dlsPlus = 0, dlsMinus = 0;


// temaplates
var span = document.createElement('span');
span.setAttribute('style', 'color: #080;'); // style for the notice


var tr = document.querySelectorAll('tbody tr');
if (!tr[0]) { return; } // end execution if not found

for (var i = 0, len = tr.length; i < len; i++) {

  var sID = tr[i].children[0].children[0];
  if (sID.nodeName !== 'A') { continue; } // go to next one if not found

  sID = sID.pathname.match(/\d+$/);
  sID = sID ? sID[0] : 0;
  if (!sID) { continue; } // go to next one if not found

  // children[0] Language/title | children[3] Comments | children[4] Ratings | children[5] Downloads

  var comments  = parseInt(tr[i].children[3].textContent, 10);
  var ratings = parseInt(tr[i].children[4].textContent, 10);
  var downloads = parseInt(tr[i].children[5].textContent, 10);


  // compare value with the previus time
   if (stats[sID]) {

    var n = comments - (stats[sID].comments || 0);
    if (n) { addStat(n, 0, tr[i].children[3]);  (n > 0 ? comPlus += n : comMinus += n); }

    var n = ratings - (stats[sID].ratings || 0);
    if (n) { addStat(n, 0, tr[i].children[4]); (n > 0 ? ratPlus += n : ratMinus += n); }

    var n = downloads - (stats[sID].downloads || 0);
    if (n) { addStat(n, 0, tr[i].children[5]); (n > 0 ? dlsPlus += n : dlsMinus += n); }
  }

  // prepare the data for the next time
  stats[sID] = {
    'comments': comments,
    'ratings': ratings,
    'downloads': downloads,
  };

}


// update the data for the next time
GM_setValue('stats', JSON.stringify(stats));


// the header notice
if ( comPlus + ratPlus + dlsPlus === 0 &&
      comMinus + ratMinus + dlsMinus === 0) { return; } // end execution if not found

var th = tr[0].parentNode.parentNode.children[0].children[0];
span.setAttribute('style', 'color: #f0f8ff; display: block;'); // new style for the table header notice

if (comPlus || comMinus) { addStat(comPlus, comMinus, th.children[3]); }
if (ratPlus || ratMinus) { addStat(ratPlus, ratMinus, th.children[4]); }
if (dlsPlus || dlsMinus) { addStat(dlsPlus, dlsMinus, th.children[5]); }


function addStat(plus, minus, node) {

  var elem = span.cloneNode(false);
  elem.textContent = 
        (plus ? (plus > 0 ? '+' : '') + plus : '') +
        (plus && minus ? '\u00a0' : '') +
        (minus ? minus : '');
  node.appendChild(elem);
  if (!th) {      // if not the header
    node.parentNode.children[0].children[0].style.color = '#f00';
  }
}


})(); // end of anonymous function