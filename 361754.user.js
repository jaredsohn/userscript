// ==UserScript==
// @name       QuickPost4Putclub
// @namespace  FireAwayH
// @version    1.0
// @description  普特英语论坛快速回复
// @match      http://forum.putclub.com/*
// @updateURL      https://userscripts.org/scripts/source/361754.meta.js
// @downloadURL    https://userscripts.org/scripts/source/361754.user.js
// @run-at	   document-end
// ==/UserScript==
var visitedforums_menu = document.getElementById("visitedforums_menu");
visitedforums_menu.style.position="fixed";
visitedforums_menu.style.top="472px";
visitedforums_menu.style.right="222px";

var visitedforums = document.getElementById("visitedforums");
visitedforums.style.position="fixed";
visitedforums.style.top="618px";
visitedforums.style.right="310px";
visitedforums.style.zIndex="999";
visitedforums.onmouseover=function(){
	visitedforums_menu.style.display = "block";
}

var pages = document.getElementsByClassName("pages")[0];
pages.style.position="fixed";
pages.style.top="618px";
pages.style.right="0px";
pages.style.zIndex="999";

var f_post = document.getElementById("f_post");
f_post.style.position="fixed";
f_post.style.top="385px";
f_post.style.left="550px";
f_post.onmouseover=function(){
	visitedforums_menu.style.display = "none";
}

var secanswer3 = document.getElementById("secanswer3");
opensecwin3(secanswer3.id, 0)
secanswer3.onclick = function(){}
secanswer3.onfocus = function(){}
secanswer3.onblur = function(){}

var hintDiv = document.createElement("div");
hintDiv.innerHTML =  "双击自动输入验证字符串";
hintDiv.style.position="absolute";
hintDiv.style.left = "260px";
hintDiv.style.top="235px";
hintDiv.style.zIndex="999";

var fastcheck = document.getElementsByClassName("fastcheck")[0];
fastcheck.appendChild(hintDiv);

var secanswer3_menu = document.getElementById("secanswer3_menu");
secanswer3_menu.style.display = "block";
secanswer3_menu.style.position="fixed";
secanswer3_menu.style.width = "135px";
secanswer3_menu.style.left = "810px";
secanswer3_menu.style.top="560px";
secanswer3_menu.ondblclick=function(){
    var str = this.innerHTML.match(/[^<:（]\w{1,}(\s*|.*)\w{1,}/mg);
    secanswer3.value = str;
}
