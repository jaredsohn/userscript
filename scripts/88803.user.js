// ==UserScript==
// @name           PirateBay Order
// @namespace      http://www.dantaylorseo.com
// @description    Order PirateBay searches by by Seeds
// @include        http://*thepiratebay.org/*
// ==/UserScript==

var hidden_param = document.getElementsByName("orderby").item(0);
hidden_param.setAttribute("value", "7")