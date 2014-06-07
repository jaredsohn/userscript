// ==UserScript==
// @name          Webmail Auto-Login
// @namespace     http://mail.wheelerschool.org
// @description	  Automatically login to webmail
// @include       http://mail.wheelerschool.org/exchange*
// @include       http://mail.wheelerschool.org/exchweb/bin/auth/owaauth.dll*
// @include       http://mail.wheelerschool.org/owa/auth/logon*
// @include       http://mail.wheelerschool.org/exchweb/bin/auth/owalogon.asp*
// @include       http://mail.wheelerschool.org/CookieAuth.dll?GetLogon?*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

(function() {
var form = document.forms.namedItem("logonForm");
var owaUsername;

//Username may already be set
if(form.elements.namedItem("username")!=null){
	owaUsername = form.elements.namedItem("username");
}
var owaPassword = form.elements.namedItem("password");
var loginFlag = true;

//Register a function that will collect login info, and store in GM using GM_setValue()
   window.setLogin = function(event){
      	loginFlag=false;
  		
  	owaUsername=prompt("Enter your username");
  	GM_setValue("owaUsername", owaUsername);
  	owaUsername=GM_getValue("owaUsername",false);
  
  	 owaPassword=prompt("Enter your password");
  	GM_setValue("owaPassword", owaPassword);
  	owaPassword=GM_getValue("owaPassword",false);
  
  	loginFlag=true;  
  	event.preventDefault()
   } 

//Create a button for users to set/clear login info  
   var links = document.createElement("a");

    links.innerHTML = '<div align="right" style="background-color:#800080;padding-top:5px; padding-bottom:5px; padding-right:5px; padding-left:5px;"><button id-"owaSetAuth" type="button">Auto Login: Preferences</button></div>';
    links.addEventListener('click', setLogin, true); 
    document.body.insertBefore(links, document.body.firstChild);	
	
//Function that will login	 
   window.owaLogin = function(){ 
	   	if(!(GM_getValue("owaUsername",false)==false) && !(GM_getValue("owaPassword",false)==false) && loginFlag==true){
			//Only attempt to set username if login form variable is available, to prevent error
			if(form.elements.namedItem("username")!=null){
				owaUsername.value = GM_getValue("owaUsername",false);
			}
	   		owaPassword.value = GM_getValue("owaPassword",false);
	   
			form.submit();
		}else{
		    //alert("Username:" + GM_getValue("owaUsername",false) + " Password:" + GM_getValue("owaPassword",false));
		    setTimeout(owaLogin,2000);
		}
    }
    //call owaLogin onLoad, pausing in case user wants to set/change username/password first
    setTimeout(owaLogin,1500);
})();
