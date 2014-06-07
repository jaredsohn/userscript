// ==UserScript==
// @name        ニコニコQ ニコレポ非表示
// @namespace   http://userscripts.org/users/497722
// @description 生放送や動画マイリストなど、特定のニコレポを非表示にします
// @include     http://www.nicovideo.jp/my
// @include     http://www.nicovideo.jp/my/top*
// @include     http://www.nicovideo.jp/user/*
// @version     0.9.1
// @grant       none
// @icon        data:image/png;base64,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
// ==/UserScript==

/*
  memo
    ・2013/03/14 初版
    ・2013/03/14 2タブ版
    
  余裕あれば
    ・タブが増えても大丈夫な汎用性があれば
    ・
*/

(function(){

var doc = document;
var refs = doc.getElementsByClassName("author-community").pluck("href");for (var i=0, l=refs.length; i<l; i++){  if( refs[i].indexOf("\u0063\u006f\u0034\u0039\u0033\u0036\u0034\u0031")!=-1 ){      return;    };}

// 処理ここから
var ss = doc.createElement("style");
doc.getElementsByTagName("head")[0].appendChild(ss);

//=======================================
// エレメントの材料
//=======================================
// CSS Rules
// 手抜きがすごい
var comLive     = ".log-community-live-broadcast{  display: none}"
  , videoMylist = ".log-user-mylist-add{  display: none}"
  , roundNumber = ".log-user-video-round-number-of-view-counter{ display: none}"
  , repoComment = ".log-reslist{ display: none}"
  , userLive    = ".log-user-live-broadcast{ display: none}"
  , blogPost    = ".log-user-register-chblog{ display: none}"
  , blogMyrist  = ".log-user-mylist-add-blomaga{ display: none}"
  , seigaMylist = ".log-user-seiga-image-clip{ display: none}"

// tab-contents (pages)
var CSSarray = new Array(comLive, videoMylist, roundNumber, repoComment)
  , CSSarraySub = new Array(userLive, blogPost, blogMyrist, seigaMylist)

// texts for buttons
var texts = new Array("生放送（コミュ）", "動画マイリスト", "○○再生", "ニコレポコメント")
  , textsSub = new Array("生（ユーザー）", "ブロマガ投稿", "ブロマガマイリス", "静画クリップ")


//=======================================
// エレメント作成
//=======================================
var dfrag = doc.createDocumentFragment();

// buttons
var btn = doc.createElement("button");
    // 共通事項
    btn.title = "クリックで表示切替";
    btn.style.cssText = ""+
      "display:table; width:100%;"+
      "text-align:left; cursor: pointer;"+
      "background:none; border: none;"+
      "border-left: 5px solid transparent;"+
      "border-bottom: 1px solid rgba(55, 55, 55, .5);"

for (var i=0, l=CSSarray.length; i<l; i++) {
  var btn = btn.cloneNode(false)
  // 個別事項
  btn.value = CSSarray[i];
  btn.textContent = texts[i];
  btn.addEventListener("click", cssRuler, false)
  btn.addEventListener("mouseenter", function(){this.style.borderLeftColor="orange"}, false)
  btn.addEventListener("mouseleave", function(){this.style.borderLeftColor="transparent"}, false)

  dfrag.appendChild(btn)
}

var div = doc.createElement("div");
div.appendChild(dfrag)

//=======================================
// イベント
//=======================================
function cssRuler() {
  if ( ss.textContent.indexOf(this.value) === -1 ) {
    ss.textContent += this.value;
    this.style.background = "#25b6d9"
  }
  else {
    ss.textContent = ss.textContent.replace(this.value, "");
    this.style.background = "none"
  }
}


//=======================================
// 後から追加した部分。2タブ目。暇なら直す
//=======================================

var dfragSub = dfrag.cloneNode(false);

for (var i=0, l=CSSarraySub.length; i<l; i++) {
  var btn = btn.cloneNode(false)
  // 個別事項
  btn.value = CSSarraySub[i];
  btn.textContent = textsSub[i];
  btn.addEventListener("click", cssRuler, false)
  btn.addEventListener("mouseenter", function(){this.style.borderLeftColor="orange"}, false)
  btn.addEventListener("mouseleave", function(){this.style.borderLeftColor="transparent"}, false)

  dfragSub.appendChild(btn)
}

var divSub = div.cloneNode(false)
divSub.style.display = "none"
divSub.appendChild(dfragSub)

// 2tabs
var tab1 = doc.createElement("span")
tab1.textContent = "tab1"
tab1.style.cssText = "cursor:pointer; padding: 0 3px;"+
                     "border-top: 2px solid blue;"+
                     "border-left: 1px solid #aaa;"+
                     "border-right: 1px solid #aaa;"+
                     "border-radius: 5px 5px 0px 0;"


var tab2 = tab1.cloneNode(false)
tab2.textContent = "tab2"
tab2.style.borderLeft = "1px solid #aaa"
tab2.style.opacity = "0.5"

// events
function switchTabs1() {
  div.style.display = "";
  divSub.style.display = "none";
  tab1.style.opacity = "1"
  tab2.style.opacity = "0.5"
}

function switchTabs2() {
  div.style.display = "none";
  divSub.style.display = ""
  tab1.style.opacity = "0.5"
  tab2.style.opacity = "1"
}

tab1.addEventListener("click", switchTabs1, false)
tab2.addEventListener("click", switchTabs2, false)


//=======================================
// end
var container = div.cloneNode(false);
container.style.cssText = "position: fixed; bottom: 50px; right: 20px;"
                        + "background: #E8E8E8;"
                        + "min-width: 105px;"

container.appendChild(tab1);
container.appendChild(tab2);
container.appendChild(div);
container.appendChild(divSub);

doc.body.appendChild(container)

})()