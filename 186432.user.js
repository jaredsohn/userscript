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
// @name        Export duolingo vocabulary
// @namespace   duolingo.arekolek.com
// @include     http://www.duolingo.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     1.2
// ==/UserScript==

function GM_main ($) {

this.$ = this.jQuery = jQuery.noConflict(true);

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var buttonAdded = false;

var observer = new MutationObserver(function(mutations) {
  if(window.location.pathname == '/') {
    mutations.some(function(mutation) {
      for (var i = 0; i < mutation.addedNodes.length; ++i) {
        var node = mutation.addedNodes[i];
        if(node.id == 'ranking') {
          buttonAdded = false;
          return true;
        }
      }
    });
    if(!buttonAdded) {
      var box = $('.strenghten-skills-container');
      if(box) {
        buttonAdded = true;
        $('<a id="export-button" class="btn btn-standard btn-block btn-lg" href="javascript:;">Export</a>')
          .css({marginTop:'15px', fontSize: '16px'})
          .click(exportVocab)
          .appendTo(box);
      }
    }
  } else {
    buttonAdded = false;
  }
});
 
observer.observe(document.querySelector('body'), { childList: true, subtree: true });

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

function getWordsPage(page, words, count) {
  words = words || [];
  count = count || 0;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState==4 && xmlhttp.status==200) {
      var json = JSON.parse(xmlhttp.responseText);
      var w = json.vocab.map(function (word) {
        return word['forms_data'].map(function (form) {
          return [form['surface_form'], form['pos_key'], form['skill']['short'], form['strength'].toFixed(8)];
        });
      });
      words = [].concat.apply(words, w);
      count += json.vocab.length;
      if (json.vocab.length == 0) {
        words = words.filter(function(el,i,a){if(i==a.indexOf(el))return 1;return 0});
        $('#export-button').text("Ready").click(function(){displayVocab(words)});
      } else {
        $('#export-button').text("Exporting... {0}%".format(Math.round(100*count/json.vocab_count)));
        getWordsPage(page+1, words, count);
      }
    }
  };
  xmlhttp.open("GET",
    "http://www.duolingo.com/words?page={0}&sort_by=word&desc=false&_={1}".format(page, new Date().getTime()),
    true);
  xmlhttp.send();
}

function exportVocab(){
  $('#export-button').text("Exporting... 0%").unbind('click');
  getWordsPage(1);
}

function displayVocab(words){
  var t = $('<textarea style="height: 400px; width: 520px; float: left; position:relative;"></textarea>');
  var v = $('.skill-tree');
  var e = $('#export-button');
  t.val(words.join('\n')).insertBefore(v.hide());
  e.text("Done").unbind('click').click(function(){
    t.remove();
    v.show();
    e.text("Export").unbind('click').click(exportVocab);
  });
}
  
}

if (typeof jQuery === "function") {
  GM_main (jQuery);
}
else {
  add_jQuery (GM_main, "1.9.1");
}

function add_jQuery (callbackFn, jqVersion) {
    var jqVersion   = jqVersion || "1.7.2";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'http://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}
