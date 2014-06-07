// ==UserScript==
// @name           Google Analytics current day
// @namespace      https://www.google.com/analytics/
// @include        https://www.google.com/analytics/reporting/*
// ==/UserScript==

var url = window.location.href;  
var urlParam = "&pdr=";  
var today = new Date();  
var day = today.getDate().toString();
var firstday = (today.getDate() + 1).toString(); 
var month = (today.getMonth() + 1).toString();
var firstmonth = today.getMonth().toString();
var year = today.getFullYear().toString();  
var todaysRange;
  
if(day < 10)  
day = '0' + day;
if(firstday < 10)  
firstday = '0' + firstday;
if(month < 10)  
month = '0' + month;
if(firstmonth < 10)  
firstmonth = '0' + firstmonth;
  
var todaysRange = year + firstmonth + firstday + '-' + year + month + day;  
  
if(url.indexOf(urlParam) < 0)  
window.location.href += '&pdr=' + todaysRange;