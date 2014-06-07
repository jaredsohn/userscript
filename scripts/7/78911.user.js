// ==UserScript==
// @name google home css hack
// @namespace BLAH
// @description change css on google.com to make it simpler
// @include http://www.google.com/*
// ==/UserScript==
javascript:(function(){var%20sUrl=prompt('Enter%20URL%20to%20Stylesheet');if(sUrl){var%20s=document.createElement('link');s.setAttribute('href',sUrl);s.setAttribute('rel','stylesheet');s.setAttribute('type','text/css');document.getElementsByTagName('head')[0].appendChild(s);alert('Stylesheet%20injected!');}})();
