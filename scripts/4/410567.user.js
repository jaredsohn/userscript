// ==UserScript==
// @name       Li-Search
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.linkedin.com/vsearch/*
// @copyright  2012+, You
// ==/UserScript==

var countStr = document.getElementById("results_count").childNodes[0].childNodes[0].childNodes[0].nodeValue;
console.log("Search result count="+countStr);
if (parseInt(countStr)==1) {
    var url = document.getElementById("results").childNodes[0].childNodes[0].getAttribute("href");
    console.log("URL:"+url);
    window.location.href=url;
}