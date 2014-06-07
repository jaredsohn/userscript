// ==UserScript==
// @name          ニコニコ動画:Qの動画再生ページを改良しようとしてみた
// @namespace     http://userstyles.org
// @description	  最新更新：06/11 16:55 Ver.3.02.02 微修正
// @author        ニコニコ動画(Zero) 再生ページ改変
// @homepage      http://userstyles.org/styles/65440
// @include       http://www.nicovideo.jp/watch/*
// @include       http://www.nicovideo.jp/*
// @include       http://seiga.nicovideo.jp/*
// @include       http://live.nicovideo.jp/*
// @include       http://app.nicovideo.jp/*
// @include       http://ichiba.nicovideo.jp/*
// @include       http://jk.nicovideo.jp/*
// @include       http://com.nicovideo.jp/*
// @include       http://info.nicovideo.jp/*
// @include       http://uad.nicovideo.jp/*
// @include       http://commons.nicovideo.jp/*
// @include       http://chokuhan.nicovideo.jp/*
// @include       http://news.nicovideo.jp/*
// @include       https://secure.nicovideo.jp/secure/login_form*
// @include       http://www.nicovideo.jp/*
// @include       http://www.nicovideo.jp/ranking*
// @include       http://live.nicovideo.jp*
// @include       http://dic.nicovideo.jp/*
// @include       http://ichiba.nicovideo.jp/*
// @include       http://commons.nicovideo.jp/*
// @include       http://com.nicovideo.jp/*
// @include       http://news.nicovideo.jp/*
// @include       http://seiga.nicovideo.jp/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "";
if (false || (document.location.href.indexOf("http://www.nicovideo.jp/watch/") == 0))
	css += "#playerContainerSlideArea.size_normal{width: 100% !important}\n#playerContainerSlideArea.size_normal #playerContainer{\n    margin-left: auto !important;\n    margin-right: auto !important\n}\n  \n  \n  \n#leftPanel{\ndisplay:none !important;\nwidth:0px !important;\n}\n#playerContainerSlideArea.size_medium {\n    padding-right: 260px!important;\n}\n  \n  \n  \n#textMarquee{\ndisplay:none !important;\n}\nbody.full_with_browser #playerContainerWrapper {\n    margin-top: 0px !important;\n}\n#playerContainerSlideArea.size_medium #playerContainer.oldTypeCommentInput #playerCommentPanel{\nheight: 450px !important;\n}\n#playerContainerSlideArea.size_normal #playerContainer.oldTypeCommentInput #playerCommentPanel{\nheight: 546px !important;\n}\n  \n\n\n#videoDetailInformation .translation,\n#nicommendContainer,\n.ads_728_google,\n#playerBottomAd,\n#pageFooter,\n#selectionFooterAds,\n.videoStartAdsOuter,\n#videoInfo .translation,\n.videoMenuToggle,\nli.videoMenuList.menuAward,\n#bottomVideoDetailInformation a.triger,\n#videoTagContainerPin,\n.moreTagsExist,\n#topVideoInfo .hiddenInfo .trigger,\n#leftPanelAd,\n#videoReviewBottomAd,\n.resultAdsWrap,\n#topVideoInfo .parentVideoInfo,\n.videoMainInfoContainer #userProfile,\n.videoMainInfoContainer #videoComment,\n#videoInfo .ch_prof,\n#videoInfo #videoShareLinks,\n.extraVideoTrigger,\n.videoMainInfoContainer #videoInfoHead DIV.infoHeadOuter p,\n.videoMainInfoContainer #videoInfoHead .videoInformation,\n\n#videoInfo #videoInfoHead .videoThumb,\n#topVideoInfo .hiddenInfo .extraVideoInfo{\ndisplay:none !important;\n}\n#videoHeader.menuOpened #videoHeaderDetail {\n    margin-top: 0px !important;\n}\n#videoHeader.menuOpened #videoMenuWrapper {\n    height: 0px !important;\n}\n#playerContainer.controll_panel.oldTypeCommentInput.text_marquee {\n    height:auto !important;\n}\n#playerContainerSlideArea.size_normal #playerContainer.full_with_browser.controll_panel.oldTypeCommentInput.text_marquee {\n    height:100% !important;\n}\n\n\n#playlist{\nmargin-left:auto !important;\nmargin-right:auto !important;\nwidth:960px !important;\noverflow:hidden !important;\n}\n.fadeout{\ndisplay:none !important;\n}\n #searchResultExplorerExpand{\n     width: 960px !important;\n     margin-left:auto !important;\nmargin-right:auto !important;\n     \n }\nbody.size_small.no_setting_panel.videoSelection #searchResultExplorerExpand {\n    width: 318px !important;\n}\n#playerContainerWrapper{\nbackground:none !important;\n}\n#outline{\nbackground: none repeat scroll 0% 0% rgb(244, 244, 244)!important;\n}\n\n\n\n#playlistContainer .playlistItem .balloon{\nbottom:90px !important;\n}\na.userName,\nli.videoMenuList,\nli.videoMenuListNicoru,\n.videoMainInfoContainer,\n#videoInfo #videoStats li.ranking,\n.supplementary{\ndisplay:block !important;\n}\n#videoInfo .cct a.contentsTreeIconLink{\npadding-right:8px !important;\n}\n#videoInfo .parentVideoInfo {\n    margin-bottom: -5px !important;\n}\n#bottomVideoDetailInformation{\npadding:0px !important;\n}\n#videoHeader{\npadding-bottom:3px !important;\n}\n\n#videoHeaderDetail{\nmax-width:610px !important;\n}\n#videoDetailInformation{\nborder:none !important;\n}\n#topVideoInfo .videoMainInfoContainer{\nposition:absolute !important;\nleft:685px !important;\nwidth:250px !important;\nheight:400px !important;\ntop:77px !important;\n}\n#videoHeaderMenu{\ntop:-25px !important;\n}\n#videoHeaderMenu .searchContainer .searchText {\npadding:0px !important;\n}\n#topVideoInfo .videoThumb .videoThumbnailImage{\ndisplay:block !important;\nposition:absolute !important;\ntop:-72px !important;\nleft:-75px !important;\nborder: 1px solid rgb(204, 204, 204)!important;\n}\n#topVideoInfo .ch_prof, #topVideoInfo .userProfile {\nposition:absolute !important;\ntop:-55px !important;\nwidth:260px !important;\n}\n.ch_prof .bread{\nfont-size:70% !important\n}\n.ch_prof h6{\nfont-size:100% !important\n}\na.userName:hover{\nbackground:#FFFFFF !important;\n}\n#topVideoInfo{\nwidth:680px !important;\nmin-height:190px !important;\npadding:5px !important;\nmargin:0px !important;\nborder: 1px solid rgb(204, 204, 204)!important;\n}\n#videoDetailInformation .description,\n#topVideoInfo .videoDescriptionHeader,\n.userProfile{\npadding:0px !important;\nmargin:0px !important;\n}\n\n#topVideoInfo .videoStats li{\ndisplay:block !important;\nborder:none !important;\npadding:0px !important;\nwidth:auto !important;\n}\nli.videoStatsView{\nmargin-left:42px !important;\n}\nli.videoStatsComment{\nmargin-left:14px !important;\n}\nli.videoStatsMylist{\nmargin-left:0px !important;\n}\n#topVideoInfo .ranking{\nborder:none !important;\nmargin:0px !important;\npadding:0px !important;\nwidth:250px !important;\n}\n#commentDefault.commentTable,\n#commentLog.commentTable,\n#commentNgSetting.commentTable {\n    bottom: 8px !important;\n}\nul#videoMenuTopList li{\nwidth:0px !important;\nheight:0px !important;\nfont-size:0% !important;\n}\n.defmylistButton span{\nbackground:url(\"http://res.nimg.jp/img/watch/my_btn/default_1.png\") no-repeat !important;\nwidth:96px !important;\nheight:32px !important;\nposition : relative !important;\nleft:-14px !important;\ntop:-32px !important;\n}\n.mylistButton span{\nbackground:url(\"http://res.nimg.jp/img/watch/my_btn/mylist_1.png\") no-repeat !important;\nwidth:80px !important;\nheight:32px !important;\nposition : relative !important;\ntop:-32px !important;\nleft:-94px !important;\n}\n.uadButton span{\nbackground:url(\"http://res.nimg.jp/img/watch/my_btn/uad_1.png\") no-repeat !important;\nwidth:80px !important;\nheight:32px !important;\nposition : relative !important;\ntop:-32px !important;\nleft:-174px !important;\n}\n.downloadButton {\nposition : relative !important;\ntop:-70px !important;\nleft:0px !important;\n}\n.nicoruButton{\nposition : relative !important;\ntop:-70px !important;\nleft:44px !important;\n}\n.nicorub-balloon{\ndisplay: inline-block !important;\n}\n#videoMenuTopList li .nicoruButton .nicoru-button .nicorub-link .nicorub-balloon {\n    width: 50px !important;\n    margin: -12px 0px 0px -7px!important;\n}\n#speedChecker{\ndisplay:none !important;\n}\n.hiddenInfo{\nposition:relative !important;\ntop:0px !important;\nleft:-90px !important;\nwidth:250px !important;\n}\nli.socialLinkExtra{\n    position:relative !important;\n    top: -15px!important;\n    left:-15px!important;\n}\n#topVideoInfo .hiddenInfo .hiddenInfoTabContent {\n    position:absolute !important;\n    top: 35px!important;\n    left:-485px!important;\n    width:650px!important;\n    z-index:20000000!important;\n    border: 1px solid rgb(204, 204, 204)!important;\n}\n#topVideoInfo .hiddenInfo .videoShareBody .shareOptionWrap textarea {\n    width: 200px!important;\n}\n#videoTagContainer,.tagInner{\nwidth:690px!important;\nmin-height:40px!important;\nheight:auto!important;\n}\n.tagInner{\nborder: 1px solid rgb(204, 204, 204)!important;\n}\n.toggleTagEdit{\nbackground:none!important;\n}\n.toggleTagEditInner {\n    display: block !important;\n}\n#videoHeaderTagList{\npadding-left:80px!important;\n}\nbody.content-fix #content {\n    margin-bottom: -26px!important;\n}\n\n#footer {\n    z-index: 999!important;\n}";
if (false || (document.location.href.indexOf("http://www.nicovideo.jp/") == 0) || (document.location.href.indexOf("http://seiga.nicovideo.jp/") == 0) || (document.location.href.indexOf("http://live.nicovideo.jp/") == 0) || (document.location.href.indexOf("http://app.nicovideo.jp/") == 0) || (document.location.href.indexOf("http://ichiba.nicovideo.jp/") == 0) || (document.location.href.indexOf("http://jk.nicovideo.jp/") == 0) || (document.location.href.indexOf("http://com.nicovideo.jp/") == 0) || (document.location.href.indexOf("http://info.nicovideo.jp/") == 0) || (document.location.href.indexOf("http://uad.nicovideo.jp/") == 0) || (document.location.href.indexOf("http://commons.nicovideo.jp/") == 0) || (document.location.href.indexOf("http://chokuhan.nicovideo.jp/") == 0) || (document.location.href.indexOf("http://news.nicovideo.jp/") == 0))
	css += "#siteHeader #siteHeaderInner{\nheight: 26px !important;\n}\n#siteHeaderLeftMenuContainer,#siteHeaderRightMenuContainer{\n    top: 20px !important;\n}\n#siteHeader #siteHeaderInner ul li{\n    height: 22px !important;\n    line-height: 22px !important;\n}\n#siteHeaderUserIconContainer{\nleft:-20px!important;\nwidth: 0px!important;\nheight: 0px!important;\n}\n#siteHeaderNotification.siteHeaderPremium span.siteHeaderAva img{\nwidth: 20px!important;\nheight: 20px!important;\nborder: medium none;\nmargin: 0px!important;\n}\n#zero_lead,#zero_lead_index{\ndisplay:none !important;\n}\n#infoArea{\ntop:28px !important;\n}\n#siteHeaderInner ul li a.siteHeaderPoint {\ndisplay:none !important;\n}";
if (false || (document.location.href.indexOf("https://secure.nicovideo.jp/secure/login_form") == 0))
	css += ".adWrap {\ndisplay:none !important;\n}";
if (false || (document.location.href.indexOf("http://www.nicovideo.jp/") == 0))
	css += "#web_pc_top,\n#head_ads,\n#enjoy,\n.versatile,\n#web_pc_premium,\n#web_pc_360,\n.sideTxtAd,\n#web_pc_footer {\n    display:none !important;\n}\n#PAGEURGENT_sp{\nmargin: 26px 0px -36px !important;\n}";
if (false || (document.location.href.indexOf("http://www.nicovideo.jp/ranking") == 0))
	css += "#web_pc_sidefollow_container {\n    display:none !important;\n}";
if (false || (document.location.href.indexOf("http://live.nicovideo.jp") == 0))
	css += "#ad_bnr,#headerAd,\n#footer_ads,\n#search_right .kokoku {\n    display:none !important;\n}";
if (false || (document.location.href.indexOf("http://dic.nicovideo.jp/") == 0))
	css += "#google_ads_div_nd_tp01_full_ad_wrapper,\n#google_ads_div_nd_mid04_big_ad_wrapper,\n#google_ads_div_nd_mid03_big_ad_container,\n#google_ads_div_nd_ft01_rect_ad_wrapper,\n#google_ads_div_nd_rt03_w-skys_ad_wrapper,\n#google_ads_div_nd_rt04_w-skys_ad_wrapper,\n#google_ads_div_nd_rt01rect-s_ad_wrapper {\n    display:none !important;\n}";
if (false || (document.location.href.indexOf("http://ichiba.nicovideo.jp/") == 0))
	css += "#headerAd,\n#top_event,\n#footerAd {\n    display:none !important;\n}";
if (false || (document.location.href.indexOf("http://commons.nicovideo.jp/") == 0))
	css += "#aswift_1_anchor,\n#Ad {\n    display:none !important;\n}";
if (false || (document.location.href.indexOf("http://com.nicovideo.jp/") == 0))
	css += "#community_pc_top,\n#web_pc_footer,\n#side_ads,\n.mb10 {\n    display:none !important;\n}";
if (false || (document.location.href.indexOf("http://news.nicovideo.jp/") == 0))
	css += "#web_pc_top,\n#web_pc_360,\n#news_pc_skyscraper,\n#WATCH_MIDDLE_BANNER,\n#news_pc_footer,\n#web_pc_footer {\n    display:none !important;\n}";
if (false || (document.location.href.indexOf("http://seiga.nicovideo.jp/") == 0))
	css += "#ad_468_60,\n#seiga_pc_footer,\n.footer_tag_banner_top{\n    display:none !important;\n}";
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
