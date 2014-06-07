// ==UserScript==
// @name          Grey Facebook 
// @description   Turns Facebook color into grey
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
var css =   '#pagelet_navigation, #rightCol, .fbNubFlyoutTitlebar, .uiStreamHeadline, .uiStreamFooter, .uiAttachmentTitle, .userContent, .ogAggregatedTableRowObject, .fbTimelineFeedbackHeader, .fbTimelineUnit.lastCapsule.fbTimelineTwoColumn.clearfix.fbTimelineComposerCapsule, .detail.frame, .tab .title, .timelineReportHeader, .timelineRecentActivityPagerWrapper, .userContentWrapper, ._14d, .fbTimelineSpine, .stickyHeaderWrap, ._7ln, .uiList._4_._4ki.clearfix._6-h._6-j._6-i, .fbPhotoSnowliftActionLinks, .fbPhotosPhotoCaption, .fbPhotoContributorName, #footerContainer, .photoDetailsContainer, .uiHeaderTitle, .mts.likeUnitName.fwb, .fbTimelineBoxCount, .aboveUnitContent, .fbTimelineAggregatedMapUnitSeeAll, ._1x_.fwb, .importantFriendSide, ._s0._8o._8t.lfloat._rw.img, .fbTimelineRibbon, #fbTimelineHeadline .actions, .uiCloseButton, ._4hq, .UFIArrow, .UFILikeSentence, .UFIPagerRow, .UFIShareIcon, .UFIShareLink, .UFICommentActorName, .UFICommentActions, .fbPhotoSnowliftSubscribe, .shareSubtext, .fbxWelcomeBoxName, .fbPhotoTagList, .UIActionLinks {' +
            '    -webkit-filter: grayscale(100%) !important;' +
            '}' +
            'body, .timelineLayout, .fbTimelineTimePeriod{background-color: #ebebeb !important}' +
            '.userContent a, .UFICommentBody a{color: #888 !important}' +
            '.UFIRow{background-color: #efefef !important}' +
            '#blueBar {background-color: #575757 !important; border-bottom: #353535 !important}' +
            '.fbJewel a.jewelButton:active, .fbJewel a.jewelButton:focus, .fbJewel a.jewelButton:hover, #pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active, #pageNav .navItem a:hover, #pageNav .navItem a:focus, #pageNav .navItem a:active, #pageNav #navAccountLink:hover, #pageNav #navAccountLink:focus, #pageNav #navAccountLink:active{background-color:#444; !important}' +
            'a.jewelButton{background-image: url(http://csa-software.de/anderes/facebook-css/images/jmkQ8OUAWR2.png) !important;}';
    
var objStyle = document.createElement("style");
var objText = document.createTextNode(css);
objStyle.appendChild(objText);
document.getElementsByTagName("head")[0].appendChild(objStyle);