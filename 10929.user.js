// ==UserScript==
// @name           google yahoo Logo
// @namespace      http://www.myspace.com/froggy26rk
// @description    Shows a google yahoo Logo
// @include        http://*.google.com/*
// ==/UserScript==

var web20_google = 'http://img451.imageshack.us/img451/9258/image13qc7.gif';


var logo = document.evaluate("//img[@src='/intl/en_ALL/images/logo.gif']", document, null, 0, null).iterateNext();

logo.setAttribute('src', web20_google);
logo.setAttribute('height', '38');
logo.setAttribute('width', '175');
logo.setAttribute('alt', 'Web 2.0 Google');
logo.setAttribute('title', 'Web 2.0 Google');