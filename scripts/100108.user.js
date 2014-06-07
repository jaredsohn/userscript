// ==UserScript==
// @name           Remove Official Retweets for HootSuite
// @namespace      http://xeres.jp/greasemonkey/fix-hootsuite-remove-official-retweets
// @description    Auto remove official RT (ex. RT @twitter: blah...) from streams.
// @include        http://hootsuite.com/*
// @include        https://hootsuite.com/*
// @match          http://hootsuite.com/*
// @match          https://hootsuite.com/*
// @version        1.0.2
// ==/UserScript==


(function() { //// BEGIN ////

var DEBUG = false;

var timer = 0;

var removeOfficialRetweets = function() {
    try {
        if (timer) {
            return;
        }
        
        timer = setTimeout(function() {
            GM_log("removeOfficialRetweets(): fired");
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
                GM_log("removeOfficialRetweets(): " + e);
                return;
            }
            
            for (var i = 0 ; i < messages.snapshotLength ; ++i) {
                var message = messages.snapshotItem(i);
                try {
                    var messageContent = document.evaluate(
                        // XXX: unexpected behavior...
                        //".//p[contains(@class, 'messageContent')]",
                        "./p",
                        message,
                        null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                        null
                    );
                }
                catch (e) {
                    GM_log("removeOfficialRetweets()/messages[]: " + e);
                    continue;
                }
                
                // XXX: unexpected behavior...
                /*
                if (messageContent.snapshotLength != 1) {
                    GM_log("removeOfficialRetweets()/messageContent: illegal message: " +
                           messageContent + "/" + messageContent.snapsotLength);
                    continue;
                }
                */

                messageContent = messageContent.snapshotItem(0);
                
                if (! messageContent) {
                    continue;
                }
                
                var messageContentText = messageContent.textContent.replace(/^\s+|\s+$/g, "");
                
                if (messageContentText.match(/^RT @\w{1,15}:/)) {
                    GM_log("removeOfficialRetweets(): official_rt = '" + messageContent.textContent + "'");
                    message.setAttribute('class', message.getAttribute('class') + ' official_rt');
                    if (DEBUG) {
                        message.style.border = "1pt solid #FF0000";
                    }
                    else {
                        message.style.display = "none";
                    }
                }
            }
            
            timer = 0;
        }, 50);
    }
    catch (e) {
        GM_log("removeOfficialRetweets(): FATAL ERROR: " + e);
    }
};

GM_log("addEventListener: DOMNodeInserted");
document.addEventListener("DOMNodeInserted", removeOfficialRetweets, false);

})(); //// END ////
