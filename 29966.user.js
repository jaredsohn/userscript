// ==UserScript==
// @name           Multiple attachment support for Phpwind5.3/PHPWind5.3论坛多附件上传支持
// @namespace      http://userscripts.org/users/59173/scripts
// @description    For Phpwind v5.3 Only
// @include        http://www.jxcad.com.cn/post.php*
// ==/UserScript==
var oldscript = document.evaluate("//script[contains(text(),'showmuti')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(oldscript){
	var newscript = document.createElement('script');
	newscript.type="text/javascript";
	newscript.text = "var attach2=document.getElementById('attach2');"+oldscript.text
	oldscript.parentNode.replaceChild(newscript,oldscript);
}
