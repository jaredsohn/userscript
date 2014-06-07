// ==UserScript==
// @name       niconico Matome Blog Remover
// @namespace  http://userstyles.org/users/141086
// @version    1.0
// @description  Remove Matome Blogs from blomaga item lists
// @include      http://www.nicovideo.jp/
// @include      http://www.nicovideo.jp/?*
// @include      http://ch.nicovideo.jp/portal/blomaga*
// @include      http://www.nicovideo.jp/watch/*
// @copyright  AgentSmith
// ==/UserScript==

(function() {
    // ==common area==
    var url = location.href.split('?');
    var timer = 0;
    // function: add css to header
    function css(k) {
        var t = document.createElement('style');
        t.setAttribute('type','text/css');
        t.setAttribute('id', 'matome_remover');
        document.getElementsByTagName('head')[0].appendChild(t);
        document.getElementById('matome_remover').innerHTML = ('\n<!-- '+ k + '.remove {display:none!important} -->\n');
    }
    // function: Blomaga top item list flag
    function flag_blomaga() {
        var m = document.getElementsByClassName('matome');
        for (i = 0; i < m.length; i++) {
            m[i].parentNode.parentNode.parentNode.className = 'remove';
        }
    }
    // function: Video page marquee area flag
    function flag_marquee() {
        var p = document.getElementsByClassName('textMarqueeInner')[0].getElementsByClassName('item blomaga');
        for (i = 0; i <p.length; i++) {
            if (p[i].getElementsByTagName('a')[0].getAttribute('href').indexOf('nicovideo.jp') == -1) {
                p[i].className = 'remove';
            }
        }
    }
    // ==/common area==
    
    //General Top
    if (url[0] == 'http://www.nicovideo.jp/' ) {
        css('.blomaga_tab_menu li:nth-of-type(3),');
        var item = document.getElementById('blomaga_subject').getElementsByClassName('blomaga_item');
        for (i = 0; i < item.length; i++) {
            if(item[i].getElementsByTagName('a')[0].getAttribute('href').indexOf('nicovideo.jp') == -1 ) {
                item[i].className = 'remove';
            }
        }
    }
    //Blomaga Top
    if(location.href.indexOf('ch.nicovideo.jp/portal/blomaga') > 0) {
        css('li.matomemedia, #contents_side > script[type="text/javascript"] + h2, #contents_side > script[type="text/javascript"] + h2 + div.article_ranking,');
        flag_blomaga();
        //Additional Items
        document.addEventListener('DOMNodeInserted', function() {
            if(timer) return;
            timer = setTimeout(function() {
                flag_blomaga();
                timer = 0;
            }, 30);
        }, false);
    }
    //Video Page
    if(url[0].indexOf('www.nicovideo.jp/watch/') > 1) {
        css('');
        document.addEventListener('DOMNodeInserted', function() {
            if(timer) return;
            timer = setTimeout(function() {
                flag_marquee();
                timer = 0;
            }, 30);
        }, false);
    }
})()