// ==UserScript==
// @name           bosskita
// @namespace      http://userscripts.org/users/70863
// @description    「ctrl + \」キー押下でページの画像、CSS、JS、Flash等を無効にします。
// @author         powchin http://wassr.jp/user/powchin
// @author         luine http://wassr.jp/user/luine
//
// 2008/10/28 boss帰った追加 by luine
// 2008/10/29 キーバインド変更、background削除廃止、color削除追加 by powchin
// ==/UserScript==

var docBody = null; 
var tmpTitle = null;

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(GM_JQ);

function bosskita($j) {
  if (docBody != null) {
    // boss帰った
    this.document.body.innerHTML = docBody;
    this.document.title = tmpTitle;
    docBody = null;
    $j.each($j.makeArray(this.document.styleSheets), function(){
      this.disabled=false;
    });
  } else {
    // boss来た
    docBody = this.document.body.innerHTML;
    var doc = this.document;
    tmpTitle = doc.title;
    doc.title = "\(無題\)";
    $j(doc).find("img").remove();
    $j(doc).find("object").remove();
    $j(doc).find("script").remove();
    $j(doc).find("*").removeAttr('border');
    $j(doc).find("*").removeAttr('color');
    $j(doc).find("*").removeAttr('bgcolor');
    $j(doc).find("*").removeAttr('style');
    $j.each($j.makeArray(doc.styleSheets), function(){
      this.disabled=true;
    });
  }
}

function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined')
    window.setTimeout(GM_wait, 100);
  else
    bosskita(unsafeWindow.jQuery);
}

document.addEventListener('keydown', function(e){
  if(e.keyCode == 220 && e.ctrlKey) GM_wait();
}, false);
