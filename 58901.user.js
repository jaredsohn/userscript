// ==UserScript==
// @name           A year ago NicoRanking
// @author         favril
// @namespace      http://script41self.seesaa.net/
// @description    1年前のランキングTOP3を表示するスクリプト
// @version        0.3.2
// @include        http://www.nicovideo.jp/ranking/*/daily/*
// @exclude        http://www.nicovideo.jp/ranking/*/daily/*/20*
// ==/UserScript==

(function(){
	var nrField = document.createElement('div');
	var inpos   = document.getElementById('PAGEBODY').getElementsByTagName('div')[0];
	inpos.parentNode.insertBefore(nrField, inpos);
	nrField.style.marginTop    = '30px';
	nrField.style.marginBottom = '20px';
	
	// date
	var now = new Date();
	// 1年前
	var ago = new Date(now.getFullYear()-1, now.getMonth(), now.getDate());

	var year  = ago.getFullYear();
	var month = ago.getMonth() + 1;
	var day   = ago.getDate();

	// 整形
	if(month < 10) { month = '0' + month; }
	if(day   < 10) { day   = '0' + day; }

	var date = year.toString() + month + day;

	var currentURL = location.href;
	if(currentURL.lastIndexOf('/') != currentURL.length-1) currentURL += '/';
	if(currentURL.indexOf('/daily/') == -1) {
		// for "@include http://www.nicovideo.jp/ranking/*"
		currentURL = currentURL.replace(/^(.+\/ranking\/[^\/]+)\/[^\/]+\/(.+)$/, '$1/daily/$2');
	}
	var rankURL = currentURL + date;

	// CSS追加
	GM_addStyle(<><![CDATA[
		div.NR_frm {
			background: #F7F7F7 none repeat scroll 0%;
			border: 1px solid #CCCCCC;
			padding: 3px;
			width: 212px;
		}

		.NR_rank1 {
			color: red;
			font-weight: bold;
			padding-top: 32px;
			text-align: center;
		}

		.NR_rank {
			color: #FD8;
			font-weight: bold;
			padding-top: 32px;
			text-align: center;
		}

		div.NR_TL {
			float: left;
			overflow: hidden;
			padding: 4px;
			width: 98px;
		}

		div.NR_TR {
			float: left;
			overflow: hidden;
			padding: 4px;
			width: 98px;
		}

		div.NR_B {
			clear: left;
			overflow: hidden;
			padding: 4px;
			width: 204px;
		}
	]]></>);


	// title
	var tmp = document.createElement('p');
	tmp.style.fontSize   = '18px';
	tmp.style.lineHeight = '22px';
	tmp.style.fontWeight = 'bold';
	tmp.style.textAlign  = 'center';
	tmp.innerHTML = '1年前の「' + NR_getCategory(currentURL) + '」ランキング';
	nrField.appendChild(tmp);
	tmp = document.createElement('p');
	tmp.style.fontSize = '12px';
	tmp.style.textAlign = 'center';
	var eve = new Date(ago.getFullYear(), ago.getMonth(), ago.getDate()-1);
	tmp.innerHTML = '<strong>' + eve.getFullYear() + '/' +
					(((eve.getMonth()+1)<10) ? ('0' + (eve.getMonth()+1)) : (eve.getMonth()+1)) +
					'/' + ((eve.getDate()<10) ? ('0' + eve.getDate()) : eve.getDate()) + ' 6:00 ～ ' +
					year + '/' + month + '/' + day + ' 6:00</strong> で集計';
	nrField.appendChild(tmp);
	
	tmp = document.createElement('p');
	tmp.style.fontSize = '10px';
	tmp.style.textAlign = 'center';
	tmp.innerHTML = '(※) 再生・コメント・マイリスト： <strong>当時</strong> → <strong>現在</strong>';
	nrField.appendChild(tmp);
	
	var more = document.createElement('div');
	more.style.width = '820px';
	more.style.textAlign = 'center';
	more.style.fontSize = '12px';
	more.style.textAlign = 'right';
	more.innerHTML = '<a href="' + rankURL + '" target="_blank">もっと見る</a>';
	nrField.appendChild(more);
	
	var tbl = document.createElement('table');
	tbl.setAttribute('cellspaceing', 0);
	tbl.setAttribute('cellpadding', 4);
	tbl.setAttribute('border', 0);
	tbl.style.margin = '0pt auto 16px';
	var tbody = document.createElement('tbody');
	var row   = document.createElement('tr');
	row.setAttribute('valign', 'top');
	var r1td = document.createElement('td');
	r1td.setAttribute('width', '220');
	var r2td = document.createElement('td');
	r2td.setAttribute('width', '220');
	var r3td = document.createElement('td');
	r3td.setAttribute('width', '220');
	row.appendChild(r1td);
	row.appendChild(r2td);
	row.appendChild(r3td);
	tbody.appendChild(row);
	tbl.appendChild(tbody);
	nrField.appendChild(tbl);

	// load
	currentURL.match(/ranking\/(.+)\/daily\/(.+)\/$/);
	var cache_name = RegExp.$1 + '_' + RegExp.$2;
	var cache      = eval(GM_getValue(cache_name));
	var rankObjs   = new Array(3);

	if(cache && cache.date == date) {
		NR_createRankCell(cache.rank_data[0], 1);
		NR_createRankCell(cache.rank_data[1], 2);
		NR_createRankCell(cache.rank_data[2], 3);
	} else {
		GM_xmlhttpRequest({
			method: 'GET',
			url: rankURL,
			headers: { 'User-Agent': 'Mozilla/5.0 Greasemonkey (A year ago NicoRanking)' },
			onload: function(res){
				var rankHTML = res.responseText;

				if(rankHTML.indexOf('id="item1"') != -1) {
					NR_getNowInfo(NR_rankinfo_parser2(rankHTML, 1), 1);
					NR_getNowInfo(NR_rankinfo_parser2(rankHTML, 2), 2);
					NR_getNowInfo(NR_rankinfo_parser2(rankHTML, 3), 3);
				}
				else {
					nrField.removeChild(tbl);
					nrField.removeChild(more);
					
					var nodata = document.createElement('p');
					nodata.style.textAlign = 'center';
					nodata.style.marginTop = '10px';
					nodata.innerHTML = '<font color="red"><strong>データがありません。</strong></font>';
					nrField.appendChild(nodata);
				}

			},
			onerror: function(res){ GM_log(res.status + ':' + res.statusText); }
		});
		
		// for cache
		NR_timer(1000);
	}


	// timer reference: http://www.kanasansoft.com/weblab/2009/01/settimeoutsetinterval.html
	function NR_timer(ms) {
		if(rankObjs[0] && rankObjs[1] && rankObjs[2]) {
			// save
			var saveObj = new Object();
			saveObj.date = date;
			saveObj.rank_data = rankObjs;
			
			GM_setValue(cache_name, saveObj.toSource());
		} else {
			// loading
			setTimeout(NR_timer, ms);
		}
	}
	
	function NR_createRankCell(rObj, rank) {
		var nr_frm = document.createElement('div');
		nr_frm.setAttribute('class', 'NR_frm');
		
		// 左上
		var nr_tl = document.createElement('div');
		nr_tl.setAttribute('class', 'NR_TL');
		var nr_rank = document.createElement('div');
		if(rank == 1) nr_rank.setAttribute('class', 'NR_rank1');
		else nr_rank.setAttribute('class', 'NR_rank');
		nr_rank.setAttribute('nowrap', '');
		var p = document.createElement('p');
		p.style.fontSize = '126px';
		p.style.lineHeight = '37px';
		p.style.letterSpacing = '-4px';
		p.innerHTML = rank;
		nr_rank.appendChild(p);
		p = document.createElement('p');
		p.style.fontSize = '16px';
		var span = document.createElement('span');
		span.style.color = '#333';
		span.innerHTML = rObj.point + ' pts.';
		p.appendChild(span);
		nr_rank.appendChild(p);
		nr_tl.appendChild(nr_rank);
		nr_frm.appendChild(nr_tl);
		
		// 右上
		var nr_tr = document.createElement('div');
		nr_tr.setAttribute('class', 'NR_TR');
		var div = document.createElement('div');
		var img = document.createElement('img');
		img.src = 'http://res.nicovideo.jp/img/common/cms/' + rObj.vid.substring(0, 2) + '.gif';
		img.setAttribute('alt', 'video icon');

		div.appendChild(img);
		nr_tr.appendChild(div);
		div = document.createElement('div');
		div.style.margin = '2px 0px';
		var a = document.createElement('a');
		a.href = 'http://www.nicovideo.jp/watch/' + rObj.vid;
		img = document.createElement('img');
		img.style.cssText = 'width:96px; border:2px solid #333;';
		img.setAttribute('alt', rObj.title);
		if(rObj.del == 0) img.src = rObj.thumb;
		else img.src = 'http://res.nicovideo.jp/img/common/video_deleted.jpg';
		a.appendChild(img);
		div.appendChild(a);
		nr_tr.appendChild(div);
		p = document.createElement('p');
		p.style.fontSize = '10px';
		var strong = document.createElement('strong');
		strong.innerHTML = rObj.vlen;
		p.appendChild(strong);
		p.appendChild(document.createElement('br'));
		nr_tr.appendChild(p);
		nr_frm.appendChild(nr_tr);
		
		// 下
		var nr_b = document.createElement('div');
		nr_b.setAttribute('class', 'NR_B');
		p = document.createElement('p');
		p.style.fontSize = '12px';
		strong = document.createElement('strong');
		strong.innerHTML = rObj.release;
		p.appendChild(strong);
		p.appendChild(document.createTextNode(' 投稿'));
		p.appendChild(document.createElement('br'));
		nr_b.appendChild(p);
		var h3 = document.createElement('h3');
		a = document.createElement('a');
		a.setAttribute('class', 'watch');
		a.href = 'http://www.nicovideo.jp/watch/' + rObj.vid;
		a.innerHTML = rObj.title;
		h3.appendChild(a);
		if(rObj.del == 1) {
			h3.appendChild(document.createTextNode(' '));
			strong = document.createElement('strong');
			strong.style.color = '#E88';
			strong.innerHTML = '[削除]';
			h3.appendChild(strong);
			h3.appendChild(document.createElement('br'));
		}
		nr_b.appendChild(h3);

		var vrmTbl = document.createElement('table');
		vrmTbl.style.fontSize = '12px';
		
		// html直書き
		vrmTbl.innerHTML = '<tr><td>再生：</td><td align="right"><strong>' + rObj.view +
		                   '</strong></td><td> → </td><td align="right"><strong>' + ((rObj.view_now) ? rObj.view_now : ' × ') +
		                   '</strong></td></tr>' +
		                   '<tr><td>コメント：</td><td align="right"><strong>' + rObj.res +
		                   '</strong></td><td> → </td><td align="right"><strong>' + ((rObj.res_now) ? rObj.res_now : ' × ') +
		                   '</strong></td></tr>' +
		                   '<tr><td><a href="openlist/' + rObj.vid + '">マイリスト</a>：</td><td align="right"><strong>' + rObj.mylist +
		                   '</strong></td><td> → </td><td align="right"><strong>' + ((rObj.mylist_now) ? rObj.mylist_now : ' × ') +
		                   '</strong></td></tr>';
		nr_b.appendChild(vrmTbl);
		
		var graph = document.createElement('p');
		graph.style.fontSize = '12px';
		graph.style.textAlign = 'right';
		graph.innerHTML = '<a href="' + currentURL.replace(/\/ranking\//, '/ranking_graph/') + rObj.vid + '">【ランキング推移】</a>';
		nr_b.appendChild(graph);
		
		nr_frm.appendChild(nr_b);
		
		
		if(rank == 1) r1td.appendChild(nr_frm);
		else if(rank == 2) r2td.appendChild(nr_frm);
		else if(rank == 3) r3td.appendChild(nr_frm);
		rankObjs[rank-1] = rObj;
	}
	
	
	function NR_getNowInfo(rObj, rank) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.nicovideo.jp/api/getthumbinfo/' + rObj.vid,
			headers: { 'User-Agent': 'Mozilla/5.0 Greasemonkey (A year ago NicoRanking)' },
			onload: function(res){
				if(/<nicovideo_thumb_response status="ok">/.test(res.responseText)) {
					res.responseText.match(/<view_counter>(\d+)<\/view_counter>/);
					rObj.view_now = NR_comma(RegExp.$1);
					res.responseText.match(/<comment_num>(\d+)<\/comment_num>/);
					rObj.res_now = NR_comma(RegExp.$1);
					res.responseText.match(/<mylist_counter>(\d+)<\/mylist_counter>/);
					rObj.mylist_now = NR_comma(RegExp.$1);
					
					rObj.del = 0;
				} else {
					rObj.del = 1;
				}
				
				NR_createRankCell(rObj, rank);
			},
			onerror: function(res){ GM_log(res.status + ":" + res.statusText); }
		});
	}

	function NR_rankinfo_parser2(html, rank) {
		var rankObj = {};
		html = html.replace(/[\r\n]/g, '');

		if (html.match(new RegExp('id="item' + rank + '"(.+?)</table>'))) {
			var target_html = RegExp.$1;
			
			target_html.match(/<h3>.+?href="watch\/(.+?)"[^>]*>([^<]+)/);
			rankObj.vid   = RegExp.$1;
			rankObj.title = RegExp.$2;
			
			target_html.match(/<img[^>]+title="(.+?)"/);
			rankObj.thumb = RegExp.$1;
			
			target_html.match(/class="vinfo_length"><span>(.+?)</);
			rankObj.vlen = RegExp.$1;
			
			target_html.match(/class="font12">.+?<span.+?>(.+?)</);
			rankObj.point = RegExp.$1;
			
			target_html.match(/strong style.+?>(.+?)</);
			rankObj.release = RegExp.$1;
			
			target_html.match(/再生\s+<strong>(.+?)</);
			rankObj.view = RegExp.$1;
			
			target_html.match(/コメ\s+<strong>(.+?)</);
			rankObj.res = RegExp.$1;
			
			target_html.match(/マイ\s+<a.+?><strong>(.+?)</);
			rankObj.mylist = RegExp.$1;
		}
		return rankObj;
	}
	
	
	// 参考：http://logic.stepserver.jp/data/archives/440.html
	function NR_comma(num) {
		return num.replace(/([0-9]+?)(?=(?:[0-9]{3})+$)/g, '$1,');
	}

	function NR_getCategory(u) {
		if(/ranking\/(.+)\/daily\/(.+)\/$/.test(u)) {
			var cat1 = RegExp.$1;
			var cat2 = RegExp.$2;
			if(cat1 == 'mylist')    cat1 = 'マイリスト';
			else if(cat1 == 'res')  cat1 = 'コメント';
			else if(cat1 == 'view') cat1 = '再生';
			else if(cat1 == 'fav')  cat1 = '総合';

			// category2
			if(cat2 == 'all')             cat2 = 'カテゴリ合算';

			else if(cat2 == 'g_ent')      cat2 = 'エンタ・音楽・スポ';
			else if(cat2 == 'ent')        cat2 = 'エンターテイメント';
			else if(cat2 == 'music')      cat2 = '音楽';
			else if(cat2 == 'sport')      cat2 = 'スポーツ';

			else if(cat2 == 'g_life')     cat2 = '教養・生活';
			else if(cat2 == 'animal')     cat2 = '動物';
			else if(cat2 == 'fashion')    cat2 = 'ファッション';
			else if(cat2 == 'cooking')    cat2 = '料理';
			else if(cat2 == 'diary')      cat2 = '日記';
			else if(cat2 == 'nature')     cat2 = '自然';
			else if(cat2 == 'science')    cat2 = '科学';
			else if(cat2 == 'history')    cat2 = '歴史';
			else if(cat2 == 'radio')      cat2 = 'ラジオ';
			else if(cat2 == 'lecture')    cat2 = 'ニコニコ動画講座';

			else if(cat2 == 'g_politics') cat2 = '政治';
			//else if(cat2 == 'politics') cat2 = '政治';

			else if(cat2 == 'g_try')      cat2 = 'やってみた';
			else if(cat2 == 'sing')       cat2 = '歌ってみた';
			else if(cat2 == 'play')       cat2 = '演奏してみた';
			else if(cat2 == 'dance')      cat2 = '踊ってみた';
			else if(cat2 == 'draw')       cat2 = '描いてみた';
			else if(cat2 == 'tech')       cat2 = 'ニコニコ技術部';

			else if(cat2 == 'g_culture')  cat2 = 'アニメ・ゲーム';
			else if(cat2 == 'anime')      cat2 = 'アニメ';
			else if(cat2 == 'game')       cat2 = 'ゲーム';

			else if(cat2 == 'g_popular')  cat2 = 'アイマス・東方・ボカロ';
			else if(cat2 == 'imas')       cat2 = 'アイドルマスター';
			else if(cat2 == 'toho')       cat2 = '東方';
			else if(cat2 == 'vocaloid')   cat2 = 'VOCALOID';
			else if(cat2 == 'other')      cat2 = 'その他';

			else if(cat2 == 'g_r18')      cat2 = 'R-18';
			//else if(cat2 == 'r18')      cat2 = 'R-18';
			
			return cat2 + ' デイリー ' + cat1;
		}
	}
	
})();
