// ==UserScript==
// @name           Wikipedia Language Switcher
// @namespace      http://endflow.net/
// @description    Language switcher for Wikipedia.
// @include        http://*.wikipedia.org/w*/*
// @include        https://secure.wikimedia.org/wikipedia/*/w*/*
// @version        0.1.2
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009.09.03] 0.1.0 first version
//                 [2011.09.22] 0.1.1 support HTTPS
//                 [2011.09.22] 0.1.2 fix tab alignments

(function(){
// configurations
var cfg = {
    // lang tab
    tab: {
        // true or false
        enable: true,
        // lang code you want to show as tab
        // *** if omit this, it won't show any langs ***
        lang: ['ja', 'en', 'de'],
        // 'code', 'name' or 'both'
        label: 'name'
    },
    // lang drop-down list
    list: {
        enable: true,
        // lang code you want to show as drop-down list
        // *** if omit this, it will show all langs ***
        lang: [],
        label: 'both'
    },
    // quick toggle
    toggle: {
        enable: true,
        // if omit this, it will set first element of cfg.toggle.lang
        default: 'ja',
        // pair of toggle language
        lang: ['ja', 'en']
    }
};

// Array.each
Array.prototype.each = function(callback, _this){
    for(var i = 0, len = this.length; i < len; i++){
        if(callback.call(_this, this[i], i) === false){break}
    }
};
// Object.each
Object.prototype.each = function(callback, _this){
    for(var k in this){
        callback.call(_this, this[k], k);
    }
}
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
function $(id){return document.getElementById(id)}
function $n(tagName){return document.createElement(tagName)}

// label maker
function makeLabel(type, lang){
    switch(type){
        case 'both': return lang.name + ' [' + lang.code + ']';
        case 'name': return lang.name;
    }
    return lang.code; // case 'code'
}
function toggleLang(langs){
    var lang = location.href.substr(7).split('.')[0];
    var tglLang = cfg.toggle.lang[lang];
    if(!tglLang){tglLang = cfg.toggle.default}
    location.href = langs[tglLang].url;
}
// validation page
function validPage(){
    if(!$('ca-history')){return false}
    if(!$('p-lang')){return false}
    return true;
}
// transform config object
function transformConfig(){
    if(!cfg){cfg = {};}
    if(!cfg.tab){cfg.tab = {enable: false}}
    if(!cfg.list){cfg.list = {enable: false}}
    if(!cfg.toggle){cfg.toggle = {enable: false}}
    if(!cfg.toggle.default){
        cfg.toggle.default = cfg.toggle.lang ? cfg.toggle.lang[0] : 'en';
    }
    if(cfg.toggle.lang){
        var lang = [cfg.toggle.lang[0], cfg.toggle.lang[1]];
        cfg.toggle.lang = {};
        cfg.toggle.lang[lang[0]] = lang[1];
        cfg.toggle.lang[lang[1]] = lang[0];
    }
}
// collecting language links
function collectingLangLink(){
    var langs = {};
    $x('//div[@id="p-lang"]/div[@class="body"]/ul/li').each(function(li){
        var token = li.className.split(' ')[0];
        var code = token.replace('interwiki-', '');
        langs[code] = {
            code: code,
            name: li.firstChild.innerHTML,
            url: li.firstChild.href
        };
    }, this);
    return langs;
}
// transform UI
function transformUI(langs){
    if(!langs){return}

    // add double-click event
    if(cfg.toggle.enable){
        document.addEventListener('dblclick', function(){toggleLang(langs)}, false);
    }

    var parent = $('left-navigation');
    if(!parent){return}

    // language tabs
    if(cfg.tab.enable){
        // create tab frame
        var tabdiv = $n('div');
        tabdiv.setAttribute('id', 'langs');
        tabdiv.setAttribute('class', 'vectorTabs');
        tabdiv.setAttribute('style', 'margin-left: 24px;');
        parent.appendChild(tabdiv);
        var ul = $n('ul');
        tabdiv.appendChild(ul);

        // add language tabs
        cfg.tab.lang.each(function(code){
            var lang = langs[code];
            if(!lang){return}
            var tab = $n('li');
            tab.setAttribute('id', 'ca-lang-' + lang.code);
            var label = makeLabel(cfg.tab.label, lang);
            tab.innerHTML = '<span><a title="' + label + '" href="' + lang.url +
                            '">' + label + '</a></span>';
            ul.appendChild(tab);
        }, this);
    }

    // language menu
    if(cfg.list.enable){
        // create menu frame
        var menudiv = $n('div');
        menudiv.setAttribute('id', 'langs');
        menudiv.setAttribute('class', 'vectorMenu');
        menudiv.innerHTML = '<h5><span>&lt;actions&gt;</span><a href="#"/></h5>';
        parent.appendChild(menudiv);
        var childdiv = $n('div');
        childdiv.setAttribute('class', 'menu');
        menudiv.appendChild(childdiv);
        var ul = $n('ul');
        childdiv.appendChild(ul);

        // add language menu items
        var addMenuItem = function(parent, lang){
            var label = makeLabel(cfg.list.label, lang);
            var li = $n('li');
            li.innerHTML = '<a title="' + label + '" href="' + lang.url + '">' + label + '</a>';
            parent.appendChild(li);
        }
        if(cfg.list.lang && cfg.list.lang.length > 0){
            cfg.list.lang.each(function(code){
                addMenuItem(ul, langs[code]);
            }, this);
        }else{
            langs.each(function(lang){
                addMenuItem(ul, lang);
            }, this);
        }
    }
}

if(!validPage()){return}
transformConfig();
transformUI(collectingLangLink());

})();
