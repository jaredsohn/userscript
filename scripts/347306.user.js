// ==UserScript==
// @name       Youtube Channel User Smasher
// @namespace  http://www.8-bit.jp/
// @version    0.1
// @description  enter something useful
// @match      http://www.youtube.com/*
// @match      https://www.youtube.com/*
// @copyright  2014, 778
// @run-at     document-start
// ==/UserScript==

var users = [ 'HikakinTV','HIKAKIN','HikakinBlog','HikakinGames','KAZUYA Channel' ];

addEventListener('DOMContentLoaded', process, false);
addEventListener('DOMNodeInserted', process, false);

function process() {
    for (var i = users.length; i--; ) {
        var elms = getElementByAttributeValue('data-context-item-user', users[i]);
        for (var j =　elms.length; j--;) {
            elms[j].parentNode.removeChild(elms[j]);
        }
    }
}

function getElementByAttributeValue(attribute, value)
{
  var matchingElements = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0; i < allElements.length; i++)
   {
    if (allElements[i].getAttribute(attribute) == value)
    {
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}