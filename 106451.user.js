// ==UserScript==
// @name           SteamHelper
// @version        0.8
// @author         <ishio2009@gmail.com>
// @description    View owned game, language, unofficial language mod at Steam
// @include        http://store.steampowered.com/*
// @namespace      http://sites.google.com/site/gamelocalize/
// @supportURL     http://userscripts.org/scripts/show/106451
// @updateURL      https://userscripts.org/scripts/source/106451.user.js
// ==/UserScript==

/*
Changelog:
0.8: support profile ID number
0.7: support Chrome, Safari with NinjaKit
0.6: add lowest price, add Scriptish @tag
0.5: change autologin & agecheck method
0.4: autologin & agecheck
0.3: search
0.2: fix PACK calicurate bug
0.1: 1st release
*/

(function(){
	function modify_cookie(diff) {
		var dt = new Date();
		dt.setDate(dt.getDate()+diff);
		var cookies = document.cookie.split('; ');
		for(var i=0;i<cookies.length;++i) {
			var pair = cookies[i].split('=');
			switch(pair[0]) {
			case 'steamLogin':
			case 'birthtime':
				document.cookie = cookies[i] + '; expires=' + dt.toUTCString() + '; path=/';
			}
		}
	}

	modify_cookie(+30);

	var config; 
	var tmp = GM_getValue('config');
	if (tmp) config = JSON.parse(tmp); else config = { userid:'',bgcolor:'#5C7836' };
	var lang = '日本語',lang2 = "非公式日本語";
	// FIXME; get list from net
	var haslang = [220,240,280,380,400,420,440,500,550,620,2400,2420,4300,6510,7200,11020,12200,13000,15700,18700,19680,22650,22670,23300,23310,23380,26000,26005,26006,26007,26800,27800,27810,29540,29560,29570,29580,29700,35600,37800,39110,39190,39200,39670,39800,41730,43000,45760,47870,50400,50411,50413,50414,50415,50416,57200,63200,70400,91920,92000,900769];
	var rgGames = {},localized = {};

// 言語は　popup_body popup_menu shadow_content

	function has_app(appid) { return rgGames[appid]; }

	var config_dialog = null;

	function clearconfig()
	{
	}

	function setting() {
		if (config_dialog) {
			config.dialog.style.display = 'block';
			return;
		}
		var elem = document.createElement('div');
		elem.id = 'steamhelper_config';
		elem.innerHTML = '<h3>SteamHelper Setting　　　　　　　<input type=button value="×" onclick="this.parentNode.parentNode.style.display=\'none\';"></h3><p>SteamCommunity ID: <input type=text id="steamhelper_userid"><input type=button value="Set"><br/><input type=button value="Reset loginID &amp; birthday"></p>';
		elem.setAttribute('style',"position: fixed; z-index: 9999; top:45%; left:45%; background-color: grey; border: 5px solid darkgrey;");
		document.body.appendChild(elem);
		var input = document.getElementById('steamhelper_userid');
		input.value = config.userid;
		input.nextSibling.addEventListener('click',function(event){
			GM_setValue('userid',config.userid = input.value);
			config_dialog.style.display = 'none';
			get_mygamelist();
		},false);
		input.nextSibling.nextSibling.nextSibling.addEventListener('click',function(event){
			GM_deleteValue('config');
			modify_cookie(-1);
			config_dialog.style.display = 'none';
		},false);
		config_dialog = elem;
	}
	GM_registerMenuCommand('SteamHelper Setting',setting);
	config.userid = GM_getValue('userid');
	if (!config.userid) {
		config.userid='';
		setting();
	}

	function startWith(str,prefix) { return str.lastIndexOf(prefix, 0) === 0; }

	// localized game list
	var tmp;
	tmp = sessionStorage.getItem('localized');
	if (tmp) {
		localized = JSON.parse(tmp);
	} else
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://spreadsheets.google.com/spreadsheet/pub?hl=ja&hl=ja&key=0AiAtt-u9ddI8dF8wYVFwamxzWWl0VHF1Nm5RdU5fRGc&output=txt',
		onload: function(resp) {
			GM_log('localize list loaded');
			localized = {};
			var lines = resp.responseText.split("\n");
			for(var i=1,length=lines.length;i<length;++i) {
				var r = lines[i].split("\t");
				localized[r[0]] = r[2];
			}
			for(var i=0,length=haslang.length;i<length;++i) {
				localized[haslang[i]] = 1;
			}
			sessionStorage.setItem('localized',JSON.stringify(localized));
		}
	});

	function get_mygamelist() {
	if (config.userid)
	GM_xmlhttpRequest({
		method: 'GET',
		url: config.userid.match(/^\d+$/)?
			'http://steamcommunity.com/profiles/'+config.userid+'/games?tab=all':
			'http://steamcommunity.com/id/'+config.userid+'/games?tab=all',
		onload: function(resp) {
			GM_log('game list loaded');
			rgGames = {};
			var m = resp.responseText.match(/(rgGames\[[\S\s]+?)<\/script>/);
			eval(RegExp.$1);
			//GM_log(rgGames.toSource());
			sessionStorage.setItem('rgGames',JSON.stringify(rgGames));
			change();
		}
	});
	}

	tmp = sessionStorage.getItem('rgGames');
	if (tmp) {
		//GM_log(rgGames);
		rgGames = JSON.parse(tmp);
		change();
	} else {
		get_mygamelist();
	}

	// my game list
	var pathelem = location.pathname.substr(1).split('/');
	switch(pathelem[0]) {
/*
	case 'agecheck':
		var form = document.forms[1];
		if (!form) break;
		if (config.ageDay) {
			form.elements.ageDay.value = config.ageDay;
			form.elements.ageMonth.value = config.ageMonth;
			form.elements.ageYear.value = config.ageYear;
			form.submit();
		} else {
			var e = getelem(form,'a','btn_checkout_green');
			e.addEventListener('click',function() {
				config.ageDay   = form.elements.ageDay.value;
				config.ageMonth = form.elements.ageMonth.value;
				config.ageYear  = form.elements.ageYear.value;
				GM_setValue('config',JSON.stringify(config));
			},false);
		}
		break;
	case 'login':
		var form = document.forms[1];
		var e = getelem(document,'a','btn_checkout_green');
//		if (config.username && document.getElementById('captcha_entry').display=='none') {
		if (config.username) {
			form.elements.username.value = config.username;
			form.elements.password.value = config.password;
			unsafeWindow.DoLogin();
		} else {
			e.addEventListener('click',function() {
				config.username = form.elements.username.value;
				config.password = form.elements.password.value;
				GM_setValue('config',JSON.stringify(config));
			},false);
		}
		break;
*/
	case 'app':
		apppage(pathelem[1]);
		break;
	}

	function previousElement(e)
	{
		do {
			e = e.previousSibling;
		} while(e && e.nodeType!=1);
		return e;
	}
	function nextElement(e)
	{
		do {
			e = e.nextSibling;
		} while(e && e.nodeType!=1);
		return e;
	}

	function apppage(appid) {
		var msg = langmsg(appid);
		var e;
		e = getelem(document,'div','game_icon');
		var title =  e.nextSibling.nodeValue;
		title = trim(title).replace(/™|®/,'');
		e = getelem(document,'div','glance_details').getElementsByTagName('div')[1];
		if (msg) e.appendChild(msg);
		e.appendChild(makelink('http://www.google.com/search?q=' + escape(title),' Search'))
		
		if (has_app(appid)) {
			e = getelem(document,'div','game_area_purchase_game');
			e.style.backgroundColor = config.bgcolor;
		}
		// lowest price from http://www.steamgamesales.com/view-history.php?id=
		// prosteamer.jp
		var url = 'http://prosteamer.jp/app/'+appid;
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function(resp) {
				//\$([\d\.]+)\r\n
				var m = resp.responseText.match(/(\$[\d\.]+)\s+最安値/);
				if (!m) m = resp.responseText.match(/秒\s+(\$[\d\.]+)/);
				if (m) {
					GM_log(m);
					var elem = getelem(document,'div','btn_addtocart');
					GM_log(previousElement(elem).class);
					var div = document.createElement('div');
					div.className = "game_purchase_price price";
					div.innerHTML = 'lowest:<a href="'+url+'" target="_blank">' + m[1] + '</a>';
					elem.parentNode.insertBefore(div,previousElement(elem));
				}
			}
		});
	}

	function trim(t) {
		return t.replace(/^\s+/,'').replace(/\s+$/,'');
	}
	
	function makelink(url,txt) {
		var newNode = document.createElement('a');
		newNode.href = url;
		newNode.target = '_blank';
		newNode.innerHTML = txt;
		return newNode;
	}
	
	function langmsg(appid) {
		var url = localized[appid];
		if (!url) return false;
		if (url==1) return document.createTextNode(lang);
		return makelink(url,lang2);
	}
/*
	 if (!document.getElementById('account_pulldown')) {
		GM_setValue('prevPage', location.href);
		location.href = 'http://store.steampowered.com/login/';
	 }
*/
/*
*/
/*
for opera
function GM_xmlhttpRequest(options) {
	var req = new opera.XMLHttpRequest();
	try {
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				if (req.status == 200) {
					if (options.onload) options.onload(req);
				}
			}
		}
		req.open(options.method || "GET", options.url, true);
		if (options.headers) {
			for (key in options.headers) {
				req.setRequestHeader(key, options.headers[key]);
			}
		}
		req.send(null);
	} catch (e) {
		if (options.onerror) options.onerror(req, e);
	}
}
*/

	/* container,url,options */
if (unsafeWindow.Ajax) {
	var origUpdater = unsafeWindow.Ajax.Updater;
	unsafeWindow.Ajax.Updater = function() { 
		var options = arguments[2];
		var onComplete = options.onComplete;
		options.onComplete = function() { if (onComplete) onComplete(); change(); };
		this.initialize.apply(this,arguments);
	};
	unsafeWindow.Ajax.Updater.prototype = origUpdater.prototype;
	//function($super, container, url, options)
	//GM_log(unsafeWindow.Ajax.Updater.prototype.initialize.toSource());
//	GM_log(unsafeWindow.TabCompletionClosure);
}
	function xpath_each(xpath,callback) {
		var res = document.evaluate(xpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		var node;
		for(var i=0;i<res.snapshotLength;++i) {
		//while(node=res.iterateNext()) {
			node = res.snapshotItem(i);
			callback(node);
		}
	}
	
	function getelem(node,tag,className) {
		var ary = node.getElementsByTagName(tag);
		for(var i=0,length=ary.length;i<length;i++) {
			var e = ary[i];
			if (e.className == className) return e;
		}
		return null;
	}
	
	function change() {
		GM_log('change');
		var bgcolor = config.bgcolor;
		function get_appid(t) {
			if (t && t.match(/^http:\/\/store\.steampowered\.com\/app\/(\d+)\//)) return RegExp.$1;
			else return null;
		}

		function add_info(node,appid) {
			var elem = langmsg(appid);
			if (!elem) return;
			var t = getelem(node,'img','platform_img');
			if (t) t.parentNode.appendChild(elem);
		}

		//sale or sub
		var not_have = 0;
		var sub = startWith(location.pathname,'/sub/');
		var checked = false;
		xpath_each("//div[contains(@class,'tab_row') or contains(@class,'sale_page_purchase_item')]",function(node){
			if (node.checked) return;
			node.checked = checked = true;
			var price;
			if (sub) {
				var e = getelem(node,'div','tab_price').lastChild;
				var m = e.nodeValue.match(/[0-9\.]+/);
				price = m?parseFloat(m[0]):0;
			}
			
			//var res = document.evaluate("//img[@class='platform_img']",node,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
			//var t = res.singleNodeValue;
			var ret = node.getElementsByTagName('a');
			var appid;
			if (appid = get_appid(ret[0].href)) {
				add_info(node,appid);
				if (has_app(appid)) node.style.backgroundColor = bgcolor;
				else not_have += price;
			}

		});
		if (sub && checked) {
			xpath_each("//div[@class='package_totals_row total']",function(node) {
				var m = getelem(node,'div','price').innerHTML.match(/^([^\d]+)[\d\.]+(.+)$/);
				var e = document.createElement('div');
				e.className = 'package_totals_row';
				e.innerHTML = '<div class="price">' + m[1] + not_have.toFixed(2) + m[2] + '</div>not have:';
				node.parentNode.insertBefore(e,node);
			});
		}

		// search result
		xpath_each("//a[contains(@class,'search_result_row')]",function(node){
			var appid;
			if (appid = get_appid(node.href)) {
				add_info(node,appid);
				if (has_app(appid)) node.style.backgroundColor = bgcolor;
			}
		});

	}



})();
