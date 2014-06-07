// ==UserScript==
// @name           TurboSquid free browser
// @description    Limits all TurboSquid search results to only free materials.  Note that you will not be able to search for paid materials at all when this script is enabled; you will have to disable this script if you decide you want to start seeing premium materials in your search results.  This makes it easy to search for free results, though, instead of having to manually enter a price range of "$0 to $0" each time you open up a new category.
// @author         Josh1billion
// @include        http://www.turbosquid.com/Search/*
// @version        1.0
// ==/UserScript==

var url = window.location.href;
if (url.indexOf("?max_price=0&&min_price=0") == -1)
  window.location = url + "?max_price=0&&min_price=0";