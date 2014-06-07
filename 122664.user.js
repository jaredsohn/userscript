// ==UserScript==
// @name 电子科技大学教务系统改进——自动重定向和刷新
// @description 
// @match http://ea.uestc.edu.cn/*
// @match http://222.197.164.74/*
// @match http://222.197.164.82/*
// @match http://222.197.164.244/*
// @match http://222.197.165.209/*
// @match http://222.197.165.148/*
// @match http://125.71.228.243/*
// @rut-at document-end
// ==/UserScript==

(function(){
var body = document.body;
body.childElementCount == 0 && ( 
	(   (body.innerText == "三秒防刷" || body.textContent == "三秒防刷") && 
	(window.setTimeout("location.reload()", 3 * 1000), true)   ) || 
	(   (body.innerText == "五秒防刷" || body.textContent == "五秒防刷") && 
	 window.setTimeout("location.reload()", 5 * 1000)   )
	);
	
function showMsg_TooManyRedirects()
{
	var p = document.createElement("h1");
	p.style.color = "#ff0000";
	p.appendChild(document.createTextNode("刷新次数太多，您是否未登录或登录信息已失效？"));
	document.body.appendChild(p);
}

var h2, a, rc;
( (h2 = body.children[0]).tagName.toUpperCase() == "H2" && 
	(a = h2.children[0]).tagName.toUpperCase() == "A" && 
	(((rc = parseInt(localStorage["ea_redirect_count"])) > 10) ? 
		showMsg_TooManyRedirects() : 
		((localStorage["ea_redirect_count"] = rc ? rc + 1 : 1), location.replace(a.href)) 
		), true) || localStorage.removeItem("ea_redirect_count");
})();
