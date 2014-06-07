// ==UserScript==
// @name           NicoVideo Stats
// @namespace      http://endflow.net/
// @description    show statistics information of watching video on NicoVideo (Nico Nico Douga).
// @include        http://*.nicovideo.jp/watch/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @version        0.1.2
// @history        [2008-07-06] 0.1.0 first version
//                 [2008-08-04] 0.1.1 add "Comment Density" item
//                 [2008-11-29] 0.1.2 supported new NicoVideo

(function(){
var w = this.unsafeWindow || window;
setTimeout(function(){with(w){
    var player = $('flvplayer');
    if(!player || !Video || player.GetVariable('ready') !== 'true'){
        setTimeout(arguments.callee, 500);
        return;
    }

    GM_addStyle(<><![CDATA[
    #nvstats{
        font-size: 14px;
        padding: 3px;
        margin-top: 3px;
        margin-bottom: -5px;
    }
    #nvstats > span{
        margin: 0 12px 0 0;
    }
    ]]></>);

    var view = Video['viewCount'];
    var mylist = Video['mylistCount'] / view;
    var resno = player.GetVariable('last_resno');
    var res = resno / view;
    var dens = resno / Video['length'];

    var td = $x('id("des_2")/table/tbody/tr/td[descendant::form[@id="mymemory_add_form"]]')[0];
    var p = $n('P');
    p.setAttribute('id', 'nvstats');
    td.appendChild(p);

    createItem('res', 'コメ率', res);
    createItem('mylist', 'マイリス率', mylist);
    createItem('dens', 'コメ密度', dens, false, 'コメ/秒');
}}, 100);
function createItem(id, name, num, percent, unit){
    var p = $('nvstats');
    var span = $n('SPAN');
    span.innerHTML = '<strong>' + name + '：</strong>';
    p.appendChild(span);

    var value = $n('SPAN');
    value.setAttribute('id', 'nvstats_' + id);
    if(percent === false){
        num = String(num);
        var content = (parseFloat(num) < 1 ? num.slice(0,6)
            : num.slice(0, num.indexOf('.') + 2)) + unit;
    }else{
        var content = (100 * num).toString().substr(0, 6) + '%';
        GM_addStyle('#nvstats_' + id + '{background-color:' + col(num) + ';}');
    }
    value.innerHTML = content;
    span.appendChild(value);
}
function col(ratio){
    var offset = 8;
    var max = 128;
    var num = Math.round(max * ratio);
    var c = 255 - offset - num;
    return 'rgb(255,' + c + ',' + c + ')';
}
function $x(x,c){c=c||w.document;var r=w.document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=r.iterateNext();nodes.push(i));return nodes}
function $(id){return w.document.getElementById(id)}
function $n(tagName){return w.document.createElement(tagName)}
})();
