// ==UserScript==
// @name        [Beta]知道贴请走开
// @include     http://tieba.baidu.com/f*
// @version     0.0.0.4
// @description 在帖子列表页将知道贴标出/移动到最下方/删除（需要吧务权限），兼容新旧版贴吧，无需TamperMonkey，鸣谢百度贴吧@864907600cc & @h573980998
// @run-at      document-end
// @author      8qwe24657913
// @icon	    http://tb.himg.baidu.com/sys/portrait/item/50813871776532343635373931338412
// @updateURL   http://userscripts.org/scripts/source/412779.meta.js
// @downloadURL http://userscripts.org/scripts/source/412779.user.js
// @grant       none
// ==/UserScript==

function main(isNewFrs, u) {
	/*========================设置============================*/
	var hight_bool = false, //添加"知道"标签
		move = true, //移动到最下方，若此选项与上一个均未开启，帖子将被隐藏
		deleteThem = true, //删除知道贴（需要吧务权限），已被删除的帖子标题将会添加删除线
		max_thread_types = 10000000; //设置检测参数最大值
	/*========================设置============================*/

	//MD5加密函数 取自网络孤独行客的脚本 from tiebaAllsign
	var hex_md5 = (function(g,k){function l(a){return n(m(o(a)))};function m(a){return h(j(p(a),a.length*8))};function n(e){try{}catch(a){g=0};var b=g?'0123456789ABCDEF':'0123456789abcdef';var c='';var d;for(var a=0;a<e.length;a++)d=e.charCodeAt(a),c+=b.charAt(d>>>4&15)+b.charAt(d&15);return c};function o(d){var b='';var c=-1;var a,e;while(++c<d.length)a=d.charCodeAt(c),e=c+1<d.length?d.charCodeAt(c+1):0,55296<=a&&a<=56319&&56320<=e&&e<=57343&&(a=65536+((a&1023)<<10)+(e&1023),c++),a<=127?b+=String.fromCharCode(a):a<=2047?b+=String.fromCharCode(192|a>>>6&31,128|a&63):a<=65535?b+=String.fromCharCode(224|a>>>12&15,128|a>>>6&63,128|a&63):a<=2097151&&(b+=String.fromCharCode(240|a>>>18&7,128|a>>>12&63,128|a>>>6&63,128|a&63));return b};function p(c){var b=Array(c.length>>2);for(var a=0;a<b.length;a++)b[a]=0;for(var a=0;a<c.length*8;a+=8)b[a>>5]|=(c.charCodeAt(a/8)&255)<<a%32;return b};function h(c){var b='';for(var a=0;a<c.length*32;a+=8)b+=String.fromCharCode(c[a>>5]>>>a%32&255);return b};function j(j,l){j[l>>5]|=128<<l%32,j[(l+64>>>9<<4)+14]=l;var g=1732584193;var h=-271733879;var i=-1732584194;var f=271733878;for(var k=0;k<j.length;k+=16){var n=g;var o=h;var p=i;var m=f;g=a(g,h,i,f,j[k+0],7,-680876936),f=a(f,g,h,i,j[k+1],12,-389564586),i=a(i,f,g,h,j[k+2],17,606105819),h=a(h,i,f,g,j[k+3],22,-1044525330),g=a(g,h,i,f,j[k+4],7,-176418897),f=a(f,g,h,i,j[k+5],12,1200080426),i=a(i,f,g,h,j[k+6],17,-1473231341),h=a(h,i,f,g,j[k+7],22,-45705983),g=a(g,h,i,f,j[k+8],7,1770035416),f=a(f,g,h,i,j[k+9],12,-1958414417),i=a(i,f,g,h,j[k+10],17,-42063),h=a(h,i,f,g,j[k+11],22,-1990404162),g=a(g,h,i,f,j[k+12],7,1804603682),f=a(f,g,h,i,j[k+13],12,-40341101),i=a(i,f,g,h,j[k+14],17,-1502002290),h=a(h,i,f,g,j[k+15],22,1236535329),g=b(g,h,i,f,j[k+1],5,-165796510),f=b(f,g,h,i,j[k+6],9,-1069501632),i=b(i,f,g,h,j[k+11],14,643717713),h=b(h,i,f,g,j[k+0],20,-373897302),g=b(g,h,i,f,j[k+5],5,-701558691),f=b(f,g,h,i,j[k+10],9,38016083),i=b(i,f,g,h,j[k+15],14,-660478335),h=b(h,i,f,g,j[k+4],20,-405537848),g=b(g,h,i,f,j[k+9],5,568446438),f=b(f,g,h,i,j[k+14],9,-1019803690),i=b(i,f,g,h,j[k+3],14,-187363961),h=b(h,i,f,g,j[k+8],20,1163531501),g=b(g,h,i,f,j[k+13],5,-1444681467),f=b(f,g,h,i,j[k+2],9,-51403784),i=b(i,f,g,h,j[k+7],14,1735328473),h=b(h,i,f,g,j[k+12],20,-1926607734),g=c(g,h,i,f,j[k+5],4,-378558),f=c(f,g,h,i,j[k+8],11,-2022574463),i=c(i,f,g,h,j[k+11],16,1839030562),h=c(h,i,f,g,j[k+14],23,-35309556),g=c(g,h,i,f,j[k+1],4,-1530992060),f=c(f,g,h,i,j[k+4],11,1272893353),i=c(i,f,g,h,j[k+7],16,-155497632),h=c(h,i,f,g,j[k+10],23,-1094730640),g=c(g,h,i,f,j[k+13],4,681279174),f=c(f,g,h,i,j[k+0],11,-358537222),i=c(i,f,g,h,j[k+3],16,-722521979),h=c(h,i,f,g,j[k+6],23,76029189),g=c(g,h,i,f,j[k+9],4,-640364487),f=c(f,g,h,i,j[k+12],11,-421815835),i=c(i,f,g,h,j[k+15],16,530742520),h=c(h,i,f,g,j[k+2],23,-995338651),g=d(g,h,i,f,j[k+0],6,-198630844),f=d(f,g,h,i,j[k+7],10,1126891415),i=d(i,f,g,h,j[k+14],15,-1416354905),h=d(h,i,f,g,j[k+5],21,-57434055),g=d(g,h,i,f,j[k+12],6,1700485571),f=d(f,g,h,i,j[k+3],10,-1894986606),i=d(i,f,g,h,j[k+10],15,-1051523),h=d(h,i,f,g,j[k+1],21,-2054922799),g=d(g,h,i,f,j[k+8],6,1873313359),f=d(f,g,h,i,j[k+15],10,-30611744),i=d(i,f,g,h,j[k+6],15,-1560198380),h=d(h,i,f,g,j[k+13],21,1309151649),g=d(g,h,i,f,j[k+4],6,-145523070),f=d(f,g,h,i,j[k+11],10,-1120210379),i=d(i,f,g,h,j[k+2],15,718787259),h=d(h,i,f,g,j[k+9],21,-343485551),g=e(g,n),h=e(h,o),i=e(i,p),f=e(f,m)};return Array(g,h,i,f)};function f(a,b,c,d,f,g){return e(i(e(e(b,a),e(d,g)),f),c)};function a(b,a,c,d,e,g,h){return f(a&c|~a&d,b,a,e,g,h)};function b(c,a,d,b,e,g,h){return f(a&b|d&~b,c,a,e,g,h)};function c(b,a,c,d,e,g,h){return f(a^c^d,b,a,e,g,h)};function d(b,a,c,d,e,g,h){return f(c^(a|~d),b,a,e,g,h)};function e(b,c){var a=(b&65535)+(c&65535);var d=(b>>16)+(c>>16)+(a>>16);return d<<16|a&65535};function i(a,b){return a<<b|a>>>32-b};return g=0,k='',l}());	

	var kw = PageData.forum.forum_name, cache, count, tids, elems, canDelete, deleteThem = PageData.user.power.bawu && deleteThem;
	
	if (hight_bool) {
		//加载css
		var style = document.createElement('style');
		style.type = 'text/css';
		document.documentElement.appendChild(style).appendChild(document.createTextNode("#thread_list span.zhidao{background-color:#646464;color:#FFF;font-size:10px;padding:0px 5px;border-radius:11px}"));
	};

	var parseJSON = window.JSON ? JSON.parse : function (json) {
			return new Function('return ' + json)()
		};

	function getPostData(data) {
		return $.extend({
			_client_id: "04-00-DA-69-15-00-73-97-08-00-02-00-06-00-3C-43-01-00-34-F4-22-00-BC-35-19-01-5E-46",
			_client_type: '2',
			_client_version: "5.6.3",
			_phone_imei: "642b43b58d21b7a5814e1fd41b08e2a6",
			from: 'tieba'
		}, data);
	};
	//POST数据加密处理函数 取自网络孤独行客的脚本  from tiebaAllsign
	function decodeURI_post(postData) {
		var SIGN_KEY = "tiebaclient!!!";
		var s = "";
		for (var i in postData) {
			s += i + "=" + postData[i];
		}
		var sign = hex_md5(decodeURIComponent(s) + SIGN_KEY);
		var data = "";
		for (var i in postData) {
			data += "&" + i + "=" + postData[i];
		}
		data += "&sign=" + sign;
		return data.replace("&", "");
	};

	function getList(pn, rn) {
		count = 0, tids = [], elems = [];
		$.post('/c/f/frs/page', decodeURI_post(getPostData({
			kw: kw,
			pn: pn,
			q_type: 2,
			rn: rn,
			with_group: 1
		})), function (msg) {
			var lt = [];
			msg.thread_list.forEach(function (e) {
				e.thread_types > max_thread_types && !e.media[0] && "0" === e.thread_type && lt.push(e.id)
			});
			if (lt.length > 0) addSpan(lt);
		}, 'json')
	};

	var compressed, m;
	if (m = localStorage.huhu_zhidao) {
		m = m.split('|');
		compressed = [m[0] ? m[0].split(',') : [], m[1] ? m[1].split(',') : []];
	} else {
		compressed = [[], []];
	};
	m = {};
	compressed[0].forEach(function(e){m[parseInt(e,36)]=0});
	compressed[1].forEach(function(e){m[parseInt(e,36)]=1});

	function test17(id, e, token) {
		var b = m[id], p;
		if (u === b) {
			++count;
			$.post('/c/f/pb/page', decodeURI_post(getPostData({
				kz: id,
				pn: 1,
				q_type: 2,
				rn: 2,
				with_floor: 1
			})), function (msg) {
				if ("17" === msg.thread.thread_type) {
					m[id] = 1;
					compressed[1].push((id - 0).toString(36));
					tids.push(id);
					elems.push(e.querySelector('a[href^="/p/"]'));
					addSpan2(e, token);
				} else {
					m[id] = 0;
					compressed[0].push((id - 0).toString(36));
					doCount();
				};
				localStorage.huhu_zhidao = compressed.join('|');
			}, 'json').fail(doCount);
		} else if (b) {
			++count;
			addSpan2(e, token);
			tids.push(id);
			elems.push(e.querySelector('a[href^="/p/"]'));
		};
	};

	function addSpan(list) {
		var tid, list2 = [], token = Math.random();
		var thread_list = document.getElementById('thread_list');
		isNewFrs ? [].forEach.call(thread_list.getElementsByTagName('li'), function (e) {
			(tid = e.dataset.field) && (-1 === list.lastIndexOf(tid = "" + parseJSON(tid).id) || list2.push([tid, e]));
		}) : [].forEach.call(thread_list.getElementsByTagName('tr'), function (e) {
			(tid = e.getAttribute('tid')) && (-1 === list.lastIndexOf(tid) || list2.push([tid, e]));
		});
		list2.forEach(function (e) {
			test17(e[0], e[1], token)
		});
	};

	function doCount() {
		var alt;
		if (!(--count) && !isNewFrs && (move || !hight_bool)) [].forEach.call(document.getElementById('thread_list').getElementsByTagName('tbody')[0].getElementsByTagName('tr'), function (e) {
			(alt = !alt) ? e.removeAttribute('class') : e.setAttribute('class', 'thread_alt');
		});
		if (!deleteThem || count > 0 || !tids.length || false === canDelete) return;
		if (u === canDelete) {
			$.get('/home/get/panel?ie=utf-8&un=' + encodeURIComponent(PageData.user.name), function (res) {
				alt = res.data.honor.manager;
				(canDelete = alt.assist && -1 !== alt.assist.forum_list.lastIndexOf(kw) || alt.manager && -1 !== alt.manager.forum_list.lastIndexOf(kw)) && del();
			}, 'json');
		} else del();
	};

	function del() {
		var ele = elems;
		$.post('/f/commit/thread/batchDelete', {
			fid: PageData.forum.id,
			ie: 'utf-8',
			isBan: 0,
			kw: kw,
			tbs: PageData.tbs,
			tid: tids.join('_')
		}, function (res) {
			0 === res.no && ele.forEach(function (e) {
				e.style.cssText += "text-decoration:line-through!important";
			});
		}, 'json');
		tids = [], elems = [];
	};

	function addSpan2(e, token) {
		if (move) {
			if (cache !== token) {
				cache = token;
				e.parentElement.insertAdjacentHTML('beforeEnd', isNewFrs ? '<li><div style="text-align:center;font-size:18px;color:goldenrod;text-shadow:0 0 10px royalblue;font-weight:bold">------以下来自百度知道自动爆吧系统------</div></li>' : '<tr tid="zhidao"><td></td><td></td><td style="text-align:center;font-size:18px;color:goldenrod;text-shadow:0 0 10px royalblue;font-weight:bold">------以下来自百度知道自动爆吧系统------</td><td></td><td></td></tr>');
			};
			e.parentElement.appendChild(e);
		};
		if (hight_bool) e.querySelector('a[href^="/p/"]').insertAdjacentHTML('beforeBegin', '<span class="zhidao">知道</span>');
		if (!move && !hight_bool) e.remove();
		doCount();
	};

	function hook_ajax() {
		var hook_ajax = $.ajax;
		$.ajax = function (e, n) {
			if (!e.type || e.type.toLowerCase() !== 'get' || !/\/f\?(?:t\=\d+&)?kw\=/.test(e.url + '&' + e.data)) return hook_ajax(e, n);
			var _es = e.success,
				pn = (e.url + '&' + e.data).match(/&pn=(\w+)/)[1] / 50 + 1;
			e.success = function (t) {
				_es(t);
				getList(pn, 50)
			}
			return hook_ajax(e, n);
		}
	};
	(function addDate() {
		hook_ajax();
		getList(document.getElementsByClassName('cur')[0].innerHTML, 50);
	})();
};
if (!(thread_list = document.getElementById('thread_list'))) return;
//加载脚本
var script = document.createElement('script');
script.type = 'text/javascript';
script.appendChild(document.createTextNode('(' + main.toString() + ')(' + ('ul' === thread_list.nodeName.toLowerCase()) + ')'));
document.documentElement.appendChild(script).remove();