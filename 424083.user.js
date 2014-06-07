// ==UserScript==
// @name          USO Author Stats
// @namespace     erosman
// @description   Shows new Reviews, Posts, Fans, Installs
// @updateURL     https://userscripts.org/scripts/source/424083.meta.js
// @downloadURL   https://userscripts.org/scripts/source/424083.user.js
// @include       http://userscripts.org/home/scripts
// @include       http://userscripts.org/home/scripts?*
// @grant         GM_setValue
// @grant         GM_getValue
// @author        erosman
// @version       1.6
// ==/UserScript==

/* --------- Note ---------
  This script shows new Posts, Fans, Installs for Author's script.
  Inspired by the idea of:
  US.o script author helper (http://userscripts.org/scripts/show/36353)
  Userscripts.org - show new comments and installs (http://userscripts.org/scripts/show/8037)


  --------- History ---------


  1.6 Added highlight for the scripts with changed stats
  1.5 Code & Style Improvement
  1.4 Code Improvement + Added direct Links to changed Posts, Fans
      + Added separete colours for Plus and Minus values
  1.3 Added separated Plus & Minus totals to the header (re: http://userscripts.org/topics/210621)
  1.2 Added notification on the Table Header
  1.1 Added Reviews + Added Installs
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
var revPlus = 0, revMinus = 0;
var posPlus = 0, posMinus = 0;
var fanPlus = 0, fanMinus = 0;
var insPlus = 0, insMinus = 0;


// temaplates
var a = document.createElement('a');
a.setAttribute('style', 'vertical-align: super; text-decoration: none;');
var span = document.createElement('span');
span.setAttribute('style', 'vertical-align: super;');


var tr = document.querySelectorAll('[id^="scripts-"]');
if (!tr[0]) { return; }  // end execution if not found

for (var i = 0, len = tr.length; i < len; i++) {

  var sID = tr[i].id;
  var nID = sID.replace('scripts-', '');

  // children[2] reviews | children[3] posts | children[4] fans | children[5] installs

  var reviews = tr[i].children[2].querySelector('a');
  reviews = reviews ? parseInt(reviews.textContent, 10) : 0;

  var posts = parseInt(tr[i].children[3].textContent, 10);
  var fans = parseInt(tr[i].children[4].textContent, 10);
  var installs = parseInt(tr[i].children[5].textContent, 10);

  // compare value with the previus time
   if (stats[sID]) {

    var n = reviews - (stats[sID].reviews || 0);
    if (n) { addStat(n, tr[i].children[2]); (n > 0 ? revPlus += n : revMinus += n); }

    var n =  posts - (stats[sID].posts || 0);
    if (n) { addStat(n, tr[i].children[3], '/scripts/discuss/' + nID); (n > 0 ? posPlus += n : posMinus += n); }

    var n = fans - (stats[sID].fans || 0);
    if (n) { addStat(n, tr[i].children[4], '/scripts/fans/' + nID); (n > 0 ? fanPlus += n : fanMinus += n); }

    var n =  installs - (stats[sID].installs || 0);
    if (n) { addStat(n, tr[i].children[5]); (n > 0 ? insPlus += n : insMinus += n); }
    
  }

  // prepare the data for the next time
  stats[sID] = {
    'reviews': reviews,
    'posts': posts,
    'fans': fans,
    'installs': installs,
  };

}


// update the data for the next time
GM_setValue('stats', JSON.stringify(stats));


// the header notice
if ( revPlus + posPlus + fanPlus + insPlus === 0 &&
      revMinus + posMinus + fanMinus + insMinus === 0) { return; }  // end execution if not found

var th = tr[0].parentNode.children[0];

if (revPlus || revMinus) { addTotal(revPlus, revMinus, th.children[2]); }
if (posPlus || posMinus) { addTotal(posPlus, posMinus, th.children[3]); }
if (fanPlus || fanMinus) { addTotal(fanPlus, fanMinus, th.children[4]); }
if (insPlus || insMinus) { addTotal(insPlus, insMinus, th.children[5]); }


function addStat(n, node, uri) {

  if (uri) {
    var elem = a.cloneNode(false);
    elem.href = uri;
  }
  else {
    var elem = span.cloneNode(false);
  }

  elem.style.color = (n > 0 ? '#080' : '#f00');
  elem.textContent = (n > 0 ? '+' : '') + n;

  node.appendChild(elem);
  node.parentNode.children[0].style.backgroundColor = '#ffe4e1';
}


function addTotal(plus, minus, node) {

  var sp = span.cloneNode(false);
  sp.setAttribute('style', 'display: block;'); // also reset previously set style

  if (plus) { sp.appendChild(mkSpan(plus)); }
  if (minus) { sp.appendChild(mkSpan(minus)); }

  node.appendChild(sp);
}


function mkSpan(n) {

  var elem = span.cloneNode(false);
  elem.setAttribute('style', n > 0 ?  'color: #7cfc00; margin-right: 5px;' : 'color: #ffd700;');
  elem.textContent = (n > 0 ? '+' : '') + n;
  return elem;
}


})(); // end of anonymous function