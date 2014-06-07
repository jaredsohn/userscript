// ==UserScript==
// @name           SteamHelper-Lite
// @version        0.1
// @author         <ishio2009@gmail.com>
// @description    View owned game, language
// @include        http://store.steampowered.com/*
// @namespace      http://sites.google.com/site/gamelocalize/
// @supportURL     http://userscripts.org/scripts/show/138690
// @updateURL      https://userscripts.org/scripts/source/138690.user.js
// ==/UserScript==

(function(){
	function setValue(key,value) {
		sessionStorage.setItem(key,JSON.stringify(value));
	}
	function getValue(key) {
		var v = sessionStorage.getItem(key);
		if (v===undefined) return v;
		return JSON.parse(v);
	}

	var config = { userid:'',bgcolor:'#5C7836' };

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

	function logined() {
		return document.getElementById('account_pulldown')!==null;
	}
	console.log(logined());
	if (!logined()) return;

	var pathelem = location.pathname.substr(1).split('/');
	switch(pathelem[0]) {
	case 'app':
		apppage(pathelem[1]);
		break;
	}

	function apppage(appid) {
		var msg;
		var e = getelem(document,'div','game_icon');
		var title =  e.nextSibling.nodeValue;
		title = trim(title).replace(/™|®/,'');
		e = getelem(document,'div','glance_details').getElementsByTagName('div')[1];
		if (msg) e.appendChild(msg);
		e.appendChild(makelink('http://www.google.com/search?q=' + escape(title),' Search'))
	}

	function startWith(str,prefix) { return str.lastIndexOf(prefix, 0) === 0; }

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

	function get_http(url,callback) {
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if (this.readyState==4 && this.status==200) {
				callback(this.responseText);
			}
		}
		http.open('GET',url,true);
		http.send(null);
	}
	
	function get_appinfo(appid)
	{
	}

//	get_appinfo('48000');
//	get_appinfo('98100');

	function change() {
		console.log('change');
		var bgcolor = config.bgcolor;
		function get_appid(t) {
			if (t && t.match(/^http:\/\/store\.steampowered\.com\/app\/(\d+)\//)) return RegExp.$1;
			else return null;
		}

		function add_info2(node,has_app,has_lang) {
			if (has_app) node.style.backgroundColor = config.bgcolor;
			if (has_lang) {
				var elem = document.createTextNode('日本語');
				var t = getelem(node,'img','platform_img');
				if (t) t.parentNode.appendChild(elem);
			}
		}

		function add_info(node,appid) {
			var v = getValue(appid);
			if (v) {
				add_info2(node,v[0],v[1]);
				return;
			}
			console.log("get:"+appid);
			get_http('/app/'+appid+'/',function(txt) {
				var has_app = txt.search(/<div class="game_area_already_owned">/)>0;
				var has_lang = txt.search(/<b>言語:<\/b>[^\/]*日本語[^\/]*</)>0;
				setValue(appid,[has_app,has_lang]);
				add_info2(node,has_app,has_lang);
				console.log(has_app+':'+has_lang);
			});
/*
			var elem = langmsg(appid);
			if (!elem) return;
			var t = getelem(node,'img','platform_img');
			if (t) t.parentNode.appendChild(elem);
*/
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
			//	if (has_app(appid)) node.style.backgroundColor = bgcolor;
			//	else not_have += price;
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
		xpath_each("//a[contains(@class,'search_result_row') or contains(@class,'game_area_dlc_row')]",function(node){
			var appid;
			if (appid = get_appid(node.href)) {
				add_info(node,appid);
			}
		});

	}
	change();

})();
