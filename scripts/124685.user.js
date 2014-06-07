// ==UserScript==

// @name          JIRA Watch All Issues User Script

// @namespace     http://vertek.com

// @description   Script allows a user to Watch or Unwatch each visible issue in the current issue navigator view.

// @include       *

// @version       1.0.1

// ==/UserScript==


// constants
var watchIssueAction = 'Watch Issue';
var unWatchIssueAction = 'Stop Watching';

// get current username
var currentUsername = document.getElementById('header-details-user-fullname').getAttribute("data-username");

// create our watch issues link
var watchIssuesLink = document.createElement("a");
watchIssuesLink.innerHTML = "Watch All Issues!";
watchIssuesLink.style.position = "relative";
watchIssuesLink.style.fontWeight = "bold";
watchIssuesLink.style.left = "41%";
watchIssuesLink.style.paddingRight = "10px";
watchIssuesLink.onclick = function() {findActionableIssues(watchIssueAction);};

// create our un-watch issues link
var unWatchIssuesLink = document.createElement("a");
unWatchIssuesLink.innerHTML = "UnWatch All Issues!";
unWatchIssuesLink.style.position = "relative";
unWatchIssuesLink.style.fontWeight = "bold";
unWatchIssuesLink.style.left = "41%";
unWatchIssuesLink.onclick = function() {findActionableIssues(unWatchIssueAction);};

// create our informational element
var infoElement = document.createElement("p");
infoElement.style.position = "relative";
infoElement.style.left = "43%";

// add our elements to the current document
var jqlForm = document.getElementById("jqlform");
if (jqlForm != null) {
    jqlForm.appendChild(watchIssuesLink);
    jqlForm.appendChild(unWatchIssuesLink);
    jqlForm.appendChild(infoElement);
}


/** Finds watchable issues in the current table of issues by invoking the request for available actions/operations. */
function findActionableIssues(action) {
    var message = (action == watchIssueAction)
        ? 'Do you really want to become a watcher on all unwatched issues in the current issue list?'
        : 'Do you really want to UN-Watch all watched issues in the current issue list?';

    if (confirm(message)) {

        infoElement.innerHTML = "";

        // find the element that contains info to request available operations per issue
        var actionCogLinks = document.evaluate(
            "/html/body//div//table[@id='issuetable']//td[@class='nav issue_actions']/div[@class='action-dropdown aui-dd-parent']/a",
            document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

        // loop through action links and request available actions/operations
        while ((aLink = actionCogLinks.iterateNext()) != null) {
            GM_xmlhttpRequest({
                method:"GET",
                url: aLink.getAttribute("href"),
                headers:{
                    "Accept": "application/json,text/xml"
                },
                onload: function(details) {
                    var responseObj = JSON.parse(details.responseText);
                    var issueKey = responseObj.key;
                    var operations = responseObj.operations;
                    for (var i = 0; i < operations.length; i++) {
                        var currentOperation = operations[i];
                        if (currentOperation.name == watchIssueAction && action == watchIssueAction) {
                            watchIssue(issueKey);
                        }
                        if (currentOperation.name == unWatchIssueAction && action == unWatchIssueAction) {
                            unWatchIssue(issueKey);
                        }
                    }
                }
            });
        }
    }
}


/**
 * Watches the Issue with the given issueKey.
 * @param issueKey the key of the issue to watch.
 */
function watchIssue(issueKey) {
    GM_xmlhttpRequest({
        method:"POST",
        url: '/rest/api/2.0.alpha1/issue/' + issueKey + '/watchers',
        data: '\"' + currentUsername + '\"',
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        onload: function(details) {
            var issueLink = "<a href='/browse/" + issueKey + "'>" + issueKey + "</a>";
            if (details.status == 204) {
                // expected no content success for watch issue
                infoElement.innerHTML += "You are now watching issue: " + issueLink + "<br/>";
            }
            else {
                // otherwise we encountered a problem requesting a watch on the issue.
                infoElement.innerHTML += "Error occurred requesting watch on issue: " + issueLink + "<br/>";
            }
        }
    });
}

/**
 * UnWatches the Issue with the given issueKey.
 * @param issueKey the key of the issue to watch.
 */
function unWatchIssue(issueKey) {
    GM_xmlhttpRequest({
        method:"DELETE",
        url: '/rest/api/2.0.alpha1/issue/' + issueKey + '/watchers?username=' + currentUsername,
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        onload: function(details) {
            var issueLink = "<a href='/browse/" + issueKey + "'>" + issueKey + "</a>";
            if (details.status == 204) {
                // expected no content success for watch issue
                infoElement.innerHTML += "You are no longer watching issue: " + issueLink + "<br/>";
            }
            else {
                // otherwise we encountered a problem requesting a watch on the issue.
                infoElement.innerHTML += "Error occurred requesting un-watch on issue: " + issueLink + "<br/>";
            }
        }
    });
}
