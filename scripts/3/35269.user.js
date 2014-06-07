// ==UserScript==
// @name           Wider Gmail Message View
// @description    Remove the (irrelevant) ads sidebar from Gmail message view allowing more width for the actual message.
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==

var widerGmailMessageViewTargetCSSRule;

document.addEventListener("DOMNodeInserted",
  function(evt) {
    if (evt.target.className == "T1HY1 XoqCub MMcQxe") {
      var column = document.evaluate(".//td[@class='tELAdc' and position()=3]", evt.target, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
      if (column) {
        var subjectline = document.evaluate(".//h1[@class='YfMhcb']", evt.target, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
        var linksdiv = document.evaluate(".//div[@class='yMuNaf']", evt.target, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
        subjectline.parentNode.insertBefore(linksdiv, subjectline);
        column.parentNode.removeChild(column);
        column = document.evaluate(".//td[@class='tELAdc' and position()=2]", evt.target, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
        column.parentNode.removeChild(column);
      }
      for (var i = 0; i < document.styleSheets.length && !widerGmailMessageViewTargetCSSRule; i++) {
        for (var j = 0; j < document.styleSheets[i].cssRules.length && !widerGmailMessageViewTargetCSSRule; j++) {
          if (document.styleSheets[i].cssRules[j].selectorText == ".OZly4d") {
            widerGmailMessageViewTargetCSSRule = document.styleSheets[i].cssRules[j];
          }
        }
      }
      widerGmailMessageViewTargetCSSRule.style.cssText = "padding-top: 0; float: right; padding-right: 1ex;"
    }
  }, false);

