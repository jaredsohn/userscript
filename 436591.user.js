// ==UserScript==
// @id             github-repo-sort@spiralx.org
// @name           GitHub repository list sort
// @description    Adds options to sort a user's repositories by name/language/stars/score
// @version        1.0
// @namespace      http://spiralx.org
// @author         James Skinner
// @include        https://github.com/*?tab=repositories*
// @run-at         document-end
// @require        http://code.jquery.com/jquery-2.1.0.js
// @require        https://raw.github.com/Sjeiti/TinySort/master/dist/jquery.tinysort.min.js
// ==/UserScript==

(function(window, document, $, undefined) {


  /**
   * fmt('x={0}, y={1}', 12, 4) -> 'x=12, y=4'
   * fmt('x={x}, y={y}', { x: 12, y: 4 }) -> 'x=12, y=4'
   * fmt('x={x}, y={{moo}}', { x: 12, y: 4 }) -> 'x=12, y={moo}'
   * fmt('{x}: {y.thing}', { x: 'foo', y: { thing: 'bar' }}) -> 'foo: bar'
   * fmt('{x}: {y.a[1]}', { x: 'foo', y: { thing: 'bar', a: [6, 7] }}) -> 'foo: 7'
   * fmt('{0[2]}, {0[-2]}', [{ x: 12, y: 4 }, 7, 120, 777, 999]) -> '120, 777'
   * fmt('{0[-5].y}', [{ x: 12, y: 4 }, 7, 120, 777, 999]) -> '4'
   * fmt('{a[-5].x}', {a: [{ x: 12, y: 4 }, 7, 120, 777, 999]}) -> '12'
   */
  function fmt(format, data) {
    data = arguments.length == 2 && typeof data === "object" && data.constructor !== Array
      ? data
      : [].slice.call(arguments, 1);

    return format
      .replace(/\{\{/g, String.fromCharCode(0))
      .replace(/\}\}/g, String.fromCharCode(1))
      .replace(/\{([^}]+)\}/g, function(match, path) {
        try {
          var p = path.replace(/\[(-?\w+)\]/g, '.$1').split('.');
          //console.log('path="%s" (%s), data=%s', path, p.toSource(), data.toSource());
          return String(p.reduce(function(o, n) {
            return o.slice && !isNaN(n) ? o.slice(n).shift() :  o[n];
          }, data));
        }
        catch (ex) {
          return match;
        }
      })
      .replace(/\x00/g, "{")
      .replace(/\x01/g, "}");
  }


  var top_langs = {};
  ('JavaScript CoffeeScript TypeScript HTML Jade Mako Markdown CSS Stylus Less Sass SCSS BatchFile Shell' +
    ' Python XML XSLT XQuery XProc XS YAML').split(' ').forEach(function(v, i) { top_langs[v] = i });
  var unknown_lang = Object.keys(top_langs).length;
    
  //console.dir(top_langs);
  
  var orders = {
    language: {
      text: 'Language',
      order: [{ data: 'lang' }, '.repolist-name']
    },
    name: {
      text: 'Name',
      order: ['.repolist-name']
    },
    stars: {
      text: 'Stars',
      order: [{ data: 'stars', order: 'desc' }, '.repolist-name']
    },
    score: {
      text: 'Score',
      order: [{ data: 'score', order: 'desc' }, '.repolist-name']
    }
  };
  
  var $list = $('.js-repo-list > li');
  

  function fo(o) {
    var od = orders[o] 
      $a = $('<a class="repo_order js-repo-order-tab">' + od.text + '</a>');
      
    $a.click(function(ev) {
      //console.log(o, od.text, od.order);
      $.fn.tsort.apply($list, od.order);
      return false;
    });
    
    return $('<li>').append($a);
  }

  var $ro = $('<ul class="repo_orderer" style="float: right; margin-top: 8px">');
  'language name stars score'.split(' ').forEach(function(k) {
    $ro.append(fo(k));
  });

  $('.js-repo-filter .repo_filterer')
    .before($ro)
    .before('<span style="float: right; margin: 8px 0 0 9px">|</span>')
    .add($ro)
      .find('a')
        .css('font-size', '0.8em');


  $list.each(function() {
    var $li = $(this),
      name = $li.find('.repolist-name').text().trim(),
      language = $li.find('.language').text().trim(),
      lang = typeof top_langs[language] !== 'undefined' ? top_langs[language] : unknown_lang,
      stars = parseInt($li.find('.stargazers').text().trim()),
      forks = parseInt($li.find('.forks').text().trim()),
      score = lang * -1000 + stars * 10 + forks;
      
    //console.info(fmt('{name}: lang={lang}, stars={stars}, forks={forks}, score={score}', { name: name, lang: lang, stars: stars, forks: forks, score: score }));
    
    //$li.attr('data-name', name);
    //$li.attr('data-language', language);
    $li.attr('data-lang', lang);
    $li.attr('data-forks', forks);
    $li.attr('data-stars', stars);
    $li.attr('data-score', score);
  });
    
  $.fn.tsort.apply($list, orders.score.order);
    

})(window, document, jQuery);
