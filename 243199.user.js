//           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//                   Version 2, December 2004
//
//Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
//
//Everyone is permitted to copy and distribute verbatim or modified
//copies of this license document, and changing it is allowed as long
//as the name is changed.
//
//           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
//
// 0. You just DO WHAT THE FUCK YOU WANT TO.

// ==UserScript==
// @name        Duolingo toggle word practice
// @namespace   duolingo.arekolek.com
// @description Allows you to remove or add a word to practice, after you practice it
// @include     http://www.duolingo.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     1.0
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

function toggleIndicator(indicator, data) {
  indicator.attr(data.dnp
    ? { 'data-original-title': 'Removed from practice', 'style': 'color:#c00; cursor:pointer;' }
    : { 'data-original-title': 'Included in practice', 'style': 'color:#0c0; cursor:pointer;' }
    ).text(data.dnp ? '✖' : '✔')
    .click(function(){
      indicator.unbind('click');
      var action = '/words/{0}/{1}/{2}'.format(data.id, data.pos_key, data.dnp ? 'allow' : 'dnp');
      $.post(action, function() {
        data.dnp = !data.dnp;
        toggleIndicator(indicator, data);
      });
    });
}

function getUrl(word, dict) {
  var url;
  dict.vocab.forEach(function(w){
    w.forms_data.forEach(function(f) {
      if(word == f.surface_form) {
        url = '/words/{0}/{1}/{2}'.format(w.language, w.surface_form, f.pos_key);
      }
    });
  });
  return url;
}

var observer = new MutationObserver(function(mutations) {
  if(window.location.pathname == '/vocab') {
    mutations.forEach(function(mutation) {
      for (var i = 0; i < mutation.addedNodes.length; ++i) {
        var node = $(mutation.addedNodes[i]);
        node.find('span.has-twipsy').remove();
        node.find('a.lemma').each(function(){
          var T = $(this);
          var url = '{0}?_={1}'.format(T.attr('href').replace('/#/word/', '/words/'), new Date().getTime());
          $.getJSON(url, function(data) {
            var e = $('<span class="has-twipsy" />');
            e.insertBefore(T);
            T.before(" ");
            toggleIndicator(e, data);
          });
        });
      }
    });
  } else if(window.location.pathname == '/practice') {
    mutations.forEach(function(mutation) {
      for (var i = 0; i < mutation.addedNodes.length; ++i) {
        var node = $(mutation.addedNodes[i]);
        if(node.find('div.words-diploma').size() == 1) {
          $.getJSON('http://www.duolingo.com/words?page=1&sort_by=last_seen&desc=false', function(vocab) {
            node.find('.words-strengthened > li > span').each(function(){
              var T = $(this);
              $.getJSON(getUrl(T.text(), vocab), function(data) {
                var e = $('<span class="has-twipsy" />');
                e.insertAfter(T);
                T.after(" ");
                toggleIndicator(e, data);
              });
            });
          });
        }
      }
    });
  }
});
 
observer.observe(document.querySelector('#wrapper'), { childList: true, subtree: true });
