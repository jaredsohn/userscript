// ==UserScript==
// @name           hardMOB DNS Prefetcher
// @author         drag.hm
// @version        0.2
// @description    Prefetch DNS para carregar páginas mais rápido
// @include        http://www.hardmob.com.br/*
// @run-at         document-end

// ==/UserScript==

document.getElementsByClassName("above_body")[0].innerHTML+='<link rel="dns-prefetch" href="//images.weserv.nl"><link rel="dns-prefetch" href="//youtube.com"><link rel="dns-prefetch" href="//vimeo.com"><link rel="dns-prefetch" href="//products.digitalpoint.com"><link rel="dns-prefetch" href="//www.crawlability.com"><link rel="dns-prefetch" href="//www.dragonbyte-tech.com"><link rel="dns-prefetch" href="//google-analytics.com"><link rel="dns-prefetch" href="//ajax.cloudflare.com"><link rel="dns-prefetch" href="//yui.yahooapis.com"><link rel="dns-prefetch" href="//googletagservices.com"><link rel="dns-prefetch" href="//ajax.googleapis.com"><link rel="dns-prefetch" href="//cdnjs.cloudflare.com"><link rel="dns-prefetch" href="//google.com.br">';