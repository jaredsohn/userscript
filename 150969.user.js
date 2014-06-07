// ==UserScript==
// @name           nicovideo mylisted checker Harajuku
// @version        1.11
// @author         D008
// @namespace      http://userscripts.org/users/420733
// @description    マイリスト済みを表示します。
// @include        http://www.nicovideo.jp/watch/*
// @include        http://www.nicovideo.jp/my/mylist*
// ==/UserScript==



(function() {

if (location.href.indexOf("http://www.nicovideo.jp/watch/") > -1) {
	if (document.getElementById("nicoplayerContainer")) return;
//	GM_log("===nicovideo mylisted checker Harajuku===");


	var video_id = unsafeWindow.Video.id;
	var listed = false;
	var mylistIconImg = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAQCAMAAACx1dbmAAAAB3RJTUUH2wsVDgEEsNIIogAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAAwUExURf///wkPDzk/Px0jIyAmJiQqKiguLiwyMjA2NjQ6Ojg+PjxCQkBGRkNJSUZMTEhOToZMH0QAAACSSURBVHjalZLBFsIgDAQHta20qP//ty4kLZRb5j2SZZkjkCJA+kVIpG8E+Z8Zpj1m+aXglEbdLVJ6729F/nGCTc7IMRVC/u5gkysz9Fi/y885g07OLbXdxzXtRf5b6GJLpwW/9Bcv5G8V2Jx7qD1DK39twOph7YWX9Fb+cgeb9FyXp0X+K4L8ZwT5jwj1g4b+8x/u4xIgM2LnfAAAAABJRU5ErkJggg==';


	//表示位置設定
	var MylistVewPosition = GM_getValue("nmc_pos", 1);
	function setVewPosition(){
		var vnum = prompt("表示位置を設定してください(1～3)\n1:タグの上左寄せ 2:タグの上右寄せ 3:ボタンの上", GM_getValue("nmc_pos", 1));
		MylistVewPosition = (vnum>3 || vnum<1) ? MylistVewPosition : vnum;
		GM_setValue("nmc_pos", MylistVewPosition);
		window.location.reload();
	}


	//初めての時
	if (GM_getValue("nmc_pos")  == undefined) {
		setVewPosition();
	}


	//メニューに設定リンク追加
	document.getElementById("siteHeaderRightMenuContainer").innerHTML += '<li><a id="mylistPos" href="javascript:void(0);">ﾏｲﾘｽﾄ表示位置</a></li>';
	document.getElementById("mylistPos").addEventListener("click",function(e){
		setVewPosition()
	},false);


	function xpath(query) {
		return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}


	//書き込み
	function writeMylist(grp, uid) {
		var nm_url = '<nobr><a href="http://www.nicovideo.jp/my/mylist/?' + video_id + '#/' + uid  + '" target="_blank">[' + grp + ']</a></nobr> ';
		if (listed) {
			myList_ele.innerHTML += nm_url;
		}else{
			myList_ele.innerHTML = nm_url;
			listed = true;
		}
	}


	//各マイリストをチェック
	function checkGrpMylist(gid, mygrpname){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://ext.nicovideo.jp/api/mylist/list?group_id='+gid,
			onload: function(response) {
				if(response.responseText.indexOf('video_id":"' + video_id + '",') != -1) {
					writeMylist(mygrpname, gid);
				}
			}
		});
	}


	//マイリストグループ名取得
	function getGrpName(){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.nicovideo.jp/api/mylistgroup/list',
			onload: function(response) {
				var mylists = JSON.parse(response.responseText);
				for(var i=0; i<mylists.mylistgroup.length; i++){
					checkGrpMylist(mylists.mylistgroup[i].id, mylists.mylistgroup[i].name);
				}
			}
		});
	}


	//とりマイをチェック
	function checkDefMylist(){
		getGrpName();
		if (!listed) { myList_ele.innerHTML = "未登録"; }
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.nicovideo.jp/api/deflist/list',
			onload: function(response) {
				if(response.responseText.indexOf('video_id":"' + video_id + '",') != -1) {
					writeMylist("とりマイ","home");
				}
			}
		});
	}


	//「マイリスト登録」ボタンを押したら
	var deflisBtnPath = xpath('//div[@id="WATCHHEADER"]/div[4]/nobr/a[2]');
	var deflisEle = deflisBtnPath.snapshotItem(0);
	deflisEle.setAttribute("onclick","return false;");　//onclick変更
	deflisEle.addEventListener('click', function (e1) {
		var j = 0;
		//onclickの中身をここで実行
		var mylistWin = window.open('/mylist_add/video/' + video_id, 'nicomylistadd', 'width=500,height=360');
		//マイリストの子ウインドウを閉じたらチェック
		var tim1 = setInterval(function(){
			if (mylistWin.closed) {
				listed = false;
				checkDefMylist();
				clearInterval(tim1);
			}
			j++;
			// 1分たっても閉じなければ終了
			if (j > 120) { clearInterval(tim1); }
		}, 500);
	}, false);


	//「とりあえず一発登録」ボタンを押したら
	var mylisEle = document.getElementById('BTN_add_deflist');
	mylisEle.addEventListener('click', function (e2) {
		listed = false;
		// ”｢とりあえずマイリスト｣ に登録しました”のメッセージが出たらチェック
		var k = 0;
		var msg1 = document.getElementById('MSG_deflist');
		var msg2 = document.getElementById('MSG_deflist_success');
		var msg3 = document.getElementById('MSG_deflist_loading');
		var tim2 = setInterval(function(){
	//		GM_log("1=" + msg1.style.display + "2=" + msg2.style.display + "3=" + msg3.style.display);
			if (msg1.style.display != "none" && msg2.style.display != "none" && msg3.style.display == "none") {
				checkDefMylist();
				clearInterval(tim2);
			}else if (msg2.style.display == "none" && msg3.style.display == "none") {
				// 登録済みまたはエラー
				clearInterval(tim2);
			}
			k++;
			// 10秒たっても出なければ終了
			if (k > 20) { clearInterval(tim2); }
		}, 500);

	}, false);


	if (MylistVewPosition == 1 || MylistVewPosition == 2) {
		//表示①②用HTML成形
		var maylistbar = document.createElement("table");
		maylistbar.id = 'mylist_table';
		maylistbar.style.width = '980px';
		maylistbar.className = 'font12';
		maylistbar.border = '0';
		if (MylistVewPosition == 1) {
			maylistbar.innerHTML = '<tr>' +
				'<td id="mylisticon_td" width="52px"><img id="mylist_icon" title="クリックで更新" src="' + mylistIconImg  + '"></td>' +
				'<td id="mylist_grps">未登録</td>' +
				'</tr>';
		} else if (MylistVewPosition == 2) {
			maylistbar.innerHTML = '<tr>' +
				'<td align="right"><TABLE border="0" cellpadding="0" cellspacing="0" style="min-width:251px;"><TR>' +
				'<td id="mylisticon_td" width="52px"><img id="mylist_icon" title="クリックで更新" src="' + mylistIconImg  + '"></td>' +
				'<td id="mylist_grps">未登録</td>' +
				'</TR></TABLE></td>' +
				'</tr>';
		}
		//表示位置
		var nbrPath = xpath('//div[@id="WATCHHEADER"]');
		var nbrEle = nbrPath.snapshotItem(0);
		var btnPath = xpath('//div[@id="WATCHHEADER"]/div[3]');
		var btnEle = btnPath.snapshotItem(0);
		nbrEle.insertBefore(maylistbar, btnEle);

		var myList_ele = document.getElementById('mylist_grps');

		var icon_ele = document.getElementById('mylist_icon');
		icon_ele.addEventListener('click', function (e3) { listed = false; checkDefMylist(); }, false);

	} else {
		//表示③用HTML成形
		var maylistbar = document.createElement("table");
		maylistbar.id = 'mylist_table';
		maylistbar.style.width = '256px';
		maylistbar.className = 'font12';
		maylistbar.border = '0';
		maylistbar.setAttribute( "cellpadding", "0px" );
		maylistbar.setAttribute( "cellspacing", "0px" );
		maylistbar.style.padding = '5px 1px';
		maylistbar.innerHTML = '<tr>' +
				'<td id="mylisticon_td" width="52px"><img id="mylist_icon" title="クリックで更新" src="' + mylistIconImg  + '"></td>' +
				'<td id="mylist_grps">未登録</td>' +
				'</tr>';
		//表示位置
		var nbrPath = xpath('//div[@id="WATCHHEADER"]/div[4]');
		var nbrEle = nbrPath.snapshotItem(0);
		var btnPath = xpath('//div[@id="WATCHHEADER"]/div[4]/nobr');
		var btnEle = btnPath.snapshotItem(0);
		nbrEle.insertBefore(maylistbar, btnEle);

		var myList_ele = document.getElementById('mylist_grps');

		var icon_ele = document.getElementById('mylist_icon');
		icon_ele.addEventListener('click', function (e3) { listed = false; checkDefMylist(); }, false);

	}

	GM_registerMenuCommand("マイリスト表示位置:" + GM_getValue("nmc_pos", 1), setVewPosition);

	checkDefMylist();


} else if (location.href.indexOf("http://www.nicovideo.jp/my/mylist") > -1) {


	var $ = unsafeWindow.jQuery;


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
})();

