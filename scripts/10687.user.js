// ==UserScript==

// @name            Google Position Tracker
// @author          Barry Hand <http://www.barryhand.com/>
// @description     Adds an easy to see red number beside each search result in google, allowing you to easily see which position a website is at
// @include         http://google.*/*
// @include         http://www.google.*/*

// ==/UserScript==

(function() {
  var ps = document.getElementsByTagName('li');
  var spans = document.getElementsByTagName('span');
  var page = 0;
  var count = -1;
  var num = window.location.href.match("num=([0-9]+)");

  num = (num == null)? 10 : num[1];

  for (var i = 0, span; span = spans[i]; i++)
    if (span.className == 'i')
      page = span.innerHTML - 1;

  for (var i = 0, p; p = ps[i]; i++)
    if (p.className == 'g'){
      count++;
      p.innerHTML = '<strong><span style="color: red">' + ((count + 1) + (page * num)) + '. </span></strong>' + ps[i].innerHTML;
    }

})();