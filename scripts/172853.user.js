// ==UserScript==
// @name           Youku Wap
// @author         randull
// @version        1.0.0
// @namespace      http://userscripts.org/scripts/show/172853
// @description    add Youku Wap address
// @include        http://v.youku.com/v_show/id_*.html
// @updateURL      http://userscripts.org/scripts/source/172853.meta.js
// @downloadURL    http://userscripts.org/scripts/source/172853.user.js
// @run-at         document-end
// ==/UserScript==
(function() {

var loc=document.getElementById("fn_dimcode");
var addr=document.location.href.replace(/.*\/id_/,"")
addr=addr.replace(/\.html/,"")
addr="http://m.youku.com/wap/detail?vid="+addr
//alert(addr)
loc.outerHTML+="<div class='fn'><a href='"+addr+"'>Wap address</a></div>";
})();