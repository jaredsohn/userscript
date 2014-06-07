// ==UserScript==
// @name            Baidu x Stylish Fix
// @namespace       https://greasyfork.org/users/4
// @description     Restore Stylish styles from deletion on baidu.com
// @version         1.1
// @author          LouCypher, modify by Maplerecall
// @match           *://www.baidu.com/*
// @run-at          document-end
// ==/UserScript==

function addStyle(id, css) {
  var style = document.createElement("style");
  style.type = "text/css";
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

function checkForStylish() {
  return document.head.querySelectorAll('style[id^="stylish"]');
}

var styles = checkForStylish();
//console.log(styles.length);
if (styles.length) {
  var stylish = [];
  for (var i = 0; i < styles.length; i++) {
    stylish[i] = {};
    stylish[i].id = styles[i].id;
    stylish[i].css = styles[i].textContent;
  }
}

new (WebKitMutationObserver)(function(aMutations) {
  aMutations.forEach(function(aMutation) {
    if (aMutation.removedNodes.length)
      if (styles.length && !checkForStylish().length) {
        for (var i in stylish) {
          addStyle(stylish[i].id, stylish[i].css);
        }
      }
  });
}).observe(document.head, {childList:true});
