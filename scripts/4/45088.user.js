// HTTP-to-HTTPS redirector script
// version 1 (2006-01-12, night/morning CET)
// Copyright (c) 2006 Frederik 'Freso' S. Olesen
//
// This work is licensed under the Creative Commons Attribution 2.5 License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by/2.5/
// or send a letter to Creative Commons, 543 Howard Street, 5th Floor,
// San Francisco, California, 94105, USA.
//
// WARNING: Enable *only* sites and pages you *know* work the same
// with or without SSL! Failure to comply *will* cause b0rkage.
// (Okay, if you know what you're doing, you also know this isn't
// necessarily true, but then this warning isn't for you anyway.)
//
// ==UserScript==
// @name	HTTP-to-HTTPS redirector
// @namespace	http://freso.dk/
// @description	Replace http:// with https:// in the address bar, to make sure you're using the SSL-encrypted version of a page. Only enable for pages that you know are SSL enabled.
// @include	http://mail.google.com/*
// @include	http://gmail.google.com/*
// @include	http://login.yahoo.com/*
// @include	http://registration.excite.com/*
// @include	http://login.passport.net/uilogin.srf*
// @include	http://mail2web.com/*
// @include	http://www.mail2web.com/*
// @include	http://sourceforge.net/*
// @include	http://bugs.gentoo.org/*
// @include	http://forums.gentoo.org/*
// @include	http://bugs.kde.org/*
// @exclude	https://*
// ==/UserScript==
(function(){
  var debug = 0;
  if ( debug > 0 ) {
    alert(  "Hash:     "+location.hash+
          "\nHost:     "+location.host+
          "\nHostname: "+location.hostname+
          "\nHREF:     "+location.href+
          "\nPathname: "+location.pathname+
          "\nPort:     "+location.port+
          "\nProtocol: "+location.protocol+
	  "\n"+
	  "\nNew Location: "+location.href.replace(/http\:/, 'https:'));
  };
  location.href = location.href.replace(/http\:/, 'https:');
})();
