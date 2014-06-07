// ==UserScript==
// @name          Yahoo!Mail Auto-Login
// @namespace     http://mail.yahoo.com/
// @description	  Automatically login to Yahoo!Mail
// @include       http://*login.yahoo.com/*
// @include 	  https://*login.yahoo.com/*
// @include 	  http://mail.yahoo.com/*
// @exclude       http://*mail.yahoo.com/ym/*
// @exclude 	  http://login.yahoo.com/config/login?logout*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

(function() {
var form = document.forms.namedItem("login_form");
var yahooUsername;

//Username may already be set
if(form.elements.namedItem("login")!=null){
	yahooUsername = form.elements.namedItem("login");
}
var yahooPassword = form.elements.namedItem("passwd");
var loginFlag = true;

//Register a function that will collect login info, and store in GM using GM_setValue()
   window.setLogin = function(event){
      	loginFlag=false;
  		
  	yahooMailUsername=prompt("Enter your Yahoo! Mail username");
  	GM_setValue("yahooMailUsername", yahooMailUsername);
  	yahooMailUsername=GM_getValue("yahooMailUsername",false);
  
  	 yahooMailPassword=prompt("Enter your Yahoo! Mail password");
  	GM_setValue("yahooMailPassword", yahooMailPassword);
  	yahooMailPassword=GM_getValue("yahooMailPassword",false);
  
  	loginFlag=true;  
  	event.preventDefault();
   } 

//Create a button for users to set/clear login info  
   var links = document.createElement("a");
    links.innerHTML = '<div id="yahooMailSetAuth" style="cursor: pointer; border-style:outset;border-color:#AAAAAA;width:280px;margin:5px;font-size:large;text-align:center;background-color:#EFEFEF; height:30px;color: #000000;"><p style="margin: 2px 2px 2px 2px;">Set/Change Yahoo!Mail Login</div>';
    
    links.addEventListener('click', setLogin, true);
    
    document.body.insertBefore(links, document.body.firstChild);	
	
//Function that will login, or 	 
   window.yahooMailLogin = function(){ 
   	if(!(GM_getValue("yahooMailUsername",false)==false) && !(GM_getValue("yahooMailPassword",false)==false) && loginFlag==true){
		//Only attempt to set username if login form variable is available, to prevent error
		if(form.elements.namedItem("login")!=null){
			yahooUsername.value = GM_getValue("yahooMailUsername",false);
		}
   		yahooPassword.value = GM_getValue("yahooMailPassword",false);
   
		form.submit();
	}else{
	    //alert("Username:" + GM_getValue("yahooMailUsername",false) + " Password:" + GM_getValue("yahooMailPassword",false));
	    setTimeout(yahooMailLogin,2000);
	}
    }
	
    //call yahooMailLogin onLoad, pausing in case user wants to set/change username/password first
    setTimeout(yahooMailLogin,1500);
})();

