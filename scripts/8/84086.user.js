// ==UserScript==
// @name           tianya ad remover
// @namespace      http://www.cykerway.com
// @description    Remove ads on tianya.cn
// @include        http://*.tianya.cn/*
// ==/UserScript==

// helper functions
function xpath(query) {
    return document.evaluate(query,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}

// remove the top banner
sponsors_widgets = xpath('//div[@id="adsp_content_top_banner"]');
for (var i = 0;i < sponsors_widgets.snapshotLength;i++) {
    sponsors_widget = sponsors_widgets.snapshotItem(i);
    sponsors_widget.parentNode.removeChild(sponsors_widget);
}

// remove the left couplet
banners = xpath('//div[@id="couplet_left_NULL"]');
for (var i = 0;i < banners.snapshotLength;i++) {
    banner = banners.snapshotItem(i);
    banner.parentNode.removeChild(banner);
}

// remove the right couplet
banners = xpath('//div[@id="couplet_right_NULL"]');
for (var i = 0;i < banners.snapshotLength;i++) {
    banner = banners.snapshotItem(i);
    banner.parentNode.removeChild(banner);
}

// remove the bottom banner
sponsors_widgets = xpath('//div[@id="adsp_content_banner_2"]');
for (var i = 0;i < sponsors_widgets.snapshotLength;i++) {
    sponsors_widget = sponsors_widgets.snapshotItem(i);
    sponsors_widget.parentNode.removeChild(sponsors_widget);
}

// remove the replybox ad
sponsors_widgets = xpath('//div[@id="adsp_content_replybox_img_1"]');
for (var i = 0;i < sponsors_widgets.snapshotLength;i++) {
    sponsors_widget = sponsors_widgets.snapshotItem(i);
    sponsors_widget.parentNode.removeChild(sponsors_widget);
}