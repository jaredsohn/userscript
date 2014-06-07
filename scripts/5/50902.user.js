// ==UserScript==
// @name           NicoNicoDouga GUI change.
// @namespace      Shigecky
// @description    ニコニコ動画(原宿)の再生ページで詳細情報の常時表示と構成変更。I change regular indication and constitution of the detailed information of it in a reproduction page of NicoNicoDouga(Harajuku).
// @include        http://www.nicovideo.jp/watch/*
// @grant          none
// @homepage       http://userscripts.org/scripts/show/50902
// @updateURL      http://userscripts.org/scripts/show/50902.user.js
// @version        0.4.0
// ==/UserScript==

(function(w) {
    var getElementsByClassName = function(targetElm, tagName, className) {
        var nodes = targetElm.getElementsByTagName(tagName);
        var elements = new Array();
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].className == className) elements.push(nodes[i]);
        }
        return elements;
    };
    
    var watchheader = document.getElementById('WATCHHEADER');
    var des_1s = getElementsByClassName(watchheader, 'div', 'des_1');
    var des_2s = getElementsByClassName(watchheader, 'div', 'des_2');
    
    var elm_des_1 = des_1s[0];      // 簡略説明
    var elm_des_1_btn = des_1s[1];  // 「詳細情報・メニュー」折り畳み時のボタン領域
    var elm_des_2_date = des_2s[0]; // 投稿日・ランキング
    var elm_des_2 = des_2s[1];      // 説明文
    var elm_des_2_btn = des_2s[2];  // 「詳細情報・メニュー」展開時のボタン領域

    // 簡略説明と折り畳みブロックを隠す
    // 詳細情報関係を表示する
    elm_des_1.style.display = "none";
    elm_des_1_btn.style.display = "none";
    elm_des_2_date.style.display = "block";
    elm_des_2.style.display = "block";
    elm_des_2_btn.style.display = "block";
    
    // 移動先のテーブルを作成する
    var des_tbl = document.createElement('table');
    var des_tbl_row = des_tbl.insertRow(-1);
    var des_tbl_cell1 = des_tbl_row.insertCell(-1);
    var des_tbl_cell2 = des_tbl_row.insertCell(-1);
    des_tbl.setAttribute("style","width:100%");
    des_tbl_cell1.setAttribute("style","width:auto;vertical-align:top");
    des_tbl_cell2.setAttribute("style","width:256px;vertical-align:top");
    
    // テーブルを動画の下(動画フッタの前)に移動する
    document.getElementById('PAGEBODY').insertBefore(des_tbl, document.getElementById('WATCHFOOTER'));
    
    // テーブルに説明等を移動する
    des_tbl_cell1.appendChild(elm_des_2);
    des_tbl_cell2.appendChild(elm_des_1_btn);
    des_tbl_cell2.appendChild(elm_des_2_btn);

    // 微調整:タブ枠を文章より上にして、動画プレイヤー直下にする
    elm_des_2.insertBefore(document.getElementById('itab'), elm_des_2.getElementsByTagName('P').item(0));
    elm_des_2.insertBefore(getElementsByClassName(elm_des_2,'div', 'info_frm')[0], elm_des_2.getElementsByTagName('P').item(0));

    // タイトルをページトップへ
    var bounds = watchheader.getBoundingClientRect();
    w.scrollTo(bounds.left, bounds.top);

})(this.unsafeWindow || this);
