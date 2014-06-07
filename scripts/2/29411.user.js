// ==UserScript==
// @name           hbt_firma
// @namespace      Adjunata firma en los foros
// @description    adjunta la firma siempre en los foros de hbt
// @include        http://hunterbt.com/phpbb2.php?page=posting&mode=*
// ==/UserScript==
var chkboxes=document.getElementsByTagName('input')
for (var i=4; i < chkboxes.length; i++) {
  if (chkboxes[i].type=="checkbox") {
    chkboxes[i].checked=true
  }
}