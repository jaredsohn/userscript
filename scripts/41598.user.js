// ==UserScript==
// @name           Instructables - link to comments
// @namespace      b0at.tx0.org
// @include        http://www.instructables.com/id/*
// @version        1
// ==/UserScript==


// find our target (also one of the destinations)
var $target = document.getElementById("DISCUSS");
if( ! $target ) return;

// find the main destination
var $headings = document.getElementsByTagName("h1");
if( $headings.length < 1 ) return;
var $heading = $headings[0];

// create link to element with id "DISCUSS", which is right before comments
var $link = document.createElement("a");
$link.href = "#DISCUSS";
$link.appendChild(document.createTextNode("(comments)"));

// insert link just after heading
$heading.parentNode.insertBefore($link, $heading.nextSibling);

// clone link ('true' for deep clone to catch the text as well)
$link = $link.cloneNode(true);

// insert cloned link at bottom of article, just before the comments
var $topofcomments = document.getElementById("DISCUSS");
$topofcomments.parentNode.insertBefore($link, $topofcomments);

