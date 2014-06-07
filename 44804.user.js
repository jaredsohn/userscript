// ==UserScript==
// @name           facebook - immediate quiz results
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @description    shows you your results right after you take the quiz, no inviting of friends necessary
// @include        http://apps.facebook.com/*
// ==/UserScript==

location.href = document.evaluate("//a[.='continue to result'][contains(@href, 'results')]", document, null, 8, null).singleNodeValue.href;