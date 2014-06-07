// ==UserScript==

// @name            Google Counter
// @author          Bruno Torres <http://brunotorres.net/>
// @namespace       http://brunotorres.net/greasemonkey/
// @description     Adds an ordinal number at the left side of each search result on Google results pages. It's useful if you want to know promptly what position your site is in, whithout counting results "by hand".
// @include         http://google.*/*
// @include         http://www.google.*/*

// ==/UserScript==

(function() {
  var ps = document.getElementsByTagName('p');
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
      p.innerHTML = '<strong>' + ((count + 1) + (page * num)) + '. </strong>' + ps[i].innerHTML;
    }

})();
