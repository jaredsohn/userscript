// ==UserScript==
// @name          Wikipedia Modified Warning
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Shows a warning if an English Wikipedia page has been modified within the last X minutes (default is 5).
// @include       http://en.wikipedia.org/wiki/*
// ==/UserScript==

/*

Info
----

You can set a different threshold by using the "Change Wikipedia Modified Warning threshold" user script command.

IMPORTANT NOTE: You may have to change your Wikipedia date/time preferences. Set Date format to No preference and fill the time zone in from the browser.

(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2006-12-04 - Created

*/

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var threshold = GM_getValue('threshold', 5);

var viewed = new Date;

var messageBox;
function doIt() {
  if(messageBox) {
    messageBox.parentNode.removeChild(messageBox);
  }
  var m = document.getElementById('footer-info-lastmod').textContent.match(/(\d+) (\w+) (\d+) at (\d+):(\d+)/);
  var day = m[1];
  var month = MONTHS.indexOf(m[2]);
  var year = m[3];
  var hour = m[4];
  var minute = m[5];
  var modified = new Date(year, month, day, hour, minute);
  if(viewed - modified < threshold * 60000) {
    messageBox = document.createElement('div');
    with(messageBox.style) {
      background = '#cfc';
      border = '1px solid #9c9';
      margin = '0.5em auto';
      padding = '0.5em';
      textAlign = 'center';
    }
    messageBox.appendChild(document.createTextNode('This page has been modified within the last ' + threshold + ' minutes.'));
    var insertBeforeMe = document.getElementById('firstHeading');
    insertBeforeMe.parentNode.insertBefore(messageBox, insertBeforeMe);
  }
}

doIt();

GM_registerMenuCommand('Change Wikipedia Modified Warning threshold', function() {
  var value = prompt('Warn about Wikipedia pages modified within how many minutes of viewing?', threshold);
  if(value == null) {
    // cancelled
  } else {
    threshold = parseInt(value);
    if(value >= 1) {
      GM_setValue('threshold', threshold);
      doIt();
    } else {
      alert('Choose at least 1 minute.');
    }
  }
});

