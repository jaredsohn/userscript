// ==UserScript==
// @name           Bank IP Log Crack Remover
// @include        *slavehack*index2.php?page=internet&var3=&aktie=FP&var2=*&transfer=*&tonumber=*&toip=*
// @version                1.0
// ==/UserScript==
var bankip = window.location.href.split('=')[window.location.href.split('=').length - 1]
window.location.href = 'http://www.slavehack.com/index2.php?page=internet&var2='+bankip.replace('#','')+'&var3=crack&var4=';