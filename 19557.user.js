// ==UserScript==
// @name           OkCupid keyboard shortcuts
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/19557.user.js
// @description    Adds custom keyboard bindings to any web page
// @include        http://www.okcupid.com/*
// ==/UserScript==

// Map site name to path+query regexps, which, when matching those parts of the
// url visited, add keyboard bindings, as per its object literal's keys/values.
// Keys are the keyboard shortcut, values the XPath expression to the node that
// the shortcut will imply clicking.
var rules = {
  "www.okcupid.com":{
    "^/questions/ask":{
      "1":'id("qaAnswers")/input[@type="radio"][1]',
      "2":'id("qaAnswers")/input[@type="radio"][2]',
      "3":'id("qaAnswers")/input[@type="radio"][3]',
      "4":'id("qaAnswers")/input[@type="radio"][4]',
      "l":'id("is-public")',
      "k":'id("is-key")',

      "q":'id("qaMatchAnswersChoices")/input[@type="checkbox"][1]',
      "w":'id("qaMatchAnswersChoices")/input[@type="checkbox"][2]',
      "e":'id("qaMatchAnswersChoices")/input[@type="checkbox"][3]',
      "r":'id("qaMatchAnswersChoices")/input[@type="checkbox"][4]',

      "a":'id("qaMatchImportanceChoices")//input[@type="radio" and @value="5"]',
      "s":'id("qaMatchImportanceChoices")//input[@type="radio" and @value="4"]',
      "d":'id("qaMatchImportanceChoices")//input[@type="radio" and @value="3"]',
      "f":'id("qaMatchImportanceChoices")//input[@type="radio" and @value="2"]',
      "g":'id("qaMatchImportanceChoices")//input[@type="radio" and @value="1"]',

      "\x1B":'//input[@class="qaButton qaSkip" and @type="submit"]',  // ESC
      "\x0D":'//input[@class="qaButton qaSubmit" and @type="submit"]',// RETURN
      " ":'//input[@class="qaButton qaSubmit" and @type="submit"]',
      "b":'id("blogThis")/..'
    },

    "^/picturebrowsing":{
      "1":'//div[.=">" and @class="pbButtonPos"]',
      "2":'//div[.=">" and @class="pbButtonNeu"]',
      "3":'//div[.=">" and @class="pbButtonNeg"]',
      "4":'//div[.=">" and @class="pbButtonNo"]',

      "i":'//a[.="Flag Inappropriate"]',

      "q":'//div[.="^" and @class="pbButtonPos"]',
      "w":'//div[.="^" and @class="pbButtonNeu"]',
      "e":'//div[.="^" and @class="pbButtonNeg"]',
      "r":'//div[.="^" and @class="pbButtonNo"]',
    },

    "^/profile\\?":{
      "w":'//a[@class="profileTopBTN woo"]',
      "m":'//a[@class="profileTopBTN msg"]',
      "1":'id("profileTabsBasics")',
      "2":'id("profileTabsJournal")',
      "3":'id("profileTabsPics")',
      "4":'id("profileTabsTests")',
      "5":'id("profileTabsComments")',
      "i":'//a[starts-with(.,"Improve your rating with ")]'
    }
  }
};

var listen = false;
var bindings = {}; // all bindings to apply on this page

var host = location.hostname.toLowerCase();
var path = location.pathname + location.search;
var data = rules[host] || {};

//try {
  for (var test in data) {
    if (path.match(new RegExp(test))) {
      var keys = data[test];
      for (var key in keys) {
        listen = true;
        var node = $X(keys[key]);
        if (node && !bindings.hasOwnProperty(key)) {
          bindings[key] = keys[key];
          var name = {"\x0D":"Return","\x1B":"Escape"," ":"Space"}[key] || key;
          var title = "Keyboard shortcut: ";
          if ((node.title||"").indexOf(title) == 0)
            node.title += ", or " + name;
          else
            node.title = title + name;
        }
      }
    }
  }
  if (listen) {
    document.addEventListener("keypress", keyListener, true);
  }
//} catch(e) {}

function keyListener(event) {
  var node = event.target;
  if (node.nodeName.match(/^(input|textarea)$/i) ||
      event.ctrlKey || event.altKey || event.metaKey)
    return; // don't intercept textarea/text input field input, or control keys
  var key = String.fromCharCode(event.charCode || event.keyCode);
  var act = bindings[key];
  if (act) {
    node = $X(act);
    click(node);
    event.preventDefault();
    event.stopPropagation();
  }
}

function click(node) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent("click", true, true, node.ownerDocument.defaultView,
                       1, 0, 0, 0, 0, false, false, false, false, 0, node);
  node.dispatchEvent(event);
  if (node.nodeName.toLowerCase() == "a" && node.href)
    location.href = node.href;
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

// list nodes matching this expression, optionally relative to the node `root'
function $x( xpath, root, type ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, type, null ), result = [];
  switch( got.resultType ) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while( next = got.iterateNext() )
	result.push( next );
      return result;
  }
}
