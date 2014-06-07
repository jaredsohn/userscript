// ==UserScript==
// // @name Chris Svenningsen
// // @description Automatically follows the link to the original job posting from Indeed.com listings
// // @match http://*.indeed.com/*
// // ==/UserScript==

var link = document.getElementsByClassName("view_job_link")[0]
var url = link.getAttribute("href");
window.location = url;
