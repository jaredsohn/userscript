// ==UserScript==
// @name        DocumentDate
// @namespace   tag:james.p.elford@googlemail.com,23-03-09:London 
// @description Adds the last date modified to the top of webpages
// @include     *
// @exclude     *google.com/*
// @author      James Elford
// ==/UserScript==


var dateFooter = document.createElement("div");
var lastModifiedDate = new Date(document.lastModified);
var monthName = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var dateLookupLink = "http://www.historyorb.com/day/" + monthName[lastModifiedDate.getMonth()] + "/" + lastModifiedDate.getDate();
dateFooter.innerHTML = '<p align="left"><font size="1" face="Verdana">' +
    'Document last modified: <a href='+dateLookupLink+' target=_blank>' + lastModifiedDate.getDate() + '/' + lastModifiedDate.getMonth() + '/' + lastModifiedDate.getFullYear()+ "</a>" +
    '</font></p></div>';
document.body.insertBefore(dateFooter,document.body.lastChild);

