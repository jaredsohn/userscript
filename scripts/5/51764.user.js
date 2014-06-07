// ==UserScript==
// @name           Wedata Manager
// @namespace      http://endflow.net/
// @include        http://wedata.net/*
// @version        0.1.0
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009-05-05] 0.1.0 first version

(function(){

// Description {{{
// This script consists of some components:
//   [Boot] launch the component by matching URL
//   [Wedata] Wedata API wrapper (supports a part of API) and the management of API key
//   [Item] component for item page: http://wedata.net/items/28198
//   [ItemList] component for item list page: http://wedata.net/databases/siteimage/items
// }}}

// Config {{{
var cfg = {
    apikey: '',     // set your API key of Wedata if you need
    prompt: false,  // allows to ask API key with prompt dialog if not found
    xhr: true       // allows to get API key automatically using XMLHttpRequest
}
// }}}

// Boot {{{
var Boot = function(){
    console.log('Boot#new');
    this.comp = {
        Item: /^http:\/\/wedata\.net\/items\/\d+$/,
        ItemList: /^http:\/\/wedata\.net\/databases\/[^\/]+\/items(\?page\=\d+|\?query\=\w*)?$/
    };
}
Boot.prototype.init = function(){
    console.log('Boot#init');
    var url = location.href.toString();
    for(var name in this.comp){
        if(this.comp[name].test(url)){
            var c = eval('new ' + name + '()');
            c.init();
            return;
        }
    }
    console.log('Boot#init: no matches');
}
// }}}

// Wedata {{{
var Wedata = function(){
    this.base = 'http://wedata.net';
    this.login = false;
    this.user = '';
    this.ready = false;
    this.apikey = '';
}
Wedata.prototype.METHOD = {
    INVALID: 0, SCRIPT: 1, PREF: 2, XHR: 3, PROMPT: 4
}
Wedata.prototype.init = function(callback, thisObj){
    this._getLoginStatus(function(){
        console.log('Wedata#init: login: ' + this.login);
        this._getAPIKey(function(){
            console.log('Wedata#init: apikey: ' + this.apikey);
            callback.call(thisObj);
        }, this);
    }, this);
}
Wedata.prototype.isLogin = function(){
    return this.login;
}
Wedata.prototype._getLoginStatus = function(callback, thisObj){
    var scope = this;
    var xhr = this._newXHR('GET', '/authentication/info');
    xhr.onreadystatechange = function(){
        if(xhr.readyState != 4) return;
        if(xhr.status == 200){
            if(xhr.responseText.indexOf('>Logout<') != -1){
                scope.user = xhr.responseText.match(/<a href\="\/users\/([^"]+)">/)[1];
                if(scope.user.length !== 0)
                    scope.login = true;
            }else if(xhr.responseText.indexOf('>Login<') == -1)
                console.log('Wedata#_getLoginStatus: unknown response: ' + xhr.responseText);
        }else
            console.log('Wedata#_getLoginStatus: failed to load login status: ' + xhr.status);
        callback.call(thisObj);
    }
    xhr.send(null);
}
Wedata.prototype.isReady = function(){
    return this.ready;
}
Wedata.prototype._getAPIKey = function(callback, thisObj){
    var current = this.METHOD.SCRIPT;
    var method = this._getMethod(current);
    console.log('Wedata#_getAPIKey: try: ' + current);
    method.call(this, function(key){
        console.log('Wedata#_getAPIKey: result: ' + key);
        if(key && key.length !== 0){
            console.log('Wedata#_getAPIKey: got API key');
            this.ready = true;
            this.apikey = key;
            callback.call(thisObj, true);
            return;
        }
        current = this._nextMethod(current);
        if(current == this.METHOD.INVALID){
            console.log('Wedata#_getAPIKey: failed to get API key');
            callback.call(thisObj, false);
            return;
        }
        console.log('Wedata#_getAPIKey: try next method: ' + current);
        method = this._getMethod(current);
        method.call(this, arguments.callee, this);
    }, this);
}
Wedata.prototype._nextMethod = function(method){
    switch(method){
    case this.METHOD.SCRIPT:
        return this.METHOD.PREF;
    case this.METHOD.PREF:
        if(cfg.xhr)
            return this.METHOD.XHR;
    case this.METHOD.XHR:
        return cfg.prompt ? this.METHOD.PROMPT : this.METHOD.INVALID;
    case this.METHOD.PROMPT:
        break;
    default:
        console.log('Wedata#_nextMethod: invalid method: ' + method);
    }
    return this.METHOD.INVALID;
}
Wedata.prototype._getMethod = function(method){
    switch(method){
    case this.METHOD.SCRIPT:
        return this._getAPIKey_SCRIPT;
    case this.METHOD.PREF:
        return this._getAPIKey_PREF;
    case this.METHOD.XHR:
        return this._getAPIKey_XHR;
    case this.METHOD.PROMPT:
        return this._getAPIKey_PROMPT;
    }
    console.log('Wedata#_getMethod: invalid method: ' + method);
    return function(){return ''};
}
Wedata.prototype._getAPIKey_SCRIPT = function(callback, thisObj){
    if(cfg && cfg.apikey && cfg.apikey.length !== 0)
        callback.call(thisObj, cfg.apikey);
    callback.call(thisObj, '');
}
Wedata.prototype._getAPIKey_PREF = function(callback, thisObj){
    var key = GM_getValue('apikey');
    if(key && key.length !== 0)
        callback.call(thisObj, key);
    callback.call(thisObj, '');
}
Wedata.prototype._getAPIKey_XHR = function(callback, thisObj){
    if(this.login){
        this._getUserURL(function(url){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function(){
                var key = '';
                if(xhr.readyState != 4) return;
                if(xhr.status == 200)
                    key = xhr.responseText.match(/>([0-9abcdef]{40})</)[1];
                else
                    console.log('Wedata#_getAPIKey_XHR: failed to load the user page: ' + xhr.status);
                callback.call(thisObj, key);
            }
            xhr.send(null);
        }, this);
    }else
        callback.call(thisObj, '');
}
Wedata.prototype._getAPIKey_PROMPT = function(callback, thisObj){
    var key = prompt('[Wedata Manager]\nPlease input your API key of Wedata.');
    if(key && key.length !== 0)
        callback.call(thisObj, key);
    callback.call(thisObj, '');
}
Wedata.prototype.getItem = function(id, callback, thisObj){
    if(!this.isReady){
        console.log('Wedata#getItem: not ready');
        return false;
    }
    var xhr = this._newXHR('GET', '/items/' + id + '.json');
    xhr.onreadystatechange = function(){
        if(xhr.readyState != 4) return;
        if(xhr.status == 200){
            var obj = eval('(' + xhr.responseText + ')');
            callback && callback.call(thisObj, obj.data, obj);
        }else{
            console.log('Wedata#getItem: failed to get item: ' + xhr.status + ', ' + xhr.responseText);
            callback && callback.call(thisObj, null);
        }
    }
    xhr.send(null);
    return true;
}
Wedata.prototype.createItem = function(db, name, data, callback, thisObj){
    if(!this.isReady){
        console.log('Wedata#createItem: not ready');
        return false;
    }
    var xhr = this._newXHR('POST', '/databases/' + encodeURI(db) + '/items');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
        if(xhr.readyState != 4) return;
        if(xhr.status == 201)
            callback && callback.call(thisObj, true);
        else{
            console.log('Wedata#createItem: failed to create item: ' + xhr.status + ', ' + xhr.responseText);
            callback && callback.call(thisObj, false);
        }
    }
    var body = 'api_key=' + this.apikey + '&name=' + name;
    for(var k in data){
        body += '&data[' + k + ']=' + data[k];
    }
    xhr.send(encodeURI(body));
    return true;
}
Wedata.prototype.deleteItem = function(id, callback, thisObj){
    if(!this.isReady){
        console.log('Wedata#deleteItem: not ready');
        return false;
    }
    var xhr = this._newXHR('DELETE', '/items/' + id);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
        if(xhr.readyState != 4) return;
        if(xhr.status == 200)
            callback && callback.call(thisObj, true);
        else{
            console.log('Wedata#deleteItem: failed to delete item: ' + xhr.status + ', ' + xhr.responseText);
            callback && callback.call(thisObj, false);
        }
    }
    xhr.send('api_key=' + this.apikey);
    return true;
}
Wedata.prototype.duplicateItem = function(id, callback, thisObj){
    if(!this.isReady){
        console.log('Wedata#duplicateItem: not ready');
        return false;
    }
    this.getItem(id, function(res1, info){
        if(res1 != null){
            var tokens = info.database_resource_url.split('/');
            var db = decodeURI(tokens[tokens.length - 1]);
            console.log('Wedata#duplicateItem: ' + this.createItem(db,
                    'Copy of ' + info.name, res1, function(res2){
                console.log('Wedata#duplicateItem: ' + res2);
                callback && callback.call(thisObj, res2);
            }, this));
        }else{
            console.log('Wedata#duplicateItem: failed to get item');
            callback && callback.call(thisObj, false);
        }
    }, this);
    return true;
}
Wedata.prototype._newXHR = function(method, rel, async){
    async = (arguments.length == 2) ? true : async;
    var xhr = new XMLHttpRequest();
    xhr.open(method, this.base + rel, async);
    return xhr;
}
Wedata.prototype._getUserURL = function(callback, thisObj, remain){
    remain = remain || 10;
    var links = $x('id("menu")/li[3]/a');
    if(links && 0 < links.length)
        callback && callback.call(thisObj, links[0].href);
    else{
        console.log('Wedata#_getUserURL: failed to get user URL: remain: ' + remain);
        if(remain == 0)
            callback && callback.call(thisObj, '');
        else{
            var scope = this;
            var callee = arguments.callee;
            setTimeout(function(){
                callee.call(scope, callback, thisObj, remain - 1);
            }, 100);
        }
    }
}
// }}}

// Item {{{
var Item = function(){
    console.log('Item#new');
}
Item.prototype.init = function(){
    console.log('Item#init');

    var back = $x('id("content")/p/a')[0];
    var p = back.parentNode;
    var links = $n('ul', {className: 'links'}, [
        $n('li', null, [
            p.removeChild(back),
        ]),
        $n('li', null, [
            $n('a', {href: back.href + '/new', innerHTML: 'Create New Item'})
        ])
    ]);
    p.appendChild(links);
}
// }}}

// ItemList {{{
var ItemList = function(){
    console.log('ItemList#new');
    this.wd = new Wedata();
}
ItemList.prototype.init = function(){
    console.log('ItemList#init');

    this.wd.init(function(){
        // Define some functions to webpage context for operation links
        var scope = this;
        unsafeWindow.wdmgr_delete = function(id){
            setTimeout(function(){
                scope.wd.deleteItem(id, location.reload, location)
            }, 0);
        }
        unsafeWindow.wdmgr_duplicate = function(id){
            setTimeout(function(){
                scope.wd.duplicateItem(id, location.reload, location)
            }, 0);
        }

        // UI modification
        var c = function(n){return 'contains(concat(" ",@class," ")," '+n+' ")'};
        $x('id("content")/ul['+c('items')+']/li['+c('item')+']/div/a['+c('entry-title')+']').forEach(function(a){
            var tokens = a.href.split('/');
            var id = parseInt(tokens[tokens.length - 1]);
            var jumpto = scope.wd.isLogin() ? '' : '/login';
            var del_onclick = 'wdmgr_delete(' + id + ');return false';
            var dup_onclick = 'wdmgr_duplicate(' + id + ');return false';
            if(!scope.wd.isLogin()){
                jump = '/login';
                del_onclick = '';
                dup_onclick = '';
            }
            a.parentNode.appendChild($n('ul', {style: 'display: inline; padding-left: 32px;', className: 'links'}, [
                $n('li', null, [$n('a', {innerHTML: 'Edit', href: a.href + '/edit'})]),
                $n('li', null, [$n('a', {innerHTML: 'Delete', href: jumpto, onclick: del_onclick})]),
                $n('li', null, [$n('a', {innerHTML: 'Duplicate', href: jumpto, onclick: dup_onclick})])
            ]));
        });
    }, this);
}
// }}}

// Main {{{
var boot = new Boot();
boot.init();
// }}}

// Utils {{{
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
function $n(t,o,c){var e = document.createElement(t);if(o){for(var k in o){
if(k=='style'||k=='onclick'){e.setAttribute(k,o[k])}else{e[k]=o[k]}}
}if(c){c.forEach(function(ch){e.appendChild(ch)})}return e}
// }}}

})();

// vim: set fdm=marker sw=4 ts=4 et:
