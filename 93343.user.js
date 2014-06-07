// ==UserScript==
// @name           Wikia Quick undo
// @namespaces     Ikin
// @include        *wikia.com/index.php?title=*&diff=*&oldid=*
// @include        *wikia.com/index.php?diff=*&oldid=*
// @include        *wikia.com/index.php?title=*&action=edit&undoafter=*&undo=*
// @include        *wikia.com/*&Quick
// @version        0.31
// ==/UserScript==
var ref = document.location.href;
if (ref.substr(-6)=="&Quick") {
  document.all("wpSave").click();
}else{
  var str = document.getElementById('mw-diff-ntitle1').innerHTML;
   var a = str.indexOf("title=")+6;
    var b = str.substr(a);
   var c = str.substr(a, b.indexOf("&"));
  document.getElementById('mw-diff-ntitle1').innerHTML+=" <strong>(<a   href='"+ref.replace('oldid',  'undo').replace('diff','title='+c+'&action=edit&undoafter')+"&Quick'>Quick undo</a>)   </strong>";
}