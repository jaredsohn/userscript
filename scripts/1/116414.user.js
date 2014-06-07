// ==UserScript==
// @name          rakuten_card_detail_print_kuronuri
// @namespace     http://userscripts.org/users/kawaz
// @description   楽天カードの印刷用明細ページで隠したい行を黒塗りにします。
// @version       1.0
// @include       https://e-navi.rakuten-card.co.jp/specific/print
// ==/UserScript==
(function(){
  document.body.addEventListener("dblclick", function(e){
    if(target.parentNode == "TR"){
      Array.prototype.slice.call(target.parentNode.querySelectorAll("td")).forEach(function(t){
        t.style.color = t.style.backgroundColor = "black";
      })
    }
  })
})()
