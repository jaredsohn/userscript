// ==UserScript==
// @name          Hulu - Queue On The History Page
// @namespace     http://www.mystady.com
// @description	  Fell asleep in front of Hulu again? Not a problem, just requeue your videos from the history page.
// @include       http://*.hulu.com/profile/history*

// @copyright     2009+, Alain-Christian (http://www.mystady.com)
// @license       DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE Version 2; http://sam.zoy.org/wtfpl/COPYING
// @version       1.6.0
// @require       http://updater.usotools.co.cc/55735.js?interval=7&update=update
// ==/UserScript==
//
// Ran the code through http://jsbeautifier.org/


// Detect Firefox 3.5
if ((navigator.userAgent.indexOf('Firefox') != -1) && (navigator.userAgent.indexOf('3.5') != -1)) {

  // Changes 'Delete' to 'Undo' in the table header
  var MS_Delete2Undo = document.getElementsByClassName('rh-c4')[0];
  MS_Delete2Undo.innerHTML = 'Undo';

  // Changes the Delete buttons to Queue buttons
  var MS_OldDog = document.getElementsByClassName('c4');
  for (var i = 0; i < MS_OldDog.length; i++) {
    var MS_NewTricks = MS_OldDog[i];
    MS_NewTricks.innerHTML = MS_NewTricks.innerHTML.replace(/<a href="#" onclick="new Ajax\.Request\('\/profile\/remove_from_list\/(.*)\?type=(.*)/g, '<a href="#" onclick="VideoExpander.addToPlaylist(this, $1);return false"><img alt="Queue this video" id="queue_img_$1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACVBMVEUAAAB4%2BADw8PAAkx2BAAAAIUlEQVQY02NgIAasWrWKITSUECOUMCMUBPAzwErpxCAMAHY0LSkoMWgOAAAAAElFTkSuQmCC" title="Queue this video" border="0"></a>');
  }
} else {
  // Implementation on non-Firefox 3.5 browsers

  // Changes 'Delete' to 'Undo' in the table header
  var MS_Delete2Undo = document.evaluate("//td[@class='rh-c4']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  MS_Delete2Undo.innerHTML = 'Undo';

  // Changes the Delete buttons to Queue buttons
  var MS_OldDog = document.evaluate("//td[@class='c4']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = MS_OldDog.snapshotLength - 1; i >= 0; i--) {
    var MS_NewTricks = MS_OldDog.snapshotItem(i);
    MS_NewTricks.innerHTML = MS_NewTricks.innerHTML.replace(/<a href="#" onclick="new Ajax\.Request\('\/profile\/remove_from_list\/(.*)\?type=(.*)/g, '<a href="#" onclick="VideoExpander.addToPlaylist(this, $1);return false"><img alt="Queue this video" id="queue_img_$1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACVBMVEUAAAB4%2BADw8PAAkx2BAAAAIUlEQVQY02NgIAasWrWKITSUECOUMCMUBPAzwErpxCAMAHY0LSkoMWgOAAAAAElFTkSuQmCC" title="Queue this video" border="0"></a>');
  }
}
