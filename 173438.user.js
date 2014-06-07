// ==UserScript==
// @name           Asshole Locust Sarina
// @description    FuckOffFromGalden
// @include        https://hkgalden.com/*
// @include        https://m.hkgalden.com/*
// @version        1.0
// ==/UserScript==
if (typeof jQuery === "function") {
    var tListHas =  $('[href*="profile/57"]').length;
    var postHas = $('[data-authorid="57"]').length;
    if(tListHas){
     $('[href*="profile/57"]').closest('tr').remove();
    }
    if(postHas){
      $('[data-authorid="57"]').remove();
    }
}else {
    add_jQuery (GM_main, "2.0.2");
}

function add_jQuery (callbackFn, jqVersion) {
    var jqVersion   = jqVersion || "1.7.2";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'http://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}