// ==UserScript==
// @name           BookWeb で三重大学附属図書館での所蔵表示:
// @namespace      http://penguinlab.jp/
// @include        http://bookweb.kinokuniya.co.jp/*
// ==/UserScript==

(function(){
  if (!location.href.match("/cgi-bin/")) return;
  var h3s, klass, as, i, j, href, chain;
  //検索URL：isbnの前まで
  var search_url_before = "http://opac.lib.mie-u.ac.jp/cgi-bin/opc/seek.cgi?isbn=";
  //検索URL：isbnの後
  var search_url_after = "";
  //ヒットしなかった際に表示される文字列
  var no_hit_string = "検索に該当する書誌情報はありませんでした。";
  //ヒットした際に挿入するHTML（リンクはあとで付与）
  var html_hit = " <img src=\"http://www.mie-u.ac.jp/favicon.ico\" border=\"0\" />";
  //ヒットしなかった際に挿入するHTML
  var html_no_hit = " <span style=\"color:red;\">×</span>";
 
  chain = new Chain();
  
  h3s = document.getElementsByTagName("h3");
  
  for (i = 0; i < h3s.length; i += 1) {
    klass = h3s[i].getAttribute("class");
    location.href += "#i:" + i;
    if (klass && (klass === "pro-bname")) {
      as = h3s[i].getElementsByTagName("a");
      
      for (j = 0; j < as.length; j += 1) {
        href = as[j].getAttribute("href");
        
        if (href && href.match(/\/([\dX]+)\.html/)){
          chain.addRequestFunction(
            (function(isbn, h3){
              return function(){
                return ({
                  method: "GET",
                  url: search_url_before + isbn + search_url_after,
                  onload: function(details){
                    var e;
                    if (!details.responseText.match(no_hit_string)){
                      e = document.createElement("a");
                      e.setAttribute("href", search_url_before + isbn + search_url_after);
                      e.innerHTML = html_hit;
                      h3.appendChild(e);
                    }else{
                      e = document.createElement("span");
                      e.innerHTML = html_no_hit;
                      h3.appendChild(e);
                    }
                  }
                });
              }
            })(RegExp.lastParen, h3s[i])
          );
        }
      }
    }
  }
  chain.doChain();
})();

// チェーンを順番に実行していくクラス。
// http://d.hatena.ne.jp/drgqst/20080110/1199976698
// より転載。
function Chain() {
  // コンストラクタ
  this.jobs = [];
  this.container = {};

  // チェーンに GM_xmlhttpRequest の引数を返す関数を追加する。
  this.addRequestFunction = function( f ) {
    this.jobs.push({ type: 'request', func: f })
  };

  // チェーンに普通の関数を追加する。
  this.addFunction = function( f ) {
    this.jobs.push({ type: 'function', func: f })
  };

  // 先頭のジョブを返す
  this.shift = function() {
    return this.jobs.shift();
  };

  // チェーンを順番に実行して行く。
  this.doChain = function () {
    // 先頭のジョブを取り出す。何もなかったらおしまい。
    var job = this.jobs.shift();
    if(!job) return;

    if(job.type == 'function') {
      // ただの関数ならそのまま実行する。
      job.func.apply(this);
      // 終わったら次のジョブを実行する。
      this.doChain();
    } else if(job.type == 'request') {
      // リクエストだったら GM_xmlhttpRequest のパラメーターをちょっと改ざんして実行する。
      var obj  = job.func.apply(this);
      obj.chain = this;
      if(obj.onload) {
        // onloadを改ざん。関数を実行した後に次のジョブを実行してもらう。
        obj.$onload = obj.onload;
        obj.onload = function(response) {
          obj.$onload.apply(this.chain, [response]);
          this.chain.doChain();
        };
      }
      GM_xmlhttpRequest(obj);
    }
  };
}
