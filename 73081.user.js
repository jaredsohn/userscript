(function() {

// ==UserScript==
// @name          RFC 2606§3 - DOMNodeInserted Unit Test
// @namespace     http://userscripts.org/users/37004
// @description   Puts an alert box up when page is finished loading and DOMNodeInserted has triggered
// @copyright     2010+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @include  http://www.iana.org/*
// @include  http://example.com/*
// @include  http://example.net/*
// @include  http://example.org/*
// @include  http://www.example.com/*
// @include  http://www.example.net/*
// @include  http://www.example.org/*
// ==/UserScript==

  var nodes = document.getElementsByTagName("body");
  if (nodes) {
    var bodyNode = nodes[0];
    bodyNode.addEventListener("DOMNodeInserted", function() { alert('DOMNodeInserted fired'); }, false);

    var textNode = document.createTextNode('Hello, World!');
    var paraNode = document.createElement("p");

    paraNode.appendChild(textNode);
    bodyNode.appendChild(paraNode); // DOMNodeInserted fired
  }

})();
