// ==UserScript==
// @name          Zhihu LaTeX
// @namespace     zhihulatex
// @description   Show LaTeX on Zhihu
// @include       http://*.zhihu.com/*
// @version       0.7
// ==/UserScript==

// 加载MathJax
var s = document.createElement("script");
s.type = "text/javascript";
s.src  = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default";
s.text = 'MathJax.Hub.Startup.onload();';

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