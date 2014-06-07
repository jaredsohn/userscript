/*

Binghamton BUSI Butler
(C) 2005 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

modified 2006-10-27
modified 2006-08-29
created 2005?

*/

// ==UserScript==
// @name          Binghamton BUSI Butler
// @description   Fixes up BUSI, which could use a whole lot of fixings
// @include       http*://busi.binghamton.edu/*
// ==/UserScript==

var rules = [
  { /// Add a meaningful title to section lists
    locationStart: 'http://busi.binghamton.edu/schedclass$ucrpweb.SECList?',
    callback: function() {
      var textNode = document.evaluate('//body/table//b//text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if(textNode) {
        document.title = textNode.nodeValue.replace(/\u00a0/g, ' ').replace(/^\s+/, '');
      }
    }
  },

  { /// Open the schedule of classes in the current window instead of a popup
    location: 'http://busi.binghamton.edu/',
    callback: function() {
      document.evaluate('//area[contains(@href, "openSCHED")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = '/schedbusi';
    }
  },

  { /// View the schedule of classes for the next unreleased term
    locationMatch: /http:\/\/busi\.binghamton\.edu\/sched(?:busi$|class)/,
    callback: function() {
      var termSelect = document.getElementsByName('IN_term')[0];
      var lastOption = 0;
      for(var c = 0, option; option = termSelect[c]; c++) {
        var value = parseInt(option.value, 10);
        if(value > lastOption) {
          lastOption = value;
        }
      }
      var newOption = document.createElement('option');
      switch(lastOption % 10) {
        case 1: // winter -> spring
          var value = lastOption + 1;
          newOption.appendChild(document.createTextNode('SPRING '));
          break;
        case 2: // spring -> summer
          var value = lastOption + 4;
          newOption.appendChild(document.createTextNode('SUMMER '));
          break;
        case 6: // summer -> fall
          var value = lastOption + 3;
          newOption.appendChild(document.createTextNode('FALL '));
          break;
        case 9: // fall -> winter
          var value = lastOption + 2;
          newOption.appendChild(document.createTextNode('WINTER '));
          break;
        default: // else don't add an option
          return;
      }
      newOption.value = value;
      newOption.appendChild(document.createTextNode(Math.floor(value / 10)));
      if(location.search.indexOf('IN_term=' + value) != -1) {
        newOption.selected = true;
      }
      newOption.style.color = 'red';
      newOption.style.fontStyle = 'italic';
      termSelect.appendChild(newOption);
    }
  }
]

var rule;
for(var c = 0; rule = rules[c]; c++) {
  if(!rule.callback) {
    continue;
  }
  if(rule.location && location.href != rule.location) {
    continue;
  }
  if(rule.locationStart && location.href.indexOf(rule.locationStart) != 0) {
    continue;
  }
  if(rule.locationMatch && !rule.locationMatch.test(location)) {
    continue;
  }

  // the setTimeout hack will let each callback execute, even if exceptions are thrown
  setTimeout(rule.callback, 0);
}
