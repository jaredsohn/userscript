// ==UserScript==
// @name           ALC counter
// @namespace      JEBC
// @include        http://eow.alc.co.jp/*/UTF-8/*
// ==/UserScript==

var query = decodeURI(location.href).match(/http:\/\/eow.alc.co.jp\/\s*(.*)\s*\/UTF-8\/.*/)[1].toLowerCase();

var COUNT_PREFIX = "count_";

var stub = document.evaluate("//div[@id='resultArea']/table/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext().appendChild(document.createElement("tr")).appendChild(document.createElement("td"));
stub.setAttribute("colspan", 4);

var cnt = 1 + Number(GM_getValue(COUNT_PREFIX + query, "0"));

stub.innerHTML = "この単語の検索は" + cnt + "回目です";

GM_setValue(COUNT_PREFIX + query, cnt);

