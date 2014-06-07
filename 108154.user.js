// ==UserScript==
// @name           A Living Universe: Dynamic Timer
// @namespace      http://www.crewstopia.com
// @description    A Living Universe: Replaces the static "Next Turn" message with a dynamic countdown timer.
// @include        http://www.alivinguniverse.com/*
// @copyright      Douglas Crews
// @version        1.0
// @license
// ==/UserScript==

var timeout = -99;
var tdTimer;

// Find the table data element containing the "Next Turn" message.
var allTDs = document.getElementsByTagName('TD');
for (var ii = 0; ii < allTDs.length; ii++)
{
   var td = allTDs[ii];
   var ndx = td.innerHTML.indexOf('Next Turn in: ');
   if (ndx != -1)
   {
      tdTimer = allTDs[ii];
      var time = tdTimer.innerHTML.substr(ndx + 14);
      if (time.indexOf('-') != -1)
      {
         // Already past due; do nothing
      }
      else if (time.indexOf(':') != -1)
      {
         // Displayed as 1:23
         var minutes = time.substr(time.indexOf(':') - 1, 1);
         var seconds = time.substr(time.indexOf(':') + 1, 2);
         timeout = parseInt(minutes) * 60 + parseInt(seconds);
      }
      else if (time.indexOf('s') != -1)
      {
         // Displayed as "12s"
         var seconds = time.substr(0, time.indexOf('s'));
         timeout = parseInt(seconds);
      }
   }
   if (timeout != -99) break; // Found it, no need to continue looking.
}

// Countdown function
function countDown()
{
   if (timeout != -99)
   {
      var ndx = tdTimer.innerHTML.indexOf('Next Turn in: ');
      var minus = (timeout < 0 ? '-' : '');
      var minutes = Math.floor(Math.abs(timeout) / 60);
      var seconds = Math.abs(timeout % 60);
      var timerHTML;
      if (timeout > 0)
      {
         timerHTML = minus + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      }
      else
      {
         timerHTML = '-:--';
      }
      tdTimer.innerHTML = tdTimer.innerHTML.substr(0, ndx + 14) + timerHTML;
      document.title = 'ALU ' + timerHTML + ' ' + document.title.substr(document.title.lastIndexOf('-'));
      timeout--;
      if (timeout >= 0) setTimeout(countDown, 1000);
   }
   return true;
};

// Start the countdown
window.setTimeout(function() { countDown() }, 1000);
