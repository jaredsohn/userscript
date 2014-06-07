// ==UserScript==
// @id          ikariam_empire_overview_loader
// @name        Ikariam Empire Overview Loader
// @namespace   ikariam_empire_overview_by_xxKOtxx
// @description Loads Ikariam Empire Overview script body
// @include     http://s*.ikariam.com*    
// @author      xxKOtxx
// ==/UserScript==

script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', 'http://userscripts.org/scripts/source/116817.user.js?rnd=' + Math.random());

document.getElementsByTagName('head')[0].appendChild(script);