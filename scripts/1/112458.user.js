// ==UserScript==
// @name           Google NEW login
// @namespace      scripts.seabreeze.tk
// @description    Turn Google New Login Interface on BY DEFAULT
// @include        https://www.google.com/accounts/ServiceLogin?*
// @match          https://www.google.com/accounts/ServiceLogin?*
// @version        0.0.1 alpha
// ==/UserScript==
document.cookie='NEW_LOGIN_UI=1; path=/accounts'