// ==UserScript==
// @name           Remove Chain Letters from Facebook News Feed
// @description    Removes Facebook Notes chain letters like "25 Random Things" from your Facebook news feed.
// @version        0.1
// @namespace      http://userscripts.org/users/80238
// @include        *facebook.com*
// ==/UserScript==

// Below is a list of the chain letter titles to filter out.
// Any Facebook Notes that match these titles will be removed
// from your Facebook news feed.
// You can add more chain letters to this list if you like.
// Note: this list is case-sensitive, so you may need to use
// different variations on capitalization for it to work.

var chainLetterTitles = new Array (
    "25 random things",
    "25 Random Things",
    "25 Random things",
    "25 things",
    "25 Things",
    "20 things with one word beginning in J",
    "In my senior year of high school"
);

var predicate;

function removeFacebookNotesChainLetters() {

    var elements = document.evaluate(
        "//a[" + predicate + "]/ancestor::div[contains(@class, 'feed_note')]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    for (var i = 0; i < elements.snapshotLength; i++) {
        var thisElement = elements.snapshotItem(i);
        thisElement.parentNode.removeChild(thisElement);
    }
}

function buildXPathPredicate ()
{
    predicate = "";
    for (var i = 0; i < chainLetterTitles.length; i++) {
        if (i > 0) {
            predicate += " or ";
        }
        predicate += "contains(., \"";
        predicate += chainLetterTitles[i];
        predicate += "\")";
    }
    return predicate;
}

buildXPathPredicate();
document.addEventListener("DOMNodeInserted", removeFacebookNotesChainLetters, true);