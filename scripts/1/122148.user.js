// ==UserScript==
// @name Twitter - Scroll to Last New Tweet
// @namespace http://murklins.talkoncorners.net
// @description When you load tweets from the new tweet bar, scroll down to last new tweet so you can pick up reading from where you left off. (Caveat: Fails to work if you try to load too many at once (over 100?), since the last new tweet will not even end up on the page in that case. And I think promoted tweets mess with it, too.)
// @include http*://twitter.com*
// @grant GM_addStyle
// @grant GM_log
// ==/UserScript==

// action to take when dom mutation event occurs
var gObserver = new MutationObserver( function( mutations )
{
  mutations.forEach( function( mutation )
  {
    if( mutation.addedNodes.length > 0 )
    {
      nodeInserted();
    }
  });   
});

var scrollToId = -1;
var lastId = -1;

GM_addStyle(".gm_scrollToLastNewTweet { border-top: 1px solid #000 ! important; }");

// monitor dom mutation events in the timeline
var target = document.getElementById( "timeline" );
var config = { childList: true, subtree: true };
gObserver.observe( target, config );

function nodeInserted() {  
  var timelineNode = document.getElementById("timeline");
  
  // get the current top tweet
  var tweets = document.evaluate("//li[contains(@class, 'stream-item') and contains(@data-item-type, 'tweet')]", timelineNode, null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                null);
  if (tweets.snapshotLength <= 0)
  {
    return;
  }
  
  var currentTopTweet = tweets.snapshotItem(0);
  
  if((currentTopTweet.getAttribute("data-item-id") != lastId)  && (lastId != -1))
  {
    if((currentTopTweet.getAttribute("data-item-id") != scrollToId) && (scrollToId != -1))
    {
      // scroll
      var topOldTweet = document.querySelector('[data-item-id="'+ scrollToId + '"]');
      if (topOldTweet)
      {
        if (topOldTweet.className.indexOf(" gm_scrollToLastNewTweet") == -1)
        {
          // add custom class to top old tweet, so it gets the horizontal line
          topOldTweet.className = topOldTweet.className + " gm_scrollToLastNewTweet";
        }
          
        // now scroll to the top old tweet
        window.scroll(0,findPos(topOldTweet));
      }
    }
  }
  lastId = currentTopTweet.getAttribute("data-item-id");
  
  // check to see if there is a new tweet bar   
  var newTweetBar = document.evaluate("//div[contains(@class, 'new-tweets-bar')]", timelineNode, null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);                              
  if (newTweetBar.snapshotLength > 0)
  {
    // set the new scrollToId
    scrollToId = currentTopTweet.getAttribute("data-item-id");
  }
}

function findPos(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
	  do
	  {
	    curtop += obj.offsetTop;
	  } while (obj = obj.offsetParent);
	  curtop = curtop + 3 - window.innerHeight;
	}
	return curtop;
}
