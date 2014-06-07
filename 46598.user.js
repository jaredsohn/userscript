// ==UserScript==
// @name           Google Site Image
// @namespace      http://endflow.net/
// @description    Adding an image of website (logo or banner) to the right side of search result.
// @version        0.4.4
// @include        http://*.google.tld/*
// @include        http://google.tld/*
// @include        https://*.google.tld/*
// @include        https://google.tld/*
// @exclude        http://*.google.tld/images?*
// @exclude        http://mail.google.tld/*
// @exclude        https://mail.google.tld/*
// @exclude        http://docs.google.tld/*
// @exclude        https://docs.google.tld/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        http://userscripts.org/scripts/show/46598

(function(){
//// Config
var cfg = {
    normalize: true,                    // 'false' when conflict with other scripts
    expire: 2 * (24 * 60 * 60 * 1000),  // 2 days, interval of siteinfo update
    sources: ['http://wedata.net/databases/siteimage/items.json'],
    siteinfo: {
        // 'hoge.com': {img:['http://hoge.com/images/hoge.png']},
        // 'foo.bar.com': {img:['http://foo.bar.com/img/foo.gif', 'http://foo.bar.com/img/bar.png']},
        // 'hage.net': {img:['http://static.hage.net/hage.png'], css:'background-color: #002244;'}
        // 'hjkl.org': {html:'<span style="font-size: x-large; color: white; background-color: black;">hjkl.org</span>'}
    }
}

//// CSS
GM_addStyle('#center_col, #foot { margin-right: 0 !important; }' +
            'li.g { position: relative; }' +
            'div.gswl_base { position: absolute; right: 0; top: 0; }' +
            'div.gswl_base > * { padding: 5px; }');

//// Wedata
var Wedata = function(){
    this.$ = {};
    this.siteinfo = {};
}

Wedata.prototype.init = function(callback, thisObj){
    thisObj = thisObj || null;
    var expire = GM_getValue('expire');
    var cache = GM_getValue('cache');
    if(expire && ((new Date()).getTime() < parseInt(expire)) && cache && cache != ''){
//        console.log('Wedata: cache exist');
        this.siteinfo = eval(cache);
        this._override(cfg.siteinfo);
        callback.call(thisObj);
    }else{
//        console.log('Wedata: no cache or expired');
        var scope = this;
        var fetcher = function(url){
            GM_xmlhttpRequest({
                method: 'get', url: url,
                onload: function(r){
//                    console.log('Wedata: ' + url + ': ' + r.status + ' ' + r.statusText);
                    scope._proc(r.responseText);
                    if(cfg.sources.length === 0){
//                        console.log('Wedata: end updating');
                        GM_setValue('cache', scope.siteinfo.toSource());
                        GM_setValue('expire', ((new Date()).getTime() + cfg.expire).toString());
                        scope._override(cfg.siteinfo);
                        callback.call(thisObj);
                    }else{
//                        console.log('Wedata: next source');
                        fetcher(cfg.sources.pop());
                    }
                },
                onerror: function(r){
                    console.log('Wedata: ' + url + ': ' + r.status + ' ' + r.statusText);
                }
            });
        }
        fetcher(cfg.sources.pop());
    }
}

// process to generate siteinfo object from raw json text
// json: text string
Wedata.prototype._proc = function(json){
    var si = {};
    eval(json)
        .map(function(item){return item.data})
        .forEach(function(data){
            si[data.url] = {};
            if(data.img && data.img != '') si[data.url]['img'] = eval(data.img);
            if(data.html && data.html != '') si[data.url]['html'] = data.html;
            if(data.css && data.css != '') si[data.url]['css'] = data.css;
        });
    this._override(si);
}

// override passed siteinfo to actual siteinfo
// si: siteinfo object
Wedata.prototype._override = function(si){
    for(var url in si){
        this.siteinfo[url] = si[url];
    }
}

Wedata.prototype.has = function(url){
    this.$ = this.siteinfo[url];
    return !!this.$;
}

Wedata.prototype.clearCache = function(){
    GM_setValue('cache', '');
    GM_setValue('expire', '');
}

//// AutoPagerize
var APSupport = function(){
    this.handlers = [];
}

APSupport.prototype.init = function(onInit, thisObj){
//    console.log('APSupport: init');
    var scope = this;
    (function(callback, count){
        count = count || 5;
//        console.log('APSupport: remain: ' + count);
        if('AutoPagerize' in window){
//            console.log('APSupport: found');
            window.AutoPagerize.addFilter(callback);
            onInit.call(thisObj);
        }else if(1 < count){
//            console.log('APSupport: retry');
            setTimeout(arguments.callee, 1000, callback, count - 1);
        }else{
//            console.log('APSupport: failed');
        }
    })(function(docs){scope._onFetch.call(scope, docs)});
}

APSupport.prototype._onFetch = function(docs){
//    console.log('APSupport: _onFetch');
    for(var i = 0; i < this.handlers.length; i++){
        this.handlers[i][0].call(this.handlers[i][1], docs);
    }
}

APSupport.prototype.addHandler = function(handler, thisObj){
//    console.log('APSupport: addHandler');
    this.handlers.push([handler, thisObj]);
}

//// Structure Normalizer
var normalizer = function(){
    $x('//li[contains(concat(" ",@class," ")," s ")]/table[@class="ts"]').forEach(function(table){
        table.removeAttribute('style');
        table.parentNode.setAttribute('class', 'g w0');
    });
}
if(cfg.normalize){
    GM_addStyle('.ts { width: 42em; }');
    normalizer();
}

//// Main
var proc = function(){
//    console.log('Main: start proc');
    var siteinfo = wd.siteinfo;
    $x('//ol/li[contains(concat(" ",@class," ")," g ")]//h3[@class="r"]/a').forEach(function(a){
        if(a.className && a.className.indexOf('gswl_done') != -1) return;
        a.className = a.className ? (a.className + ' gswl_done') : 'gswl_done';
        for(var k in siteinfo){
            if(a.href.indexOf(k) != -1){
                var li = getAncestor(a, 'li');
                if(!li) continue;

                var cont = document.createElement('div');
                cont.className = 'gswl_base';

                var item = siteinfo[k];
                if('img' in item){
                    var div = document.createElement('div');
                    ('css' in item) && div.setAttribute('style', item.css);
                    for(var n = 0; n < item.img.length; n++){
                        div.innerHTML += '<img src="' + item.img[n] + '"/>';
                    }
                    cont.appendChild(div);
                }else if('html' in item){
                    cont.innerHTML = item.html;
                }

                li.appendChild(cont);
                break;
            }
        }
    });
}

var wd = new Wedata();
wd.init(proc, this);

var ap = new APSupport();
ap.init(function(){
//    console.log('APSupport: end init');
    ap.addHandler(function(){
        proc();
        cfg.normalize && normalizer();
    }, this);
}, this);

//// Command
GM_registerMenuCommand('Google Site Image - clear cache', wd.clearCache);

//// Utils
function getAncestor(el,tag){
    tag = tag.toUpperCase();
    while(el){
        if(el.nodeType == 1 && el.nodeName == tag) return el;
        el = el.parentNode;
    }
}
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();
