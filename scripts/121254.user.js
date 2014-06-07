// ==UserScript==
// @name           custom3gokushi
// @version        0.2.0
// @namespace      http://userscripts.org/scripts/show/115411
// @description    俺が使いやすいように色々カスタマイズゥ！mixi鯖＆Chromeでしか確認してません
// @icon           http://lh3.googleusercontent.com/-LF-k2bVbJ70/TpbGKTAfJDI/AAAAAAAABU4/EpxbjjKUj6g/s135/icon_custom3gokushi.png
// @include        http://*.sangokushi.in.th/*
// @run-at         document-end
// ==/UserScript==
( function(){

	//************************//
	// 書簡一覧のカスタマイズ //
	//************************//
	if (location.pathname == '/message/inbox.php') {
		var menu = document.getElementById('statMenu');

		//------------------------------//
		// 「全てチェック」ボタンを追加 //
		//------------------------------//
		var li1 = document.createElement('li');
		li1.setAttribute('class', 'last');
		menu.appendChild(li1);

		var btn1 = document.createElement('input');
		btn1.setAttribute('type', 'button');
		btn1.setAttribute('value', '全てチェック');
		btn1.addEventListener('click', function () {
			var table = document.getElementsByClassName('commonTables')[0];
			var elems = table.getElementsByTagName('input');
			for (var i = 0; i < elems.length; i++) {
				if (elems[i].getAttribute('type') == 'checkbox') {
					elems[i].checked = true;
				}
			}
		});
		li1.appendChild(btn1);

		//------------------------------//
		// 「全て裏で開く」ボタンを追加 //
		//------------------------------//
		var counter = 0;
		var messages = new Array();
		var elems = document.getElementsByClassName('unread');
		for (var i = 0; i < elems.length; i++) {
			var elemsA = elems[i].getElementsByTagName('a');
			for (var j = 0; j < elemsA.length; j++) {
				if (elemsA[j].href && elemsA[j].href.match(/detail.php/)) {
					messages.push(elemsA[j].href);
				}
			}
		}

		if (messages.length > 0) {
			var li2 = document.createElement('li');
			li2.setAttribute('class', 'last');
			menu.appendChild(li2);

			var btn2 = document.createElement('input');
			btn2.setAttribute('type', 'button');
			btn2.setAttribute('value', '全て裏で開く');

			btn2.addEventListener('click', function () {

				// ボタンを無効化
				btn2.disabled = true;

				//未読書簡を全て開く
				for (var i = 0; i < messages.length; i++) {
					var url = messages[i];
					var req = new XMLHttpRequest();
					req.onreadystatechange = function(event) {
						if (event.target.readyState == 4) {
							counter++;
						}
						if (messages.length == counter) {
							// 全応答が返ってきたら再読込
							location.href = location;
						}
					}
					req.open('GET', url, true);
					req.send();
				}
			});
			li2.appendChild(btn2);
		}
	//************************//
	// 書簡詳細のカスタマイズ //
	//************************//
	} else if (location.pathname == '/message/detail.php') {

		//---------------------------------------------------------//
		// 書簡本文中にURLが含まれる場合は、アンカータグを追加する //
		//---------------------------------------------------------//
		var td = document.evaluate(
						"//div[@id='gray02Wrapper']/table[@class='commonTables']/tbody/tr[5]/td",	// XPath式
						document,																	// 評価対象ノード
						null,																		// 名前空間
						XPathResult.FIRST_ORDERED_NODE_TYPE,										// 結果型
						null
					).singleNodeValue;

		var text = td.innerHTML.replace(
					/(https?:\/\/[-_.!~*\'\(\)a-zA-Z0-9;\/?:\@&=+\$,%#]+)/g,
					function () {
						return '<a href="' + RegExp.$1 + '" target="_blank">' + RegExp.$1 + '</a>'
					});

		td.innerHTML = text;
	}

	//======================//
	// 簡易ヘッダに置き換え //
	//======================//
	var header = document.getElementById('header');
	if (header != null) {
		// 新しいヘッダ領域を作成
		var newHeader = document.createElement('div');
		newHeader.setAttribute('style', 'background-color : black; padding: 2px 10px;');
		header.appendChild(newHeader);

		// containerクラスのパディングは消去
		GM_addStyle('#container { padding-top: 0px !important }')

		// ◎プロフィール
		var prof = document.createElement('a');
		prof.setAttribute('href', '/user/');
		prof.style.width        = '83px';
		prof.style.height       = '19px';
		prof.style.marginTop    = '3px';
		prof.style.marginLeft   = '5px';
		prof.style.marginBottom = '2px';
		prof.style.background   = 'url("http://img.3gokushi.jp/20111011-06/extend_project/w760/img/common/btn_profile_header.png") no-repeat -3px -39px';
		prof.style.display      = 'block';
		prof.style.cssFloat     = "left";
		newHeader.appendChild(prof);

		// ◎各種ボタン
		// 元コードは3gokushi-beyond-mixから拝借！謝謝！
		var btnConfs = {
			'hbtn_buycp.png'		: {	width : 26,	start : -6	},	// CPを購入する
			'hbtn_special.png'		: {	width : 26,	start : -26	},	// 便利機能一覧
			'hbtn_getbusho.png'		: {	width : 22,	start : -2	},	// ブショーダスを引く
			'hbtn_yorodudas.png'	: {	width : 25,	start : -2	},	// ヨロズダスを引く
			'hbtn_bushoduel.png'	: {	width : 27,	start : -1	},	// ブショーデュエル
//			'hbtn_cpdeposit.png'	: {	width : 20,	start : -20	},	// 
//			'hbtn_invitefriend.png'	: {	width : 27,	start : -9	}	// 
			'hbtn_busyobook.png'	: {	width : 27,	start : -2	}	// 武将図鑑を開く
		};

		var btnAreaBox = document.getElementById('btn_area_box');
		var aElements = btnAreaBox.getElementsByTagName('a');
		for (var i = 0; i < aElements.length; i++) {

			// ボタン領域にある<a>要素をコピー
			var aElement = aElements[i].cloneNode(true);
			newHeader.appendChild(aElement);

			// 長方形→正方形に整形
			var imgElements = aElement.getElementsByTagName('img');
			if (! imgElements) {
				continue;	// 既に整形済みの場合は何もしない
			}

			for (var j = 0; j < imgElements.length; j++) {
				var imgElement = imgElements[j];

				var imgname = imgElement.src.substring(imgElement.src.lastIndexOf("/") + 1);
				if (btnConfs[imgname] && imgElement.style.display != 'none') {
					imgElement.style.display = 'none';

					imgElement.parentNode.style.width        = btnConfs[imgname].width + 'px';
					imgElement.parentNode.style.height       = '25px';
					imgElement.parentNode.style.marginLeft   = '5px';
					imgElement.parentNode.style.marginBottom = '2px';
					imgElement.parentNode.style.background   = 'url("' + imgElement.src + '") no-repeat ' + btnConfs[imgname].start + 'px 0px';
					imgElement.parentNode.style.display      = 'block';
					imgElement.parentNode.style.cssFloat     = "left";
				}
			}
		}

		// ◎ひとこと掲示板の表示切替
		var comment = document.createElement('a');
		comment.addEventListener('click', function() {
			var headerTop = document.getElementById('header_top');
			if (! headerTop) {
				return;
			}
			if (headerTop.style.display == 'none') {
				headerTop.style.display = 'block';
			} else {
				headerTop.style.display = 'none';
			}
		});
		comment.style.width        = '45px';
		comment.style.height       = '13px';
		comment.style.marginTop    = '6px';
		comment.style.marginLeft   = '5px';
		comment.style.marginBottom = '2px';
		comment.style.background   = 'url("http://img.3gokushi.jp/20111011-06/extend_project/w760/img/common/news/btn_comment.png") no-repeat -5px -6px';
		comment.style.display      = 'block';
		comment.style.cssFloat     = "left";
		newHeader.appendChild(comment);

		// ◎ヘルプ
		var help = document.getElementById('supportNavi').cloneNode(true);
		help.style.cssFloat = 'left';
		help.style.marginTop = '2px';
		help.style.marginLeft = '5px';
		help.style.width = '50px';
		help.style.height = '19px';
		help.style.backgroundColor = 'white';
		newHeader.appendChild(help);

		// ◎サーバー名
		var world_name = document.getElementById('worldtime').getElementsByClassName('world')[0].getElementsByTagName('dt')[0].innerHTML;
		var world = document.createElement('div');
		world.innerHTML = world_name;
		world.style.cssFloat = 'left';
		world.style.marginTop = '5px';
		world.style.marginLeft = '5px';
		world.style.marginBottom = '2px';
		world.style.color = 'white';
		newHeader.appendChild(world);

		// ◎サーバー時間(非表示)
		var server_time = document.getElementById('server_time').cloneNode(true);
		newHeader.appendChild(server_time);

		// ◎サーバー時間(表示)
		var server_time_disp = document.getElementById('server_time_disp').cloneNode(true);
		server_time_disp.style.cssFloat = 'left';
		server_time_disp.style.marginTop = '5px';
		server_time_disp.style.marginLeft = '5px';
		server_time_disp.style.marginBottom = '2px';
		server_time_disp.style.color = 'white';
		newHeader.appendChild(server_time_disp);

		// ◎BP/TP/CP
		var bptpcp_area = document.getElementById('bptpcp_area').cloneNode(true);
		bptpcp_area.style.cssFloat = 'left';
		bptpcp_area.style.marginLeft = '5px';
		bptpcp_area.style.marginBottom = '2px';
		var liElements = bptpcp_area.getElementsByTagName('li');
		for (var i = 0; i < liElements.length; i++) {
			liElements[i].style.cssFloat = 'left';
			liElements[i].style.marginTop = '2px';
			liElements[i].style.marginLeft = '5px';
			liElements[i].style.marginBottom = '2px';
			liElements[i].style.color = 'white';
		}
		newHeader.appendChild(bptpcp_area);

		// ◎末尾（非表示）
		var end = document.createElement('div');
		end.style.clear = 'left';
		newHeader.appendChild(end);
	}

	//================================//
	// スタートメニューのカスタマイズ //
	//================================//
	var startMenu = document.getElementById('statMenu');
	if (startMenu != null) {
		var elements = startMenu.getElementsByTagName('a');
		for (var i = 0; i < elements.length; i++) {
			var href = elements[i].getAttribute('href');

			// 「領地管理」のデフォルトを「戦力」の「降順」にする
			if (href == '../facility/territory_status.php') {
				elements[i].setAttribute('href', href + '?p=1&s=2&o=1&sort_order=CODE_TERRITORY_SORT_ORDER_SCORE&sort_order_type=1');
			// 「合成」のデフォルトを「スキルLVUP合成ができる武将」にする
			} else if (href == '../union/index.php') {
				elements[i].setAttribute('href', href + '?union_card_select=1');
			}
		}
	}

	//============================//
	// 「カードを破棄」ボタン追加 //
	//============================//
	var backElements = document.getElementsByClassName('back');
	for (var i = 0; i < backElements.length; i++) {
		var aElements = backElements[i].getElementsByTagName('a');
		for (var j = 0; j < aElements.length; j++) {
			if (aElements[j].getAttribute('href') == 'busyodas.php') {

				// SSID取得
				var ssid = document.getElementsByName('ssid')[0].getAttribute('value');

				// cardID取得
				var cardID = 'unknown'
				var root = document.getElementById('gray02Wrapper');
				var tempElements = root.getElementsByTagName('a');
				for (var k = 0; k < tempElements.length; k++) {
					var href = tempElements[k].getAttribute('href');
					if (href.match(/'(\d{2,})'\)$/)) {
						cardID = RegExp.$1;
						break;
					}
				}

				// <form>要素 生成
				var form = document.createElement('form');
				form.setAttribute('name', 'deck_file');
				form.setAttribute('method', 'post');
				form.setAttribute('action', '../card/deck.php');
				form.setAttribute('style', 'display : none');

				var inputs = [
					{ type : 'hidden',	name : 'btn_change_flg',	value : ''			},
					{ type : 'hidden',	name : 'mode',				value : 'del'		},
					{ type : 'hidden',	name : 'ssid',				value : ssid		},
					{ type : 'hidden',	name : 'target_card',		value : cardID		}
				];

				for (var k = 0; k < inputs.length; k++) {
					var input = document.createElement('input');
					input.setAttribute('type', inputs[k].type);
					input.setAttribute('name', inputs[k].name);
					input.setAttribute('value', inputs[k].value);
					form.appendChild(input);
				}

				// <a>要素 生成
				var a = document.createElement('a');
				a.setAttribute('href', 'javascript: if (confirm("本当に破棄しますか？")) document.deck_file.submit()');

				// <img>要素 生成
				var img = document.createElement('img');
				img.setAttribute('src', 'http://img.3gokushi.jp/20111011-06/extend_project/w760/img/card/common/btn_delete_card_long.gif');
				img.setAttribute('alt', 'カード破棄');
				img.setAttribute('title', 'カード破棄');

				a.appendChild(img);
				aElements[j].parentNode.appendChild(form);
				aElements[j].parentNode.appendChild(document.createElement('br'));
				aElements[j].parentNode.appendChild(document.createElement('br'));
				aElements[j].parentNode.appendChild(a);

				break;
			}
		}
	}

	//==================//
	// 不要ウィドウ削除 //
	//==================//
	var targetIDs = [
		'header_bottom',	// 画面上部の「プロフィール」「各種ボタン」「BP/TP/CP」「サーバ名、サーバ時間」
		'social',			// 画面下部の「ランキング」
	];
	for (var i = 0; i < targetIDs.length; i++){
		GM_addStyle('#' + targetIDs[i] + ' { display: none !important }');

		var node = document.getElementById(targetIDs[i]);
		if (node != null) {
			node.style.display = 'none !important';
			node.parentNode.removeChild(node);
		}
	}

	// 画面上部の「ブラウザ三国志ロゴ」「コメント一覧」「ヘルプ」エリアを縮小
	var headerTop = document.getElementById('header_top');
	if (headerTop) {
//		headerTop.style.display = 'none';
		headerTop.style.marginTop = '10px';
		headerTop.style.marginBottom = '10px';
	}

}) ();
