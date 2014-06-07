// ==UserScript==
// @name           GC.fi link
// @namespace      http://stone.kapsi.fi/
// @description    Lisää GC.fi:n kätkökuvaussivulle osoittavan linkin GC.comin kätkökuvaukseen
// @include        http://www.geocaching.com/geocache/*
// ==/UserScript==
// Created by Stone5

var gckoodi = document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode').innerHTML;
document.getElementById('ctl00_ContentBody_CacheName').innerHTML += '&nbsp;&nbsp;<a href="http://www.geocache.fi/caches/cachetieto.php?wp='+gckoodi+'">[GC.fi]</a>';