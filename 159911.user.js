// ==UserScript==
// @grant               GM_xmlhttpRequest
// @name                网盘工具箱
// @namespace           http://www.skyfly.org/
// @author              verglas@qq.com <verglas@qq.com> http://www.skyfly.org/
// @developer           verglas
// @contributor         verglas
// @description         华为网盘，旋风离线分享，百度云网盘，快传工具，360云盘
// @match               http://fenxiang.qq.com/*
// @include             http://fenxiang.qq.com/*
// @match               http://lixian.qq.com/* 
// @include             http://lixian.qq.com/* 
// @match               http://dl.vmall.com/*
// @include             http://dl.vmall.com/*
// @match               http://dl.dbank.com/*
// @include             http://dl.dbank.com/*
// @match               http://kuai.xunlei.com/*
// @include             http://kuai.xunlei.com/*
// @include             http://jiayuan.xunlei.com/profile/*
// @match               http://pan.baidu.com/share/*
// @include             http://pan.baidu.com/share/*
// @match               https://pan.baidu.com/share/*
// @include             https://pan.baidu.com/share/*
// @match               http://pan.baidu.com/wap/*
// @include             http://pan.baidu.com/wap/*
// @match               https://pan.baidu.com/wap/*
// @include             https://pan.baidu.com/wap/*
// @match               http://yun.baidu.com/share/*
// @include             http://yun.baidu.com/share/*
// @match               https://yun.baidu.com/share/*
// @include             https://yun.baidu.com/share/*
// @match               http://yun.baidu.com/s/*
// @include             http://yun.baidu.com/s/*
// @match               https://yun.baidu.com/s/*
// @include             https://yun.baidu.com/s/*
// @match               http://pan.baidu.com/disk/home*
// @include             http://pan.baidu.com/disk/home*
// @match               https://pan.baidu.com/disk/home*
// @include             https://pan.baidu.com/disk/home*
// @match               http://pan.baidu.com/s/*
// @include             http://pan.baidu.com/s/*
// @match               https://pan.baidu.com/s/*
// @include             https://pan.baidu.com/s/*
// @match               http://pan.baidu.com/play/*
// @include             http://pan.baidu.com/play/*
// @match               https://pan.baidu.com/play/*
// @include             https://pan.baidu.com/play/*
// @match               http://*.yunpan.cn/*
// @include             http://*.yunpan.cn/*
// @match               http://*.yunpan.360.cn/*
// @include             http://*.yunpan.360.cn/*
// @require             http://upcdn.b0.upaiyun.com/libs/jquery/jquery-1.8.3.min.js
// @icon                https://static.cleverbridge.com/mycontent/849/favicon.ico
// @version             5.3
// @updateURL           https://userscripts.org/scripts/source/159911.meta.js
// @downloadURL         https://userscripts.org/scripts/source/159911.user.js
// @supportURL          http://www.skyfly.org/
// @homepage            http://www.skyfly.org/
// @contributionURL     https://me.alipay.com/xxx
// @contributionAmount  ￥0.00
// @license   MIT/Expat License
// @copyright 2012+, You
// ==/UserScript==
// //run-at document-start document-end
// @include             /^https?://(?:yun|pan)\.baidu\.com/(?:share/|disk/home|s/).*$/
// https://github.com/scriptish/scriptish/wiki/Comparison-Table

// http://james.padolsey.com/javascript/regex-selector-for-jquery/
var jQuery_plugin = function() {
    mjQuery.expr[':'].regex = function(elem, index, match) {
        var matchParams = match[3].split(','),
            validLabels = /^(data|css):/,
            attr = {
                method: matchParams[0].match(validLabels) ? matchParams[0].split(':')[0] : 'attr',
                property: matchParams.shift().replace(validLabels, '')
            },
            regexFlags = 'ig',
            regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g, ''), regexFlags);
        return regex.test(mjQuery(elem)[attr.method](attr.property));
    }
};

// firefox jQuery fix bug
if (typeof window.jQuery === "function" || (typeof window.$ === 'function' && typeof window.$().jquery === 'object')) {
    //window.$ instanceof jQuery
    mjQuery = (window.jQuery ? window.jQuery : window.$).noConflict(true);
    jQuery_plugin();
}

// 当前时间戳
var TIMESTAMP = Date.now || function() {
        return new Date; //new Date().getTime();(new Date()).getTime();
    };

// 时间位移
var M_TIMESTAMP = function(y, m, d) {
    //var min_date = new Date(-100000000*86400000);
    //var max_date = new Date( 100000000*86400000);
    var date = new Date(TIMESTAMP());
    var startOfDay = new Date(date.getFullYear() + parseInt(typeof(y) === 'undefined' ? '0' : y), date.getMonth() + parseInt(typeof(m) === 'undefined' ? '0' : m), date.getDate() + parseInt(typeof(d) === 'undefined' ? '0' : d));
    return startOfDay.getTime();
};

// 对象
var isObject = function(obj) {
    return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]';
}

// 插入一段JS代码并执行
var scriptRun = function(callback) {
    var script = document.createElement('script');
    script.textContent = '(' + callback.toString() + ')(window);';
    document.body.appendChild(script);
};
// 插入一段JS代码并执行
var injectScript = function(callback) {
    var script = document.createElement('script');
    script.textContent = '(' + callback.toString() + '());';
    document.body.appendChild(script);
    document.body.removeChild(script);
    //document.getElementsByTagName('head')[0].appendChild(script);
    //(document.body || document.head || document.documentElement).appendChild(script);
};
// 加载JS文件到页面并执行回调
var loadJS = function(url, callback) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = url;
    var done = false;
    script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            done = true;
            callback();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script)
        }
    };
    head.appendChild(script)
};
// 插入一段CSS代码
var injectStyle = function(cssstr) {
    var s = document.createElement("style");
    //s.id = "verglas_css";
    s.type = "text/css";
    s.textContent = cssstr;
    document.head.appendChild(s);
};
// 插入iframe
var injectIframe = function(fn) {
    var fnName = 'dynamic_fn_' + TIMESTAMP(),
        iframe = document.createElement('iframe');
    iframe.onload = function() {
        parent.window[fnName] = new Function('(' + fn.toString() + '());');
        parent.window[fnName]();
        parent.document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
};
// 兼容 https://gist.github.com/mathiasbynens/1143845
var gm_win = (function() {
    var a;
    try {
        a = unsafeWindow === window ? false : unsafeWindow;
    } finally {
        return a || (function() {
            var e = document.createElement('p');
            e.setAttribute('onclick', 'return window;');
            return e.onclick();
        }());
    }
}());
// 浏览器
var UAParser = function() {
    var ua = gm_win.navigator.userAgent.toLowerCase();
    return {
        'is360Chrome': ua.indexOf('chrome') !== -1 && ua.indexOf('safari') !== -1 || (ua.indexOf('360se') !== -1 || ua.indexOf('360ee') !== -1 || ua.indexOf('360spider') !== -1 || ua.indexOf('qihu') !== -1),
        'isChrome': ua.indexOf('chrome') !== -1 || ua.indexOf('chromium') !== -1,
        'isFirefox': ua.indexOf('firefox') !== -1,
        'isOpera': ua.indexOf('opera') !== -1 || ua.indexOf('opr') !== -1
    }
};

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
var parseUri = function(str) {
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
    uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });
    uri[o.aq.name] = {};
    uri[o.key[13]].replace(o.aq.parser, function($0, $1, $2) {
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

// 获取当前域名
var QQ_LIXIAN = QQ_FENXIANG = VMALL = XUNLEI_KUAI = BAIDU_PAN = BAIDU_PAN_SHARE_DIRECTORY = BAIDU_PAN_SHARE_DIRECTORY_S = BAIDU_PAN_HOME = BAIDU_PAN_HOME_DIRECTORY = BAIDU_PAN_INIT = BAIDU_PAN_PLAY = YUN360_PAN = YUN360_PAN_HOME = YUN360_PAN_HOME_GID = 
    XUNLEI_JIAYUAN = false;
var URL_OBJECT, NOWHOST;
(NOWHOST = function() {
    var nowurl = document.URL || document.location.href;
    URL_OBJECT = parseUri(nowurl);
    URL_OBJECT.host = URL_OBJECT.host.replace(/.*?(yunpan(?:\.360)*\.cn)/g, "$1"); // 360二级泛域名
    switch (URL_OBJECT.host) {
        case 'lixian.qq.com':
            QQ_LIXIAN = true;
            break;
        case 'fenxiang.qq.com':
            QQ_FENXIANG = true;
            break;
        case 'dl.vmall.com':
        case 'dl.dbank.com':
            VMALL = true;
            break;
        case 'kuai.xunlei.com':
            XUNLEI_KUAI = true;
            break;
        case 'jiayuan.xunlei.com':
            XUNLEI_JIAYUAN = true;
            break;
        case 'yun.baidu.com':
        case 'pan.baidu.com':
            BAIDU_PAN = true;
            BAIDU_PAN_SHARE_DIRECTORY = !! (URL_OBJECT.directory == '/share/link' && URL_OBJECT.anchorqueryKey && URL_OBJECT.anchorqueryKey['dir/path']);
            BAIDU_PAN_PLAY = URL_OBJECT.directory == '/play/video';
            BAIDU_PAN_HOME = URL_OBJECT.directory == '/disk/home';
            BAIDU_PAN_HOME_DIRECTORY = !! (URL_OBJECT.directory == '/disk/home' && URL_OBJECT.anchorqueryKey && URL_OBJECT.anchorqueryKey['dir/path']);
            BAIDU_PAN_INIT = URL_OBJECT.directory == '/share/init';
            BAIDU_PAN_SHARE_DIRECTORY_S = !! (URL_OBJECT.directory.indexOf('/s/') !== -1 && URL_OBJECT.anchorqueryKey && URL_OBJECT.anchorqueryKey['dir/path']);
            break;
        case 'yunpan.cn':
        case 'yunpan.360.cn':
            YUN360_PAN = true;
            YUN360_PAN_HOME = URL_OBJECT.host == 'yunpan.360.cn' && (URL_OBJECT.directory == '/my/index/' || URL_OBJECT.directory == '/my/' || URL_OBJECT.directory == '/my');
            YUN360_PAN_HOME_GID = (URL_OBJECT.host == 'yunpan.360.cn' && URL_OBJECT.queryKey) ? parseInt(URL_OBJECT.queryKey.gid) : 0;
            break;
        default:
            break;
    }
})();

//定义网站域名，JS，JS版本
var site_Version = {
    'lixian.qq.com': {
        'jsname': '',
        'jsversion': ''
    },
    'fenxiang.qq.com': {
        'jsname': 'xflib2.0.js',
        'jsversion': ''
    },
    'dl.vmall.com': {
        'jsname': 'custom-link1.js',
        'jsversion': '2.9.1013818245278111'
    },
    'dl.dbank.com': {
        'jsname': 'custom-link1.js',
        'jsversion': '2.9.1013818245278111' //2.9.1013818245278111d
    },
    'kuai.xunlei.com': {
        'jsname': 'downloading2.min.js',
        'jsversion': '5.1.6'
    },
    'jiayuan.xunlei.com/': {
        'jsname': 'common.js',
        'jsversion': '73d6eea'
    },
    'yun.baidu.com': {
        'jsname': 'yun_home_speed_all.js',
        'jsversion': '201311084746'
    },
    'pan.baidu.com': {
        'jsname': 'yun_home_speed_all.js',
        'jsversion': '201311084746'
    },
    'yunpan.cn': {
        'jsname': 'yp-1.2.js', //file.src.js,1141.js
        'jsversion': ''
    },
    'yunpan.360.cn': {
        'jsname': 'yp-1.2.js', //1141.js
        'jsversion': ''
    }
};

// JS版本检查
var script_Update = function(name, version, regex, name_patch) {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; --i) {
        var scriptPath = scripts[i].src;
        if (!scriptPath) {
            continue;
        }
        var scriptFolder = scriptPath.substr(0, scriptPath.lastIndexOf('/') + 1);
        var scriptName = scriptPath.substr(scriptFolder.length);
        var patch_math = (typeof name_patch != 'undefined') && name_patch ? 1 : 0;
        var _temp = regex.exec(patch_math ? scriptPath : scriptName);
        var scriptVersion = _temp ? _temp[1] : '';
        var scriptRealName = scriptPath.indexOf('.js') != -1 ? scriptPath.match(/([^\/]*?\.js)/i)[0] : '';
        if (scriptRealName == name) {
            if (typeof version === 'undefined' && !scriptVersion) {
                break;
            }
            var nextWeekTimestamp = M_TIMESTAMP(0, 8);
            var key = name + 'scriptUpdate';
            var isShow = gm_win.localStorage.getItem(key) ? parseInt(gm_win.localStorage.getItem(key)) <= parseInt(TIMESTAMP()) : true;
            if (isShow && version != scriptVersion) {
                gm_win.confirm("【网盘工具箱】检测该网盘网站改版！\r\r\n如脚本失败，请告诉脚本作者。\r\r\n7天内不再检查更新？") && gm_win.localStorage.setItem(key, nextWeekTimestamp);
                //return true;
            }
            //else{
            //    return false;
            //}
            break;
        }
    }
};

// jQuery版本比较 http://codereview.stackexchange.com/questions/2340/improve-this-function-that-compares-jquery-versions
var version_compare = function(need) {
    if (typeof jQuery === "undefined" || (typeof $ !== 'undefined' && typeof $ === 'function' && typeof $().jquery !== 'object')) {
        return false;
    }
    var re = /(\d+)\.(\d+)\.(\d+)/,
        cur = re.exec(jQuery.fn.jquery || $().jquery),
        need = re.exec(need);
    return (need[1] <= cur[1] && need[2] <= cur[2] && need[3] <= cur[3]);
}

// 老版本检查
var double_Check = function() {
    var tomorrowTimestamp = M_TIMESTAMP(0, 1);
    var old = mjQuery('#listdownlinks1, #listdownlinks2, #listdownlinks3');
    var key = 'scriptDoubleUpdate';
    var isShow = gm_win.localStorage.getItem(key) ? parseInt(gm_win.localStorage.getItem(key)) <= parseInt(TIMESTAMP()) : true;
    if (old.length && isShow) {
        alert('检查到您还在使用【网盘工具箱】老版本， 请卸载(删除)老版本。\r\r\n此信息1天提示一次。'); //请到『附加组件管理『（Firefox）或『扩展管理』（Chrome）中
        old.remove();
        gm_win.localStorage.setItem(key, tomorrowTimestamp);
    }
};

// 插件生效性检查
var userscriptDone_Check = function() {

};

//常用函数
var addLoadEvent = function(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
};

// http://stackoverflow.com/questions/1245617/want-a-javascript-function-to-run-every-minute-but-max-3-times/1245737
var repeater_function = function(func, times, interval) {
    window.setTimeout(function(times) {
        return function() {
            if (--times > 0) window.setTimeout(arguments.callee, interval);
            func();
        }
    }(times), interval);
};

// http://phpjs.org/functions/strip_tags/
var strip_tags = function(input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};

// object http://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
var object_size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// object https://gist.github.com/rlemon/1770422
var object_merge = function(target, obj) {
    var ret = {};
    for (var prop in obj) {
        if (target.hasOwnProperty(prop) && obj.hasOwnProperty(prop)) {
            if (typeof(target[prop]) === "object" && typeof(obj[prop]) === "object") {
                ret[prop] = object_merge(target[prop], obj[prop]);
            } else {
                ret[prop] = obj[prop];
            }
        } else if (obj.hasOwnProperty(prop)) {
            ret[prop] = obj[prop];
        }
    }
    for (var prop in target) {
        if (!(prop in obj) && target.hasOwnProperty(prop)) {
            ret[prop] = target[prop];
        }
    }
    return ret;
};

// 生成维一ID
var UNIQUEID;
(UNIQUEID = function(number) {
    var key = 'script_159911_uniqueid' + ((typeof number !== 'undefined' && number) ? '_' + number : '');
    return gm_win.localStorage.getItem(key) || (function() {
        // always start with a letter (for DOM friendlyness)
        var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
        do {
            // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
            var ascicode = Math.floor((Math.random() * 42) + 48);
            if (ascicode < 58 || ascicode > 64) {
                // exclude all chars between : (58) and @ (64)
                idstr += String.fromCharCode(ascicode);
            }
        } while (idstr.length < 32);
        gm_win.localStorage.setItem(key, idstr);
        return (idstr);
    })();
})(1);

// https://gist.github.com/eirikbacker/2864711
//addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
(function(win, doc) {
    if (win.addEventListener) return; //No need to polyfill

    function docHijack(p) {
        var old = doc[p];
        doc[p] = function(v) {
            return addListen(old(v))
        }
    }

    function addEvent(on, fn, self) {
        return (self = this).attachEvent('on' + on, function(e) {
            var e = e || win.event;
            e.preventDefault = e.preventDefault || function() {
                e.returnValue = false
            }
            e.stopPropagation = e.stopPropagation || function() {
                e.cancelBubble = true
            }
            fn.call(self, e);
        });
    }

    function addListen(obj, i) {
        if (i = obj.length)
            while (i--) obj[i].addEventListener = addEvent;
        else obj.addEventListener = addEvent;
        return obj;
    }

    addListen([doc, win]);
    if ('Element' in win) win.Element.prototype.addEventListener = addEvent; //IE8
    else { //IE < 8
        doc.attachEvent('onreadystatechange', function() {
            addListen(doc.all)
        }); //Make sure we also init at domReady
        docHijack('getElementsByTagName');
        docHijack('getElementById');
        docHijack('createElement');
        addListen(doc.all);
    }
})(window, document);

// QQ离线 
// http://lixian.qq.com/
var QQ_LIXIAN_FUNCTION = function() {
    var timeout = urls115 = '';
    var lxcallback = function() {
        mjQuery("td[id^='task_file_']").find('span.ico_ok').each(function() {
            var fileid = mjQuery(this).attr('id').substr(17);
            if (fileid.indexOf("empty") !== -1 || !mjQuery('#player_' + fileid).length || !mjQuery('#task_normal_down_' + fileid).length || !mjQuery('#task_file_name_' + fileid).length) {
                return false;
            }
            var hash = mjQuery('#player_' + fileid).attr('href').substr(20, 40);
            if (hash.length === 40) {
                var size = mjQuery('#task_normal_down_' + fileid).attr('size');
                var file_name = mjQuery('#task_file_name_' + fileid).attr('title');
                urls115 += hash + '#' + size + '#' + file_name + '\n'
            }
        });
        if (mjQuery("td[id^='task_file_']").find('span.ico_ok').length) {
            if (urls115) {
                mjQuery('<textarea id="' + UNIQUEID(1) + '">' + urls115 + '</textarea>').prependTo('body');
            };
            clearInterval(timeout);
        }
    };
    if (mjQuery("td[id^='task_file_']").find('span.ico_ok').length) {
        lxcallback();
        clearInterval(timeout);
    } else {
        timeout = setInterval(function() {
            repeater_function(double_Check, 1, 3000);
            lxcallback();
        }, 5000);
    };
};
// 旋风分享 
// http://urlxf.qq.com/?AVzm2m7 
// http://urlxf.qq.com/?iiAfIrE
var QQ_FENXIANG_FUNCTION = function() {
    injectStyle('\
    #personal {width: auto; text-align:center;}\
    .td_c a {max-width: 100%;}\
    #content { width: 100%;}\
    .td_c h2 {width: auto;}\
    #file_list_table {overflow-x: ""; overflow-y: ""; height: auto;}');
    window.start_normal_down = function(filename, filehash) {
        var config = {
            share_uin: window.share_uin || '',
            share_id: window.share_id || '',
            site_id: window.site_id || '',
            share_code: window.share_code || '',
            API_URL: window.API_URL || {}
        };
        mjQuery.ajax({
            type: 'POST',
            url: config.API_URL.handler_url + '/getComUrl',
            cache: false,
            data: {
                filename: filename,
                filehash: filehash
            },
            timeout: 3000,
            dataType: 'json',
            success: function(data) {
                if (data && data.ret == 0) {
                    mjQuery.cookie('FTN5K', data.data.com_cookie, {
                        path: '/',
                        domain: 'qq.com'
                    });
                    window.location = data.data.com_url;
                }
            },
            error: function() {
                window.art && art.dialog({
                    id: 'filenamePanel',
                    title: '温馨提示',
                    padding: 10,
                    content: '<div id="warn_type_a" class="save_status status_warn">' + '    <i class="status_icon"></i>' + '    <p>获取普通下载链失败,请重试！</p>' + '</div>',
                    time: 4,
                    lock: true,
                    fixed: true
                });
            }
        });
    };
    var timeout = '';
    var xfcallback = function() {
        // 115标准提取式 旋风链接
        var filename, filehash, urls = '',
            urls115 = '';
        mjQuery("td.td_c a").each(function() {
            var _this = mjQuery(this);
            //var _tagname = _this.prop("tagName").toLowerCase();
            filename = _this.attr('title');
            filehash = _this.attr('filehash');
            filesize = _this.attr('filesize');
            _this.html(filename);
            _this.attr('filesize', 1);
            //_this.attr('onclick', "tvs_normal_download(this);");
            //_this.attr('onclick', "return start_normal_down('" + filename + "', '" + filehash + "')");
            //_this[0].setAttribute('onclick', start_normal_down('"' + filename + '"', '"' + filehash + '"'));
            if (filename.toLowerCase().indexOf(".fix.rar") !== -1 || filename.toLowerCase().indexOf(".par2") !== -1) {
                _this.parent().parent().parent().find('td.td_a').find('input.file_list_checkbox').prop('checked', '');
                return true;
            }
            if (_this.attr('qhref')) {
                urls += _this.attr('qhref') + '\n';
            }
            urls115 += filehash + '#' + filesize + '#' + filename + '\n';
        });
        if (urls115) {
            mjQuery('<textarea id="' + UNIQUEID(1) + '">' + urls115 + '</textarea>').prependTo('body');
            clearInterval(timeout);
        };
        if (urls) {
            mjQuery('<textarea id="' + UNIQUEID(2) + '">' + urls + '</textarea>').prependTo('body');
            clearInterval(timeout);
        }
        //去掉添加任务后文件名截取
        if (gm_win.shareTransit && gm_win.shareTransit.init) {
            gm_win.shareTransit.init = function() {
                '',
                new gm_win.Check();
                new gm_win.RndSpeed();
                new gm_win.Download();
                new gm_win.Report();
                // new gm_win.CloudPlayer();
                new gm_win.Copy();
                new gm_win.Login();
                // new gm_win.Recommend();
                new gm_win.Lixian();
            }
        };
        //mjQuery('#file_info h1').html(mjQuery('td.td_c').eq(0).find('a').attr('title') + '等' + mjQuery('td.td_c a').length + '个文件');
        mjQuery('#sidebar').remove();
        mjQuery('#file_share').after('<div id="file_share_____"><span class="file_date" style="font-size:12px; height: 35px;">' + mjQuery('td.td_c').eq(0).find('a').attr('title') + '等' + mjQuery('td.td_c a').length + '个文件</span></div>');
    };
    timeout = setInterval(function() {
        xfcallback();
    }, 500);
};
// 华为网盘 
// http://dl.vmall.com/c09kybc7yo 
// http://dl.vmall.com/c06scr3ohx 
// http://dl.vmall.com/c0ljcpop20
var VMALL_FUNCTION = function() {
    var _autod = function() {
        var isObject = function(obj) {
            return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]';
        }
        if (typeof(dbank) != 'undefined' && isObject(dbank)) {
            dbank.securelink.isDownloadLimited = function() {
                return false;
            };
        }
        if (typeof(dbank) != 'undefined' && isObject(dbank)) {
            dbank.securelink.isInstallThunder = function() {
                return false;
            };
        }
    }
    injectScript(_autod);
    //mjQuery.cookie("download_limit", 'false');
    mjQuery('div.clearfix').eq(1).remove();
    // URL里多个文件
    if (mjQuery('a.dlopt-savetomynetdisk').length == 2) {
        // 高速下载 转存网盘 全选
        mjQuery('p.updatelink, #copyright, div.dialog-msg-Wrap').remove();
        mjQuery('a[id^="preview_"]').remove();
        mjQuery('a[id^="sjqq_"]').each(function() {
            mjQuery(this).removeClass('btn-tophone-s').addClass('btn-xz-s');
            mjQuery(this)[0].setAttribute('onclick', null);
        });
    }
    // 去广告
    mjQuery('span.list-status, a.dlopt-tophonedown, #hsdownload, a.dlopt-xunleidown, p.updatelink, #copyright, div.dialog-msg-Wrap, #cproIframe1, #ad_B, #ad_C, #ad_D, #ad_G, #ad_I, #ad_J, #cproIframe1holder, #showOverSizeTip_box, #options_repeat, iframe').remove();
    //文件夹事件
    //if(mjQuery('span.list-op').length){
    //  mjQuery('a.Directory-icon')[0].setAttribute('onclick', "dbank.securelink.opendir('"+mjQuery('a.Directory-icon').attr('title')+"'); return false;");
    //}
    var urls1 = '',
        urls2 = '';
    mjQuery('span.list-tit').each(function() {
        mjQuery(this).html(mjQuery(this).html().replace(/onclick="(?:.*?)"/ig, ""));
        var alink = mjQuery(this).find('a');
        if (alink.attr("class").indexOf("Directory") === -1) {
            self = alink[0];
            var ruleType = gm_win.globallinkdata.data.ruletype ? gm_win.globallinkdata.data.ruletype : mjQuery(".dlopt-xunleidown").attr("ruleType");
            /*mjQuery.cookie("e_r_" + self.id) || dbank.securelink.isvipvip(globallinkdata.data["profile.productid"]) || mjQuery.cookie("session") || parseInt(ruleType, 10) === 3*/
            if (1) {
                var file = gm_win.dbank.securelink.findDestFileById(alink.attr("id"));
                if (file && file.downloadurl) {
                    var decrypturl = gm_win.dbank.crt.decrypt(file.downloadurl, gm_win.dbank.securelink.encrykey);
                    var decryptxunleiurl = gm_win.dbank.crt.decrypt(file.xunleiurl, gm_win.dbank.securelink.encrykey);
                    alink.attr("href", decrypturl);
                    alink.html(alink.attr('title'));
                    urls1 += decrypturl + '\n';
                    urls2 += decryptxunleiurl + '\n';
                    mjQuery('#sjqq_' + alink.attr("id")).attr("href", decrypturl);
                    // URL里只有单个文件
                    if (mjQuery('#single_down_btn').length) {
                        mjQuery('#single_down_btn').show().attr("href", decrypturl);
                        mjQuery('a.btn-xz-s').length ? mjQuery('a.btn-xz-s')[0].setAttribute('onclick', null) : '';
                        mjQuery('a.btn-xz-s').attr("href", decrypturl);
                    }
                    // 文件夹
                    if (mjQuery('span.list-op').length) {
                        var _a = alink.parent().siblings('.list-dl').find('a');
                        _a.attr("href", decrypturl);
                        _a[0].setAttribute('onclick', null);
                    }
                }
            }
        }
    });
    if (urls1) {
        mjQuery('<textarea id="' + UNIQUEID(1) + '">' + urls1 + '</textarea>').prependTo('body');
        mjQuery('div.headerbg').remove();
    };
    if (urls2) {
        mjQuery('<textarea id="' + UNIQUEID(2) + '">' + urls2 + '</textarea>').prependTo('body');
    };
};

// 迅雷快传 
// http://kuai.xunlei.com/d/SHJRICMHPMPJ 
// http://kuai.xunlei.com/d/SZUZFUVYBBLS
// http://kuai.xunlei.com/d/vqTECAJA2QCL8SJRe63
var XUNLEI_KUAI_FUNCTION = function() {
    var _autod = function() {
        function adpop() {
            return;
        }
        $(".general_btn,.general_btn_file").unbind("click").bind("click", function() {
            adpop();
            var xid = $(this).attr("xid");
            if (xid == 1) {
                var els = $(".liebiao .file_chk:checked");
            } else {
                var xsid = $(this).attr("xsid");
                var els = $(".liebiao .file_chk:eq(" + xsid + ")");
            } if (els.length == 0) {
                show_confirm_layer({
                    msg: "还没有选择任何文件哦！"
                });
                return;
            }
            browser_download();
            return false;
        });
    }
    injectScript(_autod);
    mjQuery('div.adv_area,div.adb_txt,div.r_ico').remove(); //去广告
    mjQuery('div.file_list').attr('style', 'height:auto; width:968px;');
    var urls = '';
    mjQuery('a.file_name').each(function() {
        var _selft = mjQuery(this);
        _selft.html(_selft.attr('title'));
        if (_selft.parent().prev('.c_1').find('input').length) {
            urls += _selft.attr('href') + '\n';
        }
    });
    injectStyle('\
    .adv_area, .file_right, .advl, .hot_list {display: none !important;}\
    .file_left, .file_src, .file_src li {width: 100% !important;height: 100% !important;}\
    .c_2, .c_2 a{width: auto !important;}\
    .c4.status {width: 100px !important;}\
    .c4 {float: right !important;}\
    ..file_left, .downLoad_area {width: 100% !important;}\
    .file_w, .file_list {height: 100% !important;}');
    if (urls) {
        mjQuery('<textarea id="' + UNIQUEID(1) + '">' + urls + '</textarea>').prependTo('body');
    };
};

// 迅雷家园
// http://jiayuan.xunlei.com/profile/289434474
var XUNLEI_JIAYUAN_FUNCTION =function(){
    /*
    // 尝试获取所有资源总数量方便分页
    setTimeout(function(){
    
    }, 3000)
    mjQuery('#resources-list').live("scroll", function() {
            var _threshold = '';
            var _distance = mjQuery(this)[0].scrollHeight - mjQuery(this)[0].scrollTop - mjQuery(this).height();
    });
    */
    var _uid = URL_OBJECT.directory.substr(9);
    var _param = {
                scene: "profile",
                userid: _uid,
                offset: 0,
                length: 20,
                first: 1,
                _: TIMESTAMP()
            };
    var _url = 'http://api.jiayuan.xunlei.com/weibo/suite?callback=&' + mjQuery.param(_param);
    GM_xmlhttpRequest({
        method: "GET",
        url: _url,
        onload: function(xhr) {
            var obj = gm_win.JSON.parse(xhr.responseText);
            var urls = '';
            var i = obj.sharedList.length;
            console.log(obj.sharedList, i);
            while(i--) {
               urls += obj.sharedList[i].url + '\n';
            }
            if (urls) {
                mjQuery('<textarea id="' + UNIQUEID(1) + '">' + urls + '</textarea>').prependTo('body');
            };
        }
    });
    /*
    (function($) {
        var _uid = URL_OBJECT.directory.substr(9);
        var _param = {
                    scene: "profile",
                    userid: _uid,
                    offset: 0,
                    length: 20,
                    first: 1,
                    _: TIMESTAMP()
                };
        var url = 'http://api.jiayuan.xunlei.com/weibo/suite?callback?&' + mjQuery.param(_param);
        $.ajax({
           type: 'GET',
            url: url,
            async: false,
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {
               console.dir(json);
            },
            error: function(e) {
               console.log(e.message);
            }
        });
    })(mjQuery);
    */
}

// 百度云 网盘 
// http://pan.baidu.com/share/link?shareid=3050490841&uk=2014183022(q7va)
// http://pan.baidu.com/share/link?shareid=3176084828&uk=2014183022(2msu)
// http://pan.baidu.com/share/link?shareid=3871242150&uk=2318890374
// http://pan.baidu.com/share/link?shareid=28901&uk=103623586
// http://pan.baidu.com/s/1n9gha 
// https://pan.baidu.com/s/1n9gha
var BAIDU_PAN_FUNCTION = function(hashchange) {
    // 过滤密码输入页
    if (BAIDU_PAN_INIT) {
        return true;
    }
    if (!mjQuery('#' + UNIQUEID(1)).length) {
        mjQuery('<textarea id="' + UNIQUEID(1) + '" style="display:none;">' + '' + '</textarea>').prependTo('body');
    }

    var _autod = function() {
        $.getScript(window.location.protocol + '//' + window.location.host + "/res/static/js/ui/download_manager.js");
        // 除去大文件云管家限制
        if (disk && disk.util && disk.util.DownloadManager && disk.util.DownloadManager.SIZE_THRESHOLD) {
            disk.util.DownloadManager.SIZE_THRESHOLD = Number.MAX_VALUE; //9007199254740992  2*1024*1024*1024;
        };
        if (disk && disk.util && disk.util.DownloadProxy) {
            disk.util.DownloadProxy.prototype._calculateMode = function() {
                return 0;
            };
        }
        /*
        // 删除回调
        disk.util.LocalCache.prototype.removeCallback = function() {
            //console.log('删除');
        }
        disk.util.LocalCache.prototype.removeAll = function() {
            this._mCache = {};
            this._mDirty = true;
            this.removeCallback();
            return this;
        }
        // 上传回调
        var oldFunction = FileUtils.onBeforeRenderingListView;
        FileUtils.onBeforeRenderingListView = function() {
            //console.log('上传');
            oldFunction();
        };
        // var _ = function() {console.log(1);};
        // _.ABC = 1;
        */
    }
    injectScript(_autod);
    var timeout = '';
    var md5listJSONobj = {};
    // 处理获取到的数据
    var _callback = function(md5listJSONobj) {
        var urls = '';
        // 时间列
        mjQuery('div.time-col').each(function() {
            var _self = mjQuery(this);
            var position = _self.siblings('div.file-col').find('span.inline-file-col').find('a.input-cbx').attr('_position');
            var position_css = _self.siblings('div.file-col').find('span.inline-file-col').find('span.b-in-blk.sprite-list-ic.b-ic-book').css('background-position');
            var is_dir = position_css == "0px 0px";
            var is_other = position_css == "-38px 0px";
            if (!is_dir && !is_other && md5listJSONobj[position]) {
                var dlink = md5listJSONobj[position].dlink;
                if (dlink) {
                    if (_self.find('span').length != 2) {
                        _self.find('span').prepend('<span style="cursor: pointer;"><a  _vcode="0" id="vdown' + md5listJSONobj[position].fs_id + '"  _fs_id="' + md5listJSONobj[position].fs_id + ' _position="' + position + '" class="down_normal_z" style="float:right; margin-top:5px;" href="' + dlink + '">点击下载</a></span>&nbsp;&nbsp;');
                    } else {
                        mjQuery("a.down_normal_z[_position='" + position + "']").attr('href', dlink);
                    }
                } else {
                    if (_self.find('span').length != 2) {
                        _self.find('span').prepend('<span style="cursor: pointer;"><a _vcode="0" id="vdown' + md5listJSONobj[position].fs_id + '"  _fs_id="' + md5listJSONobj[position].fs_id + '" _position="' + position + '" class="down_normal_z" style="float:right; margin-top:5px;" href="javascript:;">获取直链</a></span>&nbsp;&nbsp;');
                        mjQuery('#vdown' + md5listJSONobj[position].fs_id).live('click', function() {
                            NOWHOST();
                            var fid_list = mjQuery(this).attr('_fs_id');
                            var uk = (URL_OBJECT.queryKey && URL_OBJECT.queryKey.uk) ? URL_OBJECT.queryKey.uk : gm_win.FileUtils.share_uk;
                            var shareid = (URL_OBJECT.queryKey && URL_OBJECT.queryKey.shareid) ? URL_OBJECT.queryKey.shareid : gm_win.FileUtils.share_id;
                            NOWHOST();
                            var preurl = (URL_OBJECT.protocol ? URL_OBJECT.protocol : 'http') + '://' + URL_OBJECT.host + '/share/download';
                            mjQuery.post(preurl, {
                                'uk': uk,
                                'shareid': shareid,
                                'fid_list': '[' + fid_list + ']'
                            }, function(data) {
                                if (!(data.errno)) {
                                    mjQuery('#vdown' + fid_list).attr('href', data.dlink).die('click').removeAttr('id').html('点击下载');
                                } else {
                                    setInterval(function() {
                                        mjQuery('a[id^="vdown"]').attr('title', $('<div/>').html('注意：&#10;1：多次获取将被要求验证码！&#10;2：单击输入验证码直链下载！&#10;&#10;规避验证码：&#10;1：请清空浏览器缓存刷新页面！&#10;2：转存到自己网盘重试！').text()).html('验证下载');
                                    }, 500);
                                    gm_win.disk.Context.getService(gm_win.disk.Context.SERVICE_DOWNLOAD_PROXY).straightforwardDownload(md5listJSONobj[position], 1);
                                }
                            });
                        });
                    }
                }
            } else if (is_dir) {
                mjQuery("a.down_normal_z[_position='" + position + "']").remove();
            }
        });
    };
    var output_html = function(md5listJSONobj) {
        var dlink = urls = '';
        for (key in md5listJSONobj) {
            if (md5listJSONobj[key].isdir != 1 && md5listJSONobj[key].dlink) {
                dlink = md5listJSONobj[key].dlink;
                urls += dlink ? dlink + '\n' : '';
            }
        }
        if (typeof urls != "undefined" && urls) {
            mjQuery('#' + UNIQUEID(1)).html(urls).show();
            gm_win.Utilities && gm_win.Utilities.resolveLayout && gm_win.Utilities.resolveLayout();
        } else {
            mjQuery('#' + UNIQUEID(1)).hide();
        }
        setInterval(function() {
            _callback(md5listJSONobj);
        }, 500);
    };
    // 实时获取数据(分页等)
    var output_md5listJSONobj = function(_ajaxcomplete, md5listJSONobj, page) {
        NOWHOST();
        if (!_ajaxcomplete && (BAIDU_PAN_SHARE_DIRECTORY || BAIDU_PAN_HOME_DIRECTORY || BAIDU_PAN_HOME || BAIDU_PAN_SHARE_DIRECTORY_S || BAIDU_PAN_PLAY)) {
            var page = page ? page : (URL_OBJECT.anchorqueryKey && URL_OBJECT.anchorqueryKey.page ? URL_OBJECT.anchorqueryKey.page : (URL_OBJECT.queryKey && URL_OBJECT.queryKey.page ? URL_OBJECT.queryKey.page : 1));
            var dir = URL_OBJECT.anchorqueryKey && URL_OBJECT.anchorqueryKey['dir/path'] ? URL_OBJECT.anchorqueryKey['dir/path'] : URL_OBJECT.queryKey && URL_OBJECT.queryKey.dir;
            var listurl;
            var preurl = (URL_OBJECT.protocol ? URL_OBJECT.protocol : 'http') + '://' + URL_OBJECT.host;
            // 文件名 大小 日期
            mjQuery('div.clearfix').find('div.c1.col, div.c2.col, div.c3.col').each(function() {
                var _self = mjQuery(this);
                var asc = _self.find('a').hasClass('asc');
                var desc = _self.find('a').hasClass('desc');
                if (asc || desc) {
                    var order = mjQuery(this).hasClass('c1') ? 'name' : (mjQuery(this).hasClass('c2') ? 'size' : 'time');
                }
            })
            if (BAIDU_PAN_PLAY && URL_OBJECT.anchorqueryKey && URL_OBJECT.anchorqueryKey['video/path']) {
                listurl = preurl + '/api/list?channel=chunlei&clienttype=0&web=1';
                var videopath = URL_OBJECT.anchorqueryKey['video/path'];
                var myregexp = /(\/(?:[^\/]+\/)*)(.*)/g;
                var match = myregexp.exec(decodeURIComponent(videopath));
                dir = encodeURIComponent(match[1]);
                var videoname = match[2].replace(/&t=-*\d+/g, "");
            } else if (BAIDU_PAN_HOME_DIRECTORY) {
                listurl = preurl + '/api/list?channel=chunlei&clienttype=0&web=1&num=100&order=time&desc=1';
            } else if (BAIDU_PAN_HOME) {
                dir = '%2F';
                listurl = preurl + '/api/list?channel=chunlei&clienttype=0&web=1&num=100&order=time&desc=1';
            } else if (BAIDU_PAN_SHARE_DIRECTORY || BAIDU_PAN_SHARE_DIRECTORY_S) {
                var uk = (URL_OBJECT.queryKey && URL_OBJECT.queryKey.uk) ? URL_OBJECT.queryKey.uk : gm_win.FileUtils.share_uk;
                var shareid = (URL_OBJECT.queryKey && URL_OBJECT.queryKey.shareid) ? URL_OBJECT.queryKey.shareid : gm_win.FileUtils.share_id;
                listurl = preurl + '/share/list?channel=chunlei&clienttype=0&web=1&num=100&order=time&desc=1';
                listurl += '&uk=' + uk + '&shareid=' + shareid;
            }
            listurl += '&t=' + TIMESTAMP() + '&_=' + TIMESTAMP() + '&page=' + page + '&dir=' + dir;
            mjQuery.get(listurl, function(data) {
                var list = data.list;
                if (list.length) {
                    if (BAIDU_PAN_PLAY) {
                        for (var r = 0, i = list.length; r < i; r++) {
                            if (videoname == list[r].server_filename) {
                                output_md5listJSONobj(1, {
                                    0: list[r]
                                }, 1);
                                break;
                            }
                        }
                    } else {
                        md5listJSONobj = object_merge(md5listJSONobj, list);
                    }
                }
                output_md5listJSONobj(list.length == 0, md5listJSONobj, ++page);
            });
        } else if (!_ajaxcomplete) {
            // 老版本单个分享
            var md5list = gm_win.document.body.innerHTML.match(/\[\{\\\"fs_id\\\".+\}\]/);
            if (md5list) {
                var md5listclean = md5list[0].split("\\\\");
                var md5listdone = md5listclean[0].replace(/\\/g, "");
                for (i = 1; i < md5listclean.length; i++) {
                    md5listdone += ("\\" + md5listclean[i].replace(/\\/g, ""));
                }
                md5listdone = "{\"list\":" + md5listdone + "}";
                md5listJSONobj = JSON.parse(md5listdone)['list']; // mjQuery.parseJSON(md5listdone)['list'];
            }
            output_md5listJSONobj(!_ajaxcomplete, md5listJSONobj);
        } else {
            output_html(md5listJSONobj);
        }
    };
    // 列表时导出选中的(延时绑定)
    setTimeout(function() {
        mjQuery('a.b-in-blk.input-cbx, li.down-sfile, #nameCompareTrigger span.b-fl.input-cbx.selectionArbitrate').on('click', function() {
            var urls = '';
            if (typeof(gm_win.FileUtils.getListViewCheckedItems) != 'undefined') {
                for (var i = 0; i < gm_win.FileUtils.getListViewCheckedItems().length; i++) {
                    if (gm_win.FileUtils.getListViewCheckedItems()[i].isdir != 1) {
                        var dlink = gm_win.FileUtils.getListViewCheckedItems()[i].dlink;
                        if (dlink) {
                            urls += dlink + '\n';
                        }
                    }
                }
            }
            if (typeof urls != "undefined" && urls) {
                mjQuery('#' + UNIQUEID(1)).html(urls).show();
            } else {
                mjQuery('#' + UNIQUEID(1)).html('').hide();
                output_md5listJSONobj(0, {}, 1);
            }
        });
    }, 3000);
    if (!hashchange) {
        // 单个分享处理, 多文件列表分享预处理
        //去掉广告提示
        mjQuery("iframe[src='about:blank'], #activateGuidePopupOuter, div.tips-bg.newhandTips3-bg, div.b-panel.b-dialog.b-feature-manual.feature-manual-step0, div.tips.ellipsis.clearfix, div.ellipsis.tips").remove();
        // 轮循给出当前的真正下载地址
        mjQuery("s.indicator-cols").find("span:contains('修改日期')").parent().find('span.b-in-blk').after('<span style="float:right; margin-top:5px;">直接下载</span>');
        //setInterval(function() {
        //    // 显示所有下载按钮
        //    if (!BAIDU_PAN_HOME && !BAIDU_PAN_HOME_DIRECTORY) {
        //        mjQuery('span.inline-commands.b-btn.clearfix').css('visibility', '').show();
        //    }
        //}, 500);
        // 单个文件时添加普通下载按钮
        var buttom = mjQuery('#downFileButtom');
        if (buttom.length && gm_win.disk && gm_win.disk.util && gm_win.disk.util.ViewShareUtils && gm_win.disk.util.ViewShareUtils.viewShareData) {
            var geturl = (URL_OBJECT.protocol ? URL_OBJECT.protocol : 'http') + '://' + URL_OBJECT.host;
            var bdstoken = URL_OBJECT.queryKey.shareid ? 'null' : gm_win.disk.util.ViewShareUtils.bdstoken;
            var shareid = URL_OBJECT.queryKey.shareid ? URL_OBJECT.queryKey.shareid : gm_win.FileUtils.share_id;
            var uk = URL_OBJECT.queryKey.shareid ? URL_OBJECT.queryKey.uk : gm_win.FileUtils.share_uk;
            var fid_list = '%5B' + gm_win.disk.util.ViewShareUtils.fsId + '%5D';
            geturl += '/share/download?bdstoken=' + bdstoken + '&shareid=' + shareid + '&uk=' + uk + '&fid_list=' + fid_list;
            mjQuery.get(geturl, function(data) {
                var _data = mjQuery.parseJSON(gm_win.disk.util.ViewShareUtils.viewShareData);
                var errmsg = '注意：&#10;1：多次刷新将被要求验证码！&#10;2：单击此处输入验证码直链下载！&#10;&#10;规避验证码：&#10;1：请清空浏览器缓存刷新页面！&#10;2：转存到自己网盘重试！';
                var dlink = data.dlink;
                var emptydlink = !! (data.errno)
                buttom.after(buttom.clone().attr({
                    "id": "start_normal_down",
                    "href": emptydlink ? 'javascript:;' : dlink,
                    "title": emptydlink ? mjQuery('<div/>').html(errmsg).text() : '普通下载'
                }));
                var start_normal_down = buttom.find('b').html().replace(/[^(]+(\([^)]+\))/ig, emptydlink ? "尝试普通下载$1" : "普通下载$1");
                mjQuery('#start_normal_down').find('b').html(start_normal_down);
                if (emptydlink) {
                    mjQuery('#start_normal_down').live('click', function() {
                        gm_win.disk.Context.getService(gm_win.disk.Context.SERVICE_DOWNLOAD_PROXY).straightforwardDownload(_data, 1);
                    })
                }
                mjQuery('#shareqr').after('<br /><span>文件MD5:<input type="text" style="width:250px;" value="' + _data.md5 + '"></span>');
                mjQuery('.slide-show-header h2').css('width', 'auto');
                output_md5listJSONobj(1, {
                    0: {
                        dlink: dlink
                    }
                }, 1);
            });
        }
        // 无目录
        output_md5listJSONobj(0, {}, 1);
    }
    // 有目录
    return (function() {
        NOWHOST();
        if (BAIDU_PAN_SHARE_DIRECTORY || BAIDU_PAN_HOME_DIRECTORY || BAIDU_PAN_HOME || BAIDU_PAN_SHARE_DIRECTORY_S) {
            // 去广告提示
            mjQuery('div.ellipsis.tips, div.newhand-tips-dialog').remove();
        }
        output_md5listJSONobj(0, {}, 1);
    })();
};

// 360云盘 
// http://cvwzjctgh.l3.yunpan.cn/lk/sVWsaRN4q93QA 
// http://yunpan.cn/QGQ2UuBstzmQk
// http://c29.yunpan.360.cn/my/
var YUN360_PAN_FUNCTION = function() {
    var _auto = function() {
		//去广告
		mjQuery('div.ad-box').remove();
        if (!mjQuery('#' + UNIQUEID(1)).length) {
            mjQuery('<textarea id="' + UNIQUEID(1) + '" style="display:none;">' + '' + '</textarea>').prependTo('body');
        }
        var singlename = mjQuery('#toolbar').find('span.name');
        singlename.html(singlename.attr('title'));
        mjQuery('#toolbar').find('div.btn-panel.btn-group').removeClass('btn-group');
        mjQuery('div.dl-qrcode').show();
        if (YUN360_PAN_HOME || YUN360_PAN_HOME_GID) {
            var timeout2 = setInterval(function() {
                if (mjQuery('#list').length) {
                    mjQuery('#list').find('div.column-name').each(function() {
                        var _self = mjQuery(this);
                        var _title = _self.attr('title');
                        if (_title && _title.indexOf('类型') !== -1 && _title.indexOf('大小') !== -1) {
                            result = _title.match(/((?:.|\r|\n)*)?类型/i)[1];
                            _self.find('span.text').html(result);
                        }
                    });
                    clearInterval(timeout2);
                }
            }, 500);
            // 领空间
            if (YUN360_PAN_HOME) {
                gm_win.monitor.btnLog('choujiang');
                //获取所有GID
                gm_win.yunpan.group.updateNum = (function(n) {
                    var cached_function = gm_win.yunpan.group.updateNum;
                    return function(n) {
                        var r = n.data.update_file_num_list || [];
                        if (r.length) {
                            gm_win.localStorage.setItem('gidarray', '');
                            for (var o = 0, u = r.length; o < u; o++) {
                                var _gids = gm_win.localStorage.getItem('gidarray');
                                gm_win.localStorage.setItem('gidarray', _gids ? _gids + '|' + r[o].gid : r[o].gid);
                            }
                        }
                        cached_function.apply(this, arguments);
                    }
                })();
                //批量签到
                //http://qun.yunpan.360.cn/group/grouplist?cross_domain_callback=yunpan.group.showList
                gm_win.loadJs(gm_win.ypDomain.qun + "/file/getFileUpdateCount?cross_domain_callback=yunpan.group.updateNum")
                setTimeout(function() {
                    var gidarray = gm_win.localStorage.getItem('gidarray').split('|');
                    if(gidarray.length){
                        var time = setInterval(function() {
                            var gid = gidarray.pop();
                            var key = 'yunpanhomegid_' + gid;
                            var dosignin = gm_win.localStorage.getItem(key) ? parseInt(gm_win.localStorage.getItem(key)) <= parseInt(TIMESTAMP()) : true;
                            if(dosignin){
                                GM_xmlhttpRequest({
                                    method: "POST",
                                    url: "http://qun1.yunpan.360.cn/group/signIn",
                                    data: "gid=" + encodeURIComponent(gid),
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    onload: function(response) {
                                        gm_win.yunpan.Msg.forceAlert(gid+"签到成功", {type: "success"});
                                        var tomorrowTimestamp = M_TIMESTAMP(0, 1);
                                        gm_win.localStorage.setItem(key, tomorrowTimestamp);
                                        console.log (key, TIMESTAMP(), tomorrowTimestamp);
                                        if(!gidarray.length){
                                            gm_win.yunpan.Msg.forceAlert("所有签到完成", {type: "success"});
                                            setTimeout(function() {
                                                mjQuery('div[id^="BasePanel"], div.mask').remove();
                                            }, 1000 * 1);
                                        }
                                    }
                                });
                            }
                            if(!gidarray.length){
                                clearInterval(time);
                            }
                        }, 1000 * 2);
                    }
                }, 1000 * 1);
            } else if (YUN360_PAN_HOME_GID) {
                // 单个共享群签到
                var tomorrowTimestamp = M_TIMESTAMP(0, 1);
                var key = 'yunpanhomegid_' + YUN360_PAN_HOME_GID;
                var dosignin = gm_win.localStorage.getItem(key) ? parseInt(gm_win.localStorage.getItem(key)) <= parseInt(TIMESTAMP()) : true;
                if (dosignin) {
                    gm_win.yunpan.signin.signin_communicate();
                    gm_win.localStorage.setItem(key, tomorrowTimestamp);
                }
            };
        } else {
            mjQuery('div.column-name').each(function() {
                var _self = mjQuery(this);
                _self.find('span.text').html(_self.attr('title').split('\n')[0]);
            });
            if (mjQuery('li.filelist-item').length) {
                if (!mjQuery('#' + UNIQUEID(1)).length) {
                    mjQuery('<textarea id="' + UNIQUEID(1) + '" style="display:none;">' + '' + '</textarea>').prependTo('body');
                }
                mjQuery('li.filelist-item').each(function(i) {
                    var _nid = mjQuery(this).data("nid");
                    if (mjQuery(this).data("type") != 'folder') {
                        gm_win.Ajax.post("/share/downloadfile/", {
                            shorturl: gm_win.SYS_CONF.surl,
                            nid: _nid
                        }, function(e) {
                            var n = gm_win.JSON.parse(e);
                            if (n.errno == 0) {
                                mjQuery('div.column-time').eq(i).after('<a href="' + n.data.downloadurl + '" style="float: right;width: 30px;">下载</a>');
                                var html = mjQuery('#' + UNIQUEID(1)).html();
                                mjQuery('#' + UNIQUEID(1)).html(html ? html + '\n' + n.data.downloadurl : n.data.downloadurl).show();
                            }
                        });
                    }
                });
            } else if (gm_win.SYS_CONF.isSingle) {
                gm_win.Ajax.post("/share/downloadfile/", {
                    shorturl: gm_win.SYS_CONF.surl,
                    nid: gm_win.SYS_CONF.nid
                }, function(e) {
                    var n = gm_win.JSON.parse(e);
                    if (n.errno == 0) {
                        mjQuery('div.desc').find('span').after('<p><a style="text-align:center;cursor: pointer;font-size: 16px;margin: 0 auto;" href="' + n.data.downloadurl + '" style="float: right;width: 30px;">直接下载</a></p>');
                        mjQuery('<textarea id="' + UNIQUEID(1) + '">' + n.data.downloadurl + '</textarea>').prependTo('body');
                    }
                });
            }
        }
    };
    _auto();
    mjQuery('div.column-name').on('click', function() {
        setTimeout(function() {
            _auto();
        }, 1000);
    });
};


// Standalone DOM ready utility function
// Parts lifted from the following places:
// http://code.jquery.com/jquery-1.9.1.js
// https://gist.github.com/magnetikonline/5270265
(function(win, doc) {

    var docEl = doc.documentElement,
        readyHandlerList,
        realEventModel = !! win.addEventListener,
        readyStateRegExp = /^(loade|c)/,
        DOMIsReady = readyStateRegExp.test(doc.readyState),
        DOMContentLoadedEvent = 'DOMContentLoaded',
        onReadyStateChangeEvent = 'onreadystatechange';

    win.domReady = function(handler) {

        // if DOM ready call handler right away
        if (DOMIsReady) return handler();

        if (!readyHandlerList) {
            // init events
            if (realEventModel) {
                doc.addEventListener(DOMContentLoadedEvent, readyHandler, false);
                win.addEventListener('load', readyHandler, false);

            } else {
                // Internet Explorer event model
                doc.attachEvent(onReadyStateChangeEvent, readyHandler);
                win.attachEvent('onload', readyHandler);

                // doScroll() hack for Internet Explorer < 9, (it should) fire earlier than 'onreadystatechange'
                // this will fail (badly) if used inside an iframe - so don't
                if (docEl.doScroll) {
                    (function doScrollCheck() {

                        if (!DOMIsReady) {
                            try {
                                docEl.doScroll('left');

                            } catch (e) {
                                return setTimeout(doScrollCheck, 50);
                            }

                            DOMIsReady = true;
                            readyHandler();
                        }
                    })();
                }
            }

            readyHandlerList = [];
        }

        // add handler to stack
        readyHandlerList.push(handler);
    };

    function readyHandler(event) {

        if (realEventModel || DOMIsReady || (event.type == 'load') || (readyStateRegExp.test(doc.readyState))) {
            // detach events
            if (realEventModel) {
                doc.removeEventListener(DOMContentLoadedEvent, readyHandler, false);
                win.removeEventListener('load', readyHandler, false);

            } else {
                doc.detachEvent(onReadyStateChangeEvent, readyHandler);
                win.detachEvent('onload', readyHandler);
            }

            // process handler stack
            while (readyHandlerList.length) readyHandlerList.shift()();
            DOMIsReady = true;
        }
    }
})(window, document);

var earlyMain = function() {
    var _auto = function() {
        var resize = function() {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + this.offsetHeight - this.clientHeight + "px";
            setTimeout(function() {
                mjQuery('#' + UNIQUEID(1) + ', #' + UNIQUEID(2) + ', #' + UNIQUEID(3)).css('height', '38px');
            }, 5000);
        };
        var events = "oninput" in window ? "input click" : "keyup keydown click";
        mjQuery('#' + UNIQUEID(1) + ', #' + UNIQUEID(2) + ', #' + UNIQUEID(3)).select().live(events, resize);
        mjQuery('#' + UNIQUEID(1) + ', #' + UNIQUEID(2) + ', #' + UNIQUEID(3)).live('focusout', function() {
            mjQuery(this).css('height', '38px');
        });
    }
    // 加载jQuery
    if (typeof mjQuery === 'undefined' && !version_compare('1.8.3')) {
        loadJS("http://upcdn.b0.upaiyun.com/libs/jquery/jquery-1.8.3.min.js", function() {
            mjQuery = (window.jQuery ? window.jQuery : window.$).noConflict(true);
            jQuery_plugin();
            _auto();
        });
    } else {
        mjQuery = mjQuery ? mjQuery : (window.jQuery ? window.jQuery : window.$);
        jQuery_plugin();
        _auto();
    }
    //样式 querySelectorAll
    injectStyle('\
    textarea {\
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */\
        -moz-box-sizing: border-box;    /* Firefox, other Gecko */\
        box-sizing: border-box;         /* Opera/IE 8+ */\
    }' + '#' + UNIQUEID(1) + ',' + '#' + UNIQUEID(2) + ',' + '#' + UNIQUEID(3) + '{' + '\
        width: 100%;\
        height: auto;\
        border: 1px solid #333;\
        padding: 4px;\
        overflow: hidden;\
        outline: none;\
        resize: none;\
        z-index: 16777271;\
    }');
    // 目标网站改版检查
    if (site_Version[URL_OBJECT.host] && site_Version[URL_OBJECT.host].jsname) {
        switch (URL_OBJECT.host) {
            case 'yunpan.cn':
            case 'yunpan.360.cn':
                script_Update(site_Version[URL_OBJECT.host].jsname, site_Version[URL_OBJECT.host].jsversion, /\/static\/([^\/]{16})\//i, 1);
                break;
            default:
                script_Update(site_Version[URL_OBJECT.host].jsname, site_Version[URL_OBJECT.host].jsversion, /(?:\?|=)([\d\.]+)$/i);
                break;
        }
    }
};

// 页面DOM结构确定
var tardyMain = function() {
    // 按需执行
    var ALLDONE = function() {
        if (QQ_LIXIAN) {
            QQ_LIXIAN_FUNCTION();
        } else if (QQ_FENXIANG) {
            QQ_FENXIANG_FUNCTION();
        } else if (QQ_FENXIANG) {
            QQ_FENXIANG_FUNCTION();
        } else if (VMALL) {
            VMALL_FUNCTION();
            //文件夹处理
            if (mjQuery('a.btn-open').length) {
                mjQuery('a.btn-open, #address_col a').live('click', function() {
                    mjQuery('#' + UNIQUEID(1) + ', #' + UNIQUEID(2) + ', #' + UNIQUEID(3)).remove();
                    setTimeout(function() {
                        repeater_function(double_Check, 1, 3000);
                        VMALL_FUNCTION();
                    }, 1000);
                    setInterval(function() {
                        if (mjQuery('a.btn-open').length) {
                            mjQuery('#' + UNIQUEID(1) + ', #' + UNIQUEID(2) + ', #' + UNIQUEID(3)).remove();
                        }
                    }, 500);
                });
            }
        } else if (XUNLEI_KUAI) {
            XUNLEI_KUAI_FUNCTION();
        } else if (XUNLEI_JIAYUAN){
            XUNLEI_JIAYUAN_FUNCTION();
        } else if (BAIDU_PAN) {
            BAIDU_PAN_FUNCTION();
            if (BAIDU_PAN_HOME) {
                repeater_function(double_Check, 1, 3000);
                BAIDU_PAN_FUNCTION(1); //hashchange
            }
        } else if (YUN360_PAN) {
            YUN360_PAN_FUNCTION();
        }
        // 旧脚本检查
        repeater_function(double_Check, 1, 3000);
    };
    /*
    var text = 'data:text/plain,' + encodeURIComponent(urls);
    window.open(text);
  // @grant          GM_setClipboard
  // @grant          GM_xmlhttpRequest
  // @grant          GM_addStyle
  if(typeof GM_setClipboard != "undefined"){
    GM_setClipboard(data, 'text');
    alert('已经复制 ' + urls.length +'条下载链接到剪贴板。');
    }
    */

    // 页面加载完成后
    var m = function() {
        // quit if this function has already been called
        if (arguments.callee.done) {
            return '';
        }
        // flag this function so we don't do the same thing twice
        arguments.callee.done = true;
        // kill the timer
        if (c) {
            clearInterval(c);
        }
        // DO STUFF
        //
        ALLDONE();
    };
    /* for Mozilla/Opera9 */
    if (window.document.addEventListener) {
        window.document.addEventListener("DOMContentLoaded", m, false)
    }
    /* for Safari */
    if (UAParser().isOpera || /WebKit/i.test(window.navigator.userAgent)) {
        var c = setInterval(function() {
            if (/loaded|complete/.test(window.document.readyState)) {
                m(); // call the onload handler
            }
        }, 10)
    }
    /* for other browsers */
    window.onload = m;
    //addLoadEvent(m);

    //HASH检查
    // http://stackoverflow.com/questions/9339865/get-the-hashchange-event-to-work-in-all-browsers-including-ie7
    (function(w) {
        if ('onhashchange' in w) {
            if (w.addEventListener) {
                w.addHashChange = function(func, before) {
                    w.addEventListener('hashchange', func, before);
                };
                w.removeHashChange = function(func) {
                    w.removeEventListener('hashchange', func);
                };
                return;
            } else if (w.attachEvent) {
                w.addHashChange = function(func) {
                    w.attachEvent('onhashchange', func);
                };
                w.removeHashChange = function(func) {
                    w.detachEvent('onhashchange', func);
                };
                return;
            }
        }
        var hashChangeFuncs = [],
            oldHref = location.href;
        w.addHashChange = function(func, before) {
            if (typeof func === 'function') hashChangeFuncs[before ? 'unshift' : 'push'](func);
        };
        w.removeHashChange = function(func) {
            for (var i = hashChangeFuncs.length - 1; i >= 0; i--) {
                if (hashChangeFuncs[i] === func) hashChangeFuncs.splice(i, 1);
            }
        };
        setInterval(function() {
            var newHref = location.href;
            if (oldHref !== newHref) {
                oldHref = newHref;
                for (var i = 0; i < hashChangeFuncs.length; i++) {
                    hashChangeFuncs[i].call(w, {
                        'type': 'hashchange',
                        'newURL': newHref,
                        'oldURL': oldHref
                    });
                }
            }
        }, 100);
    })(window);

    // hash
    addHashChange(function() {
        if (BAIDU_PAN && typeof BAIDU_PAN_FUNCTION === 'function') {
            BAIDU_PAN_FUNCTION(1);
        } else if (YUN360_PAN && typeof YUN360_PAN_FUNCTION === 'function') {
            YUN360_PAN_FUNCTION();
        }
    });
};

domReady(function() {
    earlyMain();
});
(function() {
    tardyMain();
})();