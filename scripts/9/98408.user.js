// ==UserScript==
// @name        readable_auto
// @namespace   http//example.com
// @description 指定したサイトの本文のみを表示する。
// @include     http://*
// ==/UserScript==
(function(){
    var d = document;
    var href = d.location.href;
    var body = d.getElementsByTagName('body')[0];
    
    // 設定
    var DEBUG = false;
    var includes = [
        "/blog.livedoor.jp/",
        "/blogs.yahoo.co.jp/",
        "/ameblo.jp/",
        "/gigazine.net/",
        ".fc2.com/"
    ];
    var MARGIN_LEFT = body.offsetWidth * 0.20;
    var MARGIN_RIGHT = body.offsetWidth * 0.25;
    var BODY_WIDTH = body.offsetWidth * 0.60;
    
    // 指定したサイト以外なら終了。
    for(var i = 0, n = includes.length; i < n; i++){
        if(0 <= href.indexOf(includes[i])){
            break;
        }
    }
    if(i == includes.length){
        return;
    }
    
    // String拡張: タグを削除する。
    String.prototype.stripTags = function(){
        return this.replace(/^.+?>/, "")
                   .replace(/<\/.+/, "")
                   .replace(/<!.+/, "");
    };
    
    // String拡張: 改行を削除する。
    String.prototype.chomp = function(){
        return this.replace(/(\r|\n)/, "");
    };
    
    // メイン処理
    (function(){
        // 本文への目印としてヘッダーを取得。
        var heads = [];
        pushHeaders(heads, "h3");
        pushHeaders(heads, "h2");
        pushHeaders(heads, "h1");
        
        // ページタイトルに似ているヘッダから本文を判別。
        var title = d.title;
        var target = null;
        for(var i = 0, n = heads.length; i < n; i++){
            var text = getText(heads[i]);
            p(text);
            if(10 < text.length){
                if(title.indexOf(text) !== -1){
                    target = heads[i];
                    break;
                }
            }
        }
        
        // 本文が見つかればページを編集。
        p("target = " + !!target);
        if(target){
            // スタイルを無効化。
            for(var i = 0, n = d.styleSheets.length; i < n; i++){
                d.styleSheets[i].disabled = true;
            }
            
            // ページ内容を生成。
            var parent = target.parentNode.parentNode;
            target.parentNode.style.width = BODY_WIDTH + "px";
            
            // 本文のタイトルを削除。
            target.parentNode.removeChild(target);
            
            // 本文のタイトルを再設定。
            var a = d.createElement("a");
            a.innerHTML = title;
            a.href = href;
            
            var t = d.createElement("h1");
            t.appendChild(a);
            
            parent.insertBefore(t, parent.childNodes[0]);
            
            // BODYを設定。
            body.style.marginLeft = MARGIN_LEFT + "px";
            body.style.marginRight = MARGIN_RIGHT + "px";
            body.innerHTML = parent.innerHTML;
        }
    })();
    
    // 指定したタグ名の要素を配列に加える。
    function pushHeaders(dst, tagName){
        var es = d.getElementsByTagName(tagName);
        for(var i = 0, n = es.length; i < n; i++){
            dst.push(es[i]);
        }
    }
    
    // ヘッダのテキストを取得する。
    function getText(x){
        return x.innerHTML.stripTags().chomp();
    }
    
    // デバッグプリント。
    function p(x){
        if(DEBUG){
            GM_log(x.toString());
        }
    }
})();
