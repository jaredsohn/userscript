// ==UserScript==
// @name           Sitemaps Generator for Blogger
// @namespace      http://www.kuribo.info/
// @description    Sitemaps Generator for Blogger
// @include        http://www.blogger.com/posts.g?*
// ==/UserScript==

(function () {
  var el = document.getElementsByTagName("a");
  var links = new Array();
  var message = "";
  for (var i = 0; i < el.length; i++) {
    if (el[i].target == "_new") {
      links[links.length] = el[i].href;
    }
  }
  for (var i = 0; i < links.length; i++) {
    message += links[i] + "\n";
  }
  if (links.length) {
    var top = links[0].replace(/[12][0-9]{3}\/[01][0-9]\/[^/]*$/, "");
    message = top + "\n" + message;
    document.body.innerHTML += "<form action=\"http://tools.kuribo.info/sitemap/\" method=\"post\" target=\"_blank\" style=\"margin:10px;\">\n<textarea name=\"link\" style=\"width:95%;\" rows=\"10\">" + message + "</textarea>\n<br />\n<input type=\"submit\" value=\"Create Sitemaps\" />&nbsp;&nbsp;&nbsp;<a href=\"http://www.kuribo.info/2006/04/sitemaps-generator-for-blogger.html\" target=\"_blank\">Sitemaps Generator for Blogger</a>\n</form>";
  }
})();
