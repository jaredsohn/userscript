// ==UserScript==
// @name           Dirty.ru Filter
// @namespace      Dirty.ru
// @description    Deletes comments with rating less than 250 and posts with rating less than 500
// @include        http://dirty.ru/*
// @include        http://www.dirty.ru/*
// ==/UserScript==
var votes = document.getElementsByClassName('vote_result');

if (document.location.href.match(/dirty\.ru\/$/)) {
  for (i = 0; i < votes.length; i++) {
    if (votes[i].innerHTML < 1000) {
          votes[i].parentElement.parentElement.parentElement.style.display = 'none';
    }
  }
} else {
  for (i = 1; i < votes.length; i++) {
    if (votes[i].innerHTML < 300) {
        votes[i].parentElement.parentElement.parentElement.style.display = 'none';
    }
  }
}