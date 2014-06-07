// ==UserScript==
// @name        PHP Errors and Warnings on page
// @namespace   home24.de
// @description Detects if there are PHP errors or warnings in the page code and shows a warning.
// @include     http://www.home24.de/*
// @include     http://www.home24.fr/*
// @include     http://www.home24.nl/*
// @include     http://www.home24.at/*
// @include     http://www-testing.home24.de/*
// @include     http://www-testing2.home24.de/*
// @include     http://www-testing.home24.fr/*
// @include     http://www-testing2.home24.fr/*
// @include     http://www-testing.home24.nl/*
// @include     http://www-testing2.home24.nl/*
// @include     http://www-testing.home24.at/*
// @include     http://www-testing2.home24.at/*
// @version     1
// @grant       none
// ==/UserScript==

// Preparing for the action, defining variables and the like.

var currentURL = document.URL;			// current URL
var messages = ["Fatal error", "PHP Error", "Warning:", "Notice: "];

// This holds the warning:
warningDiv = document.createElement('div');
warningDiv.setAttribute('style','position:fixed;right:0px;top:0px;');
document.body.appendChild(warningDiv);

var pageContent = document.documentElement.innerHTML;
for (var i = 0; i < messages.length; i++) {
  if(pageContent.indexOf(messages[i])>-1) problems = true;
  // Log everything to console? Or just skip?
}


if(problems){
  warningDiv.innerHTML = "<div style='color:red;background:lightgrey;'>There is a problem on this page!</div>";
}
