// ==UserScript==
// @name       ErogameScape Point Checker
// @namespace  http://blueblueblue.fool.jp/wp/
// @version    1.2
// @description  エロスケの中央値とデータ数を各外部サイトに表示
// @include    http://www.dlsite.com/*RJ*
// @include    http://www.dlsite.com/*VJ*
// @include    http://www.dmm.co*pcgame*cid=*
// @include    http://www.dmm.co*doujin*cid=*
// @include    http://www.digiket.com/*ID=*
// @include    http://tg-frontier.jp/soft.aspx*
// @include    http://www.comshop.ne.jp/*
// @include    http://www.comshop.co.jp/kaitori/*
// @include    http://www.comshop.co.jp/g-haku*
// @include    http://www.amazon.co.jp/*
// @include    http://www.getchu.com/soft.phtml*
// @include    http://gyutto.com/*/item*
// @include    http://www.ampnet.jp/item/*
// @include    http://medio.bz/*
// @include    http://a.sofmap.com/*
// @include    http://takarajima.qrestnet.co.jp*
// @copyright  2012+, ebi
// ==/UserScript==
(function (loadedListener) {
    var doc, readyState;
  
    doc = document;
    readyState = doc.readyState;
  
    if (readyState === 'complete' || readyState === 'interactive') {
      loadedListener();
    } else {
      doc.addEventListener("DOMContentLoaded", loadedListener, false);
    }
})
(function () {
    //undefinedチェック
    function chkUndefined(num) {
        num = String(num);
        if (num == "undefined" || num == "") {
            return "-";
        } else {
            return num;
        }
    }
    
    var doc = document;
    var debug = false;
    if ( location.href.indexOf("dlsite.com", 0) !== -1) {
        var id_site = "dlsite_id";
        var url = location.href.split(/\?|\&|\/|\./);
        for (var i=0; i<url.length; i++) {
            if ( url[i].indexOf("VJ", 0) !== -1 || url[i].indexOf("RJ", 0) !== -1 ) {
                var id = url[i];
                break;
            }
        }
        if ( id.indexOf("VJ", 0) == -1 && doc.getElementById("work_outline").innerText.indexOf("同人ゲーム", 0) == -1 ) {
            return;
        }
        var id_name = "work_name";
    } else if ( location.href.indexOf("dmm.co", 0) !== -1) {
        var id_site = "dmm";
        var url = location.href.split(/\?|\&|\//);
        for (var i=0; i<url.length - 1; i++) {
            if (url[i].indexOf("cid=", 0) !== -1) {
                var id = url[i].replace("cid=", "");
                break;
            }
        }
        var id_name = "title";
    } else if ( location.href.indexOf("digiket.com", 0) !== -1) {
        var id_site = "digiket";
        var url = location.href.split(/\?|\&|\//);
        for (var i=0; i<url.length - 1; i++) {
            if (url[i].indexOf("ID=", 0) !== -1) {
                var id = url[i].replace("ID=", "");
                break;
            }
        }
        var id_name = "digiket";
    } else if ( location.href.indexOf("tg-frontier.jp", 0) !== -1) {
        var id_site = "tgfrontier";
        var url = location.href.split(/\?|\&|\//);
        for (var i=0; i<url.length; i++) {
            if (url[i].indexOf("s=", 0) !== -1) {
                var id = url[i].replace("s=", "");
                break;
            }
        }
        var id_name = "mainColumn";
    } else if ( location.href.indexOf("comshop.ne.jp", 0) !== -1 ) {
        var id_site = "ean";
        var td = doc.getElementsByTagName("td");
        for (var i=0; i < td.length; i++) {
            if ( td[i].className == "pub_usr_form_left_2" ) {
                var id = td[i + 1].innerText;
                break;
            }
        }
        var id_name = "pub_main_pnkz";
    } else if ( location.href.indexOf("comshop.co.jp", 0) !== -1 && location.href.indexOf("g-haku", 0) !== -1) {
        var id_site = "ean";
        var url = location.href.split(/\?|\&|\//);
        for (var i=0; i<url.length; i++) {
            if (url[i].indexOf("jan=", 0) !== -1) {
                var id = url[i].replace("jan=", "");
                break;
            }
        }
        var id_name = "g-haku";
    } else if ( location.href.indexOf("comshop.co.jp", 0) !== -1 && location.href.indexOf("kaitori", 0) !== -1) {
        var id_site = "ean";
        var url = location.href.split(/\?|\&|\/|\./);
        for (var i=0; i<url.length; i++) {
            if (url[i].indexOf("item-", 0) !== -1) {
                var id = url[i].replace("item-", "");
                break;
            }
        }
        var id_name = "datail_title";
    } else if ( location.href.indexOf("amazon.co.jp", 0) !== -1 ) {
        var id_site = "asin";
        var li = doc.getElementsByTagName("li");
        var flag = 0;
        for (var i=0; i < li.length; i++) {
            if ( li[i].innerText.indexOf("ASIN:", 0) !== -1 ) {
                var id = li[i].innerText.split(":")[1];
                flag++;
            }
            if ( li[i].innerText.indexOf("ソフトウェア", 0) !== -1 ) {
                flag++;
            }
            if ( flag == 2 ) {
                break;
            }
        }
        if ( flag !== 2 ) { return }
        var id_name = "priceBlock";
    } else if ( location.href.indexOf("getchu.com", 0) !== -1 ) {
        var id_site = "comike";
        var url = location.href.split(/\?|\&|\//);
        for (var i=0; i<url.length; i++) {
            if (url[i].indexOf("id=", 0) !== -1) {
                var id = url[i].replace("id=", "");
                break;
            }
        }
        var id_name = "soft-title";
    } else if ( location.href.indexOf("gyutto.com", 0) !== -1 ) {
        var id_site = "gyutto_id";
        var url = location.href.split(/\?|\&|\//);
        for (var i=0; i<url.length; i++) {
            if (url[i].indexOf("item", 0) !== -1) {
                var id = url[i].replace("item", "");
                break;
            }
        }
        var id_name = "RightSide";
    } else if ( location.href.indexOf("ampnet.jp", 0) !== -1 ) {
        var id_site = "ean";
        var td = doc.getElementsByTagName("body")[0].getElementsByTagName("td");
        for (var i=0; i < td.length; i++) {
            if ( td[i].innerText == "JANコード" ) {
                var id = td[i + 1].innerText;
                break;
            }
        }
        var id_name = "ampnet";
    } else if ( location.href.indexOf("medio.bz", 0) !== -1 ) {
        var id_site = "ean";
        var url = location.href.split(/\?|\&|\//);
        for (var i=0; i<url.length; i++) {
            if (url[i].indexOf("item=", 0) !== -1) {
                var id = url[i].replace("item=", "");
                break;
            }
        }
        var id_name = "medio.bz";
    } else if ( location.href.indexOf("a.sofmap.com", 0) !== -1 ) {
        var id_site = "ean";
        var td = doc.getElementsByTagName("body")[0].getElementsByTagName("td");
        for (var i=0; i < td.length; i++) {
            if ( td[i].innerText.indexOf("JAN：", 0) !== -1 ) {
                var id = td[i].innerHTML.substring(td[i].innerHTML.indexOf("JAN：", 0) + 4, td[i].innerHTML.length);
                id = id.substring(0, id.indexOf("<", 0) );
                break;
            }
        }
        var id_name = "a.sofmap.com";
    } else if ( location.href.indexOf("takarajima.qrestnet.co.jp", 0) !== -1 ) {
        var id_site = "ean";
        var td = doc.getElementsByTagName("body")[0].getElementsByTagName("td");
        for (var i=0; i < td.length; i++) {
            if ( td[i].className == "tbl_title_td" && td[i].innerText.indexOf("JAN:", 0) !== -1 ) {
                var id = td[i + 1].innerText;
                break;
            }
        }
        var id_name = "takarajima.qrestnet.co.jp";
    }

    id = id.replace(/(^\s+)|(\s+$)/g, "");
    var url = "http://blueblueblue.fool.jp/php/eschecker_json.php?limit=1&id_site=" + id_site + "&id=" + id;
    
    var style = '<style type="text/css">'
              + 'div#us-esc-wrapper {'
              + '	max-width: 450px !important;'
              + '	margin:0 0 10px 0;'
              + '	padding:2px 6px;'
              + '	border-width:0 0 0 25px;'
              + '	border-color: #80CEDD;'
              + '	border-style:solid;'
              + '	background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAL0lEQVQIW2MULbnynwEJpIpyMTAiC4IEZr/+hhCECYA0gVUiC4AFqzrv/QdpQQYA30IYVi06jmkAAAAASUVORK5CYII=);'
              + '	color:#EBF7FA;'
              + '	line-height:140%;'
              + '	font-weight:bold;'
              + '	font-family:Ariel;'
              + '	font-size:12px;'
              + '}'
              + 'div#us-esc-wrapper span {'
              + '	margin:0 8px;'
              + '	padding:2px 8px;'
              + '}'
              + 'div#us-esc-wrapper a, div#us-esc-wrapper a:link {'
              + '	color:#FFF !important;'
              + '}'
              + '</style>';
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (x) {
            var myData = JSON.parse(x.responseText);
            if (myData.id == null) {
                var string = '<span>Unknown</span><span>Powered by <a href="http://erogamescape.dyndns.org/~ap2/ero/toukei_kaiseki/">ErogameScape</a>';
            } else {
                var string = '<span>Med: ' + coalesce(myData.median, '--') + ' / Cnt: ' + coalesce(myData.count2, '--') + ' / Tim: ' + coalesce(myData.total_play_time_median, '--') + '</span><span>Powered by <a href="http://erogamescape.dyndns.org/~ap2/ero/toukei_kaiseki/game.php?game=' + myData.id + '">ErogameScape</a>';
            }
            if ( id_site == "digiket" ) {
                doc.getElementsByTagName('table')[13].innerHTML += style + '<div id="us-esc-wrapper">' + string + '</div>';
            } else if ( id_site == "gyutto_id") {
                doc.getElementById(id_name).getElementsByTagName('h1')[0].innerHTML += style + '<div id="us-esc-wrapper">' + string + '</div>';
            } else if ( id_site == "tgfrontier" ) {
                doc.getElementById(id_name).getElementsByTagName('div')[10].innerHTML += style + '<div id="us-esc-wrapper">' + string + '</div>';
            } else if ( id_site == "ean" && id_name == "g-haku" ) {
                doc.getElementById('content').getElementsByTagName('h1')[0].innerHTML += style + '<div id="us-esc-wrapper">' + string + '</div>';
            
            } else if ( id_site == "ean" && id_name == "ampnet" ) {
                doc.getElementsByTagName('table')[1].getElementsByTagName('div')[2].innerHTML += style + '<div id="us-esc-wrapper">' + string + '</div>';
            
            } else if ( id_site == "ean" && id_name == "medio.bz" ) {
                doc.getElementById('item_basic').getElementsByTagName('h2')[0].innerHTML += style + '<div id="us-esc-wrapper">' + string + '</div>';
            
            } else if ( id_site == "ean" && id_name == "a.sofmap.com" ) {
                doc.getElementById('contents_main').getElementsByTagName('h1')[0].innerHTML += style + '<div id="us-esc-wrapper">' + string + '</div>';
            
            } else if ( id_site == "ean" && id_name == "takarajima.qrestnet.co.jp" ) {
                doc.getElementsByTagName('table')[20].getElementsByTagName('td')[1].innerHTML += style + '<div id="us-esc-wrapper">' + string + '</div>';
            
            } else {
                doc.getElementById(id_name).innerHTML += style + '<div id="us-esc-wrapper">' + string + '</div>';
            }
        }
    });
    debug_alert("id_site:" + id_site + "\nid:" + id + "\nid_site:" + id_name, debug);
    
    function coalesce(a, b) {
        if ( a == undefined ) { return b }
        if ( !a ) { return b }
        return a;
    }
    
    function debug_alert(a, b) {
        if ( b ) { alert(a) }
    }
    
})();
