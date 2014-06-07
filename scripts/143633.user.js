// ==UserScript==
//
// @name           Trollnavigate 
// @description    Adds navigation buttons to trollmegle   
// @author         SimplerUser
// @version        1.0
// @include        *trollmegle.net/logs*
// @include        *trollplay.net/logs*
// @include        *trollplay.net:8000/logs*
// @include        *trollmegle.net:8000/logs*
//
// ==/UserScript==

var startString = "logs/";
var endString = ".html";
var url = window.location.toString();
var numStart = url.indexOf(startString) + startString.length;
var numEnd = url.indexOf(endString);
var pageNum = parseInt(url.substring(numStart, numEnd));
var prev = pageNum - 1;
var next = pageNum + 1;
var topNode       = document.createElement ('div');
topNode.style
var bottomNode = document.createElement ('div');

var htmlToAdd = '<center><a href = \"' +prev+ '.html\">Previous</a>   <a href = \"' +next+ '.html\">Next</a></center>';


bottomNode.innerHTML = htmlToAdd;
bottomNode.setAttribute ('id', 'logcontainer');
document.body.appendChild (bottomNode);

topNode.innerHTML = htmlToAdd;
topNode.setAttribute ('id', 'logcontainer');
var log = document.getElementById('logcontainer');
topNode.style = log.style;
log.parentNode.insertBefore(topNode, log);
