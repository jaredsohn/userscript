// ==UserScript==
// @grant               none
// @name                维品会刷啊刷
// @namespace           http://www.skyfly.org/
// @author              verglas@qq.com <verglas@qq.com> http://www.skyfly.org/
// @developer           verglas
// @contributor         verglas
// @description         那啥维品会的刷商品余量的
// @match               http://www.vip.com/detail-*
// @require             http://upcdn.b0.upaiyun.com/libs/jquery/jquery-1.8.3.min.js
// @icon                http://www.shangyou.info/favicon.ico
// @version             0.1
// @updateURL           https://userscripts.org/scripts/source/xxx.meta.js
// @downloadURL         https://userscripts.org/scripts/source/xxx.user.js
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
var M_TIMESTAMP = function(y, m, d){
	//var min_date = new Date(-100000000*86400000);
	//var max_date = new Date( 100000000*86400000);
	var date = new Date(TIMESTAMP());
	var startOfDay = new Date(date.getFullYear() + parseInt(typeof(y)==='undefined' ? '0' : y) , date.getMonth() + parseInt(typeof(m)==='undefined' ? '0' : m), date.getDate() + parseInt(typeof(d)==='undefined' ? '0' : d));
	return startOfDay.getTime();
};

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
var QQ_ZONE = false;
var URL_OBJECT, NOWHOST;
(NOWHOST = function() {
    var nowurl = document.URL || document.location.href;
    URL_OBJECT = parseUri(nowurl);
    switch (URL_OBJECT.host) {
		
        default:
			QQ_ZONE = true;
            break;
    }
})();



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
};

// 页面DOM结构确定
var tardyMain = function() {
    // 按需执行
    var ALLDONE = function() {
        if (QQ_ZONE) {
            var time1 = time2 =  '';
            time1 = setTimeout(function(){//setInterval
                if($('#J_maybeLike_wrap').length){
                    //mjQuery("#veditor1_Iframe").load(function (){
                    time2 = setTimeout(function(){//setInterval
                        window.location.reload();
                    }, 1000);
                }else{
                    clearTimeout(time1);
                    clearTimeout(time2);
                    alert('有东西了');
                }
            }, 1000*3);
        }
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

    });
};

domReady(function() {
    earlyMain();
});
(function(){
	tardyMain();
})();