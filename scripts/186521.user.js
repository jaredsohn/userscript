// ==UserScript==
// @name          IMDB Add Age
// @namespace     erosman
// @description   Adds Age of the Person after their Date of Birth on IMDB
// @updateURL     https://userscripts.org/scripts/source/186521.meta.js
// @downloadURL   https://userscripts.org/scripts/source/186521.user.js
// @include       http://www.imdb.com/name/nm*
// @grant         none
// @author        erosman
// @version       1.2
// ==/UserScript==

/* --------- Note ---------
  This script adds Age of the Person after their Date of Birth on IMDB pages
  For example:
  Born: Scarlett Ingrid Johansson
  November 22, 1984 (age 29) in New York City, New York, USA



  --------- History ---------

  1.2 Added processing of 'full bio' page
  1.1 Check if there is a Date of Death
  1.0 Initial release

*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

switch (true) {

  case document.URL.indexOf('bio') !== -1: // full bio page

    // check for death_date
    var death_date = document.querySelector('#overviewTable a[href*=death_date]');
    if (death_date) { return; } // end execution if deceased

    var birth_year = document.querySelector('#overviewTable a[href*=birth_year]');
    var birth_monthday = document.querySelector('#overviewTable a[href*=birth_monthday]');
    if (!birth_year || !birth_monthday) { return; } // end execution if not found
    
    var dob =
      (birth_year.href.match(/birth_year=([^&]+)/)[1] + '-' +
      birth_monthday.href.match(/birth_monthday=([^&]+)/)[1]).split('-');
    var node = birth_year;
    break;

  default:  // for the main page
    var elem = document.getElementsByTagName('time');

    // <time datetime="1948-11-27" itemprop="birthDate">
    // <time datetime="2013-12-31" itemprop="deathDate">
    if (!elem[0] || elem[1]) { return; } // end execution if not found OR if deceased

    var dob = elem[0].getAttribute('datetime').split('-');
    var node = elem[0];
}

if (!dob[0]) { return; } // end execution if not found

// year,month,day
var age = getAge(dob[0],dob[1],dob[2]);

if (age) {
  // insert the age
  var newElement = document.createElement('span');
  newElement.setAttribute('style', 'color: #777;');
  newElement.textContent = ' (age ' + age + ')';
  node.parentNode.insertBefore(newElement, node.nextSibling);
}

function getAge(year,month,day) {

    var today = new Date();
    var age = today.getFullYear() - year;
    var m = today.getMonth()+1 - month;
    if (m < 0 || (m === 0 && today.getDate() < day)) {
      age--;
    }
    return age;
}

})(); // end of anonymous function