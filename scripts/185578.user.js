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
// @name        Duolingo weak words counter
// @namespace   duolingo.arekolek.com
// @description Display a counter of your weak words next to Vocabulary navigation link
// @include     http://www.duolingo.com/*
// @grant       none
// @version     1.6
// ==/UserScript==

var WORDS_URL = "http://www.duolingo.com/words?page={0}&sort_by=strength&desc=false&_={1}";

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

function isTrue(b) {
  return b;
}

function isFormWeak(threshold) {
  return function (form) {
    return form['strength'] < threshold;
  };
}

function isWordWeak(threshold) {
  var isWeak = isFormWeak(threshold);
  return function (word) {
    return word['forms_data'].map(isWeak).some(isTrue);
  };
}

function getWeak(words, threshold) {
  var isWeak = isWordWeak(threshold);
  return words.filter(isWeak);
}

function needsPractice(word) {
  return !word.dnp;
}

function displayCount(count) {
  document.querySelector('#vocab-nav > a:nth-child(1)').textContent = "Vocabulary ({0})".format(count);
}

function getWordsPage(page, total) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState==4 && xmlhttp.status==200) {
      var json = JSON.parse(xmlhttp.responseText);
      var weak = getWeak(json['vocab'], 0.625);
      total += weak.filter(needsPractice).length;
      if (weak.length < 20) {
        displayCount(total);
      } else {
        displayCount(">" + total);
        getWordsPage(page+1, total);
      }
    }
  };
  xmlhttp.open("GET", WORDS_URL.format(page, new Date().getTime()), true);
  xmlhttp.send();
}

var observer = new MutationObserver(function(mutations) {
  mutations.some(function(mutation) {
    for (var i = 0; i < mutation.addedNodes.length; ++i) {
      var node = mutation.addedNodes[i];
      if(node.id == 'topbar') {
        observer.disconnect();
        getWordsPage(1, 0);
        observer = new MutationObserver(function(mutations){
          getWordsPage(1, 0);
        });
        observer.observe(node, { childList: true });
        return true;
      }
    }
  });
});

observer.observe(document.querySelector('body'), { childList: true });

