// ==UserScript==
// @id             wareki_converter
// @name           Wareki Converter
// @version        1.0.4
// @namespace      https://github.com/hatta
// @author         Tom Hatta
// @updateURL      https://userscripts.org/scripts/source/135131.meta.js
// @downloadURL    https://userscripts.org/scripts/source/135131.user.js
// @description    Replaces Japanese calendar years (e.g. "平成22年") with Gregorian calendar years (e.g. "2010年").
// @include_globs  http*://*
// @run_at         document_end
// ==/UserScript==

// anonymous function wrap
(function() {
  var jaYearPatternTrailing = "([元\\d０-９〇一二三四五六七八九十]+)年";

  // Does a pattern-based replace all on a plain text. Returns null if no replace occured.
  function replaceText(str, pattern, replaceFunc) {
    var latestIfAny = null;
    for (;;) {
      var matches = pattern.exec(str);
      if (matches == null) {
        return latestIfAny;
      }
      latestIfAny = str = str.replace(matches[0], replaceFunc(matches));
    }
  }
  // Does a pattern-based replace all on a DOM node tree recursively.
  function replaceTextContent(find, replaceFunc, element) {
    var nodes = element.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType == 3) {
        var result = replaceText(node.textContent, find, replaceFunc);
        if (result != null) {
          node.textContent = result;
        }
      } else {
        replaceTextContent(find, replaceFunc, node);
      }
    }
  }
  // Parse one- or two-digit Japanese numbers, for years.
  function parseJaInt(str) {
    if (str == '元') {
      return 1;
    }
    var result = 0;
    var index = str.indexOf('十');
    if (index != -1) {
      if (str == '十') {
        return 10;
      }
      if (index + 1 == str.length) {
        str = str.replace('十', '〇');
      } else if (index == 0) {
        str = str.replace('十', '一');
      } else {
        str = str.replace('十', '');
      }
    }
    for (var i = 0; i < str.length; i++) {
      var codePoint = str.charCodeAt(i);
      if (65296 <= codePoint && codePoint <= 65305) { // '０', '９'
        result = result * 10 + codePoint - 65296;
      } else if (48 <= codePoint && codePoint <= 57) {// '0', '9'
        result = result * 10 + codePoint - 48;
      } else {
        index = '〇一二三四五六七八九'.indexOf(str.charAt(i));
        if (index != -1) {
          result = result * 10 + index;
        }
      }
    }
    return result;
  }
  // Creates a function which converts years in Japanese.
  function createYearShiftFuncJa(diff) {
    return function(matches) {
      return (parseJaInt(matches[1]) + diff) + '年';
    }
  }
  // Creates a function which converts years in English.
  function createYearShiftFuncEn(diff) {
    return function(matches) {
      return (parseInt(matches[1]) + diff);
    }
  }

  // Japanese
  replaceTextContent(new RegExp("明治" + jaYearPatternTrailing, "g"), createYearShiftFuncJa(1867), document.body);
  replaceTextContent(new RegExp("大正" + jaYearPatternTrailing, "g"), createYearShiftFuncJa(1911), document.body);
  replaceTextContent(new RegExp("昭和" + jaYearPatternTrailing, "g"), createYearShiftFuncJa(1925), document.body);
  replaceTextContent(new RegExp("平成" + jaYearPatternTrailing, "g"), createYearShiftFuncJa(1988), document.body);
  // English
  replaceTextContent(/Meiji (\d+)/g, createYearShiftFuncEn(1867), document.body);
  replaceTextContent(/Taisho (\d+)/g, createYearShiftFuncEn(1911), document.body);
  replaceTextContent(/Showa (\d+)/g, createYearShiftFuncEn(1925), document.body);
  replaceTextContent(/Heisei (\d+)/g, createYearShiftFuncEn(1988), document.body);
})();