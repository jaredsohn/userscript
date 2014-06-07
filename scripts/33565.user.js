// ==UserScript==
// @name           Insert drupal.org Issue Links
// @namespace      http://www.abdevelopment.ca/
// @description    Insert plain text links to drupal.org issues and comments for use when linking to issues.
// @include        http://drupal.org/node/*
// ==/UserScript==

/**
 * This script is Copyright 2009 by Andrew Berry and licensed for any and all commercial
 * or personal use. Though, if you find it useful or make improvements, please consider
 * passing them along to me at andrewberry@sentex.net.
 */

var issue_element = document.getElementsByClassName('title node-type-project_issue')[0];

// If we don't find an issue title, we're on a node page which isn't an issue.
if (issue_element == null)
  return;

var issue_title = issue_element.textContent;

var query_position = document.baseURI.indexOf('?');
var fragment_position = document.baseURI.indexOf('#');

// Extract the issue number, and a fragment pointing to a comment if it exists.
// 23 is the length of http://drupal.org/node/
if (query_position > 0) {
  var issue_number = document.baseURI.substring(23, query_position);
}
else if (fragment_position > 0) {
  var issue_number = document.baseURI.substring(23, fragment_position);
}
else {
  var issue_number = document.baseURI.substring(23);
}

// If you don't want any of these things to happen, just comment out the function call for now.
linkIssueTitle();
addIssueTextLink();
addCommentTextLinks();

/**
 * Set the issue title to be a link, suitable for copying into a rich text area.
 * Style the link so it blends in reasonably with the current drupal.org theme.
 */
function linkIssueTitle() {
  var issue_link = document.createElement('a');
  issue_link.setAttribute('href', document.baseURI);
  issue_link.style.fontWeight = 'normal';
  issue_link.textContent = "#" + issue_number + ": " + issue_title;
  issue_element.textContent = "";
  issue_element.appendChild(issue_link);
}

/**
 * Add the plain text version of the issue link, below the issue title.
 */
function addIssueTextLink() {
  var link = '<a href="http://drupal.org/node/' + issue_number + '">#' + issue_number + ": " + issue_title + '</a>';
  var link_element = document.createElement('p');
  link_element.style.fontFamily = 'monospace';
  link_element.textContent = link;
  var next_node = issue_element.nextSibling;
  issue_element.parentNode.insertBefore(link_element, next_node);
}

/**
 * Add plain text links to each issue comment, below the comment number.
 */
function addCommentTextLinks() {
  var comments = document.getElementsByClassName('comment');
  for (var comment in comments) {
    var comment_link = comments[comment].getElementsByClassName('title')[0].firstChild;
    var link = '<a href="' + comment_link.href + '">#'
      + issue_number + ": "
      + issue_title
      + ' (' + comment_link.textContent + ')'
      + '</a>';
    var link_element = document.createElement('p');
    link_element.style.fontFamily = 'monospace';
    link_element.textContent = link;
    var next_node = comments[comment].getElementsByClassName('author')[0];
    comments[comment].getElementsByClassName('w4')[0].insertBefore(link_element, next_node);
  }
}
