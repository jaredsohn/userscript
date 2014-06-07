// ==UserScript==
// @name           Blogger Help in English
// @namespace      http://www.kuribo.info/
// @description    Blogger Help in English
// @include        http://help.blogger.com/bin/*
// ==/UserScript==

(function() {
  var link;
  var title;
  if (location.href.match(/&hl=en$/)) {
    link  = RegExp.leftContext;
    title = "Japanese";
  } else {
    link = location.href + "&hl=en";
    title = "English";
  }
  var m3 = document.getElementById("m3");
  m3.innerHTML = '<div style="float:right;"><a href="' + link + '">' + title + '</a></div>' + m3.innerHTML;
})();