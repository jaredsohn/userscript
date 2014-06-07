// ==UserScript==
// @name           Binnewz forum auto Login
// @namespace      www.binnews.info
// @description    Binnewz forum auto Login
// @include        http://www.binnews.info/binnewz/*
// @author         Guile93
// ==/UserScript==
var username = "Votre login";
var password = "Votre Password";
var page_cnx="http://www.binnews.info/binnewz/index.php?app=core&module=global&section=login";
if(document.location!=page_cnx){
	if(document.getElementById("user_navigation").getAttribute("class")=="not_logged_in"){
		document.location.replace(page_cnx);
		break;
	}
}else{
	var user = document.getElementsByName("username")[0];
	var pass = document.getElementsByName("password")[0];
	if (user != null&&pass != null){
		user.value = username;
		pass.value = password;
		document.getElementsByClassName("input_submit")[0].click();
		break;
	}
}