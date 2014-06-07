// ==UserScript==
// @name        显示favicon
// @namespace   http://userscripts.org/users/494778
// @version     1
// ==/UserScript==

    (function() {
        if (location != "chrome://browser/content/browser.xul") return;
        gBrowser.tabContainer.addEventListener("TabAttrModified", function() {
            if (gBrowser.mCurrentTab.image === gProxyFavIcon.src) return;
            (!!gBrowser.mCurrentTab.image) ? gProxyFavIcon.src = gBrowser.mCurrentTab.image : gProxyFavIcon.removeAttribute("src");
    }, false);
    })();