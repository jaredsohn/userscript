// ==UserScript==
// @name		   ニコニコ動画 マイリストにID表示
// @version 	   1.01
// @author		   D008
// @namespace	   http://userscripts.org/users/420733
// @description    マイリストにビデオID表示＆コピー
// @include 	   http://www.nicovideo.jp/my/mylist*
// ==/UserScript==


(function($){

//原宿?
var haraMy = false;
if ($("#zero_lead_index").length) haraMy = true;


if (!haraMy) {
	//表示設定
	var ncv_viewType = GM_getValue("viewType", 1);
	function ncv_setViewType(){
		var vnum = prompt("表示設定(1～3)\n　　1:マウスオーバーの編集に追加\n　　2:マウスオーバーでオリジナル表示\n　　3:常に表示\n\n", ncv_viewType);
		ncv_viewType = (vnum<1 || vnum>3) ? ncv_viewType : vnum;
		GM_setValue("viewType", ncv_viewType);
		window.location.reload();
	}

	//初めての時
	if (GM_getValue("viewType")  == undefined) {
		ncv_setViewType();
	}

	//メニューに設定リンク追加
	$("#siteHeaderRightMenuContainer").append('<li><a id="idSet" href="javascript:void(0);">ID表示設定</a></li>');
	$("#idSet").click(function(){
		setTimeout(ncv_setViewType, 100);
	});
}


//CSS
if (haraMy) {
	//原宿
	GM_addStyle([
		"#idcp {text-align:center; cursor:pointer;}",
		"#idcp:horver {text-decoration:underline;}",
		"#idcp.idcp_1 {margin-top:30px;}"
	].join(''));
} else {
	//Qwatch
	GM_addStyle([
		"#idcp {cursor:pointer; color:#0033CC;}",
		"#idcp:hover {text-decoration:underline;}"
	].join(''));

	if (ncv_viewType == 1) {
		GM_addStyle([
			"#mylist .articleBody .myContList li.SYS_box_item dl.pullout dd {width:85px;}"
		].join(''));
	} else if (ncv_viewType == 2) {
		GM_addStyle([
			"#myid {position:absolute; right:0; top:0; padding: 4px 8px; background:none repeat scroll 0 0 #F1F1F1; display:none; border: 1px solid #BBBBBB; border-radius:5px 5px 5px 5px;}",
			"#mylist .articleBody .myContList li.SYS_box_item .pullout {top:-999px;}"
		].join(''));
	} else if (ncv_viewType == 3) {
		GM_addStyle([
			"#myid {position:absolute; right:0; top:0; padding: 4px 4px 2px; line-height:135%; text-align:right;}",
			"#myid a.SYS_btn_remove_item{border:1px solid #888888; border-radius:3px 3px 3px 3px; padding:3px 3px 1px; color:#000000; font-size:12px; display:inline-block; text-align:center; width:50px; margin-bottom:5px; vertical-align:middle; text-decoration:none}",
			"#mylist .articleBody .myContList li.SYS_box_item .pullout {top:-999px;}"
		].join(''));
	}
}



//ID書き込み
function ncv_addVideoid(myData, ps, pe) {
	console.log("ncv_addVideoid");
	for(var i=ps; i<=pe; i++){
		if (myData[i].item_type != 0) continue
		var item_id = myData[i].item_id;
		var video_id = myData[i].item_data.video_id;
		var watch_id = myData[i].item_data.watch_id;
		var commu = false;
		var sys_sel = "#SYS_box_item_0_" + item_id;
		if (myData[i].item_data.group_type == "community") commu = true;
		if (haraMy) {
			var myid_sel = $(sys_sel + " div.buttons");
			myid_sel.append('<div id="idcp" class="idcp_1">' + watch_id + '</div>');
			if (commu) {
				myid_sel.append('<div id="idcp" class="idcp_2">' + video_id + '</div>');
			}
		} else {
			var myid_sel;
			if (ncv_viewType == 1) {
				myid_sel = $(sys_sel + " dl.pullout ul");
			} else {
				if (ncv_viewType == 2) {
					$(sys_sel + " div.mylistVideo").append('<div id="myid"></div>');
					$(sys_sel).hover(function() {
						$("div#myid", this).css("display","block");
					}, function() {
						$("div#myid", this).css("display","none");
					});
				} else {
					$(sys_sel + " div.mylistVideo").append('<div id="myid"></div>');
					$(sys_sel + " dl.pullout dd a.SYS_btn_remove_item").hover(function() {
						$(this).css("background-color","#e0ffff");
					}, function() {
						$(this).css("background-color","");
					});
				}
				myid_sel = $(sys_sel + " div#myid");
				myid_sel.append($(sys_sel + " dl.pullout dd a.SYS_btn_remove_item"));
			}
			myid_sel.append('<div id="idcp">' + watch_id + '</div>');
			if (commu) {
				myid_sel.append('<div id="idcp">' + video_id + '</div>');
			}
		}
	}
	ncv_ctoc();
}


//IDを範囲指定orクリップボード
function ncv_ctoc() {
	$("div#idcp").click(function() {
		var vid = $(this).text();
		var ele = $(this).get(0);
			if (typeof GM_setClipboard == "undefined") {
				//Greasemonkey用　範囲選択
				var rng = window.content.document.createRange();
				rng.selectNodeContents(ele);
				var sel = getSelection();
				sel.removeAllRanges();
				sel.addRange(rng);
			} else {
				//Scriptish用　クリップボード
				setTimeout(function() {
					GM_setClipboard(vid);
					GM_notification("Copy " + vid);
				}, 100);
			}
	});
}


//描画が終わるのを待つ
function ncv_wmylist(myData, ps, pe) {
	var j = 0;
	var tim = setInterval(function(){
		var li_items = $("li[id^='SYS_box_item_']").length - 1;
		if (li_items == (pe - ps)) {
			ncv_addVideoid(myData, ps, pe);
			clearInterval(tim);
		}
		j++;
		if (j > 50) { clearInterval(tim); }
	}, 250);
}


$("#myContBody").nicoPageChanged(function() {
	var myData = unsafeWindow.my.currentItems;
	var match = /\+page=(\d+)/.exec(location.hash);
	var crt_page = match ? match[1] : 1;
	var ps = (crt_page - 1) * 100;
	var pe = crt_page * 100 - 1;
	if (pe > myData.length - 1) pe = myData.length - 1;
	setTimeout(function() { ncv_wmylist(myData, ps, pe) }, 1000);
});


})(unsafeWindow.jQuery);
