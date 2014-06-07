// ==UserScript==
// @name          ZhihuTeX
// @namespace     zhihutex
// @description   Show LaTeX on Zhihu
// @include       http://*.zhihu.com/*
// @version       0.3
// @author Hong Tao
// originally by Shawphy http://userscripts.org/scripts/show/110433
// ==/UserScript==

// 加载MathJax
var s = document.createElement("script");
s.type = "text/javascript";
//s.src  = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default";
s.src = "http://c328740.r40.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=default";
s.text = 'MathJax.Hub.Startup.onload();';
//var config='MathJax.Hub.Config({' + 'extensions: ["tex2jax.js"],' + 'tex2jax: { inlineMath: [["$","$"]], displayMath: [["$$","$$"]], processEscapes: true },' +'Tex:equationNumbers: { autoNumber: "AMS" },'+'jax: ["input/TeX","output/HTML-CSS"]' + '});' + 'MathJax.Hub.Startup.onload();';
var config='MathJax.Hub.Config({' +'config: ["MMLorHTML.js"], ' +'extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js", "TeX/AMSmath.js", "TeX/AMSsymbols.js"],' + 'tex2jax: { inlineMath: [["$","$"],["\\\\(","\\\\)"]], displayMath: [["$$","$$"],["\\\\[","\\\\]"]], processEscapes: true },' + 'jax: ["input/TeX","output/HTML-CSS"],' + 'TeX: { equationNumbers: { autoNumber: "AMS" } },' + '});' + 'MathJax.Hub.Startup.onload();';
if (window.opera)
{
s.innerHTML = config
}
else
{
s.text = config
}

document.getElementsByTagName("head")[0].appendChild(s);


// 点击全部显示后显示公式
document.querySelectorAll("a[name=expand]")[0].addEventListener("click",function (){
	setTimeout(function(){injectScript("MathJax.Hub.Typeset()");});
});


// 展开评论后显示公式，由于评论通常是Ajax加载的，所以这里延时1秒再显示公式
document.addEventListener("click",function (e){
	if(e.target.tagName!="A")return;
	if("|addcomment|save|addnew|".indexOf("|"+e.target.name+"|") == -1)return;
	setTimeout(function(){
		injectScript("MathJax.Hub.Typeset()");
	},1000);
});

// 用于注入代码，用户脚本中的unsafeWindow也不好用啊……才出此下策
function injectScript(js){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.id="zhihulatexInjectScript"+(+new Date);
	script.text = js;
	document.getElementsByTagName("head")[0].appendChild(script);
	var c=document.getElementById(script.id);
	c.parentNode.removeChild(c);
}
