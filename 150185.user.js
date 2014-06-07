// ==UserScript==
// @name         bro3_HAIKA_TUIHOU
// @namespace    http://359.blog-sim.com/
// @description  編入申請の書簡に追放ボタンを付けるスクリプト
// @include      http://*.3gokushi.jp/*
// ==/UserScript==

(function() {
	var SESSION_ID = '';
	var DOUMEI_INFO = {};
	Fget_session_id();
	chk();

	function chk() {
		if (location.pathname == "/message/inbox.php") {
			chkMailBoXName();
		}
	}
	function Fget_session_id() {
		var txt = document.cookie;
		if (txt.match(/SSID=([a-z0-9]+)/)) {
			SESSION_ID = RegExp.$1;
		}
	}
	function chkMailBoXName() {
		var obj = document.getElementsByClassName('fs77');
		var len = obj.length;
		for (var i = 0; i < len; i++) {
			var tr = obj[i].parentNode;
			var as  = tr.getElementsByTagName('a');
			var tds = tr.getElementsByTagName('td');

			if (as[0].innerHTML.match(/^【編入希望】/)) {
				as[1].href.match(/user_id=([0-9]+)/);
				var user_id = RegExp.$1;
				var s1 = document.createElement("input");
				s1.style.cssFloat = 'right';
				s1.setAttribute('type', 'button');
				s1.setAttribute('value', '追放する');
				s1.setAttribute('name', user_id);
				s1.addEventListener("click", kaiho);
				tds[1].appendChild(s1);
			}
		}
	}

	function kaiho() {
		DOUMEI_INFO['user_id'] = this.getAttribute('name');
		kaiho_1_start();
	}

	function kaiho_1_start() {
		ajaxRequest('/alliance/level.php', "GET", null, kaiho_2_hennyu, errResponse);
	}

	function kaiho_2_hennyu(r) {
		var txt = r.responseText;
		txt.match(/現在の同盟人数[^\1]*?<td class="contents">([0-9]+)/);
		DOUMEI_INFO['member'] = RegExp.$1;

		txt.match(/最大同盟人数[^\1]*?<td class="contents">([0-9]+)/);
		DOUMEI_INFO['member_max'] = RegExp.$1;

		txt.match(/info\.php\?id\=([0-9]+)/);
		DOUMEI_INFO['id'] = RegExp.$1;

		var param =   'id=' + DOUMEI_INFO['id']
					+ '&mode=transfer'
					+ '&ssid=' + SESSION_ID
					+ '&member=' + DOUMEI_INFO['member']
					+ '&member_max=' + DOUMEI_INFO['member_max']
					+ '&offer_num=0'
					+ '&target_user=' + DOUMEI_INFO['user_id'];
		ajaxRequest("/alliance/info.php", "POST", param, kaiho_3_kaiho, errResponse);
	}

	function kaiho_3_kaiho() {
		var param = 'select_user=' + DOUMEI_INFO['user_id'] + '&ssid=' + SESSION_ID;
		var url = '/alliance/banish_member.php?res=ok';
		ajaxRequest(url, "POST", param, kaiho_4_end, errResponse);
	}

	function kaiho_4_end() {
		alert("解放しました");
	}

	function errResponse() {
		alert("ajaxError");
	}

	//ajaxでの取得。beyondから拝借。
	function ajaxRequest(url, method, param, func_success, func_fail){
	    var req = new XMLHttpRequest();
	    req.onreadystatechange = function() {
	        if (req.readyState == 4 && req.status == 200){
	            func_success(req);
	        }
	        else if (req.readyState == 4 && req.status != 200){
	            func_fail(req);
	        }
	    };
	    req.open(method, url, true);
	    if (method == 'POST'){
	        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    }
	    req.send(param);
	}

	function txt2document(str) {
		if (document.documentElement.nodeName != 'HTML') {
			return new DOMParser().parseFromString(str, 'application/xhtml+xml');
		}

		var html = strip_html_tag(str);
		var htmlDoc;
		try {
			htmlDoc = document.cloneNode(false);
			htmlDoc.appendChild(htmlDoc.importNode(document.documentElement, false));
		} catch(e) {
			htmlDoc = document.implementation.createDocument(null, 'html', null);
		}

		var fragment = createDocumentFragmentByString(html);

		try {
			fragment = htmlDoc.adoptNode(fragment);
		} catch(e) {
			fragment = htmlDoc.importNode(fragment, true);
		}

		htmlDoc.documentElement.appendChild(fragment);

		return htmlDoc;
	}

	function strip_html_tag(str) {
		var chunks = str.split(/(<html(?:[ \t\r\n][^>]*)?>)/);

		if (chunks.length >= 3) {
			chunks.splice(0, 2);
		}
		str = chunks.join('');

		chunks = str.split(/(<\/html[ \t\r\n]*>)/);
		if (chunks.length >= 3) {
		  chunks.splice(chunks.length - 2);
		}
		return chunks.join('');
	}
	function createDocumentFragmentByString(str) {
		var range = document.createRange();
		range.setStartAfter(document.body);
		return range.createContextualFragment(str);
	}
})();