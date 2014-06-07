// ==UserScript==
// @name           Joomla Autologin
// @namespace      http://elespaciodejaime.wordpress.com
// @description    automatically fills login forms, it can be modified easily to autologin in other pages
// @include        */administrator/*
// ==/UserScript==


function main() {
	var username = "admin";
	var password = "admin";

	var isLoginForm = document.getElementById("form-login");

	if (isLoginForm) {

    var usernameBox = document.getElementById("modlgn_username");
    
    if (usernameBox)
      usernameBox.value = username;
    
    var passwordBox = document.getElementById("modlgn_passwd");
    if (passwordBox) {
      passwordBox.value = password;
    } 
	
    document.body.getElementsByTagName("form")[0].submit();
	
	}
	
}
main();
