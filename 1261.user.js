// ==UserScript==
// @name          Mozilla Links
// @namespace     http://loucypher.cjb.net/
// @include       http://www.mozilla.org/*
// @include       http://mozilla.org/*
// @exclude       http://www.mozilla.org/book/*
// @exclude       http://www.mozilla.org/start/1.5/faq/*
// @exclude       http://www.mozilla.org/xpfe/themovie.html*
// @description	  adds links to projects, wiki, and devmo on the header
// ==/UserScript==
// Changelog:
// 20050723
// - Changed developer-test.mozilla.org to developer.mozilla.org

(function() {
  var header = document.getElementById('header');
  var menu = {
    injectList:function(list, menuId) {
      li = document.createElement('li');
      li.innerHTML = list;
      header.getElementsByTagName('ul')[0].insertBefore(li, menuId);
    }
  }

  var about = document.getElementById('menu_aboutus');
  var developers = document.getElementById('menu_developers');
  var store = document.getElementById('menu_store');
  var support = document.getElementById('menu_support');
  var products = document.getElementById('menu_products');

  var projects = '<a href="/projects/" title="Mozilla Projects">Projects</a>';
  var devmo = '<a href="http://developer.mozilla.org/" title="Mozilla Developer">Devmo</a>';
  var wiki = '<a href="http://wiki.mozilla.org/" title="Mozilla Wiki">Wiki</a>';

  menu.injectList(projects, products);
  menu.injectList(wiki, about);
  menu.injectList(devmo, about);

/*hides about and store menu (optional)
  about.style.display = 'none;';
  store.style.display = 'none;';
*/

})();

