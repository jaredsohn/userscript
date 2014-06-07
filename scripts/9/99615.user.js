// ==UserScript==
// @name           Gyazo preview for Twitter
// @namespace      http://endflow.net/
// @description    Allows you to preview Gyazo image links on Twitter.
// @version        0.1.1
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @license        MIT License
// @history        [2011-03-23] 0.1.0 first release
//                 [2011-05-16] 0.1.1 fix to support Google Chrome

(function(){

var code = (function(){

if(!window.twttr || !window.twttr.mediaType){
    setTimeout(arguments.callee, 100);
    return;
}

var $ = window.$,
    twttr = window.twttr;

twttr.mediaType('twttr.media.types.Gyazo', {
    icon: 'photo',
    favicon: 'http://gyazo.com/public/img/favicon.ico',
    domain: 'http://gyazo.com/',
    matchers: {
        img: /^http:\/\/gyazo\.com\/\w+\.\w+/i
    },
    process: function(proc){
        this.data.href = this.url.substr(-1) === '/' ? this.url.slice(0, -1) : this.url;
        proc();
    },
    render: function(target){
        var html = '<div class="gyazo">' +
                     '<a href="{href}" target="_blank"><img src="{href}" /></a>' +
                   '</div>';
        $(target).append(twttr.util.supplant(html, this.data));
    }
});

}).toString();

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + code + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);

})();
