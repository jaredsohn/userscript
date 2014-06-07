// ==UserScript==
// @name          Lambda Skipper
// @namespace     http://www.cs.vu.nl/~mvermaat/
// @description   Extends Lambda The Ultimate with some links to skip to next new post
// @include       http://lambda-the-ultimate.org/tracker*
// @include       http://lambda-the-ultimate.org/node/view/*
// ==/UserScript==


/*
    Lambda Skipper

    Version: 1.2, 2005-06-01

    http://www.cs.vu.nl/~mvermaat/greasemonkey

    Martijn Vermaat, mvermaat@cs.vu.nl


    Tracking down and reading unread posts on Lambda the Ultimate
    started to annoy me quite a bit. Lambda Skipper adds a direct
    jump to the top-most unread post for each node to the 'Recent
    posts' overview.
    It also adds links to skip to the next unread post in the node
    view (in top-to-bottom order rather than chronological order).


    Lambda Skipper is Open Source and licensed under the new
    BSD License, found at:
    http://www.opensource.org/licenses/bsd-license.php
*/



/*
    Wrap the whole thing in an anonymous function to avoid
    nameclashes with existing Javascript.
*/
(function() {


function addTrackerLinks() {

    var tracker, container, containerLink, containerItem, nodes, td, ul, li, a;

    tracker = document.getElementById('tracker');

    // Find all nodes in tracker
    nodes = document.evaluate(".//span[@class='marker']/ancestor::td[@class='content']",
                              tracker,
                              null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                              null);

    if (nodes.snapshotLength > 0) {

        // Create container for list of links
        container = document.createElement('ul');
        tracker.parentNode.insertBefore(container, tracker);
        tracker.parentNode.insertBefore(document.createTextNode('Direct links to top-most new post'), container);

    }

    for (var i = 0; i < nodes.snapshotLength; i++) {

        // Cell containing post links
        td = nodes.snapshotItem(i);

        // Create link
        a = document.createElement('a');
        a.setAttribute('href', td.getElementsByTagName('a')[0].getAttribute('href') + '#new');

        // Link for container
        containerLink = a.cloneNode(true);
        containerLink.appendChild(document.createTextNode(td.getElementsByTagName('a')[0].firstChild.nodeValue));
        containerItem = document.createElement('li');
        containerItem.appendChild(containerLink);
        container.appendChild(containerItem);

        // Link for tracker
        a.appendChild(document.createTextNode('Top-most new post'));

        // Insert break after post title
        td.insertBefore(document.createElement('br'), td.getElementsByTagName('a')[0].nextSibling);

        // Insert link after post title
        td.insertBefore(a, td.getElementsByTagName('a')[0].nextSibling.nextSibling);

    }

}


function addSkipLinks() {

    var comments, comment, link, begin, next, links, a;

    // Locate comments
    comments = document.evaluate(".//span[@class='marker']/ancestor::div[@class='comment']",
                                 document.getElementById('main'),
                                 null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                 null);

    for (var i = 0; i < comments.snapshotLength; i++) {

        // Div containing comment
        comment = comments.snapshotItem(i);

        if (i == 0) {

            // For top-most new comment, add a link next to topic title

            // Link value for this comment
            link = document.evaluate("./preceding-sibling::a[1]/@id",
                                     comment,
                                     null,
                                     XPathResult.STRING_TYPE,
                                     null).stringValue;

            // Location to insert the link
            begin = document.evaluate(".//div[@class='node']",
                                      document.getElementById('main'),
                                      null,
                                      XPathResult.FIRST_ORDERED_NODE_TYPE,
                                      null).singleNodeValue;

            // Create link
            a = document.createElement('a');
            a.setAttribute('href', window.location.href.split('#')[0] + '#' + link);
            a.appendChild(document.createTextNode('Top-most new comment'));

            // Insert link
            begin.parentNode.insertBefore(a, begin);
            begin.style.margin = '1em 0 0 0';

        }

        // Locate next new comment (and get its link id)
        next = document.evaluate("./following::div//span[@class='marker']/ancestor::"
                                 + "div[@class='comment']/preceding-sibling::a[1]/@id",
                                 comment,
                                 null,
                                 XPathResult.STRING_TYPE,
                                 null).stringValue;

        if (next) {

            // Links under comment
            links = document.evaluate(".//div[@class='links']",
                                      comment,
                                      null,
                                      XPathResult.FIRST_ORDERED_NODE_TYPE,
                                      null).singleNodeValue;

            // Append separator pipe
            links.appendChild(document.createTextNode(' | '));

            // Create skip link
            a = document.createElement('a');
            a.setAttribute('href', window.location.href.split('#')[0] + '#' + next);
            a.appendChild(document.createTextNode('Next new comment'));

            // Append link
            links.appendChild(a);

        }

    }

}


if (/^http:\/\/([a-z0-9-.]+\.)?lambda-the-ultimate\.org\/node\/view\//i.test(window.location.href)) {
    addSkipLinks();
} else if (/^http:\/\/([a-z0-9-.]+\.)?lambda-the-ultimate\.org\/tracker/i.test(window.location.href)) {
    addTrackerLinks();
}


/*
    End of wrapper function (see top of script).
*/
})();
