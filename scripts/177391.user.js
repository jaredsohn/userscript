// ==UserScript==
// @name        Discuz论坛快速回复添加签名选项
// @description 支持任意网站的Discuz论坛
// @namespace		http://userscripts.org/scripts/show/177391
// @updateURL		https://userscripts.org/scripts/source/177391.meta.js
// @downloadURL		https://userscripts.org/scripts/source/177391.user.js
// @include     */thread*.html
// @include     */forum.php*mod=viewthread*
// @include     */viewthread.php*
// @version     2013.9.8
// ==/UserScript==

if (document.getElementById("fastpostsubmit") && !document.getElementById("usesig")) {
    document.getElementById("fastpostsubmit").parentNode.innerHTML+="<input type='checkbox' id='usesig' name='usesig' checked='checked' value='1'><label for='usesig'>签名档</label>"
}