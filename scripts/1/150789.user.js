// ==UserScript==
// @name		   nicovideo mylisted checker Q
// @version 	   1.08
// @author		   D008
// @namespace	   http://userscripts.org/users/420733
// @description    動画ページにマイリスト登録先を表示します。
// @include 	   http://www.nicovideo.jp/watch/*
// @include 	   http://www.nicovideo.jp/my/mylist*
// @include 	   http://www.nicovideo.jp/mylist_add/video/*
// ==/UserScript==



(function($){

	if (location.href.indexOf("http://www.nicovideo.jp/watch/") > -1) {
		if (document.getElementById("flvplayer_container")) return;
	//	GM_log("===nicovideo mylisted checker Qwatch===")

	var listed = false;
	var video_id = "";
	var ctim = false;
	var ReqCount = -1;
	var reloadIconImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAFnRFWHRDcmVhdGlvbiBUaW1lADAyLzA5LzEyA1/prgAAAAd0SU1FB9wKEQ0TNq2wGfcAAAAJcEhZcwAACuoAAArqAVDM774AAAAEZ0FNQQAAsY8L/GEFAAAAS1BMVEX////t7e3KysqdnZ16enqVlZWvr6+4uLjT09P29vaMjIzk5OSmpqZmZmbBwcHc3NyFhYWDg4O9vb3CwsJycnL19fWnp6eZmZmjo6MH8L4iAAAAAXRSTlMAQObYZgAAAFxJREFUeNpFjQsOgCAMQwtUUXD+8Hf/k1qMxpdsa7slAz6uUruLictw2CmdG4rNzHZAcXSrtBWM5ASwmlmLQbf2ABI/ZP5NYniFypOdRs9YE71pW0WPcT7oafCSNx4vAvvqoDHPAAAAAElFTkSuQmCC';


	var nmcq_viewType = GM_getValue("viewType", 1);
	function nmcq_setViewType(){
		var vnum = prompt("表示設定(1～2)\n　　1:メニューボタンの右側\n　　2:検索フォームの下\n", nmcq_viewType);
		nmcq_viewType = (vnum<1 || vnum>3) ? nmcq_viewType : vnum;
		GM_setValue("viewType", nmcq_viewType);
		window.location.reload();
	}


	//初めての時
	if (GM_getValue("viewType")  == undefined) {
		nmcq_setViewType();
	}


	//メニューに設定リンク追加
	$("#siteHeaderRightMenuContainer").append('<li><a id="mylistSet" href="javascript:void(0);">ﾏｲﾘｽﾄ表示設定</a></li>');
	$("#mylistSet").click(function(){
		setTimeout(nmcq_setViewType, 100);
	});


	//表示タイプ
	if(nmcq_viewType == 1) {
		$("#videoHeader").append('<div id="nmcq_outer" style="position:absolute; bottom:13px; right:-90px; min-width:50px; padding:5px 8px 5px 8px; background-color:#e6e6e6; border: 1px solid #BBBBBB; border-radius:5px 5px 5px 5px;"><a style="position:absolute; top:-13px; right:-13px;" id="nmcq_reload_icon" title="クリックで更新" href="#"><img src="' + reloadIconImg + '"></a><SPAN id="nmcq_mylisted"><nobr>読込中</nobr></SPAN></div>');
	} else {
		$(".searchContainer").append('<div><a id="nmcq_reload_icon"  title="クリックで更新" href="javascript:"><img src="' + reloadIconImg + '"></a> <SPAN id="nmcq_mylisted">読込中</SPAN></div>');
	}


	//書き込み
	function nmcq_writeMylist(grp, uid) {
		var nm_url = '<nobr><a style="color:#000000;" href="http://www.nicovideo.jp/my/mylist/?' + video_id + '#/' + uid  + '" target="_blank">[' + grp + ']</a></nobr><br>';
		if (listed) {
			$("#nmcq_mylisted").append(nm_url);
		}else{
			$("#nmcq_mylisted").html(nm_url);
			listed = true;
		}
		$("#nmcq_outer").css("right", 0 - $("#nmcq_outer").width() - 40);
	}


	//各マイリストをチェック
	function nmcq_checkGrpMylist(gid, mygrpname){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://ext.nicovideo.jp/api/mylist/list?group_id='+gid,
			onload: function(response) {
				ReqCount -= 1;
				if(response.responseText.indexOf('video_id":"' + video_id + '",') != -1) {
					nmcq_writeMylist(mygrpname, gid);
				}
				if (ReqCount == 0 && !listed) $("#nmcq_mylisted").html('<nobr>未登録</nobr>');
			}
		});
	}


	//マイリストグループ名取得
	function nmcq_getGrpName(){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.nicovideo.jp/api/mylistgroup/list',
			onload: function(response) {
				var mygroup = JSON.parse(response.responseText);
				ReqCount = mygroup.mylistgroup.length;
				for(var i=0; i<mygroup.mylistgroup.length; i++){
					nmcq_checkGrpMylist(mygroup.mylistgroup[i].id, mygroup.mylistgroup[i].name);
				}
			}
		});
	}


	//とりマイをチェック
	function nmcq_checkDefMylist(){
		nmcq_getGrpName();
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.nicovideo.jp/api/deflist/list',
			onload: function(res) {
				if(res.responseText.indexOf('video_id":"' + video_id + '",') != -1) {
					nmcq_writeMylist("とりマイ","home");
				}
			}
		});
	}


	function nmcq_init(){
		//ビデオID取得 ※
		video_id = unsafeWindow.WatchApp.namespace.init.CommonModelInitializer.watchInfoModel.id;

		$("#nmcq_mylisted").html('<nobr>読込中</nobr>');
		listed = false;
		ReqCount = -1;
		setTimeout(function(){
			nmcq_checkDefMylist();
		}, 500);
	}


	//曲が変わったら　※
	unsafeWindow.WatchApp.namespace.init.PlayerInitializer.playerAreaConnector.addEventListener('onVideoChangeStatusUpdated', function(e){
		if (!e) nmcq_init();
	});

	//※　WatchItLaterを参考にさせて頂きました。http://userscripts.org/scripts/show/151269


	//更新ボタンをクリックしたら
	$("#nmcq_reload_icon").click(function () {
		if (ctim !== false) clearTimeout(ctim);
		if (ReqCount != 0) return;
		ctim = setTimeout(function(){
			nmcq_init();
			ctim = false;
		}, 1000);
		return false;
	});


	//とりマイをクリックしたらメニューを閉じる
	$(".defmylistButton").click(function () {
		setTimeout(function() {
			$("#videoHeader").removeClass("menuOpened").addClass("menuClosed");
			nmcq_init();
		}, 1000);
	});


	//postMessage
	$(window).bind('message', function(e){
		var data = e.originalEvent.data;
		if (data == 'submit') {
			setTimeout(function(){
				nmcq_init();
				$("#videoHeader").removeClass("menuOpened").addClass("menuClosed");
			},1000);
		}
	});


	setTimeout(nmcq_init, 500);



} else if (location.href.indexOf("http://www.nicovideo.jp/mylist_add/video/") > -1) {


	//マイリストの登録ボタンを押したら
	if (window.opener.location.href.indexOf("http://www.nicovideo.jp/watch/") > -1) {
		$("form#box_mylist_add").submit(function(){
			window.opener.postMessage('submit', 'http://www.nicovideo.jp/watch');
		});
	}


} else if (location.href.indexOf("http://www.nicovideo.jp/my/mylist") > -1) {



	function nmcq_vtoi(){
		var video_id = location.search.substring(1);
		if (video_id) {
			//マイリストデーター取得
			var myData = unsafeWindow.my.currentItems;
			//item_id検索
			for(var i=0,l=myData.length; i<l; i++){
				if (video_id == myData[i].item_data.video_id) {
					var order = i;
					var item_id = myData[i].item_id;
					break;
				}
			}
			//ページ処理
			var nextpage = Math.floor(order / 100) + 1;
			if (nextpage > 1) {
				var crturl = location.href.split("+")[0];
					location.href = crturl + "+page=" + nextpage;
					setTimeout(function(){nmcq_scroll(item_id);}, 1000);
			} else {
				nmcq_scroll(item_id);
			}
		}
	}


	//マイリストの色づけとスクロール
	var waitscroll = 0;
	function nmcq_scroll(item_id) {
		var li_id = $("#SYS_box_item_0_" + item_id);
		if (li_id.length) {
			li_id.css("background","#ffdddd");
			var scrollPosition = li_id.offset().top - window.innerHeight / 4;
			$("html, body").animate({
				scrollTop : scrollPosition
			}, 500);
		} else {
			waitscroll++;
			if (waitscroll < 20) {
				setTimeout(function(){nmcq_scroll(item_id);}, 250);
			} else {
				return;
			}
		}
	}


	//ニコ動側のmylist3.jsより。読込が終わったら
	$("#SYS_box_loading").nicoApiStop(function() {
		setTimeout(nmcq_vtoi, 1000);
	});


}

})(unsafeWindow.jQuery);

