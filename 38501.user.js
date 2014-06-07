// ==UserScript==
// @name           Hakataben
// @namespace      http://d.hatena.ne.jp/jazzanova/
// @include        *
// @require        http://gist.github.com/raw/3242/1a7950e033a207efcfc233ae8d9939b676bdbf46
// @require        http://gist.github.com/raw/34615/04333b7e307eb029462680e4f4cf961f72f4324c
// ==/UserScript==
// via: Motsu Tabetai http://userscripts.org/scripts/show/38398

(function() {
  var DATABASE_URL = 'http://wedata.net/databases/HakataBen/items.json';
  var map = {}, words = [];

  function replacer(str) {
    if(map[str].string) {
      return h(map[str].string);
    } else {
      return str;
    }
  }

  function h(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;');
  }

  function hakataben(doc) {
      $X('//text()', doc).forEach(function(textNode) {
        var data = textNode.data;

        if('noscript script style'.toUpperCase().split(/\s+/).some(function(tagName) {
          return textNode.parentNode.tagName == tagName;
        })) {
          return;
        }

        if(data.match(words.join('|'))) {
          var replaced = data.replace(new RegExp(words.join('|'), 'g'), replacer);
          var div = document.createElement('div');
          var range = document.createRange();

          div.innerHTML = replaced;
          range.selectNodeContents(div);
          var df = range.extractContents();
          range.setStartBefore(textNode);
          range.insertNode(df);
          range.selectNode(textNode);
          range.deleteContents();
        }
      });
  }

  var database = new Wedata.Database(DATABASE_URL);

  if(document.referrer.match(/http:\/\/wedata\.net\/.*\/[new|edit]/) &&
     document.location.href.match(/http:\/\/wedata\.net\/items\/\d+/)) {
       database.clearCache();
       database = new Wedata.Database(DATABASE_URL);
  }

  database.get(function(items) {
    items.forEach(function(item) {
      map[item.name] = item.data;
    });

    for(var i in map) {
      words.push(i);
    }
    hakataben(document);
  });

  GM_registerMenuCommand('Hataka Ben - clear cache', function() {
    database.clearCache();
  });

  setTimeout(function() {
    if (window.AutoPagerize && window.AutoPagerize.addDocumentFilter) {
      window.AutoPagerize.addDocumentFilter(hakataben);
    }
  }, 0);
})();


