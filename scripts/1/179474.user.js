// ==UserScript==
// @name Adding Issue Number for GitHub Issue Pages
// @description Adding issue number at issue page
// @match https://github.com/*
// ==/UserScript==

(function() {

  var path = location.pathname;
  var isIssueDetailPage = /^\/(?:[^\/]+\/){2}issues\/[0-9]+/.test(path);

  if ( !isIssueDetailPage ) {
    return;
  }

  var title = document.title;
  var issueNumber;
  
  if ( path.match(/^\/(?:[^\/]+\/){2}issues\/([0-9]+)/) ) {
    issueNumber = RegExp.$1;
  }

  document.title = '#' + issueNumber + ' ' + title;

}());

