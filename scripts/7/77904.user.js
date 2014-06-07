// ==UserScript==
// @name           find twitterID in d.hatena
// @namespace      http://efcl.info/
// @include        http://d.hatena.ne.jp/*
// @description    はてなダイアリーからTwitterアカウントを表示
// ==/UserScript==

new function(doc){
    const HTAPI = "http://hatena-anohito.appspot.com/c/?hatena_id=";
    function runnable(f) {
        var o;
        o = f(function (t) { try{ o.send(t); }catch(e){} });
        o.next();// ジェネレーターオブジェクトを作ったら一回目のnext();
    }
    function getTwitterID(ID,request){
        GM_xmlhttpRequest({
            method: 'get',
            url: HTAPI + ID,
            onload: function(res) {
                if (res.readyState == 4 && res.status == 200) {
                    request(res.responseText);
                }
            }
        })
    }
    runnable(function (request){
        // var AuthorName = unsafeWindow.Hatena.Author.name;
        var m = location.href.match(/^http:\/\/d\.hatena\.ne\.jp\/(.*?)\//);
        var AuthorName = m && m[1];
        // yieldで一時停止        
        var jsonObj = yield getTwitterID(AuthorName ,request);
        var twitter = JSON.parse(jsonObj).twitter;
        if(twitter.hasOwnProperty("screen_name") && twitter.hasOwnProperty("user_id") && twitter.hasOwnProperty("user_name")){
            var div = doc.createElement("div");
            div.setAttribute("style", "font-size:12px!important;position:absolute;overflow:auto;z-index:18999;border:0;margin:0;padding:5px;top:0;left:0;background-color:#fff;-moz-border-radius:0 0 10px 0;opacity:0.7;");
            var a = doc.createElement("a");
            a.href = "http://twitter.com/" + twitter.screen_name;
            a.textContent = twitter.screen_name + "("+twitter.user_name+")";
            var img = doc.createElement("img");
            img.src = twitter.icon;
            img.width = "32";
            img.height = "32";
            div.appendChild(img);
            div.appendChild(a);
            doc.body.appendChild(div);
        }
    });
    
}(document)