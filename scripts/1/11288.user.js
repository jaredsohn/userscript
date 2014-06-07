// ==UserScript==
// @name            Reddit autohide
// @namespace       http://reddit.com/user/Bogtha/
// @description     Adds links in the top navigation bar to automatically hide all articles, read articles and unread articles.  Compatible with both Greasemonkey and Opera 9.
// @include         http://reddit.com/
// @include         http://*.reddit.com/
// @include         http://reddit.com/?offset=*
// @include         http://*.reddit.com/?offset=*
// ==/UserScript==

// Execute a function for each matching node in the document.
function xpathLoop(expression, filter, task)
{
    // Loop over each matching node.
    var nodes = document.evaluate(expression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < nodes.snapshotLength; i++) {
        node = nodes.snapshotItem(i);

        // Skip the node if it doesn't pass the filter.
        if (filter && !filter(node)) continue;

        // Execute the task for the node.
        task(node);
    }
}

// Get the article ID.
function getArticleId(delform)
{
    var articleId = "";
    for (var j = 0, element; element = delform.elements[j]; ++j) {
        if (element.name == "id") articleId = element.value;
    }

    return articleId;
}

// Find out the colour of a visited link.
function getVisitedColour()
{
    var dummy = document.createElement("a");

    // It's necessary to give it an href attribute to make :link CSS apply.
    dummy.href = "";

    // Opera doesn't apply any CSS to it until it's added to the document and given the right class.
    dummy.className = "title";
    var body = document.getElementsByTagName("body")[0]
    body.appendChild(dummy);

    var colour = window.getComputedStyle(dummy, null).color;

    body.removeChild(dummy);

    return colour;
}

// Filter out articles that have been visited.
var visitedColour = getVisitedColour();
function visitedFilter(delform)
{
    var id = getArticleId(delform);
    var title = document.getElementById("title_" + id);
    if (window.getComputedStyle(title, null).color == visitedColour) return true;
    return false;
};

// Filter out articles that haven't been visited.
function unvisitedFilter(delform) { return !visitedFilter(delform); }

// Remove an article from the page.
function removeArticle(id)
{
    var row = document.getElementById("pre_" + id);
    var tableSection = row.parentNode;
    var rowIndex = row.rowIndex;
    // Each article listed on Reddit is comprised of two adjacent table rows.
    for (var i = 0; i < 2; ++i) {
        tableSection.deleteRow(rowIndex);
    }
}

// Hide an article.
function hideArticle(delform)
{
    var id = getArticleId(delform);
    var http = new XMLHttpRequest();
    http.open("POST", "/api/hide");
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.setRequestHeader("User-Agent", "Auto-hide - userscripts.org/scripts/show/11288");
    http.onreadystatechange = function() {
        if (http.readyState != 4) return;
        removeArticle(id);
    }
    http.send("id=" + id + "&uh=" + (window.modhash || unsafeWindow.modhash) + "&_=");
}

// Add a method of hiding articles to the navigation bar.
var topstrip = document.getElementById("topstrip");
function addHider(linkName, criteria)
{
    var anchor = document.createElement("a");
    anchor.appendChild(document.createTextNode(linkName));
    anchor.href = "#";
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        xpathLoop("//form[@class='delform'][last()]", criteria, hideArticle);
    }, false);
    anchor.className = "menu-item";
    topstrip.insertBefore(anchor, topstrip.lastChild); // The last child node is annoying whitespace.
}

if (topstrip) {
    addHider("hide all", null);
    addHider("hide read", visitedFilter);
    addHider("hide unread", unvisitedFilter);
}
