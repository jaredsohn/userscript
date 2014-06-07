
// vim: set fenc=utf8 ts=4 :
// ==UserScript==
// @name HideTools Hootsuite
// @include http://hootsuite.com/*
// @match http://hootsuite.com/*
//
// - 場所をとる項目の表示・非表示の切り替え
// - Tweetの縦方向圧縮
// - 検索機能の配置追加
// - 検索結果のリロード
// ==/UserScript==
(function(){ 
	//onload funciton
	var onloadFunc = function(){
		//追加機能配置
		var addExTools=function(){
			var toolsLink=document.createElement("a");
			var title=window._AddHeight==0?"[Hide Tools]":"[Show Tools]";
			toolsLink.id="showTools";
			toolsLink.innerHTML=title;
			$(".selectProfiles").append(toolsLink);
			var sBtn=document.createElement("a");
			sBtn.id="sBtn";
			sBtn.innerHTML="[Search]";
			$(".selectProfiles").append(sBtn);
		}
		addExTools();
		//高さの調整、標準のupdateStreamsHeight関数を置き換え
		var f=window.updateStreamsHeight;
		window._AddHeight=25;
		window.updateStreamsHeight=function(){
			f();	//標準の処理
			//footerを消した分の高さを追加
			$("#streamScrollContent").height($("#streamScrollContent").height()+window._AddHeight);
			$("#streamBoxesContainer").width('');
		};
		$("#showTools").live("click", function(){
			var display=window._AddHeight==0?"none":"block";
			window._AddHeight=window._AddHeight==0?25:0;
			var title=window._AddHeight==0?"[Hide Tools]":"[Show Tools]";
			$("#streamTabInfo, #usernav, .footerContent").css("display", display);
			$("#showTools").text(title);
			window.updateStreamsHeight();
		});
		$("#sBtn").live("click", function(){
			var q=prompt("Search");
			if(q) quickSearch(q);
		});
		//ステータス更新時の関数置き換え
		var f2=hs.statusObj.update;
		hs.statusObj.update=function(message, type, isAutoHide, hideTimeout) {
			//標準の処理
			f2.call(hs.statusObj, message, type, isAutoHide, hideTimeout);
			if (message=='Message posted'){
				//投稿成功時
				addExTools();
			}
		}
		//quickサーチを置き換えてreloadボタンの追加
		var f3=quickSearch;
		quickSearch=function(a){
			f3(a);
			var reload=document.createElement("button");
			reload.id="reload";
			reload.innerHTML="Reload";
			$("#ui-dialog-title-quickSearchPopup").append(reload);
			$(reload).css("margin-left", "10px");
			$(reload).click(function(){
				quickSearch(a);
			});
		}

	};
	//cssの読みこみ要素追加
	var rules = [
		"#showTools, #sBtn, #reload{cursor:pointer; font-size: x-small; margin: 2px;}",
		"#streamTabInfo, #usernav, .footerContent{display : none}",
		".message {padding: 1px;}",
		".message .messageContent {padding: 0px; background: transparent} ",
		".message .messageData a.username, .message .messageData .messageUserInfo{margin: 0px; font-size: small}",
		".messageUserInfo br{display:none;}",
		".messageUserInfo, .username{font-size: small}",
		".round-30 span.corners, .round-30, .round-30 img, messageUserImage {width: 24px; 	height: 24px;}",
	];
	var css=document.styleSheets[document.styleSheets.length - 1];
	for (var i=0;i<rules.length;i++){
		css.insertRule(rules[i], css.cssRules.length);
	}
	//onload functionを文字列としてScriptタグで追加
	var script=document.createElement("script");
	script.type="text/javascript";
	script.innerHTML="$(document).ready("+onloadFunc.toString()+")";
	document.body.appendChild(script);

})();
