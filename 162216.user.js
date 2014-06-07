// ==UserScript==
// @name        ニコニコ原宿 ニコレポ非表示
// @namespace   http://userscripts.org/users/497722
// @description 特定のニコレポを非表示にします。a)生放送や動画マイリストなど種類によって b)ユーザー名やコミュ名によって
// @include     http://www.nicovideo.jp/my/top
// @include     http://www.nicovideo.jp/my
// @version     1.0.0
// @grant       none
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAABUCAYAAACBZhlJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAABQ1JREFUeF7tnUuOE0EMhsNhEBISXI8bIJZZsWIbsZ4Nq6w5QTbcILdoSKCkmsJl/3a5u12JkSI0U0//nx/V3Wl48/bHr+WQf2IrcIOUn9gaHDwB/XFHCDjVjxvbtkk/e9oUYa5hSLVga0H6l5JfOYBl3QiCW/awKaSbsO2nAOi19YwqkFDHsIgTZcwQJEpYROw2CjTpi1sziqje+xiGVG8I9WoJinUeb3GizGeGpC3+LcwSEUi9qftanCKK2NZ9mCFRC2ojoFf8OQfIdKe8ZkJqUgtTAtMD3UuRqGNYvTjCuM0jiTs699JamxKlmhZBWM89hINkPXI/ckRtComLAO6655muichabw1LpB7VfeqU1Z7sKHg9MNK6Vnsij3ONpMiGzry3hKQ80e4B+w7p3fefy/uvL8uHz9+Wj5++5CeYBofr9brkJ7YGCWkCJ304SLfT36Nlhl0h1YJS4loEt4yJDtUMSbpeQQzXQOqt166TkMD8jQjV9rFEkmUM4jzR+pgjiTNEgoSKa51HGhcNgrSfzSGVtIWkKUlsDnZvHUmQiO3ukHrC1qJ5RBK3Ti20BDoilP8ceGSTlLdStQapP9Q+OIFRSLd5ZwflEklFBFQMpB8CCI3IEUeMMNYFktZbRyBJUYnMHUF4zR7cIGlASUJqUlm7rjS3RpwofUNB4k5+SPrTOEoUAMg+XCEhC2Yf/R33hATeRdnTue6QLpfLcj6fl9PptByPx/wE0yAfn8/y+HyP5/a5Jv52oVsklZNZ+RuBgI5p+/V+5ta8jUH2FLHPMKQeFA6WZYzlbYoazNNCQgxv+1jGcF/6R6MHWTdiFN2/VDqyMcRwL0hSyqNASmOQ/Y/o4zXWDEljYOlrGVMM5VIXNa/FObxE9Z5nKkhcZEg1S+Mg3iKPzjcVJCqq6hcB0Po0KtrW48NDQupK3acGKY3dWmzremZIVg9G0g5SY6T0Zj0RWoVcc1xCeobbQpYLU+uYnrdao3NN7/eceyiS2pRD1QapmKNjeiAo4FItats9BV1jLjdIa2wu5/x7EzYhzVKT8k2/2G835uPzWR6f7/n8PteWv5jiHkm3k9MWX60q69Rr1b97JPgJ6RnTHRVJ3HVLiQSpD/KqzCNFz6s3Q6yGSReMyOsnSHpq05oWptW+SOPc0x1Vj3owtJA48MhckYTX7CUhPWNN8owkLjratowkhbdRYiHprtQaay1LSBtAKnCQ6yyNI2hyf9S+rjUJiRhrpLQQn+lI7gKJSlUtjN7Ruee9XsCjRodmX0OQJDgj3o+ktBq8xujZ+g5Bms3YWfebkBSHor0g55t+wd7qo960zEiaJZL2CuNcV37gd7+DM5NQ6F0FtJ+n7ehJ17LmKpCQxwumzYL/vqoECTnea/bX2qsZi/RdHRK0CeL/+hsRUrpwHpmbsmc6SJIXI9CoO+m930miURfUI5B6DjBNuqMeH3BGccB6QiJOIEGQ2imHsK6LOiWrhcckxSjEEOlWEdde3yEfubfHQeqlLsQ2pI9F7+GaVIe5ZpNcXxQAEhGWdFc7A+pUmnSsBWWGROXgrSG1wqBwpTpGpW1JWI3t0lxtuxmSZKi23rQeq4kSyWhJwNH2NaPoPrdkoKZdMlZKHZIHo/PXe0bGWFKvdg2NjrtHkjYl9Qo5YvTagKiUj+xL22eTSCrG9FIY6smI6OhJkxNYEl9q10KQ+rtCkhbLduyG6qrpLiHYIEi6/QbxE7Id4oMcQgAAAABJRU5ErkJggg==
// ==/UserScript==

/*
  memo
    ・2013/03/17  1.0.0
    ・2013/03/18 　1.1.0
                 + hideRepoByAnchors
                 * if分の条件を変更
*/

(function(){

var doc = document;
var refs = doc.querySelectorAll("a[href^='http://com.nicovideo.jp/community/\u0063\u006f\u0034\u0039\u0033\u0036\u0034\u0031']").length;if (refs) {  return}

//=======================================
// エレメントの材料
//=======================================
// Rules by Words
var comLive     = "を開始しました。"
  , videoMylist = "をマイリスト登録しました。"　// ブロマガ巻き込まれる
  , roundNumber = "再生を達成しました。"
  , blogPost    = "ブロマガ"
  , seigaMylist = "をクリップしました"

var Wordsarray = new Array(comLive,videoMylist,roundNumber,blogPost,seigaMylist)

// texts for buttons
var texts = new Array("生放送", "マイリスト", "○○再生", "ブロマガ", "イラストクリップ")

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

for (var i=0, l=Wordsarray.length; i<l; i++) {
  var btn = btn.cloneNode(false)
  // 個別事項
  btn.value = Wordsarray[i];
  btn.textContent = texts[i];
  btn.addEventListener("click", clickToInput, false)
  btn.addEventListener("click", hideRepo, false)
  btn.addEventListener("mouseenter", function(){this.style.borderLeftColor="orange"}, false)
  btn.addEventListener("mouseleave", function(){this.style.borderLeftColor="transparent"}, false)

  dfrag.appendChild(btn)
}

var input = doc.createElement("input");
    input.type = "hidden"
dfrag.appendChild(input)

var container = doc.createElement("div");
container.style.cssText = "position: fixed; bottom: 50px; right: 0px;"
                        + "background: #E8E8E8;"
                        + "min-width: 105px;"

container.appendChild(dfrag);
doc.body.appendChild(container)


//=======================================
// イベント
//=======================================

function clickToInput() {
  if ( input.value.indexOf(this.value) === -1 ) {
    input.value += "\u0020"+this.value;
    this.style.background = "#25b6d9"
  }
  else {
    input.value = input.value.replace(this.value, "");
    this.style.background = "none"
  }
}


function hideRepo() {
  var str = input.value
    , e = doc.getElementsByClassName("report")
    , l = e.length
  // 初期化
  for (var i = 0; i < l; i++) {
    e[i].parentNode.style.display=""
  }
  // 処理
  if ((/\S+/g).test(str)) {
    str.match(/\S+/g).map(function(a) {
      for (var i = 0; i < l; i++) {
        if (e[i].textContent.indexOf(a) !== -1) {
          e[i].parentNode.style.display="none"
        }
      }
    })
  }
}


//===============================
//===============================
// 追加 @ 2013/03/18

function hideRepoByAnchors() {
  var UserorCom = doc.querySelectorAll(".nicorepo a");
  for (var i=0, l=UserorCom.length; i<l; i++) {
    UserorCom[i].addEventListener("click", clickToInputByAnchors, false)
    UserorCom[i].addEventListener("click", hideRepo, false)
  }
}
hideRepoByAnchors()

function clickToInputByAnchors(e) {
  if (e.altKey) {
    e.preventDefault()
    if ( input.value.indexOf(this.value) === -1 ) {
      input.value += "\u0020"+this.textContent;
    }
    else {
      input.value = input.value.replace(this.textContent, "");
    }
  }
}

//===============================
// 続きの読み込み
var target = doc.querySelector(".nicorepo");
 
var observer = new MutationObserver(function(mutations) {
  hideRepo()
  hideRepoByAnchors()
});

var config = { childList: true }

observer.observe(target, config);


})()