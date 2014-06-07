// ==UserScript==
// @name           MTC AutoLogin
// @namespace      http://192.168.170.66:8080/
// @include        http://192.168.170.66:8080/*
// ==/UserScript==

document.title = "Moldtelecom MaxDSL"
username = "";
password = "";

var inputs = document.getElementsByTagName('input');
if(inputs.length == 3){
	for(var i=0; i<inputs.length; i++){
		var item = inputs[i];
		if(item.name == "username" && item.type == "text") var username_txt = item;
		if(item.name == "password" && item.type == "password") var password_txt = item;
		if(item.value == "OK" && item.type == "submit") var submit_btn = item;
	}
	
	if(username_txt && password_txt && submit_btn){
		
		
		if(username_txt.value != username && username != undefined && username != "") username_txt.value = username;
		if(password_txt.value != password && password != undefined && password != "") password_txt.value = password;
		if(document.URL.split("?")[1] != undefined){
			var urls = document.URL.split("?")[1].split("&");
			for(var j=0; j<urls.length; j++){
				if(urls[j].split("=")[0] == "CPURL"){
					GM_setValue("CPURL", unescape(urls[j].split("=")[1]));
				}
			}
		}	
		if(username_txt.value != "" && password_txt.value != "") submit_btn.click();
	} 
} else if(GM_getValue("CPURL") != undefined && GM_getValue("CPURL") != ""){
	var t = GM_getValue("CPURL");
	GM_setValue("CPURL", "");
	window.location.href = t;
}

