// ==UserScript==
// @name           Force CustomButtons2.com links to English
// @namespace      http://projects.izzysoft.de/
// @description    Fix the 404 error on that page
// @version        1.0.2
// @include        http://custombuttons2.com/*?q=*
// @exclude        http://custombuttons2.com/en/*
// @exclude        http://custombuttons2.com/en-us/*
// @exclude        http://custombuttons2.com/*q=en-us/*
// @exclude        http://custombuttons2.com/*q=en/*
// ==/UserScript==

var searchterm;
while (true) {
  searchterm  = /(http:\/\/custombuttons2.com\/.*?\?q\=)\w{2}-\w{2}\/403(.*)/;
  if (searchterm.test(location.href)) {
    location.href = location.href.replace(/(http:\/\/custombuttons2.com\/.*?\?q\=)\w{2}-\w{2}(.*)/,"$1en-us/forum");
    break;
  }
  searchterm  = /(http:\/\/custombuttons2.com\/.*?\?q\=)\w{2}-\w{2}(.*)/;
  if (searchterm.test(location.href)) {
    location.href = location.href.replace(/(http:\/\/custombuttons2.com\/.*?\?q\=)\w{2}-\w{2}(.*)/,"$1en-us$2");
    break;
  }
}