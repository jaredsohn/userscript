// ==UserScript==
// @name           NicoVideo Advanced Folding
// @namespace      http://endflow.net/
// @description    customizes folding behavior of NicoVideo.
// @version        0.1.1
// @include        http://*.nicovideo.jp/watch/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2008-11-30] 0.1.0 first release
//                 [2009-02-13] 0.1.1 changed timing: open/close

(function(){
var cfg = {
    open: ['end', 'default'],
    close: ['start'],
    hover: true
}
var w = this.unsafeWindow || window;
setTimeout(function(){
    if(cfg.hover === true){
        var as = $x('id("WATCHHEADER")/div/table/tbody/tr/td/a[child::img]');
        as.forEach(function(a){
            a.setAttribute('onclick', 'return false');
            a.addEventListener('click', function(){keepDesc()}, false);
            a.addEventListener('mouseover', function(){openDesc()}, false);
            a.addEventListener('mouseout', function(){closeDesc()}, false);
        });
    }
    if(cfg.open.indexOf('default') != -1 && cfg.close.indexOf('default') == -1){
        openDesc();
    }else if(cfg.open.indexOf('default') == -1 && cfg.close.indexOf('default') != -1){
        closeDesc();
    }
    (cfg.close.indexOf('start') != -1)
        && startWatch('playing', 200, function(){closeDesc()});
    (cfg.open.indexOf('end') != -1) && setTimeout(function(){
        startWatch('end', 200, function(){openDesc()});
    }, 1000 * (w.Video['length'] - 2));
}, 10);
function keepDesc(){
    arguments.callee.flag = !arguments.callee.flag;
}
function openDesc(){
    if(!keepDesc.flag){
        w.showOBJ('des_2');
        w.hideOBJ('des_1');
    }
}
function closeDesc(){
    if(!keepDesc.flag){
        w.showOBJ('des_1');
        w.hideOBJ('des_2');
    }
}
function startWatch(target, period, callback, thisObj){
    var player = $('flvplayer');
    if(player && player.ext_getStatus && w.Video && (function(){
        var status = player.ext_getStatus();
        switch(target){
        case 'ready':
            return status === 'paused' && player.GetVariable('ready') === 'true';
        default:
            return target === status;
        }
    })()){
        callback.call(thisObj, target);
    }else{
        setTimeout(function(){startWatch(target, period, callback, thisObj)}, period);
    }
}
function $x(x,c){c=c||w.document;var r=w.document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=r.iterateNext();nodes.push(i));return nodes}
function $(id){return w.document.getElementById(id)}
})();
