// ==UserScript==
// @name        Remove premium & modified servers
// @include     http://*.quakelive.com/*
// @exclude     http://*.quakelive.com/forum/*
// ==/UserScript==

// Loops every 200ms
var x = setInterval(function() {
    // Checking for #qlv_postlogin_matches
    if ($("#qlv_postlogin_matches").length > 0) {
        // Using MutationObserver since MutationEvents like DOMSubtreeModified are deprecated.
        // Using the bind method also freezes the page when changing between gametype filters
        // Vendor prefixes included for cross-browser support
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        // Code to be executed is in the function below
        var observer = new MutationObserver(function(mutations) {
            // Mutations is a list of mutations, use forEach to iterate through if needed
            $(".modified_icon").parent().parent().remove();
            $(".premium_icon").parent().parent().remove();
            // Needed for grid view
            $(".qlv_pls_premium").parent().parent().remove();
        });
        // Must include childlist for the subtree changes to be detected
        observer.observe($("#qlv_contentBody").get(0), { childList: true, subtree: true });
        // Stops the loop
        clearInterval(x);
    }
}, 200);