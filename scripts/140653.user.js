// ==UserScript==
// @name           HootSuite Tweet Delete
// @namespace      http://xtina.dreamwidth.org
// @description    Remove tweets from HootSuite based on certain criteria.
// @include        http://hootsuite.com/*
// @include        https://hootsuite.com/*
// @match          http://hootsuite.com/*
// @match          https://hootsuite.com/*
// @version        1.0.0
// ==/UserScript==

(function() {

var DEBUG = false;
var timer = 0;

// Add users and text strings you don't want to see here.
var removeItems = new Array(
	 "@test_user"
	,"#test_hashtag"
);

// Do NOT edit below this line!
var removeTweets = function() {
    try {
        if (timer) {
            return;
        }
        
        timer = setTimeout(function() {
            GM_log("removeTweets(): fired");
            try {
                var messages = document.evaluate(
                    "//div[contains(@class, 'message') and not(contains(@class, 'official_rt'))]",
                    document,
                    null,
                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                    null
                );
            }
            catch (e) {
                GM_log("removeTweets(): " + e);
                return;
            }
            
            for (var i = 0 ; i < messages.snapshotLength ; ++i) {
                var message = messages.snapshotItem(i);
                try {
                    var messageContent = document.evaluate(
                        "./p",
                        message,
                        null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                        null
                    );
                }
                catch (e) {
                    GM_log("removeTweets()/messages[]: " + e);
                    continue;
                }

                messageContent = messageContent.snapshotItem(0);
                if (!messageContent) continue;
                
                var messageContentText = messageContent.textContent.replace(/^\s+|\s+$/g, "");
                
                // Remove anything that matches.
                for (var q = 0; q < removeItems.length; q++) {
					if (messageContentText.indexOf(removeItems[q]) > -1) {
						if (DEBUG) { GM_log("removeTweets(): removed_tweet = '" + messageContent.textContent + "'"); }
						message.setAttribute('class', message.getAttribute('class') + ' official_rt');
						if (DEBUG) {
							// If debugging, just highlight the to-be-removed items.
							message.style.border = "1px solid #F00";
						}
						else {
							message.style.display = "none";
						}
					}
				}
            }
            
            timer = 0;
        }, 50);
    }
    catch (e) {
        GM_log("removeTweets(): FATAL ERROR: " + e);
    }
};

GM_log("addEventListener: DOMNodeInserted");
document.addEventListener("DOMNodeInserted", removeTweets, false);

})();
