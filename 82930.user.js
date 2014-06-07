// ==UserScript==
// @name           ツイッター診断メーカーAuto
// @namespace      http://efcl.info/
// @include        http://shindanmaker.com/*
// ==/UserScript==
new function(_doc){
    var defName = "";// デフォルトで入れたい名前
    var form = _doc.getElementById("form");
    var input = _doc.getElementById("u");
    if(!defName || _doc.getElementsByClassName("result").length > 0) return;
    input.value = defName;
    setTimeout(function(){
        form.submit();
    } , 3000)
}(document)