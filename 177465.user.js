// ==UserScript==
// @name          renren_status
// @include       http://www.renren.com/*
// @description   人人非好友状态查看
// @version       0.0.1
// @match         *://*.renren.com/*
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         unsafeWindow
// @author        x1957
// ==/UserScript==
var regex = /www.renren.com\/(\d+)\/profile/;
var url = document.location.href;
if(url.match(regex) != null){
	var uid = url.match(regex)[1];
 	var myid = document.getElementById("showProfileMenu").href.match(/id=(\d+)/)[1];
 	var openUrl = "http://www.renren.com/"+myid+"#//status/status?id="+uid;
 	var atag = document.createElement("a");
 	var txtNode = document.createTextNode("状态"); 
 	atag.setAttribute("href", openUrl);
 	atag.appendChild(txtNode);
 	var idiv = document.createElement("div");
 	idiv.setAttribute("class", "menu-title");
 	idiv.appendChild(atag);
 	var odiv = document.createElement("div");
 	odiv.setAttribute("class" , "menu");
 	odiv.appendChild(idiv);

 	var node = document.getElementsByClassName("nav-main")[0];
 	node.appendChild(odiv);
 	console.log(openUrl);
}
