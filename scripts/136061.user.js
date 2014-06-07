// ==UserScript==
// @name           CustomGinzaWatch
// @include         http://www.nicovideo.jp/watch/*
// @version        4.0.49
// ==/UserScript==
/*
■参考スクリプト
NicoRankingKidokuDelete　→　http://userscripts.org/scripts/show/45927
*/


var main = function () {

if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {

GM_getValue = function(name, defaultValue) {
var value = localStorage.getItem(name);
if (!value)
return defaultValue;
var type = value[0];
value = value.substring(1);
switch (type) {
case 'b':
return value == 'true';
case 'n':
return Number(value);
default:
return value;
}
}
GM_setValue = function(name, value) {
value = (typeof value)[0] + value;
localStorage.setItem(name, value);
}
if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; } 
}


	//タグクリック等時に同じタブで開く
	function targetself(){
		if( GM_getValue("targetself")=="on"){
			function onajitab(){
				$(".videoDescription a[href*='http://www.nicovideo.jp/mylist/'],#videoHeaderTagList li.videoHeaderTag a.videoHeaderTagLink").click( function() {
					$("body").css("display","none")
					$("#videoExplorerBackContainer").click();
					window.location.href=this.href;
				});
			}
			onajitab();
			setInterval(function(){onajitab()},1000);

			$("head").append('<style type="text/css"></style>');
		}
	}
	//タグクリック等時に別タブで開く
	function targetblank(){
		if( GM_getValue("targetblank")=="on"){
			function betsutab(){
				$(".videoDescription a[href*='http://www.nicovideo.jp/mylist/'],#videoHeaderTagList li.videoHeaderTag a.videoHeaderTagLink").click( function() {
					window.open(this.href,'blank');
					setTimeout(function(){
						$("#videoExplorerBackContainer").click();
					},200);
				});
			}
			betsutab();
			setInterval(function(){betsutab()},1000);

			$("head").append('<style type="text/css"></style>');
		}
	}
	//コメント欄のソーシャルボタンを消す
	function delkomesocial(){
		if( GM_getValue("delkomesocial")=="on"){
			$("head").append('<style type="text/css">#playerTabContainer .socialButtons{display:none!important;}</style>');
		}
	}
	//もっと見るを3列に
	function mottoright3line(){
		if( GM_getValue("mottoright3line")=="on"){
			$("head").append('<style type="text/css"></style>');
		}
	}
	//もっと見るで簡易大百科記事を消す
	function delminidic(){
		if( GM_getValue("delminidic")=="on"){
			$("head").append('<style type="text/css">#videoExplorer div.tagRelatedNicopedia{display:none!important;}</style>');
		}
	}
	//もっと見るでユーザー広告を消す
	function deluserad(){
		if( GM_getValue("deluserad")=="on"){
			$("head").append('<style type="text/css">#videoExplorer div.uadTagRelatedContainer{display:none!important;}</style>');
		}
	}
	//ブラックモード
	function backblack(){
		if( GM_getValue("backblack")=="on"){
			$("head").append('<style type="text/css">body{background-color:#393939!important;}#content,#videoHeader,#outline{background:transparent!important;color:#ccc!important;}*{color:#ccc!important;}#ichibaMain .balloonUe * , #prefDiv * , #playerTabContainer *,#divmottoright *,#menudivmenu *{color:#000000!important;}#videoTagContainer .tagInner #videoHeaderTagList .toggleTagEdit{background-color:#000000!important;}#content #videoTagContainer .tagInner #videoHeaderTagList li.videoHeaderTag a{color:#ccc!important;}#videoStats{border:1px solid #ccc!important;}span.isNotFavoritedText{color:#000000!important;}</style>');
		}
	}
	//下の説明文等を開閉式に
	function josdestoggle(){
		if( GM_getValue("josdestoggle")=="on"){
			var divdata = document.createElement("a");
			divdata.id="toggle10";
			divdata.innerHTML="↓説明文の開閉";
			document.getElementById("playerNicoplayer").appendChild(divdata); 
			$("#toggle10").click(function(){
				$("#outline .outer .main #videoInfo").toggle();
				GM_setValue("josdesDisplay",$("#outline .outer .main #videoInfo").css("display"));
			});
			if(GM_getValue("josdesDisplay")=="none"){
				$("#outline .outer .main #videoInfo").hide();
			}
			$("head").append('<style type="text/css">#toggle10{float:right!important;margin-right:15px;cursor:pointer;}</style>');
		}
	}
	//着うたとかを1行に
	function uta1line(){
		if( GM_getValue("uta1line")=="on"){
			setTimeout(function(){
				var divuta = document.createElement("div");
				divuta.id="divuta";
				document.getElementById("ichibaMain").appendChild(divuta);
				$("#divuta").insertBefore("#ichibaMain .ichiba_mainitem:first");
				$("#ichiba_mainpiaitem").appendTo("#divuta");
				$(".mobile").parent().parent().appendTo("#divuta");
			},2000);

			$("head").append('<style type="text/css">#divuta .ichiba_mainitem{width:100%!important;height:auto!important;}#divuta .ichiba_mainitem dd{float:left!important;margin:0 0 0 10px!important;line-height:20px!important;}#divuta .ichiba_mainitem dt{display:none!important;}#divuta dd.mobile a{width:100px!important;}#divuta dd.mobile a.kashi{background-position:-41px -285px!important;background-size:auto auto!important;}#divuta dd.mobile a.uta{background-position:-41px -70px!important;background-size:auto auto!important;}#divuta dd.mobile a.kisekae{background-position:-40px -250px!important;background-size:auto auto!important;}#divuta dd.mobile a.utafull{background-position:-40px -538px!important;background-size:auto auto!important;}#divuta dd.mobile a.melo{background-position:-40px -33px!important;background-size:auto auto!important;}#divuta dd.mobile a.decome{background-position:-39px -106px!important;background-size:auto auto!important;}#divuta .thumbnail,#divuta .action,#divuta .goIchiba{margin:0!important;}#divuta #ichiba_mainpiaitem,#ichibaMain #divuta dl.pia{width:100%!important;margin:0!important;}#ichibaMain #divuta dl{height:auto!important;}#ichibaMain #divuta dl.pia dd.pia *{font-size:20px!important;}#ichibaMain #divuta dl.pia dd.ichiba{float:left!important;margin-left:10px!important;}#ichibaMain #divuta dl.pia dd.pia span.eke{float:left!important;}#ichibaMain #divuta dl.pia dd.pia a{display:block!important;}#ichibaMain #divuta dl.pia dd.pia{width:auto!important;float:left!important;}</style>');
		}
	}
	//タグを開閉式に
	function tagtoggle(){
		if( GM_getValue("tagtoggle")=="on"){
			var divdata = document.createElement("a");
			divdata.id="toggle9";
			divdata.innerHTML="Tagの開閉";
			document.getElementById("playerNicoplayer").appendChild(divdata); 
			$("#toggle9").click(function(){
				$("#videoTagContainer").toggle();
				GM_setValue("tagDisplay",$("#videoTagContainer").css("display"));
			});
			if(GM_getValue("tagDisplay")=="none"){
				$("#videoTagContainer").hide();
			}
			$("head").append('<style type="text/css">#toggle9{float:left!important;margin-left:15px;cursor:pointer;}</style>');
		}
	}
	//ウォールのアイコンだけを消す
	function walliconoff(){
		if( GM_getValue("walliconoff")=="on"){
			$("head").append('<style type="text/css">#chipWallList{display:none!important;}</style>');
		}
	}
	//検索ボックスを消去
	function delsearchbox(){
		if( GM_getValue("delsearchbox")=="on"){
			$("head").append('<style type="text/css">#videoHeaderMenu .searchContainer{display:none!important;}</style>');
		}
	}
	//タグのピンを常時表示
	function tagpinon(){
		if( GM_getValue("tagpinon")=="on"){
			$("head").append('<style type="text/css">#videoTagContainer .tagInner #videoTagContainerPin{display:block!important;}</style>');
		}
	}
	//ウォールを消す
	function walloff(){
		if( GM_getValue("walloff")=="on"){
			$("head").append('<style type="text/css">#wallImageContainer .wallAlignmentArea , #chipWallList{display:none!important;}</style>');
		}
	}
	//タグのピンを消す
	function deltagpin(){
		if( GM_getValue("deltagpin")=="on"){
			$("head").append('<style type="text/css">#videoTagContainerPin{display:none!important;}</style>');
		}
	}
	//プレイヤーのサイズを大きく
	function bigwatch(){
		if( GM_getValue("bigwatch")=="on" ){
			
$("head").append('<style type="text/css">#playerAlignmentArea.size_normal{width:99%!important;}#playerTabWrapper{float:right!important;position:relative!important;}#playerNicoplayer{float:left!important;}</style>');

			$(window).on("load resize", function(){
				var wh = $(window).height();
				var ww = $(window).width();
				var tw = $("#playerTabWrapper").width();
				var ww2= Math.round(ww*0.99-tw-30)+"px";
				var wh2= Math.round((ww*0.99-tw-30)*0.695)+"px";

				$("#playerAlignmentArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput #nicoplayerContainer,#playerAlignmentArea.size_normal #playerNicoplayer, #playerAlignmentArea.size_normal #external_nicoplayer").css({'cssText': 'width:'+ww2+'!important;height:'+wh2+'!important;'});
				$("#playerContainerWrapper,#playerAlignmentArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput.text_marquee,#playerAlignmentArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput #playerTabWrapper").css({'cssText': 'height:'+wh2+'!important;'});
			});
			
			if( GM_getValue("komepaneltoggle_on")=="on"){

			function panelcheck(){
				var wh = $(window).height();
				var ww = $(window).width();
				var tw = $("#playerTabWrapper").width();
				var tdis = $("#playerTabWrapper").css("display");
				if(tdis=="none"){
					tw=0;
					var thide = "none"
				}else{thide="block"}
				var ww2= Math.round(ww*0.99-tw-30)+"px";
				var wh2= Math.round((ww*0.99-tw-30)*0.695)+"px";

				$("#playerAlignmentArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput #nicoplayerContainer,#playerAlignmentArea.size_normal #playerNicoplayer, #playerAlignmentArea.size_normal #external_nicoplayer").css({'cssText': 'width:'+ww2+'!important;height:'+wh2+'!important;'});
				$("#playerContainerWrapper,#playerAlignmentArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput.text_marquee").css({'cssText': 'height:'+wh2+'!important;'});
				$("#playerAlignmentArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput #playerTabWrapper").css({'cssText': 'height:'+wh2+'!important;display:'+thide});
			}
			panelcheck();
			setInterval(function(){panelcheck()},1000);

			}
		}
	}
	//パンくずリストを消去
	function delbread(){
		if( GM_getValue("delbread")=="on"){
			$("head").append('<style type="text/css">div.ch_breadcrumb{display:none!important;}</style>');
		}
		if( GM_getValue("infotocomepanel_on")=="on" && GM_getValue("delbread")=="on"){
			$("head").append('<style type="text/css">div.ch_breadcrumb,#videoHeaderDetail .videoDetailExpand{display:none!important;}</style>');
		}
	}
	//ツイートボタン等を消去
	function delsocial(){
		if( GM_getValue("delsocial")=="on"){
			$("head").append('<style type="text/css">#videoShareLinks{display:none!important;}#topVideoInfo .socialLinks{display:none!important;}</style>');
		}
	}
	//動画詳細情報を消去
	function delshosai(){
		if( GM_getValue("delshosai")=="on"){
			$("head").append('<style type="text/css">#bottomVideoDetailInformation,#bottomVideoDetailInformation .supplementary{display:none!important;}#topVideoInfo .hiddenInfoTabContent,#topVideoInfo .hiddenInfoTabHeader{display:none!important;}</style>');
		}
	}
	//マイリスボタン・とりあえずマイリスボタン以外を消去
	function delbuttons(){
		if( GM_getValue("delbuttons")=="on"){
			$("head").append('<style type="text/css">#videoMenuTopList .uadButton,#videoMenuTopList .mymemoryButton,#videoMenuTopList .videoMenuListNicoru,#videoMenuTopList .downloadButton,#videoMenuTopList .menuAward,#videoMenuTopList #speedChecker,#videoMenuTopList .userChannel{display:none!important;width:0!important;height:0!important;}#videoMenuWrapper{height:auto!important;}#videoTagContainer{min-height:48px!important;}</style>');
		}
	}
	//ツイートボタンをヘッダーに移動
	function tweetinheader(){
		if( GM_getValue("tweetinheader")=="on"){
			$("head").append('<style type="text/css">.twitter-share-button{margin:7px 0 0 7px!important;}.socialLinkTwitter{width:140px!important;}</style>');
			$("#videoShareLinks li.socialLinkTwitter").appendTo("#siteHeaderInner ul.siteHeaderMenuList");
		}
	}
	//コンテンツツリー消去
	function ctreeCut(){
		if( GM_getValue("ctree_off")=="on"){
			$("head").append('<style type="text/css">.parentVideoInfo{display:none!important;}</style>');
		}
	}
	//簡易動画説明文消去
	function shortinfoCut(){
		if( GM_getValue("shortinfo_off")=="on"){
			$("head").append('<style type="text/css">#videoHeader div.shortVideoInfo,#videoHeader div.toggleDetailExpand{display:none!important;}</style>');
		}
	}
	//下の動画説明文・動画情報を消去
	function deljosdes(){
		if( GM_getValue("deljosdes")=="on"){
			$("head").append('<style type="text/css">#videoInfo{display:none!important;}#videoComment{display:none!important;}</style>');
		}
	}
	//広告消去
	function senCut2(){
		if( GM_getValue("senden2")=="on"){
			$("head").append('<style type="text/css">#tagRelatedBannerContainer,#tagRelatedBanner,#playerBottomAd,#pageFooterAds,#selectionFooter,#videoReviewBottomAd,#resultContainer .resultAdsWrap,#selectionSideAd,.nicoSpotAds{display:none!important;}#videoStartAds{display:none!important;}#leftPanelAdAds,#leftPanelAd{display:none!important;}.ja-jp .panel_ads_shown #playerCommentPanel.has_panel_ads .section #commentDefault.commentTable, .ja-jp .panel_ads_shown #playerCommentPanel.has_panel_ads .section #commentLog.commentTable, .ja-jp .panel_ads_shown #playerCommentPanel.has_panel_ads .section #commentNgSetting.commentTable{bottom:5px!important;}#playerTabWrapper .playerTabContent{bottom:0!important;}#playerTabContainer .playerTabAds{display:none!important;}</style>');
		}
	}
	//コメント一覧非表示
	function comeCut(){
		if( GM_getValue("come_off")=="on"){
			$("head").append('<style type="text/css">#playerTabWrapper{display:none!important;}</style>');
		}
	}
	//動画上マーキー消去
	function marqueeCut(){
		if( GM_getValue("marquee_off")=="on"){
			$("head").append('<style type="text/css">#textMarquee{display:none!important;}#playerContainerSlideArea.size_medium #playerContainer.controll_panel.oldTypeCommentInput.text_marquee,#playerContainerSlideArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput.text_marquee{height:auto!important;}#playerContainerSlideArea.size_medium #playerContainer.full_with_browser.oldTypeCommentInput.text_marquee,#playerContainerSlideArea.size_normal #playerContainer.full_with_browser.oldTypeCommentInput.text_marquee{height:100%!important;}</style>');
//			$("head").append('<style type="text/css">#playerContainerSlideArea.size_medium #playerContainer.controll_panel.oldTypeCommentInput.text_marquee{height:506px!important;}#playerContainerSlideArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput.text_marquee{height:602px!important;}</style>');

			if(GM_getValue("set8_on")=="off"){
				$("head").append('<style type="text/css">#playerAlignmentArea.size_medium #playerContainer.controll_panel.oldTypeCommentInput #playerTabWrapper,#playerAlignmentArea.size_medium #playerContainer.controll_panel.oldTypeCommentInput #playerTabWrapper #playerTabContainer{height:459px!important;}#playerAlignmentArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput #playerTabWrapper,#playerAlignmentArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput #playerTabWrapper #playerTabContainer{height:555px!important;}#playerAlignmentArea.up_marquee.size_medium #playerContainer.controll_panel.oldTypeCommentInput #playerTabWrapper,#playerAlignmentArea.up_marquee.size_medium #playerContainer.controll_panel.oldTypeCommentInput #playerTabWrapper #playerTabContainer{height:516px!important;}#playerAlignmentArea.up_marquee.size_normal #playerContainer.controll_panel.oldTypeCommentInput #playerTabWrapper,#playerAlignmentArea.up_marquee.size_normal #playerContainer.controll_panel.oldTypeCommentInput #playerTabWrapper #playerTabContainer{height:612px!important;}#playerContainer{margin-bottom:0!important;}#playerContainerSlideArea.size_medium #playerContainer.full_with_browser.oldTypeCommentInput.text_marquee,#playerContainerSlideArea.size_normal #playerContainer.full_with_browser.oldTypeCommentInput.text_marquee,#playerAlignmentArea.size_normal #playerContainer.full_with_browser.controll_panel.oldTypeCommentInput.text_marquee{height:100%!important;}#playerAlignmentArea.size_medium #playerContainer.controll_panel.oldTypeCommentInput.text_marquee{height:468px!important;}#playerAlignmentArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput.text_marquee{height:563px!important;}</style>');
				/*setTimeout(function(){
					$("#playerContainerSlideArea.size_medium #playerContainer.controll_panel.oldTypeCommentInput.text_marquee").css("height","488px");
					$("#playerContainerSlideArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput.text_marquee").css("height","573px");
				},2000);*/
			}

		}
	}
	//フィードバックリンク消去
	function feedbackCut(){
		if( GM_getValue("feedback_off")=="on"){
			$("head").append('<style type="text/css">#feedbackLink{display:none!important;}</style>');
		}
	}
	//もっと見るにマイリスコメント？常時表示
	function infoPlus(){
		if( GM_getValue("infoplus")=="on"){
				$("head").append('<style type="text/css">#videoExplorer .column4 .video .balloon{display:block!important;height:auto!important;min-height:46px!important;box-shadow:none!important;padding-top:5px!important;line-height:1.4em!important;top:-80px!important;left:0!important;}#videoExplorer .column4 li.video{margin-top:70px!important;}#videoExplorer .column4 li .balloon ul.videoInformation{display:block!important;}#videoExplorer .column4 li .balloon .videoInformationOuter .videoInformation li{float:none!important;}.balloon .contentInfo{display:none!important;}.balloon .uadComments{font-size:13px!important;line-height:1.2em!important;}</style>');
		}
	}

	//レビュー消去
	function reviewCut(){
		if( GM_getValue("review_off")=="on"){
			$("head").append('<style type="text/css">#videoReview{display:none!important;}</style>');
		}
	}
	//レビューを開閉式に
	function reviewtoggle(){
		if( GM_getValue("reviewtoggle_on")=="on"){
			var divdata = document.createElement("a");
			divdata.id="toggle3";
			divdata.innerHTML="Reviewの開閉";
			document.getElementById("playerNicoplayer").appendChild(divdata); 
			$("#toggle3").click(function(){
				$("#videoReview").toggle();
				GM_setValue("reviewDisplay",$("#videoReview").css("display"));
			});
			if(GM_getValue("reviewDisplay")=="none"){
				$("#videoReview").hide();
			}
			$("head").append('<style type="text/css">#toggle3{float:right!important;margin-left:15px;cursor:pointer;}</style>');
		}
	}
	//市場消去
	function ichibaCut(){
		if( GM_getValue("ichiba_off")=="on"){
			$("head").append('<style type="text/css">#nicoIchiba{display:none!important;}</style>');
		}
	}
	//市場を開閉式に
	function ichibatoggle(){
		if( GM_getValue("ichibatoggle_on")=="on"){
			var divdata = document.createElement("a");
			divdata.id="toggle4";
			divdata.innerHTML="市場の開閉";
			document.getElementById("playerNicoplayer").appendChild(divdata); 
			$("#toggle4").click(function(){
				$("#nicoIchiba").toggle();
				GM_setValue("ichibaDisplay",$("#nicoIchiba").css("display"));
			});
			if(GM_getValue("ichibaDisplay")=="none"){
				$("#nicoIchiba").hide();
			}
			$("head").append('<style type="text/css">#toggle4{float:left!important;margin-left:15px;cursor:pointer;}</style>');
		}
	}
	//マイリスボタン等常時表示
	function tvchanCut(){
		if( GM_getValue("tvchan_off")=="on"){
			$("head").append('<style type="text/css">.videoMenuToggle{display:none !important;}#videoHeader.menuOpened #videoHeaderDetail{margin-top:8px!important;}#videoMenuTopList li{display:block!important;}#videoTagContainer{padding-right:0!important;}#videoMenuTopList li.videoMenuList a.defmylistButton span {background-position: -44px -929px!important;}#videoMenuTopList li.videoMenuList a.mylistButton span{background-position: -2px -929px!important;}#videoMenuTopList li.videoMenuList a.uadButton span {background-position: -89px -929px!important;}#videoMenuTopList .videoMenuList.mymemoryButton .button {background-position: -397px -929px!important;}#videoMenuTopList #speedChecker.active .button {background-position: -353px -929px!important;}#videoMenuTopList #speedChecker .button {background-position: -353px -929px!important;}#videoMenuTopList li.videoMenuList a.downloadButton span{background-position: -177px -929px!important;}#videoMenuTopList li.videoMenuList a.userChannelButton span{background-position: -442px -929px!important;}#videoMenuTopList li.videoMenuList, #videoMenuTopList li.videoMenuListNicoru{font-size:0!important;height: 35px !important;width: 35px !important;}#videoMenuTopList li.videoMenuList a span , #videoMenuTopList li.videoMenuList .button{width:32px!important;height:32px!important;border-radius: 5px;}#videoMenuTopList li .nicoruButton .nicorub-link {width:32px!important;height:32px!important;border-radius: 5px;background: url("http://res.nimg.jp/img/watch_zero/sprites/watch-s4bdca239f7.png") no-repeat scroll -133px -929px transparent !important;}#videoMenuTopList li .nicoruButton .nicorub-link span.nicorub-icon {left: 6px!important;top: 6px!important;}#videoTagContainer.default{width:779px!important;min-width:779px!important;}#videoTagContainer{width:779px!important;min-width:779px!important;}#videoMenuTopList{padding-right:0!important;}#videoMenuWrapper{float:right!important;}#videoTagContainer{float:left!important;margin-top:0!important;height:auto!important;min-height:62px!important;}body.size_normal #videoTagContainer{width:898px!important;min-width:898px!important;}body.size_normal #videoTagContainer.dafault{width:898px!important;min-width:898px!important;}#videoMenuWrapper{overflow:visible!important;}#videoMenuTopList{margin-top:0!important;}</style>');
			if( GM_getValue("infocombine3")=="off"){
				$("head").append('<style type="text/css">#videoMenuTopList{width:175px!important;}#videoMenuWrapper{width:175px!important;height:60px!important;}</style>');
			}
		}
	}
	//コメント一覧の幅を広げる
	function komespread(){
		if( GM_getValue("spread_on")=="on"){
			$("head").append('<style type="text/css">#playerAlignmentArea.size_medium{width:1082px!important;}#playerAlignmentArea.size_normal{width:1307px!important;}#playerTabWrapper{float:right!important;position:relative!important;width:400px!important;}#playerNicoplayer{float:left!important;}#playerTabContainer .playerTabHeader .nicommend{border-right: 1px solid #333333;}#commentDefault .commentTableContainer{width:386px!important;}#appliPanel{display:none!important;}.area-JP .panel_ads_shown #playerTabContainer.has_panel_ads .playerTabAds{display:none!important;}body.size_normal #videoHeader{width:1307px!important;}body.size_medium #videoHeader{width:1082px!important;}body.size_medium .outer{width:1082px!important;}body.size_normal .outer{width:1307px!important;}#commentLog div.commentTableContainer{width:100%!important;}#playerTabContainer .playerTabHeader .playerTabItem{width:133px!important;}</style>');
		}
	}
	//プレイヤー下のプレイリストを消去
	function playlistCut(){
		if( GM_getValue("playlist_off")=="on"){
			$("head").append('<style type="text/css">#playlist{display:none!important;}</style>');
		}
	}
	//もっと見るバーを消去
	function mottoCut(){
		if( GM_getValue("motto_off")=="on"){
			$("head").append('<style type="text/css">#videoExplorerExpand{display:none!important;}</style>');
		}
	}
	//もっと見るを横に
	function mottoright(){
		if( GM_getValue("mottoright_on")=="on"){

			var divmottoright=document.createElement("div");
			divmottoright.id="divmottoright";
			document.body.appendChild(divmottoright);
			$("#videoExplorer").appendTo("#divmottoright");

			var divdata = document.createElement("a");
			divdata.id="mottorightbutton";
			divdata.innerHTML="もっと見る(右)の開閉";
			document.getElementById("playerNicoplayer").appendChild(divdata); 
			$("#divmottoright").hide();
			$("#mottorightbutton").click(function(){
				$("#divmottoright").animate(
					{width:"toggle",opacity:"toggle"},
					"slow"
				);
			});

			document.onkeydown = function(e){
				if(e.target.type=="textarea"||e.target.type=="text"){
				return;
				}else{
				switch(e.keyCode){
					case 83:
					$("#divmottoright").animate(
						{width:"toggle",opacity:"toggle"},
						"slow"
					);
				}
				}
			}

			$("#siteHeader,#content .videoHeaderOuter,#bottomContentTabContainer,#footer").click(function(e){
				if(!$(e.target).is("#mottorightbutton,#videoExplorerBackContainer,#videoHeaderTagList li.videoHeaderTag a.videoHeaderTagLink,.showOtherVideos,.videoDescription a[href*='http://www.nicovideo.jp/mylist/']"))
				$("#divmottoright").hide("slow");
			});


			$("head").append('<style type="text/css">#videoExplorerExpand{display:none!important;}#divmottoright{position:fixed;right:0;top:0;z-index:99999;height:100%;overflow:scroll;overflow-x:hidden;}#mottorightbutton{cursor:pointer;float:right!important;}body{width:100%!important;height:100%!important;overflow-y:scroll!important;}body.full_with_browser{padding-right:0!important;}.wrapper{height:auto!important;}#mottorightbutton2{float:right;margin-right:20px;cursor:pointer;}#playerContainer{margin-bottom:20px;text-align:left!important;}.uadTagRelatedContainer{background: url("http://res.nimg.jp/img/common/uad/bg_grade_2.png") repeat-x scroll 0 0 #FFDD00;}#siteHeaderInner .searchContainer{display:none!important;}#divmottoright,#videoExplorer,#videoExplorer .videoExplorerBody,#videoExplorer .videoExplorerMenu .item.active,.videoExplorerContentWrapper{background-color:#E7E9FD!important;}#videoExplorer .videoExplorerMenu .item .arrow{display:none!important;}img[src="../../../img/watch_zero/noimage.png"]{display:none!important;}#searchResultExplorerButton,#resultContainer h3,#searchResultExplorer{display:none!important;}.videoInformation .itemVideoUad{display:none!important;}#searchResultExplorerExpand{display:none!important;}#searchResultSearchBox,#searchResultNavigation{display:block!important;}ul#resultlist li .thumbContainer img{position:relative!important;}#searchResultNavigation > ul > li a{line-height:20px!important;}#searchResultNavigation > ul > li a:after{display:none!important;}#resultContainer .searchContainer .searchText .searchInput{width:80%!important;}ul#resultlist li .thumbContainer{border-color:transparent!important;}#searchResultNavigation > ul > li a{padding:0!important;}#searchResultMylistDetail{margin-bottom:20px!important;}#searchResultUadTagRelatedContainer{display:none!important;}#videoHeaderMenu .searchContainer{display:none!important;}#videoExplorer div.videoExplorerMenu div:first-of-type{height:0!important;}#videoExplorer div.videoExplorerMenu .itemList li.item span.text{text-overflow: ellipsis!important;}.videoExplorerBody .searchBox .searchText .searchInput{width:80%!important;}#videoExplorer .videoExplorerBody{display:block!important;}#videoExplorerExpand{display:none!important;}#selectionSideAd{display:none!important;}#nicoplayerContainer #external_nicoplayer{position:relative!important;}.videoExplorerBody .videoExplorerContent.column4 .contentItemList .item.item4n-3{clear:none!important;}#bottomContentTabContainer.videoExplorer #outline{display:block!important;position:relative!important;}body.size_small.no_setting_panel.videoExplorer #playerContainerWrapper{position:relative!important;height:468px!important;width:1082px!important;margin:0 auto!important;}#playerAlignmentArea.size_small #playerContainer.controll_panel.oldTypeCommentInput #nicoplayerContainer, #playerAlignmentArea.size_small #playerContainer.controll_panel.oldTypeCommentInput #external_nicoplayer{height:468px!important;width:672px!important;}#playerTabWrapper{top:0!important;}body.size_small.no_setting_panel.videoExplorer #playerContainerWrapper #playerAlignmentArea{width:100%!important;}#playerAlignmentArea.size_small #playerContainer.controll_panel.oldTypeCommentInput #playerTabWrapper{height:468px!important;}.videoExplorerBody .videoExplorerContent.column4 .contentItemList .video .column4 span.title{display:block!important;clear:both!important;height:70px!important;}.videoExplorerBody .videoExplorerContent.column4 .contentItemList .video .column4 .videoInformation{display:block!important;}.videoExplorerBody .videoExplorerContent .contentItemList .item .videoInformation .info, .videoExplorerBody .videoExplorerContent .suggestVideo .item .videoInformation .info{display:block!important;}#videoExplorerBackContainer{visibility:hidden!important;}body.full_with_browser #playerTabWrapper{display:none!important;}</style>');


		if( GM_getValue("mottoright3line")=="on"){
			$("head").append('<style type="text/css">#searchResultContainer,#searchResult,#divmottoright,#videoExplorer{width:580px;}.topicPath{width:400px!important;}#divmottoright .videoExplorerContentWrapper{margin-left:5px!important;padding-top:10px!important;}#videoExplorer .videoExplorerMenu{position:relative!important;width:560px!important;top:0!important;height:50px!important;}#videoExplorer .videoExplorerMenu .videoExplorerMenuInner{width:560px!important;position:relative!important;top:0!important;left:0!important;}#videoExplorer .videoExplorerMenu .item{float:left!important;width:140px!important;white-space: nowrap;overflow: hidden;text-overflow: ellipsis!important;}.videoExplorerContent{padding:0!important;width:555px!important;}.uadTagRelated .default,.uadTagRelated.isEmpty .empty{height:270px!important;}.videoExplorerBody .videoExplorerContent .contentItemList .item .thumbnailContainer .noImage, .videoExplorerBody .videoExplorerContent .contentItemList .item .thumbnailContainer .thumbnail, .videoExplorerBody .videoExplorerContent .suggestVideo .item .thumbnailContainer .noImage, .videoExplorerBody .videoExplorerContent .suggestVideo .item .thumbnailContainer .thumbnail,.uadTagRelated .default .itemList .item .imageContainer .itemImageWrapper .itemImage{width:130px!important;height:100px!important;top:0!important;left:0!important;}.videoExplorerBody .videoExplorerContent .contentItemList .item .thumbnailContainer, .videoExplorerBody .videoExplorerContent .suggestVideo .item .thumbnailContainer,.uadTagRelated .default .itemList .item .imageContainer .itemImageWrapper,.uadTagRelated .default .itemList .item .imageContainer{width:150px!important;height:100px!important;}.videoExplorerBody .videoExplorerContent.column4 .contentItemList .item{width:155px!important;}#videoExplorer .column4 .video .balloon{width:114px!important;}.uadTagRelated .default .itemList .item.graderankSilver .uadFrame,.uadTagRelated .default .itemList .item.graderankGold .uadFrame,.videoExplorerBody .videoExplorerContent .contentItemList .item.silver .uadFrame, .videoExplorerBody .videoExplorerContent .suggestVideo .item.silver .uadFrame,.videoExplorerBody .videoExplorerContent .contentItemList .item.gold .uadFrame, .videoExplorerBody .videoExplorerContent .suggestVideo .item.gold .uadFrame{background-size:130px 100px!important;height:100px!important;}.videoExplorerBody .videoExplorerContent.column4 .contentItemList .item{margin-right:12px!important;margin-left:12px!important;}.videoExplorerBody .contentItemList{width:550px!important;max-width:550px!important;min-width:550px!important;clear:none!important;}.uadTagRelated .default .itemList .item{margin-right:5px!important;margin-left:5px!important;margin-top:5px!important;}.uadTagRelated .default{padding-bottom:40px!important;}.videoExplorerBody .videoExplorerContent .contentItemList .item .title, .videoExplorerBody .videoExplorerContent .suggestVideo .item .title{line-height:1.3em!important;}.videoExplorerBody .contentItemList *{background-repeat:no-repeat!important;}#videoExplorer .videoExplorerMenu{display:none!important;}</style>');
		}else{
			$("head").append('<style type="text/css">#divmottoright,#videoExplorer{width:371px;}.topicPath{width:330px!important;}#searchResultOptions{width:330px!important;}#searchResultMylistOptions{width:340px!important;}#divmottoright .videoExplorerContentWrapper{margin-left:5px!important;padding-top:10px!important;}#videoExplorer .videoExplorerMenu{display:none!important;position:relative!important;width:355px!important;top:0!important;height:50px!important;}#videoExplorer .videoExplorerMenu .videoExplorerMenuInner{width:355px!important;position:relative!important;top:0!important;left:0!important;}#videoExplorer .videoExplorerMenu .item{float:left!important;width:88px!important;white-space: nowrap;overflow: hidden;text-overflow: ellipsis!important;}.videoExplorerContent{padding:0!important;width:345px!important;}.videoExplorerBody .contentItemList{width:340px!important;max-width:340px!important;min-width:340px!important;}.uadTagRelated .default,.uadTagRelated.isEmpty .empty{height:270px!important;}.videoExplorerBody .videoExplorerContent .contentItemList .item .thumbnailContainer .noImage, .videoExplorerBody .videoExplorerContent .contentItemList .item .thumbnailContainer .thumbnail, .videoExplorerBody .videoExplorerContent .suggestVideo .item .thumbnailContainer .noImage, .videoExplorerBody .videoExplorerContent .suggestVideo .item .thumbnailContainer .thumbnail,.uadTagRelated .default .itemList .item .imageContainer .itemImageWrapper .itemImage{width:130px!important;height:100px!important;top:0!important;left:0!important;}.videoExplorerBody .videoExplorerContent .contentItemList .item .thumbnailContainer, .videoExplorerBody .videoExplorerContent .suggestVideo .item .thumbnailContainer,.uadTagRelated .default .itemList .item .imageContainer .itemImageWrapper,.uadTagRelated .default .itemList .item .imageContainer{width:130px!important;height:100px!important;}.videoExplorerBody .videoExplorerContent.column4 .contentItemList .item{width:130px!important;}#videoExplorer .column4 .video .balloon{width:114px!important;}.uadTagRelated .default .itemList .item.graderankSilver .uadFrame,.uadTagRelated .default .itemList .item.graderankGold .uadFrame,.videoExplorerBody .videoExplorerContent .contentItemList .item.silver .uadFrame, .videoExplorerBody .videoExplorerContent .suggestVideo .item.silver .uadFrame,.videoExplorerBody .videoExplorerContent .contentItemList .item.gold .uadFrame, .videoExplorerBody .videoExplorerContent .suggestVideo .item.gold .uadFrame{background-size:130px 100px!important;height:100px!important;}.videoExplorerBody .videoExplorerContent.column4 .contentItemList .item{margin-right:20px!important;margin-left:20px!important;}.videoExplorerBody .contentItemList{width:340px!important;max-width:340px!important;min-width:340px!important;clear:none!important;}.uadTagRelated .default .itemList .item{margin-right:5px!important;margin-left:5px!important;margin-top:5px!important;}.uadTagRelated .default{padding-bottom:40px!important;}</style>');
			}

			function saisettei(){
				$(".videoDescription a[href*='http://www.nicovideo.jp/mylist/'],#videoHeaderTagList li.videoHeaderTag a.videoHeaderTagLink,.showOtherVideos").click( function() {
					$("#divmottoright").show("slow");
					$("#videoExplorerBackContainer").click();
				});
			}
			saisettei();
			setInterval(function(){saisettei()},3000);

			function denymini(){
				if($("body").hasClass("setting_panel")){
					return;
				}else if($("body").hasClass("size_small")){
						$("#videoExplorerBackContainer").click();
				}
			}
			denymini();
			setInterval(function(){denymini()},500);


var timerID = setInterval( 
	function(){
		if(document.getElementById("videoHeaderTagList").getElementsByTagName("li").length>1){
			setTimeout(function(){
				$("#videoExplorerExpand a.expandButton").click();
				$("#videoExplorerBackContainer").click();

				clearInterval(timerID);
				timerID = null;
			},1000);

		}
	},1000);


		}
	}
	//市場の幅を広げる
	function wideichiba(){
		if( GM_getValue("wideichiba_on")=="on"){

			if( GM_getValue("infotocomepanel_on")=="on"　|| GM_getValue("spread_on")=="on"){
				$("head").append('<style type="text/css">body .main{width:100%!important;}#nicoIchiba{width:100%!important;}#ichibaMain{width:100%!important;margin:0 auto!important;}#bottomContentTabContainer #outline .outer .main #videoInfo{margin:0 auto;}#ichibaMainFooter{clear:both!important;}.rowJustify{clear:none!important;}body.size_medium #bottomContentTabContainer #outline .outer{width:1082px!important;}body.size_normal #bottomContentTabContainer #outline .outer{width:1307px!important;}#ichibaMain dl{height:400px!important;}</style>');
				if( GM_getValue("miniichiba_on")=="off"){
					$("head").append('<style type="text/css">body.size_medium #ichibaMain dl{margin: 0 18px 10px!important;}body.size_normal #ichibaMain dl{margin: 0 18px 10px!important;}</style>');
				}else{
					$("head").append('<style type="text/css">body.size_medium #ichibaMain dl{margin: 0 9px 10px!important;}body.size_normal #ichibaMain dl{margin: 0 14px 10px!important;}</style>');
				}
			}else{
				$("head").append('<style type="text/css">body.size_normal .outer,body.size_normal .main{width:1234px!important;}#nicoIchiba{width:100%!important;}#ichibaMain{width:100%!important;margin:0 auto!important;}#bottomContentTabContainer #outline .outer .main #videoInfo{margin:0 auto;}#ichibaMainFooter{clear:both!important;}.rowJustify{clear:none!important;}#ichibaMain #ichibaMainHeader{margin-right: 20px!important;}#bottomContentTabContainer #outline .outer .main #videoInfo{width:1008px;}body.size_normal #bottomContentTabContainer #outline .outer .main #videoInfo{width:1234px;}body .main{width:100%!important;}#ichibaMain dl{height:400px!important;}</style>');
				if( GM_getValue("miniichiba_on")=="off"){
					$("head").append('<style type="text/css">body.size_medium #ichibaMain dl{margin: 0 10px 10px!important;}body.size_normal #ichibaMain dl{margin: 0 12px 10px!important;}</style>');
				}else{
					$("head").append('<style type="text/css">body.size_medium #ichibaMain dl{margin: 0 16px 10px!important;}body.size_normal #ichibaMain dl{margin: 0 9px 10px!important;}</style>');
				}
			}
		}
	}
	//市場の商品画像等を小さく
	function miniichiba(){
		if( GM_getValue("miniichiba_on")=="on"){
			
			if( GM_getValue("infotocomepanel_on")=="on"　|| GM_getValue("spread_on")=="on"){
			$("head").append('<style type="text/css">.ichiba_item img{width:130px!important;height:130px!important;}#ichibaMain .balloonUe{width:132px!important;}#ichibaMain .balloonUe a{background-size: 132px 40px !important;}#ichibaMain .balloonShita img{width:132px!important;}#ichibaMain dl{width:135px!important;overflow:hidden!important;}#ichibaMain .balloonUe{font-size:10px!important;}#ichibaMain .itemname{font-size:11px!important;}#ichibaMain dd.mobile a.uta{background-size: 73% auto!important;background-position: 0 -50px!important;}#ichibaMain dd.mobile a.kashi{background-size: 73% auto!important;background-position: 0 -208px!important;}#ichibaMain dd.mobile a.utafull{background-size: 73% auto!important;background-position: 0 -392px!important;}#ichibaMain .balloonUe a{padding:6px 4px 3px!important;}#ichibaMain dl.pia dd.pia{width:123px!important;}#ichibaMain .balloonUe{bottom:auto!important;}#ichibaMain .balloonUe a{height:30px!important;}</style>');
			}else{
			$("head").append('<style type="text/css">.ichiba_item img{width:130px!important;height:130px!important;}#ichibaMain .balloonUe{width:132px!important;}#ichibaMain .balloonUe a{background-size: 132px 40px !important;}#ichibaMain .balloonShita img{width:132px!important;}#ichibaMain dl{width:135px!important;overflow:hidden!important;}#ichibaMain .balloonUe{font-size:10px!important;}#ichibaMain .itemname{font-size:11px!important;}#ichibaMain dd.mobile a.uta{background-size: 73% auto!important;background-position: 0 -50px!important;}#ichibaMain dd.mobile a.kashi{background-size: 73% auto!important;background-position: 0 -208px!important;}#ichibaMain dd.mobile a.utafull{background-size: 73% auto!important;background-position: 0 -392px!important;}#ichibaMain .balloonUe a{padding:6px 4px 3px!important;}#ichibaMain dl.pia dd.pia{width:123px!important;}#ichibaMain .balloonUe{bottom:auto!important;}#ichibaMain .balloonUe a{height:30px!important;}</style>');
			}
		}
	}
	//ニコるを消す
	function nicorudel(){
		if( GM_getValue("nicorudel_on")=="on"){
			$("head").append('<style type="text/css">ul#videoHeaderTagList li{margin-right:17px!important;}.nicoruWrapper,#ichibaMain .nicoru,.cell span.nicoru-button,.nicorepoNicoru{display:none!important;}#videoShareLinks .socialLinkNicoru,.nicoruPia,.reviewNicoru{display:none!important;}</style>');
		}
	}
	//下の動画詳細情報を常時表示に
	function infonontoggle(){
		if( GM_getValue("infonontoggle_on")=="on"){
			$("head").append('<style type="text/css">.extraVideoTrigger .open, .extraVideoTrigger .close{display:none!important;}.supplementary{display:block!important;}#topVideoInfo .hiddenInfoTabContent{display:block!important;}</style>');
		}
	}
	//左寄せにする
	function hidariyose(){
		if( GM_getValue("left_on")=="on"){
			$("head").append('<style type="text/css">#videoHeader,#siteHeaderInner,.outer,#foot_inner{margin:0 0 0 15px!important;}#playerContainerSlideArea{margin-bottom:5px!important;}#playlist{clear:both!important;}#playerAlignmentArea{margin-left:15px!important;}#playerContainerSlideArea.size_small{margin-left:0!important;}#siteHeader #siteHeaderInner .siteHeaderMenuList{float:left!important;}body.full_with_browser #playerAlignmentArea{margin-left:0!important;}</style>');
		}
	}
	//ヘッダー消去
	function headcut(){
		if( GM_getValue("header_off")=="on"){
			$("#zero").appendTo("#content");
			$("head").append('<style type="text/css">#siteHeader{display:none!important;}body #content {padding-top:0px!important;}#zero{position:absolute!important;top:5px!important;right:10px!important;}</style>');
			document.getElementById("zero").innerHTML="設定";
		
				var menudivmenu = document.createElement("div");
				menudivmenu.innerHTML = "メニュー";
				menudivmenu.style.zIndex = 100;
				menudivmenu.id = "menudivmenu";

				document.body.appendChild(menudivmenu);
				$("#menudivmenu").appendTo("#content");

				$("#menudivmenu").hover(
					function () {
						$("#menudiv").css("visibility","visible");
					},
					function () {
						$("#menudiv").css("visibility","hidden");
					}
				);


			var menudiv = document.createElement("div");
				menudiv.id = "menudiv";
				menudiv.style.width = "170px";
				menudiv.style.height = "700px";
				menudiv.innerHTML = "";
				menudiv.style.backgroundColor = "white";
				menudiv.style.border = "1px solid #888";
				menudiv.style.position = "absolute";
				menudiv.style.top = "20px";
				menudiv.style.right = "0px";
				menudiv.style.zIndex = 100;
				menudiv.style.opacity = 1;
/*				menudiv.style.display = 
					(GM_getValue("menudivDisplay") == "none") ? "none" : "";
*/
				document.body.appendChild(menudiv);
				$("#menudiv").appendTo("#menudivmenu");

/*				menudivmenu.addEventListener("click",function(e){
					menudiv.style.display = 
						(menudiv.style.display　== "") ? "none" : "";
					GM_setValue("menudivDisplay",menudiv.style.display);
				},false);
*/
				$("head").append('<style type="text/css">#menudivmenu{position:absolute;top:25px;right:10px;cursor:pointer;color:#ff0099;height:50px;}#siteHeader,#siteHeaderUserIconContainer,#siteHeaderNotificationContainer,#siteHeaderRightMenu,#siteHeaderLeftMenu,#siteHeaderRightMenuUnfix{display:none!important;}#siteHeaderUserContainer{border:none!important;}#menudiv{font-size:15px;visibility:hidden;}#menudiv li{line-height:1.5em;}</style>');


				$(".siteHeaderGlovalNavigation li").appendTo("#menudiv");
				$("#siteHeaderLeftMenuContainer li").appendTo("#menudiv");
				$(".siteHeaderMenuList li").appendTo("#menudiv");
				$("#siteHeaderRightMenuContainer li").appendTo("#menudiv");



			if( GM_getValue("set8_on")=="on"){
			$("#zero").appendTo("body");
				$("head").append('<style type="text/css">#zero{right:80px!important;z-index:9999999;}#menudivmenu{right:80px;}</style>');
			}
		}
	}
	//フッター消去
	function footcut(){
		if( GM_getValue("footer_off")=="on"){
			$("head").append('<style type="text/css">#footer{display:none!important;}body,#content{background-color:#F3F3F3!important;}.outer{margin-bottom:0!important;}</style>');
		}
	}
	//旧検索をヘッダーに追加
	function oldsearch(){
		if( GM_getValue("oldsearch_on")=="on"){
			$("head").append('<style type="text/css">#bar_search{width:100px;height: 24px;}#head_search{margin-top:5px!important;float:left;}#selectsearch{background-color:#525252!important;border:none;height:26px;color:#FFFFFF;}#head_search input#bar_search{background-color:#525252!important;border:none;border-right:1px solid #474747!important;height:26px;color:#FFFFFF;}#submitbutton{background-image:url("http://uni.res.nimg.jp/img/zero_index/theme/default/icon.png");height:26px;width:30px;border:none;}</style>');

			$("#siteHeaderInner").append("<div id='head_search'><form id='head_search_form' method='get' target='_blank' action='http://www.nicovideo.jp/search/'><select id='selectsearch' name='selectsearch'><option value='word'>word</option><option value='tag'>tag</option></select><input id='bar_search' name='s' value='' type='text'><input name='submit' id='submitbutton' type='submit' value=''></form></div>");

			$("#selectsearch").change(function() {
				if($("#selectsearch").val()=="word"){
					$("#head_search_form").attr("action","http://www.nicovideo.jp/search/")
				}else if($("#selectsearch").val()=="tag"){
					$("#head_search_form").attr("action","http://www.nicovideo.jp/tag/")
				}
			});
		}
	}
	//プレイリストを開閉式に
	function playlisttoggle(){
		if( GM_getValue("playlisttoggle_on")=="on"){
			var divdata = document.createElement("a");
			divdata.id="toggle";
			divdata.innerHTML="Playlistの開閉";
			document.getElementById("playerNicoplayer").appendChild(divdata); 
			$("#toggle").click(function(){
				$("#playlist").toggle();
				GM_setValue("playlistDisplay",$("#playlist").css("display"));
			});
			if(GM_getValue("playlistDisplay")=="none"){
				$("#playlist").hide();
			}
			$("head").append('<style type="text/css">#toggle{float:left!important;cursor:pointer;}</style>');
		}
	}
	//コメント一覧を開閉式に
	function komepaneltoggle(){
		if( GM_getValue("komepaneltoggle_on")=="on"){
			var divdata = document.createElement("a");
			divdata.id="toggle2";
			divdata.innerHTML="コメント一覧の開閉";
			document.getElementById("playerNicoplayer").appendChild(divdata); 
			$("#toggle2").click(function(){
				$("#playerTabWrapper").toggle();
				GM_setValue("commentpanelDisplay",$("#playerTabWrapper").css("display"));
			});
			if(GM_getValue("commentpanelDisplay")=="none"){
				$("#playerTabWrapper").hide();
			}
			$("head").append('<style type="text/css">#toggle2{float:right!important;margin-left:15px;cursor:pointer;}</style>');
		}
	}
	//下の動画情報と動画説明文を左右に分離
	function infoseparate(){
		if( GM_getValue("infoseparate_on")=="on"){
			var divinfo=document.createElement("div");
			divinfo.id="divinfo";
			document.body.appendChild(divinfo);
			$("#divinfo").appendTo("#videoInfo .videoMainInfoContainer");
			$("#videoInfo .parentVideoInfo,#videoInfoHead,#bottomVideoDetailInformation,#videoShareLinks").appendTo("#divinfo");
			$("head").append('<style type="text/css">#divinfo{float:right;width:430px;border:1px solid #000000;padding-left:10px;margin-bottom:10px!important;}body.size_normal #divinfo{width:500px;}body.size_normal #videoInfoHead, body.size_normal #videoShareLinks,body.size_normal .blogLinks,body.size_normal .parentVideoInfo, body.size_normal #bottomVideoDetailInformation, body.size_normal .videoEditMenu,body.size_normal #divinfo #userProfile,body.size_normal .videoInformation{width:490px!important;}#videoComment{float:left!important;}#videoInfo{border:none!important;}#videoComment h4{display:none!important;}#nicommendContainer,#nicoIchiba{clear:both!important;}#videoComment{width:540px!important;}body.size_normal #videoComment{width:600px!important;}.videoDescription{border:1px solid #000000;padding:12px 5px 10px 12px!important;}#videoInfoHead, #videoShareLinks,.blogLinks, .parentVideoInfo, #bottomVideoDetailInformation, .videoEditMenu,#divinfo #userProfile,.videoInformation{width:420px!important;}#nicoIchiba{float:left!important;}#videoInfo .videoMainInfoContainer{border-bottom:none!important;}#videoInfo .videoMainInfoContainer{display:block!important;}#topVideoInfo .videoDescriptionHeader,#videoDetailInformation .description{display:none!important;}#topVideoInfo .videoMainInfoContainer{display:none!important;}#videoDetailInformation,.arrow{display:none!important;}#videoHeader div.shortVideoInfo,#videoHeader div.toggleDetailExpand{display:none!important;}#divinfo #userProfile .profile{width:250px!important;}#videoInfo .videoThumb,.videoInformation{float:none!important;}#outline .outer .main,#outline .outer .main #videoInfo{width:100%!important;}body.size_normal #outline .outer{width:1234px!important;}</style>');
			if( GM_getValue("infocombine3")=="off"){
				$("#userProfile").appendTo("#divinfo");
			}
			if( GM_getValue("review_off")=="off"){
			$(".outer .sidebar").appendTo(".outer .main");
			}
		}
	}
	//再生数等を上に移動3
	function infoCombine3(){
		if( GM_getValue("infocombine3")=="on"){
			var divimg=document.createElement("div");
			divimg.id="divimg";
			document.body.appendChild(divimg);
			$("#videoThumbnailImage").css("height","100px").appendTo("#divimg");
			$("#divimg").insertBefore(".videoDetailExpand h2");
			$("#videoInfoHead p:first-child").appendTo(".videoDetailExpand h2").addClass("toko");
			$(".videoHeaderTitle").appendTo(".videoDetailExpand h2");
			$("#videoStats .ranking").appendTo(".toko");
			$(".dicIcon").appendTo(".videoDetailExpand h2").css({"color":"#00BFFF","cursor":"pointer"});
			
			$("#userProfile,#videoInfo .videoMainInfoContainer .ch_prof").appendTo("#videoHeaderDetail");
			$(".usericon").css({"width":"100px","height":"100px","float":"left"});
			$("#videoStats").appendTo("#videoHeaderDetail");


			$("head").append('<style type="text/css">#divimg{float:left;}#videoTagContainer{float:left!important;margin-top:0!important;}#videoStats{float:right!important;height:44px!important;}#videoTagContainer .tagInner #tagEditContainer{padding-top:0!important;}#videoTagContainer .tagInner #tagEditContainer .note{font-size:12px!important;}#videoTagContainer .tagInner #tagEditContainer .tagAddButton input{height:18px!important;}#videoHeader{padding:0!important;}body #videoHeaderDetail{width:1008px!important;}body.size_normal #videoHeaderDetail{width:1234px!important;}#videoHeaderDetail h2{font-size:100%!important;float:left;margin-right:0!important;}.toko{font-size:12px!important;font-weight:normal!important;line-height:1.3!important;}.videoHeaderTitle{font-size:20px!important;}#videoTagContainer .tagInner #videoHeaderTagList li{font-size:12px!important;height:1.2em!important;}.ranking{color:#666666!important;}body.size_medium .videoDetailExpand h2{padding-left:12px!important;width:440px!important;min-height:100px!important;}body.size_normal .videoDetailExpand h2{padding-left:12px!important;width:640px!important;height:100px!important;}.videoDetailExpand{width:584px!important;float:left!important;}#videoMenuTopList{right:0!important;}#videoDetailInformation{clear:both!important;}p.dicIcon span.dic.enable{background: url("http://res.nimg.jp/img/watch_zero/sprites/watch-s4bdca239f7.png") no-repeat scroll 0 -3350px rgba(0, 0, 0, 0);}p.dicIcon span.dic.disable{background: url("http://res.nimg.jp/img/watch_zero/sprites/watch-s4bdca239f7.png") no-repeat scroll 0 -3377px rgba(0, 0, 0, 0);}p.dicIcon{display:inline-block!important;}p.dicIcon span.dic{display:inline-block!important;text-indent:-9999px!important;width:17px!important;height:17px!important;}#videoMenuTopList{padding-right:0!important;}.arrow{display:none!important;}#videoHeader.menuOpened .videoMenuToggle{right:-70px!important;}#videoHeaderMenu{margin-top:0!important;}#userProfile{padding-top:4px!important;}#videoHeader.menuOpened #videoHeaderDetail{margin-top:8px!important;}#videoHeaderDetail .videoDetailExpand{cursor:auto!important;}span.dicIcon{display:none!important;}#videoMenuTopList li.videoMenuList, #videoMenuTopList li.videoMenuListNicoru{font-size:0!important;height: 35px !important;width: 35px !important;}#videoMenuTopList li.videoMenuList a span , #videoMenuTopList li.videoMenuList .button{width:32px!important;height:32px!important;border-radius: 5px;}#videoMenuTopList li .nicoruButton .nicorub-link {width:32px!important;height:32px!important;border-radius: 5px;background: url("http://res.nimg.jp/img/watch_zero/sprites/watch-s4bdca239f7.png") no-repeat scroll -133px -929px transparent !important;}#videoMenuTopList li .nicoruButton .nicorub-link span.nicorub-icon {left: 6px!important;top: 6px!important;}#userProfile{float:right!important;margin-bottom:4px!important;}.userIconContainer{width:110px!important;}.profile{margin-top:0px!important;}#siteHeaderInner .searchContainer .searchText{height:36px;padding:5px;margin-top:0;}#siteHeaderInner .searchContainer{display:block!important;position:relative;width:180px;float:left;}#siteHeader{height:36px!important;}#userProfile .profile{font-size:14px!important;}.ch_prof{float: right !important;margin: 0 0 5px!important;background: transparent!important;padding: 0!important;}.channel .ch_prof a.symbol{width:90px!important;}.channel .ch_prof a.symbol img{width:80px!important;height:80px!important;box-shadow:none!important;}.channel .ch_prof a.symbol:hover img{box-shadow:none!important;}.channel .ch_prof .info{padding:0 0 0 90px!important;}#userProfile .profile h4 a{padding-left:0!important;}#topVideoInfo div.userProfile{display:none!important;}#topVideoInfo div.videoMainInfoContainer .videoThumb,#topVideoInfo div.videoMainInfoContainer .infoHeadOuter,#topVideoInfo div.videoMainInfoContainer .videoInformation{display:none!important;}.userIconContainer a img{border:none!important;}.size_normal .videoDetailExpand{width:800px!important;}.videoMenuToggle{display:none !important;}#videoHeader.menuOpened #videoHeaderDetail{margin-top:8px!important;}#videoMenuTopList li{display:block!important;}#videoTagContainer{padding-right:0!important;}#videoMenuTopList li.videoMenuList a.defmylistButton span {background-position: -44px -929px!important;}#videoMenuTopList li.videoMenuList a.mylistButton span{background-position: -2px -929px!important;}#videoMenuTopList li.videoMenuList a.uadButton span {background-position: -89px -929px!important;}#videoMenuTopList .videoMenuList.mymemoryButton .button {background-position: -397px -929px!important;}#videoMenuTopList #speedChecker.active .button {background-position: -353px -929px!important;}#videoMenuTopList li.videoMenuList a.userChannelButton span{background-position: -442px -929px!important;}#videoMenuTopList #speedChecker .button {background-position: -353px -929px!important;}#videoMenuTopList li.videoMenuList a.downloadButton span{background-position: -177px -929px!important;}#videoMenuTopList li.videoMenuList, #videoMenuTopList li.videoMenuListNicoru{font-size:0!important;height: 35px !important;width: 35px !important;}#videoMenuTopList li.videoMenuList a span , #videoMenuTopList li.videoMenuList .button{width:32px!important;height:32px!important;border-radius: 5px;}#videoMenuTopList li .nicoruButton .nicorub-link {width:32px!important;height:32px!important;border-radius: 5px;background: url("http://res.nimg.jp/img/watch_zero/sprites/watch-s4bdca239f7.png") no-repeat scroll -133px -929px transparent !important;}#videoMenuTopList li .nicoruButton .nicorub-link span.nicorub-icon {left: 6px!important;top: 6px!important;}#videoTagContainer.default{width:592px!important;min-width:592px!important;}#videoTagContainer{width:592px!important;min-width:592px!important;}#videoMenuTopList{padding-right:0!important;}#videoTagContainer{float:left!important;margin-top:0!important;height:auto!important;min-height:50px!important;}body.size_normal #videoTagContainer{width:808px!important;min-width:808px!important;}body.size_normal #videoTagContainer.dafault{width:808px!important;min-width:808px!important;}body.size_medium #videoMenuWrapper{left:592px!important;position:absolute!important;width:80px!important;}body.size_normal #videoMenuWrapper{left:818px!important;position:absolute!important;width:80px!important;}#topVideoInfo div.ch_prof{display:none!important;}#videoMenuTopList{margin-top:0!important;}#videoMenuWrapper{overflow:visible!important;position:absolute!important;left:592px!important;width:70px!important;}#videoMenuTopList{width:70px!important;}#videoTagContainer .tagInner #videoHeaderTagList{padding-left: 80px!important;}#videoTagContainer .tagInner #videoHeaderTagList .toggleTagEdit{height:auto!important;width:60px!important;padding:4px 4px 3px 4px!important;}.ch_prof{width: 275px !important;}#videoHeader div.shortVideoInfo,#videoHeader div.toggleDetailExpand{display:none!important;}#videoStats *{font-size:15px!important;font-weight:bold;}#videoStats span{padding-right:20px;float:right;}#videoStats{line-height:1.5;border:1px solid #333333;}#videoStats li{float:left!important;color:#555555!important;padding-left:5px;}#siteHeaderInner .searchContainer .searchText input{width:115px!important;}#siteHeaderInner .searchContainer .searchText{width:180px!important;background-color:#272727!important;border:none!important;}#siteHeaderInner .searchContainer .searchText a,#siteHeaderInner .searchContainer .searchText button,#siteHeaderInner .searchContainer .searchText input{background-color:#474747!important;color:#FFFFFF!important;border:none!important;}.searchContainer .searchText button{background:url("http://uni.res.nimg.jp/img/zero_index/theme/default/icon.png")!important;border:none!important;width:30px!important;}.searchContainer .searchText a.searchKeywordIcon{background:url("http://uni.res.nimg.jp/img/zero_my/search.png");background-position: -45px -28px;}.searchContainer .searchText a.searchTagIcon{background:url("http://uni.res.nimg.jp/img/zero_my/search.png");background-position: -149px -29px!important;}#siteHeaderInner .searchContainer .searchText a.searchKeywordIcon{width:23px!important;}.searchContainer .searchOption ul li.searchKeyword span{background:url("http://uni.res.nimg.jp/img/zero_my/search.png");background-position: -45px -28px;width:20px!important;}.searchContainer .searchOption ul li.searchTag span{background:url("http://uni.res.nimg.jp/img/zero_my/search.png");background-position: -149px -29px!important;width:20px!important;}body #content {margin-top:8px!important;}</style>');
			$("#videoTitle").remove();
			$("#videoHeaderMenu .searchContainer").appendTo("#siteHeaderInner");

			if( GM_getValue("infotocomepanel_on")=="on"　|| GM_getValue("spread_on")=="on"){
				$("head").append('<style type="text/css">body #videoHeaderDetail{width:1082px!important;}body.size_normal #videoHeaderDetail{width:1307px!important;}#userProfile{width:400px!important;}.profile{width:280px!important;}#videoStats{width:398px!important;}#videoStats li{width:190px!important;}</style>');
			}else{
				$("head").append('<style type="text/css">body #videoHeaderDetail{width:1008px!important;}body.size_normal #videoHeaderDetail{width:1234px!important;}#userProfile{width:326px!important;}.profile{width:192px!important;}#videoStats{width:324px!important;}#videoStats li{width:150px!important;}</style>');
			}

		}
	}

	//動画情報をコメントパネルに
	function infotocomepanel(){
		if( GM_getValue("infotocomepanel_on")=="on"){
			$("head").append('<style type="text/css">#playerAlignmentArea.size_medium{width:1082px!important;}#playerAlignmentArea.size_normal{width:1307px!important;}#playerTabWrapper{float:right!important;position:relative!important;width:400px!important;}#playerNicoplayer{float:left!important;}#commentDefault .commentTableContainer{width:100%!important;}#appliPanel{display:none!important;}.area-JP .panel_ads_shown #playerTabContainer.has_panel_ads .playerTabAds{display:none!important;}#kirikae1{line-height:3em;float:right;cursor:pointer;position:relative;z-index:999999;text-align:center!important;}#videoComment h4{display:none!important;}#hiddenUserProfile,.mymemory,div.videoInformation span.community{display:none;}#videoInfo{border:none!important;text-align:left!important;border-bottom:none!important;padding-top:10px!important;height:390px!important;overflow-y:scroll!important;}#bottomVideoDetailInformation .triger {background: transparent!important;}#videoInfoHead{margin:0!important;}#videoInfo .videoMainInfoContainer{border-bottom:none!important;}#videoInfo .videoEditMenu{margin:0!important;padding:0!important;}#videoInfoHead,#videoShareLinks,#bottomVideoDetailInformation,.videoDescription,.parentVideoInfo,.videoEditMenu,.blogLinks{margin-left:5px!important;width:350px!important;}#appliPanel{height:0!important;}div#topVideoInfo.videoInfo p.videoDescription{width:auto!important;}span.dicIcon{display:none!important;}#topVideoInfo .videoDescriptionHeader,#videoDetailInformation .description{display:none!important;}#topVideoInfo .videoMainInfoContainer{display:none!important;}#videoDetailInformation,.arrow{display:none!important;}#kirikae1{-moz-box-sizing: border-box;background-color: #CCCCCC;border-left: 1px solid #333333;color: #666666;cursor: pointer;font-weight: bold;border-bottom: 1px solid #000000;height: 42px;width: 121px;}#kirikae1.active{background-color: #F4F4F4;color: #333333;cursor: default;border-bottom: medium none;height: 42px;}#bottomVideoDetailInformation .trigger{background:transparent!important;}#videoHeader div.shortVideoInfo,#videoHeader div.toggleDetailExpand{display:none!important;}body.size_normal #videoHeader{width:1307px!important;}body.size_medium #videoHeader{width:1082px!important;}#videoComment{border-bottom: 1px solid #CCCCCC !important;margin-left:5px!important;width:360px!important;padding-bottom:15px!important;margin-bottom:0!important;}#videoComment .videoDescription{line-height:1.5em!important;}#playerTabContainer .playerTabContent{top:45px!important;}#commentLog div.commentTableContainer{width:100%!important;}#playerTabContainer{overflow:hidden!important;}#commentToolTip{width:200px!important;}span.message{display:block!important;white-space:normal!important;word-wrap:break-word!important;}</style>');

			$("#videoInfo").appendTo("#playerTabContainer div.playerTabContent");
			$("#bottomVideoDetailInformation").appendTo("#videoInfo .videoMainInfoContainer");
			$("#videoInfo .parentVideoInfo").appendTo("#videoInfo .videoMainInfoContainer");
			$("#videoShareLinks").appendTo("#videoInfo .videoMainInfoContainer");

			var kirikae1=document.createElement("div");
			kirikae1.id="kirikae1";
			kirikae1.innerHTML="動画説明文";
			document.body.appendChild(kirikae1);
			$("#kirikae1").appendTo("#playerTabContainer thead.playerTabHeader tr");
				$("#videoInfo").css("display","none");

			$("#kirikae1").click(function() {
				$("#playerTabContainer .playerTabContent .comment,#playerTabContainer .playerTabContent .ng,#playerTabContainer .playerTabContent .nicommend").removeClass("active");
				$("#playerTabContainer .playerTabHeader .comment,#playerTabContainer .playerTabHeader .ng,#playerTabContainer .playerTabHeader .nicommend").removeClass("active");
				$("#videoInfo").css("display","block");
				$("#kirikae1").addClass("active");
			});

			$("#playerTabContainer .playerTabHeader th.comment").click(function() {
				$("#playerTabContainer .playerTabHeader .ng,#kirikae1").removeClass("active");
				$("#playerTabContainer .playerTabContent .ng").removeClass("active");
				$("#videoInfo").css("display","none");
				$("#playerTabContainer .playerTabContent .comment,#playerTabContainer .playerTabHeader .comment").addClass("active");
			});

			$("#playerTabContainer .playerTabHeader th.ng").click(function() {
				$("#playerTabContainer .playerTabHeader .comment,#kirikae1").removeClass("active");
				$("#playerTabContainer .playerTabContent .comment").removeClass("active");
				$("#videoInfo").css("display","none");
				$("#playerTabContainer .playerTabHeader .ng,#playerTabContainer .playerTabContent .ng").addClass("active");
			});


var timerID = setInterval( 
	function(){
		if(document.getElementById("commentDefault").getElementsByClassName("commentTableContainerInner")[0].style.height!="0px"){

			setTimeout(function(){
				$("#playerTabContainer .playerTabContent .comment,#playerTabContainer .playerTabContent .ng,#playerTabContainer .playerTabContent .nicommend").removeClass("active");
				$("#playerTabContainer .playerTabHeader .comment,#playerTabContainer .playerTabHeader .ng,#playerTabContainer .playerTabHeader .nicommend").removeClass("active");
				$("#videoInfo").css("display","block");
				$("#kirikae1").addClass("active");
			
				clearInterval(timerID);
				timerID = null;
			},2000);
		}
	},500);


			if( GM_getValue("infocombine3")=="off"){
				$("head").append('<style type="text/css">#videoStats{clear:both!important;margin-bottom:10px!important;}#videoStats li{margin-top:10px!important;}p.dicIcon span.dic.enable{background: url("http://res.nimg.jp/img/watch_zero/sprites/watch-s4bdca239f7.png") no-repeat scroll 0 -3350px rgba(0, 0, 0, 0);}p.dicIcon span.dic.disable{background: url("http://res.nimg.jp/img/watch_zero/sprites/watch-s4bdca239f7.png") no-repeat scroll 0 -3377px rgba(0, 0, 0, 0);}p.dicIcon{display:inline-block!important;}p.dicIcon span.dic{display:inline-block!important;text-indent:-9999px!important;width:17px!important;height:17px!important;}#userProfile{margin-left:10px!important;width:360px!important;}#videoInfo #userProfile .profile{width:200px!important;}</style>');
			}

			if( GM_getValue("infocombine3")=="off" && GM_getValue("motto_off")=="on" ){
				$("head").append('<style type="text/css">#videoHeader #videoHeaderDetail h2{display:none!important;}#videoHeaderDetail .videoDetailExpand{height:0!important;}</style>');
			}
			if( GM_getValue("infocombine3")=="off" && GM_getValue("mottoright_on")=="on"){
				$("head").append('<style type="text/css">#videoHeader #videoHeaderDetail h2{display:none!important;}#videoHeaderDetail .videoDetailExpand{height:0!important;}</style>');
			}
		
		
		}
	}

	//カスタマイズセット8
	function set8(){
		if( GM_getValue("set8_on")=="on"){
			$("head").append('<style type="text/css">#twoMillion,#tagRelatedBanner{display:none!important;}#leftPanel,#playerBottomAd,#pageFooterAds,#feedbackLink,.videoMenuToggle,#videoTitle,#videoDetailInformation,#videoStartAds,.arrow,#videoComment h4,.extraVideoTrigger .open, .extraVideoTrigger .close,#leftPanelAdAds,#leftPanelAd,#selectionFooter,#footer,#videoReviewBottomAd{display:none!important;}p.dicIcon span.dic.enable{background: url("http://res.nimg.jp/img/watch_zero/sprites/watch-s4bdca239f7.png") no-repeat scroll 0 -3350px rgba(0, 0, 0, 0);}p.dicIcon span.dic.disable{background: url("http://res.nimg.jp/img/watch_zero/sprites/watch-s4bdca239f7.png") no-repeat scroll 0 -3377px rgba(0, 0, 0, 0);}p.dicIcon{display:inline-block!important;}p.dicIcon span.dic{display:inline-block!important;text-indent:-9999px!important;width:17px!important;height:17px!important;}#playerContainerSlideArea{margin-bottom:5px!important;}#playlist{clear:both!important;}#playerContainerWrapper{background:transparent!important;padding-top:5px!important;}.videoDetailExpand h2{padding-left:12px!important;}#videoStats li{float:left!important;color:#666666!important;}#videoStats li.videoStatsView{width:115px!important;}#videoStats li.videoStatsComment{width:120px!important;}#videoStats li.videoStatsMylist{width:125px!important;}#videoStats{width:100%!important;height:30px!important;line-height:1.5;font-size:13px!important;border-bottom: 1px solid #CCCCCC !important;padding:10px 0 0 12px!important;background-color:#d4d4d4;}.ranking{color:#666666!important;}#videoHeaderDetail h2{font-size:100%!important;float:left;margin-right:0!important;}.toko{font-size:13px!important;font-weight:normal!important;line-height:1.4!important;}.videoHeaderTitle{font-size:20px!important;}#videoTagContainer .tagInner #videoHeaderTagList li{font-size:12px!important;height:1.2em!important;}#videoTagContainer .tagInner #tagEditContainer{padding-top:0!important;}#videoTagContainer .tagInner #tagEditContainer .note{font-size:12px!important;}#videoTagContainer .tagInner #tagEditContainer .tagAddButton input{height:18px!important;}#userProfile .userIconContainer{width:70px!important;margin:10px 15px!important;}#videoTagContainer{float:left!important;margin-top:0!important;height:auto!important;min-height:42px!important;}#userProfile{width:100%!important;margin-bottom:5px!important;border-bottom: 1px solid #CCCCCC !important;}.profile{width:275px!important;margin-top:10px!important;line-height:1.5em!important;font-size:14px!important;}.profile p{margin-bottom:0!important;line-height:1.3em!important;}#outline{margin-left:10px!important;}#videoHeader{padding:0!important;}#divimg{float:left;}#outline{background:transparent!important;}#videoReviewComment,#videoReview{width:682px!important;}#videoReviewContent #reviewRefresh{width:100px!important;float:right!important;margin-left:auto!important;margin-right:80px!important;}#videoReviewHead{background: none repeat scroll 0 0 #F6F6F6!important;float:right!important;clear:both!important;}#reviewLetterCounter{padding-top:0!important;width:40px!important;float:right!important;margin-left:10px!important;}textarea.newVideoReview{float:right!important;}#videoReviewHead .inputSubmit{margin-top:5px!important;}.videoReviewAside .videoReviewContrl{width:200px!important;float:right!important;}#videoReviewComment,#videoReviewContent,.videoReviewAside{clear:both!important;}#videoReview h3{float:right!important;}p.magnifyButton{float:right!important;width:314px!important;}#videoReviewComment,#videoReview{background:transparent!important;}#videoReviewComment,#videoReviewContent{clear:both!important;}.stream{left:352px!important;}#videoReview {margin:0!important;padding-top:0!important;}#videoReview h3{background-color:#F6F6F6!important;width:308px!important;margin:0!important;padding:3px 0 2px 5px!important;}#playlist {margin:0!important;}#playlistContainer{display:none!important;}#playlistContainer .playlistItem.empty{box-shadow:none!important;}#playlistdiv .pimg{float:left;height:100px!important;overflow:hidden;}#playlistdiv .ptitle{float:left;width:230px;text-align:left!important;padding-left:5px!important;font-size:12px!important;}#playlistdiv .plist{margin:5px 0!important;float:left;width:375px;padding:5px 0 5px 5px!important;}#playlistdiv img{margin-top:0!important;}#playlist .playlistInformation{text-align:left!important;font-size:12px!important;height:58px!important;width:385px!important;line-height:24px!important;}#playlist .playlistInformation .generationMessage{margin-left:10px!important;padding-right:3px!important;width:372px!important;}#playlist .playlistInformation .playbackOption{padding-left:5px!important;border-left:none!important;line-height:24px!important;}#playlist .playlistInformation .playbackOption .option{overflow:visible!important;}#appliPanel{width:0!important;height:0!important;}.videoInformation .itemVideoUad{display:none!important;}.balloon .contentInfo{display:none!important;}.topicPath{width:330px!important;}#searchlist{min-width:375px!important;display:block!important;}.snavi li{float:left;padding:0 10px!important;}.snavi li.active{background-color:#282828!important;}img[src="../../../img/watch_zero/noimage.png"]{display:none!important;}.videoDescription{width:360px!important;padding:10px!important;font-size:14px!important;line-height:1.4em!important;margin-top:15px!important;color:#393F3F;}#videoComment{width:380px!important;margin:0!important;}#footer,#pageFooter{margin:0!important;height:1px!important;padding:0!important;}#playerCommentPanel,#playerCommentPanel .section{width:380px!important;}#playerCommentPanel .section .commentTable{width:378px!important;}#playerCommentPanel .section .commentTable span.time{width:85px}#playerCommentPanel .section .commentTable .commentTableContainer,#playerCommentPanel .section .commentTable .commentTableHeaderOuter{width:378px!important;}#leftPanelAdAds,#leftPanelAd{display:none!important;}.ja-jp .panel_ads_shown #playerCommentPanel.has_panel_ads .section #commentDefault.commentTable, .ja-jp .panel_ads_shown #playerCommentPanel.has_panel_ads .section #commentLog.commentTable, .ja-jp .panel_ads_shown #playerCommentPanel.has_panel_ads .section #commentNgSetting.commentTable{bottom:5px!important;}#videoInfoHead{display:none!important;}#videoInfoHead, #videoShareLinks, .parentVideoInfo, #bottomVideoDetailInformation, .videoEditMenu{width:365px!important;padding-left:10px!important;}.supplementary{display:block!important;line-height:1.5em!important;}.communityExists{line-height:1.5em!important;}.blogLinks{width:300px!important;}.videoEditMenu{padding:0!important;margin:0!important;}#videoHeaderMenu{width:210px!important;}body{width:100%!important;height:100%!important;overflow-y:scroll!important;position:absolute!important;}html{height:100%!important;overflow:hidden!important;}body.full_with_browser{padding-right:0!important;}#siteHeader #siteHeaderInner .siteHeaderMenuList{float:none!important;}#siteHeader #siteHeaderInner .siteHeaderGlovalNavigation{margin-right:20px!important;}#prefDiv{right:0px!important;}#siteHeaderInner{width:910px!important;}#playerCommentPanelOuter{display:none!important;width:0!important;}#playerCommentPanel{height:100%!important;padding:3px 8px 1px 8px!important;}#content{background-color:#F3F3F3!important;}body.full_with_browser.full_and_mini #content{margin-left:0!important;}#playerContainer{text-align:left!important;}#videoExplorer .column4 .video .balloon{display:block!important;height:46px!important;box-shadow:none!important;padding-top:5px!important;line-height:1.2em!important;top:-80px!important;width:149px!important;left:0!important;}#videoExplorer .column4 li.video{margin-top:70px!important;}#videoExplorer .column4 li .balloon ul.videoInformation{display:block!important;}#videoExplorer .column4 li .balloon .videoInformationOuter .videoInformation li{float:none!important;}.balloon .contentInfo{display:none!important;}#videoInfo .videoMainInfoContainer{display:block!important;margin-bottom:16px!important;}.content .column.balloon{width:326px!important;}.content .column{float:right!important;}img[src="http://nicmd.nicovideo.jp/images/list_zero.png"]{width:330px!important;height:106px!important;}.mylistDescriptionLink{top:-16px!important;}#nicommend{border-bottom:none!important;}#videoHeaderMenu .searchContainer{display:none!important;}#videoHeaderMenu{margin-top:0!important;}#videoHeader.menuOpened #videoHeaderDetail {margin-top: 0px!important;}#videoMenuTopList li,#videoMenuWrapper{display:block!important;}#videoMenuTopList{width:70px!important;}#videoMenuTopList{right:0!important;}#videoMenuTopList li.videoMenuList, #videoMenuTopList li.videoMenuListNicoru{font-size:0!important;height: 35px !important;width: 35px !important;}#videoMenuTopList li.videoMenuList a span , #videoMenuTopList li.videoMenuList .button{width:32px!important;height:32px!important;border-radius: 5px;}#videoMenuTopList li .nicoruButton .nicorub-link {width:32px!important;height:32px!important;border-radius: 5px;background: url("http://res.nimg.jp/img/watch_zero/sprites/watch-s4bdca239f7.png") no-repeat scroll -133px -929px transparent !important;}#videoMenuTopList li .nicoruButton .nicorub-link span.nicorub-icon {left: 6px!important;top: 6px!important;}#videoMenuTopList li.videoMenuList a.defmylistButton span {background-position: -44px -929px!important;}#videoMenuTopList li.videoMenuList a.mylistButton span{background-position: -2px -929px!important;}#videoMenuTopList li.videoMenuList a.uadButton span {background-position: -89px -929px!important;}#videoMenuTopList .videoMenuList.mymemoryButton .button {background-position: -397px -929px!important;}#videoMenuTopList #speedChecker.active .button {background-position: -353px -929px!important;}#videoMenuTopList li.videoMenuList a.userChannelButton span{background-position: -442px -929px!important;}#videoMenuTopList #speedChecker .button {background-position: -353px -929px!important;}#videoMenuTopList li.videoMenuList a.downloadButton span{background-position: -177px -929px!important;}#videoHeader.menuOpened #videoHeaderDetail{margin-top:8px!important;}#videoMenuTopList{padding-right:0!important;}#siteHeaderInner .searchContainer .searchText{height:20px;padding:6px;margin-top:2px;}#siteHeaderInner .searchContainer{display:block!important;position:relative;width:100px;float:left;}#siteHeader{height:36px!important;}.nicommendItemList .item{padding:10px 5px 10px 20px!important;}.addMargin{margin-top:45px!important;}.nicommendHeader .reload{margin-top:30px!important;}#videoHeaderDetail .videoDetailExpand{cursor:auto!important;padding:0 8px 5px 0!important;}#videoTagContainer{padding-right:0!important;}span.dicIcon{display:none!important;}.ch_prof{width:100%!important;background:transparent!important;margin-bottom:5px!important;border-bottom: 1px solid #CCCCCC !important;}.channel .ch_prof a.symbol{width:90px!important;}.channel .ch_prof a.symbol img{width:80px!important;height:80px!important;box-shadow:none!important;}.channel .ch_prof a.symbol:hover img{box-shadow:none!important;}.channel .ch_prof .info{padding:0 0 0 90px!important;}#videoHeaderDetail .ch_breadcrumb{display:none!important;}.channel #videoHeaderDetail .ch_prof #ch_prof h6{font-size:13px!important;}.userIconContainer a img{border:none!important;}.toggleTagEdit{width:60px!important;}#videoTagContainer .tagInner #videoHeaderTagList{padding-left:80px!important;}#videoComment .videoDescription a,.supplementary li a{color:#393F3F!important;text-decoration:underline!important;}#userProfile div.profile a{color:#393F3F!important;text-decoration:underline!important;}.profile h4 a{padding-left:0!important;}#divrightbar6 .parentVideoInfo{margin-bottom:5px!important;padding-bottom:5px!important;border-bottom: 1px solid #CCCCCC !important;}#userProfile div.profile span.favVideoOwner{display:block!important;}#divrightbar6 .contentsTree {background:none repeat scroll 0 0 #141414;color:#FFFFFF;padding: 4px 8px 2px;display:block;margin-bottom:5px!important;width:60px!important;}#divrightbar6 .contentsTreeIcon {background:url("http://res.nimg.jp/img/watch_zero/watch-s6283f818f1.png") no-repeat scroll 0 0 transparent;display:inline-block;height:18px;margin-top:-4px;vertical-align:middle;width:18px;margin-right:5px;}#divrightbar4,#divrightbar5,#divrightbar6,#divrightbar7,#divrightbar9,#divrightbar10,#divrightbar11,#divrightbar12{border-left:1px #CCCCCC solid !important;}#divrightbar{position:fixed;top:0;z-index:9999;height:100%;width:65px;background-color:#b8cfe8;}#divrightbar2{position:fixed;right:0px;top:0;z-index:99999;height:100%;width:699px!important;overflow-y:scroll!important;}#divrightbar4{position:fixed;right:0px;top:0;z-index:99999;height:100%;width:400px;background-color:#e7e9fd;overflow:scroll;overflow-x:hidden;}#divrightbar5{position:fixed;right:0px;top:0;z-index:99999;height:100%;width:400px;background-color:#e7e9fd;overflow:scroll;overflow-x:hidden;}#divrightbar6{position:fixed;right:0px;top:0;z-index:99999;height:100%;width:400px;background-color:#e7e9fd;overflow:scroll;overflow-x:hidden;}#divrightbar7{position:fixed;right:0px;top:0;z-index:99999;height:100%;width:400px!important;background-color: #F4F4F4;}#divrightbar9{position:fixed;right:0px;top:0;z-index:99;height:100%;width:200px;background-color:#e7e9fd;overflow:scroll;overflow-x:hidden;}#divrightbar10{position:fixed;right:0px;top:0;z-index:99999;height:100%;width:400px!important;background-color: #F4F4F4;}#divrightbar11{position:fixed;right:0px;top:0;z-index:99999;height:100%;width:400px!important;background-color: #E7E9FD;}#divrightbar12{position:fixed;right:0px;top:0;z-index:99999;height:100%;width:400px!important;background-color: #E7E9FD;}body.size_small #divrightbar{left:1095px!important;}body.size_small #divrightbar2{left:398px!important;}body.size_small #divrightbar4{left:695px!important;}body.size_small #divrightbar5{left:695px!important;}body.size_small #divrightbar6{left:695px!important;}body.size_small #divrightbar7{left:695px!important;}body.size_small #divrightbar9{left:893px!important;}body.size_small #divrightbar10{left:695px!important;}body.size_small #divrightbar11{left:695px!important;}body.size_medium #divrightbar{left:1095px!important;}body.size_small #divrightbar12{left:695px!important;}body.size_medium #divrightbar{left:1095px!important;}body.size_medium #divrightbar2{left:398px!important;}body.size_medium #divrightbar4{left:695px!important;}body.size_medium #divrightbar5{left:695px!important;}body.size_medium #divrightbar6{left:695px!important;}body.size_medium #divrightbar7{left:695px!important;}body.size_medium #divrightbar9{left:893px!important;}body.size_medium #divrightbar10{left:695px!important;}body.size_medium #divrightbar11{left:695px!important;}body.size_medium #divrightbar12{left:695px!important;}body.size_normal #divrightbar{left:1320px!important;}body.size_normal #divrightbar2{left:623px!important;}body.size_normal #divrightbar4{left:920px!important;}body.size_normal #divrightbar5{left:920px!important;}body.size_normal #divrightbar6{left:920px!important;}body.size_normal #divrightbar7{left:920px!important;}body.size_normal #divrightbar9{left:1121px!important;}body.size_normal #divrightbar10{left:920px!important;}body.size_normal #divrightbar11{left:920px!important;}body.size_normal #divrightbar12{left:920px!important;}#playerCommentPanel{border-radius:0!important;}.nicommendHeader{border:none!important;border-radius:0!important;}#playerBottomAd,#pageFooterAds,#selectionFooter,#videoReviewBottomAd{display:none!important;}#videoStartAds{display:none!important;}#leftPanelAdAds,#leftPanelAd{display:none!important;}.ja-jp .panel_ads_shown #playerCommentPanel.has_panel_ads .section #commentDefault.commentTable, .ja-jp .panel_ads_shown #playerCommentPanel.has_panel_ads .section #commentLog.commentTable, .ja-jp .panel_ads_shown #playerCommentPanel.has_panel_ads .section #commentNgSetting.commentTable{bottom:5px!important;}#textMarquee{display:none!important;}#playerContainerSlideArea.size_medium #playerContainer.controll_panel.oldTypeCommentInput.text_marquee,#playerContainerSlideArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput.text_marquee{height:auto!important;}#playerContainerSlideArea.size_medium #playerContainer.full_with_browser.oldTypeCommentInput.text_marquee,#playerContainerSlideArea.size_normal #playerContainer.full_with_browser.oldTypeCommentInput.text_marquee{height:100%!important;}ul#videoHeaderTagList li{margin-right:17px!important;}#outline{padding-top:0!important;}#playerContainerWrapper{padding-bottom:0!important;}.outer{margin:0 auto!important;}.nicommendHeader .description{display:none!important;}#nicommendContainer .content .nicoruButton{display:none!important;}#menudiv li{line-height:1.5em;}#divrightbar6 .parentVideoInfo .videoThumb .videoThumbLink img.videoThumbImg{width:65px!important;height:50px!important;}#bottomVideoDetailInformation .supplementary li span a{margin:0 5px!important;}span[style="font-size: 45px;line-height:1.1;"],span[style="font-size: 90px;line-height:1.1;"],span[style="font-size: 60px;line-height:1.1;"],span[style="font-size: 36px;line-height:1.1;"]{font-size:25px!important;}#siteHeaderInner{width:95%!important;}.socialLinks .socialLinkTwitter,.socialLinks .socialLinkFacebook{width:150px!important;}.socialLinks .socialLinkFacebook .facebook{width:140px!important;}#siteHeaderNotificationPremium{display:none!important;}#videoTagContainer .tagInner #videoHeaderTagList li.videoHeaderTag a{color:#292F2F !important;}#videoTagContainer .tagInner #videoHeaderTagList li{margin-bottom:1px!important;text-decoration: underline!important;}#videoTagContainer .tagInner #videoHeaderTagList .toggleTagEdit{height:auto!important;}#videoTagContainer .tagInner #videoHeaderTagList li .tagControlContainer, #videoTagContainer .tagInner #videoHeaderTagList li .tagControlEditContainer{padding:2px 4px 2px 0!important;}#playerContainer,#playerContainerSlideArea,#content,#siteHeaderInner,.outer,#foot_inner{margin-left:0!important;}#videoHeader{margin-left:10px!important;}.wrapper{padding:0!important;}.column{background-color:#e7e9fd!important;}#nicommend .item, #nicommendSearchResult .item, #nicommendPanel .item,.content .column.balloon{background: url("http://nicmd.nimg.jp/css/../images/bg_content_default.png") repeat-x scroll 0 0 #F4F4F4!important;}#videoTagContainer .tagInner #videoTagContainerPin.active{visibility:hidden!important;}#siteHeader{display:none!important;}body #content {padding-top: 0px!important;}#siteHeaderUserContainer{border:none!important;}#divrightbar9{font-size:17px;line-height:1.6em;padding-top:10px!important;}#divrightbar9 li{list-style-type:square!important;list-style-position:inside!important;padding-left:10px!important;}#divrightbar9 a {color: #393F3F !important;}#divrightbar9 li.menuServiceList{border-bottom:1px #CCCCCC solid !important;margin-bottom:5px!important;padding-bottom:5px!important;}#divrightbar9 li.siteHeaderHorizon{border-top:1px #CCCCCC solid !important;margin-top:5px!important;padding-top:5px!important;}#divrightbar9 li:nth-child(6),#divrightbar9 li:nth-child(12),#divrightbar9 li:nth-child(24){border-bottom:1px #CCCCCC solid !important;margin-bottom:5px!important;padding-bottom:5px!important;}#divrightbar9 li:last-child{margin-bottom:20px!important;}#divrightbar9 a:visited{color:#d90d69!important;}#bottomContentTabContainer.videoSelection #outline{display:block!important;}#ichibaDisplayContent{position:fixed!important;top:0!important;z-index:99999!important;margin:0!important;left:auto!important;right:0px!important;height:100%!important;width:636px!important;}#ichibaConsole,#ichibaConsolePreviewData{height:100%!important;}#ichibaConsoleContents{height:100%!important;overflow-y:scroll!important;}#ichibaConsoleContents{width:360px!important;}#ichibaConsole{width:630px!important;}#ichibaConsoleSearch{height:150px!important;}#ichibaConsolePreviewData{margin-top:-90px!important;}#ichiba_edit_videoitems_contents{margin-top:90px!important;background: none repeat scroll 0 0 #EBEBED!important;}#ichibaConsolePreviewData{background:transparent!important;}#ichibaConsolePreview #ichibaConsoleEnd{padding-right:17px!important;}.nicoruWrapper,#ichibaMain .nicoru,.cell span.nicoru-button,.nicorepoNicoru{display:none!important;}#videoShareLinks .socialLinkNicoru,.nicoruPia,.reviewNicoru{display:none!important;}#ichibaMain,#nicoIchiba,.outer,.main{width:100%!important;}#ichibaMainFooter{clear:both!important;}.rowJustify{clear:none!important;}#ichibaMain #ichibaMainHeader{margin-right: 20px!important;}#ichibaMainFooter p.info,#ichibaMainFooter .associate{display:none!important;}body.size_small.no_setting_panel.videoSelection #playerContainerWrapper{width:898px!important;margin-left:10px!important;position:relative!important;}body.size_small #videoMenuWrapper{width:80px!important;position:absolute!important;left:818px!important;top:0!important;}#playerContainerSlideArea.size_small #nicoplayerContainer, #playerContainerSlideArea.size_small #external_nicoplayer{width:898px!important;}body.size_small .outer{width:672px!important;}body.size_small.no_setting_panel.videoSelection #playerContainerWrapper{height:auto!important;}#playerContainerSlideArea.size_small{width:898px!important;}#playerContainerSlideArea.size_small #playerContainer,#playerContainerSlideArea.size_small #playerContainer.controll_panel.oldTypeCommentInput #nicoplayerContainer, #playerContainerSlideArea.size_small #playerContainer.controll_panel.oldTypeCommentInput #external_nicoplayer{height: 563px!important;}#playerContainerSlideArea.size_small{margin-left:0!important;}body.size_medium .videoDetailExpand h2{max-width:440px!important;}body.size_medium #outline,body.size_medium #videoHeaderDetail,body.size_medium #videoHeader{width:672px!important;}body.size_small #outline,body.size_small #videoHeaderDetail,body.size_small #videoHeader{width:672px!important;}body.size_medium #videoTagContainer,body.size_medium #videoTagContainer.default{width:592px!important;min-width:592px!important;}body.size_small #videoTagContainer,body.size_small #videoTagContainer.default{width:592px!important;min-width:592px!important;}body.size_medium .videoDetailExpand{width:592px!important;float:left!important;}body.size_medium #videoMenuWrapper{width:80px!important;position:absolute!important;left:592px!important;}body.size_normal #outline,body.size_normal #videoHeader,body.size_normal #videoHeaderDetail{width:898px!important;}body.size_normal #videoTagContainer,body.size_normal #videoTagContainer.default{width:808px!important;min-width:808px!important;}body.size_normal .videoDetailExpand{width:808px!important;float:left!important;}body.size_normal #videoMenuWrapper{width:80px!important;position:absolute!important;left:818px!important;}#playerNgPanel #commentNgSettingHeader .commentNgSettingInner .ngAddPanelTriger{width:120px!important;}#playerTabWrapper{display:none!important;}#videoHeader div.shortVideoInfo,#videoHeader div.toggleDetailExpand{display:none!important;}#playerContainerWrapper{margin-left:10px!important;}#playerAlignmentArea{margin-left:0!important;}#divrightbar5 .videoExplorerContentWrapper{margin-left:5px!important;padding-top:10px!important;}#videoExplorer .videoExplorerMenu{position:relative!important;width:355px!important;top:0!important;height:50px!important;display:none!important;}#videoExplorer .videoExplorerMenu .videoExplorerMenuInner{width:355px!important;position:relative!important;top:0!important;left:0!important;}#videoExplorer div.videoExplorerMenu div:first-of-type{height:0!important;}#videoExplorer div.videoExplorerMenu .itemList li.item span.text{text-overflow: ellipsis!important;}#videoExplorer .videoExplorerMenu .item{float:left!important;width:88px!important;white-space: nowrap;overflow: hidden;text-overflow: ellipsis!important;}.videoExplorerBody .searchBox .searchText .searchInput{width:80%!important;}#videoExplorer .videoExplorerBody{display:block!important;}.videoExplorerContent{padding:0!important;width:375px!important;}#videoExplorerExpand{display:none!important;}#selectionSideAd{display:none!important;}body.size_small.no_setting_panel.videoExplorer #playerContainerWrapper{width:898px!important;height:500px!important;box-shadow:none!important;}body.size_small.no_setting_panel.videoExplorer #playerContainerWrapper #playerAlignmentArea,#playerAlignmentArea.size_small #playerNicoplayer, #playerAlignmentArea.size_small #external_nicoplayer{width:898px!important;height:500px!important;}#nicoplayerContainer #external_nicoplayer{position:relative!important;}.uadTagRelated .default,.uadTagRelated.isEmpty .empty{height:270px!important;}.uadTagRelatedContainer{background: url("http://res.nimg.jp/img/common/uad/bg_grade_2.png") repeat-x scroll 0 0 #FFDD00;}#divrightbar10 #playerNgPanel .commentTable span.source{width:100px;}#playerNgPanel .commentTable span.lastHit{width:110px;}#playerAlignmentArea.size_medium #playerContainer.controll_panel.oldTypeCommentInput.text_marquee{height:468px!important;}#playerAlignmentArea.size_normal #playerContainer.controll_panel.oldTypeCommentInput.text_marquee{height:568px!important;}body.full_with_browser #playerAlignmentArea,body.full_with_browser #playerContainerWrapper{margin-left:0!important;}body.full_with_browser #playerAlignmentArea #playerContainer.controll_panel.oldTypeCommentInput.text_marquee{height:100%!important;}#selectsearch{font-size:16px!important;height:26px!important;width:70px!important;}#bar_search{height:24px!important;width:230px!important;}#head_search{margin-left:8px!important;padding-top:20px!important;border-top:1px #CCCCCC solid !important;}#videoMenuWrapper{overflow:visible!important;}#videoMenuTopList{margin-top:0!important;}#videoExplorer,#videoExplorer .videoExplorerBody,.videoExplorerContentWrapper,#videoExplorer .videoExplorerMenu .item.active{background:transparent!important;}#videoExplorer .videoExplorerMenu .item{border:none!important;}.uadTagRelated .default{background: url("http://res.nimg.jp/img/common/uad/bg_grade_2.png") repeat-x scroll 0 0 #FFDD00!important;}body.full_with_browser #divrightbar{display:none!important;}#rbutton{font-size:12px;line-height:1.2em;cursor:pointer;margin:15px 0 10px 7px!important;}#pbutton{font-size:12px;line-height:1.2em;cursor:pointer;margin:0 0 10px 7px!important;}#sbutton{font-size:12px;line-height:1.2em;cursor:pointer;margin:0 0 10px 7px!important;}#dbutton{font-size:12px;line-height:1.2em;cursor:pointer;margin:0 0 10px 7px!important;}#cbutton{font-size:12px;line-height:1.2em;cursor:pointer;margin:0 0 10px 7px!important;}#gbutton{font-size:12px;line-height:1.2em;cursor:pointer;margin:0 0 10px 7px!important;}#mcbutton{font-size:11px;line-height:1.2em;cursor:pointer;margin:0 0 10px 7px!important;}#ombutton{font-size:11px;line-height:1.2em;cursor:pointer;margin:0 0 10px 7px!important;}#mbutton{font-size:11px;line-height:1.2em;cursor:pointer;margin:0 0 10px 7px!important;}#divrightbar #zero{font-size:11px;line-height:1.2em;cursor:pointer;margin:0 0 10px 7px!important;position:relative!important;right:auto!important;top:auto!important;}.videoExplorerBody .videoExplorerContent .contentItemList .item .thumbnailContainer .noImage, .videoExplorerBody .videoExplorerContent .contentItemList .item .thumbnailContainer .thumbnail, .videoExplorerBody .videoExplorerContent .suggestVideo .item .thumbnailContainer .noImage, .videoExplorerBody .videoExplorerContent .suggestVideo .item .thumbnailContainer .thumbnail,.uadTagRelated .default .itemList .item .imageContainer .itemImageWrapper .itemImage{width:130px!important;height:100px!important;top:0!important;left:0!important;margin:0 17px!important;}.videoExplorerBody .videoExplorerContent .contentItemList .item .playTime, .videoExplorerBody .videoExplorerContent .suggestVideo .item .playTime{right:20px!important;}.videoExplorerBody .videoExplorerContent .contentItemList .item .thumbnailContainer, .videoExplorerBody .videoExplorerContent .suggestVideo .item .thumbnailContainer,.uadTagRelated .default .itemList .item .imageContainer .itemImageWrapper,.uadTagRelated .default .itemList .item .imageContainer{width:165px!important;height:100px!important;}.videoExplorerBody .videoExplorerContent.column4 .contentItemList .item{width:165px!important;}.uadTagRelated .default .itemList .item.graderankSilver .uadFrame,.uadTagRelated .default .itemList .item.graderankGold .uadFrame,.videoExplorerBody .videoExplorerContent .contentItemList .item.silver .uadFrame, .videoExplorerBody .videoExplorerContent .suggestVideo .item.silver .uadFrame,.videoExplorerBody .videoExplorerContent .contentItemList .item.gold .uadFrame, .videoExplorerBody .videoExplorerContent .suggestVideo .item.gold .uadFrame{background-size:130px 100px!important;height:100px!important;margin:0 17px!important;}.videoExplorerBody .videoExplorerContent.column4 .contentItemList .item{margin-right:10px!important;margin-left:10px!important;}.videoExplorerBody .videoExplorerContent.column4 .contentItemList .item.item4n-3{clear:none!important;}.videoExplorerBody .contentItemList{width:375px!important;max-width:375px!important;min-width:375px!important;}.videoExplorerBody .contentItemList .createdTime{text-align:center!important;}.uadTagRelated .default .itemList .item{margin-right:5px!important;margin-left:5px!important;margin-top:5px!important;}.uadTagRelated .default{padding-bottom:40px!important;}#wallImageContainer .wallAlignmentArea , #chipWallList{display:none!important;}#ichibaMain .balloonUe{bottom:auto!important;}#ichibaMain .balloonUe a{height:30px!important;overflow:hidden!important;}.balloon .uadComments{font-size:13px!important;line-height:1.2em!important;}#bottomContentTabContainer.videoExplorer #outline{display:block!important;position:relative!important;}body.size_small.no_setting_panel.videoExplorer #playerContainerWrapper{position:relative!important;height:468px!important;width:100%!important;}#playerAlignmentArea.size_small #playerContainer.controll_panel.oldTypeCommentInput #nicoplayerContainer, #playerAlignmentArea.size_small #playerContainer.controll_panel.oldTypeCommentInput #external_nicoplayer{height:468px!important;width:672px!important;}body.size_small.no_setting_panel.videoExplorer #playerContainerWrapper #playerAlignmentArea{width:100%!important;}.videoExplorerBody .videoExplorerContent.column4 .contentItemList .video .column4 span.title{display:block!important;clear:both!important;height:70px!important;}.videoExplorerBody .videoExplorerContent.column4 .contentItemList .video .column4 .videoInformation{display:block!important;}.videoExplorerBody .videoExplorerContent .contentItemList .item .videoInformation .info, .videoExplorerBody .videoExplorerContent .suggestVideo .item .videoInformation .info{display:block!important;}#videoExplorerBackContainer{visibility:hidden!important;}#ichibaMain .balloonUe{font-size:11px!important;}#ichibaMain .itemname{font-size:11px!important;}#ichibaMain dd.mobile a.uta{background-size:73% auto!important;background-position: 0 -50px!important;}#ichibaMain dd.mobile a.kashi{background-size: 73% auto!important;background-position: 0 -208px!important;}#ichibaMain dd.mobile a.utafull{background-size: 73% auto!important;background-position: 0 -392px!important;}#ichibaMain dl.pia dd.pia{width:123px!important;}#ichibaMain .itemname a {color: #4A6EBC!important;}#ichibaMainFooter p.info,#ichibaMainFooter p.associate,#ichibaMainFooter p.commandArea2,#ichibaMainLogo,#ichibaMainHeader{display:none!important;}#nicoIchiba{margin-top:10px!important;}body.size_medium .ichiba_item img,body.size_small .ichiba_item img{width:144px!important;height:144px!important;}body.size_medium #ichibaMain .balloonUe,body.size_small #ichibaMain .balloonUe{width:146px!important;}body.size_medium #ichibaMain .balloonUe a,body.size_small #ichibaMain .balloonUe a{background-size: 146px 46px !important;padding:6px 4px 3px!important;}body.size_medium #ichibaMain .balloonShita img,body.size_small #ichibaMain .balloonShita img{width:146px!important;}body.size_medium #ichibaMain dl,body.size_small #ichibaMain dl{width:146px!important;margin: 0 11px 10px!important;overflow:hidden!important;height:450px!important;}body.size_normal .ichiba_item img{width:130px!important;height:130px!important;}body.size_normal #ichibaMain .balloonUe{width:132px!important;}body.size_normal #ichibaMain .balloonUe a{background-size: 132px 46px !important;padding:6px 4px 3px!important;}body.size_normal #ichibaMain .balloonShita img{width:132px!important;}body.size_normal #ichibaMain dl{width:135px!important;margin: 0 7px 10px!important;overflow:hidden!important;height:450px!important;}#divrightbar10 .commentTableContainerInner{width:auto!important;}#videoMenuTopList li{overflow:hidden!important;}#toggle9,#toggle11{margin-left:15px;cursor:pointer;padding-top: 20px !important;}#toggle9 *,#toggle11 *{color:#099EF9;}#content div.videoHeaderOuter{min-height:150px;}#toggle11{margin-bottom:30px;}body{width:100%!important;height:100%!important;overflow-y:scroll!important;position:absolute!important;}html{height:100%!important;overflow:hidden!important;}body #content {padding-top: 0px!important;margin-top:8px!important;}</style>');

			var divimg=document.createElement("div");
			divimg.id="divimg";
			document.body.appendChild(divimg);
			$("#videoThumbnailImage").css("height","100px").appendTo("#divimg");
			$("#divimg").insertBefore(".videoDetailExpand h2");
			$("#videoInfoHead p:first-child").appendTo(".videoDetailExpand h2").addClass("toko");
			$(".videoHeaderTitle").appendTo(".videoDetailExpand h2");
			$("#videoStats .ranking").appendTo(".videoDetailExpand .toko");
			$(".dicIcon").appendTo(".videoDetailExpand h2").css({"color":"#00BFFF","cursor":"pointer"});


			var divrightbar2=document.createElement("div");
			divrightbar2.id="divrightbar2";
			document.body.appendChild(divrightbar2);
			$("#videoReview").appendTo("#divrightbar2");

			var divrightbar4=document.createElement("div");
			divrightbar4.id="divrightbar4";
			document.body.appendChild(divrightbar4);
			$("#playlist").appendTo("#divrightbar4");

			var playlistdata= $("#playlistDataContainer").text();
			playlistdata=(new Function("return " + playlistdata))();
			var playlistdiv=document.createElement("div");
			playlistdiv.id="playlistdiv";
			for(var i=0;i<playlistdata["playlist"].length;i++){
				playlistdiv.innerHTML+="<li class='plist'><div class='pimg'><a class='aimg' href='http://www.nicovideo.jp/watch/"+playlistdata["playlist"][i]["id"]+"'><img src='"+playlistdata["playlist"][i]["thumbnail_url"]+"'></a></div><div class='ptitle'><p><a href='http://www.nicovideo.jp/watch/"+playlistdata["playlist"][i]["id"]+"'><B>"+playlistdata["playlist"][i]["title"]+"</a></B></p><p>再生:"+playlistdata["playlist"][i]["view_counter"]+"　コメ数:"+playlistdata["playlist"][i]["num_res"]+"<BR>マイリス:"+playlistdata["playlist"][i]["mylist_counter"]+"</p></div></li>";
			}
			$("#divrightbar4").append(playlistdiv);
			
			
			played="";
			function nowplaying(){
				var nowwatch=window.location.href.replace(/(http:\/\/www\.nicovideo\.jp\/watch\/)(sm|nm)([0-9]+)\?*.*/,"$1$2$3");
				var now=document.getElementsByClassName("aimg");
				if(nowwatch!=played){
					for(var j=0;j<now.length;j++){
						if(now[j].href==nowwatch){
							now[j].parentNode.parentNode.style.background="#9b1543";
						}else{
							now[j].parentNode.parentNode.style.background="#e7e9fd";
						}
					}
					played=nowwatch;
				}
			}
			
			setInterval(function(){nowplaying()},5000);

			var divrightbar5=document.createElement("div");
			divrightbar5.id="divrightbar5";
			document.body.appendChild(divrightbar5);
			$("#videoExplorer").appendTo("#divrightbar5");

			function saisettei(){
				$("#videoHeaderTagList li.videoHeaderTag a.videoHeaderTagLink,.showOtherVideos,.videoDescription a[href*='http://www.nicovideo.jp/mylist/']").click( function() {
					$("#divrightbar5").show("slow");
					$("#divrightbar2,#divrightbar4,#divrightbar6,#divrightbar7,#divrightbar9,#divrightbar10,#divrightbar11,#divrightbar12").hide("slow");
					$("#videoExplorerBackContainer").click();
				});
			}
			saisettei();
			setInterval(function(){saisettei()},3000);

			function denymini(){
				if($("body").hasClass("setting_panel")){
					return;
				}else if($("body").hasClass("size_small")){
						$("#videoExplorerBackContainer").click();
				}
			}
			denymini();
			setInterval(function(){denymini()},500);


			var divrightbar6=document.createElement("div");
			divrightbar6.id="divrightbar6";
			document.body.appendChild(divrightbar6);
			$("#videoStats").appendTo("#divrightbar6");
			$("#userProfile,#videoInfo .videoMainInfoContainer .ch_prof").appendTo("#divrightbar6");
			$(".usericon").css({"width":"70px","height":"70px","float":"left"});
			$("#videoInfo").appendTo("#divrightbar6");

			setTimeout(function(){
				$("#videoInfo .parentVideoInfo,#videoInfoHead,#bottomVideoDetailInformation").appendTo("#divrightbar6");
				$("#videoShareLinks").appendTo("#divrightbar6");
			},1000);

			var divrightbar7=document.createElement("div");
			divrightbar7.id="divrightbar7";
			document.body.appendChild(divrightbar7);
			$("#playerCommentPanel").appendTo("#divrightbar7");


			var divrightbar10=document.createElement("div");
			divrightbar10.id="divrightbar10";
			document.body.appendChild(divrightbar10);
			$("#playerNgPanel").appendTo("#divrightbar10");

			var divrightbar11=document.createElement("div");
			divrightbar11.id="divrightbar11";
			document.body.appendChild(divrightbar11);
			divrightbar11.innerHTML='<iframe src="'+$(".mylistComment .mylistCommentLink").attr("href")+'" style="width:400px;height:100%;border:none;" id="iframe00001"></iframe>'
			setTimeout(function(){
			$("#divrightbar11 #iframe00001").contents().find("head").append('<style type="text/css">body{background:none #E7E9FD !important;}#siteHeader,#PAGEHEADER,#PAGEFOOTER{display:none!important;}#siteHeader,#siteHeader #siteHeaderInner{background:transparent!important;}#PAGECONTAINER{padding-top:0!important;}#PAGEBODY,.body_984{margin:0!important;width:380px!important;}.content_672_solo{width:380px!important;}.content_672_solo .font12{font-size:10px!important;}.content_672_solo .font16{font-size:15px!important;}.content_672_solo table{width:380px!important;}.content_672_solo tr{width:380px!important;}.content_672_solo table:nth-child(3){padding-top:20px!important;border-top:1px solid #CCC!important;}.content_672_solo .mb8p4{width:380px!important;background-color:#FFEEFF!important;}#PAGECONTAINER{background-color:#e7e9fd;}.mb8p4{display:none!important;}</style>');
			},2000);


			var divrightbar12=document.createElement("div");
			divrightbar12.id="divrightbar12";
			document.body.appendChild(divrightbar12);
			divrightbar12.innerHTML='<iframe src="'+$(".mylist .openMylist").attr("href")+'" style="width:400px;height:100%;border:none;" id="iframe00002"></iframe>'
			setTimeout(function(){
			$("#divrightbar12 #iframe00002").contents().find("head").append('<style type="text/css">body{background:none #E7E9FD !important;}#siteHeader,#PAGEHEADER,#PAGEFOOTER{display:none!important;}#siteHeader,#siteHeader #siteHeaderInner{background:transparent!important;}#PAGECONTAINER{padding-top:0!important;}#PAGEBODY,.body_984{margin:0!important;width:380px!important;}.content_672_solo{width:380px!important;}.content_672_solo .font12{font-size:10px!important;}.content_672_solo .font16{font-size:15px!important;}.content_672_solo table{width:380px!important;}.content_672_solo tr{width:380px!important;}.content_672_solo table:nth-child(3){padding-top:20px!important;border-top:1px solid #CCC!important;}.content_672_solo .mb8p4{width:380px!important;background-color:#FFEEFF!important;}#PAGECONTAINER{background-color:#e7e9fd;}.mb8p4{display:none!important;}</style>');
			},2000);


			var divrightbar=document.createElement("div");
			divrightbar.id="divrightbar";
			document.body.appendChild(divrightbar);

			var rbutton=document.createElement("div");
			rbutton.id="rbutton";
			rbutton.innerHTML="レビュー";
			document.body.appendChild(rbutton);
			$("#rbutton").appendTo("#divrightbar");
			$("#divrightbar2").hide();
			$("#rbutton").click(function() {
				$("#divrightbar2").animate(
					{width:"toggle",opacity:"toggle"},
					"slow"
				);
				$("#divrightbar4,#divrightbar5,#divrightbar6,#divrightbar7,#divrightbar9,#divrightbar10,#divrightbar11,#divrightbar12").hide("slow");
			});

			var pbutton=document.createElement("div");
			pbutton.id="pbutton";
			pbutton.innerHTML="playlist";
			document.body.appendChild(pbutton);
			$("#pbutton").appendTo("#divrightbar");
			$("#divrightbar4").hide();
			$("#pbutton").click(function() {
				$("#divrightbar4").animate(
					{width:"toggle",opacity:"toggle"},
					"slow"
				);
				$("#divrightbar2,#divrightbar5,#divrightbar6,#divrightbar7,#divrightbar9,#divrightbar10,#divrightbar11,#divrightbar12").hide("slow");
			});

			var sbutton=document.createElement("div");
			sbutton.id="sbutton";
			sbutton.innerHTML="検索結果";
			document.body.appendChild(sbutton);
			$("#sbutton").appendTo("#divrightbar");
			$("#divrightbar5").hide();
			$("#sbutton").click(function() {
				$("#divrightbar5").animate(
					{width:"toggle",opacity:"toggle"},
					"slow"
				);
				$("#divrightbar2,#divrightbar4,#divrightbar6,#divrightbar7,#divrightbar9,#divrightbar10,#divrightbar11,#divrightbar12").hide("slow");
			});

			var dbutton=document.createElement("div");
			dbutton.id="dbutton";
			dbutton.innerHTML="動画説明";
			document.body.appendChild(dbutton);
			$("#dbutton").appendTo("#divrightbar");
			$("#dbutton").click(function() {
				$("#divrightbar6").animate(
					{width:"toggle",opacity:"toggle"},
					"slow"
				);
				$("#divrightbar2,#divrightbar4,#divrightbar5,#divrightbar7,#divrightbar9,#divrightbar10,#divrightbar11,#divrightbar12").hide("slow");
			});

			var cbutton=document.createElement("div");
			cbutton.id="cbutton";
			cbutton.innerHTML="コメ一覧";
			document.body.appendChild(cbutton);
			$("#cbutton").appendTo("#divrightbar");
			$("#cbutton").click(function() {
				$("#divrightbar7").animate(
					{width:"toggle",opacity:"toggle"},
					"slow"
				);
				$("#divrightbar2,#divrightbar4,#divrightbar5,#divrightbar6,#divrightbar9,#divrightbar10,#divrightbar11,#divrightbar12").hide("slow");
			});

			var gbutton=document.createElement("div");
			gbutton.id="gbutton";
			gbutton.innerHTML="NG設定";
			document.body.appendChild(gbutton);
			$("#gbutton").appendTo("#divrightbar");
			$("#gbutton").click(function() {
				$("#divrightbar10").animate(
					{width:"toggle",opacity:"toggle"},
					"slow"
				);
				$("#divrightbar2,#divrightbar4,#divrightbar5,#divrightbar6,#divrightbar7,#divrightbar9,#divrightbar11,#divrightbar12").hide("slow");
			});


			var mcbutton=document.createElement("div");
			mcbutton.id="mcbutton";
			mcbutton.innerHTML="マイリスコメント";
			document.body.appendChild(mcbutton);
			$("#mcbutton").appendTo("#divrightbar");
			$("#mcbutton").click(function() {

			$("#divrightbar11 #iframe00001").attr("src",$(".mylistComment .mylistCommentLink").attr("href"));
			setTimeout(function(){
			$("#divrightbar11 #iframe00001").contents().find("head").append('<style type="text/css">body{background:none #E7E9FD !important;}#siteHeader,#PAGEHEADER,#PAGEFOOTER{display:none!important;}#siteHeader,#siteHeader #siteHeaderInner{background:transparent!important;}#PAGECONTAINER{padding-top:0!important;}#PAGEBODY,.body_984{margin:0!important;width:380px!important;}.content_672_solo{width:380px!important;}.content_672_solo .font12{font-size:10px!important;}.content_672_solo .font16{font-size:15px!important;}.content_672_solo table{width:380px!important;}.content_672_solo tr{width:380px!important;}.content_672_solo table:nth-child(3){padding-top:20px!important;border-top:1px solid #CCC!important;}.content_672_solo .mb8p4{width:380px!important;background-color:#FFEEFF!important;}#PAGECONTAINER{background-color:#e7e9fd;}.mb8p4{display:none!important;}</style>');
			$("#divrightbar11 #iframe00001").contents().find("a").attr("target","_blank");
			},1000);

				$("#divrightbar11").animate(
					{width:"toggle",opacity:"toggle"},
					"slow"
				);
				$("#divrightbar2,#divrightbar4,#divrightbar5,#divrightbar6,#divrightbar7,#divrightbar9,#divrightbar10,#divrightbar12").hide("slow");
			});


			var ombutton=document.createElement("div");
			ombutton.id="ombutton";
			ombutton.innerHTML="公開マイリスト";
			document.body.appendChild(ombutton);
			$("#ombutton").appendTo("#divrightbar");
			$("#ombutton").click(function() {

			$("#divrightbar12 #iframe00002").attr("src",$(".mylist .openMylist").attr("href"));
			setTimeout(function(){
			$("#divrightbar12 #iframe00002").contents().find("head").append('<style type="text/css">body{background:none #E7E9FD !important;}#siteHeader,#PAGEHEADER,#PAGEFOOTER{display:none!important;}#siteHeader,#siteHeader #siteHeaderInner{background:transparent!important;}#PAGECONTAINER{padding-top:0!important;}#PAGEBODY,.body_984{margin:0!important;width:380px!important;}.content_672{width:380px!important;}.content_672 .font12{font-size:10px!important;}.content_672 .font16{font-size:15px!important;}.content_672 table{width:380px!important;}.content_672 tr{width:380px!important;}.content_672 table:nth-child(3){padding-top:20px!important;border-top:1px solid #CCC!important;}.content_672_solo .mb8p4{width:380px!important;background-color:#FFEEFF!important;}#PAGECONTAINER{background-color:#e7e9fd;}.mb8p4{display:none!important;}</style>');
			$("#divrightbar12 #iframe00002").contents().find("a").attr("target","_blank");
			},1000);

				$("#divrightbar12").animate(
					{width:"toggle",opacity:"toggle"},
					"slow"
				);
				$("#divrightbar2,#divrightbar4,#divrightbar5,#divrightbar6,#divrightbar7,#divrightbar9,#divrightbar10,#divrightbar11").hide("slow");
			});


			var mbutton=document.createElement("div");
			mbutton.id="mbutton";
			mbutton.innerHTML="ヘッダー";
			document.body.appendChild(mbutton);
			$("#mbutton").appendTo("#divrightbar");
			$("#divrightbar9").hide();
			$("#mbutton").click(function() {
				$("#divrightbar9").animate(
					{width:"toggle",opacity:"toggle"},
					"slow"
				);
				$("#divrightbar2,#divrightbar4,#divrightbar5,#divrightbar6,#divrightbar7,#divrightbar10,#divrightbar11,#divrightbar12").hide("slow");
			});

			document.getElementById("zero").innerHTML="設定";
			$("#zero").appendTo("#divrightbar");


			$("head").append('<style type="text/css">#siteHeader,#siteHeaderRightMenu,#siteHeaderLeftMenu,#siteHeaderRightMenuUnfix{display:none!important;}</style>');

			var divrightbar9=document.createElement("div");
			divrightbar9.id="divrightbar9";
			document.body.appendChild(divrightbar9);
			$(".siteHeaderGlovalNavigation li").appendTo("#divrightbar9");
			$("#siteHeaderLeftMenuContainer li").appendTo("#divrightbar9");
			$(".siteHeaderMenuList li").appendTo("#divrightbar9");
			$("#siteHeaderRightMenuContainer li").appendTo("#divrightbar9");



var contenttreecheck = $("#divrightbar6 .parentVideoInfo a.contentsTree").attr("href");
if(contenttreecheck==""){
$("#divrightbar6 div.parentVideoInfo").css("display","none");
}

var iconcheck = $("#divrightbar6 #userProfile a.userIconLink").attr("href");
if(iconcheck==""){
$("#divrightbar6 #userProfile").css("display","none");
}



setTimeout(function(){
			$("#divrightbar6").append("<div id='head_search'><form id='head_search_form' method='get' target='_blank' action='http://www.nicovideo.jp/search/'><select id='selectsearch' name='selectsearch'><option value='word'>word</option><option value='tag'>tag</option></select><input id='bar_search' name='s' value='' type='text'><input name='submit' src='http://res.nimg.jp/img/base/head/search/search.png' type='image'></form></div>");

			$("#selectsearch").change(function() {
				if($("#selectsearch").val()=="word"){
					$("#head_search_form").attr("action","http://www.nicovideo.jp/search/")
				}else if($("#selectsearch").val()=="tag"){
					$("#head_search_form").attr("action","http://www.nicovideo.jp/tag/")
				}
			});
},3000);



				$("#divrightbar2,#divrightbar4,#divrightbar5,#divrightbar9,#divrightbar10,#divrightbar11,#divrightbar12").hide();
				$("#divrightbar6,#divrightbar7").show();


var timerID2 = setInterval( 
	function(){
		if(document.getElementById("commentDefault").getElementsByClassName("commentTableContainerInner")[0].style.height!="0px"){

				$("#playerCommentPanel .section .commentTable .commentTableHeader span.vpos").click();

				$("#videoExplorerExpand a.expandButton").click();
				$("#videoExplorerBackContainer").click();

				$("#divrightbar7").hide();

				clearInterval(timerID2);
				timerID2 = null;

		}
	},1000);



			document.onkeydown = function(e){
				if(e.target.type=="textarea"||e.target.type=="text"){
				return;
				}else{
				switch(e.keyCode){
					case 83:
//					$("#divrightbar5").show("slow");
					$("#divrightbar5").animate(
						{width:"toggle",opacity:"toggle"},
						"slow"
					);
					$("#divrightbar2,#divrightbar4,#divrightbar6,#divrightbar7,#divrightbar9,#divrightbar10").hide("slow");
//					$("#searchResultSearchBox .searchForm .searchText .searchInput").focus();
					break;
					case 82:
					$("#divrightbar2").animate(
						{width:"toggle",opacity:"toggle"},
						"slow"
					);
					$("#divrightbar4,#divrightbar5,#divrightbar6,#divrightbar7,#divrightbar9,#divrightbar10").hide("slow");
					break;
					case 80:
					$("#divrightbar4").animate(
						{width:"toggle",opacity:"toggle"},
						"slow"
					);
					$("#divrightbar2,#divrightbar5,#divrightbar6,#divrightbar7,#divrightbar9,#divrightbar10").hide("slow");
					break;
					case 68:
					$("#divrightbar6").animate(
						{width:"toggle",opacity:"toggle"},
						"slow"
					);
					$("#divrightbar2,#divrightbar4,#divrightbar5,#divrightbar7,#divrightbar9,#divrightbar10").hide("slow");
					break;
					case 67:
					$("#divrightbar7").animate(
						{width:"toggle",opacity:"toggle"},
						"slow"
					);
					$("#divrightbar2,#divrightbar4,#divrightbar5,#divrightbar6,#divrightbar9,#divrightbar10").hide("slow");
					break;
					case 77:
					$("#divrightbar9").animate(
						{width:"toggle",opacity:"toggle"},
						"slow"
					);
					$("#divrightbar2,#divrightbar4,#divrightbar5,#divrightbar6,#divrightbar7,#divrightbar10").hide("slow");
					break;
					case 71:
					$("#divrightbar10").animate(
						{width:"toggle",opacity:"toggle"},
						"slow"
					);
					$("#divrightbar2,#divrightbar4,#divrightbar5,#divrightbar6,#divrightbar7,#divrightbar9").hide("slow");
					break;


				}
				}
			}


setTimeout(function(){
	var divdata = document.createElement("div");
	divdata.id="toggle9";
	divdata.innerHTML="<span>Tagの開閉</span>";
	document.getElementById("divrightbar6").appendChild(divdata); 
	$("#toggle9").click(function(){
		$("#videoTagContainer").toggle();
		GM_setValue("tagDisplay",$("#videoTagContainer").css("display"));
	});
	if(GM_getValue("tagDisplay")=="none"){
		$("#videoTagContainer").hide();
	}
},5000);


setTimeout(function(){
	var divdata = document.createElement("div");
	divdata.id="toggle11";
	divdata.innerHTML="<span>市場の開閉</span>";
	document.getElementById("divrightbar6").appendChild(divdata); 
	$("#toggle11").click(function(){
		$("#nicoIchiba").toggle();
		GM_setValue("ichibaDisplay",$("#nicoIchiba").css("display"));
	});
	if(GM_getValue("ichibaDisplay")=="none"){
		$("#nicoIchiba").hide();
	}
},5000);



		}
	}


	function labelElement(str,che){
		var k = document.createElement("label");
		k.innerHTML = str;
		k.style.cursor = "hand";
		k.setAttribute("for",che);
		k.style.fontSize = "12px";
		return k;
	}

	function interface_kidoku(){
		var prefDiv = document.createElement("div");
			prefDiv.style.width = "340px";
			prefDiv.style.height = "500px";
			prefDiv.style.overflowY = "scroll";
			prefDiv.innerHTML = "カスタマイズ設定" + "<br>";
			prefDiv.style.backgroundColor = "#ccccff";
			prefDiv.style.color = "black";
			prefDiv.style.border = "1px solid #888";
			prefDiv.style.position = "fixed";
			prefDiv.style.bottom = "0px";
			prefDiv.style.right = "0px";
			prefDiv.style.margin = "0 0 0 0";
			prefDiv.style.zIndex = 999999;
//			prefDiv.style.opacity = 0.9;
/*			prefDiv.style.display = 
				(GM_getValue("prefDisplay") == "none") ? "none" : "";
*/			prefDiv.id = "prefDiv";
			document.body.appendChild(prefDiv);
//			$("#prefDiv").insertBefore("#videoHeader");

		var memo=document.createElement("div");
		memo.innerHTML = "<BR><BR>"+"【併用時にレイアウトが崩れやすい項目】" + "<br>";
		var memo2=document.createElement("div");
		memo2.innerHTML = "<BR><BR>"+"【まずはわかりやすい設定項目】" + "<br>";
		var memo3=document.createElement("div");
		memo3.innerHTML = "<BR><BR>"+"【若干細かい・分かりにくい設定項目】" + "<br>";
		var memo4=document.createElement("div");
		memo4.innerHTML = "<BR><BR>"+"【大きめの変化だが、オススメ設定項目】" + "<br>";
		
		var tojiru=document.createElement("div");
		tojiru.innerHTML = "閉じる";
		tojiru.style.position = "absolute";
		tojiru.style.top = "0px";
		tojiru.style.right = "5px";
		tojiru.style.color="#00BFFF";
		tojiru.style.cursor = "pointer";
		tojiru.id="tojiru";
/*		tojiru.addEventListener("click",function(e){
				prefDiv.style.display = 
				(prefDiv.style.display　== "") ? "none" : "";
			GM_setValue("prefDisplay",prefDiv.style.display);
		},false);
*/

		var reset00=document.createElement("div");
		reset00.innerHTML = "リセット";
		reset00.style.position = "absolute";
		reset00.style.right = "5px";
		reset00.style.color="#00BFFF";
		reset00.style.cursor = "pointer";
		reset00.id="reset00";
		reset00.addEventListener("click",function(e){

		var settings = document.getElementById("prefDiv").getElementsByTagName("input");
		for (var i=0;i<settings.length;i++){
			settings[i].checked=false;
		}
		for (var i=0;i<links.length;i++){
			GM_setValue(links[i].name,"off");
		}

		},false);

		var myset01=document.createElement("div");
		myset01.innerHTML = "現在の状態をマイセット1に保存";
		myset01.style.position = "absolute";
		myset01.style.top = "35px";
		myset01.style.right = "5px";
		myset01.style.color="#00BFFF";
		myset01.style.cursor = "pointer";
		myset01.id="myset01";
		myset01.addEventListener("click",function(e){

			GM_setValue("myset01","");
			GM_setValue("myset01_on","on");
			for (var i=0;i<links.length;i++){
				GM_setValue("myset01",GM_getValue("myset01")+","+links[i].name+":"+GM_getValue(links[i].name));
			}

alert("現在の状態をマイセット1に保存しました")

		},false);



		var myset01_on=document.createElement("div");
		myset01_on.innerHTML = "マイセット1の状態にする";
		myset01_on.style.position = "absolute";
		myset01_on.style.top = "60px";
		myset01_on.style.right = "5px";
		myset01_on.style.color="#00BFFF";
		myset01_on.style.cursor = "pointer";
		myset01_on.id="myset01_on";
		myset01_on.addEventListener("click",function(e){

			var settinglist=GM_getValue("myset01").split(",");
			for (var i=1;i<settinglist.length;i++){
				var eachsettings = settinglist[i].split(":");
				GM_setValue(eachsettings[0],eachsettings[1]);
			}

			alert("マイセット1の状態にしました。更新してください。")

		},false);



		var linkmottoright3line = document.createElement("input");
			linkmottoright3line.name = "mottoright3line";
			linkmottoright3line.type = "checkbox";
			linkmottoright3line.caption = "「もっと見るを横に」で、結果を「3列に」　※「もっと見る横に」を併用必須";
			linkmottoright3line.defaultValue = "off";
		var linkdelminidic = document.createElement("input");
			linkdelminidic.name = "delminidic";
			linkdelminidic.type = "checkbox";
			linkdelminidic.caption = "もっと見るで簡易大百科を消去";
			linkdelminidic.defaultValue = "off";
		var linkdeluserad = document.createElement("input");
			linkdeluserad.name = "deluserad";
			linkdeluserad.type = "checkbox";
			linkdeluserad.caption = "もっと見るでユーザー広告を消去";
			linkdeluserad.defaultValue = "off";
		var linkbackblack = document.createElement("input");
			linkbackblack.name = "backblack";
			linkbackblack.type = "checkbox";
			linkbackblack.caption = "背景黒モード(※適当です)";
			linkbackblack.defaultValue = "off";
		var linkjosdestoggle = document.createElement("input");
			linkjosdestoggle.name = "josdestoggle";
			linkjosdestoggle.type = "checkbox";
			linkjosdestoggle.caption = "下の説明文等を開閉式に";
			linkjosdestoggle.defaultValue = "off";
		var linkuta1line = document.createElement("input");
			linkuta1line.name = "uta1line";
			linkuta1line.type = "checkbox";
			linkuta1line.caption = "着うたとかを1行に";
			linkuta1line.defaultValue = "off";
		var linktagtoggle = document.createElement("input");
			linktagtoggle.name = "tagtoggle";
			linktagtoggle.type = "checkbox";
			linktagtoggle.caption = "タグを開閉式に(若干のネタバレ回避)";
			linktagtoggle.defaultValue = "off";
		var linkwalliconoff = document.createElement("input");
			linkwalliconoff.name = "walliconoff";
			linkwalliconoff.type = "checkbox";
			linkwalliconoff.caption = "ウォールのアイコンだけを消去";
			linkwalliconoff.defaultValue = "off";
		var linkdelsearchbox = document.createElement("input");
			linkdelsearchbox.name = "delsearchbox";
			linkdelsearchbox.type = "checkbox";
			linkdelsearchbox.caption = "検索ボックスを消去";
			linkdelsearchbox.defaultValue = "off";
		var linktagpinon = document.createElement("input");
			linktagpinon.name = "tagpinon";
			linktagpinon.type = "checkbox";
			linktagpinon.caption = "タグのピンを常時表示(ピン留め後は不要な設定。ちなみにピン留め推奨です)";
			linktagpinon.defaultValue = "off";
		var linkwalloff = document.createElement("input");
			linkwalloff.name = "walloff";
			linkwalloff.type = "checkbox";
			linkwalloff.caption = "ウォールを消去";
			linkwalloff.defaultValue = "off";
		var linkdeltagpin = document.createElement("input");
			linkdeltagpin.name = "deltagpin";
			linkdeltagpin.type = "checkbox";
			linkdeltagpin.caption = "タグのピンを消去(ピン留め後ピンを解除しない人で、ピンが邪魔な人向け)";
			linkdeltagpin.defaultValue = "off";
		var linkbigwatch = document.createElement("input");
			linkbigwatch.name = "bigwatch";
			linkbigwatch.type = "checkbox";
			linkbigwatch.caption = "プレイヤーサイズを大きく(大画面時のみ)";
			linkbigwatch.defaultValue = "off";
		var linkdelbread = document.createElement("input");
			linkdelbread.name = "delbread";
			linkdelbread.type = "checkbox";
			linkdelbread.caption = "パンくずリスト消去(コミュ動画用？)";
			linkdelbread.defaultValue = "off";
		var linkdelsocial = document.createElement("input");
			linkdelsocial.name = "delsocial";
			linkdelsocial.type = "checkbox";
			linkdelsocial.caption = "ツイートボタン等消去";
			linkdelsocial.defaultValue = "off";
		var linkdelshosai = document.createElement("input");
			linkdelshosai.name = "delshosai";
			linkdelshosai.type = "checkbox";
			linkdelshosai.caption = "動画詳細情報消去";
			linkdelshosai.defaultValue = "off";
		var linkdelbuttons = document.createElement("input");
			linkdelbuttons.name = "delbuttons";
			linkdelbuttons.type = "checkbox";
			linkdelbuttons.caption = "マイリス・とりあえずマイリスボタン以外消去";
			linkdelbuttons.defaultValue = "off";
		var linktweetinheader = document.createElement("input");
			linktweetinheader.name = "tweetinheader";
			linktweetinheader.type = "checkbox";
			linktweetinheader.caption = "ツイートボタンをヘッダーに移動";
			linktweetinheader.defaultValue = "off";
		var linkctree = document.createElement("input");
			linkctree.name = "ctree_off";
			linkctree.type = "checkbox";
			linkctree.caption = "コンテンツツリー消去";
			linkctree.defaultValue = "off";
		var linkshortinfo = document.createElement("input");
			linkshortinfo.name = "shortinfo_off";
			linkshortinfo.type = "checkbox";
			linkshortinfo.caption = "簡易説明文・動画情報開閉ボタン消去";
			linkshortinfo.defaultValue = "off";
		var linkdeljosdes = document.createElement("input");
			linkdeljosdes.name = "deljosdes";
			linkdeljosdes.type = "checkbox";
			linkdeljosdes.caption = "下の動画説明文・情報を消去(上の開閉で読む人向け)";
			linkdeljosdes.defaultValue = "off";
		var linkSen2 = document.createElement("input");
			linkSen2.name = "senden2";
			linkSen2.type = "checkbox";
			linkSen2.caption = "広告を消去";
			linkSen2.defaultValue = "off";
		var linkcome = document.createElement("input");
			linkcome.name = "come_off";
			linkcome.type = "checkbox";
			linkcome.caption = "コメント一覧パネルを消去";
			linkcome.defaultValue = "off";
		var linkmarq = document.createElement("input");
			linkmarq.name = "marquee_off";
			linkmarq.type = "checkbox";
			linkmarq.caption = "動画上のニュースを消去";
			linkmarq.defaultValue = "off";
		var linkfeed = document.createElement("input");
			linkfeed.name = "feedback_off";
			linkfeed.type = "checkbox";
			linkfeed.caption = "フィードバックリンクを消去";
			linkfeed.defaultValue = "off";
		var linkinfo = document.createElement("input");
			linkinfo.name = "infoplus";
			linkinfo.type = "checkbox";
			linkinfo.caption = "もっと見るでマイリスコメント？を常時表示";
			linkinfo.defaultValue = "off";
		var linkreview = document.createElement("input");
			linkreview.name = "review_off";
			linkreview.type = "checkbox";
			linkreview.caption = "レビュー欄消去";
			linkreview.defaultValue = "off";
		var linkichiba = document.createElement("input");
			linkichiba.name = "ichiba_off";
			linkichiba.type = "checkbox";
			linkichiba.caption = "市場消去";
			linkichiba.defaultValue = "off";
		var linktv = document.createElement("input");
			linktv.name = "tvchan_off";
			linktv.type = "checkbox";
			linktv.caption = "マイリスボタン常時表示";
			linktv.defaultValue = "off";
		var linkspread = document.createElement("input");
			linkspread.name = "spread_on";
			linkspread.type = "checkbox";
			linkspread.caption = "コメント一覧の幅を広げる";
			linkspread.defaultValue = "off";
		var linkleft = document.createElement("input");
			linkleft.name = "left_on";
			linkleft.type = "checkbox";
			linkleft.caption = "左寄せにする";
			linkleft.defaultValue = "off";
		var linklist = document.createElement("input");
			linklist.name = "playlist_off";
			linklist.type = "checkbox";
			linklist.caption = "プレイリストを消去";
			linklist.defaultValue = "off";
		var linkmotto = document.createElement("input");
			linkmotto.name = "motto_off";
			linkmotto.type = "checkbox";
			linkmotto.caption = "もっと見るバーを消去";
			linkmotto.defaultValue = "off";
		var linkwideichiba = document.createElement("input");
			linkwideichiba.name = "wideichiba_on";
			linkwideichiba.type = "checkbox";
			linkwideichiba.caption = "市場の幅を広く(要レビュー消去)";
			linkwideichiba.defaultValue = "off";
		var linknicorudel = document.createElement("input");
			linknicorudel.name = "nicorudel_on";
			linknicorudel.type = "checkbox";
			linknicorudel.caption = "ニコるを消去";
			linknicorudel.defaultValue = "off";
		var linkinfonontoggle = document.createElement("input");
			linkinfonontoggle.name = "infonontoggle_on";
			linkinfonontoggle.type = "checkbox";
			linkinfonontoggle.caption = "動画詳細情報を常時表示に";
			linkinfonontoggle.defaultValue = "off";
		var linkheadcut = document.createElement("input");
			linkheadcut.name = "header_off";
			linkheadcut.type = "checkbox";
			linkheadcut.caption = "ヘッダー消去";
			linkheadcut.defaultValue = "off";
		var linkfootcut = document.createElement("input");
			linkfootcut.name = "footer_off";
			linkfootcut.type = "checkbox";
			linkfootcut.caption = "フッター消去";
			linkfootcut.defaultValue = "off";
		var linkinfo33 = document.createElement("input");
			linkinfo33.name = "infocombine3";
			linkinfo33.type = "checkbox";
			linkinfo33.caption = "サムネ・再生数・投稿者サムネ等を上に移動3(マイリスボタンも常時表示に)";
			linkinfo33.defaultValue = "off";
		var linkoldsearch = document.createElement("input");
			linkoldsearch.name = "oldsearch_on";
			linkoldsearch.type = "checkbox";
			linkoldsearch.caption = "旧検索をヘッダーに追加";
			linkoldsearch.defaultValue = "off";
		var linkplaylisttoggle = document.createElement("input");
			linkplaylisttoggle.name = "playlisttoggle_on";
			linkplaylisttoggle.type = "checkbox";
			linkplaylisttoggle.caption = "プレイリストを開閉式に";
			linkplaylisttoggle.defaultValue = "off";
		var linkinfoseparate = document.createElement("input");
			linkinfoseparate.name = "infoseparate_on";
			linkinfoseparate.type = "checkbox";
			linkinfoseparate.caption = "下の動画情報と動画説明文を左右に分離(上の説明文非表示)";
			linkinfoseparate.defaultValue = "off";
		var linkminiichiba = document.createElement("input");
			linkminiichiba.name = "miniichiba_on";
			linkminiichiba.type = "checkbox";
			linkminiichiba.caption = "市場の商品画像等を小さく";
			linkminiichiba.defaultValue = "off";
		var linkkomepaneltoggle = document.createElement("input");
			linkkomepaneltoggle.name = "komepaneltoggle_on";
			linkkomepaneltoggle.type = "checkbox";
			linkkomepaneltoggle.caption = "コメント一覧を開閉式に";
			linkkomepaneltoggle.defaultValue = "off";
		var linkreviewtoggle = document.createElement("input");
			linkreviewtoggle.name = "reviewtoggle_on";
			linkreviewtoggle.type = "checkbox";
			linkreviewtoggle.caption = "レビューを開閉式に";
			linkreviewtoggle.defaultValue = "off";
		var linkichibatoggle = document.createElement("input");
			linkichibatoggle.name = "ichibatoggle_on";
			linkichibatoggle.type = "checkbox";
			linkichibatoggle.caption = "市場を開閉式に";
			linkichibatoggle.defaultValue = "off";
		var linkmottoright = document.createElement("input");
			linkmottoright.name = "mottoright_on";
			linkmottoright.type = "checkbox";
			linkmottoright.caption = "もっと見るを横に(検索時にプレイヤーが小さくならないよ★)/※プレイヤー設定画面が使えなくなります。";
			linkmottoright.defaultValue = "off";
		var linkdelkomesocial = document.createElement("input");
			linkdelkomesocial.name = "delkomesocial";
			linkdelkomesocial.type = "checkbox";
			linkdelkomesocial.caption = "コメント欄のソーシャルボタンを消す";
			linkdelkomesocial.defaultValue = "off";
		var linktargetblank = document.createElement("input");
			linktargetblank.name = "targetblank";
			linktargetblank.type = "checkbox";
			linktargetblank.caption = "タグクリック等時に別タブで開く";
			linktargetblank.defaultValue = "off";
		var linktargetself = document.createElement("input");
			linktargetself.name = "targetself";
			linktargetself.type = "checkbox";
			linktargetself.caption = "タグクリック等時に同じタブで開く";
			linktargetself.defaultValue = "off";
		var linkinfotocomepanel = document.createElement("input");
			linkinfotocomepanel.name = "infotocomepanel_on";
			linkinfotocomepanel.type = "checkbox";
			linkinfotocomepanel.caption = "動画情報をコメント一覧に(※コメント一覧の幅が広くなります/※上の説明文を開かないでください)";
			linkinfotocomepanel.defaultValue = "off";
		var linkset8 = document.createElement("input");
			linkset8.name = "set8_on";
			linkset8.type = "checkbox";
			linkset8.caption = "カスタマイズセット8(※基本他項目と併用不可)";
			linkset8.defaultValue = "off";

		var form = document.createElement("form");

		var links = 
			[linkshortinfo,linkSen2,linkcome,linkmarq,linkfeed,linkinfo,linkreview,linkichiba,linktv,linkspread,linkleft,linklist,linkmotto,linkwideichiba,linknicorudel,linkinfonontoggle,linkheadcut,linkfootcut,linkoldsearch,linkplaylisttoggle,linkinfo33,linkinfoseparate,linkminiichiba,linkkomepaneltoggle,linkreviewtoggle,linkichibatoggle,linkmottoright,linkinfotocomepanel,linkset8,linkdeljosdes,linkctree,linktweetinheader,linkdelbuttons,linkdelshosai,linkdelsocial,linkdelbread,linkbigwatch,linkdeltagpin,linkwalloff,linktagpinon,linkdelsearchbox,linkwalliconoff,linktagtoggle,linkuta1line,linkjosdestoggle,linkbackblack,linkdeluserad,linkdelminidic,linkmottoright3line,linkdelkomesocial,linktargetblank,linktargetself];

		for (var i=0;i<links.length;i++){
			if (!GM_getValue(links[i].name)) {
				GM_setValue(links[i].name, links[i].defaultValue);
			}
				links[i].id = links[i].name;
				links[i].checked = (GM_getValue(links[i].name) != "on") ? false : true;
				links[i].addEventListener("click", function(e){
					GM_setValue(this.name, (GM_getValue(this.name) != "on") ? "on" : "off");
				}, true);
		}



		//登録
		form.appendChild(tojiru);
		form.appendChild(myset01);
		form.appendChild(myset01_on);
		form.appendChild(document.createElement("hr"));
		form.appendChild(document.createElement("br"));
		form.appendChild(document.createElement("br"));
		form.appendChild(document.createElement("br"));
		form.appendChild(document.createElement("br"));
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkset8);
		form.appendChild(labelElement(linkset8.caption, linkset8.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(memo2);
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkSen2);
		form.appendChild(labelElement(linkSen2.caption, linkSen2.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkmarq);
		form.appendChild(labelElement(linkmarq.caption, linkmarq.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linknicorudel);
		form.appendChild(labelElement(linknicorudel.caption, linknicorudel.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkfeed);
		form.appendChild(labelElement(linkfeed.caption, linkfeed.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkwalloff);
		form.appendChild(labelElement(linkwalloff.caption, linkwalloff.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkwalliconoff);
		form.appendChild(labelElement(linkwalliconoff.caption, linkwalliconoff.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkdelkomesocial);
		form.appendChild(labelElement(linkdelkomesocial.caption, linkdelkomesocial.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkheadcut);
		form.appendChild(labelElement(linkheadcut.caption, linkheadcut.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkfootcut);
		form.appendChild(labelElement(linkfootcut.caption, linkfootcut.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkreview);
		form.appendChild(labelElement(linkreview.caption, linkreview.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkichiba);
		form.appendChild(labelElement(linkichiba.caption, linkichiba.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linklist);
		form.appendChild(labelElement(linklist.caption, linklist.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkmotto);
		form.appendChild(labelElement(linkmotto.caption, linkmotto.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkcome);
		form.appendChild(labelElement(linkcome.caption, linkcome.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkreviewtoggle);
		form.appendChild(labelElement(linkreviewtoggle.caption, linkreviewtoggle.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkichibatoggle);
		form.appendChild(labelElement(linkichibatoggle.caption, linkichibatoggle.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkplaylisttoggle);
		form.appendChild(labelElement(linkplaylisttoggle.caption, linkplaylisttoggle.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkkomepaneltoggle);
		form.appendChild(labelElement(linkkomepaneltoggle.caption, linkkomepaneltoggle.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linktagtoggle);
		form.appendChild(labelElement(linktagtoggle.caption, linktagtoggle.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkbackblack);
		form.appendChild(labelElement(linkbackblack.caption, linkbackblack.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkspread);
		form.appendChild(labelElement(linkspread.caption, linkspread.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linktv);
		form.appendChild(labelElement(linktv.caption, linktv.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkwideichiba);
		form.appendChild(labelElement(linkwideichiba.caption, linkwideichiba.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkminiichiba);
		form.appendChild(labelElement(linkminiichiba.caption, linkminiichiba.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkuta1line);
		form.appendChild(labelElement(linkuta1line.caption, linkuta1line.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linktargetblank);
		form.appendChild(labelElement(linktargetblank.caption, linktargetblank.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linktargetself);
		form.appendChild(labelElement(linktargetself.caption, linktargetself.id));
		form.appendChild(memo3);
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkdelsearchbox);
		form.appendChild(labelElement(linkdelsearchbox.caption, linkdelsearchbox.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkctree);
		form.appendChild(labelElement(linkctree.caption, linkctree.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkdelshosai);
		form.appendChild(labelElement(linkdelshosai.caption, linkdelshosai.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkdelsocial);
		form.appendChild(labelElement(linkdelsocial.caption, linkdelsocial.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkdelbuttons);
		form.appendChild(labelElement(linkdelbuttons.caption, linkdelbuttons.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkdelbread);
		form.appendChild(labelElement(linkdelbread.caption, linkdelbread.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkinfonontoggle);
		form.appendChild(labelElement(linkinfonontoggle.caption, linkinfonontoggle.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkdeljosdes);
		form.appendChild(labelElement(linkdeljosdes.caption, linkdeljosdes.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkoldsearch);
		form.appendChild(labelElement(linkoldsearch.caption, linkoldsearch.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linktweetinheader);
		form.appendChild(labelElement(linktweetinheader.caption, linktweetinheader.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(linktagpinon);
		form.appendChild(labelElement(linktagpinon.caption, linktagpinon.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkdeltagpin);
		form.appendChild(labelElement(linkdeltagpin.caption, linkdeltagpin.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkshortinfo);
		form.appendChild(labelElement(linkshortinfo.caption, linkshortinfo.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(memo4);
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkmottoright);
		form.appendChild(labelElement(linkmottoright.caption, linkmottoright.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkinfo);
		form.appendChild(labelElement(linkinfo.caption, linkinfo.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkdeluserad);
		form.appendChild(labelElement(linkdeluserad.caption, linkdeluserad.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkdelminidic);
		form.appendChild(labelElement(linkdelminidic.caption, linkdelminidic.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkmottoright3line);
		form.appendChild(labelElement(linkmottoright3line.caption, linkmottoright3line.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkinfotocomepanel);
		form.appendChild(labelElement(linkinfotocomepanel.caption, linkinfotocomepanel.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkinfo33);
		form.appendChild(labelElement(linkinfo33.caption, linkinfo33.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(linkinfoseparate);
		form.appendChild(labelElement(linkinfoseparate.caption, linkinfoseparate.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkjosdestoggle);
		form.appendChild(labelElement(linkjosdestoggle.caption, linkjosdestoggle.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(memo);
		form.appendChild(document.createElement("br"));
		form.appendChild(linkleft);
		form.appendChild(labelElement(linkleft.caption, linkleft.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkbigwatch);
		form.appendChild(labelElement(linkbigwatch.caption, linkbigwatch.id));
		form.appendChild(document.createElement("hr"));
		form.appendChild(document.createElement("br"));
		form.appendChild(document.createElement("br"));
		form.appendChild(document.createElement("br"));
		form.appendChild(reset00);


		prefDiv.appendChild(form);


		var prefSw = document.createElement("a");
		prefSw.innerHTML = "カスタマイズ設定";
		prefSw.id = "zero";
/*		prefSw.addEventListener("click",function(e){
			prefDiv.style.display = 
				(prefDiv.style.display　== "") ? "none" : "";
			GM_setValue("prefDisplay",prefDiv.style.display);
		},false);
*/
		document.getElementById("siteHeaderRightMenuContainer").appendChild(prefSw);

		$("#zero").click(function(){
			$("#prefDiv").animate(
				{width:"toggle",height:"toggle",opacity:"toggle"},
				"slow"
			);
			setTimeout(function(){
				GM_setValue("prefDisplay",$("#prefDiv").css("display"));
			},1000);
		});
		if(GM_getValue("prefDisplay","block")=="none"){
			$("#prefDiv").hide();
		};

		$("#tojiru").click(function(){
			$("#prefDiv").animate(
				{width:"hide",height:"hide",opacity:"hide"},
				"slow"
			);
			setTimeout(function(){
				GM_setValue("prefDisplay",$("#prefDiv").css("display"));
			},1000);
		});
		if(GM_getValue("prefDisplay","block")=="none"){
			$("#prefDiv").hide();
		};

		$("head").append('<style type="text/css">#zero{margin-left:17px;color:#000000!important;cursor:pointer;}span[style="font-size: 45px;line-height:1.1;"],span[style="font-size: 90px;line-height:1.1;"],span[style="font-size: 60px;line-height:1.1;"],span[style="font-size: 36px;line-height:1.1;"]{font-size:22px!important;}#siteHeaderInner{width:97%!important;}.socialLinks .socialLinkTwitter,.socialLinks .socialLinkFacebook{width:150px!important;}.socialLinks .socialLinkFacebook .facebook{width:140px!important;}#siteHeaderNotificationPremium{display:none!important;}#videoTagContainer .tagInner #videoHeaderTagList li.videoHeaderTag a{color:#292F2F !important;}#videoTagContainer .tagInner #videoHeaderTagList li{margin-bottom:1px!important;text-decoration: underline!important;}#videoTagContainer .tagInner #videoHeaderTagList .toggleTagEdit{height:auto!important;}#videoTagContainer .tagInner #videoHeaderTagList li .tagControlContainer, #videoTagContainer .tagInner #videoHeaderTagList li .tagControlEditContainer{padding:2px 4px 2px 0!important;}#ichibaMain .itemname a {color: #4A6EBC!important;}.videoStart #nicoplayerContainer #nicoplayerContainerInner{top:0!important;}#siteHeader #siteHeaderInner ul li a.siteHeaderPoint small{display:none!important;}body.full_with_browser #playerAlignmentArea.size_normal #playerNicoplayer, #playerAlignmentArea.size_normal #external_nicoplayer{width:100%!important;}body.full_with_browser #playerAlignmentArea{width:100%!important;}#videoInformationWrapper{display:none!important;}#bottomContentTabContainer #outline .outer .main #videoInfo,body .outer{width:1008px;}#ichibaMainLogo,#ichibaMainHeader{display:none!important;}#ichibaMain #ichibaMainFooter .commandArea{text-align:left!important;}#outline{padding-top:5px!important;}#outline{background-color:#F3F3F3!important;}</style>');


		if(GM_getValue("reviewtoggle_on")=="on"||GM_getValue("ichibatoggle_on")=="on"||GM_getValue("tagtoggle")=="on"||GM_getValue("mottoright_on")=="on"||GM_getValue("playlisttoggle_on")=="on"||GM_getValue("komepaneltoggle_on")=="on"){
			$("head").append('<style type="text/css">#playerContainerWrapper{padding-bottom:20px!important;}</style>');
		}

		if(GM_getValue("ctree_off")=="off" && $("#outline").attr("class")=="wrapper commonsTreeExists"){
			$("head").append('<style type="text/css">#videoInfo .parentVideoInfo{display:block!important;}</style>');
		};







	}

interface_kidoku();
set8();
infotocomepanel();
shortinfoCut();
senCut2();
comeCut();
marqueeCut();
feedbackCut();
infoPlus();
reviewCut();
ichibaCut();
tvchanCut();
komespread();
hidariyose();
playlistCut();
mottoCut();
wideichiba();
nicorudel();
infonontoggle();
oldsearch();
headcut();
footcut();
playlisttoggle();
infoCombine3();
infoseparate();
miniichiba();
ichibatoggle();
reviewtoggle();
komepaneltoggle();
mottoright();
deljosdes();
ctreeCut();
tweetinheader();
delbuttons();
delshosai();
delsocial();
delbread();
bigwatch();
deltagpin();
walloff();
tagpinon();
delsearchbox();
walliconoff();
tagtoggle();
uta1line();
josdestoggle();
backblack();
deluserad();
delminidic();
mottoright3line();
delkomesocial();
targetblank();
targetself();
};

var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);