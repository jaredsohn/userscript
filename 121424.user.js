// ==UserScript==
// @name		Use Google Search on Reddit
// @description	This script overrides the default Reddit search and uses Google. Automatically appends site:google.com, and tries to correctly search subreddits when specified. Does not support advanced search operators. FF fix thanks to redditor datr. Expanded @match and @includes courtesy of redditor nallar.
// @namespace	http://userscripts.org/users/119115
// @include      http://reddit.com/*
// @include      http://www.reddit.com/*
// @exclude      http://www.redditmedia.com/*
// @match        http://reddit.com/*
// @match        http://www.reddit.com/*
// ==/UserScript==
document.getElementById("search").addEventListener('submit', function(e) {
  e.target.action = "http://www.google.com/search";
  var domain = " site:reddit.com";
  if(e.target.elements[1] && e.target.elements[1].checked){
    domain += "/r/" + location.pathname.split("/")[2];
  }
  e.target.elements[0].value += domain;
}, true);
