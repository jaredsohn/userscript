// ==UserScript==
// @name           Dojo Integration
// @namespace      coup.net.nz
// @description    Run to Dojo-ify any page by loading Dojo from the AOL CDN. After that you can use dojo.query() or anything else you want to do.
// @include        *
// ==/UserScript==

GM_registerMenuCommand("Dojo-ify", function() {
    if (unsafeWindow['dojo']) {
        alert("Dojo loaded already");
    } else {
        //Include Dojo from the AOL CDN
        var script = document.createElement('script');
        script.src="http://o.aolcdn.com/dojo/1.1.0/dojo/dojo.xd.js";
        document.getElementsByTagName('head')[0].appendChild(script);
        alert("Dojo loaded OK");
    }
});
