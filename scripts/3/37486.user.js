// ==UserScript==
// @name           ComplementoBorrado
// @namespace      -
// @include        http://board.ogame.com.es/modcp.php?action=thread_move&x=888&y=8888&threadid=*
// ==/UserScript==

document.getElementsByTagName("select")[0].selectedIndex=document.getElementsByTagName("select")[0].length-1;
document.getElementById("radio1").checked="checked";
document.forms[0].submit();
setTimeout("window.close()",1300);