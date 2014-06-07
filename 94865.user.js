// ==UserScript==
// @name          4chan Classic
// @namespace     http://userstyles.org
// @description	  Yotsuba Style
// @author        Anon
// @homepage      http://
// @include       http://boards.4chan.org/b/*
// ==/UserScript==


(function loadcssfile(){
  var fileref = document.getElementsByTagName("link");
    fileref[0].setAttribute("href", "http://static.4chan.org/css/yotsuba.9.css");
    fileref[1].setAttribute("href", "http://static.4chan.org/css/yotsuba.9.css");
    fileref[2].setAttribute("href", "http://static.4chan.org/css/yotsuba.9.css");
})();