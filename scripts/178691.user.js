// ==UserScript==
// @name            GitHub go to pull request branch from pull request
// @description     Make the two SPANs with pullrequest-source and pullrequest-target user & branch names clickable. Click navigates to the list of commits in a given branch.
// @icon            https://github.com/favicon.ico
// @version         0.1.0.20130927
// @namespace       http://jakub-g.github.io/
// @author          http://jakub-g.github.io/
// @downloadURL     https://raw.github.com/jakub-g/greasemonkey-userscripts/master/github/goToBranchFromPullRequest.user.js
// @userscriptsOrg  http://userscripts.org/scripts/show/...
// @grant           none
// @include         http*://github.com/*/*/pull/*
// ==/UserScript==

function attachLink(dataNode, userName, repoName, branchName) {
    var sLink = ["https://github.com",userName,repoName,"commits",branchName].join("/");
    dataNode.innerHTML = '<a title="Click to go to this branch" href="'+sLink+'">'+dataNode.innerHTML + "</a>";
}

var currRepoNameUser = document.URL.match("^https://github.com/([a-zA-Z0-9-]+)/([a-zA-Z0-9-]+)/pull");
var reposAndBranchesNames = document.querySelectorAll('#pull-head .commit-ref.current-branch');
var currDataNode = reposAndBranchesNames[0];
var prDataNode = reposAndBranchesNames[1];

var currUserName = currRepoNameUser[1];
var currRepoName = currRepoNameUser[2];
var currBranchName = currDataNode.children[1].textContent;

attachLink(currDataNode, currUserName, currRepoName, currBranchName);

var prUserName = prDataNode.children[0].textContent;
var prBranchName = prDataNode.children[1].textContent;
var prRepoName = document.querySelector('.actions > div > a[href^="/'+prUserName+'/"]').href.match("^https://github.com/"+prUserName+"/([a-zA-Z0-9-]+)/blob")[1];

attachLink(prDataNode, prUserName, prRepoName, prBranchName);
