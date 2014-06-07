// ==UserScript==
// @grant  			none
// @name 			Clean Google search URL For Firefox&Chrome
// @namespace		http://www.skyfly.org/
// @author			verglas@qq.com <verglas@qq.com> http://www.skyfly.org/
// @developer		verglas
// @contributor		verglas
// @description		清理GOOGLE搜索URL
// @run-at 			document-start
// @include			http://*.google.tld/search*
// @include			https://*.google.tld/search*
// @include			http://*.google.tld/webhp*
// @include			https://*.google.tld/webhp*
// @include			http://*.google.tld/imghp*
// @include			https://*.google.tld/imghp*
// @include			http://*.google.tld/
// @include			https://*.google.tld/
// @include			http://*.google.tld/#*
// @include			https://*.google.tld/#*
// @include        	http://*.google.tld/#*
// @include        	https://*.google.tld/#*
// @include			/^http:\/\/*.google.tld/#.*$/
// @include			/^https:\/\/*.google.tld/#.*$/
// @include			http://*.google.tld/undefined
// @include			https://*.google.tld/undefined
// @include			http://*.google.tld/blank.html
// @include			https://*.google.tld/blank.html
// @include        	http://startpage.com/*
// @include        	https://startpage.com/*
// @include        	http://*.startpage.com/*
// @include        	https://*.startpage.com/*
// @exclude        	http://plus.google.tld/*
// @exclude        	https://plus.google.tld/*
// @icon			http://www.google.com/favicon.ico
// @version 		2.4
// @updateURL		https://userscripts.org/scripts/source/170781.meta.js
// @downloadURL     https://userscripts.org/scripts/source/170781.user.js
// @supportURL		http://www.skyfly.org/
// @homepage		http://www.skyfly.org/
// @contributionURL	https://me.alipay.com/xxx
// @contributionAmount	￥0.00
// ==/UserScript==
// @require			http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js
// @grant          	GM_xmlhttpRequest
// @match        	http://duckduckgo.com/*
// @include        	https://duckduckgo.com/*
// @exclude        	http://maps.google.tld/*
// @exclude        	https://maps.google.tld/*
//document-end document_idle document-body document-start
// @include        /^https?:\/\/www\.google\.[^\/]+?\/(#.*|imghp.*|webhp.*|search\?.*)?$/

var scriptRun = function (callback) {
    var script = document.createElement('script');
    script.textContent = '(' + callback.toString() + ')(window);';
    document.body.appendChild(script);
}

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
    //s.id = "verglas_css";
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

//url, {query:{ 'q1':1 }, anchorquery:{ 'top':1 }}
var rebuildUri = function(url, parameters) {
    var o = parseUri.options;
    var strictMode = 0;
    
    o.strictMode = strictMode;
    url = url.replace('&&', '&');//去重
    url = url.replace('?#', '?');//去重
    url = url.replace('#?', '#');//去重
    var items = parseUri(url);
    var query = items[o.q.name];
    var anchorquery = items[o.aq.name];

    if(parameters.query){
        for (var key in parameters.query) {
            if (query.hasOwnProperty(key) && items.query) {
                var re = new RegExp(key + '=([^&?]+)*', "ig");
                items.query = items.query.replace(re, key + '=' + parameters.query[key].toString());
            }else{
                items.query += (items.query ? '&' : '?') + key + '=' + parameters.query[key].toString();
            }
        };
    }

    if(parameters.anchorquery){
        for (var key in parameters.anchorquery) {
            if (anchorquery.hasOwnProperty(key) && items.anchorquery) {
                var re = new RegExp(key + '=([^&?]+)*', "ig");
                items.anchor = items.anchor.replace(re, key + '=' + parameters.anchorquery[key].toString());
            }else{
                items.anchor += (items.anchor ? '&' : '') + key + '=' + parameters.anchorquery[key].toString();
            }
        };
    }

    var uri = '';
    
    if (items.protocol) uri += items.protocol + ':';
    if (strictMode) {
        if (/^(?:[^:\/?#]+:)?\/\//.test(items.source)) uri += '//';
    } else {
        if (/^(?:(?![^:@]+:[^:@\/]*@)[^:\/?#.]+:)?\/\//.test(items.source)) uri += '//';
    }
    
    if (items.authority) {
        if (items.userInfo) {
            if (items.user) uri += items.user;
            if (items.userInfo.indexOf(':') > -1) uri += ':';
            if (items.password) uri += items.password;
            uri += '@';
        }
        if (items.host) uri += items.host;
        if (items.port) uri += items.port;
    }
    
    if (items.relative) {
        if (items.path) {
            if (items.directory) uri += items.directory;
            if (items.file) uri += items.file;
        }
        if (items.query) uri += '?' + items.query;
        if (items.anchor) uri += '#' + items.anchor;
    }
    
    return uri;
}

//获取当前域名
var GOOGLE = false, STARTPAGE = false, DUCKDUCKGO = false;
(function () {
    var nowurl = document.URL || document.location.href;
	var nowurlstring = parseUri(nowurl);
	if (nowurlstring.host.indexOf('google.') !== -1){
		GOOGLE = true;
	}else if(nowurlstring.host.indexOf('startpage.') !== -1){
		STARTPAGE = true;
	}else{
		DUCKDUCKGO = true;
	}
})(GOOGLE, STARTPAGE, DUCKDUCKGO);

//获取真实参数
var getURLParameter = function (urlstring, key) {
    return (urlstring.queryKey[key] || urlstring.anchorqueryKey[key]) ? (urlstring.anchorqueryKey[key] ? urlstring.anchorqueryKey[key] : urlstring.queryKey[key]) : '';
};

//拼接当前搜索链接
var getSearURL = function (q) {
    var ggbqfq = document.getElementById('gbqfq'); //input
    var q = q || ggbqfq.value,
        nowurl = document.URL || document.location.href;
    nowurl = nowurl.replace('&btnG=', '');
    return cleanurl(nowurl).replace(/^(.*?)(\/search\?q=.*)*$/ig, "$1") + '/search?q=' + encodeURIComponent(q);
}

//常用函数

//http://phpjs.org/functions/strip_tags/
var strip_tags = function (input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

//var strippedEvents = [ "onclick", "onmousedown", "onmouseup", "onkeypress", "onkeydown", "onkeyup" ];
//for (var i in strippedEvents){
//	x[strippedEvents[i]] = null;
//}

//清洁URL
var cleanurl = function (url) {
    var nowurlstring = parseUri(url);
    var q = getURLParameter(nowurlstring, 'q');
    if (!q) {
        return url;
    }
    var start = (nowurlstring.anchorqueryKey.q && !isNaN(parseInt(nowurlstring.anchorqueryKey.start))) ? parseInt(nowurlstring.anchorqueryKey.start) : ((!nowurlstring.anchorqueryKey.q && nowurlstring.queryKey.start) ? nowurlstring.queryKey.start : '');
    var tbm = getURLParameter(nowurlstring, 'tbm'),
        tbs = getURLParameter(nowurlstring, 'tbs'),
        cr = getURLParameter(nowurlstring, 'cr');
    if (tbm === 'isch') {
        var biw = getURLParameter(nowurlstring, 'biw'),
            bih = getURLParameter(nowurlstring, 'bih'),
            imgrc = getURLParameter(nowurlstring, 'imgrc');
    }
    var path = nowurlstring.path === '/webhp' ? '/search' : nowurlstring.path;
    /*
	var sout = getURLParameter(nowurlstring, 'sout'), newwindow = getURLParameter(nowurlstring, 'newwindow'), btnG = getURLParameter(nowurlstring, 'btnG');
	*/
    return (nowurlstring.protocol ? nowurlstring.protocol + '://' : '') + nowurlstring.host + (nowurlstring.port ? ':' + nowurlstring.port : '') + path + '?q=' + q + (start ? '&start=' + start : '') + (tbm ? '&tbm=' + tbm : '') + (tbs ? '&tbs=' + tbs : '') + (cr ? '&cr=' + cr : '') + (biw ? '&biw=' + biw : '') + (bih ? '&bih=' + bih : '') + (imgrc ? '#imgrc=' + imgrc : '');
    //'&newwindow=' + newwindow + '&btnG=' + btnG
};

//跳转
function earlyMain() {
    //清洁前
    var nowurl = document.URL || document.location.href;
    nowurl = nowurl.replace('&btnG=', '');
    //清洁后
    var nownewurl = cleanurl(nowurl);
    nownewurl = nownewurl.replace(/(.*\/)?undefined$/ig, "$1");
    nownewurl = nownewurl.replace(/(.*\/)?blank\.html$/ig, "$1");
    nownewurl = nownewurl.replace('/?q=', '/search?q=');
    if (nowurl !== nownewurl) {
        location.replace(nownewurl);
    }
}

//去跟踪，分页优化，检查HASH跳转
function tardyMain() {

    //分页
    var fixPageNavcnt = function () {
        var myProtocol = document.location.protocol,
            myHost = document.location.host,
            myPort = document.location.port;
        var links = document.querySelectorAll("#navcnt td a");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var href = myProtocol + '//' + myHost + (myPort ? ':' + myPort : '') + link.getAttribute("href");
            link.setAttribute("href", cleanurl(href));
            //link.setAttribute("target", "_blank");
            link.onclick = function (event) {
                event = event || window.event;
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
            }
        }
    };

    //搜索框处理
    var fixInputSearch = function () {
        var ggbqf = document.getElementById('gbqf'); //form
        var ggbqfq = document.getElementById('gbqfq'); //input
        var ggbqfb = document.getElementById('gbqfb'); //btnG
        /*
        var hiddens = document.querySelectorAll("#gbqf input[type='hidden']");
        for (var i = 0; i < hiddens.length; i++) {
            var hidden = hiddens[i];
            hidden.parentNode.removeChild(hidden);
        }
		var siblings = ggbqfq.parentNode.children;
		for(var i = siblings.length; i--;) {
			if(siblings[i] !== ggbqfq){
			//if(siblings[i].getAttribute("id")!=='gbqfq'){
				siblings[i].parentNode.removeChild(siblings[i]);
			}
		}
		*/
        //回车
        ggbqfq.onkeydown = function (event) {
            event = event || window.event;
            if (event.which === 13 || event.keyCode === 13) {
                location.replace(getSearURL());
                return false;
            }
            return true;
        }
        //提交事件
        ggbqf.setAttribute("onsubmit", "");
        ggbqf.onsubmit = function (event) {
            event = event || window.event;
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
            location.replace(getSearURL());
        }
        //搜索按钮
        ggbqfb.onclick = function () {
            location.replace(getSearURL());
            return false;
        }
    };

    //搜索关键字提示,提示搜索图片,提示搜索视频BUG,提示相关搜索,顶部导航,底部更多,更多新闻
    var fixSearchTip = function () {
        var links = document.querySelectorAll("a.spell, a.spell_orig, h3.r.inl a, div.brs_col a, a.gbzt, #ofr a, span.tl a");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var href = link.getAttribute("href");
            link.setAttribute("href", cleanurl(href));
            link.setAttribute("onmousedown", "");
            link.setAttribute("onclick", "");
            //link.setAttribute("target", "_blank");
            link.onclick = function (event) {
                event = event || window.event;
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
            }
        }
    };

    //搜索下拉框（排序，时间，类型）,clear
    var fixSelectUl = function () {
        var links = document.querySelectorAll("#hdtbMenus a.q.qs");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var href = link.getAttribute("href");
            link.setAttribute("href", cleanurl(href));
            link.setAttribute("onmousedown", "");
            //link.setAttribute("target", "_blank");
            link.onclick = function (event) {
                event = event || window.event;
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
            }
        }
        var clearlink; //document.querySelector('#hdtb_rst');
        if ((clearlink = document.getElementById("hdtb_rst")) !== null) {
            var data_url = clearlink.getAttribute("data-url");
            clearlink.setAttribute("data-url", cleanurl(data_url));
            clearlink.setAttribute("onclick", "");
            clearlink.onclick = function (event) {
                event = event || window.event;
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
                location.replace(data_url);
            }
        }
    }

    //链接优化显示directorySub
    //http://userscripts.org/scripts/source/126883
    var Linkify = function () {
        var indent = 1;         //set to 0 for no indentation animation
        var marginPix = 8;      //number of pixels to indent
        var marginCount = 10;   //number of steps that are run to complete indentation
        var whiteSpaces = 2;    //number of whitespaces that show up between the links
        var linkColor = "green";
        //contains from mike hall, brainjar.com
        var contains = function(a, b) {
          // Return true if node a contains node b.
          while (b.parentNode)
            if ((b = b.parentNode) == a)
              return true;
          return false;
        }
		//fadeInMargin Adapted from www.hesido.com
		var fadeInMargin = function (element){
			if (element.intFunction)
				window.clearInterval(element.intFunction);
			var count = 0;
			element.intFunction = window.setInterval(
				function() {
					element.currentWidth = easeInOut(0, marginPix, marginCount, count, 0.5);
					element.style.marginLeft = element.currentWidth+"px";
					count++;
					if (count > marginCount) {
						window.clearInterval(element.intFunction);
					}
				}
			, 5);
		}
		//fadeOutMargin Adapted from www.hesido.com
		var fadeOutMargin = function (element){
			if (element.intFunction)
				window.clearInterval(element.intFunction);
			var count = 0;
			element.intFunction = window.setInterval(
				function() {
					element.currentWidth = easeInOut(marginPix, 0, marginCount, count, 0.5);
					element.style.marginLeft = element.currentWidth+"px";
					count++;
					if (count > marginCount) {
						window.clearInterval(element.intFunction);
					}
				}
			, 8);
		}
		//Generic Animation Step Value Generator By www.hesido.com
		var easeInOut = function (minValue,maxValue,totalSteps,actualStep,powr) {
			var delta = maxValue - minValue;
			var stepp = minValue+(Math.pow(((1 / totalSteps) * actualStep), powr) * delta);
			return Math.ceil(stepp)
		}
		var hover = function(){
            if (indent) fadeInMargin(this);
		}
		var leave = function(){
            if (window.event) {
                current = this;
                related = window.event.toElement;
            }
            else {
                current = event.currentTarget;
                related = event.relatedTarget;
            }

            if (current != related && !contains(current, related)) {
                //this.textContent = linkListOrig[this.id];
                if (indent) fadeOutMargin(this);
            }
		}
		
        var cites = document.querySelectorAll('div.f.kv cite');
        var links = document.querySelectorAll('h3 a');
        for (var i = 0; i < cites.length; i++) {
            var href = links[i].getAttribute("href");
            //if(href.substr(0,1)==='/'){BUG
            var tempa = '', uri = parseUri(href);
            var len = Object.keys(uri.directorySub).length;
            if(len){
                cites[i].innerHTML = '';
            }else{
                continue;
            }
            for (var j = 0; j < Object.keys(uri.directorySub).length; j++) {
                var preurl = (uri.protocol ? uri.protocol : 'http') + '://' + uri.host + (uri.port ? ':' + uri.port : '');
				var a = document.createElement('a');
				var linkText = document.createTextNode((j>1 ? '/' : '') + uri.directorySub[j]['key']);
				a.appendChild(linkText);
				a.href = preurl + uri.directorySub[j]['val'];
				a.target = '_blank';
                a.setAttribute('style', 'color: ' + linkColor);
				a.addEventListener('mouseover', hover, false);
				a.addEventListener('mouseout', leave, false);
				fadeInMargin(a);
                //tempa += (tempa ? '/' : '') + a.outerHTML;
                cites[i].appendChild(a);
            }
        }
    }

	//添加favicon
	//fix from http://userscripts.org/scripts/review/58177
	var addFaviconNubmer = function(){
		injectStyle(".favicon {\
			padding-right: 4px;\
			vertical-align: middle;\
			border: none;\
		}\
		#res .favicon {\
			left: -20px;\
			position: absolute;\
			top: 2px;\
			z-index: 9;\
		}\
		div.vsc {\
			position: relative;\
		}\
		div.vsc img.favicon {\
			position: absolute !important;\
			top: 0;\
			left: -20px !important;\
		}\
		span.number{\
			text-decoration: none;\
			font-family: sans-serif;\
			font-size: 0.85em;\
			margin: auto 2px;\
			border: 1px solid #ccc;\
			border-radius: 4px;\
			padding: 2px 3px;\
			cursor: pointer;\
		}\
		");

		var FAVICON_GRABBER = 'https://www.google.com/s2/favicons?domain='; // 'http://favicon.yandex.net/favicon/'
		var links = document.querySelectorAll('h3 a');
		for (var i=0; i<links.length; i++) {
			if (links[i].getElementsByTagName('span')[0] === undefined || links[i].getElementsByTagName('span')[0].className != 'number'){
			//if (links[i].firstChild.className != 'favicon') {
				var span = document.createElement('span');
				span.className = 'number';
				var number = document.createTextNode(i+1);
				span.appendChild(number);
				var host = links[i].href.replace(/.*https?:\/\//, '').replace(/\/.*$/,'');
				var img = document.createElement('IMG');
				img.src = FAVICON_GRABBER + host;
				img.width = '16';
				img.height = '16';
				img.className = 'favicon';
				links[i].insertBefore(img, links[i].firstChild);
				links[i].insertBefore(span, img);
			}
		}
	}

	//添加cache,,share,+site,-site
	var addDiyUrl = function(){
		var lis = document.querySelectorAll('div.rc');
		var nextelem = function(elem){
			do {
				elem = elem.nextSibling;
			} while (elem && elem.nodeType !== 1);
			return elem;        
		}
		injectStyle("a.ab_li {\
			background-color: #FCFCFC;\
			background-position: center center;\
			background-repeat: no-repeat;\
			border: 1px solid #CCCCCC;\
			border-radius: 4px 4px 4px 4px;\
			color: #555555;\
			font-family: sans-serif;\
			font-size: 0.85em;\
			margin: auto 2px;\
			padding: 2px 3px;\
			text-decoration: none;\
		}\
		");
		var ggbqfq = document.getElementById('gbqfq'); //input
		var q = ggbqfq.value;
		for (var i=0; i<lis.length; i++) {
			//cached, similar
			var str='', ahref = '', bhref = '', chref = '', zhref = '', dropdown = document.querySelectorAll('div.action-menu-panel.ab_dropdown')[i];
			if(dropdown){
				var alist = dropdown.querySelectorAll('li a');
				for (var j=0; j<alist.length; j++) {
                    if (alist[j].innerHTML.toLowerCase() == "cached" || alist[j].innerHTML.toLowerCase() == "similar"){
					   var href = alist[j].getAttribute("href");
					   str += '<a class="ab_li" href="' + href + '">' + ('textContent' in alist[j] ? alist[j].textContent : alist[j].innerText) + '</a>';
                    }
				}
			}
			//And, OR, NOT
			var nowurl = document.querySelectorAll('h3 a')[i];
			var nowurlstring = parseUri(nowurl);//host
			if(q.indexOf(' site:') !== -1){
				ahref = getSearURL(q.replace(/(site:[^\s]+)/ig, "$1 AND site:" + nowurlstring.host));
				bhref = getSearURL(q.replace(/(site:[^\s]+)/ig, "$1 OR site:" + nowurlstring.host));
				chref = getSearURL(q.replace(/(site:[^\s]+)/ig, "$1 AND -site:" + nowurlstring.host));
			}else{
				ahref = getSearURL(q + " site:" + nowurlstring.host);
				bhref = getSearURL(q + " site:" + nowurlstring.host);
				chref = getSearURL(q + " -site:" + nowurlstring.host);
			}
			zhref = getSearURL();
			str += '<a role="button" class="ab_li" href="' + ahref + '">And Site</a>';
			str += '<a role="button" class="ab_li" href="' + bhref + '">Or Site</a>';
			str += '<a role="button" class="ab_li" href="' + chref + '">Not Site</a>';
			str += '<a role="button" class="ab_li" href="' + zhref + '">All Site</a>';
			//bug to use Schmoogle
			if(nextelem(lis[i]) && nextelem(lis[i]).tagName.toLowerCase()==='div'){
				nextelem(lis[i]).innerHTML = str;
			}else{
				var div = document.createElement('div');
				div.setAttribute('style', 'padding-top: 5px;font-family:arial,​sans-serif;font-size:13px;color:#222222;line-height:15.6px;padding-top:5px');
				div.innerHTML = str;
				document.querySelectorAll('li.g')[i].appendChild(div);
			}
		}
	};
	
	//快速时间选择
	//https://userscripts.org/scripts/source/170781
	var addDiyTime = function(){
		if (document.getElementsByTagName("SELECT").length) {
			return;
		}
		var btn = document.getElementsByName("btnG")[0];
		if (!btn) {
			return;
		}
		var btnDiv = document.getElementById('gbqfbw');
		btnDiv.setAttribute("style", "white-space:nowrap");
		var nowurl = document.URL || document.location.href;
		var nowurlstring = parseUri(nowurl);
		var tbs = getURLParameter(nowurlstring, 'tbs');
		var selected = tbs.match(/qdr:([a-z])([0-9]+)/) || [];
		var selNum = document.createElement("select");
		selNum.appendChild(document.createElement("option"));
		for (var i = 1; i < 60;) {
			var opt = document.createElement("option");
			opt.appendChild(document.createTextNode(i));
			if (i == selected[2]) {
				opt.selected = true;
			}
			selNum.appendChild(opt);
			if (i < 10) {
				i++;
			} else {
				i += 10;
			}
		}
		btnDiv.appendChild(selNum);
		var selUnit = document.createElement("select");
		var units = {}, suffix = "";
		if(navigator.language == "zh-CN") {
			units = { s: "秒", n: "分", h: "时", d: "日", w: "周", m: "月", y: "年" };
			suffix = " 以内";
		} else {
			units = { s: "second", n: "minute", h: "hour", d: "day", w: "week", m: "month", y: "year" };
			suffix = "(s)";
		}
		for (var val in units) {
			opt = document.createElement("option");
			opt.setAttribute("value", val);
			opt.appendChild(document.createTextNode(units[val] + suffix));
			if (val == selected[1]) {
				opt.selected = true;
			}
			selUnit.appendChild(opt);
		}
		if (!selected[1]) {
			selUnit.selectedIndex = 5;
		}
		btnDiv.appendChild(selUnit);
		btn.addEventListener("click", function() {
			if (!selNum.selectedIndex && !selected) {
				return;
			}
			var url = "/search?q=";
			url += encodeURIComponent(document.getElementsByName("q")[0].value);
			if (selNum.selectedIndex) {
				var qdr = "qdr:" + selUnit.options[selUnit.selectedIndex].value;
				qdr += selNum.options[selNum.selectedIndex].text;
				url += "&tbs=" + qdr;
			}
			url += location.href.match(/&tbm=[a-z]+/) || "";
			url += location.href.match(/&hl=[-a-z]+/i) || "";
			url += location.href.match(/&lr=lang_[-a-z]+/i) || "";
			setTimeout(function() { location.href = url; }, 800);
			return false;
		}, true);
	}

	//跳转清理函数
    var cleanGoogleUrl = function (url) {
        var uri = parseUri(url);
        if (uri.host.match(/^www\.google\..+$/) && uri.path == "/url" && uri.query && uri.queryKey.url) {
            return unescape(uri.queryKey.url);
        } else {
            return url;
        }
    };

	//跳转清理 BUG
    var removeRedirector = function () {
        var links = document.querySelectorAll("#res a, #rhs a");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var href = link.getAttribute("href");
            link.setAttribute("href", cleanGoogleUrl(href));
            link.setAttribute("onmousedown", "");
        }
        fixPageNavcnt(); //分页
        GOOGLE && fixInputSearch(); //搜索框处理
        fixSearchTip(); //搜索关键提示
        fixSelectUl(); //搜索选项
        Linkify(); //结果链接处理
		!DUCKDUCKGO && addFaviconNubmer();//添加favicon和顺序编号
		GOOGLE && addDiyUrl();//DIY
		//GOOGLE && addDiyTime();//时间快速选择
    };

    /*
    var evtName = function(){
        var mutationEvtName;
        if (window.chrome) {
            mutationEvtName = 'DOMNodeInserted';
        } else {
            mutationEvtName = 'DOMAttrModified';
        }
        document.addEventListener(mutationEvtName, removeRedirector, false);
    }
    if(document.body){
        removeRedirector();
    }else{
        document.addEventListener('DOMContentLoaded', removeRedirector, false);
    }
    */
    var m = function () {
        if (arguments.callee.done) {
            return
        }
        arguments.callee.done = true;
        if (c) {
            clearInterval(c)
        }
        removeRedirector();
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

    //HASH检查
    // http://stackoverflow.com/questions/9339865/get-the-hashchange-event-to-work-in-all-browsers-including-ie7
    (function (w) {
        if ('onhashchange' in w) {
            if (w.addEventListener) {
                w.addHashChange = function (func, before) {
                    w.addEventListener('hashchange', func, before);
                };
                w.removeHashChange = function (func) {
                    w.removeEventListener('hashchange', func);
                };
                return;
            } else if (w.attachEvent) {
                w.addHashChange = function (func) {
                    w.attachEvent('onhashchange', func);
                };
                w.removeHashChange = function (func) {
                    w.detachEvent('onhashchange', func);
                };
                return;
            }
        }
        var hashChangeFuncs = [],
            oldHref = location.href;
        w.addHashChange = function (func, before) {
            if (typeof func === 'function') hashChangeFuncs[before ? 'unshift' : 'push'](func);
        };
        w.removeHashChange = function (func) {
            for (var i = hashChangeFuncs.length - 1; i >= 0; i--) {
                if (hashChangeFuncs[i] === func) hashChangeFuncs.splice(i, 1);
            }
        };
        setInterval(function () {
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

    addHashChange(function () {
        //removeRedirector();
        earlyMain();
    });

    /*
	// http://simplapi.wordpress.com/2012/08/20/checking-an-url-hash-change-in-javascript/
    var onHashChange = function(callback){
        var __previousHash = null;
        var __callback = (typeof(callback) === "function") ? callback : null;
        this.checkHash = function(noCallback){
            var currentHash = (window.location.hash) ? window.location.hash.substring(1) : null;
            if(__previousHash !== currentHash){
                if(__callback !== null && noCallback !== true){
                    __callback(currentHash, __previousHash);
                }
                __previousHash = currentHash;
            }
        }.bind(this);

        this.checkHash(true);

        if(typeof(window.onhashchange) !== "undefined" && (document.documentMode === undefined || document.documentMode > 7)){
            window.onhashchange = this.checkHash;
        }else{
            setInterval(this.checkHash, 500);
        }
    }
    onHashChange(removeRedirector);
    //onHashChange(earlyMain);
	*/
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
})()