// ==UserScript==
// @name        Plusach Blacklist
// @namespace   https://userscripts.org/users/konachan
// @description Hides posts and coments with blacklisted words
// @author      Kona-chan
// @license     MIT (http://opensource.org/licenses/MIT)
// @include     *://plus.google.com/*
// @version     0.11 beta than nothing
// @grant       none
// ==/UserScript==

// Inspired by http://userscripts.org/scripts/show/160461

//------------------------------------------------------------
// SETTINGS
//------------------------------------------------------------
// * true = use feature;
// * false = don't use feature.

var hideComments = true,            // Hide comments with blacklisted words.
    hidePosts = true,               // Hide posts with blacklisted words.
    useSeparateBlacklists = false;  // Set this to `true` if you want to use
                                    // separate blacklists for filtering
                                    // posts and comments.

// The blacklist for comments.
// You can add new values preserving the format.
var commentBlacklist = ["SISTRA", "#плюсач", "#пирожок"];

// Separate blacklist for posts.
// Ignored if `useSeparateBlacklists` above is set to `false`.
var postBlacklist = ["SISTRA", "#пирожок"];

//------------------------------------------------------------
// DO NOT EDIT BELOW THIS LINE
//------------------------------------------------------------


// Containter div and text div.
// Need to be kept in sync with Google obfuscated piece of code.
var commentClass = "Ik Wv";
var postClass = "Yp yt Xa";
var textClass = "Ct";

// The main routine.
function hideBlacklisted(containerClass, blacklist) {

    // Get all containers.
    var containers = document.getElementsByClassName(containerClass);

    // Check every container.
    for (var i = 0; i < containers.length; i++) {

        // Get current container.
        var container = containers[i]; 

        // Get text div from it.
        var containerText = container.getElementsByClassName(textClass)[0];

        // If the text div was found, check if it contains any of blacklisted words.
        if (containerText) {
            var j = 0;
            var match = false;

            // Go through blacklist dictionary and look for a match.
            do {
                match = match || (containerText.textContent.search(new RegExp(blacklist[j], "i")) >= 0);
                j++;
            } while (!(match) && (j < blacklist.length));

            // If there was a match, hide the container div.
            if (match) {
                container.style.display = "none";
            }
        }
    }
}

// If not using separate blacklists, make them equal (small hack).
if (!(useSeparateBlacklists)) {
    postBlacklist = commentBlacklist;
}

// The following is pretty much an example of MutationObserver usage from
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
// so I'll leave it without comments.

var target = document.getElementsByTagName("body")[0];
var config = { childList: true, subtree: true };

var mutationObserver = new MutationObserver(function(mutations) {
    if (hideComments) {
        hideBlacklisted(commentClass, commentBlacklist);
    }
    if (hidePosts) {
        hideBlacklisted(postClass, postBlacklist);
    }
});

mutationObserver.observe(target, config);
