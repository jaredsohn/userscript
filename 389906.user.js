// ==UserScript==
// @name           AutoLogIn_KU.Leuven.user
// @namespace      Hexalog
// @description    Hexalog AutoLogin KULeuven
// @include        https://idp.kuleuven.be/*
// @include        http://idp.kuleuven.be/*
// @include		http://cygnus.cc.kuleuven.be/*
// @include		https://cygnus.cc.kuleuven.be/*
// @copyright     Hexalog
// ==/UserScript==



	var txtUsername = document.getElementById('username');
	var txtPassword = document.getElementById('password');
	var strUsername = "Insert_Here_UserName";
	var strPassword = "Insert_Here_Password";
	//var strUsername="";
	//var strPassword="";
	var btnLogin= document.getElementById('btnSubmit');
	
	
	
	if(document.getElementById('ibbNG.receiptTag.content'))
	{
		 window.location.href = "https://cygnus.cc.kuleuven.be/webapps/portal/frameset.jsp";
		alert("Select Login");
	}
	else if  (document.getElementById('module:_3345_1'))
	{
		
	var el;
	el=document.getElementsByName("origin")[0];
	el.value="urn:mace:kuleuven.be:kulassoc:kuleuven.be";
 el.onchange();

	}
	else if (document.getElementById('loginForm'))
	{
	
	//alert("u p Login");
	//setUserPass();
	txtUsername.value=strUsername;
	txtPassword.value=strPassword;
	
	
	
	setTimeout(function() {
	if(txtUsername.value != "")
	{
	btnLogin.click();	
	} 
	else
	{
   alert("Wrong User for Auto-Login")
   }
}, 2500);
	}
	
	
	
	function setUserPass() {
     while ((strUsername == "") || (strPassword == "")) {
        alert("Please enter nonempty user and password");
        strUsername = prompt("User ID");
        strPassword = prompt("Password");
    }
    
};
	

	
