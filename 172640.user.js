// ==UserScript==
// @id             chinaz link autosubmit
// @name           chinaz link autosubmit
// @version        0.1
// @namespace      fooleap.org
// @author         fooleap 
// @description    站长之家 友链自动检测
// @include        http://link.chinaz.com/?wd=*
// @run-at         window-load
// ==/UserScript==
if(document.getElementById("plLink")){
}
else {
  document.getElementById("bnsubmit").click();
}
