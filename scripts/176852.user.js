// ==UserScript==
// @name       TSDM sign
// @namespace  exzhawk
// @version    0.1
// @description  TSDM sign
// @match      http://www.tsdm.net/*
// @copyright  2012+, You
// ==/UserScript==
document.getElementById("toptb").onclick=function(){	var s = new XMLHttpRequest();s.open("POST","http://www.tsdm.net/plugin.php?id=dsu_paulsign:sign&operation=qiandao&infloat=1&sign_as=1&inajax=1",true);s.setRequestHeader("Content-type","application/x-www-form-urlencoded");s.send("formhash="+document.querySelector("input[name=formhash]").value+"&qdxq=kx&qdmode=1&todaysay=%B9%FE%B9%FE%B9%FE&fastreply=1");}
