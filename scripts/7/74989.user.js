// ==UserScript==
// @author slimx
// @name            discuz修正2
// @description 修正某些论坛发帖时不能选择分类的问题
// @namespace      com.slimx
// @include        http://bbs.deepin.org/post.php?action=newthread*
// ==/UserScript==
(function(){
var type = document.getElementById("typeid");
if(type.style.display!="none")return;
type.style.display='';
var a = document.createElement("a");
a.id="typeid_ctrl";
a.href="javascript:;"
a.hidefocus=true;
a.tabindex="1";
a.innerHTML="分类";
type.parentNode.appendChild(a);
unsafeWindow.simulateSelect("typeid");
})();