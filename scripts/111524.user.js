// ==UserScript==
// @name		  Tuts+ Premium Link Generator
// @namespace	  
// @description   Go to the Tuts+ site and go down to "Download Source Files" to find the DL link.
// @version       1.0
// @include		*tutsplus.com/*
// @exclude	   
// ==/UserScript==
document.getElementById('logged-out-top-link').innerHTML = '<a href="http://herp.in/tutsplus.php?url='+document.location.href+'" target="_blank">Download</a> the file using Tuts+ Premium Link Generator.';
document.getElementById('logged-in-top-link').innerHTML = '<a href="http://herp.in/tutsplus.php?url='+document.location.href+'" target="_blank">Download</a> the file using Tuts+ Premium Link Generator.';
