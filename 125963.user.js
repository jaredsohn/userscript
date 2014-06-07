// ==UserScript==
// @name           NicoNicoPedia Delete Auto Links
// @namespace      http://tax4.blog115.fc2.com/
// @description    ニコニコ大百科で3文字以下の辞書項目のリンクを削除する。リンクがあった文字列をダブルクリックすると、リンクを復活させる。
// @include        http://dic.nicovideo.jp/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var ALLOW_MIN_LENGTH = 4; // この数値以上の辞書項目はリンクをはったままに。これより小さい長さの辞書項目のリンクを削除

var MYTAG = "A_NICOPEDIA_DEL_TAG";
var MYTAG_START = "<"+MYTAG+">";
var MYTAG_END   = "</"+MYTAG+">";

var $article = $("#article");
$article.find("a.auto , a.auto-hdn").each(function(){
  var $this = $(this);
  if($this.text().length < ALLOW_MIN_LENGTH){
    var $newElem = $(MYTAG_START+$this.text()+MYTAG_END);
    
    $newElem.attr("href", $this.attr("href"));
    $this.replaceWith( $newElem );
    $newElem.one("dblclick", function(){
      var $this = $(this);
      var $recoverElem = $("<a class='auto'></a>");
      $recoverElem.attr("href", $this.attr("href")).text($this.text());
      $this.replaceWith($recoverElem);
      
    });
  }
});
