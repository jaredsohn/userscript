// ==UserScript==
// @name           adiary wiki content link key fix
// @namespace      http://efcl.info/
// @description    adiaryのwikiコンテンツ化したリンクキーを自動で入力
// @include        http://efcl.info/adiary/*?diary_edit
// ==/UserScript==
new function() {
    var title = document.getElementsByName("title")[0];
    var linkkey = document.getElementsByName("link_key")[0];
    var upnodeSelect = document.getElementById("upnode-select");
    var reg = /[\s.!#$%<>"'()=~|?:@,;\\]/g; // 除外する文字列
    title.addEventListener("keyup", function() {
        linkkey.value = title.value.replace(reg, "");
    }, false);
    upnodeSelect.addEventListener("change", function(evt) {
        var selectValue = evt.target.value || null;
        if (selectValue) {
            linkkey.value = selectValue.replace(reg, "") + "/" + linkkey.value;
        }
    }, false);
}