// ==UserScript==
// @name           NicoVideo preview for Twitter
// @namespace      http://endflow.net/
// @description    Allows you to preview NicoVideo link in Twitter sidebar.
// @version        0.1.4
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2010-10-24] 0.1.0 first release
//                 [2010-11-11] 0.1.1 improved to support short URLs
//                 [2010-11-13] 0.1.2 fix URL pattern
//                 [2011-03-28] 0.1.3 fix for changes of Twitter web client
//                 [2011-05-16] 0.1.4 fix to support Google Chrome

(function(){

var code = (function(){

if(!window.twttr || !window.twttr.mediaType){
    setTimeout(arguments.callee, 100);
    return;
}

var $ = window.$,
    twttr = window.twttr;

twttr.mediaType('twttr.media.types.NicoVideo', {
    title: 'ニコニコ動画',
    icon: 'video',
    favicon: 'http://res.nimg.jp/img/favicon.ico',
    domain: 'http://www.nicovideo.jp/',
    matchers: {
        tiny: /^http:\/\/nico\.ms\/(.*)/g,
        standard: /^http:\/\/[^\/]*nicovideo\.jp\/watch\/([^\/]+)\/?/g
    },
    process: function(proc){
        this.data.id = this.url.split('/').pop();
        proc();
    },
    render: function(target){
        var html = '<iframe width="312" height="186" src="http://ext.nicovideo.jp/thumb/{id}" scrolling="no" style="border:solid 1px #CCC;" frameborder="0"></iframe>';
        $(target).append(twttr.util.supplant(html, this.data));
    }
});

}).toString();

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + code + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);

})();
