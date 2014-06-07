(function() {

// ==UserScript==
// @name          RFC 2606§3 - Require Force Failure Unit Test
// @namespace     http://userscripts.org/users/37004
// @description   Tests @require to see if it is working properly in failure instances
// @copyright     2011+, Marti Martz (http://userscripts.org/users/37004)
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
// ** This should prevent installation but still uses USO resources **
// @require *
//
// ==/UserScript==
})();
