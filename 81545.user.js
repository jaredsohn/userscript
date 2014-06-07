// ==UserScript==
// @name           renren ad remover
// @namespace      http://www.cykerway.com
// @description    Remove ads on renren.com
// @include        http://*.renren.com/*
// ==/UserScript==

// helper functions
function xpath(query) {
    return document.evaluate(query,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}

// remove the banner
banners = xpath('//div[@id="header-wide-banner"]');
for (var i = 0;i < banners.snapshotLength;i++) {
    banner = banners.snapshotItem(i);
    banner.parentNode.removeChild(banner);
}

// remove the sponsors' widget
sponsors_widgets = xpath('//div[@id="sponsorsWidget"]');
for (var i = 0;i < sponsors_widgets.snapshotLength;i++) {
    sponsors_widget = sponsors_widgets.snapshotItem(i);
    sponsors_widget.parentNode.removeChild(sponsors_widget);
}
