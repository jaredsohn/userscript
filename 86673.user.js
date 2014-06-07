// ==UserScript==
// @name             McMaster Avenue loginbox
// @description    Display the login box inside Avenue's homepage
// @include          http://avenue.mcmaster.ca/*
// @include	    https://cap.mcmaster.ca/mcauth/login.jsp?app_id=702&app_name=McMaster%20e-Learning
// @version         1.2.2
// @author          Afzal
// @date             2013-09-13
// ==/UserScript==

var login, loginbox;

if (document.getElementById('nav_links')) {
	login = document.createElement("div");
	login.innerHTML='<iframe width="100%" height="100%" frameborder="0" scrolling="no" src="https://cap.mcmaster.ca/mcauth/login.jsp?app_id=702&app_name=McMaster%20e-Learning"></iframe>';
	document.getElementById('container').insertBefore(login, document.getElementById("body_wrap"));
}

loginbox = document.getElementsByTagName("form")[2];
loginbox.setAttribute('onsubmit','');
loginbox.setAttribute('target','_parent');
