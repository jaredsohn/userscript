// ==UserScript==
// @name           nicosearch
// @version        0.1
// @namespace      http://nicotools.com/nicosearch/
// @description    nicosearch
// @include        http://*.nicovideo.jp/
// @include        http://*.nicovideo.jp/*
// ==/UserScript==



(function() {

GM_log("start");

var searchInputElement    = null; // 検索のinput Element
var prevSearchKeyword     = null; // 前回のinput.value値
var suggestSelectPosition = null; // 現在選択されている候補の位置
var suggestlength         = null; // 現在表示されている候補の数
var pageType              = null; // ページの種類

function main() {
    
    // 検索のエレメントを取得する
    getSerachInputElement();
    if ( ! searchInputElement ){ GM_log( "検索が見付かりませんでした。" ); return; }
    
    
    // イベントを拾う
    searchInputElement.addEventListener( "keydown", inputEventAction, true );
    
    GM_log("end");
}
main();


function getSerachInputElement (){
    // video_top, その他動画関係, 静画など
    searchInputElement = document.getElementById("bar_search");
    if ( searchInputElement !== null ){
        pageType = "video";
        return;
    }
    
    // 全体のトップページ
    searchInputElement = document.getElementById("searchWord");
    if (searchInputElement !== null) {
        pageType = "top";
        return;
    }
    
    // キーワード検索結果
    searchInputElement = document.getElementById("search_united");
    if (searchInputElement !== null) {
        pageType = "keyword";
        return;
    }
    
    // 生放送
    searchInputElement = document.getElementById("search_target");
    if (searchInputElement !== null) {
        pageType = "live";
        return;
    }
    
    // 大百科
    searchInputElement = document.getElementsByName("q")[0];
    if (searchInputElement !== null) {
        pageType = "dic";
        return;
    }
    
    return;
}


// 検索フィールド の keydownイベント発生時に実行
function inputEventAction (e) {
    
    setTimeout(function(){
        // 上下キー
        if ( e.keyCode == 38 || e.keyCode == 40 ) {
            arrowKeyDown( e.keyCode );
            return;
        }
        
        // 文字入力
        if ( searchInputElement.value !== prevSearchKeyword ){
            prevSearchKeyword = searchInputElement.value;
            loadJSON(searchInputElement.value, show_suggest);
            return;
        }
    },100);
    
}


// 検索フィールドの文字入力が発生した時に実行
function loadJSON(text, callback) {
    var func = function( obj ){
        callback( JSON.parse(obj.responseText) );
    }
    
    GM_xmlhttpRequest ({
        method: "GET",
        url: "http://nicotools.com/nicosearch/mysqli.php?inp=" + encodeURI(text),
        onload: func
    });
}


// 候補表示
function show_suggest( res ) {
    // 候補が無い場合は前の結果を残す
    if (res == [] || res === false) {
        return;
    }
    
    suggestSelectPosition = null; // 現在選択されている候補の位置
    
    var oldElem = document.getElementById("suggestelem");
    if (oldElem !== null) {
        document.body.removeChild( oldElem );
    }
    
    if ( searchInputElement.value === "" || all_space( searchInputElement.value ) ) {
        return;
    }
    
    var suggestElem = document.createElement( "div" );
    suggestElem.id             = "suggestelem";
    suggestElem.style.position = "absolute";
    
    var inputpos = pos(searchInputElement);
    suggestElem.style.left = "" + (inputpos.left - 3) + "px";
    suggestElem.style.top = "" + (inputpos.top + searchInputElement.offsetHeight + 2) + "px";
    
    suggestElem.style.backgroundColor = "#ffffff";
    suggestElem.style.minWidth = "" + searchInputElement.offsetWidth + "px";
    suggestElem.style.textAlign = "left";
    
    for (var i = 0; i < res.length; i++) {
        var p = document.createElement("p");
        p.style.paddingLeft = "3px";
        
        // クリックした時
        p.addEventListener("click", function(e) {
            searchInputElement.value = e.target.firstChild.nodeValue;
            document.body.removeChild( document.getElementById("suggestelem") );
            var form = formElem(searchInputElement);
            // トップページ用
            // if (form.action != "") {
            if (pageType == "top") {
                var str = "";
                if (form.action.charAt(form.action.length - 1) == "/") {
                    str = "";
                } else {
                    str = "/";
                }
                url = form.action + str + encodeURI(searchInputElement.value);
                document.location = url;
                return;
            }
            
            // 静画用
            if (document.location.host == "seiga.nicovideo.jp") {
                document.getElementById("search_button").click();
                return;
            }
            // 動画関係のページやその他用
            form.submit();
            
            // できない?
            // あきらめることも考えておく
        }, true);
        
        // マウスが上に来た時
        p.addEventListener("mouseover", function(e) {
            e.target.style.backgroundColor = "#afeeee";
        }, true);
        
        // マウスが要素から出た時
        p.addEventListener("mouseout", function(e) {
            e.target.style.backgroundColor = "#ffffff";
        }, true);
        p.appendChild(document.createTextNode(res[i]));
        suggestElem.appendChild(p);
    }
    
    // nicotools.com へのリンク
    var link = document.createElement("a");
    link.href           = "http://nicotools.com/";
    link.style.color    = "#666666";
    link.style.fontSize = "50%";
    link.style.cssFloat = "right";
    link.appendChild(document.createTextNode("Powered by nicotools.com"));
    suggestElem.appendChild(link);
    document.body.appendChild(suggestElem);
    suggestlength = res.length;
}


// 上下が押された時に実行
function arrowKeyDown( keycode ){
    var up = ( keycode != 38 );
    
    var suggestElem = document.getElementById( "suggestelem" );
    if( ! suggestElem ) { return; }
    
    var nextElem = suggestElem.childNodes[ suggestSelectPosition + 1 ];
    
    if ( suggestSelectPosition === null ) {
        suggestSelectPosition = 0;
    } else if (up) {
        suggestSelectPosition += 1;
    } else {
        suggestSelectPosition -= 1;
    }
    
    if ( suggestSelectPosition < 0 ) {
        suggestSelectPosition = suggestlength - 1;
        suggestElem.childNodes[0].style.backgroundColor = "#ffffff";
    } else if ( suggestSelectPosition >= suggestlength ) {
        suggestSelectPosition = 0;
    }
    
    if ( up && suggestElem.childNodes[suggestSelectPosition - 1] ) {
        suggestElem.childNodes[suggestSelectPosition - 1].style.backgroundColor = "#ffffff";
    } else if ( suggestElem.childNodes[suggestSelectPosition + 1] && nextElem.tagName != "A" ) {
        suggestElem.childNodes[suggestSelectPosition + 1].style.backgroundColor = "#ffffff";
    }
    
    if ( suggestSelectPosition != suggestlength - 1 ) {
        suggestElem.childNodes[suggestlength - 1].style.backgroundColor = "#ffffff";
    }
    
    suggestElem.childNodes[suggestSelectPosition].style.backgroundColor = "#afeeee";
    searchInputElement.value = suggestElem.childNodes[suggestSelectPosition].innerHTML;
}


// parentNodeをたどってformになるのを探す submit用
function formElem(elem) {
    if (elem.tagName == "FORM") {
        return elem;
    } else {
        return formElem(elem.parentNode);
    }
}


// 位置を取得
function pos(elem) {
    var rect = elem.getBoundingClientRect();
    var scrolltop = document.body.scrollTop;
    var scrollleft = document.body.scrollLeft;
    return {left: rect.left + scrollleft, top: rect.top + scrolltop};
}


// strが全て空白ならtrue
function all_space(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) != " ") {
            return false;
        }
    }
    return true;
}


// 違う場所をクリックしたらサジェストを消す
document.body.addEventListener("click", function(e) {
    x = e.x;
    y = e.y;
    var suggestElem = document.getElementById("suggestelem");
    if (suggestElem == null) {
        return;
    }
    var rect = suggestElem.getBoundingClientRect();
    if (!(x > rect.left && y > rect.top && x < rect.right && y < rect.bottom)) {
        document.body.removeChild( suggestElem );
    }
}, true);


})();