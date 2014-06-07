// ==UserScript==
// @name           Twitter search(ja) result on Google
// @namespace      http://efcl.info/
// @include        http://www.google.*/search?*
// ==/UserScript==
// original Twitter Search Results on Google for Greasemonkey [ http://userscripts.org/scripts/show/43451 ]

(function(doc){
    // *config* display number
    var SEARCHINTERVAL = 5;
    // 操作メソッド - ナビ子記法
    var twit = {
        getWord : urlParse,
        getJson : getJson,
        templete : makeTemplete,
    }
    // twit.getWord - URLから検索単語を返す
    function urlParse(){
        var URL = doc.location.href;
        var m = URL.match(/[&?]q=([^&]*)(?:&|$)/);
        m = m && m[1]; // match word
        return m;
    }
    // twit.getJson - JSON取得後、twit.templeteを呼ぶ
    function getJson(word){
        if( word ){
            word = word + " -noise";
            GM_xmlhttpRequest({
                method:"GET",
                url:"http://yats-data.com/yats/search?query="+word+"&json",
                headers:{
                    "User-Agent":"Mozilla/5.0",
                    "Accept":"text/json"
                },
                onload:function(res){
                    twit.templete(res.responseText , word);
                },
                onerror:function(res){
                    console.log(res);
                }
            });
        }
    }
    // twit.templete - テンプレートに従って挿入
    function makeTemplete(jsonObj ,word){
        try {
          var obj = JSON.parse(jsonObj);
        } catch (err) {
          GM_log(err); // Error parsing JSON.
        }
        var results = document.getElementById("res");// 挿入位置
        var tw_div = document.createElement("div");
        tw_div.id = "GM_Twitter_search_on_Google_div"
        // Search word link
        var h3 = document.createElement("h3");
        h3.className = "r";
        h3.innerHTML = "<a href='http://yats-data.com/yats/search?query=" + word + "'>Twitter results for <em>"
        + htmlescape(decodeURI(word)) + "</em></a>";
        // make templete - 結果が存在するなら
        if (obj && obj.length > 0) {
            var ds = document.createElement("div");
            ds.id = "GM_Twitter_search_on_Google"
            ds.style.fontSize = "80%";
            ds.lineHeight = "1.6";
            tw_div.appendChild(h3);
            tw_div.appendChild(ds);
            results.insertBefore(tw_div, results.firstChild);
            var tmp = addReslut(obj, 0); // 0番目から
            var addButton = document.createElement("button");
            addButton.addEventListener("click", function() {
                tmp = addReslut(obj, tmp);
            }, false);
            addButton.textContent = "追加";
            var t = doc.getElementById("GM_Twitter_search_on_Google_div");
            t.appendChild(addButton);
        } else {
            console.debug(results)
            tw_div.appendChild(h3);
            tw_div.appendChild(document.createTextNode(" - 検索結果はありません"));
            results.insertBefore(tw_div, results.firstChild);
        }
    }
    function addReslut(obj ,startNum){
        var t = [];
        var objLength = obj.length;
        var results = document.getElementById("GM_Twitter_search_on_Google");
        if(objLength == startNum){
            results.innerHTML += "これ以上追加できません";
            return null;
        }
        var to = startNum + SEARCHINTERVAL;
        if(objLength < SEARCHINTERVAL){
            to = objLength;
        }else if(objLength < to){
            to = objLength;
        }
        for(var i=startNum;i<to;i++){
            t.push(listTag(obj[i].user, obj[i].content, obj[i].url,obj[i].time));
        }
        results.innerHTML += t.join("\n");
        return to;
    }
    // テンプレート
    function listTag(user, content , url ,time){
        var userHome = "http://twitter.com/"+ user;
        var cHtml = <>
          <div class="s2">
            <a href={userHome} class="l">{user}</a>:
            {content}
            <span class="f"><a href ={url} style="color:#999999;">{time}</a></span>
          </div>
          <hr />
        </>;
        return cHtml.toString();
    }
    // HTMLエスケープ
    function htmlescape(str){
        var tmp = document.createElement("div");
        tmp.appendChild(document.createTextNode(str));
        return tmp.innerHTML;
    };
    // 二重表示を防止
    if(document.getElementById("GM_Twitter_search_on_Google_div")) return;
    /* init */
    var searchWord = twit.getWord();
    twit.getJson(searchWord);
})(document);