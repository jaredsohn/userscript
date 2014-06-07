// ==UserScript==
// @grant  unsafeWindow
// @name 			remove iframe For Firefox&Chrome
// @namespace		http://www.skyfly.org/
// @author			verglas@qq.com <verglas@qq.com> http://www.skyfly.org/
// @developer		verglas
// @contributor		verglas
// @description		移除框架广告
// @match			http://*/*
// @match			https://*/*
// @require			http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js
// @icon			http://www.shangyou.info/favicon.ico
// @version 		1.0
// @updateURL		https://userscripts.org/scripts/source/152280.meta.js
// @downloadURL     https://userscripts.org/scripts/source/152280.user.js
// @supportURL		http://www.skyfly.org/
// @homepage		http://www.skyfly.org/
// @contributionURL	https://me.alipay.com/xxx
// @contributionAmount	￥0.00
// ==/UserScript==
// //run-at document-start document-end
var injectScript = function (fn) {
    var script = document.createElement('script');
    script.textContent = '(' + fn.toString() + '());';
    document.body.appendChild(script);
    document.body.removeChild(script);
    //document.getElementsByTagName('head')[0].appendChild(script);
    //(document.body || document.head || document.documentElement).appendChild(script);
};

var injectStyle = function (cssstr) {
    var s = document.createElement("style");
    s.id = "verglas_css";
    s.type = "text/css";
    s.textContent = cssstr;
    document.head.appendChild(s);
}

var injectIframe = function (fn) {
    var fnName = 'dynamic_fn_' + (new Date()).getTime(),
        iframe = document.createElement('iframe');
    iframe.onload = function () {
        parent.window[fnName] = new Function('(' + fn.toString() + '());');
        parent.window[fnName]();
        parent.document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
};

var gm_win = (function () {
    var a;
    try {
        a = unsafeWindow === window ? false : unsafeWindow;
    } finally {
        return a || (function () {
            var e = document.createElement('p');
            e.setAttribute('onclick', 'return window;');
            return e.onclick();
        }());
    }
}());

//var $ = gm_win.jQuery;
//location.href="javascript:(function(){window.setConfigOption=function(){ console.log(1); }})()"
//location.href="javascript:(function(){" + myFunc + "})()";
//myFunc();

function main() {
    var inArray = function (needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle) return true;
        }
        return false;
    }
    var displaynone = function () {
        var style = document.createElement('style');
        style.type = "text/css", style.id = "antiClickjack";
        'cssText' in style ? style.cssText = "body{display:none !important;}" : style.innerHTML = "body{display:none !important;}";
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    var strpos = function (haystack, needle, offset) {
        var i = (haystack + '').indexOf(needle, (offset || 0));
        return i === -1 ? false : i;
    }
    //一些需要过滤的协议
    var ui, notQuestionUrls = ['mailto:', 'javascript:', '#', '//', 'file://', 'irc://', 'ircs://', 'irc6://', 'gopher://', 'telnet://', 'nntp://', 'ssh://',
            'worldwind://', 'mailto:', 'news:', 'svn://', 'git://', 'mms://', 'ldap://', 'notes://',
            'wais:', 'prospero:', 'aim:', 'w‌​ebcal', 'tel:', 'urn:', 'nntp:', 'view-source:', 'about:', 'aaa://', 'aaas://', 'acap://',
            'adiumxtra://', 'afp:/', 'apt:', 'attachment:/', 'aw://', 'beshare://', 'bitcoin:', 'bolo://', 'callto:', 'chrome://',
            'chrome-extension://', 'cid:', 'content://', 'crid://', 'cvs://', 'data:', 'dav:', 'dict://', 'dns:', 'ed2k://',
            'facetime://', 'fax:', 'feed:', 'finger://', 'fish://', 'geo:', 'gg:', 'gizmoproject://', 'go:', 'gtalk:', 'h323:',
            'hcp://', 'iax:', 'im:', 'imap://', 'itms:', 'jar:', 'keyparc://', 'lastfm://', 'magnet:?xt=', 'maps:', 'market://',
            'message:', 'mid:', 'mms://', 'ms-help://', 'msnim:', 'mumble://', 'mvn:', 'palm:', 'paparazzi:', 'platform:/',
            'pop://', 'pres:', 'proxy:', 'psyc:', 'query:', 'res://', 'resource://', 'rmi://', 'rsync://', 'rtmp://', 'opera:',
            'secondlife://', 'session:', 'sftp://', 'sgn://', 'sip:', 'sips:', 'skype:', 'smb://', 'sms:', 'snmp://', 'soldat://',
            'spotify:', 'steam:', 'tag:', 'teamspeak://', 'things:', 'udp://', 'unreal://', 'ut2004://', 'uuid:', 'ventrilo://',
            'wais://', 'webcal://', 'ws:', 'wtai:', 'wyciwyg://', 'xfire:', 'xmpp:', 'xri://', 'ymsgr:', 'z39.50r://', 'z39.50s://',
            'thunder://', 'flashget://', 'flashgetx://', 'qqdl://', 'bc://', 'bctp://', 'fs2you://', 'qvod://', 'gvod://', 'pps://', 'bdhd://',
            'tencent://', 'aliim:', 'wangwang:', 'yahooWW:', 'qqapp://', 'wandoujia://', 'twitter://', 'localch://', 'tweetlogix:///',
            'x-seesmic://', 'zentap://', 'wavittabularasa://', 'whereto://', 'wpp://', 'waze://', 'wavitxxx://', 'tikisurf://', 'threadnote://',
            'keyboard://', 'zentappro://', 'terminology://', 'wikiamo://', 'unfragment://', 'twitterrific://', 'twit://', 'tweetie://',
            'timer://', 'tomtomhome://', 'timelog://', 'surfboard://', 'checkit://', 'ships2://', 'roundtuit://', 'purecalc://', 'portscan://',
            'bookpedia://', 'cdpedia://', 'gamepedia://', 'dvdpedia://', 'pinit12://', 'pic2shop://', 'ohttp://', 'ohttps://', 'oftp://',
            'reserve://', 'notitas://', 'navigon://', 'loanplan://', 'junospulse://', 'inrixtraffic://', 'itranslate://', 'imagedata://',
            'imdb://', 'geopherlite://', 'fb://', 'gcbuddy://', 'eureka://', 'explorimmo://', 'twitterfonpro://', 'exposure://', 'dailymotion://',
            'com-innerfence-ccterminal://', 'cobitools://', 'cartographer://', 'cheapcalls://', 'callrec://', 'BookmarkersPro://', 'Bookmarkers://',
            'appigotodo://', 'amb://', 'alocola://', 'airsharing://', 'itms-books://', 'maps://', 'feed://'
        ] || [];
    var uilen = notQuestionUrls.length;
    var addQuestionToURL = function (url) {
        var add = true;
        for (ui = 0; ui < uilen; ++ui) {
            if (url && (strpos(String(url).toLowerCase(), notQuestionUrls[ui]) === 0)) {
                add = false;
                break;
            }
        }
        if (url && add) {
            url = (url.indexOf("?") != -1 ? url : (url.indexOf("#") != -1 ? url.split("#")[0] + "?#" + url.split("#")[1] : url + '?'));
        }
        return url;
    }
    var getHashParams = function () {
        var hashParams = {};
        var e,
            a = /\+/g, // Regex for replacing addition symbol with a space
            r = /([^&;=]+)=?([^&;]*)/g,
            d = function (s) {
                return decodeURIComponent(s.replace(a, " "));
            },
            q = window.location.hash.substring(1);
        while (e = r.exec(q))
            hashParams[d(e[1])] = d(e[2]);
        return hashParams;
    }
    //网站白名单
    var whiteHostList = ['www.115.com', '115.com', 'open.taobao.com', 'kuaidi100.com', 'www.kuaidi100.com', 'bus.aibang.com', 'local.msn.com', 'www.sh.10086.cn', 'www.codecademy.com', 'www.8tdc.com.cn'] || [];
    //框架事件黑名单
    var killIframeOnloadFunctionList = ['iframe_loaded_callback();'] || [];
    var host = document.referrer.match("^(?:([^:/?#]+):)?(?://(?:([^/?#]*)@)?([^/?#:@]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$", 'i')[3];
    var i, frames, frameslen, myProtocol = document.location.protocol,
        myHost = document.location.host,
        myHostHref = document.location.href;
    var myHostHrefPos = strpos(myHostHref, '#');
    var poundString = window.location.hash; //myHostHref.substr(myHostHrefPos);
    myHostHref = myHostHref.substr(0, myHostHrefPos);
    if (host === myHost || !host) {
        frames = window.parent.document.getElementsByTagName("iframe");
        frameslen = frames.length;
        outer_loop: for (i = 0; i < frameslen; ++i) {
            if (frames[i].src.indexOf(myHostHref + '?') != -1 && typeof (frames[i].attributes['onload']) != 'undefined' && inArray(frames[i].attributes['onload'].value, killIframeOnloadFunctionList)) {
                switch (inArray(myHost, whiteHostList)) {
                case true:
                    //如果白名单被框架
                    displaynone();
                    window.top.location.href = myProtocol + myHost + poundString;
                    //window.top.location.href = myHostHref + poundString;
                    break outer_loop;
                    break;
                case false:
                    displaynone();
                    window.top.location.href = frames[i].src + poundString;
                    break outer_loop;
                    break;
                default:
                    break;
                }

            }
            //remove onload event
            if (typeof (frames[i].attributes['onload']) != 'undefined') {
                frames[i].attributes['onload'].value = '';
            }
        }
    }
    var addquestioncallback = function () {
        var i, aarray = document.getElementsByTagName('a'),
            len = aarray.length;
        for (i = 0; i < len; ++i) {
            aarray[i].href = addQuestionToURL(aarray[i].href);
        }
    }
    timeout = setTimeout(function () {
        addquestioncallback();
    }, 500);
}

(function () {
    //'use strict';
    setTimeout(function () {
        //gm_win.addEventListener ("DOMContentLoaded", function() {
        injectScript(main);
        //}, false);
    }, 0);
})();