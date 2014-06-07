// RHP Forums
//
// Purpose: Marks threads with new posts.
//
// Revision History:
//
// 2005-SEP-04  ouroboros  Initial revision.
//
// ==UserScript==
// @name          RHP Forums
// @namespace     http://members.shaw.ca/ouroboros/RHP/
// @description   Marks threads with new posts.
// @include       http://www.redhotpawn.com/board/threadlist.php*
// @include       http://www.chessatwork.com/board/threadlist.php*
// @include       http://www.timeforchess.com/board/threadlist.php*
// @include       http://www.redhotchess.com/board/threadlist.php*
// @include       http://www.redhotpawn.com/board/showthread.php*
// @include       http://www.chessatwork.com/board/showthread.php*
// @include       http://www.timeforchess.com/board/showthread.php*
// @include       http://www.redhotchess.com/board/showthread.php*
// ==/UserScript==

if (!GM_getValue || !GM_setValue) {
   alert('Please upgrade to the latest version of Greasemonkey.');
   return false;
}

var months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                       'Sep', 'Oct', 'Nov', 'Dec');

var uri = String(document.location);

if (uri.indexOf('threadlist.php') != -1) {
   showNew();
}
else if (uri.indexOf('showthread.php') != -1) {
   markRead();
}

function getMonth(month_name) {
   var month;

   for (month = 0 ; month < months.length ; month++) {
      if (months[month] == month_name) {
         break;
      }
   }

   return month;
}

function markRead() {
   var posts = document.evaluate(
      "//div[@class='postdate']",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);

   if (posts.snapshotLength > 0) {
      var post = posts.snapshotItem(posts.snapshotLength - 1);
      var date = post.innerHTML;
      date = date.replace(/\s*<.+>\s*/, '');
      date = date.replace(/\s+::.+/, '');

      var date_comp = date.match(/(\d{2})\s+(\S{3})\s+\'(\d{2})\s+(\d{2})\:(\d{2})/);
      var post_date = new Date(Number(date_comp[3]) + 2000,
                               getMonth(date_comp[2]),
                               date_comp[1], date_comp[4], date_comp[5]);

      var j = uri.match(/threadid=(\d+)/);
      threadid = j[1];

      GM_setValue(threadid, String(Number(post_date)));
   }

   return true;
}

function showNew() {
   var posts = document.evaluate(
      "//a[starts-with(@href, 'showthread.php?threadid')]",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
   
   for (var i = 0 ; i < posts.snapshotLength ; i += 2) {
      var topic = posts.snapshotItem(i);
   
      var post = posts.snapshotItem(i + 1);
      var date = post.innerHTML;
      date = date.replace(/\s*<.+>\s*/, '');
   
      var date_comp = date.match(/(\d{2})\s+(\S{3})\s+\'(\d{2})\s+(\d{2})\:(\d{2})/);
      var last_post = new Date(Number(date_comp[3]) + 2000,
                               getMonth(date_comp[2]),
                               date_comp[1], date_comp[4], date_comp[5]);

      var j = post.getAttribute('href').match(/threadid=(\d+)/);
      threadid = j[1];
   
      var last_read = Number(GM_getValue(threadid, 0));

      if (last_read == 0 || Number(last_post) > last_read) {
         topic.innerHTML = '<strong>' + topic.innerHTML + '</strong>';
         post.innerHTML = '<strong>' + post.innerHTML + '</strong>';
      }
   }

   return true;
}
