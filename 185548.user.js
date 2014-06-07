// ==UserScript==
// @name       Total Block URL
// @namespace  http://userscripts.org/scripts/show/185548
// @run-at     document-start
// @version    0.1
// @description  enter something useful
// @match http://siteyouwanttoblock.com
// @copyright  2013+, xkz
// ==/UserScript==

// YOU CAN USE THIS SIMPLE CODE TO DEVELOP YOUR OWN. 
stop();

function closeWeb() {
  window.open('', '_self', '');
  window.close();
}


closeWeb();
