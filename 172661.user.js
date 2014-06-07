// ==UserScript==
// @name        Badass Digest: Force Film Crit Hulk articles to lowercase
// @namespace   http://userscripts.org/users/aankhen
// @include     http://badassdigest.com/*
// @version     1
// ==/UserScript==

var primary = document.getElementById('primary');

if (!primary) return;

var articles = primary.getElementsByTagName('article');

for (var i = 0, j = articles.length; i < j; i++) {
  var current = articles[i];
  console.log(current);
  var meta = current.getElementsByClassName('entry-meta')[0];
  console.log(meta);
  var author = meta.getElementsByTagName('a')[0].text;
  console.log(author);

  if (author === "Film Crit Hulk") {
    current.getElementsByClassName('entry')[0].style.textTransform = 'lowercase';
  }
}