// ==UserScript==
// @name           'BlogThis' to Selected Blog
// @namespace      http://www.kuribo.info/
// @description    'BlogThis' to Selected Blog
// @include        http://www.blogger.com/blog_this.pyra*blogId=*
// ==/UserScript==

(function() {
  if (location.href.match(/blogId=(\w+)/)) {
    var id = RegExp.$1;
    var s = document.getElementById("selectedBlogId");
    if (s) {
      var i;
      for (i = 0; i < s.options.length; i++) {
        if (s.options[i].value == id && !s.options[i].selected) {
          break;
        }
        if (i == s.options.length -1) {
          return;
        }
      }
      s.selectedIndex = i;
      
      var sc = document.createElement("script");
      sc.innerHTML = "changeBlog()\;";
      document.body.appendChild(sc)
    }
  }
})();
