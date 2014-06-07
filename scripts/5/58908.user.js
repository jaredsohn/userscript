// ==UserScript==
// @name           Add R-18 Button
// @author         favril
// @namespace      http://script41self.seesaa.net/
// @description    ニコニコ動画のランキングにR-18のボタンを追加するスクリプト
// @version        0.2.0
// @include        http://www.nicovideo.jp/ranking/mylist/*
// @include        http://www.nicovideo.jp/ranking/res/*
// @include        http://www.nicovideo.jp/ranking/view/*
// @include        http://www.nicovideo.jp/ranking/fav/*
// @include        http://www.nicovideo.jp/ranking
// @include        http://www.nicovideo.jp/ranking/
// @exclude        http://www.nicovideo.jp/ranking/*/hourly/*
// ==/UserScript==

(function(){
    if (/^http:\/\/www\.nicovideo\.jp\/ranking\/?$/.test(location.href)) {
        var inpos = document.evaluate('id("PAGEBODY")/a[@name="end"]', document, null, 7, null);
        if (!inpos.snapshotLength) return;
        inpos = inpos.snapshotItem(0);
        
        var a  = document.createElement('a');
        a.href = '/ranking/fav/daily/g_r18';
        a.style.fontSize   = '14px';
        a.style.lineHeight = '1.25';
        a.style.fontWeight = 'bold';
        a.style.whiteSpace = 'nowrap';
        a.innerHTML        = 'R-18';
        
        var div = document.createElement('div');
        div.style.textAlign    = 'center';
        div.style.marginBottom = '16px';
        div.appendChild(a);
        
        inpos.parentNode.insertBefore(div, inpos);
    } else {
        // create r18 opt
        var opt   = document.createElement('option');
        opt.value = location.href.replace(/\/[^\/]+?\/?$/, '/g_r18');
        opt.innerHTML = 'R-18';

        // insert
        var opts = document.evaluate('id("switch")//form/select/option', document, null, 7, null);
        if (!opts.snapshotLength) return;
        for (var i=0; i<opts.snapshotLength; i++) {
            if (opts.snapshotItem(i).value.indexOf('/g_r18') != -1) return;
        }

        var inpos = opts.snapshotItem(opts.snapshotLength-1);
        inpos.parentNode.insertBefore(opt, inpos);
    }
})();