// ==UserScript==
// @name           Google user bar grows correctly
// @namespace      http://guznik.com/scripts
// @description    Google user bar on Google's main page grows correctly when zooming
// @include        http://www.google.com/*
// ==/UserScript==




function setRuleStyle(sClassName, sRule) {
  var sheets = document.styleSheets;
  var rules;
  var styleObj;
  for (i = 0; i < sheets.length; i++) {
    rules = sheets[i].cssRules || sheets[i].rules;
    for (var j = 0; j < rules.length; j++) {
      if (rules[j].selectorText && rules[j].selectorText.indexOf(sClassName) != -1) {
        styleObj = rules[j].style.cssText = sRule
        break;
      }
    }
  }
}

setRuleStyle("#gbh", "position: absolute; width: 200%; border-top:1px solid #C9D7F1; top:1.4em;");