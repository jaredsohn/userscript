// ==UserScript==
// @name           Make Brizzly Trends Box Collapsible
// @namespace      http://userscripts.org/users/108975
// @include        http://brizzly.com/*
// @include        http://*.brizzly.com/*
// ==/UserScript==

var trendsbox = null;
var trends = null;
var trendwarning = null;
var trendheader = null;
var trendtitle = "Trends and news";
var divs = document.getElementsByTagName('div');
for (var i=0; i<divs.length; i++) {
  if (divs[i].className.match('section') && divs[i].className.match('trends'))
    trendsbox = divs[i];
}

function toggleIt() {
  if (trends) {
    if (trends.style.display == 'none') {
      trends.style.display = '';
      trendwarning.style.display = 'none';
      trendheader.innerHTML = '<b>&#9662;</b> ' + trendtitle;
    } else {
      trends.style.display = 'none';
      trendwarning.style.display = '';
      trendheader.innerHTML = '<b>&#9656;</b> ' + trendtitle;
    }
  }
}

if (trendsbox) {
  for(var i=0; i<trendsbox.childNodes.length; i++) {
    if (trendsbox.childNodes[i].className) {
      if (trendsbox.childNodes[i].className.match('header')) {
        trendheader = trendsbox.childNodes[i];
        trendtitle = trendheader.innerHTML;
        trendheader.innerHTML = '<b>&#9662;</b> ' + trendtitle;
        trendheader.addEventListener('click',toggleIt,true);
        trendheader.style.cursor = 'pointer';
      } else if (trendsbox.childNodes[i].className.match('content')) {
        trends = trendsbox.childNodes[i];
      }
    }
  }

  trendwarning = document.createElement('div');
  trendwarning.style.display = 'none';
  trendwarning.className = 'trend row r';
  trendwarning.innerHTML = '<div style="padding: 6px 12px 3px 12px; font-size: 12px; cursor: pointer;">Brizzly explains the current trending topics on Twitter using data from LetsBeTrends.com and WhatTheTrend.com.  Click me again to see this useful info!</div>';
  trendwarning.addEventListener('click',toggleIt,true);
  trendsbox.appendChild(trendwarning);
} 

