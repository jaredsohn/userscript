// HTTP-to-HTTPS redirector script
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
// @copyright	2006+, Frederik "Freso" S. Olesen (http://freso.dk/)
// @license	Creative Commons Attribution 3.0; http://creativecommons.org/licenses/by/3.0/
// @include	http://facebook.com/*
// @include	http://www.facebook.com/*
// @include	http://twitter.com/*
// @include	http://myspace.com/*
// @include	http://www.myspace.com/*
// @include	http://www.youtube.com/*
// @include	http://www.blogger.com/*
// @include	http://*.google.com/*
// @include	http://login.yahoo.com/*
// @include	http://registration.excite.com/*
// @include	http://login.passport.net/uilogin.srf*
// @include	http://mail2web.com/*
// @include	http://www.mail2web.com/*
// @include	http://fastmail.fm/*
// @include	http://www.fastmail.fm/*
// @include	http://sourceforge.net/*
// @include	http://bugs.gentoo.org/*
// @include	http://forums.gentoo.org/*
// @include	http://bugs.kde.org/*
// @include	http://drupal.org/*
// @include	http://archlinux.org/*
// @include	http://*.archlinux.org/*
// @include	http://duckduckgo.com/*
// @include	http://www.microsoft.com/*
// @include	http://userscripts.org/*
// @include	http://fronter.com/*
// @include	http://musicbrainz.org/*
// @include	http://beta.musicbrainz.org/*
// @include	http://test.musicbrainz.org/*
// @include	http://wiki.musicbrainz.org/*
// @include	http://*.wikipedia.org/*
// @include	http://*.wikimedia.org/*
// @include	http://*.wikispecies.org/*
// @include	http://*.mediawiki.org/*
// @include	http://*.wikinews.org/*
// @include	http://*.wikisource.org/*
// @include	http://*.wikibooks.org/*
// @include	http://*.wikiversity.org/*
// @include	http://*.wikiquote.org/*
// @include	http://*.wikidata.org/*
// @include	http://*.wiktionary.org/*
// @include	http://*.wikimediafoundation/*
// @exclude	https://*
// @exclude	http://mail.google.com/mail/?view=mm&at=*
// @exclude	http://translate.google.com/*
// @exclude	http://list.wikimedia.org/*
// @exclude	http://*musicbrainz.org/release/add*
// @exclude	http://*musicbrainz.org/ws/*
// ==/UserScript==
(function(){
  var debug = 0;
  var new_location = location.href.replace(/http\:/, 'https:');
  if ( debug > 0 ) {
    alert(  "Hash:     "+location.hash+
          "\nHost:     "+location.host+
          "\nHostname: "+location.hostname+
          "\nHREF:     "+location.href+
          "\nPathname: "+location.pathname+
          "\nPort:     "+location.port+
          "\nProtocol: "+location.protocol+
          "\n"+
          "\nNew Location: "+new_location);
  };
  location.href = new_location;
})();
