// ==UserScript==
// @name           Habrahabr Filter
// @namespace      Habrahabr
// @include        http://habrahabr.ru/*
//////////////////////////////////////////////////////////////////////////////////////
// To remove filtering for a certain page add # to the end of a url, for example:   //
// http://habrahabr.ru/blogs/podcasts/123/#                                         //
//////////////////////////////////////////////////////////////////////////////////////
// ==/UserScript==
var votes = document.getElementsByClassName('score');
if (location.href.match(/(blogs|company|post).*(\/\d+\/|habracut|comments)$/)) {
  //jump to original if translation
  if (document.getElementsByClassName('original-author').length) {
    document.location = document.getElementsByClassName('original-author')[0].firstChild.nextSibling.href;
  }
  for (i = 1; i < votes.length; i++) {
    var vote = votes[i];
    if (!vote.firstChild.nextSibling && !vote.firstChild.innerHTML && !vote.innerHTML.match(/\+([3-9]\d|\d{3,})/)) { 
      var header = vote.parentElement.parentElement.parentElement;
      header.style.display = 'none';
      header.nextElementSibling.style.display = 'none';
      header.nextElementSibling.nextElementSibling.style.display = 'none';
    }
  }
}

if (document.location.href.match(/habrahabr\.ru\/((page\d+\/)?(\?fl=(hl|top))?|(tag\/.*)?|(blogs\/.*page.*)?)$/)) {
  var delay = 4000;
  for (i = 0; i < votes.length; i++) {
    setTimeout(function(vote) {
      vote.firstChild.nextSibling.onclick();
    }, 1000 + i * delay, votes[i]);
    setTimeout(function(vote) {
      var post = vote.parentElement.parentElement.parentElement;
      //leave only title
      post.firstChild.nextSibling.nextSibling.nextSibling.style.display = 'none';
      //remove posts with rating less than 40 
      if (!vote.firstChild.nextSibling.innerHTML.match(/\+([4-9]\d|\d{3,})/)) {
         post.style.display = 'none';
      }
    }, (i + 1) * delay, votes[i]);
  }
}

var iframes = document.getElementsByTagName('iframe');

for (i = 0; i < iframes.length; i++) {
  iframes[i].style.display = 'none';
}