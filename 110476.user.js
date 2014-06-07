// ==UserScript==
// @name          rakuten_super_search
// @namespace     http://userscripts.org/users/kawaz
// @description   テスト 楽天検索
// @version       1.5
// @match         http://websearch.rakuten.co.jp/Web*
// @match         http://websearch.rakuten.co.jp/static/chrome/welcome.html
// ==/UserScript==
(function(){
  //ランダム検索文字列作成
  var qt = (function(){
    var chars = "あいうえおかきくけこさしすせそたちつてと"
              + "なにぬねのはひふへほまみむめもやゆよらりるれろわをん";
    var str = "";
    for(var i = 0; i < 4 + parseInt(Math.random()*5); i++) {
      str += chars[parseInt(Math.random()*chars.length)];
    }
    return str;
  })();

  //検索開始
  if(/static.*welcome/.test(location.href)) {
    location.replace("http://websearch.rakuten.co.jp/Web?qt=" + encodeURIComponent(qt) + "&col=OW&svx=101102");
  }

  //自動適当検索ループ
  var count = 10;
  var t = setInterval(function(){
    if(count-- < 0) {
      clearInterval(t);
    }
    //検索実行
    if(document.getElementById("pnvPointGet").textContent.match(/(口ゲット|山分け対象外)/)) {
      document.getElementById('srchformtxt_qt').value = qt;
      document.querySelector(".srchbutton").click();
    }
    if(document.getElementById("pnvPointGet").textContent.match(/(口達成！|[5-9]\/\d\d口)/)) {
      window.close();
    }
  }, 10000);
})();