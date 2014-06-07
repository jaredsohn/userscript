// ==UserScript==
// @name            Wikipediaにレファレンス協同データベースでの検索結果を表示するスクリプト
// @namespace       http://penguinlab.jp/
// @include         http://*.wikipedia.org/wiki/*
// ==/UserScript==

(function (){
    var qindex = location.href.indexOf('/wiki/')+6;
    var q = location.href.substring(qindex);
    //01_質問, 02_回答, 03_キーワード, 04_参考資料, 07_事前調査事項 から検索
    //crdの簡易検索ではこれに 09_備考, 05_回答プロセス, 06_照会先が加わる
    var qprefixes = ['01_', '02_', '03_', '04_', '07_'];
    //var qprefixes = ['01_', '03_'];
    
    var qstr = '';
    for (var i = 0; i < qprefixes.length; i += 1) {
        qstr += qprefixes[i] + q + '.';
    }
    qstr = qstr.substring(0, qstr.length - 1);
    var searchurl = "http://crd.ndl.go.jp/refapi/servlet/refapi.RSearchAPI?results_num=3&query_logic=2&query=" + qstr;
    
    // crd検索結果へのリンクのために必要なパラメータ
    // http://crd.ndl.go.jp/GENERAL/servlet/common.Controler
    qd = decodeURIComponent(q)
    var post_param = {
        BSN_ID :'NDL0101',
        BTN_ID : 'btnDetailSearch',
        hdnResLst: 'false',
        hdnSolutionFlg: 'false',
        ndc_num : '',
        rdoMaxRecord : '0',
        selNotSch: ['1', '1', '1', '1', '1'],
        selSchJoin: '2',
        selSchKey: ['1', '4', '5', '6', '9'],
        selSchTop: '0',
        txtSchKey: ['', qd, qd, qd, qd]
    }
    
    // 検索結果を納めるコンテナ作り
    var element = document.createElement('div');
    element.innerHTML = '<h2>レファレンス協同データベース</h2><div id="crd_search_results">読み込み中...</div>';
    
    var before = null;
    var r = null;
    
    //table.navboxがあればその直前に
    if (!before) {
        r =  document.getElementsByTagName('table');
        for (i = 0; i < r.length; i += 1) {
            if (r[i].getAttribute('class') && (r[i].getAttribute('class').split(' ').indexOf('navbox') != -1)){
                before = r[i];
                break;
            }
        }
    }
    //なければdiv.printfooterの直前に
    if (!before) {
        r =  document.getElementsByTagName('div');
        for (i = 0; i < r.length; i += 1) {
            if (r[i].getAttribute('class') === 'printfooter') {
                before = r[i];
                break;
            }
        }
    }
    //コンテナを入れる
    document.getElementById('bodyContent').insertBefore(element, before);
    
    // crd検索結果へのリンクのために必要なform作り
    var form = '<form action="http://crd.ndl.go.jp/GENERAL/servlet/common.Controler" method="post" name="crd_search_results_link">';
    for (k in post_param){
        //値が配列なら
        if (Object.getPrototypeOf(post_param[k]) === Array.prototype){
            for (i = 1; i < post_param[k].length; i += 1) {
                form += '<input type="hidden" name = "' + k + '" value="' + post_param[k][i] + '" />';
            }
        }else{
            form += '<input type="hidden" name = "' + k + '" value="' + post_param[k] + '" />';
        }
    }
    form += '</form>'
    
    //リクエスト発行
    GM_xmlhttpRequest({
        method:"GET",
        url: searchurl,
        onload:function(response){
            var resxml = (new DOMParser).parseFromString(response.responseText, "application/xml");
            
            var results = resxml.getElementsByTagName('result');
            var l = results.length;
            //ヒットしなければ抜ける
            if (l == 0) {
                document.getElementById('crd_search_results').innerHTML = '該当データなし ';
                return;
            }
            
            // resultを整形
            innerhtml = '<dl>'
            for(var i = 0; i < l; i += 1){
                var question = results[i].getElementsByTagName('QUESTION')[0].childNodes[0].nodeValue;
                if (question.length > 100) question = question.substring(0, 100) + "...";
                
                var link = results[i].getElementsByTagName('URL')[0].childNodes[0] .nodeValue;
                
                var answer = results[i].getElementsByTagName('ANSWER')[0].childNodes[0] .nodeValue;
                if (answer.length > 200) answer = answer.substring(0, 200) + "...";
                
                var html = '<dt><a class="external text" href="' + link + '">' + question + '</a></dt>'
                            + '<dd>' + answer  + '</dd>';
                innerhtml += html;
            }
            //crdへのリンクをくっつけて・・・
            innerhtml += '</dl><p><a class="external text" href="http://crd.ndl.go.jp/GENERAL/servlet/common.Controler" onclick="document.crd_search_results_link.submit();return false;">' + resxml.getElementsByTagName('hit_num')[0].childNodes[0].nodeValue + ' 件の検索結果を表示（レファレンス協同データベース）</a></p>' + form;
            //コンテナに挿入
            document.getElementById('crd_search_results').innerHTML = innerhtml;
        }
    });
})();
