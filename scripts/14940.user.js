// ==UserScript==
// @name          AutoFocus
// @namespace     http://d.hatena.ne.jp/samurai20000/
// @description	  auto focus on where you wish
// @include       http://*
// @include	  https://*
// @version       0.0.7
// ==/UserScript==
//
// this script based on autopagerize.user.js
// thanks to id:swdyh
//

const CACHE_EXPIRE = 24 * 60 * 60 * 1000;
const SITEINFO_URLS = ['http://wedata.net/databases/AutoFocus/items.json'];
const XHR_TIMEOUT = 30 * 1000;
const SITEINFO = [
    /* sample
    {
	url:   'http://reader\\.livedoor\\.com/',
	focus: '//div[@id="login"]/h3/a'
    }
    */
    /* templete
    {
	url:   '',
	focus: ''
    }
    */
];

var AutoFocus = function(info) {
    var focus_element = getFocusElementByXpath(info.focus);
    focus_element.focus();
};

var launchAutoFocus = function(list) {
    add_focus_style();
    if (!reloaded()) {
        for (var i = 0; i < list.length; i++) {
            try {
	        if (!af && location.href.match(list[i].url) &&
	            getFocusElementByXpath(list[i].focus)) {
		        af = new AutoFocus(list[i]);
	        }
                window.name = window.location.href;
	    } catch(e) {
	        log(e);
	        continue;
	    }
        }
    }
};


var getsiteinfo = function(urls) {
    var xhrStates = {};
    cacheInfo = getCache();
    urls.forEach(function(i) {
	if(!cacheInfo[i] || cacheInfo[i].expire < new Date()) {
	    var opt = {
		method  : 'get',
		url     : i,
		onload  : function(res) {
                    xhrStates[i] = 'loaded';
                    getCacheCallback(res, i);
                },
		onerror : function(res) {
                    xhrStates[i] = 'error';
                    getCacheErrorCallback(i);
                }
	    };
            xhrStates[i] = 'start';
	    GM_xmlhttpRequest(opt);
            setTimeout(function() { if (xhrStates[i] == 'start') { getCacheErrorCallback(i); }} , XHR_TIMEOUT);
	}
	else {
	    launchAutoFocus(cacheInfo[i].info);
	}
    });
};

var add_focus_style = function() {
    // based on http://userstyles.org/styles/305
    var css = 'a:hover:active {color: #10bae0;}' +
              'a:not(:hover):active {  color: #0000ff;}' +
              '*:focus {-moz-outline: 4px solid -moz-rgba(16,186,224,0.3) !important;-moz-outline-offset: 1px !important;-moz-outline-radius: 3px !important;}' +
              'button:focus,input[type="reset"]:focus,input[type="button"]:focus,input[type="submit"]:focus,input[type="file"] > input[type="button"]:focus {-moz-outline-radius: 5px !important;}' +
              'button:focus::-moz-focus-inner {border-color: transparent !important;}' +
              'button::-moz-focus-inner,input[type="reset"]::-moz-focus-inner,input[type="button"]::-moz-focus-inner,input[type="submit"]::-moz-focus-inner,input[type="file"] > input[type="button"]::-moz-focus-inner {border: 1px dotted transparent !important;}' +
              'textarea:focus, button:focus, select:focus, input:focus {-moz-outline-offset: -1px !important;}' +
              'input[type="radio"]:focus {-moz-outline-radius: 12px;-moz-outline-offset: 0px !important;}' +
              'a:focus {-moz-outline-offset: 0px !important;}';

    addstyle(css);
};


// utility SITE_INFO
function parseInfo(str) {
    var lines = str.split(/\r?\n|\r/);
    var strip = str.replace(/^\s+|\s+$/g, '');
    var re = /^([^:]+?):(.*)$/;
    var info = {};
    lines.forEach(function(line) {
	if (re.test(line)) {
	    info[RegExp.$1] = RegExp.$2.replace(/^\s+/, '');
	}
    });

    var isValid = function(info) {
	return !['url', 'focus'].some(function(property) {
	    return !info.hasOwnProperty(property);
	});
    };

    return isValid(info) ? info : null;
}

function clearCache() {
    GM_setValue('cacheInfo', '');
}

function getCache() {
    return eval(GM_getValue('cacheInfo')) || {};
}

function getCacheCallback(res, url) {
    if (res.status != 200) {
	return getCacheErrorCallback(url);
    }
    
    var info
    try {
        info = eval(res.responseText).map(function(i) { return i.data })
    } catch(e) {
        var info      = [];
        var matched   = false;
        var hdoc      = createHTMLDocumentByString(res.responseText);
        var textareas = getElementsByXPath('//*[@class="autofocus_data"]', hdoc) || [];

        textareas.forEach(function(textareass) {
	    var d = parseInfo(textareas.innerHTML);
	    if (!d) return;
	    info.push(d);
	    if (!matched && location.href.match(d.url)) {
	        matched = d;
	    }
        });
    }

    if (info.length > 0) {
	cacheInfo[url] = {
	    urls   : url,
	    expire : new Date(new Date().getTime() + CACHE_EXPIRE),
	    info   : info
	};
	GM_setValue('cacheInfo', cacheInfo.toSource());
        log('cache!');

	if (!af && !!matched) {
	    af = new AutoFocus(matched);
            window.name = window.location.href;
	}
    }
}

function getCacheErrorCallback(url) {
    if (cacheInfo[url]) {
	cacheInfo[url].expire = new Date(new Date().getTime() + CACHE_EXPIRE);
	GM_setValue('cacheInfo', cacheInfo.toSource());
	launchAutoFocus(cacheInfo[url].info);
    }
}

function createHTMLDocumentByString(str) {
    var html     = str.replace(/<!DOCTYPE[ \t\r\n][^>]*>|<html(?:(?=<)|[ \t\r\n]*>|[ \t\r\n][^<>]*(?:>|(?=<)))|<\/html(?:[ \t\r\n>].*)?$/ig, '');
    var htmlDoc  = document.implementation.createDocument(null, 'html', null);
    var fragment = createDocumentFragmentByString(html);
    try {
        fragment = htmlDoc.adoptNode(fragment);
    } catch(e) {
        fragment = htmlDoc.importNode(fragment, true);
    };
    htmlDoc.documentElement.appendChild(fragment);
    return htmlDoc;
}

function createDocumentFragmentByString(str) {
    var range = document.createRange();
    range.setStartAfter(document.body);
    return range.createContextualFragment(str);
}

function getFocusElementByXpath(xpath) {
    var result = document.evaluate(xpath, document, null,
                                   XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return result.singleNodeValue ? result.singleNodeValue: null;
}

function getElementsByXPath(xpath, node) {
    var node = node || document;
    var nodesSnapshot = document.evaluate(xpath, node, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var data = [];
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
	data.push(nodesSnapshot.snapshotItem(i));
    }
    return (data.length >= 1) ? data : null;
}

//this code based ldrize.user.js
function addstyle(css) { 
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'data:text/css,' + escape(css);
    document.documentElement.childNodes[0].appendChild(link);
}

function reloaded() {
    return window.name == window.location.href ? true : false;
}

function log(message) {
    GM_log(message);
}

//main
GM_registerMenuCommand('AutoFocus - clear cache', clearCache)
var af = null;
launchAutoFocus(SITEINFO);
getsiteinfo(SITEINFO_URLS);
