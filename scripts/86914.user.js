(function() {

// ==UserScript==
// @name          RFC 2606§3 - XPCNativeWrapper Unit Test
// @namespace     http://userscripts.org/users/37004
// @description   Tests if window/document is equal to unsafeWindow/unsafeWindow.document
// @version       0.0.7
// @copyright     2010+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @include  http://www.iana.org/*
// @include  http://example.com/*
// @include  http://example.net/*
// @include  http://example.org/*
// @include  http://www.example.com/*
// @include  http://www.example.net/*
// @include  http://www.example.org/*
//
// @grant GM_log
// @grant unsafeWindow
//
//
// ==/UserScript==

  GM_log(['',
    'window == ' + window,
    'window.document == ' + window.document,
    'document == ' + document,
    '',
    'unsafeWindow == ' + unsafeWindow,
    'unsafeWindow.document == ' + unsafeWindow.document
  ].join('\n'));

  alert('(window === unsafeWindow) == ' + (window === unsafeWindow));
  alert('(window.document === unsafeWindow.document) == ' + (window.document === unsafeWindow.document));
  alert('(document === unsafeWindow.document) == ' + (document === unsafeWindow.document));

})();
