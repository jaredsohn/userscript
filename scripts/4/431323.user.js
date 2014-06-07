// ==UserScript==
// @name       AutoDynDDNS
// @namespace  http://find1x.com/
// @version    0.1
// @description  打开网页自动更新DynDDNS
// @match      https://www.dlinkddns.com/host/*
// @copyright  2014+, FindiX Studio
// ==/UserScript==

if(document.getElementsByClassName("data")[2].innerHTML.slice(6)!=document.getElementsByClassName("data")[0].innerHTML.slice(6)){
    document.getElementById("ip").value=document.getElementsByClassName("data")[2].innerHTML.slice(6);  
    document.forms[0].submit();    
}