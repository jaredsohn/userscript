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
// @name        Duolingo total word strength indicator
// @namespace   duolingo.arekolek.com
// @description Adds a percentage indicator to "Lesson practice" button
// @include     http://www.duolingo.com/*
// @grant       none
// @version     1.4
// ==/UserScript==

function executeOnPage(fn) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + fn + ')();';
  document.body.appendChild(script); // run the script
  document.body.removeChild(script); // clean up
}

function setStrength() {
  var strength = duo.user.attributes.language_data[duo.user.attributes.learning_language].language_strength*100;
  var button = document.querySelector('#overall-progress > .practice-section > .practice-button');
  if(button) button.textContent = "Lesson practice {0}%".format(Math.round(strength));
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

var tabObserver = new MutationObserver(function(mutations) {
  mutations.some(function(mutation) {
    for (var i = 0; i < mutation.addedNodes.length; ++i) {
      var node = mutation.addedNodes[i];
      if(node.id == 'app' && node.className == 'home') {
        setStrength();
        return true;
      }
    }
  });
});
 
tabObserver.observe(document.querySelector('#wrapper'), { childList: true });

var langObserver = new MutationObserver(function(mutations) {
  mutations.some(function(mutation) {
    for (var i = 0; i < mutation.addedNodes.length; ++i) {
      var node = mutation.addedNodes[i];
      if(node.id == 'topbar') {
        langObserver.disconnect();
        langObserver = new MutationObserver(function(mutations){
          setStrength();
        });
        langObserver.observe(node, { childList: true });
        return true;
      }
    }
  });
});

langObserver.observe(document.querySelector('body'), { childList: true });
