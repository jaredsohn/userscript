// ==UserScript==
// @name          JIRA 5 Watch All Issues User Script
// @description   Script allows a user to Watch or Unwatch each visible issue in the current issue navigator view.
// @include       *
// @version       1.0

// ==/UserScript==

/*
 * This will only work with third party cookies enabled in firefox. The script also sets a hard limit of 1000 issues
 * to watch per Search. This script is based on rynam0's JIRA Watch All Issues User Script (http://userscripts.org/scripts/show/124685)
 */

// constants
var watchIssueAction = 'Watch Issue';
var unWatchIssueAction = 'Stop Watching';
var activeRequests = 0;

// get current username
var currentUsername = document.getElementById('header-details-user-fullname').getAttribute("data-username");

// create our watch issues link
var watchIssuesLink = document.createElement("a");
watchIssuesLink.innerHTML = "Watch All Issues!";
watchIssuesLink.style.position = "relative";
watchIssuesLink.style.fontWeight = "bold";
watchIssuesLink.style.left = "41%";
watchIssuesLink.style.paddingRight = "10px";
watchIssuesLink.onclick = function () { getSearchResults(document.getElementById("jqltext").value, function(response) { alterIssue(response, 'POST')} ) };

// create our un-watch issues link
var unWatchIssuesLink = document.createElement("a");
unWatchIssuesLink.innerHTML = "UnWatch All Issues!";
unWatchIssuesLink.style.position = "relative";
unWatchIssuesLink.style.fontWeight = "bold";
unWatchIssuesLink.style.left = "41%";
unWatchIssuesLink.onclick = function () { getSearchResults(document.getElementById("jqltext").value, function(response) { alterIssue(response, 'DELETE')} ) };

// create our informational element
var infoElement = document.createElement("p");
infoElement.style.position = "relative";
infoElement.style.left = "43%";
infoElement.id = "infoElement";

// add our elements to the current document
var jqlForm = document.getElementById("jqlform");
if (jqlForm != null) {
    jqlForm.appendChild(watchIssuesLink);
    jqlForm.appendChild(unWatchIssuesLink);
    jqlForm.appendChild(infoElement);
}

function alterIssue(response, action) {
  var issues = JSON.parse(response.responseText).issues;
  activeRequests = issues.length;
  
  showProcessing();
  for(var i = 0; i < issues.length; i++) {
    GM_xmlhttpRequest({
      method: action,
      url: "/rest/api/2/issue/" + issues[i].key + "/watchers?username=" + currentUsername,
      data: JSON.stringify(currentUsername),
      headers: {
       "Content-Type": "application/json"
     },
     onerror: function() { activeRequests--; if(activeRequests == 0) { hideProcessing(); }},
     onload: function() { activeRequests--; if(activeRequests == 0) { hideProcessing(); }}
  });
  }
}

function showProcessing() {
  var el = document.getElementById('infoElement');
  if(el) {
    el.appendChild(document.createTextNode('Processing... '));
  }
}

function hideProcessing() {
  var el = document.getElementById('infoElement');
  if(el) {
    el.innerHTML = '';
  }
}

function getSearchResults(jql, callback) {
  GM_xmlhttpRequest({
    method: "GET",
    url: "/rest/api/2/search?jql=" + jql + "&startAt=0&maxResults=1000",
    headers: {
     "Content-Type": "application/json"
   },
   onerror: callback,
   onload: callback
  });
}
