// ==UserScript==
// @name           YouTube Comfort In Black
// @description    A dark skin for YouTube video pages.
// @namespace      http://userscripts.org/users/57930
// @include        http://*.youtube.com/watch?*
// @include        http://*.youtube.com/share_inline?*
// @version        0.6b6
// ==/UserScript==

(function() {
    
    var videoPlayerWidth = 640 ;
    /**
      *   pixels
      *   (default: 700)
      *   (youtube default: 640)
      */
    
    var rightPaneWidth = 360 ;
    /**
      *   pixels
      *   (default: 360)
      *   (youtube default: 300)
      */
    
    var moreFromPanelMaximumHeight = 302 ;
    var relatedVideosPanelMaximumHeight = 302 ;
    var playlistPanelMaximumHeight = 175 ;
    var quickListPanelMaximumHeight = 175 ;
    /**
      *   pixels
      *   (default: 302, 302, 175 and 175)
      */
    
    var videoControllerOpacity = 0.7 ;
    /**
      *   between 0 to 1.0
      *   (default: 0.7)
      */
    
    var videoControllerTurnOnDelayTime = 300 ;
    var videoControllerTurnOffDelayTime = 300 ;
    /**
      *   milliseconds
      *   (default: 300 and 900)
      */
    
    var enableHugePlayer = 1 ;
    /**
      *   0 : disabled
      *   1 : enabled (default)
      */
    
    var hugePlayerMinimumMarginWidth = 16 ;
    /**
      *   pixels
      *   (default: 16)
      */
    
    var addFmtToVideoLinks = 18 ;
    /**
      *   integer
      *   (default: 0 as disabled)
      */ 
    
    var autoScrollMode = 0 ;
    /**
      *   0 : disabled (default)
      *   1 : align with player bottom
      *   2 : align with player top
      */
    
    var enableChannelBanner = 1 ;
    /**
      *   0 : disabled
      *   1 : enabled (default)
      */
    
    
    
    GM_addStyle(<><![CDATA[
        
        /* ---- Remove Elements ---- */
        #masthead .logo,
        #masthead #lang-locale-picker-links-wrapper,
        #masthead #upload-wrapper,
        #masthead .nav-item,
        #masthead #masthead-search-term ~ *,
        #masthead .search-left-cap,
        #masthead .search-right-cap,
        #old-footer,
        #copyright,
        #baseDiv > div[class="clear"] ~ div,
        #watch-other-vids #watch-channel-brand-div,
        #watch-other-vids #subscribeDiv,
        #watch-other-vids #watch-url-div,
        #watch-other-vids #watch-embed-div,
        #watch-other-vids #watch-content-badges,
        #watch-other-vids > div:not([id]),
        #watch-this-vid-info #watch-comment-post,
        #watch-this-vid-info #div_main_comment
        {
            display: none !important;
        }
        
        
        /* ---- Background Colors ---- */
        body[class],
        .confirmBox,
        .errorBox,
        #watch-this-vid-info #watch-video-response,
        #watch-this-vid-info #watch-main-area div.watch-action-result
        {
            background: black !important;
        }
        
        #watch-this-vid-info #watch-comments-stats .watch-tabs td,
        #watch-this-vid-info .watch-comment-pagination,
        #watch-this-vid-info .watch-comment-auth-head,
        #watch-this-vid-info #watch-main-area div.signInBoxContent,
        #watch-this-vid-info #commentsHelp
        {
            background: #2d2d2d !important;
        }
        
        #baseDiv > div.title
        {
            background: #151515 !important;
        }
        
        #watch-other-vids #watch-channel-vids-div,
        #watch-other-vids #watch-customize-embed-div,
        #watch-other-vids form.google-checkout,
        #watch-other-vids .watch-body,
        #watch-other-vids .watch-playlist-row-playing,
        #watch-this-vid-info #watch-main-area,
        #watch-this-vid-info #watch-main-area * div,
        #watch-this-vid-info #watch-main-area td,
        #watch-this-vid-info #watch-comments-stats,
        #watch-this-vid-info #watch-comments-stats .watch-tabs td.watch-tab-sel,
        #watch-this-vid-info .watch-comment-head,
        #watch-this-vid-info .watch-comment-head-hidden,
        #watch-this-vid-info .header,
        #watch-this-vid-info .watch-comment-spam,
        #watch-this-vid-info #watch-flag-menu *,
        #masthead #account-dropdown a:hover,
        #masthead #account-dropdown,
        #masthead #account-dropdown div,
        body
        {
            background: #1f1f1f !important;
        }
        
        
        /* ---- Borders ---- */
        #watch-other-vids #watch-channel-vids-div,
        #watch-other-vids .watch-body,
        #watch-this-vid-info .watch-comment-pagination,
        #watch-this-vid-info #watch-video-response
        {
            border: 1px solid #444444 !important;
        }
        
        #watch-other-vids #watch-channel-vids-div,
        #watch-other-vids .watch-body,
        #watch-this-vid-info #watch-video-response,
        #watch-this-vid-info .watch-action-result,
        #watch-this-vid-info #commentsHelp
        {
            -moz-border-radius: 3px !important;
        }
        
        #watch-this-vid-info #watch-main-area,
        #watch-this-vid-info #watch-comments-stats,
        #watch-this-vid-info #watch-comments-stats .watch-tabs td.watch-tab-sel,
        #watch-other-vids .watch-playlist-row-playing,
        #watch-highlight-racy-box
        {
            border: none !important;
        }
        
        #watch-this-vid-info #watch-comments-stats .watch-tabs td,
        #watch-this-vid-info .watch-comment-auth-head
        {
            border-left: 1px solid #444444 !important;
            border-bottom: 1px solid #444444 !important;
        }
        
        #watch-this-vid-info #watch-main-area td
        {
            border-bottom: 1px solid #666666 !important;
        }
        
        #watch-this-vid-info .watch-action-text,
        #watch-this-vid-info #aggregationServicesDiv a,
        #watch-this-vid-info #watch-comments-stats a,
        #baseDiv a.eLink
        {
            border-bottom: none !important;
        }
        
        #watch-this-vid-info .watch-action-result
        {
            border: 1px solid yellowgreen !important;
        }
        
        #masthead #account-dropdown,
        #masthead #account-dropdown div,
        #masthead .util-item,
        #watch-other-vids .watch-discoverbox-divider,
        #watch-other-vids .watch-playlist-container,
        #watch-this-vid-info #watch-active-sharing,
        #watch-this-vid-info #watch-flag-menu *
        {
            border-color: #999999 !important;
        }
        
        #watch-other-vids #watch-url-div,
        #watch-other-vids .watch-extra-desc,
        #watch-other-vids #watch-customize-embed-div,
        #watch-other-vids #watch-customize-embed-theme-swatches,
        #watch-other-vids .watch-google-checkout,
        #watch-this-vid-info .shv-box-title,
        #watch-this-vid-info .watch-shareopts-sectitle,
        #watch-this-vid-info .small-expand-panel,
        #watch-this-vid-info .watch-comment-entry,
        #watch-this-vid-info .watch-comment-marked-spam
        {
            border-color: #666666 !important;
        }
        
        #watch-this-vid-info .shv-box-title,
        #watch-this-vid-info .watch-shareopts-sectitle,
        #watch-this-vid-info .watch-comment-entry,
        #watch-this-vid-info .watch-comment-marked-spam
        {
            border-top-style: dotted !important;
        }
        
        
        /* ---- Text Colors ---- */
        body,
        #watch-other-vids .post-date,
        #watch-this-vid-info h3,
        #watch-this-vid-info .shv-box-titletxt,
        #watch-this-vid-info #watch-some-stats td .watch-stat
        {
            color: silver !important;
        }
        
        #baseDiv > div.title h1,
        #masthead .user-info,
        #masthead  a,
        #watch-other-vids a.expand-header,
        #watch-other-vids #playlist-panel a.expand-header:link,
        #watch-other-vids .smallLabel,
        #watch-other-vids .google-checkout-header,
        #watch-this-vid-info #watch-comments-summary,
        #watch-this-vid-info #watch-comments-summary span,
        #watch-this-vid-info #watch-some-stats td,
        #watch-this-vid-info #watch-some-stats td .lightLabel,
        #watch-this-vid-info .watch-video-response-duration
        {
            color: #999999 !important;
        }
        
        #watch-this-vid-info .watch-comment-action,
        #watch-this-vid-info .watch-comment-action a,
        #watch-this-vid-info .ratedMessage,
        #watch-other-vids #watch-attributions-div .watch-extra-desc,
        #watch-other-vids .vfacets,
        #watch-other-vids .vfacets a,
        #watch-other-vids .quicklist-inlist a,
        .confirmBox
        {
            color: #666666 !important;
        }
        
        #shv-form .button
        {
            color: black !important;
        }
        
        .errorBox
        {
            color: darkorange !important;
        }
        
        a:link,
        a[href$="#"]:visited,
        #watch-other-vids #playlist-panel a:visited,
        #watch-this-vid-info .watch-action-text,
        #watch-this-vid-info a.watch-comment-head-link,
        #masthead #account-dropdown a
        {
            color: #d8f7f7 !important;
        }
        
        a:visited
        {
            color: #92c52a !important;
        }
        
        a:hover,
        a[href$="#"]:hover,
        #watch-other-vids #playlist-panel a:hover,
        #watch-this-vid-info .watch-comment-action a:hover,
        #watch-this-vid-info a.watch-comment-head-link:hover,
        #masthead #account-dropdown a:hover
        {
            color: pink !important;
        }
        
        
        /* ---- Header ---- */
        #masthead
        {
            padding: 0 !important;
            margin: 5px 0 3px 0 !important;
        }
        
        
        /* ---- Header UserInfo ---- */
        #masthead .user-info
        {
            width: auto !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 5px 0 0 !important;
        }
        
        #masthead #top-margin-links-wrapper
        {
            padding-top: 8px !important;
        }
        
        
        /* ---- Header SearchBar ---- */
        #masthead .search-form
        {
            margin: 0 !important;
            padding: 0 !important;
            position: absolute !important;
            top: 0px !important;
            left: 0px !important;
            width: auto !important;
            height: auto !important;
        }
        
        #masthead .bar
        {
            position: absolute !important;
            top: 0px !important;
            left: 0px !important;
            background: none !important;
            width: auto !important;
            min-width: 450px !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
        }
        
        #masthead .search-wrapper
        {
            margin: 0 !important;
        }
        
        #masthead #masthead-search-term
        {
            border: 1px dashed black !important;
            background: none !important;
            color: #e8de74 !important;
            text-align: center !important;
        }
        
        #masthead #masthead-search-term:hover
        {
            border: 1px dashed #666666 !important;
        }
        
        #masthead #masthead-search-container .search-button-text
        {
            background: none !important;
            -moz-border-radius: 3px !important;
            border: 2px solid darkorange !important;
            color: darkorange !important;
            height: 1.6em !important;
            line-height: 1.6em !important;
            padding: 0 0.8em !important;
        }
        
        
        /* ---- Header Title ---- */
        #baseDiv > div.title
        {
            text-align: center !important;
            padding: 0.3em 0 !important;
            margin: 0 0 20px 0 !important;
        }
        
        
        /* ---- Channel Stat ---- */
        #watch-other-vids #watch-channel-stats
        {
            width: auto !important;
            max-width: 200px !important;
        }
        
        #watch-other-vids #watch-channel-subscribe,
        #watch-other-vids #watch-badges
        {
            width: auto !important;
            max-width: 100px !important;
        }
        
        
        /* ---- Video Quality Setting ---- */
        #watch-this-vid-info #watch-video-quality-setting
        {
            height: 1.6em !important;
            line-height: 1.6em !important;
        }
        
        
        /* ---- Commentary Panel ---- */
        #watch-this-vid-info #watch-comments-stats
        {
            padding-bottom: 1em !important;
            margin-bottom: 1.5em !important;
        }
        
        
        /* ---- Video Controller Mask ---- */
        #watch-this-vid #controller_mask
        {
            height: 25px !important;
            background: black !important;
            position: absolute !important;
        }
        
        #watch-this-vid #watch-player-div
        {
            position: relative !important;
        }
        
        
        /* ---- Rating Stars ---- */
        #watch-this-vid-info #ratingStars
        {
            margin-top: 2px !important;
        }
        
        #watch-this-vid-info #ratingStars img.icn_star_full_19x20,
        #watch-this-vid-info #ratingStars img.icn_star_half_19x20,
        #watch-this-vid-info #ratingStars img.icn_star_empty_19x20
        {
            width: 16px !important;
            height: 16px !important;
        }
        
        #watch-this-vid-info #ratingStars img.icn_star_full_19x20
        {
            background-position: 0px 0px !important;
        }
        
        #watch-this-vid-info #ratingStars img.icn_star_half_19x20
        {
            background-position: -64px -16px !important;
        }
        
        #watch-this-vid-info #ratingStars img.icn_star_empty_19x20
        {
            background-position: -80px -32px !important;
        }
        
        #watch-this-vid-info #ratingStars img.ratingL
        {
            width: 80px !important;
            height: 16px !important;
        }
        
        #watch-this-vid-info #ratingStars img.ratingL-5\.0
        {
            background-position: 0px 0px !important;
        }
        
        #watch-this-vid-info #ratingStars img.ratingL-4\.5
        {
            background-position: 0px -16px !important;
        }
        
        #watch-this-vid-info #ratingStars img.ratingL-4\.0
        {
            background-position: -16px 0px !important;
        }
        
        #watch-this-vid-info #ratingStars img.ratingL-3\.5
        {
            background-position: -16px -16px !important;
        }
        
        #watch-this-vid-info #ratingStars img.ratingL-3\.0
        {
            background-position: -32px 0px !important;
        }
        
        #watch-this-vid-info #ratingStars img.ratingL-2\.5
        {
            background-position: -32px -16px !important;
        }
        
        #watch-this-vid-info #ratingStars img.ratingL-2\.0
        {
            background-position: -48px 0px !important;
        }
        
        #watch-this-vid-info #ratingStars img.ratingL-1\.5
        {
            background-position: -48px -16px !important;
        }
        
        #watch-this-vid-info #ratingStars img.ratingL-1\.0
        {
            background-position: -64px 0px !important;
        }
        
        #watch-this-vid-info #ratingStars img
        {
            background-color: transparent !important;
            background-repeat: no-repeat !important;
            background-attachment: scroll !important;
            background-image: url("data:image/png;base64, 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") !important;
        }
        
        
        /* ---- Rating Message ---- */
        #watch-this-vid-info #ratingMessage
        {
            width: 300px !important;
            float: none !important;
            clear: none !important;
        }
        
        
        /* ---- Main Area Alignment ---- */
        #watch-this-vid-info #watch-actions-area table
        {
            width: 100% !important;
        }
        
        #watch-this-vid-info #watch-comments-stats table
        {
            width: 100% !important;
        }
        
        #watch-this-vid-info #watch-views-div
        {
            float: right !important;
        }
        
        #watch-this-vid-info #watch-video-responses-children
        {
            margin-left: auto !important;
            margin-right: auto !important;
            width: 626px !important;
        }
        
        #watch-this-vid-info,
        #watch-this-vid #watch-player-div
        {
            margin: 0 !important;
            padding: 0 !important;
        }
        
        #watch-this-vid-info .watch-comment-spam
        {
            margin-left: 0.5em !important;
        }
        
        .shv-message-submit
        {
            margin-left: 266px !important;
        }
        
        
        /* ---- Theater View---- */
        .watch-this-vid-info-longform
        {
            padding-top: 0px !important;
        }
        
        #watch-longform-buttons,
        #watch-longform-ad
        {
            display: none !important;
        }
        
        #watch-longform-vid-title-non h1
        {
            float: none !important;
        }
        
        #baseDiv
        {
            padding: 0 !important;
            margin: auto !important;
        }
        
        
        /* ---- Responses Arrows ---- */
        #watch-this-vid-info .SingleArrowBox img
        {
            height: 44px !important;
        }
        
        #watch-this-vid-info a .LeftSingleArrow
        {
            background-position: 0 -333px !important;
        }
        
        #watch-this-vid-info a:hover .LeftSingleArrow
        {
            background-position: -39px -333px !important;
        }
        
        #watch-this-vid-info a:active .LeftSingleArrow
        {
            background-position: -78px -333px !important;
        }
        
        #watch-this-vid-info a .RightSingleArrow
        {
            background-position: -19px -333px !important;
        }
        
        #watch-this-vid-info a:hover .RightSingleArrow
        {
            background-position: -58px -333px !important;
        }
        
        #watch-this-vid-info a:active .RightSingleArrow
        {
            background-position: -97px -333px !important;
        }
        
        
        /* ---- Video Entry List ---- */
        #watch-other-vids .watch-discoverbox-body
        {
            padding-left: 6px !important;
        }
        
        #watch-other-vids .video-entry
        {
            border-bottom: 1px dotted #777777 !important;
            padding-bottom: 0.2em !important;
            margin-bottom: 0.2em !important;
            margin-right: 6px !important;
        }
        
        #watch-other-vids .video-entry .video-main-content
        {
            float: none !important;
            padding-left: 102px !important;
            width: auto !important;
        }
        
        #watch-other-vids .video-entry .video-view-count,
        #watch-other-vids .video-entry .video-username
        {
            display: inline !important;
            line-height: 1.6em !important;
            height: auto !important;
            margin-right: 0.5em !important;
            color: #aaaaaa !important;
        }
        
        .v90WrapperOuter,
        .v50WrapperOuter,
        .vimg90,
        .vimg50
        {
            border: 1px solid #999999 !important;
        }
        
        .v90WrapperInner,
        .v50WrapperInner
        {
            border: 1px solid #eeeeee !important;
        }
        
    ]]></>);
    
    
    /* ---- Size Layout ---- */
    var watchOtherVidsLeftSpacerWidth = 35;
    var controllerHeight = 25;
    var videoPlayerAspectRatio = 4/3 ;
    
    var videoPlayerHeight = Math.round(videoPlayerWidth * (1/videoPlayerAspectRatio)) + controllerHeight;
    var pageWidth = videoPlayerWidth + rightPaneWidth + watchOtherVidsLeftSpacerWidth;
    GM_addStyle([
        '#baseDiv, #masthead, #baseDiv > div.title',
        '{width: ' + pageWidth + 'px !important;}',
        '#watch-this-vid-info,#watch-this-vid, #watch-this-vid #movie_player',
        '{width: ' + videoPlayerWidth + 'px !important;}',
        '#watch-this-vid #movie_player',
        '{height: ' + videoPlayerHeight + 'px !important;}',
        '#watch-other-vids, #watch-other-vids #watch-channel-brand-cap img',
        '{width: ' + rightPaneWidth + 'px !important;}',
        '#watch-other-vids .watch-playlist-row-middle, #watch-other-vids .watch-playlist-row-middle div',
        '{width: ' + (132 + rightPaneWidth - 300) + 'px !important;}',
        '#watch-other-vids #watch-channel-vids-body .watch-discoverbox',
        '{height: auto !important; max-height: ' + moreFromPanelMaximumHeight + 'px !important;}',
        '#watch-other-vids #more_channel_videos',
        '{height: auto !important; max-height: ' + moreFromPanelMaximumHeight + 'px !important;}',
        '#watch-other-vids #playlistContainer_PL',
        '{height: auto !important; max-height: ' + playlistPanelMaximumHeight + 'px !important;}',
        '#watch-other-vids #playlistContainer_QL',
        '{height: auto !important; max-height: ' + quickListPanelMaximumHeight + 'px !important;}',
        '#watch-other-vids #watch-related-vids-body .watch-discoverbox',
        '{height: auto !important; max-height: ' + relatedVideosPanelMaximumHeight + 'px !important;}',
        '#watch-other-vids #watch-featured-vids-body .watch-discoverbox',
        '{height: auto !important; max-height: ' + relatedVideosPanelMaximumHeight + 'px !important;}'
    ].join(' '));
    
    
    
    /* ---- Functions ---- */
    var doc = document;
    var moviePlayer = doc.getElementById('movie_player');
    
    var forEachElements = function(xpath, func, node) {
        if (!node) node = doc;
        var nodesSnapshot = doc.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i=0; i < nodesSnapshot.snapshotLength; i++) {
            func(nodesSnapshot.snapshotItem(i));
        }
    };
    
    var toggleSearchBarItems = function() {
        var showedSearchBarItems = false;
        var inputFieldID = 'masthead-search-term';
        doc.getElementById(inputFieldID).addEventListener('keyup', function() {
            var textExist = Boolean(this.value);
            if (showedSearchBarItems == textExist) return;
            showedSearchBarItems = textExist;
            var xpath = '//div[@class="search-wrapper"]/*[position()>1]';
            var property = 'display: ' + ((textExist) ? 'inline' : 'none') + ' !important;';
            forEachElements(xpath, function(e) {e.setAttribute('style', property);});
        },
        false);
    };
    
    var stripUrlParameters = function(id, param) {
        var xpath = '//div[@id="' + id + '"]//a[contains(@href, "/watch?")]';
        forEachElements(xpath, function(e) {e.href = e.href.replace(param, '');});
    };
    
    var scrollIntoView = function(elementID, alignWithTop) {
        doc.getElementById(elementID).scrollIntoView(Boolean(alignWithTop));
    };
    
    var appendVideoInfo = function() {
        var toggleAdditionalVideoInfo = function() {
            var xpath = '//div[@id="watch-url-div" or @id="watch-embed-div" or @id="watch-content-badges"]';
            var property = 'display: ' + ((this.id) ? 'block' : 'none') + ' !important;';
            forEachElements(xpath, function(e) {e.setAttribute('style', property);});
        };
        var xpath = '//div[@id="watch-video-details-toggle"]//a';
        forEachElements(xpath, function(e) {e.addEventListener('click', toggleAdditionalVideoInfo, false);});
    };
    
    var expandPlayer = function() {
        var playerExpanded = false;
        moviePlayer.addEventListener('dblclick', function(e) {
            if (e.layerY - moviePlayer.offsetTop >= moviePlayer.clientHeight - controllerHeight) return;
            var watchOtherVids = doc.getElementById('watch-other-vids');
            var controllerMask = doc.getElementById('controller_mask');
            if (playerExpanded) {
                moviePlayer.removeAttribute('style');
                watchOtherVids.style.marginTop = 0;
                if (videoControllerOpacity) {
                    controllerMask.style.width = '100%';
                    controllerMask.style.top = (videoPlayerHeight - controllerHeight) + 'px';
                    controllerMask.style.marginLeft = 0;
                }
                (autoScrollMode) ? scrollIntoView('movie_player', autoScrollMode - 1) : doc.documentElement.scrollIntoView(true);
                playerExpanded = false;
            }
            else {
                var hugePlayer = {
                    width: 0,
                    height: 0,
                    marginBottom: hugePlayerMinimumMarginWidth,
                    marginTop: hugePlayerMinimumMarginWidth,
                    marginLeft: hugePlayerMinimumMarginWidth,
                    style: ''
                };
                var innerHeight = doc.documentElement.clientHeight - (hugePlayer.marginBottom + hugePlayer.marginTop + controllerHeight);
                var innerWidth = doc.documentElement.clientWidth - hugePlayer.marginLeft * 2;
                hugePlayer.width = (innerHeight/innerWidth >= (1/videoPlayerAspectRatio)) ? innerWidth : Math.round(innerHeight * videoPlayerAspectRatio);
                hugePlayer.height = Math.round(hugePlayer.width * (1/videoPlayerAspectRatio)) + controllerHeight;
                if (innerHeight + controllerHeight > hugePlayer.height) {
                    var additionalVerticalMargin = Math.ceil(((innerHeight + controllerHeight) - hugePlayer.height) * 1/2);
                    hugePlayer.marginBottom += additionalVerticalMargin;
                    hugePlayer.marginTop += additionalVerticalMargin;
                }
                if (innerWidth > hugePlayer.width) {
                    if (countElements('//embed[@id="movie_player" and contains(@flashvars, "&fmt_map=22")]') && countElements('//div[@id="watch-video-quality-setting" and @class="high"]')) {
                        hugePlayer.width = (innerWidth/(hugePlayer.height - controllerHeight)<= 16/9) ? innerWidth : Math.round((hugePlayer.height - controllerHeight) * 16/9);
                    }
                    hugePlayer.marginLeft = Math.round((doc.documentElement.clientWidth - hugePlayer.width) * 1/2);
                }
                if (doc.documentElement.clientWidth > pageWidth) {
                    hugePlayer.marginLeft = Math.round((pageWidth - hugePlayer.width) * 1/2);
                }
                
                
                hugePlayer.style = [
                    'height: ' + hugePlayer.height + 'px !important',
                    'width: ' + hugePlayer.width + 'px !important',
                    'margin-bottom: ' + hugePlayer.marginBottom + 'px !important',
                    'margin-top: ' + hugePlayer.marginTop + 'px !important',
                    'margin-left: ' + hugePlayer.marginLeft + 'px !important'
                ].join(';');
                moviePlayer.setAttribute('style', hugePlayer.style);
                watchOtherVids.style.marginTop = (hugePlayer.marginTop + hugePlayer.height + hugePlayer.marginBottom + 10) + 'px';
                if (videoControllerOpacity) {
                    controllerMask.style.width = hugePlayer.width + 'px';
                    controllerMask.style.top = (hugePlayer.marginTop + hugePlayer.height - controllerHeight) + 'px';
                    controllerMask.style.marginLeft = hugePlayer.marginLeft + 'px';
                }
                scrollIntoView('watch-player-div', true);
                playerExpanded = true;
            }
        },
        false);
    };
    
    var dimController = function() {
        var controllerMask = doc.createElement('div');
        controllerMask.id = 'controller_mask';
        controllerMask.style.width = '100%';
        controllerMask.style.top = (videoPlayerHeight - controllerHeight) + 'px';
        controllerMask.style.display = 'block';
        controllerMask.style.opacity = videoControllerOpacity;
        doc.getElementById('watch-player-div').appendChild(controllerMask);
        
        var timeoutID = null;
        
        var toggleControllerMask = function(displayStyle, delayTime) {
            if (timeoutID) return;
            if (controllerMask.style.display == displayStyle) return;
            timeoutID = window.setTimeout(function() {
                controllerMask.style.display = displayStyle;
                timeoutID = null;
            },
            delayTime);
        };
        
        var cancelSetTimeout = function() {
            if (!timeoutID) return false;
            window.clearTimeout(timeoutID);
            timeoutID = null;
            return true;
        };
        
        controllerMask.addEventListener('mouseover', function() {
            toggleControllerMask('none', videoControllerTurnOnDelayTime);
        }, false);
        controllerMask.addEventListener('mouseout', function() {
            cancelSetTimeout() || toggleControllerMask('block', videoControllerTurnOnDelayTime);
        }, false);
        moviePlayer.addEventListener('mouseout', function() {
            toggleControllerMask('block', videoControllerTurnOffDelayTime);
        }, false);
        moviePlayer.addEventListener('mousemove', function(e) {
            if (e.layerY - moviePlayer.offsetTop < moviePlayer.clientHeight - controllerHeight) {toggleControllerMask('block', videoControllerTurnOffDelayTime);}
            else {cancelSetTimeout();}
        }, false);
        moviePlayer.addEventListener('mouseover', function(e) {
            if (e.layerY - moviePlayer.offsetTop >= moviePlayer.clientHeight - controllerHeight) cancelSetTimeout();
        }, false);
    };
    
    var countElements = function(xpath) {
        var count = 0;
        forEachElements(xpath, function(e) {count++});
        return count;
    };
    
    var onClickMoreFromPanelHeader = function(id) {
        var clickedMoreFromPanelHeader = false;
        var xpath = '//div[@id="' + id + '"]/a[@class="expand-header"]';
        forEachElements(xpath, function(e) {e.addEventListener('click', function() {
            if (clickedMoreFromPanelHeader) return;
            var intervalID = window.setInterval(function() {
                if (countElements('//div[@id="' + id + '"]//div[@class="watch-discoverbox-more-link"]') < 1) return;
                setTimeout(function() {
                    if (moreFromPanelMaximumHeight > 302) {
                        if (id == 'watch-channel-videos-panel') {
                            unsafeWindow.performDelayLoad('channel');
                        }
                        else if (id == 'more-from-panel') {
                            unsafeWindow.performDelayLoad('channel_videos');
                        }
                    }
                    stripUrlParameters(id, /&feature=[^&]+/);
                    addFmtParameter(id);
                },
                300);
                clearInterval(intervalID);
            },
            200);
            clickedMoreFromPanelHeader = true;
        },
        false);});
    };
    
    var onClickVideoResponsesArrows = function() {
        var id = 'watch-video-responses-children';
        var xpath = '//div[@id="' + id + '"]/div[contains(@class, "SingleArrowBox")]/a';
        forEachElements(xpath, function(e) {e.addEventListener('click', function() {
            window.setTimeout(function() {
                stripUrlParameters(id, '&watch_response');
                addFmtParameter(id);
            },
            500);
        },
        false);});
    };
    
    var completeQuickListLoad = function() {
        if ((quickListPanelMaximumHeight <= 175 && addFmtToVideoLinks < 1) || doc.getElementById('quicklistDiv').className.indexOf('hide') > -1) return;
        unsafeWindow.completePlaylistLoad();
        var intervalID = window.setInterval(function() {
            if (countElements('//div[@id="playlistRows_QL"]/div[contains(@class, "loading")]') > 0) return;
            window.setTimeout(function() {
                addFmtParameter('quicklistDiv');
                if (countElements('//div[@id="playlistRows_QL"]/div[contains(@class, "watch-playlist-row-playing")]') > 0) {
                    unsafeWindow.scrollPlaylistToVideo('QL', unsafeWindow.qlAutoscrollDestination);
                }
            },
            300);
            clearInterval(intervalID);
        },
        100);
    };
    
    var modPanels = function() {
        var intervalID = window.setInterval(function() {
            if (countElements('//div[@id="watch-related-vids-body" or @id="watch-featured-vids-body"]//div[@class="watch-discoverbox-more-link"]') < 1) return;
            window.setTimeout(function() {
                if (doc.getElementById('watch-channel-videos-panel')) {
                    stripUrlParameters('watch-channel-videos-panel', '&feature=channel');
                    addFmtParameter('watch-channel-videos-panel');
                    onClickMoreFromPanelHeader('watch-channel-videos-panel');
                    if (moreFromPanelMaximumHeight > 302) unsafeWindow.performDelayLoad('channel');
                }
                else if (doc.getElementById('more-from-panel')) {
                    stripUrlParameters('more-from-panel', '&feature=user');
                    addFmtParameter('more-from-panel');
                    onClickMoreFromPanelHeader('more-from-panel');
                    if (moreFromPanelMaximumHeight > 302) unsafeWindow.performDelayLoad('channel_videos');
                }
                
                if (doc.getElementById('watch-related-vids-body')) {
                    stripUrlParameters('watch-related-vids-body', '&feature=related');
                    addFmtParameter('watch-related-vids-body');
                    if (relatedVideosPanelMaximumHeight > 302) unsafeWindow.performDelayLoad('related');
                }
                else if (doc.getElementById('watch-featured-vids-body')) {
                    stripUrlParameters('watch-featured-vids-body', '&feature=featured');
                    addFmtParameter('watch-featured-vids-body');
                    if (relatedVideosPanelMaximumHeight > 302) unsafeWindow.performDelayLoad('featured');
                }
                
                if (doc.getElementById('watch-video-responses-children')) {
                    stripUrlParameters('watch-video-responses-children', '&watch_response');
                    addFmtParameter('watch-video-responses-children');
                    onClickVideoResponsesArrows();
                }
            },
            300);
            clearInterval(intervalID);
        },
        200);
    };
    
    var addFmtParameter = function(id) {
        if (addFmtToVideoLinks < 1) return;
        var xpath = '//div[@id="' + id + '"]//a[contains(@href, "/watch?") and not(contains(@href, "&fmt="))]';
        forEachElements(xpath, function(e) {e.href += "&fmt=18";});
    };
    
    var removeChannelBanner = function() {
        GM_addStyle('#watch-other-vids #watch-channel-brand-cap {display: none !important;}');
    };
    
    var removeTextDecoration = function() {
        var xpath = '//div[@id="watch-other-vids"]//div[@class="watch-playlist-row-middle"]/*';
        forEachElements(xpath, function(e) {
            e.style.textDecoration = 'none';
        });
    };
    
    
    moviePlayer.setAttribute('wmode', 'transparent');
    if (videoControllerOpacity) dimController();
    if (!enableChannelBanner) removeChannelBanner();
    window.addEventListener('load', function() {
        if (autoScrollMode) scrollIntoView('movie_player', autoScrollMode - 1);
        if (enableHugePlayer) expandPlayer();
        removeTextDecoration();
        appendVideoInfo();
        toggleSearchBarItems();
        completeQuickListLoad();
        modPanels();
        addFmtParameter('baseDiv');
    },
    false);
(function(){
	var auth_impl = function(){
		var impl = function(node){
			var username = node.firstChild.nodeValue;
			var url = "http://gdata.youtube.com/feeds/api/users/"+username;
			var callback = function(r){
				var r = r.responseText;
				var age="",gender="",loc="";
				if(/<yt:age>(.*)<\/yt:age>/.test(r)){
					age = RegExp.$1;
				}
				if(/<yt:gender>(.*)<\/yt:gender>/.test(r)){
					gender= RegExp.$1;
				}
				if(/<yt:location>(.*)<\/yt:location>/.test(r)){
					loc = RegExp.$1;
				}
				node.firstChild.nodeValue += "("+loc+":"+age+":"+gender+")";
			};
			GM_xmlhttpRequest({method: 'GET', url: url, onload: callback});
		}
		var auths = document.getElementsByClassName("watch-comment-auth");
		for(var i in auths){
			impl(auths[i]);
		}
	};
	auth_impl();
	
	GM_registerMenuCommand('ShowYouTubeCommentProfile - show profile manually', auth_impl)
})();
})();