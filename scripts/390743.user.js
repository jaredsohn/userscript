// ==UserScript==
// @name        JIRA Show Sprint Issues in Issue Navigator
// @namespace   RichardNeish
// @include     http://jira.*/secure/RapidBoard.jspa?rapidView=*&view=planning*
// @version     1
// @grant       none
// ==/UserScript==

// Script for the JIRA Agile planning board 
// to add "Open in Issue Navigator" links to each sprint.

// Create a function to add the links.
function addLinks() {
    var sprintName = document.querySelector('span[data-fieldname=sprintName]');
    var a = document.createElement('a');
    a.text='Open in Issue Navigator';
    a.href='/issues/?jql=issuekey in (';
    var sprintIssues = document.querySelectorAll('div.ghx-meta a.js-detailview');
    for (i=0; i<sprintIssues.length; i++) {
      var sprintIssue=sprintIssues[i];
      if (i>0) {
        a.href += ', ';
      }
      a.href+= '\'' + sprintIssue.innerHTML +'\'';
    }
    a.href += ')';
    sprintName.appendChild(a);
    
    var sprintContainers = document.querySelectorAll('div.ghx-backlog-container');
    for (i=0; i<sprintContainers.length; i++) {
      var sprintContainer = sprintContainers[i];
      var sprintName=sprintContainer.querySelector('span[data-fieldname=sprintMarkerName]');
      if (sprintName != null) {
        var a = document.createElement('a');
        a.text='Open in Issue Navigator';
        a.href='/issues/?jql=issuekey in (';
        var sprintIssues=sprintContainer.querySelectorAll('a.js-detailview');
        for (j=0; j<sprintIssues.length; j++) {
          var sprintIssue=sprintIssues[j];
          if (j>0) {
            a.href += ', ';
          }
          a.href+= '\'' + sprintIssue.innerHTML +'\'';
        }
        a.href += ')';
        sprintName.appendChild(a);
      }
    }
}

// Attach the addLinks function to a new button.
var button = document.createElement('button');
button.textContent='Add links';
button.onclick=addLinks;
var e = document.querySelector('nav.global > div.primary');
e.appendChild(button);
