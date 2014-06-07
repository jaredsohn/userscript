// ==UserScript==
// @name           Nico Filter
// @author         favril
// @namespace      http://script41self.seesaa.net/
// @description    設定されているフィルタを表示するスクリプト
// @version        0.1.6
// @include        http://www.nicovideo.jp/watch/*
// @require        http://script41self.up.seesaa.net/user_js/nicoapiresult.js
// ==/UserScript==

(function(){
	var filter_field = document.createElement('div');
	filter_field.style.marginBottom = '20px';
	filter_field.style.marginTop    = '10px';
	var tbl = document.createElement('table');
	tbl.setAttribute('width', '100%');
	tbl.setAttribute('cellspacing', 4);
	tbl.setAttribute('cellpadding', 0);
	tbl.setAttribute('border', 0);
	filter_field.appendChild(tbl);
	var tbody = document.createElement('tbody');
	tbl.appendChild(tbody);
	var row = document.createElement('tr');
	tbody.appendChild(row);
	
	var cell = document.createElement('td');
	cell.innerHTML = '<strong>フィルタ: </strong>Loading...';
	row.appendChild(cell);
	
	var footer = document.getElementById('WATCHFOOTER');
	var inpos = footer.getElementsByTagName('p')[0].nextSibling;
	footer.insertBefore(filter_field, inpos);
	
	var result = new NicoApiResult();
	result.ready(function(){
		var filters = parseFilters();

		// loading終了
		cell.innerHTML = '<strong>フィルタ: </strong>';
		
		if(filters){
			var main_tbl = document.createElement('div');
			main_tbl.style.display = 'none';
			main_tbl.style.marginLeft = 30 + 'px';
			var html = "";
			for(var key in filters) {
				
				html += '『 <strong>' + key + '</strong> 』 ⇒ 『 <strong>' + filters[key] + '</strong> 』<br />';
				
				/*
				var a = document.createElement('a');
				a.href = 'javascript:void(0);';
				a.innerHTML = key;
				a.addEventListener('click', function() {
					player.chat(this.innerHTML);
				}, false);
				
				var span = document.createElement('span');
				span.innerHTML = ' ⇒ <strong>' + filters[key] + '</strong><br />';
				
				main_tbl.appendChild(a);
				main_tbl.appendChild(span);
				*/
			}
			main_tbl.innerHTML = html;
			
			var toggle = document.createElement('a');
			toggle.setAttribute('title', 'open');
			toggle.href = 'javascript:void(0);';
			toggle.innerHTML = '[フィルタを見る]';
			toggle.addEventListener('click',
				function(){
					if(main_tbl.style.display == 'none') {
						// open
						main_tbl.style.display = 'block';
						toggle.innerHTML = '[フィルタを隠す]';
						toggle.setAttribute('title', 'close');
					} else {
						// close
						main_tbl.style.display = 'none';
						toggle.innerHTML = '[フィルタを見る]';
						toggle.setAttribute('title', 'open');
					}
				}, false);
			cell.appendChild(toggle);
			
			row = document.createElement('tr');
			tbody.appendChild(row);
			cell = document.createElement('td');
			cell.appendChild(main_tbl);
			row.appendChild(cell);
			
		} else {
			var span = document.createElement('span');
			span.setAttribute('class', 'TXT12');
			span.innerHTML = 'この動画にフィルタは設定されていません。';
			
			cell.appendChild(span);
		}
	});
	
	function parseFilters() {
		if(!window.GM_NicoApiResult.ng_up) return;
		
		var str = decodeURIComponent(window.GM_NicoApiResult.ng_up);
		var pairs = str.split('&');
		var ret = {};
		for(var i=0,len=pairs.length; i<len; i++) {
			var pair = pairs[i].split('=');
			ret[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
		}
		return ret;
	}
})();