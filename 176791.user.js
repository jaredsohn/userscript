// ==UserScript==
// @grant  			none
// @name            微云刷10T
// @namespace       http://www.skyfly.org/
// @author          verglas@qq.com <verglas@qq.com> http://www.skyfly.org/
// @developer       verglas
// @contributor     verglas
// @description     微云刷10T
// @match           http://share.weiyun.com/*
// @match           http://www.weiyun.com/disk/index.html*
// @icon            http://www.shangyou.info/favicon.ico
// @version         0.2
// @updateURL       https://userscripts.org/scripts/source/176791.meta.js
// @downloadURL     https://userscripts.org/scripts/source/176791.user.js
// @supportURL      http://www.skyfly.org/
// @homepage        http://www.skyfly.org/
// @contributionURL https://me.alipay.com/xxx
// @contributionAmount  ￥0.00
// @license   MIT/Expat License
// @copyright 2012+, You
// ==/UserScript==

// 当前时间戳
var TIMESTAMP = Date.now || function() {
	return new Date;
};

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
var parseUri = function (str) {
    var o = parseUri.options,
        m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.ds.name] = {};
    uri[o.ds.name][0] = {};
    uri[o.ds.name][0]['key'] = (uri.protocol ? uri.protocol : 'http') + '://' + uri.host + (uri.port ? ':' + uri.port : '') + '/';
    uri[o.ds.name][0]['val'] = '/';
    var i = 0,
        tempsub = '/',
        subs = uri[o.key[10]].substr(1).split('/');
    for (var j = 1; j < (subs.length + 1); j++, i++) {
        tempsub += tempsub === '/' ? subs[i] : '/' + subs[i];
        if (subs[i]) {
            uri[o.ds.name][j] = {};
            uri[o.ds.name][j]['key'] = subs[i];
            uri[o.ds.name][j]['val'] = tempsub;
        }
    }

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });
    uri[o.aq.name] = {};
    uri[o.key[13]].replace(o.aq.parser, function ($0, $1, $2) {
        if ($1) uri[o.aq.name][$1] = $2;
    });

    return uri;
};
parseUri.options = {
    strictMode: false,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    aq: {
        name: "anchorqueryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    ds: {
        name: "directorySub"
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

//常用函数

//http://phpjs.org/functions/strip_tags/
var strip_tags = function (input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};

//获取当前域名
var MY_WEIYUN = SHARE_WEIYUN = false;
var URL_OBJECT = '';
var NOWHOST = function() {
	var nowurl = document.URL || document.location.href;
	URL_OBJECT = parseUri(nowurl);console.log(URL_OBJECT.host);
	switch(URL_OBJECT.host){
		case 'share.weiyun.com':
			SHARE_WEIYUN = true;
			break;
		case 'www.weiyun.com':
			MY_WEIYUN = true;
			break;
		default:
			break;
	}
};
NOWHOST();

// 页面加载执行
function earlyMain() {
    return '';
}

// 页面DOM结构确定
function tardyMain() {
    // 按需执行
    var ALLDONE = function(){
		if(SHARE_WEIYUN){
			setInterval(function(){
				var _any = function (arr, filter) {
					if (arr) {
						for (var i = 0, l = arr.length; i < l; i++) {
							var it = arr[i];
							if (true === filter.call(it, it, i)) {
								return true;
							}
						}
					}
					return false;
				};
				var _getOSname = function () {
					var nav = navigator.userAgent.toLowerCase(),
						mappings = [
							['ipad', 'ipad'],
							['iphone', 'iphone'],
							['mac', 'mac os,macintosh'],
							['windows phone', 'windows phone'],
							['windows', 'windows'],
							['android', 'android'],
							['linux', 'linux'],
							['unix', 'unix'],
							['symbian', 'symbian'],
							['blackberry', 'bb10,blackberry,playbook']
						];
					for (var i = 0, l = mappings.length; i < l; i++) {
						var map = mappings[i],
							os_name = map[0],
							uas = map[1].split(',');
						if (_any(uas, function (ua) {
							return nav.indexOf(ua) !== -1;
						})) {
							return os_name;
						}
					}
					return 'unknown os';
				};
				var _getBSname = function () {
					var b = jQuery.browser;
					b.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
					if (b.msie) {
						return 'ie' + parseInt(jQuery.browser.version);
					} else if (b.chrome) {
						return 'chrome';
					} else if (b.mozilla) {
						return 'mozilla';
					} else if (b.safari) {
						return 'safari';
					} else if (b.webkit) {
						return 'webkit';
					} else {
						return 'unknown';
					}
				};
				var dirArr = [];
				for (var i = 0; i < shareInfo.dir_list.length; i++) {
					dirArr.push({
						dir_key: shareInfo.dir_list[i].dir_key,
						dir_name: shareInfo.dir_list[i].dir_name + TIMESTAMP()
					});
				}
				_pitch_share_info = {
					"share_key": shareInfo.sharekey,
					"src_ppdir_key": shareInfo.ppdir_key,
					"src_pdir_key": shareInfo.pdir_key,
					"dst_ppdir_key": "",
					"dst_pdir_key": "",
					"src_uin": shareInfo.uin,
					"files": shareInfo.file_list,
					"dirs": dirArr,
					"os_info": encodeURIComponent(_getOSname()),
					"browser": encodeURIComponent(_getBSname())
				};
				var _queryXhr2 = function (cmd, data, uin, url) {
					var _domain = "weiyun.com";
					try {
						document.domain = _domain;
					} catch (e) {};
					var _version = QQDISK_WEB.Utils.getVersionNo();
					var _mainVer = _version == 0 ? 12 : (_version == 1 ? 11 : 13);
					var _url = (url) ? url : 'http://web.cgi.weiyun.com/wy_web.fcg';
					var _token = QQVIP.security.getAntiCSRFToken();
					var _param = {
						"req_header": {
							"proto_ver": 10006,
							"main_v": _mainVer,
							"sub_v": 1,
							"encrypt": 0,
							"msg_seq": 1,
							"source": window['outlink_os_type'],
							"token": _token,
							"client_ip": '127.0.0.1',
							"cmd": cmd,
							"uin": uin
						},
						"req_body": data
					};
					_param = QQDISK_WEB.Utils.obj2str(_param);
					var _xhr = new QQVIP.XHR(_url, null, 'POST', _param, true, true);
					_xhr.send();
					return _xhr;
				};
				var uin = QQVIP.cookie.get('uin');
				_dst_uin = parseInt(uin.replace(/o0*/, ""));
				var _xhr = _queryXhr2("store_share", _pitch_share_info, _dst_uin, "http://web.cgi.weiyun.com/wy_share.fcg", "weiyun.com");
				_xhr.onSuccess = function (json) {
					var _str = json["text"];
					var _obj = eval('(' + _str + ')');
					if (_obj.rsp_header) {
						showsuc(_obj.rsp_header, _obj.rsp_body ? _obj.rsp_body : {});
					} else {
						showsuc(-1, {});
						_outlinklog(_obj.rsp_header.ret);
					}
				}
			}, 1000);
		};
		if(MY_WEIYUN){
			//遍历删除所有文件
			if(0 && confirm('你确定要删除所有文件吗？取消请点击确消，中途退出请关闭页面。')){
				setInterval(function(){
					$('i.ico-del').click();
					$('input.ui-btn-ok').click();
				}, 1000);
			}
		}
	};

    // 页面加载完成后
    var m = function () {
        if (arguments.callee.done) {
            return '';
        }
        arguments.callee.done = true;
        if (c) {
            clearInterval(c);
        }
        //自定义执行函数
        ALLDONE();
    };
    if (window.document.addEventListener) {
        window.document.addEventListener("DOMContentLoaded", m, false)
    }
    if (/WebKit/i.test(window.navigator.userAgent)) {
        var c = setInterval(function () {
            if (/loaded|complete/.test(window.document.readyState)) {
                m();
            }
        }, 10)
    }
    window.onload = m;
}

(function () {
    earlyMain();

    // https://github.com/greasemonkey/greasemonkey/issues/1103
    var init = function () {
        init = function () {}; // prevent repeating

        function waitDOM() {
            d.removeEventListener('DOMContentLoaded', waitDOM);
            tardyMain();
        }
        var head = d.getElementsByTagName('head')[0];
        //earlyMain();
        if (d.body) {
            d.addEventListener('DOMContentLoaded', waitDOM);
        } else {
            tardyMain();
        }
    };

    function waitHead(event) {
        if (d.getElementsByTagName('head')[0]) {
            d.removeEventListener('DOMNodeInserted', waitHead, false);
            init();
        }
    }
    const d = ((typeof unsafeWindow === "object") ? unsafeWindow : window).document;
    if (!d) return;
    if (d.getElementsByTagName('head')[0]) {
        init();
    } else {
        d.addEventListener('DOMNodeInserted', waitHead, false);
    }
})();