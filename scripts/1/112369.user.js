// ==UserScript==
// @name		DHBW Auto-Login
// @namespace		Magnus Bruehl
// @description		Atomatically logs in to the DHBW WLAN with the user credentials that are stored in the script.
// @include		https://dhbwwebauth.dhbw-mannheim.de/fs/customwebauth/login.html
// @include		https://dhbwwebauth.dhbw-mannheim.de/*
// ==/UserScript==

var user = "";
var pass = "";

var userField = document.getElementsByName("username")[0];
userField.value = user;
var passField = document.getElementsByName("password")[0];
passField.value = pass;

if(window.addEventListener){
	window.addEventListener('load', function(){ login(); }, false);
}else if(window.attachEvent){
	window.attachEvent('onload', login);
}



function login(){
	if(userField.value !== "" && passField.value !== ""){
		//document.forms[0].submit();
		submitAction();
	}else{
		alert("You did not store your user credentials in the script or the login-page has changed.");
	}
}


/**
  * This function is from the site source code and has been changed slightly.
*/
function submitAction(){
      var link = document.location.href;
      var searchString = "redirect=";
      var equalIndex = link.indexOf(searchString);
      var redirectUrl = "";
	  var redirectUrlField = document.getElementsByName("redirect_url")[0];
      var urlStr = "";
	  var buttonClicked = document.getElementsByName("buttonClicked")[0];
      if(equalIndex > 0) {
            equalIndex += searchString.length;
            urlStr = link.substring(equalIndex);
            if(urlStr.length > 0){
				redirectUrl += urlStr;
  			    if(redirectUrl.length > 255)
				    redirectUrl = redirectUrl.substring(0,255);
			    redirectUrlField.value = redirectUrl;
			}
      }
 
      buttonClicked.value = 4;
      document.forms[0].submit();
}

/**
  * This function is from the site source code and is included for
  * possible future developments.
*/
function loadAction(){
      var url = window.location.href;
      var args = new Object();
      var query = location.search.substring(1);
      var pairs = query.split("&");
      for(var i=0;i<pairs.length;i++){
          var pos = pairs[i].indexOf('=');
          if(pos == -1) continue;
          var argname = pairs[i].substring(0,pos);
          var value = pairs[i].substring(pos+1);
          args[argname] = unescape(value);
      }
      //alert( "AP MAC Address is " + args.ap_mac);
      //alert( "The Switch URL is " + args.switch_url);
      document.forms[0].action = args.switch_url;
 
      // This is the status code returned from webauth login action
      // Any value of status code from 1 to 5 is error condition and user
      // should be shown error as below or modify the message as it suits
      // the customer
      if(args.statusCode == 1){
        alert("You are already logged in. No further action is required on your part.");
      }
      else if(args.statusCode == 2){
        alert("You are not configured to authenticate against web portal. No further action is required on your part.");
      }
      else if(args.statusCode == 3){
        alert("The username specified cannot be used at this time. Perhaps the username is already logged into the system?");
      }
      else if(args.statusCode == 4){
        alert("Wrong username and password. Please try again.");
      }
      else if(args.statusCode == 5){
        alert("The User Name and Password combination you have entered is invalid. Please try again.");
      }
 
}