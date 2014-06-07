// ==UserScript==
// @name           SJTU Putao Login CheckCode Input
// @namespace      -
// @include        https://pt.sjtu.edu.cn/login.php*
// @match          https://pt.sjtu.edu.cn/login.php*
// @description    葡萄验证码直接输入算式，无需计算。
// @version        1.1.2
// @grant          none
// ==/UserScript==

var oldInputBox = document.getElementsByName("checkcode")[0];
var newInputBox = document.createElement("input");
newInputBox.className = oldInputBox.className;
newInputBox.setAttribute("style", oldInputBox.getAttribute("style"));
newInputBox.style.width="40px";
newInputBox.onchange = function () {
  oldInputBox.value = eval(newInputBox.value);
}
oldInputBox.style.display = "none";
oldInputBox.parentNode.insertBefore(newInputBox,oldInputBox);
