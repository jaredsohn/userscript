// ==UserScript==
// @name           FC2_de_japaneseproofreader
// @namespace      http://d.hatena.ne.jp/Koonies/
// @description    FC2 BLOGの記事編集のページに[校正する]ボタンを追加する
// @include        http://blog*.fc2.com/control.php?mode=editor&process=*
// @version        1.0
// ==/UserScript==

//[校正する]ボタンを押すと新しい画面で日本語文章校正ツール(http://www.japaneseproofreader.com/)を開く
//ブログ校正用ブックマークレット(http://www.japaneseproofreader.com/sendblog.html)がベース
//追記の編集には未対応

(function(){
  var cnt=0;
  
  document.addEventListener(
  'load',
  function() {
    var kakunin=document.getElementsByTagName("input")[7]; /* [プレビュー] */
    cnt++;
    if (kakunin && (cnt == 1)) {
      
      var kousei = document.createElement("input");
      kousei.type = "button";
      kousei.value = '\u6821\u6b63\u3059\u308b'; /* 校正する */
      
      kousei.addEventListener('click',function() {
        var sendText = "TcheckON" + document.getElementsByName("entry[title]")[0].value;
        sendText += '\n\n' + document.getElementsByName("entry[body]")[0].value;
        if (sendText.length>4000){
          //alert('変換してみた結果、データ長が許容量を超えてしまいました。環境によりツールに送れない／一部カットされる場合があります。');
          alert('\u5909\u63db\u3057\u3066\u307f\u305f\u7d50\u679c\u3001\u30c7\u30fc\u30bf\u9577\u304c\u8a31\u5bb9\u91cf\u3092\u8d85\u3048\u3066\u3057\u307e\u3044\u307e\u3057\u305f\u3002\u74b0\u5883\u306b\u3088\u308a\u30c4\u30fc\u30eb\u306b\u9001\u308c\u306a\u3044\uff0f\u4e00\u90e8\u30ab\u30c3\u30c8\u3055\u308c\u308b\u5834\u5408\u304c\u3042\u308a\u307e\u3059\u3002');
        }
        //console.log(sendText);
        window.open('http://www.japaneseproofreader.com/',sendText,'resizable=yes, status=no, height=600, menubar=no, toolbar=no, location=no, scrollbars=yes');
      }, true);
      
      //kakunin.parentNode.insertBefore(kousei, kakunin);
      kakunin.parentNode.insertBefore(kousei, kakunin.nextSibling);
    }
  },
  true);
  
})();
