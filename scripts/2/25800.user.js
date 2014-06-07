// ==UserScript==
// @name           AutoTitle
// @namespace      http://d.hatena.ne.jp/schtark/
// @description    extract title string from document
// @include        *
// ==/UserScript==
//
// auther:  schtark http://d.hatena.ne.jp/schtark/
// version: 0.0.2 2008-12-25T07:36:25+09:00
//
// this script based on
// AutoPagerize(http://swdyh.yu.to/) ,
// GoogleAutoPager(http://la.ma.la/blog/diary_200506231749.htm) and
// estseek autopager(http://la.ma.la/blog/diary_200601100209.htm).
// thanks to swdyh and ma.la.
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//

var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml'
var URL = 'http://userscripts.org/scripts/show/25800'
var VERSION = '0.0.2'
var DEBUG = false
var AUTO_START = true
var CACHE_EXPIRE = 24 * 60 * 60 * 1000
var BASE_REMAIN_HEIGHT = 400
var CONCAT_STRING = ' - '
var XHR_TIMEOUT = 30 * 1000
var SITEINFO_IMPORT_URLS = [
    'http://wedata.net/databases/AutoTitle/items.json',
]
var SITEINFO = [
    /* sample
    {
        url:          'http://www.nikkei.co.jp/.+.html',
        topicElement: ['//h3[@class="topNews-ttl3"]'],
        exampleUrl:   'http://www.nikkei.co.jp/kaigai/asia/20080115D2M1501V15.html',
    },
    */
    /* template
    {
        url:          '',
        topicElement:  '',
        exampleUrl:   '',
    },
    */
]
var AutoTitle = function(info) {
    this.pageNum = 1
    this.info = info
    this.state = AUTO_START ? 'enable' : 'disable'
    var self = this
    var topic = null
    var title = null
    var candidate = null

    if (Array.prototype.isPrototypeOf(info.topicElement)) {
        candidate = info.topicElement
    } else {
        candidate = new Array(info.topicElement)
    }
    candidate.forEach(function(xpath) {
        topic = getFirstElementByXPath(xpath)
        if ( topic ) {
            return
        } else {
            debug("getFirstElementByXPath returns null.", xpath)
        }
    })

    if ( !topic ) {
        debug("All XPathes didn't match.")
        return
    }

    title = getFirstElementByXPath('//title')
    if ( !title ) {
        debug('get title element failed')
        return
    }
    title.textContent = topic.textContent + CONCAT_STRING + title.textContent
    document.title = title.textContent
    /*
    var toggle = function() {self.stateToggle()}
    this.toggle = toggle
    GM_registerMenuCommand('AutoTitle - on/off', toggle)
    */
}
AutoTitle.prototype.stateToggle = function() {
    if (this.state == 'enable') {
        this.disable()
    }
    else {
        this.enable()
    }
}

AutoTitle.prototype.enable = function() {
    this.state = 'enable'
}

AutoTitle.prototype.disable = function() {
    this.state = 'disable'
}
AutoTitle.filters = []

var parseInfo = function(item) {
    var info = item.data;
    var arrange = function(val) {
        if (val.match(/^\[.*\]$/)) {
            val = eval(val);
        }
        return val;
    };
    
    info.topicElement = arrange(info.topicElement);
    
    var isValid = function(info) {
        var infoProp = ['url', 'topicElement']
        for (var i = 0; i < infoProp.length; i++) {
            if (!info[infoProp[i]]) {
                return false
            }
        }
        return true
    }
    return isValid(info) ? info : null
}
var launchAutoTitle = function(list) {
    for (var i = 0; i < list.length; i++) {
        try {
            if (!location.href.match(list[i].url)) {
            }
            else {
                at = new AutoTitle(list[i])
                return
            }
        }
        catch(e) {
            log(e)
            continue
        }
    }
}
var clearCache = function() {
    GM_setValue('ATcacheInfo', '')
}
var getCache = function() {
    return eval(GM_getValue('ATcacheInfo')) || {}
}
var getCacheCallback = function(res, url) {
    if (res.status != 200) {
        return getCacheErrorCallback(url)
    }

    var info
    try {
        info = eval(res.responseText).map(parseInfo)
    }
    catch(e) {
        info = []
        debug("debug = " + e.message )
    }
    if (info.length > 0) {
        ATcacheInfo[url] = {
            url: url,
            expire: new Date(new Date().getTime() + CACHE_EXPIRE),
            info: info
        }
        GM_setValue('ATcacheInfo', ATcacheInfo.toSource())
        launchAutoTitle(info)
    }
    else {
        getCacheErrorCallback(url)
    }
}
var getCacheErrorCallback = function(url) {
    var expire = new Date(new Date().getTime() + CACHE_EXPIRE)
    if (ATcacheInfo[url]) {
        ATcacheInfo[url].expire = expire
        launchAutoTitle(ATcacheInfo[url].info)
    }
    else {
        ATcacheInfo[url] = {
            url: url,
            expire: expire,
            info: []
        }
    }
    GM_setValue('ATcacheInfo', ATcacheInfo.toSource())
}

if (typeof(window.AutoTitle) == 'undefined') {
    window.AutoTitle = {}
    window.AutoTitle.addFilter = function(f) {
        AutoTitle.filters.push(f)
    }
    window.AutoTitle.addDocumentFilter = function(f) {
        AutoTitle.documentFilters.push(f)
    }
}
GM_registerMenuCommand('AutoTitle - clear cache', clearCache)
var ap = null
launchAutoTitle(SITEINFO)
var ATcacheInfo = getCache()
var xhrStates = {}
SITEINFO_IMPORT_URLS.forEach(function(i) {
    if (!ATcacheInfo[i] || ATcacheInfo[i].expire < new Date()) {
        var opt = {
            method: 'get',
            url: i,
            onload: function(res) {xhrStates[i] = 'loaded'; getCacheCallback(res, i)},
            onerror: function(res){xhrStates[i] = 'error'; getCacheErrorCallback(i)},
        }
        xhrStates[i] = 'start'
        GM_xmlhttpRequest(opt)
        setTimeout(function() {
            if (xhrStates[i] == 'start') {
                getCacheErrorCallback(i)
            }
        }, XHR_TIMEOUT)
    }
    else {
        launchAutoTitle(ATcacheInfo[i].info)
    }
})
return

// utility functions.
function getElementsByXPath(xpath, node) {
    var node = node || document
    var doc = node.ownerDocument ? node.ownerDocument : node
    var nodesSnapshot = doc.evaluate(xpath, node, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    var data = []
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i))
    }
    return data
}

function getFirstElementByXPath(xpath, node) {
    var node = node || document
    var doc = node.ownerDocument ? node.ownerDocument : node
    var result = doc.evaluate(xpath, node, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    return result.singleNodeValue ? result.singleNodeValue : null
}

function log(message) {
    if (typeof console == 'object') {
        console.log(message)
    }
    else {
        GM_log(message)
    }
}

function debug() {
    if ( typeof DEBUG != 'undefined' && DEBUG ) {
        console.log.apply(this, arguments)
    }
}