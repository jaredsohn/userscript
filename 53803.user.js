// ==UserScript==va
// @name           WhatTheMovie - AutoLogin
// @namespace      http://userscripts.org/users/99643
// @include        http://whatthemovie.com/*
// @description    tries to auto-login on whatthemovie.com (only works if password is saved in Firefox)
// ==/UserScript==

var id = document.getElementById("name");

var forms = document.getElementsByTagName("form");
var form = forms[0]
var loginLinks = document.evaluate("id('slidedown_menu')/ul[1]/li[2]/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if(loginLinks.snapshotLength > 0){
	if(loginLinks.snapshotItem(0).innerHTML=="login"){
		var ca = document.cookie.split(';');
		var cookieActive = false;
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf("whatthemovieAutoLogin") == 0){
				cookieActive = true;
			}
		}
		if(!cookieActive){
			if(form){
				if(form.getAttribute("action")=="/user/login"){
					if(id){
						if(id.value!=''){
							document.cookie = "whatthemovieAutoLogin=true; path=/";
							form.submit();
						}
					}
				}
			}
		}
	}
}