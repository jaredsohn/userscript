// Kustar redirector, based on the
// UMich Proxy Redirector
// version 0.3 (2013-11-11)
// Xiaojun Gu <myaccadd@outlook.com>
//
// This work is licensed under the Creative Commons Attribution 2.5 License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by/2.5/
// or send a letter to Creative Commons, 543 Howard Street, 5th Floor,
// San Francisco, California, 94105, USA.
//
// Based on the HTTP-to-HTTPS script
//
// ==UserScript==
// @name	Kustar Proxy Redirector
// @namespace	https://www.facebook.com/xiaojun.gu.7
// @description	Replace URL in the address bar with one that goes through the Kustar eLibrary proxy.
// @include     http://www.sciencemag.org/*
// @include	http://*.accessengineeringlibrary.com/*
// @include     http://www.sciencedirect.com/*
// @include     http://*.springer.com/*
// @include	http://*.webofknowledge.com/*
// @include	http://*.doi.org/*
// @include	http://www.accessscience.com/*
// @include	http://dl.acm.org/*
// @include	http://arc.aiaa.org/*
// @include	http://epubs.ans.org/*
// @include	http://*.aps.org/*
// @include	http://ascelibrary.org/*
// @include	http://*.asme.org/*
// @include	http://*.ebscohost.com/*
// @include	http://www.refworks.com/*
// @include	http://*.ieee.org/*
// @include	http://*.myilibrary.com/*
// @include	http://www.refworks.com/*
// @include	http://*.safaribooksonline.com/*
// @exclude	http://*.kustar.ac.ae/*
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
	  "\nNew Location: "+location.href.replace(/http\:\/\/([^\/]*)\//, 'http:\/\/$1.ezproxy.kustar.ac.ae\/'));
  };
  location.href = location.href.replace(/http\:\/\/([^\/]*)\//, 'http:\/\/$1.ezproxy.kustar.ac.ae\/');
})();
