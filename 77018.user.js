// ==UserScript==
// @name           Kyivstar: get SMS from URL
// @namespace      j2ck
// @include        http://www.kyivstar.ua/sms/*
// @include        http://www.kyivstar.net/sms/*
// @include        http://www.kyivstar.ua/ru/sms/*
// @include        http://www.kyivstar.ua/en/sms/*
// ==/UserScript==
Array.prototype.filter.call(document.getElementsByTagName('iframe'), function (iframe) {
 return iframe.src.match('smsgate.kyivstar');
})[0].src += "&" + window.location.search.replace(/^\?/, '');