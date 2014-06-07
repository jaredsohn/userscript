// ==UserScript==
// @name       feedly-fonts
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  increase fonts for feedly
// @include    http://feedly.com/*
// @include    https://feedly.com/*
// @include    http://*.feedly.com/*
// @include    https://*.feedly.com/*
// @copyright  2011+, Damian
// ==/UserScript==

var css = [
  '.content,.entryBody { font-size: 1.1rem; }',
  '.u100 {margin: 0 auto; width: 80%}',
  '.entryBody {max-width: 100% !important}',
  '.condensed .entryholder .u100entry {max-width: 80% !important; margin: 0 auto !important;}'
];


GM_addStyle(css.join('\n'));
