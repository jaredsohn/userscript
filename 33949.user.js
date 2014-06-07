// ==UserScript==
// @name           Twitter DM helper
// @namespace      http://endflow.net/
// @description    Utility to send Direct Message to multiple users at once on Twitter.
// @include        http://twitter.com/*
// @resource       YUI_DOM_JS http://yui.yahooapis.com/2.5.2/build/yahoo-dom-event/yahoo-dom-event.js
// @resource       YUI_AC_JS http://yui.yahooapis.com/2.5.2/build/autocomplete/autocomplete-min.js
// @resource       YUI_ANIM_JS http://yui.yahooapis.com/2.5.2/build/animation/animation-min.js
// @resource       YUI_AC_CSS http://yui.yahooapis.com/2.5.2/build/autocomplete/assets/skins/sam/autocomplete.css
// @version        0.2.5
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2007-10-07] 0.1.0 first release
//                 [2008-09-18] 0.2.0 add AutoComplete feature
//                 [2008-09-20] 0.2.1 update for new Twitter design
//                 [2008-12-31] 0.2.2 tracked to Twitter update
//                 [2008-12-31] 0.2.3 small bugfixed & refactoring
//                 [2009-05-06] 0.2.4 update for new Twitter
//                 [2009-05-07] 0.2.5 small bugfixed

(function(){
// Config {{{
var cfg = {
    anim: 0.3,  // speed of animation, in seconds (0: disable anim)
    max: 20,    // max num of results to display
    comp: false // auto-selecting matched items (true: auto-select)
};
// }}}

// CSS {{{
var style = <><![CDATA[
#content #dm_update_box .ac #actextbox {
    width: auto;
    margin: 0 14px;
}
#content #dm_update_box .ac #fcont .yui-ac-content {
    margin: 0 10px;
}
#content #dm_update_box .ac .msg-relative {
    position: relative;
}
#content #dm_update_box .ac #msg {
    right: 10px;
    position: absolute;
}
#content #dm_update_box .ac #msg span {
    margin-left: 10px;
}
#content #dm_update_box .ac #msg #status-text {
    font-size: 1.4em;
}
#content #dm_update_box .ac #msg #char-counter {
    font-size: 22pt;
    font-weight: bold;
    color: #CCC;
}
#content #dm_update_box .to {
    font-size: 1.2em;
    margin: 30px 14px 2px;
}
#content #dm_update_box .to #to_list {
    display: inline;
}
#content #dm_update_box .to #to_list nobr {
    margin-right: 2px;
}
#content #clear {
    padding: 0 1px;
    font-size: 0.8em;
}
span.over-char {
    color: red;
    font-size: 1.2em;
}
#content #dm_update_box textarea {
    height: 76px;
}
.yui-ac-content {
    max-height: 220px;
    max-width: 160px;
    overflow-x: hidden;
    overflow-y: auto;
}
]]></>;
// }}}

// TabDetector {{{
var TabDetector = function(){
    this.handlers = [null, [], [], [], [], []];
}
TabDetector.prototype.TAB = {
    INVALID: 0, HOME: 1, REPLY: 2, INBOX: 3, SENT: 4, FAV: 5
}
TabDetector.prototype.init = function(){
    var scope = this;
    $x('id("primary_nav")/li/a').forEach(function(a){
        var tab = scope._getTabNum(a.href);
        a.addEventListener('click', function(){
            scope._invokeHandlers(tab);
        }, false);
    });
}
TabDetector.prototype.addHandler = function(tab, handler, thisObj){
    this.handlers[tab].push({f:handler, c:thisObj});

    var tab = this._getTabNum(location.href);
    if(tab !== this.TAB.INVALID)
        this._invokeHandlers(tab);
}
TabDetector.prototype._invokeHandlers = function(tab){
    this.handlers[tab].forEach(function(obj){
        obj.f.call(obj.c, tab);
    });
}
TabDetector.prototype._getTabNum = function(url){
    var m = url.match(/http:\/\/twitter.com\/#?(\w*)$/);
    if(!m) return this.TAB.INVALID;
    switch(m[1]){
        case 'home':
        case '':
            return this.TAB.HOME;
        case 'replies':
            return this.TAB.REPLY;
        case 'inbox':
            return this.TAB.INBOX;
        case 'sent':
            return this.TAB.SENT;
        case 'favorites':
            return this.TAB.FAV;
    }
    return this.TAB.INVALID;
}
// }}}

// Model {{{
var Model = function(){
    this.events = {add:[], remove:[], clear:[]};
    this.clear();
}
Model.prototype.subscribeEvent = function(type, callback, thisObj){
    if(!this.events[type]) return;
    this.events[type].push({callback:callback, thisObj:thisObj || null});
}
Model.prototype.dispatchEvent = function(type, param){
    this.events[type].forEach(function(obj){
        obj.callback.apply(obj.thisObj, param || null);
    });
}
Model.prototype.add = function(name, uid){
    if(!this.has(name)){
        this.users[name] = {name:name, uid:uid};
        this.num++;
        this.dispatchEvent('add', [this.users[name]]);
    }
}
Model.prototype.remove = function(name){
    var ret;
    if(this.has(name)){
        ret = this.users[name];
        delete this.users[name];
        this.num--;
        this.dispatchEvent('remove', [ret]);
        return ret;
    }
    return null;
}
Model.prototype.pop = function(){
    if(this.num == 0) return null;
    for(var k in this.users){
        return this.remove(k);
    }
    return null;
}
Model.prototype.clear = function(){
    this.users = {};
    this.num = 0;
    this.dispatchEvent('clear');
}
Model.prototype.has = function(name){
    return name && (typeof this.users[name]) !== 'undefined';
}
// }}}

// View {{{
var View = function(userInfo){
    var scope = this;
    $x('//head')[0].appendChild($n('script', {innerHTML:GM_getResourceText('YUI_DOM_JS')
        + GM_getResourceText('YUI_ANIM_JS') + GM_getResourceText('YUI_AC_JS')
        + 'var cfg = ' + cfg.toSource()}));
    GM_addStyle(GM_getResourceText('YUI_AC_CSS'));
    $x('//body')[0].className = 'yui-skin-sam';
    GM_addStyle(style);

    // hide default 'Send' button and divBar
    var divBar = $x('id("dm_update_box")//div[@class="bar"]')[0];
    divBar.style.display = 'none';
    $('text').style.display = 'none';
    $('dm-submit').style.display = 'none';

    // append ac div
    var divAc = $n('div', {className:'ac'});
    divBar.parentNode.insertBefore(divAc, divBar);

    // create ac container
    var accont = $n('div', {id:'accont'});
    divAc.appendChild(accont);

    // append autocomplete textbox
    var actextbox = $n('input', {id:'actextbox', type:'text', size:'20'});
    accont.appendChild(actextbox);

    // append friends list container
    accont.appendChild($n('div', {id:'fcont'}));

    // append message area
    var rdiv = $n('div', {className:'msg-relative'});
    var msg = $n('div', {id:'msg'});
    msg.innerHTML = '<span id="status-text"></span><span id="char-counter" class="numeric">140</span>';
    rdiv.appendChild(msg);
    divAc.appendChild(rdiv);
    this.statusText = $('status-text');

    // append 'To' area
    var toArea = $n('div', {className:'to',
        innerHTML:'<span id="to_label">To:&nbsp;</span><p id="to_list"/>'});
    divBar.parentNode.insertBefore(toArea, divBar);
    this.to_list = $('to_list');

    this.clear = $n('input', {id:'clear', type:'button', value:'clear'});
    $e(this.clear, 'click', function(){model.clear.call(model)});
    toArea.appendChild(this.clear);

    this.send = $n('input', {id:'send', type:'button', value:'send', className:'round-btn'});
    $e(this.send, 'click', function(){post()});
    $('dm-submit').parentNode.appendChild(this.send);

    var message = $n('textarea', {id:'message', rows:5, cols:15});
    $e(message, 'keyup,focus,blur', function(){scope.updateUI()});
    $('text').parentNode.appendChild(message);

    // inject script for ac
    var ac = $n('script');
    ac.innerHTML = 'var tags = "' + userInfo.list.join(',') + '".split(",");' + <><![CDATA[
        var ds = new YAHOO.widget.DS_JSArray(tags);
        var ac = new YAHOO.widget.AutoComplete('actextbox', 'fcont', ds);
        ac.prehighlightClassName = "yui-ac-prehighlight";
        ac.queryDelay = 0;
        ac.animSpeed = cfg.anim;
        ac.maxResultsDisplayed = cfg.max;
        ac.typeAhead = cfg.comp;
    ]]></>;
    $x('//head')[0].appendChild(ac);

    actextbox.focus();
    this.updateUI();
}
View.prototype.onAdd = function(user){
    var nobr = $n('nobr', {id:'user_' + user.uid});
    var cb = $n('input', {id:user.uid, type:'checkbox', checked:'checked'});
    $e(cb, 'change', function(){model.remove.call(model, user.name)});
    nobr.appendChild(cb);
    nobr.appendChild($n('span', {innerHTML:user.name}));
    $('to_list').appendChild(nobr);
    $('to_list').appendChild($t(' '));
    this.updateUI();
}
View.prototype.onRemove = function(user){
    var nobr = $('user_' + user.uid);
    nobr.parentNode.removeChild(nobr);
    this.updateUI();
}
View.prototype.onClear = function(){
    $x('id("to_list")/nobr').forEach(function(nobr){
        nobr.parentNode.removeChild(nobr);
    })
    this.updateUI();
}
View.prototype.setStatusText = function(text){
    this.statusText.innerHTML = text;
}
View.prototype.updateUI = function(){
    // char counter
    var count = 140 - $('message').value.length;
    count = count < 0 ? '<span class="over-char">' + count + '</span>' : count;
    $('char-counter').innerHTML = count;

    // 'send' button
    var send = $('send');
    if(0 < $('message').value.length && 0 < model.num){
        send.removeAttribute('disabled');
        send.className = 'round-btn';
    }else{
        send.setAttribute('disabled', '');
        send.className = 'round-btn disabled';
    }
}
// }}}

// Proc {{{
function post(){
    $('send').setAttribute('disabled', '');
    $('clear').setAttribute('disabled', '');
    $('actextbox').setAttribute('disabled', '');
    $('message').setAttribute('disabled', '');
    w.$('loader').show();

    var sendProc, totalNum;
    totalNum = model.num;
    sendProc = function(user){
        if(!user){
            $('send').removeAttribute('disabled');
            $('clear').removeAttribute('disabled');
            $('actextbox').removeAttribute('disabled');
            $('message').removeAttribute('disabled');
            w.$('loader').hide();
            $('message').value = '';
            view.setStatusText('<b>Finished</b>');
            view.updateUI();
            return;
        }
        view.setStatusText('Now sending to <b>' + user.name + '</b> ...'
                + ' [' + (totalNum - model.num) + '/' + totalNum + ']');
        w.jQuery.ajax({
            url:'http://twitter.com/direct_messages/new.json',
            type:'POST',
            data:{user:user.uid, text:$('message').value},
            success:function(res, status){sendProc(model.pop())},
            error:function(xhr, status, e){
                view.setStatusText('<b>Failed to send: ' + user.name + '</b>');
                setTimeout(function(){sendProc(model.pop())}, 2000);
            }
        });
    };
    sendProc(model.pop());
}

function createUserList(callback, thisObj, count){
    count = count || 6;
    var opts = $x('id("direct_message_user_id")/option');
    if(!opts || opts.length == 0){
        if(0 < count){
            var scope = this;
            var callee = arguments.callee;
            setTimeout(function(){
                callee.call(scope, callback, thisObj, count - 1);
            }, 500);
        }
        return;
    }
    var ret = {dict:{}, list:[]};
    opts.forEach(function(opt){
        if(!opt.value || opt.value == '') return;
        ret.dict[opt.innerHTML] = opt.value;
        ret.list.push(opt.innerHTML);
    });
    callback.call(thisObj, ret);
}
// }}}

// Main {{{
var w = this.unsafeWindow;
var view, model;
var td = new TabDetector();
td.init();
td.addHandler(td.TAB.INBOX, function(){
    if(view && model) return;
    createUserList(function(userInfo){
        view = new View(userInfo);
        model = new Model();
        model.subscribeEvent('add', view.onAdd, view);
        model.subscribeEvent('remove', view.onRemove, view);
        model.subscribeEvent('clear', view.onClear, view);
        w.ac.itemSelectEvent.subscribe(function(){
            var name = $('actextbox').value;
            model.add(name, userInfo.dict[name]);
            $('actextbox').value = '';
        });
    }, this);
}, this);
// }}}

// Util {{{
function $x(x,c){c=c||document;var r=document.evaluate(x,c,null,4,null);
for(var i,n=[];i=r.iterateNext();n.push(i));return n}
function $n(t,o){var e = document.createElement(t);if(o){for(var k in o){e[k]=o[k]}}return e}
function $(id){return document.getElementById(id)}
function $t(t){return document.createTextNode(t)}
function $e(e,t,f){t.split(',').forEach(function(y){e.addEventListener(y,f,false)})}
// }}}
})();
// vim: foldmethod=marker
