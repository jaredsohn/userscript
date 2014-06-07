// ==UserScript==
// @id             eliteprospectcentered
// @name           Eliteprospects Centered
// @version        0.1
// @author         dvr
// @description    Centers Eliteprospect
// @include        http://www.eliteprospects.com/*
// @run-at         document-end
// @updateURL      http://userscripts.org/scripts/source/155674.user.js
// ==/UserScript==

var node0 = document.evaluate('//div[2]/table[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  , node1 = document.evaluate('//div[2]/table[1]/tbody/tr[2]/td', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  , node2 = document.evaluate('//div[2]/table[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  , node3 = document.evaluate('//div[2]/table[2]/tbody/tr/td[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  , node4 = document.evaluate('//div[2]/table[2]/tbody/tr[2]/td[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  , node5 = document.evaluate('//div[2]/table[2]/tbody/tr[3]/td[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  , node6 = document.evaluate('//div[2]/table[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  , node7 = document.evaluate('//div[2]/table[3]/tbody/tr/td[8]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  , node8 = document.evaluate('//div[2]/table[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  , node9 = document.evaluate('//div[2]/table[4]/tbody/tr/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

node0.style.width='1000px';
node1.style.width='1000px';
node2.style.width='1000px';
node3.style.display='none';
node4.style.display='none';
node5.style.display='none';
node6.style.width='1000px';
node7.style.display='none';
node8.style.width='1000px';
node9.style.display='none';