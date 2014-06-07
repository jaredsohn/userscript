// ==UserScript==
// @name           Reddit Up/Down Chart
// @namespace      http://diehealthy.org/
// @description    Uses Google Chart API to draw a pie chart for votes on submissions to Reddit.com
// @include        http://www.reddit.com/r/*/comments/*
// ==/UserScript==

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
  var ups = new Number($('.upvotes')[0].firstChild.innerHTML.replace(',',''));
  var downs = new Number($('.downvotes')[0].firstChild.innerHTML.replace(',',''));
  var total = ups + downs;

  var pct1 = 100 * (ups / total);
  var pct2 = 100 - pct1;

  var osib = $('.linkinfo')[0];
  var parent = osib.parentNode;

  var chart_link = "http://chart.apis.google.com/chart?cht=p3&chd=t:" + pct1 + "," + pct2 + "&chs=250x100&chco=FA540A,5F99CF&chl=Ups|Downs";

  var img = document.createElement('img');
  img.src = chart_link
  parent.appendChild(img);
}
