// ==UserScript==
// @name           google artwork Logo
// @namespace      http://www.myspace.com/froggy26rk
// @description    Shows a google artwork Logo
// @include        http://*.google.com/*
// ==/UserScript==

var web20_google = 'http://www.logoogle.com/images/image22.jpg';


var logo = document.evaluate("//img[@src='/intl/en_ALL/images/logo.gif']", document, null, 0, null).iterateNext();

logo.setAttribute('src', web20_google);
logo.setAttribute('height', '110');
logo.setAttribute('width', '276');
logo.setAttribute('alt', 'Web 2.0 Google');
logo.setAttribute('title', 'Web 2.0 Google');