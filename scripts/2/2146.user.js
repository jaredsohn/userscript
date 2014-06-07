// MetaRSS (0.02)
//
// Copyright (C) 2005  metarss@sequential.org
//
// This file is  free software; you can redistribute  it and/or modify
// it under the  terms of the GNU General  Public License as published
// by  the Free  Software Foundation;  either version  2, or  (at your
// option) any later version.
//
// --------------------------------------------------------------------
// -------------------------------------------------------------------
//
// ==UserScript==
// @name          MetaRSS
// @namespace     http://sequential.org/metarss/
// @description	Useful Additions for Metafilter RSS Feeds
// @include       http://*.metafilter.com/*
// @include       http://metafilter.com/*
// ==/UserScript==

(function() {
  var metarss = {


    init: function() {
      var t = document.getElementsByTagName('title');

      t[ 0 ].innerHTML = 
        '<link rel="alternate" type="application/rss+xml" title="RSS 1.0 for MeFi Status" href="http://status.metafilter.com/index.rdf" />' +
        '<link rel="alternate" type="application/rss+xml" title="SmartFeed for MetaFilter" href="http://feeds.feedburner.com/metafilter_rss" />' +
        '<link rel="alternate" type="application/rss+xml" title="SmartFeed for AskMe" href="http://feeds.feedburner.com/askme" />' +
        '<link rel="alternate" type="application/rss+xml" title="SmartFeed for MetaTalk" href="http://feeds.feedburner.com/metatalk" />' +
        '<link rel="alternate" type="application/rss+xml" title="SmartFeed for MeFi Projects" href="http://feeds.feedburner.com/metafilter_projects" />' +
        '<link rel="alternate" type="application/rss+xml" title="SmartFeed for All" href="http://feeds.feedburner.com/metafilter_splice" />' +
        '<link rel="alternate" type="application/rss+xml" title="RSS for this Thread" href="' +
          'http://sequential.org/metarss/?action=Add%20URL&url=' +
          document.location +
         ';" />';


    },
}

  metarss.init ();
}) ();



