// ==UserScript==
// @name           One Manga RSS Updates
// @namespace      artanis00
// @description    Creates a link to the individual manga updates feeds at OneManga.com.
// @include        http://www.onemanga.com/*/*
// ==/UserScript==

rssNode = document.createElement('link')

href_re  = /(http:\/\/www\.onemanga\.com\/.*?\/)\d+\//
title_re = /http:\/\/www\.onemanga\.com\/(.*?)\/\d+\//

rssNode.href  = window.location.href.match(href_re)[1] + "updates-feed.xml"
rssNode.type  = "application/rss+xml"
rssNode.rel   = "alternate"
rssNode.title = "RSS Feed for " + window.location.href.match(title_re)[1]

head = document.getElementsByTagName("head")[0]
head.appendChild(rssNode)