// ==UserScript==
// @name 电子科技大学教务系统改进——登录
// @match http://ea.uestc.edu.cn/*
// @match http://222.197.164.74/*
// @match http://222.197.164.82/*
// @match http://222.197.164.244/*
// @match http://222.197.165.209/*
// @match http://222.197.165.148/*
// @match http://125.71.228.243/*
// @rut-at document-end
// ==/UserScript==

(location.pathname == "/" || location.pathname.toLowerCase() == "/default_ldap.aspx") && (function(){

document.getElementById("Button1").disabled = true;
document.getElementById("Button1").style.color="#bfbfbf";
document.addEventListener("keypress", (function(){document.tag_KeyPressed = true}), true);
window.setTimeout((function(){
	var submit=document.getElementById("Button1");
	submit.disabled=false;
	submit.style.color="";
	!document.tag_KeyPressed && 
		document.getElementById("tbYHM").value && 
		document.getElementById("tbYHM").value && 
		submit.click();
	}), 6 * 1000);

})();
