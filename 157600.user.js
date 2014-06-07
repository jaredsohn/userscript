// ==UserScript==
// @name        ニコニコ大百科　右カラム ツイッター・ニュース折り畳み
// @namespace   http://userscripts.org/users/497722
// @description 記事右に表示されるツイッターとニュースの表示・非表示を切り替えられるようにします。
// @include     http://dic.nicovideo.jp/*
// @version     0.2.1
// @grant       none
// ==/UserScript==

if(self === top){

  function insertSwitchDisplayBtn(el, btnText) {
    var btn = document.createElement("button")
    btn.textContent = btnText
    btn.title="クリックで表示切り替え"
    btn.addEventListener("click", function(){
      switchDisplay(el)
    },false)
    el.parentNode.insertBefore(btn, el.previousSibling)
    switchDisplay(el)
  }

  function switchDisplay(el) {
    if (el.style.display !=="none") {
      el.style.display = "none"
    }
    else {
      el.style.display = ""
    }
  }

//===================================
  var ifr
  function getIfr(){
    ifr = document.getElementsByClassName("twitter-timeline")[0]
    if(ifr && ifr.height){
      insertSwitchDisplayBtn(ifr, "ツイッター非/表示")
    }else{
      setTimeout(getIfr, 800)
    }
  }
  getIfr()
//===================================
  var snsNews = document.getElementsByClassName("snnranking")[0]
  insertSwitchDisplayBtn(snsNews, "News非/表示")

}