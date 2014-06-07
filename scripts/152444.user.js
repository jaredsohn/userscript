// ==UserScript==
// @name		   Nsen mylisted checker
// @version 	   1.02
// @author		   D008
// @namespace	   http://userscripts.org/users/420733
// @description    Nsenで放送中の動画のマイリスト登録先を表示します。
// @include 	   http://live.nicovideo.jp/watch/nsen/*
// @include 	   http://www.nicovideo.jp/mylist_add/video/*
// @require 	   http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==



(function(){
if (location.href.indexOf("http://live.nicovideo.jp/watch/nsen/") > -1) {

	var mylists = new Array();
	var ReqCount = -1;


	//各マイリストを読込
	function NsenMC_checkGrpMylist(gid, mygrpname){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://ext.nicovideo.jp/api/mylist/list?group_id='+gid,
			onload: function(response) {
				ReqCount -= 1;
				mylists[mygrpname] = new Array();
				mylists[mygrpname]["data"] = response.responseText;
				mylists[mygrpname]["id"] = gid;
			}
		});
	}


	//マイリストグループ名取得
	function NsenMC_getGrpName(){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.nicovideo.jp/api/mylistgroup/list',
			onload: function(response) {
				var mygroup = JSON.parse(response.responseText);
				ReqCount = mygroup.mylistgroup.length;
				for(var i=0; i<mygroup.mylistgroup.length; i++){
					NsenMC_checkGrpMylist(mygroup.mylistgroup[i].id, mygroup.mylistgroup[i].name);
				}
			}
		});
	}


	//とりマイを読込
	function NsenMC_checkDefMylist(){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.nicovideo.jp/api/deflist/list',
			onload: function(response) {
				mylists["とりマイ"]= new Array();
				mylists["とりマイ"]["data"] = response.responseText;
				mylists["とりマイ"]["id"] = "home";
			}
		});
		NsenMC_getGrpName();
	}


	//書き込み
	function NsenMC_writeMylist(video_id, grp, uid) {
		var nm_url = '<nobr><a href="http://www.nicovideo.jp/my/mylist/?' + video_id + '#/' + uid  + '" target="_blank">[' + grp + ']</a></nobr> ';
		if (listed) {
			$("#NsenMC_mylisted").append(nm_url);
		}else{
			$("#NsenMC_mylisted").html(nm_url);
			listed = true;
		}
	}


	//マイリストチェック
	function NsenMC_search(video_id){
		var find = false;
		for(var gname in mylists){
			if(mylists[gname].data.indexOf('video_id":"' + video_id + '",') != -1) {
				find = true;
				NsenMC_writeMylist(video_id, gname, mylists[gname].id);
			}
		}
		if (!find) {
			$("#NsenMC_mylisted").html('<a title="マイリスト登録" href="http://www.nicovideo.jp/mylist_add/video/' + video_id + '" onclick="window.open(\'http://www.nicovideo.jp/mylist_add/video/' + video_id + '\', \'nicomylistadd\', \'width=500,height=360\'); return false;">未登録</a>');
		}
	}


	//数字に","追加
	function addFigure(str) {
		var num = new String(str).replace(/,/g, "");
		while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
		return num;
	}


	//日付フォーマット
	function NsenMC_dataFormat(d){
		year   = d.getYear();
		month  = d.getMonth() + 1;
		day    = d.getDate();
		hour   = d.getHours();
		minute = d.getMinutes();
		if (year < 2000) { year += 1900; }
		if (month  < 10) { month = '0'+month; }
		if (day    < 10) { day = '0'+day; }
		if (hour   < 10) { hour = '0'+hour; }
		if (minute < 10) { minute = '0'+minute; }
		return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
	};


	//曲情報取得
	function NsenMC_getthumbinfo(video_id){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://ext.nicovideo.jp/api/getthumbinfo/' + video_id,
			onload: function(response) {
				var parser = new DOMParser();
				var xml = parser.parseFromString(response.responseText,"application/xml");
				var first_retrieve = $(xml).find('first_retrieve').text();
					var date = first_retrieve.match(/\d+/g);
					first_retrieve = NsenMC_dataFormat(new Date(date[0],date[1]-1,date[2],date[3],date[4],date[5]));
				var length = $(xml).find('length').text();
				var view_counter = addFigure($(xml).find('view_counter').text());
				var comment_num = addFigure($(xml).find('comment_num').text());
				var mylist_counter = addFigure($(xml).find('mylist_counter').text());
				var user_id = $(xml).find('user_id').text();
				if (user_id) {
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://ext.nicovideo.jp/thumb_user/' + user_id,
						onload: function(response) {
							var userName = response.responseText.match(/<title>(.*)さんのプロフィール/)[1];
							$("#NsenMC_info").html('<a href="http://www.nicovideo.jp/user/' + user_id + '" style="color:#66CCFF" target="_blank">' + userName + '</a>さん　' + first_retrieve + '　再:' + view_counter + '　コ:' + comment_num + '　マ:' + mylist_counter + '　長:' + length);
						}
					});
				} else {
					//チャンネル動画にはユーザー名がない。
					$("#NsenMC_info").html(first_retrieve + '　再:' + view_counter + '　コ:' + comment_num + '　マ:' + mylist_counter + '　長:' + length);
				}
			}
		});
	}

	//書き込みエリア挿入
	function NsenMC_insArea(){
		if (!$("#NsenMC_mylisted").length) {
			$("#playingBox").append('<div id="NsenMC_mylisted" style="width:440px;height:14px;top:5px;right:10px;font-size:11px;text-align:right;display:block;position:absolute;"></div>');
		}
		var video_id = /http:\/\/www\.nicovideo\.jp\/watch\/([0-9a-z]+)/.exec($("#playingBox p.movieLink>a").attr("href"))[1];
		listed = false;
		NsenMC_search(video_id);
		NsenMC_getthumbinfo(video_id)
	}


	//マイリストの読込を待つ
	function NsenMC_load(){
		if (ReqCount == 0) {
			NsenMC_insArea();
		} else {
			setTimeout(NsenMC_load, 500);
		}
	}


	//マイリスト再読み込み
	function NsenMC_reload(){
		mylists = new Array();
		listed = false;
		ReqCount = -1;
		$("#NsenMC_mylisted").html("読込中");
		NsenMC_checkDefMylist();
		NsenMC_load();
	}


	var ctim = false;
	//描画が終わるまで待つ
	function NsenMC_pbwait(){
		if ($("#playingBox p.movieLink>a").length) {
			$("#playingBox").css("margin-bottom","5px");
			$("#playingBox").after('<div id="NsenMC_info" style="width:562; text-align:center; line-height:15px; font-size:12px; color:#fff; margin-bottom:20px;"></div>');
			//曲が変わったら
			$("#playingBox").bind("DOMSubtreeModified", function(){
				if (!$("#NsenMC_mylisted").length) {
					if (ctim !== false) clearTimeout(ctim);
					ctim = setTimeout(function(){
						NsenMC_insArea();
						ctim　= false;
					}, 1000);
				}
			});
			//クリックしたら更新
			$("h3#h3Playing").css("cursor", "pointer");
			$("h3#h3Playing").attr("title", "クリックでマイリストデーター更新");
			$("h3#h3Playing").click(function(){
				if (ctim !== false) clearTimeout(ctim);
				if (ReqCount != 0) return;
				ctim = setTimeout(function(){
					NsenMC_reload();
					ctim == false;
				}, 500);
			});
			setTimeout(NsenMC_load, 250);
		} else {
			setTimeout(NsenMC_pbwait, 250);
		}
	}


	//postMessage
	$(window).bind('message', function(e){
		var data = e.originalEvent.data;
		if (data == 'submit') {
			setTimeout(NsenMC_reload, 2000);
v		}
	});


	NsenMC_checkDefMylist();
	setTimeout(NsenMC_pbwait, 1000);


	//ザッピングエリア消去
	$("#zapping_area").css("height","0");
	$("#zapping_area_place_holder").css("display","none");


} else if (location.href.indexOf("http://www.nicovideo.jp/mylist_add/video/") > -1) {


	if (document.referrer.indexOf("http://live.nicovideo.jp/watch/nsen/") > -1) {
		$("#select_group").prepend($("option.public_group"));
		$("#select_group").val("default");

		$("form#box_mylist_add").submit(function(){
			window.opener.postMessage('submit', 'http://live.nicovideo.jp/watch/nsen');
		});
	}


}

})();
