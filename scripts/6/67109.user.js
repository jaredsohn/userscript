(function() {

// ==UserScript==
// @name          RFC 2606§3 - window.frameElement Unit Test
// @namespace     http://userscripts.org/users/37004
// @description   Test the return value of window.frameEelement on reserved IANA domain names
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
//
// ==/UserScript==

  GM_log(window.frameElement);

})();
