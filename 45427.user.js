// ==UserScript==
// @name           Bad Nicouser Blocker
// @varsion        1.13
// @description    検索結果の悪質なうｐ主の動画を非表示にするスクリプト
// @include        http://www.nicovideo.jp/tag/*
// @include        http://www.nicovideo.jp/search/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @namespace      http://script41self.seesaa.net/
// @author         favril
// ==/UserScript==

(function(){
	// cookie check
	var col_num = 1;
	if(document.cookie) {
		var cookies = document.cookie.split('; ');
		for(var i=0; i<cookies.length; i++) {
			var str = cookies[i].split('=');
			if(str[0] == 'col') {
				col_num = parseInt(str[1]); // 2か4のはず。
				break;
			}
		}
	}

	// XPath
	var div = document.evaluate('id("PAGEBODY")/div[@class="content_672"]', document, null, 7, null);
	if(!div.snapshotLength) return;
	div = div.snapshotItem(0);

	var userID = unsafeWindow.User.id;
	var regNum = GM_getValue(userID + '_regNum', 0);
	
	var reg_user_field = document.createElement('div');
	reg_user_field.style.marginTop = '20px';
	reg_user_field.style.marginBottom = '20px';
	reg_user_field.style.fontSize = '12px';

	var body_tgl = document.createElement('a');
	body_tgl.href = 'javascript:;';
	body_tgl.title = 'クリックで表示';
	body_tgl.addEventListener('click', function(){
		var fb = document.getElementById('BNB_field_body');
		if (fb.style.display == 'none') {
			fb.style.display = '';
			this.title = 'クリックで非表示';
		} else {
			fb.style.display = 'none';
			this.title = 'クリックで表示';
		}
	}, false);
	body_tgl.style.outline = 'none';
	var desc_p = document.createElement('span');
	desc_p.innerHTML = '◆ ブロックしているユーザ(<span id="BNB_num">' + regNum + '</span>) ◆';
	body_tgl.appendChild(desc_p);
	reg_user_field.appendChild(body_tgl);

	var field_body = document.createElement('div');
	field_body.id = 'BNB_field_body';
	field_body.style.display = 'none';
	reg_user_field.appendChild(field_body);
	
	desc_p = document.createElement('p');
	desc_p.innerHTML = 'クリックでブロックを解除し，非表示にしている動画を表示します。';
	desc_p.style.marginBottom = '8px';
	field_body.appendChild(desc_p);
	
	for(var i=0; i<regNum; i++) {
		field_body.appendChild(BNB_addBadUser(i));
	}
	div.parentNode.insertBefore(reg_user_field, div);

	var cells = document.evaluate('*//div[@class="uad_thumbfrm"]/..', div, null, 7, null);
	if(!cells.snapshotLength) return;
	var idx = 0;
	insertNickname();

	function insertNickname() {
		a_elem = document.evaluate('*//a/img/..', cells.snapshotItem(idx), null, 7, null).snapshotItem(0);

		GM_xmlhttpRequest({
			method: 'GET',
			headers: { 'User-Agent': 'Mozilla/5.0 Greasemonkey (Bad Nicouser Blocker)' },
			url: 'http://www.smilevideo.jp/view/' + a_elem.getAttribute('href').substring(8),
			onload: function(res){
				var nickname = 'no name'; // can't get nickname
				if(/<strong>(.+?)<\/strong> が投稿した動画/.test(res.responseText)) {
					nickname = decodeURIComponent(RegExp.$1);
				}
				
				var p = document.createElement('p');
				p.style.fontSize = '12px';
				p.innerHTML = 'うｐ主: ';
				var a = document.createElement('a');
				a.setAttribute('title', 'クリックで，' + nickname + ' の動画を非表示にします。');
				a.innerHTML = nickname;
				a.style.fontWeight = 'bold';
				a.href = 'javascript:void(0);';
				a.addEventListener('click',
					function() {
						// 値の更新
						GM_setValue(userID + '_baduser' + regNum, nickname.toSource());

						// baduserリストに追加
						field_body.appendChild(BNB_addBadUser(regNum));
						
						regNum++;
						GM_setValue(userID + '_regNum', regNum);
						
						// クリックされたうｐ主を消す
						BNB_tgl(true, nickname);
						
						document.getElementById('BNB_num').innerHTML = regNum;
					}, false);
				p.appendChild(a);
				
				var inpos = (col_num == 2) ? a_elem.parentNode.parentNode.parentNode.parentNode.parentNode : a_elem.parentNode;
				inpos.parentNode.insertBefore(p, inpos);
				
				// nickname属性をcellに追加しとく
				cells.snapshotItem(idx).setAttribute('nickname', nickname);
				
				// ニックネームげっとできたら、削除対象かどうか確認。
				// 対象なら非表示に。
				for(var k=0; k<regNum; k++) {
					var bu = eval(GM_getValue(userID + '_baduser' + k));
					if(bu == nickname) {
						if (col_num == 2) cells.snapshotItem(idx).parentNode.parentNode.parentNode.parentNode.style.display = 'none';
						else if (col_num == 4) cells.snapshotItem(idx).parentNode.style.display = 'none';
						else cells.snapshotItem(idx).parentNode.parentNode.style.display = 'none';
					}
				}
				
				if(idx < cells.snapshotLength){
					idx++;
					insertNickname();
				}
			}
			//onerror: function(res){ GM_log(res.status + ':' + res.statusText); }
		});
	}
	
	function BNB_tgl(isBlock, user) {
		for(var i=0,len=cells.snapshotLength; i<len; i++) {
			var nn = cells.snapshotItem(i).getAttribute('nickname');
			
			if(isBlock && (user == nn)) {
				if (col_num == 2) cells.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.style.display = 'none';
				else if (col_num == 4) cells.snapshotItem(i).parentNode.style.display = 'none';
				else cells.snapshotItem(i).parentNode.parentNode.style.display = 'none';
			}
			else if((!isBlock) && (user == nn)) {
				if (col_num == 2) cells.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.style.display = '';
				else if (col_num == 4) cells.snapshotItem(i).parentNode.style.display = '';
				else cells.snapshotItem(i).parentNode.parentNode.style.display = '';
			}
		}
	}
	
	function BNB_addBadUser(idx) {
		var user = eval(GM_getValue(userID + '_baduser' + idx));
		
		var a = document.createElement('a');
		a.setAttribute('title', 'クリックで，' + user + ' の動画を表示します。');
		a.innerHTML = user;
		a.style.fontWeight = 'bold';
		a.style.marginRight = '15px';
		a.href = 'javascript:void(0);';
		a.id = 'baduser' + idx;
		a.addEventListener('click',
			function() {
				regNum--;
				GM_setValue(userID + '_regNum', regNum);
				
				var thisID = parseInt(this.id.substring(7));
				
				// 要素削除
				field_body.removeChild(document.getElementById('baduser' + thisID));

				// 全部ずらす
				for(var j=thisID; j<regNum; j++) {
					GM_setValue(userID + '_baduser' + j, GM_getValue(userID + '_baduser' + (j+1)));
					document.getElementById('baduser' + (j+1)).id = 'baduser' + j;
				}
				
				// クリックされたうｐ主を表示
				BNB_tgl(false, user);
				
				document.getElementById('BNB_num').innerHTML = regNum;
			}, false);
		
		return a;
	}
	
})();