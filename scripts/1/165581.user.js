// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// @description	  A nice, simple pink theme for Facebook.
// @homepage      
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==

(function() {
var css = "body{background-color:#fff5ff}.hasRightCol.homeFixedLayout.homeWiderContent.hasExpandedComposer.newsFeedComposer{position:relative;z-index:1}.hasLeftCol #leftCol{background:none repeat scroll 0 0 #fff;border:1px solid #ccc;display:block;padding-bottom:15px;position:relative;z-index:0}#blueBar{background-color:#fc44a3;border-bottom:1px solid #ed159e;min-width:981px;position:relative;z-index:300}#pageLogo a:hover,#pageLogo a:focus,#pageLogo a:active{background-color:#e874c9}.fbJewel a.jewelButton:active,.fbJewel a.jewelButton:focus,.fbJewel a.jewelButton:hover{background-color:#e874c9;outline:medium none;text-decoration:none}#pageNav .navLink:after{background:#e874c9}#pageNav .navLink:hover,#pageNav .navLink:focus,#pageNav .navLink:active{background-color:#e874c9;color:#fff;outline:medium none;z-index:1}#navSearch .uiTypeahead{border:1px solid #ed159e;border-radius:2px 2px 2px 2px}.uiSideNav .item,.uiSideNav .subitem{border-bottom:1px solid #fff;color:#422;display:block;line-height:13px;min-height:17px;padding:3px 8px 0 28px;text-decoration:none}.uiSideNav .item:hover,.uiSideNav .item:active,.uiSideNav .item:focus,.uiSideNav .subitem:hover,.uiSideNav .subitem:active,.uiSideNav .subitem:focus,.uiSideNav .highlighted .item:hover,.uiSideNav ul .highlighted .subitem:hover{background-color:#f7e9f3;text-decoration:none}.shareRedesignText,.shareRedesignContainer,.shareRedesign .shareMediaVideo{background-color:#f8f0fa}.uiSideNavCount{background-color:#eddaf5;border-radius:2px 2px 2px 2px;color:#f01f81;font-weight:bold;left:-1px;padding:0 4px;position:relative}a{color:#f01f81}.fbReminders .fbRemindersStory .fbRemindersTitle{color:#f01f81}.shareRedesign .uiAttachmentTitle{color:#f01f81}.UIActionLinks_bottom a,.UIActionLinks_bottom button.as_link,.UIActionLinks_bottom .uiLinkButton input,.UIActionLinks_bottom .uiLinkButton input:hover{color:#c97fc8}.UFIRow{background-color:#f7e1f1;margin-top:1px;padding:4px}.UFIUnseenItem{border-left:2px solid #e3afe2;padding-left:2px}.uiTypeahead{border-color:#d4bdd8}";
    css += "html ._4lh,._4lh .fbTimelineScrubber,._4lh .fbTimelineTimePeriod,._4lh .fbTimelineSectionExpandPager .uiMorePagerLoader,._4lh .fbTimelineCapsule li.anchorUnit:last-child,._4lh .fbTimelineSectionLoading .loadingIndicator,._4lh .fbTimelineTwoColumn .composerVeil,._4lh .timelineTourStarted .contextualBlind,._4lh .lifeEventAddPhoto:hover{background-color:#f5e6f2}._4lh .timelineUnitContainer .UFIContainer,._4lh .timelineUnitContainer .fbTimelineFeedbackActions,._4lh .timelineUnitContainer .UFIRow,._4lh .timelineUnitContainer .UFIList{background:none repeat scroll 0 0 #fcf6fc}._70l:hover{background:none repeat scroll 0 0 #fcf6fc}._70l{background:none repeat scroll 0 0 #faf2fa;border-bottom:1px solid #e9eaed}._6dh ._5142{background-color:#faf2fa}._4jy1,._4jy1._42fr:active,._4jy1._42fr._42fs{background:#ad75b7;border-color:#9960a3}";
    css += "._3cz{background:none repeat scroll 0 0 #fcf6fc;border-bottom:1px solid #d3d6db;border-radius:2px 2px 0 0;margin-bottom:15px;min-height:66px;padding-top:16px}._3t3{background:none repeat scroll 0 0 #faf2fa}._3t3:hover{background:none repeat scroll 0 0 #fcf6fc}.timelineLayout{background:none repeat scroll 0 0 #f5ebf3}.fbPhotosRedesignNavItem{background-color:#f7f2f8;display:inline-block;margin-left:2px;margin-right:3px}.fbPhotosRedesignNavItem:hover{background-color:#f0e8f3}.fbPhotosRedesignNavSelected.fbPhotosRedesignNavItem{background-color:#a56db4}.fbPhotosRedesignNavSelected.fbPhotosRedesignNavItem:hover{background-color:#9258a7}.fbTimelineFeedbackActions{background-color:#f7e1f1;padding:5px 12px}._k-:hover{background-color:#f7f2f8;border-color:#f0e8f3;cursor:pointer}._kv:hover,._kv{background-color:#a56db4;border-color:#9258a7}";
    css += "#fbNotificationsJewel.west a.jewelButton{background-position:0 -285px !important;background-repeat:no-repeat;background-size:auto auto}#fbMessagesJewel a.jewelButton{background-position:-54px -253px !important;background-repeat:no-repeat;background-size:auto auto}#fbRequestsJewel a.jewelButton{background-position:-25px -285px !important;background-repeat:no-repeat;background-size:auto auto}#pageNav .navLink,#pageNav #navAccountLink{color:#fff !important}";
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    heads[0].appendChild(node); 
}
})();