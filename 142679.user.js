// ==UserScript==
// @name           Tumblr - Retry Auto Page asanusta Load Button
// @namespace      http://userscripts.org/users/notfound
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/blog/*
// @version 	   3.0.22
// ==/UserScript==

var loaderID = document.getElementById("auto_pagination_loader");         
var newButton = document.createElement('span');
var newLink = document.createElement('a');
newLink.setAttribute('onclick', 'retry_auto_paginator_request(); return false;');
newLink.setAttribute('href', 'javascript:void(0);');
newLink.setAttribute('style','color: #FFFFFF; font: bold 34px Arial,Helvetica,sans-serif; text-align: center; text-shadow: 2px 2px 3px #132B42; border-bottom: 2px solid #FFFFFF; padding-bottom: 5px; text-decoration: none; float: right; margin: 0 20px 0 0; position: relative; z-index: 5;');
newLink.innerHTML = "Retry";
newButton.appendChild(newLink);
loaderID.appendChild(newButton);