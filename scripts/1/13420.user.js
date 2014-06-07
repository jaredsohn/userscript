// ==UserScript==
// @name           Twitter Time Updater
// @namespace      tag:domnit.org,2006-04:gmscripts
// @description    Keep the elapsed time indicators current
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

/*

(C) 2007 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2007-10-28 - First working version

*/

setInterval(function() {
  var now = new Date();
  var result = document.evaluate('//abbr[@class="published"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var c = 0, item; item = result.snapshotItem(c); c++) {
    var m = item.title.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\+00:00$/);
    earlier = new Date();
    earlier.setUTCFullYear(m[1]);
    earlier.setUTCMonth(m[2] - 1);
    earlier.setUTCDate(m[3]);
    earlier.setUTCHours(m[4]);
    earlier.setUTCMinutes(m[5]);
    earlier.setUTCSeconds(m[6]);
    var diff = (now - earlier) / 1000;
    if(diff < 86400) {
      var hours = Math.floor(diff / 3600);
      var minutes = Math.floor(diff / 60 % 60);
      var seconds = Math.floor(diff % 60);
      if(!hours) {
        if(!minutes) {
          if(seconds < 5) {
            item.innerHTML = 'less than 5 seconds';
          } else if(seconds < 10) {
            item.innerHTML = 'less than 10 seconds';
          } else if(seconds < 20) {
            item.innerHTML = 'less than 20 seconds';
          } else if(seconds < 40) {
            item.innerHTML = 'half a minute';
          } else {
            item.innerHTML = 'less than a minute';
          }
        } else {
          if(minutes == 1) {
            item.innerHTML = '1 minute';
          } else {
            item.innerHTML = minutes + ' minutes';
          }
        }
      } else {
        var nearestHour = Math.round(hours + minutes / 60);
        if(nearestHour == 1) {
          item.innerHTML = 'about 1 hour';
        } else {
          item.innerHTML = 'about ' + nearestHour + ' hours';
        }
      }
    } else {
      item.innerHTML = earlier.toLocaleFormat('%I:%M %p %B %d, %Y');
    }
  }
}, 5000);