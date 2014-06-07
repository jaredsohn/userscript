// ==UserScript==
// @name           YouTube Comment Cleaner
// @namespace      http://www.triv.org.uk/~nelis/youtube-cleaner
// @description    Clean up the comments on youtube
// @include        http://www.youtube.com/watch?*
// ==/UserScript==

var comment_xpath = "//div[@class='watch-comment-body']";

// List of test, failure reason items.
var tests = [
    [/\b(lolz?|rotfl|lmfao|[ha]{2,})\b/i, 'Laughing out loud'],
    [function (s) {return (s.toUpperCase() == s)}, 'All capital letters'],
    [function (s) {return (s.toLowerCase() == s)}, 'No capital letters'],
    [function (s) {return (s.split(/\s+/).length < 4)}, 'One word reply'],
    [/^\s+[a-z]/, 'Didn\'t start with a capital letter'],
    [/\bi\b/, 'i not I'],
    [/\bu\b/, 'u not You'],
    [/\b(omg)\b/i, 'TLAs'],
    [/(\S)\1{3,}/, 'Contains repeated characters'],
    [/\b(fuck|retard)/i, 'Used a naughty word'],
    [/[x8:;=][\^-]?[\)\(pod]/i, 'Used a smiley'], // May be too greedy.
];

function validate(comment) {
    /* Check the comment quality. If it fails, return the reason. */
    for (var i=0; i<tests.length; i++) {
        // the first element is the callable test.
        if (tests[i][0](comment)) return tests[i][1];
    }
    // Comment checks out. No reason to block it.
    return null;
}

function hide(element, reason) {
    /* Hide the comment and put the show link above it next to the reason for hiding it */
    // Create div with toggle button
    d = document.createElement('div');
    d.innerHTML = 'Show comment (REASON)'.replace('REASON', reason);
    d.style.color = 'silver';
    d.style.fontSize = '8pt';
    // We have to listen properly.
    d.addEventListener('click', toggle, false);
    // Hide the comment text...
    element.style.display = 'none';
    // And put the "button" in there.
    element.parentNode.insertBefore(d, element);
}

function toggle() {
    /* Toggle the displayed status of the comment */
    var comment = this.nextSibling;
    comment.style.display = (comment.style.display != 'none') ? 'none' : '';
}
// Put the function in the dom so we can call it later.

var comments = document.evaluate(comment_xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0; i<comments.snapshotLength; i++) {
    var comment = comments.snapshotItem(i);
    var hide_reason = validate(comment.innerHTML);
    if (hide_reason) hide(comment, hide_reason);
}
