// ==UserScript==
// @name           Google Keyword Highlight
// @namespace      http://endflow.net/
// @description    Highlight search keywords in the result page of Google search.
// @version        0.1.6
// @include        http://*.google.tld/*
// @include        http://google.tld/*
// @include        https://*.google.tld/*
// @include        https://google.tld/*
// @exclude        http://mail.google.tld/*
// @exclude        https://mail.google.tld/*
// @exclude        http://docs.google.tld/*
// @exclude        https://docs.google.tld/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009-06-12] 0.1.0 initial version
//                 [2009-06-13] 0.1.1 add 'mode' option
//                 [2009-06-17] 0.1.2 add color previews
//                 [2009-06-19] 0.1.3 invert foreground colors
//                 [2009-06-20] 0.1.4 support AutoPagerize
//                 [2009-06-20] 0.1.5 change script name (old: Google Colored Keywords)
//                 [2010-05-13] 0.1.6 catch up new Google search

(function(){
//// Config
var cfg = {
    mode: 'smart', // 'strict', 'smart', 'verbose'
    limit: 2       // limit num of chars for 'smart' mode
}

//// CSS
GM_addStyle(<><![CDATA[
#gkh_hl {font-size: medium; margin-bottom: 6px;}
]]></>);

//// Colors
var colors = [
    'rgb(255, 255, 102)', 'rgb(160, 255, 255)', 'rgb(153, 255, 153)',
    'rgb(255, 153, 153)', 'rgb(255, 102, 255)', ['rgb(136, 0, 0)', 'white'],
    ['rgb(0, 170, 0)', 'white'], ['rgb(136, 104, 0)', 'white'],
    ['rgb(0, 70, 153)', 'white'], ['rgb(153, 0, 153)', 'white']
];
var clen = colors.length;

//// AutoPagerize
var APSupport = function(){
    this.handlers = {doc: [], node: []};
}

APSupport.prototype.init = function(onInit, thisObj){
//    log('APSupport: init');
    var scope = this;
    (function(callback, count){
        count = count || 5;
//        log('APSupport: remain: ' + count);
        if('AutoPagerize' in window){
//            log('APSupport: found');
            var scp = this;
            window.AutoPagerize.addFilter(function()callback.call(scp, 'node', arguments));
            window.AutoPagerize.addDocumentFilter(function()callback.call(scp, 'doc', arguments));
            onInit.call(thisObj);
        }else if(1 < count){
//            log('APSupport: retry');
            setTimeout(arguments.callee, 1000, callback, count - 1);
        }else{
//            log('APSupport: failed');
        }
    })(function()scope._onFetch.apply(scope, arguments));
}

APSupport.prototype._onFetch = function(id, args){
//    log('APSupport: _onFetch: ' + id);
    var list = [];
    switch(id){
        case 'node': list = this.handlers.node; break;
        case 'doc': list = this.handlers.doc; break;
    }
    for(var i = 0; i < list.length; i++)
        list[i][0].apply(list[i][1], args);
}

APSupport.prototype.addNodeHandler = function(handler, thisObj){
//    log('APSupport: addNodeHandler');
    this.handlers.node.push([handler, thisObj]);
}

APSupport.prototype.addDocHandler = function(handler, thisObj){
//    log('APSupport: addDocHandler');
    this.handlers.doc.push([handler, thisObj]);
}

/// Silimar Engine
// http://www.nihonbunka.com/eigodaigaku/archives/000034.html
var singularize = [
    [/^(.*)ies$/i, 'y'], [/^(.*)ves$/i, 'fe'],
    [/^(.*(x|sh|s|z|ch|o))es$/i, ''], [/^(.*o)s$/i, '']
];
var pluralize = [
    [/^(.*[^aiueo])y$/i, 'ies'], [/^(.*)fe?$/i, 'ves'],
    [/^(.*(x|sh|s|z|ch|o))$/i, 'es'], [/^(.*o)$/i, 's']
];

var getSimilars = function(keyword){
    var gen = function(output, pat){
        var m = keyword.match(pat[0]);
        if(m && m.length > 1)
            output.push(m[1] + pat[1]);
    }

    // irregular singularize
    var swords = [];
    for(var i = 0, l = singularize.length; i < l; i++)
        gen(swords, singularize[i]);

    // regular singularize
    if(swords.length == 0)
        gen(swords, [/^(.*)s$/i, '']);

    // irregular pluralize
    var pwords = [];
    if(swords.length == 0)
        for(var i = 0; i < pluralize.length; i++)
            gen(pwords, pluralize[i]);

    // regular pluralize
    if(swords.length == 0 && pwords.length == 0)
        gen(pwords, [/^(.*)$/i, 's']);

    // special variants
    var spvar = function(k){
        var m = k.match(/^(.*)'s$/);
        if(m && m.length == 2)
            swords.push(m[1]);
        else
            swords.push(k + "'s");
    }
    if(0 < swords.length)
        for(var i = 0, l = swords.length; i < l; i++)
            spvar(swords[i]);
    else if(0 < pwords.length)
        spvar(keyword);

    return swords.concat(pwords);
}

var assignColor = function(keyword){
    keyword = keyword.toLowerCase();
    callee = arguments.callee;
    var assign = function(k){
        var next = callee.nextIndex || 0;
        var color = colors[(next + clen) % clen];
        if(color.constructor == ''.constructor)
            color = [color, 'black'];
        cmap[k] = color;
        callee.nextIndex = next + 1;
    }
    if(cfg.mode === 'smart' && cfg.limit < keyword.length){
        var sims = getSimilars(keyword);
//        log(keyword, sims);
        for(var i = 0, l = sims.length; i < l; i++){
            if(hasColor(sims[i])){
                cmap[keyword] = hasColor.$;
                break;
            }
        }
        if(typeof(cmap[keyword]) === 'undefined')
            assign(keyword);
        for(var i = 0, l = sims.length; i < l; i++)
            cmap[sims[i]] = cmap[keyword];
    }else
        assign(keyword);
    return cmap[keyword];
}

var hasColor = function(keyword){
    keyword = keyword.toLowerCase();
    arguments.callee.$ = cmap[keyword];
    return typeof(arguments.callee.$) !== 'undefined';
}

var getColor = function(keyword){
    // ignore num of WS
    keyword = keyword.replace(/\s+/g, ' ');
    if(hasColor(keyword))
        return hasColor.$;
    var color = ['white', 'black'];
    if(cfg.mode !== 'strict')
        color = assignColor(keyword);
    return color;
}

//// Main
var cmap = {};
var main = function(){
    var loaded = $x('//body')[0].getAttribute('gkh_loaded') == 'true';
    var tsf = unsafeWindow.document.forms['tsf'];
    var stats = document.getElementById('resultStats');
    if(loaded || !tsf || !stats){
        if(!loaded)
            setTimeout(main, 100);
        return;
    }
    $x('//body')[0].setAttribute('gkh_loaded', 'true');

    // generates keywords
    var keywords = tsf.q.value;
    keywords = keywords
        .split(keywords.indexOf('"') != -1 ? '"' : ' ')
        .map(function(k)k.replace(/(^\s+|\s+$)/g, ''))
        .filter(function(k)0 < k.length);

//    log(keywords);

    // associates colors and keywords
    for(var i = 0, l = keywords.length; i < l; i++)
        assignColor(keywords[i]);

    // coloring page keywords
    var highlight = function(doc){
        doc = doc || null;
        var ems = $x('//li[contains(concat(" ", @class, " "), " g ")]//em', doc);
        for(var i = 0, l = ems.length; i < l; i++){
            if(!ems[i]) break;
            var color = getColor(ems[i].innerHTML);
            ems[i].style.color = color[1];
            ems[i].style.backgroundColor = color[0];
        }
    }
    highlight();

    // coloring keywords
    stats.parentNode.innerHTML = '<div id="gkh_hl">' + keywords.map(function(k){
        var color = getColor(k);
        return '<span style="color: ' + color[1] + '; background-color: ' + color[0] + ';">' + k + '</span>';
    }).join(' ') + '</div>' + stats.parentNode.innerHTML;

//    log(cmap);

    // add AutoPagerize handler
    var ap = new APSupport();
    ap.init(function(){
        ap.addDocHandler(function(doc){
            highlight(doc)
        }, this);
    }, this);
}

main();

//// Utils
function $x(x,c){c=c||document;var res=c.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
function log(){unsafeWindow.console.log.apply(unsafeWindow.console.log,
arguments)}
})();
