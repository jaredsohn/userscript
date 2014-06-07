// ==UserScript==
// @name          narcisolator
// @namespace     http://justoneminute.typepad.com/
// @description   blocks out annoying troll posts, and clean up others; now hides the colorful avatars too
// @include       http://justoneminute.typepad.com/*
// @version       1.0
// ==/UserScript==

/*
 * narcisolator
 * Author: Mittineague <N/A> (N/A) http://www.mittineague.com
 * JOM changes by bgates
 */

(function(){

  /* add known trolls beneath the following array
   * names added here will be filtered from all threads
   * names must be removed from array to see posts again
   * Names are Case sensitive
   */
  var knownTrolls = new Array();

  var dataItems, thisDataItem, userName;
  var newItems, thisNewItem;

  dataItems = document.evaluate("//p[@class='comment-footer']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  function stopScreaming(wholeMatch, firstMatch, screaming) {
    return firstMatch + screaming.toLowerCase();
  }
  for (var i = 0; i < dataItems.snapshotLength; i++) {
    thisDataItem = dataItems.snapshotItem(i);
    userName = thisDataItem.innerHTML;
    for (var m = 0; m < knownTrolls.length; m++) { 
      if ( userName.search(knownTrolls[m]) != -1 ) {
        var replacement = document.createElement('p');
        var upperNode = thisDataItem.parentNode; // P
	  upperNode.parentNode.replaceChild(replacement, upperNode);
	}
    }
    if (userName.search('narciso') !=-1) {
      var div = thisDataItem.parentNode;
      div.innerHTML = div.innerHTML.replace(/<br>/gi,'');
      div.innerHTML = div.innerHTML.replace(/;/gi,',');
    }
    if (userName.search('gus') !=-1) {
      var div = thisDataItem.parentNode;
      div.innerHTML = div.innerHTML.replace(/([A-Z])([A-Z]+)/g,stopScreaming);
    }
    userName = "";
    
  }

  dataItems2 = document.evaluate("//li[@class='module-list-item']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0; i < dataItems2.snapshotLength; i++) {
    thisDataItem = dataItems2.snapshotItem(i);
    userName = thisDataItem.innerHTML;
    for (var m = 0; m < knownTrolls.length; m++) { 
      if ( userName.search(knownTrolls[m]) != -1 ) {
        thisDataItem.innerHTML = '';
	}
    }
    userName = "";
  }

  dataItems3 = document.evaluate('//div[@class="entry-footer"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


  for (var i = 0; i < dataItems3.snapshotLength; i++) {
    thisDataItem = dataItems3.snapshotItem(i);

    replacement = thisDataItem.innerHTML.replace(/\.html#comments/, '/comments/page/100#comments');

    thisDataItem.innerHTML = replacement;
  }
  var url = window.location.href;

  url = url.replace(/\.html/, '/comments/page/100/');
  url = url.replace(/page\/\d+/, 'page/100');
  
  var insertLocation = document.getElementById('comments');
  if(insertLocation){
    var link = document.createElement('a');
    link.innerHTML = '<a href="' + url + '">Last Page</a>';
    insertLocation.parentNode.insertBefore(link, insertLocation.nextSibling);
  }

  recentComments = document.evaluate('//li[@class="module-list-item"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0; i < recentComments.snapshotLength; i++) {
    thisDataItem = recentComments.snapshotItem(i);
    if(thisDataItem.innerHTML.search('justoneminute') != -1) {
      
      replacement = thisDataItem.innerHTML.replace(/\.html#comment/, '/comments/page/100#comment').replace(/\.html/, '/comments/page/100#comment');

      thisDataItem.innerHTML = replacement;
    }
  }

//If you don't want to hide the colorful avatars, edit every line from here to start with // the way this one does. Don't do it to the very last line, though.
  avatars = document.evaluate("//div[@class='comment-avatar']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for ( var i = 0; i < avatars.snapshotLength; i++) {
    avatar = avatars.snapshotItem(i);
    avatar.innerHTML = '';
  }

  comments = document.evaluate("//div[@class='comment-content']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for ( var i = 0; i < comments.snapshotLength; i++) {
    comment = comments.snapshotItem(i);
    comment.style.marginLeft = '0px';
  }

})();