// ==UserScript==
// @name           LON-CAPA Login
// @namespace      http://www.andrewferguson.net
// @description    A template for creating new user scripts from
// @include        http://lon-capa.mines.edu/adm/roles
// ==/UserScript==

// This script is designed to work with the Colorado School of Mines LON-CAPA site, however you should be able to add your schools LON-CAPA site
// to the list of included sites and the script should work just the same.

// Setup:
// Change 'YOUR USERNAME' to the username you use to login.
// Change 'YOUR PASSWORD' to the password you use to login.


var userName = "YOUR USERNAME";
var userPass = "YOUR PASSWORD";
var unamePosition;
var ucodePosition;

getInputTags = document.getElementsByTagName('input');

for(var i = 0; i < getInputTags.length; i++){
	if((getInputTags.item(i).name == "uname") && (getInputTags.item(i).type == "text")){
		//alert(getInputTags.item(i+1).name);
		unamePosition = i;
		ucodePosition = i+1;
		
		getInputTags.item(unamePosition).value = userName;
		getInputTags.item(ucodePosition).value = userPass;
		document.forms[1].submit.click();
	}
}