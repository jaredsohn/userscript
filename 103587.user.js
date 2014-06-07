// ==UserScript==
// @name         Novinky.cz: Přesměrování článku z mobilní na "normální" verzi
// @namespace    http://spaceport.cz/greasemonkey/
// @description  Při otevření odkazu na článek na Novinky.cz ve verzi pro mobilní telefon dojde k přesměrování na jeho "normální" verzi.
// @include      http://m.novinky.cz/articleDetails?*
// ==/UserScript==

function for_ (a, f) {
  var r;
  for (var i = 0, l = a.length; i < l; ++i) {
    r = f.call(this, a[i], i, a);
    if (r || 0 == r || false == r) {
      return r;
    }
  }
}

function getSearch (searchString) {
  var o = {};
  if (!searchString) {
    searchString = location.search.substring(1);
  }
  for_(searchString.split('&'), function (el) {
    var s = el.split('=');
    o[s[0]] = unescape(s[1]);
  });
  return o;
}

function construct () {
  var params = getSearch();
  console.info(params);
  if (!params.hasOwnProperty('aId')) {
    return false;
  }
  location.href = ['http://www.novinky.cz/', params['aId'], '-article.html'].join('');
}

construct();
