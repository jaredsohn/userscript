// ==UserScript==
// @name           NicoSearchPtsDisplay
// @namespace      http://d.hatena.ne.jp/shobonengine/
// @description    ニコニコ動画の（キーワード／タグ）検索一覧に総合ポイントを表示します。総合ポイントはニコニコ大百科の計算式で算出されます。
// @include        http://www.nicovideo.jp/search/*
// @include        http://www.nicovideo.jp/tag/*
// ==/UserScript==

(function () {
    var convertToNum = function(str) {
        return parseInt(str.replace(/,/g, ""), 10);
    };
    
    var addFigure = function(str) {
        var num = new String(str);
        while (1) {
            var replaced = num.replace(/^(-?\d+)(\d{3})/, '$1,$2');
            if (num == replaced) {
                break;  // 置換されなければ終了
            }
            num = replaced;
        }
        return num;
    };
    
    var thumb_col;
    var style = 'font-size:12px; font-weight:bold; text-align:right;';
    do {
        // 4 カラム
        var results = document.getElementsByClassName('thumb_col_4');
        if (results.length > 0) {
            thumb_col = results;
            style = style + '';
            break;
        }
        // 2 カラム
        results = document.getElementsByClassName('thumb_col_2');
        if (results.length > 0) {
            thumb_col = results;
            style = style + ' margin:0 192px -4px 0;';
            break;
        }
        // 1 カラム
        results = document.getElementsByClassName('thumb_col_1');
        if (results.length > 0) {
            thumb_col = results;
            style = style + ' margin:0 408px -4px 0;';
            break;
        }
    } while(0);
    
    for (var i = 0; i < thumb_col.length; i++) {
        var entry = thumb_col[i];
        // 再生数
        var vinfo_view = entry.getElementsByClassName('vinfo_view');
        var view = parseInt(convertToNum(vinfo_view[0].innerHTML), 10);
        // コメント
        var vinfo_res = entry.getElementsByClassName('vinfo_res');
        var res = parseInt(convertToNum(vinfo_res[0].innerHTML), 10);
        // マイリスト
        var vinfo_mylist = entry.getElementsByClassName('vinfo_mylist');
        var mylist = parseInt(convertToNum(vinfo_mylist[0].innerHTML), 10);
        // 宣伝
        var vinfo_uadp = entry.getElementsByClassName('vinfo_uadp');
        var uadp = parseInt(convertToNum(vinfo_uadp[0].innerHTML), 10);
        // 総合ポイントを計算する
        var r = (view + mylist) / (view + res + mylist);
        var pts = Math.ceil(view + (res * r) + mylist * 15 + uadp * 0.3);
        // 挿入要素を新規作成する
        var insert = document.createElement('p');
        insert.innerHTML = addFigure(pts) + ' pts';
        insert.setAttribute('style', style);
        // 挿入する
        entry.insertBefore(insert, entry.firstChild);
    }
})();