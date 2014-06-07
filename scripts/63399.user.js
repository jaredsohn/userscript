// ==UserScript==
// @name          TradingScreen OpenSSO AutoLogin
// @namespace     http://dev.tradingscreen.com
// @description   re-enables autocomplete for support portal login page
// @include       https://todsa002.dev.tradingscreen.com/*
// ==/UserScript==

alert('Hello world!');

var frm = document.forms[0];
frm.setAttribute(’autocomplete’, ‘on’);
frm.elements[0].setAttribute(’autocomplete’, ‘on’);
frm.elements[1].setAttribute(’autocomplete’, ‘on’);
