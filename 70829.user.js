// ==UserScript==
// @name           twitter_user_page_opener
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    open twitter user pages when you double click string led by "@"
// @include        http://*
// @include        https://*
// ==/UserScript==
(function () {
  var openLimit = 3; // confirms when the script trys to open user pages more than this count at the same time.
  
  document.addEventListener("dblclick", function (e) {
    var ids = e.explicitOriginalTarget.textContent.match(/@\w+/g);
    if (ids.length <= openLimit || confirm("Open " + ids.length + " user pages.")) {
      for (var i = 0; i < ids.length; i++) {
        window.open("http://twitter.com/" + ids[i].substr(1), "_blank");
      }
    }
  },false);
})();
