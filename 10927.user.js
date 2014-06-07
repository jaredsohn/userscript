// ==UserScript==
// @name           google 80's Logo
// @namespace      http://www.myspace.com/froggy26rk
// @description    Shows a google 80's Logo
// @include        http://*.google.com/*
// ==/UserScript==

var web20_google = 'http://img215.imageshack.us/img215/2889/image7cm4.gif';


var logo = document.evaluate("//img[@src='/intl/en_ALL/images/logo.gif']", document, null, 0, null).iterateNext();

logo.setAttribute('src', web20_google);
logo.setAttribute('height', '94');
logo.setAttribute('width', '430');
logo.setAttribute('alt', 'Web 2.0 Google');
logo.setAttribute('title', 'Web 2.0 Google');