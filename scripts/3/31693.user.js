// ==UserScript==
// @name           Link rewriter for Drexel Library ezproxy
// @namespace      http://userscripts.org/users/62806
// @description    Rewrite links to academic papers to allow fulltext retrieval through Drexel University's Library
// @include        http://*.google.com/*
// @include        http://*.elsevier.com/*
// @version        1.0
// @date           2008-08-13
// ==/UserScript==

var domains = "ieeexplore.ieee.org|portal.acm.org|interscience.wiley.com|springerlink.com|sciencedirect.com|ams.org|scitation.aip.org";
var proxy_suffix = ".ezproxy.library.drexel.edu";

var allLinks = document.getElementsByTagName('a');
var replacer = new RegExp("^(https?://[^/]*)("+domains+")(/)");

for(var i=0; i < allLinks.length; i++) {
       allLinks[i].href = allLinks[i].href.replace(replacer,'$1$2'+proxy_suffix+'$3');
}

