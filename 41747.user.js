// ==UserScript==
// @name           RelatedShrink
// @description    Reduce "More From" and "Related" size
// @namespace      http://userscripts.org/users/79731
// @include        http://*.youtube.com/watch?*
// @include        http://*.youtube.com/share_inline?*
// @version        0.1
// ==/UserScript==

(function() {
    
    var moreFromPanelMaximumHeight = 210 ;
    var relatedVideosPanelMaximumHeight = 210 ;
    
    /* ---- Size Layout ---- */
    GM_addStyle([
        '#watch-other-vids #watch-channel-vids-body .watch-discoverbox',
        '{height: auto !important; max-height: ' + moreFromPanelMaximumHeight + 'px !important;}',
        '#watch-other-vids #more_channel_videos',
        '{height: auto !important; max-height: ' + moreFromPanelMaximumHeight + 'px !important;}',
        '#watch-other-vids #watch-related-vids-body .watch-discoverbox',
        '{height: auto !important; max-height: ' + relatedVideosPanelMaximumHeight + 'px !important;}',
        '#watch-other-vids #watch-featured-vids-body .watch-discoverbox',
        '{height: auto !important; max-height: ' + relatedVideosPanelMaximumHeight + 'px !important;}'
    ].join(' '));
})();