
// ==UserScript==
// @name           Craigslist and Google Maps
// @namespace      http://www.zbull.com
// @description    Adds a link to Google maps for each location listed
// @include        http://*.craigslist.org/*
// @exclude        http://*.craigslist.org/*/*/*/*/*.html
// @exclude        http://*.craigslist.org/*/*/*/*.html
// @exclude        http://*.craigslist.org/*/*/*.html
// @exclude        http://*.craigslist.org/*/*.html
// @exclude        http://*.craigslist.org/*.html
// ==/UserScript==
// Version         1.0.3
// Author          David Haley
// Compatability   Greesemonkey 0.7.2008121.0 & Firefox 2

// ---| A Quick Note |---
// Sorry this code isn't documented, I initally made 
// it for myself.  Maybe I'll get around to it one day.
// Feel free to modify it for non-commercial purposes
// just hook me up with a copy so I can enjoy it too:)

// ---| Version Log |---
// 1.0.0 - Script Creation
// 1.0.1 - Minor tweaks and fixes
// 1.0.2 - Browser crash fix (infinite loop)
// 1.0.3 - Removed trailing parenthesis (strange)

// ---| Known Bugs |---
// 1) Needs to find a good link first before creating other good links


 function leftTrim(sString) {
  while (sString.substring(0,1) == ' ') {
  sString = sString.substring(1, sString.length);
  }
  return sString;
  }

 function rightTrim(sString) {
  sString = sString.substring(0,sString.length-11);
  return sString;
  }

 var MainCity;
 MainCity = document.getElementsByTagName('a')[3].innerHTML;
 MainCity = rightTrim(MainCity)
 MainCity = leftTrim(MainCity)

 var aCrazyOutput;
 var thecity2;
 var atemp = new Array();
 var CrazyOutput;
 var i=-1;
 var countem;

 countem = document.getElementsByTagName('font');
 //alert (countem.length);

 while (i<=countem.length-3){
 //while (i<=100){ // 

 i=i+1;

 thecity2 = document.getElementsByTagName('font')[i].innerHTML;

  if (thecity2.indexOf(",") != -1) {
   atemp = thecity2.split(',');
  }
  else{
   atemp[0] = 'No Good';
   atemp[1] = 'No Good';
  }

  if (atemp[1].length == 4){
   aCrazyOutput = leftTrim(atemp[1]).replace(")", "");
  }
  else if (aCrazyOutput == undefined){
   aCrazyOutput = MainCity;
  }

 thecity3 = thecity2.replace("(", "");
 thecity4 = thecity3.replace(")", "");

 thecity5 = leftTrim(thecity4);

 if (thecity5 == '<a href="index100.html">next 100 postings</a>'){
  CrazyOutput = '<a href="index100.html">next 100 postings</a>';
  }
  else if (thecity5.indexOf(",") == -1) {
  CrazyOutput = '<a style="color:black; text-decoration:none" target="_blank" href="http://maps.google.com?q='+thecity5+', '+aCrazyOutput+'">' + thecity2 + '</a>';
  }
  else {
  CrazyOutput = '<a style="color:black; text-decoration:none" target="_blank" href="http://maps.google.com?q='+thecity5+'">' + thecity2 + '</a>';
  }

 document.getElementsByTagName('font')[i].innerHTML = CrazyOutput;
 }

