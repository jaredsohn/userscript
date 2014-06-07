// ==UserScript==
// @name           Motsu Tabetai
// @namespace      http://ikenie.com/
// @include        *
// @require        http://gist.github.com/raw/3242/1a7950e033a207efcfc233ae8d9939b676bdbf46
// @require        http://gist.github.com/raw/34615/04333b7e307eb029462680e4f4cf961f72f4324c
// ==/UserScript==

(function() {
  var DATABASE_URL = 'http://wedata.net/databases/Motsu/items.json';
  var map = {}, words = [], ignoredwords = {};

  setTimeout(function() {
    if (window.AutoPagerize && window.AutoPagerize.addDocumentFilter) {
      window.AutoPagerize.addDocumentFilter(motsu);
    }
  }, 0);
  
  (GM_getValue('ignoredwords') || '')
    .split(/\s+/)
    .forEach(function(term) {
    if(term != '')
      ignoredwords[term] = 1;
  });
  
  function replacer(str) {
    if(!map[str])
      return str;

    if(map[str].image_url) {
      return '<img class="motsu" src="'
        + h(map[str].image_url)
        + '" alt="'
        + h(str)
        + '" title="'
        + h(str)
        + '" />';
    } else if(map[str].string) {
      return '<span class="motsustring" title="'
        + h(str)
        + '">'
        + h(map[str].string)
        + '</span>';
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
  
  function motsu(doc) {
    var re = new RegExp(words.join('|'));
    var matched_re = new RegExp(words.join('|'), 'g');

      $X('//text()', doc).forEach(function(textNode) {
        var data = textNode.data;

        if(textNode.parentNode.tagName.match(/^(NOSCRIPT|SCRIPT|STYLE)/))
          return;

        if(data.match(re)) {
          var replaced = data.replace(matched_re, replacer);
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
      if ('undefined' == typeof(ignoredwords[item.name])) {
        map[item.name] = item.data;
      }
    });

    for(var i in map) {
      words.push(i);
    }
    
    motsu(document);
  });

  GM_registerMenuCommand('Motsu Tabetai - clear cache', function() {
    database.clearCache();
  });
  
  GM_registerMenuCommand('Motsu Tabetai - ignore words', function() {
    GM_setValue(
      'ignoredwords',
      window.prompt(
        'space separated',
        GM_getValue('ignoredwords')
      )
    );
    database.clearCache();
  });
})();
