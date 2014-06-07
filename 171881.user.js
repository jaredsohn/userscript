// ==UserScript==
// @name          IMDB Weekly Average
// @namespace     erosman
// @description   Weekly Average Box Office takings to the IMDB US Box Office page
// @updateURL     https://userscripts.org/scripts/source/171881.meta.js
// @downloadURL   https://userscripts.org/scripts/source/171881.user.js
// @include       http://*.imdb.com/chart/*
// @include       https://*.imdb.com/chart/*
// @grant         none
// @author        erosman
// @version       1.9
// ==/UserScript==


/* --------- Note ---------
  The scripts adds Weekly Average Box Office takings to the IMDB US Box Office page.
  v1.4 also produces a table sorted according to the Weekly Average.
  At the moment runs on: Chart/US Box Office


  --------- History ---------

  1.9 Code Improvement, replaced Xpath
  1.8 Layout Improvement
  1.7.1 Minor bugfix
  1.7 Fixed for New IMDB Chart layout 2013-12-21
  1.6 Code Improvement if films have equal averages
  1.5 Style Change: Color Coding gradual from black to red
  1.4 Added Sorted list according to Weekly Average to the bottom of the Table
      + New Color Coding
  1.3 Added Color Coding based on Weekly Average + Code improvement
  1.2.1 Added the omitted script number
  1.2 Code Improvement
  1.1 Removed .0 from the Weekly Average
  1.0 Initial release

*/


(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

var table = document.getElementsByClassName('chart');
if (!table[0]) { return; } // end execution if not found

var elem = table[0].getElementsByTagName('tr');
if (!elem[0]) { return; } // end execution if not found

var cache = {};

// starting from the 2nd tr
for (var i = 1, len = elem.length; i < len; i++) {
  var thisItem = elem[i];

  //  children[0] pic | [1] name | [2] weekend | [3] gross | [4] weeks

  var gross = thisItem.children[3].textContent.match(/\$([\d.]+)M/);
  var weeks = thisItem.children[4].textContent.match(/\d+/);
  var ave = (parseFloat(gross[1])/parseInt(weeks, 10)).toFixed(1);

  ave = (ave.substr(-1) == 0) ? parseInt(ave, 10) : ave; // remove .0

  // removing the number from the movie name
  var movie = thisItem.children[1].textContent.replace(/^\d+\./,'').trim();

  // caching name + ave for later
  // prepare for when films have equal averages
  
  if (cache[ave]) {
    cache[ave][0] += '<br />' + movie;
    cache[ave][1] += '<br />' + weeks;
  }
  else {
    cache[ave] = [movie, weeks];
  }

  // add the text
  var n = getColor(ave);
  thisItem.children[1].innerHTML += '<p style="font-size: 0.8em;">Weekly Average: ' +
  (n ? '<span style="color: ' + n + ';">$' + ave + 'm</span>' : '$' + ave + 'm') + '</p>';
}


// empty DocumentFragment object as a temporary container for the elements
var docfrag = document.createDocumentFragment();

// clone 1st tr, remove one cell and extend another cell to 2
var trHead = elem[0].cloneNode(true);

trHead.removeChild(trHead.children[2]);
trHead.children[0].textContent = 'Rank';
trHead.children[1].colSpan = 2;
trHead.children[1].textContent = 'Weekly Average';
trHead.children[1].setAttribute('style', 'text-align: right; padding-right: 5px;');

// clone 2d tr, remove one cell and extend another cell to 2 & remove content to use as a blank template
var tr = elem[1].cloneNode(true);

tr.className = '';
tr.removeChild(tr.children[2]);
tr.children[1].colSpan = 2;
tr.children[1].setAttribute('style', 'height: 15px; padding-right: 5px;');

for (var n = 0, len = tr.children.length; n < len; n++) {
  tr.children[n].innerHTML = '&nbsp;';
}

// clone above as a spacer & insert in DocumentFragment
docfrag.appendChild(tr.cloneNode(true));

// insert the header tr in  DocumentFragment
docfrag.appendChild(trHead);


// sort cache
var keys = Object.keys(cache);
keys.sort(function(a, b) { return b-a; });

for (var i = 0, len = keys.length; i < len ; i++) {

  var thisTR = tr.cloneNode(true);
  thisTR.className = (i%2 ? 'odd' : 'even');

  var c = getColor(keys[i]);
  if (c) {
    thisTR.children[2].style.color = c;
  }

  thisTR.children[0].textContent = i+1;
  thisTR.children[1].innerHTML = cache[keys[i]][0];
  thisTR.children[2].textContent = '$' + keys[i] + 'm';
  thisTR.children[3].innerHTML = cache[keys[i]][1];

  docfrag.appendChild(thisTR);
}

// insert the DocumentFragment into the document
elem[1].parentNode.appendChild(docfrag);


function getColor(n) {

  var c = 0;
  switch (true) {
    case n >= 100:
      c = '#f00';  // red
      break;
    case n >=  15:
      c = '#' + Math.round(n*0.15).toString(16) + '00';  // gradual black to red
      break;
  }

  return c;
}

})(); // end of anonymous function
