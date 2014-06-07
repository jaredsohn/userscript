// ==UserScript==
// @name        remove modified servers
// @include     http://*.quakelive.com/*
// @exclude     http://*.quakelive.com/forum/*
// ==/UserScript==
var x = setInterval(function() {
   if ($("#qlv_postlogin_matches").length > 0) {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var observer = new MutationObserver(function(mutations) {
            // mutations.forEach(function(mutation) {
                $(".modified_icon").parent().parent().remove();
            // });
        });
        observer.observe($("#qlv_contentBody").get(0), { childList: true, subtree: true });
        clearInterval(x);
   }
}, 200);