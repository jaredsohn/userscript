// ==UserScript==
// @name           ED User Contributions
// @namespace      eduser
// @description    Inserts a link to user contributions into the tabbed navigation at the top of user pages. Also sets the accesskey attribute for the link to 'i' so that pressing ctrl+'i' activates the link.
// @include        http://*encyclopediadramatica.com/*
// ==/UserScript==

var url = window.location.href; // Get the entire URL
var urlMatch = url.match(/User:[^&]*\&*/g); // Grab a portion of the URL
urlMatch = urlMatch[0].substring(5); // Eliminate "User:"
urlMatch = urlMatch.match(/[^&]*/g); // Elminate potential "&" query string parameters
urlMatch = urlMatch[0]; // Convert array to string

var userContributions = document.createElement("li"); // Create a new <li> element
userContributions.innerHTML = '<a href="/Special:Contributions/' + urlMatch + '" accesskey="i">User Contributions</a>'; // Create a link inside the <li> element
var whatlinks = document.getElementById('ca-talk'); // Get the "discussions" link from ED's html output
whatlinks.parentNode.insertBefore(userContributions, whatlinks.previousSibling); // Insert the <li> before the "discussions" link